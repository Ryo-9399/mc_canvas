import { Dimension, createNDimensionArray } from "./GlobalFunctions";
import { Color, ImageBuff } from "./ImageBuff";

class GameGraphics {
	constructor(applet) {
		this.ap = applet;
		/**
		 * パターン画像の縦方向の分割数
		 * @type {number}
		 */
		this.spt_kazu_x = 10;
		/**
		 * パターン画像の横方向の分割数
		 * @type {number}
		 */
		this.spt_kazu_y = 25;
		/**
		 * 分割されたパターン画像の総数
		 * @type {number}
		 */
		this.spt_kazu = this.spt_kazu_x * this.spt_kazu_y;
		this.spt_h_kijyun = 3;
		this.li = new Array(10);
		this.spt_img = createNDimensionArray(2, this.spt_kazu);
		this.di = new Dimension(512, 320);
		this.backcolor = Color.black;
		this.os_img = this.ap.createImage(this.di.width, this.di.height);
		this.os_g = this.os_img.getGraphics();
		this.os2_img = this.ap.createImage(this.di.width + 96, this.di.height + 96);
		this.os2_g = this.os2_img.getGraphics();
		this.mt = [];

		var str = this.ap.getParameter("filename_pattern");
		this.apt_img = this.ap.getImage(str);
	}

	cut() {
		// ■■■32x32にカットする処理
		var i, j, i2, i1, n, m, localG;
		for (n = 0; n <= this.spt_kazu_y - 1; n++) {
			for (m = 0; m <= this.spt_kazu_x - 1; m++) {
				j = n * 10 + m;
				this.spt_img[0][j] = new ImageBuff(32, 32);
				localG = this.spt_img[0][j].getGraphics();
				localG.drawImage(this.apt_img, m * 32, n * 32, 32, 32, 0, 0, 32, 32, null);
				if (n >= this.spt_h_kijyun) {
					this.spt_img[1][j] = new ImageBuff(32, 32);
					localG = this.spt_img[1][j].getGraphics();
					localG.scale(-1, 1);
					localG.drawImage(this.apt_img, m * 32, n * 32, 32, 32, -32, 0, 32, 32, null);
				} else {
					this.spt_img[1][j] = this.spt_img[0][j];
				}
			}
		}
		this.hi = this.spt_img[0];
	}

	addListImage(i, s) {
		this.li[i] = this.ap.getImage(s);
		this.mt.push(this.li[i]);
	}

	loadImage() {}

	copyOS(g) {
		g.drawImage(this.os_img, 0, 0, this.ap);
	}

	fill() {
		this.os_g.setColor(this.backcolor);
		this.os_g.fillRect(0, 0, this.di.width, this.di.height);
	}

	fill2() {
		this.os2_g.setColor(this.backcolor);
		this.os2_g.fillRect(0, 0, this.di.width + 96, this.di.height + 96);
	}

	setBackcolor(color) {
		this.backcolor = color;
	}

	drawPT(i, j, k, l) {
		this.os_g.drawImage(this.spt_img[l][k], i, j, this.ap);
	}

	drawPT2(i, j, k) {
		this.os2_g.drawImage(this.hi[k], i, j, this.ap);
	}

	drawBG2(i, j, k) {
		this.os2_g.setColor(this.backcolor);
		this.os2_g.fillRect(i, j, 32, 32);
		this.os2_g.drawImage(this.hi[k], i, j, this.ap);
	}

	drawBG3(i, j, k, color) {
		this.os2_g.setColor(color);
		this.os2_g.fillRect(i, j, 32, 32);
		this.os2_g.drawImage(this.hi[k], i, j, this.ap);
	}

	drawListImage(i, j, k) {
		this.os_g.drawImage(this.li[k], i, j, this.ap);
	}
}

export { GameGraphics };
