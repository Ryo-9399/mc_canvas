import { createNDimensionArray } from "./GlobalFunctions";

class MapSystem {
	constructor(width, height, gamegraphics, mainprogram) {
		this.width = width;
		this.height = height;
		this.gg = gamegraphics;
		this.mp = mainprogram;
		this.map_bg = createNDimensionArray(this.width, this.height);
		this.map_string = new Array(this.height);
		this.bg_space = "";
		this.hi = this.gg.spt_img[0];
		this.g2 = this.gg.os2_g;
		this.ap = this.gg.ap;

		for (var i = 0; i <= this.width; i++) {
			this.bg_space += ".";
		}
		this.init();
	}

	init() {
		this.wx = 0;
		this.wy = 0;
		this.os2_wx = 0;
		this.os2_wy = 0;
		for (var j = 0; j < this.height; j++) {
			for (var i = 0; i < this.width; i++) {
				this.map_bg[i][j] = 0;
			}
		}
		for (j = 0; j < this.height; j++) {
			this.map_string[j] = this.bg_space;
		}
	}

	setBank(paramInt) {
		var byte0;
		if (paramInt == 1) {
			byte0 = 40;
		} else if (paramInt == 2) {
			byte0 = 50;
		} else if (paramInt == 4) {
			byte0 = 60;
		} else {
			byte0 = 30;
		}
		for (var i = 0; i <= 9; i++) {
			this.gg.spt_img[0][10 + i] = this.gg.spt_img[0][byte0 + i];
		}
	}

	drawMap(paramInt1, paramInt2) {
		this.wx = paramInt1;
		this.wy = paramInt2;
		var k = this.wx % 32;
		var m = this.wy % 32;
		this.os2_wx = this.wx >> 5;
		this.os2_wy = this.wy >> 5;
		this.gg.fill2();
		for (var j = 0; j <= 10; j++) {
			for (var i = 0; i <= 16; i++) {
				var n = this.map_bg[this.os2_wx + i][this.os2_wy + j];
				if (n > 0) {
					this.gg.drawPT2(32 + i * 32, 32 + j * 32, this.map_bg[this.os2_wx + i][this.os2_wy + j]);
				}
			}
		}
		this.gg.os_g.drawImage(this.gg.os2_img, -32 - k, -32 - m, this.gg.ap);
	}

	drawMapScroll(paramInt) {
		var xmod = this.wx % 32;
		var ymod = this.wy % 32;
		var nx = this.wx >> 5;
		var ny = this.wy >> 5;
		if (nx > this.os2_wx + 1 || nx < this.os2_wx - 1 || ny > this.os2_wy + 1 || ny < this.os2_wy - 1) {
			this.drawMap(this.wx, this.wy);
		} else if (ny > this.os2_wy) {
			if (nx > this.os2_wx) {
				this.g2.copyArea(64, 64, 544, 352, -32, -32);
				this.os2_wx = nx;
				this.os2_wy = ny;
				for (var i = 0; i <= 16; i++) {
					if (this.map_bg[this.os2_wx + i][this.os2_wy + 10] > 0) {
						this.g2.drawImage(
							this.hi[this.map_bg[this.os2_wx + i][this.os2_wy + 10]],
							32 + i * 32,
							352,
							this.ap
						);
					}
				}
				for (var i = 0; i <= 9; i++) {
					if (this.map_bg[this.os2_wx + 16][this.os2_wy + i] > 0) {
						this.g2.drawImage(
							this.hi[this.map_bg[this.os2_wx + 16][this.os2_wy + i]],
							544,
							32 + i * 32,
							this.ap
						);
					}
				}
			} else if (nx < this.os2_wx) {
				this.g2.copyArea(0, 64, 544, 352, 32, -32);
				this.os2_wx = nx;
				this.os2_wy = ny;
				for (var i = 0; i <= 16; i++) {
					if (this.map_bg[this.os2_wx + i][this.os2_wy + 10] > 0) {
						this.g2.drawImage(
							this.hi[this.map_bg[this.os2_wx + i][this.os2_wy + 10]],
							32 + i * 32,
							352,
							this.ap
						);
					}
				}
				for (var i = 0; i <= 9; i++) {
					if (this.map_bg[this.os2_wx][this.os2_wy + i] > 0) {
						this.g2.drawImage(this.hi[this.map_bg[this.os2_wx][this.os2_wy + i]], 32, 32 + i * 32, this.ap);
					}
				}
			} else {
				this.g2.copyArea(32, 64, 544, 352, 0, -32);
				this.os2_wy = ny;
				for (var i = 0; i <= 16; i++) {
					if (this.map_bg[this.os2_wx + i][this.os2_wy + 10] > 0) {
						this.g2.drawImage(
							this.hi[this.map_bg[this.os2_wx + i][this.os2_wy + 10]],
							32 + i * 32,
							352,
							this.ap
						);
					}
				}
			}
		} else if (ny < this.os2_wy) {
			if (nx > this.os2_wx) {
				this.g2.copyArea(64, 0, 544, 352, -32, 32);
				this.os2_wx = nx;
				this.os2_wy = ny;
				for (var i = 0; i <= 16; i++) {
					if (this.map_bg[this.os2_wx + i][this.os2_wy] > 0) {
						this.g2.drawImage(this.hi[this.map_bg[this.os2_wx + i][this.os2_wy]], 32 + i * 32, 32, this.ap);
					}
				}
				for (var i = 1; i <= 10; i++) {
					if (this.map_bg[this.os2_wx + 16][this.os2_wy + i] > 0) {
						this.g2.drawImage(
							this.hi[this.map_bg[this.os2_wx + 16][this.os2_wy + i]],
							544,
							32 + i * 32,
							this.ap
						);
					}
				}
			} else if (nx < this.os2_wx) {
				this.g2.copyArea(0, 0, 544, 352, 32, 32);
				this.os2_wx = nx;
				this.os2_wy = ny;
				for (var i = 0; i <= 16; i++) {
					if (this.map_bg[this.os2_wx + i][this.os2_wy] > 0) {
						this.g2.drawImage(this.hi[this.map_bg[this.os2_wx + i][this.os2_wy]], 32 + i * 32, 32, this.ap);
					}
				}
				for (var i = 1; i <= 10; i++) {
					if (this.map_bg[this.os2_wx][this.os2_wy + i] > 0) {
						this.g2.drawImage(this.hi[this.map_bg[this.os2_wx][this.os2_wy + i]], 32, 32 + i * 32, this.ap);
					}
				}
			} else {
				this.g2.copyArea(32, 0, 544, 352, 0, 32);
				this.os2_wy = ny;
				for (var i = 0; i <= 16; i++) {
					if (this.map_bg[this.os2_wx + i][this.os2_wy] > 0) {
						this.g2.drawImage(this.hi[this.map_bg[this.os2_wx + i][this.os2_wy]], 32 + i * 32, 32, this.ap);
					}
				}
			}
		} else if (nx > this.os2_wx) {
			this.g2.copyArea(64, 32, 544, 352, -32, 0);
			this.os2_wx = nx;
			for (var i = 0; i <= 10; i++) {
				if (this.map_bg[this.os2_wx + 16][this.os2_wy + i] > 0) {
					this.g2.drawImage(
						this.hi[this.map_bg[this.os2_wx + 16][this.os2_wy + i]],
						544,
						32 + i * 32,
						this.ap
					);
				}
			}
		} else if (nx < this.os2_wx) {
			this.g2.copyArea(0, 32, 544, 352, 32, 0);
			this.os2_wx = nx;
			for (var i = 0; i <= 10; i++) {
				if (this.map_bg[this.os2_wx][this.os2_wy + i] > 0) {
					this.g2.drawImage(this.hi[this.map_bg[this.os2_wx][this.os2_wy + i]], 32, 32 + i * 32, this.ap);
				}
			}
		}

		var localImage = this.hi[90 + paramInt];
		for (var i = 0; i <= 10; i++) {
			for (var j = 0; j <= 16; j++) {
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
						if (paramInt == 0 || paramInt == 2) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 96);
						} else {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 97);
						}
						break;
					case 8:
						if (paramInt == 0) {
							if (this.map_bg[this.os2_wx + j - 1][this.os2_wy + i] == 4) {
								this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
								if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max) {
									this.gg.drawPT2(32 + j * 32, 32 + i * 32, 99);
								} else {
									this.gg.drawPT2(32 + j * 32, 32 + i * 32, 95);
								}
							} else if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max) {
								this.gg.drawBG2(32 + j * 32, 32 + i * 32, 99);
							} else {
								this.gg.drawBG2(32 + j * 32, 32 + i * 32, 95);
							}
						} else if (this.map_bg[this.os2_wx + j - 1][this.os2_wy + i] == 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max) {
								this.gg.drawPT2(32 + j * 32, 32 + i * 32, 98);
							} else {
								this.gg.drawPT2(32 + j * 32, 32 + i * 32, 94);
							}
						} else if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 98);
						} else {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 94);
						}
						break;
					case 9:
						if (this.map_bg[this.os2_wx + j - 1][this.os2_wy + i] == 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							this.gg.os2_g.drawImage(localImage, 32 + j * 32, 32 + i * 32, this.gg.ap);
						} else {
							this.g2.setColor(this.gg.backcolor);
							this.gg.os2_g.fillRect(32 + j * 32, 32 + i * 32, 32, 32);
							this.gg.os2_g.drawImage(localImage, 32 + j * 32, 32 + i * 32, this.gg.ap);
						}
						break;
				}
			}
		}
		this.gg.os_g.drawImage(this.gg.os2_img, -32 - xmod, -32 - ymod, this.ap);
	}

	getBGCode(paramInt1, paramInt2) {
		return this.map_bg[paramInt1 >> 5][paramInt2 >> 5];
	}

	putBGCode(paramInt1, paramInt2, paramInt3) {
		this.map_bg[paramInt1][paramInt2] = paramInt3;
		if (
			this.os2_wx <= paramInt1 &&
			this.os2_wx + 16 >= paramInt1 &&
			this.os2_wy <= paramInt2 &&
			this.os2_wy + 10 >= paramInt2
		) {
			this.gg.drawBG2((paramInt1 - this.os2_wx) * 32 + 32, (paramInt2 - this.os2_wy) * 32 + 32, paramInt3);
		}
	}
}

export { MapSystem };
