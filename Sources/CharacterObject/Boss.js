import { CharacterObject } from "../CharacterObject";

class Boss extends CharacterObject {
	move(mp) {
		switch (this.c) {
			case 40:
				// 死亡
				// 消えてからしばらくして人面星が出現する
				if (this.c1 < 20) this.c1++;
				if (this.c1 === 15)
					if (mp.j_tokugi === 14 || mp.j_tokugi === 15) {
						// シューティングモード、四方向移動モードの場合は直接クリアさせる
						mp.setStageClear();
					} else {
						// 人面星を配置する
						mp.mSet(mp.maps.wx + 256, mp.maps.wy + 128, 2200);
						mp.gs.rsAddSound(13);
					}
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
						if (mp.j_tokugi === 14 || mp.j_tokugi === 15)
							// シューティングモード、四方向移動モードの場合は100点加算
							mp.addScore(100);
						else mp.addScore(10);
						// HPゲージを閉じる
						if (mp.boss_destroy_type === 2) mp.hideGauge();
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
				if (mp.boss_destroy_type == 2) {
					mp.boss_hp = 0;
					mp.showGauge(
						String(mp.boss_hp),
						"" +
							mp.tdb.getValue("boss_name") +
							"  " +
							mp.boss_hp +
							"/" +
							mp.boss_hp_max
					);
				}
				if (this.y >= mp.maps.wy + 320 + 16) {
					this.c = 40;
					this.c1 = 0;
					if (mp.j_tokugi == 14 || mp.j_tokugi == 15)
						mp.addScore(100);
					else mp.addScore(10);
					if (mp.boss_destroy_type == 2) mp.hideGauge();
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
						if (mp.j_tokugi == 14 || mp.j_tokugi == 15)
							mp.addScore(100);
						else mp.addScore(10);
						if (mp.boss_destroy_type == 2) mp.hideGauge();
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
				if (mp.boss_destroy_type == 2) {
					mp.boss_hp = 0;
					mp.showGauge(
						String(mp.boss_hp),
						"" +
							mp.tdb.getValue("boss2_name") +
							"  " +
							mp.boss_hp +
							"/" +
							mp.boss_hp_max
					);
				}
				if (this.y >= mp.maps.wy + 320 + 16) {
					this.c = 40;
					this.c1 = 0;
					if (mp.j_tokugi == 14 || mp.j_tokugi == 15)
						mp.addScore(100);
					else mp.addScore(10);
					if (mp.boss_destroy_type == 2) mp.hideGauge();
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
						if (mp.j_tokugi == 14 || mp.j_tokugi == 15)
							mp.addScore(100);
						else mp.addScore(10);
						if (mp.boss_destroy_type == 2) mp.hideGauge();
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
				if (mp.boss_destroy_type == 2) {
					mp.boss_hp = 0;
					mp.showGauge(
						String(mp.boss_hp),
						"" +
							mp.tdb.getValue("boss3_name") +
							"  " +
							mp.boss_hp +
							"/" +
							mp.boss_hp_max
					);
				}
				if (this.y >= mp.maps.wy + 320 + 16) {
					this.c = 40;
					this.c1 = 0;
					if (mp.j_tokugi == 14 || mp.j_tokugi == 15)
						mp.addScore(100);
					else mp.addScore(10);
					if (mp.boss_destroy_type == 2) mp.hideGauge();
				}
				if (this.muki == 1) this.pt = 1205;
				else this.pt = 1200;
				break;

			case 100:
				if (mp.sl_step == 2 || mp.sl_step == 3)
					if (mp.boss_destroy_type == 2) {
						this.x -= 8;
						if (this.x <= mp.sl_wx + 512 - 128) {
							this.x = mp.sl_wx + 512 - 128;
							var l4 = Math.floor(
								(mp.boss_hp * 200) / mp.boss_hp_max
							);
							mp.showGauge(
								String(l4),
								"" +
									mp.tdb.getValue("boss_name") +
									"  " +
									mp.boss_hp +
									"/" +
									mp.boss_hp_max
							);
							this.c = 110;
							this.c1 = 0;
						}
					} else {
						this.c = 110;
						this.c1 = 0;
					}
				this.pt = 1000;
				break;

			case 110:
				this.boss1Attack(mp, 0);
				this.pt = 1000;
				break;

			case 115:
				this.boss1Attack(mp, 1);
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
				if (mp.sl_step == 2 || mp.sl_step == 3)
					if (mp.boss_destroy_type == 2) {
						this.x -= 8;
						if (this.x <= mp.sl_wx + 512 - 128) {
							this.x = mp.sl_wx + 512 - 128;
							var k5 = Math.floor(
								(mp.boss_hp * 200) / mp.boss_hp_max
							);
							mp.showGauge(
								String(k5),
								"" +
									mp.tdb.getValue("boss2_name") +
									"  " +
									mp.boss_hp +
									"/" +
									mp.boss_hp_max
							);
							this.c = 210;
							this.c1 = 0;
						}
					} else {
						this.c = 210;
						this.c1 = 0;
					}
				this.pt = 1100;
				break;

			case 210:
				mp.boss_attack_mode = true;
				this.c1++;
				if (mp.boss2_type == 2) {
					if (this.c1 == 10 || this.c1 == 85 || this.c1 == 215) {
						for (var i = 0; i <= 7; i++) {
							var d28 = (i * 45 * 3.14) / 180;
							var k6 = Math.floor(Math.cos(d28) * 8);
							var i8 = Math.floor(Math.sin(d28) * 8) * -1;
							mp.mSet2(this.x, this.y - 8, 710, k6, i8);
							mp.gs.rsAddSound(18);
						}
					} else if (
						this.c1 == 35 ||
						this.c1 == 110 ||
						this.c1 == 295
					) {
						for (var j = 0; j <= 7; j++) {
							var d29 = ((j * 45 + 15) * 3.14) / 180;
							var l6 = Math.floor(Math.cos(d29) * 8);
							var j8 = Math.floor(Math.sin(d29) * 8) * -1;
							mp.mSet2(this.x, this.y - 8, 710, l6, j8);
							mp.gs.rsAddSound(18);
						}
					} else if (
						this.c1 == 60 ||
						this.c1 == 135 ||
						this.c1 == 375
					) {
						for (var k = 0; k <= 7; k++) {
							var d30 = ((k * 45 + 30) * 3.14) / 180;
							var i7 = Math.floor(Math.cos(d30) * 8);
							var k8 = Math.floor(Math.sin(d30) * 8) * -1;
							mp.mSet2(this.x, this.y - 8, 710, i7, k8);
							mp.gs.rsAddSound(18);
						}
					} else if (this.c1 > 445) this.c1 = 0;
				} else if (mp.boss2_type == 3) {
					if (this.c1 == 5 || this.c1 == 125) {
						for (var l = 0; l <= 270; l += 90)
							mp.mSet2(this.x, this.y, 970, l, 0);

						mp.gs.rsAddSound(18);
					} else if (this.c1 == 45) {
						for (var i1 = 30; i1 <= 300; i1 += 90)
							mp.mSet2(this.x, this.y, 970, i1, 0);

						mp.gs.rsAddSound(18);
					} else if (this.c1 == 85) {
						for (var j1 = 60; j1 <= 330; j1 += 90)
							mp.mSet2(this.x, this.y, 970, j1, 0);

						mp.gs.rsAddSound(18);
					} else if (this.c1 > 250) this.c1 = 0;
				} else if (mp.boss2_type == 4) {
					if (this.c1 == 1) {
						mp.gs.rsAddSound(18);
						var d31 = 4.8844447135925293;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d31) * 12),
							Math.floor(Math.sin(d31) * 10)
						);
						d31 = 1.3955556154251099;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d31) * 12),
							Math.floor(Math.sin(d31) * 10)
						);
					} else if (this.c1 == 8) {
						var d32 = 4.5355558395385742;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d32) * 12),
							Math.floor(Math.sin(d32) * 10)
						);
						d32 = 1.7444444894790649;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d32) * 12),
							Math.floor(Math.sin(d32) * 10)
						);
					} else if (this.c1 == 16) {
						var d33 = 4.1866669654846191;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d33) * 12),
							Math.floor(Math.sin(d33) * 10)
						);
						d33 = 2.0933334827423096;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d33) * 12),
							Math.floor(Math.sin(d33) * 10)
						);
					} else if (this.c1 == 24) {
						var d34 = 3.8377780914306641;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d34) * 12),
							Math.floor(Math.sin(d34) * 10)
						);
						d34 = 2.4422223567962646;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d34) * 12),
							Math.floor(Math.sin(d34) * 10)
						);
					} else if (this.c1 == 32) {
						var d35 = 3.4016668796539307;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d35) * 12),
							Math.floor(Math.sin(d35) * 10)
						);
						d35 = 2.878333568572998;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d35) * 12),
							Math.floor(Math.sin(d35) * 10)
						);
					} else if (this.c1 == 56) {
						var d36 = 3.1400001049041748;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d36) * 12),
							Math.floor(Math.sin(d36) * 10)
						);
					} else if (this.c1 == 72) {
						var d37 = 3.4016668796539307;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d37) * 12),
							Math.floor(Math.sin(d37) * 10)
						);
						d37 = 2.878333568572998;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d37) * 12),
							Math.floor(Math.sin(d37) * 10)
						);
					} else if (this.c1 == 80) {
						var d38 = 3.8377780914306641;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d38) * 12),
							Math.floor(Math.sin(d38) * 10)
						);
						d38 = 2.4422223567962646;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d38) * 12),
							Math.floor(Math.sin(d38) * 10)
						);
					} else if (this.c1 == 88) {
						var d39 = 4.1866669654846191;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d39) * 12),
							Math.floor(Math.sin(d39) * 10)
						);
						d39 = 2.0933334827423096;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d39) * 12),
							Math.floor(Math.sin(d39) * 10)
						);
					} else if (this.c1 == 96) {
						var d40 = 4.5355558395385742;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d40) * 12),
							Math.floor(Math.sin(d40) * 10)
						);
						d40 = 1.7444444894790649;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d40) * 12),
							Math.floor(Math.sin(d40) * 10)
						);
					} else if (this.c1 >= 200) this.c1 = 0;
				} else if (mp.boss2_type == 5) {
					if (this.c1 == 5) {
						for (var k1 = 10; k1 <= 310; k1 += 60) {
							mp.mSet2(this.x, this.y, 901, k1, 0);
							mp.mSet2(this.x, this.y, 911, 300 - k1, 0);
						}

						mp.gs.rsAddSound(18);
					} else if (this.c1 == 45) {
						for (var l1 = 30; l1 <= 330; l1 += 60) {
							mp.mSet2(this.x, this.y, 901, l1, 0);
							mp.mSet2(this.x, this.y, 911, 300 - l1, 0);
						}

						mp.gs.rsAddSound(18);
					} else if (this.c1 == 85) {
						for (var i2 = 50; i2 <= 350; i2 += 60) {
							mp.mSet2(this.x, this.y, 901, i2, 0);
							mp.mSet2(this.x, this.y, 911, 300 - i2, 0);
						}

						mp.gs.rsAddSound(18);
					} else if (this.c1 > 270) this.c1 = 0;
				} else if (mp.boss2_type == 6) {
					this.c1--;
					if (this.c1 <= 0) {
						this.c2 = 0;
						this.c1 = 100;
						mp.gs.rsAddSound(18);
						var d41 = 3.1400001049041748;
						mp.mSet2(
							this.x,
							this.y,
							711,
							Math.floor(Math.cos(d41) * 12),
							Math.floor(Math.sin(d41) * 8)
						);
					} else if (this.c1 <= 100) {
						this.c2 += 10;
						if (this.c2 == 40) {
							var d42 = 3.8377780914306641;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d42) * 12),
								Math.floor(Math.sin(d42) * 8)
							);
						} else if (this.c2 == 70) {
							var d43 = 4.3611111640930176;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d43) * 12),
								Math.floor(Math.sin(d43) * 8)
							);
						} else if (this.c2 >= 90) {
							this.c2 = 90;
							var d44 = 4.8844447135925293;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d44) * 12),
								Math.floor(Math.sin(d44) * 8)
							);
							this.c1 = 200;
						}
					} else if (this.c1 <= 200) {
						this.c2 -= 5;
						if (this.c2 == 80) {
							var d45 = 4.5355558395385742;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d45) * 12),
								Math.floor(Math.sin(d45) * 8)
							);
						} else if (this.c2 == 60) {
							var d46 = 4.1866669654846191;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d46) * 12),
								Math.floor(Math.sin(d46) * 8)
							);
						} else if (this.c2 == 30) {
							var d47 = 3.6633334159851074;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d47) * 12),
								Math.floor(Math.sin(d47) * 8)
							);
						} else if (this.c2 == 0) {
							var d48 = 3.1400001049041748;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d48) * 12),
								Math.floor(Math.sin(d48) * 8)
							);
						} else if (this.c2 == -40) {
							var d49 = 2.4422223567962646;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d49) * 12),
								Math.floor(Math.sin(d49) * 8)
							);
						} else if (this.c2 == -70) {
							var d50 = 1.918889045715332;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d50) * 12),
								Math.floor(Math.sin(d50) * 8)
							);
						} else if (this.c2 <= -100) {
							this.c2 = -100;
							var d51 = 1.3955556154251099;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d51) * 12),
								Math.floor(Math.sin(d51) * 8)
							);
							this.c1 = 300;
						}
					} else if (this.c1 <= 300) {
						this.c2 += 2;
						if (this.c2 == -60) {
							var d52 = 2.0933334827423096;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d52) * 12),
								Math.floor(Math.sin(d52) * 8)
							);
						} else if (this.c2 == -30) {
							var d53 = 2.6166667938232422;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d53) * 12),
								Math.floor(Math.sin(d53) * 8)
							);
						} else if (this.c2 == 0) {
							var d54 = 3.1400001049041748;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d54) * 12),
								Math.floor(Math.sin(d54) * 8)
							);
						} else if (this.c2 == 30) {
							var d55 = 3.6633334159851074;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d55) * 12),
								Math.floor(Math.sin(d55) * 8)
							);
						} else if (this.c2 == 60) {
							var d56 = 4.1866669654846191;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d56) * 12),
								Math.floor(Math.sin(d56) * 8)
							);
						} else if (this.c2 >= 90) {
							this.c2 = 90;
							var d57 = 4.7100000381469727;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d57) * 12),
								Math.floor(Math.sin(d57) * 8)
							);
							this.c1 = 400;
						}
					} else {
						this.c2 -= 2;
						if (this.c2 == 60) {
							var d58 = 4.1866669654846191;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d58) * 12),
								Math.floor(Math.sin(d58) * 8)
							);
						} else if (this.c2 == 30) {
							var d59 = 3.6633334159851074;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d59) * 12),
								Math.floor(Math.sin(d59) * 8)
							);
						} else if (this.c2 == 0) {
							var d60 = 3.1400001049041748;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d60) * 12),
								Math.floor(Math.sin(d60) * 8)
							);
						} else if (this.c2 == -30) {
							var d61 = 2.6166667938232422;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d61) * 12),
								Math.floor(Math.sin(d61) * 8)
							);
						} else if (this.c2 == -60) {
							var d62 = 2.0933334827423096;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d62) * 12),
								Math.floor(Math.sin(d62) * 8)
							);
						} else if (this.c2 <= -90) {
							this.c2 = -90;
							var d63 = 1.5700000524520874;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d63) * 12),
								Math.floor(Math.sin(d63) * 8)
							);
							this.c1 = 300;
						}
					}
				} else if (mp.boss2_type == 7) this.c1 = 0;
				else if (mp.boss2_type == 8) {
					if (this.c1 == 5 || this.c1 == 45 || this.c1 == 85) {
						mp.mSet(this.x, this.y, 95);
						mp.gs.rsAddSound(18);
					} else if (this.c1 > 165) this.c1 = 4;
				} else if (
					this.c1 == 5 ||
					this.c1 == 35 ||
					this.c1 == 65 ||
					this.c1 == 110 ||
					this.c1 == 185
				) {
					mp.mSet(this.x, this.y, 90);
					mp.gs.rsAddSound(18);
				} else if (this.c1 > 185) this.c1 = 110;
				this.pt = 1100;
				if (mp.boss2_type == 6) this.pt = 1101;
				break;

			case 215:
				mp.boss_attack_mode = true;
				this.c1++;
				if (mp.boss2_type == 2) {
					if (this.c1 == 10 || this.c1 == 85 || this.c1 == 215) {
						for (var j2 = 0; j2 <= 7; j2++) {
							var d64 = (j2 * 45 * 3.14) / 180;
							var j7 = Math.floor(Math.cos(d64) * 8);
							var l8 = Math.floor(Math.sin(d64) * 8) * -1;
							mp.mSet2(this.x, this.y - 8, 710, j7, l8);
							mp.gs.rsAddSound(18);
						}
					} else if (
						this.c1 == 35 ||
						this.c1 == 110 ||
						this.c1 == 295
					) {
						for (var k2 = 0; k2 <= 7; k2++) {
							var d65 = ((k2 * 45 + 15) * 3.14) / 180;
							var k7 = Math.floor(Math.cos(d65) * 8);
							var i9 = Math.floor(Math.sin(d65) * 8) * -1;
							mp.mSet2(this.x, this.y - 8, 710, k7, i9);
							mp.gs.rsAddSound(18);
						}
					} else if (
						this.c1 == 60 ||
						this.c1 == 135 ||
						this.c1 == 375
					) {
						for (var l2 = 0; l2 <= 7; l2++) {
							var d66 = ((l2 * 45 + 30) * 3.14) / 180;
							var l7 = Math.floor(Math.cos(d66) * 8);
							var j9 = Math.floor(Math.sin(d66) * 8) * -1;
							mp.mSet2(this.x, this.y - 8, 710, l7, j9);
							mp.gs.rsAddSound(18);
						}
					} else if (this.c1 > 445) this.c1 = 0;
				} else if (mp.boss2_type == 3) {
					if (this.c1 == 5 || this.c1 == 125) {
						for (var i3 = 0; i3 <= 270; i3 += 90)
							mp.mSet2(this.x, this.y, 980, i3, 0);

						mp.gs.rsAddSound(18);
					} else if (this.c1 == 45) {
						for (var j3 = 30; j3 <= 300; j3 += 90)
							mp.mSet2(this.x, this.y, 980, j3, 0);

						mp.gs.rsAddSound(18);
					} else if (this.c1 == 85) {
						for (var k3 = 60; k3 <= 330; k3 += 90)
							mp.mSet2(this.x, this.y, 980, k3, 0);

						mp.gs.rsAddSound(18);
					} else if (this.c1 > 250) this.c1 = 0;
				} else if (mp.boss2_type == 4) {
					if (this.c1 == 1) {
						mp.gs.rsAddSound(18);
						var d67 = 4.5355558395385742;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d67) * 12),
							Math.floor(Math.sin(d67) * 10)
						);
						d67 = 1.7444444894790649;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d67) * 12),
							Math.floor(Math.sin(d67) * 10)
						);
					} else if (this.c1 == 8) {
						var d68 = 4.8844447135925293;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d68) * 12),
							Math.floor(Math.sin(d68) * 10)
						);
						d68 = 1.3955556154251099;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d68) * 12),
							Math.floor(Math.sin(d68) * 10)
						);
					} else if (this.c1 == 16) {
						var d69 = 5.2333335876464844;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d69) * 12),
							Math.floor(Math.sin(d69) * 10)
						);
						d69 = 1.0466667413711548;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d69) * 12),
							Math.floor(Math.sin(d69) * 10)
						);
					} else if (this.c1 == 24) {
						var d70 = 5.5822224617004395;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d70) * 12),
							Math.floor(Math.sin(d70) * 10)
						);
						d70 = 0.69777780771255493;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d70) * 12),
							Math.floor(Math.sin(d70) * 10)
						);
					} else if (this.c1 == 32) {
						var d71 = 6.0183334350585938;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d71) * 12),
							Math.floor(Math.sin(d71) * 10)
						);
						d71 = 0.2616666853427887;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d71) * 12),
							Math.floor(Math.sin(d71) * 10)
						);
					} else if (this.c1 == 56) {
						var d72 = 0.0;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d72) * 12),
							Math.floor(Math.sin(d72) * 10)
						);
					} else if (this.c1 == 72) {
						var d73 = 6.0183334350585938;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d73) * 12),
							Math.floor(Math.sin(d73) * 10)
						);
						d73 = 0.2616666853427887;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d73) * 12),
							Math.floor(Math.sin(d73) * 10)
						);
					} else if (this.c1 == 80) {
						var d74 = 5.5822224617004395;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d74) * 12),
							Math.floor(Math.sin(d74) * 10)
						);
						d74 = 0.69777780771255493;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d74) * 12),
							Math.floor(Math.sin(d74) * 10)
						);
					} else if (this.c1 == 88) {
						var d75 = 5.2333335876464844;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d75) * 12),
							Math.floor(Math.sin(d75) * 10)
						);
						d75 = 1.0466667413711548;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d75) * 12),
							Math.floor(Math.sin(d75) * 10)
						);
					} else if (this.c1 == 96) {
						var d76 = 4.8844447135925293;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d76) * 12),
							Math.floor(Math.sin(d76) * 10)
						);
						d76 = 1.3955556154251099;
						mp.mSet2(
							this.x,
							this.y,
							710,
							Math.floor(Math.cos(d76) * 12),
							Math.floor(Math.sin(d76) * 10)
						);
					} else if (this.c1 >= 200) this.c1 = 0;
				} else if (mp.boss2_type == 5) {
					if (this.c1 == 5) {
						for (var l3 = 10; l3 <= 310; l3 += 60) {
							mp.mSet2(this.x, this.y, 901, l3, 0);
							mp.mSet2(this.x, this.y, 911, 300 - l3, 0);
						}

						mp.gs.rsAddSound(18);
					} else if (this.c1 == 45) {
						for (var i4 = 30; i4 <= 330; i4 += 60) {
							mp.mSet2(this.x, this.y, 901, i4, 0);
							mp.mSet2(this.x, this.y, 911, 300 - i4, 0);
						}

						mp.gs.rsAddSound(18);
					} else if (this.c1 == 85) {
						for (var j4 = 50; j4 <= 350; j4 += 60) {
							mp.mSet2(this.x, this.y, 901, j4, 0);
							mp.mSet2(this.x, this.y, 911, 300 - j4, 0);
						}

						mp.gs.rsAddSound(18);
					} else if (this.c1 > 270) this.c1 = 0;
				} else if (mp.boss2_type == 6) {
					this.c1--;
					if (this.c1 <= 0) {
						this.c2 = 0;
						this.c1 = 100;
						mp.gs.rsAddSound(18);
						var d77 = 0.0;
						mp.mSet2(
							this.x,
							this.y,
							711,
							Math.floor(Math.cos(d77) * 12),
							Math.floor(Math.sin(d77) * 8)
						);
					} else if (this.c1 <= 100) {
						this.c2 -= 10;
						if (this.c2 == -40) {
							var d78 = 5.5822224617004395;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d78) * 12),
								Math.floor(Math.sin(d78) * 8)
							);
						} else if (this.c2 == -70) {
							var d79 = 5.0588889122009277;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d79) * 12),
								Math.floor(Math.sin(d79) * 8)
							);
						} else if (this.c2 <= -90) {
							this.c2 = -90;
							var d80 = 4.5355558395385742;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d80) * 12),
								Math.floor(Math.sin(d80) * 8)
							);
							this.c1 = 200;
						}
					} else if (this.c1 <= 200) {
						this.c2 += 5;
						if (this.c2 == -80) {
							var d81 = 4.8844447135925293;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d81) * 12),
								Math.floor(Math.sin(d81) * 8)
							);
						} else if (this.c2 == -60) {
							var d82 = 5.2333335876464844;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d82) * 12),
								Math.floor(Math.sin(d82) * 8)
							);
						} else if (this.c2 == -30) {
							var d83 = 5.7566671371459961;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d83) * 12),
								Math.floor(Math.sin(d83) * 8)
							);
						} else if (this.c2 == 0) {
							var d84 = 0.0;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d84) * 12),
								Math.floor(Math.sin(d84) * 8)
							);
						} else if (this.c2 == 40) {
							var d85 = 0.69777780771255493;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d85) * 12),
								Math.floor(Math.sin(d85) * 8)
							);
						} else if (this.c2 == 70) {
							var d86 = 1.2211111783981323;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d86) * 12),
								Math.floor(Math.sin(d86) * 8)
							);
						} else if (this.c2 >= 100) {
							this.c2 = 100;
							var d87 = 1.7444444894790649;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d87) * 12),
								Math.floor(Math.sin(d87) * 8)
							);
							this.c1 = 300;
						}
					} else if (this.c1 <= 300) {
						this.c2 -= 2;
						if (this.c2 == 60) {
							var d88 = 1.0466667413711548;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d88) * 12),
								Math.floor(Math.sin(d88) * 8)
							);
						} else if (this.c2 == 30) {
							var d89 = 0.52333337068557739;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d89) * 12),
								Math.floor(Math.sin(d89) * 8)
							);
						} else if (this.c2 == 0) {
							var d90 = 0.0;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d90) * 12),
								Math.floor(Math.sin(d90) * 8)
							);
						} else if (this.c2 == -30) {
							var d91 = 5.7566671371459961;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d91) * 12),
								Math.floor(Math.sin(d91) * 8)
							);
						} else if (this.c2 == -60) {
							var d92 = 5.2333335876464844;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d92) * 12),
								Math.floor(Math.sin(d92) * 8)
							);
						} else if (this.c2 <= -90) {
							this.c2 = -90;
							var d93 = 4.7100000381469727;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d93) * 12),
								Math.floor(Math.sin(d93) * 8)
							);
							this.c1 = 400;
						}
					} else {
						this.c2 += 2;
						if (this.c2 == -60) {
							var d94 = 5.2333335876464844;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d94) * 12),
								Math.floor(Math.sin(d94) * 8)
							);
						} else if (this.c2 == -30) {
							var d95 = 5.7566671371459961;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d95) * 12),
								Math.floor(Math.sin(d95) * 8)
							);
						} else if (this.c2 == 0) {
							var d96 = 0.0;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d96) * 12),
								Math.floor(Math.sin(d96) * 8)
							);
						} else if (this.c2 == 30) {
							var d97 = 0.52333337068557739;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d97) * 12),
								Math.floor(Math.sin(d97) * 8)
							);
						} else if (this.c2 == 60) {
							var d98 = 1.0466667413711548;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d98) * 12),
								Math.floor(Math.sin(d98) * 8)
							);
						} else if (this.c2 >= 90) {
							this.c2 = 90;
							var d99 = 1.5700000524520874;
							mp.mSet2(
								this.x,
								this.y,
								711,
								Math.floor(Math.cos(d99) * 12),
								Math.floor(Math.sin(d99) * 8)
							);
							this.c1 = 300;
						}
					}
				} else if (mp.boss2_type == 7) this.c1 = 0;
				else if (mp.boss2_type == 8) {
					if (this.c1 == 5 || this.c1 == 45 || this.c1 == 85) {
						mp.mSet(this.x, this.y, 96);
						mp.gs.rsAddSound(18);
					} else if (this.c1 > 165) this.c1 = 4;
				} else if (
					this.c1 == 5 ||
					this.c1 == 35 ||
					this.c1 == 65 ||
					this.c1 == 110 ||
					this.c1 == 185
				) {
					mp.mSet(this.x, this.y, 90);
					mp.gs.rsAddSound(18);
				} else if (this.c1 > 185) this.c1 = 110;
				this.pt = 1105;
				if (mp.boss2_type == 6) this.pt = 1106;
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
				if (mp.sl_step == 2 || mp.sl_step == 3)
					if (mp.boss_destroy_type == 2) {
						this.x -= 8;
						if (this.x <= mp.sl_wx + 512 - 128) {
							this.x = mp.sl_wx + 512 - 128;
							var l5 = Math.floor(
								(mp.boss_hp * 200) / mp.boss_hp_max
							);
							mp.showGauge(
								String(l5),
								"" +
									mp.tdb.getValue("boss3_name") +
									"  " +
									mp.boss_hp +
									"/" +
									mp.boss_hp_max
							);
							if (
								(mp.boss3_type >= 2 && mp.boss3_type <= 4) ||
								(mp.boss3_type >= 6 && mp.boss3_type <= 8)
							) {
								this.c = 360;
								this.vy = -24;
							} else {
								this.c = 310;
							}
							this.c1 = 0;
							this.c2 = 0;
						}
					} else {
						if (
							(mp.boss3_type >= 2 && mp.boss3_type <= 4) ||
							(mp.boss3_type >= 6 && mp.boss3_type <= 8)
						) {
							this.c = 360;
							this.vy = -24;
						} else {
							this.c = 310;
						}
						this.c1 = 0;
						this.c2 = 0;
					}
				this.pt = 1200;
				break;

			case 310:
				mp.boss_attack_mode = true;
				this.c1++;
				if (mp.boss3_type == 5) {
					if (
						this.c1 == 1 ||
						this.c1 == 20 ||
						this.c1 == 40 ||
						this.c1 == 60 ||
						this.c1 == 80 ||
						this.c1 == 100 ||
						this.c1 == 120 ||
						this.c1 == 140
					) {
						if (this.c1 == 1) mp.gs.rsAddSound(22);
						if (this.c1 <= 45)
							mp.mSet2(
								mp.maps.wx + 512 - 32 - mp.ranInt(10) * 8,
								mp.maps.wy - 32,
								740,
								-4,
								9
							);
						mp.mSet2(
							mp.maps.wx + 512 - 32 - 8 * (mp.ranInt(35) + 14),
							mp.maps.wy - 32,
							740,
							-4,
							9
						);
					} else if (
						this.c1 == 15 ||
						this.c1 == 35 ||
						this.c1 == 55 ||
						this.c1 == 75 ||
						this.c1 == 95 ||
						this.c1 == 115 ||
						this.c1 == 135 ||
						this.c1 == 155
					) {
						if (this.c1 <= 55)
							mp.mSet2(
								mp.maps.wx + 512 - 32 - mp.ranInt(10) * 8,
								mp.maps.wy - 32,
								740,
								-4,
								11
							);
						mp.mSet2(
							mp.maps.wx + 512 - 32 - 8 * (mp.ranInt(35) + 14),
							mp.maps.wy - 32,
							740,
							-4,
							11
						);
					} else if (this.c1 >= 250) this.c1 = 55;
				} else if (this.c1 == 1) {
					mp.mSet2(this.x, this.y, 800, -5, -32);
					mp.gs.rsAddSound(22);
				} else if (this.c1 == 15) {
					mp.mSet2(this.x, this.y, 800, -10, -32);
					mp.gs.rsAddSound(22);
					if (mp.co_j.x > this.x - 64) this.c1 = 500;
				} else if (this.c1 == 29) {
					mp.mSet2(this.x, this.y, 800, -15, -32);
					mp.gs.rsAddSound(22);
				} else if (this.c1 == 65) {
					mp.mSet2(this.x - 2, this.y, 800, -20, -32);
					mp.gs.rsAddSound(22);
				} else if (this.c1 == 80) {
					mp.mSet2(this.x, this.y, 800, -5, -32);
					mp.gs.rsAddSound(22);
				} else if (this.c1 == 105) {
					mp.mSet2(this.x, this.y, 800, -15, -32);
					mp.gs.rsAddSound(22);
				} else if (this.c1 == 147) {
					mp.mSet2(this.x, this.y, 800, -10, -32);
					mp.gs.rsAddSound(22);
				} else if (this.c1 == 237) this.c1 = 0;
				else if (this.c1 == 520) {
					mp.mSet2(this.x, this.y, 800, 4, -32);
					mp.gs.rsAddSound(22);
				} else if (this.c1 == 530) {
					mp.mSet2(this.x, this.y, 800, -5, -32);
					mp.gs.rsAddSound(22);
					this.c1 = 1;
				} else if (this.c1 > 530) this.c1 = 1;
				this.pt = 1200;
				break;

			case 315:
				mp.boss_attack_mode = true;
				this.c1++;
				if (mp.boss3_type == 5) {
					if (
						this.c1 == 1 ||
						this.c1 == 20 ||
						this.c1 == 40 ||
						this.c1 == 60 ||
						this.c1 == 80 ||
						this.c1 == 100 ||
						this.c1 == 120 ||
						this.c1 == 140
					) {
						if (this.c1 == 1) mp.gs.rsAddSound(22);
						if (this.c1 <= 45)
							mp.mSet2(
								mp.maps.wx + mp.ranInt(10) * 8,
								mp.maps.wy - 32,
								740,
								4,
								9
							);
						mp.mSet2(
							mp.maps.wx + 8 * (mp.ranInt(35) + 14),
							mp.maps.wy - 32,
							740,
							4,
							9
						);
					} else if (
						this.c1 == 15 ||
						this.c1 == 35 ||
						this.c1 == 55 ||
						this.c1 == 75 ||
						this.c1 == 95 ||
						this.c1 == 115 ||
						this.c1 == 135 ||
						this.c1 == 155
					) {
						if (this.c1 <= 55)
							mp.mSet2(
								mp.maps.wx + mp.ranInt(10) * 8,
								mp.maps.wy - 32,
								740,
								4,
								11
							);
						mp.mSet2(
							mp.maps.wx + 8 * (mp.ranInt(35) + 14),
							mp.maps.wy - 32,
							740,
							4,
							11
						);
					} else if (this.c1 >= 250) this.c1 = 55;
				} else if (this.c1 == 1) {
					mp.mSet2(this.x, this.y, 800, 5, -32);
					mp.gs.rsAddSound(22);
				} else if (this.c1 == 15) {
					mp.mSet2(this.x, this.y, 800, 10, -32);
					mp.gs.rsAddSound(22);
					if (mp.co_j.x < this.x + 64) this.c1 = 500;
				} else if (this.c1 == 29) {
					mp.mSet2(this.x, this.y, 800, 15, -32);
					mp.gs.rsAddSound(22);
				} else if (this.c1 == 65) {
					mp.mSet2(this.x + 2, this.y, 800, 20, -32);
					mp.gs.rsAddSound(22);
				} else if (this.c1 == 80) {
					mp.mSet2(this.x, this.y, 800, 5, -32);
					mp.gs.rsAddSound(22);
				} else if (this.c1 == 105) {
					mp.mSet2(this.x, this.y, 800, 15, -32);
					mp.gs.rsAddSound(22);
				} else if (this.c1 == 147) {
					mp.mSet2(this.x, this.y, 800, 10, -32);
					mp.gs.rsAddSound(22);
				} else if (this.c1 == 237) this.c1 = 0;
				else if (this.c1 == 520) {
					mp.mSet2(this.x, this.y, 800, -4, -32);
					mp.gs.rsAddSound(22);
				} else if (this.c1 == 530) {
					mp.mSet2(this.x, this.y, 800, 5, -32);
					mp.gs.rsAddSound(22);
					this.c1 = 1;
				} else if (this.c1 > 530) this.c1 = 1;
				this.pt = 1205;
				break;

			case 350:
				this.x -= 14;
				if (this.x <= mp.sl_wx + 96) {
					this.x = mp.sl_wx + 96;
					if (
						(mp.boss3_type >= 2 && mp.boss3_type <= 4) ||
						(mp.boss3_type >= 6 && mp.boss3_type <= 8)
					) {
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
					if (
						(mp.boss3_type >= 2 && mp.boss3_type <= 4) ||
						(mp.boss3_type >= 6 && mp.boss3_type <= 8)
					) {
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
				if (this.c1 < 5) {
					this.c1++;
					this.c2 = 0;
				} else if (this.c1 < 25) {
					this.c1++;
					mp.boss_attack_mode = true;
					this.pt = 1250;
					if (mp.boss3_type >= 6 && mp.boss3_type <= 8) {
						this.pt = 1251;
						this.c2 -= 15;
						if (mp.boss3_type == 7) this.c2 -= 15;
						if (this.c2 < 0) this.c2 += 360;
					}
				} else if (this.c1 == 25) {
					mp.boss_attack_mode = true;
					if (mp.boss3_type == 3 || mp.boss3_type == 7) {
						this.x -= 18;
						if (this.x <= mp.sl_wx + 16) {
							this.x = mp.sl_wx + 16;
							this.c1 = 30;
						}
					} else if (mp.boss3_type == 4 || mp.boss3_type == 8) {
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
					if (mp.boss3_type >= 6 && mp.boss3_type <= 8) {
						this.pt = 1251;
						this.c2 -= 15;
						if (mp.boss3_type == 7) this.c2 -= 15;
						if (this.c2 < 0) this.c2 += 360;
					}
				} else if (this.c1 == 30) {
					mp.boss_attack_mode = true;
					if (mp.boss3_type == 3 || mp.boss3_type == 7) {
						this.x += 18;
						if (this.x >= mp.sl_wx + 512 - 48) {
							this.x = mp.sl_wx + 512 - 48;
							this.c1 = 40;
						}
					} else if (mp.boss3_type == 4 || mp.boss3_type == 8) {
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
					if (mp.boss3_type >= 6 && mp.boss3_type <= 8) {
						this.pt = 1256;
						this.c2 += 15;
						if (mp.boss3_type == 7) this.c2 += 15;
						if (this.c2 >= 360) this.c2 -= 360;
					}
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
					mp.boss_attack_mode = true;
					this.pt = 1255;
					if (mp.boss3_type >= 6 && mp.boss3_type <= 8) {
						this.pt = 1256;
						this.c2 += 15;
						if (mp.boss3_type == 7) this.c2 += 15;
						if (this.c2 >= 360) this.c2 -= 360;
					}
				} else if (this.c1 == 25) {
					if (mp.boss3_type == 3 || mp.boss3_type == 7) {
						this.x += 18;
						if (this.x >= mp.sl_wx + 512 - 48) {
							this.x = mp.sl_wx + 512 - 48;
							this.c1 = 30;
						}
					} else if (mp.boss3_type == 4 || mp.boss3_type == 8) {
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
					if (mp.boss3_type >= 6 && mp.boss3_type <= 8) {
						this.pt = 1256;
						this.c2 += 15;
						if (mp.boss3_type == 7) this.c2 += 15;
						if (this.c2 >= 360) this.c2 -= 360;
					}
				} else if (this.c1 == 30) {
					mp.boss_attack_mode = true;
					if (mp.boss3_type == 3 || mp.boss3_type == 7) {
						this.x -= 18;
						if (this.x <= mp.sl_wx + 16) {
							this.x = mp.sl_wx + 16;
							this.c1 = 40;
						}
					} else if (mp.boss3_type == 4 || mp.boss3_type == 8) {
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
					if (mp.boss3_type >= 6 && mp.boss3_type <= 8) {
						this.pt = 1251;
						this.c2 -= 15;
						if (mp.boss3_type == 7) this.c2 -= 15;
						if (this.c2 < 0) this.c2 += 360;
					}
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
	 * boss1の攻撃中の動作
	 * @param {MainProgram} mp
	 * @param {number} direction default:0 ボスの向き 1なら左向き
	 */
	boss1Attack(mp, direction = 0) {
		// 左向きなら1 右向きなら-1
		const mirror = direction === 1 ? -1 : 1;
		// 長さが同じ配列をまとめる
		const zip = (a, b) => a.map((v, i) => [v, b[i]]);
		mp.boss_attack_mode = true;
		if (mp.boss_type === 2) {
			this.c1++;
			const attack_count = [
				1,
				5,
				7,
				9,
				21,
				91,
				95,
				97,
				99,
				111,
				170,
				180
			];
			const attack_mode = [
				-2,
				-4,
				-6,
				-8,
				-2,
				-2,
				-4,
				-6,
				-8,
				-2,
				-4,
				-2
			];
			if (this.c1 === 1) mp.gs.rsAddSound(17);
			for (const [count, mode] of zip(attack_count, attack_mode)) {
				if (this.c1 === count) {
					mp.tSetBoss(this.x, this.y, 150, mode * mirror);
					break;
				}
			}
			if (this.c1 > 250) this.c1 = 250;
		} else if (mp.boss_type === 3) {
			this.c1++;
			const attack_count = [5, 20, 35, 50, 65, 80, 95, 110];
			if (this.c1 === 5) mp.gs.rsAddSound(17);
			for (const count of attack_count) {
				if (this.c1 === count) {
					mp.tSetBoss(this.x, this.y, 450, -3 * mirror);
					break;
				}
			}
			if (this.c1 > 250) this.c1 = 250;
		} else if (mp.boss_type === 4) {
			this.c1++;
			const attack_count = [1, 15, 29, 81, 95, 109, 165];
			const attack_mode = [-5, -3, -2, -5, -3, -2, -3];
			if (this.c1 === 1) mp.gs.rsAddSound(17);
			for (const [count, mode] of zip(attack_count, attack_mode)) {
				if (this.c1 === count) {
					mp.tSetBoss(this.x, this.y, 650, mode * mirror);
					break;
				}
			}
			if (this.c1 > 250) this.c1 = 250;
		} else if (mp.boss_type === 5) {
			this.c1++;
			const attack_count = [
				1,
				8,
				16,
				24,
				32,
				40,
				48,
				64,
				72,
				80,
				88,
				96,
				104,
				112
			];
			const directions =
				direction !== 1
					? [
							4.8844447135925293,
							4.5355558395385742,
							4.1866669654846191,
							3.8377780914306641,
							3.4888889789581299,
							3.1400001049041748,
							3.3144445419311523,
							3.6633334159851074,
							4.0122222900390625,
							4.3611111640930176,
							4.1866669654846191,
							3.8377780914306641,
							3.4888889789581299,
							3.1400001049041748
					  ]
					: [
							4.5355558395385742,
							4.8844447135925293,
							5.2333335876464844,
							5.5822224617004395,
							5.9311108589172363,
							0.0,
							6.105555534362793,
							5.7566671371459961,
							5.4077777862548828,
							5.0588889122009277,
							5.2333335876464844,
							5.5822224617004395,
							5.9311108589172363,
							0.0
					  ];
			if (this.c1 === 1) mp.gs.rsAddSound(17);
			for (const [count, dir] of zip(attack_count, directions)) {
				if (this.c1 === count) {
					const x = Math.floor(Math.cos(dir) * 12);
					const y = Math.floor(Math.sin(dir) * 10);
					mp.mSet2(this.x, this.y + 16, 740, x, y);
					break;
				}
			}
			if (this.c1 >= 200) this.c1 = 0;
		} else {
			this.c1++;
			if (this.c1 === 3) mp.gs.rsAddSound(17);
			if (this.c1 === 3) {
				mp.mSet2(this.x, this.y, 500, -4, -18);
				mp.mSet2(this.x, this.y, 500, 4, -18);
			} else if (this.c1 === 14) {
				mp.mSet2(this.x, this.y, 500, -6, -20);
				mp.mSet2(this.x, this.y, 500, 6, -20);
			} else if (this.c1 === 20) {
				mp.mSet2(this.x, this.y, 500, -3, -24);
				mp.mSet2(this.x, this.y, 500, 3, -24);
			} else if (this.c1 >= 28 && this.c1 <= 98) {
				if (this.c1 % 7 === 0)
					mp.mSet2(
						this.x,
						this.y,
						500,
						(-15 + mp.ranInt(20)) * mirror,
						-30
					);
			} else if (this.c1 === 130) {
				const dir = mp.ranInt(8) + 3;
				mp.mSet2(this.x, this.y, 500, dir, -30);
				mp.mSet2(this.x, this.y, 500, -dir, -30);
			} else if (this.c1 >= 150) this.c1 = 98;
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
		if (
			this.pt === 1250 ||
			this.pt === 1255 ||
			this.pt === 1251 ||
			this.pt === 1256
		)
			return false;
		if (mp.j_tokugi === 10 || (this.j_tokugi >= 12 && this.j_tokugi <= 15))
			return false;
		if (mp.boss_destroy_type === 2) return false;
		return true;
	}

	/**
	 * 主人公がボスを踏んでいるか判定します
	 * @param {MainProgram} mp
	 */
	checkFumu(mp) {
		const j = mp.co_j;
		if (j.vy <= 0) return false;
		if (mp.easy_mode === 2) {
			// イージーモードの場合は当たり判定が大きい
			return this.checkHit(j);
		}
		return Math.abs(b.x - j.x) < 34;
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
		mp.gs.rsAddSound(8);

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
