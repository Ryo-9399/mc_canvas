// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   MasaoFXApplet.java

import java.applet.Applet;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.net.URL;
import javax.imageio.ImageIO;

public class MasaoFXApplet extends Applet
	implements MasaoEventHandler
{

	public MasaoFXApplet()
	{
		my_offscreen_img = null;
		oci = new ChipImage[256];
	}

	public void init()
	{
		mc = new MasaoGhost(this, this);
	}

	public void paint(Graphics g)
	{
		if(my_offscreen_img != null)
		{
			if(mc.mp != null && !mc.mp.draw_lock_f)
				g.drawImage(my_offscreen_img, 0, 0, this);
		} else
		{
			g.setColor(Color.black);
			g.fillRect(0, 0, 512, 320);
			String s = getParameter("now_loading");
			if(s != null)
			{
				g.setColor(Color.white);
				g.setFont(new Font("Dialog", 0, 16));
				g.drawString(getParameter("now_loading"), 32, 160);
			}
		}
	}

	public void update(Graphics g)
	{
		paint(g);
	}

	public void start()
	{
		mc.start();
	}

	public void stop()
	{
		mc.stop();
	}

	public void destroy()
	{
		mc.destroy();
	}

	public void masaoEvent(Graphics g, Image image)
	{
		my_offscreen_img = image;
		repaint();
	}

	public int getHighscore()
	{
		int i = 0;
		if(mc.mp != null)
		{
			i = mc.mp.highscore;
			if(i < mc.mp.score)
				i = mc.mp.score;
		}
		return i;
	}

	public int getScore()
	{
		int i = 0;
		if(mc.mp != null)
			i = mc.mp.score;
		return i;
	}

	public int getMode()
	{
		int i = 0;
		if(mc.mp != null)
		{
			int j = mc.mp.ml_mode;
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

	public boolean soundOn()
	{
		if(mc.gs != null)
		{
			mc.gs.soundOn();
			return true;
		} else
		{
			return false;
		}
	}

	public boolean soundOff()
	{
		if(mc.gs != null)
		{
			mc.gs.soundOff();
			return true;
		} else
		{
			return false;
		}
	}

	public boolean onSound()
	{
		if(mc.gs != null)
		{
			mc.gs.soundOn();
			return true;
		} else
		{
			return false;
		}
	}

	public boolean offSound()
	{
		if(mc.gs != null)
		{
			mc.gs.soundOff();
			return true;
		} else
		{
			return false;
		}
	}

	public int getMyX()
	{
		return mc.getMyX();
	}

	public int getMyY()
	{
		return mc.getMyY();
	}

	public int getViewX()
	{
		if(mc.mp != null && mc.mp.ml_mode == 100)
		{
			int i = mc.mp.maps.wx / 32 - 1;
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

	public int getViewY()
	{
		if(mc.mp != null && mc.mp.ml_mode == 100)
		{
			int i = mc.mp.maps.wy / 32 - 10;
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

	public boolean setMyPosition(String s, String s1)
	{
		boolean flag = false;
		boolean flag1 = false;
		if(mc.mp != null && mc.mp.ml_mode == 100 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			int i;
			int j;
			try
			{
				i = Integer.valueOf(s).intValue();
				j = Integer.valueOf(s1).intValue();
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean showMessage(String s, String s1, String s2, String s3, String s4)
	{
		boolean flag = false;
		if(mc.mp != null)
		{
			boolean flag1 = mc.mp.showmSet(s, s1, s2, s3, s4);
			return flag1;
		} else
		{
			return false;
		}
	}

	public boolean showImage(String s, String s1, String s2, String s3)
	{
		boolean flag = false;
		if(mc.mp != null)
		{
			boolean flag1 = mc.mp.showiSet(s, s1, s2, s3);
			return flag1;
		} else
		{
			return false;
		}
	}

	public boolean setEnemy(String s, String s1, String s2)
	{
		boolean flag = false;
		if(mc.mp != null)
		{
			boolean flag1 = mc.mp.sete(s, s1, s2);
			return flag1;
		} else
		{
			return false;
		}
	}

	public boolean setMapchip(String s, String s1, String s2)
	{
		boolean flag = false;
		if(mc.mp != null)
		{
			boolean flag1 = mc.mp.setmapc(s, s1, s2);
			return flag1;
		} else
		{
			return false;
		}
	}

	public int getMapchip(String s, String s1)
	{
		if(mc.mp != null)
			return mc.mp.getmapc(s, s1);
		else
			return -1;
	}

	public boolean setMapchip2(String s, String s1, String s2)
	{
		boolean flag = false;
		if(mc.mp != null)
		{
			boolean flag1 = mc.mp.setmapc2(s, s1, s2);
			return flag1;
		} else
		{
			return false;
		}
	}

	public int getMapchip2(String s, String s1)
	{
		if(mc.mp != null)
			return mc.mp.getmapc2(s, s1);
		else
			return -1;
	}

	public boolean setBackImage(String s)
	{
		boolean flag = false;
		if(mc.mp != null)
		{
			boolean flag1 = mc.mp.setbacki(s);
			return flag1;
		} else
		{
			return false;
		}
	}

	public boolean pressLeft()
	{
		if(mc.gk != null)
		{
			mc.gk.left_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean pressLeft2()
	{
		if(mc.gk != null && mc.mp != null && mc.mp.ml_mode == 100 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
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

	public boolean releaseLeft()
	{
		if(mc.gk != null)
		{
			mc.gk.left_f = false;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean pressRight()
	{
		if(mc.gk != null)
		{
			mc.gk.right_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean pressRight2()
	{
		if(mc.gk != null && mc.mp != null && mc.mp.ml_mode == 100 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
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

	public boolean releaseRight()
	{
		if(mc.gk != null)
		{
			mc.gk.right_f = false;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean pressUp()
	{
		if(mc.gk != null)
		{
			mc.gk.up_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean releaseUp()
	{
		if(mc.gk != null)
		{
			mc.gk.up_f = false;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean pressDown()
	{
		if(mc.gk != null)
		{
			mc.gk.down_f = true;
			mc.gk.tr2_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean releaseDown()
	{
		if(mc.gk != null)
		{
			mc.gk.down_f = false;
			mc.gk.tr2_f = false;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean pressTrigger1()
	{
		if(mc.gk != null)
		{
			mc.gk.tr1_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean releaseTrigger1()
	{
		if(mc.gk != null)
		{
			mc.gk.tr1_f = false;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean releaseAll()
	{
		if(mc.gk != null)
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

	public int getKeyCode()
	{
		if(mc.gk != null)
			return mc.gk.key_code;
		else
			return -1;
	}

	public boolean resetKeyCode()
	{
		if(mc.gk != null)
		{
			mc.gk.key_code = 0;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean equipFire()
	{
		return mc.equipFire();
	}

	public boolean equipBarrier(String s)
	{
		boolean flag = false;
		if(mc.gk != null && mc.mp != null && mc.mp.ml_mode == 100 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			int i;
			try
			{
				i = Integer.valueOf(s).intValue();
			}
			catch(NumberFormatException numberformatexception)
			{
				i = 0;
			}
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

	public boolean setJetFuel(String s)
	{
		boolean flag = false;
		if(mc.gk != null && mc.mp != null && mc.mp.ml_mode == 100 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			int i;
			try
			{
				i = Integer.valueOf(s).intValue();
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean equipJet(String s)
	{
		boolean flag = setJetFuel(s);
		return flag;
	}

	public boolean restart()
	{
		return mc.restart();
	}

	public String getValue(String s)
	{
		if(mc.th_jm <= 0)
			return mc.tdb.getValue(s);
		else
			return null;
	}

	public String getParamValue(String s)
	{
		if(mc.th_jm <= 0)
			return mc.tdb.getValue(s);
		else
			return null;
	}

	public boolean setValue(String s, String s1)
	{
		if(mc.th_jm <= 0)
			return mc.tdb.setValue(s, s1);
		else
			return false;
	}

	public boolean setParamValue(String s, String s1)
	{
		if(mc.th_jm <= 0)
			return mc.tdb.setValue(s, s1);
		else
			return false;
	}

	public int getMyXReal()
	{
		if(mc.getMode() >= 100 && mc.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			int i = mc.mp.co_j.x;
			return i;
		} else
		{
			return -1;
		}
	}

	public int getMyYReal()
	{
		if(mc.getMode() >= 100 && mc.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			int i = mc.mp.co_j.y;
			return i;
		} else
		{
			return -1;
		}
	}

	public boolean setMyXReal(String s)
	{
		if(mc.getMode() >= 100 && mc.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean setMyYReal(String s)
	{
		if(mc.getMode() >= 100 && mc.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
			}
			catch(NumberFormatException numberformatexception)
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

	public int getMyVX()
	{
		if(mc.getMode() >= 100 && mc.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			int i = mc.mp.co_j.vx;
			return i;
		} else
		{
			return -9999;
		}
	}

	public int getMyVY()
	{
		if(mc.getMode() >= 100 && mc.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			int i = mc.mp.co_j.vy;
			return i;
		} else
		{
			return -9999;
		}
	}

	public int getViewXReal()
	{
		if(mc.getMode() >= 100 && mc.getMode() < 200)
		{
			int i = mc.mp.maps.wx;
			return i;
		} else
		{
			return -1;
		}
	}

	public int getViewYReal()
	{
		if(mc.getMode() >= 100 && mc.getMode() < 200)
		{
			int i = mc.mp.maps.wy;
			return i;
		} else
		{
			return -1;
		}
	}

	public int getEnemyTotal()
	{
		if(mc.getMode() >= 100 && mc.getMode() < 200)
		{
			int i = 0;
			for(int j = 0; j <= 229; j++)
				if(mc.mp.co_t[j].c >= 100 || mc.mp.co_t[j].c == 10)
					i++;

			return i;
		} else
		{
			return -1;
		}
	}

	public int getBossXReal()
	{
		if(mc.getMode() >= 100 && mc.getMode() < 200)
		{
			int i = mc.mp.co_b.x;
			return i;
		} else
		{
			return -1;
		}
	}

	public int getBossYReal()
	{
		if(mc.getMode() >= 100 && mc.getMode() < 200)
		{
			int i = mc.mp.co_b.y;
			return i;
		} else
		{
			return -1;
		}
	}

	public boolean setMyMiss(String s)
	{
		if(mc.getMode() >= 100 && mc.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean setMyPress(String s)
	{
		if(mc.getMode() >= 100 && mc.getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean playSound(String s)
	{
		if(mc.gs == null)
			return false;
		int i;
		try
		{
			i = Integer.parseInt(s);
		}
		catch(NumberFormatException numberformatexception)
		{
			i = -1;
		}
		if(i >= 1 && i <= 27)
		{
			if(mc.getMode() >= 100 && mc.getMode() < 200)
				mc.gs.rsAddSound(i - 1);
			else
				mc.gs.play(i - 1);
			return true;
		} else
		{
			return false;
		}
	}

	public boolean setScrollLock(String s)
	{
		boolean flag = false;
		if(mc.getMode() >= 100 && mc.getMode() < 200)
			flag = mc.mp.setScrollLock(s);
		return flag;
	}

	public int attackFire(String s, String s1, String s2, String s3)
	{
		int i = 0;
		if(mc.getMode() >= 100 && mc.getMode() < 200)
			i = mc.mp.attackFire(s, s1, s2, s3);
		return i;
	}

	public boolean addScore(String s)
	{
		if(mc.mp == null)
			return false;
		int i;
		try
		{
			i = Integer.parseInt(s);
		}
		catch(NumberFormatException numberformatexception)
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

	public boolean setPenColor(String s, String s1, String s2)
	{
		if(mc.mp != null)
		{
			boolean flag = mc.mp.setPenColor(s, s1, s2, "255");
			return flag;
		} else
		{
			return true;
		}
	}

	public boolean setPenColor(String s, String s1, String s2, String s3)
	{
		if(mc.mp != null)
		{
			boolean flag = mc.mp.setPenColor(s, s1, s2, s3);
			return flag;
		} else
		{
			return true;
		}
	}

	public boolean showRect(String s, String s1, String s2, String s3, String s4)
	{
		boolean flag = false;
		if(mc.mp != null)
		{
			boolean flag1 = mc.mp.showrSet(s, s1, s2, s3, s4);
			return flag1;
		} else
		{
			return false;
		}
	}

	public boolean showOval(String s, String s1, String s2, String s3, String s4)
	{
		boolean flag = false;
		if(mc.mp != null)
		{
			boolean flag1 = mc.mp.showoSet(s, s1, s2, s3, s4);
			return flag1;
		} else
		{
			return false;
		}
	}

	public int getJSMes()
	{
		boolean flag = false;
		if(mc.mp != null)
		{
			int i = mc.mp.getJSMes();
			return i;
		} else
		{
			return -1;
		}
	}

	public boolean showGauge(String s, String s1)
	{
		if(mc.mp != null)
		{
			boolean flag = mc.mp.showGauge(s, s1);
			return flag;
		} else
		{
			return false;
		}
	}

	public boolean hideGauge()
	{
		if(mc.mp != null)
		{
			boolean flag = mc.mp.hideGauge();
			return flag;
		} else
		{
			return false;
		}
	}

	public boolean setJSMes(String s)
	{
		if(mc.mp != null)
		{
			mc.mp.setJSMes(s);
			return true;
		} else
		{
			return false;
		}
	}

	public boolean setTitleLock()
	{
		if(mc.mp != null)
		{
			mc.mp.title_lock_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean startGame()
	{
		if(mc.mp != null)
		{
			mc.mp.start_game_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean equipGrenade(String s)
	{
		return mc.equipGrenade(s);
	}

	public boolean setSystemImage(String s, String s1)
	{
		if(mc.mp != null)
			return mc.mp.setSystemImage(s, s1);
		else
			return false;
	}

	public boolean setModeWait(String s, String s1)
	{
		if(mc.mp != null)
			return mc.mp.setModeWait(s, s1);
		else
			return false;
	}

	public boolean showMyHP(String s)
	{
		if(mc.mp != null)
			return mc.mp.showMyHP(s);
		else
			return false;
	}

	public boolean setMyMaxHP(String s)
	{
		if(mc.mp != null)
			return mc.mp.setMyMaxHP(s);
		else
			return false;
	}

	public boolean setMyHP(String s)
	{
		if(mc.mp != null)
			return mc.mp.setMyHP(s);
		else
			return false;
	}

	public int getMyHP()
	{
		if(mc.mp != null)
			return mc.mp.getMyHP();
		else
			return 0;
	}

	public boolean setMyHPDamage(String s)
	{
		if(mc.mp != null)
			return mc.mp.setMyHPDamage(s);
		else
			return false;
	}

	public boolean setMyWait(String s, String s1, String s2)
	{
		return mc.mp.setMyWait(s, s1, s2);
	}

	public boolean setStageClear()
	{
		if(mc.mp != null)
			return mc.mp.setStageClear();
		else
			return false;
	}

	public boolean equipFire(String s)
	{
		return mc.equipFire(s);
	}

	public boolean setFireRange(String s)
	{
		return mc.setFireRange(s);
	}

	public boolean equipTail(String s)
	{
		return mc.equipTail(s);
	}

	public int attackTail(String s, String s1, String s2, String s3)
	{
		return mc.mp.attackTail(s, s1, s2, s3);
	}

	public int destroyEnemy(String s, String s1, String s2, String s3)
	{
		int i = -1;
		if(getMode() >= 100 && getMode() < 200)
			i = mc.mp.destroyEnemy(s, s1, s2, s3);
		return i;
	}

	public int isPressZKey()
	{
		return mc.gk == null || !mc.gk.z_f ? 0 : 1;
	}

	public int isPressXKey()
	{
		return mc.gk == null || !mc.gk.x_f ? 0 : 1;
	}

	public int isPressSpaceKey()
	{
		return mc.gk == null || !mc.gk.space_f ? 0 : 1;
	}

	public int getMyDirection()
	{
		byte byte0 = -1;
		if(getMode() >= 100 && getMode() < 200)
		{
			int i;
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

	public boolean setHTMLText(String s)
	{
		if(mc.mp != null)
		{
			mc.tdb.initParameter();
			mc.tdb.setValueFromHTMLText(s);
			mc.restart();
			return true;
		} else
		{
			return false;
		}
	}

	public int newYuka(String s, String s1, String s2, String s3, String s4)
	{
		if(mc.mp != null)
			return mc.mp.newYuka(s, s1, s2, s3, s4);
		else
			return -1;
	}

	public boolean setYukaPosition(String s, String s1, String s2)
	{
		if(mc.mp != null)
			return mc.mp.setYukaPosition(s, s1, s2);
		else
			return false;
	}

	public boolean setYukaPosition(String s, String s1, String s2, String s3, String s4)
	{
		if(mc.mp != null)
			return mc.mp.setYukaPosition(s, s1, s2, s3, s4);
		else
			return false;
	}

	public boolean setYukaType(String s, String s1)
	{
		if(mc.mp != null)
			return mc.mp.setYukaType(s, s1);
		else
			return false;
	}

	public boolean disposeYuka(String s)
	{
		if(mc.mp != null)
			return mc.mp.disposeYuka(s);
		else
			return false;
	}

	public boolean setYukaColor(String s, String s1, String s2, String s3, String s4)
	{
		if(mc.mp != null)
			return mc.mp.setYukaColor(s, s1, s2, s3, s4);
		else
			return false;
	}

	public int isRideYuka(String s)
	{
		if(mc.mp != null)
			return mc.mp.isRideYuka(s);
		else
			return -1;
	}

	public boolean setMyVX(String s)
	{
		return mc.setMyVX(s);
	}

	public boolean setMyVY(String s)
	{
		return mc.setMyVY(s);
	}

	public int isRideGround()
	{
		if(mc.mp != null)
			return mc.mp.isRideGround();
		else
			return -1;
	}

	public boolean setYukaPattern(String s, String s1, String s2)
	{
		if(mc.mp != null)
			return mc.mp.setYukaPattern(s, s1, s2);
		else
			return false;
	}

	public boolean setYukaImage(String s, String s1)
	{
		if(mc.mp != null)
			return mc.mp.setYukaImage(s, s1);
		else
			return false;
	}

	public boolean setYukaImage(String s, Image image)
	{
		if(mc.mp != null)
			return mc.mp.setYukaImage(s, image);
		else
			return false;
	}

	public boolean setMySpeed(String s)
	{
		return mc.setMySpeed(s);
	}

	public boolean setScrollArea(String s, String s1, String s2, String s3)
	{
		if(mc.mp != null)
			return mc.mp.setScrollArea(s, s1, s2, s3);
		else
			return false;
	}

	public String loadTextFile(String s)
	{
		return mc.loadTextFile(s);
	}

	public int isPressUpKey()
	{
		return mc.isPressUpKey();
	}

	public int isPressDownKey()
	{
		return mc.isPressDownKey();
	}

	public int isPressLeftKey()
	{
		return mc.isPressLeftKey();
	}

	public int isPressRightKey()
	{
		return mc.isPressRightKey();
	}

	public BufferedImage newImageOnLoad(String s)
	{
		BufferedImage bufferedimage = null;
		try
		{
			bufferedimage = ImageIO.read(new URL(getCodeBase(), s));
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
			return null;
		}
		MediaTracker mediatracker = new MediaTracker(this);
		mediatracker.addImage(bufferedimage, 0);
		try
		{
			mediatracker.waitForID(0);
		}
		catch(Exception exception1)
		{
			exception1.printStackTrace();
		}
		return bufferedimage;
	}

	public boolean setSystemDrawMode(String s)
	{
		byte byte0 = -1;
		if(mc.mp != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean drawSystemObject(String s)
	{
		byte byte0 = -1;
		if(mc.mp != null)
		{
			if(mc.mp.ml_mode != 100)
				return false;
			if(mc.mp.dso_cf)
				return false;
			int i;
			try
			{
				i = Integer.parseInt(s);
			}
			catch(NumberFormatException numberformatexception)
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

	public int getMyObjectCondition()
	{
		if(mc.mp != null)
			return mc.mp.co_j.c;
		else
			return 0;
	}

	public int getMyObjectAC()
	{
		if(mc.mp != null)
			return mc.mp.co_j.ac;
		else
			return 0;
	}

	public int getMyObjectPattern()
	{
		if(mc.mp != null)
			return mc.mp.co_j.pt;
		else
			return 0;
	}

	public int getMyDirection4way()
	{
		byte byte0 = -1;
		if(getMode() >= 100 && getMode() < 200)
		{
			int i;
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

	public boolean setMyObjectPattern(String s)
	{
		byte byte0 = -1;
		if(mc.mp != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean setMyObjectImage(Image image, String s, String s1)
	{
		boolean flag = false;
		boolean flag1 = false;
		if(mc.mp != null)
		{
			int i;
			int j;
			try
			{
				i = Integer.parseInt(s);
				j = Integer.parseInt(s1);
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean setEnemyObjectPattern(String s, String s1)
	{
		byte byte0 = -1;
		int j = 0;
		if(mc.mp != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
				j = Integer.parseInt(s1);
			}
			catch(NumberFormatException numberformatexception)
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

	public int getEnemyObjectCondition(String s)
	{
		byte byte0 = -1;
		if(mc.mp != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
			}
			catch(NumberFormatException numberformatexception)
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

	public int getEnemyObjectPattern(String s)
	{
		byte byte0 = -1;
		if(mc.mp != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
			}
			catch(NumberFormatException numberformatexception)
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

	public int getEnemyObjectX(String s)
	{
		byte byte0 = -1;
		if(mc.mp != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
			}
			catch(NumberFormatException numberformatexception)
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

	public int getEnemyObjectY(String s)
	{
		byte byte0 = -1;
		if(mc.mp != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
			}
			catch(NumberFormatException numberformatexception)
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

	public int getEnemyObjectLength()
	{
		byte byte0 = -1;
		if(mc.mp != null)
			return mc.mp.t_kazu + 1;
		else
			return 0;
	}

	public int getEnemyObjectDirection(String s)
	{
		byte byte0 = -1;
		boolean flag = false;
		boolean flag1 = false;
		if(mc.mp != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
			}
			catch(NumberFormatException numberformatexception)
			{
				i = -1;
			}
			if(i < 0 || i > 229)
				return 0;
			int k = 0;
			int j = mc.mp.co_t[i].c;
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

	public boolean setEnemyObjectImage(String s, Image image, String s1, String s2)
	{
		byte byte0 = -1;
		int j = 0;
		int k = 0;
		if(mc.mp != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
				j = Integer.parseInt(s1);
				k = Integer.parseInt(s2);
			}
			catch(NumberFormatException numberformatexception)
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

	public int getEnemyAC()
	{
		if(mc.mp != null)
			return mc.mp.g_c2;
		else
			return 0;
	}

	public int newChipImage(String s, String s1, String s2, String s3, String s4)
	{
		int i = -1;
		int j = 0;
		int k = 0;
		int l = 0;
		int i1 = 0;
		try
		{
			i = Integer.parseInt(s1);
			j = Integer.parseInt(s2);
			k = Integer.parseInt(s3);
			l = Integer.parseInt(s4);
		}
		catch(NumberFormatException numberformatexception)
		{
			i = -1;
		}
		if(i < 0)
			return -1;
		int j1;
		for(j1 = 0; j1 <= 31 && oci[j1] != null; j1++);
		if(j1 > 31)
			return -1;
		i1 = j1;
		BufferedImage bufferedimage = newImageOnLoad(s);
		if(bufferedimage == null)
		{
			return -1;
		} else
		{
			oci[i1] = new ChipImage(i, j, k, l, bufferedimage);
			return i1;
		}
	}

	public boolean makeReverseChipImage(String s)
	{
		int i = 0;
		try
		{
			i = Integer.parseInt(s);
		}
		catch(NumberFormatException numberformatexception)
		{
			i = -1;
		}
		if(i < 0)
			return false;
		else
			return oci[i].makeReverseChipImage();
	}

	public BufferedImage getChipImage(String s, String s1)
	{
		int i = 0;
		int j = -1;
		try
		{
			i = Integer.parseInt(s);
			j = Integer.parseInt(s1);
		}
		catch(NumberFormatException numberformatexception)
		{
			i = -1;
		}
		if(i < 0)
			return null;
		else
			return oci[i].getChipImage(j);
	}

	public BufferedImage getChipImage(String s)
	{
		int i = -1;
		try
		{
			i = Integer.parseInt(s);
		}
		catch(NumberFormatException numberformatexception)
		{
			i = -1;
		}
		if(i < 0)
			return null;
		else
			return oci[0].getChipImage(i);
	}

	public BufferedImage getChipImage(String s, String s1, String s2)
	{
		int i = 0;
		int j = -1;
		int k = 0;
		try
		{
			i = Integer.parseInt(s);
			j = Integer.parseInt(s1);
			k = Integer.parseInt(s2);
		}
		catch(NumberFormatException numberformatexception)
		{
			i = -1;
		}
		if(i < 0)
			return null;
		if(j < 0)
			return null;
		if(k < 0 || k > 3)
			k = 0;
		return oci[i].getChipImage(j, k);
	}

	public boolean disposeChipImage(String s)
	{
		int i = 0;
		try
		{
			i = Integer.parseInt(s);
		}
		catch(NumberFormatException numberformatexception)
		{
			i = -1;
		}
		if(i < 0)
		{
			return false;
		} else
		{
			oci[i] = null;
			return true;
		}
	}

	public boolean setScrollAreaReal(String s, String s1, String s2, String s3)
	{
		if(mc.mp != null)
			return mc.mp.setScrollAreaReal(s, s1, s2, s3);
		else
			return false;
	}

	public int isPressCodeKey(String s)
	{
		boolean flag = false;
		if(mc.gk != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean playBGM(String s)
	{
		if(mc.gs != null)
			return mc.gs.playUserBGMFile(s);
		else
			return false;
	}

	public boolean playBGMLoop(String s)
	{
		if(mc.gs != null)
			return mc.gs.playUserBGMFileLoop(s);
		else
			return false;
	}

	public boolean stopBGM()
	{
		if(mc.gs != null)
		{
			mc.gs.stopBGM();
			return true;
		} else
		{
			return false;
		}
	}

	public int getBossHP()
	{
		if(mc.mp != null)
			return mc.mp.getBossHP();
		else
			return 0;
	}

	public int getBossDirection()
	{
		if(mc.mp != null)
			return mc.mp.getBossDirection();
		else
			return 0;
	}

	public int isBossAttackMode()
	{
		if(mc.mp != null)
			return mc.mp.isBossAttackMode();
		else
			return 0;
	}

	public boolean setBossXReal(String s)
	{
		byte byte0 = 32;
		if(mc.mp != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean setBossYReal(String s)
	{
		char c = '\u0140';
		if(mc.mp != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean setBossObjectImage(Image image, String s, String s1)
	{
		boolean flag = false;
		boolean flag1 = false;
		if(mc.mp != null)
		{
			int i;
			int j;
			try
			{
				i = Integer.parseInt(s);
				j = Integer.parseInt(s1);
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean setSystemPattern(String s, String s1)
	{
		boolean flag = true;
		int j = 1;
		if(mc.mp != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
				j = Integer.parseInt(s1);
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean setSystemPatternImage(String s, String s1, Image image)
	{
		boolean flag = true;
		int j = 0;
		if(mc.mp != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
				j = Integer.parseInt(s1);
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean setFontSize(String s)
	{
		byte byte0 = 14;
		if(mc.gg != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
			}
			catch(NumberFormatException numberformatexception)
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

	public Font newFont(String s, String s1, String s2)
	{
		byte byte0 = 14;
		int j = 0;
		if(mc.gg != null)
		{
			int i;
			try
			{
				j = Integer.parseInt(s1);
				i = Integer.parseInt(s2);
			}
			catch(NumberFormatException numberformatexception)
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
			Font font = new Font(s, j, i);
			return font;
		} else
		{
			return null;
		}
	}

	public int getCoinCount(String s, String s1, String s2, String s3)
	{
		boolean flag = false;
		int j = 0;
		int k = 0;
		int l = 0;
		if(mc.mp != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s);
				j = Integer.parseInt(s1);
				k = Integer.parseInt(s2);
				l = Integer.parseInt(s3);
			}
			catch(NumberFormatException numberformatexception)
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

	public int getCoinCount()
	{
		if(mc.mp != null)
			return mc.mp.getCoinCount(0, 0, 179, 29);
		else
			return -1;
	}

	public boolean addMyTokugi(String s)
	{
		byte byte0 = -1;
		boolean flag = false;
		if(getMode() >= 100 && getMode() < 200)
		{
			int i;
			try
			{
				i = Integer.valueOf(s).intValue();
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean removeMyTokugi(String s)
	{
		byte byte0 = -1;
		boolean flag = false;
		if(getMode() >= 100 && getMode() < 200)
		{
			int i;
			try
			{
				i = Integer.valueOf(s).intValue();
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean setScore(String s)
	{
		boolean flag = false;
		boolean flag1 = false;
		if(mc.mp != null)
		{
			int i;
			try
			{
				i = Integer.valueOf(s).intValue();
			}
			catch(NumberFormatException numberformatexception)
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

	public int getBarrierTime()
	{
		boolean flag = false;
		if(mc.mp != null && mc.mp.ml_mode == 100 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			int i = mc.mp.j_v_c;
			return i;
		} else
		{
			return -1;
		}
	}

	public int getTimeLimit()
	{
		boolean flag = false;
		if(mc.mp != null && mc.mp.time_max > 0 && mc.mp.ml_mode == 100)
		{
			int i = mc.mp.time / 1000;
			return i;
		} else
		{
			return -1;
		}
	}

	public boolean setTimeLimit(String s)
	{
		boolean flag = false;
		if(mc.mp != null && mc.mp.time_max > 0)
		{
			int i;
			try
			{
				i = Integer.valueOf(s).intValue();
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean setAthletic(String s, String s1, String s2)
	{
		byte byte0 = -1;
		int j = 0;
		int k = 0;
		if(getMode() >= 100 && getMode() < 200)
		{
			int i;
			try
			{
				j = Integer.valueOf(s).intValue();
				k = Integer.valueOf(s1).intValue();
				i = Integer.valueOf(s2).intValue();
			}
			catch(NumberFormatException numberformatexception)
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
			int l = 0;
			if(mc.mp.maps.map_bg[j - 1][k] == 4)
				l = 4;
			if(i >= 2)
			{
				short word0 = mc.mp.setAthleticOnMap(i, j, k);
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
			mc.mp.maps.map_bg[j][k] = (short)l;
			mc.mp.setmapc_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean setSecondImage(String s)
	{
		if(getMode() >= 100 && getMode() < 200)
		{
			Image image = mc.gg.loadImage(s);
			mc.mp.second_gazou_img = image;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean setGrenadeCount(String s)
	{
		boolean flag = false;
		if(getMode() >= 100 && getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
		{
			int i;
			try
			{
				i = Integer.valueOf(s).intValue();
			}
			catch(NumberFormatException numberformatexception)
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

	public boolean setMyLeft(String s)
	{
		boolean flag = false;
		if(getMode() >= 100 && getMode() < 200)
		{
			int i;
			try
			{
				i = Integer.valueOf(s).intValue();
			}
			catch(NumberFormatException numberformatexception)
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

	public int getGrenadeCount()
	{
		int i = 0;
		if(getMode() >= 100 && getMode() < 200 && mc.mp.co_j.c >= 100 && mc.mp.co_j.c < 200)
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

	public int getMyLeft()
	{
		int i = -1;
		if(getMode() >= 100 && getMode() < 200)
		{
			i = mc.mp.j_left;
			return i;
		} else
		{
			return i;
		}
	}

	public boolean setEnemyPress(String s)
	{
		boolean flag = true;
		if(getMode() >= 100 && getMode() < 200)
		{
			int i;
			try
			{
				i = Integer.valueOf(s).intValue();
			}
			catch(NumberFormatException numberformatexception)
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

	MasaoGhost mc;
	Image my_offscreen_img;
	ChipImage oci[];
}
