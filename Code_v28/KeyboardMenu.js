
function KeyboardMenu(gamegraphics, gamekey, s)
{
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
	this.aw = -1;
	this.mode = 0;
	this.kettei_c = 0;
	this.cancel_c = 0;
	this.gg = gamegraphics;
	this.gk = gamekey;
	this.name_crys = s;
	this.hi = this.gg.spt_img[0];
	this.hih = this.gg.spt_img;
	this.hg = this.gg.os_g;
	this.ap = this.gg.ap;
	this.initAll();
}

KeyboardMenu.prototype.initAll = function()
{
	for(var i = 0; i <= 15; i++)
		this.init1(i);

	this.c_fc = 0;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = -1;
	this.kettei_c = 2;
	this.cancel_c = 2;
	for(var j = 0; j <= 15; j++)
		this.list_IDlist[j] = 0;

	this.list_kazu = 0;
	this.list_s = 0;
}

KeyboardMenu.prototype.init1 = function(i)
{
	this.c[i] = 0;
	this.x[i] = 0;
	this.y[i] = 0;
	this.width[i] = 180;
	this.selectedIndex[i] = 0;
	this.item_kazu[i] = 0;
	this.message[i] = "\u3069\u3046\u3057\u307E\u3059\u304B\uFF1F";
	for(var j = 0; j <= 15; j++)
		this.item[i][j] = "";

	for(var k = 0; k <= 15; k++)
		this.item_int[i][k] = 0;

}

KeyboardMenu.prototype.setMessage = function(i, s)
{
	this.message[i] = s;
}

KeyboardMenu.prototype.addItem = function(i, s)
{
	this.item[i][this.item_kazu[i]] = s;
	this.item_kazu[i]++;
}

KeyboardMenu.prototype.addIntitem = function(i, j)
{
	this.item_int[i][this.item_kazu[i]] = j;
	this.item_kazu[i]++;
}

KeyboardMenu.prototype.addItem2 = function(i, s, j)
{
	this.item[i][this.item_kazu[i]] = s;
	this.item_int[i][this.item_kazu[i]] = j;
	this.item_kazu[i]++;
}

KeyboardMenu.prototype.active = function(i, j, k, l)
{
	this.c[i] = 100;
	this.x[i] = j;
	this.y[i] = k;
	if(l !== undefined)
		this.width[i] = l;
	else
		this.width[i] = 180;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = i;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.activeSerifutuki = function(i, j, k, l, s)
{
	this.c[i] = 700;
	this.x[i] = j;
	this.y[i] = k;
	this.width[i] = l;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = i;
	this.kettei_c = 2;
	this.cancel_c = 2;
	this.item[i][15] = s;
}

KeyboardMenu.prototype.activeKaimono = function(i, j, k, l)
{
	this.c[i] = 900;
	this.x[i] = j;
	this.y[i] = k;
	this.width[i] = l;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = i;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.activeIchigyou = function(i, j, k, l)
{
	this.c[i] = 300;
	this.x[i] = j;
	this.y[i] = k;
	this.width[i] = l;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = i;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.activeNigyou = function(i, j, k, l, color)
{
	this.c[i] = 310;
	this.x[i] = j;
	this.y[i] = k;
	this.width[i] = l;
	this.item_color[i] = color;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = i;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.activeYongyou = function(i, j, k, l)
{
	this.c[i] = 320;
	this.x[i] = j;
	this.y[i] = k;
	this.width[i] = l;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = i;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.activeYongyou2 = function(i, j, k, l)
{
	this.c[i] = 321;
	this.x[i] = j;
	this.y[i] = k;
	this.width[i] = l;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = i;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.activeSerifu = function(i, j, k, l, color)
{
	this.c[i] = 330;
	this.x[i] = j;
	this.y[i] = k;
	this.width[i] = l;
	this.item_color[i] = color;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = i;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.activeYasumu = function(i, j, k)
{
	this.c[i] = 1000;
	this.x[i] = j;
	this.y[i] = k;
	this.width[i] = 272;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = i;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.onKao = function(i, j, k, l, i1)
{
	this.c[i] = 600;
	this.x[i] = j;
	this.y[i] = k;
	this.width[i] = l;
	this.item_int[i][0] = i1;
}

KeyboardMenu.prototype.onMituketa = function(i, j, k)
{
	this.c[i] = 610;
	this.x[i] = j;
	this.y[i] = k;
	this.width[i] = 200;
}

KeyboardMenu.prototype.onOkozukai = function(i, j, k, l, i1)
{
	this.c[i] = 800;
	this.x[i] = j;
	this.y[i] = k;
	this.width[i] = l;
	this.item_int[i][0] = i1;
}

KeyboardMenu.prototype.activeIchigyouTime = function(i, j, k, l)
{
	this.c[i] = 350;
	this.x[i] = j;
	this.y[i] = k;
	this.width[i] = l;
	this.item_int[i][0] = 100;
}

KeyboardMenu.prototype.activeNigyouTime = function(i, j, k, l, color)
{
	this.c[i] = 360;
	this.x[i] = j;
	this.y[i] = k;
	this.width[i] = l;
	this.item_color[i] = color;
	this.item_int[i][0] = 100;
}

KeyboardMenu.prototype.activeJibun = function(i, j, k, l, i1, j1, k1, l1)
{
	this.c[i] = 400;
	this.x[i] = j;
	this.y[i] = k;
	this.item_int[14][0] = i1;
	this.item_int[14][1] = j1;
	this.item_int[14][2] = k1;
	this.item_int[14][3] = l1;
	this.width[i] = l;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = i;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.activeToujou = function(i, j, k, l, i1, s)
{
	this.c[i] = 420;
	this.x[i] = j;
	this.y[i] = k;
	this.item_int[i][2] = i1;
	this.item[i][0] = s;
	this.width[i] = l;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = i;
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

KeyboardMenu.prototype.off = function(i)
{
	this.c[i] = 0;
}

KeyboardMenu.prototype.offActivewindow = function(i, j)
{
	this.c[i] = 0;
	this.c_fc = -1;
	this.gk.up_c = 0;
	this.gk.down_c = 0;
	this.aw = j;
	this.kettei_c = 2;
	this.cancel_c = 2;
}

KeyboardMenu.prototype.move = function()
{
	this.c_fc++;
	if(this.c_fc > 6)
		this.c_fc = 0;
	if(this.aw >= 0)
	{
		if(this.gk.up_f)
		{
			this.gk.up_c++;
			if(this.gk.up_c > 3)
				this.gk.up_c = 1;
		} else
		{
			this.gk.up_c = 0;
		}
		if(this.gk.down_f)
		{
			this.gk.down_c++;
			if(this.gk.down_c > 3)
				this.gk.down_c = 1;
		} else
		{
			this.gk.down_c = 0;
		}
		if(this.gk.up_c == 1)
		{
			this.selectedIndex[this.aw]--;
			this.c_fc = -1;
			if(this.selectedIndex[this.aw] < 0)
				this.selectedIndex[this.aw] = this.item_kazu[this.aw] - 1;
		} else
		if(this.gk.down_c == 1)
		{
			this.selectedIndex[this.aw]++;
			this.c_fc = -1;
			if(this.selectedIndex[this.aw] > this.item_kazu[this.aw] - 1)
				this.selectedIndex[this.aw] = 0;
		}
	}
	if(!this.gk.tr1_f)
		this.kettei_c = 0;
	else
	if(this.kettei_c == 0)
		this.kettei_c = 1;
	if(!this.gk.x_f)
		this.cancel_c = 0;
	else
	if(this.cancel_c == 0)
		this.cancel_c = 1;
}

KeyboardMenu.prototype.drawMenus = function()
{
	this.hg.setFont(new Font("Dialog", 0, 12));
	for(var i = 0; i <= 15; i++)
	{
		var l1 = this.c[i];
		if(l1 != 0)
			switch(l1)
			{
			default:
				break;

			case 100: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 30 + this.item_kazu[i] * 14);
				this.hg.setColor(Color.white);
				this.hg.drawString(this.message[i], this.x[i] + 24, this.y[i] + 6 + 12);
				if(this.item_kazu[i] >= 1)
				{
					for(var j = 0; j <= this.item_kazu[i] - 1; j++)
						this.hg.drawString(this.item[i][j], this.x[i] + 24, this.y[i] + 6 + 18 + j * 14 + 12);

				}
				if(i == this.aw)
				{
					if(this.c_fc <= 3)
						this.hg.drawImage(this.hi[70], this.x[i] + 6, this.y[i] + 24 + this.selectedIndex[i] * 14, this.ap);
				} else
				{
					this.hg.drawImage(this.hi[70], this.x[i] + 6, this.y[i] + 24 + this.selectedIndex[i] * 14, this.ap);
				}
				break;

			case 200: 
				this.hg.setColor(Color.white);
				this.hg.fillRect(12, 12, 128, 58);
				this.hg.setColor(Color.black);
				this.hg.fillRect(14, 14, 124, 54);
				this.hg.setColor(Color.cyan);
				this.hg.drawString(this.item[14][0], 18, 30);
				if(this.item_int[14][0] <= 0 || this.item_int[14][2] <= 0)
				{
					this.hg.setColor(Color.red);
					this.hg.drawString("\u6226\u95D8\u4E0D\u80FD", 82, 30);
				}
				this.hg.setColor(Color.white);
				this.hg.drawString("HP  " + this.item_int[14][0] + " / " + this.item_int[14][1], 18, 48);
				this.hg.drawString("PP  " + this.item_int[14][2] + " / " + this.item_int[14][3], 18, 62);
				break;

			case 210: 
				this.hg.setColor(Color.white);
				this.hg.fillRect(160, 12, 128, 58);
				this.hg.setColor(Color.black);
				this.hg.fillRect(162, 14, 124, 54);
				this.hg.setColor(Color.green);
				this.hg.drawString(this.item[15][0], 166, 30);
				if(this.item_int[15][0] <= 0)
				{
					this.hg.setColor(Color.red);
					this.hg.drawString("\u6226\u95D8\u4E0D\u80FD", 230, 30);
				}
				this.hg.setColor(Color.white);
				this.hg.drawString("HP  " + this.item_int[15][0] + " / " + this.item_int[15][1], 166, 48);
				this.hg.drawString("PP  " + this.item_int[15][2] + " / " + this.item_int[15][3], 166, 62);
				break;

			case 220: 
				this.hg.setColor(Color.white);
				this.hg.fillRect(372, 12, 128, 58);
				this.hg.setColor(Color.black);
				this.hg.fillRect(374, 14, 124, 54);
				this.hg.setColor(Color.cyan);
				this.hg.drawString(this.item[15][0], 378, 30);
				if(this.item_int[15][0] <= 0 || this.item_int[15][2] <= 0)
				{
					this.hg.setColor(Color.red);
					this.hg.drawString("\u6226\u95D8\u4E0D\u80FD", 442, 30);
				}
				this.hg.setColor(Color.white);
				this.hg.drawString("HP  " + this.item_int[15][0] + " / " + this.item_int[15][1], 378, 48);
				this.hg.drawString("PP  " + this.item_int[15][2] + " / " + this.item_int[15][3], 378, 62);
				break;

			case 300: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 40);
				this.hg.setColor(Color.white);
				this.hg.drawString(this.item[i][0], this.x[i] + 6, this.y[i] + 6 + 12);
				if(this.c_fc <= 3)
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 6 + 14 + 0 + 2, 201, 0);
				break;

			case 310: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 58);
				this.hg.setColor(this.item_color[i]);
				this.hg.drawString(this.item[i][0], this.x[i] + 6, this.y[i] + 6 + 12);
				this.hg.setColor(Color.white);
				this.hg.drawString(this.item[i][1], this.x[i] + 6, this.y[i] + 6 + 18 + 12);
				if(this.c_fc <= 3)
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 6 + 18 + 14 + 2, 71, 0);
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
				for(var k = 0; k <= this.item_kazu[3] - 4; k++)
					this.hg.drawString(this.item[3][k + 3], this.x[3] + 6, this.y[3] + 6 + 54 + k * 14 + 12);

				if(this.c_fc <= 3)
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 6 + 18 + 36 + (this.item_kazu[i] - 3) * 14 + 2, 71, 0);
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
				if(this.c_fc <= 3)
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 6 + 18 + 36 + 14 + 14 + 2, 71, 0);
				break;

			case 330: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 30 + (this.item_kazu[i] + 1) * 14);
				this.hg.setColor(this.item_color[i]);
				this.hg.drawString(this.message[i], this.x[i] + 6, this.y[i] + 6 + 12);
				this.hg.setColor(Color.white);
				if(this.item_kazu[i] >= 1)
				{
					for(var l = 0; l <= this.item_kazu[i] - 1; l++)
						this.hg.drawString(this.item[i][l], this.x[i] + 6, this.y[i] + 6 + 18 + l * 14 + 12);

				}
				if(i == this.aw)
				{
					if(this.c_fc <= 3)
						this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 6 + 18 + this.item_kazu[i] * 14 + 2, 201, 0);
				} else
				{
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 6 + 18 + this.item_kazu[i] * 14 + 2, 201, 0);
				}
				break;

			case 350: 
				if(this.item_int[i][0] == 100)
				{
					this.item_int[i][0] = 55;
					break;
				}
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 26);
				this.hg.setColor(Color.white);
				this.hg.drawString(this.item[i][0], this.x[i] + 6, this.y[i] + 6 + 12);
				this.item_int[i][0]--;
				if(this.item_int[i][0] <= 0)
					this.off(i);
				break;

			case 360: 
				if(this.item_int[i][0] == 200)
				{
					this.drawWindowbox(this.x[i], this.y[i], this.width[i], 44);
					this.hg.setColor(this.item_color[i]);
					this.hg.drawString(this.item[i][0], this.x[i] + 6, this.y[i] + 6 + 12);
					this.hg.setColor(Color.white);
					this.hg.drawString(this.item[i][1], this.x[i] + 6, this.y[i] + 6 + 18 + 12);
					break;
				}
				if(this.item_int[i][0] == 100)
				{
					this.item_int[i][0] = 55;
					break;
				}
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 44);
				this.hg.setColor(this.item_color[i]);
				this.hg.drawString(this.item[i][0], this.x[i] + 6, this.y[i] + 6 + 12);
				this.hg.setColor(Color.white);
				this.hg.drawString(this.item[i][1], this.x[i] + 6, this.y[i] + 6 + 18 + 12);
				this.item_int[i][0]--;
				if(this.item_int[i][0] <= 0)
					this.off(i);
				break;

			case 400: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 128);
				this.hg.setColor(Color.yellow);
				this.hg.drawString(this.name_crys + "\u306E\u30B9\u30C6\u30FC\u30BF\u30B9", this.x[i] + 6, this.y[i] + 6 + 12);
				this.hg.setColor(Color.white);
				this.hg.drawString("HP  " + this.item_int[14][0] + " / " + this.item_int[14][1], this.x[i] + 6, this.y[i] + 6 + 18 + 0 + 12);
				this.hg.drawString("\u304A\u3053\u3065\u304B\u3044  ", this.x[i] + 6, this.y[i] + 6 + 18 + 28 + 12);
				this.hg.drawString("" + this.item_int[14][2] + "\u5186", this.x[i] + 6 + 72, this.y[i] + 6 + 18 + 42 + 12);
				this.hg.drawString("\u5F97\u70B9", this.x[i] + 6, this.y[i] + 6 + 18 + 56 + 12);
				this.hg.drawString("" + this.item_int[14][3] + "\u70B9", this.x[i] + 6 + 72, this.y[i] + 6 + 18 + 70 + 12);
				if(this.c_fc <= 3)
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 6 + 18 + 84 + 2, 71, 0);
				break;

			case 420: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 116);
				this.hg.setColor(new Color(96, 96, 96));
				this.hg.fillRect(this.x[i] + 12, this.y[i] + 12, this.width[i] - 24, 48);
				this.gg.drawPT(this.x[i] + 12 + ((this.width[i] - 24 - 32) >> 1), this.y[i] + 12 + 8, this.item_int[i][2], 0);
				this.hg.setColor(Color.cyan);
				this.hg.drawString(this.item[i][0], this.x[i] + 12, this.y[i] + 64 + 12);
				this.hg.setColor(Color.white);
				this.hg.drawString("\u3053\u308C\u304B\u3089\u3082\u3001\u3088\u308D\u3057\u304F\u306D\uFF01", this.x[i] + 12, this.y[i] + 68 + 14 + 12);
				if(this.c_fc <= 3)
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 68 + 28 + 2, 71, 0);
				break;

			case 410: 
				if(this.item_int[i][0] == -2)
				{
					this.drawWindowbox(this.x[i], this.y[i], this.width[i], 116);
					this.hg.setColor(new Color(96, 96, 96));
					this.hg.fillRect(this.x[i] + 12, this.y[i] + 12, this.width[i] - 24, 48);
					this.gg.drawPT(this.x[i] + 12 + ((this.width[i] - 24 - 32) >> 1), this.y[i] + 12 + 8, this.item_int[i][2], 0);
					this.hg.setColor(Color.yellow);
					this.hg.drawString(this.item[i][0], this.x[i] + 12, this.y[i] + 64 + 12);
					this.hg.setColor(Color.white);
					this.hg.drawString("\u6355\u7372\u4E0D\u53EF\u80FD", this.x[i] + 12, this.y[i] + 68 + 14 + 12);
					if(this.c_fc <= 3)
						this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 68 + 28 + 2, 71, 0);
					break;
				}
				if(this.item_int[i][0] < 0)
				{
					this.drawWindowbox(this.x[i], this.y[i], this.width[i], 116);
					this.hg.setColor(new Color(96, 96, 96));
					this.hg.fillRect(this.x[i] + 12, this.y[i] + 12, this.width[i] - 24, 48);
					this.gg.drawPT(this.x[i] + 12 + ((this.width[i] - 24 - 32) >> 1), this.y[i] + 12 + 8, this.item_int[i][2], 0);
					this.hg.setColor(Color.yellow);
					this.hg.drawString(this.item[i][0], this.x[i] + 12, this.y[i] + 64 + 12);
					this.hg.setColor(Color.white);
					this.hg.drawString("\u73FE\u5728\u8ABF\u67FB\u4E2D", this.x[i] + 12, this.y[i] + 68 + 14 + 12);
					if(this.c_fc <= 3)
						this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 68 + 28 + 2, 71, 0);
					break;
				}
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 158);
				this.hg.setColor(new Color(96, 96, 96));
				this.hg.fillRect(this.x[i] + 12, this.y[i] + 12, this.width[i] - 24, 48);
				this.gg.drawPT(this.x[i] + 12 + ((this.width[i] - 24 - 32) >> 1), this.y[i] + 12 + 8, this.item_int[i][2], 0);
				this.hg.setColor(Color.yellow);
				this.hg.drawString(this.item[i][0], this.x[i] + 12, this.y[i] + 64 + 12);
				this.hg.setColor(Color.white);
				this.hg.drawString("\u6700\u5927HP", this.x[i] + 12, this.y[i] + 68 + 14 + 12);
				this.hg.drawString("" + this.item_int[i][0], this.x[i] + 56, this.y[i] + 68 + 28 + 12);
				this.hg.drawString("\u6700\u5927PP", this.x[i] + 12, this.y[i] + 68 + 42 + 12);
				this.hg.drawString("" + this.item_int[i][1], this.x[i] + 56, this.y[i] + 68 + 56 + 12);
				if(this.c_fc <= 3)
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 68 + 70 + 2, 71, 0);
				break;

			case 500: 
				if(this.c_fc <= 3 || this.aw != 0)
					this.hg.drawImage(this.hi[72], 12 + 28 * this.selectedIndex[i], 288, this.ap);
				else
					this.hg.drawImage(this.hi[73], 12 + 28 * this.selectedIndex[i], 288, this.ap);
				break;

			case 600: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 96);
				var i2 = this.item_int[i][0];
				var j2 = this.x[i] + ((this.width[i] - 64) >> 1);
				var k2 = this.y[i] + 16;
				this.gg.drawPT(j2, k2, i2, 0);
				this.gg.drawPT(j2 + 32, k2, i2 + 1, 0);
				this.gg.drawPT(j2, k2 + 32, i2 + 10, 0);
				this.gg.drawPT(j2 + 32, k2 + 32, i2 + 11, 0);
				break;

			case 610: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 30 + this.item_kazu[i] * 14);
				this.hg.setColor(Color.yellow);
				this.hg.drawString("\u30E2\u30F3\u30B9\u30BF\u30FC\u305A\u304B\u3093", this.x[i] + 6, this.y[i] + 6 + 12);
				this.hg.setColor(Color.white);
				this.hg.drawString("\u898B\u3064\u3051\u305F\u6570  " + this.item_int[i][0], this.x[i] + 6, this.y[i] + 6 + 18 + 0 + 12);
				this.hg.drawString("\u6355\u307E\u3048\u305F\u6570  " + this.item_int[i][1], this.x[i] + 6, this.y[i] + 6 + 18 + 14 + 12);
				break;

			case 700: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 30 + this.item_kazu[i] * 14 + 18);
				this.hg.setColor(Color.cyan);
				this.hg.drawString(this.item[i][15], this.x[i] + 24, this.y[i] + 6 + 12);
				this.hg.setColor(Color.white);
				this.hg.drawString(this.message[i], this.x[i] + 24, this.y[i] + 6 + 12 + 18);
				if(this.item_kazu[i] >= 1)
				{
					for(var i1 = 0; i1 <= this.item_kazu[i] - 1; i1++)
						this.hg.drawString(this.item[i][i1], this.x[i] + 24, this.y[i] + 6 + 18 + i1 * 14 + 12 + 18);

				}
				if(i == this.aw)
				{
					if(this.c_fc <= 3)
						this.gg.drawPT(this.x[i] + 6, this.y[i] + 6 + 18 + this.selectedIndex[i] * 14 + 18, 200, 0);
				} else
				{
					this.gg.drawPT(this.x[i] + 6, this.y[i] + 6 + 18 + this.selectedIndex[i] * 14 + 18, 200, 0);
				}
				break;

			case 800: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 44);
				this.hg.setColor(Color.yellow);
				this.hg.drawString("\u304A\u3053\u3065\u304B\u3044", this.x[i] + 6, this.y[i] + 6 + 12);
				this.hg.setColor(Color.white);
				this.hg.drawString("" + this.item_int[i][0] + "\u5186", this.x[i] + 6, this.y[i] + 6 + 18 + 12);
				break;

			case 900: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 30 + this.item_kazu[i] * 14);
				this.hg.setColor(Color.white);
				this.hg.drawString(this.message[i], this.x[i] + 24, this.y[i] + 6 + 12);
				if(this.item_kazu[i] >= 1)
				{
					for(var j1 = 0; j1 <= this.item_kazu[i] - 1; j1++)
					{
						this.hg.drawString(this.item[i][j1], this.x[i] + 24, this.y[i] + 6 + 18 + j1 * 14 + 12);
						this.hg.drawString("" + this.item_int[i][j1], this.x[i] + 24 + 116, this.y[i] + 6 + 18 + j1 * 14 + 12);
					}

				}
				if(i == this.aw)
				{
					if(this.c_fc <= 3)
						this.gg.drawPT(this.x[i] + 6, this.y[i] + 6 + 18 + this.selectedIndex[i] * 14, 200, 0);
				} else
				{
					this.gg.drawPT(this.x[i] + 6, this.y[i] + 6 + 18 + this.selectedIndex[i] * 14, 200, 0);
				}
				break;

			case 1000: 
				this.drawWindowbox(this.x[i], this.y[i], this.width[i], 98);
				this.hg.setColor(new Color(96, 96, 96));
				this.hg.fillRect(this.x[i] + 12, this.y[i] + 12, 248, 48);
				for(var k1 = 0; k1 <= 5; k1++)
					if(this.item_int[i][k1] > 0)
						this.gg.drawPT(this.x[i] + 12 + 8 + k1 * 40, this.y[i] + 12 + 8, this.item_int[i][k1], 0);

				this.hg.setColor(Color.white);
				this.hg.drawString("\u307F\u3093\u306A\u3001\u5143\u6C17\u306B\u306A\u3063\u305F\u3002", this.x[i] + 12, this.y[i] + 64 + 12);
				if(this.c_fc <= 3)
					this.gg.drawPT(this.x[i] + ((this.width[i] - 14) >> 1), this.y[i] + 64 + 14 + 2, 71, 0);
				break;
			}
	}

}

KeyboardMenu.prototype.drawWindowbox = function(i, j, k, l)
{
	this.hg.setColor(Color.white);
	this.hg.fillRect(i, j, k, l);
	this.hg.setColor(Color.black);
	this.hg.fillRect(i + 2, j + 2, k - 4, l - 4);
}
