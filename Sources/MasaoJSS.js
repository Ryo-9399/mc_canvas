
/**
 * ユーザーJavaScriptから正男を操作するAPIを提供するオブジェクトです。
 * 正男にuserJSCallbackが提供された場合、自動的に生成されます。
 *
 * @constructor
 */
function MasaoJSS(mc)
{
	this.my_offscreen_img = null;
	this.oci = new Array(256);
	this.ci = null;

	this.masaoEvent = function(g, image)
	{
		this.my_offscreen_img = image;
		repaint();
	}

    /**
     * 現在のハイスコアを返します。
     *
     * @returns {number}
     */
	this.getHighscore = function()
	{
		var i = 0;
		if(mc.mp)
		{
			i = mc.mp.highscore;
			if(i < mc.mp.score)
				i = mc.mp.score;
		}
		return i;
	}

    /**
     * 現在のスコアを返します。
     *
     * @returns {number}
     */
	this.getScore = function()
	{
		var i = 0;
		if(mc.mp)
			i = mc.mp.score;
		return i;
	}

    /**
     * 現在のゲームモードを表す数値を返します。
     * ゲーム開始時は1、ゲーム中は、ステージ番号に応じて101〜104、ボス戦中は150、
     * ゲームオーバー時は200、ゲームクリア時は300、
     * マップ画面では400となります。
     *
     * @returns {number}
     */
	this.getMode = function()
	{
		var i = 0;
		if(mc.mp)
		{
			var j = mc.mp.ml_mode;
			if(j >= 50 && j <= 60)
				i = 1;
			else
			if(j >= 200 && j < 300)
				i = 400;
			else
			if(j >= 300 && j <= 310)
				i = 200;
			else
			if(j >= 400 && j <= 410)
				i = 300;
			else
			if(mc.mp.ml_mode == 100 && (mc.mp.sl_step == 2 || mc.mp.sl_step == 3))
			{
				i = 150;
			} else
			{
				i = 100;
				i += mc.mp.stage;
			}
		}
		return i;
	}

    /**
     * 音声をONにします。
     *
     * @returns {boolean}
     */
	this.soundOn = function()
	{
		if(mc.gs)
		{
			mc.gs.soundOn();
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 音声をOFFにします。
     *
     * @returns {boolean}
     */
	this.soundOff = function()
	{
		if(mc.gs)
		{
			mc.gs.soundOff();
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 音声をONにします。
     */
	this.onSound = function()
	{
		if(mc.gs)
		{
			mc.gs.soundOn();
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 音声をOFFにします。
     */
	this.offSound = function()
	{
		if(mc.gs)
		{
			mc.gs.soundOff();
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 主人公の現在のX座標をブロック単位で返します。
     *
     * 位置は、主人公の中心（左から15pxの位置）で判定されます。マップの左端が0となります。
     *
     * ゲーム中でない場合は-1が返ります。
     *
     * @returns {number}
     */
	this.getMyX = function()
	{
		if(mc.mp)
		{
			if(mc.mp.ml_mode == 100 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
			{
				var i = ((mc.mp.co_j.x + 15) >> 5) - 1;
				if(i < 0)
					i = 0;
				if(i > 179)
					i = 179;
				return i;
			}
			if(mc.mp.ml_mode == 200)
			{
				var j = ((mc.mp.ig.co_j.x + 15) >> 5);
				return j;
			}
		}
		return -1;
	}

    /**
     * 主人公の現在のY座標をブロック単位で返します。
     *
     * 位置は、主人公の中心（上から15pxの位置）で判定されます。マップの上端が0となります。
     *
     * ゲーム中でない場合は-1が返ります。
     *
     * @returns {number}
     */
	this.getMyY = function()
	{
		if(mc.mp)
		{
			if(mc.mp.ml_mode == 100 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
			{
				var i = ((mc.mp.co_j.y + 15) >> 5) - 10;
				if(i < 0)
					i = 0;
				if(i > 29)
					i = 29;
				return i;
			}
			if(mc.mp.ml_mode == 200)
			{
				var j = ((mc.mp.ig.co_j.y + 15) >> 5);
				return j;
			}
		}
		return -1;
	}

    /**
     * 現在のXスクロール位置（画面左端の座標）をブロック単位で返します。
     *
     * マップの左端が0となります。
     *
     * @returns {number}
     */
	this.getViewX = function()
	{
		if(mc.mp && mc.mp.ml_mode == 100)
		{
			var i = (mc.mp.maps.wx >> 5) - 1;
			if(i < 0)
				i = 0;
			if(i > 164)
				i = 179;
			return i;
		} else
		{
			return -1;
		}
	}

    /**
     * 現在のYスクロール位置（画面上端の座標）をブロック単位で返します。
     *
     * マップの上端が0となります。
     *
     * @returns {number}
     */
	this.getViewY = function()
	{
		if(mc.mp && mc.mp.ml_mode == 100)
		{
			var i = (mc.mp.maps.wy >> 5) - 10;
			if(i < 0)
				i = 0;
			if(i > 20)
				i = 20;
			return i;
		} else
		{
			return -1;
		}
	}

    /**
     * 主人公の現在の座標をブロック単位で設定します。
     * マップの左上が(0, 0)となります。
     *
     * @param {number} x X座標
     * @param {number} y Y座標
     * @returns {boolean} 
     */
	this.setMyPosition = function(s, s1)
	{
		var flag = false;
		var flag1 = false;
		if(mc.mp && mc.mp.ml_mode == 100 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i;
			var j;
			i = parseInt(s);
			j = parseInt(s1);
			if(isNaN(i) || isNaN(j))
			{
				i = -1;
				j = -1;
			}
			if(i < 0 || i > 179 || j < 0 || j > 29)
			{
				return false;
			} else
			{
				mc.mp.co_j.x = (i + 1) * 32;
				mc.mp.co_j.y = (j + 10) * 32;
				return true;
			}
		} else
		{
			return false;
		}
	}

    /**
     * 一言メッセージを表示します。
     *
     * @param {number} time 表示時間（フレーム数）
     * @param {string} name 名前
     * @param {string} line1 メッセージ（1行目）
     * @param {string} line2 メッセージ（2行目）
     * @param {string} line3 メッセージ（3行目）
     */
	this.showMessage = function(s, s1, s2, s3, s4)
	{
		var flag = false;
		if(mc.mp)
		{
			var flag1 = mc.mp.showmSet(s, s1, s2, s3, s4);
			return flag1;
		} else
		{
			return false;
		}
	}

    /**
     * マップ上に指定した画像を表示します。
     * 座標はマップ上ではなくスクリーン上の位置で指定します。
     * showImageで表示できる画像は1つだけです。
     *
     * @param {number} time 表示時間（フレーム数）
     * @param {ImageBuff} buf 表示する画像
     * @param {number} x X座標
     * @param {number} y Y座標
     */
	this.showImage = function(s, s1, s2, s3)
	{
		var flag = false;
		if(mc.mp)
		{
			var flag1 = mc.mp.showiSet(s, s1, s2, s3);
			return flag1;
		} else
		{
			return false;
		}
	}

    /**
     * 指定した位置に敵を設置します。
     * 位置はブロック単位で指定します。
     *
     * @param {number} type 敵の種類
     * @param {number} x X座標
     * @param {number} y Y座標
     */
	this.setEnemy = function(s, s1, s2)
	{
		var flag = false;
		if(mc.mp)
		{
			var flag1 = mc.mp.sete(s, s1, s2);
			return flag1;
		} else
		{
			return false;
		}
	}

    /**
     * マップチップを1つ変更します。
     *
     * @param {number} x X座標
     * @param {number} y Y座標
     * @param {number} chip マップチップ番号
     */
	this.setMapchip = function(s, s1, s2)
	{
		var flag = false;
		if(mc.mp)
		{
			var flag1 = mc.mp.setmapc(s, s1, s2);
			return flag1;
		} else
		{
			return false;
		}
	}

    /**
     * マップチップを取得します。
     *
     * @param {number} x X座標
     * @param {number} y Y座標
     * @returns {number} マップチップ番号
     */
	this.getMapchip = function(s, s1)
	{
		if(mc.mp)
			return mc.mp.getmapc(s, s1);
		else
			return -1;
	}

    /**
     * 背景レイヤーのマップチップを1つ変更します。
     *
     * @param {number} x X座標
     * @param {number} y Y座標
     * @param {number} chip マップチップ番号
     */
	this.setMapchip2 = function(s, s1, s2)
	{
		var flag = false;
		if(mc.mp)
		{
			var flag1 = mc.mp.setmapc2(s, s1, s2);
			return flag1;
		} else
		{
			return false;
		}
	}

    /**
     * 背景レイヤーのマップチップを取得します。
     *
     * @param {number} x X座標
     * @param {number} y Y座標
     * @returns {number} マップチップ番号
     */
	this.getMapchip2 = function(s, s1)
	{
		if(mc.mp)
			return mc.mp.getmapc2(s, s1);
		else
			return -1;
	}

    /**
     * 背景画像を設定します。
     * @param {string} filename 画像のファイル名
     */
	this.setBackImage = function(s)
	{
		var flag = false;
		if(mc.mp)
		{
			var flag1 = mc.mp.setbacki(s);
			return flag1;
		} else
		{
			return false;
		}
	}

    /**
     * 左キーを入力します。
     */
	this.pressLeft = function()
	{
		if(mc.gk)
		{
			mc.gk.left_f = true;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 左キーを入力し、さらにダッシュ状態にします。
     */
	this.pressLeft2 = function()
	{
		if(mc.gk && mc.mp && mc.mp.ml_mode == 100 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			mc.gk.left_f = true;
			mc.gk.left_c = 2;
			mc.mp.j_hashiru_f = true;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 左キーを開放します。
     */
	this.releaseLeft = function()
	{
		if(mc.gk)
		{
			mc.gk.left_f = false;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 右キーを入力します。
     */
	this.pressRight = function()
	{
		if(mc.gk)
		{
			mc.gk.right_f = true;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 右キーを入力し、さらにダッシュ状態にします。
     */
	this.pressRight2 = function()
	{
		if(mc.gk && mc.mp && mc.mp.ml_mode == 100 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			mc.gk.right_f = true;
			mc.gk.right_c = 2;
			mc.mp.j_hashiru_f = true;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 右キーを開放します。
     */
	this.releaseRight = function()
	{
		if(mc.gk)
		{
			mc.gk.right_f = false;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 上キーを入力します。
     */
	this.pressUp = function()
	{
		if(mc.gk)
		{
			mc.gk.up_f = true;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 上キーを開放します。
     */
	this.releaseUp = function()
	{
		if(mc.gk)
		{
			mc.gk.up_f = false;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 下キーを入力します。
     */
	this.pressDown = function()
	{
		if(mc.gk)
		{
			mc.gk.down_f = true;
			mc.gk.tr2_f = true;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 下キーを開放します。
     */
	this.releaseDown = function()
	{
		if(mc.gk)
		{
			mc.gk.down_f = false;
			mc.gk.tr2_f = false;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * ジャンプキーを入力します。
     */
	this.pressTrigger1 = function()
	{
		if(mc.gk)
		{
			mc.gk.tr1_f = true;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * ジャンプキーを開放します。
     */
	this.releaseTrigger1 = function()
	{
		if(mc.gk)
		{
			mc.gk.tr1_f = false;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 全てのキーを開放します。
     */
	this.releaseAll = function()
	{
		if(mc.gk)
		{
			mc.gk.up_f = false;
			mc.gk.down_f = false;
			mc.gk.left_f = false;
			mc.gk.right_f = false;
			mc.gk.tr1_f = false;
			mc.gk.tr2_f = false;
			mc.gk.x_f = false;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 最後に入力されたキーのキーコードを取得します。
     * @returns {number} キーコード
     */
	this.getKeyCode = function()
	{
		if(mc.gk)
			return mc.gk.key_code;
		else
			return -1;
	}

    /**
     * {@link MasaoJSS#getKeyCode|getKeyCode}で取得できるキーコードを0にリセットします。
     */
	this.resetKeyCode = function()
	{
		if(mc.gk)
		{
			mc.gk.key_code = 0;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * ファイアボール装備あり/なしを切り替えます。
     * 引数に0を与えるとなし、正の整数を与えるとありになります。
     * その他の値は無効です。
     *
     * @param {number} flag ファイアボールのあり/なし
     */

	this.equipFire = function(s)
	{
		var byte0 = -1;
		if(typeof(s) == "undefined") s = "1";
		if(this.getMode() >= 100 && this.getMode() < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 0)
				return false;
			if(i == 0)
			{
				mc.mp.j_fire_f = false;
				return true;
			}
			if(i == 1)
			{
				mc.mp.j_fire_f = true;
				return true;
			}
		}
		return false;
	}

    /**
     * 主人公にバリアを装備させます。
     *
     * @param {number} time 持続時間（フレーム数）
     */
	this.equipBarrier = function(s)
	{
		var flag = false;
		if(mc.gk && mc.mp && mc.mp.ml_mode == 100 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
				i = 0;
			if(i <= 0)
			{
				return false;
			} else
			{
				mc.mp.j_v_c = i;
				mc.gs.rsAddSound(7);
				return true;
			}
		} else
		{
			return false;
		}
	}

    /**
     * ジェットの残り燃料数を設定します。
     * 
     * @param {number} fuel 新しい残り燃料数
     */
	this.setJetFuel = function(s)
	{
		var flag = false;
		if(mc.gk && mc.mp && mc.mp.ml_mode == 100 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = 0;
			}
			if(i < 0)
			{
				return false;
			} else
			{
				mc.mp.j_jet_fuel = i;
				return true;
			}
		} else
		{
			return false;
		}
	}

    /**
     * ジェットの残り燃料数を設定します。
     * 
     * @param {number} fuel 新しい残り燃料数
     */
	this.equipJet = function(s)
	{
		var flag = this.setJetFuel(s);
		return flag;
	}

    /**
     * タイトル画面に戻ります。
     */
	this.restart = function()
	{
		return mc.restart();
	}

    /**
     * paramの値を取得します。
     *
     * @param {string} name param名
     * @returns {string} paramの値
     */
	this.getValue = function(s)
	{
		if(mc.th_jm <= 0)
			return mc.tdb.getValue(s);
		else
			return null;
	}

    /**
     * paramの値を取得します。
     *
     * @param {string} name param名
     * @returns {string} paramの値
     */
	this.getParamValue = function(s)
	{
		if(mc.th_jm <= 0)
			return mc.tdb.getValue(s);
		else
			return null;
	}

    /**
     * paramの値を再設定します。
     *
     * @param {string} name param名
     * @param {string} value 新しい値
     */
	this.setValue = function(s, s1)
	{
		if(mc.th_jm <= 0)
			return mc.tdb.setValue(s, s1);
		else
			return false;
	}

    /**
     * paramの値を再設定します。
     *
     * @param {string} name param名
     * @param {string} value 新しい値
     */
	this.setParamValue = function(s, s1)
	{
		if(mc.th_jm <= 0)
			return mc.tdb.setValue(s, s1);
		else
			return false;
	}

    /**
     * 主人公のX座標（px単位）を取得します。
     *
     * マップの左端は32です。
     * @returns {number} 主人公のX座標
     */
	this.getMyXReal = function()
	{
		if(this.getMode() >= 100 && this.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i = mc.mp.co_j.x;
			return i;
		} else
		{
			return -1;
		}
	}

    /**
     * 主人公のY座標（px単位）を取得します。
     *
     * マップの上端は320です。
     * @returns {number} 主人公のX座標
     */
	this.getMyYReal = function()
	{
		if(this.getMode() >= 100 && this.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i = mc.mp.co_j.y;
			return i;
		} else
		{
			return -1;
		}
	}

    /**
     * 主人公のX座標をpx単位で設定します。
     * マップの左端は32です。
     *
     * @param {number} x X座標
     */
	this.setMyXReal = function(s)
	{
		if(this.getMode() >= 100 && this.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -9999;
			}
			if(i < 0)
				i = 0;
			mc.mp.co_j.x = i;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 主人公のY座標をpx単位で設定します。
     * マップの上端は320です。
     *
     * @param {number} y X座標
     */
	this.setMyYReal = function(s)
	{
		if(this.getMode() >= 100 && this.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -9999;
			}
			if(i < 0)
				i = 0;
			mc.mp.co_j.y = i;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 主人公のX方向速度を取得します。
     *
     * @param {number} 主人公のX方向速度
     */
	this.getMyVX = function()
	{
		if(this.getMode() >= 100 && this.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i = mc.mp.co_j.vx;
			return i;
		} else
		{
			return -9999;
		}
	}

    /**
     * 主人公のY方向速度を取得します。
     *
     * @param {number} 主人公のY方向速度
     */
	this.getMyVY = function()
	{
		if(this.getMode() >= 100 && this.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i = mc.mp.co_j.vy;
			return i;
		} else
		{
			return -9999;
		}
	}

    /**
     * 現在のX方向スクロール位置をpx単位で取得します。
     * マップの左端は32です。
     *
     * @returns {number} 現在のX方向スクロール位置
     */
	this.getViewXReal = function()
	{
		if(this.getMode() >= 100 && this.getMode() < 200)
		{
			var i = mc.mp.maps.wx;
			return i;
		} else
		{
			return -1;
		}
	}

    /**
     * 現在のY方向スクロール位置をpx単位で取得します。
     * マップの上端は320です。
     *
     * @returns {number} 現在のY方向スクロール位置
     */
	this.getViewYReal = function()
	{
		if(this.getMode() >= 100 && this.getMode() < 200)
		{
			var i = mc.mp.maps.wy;
			return i;
		} else
		{
			return -1;
		}
	}

    /**
     * 現在存在している敵の総数を取得します。
     *
     * @returns {number} 敵の総数
     */
	this.getEnemyTotal = function()
	{
		if(this.getMode() >= 100 && this.getMode() < 200)
		{
			var i = 0;
			for(var j = 0; j <= 229; j++)
				if(mc.mp.co_t[j].c >= 100 || mc.mp.co_t[j].c == 10)
					i++;

			return i;
		} else
		{
			return -1;
		}
	}

    /**
     * ボスのX座標を取得します。
     *
     * @returns {number} ボスのX座標
     */
	this.getBossXReal = function()
	{
		if(this.getMode() >= 100 && this.getMode() < 200)
		{
			var i = mc.mp.co_b.x;
			return i;
		} else
		{
			return -1;
		}
	}

    /**
     * ボスのY座標を取得します。
     *
     * @returns {number} ボスのY座標
     */
	this.getBossYReal = function()
	{
		if(this.getMode() >= 100 && this.getMode() < 200)
		{
			var i = mc.mp.co_b.y;
			return i;
		} else
		{
			return -1;
		}
	}

    /**
     * 主人公を死亡させます。引数で死亡エフェクトを指定できます。
     *
     * * 1: その場で回転しながら死亡
     * * 2: 飛び上がって回転しながら死亡
     * * 3: 縦に潰れて死亡
     * * 4: 横に潰れて死亡
     *
     * @param {number} [type=1] 死因
     */
	this.setMyMiss = function(s)
	{
		if(this.getMode() >= 100 && this.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = 1;
			}
			if(i < 1 || i > 4)
				i = 1;
			mc.mp.jShinu(i);
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 主人公が敵を踏んだエフェクトを発生させます。引数でジャンプの高さを還ることができます。
     * * 1: 亀などの敵を踏んだときの高さ
     * * 2: ポッピー・エアームズを踏んだときの高さ
     * * 3: ボスを踏んだときの高さ
     *
     * @param {number} [type=1] 高さ
     */
	this.setMyPress = function(s)
	{
		if(this.getMode() >= 100 && this.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = 1;
			}
			mc.mp.jFumu(i);
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 効果音を再生します。番号は1から27までです。
     *
     * @param {number} type 効果音の番号
     */
	this.playSound = function(s)
	{
		if(!mc.gs)
			return false;
		var i;
		i = parseInt(s);
		if(isNaN(i))
		{
			i = -1;
		}
		if(i >= 1 && i <= 27)
		{
			if(this.getMode() >= 100 && this.getMode() < 200)
				mc.gs.rsAddSound(i - 1);
			else
				mc.gs.play(i - 1);
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 効果音を変更します。変えられる効果音は1から32までです。
     *
     * @param {number} type 効果音番号
     * @param {string} filename ファイル名
     */
	this.setSound = function(s, s1)
	{
		if(!mc.gs)
			return false;
		var i;
		i = parseInt(s);
		if(isNaN(i))
		{
			i = -1;
		}
		if(i >= 1 && i <= 32)
		{
			mc.gs.setSound(i-1,s1);
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * スクロールロックを設定します。スクロール座標が指定したX座標に到達したら、そこで画面が固定されます。
     *
     * @param {number} x X座標
     */
	this.setScrollLock = function(s)
	{
		var flag = false;
		if(this.getMode() >= 100 && this.getMode() < 200)
			flag = mc.mp.setScrollLock(s);
		return flag;
	}

    /**
     * ファイヤーボールとグレネードに対する当たり判定を指定範囲に発生させます。
     * 指定範囲に入っていたファイヤーボールは消滅し、その数が返り値として返ります。
     * また、グレネードの当たり判定に入っていた場合、1つにつき返り値が10増加します。
     *
     * @param {number} x 範囲の左端のX座標
     * @param {number} y 範囲の上端のY座標
     * @param {number} width 範囲のX方向大きさ
     * @param {number} height 範囲のY方向大きさ
     * @returns {number}
     */
	this.attackFire = function(s, s1, s2, s3)
	{
		var i = 0;
		if(this.getMode() >= 100 && this.getMode() < 200)
			i = mc.mp.attackFire(s, s1, s2, s3);
		return i;
	}

    /**
     * スコアを加算します。負の値を渡してもスコアは減りません。
     *
     * @param {number} score 加算するスコア
     *
     * @see {@link MasaoJSS#setScore|setScore}
     */
	this.addScore = function(s)
	{
		if(!mc.mp)
			return false;
		var i;
		i = parseInt(s);
		if(isNaN(i))
		{
			i = 0;
		}
		if(i >= 1)
		{
			mc.mp.addScore(i);
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * {@link MasaoJSS#showRect|showRect}及び{@link MasaoJSS#showOval|showOval}で表示される図形の色を指定します。各値は0から255までの整数で指定します。
     *
     * @param {number} r R成分
     * @param {number} g G成分
     * @param {number} b B成分
     * @param {number} [alpha=255] 不透明度
     *
     * @see {@link MasaoJSS#showRect|showRect}
     * @see {@link MasaoJSS#showOval|showOval}
     */
	this.setPenColor = function(s, s1, s2, s3)
	{
		if(typeof(s3) == "undefined") s3 = "255";
		if(mc.mp)
		{
			var flag = mc.mp.setPenColor(s, s1, s2, s3);
			return flag;
		} else
		{
			return true;
		}
	}

    /**
     * 一定時間矩形を表示します。表示座標はマップ上の座標ではなくスクリーン上の座標で指定します。
     * showRectによる矩形の表示は1つだけです。
     * 
     * @param {number} time 表示時間（フレーム数）
     * @param {number} x 矩形の左端のX座標
     * @param {number} y 矩形の上端のY座標
     * @param {number} width 矩形の幅
     * @param {number} height 矩形の高さ
     *
     * @see {@link MasaoJSS#setPenColor|setPenColor}
     */
	this.showRect = function(s, s1, s2, s3, s4)
	{
		var flag = false;
		if(mc.mp)
		{
			var flag1 = mc.mp.showrSet(s, s1, s2, s3, s4);
			return flag1;
		} else
		{
			return false;
		}
	}

    /**
     * 一定時間楕円を表示します。表示座標はマップ上の座標ではなくスクリーン上の座標で指定します。
     * showOvalによる矩形の表示は1つだけです。
     * 
     * @param {number} time 表示時間（フレーム数）
     * @param {number} x 楕円の左端のX座標
     * @param {number} y 楕円の上端のY座標
     * @param {number} width 楕円の幅
     * @param {number} height 楕円の高さ
     *
     * @see {@link MasaoJSS#setPenColor|setPenColor}
     */
	this.showOval = function(s, s1, s2, s3, s4)
	{
		var flag = false;
		if(mc.mp)
		{
			var flag1 = mc.mp.showoSet(s, s1, s2, s3, s4);
			return flag1;
		} else
		{
			return false;
		}
	}

    /**
     * JavaScript用メッセージを取得します。
     * メッセージはゲーム開始時1になります。
     * メッセージは{@link MasaoJSS#setJSMes|setJSMes}で上書きできます。
     *
     * @returns {number} メッセージ
     */
	this.getJSMes = function()
	{
		var flag = false;
		if(mc.mp)
		{
			var i = mc.mp.getJSMes();
			return i;
		} else
		{
			return -1;
		}
	}

    /**
     * ゲージを表示します。
     * showGaugeで表示できるゲージは1つだけで、ボスのHPゲージと共有です。
     * ゲージの値は最小が0、最大が200です。
     *
     * @param {number} value ゲージの値
     * @param {string} name ゲージに表示される文字列
     *
     * @see {@link MasaoJSS#hideGauge|hideGauge}
     */
	this.showGauge = function(s, s1)
	{
		if(mc.mp)
		{
			var flag = mc.mp.showGauge(s, s1);
			return flag;
		} else
		{
			return false;
		}
	}

    /**
     * {@link MasaoJSS#showGauge|showGauge}で表示したゲージを非表示にします。
     *
     * @see {@link MasaoJSS#showGauge|showGauge}
     */
	this.hideGauge = function()
	{
		if(mc.mp)
		{
			var flag = mc.mp.hideGauge();
			return flag;
		} else
		{
			return false;
		}
	}

    /**
     * {@link MasaoJSS#getJSMes|getJSMes}で取得できるメッセージを書き換えます。
     *
     * @param {number} value 新しい値
     *
     * @see {@link MasaoJSS#getJSMes|getJSMes}
     */
	this.setJSMes = function(s)
	{
		if(mc.mp)
		{
			mc.mp.setJSMes(s);
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * タイトル画面で、ユーザーの入力によるゲーム開始をできなくします。
     * {@link MasaoJSS#startGame|startGame}によるゲーム開始は可能です。
     */
	this.setTitleLock = function()
	{
		if(mc.mp)
		{
			mc.mp.title_lock_f = true;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * タイトル画面時、ゲームを開始させます。
     */
	this.startGame = function()
	{
		if(mc.mp)
		{
			mc.mp.start_game_f = true;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * グレネードの装備数を変更します。
     *
     * @param {number} num 新しい装備数
     *
     * @see {@link MasaoJSS#setGrenadeCount|setGrenadeCount}と同じです。
     */
	this.equipGrenade = function(s)
	{
		var flag = false;
		if(this.getMode() >= 100 && this.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 0)
			{
				return false;
			} else
			{
				mc.mp.j_gr_kazu = i;
				return true;
			}
		} else
		{
			return false;
		}
	}

    /**
     * ゲームで使用されている画像を変更します。画像は数値で指定します。
     *
     * * 0: タイトル画像
     * * 1: エンディング画像
     * * 2: ゲームクリア画像
     * * 8: パターン画像
     * * 9: 背景マップチップ画像
     *
     * @param {number} type 画像の種類
     * @param {string} filename ファイル名
     */
	this.setSystemImage = function(s, s1)
	{
		if(mc.mp)
			return mc.mp.setSystemImage(s, s1);
		else
			return false;
	}

    /**
     * ゲームの各タイミングにおける時間を設定します。タイミングは数値で指定します。
     * * 0: エンディング画像の表示時間
     * * 1: ゲームオーバー画像の表示時間
     * * 2: ステージ開始時のステージ番号表示時間
     *
     * @param {number} type タイミング
     * @param {number} time 時間（フレーム）
     */
	this.setModeWait = function(s, s1)
	{
		if(mc.mp)
			return mc.mp.setModeWait(s, s1);
		else
			return false;
	}

    /**
     * 主人公のHP表示をONにします。
     *
     * @param {string} name HPの名前
     */
	this.showMyHP = function(s)
	{
		if(mc.mp)
			return mc.mp.showMyHP(s);
		else
			return false;
	}

    /**
     * 主人公の最大HPを設定します。
     *
     * @param {number} maxhp 最大HP
     */
	this.setMyMaxHP = function(s)
	{
		if(mc.mp)
			return mc.mp.setMyMaxHP(s);
		else
			return false;
	}

    /**
     * 主人公の現在のHPを設定します。
     *
     * @param {number} hp HP
     */
	this.setMyHP = function(s)
	{
		if(mc.mp)
			return mc.mp.setMyHP(s);
		else
			return false;
	}

    /**
     * 主人公の現在のHPを取得します。
     *
     * @returns {number} 現在のHP
     */
	this.getMyHP = function()
	{
		if(mc.mp)
			return mc.mp.getMyHP();
		else
			return 0;
	}

    /**
     * 主人公にダメージを与えます。
     * このメソッドを使うと、HPが減るのに加えて無敵時間が設定されます。
     *
     * 引数に負の値を与えると回復します。
     *
     * @param {number} damage ダメージ値
     */
	this.setMyHPDamage = function(s)
	{
		if(mc.mp)
			return mc.mp.setMyHPDamage(s);
		else
			return false;
	}

    /**
     * 主人公を一定時間停止させます。
     * 停止している間の主人公の画像（パターンコード）と向きを指定できます。
     *
     * @param {number} time 停止する時間（フレーム数）
     * @param {number} pattern 停止している間のパターンコード
     * @param {number} direction 向き（0なら左、1なら右）
     */
	this.setMyWait = function(s, s1, s2)
	{
		return mc.mp.setMyWait(s, s1, s2);
	}

    /**
     * ステージクリアします。
     */
	this.setStageClear = function()
	{
		if(mc.mp)
			return mc.mp.setStageClear();
		else
			return false;
	}

    /**
     * 水平に飛ぶタイプのファイヤーボールの射程を設定します。
     * 射程は、発射されてから消えるまでのフレーム数で表します。
     *
     * @param {number} range 射程
     */
	this.setFireRange = function(s)
	{
		var c = '\u270F';
		if(mc.mp)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = 0;
			}
			if(i <= 0)
			{
				return false;
			} else
			{
				mc.mp.j_fire_range = i;
				return true;
			}
		} else
		{
			return false;
		}
	}

    /**
     * しっぽの装備を設定します。
     * 引数が1で装備、0で装備解除します。
     *
     * @param {number} tail しっぽの装備
     */
	this.equipTail = function(s)
	{
		var byte0 = -1;
		if(this.getMode() >= 100 && this.getMode() < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 0)
				return false;
			if(i == 0)
			{
				mc.mp.j_tail_f = false;
				return true;
			}
			if(i == 1)
			{
				mc.mp.j_tail_f = true;
				return true;
			}
		}
		return false;
	}

    /**
     * 指定した矩形範囲にしっぽの攻撃判定を発生させます。
     * 範囲にしっぽが当たった場合は1を、当たっていない場合は0を返します。
     *
     * @param {number} x 範囲左端のX座標
     * @param {number} y 範囲上端のY座標
     * @param {number} width 範囲の横幅
     * @param {number} height 範囲の高さ
     */
	this.attackTail = function(s, s1, s2, s3)
	{
		var i = 0;
		if(this.getMode() >= 100 && this.getMode() < 200)
			i = mc.mp.attackTail(s, s1, s2, s3);
		return i;
	}

    /**
     * 指定した矩形範囲にいる敵を倒します。
     *
     * @param {number} x 範囲左端のX座標
     * @param {number} y 範囲上端のY座標
     * @param {number} width 範囲のX方向大きさ
     * @param {number} height 範囲のY方向大きさ
     * @returns {number} 倒した敵の数
     */
	this.destroyEnemy = function(s, s1, s2, s3)
	{
		var i = -1;
		if(this.getMode() >= 100 && this.getMode() < 200)
			i = mc.mp.destroyEnemy(s, s1, s2, s3);
		return i;
	}

    /**
     * Zキーが押されているか判定し、押されていれば1、押されていなければ0を返します。
     * @returns {number}
     */
	this.isPressZKey = function()
	{
		return !mc.gk || !mc.gk.z_f ? 0 : 1;
	}

    /**
     * Xキーが押されているか判定し、押されていれば1、押されていなければ0を返します。
     * @returns {number}
     */
	this.isPressXKey = function()
	{
		return !mc.gk || !mc.gk.x_f ? 0 : 1;
	}

    /**
     * スペースキーが押されているか判定し、押されていれば1、押されていなければ0を返します。
     * @returns {number}
     */
	this.isPressSpaceKey = function()
	{
		return !mc.gk || !mc.gk.space_f ? 0 : 1;
	}

    /**
     * 主人公の向きを取得します。0が左向きで1が右向きです。
     * 4方向移動の正男の場合、2が上向き、3が下向きになります。
     *
     * @returns {number} 主人公の向き
     * @see {@link MasaoJSS#getMyDirection4way|getMyDirection4way}
     */
	this.getMyDirection = function()
	{
		var byte0 = -1;
		if(this.getMode() >= 100 && this.getMode() < 200)
		{
			var i;
			if(mc.mp.j_tokugi == 15)
				i = mc.mp.j_4_muki;
			else
				i = mc.mp.co_j.muki;
			return i;
		} else
		{
			return -1;
		}
	}

    /**
     * 主人公の向きを設定します。
     * 向きの値は{@link MasaoJSS#getMyDirection|getMyDirection}を参照してください。
     *
     * @param {number} direction 向き
     * 
     * @see {@link MasaoJSS#getMyDirection|getMyDirection}
     */
	this.setMyDirection = function(s)
	{
		if(this.getMode() >= 100 && this.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i = parseInt(s);
			if(isNaN(i)) i = -1;
			if(i < 0) return false;
			if(mc.mp.j_tokugi == 15)
			{
				if(i > 3) return false;
				mc.mp.j_4_muki = i;
			} else
			{
				if(i > 1) return false;
				mc.mp.co_j.muki = i;
			}
			return true;
		} else
		{
			return false;
		}
	}

	this.setHTMLText = function(s) // 使用不可
	{
		/*if(mc.mp)
		{
			mc.tdb.initParameter();
			mc.tdb.setValueFromHTMLText(s);
			mc.restart();
			return true;
		} else
		{
			return false;
		}*/
		return false;
	}

    /**
     * 新しく床を生成し、床IDを返します。
     * 床の位置、大きさ、形及び画像を指定できます。
     *
     * 床の形は次のように指定します。
     *
     * * `"line"`: 線分
     * * `"triangle"`: 直角三角形
     * * `"mount"`: 台形
     * * `"circle"`: 円
     * * `"half_circle"`: 上半分の半円
     * * `"half_circle_line"`: 上半分の半円（線のみ）
     * * `"wave_up"`: 右上がりの曲線
     * * `"wave_up_line"`: 右上がりの曲線（線のみ）
     * * `"wave_down"`: 右下がりの曲線
     * * `"wave_down_line"`: 右下がりの曲線（線のみ）
     * * `"rect"`: 矩形
     * * `"pattern"`: 矩形（画像は{@link MasaoJSS#setYukaPattern|setYukaPattern}で設定）
     * * その他: 矩形（ファイル名を指定）
     *
     * 引数`x2`, `y2`の意味は`type`の値によって変わります。
     * `type`が`line`, `triangle`, `mount`の場合は線分の右下の座標です。
     * `rect`, `pattern`および画像の場合は矩形の大きさです。
     * `circie`の場合は`x2`が円の半径となり、`y2`は無視されます。
     * その他の床は大きさが固定となり、`x2`も`y2`も無視されます。
     *
     * @param {number} x 床のX座標
     * @param {number} y 床のY座標
     * @param {number} x2 X方向大きさまたは右下の座標
     * @param {number} y2 Y方向大きさまたは右下の座標
     * @param {string} type 床の形
     *
     * @returns {number} 床ID
     */
	this.newYuka = function(s, s1, s2, s3, s4)
	{
		if(mc.mp)
			return mc.mp.newYuka(s, s1, s2, s3, s4);
		else
			return -1;
	}

    /**
     * {@link MasaoJSS#newYuka|newYuka}で作った床の位置を変更します。
     * 引数が3つの場合位置のみ、5つの場合は床の大きさも変更します。
     *
     * @param {number} id 床ID
     * @param {number} x X座標
     * @param {number} y Y座標
     * @param {number} [x2] X方向大きさまたは右下の座標
     * @param {number} [y2] Y方向大きさまたは右下の座標
     *
     * @see {@link MasaoJSS#newYuka|newYuka}
     */
	this.setYukaPosition = function(s, s1, s2, s3, s4)
	{
		if(mc.mp)
		{
			if(typeof(s3) == "undefined")
				return mc.mp.setYukaPosition(s, s1, s2);
			else
				return mc.mp.setYukaPosition(s, s1, s2, s3, s4);
		}
		else
			return false;
	}

    /**
     * {@link MasaoJSS#newYuka|newYuka}で作った床の当たり判定を変更します。
     * `type`に2を与えると当たり判定がなくなり、その他の値だと当たり判定ありになります。
     *
     * @param {number} id 床ID
     * @param {number} type type値
     */
	this.setYukaType = function(s, s1)
	{
		if(mc.mp)
			return mc.mp.setYukaType(s, s1);
		else
			return false;
	}

    /**
     * {@link MasaoJSS#newYuka|newYuka}で作った床を消去します。
     *
     * @param {number} id 床ID
     */
	this.disposeYuka = function(s)
	{
		if(mc.mp)
			return mc.mp.disposeYuka(s);
		else
			return false;
	}

    /**
     * {@link MasaoJSS#newYuka|newYuka}で作った床の色を設定します。
     * 色の各成分は0から255の整数で与えます。
     *
     * @param {number} id 床ID
     * @param {number} r R値
     * @param {number} g G値
     * @param {number} b B値
     * @param {number} alpha 不透明度
     */
	this.setYukaColor = function(s, s1, s2, s3, s4)
	{
		if(mc.mp)
			return mc.mp.setYukaColor(s, s1, s2, s3, s4);
		else
			return false;
	}

    /**
     * 主人公がある床に乗っているかどうかを判定します。
     * 乗っていれば1、乗っていなければ0が返ります。
     *
     * @param {number} id 床ID
     *
     * @returns {number}
     */
	this.isRideYuka = function(s)
	{
		if(mc.mp)
			return mc.mp.isRideYuka(s);
		else
			return -1;
	}

    /**
     * 主人公のX方向速度を設定します。
     *
     * @param {number} vx X方向速度
     */
	this.setMyVX = function(s)
	{
		var flag = false;
		if(this.getMode() >= 100 && this.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -9999;
			}
			if(i == -9999)
			{
				return false;
			} else
			{
				mc.mp.co_j.vx = i;
				return true;
			}
		} else
		{
			return false;
		}
	}

    /**
     * 主人公のY方向速度を設定します。
     * 
     * @param {number} vy Y方向速度
     */
	this.setMyVY = function(s)
	{
		var flag = false;
		if(this.getMode() >= 100 && this.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -9999;
			}
			if(i == -9999)
			{
				return false;
			} else
			{
				mc.mp.co_j.vy = i;
				return true;
			}
		} else
		{
			return false;
		}
	}

    /**
     * 主人公が地面に立っているかを判定します。
     * 立っているなら1、いないなら0を返します。
     * 地面ではなく床に乗っている場合は0になります。
     *
     * @returns {number} 地面に立っているか
     */
	this.isRideGround = function()
	{
		if(mc.mp)
			return mc.mp.isRideGround();
		else
			return -1;
	}

    /**
     * {@link MasaoJSS#newYuka|newYuka}で作った床のパターン画像を設定します。
     * `type`が`"pattern"`の床に対して有効です。
     *
     * @param {number} id 床ID
     * @param {number} pattern パターンコード
     * @param {number} direction 向き（0ならそのまま、1なら左右逆）
     */
	this.setYukaPattern = function(s, s1, s2)
	{
		if(mc.mp)
			return mc.mp.setYukaPattern(s, s1, s2);
		else
			return false;
	}

    /**
     * {@link MasaoJSS#newYuka|newYuka}で作った床の画像を変更します。
     * `type`が`rect`, `pattern`及びその他で作成した床を対象にできます。
     *
     * @param {number} id 床ID
     * @param {String|ImageBuff} image ファイル名または画像オブジェクト
     */
	this.setYukaImage = function(s, image)
	{
		if(mc.mp)
			return mc.mp.setYukaImage(s, image);
		else
			return false;
	}

    /**
     * 8方向移動または4方向移動モードにおける主人公の移動速度を変更します。
     * 単位はピクセル毎フレームで指定します。
     * 0から16の間の整数を指定可能で、デフォルトは8です。
     *
     * @param {number} speed 主人公の移動速度
     */
	this.setMySpeed = function(s)
	{
		var flag = false;
		if(this.getMode() >= 100 && this.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 0 || i > 16)
				return false;
			if(mc.mp.j_tokugi != 14 && mc.mp.j_tokugi != 15)
			{
				return false;
			} else
			{
				mc.mp.j_speed = i * 10;
				return true;
			}
		} else
		{
			return false;
		}
	}

    /**
     * スクロール可能な範囲をブロック単位で設定します。
     * 引数は全て画面の左上の位置で指定します。
     * マップの左上が(0, 0)です。
     *
     * @param {number} x1 範囲左上の座標
     * @param {number} y1 範囲左上の座標
     * @param {number} x2 範囲右下の座標
     * @param {number} y2 範囲右下の座標
     */
	this.setScrollArea = function(s, s1, s2, s3)
	{
		if(mc.mp)
			return mc.mp.setScrollArea(s, s1, s2, s3);
		else
			return false;
	}

	this.loadTextFile = function(s) // 使用不可
	{
		return null;
	}

    /**
     * 上キーが押されているか判定し、押されていれば1、押されていなければ0を返します。
     *
     * @returns {number}
     */
	this.isPressUpKey = function()
	{
		return !mc.gk || !mc.gk.up_f ? 0 : 1;
	}

    /**
     * 下キーが押されているか判定し、押されていれば1、押されていなければ0を返します。
     *
     * @returns {number}
     */
	this.isPressDownKey = function()
	{
		return !mc.gk || !mc.gk.down_f ? 0 : 1;
	}

    /**
     * 左キーが押されているか判定し、押されていれば1、押されていなければ0を返します。
     *
     * @returns {number}
     */
	this.isPressLeftKey = function()
	{
		return !mc.gk || !mc.gk.left_f ? 0 : 1;
	}

    /**
     * 右キーが押されているか判定し、押されていれば1、押されていなければ0を返します。
     *
     * @returns {number}
     */
	this.isPressRightKey = function()
	{
		return !mc.gk || !mc.gk.right_f ? 0 : 1;
	}

    /**
     * 指定されたファイルを画像オブジェクトとして読み込みます。
     * 読み込んだ画像オブジェクトは他のAPIの引数として使うことができます。
     *
     * @param {string} filename ファイル名
     * 
     * @returns {ImageBuff} 画像オブジェクト
     */
	this.newImageOnLoad = function(s)
	{
		var img = new ImageBuff();
		img.load(s);
		mc.pushMessage("load", img);
		return img;
	}

    /**
     * システムの描画を設定します。引数の値によって次の意味になります。
     *
     * * 1: 全て描画します。
     * * 2: 主人公を描画しません。
     * * 3: 主人公と敵を描画しません。
     * * 4: 何も描画しません。
     *
     * @param {number} mode 描画モード
     */
	this.setSystemDrawMode = function(s)
	{
		var byte0 = -1;
		if(mc.mp)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 1 || i > 4)
			{
				return false;
			} else
			{
				mc.mp.system_draw_mode = i;
				return true;
			}
		} else
		{
			return false;
		}
	}

    /**
     * 指定されたものを画面に描画します。
     *
     * * 1: 主人公を描画します。
     * * 2: 敵を描画します。
     * * 3: ゲージ、一言メッセージ、{@link MasaoJSS#showOval|showOval}, {@link MasaoJSS#showRect|showRect}, {@link MasaoJSS#showImage|showImage}で指定した描画物を描画します。
     * * 4: 背景を描画します。
     * * 5: 背景レイヤーのマップを描画します。
     * * 6: マップを描画します。
     * * 7: 仕掛けを描画します。
     *
     * @param {number} kind 描画するものの指定
     */
	this.drawSystemObject = function(s)
	{
		var byte0 = -1;
		if(mc.mp)
		{
			if(mc.mp.ml_mode != 100)
				return false;
			if(mc.mp.dso_cf)
				return false;
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i == 1)
			{
				mc.mp.drawGamescreenMy();
				return true;
			}
			if(i == 2)
			{
				mc.mp.drawGamescreenEnemy();
				return true;
			}
			if(i == 3)
			{
				mc.mp.drawGamescreenWindow();
				mc.mp.drawScore();
				return true;
			}
			if(i == 4)
			{
				mc.mp.maps.drawMapLayer(mc.mp.maps.wx, mc.mp.maps.wy, mc.mp.g_ac2, mc.mp.gazou_scroll, 2);
				return true;
			}
			if(i == 5)
			{
				if(mc.gg.layer_mode == 2)
					mc.mp.maps.drawMapLayer(mc.mp.maps.wx, mc.mp.maps.wy, mc.mp.g_ac2, mc.mp.gazou_scroll, 3);
				return true;
			}
			if(i == 6)
			{
				mc.mp.maps.drawMapLayer(mc.mp.maps.wx, mc.mp.maps.wy, mc.mp.g_ac2, mc.mp.gazou_scroll, 4);
				return true;
			}
			if(i == 7)
			{
				mc.mp.drawGamescreenUgokuyuka();
				return true;
			}
		}
		return false;
	}

    /**
     * 主人公の状態を返します。
     *
     * * 100: 通常の状態
     * * 110: 敵を踏んで硬直している状態
     * * 120: ドリルで床を破壊して硬直している状態
     * * 130: 穴掘りなどで硬直している状態
     * * 140: ロープにつかまっている状態
     * * 145: 乗れるカイオール（方向キーで移動）に乗っている状態
     * * 150: {@link MasaoJSS#setMyWait|setMyWait}で硬直している状態
     * * 200〜250: 死亡
     *
     * @returns {number} 主人公の状態
     */
	this.getMyObjectCondition = function()
	{
		if(mc.mp)
			return mc.mp.co_j.c;
		else
			return 0;
	}

    /**
     * 主人公のアニメーションカウンタを返します。
     * アニメーションカウンタの値は0〜3です。
     *
     * @returns {number} アニメーションカウンタ
     */
	this.getMyObjectAC = function()
	{
		if(mc.mp)
			return mc.mp.co_j.ac;
		else
			return 0;
	}

    /**
     * 主人公の現在の画像のパターンコードを返します。
     *
     * @returns {number} パターンコード
     */
	this.getMyObjectPattern = function()
	{
		if(mc.mp)
			return mc.mp.co_j.pt;
		else
			return 0;
	}

    /**
     * 主人公の向きを取得します。0が左向きで1が右向きです。
     * ハシゴに捕まっている場合、上に移動時は2、下に移動時は3を返します。
     * 4方向移動の正男の場合も、上向きのときは2、下向きのときは3を返します。
     *
     * @returns {number} 主人公の向き
     * @see {@link MasaoJSS#getMyDirection|getMyDirection}
     */
	this.getMyDirection4way = function()
	{
		var byte0 = -1;
		if(this.getMode() >= 100 && this.getMode() < 200)
		{
			var i;
			if(mc.mp.j_tokugi == 15)
				i = mc.mp.j_4_muki;
			else
			if(mc.mp.co_j.direction == 2 || mc.mp.co_j.direction == 3)
				i = mc.mp.co_j.direction;
			else
				i = mc.mp.co_j.muki;
			return i;
		} else
		{
			return -1;
		}
	}

    /**
     * 主人公の画像をパターンコードで設定します。
     *
     * @param {number} pattern パターンコード
     */
	this.setMyObjectPattern = function(s)
	{
		var byte0 = -1;
		if(mc.mp)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i >= 0 && i <= 249)
			{
				mc.mp.co_j.pt = i;
				return true;
			} else
			{
				return false;
			}
		} else
		{
			return false;
		}
	}

    /**
     * 主人公の画像を設定します。
     * 画像の表示位置は主人公の位置からの相対位置で指定します。
     *
     * @param {ImageBuff} image 画像オブジェクト
     * @param {number} x 画像の表示位置
     * @param {number} y 画像の表示位置
     */
	this.setMyObjectImage = function(image, s, s1)
	{
		var flag = false;
		var flag1 = false;
		if(mc.mp)
		{
			var i;
			var j;
			i = parseInt(s);
			j = parseInt(s1);
			if(isNaN(i) || isNaN(j))
			{
				i = 0;
				j = 0;
			}
			mc.mp.co_j.img = image;
			mc.mp.co_j.zs_x = i;
			mc.mp.co_j.zs_y = j;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 指定した敵の画像を指定したパターンコードに変更します。
     *
     * @param {number} id 敵ID
     * @param {number} pattern パターンコード
     */
	this.setEnemyObjectPattern = function(s, s1)
	{
		var byte0 = -1;
		var j = 0;
		if(mc.mp)
		{
			var i;
			i = parseInt(s);
			j = parseInt(s1);
			if(isNaN(i) || isNaN(j))
			{
				i = -1;
			}
			if(i < 0 || i > 229)
				return false;
			if(j >= 0 && j <= 249)
			{
				mc.mp.co_t[i].pt = j;
				return true;
			} else
			{
				return false;
			}
		} else
		{
			return false;
		}
	}

    /**
     * 指定した敵の種類および状態を数値で取得します。
     *
     * * 10: 未出現
     * * 50: 敵（死亡）
     * * 52: 敵（死亡）
     * * 54: 敵（死亡）
     * * 55: 爆風
     * * 57: 爆風
     * * 60: 追跡亀（復活待ち）
     * * 100: 亀（空白で向きを変える、左向き）
     * * 104: 
     * * 105: 亀（空白で向きを変える、右向き）
     * * 110: 亀（空白で落ちる、左向き）
     * * 115: 亀（空白で落ちる、右向き）
     * * 120: 亀（落下中、左向き）
     * * 125: 亀（落下中、右向き）
     * * 150:
     * * 200: ピカチー（地上）
     * * 210: ピカチー（ジャンプ中）
     * * 300: チコリン（はっぱカッター）
     * * 310: チコリン（ヒノララシを投げる/マリリを投げる）
     * * 320: チコリン（はっぱカッター乱れ打ち）
     * * 330: チコリン（ソーラービーム左向き）
     * * 335: チコリン（ソーラービーム右向き）
     * * 400: ヒノララシ（左向き）
     * * 404:
     * * 410: ヒノララシ
     * * 405: ヒノララシ（右向き）
     * * 410: ヒノララシ（穴に落ちる、左向き）
     * * 415: ヒノララシ（穴に落ちる、右向き）
     * * 420: ヒノララシ（落下中、左向き）
     * * 425: ヒノララシ（落下中、右向き）
     * * 450: ヒノララシ（投げられている）
     * * 500: ポッピー（上下移動）
     * * 510: ポッピー（直進、左向き）
     * * 515: ポッピー（直進、右向き）
     * * 520: ポッピー（火の粉）
     * * 530: ポッピー（火の粉3連射）
     * * 540: ポッピー（バブル光線3発）
     * * 550: ポッピー（ハリケンブラスト）
     * * 600: マリリ（左向き）
     * * 605: マリリ（右向き）
     * * 650: マリリ（投げられている）
     * * 660: マリリ（左右移動）
     * * 670: マリリ（体当たり）
     * * 700: ヤチャモ
     * * 710: ヤチャモ（火の粉連射/火の粉3連射）
     * * 720: ヤチャモ（破壊光線左向き）
     * * 725: ヤチャモ（破壊光線右向き）
     * * 800: ミズタロウ（初期位置）
     * * 810: ミズタロウ（移動）
     * * 850: ミズタロウ（シューティング）
     * * 900: エアームズ（壁に当たると止まる）
     * * 910: エアームズ（停止）
     * * 920: エアームズ（その場で爆弾/グレネード投下）
     * * 930: エアームズ（左右に動いて爆弾投下）
     * * 950: エアームズ（壁に当たると向きを変える、左向き）
     * * 960: エアームズ（壁に当たると向きを変える、右向き）
     * * 1000: タイキング（左右移動、左向き）
     * * 1002: タイキング（シューティング）
     * * 1003: タイキング（4方向移動）
     * * 1005: タイキング（左右移動、右向き）
     * * 1050: タイキング（はねる）
     * * 1060: タイキング（縄張りをまもる）
     * * 1070: タイキング（左回り）
     * * 1080: タイキング（右回り）
     * * 1100: クラゲッソ（バブル光線）
     * * 1102: クラゲッソ（シューティング）
     * * 1103: クラゲッソ（4方向移動）
     * * 1150: クラゲッソ（近づくと落ちる）
     * * 1160: クラゲッソ（縄張りをまもる）
     * * 1170: クラゲッソ（左回り）
     * * 1180: クラゲッソ（右回り）
     * * 1200: 追跡亀（左向き）
     * * 1210: 追跡亀（右向き）
     * * 1220: 追跡亀（落下中）
     *
     * @param {number} id 敵ID
     *
     * @returns {number} 敵の状態
     */
	this.getEnemyObjectCondition = function(s)
	{
		var byte0 = -1;
		if(mc.mp)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 0 || i > 229)
				return 0;
			else
				return mc.mp.co_t[i].c;
		} else
		{
			return 0;
		}
	}

    /**
     * 指定した敵の現在の画像をパターンコードで返します。
     *
     * @param {number} id 敵ID
     *
     * @returns {number} パターンコード
     */
	this.getEnemyObjectPattern = function(s)
	{
		var byte0 = -1;
		if(mc.mp)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 0 || i > 229)
				return 0;
			else
				return mc.mp.co_t[i].pt;
		} else
		{
			return 0;
		}
	}

    /**
     * 指定した敵のX座標を返します。
     *
     * @param {number} id 敵ID
     * 
     * @returns {number} X座標
     */
	this.getEnemyObjectX = function(s)
	{
		var byte0 = -1;
		if(mc.mp)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 0 || i > 229)
				return 0;
			else
				return mc.mp.co_t[i].x;
		} else
		{
			return 0;
		}
	}

    /**
     * 指定した敵のY座標を返します。
     *
     * @param {number} id 敵ID
     *
     * @returns {number} Y座標
     */
	this.getEnemyObjectY = function(s)
	{
		var byte0 = -1;
		if(mc.mp)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 0 || i > 229)
				return 0;
			else
				return mc.mp.co_t[i].y;
		} else
		{
			return 0;
		}
	}

    /**
     * 敵IDの最大値を返します。
     *
     * @returns {number} 敵IDの最大値
     */
	this.getEnemyObjectLength = function()
	{
		var byte0 = -1;
		if(mc.mp)
			return mc.mp.t_kazu + 1;
		else
			return 0;
	}

    /**
     * 指定した敵の向きを返します。
     * 向きは0が左、1が右です。
     *
     * @param {number} id 敵ID
     *
     * @returns {number} 敵の向き
     */
	this.getEnemyObjectDirection = function(s)
	{
		var byte0 = -1;
		var flag = false;
		var flag1 = false;
		if(mc.mp)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 0 || i > 229)
				return 0;
			var k = 0;
			var j = mc.mp.co_t[i].c;
			if(j >= 1400 && j < 1500)
				k = mc.mp.co_t[i].direction;
			else
			if(j >= 1200 && j <= 1230)
				k = mc.mp.co_t[i].direction;
			else
				k = mc.mp.co_t[i].pth;
			return k;
		} else
		{
			return 0;
		}
	}

    /**
     * 指定した敵の画像を変更します。
     * 画像の表示位置は敵の位置からの相対位置で指定します。
     *
     * @param {number} id 敵ID
     * @param {ImageBuff} image 画像
     * @param {number} x 表示位置
     * @param {number} y 表示位置
     */
	this.setEnemyObjectImage = function(s, image, s1, s2)
	{
		var byte0 = -1;
		var j = 0;
		var k = 0;
		if(mc.mp)
		{
			var i;
			i = parseInt(s);
			j = parseInt(s1);
			k = parseInt(s2);
			if(isNaN(i) || isNaN(j) || isNaN(k))
			{
				i = -1;
			}
			if(i < 0 || i > 229)
			{
				return false;
			} else
			{
				mc.mp.co_t[i].img = image;
				mc.mp.co_t[i].zs_x = j;
				mc.mp.co_t[i].zs_y = k;
				return false;
			}
		} else
		{
			return false;
		}
	}

    /**
     * 指定した敵のアニメーションカウンタを取得します。
     * アニメーションカウンタは全ての敵で共通です。
     * 
     * @returns {number} アニメーションカウンタ
     */
	this.getEnemyAC = function()
	{
		if(mc.mp)
			return mc.mp.g_c2;
		else
			return 0;
	}

    /**
     * 新しいチップ画像をロードし、そのIDを返します。
     * 読み込める画像は32個までです。
     * チップ画像は指定した大きさごとに分割され、
     *
     * @param {string} filename ファイル名
     * @param {number} width 1チップの大きさ
     * @param {number} height 1チップの大きさ
     * @param {number} xcount チップの分割数
     * @param {number} ycount チップの分割数
     *
     * @returns {number} チップ画像ID
     */
	this.newChipImage = function(s, s1, s2, s3, s4)
	{
		var i = -1;
		var j = 0;
		var k = 0;
		var l = 0;
		var i1 = 0;
		i = parseInt(s1);
		j = parseInt(s2);
		k = parseInt(s3);
		l = parseInt(s4);
		if(isNaN(i) || isNaN(j) || isNaN(k) || isNaN(l))
		{
			i = -1;
		}
		if(i < 0)
			return -1;
		var j1;
		for(j1 = 0; j1 <= 31 && this.oci[j1]; j1++);
		if(j1 > 31)
			return -1;
		i1 = j1;
		var img = this.newImageOnLoad(s);
		this.oci[i1] = new ChipImage(i, j, k, l, img);
		mc.pushMessage("makeChipImage", img,
			{ chipimage : this.oci[i1] } );
		return i1;
	}

    /**
     * {@link MasaoJSS#newChipImage|newChipImage}で生成したチップ画像に対して左右反転・上下反転・180度回転した画像を生成します。
     * {@link MasaoJSS#getChipImage|getChipImage}の第二引数で0以外の値を使用するには、このメソッドを先に呼び出しておく必要があります。
     * このメソッドはnewChipImage後に1回だけ呼び出してください。
     *
     * @param {number} id チップ画像ID
     */
	this.makeReverseChipImage = function(s)
	{
		var i = 0;
		i = parseInt(s);
		if(isNaN(i))
		{
			i = -1;
		}
		if(i < 0)
			return false;
		else
		{
			this.oci[i].createImageBuffer(1);
			this.oci[i].createImageBuffer(2);
			this.oci[i].createImageBuffer(3);
			mc.pushMessage("makeReverseChipImage", this.oci[i].ai_img,
				{ chipimage : this.oci[i] } );
			return true;
		}
	}

    /**
     * {@link MasaoJSS#getChipImage|getChipImage}で生成したチップ画像から、チップを1つ取得します。
     * 引数`code`はパターンコードのように、数値でチップの位置を指定します。左上が0、その右が、1,2,…となり、行が終わると次の行の左に戻ります。
     * 引数`dir`は画像の向きです。0で普通、1で左右反転、2で上下反転、3で180度回転した画像を返します。ただし、1以上を使用するにはまず{@link MasaoJSS#makeReverseChipImage|makeReverseChipImage}で反転画像を生成する必要があります。
     *
     * @param {number} id チップ画像ID
     * @param {number} code 画像コード
     * @param {number} dir 向き
     *
     * @returns {ImageBuff} チップの画像オブジェクト
     */
	this.getChipImage = function(s, s1, s2)
	{
		var i = 0;
		var j = -1;
		var k = 0;
		if(!s1) s1 = "0";
		if(!s2) s2 = "0";
		i = parseInt(s);
		j = parseInt(s1);
		k = parseInt(s2);
		if(isNaN(i) || isNaN(j) || isNaN(k))
		{
			i = -1;
		}
		if(i < 0)
			return null;
		if(j < 0)
			return null;
		if(k < 0 || k > 3)
			k = 0;
		return this.oci[i].getChipImage(j, k);
	}

    /**
     * {@link MasaoJSS#newChipImage|newChipImage}で生成した画像を破棄します。
     *
     * @param {number} id チップ画像ID
     */
	this.disposeChipImage = function(s)
	{
		var i = 0;
		i = parseInt(s);
		if(isNaN(i))
		{
			i = -1;
		}
		if(i < 0)
		{
			return false;
		} else
		{
			this.oci[i] = null;
			return true;
		}
	}

    /**
     * スクロール可能な領域をピクセル単位で設定します。
     * 引数は全て画面の左上の位置で指定します。
     * マップの左上が(32, 320)です。
     *
     * @param {number} x1 範囲左上の座標
     * @param {number} y1 範囲左上の座標
     * @param {number} x2 範囲右下の座標
     * @param {number} y2 範囲右下の座標
     */
	this.setScrollAreaReal = function(s, s1, s2, s3)
	{
		if(mc.mp)
			return mc.mp.setScrollAreaReal(s, s1, s2, s3);
		else
			return false;
	}

    /**
     * 指定したキーコードのキーが押されているかを返します。
     * 1なら押されていて、0なら押されていません。
     *
     * @param {number} code キーコード
     *
     * @returns {number} 
     */
	this.isPressCodeKey = function(s)
	{
		var flag = false;
		if(mc.gk)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 0 || i > 255)
				return 0;
			return !mc.gk.codekey_f[i] ? 0 : 1;
		} else
		{
			return 0;
		}
	}

    /**
     * 指定した音声ファイルをBGMとして再生します。
     * 再生終了したら停止します。
     * 
     * @param {string} filename ファイル名
     *
     * @see {@link MasaoJSS#playBGMLoop|playBGMLoop}
     */
	this.playBGM = function(s)
	{
		if(mc.gs)
			return mc.gs.playUserBGMFile(s);
		else
			return false;
	}

    /**
     * 指定した音声ファイルをBGMとして再生します。
     * 再生終了したらループします。
     *
     * @param {string} filename ファイル名
     *
     * @see {@link MasaoJSS#playBGM|playBGM}
     */
	this.playBGMLoop = function(s)
	{
		if(mc.gs)
			return mc.gs.playUserBGMFileLoop(s);
		else
			return false;
	}

    /**
     * BGMを停止します。
     *
     */
	this.stopBGM = function()
	{
		if(mc.gs)
		{
			mc.gs.stopBGM();
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * ボスのHPを取得します。
     *
     * @returns {number} ボスのHP
     */
	this.getBossHP = function()
	{
		if(mc.mp)
			return mc.mp.getBossHP();
		else
			return 0;
	}

    /**
     * ボスのHPを設定します。
     *
     * @param {number} hp 新しいHP
     */
	this.setBossHP = function(s)
	{
		var i = parseInt(s);
		if(isNaN(i))
			return false;
		if(mc.mp)
			return mc.mp.setBossHP(i);
		else
			return false;
	}

    /**
     * ボスの向きを取得します。
     * 0が左向きで1が右向きです。
     *
     * @return {number} ボスの向き
     */
	this.getBossDirection = function()
	{
		if(mc.mp)
			return mc.mp.getBossDirection();
		else
			return 0;
	}

    /**
     * ボスが攻撃中かどうかを取得します。
     * 攻撃中の場合1、そうでない場合は0となります。
     *
     * @returns {number}
     */
	this.isBossAttackMode = function()
	{
		if(mc.mp)
			return mc.mp.isBossAttackMode();
		else
			return 0;
	}

    /**
     * ボスのX座標を取得します。
     *
     * @returns {number} ボスのX座標
     */
	this.setBossXReal = function(s)
	{
		var byte0 = 32;
		if(mc.mp)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -9999;
			}
			if(i < 0)
				return false;
			else
				return mc.mp.setBossXReal(i);
		} else
		{
			return false;
		}
	}

    /**
     * ボスのY座標を取得します。
     *
     * @returns {number} ボスのY座標
     */
	this.setBossYReal = function(s)
	{
		var c = '\u0140';
		if(mc.mp)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -9999;
			}
			if(i < 0)
				return false;
			else
				return mc.mp.setBossYReal(i);
		} else
		{
			return false;
		}
	}

    /**
     * ボスの画像を設定します。
     * 画像の位置はボスの位置からの相対座標で指定します。
     *
     * @param {ImageBuff} image ボスの画像
     * @param {number} x 画像の位置
     * @param {number} y 画像の位置
     */
	this.setBossObjectImage = function(image, s, s1)
	{
		var flag = false;
		var flag1 = false;
		if(mc.mp)
		{
			var i;
			var j;
			i = parseInt(s);
			j = parseInt(s1);
			if(isNaN(i) || isNaN(j))
			{
				i = 0;
				j = 0;
			}
			mc.mp.co_b.img = image;
			mc.mp.co_b.zs_x = i;
			mc.mp.co_b.zs_y = j;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * パターン画像を部分的に書き換えます。
     * パターンコード`dest`の画像をパターンコード`newcode`の画像に書き換えます。
     *
     * @param {number} dest 書き換え対象のパターンコード
     * @param {number} newcode 新しい画像のパターンコード
     */
	this.setSystemPattern = function(s, s1)
	{
		var flag = true;
		var j = 1;
		if(mc.mp)
		{
			var i;
			i = parseInt(s);
			j = parseInt(s1);
			if(isNaN(i) || isNaN(j))
			{
				i = -1;
			}
			if(i < 1 || i > 249)
				return false;
			if(j < 1 || j > 249)
			{
				return false;
			} else
			{
				mc.mp.hih[0][i] = mc.mp.hih[0][j];
				mc.mp.hih[1][i] = mc.mp.hih[1][j];
				mc.mp.setmapc_f = true;
				return true;
			}
		} else
		{
			return false;
		}
	}

    /**
     * パターン画像を部分的に置き換えます。
     * パターンコード`code`の画像を指定した画像に変更します。
     * `dir`に0を指定すると左向き、1を指定すると右向きの画像を変更します。
     *
     * @param {number} code パターンコード
     * @param {number} dir 向き
     * @param {ImageBuff} image 画像
     */
	this.setSystemPatternImage = function(s, s1, image)
	{
		var flag = true;
		var j = 0;
		if(mc.mp)
		{
			var i;
			i = parseInt(s);
			j = parseInt(s1);
			if(isNaN(i) || isNaN(j))
			{
				i = -1;
			}
			if(i < 1 || i > 249)
				return false;
			if(j < 0 || j > 1)
				j = 0;
			mc.mp.hih[j][i] = image;
			mc.mp.setmapc_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	this.setFontSize = function(s)
	{
		var byte0 = 14;
		if(mc.gg)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i <= 0)
			{
				return false;
			} else
			{
				mc.gg.os_g.setFont(new Font("Dialog", 0, i));
				return true;
			}
		} else
		{
			return false;
		}
	}

    /**
     * 新しいフォントオブジェクトを作って返します。
     * スタイルは次の数値で指定します。
     * * 0: 普通
     * * 1: 太字
     * * 2: 斜体
     * * 3: 太字で斜体
     *
     * @param {string} fontname フォント名
     * @param {number} style スタイル
     * @param {number} size サイズ
     *
     * @returns {Font} フォントオブジェクト
     */
	this.newFont = function(s, s1, s2)
	{
		var byte0 = 14;
		var j = 0;
		if(mc.gg)
		{
			var i;
			j = parseInt(s1);
			i = parseInt(s2);
			if(isNaN(i) || isNaN(j))
			{
				i = -1;
			}
			if(i <= 0)
				return null;
			if(j == 1)
				j = 1;
			else
			if(j == 2)
				j = 2;
			else
				j = 0;
			var font = new Font(s, j, i);
			return font;
		} else
		{
			return null;
		}
	}

	this.getCoinCount = function(s, s1, s2, s3)
	{
		var flag = false;
		var j = 0;
		var k = 0;
		var l = 0;
		if(arguments.length == 0)
		{
			s = "0";
			s1 = "0";
			s2 = "179";
			s3 = "29";
		}
		if(mc.mp)
		{
			var i;
			i = parseInt(s);
			j = parseInt(s1);
			k = parseInt(s2);
			l = parseInt(s3);
			if(isNaN(i) || isNaN(j) || isNaN(k) || isNaN(l))
			{
				i = -1;
			}
			if(i < 0)
				return -1;
			else
				return mc.mp.getCoinCount(i, j, k, l);
		} else
		{
			return -1;
		}
	}

    /**
     * マップに残っているコインの数を返します。
     *
     * @returns {number} コインの数
     */
	this.getCoinCount = function()
	{
		if(mc.mp)
			return mc.mp.getCoinCount(0, 0, 179, 29);
		else
			return -1;
	}

    /**
     * 主人公の特技を追加します。
     * 引数の値はparamの`j_add_tokugi`と同じです。
     *
     * @param {number} tokugi 追加の特技
     *
     * @see {@link MasaoJSS#removeMyTokugi|removeMyTokugi}
     */
	this.addMyTokugi = function(s)
	{
		var byte0 = -1;
		var flag = false;
		if(this.getMode() >= 100 && this.getMode() < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 0)
				return false;
			else
				return mc.mp.addMyTokugi(i);
		} else
		{
			return flag;
		}
	}

    /**
     * 主人公の特技を削除します。
     *
     * @param {number} tokugi 削除する特技
     *
     * @see {@link MasaoJSS#addMyTokugi|addMyTokugi}
     */
	this.removeMyTokugi = function(s)
	{
		var byte0 = -1;
		var flag = false;
		if(this.getMode() >= 100 && this.getMode() < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 0)
				return false;
			else
				return mc.mp.removeMyTokugi(i);
		} else
		{
			return flag;
		}
	}

    /**
     * スコアの値を設定します。
     *
     * @param {number} score スコア
     *
     * @see {@link MasaoJSS#addScore|addScore}
     */
	this.setScore = function(s)
	{
		var flag = false;
		var flag1 = false;
		if(mc.mp)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = 0;
			}
			mc.mp.score = i;
			mc.mp.addScore(0);
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * バリアの残り時間を取得します。
     *
     * @returns {number} バリアの残り時間
     */
	this.getBarrierTime = function()
	{
		var flag = false;
		if(mc.mp && mc.mp.ml_mode == 100 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i = mc.mp.j_v_c;
			return i;
		} else
		{
			return -1;
		}
	}

    /**
     * 残りタイムを取得します。
     * タイムがない場合は-1となります。
     *
     * @returns {number} 残りタイム
     */
	this.getTimeLimit = function()
	{
		var flag = false;
		if(mc.mp && mc.mp.time_max > 0 && mc.mp.ml_mode == 100)
		{
			var i = Math.floor(mc.mp.time / 1000);
			return i;
		} else
		{
			return -1;
		}
	}

    /**
     * 残りタイムを設定します。
     * タイムがない正男の場合は設定できません。
     *
     * @param {number} time 残りタイム
     */
	this.setTimeLimit = function(s)
	{
		var flag = false;
		if(mc.mp && mc.mp.time_max > 0)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 0)
			{
				return false;
			} else
			{
				mc.mp.time = (i * 1000 + 1000) - 70;
				return true;
			}
		} else
		{
			return false;
		}
	}

    /**
     * 指定した位置（ブロック単位）に仕掛けを設置します。
     * 仕掛け番号は、paramの`firebar1_type`などで指定する数値と同じです。（1のときはファイヤーバー（左回り）になります。）
     *
     * @param {number} x X座標
     * @param {number} y Y座標
     * @param {number} athletic 仕掛け番号
     */
	this.setAthletic = function(s, s1, s2)
	{
		var byte0 = -1;
		var j = 0;
		var k = 0;
		if(this.getMode() >= 100 && this.getMode() < 200)
		{
			var i;
			j = parseInt(s);
			k = parseInt(s1);
			i = parseInt(s2);
			if(isNaN(j) || isNaN(k) || isNaN(i))
			{
				i = -1;
			}
			if(i < 0)
				return false;
			if(j < 0)
				j = 0;
			if(j > 179)
				j = 179;
			if(k < 0)
				k = 0;
			if(k > 29)
				k = 29;
			j++;
			k += 10;
			var l = 0;
			if(mc.mp.maps.map_bg[j - 1][k] == 4)
				l = 4;
			if(i >= 2)
			{
				var word0 = mc.mp.setAthleticOnMap(i, j, k);
				if(word0 == -99)
				{
					mc.mp.aSet(j * 32 + 16, k * 32 + 16, 70, j * 32);
					l = 50;
				} else
				{
					l = word0;
				}
			} else
			{
				mc.mp.aSet(j * 32 + 16, k * 32 + 16, 70, j * 32);
				l = 50;
			}
			mc.mp.maps.map_bg[j][k] = l;
			mc.mp.setmapc_f = true;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * セカンド画像を再設定します。
     *
     * @param {string} filename ファイル名
     */
	this.setSecondImage = function(s)
	{
		if(this.getMode() >= 100 && this.getMode() < 200)
		{
			var image = mc.gg.loadImage(s);
			mc.mp.second_gazou_img = image;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * グレネードの装備数を変更します。
     *
     * @param {number} num 新しい装備数
     *
     * @see {@link MasaoJSS#equipGrenade|equipGrenade}と同じです。
     */
	this.setGrenadeCount = function(s)
	{
		var flag = false;
		if(this.getMode() >= 100 && this.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 0)
			{
				return false;
			} else
			{
				mc.mp.j_gr_kazu = i;
				return true;
			}
		} else
		{
			return false;
		}
	}

    /**
     * 主人公の残りコンティニュー数を設定します。
     *
     * @param {number} left 新しい残りコンティニュー数
     */
	this.setMyLeft = function(s)
	{
		var flag = false;
		if(this.getMode() >= 100 && this.getMode() < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 0)
			{
				return false;
			} else
			{
				mc.mp.j_left = i;
				return true;
			}
		} else
		{
			return false;
		}
	}

    /**
     * グレネードの残り弾数を取得します。
     *
     * @returns {number} グレネードの残り弾数
     */
	this.getGrenadeCount = function()
	{
		var i = 0;
		if(this.getMode() >= 100 && this.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			i = mc.mp.j_gr_kazu;
			if(i < 0)
				i = 0;
			return i;
		} else
		{
			return i;
		}
	}

    /**
     * 主人公の残機数を取得します。
     *
     * @returns {number} 残機数
     */
	this.getMyLeft = function()
	{
		var i = -1;
		if(this.getMode() >= 100 && this.getMode() < 200)
		{
			i = mc.mp.j_left;
			return i;
		} else
		{
			return i;
		}
	}

    /**
     * 雑魚敵を踏めるか否かの設定を変更します。
     * paramの`j_enemy_press`と同じです。
     * 3を設定した場合雑魚敵との全ての当たり判定がなくなります。
     *
     * * 1: 踏める
     * * 2: 踏めない（自分がダメージを受ける）
     * * 3: 当たり判定なし
     *
     * @param {number} j_enemy_press
     */
	this.setEnemyPress = function(s)
	{
		var flag = true;
		if(this.getMode() >= 100 && this.getMode() < 200)
		{
			var i;
			i = parseInt(s);
			if(isNaN(i))
			{
				i = -1;
			}
			if(i < 0)
				return false;
			if(i < 1 || i > 3)
				i = 1;
			mc.mp.j_enemy_press = i;
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * 画面上の指定した位置にパターン画像を描画します。
     * `dir`は0なら左向き、1なら右向きです。
     *
     * @param {number} x X座標
     * @param {number} y Y座標
     * @param {number} code パターンコード
     * @param {Numbeer} dir 向き
     */
	this.drawPattern = function(s, s1, s2, s3)
	{
		var flag = false;
		var j = 0;
		var k = 0;
		var l = 0;
		if(mc.gg)
		{
			var i;
			i = parseInt(s);
			j = parseInt(s1);
			k = parseInt(s2);
			l = parseInt(s3);
			if(isNaN(i) || isNaN(j) || isNaN(k) || isNaN(l))
			{
				i = -9999;
			}
			if(i == -9999)
				return false;
			if(k < 0 || k > 249)
				k = 0;
			if(l < 0 || l > 1)
				l = 0;
			mc.gg.drawPattern(i, j, k, l);
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * グラフィクス系の描画メソッドを使用するときの色を設定します。
     * 全ての値は0から255の整数で指定します。
     *
     * @param {number} r R成分
     * @param {number} g G成分
     * @param {number} b B成分
     * @param {number} alpha 不透明度
     */
	this.setOffscreenColor = function(s, s1, s2, s3)
	{
		var flag = false;
		var j = 0;
		var k = 0;
		var l = 0;
		if(mc.gg)
		{
			var i;
			i = parseInt(s);
			j = parseInt(s1);
			k = parseInt(s2);
			l = parseInt(s3);
			if(isNaN(i) || isNaN(j) || isNaN(k) || isNaN(l))
			{
				i = -9999;
			}
			if(i == -9999)
				return false;
			if(i < 0)
				i = 0;
			if(i > 255)
				i = 255;
			if(j < 0)
				j = 0;
			if(j > 255)
				j = 255;
			if(k < 0)
				k = 0;
			if(k > 255)
				k = 255;
			if(l < 0)
				l = 0;
			if(l > 255)
				l = 255;
			mc.gg.os_g.setColor(new Color(i, j, k, l));
			return true;
		} else
		{
			return false;
		}
	}

	this.drawImage = function(s, s1, s2) // 使用不可
	{
		/*var flag = false;
		var j = 0;
		var obj = null;
		if(mc.gg)
		{
			var i;
			i = parseInt(s1);
			j = parseInt(s2);
			if(isNaN(i) || isNaN(j))
			{
				i = -9999;
			}
			if(i == -9999)
				return false;
			var image = mc.getImage(s);
			MediaTracker mediatracker = new MediaTracker(this);
			mediatracker.addImage(image, 0);
			try
			{
				mediatracker.waitForID(0);
			}
			catch(Exception exception)
			{
				exception.printStackTrace();
			}
			mc.gg.os_g.drawImage(image, i, j, this);
			return true;
		} else
		{
			return false;
		}*/
		return false;
	}

    /**
     * 画面に三角形または四角形を描画します。
     *
     * @param {number} x1 点1のX座標
     * @param {number} y1 点1のY座標
     * @param {number} x2 点2のX座標
     * @param {number} y2 点2のY座標
     * @param {number} x3 点3のX座標
     * @param {number} y3 点3のY座標
     * @param {number} [x4] 点4のX座標
     * @param {number} [y4] 点4のY座標
     */
	this.fillPolygon = function(s, s1, s2, s3, s4, s5, s6, s7)
	{
		var ai, ai1;
		if(mc.gg)
		{
			if(arguments.length == 6)
			{
				ai = new Array(3);
				ai1 = new Array(3);
				ai[0] = parseInt(s);
				ai1[0] = parseInt(s1);
				ai[1] = parseInt(s2);
				ai1[1] = parseInt(s3);
				ai[2] = parseInt(s4);
				ai1[2] = parseInt(s5);
				if(isNaN(ai[0]) || isNaN(ai1[0]) || isNaN(ai[1]) || isNaN(ai1[1]) ||isNaN(ai[2]) || isNaN(ai1[2]))
				{
					ai[0] = -9999;
				}
				if(ai[0] == -9999)
				{
					return false;
				} else
				{
					mc.gg.os_g.fillPolygon(ai, ai1, 3);
					return true;
				}
			}
			else if(arguments.length == 8)
			{
				ai = new Array(3);
				ai1 = new Array(3);
				ai[0] = parseInt(s);
				ai1[0] = parseInt(s1);
				ai[1] = parseInt(s2);
				ai1[1] = parseInt(s3);
				ai[2] = parseInt(s4);
				ai1[2] = parseInt(s5);
				ai[3] = parseInt(s6);
				ai1[3] = parseInt(s7);
				if(isNaN(ai[0]) || isNaN(ai1[0]) || isNaN(ai[1]) || isNaN(ai1[1]) || isNaN(ai[2]) || isNaN(ai1[2]) || isNaN(ai[3]) || isNaN(ai1[3]))
				{
					ai[0] = -9999;
				}
				if(ai[0] == -9999)
				{
					return false;
				} else
				{
					mc.gg.os_g.fillPolygon(ai, ai1, 4);
					return true;
				}
			}
		} else
		{
			return false;
		}
	}

    /**
     * 画面に指定した画像を回転させて描画します。
     * 座標は、無回転のときの画像の左上の位置で指定します。
     *
     * @param {ImageBuff} image 画像オブジェクト
     * @param {number} x X座標
     * @param {number} y Y座標
     * @param {number} angle 角度（度数法）
     */
	this.drawImageRotate = function(image, s, s1, s2)
	{
		var flag = false;
		var j = 0;
		var k = 0;
		var obj = null;
		if(mc.gg)
		{
			var i;
			i = parseInt(s);
			j = parseInt(s1);
			k = parseInt(s2);
			if(isNaN(i) || isNaN(j) || isNaN(k))
			{
				i = -9999;
			}
			if(i == -9999)
			{
				return false;
			} else
			{
				var graphics2d = mc.gg.os_img.getGraphics();
				var l = i + image._width / 2;
				var i1 = j + image._height / 2;
				graphics2d.rotate((k * Math.PI) / 180, l, i1);
				graphics2d.drawImage(image, i, j, this);
				graphics2d.dispose();
				return true;
			}
		} else
		{
			return false;
		}
	}

    /**
     * 画面に指定した画像を拡大または縮小して描画します。
     * 座標は画像の左上の位置で指定します。
     * 拡大縮小の中心点も画像の左上となります。
     * 倍率は、パーセント（100で等倍）で指定します。
     *
     * @param {ImageBuff} image 画像オブジェクト
     * @param {number} x X座標
     * @param {number} y Y座標
     * @param {number} scalex X方向倍率
     * @param {number} scaley Y方向倍率
     */
	this.drawImageScale = function(image, s, s1, s2, s3)
	{
		var flag = false;
		var j = 0;
		var k = 100;
		var l = 100;
		var obj = null;
		if(mc.gg)
		{
			var i;
			i = parseInt(s);
			j = parseInt(s1);
			k = parseInt(s2);
			l = parseInt(s3);
			if(isNaN(i) || isNaN(j) || isNaN(k) || isNaN(l))
			{
				i = -9999;
			}
			if(i == -9999)
			{
				return false;
			} else
			{
				var graphics2d = mc.gg.os_img.getGraphics();
				graphics2d.translate(i, j);
				graphics2d.scale(k / 100, l / 100);
				graphics2d.drawImage(image, 0, 0, this);
				graphics2d.dispose();
				return true;
			}
		} else
		{
			return false;
		}
	}

    /**
     * 画面に指定した画像を指定した透明度で描画します。
     * 座標は画像の左上の位置で指定します。
     * 不透明度は0から100で、0で完全に透明、100で完全に不透明になります。
     *
     * @param {ImageBuff} image 画像オブジェクト
     * @param {number} x X座標
     * @param {number} y Y座標
     * @param {number} alpha 不透明度
     */
	this.drawImageAlphaComposite = function(image, s, s1, s2)
	{
		var flag = false;
		var j = 0;
		var k = 100;
		var obj = null;
		if(mc.gg)
		{
			var i;
			i = parseInt(s);
			j = parseInt(s1);
			k = parseInt(s2);
			if(isNaN(i) || isNaN(j) || isNaN(k))
			{
				i = -9999;
			}
			if(i == -9999)
				return false;
			if(k < 0)
				k = 0;
			else
			if(k > 100)
				k = 100;
			var graphics2d = mc.gg.os_img.getGraphics();
			graphics2d.setGlobalAlpha(k / 100 * 255);
			graphics2d.drawImage(image, i, j, this);
			graphics2d.dispose();
			return true;
		} else
		{
			return false;
		}
	}

    /**
     * ポーズ中かどうか判定します。
     * ポーズ中なら1、そうでなければ0を返します。
     *
     * @returns {number}
     * @since canvas正男
     */
	this.isPaused = function()
	{
		if(mc.mp)
		{
			if(mc.mp.ml_mode == 110)
				return 1;
			else
				return 0;
		}
		return 0;
	}

    /**
     * ポーズまたはポーズ解除します。
     * 引数が1のときポーズ解除、0のときポーズとなります。
     *
     * @param {number} p
     *
     * @since canvas正男
     */
	this.pause = function(s)
	{
		var i;
		if(mc.mp)
		{
			i = parseInt(s);
			if(isNaN(i)) i = -1;
			if(i < 0 || i > 1)
				return false;
			if(i == 0 && mc.mp.ml_mode == 110)
				mc.mp.ml_mode = 100;
			else if(i == 1 && mc.mp.ml_mode == 100) {
				mc.mp.ml_mode = 110;
				mc.mp.ml_mode_c = 0;
			}
			else return false;
			return true;
		}
		return false;
	}
}
