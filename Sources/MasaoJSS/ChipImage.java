// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   ChipImage.java

import java.awt.image.BufferedImage;

public class ChipImage
{

	public ChipImage(int i, int j, int k, int l, BufferedImage bufferedimage)
	{
		chip_width = i;
		chip_height = j;
		chip_x_count = k;
		chip_y_count = l;
		ai_width = bufferedimage.getWidth();
		ai_height = bufferedimage.getHeight();
		makeChipImage(bufferedimage);
	}

	private void makeChipImage(BufferedImage bufferedimage)
	{
		ai_img = new BufferedImage(ai_width, ai_height, 2);
		ai_img = bufferedimage;
		chip_img = new BufferedImage[chip_x_count * chip_y_count][4];
		for(int k = 0; k < chip_y_count; k++)
		{
			for(int i = 0; i < chip_x_count; i++)
			{
				chip_img[i + k * chip_x_count][1] = null;
				chip_img[i + k * chip_x_count][2] = null;
				chip_img[i + k * chip_x_count][3] = null;
				if((i + 1) * chip_width - 1 > ai_width - 1 || (k + 1) * chip_height - 1 > ai_height - 1)
					chip_img[i + k * chip_x_count][0] = null;
				else
					chip_img[i + k * chip_x_count][0] = new BufferedImage(chip_width, chip_height, 2);
			}

		}

		for(int l = 0; l < chip_y_count; l++)
		{
label0:
			for(int j = 0; j < chip_x_count; j++)
			{
				int k1 = j * chip_width;
				int l1 = l * chip_height;
				if((k1 + chip_width) - 1 > ai_width - 1 || (l1 + chip_height) - 1 > ai_height - 1)
				{
					chip_img[j + l * chip_x_count][0] = null;
					continue;
				}
				int j1 = 0;
				do
				{
					if(j1 >= chip_height)
						continue label0;
					for(int i1 = 0; i1 < chip_width; i1++)
					{
						int i2 = ai_img.getRGB(k1 + i1, l1 + j1);
						chip_img[j + l * chip_x_count][0].setRGB(i1, j1, i2);
					}

					j1++;
				} while(true);
			}

		}

	}

	public boolean makeReverseChipImage()
	{
		int ai[][] = new int[chip_width][chip_height];
		for(int j = 0; j < chip_y_count; j++)
		{
label0:
			for(int i = 0; i < chip_x_count; i++)
			{
				int k2 = i + j * chip_x_count;
				if(chip_img[k2][0] == null)
					continue;
				for(int k1 = 0; k1 < chip_height; k1++)
				{
					for(int k = 0; k < chip_width; k++)
						ai[k][k1] = chip_img[k2][0].getRGB(k, k1);

				}

				chip_img[k2][1] = new BufferedImage(chip_width, chip_height, 2);
				chip_img[k2][2] = new BufferedImage(chip_width, chip_height, 2);
				chip_img[k2][3] = new BufferedImage(chip_width, chip_height, 2);
				for(int l1 = 0; l1 < chip_height; l1++)
				{
					for(int l = 0; l < chip_width; l++)
						chip_img[k2][1].setRGB(l, l1, ai[chip_width - 1 - l][l1]);

				}

				for(int i2 = 0; i2 < chip_height; i2++)
				{
					for(int i1 = 0; i1 < chip_width; i1++)
						chip_img[k2][2].setRGB(i1, i2, ai[i1][chip_height - 1 - i2]);

				}

				int j2 = 0;
				do
				{
					if(j2 >= chip_height)
						continue label0;
					for(int j1 = 0; j1 < chip_width; j1++)
						chip_img[k2][3].setRGB(j1, j2, ai[chip_width - 1 - j1][chip_height - 1 - j2]);

					j2++;
				} while(true);
			}

		}

		return true;
	}

	public BufferedImage getChipImage(int i)
	{
		if(i >= chip_img.length)
			return null;
		else
			return chip_img[i][0];
	}

	public BufferedImage getChipImage(int i, int j)
	{
		if(i >= chip_img.length)
			return null;
		else
			return chip_img[i][j];
	}

	public int ai_width;
	public int ai_height;
	public int chip_width;
	public int chip_height;
	public int chip_x_count;
	public int chip_y_count;
	public BufferedImage ai_img;
	public BufferedImage chip_img[][];
}
