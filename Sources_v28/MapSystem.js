import { createNDimensionArray } from "./GlobalFunctions";

class MapSystem {
	constructor(width, height, gamegraphics, mainprogram) {
		this.width = width;
		this.height = height;
		this.gg = gamegraphics;
		this.mp = mainprogram;
		this.map_bg = createNDimensionArray(this.width, this.height);
		this.map_string = new Array(this.height);
		this.hi = this.gg.spt_img[0];
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
			}
		}
		const bg_space = ".".repeat(this.width + 1);
		for (let y = 0; y < this.height; y++) {
			this.map_string[y] = bg_space;
		}
	}

	/**
	 * TODO: 要調査
	 */
	setBank(mode) {
		let dest = 30;
		if (mode === 1) dest = 40;
		else if (mode === 2) dest = 50;
		else if (mode === 4) dest = 60;
		for (let i = 0; i <= 9; i++) {
			this.gg.spt_img[0][10 + i] = this.gg.spt_img[0][dest + i];
		}
	}

	/**
	 * 画面上にマップを描画する
	 * @param {number} view_x 画面に描画される範囲の左上のX座標
	 * @param {number} view_y 画面に描画される範囲の左上のY座標
	 */
	drawMap(view_x, view_y) {
		this.wx = view_x;
		this.wy = view_y;
		const xmod = this.wx % 32;
		const ymod = this.wy % 32;
		this.os2_wx = this.wx >> 5;
		this.os2_wy = this.wy >> 5;
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
	 * TODO: 要調査
	 * @param {number} g_ac2
	 */
	drawMapScroll(g_ac2) {
		const xmod = this.wx % 32;
		const ymod = this.wy % 32;
		// 画面左上のブロック座標
		const view_nx = this.wx >> 5;
		const view_ny = this.wy >> 5;
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

						let pt = 94;
						if (is_millennium) pt = 98; // ミレニアム人面星
						if (g_ac2 === 0) pt += 1; // 瞬く

						// 左が水なら奥に水を描画
						if (this.map_bg[nx - 1][ny] === 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							this.gg.drawPT2(32 + j * 32, 32 + i * 32, pt);
						} else {
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
	getBGCode(x, y) {
		return this.map_bg[x >> 5][y >> 5];
	}

	/**
	 * 指定したブロック座標のマップコードを書き換え、画面内である場合はその地点を再描画する
	 * @param nx {number} X座標(ブロック座標)
	 * @param ny {number} Y座標(ブロック座標)
	 * @param {number} code マップコード
	 */
	putBGCode(nx, ny, code) {
		this.map_bg[nx][ny] = code;
		if (this.os2_wx <= nx && this.os2_wx + 16 >= nx && this.os2_wy <= ny && this.os2_wy + 10 >= ny) {
			this.gg.drawBG2((nx - this.os2_wx) * 32 + 32, (ny - this.os2_wy) * 32 + 32, code);
		}
	}
}

export { MapSystem };
