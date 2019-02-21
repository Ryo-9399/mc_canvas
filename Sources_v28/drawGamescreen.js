import { Color, Font } from "./ImageBuff";

export const drawGamescreen = function() {
	this.maps.drawMapScroll(this.g_ac2);
	var i3 = this.maps.wx;
	var j3 = this.maps.wy;
	this.co_j.wx = this.co_j.x - this.maps.wx;
	this.co_j.wy = this.co_j.y - this.maps.wy;
	if (this.a_hf) {
		for (var i = 0; i <= this.a_kazu; i++)
			if (this.co_a[i].gf) {
				var characterobject = this.co_a[i];
				var j5 = characterobject.x - i3;
				var i7 = characterobject.y - j3;
				switch (characterobject.pt) {
					default:
						break;

					case 100:
						this.hg.drawImage(this.hi[190], j5, i7, this.ap);
						this.hg.drawImage(this.hi[191], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[192], j5 + 64, i7, this.ap);
						break;

					case 200:
						this.hg.drawImage(this.hi[76], j5, i7, this.ap);
						this.hg.drawImage(this.hi[77], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[86], j5, i7 + 32, this.ap);
						this.hg.drawImage(this.hi[87], j5 + 32, i7 + 32, this.ap);
						break;

					case 210:
						this.hg.drawImage(this.hi[78], j5, i7, this.ap);
						this.hg.drawImage(this.hi[79], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[88], j5, i7 + 32, this.ap);
						this.hg.drawImage(this.hi[89], j5 + 32, i7 + 32, this.ap);
						break;

					case 300:
						this.hg.drawImage(this.hi[60], j5, i7, this.ap);
						this.hg.drawImage(this.hi[61], j5 + 32, i7, this.ap);
						break;

					case 310:
						this.hg.drawImage(this.hi[62], j5, i7, this.ap);
						this.hg.drawImage(this.hi[63], j5 + 32, i7, this.ap);
						break;

					case 320:
						this.hg.drawImage(this.hi[64], j5, i7, this.ap);
						this.hg.drawImage(this.hi[65], j5 + 32, i7, this.ap);
						break;

					case 330:
						this.hg.drawImage(this.hi[66], j5, i7, this.ap);
						this.hg.drawImage(this.hi[67], j5 + 32, i7, this.ap);
						break;

					case 400:
						this.hg.drawImage(this.hi[183], j5, i7, this.ap);
						this.hg.drawImage(this.hi[184], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[185], j5 + 64, i7, this.ap);
						this.hg.drawImage(this.hi[193], j5, i7 + 32, this.ap);
						this.hg.drawImage(this.hi[194], j5 + 32, i7 + 32, this.ap);
						this.hg.drawImage(this.hi[195], j5 + 64, i7 + 32, this.ap);
						break;

					case 500:
						this.hg.drawImage(this.hi[180], j5, i7, this.ap);
						this.hg.drawImage(this.hi[181], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[182], j5 + 64, i7, this.ap);
						break;

					case 600:
						this.hg.drawImage(this.hi[188], j5, i7, this.ap);
						this.hg.drawImage(this.hi[189], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[198], j5, i7 + 32, this.ap);
						this.hg.drawImage(this.hi[199], j5 + 32, i7 + 32, this.ap);
						break;

					case 605:
						this.hg.drawImage(this.hih[1][189], j5, i7, this.ap);
						this.hg.drawImage(this.hih[1][188], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hih[1][199], j5, i7 + 32, this.ap);
						this.hg.drawImage(this.hih[1][198], j5 + 32, i7 + 32, this.ap);
						break;

					case 700:
						this.hg.drawImage(this.hi[32], j5, i7, this.ap);
						break;

					case 710:
						this.hg.drawImage(this.hi[33], j5, i7, this.ap);
						break;

					case 720:
						this.hg.drawImage(this.hi[34], j5, i7, this.ap);
						break;

					case 800:
						if (characterobject.x >= this.co_j.x)
							this.hg.drawImage(this.hi[35 + characterobject.c3], j5, i7, this.ap);
						else this.hg.drawImage(this.hih[1][35 + characterobject.c3], j5, i7, this.ap);
						break;

					case 1100:
						var k5 = Math.floor(Math.cos(((characterobject.c3 + 90) * 6.2831853071795862) / 360) * 16);
						var j7 = Math.floor(Math.sin(((characterobject.c3 + 90) * 6.2831853071795862) / 360) * 16);
						this.vo_pa_x[0] = this.vo_x[i][0] - i3 + k5;
						this.vo_pa_y[0] = this.vo_y[i][0] - j3 + j7;
						this.vo_pa_x[1] = this.vo_x[i][0] - i3 - k5;
						this.vo_pa_y[1] = this.vo_y[i][0] - j3 - j7;
						this.vo_pa_x[2] = this.vo_x[i][1] - i3 - k5;
						this.vo_pa_y[2] = this.vo_y[i][1] - j3 - j7;
						this.vo_pa_x[3] = this.vo_x[i][1] - i3 + k5;
						this.vo_pa_y[3] = this.vo_y[i][1] - j3 + j7;
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						if (this.g_c2 >= 2) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							var l5 = Math.floor(Math.cos(((characterobject.c3 + 90) * 6.2831853071795862) / 360) * 10);
							var k7 = Math.floor(Math.sin(((characterobject.c3 + 90) * 6.2831853071795862) / 360) * 10);
							this.vo_pa_x[0] = this.vo_x[i][2] - i3 + l5;
							this.vo_pa_y[0] = this.vo_y[i][2] - j3 + k7;
							this.vo_pa_x[1] = this.vo_x[i][2] - i3 - l5;
							this.vo_pa_y[1] = this.vo_y[i][2] - j3 - k7;
							this.vo_pa_x[2] = this.vo_x[i][3] - i3 - l5;
							this.vo_pa_y[2] = this.vo_y[i][3] - j3 - k7;
							this.vo_pa_x[3] = this.vo_x[i][3] - i3 + l5;
							this.vo_pa_y[3] = this.vo_y[i][3] - j3 + k7;
							this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						}
						break;
				}
			}
	}
	if (this.m_kazu > 0) {
		for (var j = 0; j <= 23; j++)
			if (this.co_m[j].c >= 50) {
				var characterobject1 = this.co_m[j];
				if (characterobject1.c == 50) {
					this.hg.drawImage(
						this.hih[characterobject1.pth][characterobject1.pt],
						characterobject1.x - i3,
						characterobject1.y - j3,
						this.ap
					);
					var j4 = this.maps.getBGCode(characterobject1.x, characterobject1.y);
					if (j4 >= 20)
						this.gg.drawPT((characterobject1.x >> 5) * 32 - i3, (characterobject1.y >> 5) * 32 - j3, j4, 0);
					j4 = this.maps.getBGCode(characterobject1.x + 31, characterobject1.y);
					if (j4 >= 20)
						this.gg.drawPT(
							((characterobject1.x + 31) >> 5) * 32 - i3,
							(characterobject1.y >> 5) * 32 - j3,
							j4,
							0
						);
				} else if (characterobject1.pt == 1000) {
					this.gg.os_g.setColor(this.gamecolor_mizunohadou);
					this.gg.os_g.fillOval(
						characterobject1.x - i3 + 16 - characterobject1.c2,
						characterobject1.y - j3 + 16 - characterobject1.c2,
						characterobject1.c2 * 2,
						characterobject1.c2 * 2
					);
				} else if (characterobject1.pt == 1100) {
					if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
					else this.gg.os_g.setColor(this.gamecolor_grenade2);
					this.gg.os_g.fillOval(
						characterobject1.x - i3 + 16 - characterobject1.c2,
						characterobject1.y - j3 + 16 - characterobject1.c2,
						characterobject1.c2 * 2,
						characterobject1.c2 * 2
					);
				} else {
					this.hg.drawImage(
						this.hih[characterobject1.pth][characterobject1.pt],
						characterobject1.x - i3,
						characterobject1.y - j3,
						this.ap
					);
				}
			}
	}
	if (this.jm_kazu > 0) {
		for (var k = 0; k <= 1; k++)
			if (this.co_jm[k].c >= 50) {
				var characterobject2 = this.co_jm[k];
				if (characterobject2.pt < 1000)
					this.hg.drawImage(
						this.hih[characterobject2.pth][characterobject2.pt],
						characterobject2.x - i3,
						characterobject2.y - j3,
						this.ap
					);
				else if (characterobject2.pt == 1200) {
					if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
					else this.gg.os_g.setColor(this.gamecolor_grenade2);
					this.gg.os_g.fillRect(
						characterobject2.x - i3,
						characterobject2.y - j3 + 12,
						characterobject2.vx - characterobject2.x + 1,
						8
					);
				} else if (characterobject2.pt == 1205) {
					if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
					else this.gg.os_g.setColor(this.gamecolor_grenade2);
					this.gg.os_g.fillRect(
						characterobject2.vx - i3,
						characterobject2.y - j3 + 12,
						characterobject2.x - characterobject2.vx + 1,
						8
					);
				} else {
					if (this.g_ac == 0) this.gg.os_g.setColor(this.gamecolor_grenade1);
					else this.gg.os_g.setColor(this.gamecolor_grenade2);
					this.gg.os_g.fillOval(
						characterobject2.x - i3 + 16 - characterobject2.c2,
						characterobject2.y - j3 + 16 - characterobject2.c2,
						characterobject2.c2 * 2,
						characterobject2.c2 * 2
					);
				}
			}
	}
	for (var l = 0; l <= this.t_kazu; l++)
		if (this.co_t[l].c >= 50) {
			var i6 = this.co_t[l].x - i3;
			var l7 = this.co_t[l].y - j3;
			if (i6 >= -64 && l7 <= 576) this.hg.drawImage(this.hih[this.co_t[l].pth][this.co_t[l].pt], i6, l7, this.ap);
		}

	if (this.co_b.c > 50) {
		var j6 = this.co_b.x - i3;
		if (j6 < 528) {
			var i8 = this.co_b.y - j3;
			switch (this.co_b.pt) {
				default:
					break;

				case 1000:
					this.hg.drawImage(this.hih[0][186], j6 - 16, i8 - 16, this.ap);
					this.hg.drawImage(this.hih[0][187], j6 + 16, i8 - 16, this.ap);
					this.hg.drawImage(this.hih[0][196], j6 - 16, i8 + 16, this.ap);
					this.hg.drawImage(this.hih[0][197], j6 + 16, i8 + 16, this.ap);
					break;

				case 1005:
					this.hg.drawImage(this.hih[1][187], j6 - 16, i8 - 16, this.ap);
					this.hg.drawImage(this.hih[1][186], j6 + 16, i8 - 16, this.ap);
					this.hg.drawImage(this.hih[1][197], j6 - 16, i8 + 16, this.ap);
					this.hg.drawImage(this.hih[1][196], j6 + 16, i8 + 16, this.ap);
					break;

				case 1010:
					this.hg.drawImage(this.hih[0][176], j6 - 16, i8 + 16, this.ap);
					this.hg.drawImage(this.hih[0][177], j6 + 16, i8 + 16, this.ap);
					break;

				case 1015:
					this.hg.drawImage(this.hih[1][177], j6 - 16, i8 + 16, this.ap);
					this.hg.drawImage(this.hih[1][176], j6 + 16, i8 + 16, this.ap);
					break;

				case 1100:
					this.hg.drawImage(this.hih[0][188], j6 - 16, i8 - 16, this.ap);
					this.hg.drawImage(this.hih[0][189], j6 + 16, i8 - 16, this.ap);
					this.hg.drawImage(this.hih[0][198], j6 - 16, i8 + 16, this.ap);
					this.hg.drawImage(this.hih[0][199], j6 + 16, i8 + 16, this.ap);
					break;

				case 1105:
					this.hg.drawImage(this.hih[1][189], j6 - 16, i8 - 16, this.ap);
					this.hg.drawImage(this.hih[1][188], j6 + 16, i8 - 16, this.ap);
					this.hg.drawImage(this.hih[1][199], j6 - 16, i8 + 16, this.ap);
					this.hg.drawImage(this.hih[1][198], j6 + 16, i8 + 16, this.ap);
					break;

				case 1110:
					this.hg.drawImage(this.hih[0][178], j6 - 16, i8 + 16, this.ap);
					this.hg.drawImage(this.hih[0][179], j6 + 16, i8 + 16, this.ap);
					break;

				case 1115:
					this.hg.drawImage(this.hih[1][179], j6 - 16, i8 + 16, this.ap);
					this.hg.drawImage(this.hih[1][178], j6 + 16, i8 + 16, this.ap);
					break;

				case 1200:
					this.hg.drawImage(this.hih[0][238], j6 - 16, i8 - 16, this.ap);
					this.hg.drawImage(this.hih[0][239], j6 + 16, i8 - 16, this.ap);
					this.hg.drawImage(this.hih[0][248], j6 - 16, i8 + 16, this.ap);
					this.hg.drawImage(this.hih[0][249], j6 + 16, i8 + 16, this.ap);
					break;

				case 1205:
					this.hg.drawImage(this.hih[1][239], j6 - 16, i8 - 16, this.ap);
					this.hg.drawImage(this.hih[1][238], j6 + 16, i8 - 16, this.ap);
					this.hg.drawImage(this.hih[1][249], j6 - 16, i8 + 16, this.ap);
					this.hg.drawImage(this.hih[1][248], j6 + 16, i8 + 16, this.ap);
					break;

				case 1210:
					this.hg.drawImage(this.hih[0][228], j6 - 16, i8 + 16, this.ap);
					this.hg.drawImage(this.hih[0][229], j6 + 16, i8 + 16, this.ap);
					break;

				case 1215:
					this.hg.drawImage(this.hih[1][229], j6 - 16, i8 + 16, this.ap);
					this.hg.drawImage(this.hih[1][228], j6 + 16, i8 + 16, this.ap);
					break;

				case 1250:
					this.hg.drawImage(this.hih[0][238], j6 - 16, i8 - 16, this.ap);
					this.hg.drawImage(this.hih[0][239], j6 + 16, i8 - 16, this.ap);
					this.hg.drawImage(this.hih[0][248], j6 - 16, i8 + 16, this.ap);
					this.hg.drawImage(this.hih[0][249], j6 + 16, i8 + 16, this.ap);
					if (this.j_v_c <= 0) {
						this.j_v_kakudo += 2;
						if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
					}
					j6 = this.co_b.x - i3 + 16;
					i8 = this.co_b.y - j3 + 16;
					this.gg.os_g.setColor(Color.white);
					var d6 = 0.017453292519943295;
					for (var i1 = 0; i1 <= 5; i1++) {
						var d = (this.j_v_kakudo + i1 * 60) * d6;
						this.vo_pa_x[i1] = j6 + Math.floor(Math.cos(d) * 50);
						this.vo_pa_y[i1] = i8 + Math.floor(Math.sin(d) * 50);
					}

					this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
					for (var j1 = 0; j1 <= 5; j1++) {
						var d1 = (360 - this.j_v_kakudo + j1 * 60) * d6;
						this.vo_pa_x[j1] = j6 + Math.floor(Math.cos(d1) * 50);
						this.vo_pa_y[j1] = i8 + Math.floor(Math.sin(d1) * 50);
					}

					this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
					break;

				case 1255:
					this.hg.drawImage(this.hih[1][239], j6 - 16, i8 - 16, this.ap);
					this.hg.drawImage(this.hih[1][238], j6 + 16, i8 - 16, this.ap);
					this.hg.drawImage(this.hih[1][249], j6 - 16, i8 + 16, this.ap);
					this.hg.drawImage(this.hih[1][248], j6 + 16, i8 + 16, this.ap);
					if (this.j_v_c <= 0) {
						this.j_v_kakudo += 2;
						if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
					}
					j6 = this.co_b.x - i3 + 16;
					i8 = this.co_b.y - j3 + 16;
					this.gg.os_g.setColor(Color.white);
					var d7 = 0.017453292519943295;
					for (var k1 = 0; k1 <= 5; k1++) {
						var d2 = (this.j_v_kakudo + k1 * 60) * d7;
						this.vo_pa_x[k1] = j6 + Math.floor(Math.cos(d2) * 50);
						this.vo_pa_y[k1] = i8 + Math.floor(Math.sin(d2) * 50);
					}

					this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
					for (var l1 = 0; l1 <= 5; l1++) {
						var d3 = (360 - this.j_v_kakudo + l1 * 60) * d7;
						this.vo_pa_x[l1] = j6 + Math.floor(Math.cos(d3) * 50);
						this.vo_pa_y[l1] = i8 + Math.floor(Math.sin(d3) * 50);
					}

					this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
					break;
			}
		}
	}

	// 主人公の描画
	if (this.j_jet_c >= 96)
		if (this.g_c1 == 0) this.hg.drawImage(this.hi[134], this.co_j.x - i3, this.co_j.y - j3 + 36, this.ap);
		else this.hg.drawImage(this.hi[135], this.co_j.x - i3, this.co_j.y - j3 + 36, this.ap);
	if (this.j_v_c > 0) {
		this.j_v_c--;
		this.j_v_kakudo += 2;
		if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
		if (this.j_v_c > 50 || this.g_ac == 1) {
			var k6 = this.co_j.x - i3 + 16;
			var j8 = this.co_j.y - j3 + 16;
			this.gg.os_g.setColor(Color.white);
			var d8 = 0.017453292519943295;
			for (var i2 = 0; i2 <= 5; i2++) {
				var d4 = (this.j_v_kakudo + i2 * 60) * d8;
				this.vo_pa_x[i2] = k6 + Math.floor(Math.cos(d4) * 38);
				this.vo_pa_y[i2] = j8 + Math.floor(Math.sin(d4) * 38);
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			for (var j2 = 0; j2 <= 5; j2++) {
				var d5 = (360 - this.j_v_kakudo + j2 * 60) * d8;
				this.vo_pa_x[j2] = k6 + Math.floor(Math.cos(d5) * 38);
				this.vo_pa_y[j2] = j8 + Math.floor(Math.sin(d5) * 38);
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
		}
	}
	if (this.j_zan_f) {
		var k3 = this.j_zan_p + (6 - this.j_zan_nagasa);
		if (k3 > 5) k3 -= 6;
		var l3 = this.j_zan_p + 1;
		if (l3 > 5) l3 -= 6;
		do {
			var l6 = this.j_zan_x[k3] - i3;
			var k8 = this.j_zan_y[k3] - j3;
			var i4 = this.j_zan_pth[k3];
			this.hg.drawImage(this.hih[i4][this.j_zan_pt[k3]], l6, k8, this.ap);
			if (++k3 > 5) k3 = 0;
		} while (k3 != l3);
		this.j_zan_p++;
		if (this.j_zan_p > 5) this.j_zan_p = 0;
		this.j_zan_x[this.j_zan_p] = this.co_j.x;
		this.j_zan_y[this.j_zan_p] = this.co_j.y;
		this.j_zan_pt[this.j_zan_p] = this.co_j.pt;
		this.j_zan_pth[this.j_zan_p] = this.co_j.muki;
		if (this.j_zan_c < 9) {
			this.j_zan_c++;
			if (this.co_j.vy >= 0) this.j_zan_c = 9;
		} else {
			this.j_zan_nagasa--;
			if (this.j_zan_nagasa < 0) this.j_zan_f = false;
		}
	}
	if (this.co_j.pt < 1000) this.gg.drawPT(this.co_j.wx, this.co_j.wy, this.co_j.pt, this.co_j.muki);
	else if (this.co_j.pt == 1000) {
		if (this.co_j.muki == 0) {
			this.gg.drawPT(this.co_j.wx, this.co_j.wy, 118, this.co_j.muki);
			this.gg.drawPT(this.co_j.wx - 32, this.co_j.wy, 117, this.co_j.muki);
		} else {
			this.gg.drawPT(this.co_j.wx, this.co_j.wy, 118, 1);
			this.gg.drawPT(this.co_j.wx + 32, this.co_j.wy, 117, 1);
		}
	} else if (this.co_j.pt == 1100) {
		if (this.co_j.c1 <= 0) this.gg.drawPT(this.co_j.wx, this.co_j.wy, 100, this.co_j.muki);
		else if (this.co_j.c1 >= 32) this.gg.drawPT(this.co_j.wx, this.co_j.wy + 32, 100, this.co_j.muki);
		else this.gg.drawPT(this.co_j.wx, this.co_j.wy + this.co_j.c1, 100, this.co_j.muki);
		this.gg.drawPT(this.co_j.wx - 16, this.co_j.wy + 32, 60 + this.co_j.c2 * 2, 0);
		this.gg.drawPT(this.co_j.wx + 16, this.co_j.wy + 32, 61 + this.co_j.c2 * 2, 0);
	} else if (this.co_j.pt != 1110);

	// 一言メッセージ
	if (this.hitokoto_c > 0) {
		this.hitokoto_c--;
		drawHitokotoMessage.apply(this);
	}
};

/**
 * 一言メッセージを表示
 */
export const drawHitokotoMessage = function() {
	const tmp_num_01 = 208;
	const tmp_num_02 = 56;
	const tmp_num_03 = 224;
	let tmp_cnt_01 = 0;
	for (let i = 0; i <= 2; i++) {
		let tmp_str_04 = i + 1;
		let tmp_str_01 = "hitokoto" + this.hitokoto_num + "-" + tmp_str_04;
		tmp_str_01 = this.gg.ap.getParameter(tmp_str_01);
		tmp_str_04 = parseInt(tmp_str_01);
		if (isNaN(tmp_str_04)) tmp_str_04 = -1;
		if (tmp_str_04 != 0) tmp_cnt_01++;
	}

	this.km.drawWindowbox(tmp_num_01, tmp_num_02, tmp_num_03, 30 + tmp_cnt_01 * 14);
	this.hg.setFont(new Font("Dialog", 0, 12));
	this.hg.setColor(Color.cyan);
	const tmp_str_02 = "hitokoto" + this.hitokoto_num + "_name";
	this.hg.drawString(this.gg.ap.getParameter(tmp_str_02), tmp_num_01 + 6, tmp_num_02 + 6 + 12);
	this.hg.setColor(Color.white);
	tmp_cnt_01 = 0;
	for (let i = 0; i <= 2; i++) {
		let tmp_num_05 = i + 1;
		let tmp_str_03 = "hitokoto" + this.hitokoto_num + "-" + tmp_num_05;
		tmp_str_03 = this.gg.ap.getParameter(tmp_str_03);
		tmp_num_05 = parseInt(tmp_str_03);
		if (isNaN(tmp_num_05)) tmp_num_05 = -1;
		if (tmp_num_05 != 0) {
			this.hg.drawString(tmp_str_03, tmp_num_01 + 6, tmp_num_02 + 6 + 18 + tmp_cnt_01 * 14 + 12);
			tmp_cnt_01++;
		}
	}
};
