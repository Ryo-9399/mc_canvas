import { Dimension, createNDimensionArray, waitFor } from "./GlobalFunctions";
import { Color, ImageBuff } from "./ImageBuff";

function GameGraphicsForApplet(paramTagDataBase, paramApplet) {
	this.spt_kazu_x = 10;
	this.spt_kazu_y = 25;
	this.spt_kazu = this.spt_kazu_x * this.spt_kazu_y;
	this.spt_h_kijyun = 3;
	this.mode = 2;
	this.tdb = paramTagDataBase;
	this.ap = paramApplet;
	this.oya = null;
	this.di = new Dimension(512, 320);
	this.mt = undefined;
	this.backcolor = Color.black;
	this.os_img = this.ap.createImage(this.di.width, this.di.height);
	this.os_g = this.os_img.getGraphics();
	this.os_g_bk = this.os_img.getGraphicsBk();
	this.os2_img = this.ap.createImage(this.di.width + 96, this.di.height + 96);
	this.os2_g = this.os2_img.getGraphics();
	this.os32_img = this.ap.createImage(32, 32);
	this.os32_g = this.os32_img.getGraphics();
	this.apt_img = undefined;
	this.pg = undefined;
	this.li = new Array(10);
	this.spt_img = createNDimensionArray(2, this.spt_kazu);
	this.hi = undefined;
	this.spt_option_img = new Array(10);
	this.layer_mode = 2;
	this.amapchip_img = undefined;
	this.smapchip_img = new Array(256);

	var str = this.tdb.getValue("layer_mode");
	var i4;
	i4 = parseInt(str);
	if (isNaN(i4)) i4 = -1;
	if (i4 == 2) {
		this.layer_mode = 2;
	} else {
		this.layer_mode = 1;
	}
	this.mt = [];

	str = this.tdb.getValue("filename_pattern");
	this.apt_img = this.ap.getImage(str);
	// イメージを読み込めなかったときのハック
	//if(this.apt_img == null)
	//this.apt_img = new ImageBuff(this.spt_kazu_x * 32, this.spt_kazu_y * 32);
	if (this.layer_mode == 2) {
		str = this.tdb.getValue("filename_mapchip");
		this.amapchip_img = this.ap.getImage(str);
		// ハック
		if (this.amapchip_img == null)
			this.amapchip_img = new ImageBuff(512, 512);
	}
}

// コンストラクタ終わり

GameGraphicsForApplet.prototype.cut = function() {
	// ■■■32x32にカットする処理
	var i, j, n, m, localG;
	for (n = 0; n <= this.spt_kazu_y - 1; n++) {
		for (m = 0; m <= this.spt_kazu_x - 1; m++) {
			j = n * 10 + m;
			this.spt_img[0][j] = new ImageBuff(32, 32);
			localG = this.spt_img[0][j].getGraphics();
			localG.drawImage(
				this.apt_img,
				m * 32,
				n * 32,
				32,
				32,
				0,
				0,
				32,
				32,
				null
			);
			if (n >= this.spt_h_kijyun) {
				this.spt_img[1][j] = new ImageBuff(32, 32);
				localG = this.spt_img[1][j].getGraphics();
				localG.scale(-1, 1);
				localG.drawImage(
					this.apt_img,
					m * 32,
					n * 32,
					32,
					32,
					-32,
					0,
					32,
					32,
					null
				);
			} else {
				this.spt_img[1][j] = this.spt_img[0][j];
			}
		}
	}
	this.hi = this.spt_img[0];
	for (m = 0; m <= 9; m++) {
		this.spt_option_img[m] = this.spt_img[0][10 + m];
	}
	if (this.tdb.getValueInt("water_clear_switch") == 2) {
		var i5 = this.tdb.getValueInt("water_clear_level");
		if (i5 < 0) {
			i5 = 0;
		} else if (i5 > 255) {
			i5 = 255;
		}
		for (var k = 0; k <= 3; k++) {
			if (k == 1) {
				m = 0;
				n = 8;
			} else if (k == 2) {
				m = 1;
				n = 8;
			} else if (k == 3) {
				m = 2;
				n = 8;
			} else {
				m = 4;
				n = 0;
			}
			j = n * 10 + m;

			this.spt_img[0][j] = new ImageBuff(32, 32);
			localG = this.spt_img[0][j].getGraphics();
			localG.setGlobalAlpha(i5);
			localG.drawImage(
				this.apt_img,
				m * 32,
				n * 32,
				32,
				32,
				0,
				0,
				32,
				32,
				null
			);
		}
	}
	// ■■■32x32にカットする処理(mapchip)
	if (this.layer_mode == 2) {
		for (n = 0; n <= 15; n++) {
			for (m = 0; m <= 15; m++) {
				i = n * 512 * 32 + m * 32;

				j = n * 16 + m;

				this.smapchip_img[j] = new ImageBuff(32, 32);
				localG = this.smapchip_img[j].getGraphics();
				localG.drawImage(
					this.amapchip_img,
					m * 32,
					n * 32,
					32,
					32,
					0,
					0,
					32,
					32,
					null
				);
			}
		}
	}
};

GameGraphicsForApplet.prototype.setPatternImage = function(paramString) {
	this.apt_img = this.ap.getImage(paramString);
	// イメージを読み込めなかったときは操作を無効化するハック
	if (this.apt_img == null) return;

	// ■■■32x32にカットする処理
	var j, n, m, localG;
	for (n = 0; n <= this.spt_kazu_y - 1; n++) {
		for (m = 0; m <= this.spt_kazu_x - 1; m++) {
			j = n * 10 + m;
			this.spt_img[0][j] = new ImageBuff(32, 32);
			localG = this.spt_img[0][j].getGraphics();
			localG.drawImage(
				this.apt_img,
				m * 32,
				n * 32,
				32,
				32,
				0,
				0,
				32,
				32,
				null
			);
			if (n >= this.spt_h_kijyun) {
				this.spt_img[1][j] = new ImageBuff(32, 32);
				localG = this.spt_img[1][j].getGraphics();
				localG.scale(-1, 1);
				localG.drawImage(
					this.apt_img,
					m * 32,
					n * 32,
					32,
					32,
					-32,
					0,
					32,
					32,
					null
				);
			} else {
				this.spt_img[1][j] = this.spt_img[0][j];
			}
		}
	}
};

GameGraphicsForApplet.prototype.setMapchipImage = function(paramString) {
	if (this.layer_mode != 2) {
		return;
	}
	this.amapchip_img = this.ap.getImage(paramString);
	// ハック
	if (this.amapchip_img == null) return;

	// ■■■32x32にカットする処理(mapchip)
	var n, m, i, j, localG;
	if (this.layer_mode == 2) {
		for (n = 0; n <= 15; n++) {
			for (m = 0; m <= 15; m++) {
				i = n * 512 * 32 + m * 32;

				j = n * 16 + m;

				this.smapchip_img[j] = new ImageBuff(32, 32);
				localG = this.smapchip_img[j].getGraphics();
				localG.drawImage(
					this.amapchip_img,
					m * 32,
					n * 32,
					32,
					32,
					0,
					0,
					32,
					32,
					null
				);
			}
		}
	}
};

GameGraphicsForApplet.prototype.addListImage = function(paramInt, paramString) {
	this.li[paramInt] = this.ap.getImage(paramString);

	this.mt.push(this.li[paramInt]);
};

GameGraphicsForApplet.prototype.addListImage2 = function(
	paramInt,
	paramString
) {
	this.li[paramInt] = this.ap.getImage(paramString);
};

GameGraphicsForApplet.prototype.loadListImage = function() {
	waitFor(this.mt);
};

GameGraphicsForApplet.prototype.loadImage = function(paramString) {
	var localImage = null;
	try {
		localImage = this.ap.getImage(paramString);
	} catch (ex1) {
		localImage = null;
	}
	if (localImage == null) {
		return null;
	}
	var localMediaTracker = [];
	localMediaTracker.push(localImage);
	waitFor(localMediaTracker);
	return localImage;
};

GameGraphicsForApplet.prototype.copyOS = function(paramGraphics) {
	paramGraphics.drawImage(this.os_img, 0, 0, this.ap);
};

GameGraphicsForApplet.prototype.fill = function() {
	this.os_g.setColor(this.backcolor);
	this.os_g.fillRect(0, 0, this.di.width, this.di.height);
};

GameGraphicsForApplet.prototype.fill2 = function() {
	this.os2_g.setColor(this.backcolor);

	this.os2_g.fillRect(0, 0, this.di.width + 96, this.di.height + 96);
};

GameGraphicsForApplet.prototype.setBackcolor = function(paramColor) {
	this.backcolor = paramColor;
};

GameGraphicsForApplet.prototype.drawPT = function(
	paramInt1,
	paramInt2,
	paramInt3,
	paramInt4
) {
	this.os_g.drawImage(
		this.spt_img[paramInt4][paramInt3],
		paramInt1,
		paramInt2,
		this.ap
	);
};

GameGraphicsForApplet.prototype.drawPattern = function(
	paramInt1,
	paramInt2,
	paramInt3,
	paramInt4
) {
	var i = 0;
	if (paramInt4 == 1) {
		i = 1;
	}
	this.os_g.drawImage(
		this.spt_img[i][paramInt3],
		paramInt1,
		paramInt2,
		this.ap
	);
};

GameGraphicsForApplet.prototype.drawPatternCut = function(
	paramInt1,
	paramInt2,
	paramInt3,
	paramInt4,
	paramInt5
) {
	var i = 0;
	if (paramInt4 == 1) {
		i = 1;
	}
	this.os32_g.drawImage(
		this.os_img,
		paramInt1 * -1,
		paramInt2 * -1 - paramInt5,
		this.ap
	);

	this.os32_g.drawImage(
		this.spt_img[i][paramInt3],
		0,
		paramInt5 * -1,
		this.ap
	);

	this.os_g.drawImage(
		this.os32_img,
		paramInt1,
		paramInt2 + paramInt5,
		this.ap
	);
};

GameGraphicsForApplet.prototype.drawPT2 = function(
	paramInt1,
	paramInt2,
	paramInt3
) {
	this.os2_g.drawImage(this.hi[paramInt3], paramInt1, paramInt2, this.ap);
};

GameGraphicsForApplet.prototype.drawBG2 = function(
	paramInt1,
	paramInt2,
	paramInt3
) {
	this.os2_g.setColor(this.backcolor);
	this.os2_g.fillRect(paramInt1, paramInt2, 32, 32);

	this.os2_g.drawImage(this.hi[paramInt3], paramInt1, paramInt2, this.ap);
};

GameGraphicsForApplet.prototype.drawBG3 = function(
	paramInt1,
	paramInt2,
	paramInt3,
	paramColor
) {
	this.os2_g.setColor(paramColor);
	this.os2_g.fillRect(paramInt1, paramInt2, 32, 32);

	this.os2_g.drawImage(this.hi[paramInt3], paramInt1, paramInt2, this.ap);
};

GameGraphicsForApplet.prototype.drawMapchip = function(
	paramInt1,
	paramInt2,
	paramInt3
) {
	this.os_g.drawImage(
		this.smapchip_img[paramInt3],
		paramInt1,
		paramInt2,
		this.ap
	);
};

GameGraphicsForApplet.prototype.drawMapchip2 = function(
	paramInt1,
	paramInt2,
	paramInt3
) {
	this.os2_g.drawImage(
		this.smapchip_img[paramInt3],
		paramInt1,
		paramInt2,
		this.ap
	);
};

GameGraphicsForApplet.prototype.drawListImage = function(
	paramInt1,
	paramInt2,
	paramInt3
) {
	this.os_g.drawImage(this.li[paramInt3], paramInt1, paramInt2, this.ap);
};

export { GameGraphicsForApplet };
