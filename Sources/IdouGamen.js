
function IdouGamen(paramGameGraphics, paramGameKey, paramKeyboardMenu, paramMainProgram)
{
	this.gg = paramGameGraphics;
	this.gk = paramGameKey;
	this.km = paramKeyboardMenu;
	this.mp = paramMainProgram;
	this.tdb = this.mp.tdb;
	this.co_j = new CharacterObject();
	this.map_string = new Array(9);
	this.map_bg = createNDimensionArray(15, 9);
	this.stage_c = new Array(10);
	this.stage_x = new Array(10);
	this.stage_y = new Array(10)
	this.stage_cf = new Array(10);
	this.stage_kcID = undefined;
	this.door_koID = undefined;
	this.dokan_khID = undefined;
	this.door_score_open = undefined;
	this.ie_c = new Array(16);
	this.ie_x = new Array(16);
	this.ie_y = new Array(16);
	this.zure_x = 16;
	this.zure_y = 24;
	this.mp_mode = 0;
	this.shop_kattaitem = undefined;
	this.cc_hankei = undefined;
	this.cc_kakudo = undefined;
	this.cc_p1_x = new Array(17);
	this.cc_p1_y = new Array(17);
	this.cc_p2_x = new Array(17);
	this.cc_p2_y = new Array(17);

	this.cc_p1_x[13] = -200;
	this.cc_p1_y[13] = 160;
	this.cc_p1_x[14] = -200;
	this.cc_p1_y[14] = 520;
	this.cc_p1_x[15] = 712;
	this.cc_p1_y[15] = 520;
	this.cc_p1_x[16] = 712;
	this.cc_p1_y[16] = 160;
	this.cc_p2_x[13] = 712;
	this.cc_p2_y[13] = 160;
	this.cc_p2_x[14] = 712;
	this.cc_p2_y[14] = -200;
	this.cc_p2_x[15] = -200;
	this.cc_p2_y[15] = -200;
	this.cc_p2_x[16] = -200;
	this.cc_p2_y[16] = 160;
}

IdouGamen.prototype.worldInit = function()
{
	var i;
	for (i = 0; i <= 9; i++)
	{
		this.stage_c[i] = 0;
		this.stage_cf[i] = false;
	}
	this.stage_kcID = 0;
	this.door_koID = 0;
	this.dokan_khID = 0;
	this.door_score_open = 0;
	for (i = 0; i <= 15; i++) {
		this.ie_c[i] = 0;
	}
	this.co_j.x = 0;
	this.co_j.y = 0;
	this.co_j.vx = 0;
	this.co_j.vy = 0;
	this.co_j.muki = 1;
	this.co_j.ac = 0;
	this.mp.tr1_c = 2;


	this.shop_kattaitem = -1;


	this.mp_mode = 0;


	this.km.initAll();
	this.km.mode = 100;
	var k;
	for (k = 0; k <= 8; k++)
	{
		var str = this.tdb.getValue("chizu-" + k);
		str = str + "...............";
		this.map_string[k] = str;
	}
	for (k = 0; k <= 8; k++) {
		for (var j = 0; j <= 14; j++)
		{
			var m = this.map_string[k].charAt(j);
			if (m == ("A"))
			{
				this.co_j.x = (j << 5);
				this.co_j.y = (k << 5);
				this.map_bg[j][k] = 220;
			}
			else if (m == ("B"))
			{
				this.map_bg[j][k] = 216;
				this.ie_c[3] = 100;
				this.ie_x[3] = (j << 5);
				this.ie_y[3] = (k << 5);
			}
			else if (m == ("C"))
			{
				this.map_bg[j][k] = 217;
				this.ie_c[4] = 100;
				this.ie_x[4] = (j << 5);
				this.ie_y[4] = (k << 5);
			}
			else if (m == ("D"))
			{
				this.map_bg[j][k] = 218;
				this.ie_c[10] = 100;
				this.ie_x[10] = (j << 5);
				this.ie_y[10] = (k << 5);
			}
			else if (m == ("E"))
			{
				this.map_bg[j][k] = 219;
				this.ie_c[11] = 100;
				this.ie_x[11] = (j << 5);
				this.ie_y[11] = (k << 5);
			}
			else if (m == ("a"))
			{
				if (this.stage_c[0] == 0)
				{
					this.map_bg[j][k] = 223;
					this.stage_c[0] = 100;
					this.stage_x[0] = (j << 5);
					this.stage_y[0] = (k << 5);
				}
				else
				{
					this.map_bg[j][k] = 220;
				}
			}
			else if (m == ("b"))
			{
				if (this.stage_c[1] == 0)
				{
					this.map_bg[j][k] = 224;
					this.stage_c[1] = 100;
					this.stage_x[1] = (j << 5);
					this.stage_y[1] = (k << 5);
				}
				else
				{
					this.map_bg[j][k] = 220;
				}
			}
			else if (m == ("c"))
			{
				if (this.stage_c[2] == 0)
				{
					this.map_bg[j][k] = 225;
					this.stage_c[2] = 100;
					this.stage_x[2] = (j << 5);
					this.stage_y[2] = (k << 5);
				}
				else
				{
					this.map_bg[j][k] = 220;
				}
			}
			else if (m == ("d"))
			{
				if (this.stage_c[3] == 0)
				{
					this.map_bg[j][k] = 226;
					this.stage_c[3] = 100;
					this.stage_x[3] = (j << 5);
					this.stage_y[3] = (k << 5);
				}
				else
				{
					this.map_bg[j][k] = 220;
				}
			}
			else if (m == ("e"))
			{
				this.map_bg[j][k] = 213;
				this.ie_c[0] = 100;
				this.ie_x[0] = (j << 5);
				this.ie_y[0] = (k << 5);
			}
			else if (m == ("f"))
			{
				this.map_bg[j][k] = 214;
				this.ie_c[1] = 100;
				this.ie_x[1] = (j << 5);
				this.ie_y[1] = (k << 5);
			}
			else if (m == ("g"))
			{
				this.map_bg[j][k] = 215;
				this.ie_c[2] = 100;
				this.ie_x[2] = (j << 5);
				this.ie_y[2] = (k << 5);
			}
			else if (m == ("h"))
			{
				this.map_bg[j][k] = 212;
				this.ie_c[9] = 100;
				this.ie_x[9] = (j << 5);
				this.ie_y[9] = (k << 5);
			}
			else if (m == ("i"))
			{
				this.map_bg[j][k] = 206;
				this.ie_c[5] = 100;
				this.ie_x[5] = (j << 5);
				this.ie_y[5] = (k << 5);
			}
			else if (m == ("j"))
			{
				this.map_bg[j][k] = 207;
				this.ie_c[6] = 100;
				this.ie_x[6] = (j << 5);
				this.ie_y[6] = (k << 5);
			}
			else if (m == ("k"))
			{
				this.map_bg[j][k] = 208;
				this.ie_c[7] = 100;
				this.ie_x[7] = (j << 5);
				this.ie_y[7] = (k << 5);
			}
			else if (m == ("l"))
			{
				this.map_bg[j][k] = 209;
				this.ie_c[8] = 100;
				this.ie_x[8] = (j << 5);
				this.ie_y[8] = (k << 5);
			}
			else if (m == ("1"))
			{
				this.map_bg[j][k] = 220;
			}
			else if (m == ("2"))
			{
				this.map_bg[j][k] = 221;
			}
			else if (m == ("3"))
			{
				this.map_bg[j][k] = 222;
			}
			else
			{
				this.map_bg[j][k] = 0;
			}
		}
	}
	if (this.co_j.x + 16 > 256) {
		this.co_j.muki = 0;
	}
	this.drawOs2();
}

IdouGamen.prototype.worldInit2 = function()
{
	this.co_j.vx = 0;
	this.co_j.vy = 0;
	this.co_j.muki = 1;
	this.co_j.ac = 0;
	this.mp.tr1_c = 2;

	this.mp_mode = 200;
	this.cc_hankei = 12;
	this.stage_kcID = 0;
	this.door_koID = 0;


	this.shop_kattaitem = -1;


	this.door_score_open = 0;
	if ((this.ie_c[9] == 100) && (this.mp.score >= this.mp.door_score))
	{
		this.ie_c[9] = 50;

		this.door_score_open = 1;
	}
	this.km.initAll();
	this.km.mode = 100;


	this.drawOs2();
}

IdouGamen.prototype.worldInit3 = function()
{
	this.stage_kcID = this.checkStage();
	this.stage_cf[(this.stage_kcID - 1)] = true;
	this.stage_c[(this.stage_kcID - 1)] = 50;


	var i = 0;
	for (var j = 0; j <= 2; j++) {
		if (this.stage_cf[j] == 1) {
			i++;
		}
	}
	this.door_koID = 0;
	if ((i >= 1) && 
		(this.ie_c[(i - 1)] == 100))
	{
		this.ie_c[(i - 1)] = 50;

		this.door_koID = i;
	}
	this.door_score_open = 0;
	if ((this.ie_c[9] == 100) && (this.mp.score >= this.mp.door_score))
	{
		this.ie_c[9] = 50;

		this.door_score_open = 1;
	}
	this.co_j.vx = 0;
	this.co_j.vy = 0;
	this.co_j.muki = 1;
	this.co_j.ac = 0;
	this.mp.tr1_c = 2;
	this.co_j.pt = 0;


	this.shop_kattaitem = -1;

	this.mp_mode = 200;
	this.cc_hankei = 12;


	this.km.initAll();
	this.km.mode = 100;


	this.drawOs2();
}

IdouGamen.prototype.drawOs2 = function()
{
	this.gg.setBackcolor(new Color(0, 127, 0));


	this.gg.fill2();


	this.gg.os2_g.drawImage(this.gg.li[3], 0, 0, this.gg.ap);
	var i, j, k;
	for (k = 0; k <= 8; k++) {
		for (j = 0; j <= 14; j++)
		{
			i = this.map_bg[j][k];
			if (i == 221)
			{
				this.gg.drawPT2((j << 5) + 16, (k << 5) + 24 - 16, 221);
				this.gg.drawPT2((j << 5) + 16, (k << 5) + 24 + 16, 221);
			}
			else if (i == 222)
			{
				this.gg.drawPT2((j << 5) + 16 - 16, (k << 5) + 24, 222);
				this.gg.drawPT2((j << 5) + 16 + 16, (k << 5) + 24, 222);
			}
		}
	}
	for (k = 0; k <= 8; k++) {
		for (j = 0; j <= 14; j++)
		{
			i = this.map_bg[j][k];
			if ((i != 61) && (i != 62) && (i != 256)) {
				if ((i >= 216) && (i <= 219))
				{
					this.gg.drawPT2((j << 5) + 16, (k << 5) + 24 - 7, i);
				}
				else if ((i >= 206) && (i <= 209))
				{
					this.gg.drawPT2((j << 5) + 16, (k << 5) + 24 - 7, i);
				}
				else if ((i >= 212) && (i <= 215))
				{
					this.gg.drawPT2((j << 5) + 16 - 16, (k << 5) + 24, 222);
					this.gg.drawPT2((j << 5) + 16 + 16, (k << 5) + 24, 222);

					this.gg.drawPT2((j << 5) + 16, (k << 5) + 24 - 7, i);
				}
				else
				{
					this.gg.drawPT2((j << 5) + 16, (k << 5) + 24, i);
				}
			}
		}
	}
}

IdouGamen.prototype.drawMap = function()
{
	this.gg.os_g.drawImage(this.gg.os2_img, 0, 0, this.gg.ap);
}

IdouGamen.prototype.getBGZ = function(paramInt1, paramInt2)
{
	if ((paramInt1 < 0) || (paramInt1 > 479) || (paramInt2 < 0) || (paramInt2 > 287)) {
		return 0;
	}
	var i = paramInt1 >> 5;
	var j = paramInt2 >> 5;
	return this.map_bg[i][j];
}

IdouGamen.prototype.checkStage = function()
{
	var j = -1;
	for (var i = 0; i <= 9; i++) {
		if ((this.stage_c[i] == 100) && (this.co_j.x == this.stage_x[i]) && (this.co_j.y == this.stage_y[i]))
		{
			j = i + 1;
			break;
		}
	}
	return j;
}

IdouGamen.prototype.mainProgram = function()
{
	if (this.gk.tr1_f == true)
	{
		if (this.mp.tr1_c < 2) {
			this.mp.tr1_c += 1;
		}
	}
	else {
		this.mp.tr1_c = 0;
	}
	if (this.mp_mode == 0)
	{
		if (this.km.mode == 100) {
			this.jMove();
		} else if (this.km.mode == 200)
		{
			if (this.km.cancel_c == 1)
			{
				this.km.off(3);
				this.km.off(4);
				this.km.mode = 100;
			}
			else if (this.km.kettei_c == 1)
			{
				this.km.init1(3);
				this.km.setMessage(3, this.mp.mes1_name);
				this.mp.addSerifu(3, 2, 3);
				this.km.activeSerifu(3, 120, 150, 272, Color.cyan);

				this.km.mode = 210;
			}
		}
		else if (this.km.mode == 210)
		{
			if ((this.km.cancel_c == 1) || (this.km.kettei_c == 1))
			{
				this.km.off(3);
				this.km.off(4);
				this.km.mode = 100;
			}
		}
		else if (this.km.mode == 300)
		{
			if (this.km.cancel_c == 1)
			{
				this.km.off(3);
				this.km.off(4);
				this.km.mode = 100;
			}
			else if (this.km.kettei_c == 1)
			{
				this.km.init1(3);
				this.km.setMessage(3, this.mp.mes2_name);
				this.mp.addSerifu(3, 4, 3);
				this.km.activeSerifu(3, 120, 150, 272, Color.cyan);

				this.km.mode = 210;
			}
		}
		else if (this.km.mode == 400)
		{
			if (this.km.cancel_c == 1)
			{
				this.km.off(3);
				this.km.off(4);
				this.km.mode = 100;
			}
			else if (this.km.kettei_c == 1)
			{
				this.km.off(3);


				this.km.list_kazu = 0;
				this.km.init1(6);

				this.km.setMessage(6, this.tdb.getValue("shop_serifu1"));
				for (var i = 0; i <= 8; i++) {
					if (this.mp.shop_item_teika[i] > 0)
					{
						this.km.addItem2(6, this.mp.shop_item_name[i], this.mp.shop_item_teika[i]);


						this.km.list_IDlist[this.km.list_kazu] = i;


						this.km.list_kazu += 1;
					}
				}
				if (this.km.list_kazu >= 1)
				{
					this.km.activeKaimono(6, 296, 76, 184);

					this.km.mode = 410;
				}
				else
				{
					this.km.init1(6);


					this.km.init1(3);
					this.km.setMessage(3, "Error");
					this.km.addItem(3, "Please set any item on shop menu.");
					this.km.activeSerifu(3, 120, 150, 216, Color.red);

					this.km.mode = 210;
				}
			}
		}
		else if (this.km.mode == 410)
		{
			if (this.km.cancel_c == 1)
			{
				this.km.off(4);
				this.km.off(6);
				this.km.mode = 100;
			}
			else if (this.km.kettei_c == 1)
			{
				this.km.list_s = this.km.list_IDlist[this.km.selectedIndex[6]];


				this.km.init1(7);

				this.km.setMessage(7, this.mp.shop_item_name[this.km.list_s] + this.tdb.getValue("shop_serifu2"));


				this.km.addItem(7, this.tdb.getValue("shop_serifu3"));
				this.km.addItem(7, this.tdb.getValue("shop_serifu4"));

				this.km.activeSerifutuki(7, 48, 150, 236, this.mp.shop_name);

				this.km.mode = 420;
			}
		}
		else if (this.km.mode == 420)
		{
			if (this.km.cancel_c == 1)
			{
				this.km.offActivewindow(7, 6);

				this.km.mode = 410;
			}
			else if (this.km.kettei_c == 1)
			{
				if (this.km.selectedIndex[7] == 0)
				{
					if (this.mp.score >= this.mp.shop_item_teika[this.km.list_s])
					{
						this.km.init1(3);
						this.km.addItem(3, this.mp.shop_item_name[this.km.list_s] + this.tdb.getValue("shop_serifu5"));

						this.km.activeIchigyou(3, 48, 240, 236);

						this.mp.score -= this.mp.shop_item_teika[this.km.list_s];
						this.shop_kattaitem = this.km.list_s;
						if (this.shop_kattaitem == 7) {
							this.mp.j_left += 1;
						}
						this.km.mode = 430;
					}
					else
					{
						this.km.init1(3);
						this.km.addItem(3, this.tdb.getValue("shop_serifu6"));
						this.km.activeIchigyou(3, 48, 240, 236);

						this.km.mode = 430;
					}
				}
				else
				{
					this.km.off(4);
					this.km.off(6);
					this.km.off(7);

					this.km.mode = 100;
				}
			}
		}
		else if (this.km.mode == 430)
		{
			if ((this.km.cancel_c == 1) || (this.km.kettei_c == 1))
			{
				this.km.off(3);
				this.km.off(4);
				this.km.off(6);
				this.km.off(7);

				this.km.mode = 100;
			}
		}
		else if (this.km.mode == 500)
		{
			if (this.km.cancel_c == 1)
			{
				this.km.off(4);
				this.km.off(3);
				this.km.mode = 100;
			}
			else if (this.km.kettei_c == 1)
			{
				this.km.off(3);


				this.km.init1(2);
				this.km.setMessage(2, this.tdb.getValue("setumei_menu1"));
				this.km.addItem(2, this.tdb.getValue("setumei_menu2"));
				this.km.addItem(2, this.tdb.getValue("setumei_menu3"));
				this.km.addItem(2, this.tdb.getValue("setumei_menu4"));
				this.km.activeSerifutuki(2, 120, 150, 224, this.mp.setumei_name);

				this.km.mode = 510;
			}
		}
		else if (this.km.mode == 510)
		{
			if (this.km.cancel_c == 1)
			{
				this.km.off(2);
				this.km.off(4);
				this.km.mode = 100;
			}
			else if (this.km.kettei_c == 1)
			{
				this.km.init1(3);
				this.km.setMessage(3, this.mp.setumei_name);
				if (this.km.selectedIndex[2] == 1) {
					this.mp.addSerifu(3, 11, 3);
				} else if (this.km.selectedIndex[2] == 2) {
					this.mp.addSerifu(3, 12, 3);
				} else {
					this.mp.addSerifu(3, 10, 3);
				}
				this.km.activeSerifu(3, 200, 191, 272, Color.cyan);

				this.km.mode = 520;
			}
		}
		else if (this.km.mode == 520) {
			if (this.km.cancel_c == 1)
			{
				this.km.offActivewindow(3, 2);
				this.km.mode = 510;
			}
			else if (this.km.kettei_c == 1)
			{
				this.km.off(2);
				this.km.off(3);
				this.km.off(4);
				this.km.mode = 100;
			}
		}
		this.km.move();
	}
	if (this.co_j.pt == 1000) {
		this.gg.drawPT(this.co_j.x + 16, this.co_j.y + 24 - 12 - 6, 100, this.co_j.muki);
	} else if (this.co_j.pt == 1010) {
		this.gg.drawPT(this.co_j.x + 16, this.co_j.y + 24 - 12 + 5, 100, this.co_j.muki);
	} else if ((this.co_j.pt >= 202) && (this.co_j.pt <= 205)) {
		this.gg.drawPT(this.co_j.x + 16, this.co_j.y + 24 - 12, this.co_j.pt, 0);
	} else {
		this.gg.drawPT(this.co_j.x + 16, this.co_j.y + 24 - 12, this.co_j.pt, this.co_j.muki);
	}
	this.km.drawMenus();
	if (this.mp_mode == 100)
	{
		this.circleCLS(this.cc_hankei);

		this.cc_hankei -= 12;
		if (this.cc_hankei < 0)
		{
			this.cc_hankei = 0;

			this.mp_mode = 110;
		}
	}
	else if (this.mp_mode == 110)
	{
		this.circleCLS(this.cc_hankei);
	}
	else
	{
		var j;
		if (this.mp_mode == 200)
		{
			this.circleCLS(this.cc_hankei);

			this.cc_hankei += 12;
			if (this.cc_hankei > 312) {
				if (this.stage_kcID >= 1)
				{
					this.mp_mode = 300;
					this.cc_hankei = 0;


					j = (this.stage_y[(this.stage_kcID - 1)] >> 5);
					this.map_bg[(this.stage_x[(this.stage_kcID - 1)] >> 5)][j] = 227;
					if (this.door_koID >= 1) {
						this.map_bg[(this.ie_x[(this.door_koID - 1)] >> 5)][(this.ie_y[(this.door_koID - 1)] >> 5)] = 222;
					}
					if (this.door_score_open == 1) {
						this.map_bg[(this.ie_x[9] >> 5)][(this.ie_y[9] >> 5)] = 222;
					}
					this.drawOs2();
				}
				else
				{
					this.mp_mode = 0;
					if (this.door_score_open == 1)
					{
						this.mp_mode = 400;
						this.cc_hankei = 0;


						this.map_bg[(this.ie_x[9] >> 5)][(this.ie_y[9] >> 5)] = 222;


						this.drawOs2();
					}
				}
			}
		}
		else if (this.mp_mode == 300)
		{
			this.cc_hankei += 1;
			if (this.cc_hankei <= 3)
			{
				j = 0;
			}
			else if (this.cc_hankei <= 6)
			{
				j = 1;
			}
			else if (this.cc_hankei <= 9)
			{
				j = 0;
			}
			else if (this.cc_hankei <= 12)
			{
				j = 1;
			}
			else if (this.cc_hankei <= 15)
			{
				j = 0;
			}
			else if (this.cc_hankei <= 18)
			{
				j = 1;
			}
			else if (this.cc_hankei <= 21)
			{
				j = 0;
			}
			else if (this.cc_hankei <= 24)
			{
				j = 1;
			}
			else if (this.cc_hankei <= 26)
			{
				j = 0;
			}
			else
			{
				j = 0;

				this.mp_mode = 0;
			}
			if (j > 0) {
				this.gg.drawPT(this.stage_x[(this.stage_kcID - 1)] + 16, this.stage_y[(this.stage_kcID - 1)] + 24, 222 + this.stage_kcID, 0);
			}
			if ((j > 0) && 
				(this.door_koID >= 1)) {
				this.gg.drawPT(this.ie_x[(this.door_koID - 1)] + 16, this.ie_y[(this.door_koID - 1)] + 24 - 7, 212 + this.door_koID, 0);
			}
			if ((j > 0) && 
				(this.door_score_open == 1)) {
				this.gg.drawPT(this.ie_x[9] + 16, this.ie_y[9] + 24 - 7, 212, 0);
			}
		}
		else if (this.mp_mode == 400)
		{
			this.cc_hankei += 1;
			if (this.cc_hankei <= 3)
			{
				j = 0;
			}
			else if (this.cc_hankei <= 6)
			{
				j = 1;
			}
			else if (this.cc_hankei <= 9)
			{
				j = 0;
			}
			else if (this.cc_hankei <= 12)
			{
				j = 1;
			}
			else if (this.cc_hankei <= 15)
			{
				j = 0;
			}
			else if (this.cc_hankei <= 18)
			{
				j = 1;
			}
			else if (this.cc_hankei <= 21)
			{
				j = 0;
			}
			else if (this.cc_hankei <= 24)
			{
				j = 1;
			}
			else if (this.cc_hankei <= 26)
			{
				j = 0;
			}
			else
			{
				j = 0;

				this.mp_mode = 0;
			}
			if (j > 0) {
				this.gg.drawPT(this.ie_x[9] + 16, this.ie_y[9] + 24 - 7, 212, 0);
			}
		}
	}
}

IdouGamen.prototype.jMove = function()
{
	var m = this.co_j.x;
	var n = this.co_j.y;


	this.co_j.pt = 100;
	var i;
	if ((this.co_j.vx == 0) && (this.co_j.vy == 0))
	{
		this.co_j.ac += 1;
		if (this.co_j.ac > 7) {
			this.co_j.ac = 0;
		}
		if (this.co_j.ac > 3)
		{
			this.co_j.pt = 1000;

			i = this.getBGZ(m, n);
			if (((i >= 216) && (i <= 219)) || ((i >= 206) && (i <= 209))) {
				this.co_j.pt = 1010;
			}
		}
		if (this.mp.tr1_c == 1)
		{
			if (this.checkStage() >= 1)
			{
				this.mp_mode = 100;
				this.cc_hankei = 312;
				this.co_j.ac = 0;
				this.dokan_khID = 0;


				this.co_j.pt = 100;


				this.mp.gs.play(25);
			}
			else if ((this.getBGZ(m, n) >= 206) && (this.getBGZ(m, n) <= 209))
			{
				if (this.mp.dokan_mode == 2)
				{
					var k = 0;
					for (var i2 = 0; i2 <= 8; i2++)
					{
						for (var i1 = 0; i1 <= 14; i1++) {
							if (((i1 << 5) != m) || ((i2 << 5) != n))
							{
								var j = this.map_bg[i1][i2];
								if (j == this.getBGZ(m, n))
								{
									m = i1 << 5;
									n = i2 << 5;
									this.co_j.ac = 0;
									this.co_j.pt = 1010;
									k = 1;
									break;
								}
							}
						}
						if (k == 1) {
							break;
						}
					}
				}
				else
				{
					this.mp_mode = 100;
					this.cc_hankei = 312;
					this.co_j.ac = 0;
					this.dokan_khID = (this.getBGZ(m, n) - 205);
					this.co_j.pt = 1010;
					this.mp.gs.play(25);
				}
			}
			else if (this.getBGZ(m, n) == 216)
			{
				this.km.init1(4);
				this.km.onKao(4, 120, 42, 272, 230);


				this.km.init1(3);
				this.km.setMessage(3, this.mp.mes1_name);
				this.mp.addSerifu(3, 1, 3);
				this.km.activeSerifu(3, 120, 150, 272, Color.cyan);

				this.km.mode = 200;


				this.co_j.pt = 1010;
				this.co_j.ac = 0;
			}
			else if (this.getBGZ(m, n) == 217)
			{
				this.km.init1(4);
				this.km.onKao(4, 120, 42, 272, 232);


				this.km.init1(3);
				this.km.setMessage(3, this.mp.mes2_name);
				this.mp.addSerifu(3, 3, 3);
				this.km.activeSerifu(3, 120, 150, 272, Color.cyan);

				this.km.mode = 300;


				this.co_j.pt = 1010;
				this.co_j.ac = 0;
			}
			else if (this.getBGZ(m, n) == 218)
			{
				this.km.init1(4);

				this.km.onKao(4, 120, 42, 216, 234);
				if (this.shop_kattaitem < 0)
				{
					this.km.init1(3);
					this.km.setMessage(3, this.mp.shop_name);
					this.mp.addSerifu(3, 5, 3);

					this.km.activeSerifu(3, 120, 150, 216, Color.cyan);

					this.km.mode = 400;
				}
				else
				{
					this.km.init1(3);
					this.km.setMessage(3, this.mp.shop_name);
					this.mp.addSerifu(3, 8, 3);

					this.km.activeSerifu(3, 120, 150, 216, Color.cyan);

					this.km.mode = 210;
				}
				this.co_j.pt = 1010;
				this.co_j.ac = 0;
			}
			else if (this.getBGZ(m, n) == 219)
			{
				this.km.init1(4);

				this.km.onKao(4, 120, 42, 272, 236);


				this.km.init1(3);
				this.km.setMessage(3, this.mp.setumei_name);
				this.mp.addSerifu(3, 9, 3);
				this.km.activeSerifu(3, 120, 150, 272, Color.cyan);

				this.km.mode = 500;


				this.co_j.pt = 1010;
				this.co_j.ac = 0;
			}
		}
		else if (this.gk.up_f == true)
		{
			if (this.getBGZ(m, n - 32) == 221)
			{
				this.co_j.vy = -4;
				this.co_j.ac = -1;
			}
		}
		else if (this.gk.down_f == true)
		{
			if (this.getBGZ(m, n + 32) == 221)
			{
				this.co_j.vy = 4;
				this.co_j.ac = -1;
			}
		}
		else if (this.gk.left_f == true)
		{
			this.co_j.muki = 0;
			if (this.getBGZ(m - 32, n) == 222)
			{
				this.co_j.vx = -4;
				this.co_j.ac = -1;
			}
			if ((this.getBGZ(m + 32, n) >= 212) && (this.getBGZ(m + 32, n) <= 215))
			{
				this.co_j.vx = -4;
				this.co_j.ac = -1;
			}
		}
		else if (this.gk.right_f == true)
		{
			this.co_j.muki = 1;
			if (this.getBGZ(m + 32, n) == 222)
			{
				this.co_j.vx = 4;
				this.co_j.ac = -1;
			}
			if ((this.getBGZ(m - 32, n) >= 212) && (this.getBGZ(m - 32, n) <= 215))
			{
				this.co_j.vx = 4;
				this.co_j.ac = -1;
			}
		}
	}
	if ((this.co_j.vx != 0) || (this.co_j.vy != 0))
	{
		this.co_j.ac += 1;
		if (this.co_j.ac > 3) {
			this.co_j.ac = 0;
		}
		m += this.co_j.vx;
		n += this.co_j.vy;
		if (this.co_j.vx != 0)
		{
			if (this.co_j.ac <= 1) {
				this.co_j.pt = 103;
			} else {
				this.co_j.pt = 104;
			}
		}
		else if (this.co_j.vy >= 0)
		{
			if (this.co_j.ac <= 1) {
				this.co_j.pt = 202;
			} else {
				this.co_j.pt = 203;
			}
		}
		else if (this.co_j.ac <= 1) {
			this.co_j.pt = 204;
		} else {
			this.co_j.pt = 205;
		}
		if ((m % 32 == 0) && (n % 32 == 0))
		{
			i = this.getBGZ(m, n);
			if ((i == 220) || ((i >= 223) && (i <= 227)) || ((i >= 216) && (i <= 219)) || ((i >= 206) && (i <= 209)))
			{
				this.co_j.vx = 0;
				this.co_j.vy = 0;
				this.co_j.ac = 0;
			}
			i = 0;
			if (this.co_j.vx > 0) {
				i = this.getBGZ(m + 32, n);
			} else if (this.co_j.vx < 0) {
				i = this.getBGZ(m - 32, n);
			}
			if ((i >= 212) && (i <= 215))
			{
				this.co_j.vx = 0;
				this.co_j.vy = 0;
				this.co_j.pt = 100;
				this.co_j.ac = 0;
			}
		}
		if (m <= -32)
		{
			m = -32;

			this.co_j.vx = 0;
			this.co_j.vy = 0;
			this.co_j.ac = 0;
		}
		else if (m >= 480)
		{
			m = 480;

			this.co_j.vx = 0;
			this.co_j.vy = 0;
			this.co_j.ac = 0;
		}
		if (n <= -32)
		{
			n = -32;

			this.co_j.vx = 0;
			this.co_j.vy = 0;
			this.co_j.ac = 0;
		}
		else if (n >= 288)
		{
			n = 288;

			this.co_j.vx = 0;
			this.co_j.vy = 0;
			this.co_j.ac = 0;
		}
	}
	this.co_j.x = m;
	this.co_j.y = n;
}

IdouGamen.prototype.circleCLS = function(paramInt)
{
	for (var i = 0; i <= 12; i++)
	{
		var d1 = Math.sin(i * 0.2617992);
		this.cc_p1_y[i] = (160 + Math.floor(d1 * paramInt));



		var d2 = Math.cos(i * 0.2617992);
		this.cc_p1_x[i] = (256 + Math.floor(d2 * paramInt));








		this.cc_p2_y[i] = (160 - Math.floor(d1 * paramInt));
		this.cc_p2_x[i] = (256 - Math.floor(d2 * paramInt));
	}
	this.gg.os_g.setColor(Color.black);
	this.gg.os_g.fillPolygon(this.cc_p1_x, this.cc_p1_y, 17);
	this.gg.os_g.fillPolygon(this.cc_p2_x, this.cc_p2_y, 17);
}

IdouGamen.prototype.squareCLS = function(paramInt1, paramInt2)
{
	var d = 0.0174532925199433;
	this.cc_p1_x[0] = (Math.floor(Math.cos((this.cc_kakudo + 0) * d) * paramInt1) + 256);
	this.cc_p1_y[0] = (Math.floor(Math.sin((this.cc_kakudo + 0) * d) * paramInt1) + 160);
	this.cc_p1_x[1] = (Math.floor(Math.cos((this.cc_kakudo + 90) * d) * paramInt1) + 256);
	this.cc_p1_y[1] = (Math.floor(Math.sin((this.cc_kakudo + 90) * d) * paramInt1) + 160);
	this.cc_p1_x[2] = (Math.floor(Math.cos((this.cc_kakudo + 180) * d) * paramInt1) + 256);
	this.cc_p1_y[2] = (Math.floor(Math.sin((this.cc_kakudo + 180) * d) * paramInt1) + 160);
	this.cc_p1_x[3] = (Math.floor(Math.cos((this.cc_kakudo + 180) * d) * 500.0) + 256);
	this.cc_p1_y[3] = (Math.floor(Math.sin((this.cc_kakudo + 180) * d) * 500.0) + 160);
	this.cc_p1_x[4] = (Math.floor(Math.cos((this.cc_kakudo + 135) * d) * 700.0) + 256);
	this.cc_p1_y[4] = (Math.floor(Math.sin((this.cc_kakudo + 135) * d) * 700.0) + 160);
	this.cc_p1_x[5] = (Math.floor(Math.cos((this.cc_kakudo + 45) * d) * 700.0) + 256);
	this.cc_p1_y[5] = (Math.floor(Math.sin((this.cc_kakudo + 45) * d) * 700.0) + 160);
	this.cc_p1_x[6] = (Math.floor(Math.cos((this.cc_kakudo + 0) * d) * 500.0) + 256);
	this.cc_p1_y[6] = (Math.floor(Math.sin((this.cc_kakudo + 0) * d) * 500.0) + 160);

	this.cc_p2_x[0] = (Math.floor(Math.cos((this.cc_kakudo + 180) * d) * paramInt1) + 256);
	this.cc_p2_y[0] = (Math.floor(Math.sin((this.cc_kakudo + 180) * d) * paramInt1) + 160);
	this.cc_p2_x[1] = (Math.floor(Math.cos((this.cc_kakudo + 270) * d) * paramInt1) + 256);
	this.cc_p2_y[1] = (Math.floor(Math.sin((this.cc_kakudo + 270) * d) * paramInt1) + 160);
	this.cc_p2_x[2] = (Math.floor(Math.cos((this.cc_kakudo + 360) * d) * paramInt1) + 256);
	this.cc_p2_y[2] = (Math.floor(Math.sin((this.cc_kakudo + 360) * d) * paramInt1) + 160);
	this.cc_p2_x[3] = (Math.floor(Math.cos((this.cc_kakudo + 360) * d) * 500.0) + 256);
	this.cc_p2_y[3] = (Math.floor(Math.sin((this.cc_kakudo + 360) * d) * 500.0) + 160);
	this.cc_p2_x[4] = (Math.floor(Math.cos((this.cc_kakudo + 315) * d) * 700.0) + 256);
	this.cc_p2_y[4] = (Math.floor(Math.sin((this.cc_kakudo + 315) * d) * 700.0) + 160);
	this.cc_p2_x[5] = (Math.floor(Math.cos((this.cc_kakudo + 225) * d) * 700.0) + 256);
	this.cc_p2_y[5] = (Math.floor(Math.sin((this.cc_kakudo + 225) * d) * 700.0) + 160);
	this.cc_p2_x[6] = (Math.floor(Math.cos((this.cc_kakudo + 180) * d) * 500.0) + 256);
	this.cc_p2_y[6] = (Math.floor(Math.sin((this.cc_kakudo + 180) * d) * 500.0) + 160);

	this.gg.os_g.setColor(Color.black);
	this.gg.os_g.fillPolygon(this.cc_p1_x, this.cc_p1_y, 7);
	this.gg.os_g.fillPolygon(this.cc_p2_x, this.cc_p2_y, 7);
}
