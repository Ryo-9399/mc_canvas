
function KeyboardMenu(paramGameGraphics, paramGameKey, paramString)
{
	this.gg = paramGameGraphics;
	this.gk = paramGameKey;
	this.name_crys = paramString;
	this.hi = this.gg.spt_img[0];
	this.hih = this.gg.spt_img;
	this.hg = this.gg.os_g;
	this.ap = this.gg.ap;
	this.c = new Array(16);
	this.x = new Array(16);
	this.y = new Array(16);
	this.width = new Array(16);
	this.selectedIndex = new Array(16);
	this.item_kazu = new Array(16);
	this.message = new Array(16);
	this.item = createNDimensionArray(16, 16);
	this.item_int = createNDimensionArray(16, 16);
	this.item_color = new Array(16);
	this.list_IDlist = new Array(16);
	this.list_kazu = undefined;
	this.list_s = undefined;
	this.aw = -1;
	this.mode = 0;
	this.kettei_c = 0;
	this.cancel_c = 0;
	this.c_fc = undefined;

	this.initAll();
}

KeyboardMenu.prototype.initAll = function()
{
	var i;
	for (i = 0; i <= 15; i++) {
		this.init1(i);
	}
	this.c_fc = 0;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = -1;
	this.kettei_c = 2;
	this.cancel_c = 2;
	for (i = 0; i <= 15; i++) {
		this.list_IDlist[i] = 0;
	}
	this.list_kazu = 0;
	this.list_s = 0;
}

KeyboardMenu.prototype.init1 = function(paramInt)
{
	this.c[paramInt] = 0;
	this.x[paramInt] = 0;
	this.y[paramInt] = 0;
	this.width[paramInt] = 180;
	this.selectedIndex[paramInt] = 0;
	this.item_kazu[paramInt] = 0;
	this.message[paramInt] = "どうしますか？";
	var i;
	for (i = 0; i <= 15; i++) {
		this.item[paramInt][i] = "";
	}
	for (i = 0; i <= 15; i++) {
		this.item_int[paramInt][i] = 0;
	}
}

KeyboardMenu.prototype.setMessage = function(paramInt, paramString)
{
	this.message[paramInt] = paramString;
}

KeyboardMenu.prototype.addItem = function(paramInt, paramString)
{
	this.item[paramInt][this.item_kazu[paramInt]] = paramString;
	this.item_kazu[paramInt] += 1;
}

KeyboardMenu.prototype.addIntitem = function(paramInt1, paramInt2)
{
	this.item_int[paramInt1][this.item_kazu[paramInt1]] = paramInt2;
	this.item_kazu[paramInt1] += 1;
}

KeyboardMenu.prototype.addItem2 = function(paramInt1, paramString, paramInt2)
{
	this.item[paramInt1][this.item_kazu[paramInt1]] = paramString;
	this.item_int[paramInt1][this.item_kazu[paramInt1]] = paramInt2;
	this.item_kazu[paramInt1] += 1;
}

KeyboardMenu.prototype.active = function(paramInt1, paramInt2, paramInt3)
{
	this.c[paramInt1] = 100;
	this.x[paramInt1] = paramInt2;
	this.y[paramInt1] = paramInt3;
	if (arguments.length == 3)
		this.width[paramInt1] = 180;
	else
		this.width[paramInt1] = arguments[3];
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = paramInt1;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.activeSerifutuki = function(paramInt1, paramInt2, paramInt3, paramInt4, paramString)
{
	this.c[paramInt1] = 700;
	this.x[paramInt1] = paramInt2;
	this.y[paramInt1] = paramInt3;
	this.width[paramInt1] = paramInt4;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = paramInt1;
	this.kettei_c = 2;
	this.cancel_c = 2;

	this.item[paramInt1][15] = paramString;
}

KeyboardMenu.prototype.activeKaimono = function(paramInt1, paramInt2, paramInt3, paramInt4)
{
	this.c[paramInt1] = 900;
	this.x[paramInt1] = paramInt2;
	this.y[paramInt1] = paramInt3;
	this.width[paramInt1] = paramInt4;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = paramInt1;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.activeIchigyou = function(paramInt1, paramInt2, paramInt3, paramInt4)
{
	this.c[paramInt1] = 300;
	this.x[paramInt1] = paramInt2;
	this.y[paramInt1] = paramInt3;
	this.width[paramInt1] = paramInt4;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = paramInt1;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.activeNigyou = function(paramInt1, paramInt2, paramInt3, paramInt4, paramColor)
{
	this.c[paramInt1] = 310;
	this.x[paramInt1] = paramInt2;
	this.y[paramInt1] = paramInt3;
	this.width[paramInt1] = paramInt4;
	this.item_color[paramInt1] = paramColor;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = paramInt1;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.activeYongyou = function(paramInt1, paramInt2, paramInt3, paramInt4)
{
	this.c[paramInt1] = 320;
	this.x[paramInt1] = paramInt2;
	this.y[paramInt1] = paramInt3;
	this.width[paramInt1] = paramInt4;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = paramInt1;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.activeYongyou2 = function(paramInt1, paramInt2, paramInt3, paramInt4)
{
	this.c[paramInt1] = 321;
	this.x[paramInt1] = paramInt2;
	this.y[paramInt1] = paramInt3;
	this.width[paramInt1] = paramInt4;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = paramInt1;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.activeSerifu = function(paramInt1, paramInt2, paramInt3, paramInt4, paramColor)
{
	this.c[paramInt1] = 330;
	this.x[paramInt1] = paramInt2;
	this.y[paramInt1] = paramInt3;
	this.width[paramInt1] = paramInt4;
	this.item_color[paramInt1] = paramColor;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = paramInt1;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.activeYasumu = function(paramInt1, paramInt2, paramInt3)
{
	this.c[paramInt1] = 1000;
	this.x[paramInt1] = paramInt2;
	this.y[paramInt1] = paramInt3;
	this.width[paramInt1] = 272;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = paramInt1;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.onKao = function(paramInt1, paramInt2, paramInt3, paramInt4, paramInt5)
{
	this.c[paramInt1] = 600;
	this.x[paramInt1] = paramInt2;
	this.y[paramInt1] = paramInt3;
	this.width[paramInt1] = paramInt4;
	this.item_int[paramInt1][0] = paramInt5;
}

KeyboardMenu.prototype.onMituketa = function(paramInt1, paramInt2, paramInt3)
{
	this.c[paramInt1] = 610;
	this.x[paramInt1] = paramInt2;
	this.y[paramInt1] = paramInt3;
	this.width[paramInt1] = 200;
}

KeyboardMenu.prototype.onOkozukai = function(paramInt1, paramInt2, paramInt3, paramInt4, paramInt5)
{
	this.c[paramInt1] = 800;
	this.x[paramInt1] = paramInt2;
	this.y[paramInt1] = paramInt3;
	this.width[paramInt1] = paramInt4;
	this.item_int[paramInt1][0] = paramInt5;
}

KeyboardMenu.prototype.activeIchigyouTime = function(paramInt1, paramInt2, paramInt3, paramInt4)
{
	this.c[paramInt1] = 350;
	this.x[paramInt1] = paramInt2;
	this.y[paramInt1] = paramInt3;
	this.width[paramInt1] = paramInt4;

	this.item_int[paramInt1][0] = 100;
}

KeyboardMenu.prototype.activeNigyouTime = function(paramInt1, paramInt2, paramInt3, paramInt4, paramColor)
{
	this.c[paramInt1] = 360;
	this.x[paramInt1] = paramInt2;
	this.y[paramInt1] = paramInt3;
	this.width[paramInt1] = paramInt4;
	this.item_color[paramInt1] = paramColor;

	this.item_int[paramInt1][0] = 100;
}

KeyboardMenu.prototype.activeJibun = function(paramInt1, paramInt2, paramInt3, paramInt4, paramInt5, paramInt6, paramInt7, paramInt8)
{
	this.c[paramInt1] = 400;
	this.x[paramInt1] = paramInt2;
	this.y[paramInt1] = paramInt3;
	this.item_int[14][0] = paramInt5;
	this.item_int[14][1] = paramInt6;
	this.item_int[14][2] = paramInt7;
	this.item_int[14][3] = paramInt8;

	this.width[paramInt1] = paramInt4;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = paramInt1;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.activeToujou = function(paramInt1, paramInt2, paramInt3, paramInt4, paramInt5, paramString)
{
	this.c[paramInt1] = 420;
	this.x[paramInt1] = paramInt2;
	this.y[paramInt1] = paramInt3;
	this.item_int[paramInt1][2] = paramInt5;
	this.item[paramInt1][0] = paramString;

	this.width[paramInt1] = paramInt4;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = paramInt1;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.initCS = function()
{
	this.item_kazu[0] = 8;
	this.selectedIndex[0] = 0;
}

KeyboardMenu.prototype.activeCS = function()
{
	this.c[0] = 500;
	this.x[0] = 0;
	this.y[0] = 0;
	this.width[0] = 0;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = 0;
	this.kettei_c = 2;
}

KeyboardMenu.prototype.off = function(paramInt)
{
	this.c[paramInt] = 0;
}

KeyboardMenu.prototype.offActivewindow = function(paramInt1, paramInt2)
{
	this.c[paramInt1] = 0;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = paramInt2;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.move = function()
{
	this.c_fc += 1;
	if (this.c_fc > 6) {
		this.c_fc = 0;
	}
	if (this.aw >= 0)
	{
		if (this.gk.up_f == true)
		{
			this.gk.up_c += 1;
			if (this.gk.up_c > 3) {
				this.gk.up_c = 1;
			}
		}
		else
		{
			this.gk.up_c = 0;
		}
		if (this.gk.down_f == true)
		{
			this.gk.down_c += 1;
			if (this.gk.down_c > 3) {
				this.gk.down_c = 1;
			}
		}
		else
		{
			this.gk.down_c = 0;
		}
		if (this.gk.up_c == 1)
		{
			this.selectedIndex[this.aw] -= 1;
			this.c_fc = -1;
			if (this.selectedIndex[this.aw] < 0) {
				this.selectedIndex[this.aw] = (this.item_kazu[this.aw] - 1);
			}
		}
		else if (this.gk.down_c == 1)
		{
			this.selectedIndex[this.aw] += 1;
			this.c_fc = -1;
			if (this.selectedIndex[this.aw] > this.item_kazu[this.aw] - 1) {
				this.selectedIndex[this.aw] = 0;
			}
		}
	}
	if (!this.gk.tr1_f) {
		this.kettei_c = 0;
	} else if (this.kettei_c == 0) {
		this.kettei_c = 1;
	}
	if (!this.gk.x_f) {
		this.cancel_c = 0;
	} else if (this.cancel_c == 0) {
		this.cancel_c = 1;
	}
}

KeyboardMenu.prototype.drawMenus = function()
{
	var beforeFont = this.hg._font;
	this.hg.setFont(new Font(Font.SANS_SERIF, 0, 12));
	for (var i = 0; i <= 15; i++)
	{
		var k = this.c[i];
		if (k != 0)
		{
			var j;
			switch (k)
			{
			case 100: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 30 + this.item_kazu[i] * 14);



				this.hg.setColor(Color.white);
				this.hg.drawString(this.message[i], this.x[i] + 24, this.y[i] + 6 + 12);
				if (this.item_kazu[i] >= 1) {
					for (j = 0; j <= this.item_kazu[i] - 1; j++) {
						this.hg.drawString(this.item[i][j], this.x[i] + 24, this.y[i] + 6 + 18 + j * 14 + 12);
					}
				}
				if (i == this.aw)
				{
					if (this.c_fc <= 3) {
						this.hg.drawImage(this.hi[200], this.x[i] + 6, this.y[i] + 24 + this.selectedIndex[i] * 14, this.ap);
					}
				}
				else {
					this.hg.drawImage(this.hi[200], this.x[i] + 6, this.y[i] + 24 + this.selectedIndex[i] * 14, this.ap);
				}
				break;
			case 200: 
				this.hg.setColor(Color.white);
				this.hg.fillRect(12, 12, 128, 58);
				this.hg.setColor(Color.black);
				this.hg.fillRect(14, 14, 124, 54);



				this.hg.setColor(Color.cyan);
				this.hg.drawString(this.item[14][0], 18, 30);
				if ((this.item_int[14][0] <= 0) || (this.item_int[14][2] <= 0))
				{
					this.hg.setColor(Color.red);
					this.hg.drawString("戦闘不能", 82, 30);
				}
				this.hg.setColor(Color.white);
				this.hg.drawString("HP	" + this.item_int[14][0] + " / " + this.item_int[14][1], 18, 48);

				this.hg.drawString("PP	" + this.item_int[14][2] + " / " + this.item_int[14][3], 18, 62);

				break;
			case 210: 
				this.hg.setColor(Color.white);
				this.hg.fillRect(160, 12, 128, 58);
				this.hg.setColor(Color.black);
				this.hg.fillRect(162, 14, 124, 54);



				this.hg.setColor(Color.green);
				this.hg.drawString(this.item[15][0], 166, 30);
				if (this.item_int[15][0] <= 0)
				{
					this.hg.setColor(Color.red);
					this.hg.drawString("戦闘不能", 230, 30);
				}
				this.hg.setColor(Color.white);
				this.hg.drawString("HP	" + this.item_int[15][0] + " / " + this.item_int[15][1], 166, 48);

				this.hg.drawString("PP	" + this.item_int[15][2] + " / " + this.item_int[15][3], 166, 62);

				break;
			case 220: 
				this.hg.setColor(Color.white);
				this.hg.fillRect(372, 12, 128, 58);
				this.hg.setColor(Color.black);
				this.hg.fillRect(374, 14, 124, 54);



				this.hg.setColor(Color.cyan);
				this.hg.drawString(this.item[15][0], 378, 30);
				if ((this.item_int[15][0] <= 0) || (this.item_int[15][2] <= 0))
				{
					this.hg.setColor(Color.red);
					this.hg.drawString("戦闘不能", 442, 30);
				}
				this.hg.setColor(Color.white);
				this.hg.drawString("HP	" + this.item_int[15][0] + " / " + this.item_int[15][1], 378, 48);

				this.hg.drawString("PP	" + this.item_int[15][2] + " / " + this.item_int[15][3], 378, 62);

				break;
			case 300: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 40);



				this.hg.setColor(Color.white);
				this.hg.drawString(this.item[i][0], this.x[i] + 6, this.y[i] + 6 + 12);
				if (this.c_fc <= 3) {
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 6 + 14 + 0 + 2, 201, 0);
				}
				break;
			case 310: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 58);



				this.hg.setColor(this.item_color[i]);
				this.hg.drawString(this.item[i][0], this.x[i] + 6, this.y[i] + 6 + 12);


				this.hg.setColor(Color.white);
				this.hg.drawString(this.item[i][1], this.x[i] + 6, this.y[i] + 6 + 18 + 12);
				if (this.c_fc <= 3) {
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 6 + 18 + 14 + 2, 71, 0);
				}
				break;
			case 320: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 66 + (this.item_kazu[i] - 3) * 14 + 14);



				this.hg.setColor(Color.magenta);
				this.hg.drawString(this.item[i][0], this.x[i] + 6, this.y[i] + 6 + 12);


				this.hg.setColor(Color.white);
				this.hg.drawString(this.item[i][1], this.x[i] + 6, this.y[i] + 6 + 18 + 12);


				this.hg.setColor(Color.cyan);
				this.hg.drawString(this.item[i][2], this.x[i] + 6, this.y[i] + 6 + 36 + 12);


				this.hg.setColor(Color.white);
				for (j = 0; j <= this.item_kazu[3] - 4; j++) {
					this.hg.drawString(this.item[3][(j + 3)], this.x[3] + 6, this.y[3] + 6 + 54 + j * 14 + 12);
				}
				if (this.c_fc <= 3) {
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 6 + 18 + 36 + (this.item_kazu[i] - 3) * 14 + 2, 71, 0);
				}
				break;
			case 321: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 108);



				this.hg.setColor(Color.cyan);
				this.hg.drawString(this.item[i][0], this.x[i] + 6, this.y[i] + 6 + 12);


				this.hg.setColor(Color.white);
				this.hg.drawString(this.item[i][1], this.x[i] + 6, this.y[i] + 6 + 18 + 12);


				this.hg.setColor(Color.magenta);
				this.hg.drawString(this.item[i][2], this.x[i] + 6, this.y[i] + 6 + 36 + 12);


				this.hg.setColor(Color.white);
				this.hg.drawString(this.item[i][3], this.x[i] + 6, this.y[i] + 6 + 54 + 12);


				this.hg.setColor(Color.white);
				this.hg.drawString(this.item[i][4], this.x[i] + 6, this.y[i] + 6 + 54 + 14 + 12);
				if (this.c_fc <= 3) {
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 6 + 18 + 36 + 14 + 14 + 2, 71, 0);
				}
				break;
			case 330: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 30 + (this.item_kazu[i] + 1) * 14);



				this.hg.setColor(this.item_color[i]);
				this.hg.drawString(this.message[i], this.x[i] + 6, this.y[i] + 6 + 12);


				this.hg.setColor(Color.white);
				if (this.item_kazu[i] >= 1) {
					for (j = 0; j <= this.item_kazu[i] - 1; j++) {
						this.hg.drawString(this.item[i][j], this.x[i] + 6, this.y[i] + 6 + 18 + j * 14 + 12);
					}
				}
				if (i == this.aw)
				{
					if (this.c_fc <= 3) {
						this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 6 + 18 + this.item_kazu[i] * 14 + 2, 201, 0);
					}
				}
				else {
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 6 + 18 + this.item_kazu[i] * 14 + 2, 201, 0);
				}
				break;
			case 350: 
				if (this.item_int[i][0] == 100)
				{
					this.item_int[i][0] = 55;
				}
				else
				{
					this.drawWindowbox(this.x[i], this.y[i], this.width[i], 26);



					this.hg.setColor(Color.white);
					this.hg.drawString(this.item[i][0], this.x[i] + 6, this.y[i] + 6 + 12);


					this.item_int[i][0] -= 1;
					if (this.item_int[i][0] <= 0) {
						this.off(i);
					}
				}
				break;
			case 360: 
				if (this.item_int[i][0] == 200)
				{
					this.drawWindowbox(this.x[i], this.y[i], this.width[i], 44);



					this.hg.setColor(this.item_color[i]);
					this.hg.drawString(this.item[i][0], this.x[i] + 6, this.y[i] + 6 + 12);


					this.hg.setColor(Color.white);
					this.hg.drawString(this.item[i][1], this.x[i] + 6, this.y[i] + 6 + 18 + 12);
				}
				else if (this.item_int[i][0] == 100)
				{
					this.item_int[i][0] = 55;
				}
				else
				{
					this.drawWindowbox(this.x[i], this.y[i], this.width[i], 44);



					this.hg.setColor(this.item_color[i]);
					this.hg.drawString(this.item[i][0], this.x[i] + 6, this.y[i] + 6 + 12);


					this.hg.setColor(Color.white);
					this.hg.drawString(this.item[i][1], this.x[i] + 6, this.y[i] + 6 + 18 + 12);


					this.item_int[i][0] -= 1;
					if (this.item_int[i][0] <= 0) {
						this.off(i);
					}
				}
				break;
			case 400: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 128);



				this.hg.setColor(Color.yellow);

				this.hg.drawString(this.name_crys + "のステータス", this.x[i] + 6, this.y[i] + 6 + 12);
				this.hg.setColor(Color.white);
				this.hg.drawString("HP	" + this.item_int[14][0] + " / " + this.item_int[14][1], this.x[i] + 6, this.y[i] + 6 + 18 + 0 + 12);
				this.hg.drawString("おこづかい	", this.x[i] + 6, this.y[i] + 6 + 18 + 28 + 12);
				this.hg.drawString("" + this.item_int[14][2] + "円", this.x[i] + 6 + 72, this.y[i] + 6 + 18 + 42 + 12);
				this.hg.drawString("得点", this.x[i] + 6, this.y[i] + 6 + 18 + 56 + 12);
				this.hg.drawString("" + this.item_int[14][3] + "点", this.x[i] + 6 + 72, this.y[i] + 6 + 18 + 70 + 12);
				if (this.c_fc <= 3) {
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 6 + 18 + 84 + 2, 71, 0);
				}
				break;
			case 420: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 116);
				this.hg.setColor(new Color(96, 96, 96));
				this.hg.fillRect(this.x[i] + 12, this.y[i] + 12, this.width[i] - 24, 48);
				this.gg.drawPT(this.x[i] + 12 + ((this.width[i] - 24 - 32) >> 1), this.y[i] + 12 + 8, this.item_int[i][2], 0);


				this.hg.setColor(Color.cyan);
				this.hg.drawString(this.item[i][0], this.x[i] + 12, this.y[i] + 64 + 12);
				this.hg.setColor(Color.white);
				this.hg.drawString("これからも、よろしくね！", this.x[i] + 12, this.y[i] + 68 + 14 + 12);
				if (this.c_fc <= 3) {
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 68 + 28 + 2, 71, 0);
				}
				break;
			case 410: 
				if (this.item_int[i][0] == -2)
				{
					this.drawWindowbox(this.x[i], this.y[i], this.width[i], 116);
					this.hg.setColor(new Color(96, 96, 96));
					this.hg.fillRect(this.x[i] + 12, this.y[i] + 12, this.width[i] - 24, 48);
					this.gg.drawPT(this.x[i] + 12 + ((this.width[i] - 24 - 32) >> 1), this.y[i] + 12 + 8, this.item_int[i][2], 0);


					this.hg.setColor(Color.yellow);
					this.hg.drawString(this.item[i][0], this.x[i] + 12, this.y[i] + 64 + 12);
					this.hg.setColor(Color.white);
					this.hg.drawString("捕獲不可能", this.x[i] + 12, this.y[i] + 68 + 14 + 12);
					if (this.c_fc <= 3) {
						this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 68 + 28 + 2, 71, 0);
					}
				}
				else if (this.item_int[i][0] < 0)
				{
					this.drawWindowbox(this.x[i], this.y[i], this.width[i], 116);
					this.hg.setColor(new Color(96, 96, 96));
					this.hg.fillRect(this.x[i] + 12, this.y[i] + 12, this.width[i] - 24, 48);
					this.gg.drawPT(this.x[i] + 12 + ((this.width[i] - 24 - 32) >> 1), this.y[i] + 12 + 8, this.item_int[i][2], 0);


					this.hg.setColor(Color.yellow);
					this.hg.drawString(this.item[i][0], this.x[i] + 12, this.y[i] + 64 + 12);
					this.hg.setColor(Color.white);
					this.hg.drawString("現在調査中", this.x[i] + 12, this.y[i] + 68 + 14 + 12);
					if (this.c_fc <= 3) {
						this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 68 + 28 + 2, 71, 0);
					}
				}
				else
				{
					this.drawWindowbox(this.x[i], this.y[i], this.width[i], 158);
					this.hg.setColor(new Color(96, 96, 96));
					this.hg.fillRect(this.x[i] + 12, this.y[i] + 12, this.width[i] - 24, 48);
					this.gg.drawPT(this.x[i] + 12 + ((this.width[i] - 24 - 32) >> 1), this.y[i] + 12 + 8, this.item_int[i][2], 0);


					this.hg.setColor(Color.yellow);
					this.hg.drawString(this.item[i][0], this.x[i] + 12, this.y[i] + 64 + 12);
					this.hg.setColor(Color.white);
					this.hg.drawString("最大HP", this.x[i] + 12, this.y[i] + 68 + 14 + 12);
					this.hg.drawString("" + this.item_int[i][0], this.x[i] + 56, this.y[i] + 68 + 28 + 12);
					this.hg.drawString("最大PP", this.x[i] + 12, this.y[i] + 68 + 42 + 12);
					this.hg.drawString("" + this.item_int[i][1], this.x[i] + 56, this.y[i] + 68 + 56 + 12);
					if (this.c_fc <= 3) {
						this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 68 + 70 + 2, 71, 0);
					}
				}
				break;
			case 500: 
				if ((this.c_fc <= 3) || (this.aw != 0)) {
					this.hg.drawImage(this.hi[72], 12 + 28 * this.selectedIndex[i], 288, this.ap);
				} else {
					this.hg.drawImage(this.hi[73], 12 + 28 * this.selectedIndex[i], 288, this.ap);
				}
				break;
			case 600: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 96);

				k = this.item_int[i][0];
				var m = this.x[i] + ((this.width[i] - 64) >> 1);
				var n = this.y[i] + 16;
				this.gg.drawPT(m, n, k, 0);
				this.gg.drawPT(m + 32, n, k + 1, 0);
				this.gg.drawPT(m, n + 32, k + 10, 0);
				this.gg.drawPT(m + 32, n + 32, k + 11, 0);

				break;
			case 610: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 30 + this.item_kazu[i] * 14);



				this.hg.setColor(Color.yellow);
				this.hg.drawString("モンスターずかん", this.x[i] + 6, this.y[i] + 6 + 12);


				this.hg.setColor(Color.white);
				this.hg.drawString("見つけた数	" + this.item_int[i][0], this.x[i] + 6, this.y[i] + 6 + 18 + 0 + 12);
				this.hg.drawString("捕まえた数	" + this.item_int[i][1], this.x[i] + 6, this.y[i] + 6 + 18 + 14 + 12);

				break;
			case 700: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 30 + this.item_kazu[i] * 14 + 18);



				this.hg.setColor(Color.cyan);
				this.hg.drawString(this.item[i][15], this.x[i] + 24, this.y[i] + 6 + 12);



				this.hg.setColor(Color.white);
				this.hg.drawString(this.message[i], this.x[i] + 24, this.y[i] + 6 + 12 + 18);
				if (this.item_kazu[i] >= 1) {
					for (j = 0; j <= this.item_kazu[i] - 1; j++) {
						this.hg.drawString(this.item[i][j], this.x[i] + 24, this.y[i] + 6 + 18 + j * 14 + 12 + 18);
					}
				}
				if (i == this.aw)
				{
					if (this.c_fc <= 3) {
						this.gg.drawPT(this.x[i] + 6, this.y[i] + 6 + 18 + this.selectedIndex[i] * 14 + 18, 200, 0);
					}
				}
				else {
					this.gg.drawPT(this.x[i] + 6, this.y[i] + 6 + 18 + this.selectedIndex[i] * 14 + 18, 200, 0);
				}
				break;
			case 800: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 44);



				this.hg.setColor(Color.yellow);
				this.hg.drawString("おこづかい", this.x[i] + 6, this.y[i] + 6 + 12);


				this.hg.setColor(Color.white);
				this.hg.drawString("" + this.item_int[i][0] + "円", this.x[i] + 6, this.y[i] + 6 + 18 + 12);

				break;
			case 900: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 30 + this.item_kazu[i] * 14);



				this.hg.setColor(Color.white);
				this.hg.drawString(this.message[i], this.x[i] + 24, this.y[i] + 6 + 12);
				if (this.item_kazu[i] >= 1) {
					for (j = 0; j <= this.item_kazu[i] - 1; j++)
					{
						this.hg.drawString(this.item[i][j], this.x[i] + 24, this.y[i] + 6 + 18 + j * 14 + 12);

						this.hg.drawString("" + this.item_int[i][j], this.x[i] + 24 + 116, this.y[i] + 6 + 18 + j * 14 + 12);
					}
				}
				if (i == this.aw)
				{
					if (this.c_fc <= 3) {
						this.gg.drawPT(this.x[i] + 6, this.y[i] + 6 + 18 + this.selectedIndex[i] * 14, 200, 0);
					}
				}
				else {
					this.gg.drawPT(this.x[i] + 6, this.y[i] + 6 + 18 + this.selectedIndex[i] * 14, 200, 0);
				}
				break;
			case 1000: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 98);
				this.hg.setColor(new Color(96, 96, 96));
				this.hg.fillRect(this.x[i] + 12, this.y[i] + 12, 248, 48);
				for (j = 0; j <= 5; j++) {
					if (this.item_int[i][j] > 0) {
						this.gg.drawPT(this.x[i] + 12 + 8 + j * 40, this.y[i] + 12 + 8, this.item_int[i][j], 0);
					}
				}
				this.hg.setColor(Color.white);
				this.hg.drawString("みんな、元気になった。", this.x[i] + 12, this.y[i] + 64 + 12);
				if (this.c_fc <= 3) {
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 64 + 14 + 2, 71, 0);
				}
				break;
			}
		}
	}
	this.hg.setFont(beforeFont);
}

KeyboardMenu.prototype.drawWindowbox = function(paramInt1, paramInt2, paramInt3, paramInt4)
{
	this.hg.setColor(Color.white);
	this.hg.fillRect(paramInt1, paramInt2, paramInt3, paramInt4);
	this.hg.setColor(Color.black);
	this.hg.fillRect(paramInt1 + 2, paramInt2 + 2, paramInt3 - 4, paramInt4 - 4);
}
