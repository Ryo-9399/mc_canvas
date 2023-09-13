// 読み込むとCanvasMasaoがMasaoKani2になる用のスクリプト

// すでに出来上がっているCanvasMasao.MasaoConstructionプロトタイプの
// プロパティメソッドuserInitとuserSubをオーバーライドして書き換える

// userInit: MasaoKani2のインスタンスをMasaoConstructionのプロパティに代入する
CanvasMasao.MasaoConstruction.prototype.userInit = function () {
	this.masaoKani2 = new CanvasMasao.MasaoKani2(this);
};

// userSub: MasaoKani2のメソッドmasaoEvent(g, image)を呼び出す
CanvasMasao.MasaoConstruction.prototype.userSub = function (g, image) {
	this.masaoKani2.masaoEvent(g, image);
};
