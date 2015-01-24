// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   MasaoGhost.java

import java.applet.Applet;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.net.URL;
import javax.imageio.ImageIO;

public class MasaoGhost
	implements Runnable
{

	public MasaoGhost(Applet applet, MasaoEventHandler masaoeventhandler)
	{
		fr = null;
		ap = null;
		oya = null;
		mode = 1;
		mode_nodraw = false;
		file_genzai = null;
		file_syurui = 0;
		restart_f = false;
		ci = null;
		mph_title_lock_f = false;
		mph_start_game_f = false;
		mph_highscore = 0;
		th_interval = 70;
		th_jm = 10;
		process_time = 0L;
		variable_sleep_time = false;
		sleep_time_visible = false;
		main_time_kiroku = new int[10];
		main_time_kiroku_p = 0;
		main_time_kiroku_f = false;
		main_program_time = 0;
		sleep_time = 0;
		main_time_10try = 0;
		gg = null;
		gm = null;
		gk = null;
		gs = null;
		mp = null;
		meh = null;
		meh = masaoeventhandler;
		ap = applet;
		oya = applet;
		fr = null;
		mode = 2;
		mode_nodraw = true;
		file_syurui = 0;
		restart_f = false;
		start();
	}

	public MasaoGhost(Frame frame, MasaoEventHandler masaoeventhandler)
	{
		fr = null;
		ap = null;
		oya = null;
		mode = 1;
		mode_nodraw = false;
		file_genzai = null;
		file_syurui = 0;
		restart_f = false;
		ci = null;
		mph_title_lock_f = false;
		mph_start_game_f = false;
		mph_highscore = 0;
		th_interval = 70;
		th_jm = 10;
		process_time = 0L;
		variable_sleep_time = false;
		sleep_time_visible = false;
		main_time_kiroku = new int[10];
		main_time_kiroku_p = 0;
		main_time_kiroku_f = false;
		main_program_time = 0;
		sleep_time = 0;
		main_time_10try = 0;
		gg = null;
		gm = null;
		gk = null;
		gs = null;
		mp = null;
		meh = null;
		meh = masaoeventhandler;
		ap = null;
		oya = frame;
		fr = frame;
		mode = 1;
		mode_nodraw = true;
		file_syurui = 0;
		restart_f = false;
		start();
	}

	public MasaoGhost(Frame frame, MasaoEventHandler masaoeventhandler, File file)
	{
		fr = null;
		ap = null;
		oya = null;
		mode = 1;
		mode_nodraw = false;
		file_genzai = null;
		file_syurui = 0;
		restart_f = false;
		ci = null;
		mph_title_lock_f = false;
		mph_start_game_f = false;
		mph_highscore = 0;
		th_interval = 70;
		th_jm = 10;
		process_time = 0L;
		variable_sleep_time = false;
		sleep_time_visible = false;
		main_time_kiroku = new int[10];
		main_time_kiroku_p = 0;
		main_time_kiroku_f = false;
		main_program_time = 0;
		sleep_time = 0;
		main_time_10try = 0;
		gg = null;
		gm = null;
		gk = null;
		gs = null;
		mp = null;
		meh = null;
		meh = masaoeventhandler;
		ap = null;
		oya = frame;
		fr = frame;
		mode = 1;
		mode_nodraw = true;
		file_syurui = 1;
		file_genzai = file;
		restart_f = false;
		start();
	}

	public void start()
	{
		if(th == null)
		{
			th = new Thread(this);
			th.start();
		}
		if(mode == 2)
			th_jm = 10;
		else
			th_jm = 2;
	}

	public void stop()
	{
		if(th != null)
		{
			th = null;
			th_jm = 10;
		}
		if(gs != null)
			gs.stopBGM();
	}

	public void destroy()
	{
		th_jm = 10;
	}

	public void paint()
	{
	}

	public void run()
	{
		do
			try
			{
				while(th_jm >= 2) 
				{
					th_jm--;
					Thread.sleep(70L);
				}
				if(th_jm == 1)
				{
					init_j();
					mp.start();
					th_jm--;
					Thread.sleep(70L);
				} else
				{
					if(mp.ml_mode == 100)
						mp.mL100();
					else
						mp.mainLoop();
					if(th_jm > 0)
						th_jm--;
					if(sleep_time != 0)
						if(variable_sleep_time)
						{
							if(sleep_time_visible)
							{
								gg.os_g.setColor(mp.gamecolor_score);
								gg.os_g.setFont(new Font("Dialog", 1, mp.moji_size));
								gg.os_g.drawString("VARIABLE SLEEP  1", 40, (14 + mp.moji_size) * 3);
								gg.os_g.drawString((new StringBuilder()).append("MAIN PROGRAM TIME  ").append(main_program_time).toString(), 40, (14 + mp.moji_size) * 4);
								gg.os_g.drawString((new StringBuilder()).append("SLEEP TIME  ").append(sleep_time).toString(), 40, (14 + mp.moji_size) * 5);
								if(main_time_kiroku_f)
									gg.os_g.drawString((new StringBuilder()).append("10 TRY MAIN PROGRAM TIME  ").append(main_time_10try).toString(), 40, (14 + mp.moji_size) * 6);
							}
						} else
						if(!variable_sleep_time && sleep_time_visible)
						{
							gg.os_g.setColor(mp.gamecolor_score);
							gg.os_g.setFont(new Font("Dialog", 1, mp.moji_size));
							gg.os_g.drawString("VARIABLE SLEEP  0", 40, (14 + mp.moji_size) * 3);
							gg.os_g.drawString((new StringBuilder()).append("MAIN PROGRAM TIME  ").append(main_program_time).toString(), 40, (14 + mp.moji_size) * 4);
							gg.os_g.drawString((new StringBuilder()).append("SLEEP TIME  ").append(th_interval).toString(), 40, (14 + mp.moji_size) * 5);
							if(main_time_kiroku_f)
								gg.os_g.drawString((new StringBuilder()).append("10 TRY MAIN PROGRAM TIME  ").append(main_time_10try).toString(), 40, (14 + mp.moji_size) * 6);
						}
					if(meh != null)
						meh.masaoEvent(gg.os_g, gg.os_img);
					paint();
					main_program_time = (int)(System.currentTimeMillis() - process_time);
					sleep_time = th_interval - main_program_time;
					if(sleep_time < 3)
						sleep_time = 3;
					if(sleep_time_visible)
					{
						main_time_kiroku[main_time_kiroku_p] = main_program_time;
						main_time_kiroku_p++;
						if(main_time_kiroku_p > 9)
						{
							main_time_kiroku_p = 0;
							main_time_kiroku_f = true;
						}
						if(main_time_kiroku_f)
						{
							main_time_10try = 0;
							for(int i = 0; i <= 9; i++)
								main_time_10try += main_time_kiroku[i];

							main_time_10try = main_time_10try / 10;
						}
					}
					if(variable_sleep_time)
					{
						Thread.sleep(sleep_time);
						process_time = System.currentTimeMillis();
					} else
					if(!variable_sleep_time)
					{
						Thread.sleep(th_interval);
						process_time = System.currentTimeMillis();
					}
				}
			}
			catch(Exception exception)
			{
				return;
			}
		while(true);
	}

	public void init_j()
	{
		if(!restart_f)
			tdb = new TagDataBase();
		if(mode == 2)
		{
			if(!restart_f)
				tdb.setValueFromHTML(ap);
		} else
		if(!restart_f && file_syurui == 1)
		{
			boolean flag1 = tdb.setValueFromHTMLFile(file_genzai);
			if(!flag1)
			{
				file_genzai = null;
				file_syurui = 0;
				tdb.setValueStage1();
			}
		}
		boolean flag = false;
		int j = 0;
		do
		{
			if(j >= 90)
				break;
			if(tdb.value[j] != null && !tdb.value[j].equals(".") && !tdb.value[j].equals(""))
			{
				flag = true;
				break;
			}
			j++;
		} while(true);
		if(!flag)
			tdb.setValueStage1();
		th_interval = tdb.getValueInt("game_speed");
		if(th_interval < 1)
			th_interval = 1;
		else
		if(th_interval > 500)
			th_interval = 500;
		process_time = System.currentTimeMillis();
		main_time_kiroku_p = 0;
		for(int k = 0; k <= 9; k++)
			main_time_kiroku[k] = 0;

		if(tdb.getValueInt("variable_sleep_time") == 1)
			variable_sleep_time = true;
		else
			variable_sleep_time = false;
		if(tdb.getValueInt("sleep_time_visible") == 1)
			sleep_time_visible = true;
		else
			sleep_time_visible = false;
		if(mode == 2)
			gg = new GameGraphicsForApplication(tdb, ap);
		else
			gg = new GameGraphicsForApplication(tdb, fr);
		gg.setBackcolor(Color.black);
		String s = tdb.getValue("filename_title");
		gg.addListImage(0, s);
		s = tdb.getValue("filename_ending");
		gg.addListImage(1, s);
		s = tdb.getValue("filename_gameover");
		gg.addListImage(2, s);
		if(gg.layer_mode == 2 || tdb.getValueInt("mcs_haikei_visible") == 1)
		{
			s = tdb.getValue("filename_haikei");
			gg.addListImage(4, s);
		}
		s = tdb.getValue("stage_select");
		int i;
		try
		{
			i = Integer.valueOf(s).intValue();
		}
		catch(NumberFormatException numberformatexception)
		{
			i = -1;
		}
		if(i == 2)
		{
			s = tdb.getValue("filename_chizu");
			gg.addListImage(3, s);
		}
		s = tdb.getValue("stage_max");
		int l;
		try
		{
			l = Integer.valueOf(s).intValue();
		}
		catch(NumberFormatException numberformatexception1)
		{
			l = 1;
		}
		if((gg.layer_mode == 2 || tdb.getValueInt("mcs_haikei_visible") == 1) && (i == 2 || l >= 2))
		{
			String s1 = tdb.getValue("filename_haikei2");
			gg.addListImage2(5, s1);
			s1 = tdb.getValue("filename_haikei3");
			gg.addListImage2(6, s1);
			s1 = tdb.getValue("filename_haikei4");
			gg.addListImage2(7, s1);
		}
		gg.loadListImage();
		gm = new GameMouse();
		if(mode_nodraw)
			if(mode == 2)
				ap.addMouseListener(gm);
			else
				fr.addMouseListener(gm);
		gk = new GameKey();
		if(mode == 2)
		{
			if(fr != null)
				fr.addKeyListener(gk);
			else
				ap.addKeyListener(gk);
		} else
		{
			fr.addKeyListener(gk);
		}
		if(mode == 2)
			gs = new GameSoundForApplet(tdb, ap);
		else
			gs = new GameSoundForApplication(tdb, fr);
		mp = new MainProgram(gg, gm, gk, gs, tdb);
		if(mph_start_game_f)
			mp.highscore = mph_highscore;
		mp.title_lock_f = mph_title_lock_f;
		mp.start_game_f = mph_start_game_f;
	}

	public int getHighscore()
	{
		int i = 0;
		if(mp != null)
		{
			i = mp.highscore;
			if(i < mp.score)
				i = mp.score;
		}
		return i;
	}

	public int getScore()
	{
		int i = 0;
		if(mp != null)
			i = mp.score;
		return i;
	}

	public int getMode()
	{
		int i = 0;
		if(mp != null)
		{
			int j = mp.ml_mode;
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
			if(mp.ml_mode == 100 && (mp.sl_step == 2 || mp.sl_step == 3))
			{
				i = 150;
			} else
			{
				i = 100;
				i += mp.stage;
			}
		}
		return i;
	}

	public boolean soundOn()
	{
		if(gs != null)
		{
			gs.soundOn();
			return true;
		} else
		{
			return false;
		}
	}

	public boolean soundOff()
	{
		if(gs != null)
		{
			gs.soundOff();
			return true;
		} else
		{
			return false;
		}
	}

	public boolean onSound()
	{
		if(gs != null)
		{
			gs.soundOn();
			return true;
		} else
		{
			return false;
		}
	}

	public boolean offSound()
	{
		if(gs != null)
		{
			gs.soundOff();
			return true;
		} else
		{
			return false;
		}
	}

	public int getMyX()
	{
		if(mp != null)
		{
			if(mp.ml_mode == 100 && mp.co_j.c >= 100 && mp.co_j.c < 200)
			{
				int i = (mp.co_j.x + 15) / 32 - 1;
				if(i < 0)
					i = 0;
				if(i > 179)
					i = 179;
				return i;
			}
			if(mp.ml_mode == 200)
			{
				int j = (mp.ig.co_j.x + 15) / 32;
				return j;
			}
		}
		return -1;
	}

	public int getMyY()
	{
		if(mp != null)
		{
			if(mp.ml_mode == 100 && mp.co_j.c >= 100 && mp.co_j.c < 200)
			{
				int i = (mp.co_j.y + 15) / 32 - 10;
				if(i < 0)
					i = 0;
				if(i > 29)
					i = 29;
				return i;
			}
			if(mp.ml_mode == 200)
			{
				int j = (mp.ig.co_j.y + 15) / 32;
				return j;
			}
		}
		return -1;
	}

	public int getViewX()
	{
		if(mp != null && mp.ml_mode == 100)
		{
			int i = mp.maps.wx / 32 - 1;
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
		if(mp != null && mp.ml_mode == 100)
		{
			int i = mp.maps.wy / 32 - 10;
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
		if(mp != null && mp.ml_mode == 100 && mp.co_j.c >= 100 && mp.co_j.c < 200)
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
				mp.co_j.x = (i + 1) * 32;
				mp.co_j.y = (j + 10) * 32;
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
		if(mp != null)
		{
			boolean flag1 = mp.showmSet(s, s1, s2, s3, s4);
			return flag1;
		} else
		{
			return false;
		}
	}

	public boolean showImage(String s, String s1, String s2, String s3)
	{
		boolean flag = false;
		if(mp != null)
		{
			boolean flag1 = mp.showiSet(s, s1, s2, s3);
			return flag1;
		} else
		{
			return false;
		}
	}

	public boolean setEnemy(String s, String s1, String s2)
	{
		boolean flag = false;
		if(mp != null)
		{
			boolean flag1 = mp.sete(s, s1, s2);
			return flag1;
		} else
		{
			return false;
		}
	}

	public boolean setMapchip(String s, String s1, String s2)
	{
		boolean flag = false;
		if(mp != null)
		{
			boolean flag1 = mp.setmapc(s, s1, s2);
			return flag1;
		} else
		{
			return false;
		}
	}

	public int getMapchip(String s, String s1)
	{
		if(mp != null)
			return mp.getmapc(s, s1);
		else
			return -1;
	}

	public boolean setMapchip2(String s, String s1, String s2)
	{
		boolean flag = false;
		if(mp != null)
		{
			boolean flag1 = mp.setmapc2(s, s1, s2);
			return flag1;
		} else
		{
			return false;
		}
	}

	public int getMapchip2(String s, String s1)
	{
		if(mp != null)
			return mp.getmapc2(s, s1);
		else
			return -1;
	}

	public boolean setBackImage(String s)
	{
		boolean flag = false;
		if(mp != null)
		{
			boolean flag1 = mp.setbacki(s);
			return flag1;
		} else
		{
			return false;
		}
	}

	public boolean pressLeft()
	{
		if(gk != null)
		{
			gk.left_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean pressLeft2()
	{
		if(gk != null && mp != null && mp.ml_mode == 100 && mp.co_j.c >= 100 && mp.co_j.c < 200)
		{
			gk.left_f = true;
			gk.left_c = 2;
			mp.j_hashiru_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean releaseLeft()
	{
		if(gk != null)
		{
			gk.left_f = false;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean pressRight()
	{
		if(gk != null)
		{
			gk.right_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean pressRight2()
	{
		if(gk != null && mp != null && mp.ml_mode == 100 && mp.co_j.c >= 100 && mp.co_j.c < 200)
		{
			gk.right_f = true;
			gk.right_c = 2;
			mp.j_hashiru_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean releaseRight()
	{
		if(gk != null)
		{
			gk.right_f = false;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean pressUp()
	{
		if(gk != null)
		{
			gk.up_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean releaseUp()
	{
		if(gk != null)
		{
			gk.up_f = false;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean pressDown()
	{
		if(gk != null)
		{
			gk.down_f = true;
			gk.tr2_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean releaseDown()
	{
		if(gk != null)
		{
			gk.down_f = false;
			gk.tr2_f = false;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean pressTrigger1()
	{
		if(gk != null)
		{
			gk.tr1_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean releaseTrigger1()
	{
		if(gk != null)
		{
			gk.tr1_f = false;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean releaseAll()
	{
		if(gk != null)
		{
			gk.up_f = false;
			gk.down_f = false;
			gk.left_f = false;
			gk.right_f = false;
			gk.tr1_f = false;
			gk.tr2_f = false;
			gk.x_f = false;
			return true;
		} else
		{
			return false;
		}
	}

	public int getKeyCode()
	{
		if(gk != null)
			return gk.key_code;
		else
			return -1;
	}

	public boolean resetKeyCode()
	{
		if(gk != null)
		{
			gk.key_code = 0;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean equipFire()
	{
		if(getMode() >= 100 && getMode() < 200)
		{
			mp.j_fire_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean equipBarrier(String s)
	{
		boolean flag = false;
		if(gk != null && mp != null && mp.ml_mode == 100 && mp.co_j.c >= 100 && mp.co_j.c < 200)
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
				mp.j_v_c = i;
				gs.rsAddSound(7);
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
		if(gk != null && mp != null && mp.ml_mode == 100 && mp.co_j.c >= 100 && mp.co_j.c < 200)
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
				mp.j_jet_fuel = i;
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
		restart_f = true;
		th_jm = 1;
		if(mp != null)
		{
			mph_title_lock_f = mp.title_lock_f;
			mph_start_game_f = mp.start_game_f;
			if(mp.highscore < mp.score)
				mp.highscore = mp.score;
			mph_highscore = mp.highscore;
		}
		return true;
	}

	public String getValue(String s)
	{
		if(th_jm <= 0)
			return tdb.getValue(s);
		else
			return null;
	}

	public String getParamValue(String s)
	{
		if(th_jm <= 0)
			return tdb.getValue(s);
		else
			return null;
	}

	public boolean setValue(String s, String s1)
	{
		if(th_jm <= 0)
			return tdb.setValue(s, s1);
		else
			return false;
	}

	public boolean setParamValue(String s, String s1)
	{
		if(th_jm <= 0)
			return tdb.setValue(s, s1);
		else
			return false;
	}

	public int getMyXReal()
	{
		if(getMode() >= 100 && getMode() < 200 && mp.co_j.c >= 100 && mp.co_j.c < 200)
		{
			int i = mp.co_j.x;
			return i;
		} else
		{
			return -1;
		}
	}

	public int getMyYReal()
	{
		if(getMode() >= 100 && getMode() < 200 && mp.co_j.c >= 100 && mp.co_j.c < 200)
		{
			int i = mp.co_j.y;
			return i;
		} else
		{
			return -1;
		}
	}

	public boolean setMyXReal(String s)
	{
		if(getMode() >= 100 && getMode() < 200 && mp.co_j.c >= 100 && mp.co_j.c < 200)
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
			mp.co_j.x = i;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean setMyYReal(String s)
	{
		if(getMode() >= 100 && getMode() < 200 && mp.co_j.c >= 100 && mp.co_j.c < 200)
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
			mp.co_j.y = i;
			return true;
		} else
		{
			return false;
		}
	}

	public int getMyVX()
	{
		if(getMode() >= 100 && getMode() < 200 && mp.co_j.c >= 100 && mp.co_j.c < 200)
		{
			int i = mp.co_j.vx;
			return i;
		} else
		{
			return -9999;
		}
	}

	public int getMyVY()
	{
		if(getMode() >= 100 && getMode() < 200 && mp.co_j.c >= 100 && mp.co_j.c < 200)
		{
			int i = mp.co_j.vy;
			return i;
		} else
		{
			return -9999;
		}
	}

	public int getViewXReal()
	{
		if(getMode() >= 100 && getMode() < 200)
		{
			int i = mp.maps.wx;
			return i;
		} else
		{
			return -1;
		}
	}

	public int getViewYReal()
	{
		if(getMode() >= 100 && getMode() < 200)
		{
			int i = mp.maps.wy;
			return i;
		} else
		{
			return -1;
		}
	}

	public int getEnemyTotal()
	{
		if(getMode() >= 100 && getMode() < 200)
		{
			int i = 0;
			for(int j = 0; j <= 229; j++)
				if(mp.co_t[j].c >= 100 || mp.co_t[j].c == 10)
					i++;

			return i;
		} else
		{
			return -1;
		}
	}

	public int getBossXReal()
	{
		if(getMode() >= 100 && getMode() < 200)
		{
			int i = mp.co_b.x;
			return i;
		} else
		{
			return -1;
		}
	}

	public int getBossYReal()
	{
		if(getMode() >= 100 && getMode() < 200)
		{
			int i = mp.co_b.y;
			return i;
		} else
		{
			return -1;
		}
	}

	public boolean setMyMiss(String s)
	{
		if(getMode() >= 100 && getMode() < 200 && mp.co_j.c >= 100 && mp.co_j.c < 200)
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
			mp.jShinu(i);
			return true;
		} else
		{
			return false;
		}
	}

	public boolean setMyPress(String s)
	{
		if(getMode() >= 100 && getMode() < 200 && mp.co_j.c >= 100 && mp.co_j.c < 200)
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
			mp.jFumu(i);
			return true;
		} else
		{
			return false;
		}
	}

	public boolean playSound(String s)
	{
		if(gs == null)
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
			if(getMode() >= 100 && getMode() < 200)
				gs.rsAddSound(i - 1);
			else
				gs.play(i - 1);
			return true;
		} else
		{
			return false;
		}
	}

	public boolean setScrollLock(String s)
	{
		boolean flag = false;
		if(getMode() >= 100 && getMode() < 200)
			flag = mp.setScrollLock(s);
		return flag;
	}

	public int attackFire(String s, String s1, String s2, String s3)
	{
		int i = 0;
		if(getMode() >= 100 && getMode() < 200)
			i = mp.attackFire(s, s1, s2, s3);
		return i;
	}

	public boolean addScore(String s)
	{
		if(mp == null)
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
			mp.addScore(i);
			return true;
		} else
		{
			return false;
		}
	}

	public boolean setPenColor(String s, String s1, String s2)
	{
		if(mp != null)
		{
			boolean flag = mp.setPenColor(s, s1, s2, "255");
			return flag;
		} else
		{
			return true;
		}
	}

	public boolean setPenColor(String s, String s1, String s2, String s3)
	{
		if(mp != null)
		{
			boolean flag = mp.setPenColor(s, s1, s2, s3);
			return flag;
		} else
		{
			return true;
		}
	}

	public boolean showRect(String s, String s1, String s2, String s3, String s4)
	{
		boolean flag = false;
		if(mp != null)
		{
			boolean flag1 = mp.showrSet(s, s1, s2, s3, s4);
			return flag1;
		} else
		{
			return false;
		}
	}

	public boolean showOval(String s, String s1, String s2, String s3, String s4)
	{
		boolean flag = false;
		if(mp != null)
		{
			boolean flag1 = mp.showoSet(s, s1, s2, s3, s4);
			return flag1;
		} else
		{
			return false;
		}
	}

	public int getJSMes()
	{
		boolean flag = false;
		if(mp != null)
		{
			int i = mp.getJSMes();
			return i;
		} else
		{
			return -1;
		}
	}

	public boolean showGauge(String s, String s1)
	{
		if(mp != null)
		{
			boolean flag = mp.showGauge(s, s1);
			return flag;
		} else
		{
			return false;
		}
	}

	public boolean hideGauge()
	{
		if(mp != null)
		{
			boolean flag = mp.hideGauge();
			return flag;
		} else
		{
			return false;
		}
	}

	public boolean setJSMes(String s)
	{
		if(mp != null)
		{
			mp.setJSMes(s);
			return true;
		} else
		{
			return false;
		}
	}

	public boolean setTitleLock()
	{
		if(mp != null)
		{
			mp.title_lock_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean startGame()
	{
		if(mp != null)
		{
			mp.start_game_f = true;
			return true;
		} else
		{
			return false;
		}
	}

	public boolean equipGrenade(String s)
	{
		boolean flag = false;
		if(getMode() >= 100 && getMode() < 200 && mp.co_j.c >= 100 && mp.co_j.c < 200)
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
				mp.j_gr_kazu = i;
				return true;
			}
		} else
		{
			return false;
		}
	}

	public boolean setSystemImage(String s, String s1)
	{
		if(mp != null)
			return mp.setSystemImage(s, s1);
		else
			return false;
	}

	public boolean setModeWait(String s, String s1)
	{
		if(mp != null)
			return mp.setModeWait(s, s1);
		else
			return false;
	}

	public boolean showMyHP(String s)
	{
		if(mp != null)
			return mp.showMyHP(s);
		else
			return false;
	}

	public boolean setMyMaxHP(String s)
	{
		if(mp != null)
			return mp.setMyMaxHP(s);
		else
			return false;
	}

	public boolean setMyHP(String s)
	{
		if(mp != null)
			return mp.setMyHP(s);
		else
			return false;
	}

	public int getMyHP()
	{
		if(mp != null)
			return mp.getMyHP();
		else
			return 0;
	}

	public boolean setMyHPDamage(String s)
	{
		if(mp != null)
			return mp.setMyHPDamage(s);
		else
			return false;
	}

	public boolean setMyWait(String s, String s1, String s2)
	{
		if(mp != null)
			return mp.setMyWait(s, s1, s2);
		else
			return false;
	}

	public boolean setStageClear()
	{
		if(mp != null)
			return mp.setStageClear();
		else
			return false;
	}

	public boolean equipFire(String s)
	{
		byte byte0 = -1;
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
			if(i == 0)
			{
				mp.j_fire_f = false;
				return true;
			}
			if(i == 1)
			{
				mp.j_fire_f = true;
				return true;
			}
		}
		return false;
	}

	public boolean setFireRange(String s)
	{
		char c = '\u270F';
		if(mp != null)
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
				mp.j_fire_range = i;
				return true;
			}
		} else
		{
			return false;
		}
	}

	public boolean equipTail(String s)
	{
		byte byte0 = -1;
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
			if(i == 0)
			{
				mp.j_tail_f = false;
				return true;
			}
			if(i == 1)
			{
				mp.j_tail_f = true;
				return true;
			}
		}
		return false;
	}

	public int attackTail(String s, String s1, String s2, String s3)
	{
		int i = 0;
		if(getMode() >= 100 && getMode() < 200)
			i = mp.attackTail(s, s1, s2, s3);
		return i;
	}

	public int destroyEnemy(String s, String s1, String s2, String s3)
	{
		int i = -1;
		if(getMode() >= 100 && getMode() < 200)
			i = mp.destroyEnemy(s, s1, s2, s3);
		return i;
	}

	public int isPressZKey()
	{
		return gk == null || !gk.z_f ? 0 : 1;
	}

	public int isPressXKey()
	{
		return gk == null || !gk.x_f ? 0 : 1;
	}

	public int isPressSpaceKey()
	{
		return gk == null || !gk.space_f ? 0 : 1;
	}

	public int getMyDirection()
	{
		byte byte0 = -1;
		if(getMode() >= 100 && getMode() < 200)
		{
			int i;
			if(mp.j_tokugi == 15)
				i = mp.j_4_muki;
			else
				i = mp.co_j.muki;
			return i;
		} else
		{
			return -1;
		}
	}

	public boolean setHTMLText(String s)
	{
		if(mp != null)
		{
			tdb.initParameter();
			tdb.setValueFromHTMLText(s);
			restart();
			return true;
		} else
		{
			return false;
		}
	}

	public int newYuka(String s, String s1, String s2, String s3, String s4)
	{
		if(mp != null)
			return mp.newYuka(s, s1, s2, s3, s4);
		else
			return -1;
	}

	public boolean setYukaPosition(String s, String s1, String s2)
	{
		if(mp != null)
			return mp.setYukaPosition(s, s1, s2);
		else
			return false;
	}

	public boolean setYukaPosition(String s, String s1, String s2, String s3, String s4)
	{
		if(mp != null)
			return mp.setYukaPosition(s, s1, s2, s3, s4);
		else
			return false;
	}

	public boolean setYukaType(String s, String s1)
	{
		if(mp != null)
			return mp.setYukaType(s, s1);
		else
			return false;
	}

	public boolean disposeYuka(String s)
	{
		if(mp != null)
			return mp.disposeYuka(s);
		else
			return false;
	}

	public boolean setYukaColor(String s, String s1, String s2, String s3, String s4)
	{
		if(mp != null)
			return mp.setYukaColor(s, s1, s2, s3, s4);
		else
			return false;
	}

	public int isRideYuka(String s)
	{
		if(mp != null)
			return mp.isRideYuka(s);
		else
			return -1;
	}

	public boolean setMyVX(String s)
	{
		boolean flag = false;
		if(getMode() >= 100 && getMode() < 200 && mp.co_j.c >= 100 && mp.co_j.c < 200)
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
			if(i == -9999)
			{
				return false;
			} else
			{
				mp.co_j.vx = i;
				return true;
			}
		} else
		{
			return false;
		}
	}

	public boolean setMyVY(String s)
	{
		boolean flag = false;
		if(getMode() >= 100 && getMode() < 200 && mp.co_j.c >= 100 && mp.co_j.c < 200)
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
			if(i == -9999)
			{
				return false;
			} else
			{
				mp.co_j.vy = i;
				return true;
			}
		} else
		{
			return false;
		}
	}

	public int isRideGround()
	{
		if(mp != null)
			return mp.isRideGround();
		else
			return -1;
	}

	public boolean setYukaPattern(String s, String s1, String s2)
	{
		if(mp != null)
			return mp.setYukaPattern(s, s1, s2);
		else
			return false;
	}

	public boolean setYukaImage(String s, String s1)
	{
		if(mp != null)
			return mp.setYukaImage(s, s1);
		else
			return false;
	}

	public boolean setYukaImage(String s, Image image)
	{
		if(mp != null)
			return mp.setYukaImage(s, image);
		else
			return false;
	}

	public boolean setMySpeed(String s)
	{
		boolean flag = false;
		if(getMode() >= 100 && getMode() < 200 && mp.co_j.c >= 100 && mp.co_j.c < 200)
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
			if(i < 0 || i > 16)
				return false;
			if(mp.j_tokugi != 14 && mp.j_tokugi != 15)
			{
				return false;
			} else
			{
				mp.j_speed = i * 10;
				return true;
			}
		} else
		{
			return false;
		}
	}

	public boolean setScrollArea(String s, String s1, String s2, String s3)
	{
		if(mp != null)
			return mp.setScrollArea(s, s1, s2, s3);
		else
			return false;
	}

	public String loadTextFile(String s)
	{
		String s1 = "";
		if(mp != null && mode == 2)
		{
			s1 = tdb.loadTextString(s, "UTF-8", ap);
			if(s1 == null)
				s1 = "";
		}
		return s1;
	}

	public int isPressUpKey()
	{
		return gk == null || !gk.up_f ? 0 : 1;
	}

	public int isPressDownKey()
	{
		return gk == null || !gk.down_f ? 0 : 1;
	}

	public int isPressLeftKey()
	{
		return gk == null || !gk.left_f ? 0 : 1;
	}

	public int isPressRightKey()
	{
		return gk == null || !gk.right_f ? 0 : 1;
	}

	public Image newImageOnLoad(String s)
	{
		Image image = null;
		if(ap == null)
			return null;
		image = ap.getImage(ap.getDocumentBase(), s);
		MediaTracker mediatracker = new MediaTracker(ap);
		mediatracker.addImage(image, 2);
		try
		{
			mediatracker.waitForID(2);
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
		}
		return image;
	}

	public boolean setSystemDrawMode(String s)
	{
		byte byte0 = -1;
		if(mp != null)
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
			if(i < 1 || i > 3)
			{
				return false;
			} else
			{
				mp.system_draw_mode = i;
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
		if(mp != null)
		{
			if(mp.ml_mode != 100)
				return false;
			if(mp.dso_cf)
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
				mp.drawGamescreenMy();
				return true;
			}
			if(i == 2)
			{
				mp.drawGamescreenEnemy();
				return true;
			}
		}
		return false;
	}

	public int getMyObjectCondition()
	{
		if(mp != null)
			return mp.co_j.c;
		else
			return 0;
	}

	public int getMyObjectAC()
	{
		if(mp != null)
			return mp.co_j.ac;
		else
			return 0;
	}

	public int getMyObjectPattern()
	{
		if(mp != null)
			return mp.co_j.pt;
		else
			return 0;
	}

	public int getMyDirection4way()
	{
		byte byte0 = -1;
		if(getMode() >= 100 && getMode() < 200)
		{
			int i;
			if(mp.j_tokugi == 15)
				i = mp.j_4_muki;
			else
			if(mp.co_j.direction == 2 || mp.co_j.direction == 3)
				i = mp.co_j.direction;
			else
				i = mp.co_j.muki;
			return i;
		} else
		{
			return -1;
		}
	}

	public boolean setMyObjectPattern(String s)
	{
		byte byte0 = -1;
		if(mp != null)
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
				mp.co_j.pt = i;
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

	public boolean setMyObjectImage(Image image, int i, int j)
	{
		if(mp != null)
		{
			mp.co_j.img = image;
			mp.co_j.zs_x = i;
			mp.co_j.zs_y = j;
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
		if(mp != null)
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
				mp.co_t[i].pt = j;
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
		if(mp != null)
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
				return mp.co_t[i].c;
		} else
		{
			return 0;
		}
	}

	public int getEnemyObjectPattern(String s)
	{
		byte byte0 = -1;
		if(mp != null)
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
				return mp.co_t[i].pt;
		} else
		{
			return 0;
		}
	}

	public int getEnemyObjectDirection(String s)
	{
		byte byte0 = -1;
		boolean flag = false;
		boolean flag1 = false;
		if(mp != null)
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
			int j = mp.co_t[i].c;
			if(j >= 1400 && j < 1500)
				k = mp.co_t[i].direction;
			else
			if(j >= 1200 && j <= 1230)
				k = mp.co_t[i].direction;
			else
				k = mp.co_t[i].pth;
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
		if(mp != null)
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
				mp.co_t[i].img = image;
				mp.co_t[i].zs_x = j;
				mp.co_t[i].zs_y = k;
				return false;
			}
		} else
		{
			return false;
		}
	}

	public int getEnemyAC()
	{
		if(mp != null)
			return mp.g_c2;
		else
			return 0;
	}

	public int newChipImage(String s, String s1, String s2, String s3, String s4)
	{
		int i = -1;
		int j = 0;
		int k = 0;
		int l = 0;
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
		BufferedImage bufferedimage;
		try
		{
			bufferedimage = ImageIO.read(new URL(ap.getCodeBase(), s));
			MediaTracker mediatracker = new MediaTracker(ap);
			mediatracker.addImage(bufferedimage, 0);
			try
			{
				mediatracker.waitForID(0);
			}
			catch(Exception exception1)
			{
				exception1.printStackTrace();
			}
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
			bufferedimage = null;
		}
		ci = new ChipImage(i, j, k, l, bufferedimage);
		return 0;
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
			return ci.getChipImage(i);
	}

	public int isPressCodeKey(String s)
	{
		boolean flag = false;
		if(gk != null)
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
			return !gk.codekey_f[i] ? 0 : 1;
		} else
		{
			return 0;
		}
	}

	Frame fr;
	Applet ap;
	Container oya;
	int mode;
	boolean mode_nodraw;
	File file_genzai;
	int file_syurui;
	boolean restart_f;
	ChipImage ci;
	boolean mph_title_lock_f;
	boolean mph_start_game_f;
	int mph_highscore;
	Thread th;
	int th_interval;
	int th_jm;
	long process_time;
	boolean variable_sleep_time;
	boolean sleep_time_visible;
	int main_time_kiroku[];
	int main_time_kiroku_p;
	boolean main_time_kiroku_f;
	int main_program_time;
	int sleep_time;
	int main_time_10try;
	TagDataBase tdb;
	GameGraphics gg;
	GameMouse gm;
	GameKey gk;
	GameSound gs;
	MainProgram mp;
	MasaoEventHandler meh;
}
