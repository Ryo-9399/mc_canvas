function MapSystem(width, height, gamegraphics, mainprogram)
{
	this.width = width;
	this.height = height;
	this.gg = gamegraphics;
	this.mp = mainprogram;
	this.map_bg = createNDimensionArray(this.width, this.height);
	this.map_string = new Array(this.height);
	this.bg_space = "";
	this.hi = this.gg.spt_img[0];
	this.g2 = this.gg.os2_g;
	this.ap = this.gg.ap;

	for (var i = 0; i <= this.width; i++) {
		this.bg_space += ".";
	}
	this.init();
}

MapSystem.prototype.init = function()
{
	this.wx = 0;
	this.wy = 0;
	this.os2_wx = 0;
	this.os2_wy = 0;
	for (var j = 0; j < this.height; j++) {
		for (var i = 0; i < this.width; i++) {
			this.map_bg[i][j] = 0;
		}
	}
	for (j = 0; j < this.height; j++) {
		this.map_string[j] = this.bg_space;
	}
}

MapSystem.prototype.setBank = function(paramInt)
{
	var byte0;
	if (paramInt == 1) {
		byte0 = 40;
	}
	else if (paramInt == 2) {
		byte0 = 50;
	}
	else if (paramInt == 4) {
		byte0 = 60;
	}
	else {
		byte0 = 30;
	}
	for (var i = 0; i <= 9; i++) {
		this.gg.spt_img[0][10 + i] = this.gg.spt_img[0][byte0 + i];
	}
}

MapSystem.prototype.drawMap = function(paramInt1, paramInt2)
{
	this.wx = paramInt1;
	this.wy = paramInt2;
	var k = this.wx % 32;
	var m = this.wy % 32;
	this.os2_wx = this.wx >> 5;
	this.os2_wy = this.wy >> 5;
	this.gg.fill2();
	for (var j = 0; j <= 10; j++) {
		for (var i = 0; i <= 16; i++) {
			var n = this.map_bg[this.os2_wx + i][this.os2_wy + j];
			if (n > 0) {
				this.gg.drawPT2(32 + i * 32, 32 + j * 32, this.map_bg[this.os2_wx + i][this.os2_wy + j]);
			}
		}
	}
	this.gg.os_g.drawImage(this.gg.os2_img, -32 - k, -32 - m, this.gg.ap);
}

MapSystem.prototype.drawMapScroll = function(i)
{
	var l3 = this.wx % 32;
	var i4 = this.wy % 32;
	var j4 = this.wx >> 5;
	var k4 = this.wy >> 5;
	if (j4 > this.os2_wx + 1 || j4 < this.os2_wx - 1 || k4 > this.os2_wy + 1 || k4 < this.os2_wy - 1)
		this.drawMap(this.wx, this.wy);
	else if (k4 > this.os2_wy) {
		if (j4 > this.os2_wx) {
			this.g2.copyArea(64, 64, 544, 352, -32, -32);
			this.os2_wx = j4;
			this.os2_wy = k4;
			var k5 = this.os2_wy + 10;
			for (var j = 0; j <= 16; j++)
				if (this.map_bg[this.os2_wx + j][k5] > 0)
					this.g2.drawImage(this.hi[this.map_bg[this.os2_wx + j][k5]], 32 + j * 32, 352, this.ap);

			var l4 = this.os2_wx + 16;
			for (var i2 = 0; i2 <= 9; i2++)
				if (this.map_bg[l4][this.os2_wy + i2] > 0)
					this.g2.drawImage(this.hi[this.map_bg[l4][this.os2_wy + i2]], 544, 32 + i2 * 32, this.ap);

		}
		else if (j4 < this.os2_wx) {
			this.g2.copyArea(0, 64, 544, 352, 32, -32);
			this.os2_wx = j4;
			this.os2_wy = k4;
			var l5 = this.os2_wy + 10;
			for (var k = 0; k <= 16; k++)
				if (this.map_bg[this.os2_wx + k][l5] > 0)
					this.g2.drawImage(this.hi[this.map_bg[this.os2_wx + k][l5]], 32 + k * 32, 352, this.ap);

			for (var j2 = 0; j2 <= 9; j2++)
				if (this.map_bg[this.os2_wx][this.os2_wy + j2] > 0)
					this.g2.drawImage(this.hi[this.map_bg[this.os2_wx][this.os2_wy + j2]], 32, 32 + j2 * 32, this.ap);

		}
		else {
			this.g2.copyArea(32, 64, 544, 352, 0, -32);
			this.os2_wy = k4;
			var i6 = this.os2_wy + 10;
			for (var l = 0; l <= 16; l++)
				if (this.map_bg[this.os2_wx + l][i6] > 0)
					this.g2.drawImage(this.hi[this.map_bg[this.os2_wx + l][i6]], 32 + l * 32, 352, this.ap);

		}
	}
	else if (k4 < this.os2_wy) {
		if (j4 > this.os2_wx) {
			this.g2.copyArea(64, 0, 544, 352, -32, 32);
			this.os2_wx = j4;
			this.os2_wy = k4;
			for (var i1 = 0; i1 <= 16; i1++)
				if (this.map_bg[this.os2_wx + i1][this.os2_wy] > 0)
					this.g2.drawImage(this.hi[this.map_bg[this.os2_wx + i1][this.os2_wy]], 32 + i1 * 32, 32, this.ap);

			var i5 = this.os2_wx + 16;
			for (var k2 = 1; k2 <= 10; k2++)
				if (this.map_bg[i5][this.os2_wy + k2] > 0)
					this.g2.drawImage(this.hi[this.map_bg[i5][this.os2_wy + k2]], 544, 32 + k2 * 32, this.ap);

		}
		else if (j4 < this.os2_wx) {
			this.g2.copyArea(0, 0, 544, 352, 32, 32);
			this.os2_wx = j4;
			this.os2_wy = k4;
			for (var j1 = 0; j1 <= 16; j1++)
				if (this.map_bg[this.os2_wx + j1][this.os2_wy] > 0)
					this.g2.drawImage(this.hi[this.map_bg[this.os2_wx + j1][this.os2_wy]], 32 + j1 * 32, 32, this.ap);

			for (var l2 = 1; l2 <= 10; l2++)
				if (this.map_bg[this.os2_wx][this.os2_wy + l2] > 0)
					this.g2.drawImage(this.hi[this.map_bg[this.os2_wx][this.os2_wy + l2]], 32, 32 + l2 * 32, this.ap);

		}
		else {
			this.g2.copyArea(32, 0, 544, 352, 0, 32);
			this.os2_wy = k4;
			for (var k1 = 0; k1 <= 16; k1++)
				if (this.map_bg[this.os2_wx + k1][this.os2_wy] > 0)
					this.g2.drawImage(this.hi[this.map_bg[this.os2_wx + k1][this.os2_wy]], 32 + k1 * 32, 32, this.ap);

		}
	}
	else if (j4 > this.os2_wx) {
		this.g2.copyArea(64, 32, 544, 352, -32, 0);
		this.os2_wx = j4;
		var j5 = this.os2_wx + 16;
		for (var i3 = 0; i3 <= 10; i3++)
			if (this.map_bg[j5][this.os2_wy + i3] > 0)
				this.g2.drawImage(this.hi[this.map_bg[j5][this.os2_wy + i3]], 544, 32 + i3 * 32, this.ap);

	}
	else if (j4 < this.os2_wx) {
		this.g2.copyArea(0, 32, 544, 352, 32, 0);
		this.os2_wx = j4;
		for (var j3 = 0; j3 <= 10; j3++)
			if (this.map_bg[this.os2_wx][this.os2_wy + j3] > 0)
				this.g2.drawImage(this.hi[this.map_bg[this.os2_wx][this.os2_wy + j3]], 32, 32 + j3 * 32, this.ap);

	}
	var image = this.hi[90 + i];
	for (var k3 = 0; k3 <= 10; k3++) {
		var j6 = this.os2_wy + k3;
		for (var l1 = 0; l1 <= 16; l1++)
			switch (this.map_bg[this.os2_wx + l1][j6]) {
				default:
					break;

				case 5:
					if (this.map_bg[this.os2_wx + l1][j6 - 1] == 4) {
						this.gg.drawBG2(32 + l1 * 32, 32 + k3 * 32, 4);
						this.gg.drawPT2(32 + l1 * 32, 32 + k3 * 32, 5);
					}
					break;

				case 6:
					if (this.map_bg[this.os2_wx + l1][j6 + 1] == 4) {
						this.gg.drawBG2(32 + l1 * 32, 32 + k3 * 32, 4);
						this.gg.drawPT2(32 + l1 * 32, 32 + k3 * 32, 6);
					}
					break;

				case 7:
					if (i == 0 || i == 2)
						this.gg.drawBG2(32 + l1 * 32, 32 + k3 * 32, 96);
					else
						this.gg.drawBG2(32 + l1 * 32, 32 + k3 * 32, 97);
					break;

				case 8:
					if (i == 0) {
						if (this.map_bg[(this.os2_wx + l1) - 1][j6] == 4) {
							this.gg.drawBG2(32 + l1 * 32, 32 + k3 * 32, 4);
							if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max)
								this.gg.drawPT2(32 + l1 * 32, 32 + k3 * 32, 99);
							else
								this.gg.drawPT2(32 + l1 * 32, 32 + k3 * 32, 95);
							break;
						}
						if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max)
							this.gg.drawBG2(32 + l1 * 32, 32 + k3 * 32, 99);
						else
							this.gg.drawBG2(32 + l1 * 32, 32 + k3 * 32, 95);
						break;
					}
					if (this.map_bg[(this.os2_wx + l1) - 1][j6] == 4) {
						this.gg.drawBG2(32 + l1 * 32, 32 + k3 * 32, 4);
						if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max)
							this.gg.drawPT2(32 + l1 * 32, 32 + k3 * 32, 98);
						else
							this.gg.drawPT2(32 + l1 * 32, 32 + k3 * 32, 94);
						break;
					}
					if (this.mp.stage_max >= 2 && this.mp.stage >= this.mp.stage_max)
						this.gg.drawBG2(32 + l1 * 32, 32 + k3 * 32, 98);
					else
						this.gg.drawBG2(32 + l1 * 32, 32 + k3 * 32, 94);
					break;

				case 9:
					if (this.map_bg[(this.os2_wx + l1) - 1][j6] == 4) {
						this.gg.drawBG2(32 + l1 * 32, 32 + k3 * 32, 4);
						this.gg.os2_g.drawImage(image, 32 + l1 * 32, 32 + k3 * 32, this.gg.ap);
					}
					else {
						this.g2.setColor(this.gg.backcolor);
						this.gg.os2_g.fillRect(32 + l1 * 32, 32 + k3 * 32, 32, 32);
						this.gg.os2_g.drawImage(image, 32 + l1 * 32, 32 + k3 * 32, this.gg.ap);
					}
					break;
			}

	}
	this.gg.os_g.drawImage(this.gg.os2_img, -32 - l3, -32 - i4, this.ap);
}

MapSystem.prototype.getBGCode = function(paramInt1, paramInt2)
{
	return this.map_bg[paramInt1 >> 5][paramInt2 >> 5];
}

MapSystem.prototype.putBGCode = function(paramInt1, paramInt2, paramInt3)
{
	this.map_bg[paramInt1][paramInt2] = paramInt3;
	if (this.os2_wx <= paramInt1 && this.os2_wx + 16 >= paramInt1 && this.os2_wy <= paramInt2 && this.os2_wy + 10 >= paramInt2) {
		this.gg.drawBG2((paramInt1 - this.os2_wx) * 32 + 32, (paramInt2 - this.os2_wy) * 32 + 32, paramInt3);
	}
}
