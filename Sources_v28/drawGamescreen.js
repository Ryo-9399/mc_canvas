import { Color, Font } from "./ImageBuff";
import * as Boss from "./CharacterObject/Boss";

export const drawGamescreen = function() {
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
	this.maps.drawMapScroll(this.g_ac2);
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	this.co_j.wx = this.co_j.x - view_x;
	this.co_j.wy = this.co_j.y - view_y;
	if (this.a_hf) {
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
						const dx = Math.floor(Math.cos(rad) * 16);
						const dy = Math.floor(Math.sin(rad) * 16);
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
							const dx = Math.floor(Math.cos(rad) * 10);
							const dy = Math.floor(Math.sin(rad) * 10);
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
	}

	if (this.m_kazu > 0) {
		for (let i = 0; i <= 23; i++) {
			if (this.co_m[i].c < 50) continue;
			const characterobject = this.co_m[i];
			if (characterobject.c == 50) {
				this.hg.drawImage(
					this.hih[characterobject.pth][characterobject.pt],
					characterobject.x - view_x,
					characterobject.y - view_y,
					this.ap
				);
				let bgc = this.maps.getBGCode(characterobject.x, characterobject.y);
				if (bgc >= 20)
					this.gg.drawPT(
						(characterobject.x >> 5) * 32 - view_x,
						(characterobject.y >> 5) * 32 - view_y,
						bgc,
						0
					);
				bgc = this.maps.getBGCode(characterobject.x + 31, characterobject.y);
				if (bgc >= 20)
					this.gg.drawPT(
						((characterobject.x + 31) >> 5) * 32 - view_x,
						(characterobject.y >> 5) * 32 - view_y,
						bgc,
						0
					);
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
	}
	if (this.jm_kazu > 0) {
		drawMyAttack.apply(this);
	}
	drawGamescreenEnemy.apply(this);

	// ボスの描画
	drawBoss.apply(this);

	// 主人公の描画
	// 一言メッセージ
	if (this.hitokoto_c > 0) {
		this.hitokoto_c--;
		drawHitokotoMessage.apply(this);
	}
};

/**
 * 敵を描画します
 */
const drawGamescreenEnemy = function() {
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	for (let i = 0; i <= this.t_kazu; i++) {
		if (this.co_t[i].c < 50) continue;
		const co_wx = this.co_t[i].x - view_x;
		const co_wy = this.co_t[i].y - view_y;
		if (co_wx < -64 || co_wy > 576) continue;
		this.hg.drawImage(this.hih[this.co_t[i].pth][this.co_t[i].pt], co_wx, co_wy, this.ap);
	}
};

/**
 * 主人公を描画します
 */
const drawGamescreenMy = function() {
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	// NOTE: drawGamescreenでも同じ代入をしているので、drawGamescreenから呼ばれた場合同じ処理が二回行われる
	// this.co_j.xもview_xも変化しないので、特に問題はない
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
		if (this.j_v_c > 50 || this.g_ac === 1) {
			const center_x = this.co_j.wx + 16;
			const center_y = this.co_j.wy + 16;
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
};

/**
 * 主人公の攻撃を描画します
 */
export const drawMyAttack = function() {
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	for (let i = 0; i <= 1; i++) {
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
const drawBoss = function() {
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
const drawHitokotoMessage = function() {
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
