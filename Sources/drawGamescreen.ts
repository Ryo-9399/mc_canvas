import { Color, Font } from "./ImageBuff";
import { rightShiftIgnoreSign } from "./GlobalFunctions";

import * as drawGameScreenJSS from "./drawGamescreenJSS";
import { MainProgram } from "./MainProgram";

/**
 * ゲーム画面を描画します
 */
export const drawGamescreen = function (this: MainProgram) {
	const advance_map = this.tdb.options["advanced-map"];
    let mainLayerIndex = 0;
	let mapchipLayerIndex = this.maps.layer_count - 1;
	if (this.gg.layer_mode === 2 || this.mcs_haikei_visible === 1) {
		// 背景レイヤーを使用している、または背景画像を使用している時にマップチップの描画
		if (advance_map) {
			// 背景画像を描画
			this.maps.drawMapLayer(this.maps.wx, this.maps.wy, this.g_ac2, this.gazou_scroll, 2);
			// レイヤーを逆順にループ
			const layers = advance_map.stages[this.stage - 1].layers;
			for (let i = layers.length - 1; i >= 0; i--) {
				const layer = layers[i];
				if (layer.type === "mapchip") {
					// mainレイヤーより背面のmapchipレイヤーを描画
					this.maps.drawMapLayer(this.maps.wx, this.maps.wy, this.g_ac2, this.gazou_scroll, 3, mapchipLayerIndex--);
				} else if (layer.type === "main") {
					// mainレイヤーを描画
					this.maps.drawMapLayer(this.maps.wx, this.maps.wy, this.g_ac2, this.gazou_scroll, 4);
					mainLayerIndex = i;
					break;
				}
			}
		}
		else{
			this.maps.drawMapLayer(this.maps.wx, this.maps.wy, this.g_ac2, this.gazou_scroll, 1);
		}
	} else if (this.setmapc_f) {
		// MasaoJSS#setMapchipを使ったときに標準レイヤーの描画
		this.setmapc_f = false;
		this.maps.drawMap(this.maps.wx, this.maps.wy);
	} else {
		// 上記以外の時に標準レイヤーの描画
		this.maps.drawMapScroll(this.g_ac2);
	}
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	this.co_j.wx = this.co_j.x - view_x;
	this.co_j.wy = this.co_j.y - view_y;

	// ロードランナーで掘った穴の描画
	if (this.ana_kazu > 0) drawGameScreenJSS.drawAna.apply(this);

	// 左右へ押せるドッスンスンのゴールの描画
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
	// 仕掛けの描画
	if (this.a_hf) drawGameScreenJSS.drawA.apply(this);

	// 自作床の描画
	if (this.yuka_id_max >= 0) this.drawYuka();
	// 敵の攻撃・アイテムの描画
	if (this.m_kazu > 0) drawGameScreenJSS.drawM.apply(this);
	// 主人公の攻撃の描画
	if (this.jm_kazu > 0) drawGameScreenJSS.drawMyAttack.apply(this);
	if (this.j_tokugi === 14) {
		for (let i = 0; i <= 1; i++)
			if (this.co_mu[i].c >= 50)
				this.hg.drawImage(this.hih[1][105 + this.g_ac], this.co_mu[i].x - view_x, this.co_mu[i].y - view_y, this.ap);
	}
	// 敵の描画
	if (this.system_draw_mode < 3) drawGameScreenJSS.drawGamescreenEnemy.apply(this);
	// ボスの描画
	drawGameScreenJSS.drawBoss.apply(this);

	// 主人公の描画
	if (this.system_draw_mode < 2) drawGameScreenJSS.drawGamescreenMy.apply(this);
	if (this.j_muteki_c > 0) this.j_muteki_c--;

	if (this.gg.layer_mode === 2 && advance_map && mainLayerIndex > 0) {
		// mainレイヤーより前面のmapchipレイヤーを描画
		const layers = advance_map.stages[this.stage - 1].layers;
		for (let i = mainLayerIndex - 1; i >= 0; i--) {
			const layer = layers[i];
			if (layer.type === "mapchip") {
				this.maps.drawMapLayer(this.maps.wx, this.maps.wy, this.g_ac2, this.gazou_scroll, 3, mapchipLayerIndex--);
			}
		}
	}

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
		if (this.showi_img) {
			// TODO: this.hg.drawImageの第四引数は単に無視されるはずでは？プログラムの意図がわからないので要調査
			if (this.gg.ap !== null) this.hg.drawImage(this.showi_img, this.showi_x, this.showi_y, this.gg.ap);
			else this.hg.drawImage(this.showi_img, this.showi_x, this.showi_y, this.gg.oya);
		}
	}
	// TODO: 描画関数でカウンタ更新やめろ
	if (this.showr_c > 0) this.showr_c--;
	if (this.showo_c > 0) this.showo_c--;
	if (this.showi_c > 0) this.showi_c--;

	// セカンド画像を主人公の手前に描画
	if (this.second_gazou_visible && this.second_gazou_priority === 2 && this.second_gazou_img !== null) {
		this.maps.drawSecondImage(0, 0, true);
	}
	// ゲージを表示
	if (this.gauge_v) drawGameScreenJSS.drawHPGauge.apply(this);
	// スポット処理
	drawGameScreenJSS.drawSpot.apply(this);
	// 一言メッセージ
	if (this.hitokoto_c === 0) this.hitokoto_c = -1;
	else if (this.hitokoto_c > 0) {
		this.hitokoto_c--;
		drawGameScreenJSS.drawHitokotoMessage.apply(this);
	}
	// お店やアイテムをくれる人などのメッセージウィンドウ
	this.km.drawMenus();
};