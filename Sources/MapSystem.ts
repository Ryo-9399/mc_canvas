import { createNDimensionArray, rightShiftIgnoreSign } from "./GlobalFunctions";
import { Color, ImageBuff } from "./ImageBuff";
import { GameGraphicsForApplet } from "./GameGraphicsForApplet";
import { MainProgram } from "./MainProgram";

class MapSystem {
	width: number;
	height: number;
	gg: GameGraphicsForApplet;
	mp: MainProgram;
	map_bg: number[][];
	map_bg_layer: number[][];
	map_string: string[];
	map_string_layer: string[];
	wx: number;
	wy: number;
	wx_mini: number;
	wy_mini: number;
	wx_max: number;
	wy_max: number;
	os2_wx: number;
	os2_wy: number;
	hi: ImageBuff[];
	gazou_x: number;
	gazou_y: number;
	second_gazou_x: number;
	second_gazou_y: number;

	constructor(width: number, height: number, gamegraphics: GameGraphicsForApplet, mainprogram: MainProgram) {
		this.width = width;
		this.height = height;
		this.gg = gamegraphics;
		this.mp = mainprogram;
		this.map_bg = createNDimensionArray(this.width, this.height);
		this.map_bg_layer = createNDimensionArray(this.width, this.height);
		this.map_string = new Array(this.height);
		this.map_string_layer = new Array(this.height);
		this.wx = 0;
		this.wy = 0;
		this.wx_mini = 0;
		this.wy_mini = 0;
		this.wx_max = 0;
		this.wy_max = 0;
		this.os2_wx = 0;
		this.os2_wy = 0;
		this.hi = this.gg.spt_img[0];
		this.gazou_x = 0;
		this.gazou_y = 0;
		this.second_gazou_x = 0;
		this.second_gazou_y = 0;
		this.init();
	}

	/**
	 * マップデータを初期化する
	 */
	init() {
		this.wx = 0;
		this.wy = 0;
		this.os2_wx = 0;
		this.os2_wy = 0;
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				this.map_bg[x][y] = 0;
				this.map_bg_layer[x][y] = 0;
			}
		}
		const bg_space = ".".repeat(this.width + 1);
		for (let y = 0; y < this.height; y++) {
			this.map_string[y] = bg_space;
			this.map_string_layer[y] = bg_space.repeat(2);
		}
	}

	/**
	 * TODO: 要調査
	 */
	setBank(mode: number) {
		let dest = 30;
		if (mode === 1) dest = 40;
		else if (mode === 2) dest = 50;
		else if (mode === 4) dest = 60;
		this.gg.spt_img[0][8] = this.gg.spt_img[0][0]; // 人面星のベース画像を消去 drawMapLayer()の内部処理に影響
		this.gg.spt_img[0][31] = this.gg.spt_img[0][0];
		for (let i = 0; i <= 7; i++) {
			this.gg.spt_img[0][10 + i] = this.gg.spt_img[0][dest + i];
		}
	}

	/**
	 * 画面上にマップを描画する
	 * @param {number} view_x 画面に描画される範囲の左上のX座標
	 * @param {number} view_y 画面に描画される範囲の左上のY座標
	 */
	drawMap(view_x: number, view_y: number) {
		this.wx = view_x;
		this.wy = view_y;
		const xmod = this.wx % 32;
		const ymod = this.wy % 32;
		this.os2_wx = rightShiftIgnoreSign(this.wx, 5);
		this.os2_wy = rightShiftIgnoreSign(this.wy, 5);
		this.gg.fill2();
		for (let ny = 0; ny <= 10; ny++) {
			for (let nx = 0; nx <= 16; nx++) {
				if (this.map_bg[this.os2_wx + nx][this.os2_wy + ny] > 0) {
					this.gg.drawPT2(32 + nx * 32, 32 + ny * 32, this.map_bg[this.os2_wx + nx][this.os2_wy + ny]);
				}
			}
		}
		this.gg.os_g.drawImage(this.gg.os2_img, -32 - xmod, -32 - ymod);
	}

	/**
	 * マップや背景レイヤー、背景画像を描画する
	 * @param {number} view_x 画面に描画される範囲の左上のX座標
	 * @param {number} view_y 画面に描画される範囲の左上のY座標
	 * @param {number} g_ac2 コインなどのアニメーションに使用するカウンター
	 * @param {number} gazou_scroll 背景画像のスクロール設定
	 * @param {number} mode 何を描画するかを指定する 1:すべて描画 2:背景のみ 3:背景レイヤーのみ 4:マップのみ
	 */
	drawMapLayer(view_x: number, view_y: number, g_ac2: number, gazou_scroll: number, mode: number) {
		this.wx = view_x;
		this.wy = view_y;
		const xmod = this.wx % 32;
		const ymod = this.wy % 32;
		this.os2_wx = rightShiftIgnoreSign(this.wx, 5);
		this.os2_wy = rightShiftIgnoreSign(this.wy, 5);
		if (mode === 3 || mode === 4) {
			// 背景画像を描画しない
			this.gg.os2_g.drawImage(this.gg.os_img, 32 + xmod, 32 + ymod);
		} else {
			// 背景画像を描画する
			this.gg.fill2();

			// セカンド画像の描画
			if (this.mp.second_gazou_visible && this.mp.second_gazou_priority === 1 && this.mp.second_gazou_img != null) {
				const draw = (x: number, y: number) => {
					// 裏画面にセカンド画像を描画する際、スクロールに応じて描画位置をずらす
					this.gg.os2_g.drawImage(this.mp.second_gazou_img!, x + xmod + 32, y + ymod + 32);
				};
				// [x方向の繰り返し回数, y方向の繰り返し回数]
				let repeat_times = [1, 1];
				let scroll_x = 0;
				let scroll_y = 0;
				let image_width = 512;
				let image_height = 320;
				if (this.mp.second_gazou_scroll === 2) {
					// 左右スクロール  速度１／４
					scroll_x = -(rightShiftIgnoreSign(this.wx - 32, 2) % image_width);
					repeat_times[0] = 2;
				} else if (this.mp.second_gazou_scroll === 3) {
					// 左右スクロール  速度１／２
					scroll_x = -(rightShiftIgnoreSign(this.wx - 32, 1) % image_width);
					repeat_times[0] = 2;
				} else if (this.mp.second_gazou_scroll === 4) {
					// 指定速度で強制スクロール
					this.second_gazou_x += this.mp.second_gazou_scroll_speed_x;
					this.second_gazou_y += this.mp.second_gazou_scroll_speed_y;
					if (this.second_gazou_x < -512) this.second_gazou_x += 512;
					if (this.second_gazou_x > 0) this.second_gazou_x -= 512;
					if (this.second_gazou_y < -320) this.second_gazou_y += 320;
					if (this.second_gazou_y > 0) this.second_gazou_y -= 320;
					scroll_x = this.second_gazou_x;
					scroll_y = this.second_gazou_y;
					repeat_times = [2, 2];
				} else if (this.mp.second_gazou_scroll === 5) {
					// 左右スクロール  速度３／２
					scroll_x = -(rightShiftIgnoreSign((this.wx - 32) * 3, 1) % image_width);
					repeat_times[0] = 2;
				} else if (this.mp.second_gazou_scroll === 6) {
					// 画像サイズ  ５１２×９６０
					image_height = 960;
					scroll_x = -(rightShiftIgnoreSign((this.wx - 32) * 3, 1) % image_width);
					scroll_y = -(this.wy - 320);
					repeat_times[0] = 2;
				} else if (this.mp.second_gazou_scroll === 7) {
					// マップと同じ速度で全方向
					scroll_x = -((this.wx - 32) % image_width);
					scroll_y = -((this.wy - 320) % image_height);
					repeat_times = [2, 2];
				} else if (this.mp.second_gazou_scroll === 8) {
					// マップの指定座標に設置  画像サイズは任意
					scroll_x = this.mp.second_gazou_scroll_x + 32 - this.wx;
					scroll_y = this.mp.second_gazou_scroll_y + 320 - this.wy;
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

			// 背景画像の描画
			const background_image = this.mp.setbacki_f ? this.mp.setbacki_img : this.gg.li[3 + this.mp.stage_haikei];
			if (background_image != null) {
				const draw = (x: number, y: number) => {
					// 裏画面に背景画像を描画する際、スクロールに応じて描画位置をずらす
					this.gg.os2_g.drawImage(background_image, x + xmod + 32, y + ymod + 32);
				};
				// [x方向の繰り返し回数, y方向の繰り返し回数]
				let repeat_times = [1, 1];
				let scroll_x = 0;
				let scroll_y = 0;
				let image_width = 512;
				let image_height = 320;
				if (gazou_scroll === 2) {
					// 左右スクロール（速度はマップの１／４）
					scroll_x = -(rightShiftIgnoreSign(this.wx - 32, 2) % image_width);
					repeat_times[0] = 2;
				} else if (gazou_scroll === 3) {
					// 右へ強制スクロール
					this.gazou_x -= 2;
					if (this.gazou_x <= -512) this.gazou_x += 512;
					scroll_x = this.gazou_x;
					repeat_times[0] = 2;
				} else if (gazou_scroll === 4) {
					// 指定速度で強制スクロール
					this.gazou_x += this.mp.gazou_scroll_speed_x;
					this.gazou_y += this.mp.gazou_scroll_speed_y;
					if (this.gazou_x < -512) this.gazou_x += 512;
					if (this.gazou_x > 0) this.gazou_x -= 512;
					if (this.gazou_y < -320) this.gazou_y += 320;
					if (this.gazou_y > 0) this.gazou_y -= 320;
					scroll_x = this.gazou_x;
					scroll_y = this.gazou_y;
					repeat_times = [2, 2];
				} else if (gazou_scroll === 5) {
					// 上下スクロール
					scroll_x = -(rightShiftIgnoreSign(this.wy - 320, 1) % image_height);
					repeat_times[1] = 2;
				} else if (gazou_scroll === 6) {
					// 全方向スクロール（速度はマップの１／２）
					scroll_x = -(rightShiftIgnoreSign(this.wx - 32, 1) % image_width);
					scroll_y = -(rightShiftIgnoreSign(this.wy - 320, 1) % image_height);
					repeat_times = [2, 2];
				} else if (gazou_scroll === 7) {
					// 全方向スクロール（速度はマップと同じ）
					scroll_x = -((this.wx - 32) % image_width);
					scroll_y = -((this.wy - 320) % image_height);
					repeat_times = [2, 2];
				} else if (gazou_scroll === 8) {
					// 画像サイズ    ５１２×６４０専用
					image_height = 640;
					scroll_x = -(rightShiftIgnoreSign(this.wx - 32, 1) % image_width);
					scroll_y = -(rightShiftIgnoreSign(this.wy - 320, 1) % image_height);
					repeat_times[0] = 2;
				} else if (gazou_scroll === 9) {
					// 画像サイズ  １０２４×６４０専用
					image_width = 1024;
					image_height = 640;
					scroll_x = -(rightShiftIgnoreSign(this.wx - 32, 1) % image_width);
					scroll_y = -(rightShiftIgnoreSign(this.wy - 320, 1) % image_height);
					repeat_times[0] = 2;
				} else if (gazou_scroll === 10) {
					// 左右スクロール（速度はマップの１／２）
					scroll_x = -(rightShiftIgnoreSign(this.wx - 32, 1) % image_width);
					repeat_times[0] = 2;
				} else if (gazou_scroll === 11) {
					// マップの指定座標に設置  画像サイズは任意
					scroll_x = this.mp.gazou_scroll_x + 32 - this.wx;
					scroll_y = this.mp.gazou_scroll_y + 320 - this.wy;
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
		}
		if (mode === 2) {
			// 背景のみを描画する
			this.gg.os_g.drawImage(this.gg.os2_img, -32 - xmod, -32 - ymod);
			return;
		}
		if (mode !== 4 && this.gg.layer_mode === 2) {
			// 背景レイヤーを描画する
			for (let j = 0; j <= 10; j++) {
				for (let i = 0; i <= 16; i++) {
					const layer_code = this.map_bg_layer[this.os2_wx + i][this.os2_wy + j];
					if (layer_code > 0 && layer_code < 255) {
						this.gg.drawMapchip2(32 + i * 32, 32 + j * 32, layer_code);
					}
				}
			}
		}
		if (mode !== 3) {
			const is_water_visible = this.mp.water_visible === 2 && this.gg.layer_mode !== 2;
			// マップ上の特別なブロックの見た目を調整する
			// TODO: clear_typeが3の場合の水の描画処理にバグがあるためあとで直す
			for (let i = 0; i <= 10; i++) {
				for (let j = 0; j <= 16; j++) {
					const nx = this.os2_wx + j;
					const ny = this.os2_wy + i;
					let pt = this.map_bg[nx][ny];
					// レイヤーを表示する場合
					// はしご、坂道、下から通れる床、緑色のブロック、水を表示しない
					// ただしクリア条件が脱出ハシゴの場合、ハシゴ、坂道、下から通れる床を表示する
					// 水を常に表示する設定の場合は水を表示する
					if (this.gg.layer_mode === 2) {
						if (pt === 4 && this.mp.water_visible !== 2) pt = 0;
						else if (pt === 29) pt = 0;
						else if (this.mp.clear_type !== 3 && (pt === 15 || pt === 10 || pt === 18 || pt === 19)) pt = 0;
					} else if (this.mp.clear_type === 3 && (pt === 29 || pt === 4)) {
						pt = 0;
					}

					switch (pt) {
						case 7:
							// ろうそく
							pt = 96 + (g_ac2 % 2);
							break;
						case 9:
							// コイン
							pt = 90 + g_ac2;
							if (is_water_visible && this.map_bg[nx - 1][ny] === 4) {
								this.gg.drawPT2(32 + j * 32, 32 + i * 32, 4);
							}
							break;
						case 8:
							// 人面星
							const is_millennium = this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max;
							const is_apparent = (this.mp.clear_type !== 2 && this.mp.clear_type !== 3) || this.mp.coin_kazu <= 0;
							if (is_apparent) {
								pt = 94;
								if (is_millennium) pt = 98;
								if (g_ac2 >= 2) pt += 1;
								if (is_water_visible && this.map_bg[nx - 1][ny] === 4) {
									this.gg.drawPT2(32 + j * 32, 32 + i * 32, 4);
								}
							}
							break;
						case 10:
							// ハシゴ
							if (this.map_bg[nx - 1][ny] === 4) {
								this.gg.drawPT2(32 + j * 32, 32 + i * 32, 4);
							}
							break;
						case 18:
							// 上り坂
							if (this.mp.map_data_option[nx][ny]) {
								pt = 0;
								this.gg.os2_g.setColor(Color.white);
								this.gg.os2_g.drawLine(32 + j * 32, 32 + i * 32 + 31, 32 + j * 32 + 31, 32 + i * 32);
							} else if (this.map_bg[nx][ny - 1] === 4) {
								this.gg.drawPT2(32 + j * 32, 32 + i * 32, 4);
							}
							break;
						case 19:
							// 下り坂
							if (this.mp.map_data_option[nx][ny]) {
								this.gg.os2_g.setColor(Color.white);
								this.gg.os2_g.drawLine(32 + j * 32, 32 + i * 32, 32 + j * 32 + 31, 32 + i * 32 + 31);
							} else if (this.map_bg[nx][ny - 1] === 4) {
								this.gg.drawPT2(32 + j * 32, 32 + i * 32, 4);
							}
							break;
					}
					if (pt > 0) {
						this.gg.drawPT2(32 + j * 32, 32 + i * 32, pt);
					}
				}
			}
		}
		this.gg.os_g.drawImage(this.gg.os2_img, -32 - xmod, -32 - ymod);
	}

	/**
	 * TODO: 要調査
	 * @param {number} g_ac2 コインなどのアニメーションに使用するカウンター
	 */
	drawMapScroll(g_ac2: number) {
		const xmod = this.wx % 32;
		const ymod = this.wy % 32;
		// 画面左上のブロック座標
		const view_nx = rightShiftIgnoreSign(this.wx, 5);
		const view_ny = rightShiftIgnoreSign(this.wy, 5);
		const diff_view_nx = view_nx - this.os2_wx;
		const diff_view_ny = view_ny - this.os2_wy;
		if (Math.abs(diff_view_nx) > 1 || Math.abs(diff_view_ny) > 1) {
			this.drawMap(this.wx, this.wy);
		} else if (diff_view_nx === 0 && diff_view_ny === 0) {
		} else {
			// スクロールする方向とは反対方向に裏画面をずらす
			this.gg.os2_g.copyArea(
				32 + diff_view_nx * 32,
				32 + diff_view_ny * 32,
				544,
				352,
				-diff_view_nx * 32,
				-diff_view_ny * 32
			);
			if (diff_view_nx !== 0) this.os2_wx = view_nx;
			if (diff_view_ny !== 0) this.os2_wy = view_ny;
			const draw_queue = [];
			if (diff_view_ny !== 0) {
				// 上方向にスクロールする場合は一番上、下方向にスクロールする場合は一番下の列のブロックを裏画面に追加で描画する
				const ny_offset = diff_view_ny < 0 ? 0 : 10;
				for (let i = 0; i <= 16; i++) {
					draw_queue.push([this.map_bg[this.os2_wx + i][this.os2_wy + ny_offset], 1 + i, 1 + ny_offset]);
				}
			}
			if (diff_view_nx !== 0) {
				// 右方向にスクロールする場合は一番右、左方向にスクロールする場合は一番左の列のブロックを裏画面に追加で描画する
				const nx_offset = diff_view_nx < 0 ? 0 : 16;
				for (let i = 0; i <= 10; i++) {
					// 上下方向にも同時にスクロールしている場合、端のブロックを二重で描画してしまうのを避ける
					if (i === 0 && diff_view_ny < 0) continue;
					if (i === 10 && diff_view_ny > 0) continue;
					draw_queue.push([this.map_bg[this.os2_wx + nx_offset][this.os2_wy + i], 1 + nx_offset, 1 + i]);
				}
			}
			for (const [bg_code, nx, ny] of draw_queue) {
				if (bg_code <= 0) continue;
				this.gg.os2_g.drawImage(this.hi[bg_code], nx * 32, ny * 32);
			}
		}

		// マップ上の特別なブロックの見た目を調整する
		for (let i = 0; i <= 10; i++) {
			for (let j = 0; j <= 16; j++) {
				const nx = this.os2_wx + j;
				const ny = this.os2_wy + i;
				switch (this.map_bg[nx][ny]) {
					case 5:
						// 上向きのトゲ
						// 上が水なら奥に水を描画
						if (this.map_bg[nx][ny - 1] === 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							this.gg.drawPT2(32 + j * 32, 32 + i * 32, 5);
						}
						break;
					case 6:
						// 下向きのトゲ
						// 下が水なら奥に水を描画
						if (this.map_bg[nx][ny + 1] === 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							this.gg.drawPT2(32 + j * 32, 32 + i * 32, 6);
						}
						break;
					case 7: {
						// ろうそく
						const pt = 96 + (g_ac2 % 2);
						this.gg.drawBG2(32 + j * 32, 32 + i * 32, pt);
						break;
					}
					case 8: {
						// 人面星
						const is_millennium = this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max;
						const is_apparent = (this.mp.clear_type !== 2 && this.mp.clear_type !== 3) || this.mp.coin_kazu <= 0;

						let pt = 94;
						if (is_millennium) pt = 98; // ミレニアム人面星
						if (g_ac2 === 0) pt += 1; // 瞬く

						// 左が水なら奥に水を描画
						if (this.map_bg[nx - 1][ny] === 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							// まだコインを取り終えていない場合は人面星を描画しない
							if (!is_apparent) break;
							this.gg.drawPT2(32 + j * 32, 32 + i * 32, pt);
						} else {
							// まだコインを取り終えていない場合は人面星を描画しない
							if (!is_apparent) break;
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, pt);
						}
						break;
					}
					case 9: {
						// コイン
						// 左が水なら奥に水を描画
						if (this.map_bg[nx - 1][ny] === 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							this.gg.drawPT2(32 + j * 32, 32 + i * 32, 90 + g_ac2);
						} else {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 90 + g_ac2);
						}
						break;
					}
					case 10:
						// ハシゴ
						// 左が水なら奥に水を描画
						if (this.map_bg[nx - 1][ny] === 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							this.gg.drawPT2(32 + j * 32, 32 + i * 32, 10);
						}
						break;
					case 15:
						// 下から通れるブロック
						// 上が水なら奥に水を描画
						if (this.map_bg[nx][ny - 1] === 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							this.gg.drawPT2(32 + j * 32, 32 + i * 32, 15);
						}
						break;
					case 18:
						// 上り坂
						if (this.mp.map_data_option[nx][ny]) {
							// 下キーで降りられる上り坂
							if (this.map_bg[nx][ny - 1] === 4) {
								// 上が水なら奥に水を描画
								this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							} else {
								// 水を描画しない場合は背景色で塗りつぶす
								this.gg.os2_g.setColor(this.gg.backcolor);
								this.gg.os2_g.fillRect(32 + j * 32, 32 + i * 32, 32, 32);
							}
							this.gg.os2_g.setColor(Color.white);
							this.gg.os2_g.drawLine(32 + j * 32, 32 + i * 32 + 31, 32 + j * 32 + 31, 32 + i * 32);
						} else if (this.map_bg[nx][ny - 1] === 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							this.gg.drawPT2(32 + j * 32, 32 + i * 32, 18);
						}
						break;
					case 19:
						// 下り坂
						if (this.mp.map_data_option[nx][ny]) {
							// 下キーで降りられる下り坂
							if (this.map_bg[nx][ny - 1] === 4) {
								// 上が水なら奥に水を描画
								this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							} else {
								// 水を描画しない場合は背景色で塗りつぶす
								this.gg.os2_g.setColor(this.gg.backcolor);
								this.gg.os2_g.fillRect(32 + j * 32, 32 + i * 32, 32, 32);
							}
							this.gg.os2_g.setColor(Color.white);
							this.gg.os2_g.drawLine(32 + j * 32, 32 + i * 32, 32 + j * 32 + 31, 32 + i * 32 + 31);
						} else if (this.map_bg[nx][ny - 1] === 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							this.gg.drawPT2(32 + j * 32, 32 + i * 32, 19);
						}
						break;
				}
			}
		}
		this.gg.os_g.drawImage(this.gg.os2_img, -32 - xmod, -32 - ymod);
	}

	/**
	 * 指定した座標のマップコードを取得する
	 * @param x {number} X座標(ピクセル座標)
	 * @param y {number} Y座標(ピクセル座標)
	 * @returns {number}
	 * @see {@link MainProgram#setChipValue}
	 */
	getBGCode(x: number, y: number) {
		return this.map_bg[rightShiftIgnoreSign(x, 5)][rightShiftIgnoreSign(y, 5)];
	}

	/**
	 * 指定したブロック座標のマップコードを書き換え、画面内である場合はその地点を再描画する
	 * @param nx {number} X座標(ブロック座標)
	 * @param ny {number} Y座標(ブロック座標)
	 * @param {number} code マップコード
	 */
	putBGCode(nx: number, ny: number, code: number) {
		this.map_bg[nx][ny] = code;
		if (this.os2_wx <= nx && this.os2_wx + 16 >= nx && this.os2_wy <= ny && this.os2_wy + 10 >= ny) {
			this.gg.drawBG2((nx - this.os2_wx) * 32 + 32, (ny - this.os2_wy) * 32 + 32, code);
		}
	}
}

export { MapSystem };
