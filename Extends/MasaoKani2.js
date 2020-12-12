// MasaoKani2クラス
CanvasMasao.MasaoKani2 = function (mc) {
	var Applet1;
	var boss_v;
	var boss_x;
	var boss_y;
	var boss_width;
	var boss_height;
	var boss_vx;
	var boss_vy;
	var boss_kakudo;
	var boss_x_shoki;
	var boss_y_shoki;
	var boss_speed;
	var boss_hp;
	var boss_hp_max;
	var boss_jyoutai;
	var boss_jyoutai_b;
	var boss_c1;
	var boss_hmove_f;
	var boss_bc;
	var boss_ac;
	var boss_anime_type;
	var boss_shageki_c;
	var boss_shageki_c2;
	var boss_name;
	var boss_ugoki;
	var boss_waza_select;
	var boss_waza_select_option;
	var boss_waza;
	var boss_waza_wait;
	var boss_waza_max;
	var boss_waza_genzai;
	var boss_fumeru_f;
	var boss_tail_f;
	var boss_destroy;
	var boss_kyo_f;
	var boss_kyo_width;
	var boss_kyo_height;
	var boss_left1_img;
	var boss_right1_img;
	var boss_left2_img;
	var boss_right2_img;
	var boss_tubure_left_img;
	var boss_tubure_right_img;
	var sl_x;
	var ximage_view_x;
	var ximage_x;
	var ximage_y;
	var ximage_c;
	var ximage_img;
	var x_backimage_view_x;
	var x_backimage_vf;
	var x_backimage_img;

	boss_waza = new Array(3);
	boss_waza_wait = new Array(3);
	boss_waza_max = 46;
	ximage_view_x = new Array(4);
	ximage_x = new Array(4);
	ximage_y = new Array(4);
	ximage_c = new Array(4);
	ximage_img = new Array(4);
	x_backimage_view_x = new Array(8);
	x_backimage_vf = new Array(8);
	x_backimage_img = new Array(8);

	userInitJS();

	this.masaoEvent = function (g, image) {
		const mode = Applet1.getMode();
		if (mode == 1) userTitleJS(g);
		else if (mode >= 100 && mode < 200) {
			if (Applet1.getJSMes() == 1) {
				Applet1.setJSMes("2");
				userGameStartJS();
			} else {
				userGameJS(g, Applet1.getViewXReal(), Applet1.getViewYReal());
			}
		} else if (mode == 200) userGameoverJS(g);
		else if (mode == 300) userEndingJS(g);
		else if (mode == 400) userChizuJS(g);
		my_offscreen_img = image;
	};

	function userInitJS() {
		Applet1 = mc;
		loadBossImage();
		loadXBackImage();
	}

	function userTitleJS(g) {}

	function userGameStartJS() {
		var i = getParamInt("j_hp");
		if (i < 1) i = 1;
		if (i > 1) {
			Applet1.setMyMaxHP(i);
			var s = getParameter("j_hp_name");
			if (s == null) s = "";
			Applet1.showMyHP(s);
		}
		if (getParamInt("j_equip_fire") == 2) Applet1.equipFire(1);
		i = getParamInt("j_equip_grenade");
		if (i >= 1) Applet1.equipGrenade(i);
		initXImage();
		initXBackImage();
		initBoss();
	}

	function userGameJS(g, i, j) {
		if (boss_jyoutai > 0) moveBoss(g, i, j);
		moveXBackImage();
		moveXImage(g, i);
	}

	function userGameoverJS(g) {}

	function userEndingJS(g) {}

	function userChizuJS(g) {}

	function getParamInt(s) {
		var i = parseInt(getParameter(s));
		if (isNaN(i)) i = -1;
		return i;
	}

	function loadBossImage() {
		boss_v = getParamInt("oriboss_v");
		if (boss_v >= 2) {
			boss_anime_type = getParamInt("oriboss_anime_type");
			if (boss_anime_type != 2) boss_anime_type = 1;
			var s = Applet1.getParameter("filename_oriboss_left1");
			boss_left1_img = Applet1.getImage(s);
			s = Applet1.getParameter("filename_oriboss_right1");
			boss_right1_img = Applet1.getImage(s);
			s = Applet1.getParameter("filename_oriboss_tubure_left");
			boss_tubure_left_img = Applet1.getImage(s);
			s = Applet1.getParameter("filename_oriboss_tubure_right");
			boss_tubure_right_img = Applet1.getImage(s);
			if (boss_anime_type != 2) {
				var s1 = Applet1.getParameter("filename_oriboss_left2");
				boss_left2_img = Applet1.getImage(s1);
				s1 = Applet1.getParameter("filename_oriboss_right2");
				boss_right2_img = Applet1.getImage(s1);
			}
		}
	}

	function initBoss() {
		boss_v = getParamInt("oriboss_v");
		if (boss_v >= 2) {
			boss_jyoutai = 30;
			boss_jyoutai_b = boss_jyoutai;
			boss_c1 = 0;
			boss_ac = 0;
			boss_hmove_f = false;
			boss_name = getParameter("oriboss_name");
			if (boss_name == null) boss_name = "";
			boss_hp = getParamInt("oriboss_hp");
			if (boss_hp < 1) boss_hp = 1;
			boss_hp_max = boss_hp;
			if (boss_v == 3) {
				if (mc.mp.co_b.c == 300) {
					mc.mp.co_b.c = 0;
					boss_x = mc.mp.co_b.x;
					boss_y = mc.mp.co_b.y + 16;
				} else {
					boss_jyoutai = 0;
				}
			} else {
				boss_x = getParamInt("oriboss_x");
				if (boss_x < 0) boss_x = 0;
				if (boss_x > mc.mp.mapWidth) boss_x = mc.mp.mapWidth;
				boss_x = (boss_x + 1) * 32;
				boss_y = getParamInt("oriboss_y");
				if (boss_y < 0) boss_y = 0;
				if (boss_y > mc.mp.mapHeight) boss_y = mc.mp.mapHeight;
				boss_y = (boss_y + 10) * 32;
			}
			boss_x_shoki = boss_x;
			boss_y_shoki = boss_y;
			boss_width = getParamInt("oriboss_width");
			if (boss_width < 32) boss_width = 32;
			boss_height = getParamInt("oriboss_height");
			if (boss_height < 32) boss_height = 32;
			boss_speed = getParamInt("oriboss_speed");
			if (boss_speed < 1) boss_speed = 1;
			boss_vx = -4;
			boss_ugoki = getParamInt("oriboss_ugoki");
			if (boss_ugoki < 1) boss_ugoki = 1;
			if (boss_ugoki > 27) boss_ugoki = 1;
			boss_waza_select = getParamInt("oriboss_waza_select");
			if (boss_waza_select < 1) boss_waza_select = 1;
			if (boss_waza_select > 10) boss_waza_select = 1;
			boss_waza_select_option = getParamInt("oriboss_waza_select_option");
			if (boss_waza_select_option < 0) boss_waza_select_option = 3;
			if (boss_waza_select_option < 1) boss_waza_select_option = 1;
			boss_waza[0] = getParamInt("oriboss_waza1");
			if (boss_waza[0] < 1) boss_waza[0] = 1;
			if (boss_waza[0] > boss_waza_max) boss_waza[0] = boss_waza_max;
			boss_waza[1] = getParamInt("oriboss_waza2");
			if (boss_waza[1] < 1) boss_waza[1] = 1;
			if (boss_waza[1] > boss_waza_max) boss_waza[1] = boss_waza_max;
			boss_waza[2] = getParamInt("oriboss_waza3");
			if (boss_waza[2] < 1) boss_waza[2] = 1;
			if (boss_waza[2] > boss_waza_max) boss_waza[2] = boss_waza_max;
			boss_waza_wait[0] = getParamInt("oriboss_waza1_wait");
			if (boss_waza_wait[0] < 1) boss_waza_wait[0] = 1;
			boss_waza_wait[1] = getParamInt("oriboss_waza2_wait");
			if (boss_waza_wait[1] < 1) boss_waza_wait[1] = 1;
			boss_waza_wait[2] = getParamInt("oriboss_waza3_wait");
			if (boss_waza_wait[2] < 1) boss_waza_wait[2] = 1;
			boss_waza_genzai = 0;
			boss_fumeru_f = getParamInt("oriboss_fumeru_f");
			if (boss_fumeru_f < 1 || boss_fumeru_f > 4) boss_fumeru_f = 1;
			boss_tail_f = getParamInt("oriboss_tail_f");
			if (boss_tail_f != 2) boss_tail_f = 1;
			boss_destroy = getParamInt("oriboss_destroy");
			if (boss_destroy != 2) boss_destroy = 1;
			boss_kyo_f = false;
			boss_kyo_width = boss_width;
			boss_kyo_height = boss_height;
			if (boss_jyoutai > 0) {
				boss_anime_type = getParamInt("oriboss_anime_type");
				if (boss_anime_type != 2) boss_anime_type = 1;
				sl_x = boss_x - mc.gg.di.width;
				Applet1.setScrollLock(sl_x);
				boss_shageki_c = 5;
			}
		} else {
			boss_jyoutai = 0;
		}
	}

	function moveBoss(g, i, j) {
		if (boss_jyoutai == 30) {
			if (i >= sl_x) boss_jyoutai = 100;
			return;
		}
		if (boss_jyoutai == 20) {
			boss_bc = boss_bc - 1;
			if (boss_bc <= 0) {
				Applet1.setStageClear();
				boss_jyoutai = 0;
			}
		} else if (boss_jyoutai == 50) {
			boss_bc = boss_bc - 1;
			if (boss_bc <= 0) {
				boss_jyoutai = 0;
				Applet1.hideGauge();
				Applet1.addScore(1000);
				if (boss_destroy == 2) {
					boss_jyoutai = 20;
					boss_bc = 30;
				} else {
					Applet1.setMapchip(
						(i >> 5) - 1 + rounddown(mc.gg.di.width / 32 / 2) - 2,
						(j >> 5) - 10 + rounddown(mc.gg.di.height / 32) - 6,
						8
					);
				}
			}
		} else if (boss_jyoutai == 80) {
			boss_bc = boss_bc - 1;
			if (boss_bc <= 0) boss_jyoutai = boss_jyoutai_b;
		} else if (boss_jyoutai >= 100) {
			if (boss_jyoutai == 100) {
				boss_x = boss_x + boss_vx;
				if (boss_ugoki == 24 || boss_ugoki == 25 || boss_ugoki == 26) {
					if (boss_x + (boss_width >> 1) <= sl_x + rounddown(mc.gg.di.width / 2)) {
						boss_x = sl_x + rounddown(mc.gg.di.width / 2) - (boss_width >> 1);
						if (boss_ugoki == 24) {
							// 中央で停止
							boss_jyoutai = 2500;
							boss_vx = boss_speed * -1;
							boss_vy = 0;
						} else if (boss_ugoki == 26) {
							// 巨大化 中央から
							boss_jyoutai = 2700;
							boss_vx = boss_speed * -1;
							boss_vy = 0;
							boss_kyo_f = true;
						} else {
							// 中央で停止 主人公の方を向く
							boss_jyoutai = 2600;
							boss_vx = boss_speed * -1;
							if (boss_x + (boss_width >> 1) < mc.mp.co_j.x + 15) boss_vx = boss_speed;
							boss_vy = 0;
						}
					}
				} else if (boss_ugoki == 4 || boss_ugoki == 5 || boss_ugoki == 20 || boss_ugoki == 21) {
					if (boss_x <= sl_x + mc.gg.di.width - 192) {
						boss_x = sl_x + mc.gg.di.width - 192;
						boss_vx = 0;
						if (boss_ugoki == 4) {
							// 左回り
							boss_jyoutai = 500;
							boss_kakudo = 0;
						} else if (boss_ugoki == 20) {
							// ＨＰが半分以下になると左回り
							boss_jyoutai = 2100;
							boss_kakudo = 0;
						} else if (boss_ugoki == 21) {
							// ＨＰが１／３以下になると左回り
							boss_jyoutai = 2200;
							boss_kakudo = 0;
						} else {
							// 右回り
							boss_jyoutai = 600;
							boss_kakudo = 0;
						}
						boss_jyoutai_b = boss_jyoutai;
					}
				} else if (boss_ugoki == 16 || boss_ugoki == 17) {
					if (boss_x <= sl_x + mc.gg.di.width - boss_width) {
						boss_x = sl_x + mc.gg.di.width - boss_width;
						boss_vx = 0;
						if (boss_ugoki == 16) {
							// 画面の内側を左回り
							boss_jyoutai = 1700;
							boss_vy = boss_speed * -1;
							boss_vx = boss_speed * -1;
						} else {
							// 画面の内側を右回り
							boss_jyoutai = 1800;
							boss_vy = boss_speed;
							boss_vx = boss_speed * -1;
						}
						boss_jyoutai_b = boss_jyoutai;
					}
				} else if (boss_x <= sl_x + mc.gg.di.width - 128) {
					boss_x = sl_x + mc.gg.di.width - 128;
					boss_vx = 0;
					if (boss_ugoki == 2) {
						// 左右移動
						boss_jyoutai = 300;
						boss_vx = boss_speed * -1;
					} else if (boss_ugoki == 3) {
						// 上下移動
						boss_jyoutai = 400;
						boss_vy = boss_speed * -1;
					} else if (boss_ugoki == 6) {
						// 四角形左回り
						boss_jyoutai = 700;
						boss_vy = boss_speed * -1;
						boss_vx = boss_speed * -1;
					} else if (boss_ugoki == 7) {
						// 四角形右回り
						boss_jyoutai = 800;
						boss_vy = boss_speed;
						boss_vx = boss_speed * -1;
					} else if (boss_ugoki == 8) {
						// ＨＰが半分になると左へ移動
						boss_jyoutai = 900;
						boss_vx = boss_speed * -1;
					} else if (boss_ugoki == 9) {
						// ＨＰが減ると左と右へ移動
						boss_jyoutai = 1000;
						boss_vx = boss_speed * -1;
					} else if (boss_ugoki == 10) {
						// ＨＰが半分になると上へ移動
						boss_jyoutai = 1100;
						boss_vx = boss_speed * -1;
					} else if (boss_ugoki == 11) {
						// ＨＰが減ると上と下へ移動
						boss_jyoutai = 1200;
						boss_vx = boss_speed * -1;
					} else if (boss_ugoki == 12) {
						// ＨＰが半分になると下へ移動
						boss_jyoutai = 1300;
						boss_vx = boss_speed * -1;
					} else if (boss_ugoki == 13) {
						// ＨＰが減ると下と上へ移動
						boss_jyoutai = 1400;
						boss_vx = boss_speed * -1;
					} else if (boss_ugoki == 14) {
						// 画面の端で方向転換
						boss_jyoutai = 1500;
						boss_vx = boss_speed * -1;
						boss_vy = boss_speed * -1;
					} else if (boss_ugoki == 15) {
						// ジグザグ移動
						boss_jyoutai = 1600;
						boss_vx = (boss_speed >> 1) * -1;
						boss_vy = boss_speed * -1;
					} else if (boss_ugoki == 18) {
						// ＨＰが半分以下になると左右移動
						boss_jyoutai = 1900;
						boss_vx = boss_speed * -1;
					} else if (boss_ugoki == 19) {
						// ＨＰが１／３以下になると左右移動
						boss_jyoutai = 2000;
						boss_vx = boss_speed * -1;
					} else if (boss_ugoki == 22) {
						// 斜め上へ往復
						boss_jyoutai = 2300;
						boss_vx = boss_speed * -1;
						boss_vy = boss_speed * -1;
					} else if (boss_ugoki == 23) {
						// 斜め下へ往復
						boss_jyoutai = 2400;
						boss_vx = boss_speed * -1;
						boss_vy = boss_speed;
					} else if (boss_ugoki == 27) {
						// 巨大化 右から
						boss_jyoutai = 2800;
						boss_vx = boss_speed * -1;
						boss_vy = 0;
						boss_kyo_f = true;
					} else {
						// 停止
						boss_jyoutai = 200;
						boss_vx = 0;
					}
					boss_jyoutai_b = boss_jyoutai;
				}
			} else if (boss_jyoutai == 200) {
				// 停止
				shagekiBoss();
			} else if (boss_jyoutai == 300) {
				// 左右移動
				if (boss_vx < 0) {
					boss_x += boss_vx;
					if (boss_x <= boss_x_shoki - mc.gg.di.width) {
						boss_x = boss_x_shoki - mc.gg.di.width;
						boss_vx = boss_speed;
					}
				} else {
					boss_x += boss_vx;
					if (boss_x >= boss_x_shoki - boss_width) {
						boss_x = boss_x_shoki - boss_width;
						boss_vx = boss_speed * -1;
					}
				}
				shagekiBoss();
			} else if (boss_jyoutai == 400) {
				// 上下移動
				if (boss_vy < 0) {
					boss_y += boss_vy;
					if (boss_y <= boss_y_shoki - 96) {
						boss_y = boss_y_shoki - 96;
						boss_vy = boss_speed;
					}
				} else {
					boss_y += boss_vy;
					if (boss_y >= boss_y_shoki + 96) {
						boss_y = boss_y_shoki + 96;
						boss_vy = boss_speed * -1;
					}
				}
				shagekiBoss();
			} else if (boss_jyoutai == 500) {
				// 左回り
				boss_kakudo -= boss_speed;
				if (boss_kakudo < 0) boss_kakudo += 360;
				boss_x =
					boss_x_shoki -
					rounddown(mc.gg.di.width / 2) +
					rounddown(
						Math.cos((boss_kakudo * 3.14) / 180) * 32 * ((mc.gg.di.width - 256) / 32 / 2 - 1),
						true,
						mc.mp
					) -
					32;
				boss_y = boss_y_shoki + 32 + rounddown(Math.sin((boss_kakudo * 3.14) / 180) * 96, true, mc.mp) - 32;
				if (boss_kakudo > 180) boss_vx = -1;
				else boss_vx = 1;
				shagekiBoss();
			} else if (boss_jyoutai == 600) {
				// 右回り
				boss_kakudo += boss_speed;
				if (boss_kakudo >= 360) boss_kakudo -= 360;
				boss_x =
					boss_x_shoki -
					rounddown(mc.gg.di.width / 2) +
					rounddown(
						Math.cos((boss_kakudo * 3.14) / 180) * 32 * ((mc.gg.di.width - 256) / 32 / 2 - 1),
						true,
						mc.mp
					) -
					32;
				boss_y = boss_y_shoki + 32 + rounddown(Math.sin((boss_kakudo * 3.14) / 180) * 96, true, mc.mp) - 32;
				if (boss_kakudo < 180) boss_vx = -1;
				else boss_vx = 1;
				shagekiBoss();
			} else if (boss_jyoutai == 700) {
				// 四角形左回り
				if (boss_vx < 0) {
					if (boss_y > boss_y_shoki - 64) {
						boss_y -= boss_speed;
						if (boss_y <= boss_y_shoki - 64) {
							boss_y = boss_y_shoki - 64;
							boss_vy = 0;
							boss_hmove_f = true;
						}
					} else {
						boss_x += boss_vx;
						if (boss_x <= boss_x_shoki - mc.gg.di.width + 128 - boss_width) {
							boss_x = boss_x_shoki - mc.gg.di.width + 128 - boss_width;
							boss_vx = boss_speed;
							boss_vy = boss_speed;
							boss_hmove_f = false;
						}
					}
				} else if (boss_y < boss_y_shoki + 64) {
					boss_y += boss_speed;
					if (boss_y >= boss_y_shoki + 64) {
						boss_y = boss_y_shoki + 64;
						boss_vy = 0;
						boss_hmove_f = true;
					}
				} else {
					boss_x += boss_vx;
					if (boss_x >= boss_x_shoki - 128) {
						boss_x = boss_x_shoki - 128;
						boss_vx = boss_speed * -1;
						boss_vy = boss_speed * -1;
						boss_hmove_f = false;
					}
				}
				shagekiBoss();
			} else if (boss_jyoutai == 800) {
				// 四角形右回り
				if (boss_vx < 0) {
					if (boss_y < boss_y_shoki + 64) {
						boss_y += boss_speed;
						if (boss_y >= boss_y_shoki + 64) {
							boss_y = boss_y_shoki + 64;
							boss_vy = 0;
							boss_hmove_f = true;
						}
					} else {
						boss_x += boss_vx;
						if (boss_x <= boss_x_shoki - mc.gg.di.width + 128 - boss_width) {
							boss_x = boss_x_shoki - mc.gg.di.width + 128 - boss_width;
							boss_vx = boss_speed;
							boss_vy = boss_speed * -1;
							boss_hmove_f = false;
						}
					}
				} else if (boss_y > boss_y_shoki - 64) {
					boss_y -= boss_speed;
					if (boss_y <= boss_y_shoki - 64) {
						boss_y = boss_y_shoki - 64;
						boss_vy = 0;
						boss_hmove_f = true;
					}
				} else {
					boss_x += boss_vx;
					if (boss_x >= boss_x_shoki - 128) {
						boss_x = boss_x_shoki - 128;
						boss_vx = boss_speed * -1;
						boss_vy = boss_speed;
						boss_hmove_f = false;
					}
				}
				shagekiBoss();
			} else if (boss_jyoutai >= 900 && boss_jyoutai < 1000) {
				// ＨＰが半分になると左へ移動
				if (boss_jyoutai == 900) {
					if (boss_hp <= boss_hp_max >> 1) {
						boss_jyoutai = 910;
						boss_vx = boss_speed * -1;
						boss_shageki_c = 2;
					} else {
						shagekiBoss();
					}
				} else if (boss_jyoutai == 910) {
					boss_x += boss_vx;
					if (boss_x <= boss_x_shoki - mc.gg.di.width) {
						boss_x = boss_x_shoki - mc.gg.di.width;
						boss_jyoutai = 920;
						boss_vx = boss_speed;
					}
				} else if (boss_jyoutai == 920) shagekiBoss();
			} else if (boss_jyoutai >= 1000 && boss_jyoutai < 1100) {
				// ＨＰが減ると左と右へ移動
				if (boss_jyoutai == 1000) {
					if (boss_hp <= Math.floor((boss_hp_max * 2) / 3)) {
						boss_jyoutai = 1010;
						boss_vx = boss_speed * -1;
						boss_shageki_c = 2;
					} else {
						shagekiBoss();
					}
				} else if (boss_jyoutai == 1010) {
					boss_x += boss_vx;
					if (boss_x <= boss_x_shoki - mc.gg.di.width) {
						boss_x = boss_x_shoki - mc.gg.di.width;
						boss_jyoutai = 1020;
						boss_vx = boss_speed;
					}
				} else if (boss_jyoutai == 1020) {
					if (boss_hp <= Math.floor(boss_hp_max / 3)) {
						boss_jyoutai = 1030;
						boss_vx = boss_speed;
						boss_shageki_c = 2;
					} else {
						shagekiBoss();
					}
					shagekiBoss();
				} else if (boss_jyoutai == 1030) {
					boss_x += boss_vx;
					if (boss_x >= boss_x_shoki - boss_width) {
						boss_x = boss_x_shoki - boss_width;
						boss_vx = boss_speed * -1;
						boss_jyoutai = 1040;
					}
				} else if (boss_jyoutai == 1040) shagekiBoss();
			} else if (boss_jyoutai >= 1100 && boss_jyoutai < 1200) {
				// ＨＰが半分になると上へ移動
				if (boss_jyoutai == 1100) {
					if (boss_hp <= boss_hp_max >> 1) {
						boss_jyoutai = 1110;
						boss_vy = boss_speed * -1;
						boss_shageki_c = 2;
					} else {
						shagekiBoss();
					}
				} else if (boss_jyoutai == 1110) {
					boss_y += boss_vy;
					if (boss_y <= j + 32 + mc.gg.di.height - 320) {
						boss_y = j + 32 + mc.gg.di.height - 320;
						boss_jyoutai = 1120;
					}
				} else if (boss_jyoutai == 1120) shagekiBoss();
			} else if (boss_jyoutai >= 1200 && boss_jyoutai < 1300) {
				// ＨＰが減ると上と下へ移動
				if (boss_jyoutai == 1200) {
					if (boss_hp <= Math.floor((boss_hp_max * 2) / 3)) {
						boss_jyoutai = 1210;
						boss_vy = boss_speed * -1;
						boss_shageki_c = 2;
					} else {
						shagekiBoss();
					}
				} else if (boss_jyoutai == 1210) {
					boss_y += boss_vy;
					if (boss_y <= j + 32 + mc.gg.di.height - 320) {
						boss_y = j + 32 + mc.gg.di.height - 320;
						boss_jyoutai = 1220;
					}
				} else if (boss_jyoutai == 1220) {
					if (boss_hp <= Math.floor(boss_hp_max / 3)) {
						boss_jyoutai = 1230;
						boss_vy = boss_speed;
						boss_shageki_c = 2;
					} else {
						shagekiBoss();
					}
				} else if (boss_jyoutai == 1230) {
					boss_y += boss_vy;
					if (boss_y >= j + mc.gg.di.height - boss_height - 32) {
						boss_y = j + mc.gg.di.height - boss_height - 32;
						boss_jyoutai = 1240;
					}
				} else if (boss_jyoutai == 1240) shagekiBoss();
			} else if (boss_jyoutai >= 1300 && boss_jyoutai < 1400) {
				// ＨＰが半分になると下へ移動
				if (boss_jyoutai == 1300) {
					if (boss_hp <= boss_hp_max >> 1) {
						boss_jyoutai = 1310;
						boss_vy = boss_speed;
						boss_shageki_c = 2;
					} else {
						shagekiBoss();
					}
				} else if (boss_jyoutai == 1310) {
					boss_y += boss_vy;
					if (boss_y >= j + mc.gg.di.height - boss_height - 32) {
						boss_y = j + mc.gg.di.height - boss_height - 32;
						boss_jyoutai = 1320;
					}
				} else if (boss_jyoutai == 1320) shagekiBoss();
			} else if (boss_jyoutai >= 1400 && boss_jyoutai < 1500) {
				// ＨＰが減ると下と上へ移動
				if (boss_jyoutai == 1400) {
					if (boss_hp <= Math.floor((boss_hp_max * 2) / 3)) {
						boss_jyoutai = 1410;
						boss_vy = boss_speed;
						boss_shageki_c = 2;
					} else {
						shagekiBoss();
					}
				} else if (boss_jyoutai == 1410) {
					boss_y += boss_vy;
					if (boss_y >= j + mc.gg.di.height - boss_height - 32) {
						boss_y = j + mc.gg.di.height - boss_height - 32;
						boss_jyoutai = 1420;
					}
				} else if (boss_jyoutai == 1420) {
					if (boss_hp <= Math.floor(boss_hp_max / 3)) {
						boss_jyoutai = 1430;
						boss_vy = boss_speed * -1;
						boss_shageki_c = 2;
					} else {
						shagekiBoss();
					}
				} else if (boss_jyoutai == 1430) {
					boss_y += boss_vy;
					if (boss_y <= j + 32 + mc.gg.di.height - 320) {
						boss_y = j + 32 + mc.gg.di.height - 320;
						boss_jyoutai = 1440;
					}
				} else if (boss_jyoutai == 1440) shagekiBoss();
			} else if (boss_jyoutai >= 1500 && boss_jyoutai < 1600) {
				// 画面の端で方向転換
				if (boss_vx > 0) {
					boss_x += boss_vx;
					if (boss_x >= i + mc.gg.di.width - boss_width) {
						boss_x = i + mc.gg.di.width - boss_width;
						boss_vx = boss_speed * -1;
					}
				} else if (boss_vx < 0) {
					boss_x += boss_vx;
					if (boss_x <= i) {
						boss_x = i;
						boss_vx = boss_speed;
					}
				}
				if (boss_vy > 0) {
					boss_y += boss_vy;
					if (boss_y >= j + mc.gg.di.height - boss_height) {
						boss_y = j + mc.gg.di.height - boss_height;
						boss_vy = boss_speed * -1;
					}
				} else if (boss_vy < 0) {
					boss_y += boss_vy;
					if (boss_y <= j) {
						boss_y = j;
						boss_vy = boss_speed;
					}
				}
				shagekiBoss();
			} else if (boss_jyoutai >= 1600 && boss_jyoutai < 1700) {
				// ジグザグ移動
				if (boss_vx > 0) {
					boss_x += boss_vx;
					if (boss_x >= i + mc.gg.di.width - boss_width) {
						boss_x = i + mc.gg.di.width - boss_width;
						boss_vx = (boss_speed >> 1) * -1;
					}
				} else if (boss_vx < 0) {
					boss_x += boss_vx;
					if (boss_x <= i) {
						boss_x = i;
						boss_vx = boss_speed >> 1;
					}
				}
				if (boss_vy > 0) {
					boss_y += boss_vy;
					if (boss_y >= j + mc.gg.di.height - boss_height - 64) {
						boss_y = j + mc.gg.di.height - boss_height - 64;
						boss_vy = boss_speed * -1;
					}
				} else if (boss_vy < 0) {
					boss_y += boss_vy;
					if (boss_y <= j + 64 + mc.gg.di.height - 320) {
						boss_y = j + 64 + mc.gg.di.height - 320;
						boss_vy = boss_speed;
					}
				}
				shagekiBoss();
			} else if (boss_jyoutai == 1700) {
				// 画面の内側を左回り
				if (boss_vx < 0) {
					if (!boss_hmove_f) {
						boss_y -= boss_speed;
						if (boss_y <= j) {
							boss_y = j;
							boss_vy = 0;
							boss_hmove_f = true;
						}
					} else {
						boss_x += boss_vx;
						if (boss_x <= i) {
							boss_x = i;
							boss_vx = boss_speed;
							boss_vy = boss_speed;
							boss_hmove_f = false;
						}
					}
				} else if (!boss_hmove_f) {
					boss_y += boss_speed;
					if (boss_y >= j + mc.gg.di.height - boss_height) {
						boss_y = j + mc.gg.di.height - boss_height;
						boss_vy = 0;
						boss_hmove_f = true;
					}
				} else {
					boss_x += boss_vx;
					if (boss_x >= i + mc.gg.di.width - boss_width) {
						boss_x = i + mc.gg.di.width - boss_width;
						boss_vx = boss_speed * -1;
						boss_vy = boss_speed * -1;
						boss_hmove_f = false;
					}
				}
				shagekiBoss();
			} else if (boss_jyoutai == 1800) {
				// 画面の内側を右回り
				if (boss_vx < 0) {
					if (!boss_hmove_f) {
						boss_y += boss_speed;
						if (boss_y >= j + mc.gg.di.height - boss_height) {
							boss_y = j + mc.gg.di.height - boss_height;
							boss_vy = 0;
							boss_hmove_f = true;
						}
					} else {
						boss_x += boss_vx;
						if (boss_x <= i) {
							boss_x = i;
							boss_vx = boss_speed;
							boss_vy = boss_speed * -1;
							boss_hmove_f = false;
						}
					}
				} else if (!boss_hmove_f) {
					boss_y -= boss_speed;
					if (boss_y <= j) {
						boss_y = j;
						boss_vy = 0;
						boss_hmove_f = true;
					}
				} else {
					boss_x += boss_vx;
					if (boss_x >= i + mc.gg.di.width - boss_width) {
						boss_x = i + mc.gg.di.width - boss_width;
						boss_vx = boss_speed * -1;
						boss_vy = boss_speed;
						boss_hmove_f = false;
					}
				}
				shagekiBoss();
			} else if (boss_jyoutai >= 1900 && boss_jyoutai < 2000) {
				// ＨＰが半分以下になると左右移動
				if (boss_jyoutai == 1900) {
					if (boss_hp <= boss_hp_max >> 1) {
						boss_jyoutai = 1910;
						if (boss_shageki_c < 10) boss_shageki_c = 10;
					}
				} else if (boss_vx < 0) {
					boss_x += boss_vx;
					if (boss_x <= boss_x_shoki - mc.gg.di.width) {
						boss_x = boss_x_shoki - mc.gg.di.width;
						boss_vx = boss_speed;
					}
				} else {
					boss_x += boss_vx;
					if (boss_x >= boss_x_shoki - boss_width) {
						boss_x = boss_x_shoki - boss_width;
						boss_vx = boss_speed * -1;
					}
				}
				shagekiBoss();
			} else if (boss_jyoutai >= 2000 && boss_jyoutai < 2100) {
				// ＨＰが１／３以下になると左右移動
				if (boss_jyoutai == 2000) {
					if (boss_hp <= Math.floor(boss_hp_max / 3)) {
						boss_jyoutai = 2010;
						if (boss_shageki_c < 10) boss_shageki_c = 10;
					}
				} else if (boss_vx < 0) {
					boss_x += boss_vx;
					if (boss_x <= boss_x_shoki - mc.gg.di.width) {
						boss_x = boss_x_shoki - mc.gg.di.width;
						boss_vx = boss_speed;
					}
				} else {
					boss_x += boss_vx;
					if (boss_x >= boss_x_shoki - boss_width) {
						boss_x = boss_x_shoki - boss_width;
						boss_vx = boss_speed * -1;
					}
				}
				shagekiBoss();
			} else if (boss_jyoutai >= 2100 && boss_jyoutai < 2200) {
				// ＨＰが半分以下になると左回り
				if (boss_jyoutai == 2100) {
					if (boss_hp <= boss_hp_max >> 1) {
						boss_jyoutai = 2110;
						if (boss_shageki_c < 10) boss_shageki_c = 10;
					}
				} else {
					boss_kakudo -= boss_speed;
					if (boss_kakudo < 0) boss_kakudo += 360;
					boss_x =
						boss_x_shoki -
						rounddown(mc.gg.di.width / 2) +
						rounddown(
							Math.cos((boss_kakudo * 3.14) / 180) * 32 * ((mc.gg.di.width - 256) / 32 / 2 - 1),
							true,
							mc.mp
						) -
						32;
					boss_y = boss_y_shoki + 32 + rounddown(Math.sin((boss_kakudo * 3.14) / 180) * 96, true, mc.mp) - 32;
					if (boss_kakudo > 180) boss_vx = -1;
					else boss_vx = 1;
				}
				shagekiBoss();
			} else if (boss_jyoutai >= 2200 && boss_jyoutai < 2300) {
				// ＨＰが１／３以下になると左回り
				if (boss_jyoutai == 2200) {
					if (boss_hp <= Math.floor(boss_hp_max / 3)) {
						boss_jyoutai = 2110;
						if (boss_shageki_c < 10) boss_shageki_c = 10;
					}
				} else {
					boss_kakudo -= boss_speed;
					if (boss_kakudo < 0) boss_kakudo += 360;
					boss_x =
						boss_x_shoki -
						rounddown(mc.gg.di.width / 2) +
						rounddown(
							Math.cos((boss_kakudo * 3.14) / 180) * 32 * ((mc.gg.di.width - 256) / 32 / 2 - 1),
							true,
							mc.mp
						) -
						32;
					boss_y = boss_y_shoki + 32 + rounddown(Math.sin((boss_kakudo * 3.14) / 180) * 96, true, mc.mp) - 32;
					if (boss_kakudo > 180) boss_vx = -1;
					else boss_vx = 1;
				}
				shagekiBoss();
			} else if (boss_jyoutai == 2300) {
				// 斜め上へ往復
				if (boss_vy < 0) {
					boss_y += boss_vy;
					boss_x += boss_vx;
					if (boss_y <= boss_y_shoki - 192) {
						boss_y = boss_y_shoki - 192;
						boss_x = boss_x_shoki - 128 - 192;
						boss_vy = boss_speed;
						boss_vx = boss_speed;
					}
				} else {
					boss_y += boss_vy;
					boss_x += boss_vx;
					if (boss_y >= boss_y_shoki) {
						boss_y = boss_y_shoki;
						boss_x = boss_x_shoki - 128;
						boss_vy = boss_speed * -1;
						boss_vx = boss_speed * -1;
					}
				}
				shagekiBoss();
			} else if (boss_jyoutai == 2400) {
				// 斜め下へ往復
				if (boss_vy < 0) {
					boss_y += boss_vy;
					boss_x += boss_vx;
					if (boss_y <= boss_y_shoki) {
						boss_y = boss_y_shoki;
						boss_x = boss_x_shoki - 128;
						boss_vy = boss_speed;
						boss_vx = boss_speed * -1;
					}
				} else {
					boss_y += boss_vy;
					boss_x += boss_vx;
					if (boss_y >= boss_y_shoki + 192) {
						boss_y = boss_y_shoki + 192;
						boss_x = boss_x_shoki - 128 - 192;
						boss_vy = boss_speed * -1;
						boss_vx = boss_speed;
					}
				}
				shagekiBoss();
			} else if (boss_jyoutai == 2500) {
				// 中央で停止
				shagekiBoss();
			} else if (boss_jyoutai >= 2600 && boss_jyoutai < 2700) {
				// 中央で停止 主人公の方を向く
				if (boss_jyoutai < 2616) boss_jyoutai++;
				else if (boss_vx <= 0) {
					if (boss_x + (boss_width >> 1) < mc.mp.co_j.x + 15) {
						boss_vx = boss_speed;
						boss_jyoutai = 2600;
					}
				} else if (boss_x + (boss_width >> 1) > mc.mp.co_j.x + 15) {
					boss_vx = boss_speed * -1;
					boss_jyoutai = 2600;
				}
				shagekiBoss();
			} else if (boss_jyoutai == 2700) {
				// 巨大化 中央から
				boss_c1++;
				if (boss_c1 > 1) boss_c1 = 0;
				if (boss_c1 == 0 && boss_kyo_width < mc.gg.di.width * 2) {
					boss_kyo_width += 2;
					boss_kyo_height += 2;
				}
				shagekiBoss();
			} else if (boss_jyoutai == 2800) {
				// 巨大化 右から
				if (boss_kyo_width < mc.gg.di.width * 2) {
					boss_kyo_width += 2;
					boss_kyo_height += 2;
				}
				shagekiBoss();
			}
			var flag1 = false;
			if (boss_fumeru_f != 3)
				if (boss_kyo_f) {
					if (
						Applet1.getMyXReal() + 24 > boss_x - ((boss_kyo_width - boss_width) >> 1) &&
						Applet1.getMyXReal() < boss_x + boss_width + ((boss_kyo_width - boss_width) >> 1) - 8 &&
						Applet1.getMyYReal() + 24 > boss_y - ((boss_kyo_height - boss_height) >> 1) &&
						Applet1.getMyYReal() < boss_y + boss_height + ((boss_kyo_height - boss_height) >> 1) - 8
					)
						flag1 = true;
				} else if (
					Applet1.getMyXReal() + 24 > boss_x &&
					Applet1.getMyXReal() < boss_x + boss_width - 8 &&
					Applet1.getMyYReal() + 24 > boss_y &&
					Applet1.getMyYReal() < boss_y + boss_height - 8
				)
					flag1 = true;
			if (flag1)
				if (boss_fumeru_f == 2 && Applet1.getMyVY() > 10) {
					Applet1.setMyPress("3");
					Applet1.setMyYReal(boss_y);
					boss_hp = boss_hp - 1;
					if (boss_hp <= 0) {
						boss_hp = 0;
						boss_jyoutai = 50;
						boss_bc = 20;
					} else {
						boss_jyoutai = 80;
						boss_bc = 10;
					}
				} else if (boss_fumeru_f == 4) {
					Applet1.setMyMiss("2");
				} else {
					Applet1.setMyHPDamage("1");
					if (Applet1.getMyHP() <= 0) Applet1.setMyMiss("2");
				}
			var l;
			if (boss_kyo_f)
				l = Applet1.attackFire(
					boss_x - 24 - ((boss_kyo_width - boss_width) >> 1),
					boss_y - 24 - ((boss_kyo_height - boss_height) >> 1),
					boss_kyo_width - 32 + 48,
					boss_kyo_height - 32 + 48
				);
			else l = Applet1.attackFire(boss_x - 24, boss_y - 24, boss_width - 32 + 48, boss_height - 32 + 48);
			if (l >= 1) {
				boss_hp = boss_hp - l;
				if (boss_hp <= 0) {
					boss_hp = 0;
					boss_jyoutai = 50;
					boss_bc = 20;
				}
			}
			if (boss_tail_f == 2 && mc.mp.j_tail_ac == 5) {
				var flag = false;
				if (boss_kyo_f) {
					if (
						mc.mp.co_j.y < boss_y + boss_height - 4 + ((boss_kyo_height - boss_height) >> 1) &&
						mc.mp.co_j.y + 32 > boss_y + 4 - ((boss_kyo_height - boss_height) >> 1)
					)
						if (mc.mp.co_j.muki == 0) {
							if (
								mc.mp.co_j.x - 32 - 12 <= boss_x + boss_width + ((boss_kyo_width - boss_width) >> 1) &&
								mc.mp.co_j.x + 8 >= boss_x - ((boss_kyo_width - boss_width) >> 1)
							)
								flag = true;
						} else if (
							mc.mp.co_j.x + 32 + 32 + 12 >= boss_x - ((boss_kyo_width - boss_width) >> 1) &&
							mc.mp.co_j.x + 24 <= boss_x + boss_width + ((boss_kyo_width - boss_width) >> 1)
						)
							flag = true;
				} else if (mc.mp.co_j.y < boss_y + boss_height - 4 && mc.mp.co_j.y + 32 > boss_y + 4)
					if (mc.mp.co_j.muki == 0) {
						if (mc.mp.co_j.x - 32 - 12 <= boss_x + boss_width && mc.mp.co_j.x + 8 >= boss_x) flag = true;
					} else if (mc.mp.co_j.x + 32 + 32 + 12 >= boss_x && mc.mp.co_j.x + 24 <= boss_x + boss_width)
						flag = true;
				if (flag) {
					mc.mp.gs.rsAddSound(9);
					var k = mc.tdb.getValueInt("j_tail_ap_boss");
					if (k < 0) k = 0;
					boss_hp = boss_hp - k;
					if (boss_hp <= 0) {
						boss_hp = 0;
						boss_jyoutai = 50;
						boss_bc = 20;
					}
				}
			}
		}
		var obj = null;
		if (i >= sl_x) {
			if (!boss_kyo_f) {
				if (boss_jyoutai >= 100) {
					if (boss_vx <= 0) {
						if (boss_ac <= 2 || boss_anime_type == 2)
							g.drawImage(boss_left1_img, boss_x - i, boss_y - j, Applet1);
						else if (boss_left2_img != null) g.drawImage(boss_left2_img, boss_x - i, boss_y - j, Applet1);
					} else if (boss_ac <= 2 || boss_anime_type == 2)
						g.drawImage(boss_right1_img, boss_x - i, boss_y - j, Applet1);
					else if (boss_right2_img != null) g.drawImage(boss_right2_img, boss_x - i, boss_y - j, Applet1);
				} else if (boss_jyoutai >= 50 && boss_jyoutai <= 80)
					if (boss_vx <= 0) g.drawImage(boss_tubure_left_img, boss_x - i, boss_y - j, Applet1);
					else if (boss_tubure_right_img != null)
						g.drawImage(boss_tubure_right_img, boss_x - i, boss_y - j, Applet1);
			} else {
				// 巨大化中
				var graphics2d = mc.gg.os_img.getGraphics();
				graphics2d.translate(boss_x - i + (boss_width >> 1), boss_y - j + (boss_height >> 1));
				var f = boss_kyo_width / boss_width;
				var f1 = boss_kyo_height / boss_height;
				graphics2d.scale(f, f1);
				if (boss_jyoutai >= 100) {
					if (boss_vx <= 0) {
						if (boss_ac <= 2 || boss_anime_type == 2)
							graphics2d.drawImage(boss_left1_img, -(boss_width >> 1), -(boss_height >> 1), Applet1);
						else if (boss_left2_img != null)
							graphics2d.drawImage(boss_left2_img, -(boss_width >> 1), -(boss_height >> 1), Applet1);
					} else if (boss_ac <= 2 || boss_anime_type == 2)
						graphics2d.drawImage(boss_right1_img, -(boss_width >> 1), -(boss_height >> 1), Applet1);
					else if (boss_right2_img != null)
						graphics2d.drawImage(boss_right2_img, -(boss_width >> 1), -(boss_height >> 1), Applet1);
				} else if (boss_jyoutai >= 50 && boss_jyoutai <= 80)
					if (boss_vx <= 0)
						graphics2d.drawImage(boss_tubure_left_img, -(boss_width >> 1), -(boss_height >> 1), Applet1);
					else if (boss_tubure_right_img != null)
						graphics2d.drawImage(boss_tubure_right_img, -(boss_width >> 1), -(boss_height >> 1), Applet1);
				graphics2d.dispose();
			}
			boss_ac++;
			if (boss_ac > 5) boss_ac = 0;
		}
		if (i >= sl_x && boss_jyoutai >= 50)
			Applet1.showGauge(
				Math.floor((boss_hp * 200) / boss_hp_max),
				boss_name + " " + boss_hp + " / " + boss_hp_max
			);
	}

	function shagekiBoss() {
		var flag = false;
		var flag1 = false;
		if (boss_shageki_c == 2) flag1 = true;
		if (boss_shageki_c > 0) {
			boss_shageki_c--;
			if (boss_shageki_c <= 0) boss_shageki_c2 = 0;
		}
		var j14 = boss_waza[boss_waza_genzai];
		var k14 = boss_waza_wait[boss_waza_genzai];
		if (boss_shageki_c <= 0) {
			boss_shageki_c2++;
			if (j14 <= 1) {
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 2) {
				// 電撃
				mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 100);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 3) {
				// 電撃３連射
				if (boss_shageki_c2 == 1 || boss_shageki_c2 == 7 || boss_shageki_c2 == 13)
					mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 100);
				if (boss_shageki_c2 == 1) mc.mp.gs.rsAddSound(10);
				if (boss_shageki_c2 >= 13) {
					boss_shageki_c = k14;
					flag = true;
				}
			} else if (j14 == 4) {
				// はっぱカッター
				if (boss_vx <= 0) mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 200);
				else mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 205);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 5) {
				// はっぱカッター３連射
				if (boss_shageki_c2 == 1 || boss_shageki_c2 == 9 || boss_shageki_c2 == 17)
					if (boss_vx <= 0) mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 200);
					else mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 205);
				if (boss_shageki_c2 == 1) mc.mp.gs.rsAddSound(11);
				if (boss_shageki_c2 >= 17) {
					boss_shageki_c = k14;
					flag = true;
				}
			} else if (j14 == 6) {
				// 火の粉
				if (boss_vx <= 0) mc.mp.mSet(boss_x + 32, boss_y + ((boss_height - 32) >> 1), 300);
				else mc.mp.mSet(boss_x + boss_width - 32, boss_y + ((boss_height - 32) >> 1), 305);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 7) {
				// 火の粉２連射
				if (boss_vx <= 0) {
					mc.mp.mSet(boss_x + 32, boss_y + ((boss_height - 32) >> 1) - 16, 300);
					mc.mp.mSet(boss_x + 32, boss_y + ((boss_height - 32) >> 1) + 16, 300);
				} else {
					mc.mp.mSet(boss_x + boss_width - 32, boss_y + ((boss_height - 32) >> 1) - 16, 305);
					mc.mp.mSet(boss_x + boss_width - 32, boss_y + ((boss_height - 32) >> 1) + 16, 305);
				}
				mc.mp.gs.rsAddSound(14);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 8) {
				// 水鉄砲
				if (boss_vx <= 0) mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 400);
				else mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 405);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 9) {
				// 爆撃
				if (boss_vx == 0) mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + boss_height - 16, 606);
				else if (boss_vx < 0) mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + boss_height - 16, 600);
				else mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + boss_height - 16, 605);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 10) {
				// バブル光線 扇型発射
				if (boss_shageki_c2 == 1) {
					if (boss_vx <= 0) {
						var d = 3.3144445419311523;
						var j1 = rounddown(Math.cos(d) * 12, true, mc.mp);
						var l7 = rounddown(Math.sin(d) * 12, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, j1, l7);
						d = 2.9655554294586182;
						j1 = rounddown(Math.cos(d) * 12, true, mc.mp);
						l7 = rounddown(Math.sin(d) * 12, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, j1, l7);
						d = 3.6633334159851074;
						j1 = rounddown(Math.cos(d) * 12, true, mc.mp);
						l7 = rounddown(Math.sin(d) * 12, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, j1, l7);
						d = 2.6166667938232422;
						j1 = rounddown(Math.cos(d) * 12, true, mc.mp);
						l7 = rounddown(Math.sin(d) * 12, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, j1, l7);
					} else {
						var d1 = 3.3144445419311523;
						var k1 = rounddown(Math.cos(d1) * 12, true, mc.mp) * -1;
						var i8 = rounddown(Math.sin(d1) * 12, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 710, k1, i8);
						d1 = 2.9655554294586182;
						k1 = rounddown(Math.cos(d1) * 12, true, mc.mp) * -1;
						i8 = rounddown(Math.sin(d1) * 12, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 710, k1, i8);
						d1 = 3.6633334159851074;
						k1 = rounddown(Math.cos(d1) * 12, true, mc.mp) * -1;
						i8 = rounddown(Math.sin(d1) * 12, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 710, k1, i8);
						d1 = 2.6166667938232422;
						k1 = rounddown(Math.cos(d1) * 12, true, mc.mp) * -1;
						i8 = rounddown(Math.sin(d1) * 12, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 710, k1, i8);
					}
				} else if (boss_shageki_c2 == 11)
					if (boss_vx <= 0) {
						var d2 = 3.1400001049041748;
						var l1 = rounddown(Math.cos(d2) * 12, true, mc.mp);
						var j8 = rounddown(Math.sin(d2) * 12, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l1, j8);
						d2 = 2.7038888931274414;
						l1 = rounddown(Math.cos(d2) * 12, true, mc.mp);
						j8 = rounddown(Math.sin(d2) * 12, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l1, j8);
						d2 = 3.5761110782623291;
						l1 = rounddown(Math.cos(d2) * 12, true, mc.mp);
						j8 = rounddown(Math.sin(d2) * 12, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l1, j8);
					} else {
						var d3 = 3.1400001049041748;
						var i2 = rounddown(Math.cos(d3) * 12, true, mc.mp) * -1;
						var k8 = rounddown(Math.sin(d3) * 12, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 710, i2, k8);
						d3 = 2.7038888931274414;
						i2 = rounddown(Math.cos(d3) * 12, true, mc.mp) * -1;
						k8 = rounddown(Math.sin(d3) * 12, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 710, i2, k8);
						d3 = 3.5761110782623291;
						i2 = rounddown(Math.cos(d3) * 12, true, mc.mp) * -1;
						k8 = rounddown(Math.sin(d3) * 12, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 710, i2, k8);
					}
				if (boss_shageki_c2 == 1) mc.mp.gs.rsAddSound(18);
				if (boss_shageki_c2 >= 11) {
					boss_shageki_c = k14;
					flag = true;
				}
			} else if (j14 == 11) {
				// バブル光線 放射状に発射
				if (boss_shageki_c2 == 1) {
					for (var i = 0; i <= 330; i += 30) {
						var d4 = (i * 3.14) / 180;
						var j2 = rounddown(Math.cos(d4) * 12, true, mc.mp);
						var l8 = rounddown(Math.sin(d4) * 12, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, j2, l8);
					}
				} else if (boss_shageki_c2 == 11) {
					for (var j = 15; j <= 345; j += 30) {
						var d5 = (j * 3.14) / 180;
						var k2 = rounddown(Math.cos(d5) * 12, true, mc.mp);
						var i9 = rounddown(Math.sin(d5) * 12, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, k2, i9);
					}
				}
				if (boss_shageki_c2 == 1) mc.mp.gs.rsAddSound(18);
				if (boss_shageki_c2 >= 11) {
					boss_shageki_c = k14;
					flag = true;
				}
			} else if (j14 == 12) {
				// 前へ亀を投げる
				if (boss_vx <= 0) mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 150, -4);
				else mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 150, 4);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 13) {
				// 後へ亀を投げる
				if (boss_vx <= 0) mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 150, 2);
				else mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 150, -2);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 14) {
				// 前へヒノララシを投げる
				if (boss_vx <= 0) mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 450, -6);
				else mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 450, 6);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 15) {
				// 後へヒノララシを投げる
				if (boss_vx <= 0) mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 450, 2);
				else mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 450, -2);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 16) {
				// 前へマリリを投げる
				if (boss_vx <= 0) mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 650, -5);
				else mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 650, 5);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 17) {
				// 後へマリリを投げる
				if (boss_vx <= 0) mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 650, 2);
				else mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 650, -2);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 18) {
				// ハリケンブラスト
				for (var k = 10; k <= 310; k += 60) {
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 901, k, 0);
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 911, k, 0);
				}

				mc.mp.gs.rsAddSound(18);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 19) {
				// バブル光線 扇型発射 少なめ
				if (boss_shageki_c2 == 1) {
					if (boss_vx <= 0) {
						var d6 = 3.1400001049041748;
						var l2 = rounddown(Math.cos(d6) * 8, true, mc.mp);
						var j9 = rounddown(Math.sin(d6) * 8, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l2, j9);
						d6 = 2.6166667938232422;
						l2 = rounddown(Math.cos(d6) * 8, true, mc.mp);
						j9 = rounddown(Math.sin(d6) * 8, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l2, j9);
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l2, j9 * -1);
					} else {
						var d7 = 3.1400001049041748;
						var i3 = rounddown(Math.cos(d7) * 8, true, mc.mp) * -1;
						var k9 = rounddown(Math.sin(d7) * 8, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 710, i3, k9);
						d7 = 2.6166667938232422;
						i3 = rounddown(Math.cos(d7) * 8, true, mc.mp) * -1;
						k9 = rounddown(Math.sin(d7) * 8, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 710, i3, k9);
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 710, i3, k9 * -1);
					}
				} else if (boss_shageki_c2 == 20)
					if (boss_vx <= 0) {
						var d8 = 2.7911112308502197;
						var j3 = rounddown(Math.cos(d8) * 8, true, mc.mp);
						var l9 = rounddown(Math.sin(d8) * 8, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, j3, l9);
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, j3, l9 * -1);
					} else {
						var d9 = 2.7911112308502197;
						var k3 = rounddown(Math.cos(d9) * 8, true, mc.mp) * -1;
						var i10 = rounddown(Math.sin(d9) * 8, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 710, k3, i10);
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 710, k3, i10 * -1);
					}
				if (boss_shageki_c2 == 1) mc.mp.gs.rsAddSound(18);
				if (boss_shageki_c2 >= 20) {
					boss_shageki_c = k14;
					flag = true;
				}
			} else if (j14 == 20) {
				// バブル光線 上へ扇型発射
				if (boss_shageki_c2 == 1) {
					var d10 = 1.5700000524520874;
					var l3 = rounddown(Math.cos(d10) * 8, true, mc.mp);
					var j10 = rounddown(Math.sin(d10) * 8, true, mc.mp) * -1;
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, l3, j10);
					d10 = 1.0466667413711548;
					l3 = rounddown(Math.cos(d10) * 8, true, mc.mp);
					j10 = rounddown(Math.sin(d10) * 8, true, mc.mp) * -1;
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, l3, j10);
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, l3 * -1, j10);
				} else if (boss_shageki_c2 == 20) {
					var d11 = 1.2211111783981323;
					var i4 = rounddown(Math.cos(d11) * 8, true, mc.mp);
					var k10 = rounddown(Math.sin(d11) * 8, true, mc.mp) * -1;
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, i4, k10);
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, i4 * -1, k10);
				}
				if (boss_shageki_c2 == 1) mc.mp.gs.rsAddSound(18);
				if (boss_shageki_c2 >= 20) {
					boss_shageki_c = k14;
					flag = true;
				}
			} else if (j14 == 21) {
				// バブル光線 下へ扇型発射
				if (boss_shageki_c2 == 1) {
					var d12 = 1.5700000524520874;
					var j4 = rounddown(Math.cos(d12) * 8, true, mc.mp);
					var l10 = rounddown(Math.sin(d12) * 8, true, mc.mp);
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + boss_height - 48, 710, j4, l10);
					d12 = 1.0466667413711548;
					j4 = rounddown(Math.cos(d12) * 8, true, mc.mp);
					l10 = rounddown(Math.sin(d12) * 8, true, mc.mp);
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + boss_height - 48, 710, j4, l10);
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + boss_height - 48, 710, j4 * -1, l10);
				} else if (boss_shageki_c2 == 20) {
					var d13 = 1.2211111783981323;
					var k4 = rounddown(Math.cos(d13) * 8, true, mc.mp);
					var i11 = rounddown(Math.sin(d13) * 8, true, mc.mp);
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + boss_height - 48, 710, k4, i11);
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + boss_height - 48, 710, k4 * -1, i11);
				}
				if (boss_shageki_c2 == 1) mc.mp.gs.rsAddSound(18);
				if (boss_shageki_c2 >= 20) {
					boss_shageki_c = k14;
					flag = true;
				}
			} else if (j14 == 22) {
				// はっぱカッター 斜め上へ連射
				if (boss_shageki_c2 == 1) {
					if (boss_vx <= 0) {
						var d14 = 3.1400001049041748;
						var l4 = rounddown(Math.cos(d14) * 10, true, mc.mp);
						var j11 = rounddown(Math.sin(d14) * 10, true, mc.mp);
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, l4, j11);
						d14 = 3.8377780914306641;
						l4 = rounddown(Math.cos(d14) * 10, true, mc.mp);
						j11 = rounddown(Math.sin(d14) * 10, true, mc.mp);
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, l4, j11);
						d14 = 4.5355558395385742;
						l4 = rounddown(Math.cos(d14) * 10, true, mc.mp);
						j11 = rounddown(Math.sin(d14) * 10, true, mc.mp);
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, l4, j11);
					} else {
						var d15 = 3.1400001049041748;
						var i5 = rounddown(Math.cos(d15) * 10, true, mc.mp) * -1;
						var k11 = rounddown(Math.sin(d15) * 10, true, mc.mp);
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 731, i5, k11);
						d15 = 3.8377780914306641;
						i5 = rounddown(Math.cos(d15) * 10, true, mc.mp) * -1;
						k11 = rounddown(Math.sin(d15) * 10, true, mc.mp);
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 731, i5, k11);
						d15 = 4.5355558395385742;
						i5 = rounddown(Math.cos(d15) * 10, true, mc.mp) * -1;
						k11 = rounddown(Math.sin(d15) * 10, true, mc.mp);
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 731, i5, k11);
					}
				} else if (boss_shageki_c2 == 18)
					if (boss_vx <= 0) {
						var d16 = 3.4888889789581299;
						var j5 = rounddown(Math.cos(d16) * 10, true, mc.mp);
						var l11 = rounddown(Math.sin(d16) * 10, true, mc.mp);
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, j5, l11);
						d16 = 4.1866669654846191;
						j5 = rounddown(Math.cos(d16) * 10, true, mc.mp);
						l11 = rounddown(Math.sin(d16) * 10, true, mc.mp);
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, j5, l11);
					} else {
						var d17 = 3.4888889789581299;
						var k5 = rounddown(Math.cos(d17) * 10, true, mc.mp) * -1;
						var i12 = rounddown(Math.sin(d17) * 10, true, mc.mp);
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 731, k5, i12);
						d17 = 4.1866669654846191;
						k5 = rounddown(Math.cos(d17) * 10, true, mc.mp) * -1;
						i12 = rounddown(Math.sin(d17) * 10, true, mc.mp);
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 731, k5, i12);
					}
				if (boss_shageki_c2 == 1) mc.mp.gs.rsAddSound(11);
				if (boss_shageki_c2 >= 18) {
					boss_shageki_c = k14;
					flag = true;
				}
			} else if (j14 == 23) {
				// はっぱカッター 斜め下へ連射
				if (boss_shageki_c2 == 1) {
					if (boss_vx <= 0) {
						var d18 = 3.1400001049041748;
						var l5 = rounddown(Math.cos(d18) * 10, true, mc.mp);
						var j12 = rounddown(Math.sin(d18) * 10, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, l5, j12);
						d18 = 3.8377780914306641;
						l5 = rounddown(Math.cos(d18) * 10, true, mc.mp);
						j12 = rounddown(Math.sin(d18) * 10, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, l5, j12);
						d18 = 4.5355558395385742;
						l5 = rounddown(Math.cos(d18) * 10, true, mc.mp);
						j12 = rounddown(Math.sin(d18) * 10, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, l5, j12);
					} else {
						var d19 = 3.1400001049041748;
						var i6 = rounddown(Math.cos(d19) * 10, true, mc.mp) * -1;
						var k12 = rounddown(Math.sin(d19) * 10, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 731, i6, k12);
						d19 = 3.8377780914306641;
						i6 = rounddown(Math.cos(d19) * 10, true, mc.mp) * -1;
						k12 = rounddown(Math.sin(d19) * 10, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 731, i6, k12);
						d19 = 4.5355558395385742;
						i6 = rounddown(Math.cos(d19) * 10, true, mc.mp) * -1;
						k12 = rounddown(Math.sin(d19) * 10, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 731, i6, k12);
					}
				} else if (boss_shageki_c2 == 18)
					if (boss_vx <= 0) {
						var d20 = 3.4888889789581299;
						var j6 = rounddown(Math.cos(d20) * 10, true, mc.mp);
						var l12 = rounddown(Math.sin(d20) * 10, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, j6, l12);
						d20 = 4.1866669654846191;
						j6 = rounddown(Math.cos(d20) * 10, true, mc.mp);
						l12 = rounddown(Math.sin(d20) * 10, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, j6, l12);
					} else {
						var d21 = 3.4888889789581299;
						var k6 = rounddown(Math.cos(d21) * 10, true, mc.mp) * -1;
						var i13 = rounddown(Math.sin(d21) * 10, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 731, k6, i13);
						d21 = 4.1866669654846191;
						k6 = rounddown(Math.cos(d21) * 10, true, mc.mp) * -1;
						i13 = rounddown(Math.sin(d21) * 10, true, mc.mp) * -1;
						mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 731, k6, i13);
					}
				if (boss_shageki_c2 == 1) mc.mp.gs.rsAddSound(11);
				if (boss_shageki_c2 >= 18) {
					boss_shageki_c = k14;
					flag = true;
				}
			} else if (j14 == 24) {
				// 水の波動
				mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 90);
				mc.mp.gs.rsAddSound(18);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 25) {
				// グレネード 短射程
				if (boss_vx <= 0) mc.mp.mSet2(boss_x + 16, boss_y + 16, 800, -5, -32);
				else mc.mp.mSet2(boss_x + boss_width - 48, boss_y + 16, 800, 5, -32);
				mc.mp.gs.rsAddSound(22);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 26) {
				// グレネード 中射程
				if (boss_vx <= 0) mc.mp.mSet2(boss_x + 16, boss_y + 16, 800, -10, -32);
				else mc.mp.mSet2(boss_x + boss_width - 48, boss_y + 16, 800, 10, -32);
				mc.mp.gs.rsAddSound(22);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 27) {
				// グレネード 長射程
				if (boss_vx <= 0) mc.mp.mSet2(boss_x + 16, boss_y + 16, 800, -15, -32);
				else mc.mp.mSet2(boss_x + boss_width - 48, boss_y + 16, 800, 15, -32);
				mc.mp.gs.rsAddSound(22);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 28) {
				// プラズマ砲
				if (boss_vx <= 0) mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 810, -12, 0);
				else mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 810, 12, 0);
				mc.mp.gs.rsAddSound(22);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 29) {
				// 破壊光線
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 77, -1, 0);
				mc.mp.gs.rsAddSound(14);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 30) {
				// ソーラービーム
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 75, -1, 0);
				mc.mp.gs.rsAddSound(11);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 31) {
				// うずしお
				if (boss_vx <= 0) {
					for (var l = 0; l <= 270; l += 90)
						mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 970, l, 0);
				} else {
					for (var i1 = 0; i1 <= 270; i1 += 90)
						mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 980, i1, 0);
				}
				mc.mp.gs.rsAddSound(18);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 32) {
				// はっぱカッター 左へ３連射
				if (boss_shageki_c2 == 1 || boss_shageki_c2 == 9 || boss_shageki_c2 == 17)
					mc.mp.mSet(boss_x + 16, boss_y + 16, 200);
				if (boss_shageki_c2 == 1) mc.mp.gs.rsAddSound(11);
				if (boss_shageki_c2 >= 17) {
					boss_shageki_c = k14;
					flag = true;
				}
			} else if (j14 == 33) {
				// はっぱカッター 右へ３連射
				if (boss_shageki_c2 == 1 || boss_shageki_c2 == 9 || boss_shageki_c2 == 17)
					mc.mp.mSet(boss_x + boss_width - 48, boss_y + 16, 205);
				if (boss_shageki_c2 == 1) mc.mp.gs.rsAddSound(11);
				if (boss_shageki_c2 >= 17) {
					boss_shageki_c = k14;
					flag = true;
				}
			} else if (j14 == 34) {
				// はっぱカッター 水平発射
				if (boss_vx <= 0) mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, -8, 0);
				else mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 731, 8, 0);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 35) {
				// はっぱカッター 左へ水平発射
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, -8, 0);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 36) {
				// はっぱカッター 右へ水平発射
				mc.mp.mSet2(boss_x + boss_width - 48, boss_y + ((boss_height - 32) >> 1), 731, 8, 0);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 37) {
				// バブル光線 左へ４発発射
				var d22 = 3.4016668796539307;
				var l6 = rounddown(Math.cos(d22) * 8, true, mc.mp);
				var j13 = rounddown(Math.sin(d22) * 8, true, mc.mp) * -1;
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l6, j13);
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l6, j13 * -1);
				d22 = 3.9249999523162842;
				l6 = rounddown(Math.cos(d22) * 8, true, mc.mp);
				j13 = rounddown(Math.sin(d22) * 8, true, mc.mp) * -1;
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l6, j13);
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l6, j13 * -1);
				mc.mp.gs.rsAddSound(18);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 38) {
				// バブル光線 右へ４発発射
				var d23 = 3.4016668796539307;
				var i7 = rounddown(Math.cos(d23) * 8, true, mc.mp) * -1;
				var k13 = rounddown(Math.sin(d23) * 8, true, mc.mp) * -1;
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, i7, k13);
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, i7, k13 * -1);
				d23 = 3.9249999523162842;
				i7 = rounddown(Math.cos(d23) * 8, true, mc.mp) * -1;
				k13 = rounddown(Math.sin(d23) * 8, true, mc.mp) * -1;
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, i7, k13);
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, i7, k13 * -1);
				mc.mp.gs.rsAddSound(18);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 39) {
				// バブル光線 上へ発射
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, 0, -8);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 40) {
				// バブル光線 下へ発射
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + boss_height - 48, 710, 0, 8);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 41) {
				// バブル光線 上へ４発発射
				var d24 = 4.9716668128967285;
				var j7 = rounddown(Math.cos(d24) * 8, true, mc.mp) * -1;
				var l13 = rounddown(Math.sin(d24) * 8, true, mc.mp);
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, j7, l13);
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, j7 * -1, l13);
				d24 = 5.4950003623962402;
				j7 = rounddown(Math.cos(d24) * 8, true, mc.mp) * -1;
				l13 = rounddown(Math.sin(d24) * 8, true, mc.mp);
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, j7, l13);
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, j7 * -1, l13);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 42) {
				// バブル光線 下へ４発発射
				var d25 = 4.9716668128967285;
				var k7 = rounddown(Math.cos(d25) * 8, true, mc.mp) * -1;
				var i14 = rounddown(Math.sin(d25) * 8, true, mc.mp) * -1;
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + boss_height - 48, 710, k7, i14);
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + boss_height - 48, 710, k7 * -1, i14);
				d25 = 5.4950003623962402;
				k7 = rounddown(Math.cos(d25) * 8, true, mc.mp) * -1;
				i14 = rounddown(Math.sin(d25) * 8, true, mc.mp) * -1;
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + boss_height - 48, 710, k7, i14);
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + boss_height - 48, 710, k7 * -1, i14);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 43) {
				// はっぱカッター ２発水平発射
				if (boss_vx <= 0) {
					mc.mp.mSet2(boss_x + 16, boss_y, 731, -8, 0);
					mc.mp.mSet2(boss_x + 16, boss_y + boss_height - 32, 731, -8, 0);
				} else {
					mc.mp.mSet2(boss_x + boss_width - 48, boss_y, 731, 8, 0);
					mc.mp.mSet2(boss_x + boss_width - 48, boss_y + boss_height - 32, 731, 8, 0);
				}
				mc.mp.gs.rsAddSound(11);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 44) {
				// 水の波動 水平発射
				if (boss_vx <= 0) mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 95);
				else mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 96);
				mc.mp.gs.rsAddSound(18);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 45) {
				// 水の波動 左へ発射
				mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 95);
				mc.mp.gs.rsAddSound(18);
				boss_shageki_c = k14;
				flag = true;
			} else if (j14 == 46) {
				// 水の波動 右へ発射
				mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 96);
				mc.mp.gs.rsAddSound(18);
				boss_shageki_c = k14;
				flag = true;
			}
		}
		if (boss_waza_select == 2) {
			// 技１と技２を交互に使う
			if (flag) {
				boss_waza_genzai++;
				if (boss_waza_genzai > 1) boss_waza_genzai = 0;
			}
		} else if (boss_waza_select == 3) {
			// 技１と技２と技３を順番に使う
			if (flag) {
				boss_waza_genzai++;
				if (boss_waza_genzai > 2) boss_waza_genzai = 0;
			}
		} else if (boss_waza_select == 4) {
			// 最初は技１ ＨＰが半分になると技２
			if (flag || flag1)
				if (boss_hp <= boss_hp_max >> 1) boss_waza_genzai = 1;
				else boss_waza_genzai = 0;
		} else if (boss_waza_select == 5) {
			// 最初は技１ ＨＰが減ると技２技３
			if (flag || flag1)
				if (boss_hp <= Math.floor(boss_hp_max / 3)) boss_waza_genzai = 2;
				else if (boss_hp <= Math.floor((boss_hp_max * 2) / 3)) boss_waza_genzai = 1;
				else boss_waza_genzai = 0;
		} else if (boss_waza_select == 6) {
			// 技１を３回の後 技２
			if (flag)
				if (boss_waza_select_option >= 1) {
					boss_waza_genzai = 0;
					boss_waza_select_option--;
					if (boss_waza_select_option <= 0) {
						boss_waza_select_option = 0;
						boss_waza_genzai = 1;
					}
				} else {
					boss_waza_genzai = 1;
				}
		} else if (boss_waza_select == 7) {
			// 技１を３回の後 技２と技３を交互
			if (flag)
				if (boss_waza_select_option >= 1) {
					boss_waza_genzai = 0;
					boss_waza_select_option--;
					if (boss_waza_select_option <= 0) {
						boss_waza_select_option = 0;
						boss_waza_genzai = 1;
					}
				} else if (boss_waza_genzai == 1) boss_waza_genzai = 2;
				else boss_waza_genzai = 1;
		} else if (boss_waza_select == 8) {
			// 左向きでは技１ 右では技２
			if (flag || flag1)
				if (boss_vx <= 0) boss_waza_genzai = 0;
				else boss_waza_genzai = 1;
		} else if (boss_waza_select == 9) {
			// 中央では技１ 上では技２ 下では技３
			if (flag || flag1)
				if (boss_ugoki == 16 || boss_ugoki == 17) {
					// 画面の内側を左回り　または　画面の内側を右回り
					if (!boss_hmove_f) boss_waza_genzai = 0;
					else if (boss_y + (boss_height >> 1) - mc.mp.maps.wy < rounddown(mc.gg.di.height / 2))
						boss_waza_genzai = 1;
					else boss_waza_genzai = 2;
				} else if (boss_ugoki == 6 || boss_ugoki == 7) {
					// 四角形左回り　または　四角形右回り
					if (!boss_hmove_f) boss_waza_genzai = 0;
					else if (boss_y < boss_y_shoki) boss_waza_genzai = 1;
					else boss_waza_genzai = 2;
				} else if (boss_ugoki == 14) {
					// 画面の端で方向転換
					if (boss_y + (boss_height >> 1) - mc.mp.maps.wy < 96) boss_waza_genzai = 1;
					else if (boss_y + (boss_height >> 1) - mc.mp.maps.wy >= 224) boss_waza_genzai = 2;
				} else if (boss_y + (boss_height >> 1) - mc.mp.maps.wy < mc.gg.di.height - 224) boss_waza_genzai = 1;
				else if (boss_y + (boss_height >> 1) - mc.mp.maps.wy >= mc.gg.di.height - 96) boss_waza_genzai = 2;
				else boss_waza_genzai = 0;
		} else if (boss_waza_select == 10) {
			// 中央では技１ 右では技２ 左では技３
			if (flag || flag1)
				if (boss_ugoki == 16 || boss_ugoki == 17) {
					// 画面の内側を左回り　または　画面の内側を右回り
					if (boss_hmove_f) boss_waza_genzai = 0;
					else if (boss_x + (boss_width >> 1) - mc.mp.maps.wx > rounddown(mc.gg.di.width / 2))
						boss_waza_genzai = 1;
					else boss_waza_genzai = 2;
				} else if (boss_ugoki == 6 || boss_ugoki == 7) {
					// 四角形左回り　または　四角形右回り
					if (boss_hmove_f) boss_waza_genzai = 0;
					else if (boss_x > boss_x_shoki - rounddown(mc.gg.di.width / 2)) boss_waza_genzai = 1;
					else boss_waza_genzai = 2;
				} else if (boss_x + (boss_width >> 1) - mc.mp.maps.wx < rounddown(mc.gg.di.width * 0.25))
					boss_waza_genzai = 2;
				else if (boss_x + (boss_width >> 1) - mc.mp.maps.wx >= rounddown(mc.gg.di.width * 0.75))
					boss_waza_genzai = 1;
				else boss_waza_genzai = 0;
		} else {
			boss_waza_genzai = 0;
		}
	}

	function initXImage() {
		for (let i = 0; i <= 3; i++) ximage_c[i] = 0;

		let j = getParamInt("ximage1_view_x");
		if (j > 0) {
			ximage_view_x[0] = (j + 1) * 32;
			ximage_x[0] = getParamInt("ximage1_x");
			ximage_y[0] = getParamInt("ximage1_y");
			ximage_c[0] = 100;
			ximage_img[0] = Applet1.getImage(getParameter("filename_ximage1"));
		}
		j = getParamInt("ximage2_view_x");
		if (j > 0) {
			ximage_view_x[1] = (j + 1) * 32;
			ximage_x[1] = getParamInt("ximage2_x");
			ximage_y[1] = getParamInt("ximage2_y");
			ximage_c[1] = 100;
			ximage_img[1] = Applet1.getImage(getParameter("filename_ximage2"));
		}
		j = getParamInt("ximage3_view_x");
		if (j > 0) {
			ximage_view_x[2] = (j + 1) * 32;
			ximage_x[2] = getParamInt("ximage3_x");
			ximage_y[2] = getParamInt("ximage3_y");
			ximage_c[2] = 100;
			ximage_img[2] = Applet1.getImage(getParameter("filename_ximage3"));
		}
		j = getParamInt("ximage4_view_x");
		if (j > 0) {
			ximage_view_x[3] = (j + 1) * 32;
			ximage_x[3] = getParamInt("ximage4_x");
			ximage_y[3] = getParamInt("ximage4_y");
			ximage_c[3] = 100;
			ximage_img[3] = Applet1.getImage(getParameter("filename_ximage4"));
		}
	}

	function moveXImage(g, i) {
		for (let j = 0; j <= 3; j++) {
			if (ximage_c[j] <= 0) continue;
			if (ximage_c[j] >= 100 && i >= ximage_view_x[j]) ximage_c[j]--;
			if (ximage_c[j] < 100) {
				g.drawImage(ximage_img[j], ximage_x[j], ximage_y[j], Applet1);
				ximage_c[j]--;
			}
		}
	}

	function loadXBackImage() {
		for (let j = 0; j < 8; j++) {
			x_backimage_view_x[j] = 0;

			let s = j + 1 + "";
			let k = getParamInt("x_backimage" + s + "_view_x");
			if (k > 0) {
				x_backimage_view_x[j] = (k + 1) * 32;
				x_backimage_img[j] = newImageOnLoadClassic(getParameter("x_backimage" + s + "_filename"));
			}
		}
	}

	function initXBackImage() {
		for (let i = 0; i < 8; i++) {
			x_backimage_vf[i] = false;
			if (x_backimage_view_x[i] <= 0) x_backimage_vf[i] = true;
		}
	}

	function moveXBackImage() {
		if (mc.gg.layer_mode != 2 && mc.mp.mcs_haikei_visible != 1) return;
		for (let i = 0; i < 8; i++)
			if (
				!x_backimage_vf[i] &&
				x_backimage_img[i] != null &&
				x_backimage_view_x[i] > 0 &&
				mc.mp.ml_mode == 100 &&
				mc.mp.maps.wx >= x_backimage_view_x[i]
			) {
				mc.mp.setbacki_f = true;
				mc.mp.setbacki_img = x_backimage_img[i];
				x_backimage_vf[i] = true;
			}
	}

	function newImageOnLoadClassic(s) {
		const image = Applet1.getImage(s);
		return image;
	}

	function getParameter(s) {
		return mc.getParameter(s);
	}

	/**
	 * 小数切り捨て
	 * @param {number} val 切り捨てを行いたい小数
	 * @param {boolean} option option が true かつ bc-use-rounddown がfalseの時Canvasオリジナルに
	 * @returns {number} 小数切り捨て後の値
	 */
	function rounddown(val, option, mp) {
		if (val >= 0 || (option && !mp.tdb.options["bc-use-rounddown"])) return Math.floor(val);
		else return -Math.floor(-val);
	}
};

//inject（MasaoConstructionのインスタンスをMasaoKani2にする）
CanvasMasao.MasaoKani2.inject = function (mc) {
	mc.userInit = function () {
		this.masaoKani2 = new CanvasMasao.MasaoKani2(this);
	};
	mc.userSub = function (g, image) {
		this.masaoKani2.masaoEvent(g, image);
	};
};
