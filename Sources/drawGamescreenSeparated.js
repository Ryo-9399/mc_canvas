import { Color, Font } from "./ImageBuff";
import * as Boss from "./CharacterObject/Boss";

/**
 * 主人公を描画します
 * {@link MasaoJSS#drawSystemObject}以外では使われていない？
 * @see {@link MasaoJSS#drawSystemObject}
 */
export const drawGamescreenMy = function() {
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	this.co_j.wx = this.co_j.x - this.maps.wx;
	this.co_j.wy = this.co_j.y - this.maps.wy;
	if (this.j_jet_c >= 96) {
		// ジェット噴射
		if (this.g_c1 === 0) this.hg.drawImage(this.hi[134], this.co_j.x - view_x, this.co_j.y - view_y + 36, this.ap);
		else this.hg.drawImage(this.hi[135], this.co_j.x - view_x, this.co_j.y - view_y + 36, this.ap);
	}
	if (this.j_v_c > 0) {
		// バリア
		this.j_v_c--;
		this.j_v_kakudo += 2;
		if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
		if (this.j_v_c > 40 || this.g_ac === 1) {
			const center_x = this.co_j.x - view_x + 16;
			const center_y = this.co_j.y - view_y + 16;
			this.gg.os_g.setColor(Color.white);
			for (let i = 0; i < 6; i++) {
				const rad = ((this.j_v_kakudo + i * 60) * Math.PI) / 180;
				this.vo_pa_x[i] = center_x + Math.cos(rad) * 38;
				this.vo_pa_y[i] = center_y + Math.sin(rad) * 38;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			for (let i = 0; i < 6; i++) {
				const rad = ((360 - this.j_v_kakudo + i * 60) * Math.PI) / 180;
				this.vo_pa_x[i] = center_x + Math.cos(rad) * 38;
				this.vo_pa_y[i] = center_y + Math.sin(rad) * 38;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
		}
	}
	if (this.j_zan_cf) {
		// NOTE: なにこれ
		this.j_zan_cf = false;
		for (let i = 0; i < 6; i++) {
			if (this.co_j.img != null) {
				this.j_zan_img[i] = this.co_j.img;
				this.j_zan_zs_x[i] = this.co_j.zs_x;
				this.j_zan_zs_y[i] = this.co_j.zs_y;
			} else {
				this.j_zan_img[i] = null;
				this.j_zan_pt[i] = this.co_j.pt;
			}
		}
	}
	if (this.j_zan_f) {
		// スーパージャンプの残像
		// NOTE: this.j_zan_nagasa+1個の残像が表示される
		const zan_max_length = 6;
		const tail = this.j_zan_p + zan_max_length;
		const head = tail - this.j_zan_nagasa;
		for (let i = head; i <= tail; i++) {
			const index = i % zan_max_length;
			const zan_wx = this.j_zan_x[index] - view_x;
			const zan_wy = this.j_zan_y[index] - view_y;
			const muki = this.j_zan_pth[index];
			if (this.j_zan_img[index] != null)
				this.hg.drawImage(
					this.j_zan_img[index],
					zan_wx + this.j_zan_zs_x[index],
					zan_wy + this.j_zan_zs_y[index],
					this.ap
				);
			else this.hg.drawImage(this.hih[muki][this.j_zan_pt[index]], zan_wx, zan_wy, this.ap);
		}

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
	if (this.j_muteki_c <= 0 || this.j_muteki_c % 2 != 1) {
		// 主人公本体の描画
		if (this.co_j.img != null) {
			this.hg.drawImage(this.co_j.img, this.co_j.wx + this.co_j.zs_x, this.co_j.wy + this.co_j.zs_y, this.ap);
		} else if (this.co_j.pt < 1000) {
			this.gg.drawPT(this.co_j.wx, this.co_j.wy, this.co_j.pt, this.co_j.muki);
		} else if (this.co_j.pt == 1000) {
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
	}
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
	/**
	 * ボスのゲーム画面上のX座標
	 * @type {number}
	 */
	const boss_sx = this.co_b.x - wx;
	/**
	 * ボスのゲーム画面上のY座標
	 * @type {number}
	 */
	const boss_sy = this.co_b.y - wy;
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

		case Boss.PATTERN_BOSS1_LEFT:
			drawWide(186, 2, 2, boss_sx - 16, boss_sy - 16);
			break;

		case Boss.PATTERN_BOSS1_RIGHT:
			drawWideFlip(186, 2, 2, boss_sx - 16, boss_sy - 16);
			break;

		case Boss.PATTERN_BOSS1_DAMAGE_LEFT:
			drawWide(176, 2, 1, boss_sx - 16, boss_sy + 16);
			break;

		case Boss.PATTERN_BOSS1_DAMAGE_RIGHT:
			drawWideFlip(176, 2, 1, boss_sx - 16, boss_sy + 16);
			break;

		case Boss.PATTERN_BOSS2_LEFT:
			drawWide(188, 2, 2, boss_sx - 16, boss_sy - 16);
			break;

		case Boss.PATTERN_BOSS2_ROTATE_LEFT:
			this.hg.dispose();
			this.hg.rotate((this.co_b.c2 * Math.PI) / 180, boss_sx + 16, boss_sy + 16);
			drawWide(188, 2, 2, boss_sx - 16, boss_sy - 16);
			this.hg.dispose();
			break;

		case Boss.PATTERN_BOSS2_RIGHT:
			drawWideFlip(188, 2, 2, boss_sx - 16, boss_sy - 16);
			break;

		case Boss.PATTERN_BOSS2_ROTATE_RIGHT:
			this.hg.dispose();
			this.hg.rotate((this.co_b.c2 * Math.PI) / 180, boss_sx + 16, boss_sy + 16);
			drawWideFlip(188, 2, 2, boss_sx - 16, boss_sy - 16);
			this.hg.dispose();
			break;

		case Boss.PATTERN_BOSS2_DAMAGE_LEFT:
			drawWide(178, 2, 1, boss_sx - 16, boss_sy + 16);
			break;

		case Boss.PATTERN_BOSS2_DAMAGE_RIGHT:
			drawWideFlip(178, 2, 1, boss_sx - 16, boss_sy + 16);
			break;

		case Boss.PATTERN_BOSS3_LEFT:
			drawWide(238, 2, 2, boss_sx - 16, boss_sy - 16);
			break;

		case Boss.PATTERN_BOSS3_RIGHT:
			drawWideFlip(238, 2, 2, boss_sx - 16, boss_sy - 16);
			break;

		case Boss.PATTERN_BOSS3_DAMAGE_LEFT:
			drawWide(228, 2, 1, boss_sx - 16, boss_sy + 16);
			break;

		case Boss.PATTERN_BOSS3_DAMAGE_RIGHT:
			drawWideFlip(228, 2, 1, boss_sx - 16, boss_sy + 16);
			break;

		case Boss.PATTERN_BOSS3_BARRIER_LEFT:
			drawWide(238, 2, 2, boss_sx - 16, boss_sy - 16);
			if (this.j_v_c <= 0) {
				this.j_v_kakudo += 2;
				if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
			}
			this.gg.os_g.setColor(Color.white);
			for (let i = 0; i < 6; i++) {
				const rad = ((this.j_v_kakudo + i * 60) * Math.PI) / 180;
				this.vo_pa_x[i] = boss_sx + 16 + Math.cos(rad) * 50;
				this.vo_pa_y[i] = boss_sy + 16 + Math.sin(rad) * 50;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			for (let i = 0; i < 6; i++) {
				const rad = ((360 - this.j_v_kakudo + i * 60) * Math.PI) / 180;
				this.vo_pa_x[i] = boss_sx + 16 + Math.cos(rad) * 50;
				this.vo_pa_y[i] = boss_sy + 16 + Math.sin(rad) * 50;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			break;

		case Boss.PATTERN_BOSS3_ROTATE_LEFT:
			this.hg.dispose();
			this.hg.rotate((this.co_b.c2 * Math.PI) / 180, boss_sx + 16, boss_sy + 16);
			drawWide(238, 2, 2, boss_sx - 16, boss_sy - 16);
			this.hg.dispose();
			break;

		case Boss.PATTERN_BOSS3_BARRIER_RIGHT:
			drawWideFlip(238, 2, 2, boss_sx - 16, boss_sy - 16);
			if (this.j_v_c <= 0) {
				this.j_v_kakudo += 2;
				if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
			}
			this.gg.os_g.setColor(Color.white);
			for (let i = 0; i < 6; i++) {
				const rad = ((this.j_v_kakudo + i * 60) * Math.PI) / 180;
				this.vo_pa_x[i] = boss_sx + 16 + Math.cos(rad) * 50;
				this.vo_pa_y[i] = boss_sy + 16 + Math.sin(rad) * 50;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			for (let i = 0; i < 6; i++) {
				const rad = ((360 - this.j_v_kakudo + i * 60) * Math.PI) / 180;
				this.vo_pa_x[i] = boss_sx + 16 + Math.cos(rad) * 50;
				this.vo_pa_y[i] = boss_sy + 16 + Math.sin(rad) * 50;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			break;

		case Boss.PATTERN_BOSS3_ROTATE_RIGHT:
			this.hg.dispose();
			this.hg.rotate((this.co_b.c2 * Math.PI) / 180, boss_sx + 16, boss_sy + 16);
			drawWideFlip(238, 2, 2, boss_sx - 16, boss_sy - 16);
			this.hg.dispose();
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
