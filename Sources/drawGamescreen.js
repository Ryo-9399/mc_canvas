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
							this.hg.setColor(this.gamecolor_firebar1);
							this.hg.drawRect(co_wx, co_wy, 95, 63);
							this.hg.drawLine(co_wx, co_wy, co_wx + 95, co_wy + 63);
							this.hg.drawLine(co_wx, co_wy + 63, co_wx + 95, co_wy);
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
		drawGameScreenJSS.drawM.apply(this);
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
		drawGameScreenJSS.drawGamescreenMy.apply(this);
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
	// セカンド画像を主人公の手前に描画
	// TODO:MapSystem.prototype.drawMapLayerに同じような処理があるのでそっちに統合

	if (this.second_gazou_visible && this.second_gazou_priority === 2 && this.second_gazou_img !== null) {
		const draw = (x, y) => {
			this.hg.drawImage(this.second_gazou_img, x, y);
		};
		// [x方向の繰り返し回数, y方向の繰り返し回数]
		let repeat_times = [1, 1];
		let scroll_x = 0;
		let scroll_y = 0;
		let image_width = this.gg.di.width;
		let image_height = this.gg.di.height;
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
			if (this.maps.second_gazou_x < -this.gg.di.width) this.maps.second_gazou_x += this.gg.di.width;
			if (this.maps.second_gazou_x > 0) this.maps.second_gazou_x -= this.gg.di.width;
			if (this.maps.second_gazou_y < -this.gg.di.height) this.maps.second_gazou_y += this.gg.di.height;
			if (this.maps.second_gazou_y > 0) this.maps.second_gazou_y -= this.gg.di.height;
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
			if (scroll_x >= this.gg.di.width || scroll_y >= this.gg.di.height) {
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
					// 乗れるカイオール 左向き
					drawWide(188, 2, 2, co_wx, co_wy);
					break;

				case 605:
					// 乗れるカイオール 右向き
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
					// 左へ飛ばすバネ
					const pt = characterobject.c3 > 0 ? 32 : 33;
					this.hg.dispose();
					this.hg.rotate(-Math.PI / 2, co_wx + 16, co_wy + 16);
					this.hg.drawImage(this.hi[pt], co_wx, co_wy, this.ap);
					this.hg.dispose();
					break;
				}

				case 751: {
					// 右へ飛ばすバネ
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
					this.hg.setColor(this.gamecolor_firebar1);
					this.hg.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					if (this.g_c2 >= 2) {
						// 内側の色を描画
						this.hg.setColor(this.gamecolor_firebar2);
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
						this.hg.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
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
					this.hg.setColor(this.gamecolor_firebar2);
					this.hg.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					this.vo_pa_x[0] = co_wx;
					this.vo_pa_y[0] = co_wy;
					this.vo_pa_x[1] = co_wx - 16;
					this.vo_pa_y[1] = co_wy + 128;
					this.vo_pa_x[2] = co_wx + 16;
					this.vo_pa_y[2] = co_wy + 128;
					this.hg.setColor(this.gamecolor_firebar1);
					this.hg.fillPolygon(this.vo_pa_x, this.vo_pa_y, 3);
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
					this.hg.setColor(this.gamecolor_firebar1);
					this.hg.drawLine(this.vo_pa_x[4], this.vo_pa_y[4], co_wx + dx, co_wy + dy);
					this.hg.drawLine(this.vo_pa_x[0], this.vo_pa_y[0], co_wx + dx, co_wy + dy);
					this.hg.drawLine(this.vo_pa_x[1], this.vo_pa_y[1], co_wx + dx, co_wy + dy);
					this.hg.setColor(this.gamecolor_firebar2);
					this.hg.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
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
					this.hg.setColor(this.gamecolor_firebar2);
					this.hg.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					break;
				}

				case 1500:
					// TODO: ファイヤーウォール
					if (characterobject.c4 <= 0) break;
					this.hg.setColor(this.gamecolor_firebar1);
					// 0:通常 1:下向き 2:左向き 3:右向き
					if (characterobject.c3 === 1 || characterobject.c3 === 11) {
						this.hg.fillRect(co_wx + 8, co_wy, 48, characterobject.c4);
						if (this.g_c2 >= 2 && characterobject.c4 > 8) {
							this.hg.setColor(this.gamecolor_firebar2);
							this.hg.fillRect(co_wx + 16, co_wy, 32, characterobject.c4 - 8);
						}
					} else if (characterobject.c3 === 2 || characterobject.c3 === 12) {
						this.hg.fillRect(co_wx - characterobject.c4, co_wy + 8, characterobject.c4, 48);
						if (this.g_c2 >= 2 && characterobject.c4 > 8) {
							this.hg.setColor(this.gamecolor_firebar2);
							this.hg.fillRect(co_wx - characterobject.c4 + 8, co_wy + 16, characterobject.c4 - 8, 32);
						}
					} else if (characterobject.c3 === 3 || characterobject.c3 === 13) {
						this.hg.fillRect(co_wx, co_wy + 8, characterobject.c4, 48);
						if (this.g_c2 >= 2 && characterobject.c4 > 8) {
							this.hg.setColor(this.gamecolor_firebar2);
							this.hg.fillRect(co_wx, co_wy + 16, characterobject.c4 - 8, 32);
						}
					} else {
						this.hg.fillRect(co_wx + 8, co_wy - characterobject.c4, 48, characterobject.c4);
						if (this.g_c2 >= 2 && characterobject.c4 > 8) {
							this.hg.setColor(this.gamecolor_firebar2);
							this.hg.fillRect(co_wx + 16, co_wy - characterobject.c4 + 8, 32, characterobject.c4 - 8);
						}
					}
					break;

				case 1600:
					// ファイヤーウォール 壁まで上下
					this.hg.setColor(this.gamecolor_firebar1);
					this.hg.fillRect(co_wx, co_wy, 64, 96);
					if (this.g_c2 >= 2) {
						this.hg.setColor(this.gamecolor_firebar2);
						this.hg.fillRect(co_wx + 8, co_wy + 8, 48, 80);
					}
					break;

				case 1700:
					// ファイヤーウォール 壁まで左右
					this.hg.setColor(this.gamecolor_firebar1);
					this.hg.fillRect(co_wx, co_wy, 96, 64);
					if (this.g_c2 >= 2) {
						this.hg.setColor(this.gamecolor_firebar2);
						this.hg.fillRect(co_wx + 8, co_wy + 8, 80, 48);
					}
					break;

				case 1800:
					// 火山
					this.hg.drawImage(this.hi[26], co_wx, co_wy, this.ap);
					break;

				case 1900:
					// 動くＴ字型
					this.vo_pa_x[0] = co_wx + Math.cos(((characterobject.vy + 6) * Math.PI) / 180) * 182;
					this.vo_pa_y[0] = co_wy + Math.sin(((characterobject.vy + 6) * Math.PI) / 180) * 182;
					this.vo_pa_x[1] = co_wx + Math.cos(((characterobject.vy - 6) * Math.PI) / 180) * 182;
					this.vo_pa_y[1] = co_wy + Math.sin(((characterobject.vy - 6) * Math.PI) / 180) * 182;
					this.vo_pa_x[2] = co_wx;
					this.vo_pa_y[2] = co_wy;
					this.hg.setColor(this.gamecolor_firebar1);
					this.hg.fillPolygon(this.vo_pa_x, this.vo_pa_y, 3);
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
					this.hg.setColor(this.gamecolor_firebar2);
					this.hg.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					break;

				case 2000:
					// ロープ
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
					this.hg.setColor(this.gamecolor_firebar2);
					this.hg.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					break;

				case 2100:
					// 得点で開く扉
					this.hg.drawImage(this.hi[212], co_wx, co_wy, this.ap);
					break;

				case 2110:
					// コインを全部取ると開く扉
					this.hg.drawImage(this.hi[213], co_wx, co_wy, this.ap);
					break;

				case 2120:
					// 周囲１０パーツ以内のコインを全部取ると開く扉
					this.hg.drawImage(this.hi[214], co_wx, co_wy, this.ap);
					break;

				case 2130:
					// 左１５パーツ以内の雑魚敵を全部倒すと開く扉
					this.hg.drawImage(this.hi[215], co_wx, co_wy, this.ap);
					break;

				case 2200:
					// 人間大砲
					this.hg.setColor(this.gamecolor_mizunohadou);
					this.hg.fillOval(co_wx + 16 - 19, co_wy + 16 - 19, 38, 38);
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
					this.hg.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					this.hg.setColor(this.gamecolor_firebar2);
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
					this.hg.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					break;

				case 2300:
					// スクロール制御パーツを表示
					if (this.control_parts_visible === 2 && characterobject.c === 1900) {
						this.hg.setColor(Color.black);
						this.hg.fillRect(co_wx, co_wy, 32, 32);
						const str = `S ${characterobject.c3}`;
						this.hg.setColor(Color.white);
						this.hg.setFont(new Font(Font.DIALOG, 1, 12));
						this.hg.drawString(str, co_wx + 2, co_wy + this.moji_size + 4);
					}
					break;

				case 2400:
					// 人食いワカメ
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
					// 回転するドッスンスン
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
					// 回転する巨大ドッスンスン
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
					// 人口太陽
					this.hg.setColor(this.gamecolor_firebar1);
					this.hg.fillOval(co_wx - 64, co_wy - 64 + 8, 128, 128);
					if (this.g_c2 >= 2) {
						this.hg.setColor(this.gamecolor_firebar2);
						this.hg.fillOval(co_wx - 20, co_wy - 20 + 8, 40, 40);
					}
					break;

				case 2900:
					// ファイヤーリング
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

					this.hg.setColor(this.gamecolor_firebar1);
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

					this.hg.setColor(this.gamecolor_firebar2);
					this.hg.fillPolygon(ai, ai1, k6);
					break;

				case 2950:
					// ファイヤーリング２本
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

					this.hg.setColor(this.gamecolor_firebar1);
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

					this.hg.setColor(this.gamecolor_firebar2);
					this.hg.fillPolygon(ai, ai1, l6);
					break;

				case 3000:
					// 上下移動する半円の棒
					var k11 = co_wy + 64;
					if (k11 < 320) {
						this.hg.setColor(this.gamecolor_firebar1);
						this.hg.fillRect(co_wx + 120 - 20, k11, 40, 320 - k11);
					}
					break;

				case 3100:
					// 長いロープ　または　ゆれる棒
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
					this.hg.setColor(this.gamecolor_firebar2);
					this.hg.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					break;

				case 3200:
					// 左向きのトゲ４つ
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
					// 右向きのトゲ４つ
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
					// 押せるドッスンスンがゴールに達した
					if (this.g_ac === 0) this.hg.setColor(this.gamecolor_grenade1);
					else this.hg.setColor(this.gamecolor_grenade2);
					this.hg.fillRect(co_wx, co_wy, 96, 64);
					break;

				case 3500:
					// 右へ一方通行
					if (characterobject.c3 !== 1 && this.control_parts_visible !== 2) {
						this.hg.setColor(this.gamecolor_firebar2);
						this.hg.fillRect(co_wx + 30, co_wy, 2, 128);
					}
					break;

				case 3510:
					// 左へ一方通行
					if (characterobject.c3 !== 1 && this.control_parts_visible !== 2) {
						this.hg.setColor(this.gamecolor_firebar2);
						this.hg.fillRect(co_wx, co_wy, 2, 128);
					}
					break;

				case 3520:
					// 上へ一方通行
					if (characterobject.c3 !== 1 && this.control_parts_visible !== 2) {
						this.hg.setColor(this.gamecolor_firebar2);
						this.hg.fillRect(co_wx, co_wy, 128, 2);
					}
					break;

				case 3530:
					// 下へ一方通行
					if (characterobject.c3 !== 1 && this.control_parts_visible !== 2) {
						this.hg.setColor(this.gamecolor_firebar2);
						this.hg.fillRect(co_wx, co_wy + 30, 128, 2);
					}
					break;

				case 3600:
					// コンティニュー
					this.hg.drawImage(this.gg.spt_option_img[0], co_wx, co_wy, this.ap);
					break;

				case 3700:
					// スイッチ OFF
					this.hg.drawImage(this.gg.spt_option_img[1], co_wx, co_wy, this.ap);
					break;

				case 3710:
					// スイッチ ON
					this.hg.drawImage(this.gg.spt_option_img[2], co_wx, co_wy, this.ap);
					break;

				case 3800:
					// スイッチ式電撃バリア縦
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
					// スイッチ式電撃バリア横
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
					// スイッチ式動くＴ字型
					this.vo_pa_x[0] = co_wx + Math.cos(((characterobject.vy + 5) * Math.PI) / 180) * 216;
					this.vo_pa_y[0] = co_wy + Math.sin(((characterobject.vy + 5) * Math.PI) / 180) * 216;
					this.vo_pa_x[1] = co_wx + Math.cos(((characterobject.vy - 5) * Math.PI) / 180) * 216;
					this.vo_pa_y[1] = co_wy + Math.sin(((characterobject.vy - 5) * Math.PI) / 180) * 216;
					this.vo_pa_x[2] = co_wx;
					this.vo_pa_y[2] = co_wy;
					this.hg.setColor(this.gamecolor_firebar1);
					this.hg.fillPolygon(this.vo_pa_x, this.vo_pa_y, 3);
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
					this.hg.setColor(this.gamecolor_firebar2);
					this.hg.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
					break;

				case 4100:
					// ＫＥＹ１
					this.hg.drawImage(this.gg.spt_option_img[3], co_wx, co_wy, this.ap);
					break;

				case 4110:
					// ＫＥＹ２
					this.hg.drawImage(this.gg.spt_option_img[4], co_wx, co_wy, this.ap);
					break;

				case 4200:
					// ＫＥＹ１が３つでＯＮの動作の人
					if (characterobject.x >= this.co_j.x) this.hg.drawImage(this.hi[37], co_wx, co_wy, this.ap);
					else this.hg.drawImage(this.hih[1][37], co_wx, co_wy, this.ap);
					break;

				case 4210:
					// ＫＥＹ２が３つでＯＮの動作の人
					if (characterobject.x >= this.co_j.x) this.hg.drawImage(this.hi[38], co_wx, co_wy, this.ap);
					else this.hg.drawImage(this.hih[1][38], co_wx, co_wy, this.ap);
					break;

				case 4220:
					// 得点でグレネードを売る人
					if (characterobject.x >= this.co_j.x) this.hg.drawImage(this.hi[39], co_wx, co_wy, this.ap);
					else this.hg.drawImage(this.hih[1][39], co_wx, co_wy, this.ap);
					break;

				case 4300:
					// しっぽで破壊 ＯＮの動作
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
