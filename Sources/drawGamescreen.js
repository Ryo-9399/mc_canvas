import { Color, Font } from "./ImageBuff";
import { rightShiftIgnoreSign } from "./GlobalFunctions";

import * as drawGameScreenJSS from "./drawGamescreenJSS";

/**
 * ゲーム画面を描画します
 */
export const drawGamescreen = function() {
	if (this.gg.layer_mode === 2 || this.mcs_haikei_visible === 1)
		this.maps.drawMapLayer(this.maps.wx, this.maps.wy, this.g_ac2, this.gazou_scroll, 1);
	else if (this.setmapc_f) {
		this.setmapc_f = false;
		this.maps.drawMap(this.maps.wx, this.maps.wy);
	} else {
		this.maps.drawMapScroll(this.g_ac2);
	}
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	this.co_j.wx = this.co_j.x - view_x;
	this.co_j.wy = this.co_j.y - view_y;
	if (this.ana_kazu > 0) {
		drawGameScreenJSS.drawAna.apply(this);
	}
	if (this.souko_count1 >= 1) {
		for (let i = 0; i <= this.a_kazu; i++) {
			if (this.co_a[i].pt === 3300 && this.co_a[i].gf) {
				const characterobject = this.co_a[i];
				const co_wx = characterobject.x - view_x;
				const co_wy = characterobject.y - view_y;
				switch (characterobject.pt) {
					default:
						break;

					case 3300:
						if (this.g_c3 >= 3) {
							this.gg.os_g.setColor(this.gamecolor_firebar1);
							this.gg.os_g.drawRect(co_wx, co_wy, 95, 63);
							this.gg.os_g.drawLine(co_wx, co_wy, co_wx + 95, co_wy + 63);
							this.gg.os_g.drawLine(co_wx, co_wy + 63, co_wx + 95, co_wy);
						}
						break;
				}
			}
		}
	}
	if (this.a_hf) {
		drawA.apply(this);
	}

	if (this.yuka_id_max >= 0) this.drawYuka();
	if (this.m_kazu > 0) {
		drawM.apply(this);
	}
	if (this.jm_kazu > 0) {
		drawGameScreenJSS.drawMyAttack.apply(this);
	}
	if (this.j_tokugi === 14) {
		for (let i = 0; i <= 1; i++)
			if (this.co_mu[i].c >= 50)
				this.hg.drawImage(
					this.hih[1][105 + this.g_ac],
					this.co_mu[i].x - view_x,
					this.co_mu[i].y - view_y,
					this.ap
				);
	}
	if (this.system_draw_mode < 3) {
		drawGameScreenJSS.drawGamescreenEnemy.apply(this);
	}
	// ボスの描画
	drawGameScreenJSS.drawBoss.apply(this);

	// 主人公の描画
	if (this.system_draw_mode < 2) {
		drawGamescreenMy.apply(this);
	}
	if (this.j_muteki_c > 0) this.j_muteki_c--;

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
		if (this.gg.ap !== null) this.hg.drawImage(this.showi_img, this.showi_x, this.showi_y, this.gg.ap);
		else this.hg.drawImage(this.showi_img, this.showi_x, this.showi_y, this.gg.oya);
	}
	// TODO: 描画関数でカウンタ更新やめろ
	if (this.showr_c > 0) this.showr_c--;
	if (this.showo_c > 0) this.showo_c--;
	if (this.showi_c > 0) this.showi_c--;
	// セカンド画像 主人公の手前
	// TODO:MapSystem.prototype.drawMapLayerに同じような処理があるのでそっちに統合

	if (this.second_gazou_visible && this.second_gazou_priority === 2 && this.second_gazou_img !== null) {
		const draw = (x, y) => {
			this.hg.drawImage(this.second_gazou_img, x, y);
		};
		// [x方向の繰り返し回数, y方向の繰り返し回数]
		let repeat_times = [1, 1];
		let scroll_x = 0;
		let scroll_y = 0;
		let image_width = 512;
		let image_height = 320;
		if (this.second_gazou_scroll === 2) {
			// 左右スクロール  速度１／４
			scroll_x = -(rightShiftIgnoreSign(view_x - 32, 2) % image_width);
			repeat_times[0] = 2;
		} else if (this.second_gazou_scroll === 3) {
			// 左右スクロール  速度１／２
			scroll_x = -(rightShiftIgnoreSign(view_x - 32, 1) % image_width);
			repeat_times[0] = 2;
		} else if (this.second_gazou_scroll === 4) {
			// 指定速度で強制スクロール
			this.maps.second_gazou_x += this.second_gazou_scroll_speed_x;
			this.maps.second_gazou_y += this.second_gazou_scroll_speed_y;
			if (this.maps.second_gazou_x < -512) this.maps.second_gazou_x += 512;
			if (this.maps.second_gazou_x > 0) this.maps.second_gazou_x -= 512;
			if (this.maps.second_gazou_y < -320) this.maps.second_gazou_y += 320;
			if (this.maps.second_gazou_y > 0) this.maps.second_gazou_y -= 320;
			scroll_x = this.second_gazou_x;
			scroll_y = this.second_gazou_y;
			repeat_times = [2, 2];
		} else if (this.second_gazou_scroll === 5) {
			// 左右スクロール  速度３／２
			scroll_x = -(rightShiftIgnoreSign((view_x - 32) * 3, 1) % image_width);
			repeat_times[0] = 2;
		} else if (this.second_gazou_scroll === 6) {
			// 画像サイズ  ５１２×９６０
			image_height = 960;
			scroll_x = -(rightShiftIgnoreSign((view_x - 32) * 3, 1) % image_width);
			scroll_y = -(view_y - 320);
			repeat_times[0] = 2;
		} else if (this.second_gazou_scroll === 7) {
			// マップと同じ速度で全方向
			scroll_x = -((view_x - 32) % image_width);
			scroll_y = -((view_y - 320) % image_height);
			repeat_times = [2, 2];
		} else if (this.second_gazou_scroll === 8) {
			// マップの指定座標に設置  画像サイズは任意
			scroll_x = this.second_gazou_scroll_x + 32 - view_x;
			scroll_y = this.second_gazou_scroll_y + 320 - view_y;
			if (scroll_x >= 512 || scroll_y >= 320) {
				repeat_times = [0, 0];
			}
		}
		for (let i = 0; i < repeat_times[0]; i++) {
			for (let j = 0; j < repeat_times[1]; j++) {
				draw(scroll_x + i * image_width, scroll_y + j * image_height);
			}
		}
	}
	// ゲージを表示
	if (this.gauge_v) {
		drawGameScreenJSS.drawHPGauge.apply(this);
	}
	// スポット処理
	drawGameScreenJSS.drawSpot.apply(this);
	// 一言メッセージ
	if (this.hitokoto_c === 0) this.hitokoto_c = -1;
	else if (this.hitokoto_c > 0) {
		this.hitokoto_c--;
		drawGameScreenJSS.drawHitokotoMessage.apply(this);
	}
	this.km.drawMenus();
};

/**
 * 仕掛けを描画します
 */
const drawA = function() {
	const ai = new Array(26);
	const ai1 = new Array(26);
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
				case 850:
				case 2700:
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

				case 300: // リンク土管1
				case 310: // リンク土管2
				case 320: // リンク土管3
				case 330: // リンク土管4
					const dokan_id = characterobject.c3 % 100;
					const dokan_type = Math.floor(characterobject.c3 / 100);
					drawDokan.apply(this, [dokan_id, dokan_type, co_wx, co_wy]);
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

				case 750: {
					// ジャンプ台 左向き
					const pt = characterobject.c3 > 0 ? 32 : 33;
					this.hg.dispose();
					this.hg.rotate(-Math.PI / 2, co_wx + 16, co_wy + 16);
					this.hg.drawImage(this.hi[pt], co_wx, co_wy, this.ap);
					this.hg.dispose();
					break;
				}

				case 751: {
					// ジャンプ台 右向き
					const pt = characterobject.c3 > 0 ? 32 : 33;
					this.hg.dispose();
					this.hg.rotate(Math.PI / 2, co_wx + 16, co_wy + 16);
					this.hg.drawImage(this.hi[pt], co_wx, co_wy, this.ap);
					this.hg.dispose();
					break;
				}

				case 800: {
					// 一言メッセージの人
					const muki = characterobject.x >= this.co_j.x ? 0 : 1;
					this.hg.drawImage(this.hih[muki][35 + characterobject.c3], co_wx, co_wy, this.ap);
					break;
				}

				case 860: {
					// アイテムをくれる人・お店
					let pt = 39;
					if (characterobject.c === 87) pt = 37;
					else if (characterobject.c === 88) pt = 38;
					const muki = characterobject.x >= this.co_j.x ? 0 : 1;
					this.hg.drawImage(this.hih[muki][pt], co_wx, co_wy, this.ap);
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

				case 1200: {
					// シーソー
					const rad = (characterobject.vy * Math.PI) / 180;
					this.vo_pa_x[0] = co_wx + Math.cos(rad + Math.PI) * 160;
					this.vo_pa_y[0] = co_wy + Math.sin(rad + Math.PI) * 160;
					this.vo_pa_x[1] = co_wx + Math.cos(rad) * 160;
					this.vo_pa_y[1] = co_wy + Math.sin(rad) * 160;
					this.vo_pa_x[2] = this.vo_pa_x[1] + Math.cos(rad - Math.PI / 2) * 12;
					this.vo_pa_y[2] = this.vo_pa_y[1] + Math.sin(rad - Math.PI / 2) * 12;
					this.vo_pa_x[3] = this.vo_pa_x[0] + Math.cos(rad - Math.PI / 2) * 12;
					this.vo_pa_y[3] = this.vo_pa_y[0] + Math.sin(rad - Math.PI / 2) * 12;
					this.gg.os_g.setColor(this.gamecolor_firebar2);
					this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					this.vo_pa_x[0] = co_wx;
					this.vo_pa_y[0] = co_wy;
					this.vo_pa_x[1] = co_wx - 16;
					this.vo_pa_y[1] = co_wy + 128;
					this.vo_pa_x[2] = co_wx + 16;
					this.vo_pa_y[2] = co_wy + 128;
					this.gg.os_g.setColor(this.gamecolor_firebar1);
					this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 3);
					break;
				}

				case 1300: {
					// ブランコ
					const rad = (characterobject.vy * Math.PI) / 180;
					this.vo_pa_x[0] = co_wx + Math.cos(rad + Math.PI / 9) * 192;
					this.vo_pa_y[0] = co_wy + Math.sin(rad + Math.PI / 9) * 192;
					this.vo_pa_x[1] = co_wx + Math.cos(rad - Math.PI / 9) * 192;
					this.vo_pa_y[1] = co_wy + Math.sin(rad - Math.PI / 9) * 192;
					this.vo_pa_x[2] = this.vo_pa_x[1] + Math.cos(rad) * 12;
					this.vo_pa_y[2] = this.vo_pa_y[1] + Math.sin(rad) * 12;
					this.vo_pa_x[3] = this.vo_pa_x[0] + Math.cos(rad) * 12;
					this.vo_pa_y[3] = this.vo_pa_y[0] + Math.sin(rad) * 12;
					this.vo_pa_x[4] = co_wx + Math.cos(rad) * 12;
					this.vo_pa_y[4] = co_wy + Math.sin(rad) * 12;
					const dx = Math.cos(rad) * 80;
					const dy = Math.sin(rad) * 80;
					this.gg.os_g.setColor(this.gamecolor_firebar1);
					this.gg.os_g.drawLine(this.vo_pa_x[4], this.vo_pa_y[4], co_wx + dx, co_wy + dy);
					this.gg.os_g.drawLine(this.vo_pa_x[0], this.vo_pa_y[0], co_wx + dx, co_wy + dy);
					this.gg.os_g.drawLine(this.vo_pa_x[1], this.vo_pa_y[1], co_wx + dx, co_wy + dy);
					this.gg.os_g.setColor(this.gamecolor_firebar2);
					this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					break;
				}

				case 1400: {
					// スウィングバー
					const rad = (characterobject.vy * Math.PI) / 180;
					this.vo_pa_x[0] = co_wx + Math.cos(rad) * 192 + Math.cos(rad + Math.PI / 2) * 12;
					this.vo_pa_y[0] = co_wy + Math.sin(rad) * 192 + Math.sin(rad + Math.PI / 2) * 12;
					this.vo_pa_x[1] = co_wx + Math.cos(rad) * 60 + Math.cos(rad + Math.PI / 2) * 12;
					this.vo_pa_y[1] = co_wy + Math.sin(rad) * 60 + Math.sin(rad + Math.PI / 2) * 12;
					this.vo_pa_x[2] = co_wx + Math.cos(rad) * 60 + Math.cos(rad - Math.PI / 2) * 12;
					this.vo_pa_y[2] = co_wy + Math.sin(rad) * 60 + Math.sin(rad - Math.PI / 2) * 12;
					this.vo_pa_x[3] = co_wx + Math.cos(rad) * 192 + Math.cos(rad - Math.PI / 2) * 12;
					this.vo_pa_y[3] = co_wy + Math.sin(rad) * 192 + Math.sin(rad - Math.PI / 2) * 12;
					this.gg.os_g.setColor(this.gamecolor_firebar2);
					this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					break;
				}

				case 1500:
					// TODO: ファイヤーウォール
					if (characterobject.c4 <= 0) break;
					this.gg.os_g.setColor(this.gamecolor_firebar1);
					// 0:通常 1:下向き 2:左向き 3:右向き
					if (characterobject.c3 === 1 || characterobject.c3 === 11) {
						this.gg.os_g.fillRect(co_wx + 8, co_wy, 48, characterobject.c4);
						if (this.g_c2 >= 2 && characterobject.c4 > 8) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							this.gg.os_g.fillRect(co_wx + 16, co_wy, 32, characterobject.c4 - 8);
						}
					} else if (characterobject.c3 === 2 || characterobject.c3 === 12) {
						this.gg.os_g.fillRect(co_wx - characterobject.c4, co_wy + 8, characterobject.c4, 48);
						if (this.g_c2 >= 2 && characterobject.c4 > 8) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							this.gg.os_g.fillRect(
								co_wx - characterobject.c4 + 8,
								co_wy + 16,
								characterobject.c4 - 8,
								32
							);
						}
					} else if (characterobject.c3 === 3 || characterobject.c3 === 13) {
						this.gg.os_g.fillRect(co_wx, co_wy + 8, characterobject.c4, 48);
						if (this.g_c2 >= 2 && characterobject.c4 > 8) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							this.gg.os_g.fillRect(co_wx, co_wy + 16, characterobject.c4 - 8, 32);
						}
					} else {
						this.gg.os_g.fillRect(co_wx + 8, co_wy - characterobject.c4, 48, characterobject.c4);
						if (this.g_c2 >= 2 && characterobject.c4 > 8) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							this.gg.os_g.fillRect(
								co_wx + 16,
								co_wy - characterobject.c4 + 8,
								32,
								characterobject.c4 - 8
							);
						}
					}
					break;

				case 1600:
					this.gg.os_g.setColor(this.gamecolor_firebar1);
					this.gg.os_g.fillRect(co_wx, co_wy, 64, 96);
					if (this.g_c2 >= 2) {
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillRect(co_wx + 8, co_wy + 8, 48, 80);
					}
					break;

				case 1700:
					this.gg.os_g.setColor(this.gamecolor_firebar1);
					this.gg.os_g.fillRect(co_wx, co_wy, 96, 64);
					if (this.g_c2 >= 2) {
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillRect(co_wx + 8, co_wy + 8, 80, 48);
					}
					break;

				case 1800:
					this.hg.drawImage(this.hi[26], co_wx, co_wy, this.ap);
					break;

				case 1900:
					this.vo_pa_x[0] = co_wx + Math.cos(((characterobject.vy + 6) * Math.PI) / 180) * 182;
					this.vo_pa_y[0] = co_wy + Math.sin(((characterobject.vy + 6) * Math.PI) / 180) * 182;
					this.vo_pa_x[1] = co_wx + Math.cos(((characterobject.vy - 6) * Math.PI) / 180) * 182;
					this.vo_pa_y[1] = co_wy + Math.sin(((characterobject.vy - 6) * Math.PI) / 180) * 182;
					this.vo_pa_x[2] = co_wx;
					this.vo_pa_y[2] = co_wy;
					this.gg.os_g.setColor(this.gamecolor_firebar1);
					this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 3);
					this.vo_pa_x[0] = co_wx + Math.cos(((characterobject.vy + 20) * Math.PI) / 180) * 192;
					this.vo_pa_y[0] = co_wy + Math.sin(((characterobject.vy + 20) * Math.PI) / 180) * 192;
					this.vo_pa_x[1] = co_wx + Math.cos(((characterobject.vy - 20) * Math.PI) / 180) * 192;
					this.vo_pa_y[1] = co_wy + Math.sin(((characterobject.vy - 20) * Math.PI) / 180) * 192;
					this.vo_pa_x[2] = this.vo_pa_x[1] + Math.cos((characterobject.vy * Math.PI) / 180) * 12;
					this.vo_pa_y[2] = this.vo_pa_y[1] + Math.sin((characterobject.vy * Math.PI) / 180) * 12;
					this.vo_pa_x[3] = this.vo_pa_x[0] + Math.cos((characterobject.vy * Math.PI) / 180) * 12;
					this.vo_pa_y[3] = this.vo_pa_y[0] + Math.sin((characterobject.vy * Math.PI) / 180) * 12;
					this.vo_pa_x[4] = co_wx + Math.cos((characterobject.vy * Math.PI) / 180) * 12;
					this.vo_pa_y[4] = co_wy + Math.sin((characterobject.vy * Math.PI) / 180) * 12;
					this.gg.os_g.setColor(this.gamecolor_firebar2);
					this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					break;

				case 2000:
					this.vo_pa_x[0] =
						co_wx +
						Math.cos((characterobject.vy * Math.PI) / 180) * 12 +
						Math.cos(((characterobject.vy + 90) * Math.PI) / 180) * 5;
					this.vo_pa_y[0] =
						co_wy +
						Math.sin((characterobject.vy * Math.PI) / 180) * 12 +
						Math.sin(((characterobject.vy + 90) * Math.PI) / 180) * 5;
					this.vo_pa_x[1] =
						co_wx +
						Math.cos((characterobject.vy * Math.PI) / 180) * 12 +
						Math.cos(((characterobject.vy - 90) * Math.PI) / 180) * 5;
					this.vo_pa_y[1] =
						co_wy +
						Math.sin((characterobject.vy * Math.PI) / 180) * 12 +
						Math.sin(((characterobject.vy - 90) * Math.PI) / 180) * 5;
					this.vo_pa_x[2] =
						co_wx +
						Math.cos((characterobject.vy * Math.PI) / 180) * 182 +
						Math.cos(((characterobject.vy - 90) * Math.PI) / 180) * 5;
					this.vo_pa_y[2] =
						co_wy +
						Math.sin((characterobject.vy * Math.PI) / 180) * 182 +
						Math.sin(((characterobject.vy - 90) * Math.PI) / 180) * 5;
					this.vo_pa_x[3] =
						co_wx +
						Math.cos((characterobject.vy * Math.PI) / 180) * 182 +
						Math.cos(((characterobject.vy + 90) * Math.PI) / 180) * 5;
					this.vo_pa_y[3] =
						co_wy +
						Math.sin((characterobject.vy * Math.PI) / 180) * 182 +
						Math.sin(((characterobject.vy + 90) * Math.PI) / 180) * 5;
					this.gg.os_g.setColor(this.gamecolor_firebar2);
					this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					break;

				case 2100:
					this.hg.drawImage(this.hi[212], co_wx, co_wy, this.ap);
					break;

				case 2110:
					this.hg.drawImage(this.hi[213], co_wx, co_wy, this.ap);
					break;

				case 2120:
					this.hg.drawImage(this.hi[214], co_wx, co_wy, this.ap);
					break;

				case 2130:
					this.hg.drawImage(this.hi[215], co_wx, co_wy, this.ap);
					break;

				case 2200:
					this.gg.os_g.setColor(this.gamecolor_mizunohadou);
					this.gg.os_g.fillOval(co_wx + 16 - 19, co_wy + 16 - 19, 38, 38);
					this.vo_pa_x[0] = co_wx + 16 + Math.cos(((characterobject.c4 + 90) * Math.PI) / 180) * 20;
					this.vo_pa_y[0] = co_wy + 16 + Math.sin(((characterobject.c4 + 90) * Math.PI) / 180) * 20;
					this.vo_pa_x[1] = co_wx + 16 + Math.cos(((characterobject.c4 - 90) * Math.PI) / 180) * 20;
					this.vo_pa_y[1] = co_wy + 16 + Math.sin(((characterobject.c4 - 90) * Math.PI) / 180) * 20;
					this.vo_pa_x[2] =
						co_wx +
						16 +
						Math.cos((characterobject.c4 * Math.PI) / 180) * 68 +
						Math.cos(((characterobject.c4 - 90) * Math.PI) / 180) * 20;
					this.vo_pa_y[2] =
						co_wy +
						16 +
						Math.sin((characterobject.c4 * Math.PI) / 180) * 68 +
						Math.sin(((characterobject.c4 - 90) * Math.PI) / 180) * 20;
					this.vo_pa_x[3] =
						co_wx +
						16 +
						Math.cos((characterobject.c4 * Math.PI) / 180) * 68 +
						Math.cos(((characterobject.c4 + 90) * Math.PI) / 180) * 20;
					this.vo_pa_y[3] =
						co_wy +
						16 +
						Math.sin((characterobject.c4 * Math.PI) / 180) * 68 +
						Math.sin(((characterobject.c4 + 90) * Math.PI) / 180) * 20;
					this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					this.gg.os_g.setColor(this.gamecolor_firebar2);
					if (characterobject.c3 === 0 || characterobject.c3 === 1) {
						this.vo_pa_x[0] = co_wx + 16 - 6;
						this.vo_pa_y[0] = co_wy + 16 - 4;
						this.vo_pa_x[1] = co_wx + 16 + 6;
						this.vo_pa_y[1] = co_wy + 16 - 4;
						this.vo_pa_x[2] = co_wx + 16 + 12;
						this.vo_pa_y[2] = co_wy + 32 + 12;
						this.vo_pa_x[3] = co_wx + 16 - 12;
						this.vo_pa_y[3] = co_wy + 32 + 12;
					} else if (characterobject.c3 === 2) {
						this.vo_pa_x[0] = co_wx + 16 - 6;
						this.vo_pa_y[0] = co_wy + 16 + 4;
						this.vo_pa_x[1] = co_wx + 16 + 6;
						this.vo_pa_y[1] = co_wy + 16 + 4;
						this.vo_pa_x[2] = co_wx + 16 + 12;
						this.vo_pa_y[2] = co_wy - 32;
						this.vo_pa_x[3] = co_wx + 16 - 12;
						this.vo_pa_y[3] = co_wy - 32;
					} else if (characterobject.c3 === 3) {
						this.vo_pa_x[0] = co_wx + 16 - 4;
						this.vo_pa_y[0] = co_wy + 16 - 6;
						this.vo_pa_x[1] = co_wx + 16 - 4;
						this.vo_pa_y[1] = co_wy + 16 + 6;
						this.vo_pa_x[2] = co_wx + 64;
						this.vo_pa_y[2] = co_wy + 16 + 12;
						this.vo_pa_x[3] = co_wx + 64;
						this.vo_pa_y[3] = co_wy + 16 - 12;
					} else {
						this.vo_pa_x[0] = co_wx + 16 + 4;
						this.vo_pa_y[0] = co_wy + 16 - 6;
						this.vo_pa_x[1] = co_wx + 16 + 4;
						this.vo_pa_y[1] = co_wy + 16 + 6;
						this.vo_pa_x[2] = co_wx - 32;
						this.vo_pa_y[2] = co_wy + 16 + 12;
						this.vo_pa_x[3] = co_wx - 32;
						this.vo_pa_y[3] = co_wy + 16 - 12;
					}
					this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					break;

				case 2300:
					if (this.control_parts_visible === 2 && characterobject.c === 1900) {
						this.gg.os_g.setColor(Color.black);
						this.gg.os_g.fillRect(co_wx, co_wy, 32, 32);
						const str = `S ${characterobject.c3}`;
						this.gg.os_g.setColor(Color.white);
						this.gg.os_g.setFont(new Font("Dialog", 1, 12));
						this.gg.os_g.drawString(str, co_wx + 2, co_wy + this.moji_size + 4);
					}
					break;

				case 2400:
					if (characterobject.c3 === 0) {
						this.hg.dispose();
						this.hg.translate(co_wx + 32, co_wy + 64);
						this.hg.scale(characterobject.vy / 100, characterobject.vy / 100);
						if (this.g_c3 <= 3) {
							this.hg.drawImage(this.hi[76], -32, -64, this.ap);
							this.hg.drawImage(this.hi[77], 0, -64, this.ap);
							this.hg.drawImage(this.hi[86], -32, -32, this.ap);
							this.hg.drawImage(this.hi[87], 0, -32, this.ap);
						} else {
							this.hg.drawImage(this.hi[78], -32, -64, this.ap);
							this.hg.drawImage(this.hi[79], 0, -64, this.ap);
							this.hg.drawImage(this.hi[88], -32, -32, this.ap);
							this.hg.drawImage(this.hi[89], 0, -32, this.ap);
						}
						this.hg.dispose();
						break;
					}
					if (characterobject.c3 === 1) {
						this.hg.dispose();
						this.hg.translate(co_wx + 32, co_wy);
						this.hg.scale(characterobject.vy / 100, characterobject.vy / 100);
						if (this.g_c3 <= 3) {
							this.hg.drawImage(this.hi[76], -32, 0, this.ap);
							this.hg.drawImage(this.hi[77], 0, 0, this.ap);
							this.hg.drawImage(this.hi[86], -32, 32, this.ap);
							this.hg.drawImage(this.hi[87], 0, 32, this.ap);
						} else {
							this.hg.drawImage(this.hi[78], -32, 0, this.ap);
							this.hg.drawImage(this.hi[79], 0, 0, this.ap);
							this.hg.drawImage(this.hi[88], -32, 32, this.ap);
							this.hg.drawImage(this.hi[89], 0, 32, this.ap);
						}
						this.hg.dispose();
						break;
					}
					if (characterobject.c3 !== 2) break;
					this.hg.dispose();
					this.hg.translate(co_wx + 32, co_wy + 32);
					this.hg.scale(characterobject.vy / 100, characterobject.vy / 100);
					if (this.g_c3 <= 3) {
						this.hg.drawImage(this.hi[76], -32, -32, this.ap);
						this.hg.drawImage(this.hi[77], 0, -32, this.ap);
						this.hg.drawImage(this.hi[86], -32, 0, this.ap);
						this.hg.drawImage(this.hi[87], 0, 0, this.ap);
					} else {
						this.hg.drawImage(this.hi[78], -32, -32, this.ap);
						this.hg.drawImage(this.hi[79], 0, -32, this.ap);
						this.hg.drawImage(this.hi[88], -32, 0, this.ap);
						this.hg.drawImage(this.hi[89], 0, 0, this.ap);
					}
					this.hg.dispose();
					break;

				case 2500:
					this.hg.dispose();
					this.hg.translate(co_wx, co_wy);
					this.hg.scale(1.5, 1.5);
					this.hg.rotate((characterobject.vy * Math.PI) / 180, 0.0, 0.0);
					this.hg.drawImage(this.hi[183], -48, -32, this.ap);
					this.hg.drawImage(this.hi[184], -16, -32, this.ap);
					this.hg.drawImage(this.hi[185], 16, -32, this.ap);
					this.hg.drawImage(this.hi[193], -48, 0, this.ap);
					this.hg.drawImage(this.hi[194], -16, 0, this.ap);
					this.hg.drawImage(this.hi[195], 16, 0, this.ap);
					this.hg.dispose();
					break;

				case 2600:
					this.hg.dispose();
					this.hg.translate(co_wx, co_wy);
					this.hg.scale(2.5, 2.5);
					this.hg.rotate((characterobject.vy * Math.PI) / 180, 0.0, 0.0);
					this.hg.drawImage(this.hi[183], -48, -32, this.ap);
					this.hg.drawImage(this.hi[184], -16, -32, this.ap);
					this.hg.drawImage(this.hi[185], 16, -32, this.ap);
					this.hg.drawImage(this.hi[193], -48, 0, this.ap);
					this.hg.drawImage(this.hi[194], -16, 0, this.ap);
					this.hg.drawImage(this.hi[195], 16, 0, this.ap);
					this.hg.dispose();
					break;

				case 2800:
					this.gg.os_g.setColor(this.gamecolor_firebar1);
					this.hg.fillOval(co_wx - 64, co_wy - 64 + 8, 128, 128);
					if (this.g_c2 >= 2) {
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.hg.fillOval(co_wx - 20, co_wy - 20 + 8, 40, 40);
					}
					break;

				case 2900:
					var k6 = 0;
					for (var i4 = 0; i4 >= -50; i4 -= 10) {
						ai[k6] = co_wx + Math.cos(((characterobject.c3 + i4) * Math.PI) / 180) * 160;
						ai1[k6] = co_wy + Math.sin(((characterobject.c3 + i4) * Math.PI) / 180) * 160;
						k6++;
					}

					for (var j4 = -50; j4 <= 0; j4 += 10) {
						ai[k6] = co_wx + Math.cos(((characterobject.c3 + j4) * Math.PI) / 180) * 112;
						ai1[k6] = co_wy + Math.sin(((characterobject.c3 + j4) * Math.PI) / 180) * 112;
						k6++;
					}

					this.gg.os_g.setColor(this.gamecolor_firebar1);
					this.hg.fillPolygon(ai, ai1, k6);
					if (this.g_c2 < 2) break;
					k6 = 0;
					for (var k4 = -5; k4 >= -45; k4 -= 8) {
						ai[k6] = co_wx + Math.cos(((characterobject.c3 + k4) * Math.PI) / 180) * 148;
						ai1[k6] = co_wy + Math.sin(((characterobject.c3 + k4) * Math.PI) / 180) * 148;
						k6++;
					}

					for (var l4 = -45; l4 <= -5; l4 += 8) {
						ai[k6] = co_wx + Math.cos(((characterobject.c3 + l4) * Math.PI) / 180) * 124;
						ai1[k6] = co_wy + Math.sin(((characterobject.c3 + l4) * Math.PI) / 180) * 124;
						k6++;
					}

					this.gg.os_g.setColor(this.gamecolor_firebar2);
					this.hg.fillPolygon(ai, ai1, k6);
					break;

				case 2950:
					var l6 = 0;
					for (var i5 = 0; i5 >= -120; i5 -= 10) {
						ai[l6] = co_wx + Math.cos(((characterobject.c3 + i5) * Math.PI) / 180) * 160;
						ai1[l6] = co_wy + Math.sin(((characterobject.c3 + i5) * Math.PI) / 180) * 160;
						l6++;
					}

					for (var j5 = -120; j5 <= 0; j5 += 10) {
						ai[l6] = co_wx + Math.cos(((characterobject.c3 + j5) * Math.PI) / 180) * 112;
						ai1[l6] = co_wy + Math.sin(((characterobject.c3 + j5) * Math.PI) / 180) * 112;
						l6++;
					}

					this.gg.os_g.setColor(this.gamecolor_firebar1);
					this.hg.fillPolygon(ai, ai1, l6);
					if (this.g_c2 < 2) break;
					l6 = 0;
					for (var k5 = -5; k5 >= -115; k5 -= 10) {
						ai[l6] = co_wx + Math.cos(((characterobject.c3 + k5) * Math.PI) / 180) * 148;
						ai1[l6] = co_wy + Math.sin(((characterobject.c3 + k5) * Math.PI) / 180) * 148;
						l6++;
					}

					for (var l5 = -115; l5 <= -5; l5 += 10) {
						ai[l6] = co_wx + Math.cos(((characterobject.c3 + l5) * Math.PI) / 180) * 124;
						ai1[l6] = co_wy + Math.sin(((characterobject.c3 + l5) * Math.PI) / 180) * 124;
						l6++;
					}

					this.gg.os_g.setColor(this.gamecolor_firebar2);
					this.hg.fillPolygon(ai, ai1, l6);
					break;

				case 3000:
					var k11 = co_wy + 64;
					if (k11 < 320) {
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.hg.fillRect(co_wx + 120 - 20, k11, 40, 320 - k11);
					}
					break;

				case 3100:
					this.vo_pa_x[0] =
						co_wx +
						Math.cos((characterobject.vy * Math.PI) / 180) * 12 +
						Math.cos(((characterobject.vy + 90) * Math.PI) / 180) * 5;
					this.vo_pa_y[0] =
						co_wy +
						Math.sin((characterobject.vy * Math.PI) / 180) * 12 +
						Math.sin(((characterobject.vy + 90) * Math.PI) / 180) * 5;
					this.vo_pa_x[1] =
						co_wx +
						Math.cos((characterobject.vy * Math.PI) / 180) * 12 +
						Math.cos(((characterobject.vy - 90) * Math.PI) / 180) * 5;
					this.vo_pa_y[1] =
						co_wy +
						Math.sin((characterobject.vy * Math.PI) / 180) * 12 +
						Math.sin(((characterobject.vy - 90) * Math.PI) / 180) * 5;
					this.vo_pa_x[2] =
						co_wx +
						Math.cos((characterobject.vy * Math.PI) / 180) * 226 +
						Math.cos(((characterobject.vy - 90) * Math.PI) / 180) * 5;
					this.vo_pa_y[2] =
						co_wy +
						Math.sin((characterobject.vy * Math.PI) / 180) * 226 +
						Math.sin(((characterobject.vy - 90) * Math.PI) / 180) * 5;
					this.vo_pa_x[3] =
						co_wx +
						Math.cos((characterobject.vy * Math.PI) / 180) * 226 +
						Math.cos(((characterobject.vy + 90) * Math.PI) / 180) * 5;
					this.vo_pa_y[3] =
						co_wy +
						Math.sin((characterobject.vy * Math.PI) / 180) * 226 +
						Math.sin(((characterobject.vy + 90) * Math.PI) / 180) * 5;
					this.gg.os_g.setColor(this.gamecolor_firebar2);
					this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					break;

				case 3200:
					this.hg.dispose();
					this.hg.rotate(Math.PI / 2, co_wx + 16, co_wy + 16);
					this.hg.drawImage(this.hi[6], co_wx, co_wy, this.ap);
					this.hg.translate(32, 0.0);
					this.hg.drawImage(this.hi[6], co_wx, co_wy, this.ap);
					this.hg.translate(32, 0.0);
					this.hg.drawImage(this.hi[6], co_wx, co_wy, this.ap);
					this.hg.translate(32, 0.0);
					this.hg.drawImage(this.hi[6], co_wx, co_wy, this.ap);
					this.hg.dispose();
					break;

				case 3250:
					this.hg.dispose();
					this.hg.rotate(-Math.PI / 2, co_wx + 16, co_wy + 16);
					this.hg.drawImage(this.hi[6], co_wx, co_wy, this.ap);
					this.hg.translate(-32, 0.0);
					this.hg.drawImage(this.hi[6], co_wx, co_wy, this.ap);
					this.hg.translate(-32, 0.0);
					this.hg.drawImage(this.hi[6], co_wx, co_wy, this.ap);
					this.hg.translate(-32, 0.0);
					this.hg.drawImage(this.hi[6], co_wx, co_wy, this.ap);
					this.hg.dispose();
					break;

				case 3400:
					if (this.g_ac === 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
					else this.gg.os_g.setColor(this.gamecolor_grenade2);
					this.gg.os_g.fillRect(co_wx, co_wy, 96, 64);
					break;

				case 3500:
					if (characterobject.c3 !== 1 && this.control_parts_visible !== 2) {
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillRect(co_wx + 30, co_wy, 2, 128);
					}
					break;

				case 3510:
					if (characterobject.c3 !== 1 && this.control_parts_visible !== 2) {
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillRect(co_wx, co_wy, 2, 128);
					}
					break;

				case 3520:
					if (characterobject.c3 !== 1 && this.control_parts_visible !== 2) {
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillRect(co_wx, co_wy, 128, 2);
					}
					break;

				case 3530:
					if (characterobject.c3 !== 1 && this.control_parts_visible !== 2) {
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillRect(co_wx, co_wy + 30, 128, 2);
					}
					break;

				case 3600:
					this.hg.drawImage(this.gg.spt_option_img[0], co_wx, co_wy, this.ap);
					break;

				case 3700:
					this.hg.drawImage(this.gg.spt_option_img[1], co_wx, co_wy, this.ap);
					break;

				case 3710:
					this.hg.drawImage(this.gg.spt_option_img[2], co_wx, co_wy, this.ap);
					break;

				case 3800:
					if (this.g_c1 === 0) {
						this.hg.drawImage(this.hi[120], co_wx, co_wy, this.ap);
						this.hg.drawImage(this.hi[120], co_wx, co_wy + 32, this.ap);
						this.hg.drawImage(this.hi[120], co_wx, co_wy + 64, this.ap);
						this.hg.drawImage(this.hi[120], co_wx, co_wy + 96, this.ap);
					} else {
						this.hg.drawImage(this.hi[121], co_wx, co_wy, this.ap);
						this.hg.drawImage(this.hi[121], co_wx, co_wy + 32, this.ap);
						this.hg.drawImage(this.hi[121], co_wx, co_wy + 64, this.ap);
						this.hg.drawImage(this.hi[121], co_wx, co_wy + 96, this.ap);
					}
					break;

				case 3900:
					if (this.g_c1 === 0) {
						this.hg.drawImage(this.hi[120], co_wx, co_wy, this.ap);
						this.hg.drawImage(this.hi[120], co_wx + 32, co_wy, this.ap);
						this.hg.drawImage(this.hi[120], co_wx + 64, co_wy, this.ap);
						this.hg.drawImage(this.hi[120], co_wx + 96, co_wy, this.ap);
					} else {
						this.hg.drawImage(this.hi[121], co_wx, co_wy, this.ap);
						this.hg.drawImage(this.hi[121], co_wx + 32, co_wy, this.ap);
						this.hg.drawImage(this.hi[121], co_wx + 64, co_wy, this.ap);
						this.hg.drawImage(this.hi[121], co_wx + 96, co_wy, this.ap);
					}
					break;

				case 4000:
					this.vo_pa_x[0] = co_wx + Math.cos(((characterobject.vy + 5) * Math.PI) / 180) * 216;
					this.vo_pa_y[0] = co_wy + Math.sin(((characterobject.vy + 5) * Math.PI) / 180) * 216;
					this.vo_pa_x[1] = co_wx + Math.cos(((characterobject.vy - 5) * Math.PI) / 180) * 216;
					this.vo_pa_y[1] = co_wy + Math.sin(((characterobject.vy - 5) * Math.PI) / 180) * 216;
					this.vo_pa_x[2] = co_wx;
					this.vo_pa_y[2] = co_wy;
					this.gg.os_g.setColor(this.gamecolor_firebar1);
					this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 3);
					this.vo_pa_x[0] = co_wx + Math.cos(((characterobject.vy + 17) * Math.PI) / 180) * 224;
					this.vo_pa_y[0] = co_wy + Math.sin(((characterobject.vy + 17) * Math.PI) / 180) * 224;
					this.vo_pa_x[1] = co_wx + Math.cos(((characterobject.vy - 17) * Math.PI) / 180) * 224;
					this.vo_pa_y[1] = co_wy + Math.sin(((characterobject.vy - 17) * Math.PI) / 180) * 224;
					this.vo_pa_x[2] = this.vo_pa_x[1] + Math.cos((characterobject.vy * Math.PI) / 180) * 12;
					this.vo_pa_y[2] = this.vo_pa_y[1] + Math.sin((characterobject.vy * Math.PI) / 180) * 12;
					this.vo_pa_x[3] = this.vo_pa_x[0] + Math.cos((characterobject.vy * Math.PI) / 180) * 12;
					this.vo_pa_y[3] = this.vo_pa_y[0] + Math.sin((characterobject.vy * Math.PI) / 180) * 12;
					this.vo_pa_x[4] = co_wx + Math.cos((characterobject.vy * Math.PI) / 180) * 12;
					this.vo_pa_y[4] = co_wy + Math.sin((characterobject.vy * Math.PI) / 180) * 12;
					this.gg.os_g.setColor(this.gamecolor_firebar2);
					this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					break;

				case 4100:
					this.hg.drawImage(this.gg.spt_option_img[3], co_wx, co_wy, this.ap);
					break;

				case 4110:
					this.hg.drawImage(this.gg.spt_option_img[4], co_wx, co_wy, this.ap);
					break;

				case 4200:
					if (characterobject.x >= this.co_j.x) this.hg.drawImage(this.hi[37], co_wx, co_wy, this.ap);
					else this.hg.drawImage(this.hih[1][37], co_wx, co_wy, this.ap);
					break;

				case 4210:
					if (characterobject.x >= this.co_j.x) this.hg.drawImage(this.hi[38], co_wx, co_wy, this.ap);
					else this.hg.drawImage(this.hih[1][38], co_wx, co_wy, this.ap);
					break;

				case 4220:
					if (characterobject.x >= this.co_j.x) this.hg.drawImage(this.hi[39], co_wx, co_wy, this.ap);
					else this.hg.drawImage(this.hih[1][39], co_wx, co_wy, this.ap);
					break;

				case 4300:
					if (characterobject.x >= this.co_j.x) this.hg.drawImage(this.hi[167], co_wx, co_wy, this.ap);
					else this.hg.drawImage(this.hih[1][167], co_wx, co_wy, this.ap);
					break;
			}
		}
	}
};

/**
 * 土管を描画します
 * @param dokan_id 土管の種類 0がリンク土管1, 1がリンク土管2, ...
 * @param dokan_type 0:通常 1:下向き 2:左向き 3:右向き
 * @param co_wx 土管の左上の点の画面上のX座標
 * @param co_wy 土管の左上の点の画面上のY座標
 */
const drawDokan = function(dokan_id, dokan_type, co_wx, co_wy) {
	const dokan_pt = 60 + dokan_id * 2;
	// 土管の回転角度と回転の中心を算出する
	let rad = 0;
	if (dokan_type === 1) rad = Math.PI;
	else if (dokan_type === 2) rad = -Math.PI / 2;
	else if (dokan_type === 3) rad = Math.PI / 2;
	let dokan_center_wx = co_wx + 32;
	let dokan_center_wy = co_wy + 16;
	if (dokan_type === 2 || dokan_type === 3) {
		dokan_center_wx = co_wx + 16;
		dokan_center_wy = co_wy + 32;
	}
	// 土管を回転させて描画
	this.hg.dispose();
	this.hg.rotate(rad, dokan_center_wx, dokan_center_wy);
	this.hg.drawImage(this.hi[dokan_pt], dokan_center_wx - 32, dokan_center_wy - 16, this.ap);
	this.hg.drawImage(this.hi[dokan_pt + 1], dokan_center_wx, dokan_center_wy - 16, this.ap);
	this.hg.dispose();
};

/**
 * 敵の攻撃・アイテムを描画します
 */
const drawM = function() {
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	for (let i = 0; i <= 79; i++) {
		if (this.co_m[i].c < 50) continue;
		const characterobject = this.co_m[i];
		const co_wx = characterobject.x - view_x;
		const co_wy = characterobject.y - view_y;
		if (characterobject.c === 50) {
			this.hg.drawImage(this.hih[characterobject.pth][characterobject.pt], co_wx, co_wy, this.ap);
			for (let ii = 0; ii < 2; ii++) {
				const cx = characterobject.x + ii * 31;
				const cy = characterobject.y;
				const bgc = this.maps.getBGCode(cx, cy);
				if (bgc < 20) continue;
				if (this.gg.layer_mode === 2 && bgc === 29) continue;
				this.gg.drawPT(
					rightShiftIgnoreSign(cx, 5) * 32 - view_x,
					rightShiftIgnoreSign(cy, 5) * 32 - view_y,
					bgc,
					0
				);
			}
		} else if (characterobject.pt === 1000) {
			this.gg.os_g.setColor(this.gamecolor_mizunohadou);
			const radius = characterobject.c2;
			this.gg.os_g.fillOval(co_wx + 16 - radius, co_wy + 16 - radius, radius * 2, radius * 2);
		} else if (characterobject.pt === 1010) {
			this.gg.os_g.setColor(
				new Color(
					this.gamecolor_mizunohadou.getRed(),
					this.gamecolor_mizunohadou.getGreen(),
					this.gamecolor_mizunohadou.getBlue(),
					176
				)
			);
			const radius = characterobject.c2;
			this.gg.os_g.fillOval(co_wx + 16 - radius, co_wy + 16 - radius, radius * 2, radius * 2);
		} else if (characterobject.pt === 1100) {
			if (this.g_ac === 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
			else this.gg.os_g.setColor(this.gamecolor_grenade2);
			const radius = characterobject.c2;
			this.gg.os_g.fillOval(co_wx + 16 - radius, co_wy + 16 - radius, radius * 2, radius * 2);
		} else if (characterobject.pt === 1200) {
			if (this.g_ac === 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
			else this.gg.os_g.setColor(this.gamecolor_grenade2);
			const radius = characterobject.vy;
			this.gg.os_g.drawOval(co_wx + 16 - radius, co_wy + 16 - radius, radius * 2, radius * 2);
		} else if (characterobject.pt === 1210) {
			if (this.g_ac === 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
			else this.gg.os_g.setColor(this.gamecolor_grenade2);
			this.gg.os_g.fillRect(co_wx, co_wy + 11, characterobject.vx - characterobject.x + 1, 10);
		} else if (characterobject.pt === 1215) {
			if (this.g_ac === 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
			else this.gg.os_g.setColor(this.gamecolor_grenade2);
			this.gg.os_g.fillRect(
				characterobject.vx - view_x,
				co_wy + 11,
				characterobject.x - characterobject.vx + 1,
				10
			);
		} else if (characterobject.pt === 1220) {
			this.gg.os_g.setColor(this.gamecolor_grenade1);
			const radius = characterobject.vy;
			this.gg.os_g.drawOval(co_wx + 16 - radius, co_wy + 16 - radius, radius * 2, radius * 2);
		} else if (characterobject.pt === 1230) {
			this.gg.os_g.setColor(
				new Color(
					this.gamecolor_grenade1.getRed(),
					this.gamecolor_grenade1.getGreen(),
					this.gamecolor_grenade1.getBlue(),
					192
				)
			);
			this.gg.os_g.fillRect(co_wx, co_wy + 9, characterobject.vx - characterobject.x + 1, 14);
		} else if (characterobject.pt === 1235) {
			this.gg.os_g.setColor(
				new Color(
					this.gamecolor_grenade1.getRed(),
					this.gamecolor_grenade1.getGreen(),
					this.gamecolor_grenade1.getBlue(),
					192
				)
			);
			this.gg.os_g.fillRect(
				characterobject.vx - view_x,
				co_wy + 9,
				characterobject.x - characterobject.vx + 1,
				14
			);
		} else if (characterobject.pt === 1300) {
			this.hg.drawImage(this.gg.spt_option_img[0], co_wx, co_wy, this.ap);
		} else {
			this.hg.drawImage(this.hih[characterobject.pth][characterobject.pt], co_wx, co_wy, this.ap);
		}
	}
};

/**
 * 主人公を描画します
 */
export const drawGamescreenMy = function() {
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
			if (this.co_j.img !== null) {
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
			if (this.j_zan_img[index] !== null)
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
			if (this.j_cannon_c <= 0 && this.co_j.vy >= 0) this.j_zan_c = 9;
		} else {
			this.j_zan_nagasa--;
			if (this.j_zan_nagasa < 0) this.j_zan_f = false;
		}
	}
	if (this.j_muteki_c <= 0 || this.j_muteki_c % 2 !== 1) {
		// 主人公本体の描画
		if (this.co_j.img !== null) {
			this.hg.drawImage(this.co_j.img, this.co_j.wx + this.co_j.zs_x, this.co_j.wy + this.co_j.zs_y, this.ap);
		} else if (this.j_cannon_c > 0 && this.co_a[this.j_rope_id].c === 1500 && this.co_j.pt < 1000) {
			// 人間砲台に入る
			this.gg.drawPT(this.co_j.wx, this.co_j.wy, this.co_j.pt, this.co_j.muki);
			// 主人公を隠すために人間砲台を描画
			const characterobject = this.co_a[this.j_rope_id];
			const co_wx = characterobject.x - view_x;
			const co_wy = characterobject.y - view_y;
			const rad = (characterobject.c4 * Math.PI) / 180;
			this.gg.os_g.setColor(this.gamecolor_mizunohadou);
			this.gg.os_g.fillOval(co_wx + 16 - 19, co_wy + 16 - 19, 38, 38);
			this.vo_pa_x[0] = co_wx + 16 + Math.cos(rad + Math.PI / 2) * 20;
			this.vo_pa_y[0] = co_wy + 16 + Math.sin(rad + Math.PI / 2) * 20;
			this.vo_pa_x[1] = co_wx + 16 + Math.cos(rad - Math.PI / 2) * 20;
			this.vo_pa_y[1] = co_wy + 16 + Math.sin(rad - Math.PI / 2) * 20;
			this.vo_pa_x[2] = co_wx + 16 + Math.cos(rad) * 68 + Math.cos(rad - Math.PI / 2) * 20;
			this.vo_pa_y[2] = co_wy + 16 + Math.sin(rad) * 68 + Math.sin(rad - Math.PI / 2) * 20;
			this.vo_pa_x[3] = co_wx + 16 + Math.cos(rad) * 68 + Math.cos(rad + Math.PI / 2) * 20;
			this.vo_pa_y[3] = co_wy + 16 + Math.sin(rad) * 68 + Math.sin(rad + Math.PI / 2) * 20;
			this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
			this.gg.os_g.setColor(this.gamecolor_firebar2);
			if (characterobject.c3 === 0 || characterobject.c3 === 1) {
				this.vo_pa_x[0] = co_wx + 16 - 6;
				this.vo_pa_y[0] = co_wy + 16 - 4;
				this.vo_pa_x[1] = co_wx + 16 + 6;
				this.vo_pa_y[1] = co_wy + 16 - 4;
				this.vo_pa_x[2] = co_wx + 16 + 12;
				this.vo_pa_y[2] = co_wy + 32 + 12;
				this.vo_pa_x[3] = co_wx + 16 - 12;
				this.vo_pa_y[3] = co_wy + 32 + 12;
			} else if (characterobject.c3 === 2) {
				this.vo_pa_x[0] = co_wx + 16 - 6;
				this.vo_pa_y[0] = co_wy + 16 + 4;
				this.vo_pa_x[1] = co_wx + 16 + 6;
				this.vo_pa_y[1] = co_wy + 16 + 4;
				this.vo_pa_x[2] = co_wx + 16 + 12;
				this.vo_pa_y[2] = co_wy - 32;
				this.vo_pa_x[3] = co_wx + 16 - 12;
				this.vo_pa_y[3] = co_wy - 32;
			} else if (characterobject.c3 === 3) {
				this.vo_pa_x[0] = co_wx + 16 - 4;
				this.vo_pa_y[0] = co_wy + 16 - 6;
				this.vo_pa_x[1] = co_wx + 16 - 4;
				this.vo_pa_y[1] = co_wy + 16 + 6;
				this.vo_pa_x[2] = co_wx + 64;
				this.vo_pa_y[2] = co_wy + 16 + 12;
				this.vo_pa_x[3] = co_wx + 64;
				this.vo_pa_y[3] = co_wy + 16 - 12;
			} else {
				this.vo_pa_x[0] = co_wx + 16 + 4;
				this.vo_pa_y[0] = co_wy + 16 - 6;
				this.vo_pa_x[1] = co_wx + 16 + 4;
				this.vo_pa_y[1] = co_wy + 16 + 6;
				this.vo_pa_x[2] = co_wx - 32;
				this.vo_pa_y[2] = co_wy + 16 + 12;
				this.vo_pa_x[3] = co_wx - 32;
				this.vo_pa_y[3] = co_wy + 16 - 12;
			}
			this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
		} else if (this.co_j.pt < 1000) {
			this.gg.drawPT(this.co_j.wx, this.co_j.wy, this.co_j.pt, this.co_j.muki);
		} else if (this.co_j.pt === 1000) {
			// しっぽを伸ばしている
			if (this.j_tokugi === 15 && this.j_4_muki === 2) {
				this.gg.drawPT(this.co_j.wx, this.co_j.wy, 211, 0);
				this.gg.drawPT(this.co_j.wx, this.co_j.wy - 32, 210, 0);
			} else if (this.j_tokugi === 15 && this.j_4_muki === 3) {
				this.gg.drawPT(this.co_j.wx, this.co_j.wy, 105, 0);
				this.gg.drawPT(this.co_j.wx, this.co_j.wy + 32, 106, 0);
			} else if (this.co_j.muki === 0) {
				this.gg.drawPT(this.co_j.wx, this.co_j.wy, 118, this.co_j.muki);
				this.gg.drawPT(this.co_j.wx - 32, this.co_j.wy, 117, this.co_j.muki);
			} else {
				this.gg.drawPT(this.co_j.wx, this.co_j.wy, 118, 1);
				this.gg.drawPT(this.co_j.wx + 32, this.co_j.wy, 117, 1);
			}
		} else if (this.co_j.pt === 1100) {
			// 土管に入る
			// 土管の種類 0がリンク土管1, 1がリンク土管2, ...
			const dokan_id = this.co_j.c2 % 100;
			// 0:通常 1:下向き 2:左向き 3:右向き
			const dokan_type = Math.floor(this.co_j.c2 / 100);
			// 主人公を少しづつ土管に入れる
			let j_dx = 0;
			let j_dy = 0;
			// 主人公の位置を[0,32]の範囲に収める
			const j_diff = Math.max(0, Math.min(32, this.co_j.c1));
			if (dokan_type === 1) j_dy = -j_diff;
			else if (dokan_type === 2) j_dx = j_diff;
			else if (dokan_type === 3) j_dx = -j_diff;
			else j_dy = j_diff;
			// 位置をずらして主人公を描画
			this.gg.drawPT(this.co_j.wx + j_dx, this.co_j.wy + j_dy, 100, this.co_j.muki);
			// 土管の左上の点の座標を算出
			const dokan_diff = [[-16, 32], [-16, -32], [32, -16], [-32, -16]];
			const [d_dx, d_dy] = dokan_diff[dokan_type];
			const dokan_wx = this.co_j.wx + d_dx;
			const dokan_wy = this.co_j.wy + d_dy;
			// 土管を回転させて描画
			drawDokan.apply(this, [dokan_id, dokan_type, dokan_wx, dokan_wy]);
		} else if (this.co_j.pt !== 1110) {
			if (this.co_j.pt === 1200) {
				this.hg.dispose();
				if (this.co_a[this.j_rope_id].c === 3200)
					this.hg.rotate(
						((this.co_a[this.j_rope_id].vy + 90) * Math.PI) / 180,
						this.co_j.wx + 16,
						this.co_j.wy + 16
					);
				else
					this.hg.rotate(
						((this.co_a[this.j_rope_id].vy - 90) * Math.PI) / 180,
						this.co_j.wx + 16,
						this.co_j.wy + 16
					);
				this.hg.drawImage(this.hih[this.co_j.muki][210], this.co_j.wx, this.co_j.wy, this.ap);
				this.hg.dispose();
			} else if (this.co_j.pt === 1201) {
				this.hg.dispose();
				if (this.co_a[this.j_rope_id].c === 3200)
					this.hg.rotate(
						((this.co_a[this.j_rope_id].vy + 90) * Math.PI) / 180,
						this.co_j.wx + 16,
						this.co_j.wy + 16
					);
				else
					this.hg.rotate(
						((this.co_a[this.j_rope_id].vy - 90) * Math.PI) / 180,
						this.co_j.wx + 16,
						this.co_j.wy + 16
					);
				this.hg.drawImage(this.hih[this.co_j.muki][211], this.co_j.wx, this.co_j.wy, this.ap);
				this.hg.dispose();
			} else if (this.co_j.pt === 1300) {
				if (this.g_ac === 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.fillOval(this.co_j.wx - 8, this.co_j.wy - 8, 48, 48);
				this.gg.drawPT(this.co_j.wx, this.co_j.wy, 101, this.co_j.muki);
			} else if (this.co_j.pt === 1400) {
				if (this.g_ac === 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.fillOval(this.co_j.wx - 8, this.co_j.wy - 8, 48, 48);
				this.gg.drawPT(this.co_j.wx, this.co_j.wy, 83, this.co_j.muki);
			} else if (this.co_j.pt === 1500) {
				if (this.g_ac === 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.fillOval(this.co_j.wx - 8, this.co_j.wy - 8, 48, 48);
				this.gg.drawPT(this.co_j.wx, this.co_j.wy, 202, this.co_j.muki);
			}
		}
	}
};
