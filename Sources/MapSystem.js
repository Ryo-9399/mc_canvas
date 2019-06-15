import { createNDimensionArray, rightShiftIgnoreSign } from "./GlobalFunctions";
import { Color } from "./ImageBuff";

class MapSystem {
	constructor(width, height, gamegraphics, mainprogram) {
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
		this.wx_mini = undefined;
		this.wy_mini = undefined;
		this.wx_max = undefined;
		this.wy_max = undefined;
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
	setBank(mode) {
		let dest = 30;
		if (mode === 1) dest = 40;
		else if (mode === 2) dest = 50;
		else if (mode === 4) dest = 60;
		this.gg.spt_img[0][8] = this.gg.spt_img[0][0];
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
	drawMap(view_x, view_y) {
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
		this.gg.os_g.drawImage(this.gg.os2_img, -32 - xmod, -32 - ymod, this.gg.ap);
	}

	/**
	 * マップや背景レイヤー、背景画像を描画する
	 * @param {number} view_x 画面に描画される範囲の左上のX座標
	 * @param {number} view_y 画面に描画される範囲の左上のY座標
	 * @param {number} g_ac2 TODO: 要調査
	 * @param {number} gazou_scroll 背景画像のスクロール設定
	 * @param {number} mode 何を描画するかを指定する TODO:要調査
	 */
	drawMapLayer(view_x, view_y, g_ac2, gazou_scroll, mode) {
		var localImage;
		if (this.mp.setbacki_f) {
			localImage = this.mp.setbacki_img;
		} else {
			localImage = this.gg.li[3 + this.mp.stage_haikei];
		}
		this.wx = view_x;
		this.wy = view_y;
		const xmod = this.wx % 32;
		const ymod = this.wy % 32;
		this.os2_wx = rightShiftIgnoreSign(this.wx, 5);
		this.os2_wy = rightShiftIgnoreSign(this.wy, 5);
		var n;
		if (mode == 3 || mode == 4) {
			this.gg.os2_g.drawImage(this.gg.os_img, 32 + xmod, 32 + ymod, this.gg.ap);
		} else {
			this.gg.fill2();
			let i1;
			if (
				this.mp.second_gazou_visible &&
				this.mp.second_gazou_priority == 1 &&
				this.mp.second_gazou_img != null
			) {
				if (this.mp.second_gazou_scroll == 2) {
					n = -(rightShiftIgnoreSign(this.wx - 32, 2) % 512);
					this.gg.os2_g.drawImage(this.mp.second_gazou_img, xmod + 32 + n, ymod + 32);
					this.gg.os2_g.drawImage(this.mp.second_gazou_img, xmod + 32 + n + 512, ymod + 32);
				} else if (this.mp.second_gazou_scroll == 3) {
					n = -(rightShiftIgnoreSign(this.wx - 32, 1) % 512);
					this.gg.os2_g.drawImage(this.mp.second_gazou_img, xmod + 32 + n, ymod + 32);
					this.gg.os2_g.drawImage(this.mp.second_gazou_img, xmod + 32 + n + 512, ymod + 32);
				} else if (this.mp.second_gazou_scroll == 4) {
					this.second_gazou_x += this.mp.second_gazou_scroll_speed_x;
					this.second_gazou_y += this.mp.second_gazou_scroll_speed_y;
					if (this.second_gazou_x < -512) {
						this.second_gazou_x += 512;
					}
					if (this.second_gazou_x > 0) {
						this.second_gazou_x -= 512;
					}
					if (this.second_gazou_y < -320) {
						this.second_gazou_y += 320;
					}
					if (this.second_gazou_y > 0) {
						this.second_gazou_y -= 320;
					}
					this.gg.os2_g.drawImage(
						this.mp.second_gazou_img,
						xmod + 32 + this.second_gazou_x,
						ymod + 32 + this.second_gazou_y
					);
					this.gg.os2_g.drawImage(
						this.mp.second_gazou_img,
						xmod + 32 + this.second_gazou_x + 512,
						ymod + 32 + this.second_gazou_y
					);
					this.gg.os2_g.drawImage(
						this.mp.second_gazou_img,
						xmod + 32 + this.second_gazou_x,
						ymod + 32 + this.second_gazou_y + 320
					);
					this.gg.os2_g.drawImage(
						this.mp.second_gazou_img,
						xmod + 32 + this.second_gazou_x + 512,
						ymod + 32 + this.second_gazou_y + 320
					);
				} else if (this.mp.second_gazou_scroll == 5) {
					n = -(rightShiftIgnoreSign((this.wx - 32) * 3, 1) % 512);
					this.gg.os2_g.drawImage(this.mp.second_gazou_img, xmod + 32 + n, ymod + 32);
					this.gg.os2_g.drawImage(this.mp.second_gazou_img, xmod + 32 + n + 512, ymod + 32);
				} else if (this.mp.second_gazou_scroll == 6) {
					n = -(rightShiftIgnoreSign((this.wx - 32) * 3, 1) % 512);
					i1 = -(this.wy - 320);
					this.gg.os2_g.drawImage(this.mp.second_gazou_img, xmod + 32 + n, ymod + 32 + i1);
					this.gg.os2_g.drawImage(this.mp.second_gazou_img, xmod + 32 + n + 512, ymod + 32 + i1);
				} else if (this.mp.second_gazou_scroll == 7) {
					n = -((this.wx - 32) % 512);
					i1 = -((this.wy - 320) % 320);
					this.gg.os2_g.drawImage(this.mp.second_gazou_img, xmod + 32 + n, ymod + 32 + i1);
					this.gg.os2_g.drawImage(this.mp.second_gazou_img, xmod + 32 + n + 512, ymod + 32 + i1);
					this.gg.os2_g.drawImage(this.mp.second_gazou_img, xmod + 32 + n, ymod + 32 + i1 + 320);
					this.gg.os2_g.drawImage(this.mp.second_gazou_img, xmod + 32 + n + 512, ymod + 32 + i1 + 320);
				} else if (this.mp.second_gazou_scroll == 8) {
					n = this.mp.second_gazou_scroll_x + 32 - this.wx;
					i1 = this.mp.second_gazou_scroll_y + 320 - this.wy;
					if (n < 512 && i1 < 320) {
						this.gg.os2_g.drawImage(this.mp.second_gazou_img, xmod + 32 + n, ymod + 32 + i1);
					}
				} else {
					this.gg.os2_g.drawImage(this.mp.second_gazou_img, xmod + 32, ymod + 32);
				}
			}
			if (localImage != null) {
				if (gazou_scroll == 2) {
					n = -(rightShiftIgnoreSign(this.wx - 32, 2) % 512);

					this.gg.os2_g.drawImage(localImage, xmod + 32 + n, ymod + 32);
					this.gg.os2_g.drawImage(localImage, xmod + 32 + n + 512, ymod + 32);
				} else if (gazou_scroll == 3) {
					this.gazou_x -= 2;
					if (this.gazou_x <= -512) {
						this.gazou_x += 512;
					}
					this.gg.os2_g.drawImage(localImage, xmod + 32 + this.gazou_x, ymod + 32);
					this.gg.os2_g.drawImage(localImage, xmod + 32 + this.gazou_x + 512, ymod + 32);
				} else if (gazou_scroll == 4) {
					this.gazou_x += this.mp.gazou_scroll_speed_x;
					this.gazou_y += this.mp.gazou_scroll_speed_y;
					if (this.gazou_x < -512) {
						this.gazou_x += 512;
					}
					if (this.gazou_x > 0) {
						this.gazou_x -= 512;
					}
					if (this.gazou_y < -320) {
						this.gazou_y += 320;
					}
					if (this.gazou_y > 0) {
						this.gazou_y -= 320;
					}
					this.gg.os2_g.drawImage(localImage, xmod + 32 + this.gazou_x, ymod + 32 + this.gazou_y);
					this.gg.os2_g.drawImage(localImage, xmod + 32 + this.gazou_x + 512, ymod + 32 + this.gazou_y);
					this.gg.os2_g.drawImage(localImage, xmod + 32 + this.gazou_x, ymod + 32 + this.gazou_y + 320);
					this.gg.os2_g.drawImage(localImage, xmod + 32 + this.gazou_x + 512, ymod + 32 + this.gazou_y + 320);
				} else if (gazou_scroll == 5) {
					n = -(rightShiftIgnoreSign(this.wy - 320, 1) % 320);

					this.gg.os2_g.drawImage(localImage, xmod + 32, ymod + 32 + n);
					this.gg.os2_g.drawImage(localImage, xmod + 32, ymod + 32 + n + 320);
				} else if (gazou_scroll == 6) {
					n = -(rightShiftIgnoreSign(this.wy - 320, 1) % 320);
					i1 = -(rightShiftIgnoreSign(this.wx - 32, 1) % 512);

					this.gg.os2_g.drawImage(localImage, xmod + 32 + i1, ymod + 32 + n);
					this.gg.os2_g.drawImage(localImage, xmod + 32 + i1 + 512, ymod + 32 + n);
					this.gg.os2_g.drawImage(localImage, xmod + 32 + i1, ymod + 32 + n + 320);
					this.gg.os2_g.drawImage(localImage, xmod + 32 + i1 + 512, ymod + 32 + n + 320);
				} else if (gazou_scroll == 7) {
					n = -((this.wy - 320) % 320);
					i1 = -((this.wx - 32) % 512);

					this.gg.os2_g.drawImage(localImage, xmod + 32 + i1, ymod + 32 + n);
					this.gg.os2_g.drawImage(localImage, xmod + 32 + i1 + 512, ymod + 32 + n);
					this.gg.os2_g.drawImage(localImage, xmod + 32 + i1, ymod + 32 + n + 320);
					this.gg.os2_g.drawImage(localImage, xmod + 32 + i1 + 512, ymod + 32 + n + 320);
				} else if (gazou_scroll == 8) {
					n = -(rightShiftIgnoreSign(this.wy - 320, 1) % 640);
					i1 = -(rightShiftIgnoreSign(this.wx - 32, 1) % 512);

					this.gg.os2_g.drawImage(localImage, xmod + 32 + i1, ymod + 32 + n);
					this.gg.os2_g.drawImage(localImage, xmod + 32 + i1 + 512, ymod + 32 + n);
				} else if (gazou_scroll == 9) {
					n = -(rightShiftIgnoreSign(this.wy - 320, 1) % 640);
					i1 = -(rightShiftIgnoreSign(this.wx - 32, 1) % 1024);

					this.gg.os2_g.drawImage(localImage, xmod + 32 + i1, ymod + 32 + n);
					this.gg.os2_g.drawImage(localImage, xmod + 32 + i1 + 1024, ymod + 32 + n);
				} else if (gazou_scroll == 10) {
					n = -(rightShiftIgnoreSign(this.wx - 32, 1) % 512);

					this.gg.os2_g.drawImage(localImage, xmod + 32 + n, ymod + 32);
					this.gg.os2_g.drawImage(localImage, xmod + 32 + n + 512, ymod + 32);
				} else if (gazou_scroll == 11) {
					n = this.mp.gazou_scroll_x + 32 - this.wx;
					i1 = this.mp.gazou_scroll_y + 320 - this.wy;
					if (n < 512 && i1 < 320) {
						this.gg.os2_g.drawImage(localImage, xmod + 32 + n, ymod + 32 + i1);
					}
				} else {
					this.gg.os2_g.drawImage(localImage, xmod + 32, ymod + 32);
				}
			}
		}
		if (mode == 2) {
			this.gg.os_g.drawImage(this.gg.os2_img, -32 - xmod, -32 - ymod, this.gg.ap);
			return;
		}
		var j;
		var i;
		if (mode != 4 && this.gg.layer_mode == 2) {
			for (j = 0; j <= 10; j++) {
				for (i = 0; i <= 16; i++) {
					n = this.map_bg_layer[this.os2_wx + i][this.os2_wy + j];
					if (n > 0 && n < 255) {
						this.gg.drawMapchip2(
							32 + i * 32,
							32 + j * 32,
							this.map_bg_layer[this.os2_wx + i][this.os2_wy + j]
						);
					}
				}
			}
		}
		if (mode != 3) {
			for (j = 0; j <= 10; j++) {
				for (i = 0; i <= 16; i++) {
					n = this.map_bg[this.os2_wx + i][this.os2_wy + j];
					if (this.gg.layer_mode == 2) {
						if (this.mp.clear_type == 3) {
							if (n != 4 || this.mp.water_visible != 2) {
								if (n == 29 || n == 4) {
									n = 0;
								}
							}
						} else if (n != 4 || this.mp.water_visible != 2) {
							if (n == 29 || n == 15 || n == 10 || n == 4 || n == 18 || n == 19) {
								n = 0;
							}
						}
					} else if (this.mp.clear_type == 3) {
						if (n == 29 || n == 4) {
							n = 0;
						}
					}
					if (n == 7) {
						if (g_ac2 == 0 || g_ac2 == 2) {
							n = 96;
						} else {
							n = 97;
						}
					} else if (n == 9) {
						n = 90 + g_ac2;
						if (this.gg.layer_mode != 2) {
							if (this.map_bg[this.os2_wx + i - 1][this.os2_wy + j] == 4) {
								this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
							}
						} else if (
							this.mp.water_visible == 2 &&
							this.map_bg[this.os2_wx + i - 1][this.os2_wy + j] == 4
						) {
							this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
						}
					} else if (n == 8) {
						if ((this.mp.clear_type != 2 && this.mp.clear_type != 3) || this.mp.coin_kazu <= 0) {
							if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max) {
								if (g_ac2 >= 2) {
									n = 98;
								} else {
									n = 99;
								}
								if (this.gg.layer_mode != 2) {
									if (this.map_bg[this.os2_wx + i - 1][this.os2_wy + j] == 4) {
										this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
									}
								} else if (
									this.mp.water_visible == 2 &&
									this.map_bg[this.os2_wx + i - 1][this.os2_wy + j] == 4
								) {
									this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
								}
							} else {
								if (g_ac2 >= 2) {
									n = 95;
								} else {
									n = 94;
								}
								if (this.gg.layer_mode != 2) {
									if (this.map_bg[this.os2_wx + i - 1][this.os2_wy + j] == 4) {
										this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
									}
								} else if (
									this.mp.water_visible == 2 &&
									this.map_bg[this.os2_wx + i - 1][this.os2_wy + j] == 4
								) {
									this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
								}
							}
						}
					} else if (n == 10) {
						if (this.map_bg[this.os2_wx + i - 1][this.os2_wy + j] == 4) {
							this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
							this.gg.drawPT2(32 + i * 32, 32 + j * 32, n);

							n = 0;
						}
					} else if (n == 18) {
						if (this.mp.map_data_option[this.os2_wx + i][this.os2_wy + j] == 1) {
							n = 0;

							this.gg.os2_g.setColor(Color.white);
							this.gg.os2_g.drawLine(32 + i * 32, 32 + j * 32 + 31, 32 + i * 32 + 31, 32 + j * 32);
						} else if (this.map_bg[this.os2_wx + i][this.os2_wy + j - 1] == 4) {
							this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
							this.gg.drawPT2(32 + i * 32, 32 + j * 32, n);

							n = 0;
						}
					} else if (n == 19) {
						if (this.mp.map_data_option[this.os2_wx + i][this.os2_wy + j] == 1) {
							n = 0;

							this.gg.os2_g.setColor(Color.white);
							this.gg.os2_g.drawLine(32 + i * 32, 32 + j * 32, 32 + i * 32 + 31, 32 + j * 32 + 31);
						} else if (this.map_bg[this.os2_wx + i][this.os2_wy + j - 1] == 4) {
							this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
							this.gg.drawPT2(32 + i * 32, 32 + j * 32, n);

							n = 0;
						}
					}
					if (n > 0) {
						this.gg.drawPT2(32 + i * 32, 32 + j * 32, n);
					}
				}
			}
		}
		this.gg.os_g.drawImage(this.gg.os2_img, -32 - xmod, -32 - ymod, this.gg.ap);
	}

	/**
	 * TODO: 要調査
	 * @param {number} g_ac2
	 */
	drawMapScroll(g_ac2) {
		const xmod = this.wx % 32;
		const ymod = this.wy % 32;
		// 画面左上のブロック座標
		const view_nx = rightShiftIgnoreSign(this.wx, 5);
		const view_ny = rightShiftIgnoreSign(this.wy, 5);
		if (
			view_nx > this.os2_wx + 1 ||
			view_nx < this.os2_wx - 1 ||
			view_ny > this.os2_wy + 1 ||
			view_ny < this.os2_wy - 1
		) {
			this.drawMap(this.wx, this.wy);
		} else if (view_ny > this.os2_wy) {
			if (view_nx > this.os2_wx) {
				this.gg.os2_g.copyArea(64, 64, 544, 352, -32, -32);
				this.os2_wx = view_nx;
				this.os2_wy = view_ny;
				for (let i = 0; i <= 16; i++) {
					if (this.map_bg[this.os2_wx + i][this.os2_wy + 10] > 0) {
						this.gg.os2_g.drawImage(
							this.hi[this.map_bg[this.os2_wx + i][this.os2_wy + 10]],
							32 + i * 32,
							352
						);
					}
				}
				for (let i = 0; i <= 9; i++) {
					if (this.map_bg[this.os2_wx + 16][this.os2_wy + i] > 0) {
						this.gg.os2_g.drawImage(
							this.hi[this.map_bg[this.os2_wx + 16][this.os2_wy + i]],
							544,
							32 + i * 32
						);
					}
				}
			} else if (view_nx < this.os2_wx) {
				this.gg.os2_g.copyArea(0, 64, 544, 352, 32, -32);
				this.os2_wx = view_nx;
				this.os2_wy = view_ny;
				for (let i = 0; i <= 16; i++) {
					if (this.map_bg[this.os2_wx + i][this.os2_wy + 10] > 0) {
						this.gg.os2_g.drawImage(
							this.hi[this.map_bg[this.os2_wx + i][this.os2_wy + 10]],
							32 + i * 32,
							352
						);
					}
				}
				for (let i = 0; i <= 9; i++) {
					if (this.map_bg[this.os2_wx][this.os2_wy + i] > 0) {
						this.gg.os2_g.drawImage(this.hi[this.map_bg[this.os2_wx][this.os2_wy + i]], 32, 32 + i * 32);
					}
				}
			} else {
				this.gg.os2_g.copyArea(32, 64, 544, 352, 0, -32);
				this.os2_wy = view_ny;
				for (let i = 0; i <= 16; i++) {
					if (this.map_bg[this.os2_wx + i][this.os2_wy + 10] > 0) {
						this.gg.os2_g.drawImage(
							this.hi[this.map_bg[this.os2_wx + i][this.os2_wy + 10]],
							32 + i * 32,
							352
						);
					}
				}
			}
		} else if (view_ny < this.os2_wy) {
			if (view_nx > this.os2_wx) {
				this.gg.os2_g.copyArea(64, 0, 544, 352, -32, 32);
				this.os2_wx = view_nx;
				this.os2_wy = view_ny;
				for (let i = 0; i <= 16; i++) {
					if (this.map_bg[this.os2_wx + i][this.os2_wy] > 0) {
						this.gg.os2_g.drawImage(this.hi[this.map_bg[this.os2_wx + i][this.os2_wy]], 32 + i * 32, 32);
					}
				}
				for (let i = 1; i <= 10; i++) {
					if (this.map_bg[this.os2_wx + 16][this.os2_wy + i] > 0) {
						this.gg.os2_g.drawImage(
							this.hi[this.map_bg[this.os2_wx + 16][this.os2_wy + i]],
							544,
							32 + i * 32
						);
					}
				}
			} else if (view_nx < this.os2_wx) {
				this.gg.os2_g.copyArea(0, 0, 544, 352, 32, 32);
				this.os2_wx = view_nx;
				this.os2_wy = view_ny;
				for (let i = 0; i <= 16; i++) {
					if (this.map_bg[this.os2_wx + i][this.os2_wy] > 0) {
						this.gg.os2_g.drawImage(this.hi[this.map_bg[this.os2_wx + i][this.os2_wy]], 32 + i * 32, 32);
					}
				}
				for (let i = 1; i <= 10; i++) {
					if (this.map_bg[this.os2_wx][this.os2_wy + i] > 0) {
						this.gg.os2_g.drawImage(this.hi[this.map_bg[this.os2_wx][this.os2_wy + i]], 32, 32 + i * 32);
					}
				}
			} else {
				this.gg.os2_g.copyArea(32, 0, 544, 352, 0, 32);
				this.os2_wy = view_ny;
				for (let i = 0; i <= 16; i++) {
					if (this.map_bg[this.os2_wx + i][this.os2_wy] > 0) {
						this.gg.os2_g.drawImage(this.hi[this.map_bg[this.os2_wx + i][this.os2_wy]], 32 + i * 32, 32);
					}
				}
			}
		} else if (view_nx > this.os2_wx) {
			this.gg.os2_g.copyArea(64, 32, 544, 352, -32, 0);
			this.os2_wx = view_nx;
			for (let i = 0; i <= 10; i++) {
				if (this.map_bg[this.os2_wx + 16][this.os2_wy + i] > 0) {
					this.gg.os2_g.drawImage(this.hi[this.map_bg[this.os2_wx + 16][this.os2_wy + i]], 544, 32 + i * 32);
				}
			}
		} else if (view_nx < this.os2_wx) {
			this.gg.os2_g.copyArea(0, 32, 544, 352, 32, 0);
			this.os2_wx = view_nx;
			for (let i = 0; i <= 10; i++) {
				if (this.map_bg[this.os2_wx][this.os2_wy + i] > 0) {
					this.gg.os2_g.drawImage(this.hi[this.map_bg[this.os2_wx][this.os2_wy + i]], 32, 32 + i * 32);
				}
			}
		}

		const localImage = this.hi[90 + g_ac2];
		for (let i = 0; i <= 10; i++) {
			for (let j = 0; j <= 16; j++) {
				switch (this.map_bg[this.os2_wx + j][this.os2_wy + i]) {
					case 5:
						if (this.map_bg[this.os2_wx + j][this.os2_wy + i - 1] == 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							this.gg.drawPT2(32 + j * 32, 32 + i * 32, 5);
						}
						break;
					case 6:
						if (this.map_bg[this.os2_wx + j][this.os2_wy + i + 1] == 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							this.gg.drawPT2(32 + j * 32, 32 + i * 32, 6);
						}
						break;
					case 7:
						if (g_ac2 == 0 || g_ac2 == 2) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 96);
						} else {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 97);
						}
						break;
					case 8:
						if (g_ac2 == 0) {
							if (this.map_bg[this.os2_wx + j - 1][this.os2_wy + i] == 4) {
								this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
								if ((this.mp.clear_type != 2 && this.mp.clear_type != 3) || this.mp.coin_kazu <= 0) {
									if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max) {
										this.gg.drawPT2(32 + j * 32, 32 + i * 32, 99);
									} else {
										this.gg.drawPT2(32 + j * 32, 32 + i * 32, 95);
									}
								}
							} else if ((this.mp.clear_type != 2 && this.mp.clear_type != 3) || this.mp.coin_kazu <= 0) {
								if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max) {
									this.gg.drawBG2(32 + j * 32, 32 + i * 32, 99);
								} else {
									this.gg.drawBG2(32 + j * 32, 32 + i * 32, 95);
								}
							}
						} else if (this.map_bg[this.os2_wx + j - 1][this.os2_wy + i] == 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							if ((this.mp.clear_type != 2 && this.mp.clear_type != 3) || this.mp.coin_kazu <= 0) {
								if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max) {
									this.gg.drawPT2(32 + j * 32, 32 + i * 32, 98);
								} else {
									this.gg.drawPT2(32 + j * 32, 32 + i * 32, 94);
								}
							}
						} else if ((this.mp.clear_type != 2 && this.mp.clear_type != 3) || this.mp.coin_kazu <= 0) {
							if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max) {
								this.gg.drawBG2(32 + j * 32, 32 + i * 32, 98);
							} else {
								this.gg.drawBG2(32 + j * 32, 32 + i * 32, 94);
							}
						}
						break;
					case 9:
						if (this.map_bg[this.os2_wx + j - 1][this.os2_wy + i] == 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							this.gg.os2_g.drawImage(localImage, 32 + j * 32, 32 + i * 32, this.gg.ap);
						} else {
							this.gg.os2_g.setColor(this.gg.backcolor);
							this.gg.os2_g.fillRect(32 + j * 32, 32 + i * 32, 32, 32);
							this.gg.os2_g.drawImage(localImage, 32 + j * 32, 32 + i * 32, this.gg.ap);
						}
						break;
					case 10:
						if (this.map_bg[this.os2_wx + j - 1][this.os2_wy + i] == 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							this.gg.drawPT2(32 + j * 32, 32 + i * 32, 10);
						}
						break;
					case 15:
						if (this.map_bg[this.os2_wx + j][this.os2_wy + i - 1] == 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							this.gg.drawPT2(32 + j * 32, 32 + i * 32, 15);
						}
						break;
					case 18:
						if (this.mp.map_data_option[this.os2_wx + j][this.os2_wy + i] == 1) {
							if (this.map_bg[this.os2_wx + j][this.os2_wy + i - 1] == 4) {
								this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							} else {
								this.gg.os2_g.setColor(this.gg.backcolor);

								this.gg.os2_g.fillRect(32 + j * 32, 32 + i * 32, 32, 32);
							}
							this.gg.os2_g.setColor(Color.white);
							this.gg.os2_g.drawLine(32 + j * 32, 32 + i * 32 + 31, 32 + j * 32 + 31, 32 + i * 32);
						} else if (this.map_bg[this.os2_wx + j][this.os2_wy + i - 1] == 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							this.gg.drawPT2(32 + j * 32, 32 + i * 32, 18);
						}
						break;
					case 19:
						if (this.mp.map_data_option[this.os2_wx + j][this.os2_wy + i] == 1) {
							if (this.map_bg[this.os2_wx + j][this.os2_wy + i - 1] == 4) {
								this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							} else {
								this.gg.os2_g.setColor(this.gg.backcolor);
								this.gg.os2_g.fillRect(32 + j * 32, 32 + i * 32, 32, 32);
							}
							this.gg.os2_g.setColor(Color.white);
							this.gg.os2_g.drawLine(32 + j * 32, 32 + i * 32, 32 + j * 32 + 31, 32 + i * 32 + 31);
						} else if (this.map_bg[this.os2_wx + j][this.os2_wy + i - 1] == 4) {
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
	getBGCode(x, y) {
		return this.map_bg[rightShiftIgnoreSign(x, 5)][rightShiftIgnoreSign(y, 5)];
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
