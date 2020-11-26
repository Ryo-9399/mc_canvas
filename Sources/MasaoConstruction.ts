import { GameGraphicsForApplet } from "./GameGraphicsForApplet";
import { GameKey, GameKey_keyPressed, GameKey_keyReleased } from "./GameKey";
import { GameMouse, GameMouse_mousePressed, GameMouse_mouseReleased } from "./GameMouse";
import { GameSoundForApplet } from "./GameSoundForApplet";
import { AudioClip, Game, rightShiftIgnoreSign, waitFor } from "./GlobalFunctions";
import { Color, Font, ImageBuff, Graphics } from "./ImageBuff";
import { MainProgram } from "./MainProgram";
import { MasaoJSS } from "./MasaoJSS";
import { TagDataBase } from "./TagDataBase";
import { Params, Option } from "./MasaoOption";
import { ChipImage } from "./ChipImage";

interface MasaoMessageBase {
	target: unknown;
	parameters: unknown;
	next: MasaoMessage<keyof MasaoMessageMap> | null;
}

interface MasaoMessage_load extends MasaoMessageBase {
	target: ImageBuff;
}

interface MasaoMessage_makeChipImage extends MasaoMessageBase {
	target: ImageBuff;
	parameters: {
		chipimage: ChipImage;
	};
}

interface MasaoMessage_makeReverseChipImage extends MasaoMessage_makeChipImage {}

interface MasaoMessage_loadAdvanceMapJson extends MasaoMessageBase {
	target: {
		complete: boolean;
	};
}

interface MasaoMessageMap {
	load: MasaoMessage_load;
	makeChipImage: MasaoMessage_makeChipImage;
	makeReverseChipImage: MasaoMessage_makeReverseChipImage;
	loadAdvanceMapJson: MasaoMessage_loadAdvanceMapJson;
}

type MasaoMessage<T extends string = keyof MasaoMessageMap> = T extends keyof MasaoMessageMap
	? {
			type: T;
	  } & { [P in keyof MasaoMessageMap[T]]: MasaoMessageMap[T][P] }
	: never;

class MasaoConstruction {
	restart_f: boolean;
	th: number | null;
	th_interval: number;
	th_jm: number;
	process_time: number;
	variable_sleep_time: boolean;
	sleep_time_visible: boolean;
	main_time_kiroku: number[];
	main_time_kiroku_p: number;
	main_time_kiroku_f: boolean;
	tdb: TagDataBase;
	gg: GameGraphicsForApplet;
	gm: GameMouse;
	gk: GameKey;
	gs: GameSoundForApplet;
	mp: MainProgram;
	mph_title_lock_f: boolean;
	mph_start_game_f: boolean;
	mph_highscore: number;
	audio_se_no_wave: boolean;
	audio_se_no_mp3: boolean;
	audio_se_no_ogg: boolean;
	audio_bgm_no_wave: boolean;
	audio_bgm_no_mp3: boolean;
	audio_bgm_no_ogg: boolean;
	params: Params;
	__canvas: HTMLCanvasElement;
	__appimg: ImageBuff;
	__game: Game;
	options: Option;
	firstMessage: MasaoMessage | null;
	lastMessage: MasaoMessage | null;
	masaoJSSAppletEmulator: MasaoJSS | null;

	constructor(params: Params, __canvas: HTMLCanvasElement, __game: Game, options: Option) {
		this.restart_f = false;
		this.th = null;
		this.th_interval = 70;
		this.th_jm = 10;
		this.process_time = 0;
		this.variable_sleep_time = false;
		this.sleep_time_visible = false;
		this.main_time_kiroku = new Array(10);
		this.main_time_kiroku_p = 0;
		this.main_time_kiroku_f = false;
		this.tdb = undefined!; // init_j() 内で初期化
		this.gg = null!; // init_j() 内で初期化
		this.gm = null!; // init_j() 内で初期化
		this.gk = null!; // init_j() 内で初期化
		this.gs = null!; // init_j() 内で初期化
		this.mp = null!; // init_j() 内で初期化
		this.mph_title_lock_f = false;
		this.mph_start_game_f = false;
		this.mph_highscore = 0;
		this.audio_se_no_wave = false;
		this.audio_se_no_mp3 = false;
		this.audio_se_no_ogg = false;
		this.audio_bgm_no_wave = false;
		this.audio_bgm_no_mp3 = false;
		this.audio_bgm_no_ogg = false;

		// GlobalFunctionsより移動
		this.params = params;
		this.__canvas = __canvas;
		this.__appimg = new ImageBuff(512, 320);

		this.__game = __game;

		// 起動オプションの連想配列
		this.options = options;

		// 処理すべきメッセージのキュー（画像読み込みなど）
		this.firstMessage = null;
		this.lastMessage = null;
		// MasaoJSSクラス再現オブジェクト
		this.masaoJSSAppletEmulator = null;
	}

	// GlobalFunctionsより移動
	// __appimg書き換え関数
	__repaint() {
		this.update(this.__appimg.getGraphics()!);
		var ctx = this.__canvas.getContext("2d");
		if (ctx && this.__appimg._dat) {
			ctx.drawImage(this.__appimg._dat, 0, 0);
		}
	}

	init() {}

	start() {
		if (this.th == null) {
			this.th = 1;
		}
		this.th_jm = 10;
	}

	stop() {
		if (this.th != null) {
			this.th = null;

			this.th_jm = 10;
		}
		if (this.gs != null) {
			this.gs.stopBGM();
		}
	}

	/**
	 * MasaoConstructionとそれに関連するリソースを開放します。
	 */
	destroy() {
		this.stop();
		if (this.gs != null) {
			this.gs.kill();
		}
	}

	paint(paramGraphics: Graphics) {
		if (this.th_jm <= 0) {
			if (!this.mp.draw_lock_f) {
				paramGraphics.drawImage(this.gg.os_img, 0, 0, this);
			}
		} else if (!this.restart_f) {
			paramGraphics.setColor(Color.black);
			paramGraphics.fillRect(0, 0, 512, 320);
			paramGraphics.setColor(Color.white);
			paramGraphics.setFont(new Font(Font.DIALOG, 0, 16));

			var str = this.getParameter("now_loading");
			if (str != null) {
				paramGraphics.drawString(this.getParameter("now_loading") || "null", 32, 160);
			}
		}
	}

	update(paramGraphics: Graphics) {
		this.paint(paramGraphics);
	}

	run() {
		var k = 0;
		var sleepTime, mode;

		// userJSからメッセージを受け取っている場合、通常の処理を止めてこれらを処理する
		if (this.firstMessage) {
			var oldFirstMessage = this.firstMessage;
			this.firstMessage = null;
			this.lastMessage = null;
			for (var cur: MasaoMessage | null = oldFirstMessage; cur; cur = cur.next) {
				// ファイルロード待ちのメッセージ
				if (cur.type == "load") {
					if (!cur.target._dat || (cur.target._dat instanceof Image && cur.target._dat.complete)) {
						continue;
					} else {
						this.pushMessage(cur.type, cur.target, cur.parameters);
					}
				}
				// makeChipImageメソッド呼び出し待ち
				else if (cur.type == "makeChipImage") {
					if (!cur.target._dat || (cur.target._dat instanceof Image && cur.target._dat.complete)) {
						cur.parameters.chipimage.makeChipImage();
					} else {
						this.pushMessage(cur.type, cur.target, cur.parameters);
					}
				}
				// makeReverseChipImagrメソッド呼び出し待ち
				else if (cur.type == "makeReverseChipImage") {
					if (!cur.target._dat || (cur.target._dat instanceof Image && cur.target._dat.complete)) {
						cur.parameters.chipimage.makeReverseChipImage();
					} else {
						this.pushMessage(cur.type, cur.target, cur.parameters);
					}
				}
				// JSON読み込み待ち
				else if (cur.type == "loadAdvanceMapJson") {
					if (cur.target.complete) {
						continue;
					} else {
						this.pushMessage(cur.type, cur.target, cur.parameters);
					}
				}
			}
			// まだメッセージが残っているようならば、以降の処理をせずに制御を返す
			if (this.firstMessage) {
				return 70;
			}
		}

		if (this.th_jm == 10) {
			this.init_j();

			this.mp.start();

			this.th_jm -= 1;

			sleepTime = 70;
		} else if (this.th_jm == 6) {
			var f1 = 0,
				f2 = 0;
			if (this.gg.apt_img._loaded) f1 = 1;
			else if (this.gg.apt_img._error) f1 = 2;
			if (this.gg.layer_mode == 2) {
				if (this.gg.amapchip_img!._loaded) f2 = 1;
				else if (this.gg.amapchip_img!._error) f2 = 2;
			} else f2 = 1;
			this.__repaint();
			if (f1 != 0 && f2 != 0) this.th_jm -= 1;
		} else if (this.th_jm == 2) {
			this.gg.cut();
			this.th_jm -= 1;

			sleepTime = 70;
		} else if (this.th_jm >= 2) {
			this.th_jm -= 1;
			this.__repaint();

			sleepTime = 70;
		} else {
			if (this.mp.ml_mode == 100) {
				this.mp.mL100();
			} else {
				this.mp.mainLoop();
			}
			this.userSub(this.gg.os_g, this.gg.os_img);
			if (this.th_jm > 0) {
				this.th_jm -= 1;
			}
			var i = Math.floor(new Date().getTime() - this.process_time);
			var j = this.th_interval - i;
			if (j < 3) {
				j = 3;
			}
			if (this.sleep_time_visible) {
				this.main_time_kiroku[this.main_time_kiroku_p] = i;
				this.main_time_kiroku_p += 1;
				if (this.main_time_kiroku_p > 9) {
					this.main_time_kiroku_p = 0;
					this.main_time_kiroku_f = true;
				}
				if (this.main_time_kiroku_f) {
					k = 0;
					for (var m = 0; m <= 9; m++) {
						k += this.main_time_kiroku[m];
					}
					k = Math.floor(k / 10);
				}
			}
			if (this.variable_sleep_time) {
				if (this.sleep_time_visible) {
					this.gg.os_g.setColor(this.mp.gamecolor_score);
					this.gg.os_g.setFont(new Font(Font.DIALOG, 1, this.mp.moji_size));
					this.gg.os_g.drawString("VARIABLE SLEEP  1", 40, (14 + this.mp.moji_size) * 3);
					this.gg.os_g.drawString("MAIN PROGRAM TIME  " + i, 40, (14 + this.mp.moji_size) * 4);
					this.gg.os_g.drawString("SLEEP TIME  " + j, 40, (14 + this.mp.moji_size) * 5);
					if (this.main_time_kiroku_f) {
						this.gg.os_g.drawString("10 TRY MAIN PROGRAM TIME  " + k, 40, (14 + this.mp.moji_size) * 6);
					}
				}

				sleepTime = j;

				this.process_time = new Date().getTime();
			} else {
				if (this.sleep_time_visible) {
					this.gg.os_g.setColor(this.mp.gamecolor_score);
					this.gg.os_g.setFont(new Font(Font.DIALOG, 1, this.mp.moji_size));
					this.gg.os_g.drawString("VARIABLE SLEEP  0", 40, (14 + this.mp.moji_size) * 3);
					this.gg.os_g.drawString("MAIN PROGRAM TIME  " + i, 40, (14 + this.mp.moji_size) * 4);
					this.gg.os_g.drawString("SLEEP TIME  " + this.th_interval, 40, (14 + this.mp.moji_size) * 5);
					if (this.main_time_kiroku_f) {
						this.gg.os_g.drawString("10 TRY MAIN PROGRAM TIME  " + k, 40, (14 + this.mp.moji_size) * 6);
					}
				}

				sleepTime = this.th_interval;

				this.process_time = new Date().getTime();
			}

			// MasaoJSS専用コールバック関数が設定されている場合、これを呼び出す
			if (this.options.userJSCallback) {
				mode = this.getMode();
				// ユーザーJS部分がエラーを投げてもゲームが停止しないようにtryでエラーを握りつぶす
				try {
					if (mode >= 100 && mode < 200) {
						// 引数にアプレットエミュレータを追加してuserJSを呼び出す
						this.options.userJSCallback(
							this.gg.os_g_bk,
							mode,
							this.mp.maps.wx,
							this.mp.maps.wy,
							this.masaoJSSAppletEmulator!
						);
					} else {
						this.options.userJSCallback(this.gg.os_g_bk, mode, -9999, -9999, this.masaoJSSAppletEmulator!);
					}
				} catch (e) {
					console.error(e);
				}
			}
			this.__repaint();
		}
		return sleepTime;
	}

	init_j() {
		if (!this.restart_f) {
			this.tdb = new TagDataBase();
			this.tdb.setValueFromHTML(this);
			this.tdb.options = this.options;
		}
		var m = 0;
		var str;
		for (var p = 0; p < 3; p++) {
			for (var q = 0; q < 30; q++) {
				str = "map" + p + "-" + q;
				if (this.tdb.getValue(str) != null && this.tdb.getValue(str) != "." && this.tdb.getValue(str) != "") {
					m = 1;
					break;
				}
			}
		}
		if (m == 0) {
			this.tdb.setValueStage1();
		}

		// 新形式マップデータがJSONファイルのURLで設定されているときはJSONを読み込む
		var advancedMap = this.options["advanced-map"];
		var advanceMap = this.options["advance-map"];
		if (typeof advancedMap === "string") {
			this.loadAdvanceMapJson(advancedMap);
		} else if (typeof advancedMap === "undefined") {
			if (typeof advanceMap === "string") {
				this.loadAdvanceMapJson(advanceMap);
			} else if (typeof advanceMap === "object") {
				this.options["advanced-map"] = advanceMap;
			}
		}

		this.th_interval = this.tdb.getValueInt("game_speed");
		if (this.th_interval < 1) {
			this.th_interval = 1;
		} else if (this.th_interval > 500) {
			this.th_interval = 500;
		}
		this.process_time = new Date().getTime();
		this.main_time_kiroku_p = 0;
		for (var j = 0; j <= 9; j++) {
			this.main_time_kiroku[j] = 0;
		}
		if (this.tdb.getValueInt("variable_sleep_time") == 1) {
			this.variable_sleep_time = true;
		} else {
			this.variable_sleep_time = false;
		}
		if (this.tdb.getValueInt("sleep_time_visible") == 1) {
			this.sleep_time_visible = true;
		} else {
			this.sleep_time_visible = false;
		}
		this.gg = new GameGraphicsForApplet(this.tdb, this);
		this.gg.setBackcolor(Color.black);

		str = this.tdb.getValue("filename_title");
		this.gg.addListImage(0, str);

		str = this.tdb.getValue("filename_ending");
		this.gg.addListImage(1, str);

		str = this.tdb.getValue("filename_gameover");
		this.gg.addListImage(2, str);
		if (this.gg.layer_mode == 2 || this.tdb.getValueInt("mcs_haikei_visible") == 1) {
			str = this.tdb.getValue("filename_haikei");
			this.gg.addListImage(4, str);
		}
		str = this.tdb.getValue("stage_select");
		var i;
		i = parseInt(str);
		if (isNaN(i)) i = -1;
		if (i == 2) {
			str = this.tdb.getValue("filename_chizu");
			this.gg.addListImage(3, str);
		}
		str = this.tdb.getValue("stage_max");
		var k;
		k = parseInt(str);
		if (isNaN(k)) k = 1;
		if ((this.gg.layer_mode == 2 || this.tdb.getValueInt("mcs_haikei_visible") == 1) && (i == 2 || k >= 2)) {
			str = this.tdb.getValue("filename_haikei2");
			this.gg.addListImage2(5, str);
			str = this.tdb.getValue("filename_haikei3");
			this.gg.addListImage2(6, str);
			str = this.tdb.getValue("filename_haikei4");
			this.gg.addListImage2(7, str);
		}
		this.gg.loadListImage();

		this.gm = new GameMouse();
		var _gm = this.gm;
		this.__canvas.addEventListener("mousedown", e => {
			e.stopImmediatePropagation();
			// このオブジェクトにフォーカスを当てる
			Game.focus.focus(this);
			// ユーザーインタラクションを通知
			this.gs.userInteract();
			// マウスイベントを発生
			GameMouse_mousePressed(_gm, e);
		});
		this.__canvas.addEventListener("mouseup", function(e) {
			GameMouse_mouseReleased(_gm, e);
		});

		this.gk = new GameKey();
		var _gk = this.gk;
		var _handler = (e: KeyboardEvent) => {
			if (Game.focus.hasFocus(this)) GameKey_keyPressed(_gk, e);
		};
		document.addEventListener("keydown", _handler);
		this.__game.__resourceList.push({
			type: "eventListener",
			release: () => document.removeEventListener("keydown", _handler)
		});

		_handler = (e: KeyboardEvent) => {
			if (Game.focus.hasFocus(this)) GameKey_keyReleased(_gk, e);
		};
		document.addEventListener("keyup", _handler);
		this.__game.__resourceList.push({
			type: "eventListener",
			release: () => document.removeEventListener("keyup", _handler)
		});

		if (this.tdb.getValueInt("audio_se_switch_wave") == 2) this.audio_se_no_wave = true;
		if (this.tdb.getValueInt("audio_se_switch_mp3") == 2) this.audio_se_no_mp3 = true;
		if (this.tdb.getValueInt("audio_se_switch_ogg") == 2) this.audio_se_no_ogg = true;
		if (this.tdb.getValueInt("audio_bgm_switch_wave") == 2) this.audio_bgm_no_wave = true;
		if (this.tdb.getValueInt("audio_bgm_switch_mp3") == 2) this.audio_bgm_no_mp3 = true;
		if (this.tdb.getValueInt("audio_bgm_switch_ogg") == 2) this.audio_bgm_no_ogg = true;
		this.gs = new (GameSoundForApplet.factory(this.tdb))(this.tdb, this);

		// 入力されたフォントをCSS形式に変換
		const ParamFontToCSS = font_params => {
			let font_param;

			// 「,」で区切られた文字列を空白を取り除いて配列に変換
			const font_params_arr = font_params.trim().split(/\s*(?:,|$)\s*/);

			font_params_arr.forEach((e, i, a) => {
				// キーワードで指定ではない　かつ　引用符が付けられていない場合に引用符を付ける
				if (
					e !== "serif" &&
					e !== "sans-serif" &&
					e !== "monospace" &&
					e !== "cursive" &&
					e !== "fantasy" &&
					e !== "system-ui" &&
					!((e[0] === "'" && e[e.length - 1] === "'") || (e[0] === '"' && e[e.length - 1] === '"'))
				)
					a[i] = `'${e}'`;
			});

			// 文字列に変換
			font_param = font_params_arr.join();

			// キーワード指定がないときに、指定されたフォントが使えなかった場合 Font.DIALOG (デフォルト値)が使われるように
			if (font_param.match(/^(?!.*(serif|monospace|cursive|fantasy|system-ui)$).*$/)) {
				font_param += `,${Font.DIALOG_str}`;
			}

			return font_param;
		};
		this.gg.font_score = ParamFontToCSS(this.tdb.getValue("font_score"));
		this.gg.font_message = ParamFontToCSS(this.tdb.getValue("font_message"));

		this.mp = new MainProgram(this.gg, this.gm, this.gk, this.gs, this.tdb);
		// ハイスコアイベント用のリスナ登録
		this.mp.addHighscoreEvent(this.options.highscoreCallback);
		if (this.mph_start_game_f) {
			this.mp.highscore = this.mph_highscore;
		}
		this.mp.title_lock_f = this.mph_title_lock_f;
		this.mp.start_game_f = this.mph_start_game_f;

		// MasaoJSS専用コールバック関数が設定されている場合、エミュレータオブジェクトを作成
		if (this.options.userJSCallback) {
			this.masaoJSSAppletEmulator = new MasaoJSS(this, !!this.options["bc-case-insensitive"]);
		}

		this.__repaint();

		this.userInit();
	}

	userInit() {}

	userSub(paramGraphics: Graphics, paramImage: ImageBuff) {}

	getHighscore() {
		var i = 0;
		if (this.mp != null) {
			i = this.mp.highscore;
			if (i < this.mp.score) {
				i = this.mp.score;
			}
		}
		return i;
	}

	getScore() {
		var i = 0;
		if (this.mp != null) {
			i = this.mp.score;
		}
		return i;
	}

	getMode() {
		var i = 0;
		if (this.mp != null) {
			var j = this.mp.ml_mode;
			if (j >= 50 && j <= 60) {
				i = 1;
			} else if (j >= 200 && j < 300) {
				i = 400;
			} else if (j >= 300 && j <= 310) {
				i = 200;
			} else if (j >= 400 && j <= 410) {
				i = 300;
			} else if (this.mp.ml_mode == 100 && (this.mp.sl_step == 2 || this.mp.sl_step == 3)) {
				i = 150;
			} else {
				i = 100;

				i += this.mp.stage;
			}
		}
		return i;
	}

	soundOn() {
		if (this.gs != null) {
			this.gs.soundOn();
			return true;
		}
		return false;
	}

	soundOff() {
		if (this.gs != null) {
			this.gs.soundOff();
			return true;
		}
		return false;
	}

	onSound() {
		if (this.gs != null) {
			this.gs.soundOn();
			return true;
		}
		return false;
	}

	offSound() {
		if (this.gs != null) {
			this.gs.soundOff();
			return true;
		}
		return false;
	}

	getMyX() {
		if (this.mp != null) {
			var i;
			if (this.mp.ml_mode == 100 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
				i = rightShiftIgnoreSign(this.mp.co_j.x + 15, 5) - 1;
				if (i < 0) {
					i = 0;
				}
				if (i >= this.mp.mapWidth) {
					i = this.mp.mapWidth - 1;
				}
				return i;
			}
			if (this.mp.ml_mode == 200) {
				i = rightShiftIgnoreSign(this.mp.ig.co_j.x + 15, 5);
				return i;
			}
		}
		return -1;
	}

	getMyY() {
		if (this.mp != null) {
			var i;
			if (this.mp.ml_mode == 100 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
				i = rightShiftIgnoreSign(this.mp.co_j.y + 15, 5) - 10;
				if (i < 0) {
					i = 0;
				}
				if (i >= this.mp.mapHeight) {
					i = this.mp.mapHeight - 1;
				}
				return i;
			}
			if (this.mp.ml_mode == 200) {
				i = rightShiftIgnoreSign(this.mp.ig.co_j.y + 15, 5);
				return i;
			}
		}
		return -1;
	}

	getViewX() {
		if (this.mp != null && this.mp.ml_mode == 100) {
			var i = rightShiftIgnoreSign(this.mp.maps.wx, 5) - 1;
			if (i < 0) {
				i = 0;
			}
			if (i > this.mp.mapWidth - 16) {
				i = this.mp.mapWidth - 1; // ???
			}
			return i;
		}
		return -1;
	}

	getViewY() {
		if (this.mp != null && this.mp.ml_mode == 100) {
			var i = rightShiftIgnoreSign(this.mp.maps.wy, 5) - 10;
			if (i < 0) {
				i = 0;
			}
			if (i > this.mp.mapHeight - 10) {
				i = this.mp.mapHeight - 10;
			}
			return i;
		}
		return -1;
	}

	setMyPosition(paramString1: string, paramString2: string) {
		var i = 0;
		var j = 0;
		if (this.mp != null && this.mp.ml_mode == 100 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			i = parseInt(paramString1);
			j = parseInt(paramString2);
			if (isNaN(i) || isNaN(j)) {
				i = -1;
				j = -1;
			}
			if (i < 0 || i >= this.mp.mapWidth || j < 0 || j >= this.mp.mapHeight) {
				return false;
			}
			this.mp.co_j.x = (i + 1) * 32;
			this.mp.co_j.y = (j + 10) * 32;

			return true;
		}
		return false;
	}

	showMessage(
		paramString1: string,
		paramString2: string,
		paramString3: string,
		paramString4: string,
		paramString5: string
	) {
		var bool = false;
		if (this.mp != null) {
			bool = this.mp.showmSet(paramString1, paramString2, paramString3, paramString4, paramString5);
			return bool;
		}
		return false;
	}

	showImage(paramString1: string, paramString2: string, paramString3: string, paramString4: string) {
		var bool = false;
		if (this.mp != null) {
			bool = this.mp.showiSet(paramString1, paramString2, paramString3, paramString4);
			return bool;
		}
		return false;
	}

	setEnemy(paramString1: string, paramString2: string, paramString3: string) {
		var bool = false;
		if (this.mp != null) {
			bool = this.mp.sete(paramString1, paramString2, paramString3);
			return bool;
		}
		return false;
	}

	setMapchip(paramString1: string, paramString2: string, paramString3: string) {
		var bool = false;
		if (this.mp != null) {
			bool = this.mp.setmapc(paramString1, paramString2, paramString3);
			return bool;
		}
		return false;
	}

	getMapchip(paramString1: string, paramString2: string) {
		if (this.mp != null) {
			return this.mp.getmapc(paramString1, paramString2);
		}
		return -1;
	}

	setMapchip2(paramString1: string, paramString2: string, paramString3: string) {
		var bool = false;
		if (this.mp != null) {
			bool = this.mp.setmapc2(paramString1, paramString2, paramString3);
			return bool;
		}
		return false;
	}

	getMapchip2(paramString1: string, paramString2: string) {
		if (this.mp != null) {
			return this.mp.getmapc2(paramString1, paramString2);
		}
		return -1;
	}

	setBackImage(paramString: string) {
		var bool = false;
		if (this.mp != null) {
			bool = this.mp.setbacki(paramString);
			return bool;
		}
		return false;
	}

	pressLeft() {
		if (this.gk != null) {
			this.gk.left_f = true;
			return true;
		}
		return false;
	}

	pressLeft2() {
		if (this.gk != null && this.mp != null && this.mp.ml_mode == 100 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			this.gk.left_f = true;
			this.gk.left_c = 2;
			this.mp.j_hashiru_f = true;
			return true;
		}
		return false;
	}

	releaseLeft() {
		if (this.gk != null) {
			this.gk.left_f = false;
			return true;
		}
		return false;
	}

	pressRight() {
		if (this.gk != null) {
			this.gk.right_f = true;
			return true;
		}
		return false;
	}

	pressRight2() {
		if (this.gk != null && this.mp != null && this.mp.ml_mode == 100 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			this.gk.right_f = true;
			this.gk.right_c = 2;
			this.mp.j_hashiru_f = true;
			return true;
		}
		return false;
	}

	releaseRight() {
		if (this.gk != null) {
			this.gk.right_f = false;
			return true;
		}
		return false;
	}

	pressUp() {
		if (this.gk != null) {
			this.gk.up_f = true;
			return true;
		}
		return false;
	}

	releaseUp() {
		if (this.gk != null) {
			this.gk.up_f = false;
			return true;
		}
		return false;
	}

	pressDown() {
		if (this.gk != null) {
			this.gk.down_f = true;
			this.gk.tr2_f = true;
			return true;
		}
		return false;
	}

	releaseDown() {
		if (this.gk != null) {
			this.gk.down_f = false;
			this.gk.tr2_f = false;
			return true;
		}
		return false;
	}

	pressTrigger1() {
		if (this.gk != null) {
			this.gk.tr1_f = true;
			return true;
		}
		return false;
	}

	releaseTrigger1() {
		if (this.gk != null) {
			this.gk.tr1_f = false;
			return true;
		}
		return false;
	}

	releaseAll() {
		if (this.gk != null) {
			this.gk.up_f = false;
			this.gk.down_f = false;
			this.gk.left_f = false;
			this.gk.right_f = false;
			this.gk.tr1_f = false;
			this.gk.tr2_f = false;
			this.gk.x_f = false;
			return true;
		}
		return false;
	}

	getKeyCode() {
		if (this.gk != null) {
			return this.gk.key_code;
		}
		return -1;
	}

	resetKeyCode() {
		if (this.gk != null) {
			this.gk.key_code = 0;
			return true;
		}
		return false;
	}

	equipBarrier(paramString: string) {
		var i = 0;
		if (this.gk != null && this.mp != null && this.mp.ml_mode == 100 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			i = parseInt(paramString);
			if (isNaN(i)) i = 0;
			if (i <= 0) {
				return false;
			}
			this.mp.j_v_c = i;

			this.gs.rsAddSound(7);

			return true;
		}
		return false;
	}

	setJetFuel(paramString: string) {
		var i = 0;
		if (this.gk != null && this.mp != null && this.mp.ml_mode == 100 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			i = parseInt(paramString);
			if (isNaN(i)) i = 0;
			if (i < 0) {
				return false;
			}
			this.mp.j_jet_fuel = i;
			return true;
		}
		return false;
	}

	equipJet(paramString: string) {
		var bool = this.setJetFuel(paramString);

		return bool;
	}

	restart() {
		this.restart_f = true;
		this.th_jm = 10;
		if (this.mp != null) {
			this.mph_title_lock_f = this.mp.title_lock_f;
			this.mph_start_game_f = this.mp.start_game_f;
			if (this.mp.highscore < this.mp.score) {
				this.mp.highscore = this.mp.score;
			}
			this.mph_highscore = this.mp.highscore;
		}
		return true;
	}

	getValue(paramString: string) {
		if (this.th_jm <= 0) {
			return this.tdb.getValue(paramString);
		}
		return null;
	}

	getParamValue(paramString: string) {
		if (this.th_jm <= 0) {
			return this.tdb.getValue(paramString);
		}
		return null;
	}

	setValue(paramString1: string, paramString2: string) {
		if (this.th_jm <= 0) {
			return this.tdb.setValue(paramString1, paramString2);
		}
		return false;
	}

	setParamValue(paramString1: string, paramString2: string) {
		if (this.th_jm <= 0) {
			return this.tdb.setValue(paramString1, paramString2);
		}
		return false;
	}

	getMyXReal() {
		if (this.getMode() >= 100 && this.getMode() < 200 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			var i = this.mp.co_j.x;
			return i;
		}
		return -1;
	}

	getMyYReal() {
		if (this.getMode() >= 100 && this.getMode() < 200 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			var i = this.mp.co_j.y;
			return i;
		}
		return -1;
	}

	setMyXReal(paramString: string) {
		if (this.getMode() >= 100 && this.getMode() < 200 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			var i;
			i = parseInt(paramString);
			if (isNaN(i)) i = -9999;
			if (i < 0) {
				i = 0;
			}
			this.mp.co_j.x = i;
			return true;
		}
		return false;
	}

	setMyYReal(paramString: string) {
		if (this.getMode() >= 100 && this.getMode() < 200 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			var i;
			i = parseInt(paramString);
			if (isNaN(i)) i = -9999;
			if (i < 0) {
				i = 0;
			}
			this.mp.co_j.y = i;
			return true;
		}
		return false;
	}

	getMyVX() {
		if (this.getMode() >= 100 && this.getMode() < 200 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			var i = this.mp.co_j.vx;
			return i;
		}
		return -9999;
	}

	getMyVY() {
		if (this.getMode() >= 100 && this.getMode() < 200 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			var i = this.mp.co_j.vy;
			return i;
		}
		return -9999;
	}

	getViewXReal() {
		if (this.getMode() >= 100 && this.getMode() < 200) {
			var i = this.mp.maps.wx;
			return i;
		}
		return -1;
	}

	getViewYReal() {
		if (this.getMode() >= 100 && this.getMode() < 200) {
			var i = this.mp.maps.wy;
			return i;
		}
		return -1;
	}

	getEnemyTotal() {
		if (this.getMode() >= 100 && this.getMode() < 200) {
			var i = 0;
			for (var j = 0; j <= 229; j++) {
				if (this.mp.co_t[j].c >= 100 || this.mp.co_t[j].c == 10) {
					i++;
				}
			}
			return i;
		}
		return -1;
	}

	getBossXReal() {
		if (this.getMode() >= 100 && this.getMode() < 200) {
			var i = this.mp.co_b.x;
			return i;
		}
		return -1;
	}

	getBossYReal() {
		if (this.getMode() >= 100 && this.getMode() < 200) {
			var i = this.mp.co_b.y;
			return i;
		}
		return -1;
	}

	setMyMiss(paramString: string) {
		if (this.getMode() >= 100 && this.getMode() < 200 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			var i;
			i = parseInt(paramString);
			if (isNaN(i)) i = 1;
			if (i < 1 || i > 4) {
				i = 1;
			}
			this.mp.jShinu(i);

			return true;
		}
		return false;
	}

	setMyPress(paramString: string) {
		if (this.getMode() >= 100 && this.getMode() < 200 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			var i;
			i = parseInt(paramString);
			if (isNaN(i)) i = 1;
			this.mp.jFumu(i);

			return true;
		}
		return false;
	}

	playSound(paramString: string) {
		if (this.gs == null) {
			return false;
		}
		var i;
		i = parseInt(paramString);
		if (isNaN(i)) i = -1;
		if (i >= 1 && i <= 27) {
			if (this.getMode() >= 100 && this.getMode() < 200) {
				this.gs.rsAddSound(i - 1);
			} else {
				this.gs.play(i - 1);
			}
			return true;
		}
		return false;
	}

	setScrollLock(paramString: string) {
		var bool = false;
		if (this.getMode() >= 100 && this.getMode() < 200) {
			bool = this.mp.setScrollLock(paramString);
		}
		return bool;
	}

	attackFire(paramString1: string, paramString2: string, paramString3: string, paramString4: string) {
		var i = 0;
		if (this.getMode() >= 100 && this.getMode() < 200) {
			i = this.mp.attackFire(paramString1, paramString2, paramString3, paramString4);
		}
		return i;
	}

	addScore(paramString: string) {
		if (this.mp == null) {
			return false;
		}
		var i;
		i = parseInt(paramString);
		if (isNaN(i)) i = 0;
		if (i >= 1) {
			this.mp.addScore(i);
			return true;
		}
		return false;
	}

	setPenColor(paramString1: string, paramString2: string, paramString3: string, paramString4?: string) {
		if (paramString4 === undefined) paramString4 = "255";

		if (this.mp != null) {
			var bool = this.mp.setPenColor(paramString1, paramString2, paramString3, paramString4);
			return bool;
		}
		return true;
	}

	showRect(
		paramString1: string,
		paramString2: string,
		paramString3: string,
		paramString4: string,
		paramString5: string
	) {
		var bool = false;
		if (this.mp != null) {
			bool = this.mp.showrSet(paramString1, paramString2, paramString3, paramString4, paramString5);
			return bool;
		}
		return false;
	}

	showOval(
		paramString1: string,
		paramString2: string,
		paramString3: string,
		paramString4: string,
		paramString5: string
	) {
		var bool = false;
		if (this.mp != null) {
			bool = this.mp.showoSet(paramString1, paramString2, paramString3, paramString4, paramString5);
			return bool;
		}
		return false;
	}

	getJSMes() {
		var i = 0;
		if (this.mp != null) {
			i = this.mp.getJSMes();
			return i;
		}
		return -1;
	}

	showGauge(paramString1: string, paramString2: string) {
		if (this.mp != null) {
			var bool = this.mp.showGauge(paramString1, paramString2);
			return bool;
		}
		return false;
	}

	hideGauge() {
		if (this.mp != null) {
			var bool = this.mp.hideGauge();
			return bool;
		}
		return false;
	}

	setJSMes(paramString: string) {
		if (this.mp != null) {
			this.mp.setJSMes(paramString);
			return true;
		}
		return false;
	}

	setTitleLock() {
		if (this.mp != null) {
			this.mp.title_lock_f = true;
			return true;
		}
		return false;
	}

	startGame() {
		if (this.mp != null) {
			this.mp.start_game_f = true;
			return true;
		}
		return false;
	}

	equipGrenade(paramString: string) {
		var i = 0;
		if (this.getMode() >= 100 && this.getMode() < 200 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -1;
			if (i < 0) {
				return false;
			}
			this.mp.j_gr_kazu = i;

			return true;
		}
		return false;
	}

	setSystemImage(paramString1: string, paramString2: string) {
		if (this.mp != null) {
			return this.mp.setSystemImage(paramString1, paramString2);
		}
		return false;
	}

	setModeWait(paramString1: string, paramString2: string) {
		if (this.mp != null) {
			return this.mp.setModeWait(paramString1, paramString2);
		}
		return false;
	}

	showMyHP(paramString: string) {
		if (this.mp != null) {
			return this.mp.showMyHP(paramString);
		}
		return false;
	}

	setMyMaxHP(paramString: string) {
		if (this.mp != null) {
			return this.mp.setMyMaxHP(paramString);
		}
		return false;
	}

	setMyHP(paramString: string) {
		if (this.mp != null) {
			return this.mp.setMyHP(paramString);
		}
		return false;
	}

	getMyHP() {
		if (this.mp != null) {
			return this.mp.getMyHP();
		}
		return 0;
	}

	setMyHPDamage(paramString: string) {
		if (this.mp != null) {
			return this.mp.setMyHPDamage(paramString);
		}
		return false;
	}

	setMyWait(paramString1: string, paramString2: string, paramString3: string) {
		if (this.mp != null) {
			return this.mp.setMyWait(paramString1, paramString2, paramString3);
		}
		return false;
	}

	setStageClear() {
		if (this.mp != null) {
			return this.mp.setStageClear();
		}
		return false;
	}

	equipFire(paramString?: string) {
		if (paramString === undefined) paramString = "1";

		var i = -1;
		if (this.getMode() >= 100 && this.getMode() < 200) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -1;
			if (i < 0) {
				return false;
			}
			if (i == 0) {
				this.mp.j_fire_f = false;

				return true;
			}
			if (i == 1) {
				this.mp.j_fire_f = true;

				return true;
			}
		}
		return false;
	}

	setFireRange(paramString: string) {
		var i = 9999;
		if (this.mp != null) {
			i = parseInt(paramString);
			if (isNaN(i)) i = 0;
			if (i <= 0) {
				return false;
			}
			this.mp.j_fire_range = i;

			return true;
		}
		return false;
	}

	equipTail(paramString: string) {
		var i = -1;
		if (this.getMode() >= 100 && this.getMode() < 200) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -1;
			if (i < 0) {
				return false;
			}
			if (i == 0) {
				this.mp.j_tail_f = false;

				return true;
			}
			if (i == 1) {
				this.mp.j_tail_f = true;

				return true;
			}
		}
		return false;
	}

	attackTail(paramString1: string, paramString2: string, paramString3: string, paramString4: string) {
		var i = 0;
		if (this.getMode() >= 100 && this.getMode() < 200) {
			i = this.mp.attackTail(paramString1, paramString2, paramString3, paramString4);
		}
		return i;
	}

	destroyEnemy(paramString1: string, paramString2: string, paramString3: string, paramString4: string) {
		var i = -1;
		if (this.getMode() >= 100 && this.getMode() < 200) {
			i = this.mp.destroyEnemy(paramString1, paramString2, paramString3, paramString4);
		}
		return i;
	}

	isPressZKey() {
		if (this.gk != null && this.gk.z_f) {
			return 1;
		}
		return 0;
	}

	isPressXKey() {
		if (this.gk != null && this.gk.x_f) {
			return 1;
		}
		return 0;
	}

	isPressSpaceKey() {
		if (this.gk != null && this.gk.space_f) {
			return 1;
		}
		return 0;
	}

	getMyDirection() {
		var i = -1;
		if (this.getMode() >= 100 && this.getMode() < 200) {
			if (this.mp.j_tokugi == 15) {
				i = this.mp.j_4_muki;
			} else {
				i = this.mp.co_j.muki;
			}
			return i;
		}
		return -1;
	}

	setHTMLText(paramString: string) {
		if (this.mp != null) {
			this.tdb.initParameter();

			this.tdb.setValueFromHTMLText(paramString);

			this.restart();

			return true;
		}
		return false;
	}

	newYuka(
		paramString1: string,
		paramString2: string,
		paramString3: string,
		paramString4: string,
		paramString5: string
	) {
		if (this.mp != null) {
			return this.mp.newYuka(paramString1, paramString2, paramString3, paramString4, paramString5);
		}
		return -1;
	}

	setYukaPosition(
		paramString1: string,
		paramString2: string,
		paramString3: string,
		paramString4?: string,
		paramString5?: string
	) {
		if (this.mp != null) {
			return this.mp.setYukaPosition(paramString1, paramString2, paramString3, paramString4, paramString5);
		}
		return false;
	}

	setYukaType(paramString1: string, paramString2: string) {
		if (this.mp != null) {
			return this.mp.setYukaType(paramString1, paramString2);
		}
		return false;
	}

	disposeYuka(paramString: string) {
		if (this.mp != null) {
			return this.mp.disposeYuka(paramString);
		}
		return false;
	}

	setYukaColor(
		paramString1: string,
		paramString2: string,
		paramString3: string,
		paramString4: string,
		paramString5: string
	) {
		if (this.mp != null) {
			return this.mp.setYukaColor(paramString1, paramString2, paramString3, paramString4, paramString5);
		}
		return false;
	}

	isRideYuka(paramString: string) {
		if (this.mp != null) {
			return this.mp.isRideYuka(paramString);
		}
		return -1;
	}

	setMyVX(paramString: string) {
		var i = 0;
		if (this.getMode() >= 100 && this.getMode() < 200 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -9999;
			if (i == -9999) {
				return false;
			}
			this.mp.co_j.vx = i;

			return true;
		}
		return false;
	}

	setMyVY(paramString: string) {
		var i = 0;
		if (this.getMode() >= 100 && this.getMode() < 200 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -9999;
			if (i == -9999) {
				return false;
			}
			this.mp.co_j.vy = i;

			return true;
		}
		return false;
	}

	isRideGround() {
		if (this.mp != null) {
			return this.mp.isRideGround();
		}
		return -1;
	}

	setYukaPattern(paramString1: string, paramString2: string, paramString3: string) {
		if (this.mp != null) {
			return this.mp.setYukaPattern(paramString1, paramString2, paramString3);
		}
		return false;
	}

	setYukaImage(paramString: string, paramImage: ImageBuff) {
		if (this.mp != null) {
			return this.mp.setYukaImage(paramString, paramImage);
		}
		return false;
	}

	setMySpeed(paramString: string) {
		var i = 0;
		if (this.getMode() >= 100 && this.getMode() < 200 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -1;
			if (i < 0 || i > 16) {
				return false;
			}
			if (this.mp.j_tokugi != 14 && this.mp.j_tokugi != 15) {
				return false;
			}
			this.mp.j_speed = i * 10;

			return true;
		}
		return false;
	}

	setScrollArea(paramString1: string, paramString2: string, paramString3: string, paramString4: string) {
		if (this.mp != null) {
			return this.mp.setScrollArea(paramString1, paramString2, paramString3, paramString4);
		}
		return false;
	}

	/*public String loadTextFile(paramString)
使わない
{
	String str = "";
	if (this.mp != null)
	{
		str = this.tdb.loadTextString(paramString, "UTF-8", this);
		if (str == null) {
			str = "";
		}
	}
	return str;
}*/

	isPressUpKey() {
		if (this.gk != null && this.gk.up_f) {
			return 1;
		}
		return 0;
	}

	isPressDownKey() {
		if (this.gk != null && this.gk.down_f) {
			return 1;
		}
		return 0;
	}

	isPressLeftKey() {
		if (this.gk != null && this.gk.left_f) {
			return 1;
		}
		return 0;
	}

	isPressRightKey() {
		if (this.gk != null && this.gk.right_f) {
			return 1;
		}
		return 0;
	}

	newImageOnLoad(paramString: string) {
		var localImage = null;

		localImage = this.getImage(paramString);
		var localMediaTracker = [];
		localMediaTracker.push(localImage);
		waitFor(localMediaTracker);
		return localImage;
	}

	setSystemDrawMode(paramString: string) {
		var i = -1;
		if (this.mp != null) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -1;
			if (i < 1 || i > 4) {
				return false;
			}
			this.mp.system_draw_mode = i;

			return true;
		}
		return false;
	}

	getMyObjectCondition() {
		if (this.mp != null) {
			return this.mp.co_j.c;
		}
		return 0;
	}

	getMyObjectAC() {
		if (this.mp != null) {
			return this.mp.co_j.ac;
		}
		return 0;
	}

	getMyObjectPattern() {
		if (this.mp != null) {
			return this.mp.co_j.pt;
		}
		return 0;
	}

	getMyDirection4way() {
		var i = -1;
		if (this.getMode() >= 100 && this.getMode() < 200) {
			if (this.mp.j_tokugi == 15) {
				i = this.mp.j_4_muki;
			} else if (this.mp.co_j.direction == 2 || this.mp.co_j.direction == 3) {
				i = this.mp.co_j.direction;
			} else {
				i = this.mp.co_j.muki;
			}
			return i;
		}
		return -1;
	}

	setMyObjectImage(paramImage: ImageBuff, paramString1: string, paramString2: string) {
		var i = 0;
		var j = 0;
		if (this.mp != null) {
			i = parseInt(paramString1);
			j = parseInt(paramString2);
			if (isNaN(i) || isNaN(j)) {
				i = 0;
				j = 0;
			}
			this.mp.co_j.img = paramImage;
			this.mp.co_j.zs_x = i;
			this.mp.co_j.zs_y = j;

			return true;
		}
		return false;
	}

	getEnemyObjectCondition(paramString: string) {
		var i = -1;
		if (this.mp != null) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -1;
			if (i < 0 || i > this.mp.t_kazu) {
				return 0;
			}
			return this.mp.co_t[i].c;
		}
		return 0;
	}

	getEnemyObjectPattern(paramString: string) {
		var i = -1;
		if (this.mp != null) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -1;
			if (i < 0 || i > this.mp.t_kazu) {
				return 0;
			}
			return this.mp.co_t[i].pt;
		}
		return 0;
	}

	getEnemyObjectDirection(paramString: string) {
		var i = -1;
		var j = 0;
		var k = 0;
		if (this.mp != null) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -1;
			if (i < 0 || i > this.mp.t_kazu) {
				return 0;
			}
			k = 0;
			j = this.mp.co_t[i].c;
			if (j >= 1400 && j < 1500) {
				k = this.mp.co_t[i].direction;
			} else if (j >= 1200 && j <= 1230) {
				k = this.mp.co_t[i].direction;
			} else {
				k = this.mp.co_t[i].pth;
			}
			return k;
		}
		return 0;
	}

	setEnemyObjectImage(paramString1: string, paramImage: ImageBuff, paramString2: string, paramString3: string) {
		var i = -1;
		var j = 0;
		var k = 0;
		if (this.mp != null) {
			i = parseInt(paramString1);
			j = parseInt(paramString2);
			k = parseInt(paramString3);
			if (isNaN(i)) i = -1;
			if (i < 0 || i > this.mp.t_kazu) {
				return false;
			}
			this.mp.co_t[i].img = paramImage;
			this.mp.co_t[i].zs_x = j;
			this.mp.co_t[i].zs_y = k;

			return false;
		}
		return false;
	}

	getEnemyAC() {
		if (this.mp != null) {
			return this.mp.g_c2;
		}
		return 0;
	}

	setScrollAreaReal(paramString1: string, paramString2: string, paramString3: string, paramString4: string) {
		if (this.mp != null) {
			return this.mp.setScrollAreaReal(paramString1, paramString2, paramString3, paramString4);
		}
		return false;
	}

	isPressCodeKey(paramString: string) {
		var i = 0;
		if (this.gk != null) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -1;
			if (i < 0 || i > 255) {
				return 0;
			}
			if (this.gk.codekey_f[i] == 1) {
				return 1;
			}
			return 0;
		}
		return 0;
	}

	playBGM(paramString: string) {
		if (this.gs != null) {
			return this.gs.playUserBGMFile(paramString);
		}
		return false;
	}

	playBGMLoop(paramString: string) {
		if (this.gs != null) {
			return this.gs.playUserBGMFileLoop(paramString);
		}
		return false;
	}

	stopBGM() {
		if (this.gs != null) {
			this.gs.stopBGM();

			return true;
		}
		return false;
	}

	getBossHP() {
		if (this.mp != null) {
			return this.mp.getBossHP();
		}
		return 0;
	}

	setBossHP(paramString: string) {
		var i = 1;
		if (this.mp != null) {
			i = parseInt(paramString);
			if (isNaN(i)) i = 0;
			if (i < 0) {
				i = 0;
			}
			return this.mp.setBossHP(i);
		}
		return false;
	}

	getBossDirection() {
		if (this.mp != null) {
			return this.mp.getBossDirection();
		}
		return 0;
	}

	isBossAttackMode() {
		if (this.mp != null) {
			return this.mp.isBossAttackMode();
		}
		return 0;
	}

	setBossXReal(paramString: string) {
		var i = 32;
		if (this.mp != null) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -9999;
			if (i < 0) {
				return false;
			}
			return this.mp.setBossXReal(i);
		}
		return false;
	}

	setBossYReal(paramString: string) {
		var i = 320;
		if (this.mp != null) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -9999;
			if (i < 0) {
				return false;
			}
			return this.mp.setBossYReal(i);
		}
		return false;
	}

	setBossObjectImage(paramImage: ImageBuff, paramString1: string, paramString2: string) {
		var i = 0;
		var j = 0;
		if (this.mp != null) {
			i = parseInt(paramString1);
			j = parseInt(paramString2);
			if (isNaN(i) || isNaN(j)) {
				i = 0;
				j = 0;
			}
			this.mp.co_b.img = paramImage;
			this.mp.co_b.zs_x = i;
			this.mp.co_b.zs_y = j;

			return true;
		}
		return false;
	}

	setSystemPattern(paramString1: string, paramString2: string) {
		var i = 1;
		var j = 1;
		if (this.mp != null) {
			i = parseInt(paramString1);
			j = parseInt(paramString2);
			if (isNaN(i) || isNaN(j)) i = -1;
			if (i < 1 || i > 249) {
				return false;
			}
			if (j < 1 || j > 249) {
				return false;
			}
			this.mp.hih[0][i] = this.mp.hih[0][j];
			this.mp.hih[1][i] = this.mp.hih[1][j];

			this.mp.setmapc_f = true;

			return true;
		}
		return false;
	}

	setSystemPatternImage(paramString1: string, paramString2: string, paramImage: ImageBuff) {
		var i = 1;
		var j = 0;
		if (this.mp != null) {
			i = parseInt(paramString1);
			j = parseInt(paramString2);
			if (isNaN(i) || isNaN(j)) i = -1;
			if (i < 1 || i > 249) {
				return false;
			}
			if (j < 0 || j > 1) {
				j = 0;
			}
			this.mp.hih[j][i] = paramImage;

			this.mp.setmapc_f = true;

			return true;
		}
		return false;
	}

	getCoinCount(paramString1: string, paramString2: string, paramString3: string, paramString4: string) {
		if (arguments.length === 0) {
			if (this.mp != null) {
				return this.mp.getCoinCount(0, 0, this.mp.mapWidth - 1, this.mp.mapHeight - 1);
			}
			return -1;
		}

		var i = 0;
		var j = 0;
		var k = 0;
		var m = 0;
		if (this.mp != null) {
			i = parseInt(paramString1);
			j = parseInt(paramString2);
			k = parseInt(paramString3);
			m = parseInt(paramString4);
			if (isNaN(i) || isNaN(j) || isNaN(k) || isNaN(m)) i = -1;
			if (i < 0) {
				return -1;
			}
			return this.mp.getCoinCount(i, j, k, m);
		}
		return -1;
	}

	addMyTokugi(paramString: string) {
		var i = -1;
		var bool = false;
		if (this.getMode() >= 100 && this.getMode() < 200) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -1;
			if (i < 0) {
				return false;
			}
			return this.mp.addMyTokugi(i);
		}
		return bool;
	}

	removeMyTokugi(paramString: string) {
		var i = -1;
		var bool = false;
		if (this.getMode() >= 100 && this.getMode() < 200) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -1;
			if (i < 0) {
				return false;
			}
			return this.mp.removeMyTokugi(i);
		}
		return bool;
	}

	setScore(paramString: string) {
		var i = 0;
		if (this.mp != null) {
			i = parseInt(paramString);
			if (isNaN(i)) i = 0;
			this.mp.score = i;
			this.mp.addScore(0);

			return true;
		}
		return false;
	}

	getBarrierTime() {
		var i = 0;
		if (this.mp != null && this.mp.ml_mode == 100 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			i = this.mp.j_v_c;

			return i;
		}
		return -1;
	}

	getTimeLimit() {
		var i = 0;
		if (this.mp != null && this.mp.time_max > 0 && this.mp.ml_mode == 100) {
			i = Math.floor(this.mp.time / 1000);

			return i;
		}
		return -1;
	}

	setTimeLimit(paramString: string) {
		var i = 0;
		if (this.mp != null && this.mp.time_max > 0) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -1;
			if (i < 0) {
				return false;
			}
			this.mp.time = i * 1000 + 1000 - 70;

			return true;
		}
		return false;
	}

	setAthletic(paramString1: string, paramString2: string, paramString3: string) {
		var i = -1;
		var j = 0;
		var k = 0;
		if (this.getMode() >= 100 && this.getMode() < 200) {
			j = parseInt(paramString1);
			k = parseInt(paramString2);
			i = parseInt(paramString3);
			if (isNaN(i) || isNaN(j) || isNaN(k)) i = -1;
			if (i < 0) {
				return false;
			}
			if (j < 0) {
				j = 0;
			}
			if (j >= this.mp.mapWidth) {
				j = this.mp.mapWidth - 1;
			}
			if (k < 0) {
				k = 0;
			}
			if (k >= this.mp.mapHeight) {
				k = this.mp.mapHeight - 1;
			}
			j += 1;
			k += 10;

			var m = 0;
			if (this.mp.maps.map_bg[j - 1][k] == 4) {
				m = 4;
			}
			if (i >= 2) {
				var n = this.mp.setAthleticOnMap(i, j, k);
				if (n == -99) {
					this.mp.aSet(j * 32 + 16, k * 32 + 16, 70, j * 32);
					m = 50;
				} else {
					m = n;
				}
			} else {
				this.mp.aSet(j * 32 + 16, k * 32 + 16, 70, j * 32);
				m = 50;
			}
			this.mp.maps.map_bg[j][k] = m;

			this.mp.setmapc_f = true;

			return true;
		}
		return false;
	}

	setSecondImage(paramString: string) {
		if (this.getMode() >= 100 && this.getMode() < 200) {
			var localImage = this.gg.loadImage(paramString);
			this.mp.second_gazou_img = localImage;

			return true;
		}
		return false;
	}

	setGrenadeCount(paramString: string) {
		var i = 0;
		if (this.getMode() >= 100 && this.getMode() < 200 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -1;
			if (i < 0) {
				return false;
			}
			this.mp.j_gr_kazu = i;

			return true;
		}
		return false;
	}

	setMyLeft(paramString: string) {
		var i = 0;
		if (this.getMode() >= 100 && this.getMode() < 200) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -1;
			if (i < 0) {
				return false;
			}
			this.mp.j_left = i;

			return true;
		}
		return false;
	}

	getGrenadeCount() {
		var i = 0;
		if (this.getMode() >= 100 && this.getMode() < 200 && this.mp.co_j.c >= 100 && this.mp.co_j.c < 200) {
			i = this.mp.j_gr_kazu;
			if (i < 0) {
				i = 0;
			}
			return i;
		}
		return i;
	}

	getMyLeft() {
		var i = -1;
		if (this.getMode() >= 100 && this.getMode() < 200) {
			i = this.mp.j_left;

			return i;
		}
		return i;
	}

	setEnemyPress(paramString: string) {
		var i = 1;
		if (this.getMode() >= 100 && this.getMode() < 200) {
			i = parseInt(paramString);
			if (isNaN(i)) i = -1;
			if (i < 0) {
				return false;
			}
			if (i < 1 || i > 3) {
				i = 1;
			}
			this.mp.j_enemy_press = i;

			return true;
		}
		return false;
	}

	getImage(url: string) {
		var img = new ImageBuff();
		img.load(url);
		return img;
	}

	createImage(w: number, h: number) {
		var img = new ImageBuff(w, h);
		return img;
	}

	getParameter(name: string) {
		var s = (name + "").toLowerCase();
		var p = this.params[s];
		if (typeof p === "undefined") return null;
		return this.params[s] + "";
	}

	/**
	 * 音声ファイルのURLの拡張子を適切につけかえる
	 *
	 * @param {string} url 音声ファイルのURL
	 * @param {boolean} bgmflag ファイルがBGM用か
	 * @returns {string}
	 */
	getAudioURL(url: string | null, bgmflag?: boolean) {
		var i1, i2;
		url = url + "";

		// 拡張子を取り除く作業
		i1 = url.lastIndexOf(".");
		if (i1 != -1) {
			// ディレクトリを指定した相対パス・絶対パスかもしれない
			i2 = url.lastIndexOf("/");
			if (i2 != -1) {
				// ピリオドがスラッシュの後ろにあるとき、ピリオド以下は拡張子と見なす
				if (i1 > i2) {
					url = url.substring(0, i1);
				}
			}
			// カレントディレクトリでファイル名のみの指定では、ピリオド以下は拡張子と見なす
			else {
				url = url.substring(0, i1);
			}
		}

		var audio = new Audio();
		if (bgmflag) {
			// Wave形式
			if (audio.canPlayType("audio/wav") && !this.audio_bgm_no_wave) url += ".wav";
			// MP3形式
			else if (audio.canPlayType("audio/mpeg") && !this.audio_bgm_no_mp3) url += ".mp3";
			// Ogg形式
			else if (audio.canPlayType("audio/ogg") && !this.audio_bgm_no_ogg) url += ".ogg";
			else url = "";
		} else {
			// Wave形式
			if (audio.canPlayType("audio/wav") && !this.audio_se_no_wave) url += ".wav";
			// MP3形式
			else if (audio.canPlayType("audio/mpeg") && !this.audio_se_no_mp3) url += ".mp3";
			// Ogg形式
			else if (audio.canPlayType("audio/ogg") && !this.audio_se_no_ogg) url += ".ogg";
			else url = "";
		}
		return url;
	}

	getAudioClip(url: string | null, flag?: boolean) {
		return new AudioClip(this.getAudioURL(url, flag));
	}

	// メッセージを受け取ってキューの最後に追加する
	pushMessage<T extends keyof MasaoMessageMap>(
		type: T,
		target: MasaoMessageMap[T]["target"],
		parameters: MasaoMessageMap[T]["parameters"]
	) {
		var newMessage = {} as MasaoMessage;
		newMessage.type = type;
		newMessage.target = target;
		newMessage.parameters = parameters;
		newMessage.next = null;
		if (this.firstMessage == null) {
			this.firstMessage = newMessage;
		}
		if (this.lastMessage != null) {
			this.lastMessage.next = newMessage;
		}
		this.lastMessage = newMessage;
	}

	loadAdvanceMapJson(url: string) {
		var xhr = new XMLHttpRequest();
		var stateObj = { complete: false };
		xhr.open("GET", url, true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				try {
					this.options["advanced-map"] = JSON.parse(xhr.responseText);
				} catch (ex) {
					console.error("Failed to load JSON: " + url);
				}
				stateObj.complete = true;
				xhr.onreadystatechange = null;
			}
		};

		this.pushMessage("loadAdvanceMapJson", stateObj, null);

		xhr.send(null);
	}

	/**
	 * 現在のゲーム状態のスナップショットオブジェクトを作成して返します。
	 */
	getSnapshot() {
		var result = {
			mp: this.mp.getSnapshot()
		};
		return result;
	}
}

export { MasaoConstruction };
