import { Dimension, createNDimensionArray, waitFor } from "./GlobalFunctions";
import { Color, ImageBuff } from "./ImageBuff";

class GameGraphicsForApplet {
	constructor(dagdatabase, applet) {
		this.tdb = dagdatabase;
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
		this.mode = 2;
		this.oya = null;

		if (this.tdb.getValueInt("mcs_screen_size") == 1) {
			this.system_screen_size = 1;
			this.system_screen_width = 640;
			this.system_screen_height = 480;
		} else {
			this.system_screen_size = 2;
			this.system_screen_width = 512;
			this.system_screen_height = 320;
		}
		this.di = new Dimension(this.system_screen_width, this.system_screen_height);
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
		this.os_g_bk = this.os_img.getGraphicsBk();
		this.os2_img = this.ap.createImage(this.di.width + 96, this.di.height + 96);
		/**
		 * 裏画面のグラフィック
		 * 裏画面は描画予定のマップ上のブロックや地図画面を保持する
		 * @type {Graphics}
		 */
		this.os2_g = this.os2_img.getGraphics();
		this.os32_img = this.ap.createImage(32, 32);
		this.os32_g = this.os32_img.getGraphics();
		this.pg = undefined;
		this.spt_img = createNDimensionArray(2, this.spt_kazu);
		this.hi = undefined;
		this.spt_option_img = new Array(10);
		this.layer_mode = 2;
		this.amapchip_img = undefined;
		this.smapchip_img = new Array(256);

		var str = this.tdb.getValue("layer_mode");
		var i4;
		i4 = parseInt(str);
		if (isNaN(i4)) i4 = -1;
		if (i4 == 2) {
			this.layer_mode = 2;
		} else {
			this.layer_mode = 1;
		}

		str = this.tdb.getValue("filename_pattern");
		this.apt_img = this.ap.getImage(str);
		// イメージを読み込めなかったときのハック
		//if(this.apt_img == null)
		//this.apt_img = new ImageBuff(this.spt_kazu_x * 32, this.spt_kazu_y * 32);
		if (this.layer_mode == 2) {
			str = this.tdb.getValue("filename_mapchip");
			this.amapchip_img = this.ap.getImage(str);
			// ハック
			if (this.amapchip_img == null) this.amapchip_img = new ImageBuff(512, 512);
		}
	}

	/**
	 * パターン画像を32x32ピクセルごとに切り分ける
	 */
	cut() {
		// ■■■32x32にカットする処理
		var i, j, n, m, localG;
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
		for (m = 0; m <= 9; m++) {
			this.spt_option_img[m] = this.spt_img[0][10 + m];
		}
		if (this.tdb.getValueInt("water_clear_switch") == 2) {
			var i5 = this.tdb.getValueInt("water_clear_level");
			if (i5 < 0) {
				i5 = 0;
			} else if (i5 > 255) {
				i5 = 255;
			}
			for (var k = 0; k <= 3; k++) {
				if (k == 1) {
					m = 0;
					n = 8;
				} else if (k == 2) {
					m = 1;
					n = 8;
				} else if (k == 3) {
					m = 2;
					n = 8;
				} else {
					m = 4;
					n = 0;
				}
				j = n * 10 + m;

				this.spt_img[0][j] = new ImageBuff(32, 32);
				localG = this.spt_img[0][j].getGraphics();
				localG.setGlobalAlpha(i5);
				localG.drawImage(this.apt_img, m * 32, n * 32, 32, 32, 0, 0, 32, 32, null);
			}
		}
		// ■■■32x32にカットする処理(mapchip)
		if (this.layer_mode == 2) {
			for (n = 0; n <= 15; n++) {
				for (m = 0; m <= 15; m++) {
					i = n * 512 * 32 + m * 32;

					j = n * 16 + m;

					this.smapchip_img[j] = new ImageBuff(32, 32);
					localG = this.smapchip_img[j].getGraphics();
					localG.drawImage(this.amapchip_img, m * 32, n * 32, 32, 32, 0, 0, 32, 32, null);
				}
			}
		}
	}

	/**
	 * 画像を読み込み、新たなパターン画像とする
	 * @param {string} filename ファイル名(または画像のURL,相対パス)
	 */
	setPatternImage(filename) {
		this.apt_img = this.ap.getImage(filename);
		// TODO: ap.getImageがnullを返すことはあるのか？
		// イメージを読み込めなかったときは操作を無効化するハック
		if (this.apt_img == null) return;

		// ■■■32x32にカットする処理
		var j, n, m, localG;
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
	}

	/**
	 * 画像を読み込み、新たなマップチップ画像とする
	 * @param {string} filename ファイル名(または画像のURL,相対パス)
	 */
	setMapchipImage(filename) {
		if (this.layer_mode != 2) {
			return;
		}
		this.amapchip_img = this.ap.getImage(filename);
		// ハック
		if (this.amapchip_img == null) return;

		// ■■■32x32にカットする処理(mapchip)
		var n, m, i, j, localG;
		if (this.layer_mode == 2) {
			for (n = 0; n <= 15; n++) {
				for (m = 0; m <= 15; m++) {
					i = n * 512 * 32 + m * 32;

					j = n * 16 + m;

					this.smapchip_img[j] = new ImageBuff(32, 32);
					localG = this.smapchip_img[j].getGraphics();
					localG.drawImage(this.amapchip_img, m * 32, n * 32, 32, 32, 0, 0, 32, 32, null);
				}
			}
		}
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

	/**
	 * 画像を読み込み、指定された番号の画像として格納する
	 * 読み込みの完了を監視しない
	 * @param {number} id 画像番号
	 * @param {string} filename ファイル名(または画像のURL,相対パス)
	 */
	addListImage2(id, filename) {
		this.li[id] = this.ap.getImage(filename);
	}

	/**
	 * 画像の読み込み完了を待つ
	 * NOTE: 現在未実装。何もしない
	 */
	loadListImage() {
		waitFor(this.mt);
	}

	/**
	 * 外部ファイルから画像を読み込み、ImageBuffオブジェクトを返す
	 * NOTE: 本来は読み込み完了まで待つが、待つ処理は現在実装されていない
	 * @param {string} filename ファイル名(または画像のURL,相対パス)
	 * @returns {ImageBuff|null} 読み込めない場合はnullを返す
	 */
	loadImage(filename) {
		let image = null;
		try {
			image = this.ap.getImage(filename);
		} catch (e) {
			// TODO:ここのエラーハンドリングの見直し
		}
		if (image == null) {
			// 読み込めない場合はnullを返す
			return null;
		}
		const mt = [image];
		waitFor(mt);
		return image;
	}

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
	 * 画面上にパターン画像を描画する
	 * NOTE: drawPTとの違いとして、mukiが0,1以外の値をとる場合でも描画失敗とならずに描画を行う
	 * @param {number} wx 画面上のX座標
	 * @param {number} wy 画面上のY座標
	 * @param {number} pt [0,spt_kazu) パターンコード
	 * @param {number} muki 1なら左右反転
	 */
	drawPattern(wx, wy, pt, muki) {
		var i = 0;
		if (muki == 1) {
			i = 1;
		}
		this.os_g.drawImage(this.spt_img[i][pt], wx, wy, this.ap);
	}

	/**
	 * 画面上にパターン画像を描画するが、上からdyピクセルの範囲は描画しない
	 * @param {number} wx 画面上のX座標
	 * @param {number} wy 画面上のY座標
	 * @param {number} pt [0,spt_kazu) パターンコード
	 * @param {number} muki 1なら左右反転
	 * @param {number} dy 描画しない部分の高さ
	 */
	drawPatternCut(wx, wy, pt, muki, dy) {
		var i = 0;
		if (muki == 1) {
			i = 1;
		}
		this.os32_g.drawImage(this.os_img, wx * -1, wy * -1 - dy, this.ap);

		this.os32_g.drawImage(this.spt_img[i][pt], 0, dy * -1, this.ap);

		this.os_g.drawImage(this.os32_img, wx, wy + dy, this.ap);
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
	 * 画面上にマップチップ画像を描画する
	 * @param {number} wx 画面上のX座標
	 * @param {number} wy 画面上のY座標
	 * @param {number} code パターンコード
	 */
	drawMapchip(wx, wy, code) {
		this.os_g.drawImage(this.smapchip_img[code], wx, wy, this.ap);
	}

	/**
	 * 裏画面上にマップチップ画像を描画する
	 * @param {number} wx 画面上のX座標
	 * @param {number} wy 画面上のY座標
	 * @param {number} code パターンコード
	 */
	drawMapchip2(wx, wy, code) {
		this.os2_g.drawImage(this.smapchip_img[code], wx, wy, this.ap);
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

export { GameGraphicsForApplet };
