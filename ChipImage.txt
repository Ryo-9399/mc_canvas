import java.awt.image.BufferedImage;

public class ChipImage
{
	public int ai_width;
	public int ai_height;
	public int chip_width;
	public int chip_height;
	public int chip_x_count;
	public int chip_y_count;
	public BufferedImage ai_img;
	public BufferedImage[][] chip_img;

	public ChipImage(int paramInt1, int paramInt2, int paramInt3, int paramInt4, BufferedImage paramBufferedImage)
	{
		this.chip_width = paramInt1;
		this.chip_height = paramInt2;
		this.chip_x_count = paramInt3;
		this.chip_y_count = paramInt4;
		this.ai_width = paramBufferedImage.getWidth();
		this.ai_height = paramBufferedImage.getHeight();


		makeChipImage(paramBufferedImage);
	}

	private void makeChipImage(BufferedImage paramBufferedImage)
	{
		this.ai_img = new BufferedImage(this.ai_width, this.ai_height, 2);
		this.ai_img = paramBufferedImage;


		this.chip_img = new BufferedImage[this.chip_x_count * this.chip_y_count][4];
		int i;
		for (int j = 0; j < this.chip_y_count; j++) {
			for (i = 0; i < this.chip_x_count; i++)
			{
				this.chip_img[(i + j * this.chip_x_count)][1] = null;
				this.chip_img[(i + j * this.chip_x_count)][2] = null;
				this.chip_img[(i + j * this.chip_x_count)][3] = null;
				if (((i + 1) * this.chip_width - 1 > this.ai_width - 1) || ((j + 1) * this.chip_height - 1 > this.ai_height - 1)) {
					this.chip_img[(i + j * this.chip_x_count)][0] = null;
				} else {
					this.chip_img[(i + j * this.chip_x_count)][0] = new BufferedImage(this.chip_width, this.chip_height, 2);
				}
			}
		}
		for (j = 0; j < this.chip_y_count; j++) {
			for (i = 0; i < this.chip_x_count; i++)
			{
				int n = i * this.chip_width;
				int i1 = j * this.chip_height;
				if ((n + this.chip_width - 1 > this.ai_width - 1) || (i1 + this.chip_height - 1 > this.ai_height - 1)) {
					this.chip_img[(i + j * this.chip_x_count)][0] = null;
				} else {
					for (int m = 0; m < this.chip_height; m++) {
						for (int k = 0; k < this.chip_width; k++)
						{
							int i2 = this.ai_img.getRGB(n + k, i1 + m);
							this.chip_img[(i + j * this.chip_x_count)][0].setRGB(k, m, i2);
						}
					}
				}
			}
		}
	}

	public boolean makeReverseChipImage()
	{
		int[][] arrayOfInt = new int[this.chip_width][this.chip_height];
		for (int j = 0; j < this.chip_y_count; j++) {
			for (int i = 0; i < this.chip_x_count; i++)
			{
				int n = i + j * this.chip_x_count;
				if (this.chip_img[n][0] != null)
				{
					int k;
					for (int m = 0; m < this.chip_height; m++) {
						for (k = 0; k < this.chip_width; k++) {
							arrayOfInt[k][m] = this.chip_img[n][0].getRGB(k, m);
						}
					}
					this.chip_img[n][1] = new BufferedImage(this.chip_width, this.chip_height, 2);
					this.chip_img[n][2] = new BufferedImage(this.chip_width, this.chip_height, 2);
					this.chip_img[n][3] = new BufferedImage(this.chip_width, this.chip_height, 2);
					for (m = 0; m < this.chip_height; m++) {
						for (k = 0; k < this.chip_width; k++) {
							this.chip_img[n][1].setRGB(k, m, arrayOfInt[(this.chip_width - 1 - k)][m]);
						}
					}
					for (m = 0; m < this.chip_height; m++) {
						for (k = 0; k < this.chip_width; k++) {
							this.chip_img[n][2].setRGB(k, m, arrayOfInt[k][(this.chip_height - 1 - m)]);
						}
					}
					for (m = 0; m < this.chip_height; m++) {
						for (k = 0; k < this.chip_width; k++) {
							this.chip_img[n][3].setRGB(k, m, arrayOfInt[(this.chip_width - 1 - k)][(this.chip_height - 1 - m)]);
						}
					}
				}
			}
		}
		return true;
	}

	public BufferedImage getChipImage(int paramInt)
	{
		if (paramInt >= this.chip_img.length) {
			return null;
		}
		return this.chip_img[paramInt][0];
	}

	public BufferedImage getChipImage(int paramInt1, int paramInt2)
	{
		if (paramInt1 >= this.chip_img.length) {
			return null;
		}
		return this.chip_img[paramInt1][paramInt2];
	}
}
