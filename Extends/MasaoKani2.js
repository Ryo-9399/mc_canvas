
// すでに出来上がっているCanvasMasao.MasaoConstructionプロトタイプの
// プロパティメソッドuserInitとuserSubをオーバーライドして書き換える

// userInit: MasaoKani2のインスタンスをMasaoConstructionのプロパティに代入する
CanvasMasao.MasaoConstruction.prototype.userInit = function()
{
	this.masaoKani2 = new CanvasMasao.MasaoKani2(this);
}

// userSub: MasaoKani2のメソッドmasaoEvent(g, image)を呼び出す
CanvasMasao.MasaoConstruction.prototype.userSub = function(g, image)
{
	this.masaoKani2.masaoEvent(g, image);
}






// MasaoKani2クラス
CanvasMasao.MasaoKani2 = function(mc)
{

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


	this.masaoEvent = function(g, image)
	{
		var i = Applet1.getMode();
		if(i == 1)
			userTitleJS(g);
		else
		if(i >= 100 && i < 200)
		{
			if(Applet1.getJSMes() == 1)
			{
				Applet1.setJSMes("2");
				userGameStartJS();
			} else
			{
				userGameJS(g, Applet1.getViewXReal(), Applet1.getViewYReal());
			}
		} else
		if(i == 200)
			userGameoverJS(g);
		else
		if(i == 300)
			userEndingJS(g);
		else
		if(i == 400)
			userChizuJS(g);
		my_offscreen_img = image;
	}

	function userInitJS()
	{
		Applet1 = mc;
		loadBossImage();
		loadXBackImage();
	}

	function userTitleJS(g)
	{
	}

	function userGameStartJS()
	{
		var i = getParamInt("j_hp");
		if(i < 1)
			i = 1;
		if(i > 1)
		{
			Applet1.setMyMaxHP(i);
			var s = getParameter("j_hp_name");
			if(s == null)
				s = "";
			Applet1.showMyHP(s);
		}
		if(getParamInt("j_equip_fire") == 2)
			Applet1.equipFire(1);
		i = getParamInt("j_equip_grenade");
		if(i >= 1)
			Applet1.equipGrenade(i);
		initXImage();
		initXBackImage();
		initBoss();
	}

	function userGameJS(g, i, j)
	{
		if(boss_jyoutai > 0)
			moveBoss(g, i, j);
		moveXBackImage();
		moveXImage(g, i);
	}

	function userGameoverJS(g)
	{
	}

	function userEndingJS(g)
	{
	}

	function userChizuJS(g)
	{
	}

	function getParamInt(s)
	{
		var i = parseInt(getParameter(s));
		if(isNaN(i))
			i = -1;
		return i;
	}

	function loadBossImage()
	{
		boss_v = getParamInt("oriboss_v");
		if(boss_v >= 2)
		{
			boss_anime_type = getParamInt("oriboss_anime_type");
			if(boss_anime_type != 2)
				boss_anime_type = 1;
			var s = Applet1.getParameter("filename_oriboss_left1");
			boss_left1_img = Applet1.getImage(s);
			s = Applet1.getParameter("filename_oriboss_right1");
			boss_right1_img = Applet1.getImage(s);
			s = Applet1.getParameter("filename_oriboss_tubure_left");
			boss_tubure_left_img = Applet1.getImage(s);
			s = Applet1.getParameter("filename_oriboss_tubure_right");
			boss_tubure_right_img = Applet1.getImage(s);
			if(boss_anime_type != 2)
			{
				var s1 = Applet1.getParameter("filename_oriboss_left2");
				boss_left2_img = Applet1.getImage(s1);
				s1 = Applet1.getParameter("filename_oriboss_right2");
				boss_right2_img = Applet1.getImage(s1);
			}
		}
	}

	function initBoss()
	{
		boss_v = getParamInt("oriboss_v");
		if(boss_v >= 2)
		{
			boss_jyoutai = 30;
			boss_jyoutai_b = boss_jyoutai;
			boss_c1 = 0;
			boss_ac = 0;
			boss_hmove_f = false;
			boss_name = getParameter("oriboss_name");
			if(boss_name == null)
				boss_name = "";
			boss_hp = getParamInt("oriboss_hp");
			if(boss_hp < 1)
				boss_hp = 1;
			boss_hp_max = boss_hp;
			if(boss_v == 3)
			{
				if(mc.mp.co_b.c == 300)
				{
					mc.mp.co_b.c = 0;
					boss_x = mc.mp.co_b.x;
					boss_y = mc.mp.co_b.y + 16;
				} else
				{
					boss_jyoutai = 0;
				}
			} else
			{
				boss_x = getParamInt("oriboss_x");
				if(boss_x < 0)
					boss_x = 0;
				if(boss_x > 179)
					boss_x = 179;
				boss_x = (boss_x + 1) * 32;
				boss_y = getParamInt("oriboss_y");
				if(boss_y < 0)
					boss_y = 0;
				if(boss_y > 29)
					boss_y = 29;
				boss_y = (boss_y + 10) * 32;
			}
			boss_x_shoki = boss_x;
			boss_y_shoki = boss_y;
			boss_width = getParamInt("oriboss_width");
			if(boss_width < 32)
				boss_width = 32;
			boss_height = getParamInt("oriboss_height");
			if(boss_height < 32)
				boss_height = 32;
			boss_speed = getParamInt("oriboss_speed");
			if(boss_speed < 1)
				boss_speed = 1;
			boss_vx = -4;
			boss_ugoki = getParamInt("oriboss_ugoki");
			if(boss_ugoki < 1)
				boss_ugoki = 1;
			if(boss_ugoki > 27)
				boss_ugoki = 1;
			boss_waza_select = getParamInt("oriboss_waza_select");
			if(boss_waza_select < 1)
				boss_waza_select = 1;
			if(boss_waza_select > 10)
				boss_waza_select = 1;
			boss_waza_select_option = getParamInt("oriboss_waza_select_option");
			if(boss_waza_select_option < 0)
				boss_waza_select_option = 3;
			if(boss_waza_select_option < 1)
				boss_waza_select_option = 1;
			boss_waza[0] = getParamInt("oriboss_waza1");
			if(boss_waza[0] < 1)
				boss_waza[0] = 1;
			if(boss_waza[0] > boss_waza_max)
				boss_waza[0] = boss_waza_max;
			boss_waza[1] = getParamInt("oriboss_waza2");
			if(boss_waza[1] < 1)
				boss_waza[1] = 1;
			if(boss_waza[1] > boss_waza_max)
				boss_waza[1] = boss_waza_max;
			boss_waza[2] = getParamInt("oriboss_waza3");
			if(boss_waza[2] < 1)
				boss_waza[2] = 1;
			if(boss_waza[2] > boss_waza_max)
				boss_waza[2] = boss_waza_max;
			boss_waza_wait[0] = getParamInt("oriboss_waza1_wait");
			if(boss_waza_wait[0] < 1)
				boss_waza_wait[0] = 1;
			boss_waza_wait[1] = getParamInt("oriboss_waza2_wait");
			if(boss_waza_wait[1] < 1)
				boss_waza_wait[1] = 1;
			boss_waza_wait[2] = getParamInt("oriboss_waza3_wait");
			if(boss_waza_wait[2] < 1)
				boss_waza_wait[2] = 1;
			boss_waza_genzai = 0;
			boss_fumeru_f = getParamInt("oriboss_fumeru_f");
			if(boss_fumeru_f < 1 || boss_fumeru_f > 4)
				boss_fumeru_f = 1;
			boss_tail_f = getParamInt("oriboss_tail_f");
			if(boss_tail_f != 2)
				boss_tail_f = 1;
			boss_destroy = getParamInt("oriboss_destroy");
			if(boss_destroy != 2)
				boss_destroy = 1;
			boss_kyo_f = false;
			boss_kyo_width = boss_width;
			boss_kyo_height = boss_height;
			if(boss_jyoutai > 0)
			{
				boss_anime_type = getParamInt("oriboss_anime_type");
				if(boss_anime_type != 2)
					boss_anime_type = 1;
				sl_x = boss_x - 512;
				Applet1.setScrollLock(sl_x);
				boss_shageki_c = 5;
			}
		} else
		{
			boss_jyoutai = 0;
		}
	}

	function moveBoss(g, i, j)
	{
		if(boss_jyoutai == 30)
		{
			if(i >= sl_x)
				boss_jyoutai = 100;
			return;
		}
		if(boss_jyoutai == 20)
		{
			boss_bc = boss_bc - 1;
			if(boss_bc <= 0)
			{
				Applet1.setStageClear();
				boss_jyoutai = 0;
			}
		} else
		if(boss_jyoutai == 50)
		{
			boss_bc = boss_bc - 1;
			if(boss_bc <= 0)
			{
				boss_jyoutai = 0;
				Applet1.hideGauge();
				Applet1.addScore(1000);
				if(boss_destroy == 2)
				{
					boss_jyoutai = 20;
					boss_bc = 30;
				} else
				{
					Applet1.setMapchip(((i >> 5) - 1) + 6, ((j >> 5) - 10) + 4, 8);
				}
			}
		} else
		if(boss_jyoutai == 80)
		{
			boss_bc = boss_bc - 1;
			if(boss_bc <= 0)
				boss_jyoutai = boss_jyoutai_b;
		} else
		if(boss_jyoutai >= 100)
		{
			if(boss_jyoutai == 100)
			{
				boss_x = boss_x + boss_vx;
				if(boss_ugoki == 24 || boss_ugoki == 25 || boss_ugoki == 26)
				{
					if(boss_x + (boss_width >> 1) <= sl_x + 256)
					{
						boss_x = (sl_x + 256) - (boss_width >> 1);
						if(boss_ugoki == 24)
						{
							boss_jyoutai = 2500;
							boss_vx = boss_speed * -1;
							boss_vy = 0;
						} else
						if(boss_ugoki == 26)
						{
							boss_jyoutai = 2700;
							boss_vx = boss_speed * -1;
							boss_vy = 0;
							boss_kyo_f = true;
						} else
						{
							boss_jyoutai = 2600;
							boss_vx = boss_speed * -1;
							if(boss_x + (boss_width >> 1) < mc.mp.co_j.x + 15)
								boss_vx = boss_speed;
							boss_vy = 0;
						}
					}
				} else
				if(boss_ugoki == 4 || boss_ugoki == 5 || boss_ugoki == 20 || boss_ugoki == 21)
				{
					if(boss_x <= sl_x + 320)
					{
						boss_x = sl_x + 320;
						boss_vx = 0;
						if(boss_ugoki == 4)
						{
							boss_jyoutai = 500;
							boss_kakudo = 0;
						} else
						if(boss_ugoki == 20)
						{
							boss_jyoutai = 2100;
							boss_kakudo = 0;
						} else
						if(boss_ugoki == 21)
						{
							boss_jyoutai = 2200;
							boss_kakudo = 0;
						} else
						{
							boss_jyoutai = 600;
							boss_kakudo = 0;
						}
						boss_jyoutai_b = boss_jyoutai;
					}
				} else
				if(boss_ugoki == 16 || boss_ugoki == 17)
				{
					if(boss_x <= (sl_x + 512) - boss_width)
					{
						boss_x = (sl_x + 512) - boss_width;
						boss_vx = 0;
						if(boss_ugoki == 16)
						{
							boss_jyoutai = 1700;
							boss_vy = boss_speed * -1;
							boss_vx = boss_speed * -1;
						} else
						{
							boss_jyoutai = 1800;
							boss_vy = boss_speed;
							boss_vx = boss_speed * -1;
						}
						boss_jyoutai_b = boss_jyoutai;
					}
				} else
				if(boss_x <= sl_x + 384)
				{
					boss_x = sl_x + 384;
					boss_vx = 0;
					if(boss_ugoki == 2)
					{
						boss_jyoutai = 300;
						boss_vx = boss_speed * -1;
					} else
					if(boss_ugoki == 3)
					{
						boss_jyoutai = 400;
						boss_vy = boss_speed * -1;
					} else
					if(boss_ugoki == 6)
					{
						boss_jyoutai = 700;
						boss_vy = boss_speed * -1;
						boss_vx = boss_speed * -1;
					} else
					if(boss_ugoki == 7)
					{
						boss_jyoutai = 800;
						boss_vy = boss_speed;
						boss_vx = boss_speed * -1;
					} else
					if(boss_ugoki == 8)
					{
						boss_jyoutai = 900;
						boss_vx = boss_speed * -1;
					} else
					if(boss_ugoki == 9)
					{
						boss_jyoutai = 1000;
						boss_vx = boss_speed * -1;
					} else
					if(boss_ugoki == 10)
					{
						boss_jyoutai = 1100;
						boss_vx = boss_speed * -1;
					} else
					if(boss_ugoki == 11)
					{
						boss_jyoutai = 1200;
						boss_vx = boss_speed * -1;
					} else
					if(boss_ugoki == 12)
					{
						boss_jyoutai = 1300;
						boss_vx = boss_speed * -1;
					} else
					if(boss_ugoki == 13)
					{
						boss_jyoutai = 1400;
						boss_vx = boss_speed * -1;
					} else
					if(boss_ugoki == 14)
					{
						boss_jyoutai = 1500;
						boss_vx = boss_speed * -1;
						boss_vy = boss_speed * -1;
					} else
					if(boss_ugoki == 15)
					{
						boss_jyoutai = 1600;
						boss_vx = (boss_speed >> 1) * -1;
						boss_vy = boss_speed * -1;
					} else
					if(boss_ugoki == 18)
					{
						boss_jyoutai = 1900;
						boss_vx = boss_speed * -1;
					} else
					if(boss_ugoki == 19)
					{
						boss_jyoutai = 2000;
						boss_vx = boss_speed * -1;
					} else
					if(boss_ugoki == 22)
					{
						boss_jyoutai = 2300;
						boss_vx = boss_speed * -1;
						boss_vy = boss_speed * -1;
					} else
					if(boss_ugoki == 23)
					{
						boss_jyoutai = 2400;
						boss_vx = boss_speed * -1;
						boss_vy = boss_speed;
					} else
					if(boss_ugoki == 27)
					{
						boss_jyoutai = 2800;
						boss_vx = boss_speed * -1;
						boss_vy = 0;
						boss_kyo_f = true;
					} else
					{
						boss_jyoutai = 200;
						boss_vx = 0;
					}
					boss_jyoutai_b = boss_jyoutai;
				}
			} else
			if(boss_jyoutai == 200)
				shagekiBoss();
			else
			if(boss_jyoutai == 300)
			{
				if(boss_vx < 0)
				{
					boss_x += boss_vx;
					if(boss_x <= boss_x_shoki - 512)
					{
						boss_x = boss_x_shoki - 512;
						boss_vx = boss_speed;
					}
				} else
				{
					boss_x += boss_vx;
					if(boss_x >= boss_x_shoki - boss_width)
					{
						boss_x = boss_x_shoki - boss_width;
						boss_vx = boss_speed * -1;
					}
				}
				shagekiBoss();
			} else
			if(boss_jyoutai == 400)
			{
				if(boss_vy < 0)
				{
					boss_y += boss_vy;
					if(boss_y <= boss_y_shoki - 96)
					{
						boss_y = boss_y_shoki - 96;
						boss_vy = boss_speed;
					}
				} else
				{
					boss_y += boss_vy;
					if(boss_y >= boss_y_shoki + 96)
					{
						boss_y = boss_y_shoki + 96;
						boss_vy = boss_speed * -1;
					}
				}
				shagekiBoss();
			} else
			if(boss_jyoutai == 500)
			{
				boss_kakudo -= boss_speed;
				if(boss_kakudo < 0)
					boss_kakudo += 360;
				boss_x = ((boss_x_shoki - 256) + Math.floor(Math.cos((boss_kakudo * 3.14) / 180) * 96)) - 32;
				boss_y = (boss_y_shoki + 32 + Math.floor(Math.sin((boss_kakudo * 3.14) / 180) * 96)) - 32;
				if(boss_kakudo > 180)
					boss_vx = -1;
				else
					boss_vx = 1;
				shagekiBoss();
			} else
			if(boss_jyoutai == 600)
			{
				boss_kakudo += boss_speed;
				if(boss_kakudo >= 360)
					boss_kakudo -= 360;
				boss_x = ((boss_x_shoki - 256) + Math.floor(Math.cos((boss_kakudo * 3.14) / 180) * 96)) - 32;
				boss_y = (boss_y_shoki + 32 + Math.floor(Math.sin((boss_kakudo * 3.14) / 180) * 96)) - 32;
				if(boss_kakudo < 180)
					boss_vx = -1;
				else
					boss_vx = 1;
				shagekiBoss();
			} else
			if(boss_jyoutai == 700)
			{
				if(boss_vx < 0)
				{
					if(boss_y > boss_y_shoki - 64)
					{
						boss_y -= boss_speed;
						if(boss_y <= boss_y_shoki - 64)
						{
							boss_y = boss_y_shoki - 64;
							boss_vy = 0;
							boss_hmove_f = true;
						}
					} else
					{
						boss_x += boss_vx;
						if(boss_x <= ((boss_x_shoki - 512) + 128) - boss_width)
						{
							boss_x = ((boss_x_shoki - 512) + 128) - boss_width;
							boss_vx = boss_speed;
							boss_vy = boss_speed;
							boss_hmove_f = false;
						}
					}
				} else
				if(boss_y < boss_y_shoki + 64)
				{
					boss_y += boss_speed;
					if(boss_y >= boss_y_shoki + 64)
					{
						boss_y = boss_y_shoki + 64;
						boss_vy = 0;
						boss_hmove_f = true;
					}
				} else
				{
					boss_x += boss_vx;
					if(boss_x >= boss_x_shoki - 128)
					{
						boss_x = boss_x_shoki - 128;
						boss_vx = boss_speed * -1;
						boss_vy = boss_speed * -1;
						boss_hmove_f = false;
					}
				}
				shagekiBoss();
			} else
			if(boss_jyoutai == 800)
			{
				if(boss_vx < 0)
				{
					if(boss_y < boss_y_shoki + 64)
					{
						boss_y += boss_speed;
						if(boss_y >= boss_y_shoki + 64)
						{
							boss_y = boss_y_shoki + 64;
							boss_vy = 0;
							boss_hmove_f = true;
						}
					} else
					{
						boss_x += boss_vx;
						if(boss_x <= ((boss_x_shoki - 512) + 128) - boss_width)
						{
							boss_x = ((boss_x_shoki - 512) + 128) - boss_width;
							boss_vx = boss_speed;
							boss_vy = boss_speed * -1;
							boss_hmove_f = false;
						}
					}
				} else
				if(boss_y > boss_y_shoki - 64)
				{
					boss_y -= boss_speed;
					if(boss_y <= boss_y_shoki - 64)
					{
						boss_y = boss_y_shoki - 64;
						boss_vy = 0;
						boss_hmove_f = true;
					}
				} else
				{
					boss_x += boss_vx;
					if(boss_x >= boss_x_shoki - 128)
					{
						boss_x = boss_x_shoki - 128;
						boss_vx = boss_speed * -1;
						boss_vy = boss_speed;
						boss_hmove_f = false;
					}
				}
				shagekiBoss();
			} else
			if(boss_jyoutai >= 900 && boss_jyoutai < 1000)
			{
				if(boss_jyoutai == 900)
				{
					if(boss_hp <= (boss_hp_max >> 1))
					{
						boss_jyoutai = 910;
						boss_vx = boss_speed * -1;
						boss_shageki_c = 2;
					} else
					{
						shagekiBoss();
					}
				} else
				if(boss_jyoutai == 910)
				{
					boss_x += boss_vx;
					if(boss_x <= boss_x_shoki - 512)
					{
						boss_x = boss_x_shoki - 512;
						boss_jyoutai = 920;
						boss_vx = boss_speed;
					}
				} else
				if(boss_jyoutai == 920)
					shagekiBoss();
			} else
			if(boss_jyoutai >= 1000 && boss_jyoutai < 1100)
			{
				if(boss_jyoutai == 1000)
				{
					if(boss_hp <= Math.floor((boss_hp_max * 2) / 3))
					{
						boss_jyoutai = 1010;
						boss_vx = boss_speed * -1;
						boss_shageki_c = 2;
					} else
					{
						shagekiBoss();
					}
				} else
				if(boss_jyoutai == 1010)
				{
					boss_x += boss_vx;
					if(boss_x <= boss_x_shoki - 512)
					{
						boss_x = boss_x_shoki - 512;
						boss_jyoutai = 1020;
						boss_vx = boss_speed;
					}
				} else
				if(boss_jyoutai == 1020)
				{
					if(boss_hp <= Math.floor(boss_hp_max / 3))
					{
						boss_jyoutai = 1030;
						boss_vx = boss_speed;
						boss_shageki_c = 2;
					} else
					{
						shagekiBoss();
					}
					shagekiBoss();
				} else
				if(boss_jyoutai == 1030)
				{
					boss_x += boss_vx;
					if(boss_x >= boss_x_shoki - boss_width)
					{
						boss_x = boss_x_shoki - boss_width;
						boss_vx = boss_speed * -1;
						boss_jyoutai = 1040;
					}
				} else
				if(boss_jyoutai == 1040)
					shagekiBoss();
			} else
			if(boss_jyoutai >= 1100 && boss_jyoutai < 1200)
			{
				if(boss_jyoutai == 1100)
				{
					if(boss_hp <= (boss_hp_max >> 1))
					{
						boss_jyoutai = 1110;
						boss_vy = boss_speed * -1;
						boss_shageki_c = 2;
					} else
					{
						shagekiBoss();
					}
				} else
				if(boss_jyoutai == 1110)
				{
					boss_y += boss_vy;
					if(boss_y <= j + 32)
					{
						boss_y = j + 32;
						boss_jyoutai = 1120;
					}
				} else
				if(boss_jyoutai == 1120)
					shagekiBoss();
			} else
			if(boss_jyoutai >= 1200 && boss_jyoutai < 1300)
			{
				if(boss_jyoutai == 1200)
				{
					if(boss_hp <= Math.floor((boss_hp_max * 2) / 3))
					{
						boss_jyoutai = 1210;
						boss_vy = boss_speed * -1;
						boss_shageki_c = 2;
					} else
					{
						shagekiBoss();
					}
				} else
				if(boss_jyoutai == 1210)
				{
					boss_y += boss_vy;
					if(boss_y <= j + 32)
					{
						boss_y = j + 32;
						boss_jyoutai = 1220;
					}
				} else
				if(boss_jyoutai == 1220)
				{
					if(boss_hp <= Math.floor(boss_hp_max / 3))
					{
						boss_jyoutai = 1230;
						boss_vy = boss_speed;
						boss_shageki_c = 2;
					} else
					{
						shagekiBoss();
					}
				} else
				if(boss_jyoutai == 1230)
				{
					boss_y += boss_vy;
					if(boss_y >= (j + 320) - boss_height - 32)
					{
						boss_y = (j + 320) - boss_height - 32;
						boss_jyoutai = 1240;
					}
				} else
				if(boss_jyoutai == 1240)
					shagekiBoss();
			} else
			if(boss_jyoutai >= 1300 && boss_jyoutai < 1400)
			{
				if(boss_jyoutai == 1300)
				{
					if(boss_hp <= (boss_hp_max >> 1))
					{
						boss_jyoutai = 1310;
						boss_vy = boss_speed;
						boss_shageki_c = 2;
					} else
					{
						shagekiBoss();
					}
				} else
				if(boss_jyoutai == 1310)
				{
					boss_y += boss_vy;
					if(boss_y >= (j + 320) - boss_height - 32)
					{
						boss_y = (j + 320) - boss_height - 32;
						boss_jyoutai = 1320;
					}
				} else
				if(boss_jyoutai == 1320)
					shagekiBoss();
			} else
			if(boss_jyoutai >= 1400 && boss_jyoutai < 1500)
			{
				if(boss_jyoutai == 1400)
				{
					if(boss_hp <= Math.floor((boss_hp_max * 2) / 3))
					{
						boss_jyoutai = 1410;
						boss_vy = boss_speed;
						boss_shageki_c = 2;
					} else
					{
						shagekiBoss();
					}
				} else
				if(boss_jyoutai == 1410)
				{
					boss_y += boss_vy;
					if(boss_y >= (j + 320) - boss_height - 32)
					{
						boss_y = (j + 320) - boss_height - 32;
						boss_jyoutai = 1420;
					}
				} else
				if(boss_jyoutai == 1420)
				{
					if(boss_hp <= Math.floor(boss_hp_max / 3))
					{
						boss_jyoutai = 1430;
						boss_vy = boss_speed * -1;
						boss_shageki_c = 2;
					} else
					{
						shagekiBoss();
					}
				} else
				if(boss_jyoutai == 1430)
				{
					boss_y += boss_vy;
					if(boss_y <= j + 32)
					{
						boss_y = j + 32;
						boss_jyoutai = 1440;
					}
				} else
				if(boss_jyoutai == 1440)
					shagekiBoss();
			} else
			if(boss_jyoutai >= 1500 && boss_jyoutai < 1600)
			{
				if(boss_vx > 0)
				{
					boss_x += boss_vx;
					if(boss_x >= (i + 512) - boss_width)
					{
						boss_x = (i + 512) - boss_width;
						boss_vx = boss_speed * -1;
					}
				} else
				if(boss_vx < 0)
				{
					boss_x += boss_vx;
					if(boss_x <= i)
					{
						boss_x = i;
						boss_vx = boss_speed;
					}
				}
				if(boss_vy > 0)
				{
					boss_y += boss_vy;
					if(boss_y >= (j + 320) - boss_height)
					{
						boss_y = (j + 320) - boss_height;
						boss_vy = boss_speed * -1;
					}
				} else
				if(boss_vy < 0)
				{
					boss_y += boss_vy;
					if(boss_y <= j)
					{
						boss_y = j;
						boss_vy = boss_speed;
					}
				}
				shagekiBoss();
			} else
			if(boss_jyoutai >= 1600 && boss_jyoutai < 1700)
			{
				if(boss_vx > 0)
				{
					boss_x += boss_vx;
					if(boss_x >= (i + 512) - boss_width)
					{
						boss_x = (i + 512) - boss_width;
						boss_vx = (boss_speed >> 1) * -1;
					}
				} else
				if(boss_vx < 0)
				{
					boss_x += boss_vx;
					if(boss_x <= i)
					{
						boss_x = i;
						boss_vx = boss_speed >> 1;
					}
				}
				if(boss_vy > 0)
				{
					boss_y += boss_vy;
					if(boss_y >= (j + 320) - boss_height - 64)
					{
						boss_y = (j + 320) - boss_height - 64;
						boss_vy = boss_speed * -1;
					}
				} else
				if(boss_vy < 0)
				{
					boss_y += boss_vy;
					if(boss_y <= j + 64)
					{
						boss_y = j + 64;
						boss_vy = boss_speed;
					}
				}
				shagekiBoss();
			} else
			if(boss_jyoutai == 1700)
			{
				if(boss_vx < 0)
				{
					if(!boss_hmove_f)
					{
						boss_y -= boss_speed;
						if(boss_y <= j)
						{
							boss_y = j;
							boss_vy = 0;
							boss_hmove_f = true;
						}
					} else
					{
						boss_x += boss_vx;
						if(boss_x <= i)
						{
							boss_x = i;
							boss_vx = boss_speed;
							boss_vy = boss_speed;
							boss_hmove_f = false;
						}
					}
				} else
				if(!boss_hmove_f)
				{
					boss_y += boss_speed;
					if(boss_y >= (j + 320) - boss_height)
					{
						boss_y = (j + 320) - boss_height;
						boss_vy = 0;
						boss_hmove_f = true;
					}
				} else
				{
					boss_x += boss_vx;
					if(boss_x >= (i + 512) - boss_width)
					{
						boss_x = (i + 512) - boss_width;
						boss_vx = boss_speed * -1;
						boss_vy = boss_speed * -1;
						boss_hmove_f = false;
					}
				}
				shagekiBoss();
			} else
			if(boss_jyoutai == 1800)
			{
				if(boss_vx < 0)
				{
					if(!boss_hmove_f)
					{
						boss_y += boss_speed;
						if(boss_y >= (j + 320) - boss_height)
						{
							boss_y = (j + 320) - boss_height;
							boss_vy = 0;
							boss_hmove_f = true;
						}
					} else
					{
						boss_x += boss_vx;
						if(boss_x <= i)
						{
							boss_x = i;
							boss_vx = boss_speed;
							boss_vy = boss_speed * -1;
							boss_hmove_f = false;
						}
					}
				} else
				if(!boss_hmove_f)
				{
					boss_y -= boss_speed;
					if(boss_y <= j)
					{
						boss_y = j;
						boss_vy = 0;
						boss_hmove_f = true;
					}
				} else
				{
					boss_x += boss_vx;
					if(boss_x >= (i + 512) - boss_width)
					{
						boss_x = (i + 512) - boss_width;
						boss_vx = boss_speed * -1;
						boss_vy = boss_speed;
						boss_hmove_f = false;
					}
				}
				shagekiBoss();
			} else
			if(boss_jyoutai >= 1900 && boss_jyoutai < 2000)
			{
				if(boss_jyoutai == 1900)
				{
					if(boss_hp <= (boss_hp_max >> 1))
					{
						boss_jyoutai = 1910;
						if(boss_shageki_c < 10)
							boss_shageki_c = 10;
					}
				} else
				if(boss_vx < 0)
				{
					boss_x += boss_vx;
					if(boss_x <= boss_x_shoki - 512)
					{
						boss_x = boss_x_shoki - 512;
						boss_vx = boss_speed;
					}
				} else
				{
					boss_x += boss_vx;
					if(boss_x >= boss_x_shoki - boss_width)
					{
						boss_x = boss_x_shoki - boss_width;
						boss_vx = boss_speed * -1;
					}
				}
				shagekiBoss();
			} else
			if(boss_jyoutai >= 2000 && boss_jyoutai < 2100)
			{
				if(boss_jyoutai == 2000)
				{
					if(boss_hp <= Math.floor(boss_hp_max / 3))
					{
						boss_jyoutai = 2010;
						if(boss_shageki_c < 10)
							boss_shageki_c = 10;
					}
				} else
				if(boss_vx < 0)
				{
					boss_x += boss_vx;
					if(boss_x <= boss_x_shoki - 512)
					{
						boss_x = boss_x_shoki - 512;
						boss_vx = boss_speed;
					}
				} else
				{
					boss_x += boss_vx;
					if(boss_x >= boss_x_shoki - boss_width)
					{
						boss_x = boss_x_shoki - boss_width;
						boss_vx = boss_speed * -1;
					}
				}
				shagekiBoss();
			} else
			if(boss_jyoutai >= 2100 && boss_jyoutai < 2200)
			{
				if(boss_jyoutai == 2100)
				{
					if(boss_hp <= (boss_hp_max >> 1))
					{
						boss_jyoutai = 2110;
						if(boss_shageki_c < 10)
							boss_shageki_c = 10;
					}
				} else
				{
					boss_kakudo -= boss_speed;
					if(boss_kakudo < 0)
						boss_kakudo += 360;
					boss_x = ((boss_x_shoki - 256) + Math.floor(Math.cos((boss_kakudo * 3.14) / 180) * 96)) - 32;
					boss_y = (boss_y_shoki + 32 + Math.floor(Math.sin((boss_kakudo * 3.14) / 180) * 96)) - 32;
					if(boss_kakudo > 180)
						boss_vx = -1;
					else
						boss_vx = 1;
				}
				shagekiBoss();
			} else
			if(boss_jyoutai >= 2200 && boss_jyoutai < 2300)
			{
				if(boss_jyoutai == 2200)
				{
					if(boss_hp <= Math.floor(boss_hp_max / 3))
					{
						boss_jyoutai = 2110;
						if(boss_shageki_c < 10)
							boss_shageki_c = 10;
					}
				} else
				{
					boss_kakudo -= boss_speed;
					if(boss_kakudo < 0)
						boss_kakudo += 360;
					boss_x = ((boss_x_shoki - 256) + Math.floor(Math.cos((boss_kakudo * 3.14) / 180) * 96)) - 32;
					boss_y = (boss_y_shoki + 32 + Math.floor(Math.sin((boss_kakudo * 3.14) / 180) * 96)) - 32;
					if(boss_kakudo > 180)
						boss_vx = -1;
					else
						boss_vx = 1;
				}
				shagekiBoss();
			} else
			if(boss_jyoutai == 2300)
			{
				if(boss_vy < 0)
				{
					boss_y += boss_vy;
					boss_x += boss_vx;
					if(boss_y <= boss_y_shoki - 192)
					{
						boss_y = boss_y_shoki - 192;
						boss_x = boss_x_shoki - 128 - 192;
						boss_vy = boss_speed;
						boss_vx = boss_speed;
					}
				} else
				{
					boss_y += boss_vy;
					boss_x += boss_vx;
					if(boss_y >= boss_y_shoki)
					{
						boss_y = boss_y_shoki;
						boss_x = boss_x_shoki - 128;
						boss_vy = boss_speed * -1;
						boss_vx = boss_speed * -1;
					}
				}
				shagekiBoss();
			} else
			if(boss_jyoutai == 2400)
			{
				if(boss_vy < 0)
				{
					boss_y += boss_vy;
					boss_x += boss_vx;
					if(boss_y <= boss_y_shoki)
					{
						boss_y = boss_y_shoki;
						boss_x = boss_x_shoki - 128;
						boss_vy = boss_speed;
						boss_vx = boss_speed * -1;
					}
				} else
				{
					boss_y += boss_vy;
					boss_x += boss_vx;
					if(boss_y >= boss_y_shoki + 192)
					{
						boss_y = boss_y_shoki + 192;
						boss_x = boss_x_shoki - 128 - 192;
						boss_vy = boss_speed * -1;
						boss_vx = boss_speed;
					}
				}
				shagekiBoss();
			} else
			if(boss_jyoutai == 2500)
				shagekiBoss();
			else
			if(boss_jyoutai >= 2600 && boss_jyoutai < 2700)
			{
				if(boss_jyoutai < 2616)
					boss_jyoutai++;
				else
				if(boss_vx <= 0)
				{
					if(boss_x + (boss_width >> 1) < mc.mp.co_j.x + 15)
					{
						boss_vx = boss_speed;
						boss_jyoutai = 2600;
					}
				} else
				if(boss_x + (boss_width >> 1) > mc.mp.co_j.x + 15)
				{
					boss_vx = boss_speed * -1;
					boss_jyoutai = 2600;
				}
				shagekiBoss();
			} else
			if(boss_jyoutai == 2700)
			{
				boss_c1++;
				if(boss_c1 > 1)
					boss_c1 = 0;
				if(boss_c1 == 0 && boss_kyo_width < 1024)
				{
					boss_kyo_width += 2;
					boss_kyo_height += 2;
				}
				shagekiBoss();
			} else
			if(boss_jyoutai == 2800)
			{
				if(boss_kyo_width < 1024)
				{
					boss_kyo_width += 2;
					boss_kyo_height += 2;
				}
				shagekiBoss();
			}
			var flag1 = false;
			if(boss_fumeru_f != 3)
				if(boss_kyo_f)
				{
					if(Applet1.getMyXReal() + 24 > boss_x - ((boss_kyo_width - boss_width) >> 1) && Applet1.getMyXReal() < (boss_x + boss_width + ((boss_kyo_width - boss_width) >> 1)) - 8 && Applet1.getMyYReal() + 24 > boss_y - ((boss_kyo_height - boss_height) >> 1) && Applet1.getMyYReal() < (boss_y + boss_height + ((boss_kyo_height - boss_height) >> 1)) - 8)
						flag1 = true;
				} else
				if(Applet1.getMyXReal() + 24 > boss_x && Applet1.getMyXReal() < (boss_x + boss_width) - 8 && Applet1.getMyYReal() + 24 > boss_y && Applet1.getMyYReal() < (boss_y + boss_height) - 8)
					flag1 = true;
			if(flag1)
				if(boss_fumeru_f == 2 && Applet1.getMyVY() > 10)
				{
					Applet1.setMyPress("3");
					Applet1.setMyYReal(boss_y);
					boss_hp = boss_hp - 1;
					if(boss_hp <= 0)
					{
						boss_hp = 0;
						boss_jyoutai = 50;
						boss_bc = 20;
					} else
					{
						boss_jyoutai = 80;
						boss_bc = 10;
					}
				} else
				if(boss_fumeru_f == 4)
				{
					Applet1.setMyMiss("2");
				} else
				{
					Applet1.setMyHPDamage("1");
					if(Applet1.getMyHP() <= 0)
						Applet1.setMyMiss("2");
				}
			var l;
			if(boss_kyo_f)
				l = Applet1.attackFire(boss_x - 24 - ((boss_kyo_width - boss_width) >> 1), boss_y - 24 - ((boss_kyo_height - boss_height) >> 1), (boss_kyo_width - 32) + 48, (boss_kyo_height - 32) + 48);
			else
				l = Applet1.attackFire(boss_x - 24, boss_y - 24, (boss_width - 32) + 48, (boss_height - 32) + 48);
			if(l >= 1)
			{
				boss_hp = boss_hp - l;
				if(boss_hp <= 0)
				{
					boss_hp = 0;
					boss_jyoutai = 50;
					boss_bc = 20;
				}
			}
			if(boss_tail_f == 2 && mc.mp.j_tail_ac == 5)
			{
				var flag = false;
				if(boss_kyo_f)
				{
					if(mc.mp.co_j.y < ((boss_y + boss_height) - 4) + ((boss_kyo_height - boss_height) >> 1) && mc.mp.co_j.y + 32 > (boss_y + 4) - ((boss_kyo_height - boss_height) >> 1))
						if(mc.mp.co_j.muki == 0)
						{
							if(mc.mp.co_j.x - 32 - 12 <= boss_x + boss_width + ((boss_kyo_width - boss_width) >> 1) && mc.mp.co_j.x + 8 >= boss_x - ((boss_kyo_width - boss_width) >> 1))
								flag = true;
						} else
						if(mc.mp.co_j.x + 32 + 32 + 12 >= boss_x - ((boss_kyo_width - boss_width) >> 1) && mc.mp.co_j.x + 24 <= boss_x + boss_width + ((boss_kyo_width - boss_width) >> 1))
							flag = true;
				} else
				if(mc.mp.co_j.y < (boss_y + boss_height) - 4 && mc.mp.co_j.y + 32 > boss_y + 4)
					if(mc.mp.co_j.muki == 0)
					{
						if(mc.mp.co_j.x - 32 - 12 <= boss_x + boss_width && mc.mp.co_j.x + 8 >= boss_x)
							flag = true;
					} else
					if(mc.mp.co_j.x + 32 + 32 + 12 >= boss_x && mc.mp.co_j.x + 24 <= boss_x + boss_width)
						flag = true;
				if(flag)
				{
					mc.mp.gs.rsAddSound(9);
					var k = mc.tdb.getValueInt("j_tail_ap_boss");
					if(k < 0)
						k = 0;
					boss_hp = boss_hp - k;
					if(boss_hp <= 0)
					{
						boss_hp = 0;
						boss_jyoutai = 50;
						boss_bc = 20;
					}
				}
			}
		}
		var obj = null;
		if(i >= sl_x)
		{
			if(!boss_kyo_f)
			{
				if(boss_jyoutai >= 100)
				{
					if(boss_vx <= 0)
					{
						if(boss_ac <= 2 || boss_anime_type == 2)
							g.drawImage(boss_left1_img, boss_x - i, boss_y - j, Applet1);
						else
						if(boss_left2_img != null)
							g.drawImage(boss_left2_img, boss_x - i, boss_y - j, Applet1);
					} else
					if(boss_ac <= 2 || boss_anime_type == 2)
						g.drawImage(boss_right1_img, boss_x - i, boss_y - j, Applet1);
					else
					if(boss_right2_img != null)
						g.drawImage(boss_right2_img, boss_x - i, boss_y - j, Applet1);
				} else
				if(boss_jyoutai >= 50 && boss_jyoutai <= 80)
					if(boss_vx <= 0)
						g.drawImage(boss_tubure_left_img, boss_x - i, boss_y - j, Applet1);
					else
					if(boss_tubure_right_img != null)
						g.drawImage(boss_tubure_right_img, boss_x - i, boss_y - j, Applet1);
			} else
			{
				var graphics2d = mc.gg.os_img.getGraphics();
				graphics2d.translate((boss_x - i) + (boss_width >> 1), (boss_y - j) + (boss_height >> 1));
				var f = (boss_kyo_width / boss_width);
				var f1 = (boss_kyo_height / boss_height);
				graphics2d.scale(f, f1);
				if(boss_jyoutai >= 100)
				{
					if(boss_vx <= 0)
					{
						if(boss_ac <= 2 || boss_anime_type == 2)
							graphics2d.drawImage(boss_left1_img, -(boss_width >> 1), -(boss_height >> 1), Applet1);
						else
						if(boss_left2_img != null)
							graphics2d.drawImage(boss_left2_img, -(boss_width >> 1), -(boss_height >> 1), Applet1);
					} else
					if(boss_ac <= 2 || boss_anime_type == 2)
						graphics2d.drawImage(boss_right1_img, -(boss_width >> 1), -(boss_height >> 1), Applet1);
					else
					if(boss_right2_img != null)
						graphics2d.drawImage(boss_right2_img, -(boss_width >> 1), -(boss_height >> 1), Applet1);
				} else
				if(boss_jyoutai >= 50 && boss_jyoutai <= 80)
					if(boss_vx <= 0)
						graphics2d.drawImage(boss_tubure_left_img, -(boss_width >> 1), -(boss_height >> 1), Applet1);
					else
					if(boss_tubure_right_img != null)
						graphics2d.drawImage(boss_tubure_right_img, -(boss_width >> 1), -(boss_height >> 1), Applet1);
				graphics2d.dispose();
			}
			boss_ac++;
			if(boss_ac > 5)
				boss_ac = 0;
		}
		if(i >= sl_x && boss_jyoutai >= 50)
			Applet1.showGauge(Math.floor((boss_hp * 200) / boss_hp_max), boss_name + " " + boss_hp + " / " + boss_hp_max);
	}

	function shagekiBoss()
	{
		var flag = false;
		var flag1 = false;
		if(boss_shageki_c == 2)
			flag1 = true;
		if(boss_shageki_c > 0)
		{
			boss_shageki_c--;
			if(boss_shageki_c <= 0)
				boss_shageki_c2 = 0;
		}
		var j14 = boss_waza[boss_waza_genzai];
		var k14 = boss_waza_wait[boss_waza_genzai];
		if(boss_shageki_c <= 0)
		{
			boss_shageki_c2++;
			if(j14 <= 1)
			{
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 2)
			{
				mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 100);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 3)
			{
				if(boss_shageki_c2 == 1 || boss_shageki_c2 == 7 || boss_shageki_c2 == 13)
					mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 100);
				if(boss_shageki_c2 == 1)
					mc.mp.gs.rsAddSound(10);
				if(boss_shageki_c2 >= 13)
				{
					boss_shageki_c = k14;
					flag = true;
				}
			} else
			if(j14 == 4)
			{
				if(boss_vx <= 0)
					mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 200);
				else
					mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 205);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 5)
			{
				if(boss_shageki_c2 == 1 || boss_shageki_c2 == 9 || boss_shageki_c2 == 17)
					if(boss_vx <= 0)
						mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 200);
					else
						mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 205);
				if(boss_shageki_c2 == 1)
					mc.mp.gs.rsAddSound(11);
				if(boss_shageki_c2 >= 17)
				{
					boss_shageki_c = k14;
					flag = true;
				}
			} else
			if(j14 == 6)
			{
				if(boss_vx <= 0)
					mc.mp.mSet(boss_x + 32, boss_y + ((boss_height - 32) >> 1), 300);
				else
					mc.mp.mSet((boss_x + boss_width) - 32, boss_y + ((boss_height - 32) >> 1), 305);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 7)
			{
				if(boss_vx <= 0)
				{
					mc.mp.mSet(boss_x + 32, (boss_y + ((boss_height - 32) >> 1)) - 16, 300);
					mc.mp.mSet(boss_x + 32, boss_y + ((boss_height - 32) >> 1) + 16, 300);
				} else
				{
					mc.mp.mSet((boss_x + boss_width) - 32, (boss_y + ((boss_height - 32) >> 1)) - 16, 305);
					mc.mp.mSet((boss_x + boss_width) - 32, boss_y + ((boss_height - 32) >> 1) + 16, 305);
				}
				mc.mp.gs.rsAddSound(14);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 8)
			{
				if(boss_vx <= 0)
					mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 400);
				else
					mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 405);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 9)
			{
				if(boss_vx == 0)
					mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), (boss_y + boss_height) - 16, 606);
				else
				if(boss_vx < 0)
					mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), (boss_y + boss_height) - 16, 600);
				else
					mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), (boss_y + boss_height) - 16, 605);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 10)
			{
				if(boss_shageki_c2 == 1)
				{
					if(boss_vx <= 0)
					{
						var d = 3.3144445419311523;
						var j1 = Math.floor(Math.cos(d) * 12);
						var l7 = Math.floor(Math.sin(d) * 12) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, j1, l7);
						d = 2.9655554294586182;
						j1 = Math.floor(Math.cos(d) * 12);
						l7 = Math.floor(Math.sin(d) * 12) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, j1, l7);
						d = 3.6633334159851074;
						j1 = Math.floor(Math.cos(d) * 12);
						l7 = Math.floor(Math.sin(d) * 12) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, j1, l7);
						d = 2.6166667938232422;
						j1 = Math.floor(Math.cos(d) * 12);
						l7 = Math.floor(Math.sin(d) * 12) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, j1, l7);
					} else
					{
						var d1 = 3.3144445419311523;
						var k1 = Math.floor(Math.cos(d1) * 12) * -1;
						var i8 = Math.floor(Math.sin(d1) * 12) * -1;
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 710, k1, i8);
						d1 = 2.9655554294586182;
						k1 = Math.floor(Math.cos(d1) * 12) * -1;
						i8 = Math.floor(Math.sin(d1) * 12) * -1;
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 710, k1, i8);
						d1 = 3.6633334159851074;
						k1 = Math.floor(Math.cos(d1) * 12) * -1;
						i8 = Math.floor(Math.sin(d1) * 12) * -1;
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 710, k1, i8);
						d1 = 2.6166667938232422;
						k1 = Math.floor(Math.cos(d1) * 12) * -1;
						i8 = Math.floor(Math.sin(d1) * 12) * -1;
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 710, k1, i8);
					}
				} else
				if(boss_shageki_c2 == 11)
					if(boss_vx <= 0)
					{
						var d2 = 3.1400001049041748;
						var l1 = Math.floor(Math.cos(d2) * 12);
						var j8 = Math.floor(Math.sin(d2) * 12) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l1, j8);
						d2 = 2.7038888931274414;
						l1 = Math.floor(Math.cos(d2) * 12);
						j8 = Math.floor(Math.sin(d2) * 12) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l1, j8);
						d2 = 3.5761110782623291;
						l1 = Math.floor(Math.cos(d2) * 12);
						j8 = Math.floor(Math.sin(d2) * 12) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l1, j8);
					} else
					{
						var d3 = 3.1400001049041748;
						var i2 = Math.floor(Math.cos(d3) * 12) * -1;
						var k8 = Math.floor(Math.sin(d3) * 12) * -1;
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 710, i2, k8);
						d3 = 2.7038888931274414;
						i2 = Math.floor(Math.cos(d3) * 12) * -1;
						k8 = Math.floor(Math.sin(d3) * 12) * -1;
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 710, i2, k8);
						d3 = 3.5761110782623291;
						i2 = Math.floor(Math.cos(d3) * 12) * -1;
						k8 = Math.floor(Math.sin(d3) * 12) * -1;
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 710, i2, k8);
					}
				if(boss_shageki_c2 == 1)
					mc.mp.gs.rsAddSound(18);
				if(boss_shageki_c2 >= 11)
				{
					boss_shageki_c = k14;
					flag = true;
				}
			} else
			if(j14 == 11)
			{
				if(boss_shageki_c2 == 1)
				{
					for(var i = 0; i <= 330; i += 30)
					{
						var d4 = (i * 3.14) / 180;
						var j2 = Math.floor(Math.cos(d4) * 12);
						var l8 = Math.floor(Math.sin(d4) * 12) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, j2, l8);
					}

				} else
				if(boss_shageki_c2 == 11)
				{
					for(var j = 15; j <= 345; j += 30)
					{
						var d5 = (j * 3.14) / 180;
						var k2 = Math.floor(Math.cos(d5) * 12);
						var i9 = Math.floor(Math.sin(d5) * 12) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, k2, i9);
					}

				}
				if(boss_shageki_c2 == 1)
					mc.mp.gs.rsAddSound(18);
				if(boss_shageki_c2 >= 11)
				{
					boss_shageki_c = k14;
					flag = true;
				}
			} else
			if(j14 == 12)
			{
				if(boss_vx <= 0)
					mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 150, -4);
				else
					mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 150, 4);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 13)
			{
				if(boss_vx <= 0)
					mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 150, 2);
				else
					mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 150, -2);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 14)
			{
				if(boss_vx <= 0)
					mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 450, -6);
				else
					mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 450, 6);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 15)
			{
				if(boss_vx <= 0)
					mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 450, 2);
				else
					mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 450, -2);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 16)
			{
				if(boss_vx <= 0)
					mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 650, -5);
				else
					mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 650, 5);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 17)
			{
				if(boss_vx <= 0)
					mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 650, 2);
				else
					mc.mp.tSetBoss(boss_x + ((boss_width - 32) >> 1), boss_y, 650, -2);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 18)
			{
				for(var k = 10; k <= 310; k += 60)
				{
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 901, k, 0);
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 911, k, 0);
				}

				mc.mp.gs.rsAddSound(18);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 19)
			{
				if(boss_shageki_c2 == 1)
				{
					if(boss_vx <= 0)
					{
						var d6 = 3.1400001049041748;
						var l2 = Math.floor(Math.cos(d6) * 8);
						var j9 = Math.floor(Math.sin(d6) * 8) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l2, j9);
						d6 = 2.6166667938232422;
						l2 = Math.floor(Math.cos(d6) * 8);
						j9 = Math.floor(Math.sin(d6) * 8) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l2, j9);
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l2, j9 * -1);
					} else
					{
						var d7 = 3.1400001049041748;
						var i3 = Math.floor(Math.cos(d7) * 8) * -1;
						var k9 = Math.floor(Math.sin(d7) * 8) * -1;
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 710, i3, k9);
						d7 = 2.6166667938232422;
						i3 = Math.floor(Math.cos(d7) * 8) * -1;
						k9 = Math.floor(Math.sin(d7) * 8) * -1;
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 710, i3, k9);
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 710, i3, k9 * -1);
					}
				} else
				if(boss_shageki_c2 == 20)
					if(boss_vx <= 0)
					{
						var d8 = 2.7911112308502197;
						var j3 = Math.floor(Math.cos(d8) * 8);
						var l9 = Math.floor(Math.sin(d8) * 8) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, j3, l9);
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, j3, l9 * -1);
					} else
					{
						var d9 = 2.7911112308502197;
						var k3 = Math.floor(Math.cos(d9) * 8) * -1;
						var i10 = Math.floor(Math.sin(d9) * 8) * -1;
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 710, k3, i10);
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 710, k3, i10 * -1);
					}
				if(boss_shageki_c2 == 1)
					mc.mp.gs.rsAddSound(18);
				if(boss_shageki_c2 >= 20)
				{
					boss_shageki_c = k14;
					flag = true;
				}
			} else
			if(j14 == 20)
			{
				if(boss_shageki_c2 == 1)
				{
					var d10 = 1.5700000524520874;
					var l3 = Math.floor(Math.cos(d10) * 8);
					var j10 = Math.floor(Math.sin(d10) * 8) * -1;
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, l3, j10);
					d10 = 1.0466667413711548;
					l3 = Math.floor(Math.cos(d10) * 8);
					j10 = Math.floor(Math.sin(d10) * 8) * -1;
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, l3, j10);
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, l3 * -1, j10);
				} else
				if(boss_shageki_c2 == 20)
				{
					var d11 = 1.2211111783981323;
					var i4 = Math.floor(Math.cos(d11) * 8);
					var k10 = Math.floor(Math.sin(d11) * 8) * -1;
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, i4, k10);
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, i4 * -1, k10);
				}
				if(boss_shageki_c2 == 1)
					mc.mp.gs.rsAddSound(18);
				if(boss_shageki_c2 >= 20)
				{
					boss_shageki_c = k14;
					flag = true;
				}
			} else
			if(j14 == 21)
			{
				if(boss_shageki_c2 == 1)
				{
					var d12 = 1.5700000524520874;
					var j4 = Math.floor(Math.cos(d12) * 8);
					var l10 = Math.floor(Math.sin(d12) * 8);
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), (boss_y + boss_height) - 48, 710, j4, l10);
					d12 = 1.0466667413711548;
					j4 = Math.floor(Math.cos(d12) * 8);
					l10 = Math.floor(Math.sin(d12) * 8);
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), (boss_y + boss_height) - 48, 710, j4, l10);
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), (boss_y + boss_height) - 48, 710, j4 * -1, l10);
				} else
				if(boss_shageki_c2 == 20)
				{
					var d13 = 1.2211111783981323;
					var k4 = Math.floor(Math.cos(d13) * 8);
					var i11 = Math.floor(Math.sin(d13) * 8);
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), (boss_y + boss_height) - 48, 710, k4, i11);
					mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), (boss_y + boss_height) - 48, 710, k4 * -1, i11);
				}
				if(boss_shageki_c2 == 1)
					mc.mp.gs.rsAddSound(18);
				if(boss_shageki_c2 >= 20)
				{
					boss_shageki_c = k14;
					flag = true;
				}
			} else
			if(j14 == 22)
			{
				if(boss_shageki_c2 == 1)
				{
					if(boss_vx <= 0)
					{
						var d14 = 3.1400001049041748;
						var l4 = Math.floor(Math.cos(d14) * 10);
						var j11 = Math.floor(Math.sin(d14) * 10);
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, l4, j11);
						d14 = 3.8377780914306641;
						l4 = Math.floor(Math.cos(d14) * 10);
						j11 = Math.floor(Math.sin(d14) * 10);
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, l4, j11);
						d14 = 4.5355558395385742;
						l4 = Math.floor(Math.cos(d14) * 10);
						j11 = Math.floor(Math.sin(d14) * 10);
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, l4, j11);
					} else
					{
						var d15 = 3.1400001049041748;
						var i5 = Math.floor(Math.cos(d15) * 10) * -1;
						var k11 = Math.floor(Math.sin(d15) * 10);
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 731, i5, k11);
						d15 = 3.8377780914306641;
						i5 = Math.floor(Math.cos(d15) * 10) * -1;
						k11 = Math.floor(Math.sin(d15) * 10);
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 731, i5, k11);
						d15 = 4.5355558395385742;
						i5 = Math.floor(Math.cos(d15) * 10) * -1;
						k11 = Math.floor(Math.sin(d15) * 10);
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 731, i5, k11);
					}
				} else
				if(boss_shageki_c2 == 18)
					if(boss_vx <= 0)
					{
						var d16 = 3.4888889789581299;
						var j5 = Math.floor(Math.cos(d16) * 10);
						var l11 = Math.floor(Math.sin(d16) * 10);
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, j5, l11);
						d16 = 4.1866669654846191;
						j5 = Math.floor(Math.cos(d16) * 10);
						l11 = Math.floor(Math.sin(d16) * 10);
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, j5, l11);
					} else
					{
						var d17 = 3.4888889789581299;
						var k5 = Math.floor(Math.cos(d17) * 10) * -1;
						var i12 = Math.floor(Math.sin(d17) * 10);
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 731, k5, i12);
						d17 = 4.1866669654846191;
						k5 = Math.floor(Math.cos(d17) * 10) * -1;
						i12 = Math.floor(Math.sin(d17) * 10);
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 731, k5, i12);
					}
				if(boss_shageki_c2 == 1)
					mc.mp.gs.rsAddSound(11);
				if(boss_shageki_c2 >= 18)
				{
					boss_shageki_c = k14;
					flag = true;
				}
			} else
			if(j14 == 23)
			{
				if(boss_shageki_c2 == 1)
				{
					if(boss_vx <= 0)
					{
						var d18 = 3.1400001049041748;
						var l5 = Math.floor(Math.cos(d18) * 10);
						var j12 = Math.floor(Math.sin(d18) * 10) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, l5, j12);
						d18 = 3.8377780914306641;
						l5 = Math.floor(Math.cos(d18) * 10);
						j12 = Math.floor(Math.sin(d18) * 10) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, l5, j12);
						d18 = 4.5355558395385742;
						l5 = Math.floor(Math.cos(d18) * 10);
						j12 = Math.floor(Math.sin(d18) * 10) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, l5, j12);
					} else
					{
						var d19 = 3.1400001049041748;
						var i6 = Math.floor(Math.cos(d19) * 10) * -1;
						var k12 = Math.floor(Math.sin(d19) * 10) * -1;
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 731, i6, k12);
						d19 = 3.8377780914306641;
						i6 = Math.floor(Math.cos(d19) * 10) * -1;
						k12 = Math.floor(Math.sin(d19) * 10) * -1;
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 731, i6, k12);
						d19 = 4.5355558395385742;
						i6 = Math.floor(Math.cos(d19) * 10) * -1;
						k12 = Math.floor(Math.sin(d19) * 10) * -1;
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 731, i6, k12);
					}
				} else
				if(boss_shageki_c2 == 18)
					if(boss_vx <= 0)
					{
						var d20 = 3.4888889789581299;
						var j6 = Math.floor(Math.cos(d20) * 10);
						var l12 = Math.floor(Math.sin(d20) * 10) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, j6, l12);
						d20 = 4.1866669654846191;
						j6 = Math.floor(Math.cos(d20) * 10);
						l12 = Math.floor(Math.sin(d20) * 10) * -1;
						mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, j6, l12);
					} else
					{
						var d21 = 3.4888889789581299;
						var k6 = Math.floor(Math.cos(d21) * 10) * -1;
						var i13 = Math.floor(Math.sin(d21) * 10) * -1;
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 731, k6, i13);
						d21 = 4.1866669654846191;
						k6 = Math.floor(Math.cos(d21) * 10) * -1;
						i13 = Math.floor(Math.sin(d21) * 10) * -1;
						mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 731, k6, i13);
					}
				if(boss_shageki_c2 == 1)
					mc.mp.gs.rsAddSound(11);
				if(boss_shageki_c2 >= 18)
				{
					boss_shageki_c = k14;
					flag = true;
				}
			} else
			if(j14 == 24)
			{
				mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 90);
				mc.mp.gs.rsAddSound(18);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 25)
			{
				if(boss_vx <= 0)
					mc.mp.mSet2(boss_x + 16, boss_y + 16, 800, -5, -32);
				else
					mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + 16, 800, 5, -32);
				mc.mp.gs.rsAddSound(22);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 26)
			{
				if(boss_vx <= 0)
					mc.mp.mSet2(boss_x + 16, boss_y + 16, 800, -10, -32);
				else
					mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + 16, 800, 10, -32);
				mc.mp.gs.rsAddSound(22);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 27)
			{
				if(boss_vx <= 0)
					mc.mp.mSet2(boss_x + 16, boss_y + 16, 800, -15, -32);
				else
					mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + 16, 800, 15, -32);
				mc.mp.gs.rsAddSound(22);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 28)
			{
				if(boss_vx <= 0)
					mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 810, -12, 0);
				else
					mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 810, 12, 0);
				mc.mp.gs.rsAddSound(22);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 29)
			{
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 77, -1, 0);
				mc.mp.gs.rsAddSound(14);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 30)
			{
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 75, -1, 0);
				mc.mp.gs.rsAddSound(11);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 31)
			{
				if(boss_vx <= 0)
				{
					for(var l = 0; l <= 270; l += 90)
						mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 970, l, 0);

				} else
				{
					for(var i1 = 0; i1 <= 270; i1 += 90)
						mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 980, i1, 0);

				}
				mc.mp.gs.rsAddSound(18);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 32)
			{
				if(boss_shageki_c2 == 1 || boss_shageki_c2 == 9 || boss_shageki_c2 == 17)
					mc.mp.mSet(boss_x + 16, boss_y + 16, 200);
				if(boss_shageki_c2 == 1)
					mc.mp.gs.rsAddSound(11);
				if(boss_shageki_c2 >= 17)
				{
					boss_shageki_c = k14;
					flag = true;
				}
			} else
			if(j14 == 33)
			{
				if(boss_shageki_c2 == 1 || boss_shageki_c2 == 9 || boss_shageki_c2 == 17)
					mc.mp.mSet((boss_x + boss_width) - 48, boss_y + 16, 205);
				if(boss_shageki_c2 == 1)
					mc.mp.gs.rsAddSound(11);
				if(boss_shageki_c2 >= 17)
				{
					boss_shageki_c = k14;
					flag = true;
				}
			} else
			if(j14 == 34)
			{
				if(boss_vx <= 0)
					mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, -8, 0);
				else
					mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 731, 8, 0);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 35)
			{
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 731, -8, 0);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 36)
			{
				mc.mp.mSet2((boss_x + boss_width) - 48, boss_y + ((boss_height - 32) >> 1), 731, 8, 0);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 37)
			{
				var d22 = 3.4016668796539307;
				var l6 = Math.floor(Math.cos(d22) * 8);
				var j13 = Math.floor(Math.sin(d22) * 8) * -1;
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l6, j13);
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l6, j13 * -1);
				d22 = 3.9249999523162842;
				l6 = Math.floor(Math.cos(d22) * 8);
				j13 = Math.floor(Math.sin(d22) * 8) * -1;
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l6, j13);
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, l6, j13 * -1);
				mc.mp.gs.rsAddSound(18);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 38)
			{
				var d23 = 3.4016668796539307;
				var i7 = Math.floor(Math.cos(d23) * 8) * -1;
				var k13 = Math.floor(Math.sin(d23) * 8) * -1;
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, i7, k13);
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, i7, k13 * -1);
				d23 = 3.9249999523162842;
				i7 = Math.floor(Math.cos(d23) * 8) * -1;
				k13 = Math.floor(Math.sin(d23) * 8) * -1;
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, i7, k13);
				mc.mp.mSet2(boss_x + 16, boss_y + ((boss_height - 32) >> 1), 710, i7, k13 * -1);
				mc.mp.gs.rsAddSound(18);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 39)
			{
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, 0, -8);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 40)
			{
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), (boss_y + boss_height) - 48, 710, 0, 8);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 41)
			{
				var d24 = 4.9716668128967285;
				var j7 = Math.floor(Math.cos(d24) * 8) * -1;
				var l13 = Math.floor(Math.sin(d24) * 8);
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, j7, l13);
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, j7 * -1, l13);
				d24 = 5.4950003623962402;
				j7 = Math.floor(Math.cos(d24) * 8) * -1;
				l13 = Math.floor(Math.sin(d24) * 8);
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, j7, l13);
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), boss_y + 16, 710, j7 * -1, l13);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 42)
			{
				var d25 = 4.9716668128967285;
				var k7 = Math.floor(Math.cos(d25) * 8) * -1;
				var i14 = Math.floor(Math.sin(d25) * 8) * -1;
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), (boss_y + boss_height) - 48, 710, k7, i14);
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), (boss_y + boss_height) - 48, 710, k7 * -1, i14);
				d25 = 5.4950003623962402;
				k7 = Math.floor(Math.cos(d25) * 8) * -1;
				i14 = Math.floor(Math.sin(d25) * 8) * -1;
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), (boss_y + boss_height) - 48, 710, k7, i14);
				mc.mp.mSet2(boss_x + ((boss_width - 32) >> 1), (boss_y + boss_height) - 48, 710, k7 * -1, i14);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 43)
			{
				if(boss_vx <= 0)
				{
					mc.mp.mSet2(boss_x + 16, boss_y, 731, -8, 0);
					mc.mp.mSet2(boss_x + 16, (boss_y + boss_height) - 32, 731, -8, 0);
				} else
				{
					mc.mp.mSet2((boss_x + boss_width) - 48, boss_y, 731, 8, 0);
					mc.mp.mSet2((boss_x + boss_width) - 48, (boss_y + boss_height) - 32, 731, 8, 0);
				}
				mc.mp.gs.rsAddSound(11);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 44)
			{
				if(boss_vx <= 0)
					mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 95);
				else
					mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 96);
				mc.mp.gs.rsAddSound(18);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 45)
			{
				mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 95);
				mc.mp.gs.rsAddSound(18);
				boss_shageki_c = k14;
				flag = true;
			} else
			if(j14 == 46)
			{
				mc.mp.mSet(boss_x + ((boss_width - 32) >> 1), boss_y + ((boss_height - 32) >> 1), 96);
				mc.mp.gs.rsAddSound(18);
				boss_shageki_c = k14;
				flag = true;
			}
		}
		if(boss_waza_select == 2)
		{
			if(flag)
			{
				boss_waza_genzai++;
				if(boss_waza_genzai > 1)
					boss_waza_genzai = 0;
			}
		} else
		if(boss_waza_select == 3)
		{
			if(flag)
			{
				boss_waza_genzai++;
				if(boss_waza_genzai > 2)
					boss_waza_genzai = 0;
			}
		} else
		if(boss_waza_select == 4)
		{
			if(flag || flag1)
				if(boss_hp <= (boss_hp_max >> 1))
					boss_waza_genzai = 1;
				else
					boss_waza_genzai = 0;
		} else
		if(boss_waza_select == 5)
		{
			if(flag || flag1)
				if(boss_hp <= Math.floor(boss_hp_max / 3))
					boss_waza_genzai = 2;
				else
				if(boss_hp <= Math.floor((boss_hp_max * 2) / 3))
					boss_waza_genzai = 1;
				else
					boss_waza_genzai = 0;
		} else
		if(boss_waza_select == 6)
		{
			if(flag)
				if(boss_waza_select_option >= 1)
				{
					boss_waza_genzai = 0;
					boss_waza_select_option--;
					if(boss_waza_select_option <= 0)
					{
						boss_waza_select_option = 0;
						boss_waza_genzai = 1;
					}
				} else
				{
					boss_waza_genzai = 1;
				}
		} else
		if(boss_waza_select == 7)
		{
			if(flag)
				if(boss_waza_select_option >= 1)
				{
					boss_waza_genzai = 0;
					boss_waza_select_option--;
					if(boss_waza_select_option <= 0)
					{
						boss_waza_select_option = 0;
						boss_waza_genzai = 1;
					}
				} else
				if(boss_waza_genzai == 1)
					boss_waza_genzai = 2;
				else
					boss_waza_genzai = 1;
		} else
		if(boss_waza_select == 8)
		{
			if(flag || flag1)
				if(boss_vx <= 0)
					boss_waza_genzai = 0;
				else
					boss_waza_genzai = 1;
		} else
		if(boss_waza_select == 9)
		{
			if(flag || flag1)
				if(boss_ugoki == 16 || boss_ugoki == 17)
				{
					if(!boss_hmove_f)
						boss_waza_genzai = 0;
					else
					if((boss_y + (boss_height >> 1)) - mc.mp.maps.wy < 160)
						boss_waza_genzai = 1;
					else
						boss_waza_genzai = 2;
				} else
				if(boss_ugoki == 6 || boss_ugoki == 7)
				{
					if(!boss_hmove_f)
						boss_waza_genzai = 0;
					else
					if(boss_y < boss_y_shoki)
						boss_waza_genzai = 1;
					else
						boss_waza_genzai = 2;
				} else
				if((boss_y + (boss_height >> 1)) - mc.mp.maps.wy < 96)
					boss_waza_genzai = 1;
				else
				if((boss_y + (boss_height >> 1)) - mc.mp.maps.wy >= 224)
					boss_waza_genzai = 2;
				else
					boss_waza_genzai = 0;
		} else
		if(boss_waza_select == 10)
		{
			if(flag || flag1)
				if(boss_ugoki == 16 || boss_ugoki == 17)
				{
					if(boss_hmove_f)
						boss_waza_genzai = 0;
					else
					if((boss_x + (boss_width >> 1)) - mc.mp.maps.wx > 256)
						boss_waza_genzai = 1;
					else
						boss_waza_genzai = 2;
				} else
				if(boss_ugoki == 6 || boss_ugoki == 7)
				{
					if(boss_hmove_f)
						boss_waza_genzai = 0;
					else
					if(boss_x > boss_x_shoki - 256)
						boss_waza_genzai = 1;
					else
						boss_waza_genzai = 2;
				} else
				if((boss_x + (boss_width >> 1)) - mc.mp.maps.wx < 128)
					boss_waza_genzai = 2;
				else
				if((boss_x + (boss_width >> 1)) - mc.mp.maps.wx >= 384)
					boss_waza_genzai = 1;
				else
					boss_waza_genzai = 0;
		} else
		{
			boss_waza_genzai = 0;
		}
	}

	function initXImage()
	{
		for(var i = 0; i <= 3; i++)
			ximage_c[i] = 0;

		var j = getParamInt("ximage1_view_x");
		if(j > 0)
		{
			ximage_view_x[0] = (j + 1) * 32;
			ximage_x[0] = getParamInt("ximage1_x");
			ximage_y[0] = getParamInt("ximage1_y");
			ximage_c[0] = 100;
			ximage_img[0] = Applet1.getImage(getParameter("filename_ximage1"));
		}
		j = getParamInt("ximage2_view_x");
		if(j > 0)
		{
			ximage_view_x[1] = (j + 1) * 32;
			ximage_x[1] = getParamInt("ximage2_x");
			ximage_y[1] = getParamInt("ximage2_y");
			ximage_c[1] = 100;
			ximage_img[1] = Applet1.getImage(getParameter("filename_ximage2"));
		}
		j = getParamInt("ximage3_view_x");
		if(j > 0)
		{
			ximage_view_x[2] = (j + 1) * 32;
			ximage_x[2] = getParamInt("ximage3_x");
			ximage_y[2] = getParamInt("ximage3_y");
			ximage_c[2] = 100;
			ximage_img[2] = Applet1.getImage(getParameter("filename_ximage3"));
		}
		j = getParamInt("ximage4_view_x");
		if(j > 0)
		{
			ximage_view_x[3] = (j + 1) * 32;
			ximage_x[3] = getParamInt("ximage4_x");
			ximage_y[3] = getParamInt("ximage4_y");
			ximage_c[3] = 100;
			ximage_img[3] = Applet1.getImage(getParameter("filename_ximage4"));
		}
	}

	function moveXImage(g, i)
	{
		for(var j = 0; j <= 3; j++)
		{
			if(ximage_c[j] <= 0)
				continue;
			if(ximage_c[j] >= 100 && i >= ximage_view_x[j])
				ximage_c[j]--;
			if(ximage_c[j] < 100)
			{
				g.drawImage(ximage_img[j], ximage_x[j], ximage_y[j], Applet1);
				ximage_c[j]--;
			}
		}

	}

	function loadXBackImage()
	{
		for(var i = 0; i < 8; i++)
			x_backimage_view_x[i] = 0;

		for(var j = 0; j < 8; j++)
		{
			var s = (j + 1) + "";
			var k = getParamInt("x_backimage" + s + "_view_x");
			if(k > 0)
			{
				x_backimage_view_x[j] = (k + 1) * 32;
				x_backimage_img[j] = newImageOnLoadClassic(getParameter("x_backimage" + s + "_filename"));
			}
		}

	}

	function initXBackImage()
	{
		for(var i = 0; i < 8; i++)
		{
			x_backimage_vf[i] = false;
			if(x_backimage_view_x[i] <= 0)
				x_backimage_vf[i] = true;
		}

	}

	function moveXBackImage()
	{
		if(mc.mp.gg.layer_mode != 2 && mc.mp.mcs_haikei_visible != 1)
			return;
		for(var i = 0; i < 8; i++)
			if(!x_backimage_vf[i] && x_backimage_img[i] != null && x_backimage_view_x[i] > 0 && mc.mp.ml_mode == 100 && mc.mp.maps.wx >= x_backimage_view_x[i])
			{
				mc.mp.setbacki_f = true;
				mc.mp.setbacki_img = x_backimage_img[i];
				x_backimage_vf[i] = true;
			}

	}

	function newImageOnLoadClassic(s)
	{
		var image = Applet1.getImage(s);
		return image;
	}

	function getParameter(s)
	{
		return mc.getParameter(s);
	}
}
