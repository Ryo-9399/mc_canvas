import { CharacterObject } from "./CharacterObject";
import { createNDimensionArray, rounddown } from "./GlobalFunctions";
import { Color } from "./ImageBuff";

function IdouGamen(gamegraphics, gamekey, keyboardmenu, mainprogram) {
	this.gg = gamegraphics;
	this.gk = gamekey;
	this.km = keyboardmenu;
	this.mp = mainprogram;
	this.tdb = this.mp.tdb;
	this.co_j = new CharacterObject();
	this.map_string = new Array(rounddown(this.gg.di.height / 32) - 1);
	this.map_bg = createNDimensionArray(rounddown(this.gg.di.width / 32) - 1, rounddown(this.gg.di.height / 32) - 1);
	this.stage_c = new Array(10);
	this.stage_x = new Array(10);
	this.stage_y = new Array(10);
	this.stage_cf = new Array(10);
	this.stage_kcID = undefined;
	this.door_koID = undefined;
	this.dokan_khID = undefined;
	this.door_score_open = undefined;
	this.ie_c = new Array(16);
	this.ie_x = new Array(16);
	this.ie_y = new Array(16);
	this.zure_x = 16; // 未使用？
	this.zure_y = 24; // 未使用？
	this.mp_mode = 0;
	this.shop_kattaitem = undefined;
	this.cc_hankei = undefined;
	this.cc_hankei_max = 12 * rounddown(((this.gg.di.width / 2) * Math.SQRT2 - 50) / 12);
	this.cc_kakudo = undefined;
	this.cc_p1_x = new Array(17);
	this.cc_p1_y = new Array(17);
	this.cc_p2_x = new Array(17);
	this.cc_p2_y = new Array(17);

	this.cc_p1_x[13] = -200;
	this.cc_p1_y[13] = 160;
	this.cc_p1_x[14] = -200;
	this.cc_p1_y[14] = 520;
	this.cc_p1_x[15] = 712;
	this.cc_p1_y[15] = 520;
	this.cc_p1_x[16] = 712;
	this.cc_p1_y[16] = 160;
	this.cc_p2_x[13] = 712;
	this.cc_p2_y[13] = 160;
	this.cc_p2_x[14] = 712;
	this.cc_p2_y[14] = -200;
	this.cc_p2_x[15] = -200;
	this.cc_p2_y[15] = -200;
	this.cc_p2_x[16] = -200;
	this.cc_p2_y[16] = 160;
}

IdouGamen.prototype.worldInit = function() {
	for (let i = 0; i <= 9; i++) {
		this.stage_c[i] = 0;
		this.stage_cf[i] = false;
	}
	this.stage_kcID = 0;
	this.door_koID = 0;
	this.dokan_khID = 0;
	this.door_score_open = 0;
	for (let i = 0; i <= 15; i++) {
		this.ie_c[i] = 0;
	}
	this.co_j.x = 0;
	this.co_j.y = 0;
	this.co_j.vx = 0;
	this.co_j.vy = 0;
	this.co_j.muki = 1;
	this.co_j.ac = 0;
	this.mp.tr1_c = 2;
	this.shop_kattaitem = -1;
	this.mp_mode = 0;
	this.km.initAll();
	this.km.mode = 100;
	for (let i = 0; i <= rounddown(this.gg.di.height / 32) - 2; i++) {
		let str = this.tdb.getValue(`chizu-${i}`);
		[...Array(rounddown(this.gg.di.width / 32) - 1)].map(() => {
			str += ".";
		});
		this.map_string[i] = str;
	}
	for (let i = 0; i <= rounddown(this.gg.di.height / 32) - 2; i++) {
		for (let j = 0; j <= rounddown(this.gg.di.width / 32) - 2; j++) {
			const c = this.map_string[i].charAt(j);
			if (c == "A") {
				// 自分
				this.co_j.x = j << 5;
				this.co_j.y = i << 5;
				this.map_bg[j][i] = 220;
			} else if (c == "B") {
				// メッセージの人１
				this.map_bg[j][i] = 216;
				this.ie_c[3] = 100;
				this.ie_x[3] = j << 5;
				this.ie_y[3] = i << 5;
			} else if (c == "C") {
				// メッセージの人２
				this.map_bg[j][i] = 217;
				this.ie_c[4] = 100;
				this.ie_x[4] = j << 5;
				this.ie_y[4] = i << 5;
			} else if (c == "D") {
				// 店
				this.map_bg[j][i] = 218;
				this.ie_c[10] = 100;
				this.ie_x[10] = j << 5;
				this.ie_y[10] = i << 5;
			} else if (c == "E") {
				// 説明する人
				this.map_bg[j][i] = 219;
				this.ie_c[11] = 100;
				this.ie_x[11] = j << 5;
				this.ie_y[11] = i << 5;
			} else if (c == "a") {
				// ステージ１
				if (this.stage_c[0] == 0) {
					this.map_bg[j][i] = 223;
					this.stage_c[0] = 100;
					this.stage_x[0] = j << 5;
					this.stage_y[0] = i << 5;
				} else {
					this.map_bg[j][i] = 220;
				}
			} else if (c == "b") {
				// ステージ２
				if (this.stage_c[1] == 0) {
					this.map_bg[j][i] = 224;
					this.stage_c[1] = 100;
					this.stage_x[1] = j << 5;
					this.stage_y[1] = i << 5;
				} else {
					this.map_bg[j][i] = 220;
				}
			} else if (c == "c") {
				// ステージ３
				if (this.stage_c[2] == 0) {
					this.map_bg[j][i] = 225;
					this.stage_c[2] = 100;
					this.stage_x[2] = j << 5;
					this.stage_y[2] = i << 5;
				} else {
					this.map_bg[j][i] = 220;
				}
			} else if (c == "d") {
				// ラストステージ
				if (this.stage_c[3] == 0) {
					this.map_bg[j][i] = 226;
					this.stage_c[3] = 100;
					this.stage_x[3] = j << 5;
					this.stage_y[3] = i << 5;
				} else {
					this.map_bg[j][i] = 220;
				}
			} else if (c == "e") {
				// 人面星１つで開く扉
				this.map_bg[j][i] = 213;
				this.ie_c[0] = 100;
				this.ie_x[0] = j << 5;
				this.ie_y[0] = i << 5;
			} else if (c == "f") {
				// 人面星２つで開く扉
				this.map_bg[j][i] = 214;
				this.ie_c[1] = 100;
				this.ie_x[1] = j << 5;
				this.ie_y[1] = i << 5;
			} else if (c == "g") {
				// 人面星３つで開く扉
				this.map_bg[j][i] = 215;
				this.ie_c[2] = 100;
				this.ie_x[2] = j << 5;
				this.ie_y[2] = i << 5;
			} else if (c == "h") {
				// 得点で開く扉
				this.map_bg[j][i] = 212;
				this.ie_c[9] = 100;
				this.ie_x[9] = j << 5;
				this.ie_y[9] = i << 5;
			} else if (c == "i") {
				// リンク土管１
				this.map_bg[j][i] = 206;
				this.ie_c[5] = 100;
				this.ie_x[5] = j << 5;
				this.ie_y[5] = i << 5;
			} else if (c == "j") {
				// リンク土管２
				this.map_bg[j][i] = 207;
				this.ie_c[6] = 100;
				this.ie_x[6] = j << 5;
				this.ie_y[6] = i << 5;
			} else if (c == "k") {
				// リンク土管３
				this.map_bg[j][i] = 208;
				this.ie_c[7] = 100;
				this.ie_x[7] = j << 5;
				this.ie_y[7] = i << 5;
			} else if (c == "l") {
				// リンク土管４
				this.map_bg[j][i] = 209;
				this.ie_c[8] = 100;
				this.ie_x[8] = j << 5;
				this.ie_y[8] = i << 5;
			} else if (c == "1") {
				// 中継地点
				this.map_bg[j][i] = 220;
			} else if (c == "2") {
				// 縦の道
				this.map_bg[j][i] = 221;
			} else if (c == "3") {
				// 横の道
				this.map_bg[j][i] = 222;
			} else {
				// 空白
				this.map_bg[j][i] = 0;
			}
		}
	}
	if (this.co_j.x + 16 > rounddown(this.gg.di.width / 2)) {
		// 画面の右半分から開始する場合、自分の向きを左向きにする
		this.co_j.muki = 0;
	}
	this.drawOs2();
};

IdouGamen.prototype.worldInit2 = function() {
	this.co_j.vx = 0;
	this.co_j.vy = 0;
	this.co_j.muki = 1;
	this.co_j.ac = 0;
	this.mp.tr1_c = 2;
	this.mp_mode = 200;
	this.cc_hankei = 12;
	this.stage_kcID = 0;
	this.door_koID = 0;
	this.shop_kattaitem = -1;
	this.door_score_open = 0;
	if (this.ie_c[9] == 100 && this.mp.score >= this.mp.door_score) {
		this.ie_c[9] = 50;
		this.door_score_open = 1;
	}
	this.km.initAll();
	this.km.mode = 100;
	this.drawOs2();
};

IdouGamen.prototype.worldInit3 = function() {
	this.stage_kcID = this.checkStage();
	this.stage_cf[this.stage_kcID - 1] = true;
	this.stage_c[this.stage_kcID - 1] = 50;
	let i = 0;
	for (let j = 0; j <= 2; j++) {
		if (this.stage_cf[j] == 1) {
			i++;
		}
	}
	this.door_koID = 0;
	if (i >= 1 && this.ie_c[i - 1] == 100) {
		this.ie_c[i - 1] = 50;
		this.door_koID = i;
	}
	this.door_score_open = 0;
	if (this.ie_c[9] == 100 && this.mp.score >= this.mp.door_score) {
		this.ie_c[9] = 50;
		this.door_score_open = 1;
	}
	this.co_j.vx = 0;
	this.co_j.vy = 0;
	this.co_j.muki = 1;
	this.co_j.ac = 0;
	this.mp.tr1_c = 2;
	this.co_j.pt = 0;
	this.shop_kattaitem = -1;
	this.mp_mode = 200;
	this.cc_hankei = 12;
	this.km.initAll();
	this.km.mode = 100;
	this.drawOs2();
};

IdouGamen.prototype.drawOs2 = function() {
	this.gg.setBackcolor(new Color(0, 127, 0));
	this.gg.fill2();
	this.gg.os2_g.drawImage(this.gg.li[3], 0, 0, this.gg.ap);
	for (let i = 0; i <= rounddown(this.gg.di.height / 32) - 2; i++) {
		for (let j = 0; j <= rounddown(this.gg.di.width / 32) - 2; j++) {
			const tmp = this.map_bg[j][i];
			if (tmp == 221) {
				// 縦の道を連結する
				this.gg.drawPT2((j << 5) + 16, (i << 5) + 24 - 16, 221);
				this.gg.drawPT2((j << 5) + 16, (i << 5) + 24 + 16, 221);
			} else if (tmp == 222) {
				// 横の道を連結する
				this.gg.drawPT2((j << 5) + 16 - 16, (i << 5) + 24, 222);
				this.gg.drawPT2((j << 5) + 16 + 16, (i << 5) + 24, 222);
			}
		}
	}
	for (let i = 0; i <= rounddown(this.gg.di.height / 32) - 2; i++) {
		for (let j = 0; j <= rounddown(this.gg.di.width / 32) - 2; j++) {
			const tmp = this.map_bg[j][i];
			if (tmp != 61 && tmp != 62 && tmp != 256) {
				if ((tmp >= 216 && tmp <= 219) || (tmp >= 206 && tmp <= 209)) {
					this.gg.drawPT2((j << 5) + 16, (i << 5) + 24 - 7, tmp);
				} else if (tmp >= 212 && tmp <= 215) {
					// 扉の左右に横の道を連結する
					this.gg.drawPT2((j << 5) + 16 - 16, (i << 5) + 24, 222);
					this.gg.drawPT2((j << 5) + 16 + 16, (i << 5) + 24, 222);
					this.gg.drawPT2((j << 5) + 16, (i << 5) + 24 - 7, tmp);
				} else {
					this.gg.drawPT2((j << 5) + 16, (i << 5) + 24, tmp);
				}
			}
		}
	}
};

IdouGamen.prototype.drawMap = function() {
	this.gg.os_g.drawImage(this.gg.os2_img, 0, 0, this.gg.ap);
};

IdouGamen.prototype.getBGZ = function(paramInt1, paramInt2) {
	if (
		paramInt1 < 0 ||
		paramInt1 > this.gg.di.width - 32 - 1 ||
		paramInt2 < 0 ||
		paramInt2 > this.gg.di.height - 32 - 1
	) {
		return 0;
	}
	const x = paramInt1 >> 5;
	const y = paramInt2 >> 5;
	return this.map_bg[x][y];
};

IdouGamen.prototype.checkStage = function() {
	var j = -1;
	for (var i = 0; i <= 9; i++) {
		if (this.stage_c[i] != 100 || this.co_j.x != this.stage_x[i] || this.co_j.y != this.stage_y[i]) continue;
		j = i + 1;
		break;
	}
	return j;
};

IdouGamen.prototype.mainProgram = function() {
	if (this.gk.tr1_f) {
		if (this.mp.tr1_c < 2) {
			this.mp.tr1_c += 1;
		}
	} else {
		this.mp.tr1_c = 0;
	}
	if (this.mp_mode == 0) {
		if (this.km.mode == 100) {
			this.jMove();
		} else if (this.km.mode == 200) {
			// メッセージの人１
			if (this.km.cancel_c == 1) {
				this.km.off(3);
				this.km.off(4);
				this.km.mode = 100;
			} else if (this.km.kettei_c == 1) {
				this.km.init1(3);
				this.km.setMessage(3, this.mp.mes1_name);
				this.mp.addSerifu(3, 2, 3);
				this.km.activeSerifu(
					3,
					rounddown((this.gg.di.width - 272) / 2),
					rounddown(this.gg.di.height / 2),
					272,
					Color.cyan
				);
				this.km.mode = 210;
			}
		} else if (this.km.mode == 210) {
			if (this.km.cancel_c == 1 || this.km.kettei_c == 1) {
				this.km.off(3);
				this.km.off(4);
				this.km.mode = 100;
			}
		} else if (this.km.mode == 300) {
			// メッセージの人２
			if (this.km.cancel_c == 1) {
				this.km.off(3);
				this.km.off(4);
				this.km.mode = 100;
			} else if (this.km.kettei_c == 1) {
				this.km.init1(3);
				this.km.setMessage(3, this.mp.mes2_name);
				this.mp.addSerifu(3, 4, 3);
				this.km.activeSerifu(
					3,
					rounddown((this.gg.di.width - 272) / 2),
					rounddown(this.gg.di.height / 2),
					272,
					Color.cyan
				);
				this.km.mode = 210;
			}
		} else if (this.km.mode == 400) {
			// 店
			if (this.km.cancel_c == 1) {
				this.km.off(3);
				this.km.off(4);
				this.km.mode = 100;
			} else if (this.km.kettei_c == 1) {
				this.km.off(3);
				this.km.list_kazu = 0;
				this.km.init1(6);
				this.km.setMessage(6, this.tdb.getValue("shop_serifu1"));
				for (var i = 0; i <= 8; i++) {
					if (this.mp.shop_item_teika[i] > 0) {
						this.km.addItem2(6, this.mp.shop_item_name[i], this.mp.shop_item_teika[i]);
						this.km.list_IDlist[this.km.list_kazu] = i;
						this.km.list_kazu += 1;
					}
				}
				if (this.km.list_kazu >= 1) {
					this.km.activeKaimono(
						6,
						rounddown((this.gg.di.width - 272) / 2) + 176,
						rounddown(this.gg.di.height / 2) - 84,
						184
					);
					this.km.mode = 410;
				} else {
					this.km.init1(6);
					this.km.init1(3);
					this.km.setMessage(3, "Error");
					this.km.addItem(3, "Please set any item on shop menu.");
					this.km.activeSerifu(
						3,
						rounddown((this.gg.di.width - 272) / 2),
						rounddown(this.gg.di.height / 2),
						216,
						Color.red
					);
					this.km.mode = 210;
				}
			}
		} else if (this.km.mode == 410) {
			if (this.km.cancel_c == 1) {
				this.km.off(4);
				this.km.off(6);
				this.km.mode = 100;
			} else if (this.km.kettei_c == 1) {
				this.km.list_s = this.km.list_IDlist[this.km.selectedIndex[6]];
				this.km.init1(7);
				this.km.setMessage(7, this.mp.shop_item_name[this.km.list_s] + this.tdb.getValue("shop_serifu2"));
				this.km.addItem(7, this.tdb.getValue("shop_serifu3"));
				this.km.addItem(7, this.tdb.getValue("shop_serifu4"));
				this.km.activeSerifutuki(
					7,
					rounddown((this.gg.di.width - 272) / 2) - 72,
					rounddown(this.gg.di.height / 2),
					236,
					this.mp.shop_name
				);
				this.km.mode = 420;
			}
		} else if (this.km.mode == 420) {
			if (this.km.cancel_c == 1) {
				this.km.offActivewindow(7, 6);
				this.km.mode = 410;
			} else if (this.km.kettei_c == 1) {
				if (this.km.selectedIndex[7] == 0) {
					if (this.mp.score >= this.mp.shop_item_teika[this.km.list_s]) {
						this.km.init1(3);
						this.km.addItem(3, this.mp.shop_item_name[this.km.list_s] + this.tdb.getValue("shop_serifu5"));
						this.km.activeIchigyou(
							3,
							rounddown((this.gg.di.width - 272) / 2) - 72,
							rounddown(this.gg.di.height / 2) + 80,
							236
						);
						this.mp.score -= this.mp.shop_item_teika[this.km.list_s];
						this.shop_kattaitem = this.km.list_s;
						if (this.shop_kattaitem == 7) {
							this.mp.j_left += 1;
						}
						this.km.mode = 430;
					} else {
						this.km.init1(3);
						this.km.addItem(3, this.tdb.getValue("shop_serifu6"));
						this.km.activeIchigyou(
							3,
							rounddown((this.gg.di.width - 272) / 2) - 72,
							rounddown(this.gg.di.height / 2) + 80,
							236
						);
						this.km.mode = 430;
					}
				} else {
					this.km.off(4);
					this.km.off(6);
					this.km.off(7);
					this.km.mode = 100;
				}
			}
		} else if (this.km.mode == 430) {
			if (this.km.cancel_c == 1 || this.km.kettei_c == 1) {
				this.km.off(3);
				this.km.off(4);
				this.km.off(6);
				this.km.off(7);
				this.km.mode = 100;
			}
		} else if (this.km.mode == 500) {
			// 説明する人
			if (this.km.cancel_c == 1) {
				this.km.off(4);
				this.km.off(3);
				this.km.mode = 100;
			} else if (this.km.kettei_c == 1) {
				this.km.off(3);
				this.km.init1(2);
				this.km.setMessage(2, this.tdb.getValue("setumei_menu1"));
				this.km.addItem(2, this.tdb.getValue("setumei_menu2"));
				this.km.addItem(2, this.tdb.getValue("setumei_menu3"));
				this.km.addItem(2, this.tdb.getValue("setumei_menu4"));
				this.km.activeSerifutuki(
					2,
					rounddown((this.gg.di.width - 272) / 2),
					rounddown(this.gg.di.height / 2),
					224,
					this.mp.setumei_name
				);
				this.km.mode = 510;
			}
		} else if (this.km.mode == 510) {
			if (this.km.cancel_c == 1) {
				this.km.off(2);
				this.km.off(4);
				this.km.mode = 100;
			} else if (this.km.kettei_c == 1) {
				this.km.init1(3);
				this.km.setMessage(3, this.mp.setumei_name);
				if (this.km.selectedIndex[2] == 1) {
					this.mp.addSerifu(3, 11, 3);
				} else if (this.km.selectedIndex[2] == 2) {
					this.mp.addSerifu(3, 12, 3);
				} else {
					this.mp.addSerifu(3, 10, 3);
				}
				this.km.activeSerifu(
					3,
					rounddown((this.gg.di.width - 272) / 2) + 80,
					rounddown(this.gg.di.height / 2) + 31,
					272,
					Color.cyan
				);
				this.km.mode = 520;
			}
		} else if (this.km.mode == 520) {
			if (this.km.cancel_c == 1) {
				this.km.offActivewindow(3, 2);
				this.km.mode = 510;
			} else if (this.km.kettei_c == 1) {
				this.km.off(2);
				this.km.off(3);
				this.km.off(4);
				this.km.mode = 100;
			}
		}
		this.km.move();
	}
	if (this.co_j.pt == 1000) {
		// 停止中　縦に-6ピクセルずらす
		this.gg.drawPT(this.co_j.x + 16, this.co_j.y + 24 - 12 - 6, 100, this.co_j.muki);
	} else if (this.co_j.pt == 1010) {
		// 停止中　縦に5ピクセルずらす
		this.gg.drawPT(this.co_j.x + 16, this.co_j.y + 24 - 12 + 5, 100, this.co_j.muki);
	} else if (this.co_j.pt >= 202 && this.co_j.pt <= 205) {
		// 上下に移動している
		this.gg.drawPT(this.co_j.x + 16, this.co_j.y + 24 - 12, this.co_j.pt, 0);
	} else {
		// 左右に移動している
		this.gg.drawPT(this.co_j.x + 16, this.co_j.y + 24 - 12, this.co_j.pt, this.co_j.muki);
	}
	this.km.drawMenus();
	if (this.mp_mode == 100) {
		this.circleCLS(this.cc_hankei);
		this.cc_hankei -= 12;
		if (this.cc_hankei < 0) {
			this.cc_hankei = 0;
			this.mp_mode = 110;
		}
	} else if (this.mp_mode == 110) {
		this.circleCLS(this.cc_hankei);
	} else if (this.mp_mode == 200) {
		this.circleCLS(this.cc_hankei);
		this.cc_hankei += 12;
		if (this.cc_hankei > this.cc_hankei_max) {
			if (this.stage_kcID >= 1) {
				this.mp_mode = 300;
				this.cc_hankei = 0;
				var j = this.stage_y[this.stage_kcID - 1] >> 5;
				this.map_bg[this.stage_x[this.stage_kcID - 1] >> 5][j] = 227;
				if (this.door_koID >= 1) {
					this.map_bg[this.ie_x[this.door_koID - 1] >> 5][this.ie_y[this.door_koID - 1] >> 5] = 222;
				}
				if (this.door_score_open == 1) {
					this.map_bg[this.ie_x[9] >> 5][this.ie_y[9] >> 5] = 222;
				}
				this.drawOs2();
			} else {
				this.mp_mode = 0;
				if (this.door_score_open == 1) {
					this.mp_mode = 400;
					this.cc_hankei = 0;
					this.map_bg[this.ie_x[9] >> 5][this.ie_y[9] >> 5] = 222;
					this.drawOs2();
				}
			}
		}
	} else if (this.mp_mode == 300) {
		this.cc_hankei += 1;
		var k;
		if (this.cc_hankei <= 3) k = 0;
		else if (this.cc_hankei <= 6) k = 1;
		else if (this.cc_hankei <= 9) k = 0;
		else if (this.cc_hankei <= 12) k = 1;
		else if (this.cc_hankei <= 15) k = 0;
		else if (this.cc_hankei <= 18) k = 1;
		else if (this.cc_hankei <= 21) k = 0;
		else if (this.cc_hankei <= 24) k = 1;
		else if (this.cc_hankei <= 26) k = 0;
		else {
			k = 0;
			this.mp_mode = 0;
		}
		if (k > 0) {
			this.gg.drawPT(
				this.stage_x[this.stage_kcID - 1] + 16,
				this.stage_y[this.stage_kcID - 1] + 24,
				222 + this.stage_kcID,
				0
			);
		}
		if (k > 0 && this.door_koID >= 1) {
			this.gg.drawPT(
				this.ie_x[this.door_koID - 1] + 16,
				this.ie_y[this.door_koID - 1] + 24 - 7,
				212 + this.door_koID,
				0
			);
		}
		if (k > 0 && this.door_score_open == 1) {
			this.gg.drawPT(this.ie_x[9] + 16, this.ie_y[9] + 24 - 7, 212, 0);
		}
	} else if (this.mp_mode == 400) {
		this.cc_hankei += 1;
		var l;
		if (this.cc_hankei <= 3) l = 0;
		else if (this.cc_hankei <= 6) l = 1;
		else if (this.cc_hankei <= 9) l = 0;
		else if (this.cc_hankei <= 12) l = 1;
		else if (this.cc_hankei <= 15) l = 0;
		else if (this.cc_hankei <= 18) l = 1;
		else if (this.cc_hankei <= 21) l = 0;
		else if (this.cc_hankei <= 24) l = 1;
		else if (this.cc_hankei <= 26) l = 0;
		else {
			l = 0;
			this.mp_mode = 0;
		}
		if (l > 0) {
			this.gg.drawPT(this.ie_x[9] + 16, this.ie_y[9] + 24 - 7, 212, 0);
		}
	}
};

IdouGamen.prototype.jMove = function() {
	let cx = this.co_j.x;
	let cy = this.co_j.y;
	this.co_j.pt = 100;
	if (this.co_j.vx == 0 && this.co_j.vy == 0) {
		// 停止中
		this.co_j.ac += 1;
		if (this.co_j.ac > 7) {
			this.co_j.ac = 0;
		}
		if (this.co_j.ac > 3) {
			this.co_j.pt = 1000;
			const bgz = this.getBGZ(cx, cy);
			if ((bgz >= 216 && bgz <= 219) || (bgz >= 206 && bgz <= 209)) {
				this.co_j.pt = 1010;
			}
		}
		if (this.mp.tr1_c == 1) {
			if (this.checkStage() >= 1) {
				this.mp_mode = 100;
				this.cc_hankei = this.cc_hankei_max;
				this.co_j.ac = 0;
				this.dokan_khID = 0;
				this.co_j.pt = 100;
				this.mp.gs.play(25);
			} else if (this.getBGZ(cx, cy) >= 206 && this.getBGZ(cx, cy) <= 209) {
				if (this.mp.dokan_mode == 2) {
					// ワープ土管
					let flag = false;
					for (var i = 0; i <= rounddown(this.gg.di.height / 32) - 2; i++) {
						for (var j = 0; j <= rounddown(this.gg.di.width / 32) - 2; j++) {
							if (j << 5 == cx && i << 5 == cy) continue;
							if (this.map_bg[j][i] != this.getBGZ(cx, cy)) continue;
							cx = j << 5;
							cy = i << 5;
							this.co_j.ac = 0;
							this.co_j.pt = 1010;
							flag = true;
							break;
						}
						if (flag) {
							break;
						}
					}
				} else {
					// リンク土管
					this.mp_mode = 100;
					this.cc_hankei = this.cc_hankei_max;
					this.co_j.ac = 0;
					this.dokan_khID = this.getBGZ(cx, cy) - 205;
					this.co_j.pt = 1010;
					this.mp.gs.play(25);
				}
			} else if (this.getBGZ(cx, cy) == 216) {
				// メッセージの人１
				this.km.init1(4);
				this.km.onKao(
					4,
					rounddown((this.gg.di.width - 272) / 2),
					rounddown(this.gg.di.height / 2) - 108,
					272,
					230
				);
				this.km.init1(3);
				this.km.setMessage(3, this.mp.mes1_name);
				this.mp.addSerifu(3, 1, 3);
				this.km.activeSerifu(
					3,
					rounddown((this.gg.di.width - 272) / 2),
					rounddown(this.gg.di.height / 2),
					272,
					Color.cyan
				);
				this.km.mode = 200;
				this.co_j.pt = 1010;
				this.co_j.ac = 0;
			} else if (this.getBGZ(cx, cy) == 217) {
				// メッセージの人２
				this.km.init1(4);
				this.km.onKao(
					4,
					rounddown((this.gg.di.width - 272) / 2),
					rounddown(this.gg.di.height / 2) - 108,
					272,
					232
				);
				this.km.init1(3);
				this.km.setMessage(3, this.mp.mes2_name);
				this.mp.addSerifu(3, 3, 3);
				this.km.activeSerifu(
					3,
					rounddown((this.gg.di.width - 272) / 2),
					rounddown(this.gg.di.height / 2),
					272,
					Color.cyan
				);
				this.km.mode = 300;
				this.co_j.pt = 1010;
				this.co_j.ac = 0;
			} else if (this.getBGZ(cx, cy) == 218) {
				// 店
				this.km.init1(4);
				this.km.onKao(
					4,
					rounddown((this.gg.di.width - 272) / 2),
					rounddown(this.gg.di.height / 2) - 108,
					216,
					234
				);
				if (this.shop_kattaitem < 0) {
					this.km.init1(3);
					this.km.setMessage(3, this.mp.shop_name);
					this.mp.addSerifu(3, 5, 3);
					this.km.activeSerifu(
						3,
						rounddown((this.gg.di.width - 272) / 2),
						rounddown(this.gg.di.height / 2),
						216,
						Color.cyan
					);
					this.km.mode = 400;
				} else {
					this.km.init1(3);
					this.km.setMessage(3, this.mp.shop_name);
					this.mp.addSerifu(3, 8, 3);
					this.km.activeSerifu(
						3,
						rounddown((this.gg.di.width - 272) / 2),
						rounddown(this.gg.di.height / 2),
						216,
						Color.cyan
					);
					this.km.mode = 210;
				}
				this.co_j.pt = 1010;
				this.co_j.ac = 0;
			} else if (this.getBGZ(cx, cy) == 219) {
				// 説明する人
				this.km.init1(4);
				this.km.onKao(
					4,
					rounddown((this.gg.di.width - 272) / 2),
					rounddown(this.gg.di.height / 2) - 108,
					272,
					236
				);
				this.km.init1(3);
				this.km.setMessage(3, this.mp.setumei_name);
				this.mp.addSerifu(3, 9, 3);
				this.km.activeSerifu(
					3,
					rounddown((this.gg.di.width - 272) / 2),
					rounddown(this.gg.di.height / 2),
					272,
					Color.cyan
				);
				this.km.mode = 500;
				this.co_j.pt = 1010;
				this.co_j.ac = 0;
			}
		} else if (this.gk.up_f) {
			if (this.getBGZ(cx, cy - 32) == 221) {
				this.co_j.vy = -4;
				this.co_j.ac = -1;
			}
		} else if (this.gk.down_f) {
			if (this.getBGZ(cx, cy + 32) == 221) {
				this.co_j.vy = 4;
				this.co_j.ac = -1;
			}
		} else if (this.gk.left_f) {
			this.co_j.muki = 0;
			if (this.getBGZ(cx - 32, cy) == 222) {
				this.co_j.vx = -4;
				this.co_j.ac = -1;
			}
			if (this.getBGZ(cx + 32, cy) >= 212 && this.getBGZ(cx + 32, cy) <= 215) {
				this.co_j.vx = -4;
				this.co_j.ac = -1;
			}
		} else if (this.gk.right_f) {
			this.co_j.muki = 1;
			if (this.getBGZ(cx + 32, cy) == 222) {
				this.co_j.vx = 4;
				this.co_j.ac = -1;
			}
			if (this.getBGZ(cx - 32, cy) >= 212 && this.getBGZ(cx - 32, cy) <= 215) {
				this.co_j.vx = 4;
				this.co_j.ac = -1;
			}
		}
	}
	if (this.co_j.vx != 0 || this.co_j.vy != 0) {
		// 動いている時
		this.co_j.ac += 1;
		if (this.co_j.ac > 3) {
			this.co_j.ac = 0;
		}
		cx += this.co_j.vx;
		cy += this.co_j.vy;
		if (this.co_j.vx != 0) {
			// 横に移動
			if (this.co_j.ac <= 1) {
				this.co_j.pt = 103;
			} else {
				this.co_j.pt = 104;
			}
		} else if (this.co_j.vy >= 0) {
			// 下に移動
			if (this.co_j.ac <= 1) {
				this.co_j.pt = 202;
			} else {
				this.co_j.pt = 203;
			}
		} else if (this.co_j.ac <= 1) {
			// 上に移動
			this.co_j.pt = 204;
		} else {
			this.co_j.pt = 205;
		}
		if (cx % 32 == 0 && cy % 32 == 0) {
			let bgz = this.getBGZ(cx, cy);
			if (bgz == 220 || (bgz >= 223 && bgz <= 227) || (bgz >= 216 && bgz <= 219) || (bgz >= 206 && bgz <= 209)) {
				// 停止できるオブジェクトで停止する
				this.co_j.vx = 0;
				this.co_j.vy = 0;
				this.co_j.ac = 0;
			}
			bgz = 0;
			if (this.co_j.vx > 0) {
				bgz = this.getBGZ(cx + 32, cy);
			} else if (this.co_j.vx < 0) {
				bgz = this.getBGZ(cx - 32, cy);
			}
			if (bgz >= 212 && bgz <= 215) {
				// 扉がある場合停止する
				this.co_j.vx = 0;
				this.co_j.vy = 0;
				this.co_j.pt = 100;
				this.co_j.ac = 0;
			}
		}

		// 以下画面端で停止する
		if (cx <= -32) {
			cx = -32;
			this.co_j.vx = 0;
			this.co_j.vy = 0;
			this.co_j.ac = 0;
		} else if (cx >= this.gg.di.width - 32) {
			cx = this.gg.di.width - 32;
			this.co_j.vx = 0;
			this.co_j.vy = 0;
			this.co_j.ac = 0;
		}
		if (cy <= -32) {
			cy = -32;
			this.co_j.vx = 0;
			this.co_j.vy = 0;
			this.co_j.ac = 0;
		} else if (cy >= this.gg.di.height - 32) {
			cy = this.gg.di.height - 32;
			this.co_j.vx = 0;
			this.co_j.vy = 0;
			this.co_j.ac = 0;
		}
	}
	this.co_j.x = cx;
	this.co_j.y = cy;
};

IdouGamen.prototype.circleCLS = function(paramInt) {
	for (var i = 0; i <= 12; i++) {
		var d1 = Math.sin(i * 0.2617992);
		this.cc_p1_y[i] = rounddown(this.gg.di.height / 2) + Math.floor(d1 * paramInt);
		var d2 = Math.cos(i * 0.2617992);
		this.cc_p1_x[i] = rounddown(this.gg.di.width / 2) + Math.floor(d2 * paramInt);
		this.cc_p2_y[i] = rounddown(this.gg.di.height / 2) - Math.floor(d1 * paramInt);
		this.cc_p2_x[i] = rounddown(this.gg.di.width / 2) - Math.floor(d2 * paramInt);
	}
	this.gg.os_g.setColor(Color.black);
	this.gg.os_g.fillPolygon(this.cc_p1_x, this.cc_p1_y, 17);
	this.gg.os_g.fillPolygon(this.cc_p2_x, this.cc_p2_y, 17);
};

IdouGamen.prototype.squareCLS = function(paramInt1, paramInt2) {
	var d = 0.0174532925199433;
	this.cc_p1_x[0] = Math.floor(Math.cos((this.cc_kakudo + 0) * d) * paramInt1) + rounddown(this.gg.di.width / 2);
	this.cc_p1_y[0] = Math.floor(Math.sin((this.cc_kakudo + 0) * d) * paramInt1) + rounddown(this.gg.di.height / 2);
	this.cc_p1_x[1] = Math.floor(Math.cos((this.cc_kakudo + 90) * d) * paramInt1) + rounddown(this.gg.di.width / 2);
	this.cc_p1_y[1] = Math.floor(Math.sin((this.cc_kakudo + 90) * d) * paramInt1) + rounddown(this.gg.di.height / 2);
	this.cc_p1_x[2] = Math.floor(Math.cos((this.cc_kakudo + 180) * d) * paramInt1) + rounddown(this.gg.di.width / 2);
	this.cc_p1_y[2] = Math.floor(Math.sin((this.cc_kakudo + 180) * d) * paramInt1) + rounddown(this.gg.di.height / 2);
	this.cc_p1_x[3] = Math.floor(Math.cos((this.cc_kakudo + 180) * d) * 500) + rounddown(this.gg.di.width / 2);
	this.cc_p1_y[3] = Math.floor(Math.sin((this.cc_kakudo + 180) * d) * 500) + rounddown(this.gg.di.height / 2);
	this.cc_p1_x[4] = Math.floor(Math.cos((this.cc_kakudo + 135) * d) * 700) + rounddown(this.gg.di.width / 2);
	this.cc_p1_y[4] = Math.floor(Math.sin((this.cc_kakudo + 135) * d) * 700) + rounddown(this.gg.di.height / 2);
	this.cc_p1_x[5] = Math.floor(Math.cos((this.cc_kakudo + 45) * d) * 700) + rounddown(this.gg.di.width / 2);
	this.cc_p1_y[5] = Math.floor(Math.sin((this.cc_kakudo + 45) * d) * 700) + rounddown(this.gg.di.height / 2);
	this.cc_p1_x[6] = Math.floor(Math.cos((this.cc_kakudo + 0) * d) * 500) + rounddown(this.gg.di.width / 2);
	this.cc_p1_y[6] = Math.floor(Math.sin((this.cc_kakudo + 0) * d) * 500) + rounddown(this.gg.di.height / 2);
	this.cc_p2_x[0] = Math.floor(Math.cos((this.cc_kakudo + 180) * d) * paramInt1) + rounddown(this.gg.di.width / 2);
	this.cc_p2_y[0] = Math.floor(Math.sin((this.cc_kakudo + 180) * d) * paramInt1) + rounddown(this.gg.di.height / 2);
	this.cc_p2_x[1] = Math.floor(Math.cos((this.cc_kakudo + 270) * d) * paramInt1) + rounddown(this.gg.di.width / 2);
	this.cc_p2_y[1] = Math.floor(Math.sin((this.cc_kakudo + 270) * d) * paramInt1) + rounddown(this.gg.di.height / 2);
	this.cc_p2_x[2] = Math.floor(Math.cos((this.cc_kakudo + 360) * d) * paramInt1) + rounddown(this.gg.di.width / 2);
	this.cc_p2_y[2] = Math.floor(Math.sin((this.cc_kakudo + 360) * d) * paramInt1) + rounddown(this.gg.di.height / 2);
	this.cc_p2_x[3] = Math.floor(Math.cos((this.cc_kakudo + 360) * d) * 500) + rounddown(this.gg.di.width / 2);
	this.cc_p2_y[3] = Math.floor(Math.sin((this.cc_kakudo + 360) * d) * 500) + rounddown(this.gg.di.height / 2);
	this.cc_p2_x[4] = Math.floor(Math.cos((this.cc_kakudo + 315) * d) * 700) + rounddown(this.gg.di.width / 2);
	this.cc_p2_y[4] = Math.floor(Math.sin((this.cc_kakudo + 315) * d) * 700) + rounddown(this.gg.di.height / 2);
	this.cc_p2_x[5] = Math.floor(Math.cos((this.cc_kakudo + 225) * d) * 700) + rounddown(this.gg.di.width / 2);
	this.cc_p2_y[5] = Math.floor(Math.sin((this.cc_kakudo + 225) * d) * 700) + rounddown(this.gg.di.height / 2);
	this.cc_p2_x[6] = Math.floor(Math.cos((this.cc_kakudo + 180) * d) * 500) + rounddown(this.gg.di.width / 2);
	this.cc_p2_y[6] = Math.floor(Math.sin((this.cc_kakudo + 180) * d) * 500) + rounddown(this.gg.di.height / 2);
	this.gg.os_g.setColor(Color.black);
	this.gg.os_g.fillPolygon(this.cc_p1_x, this.cc_p1_y, 7);
	this.gg.os_g.fillPolygon(this.cc_p2_x, this.cc_p2_y, 7);
};

export { IdouGamen };
