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
	if (this.showr_c > 0) {
		this.hg.setColor(this.js_pen_color);
		this.hg.fillRect(this.showr_x, this.showr_y, this.showr_width, this.showr_height);
	}
	if (this.showo_c > 0) {
		this.hg.setColor(this.js_pen_color);
		this.hg.fillOval(this.showo_x, this.showo_y, this.showo_width, this.showo_height);
	}
	if (this.showi_c > 0)
		if (this.gg.ap != null) this.hg.drawImage(this.showi_img, this.showi_x, this.showi_y, this.gg.ap);
		else this.hg.drawImage(this.showi_img, this.showi_x, this.showi_y, this.gg.oya);
	if (this.gauge_v)
		if (this.j_hp_v) {
			var i = (14 + this.moji_size) * 2 - 6 + 32;
			this.hg.setFont(new Font("Dialog", 1, 16));
			this.gg.os_g.setColor(this.gamecolor_score);
			this.hg.drawString(this.gauge_text, 40, i - 6);
			this.gg.os_g.setColor(Color.red);
			this.hg.fillRect(40, i, 200, 8);
			this.gg.os_g.setColor(Color.yellow);
			this.hg.fillRect(40, i, this.gauge_value, 8);
			this.gg.os_g.setColor(Color.white);
			this.hg.drawRect(39, i - 1, 201, 9);
		} else {
			this.hg.setFont(new Font("Dialog", 1, 16));
			this.gg.os_g.setColor(this.gamecolor_score);
			this.hg.drawString(this.gauge_text, 64, 58);
			this.gg.os_g.setColor(Color.red);
			this.hg.fillRect(64, 64, 200, 8);
			this.gg.os_g.setColor(Color.yellow);
			this.hg.fillRect(64, 64, this.gauge_value, 8);
			this.gg.os_g.setColor(Color.white);
			this.hg.drawRect(63, 63, 201, 9);
		}

	// 一言メッセージ
	if (this.hitokoto_c > -1) {
		drawHitokotoMessage.apply(this);
	}
};

/**
 * 一言メッセージを表示
 */
export const drawHitokotoMessage = function() {
	const tmp_num_01 = 208;
	const tmp_num_02 = 56;
	const tmp_num_03 = 224;
	let tmp_cnt_01 = 0;
	for (let i = 0; i <= 2; i++) {
		let tmp_str_01;
		if (this.hitokoto_num == 5) {
			tmp_str_01 = this.showm_data[i + 1];
		} else {
			const tmp_num_11 = i + 1;
			tmp_str_01 = "" + "hitokoto" + this.hitokoto_num + "-" + tmp_num_11;
			tmp_str_01 = this.tdb.getValue(tmp_str_01);
		}
		if (tmp_str_01 == null) tmp_str_01 = "0";
		let tmp_num_04;
		tmp_num_04 = parseInt(tmp_str_01);
		if (isNaN(tmp_num_04)) tmp_num_04 = -1;
		if (tmp_num_04 != 0) tmp_cnt_01++;
	}

	const beforeFont = this.hg._font;
	this.km.drawWindowbox(tmp_num_01, tmp_num_02, tmp_num_03, 30 + tmp_cnt_01 * 14);
	this.hg.setFont(new Font(Font.SANS_SERIF, 0, 12));
	this.hg.setColor(Color.cyan);
	if (this.hitokoto_num == 5) {
		this.hg.drawString(this.showm_data[0], tmp_num_01 + 6, tmp_num_02 + 6 + 12);
	} else {
		const tmp_str_02 = "" + "hitokoto" + this.hitokoto_num + "_name";
		this.hg.drawString(this.tdb.getValue(tmp_str_02), tmp_num_01 + 6, tmp_num_02 + 6 + 12);
	}
	this.hg.setColor(Color.white);
	tmp_cnt_01 = 0;
	for (let i = 0; i <= 2; i++) {
		let tmp_str_03;
		if (this.hitokoto_num == 5) {
			tmp_str_03 = this.showm_data[i + 1];
		} else {
			const tmp_num_06 = i + 1;
			tmp_str_03 = "" + "hitokoto" + this.hitokoto_num + "-" + tmp_num_06;
			tmp_str_03 = this.tdb.getValue(tmp_str_03);
		}
		if (tmp_str_03 == null) tmp_str_03 = "0";
		let tmp_num_05;
		tmp_num_05 = parseInt(tmp_str_03);
		if (isNaN(tmp_num_05)) tmp_num_05 = -1;
		if (tmp_num_05 != 0) {
			this.hg.drawString(tmp_str_03, tmp_num_01 + 6, tmp_num_02 + 6 + 18 + tmp_cnt_01 * 14 + 12);
			tmp_cnt_01++;
		}
	}
	// 元に戻しておく
	this.hg.setFont(beforeFont);
};
