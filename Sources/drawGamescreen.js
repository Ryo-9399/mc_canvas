import { Color, Font } from "./ImageBuff";
import { rightShiftIgnoreSign } from "./GlobalFunctions";

import {
	drawGamescreenEnemy,
	drawAna,
	drawMyAttack,
	drawBoss,
	drawHPGauge,
	drawSpot,
	drawHitokotoMessage
} from "./drawGamescreenSeparated";

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
	const view_x = this.maps.wx;
	const view_y = this.maps.wy;
	this.co_j.wx = this.co_j.x - view_x;
	this.co_j.wy = this.co_j.y - view_y;
	if (this.ana_kazu > 0) {
		drawAna.apply(this);
	}
	if (this.souko_count1 >= 1) {
		for (let i = 0; i <= this.a_kazu; i++) {
			if (this.co_a[i].pt == 3300 && this.co_a[i].gf) {
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
						this.hg.drawImage(this.hi[190], co_wx, co_wy, this.ap);
						this.hg.drawImage(this.hi[191], co_wx + 32, co_wy, this.ap);
						this.hg.drawImage(this.hi[192], co_wx + 64, co_wy, this.ap);
						break;

					case 200:
						this.hg.drawImage(this.hi[76], co_wx, co_wy, this.ap);
						this.hg.drawImage(this.hi[77], co_wx + 32, co_wy, this.ap);
						this.hg.drawImage(this.hi[86], co_wx, co_wy + 32, this.ap);
						this.hg.drawImage(this.hi[87], co_wx + 32, co_wy + 32, this.ap);
						break;

					case 210:
						this.hg.drawImage(this.hi[78], co_wx, co_wy, this.ap);
						this.hg.drawImage(this.hi[79], co_wx + 32, co_wy, this.ap);
						this.hg.drawImage(this.hi[88], co_wx, co_wy + 32, this.ap);
						this.hg.drawImage(this.hi[89], co_wx + 32, co_wy + 32, this.ap);
						break;

					case 300:
						if (characterobject.c3 == 100) {
							var graphics2 = this.gg.os_img.getGraphics();
							var i18 = co_wx + 32;
							var j24 = co_wy + 16;
							graphics2.rotate(3.1415926535897931, i18, j24);
							graphics2.drawImage(this.hi[60], co_wx, co_wy, this.ap);
							graphics2.drawImage(this.hi[61], co_wx + 32, co_wy, this.ap);
							graphics2.dispose();
							break;
						}
						if (characterobject.c3 == 200) {
							var graphics21 = this.gg.os_img.getGraphics();
							var j18 = co_wx + 32;
							var k24 = co_wy + 32;
							graphics21.rotate(4.7123889803846898, j18, k24);
							graphics21.drawImage(this.hi[60], co_wx, co_wy, this.ap);
							graphics21.drawImage(this.hi[61], co_wx + 32, co_wy, this.ap);
							graphics21.dispose();
							break;
						}
						if (characterobject.c3 == 300) {
							var graphics22 = this.gg.os_img.getGraphics();
							var k18 = co_wx + 16;
							var l24 = co_wy + 16;
							graphics22.rotate(1.5707963267948966, k18, l24);
							graphics22.drawImage(this.hi[60], co_wx, co_wy, this.ap);
							graphics22.drawImage(this.hi[61], co_wx + 32, co_wy, this.ap);
							graphics22.dispose();
						} else {
							this.hg.drawImage(this.hi[60], co_wx, co_wy, this.ap);
							this.hg.drawImage(this.hi[61], co_wx + 32, co_wy, this.ap);
						}
						break;

					case 310:
						if (characterobject.c3 == 101) {
							var graphics23 = this.gg.os_img.getGraphics();
							var l18 = co_wx + 32;
							var i25 = co_wy + 16;
							graphics23.rotate(3.1415926535897931, l18, i25);
							graphics23.drawImage(this.hi[62], co_wx, co_wy, this.ap);
							graphics23.drawImage(this.hi[63], co_wx + 32, co_wy, this.ap);
							graphics23.dispose();
							break;
						}
						if (characterobject.c3 == 201) {
							var graphics24 = this.gg.os_img.getGraphics();
							var i19 = co_wx + 32;
							var j25 = co_wy + 32;
							graphics24.rotate(4.7123889803846898, i19, j25);
							graphics24.drawImage(this.hi[62], co_wx, co_wy, this.ap);
							graphics24.drawImage(this.hi[63], co_wx + 32, co_wy, this.ap);
							graphics24.dispose();
							break;
						}
						if (characterobject.c3 == 301) {
							var graphics25 = this.gg.os_img.getGraphics();
							var j19 = co_wx + 16;
							var k25 = co_wy + 16;
							graphics25.rotate(1.5707963267948966, j19, k25);
							graphics25.drawImage(this.hi[62], co_wx, co_wy, this.ap);
							graphics25.drawImage(this.hi[63], co_wx + 32, co_wy, this.ap);
							graphics25.dispose();
						} else {
							this.hg.drawImage(this.hi[62], co_wx, co_wy, this.ap);
							this.hg.drawImage(this.hi[63], co_wx + 32, co_wy, this.ap);
						}
						break;

					case 320:
						if (characterobject.c3 == 102) {
							var graphics26 = this.gg.os_img.getGraphics();
							var k19 = co_wx + 32;
							var l25 = co_wy + 16;
							graphics26.rotate(3.1415926535897931, k19, l25);
							graphics26.drawImage(this.hi[64], co_wx, co_wy, this.ap);
							graphics26.drawImage(this.hi[65], co_wx + 32, co_wy, this.ap);
							graphics26.dispose();
							break;
						}
						if (characterobject.c3 == 202) {
							var graphics27 = this.gg.os_img.getGraphics();
							var l19 = co_wx + 32;
							var i26 = co_wy + 32;
							graphics27.rotate(4.7123889803846898, l19, i26);
							graphics27.drawImage(this.hi[64], co_wx, co_wy, this.ap);
							graphics27.drawImage(this.hi[65], co_wx + 32, co_wy, this.ap);
							graphics27.dispose();
							break;
						}
						if (characterobject.c3 == 302) {
							var graphics28 = this.gg.os_img.getGraphics();
							var i20 = co_wx + 16;
							var j26 = co_wy + 16;
							graphics28.rotate(1.5707963267948966, i20, j26);
							graphics28.drawImage(this.hi[64], co_wx, co_wy, this.ap);
							graphics28.drawImage(this.hi[65], co_wx + 32, co_wy, this.ap);
							graphics28.dispose();
						} else {
							this.hg.drawImage(this.hi[64], co_wx, co_wy, this.ap);
							this.hg.drawImage(this.hi[65], co_wx + 32, co_wy, this.ap);
						}
						break;

					case 330:
						if (characterobject.c3 == 103) {
							var graphics29 = this.gg.os_img.getGraphics();
							var j20 = co_wx + 32;
							var k26 = co_wy + 16;
							graphics29.rotate(3.1415926535897931, j20, k26);
							graphics29.drawImage(this.hi[66], co_wx, co_wy, this.ap);
							graphics29.drawImage(this.hi[67], co_wx + 32, co_wy, this.ap);
							graphics29.dispose();
							break;
						}
						if (characterobject.c3 == 203) {
							var graphics210 = this.gg.os_img.getGraphics();
							var k20 = co_wx + 32;
							var l26 = co_wy + 32;
							graphics210.rotate(4.7123889803846898, k20, l26);
							graphics210.drawImage(this.hi[66], co_wx, co_wy, this.ap);
							graphics210.drawImage(this.hi[67], co_wx + 32, co_wy, this.ap);
							graphics210.dispose();
							break;
						}
						if (characterobject.c3 == 303) {
							var graphics211 = this.gg.os_img.getGraphics();
							var l20 = co_wx + 16;
							var i27 = co_wy + 16;
							graphics211.rotate(1.5707963267948966, l20, i27);
							graphics211.drawImage(this.hi[66], co_wx, co_wy, this.ap);
							graphics211.drawImage(this.hi[67], co_wx + 32, co_wy, this.ap);
							graphics211.dispose();
						} else {
							this.hg.drawImage(this.hi[66], co_wx, co_wy, this.ap);
							this.hg.drawImage(this.hi[67], co_wx + 32, co_wy, this.ap);
						}
						break;

					case 400:
						this.hg.drawImage(this.hi[183], co_wx, co_wy, this.ap);
						this.hg.drawImage(this.hi[184], co_wx + 32, co_wy, this.ap);
						this.hg.drawImage(this.hi[185], co_wx + 64, co_wy, this.ap);
						this.hg.drawImage(this.hi[193], co_wx, co_wy + 32, this.ap);
						this.hg.drawImage(this.hi[194], co_wx + 32, co_wy + 32, this.ap);
						this.hg.drawImage(this.hi[195], co_wx + 64, co_wy + 32, this.ap);
						break;

					case 500:
						this.hg.drawImage(this.hi[180], co_wx, co_wy, this.ap);
						this.hg.drawImage(this.hi[181], co_wx + 32, co_wy, this.ap);
						this.hg.drawImage(this.hi[182], co_wx + 64, co_wy, this.ap);
						break;

					case 600:
						this.hg.drawImage(this.hi[188], co_wx, co_wy, this.ap);
						this.hg.drawImage(this.hi[189], co_wx + 32, co_wy, this.ap);
						this.hg.drawImage(this.hi[198], co_wx, co_wy + 32, this.ap);
						this.hg.drawImage(this.hi[199], co_wx + 32, co_wy + 32, this.ap);
						break;

					case 605:
						this.hg.drawImage(this.hih[1][189], co_wx, co_wy, this.ap);
						this.hg.drawImage(this.hih[1][188], co_wx + 32, co_wy, this.ap);
						this.hg.drawImage(this.hih[1][199], co_wx, co_wy + 32, this.ap);
						this.hg.drawImage(this.hih[1][198], co_wx + 32, co_wy + 32, this.ap);
						break;

					case 700:
						this.hg.drawImage(this.hi[32], co_wx, co_wy, this.ap);
						break;

					case 710:
						this.hg.drawImage(this.hi[33], co_wx, co_wy, this.ap);
						break;

					case 720:
						this.hg.drawImage(this.hi[34], co_wx, co_wy, this.ap);
						break;

					case 750:
						var graphics212 = this.gg.os_img.getGraphics();
						var i21 = co_wx + 16;
						var j27 = co_wy + 16;
						graphics212.rotate(4.7123889803846898, i21, j27);
						if (characterobject.c3 > 0) graphics212.drawImage(this.hi[32], co_wx, co_wy, this.ap);
						else graphics212.drawImage(this.hi[33], co_wx, co_wy, this.ap);
						graphics212.dispose();
						break;

					case 751:
						var graphics213 = this.gg.os_img.getGraphics();
						var j21 = co_wx + 16;
						var k27 = co_wy + 16;
						graphics213.rotate(1.5707963267948966, j21, k27);
						if (characterobject.c3 > 0) graphics213.drawImage(this.hi[32], co_wx, co_wy, this.ap);
						else graphics213.drawImage(this.hi[33], co_wx, co_wy, this.ap);
						graphics213.dispose();
						break;

					case 800:
						if (characterobject.x >= this.co_j.x)
							this.hg.drawImage(this.hi[35 + characterobject.c3], co_wx, co_wy, this.ap);
						else this.hg.drawImage(this.hih[1][35 + characterobject.c3], co_wx, co_wy, this.ap);
						break;

					case 860:
						var byte0 = 39;
						if (characterobject.c == 87) byte0 = 37;
						else if (characterobject.c == 88) byte0 = 38;
						if (characterobject.x >= this.co_j.x) this.hg.drawImage(this.hi[byte0], co_wx, co_wy, this.ap);
						else this.hg.drawImage(this.hih[1][byte0], co_wx, co_wy, this.ap);
						break;

					case 1100:
						const dx = Math.cos(((characterobject.c3 + 90) * 6.2831853071795862) / 360) * 16;
						const dy = Math.sin(((characterobject.c3 + 90) * 6.2831853071795862) / 360) * 16;
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
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							const dx = Math.cos(((characterobject.c3 + 90) * 6.2831853071795862) / 360) * 10;
							const dy = Math.sin(((characterobject.c3 + 90) * 6.2831853071795862) / 360) * 10;
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

					case 1200:
						this.vo_pa_x[0] =
							co_wx + Math.cos(((characterobject.vy + 180) * 3.1415926535897931) / 180) * 160;
						this.vo_pa_y[0] =
							co_wy + Math.sin(((characterobject.vy + 180) * 3.1415926535897931) / 180) * 160;
						this.vo_pa_x[1] = co_wx + Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 160;
						this.vo_pa_y[1] = co_wy + Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 160;
						this.vo_pa_x[2] =
							this.vo_pa_x[1] + Math.cos(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[2] =
							this.vo_pa_y[1] + Math.sin(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[3] =
							this.vo_pa_x[0] + Math.cos(((characterobject.vy + 270) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[3] =
							this.vo_pa_y[0] + Math.sin(((characterobject.vy + 270) * 3.1415926535897931) / 180) * 12;
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

					case 1300:
						this.vo_pa_x[0] =
							co_wx + Math.cos(((characterobject.vy + 20) * 3.1415926535897931) / 180) * 192;
						this.vo_pa_y[0] =
							co_wy + Math.sin(((characterobject.vy + 20) * 3.1415926535897931) / 180) * 192;
						this.vo_pa_x[1] =
							co_wx + Math.cos(((characterobject.vy - 20) * 3.1415926535897931) / 180) * 192;
						this.vo_pa_y[1] =
							co_wy + Math.sin(((characterobject.vy - 20) * 3.1415926535897931) / 180) * 192;
						this.vo_pa_x[2] =
							this.vo_pa_x[1] + Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[2] =
							this.vo_pa_y[1] + Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[3] =
							this.vo_pa_x[0] + Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[3] =
							this.vo_pa_y[0] + Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[4] = co_wx + Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[4] = co_wy + Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12;
						var k21 = co_wx + Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 80;
						var l27 = co_wy + Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 80;
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.gg.os_g.drawLine(this.vo_pa_x[4], this.vo_pa_y[4], k21, l27);
						this.gg.os_g.drawLine(this.vo_pa_x[0], this.vo_pa_y[0], k21, l27);
						this.gg.os_g.drawLine(this.vo_pa_x[1], this.vo_pa_y[1], k21, l27);
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						break;

					case 1400:
						this.vo_pa_x[0] =
							co_wx +
							Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 192 +
							Math.cos(((characterobject.vy + 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[0] =
							co_wy +
							Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 192 +
							Math.sin(((characterobject.vy + 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[1] =
							co_wx +
							Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 60 +
							Math.cos(((characterobject.vy + 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[1] =
							co_wy +
							Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 60 +
							Math.sin(((characterobject.vy + 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[2] =
							co_wx +
							Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 60 +
							Math.cos(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[2] =
							co_wy +
							Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 60 +
							Math.sin(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[3] =
							co_wx +
							Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 192 +
							Math.cos(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[3] =
							co_wy +
							Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 192 +
							Math.sin(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 12;
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						break;

					case 1500:
						if (characterobject.c4 <= 0) break;
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						if (characterobject.c3 == 1 || characterobject.c3 == 11) {
							this.gg.os_g.fillRect(co_wx + 8, co_wy, 48, characterobject.c4);
							if (this.g_c2 >= 2 && characterobject.c4 > 8) {
								this.gg.os_g.setColor(this.gamecolor_firebar2);
								this.gg.os_g.fillRect(co_wx + 16, co_wy, 32, characterobject.c4 - 8);
							}
							break;
						}
						if (characterobject.c3 == 2 || characterobject.c3 == 12) {
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
							break;
						}
						if (characterobject.c3 == 3 || characterobject.c3 == 13) {
							this.gg.os_g.fillRect(co_wx, co_wy + 8, characterobject.c4, 48);
							if (this.g_c2 >= 2 && characterobject.c4 > 8) {
								this.gg.os_g.setColor(this.gamecolor_firebar2);
								this.gg.os_g.fillRect(co_wx, co_wy + 16, characterobject.c4 - 8, 32);
							}
							break;
						}
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
						this.vo_pa_x[0] = co_wx + Math.cos(((characterobject.vy + 6) * 3.1415926535897931) / 180) * 182;
						this.vo_pa_y[0] = co_wy + Math.sin(((characterobject.vy + 6) * 3.1415926535897931) / 180) * 182;
						this.vo_pa_x[1] = co_wx + Math.cos(((characterobject.vy - 6) * 3.1415926535897931) / 180) * 182;
						this.vo_pa_y[1] = co_wy + Math.sin(((characterobject.vy - 6) * 3.1415926535897931) / 180) * 182;
						this.vo_pa_x[2] = co_wx;
						this.vo_pa_y[2] = co_wy;
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 3);
						this.vo_pa_x[0] =
							co_wx + Math.cos(((characterobject.vy + 20) * 3.1415926535897931) / 180) * 192;
						this.vo_pa_y[0] =
							co_wy + Math.sin(((characterobject.vy + 20) * 3.1415926535897931) / 180) * 192;
						this.vo_pa_x[1] =
							co_wx + Math.cos(((characterobject.vy - 20) * 3.1415926535897931) / 180) * 192;
						this.vo_pa_y[1] =
							co_wy + Math.sin(((characterobject.vy - 20) * 3.1415926535897931) / 180) * 192;
						this.vo_pa_x[2] =
							this.vo_pa_x[1] + Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[2] =
							this.vo_pa_y[1] + Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[3] =
							this.vo_pa_x[0] + Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[3] =
							this.vo_pa_y[0] + Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[4] = co_wx + Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[4] = co_wy + Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12;
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						break;

					case 2000:
						this.vo_pa_x[0] =
							co_wx +
							Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12 +
							Math.cos(((characterobject.vy + 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_y[0] =
							co_wy +
							Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12 +
							Math.sin(((characterobject.vy + 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_x[1] =
							co_wx +
							Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12 +
							Math.cos(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_y[1] =
							co_wy +
							Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12 +
							Math.sin(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_x[2] =
							co_wx +
							Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 182 +
							Math.cos(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_y[2] =
							co_wy +
							Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 182 +
							Math.sin(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_x[3] =
							co_wx +
							Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 182 +
							Math.cos(((characterobject.vy + 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_y[3] =
							co_wy +
							Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 182 +
							Math.sin(((characterobject.vy + 90) * 3.1415926535897931) / 180) * 5;
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
						this.vo_pa_x[0] =
							co_wx + 16 + Math.cos(((characterobject.c4 + 90) * 3.1415926535897931) / 180) * 20;
						this.vo_pa_y[0] =
							co_wy + 16 + Math.sin(((characterobject.c4 + 90) * 3.1415926535897931) / 180) * 20;
						this.vo_pa_x[1] =
							co_wx + 16 + Math.cos(((characterobject.c4 - 90) * 3.1415926535897931) / 180) * 20;
						this.vo_pa_y[1] =
							co_wy + 16 + Math.sin(((characterobject.c4 - 90) * 3.1415926535897931) / 180) * 20;
						this.vo_pa_x[2] =
							co_wx +
							16 +
							Math.cos((characterobject.c4 * 3.1415926535897931) / 180) * 68 +
							Math.cos(((characterobject.c4 - 90) * 3.1415926535897931) / 180) * 20;
						this.vo_pa_y[2] =
							co_wy +
							16 +
							Math.sin((characterobject.c4 * 3.1415926535897931) / 180) * 68 +
							Math.sin(((characterobject.c4 - 90) * 3.1415926535897931) / 180) * 20;
						this.vo_pa_x[3] =
							co_wx +
							16 +
							Math.cos((characterobject.c4 * 3.1415926535897931) / 180) * 68 +
							Math.cos(((characterobject.c4 + 90) * 3.1415926535897931) / 180) * 20;
						this.vo_pa_y[3] =
							co_wy +
							16 +
							Math.sin((characterobject.c4 * 3.1415926535897931) / 180) * 68 +
							Math.sin(((characterobject.c4 + 90) * 3.1415926535897931) / 180) * 20;
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						if (characterobject.c3 == 0 || characterobject.c3 == 1) {
							this.vo_pa_x[0] = co_wx + 16 - 6;
							this.vo_pa_y[0] = co_wy + 16 - 4;
							this.vo_pa_x[1] = co_wx + 16 + 6;
							this.vo_pa_y[1] = co_wy + 16 - 4;
							this.vo_pa_x[2] = co_wx + 16 + 12;
							this.vo_pa_y[2] = co_wy + 32 + 12;
							this.vo_pa_x[3] = co_wx + 16 - 12;
							this.vo_pa_y[3] = co_wy + 32 + 12;
						} else if (characterobject.c3 == 2) {
							this.vo_pa_x[0] = co_wx + 16 - 6;
							this.vo_pa_y[0] = co_wy + 16 + 4;
							this.vo_pa_x[1] = co_wx + 16 + 6;
							this.vo_pa_y[1] = co_wy + 16 + 4;
							this.vo_pa_x[2] = co_wx + 16 + 12;
							this.vo_pa_y[2] = co_wy - 32;
							this.vo_pa_x[3] = co_wx + 16 - 12;
							this.vo_pa_y[3] = co_wy - 32;
						} else if (characterobject.c3 == 3) {
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
						if (this.control_parts_visible == 2 && characterobject.c == 1900) {
							this.gg.os_g.setColor(Color.black);
							this.gg.os_g.fillRect(co_wx, co_wy, 32, 32);
							var s = "" + "S " + String(characterobject.c3);
							this.gg.os_g.setColor(Color.white);
							this.gg.os_g.setFont(new Font("Dialog", 1, 12));
							this.gg.os_g.drawString(s, co_wx + 2, co_wy + this.moji_size + 4);
						}
						break;

					case 2400:
						if (characterobject.c3 == 0) {
							var graphics214 = this.gg.os_img.getGraphics();
							graphics214.translate(co_wx + 32, co_wy + 64);
							graphics214.scale(characterobject.vy / 100, characterobject.vy / 100);
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
						if (characterobject.c3 == 1) {
							var graphics215 = this.gg.os_img.getGraphics();
							graphics215.translate(co_wx + 32, co_wy);
							graphics215.scale(characterobject.vy / 100, characterobject.vy / 100);
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
						if (characterobject.c3 != 2) break;
						var graphics216 = this.gg.os_img.getGraphics();
						graphics216.translate(co_wx + 32, co_wy + 32);
						graphics216.scale(characterobject.vy / 100, characterobject.vy / 100);
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
						graphics217.translate(co_wx, co_wy);
						graphics217.scale(1.5, 1.5);
						graphics217.rotate((characterobject.vy * 3.1415926535897931) / 180, 0.0, 0.0);
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
						graphics218.translate(co_wx, co_wy);
						graphics218.scale(2.5, 2.5);
						graphics218.rotate((characterobject.vy * 3.1415926535897931) / 180, 0.0, 0.0);
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
						this.hg.fillOval(co_wx - 64, co_wy - 64 + 8, 128, 128);
						if (this.g_c2 >= 2) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							this.hg.fillOval(co_wx - 20, co_wy - 20 + 8, 40, 40);
						}
						break;

					case 2900:
						var k6 = 0;
						for (var i4 = 0; i4 >= -50; i4 -= 10) {
							ai[k6] = co_wx + Math.cos(((characterobject.c3 + i4) * 3.1415926535897931) / 180) * 160;
							ai1[k6] = co_wy + Math.sin(((characterobject.c3 + i4) * 3.1415926535897931) / 180) * 160;
							k6++;
						}

						for (var j4 = -50; j4 <= 0; j4 += 10) {
							ai[k6] = co_wx + Math.cos(((characterobject.c3 + j4) * 3.1415926535897931) / 180) * 112;
							ai1[k6] = co_wy + Math.sin(((characterobject.c3 + j4) * 3.1415926535897931) / 180) * 112;
							k6++;
						}

						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.hg.fillPolygon(ai, ai1, k6);
						if (this.g_c2 < 2) break;
						k6 = 0;
						for (var k4 = -5; k4 >= -45; k4 -= 8) {
							ai[k6] = co_wx + Math.cos(((characterobject.c3 + k4) * 3.1415926535897931) / 180) * 148;
							ai1[k6] = co_wy + Math.sin(((characterobject.c3 + k4) * 3.1415926535897931) / 180) * 148;
							k6++;
						}

						for (var l4 = -45; l4 <= -5; l4 += 8) {
							ai[k6] = co_wx + Math.cos(((characterobject.c3 + l4) * 3.1415926535897931) / 180) * 124;
							ai1[k6] = co_wy + Math.sin(((characterobject.c3 + l4) * 3.1415926535897931) / 180) * 124;
							k6++;
						}

						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.hg.fillPolygon(ai, ai1, k6);
						break;

					case 2950:
						var l6 = 0;
						for (var i5 = 0; i5 >= -120; i5 -= 10) {
							ai[l6] = co_wx + Math.cos(((characterobject.c3 + i5) * 3.1415926535897931) / 180) * 160;
							ai1[l6] = co_wy + Math.sin(((characterobject.c3 + i5) * 3.1415926535897931) / 180) * 160;
							l6++;
						}

						for (var j5 = -120; j5 <= 0; j5 += 10) {
							ai[l6] = co_wx + Math.cos(((characterobject.c3 + j5) * 3.1415926535897931) / 180) * 112;
							ai1[l6] = co_wy + Math.sin(((characterobject.c3 + j5) * 3.1415926535897931) / 180) * 112;
							l6++;
						}

						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.hg.fillPolygon(ai, ai1, l6);
						if (this.g_c2 < 2) break;
						l6 = 0;
						for (var k5 = -5; k5 >= -115; k5 -= 10) {
							ai[l6] = co_wx + Math.cos(((characterobject.c3 + k5) * 3.1415926535897931) / 180) * 148;
							ai1[l6] = co_wy + Math.sin(((characterobject.c3 + k5) * 3.1415926535897931) / 180) * 148;
							l6++;
						}

						for (var l5 = -115; l5 <= -5; l5 += 10) {
							ai[l6] = co_wx + Math.cos(((characterobject.c3 + l5) * 3.1415926535897931) / 180) * 124;
							ai1[l6] = co_wy + Math.sin(((characterobject.c3 + l5) * 3.1415926535897931) / 180) * 124;
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
							Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12 +
							Math.cos(((characterobject.vy + 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_y[0] =
							co_wy +
							Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12 +
							Math.sin(((characterobject.vy + 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_x[1] =
							co_wx +
							Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12 +
							Math.cos(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_y[1] =
							co_wy +
							Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12 +
							Math.sin(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_x[2] =
							co_wx +
							Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 226 +
							Math.cos(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_y[2] =
							co_wy +
							Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 226 +
							Math.sin(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_x[3] =
							co_wx +
							Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 226 +
							Math.cos(((characterobject.vy + 90) * 3.1415926535897931) / 180) * 5;
						this.vo_pa_y[3] =
							co_wy +
							Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 226 +
							Math.sin(((characterobject.vy + 90) * 3.1415926535897931) / 180) * 5;
						this.gg.os_g.setColor(this.gamecolor_firebar2);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						break;

					case 3200:
						var graphics219 = this.gg.os_img.getGraphics();
						var l21 = co_wx + 16;
						var i28 = co_wy + 16;
						graphics219.rotate(1.5707963267948966, l21, i28);
						graphics219.drawImage(this.hi[6], co_wx, co_wy, this.ap);
						graphics219.translate(32, 0.0);
						graphics219.drawImage(this.hi[6], co_wx, co_wy, this.ap);
						graphics219.translate(32, 0.0);
						graphics219.drawImage(this.hi[6], co_wx, co_wy, this.ap);
						graphics219.translate(32, 0.0);
						graphics219.drawImage(this.hi[6], co_wx, co_wy, this.ap);
						graphics219.dispose();
						break;

					case 3250:
						var graphics220 = this.gg.os_img.getGraphics();
						var i22 = co_wx + 16;
						var j28 = co_wy + 16;
						graphics220.rotate(4.7123889803846898, i22, j28);
						graphics220.drawImage(this.hi[6], co_wx, co_wy, this.ap);
						graphics220.translate(-32, 0.0);
						graphics220.drawImage(this.hi[6], co_wx, co_wy, this.ap);
						graphics220.translate(-32, 0.0);
						graphics220.drawImage(this.hi[6], co_wx, co_wy, this.ap);
						graphics220.translate(-32, 0.0);
						graphics220.drawImage(this.hi[6], co_wx, co_wy, this.ap);
						graphics220.dispose();
						break;

					case 3400:
						if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
						else this.gg.os_g.setColor(this.gamecolor_grenade2);
						this.gg.os_g.fillRect(co_wx, co_wy, 96, 64);
						break;

					case 3500:
						if (characterobject.c3 != 1 && this.control_parts_visible != 2) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							this.gg.os_g.fillRect(co_wx + 30, co_wy, 2, 128);
						}
						break;

					case 3510:
						if (characterobject.c3 != 1 && this.control_parts_visible != 2) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							this.gg.os_g.fillRect(co_wx, co_wy, 2, 128);
						}
						break;

					case 3520:
						if (characterobject.c3 != 1 && this.control_parts_visible != 2) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							this.gg.os_g.fillRect(co_wx, co_wy, 128, 2);
						}
						break;

					case 3530:
						if (characterobject.c3 != 1 && this.control_parts_visible != 2) {
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
						if (this.g_c1 == 0) {
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
						if (this.g_c1 == 0) {
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
						this.vo_pa_x[0] = co_wx + Math.cos(((characterobject.vy + 5) * 3.1415926535897931) / 180) * 216;
						this.vo_pa_y[0] = co_wy + Math.sin(((characterobject.vy + 5) * 3.1415926535897931) / 180) * 216;
						this.vo_pa_x[1] = co_wx + Math.cos(((characterobject.vy - 5) * 3.1415926535897931) / 180) * 216;
						this.vo_pa_y[1] = co_wy + Math.sin(((characterobject.vy - 5) * 3.1415926535897931) / 180) * 216;
						this.vo_pa_x[2] = co_wx;
						this.vo_pa_y[2] = co_wy;
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 3);
						this.vo_pa_x[0] =
							co_wx + Math.cos(((characterobject.vy + 17) * 3.1415926535897931) / 180) * 224;
						this.vo_pa_y[0] =
							co_wy + Math.sin(((characterobject.vy + 17) * 3.1415926535897931) / 180) * 224;
						this.vo_pa_x[1] =
							co_wx + Math.cos(((characterobject.vy - 17) * 3.1415926535897931) / 180) * 224;
						this.vo_pa_y[1] =
							co_wy + Math.sin(((characterobject.vy - 17) * 3.1415926535897931) / 180) * 224;
						this.vo_pa_x[2] =
							this.vo_pa_x[1] + Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[2] =
							this.vo_pa_y[1] + Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[3] =
							this.vo_pa_x[0] + Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[3] =
							this.vo_pa_y[0] + Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_x[4] = co_wx + Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12;
						this.vo_pa_y[4] = co_wy + Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12;
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
	}
	if (this.yuka_id_max >= 0) this.drawYuka();
	if (this.m_kazu > 0) {
		for (let i = 0; i <= 79; i++) {
			if (this.co_m[i].c < 50) continue;
			const characterobject = this.co_m[i];
			if (characterobject.c == 50) {
				this.hg.drawImage(
					this.hih[characterobject.pth][characterobject.pt],
					characterobject.x - view_x,
					characterobject.y - view_y,
					this.ap
				);
				if (this.gg.layer_mode == 2) {
					let bgc = this.maps.getBGCode(characterobject.x, characterobject.y);
					if (bgc >= 20 && bgc != 29)
						this.gg.drawPT(
							rightShiftIgnoreSign(characterobject.x, 5) * 32 - view_x,
							rightShiftIgnoreSign(characterobject.y, 5) * 32 - view_y,
							bgc,
							0
						);
					bgc = this.maps.getBGCode(characterobject.x + 31, characterobject.y);
					if (bgc >= 20 && bgc != 29)
						this.gg.drawPT(
							rightShiftIgnoreSign(characterobject.x + 31, 5) * 32 - view_x,
							rightShiftIgnoreSign(characterobject.y, 5) * 32 - view_y,
							bgc,
							0
						);
				} else {
					let bgc = this.maps.getBGCode(characterobject.x, characterobject.y);
					if (bgc >= 20)
						this.gg.drawPT(
							rightShiftIgnoreSign(characterobject.x, 5) * 32 - view_x,
							rightShiftIgnoreSign(characterobject.y, 5) * 32 - view_y,
							bgc,
							0
						);
					bgc = this.maps.getBGCode(characterobject.x + 31, characterobject.y);
					if (bgc >= 20)
						this.gg.drawPT(
							rightShiftIgnoreSign(characterobject.x + 31, 5) * 32 - view_x,
							rightShiftIgnoreSign(characterobject.y, 5) * 32 - view_y,
							bgc,
							0
						);
				}
			} else if (characterobject.pt == 1000) {
				this.gg.os_g.setColor(this.gamecolor_mizunohadou);
				this.gg.os_g.fillOval(
					characterobject.x - view_x + 16 - characterobject.c2,
					characterobject.y - view_y + 16 - characterobject.c2,
					characterobject.c2 * 2,
					characterobject.c2 * 2
				);
			} else if (characterobject.pt == 1010) {
				this.gg.os_g.setColor(
					new Color(
						this.gamecolor_mizunohadou.getRed(),
						this.gamecolor_mizunohadou.getGreen(),
						this.gamecolor_mizunohadou.getBlue(),
						176
					)
				);
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
			} else if (characterobject.pt == 1200) {
				if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.drawOval(
					characterobject.x - view_x + 16 - characterobject.vy,
					characterobject.y - view_y + 16 - characterobject.vy,
					characterobject.vy * 2,
					characterobject.vy * 2
				);
			} else if (characterobject.pt == 1210) {
				if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.fillRect(
					characterobject.x - view_x,
					characterobject.y - view_y + 11,
					characterobject.vx - characterobject.x + 1,
					10
				);
			} else if (characterobject.pt == 1215) {
				if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
				else this.gg.os_g.setColor(this.gamecolor_grenade2);
				this.gg.os_g.fillRect(
					characterobject.vx - view_x,
					characterobject.y - view_y + 11,
					characterobject.x - characterobject.vx + 1,
					10
				);
			} else if (characterobject.pt == 1220) {
				this.gg.os_g.setColor(this.gamecolor_grenade1);
				this.gg.os_g.drawOval(
					characterobject.x - view_x + 16 - characterobject.vy,
					characterobject.y - view_y + 16 - characterobject.vy,
					characterobject.vy * 2,
					characterobject.vy * 2
				);
			} else if (characterobject.pt == 1230) {
				this.gg.os_g.setColor(
					new Color(
						this.gamecolor_grenade1.getRed(),
						this.gamecolor_grenade1.getGreen(),
						this.gamecolor_grenade1.getBlue(),
						192
					)
				);
				this.gg.os_g.fillRect(
					characterobject.x - view_x,
					characterobject.y - view_y + 9,
					characterobject.vx - characterobject.x + 1,
					14
				);
			} else if (characterobject.pt == 1235) {
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
					characterobject.y - view_y + 9,
					characterobject.x - characterobject.vx + 1,
					14
				);
			} else if (characterobject.pt == 1300) {
				this.hg.drawImage(
					this.gg.spt_option_img[0],
					characterobject.x - view_x,
					characterobject.y - view_y,
					this.ap
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
	if (this.j_tokugi == 14) {
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
		drawGamescreenEnemy.apply(this);
	}
	// ボスの描画
	drawBoss.apply(this);

	// 主人公の描画
	if (this.system_draw_mode < 2) {
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
				if (this.co_j.img != null) {
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
				if (this.j_zan_img[index] != null)
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
		if (this.j_muteki_c <= 0 || this.j_muteki_c % 2 != 1) {
			// 主人公本体の描画
			if (this.co_j.img != null) {
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
			} else if (this.co_j.pt == 1000) {
				// しっぽを伸ばしている
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
				// 土管に入る
				// 土管の種類 0がリンク土管1, 1がリンク土管2, ...
				const dokan_id = this.co_j.c2 % 100;
				const dokan_pt = 60 + dokan_id * 2;
				// 0:通常 1:上向き 2:左向き 3:右向き
				const dokan_type = Math.floor(this.co_j.c2 / 100);
				// 主人公を少しづつ土管に入れる
				let j_dx = 0;
				let j_dy = 0;
				// 主人公の位置を[0,32]の範囲に収める
				const diff = Math.max(0, Math.min(32, this.co_j.c1));
				if (dokan_type === 1) j_dy = -diff;
				else if (dokan_type === 2) j_dx = diff;
				else if (dokan_type === 3) j_dx = -diff;
				else j_dy = diff;
				// 位置をずらして主人公を描画
				this.gg.drawPT(this.co_j.wx + j_dx, this.co_j.wy + j_dy, 100, this.co_j.muki);
				// 土管の回転角度と回転の中心を算出する
				let rad = 0;
				if (dokan_type === 1) rad = Math.PI;
				else if (dokan_type === 2) rad = -Math.PI / 2;
				else if (dokan_type === 3) rad = Math.PI / 2;
				// 土管の中心は向きに応じて主人公の中心座標から1ブロックずれる
				const dokan_center_wx = this.co_j.wx + 16 + 32 * Math.cos(rad + Math.PI / 2);
				const dokan_center_wy = this.co_j.wy + 16 + 32 * Math.sin(rad + Math.PI / 2);
				// 土管を回転させて描画
				this.hg.dispose();
				this.hg.rotate(rad, dokan_center_wx, dokan_center_wy);
				this.hg.drawImage(this.hi[dokan_pt], dokan_center_wx - 32, dokan_center_wy - 16, this.ap);
				this.hg.drawImage(this.hi[dokan_pt + 1], dokan_center_wx, dokan_center_wy - 16, this.ap);
				this.hg.dispose();
			} else if (this.co_j.pt != 1110) {
				if (this.co_j.pt == 1200) {
					var graphics228 = this.gg.os_img.getGraphics();
					var k14 = this.co_j.wx + 16;
					var i17 = this.co_j.wy + 16;
					if (this.co_a[this.j_rope_id].c == 3200)
						graphics228.rotate(((this.co_a[this.j_rope_id].vy + 90) * Math.PI) / 180, k14, i17);
					else graphics228.rotate(((this.co_a[this.j_rope_id].vy - 90) * Math.PI) / 180, k14, i17);
					graphics228.drawImage(this.hih[this.co_j.muki][210], this.co_j.wx, this.co_j.wy, this.ap);
					graphics228.dispose();
				} else if (this.co_j.pt == 1201) {
					var graphics229 = this.gg.os_img.getGraphics();
					var l14 = this.co_j.wx + 16;
					var j17 = this.co_j.wy + 16;
					if (this.co_a[this.j_rope_id].c == 3200)
						graphics229.rotate(((this.co_a[this.j_rope_id].vy + 90) * Math.PI) / 180, l14, j17);
					else graphics229.rotate(((this.co_a[this.j_rope_id].vy - 90) * Math.PI) / 180, l14, j17);
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
			}
		}
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
		if (this.gg.ap != null) this.hg.drawImage(this.showi_img, this.showi_x, this.showi_y, this.gg.ap);
		else this.hg.drawImage(this.showi_img, this.showi_x, this.showi_y, this.gg.oya);
	}
	// TODO: 描画関数でカウンタ更新やめろ
	if (this.showr_c > 0) this.showr_c--;
	if (this.showo_c > 0) this.showo_c--;
	if (this.showi_c > 0) this.showi_c--;
	// セカンド画像 主人公の手前
	// TODO:MapSystem.prototype.drawMapLayerに同じような処理があるのでそっちに統合
	if (this.second_gazou_visible && this.second_gazou_priority == 2 && this.second_gazou_img != null) {
		if (this.second_gazou_scroll == 2) {
			var i9 = -(rightShiftIgnoreSign(view_x - 32, 2) % 512);
			this.hg.drawImage(this.second_gazou_img, i9, 0, this.ap);
			this.hg.drawImage(this.second_gazou_img, i9 + 512, 0, this.ap);
		} else if (this.second_gazou_scroll == 3) {
			var j9 = -(rightShiftIgnoreSign(view_x - 32, 1) % 512);
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
			var k9 = -(rightShiftIgnoreSign((view_x - 32) * 3, 1) % 512);
			this.hg.drawImage(this.second_gazou_img, k9, 0, this.ap);
			this.hg.drawImage(this.second_gazou_img, k9 + 512, 0, this.ap);
		} else if (this.second_gazou_scroll == 6) {
			var l9 = -(rightShiftIgnoreSign((view_x - 32) * 3, 1) % 512);
			var l11 = -(view_y - 320);
			this.hg.drawImage(this.second_gazou_img, l9, l11, this.ap);
			this.hg.drawImage(this.second_gazou_img, l9 + 512, l11, this.ap);
		} else if (this.second_gazou_scroll == 7) {
			var i10 = -((view_x - 32) % 512);
			var i12 = -((view_y - 320) % 320);
			this.hg.drawImage(this.second_gazou_img, i10, i12, this.ap);
			this.hg.drawImage(this.second_gazou_img, i10 + 512, i12, this.ap);
			this.hg.drawImage(this.second_gazou_img, i10, i12 + 320, this.ap);
			this.hg.drawImage(this.second_gazou_img, i10 + 512, i12 + 320, this.ap);
		} else if (this.second_gazou_scroll == 8) {
			var j10 = this.second_gazou_scroll_x + 32 - view_x;
			var j12 = this.second_gazou_scroll_y + 320 - view_y;
			if (j10 < 512 && j12 < 320) this.hg.drawImage(this.second_gazou_img, j10, j12, this.ap);
		} else {
			this.hg.drawImage(this.second_gazou_img, 0, 0, this.ap);
		}
	}
	// ゲージを表示
	if (this.gauge_v) {
		drawHPGauge.apply(this);
	}
	// スポット処理
	drawSpot.apply(this);
	// 一言メッセージ
	if (this.hitokoto_c == 0) this.hitokoto_c = -1;
	else if (this.hitokoto_c > 0) {
		this.hitokoto_c--;
		drawHitokotoMessage.apply(this);
	}
	this.km.drawMenus();
};
