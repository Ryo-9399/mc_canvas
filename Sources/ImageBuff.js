
/*
画像やスクリーンのバッファリングに関するクラスまとめ
*/

// 画像管理クラス
function ImageBuff(w, h)
{
	if(arguments.length == 2)
	{
		this._dat = document.createElement("canvas");
		this._dat.width = w;
		this._dat.height = h;
		this._width = w;
		this._height = h;
		var ctx = this._dat.getContext("2d");
		ctx.lineWidth = 1.6;
		ctx.lineCap = "round";
		ctx.save();
	}
	else
	{
		this._dat = null;
		this._width = -1;
		this._height = -1;
	}
	this._loaded = false;
	this._error = false;
	this._g = null;
}

// 画像を読み込む
ImageBuff.prototype.load = function(url)
{
	this._loaded = false;
	this._error = false;
	this._width = -1;
	this._height = -1;
	this._dat = new Image();
	var _this = this;
	this._dat.onload = function()
	{
		ImageBuff_onload(_this);
	};
	this._dat.onerror = function()
	{
		ImageBuff_onerror(_this);
	};
	this._dat.onabort = function()
	{
		ImageBuff_onerror(_this);
	};
	this._dat.ontimeout = function()
	{
		ImageBuff_onerror(_this);
	};
	this._dat.src = url;
	if(this._dat.complete)
	{
		this.onload();
	}
}

ImageBuff.prototype.onload = function()
{
	this._loaded = true;
	this._width = this._dat.naturalWidth;
	this._height = this._dat.naturalHeight;
}
function ImageBuff_onload(obj)
{
	obj.onload();
}

ImageBuff.prototype.onerror = function()
{
	this._error = true;
	this._dat = null;
}

function ImageBuff_onerror(obj)
{
	obj.onerror();
}

// 画像バッファを編集するためのクラスGraphicsを返す
// Canvasモードでないと使えない
ImageBuff.prototype.getGraphics = function()
{
	if(this._width < 0) return null;
	this._g = new Graphics(this);
	return this._g;
}

ImageBuff.prototype.createGraphics = function()
{
	return this.getGraphics();
}







// 画像編集クラス
function Graphics(img)
{
	this._ctx = img._dat.getContext("2d");
	if(this._ctx)
	{
		this._ctx.restore();
		this._ctx.save();
	}
	this._color = Color.black;
	this._font = new Font(Font.DIALOG, Font.PLAIN, 10);
}

// 線を描画する
Graphics.prototype.drawLine = function(x1, y1, x2, y2)
{
	if(this._ctx == null) return false;
	this._ctx.beginPath();
	this._ctx.moveTo(x1, y1);
	this._ctx.lineTo(x2, y2);
	this._ctx.stroke();
	return true;
}

// 画像を描画する
// 引数3-4個: ImageBuffオブジェクト, X座標, Y座標
// 引数5-6個: ImageBuffオブジェクト, 描画X座標, 描画Y座標, 描画スケール幅, 描画スケール高さ
// 引数9-10個: ImageBuffオブジェクト, データX座標, データY座標, データ幅, データ高さ, 描画X座標, 描画Y座標, 描画スケール幅, 描画スケール高さ
Graphics.prototype.drawImage = function(img, a1, a2, a3, a4, a5, a6, a7, a8, a9)
{
	if(img._dat == null) return false;
	if(this._ctx == null) return false;
	try
	{
		if(arguments.length <= 4)
		{
			this._ctx.drawImage(img._dat, a1, a2);
			return true;
		}
		else if(arguments.length <= 6)
		{
			this._ctx.drawImage(img._dat, a1, a2, a3, a4);
			return true;
		}
		else if(arguments.length <= 10)
		{
			this._ctx.drawImage(img._dat, a1, a2, a3, a4, a5, a6, a7, a8);
			return true;
		}
	}
	catch(e) {}
	return false;
}

// 矩形を描画する
Graphics.prototype.drawRect = function(x, y, w, h)
{
	if(this._ctx == null) return false;
	this._ctx.strokeRect(x, y, w, h);
	return true;
}

// 矩形を塗りつぶし描画する
Graphics.prototype.fillRect = function(x, y, w, h)
{
	if(this._ctx == null) return false;
	this._ctx.fillRect(x, y, w, h);
	return true;
}

// 多角形を描画する
Graphics.prototype.drawPolygon = function(xa, ya, pn)
{
	if(this._ctx == null) return false;
	this._ctx.beginPath();
	this._ctx.moveTo(xa[0], ya[0]);
	for(var i = 1; i < pn; i++)
	{
		this._ctx.lineTo(xa[i], ya[i]);
	}
	this._ctx.closePath();
	this._ctx.stroke();
	return true;
}

// 多角形を塗りつぶし描画する
Graphics.prototype.fillPolygon = function(xa, ya, pn)
{
	if(this._ctx == null) return false;
	this._ctx.beginPath();
	this._ctx.moveTo(xa[0], ya[0]);
	for(var i = 1; i < pn; i++)
	{
		this._ctx.lineTo(xa[i], ya[i]);
	}
	this._ctx.closePath();
	this._ctx.fill();
	return true;
}

// 楕円を描画する
Graphics.prototype.drawOval = function(x, y, w, h)
{
	if(this._ctx == null) return false;
	this.drawArc(x, y, w, h, 0, Math.PI * 2);
	return true;
}

// 楕円を塗りつぶし描画する
Graphics.prototype.fillOval = function(x, y, w, h)
{
	if(this._ctx == null) return false;
	this.fillArc(x, y, w, h, 0, Math.PI * 2);
	return true;
}

// 円弧を描画する
Graphics.prototype.drawArc = function(x, y, w, h, angle, theta)
{
	if(this._ctx == null) return false;
	var sc = h / w;
	this._ctx.save();
	this._ctx.beginPath();
	this._ctx.scale(1, sc);
	this._ctx.arc(x + w / 2, (y + h / 2) / sc, w / 2, angle, angle + theta, (theta < 0));
	this._ctx.stroke();
	this._ctx.restore();
	return true;
}

// 円弧を塗りつぶし描画する
Graphics.prototype.fillArc = function(x, y, w, h, angle, theta)
{
	if(this._ctx == null) return false;
	var sc = h / w;
	this._ctx.save();
	this._ctx.beginPath();
	this._ctx.scale(1, sc);
	this._ctx.arc(x + w / 2, (y + h / 2) / sc, w / 2, angle, angle + theta, (theta < 0));
	this._ctx.lineTo(x + w / 2, (y + h / 2) / sc);
	this._ctx.closePath();
	this._ctx.fill();
	this._ctx.restore();
	return true;
}

// 広域アルファ値を設定する
Graphics.prototype.setGlobalAlpha = function(a)
{
	if(this._ctx == null) return false;
	if(a < 0) a = 0;
	if(a > 255) a = 255;
	this._ctx.globalAlpha = a / 255;
	return true;
}

// 描画色をColorオブジェクトで設定する
Graphics.prototype.setColor = function(color)
{
	if(this._ctx == null) return false;
	this._color = new Color(color.r, color.g, color.b, color.a);
	var val = "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + (color.a / 255) + ")";
	this._ctx.strokeStyle = val;
	this._ctx.fillStyle = val;
	return true;
}

// 描画文字列フォントを設定する
Graphics.prototype.setFont = function(font)
{
	if(this._ctx == null) return false;
	var str = "";
	if(font._style & Font.ITALIC) str += "italic ";
	if(font._style & Font.BOLD) str += "bold ";
	str += font._size + "px ";
	if(font._name == Font.SERIF) str += "serif";
	else if(font._name == Font.SANS_SERIF) str += "sans-serif";
	else if(font._name == Font.MONOSPACED) str += "monospace";
	else if(font._name == Font.DIALOG) str += "'Helvetica','Arial','ＭＳ ゴシック','HG ゴシックB Sun','HG ゴシックB',monospace";
	else str += '"' + font._name + '"';
	this._ctx.font = str;
	this._font = font;
	return true;
}

// 文字列を描画する
Graphics.prototype.drawString = function(str, x, y)
{
	if(this._ctx == null) return false;
	this._ctx.fillText(str, x, y);
	return true;
}

// 座標軸を移動する
Graphics.prototype.translate = function(x, y)
{
	if(this._ctx == null) return false;
	this._ctx.translate(x, y);
	return true;
}

// 座標軸を回転させる
Graphics.prototype.rotate = function(angle, x, y)
{
	if(this._ctx == null) return false;
	if(arguments.length == 1)
	{
		this._ctx.rotate(angle);
	}
	else
	{
		this._ctx.translate(x, y);
		this._ctx.rotate(angle);
		this._ctx.translate(-x, -y);
	}
	return true;
}

// 座標軸を拡大縮小する
Graphics.prototype.scale = function(x, y)
{
	if(this._ctx == null) return false;
	this._ctx.scale(x, y);
	return true;
}

// クリッピング領域を設定する
// 第１引数: パターン( "ellipse", "rect", "polygon" )
// 第２引数～:
//   "ellipse", x, y, w, h
//   "rect", x, y, w, h
//   "polygon", xa, ya, pn
Graphics.prototype.setClip = function(pattern)
{
	if(this._ctx == null) return false;
	if(pattern == "ellipse")
	{
		var sc = arguments[4] / arguments[3];
		this._ctx.beginPath();
		this._ctx.save();
		this._ctx.scale(1, sc);
		this._ctx.arc(arguments[1] + arguments[3] / 2, (arguments[2] + arguments[4] / 2) / sc, arguments[3] / 2, 0, Math.PI * 2, false);
		this._ctx.restore();
		this._ctx.clip();
		return true;
	}
	else if(pattern == "rect")
	{
		this._ctx.beginPath();
		this._ctx.rect(arguments[1], arguments[2], arguments[3], arguments[4]);
		this._ctx.clip();
		return true;
	}
	else if(pattern == "polygon")
	{
		this._ctx.beginPath();
		this._ctx.moveTo(arguments[1][0], arguments[2][0]);
		for(var i = 1; i < arguments[3]; i++)
		{
			this._ctx.lineTo(arguments[1][i], arguments[2][i]);
		}
		this._ctx.closePath();
		this._ctx.clip();
		return true;
	}
	return false;
}

Graphics.prototype.copyArea = function(x, y, width, height, dx, dy)
{
	if(this._ctx == null) return false;
	this._ctx.drawImage(this._ctx.canvas, x, y, width, height, x+dx, y+dy, width, height);
	return true;
}

Graphics.prototype.dispose = function()
{
	this._ctx.restore();
	this._ctx.save();
}







function Color(r, g, b, a)
{
	if(r > 255) this.r = 255;
	else if(r < 0) this.r = 0;
	else this.r = r;
	if(g > 255) this.g = 255;
	else if(g < 0) this.g = 0;
	else this.g = g;
	if(b > 255) this.b = 255;
	else if(b < 0) this.b = 0;
	else this.b = b;
	if(arguments.length == 4)
	{
		if(a > 255) this.a = 255;
		else if(a < 0) this.a = 0;
		else this.a = a;
	}
	else
	{
		this.a = 255;
	}
}

Color.prototype.getRed = function()
{
	return this.r;
}

Color.prototype.getGreen = function()
{
	return this.g;
}

Color.prototype.getBlue = function()
{
	return this.b;
}

Color.white = new Color(255, 255, 255);
Color.WHITE = Color.white;
Color.lightGray = new Color(192, 192, 192);
Color.LIGHT_GRAY = Color.lightGray;
Color.gray = new Color(128, 128, 128);
Color.GRAY = Color.gray;
Color.darkGray = new Color(64, 64, 64);
Color.DARK_GRAY = Color.darkGray;
Color.black = new Color(0, 0, 0);
Color.BLACK = Color.black;
Color.red = new Color(255, 0, 0);
Color.RED = Color.red;
Color.pink = new Color(255, 175, 175);
Color.PINK = Color.pink;
Color.orange = new Color(255, 200, 0);
Color.ORANGE = Color.orange;
Color.yellow = new Color(255, 255, 0);
Color.YELLOW = Color.yellow;
Color.green = new Color(0, 255, 0);
Color.GREEN = Color.green;
Color.magenta = new Color(255, 0, 255);
Color.MAGENTA = Color.magenta;
Color.cyan = new Color(0, 255, 255);
Color.CYAN = Color.cyan;
Color.blue = new Color(0, 0, 255);
Color.BLUE = Color.blue;







function Font(name, style, size)
{
	this._name = name;
	this._style = style;
	this._size = size;
}

Font.DIALOG = "Dialog";
Font.DIALOG_INPUT = "DialogInput";
Font.MONOSPACED = "Monospaced";
Font.SANS_SERIF = "SansSerif";
Font.SERIF = "Serif";

Font.PLAIN = 0;
Font.BOLD = 1;
Font.ITALIC = 2;


