import { createNDimensionArray } from "./GlobalFunctions";
import { ImageBuff } from "./ImageBuff";

/**
 * 1枚の画像から複数のチップ画像を生成するクラス
 * @param i {number} チップ１枚の横幅
 * @param j {number} チップ1枚の高さ
 * @param k {number} チップが横に並ぶ数
 * @param l {number} チップが縦に並ぶ数
 * @param bufferedimage {ImageBuff} オリジナルの画像
 * @constructor
 */
function ChipImage(i, j, k, l, bufferedimage) {
	this.chip_width = i;
	this.chip_height = j;
	this.chip_x_count = k;
	this.chip_y_count = l;
	this.ai_width = bufferedimage._width;
	this.ai_height = bufferedimage._height;
	this.chip_img = createNDimensionArray(
		this.chip_x_count * this.chip_y_count,
		4
	);
	this.ai_img = bufferedimage;
	createImageBuffer.bind(this)(0);

	function makeChipImage(bufferedimage) {
		var localG;

		for (var l = 0; l < this.chip_y_count; l++) {
			for (var j = 0; j < this.chip_x_count; j++) {
				var k1 = j * this.chip_width;
				var l1 = l * this.chip_height;
				/*if((k1 + this.chip_width) - 1 > this.ai_width - 1 || (l1 + this.chip_height) - 1 > this.ai_height - 1)
				{
					this.chip_img[j + l * this.chip_x_count][0] = null;
					continue;
				}*/
				localG = this.chip_img[
					j + l * this.chip_x_count
				][0].getGraphics();
				localG.drawImage(
					this.ai_img,
					k1,
					l1,
					this.chip_width,
					this.chip_height,
					0,
					0,
					this.chip_width,
					this.chip_height,
					null
				);
			}
		}
	}

	function makeReverseChipImage() {
		var localG;
		var w = this.chip_width;
		var h = this.chip_height;
		for (var j = 0; j < this.chip_y_count; j++) {
			for (var i = 0; i < this.chip_x_count; i++) {
				var k2 = i + j * this.chip_x_count;
				if (this.chip_img[k2][0] == null) continue;

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

	function createImageBuffer(n) {
		var k, i;
		for (k = 0; k < this.chip_y_count; k++) {
			for (i = 0; i < this.chip_x_count; i++) {
				//if(n == 0 && ((i + 1) * this.chip_width - 1 > this.ai_width - 1 || (k + 1) * this.chip_height - 1 > this.ai_height - 1))
				//this.chip_img[i + k * this.chip_x_count][n] = null;
				//else
				this.chip_img[i + k * this.chip_x_count][n] = new ImageBuff(
					this.chip_width,
					this.chip_height
				);
			}
		}
	}

	/**
	 * 新しいチップ画像を内部的に生成する
	 * createImageBufferを呼び出したあとに呼ぶ
	 */
	this.makeChipImage = function() {
		makeChipImage.bind(this)(bufferedimage);
	};

	/**
	 * それぞれの画像が垂直・水平方向に反転したチップ画像を内部的に生成する
	 * createImageBufferを呼び出したあとに呼ぶ
	 */
	this.makeReverseChipImage = function() {
		makeReverseChipImage.bind(this)();
	};

	/**
	 * 新しいチップ画像を作る ために内部の配列を初期化する
	 * @param n {number} 反転情報 (0:反転なし 1:水平反転 2:垂直反転 3:水平垂直反転
	 */
	this.createImageBuffer = function(n) {
		createImageBuffer.bind(this)(n);
	};

	/**
	 * 単一のチップ画像を取得する
	 * @param i {number} 取得するチップ画像の番号 (0ベースで、Y座標×X幅+X座標)
	 * @param j {number} 反転情報 (0:反転なし 1:水平反転 2:垂直反転 3:水平垂直反転
	 * @returns {ImageBuff | *} チップ画像 範囲指定がおかしければnullが、初期化用のメソッドがまだ呼ばれていないなど内部状態のどこかがおかしければundefinedとかよくわからないものが返る
	 */
	this.getChipImage = function(i, j) {
		if (!j) j = 0;
		if (i >= this.chip_img.length || i < 0 || j > 3 || j < 0) return null;
		else return this.chip_img[i][j];
	};
}

export { ChipImage };
