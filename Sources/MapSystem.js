import { createNDimensionArray, rightShiftIgnoreSign } from "./GlobalFunctions";
import { Color } from "./ImageBuff";

function MapSystem(width, height, gamegraphics, mainprogram)
{
	this.width = width;
	this.height = height;
	this.gg = gamegraphics;
	this.mp = mainprogram;
	this.map_bg = createNDimensionArray(this.width, this.height);
	this.map_bg_layer = createNDimensionArray(this.width, this.height);
	this.map_string = new Array(this.height);
	this.map_string_layer = new Array(this.height);
	this.wx = undefined;
	this.wy = undefined;
	this.wx_mini = undefined;
	this.wy_mini = undefined;
	this.wx_max = undefined;
	this.wy_max = undefined;
	this.os2_wx = undefined;
	this.os2_wy = undefined;
	this.bg_space = "";
	this.hi = this.gg.spt_img[0];
	this.g2 = this.gg.os2_g;
	this.ap = this.gg.ap;
	this.gazou_x = 0;
	this.gazou_y = 0;
	this.second_gazou_x = 0;
	this.second_gazou_y = 0;

	for (var i = 0; i <= this.width; i++) {
		this.bg_space += ".";
	}
	this.init();
}

MapSystem.prototype.init = function()
{
	this.wx = 0;
	this.wy = 0;
	this.os2_wx = 0;
	this.os2_wy = 0;
	for (var j = 0; j < this.height; j++) {
		for (var i = 0; i < this.width; i++) {
			this.map_bg[i][j] = 0;
			this.map_bg_layer[i][j] = 0;
		}
	}
	for (j = 0; j < this.height; j++) {
		this.map_string[j] = this.bg_space;
		this.map_string_layer[j] = (this.bg_space + this.bg_space);
	}
}

MapSystem.prototype.setBank = function(paramInt)
{
	var byte0;
	if (paramInt == 1) {
		byte0 = 40;
	}
	else if (paramInt == 2) {
		byte0 = 50;
	}
	else if (paramInt == 4) {
		byte0 = 60;
	}
	else {
		byte0 = 30;
	}
	this.gg.spt_img[0][8] = this.gg.spt_img[0][0];
	this.gg.spt_img[0][31] = this.gg.spt_img[0][0];
	for (var i = 0; i <= 7; i++) {
		this.gg.spt_img[0][10 + i] = this.gg.spt_img[0][byte0 + i];
	}
}

MapSystem.prototype.drawMap = function(paramInt1, paramInt2)
{
	this.wx = paramInt1;
	this.wy = paramInt2;
	var k = this.wx % 32;
	var m = this.wy % 32;
	this.os2_wx = rightShiftIgnoreSign(this.wx, 5);
	this.os2_wy = rightShiftIgnoreSign(this.wy, 5);
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

MapSystem.prototype.drawMapLayer = function(paramInt1, paramInt2, paramInt3, paramInt4, paramInt5)
{
	var localImage;
	if (this.mp.setbacki_f) {
		localImage = this.mp.setbacki_img;
	}
	else {
		localImage = this.gg.li[3 + this.mp.stage_haikei];
	}
	this.wx = paramInt1;
	this.wy = paramInt2;
	var k = this.wx % 32;
	var m = this.wy % 32;
	this.os2_wx = rightShiftIgnoreSign(this.wx, 5);
	this.os2_wy = rightShiftIgnoreSign(this.wy, 5);
	var n;
	if ((paramInt5 == 3) || (paramInt5 == 4)) {
		this.gg.os2_g.drawImage(this.gg.os_img, 32 + k, 32 + m, this.gg.ap);
	}
	else {
		this.gg.fill2();
		var i1;
		if ((this.mp.second_gazou_visible) && (this.mp.second_gazou_priority == 1) &&
			(this.mp.second_gazou_img != null)) {
			if (this.mp.second_gazou_scroll == 2) {
				n = -(rightShiftIgnoreSign(this.wx - 32, 2) % 512);
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + n, m + 32, this.ap);
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + n + 512, m + 32, this.ap);
			}
			else if (this.mp.second_gazou_scroll == 3) {
				n = -(rightShiftIgnoreSign(this.wx - 32, 1) % 512);
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + n, m + 32, this.ap);
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + n + 512, m + 32, this.ap);
			}
			else if (this.mp.second_gazou_scroll == 4) {
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
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + this.second_gazou_x, m + 32 + this.second_gazou_y, this.ap);
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + this.second_gazou_x + 512, m + 32 + this.second_gazou_y, this.ap);
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + this.second_gazou_x, m + 32 + this.second_gazou_y + 320, this.ap);
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + this.second_gazou_x + 512, m + 32 + this.second_gazou_y + 320, this.ap);
			}
			else if (this.mp.second_gazou_scroll == 5) {
				n = -(rightShiftIgnoreSign((this.wx - 32) * 3, 1) % 512);
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + n, m + 32, this.ap);
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + n + 512, m + 32, this.ap);
			}
			else if (this.mp.second_gazou_scroll == 6) {
				n = -(rightShiftIgnoreSign((this.wx - 32) * 3, 1) % 512);
				i1 = -(this.wy - 320);
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + n, m + 32 + i1, this.ap);
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + n + 512, m + 32 + i1, this.ap);
			}
			else if (this.mp.second_gazou_scroll == 7) {
				n = -((this.wx - 32) % 512);
				i1 = -((this.wy - 320) % 320);
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + n, m + 32 + i1, this.ap);
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + n + 512, m + 32 + i1, this.ap);
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + n, m + 32 + i1 + 320, this.ap);
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + n + 512, m + 32 + i1 + 320, this.ap);
			}
			else if (this.mp.second_gazou_scroll == 8) {
				n = this.mp.second_gazou_scroll_x + 32 - this.wx;
				i1 = this.mp.second_gazou_scroll_y + 320 - this.wy;
				if ((n < 512) && (i1 < 320)) {
					this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32 + n, m + 32 + i1, this.ap);
				}
			}
			else {
				this.gg.os2_g.drawImage(this.mp.second_gazou_img, k + 32, m + 32, this.ap);
			}
		}
		if (localImage != null) {
			if (paramInt4 == 2) {
				n = -(rightShiftIgnoreSign(this.wx - 32, 2) % 512);


				this.gg.os2_g.drawImage(localImage, k + 32 + n, m + 32, this.ap);
				this.gg.os2_g.drawImage(localImage, k + 32 + n + 512, m + 32, this.ap);
			}
			else if (paramInt4 == 3) {
				this.gazou_x -= 2;
				if (this.gazou_x <= -512) {
					this.gazou_x += 512;
				}
				this.gg.os2_g.drawImage(localImage, k + 32 + this.gazou_x, m + 32, this.ap);
				this.gg.os2_g.drawImage(localImage, k + 32 + this.gazou_x + 512, m + 32, this.ap);
			}
			else if (paramInt4 == 4) {
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
				this.gg.os2_g.drawImage(localImage, k + 32 + this.gazou_x, m + 32 + this.gazou_y, this.ap);
				this.gg.os2_g.drawImage(localImage, k + 32 + this.gazou_x + 512, m + 32 + this.gazou_y, this.ap);
				this.gg.os2_g.drawImage(localImage, k + 32 + this.gazou_x, m + 32 + this.gazou_y + 320, this.ap);
				this.gg.os2_g.drawImage(localImage, k + 32 + this.gazou_x + 512, m + 32 + this.gazou_y + 320, this.ap);
			}
			else if (paramInt4 == 5) {
				n = -(rightShiftIgnoreSign(this.wy - 320, 1) % 320);

				this.gg.os2_g.drawImage(localImage, k + 32, m + 32 + n, this.ap);
				this.gg.os2_g.drawImage(localImage, k + 32, m + 32 + n + 320, this.ap);
			}
			else if (paramInt4 == 6) {
				n = -(rightShiftIgnoreSign(this.wy - 320, 1) % 320);
				i1 = -(rightShiftIgnoreSign(this.wx - 32, 1) % 512);

				this.gg.os2_g.drawImage(localImage, k + 32 + i1, m + 32 + n, this.ap);
				this.gg.os2_g.drawImage(localImage, k + 32 + i1 + 512, m + 32 + n, this.ap);
				this.gg.os2_g.drawImage(localImage, k + 32 + i1, m + 32 + n + 320, this.ap);
				this.gg.os2_g.drawImage(localImage, k + 32 + i1 + 512, m + 32 + n + 320, this.ap);
			}
			else if (paramInt4 == 7) {
				n = -((this.wy - 320) % 320);
				i1 = -((this.wx - 32) % 512);

				this.gg.os2_g.drawImage(localImage, k + 32 + i1, m + 32 + n, this.ap);
				this.gg.os2_g.drawImage(localImage, k + 32 + i1 + 512, m + 32 + n, this.ap);
				this.gg.os2_g.drawImage(localImage, k + 32 + i1, m + 32 + n + 320, this.ap);
				this.gg.os2_g.drawImage(localImage, k + 32 + i1 + 512, m + 32 + n + 320, this.ap);
			}
			else if (paramInt4 == 8) {
				n = -(rightShiftIgnoreSign(this.wy - 320, 1) % 640);
				i1 = -(rightShiftIgnoreSign(this.wx - 32, 1) % 512);

				this.gg.os2_g.drawImage(localImage, k + 32 + i1, m + 32 + n, this.ap);
				this.gg.os2_g.drawImage(localImage, k + 32 + i1 + 512, m + 32 + n, this.ap);
			}
			else if (paramInt4 == 9) {
				n = -(rightShiftIgnoreSign(this.wy - 320, 1) % 640);
				i1 = -(rightShiftIgnoreSign(this.wx - 32, 1) % 1024);

				this.gg.os2_g.drawImage(localImage, k + 32 + i1, m + 32 + n, this.ap);
				this.gg.os2_g.drawImage(localImage, k + 32 + i1 + 1024, m + 32 + n, this.ap);
			}
			else if (paramInt4 == 10) {
				n = -(rightShiftIgnoreSign(this.wx - 32, 1) % 512);


				this.gg.os2_g.drawImage(localImage, k + 32 + n, m + 32, this.ap);
				this.gg.os2_g.drawImage(localImage, k + 32 + n + 512, m + 32, this.ap);
			}
			else if (paramInt4 == 11) {
				n = this.mp.gazou_scroll_x + 32 - this.wx;
				i1 = this.mp.gazou_scroll_y + 320 - this.wy;
				if ((n < 512) && (i1 < 320)) {
					this.gg.os2_g.drawImage(localImage, k + 32 + n, m + 32 + i1, this.ap);
				}
			}
			else {
				this.gg.os2_g.drawImage(localImage, k + 32, m + 32, this.ap);
			}
		}
	}
	if (paramInt5 == 2) {
		this.gg.os_g.drawImage(this.gg.os2_img, -32 - k, -32 - m, this.gg.ap);
		return;
	}
	var j;
	var i;
	if ((paramInt5 != 4) && (this.gg.layer_mode == 2)) {
		for (j = 0; j <= 10; j++) {
			for (i = 0; i <= 16; i++) {
				n = this.map_bg_layer[this.os2_wx + i][this.os2_wy + j];
				if ((n > 0) && (n < 255)) {
					this.gg.drawMapchip2(32 + i * 32, 32 + j * 32, this.map_bg_layer[this.os2_wx + i][this.os2_wy + j]);
				}
			}
		}
	}
	if (paramInt5 != 3) {
		for (j = 0; j <= 10; j++) {
			for (i = 0; i <= 16; i++) {
				n = this.map_bg[this.os2_wx + i][this.os2_wy + j];
				if (this.gg.layer_mode == 2) {
					if (this.mp.clear_type == 3) {
						if ((n != 4) || (this.mp.water_visible != 2)) {
							if ((n == 29) || (n == 4)) {
								n = 0;
							}
						}
					}
					else if ((n != 4) || (this.mp.water_visible != 2)) {
						if ((n == 29) || (n == 15) || (n == 10) || (n == 4) || (n == 18) || (n == 19)) {
							n = 0;
						}
					}
				}
				else if (this.mp.clear_type == 3) {
					if ((n == 29) || (n == 4)) {
						n = 0;
					}
				}
				if (n == 7) {
					if ((paramInt3 == 0) || (paramInt3 == 2)) {
						n = 96;
					}
					else {
						n = 97;
					}
				}
				else if (n == 9) {
					n = 90 + paramInt3;
					if (this.gg.layer_mode != 2) {
						if (this.map_bg[this.os2_wx + i - 1][this.os2_wy + j] == 4) {
							this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
						}
					}
					else if ((this.mp.water_visible == 2) &&
						(this.map_bg[this.os2_wx + i - 1][this.os2_wy + j] == 4)) {
						this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
					}
				}
				else if (n == 8) {
					if (((this.mp.clear_type != 2) && (this.mp.clear_type != 3)) || (this.mp.coin_kazu <= 0)) {
						if ((this.mp.stage_max >= 2) && (this.mp.stage >= this.mp.stage_max)) {
							if (paramInt3 >= 2) {
								n = 98;
							}
							else {
								n = 99;
							}
							if (this.gg.layer_mode != 2) {
								if (this.map_bg[this.os2_wx + i - 1][this.os2_wy + j] == 4) {
									this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
								}
							}
							else if ((this.mp.water_visible == 2) &&
								(this.map_bg[this.os2_wx + i - 1][this.os2_wy + j] == 4)) {
								this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
							}
						}
						else {
							if (paramInt3 >= 2) {
								n = 95;
							}
							else {
								n = 94;
							}
							if (this.gg.layer_mode != 2) {
								if (this.map_bg[this.os2_wx + i - 1][this.os2_wy + j] == 4) {
									this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
								}
							}
							else if ((this.mp.water_visible == 2) &&
								(this.map_bg[this.os2_wx + i - 1][this.os2_wy + j] == 4)) {
								this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
							}
						}
					}
				}
				else if (n == 10) {
					if (this.map_bg[this.os2_wx + i - 1][this.os2_wy + j] == 4) {
						this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
						this.gg.drawPT2(32 + i * 32, 32 + j * 32, n);

						n = 0;
					}
				}
				else if (n == 18) {
					if (this.mp.map_data_option[this.os2_wx + i][this.os2_wy + j] == 1) {
						n = 0;


						this.gg.os2_g.setColor(Color.white);
						this.gg.os2_g.drawLine(32 + i * 32, 32 + j * 32 + 31, 32 + i * 32 + 31, 32 + j * 32);
					}
					else if (this.map_bg[this.os2_wx + i][this.os2_wy + j - 1] == 4) {
						this.gg.drawPT2(32 + i * 32, 32 + j * 32, 4);
						this.gg.drawPT2(32 + i * 32, 32 + j * 32, n);

						n = 0;
					}
				}
				else if (n == 19) {
					if (this.mp.map_data_option[this.os2_wx + i][this.os2_wy + j] == 1) {
						n = 0;


						this.gg.os2_g.setColor(Color.white);
						this.gg.os2_g.drawLine(32 + i * 32, 32 + j * 32, 32 + i * 32 + 31, 32 + j * 32 + 31);
					}
					else if (this.map_bg[this.os2_wx + i][this.os2_wy + j - 1] == 4) {
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
	this.gg.os_g.drawImage(this.gg.os2_img, -32 - k, -32 - m, this.gg.ap);
}

MapSystem.prototype.drawMapScroll = function(paramInt)
{
	var xmod = this.wx % 32;
	var ymod = this.wy % 32;
	var nx = rightShiftIgnoreSign(this.wx, 5);
	var ny = rightShiftIgnoreSign(this.wy, 5);
	if (nx > this.os2_wx + 1 || nx < this.os2_wx - 1 || ny > this.os2_wy + 1 || ny < this.os2_wy - 1) {
		this.drawMap(this.wx, this.wy);
	}
	else if (ny > this.os2_wy) {
		if (nx > this.os2_wx) {
			this.g2.copyArea(64, 64, 544, 352, -32, -32);
			this.os2_wx = nx;
			this.os2_wy = ny;
			for (var i = 0; i <= 16; i++) {
				if (this.map_bg[this.os2_wx + i][this.os2_wy + 10] > 0) {
					this.g2.drawImage(this.hi[this.map_bg[this.os2_wx + i][this.os2_wy + 10]], 32 + i * 32, 352, this.ap);
				}
			}
			for (var i = 0; i <= 9; i++) {
				if (this.map_bg[this.os2_wx + 16][this.os2_wy + i] > 0) {
					this.g2.drawImage(this.hi[this.map_bg[this.os2_wx + 16][this.os2_wy + i]], 544, 32 + i * 32, this.ap);
				}
			}
		}
		else if (nx < this.os2_wx) {
			this.g2.copyArea(0, 64, 544, 352, 32, -32);
			this.os2_wx = nx;
			this.os2_wy = ny;
			for (var i = 0; i <= 16; i++) {
				if (this.map_bg[this.os2_wx + i][this.os2_wy + 10] > 0) {
					this.g2.drawImage(this.hi[this.map_bg[this.os2_wx + i][this.os2_wy + 10]], 32 + i * 32, 352, this.ap);
				}
			}
			for (var i = 0; i <= 9; i++) {
				if (this.map_bg[this.os2_wx][this.os2_wy + i] > 0) {
					this.g2.drawImage(this.hi[this.map_bg[this.os2_wx][this.os2_wy + i]], 32, 32 + i * 32, this.ap);
				}
			}
		}
		else {
			this.g2.copyArea(32, 64, 544, 352, 0, -32);
			this.os2_wy = ny;
			for (var i = 0; i <= 16; i++) {
				if (this.map_bg[this.os2_wx + i][this.os2_wy + 10] > 0) {
					this.g2.drawImage(this.hi[this.map_bg[this.os2_wx + i][this.os2_wy + 10]], 32 + i * 32, 352, this.ap);
				}
			}
		}
	}
	else if (ny < this.os2_wy) {
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
					this.g2.drawImage(this.hi[this.map_bg[this.os2_wx + 16][this.os2_wy + i]], 544, 32 + i * 32, this.ap);
				}
			}
		}
		else if (nx < this.os2_wx) {
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
		}
		else {
			this.g2.copyArea(32, 0, 544, 352, 0, 32);
			this.os2_wy = ny;
			for (var i = 0; i <= 16; i++) {
				if (this.map_bg[this.os2_wx + i][this.os2_wy] > 0) {
					this.g2.drawImage(this.hi[this.map_bg[this.os2_wx + i][this.os2_wy]], 32 + i * 32, 32, this.ap);
				}
			}
		}
	}
	else if (nx > this.os2_wx) {
		this.g2.copyArea(64, 32, 544, 352, -32, 0);
		this.os2_wx = nx;
		for (var i = 0; i <= 10; i++) {
			if (this.map_bg[this.os2_wx + 16][this.os2_wy + i] > 0) {
				this.g2.drawImage(this.hi[this.map_bg[this.os2_wx + 16][this.os2_wy + i]], 544, 32 + i * 32, this.ap);
			}
		}
	}
	else if (nx < this.os2_wx) {
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
					}
					else {
						this.gg.drawBG2(32 + j * 32, 32 + i * 32, 97);
					}
					break;
				case 8:
					if (paramInt == 0) {
						if (this.map_bg[this.os2_wx + j - 1][this.os2_wy + i] == 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
							if ((this.mp.clear_type != 2 && this.mp.clear_type != 3) || this.mp.coin_kazu <= 0) {
								if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max) {
									this.gg.drawPT2(32 + j * 32, 32 + i * 32, 99);
								}
								else {
									this.gg.drawPT2(32 + j * 32, 32 + i * 32, 95);
								}
							}
						}
						else if ((this.mp.clear_type != 2 && this.mp.clear_type != 3) || this.mp.coin_kazu <= 0) {
							if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max) {
								this.gg.drawBG2(32 + j * 32, 32 + i * 32, 99);
							}
							else {
								this.gg.drawBG2(32 + j * 32, 32 + i * 32, 95);
							}
						}
					}
					else if (this.map_bg[this.os2_wx + j - 1][this.os2_wy + i] == 4) {
						this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
						if ((this.mp.clear_type != 2 && this.mp.clear_type != 3) || this.mp.coin_kazu <= 0) {
							if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max) {
								this.gg.drawPT2(32 + j * 32, 32 + i * 32, 98);
							}
							else {
								this.gg.drawPT2(32 + j * 32, 32 + i * 32, 94);
							}
						}
					}
					else if ((this.mp.clear_type != 2 && this.mp.clear_type != 3) || this.mp.coin_kazu <= 0) {
						if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 98);
						}
						else {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 94);
						}
					}
					break;
				case 9:
					if (this.map_bg[this.os2_wx + j - 1][this.os2_wy + i] == 4) {
						this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
						this.gg.os2_g.drawImage(localImage, 32 + j * 32, 32 + i * 32, this.gg.ap);
					}
					else {
						this.g2.setColor(this.gg.backcolor);
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
						}
						else {
							this.gg.os2_g.setColor(this.gg.backcolor);

							this.gg.os2_g.fillRect(32 + j * 32, 32 + i * 32, 32, 32);
						}
						this.gg.os2_g.setColor(Color.white);
						this.gg.os2_g.drawLine(32 + j * 32, 32 + i * 32 + 31, 32 + j * 32 + 31, 32 + i * 32);
					}
					else if (this.map_bg[this.os2_wx + j][this.os2_wy + i - 1] == 4) {
						this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
						this.gg.drawPT2(32 + j * 32, 32 + i * 32, 18);
					}
					break;
				case 19:
					if (this.mp.map_data_option[this.os2_wx + j][this.os2_wy + i] == 1) {
						if (this.map_bg[this.os2_wx + j][this.os2_wy + i - 1] == 4) {
							this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
						}
						else {
							this.gg.os2_g.setColor(this.gg.backcolor);
							this.gg.os2_g.fillRect(32 + j * 32, 32 + i * 32, 32, 32);
						}
						this.gg.os2_g.setColor(Color.white);
						this.gg.os2_g.drawLine(32 + j * 32, 32 + i * 32, 32 + j * 32 + 31, 32 + i * 32 + 31);
					}
					else if (this.map_bg[this.os2_wx + j][this.os2_wy + i - 1] == 4) {
						this.gg.drawBG2(32 + j * 32, 32 + i * 32, 4);
						this.gg.drawPT2(32 + j * 32, 32 + i * 32, 19);
					}
					break;
			}
		}
	}
	this.gg.os_g.drawImage(this.gg.os2_img, -32 - xmod, -32 - ymod, this.ap);
}

MapSystem.prototype.getBGCode = function(paramInt1, paramInt2)
{
	return this.map_bg[rightShiftIgnoreSign(paramInt1, 5)][rightShiftIgnoreSign(paramInt2, 5)];
}

MapSystem.prototype.putBGCode = function(paramInt1, paramInt2, paramInt3)
{
	this.map_bg[paramInt1][paramInt2] = paramInt3;
	if (this.os2_wx <= paramInt1 && this.os2_wx + 16 >= paramInt1 && this.os2_wy <= paramInt2 && this.os2_wy + 10 >= paramInt2) {
		this.gg.drawBG2((paramInt1 - this.os2_wx) * 32 + 32, (paramInt2 - this.os2_wy) * 32 + 32, paramInt3);
	}
}

export { MapSystem };
