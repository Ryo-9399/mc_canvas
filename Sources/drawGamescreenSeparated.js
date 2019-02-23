import { Color, Font } from "./ImageBuff";

/**
 * 主人公を描画します
 * {@link MasaoJSS#drawSystemObject}以外では使われていない？
 * @see {@link MasaoJSS#drawSystemObject}
 */
export const drawGamescreenMy = function() {
	var l = this.maps.wx;
	var i1 = this.maps.wy;
	this.co_j.wx = this.co_j.x - this.maps.wx;
	this.co_j.wy = this.co_j.y - this.maps.wy;
	if (this.j_jet_c >= 96)
		if (this.g_c1 == 0) this.hg.drawImage(this.hi[134], this.co_j.x - l, this.co_j.y - i1 + 36, this.ap);
		else this.hg.drawImage(this.hi[135], this.co_j.x - l, this.co_j.y - i1 + 36, this.ap);
	if (this.j_v_c > 0) {
		this.j_v_c--;
		this.j_v_kakudo += 2;
		if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
		if (this.j_v_c > 40 || this.g_ac == 1) {
			var i2 = this.co_j.x - l + 16;
			var k2 = this.co_j.y - i1 + 16;
			this.gg.os_g.setColor(Color.white);
			var d2 = 0.017453292519943295;
			for (var i = 0; i <= 5; i++) {
				var d = (this.j_v_kakudo + i * 60) * d2;
				this.vo_pa_x[i] = i2 + Math.cos(d) * 38;
				this.vo_pa_y[i] = k2 + Math.sin(d) * 38;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			for (var j = 0; j <= 5; j++) {
				var d1 = (360 - this.j_v_kakudo + j * 60) * d2;
				this.vo_pa_x[j] = i2 + Math.cos(d1) * 38;
				this.vo_pa_y[j] = k2 + Math.sin(d1) * 38;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
		}
	}
	if (this.j_zan_cf) {
		this.j_zan_cf = false;
		for (var k = 0; k <= 5; k++)
			if (this.co_j.img != null) {
				this.j_zan_img[k] = this.co_j.img;
				this.j_zan_zs_x[k] = this.co_j.zs_x;
				this.j_zan_zs_y[k] = this.co_j.zs_y;
			} else {
				this.j_zan_img[k] = null;
				this.j_zan_pt[k] = this.co_j.pt;
			}
	}
	if (this.j_zan_f) {
		var j1 = this.j_zan_p + (6 - this.j_zan_nagasa);
		if (j1 > 5) j1 -= 6;
		var k1 = this.j_zan_p + 1;
		if (k1 > 5) k1 -= 6;
		do {
			var j2 = this.j_zan_x[j1] - l;
			var l2 = this.j_zan_y[j1] - i1;
			var l1 = this.j_zan_pth[j1];
			if (this.j_zan_img[j1] != null)
				this.hg.drawImage(this.j_zan_img[j1], j2 + this.j_zan_zs_x[j1], l2 + this.j_zan_zs_y[j1], this.ap);
			else this.hg.drawImage(this.hih[l1][this.j_zan_pt[j1]], j2, l2, this.ap);
			if (++j1 > 5) j1 = 0;
		} while (j1 != k1);
		this.j_zan_p++;
		if (this.j_zan_p > 5) this.j_zan_p = 0;
		this.j_zan_x[this.j_zan_p] = this.co_j.x;
		this.j_zan_y[this.j_zan_p] = this.co_j.y;
		this.j_zan_pt[this.j_zan_p] = this.co_j.pt;
		this.j_zan_pth[this.j_zan_p] = this.co_j.muki;
		if (this.j_zan_c < 9) {
			this.j_zan_c++;
			if (this.co_j.vy >= 0) this.j_zan_c = 9;
		} else {
			this.j_zan_nagasa--;
			if (this.j_zan_nagasa < 0) this.j_zan_f = false;
		}
	}
	if (this.j_muteki_c <= 0 || this.j_muteki_c % 2 != 1)
		if (this.co_j.img != null)
			this.hg.drawImage(this.co_j.img, this.co_j.wx + this.co_j.zs_x, this.co_j.wy + this.co_j.zs_y, this.ap);
		else if (this.co_j.pt < 1000) this.gg.drawPT(this.co_j.wx, this.co_j.wy, this.co_j.pt, this.co_j.muki);
		else if (this.co_j.pt == 1000) {
			if (this.j_tokugi == 15 && this.j_4_muki == 2) {
				this.gg.drawPT(this.co_j.wx, this.co_j.wy, 211, 0);
				this.gg.drawPT(this.co_j.wx, this.co_j.wy - 32, 210, 0);
			} else if (this.j_tokugi == 15 && this.j_4_muki == 3) {
				this.gg.drawPT(this.co_j.wx, this.co_j.wy, 105, 0);
				this.gg.drawPT(this.co_j.wx, this.co_j.wy + 32, 106, 0);
			} else if (this.co_j.muki == 0) {
				this.gg.drawPT(this.co_j.wx, this.co_j.wy, 118, this.co_j.muki);
				this.gg.drawPT(this.co_j.wx - 32, this.co_j.wy, 117, this.co_j.muki);
			} else {
				this.gg.drawPT(this.co_j.wx, this.co_j.wy, 118, 1);
				this.gg.drawPT(this.co_j.wx + 32, this.co_j.wy, 117, 1);
			}
		} else if (this.co_j.pt == 1100) {
			if (this.co_j.c1 <= 0) this.gg.drawPT(this.co_j.wx, this.co_j.wy, 100, this.co_j.muki);
			else if (this.co_j.c1 >= 32) this.gg.drawPT(this.co_j.wx, this.co_j.wy + 32, 100, this.co_j.muki);
			else this.gg.drawPT(this.co_j.wx, this.co_j.wy + this.co_j.c1, 100, this.co_j.muki);
			this.gg.drawPT(this.co_j.wx - 16, this.co_j.wy + 32, 60 + this.co_j.c2 * 2, 0);
			this.gg.drawPT(this.co_j.wx + 16, this.co_j.wy + 32, 61 + this.co_j.c2 * 2, 0);
		} else if (this.co_j.pt != 1110);
};

/**
 * 敵を描画します
 * {@link MasaoJSS#drawSystemObject}以外では使われていない？
 * @see {@link MasaoJSS#drawSystemObject}
 */
export const drawGamescreenEnemy = function() {
	var j = this.maps.wx;
	var k = this.maps.wy;
	for (var i = 0; i <= this.t_kazu; i++) {
		if (this.co_t[i].c < 50) continue;
		var l = this.co_t[i].x - j;
		var i1 = this.co_t[i].y - k;
		if (l < -64 || i1 > 576) continue;
		if (this.co_t[i].img != null)
			this.hg.drawImage(this.co_t[i].img, l + this.co_t[i].zs_x, i1 + this.co_t[i].zs_y, this.ap);
		else this.hg.drawImage(this.hih[this.co_t[i].pth][this.co_t[i].pt], l, i1, this.ap);
	}
};

/**
 * HPゲージ、一言メッセージ、{@link MasaoJSS#showOval|showOval}, {@link MasaoJSS#showRect|showRect}, {@link MasaoJSS#showImage|showImage}で指定した描画物を描画します。
 * {@link MasaoJSS#drawSystemObject}以外では使われていない？
 * @see {@link MasaoJSS#drawSystemObject}
 */
export const drawGamescreenWindow = function() {
	// MasaoJSS#showRectで設定された矩形を表示
	if (this.showr_c > 0) {
		this.hg.setColor(this.js_pen_color);
		this.hg.fillRect(this.showr_x, this.showr_y, this.showr_width, this.showr_height);
	}
	// MasaoJSS#showOvalで設定された矩形を表示
	if (this.showo_c > 0) {
		this.hg.setColor(this.js_pen_color);
		this.hg.fillOval(this.showo_x, this.showo_y, this.showo_width, this.showo_height);
	}
	// MasaoJSS#showImageで設定された画像を表示
	if (this.showi_c > 0) {
		// TODO: this.hg.drawImageの第四引数は単に無視されるはずでは？プログラムの意図がわからないので要調査
		if (this.gg.ap != null) this.hg.drawImage(this.showi_img, this.showi_x, this.showi_y, this.gg.ap);
		else this.hg.drawImage(this.showi_img, this.showi_x, this.showi_y, this.gg.oya);
	}
	// ゲージを表示
	if (this.gauge_v) {
		// 主人公のHPゲージが表示されているかどうかに応じて表示する座標を変える
		const x = this.j_hp_v ? 40 : 64;
		const y = this.j_hp_v ? (14 + this.moji_size) * 2 - 6 + 32 : 64;
		this.hg.setFont(new Font(Font.DIALOG, 1, 16));
		this.gg.os_g.setColor(this.gamecolor_score);
		this.hg.drawString(this.gauge_text, x, y - 6);
		this.gg.os_g.setColor(Color.red);
		this.hg.fillRect(x, y, 200, 8);
		this.gg.os_g.setColor(Color.yellow);
		this.hg.fillRect(x, y, this.gauge_value, 8);
		this.gg.os_g.setColor(Color.white);
		this.hg.drawRect(x - 1, y - 1, 201, 9);
	}

	// 一言メッセージ
	if (this.hitokoto_c > -1) {
		drawHitokotoMessage.apply(this);
	}
};

/**
 * ボスを描画
 */
export const drawBoss = function() {
	if (this.co_b.c <= 50) return;
	const { wx, wy } = this.maps;
	let boss_sx = this.co_b.x - wx;
	let boss_sy = this.co_b.y - wy;
	if (boss_sx > 560) return;
	if (this.co_b.img != null) {
		this.hg.drawImage(this.co_b.img, boss_sx + this.co_b.zs_x, boss_sy + this.co_b.zs_y, this.ap);
		return;
	}
	/**
	 * 複数枚のパターン画像を並べて描画します
	 * @param code 左上のパターンコード
	 * @param nx 横方向タイル数
	 * @param ny 縦方向タイル数
	 * @param x 描画x座標
	 * @param y 描画y座標
	 */
	const drawWide = (code, nx, ny, x, y) => {
		for (let cy = 0; cy < ny; cy++) {
			for (let cx = 0; cx < nx; cx++) {
				this.hg.drawImage(this.hih[0][code + cy * 10 + cx], x + cx * 32, y + cy * 32, this.ap);
			}
		}
	};
	/**
	 * 複数枚のパターン画像を並べて描画します 左右反転
	 * @param code 左上のパターンコード (※反転する前の状態から見て左)
	 * @param nx 横方向タイル数
	 * @param ny 縦方向タイル数
	 * @param x 描画x座標
	 * @param y 描画y座標
	 */
	const drawWideFlip = (code, nx, ny, x, y) => {
		for (let cy = 0; cy < ny; cy++) {
			for (let cx = 0; cx < nx; cx++) {
				const code_x = nx - 1 - cx;
				this.hg.drawImage(this.hih[1][code + cy * 10 + code_x], x + cx * 32, y + cy * 32, this.ap);
			}
		}
	};
	switch (this.co_b.pt) {
		default:
			break;

		case 1000:
			this.hg.drawImage(this.hih[0][186], boss_sx - 16, boss_sy - 16, this.ap);
			this.hg.drawImage(this.hih[0][187], boss_sx + 16, boss_sy - 16, this.ap);
			this.hg.drawImage(this.hih[0][196], boss_sx - 16, boss_sy + 16, this.ap);
			this.hg.drawImage(this.hih[0][197], boss_sx + 16, boss_sy + 16, this.ap);
			break;

		case 1005:
			this.hg.drawImage(this.hih[1][187], boss_sx - 16, boss_sy - 16, this.ap);
			this.hg.drawImage(this.hih[1][186], boss_sx + 16, boss_sy - 16, this.ap);
			this.hg.drawImage(this.hih[1][197], boss_sx - 16, boss_sy + 16, this.ap);
			this.hg.drawImage(this.hih[1][196], boss_sx + 16, boss_sy + 16, this.ap);
			break;

		case 1010:
			this.hg.drawImage(this.hih[0][176], boss_sx - 16, boss_sy + 16, this.ap);
			this.hg.drawImage(this.hih[0][177], boss_sx + 16, boss_sy + 16, this.ap);
			break;

		case 1015:
			this.hg.drawImage(this.hih[1][177], boss_sx - 16, boss_sy + 16, this.ap);
			this.hg.drawImage(this.hih[1][176], boss_sx + 16, boss_sy + 16, this.ap);
			break;

		case 1100:
			this.hg.drawImage(this.hih[0][188], boss_sx - 16, boss_sy - 16, this.ap);
			this.hg.drawImage(this.hih[0][189], boss_sx + 16, boss_sy - 16, this.ap);
			this.hg.drawImage(this.hih[0][198], boss_sx - 16, boss_sy + 16, this.ap);
			this.hg.drawImage(this.hih[0][199], boss_sx + 16, boss_sy + 16, this.ap);
			break;

		case 1101:
			var graphics221 = this.gg.os_img.getGraphics();
			var j22 = boss_sx + 16;
			var k28 = boss_sy + 16;
			graphics221.rotate((this.co_b.c2 * 3.1415926535897931) / 180, j22, k28);
			graphics221.drawImage(this.hih[0][188], boss_sx - 16, boss_sy - 16, this.ap);
			graphics221.drawImage(this.hih[0][189], boss_sx + 16, boss_sy - 16, this.ap);
			graphics221.drawImage(this.hih[0][198], boss_sx - 16, boss_sy + 16, this.ap);
			graphics221.drawImage(this.hih[0][199], boss_sx + 16, boss_sy + 16, this.ap);
			graphics221.dispose();
			break;

		case 1105:
			this.hg.drawImage(this.hih[1][189], boss_sx - 16, boss_sy - 16, this.ap);
			this.hg.drawImage(this.hih[1][188], boss_sx + 16, boss_sy - 16, this.ap);
			this.hg.drawImage(this.hih[1][199], boss_sx - 16, boss_sy + 16, this.ap);
			this.hg.drawImage(this.hih[1][198], boss_sx + 16, boss_sy + 16, this.ap);
			break;

		case 1106:
			var graphics222 = this.gg.os_img.getGraphics();
			var k22 = boss_sx + 16;
			var l28 = boss_sy + 16;
			graphics222.rotate((this.co_b.c2 * 3.1415926535897931) / 180, k22, l28);
			graphics222.drawImage(this.hih[1][189], boss_sx - 16, boss_sy - 16, this.ap);
			graphics222.drawImage(this.hih[1][188], boss_sx + 16, boss_sy - 16, this.ap);
			graphics222.drawImage(this.hih[1][199], boss_sx - 16, boss_sy + 16, this.ap);
			graphics222.drawImage(this.hih[1][198], boss_sx + 16, boss_sy + 16, this.ap);
			graphics222.dispose();
			break;

		case 1110:
			this.hg.drawImage(this.hih[0][178], boss_sx - 16, boss_sy + 16, this.ap);
			this.hg.drawImage(this.hih[0][179], boss_sx + 16, boss_sy + 16, this.ap);
			break;

		case 1115:
			this.hg.drawImage(this.hih[1][179], boss_sx - 16, boss_sy + 16, this.ap);
			this.hg.drawImage(this.hih[1][178], boss_sx + 16, boss_sy + 16, this.ap);
			break;

		case 1200:
			this.hg.drawImage(this.hih[0][238], boss_sx - 16, boss_sy - 16, this.ap);
			this.hg.drawImage(this.hih[0][239], boss_sx + 16, boss_sy - 16, this.ap);
			this.hg.drawImage(this.hih[0][248], boss_sx - 16, boss_sy + 16, this.ap);
			this.hg.drawImage(this.hih[0][249], boss_sx + 16, boss_sy + 16, this.ap);
			break;

		case 1205:
			this.hg.drawImage(this.hih[1][239], boss_sx - 16, boss_sy - 16, this.ap);
			this.hg.drawImage(this.hih[1][238], boss_sx + 16, boss_sy - 16, this.ap);
			this.hg.drawImage(this.hih[1][249], boss_sx - 16, boss_sy + 16, this.ap);
			this.hg.drawImage(this.hih[1][248], boss_sx + 16, boss_sy + 16, this.ap);
			break;

		case 1210:
			this.hg.drawImage(this.hih[0][228], boss_sx - 16, boss_sy + 16, this.ap);
			this.hg.drawImage(this.hih[0][229], boss_sx + 16, boss_sy + 16, this.ap);
			break;

		case 1215:
			this.hg.drawImage(this.hih[1][229], boss_sx - 16, boss_sy + 16, this.ap);
			this.hg.drawImage(this.hih[1][228], boss_sx + 16, boss_sy + 16, this.ap);
			break;

		case 1250:
			this.hg.drawImage(this.hih[0][238], boss_sx - 16, boss_sy - 16, this.ap);
			this.hg.drawImage(this.hih[0][239], boss_sx + 16, boss_sy - 16, this.ap);
			this.hg.drawImage(this.hih[0][248], boss_sx - 16, boss_sy + 16, this.ap);
			this.hg.drawImage(this.hih[0][249], boss_sx + 16, boss_sy + 16, this.ap);
			if (this.j_v_c <= 0) {
				this.j_v_kakudo += 2;
				if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
			}
			boss_sx = this.co_b.x - wx + 16;
			boss_sy = this.co_b.y - wy + 16;
			this.gg.os_g.setColor(Color.white);
			var d6 = 0.017453292519943295;
			for (var l1 = 0; l1 <= 5; l1++) {
				var d = (this.j_v_kakudo + l1 * 60) * d6;
				this.vo_pa_x[l1] = boss_sx + Math.cos(d) * 50;
				this.vo_pa_y[l1] = boss_sy + Math.sin(d) * 50;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			for (var i2 = 0; i2 <= 5; i2++) {
				var d1 = (360 - this.j_v_kakudo + i2 * 60) * d6;
				this.vo_pa_x[i2] = boss_sx + Math.cos(d1) * 50;
				this.vo_pa_y[i2] = boss_sy + Math.sin(d1) * 50;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			break;

		case 1251:
			var graphics223 = this.gg.os_img.getGraphics();
			var l22 = boss_sx + 16;
			var i29 = boss_sy + 16;
			graphics223.rotate((this.co_b.c2 * 3.1415926535897931) / 180, l22, i29);
			graphics223.drawImage(this.hih[0][238], boss_sx - 16, boss_sy - 16, this.ap);
			graphics223.drawImage(this.hih[0][239], boss_sx + 16, boss_sy - 16, this.ap);
			graphics223.drawImage(this.hih[0][248], boss_sx - 16, boss_sy + 16, this.ap);
			graphics223.drawImage(this.hih[0][249], boss_sx + 16, boss_sy + 16, this.ap);
			graphics223.dispose();
			break;

		case 1255:
			this.hg.drawImage(this.hih[1][239], boss_sx - 16, boss_sy - 16, this.ap);
			this.hg.drawImage(this.hih[1][238], boss_sx + 16, boss_sy - 16, this.ap);
			this.hg.drawImage(this.hih[1][249], boss_sx - 16, boss_sy + 16, this.ap);
			this.hg.drawImage(this.hih[1][248], boss_sx + 16, boss_sy + 16, this.ap);
			if (this.j_v_c <= 0) {
				this.j_v_kakudo += 2;
				if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
			}
			boss_sx = this.co_b.x - wx + 16;
			boss_sy = this.co_b.y - wy + 16;
			this.gg.os_g.setColor(Color.white);
			var d7 = 0.017453292519943295;
			for (var j2 = 0; j2 <= 5; j2++) {
				var d2 = (this.j_v_kakudo + j2 * 60) * d7;
				this.vo_pa_x[j2] = boss_sx + Math.cos(d2) * 50;
				this.vo_pa_y[j2] = boss_sy + Math.sin(d2) * 50;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			for (var k2 = 0; k2 <= 5; k2++) {
				var d3 = (360 - this.j_v_kakudo + k2 * 60) * d7;
				this.vo_pa_x[k2] = boss_sx + Math.cos(d3) * 50;
				this.vo_pa_y[k2] = boss_sy + Math.sin(d3) * 50;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			break;

		case 1256:
			var graphics224 = this.gg.os_img.getGraphics();
			var i23 = boss_sx + 16;
			var j29 = boss_sy + 16;
			graphics224.rotate((this.co_b.c2 * 3.1415926535897931) / 180, i23, j29);
			graphics224.drawImage(this.hih[1][239], boss_sx - 16, boss_sy - 16, this.ap);
			graphics224.drawImage(this.hih[1][238], boss_sx + 16, boss_sy - 16, this.ap);
			graphics224.drawImage(this.hih[1][249], boss_sx - 16, boss_sy + 16, this.ap);
			graphics224.drawImage(this.hih[1][248], boss_sx + 16, boss_sy + 16, this.ap);
			graphics224.dispose();
			break;
	}
};

/**
 * 一言メッセージを描画
 */
export const drawHitokotoMessage = function() {
	const box_x = 208;
	const box_y = 56;
	const box_width = 224;
	// メッセージ内容を取得
	const messages = [];
	for (let i = 1; i <= 3; i++) {
		const param_name = `hitokoto${this.hitokoto_num}-${i}`;
		const message = this.hitokoto_num === 5 ? this.showm_data[i] : this.tdb.getValue(param_name);
		// 0と設定されている行は表示しない
		if (parseInt(message) === 0) continue;
		messages.push(message);
	}

	// メッセージボックスを描画
	this.km.drawWindowbox(box_x, box_y, box_width, 30 + messages.length * 14);

	// 変更前のフォントを保持
	const beforeFont = this.hg._font;
	this.hg.setFont(new Font(Font.SANS_SERIF, 0, 12));
	// 名前を描画
	this.hg.setColor(Color.cyan);
	const param_name = `hitokoto${this.hitokoto_num}_name`;
	const name = this.hitokoto_num === 5 ? this.showm_data[0] : this.tdb.getValue(param_name);
	this.hg.drawString(name, box_x + 6, box_y + 6 + 12);

	// メッセージ本文を描画
	this.hg.setColor(Color.white);
	for (const [i, message] of messages.entries()) {
		const dy = 18 + i * 14 + 12;
		this.hg.drawString(message, box_x + 6, box_y + 6 + dy);
	}
	// フォントを元に戻す
	this.hg.setFont(beforeFont);
};
