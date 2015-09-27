
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

	this.getScore = function()
	{
		var i = 0;
		if(mc.mp)
			i = mc.mp.score;
		return i;
	}

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

	this.getMapchip = function(s, s1)
	{
		if(mc.mp)
			return mc.mp.getmapc(s, s1);
		else
			return -1;
	}

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

	this.getMapchip2 = function(s, s1)
	{
		if(mc.mp)
			return mc.mp.getmapc2(s, s1);
		else
			return -1;
	}

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

	this.getKeyCode = function()
	{
		if(mc.gk)
			return mc.gk.key_code;
		else
			return -1;
	}

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

	this.equipJet = function(s)
	{
		var flag = this.setJetFuel(s);
		return flag;
	}

	this.restart = function()
	{
		return mc.restart();
	}

	this.getValue = function(s)
	{
		if(mc.th_jm <= 0)
			return mc.tdb.getValue(s);
		else
			return null;
	}

	this.getParamValue = function(s)
	{
		if(mc.th_jm <= 0)
			return mc.tdb.getValue(s);
		else
			return null;
	}

	this.setValue = function(s, s1)
	{
		if(mc.th_jm <= 0)
			return mc.tdb.setValue(s, s1);
		else
			return false;
	}

	this.setParamValue = function(s, s1)
	{
		if(mc.th_jm <= 0)
			return mc.tdb.setValue(s, s1);
		else
			return false;
	}

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

	this.setScrollLock = function(s)
	{
		var flag = false;
		if(this.getMode() >= 100 && this.getMode() < 200)
			flag = mc.mp.setScrollLock(s);
		return flag;
	}

	this.attackFire = function(s, s1, s2, s3)
	{
		var i = 0;
		if(this.getMode() >= 100 && this.getMode() < 200)
			i = mc.mp.attackFire(s, s1, s2, s3);
		return i;
	}

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

	this.setSystemImage = function(s, s1)
	{
		if(mc.mp)
			return mc.mp.setSystemImage(s, s1);
		else
			return false;
	}

	this.setModeWait = function(s, s1)
	{
		if(mc.mp)
			return mc.mp.setModeWait(s, s1);
		else
			return false;
	}

	this.showMyHP = function(s)
	{
		if(mc.mp)
			return mc.mp.showMyHP(s);
		else
			return false;
	}

	this.setMyMaxHP = function(s)
	{
		if(mc.mp)
			return mc.mp.setMyMaxHP(s);
		else
			return false;
	}

	this.setMyHP = function(s)
	{
		if(mc.mp)
			return mc.mp.setMyHP(s);
		else
			return false;
	}

	this.getMyHP = function()
	{
		if(mc.mp)
			return mc.mp.getMyHP();
		else
			return 0;
	}

	this.setMyHPDamage = function(s)
	{
		if(mc.mp)
			return mc.mp.setMyHPDamage(s);
		else
			return false;
	}

	this.setMyWait = function(s, s1, s2)
	{
		return mc.mp.setMyWait(s, s1, s2);
	}

	this.setStageClear = function()
	{
		if(mc.mp)
			return mc.mp.setStageClear();
		else
			return false;
	}

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

	this.attackTail = function(s, s1, s2, s3)
	{
		var i = 0;
		if(this.getMode() >= 100 && this.getMode() < 200)
			i = mc.mp.attackTail(s, s1, s2, s3);
		return i;
	}

	this.destroyEnemy = function(s, s1, s2, s3)
	{
		var i = -1;
		if(this.getMode() >= 100 && this.getMode() < 200)
			i = mc.mp.destroyEnemy(s, s1, s2, s3);
		return i;
	}

	this.isPressZKey = function()
	{
		return !mc.gk || !mc.gk.z_f ? 0 : 1;
	}

	this.isPressXKey = function()
	{
		return !mc.gk || !mc.gk.x_f ? 0 : 1;
	}

	this.isPressSpaceKey = function()
	{
		return !mc.gk || !mc.gk.space_f ? 0 : 1;
	}

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

	this.newYuka = function(s, s1, s2, s3, s4)
	{
		if(mc.mp)
			return mc.mp.newYuka(s, s1, s2, s3, s4);
		else
			return -1;
	}

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

	this.setYukaType = function(s, s1)
	{
		if(mc.mp)
			return mc.mp.setYukaType(s, s1);
		else
			return false;
	}

	this.disposeYuka = function(s)
	{
		if(mc.mp)
			return mc.mp.disposeYuka(s);
		else
			return false;
	}

	this.setYukaColor = function(s, s1, s2, s3, s4)
	{
		if(mc.mp)
			return mc.mp.setYukaColor(s, s1, s2, s3, s4);
		else
			return false;
	}

	this.isRideYuka = function(s)
	{
		if(mc.mp)
			return mc.mp.isRideYuka(s);
		else
			return -1;
	}

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

	this.isRideGround = function()
	{
		if(mc.mp)
			return mc.mp.isRideGround();
		else
			return -1;
	}

	this.setYukaPattern = function(s, s1, s2)
	{
		if(mc.mp)
			return mc.mp.setYukaPattern(s, s1, s2);
		else
			return false;
	}

	this.setYukaImage = function(s, image)
	{
		if(mc.mp)
			return mc.mp.setYukaImage(s, image);
		else
			return false;
	}

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

	this.isPressUpKey = function()
	{
		return !mc.gk || !mc.gk.up_f ? 0 : 1;
	}

	this.isPressDownKey = function()
	{
		return !mc.gk || !mc.gk.down_f ? 0 : 1;
	}

	this.isPressLeftKey = function()
	{
		return !mc.gk || !mc.gk.left_f ? 0 : 1;
	}

	this.isPressRightKey = function()
	{
		return !mc.gk || !mc.gk.right_f ? 0 : 1;
	}

	this.newImageOnLoad = function(s)
	{
		var img = new ImageBuff();
		img.load(s);
		mc.pushMessage("load", img);
		return img;
	}

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

	this.getMyObjectCondition = function()
	{
		if(mc.mp)
			return mc.mp.co_j.c;
		else
			return 0;
	}

	this.getMyObjectAC = function()
	{
		if(mc.mp)
			return mc.mp.co_j.ac;
		else
			return 0;
	}

	this.getMyObjectPattern = function()
	{
		if(mc.mp)
			return mc.mp.co_j.pt;
		else
			return 0;
	}

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

	this.getEnemyObjectLength = function()
	{
		var byte0 = -1;
		if(mc.mp)
			return mc.mp.t_kazu + 1;
		else
			return 0;
	}

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

	this.getEnemyAC = function()
	{
		if(mc.mp)
			return mc.mp.g_c2;
		else
			return 0;
	}

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

	this.setScrollAreaReal = function(s, s1, s2, s3)
	{
		if(mc.mp)
			return mc.mp.setScrollAreaReal(s, s1, s2, s3);
		else
			return false;
	}

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

	this.playBGM = function(s)
	{
		if(mc.gs)
			return mc.gs.playUserBGMFile(s);
		else
			return false;
	}

	this.playBGMLoop = function(s)
	{
		if(mc.gs)
			return mc.gs.playUserBGMFileLoop(s);
		else
			return false;
	}

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

	this.getBossHP = function()
	{
		if(mc.mp)
			return mc.mp.getBossHP();
		else
			return 0;
	}

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

	this.getBossDirection = function()
	{
		if(mc.mp)
			return mc.mp.getBossDirection();
		else
			return 0;
	}

	this.isBossAttackMode = function()
	{
		if(mc.mp)
			return mc.mp.isBossAttackMode();
		else
			return 0;
	}

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

	this.getCoinCount = function()
	{
		if(mc.mp)
			return mc.mp.getCoinCount(0, 0, 179, 29);
		else
			return -1;
	}

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
