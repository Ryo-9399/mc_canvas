import { Color, Font } from "./ImageBuff";
import * as Boss from "./CharacterObject/Boss";

export const drawGamescreen = function() {
	this.maps.drawMapScroll(this.g_ac2);
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	this.co_j.wx = this.co_j.x - this.maps.wx;
	this.co_j.wy = this.co_j.y - this.maps.wy;
	if (this.a_hf) {
		for (let i = 0; i <= this.a_kazu; i++)
			if (this.co_a[i].gf) {
				var characterobject = this.co_a[i];
				var j5 = characterobject.x - view_x;
				var i7 = characterobject.y - view_y;
				switch (characterobject.pt) {
					default:
						break;

					case 100:
						this.hg.drawImage(this.hi[190], j5, i7, this.ap);
						this.hg.drawImage(this.hi[191], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[192], j5 + 64, i7, this.ap);
						break;

					case 200:
						this.hg.drawImage(this.hi[76], j5, i7, this.ap);
						this.hg.drawImage(this.hi[77], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[86], j5, i7 + 32, this.ap);
						this.hg.drawImage(this.hi[87], j5 + 32, i7 + 32, this.ap);
						break;

					case 210:
						this.hg.drawImage(this.hi[78], j5, i7, this.ap);
						this.hg.drawImage(this.hi[79], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[88], j5, i7 + 32, this.ap);
						this.hg.drawImage(this.hi[89], j5 + 32, i7 + 32, this.ap);
						break;

					case 300:
						this.hg.drawImage(this.hi[60], j5, i7, this.ap);
						this.hg.drawImage(this.hi[61], j5 + 32, i7, this.ap);
						break;

					case 310:
						this.hg.drawImage(this.hi[62], j5, i7, this.ap);
						this.hg.drawImage(this.hi[63], j5 + 32, i7, this.ap);
						break;

					case 320:
						this.hg.drawImage(this.hi[64], j5, i7, this.ap);
						this.hg.drawImage(this.hi[65], j5 + 32, i7, this.ap);
						break;

					case 330:
						this.hg.drawImage(this.hi[66], j5, i7, this.ap);
						this.hg.drawImage(this.hi[67], j5 + 32, i7, this.ap);
						break;

					case 400:
						this.hg.drawImage(this.hi[183], j5, i7, this.ap);
						this.hg.drawImage(this.hi[184], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[185], j5 + 64, i7, this.ap);
						this.hg.drawImage(this.hi[193], j5, i7 + 32, this.ap);
						this.hg.drawImage(this.hi[194], j5 + 32, i7 + 32, this.ap);
						this.hg.drawImage(this.hi[195], j5 + 64, i7 + 32, this.ap);
						break;

					case 500:
						this.hg.drawImage(this.hi[180], j5, i7, this.ap);
						this.hg.drawImage(this.hi[181], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[182], j5 + 64, i7, this.ap);
						break;

					case 600:
						this.hg.drawImage(this.hi[188], j5, i7, this.ap);
						this.hg.drawImage(this.hi[189], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[198], j5, i7 + 32, this.ap);
						this.hg.drawImage(this.hi[199], j5 + 32, i7 + 32, this.ap);
						break;

					case 605:
						this.hg.drawImage(this.hih[1][189], j5, i7, this.ap);
						this.hg.drawImage(this.hih[1][188], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hih[1][199], j5, i7 + 32, this.ap);
						this.hg.drawImage(this.hih[1][198], j5 + 32, i7 + 32, this.ap);
						break;

					case 700:
						this.hg.drawImage(this.hi[32], j5, i7, this.ap);
						break;

					case 710:
						this.hg.drawImage(this.hi[33], j5, i7, this.ap);
						break;

					case 720:
						this.hg.drawImage(this.hi[34], j5, i7, this.ap);
						break;

					case 800:
						if (characterobject.x >= this.co_j.x)
							this.hg.drawImage(this.hi[35 + characterobject.c3], j5, i7, this.ap);
						else this.hg.drawImage(this.hih[1][35 + characterobject.c3], j5, i7, this.ap);
						break;

					case 1100:
						var k5 = Math.floor(Math.cos(((characterobject.c3 + 90) * 6.2831853071795862) / 360) * 16);
						var j7 = Math.floor(Math.sin(((characterobject.c3 + 90) * 6.2831853071795862) / 360) * 16);
						this.vo_pa_x[0] = this.vo_x[i][0] - view_x + k5;
						this.vo_pa_y[0] = this.vo_y[i][0] - view_y + j7;
						this.vo_pa_x[1] = this.vo_x[i][0] - view_x - k5;
						this.vo_pa_y[1] = this.vo_y[i][0] - view_y - j7;
						this.vo_pa_x[2] = this.vo_x[i][1] - view_x - k5;
						this.vo_pa_y[2] = this.vo_y[i][1] - view_y - j7;
						this.vo_pa_x[3] = this.vo_x[i][1] - view_x + k5;
						this.vo_pa_y[3] = this.vo_y[i][1] - view_y + j7;
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						if (this.g_c2 >= 2) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							var l5 = Math.floor(Math.cos(((characterobject.c3 + 90) * 6.2831853071795862) / 360) * 10);
							var k7 = Math.floor(Math.sin(((characterobject.c3 + 90) * 6.2831853071795862) / 360) * 10);
							this.vo_pa_x[0] = this.vo_x[i][2] - view_x + l5;
							this.vo_pa_y[0] = this.vo_y[i][2] - view_y + k7;
							this.vo_pa_x[1] = this.vo_x[i][2] - view_x - l5;
							this.vo_pa_y[1] = this.vo_y[i][2] - view_y - k7;
							this.vo_pa_x[2] = this.vo_x[i][3] - view_x - l5;
							this.vo_pa_y[2] = this.vo_y[i][3] - view_y - k7;
							this.vo_pa_x[3] = this.vo_x[i][3] - view_x + l5;
							this.vo_pa_y[3] = this.vo_y[i][3] - view_y + k7;
							this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						}
						break;
				}
			}
	}
	if (this.m_kazu > 0) {
		for (var j = 0; j <= 23; j++)
			if (this.co_m[j].c >= 50) {
				var characterobject1 = this.co_m[j];
				if (characterobject1.c == 50) {
					this.hg.drawImage(
						this.hih[characterobject1.pth][characterobject1.pt],
						characterobject1.x - view_x,
						characterobject1.y - view_y,
						this.ap
					);
					var j4 = this.maps.getBGCode(characterobject1.x, characterobject1.y);
					if (j4 >= 20)
						this.gg.drawPT(
							(characterobject1.x >> 5) * 32 - view_x,
							(characterobject1.y >> 5) * 32 - view_y,
							j4,
							0
						);
					j4 = this.maps.getBGCode(characterobject1.x + 31, characterobject1.y);
					if (j4 >= 20)
						this.gg.drawPT(
							((characterobject1.x + 31) >> 5) * 32 - view_x,
							(characterobject1.y >> 5) * 32 - view_y,
							j4,
							0
						);
				} else if (characterobject1.pt == 1000) {
					this.gg.os_g.setColor(this.gamecolor_mizunohadou);
					this.gg.os_g.fillOval(
						characterobject1.x - view_x + 16 - characterobject1.c2,
						characterobject1.y - view_y + 16 - characterobject1.c2,
						characterobject1.c2 * 2,
						characterobject1.c2 * 2
					);
				} else if (characterobject1.pt == 1100) {
					if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
					else this.gg.os_g.setColor(this.gamecolor_grenade2);
					this.gg.os_g.fillOval(
						characterobject1.x - view_x + 16 - characterobject1.c2,
						characterobject1.y - view_y + 16 - characterobject1.c2,
						characterobject1.c2 * 2,
						characterobject1.c2 * 2
					);
				} else {
					this.hg.drawImage(
						this.hih[characterobject1.pth][characterobject1.pt],
						characterobject1.x - view_x,
						characterobject1.y - view_y,
						this.ap
					);
				}
			}
	}
	if (this.jm_kazu > 0) {
		for (var k = 0; k <= 1; k++)
			if (this.co_jm[k].c >= 50) {
				var characterobject2 = this.co_jm[k];
				if (characterobject2.pt < 1000)
					this.hg.drawImage(
						this.hih[characterobject2.pth][characterobject2.pt],
						characterobject2.x - view_x,
						characterobject2.y - view_y,
						this.ap
					);
				else if (characterobject2.pt == 1200) {
					if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
					else this.gg.os_g.setColor(this.gamecolor_grenade2);
					this.gg.os_g.fillRect(
						characterobject2.x - view_x,
						characterobject2.y - view_y + 12,
						characterobject2.vx - characterobject2.x + 1,
						8
					);
				} else if (characterobject2.pt == 1205) {
					if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
					else this.gg.os_g.setColor(this.gamecolor_grenade2);
					this.gg.os_g.fillRect(
						characterobject2.vx - view_x,
						characterobject2.y - view_y + 12,
						characterobject2.x - characterobject2.vx + 1,
						8
					);
				} else {
					if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
					else this.gg.os_g.setColor(this.gamecolor_grenade2);
					this.gg.os_g.fillOval(
						characterobject2.x - view_x + 16 - characterobject2.c2,
						characterobject2.y - view_y + 16 - characterobject2.c2,
						characterobject2.c2 * 2,
						characterobject2.c2 * 2
					);
				}
			}
	}
	for (var l = 0; l <= this.t_kazu; l++) {
		if (this.co_t[l].c >= 50) {
			var i6 = this.co_t[l].x - view_x;
			var l7 = this.co_t[l].y - view_y;
			if (i6 >= -64 && l7 <= 576) this.hg.drawImage(this.hih[this.co_t[l].pth][this.co_t[l].pt], i6, l7, this.ap);
		}
	}

	// ボスの描画
	drawBoss.apply(this);

	// 主人公の描画
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
		if (this.j_v_c > 50 || this.g_ac === 1) {
			const center_x = this.co_j.x - view_x + 16;
			const center_y = this.co_j.y - view_y + 16;
			this.gg.os_g.setColor(Color.white);
			for (let i = 0; i < 6; i++) {
				const rad = ((this.j_v_kakudo + i * 60) * Math.PI) / 180;
				this.vo_pa_x[i] = center_x + Math.floor(Math.cos(rad) * 38);
				this.vo_pa_y[i] = center_y + Math.floor(Math.sin(rad) * 38);
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			for (let i = 0; i < 6; i++) {
				const rad = ((360 - this.j_v_kakudo + i * 60) * Math.PI) / 180;
				this.vo_pa_x[i] = center_x + Math.floor(Math.cos(rad) * 38);
				this.vo_pa_y[i] = center_y + Math.floor(Math.sin(rad) * 38);
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
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
			this.hg.drawImage(this.hih[muki][this.j_zan_pt[index]], zan_wx, zan_wy, this.ap);
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
	// 主人公本体の描画
	if (this.co_j.pt < 1000) {
		this.gg.drawPT(this.co_j.wx, this.co_j.wy, this.co_j.pt, this.co_j.muki);
	} else if (this.co_j.pt == 1000) {
		// しっぽを伸ばしている
		if (this.co_j.muki == 0) {
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

	// 一言メッセージ
	if (this.hitokoto_c > 0) {
		this.hitokoto_c--;
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
	const boss_wx = this.co_b.x - wx;
	/**
	 * ボスのゲーム画面上のY座標
	 * @type {number}
	 */
	const boss_wy = this.co_b.y - wy;
	if (boss_wx >= 528) return;
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

		case Boss.PATTERN_BOSS2_RIGHT:
			drawWideFlip(188, 2, 2, boss_wx - 16, boss_wy - 16);
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
				this.vo_pa_x[i] = boss_wx + 16 + Math.floor(Math.cos(rad) * 50);
				this.vo_pa_y[i] = boss_wy + 16 + Math.floor(Math.sin(rad) * 50);
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			for (let i = 0; i < 6; i++) {
				const rad = ((360 - this.j_v_kakudo + i * 60) * Math.PI) / 180;
				this.vo_pa_x[i] = boss_wx + 16 + Math.floor(Math.cos(rad) * 50);
				this.vo_pa_y[i] = boss_wy + 16 + Math.floor(Math.sin(rad) * 50);
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
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
				this.vo_pa_x[i] = boss_wx + 16 + Math.floor(Math.cos(rad) * 50);
				this.vo_pa_y[i] = boss_wy + 16 + Math.floor(Math.sin(rad) * 50);
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			for (let i = 0; i < 6; i++) {
				const rad = ((360 - this.j_v_kakudo + i * 60) * Math.PI) / 180;
				this.vo_pa_x[i] = boss_wx + 16 + Math.floor(Math.cos(rad) * 50);
				this.vo_pa_y[i] = boss_wy + 16 + Math.floor(Math.sin(rad) * 50);
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
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
		const message = this.gg.ap.getParameter(param_name);
		// 0と設定されている行は表示しない
		if (parseInt(message) === 0) continue;
		messages.push(message);
	}

	// メッセージボックスを描画
	this.km.drawWindowbox(box_x, box_y, box_width, 30 + messages.length * 14);

	this.hg.setFont(new Font(Font.DIALOG, 0, 12));
	// 名前を描画
	this.hg.setColor(Color.cyan);
	const param_name = `hitokoto${this.hitokoto_num}_name`;
	const name = this.gg.ap.getParameter(param_name);
	this.hg.drawString(name, box_x + 6, box_y + 6 + 12);

	// メッセージ本文を描画
	this.hg.setColor(Color.white);
	for (const [i, message] of messages.entries()) {
		const dy = 18 + i * 14 + 12;
		this.hg.drawString(message, box_x + 6, box_y + 6 + dy);
	}
};
