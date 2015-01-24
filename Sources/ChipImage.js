
function ChipImage(i, j, k, l, bufferedimage)
{
	this.chip_width = i;
	this.chip_height = j;
	this.chip_x_count = k;
	this.chip_y_count = l;
	this.ai_width = bufferedimage._width;
	this.ai_height = bufferedimage._height;
	this.chip_img = createNDimensionArray(this.chip_x_count * this.chip_y_count, 4);
	this.ai_img = bufferedimage;
	createImageBuffer.bind(this)(0);

	function makeChipImage(bufferedimage)
	{
		var localG;

		for(var l = 0; l < this.chip_y_count; l++)
		{
			for(var j = 0; j < this.chip_x_count; j++)
			{
				var k1 = j * this.chip_width;
				var l1 = l * this.chip_height;
				/*if((k1 + this.chip_width) - 1 > this.ai_width - 1 || (l1 + this.chip_height) - 1 > this.ai_height - 1)
				{
					this.chip_img[j + l * this.chip_x_count][0] = null;
					continue;
				}*/
				localG = this.chip_img[j + l * this.chip_x_count][0].getGraphics();
				localG.drawImage(this.ai_img, k1, l1, this.chip_width, this.chip_height,
					0, 0, this.chip_width, this.chip_height, null);
			}

		}

	}

	function makeReverseChipImage()
	{
		var localG;
		var w = this.chip_width;
		var h = this.chip_height;
		for(var j = 0; j < this.chip_y_count; j++)
		{
			for(var i = 0; i < this.chip_x_count; i++)
			{
				var k2 = i + j * this.chip_x_count;
				if(this.chip_img[k2][0] == null)
					continue;

				localG = this.chip_img[k2][1].getGraphics();
				localG.scale(-1, 1);
				localG.drawImage(this.chip_img[k2][0], -w, 0, w, h, null);
				localG.dispose();
				localG = this.chip_img[k2][2].getGraphics();
				localG.scale(1, -1);
				localG.drawImage(this.chip_img[k2][0], 0, -h, w, h, null);
				localG.dispose();
				localG = this.chip_img[k2][3].getGraphics();
				localG.scale(-1, -1);
				localG.drawImage(this.chip_img[k2][0], -w, -h, w, h, null);
				localG.dispose();
			}

		}

		return true;
	}

	function createImageBuffer(n)
	{
		var k, i;
		for(k = 0; k < this.chip_y_count; k++)
		{
			for(i = 0; i < this.chip_x_count; i++)
			{
				//if(n == 0 && ((i + 1) * this.chip_width - 1 > this.ai_width - 1 || (k + 1) * this.chip_height - 1 > this.ai_height - 1))
					//this.chip_img[i + k * this.chip_x_count][n] = null;
				//else
					this.chip_img[i + k * this.chip_x_count][n] = new ImageBuff(this.chip_width, this.chip_height);
			}
		}
	}

	this.makeChipImage = function()
	{
		makeChipImage.bind(this)(bufferedimage);
	}

	this.makeReverseChipImage = function()
	{
		makeReverseChipImage.bind(this)();
	}

	this.createImageBuffer = function(n)
	{
		createImageBuffer.bind(this)(n);
	}

	this.getChipImage = function(i, j)
	{
		if(!j) j = 0;
		if(i >= this.chip_img.length || i < 0 || j > 3 || j < 0)
			return null;
		else
			return this.chip_img[i][j];
	}

}
