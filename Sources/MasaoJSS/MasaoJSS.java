// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   MasaoJSS.java

import java.awt.*;
import netscape.javascript.JSObject;

public class MasaoJSS extends MasaoFXApplet
{

	public MasaoJSS()
	{
		o_jsm = new Object[4];
		ci = null;
	}

	public void init()
	{
		mc = new MasaoGhost(this, this);
		jso = JSObject.getWindow(this);
	}

	public void paint(Graphics g)
	{
		if(my_offscreen_img != null)
		{
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

	public void stop()
	{
		mc.stop();
	}

	public void masaoEvent(Graphics g, Image image)
	{
		if(mc.getMode() >= 100 && mc.getMode() < 200)
		{
			o_jsm[0] = g;
			o_jsm[1] = new Integer(mc.getMode());
			o_jsm[2] = new Integer(mc.mp.maps.wx);
			o_jsm[3] = new Integer(mc.mp.maps.wy);
			jso.call("userJS", o_jsm);
		} else
		{
			o_jsm[0] = g;
			o_jsm[1] = new Integer(mc.getMode());
			o_jsm[2] = new Integer(-9999);
			o_jsm[3] = new Integer(-9999);
			jso.call("userJS", o_jsm);
		}
		my_offscreen_img = image;
		repaint();
	}

	public boolean drawPattern(String s, String s1, String s2, String s3)
	{
		boolean flag = false;
		int j = 0;
		int k = 0;
		int l = 0;
		if(mc.gg != null)
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

	public boolean setOffscreenColor(String s, String s1, String s2, String s3)
	{
		boolean flag = false;
		int j = 0;
		int k = 0;
		int l = 0;
		if(mc.gg != null)
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

	public boolean drawImage(String s, String s1, String s2)
	{
		boolean flag = false;
		int j = 0;
		Object obj = null;
		if(mc.gg != null)
		{
			int i;
			try
			{
				i = Integer.parseInt(s1);
				j = Integer.parseInt(s2);
			}
			catch(NumberFormatException numberformatexception)
			{
				i = -9999;
			}
			if(i == -9999)
				return false;
			Image image = getImage(getDocumentBase(), s);
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
		}
	}

	public boolean fillPolygon(String s, String s1, String s2, String s3, String s4, String s5)
	{
		int ai[] = new int[3];
		int ai1[] = new int[3];
		if(mc.gg != null)
		{
			try
			{
				ai[0] = Integer.parseInt(s);
				ai1[0] = Integer.parseInt(s1);
				ai[1] = Integer.parseInt(s2);
				ai1[1] = Integer.parseInt(s3);
				ai[2] = Integer.parseInt(s4);
				ai1[2] = Integer.parseInt(s5);
			}
			catch(NumberFormatException numberformatexception)
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
		} else
		{
			return false;
		}
	}

	public boolean fillPolygon(String s, String s1, String s2, String s3, String s4, String s5, String s6, 
			String s7)
	{
		int ai[] = new int[4];
		int ai1[] = new int[4];
		if(mc.gg != null)
		{
			try
			{
				ai[0] = Integer.parseInt(s);
				ai1[0] = Integer.parseInt(s1);
				ai[1] = Integer.parseInt(s2);
				ai1[1] = Integer.parseInt(s3);
				ai[2] = Integer.parseInt(s4);
				ai1[2] = Integer.parseInt(s5);
				ai[3] = Integer.parseInt(s6);
				ai1[3] = Integer.parseInt(s7);
			}
			catch(NumberFormatException numberformatexception)
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
		} else
		{
			return false;
		}
	}

	public boolean drawImageRotate(Image image, String s, String s1, String s2)
	{
		boolean flag = false;
		int j = 0;
		int k = 0;
		Object obj = null;
		if(mc.gg != null)
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
				i = -9999;
			}
			if(i == -9999)
			{
				return false;
			} else
			{
				Graphics2D graphics2d = (Graphics2D)(Graphics2D)mc.gg.os_img.getGraphics();
				int l = i + image.getWidth(this) / 2;
				int i1 = j + image.getHeight(this) / 2;
				graphics2d.rotate(((float)k * 3.14F) / 180F, l, i1);
				graphics2d.drawImage(image, i, j, this);
				graphics2d.dispose();
				return true;
			}
		} else
		{
			return false;
		}
	}

	public boolean drawImageScale(Image image, String s, String s1, String s2, String s3)
	{
		boolean flag = false;
		int j = 0;
		int k = 100;
		int l = 100;
		Object obj = null;
		if(mc.gg != null)
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
				i = -9999;
			}
			if(i == -9999)
			{
				return false;
			} else
			{
				Graphics2D graphics2d = (Graphics2D)(Graphics2D)mc.gg.os_img.getGraphics();
				graphics2d.translate(i, j);
				graphics2d.scale((float)k / 100F, (float)l / 100F);
				graphics2d.drawImage(image, 0, 0, this);
				graphics2d.dispose();
				return true;
			}
		} else
		{
			return false;
		}
	}

	public boolean drawImageAlphaComposite(Image image, String s, String s1, String s2)
	{
		boolean flag = false;
		int j = 0;
		int k = 100;
		Object obj = null;
		if(mc.gg != null)
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
				i = -9999;
			}
			if(i == -9999)
				return false;
			if(k < 0)
				k = 0;
			else
			if(k > 100)
				k = 100;
			Graphics2D graphics2d = (Graphics2D)(Graphics2D)mc.gg.os_img.getGraphics();
			graphics2d.setComposite(AlphaComposite.getInstance(3, (float)k / 100F));
			graphics2d.drawImage(image, i, j, this);
			graphics2d.dispose();
			return true;
		} else
		{
			return false;
		}
	}

	JSObject jso;
	Object o_jsm[];
	ChipImage ci;
}
