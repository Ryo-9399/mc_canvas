import { GameGraphics } from "./GameGraphics";
import { GameKey, GameKey_keyPressed, GameKey_keyReleased } from "./GameKey";
import { GameMouse, GameMouse_mousePressed, GameMouse_mouseReleased } from "./GameMouse";
import { Game } from "./GlobalFunctions";
import { ImageBuff, Color } from "./ImageBuff";
import { MainProgram } from "./MainProgram";

class MasaoConstruction {
	constructor(params, __canvas, __game, options) {
		this.th_interval = 70;
		this.th_jm = 10;
		this.params = params;
		this.__canvas = __canvas;
		this.__appimg = new ImageBuff(512, 320);

		this.__game = __game;

		// 起動オプションの連想配列
		this.options = options;
	}
	// __appimg書き換え関数
	__repaint() {
		this.update(this.__appimg.getGraphics());
		const ctx = this.__canvas.getContext("2d");
		ctx.drawImage(this.__appimg._dat, 0, 0);
	}
	init() {}
	start() {
		if (this.th == null) {
			this.th = 1;
		}
		const s = this.getParameter("game_speed");
		this.th_interval = parseInt(s);
		if (isNaN(this.th_interval)) this.th_interval = 70;
		if (this.th_interval < 1) this.th_interval = 1;
		else if (this.th_interval > 300) this.th_interval = 300;
		this.th_jm = 10;
	}
	stop() {
		if (this.th != null) this.th = null;
	}
	destroy() {}
	paint(g) {
		g.drawImage(this.gg.os_img, 0, 0, this);
	}
	update(g) {
		this.paint(g);
	}
	run() {
		let sleepTime;
		if (this.th_jm == 10) {
			this.init_j();

			this.mp.start();

			this.th_jm -= 1;

			sleepTime = 70;
		} else if (this.th_jm == 6) {
			let f1 = 0;
			if (this.gg.apt_img._loaded) f1 = 1;
			else if (this.gg.apt_img._error) f1 = 2;
			if (f1 != 0) this.th_jm -= 1;
		} else if (this.th_jm == 2) {
			this.gg.cut();
			this.th_jm -= 1;

			sleepTime = 70;
		} else if (this.th_jm >= 2) {
			this.th_jm -= 1;

			sleepTime = 70;
		} else {
			if (this.mp.ml_mode == 100) {
				this.mp.mL100();
			} else {
				this.mp.mainLoop();
			}
			this.userSub(this.gg.os_g, this.gg.os_img);
		}
		this.__repaint();
	}
	init_j() {
		this.gg = new GameGraphics(this);
		this.gg.setBackcolor(Color.black);
		let s = this.getParameter("filename_title");
		this.gg.addListImage(0, s);
		s = this.getParameter("filename_ending");
		this.gg.addListImage(1, s);
		s = this.getParameter("filename_gameover");
		this.gg.addListImage(2, s);
		s = this.getParameter("stage_select");
		let i;
		i = parseInt(s);
		if (isNaN(i)) i = -1;
		if (i == 2) {
			const s1 = this.getParameter("filename_chizu");
			this.gg.addListImage(3, s1);
		}
		this.gg.loadImage();

		this.gm = new GameMouse();
		const _gm = this.gm;
		this.__canvas.addEventListener(
			"mousedown",
			function (e) {
				e.stopImmediatePropagation();
				Game.focus.focus(this);
				GameMouse_mousePressed(_gm, e);
			}.bind(this)
		);
		this.__canvas.addEventListener("mouseup", function (e) {
			GameMouse_mouseReleased(_gm, e);
		});

		this.gk = new GameKey();
		const _gk = this.gk;
		let _handler = function (e) {
			if (Game.focus.hasFocus(this)) GameKey_keyPressed(_gk, e);
		}.bind(this);
		document.addEventListener("keydown", _handler);
		this.__game.__resourceList.push({
			type: "eventListener",
			target: document,
			name: "keydown",
			value: _handler
		});

		_handler = function (e) {
			if (Game.focus.hasFocus(this)) GameKey_keyReleased(_gk, e);
		}.bind(this);
		document.addEventListener("keyup", _handler);
		this.__game.__resourceList.push({
			type: "eventListener",
			target: document,
			name: "keyup",
			value: _handler
		});

		this.mp = new MainProgram(this.gg, this.gm, this.gk);
		(this.mp.tdb = {}).options = this.options; //FXと同じ名前でオプションを読み込むため

		// ハイスコアイベント用のリスナ登録
		this.mp.addHighscoreEvent(this.options.highscoreCallback);

		this.userInit();
	}
	userInit() {}
	userSub(paramGraphics, paramImage) {}
	getImage(url) {
		const img = new ImageBuff();
		img.load(url);
		return img;
	}
	createImage(w, h) {
		const img = new ImageBuff(w, h);
		return img;
	}
	getParameter(name) {
		const s = (name + "").toLowerCase();
		const p = this.params[s];
		if (typeof p === "undefined") return null;
		return this.params[s] + "";
	}
}

export { MasaoConstruction };
