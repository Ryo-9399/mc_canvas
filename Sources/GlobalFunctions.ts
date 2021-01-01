import { MasaoConstruction } from "./MasaoConstruction";
import { Params, Option, LoopInstance } from "./MasaoOption";
import { ImageBuff } from "./ImageBuff";
import { MainProgram } from "./MainProgram";

declare function requestIdleCallback(
	callback: (deadline: IdleDeadline) => void,
	options?: {
		timeout: number;
	}
): number;

declare interface IdleDeadline {
	readonly didTimeout: boolean;
	timeRemaining(): DOMHighResTimeStamp;
}

declare function setImmediate(func: () => void, ...param: unknown[]): number;

type Resource =
	| {
			type: "setInterval";
			value: number;
	  }
	| {
			type: "Loop";
			value: LoopInstance;
	  }
	| {
			type: "eventListener";
			release: () => void;
	  };

/**
 * 正男インスタンス
 */
class Game {
	__boxID: string;
	__canvasID: string;
	__padDivID: string;
	__box: HTMLElement;
	__resourceList: Resource[];
	__canvas: HTMLCanvasElement;
	__padDiv: HTMLDivElement;
	__pad_before: boolean[] = [];
	__pad_after: boolean[] = [];
	__pad_touches: Touch[] = [];
	__pad: HTMLCanvasElement | undefined;
	__pad_off: HTMLCanvasElement | undefined;
	__mc!: MasaoConstruction;
	__st = 70;
	__pt = 0;
	__testCanvas: HTMLCanvasElement | undefined;
	__testDiv: HTMLDivElement | undefined;
	__teo: { [key: string]: { val: unknown; t: number } } = {};

	/**
	 * 新しい正男のインスタンスを生成します。
	 * 引数`id`ありで呼ばれた場合、そのIDを持つ要素の下に正男を設置します。
	 * 引数`id`なしで呼ばれた場合、その場所にdocument.writeで正男を設置します。
	 *
	 * @param params paramの一覧
	 * @param id 正男を設置する要素のID
	 * @param options オプション
	 */
	constructor(params: Params, id?: string, options?: Option) {
		var randomID = makeRandomString();

		options = options || {};
		//Extends内のものをここに入れると反映される
		options.extensions = options.extensions || [];

		// DivエレメントID
		if (id) {
			// idを持つ要素の配下に設置する
			this.__boxID = id;
		} else {
			// idが無ければ現在の場所に作る
			// ドキュメント書き込み文
			this.__boxID = "__mcdiv" + randomID;
			document.write(`<div id='${this.__boxID}'></div>`);
		}

		// キャンバスID
		this.__canvasID = "__mccanvas" + randomID;

		// ソフトパッドDivID
		this.__padDivID = "__mcpaddiv" + randomID;

		// 要素格納Divエレメント
		this.__box = document.getElementById(this.__boxID)!;

		// 後始末が必要なもの一覧 入るもの：
		// {type: "setInterval", value: (setIntervalの返り値)}
		// {type: "eventListener", target: (EventTarget), name: (イベント名), value: (イベントハンドラ関数)}
		this.__resourceList = [];

		// メインCanvasオブジェクト
		this.__canvas = document.createElement("canvas");
		this.__canvas.id = this.__canvasID;
		this.__canvas.width = options.width || 512;
		this.__canvas.height = options.height || 320;
		this.__canvas.textContent = "※お使いのブラウザはHTML5に対応していないため表示できません。";
		this.__box.appendChild(this.__canvas);

		// ソフトパッド格納Divエレメント
		// タッチスクリーン対応の端末ではソフトウェアパッドも表示する
		this.__padDiv = document.createElement("div");
		this.__padDiv.id = this.__padDivID;
		this.__box.appendChild(this.__padDiv);

		// デバッグ時に下のコメントアウトを外すと便利
		/*
	// テストCanvas
	this.__testCanvas = document.createElement("canvas");
	this.__testCanvas.width = 700;
	this.__testCanvas.height = 700;
	this.__box.appendChild(this.__testCanvas);
	// テストDIV
	this.__testDiv = document.createElement("div");
	this.__box.appendChild(this.__testDiv);
	this.__teo = {};
*/

		if (!this.__canvas) return;
		if (!this.__canvas.getContext) return;

		// ソフトウェアパッド用変数
		//var __pad_btn;
		this.__pad_before = [];
		this.__pad_after = [];
		this.__pad_touches = [];

		// タッチスクリーン対応端末での処理
		if (window.TouchEvent) {
			var ss;

			// 表示/非表示切り替えボタン設定
			var __pad_btn = document.createElement("input");
			__pad_btn.type = "button";
			__pad_btn.value = "バーチャル操作パッド 表示 / 非表示";
			ss = __pad_btn.style;
			ss.width = "24em";
			ss.height = "2.5em";
			__pad_btn.onclick = () => {
				if (__pad.style.display == "inline") __pad.style.display = "none";
				else {
					Game.padAccessor.show(__pad);
				}
			};
			// ボタン配置
			this.__padDiv.appendChild(__pad_btn);

			// 改行
			this.__padDiv.appendChild(document.createElement("br"));

			// ソフトウェアパッド設定
			var __pad = (this.__pad = document.createElement("canvas"));
			__pad.width = 500;
			__pad.height = 200;
			var __pad_event = (e: TouchEvent) => {
				this.__pad_event(e);
			};
			__pad.addEventListener("touchstart", __pad_event, false);
			__pad.addEventListener("touchmove", __pad_event, false);
			__pad.addEventListener("touchend", __pad_event, false);
			__pad.addEventListener("touchcancel", __pad_event, false);
			__pad.style.display = "none";
			// パッド配置
			this.__padDiv.appendChild(__pad);

			ss = __pad.style;
			ss.position = "absolute";
			//ss.bottom = "0px";
			//ss.left = "0px";
			//ss.textAlign = "right";
			var __interval_id = setInterval(() => {
				var w = innerWidth;
				var h = innerHeight;
				var rw = w < h ? w : h;
				__pad.style.width = w + "px";
				__pad.style.height = rw * Game.pad.style.rate + "px";
				__pad.style.left = scrollX + "px";
				if (Game.pad.avoidAD) __pad.style.top = scrollY + h - rw * Game.pad.style.rate - rw * 0.16 + "px";
				else __pad.style.top = scrollY + h - rw * Game.pad.style.rate + "px";
				this.__pad_update();
			}, 500);
			this.__resourceList.push({
				type: "setInterval",
				value: __interval_id,
			});

			// 表示リストにパッドを登録
			Game.padAccessor.append(__pad);

			this.__pad_off = document.createElement("canvas");
			this.__pad_off.width = 500;
			this.__pad_off.height = 200;
			var ctx = this.__pad_off.getContext("2d")!;
			ctx.font = "24px monospace";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.lineWidth = 2;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			for (var i = 0; i < 8; i++) {
				this.__pad_before[i] = false;
				this.__pad_after[i] = false;
			}
			this.__pad_update();

			// 画面タッチに反応してユーザーインタラクションによりサウンドを有効化
			const touchendHandler = () => {
				// バーチャル操作パッド表示に反応してサウンドを有効化
				if (this.__mc.gs) {
					this.__mc.gs.userInteract();
					document.removeEventListener("touchend", touchendHandler, false);
				}
			};
			document.addEventListener("touchend", touchendHandler, false);
		}

		// __appimgはMasaoConstruction内へ移動
		// MasaoConstructionオブジェクト
		this.__mc = new MasaoConstruction(params, this.__canvas, this, options || {});
		for (var i = 0; i < options.extensions.length; i++) {
			options.extensions[i].inject(this.__mc, options);
		}
		this.__mc.start();
		var __st;
		__st = this.__mc.getParameter("game_speed");
		if (__st) {
			__st = parseInt(__st);
			if (isNaN(__st)) {
				__st = 70;
			} else if (__st < 10) {
				__st = 10;
			} else if (__st > 300) {
				__st = 300;
			}
		} else __st = 70;
		this.__st = __st;

		this.__pt = 0;

		// メインループを作成
		// カスタムメインループが提供されていたらそれを使用
		var loopConstructor = options["custom-loop"] || Loop;
		var __loop = new loopConstructor(this, !!options["bc-loop-setinterval"]);
		__loop.start(__st, this.__loop.bind(this));
		this.__resourceList.push({
			type: "Loop",
			value: __loop,
		});

		// 画面サイズが変更されていたら更新
		if (parseInt(this.__mc.getParameter("mcs_screen_size") as string) == 1) {
			this.__canvas.width = options.width || 640;
			this.__canvas.height = options.height || 480;
		}
	}

	/**
	 * ページ読み込み後、ページ内の全ての正男appletをcanvas正男に置換します。
	 *
	 * @param options オプション
	 */
	static replaceAll(options?: Option) {
		if (document.readyState == "complete") {
			onload();
		} else {
			window.addEventListener("load", onload);
		}
		function onload() {
			var applets = document.getElementsByTagName("applet");
			var appletArray = [];
			for (var i = 0; i < applets.length; i++) {
				appletArray.push(applets[i]);
			}
			for (var i = 0; i < appletArray.length; i++) {
				var applet = appletArray[i],
					code = applet.getAttribute("code") || "";
				if (code.match(/masaoconstruction/i) || code.match(/masaokani/i)) {
					// 正男であるようなら置換
					Game.replaceByDom(applet, options);
				}
			}
			var objects = document.getElementsByTagName("object");
			var objectArray = [];
			for (var i = 0; i < objects.length; i++) {
				objectArray.push(objects[i]);
			}
			for (var i = 0; i < objectArray.length; i++) {
				var object = objectArray[i];
				var param = object.querySelectorAll("param[name=code]")[0] as HTMLParamElement;
				// name属性に"code"を持つparam要素が
				// value属性に"masaoconstruction"または"masaokani"を含む時にまさおアプレットと判断する
				if (param.tagName.match(/param/i)) {
					if (param.value.match(/masaoconstruction/i) || param.value.match(/masaokani/i)) {
						Game.replaceByDom(object, options);
					}
				}
			}
		}
	}

	/**
	 * ページ読み込み後，指定されたidを持つ正男appletをcanvas正男に置換します。
	 *
	 * @param id アプレットのID
	 * @param options オプション
	 */
	static replace(id: string, options?: Option) {
		if (document.readyState == "complete") {
			// load済みの場合は即座に呼び出す
			onload();
		} else {
			// この関数をonload時に呼び出すようにする
			window.addEventListener("load", onload);
		}
		function onload() {
			// 従来ソースのパラメータを取得
			Game.replaceByDom(document.getElementById(id)!, options);
		}
	}

	static replaceByDom(paramScope: HTMLElement, options?: Option) {
		if (!paramScope.parentNode) return;
		var paramTags = paramScope.getElementsByTagName("param");
		var paramLength = paramTags.length;
		var params = {} as Params;
		for (var i = 0; i < paramLength; i++) {
			params[paramTags[i].name] = paramTags[i].value;
		}
		// 元のappletをdivで置き換える
		var newDiv = document.createElement("div");
		var id = paramScope.id || makeRandomString();
		newDiv.id = id;
		paramScope.parentNode.replaceChild(newDiv, paramScope);
		//変換時に小数切り捨て処理をJava版にする
		options = options || {};
		if (options["bc-use-rounddown"] !== false) options["bc-use-rounddown"] = true;
		new Game(params, id, options);
	}

	// 動作する部分を管理するオブジェクト
	// Game.focus.focus(obj) : このオブジェクトobjにフォーカスを当てる
	// Game.focus.hasFocus(obj) : このオブジェクトobjにフォーカスが当たっているならばtrueを返す
	static focus = (function () {
		var focusedObject: unknown;
		document.addEventListener("mousedown", function () {
			focusedObject = null;
		});
		return {
			focus: function (obj: typeof focusedObject) {
				focusedObject = obj;
			},
			hasFocus: function (obj: typeof focusedObject) {
				return focusedObject === obj;
			},
		};
	})();

	// 仮装パッドの表示リストを管理するオブジェクト
	// Game.padAccessor.append(pad) : パッドpadをリストに登録する
	// Game.padAccessor.show(pad) : パッドpadを表示し、リストの他のパッドを非表示にする
	static padAccessor = (function () {
		var padArray: HTMLCanvasElement[] = [];
		return {
			append: function (pad: HTMLCanvasElement) {
				padArray.push(pad);
			},
			show: function (pad: HTMLCanvasElement) {
				for (var i = 0; i < padArray.length; i++) {
					if (pad !== padArray[i]) padArray[i].style.display = "none";
					else pad.style.display = "inline";
				}
			},
		};
	})();

	/**
	 * ゲームを終了する関数です。
	 * ゲームのメインループを終了し、このインスタンスによって追加されたDOMオブジェクトやタイマーを除去します。
	 */
	kill() {
		//ゲームを止める
		this.__mc.destroy();
		//__resourceListの中身を全部後始末してあげる
		for (var rl = this.__resourceList, i = 0, l = rl.length; i < l; i++) {
			const res = rl[i];
			if (res.type === "setInterval") {
				clearInterval(res.value);
			} else if (res.type === "eventListener") {
				res.release();
			} else if (res.type === "Loop") {
				res.value.stop();
			}
		}
		this.__resourceList = [];
		//追加したノードを消す
		while (this.__box.hasChildNodes()) {
			this.__box.removeChild(this.__box.firstChild!);
		}
	}

	/**
	 * ゲームのメインループを1回実行する関数です。
	 */
	__loop() {
		var pt = new Date().getTime();
		if (pt - this.__pt < this.__st) return;
		this.__pt = pt - 10;

		// デバッグ用キャンバス描画
		if (this.__testCanvas) {
			var ctx = this.__testCanvas.getContext("2d");
			if (ctx) {
				ctx.fillStyle = "rgb(128,0,128)";
				ctx.fillRect(0, 0, 700, 700);
				ctx.strokeStyle = "#f00";
				var i;
				if (this.__mc.gg) {
					ctx.save();
					ctx.scale(0.5, 0.5);
					ctx.drawImage(this.__mc.gg.os_img._dat!, 0, 0);
					//ctx.drawImage(this.__mc.gg.os2_img._dat,0,832);
					ctx.drawImage(this.__mc.gg.os2_img._dat!, 576, 0);
					//for(i=0; i<25; i++) for(j=0; j<10; j++) ctx.drawImage(this.__mc.gg.spt_img[0][i*10+j]._dat, j*48, i*48);
					//for(i=0; i<25; i++) for(j=0; j<10; j++) ctx.drawImage(this.__mc.gg.spt_img[0][i*10+j]._dat, j*48+640, i*48);
					//for(i=0; i<16; i++) for(j=0; j<16; j++) ctx.drawImage(this.__mc.gg.smapchip_img[i*16+j]._dat, j*48+832, i*48+832);
					ctx.restore();
					ctx.beginPath();
					for (i = 0; i < 700; i += 32) {
						ctx.moveTo(0, i);
						ctx.lineTo(700, i);
						ctx.moveTo(i, 0);
						ctx.lineTo(i, 700);
					}
				}
				ctx.stroke();
			}
		}

		// デバッグ用文字表示
		if (this.__testDiv) {
			if (this.__mc.mp) {
				var mp = this.__mc.mp;
				var str = "<div style='text-align:left'>";
				var prop: keyof typeof mp;
				var type;
				for (prop in mp) {
					type = Object.prototype.toString.call(mp[prop]);
					if (type != "[object Array]" && type != "[object Function]") {
						if (!(prop in this.__teo)) {
							this.__teo[prop] = { val: mp[prop], t: 0 };
						} else if (this.__teo[prop].t > 0) {
							str += `<span style='background-color:rgba(255,255,255,${this.__teo[prop].t / 6})'>${prop}: ${
								mp[prop]
							}</span> `;
							this.__teo[prop].t--;
						} else {
							str += `${prop}: ${mp[prop]} `;
						}
						if (this.__teo[prop].val != mp[prop]) {
							this.__teo[prop].val = mp[prop];
							this.__teo[prop].t = 6;
						}
					}
				}
				this.__testDiv.innerHTML = str + "</div>";
			}
		}

		this.__mc.run();
	}

	// __repaintはMasaoConstructionへ移動

	/**
	 * ソフトウェアパッド更新関数
	 * @internal
	 */
	__pad_update() {
		if (!this.__pad || !this.__pad_off) return;
		var r = this.__pad.getBoundingClientRect();
		var dx = r.left;
		var dy = r.top;
		var c = this.__pad_off.getContext("2d");
		var i, j, k, tmp, sx, sy;
		var num = Game.pad.coords.length;
		if (c) {
			c.clearRect(0, 0, 500, 200);
			c.fillStyle = Game.pad.style.back;
			c.fillRect(0, 0, 500, 200);
			c.fillStyle = Game.pad.style.button;
			for (i = 0; i < num; i++) {
				c.beginPath();
				tmp = Game.pad.coords[i];
				k = tmp.length >> 1;
				c.moveTo(tmp[0], tmp[1]);
				for (j = 0; j < k; j++) {
					c.lineTo(tmp[j << 1], tmp[(j << 1) + 1]);
				}
				c.closePath();
				c.fill();
			}

			for (i = 0; i < num; i++) {
				this.__pad_after[i] = false;
			}

			c.fillStyle = Game.pad.style.active;

			for (i = 0; i < num; i++) {
				c.beginPath();
				tmp = Game.pad.coords[i];
				k = tmp.length >> 1;
				c.moveTo(tmp[0], tmp[1]);
				for (j = 0; j < k; j++) {
					c.lineTo(tmp[j << 1], tmp[(j << 1) + 1]);
				}
				c.closePath();
				for (j in this.__pad_touches) {
					sx = this.__pad_touches[j].clientX - dx;
					sy = this.__pad_touches[j].clientY - dy;
					this.__pad_after[i] = this.__pad_after[i] || c.isPointInPath((sx / r.width) * 500, (sy / r.height) * 200);
				}
				if (this.__pad_after[i]) c.fill();
			}

			c.strokeStyle = Game.pad.style.border;
			c.fillStyle = Game.pad.style.text;
			for (i = 0; i < num; i++) {
				c.beginPath();
				tmp = Game.pad.coords[i];
				k = tmp.length >> 1;
				c.moveTo(tmp[0], tmp[1]);
				for (j = 1; j < k; j++) {
					c.lineTo(tmp[j << 1], tmp[(j << 1) + 1]);
				}
				c.closePath();
				c.stroke();
				k = measureCenterOfGravity(tmp);
				c.fillText(Game.pad.chars[i], k[0], k[1]);
			}
			c.stroke();
		}

		c = this.__pad.getContext("2d");
		if (c) {
			c.clearRect(0, 0, 500, 200);
			c.drawImage(this.__pad_off, 0, 0);
			for (i = 0; i < num; i++) {
				if (this.__pad_before[i] != this.__pad_after[i]) {
					this.__pad_before[i] = this.__pad_after[i];
					if (this.__pad_after[i]) this.__pad_pressed(i);
					else this.__pad_released(i);
				}
			}
		}

		// 頂点の配列から重心を求める
		function measureCenterOfGravity(p: number[]) {
			/*
		(x1, y1) : 基本頂点の座標
		(x2, y2) : 古い頂点の座標
		(x3, y3) : 次の頂点の座標
		(gx, gy) : 現時点の重心の座標
		s : 現時点での多角形の面積（質量と比例する）
		(gx2, gy2) : 新しい三角形の重心
		s2 : 新しい三角形の面積（質量と比例する）
		*/
			var i,
				n = p.length >> 1;
			var x1, y1, x2, y2, x3, y3;
			var gx, gy, s, gx2, gy2, s2;
			x1 = p[0];
			y1 = p[1];
			gx = x1;
			gy = y1;
			if (n == 1) {
				return [gx, gy];
			}
			x2 = p[2];
			y2 = p[3];
			gx = (gx + x2) / 2;
			gy = (gy + y2) / 2;
			if (n == 2) {
				return [gx, gx];
			}
			x3 = p[4];
			y3 = p[5];
			s = Math.abs((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1)) / 2;
			gx = (x1 + x2 + x3) / 3;
			gy = (y1 + y2 + y3) / 3;
			for (
				i = 3;
				i < n;
				i++ // ４頂点以上からこのループに入る
			) {
				x2 = x3;
				y2 = y3;
				x3 = p[i << 1];
				y3 = p[(i << 1) + 1];
				s2 = Math.abs((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1)) / 2;
				gx2 = (x1 + x2 + x3) / 3;
				gy2 = (y1 + y2 + y3) / 3;
				gx = (s * gx + s2 * gx2) / (s + s2);
				gy = (s * gy + s2 * gy2) / (s + s2);
				s = s2;
			}
			return [gx, gy];
		}
	}

	__pad_pressed(ch: number) {
		if (this.__mc.gk) {
			var co = Game.pad.codes[ch];
			this.__mc.gk.keyPressed({
				keyCode: co,
				preventDefault: function () {},
			});
		}
	}

	__pad_released(ch: number) {
		if (this.__mc.gk) {
			var co = Game.pad.codes[ch];
			this.__mc.gk.keyReleased({
				keyCode: co,
				preventDefault: function () {},
			});
		}
	}

	__pad_event(e: TouchEvent) {
		e.preventDefault();
		this.__pad_touches = [];
		for (var i = 0; i < e.touches.length; i++) {
			this.__pad_touches.push(e.touches[i]);
		}
		this.__pad_update();
	}

	static pad = {
		coords: [
			[410, 30, 490, 30, 490, 170, 410, 170],
			[320, 30, 400, 30, 400, 170, 320, 170],
			[250, 30, 290, 30, 290, 70, 250, 70],
			[200, 30, 240, 30, 240, 70, 200, 70],
			[5, 60, 87, 60, 87, 140, 5, 140],
			[175, 60, 93, 60, 93, 140, 175, 140],
			[30, 5, 30, 80, 150, 80, 150, 5],
			[30, 195, 30, 120, 150, 120, 150, 195],
		],
		chars: ["X", "Z", "T", "P", "←", "→", "↑", "↓"],
		codes: [88, 90, 84, 80, 37, 39, 38, 40],
		style: {
			rate: 0.4,
			back: "rgba(0, 0, 0, 0)",
			button: "rgba(128, 128, 128, 0.5)",
			active: "rgba(0, 0, 0, 0.5)",
			text: "black",
			border: "black",
		},
		avoidAD: false,
	};
}

// メディアの読み込みを待つ関数
function waitFor(param: ImageBuff[]) {
	/*for(var i in param)
	{
		var ret;
		while(true)
		{
			if(param[i]._loaded)
			{
				ret = true;
				break;
			}
			else if(param[i]._error)
			{
				ret = false;
				break;
			}
		}
	}*/
}

// java.applet.AudioClipもどき（未実装）
class AudioClip {
	_dat: HTMLAudioElement;
	constructor(url: string) {
		this._dat = new Audio();
		//alert(this._dat.src);
		this._dat.preload = "auto";
		this._dat.src = url;
		/*this._loaded = false;
		this._error = false;
		var _this = this;
		this._dat.oncanplaythrough = function()
		{
			AudioClip__oncanplaythrough(_this);
		}
		this._dat.onerror = function()
		{
			AudioClip__onerror(_this);
		}
		__box.appendChild(this._dat);*/
	}
	_oncanplaythrough() {
		//this._loaded = true;
	}
	_onerror() {
		//this._error = true;
		//this._dat.src = "";
	}

	play() {
		try {
			this._dat.loop = false;
			this._dat.currentTime = 0;
			this._dat.play();
		} catch (e) {
			return false;
		}
		return true;
	}

	loop() {
		try {
			this._dat.loop = true;
			this._dat.currentTime = 0;
			this._dat.play();
		} catch (e) {
			return false;
		}
		return true;
	}

	stop() {
		try {
			this._dat.pause();
		} catch (e) {
			return false;
		}
		return true;
	}
}

// java.awt.Dimension
class Dimension {
	width: number;
	height: number;
	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}
}

// 多次元配列作成
function createNDimensionArray(): null;
function createNDimensionArray(len1: number, ...lengths: number[]): any[];
function createNDimensionArray(...lengths: number[]) {
	if (arguments.length == 0) return null;
	var a = new Array(arguments.length);
	for (var i = 0; i < arguments.length; i++) a[i] = arguments[i];
	var r = (function F(an) {
		var ary = new Array(an[0]);
		if (an.length == 1) return ary;
		var an2 = an.slice(1);
		for (var i = 0; i < an[0]; i++) ary[i] = F(an2);
		return ary;
	})(a);
	return r;
}

/**
 * 小数切り捨て
 * @param val 切り捨てを行いたい小数
 * @returns 小数切り捨て後の値
 */
function rounddown(val: number): number;
/**
 * 小数切り捨て
 * @param val 切り捨てを行いたい小数
 * @param option option が true かつ bc-use-rounddown がfalseの時Canvasオリジナルに
 * @returns 小数切り捨て後の値
 */
function rounddown(val: number, option: true, mp: MainProgram): number;
function rounddown(val: number, option?: boolean, mp?: MainProgram) {
	if (val >= 0 || (option && mp && !mp.tdb.options["bc-use-rounddown"])) return Math.floor(val);
	else return -Math.floor(-val);
}

// sの絶対値をnビット右シフトし、sの符号を付けた値を返す
function rightShiftIgnoreSign(s: number, n: number) {
	return s < 0 ? -(-s >> n) : s >> n;
}

function makeRandomString() {
	return Math.random().toString(36).slice(2);
}

type Placeholder = string | number | bigint | boolean;
type ConcatString<S extends Placeholder[]> = S extends []
	? ""
	: number[] extends S["length"][]
	? string
	: `${S[0]}${ConcatString<S extends [any, ...infer Rest] ? Rest : []>}`;
function concatString<S extends Placeholder[]>(...str: S): ConcatString<S> {
	return str.join("") as any;
}

/**
 * requestAnimationFrameまたはsetIntervalを用いたループを行うためのクラスです。
 */
class Loop {
	game: Game;
	forceSetInterval: boolean;
	/**
	 * @private
	 * 現在ループが回っているかどうかのフラグ。
	 */
	running: boolean;
	/**
	 * @private
	 * 現在のループの間隔（ミリ秒）。
	 */
	interval: number | null;
	/**
	 * @private
	 * ループごとに呼び出されるコールバック関数
	 */
	callback: (() => void) | null;
	/**
	 * @private
	 * ループに何を使っているかのフラグ。
	 * 0: setInterval
	 * 1: requestAnimationFrame
	 */
	mode: number;
	/**
	 * @private
	 * 前のルームが呼び出された時刻。
	 */
	prevTime: number | null;
	/**
	 * @private
	 * 現在待機中のsetIntervalやrequestAnimationFrameの返り値。
	 * ループを止めるとき用。
	 */
	timerid: number | null;
	targetTime = 0;

	/**
	 * @param game 持ち主のGameオブジェクトです。
	 * @param forceSetInterval 必ずsetIntervalを使用するフラグ
	 */
	constructor(game: Game, forceSetInterval: boolean) {
		this.game = game;
		this.forceSetInterval = forceSetInterval;
		this.running = false;
		this.interval = null;
		this.callback = null;
		this.mode = 0;
		this.prevTime = null;
		this.timerid = null;
		this._loop = this._loop.bind(this);
	}

	/**
	 * 指定した間隔（ミリ秒）でループを行います。
	 * @param interval ループの間隔
	 * @param callback ループで呼び出される関数
	 */
	start(interval: number, callback: () => void) {
		this.running = true;
		this.interval = interval;
		this.callback = callback;

		var now = timestamp();
		this.targetTime = now + interval;
		this.prevTime = now;

		if (window.requestAnimationFrame && !this.forceSetInterval) {
			this.mode = 1;
		} else {
			this.mode = 0;
		}

		if (this.mode === 0) {
			this.timerid = setInterval(this._loop, interval);
		}
		this._next();
	}

	/**
	 * ループを停止します。
	 */
	stop() {
		if (!this.running || this.timerid === null) {
			return;
		}
		this.running = false;
		if (this.mode === 1) {
			cancelAnimationFrame(this.timerid);
		} else {
			clearInterval(this.timerid);
		}
	}

	/**
	 * 次回のループを登録する関数です。
	 * @private
	 */
	_next() {
		if (this.mode === 1) {
			this.timerid = requestAnimationFrame(this._loop);
		}
	}

	/**
	 * 1回のループを処理する関数です。
	 * @private
	 */
	_loop() {
		if (!this.running || this.prevTime === null || this.interval === null || !this.callback) {
			return;
		}
		/**
		 * requestAnimationFrameのハンドラ内の時間の上限（ミリ秒）
		 * @constant
		 */
		var FRAME_TIME = 2;
		/**
		 * 一時停止の判断の閾値（ミリ秒）
		 * memo: game_speedの最大は300
		 * @constant
		 */
		var STOP_LIMIT = 500;
		/**
		 * requestIdleCallbackのコールバック呼び出し期限
		 * @constant
		 */
		var IDLE_TIMEOUT = 1000;

		var n = timestamp();
		if (n - this.prevTime >= STOP_LIMIT) {
			// 前回のループから閾値以上経過していたら一時停止があったと判断
			// 経過時間分のループを放棄
			this.targetTime = n - 1;
		}
		// 現在コールバックを呼ぶべき回数
		var loop_count = Math.ceil((n - this.targetTime) / this.interval);
		this.targetTime += this.interval * loop_count;
		while (loop_count > 0) {
			this.callback();
			loop_count--;
			// 毎回現在時刻を求め、許容される経過時間を過ぎたら
			// ループ回数が残っていても中断
			if (timestamp() - n > FRAME_TIME) {
				break;
			}
		}
		if (loop_count > 0) {
			// 処理が終わりきらなかった場合は残りは後回しにする
			// requestIdleCallbackにより描画処理後に行われることを期待
			// （描画処理を優先させてあげないとFPSが落ちるので）
			var _this = this;
			idle(
				function cb(deadline) {
					// console.warn('idle', loop_count, deadline.timeRemaining());
					while (loop_count > 0 && deadline.timeRemaining() > 0) {
						_this.callback!();
						loop_count--;
					}
					if (loop_count > 0 && !deadline.didTimeout) {
						// まだ実行しきれていない場合は次のidleに回す
						// （didTimeoutがtrueの場合は超高負荷なので諦める）
						idle(cb, {
							timeout: IDLE_TIMEOUT,
						});
					}
				},
				{
					timeout: IDLE_TIMEOUT,
				}
			);
		}
		this._next();
		this.prevTime = n;
	}
}

/**
 * 現在時刻を返す関数です。
 * ただしperformance.nowの返す時刻はUNIX時間ではなく
 * およそページを開いてからの経過時間なので、かならず相対時刻で利用すること。
 * @returns 現在時刻
 */
var timestamp =
	window.performance && performance.now
		? performance.now.bind(performance)
		: Date.now
		? Date.now.bind(Date)
		: function () {
				return new Date().getTime() * 1000;
		  };

/**
 * 処理を先送りにする関数です。
 * requestIdleCallbackを想定し、他はshimです。
 */
var idle: (...args: Parameters<typeof requestIdleCallback>) => void =
	"function" === typeof requestIdleCallback
		? requestIdleCallback
		: "function" === typeof setImmediate
		? function (cb) {
				setImmediate(function () {
					var n = timestamp();
					var deadline = {
						didTimeout: false,
						timeRemaining: function () {
							// 50ms is the maximum value recommended by Google
							return 50 + n - timestamp();
						},
					};
					cb(deadline);
				});
		  }
		: function (cb) {
				setTimeout(function () {
					var n = timestamp();
					var deadline = {
						didTimeout: false,
						timeRemaining: function () {
							// 50ms is the maximum value recommended by Google
							return 50 + n - timestamp();
						},
					};
					cb(deadline);
				}, 1);
		  };

export {
	Game,
	waitFor,
	AudioClip,
	Dimension,
	createNDimensionArray,
	rounddown,
	rightShiftIgnoreSign,
	makeRandomString,
	concatString,
};
