/**
 * 画像やスクリーンのバッファリングに関するクラスまとめ
 */

/**
 * 画像管理クラス
 * @param w {number} 画像の横幅
 * @param h {number} 画像の高さ
 * @constructor
 */
class ImageBuff implements ImageBuff {
	_dat: HTMLCanvasElement | HTMLImageElement | null;
	_width: number;
	_height: number;
	_loaded: boolean;
	_error: boolean;
	_g: Graphics | null;
	_g_bk: GraphicsBk | null;

	constructor();
	constructor(w: number, h: number);
	constructor(w?: number, h?: number) {
		if (w !== undefined && h !== undefined) {
			this._dat = document.createElement("canvas");
			this._dat.width = w;
			this._dat.height = h;
			this._width = w;
			this._height = h;
			var ctx = this._dat.getContext("2d");
			if (ctx) {
				ctx.lineWidth = 1.6;
				ctx.lineCap = "round";
				ctx.save();
			}
		} else {
			this._dat = null;
			this._width = -1;
			this._height = -1;
		}
		this._loaded = false;
		this._error = false;
		this._g = null;
		this._g_bk = null;
	}

	/**
	 * 画像を読み込む
	 * @param url {string} 読み込む画像のパス(相対パス、URLともに可)
	 */
	load(url: string) {
		this._loaded = false;
		this._error = false;
		this._width = -1;
		this._height = -1;
		this._dat = new Image();
		var _this = this;
		this._dat.onload = function() {
			ImageBuff_onload(_this);
		};
		this._dat.onerror = function() {
			ImageBuff_onerror(_this);
		};
		this._dat.onabort = function() {
			ImageBuff_onerror(_this);
		};
		this._dat.src = url;
		if (this._dat.complete) {
			this.onload();
		}
	}

	/**
	 * 画像のロード完了時に行われる処理
	 */
	onload() {
		this._loaded = true;
		if (this._dat instanceof Image) {
			this._width = this._dat.naturalWidth;
			this._height = this._dat.naturalHeight;
		}
	}

	/**
	 * 画像のロード時にエラーが発生した場合に行われる処理
	 */
	onerror() {
		this._error = true;
		this._dat = null;
	}

	/**
	 * 画像バッファを編集するためのクラスGraphicsを返す
	 * Canvasモードでないと使えない
	 * @returns {Graphics} Graphicsオブジェクト
	 */
	getGraphics() {
		if (this._width < 0) return null;
		this._g = new Graphics(this);
		return this._g;
	}

	/**
	 * getGraphicsの別名
	 * @returns {Graphics}
	 */
	createGraphics() {
		return this.getGraphics();
	}

	/**
	 * JavaのGraphicsと互換を保ったGraphicsBkオブジェクトを作成（JS拡張との互換性のため）
	 * @returns {GraphicsBk} GraphicsBkオブジェクト
	 */
	getGraphicsBk() {
		if (this._width < 0) return null;
		this._g_bk = new GraphicsBk(this);
		return this._g_bk;
	}
}

function ImageBuff_onload(obj: ImageBuff) {
	obj.onload();
}
function ImageBuff_onerror(obj: ImageBuff) {
	obj.onerror();
}

/**
 * 画像編集クラス
 * @param img {ImageBuff} もととなるImageBuffオブジェクト
 * @constructor
 */
class Graphics {
	_ctx: CanvasRenderingContext2D | null = null;
	_color: Color;
	_font: Font;

	constructor(img: ImageBuff) {
		if (img._dat && !("src" in img._dat)) {
			this._ctx = img._dat.getContext("2d");
		}
		if (this._ctx) {
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
	drawLine(x1: number, y1: number, x2: number, y2: number) {
		if (this._ctx == null) return false;
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
	drawImage(img: ImageBuff, dx: number, dy: number, ap?: unknown): boolean;
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
	drawImage(img: ImageBuff, dx: number, dy: number, dw: number, dh: number, ap?: unknown): boolean;
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
	 * @param dw {number} 描画される横方向の幅
	 * @param dh {number} 描画される縦方向の高さ
	 * @returns {boolean} 描画に成功したかどうか
	 */
	drawImage(
		img: ImageBuff,
		sx: number,
		sy: number,
		sw: number,
		sh: number,
		dx: number,
		dy: number,
		dw: number,
		dh: number,
		ap?: unknown
	): boolean;
	drawImage(
		img: ImageBuff,
		a1: number,
		a2: number,
		a3?: number,
		a4?: number,
		a5?: number,
		a6?: number,
		a7?: number,
		a8?: number,
		a9?: unknown
	) {
		if (img._dat == null) return false;
		if (this._ctx == null) return false;
		try {
			if (a3 === undefined || a4 === undefined) {
				this._ctx.drawImage(img._dat, a1, a2);
				return true;
			} else if (a5 === undefined || a6 === undefined || a7 === undefined || a8 === undefined) {
				this._ctx.drawImage(img._dat, a1, a2, a3, a4);
				return true;
			} else {
				this._ctx.drawImage(img._dat, a1, a2, a3, a4, a5, a6, a7, a8);
				return true;
			}
		} catch (e) {}
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
	drawRect(x: number, y: number, w: number, h: number) {
		if (this._ctx == null) return false;
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
	fillRect(x: number, y: number, w: number, h: number) {
		if (this._ctx == null) return false;
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
	drawPolygon(xa: number[], ya: number[], pn: number) {
		if (this._ctx == null) return false;
		this._ctx.beginPath();
		this._ctx.moveTo(xa[0], ya[0]);
		for (var i = 1; i < pn; i++) {
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
	fillPolygon(xa: number[], ya: number[], pn: number) {
		if (this._ctx == null) return false;
		this._ctx.beginPath();
		this._ctx.moveTo(xa[0], ya[0]);
		for (var i = 1; i < pn; i++) {
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
	drawOval(x: number, y: number, w: number, h: number) {
		if (this._ctx == null) return false;
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
	fillOval(x: number, y: number, w: number, h: number) {
		if (this._ctx == null) return false;
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
	drawArc(x: number, y: number, w: number, h: number, angle: number, theta: number) {
		if (this._ctx == null) return false;
		var sc = h / w;
		this._ctx.save();
		this._ctx.beginPath();
		this._ctx.scale(1, sc);
		this._ctx.arc(x + w / 2, (y + h / 2) / sc, w / 2, angle, angle + theta, theta < 0);
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
	fillArc(x: number, y: number, w: number, h: number, angle: number, theta: number) {
		if (this._ctx == null) return false;
		var sc = h / w;
		this._ctx.save();
		this._ctx.beginPath();
		this._ctx.scale(1, sc);
		this._ctx.arc(x + w / 2, (y + h / 2) / sc, w / 2, angle, angle + theta, theta < 0);
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
	setGlobalAlpha(a: number) {
		if (this._ctx == null) return false;
		if (a < 0) a = 0;
		if (a > 255) a = 255;
		this._ctx.globalAlpha = a / 255;
		return true;
	}

	/**
	 * 描画色をColorオブジェクトで設定する
	 * @param color {Color} 描画色
	 * @returns {boolean} 設定に成功したかどうか
	 */
	setColor(color: Color) {
		if (this._ctx == null) return false;
		this._color = new Color(color.r, color.g, color.b, color.a);
		var val = "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a / 255 + ")";
		this._ctx.strokeStyle = val;
		this._ctx.fillStyle = val;
		return true;
	}

	/**
	 * 描画文字列フォントを設定する
	 * @param font {Font} 設定するFontオブジェクト
	 * @returns {boolean} 設定に成功したかどうか
	 */
	setFont(font: Font) {
		if (this._ctx == null) return false;

		let str = "";

		if (font._style & Font.ITALIC) str += "italic ";
		if (font._style & Font.BOLD) str += "bold ";

		str += `${font._size}px `;

		if (font._name === Font.SERIF) str += Font.SERIF_str;
		else if (font._name === Font.SANS_SERIF) str += Font.SANS_SERIF_str;
		else if (font._name === Font.MONOSPACED) str += Font.MONOSPACED_str;
		else if (font._name === Font.DIALOG) str += Font.DIALOG_str;
		else if (
			font._name.split(",").length > 1 ||
			font._name.match(/^(sans-serif|serif|monospace|cursive|fantasy|system-ui)$/)
		)
			str += font._name;
		else str += `"${font._name}"`;

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
	drawString(str: string, x: number, y: number) {
		if (this._ctx == null) return false;
		this._ctx.fillText(str, x, y);
		return true;
	}

	/**
	 * 座標軸を移動する
	 * @param x {number} X方向の移動距離
	 * @param y {number} Y方向の移動距離
	 * @returns {boolean} 成功したかどうか
	 */
	translate(x: number, y: number) {
		if (this._ctx == null) return false;
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
	rotate(angle: number, x: number, y: number) {
		if (this._ctx == null) return false;
		if (arguments.length == 1) {
			this._ctx.rotate(angle);
		} else {
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
	scale(x: number, y: number) {
		if (this._ctx == null) return false;
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
	setClip(pattern: "ellipse", x: number, y: number, w: number, h: number): boolean;
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
	setClip(pattern: "rect", x: number, y: number, w: number, h: number): boolean;
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
	setClip(pattern: "polygon", xa: number[], ya: number[], pn: number): boolean;
	setClip(pattern: string, a1: number | number[], a2: number | number[], a3: number, a4?: number) {
		if (this._ctx == null) return false;
		if (pattern == "ellipse") {
			var sc = a4! / a3;
			this._ctx.beginPath();
			this._ctx.save();
			this._ctx.scale(1, sc);
			this._ctx.arc((a1 as number) + a3 / 2, ((a2 as number) + a4! / 2) / sc, a3 / 2, 0, Math.PI * 2, false);
			this._ctx.restore();
			this._ctx.clip();
			return true;
		} else if (pattern == "rect") {
			this._ctx.beginPath();
			this._ctx.rect(a1 as number, a2 as number, a3, a4!);
			this._ctx.clip();
			return true;
		} else if (pattern == "polygon") {
			this._ctx.beginPath();
			this._ctx.moveTo((a1 as number[])[0], (a2 as number[])[0]);
			for (var i = 1; i < a3; i++) {
				this._ctx.lineTo((a1 as number[])[i], (a2 as number[])[i]);
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
	 * @param dx {number} X方向の移動距離
	 * @param dy {number} Y方向の移動距離
	 * @returns {boolean}
	 */
	copyArea(x: number, y: number, width: number, height: number, dx: number, dy: number) {
		if (this._ctx == null) return false;
		this._ctx.drawImage(this._ctx.canvas, x, y, width, height, x + dx, y + dy, width, height);
		return true;
	}

	/**
	 * 描画等で加えた変更を破棄して元の画像に戻す
	 */
	dispose() {
		if (this._ctx) {
			this._ctx.restore();
			this._ctx.save();
		}
	}
}

/**
 * JavaのGraphicsとの後方互換性を保つためのクラス (Graphicsを継承)
 * @param img {ImageBuff} もととなるImageBuffオブジェクト
 * @constructor
 */
class GraphicsBk extends Graphics {
	constructor(img: ImageBuff) {
		super(img);
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
	drawImage(img: ImageBuff, dx: number, dy: number, ap?: unknown): boolean;
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
	drawImage(img: ImageBuff, dx: number, dy: number, dw: number, dh: number, ap?: unknown): boolean;
	/**
	 * 画像を描画する
	 * @method
	 * @memberOf Graphics.prototype
	 * @name drawImage
	 * @variation 3
	 * @param img {ImageBuff} ImageBuffオブジェクト
	 * @param dx1 {number} 描画先矩形の1番目の隅のX座標
	 * @param dy1 {number} 描画先矩形の1番目の隅のY座標
	 * @param dx2 {number} 描画先矩形の2番目の隅のX座標
	 * @param dy2 {number} 描画先矩形の2番目の隅のY座標
	 * @param sx1 {number} ソース画像矩形の1番目の隅のX座標
	 * @param sy1 {number} ソース画像矩形の1番目の隅のY座標
	 * @param sx2 {number} ソース画像矩形の2番目の隅のX座標
	 * @param sy2 {number} ソース画像矩形の2番目の隅のY座標
	 * @returns {boolean} 描画に成功したかどうか
	 */
	drawImage(
		img: ImageBuff,
		dx1: number,
		dy1: number,
		dx2: number,
		dy2: number,
		sx1: number,
		sy1: number,
		sx2: number,
		sy2: number,
		ap?: unknown
	): boolean;
	/**
	 * 画像を描画する
	 * GraphicsクラスのdrawImage()との違いは、引数を9個与えた際に幅・高さの指定の代わりに終点のX座標とY座標を指定すること
	 */
	drawImage(
		img: ImageBuff,
		a1: number,
		a2: number,
		a3?: number,
		a4?: number,
		a5?: number,
		a6?: number,
		a7?: number,
		a8?: number,
		a9?: unknown
	) {
		if (img._dat == null) return false;
		if (this._ctx == null) return false;
		if (a3 === undefined || a4 === undefined) {
			this._ctx.drawImage(img._dat, a1, a2);
			return true;
		} else if (a5 === undefined || a6 === undefined || a7 === undefined || a8 === undefined) {
			// 引数5-6個の場合, (a1, a2): 描画先座標
			// (a3, a4): 拡大/縮小後の大きさ
			// 大きさが負の場合は反転する必要あり
			this._ctx.save();
			if (a3 < 0) {
				// X方向に反転
				this._ctx.translate(-a1, 0);
				this._ctx.scale(-1, 1);
				this._ctx.translate(a1, 0);
			}
			if (a4 < 0) {
				// Y方向に反転
				this._ctx.translate(0, -a2);
				this._ctx.scale(1, -1);
				this._ctx.translate(0, a2);
			}
			this._ctx.drawImage(img._dat, a1, a2, Math.abs(a3), Math.abs(a4));
			this._ctx.restore();
			return true;
		} else {
			// 引数9-10個の場合，(a1, a2): 描画先の左上の座標
			// (a3, a4): 描画先の右下の座標
			// (a5, a6): ソース図形の左上の座標
			// (a7, a8): ソース図形の右下の座標
			this._ctx.save();
			if (a3 < a1) {
				// 描画先がX方向に反転
				this._ctx.translate(a1, 0);
				this._ctx.scale(-1, 1);
				this._ctx.translate(-a1, 0);
			}
			if (a4 < a2) {
				// 描画先がY方向に反転
				this._ctx.translate(0, a2);
				this._ctx.scale(1, -1);
				this._ctx.translate(0, -a2);
			}
			if (a7 < a5) {
				// ソース画像がX方向に反転
				this._ctx.translate(a3, 0);
				this._ctx.scale(-1, 1);
				this._ctx.translate(-a1, 0);
			}
			if (a8 < a6) {
				// ソース画像がY方向に反転
				this._ctx.translate(0, a4);
				this._ctx.scale(1, -1);
				this._ctx.translate(0, -a2);
			}
			this._ctx.drawImage(img._dat, a5, a6, a7 - a5, a8 - a6, a1, a2, Math.abs(a3 - a1), Math.abs(a4 - a2));
			this._ctx.restore();
			return true;
		}
		return false;
	}
}

/**
 * 色を表現するクラス
 * @param r {number} R(0-255)
 * @param g {number} G(0-255)
 * @param b {number} B(0-255)
 * @param [a=255] {number} アルファ値(0-255)
 * @constructor
 */
class Color {
	r: number;
	g: number;
	b: number;
	a: number;

	constructor(r: number, g: number, b: number, a?: number) {
		if (r > 255) this.r = 255;
		else if (r < 0) this.r = 0;
		else this.r = r;
		if (g > 255) this.g = 255;
		else if (g < 0) this.g = 0;
		else this.g = g;
		if (b > 255) this.b = 255;
		else if (b < 0) this.b = 0;
		else this.b = b;
		if (a !== undefined) {
			if (a > 255) this.a = 255;
			else if (a < 0) this.a = 0;
			else this.a = a;
		} else {
			this.a = 255;
		}
	}

	/**
	 * 赤色の値を取得する
	 * @returns {number|*}
	 */
	getRed() {
		return this.r;
	}

	/**
	 * 緑色の値を取得する
	 * @returns {number|*}
	 */
	getGreen() {
		return this.g;
	}

	/**
	 * 青色の値を取得する
	 * @returns {number|*}
	 */
	getBlue() {
		return this.b;
	}

	static white = new Color(255, 255, 255);
	static WHITE = Color.white;
	static lightGray = new Color(192, 192, 192);
	static LIGHT_GRAY = Color.lightGray;
	static gray = new Color(128, 128, 128);
	static GRAY = Color.gray;
	static darkGray = new Color(64, 64, 64);
	static DARK_GRAY = Color.darkGray;
	static black = new Color(0, 0, 0);
	static BLACK = Color.black;
	static red = new Color(255, 0, 0);
	static RED = Color.red;
	static pink = new Color(255, 175, 175);
	static PINK = Color.pink;
	static orange = new Color(255, 200, 0);
	static ORANGE = Color.orange;
	static yellow = new Color(255, 255, 0);
	static YELLOW = Color.yellow;
	static green = new Color(0, 255, 0);
	static GREEN = Color.green;
	static magenta = new Color(255, 0, 255);
	static MAGENTA = Color.magenta;
	static cyan = new Color(0, 255, 255);
	static CYAN = Color.cyan;
	static blue = new Color(0, 0, 255);
	static BLUE = Color.blue;
}

/**
 * フォントを表現するクラス
 * @param name {string} フォント名
 * @param style {string} フォントのスタイル指定 (0:通常 1:太字 2:イタリック)
 * @param size {number} フォントサイズ
 * @constructor
 */
class Font {
	_name: string;
	_style: number;
	_size: number;

	constructor(name: string, style: number, size: number) {
		this._name = name;
		this._style = style;
		this._size = size;
	}

	static DIALOG = "Dialog";
	static DIALOG_INPUT = "DialogInput";
	static MONOSPACED = "Monospaced";
	static SANS_SERIF = "SansSerif";
	static SERIF = "Serif";

	static PLAIN = 0;
	static BOLD = 1;
	static ITALIC = 2;

	static SERIF_str = "'Times New Roman','ＭＳ 明朝',serif";
	static SANS_SERIF_str = "Arial,'ＭＳ ゴシック',sans-serif";
	static MONOSPACED_str = "'Courier New',monospace";
	static DIALOG_str = "'Helvetica','Arial','ＭＳ ゴシック','HG ゴシックB Sun','HG ゴシックB',monospace";
}

export { ImageBuff, Graphics, Color, Font };
