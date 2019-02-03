import { CharacterObject } from "../CharacterObject";

class Boss extends CharacterObject {
	move(mp) {
		switch (this.c) {
			case 40:
				// 死亡
				// 消えてからしばらくして人面星が出現する
				if (this.c1 < 20) this.c1++;
				// 人面星を配置する
				if (this.c1 === 15)
					mp.mSet(mp.maps.wx + 256, mp.maps.wy + 128, 2200);
				this.pt = 0;
				break;

			case 60:
				// 踏まれた
				this.c1++;
				if (this.c4 <= 0) {
					// 死亡
					if (this.c1 >= 26) {
						this.c = 40;
						this.c1 = 0;
						mp.addScore(10);
					}
				} else if (this.c1 >= 11) this.c = 150;
				this.pt = 1010;
				break;

			case 65:
				// 右を向いている時に踏まれて死ぬことはない
				this.c1++;
				if (this.c1 >= 11) this.c = 155;
				this.pt = 1015;
				break;

			case 67:
				this.vy += 4;
				if (this.vy > 28) this.vy = 28;
				this.x += this.vx;
				this.y += this.vy;
				if (this.y >= mp.maps.wy + 320 + 16) {
					this.c = 40;
					this.c1 = 0;
					mp.addScore(10);
				}
				if (this.muki == 1) this.pt = 1005;
				else this.pt = 1000;
				break;

			case 70:
				this.c1++;
				if (this.c4 <= 0) {
					if (this.c1 >= 26) {
						this.c = 40;
						this.c1 = 0;
						mp.addScore(10);
					}
				} else if (this.c1 >= 11) this.c = 250;
				this.pt = 1110;
				break;

			case 75:
				this.c1++;
				if (this.c1 >= 11) this.c = 255;
				this.pt = 1115;
				break;

			case 77:
				this.vy += 4;
				if (this.vy > 28) this.vy = 28;
				this.x += this.vx;
				this.y += this.vy;
				if (this.y >= mp.maps.wy + 320 + 16) {
					this.c = 40;
					this.c1 = 0;
					mp.addScore(10);
				}
				if (this.muki == 1) this.pt = 1105;
				else this.pt = 1100;
				break;

			case 80:
				this.c1++;
				if (this.c4 <= 0) {
					if (this.c1 >= 26) {
						this.c = 40;
						this.c1 = 0;
						mp.addScore(10);
					}
				} else if (this.c1 >= 11) this.c = 350;
				this.pt = 1210;
				break;

			case 85:
				this.c1++;
				if (this.c1 >= 11) this.c = 355;
				this.pt = 1215;
				break;

			case 87:
				this.vy += 4;
				if (this.vy > 28) this.vy = 28;
				this.x += this.vx;
				this.y += this.vy;
				if (this.y >= mp.maps.wy + 320 + 16) {
					this.c = 40;
					this.c1 = 0;
					mp.addScore(10);
				}
				if (this.muki == 1) this.pt = 1205;
				else this.pt = 1200;
				break;

			case 100:
				if (mp.sl_step == 2 || mp.sl_step == 3) {
					this.c = 110;
					this.c1 = 0;
				}
				this.pt = 1000;
				break;

			case 110:
				if (mp.boss_type == 2) {
					var c = 150;
					this.c1++;
					if (this.c1 == 1) mp.tSetBoss(this.x, this.y, c, -2);
					else if (this.c1 == 5) mp.tSetBoss(this.x, this.y, c, -4);
					else if (this.c1 == 7) mp.tSetBoss(this.x, this.y, c, -6);
					else if (this.c1 == 9) mp.tSetBoss(this.x, this.y, c, -8);
					else if (this.c1 == 21) mp.tSetBoss(this.x, this.y, c, -2);
					else if (this.c1 == 91) mp.tSetBoss(this.x, this.y, c, -2);
					else if (this.c1 == 95) mp.tSetBoss(this.x, this.y, c, -4);
					else if (this.c1 == 97) mp.tSetBoss(this.x, this.y, c, -6);
					else if (this.c1 == 99) mp.tSetBoss(this.x, this.y, c, -8);
					else if (this.c1 == 111) mp.tSetBoss(this.x, this.y, c, -2);
					else if (this.c1 == 170) mp.tSetBoss(this.x, this.y, c, -4);
					else if (this.c1 == 180) mp.tSetBoss(this.x, this.y, c, -2);
					else if (this.c1 > 250) this.c1 = 250;
				} else if (mp.boss_type == 3) {
					var c1 = 0x01c2;
					this.c1++;
					if (this.c1 == 5) mp.tSetBoss(this.x, this.y, c1, -3);
					else if (this.c1 == 20) mp.tSetBoss(this.x, this.y, c1, -3);
					else if (this.c1 == 35) mp.tSetBoss(this.x, this.y, c1, -3);
					else if (this.c1 == 50) mp.tSetBoss(this.x, this.y, c1, -3);
					else if (this.c1 == 65) mp.tSetBoss(this.x, this.y, c1, -3);
					else if (this.c1 == 80) mp.tSetBoss(this.x, this.y, c1, -3);
					else if (this.c1 == 95) mp.tSetBoss(this.x, this.y, c1, -3);
					else if (this.c1 == 110)
						mp.tSetBoss(this.x, this.y, c1, -3);
					else if (this.c1 > 250) this.c1 = 250;
				} else if (mp.boss_type == 4) {
					var c2 = 0x028a;
					this.c1++;
					if (this.c1 == 1) mp.tSetBoss(this.x, this.y, c2, -5);
					else if (this.c1 == 15) mp.tSetBoss(this.x, this.y, c2, -3);
					else if (this.c1 == 29) mp.tSetBoss(this.x, this.y, c2, -2);
					else if (this.c1 == 81) mp.tSetBoss(this.x, this.y, c2, -5);
					else if (this.c1 == 95) mp.tSetBoss(this.x, this.y, c2, -3);
					else if (this.c1 == 109)
						mp.tSetBoss(this.x, this.y, c2, -2);
					else if (this.c1 == 165)
						mp.tSetBoss(this.x, this.y, c2, -3);
					else if (this.c1 > 250) this.c1 = 250;
				} else {
					this.c1++;
					if (this.c1 == 3) {
						mp.mSet2(this.x, this.y, 500, -4, -18);
						mp.mSet2(this.x, this.y, 500, 4, -18);
					} else if (this.c1 == 14) {
						mp.mSet2(this.x, this.y, 500, -6, -20);
						mp.mSet2(this.x, this.y, 500, 6, -20);
					} else if (this.c1 == 20) {
						mp.mSet2(this.x, this.y, 500, -3, -24);
						mp.mSet2(this.x, this.y, 500, 3, -24);
					} else if (this.c1 >= 28 && this.c1 <= 98) {
						if (this.c1 % 7 == 0)
							mp.mSet2(
								this.x,
								this.y,
								500,
								-15 + mp.ranInt(20),
								-30
							);
					} else if (this.c1 == 130) {
						var l1 = mp.ranInt(8) + 3;
						mp.mSet2(this.x, this.y, 500, l1, -30);
						mp.mSet2(this.x, this.y, 500, -l1, -30);
					} else if (this.c1 >= 150) this.c1 = 98;
				}
				this.pt = 1000;
				break;

			case 115:
				if (mp.boss_type == 2) {
					var c3 = 150;
					this.c1++;
					if (this.c1 == 1) mp.tSetBoss(this.x, this.y, c3, 2);
					else if (this.c1 == 5) mp.tSetBoss(this.x, this.y, c3, 4);
					else if (this.c1 == 7) mp.tSetBoss(this.x, this.y, c3, 6);
					else if (this.c1 == 9 && mp.boss_type != 3)
						mp.tSetBoss(this.x, this.y, c3, 8);
					else if (this.c1 == 21) mp.tSetBoss(this.x, this.y, c3, 2);
					else if (this.c1 == 91) mp.tSetBoss(this.x, this.y, c3, 2);
					else if (this.c1 == 95) mp.tSetBoss(this.x, this.y, c3, 4);
					else if (this.c1 == 97) mp.tSetBoss(this.x, this.y, c3, 6);
					else if (this.c1 == 99 && mp.boss_type != 3)
						mp.tSetBoss(this.x, this.y, c3, 8);
					else if (this.c1 == 111) mp.tSetBoss(this.x, this.y, c3, 2);
					else if (this.c1 == 170) mp.tSetBoss(this.x, this.y, c3, 4);
					else if (this.c1 == 180) mp.tSetBoss(this.x, this.y, c3, 2);
					else if (this.c1 > 250) this.c1 = 250;
				} else if (mp.boss_type == 3) {
					var c4 = 0x01c2;
					this.c1++;
					if (this.c1 == 5) mp.tSetBoss(this.x, this.y, c4, 3);
					else if (this.c1 == 20) mp.tSetBoss(this.x, this.y, c4, 3);
					else if (this.c1 == 35) mp.tSetBoss(this.x, this.y, c4, 3);
					else if (this.c1 == 50) mp.tSetBoss(this.x, this.y, c4, 3);
					else if (this.c1 == 65) mp.tSetBoss(this.x, this.y, c4, 3);
					else if (this.c1 == 80) mp.tSetBoss(this.x, this.y, c4, 3);
					else if (this.c1 == 95) mp.tSetBoss(this.x, this.y, c4, 3);
					else if (this.c1 == 110) mp.tSetBoss(this.x, this.y, c4, 3);
					else if (this.c1 > 250) this.c1 = 250;
				} else if (mp.boss_type == 4) {
					var c5 = 0x028a;
					this.c1++;
					if (this.c1 == 1) mp.tSetBoss(this.x, this.y, c5, 5);
					else if (this.c1 == 15) mp.tSetBoss(this.x, this.y, c5, 3);
					else if (this.c1 == 29) mp.tSetBoss(this.x, this.y, c5, 2);
					else if (this.c1 == 81) mp.tSetBoss(this.x, this.y, c5, 5);
					else if (this.c1 == 95) mp.tSetBoss(this.x, this.y, c5, 3);
					else if (this.c1 == 109) mp.tSetBoss(this.x, this.y, c5, 2);
					else if (this.c1 == 165) mp.tSetBoss(this.x, this.y, c5, 3);
					else if (this.c1 > 250) this.c1 = 250;
				} else {
					this.c1++;
					if (this.c1 == 3) {
						mp.mSet2(this.x, this.y, 500, -4, -18);
						mp.mSet2(this.x, this.y, 500, 4, -18);
					} else if (this.c1 == 14) {
						mp.mSet2(this.x, this.y, 500, -6, -20);
						mp.mSet2(this.x, this.y, 500, 6, -20);
					} else if (this.c1 == 20) {
						mp.mSet2(this.x, this.y, 500, -3, -24);
						mp.mSet2(this.x, this.y, 500, 3, -24);
					} else if (this.c1 >= 28 && this.c1 <= 98) {
						if (this.c1 % 7 == 0)
							mp.mSet2(
								this.x,
								this.y,
								500,
								15 - mp.ranInt(20),
								-30
							);
					} else if (this.c1 == 130) {
						var i2 = mp.ranInt(8) + 3;
						mp.mSet2(this.x, this.y, 500, i2, -30);
						mp.mSet2(this.x, this.y, 500, -i2, -30);
					} else if (this.c1 >= 150) this.c1 = 98;
				}
				this.pt = 1005;
				break;

			case 150:
				this.x -= 14;
				if (this.x <= mp.sl_wx + 96) {
					this.x = mp.sl_wx + 96;
					this.c = 115;
					this.c1 = 0;
				}
				this.pt = 1000;
				break;

			case 155:
				this.x += 14;
				if (this.x >= mp.sl_wx + 512 - 96 - 32) {
					this.x = mp.sl_wx + 512 - 96 - 32;
					this.c = 110;
					this.c1 = 0;
				}
				this.pt = 1005;
				break;

			case 200:
				if (mp.sl_step == 2 || mp.sl_step == 3) {
					this.c = 210;
					this.c1 = 0;
				}
				this.pt = 1100;
				break;

			case 210:
				this.c1++;
				if (mp.boss2_type == 2) {
					if (this.c1 == 10 || this.c1 == 85 || this.c1 == 215) {
						for (var i = 0; i <= 7; i++) {
							var d = (i * 45 * 3.14) / 180;
							var j2 = Math.floor(Math.cos(d) * 8);
							var l3 = Math.floor(Math.sin(d) * 8) * -1;
							mp.mSet2(this.x, this.y - 8, 710, j2, l3);
						}
					} else if (
						this.c1 == 35 ||
						this.c1 == 110 ||
						this.c1 == 295
					) {
						for (var j = 0; j <= 7; j++) {
							var d1 = ((j * 45 + 15) * 3.14) / 180;
							var k2 = Math.floor(Math.cos(d1) * 8);
							var i4 = Math.floor(Math.sin(d1) * 8) * -1;
							mp.mSet2(this.x, this.y - 8, 710, k2, i4);
						}
					} else if (
						this.c1 == 60 ||
						this.c1 == 135 ||
						this.c1 == 375
					) {
						for (var k = 0; k <= 7; k++) {
							var d2 = ((k * 45 + 30) * 3.14) / 180;
							var l2 = Math.floor(Math.cos(d2) * 8);
							var j4 = Math.floor(Math.sin(d2) * 8) * -1;
							mp.mSet2(this.x, this.y - 8, 710, l2, j4);
						}
					} else if (this.c1 > 445) this.c1 = 0;
				} else if (
					this.c1 == 5 ||
					this.c1 == 35 ||
					this.c1 == 65 ||
					this.c1 == 110 ||
					this.c1 == 185
				)
					mp.mSet(this.x, this.y, 90);
				else if (this.c1 > 185) this.c1 = 110;
				this.pt = 1100;
				break;

			case 215:
				this.c1++;
				if (mp.boss2_type == 2) {
					if (this.c1 == 10 || this.c1 == 85 || this.c1 == 215) {
						for (var l = 0; l <= 7; l++) {
							var d3 = (l * 45 * 3.14) / 180;
							var i3 = Math.floor(Math.cos(d3) * 8);
							var k4 = Math.floor(Math.sin(d3) * 8) * -1;
							mp.mSet2(this.x, this.y - 8, 710, i3, k4);
						}
					} else if (
						this.c1 == 35 ||
						this.c1 == 110 ||
						this.c1 == 295
					) {
						for (var i1 = 0; i1 <= 7; i1++) {
							var d4 = ((i1 * 45 + 15) * 3.14) / 180;
							var j3 = Math.floor(Math.cos(d4) * 8);
							var l4 = Math.floor(Math.sin(d4) * 8) * -1;
							mp.mSet2(this.x, this.y - 8, 710, j3, l4);
						}
					} else if (
						this.c1 == 60 ||
						this.c1 == 135 ||
						this.c1 == 375
					) {
						for (var j1 = 0; j1 <= 7; j1++) {
							var d5 = ((j1 * 45 + 30) * 3.14) / 180;
							var k3 = Math.floor(Math.cos(d5) * 8);
							var i5 = Math.floor(Math.sin(d5) * 8) * -1;
							mp.mSet2(this.x, this.y - 8, 710, k3, i5);
						}
					} else if (this.c1 > 445) this.c1 = 0;
				} else if (
					this.c1 == 5 ||
					this.c1 == 35 ||
					this.c1 == 65 ||
					this.c1 == 110 ||
					this.c1 == 185
				)
					mp.mSet(this.x, this.y, 90);
				else if (this.c1 > 185) this.c1 = 110;
				this.pt = 1105;
				break;

			case 250:
				this.x -= 14;
				if (this.x <= mp.sl_wx + 96) {
					this.x = mp.sl_wx + 96;
					this.c = 215;
					this.c1 = 0;
				}
				this.pt = 1100;
				break;

			case 255:
				this.x += 14;
				if (this.x >= mp.sl_wx + 512 - 96 - 32) {
					this.x = mp.sl_wx + 512 - 96 - 32;
					this.c = 210;
					this.c1 = 0;
				}
				this.pt = 1105;
				break;

			case 300:
				if (mp.sl_step == 2 || mp.sl_step == 3) {
					if (mp.boss3_type >= 2 && mp.boss3_type <= 4) {
						this.c = 360;
						this.vy = -24;
					} else {
						this.c = 310;
					}
					this.c1 = 0;
				}
				this.pt = 1200;
				break;

			case 310:
				this.c1++;
				if (this.c1 == 1) mp.mSet2(this.x, this.y, 800, -5, -32);
				else if (this.c1 == 15) {
					mp.mSet2(this.x, this.y, 800, -10, -32);
					if (mp.co_j.x > this.x - 64) this.c1 = 500;
				} else if (this.c1 == 29)
					mp.mSet2(this.x, this.y, 800, -15, -32);
				else if (this.c1 == 65)
					mp.mSet2(this.x - 2, this.y, 800, -20, -32);
				else if (this.c1 == 80) mp.mSet2(this.x, this.y, 800, -5, -32);
				else if (this.c1 == 105)
					mp.mSet2(this.x, this.y, 800, -15, -32);
				else if (this.c1 == 147)
					mp.mSet2(this.x, this.y, 800, -10, -32);
				else if (this.c1 == 237) this.c1 = 0;
				else if (this.c1 == 520) mp.mSet2(this.x, this.y, 800, 4, -32);
				else if (this.c1 == 530) {
					mp.mSet2(this.x, this.y, 800, -5, -32);
					this.c1 = 1;
				} else if (this.c1 > 530) this.c1 = 1;
				this.pt = 1200;
				break;

			case 315:
				this.c1++;
				if (this.c1 == 1) mp.mSet2(this.x, this.y, 800, 5, -32);
				else if (this.c1 == 15) {
					mp.mSet2(this.x, this.y, 800, 10, -32);
					if (mp.co_j.x < this.x + 64) this.c1 = 500;
				} else if (this.c1 == 29)
					mp.mSet2(this.x, this.y, 800, 15, -32);
				else if (this.c1 == 65)
					mp.mSet2(this.x + 2, this.y, 800, 20, -32);
				else if (this.c1 == 80) mp.mSet2(this.x, this.y, 800, 5, -32);
				else if (this.c1 == 105) mp.mSet2(this.x, this.y, 800, 15, -32);
				else if (this.c1 == 147) mp.mSet2(this.x, this.y, 800, 10, -32);
				else if (this.c1 == 237) this.c1 = 0;
				else if (this.c1 == 520) mp.mSet2(this.x, this.y, 800, -4, -32);
				else if (this.c1 == 530) {
					mp.mSet2(this.x, this.y, 800, 5, -32);
					this.c1 = 1;
				} else if (this.c1 > 530) this.c1 = 1;
				this.pt = 1205;
				break;

			case 350:
				this.x -= 14;
				if (this.x <= mp.sl_wx + 96) {
					this.x = mp.sl_wx + 96;
					if (mp.boss3_type >= 2 && mp.boss3_type <= 4) {
						this.c = 365;
						this.vy = -24;
					} else {
						this.c = 315;
					}
					this.c1 = 0;
				}
				this.pt = 1200;
				break;

			case 355:
				this.x += 14;
				if (this.x >= mp.sl_wx + 512 - 96 - 32) {
					this.x = mp.sl_wx + 512 - 96 - 32;
					if (mp.boss3_type >= 2 && mp.boss3_type <= 4) {
						this.c = 360;
						this.vy = -24;
					} else {
						this.c = 310;
					}
					this.c1 = 0;
				}
				this.pt = 1205;
				break;

			case 360:
				this.pt = 1200;
				if (this.c1 < 5) this.c1++;
				else if (this.c1 < 25) {
					this.c1++;
					this.pt = 1250;
				} else if (this.c1 == 25) {
					if (mp.boss3_type == 3) {
						this.x -= 18;
						if (this.x <= mp.sl_wx + 16) {
							this.x = mp.sl_wx + 16;
							this.c1 = 30;
						}
					} else if (mp.boss3_type == 4) {
						this.x -= 3;
						this.vy += 2;
						if (this.vy > 24) this.vy = 24;
						this.y += this.vy;
						if (this.y >= mp.boss_kijyun_y) {
							this.y = mp.boss_kijyun_y;
							this.vy = -24;
							if (this.x <= mp.sl_wx + 16) this.c1 = 30;
						}
					} else {
						this.x -= 12;
						if (this.x <= mp.sl_wx + 16) {
							this.x = mp.sl_wx + 16;
							this.c1 = 30;
						}
					}
					this.pt = 1250;
				} else if (this.c1 == 30) {
					if (mp.boss3_type == 3) {
						this.x += 18;
						if (this.x >= mp.sl_wx + 512 - 48) {
							this.x = mp.sl_wx + 512 - 48;
							this.c1 = 40;
						}
					} else if (mp.boss3_type == 4) {
						this.x += 4;
						this.vy += 2;
						if (this.vy > 24) this.vy = 24;
						this.y += this.vy;
						if (this.y >= mp.boss_kijyun_y) {
							this.y = mp.boss_kijyun_y;
							this.vy = -24;
							if (this.x >= mp.sl_wx + 512 - 48) this.c1 = 40;
						}
					} else {
						this.x += 8;
						if (this.x >= mp.sl_wx + 512 - 48) {
							this.x = mp.sl_wx + 512 - 48;
							this.c1 = 40;
						}
					}
					this.pt = 1255;
				} else if (this.c1 == 40) {
					this.x -= 2;
					if (this.x <= mp.sl_wx + 512 - 96 - 32) {
						this.x = mp.sl_wx + 512 - 96 - 32;
						this.c1 = -20;
					}
				}
				break;

			case 365:
				this.pt = 1205;
				if (this.c1 < 5) this.c1++;
				else if (this.c1 < 25) {
					this.c1++;
					this.pt = 1255;
				} else if (this.c1 == 25) {
					if (mp.boss3_type == 3) {
						this.x += 18;
						if (this.x >= mp.sl_wx + 512 - 48) {
							this.x = mp.sl_wx + 512 - 48;
							this.c1 = 30;
						}
					} else if (mp.boss3_type == 4) {
						this.x += 3;
						this.vy += 2;
						if (this.vy > 24) this.vy = 24;
						this.y += this.vy;
						if (this.y >= mp.boss_kijyun_y) {
							this.y = mp.boss_kijyun_y;
							this.vy = -24;
							if (this.x >= mp.sl_wx + 512 - 48) this.c1 = 30;
						}
					} else {
						this.x += 12;
						if (this.x >= mp.sl_wx + 512 - 48) {
							this.x = mp.sl_wx + 512 - 48;
							this.c1 = 30;
						}
					}
					this.pt = 1255;
				} else if (this.c1 == 30) {
					if (mp.boss3_type == 3) {
						this.x -= 18;
						if (this.x <= mp.sl_wx + 16) {
							this.x = mp.sl_wx + 16;
							this.c1 = 40;
						}
					} else if (mp.boss3_type == 4) {
						this.x -= 4;
						this.vy += 2;
						if (this.vy > 24) this.vy = 24;
						this.y += this.vy;
						if (this.y >= mp.boss_kijyun_y) {
							this.y = mp.boss_kijyun_y;
							this.vy = -24;
							if (this.x <= mp.sl_wx + 16) this.c1 = 40;
						}
					} else {
						this.x -= 8;
						if (this.x <= mp.sl_wx + 16) {
							this.x = mp.sl_wx + 16;
							this.c1 = 40;
						}
					}
					this.pt = 1250;
				} else if (this.c1 == 40) {
					this.x += 2;
					if (this.x >= mp.sl_wx + 96) {
						this.x = mp.sl_wx + 96;
						this.c1 = -20;
					}
				}
				break;
		}
	}

	/**
	 * 主人公とボスが接触しているかどうか判定します
	 * @param {CharacterObject} j 主人公
	 * @returns {boolean}
	 */
	checkHit(j) {
		return (
			j.c >= 100 &&
			j.c < 200 &&
			this.c >= 100 &&
			Math.abs(this.x - j.x) < 42 &&
			j.y > this.y - 20 &&
			j.y < this.y + 40
		);
	}

	/**
	 * ボスが踏むことのできる状態かどうか判定します
	 * @param {MainProgram} mp
	 * @returns {boolean}
	 */
	isFumuable(mp) {
		return !(this.pt === 1250 || this.pt === 1255);
	}

	/**
	 * 主人公がボスを踏んでいるか判定します
	 * @param {MainProgram} mp
	 */
	checkFumu(mp) {
		const j = mp.co_j;
		return Math.abs(this.x - j.x) < 34 && j.vy > 0;
	}

	/**
	 * ボスが主人公に踏まれてダメージを受けたときの処理をします
	 * @param {MainProgram} mp
	 */
	fumuDamage(mp) {
		const j = mp.co_j;
		this.c4--;
		if (this.c < 200) {
			this.c = 60;
			this.pt = 1010;
		} else if (this.c < 300) {
			this.c = 70;
			this.pt = 1110;
		} else {
			this.c = 80;
			this.pt = 1210;
		}
		if (this.c4 === 1) {
			// 右向き
			this.c += 5;
			this.pt += 5;
		}
		this.c1 = 0;

		// 主人公が敵を踏んだ状態にする
		j.y = this.y;
		j.vy = -320;
		mp.j_jump_type = 1;
		j.c = 110;
		j.c1 = -4;
		j.pt = 109;
	}
}

export { Boss };
