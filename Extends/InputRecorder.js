/*
 * Input Recorder: キー入力を保存
 *
 * 使い方:
 *   CanvasMasao.Gameに以下のオプションを渡す
 *   {
 *     extensions: [CanvasMasao.InputRecorder],
 *     InputRecorder: {
 *       inputdataCallback: ...,
 *       requiresCallback: ...
 *     }
 *   }
 *
 * オプション:
 *   inputdataCallback: 入力データが1プレイ分まとまったときに呼び出される関数。1プレイごとに呼び出されれる。引数はPlaylogObject（後述）
 *   requiresCallback: どの入力データに対してinputdataCallbackを呼び出すかを制御する関数。引数はResultObject（後述）、返り値はboolean。trueならinputdataCallbackが呼ばれる。省略可能。デフォルト動作はステージクリアまたはコンティニュー旗を取ったログのみ（＝ゲームに進展があったときのみ）
 *
 * PlaylogObject:
 *   stage: number このログのステージ数
 *   continued: boolean コンティニュー旗を取ったか
 *   cleared: boolean このステージをクリアしたか
 *   score: number このログ終了時点でのスコア
 *   buffer: ArrayBuffer Masao Playlog Formatに従う入力データ
 *
 * ResultObject:
 *   status: string このプレイログの種類（"cleared": ステージクリア, "miss": ミス, "abort": 中断）
 *   continued: boolean コンティニュー旗を取ったか
 *   stage: number このログのステージ数
 *   score: number このログ終了時点でのスコア
 */

CanvasMasao.InputRecorder = (function () {
	var InputRecorder = function (mc, inputdataCallback, requiresCallback) {
		this.mc = mc;
		//ひとかたまりのデータが揃ったときにコールバックする
		this.inputdataCallback = inputdataCallback;
		//1プレイのデータが最終データに必要かどうか判断する
		this.requiresCallback = requiresCallback;
		//前フレームのml_modeを記録
		this.prev_ml_mode = 0;
		//現在のフレーム
		this.frame = 0;
		//最後にキー入力を記録したフレーム
		this.last_frame = 0;
		//現在記録中のデータに関する情報
		this.ran_seed = null; //最初のran_seed
		this.stage = null; //現在のステージ
		this.recording = false;
		this.tr1_key = 0; //TR1に該当するキー（Space or Z）
		//最後のコンティニュー情報
		this.prev_cpoint_con = 0;
		this.prev_cpoint_stage = 0;
		this.prev_cpoint_x = 32;
		this.prev_cpoint_y = 320;
		this.continued = false; //プレイごとに管理
		//バッファ
		this.allbuf = []; //全ステージ通しのデータが入ったバッファ
		this.buffers = [];
		this.current_buffer = null;
		this.current_buffer_size = 0;
		//次のフレームでデータを出力するためのオブジェクト
		this.next_emit = null;
	};
	InputRecorder.prototype.init = function () {
		// GameKeyをフック
		var _this = this;
		var gk = this.mc.gk,
			_keyPressed = gk.keyPressed,
			_keyReleased = gk.keyReleased;
		gk.keyPressed = function (paramKeyEvent) {
			_keyPressed.call(gk, paramKeyEvent);
			//記録
			if (_this.recording) {
				_this.save(paramKeyEvent.keyCode, true);
			}
		};
		gk.keyReleased = function (paramKeyEvent) {
			_keyReleased.call(gk, paramKeyEvent);
			if (_this.recording) {
				_this.save(paramKeyEvent.keyCode, false);
			}
		};

		this.reset();
	};
	InputRecorder.prototype.initBuffer = function () {
		//バッファを作成
		this.current_buffer = new Uint8Array(4096);
		this.current_buffer_size = 0;
	};
	InputRecorder.prototype.save = function (keyCode, pressed) {
		//入力情報をバッファに保存
		var frame = this.frame,
			last_frame = this.last_frame;
		var sa = frame - last_frame;
		//前の入力との差は15フレームまでしか記録できないので、それを超える場合はnopをはさむ
		while (sa > 15) {
			this.pushData(false, 15, 0);
			sa -= 15;
		}
		//キーデータ
		this.pushData(pressed, sa, keyCode);
		this.last_frame = frame;
	};
	InputRecorder.prototype.saveCurrentPressing = function () {
		//今のフレームを記録
		var gk = this.mc.gk,
			codekey_f = gk.codekey_f;
		for (var i = 0; i < 256; i++) {
			if (codekey_f[i] === true) {
				this.pushData(true, this.frame - this.last_frame, i);
				this.last_frame = this.frame;
			}
		}
	};
	InputRecorder.prototype.pushData = function (pressed_flag, interval, keyCode) {
		//3bitのキーコード
		var k1 = this.keyBits(keyCode);
		if (k1 !== 7) {
			//1 octetであらわす
			this.addToBuffer((+pressed_flag << 7) | ((interval & 15) << 3) | (k1 & 7));
		} else {
			//2 octetsであらわす
			this.addToBuffer((+pressed_flag << 7) | ((interval & 15) << 3) | 7);
			this.addToBuffer(keyCode);
		}
	};
	InputRecorder.prototype.addToBuffer = function (char) {
		//実際にbufferをいじる
		if (this.current_buffer_size === this.current_buffer.length) {
			//満杯なので次のバッファを作る
			this.buffers.push(this.current_buffer);
			this.initBuffer();
		}
		this.current_buffer[this.current_buffer_size++] = char;
	};
	InputRecorder.prototype.reset = function () {
		//タイトル画面時の初期化
		this.allbuf = [];
		this.buffers = [];
		this.prev_cpoint_con = 0;
		this.prev_cpoint_stage = 0;
		this.prev_cpoint_x = 0;
		this.prev_cpoint_y = 0;
	};
	InputRecorder.prototype.masaoEvent = function (g, image) {
		var mc = this.mc,
			mp = mc.mp,
			ml_mode = mp.ml_mode;
		var prev_playing = this.prev_ml_mode === 100 || this.prev_ml_mode === 110,
			playing = ml_mode === 100 || ml_mode === 110;
		var ne = this.next_emit;

		if (ne != null) {
			//nullでないときはデータを出力する
			//scoreだけここで取得する（2.8でのスコア加算フレームに対応）

			//全てのバッファをまとめる
			var result_buffers = this.buffers.concat(
				this.current_buffer.subarray(0, Math.ceil(this.current_buffer_size / 4) * 4)
			);
			//lengthを計算
			var buffer_length = 0;
			result_buffers.forEach(function (buf) {
				buffer_length += buf.length * buf.BYTES_PER_ELEMENT;
			});
			//種類(クリアした="clear", やられた="miss", 中断した="abort")
			var status;
			if (mp.stage !== ne.stage || ne.ml_mode === 260 || ne.ml_mode >= 400) {
				//ステージが進行した or ゲームクリア画面なのでステージクリアした
				status = "clear";
			} else if (ne.ml_mode >= 300 || ne.ml_mode === 90 || ne.ml_mode === 250) {
				//ゲームオーバー画面 or ステージ開始画面
				status = "miss";
			} else {
				status = "abort";
			}
			//最終スコア
			var score = mp.score;

			//HEADER blockを作成
			var header = new Uint8Array(16);
			var header_view = new DataView(header.buffer);
			//seed
			header_view.setUint32(0, ne.ran_seed, false);
			//stage
			header_view.setUint8(4, ne.stage);
			//status
			/// 1bit目（clearかどうか）
			var status_octet = status === "clear" ? 1 : 0;
			/// 2bit目（TR1がZかどうか）
			status_octet |= ne.tr1_key === 90 ? 2 : 0;
			/// 3bit目( f=1)
			status_octet |= 4;
			header_view.setUint8(5, status_octet);
			//reserved
			header_view.setUint16(6, 0);
			//score
			header_view.setUint32(8, score, false);
			//length
			header_view.setUint32(12, buffer_length, false);
			//HEADER blockを結合
			result_buffers = [header].concat(result_buffers);

			//クリアデータに必要か？
			var required;
			if (this.requiresCallback) {
				//状況を表すオブジェクトを作る
				var result = {
					status: status,
					continued: ne.continued,
					//入力データが表すステージ(1-4)
					stage: ne.stage,
					//これ終了時点のスコア
					score: score
				};
				required = !!this.requiresCallback(result);
			} else {
				required = status === "clear" || ne.continued;
			}

			//記録
			if (required) {
				//クリアのログを残す
				var allbuf = this.allbuf.concat(result_buffers);
				if (status !== "abort") {
					this.allbuf = allbuf;
				} else {
					// タイトル画面に戻ったときは過去のリプレイを捨てる
					this.allbuf = [];
				}
				if (this.inputdataCallback != null) {
					//新しいのが来たのでコールバックする
					//METADATA blockを作る
					var metadata = new Uint8Array([
						0x4d, 0x0e, 0x50, 0x0a, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x0c
					]);
					setTimeout(
						function (ne) {
							this.inputdataCallback({
								stage: ne.stage,
								continued: ne.continued,
								cleared: status === "clear",
								score: score,
								buffer: this.singlify([metadata].concat(allbuf))
							});
						}.bind(this, ne),
						0
					);
				}
			}
			this.next_emit = ne = null;
		}
		if (!prev_playing && playing) {
			//ゲーム開始した
			this.initBuffer();
			this.frame = 0;
			this.last_frame = 0;
			this.stage = mp.stage;
			this.tr1_key = 0;
			this.ran_seed = mp.ran_seed;
			this.recording = true;
			//コンティニュー関係の初期化
			this.continued = false;
			this.prev_cpoint_con = mp.cpoint_con;
			this.prev_cpoint_stage = mp.cpoint_stage;
			this.prev_cpoint_x = mp.cpoint_x;
			this.prev_cpoint_y = mp.cpoint_y;

			//0フレーム目の入力を記録
			this.saveCurrentPressing();
			//ここからの入力は1フレーム目
			this.frame++;
		} else if (prev_playing && !playing) {
			//ステージが終わった
			this.next_emit = {
				ran_seed: this.ran_seed,
				ml_mode: ml_mode,
				stage: this.stage,
				continued: this.continued,
				tr1_key: this.tr1_key
			};

			if (ml_mode === 50) {
				//タイトルに戻った
				this.reset();
			}
			this.recording = false;
		} else if (playing) {
			this.frame++;
			if (
				this.prev_cpoint_con !== mp.cpoint_con ||
				this.prev_cpoint_stage !== mp.cpoint_stage ||
				this.prev_cpoint_x !== mp.cpoint_x ||
				this.prev_cpoint_y != mp.cpoint_y
			) {
				//コンティニューされた
				this.continued = true;
				this.prev_cpoint_con = mp.cpoint_con;
				this.prev_cpoint_stage = mp.cpoint_stage;
				this.prev_cpoint_x = mp.cpoint_x;
				this.prev_cpoint_y = mp.cpoint_y;
			}
		}
		this.prev_ml_mode = ml_mode;
	};
	InputRecorder.prototype.singlify = function (buffers) {
		//buffersはじつはTypedArrayの配列
		//バッファのサイズを計算する
		for (var sum = 0, i = 0, l = buffers.length; i < l; i++) {
			var buf = buffers[i];
			sum += buf.length * buf.BYTES_PER_ELEMENT;
		}
		//全て
		var result = new ArrayBuffer(sum);
		var buf1, buf2;
		//コピーする
		for (sum = 0, i = 0; i < l; i++) {
			buf = buffers[i];
			var size = buf.length * buf.BYTES_PER_ELEMENT;
			//Uint8Arrayを介してコピー
			buf1 = new Uint8Array(result, sum, size);
			buf2 = new Uint8Array(buf.buffer, 0, size);
			buf1.set(buf2);
			sum += size;
		}
		return result;
	};
	InputRecorder.prototype.keyBits = function (keyCode) {
		//keyCodeをアレにする
		if (keyCode === 0) {
			//nop
			return 0;
		} else if (keyCode === 37 || keyCode === 100) {
			//LEFT
			return 1;
		} else if (keyCode === 38 || keyCode === 104) {
			//UP
			return 2;
		} else if (keyCode === 39 || keyCode === 102) {
			//RIGHT
			return 3;
		} else if (keyCode === 40 || keyCode === 98) {
			//DOWN
			return 4;
		} else if (keyCode === 88) {
			//X
			return 6;
		} else if (this.tr1_key === keyCode) {
			//TR1
			return 5;
		} else {
			if (this.tr1_key === 0) {
				//まだTR1が定まっていない
				if (keyCode === 90) {
					//Z
					this.tr1_key = 90;
					return 5;
				} else if (keyCode === 32) {
					//Space
					this.tr1_key = 32;
					return 5;
				}
			}
			//その他のキーだ
			return 7;
		}
	};
	InputRecorder.inject = function (mc, options) {
		var _ui = mc.userInit,
			_us = mc.userSub;
		var inputdataCallback = null,
			requiresCallback = null;
		var o = options.InputRecorder || {};
		if ("function" === typeof o.inputdataCallback) {
			inputdataCallback = o.inputdataCallback;
		}
		if ("function" === typeof o.requiresCallback) {
			requiresCallback = o.requiresCallback;
		}
		mc.userInit = function () {
			_ui.apply(mc);
			this.inputRecorder = new CanvasMasao.InputRecorder(this, inputdataCallback, requiresCallback);
			this.inputRecorder.init();
		};
		mc.userSub = function (g, image) {
			_us.call(mc, g, image);
			this.inputRecorder.masaoEvent(g, image);
		};
	};
	return InputRecorder;
})();
