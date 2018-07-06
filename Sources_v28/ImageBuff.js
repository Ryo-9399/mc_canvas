/**
 * 画像やスクリーンのバッファリングに関するクラスまとめ
 */

/**
 * 画像管理クラス
 * @param w {number} 画像の横幅
 * @param h {number} 画像の高さ
 * @constructor
 */
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

/**
 * 画像を読み込む
 * @param url {string} 読み込む画像のパス(相対パス、URLともに可)
 */
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

/**
 * 画像のロード完了時に行われる処理
 */
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

/**
 * 画像のロード時にエラーが発生した場合に行われる処理
 */
ImageBuff.prototype.onerror = function()
{
	this._error = true;
	this._dat = null;
}

function ImageBuff_onerror(obj)
{
	obj.onerror();
}

/**
 * 画像バッファを編集するためのクラスGraphicsを返す
 * Canvasモードでないと使えない
 * @returns {Graphics} Graphicsオブジェクト
 */
ImageBuff.prototype.getGraphics = function()
{
	if(this._width < 0) return null;
	this._g = new Graphics(this);
	return this._g;
}

/**
 * getGraphicsの別名
 * @returns {Graphics}
 */
ImageBuff.prototype.createGraphics = function()
{
	return this.getGraphics();
}








/**
 * 画像編集クラス
 * @param img {ImageBuff} もととなるImageBuffオブジェクト
 * @constructor
 */
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

/**
 * 線分を描画する
 * @param x1 {number} 始点のX座標
 * @param y1 {number} 始点のY座標
 * @param x2 {number} 終点のX座標
 * @param y2 {number} 終点のY座標
 * @returns {boolean} 描画に成功したかどうか
 */
Graphics.prototype.drawLine = function(x1, y1, x2, y2)
{
	if(this._ctx == null) return false;
	this._ctx.beginPath();
	this._ctx.moveTo(x1, y1);
	this._ctx.lineTo(x2, y2);
	this._ctx.stroke();
	return true;
}

/**
 * 画像を描画する
 * @method
 * @memberOf Graphics.prototype
 * @name drawImage
 * @variation 1
 * @param img {ImageBuff} ImageBuffオブジェクト
 * @param dx {number} 描画先X座標
 * @param dy {number} 描画先Y座標
 * @returns {boolean} 描画に成功したかどうか
 */
/**
 * 画像を描画する
 * @method
 * @memberOf Graphics.prototype
 * @name drawImage
 * @variation 2
 * @param img {ImageBuff} ImageBuffオブジェクト
 * @param dx {number} 描画先X座標
 * @param dy {number} 描画先Y座標
 * @param dw {number} 描画される横方向の幅
 * @param dh {number} 描画される縦方向の高さ
 * @returns {boolean} 描画に成功したかどうか
 */
/**
 * 画像を描画する
 * @method
 * @memberOf Graphics.prototype
 * @name drawImage
 * @variation 3
 * @param img {ImageBuff} ImageBuffオブジェクト
 * @param sx {number} imgから切り出すX座標
 * @param sy {number} imgから切り出すY座標
 * @param sw {number} 切り出してくる横方向の幅
 * @param sh {number} 切り出してくる縦方向の高さ
 * @param dx {number} 描画先X座標
 * @param dy {number} 描画先Y座標
 * @param [dw] {number} 描画される横方向の幅
 * @param [dh] {number} 描画される縦方向の高さ
 * @returns {boolean} 描画に成功したかどうか
 */
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

/**
 * 矩形を描画する
 * @param x {number} X座標
 * @param y {number} Y座標
 * @param w {number} 横幅
 * @param h {number} 高さ
 * @returns {boolean} 描画に成功したかどうか
 */
Graphics.prototype.drawRect = function(x, y, w, h)
{
	if(this._ctx == null) return false;
	this._ctx.strokeRect(x, y, w, h);
	return true;
}

/**
 * 矩形を塗りつぶし描画する
 * @param x {number} X座標
 * @param y {number} Y座標
 * @param w {number} 横幅
 * @param h {number} 高さ
 * @returns {boolean} 描画に成功したかどうか
 */
Graphics.prototype.fillRect = function(x, y, w, h)
{
	if(this._ctx == null) return false;
	this._ctx.fillRect(x, y, w, h);
	return true;
}

/**
 * 多角形を描画する
 * @param xa {number[]} 頂点のX座標を格納した配列
 * @param ya {number[]} 頂点のY座標を格納した配列
 * @param pn {number} 多角形の頂点数
 * @returns {boolean} 描画に成功したかどうか
 */
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

/**
 * 多角形を塗りつぶし描画する
 * @param xa {number[]} 頂点のX座標を格納した配列
 * @param ya {number[]} 頂点のY座標を格納した配列
 * @param pn {number} 多角形の頂点数
 * @returns {boolean} 描画に成功したかどうか
 */
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

/**
 * 楕円を描画する
 * @param x {number} X座標
 * @param y {number} Y座標
 * @param w {number} 横幅
 * @param h {number} 高さ
 * @returns {boolean} 描画に成功したかどうか
 */
Graphics.prototype.drawOval = function(x, y, w, h)
{
	if(this._ctx == null) return false;
	this.drawArc(x, y, w, h, 0, Math.PI * 2);
	return true;
}

/**
 * 楕円を塗りつぶし描画する
 * @param x {number} X座標
 * @param y {number} Y座標
 * @param w {number} 横幅
 * @param h {number} 高さ
 * @returns {boolean} 描画に成功したかどうか
 */
Graphics.prototype.fillOval = function(x, y, w, h)
{
	if(this._ctx == null) return false;
	this.fillArc(x, y, w, h, 0, Math.PI * 2);
	return true;
}

/**
 * 円弧を描画する
 * @param x {number} X座標
 * @param y {number} Y座標
 * @param w {number} 横幅
 * @param h {number} 高さ
 * @param angle {number} 描画を開始するラジアン角
 * @param theta {number} 始点から終点までのラジアン角
 * @returns {boolean} 描画に成功したかどうか
 */
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

/**
 * 円弧を描画する
 * @param x {number} X座標
 * @param y {number} Y座標
 * @param w {number} 横幅
 * @param h {number} 高さ
 * @param angle {number} 描画を開始するラジアン角
 * @param theta {number} 始点から終点までのラジアン角
 * @returns {boolean} 描画に成功したかどうか
 */
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

/**
 * 広域アルファ値を設定する
 * @param a {number} 0から255までのアルファ値
 * @returns {boolean} 設定に成功したかどうか
 */
Graphics.prototype.setGlobalAlpha = function(a)
{
	if(this._ctx == null) return false;
	if(a < 0) a = 0;
	if(a > 255) a = 255;
	this._ctx.globalAlpha = a / 255;
	return true;
}

/**
 * 描画色をColorオブジェクトで設定する
 * @param color {Color} 描画色
 * @returns {boolean} 設定に成功したかどうか
 */
Graphics.prototype.setColor = function(color)
{
	if(this._ctx == null) return false;
	this._color = new Color(color.r, color.g, color.b, color.a);
	var val = "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + (color.a / 255) + ")";
	this._ctx.strokeStyle = val;
	this._ctx.fillStyle = val;
	return true;
}

/**
 * 描画文字列フォントを設定する
 * @param font {Font} 設定するFontオブジェクト
 * @returns {boolean} 設定に成功したかどうか
 */
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

/**
 * 文字列を描画する
 * @param str {string} 描画する文字列
 * @param x {number} X座標
 * @param y {number} Y座標
 * @returns {boolean} 描画に成功したかどうか
 */
Graphics.prototype.drawString = function(str, x, y)
{
	if(this._ctx == null) return false;
	this._ctx.fillText(str, x, y);
	return true;
}

/**
 * 座標軸を移動する
 * @param x {number} X方向の移動距離
 * @param y {number} Y方向の移動距離
 * @returns {boolean} 成功したかどうか
 */
Graphics.prototype.translate = function(x, y)
{
	if(this._ctx == null) return false;
	this._ctx.translate(x, y);
	return true;
}

/**
 * 座標軸を回転させる
 * @param angle {number} 回転させるラジアン角
 * @param [x] {number} 回転の中心となるX座標
 * @param [y] {number} 回転の中心となるY座標
 * @returns {boolean} 成功したかどうか
 */
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

/**
 * 座標軸を拡大縮小する
 * @param x {number} X方向の拡大倍率
 * @param y {number} Y方向の拡大倍率
 * @returns {boolean} 成功したかどうか
 */
Graphics.prototype.scale = function(x, y)
{
	if(this._ctx == null) return false;
	this._ctx.scale(x, y);
	return true;
}

/**
 * クリッピング領域を設定する
 * @method
 * @memberOf Graphics.prototype
 * @name setClip
 * @variation 1
 * @param pattern {"elipse"} パターン (円弧状)
 * @param x {number} X座標
 * @param y {number} Y座標
 * @param w {number} 横幅
 * @param h {number} 高さ
 * @returns {boolean}
 */
/**
 * クリッピング領域を設定する
 * @method
 * @memberOf Graphics.prototype
 * @name setClip
 * @variation 2
 * @param pattern {"rect"} パターン (矩形)
 * @param x {number} X座標
 * @param y {number} Y座標
 * @param w {number} 横幅
 * @param h {number} 高さ
 * @returns {boolean}
 */
/**
 * クリッピング領域を設定する
 * @method
 * @memberOf Graphics.prototype
 * @name setClip
 * @variation 3
 * @param pattern {"polygon"} パターン (多角形)
 * @param xa {number[]} 頂点のX座標を格納した配列
 * @param ya {number[]} 頂点のY座標を格納した配列
 * @param pn {number} 多角形の頂点数
 * @returns {boolean}
 */
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

/**
 * 自身の画像の一部を別の座標にコピーする
 * @param x {number} 切り出すX座標
 * @param y {number} 切り出すY座標
 * @param width {number} 切り出す横幅
 * @param height {number} 切り出す高さ
 * @param dx {number} コピー先のX座標
 * @param dy {number} コピー先のY座標
 * @returns {boolean}
 */
Graphics.prototype.copyArea = function(x, y, width, height, dx, dy)
{
	if(this._ctx == null) return false;
	this._ctx.drawImage(this._ctx.canvas, x, y, width, height, x+dx, y+dy, width, height);
	return true;
}

/**
 * 描画等で加えた変更を破棄して元の画像に戻す
 */
Graphics.prototype.dispose = function()
{
	this._ctx.restore();
	this._ctx.save();
}






/**
 * 色を表現するクラス
 * @param r {number} R(0-255)
 * @param g {number} G(0-255)
 * @param b {number} B(0-255)
 * @param [a=255] {number} アルファ値(0-255)
 * @constructor
 */
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

/**
 * 赤色の値を取得する
 * @returns {number|*}
 */
Color.prototype.getRed = function()
{
	return this.r;
}

/**
 * 緑色の値を取得する
 * @returns {number|*}
 */
Color.prototype.getGreen = function()
{
	return this.g;
}

/**
 * 青色の値を取得する
 * @returns {number|*}
 */
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


/**
 * フォントを表現するクラス
 * @param name {string} フォント名
 * @param style {string} フォントのスタイル指定 (0:通常 1:太字 2:イタリック)
 * @param size {number} フォントサイズ
 * @constructor
 */
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

export {
	ImageBuff,
	Color,
	Font,
};
