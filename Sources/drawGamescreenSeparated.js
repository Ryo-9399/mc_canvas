import { Color, Font } from "./ImageBuff";
import * as Boss from "./CharacterObject/Boss";
import { rightShiftIgnoreSign } from "./GlobalFunctions";

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
			// しっぽを伸ばしている
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
			// 土管に入る
			const j_dy = Math.max(0, Math.min(32, this.co_j.c1));
			this.gg.drawPT(this.co_j.wx, this.co_j.wy + j_dy, 100, this.co_j.muki);
			this.gg.drawPT(this.co_j.wx - 16, this.co_j.wy + 32, 60 + this.co_j.c2 * 2, 0);
			this.gg.drawPT(this.co_j.wx + 16, this.co_j.wy + 32, 61 + this.co_j.c2 * 2, 0);
		} else if (this.co_j.pt != 1110);
	}
};

/**
 * 主人公の攻撃を描画します
 */
export const drawMyAttack = function() {
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	for (let i = 0; i <= 8; i++) {
		const characterobject = this.co_jm[i];
		if (characterobject.c < 50) continue;
		const co_wx = characterobject.x - view_x;
		const co_wy = characterobject.y - view_y;
		if (characterobject.pt < 1000) {
			this.hg.drawImage(this.hih[characterobject.pth][characterobject.pt], co_wx, co_wy, this.ap);
		} else {
			const color = this.g_ac === 0 ? this.gamecolor_grenade1 : this.gamecolor_grenade2;
			this.gg.os_g.setColor(color);
			if (characterobject.pt === 1200) {
				// エネルギー砲 左向き
				const width = characterobject.vx - characterobject.x + 1;
				this.gg.os_g.fillRect(co_wx, co_wy + 12, width, 8);
			} else if (characterobject.pt === 1205) {
				// エネルギー砲 右向き
				// NOTE: vxという変数を左端のX座標として使うのはさすがにひどいのでは
				const width = characterobject.x - characterobject.vx + 1;
				this.gg.os_g.fillRect(characterobject.vx - view_x, co_wy + 12, width, 8);
			} else {
				// グレネードの爆発
				const radius = characterobject.c2;
				this.gg.os_g.fillOval(co_wx + 16 - radius, co_wy + 16 - radius, radius * 2, radius * 2);
			}
		}
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
 * ボスを描画
 */
export const drawBoss = function() {
	if (this.co_b.c <= 50) return;
	const { wx, wy } = this.maps;
	/**
	 * ボスのゲーム画面上のX座標
	 * @type {number}
	 */
	const boss_wx = this.co_b.x - wx;
	/**
	 * ボスのゲーム画面上のY座標
	 * @type {number}
	 */
	const boss_wy = this.co_b.y - wy;
	if (boss_wx > 560) return;
	if (this.co_b.img != null) {
		this.hg.drawImage(this.co_b.img, boss_wx + this.co_b.zs_x, boss_wy + this.co_b.zs_y, this.ap);
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
			drawWide(186, 2, 2, boss_wx - 16, boss_wy - 16);
			break;

		case Boss.PATTERN_BOSS1_RIGHT:
			drawWideFlip(186, 2, 2, boss_wx - 16, boss_wy - 16);
			break;

		case Boss.PATTERN_BOSS1_DAMAGE_LEFT:
			drawWide(176, 2, 1, boss_wx - 16, boss_wy + 16);
			break;

		case Boss.PATTERN_BOSS1_DAMAGE_RIGHT:
			drawWideFlip(176, 2, 1, boss_wx - 16, boss_wy + 16);
			break;

		case Boss.PATTERN_BOSS2_LEFT:
			drawWide(188, 2, 2, boss_wx - 16, boss_wy - 16);
			break;

		case Boss.PATTERN_BOSS2_ROTATE_LEFT:
			this.hg.dispose();
			this.hg.rotate((this.co_b.c2 * Math.PI) / 180, boss_wx + 16, boss_wy + 16);
			drawWide(188, 2, 2, boss_wx - 16, boss_wy - 16);
			this.hg.dispose();
			break;

		case Boss.PATTERN_BOSS2_RIGHT:
			drawWideFlip(188, 2, 2, boss_wx - 16, boss_wy - 16);
			break;

		case Boss.PATTERN_BOSS2_ROTATE_RIGHT:
			this.hg.dispose();
			this.hg.rotate((this.co_b.c2 * Math.PI) / 180, boss_wx + 16, boss_wy + 16);
			drawWideFlip(188, 2, 2, boss_wx - 16, boss_wy - 16);
			this.hg.dispose();
			break;

		case Boss.PATTERN_BOSS2_DAMAGE_LEFT:
			drawWide(178, 2, 1, boss_wx - 16, boss_wy + 16);
			break;

		case Boss.PATTERN_BOSS2_DAMAGE_RIGHT:
			drawWideFlip(178, 2, 1, boss_wx - 16, boss_wy + 16);
			break;

		case Boss.PATTERN_BOSS3_LEFT:
			drawWide(238, 2, 2, boss_wx - 16, boss_wy - 16);
			break;

		case Boss.PATTERN_BOSS3_RIGHT:
			drawWideFlip(238, 2, 2, boss_wx - 16, boss_wy - 16);
			break;

		case Boss.PATTERN_BOSS3_DAMAGE_LEFT:
			drawWide(228, 2, 1, boss_wx - 16, boss_wy + 16);
			break;

		case Boss.PATTERN_BOSS3_DAMAGE_RIGHT:
			drawWideFlip(228, 2, 1, boss_wx - 16, boss_wy + 16);
			break;

		case Boss.PATTERN_BOSS3_BARRIER_LEFT:
			drawWide(238, 2, 2, boss_wx - 16, boss_wy - 16);
			if (this.j_v_c <= 0) {
				this.j_v_kakudo += 2;
				if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
			}
			this.gg.os_g.setColor(Color.white);
			for (let i = 0; i < 6; i++) {
				const rad = ((this.j_v_kakudo + i * 60) * Math.PI) / 180;
				this.vo_pa_x[i] = boss_wx + 16 + Math.cos(rad) * 50;
				this.vo_pa_y[i] = boss_wy + 16 + Math.sin(rad) * 50;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			for (let i = 0; i < 6; i++) {
				const rad = ((360 - this.j_v_kakudo + i * 60) * Math.PI) / 180;
				this.vo_pa_x[i] = boss_wx + 16 + Math.cos(rad) * 50;
				this.vo_pa_y[i] = boss_wy + 16 + Math.sin(rad) * 50;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			break;

		case Boss.PATTERN_BOSS3_ROTATE_LEFT:
			this.hg.dispose();
			this.hg.rotate((this.co_b.c2 * Math.PI) / 180, boss_wx + 16, boss_wy + 16);
			drawWide(238, 2, 2, boss_wx - 16, boss_wy - 16);
			this.hg.dispose();
			break;

		case Boss.PATTERN_BOSS3_BARRIER_RIGHT:
			drawWideFlip(238, 2, 2, boss_wx - 16, boss_wy - 16);
			if (this.j_v_c <= 0) {
				this.j_v_kakudo += 2;
				if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
			}
			this.gg.os_g.setColor(Color.white);
			for (let i = 0; i < 6; i++) {
				const rad = ((this.j_v_kakudo + i * 60) * Math.PI) / 180;
				this.vo_pa_x[i] = boss_wx + 16 + Math.cos(rad) * 50;
				this.vo_pa_y[i] = boss_wy + 16 + Math.sin(rad) * 50;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			for (let i = 0; i < 6; i++) {
				const rad = ((360 - this.j_v_kakudo + i * 60) * Math.PI) / 180;
				this.vo_pa_x[i] = boss_wx + 16 + Math.cos(rad) * 50;
				this.vo_pa_y[i] = boss_wy + 16 + Math.sin(rad) * 50;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			break;

		case Boss.PATTERN_BOSS3_ROTATE_RIGHT:
			this.hg.dispose();
			this.hg.rotate((this.co_b.c2 * Math.PI) / 180, boss_wx + 16, boss_wy + 16);
			drawWideFlip(238, 2, 2, boss_wx - 16, boss_wy - 16);
			this.hg.dispose();
			break;
	}
};

/**
 * HPゲージ、一言メッセージ、{@link MasaoJSS#showOval|showOval}, {@link MasaoJSS#showRect|showRect}, {@link MasaoJSS#showImage|showImage}で指定した描画物を描画します
 * {@link MasaoJSS#drawSystemObject}以外では使われていない？
 * @see {@link MasaoJSS#drawSystemObject}
 */
export const drawGamescreenWindow = function() {
	// MasaoJSS#showRectで設定された矩形を表示
	if (this.showr_c > 0) {
		this.hg.setColor(this.js_pen_color);
		this.hg.fillRect(this.showr_x, this.showr_y, this.showr_width, this.showr_height);
	}
	// MasaoJSS#showOvalで設定された楕円を表示
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

/**
 * 仕掛けを描画します
 */
export const drawGamescreenUgokuyuka = function() {
	var j2 = this.maps.wx;
	var k2 = this.maps.wy;
	if (this.ana_kazu > 0) {
		for (var i = 0; i <= 11; i++) {
			if (this.ana_c[i] <= 0) continue;
			if (this.ana_c[i] <= 135 && this.ana_c[i] >= 129) {
				var l2 = (136 - this.ana_c[i]) * 4;
				this.gg.drawPatternCut(this.ana_x[i] * 32 - j2, this.ana_y[i] * 32 - k2, 20, 0, l2);
				continue;
			}
			if (this.ana_c[i] <= 235 && this.ana_c[i] >= 229) {
				var i3 = (236 - this.ana_c[i]) * 4;
				this.gg.drawPatternCut(this.ana_x[i] * 32 - j2, this.ana_y[i] * 32 - k2, 20, 0, i3 * -1);
				continue;
			}
			if (this.ana_c[i] >= 1 && this.ana_c[i] <= 15) {
				var j3 = this.ana_c[i] * 2;
				this.gg.drawPatternCut(this.ana_x[i] * 32 - j2, this.ana_y[i] * 32 - k2, 20, 0, j3);
			}
		}
	}
	if (this.a_hf) {
		for (var j = 0; j <= this.a_kazu; j++)
			if (this.co_a[j].gf) {
				var characterobject = this.co_a[j];
				var i4 = characterobject.x - j2;
				var i5 = characterobject.y - k2;
				switch (characterobject.pt) {
					default:
						break;

					case 100:
						this.hg.drawImage(this.hi[190], i4, i5, this.ap);
						this.hg.drawImage(this.hi[191], i4 + 32, i5, this.ap);
						this.hg.drawImage(this.hi[192], i4 + 64, i5, this.ap);
						break;

					case 200:
						this.hg.drawImage(this.hi[76], i4, i5, this.ap);
						this.hg.drawImage(this.hi[77], i4 + 32, i5, this.ap);
						this.hg.drawImage(this.hi[86], i4, i5 + 32, this.ap);
						this.hg.drawImage(this.hi[87], i4 + 32, i5 + 32, this.ap);
						break;

					case 210:
						this.hg.drawImage(this.hi[78], i4, i5, this.ap);
						this.hg.drawImage(this.hi[79], i4 + 32, i5, this.ap);
						this.hg.drawImage(this.hi[88], i4, i5 + 32, this.ap);
						this.hg.drawImage(this.hi[89], i4 + 32, i5 + 32, this.ap);
						break;

					case 300:
						this.hg.drawImage(this.hi[60], i4, i5, this.ap);
						this.hg.drawImage(this.hi[61], i4 + 32, i5, this.ap);
						break;

					case 310:
						this.hg.drawImage(this.hi[62], i4, i5, this.ap);
						this.hg.drawImage(this.hi[63], i4 + 32, i5, this.ap);
						break;

					case 320:
						this.hg.drawImage(this.hi[64], i4, i5, this.ap);
						this.hg.drawImage(this.hi[65], i4 + 32, i5, this.ap);
						break;

					case 330:
						this.hg.drawImage(this.hi[66], i4, i5, this.ap);
						this.hg.drawImage(this.hi[67], i4 + 32, i5, this.ap);
						break;

					case 400:
						this.hg.drawImage(this.hi[183], i4, i5, this.ap);
						this.hg.drawImage(this.hi[184], i4 + 32, i5, this.ap);
						this.hg.drawImage(this.hi[185], i4 + 64, i5, this.ap);
						this.hg.drawImage(this.hi[193], i4, i5 + 32, this.ap);
						this.hg.drawImage(this.hi[194], i4 + 32, i5 + 32, this.ap);
						this.hg.drawImage(this.hi[195], i4 + 64, i5 + 32, this.ap);
						break;

					case 500:
						this.hg.drawImage(this.hi[180], i4, i5, this.ap);
						this.hg.drawImage(this.hi[181], i4 + 32, i5, this.ap);
						this.hg.drawImage(this.hi[182], i4 + 64, i5, this.ap);
						break;

					case 600:
						this.hg.drawImage(this.hi[188], i4, i5, this.ap);
						this.hg.drawImage(this.hi[189], i4 + 32, i5, this.ap);
						this.hg.drawImage(this.hi[198], i4, i5 + 32, this.ap);
						this.hg.drawImage(this.hi[199], i4 + 32, i5 + 32, this.ap);
						break;

					case 605:
						this.hg.drawImage(this.hih[1][189], i4, i5, this.ap);
						this.hg.drawImage(this.hih[1][188], i4 + 32, i5, this.ap);
						this.hg.drawImage(this.hih[1][199], i4, i5 + 32, this.ap);
						this.hg.drawImage(this.hih[1][198], i4 + 32, i5 + 32, this.ap);
						break;

					case 700:
						this.hg.drawImage(this.hi[32], i4, i5, this.ap);
						break;

					case 710:
						this.hg.drawImage(this.hi[33], i4, i5, this.ap);
						break;

					case 720:
						this.hg.drawImage(this.hi[34], i4, i5, this.ap);
						break;

					case 800:
						if (characterobject.x >= this.co_j.x)
							this.hg.drawImage(this.hi[35 + characterobject.c3], i4, i5, this.ap);
						else this.hg.drawImage(this.hih[1][35 + characterobject.c3], i4, i5, this.ap);
						break;

					case 1100:
						var j4 = Math.cos(((characterobject.c3 + 90) * 6.2831853071795862) / 360) * 16;
						var j5 = Math.sin(((characterobject.c3 + 90) * 6.2831853071795862) / 360) * 16;
						this.vo_pa_x[0] = this.vo_x[j][0] - j2 + j4;
						this.vo_pa_y[0] = this.vo_y[j][0] - k2 + j5;
						this.vo_pa_x[1] = this.vo_x[j][0] - j2 - j4;
						this.vo_pa_y[1] = this.vo_y[j][0] - k2 - j5;
						this.vo_pa_x[2] = this.vo_x[j][1] - j2 - j4;
						this.vo_pa_y[2] = this.vo_y[j][1] - k2 - j5;
						this.vo_pa_x[3] = this.vo_x[j][1] - j2 + j4;
						this.vo_pa_y[3] = this.vo_y[j][1] - k2 + j5;
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						if (this.g_c2 >= 2) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							var k4 = Math.cos(((characterobject.c3 + 90) * 6.2831853071795862) / 360) * 10;
							var k5 = Math.sin(((characterobject.c3 + 90) * 6.2831853071795862) / 360) * 10;
							this.vo_pa_x[0] = this.vo_x[j][2] - j2 + k4;
							this.vo_pa_y[0] = this.vo_y[j][2] - k2 + k5;
							this.vo_pa_x[1] = this.vo_x[j][2] - j2 - k4;
							this.vo_pa_y[1] = this.vo_y[j][2] - k2 - k5;
							this.vo_pa_x[2] = this.vo_x[j][3] - j2 - k4;
							this.vo_pa_y[2] = this.vo_y[j][3] - k2 - k5;
							this.vo_pa_x[3] = this.vo_x[j][3] - j2 + k4;
							this.vo_pa_y[3] = this.vo_y[j][3] - k2 + k5;
							this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						}
						break;
				}
			}
	}
	if (this.yuka_id_max >= 0) this.drawYuka();
	if (this.m_kazu > 0) {
		for (var k = 0; k <= 79; k++) {
			if (this.co_m[k].c < 50) continue;
			var characterobject1 = this.co_m[k];
			if (characterobject1.c == 50) {
				this.hg.drawImage(
					this.hih[characterobject1.pth][characterobject1.pt],
					characterobject1.x - j2,
					characterobject1.y - k2,
					this.ap
				);
				if (this.gg.layer_mode == 2) {
					var k3 = this.maps.getBGCode(characterobject1.x, characterobject1.y);
					if (k3 >= 20 && k3 != 29)
						this.gg.drawPT(
							rightShiftIgnoreSign(characterobject1.x, 5) * 32 - j2,
							rightShiftIgnoreSign(characterobject1.y, 5) * 32 - k2,
							k3,
							0
						);
					k3 = this.maps.getBGCode(characterobject1.x + 31, characterobject1.y);
					if (k3 >= 20 && k3 != 29)
						this.gg.drawPT(
							rightShiftIgnoreSign(characterobject1.x + 31, 5) * 32 - j2,
							rightShiftIgnoreSign(characterobject1.y, 5) * 32 - k2,
							k3,
							0
						);
					continue;
				}
				var l3 = this.maps.getBGCode(characterobject1.x, characterobject1.y);
				if (l3 >= 20)
					this.gg.drawPT(
						rightShiftIgnoreSign(characterobject1.x, 5) * 32 - j2,
						rightShiftIgnoreSign(characterobject1.y, 5) * 32 - k2,
						l3,
						0
					);
				l3 = this.maps.getBGCode(characterobject1.x + 31, characterobject1.y);
				if (l3 >= 20)
					this.gg.drawPT(
						rightShiftIgnoreSign(characterobject1.x + 31, 5) * 32 - j2,
						rightShiftIgnoreSign(characterobject1.y, 5) * 32 - k2,
						l3,
						0
					);
				continue;
			}
			if (characterobject1.pt == 1000) {
				this.gg.os_g.setColor(this.gamecolor_mizunohadou);
				this.gg.os_g.fillOval(
					characterobject1.x - j2 + 16 - characterobject1.c2,
					characterobject1.y - k2 + 16 - characterobject1.c2,
					characterobject1.c2 * 2,
					characterobject1.c2 * 2
				);
				continue;
			}
			if (characterobject1.pt == 1100) {
				if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.fillOval(
					characterobject1.x - j2 + 16 - characterobject1.c2,
					characterobject1.y - k2 + 16 - characterobject1.c2,
					characterobject1.c2 * 2,
					characterobject1.c2 * 2
				);
			} else {
				this.hg.drawImage(
					this.hih[characterobject1.pth][characterobject1.pt],
					characterobject1.x - j2,
					characterobject1.y - k2,
					this.ap
				);
			}
		}
	}
	if (this.jm_kazu > 0) {
		for (var l = 0; l <= 8; l++) {
			if (this.co_jm[l].c < 50) continue;
			var characterobject2 = this.co_jm[l];
			if (characterobject2.pt < 1000) {
				this.hg.drawImage(
					this.hih[characterobject2.pth][characterobject2.pt],
					characterobject2.x - j2,
					characterobject2.y - k2,
					this.ap
				);
				continue;
			}
			if (characterobject2.pt == 1200) {
				if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.fillRect(
					characterobject2.x - j2,
					characterobject2.y - k2 + 12,
					characterobject2.vx - characterobject2.x + 1,
					8
				);
				continue;
			}
			if (characterobject2.pt == 1205) {
				if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.fillRect(
					characterobject2.vx - j2,
					characterobject2.y - k2 + 12,
					characterobject2.x - characterobject2.vx + 1,
					8
				);
				continue;
			}
			if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
			else this.gg.os_g.setColor(this.gamecolor_grenade2);
			this.gg.os_g.fillOval(
				characterobject2.x - j2 + 16 - characterobject2.c2,
				characterobject2.y - k2 + 16 - characterobject2.c2,
				characterobject2.c2 * 2,
				characterobject2.c2 * 2
			);
		}
	}
	if (this.j_tokugi == 14) {
		for (var i1 = 0; i1 <= 1; i1++)
			if (this.co_mu[i1].c >= 50)
				this.hg.drawImage(this.hih[1][105 + this.g_ac], this.co_mu[i1].x - j2, this.co_mu[i1].y - k2, this.ap);
	}
	if (this.co_b.c > 50) {
		var l4 = this.co_b.x - j2;
		if (l4 < 528) {
			var l5 = this.co_b.y - k2;
			switch (this.co_b.pt) {
				default:
					break;

				case 1000:
					this.hg.drawImage(this.hih[0][186], l4 - 16, l5 - 16, this.ap);
					this.hg.drawImage(this.hih[0][187], l4 + 16, l5 - 16, this.ap);
					this.hg.drawImage(this.hih[0][196], l4 - 16, l5 + 16, this.ap);
					this.hg.drawImage(this.hih[0][197], l4 + 16, l5 + 16, this.ap);
					break;

				case 1005:
					this.hg.drawImage(this.hih[1][187], l4 - 16, l5 - 16, this.ap);
					this.hg.drawImage(this.hih[1][186], l4 + 16, l5 - 16, this.ap);
					this.hg.drawImage(this.hih[1][197], l4 - 16, l5 + 16, this.ap);
					this.hg.drawImage(this.hih[1][196], l4 + 16, l5 + 16, this.ap);
					break;

				case 1010:
					this.hg.drawImage(this.hih[0][176], l4 - 16, l5 + 16, this.ap);
					this.hg.drawImage(this.hih[0][177], l4 + 16, l5 + 16, this.ap);
					break;

				case 1015:
					this.hg.drawImage(this.hih[1][177], l4 - 16, l5 + 16, this.ap);
					this.hg.drawImage(this.hih[1][176], l4 + 16, l5 + 16, this.ap);
					break;

				case 1100:
					this.hg.drawImage(this.hih[0][188], l4 - 16, l5 - 16, this.ap);
					this.hg.drawImage(this.hih[0][189], l4 + 16, l5 - 16, this.ap);
					this.hg.drawImage(this.hih[0][198], l4 - 16, l5 + 16, this.ap);
					this.hg.drawImage(this.hih[0][199], l4 + 16, l5 + 16, this.ap);
					break;

				case 1105:
					this.hg.drawImage(this.hih[1][189], l4 - 16, l5 - 16, this.ap);
					this.hg.drawImage(this.hih[1][188], l4 + 16, l5 - 16, this.ap);
					this.hg.drawImage(this.hih[1][199], l4 - 16, l5 + 16, this.ap);
					this.hg.drawImage(this.hih[1][198], l4 + 16, l5 + 16, this.ap);
					break;

				case 1110:
					this.hg.drawImage(this.hih[0][178], l4 - 16, l5 + 16, this.ap);
					this.hg.drawImage(this.hih[0][179], l4 + 16, l5 + 16, this.ap);
					break;

				case 1115:
					this.hg.drawImage(this.hih[1][179], l4 - 16, l5 + 16, this.ap);
					this.hg.drawImage(this.hih[1][178], l4 + 16, l5 + 16, this.ap);
					break;

				case 1200:
					this.hg.drawImage(this.hih[0][238], l4 - 16, l5 - 16, this.ap);
					this.hg.drawImage(this.hih[0][239], l4 + 16, l5 - 16, this.ap);
					this.hg.drawImage(this.hih[0][248], l4 - 16, l5 + 16, this.ap);
					this.hg.drawImage(this.hih[0][249], l4 + 16, l5 + 16, this.ap);
					break;

				case 1205:
					this.hg.drawImage(this.hih[1][239], l4 - 16, l5 - 16, this.ap);
					this.hg.drawImage(this.hih[1][238], l4 + 16, l5 - 16, this.ap);
					this.hg.drawImage(this.hih[1][249], l4 - 16, l5 + 16, this.ap);
					this.hg.drawImage(this.hih[1][248], l4 + 16, l5 + 16, this.ap);
					break;

				case 1210:
					this.hg.drawImage(this.hih[0][228], l4 - 16, l5 + 16, this.ap);
					this.hg.drawImage(this.hih[0][229], l4 + 16, l5 + 16, this.ap);
					break;

				case 1215:
					this.hg.drawImage(this.hih[1][229], l4 - 16, l5 + 16, this.ap);
					this.hg.drawImage(this.hih[1][228], l4 + 16, l5 + 16, this.ap);
					break;

				case 1250:
					this.hg.drawImage(this.hih[0][238], l4 - 16, l5 - 16, this.ap);
					this.hg.drawImage(this.hih[0][239], l4 + 16, l5 - 16, this.ap);
					this.hg.drawImage(this.hih[0][248], l4 - 16, l5 + 16, this.ap);
					this.hg.drawImage(this.hih[0][249], l4 + 16, l5 + 16, this.ap);
					if (this.j_v_c <= 0) {
						this.j_v_kakudo += 2;
						if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
					}
					l4 = this.co_b.x - j2 + 16;
					l5 = this.co_b.y - k2 + 16;
					this.gg.os_g.setColor(Color.white);
					var d4 = 0.017453292519943295;
					for (var j1 = 0; j1 <= 5; j1++) {
						var d = (this.j_v_kakudo + j1 * 60) * d4;
						this.vo_pa_x[j1] = l4 + Math.cos(d) * 50;
						this.vo_pa_y[j1] = l5 + Math.sin(d) * 50;
					}

					this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
					for (var k1 = 0; k1 <= 5; k1++) {
						var d1 = (360 - this.j_v_kakudo + k1 * 60) * d4;
						this.vo_pa_x[k1] = l4 + Math.cos(d1) * 50;
						this.vo_pa_y[k1] = l5 + Math.sin(d1) * 50;
					}

					this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
					break;

				case 1255:
					this.hg.drawImage(this.hih[1][239], l4 - 16, l5 - 16, this.ap);
					this.hg.drawImage(this.hih[1][238], l4 + 16, l5 - 16, this.ap);
					this.hg.drawImage(this.hih[1][249], l4 - 16, l5 + 16, this.ap);
					this.hg.drawImage(this.hih[1][248], l4 + 16, l5 + 16, this.ap);
					if (this.j_v_c <= 0) {
						this.j_v_kakudo += 2;
						if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
					}
					l4 = this.co_b.x - j2 + 16;
					l5 = this.co_b.y - k2 + 16;
					this.gg.os_g.setColor(Color.white);
					var d5 = 0.017453292519943295;
					for (var l1 = 0; l1 <= 5; l1++) {
						var d2 = (this.j_v_kakudo + l1 * 60) * d5;
						this.vo_pa_x[l1] = l4 + Math.cos(d2) * 50;
						this.vo_pa_y[l1] = l5 + Math.sin(d2) * 50;
					}

					this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
					for (var i2 = 0; i2 <= 5; i2++) {
						var d3 = (360 - this.j_v_kakudo + i2 * 60) * d5;
						this.vo_pa_x[i2] = l4 + Math.cos(d3) * 50;
						this.vo_pa_y[i2] = l5 + Math.sin(d3) * 50;
					}

					this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
					break;
			}
		}
	}
};
