// idがある場合，そのidの配下に設置
// idがない場合，呼ばれた場所にdocument.writeし設置
function Game(params, id){
	var randomID = makeRandomString();

	// DivエレメントID
	if(id){
		// idを持つ要素の配下に設置する
		this.__boxID = id;
	}else{
		// idが無ければ現在の場所に作る
		// ドキュメント書き込み文
		this.__boxID = "__mcdiv" + randomID;
		document.write("<div id='" + this.__boxID + "'>");
	}

	// キャンバスID
	this.__canvasID = "__mccanvas" + randomID;

	// ソフトパッドDivID
	this.__padDivID = "__mcpaddiv" + randomID;

	// 要素格納Divエレメント
	this.__box = document.getElementById(this.__boxID);

	// メインCanvasオブジェクト
	this.__canvas = document.createElement("canvas");
	this.__canvas.id = this.__canvasID;
	this.__canvas.width = 512;
	this.__canvas.height = 320;
	this.__canvas.textContent = "※お使いのブラウザはHTML5に対応していないため表示できません。";
	this.__box.appendChild(this.__canvas);

	// ソフトパッド格納Divエレメント
	// タッチスクリーン対応の端末ではソフトウェアパッドも表示する
	this.__padDiv = document.createElement("div");
	this.__padDiv.id = this.__padDivID;
	this.__box.appendChild(this.__padDiv);

	// デバッグ時に下のコメントアウトを外すと便利
	//document.write('<canvas width="700" height="700" id="testcanvas"></canvas>');
	//document.write('<div id="testdiv"></div>');

	// テストCanvas
	this.__testCanvas = document.getElementById("testcanvas");
	// テストDIV
	this.__testDiv = document.getElementById("testdiv");
	this.__teo = {};

	if(!this.__canvas) return;
	if(!this.__canvas.getContext) return;

	// ソフトウェアパッド用変数
	//var __pad_btn;
	this.__pad_before = new Array(8);
	this.__pad_after = new Array(8);
	this.__pad_touches = [];
	this.__pad_coords = [
		[410, 30, 490, 30, 490, 170, 410, 170],
		[320, 30, 400, 30, 400, 170, 320, 170],
		[250, 30, 290, 30, 290, 70, 250, 70],
		[200, 30, 240, 30, 240, 70, 200, 70],
		[5, 60, 87, 60, 87, 140, 5, 140],
		[175, 60, 93, 60, 93, 140, 175, 140],
		[30, 5, 30, 80, 150, 80, 150, 5],
		[30, 195, 30, 120, 150, 120, 150, 195]
		// 方向キーは重ねて縦・横同時押しができるようにする
	];
	this.__pad_chars = [
		"X", "Z", "T", "P", "←", "→", "↑", "↓"
	];

	// タッチスクリーン対応端末での処理
	if(window.TouchEvent)
	{
		var ss;

		// 表示/非表示切り替えボタン設定
		var __pad_btn = document.createElement("input");
		__pad_btn.type = "button";
		__pad_btn.value = "バーチャル操作パッド 表示 / 非表示";
		ss = __pad_btn.style;
		ss.width = "24em";
		ss.height = "2.5em";
		__pad_btn.onclick = function()
		{
			if(__pad.style.display == "inline")
				__pad.style.display = "none";
			else
				__pad.style.display = "inline";
		}
		// ボタン配置
		this.__padDiv.appendChild(__pad_btn);

		// 改行
		this.__padDiv.appendChild(document.createElement("br"));

		// ソフトウェアパッド設定
		var __pad = this.__pad = document.createElement("canvas");
		__pad.width = 500;
		__pad.height = 200;
		var __pad_event = function(e){
			this.__pad_event(e);
		}.bind(this);
		__pad.addEventListener("touchstart", __pad_event, false);
		__pad.addEventListener("touchmove", __pad_event, false);
		__pad.addEventListener("touchend", __pad_event, false);
		__pad.addEventListener("touchcancel", __pad_event, false);
		__pad.style.display = "none";
		// パッド配置
		this.__padDiv.appendChild(__pad);

		ss = __pad.style;
		ss.position = "fixed";
		ss.bottom = "0px";
		ss.left = "0px";
		//ss.textAlign = "right";
		setInterval(function()
		{
			var w = innerWidth;
			var h = innerHeight;
			var rw = (w < h) ? w : h;
			__pad.style.width = w + "px";
			__pad.style.height = (rw*0.4) + "px";
		}, 500);

		this.__pad_off = document.createElement("canvas");
		this.__pad_off.width = 500;
		this.__pad_off.height = 200;
		var ctx = this.__pad_off.getContext("2d");
		ctx.font = "24px monospace";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.lineWidth = 2;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		for(var i = 0; i < 8; i++)
		{
			this.__pad_before[i] = false;
			this.__pad_after[i] = false;
		}
		this.__pad_update();
	}

	// __appimgはMasaoConstruction内へ移動
	// MasaoConstructionオブジェクト
	this.__mc = new MasaoConstruction(params, this.__canvas);
	this.__mc.start();
	var __st = this.__st = this.__mc.getParameter("game_speed");
	if(__st)
	{
		__st = parseInt(__st);
		if(isNaN(__st))
		{
			__st = 70;
		}
		else if(__st < 10)
		{
			__st = 10;
		}
		else if(__st > 300)
		{
			__st = 300;
		}
	}
	else __st = 70;

	this.__pt = 0;

	setInterval(function(){
		this.__loop();
	}.bind(this), __st);
}

// ページ内の全ての正男appletをcanvas正男に置換する
Game.replaceAll = function(){
	window.addEventListener("load",function(){
		var applets = document.getElementsByTagName("applet");
		for(var i=0; i<applets.length; i++){
			var applet = applets[i];
			if(applet.code.match(/masaoconstruction/i)){
				// 正男であるようなら置換
				Game.replaceByDom(applet);
			}
		}
	});
};

// 指定されたidを持つ正男appletをcanvas正男に置換する
Game.replace = function(id){
	// この関数をonload時に呼び出すようにする
	window.addEventListener("load",function()
	{
		// 従来ソースのパラメータを取得
		Game.replaceByDom(document.getElementById(id));
	});
};

Game.replaceByDom = function(paramScope){
	var paramTags = paramScope.getElementsByTagName("param");
	var paramLength = paramTags.length;
	var params = {};
	for(i = 0; i < paramLength; i++)
	{
		params[paramTags[i].name] = paramTags[i].value;
	}
	// 元のappletをdivで置き換える
	var newDiv = document.createElement("div");
	var id = paramScope.id || makeRandomString();
	newDiv.id = id;
	paramScope.parentNode.replaceChild(newDiv, paramScope);
	new Game(params, id);
};


// ループ関数
Game.prototype.__loop = function()
{
	var pt = new Date().getTime();
	if(pt - this.__pt < this.__st) return;
	this.__pt = pt - 10;


	// デバッグ用キャンバス描画
	if(this.__testCanvas)
	{
		var ctx = this.__testCanvas.getContext("2d");
		ctx.fillStyle = "rgb(128,0,128)";
		ctx.fillRect(0,0,700,700);
		ctx.strokeStyle = "#f00";
		var i,j;
		if(this.__mc.gg){
			ctx.save();
			ctx.scale(0.5, 0.5);
			ctx.drawImage(__mc.gg.os_img._dat,0,0);
			//ctx.drawImage(__mc.gg.os2_img._dat,0,832);
			ctx.drawImage(__mc.gg.os2_img._dat,576,0);
			//for(i=0; i<25; i++) for(j=0; j<10; j++) ctx.drawImage(__mc.gg.spt_img[0][i*10+j]._dat, j*48, i*48);
			//for(i=0; i<25; i++) for(j=0; j<10; j++) ctx.drawImage(__mc.gg.spt_img[0][i*10+j]._dat, j*48+640, i*48);
			//for(i=0; i<16; i++) for(j=0; j<16; j++) ctx.drawImage(__mc.gg.smapchip_img[i*16+j]._dat, j*48+832, i*48+832);
			ctx.restore();
			ctx.beginPath();
			for(i=0; i<700; i+=32)
			{
				ctx.moveTo(0,i);
				ctx.lineTo(700,i);
				ctx.moveTo(i,0);
				ctx.lineTo(i,700);
			}
		}
		ctx.stroke();
	}

	// デバッグ用文字表示
	if(this.__testDiv)
	{
		if(this.__mc.mp)
		{
			var mp = this.__mc.mp;
			var str = "<div style='text-align:left'>";
			var prop;
			var type;
			var tmp;
			for(prop in mp)
			{
				type = Object.prototype.toString.call(mp[prop]);
				if(type != "[object Array]" && type != "[object Function]")
				{
					if(!(prop in this.__teo))
					{
						this.__teo[prop] = { val:mp[prop], t:0 };
					}
					else if(this.__teo[prop].t > 0)
					{
						str += "<span style='background-color:rgba(255,255,255,"+ (this.__teo[prop].t / 6) +")'>" + prop + ": " + mp[prop] + "</span> ";
						this.__teo[prop].t--;
					}
					else
					{
						str += prop + ": " + mp[prop] + " ";
					}
					if(this.__teo[prop].val != mp[prop])
					{
						this.__teo[prop].val = mp[prop];
						this.__teo[prop].t = 6;
					}
				}
			}
			this.__testDiv.innerHTML = str + "</div>";
		}
	}

	var t = this.__mc.run();
}

// __repaintはMasaoConstructionへ移動




// ソフトウェアパッド更新関数
Game.prototype.__pad_update = function()
{
	var r = this.__pad.getBoundingClientRect();
	var dx = r.left;
	var dy = r.top;
	var c = this.__pad_off.getContext("2d");
	var i, j, k, tmp, sx, sy;

	c.clearRect(0, 0, 500, 200);
	//c.fillStyle = "rgba(255, 255, 255, 0.3)";
	//c.fillRect(0, 0, 500, 200);
	c.fillStyle = "rgba(128, 128, 128, 0.5)";
	for(i = 0; i < 8; i++)
	{
		c.beginPath();
		tmp = this.__pad_coords[i];
		k = (tmp.length >> 1);
		c.moveTo(tmp[0], tmp[1]);
		for(j = 0; j < k; j++)
		{
			c.lineTo(tmp[(j << 1)], tmp[(j << 1) + 1]);
		}
		c.closePath();
		c.fill();
	}


	for(i = 0; i < 8; i++)
	{
		this.__pad_after[i] = false;
	}


	c.fillStyle = "rgba(0, 0, 0, 0.5)";


	for(i = 0; i < 8; i++)
	{
		c.beginPath();
		tmp = this.__pad_coords[i];
		k = (tmp.length >> 1);
		c.moveTo(tmp[0], tmp[1]);
		for(j = 0; j < k; j++)
		{
			c.lineTo(tmp[(j << 1)], tmp[(j << 1) + 1]);
		}
		c.closePath();
		for(j in this.__pad_touches)
		{
			sx = this.__pad_touches[j].clientX - dx;
			sy = this.__pad_touches[j].clientY - dy;
			this.__pad_after[i] |= c.isPointInPath(sx/r.width*500, sy/r.height*200);
		}
		if(this.__pad_after[i]) c.fill();
	}


	c.strokeStyle = "black";
	c.fillStyle = "black";
	for(i = 0; i < 8; i++)
	{
		c.beginPath();
		tmp = this.__pad_coords[i];
		k = (tmp.length >> 1);
		c.moveTo(tmp[0], tmp[1]);
		sx = tmp[0]; sy = tmp[1];
		for(j = 1; j < k; j++)
		{
			c.lineTo(tmp[(j << 1)], tmp[(j << 1) + 1]);
			sx += tmp[(j << 1)];
			sy += tmp[(j << 1) + 1];
		}
		c.closePath();
		c.stroke();
		c.fillText(this.__pad_chars[i], sx / k, sy / k);
	}
	c.stroke();

	c = this.__pad.getContext("2d");
	c.clearRect(0, 0, 500, 200);
	c.drawImage(this.__pad_off, 0, 0);
	for(var i = 0; i < 8; i++)
	{
		if(this.__pad_before[i] != this.__pad_after[i])
		{
			this.__pad_before[i] = this.__pad_after[i];
			if(this.__pad_after[i]) this.__pad_pressed(i);
			else this.__pad_released(i);
		}
	}
}

Game.prototype.__pad_pressed = function(ch)
{
	if(this.__mc.gk)
	{
		var co = this.__get_code(ch);
		this.__mc.gk.keyPressed( { 
			keyCode:co,
			preventDefault:function(){}
		} );
	}
}

Game.prototype.__pad_released = function(ch)
{
	if(this.__mc.gk)
	{
		var co = this.__get_code(ch);
		this.__mc.gk.keyReleased( { 
			keyCode:co,
			preventDefault:function(){}
		} );
	}
}

Game.prototype.__get_code = function(ch)
{
	switch(ch)
	{
	case 4: return 37;
	case 6: return 38;
	case 5: return 39;
	case 7: return 40;
	case 1: return 90;
	case 0: return 88;
	case 2: return 84;
	case 3: return 80;
	}
}

Game.prototype.__pad_event = function(e)
{
	e.preventDefault();
	this.__pad_touches = [];
	for(var i = 0; i < e.touches.length; i++)
	{
		this.__pad_touches.push(e.touches[i]);
	}
	this.__pad_update();
}





// メディアの読み込みを待つ関数
function waitFor(param)
{
	/*for(var i in param)
	{
		var ret;
		while(true)
		{
			if(param[i]._loaded)
			{
				ret = true;
				break;
			}
			else if(param[i]._error)
			{
				ret = false;
				break;
			}
		}
	}*/
}







// java.applet.AudioClipもどき（未実装）
function AudioClip(url)
{
	this._dat = new Audio();
	//alert(this._dat.src);
	this._dat.preload = "auto";
	this._dat.src = url;
	/*this._loaded = false;
	this._error = false;
	var _this = this;
	this._dat.oncanplaythrough = function()
	{
		AudioClip__oncanplaythrough(_this);
	}
	this._dat.onerror = function()
	{
		AudioClip__onerror(_this);
	}
	__box.appendChild(this._dat);*/
}
AudioClip.prototype._oncanplaythrough = function()
{
	//this._loaded = true;
}
function AudioClip__oncanplaythrough(obj)
{
	//obj._oncanplaythrough();
}
AudioClip.prototype._onerror = function()
{
	//this._error = true;
	//this._dat.src = "";
}
function AudioClip__onerror(obj)
{
	//obj._onerror();
}

AudioClip.prototype.play = function()
{
	try
	{
		this._dat.loop = false;
		this._dat.currentTime = 0;
		this._dat.play();
	}
	catch(e)
	{
		return false;
	}
	return true;
}

AudioClip.prototype.loop = function()
{
	try
	{
		this._dat.loop = true;
		this._dat.currentTime = 0;
		this._dat.play();
	}
	catch(e)
	{
		return false;
	}
	return true;
}

AudioClip.prototype.stop = function()
{
	try
	{
		this._dat.pause();
	}
	catch(e)
	{
		return false;
	}
	return true;
}








// java.awt.Dimension
function Dimension(width, height)
{
	this.width = width;
	this.height = height;
}








// 多次元配列作成
function createNDimensionArray()
{
	if(arguments.length == 0) return null;
	var a = new Array(arguments.length);
	for(var i = 0; i < arguments.length; i++)
		a[i] = arguments[i];
	var r = (function(an)
	{
		var ary = new Array(an[0]);
		if(an.length == 1) return ary;
		var an2 = an.slice(1);
		for(var i = 0; i < an[0]; i++)
			ary[i] = arguments.callee(an2);
		return ary;
	})(a);
	return r;
}



// 小数切り捨て
function rounddown(val)
{
	if(val >= 0)
		return Math.floor(val);
	else
		return -Math.floor(-val);
}

function makeRandomString(){
	return Math.random().toString(36).slice(2);
}








