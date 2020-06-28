import { Dimension, createNDimensionArray } from "./GlobalFunctions";
import { Color, ImageBuff } from "./ImageBuff";

class GameGraphics {
	constructor(applet) {
		this.ap = applet;
		/**
		 * パターン画像の横方向の分割数
		 * @type {number}
		 */
		this.spt_kazu_x = 10;
		/**
		 * パターン画像の縦方向の分割数
		 * @type {number}
		 */
		this.spt_kazu_y = 25;
		/**
		 * 分割されたパターン画像の総数
		 * @type {number}
		 */
		this.spt_kazu = this.spt_kazu_x * this.spt_kazu_y;
		this.spt_h_kijyun = 3;
		this.di = new Dimension(512, 320);
		/**
		 * 背景色
		 * @type {Color}
		 */
		this.backcolor = Color.black;
		/**
		 * タイトル画像などの一枚画像を格納する配列
		 * @type {Array<ImageBuff>}
		 */
		this.li = new Array(10);
		/**
		 * メディアトラッカー。画像が全て読み込み完了するのを待つために用いる
		 * @type {Array<ImageBuff>}
		 */
		this.mt = [];
		this.os_img = this.ap.createImage(this.di.width, this.di.height);
		/**
		 * ゲーム画面のグラフィック
		 * @type {Graphics}
		 */
		this.os_g = this.os_img.getGraphics();
		this.os2_img = this.ap.createImage(this.di.width + 96, this.di.height + 96);
		/**
		 * 裏画面のグラフィック
		 * 裏画面は描画予定のマップ上のブロックや地図画面を保持する
		 * @type {Graphics}
		 */
		this.os2_g = this.os2_img.getGraphics();
		this.spt_img = createNDimensionArray(2, this.spt_kazu);

		var str = this.ap.getParameter("filename_pattern");
		this.apt_img = this.ap.getImage(str);
	}

	/**
	 * パターン画像を32x32ピクセルごとに切り分ける
	 */
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

	/**
	 * 画像を読み込み、指定された番号の画像として格納する
	 * @param {number} id 画像番号
	 * @param {string} filename ファイル名(または画像のURL,相対パス)
	 */
	addListImage(id, filename) {
		this.li[id] = this.ap.getImage(filename);
		this.mt.push(this.li[id]);
	}

	loadImage() {}

	/**
	 * 指定されたGraphicsオブジェクトに現在のゲーム画面を描画する
	 * @param {Graphics} graphics 描画先Graphicsオブジェクト
	 */
	copyOS(graphics) {
		graphics.drawImage(this.os_img, 0, 0, this.ap);
	}

	/**
	 * 画面を背景色で塗りつぶす
	 */
	fill() {
		this.os_g.setColor(this.backcolor);
		this.os_g.fillRect(0, 0, this.di.width, this.di.height);
	}

	/**
	 * 裏画面を背景色で塗りつぶす
	 */
	fill2() {
		this.os2_g.setColor(this.backcolor);
		this.os2_g.fillRect(0, 0, this.di.width + 96, this.di.height + 96);
	}

	/**
	 * 背景色を変更する
	 * @param {Color} color
	 */
	setBackcolor(color) {
		this.backcolor = color;
	}

	/**
	 * 画面上にパターン画像を描画する
	 * @param {number} wx 画面上のX座標
	 * @param {number} wy 画面上のY座標
	 * @param {number} pt [0,spt_kazu) パターンコード
	 * @param {number} muki [0,1] 1なら左右反転
	 */
	drawPT(wx, wy, pt, muki) {
		this.os_g.drawImage(this.spt_img[muki][pt], wx, wy, this.ap);
	}

	/**
	 * 裏画面上にパターン画像を描画する
	 * @param {number} wx 画面上のX座標
	 * @param {number} wy 画面上のY座標
	 * @param {number} pt [0,spt_kazu) パターンコード
	 */
	drawPT2(wx, wy, pt) {
		this.os2_g.drawImage(this.hi[pt], wx, wy, this.ap);
	}

	/**
	 * 裏画面上にパターン画像を描画する
	 * ただしパターン画像の透過部分を背景色で塗りつぶす
	 * @param {number} wx 画面上のX座標
	 * @param {number} wy 画面上のY座標
	 * @param {number} pt [0,spt_kazu) パターンコード
	 */
	drawBG2(wx, wy, pt) {
		this.os2_g.setColor(this.backcolor);
		this.os2_g.fillRect(wx, wy, 32, 32);
		this.os2_g.drawImage(this.hi[pt], wx, wy, this.ap);
	}

	/**
	 * 裏画面上にパターン画像を描画する
	 * ただしパターン画像の透過部分を指定した色で塗りつぶす
	 * @param {number} wx 画面上のX座標
	 * @param {number} wy 画面上のY座標
	 * @param {number} pt [0,spt_kazu) パターンコード
	 * @param {Color} color 背後の色
	 */
	drawBG3(wx, wy, pt, color) {
		this.os2_g.setColor(color);
		this.os2_g.fillRect(wx, wy, 32, 32);
		this.os2_g.drawImage(this.hi[pt], wx, wy, this.ap);
	}

	/**
	 * 画面上にタイトル画面などの一枚画像を貼り付ける
	 * @param {number} wx 画面上のX座標
	 * @param {number} wy 画面上のY座標
	 * @param {number} id [0,this.li.length) 画像番号
	 */
	drawListImage(wx, wy, id) {
		this.os_g.drawImage(this.li[id], wx, wy, this.ap);
	}
}

export { GameGraphics };
