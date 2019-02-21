import { Color, Font } from "./ImageBuff";
import { rightShiftIgnoreSign } from "./GlobalFunctions";

import { drawHitokotoMessage } from "./drawGamescreenSeparated";

/**
 * ゲーム画面を描画します
 */
export const drawGamescreen = function() {
	var ai = new Array(26);
	var ai1 = new Array(26);
	if (this.gg.layer_mode == 2 || this.mcs_haikei_visible == 1)
		this.maps.drawMapLayer(this.maps.wx, this.maps.wy, this.g_ac2, this.gazou_scroll, 1);
	else if (this.setmapc_f) {
		this.setmapc_f = false;
		this.maps.drawMap(this.maps.wx, this.maps.wy);
	} else {
		this.maps.drawMapScroll(this.g_ac2);
	}
	var i6 = this.maps.wx;
	var j6 = this.maps.wy;
	this.co_j.wx = this.co_j.x - this.maps.wx;
	this.co_j.wy = this.co_j.y - this.maps.wy;
	if (this.ana_kazu > 0) {
		for (var i = 0; i <= 11; i++) {
			if (this.ana_c[i] <= 0) continue;
			if (this.ana_c[i] <= 135 && this.ana_c[i] >= 129) {
				var l7 = (136 - this.ana_c[i]) * 4;
				this.gg.drawPatternCut(this.ana_x[i] * 32 - i6, this.ana_y[i] * 32 - j6, 20, 0, l7);
				continue;
			}
			if (this.ana_c[i] <= 235 && this.ana_c[i] >= 229) {
				var i8 = (236 - this.ana_c[i]) * 4;
				this.gg.drawPatternCut(this.ana_x[i] * 32 - i6, this.ana_y[i] * 32 - j6, 20, 0, i8 * -1);
				continue;
			}
			if (this.ana_c[i] >= 1 && this.ana_c[i] <= 15) {
				var j8 = this.ana_c[i] * 2;
				this.gg.drawPatternCut(this.ana_x[i] * 32 - i6, this.ana_y[i] * 32 - j6, 20, 0, j8);
			}
		}
	}
	if (this.souko_count1 >= 1) {
		for (var j = 0; j <= this.a_kazu; j++)
			if (this.co_a[j].pt == 3300 && this.co_a[j].gf) {
				var characterobject = this.co_a[j];
				var l12 = characterobject.x - i6;
				var j15 = characterobject.y - j6;
				switch (characterobject.pt) {
					default:
						break;

					case 3300:
						if (this.g_c3 >= 3) {
							this.gg.os_g.setColor(this.gamecolor_firebar1);
							this.gg.os_g.drawRect(l12, j15, 95, 63);
							this.gg.os_g.drawLine(l12, j15, l12 + 95, j15 + 63);
							this.gg.os_g.drawLine(l12, j15 + 63, l12 + 95, j15);
						}
						break;
				}
			}
	}
	if (this.a_hf) {
		for (var k = 0; k <= this.a_kazu; k++)
			if (this.co_a[k].gf) {
				var characterobject1 = this.co_a[k];
				var i13 = characterobject1.x - i6;
				var k15 = characterobject1.y - j6;
				switch (characterobject1.pt) {
					case 850:
					case 2700:
					default:
						break;

					case 100:
						this.hg.drawImage(this.hi[190], i13, k15, this.ap);
						this.hg.drawImage(this.hi[191], i13 + 32, k15, this.ap);
						this.hg.drawImage(this.hi[192], i13 + 64, k15, this.ap);
						break;

					case 200:
						this.hg.drawImage(this.hi[76], i13, k15, this.ap);
						this.hg.drawImage(this.hi[77], i13 + 32, k15, this.ap);
						this.hg.drawImage(this.hi[86], i13, k15 + 32, this.ap);
						this.hg.drawImage(this.hi[87], i13 + 32, k15 + 32, this.ap);
						break;

					case 210:
						this.hg.drawImage(this.hi[78], i13, k15, this.ap);
						this.hg.drawImage(this.hi[79], i13 + 32, k15, this.ap);
						this.hg.drawImage(this.hi[88], i13, k15 + 32, this.ap);
						this.hg.drawImage(this.hi[89], i13 + 32, k15 + 32, this.ap);
						break;

					case 300:
						if (characterobject1.c3 == 100) {
							var graphics2 = this.gg.os_img.getGraphics();
							var i18 = i13 + 32;
							var j24 = k15 + 16;
							graphics2.rotate(3.1415926535897931, i18, j24);
							graphics2.drawImage(this.hi[60], i13, k15, this.ap);
							graphics2.drawImage(this.hi[61], i13 + 32, k15, this.ap);
							graphics2.dispose();
							break;
						}
						if (characterobject1.c3 == 200) {
							var graphics21 = this.gg.os_img.getGraphics();
							var j18 = i13 + 32;
							var k24 = k15 + 32;
							graphics21.rotate(4.7123889803846898, j18, k24);
							graphics21.drawImage(this.hi[60], i13, k15, this.ap);
							graphics21.drawImage(this.hi[61], i13 + 32, k15, this.ap);
							graphics21.dispose();
							break;
						}
						if (characterobject1.c3 == 300) {
							var graphics22 = this.gg.os_img.getGraphics();
							var k18 = i13 + 16;
							var l24 = k15 + 16;
							graphics22.rotate(1.5707963267948966, k18, l24);
							graphics22.drawImage(this.hi[60], i13, k15, this.ap);
							graphics22.drawImage(this.hi[61], i13 + 32, k15, this.ap);
							graphics22.dispose();
						} else {
							this.hg.drawImage(this.hi[60], i13, k15, this.ap);
							this.hg.drawImage(this.hi[61], i13 + 32, k15, this.ap);
						}
						break;

					case 310:
						if (characterobject1.c3 == 101) {
							var graphics23 = this.gg.os_img.getGraphics();
							var l18 = i13 + 32;
							var i25 = k15 + 16;
							graphics23.rotate(3.1415926535897931, l18, i25);
							graphics23.drawImage(this.hi[62], i13, k15, this.ap);
							graphics23.drawImage(this.hi[63], i13 + 32, k15, this.ap);
							graphics23.dispose();
							break;
						}
						if (characterobject1.c3 == 201) {
							var graphics24 = this.gg.os_img.getGraphics();
							var i19 = i13 + 32;
							var j25 = k15 + 32;
							graphics24.rotate(4.7123889803846898, i19, j25);
							graphics24.drawImage(this.hi[62], i13, k15, this.ap);
							graphics24.drawImage(this.hi[63], i13 + 32, k15, this.ap);
							graphics24.dispose();
							break;
						}
						if (characterobject1.c3 == 301) {
							var graphics25 = this.gg.os_img.getGraphics();
							var j19 = i13 + 16;
							var k25 = k15 + 16;
							graphics25.rotate(1.5707963267948966, j19, k25);
							graphics25.drawImage(this.hi[62], i13, k15, this.ap);
							graphics25.drawImage(this.hi[63], i13 + 32, k15, this.ap);
							graphics25.dispose();
						} else {
							this.hg.drawImage(this.hi[62], i13, k15, this.ap);
							this.hg.drawImage(this.hi[63], i13 + 32, k15, this.ap);
						}
						break;

					case 320:
						if (characterobject1.c3 == 102) {
							var graphics26 = this.gg.os_img.getGraphics();
							var k19 = i13 + 32;
							var l25 = k15 + 16;
							graphics26.rotate(3.1415926535897931, k19, l25);
							graphics26.drawImage(this.hi[64], i13, k15, this.ap);
							graphics26.drawImage(this.hi[65], i13 + 32, k15, this.ap);
							graphics26.dispose();
							break;
						}
						if (characterobject1.c3 == 202) {
							var graphics27 = this.gg.os_img.getGraphics();
							var l19 = i13 + 32;
							var i26 = k15 + 32;
							graphics27.rotate(4.7123889803846898, l19, i26);
							graphics27.drawImage(this.hi[64], i13, k15, this.ap);
							graphics27.drawImage(this.hi[65], i13 + 32, k15, this.ap);
							graphics27.dispose();
							break;
						}
						if (characterobject1.c3 == 302) {
							var graphics28 = this.gg.os_img.getGraphics();
							var i20 = i13 + 16;
							var j26 = k15 + 16;
							graphics28.rotate(1.5707963267948966, i20, j26);
							graphics28.drawImage(this.hi[64], i13, k15, this.ap);
							graphics28.drawImage(this.hi[65], i13 + 32, k15, this.ap);
							graphics28.dispose();
						} else {
							this.hg.drawImage(this.hi[64], i13, k15, this.ap);
							this.hg.drawImage(this.hi[65], i13 + 32, k15, this.ap);
						}
						break;

					case 330:
						if (characterobject1.c3 == 103) {
							var graphics29 = this.gg.os_img.getGraphics();
							var j20 = i13 + 32;
							var k26 = k15 + 16;
							graphics29.rotate(3.1415926535897931, j20, k26);
							graphics29.drawImage(this.hi[66], i13, k15, this.ap);
							graphics29.drawImage(this.hi[67], i13 + 32, k15, this.ap);
							graphics29.dispose();
							break;
						}
						if (characterobject1.c3 == 203) {
							var graphics210 = this.gg.os_img.getGraphics();
							var k20 = i13 + 32;
							var l26 = k15 + 32;
							graphics210.rotate(4.7123889803846898, k20, l26);
							graphics210.drawImage(this.hi[66], i13, k15, this.ap);
							graphics210.drawImage(this.hi[67], i13 + 32, k15, this.ap);
							graphics210.dispose();
							break;
						}
						if (characterobject1.c3 == 303) {
							var graphics211 = this.gg.os_img.getGraphics();
							var l20 = i13 + 16;
							var i27 = k15 + 16;
							graphics211.rotate(1.5707963267948966, l20, i27);
							graphics211.drawImage(this.hi[66], i13, k15, this.ap);
							graphics211.drawImage(this.hi[67], i13 + 32, k15, this.ap);
							graphics211.dispose();
						} else {
							this.hg.drawImage(this.hi[66], i13, k15, this.ap);
							this.hg.drawImage(this.hi[67], i13 + 32, k15, this.ap);
						}
						break;

					case 400:
						this.hg.drawImage(this.hi[183], i13, k15, this.ap);
						this.hg.drawImage(this.hi[184], i13 + 32, k15, this.ap);
						this.hg.drawImage(this.hi[185], i13 + 64, k15, this.ap);
						this.hg.drawImage(this.hi[193], i13, k15 + 32, this.ap);
						this.hg.drawImage(this.hi[194], i13 + 32, k15 + 32, this.ap);
						this.hg.drawImage(this.hi[195], i13 + 64, k15 + 32, this.ap);
						break;

					case 500:
						this.hg.drawImage(this.hi[180], i13, k15, this.ap);
						this.hg.drawImage(this.hi[181], i13 + 32, k15, this.ap);
						this.hg.drawImage(this.hi[182], i13 + 64, k15, this.ap);
						break;

					case 600:
						this.hg.drawImage(this.hi[188], i13, k15, this.ap);
						this.hg.drawImage(this.hi[189], i13 + 32, k15, this.ap);
						this.hg.drawImage(this.hi[198], i13, k15 + 32, this.ap);
						this.hg.drawImage(this.hi[199], i13 + 32, k15 + 32, this.ap);
						break;

					case 605:
						this.hg.drawImage(this.hih[1][189], i13, k15, this.ap);
						this.hg.drawImage(this.hih[1][188], i13 + 32, k15, this.ap);
						this.hg.drawImage(this.hih[1][199], i13, k15 + 32, this.ap);
						this.hg.drawImage(this.hih[1][198], i13 + 32, k15 + 32, this.ap);
						break;

					case 700:
						this.hg.drawImage(this.hi[32], i13, k15, this.ap);
						break;

					case 710:
						this.hg.drawImage(this.hi[33], i13, k15, this.ap);
						break;

					case 720:
						this.hg.drawImage(this.hi[34], i13, k15, this.ap);
						break;

					case 750:
						var graphics212 = this.gg.os_img.getGraphics();
						var i21 = i13 + 16;
						var j27 = k15 + 16;
						graphics212.rotate(4.7123889803846898, i21, j27);
						if (characterobject1.c3 > 0) graphics212.drawImage(this.hi[32], i13, k15, this.ap);
						else graphics212.drawImage(this.hi[33], i13, k15, this.ap);
						graphics212.dispose();
						break;

					case 751:
						var graphics213 = this.gg.os_img.getGraphics();
						var j21 = i13 + 16;
						var k27 = k15 + 16;
						graphics213.rotate(1.5707963267948966, j21, k27);
						if (characterobject1.c3 > 0) graphics213.drawImage(this.hi[32], i13, k15, this.ap);
						else graphics213.drawImage(this.hi[33], i13, k15, this.ap);
						graphics213.dispose();
						break;

					case 800:
						if (characterobject1.x >= this.co_j.x)
							this.hg.drawImage(this.hi[35 + characterobject1.c3], i13, k15, this.ap);
						else this.hg.drawImage(this.hih[1][35 + characterobject1.c3], i13, k15, this.ap);
						break;

					case 860:
						var byte0 = 39;
						if (characterobject1.c == 87) byte0 = 37;
						else if (characterobject1.c == 88) byte0 = 38;
						if (characterobject1.x >= this.co_j.x) this.hg.drawImage(this.hi[byte0], i13, k15, this.ap);
						else this.hg.drawImage(this.hih[1][byte0], i13, k15, this.ap);
						break;

					case 1100:
						i13 = Math.cos(((characterobject1.c3 + 90) * 6.2831853071795862) / 360) * 16;
						k15 = Math.sin(((characterobject1.c3 + 90) * 6.2831853071795862) / 360) * 16;
						this.vo_pa_x[0] = this.vo_x[k][0] - i6 + i13;
						this.vo_pa_y[0] = this.vo_y[k][0] - j6 + k15;
						this.vo_pa_x[1] = this.vo_x[k][0] - i6 - i13;
						this.vo_pa_y[1] = this.vo_y[k][0] - j6 - k15;
						this.vo_pa_x[2] = this.vo_x[k][1] - i6 - i13;
						this.vo_pa_y[2] = this.vo_y[k][1] - j6 - k15;
						this.vo_pa_x[3] = this.vo_x[k][1] - i6 + i13;
						this.vo_pa_y[3] = this.vo_y[k][1] - j6 + k15;
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						if (this.g_c2 >= 2) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							i13 = Math.cos(((characterobject1.c3 + 90) * 6.2831853071795862) / 360) * 10;
							k15 = Math.sin(((characterobject1.c3 + 90) * 6.2831853071795862) / 360) * 10;
							this.vo_pa_x[0] = this.vo_x[k][2] - i6 + i13;
							this.vo_pa_y[0] = this.vo_y[k][2] - j6 + k15;
							this.vo_pa_x[1] = this.vo_x[k][2] - i6 - i13;
							this.vo_pa_y[1] = this.vo_y[k][2] - j6 - k15;
							this.vo_pa_x[2] = this.vo_x[k][3] - i6 - i13;
							this.vo_pa_y[2] = this.vo_y[k][3] - j6 - k15;
							this.vo_pa_x[3] = this.vo_x[k][3] - i6 + i13;
							this.vo_pa_y[3] = this.vo_y[k][3] - j6 + k15;
							this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						}
						break;

					case 1200:
						this.vo_pa_x[0] =
							i13 + Math.cos(((characterobject1.vy + 180) * 3.1415926535897931) / 180) * 160;
						this.vo_pa_y[0] =
							k15 + Math.sin(((characterobject1.vy + 180) * 3.1415926535897931) / 180) * 160;
						this.vo_pa_x[1] = i13 + Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 160;
						this.vo_pa_y[1] = k15 + Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 160;
						this.vo_pa_x[2] =
							this.vo_pa_x[1] + Math.cos(((characterobject1.vy - 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[2] =
							this.vo_pa_y[1] + Math.sin(((characterobject1.vy - 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[3] =
							this.vo_pa_x[0] + Math.cos(((characterobject1.vy + 270) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[3] =
							this.vo_pa_y[0] + Math.sin(((characterobject1.vy + 270) * 3.1415926535897931) / 180) * 12;
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						this.vo_pa_x[0] = i13;
						this.vo_pa_y[0] = k15;
						this.vo_pa_x[1] = i13 - 16;
						this.vo_pa_y[1] = k15 + 128;
						this.vo_pa_x[2] = i13 + 16;
						this.vo_pa_y[2] = k15 + 128;
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 3);
						break;

					case 1300:
						this.vo_pa_x[0] = i13 + Math.cos(((characterobject1.vy + 20) * 3.1415926535897931) / 180) * 192;
						this.vo_pa_y[0] = k15 + Math.sin(((characterobject1.vy + 20) * 3.1415926535897931) / 180) * 192;
						this.vo_pa_x[1] = i13 + Math.cos(((characterobject1.vy - 20) * 3.1415926535897931) / 180) * 192;
						this.vo_pa_y[1] = k15 + Math.sin(((characterobject1.vy - 20) * 3.1415926535897931) / 180) * 192;
						this.vo_pa_x[2] =
							this.vo_pa_x[1] + Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[2] =
							this.vo_pa_y[1] + Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[3] =
							this.vo_pa_x[0] + Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[3] =
							this.vo_pa_y[0] + Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[4] = i13 + Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[4] = k15 + Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						var k21 = i13 + Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 80;
						var l27 = k15 + Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 80;
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.gg.os_g.drawLine(this.vo_pa_x[4], this.vo_pa_y[4], k21, l27);
						this.gg.os_g.drawLine(this.vo_pa_x[0], this.vo_pa_y[0], k21, l27);
						this.gg.os_g.drawLine(this.vo_pa_x[1], this.vo_pa_y[1], k21, l27);
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						break;

					case 1400:
						this.vo_pa_x[0] =
							i13 +
							Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 192 +
							Math.cos(((characterobject1.vy + 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[0] =
							k15 +
							Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 192 +
							Math.sin(((characterobject1.vy + 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[1] =
							i13 +
							Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 60 +
							Math.cos(((characterobject1.vy + 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[1] =
							k15 +
							Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 60 +
							Math.sin(((characterobject1.vy + 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[2] =
							i13 +
							Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 60 +
							Math.cos(((characterobject1.vy - 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[2] =
							k15 +
							Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 60 +
							Math.sin(((characterobject1.vy - 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[3] =
							i13 +
							Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 192 +
							Math.cos(((characterobject1.vy - 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[3] =
							k15 +
							Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 192 +
							Math.sin(((characterobject1.vy - 90) * 3.1415926535897931) / 180) * 12;
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						break;

					case 1500:
						if (characterobject1.c4 <= 0) break;
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						if (characterobject1.c3 == 1 || characterobject1.c3 == 11) {
							this.gg.os_g.fillRect(i13 + 8, k15, 48, characterobject1.c4);
							if (this.g_c2 >= 2 && characterobject1.c4 > 8) {
								this.gg.os_g.setColor(this.gamecolor_firebar2);
								this.gg.os_g.fillRect(i13 + 16, k15, 32, characterobject1.c4 - 8);
							}
							break;
						}
						if (characterobject1.c3 == 2 || characterobject1.c3 == 12) {
							this.gg.os_g.fillRect(i13 - characterobject1.c4, k15 + 8, characterobject1.c4, 48);
							if (this.g_c2 >= 2 && characterobject1.c4 > 8) {
								this.gg.os_g.setColor(this.gamecolor_firebar2);
								this.gg.os_g.fillRect(
									i13 - characterobject1.c4 + 8,
									k15 + 16,
									characterobject1.c4 - 8,
									32
								);
							}
							break;
						}
						if (characterobject1.c3 == 3 || characterobject1.c3 == 13) {
							this.gg.os_g.fillRect(i13, k15 + 8, characterobject1.c4, 48);
							if (this.g_c2 >= 2 && characterobject1.c4 > 8) {
								this.gg.os_g.setColor(this.gamecolor_firebar2);
								this.gg.os_g.fillRect(i13, k15 + 16, characterobject1.c4 - 8, 32);
							}
							break;
						}
						this.gg.os_g.fillRect(i13 + 8, k15 - characterobject1.c4, 48, characterobject1.c4);
						if (this.g_c2 >= 2 && characterobject1.c4 > 8) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							this.gg.os_g.fillRect(i13 + 16, k15 - characterobject1.c4 + 8, 32, characterobject1.c4 - 8);
						}
						break;

					case 1600:
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.gg.os_g.fillRect(i13, k15, 64, 96);
						if (this.g_c2 >= 2) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							this.gg.os_g.fillRect(i13 + 8, k15 + 8, 48, 80);
						}
						break;

					case 1700:
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.gg.os_g.fillRect(i13, k15, 96, 64);
						if (this.g_c2 >= 2) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							this.gg.os_g.fillRect(i13 + 8, k15 + 8, 80, 48);
						}
						break;

					case 1800:
						this.hg.drawImage(this.hi[26], i13, k15, this.ap);
						break;

					case 1900:
						this.vo_pa_x[0] = i13 + Math.cos(((characterobject1.vy + 6) * 3.1415926535897931) / 180) * 182;
						this.vo_pa_y[0] = k15 + Math.sin(((characterobject1.vy + 6) * 3.1415926535897931) / 180) * 182;
						this.vo_pa_x[1] = i13 + Math.cos(((characterobject1.vy - 6) * 3.1415926535897931) / 180) * 182;
						this.vo_pa_y[1] = k15 + Math.sin(((characterobject1.vy - 6) * 3.1415926535897931) / 180) * 182;
						this.vo_pa_x[2] = i13;
						this.vo_pa_y[2] = k15;
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 3);
						this.vo_pa_x[0] = i13 + Math.cos(((characterobject1.vy + 20) * 3.1415926535897931) / 180) * 192;
						this.vo_pa_y[0] = k15 + Math.sin(((characterobject1.vy + 20) * 3.1415926535897931) / 180) * 192;
						this.vo_pa_x[1] = i13 + Math.cos(((characterobject1.vy - 20) * 3.1415926535897931) / 180) * 192;
						this.vo_pa_y[1] = k15 + Math.sin(((characterobject1.vy - 20) * 3.1415926535897931) / 180) * 192;
						this.vo_pa_x[2] =
							this.vo_pa_x[1] + Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[2] =
							this.vo_pa_y[1] + Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[3] =
							this.vo_pa_x[0] + Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[3] =
							this.vo_pa_y[0] + Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[4] = i13 + Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[4] = k15 + Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						break;

					case 2000:
						this.vo_pa_x[0] =
							i13 +
							Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 12 +
							Math.cos(((characterobject1.vy + 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_y[0] =
							k15 +
							Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 12 +
							Math.sin(((characterobject1.vy + 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_x[1] =
							i13 +
							Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 12 +
							Math.cos(((characterobject1.vy - 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_y[1] =
							k15 +
							Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 12 +
							Math.sin(((characterobject1.vy - 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_x[2] =
							i13 +
							Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 182 +
							Math.cos(((characterobject1.vy - 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_y[2] =
							k15 +
							Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 182 +
							Math.sin(((characterobject1.vy - 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_x[3] =
							i13 +
							Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 182 +
							Math.cos(((characterobject1.vy + 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_y[3] =
							k15 +
							Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 182 +
							Math.sin(((characterobject1.vy + 90) * 3.1415926535897931) / 180) * 5;
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						break;

					case 2100:
						this.hg.drawImage(this.hi[212], i13, k15, this.ap);
						break;

					case 2110:
						this.hg.drawImage(this.hi[213], i13, k15, this.ap);
						break;

					case 2120:
						this.hg.drawImage(this.hi[214], i13, k15, this.ap);
						break;

					case 2130:
						this.hg.drawImage(this.hi[215], i13, k15, this.ap);
						break;

					case 2200:
						this.gg.os_g.setColor(this.gamecolor_mizunohadou);
						this.gg.os_g.fillOval(i13 + 16 - 19, k15 + 16 - 19, 38, 38);
						this.vo_pa_x[0] =
							i13 + 16 + Math.cos(((characterobject1.c4 + 90) * 3.1415926535897931) / 180) * 20;
						this.vo_pa_y[0] =
							k15 + 16 + Math.sin(((characterobject1.c4 + 90) * 3.1415926535897931) / 180) * 20;
						this.vo_pa_x[1] =
							i13 + 16 + Math.cos(((characterobject1.c4 - 90) * 3.1415926535897931) / 180) * 20;
						this.vo_pa_y[1] =
							k15 + 16 + Math.sin(((characterobject1.c4 - 90) * 3.1415926535897931) / 180) * 20;
						this.vo_pa_x[2] =
							i13 +
							16 +
							Math.cos((characterobject1.c4 * 3.1415926535897931) / 180) * 68 +
							Math.cos(((characterobject1.c4 - 90) * 3.1415926535897931) / 180) * 20;
						this.vo_pa_y[2] =
							k15 +
							16 +
							Math.sin((characterobject1.c4 * 3.1415926535897931) / 180) * 68 +
							Math.sin(((characterobject1.c4 - 90) * 3.1415926535897931) / 180) * 20;
						this.vo_pa_x[3] =
							i13 +
							16 +
							Math.cos((characterobject1.c4 * 3.1415926535897931) / 180) * 68 +
							Math.cos(((characterobject1.c4 + 90) * 3.1415926535897931) / 180) * 20;
						this.vo_pa_y[3] =
							k15 +
							16 +
							Math.sin((characterobject1.c4 * 3.1415926535897931) / 180) * 68 +
							Math.sin(((characterobject1.c4 + 90) * 3.1415926535897931) / 180) * 20;
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						if (characterobject1.c3 == 0 || characterobject1.c3 == 1) {
							this.vo_pa_x[0] = i13 + 16 - 6;
							this.vo_pa_y[0] = k15 + 16 - 4;
							this.vo_pa_x[1] = i13 + 16 + 6;
							this.vo_pa_y[1] = k15 + 16 - 4;
							this.vo_pa_x[2] = i13 + 16 + 12;
							this.vo_pa_y[2] = k15 + 32 + 12;
							this.vo_pa_x[3] = i13 + 16 - 12;
							this.vo_pa_y[3] = k15 + 32 + 12;
						} else if (characterobject1.c3 == 2) {
							this.vo_pa_x[0] = i13 + 16 - 6;
							this.vo_pa_y[0] = k15 + 16 + 4;
							this.vo_pa_x[1] = i13 + 16 + 6;
							this.vo_pa_y[1] = k15 + 16 + 4;
							this.vo_pa_x[2] = i13 + 16 + 12;
							this.vo_pa_y[2] = k15 - 32;
							this.vo_pa_x[3] = i13 + 16 - 12;
							this.vo_pa_y[3] = k15 - 32;
						} else if (characterobject1.c3 == 3) {
							this.vo_pa_x[0] = i13 + 16 - 4;
							this.vo_pa_y[0] = k15 + 16 - 6;
							this.vo_pa_x[1] = i13 + 16 - 4;
							this.vo_pa_y[1] = k15 + 16 + 6;
							this.vo_pa_x[2] = i13 + 64;
							this.vo_pa_y[2] = k15 + 16 + 12;
							this.vo_pa_x[3] = i13 + 64;
							this.vo_pa_y[3] = k15 + 16 - 12;
						} else {
							this.vo_pa_x[0] = i13 + 16 + 4;
							this.vo_pa_y[0] = k15 + 16 - 6;
							this.vo_pa_x[1] = i13 + 16 + 4;
							this.vo_pa_y[1] = k15 + 16 + 6;
							this.vo_pa_x[2] = i13 - 32;
							this.vo_pa_y[2] = k15 + 16 + 12;
							this.vo_pa_x[3] = i13 - 32;
							this.vo_pa_y[3] = k15 + 16 - 12;
						}
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						break;

					case 2300:
						if (this.control_parts_visible == 2 && characterobject1.c == 1900) {
							this.gg.os_g.setColor(Color.black);
							this.gg.os_g.fillRect(i13, k15, 32, 32);
							var s = "" + "S " + String(characterobject1.c3);
							this.gg.os_g.setColor(Color.white);
							this.gg.os_g.setFont(new Font("Dialog", 1, 12));
							this.gg.os_g.drawString(s, i13 + 2, k15 + this.moji_size + 4);
						}
						break;

					case 2400:
						if (characterobject1.c3 == 0) {
							var graphics214 = this.gg.os_img.getGraphics();
							graphics214.translate(i13 + 32, k15 + 64);
							graphics214.scale(characterobject1.vy / 100, characterobject1.vy / 100);
							if (this.g_c3 <= 3) {
								graphics214.drawImage(this.hi[76], -32, -64, this.ap);
								graphics214.drawImage(this.hi[77], 0, -64, this.ap);
								graphics214.drawImage(this.hi[86], -32, -32, this.ap);
								graphics214.drawImage(this.hi[87], 0, -32, this.ap);
							} else {
								graphics214.drawImage(this.hi[78], -32, -64, this.ap);
								graphics214.drawImage(this.hi[79], 0, -64, this.ap);
								graphics214.drawImage(this.hi[88], -32, -32, this.ap);
								graphics214.drawImage(this.hi[89], 0, -32, this.ap);
							}
							graphics214.dispose();
							break;
						}
						if (characterobject1.c3 == 1) {
							var graphics215 = this.gg.os_img.getGraphics();
							graphics215.translate(i13 + 32, k15);
							graphics215.scale(characterobject1.vy / 100, characterobject1.vy / 100);
							if (this.g_c3 <= 3) {
								graphics215.drawImage(this.hi[76], -32, 0, this.ap);
								graphics215.drawImage(this.hi[77], 0, 0, this.ap);
								graphics215.drawImage(this.hi[86], -32, 32, this.ap);
								graphics215.drawImage(this.hi[87], 0, 32, this.ap);
							} else {
								graphics215.drawImage(this.hi[78], -32, 0, this.ap);
								graphics215.drawImage(this.hi[79], 0, 0, this.ap);
								graphics215.drawImage(this.hi[88], -32, 32, this.ap);
								graphics215.drawImage(this.hi[89], 0, 32, this.ap);
							}
							graphics215.dispose();
							break;
						}
						if (characterobject1.c3 != 2) break;
						var graphics216 = this.gg.os_img.getGraphics();
						graphics216.translate(i13 + 32, k15 + 32);
						graphics216.scale(characterobject1.vy / 100, characterobject1.vy / 100);
						if (this.g_c3 <= 3) {
							graphics216.drawImage(this.hi[76], -32, -32, this.ap);
							graphics216.drawImage(this.hi[77], 0, -32, this.ap);
							graphics216.drawImage(this.hi[86], -32, 0, this.ap);
							graphics216.drawImage(this.hi[87], 0, 0, this.ap);
						} else {
							graphics216.drawImage(this.hi[78], -32, -32, this.ap);
							graphics216.drawImage(this.hi[79], 0, -32, this.ap);
							graphics216.drawImage(this.hi[88], -32, 0, this.ap);
							graphics216.drawImage(this.hi[89], 0, 0, this.ap);
						}
						graphics216.dispose();
						break;

					case 2500:
						var graphics217 = this.gg.os_img.getGraphics();
						graphics217.translate(i13, k15);
						graphics217.scale(1.5, 1.5);
						graphics217.rotate((characterobject1.vy * 3.1415926535897931) / 180, 0.0, 0.0);
						graphics217.drawImage(this.hi[183], -48, -32, this.ap);
						graphics217.drawImage(this.hi[184], -16, -32, this.ap);
						graphics217.drawImage(this.hi[185], 16, -32, this.ap);
						graphics217.drawImage(this.hi[193], -48, 0, this.ap);
						graphics217.drawImage(this.hi[194], -16, 0, this.ap);
						graphics217.drawImage(this.hi[195], 16, 0, this.ap);
						graphics217.dispose();
						break;

					case 2600:
						var graphics218 = this.gg.os_img.getGraphics();
						graphics218.translate(i13, k15);
						graphics218.scale(2.5, 2.5);
						graphics218.rotate((characterobject1.vy * 3.1415926535897931) / 180, 0.0, 0.0);
						graphics218.drawImage(this.hi[183], -48, -32, this.ap);
						graphics218.drawImage(this.hi[184], -16, -32, this.ap);
						graphics218.drawImage(this.hi[185], 16, -32, this.ap);
						graphics218.drawImage(this.hi[193], -48, 0, this.ap);
						graphics218.drawImage(this.hi[194], -16, 0, this.ap);
						graphics218.drawImage(this.hi[195], 16, 0, this.ap);
						graphics218.dispose();
						break;

					case 2800:
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.hg.fillOval(i13 - 64, k15 - 64 + 8, 128, 128);
						if (this.g_c2 >= 2) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							this.hg.fillOval(i13 - 20, k15 - 20 + 8, 40, 40);
						}
						break;

					case 2900:
						var k6 = 0;
						for (var i4 = 0; i4 >= -50; i4 -= 10) {
							ai[k6] = i13 + Math.cos(((characterobject1.c3 + i4) * 3.1415926535897931) / 180) * 160;
							ai1[k6] = k15 + Math.sin(((characterobject1.c3 + i4) * 3.1415926535897931) / 180) * 160;
							k6++;
						}

						for (var j4 = -50; j4 <= 0; j4 += 10) {
							ai[k6] = i13 + Math.cos(((characterobject1.c3 + j4) * 3.1415926535897931) / 180) * 112;
							ai1[k6] = k15 + Math.sin(((characterobject1.c3 + j4) * 3.1415926535897931) / 180) * 112;
							k6++;
						}

						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.hg.fillPolygon(ai, ai1, k6);
						if (this.g_c2 < 2) break;
						k6 = 0;
						for (var k4 = -5; k4 >= -45; k4 -= 8) {
							ai[k6] = i13 + Math.cos(((characterobject1.c3 + k4) * 3.1415926535897931) / 180) * 148;
							ai1[k6] = k15 + Math.sin(((characterobject1.c3 + k4) * 3.1415926535897931) / 180) * 148;
							k6++;
						}

						for (var l4 = -45; l4 <= -5; l4 += 8) {
							ai[k6] = i13 + Math.cos(((characterobject1.c3 + l4) * 3.1415926535897931) / 180) * 124;
							ai1[k6] = k15 + Math.sin(((characterobject1.c3 + l4) * 3.1415926535897931) / 180) * 124;
							k6++;
						}

						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.hg.fillPolygon(ai, ai1, k6);
						break;

					case 2950:
						var l6 = 0;
						for (var i5 = 0; i5 >= -120; i5 -= 10) {
							ai[l6] = i13 + Math.cos(((characterobject1.c3 + i5) * 3.1415926535897931) / 180) * 160;
							ai1[l6] = k15 + Math.sin(((characterobject1.c3 + i5) * 3.1415926535897931) / 180) * 160;
							l6++;
						}

						for (var j5 = -120; j5 <= 0; j5 += 10) {
							ai[l6] = i13 + Math.cos(((characterobject1.c3 + j5) * 3.1415926535897931) / 180) * 112;
							ai1[l6] = k15 + Math.sin(((characterobject1.c3 + j5) * 3.1415926535897931) / 180) * 112;
							l6++;
						}

						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.hg.fillPolygon(ai, ai1, l6);
						if (this.g_c2 < 2) break;
						l6 = 0;
						for (var k5 = -5; k5 >= -115; k5 -= 10) {
							ai[l6] = i13 + Math.cos(((characterobject1.c3 + k5) * 3.1415926535897931) / 180) * 148;
							ai1[l6] = k15 + Math.sin(((characterobject1.c3 + k5) * 3.1415926535897931) / 180) * 148;
							l6++;
						}

						for (var l5 = -115; l5 <= -5; l5 += 10) {
							ai[l6] = i13 + Math.cos(((characterobject1.c3 + l5) * 3.1415926535897931) / 180) * 124;
							ai1[l6] = k15 + Math.sin(((characterobject1.c3 + l5) * 3.1415926535897931) / 180) * 124;
							l6++;
						}

						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.hg.fillPolygon(ai, ai1, l6);
						break;

					case 3000:
						var k11 = k15 + 64;
						if (k11 < 320) {
							this.gg.os_g.setColor(this.gamecolor_firebar1);
							this.hg.fillRect(i13 + 120 - 20, k11, 40, 320 - k11);
						}
						break;

					case 3100:
						this.vo_pa_x[0] =
							i13 +
							Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 12 +
							Math.cos(((characterobject1.vy + 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_y[0] =
							k15 +
							Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 12 +
							Math.sin(((characterobject1.vy + 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_x[1] =
							i13 +
							Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 12 +
							Math.cos(((characterobject1.vy - 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_y[1] =
							k15 +
							Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 12 +
							Math.sin(((characterobject1.vy - 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_x[2] =
							i13 +
							Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 226 +
							Math.cos(((characterobject1.vy - 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_y[2] =
							k15 +
							Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 226 +
							Math.sin(((characterobject1.vy - 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_x[3] =
							i13 +
							Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 226 +
							Math.cos(((characterobject1.vy + 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_y[3] =
							k15 +
							Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 226 +
							Math.sin(((characterobject1.vy + 90) * 3.1415926535897931) / 180) * 5;
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						break;

					case 3200:
						var graphics219 = this.gg.os_img.getGraphics();
						var l21 = i13 + 16;
						var i28 = k15 + 16;
						graphics219.rotate(1.5707963267948966, l21, i28);
						graphics219.drawImage(this.hi[6], i13, k15, this.ap);
						graphics219.translate(32, 0.0);
						graphics219.drawImage(this.hi[6], i13, k15, this.ap);
						graphics219.translate(32, 0.0);
						graphics219.drawImage(this.hi[6], i13, k15, this.ap);
						graphics219.translate(32, 0.0);
						graphics219.drawImage(this.hi[6], i13, k15, this.ap);
						graphics219.dispose();
						break;

					case 3250:
						var graphics220 = this.gg.os_img.getGraphics();
						var i22 = i13 + 16;
						var j28 = k15 + 16;
						graphics220.rotate(4.7123889803846898, i22, j28);
						graphics220.drawImage(this.hi[6], i13, k15, this.ap);
						graphics220.translate(-32, 0.0);
						graphics220.drawImage(this.hi[6], i13, k15, this.ap);
						graphics220.translate(-32, 0.0);
						graphics220.drawImage(this.hi[6], i13, k15, this.ap);
						graphics220.translate(-32, 0.0);
						graphics220.drawImage(this.hi[6], i13, k15, this.ap);
						graphics220.dispose();
						break;

					case 3400:
						if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
						else this.gg.os_g.setColor(this.gamecolor_grenade2);
						this.gg.os_g.fillRect(i13, k15, 96, 64);
						break;

					case 3500:
						if (characterobject1.c3 != 1 && this.control_parts_visible != 2) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							this.gg.os_g.fillRect(i13 + 30, k15, 2, 128);
						}
						break;

					case 3510:
						if (characterobject1.c3 != 1 && this.control_parts_visible != 2) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							this.gg.os_g.fillRect(i13, k15, 2, 128);
						}
						break;

					case 3520:
						if (characterobject1.c3 != 1 && this.control_parts_visible != 2) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							this.gg.os_g.fillRect(i13, k15, 128, 2);
						}
						break;

					case 3530:
						if (characterobject1.c3 != 1 && this.control_parts_visible != 2) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							this.gg.os_g.fillRect(i13, k15 + 30, 128, 2);
						}
						break;

					case 3600:
						this.hg.drawImage(this.gg.spt_option_img[0], i13, k15, this.ap);
						break;

					case 3700:
						this.hg.drawImage(this.gg.spt_option_img[1], i13, k15, this.ap);
						break;

					case 3710:
						this.hg.drawImage(this.gg.spt_option_img[2], i13, k15, this.ap);
						break;

					case 3800:
						if (this.g_c1 == 0) {
							this.hg.drawImage(this.hi[120], i13, k15, this.ap);
							this.hg.drawImage(this.hi[120], i13, k15 + 32, this.ap);
							this.hg.drawImage(this.hi[120], i13, k15 + 64, this.ap);
							this.hg.drawImage(this.hi[120], i13, k15 + 96, this.ap);
						} else {
							this.hg.drawImage(this.hi[121], i13, k15, this.ap);
							this.hg.drawImage(this.hi[121], i13, k15 + 32, this.ap);
							this.hg.drawImage(this.hi[121], i13, k15 + 64, this.ap);
							this.hg.drawImage(this.hi[121], i13, k15 + 96, this.ap);
						}
						break;

					case 3900:
						if (this.g_c1 == 0) {
							this.hg.drawImage(this.hi[120], i13, k15, this.ap);
							this.hg.drawImage(this.hi[120], i13 + 32, k15, this.ap);
							this.hg.drawImage(this.hi[120], i13 + 64, k15, this.ap);
							this.hg.drawImage(this.hi[120], i13 + 96, k15, this.ap);
						} else {
							this.hg.drawImage(this.hi[121], i13, k15, this.ap);
							this.hg.drawImage(this.hi[121], i13 + 32, k15, this.ap);
							this.hg.drawImage(this.hi[121], i13 + 64, k15, this.ap);
							this.hg.drawImage(this.hi[121], i13 + 96, k15, this.ap);
						}
						break;

					case 4000:
						this.vo_pa_x[0] = i13 + Math.cos(((characterobject1.vy + 5) * 3.1415926535897931) / 180) * 216;
						this.vo_pa_y[0] = k15 + Math.sin(((characterobject1.vy + 5) * 3.1415926535897931) / 180) * 216;
						this.vo_pa_x[1] = i13 + Math.cos(((characterobject1.vy - 5) * 3.1415926535897931) / 180) * 216;
						this.vo_pa_y[1] = k15 + Math.sin(((characterobject1.vy - 5) * 3.1415926535897931) / 180) * 216;
						this.vo_pa_x[2] = i13;
						this.vo_pa_y[2] = k15;
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 3);
						this.vo_pa_x[0] = i13 + Math.cos(((characterobject1.vy + 17) * 3.1415926535897931) / 180) * 224;
						this.vo_pa_y[0] = k15 + Math.sin(((characterobject1.vy + 17) * 3.1415926535897931) / 180) * 224;
						this.vo_pa_x[1] = i13 + Math.cos(((characterobject1.vy - 17) * 3.1415926535897931) / 180) * 224;
						this.vo_pa_y[1] = k15 + Math.sin(((characterobject1.vy - 17) * 3.1415926535897931) / 180) * 224;
						this.vo_pa_x[2] =
							this.vo_pa_x[1] + Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[2] =
							this.vo_pa_y[1] + Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[3] =
							this.vo_pa_x[0] + Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[3] =
							this.vo_pa_y[0] + Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[4] = i13 + Math.cos((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[4] = k15 + Math.sin((characterobject1.vy * 3.1415926535897931) / 180) * 12;
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						break;

					case 4100:
						this.hg.drawImage(this.gg.spt_option_img[3], i13, k15, this.ap);
						break;

					case 4110:
						this.hg.drawImage(this.gg.spt_option_img[4], i13, k15, this.ap);
						break;

					case 4200:
						if (characterobject1.x >= this.co_j.x) this.hg.drawImage(this.hi[37], i13, k15, this.ap);
						else this.hg.drawImage(this.hih[1][37], i13, k15, this.ap);
						break;

					case 4210:
						if (characterobject1.x >= this.co_j.x) this.hg.drawImage(this.hi[38], i13, k15, this.ap);
						else this.hg.drawImage(this.hih[1][38], i13, k15, this.ap);
						break;

					case 4220:
						if (characterobject1.x >= this.co_j.x) this.hg.drawImage(this.hi[39], i13, k15, this.ap);
						else this.hg.drawImage(this.hih[1][39], i13, k15, this.ap);
						break;

					case 4300:
						if (characterobject1.x >= this.co_j.x) this.hg.drawImage(this.hi[167], i13, k15, this.ap);
						else this.hg.drawImage(this.hih[1][167], i13, k15, this.ap);
						break;
				}
			}
	}
	if (this.yuka_id_max >= 0) this.drawYuka();
	if (this.m_kazu > 0) {
		for (var l = 0; l <= 79; l++) {
			if (this.co_m[l].c < 50) continue;
			var characterobject2 = this.co_m[l];
			if (characterobject2.c == 50) {
				this.hg.drawImage(
					this.hih[characterobject2.pth][characterobject2.pt],
					characterobject2.x - i6,
					characterobject2.y - j6,
					this.ap
				);
				if (this.gg.layer_mode == 2) {
					var k8 = this.maps.getBGCode(characterobject2.x, characterobject2.y);
					if (k8 >= 20 && k8 != 29)
						this.gg.drawPT(
							rightShiftIgnoreSign(characterobject2.x, 5) * 32 - i6,
							rightShiftIgnoreSign(characterobject2.y, 5) * 32 - j6,
							k8,
							0
						);
					k8 = this.maps.getBGCode(characterobject2.x + 31, characterobject2.y);
					if (k8 >= 20 && k8 != 29)
						this.gg.drawPT(
							rightShiftIgnoreSign(characterobject2.x + 31, 5) * 32 - i6,
							rightShiftIgnoreSign(characterobject2.y, 5) * 32 - j6,
							k8,
							0
						);
					continue;
				}
				var l8 = this.maps.getBGCode(characterobject2.x, characterobject2.y);
				if (l8 >= 20)
					this.gg.drawPT(
						rightShiftIgnoreSign(characterobject2.x, 5) * 32 - i6,
						rightShiftIgnoreSign(characterobject2.y, 5) * 32 - j6,
						l8,
						0
					);
				l8 = this.maps.getBGCode(characterobject2.x + 31, characterobject2.y);
				if (l8 >= 20)
					this.gg.drawPT(
						rightShiftIgnoreSign(characterobject2.x + 31, 5) * 32 - i6,
						rightShiftIgnoreSign(characterobject2.y, 5) * 32 - j6,
						l8,
						0
					);
				continue;
			}
			if (characterobject2.pt == 1000) {
				this.gg.os_g.setColor(this.gamecolor_mizunohadou);
				this.gg.os_g.fillOval(
					characterobject2.x - i6 + 16 - characterobject2.c2,
					characterobject2.y - j6 + 16 - characterobject2.c2,
					characterobject2.c2 * 2,
					characterobject2.c2 * 2
				);
				continue;
			}
			if (characterobject2.pt == 1010) {
				this.gg.os_g.setColor(
					new Color(
						this.gamecolor_mizunohadou.getRed(),
						this.gamecolor_mizunohadou.getGreen(),
						this.gamecolor_mizunohadou.getBlue(),
						176
					)
				);
				this.gg.os_g.fillOval(
					characterobject2.x - i6 + 16 - characterobject2.c2,
					characterobject2.y - j6 + 16 - characterobject2.c2,
					characterobject2.c2 * 2,
					characterobject2.c2 * 2
				);
				continue;
			}
			if (characterobject2.pt == 1100) {
				if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.fillOval(
					characterobject2.x - i6 + 16 - characterobject2.c2,
					characterobject2.y - j6 + 16 - characterobject2.c2,
					characterobject2.c2 * 2,
					characterobject2.c2 * 2
				);
				continue;
			}
			if (characterobject2.pt == 1200) {
				if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.drawOval(
					characterobject2.x - i6 + 16 - characterobject2.vy,
					characterobject2.y - j6 + 16 - characterobject2.vy,
					characterobject2.vy * 2,
					characterobject2.vy * 2
				);
				continue;
			}
			if (characterobject2.pt == 1210) {
				if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.fillRect(
					characterobject2.x - i6,
					characterobject2.y - j6 + 11,
					characterobject2.vx - characterobject2.x + 1,
					10
				);
				continue;
			}
			if (characterobject2.pt == 1215) {
				if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.fillRect(
					characterobject2.vx - i6,
					characterobject2.y - j6 + 11,
					characterobject2.x - characterobject2.vx + 1,
					10
				);
				continue;
			}
			if (characterobject2.pt == 1220) {
				this.gg.os_g.setColor(this.gamecolor_grenade1);
				this.gg.os_g.drawOval(
					characterobject2.x - i6 + 16 - characterobject2.vy,
					characterobject2.y - j6 + 16 - characterobject2.vy,
					characterobject2.vy * 2,
					characterobject2.vy * 2
				);
				continue;
			}
			if (characterobject2.pt == 1230) {
				this.gg.os_g.setColor(
					new Color(
						this.gamecolor_grenade1.getRed(),
						this.gamecolor_grenade1.getGreen(),
						this.gamecolor_grenade1.getBlue(),
						192
					)
				);
				this.gg.os_g.fillRect(
					characterobject2.x - i6,
					characterobject2.y - j6 + 9,
					characterobject2.vx - characterobject2.x + 1,
					14
				);
				continue;
			}
			if (characterobject2.pt == 1235) {
				this.gg.os_g.setColor(
					new Color(
						this.gamecolor_grenade1.getRed(),
						this.gamecolor_grenade1.getGreen(),
						this.gamecolor_grenade1.getBlue(),
						192
					)
				);
				this.gg.os_g.fillRect(
					characterobject2.vx - i6,
					characterobject2.y - j6 + 9,
					characterobject2.x - characterobject2.vx + 1,
					14
				);
				continue;
			}
			if (characterobject2.pt == 1300)
				this.hg.drawImage(this.gg.spt_option_img[0], characterobject2.x - i6, characterobject2.y - j6, this.ap);
			else
				this.hg.drawImage(
					this.hih[characterobject2.pth][characterobject2.pt],
					characterobject2.x - i6,
					characterobject2.y - j6,
					this.ap
				);
		}
	}
	if (this.jm_kazu > 0) {
		for (var i1 = 0; i1 <= 8; i1++) {
			if (this.co_jm[i1].c < 50) continue;
			var characterobject3 = this.co_jm[i1];
			if (characterobject3.pt < 1000) {
				this.hg.drawImage(
					this.hih[characterobject3.pth][characterobject3.pt],
					characterobject3.x - i6,
					characterobject3.y - j6,
					this.ap
				);
				continue;
			}
			if (characterobject3.pt == 1200) {
				if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.fillRect(
					characterobject3.x - i6,
					characterobject3.y - j6 + 12,
					characterobject3.vx - characterobject3.x + 1,
					8
				);
				continue;
			}
			if (characterobject3.pt == 1205) {
				if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.fillRect(
					characterobject3.vx - i6,
					characterobject3.y - j6 + 12,
					characterobject3.x - characterobject3.vx + 1,
					8
				);
				continue;
			}
			if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
			else this.gg.os_g.setColor(this.gamecolor_grenade2);
			this.gg.os_g.fillOval(
				characterobject3.x - i6 + 16 - characterobject3.c2,
				characterobject3.y - j6 + 16 - characterobject3.c2,
				characterobject3.c2 * 2,
				characterobject3.c2 * 2
			);
		}
	}
	if (this.j_tokugi == 14) {
		for (var j1 = 0; j1 <= 1; j1++)
			if (this.co_mu[j1].c >= 50)
				this.hg.drawImage(this.hih[1][105 + this.g_ac], this.co_mu[j1].x - i6, this.co_mu[j1].y - j6, this.ap);
	}
	if (this.system_draw_mode < 3) {
		for (var k1 = 0; k1 <= this.t_kazu; k1++) {
			if (this.co_t[k1].c < 50) continue;
			var j13 = this.co_t[k1].x - i6;
			var l15 = this.co_t[k1].y - j6;
			if (j13 < -64 || l15 > 576) continue;
			if (this.co_t[k1].img != null)
				this.hg.drawImage(this.co_t[k1].img, j13 + this.co_t[k1].zs_x, l15 + this.co_t[k1].zs_y, this.ap);
			else this.hg.drawImage(this.hih[this.co_t[k1].pth][this.co_t[k1].pt], j13, l15, this.ap);
		}
	}
	if (this.co_b.c > 50) {
		var k13 = this.co_b.x - i6;
		var i16 = this.co_b.y - j6;
		if (k13 <= 560)
			if (this.co_b.img != null) {
				this.hg.drawImage(this.co_b.img, k13 + this.co_b.zs_x, i16 + this.co_b.zs_y, this.ap);
			} else {
				switch (this.co_b.pt) {
					default:
						break;

					case 1000:
						this.hg.drawImage(this.hih[0][186], k13 - 16, i16 - 16, this.ap);
						this.hg.drawImage(this.hih[0][187], k13 + 16, i16 - 16, this.ap);
						this.hg.drawImage(this.hih[0][196], k13 - 16, i16 + 16, this.ap);
						this.hg.drawImage(this.hih[0][197], k13 + 16, i16 + 16, this.ap);
						break;

					case 1005:
						this.hg.drawImage(this.hih[1][187], k13 - 16, i16 - 16, this.ap);
						this.hg.drawImage(this.hih[1][186], k13 + 16, i16 - 16, this.ap);
						this.hg.drawImage(this.hih[1][197], k13 - 16, i16 + 16, this.ap);
						this.hg.drawImage(this.hih[1][196], k13 + 16, i16 + 16, this.ap);
						break;

					case 1010:
						this.hg.drawImage(this.hih[0][176], k13 - 16, i16 + 16, this.ap);
						this.hg.drawImage(this.hih[0][177], k13 + 16, i16 + 16, this.ap);
						break;

					case 1015:
						this.hg.drawImage(this.hih[1][177], k13 - 16, i16 + 16, this.ap);
						this.hg.drawImage(this.hih[1][176], k13 + 16, i16 + 16, this.ap);
						break;

					case 1100:
						this.hg.drawImage(this.hih[0][188], k13 - 16, i16 - 16, this.ap);
						this.hg.drawImage(this.hih[0][189], k13 + 16, i16 - 16, this.ap);
						this.hg.drawImage(this.hih[0][198], k13 - 16, i16 + 16, this.ap);
						this.hg.drawImage(this.hih[0][199], k13 + 16, i16 + 16, this.ap);
						break;

					case 1101:
						var graphics221 = this.gg.os_img.getGraphics();
						var j22 = k13 + 16;
						var k28 = i16 + 16;
						graphics221.rotate((this.co_b.c2 * 3.1415926535897931) / 180, j22, k28);
						graphics221.drawImage(this.hih[0][188], k13 - 16, i16 - 16, this.ap);
						graphics221.drawImage(this.hih[0][189], k13 + 16, i16 - 16, this.ap);
						graphics221.drawImage(this.hih[0][198], k13 - 16, i16 + 16, this.ap);
						graphics221.drawImage(this.hih[0][199], k13 + 16, i16 + 16, this.ap);
						graphics221.dispose();
						break;

					case 1105:
						this.hg.drawImage(this.hih[1][189], k13 - 16, i16 - 16, this.ap);
						this.hg.drawImage(this.hih[1][188], k13 + 16, i16 - 16, this.ap);
						this.hg.drawImage(this.hih[1][199], k13 - 16, i16 + 16, this.ap);
						this.hg.drawImage(this.hih[1][198], k13 + 16, i16 + 16, this.ap);
						break;

					case 1106:
						var graphics222 = this.gg.os_img.getGraphics();
						var k22 = k13 + 16;
						var l28 = i16 + 16;
						graphics222.rotate((this.co_b.c2 * 3.1415926535897931) / 180, k22, l28);
						graphics222.drawImage(this.hih[1][189], k13 - 16, i16 - 16, this.ap);
						graphics222.drawImage(this.hih[1][188], k13 + 16, i16 - 16, this.ap);
						graphics222.drawImage(this.hih[1][199], k13 - 16, i16 + 16, this.ap);
						graphics222.drawImage(this.hih[1][198], k13 + 16, i16 + 16, this.ap);
						graphics222.dispose();
						break;

					case 1110:
						this.hg.drawImage(this.hih[0][178], k13 - 16, i16 + 16, this.ap);
						this.hg.drawImage(this.hih[0][179], k13 + 16, i16 + 16, this.ap);
						break;

					case 1115:
						this.hg.drawImage(this.hih[1][179], k13 - 16, i16 + 16, this.ap);
						this.hg.drawImage(this.hih[1][178], k13 + 16, i16 + 16, this.ap);
						break;

					case 1200:
						this.hg.drawImage(this.hih[0][238], k13 - 16, i16 - 16, this.ap);
						this.hg.drawImage(this.hih[0][239], k13 + 16, i16 - 16, this.ap);
						this.hg.drawImage(this.hih[0][248], k13 - 16, i16 + 16, this.ap);
						this.hg.drawImage(this.hih[0][249], k13 + 16, i16 + 16, this.ap);
						break;

					case 1205:
						this.hg.drawImage(this.hih[1][239], k13 - 16, i16 - 16, this.ap);
						this.hg.drawImage(this.hih[1][238], k13 + 16, i16 - 16, this.ap);
						this.hg.drawImage(this.hih[1][249], k13 - 16, i16 + 16, this.ap);
						this.hg.drawImage(this.hih[1][248], k13 + 16, i16 + 16, this.ap);
						break;

					case 1210:
						this.hg.drawImage(this.hih[0][228], k13 - 16, i16 + 16, this.ap);
						this.hg.drawImage(this.hih[0][229], k13 + 16, i16 + 16, this.ap);
						break;

					case 1215:
						this.hg.drawImage(this.hih[1][229], k13 - 16, i16 + 16, this.ap);
						this.hg.drawImage(this.hih[1][228], k13 + 16, i16 + 16, this.ap);
						break;

					case 1250:
						this.hg.drawImage(this.hih[0][238], k13 - 16, i16 - 16, this.ap);
						this.hg.drawImage(this.hih[0][239], k13 + 16, i16 - 16, this.ap);
						this.hg.drawImage(this.hih[0][248], k13 - 16, i16 + 16, this.ap);
						this.hg.drawImage(this.hih[0][249], k13 + 16, i16 + 16, this.ap);
						if (this.j_v_c <= 0) {
							this.j_v_kakudo += 2;
							if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
						}
						k13 = this.co_b.x - i6 + 16;
						i16 = this.co_b.y - j6 + 16;
						this.gg.os_g.setColor(Color.white);
						var d6 = 0.017453292519943295;
						for (var l1 = 0; l1 <= 5; l1++) {
							var d = (this.j_v_kakudo + l1 * 60) * d6;
							this.vo_pa_x[l1] = k13 + Math.cos(d) * 50;
							this.vo_pa_y[l1] = i16 + Math.sin(d) * 50;
						}

						this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
						for (var i2 = 0; i2 <= 5; i2++) {
							var d1 = (360 - this.j_v_kakudo + i2 * 60) * d6;
							this.vo_pa_x[i2] = k13 + Math.cos(d1) * 50;
							this.vo_pa_y[i2] = i16 + Math.sin(d1) * 50;
						}

						this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
						break;

					case 1251:
						var graphics223 = this.gg.os_img.getGraphics();
						var l22 = k13 + 16;
						var i29 = i16 + 16;
						graphics223.rotate((this.co_b.c2 * 3.1415926535897931) / 180, l22, i29);
						graphics223.drawImage(this.hih[0][238], k13 - 16, i16 - 16, this.ap);
						graphics223.drawImage(this.hih[0][239], k13 + 16, i16 - 16, this.ap);
						graphics223.drawImage(this.hih[0][248], k13 - 16, i16 + 16, this.ap);
						graphics223.drawImage(this.hih[0][249], k13 + 16, i16 + 16, this.ap);
						graphics223.dispose();
						break;

					case 1255:
						this.hg.drawImage(this.hih[1][239], k13 - 16, i16 - 16, this.ap);
						this.hg.drawImage(this.hih[1][238], k13 + 16, i16 - 16, this.ap);
						this.hg.drawImage(this.hih[1][249], k13 - 16, i16 + 16, this.ap);
						this.hg.drawImage(this.hih[1][248], k13 + 16, i16 + 16, this.ap);
						if (this.j_v_c <= 0) {
							this.j_v_kakudo += 2;
							if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
						}
						k13 = this.co_b.x - i6 + 16;
						i16 = this.co_b.y - j6 + 16;
						this.gg.os_g.setColor(Color.white);
						var d7 = 0.017453292519943295;
						for (var j2 = 0; j2 <= 5; j2++) {
							var d2 = (this.j_v_kakudo + j2 * 60) * d7;
							this.vo_pa_x[j2] = k13 + Math.cos(d2) * 50;
							this.vo_pa_y[j2] = i16 + Math.sin(d2) * 50;
						}

						this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
						for (var k2 = 0; k2 <= 5; k2++) {
							var d3 = (360 - this.j_v_kakudo + k2 * 60) * d7;
							this.vo_pa_x[k2] = k13 + Math.cos(d3) * 50;
							this.vo_pa_y[k2] = i16 + Math.sin(d3) * 50;
						}

						this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
						break;

					case 1256:
						var graphics224 = this.gg.os_img.getGraphics();
						var i23 = k13 + 16;
						var j29 = i16 + 16;
						graphics224.rotate((this.co_b.c2 * 3.1415926535897931) / 180, i23, j29);
						graphics224.drawImage(this.hih[1][239], k13 - 16, i16 - 16, this.ap);
						graphics224.drawImage(this.hih[1][238], k13 + 16, i16 - 16, this.ap);
						graphics224.drawImage(this.hih[1][249], k13 - 16, i16 + 16, this.ap);
						graphics224.drawImage(this.hih[1][248], k13 + 16, i16 + 16, this.ap);
						graphics224.dispose();
						break;
				}
			}
	}

	// 主人公の描画
	if (this.system_draw_mode < 2 && this.j_jet_c >= 96)
		if (this.g_c1 == 0) this.hg.drawImage(this.hi[134], this.co_j.x - i6, this.co_j.y - j6 + 36, this.ap);
		else this.hg.drawImage(this.hi[135], this.co_j.x - i6, this.co_j.y - j6 + 36, this.ap);
	if (this.system_draw_mode < 2 && this.j_v_c > 0) {
		this.j_v_c--;
		this.j_v_kakudo += 2;
		if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
		if (this.j_v_c > 40 || this.g_ac == 1) {
			var l13 = this.co_j.x - i6 + 16;
			var j16 = this.co_j.y - j6 + 16;
			this.gg.os_g.setColor(Color.white);
			var d8 = 0.017453292519943295;
			for (var l2 = 0; l2 <= 5; l2++) {
				var d4 = (this.j_v_kakudo + l2 * 60) * d8;
				this.vo_pa_x[l2] = l13 + Math.cos(d4) * 38;
				this.vo_pa_y[l2] = j16 + Math.sin(d4) * 38;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			for (var i3 = 0; i3 <= 5; i3++) {
				var d5 = (360 - this.j_v_kakudo + i3 * 60) * d8;
				this.vo_pa_x[i3] = l13 + Math.cos(d5) * 38;
				this.vo_pa_y[i3] = j16 + Math.sin(d5) * 38;
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
		}
	}
	if (this.j_zan_cf && this.system_draw_mode != 2 && this.system_draw_mode != 3 && this.system_draw_mode != 4) {
		this.j_zan_cf = false;
		for (var j3 = 0; j3 <= 5; j3++)
			if (this.co_j.img != null) {
				this.j_zan_img[j3] = this.co_j.img;
				this.j_zan_zs_x[j3] = this.co_j.zs_x;
				this.j_zan_zs_y[j3] = this.co_j.zs_y;
			} else {
				this.j_zan_img[j3] = null;
				this.j_zan_pt[j3] = this.co_j.pt;
			}
	}
	if (this.system_draw_mode < 2 && this.j_zan_f) {
		var i7 = this.j_zan_p + (6 - this.j_zan_nagasa);
		if (i7 > 5) i7 -= 6;
		var j7 = this.j_zan_p + 1;
		if (j7 > 5) j7 -= 6;
		do {
			var i14 = this.j_zan_x[i7] - i6;
			var k16 = this.j_zan_y[i7] - j6;
			var k7 = this.j_zan_pth[i7];
			if (this.j_zan_img[i7] != null)
				this.hg.drawImage(this.j_zan_img[i7], i14 + this.j_zan_zs_x[i7], k16 + this.j_zan_zs_y[i7], this.ap);
			else this.hg.drawImage(this.hih[k7][this.j_zan_pt[i7]], i14, k16, this.ap);
			if (++i7 > 5) i7 = 0;
		} while (i7 != j7);
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
	if (this.system_draw_mode < 2 && (this.j_muteki_c <= 0 || this.j_muteki_c % 2 != 1))
		if (this.co_j.img != null)
			this.hg.drawImage(this.co_j.img, this.co_j.wx + this.co_j.zs_x, this.co_j.wy + this.co_j.zs_y, this.ap);
		else if (this.j_cannon_c > 0 && this.co_a[this.j_rope_id].c == 1500 && this.co_j.pt < 1000) {
			this.gg.drawPT(this.co_j.wx, this.co_j.wy, this.co_j.pt, this.co_j.muki);
			var characterobject4 = this.co_a[this.j_rope_id];
			var j14 = characterobject4.x - i6;
			var l16 = characterobject4.y - j6;
			this.gg.os_g.setColor(this.gamecolor_mizunohadou);
			this.gg.os_g.fillOval(j14 + 16 - 19, l16 + 16 - 19, 38, 38);
			this.vo_pa_x[0] = j14 + 16 + Math.cos(((characterobject4.c4 + 90) * 3.1415926535897931) / 180) * 20;
			this.vo_pa_y[0] = l16 + 16 + Math.sin(((characterobject4.c4 + 90) * 3.1415926535897931) / 180) * 20;
			this.vo_pa_x[1] = j14 + 16 + Math.cos(((characterobject4.c4 - 90) * 3.1415926535897931) / 180) * 20;
			this.vo_pa_y[1] = l16 + 16 + Math.sin(((characterobject4.c4 - 90) * 3.1415926535897931) / 180) * 20;
			this.vo_pa_x[2] =
				j14 +
				16 +
				Math.cos((characterobject4.c4 * 3.1415926535897931) / 180) * 68 +
				Math.cos(((characterobject4.c4 - 90) * 3.1415926535897931) / 180) * 20;
			this.vo_pa_y[2] =
				l16 +
				16 +
				Math.sin((characterobject4.c4 * 3.1415926535897931) / 180) * 68 +
				Math.sin(((characterobject4.c4 - 90) * 3.1415926535897931) / 180) * 20;
			this.vo_pa_x[3] =
				j14 +
				16 +
				Math.cos((characterobject4.c4 * 3.1415926535897931) / 180) * 68 +
				Math.cos(((characterobject4.c4 + 90) * 3.1415926535897931) / 180) * 20;
			this.vo_pa_y[3] =
				l16 +
				16 +
				Math.sin((characterobject4.c4 * 3.1415926535897931) / 180) * 68 +
				Math.sin(((characterobject4.c4 + 90) * 3.1415926535897931) / 180) * 20;
			this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
			this.gg.os_g.setColor(this.gamecolor_firebar2);
			if (characterobject4.c3 == 0 || characterobject4.c3 == 1) {
				this.vo_pa_x[0] = j14 + 16 - 6;
				this.vo_pa_y[0] = l16 + 16 - 4;
				this.vo_pa_x[1] = j14 + 16 + 6;
				this.vo_pa_y[1] = l16 + 16 - 4;
				this.vo_pa_x[2] = j14 + 16 + 12;
				this.vo_pa_y[2] = l16 + 32 + 12;
				this.vo_pa_x[3] = j14 + 16 - 12;
				this.vo_pa_y[3] = l16 + 32 + 12;
			} else if (characterobject4.c3 == 2) {
				this.vo_pa_x[0] = j14 + 16 - 6;
				this.vo_pa_y[0] = l16 + 16 + 4;
				this.vo_pa_x[1] = j14 + 16 + 6;
				this.vo_pa_y[1] = l16 + 16 + 4;
				this.vo_pa_x[2] = j14 + 16 + 12;
				this.vo_pa_y[2] = l16 - 32;
				this.vo_pa_x[3] = j14 + 16 - 12;
				this.vo_pa_y[3] = l16 - 32;
			} else if (characterobject4.c3 == 3) {
				this.vo_pa_x[0] = j14 + 16 - 4;
				this.vo_pa_y[0] = l16 + 16 - 6;
				this.vo_pa_x[1] = j14 + 16 - 4;
				this.vo_pa_y[1] = l16 + 16 + 6;
				this.vo_pa_x[2] = j14 + 64;
				this.vo_pa_y[2] = l16 + 16 + 12;
				this.vo_pa_x[3] = j14 + 64;
				this.vo_pa_y[3] = l16 + 16 - 12;
			} else {
				this.vo_pa_x[0] = j14 + 16 + 4;
				this.vo_pa_y[0] = l16 + 16 - 6;
				this.vo_pa_x[1] = j14 + 16 + 4;
				this.vo_pa_y[1] = l16 + 16 + 6;
				this.vo_pa_x[2] = j14 - 32;
				this.vo_pa_y[2] = l16 + 16 + 12;
				this.vo_pa_x[3] = j14 - 32;
				this.vo_pa_y[3] = l16 + 16 - 12;
			}
			this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
		} else if (this.co_j.pt < 1000) this.gg.drawPT(this.co_j.wx, this.co_j.wy, this.co_j.pt, this.co_j.muki);
		else if (this.co_j.pt == 1000) {
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
			if (this.co_j.c2 >= 100 && this.co_j.c2 < 200) {
				if (this.co_j.c1 <= 0) this.gg.drawPT(this.co_j.wx, this.co_j.wy, 100, this.co_j.muki);
				else if (this.co_j.c1 >= 32) this.gg.drawPT(this.co_j.wx, this.co_j.wy - 32, 100, this.co_j.muki);
				else this.gg.drawPT(this.co_j.wx, this.co_j.wy - this.co_j.c1, 100, this.co_j.muki);
				var graphics225 = this.gg.os_img.getGraphics();
				var j23 = this.co_j.wx - 16 + 32;
				var k29 = this.co_j.wy - 32 + 16;
				graphics225.rotate(3.1415926535897931, j23, k29);
				graphics225.drawImage(
					this.hi[60 + (this.co_j.c2 - 100) * 2],
					this.co_j.wx - 16,
					this.co_j.wy - 32,
					this.ap
				);
				graphics225.drawImage(
					this.hi[61 + (this.co_j.c2 - 100) * 2],
					this.co_j.wx + 16,
					this.co_j.wy - 32,
					this.ap
				);
				graphics225.dispose();
			} else if (this.co_j.c2 >= 200 && this.co_j.c2 < 300) {
				if (this.co_j.c1 <= 0) this.gg.drawPT(this.co_j.wx, this.co_j.wy, 100, this.co_j.muki);
				else if (this.co_j.c1 >= 32) this.gg.drawPT(this.co_j.wx + 32, this.co_j.wy, 100, this.co_j.muki);
				else this.gg.drawPT(this.co_j.wx + this.co_j.c1, this.co_j.wy, 100, this.co_j.muki);
				var graphics226 = this.gg.os_img.getGraphics();
				var k23 = this.co_j.wx + 32 + 32;
				var l29 = this.co_j.wy - 16 + 32;
				graphics226.rotate(4.7123889803846898, k23, l29);
				graphics226.drawImage(
					this.hi[60 + (this.co_j.c2 - 200) * 2],
					this.co_j.wx + 32,
					this.co_j.wy - 16,
					this.ap
				);
				graphics226.drawImage(
					this.hi[61 + (this.co_j.c2 - 200) * 2],
					this.co_j.wx + 32 + 32,
					this.co_j.wy - 16,
					this.ap
				);
				graphics226.dispose();
			} else if (this.co_j.c2 >= 300 && this.co_j.c2 < 400) {
				if (this.co_j.c1 <= 0) this.gg.drawPT(this.co_j.wx, this.co_j.wy, 100, this.co_j.muki);
				else if (this.co_j.c1 >= 32) this.gg.drawPT(this.co_j.wx - 32, this.co_j.wy, 100, this.co_j.muki);
				else this.gg.drawPT(this.co_j.wx - this.co_j.c1, this.co_j.wy, 100, this.co_j.muki);
				var graphics227 = this.gg.os_img.getGraphics();
				var l23 = this.co_j.wx - 32 + 16;
				var i30 = this.co_j.wy - 16 + 16;
				graphics227.rotate(1.5707963267948966, l23, i30);
				graphics227.drawImage(
					this.hi[60 + (this.co_j.c2 - 300) * 2],
					this.co_j.wx - 32,
					this.co_j.wy - 16,
					this.ap
				);
				graphics227.drawImage(
					this.hi[61 + (this.co_j.c2 - 300) * 2],
					this.co_j.wx - 32 + 32,
					this.co_j.wy - 16,
					this.ap
				);
				graphics227.dispose();
			} else {
				if (this.co_j.c1 <= 0) this.gg.drawPT(this.co_j.wx, this.co_j.wy, 100, this.co_j.muki);
				else if (this.co_j.c1 >= 32) this.gg.drawPT(this.co_j.wx, this.co_j.wy + 32, 100, this.co_j.muki);
				else this.gg.drawPT(this.co_j.wx, this.co_j.wy + this.co_j.c1, 100, this.co_j.muki);
				this.gg.drawPT(this.co_j.wx - 16, this.co_j.wy + 32, 60 + this.co_j.c2 * 2, 0);
				this.gg.drawPT(this.co_j.wx + 16, this.co_j.wy + 32, 61 + this.co_j.c2 * 2, 0);
			}
		} else if (this.co_j.pt != 1110)
			if (this.co_j.pt == 1200) {
				var graphics228 = this.gg.os_img.getGraphics();
				var k14 = this.co_j.wx + 16;
				var i17 = this.co_j.wy + 16;
				if (this.co_a[this.j_rope_id].c == 3200)
					graphics228.rotate(((this.co_a[this.j_rope_id].vy + 90) * 3.1415926535897931) / 180, k14, i17);
				else graphics228.rotate(((this.co_a[this.j_rope_id].vy - 90) * 3.1415926535897931) / 180, k14, i17);
				graphics228.drawImage(this.hih[this.co_j.muki][210], this.co_j.wx, this.co_j.wy, this.ap);
				graphics228.dispose();
			} else if (this.co_j.pt == 1201) {
				var graphics229 = this.gg.os_img.getGraphics();
				var l14 = this.co_j.wx + 16;
				var j17 = this.co_j.wy + 16;
				if (this.co_a[this.j_rope_id].c == 3200)
					graphics229.rotate(((this.co_a[this.j_rope_id].vy + 90) * 3.1415926535897931) / 180, l14, j17);
				else graphics229.rotate(((this.co_a[this.j_rope_id].vy - 90) * 3.1415926535897931) / 180, l14, j17);
				graphics229.drawImage(this.hih[this.co_j.muki][211], this.co_j.wx, this.co_j.wy, this.ap);
				graphics229.dispose();
			} else if (this.co_j.pt == 1300) {
				if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.fillOval(this.co_j.wx - 8, this.co_j.wy - 8, 48, 48);
				this.gg.drawPT(this.co_j.wx, this.co_j.wy, 101, this.co_j.muki);
			} else if (this.co_j.pt == 1400) {
				if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.fillOval(this.co_j.wx - 8, this.co_j.wy - 8, 48, 48);
				this.gg.drawPT(this.co_j.wx, this.co_j.wy, 83, this.co_j.muki);
			} else if (this.co_j.pt == 1500) {
				if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.fillOval(this.co_j.wx - 8, this.co_j.wy - 8, 48, 48);
				this.gg.drawPT(this.co_j.wx, this.co_j.wy, 202, this.co_j.muki);
			}
	if (this.j_muteki_c > 0) this.j_muteki_c--;

	// MasaoJSS#showRectで設定された矩形を表示
	if (this.showr_c > 0) {
		// TODO: 描画関数でカウンタ更新やめろ
		this.showr_c--;
		this.hg.setColor(this.js_pen_color);
		this.hg.fillRect(this.showr_x, this.showr_y, this.showr_width, this.showr_height);
	}
	// MasaoJSS#showOvalで設定された矩形を表示
	if (this.showo_c > 0) {
		// TODO: 描画関数でカウンタ更新やめろ
		this.showo_c--;
		this.hg.setColor(this.js_pen_color);
		this.hg.fillOval(this.showo_x, this.showo_y, this.showo_width, this.showo_height);
	}
	// MasaoJSS#showImageで設定された画像を表示
	if (this.showi_c > 0) {
		// TODO: 描画関数でカウンタ更新やめろ
		this.showi_c--;
		// TODO: this.hg.drawImageの第四引数は単に無視されるはずでは？プログラムの意図がわからないので要調査
		if (this.gg.ap != null) this.hg.drawImage(this.showi_img, this.showi_x, this.showi_y, this.gg.ap);
		else this.hg.drawImage(this.showi_img, this.showi_x, this.showi_y, this.gg.oya);
	}
	if (this.second_gazou_visible && this.second_gazou_priority == 2 && this.second_gazou_img != null)
		if (this.second_gazou_scroll == 2) {
			var i9 = -(rightShiftIgnoreSign(this.maps.wx - 32, 2) % 512);
			this.hg.drawImage(this.second_gazou_img, i9, 0, this.ap);
			this.hg.drawImage(this.second_gazou_img, i9 + 512, 0, this.ap);
		} else if (this.second_gazou_scroll == 3) {
			var j9 = -(rightShiftIgnoreSign(this.maps.wx - 32, 1) % 512);
			this.hg.drawImage(this.second_gazou_img, j9, 0, this.ap);
			this.hg.drawImage(this.second_gazou_img, j9 + 512, 0, this.ap);
		} else if (this.second_gazou_scroll == 4) {
			this.maps.second_gazou_x += this.second_gazou_scroll_speed_x;
			this.maps.second_gazou_y += this.second_gazou_scroll_speed_y;
			if (this.maps.second_gazou_x < -512) this.maps.second_gazou_x += 512;
			if (this.maps.second_gazou_x > 0) this.maps.second_gazou_x -= 512;
			if (this.maps.second_gazou_y < -320) this.maps.second_gazou_y += 320;
			if (this.maps.second_gazou_y > 0) this.maps.second_gazou_y -= 320;
			this.hg.drawImage(this.second_gazou_img, this.maps.second_gazou_x, this.maps.second_gazou_y, this.ap);
			this.hg.drawImage(this.second_gazou_img, this.maps.second_gazou_x + 512, this.maps.second_gazou_y, this.ap);
			this.hg.drawImage(this.second_gazou_img, this.maps.second_gazou_x, this.maps.second_gazou_y + 320, this.ap);
			this.hg.drawImage(
				this.second_gazou_img,
				this.maps.second_gazou_x + 512,
				this.maps.second_gazou_y + 320,
				this.ap
			);
		} else if (this.second_gazou_scroll == 5) {
			var k9 = -(rightShiftIgnoreSign((this.maps.wx - 32) * 3, 1) % 512);
			this.hg.drawImage(this.second_gazou_img, k9, 0, this.ap);
			this.hg.drawImage(this.second_gazou_img, k9 + 512, 0, this.ap);
		} else if (this.second_gazou_scroll == 6) {
			var l9 = -(rightShiftIgnoreSign((this.maps.wx - 32) * 3, 1) % 512);
			var l11 = -(this.maps.wy - 320);
			this.hg.drawImage(this.second_gazou_img, l9, l11, this.ap);
			this.hg.drawImage(this.second_gazou_img, l9 + 512, l11, this.ap);
		} else if (this.second_gazou_scroll == 7) {
			var i10 = -((this.maps.wx - 32) % 512);
			var i12 = -((this.maps.wy - 320) % 320);
			this.hg.drawImage(this.second_gazou_img, i10, i12, this.ap);
			this.hg.drawImage(this.second_gazou_img, i10 + 512, i12, this.ap);
			this.hg.drawImage(this.second_gazou_img, i10, i12 + 320, this.ap);
			this.hg.drawImage(this.second_gazou_img, i10 + 512, i12 + 320, this.ap);
		} else if (this.second_gazou_scroll == 8) {
			var j10 = this.second_gazou_scroll_x + 32 - this.maps.wx;
			var j12 = this.second_gazou_scroll_y + 320 - this.maps.wy;
			if (j10 < 512 && j12 < 320) this.hg.drawImage(this.second_gazou_img, j10, j12, this.ap);
		} else {
			this.hg.drawImage(this.second_gazou_img, 0, 0, this.ap);
		}
	// ゲージを表示
	if (this.gauge_v) {
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
	}
	if (this.spot_c != 0)
		if (this.spot_c == 100) {
			this.hg.setColor(Color.black);
			var i15 = this.co_j.x + 16 - rightShiftIgnoreSign(this.spot_r, 1) - this.maps.wx;
			if (i15 > 0) this.hg.fillRect(0, 0, i15, 320);
			var i24 = this.co_j.x + 16 + rightShiftIgnoreSign(this.spot_r, 1) - this.maps.wx;
			if (i24 < 512) this.hg.fillRect(i24, 0, 512 - i24, 320);
			var l17 = this.co_j.y + 16 - rightShiftIgnoreSign(this.spot_r, 1) - this.maps.wy;
			if (l17 > 0) this.hg.fillRect(i15, 0, i24 - i15, l17);
			var j30 = this.co_j.y + 16 + rightShiftIgnoreSign(this.spot_r, 1) - this.maps.wy;
			if (j30 < 320) this.hg.fillRect(i15, j30, i24 - i15, 320 - j30);
			this.spot_g.drawImage(this.gg.os_img, 0, 0, this.ap);
			this.hg.setColor(Color.black);
			this.hg.fillRect(0, 0, 512, 320);
			var graphics230 = this.gg.os_img.getGraphics();
			graphics230.setClip(
				"ellipse",
				this.co_j.x + 16 - rightShiftIgnoreSign(this.spot_r, 1) - this.maps.wx,
				this.co_j.y + 16 - rightShiftIgnoreSign(this.spot_r, 1) - this.maps.wy,
				this.spot_r,
				this.spot_r
			);
			graphics230.drawImage(this.spot_img, 0, 0, this.ap);
			this.hg.setColor(new Color(0, 0, 0, 96));
			this.hg.fillRect(0, 0, 512, 320);
			graphics230.setClip(
				"ellipse",
				this.co_j.x + 16 - rightShiftIgnoreSign(this.spot_r - 48, 1) - this.maps.wx,
				this.co_j.y + 16 - rightShiftIgnoreSign(this.spot_r - 48, 1) - this.maps.wy,
				this.spot_r - 48,
				this.spot_r - 48
			);
			graphics230.drawImage(this.spot_img, 0, 0, this.ap);
			graphics230.dispose();
		} else if (this.spot_c == 200) {
			this.hg.setColor(Color.black);
			this.hg.fillRect(0, 0, 512, 320);
		}

	// 一言メッセージ
	if (this.hitokoto_c == 0) this.hitokoto_c = -1;
	else if (this.hitokoto_c > 0) {
		this.hitokoto_c--;
		drawHitokotoMessage.apply(this);
	}
	this.km.drawMenus();
};
