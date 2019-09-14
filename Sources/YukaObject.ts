import { Color } from "./ImageBuff";

class YukaObject {
	con: number;
	x: number;
	y: number;
	x2: number;
	y2: number;
	width: number;
	height: number;
	view_x: number;
	view_y: number;
	x_buff: any;
	y_buff: any;
	x2_buff: any;
	y2_buff: any;
	buff_f: boolean;
	img: any;
	color: Color;
	pt: number;
	pth: number;
	draw_f: boolean;
	type: number;

	constructor() {
		this.con = 0;
		this.x = 32;
		this.y = 320;
		this.x2 = 32;
		this.y2 = 320;
		this.width = 96;
		this.height = 64;
		this.view_x = 0;
		this.view_y = 0;
		this.x_buff = this.x;
		this.y_buff = this.y;
		this.x2_buff = this.x2;
		this.y2_buff = this.y2;
		this.buff_f = false;
		this.img = null;
		this.color = Color.yellow;
		this.pt = 0;
		this.pth = 0;
		this.draw_f = false;
		this.type = 1;
	}

	init() {
		this.con = 0;
		this.x = 32;
		this.y = 320;
		this.x2 = 32;
		this.y2 = 320;
		this.width = 96;
		this.height = 64;
		this.view_x = 0;
		this.view_y = 0;
		this.x_buff = this.x;
		this.y_buff = this.y;
		this.x2_buff = this.x2;
		this.y2_buff = this.y2;
		this.buff_f = false;
		this.img = null;
		this.color = Color.yellow;
		this.pt = 0;
		this.pth = 0;
		this.draw_f = false;
		this.type = 1;
	}

	setImage(paramImage) {
		this.img = paramImage;
		return true;
	}
}

export { YukaObject };
