import { Color, Font } from "./ImageBuff";
import * as Boss from "./CharacterObject/Boss";
import { rightShiftIgnoreSign } from "./GlobalFunctions";

/**
 * 仕掛けを描画します
 */
export const drawGamescreenUgokuyuka = function() {
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	if (this.ana_kazu > 0) {
		drawAna.apply(this);
	}
	if (this.a_hf) {
		drawA.apply(this);
	}

	if (this.yuka_id_max >= 0) this.drawYuka();
	if (this.m_kazu > 0) {
		drawM.apply(this);
	}
	if (this.jm_kazu > 0) {
		drawMyAttack.apply(this);
	}
	if (this.j_tokugi == 14) {
		for (let i = 0; i <= 1; i++)
			if (this.co_mu[i].c >= 50)
				this.hg.drawImage(
					this.hih[1][105 + this.g_ac],
					this.co_mu[i].x - view_x,
					this.co_mu[i].y - view_y,
					this.ap
				);
	}
	// ボスの描画
	drawBossLegacy.apply(this);
};

/**
 * 敵を描画します
 * {@link MasaoJSS#drawSystemObject}以外では使われていない？
 * @see {@link MasaoJSS#drawSystemObject}
 */
export const drawGamescreenEnemy = function() {
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	for (let i = 0; i <= this.t_kazu; i++) {
		if (this.co_t[i].c < 50) continue;
		const co_wx = this.co_t[i].x - view_x;
		const co_wy = this.co_t[i].y - view_y;
		if (co_wx < -64 || co_wy > 576) continue;
		if (this.co_t[i].img !== null)
			this.hg.drawImage(this.co_t[i].img, co_wx + this.co_t[i].zs_x, co_wy + this.co_t[i].zs_y, this.ap);
		else this.hg.drawImage(this.hih[this.co_t[i].pth][this.co_t[i].pt], co_wx, co_wy, this.ap);
	}
};

export const drawAna = function() {
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	for (let i = 0; i <= 11; i++) {
		if (this.ana_c[i] <= 0) continue;
		if (this.ana_c[i] <= 135 && this.ana_c[i] >= 129) {
			const ana_y = (136 - this.ana_c[i]) * 4;
			this.gg.drawPatternCut(this.ana_x[i] * 32 - view_x, this.ana_y[i] * 32 - view_y, 20, 0, ana_y);
			continue;
		}
		if (this.ana_c[i] <= 235 && this.ana_c[i] >= 229) {
			const ana_y = (236 - this.ana_c[i]) * 4;
			this.gg.drawPatternCut(this.ana_x[i] * 32 - view_x, this.ana_y[i] * 32 - view_y, 20, 0, ana_y * -1);
			continue;
		}
		if (this.ana_c[i] >= 1 && this.ana_c[i] <= 15) {
			const ana_y = this.ana_c[i] * 2;
			this.gg.drawPatternCut(this.ana_x[i] * 32 - view_x, this.ana_y[i] * 32 - view_y, 20, 0, ana_y);
		}
	}
};

/**
 * 仕掛けを描画します
 */
export const drawA = function() {
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
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	for (let i = 0; i <= this.a_kazu; i++) {
		if (this.co_a[i].gf) {
			const characterobject = this.co_a[i];
			const co_wx = characterobject.x - view_x;
			const co_wy = characterobject.y - view_y;
			switch (characterobject.pt) {
				default:
					break;

				case 100:
					// 動く床
					drawWide(190, 3, 1, co_wx, co_wy);
					break;

				case 200:
					// 水草
					drawWide(76, 2, 2, co_wx, co_wy);
					break;

				case 210:
					// 水草
					drawWide(78, 2, 2, co_wx, co_wy);
					break;

				case 300:
					// リンク土管1
					drawWide(60, 2, 1, co_wx, co_wy);
					break;

				case 310:
					// リンク土管2
					drawWide(62, 2, 1, co_wx, co_wy);
					break;

				case 320:
					// リンク土管3
					drawWide(64, 2, 1, co_wx, co_wy);
					break;

				case 330:
					// リンク土管4
					drawWide(66, 2, 1, co_wx, co_wy);
					break;

				case 400:
					// ドッスンスン
					drawWide(183, 3, 2, co_wx, co_wy);
					break;

				case 500:
					// 落ちる床
					drawWide(180, 3, 1, co_wx, co_wy);
					break;

				case 600:
					// カイオール 左向き
					drawWide(188, 2, 2, co_wx, co_wy);
					break;

				case 605:
					// カイオール 右向き
					drawWideFlip(188, 2, 2, co_wx, co_wy);
					break;

				case 700:
					// ジャンプ台 伸びている
					this.hg.drawImage(this.hi[32], co_wx, co_wy, this.ap);
					break;

				case 710:
					// ジャンプ台 途中
					this.hg.drawImage(this.hi[33], co_wx, co_wy, this.ap);
					break;

				case 720:
					// ジャンプ台 縮んでいる
					this.hg.drawImage(this.hi[34], co_wx, co_wy, this.ap);
					break;

				case 800: {
					// 一言メッセージの人
					const muki = characterobject.x >= this.co_j.x ? 0 : 1;
					this.hg.drawImage(this.hih[muki][35 + characterobject.c3], co_wx, co_wy, this.ap);
					break;
				}

				case 1100: {
					// ファイヤーバー
					const rad = ((characterobject.c3 + 90) * Math.PI) / 180;
					const dx = Math.cos(rad) * 16;
					const dy = Math.sin(rad) * 16;
					this.vo_pa_x[0] = this.vo_x[i][0] - view_x + dx;
					this.vo_pa_y[0] = this.vo_y[i][0] - view_y + dy;
					this.vo_pa_x[1] = this.vo_x[i][0] - view_x - dx;
					this.vo_pa_y[1] = this.vo_y[i][0] - view_y - dy;
					this.vo_pa_x[2] = this.vo_x[i][1] - view_x - dx;
					this.vo_pa_y[2] = this.vo_y[i][1] - view_y - dy;
					this.vo_pa_x[3] = this.vo_x[i][1] - view_x + dx;
					this.vo_pa_y[3] = this.vo_y[i][1] - view_y + dy;
					this.gg.os_g.setColor(this.gamecolor_firebar1);
					this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					if (this.g_c2 >= 2) {
						// 内側の色を描画
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						const dx = Math.cos(rad) * 10;
						const dy = Math.sin(rad) * 10;
						this.vo_pa_x[0] = this.vo_x[i][2] - view_x + dx;
						this.vo_pa_y[0] = this.vo_y[i][2] - view_y + dy;
						this.vo_pa_x[1] = this.vo_x[i][2] - view_x - dx;
						this.vo_pa_y[1] = this.vo_y[i][2] - view_y - dy;
						this.vo_pa_x[2] = this.vo_x[i][3] - view_x - dx;
						this.vo_pa_y[2] = this.vo_y[i][3] - view_y - dy;
						this.vo_pa_x[3] = this.vo_x[i][3] - view_x + dx;
						this.vo_pa_y[3] = this.vo_y[i][3] - view_y + dy;
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					}
					break;
				}
			}
		}
	}
};

/**
 * 敵の攻撃・アイテムを描画します
 */
export const drawM = function() {
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
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	for (let i = 0; i <= 79; i++) {
		if (this.co_m[i].c < 50) continue;
		const characterobject = this.co_m[i];
		if (characterobject.c == 50) {
			this.hg.drawImage(
				this.hih[characterobject.pth][characterobject.pt],
				characterobject.x - view_x,
				characterobject.y - view_y,
				this.ap
			);
			if (this.gg.layer_mode == 2) {
				let bgc = this.maps.getBGCode(characterobject.x, characterobject.y);
				if (bgc >= 20 && bgc != 29)
					this.gg.drawPT(
						rightShiftIgnoreSign(characterobject.x, 5) * 32 - view_x,
						rightShiftIgnoreSign(characterobject.y, 5) * 32 - view_y,
						bgc,
						0
					);
				bgc = this.maps.getBGCode(characterobject.x + 31, characterobject.y);
				if (bgc >= 20 && bgc != 29)
					this.gg.drawPT(
						rightShiftIgnoreSign(characterobject.x + 31, 5) * 32 - view_x,
						rightShiftIgnoreSign(characterobject.y, 5) * 32 - view_y,
						bgc,
						0
					);
			} else {
				let bgc = this.maps.getBGCode(characterobject.x, characterobject.y);
				if (bgc >= 20)
					this.gg.drawPT(
						rightShiftIgnoreSign(characterobject.x, 5) * 32 - view_x,
						rightShiftIgnoreSign(characterobject.y, 5) * 32 - view_y,
						bgc,
						0
					);
				bgc = this.maps.getBGCode(characterobject.x + 31, characterobject.y);
				if (bgc >= 20)
					this.gg.drawPT(
						rightShiftIgnoreSign(characterobject.x + 31, 5) * 32 - view_x,
						rightShiftIgnoreSign(characterobject.y, 5) * 32 - view_y,
						bgc,
						0
					);
			}
		} else if (characterobject.pt == 1000) {
			this.gg.os_g.setColor(this.gamecolor_mizunohadou);
			this.gg.os_g.fillOval(
				characterobject.x - view_x + 16 - characterobject.c2,
				characterobject.y - view_y + 16 - characterobject.c2,
				characterobject.c2 * 2,
				characterobject.c2 * 2
			);
		} else if (characterobject.pt == 1100) {
			if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
			else this.gg.os_g.setColor(this.gamecolor_grenade2);
			this.gg.os_g.fillOval(
				characterobject.x - view_x + 16 - characterobject.c2,
				characterobject.y - view_y + 16 - characterobject.c2,
				characterobject.c2 * 2,
				characterobject.c2 * 2
			);
		} else {
			this.hg.drawImage(
				this.hih[characterobject.pth][characterobject.pt],
				characterobject.x - view_x,
				characterobject.y - view_y,
				this.ap
			);
		}
	}
};

/**
 * 主人公を描画します
 * {@link MasaoJSS#drawSystemObject}以外では使われていない？
 * @see {@link MasaoJSS#drawSystemObject}
 */
export const drawGamescreenMy = function() {
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	this.co_j.wx = this.co_j.x - view_x;
	this.co_j.wy = this.co_j.y - view_y;
	if (this.j_jet_c >= 96) {
		// ジェット噴射
		if (this.g_c1 === 0) this.hg.drawImage(this.hi[134], this.co_j.wx, this.co_j.wy + 36, this.ap);
		else this.hg.drawImage(this.hi[135], this.co_j.wx, this.co_j.wy + 36, this.ap);
	}
	if (this.j_v_c > 0) {
		// バリア
		this.j_v_c--;
		this.j_v_kakudo += 2;
		if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
		if (this.j_v_c > 40 || this.g_ac === 1) {
			const center_x = this.co_j.wx + 16;
			const center_y = this.co_j.wy + 16;
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
 * ボスを描画 (drawGamescreenUgokuyukaによって呼び出されるほう)
 * NOTE: Math.floorの有無を除くとv28のdrawBossとまったく同じ処理
 * TODO: この関数ごと消したい
 */
const drawBossLegacy = function() {
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
		drawHPGauge.apply(this);
	}
	// 一言メッセージ
	if (this.hitokoto_c > -1) {
		drawHitokotoMessage.apply(this);
	}
};

/**
 * HPゲージを描画
 */
export const drawHPGauge = function() {
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
};

/**
 * スポット処理
 */
export const drawSpot = function() {
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	if (this.spot_c === 100) {
		// TODO: そもそも変数名rで直径を表すな
		const radius = rightShiftIgnoreSign(this.spot_r, 1);
		const diameter = this.spot_r;
		this.hg.setColor(Color.black);
		const left_wx = this.co_j.wx + 16 - radius;
		if (left_wx > 0) this.hg.fillRect(0, 0, left_wx, 320);
		const right_wx = this.co_j.wx + 16 + radius;
		if (right_wx < 512) this.hg.fillRect(right_wx, 0, 512 - right_wx, 320);
		const top_wy = this.co_j.wy + 16 - radius;
		if (top_wy > 0) this.hg.fillRect(left_wx, 0, right_wx - left_wx, top_wy);
		const bottom_wy = this.co_j.wy + 16 + radius;
		if (bottom_wy < 320) this.hg.fillRect(left_wx, bottom_wy, right_wx - left_wx, 320 - bottom_wy);
		this.spot_g.drawImage(this.gg.os_img, 0, 0, this.ap);
		this.hg.setColor(Color.black);
		this.hg.fillRect(0, 0, 512, 320);
		this.hg.dispose();
		this.hg.setClip("ellipse", this.co_j.wx + 16 - radius, this.co_j.wy + 16 - radius, diameter, diameter);
		this.hg.drawImage(this.spot_img, 0, 0, this.ap);
		this.hg.setColor(new Color(0, 0, 0, 96));
		this.hg.fillRect(0, 0, 512, 320);
		this.hg.setClip(
			"ellipse",
			this.co_j.wx + 16 - (radius - 24),
			this.co_j.wy + 16 - (radius - 24),
			diameter - 48,
			diameter - 48
		);
		this.hg.drawImage(this.spot_img, 0, 0, this.ap);
		this.hg.dispose();
	} else if (this.spot_c === 200) {
		this.hg.setColor(Color.black);
		this.hg.fillRect(0, 0, 512, 320);
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
