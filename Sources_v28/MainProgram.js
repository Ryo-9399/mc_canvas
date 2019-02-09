import { CharacterObject } from "./CharacterObject";
import { Boss } from "./CharacterObject/Boss";
import { createNDimensionArray, rounddown } from "./GlobalFunctions";
import { IdouGamen } from "./IdouGamen";
import { Color, Font } from "./ImageBuff";
import { KeyboardMenu } from "./KeyboardMenu";
import { MapSystem } from "./MapSystem";

function MainProgram(gamegraphics, gamemouse, gamekey) {
	this.ran_seed = undefined;
	this.ml_mode = 0;
	this.ml_mode_c = 0;
	this.score = 0;
	this.highscore = 0;
	this.score_1up_1 = 0;
	this.score_1up_2 = 0;
	this.score_1up_1_para = 0;
	this.score_1up_2_para = 0;
	this.score_v = true;
	this.stage = 1;
	this.stage_cc = 0;
	this.stage_max = 1;
	this.stage_kaishi = 1;
	this.g_c1 = 0;
	this.g_c2 = 0;
	this.g_c3 = 0;
	this.g_ac = 0;
	this.g_ac2 = 0;
	this.tr1_c = 0;
	this.tr2_c = 0;
	this.left_dcc = 0;
	this.right_dcc = 0;
	this.co_t = new Array(130);
	this.co_m = new Array(24);
	this.co_a = new Array(32);
	this.co_h = new Array(64);
	this.co_jm = new Array(2);
	this.vo_x = createNDimensionArray(32, 4);
	this.vo_y = createNDimensionArray(32, 4);
	this.j_zan_x = new Array(6);
	this.j_zan_y = new Array(6);
	this.j_zan_pt = new Array(6);
	this.j_zan_pth = new Array(6);
	this.vo_pa_x = new Array(6);
	this.vo_pa_y = new Array(6);
	this.stage_1up_f = new Array(3);
	this.shop_item_name = new Array(16);
	this.shop_item_teika = new Array(16);
	this.door_score = 10;
	this.gg = gamegraphics;
	this.gm = gamemouse;
	this.gk = gamekey;
	this.maps = new MapSystem(200, 100, this.gg, this);
	this.km = new KeyboardMenu(this.gg, this.gk, "\u307E\u3055\u304A");
	this.co_j = new CharacterObject();
	for (var i = 0; i <= 129; i++) this.co_t[i] = new CharacterObject();

	for (var j = 0; j <= 23; j++) this.co_m[j] = new CharacterObject();

	for (var k = 0; k <= 31; k++) this.co_a[k] = new CharacterObject();

	for (var l = 0; l <= 63; l++) this.co_h[l] = new CharacterObject();

	for (var i1 = 0; i1 <= 1; i1++) this.co_jm[i1] = new CharacterObject();

	this.co_b = new Boss();
	var j1 = this.paraInt("stage_select");
	if (j1 == 2) {
		this.stage_select = 2;
		this.stage_max = 4;
	} else {
		this.stage_select = 1;
	}
	this.ig = new IdouGamen(this.gg, this.gk, this.km, this);
	this.ranInit();
	this.hi = this.gg.spt_img[0];
	this.hih = this.gg.spt_img;
	this.hg = this.gg.os_g;
	this.ap = this.gg.ap;
	this.init1();
}

MainProgram.prototype.start = function() {
	this.ml_mode = 50;
};

MainProgram.prototype.paraInt = function(s) {
	var s1 = this.gg.ap.getParameter(s);
	var i;
	i = parseInt(s1);
	if (isNaN(i)) i = -1;
	return i;
};

MainProgram.prototype.addHighscoreEvent = function(highscoreeventhandler) {
	this.heh = highscoreeventhandler;
	return true;
};

MainProgram.prototype.sendHighscore = function() {
	var flag = false;
	if (Object.prototype.toString.call(this.heh) == "[object Function]") {
		var i = this.highscore;
		if (i < this.score) i = this.score;
		this.heh(i);
	}
};

MainProgram.prototype.moveGameCounter = function() {
	switch (this.g_c3) {
		case 0:
			this.g_c3 = 1;
			this.g_c1 = 1;
			this.g_c2 = 1;
			this.g_ac = 0;
			this.g_ac2 = 0;
			break;

		case 1:
			this.g_c3 = 2;
			this.g_c1 = 0;
			this.g_c2 = 2;
			this.g_ac = 1;
			this.g_ac2 = 1;
			break;

		case 2:
			this.g_c3 = 3;
			this.g_c1 = 1;
			this.g_c2 = 3;
			this.g_ac = 1;
			this.g_ac2 = 1;
			break;

		case 3:
			this.g_c3 = 4;
			this.g_c1 = 0;
			this.g_c2 = 0;
			this.g_ac = 0;
			this.g_ac2 = 2;
			break;

		case 4:
			this.g_c3 = 5;
			this.g_c1 = 1;
			this.g_c2 = 1;
			this.g_ac = 0;
			this.g_ac2 = 2;
			break;

		case 5:
			this.g_c3 = 6;
			this.g_c1 = 0;
			this.g_c2 = 2;
			this.g_ac = 1;
			this.g_ac2 = 3;
			break;

		case 6:
			this.g_c3 = 7;
			this.g_c1 = 1;
			this.g_c2 = 3;
			this.g_ac = 1;
			this.g_ac2 = 3;
			break;

		case 7:
			this.g_c3 = 0;
			this.g_c1 = 0;
			this.g_c2 = 0;
			this.g_ac = 0;
			this.g_ac2 = 0;
			break;
	}
};

MainProgram.prototype.ranInit = function() {
	//seedを初期化
	this.ran_seed = (Math.random() * 0x100000000) | 0;
};

MainProgram.prototype.ranInt = function(i) {
	//xor-shift 乱数(a=9, b=11, c=19)
	var ran_seed = this.ran_seed;
	ran_seed = (ran_seed ^ (ran_seed << 9)) >>> 0;
	ran_seed = (ran_seed ^ (ran_seed >>> 11)) >>> 0;
	this.ran_seed = ran_seed = (ran_seed ^ (ran_seed << 19)) >>> 0;
	// * 2.3283064365386963e-10 は /0x100000000の意味
	return (ran_seed * 2.3283064365386963e-10 * i) | 0;
};

/**
 * 画面上部のスコア・残り時間・HP・残機を描画します
 */
MainProgram.prototype.drawScore = function() {
	this.gg.os_g.setColor(this.gamecolor_score);
	this.gg.os_g.setFont(new Font("Dialog", 1, this.moji_size));

	// 描画座標
	const display_x = 40;
	const display_y = this.moji_size + 14;

	let str = "";
	if (this.score_v) {
		// 得点を表示する
		str += `${this.moji_score} ${this.score}    ${this.moji_highscore} ${
			this.highscore
		}`;
	}
	if (this.j_left_shoki > 0 || this.j_left > 0) {
		// 残機を表示
		str += `${this.moji_left}${this.j_left}`;
	}
	if (this.time_max > 0) {
		// 制限時間を表示
		const time_sec = Math.floor(this.time / 1000);
		str += `${this.moji_time}${time_sec}`;
	}
	this.gg.os_g.drawString(str, display_x, display_y);
};

/**
 * 画面上部にスコア・残機のみを描画します
 * TODO: 要調査:地図画面でのスコア表示に使われる？
 */
MainProgram.prototype.drawScore2 = function() {
	this.gg.os_g.setColor(this.gamecolor_score);
	this.gg.os_g.setFont(new Font("Dialog", 1, this.moji_size));

	// 描画座標
	const display_x = 40;
	const display_y = this.moji_size + 14;

	let str = "";
	if (this.score_v) {
		// 得点を表示する
		let str = `${this.moji_score} ${this.score}    ${this.moji_highscore} ${
			this.highscore
		}`;
	}
	if (this.j_left_shoki > 0 || this.j_left > 0) {
		// 残機を表示
		str += `${this.moji_left}${this.j_left}`;
	}
	this.gg.os_g.drawString(str, display_x, display_y);
};

/**
 * スコアを加算します。
 * 負の値を渡すとスコアが減ります。
 *
 * @param {number} score 加算するスコア
 */
MainProgram.prototype.addScore = function(score) {
	this.score += score;
	if (this.score_1up_1 > 0 && this.score >= this.score_1up_1) {
		this.j_left++;
		this.score_1up_1 = 0;
	}
	if (this.score_1up_2 > 0 && this.score >= this.score_1up_2) {
		this.j_left++;
		this.score_1up_2 = 0;
	}
};

/**
 * TODO: 加筆求む
 * @param {number} index 追加する場所(？) TODO: 要調査
 * @param {number} person_id セリフを言う人の番号
 * @param {number} max_row 1からmax_row行目までを表示する
 */
MainProgram.prototype.addSerifu = function(index, person_id, max_row) {
	for (let i = 1; i <= max_row; i++) {
		const message = this.gg.ap.getParameter("serifu" + person_id + "-" + i);
		// NOTE: issue #34
		if (parseInt(message, 10) != 0) this.km.addItem(index, message);
	}
};

MainProgram.prototype.mL100 = function() {
	this.moveGameCounter();
	this.aMove();
	if (this.co_j.c == 100) this.jM100();
	else this.jMove();
	if (this.sl_step > 0)
		if (this.sl_step == 10 || this.sl_step == 11) {
			this.ks_wx += this.sl_speed;
			if (this.ks_wx > this.maps.wx_max) this.ks_wx = this.maps.wx_max;
			this.maps.wx = this.ks_wx;
			this.maps.wy = this.ks_wy;
			if (this.co_j.c != 300 && this.co_j.c != 310)
				if (this.co_j.x < this.ks_wx - 16) {
					this.co_j.x = this.ks_wx - 16;
					if (this.co_j.vx < 0) this.co_j.vx = 0;
					if (
						(this.maps.getBGCode(this.co_j.x + 15, this.co_j.y) >=
							20 ||
							this.maps.getBGCode(
								this.co_j.x + 15,
								this.co_j.y + 31
							) >= 20) &&
						this.co_j.c >= 100 &&
						this.co_j.c < 200
					) {
						this.co_j.c = 210;
						this.co_j.y = this.maps.wy - 64;
						this.co_j.c1 = 0;
						this.j_jet_c = 0;
						this.j_v_c = 0;
					}
				} else if (this.co_j.x > this.ks_wx + 496) {
					this.co_j.x = this.ks_wx + 496;
					this.co_j.vx = 0;
					if (this.co_j.vx > 0) this.co_j.vx = 0;
				}
			if (this.sl_step == 11 && this.maps.wx >= this.sl_wx) {
				this.maps.wx = this.sl_wx;
				this.sl_wy = this.ks_wy;
				this.sl_step = 3;
			}
		} else if (this.sl_step == 1) {
			if (this.maps.wx >= this.sl_wx) {
				this.maps.wx = this.sl_wx;
				this.sl_step = 2;
			}
		} else if (this.sl_step == 2) {
			this.maps.wx = this.sl_wx;
			if (this.co_j.x < this.sl_wx - 16) {
				this.co_j.x = this.sl_wx - 16;
				this.co_j.vx = 0;
			} else if (this.co_j.x > this.sl_wx + 496) {
				this.co_j.x = this.sl_wx + 496;
				this.co_j.vx = 0;
			}
			if (this.maps.wy >= this.sl_wy) {
				this.maps.wy = this.sl_wy;
				this.sl_step = 3;
			}
		} else {
			this.maps.wx = this.sl_wx;
			this.maps.wy = this.sl_wy;
			if (this.co_j.x < this.sl_wx - 16) {
				this.co_j.x = this.sl_wx - 16;
				this.co_j.vx = 0;
			} else if (this.co_j.x > this.sl_wx + 496) {
				this.co_j.x = this.sl_wx + 496;
				this.co_j.vx = 0;
			}
		}
	if (this.jm_kazu > 0) this.jmMove();
	this.tMove();
	if (this.co_b.c > 0) this.bMove();
	if (this.m_kazu > 0) this.mMove();
	if (this.time_max > 0 && this.stage_cc <= 0) {
		this.time -= 70;
		if (this.time < 0) {
			this.time = 0;
			this.j_left--;
			if (this.j_left < 0) {
				this.j_left = 0;
				this.ml_mode = 300;
			} else {
				this.ml_mode = 90;
			}
		}
	}
	if (this.stage_cc > 0) {
		this.stage_cc++;
		if (this.stage_cc > 28)
			if (this.stage_select == 2) {
				if (this.stage >= 4) {
					this.ml_mode = 400;
				} else {
					if (this.time_max > 0)
						this.addScore(rounddown(this.time / 1000));
					this.ml_mode = 260;
				}
			} else if (this.stage >= this.stage_max) {
				this.ml_mode = 400;
			} else {
				this.stage++;
				if (this.time_max > 0)
					this.addScore(rounddown(this.time / 1000));
				this.ml_mode = 90;
			}
	}
	this.drawGamescreen();
	this.drawScore();
	if (this.j_jet_fuel > 0) {
		var s = this.moji_jet + " " + this.j_jet_fuel;
		if (this.j_gr_kazu > 0)
			if (this.j_gr_kazu == 1) s = s + "    " + this.moji_grenade;
			else s = s + "    " + this.moji_grenade + " " + this.j_gr_kazu;
		this.hg.drawString(s, 40, 287 + this.moji_size);
	} else if (this.j_gr_kazu > 0)
		if (this.j_gr_kazu == 1)
			this.hg.drawString(this.moji_grenade, 40, 287 + this.moji_size);
		else
			this.hg.drawString(
				this.moji_grenade + " " + this.j_gr_kazu,
				40,
				287 + this.moji_size
			);
	if (this.gk.key_code == 84) {
		this.gk.key_code = 0;
		this.ml_mode = 50;
	}
};

MainProgram.prototype.mainLoop = function() {
	switch (this.ml_mode) {
		default:
			break;

		case 50:
			this.gg.drawListImage(0, 0, 0);
			if (this.score > 0 || this.highscore > 0) this.drawScore();
			if (!this.gm.button_f && !this.gk.tr1_f) {
				this.ml_mode = 60;
				this.g_c1 = 0;
				this.sendHighscore();
			}
			break;

		case 60:
			if (this.g_c1 == 0) {
				if (this.gk.key_char == 0x76) this.g_c1 = 1;
			} else if (this.g_c1 == 1) {
				if (this.gk.key_char == 0x65) this.g_c1 = 2;
				else if (this.gk.key_char != 0x76) this.g_c1 = 0;
			} else if (this.g_c1 == 2)
				if (this.gk.key_char == 0x72) this.ml_mode = 1000;
				else if (this.gk.key_char != 0x65) this.g_c1 = 0;
			if (!this.gm.button_f && !this.gk.tr1_f) break;
			if (this.stage_select == 2) {
				this.init2();
				this.ig.worldInit();
				this.gg.os_g.setColor(Color.black);
				this.gg.os_g.fillRect(
					0,
					0,
					this.gg.di.width,
					this.gg.di.height
				);
				this.ml_mode = 200;
				break;
			}
			this.init2();
			this.init3();
			this.gg.drawListImage(0, 0, 0);
			if (this.score > 0 || this.highscore > 0) this.drawScore();
			if (this.j_left <= 0) this.ml_mode = 100;
			else this.ml_mode = 90;
			break;

		case 80:
			this.init2();
			this.init3();
			this.gg.drawListImage(0, 0, 0);
			if (this.score > 0 || this.highscore > 0) this.drawScore();
			if (this.j_left <= 0) this.ml_mode = 100;
			else this.ml_mode = 90;
			break;

		case 90:
			this.init3();
			this.gg.os_g.setColor(this.gamecolor_kaishi);
			this.gg.os_g.fillRect(0, 0, this.gg.di.width, this.gg.di.height);
			if (this.stage >= this.stage_max) {
				this.gg.drawPT(160, 144, 52, 0);
				this.gg.drawPT(192, 144, 53, 0);
				this.gg.drawPT(224, 144, 54, 0);
				this.gg.drawPT(256, 144, 55, 0);
				this.gg.drawPT(288, 144, 56, 0);
				this.gg.drawPT(320, 144, 57, 0);
			} else {
				this.gg.drawPT(192, 144, 70, 0);
				this.gg.drawPT(224, 144, 71, 0);
				this.gg.drawPT(256, 144, 72, 0);
				if (this.stage >= this.stage_max)
					this.gg.drawPT(288, 144, 75, 0);
				if (this.stage == 3) this.gg.drawPT(288, 144, 75, 0);
				else if (this.stage == 2) this.gg.drawPT(288, 144, 74, 0);
				else this.gg.drawPT(288, 144, 73, 0);
			}
			this.drawScore();
			this.ml_mode = 91;
			this.ml_mode_c = 0;
			break;

		case 91:
			this.ml_mode_c++;
			if (this.ml_mode_c > 35) this.ml_mode = 100;
			if (this.gk.key_code == 84) {
				this.gk.key_code = 0;
				this.ml_mode = 50;
			}
			break;

		case 95:
			this.stage = this.ig.checkStage();
			this.init3();
			switch (this.ig.shop_kattaitem) {
				case 7:
				default:
					break;

				case 0:
					this.j_gr_kazu = 3;
					break;

				case 1:
					this.j_jet_fuel = 80;
					break;

				case 2:
					this.j_drell_f = true;
					break;

				case 3:
					this.j_helm_f = true;
					break;

				case 4:
					this.j_tail_f = true;
					break;

				case 5:
					this.j_v_c = 150;
					this.j_v_kakudo = 0;
					break;

				case 6:
					this.j_fire_f = true;
					break;

				case 8:
					if (this.time_max > 0) this.time += 30000;
					break;
			}
			this.gg.os_g.setColor(Color.black);
			this.gg.os_g.fillRect(0, 0, this.gg.di.width, this.gg.di.height);
			this.drawScore();
			this.ml_mode = 96;
			this.ml_mode_c = 0;
			break;

		case 96:
			this.ml_mode_c++;
			if (this.ml_mode_c > 8) this.ml_mode = 100;
			if (this.gk.key_code == 84) {
				this.gk.key_code = 0;
				this.ml_mode = 50;
			}
			break;

		case 200:
			this.ig.drawMap();
			this.ig.mainProgram();
			this.time = 0;
			this.drawScore2();
			if (this.ig.mp_mode == 110)
				if (this.ig.dokan_khID >= 1) this.ml_mode = 230;
				else this.ml_mode = 95;
			if (this.gk.key_code == 84) {
				this.gk.key_code = 0;
				this.ml_mode = 50;
			}
			break;

		case 230:
			this.gg.os_g.setColor(Color.black);
			this.gg.os_g.fillRect(0, 0, this.gg.di.width, this.gg.di.height);
			this.drawScore2();
			this.ml_mode = 231;
			this.ml_mode_c = 0;
			break;

		case 231:
			this.ml_mode_c++;
			if (this.ml_mode_c == 5) {
				var s;
				if (this.ig.dokan_khID == 2)
					s = this.gg.ap.getParameter("url2");
				else if (this.ig.dokan_khID == 3)
					s = this.gg.ap.getParameter("url3");
				else if (this.ig.dokan_khID == 4)
					s = this.gg.ap.getParameter("url4");
				else s = this.gg.ap.getParameter("url1");
				location.href = s;
			} else if (this.ml_mode_c > 80) this.ml_mode = 50;
			if (this.gk.key_code == 84) {
				this.gk.key_code = 0;
				this.ml_mode = 50;
			}
			break;

		case 250:
			this.addScore(0);
			this.ig.worldInit2();
			this.ml_mode = 251;
			this.ml_mode_c = 0;
			this.gg.os_g.setColor(Color.black);
			this.gg.os_g.fillRect(0, 0, this.gg.di.width, this.gg.di.height);
			this.drawScore();
			break;

		case 251:
			this.ml_mode_c++;
			if (this.ml_mode_c > 8) this.ml_mode = 200;
			if (this.gk.key_code == 84) {
				this.gk.key_code = 0;
				this.ml_mode = 50;
			}
			break;

		case 260:
			this.addScore(0);
			this.ig.worldInit3();
			this.ml_mode = 261;
			this.ml_mode_c = 0;
			this.gg.os_g.setColor(Color.black);
			this.gg.os_g.fillRect(0, 0, this.gg.di.width, this.gg.di.height);
			this.drawScore();
			break;

		case 261:
			this.ml_mode_c++;
			if (this.ml_mode_c > 8) this.ml_mode = 200;
			if (this.gk.key_code == 84) {
				this.gk.key_code = 0;
				this.ml_mode = 50;
			}
			break;

		case 300:
			this.gg.setBackcolor(Color.black);
			this.gg.fill();
			this.gg.drawListImage(0, 0, 2);
			this.drawScore();
			this.sendHighscore();
			this.ml_mode = 310;
			this.ml_mode_c = 0;
			break;

		case 310:
			this.ml_mode_c++;
			if (this.ml_mode_c > 45) this.ml_mode = 50;
			if (this.gk.key_code == 84) {
				this.gk.key_code = 0;
				this.ml_mode = 50;
			}
			break;

		case 400:
			this.gg.drawListImage(0, 0, 1);
			if (this.time_max > 0) this.addScore(rounddown(this.time / 1000));
			this.drawScore();
			this.sendHighscore();
			this.ml_mode = 410;
			this.ml_mode_c = 0;
			break;

		case 410:
			this.ml_mode_c++;
			if (this.ml_mode_c > 120) this.ml_mode = 50;
			if (this.gk.key_code == 84) {
				this.gk.key_code = 0;
				this.ml_mode = 50;
			}
			break;

		case 500:
			this.gg.setBackcolor(Color.black);
			this.gg.fill();
			this.gg.drawListImage(0, 0, 0);
			if (this.score > 0 || this.highscore > 0) this.drawScore();
			this.ml_mode = 50;
			this.ml_mode = 50;
			break;

		case 1000:
			this.gg.setBackcolor(Color.black);
			this.gg.fill();
			this.hg.setFont(new Font("Dialog", 0, 46));
			this.hg.setColor(Color.white);
			this.hg.setFont(new Font("Dialog", 0, 20));
			this.hg.drawString("Title        MASAO CONSTRUCTION", 50, 50);
			this.hg.drawString("Version      2.8", 50, 80);
			this.hg.drawString("Language     Java2  SDK 1.3.1", 50, 110);
			this.hg.drawString("OS           WindowsXP", 50, 140);
			this.hg.drawString("Browser      InternetExplorer 6.0", 50, 170);
			this.hg.drawString("Programing   Fukuda Naoto", 50, 200);
			this.hg.drawString("Date         2003/6", 50, 230);
			this.ml_mode = 1010;
			this.ml_mode_c = 0;
			break;

		case 1010:
			this.ml_mode_c++;
			if (this.ml_mode_c > 40) this.ml_mode = 50;
			break;
	}
};

MainProgram.prototype.init1 = function() {
	this.time_max = this.paraInt("time_max");
	var k = this.paraInt("score_v");
	if (k == 2) this.score_v = false;
	else this.score_v = true;
	k = this.paraInt("backcolor_red");
	var l = this.paraInt("backcolor_green");
	var i1 = this.paraInt("backcolor_blue");
	if (k < 0) k = 0;
	else if (k > 255) k = 255;
	if (l < 0) l = 0;
	else if (l > 255) l = 255;
	if (i1 < 0) i1 = 0;
	else if (i1 > 255) i1 = 255;
	this.gamecolor_back = new Color(k, l, i1);
	k = this.paraInt("backcolor_red_s");
	l = this.paraInt("backcolor_green_s");
	i1 = this.paraInt("backcolor_blue_s");
	if (k < 0) k = 0;
	else if (k > 255) k = 255;
	if (l < 0) l = 0;
	else if (l > 255) l = 255;
	if (i1 < 0) i1 = 0;
	else if (i1 > 255) i1 = 255;
	this.gamecolor_back_s = new Color(k, l, i1);
	k = this.paraInt("backcolor_red_t");
	l = this.paraInt("backcolor_green_t");
	i1 = this.paraInt("backcolor_blue_t");
	if (k < 0) k = 0;
	else if (k > 255) k = 255;
	if (l < 0) l = 0;
	else if (l > 255) l = 255;
	if (i1 < 0) i1 = 0;
	else if (i1 > 255) i1 = 255;
	this.gamecolor_back_t = new Color(k, l, i1);
	k = this.paraInt("backcolor_red_f");
	l = this.paraInt("backcolor_green_f");
	i1 = this.paraInt("backcolor_blue_f");
	if (k < 0) k = 0;
	else if (k > 255) k = 255;
	if (l < 0) l = 0;
	else if (l > 255) l = 255;
	if (i1 < 0) i1 = 0;
	else if (i1 > 255) i1 = 255;
	this.gamecolor_back_f = new Color(k, l, i1);
	k = this.paraInt("kaishi_red");
	l = this.paraInt("kaishi_green");
	i1 = this.paraInt("kaishi_blue");
	if (k < 0) k = 0;
	else if (k > 255) k = 255;
	if (l < 0) l = 0;
	else if (l > 255) l = 255;
	if (i1 < 0) i1 = 0;
	else if (i1 > 255) i1 = 255;
	this.gamecolor_kaishi = new Color(k, l, i1);
	k = this.paraInt("scorecolor_red");
	l = this.paraInt("scorecolor_green");
	i1 = this.paraInt("scorecolor_blue");
	if (k < 0) k = 0;
	else if (k > 255) k = 255;
	if (l < 0) l = 0;
	else if (l > 255) l = 255;
	if (i1 < 0) i1 = 0;
	else if (i1 > 255) i1 = 255;
	this.gamecolor_score = new Color(k, l, i1);
	k = this.paraInt("grenade_red1");
	l = this.paraInt("grenade_green1");
	i1 = this.paraInt("grenade_blue1");
	if (k < 0) k = 0;
	else if (k > 255) k = 255;
	if (l < 0) l = 0;
	else if (l > 255) l = 255;
	if (i1 < 0) i1 = 0;
	else if (i1 > 255) i1 = 255;
	this.gamecolor_grenade1 = new Color(k, l, i1);
	k = this.paraInt("grenade_red2");
	l = this.paraInt("grenade_green2");
	i1 = this.paraInt("grenade_blue2");
	if (k < 0) k = 0;
	else if (k > 255) k = 255;
	if (l < 0) l = 0;
	else if (l > 255) l = 255;
	if (i1 < 0) i1 = 0;
	else if (i1 > 255) i1 = 255;
	this.gamecolor_grenade2 = new Color(k, l, i1);
	k = this.paraInt("firebar_red1");
	l = this.paraInt("firebar_green1");
	i1 = this.paraInt("firebar_blue1");
	if (k < 0) k = 0;
	else if (k > 255) k = 255;
	if (l < 0) l = 0;
	else if (l > 255) l = 255;
	if (i1 < 0) i1 = 0;
	else if (i1 > 255) i1 = 255;
	this.gamecolor_firebar1 = new Color(k, l, i1);
	k = this.paraInt("firebar_red2");
	l = this.paraInt("firebar_green2");
	i1 = this.paraInt("firebar_blue2");
	if (k < 0) k = 0;
	else if (k > 255) k = 255;
	if (l < 0) l = 0;
	else if (l > 255) l = 255;
	if (i1 < 0) i1 = 0;
	else if (i1 > 255) i1 = 255;
	this.gamecolor_firebar2 = new Color(k, l, i1);
	k = this.paraInt("mizunohadou_red");
	l = this.paraInt("mizunohadou_green");
	i1 = this.paraInt("mizunohadou_blue");
	if (k < 0) k = 0;
	else if (k > 255) k = 255;
	if (l < 0) l = 0;
	else if (l > 255) l = 255;
	if (i1 < 0) i1 = 0;
	else if (i1 > 255) i1 = 255;
	this.gamecolor_mizunohadou = new Color(k, l, i1);
	this.moji_score = this.gg.ap.getParameter("moji_score");
	this.moji_highscore = this.gg.ap.getParameter("moji_highscore");
	this.moji_time = this.gg.ap.getParameter("moji_time");
	this.moji_time = "    " + this.moji_time + " ";
	this.moji_jet = this.gg.ap.getParameter("moji_jet");
	this.moji_grenade = this.gg.ap.getParameter("moji_grenade");
	this.moji_left = this.gg.ap.getParameter("moji_left");
	this.moji_left = "    " + this.moji_left + " ";
	this.moji_size = this.paraInt("moji_size");
	if (this.moji_size < 10) this.moji_size = 10;
	else if (this.moji_size > 30) this.moji_size = 30;
	this.j_left_shoki = this.paraInt("jibun_left_shoki");
	if (this.j_left_shoki < 1) this.j_left_shoki = 1;
	this.j_left_shoki--;
	this.stage_max = this.paraInt("stage_max");
	if (this.stage_max < 1) this.stage_max = 1;
	else if (this.stage_max > 4) this.stage_max = 4;
	if (this.stage_select == 2) this.stage_max = 4;
	this.stage_kaishi = this.paraInt("stage_kaishi");
	if (this.stage_kaishi < 1) this.stage_kaishi = 1;
	if (this.stage_kaishi > this.stage_max) this.stage_kaishi = this.stage_max;
	this.score_1up_1_para = this.paraInt("score_1up_1");
	if (this.score_1up_1_para < 0 || this.stage_max <= 1)
		this.score_1up_1_para = 0;
	this.score_1up_2_para = this.paraInt("score_1up_2");
	if (this.score_1up_2_para < 0 || this.stage_max <= 1)
		this.score_1up_2_para = 0;
	this.j_tail_type = this.paraInt("j_tail_type");
	if (this.j_tail_type < 1 || this.j_tail_type > 3) this.j_tail_type = 1;
	var i = this.paraInt("j_tail_hf");
	if (i == 2) this.j_tail_hf = true;
	else this.j_tail_hf = false;
	this.grenade_type = this.paraInt("grenade_type");
	if (this.grenade_type < 1 || this.grenade_type > 6) this.grenade_type = 1;
	this.suberuyuka_hkf = this.paraInt("suberuyuka_hkf");
	if (this.suberuyuka_hkf == 2) this.suberuyuka_hkf = 2;
	else this.suberuyuka_hkf = 1;
	i = this.paraInt("j_fire_mkf");
	if (i == 2) this.j_fire_mkf = true;
	else this.j_fire_mkf = false;
	i = this.paraInt("dengeki_mkf");
	if (i == 2) this.dengeki_mkf = true;
	else this.dengeki_mkf = false;
	i = this.paraInt("yachamo_kf");
	if (i == 2) this.yachamo_cf = true;
	else this.yachamo_cf = false;
	i = this.paraInt("airms_kf");
	if (i == 2) this.airms_kf = true;
	else this.airms_kf = false;
	this.ugokuyuka1_type = this.paraInt("ugokuyuka1_type");
	if (this.ugokuyuka1_type < 1 || this.ugokuyuka1_type > 7)
		this.ugokuyuka1_type = 1;
	this.ugokuyuka2_type = this.paraInt("ugokuyuka2_type");
	if (this.ugokuyuka2_type < 1 || this.ugokuyuka2_type > 7)
		this.ugokuyuka2_type = 1;
	this.ugokuyuka3_type = this.paraInt("ugokuyuka3_type");
	if (this.ugokuyuka3_type < 1 || this.ugokuyuka3_type > 7)
		this.ugokuyuka3_type = 1;
	this.boss_type = this.paraInt("boss_type");
	if (this.boss_type < 1 || this.boss_type > 4) this.boss_type = 1;
	this.boss2_type = this.paraInt("boss2_type");
	if (this.boss2_type < 1 || this.boss2_type > 2) this.boss2_type = 1;
	this.boss3_type = this.paraInt("boss3_type");
	if (this.boss3_type < 1 || this.boss3_type > 4) this.boss3_type = 1;
	this.dokan_mode = this.paraInt("dokan_mode");
	if (this.dokan_mode < 1 || this.dokan_mode > 2) this.dokan_mode = 1;
	this.mes1_name = this.gg.ap.getParameter("mes1_name");
	this.mes2_name = this.gg.ap.getParameter("mes2_name");
	this.shop_name = this.gg.ap.getParameter("shop_name");
	this.setumei_name = this.gg.ap.getParameter("setumei_name");
	this.door_score = this.paraInt("door_score");
	if (this.door_score < 10) this.door_score = 10;
	this.shop_item_name[0] = this.gg.ap.getParameter("shop_item_name1");
	this.shop_item_name[1] = this.gg.ap.getParameter("shop_item_name2");
	this.shop_item_name[2] = this.gg.ap.getParameter("shop_item_name3");
	this.shop_item_name[3] = this.gg.ap.getParameter("shop_item_name4");
	this.shop_item_name[4] = this.gg.ap.getParameter("shop_item_name5");
	this.shop_item_name[5] = this.gg.ap.getParameter("shop_item_name6");
	this.shop_item_name[6] = this.gg.ap.getParameter("shop_item_name7");
	this.shop_item_name[7] = this.gg.ap.getParameter("shop_item_name8");
	this.shop_item_name[8] = this.gg.ap.getParameter("shop_item_name9");
	for (var j1 = 0; j1 <= 8; j1++) {
		var j = j1 + 1;
		j = this.paraInt("shop_item_teika" + j);
		if (j < 0) j = 0;
		this.shop_item_teika[j1] = j;
	}
};

MainProgram.prototype.init2 = function() {
	if (this.score > this.highscore) this.highscore = this.score;
	this.j_left = this.j_left_shoki;
	this.score_1up_1 = this.score_1up_1_para;
	this.score_1up_2 = this.score_1up_2_para;
	for (var i = 0; i <= 2; i++) this.stage_1up_f[i] = true;

	this.gk.key_code = 0;
	this.score = 0;
	this.stage = this.stage_kaishi;
	if (this.time_max > 0) this.time = this.time_max * 1000 + 1000 - 70;
	else this.time = 0;
};

MainProgram.prototype.init3 = function() {
	this.sendHighscore();
	this.g_c1 = 0;
	this.g_c2 = 0;
	this.g_c3 = 0;
	this.g_ac = 0;
	this.g_ac2 = 0;
	this.stage_cc = 0;
	this.co_j.init();
	this.co_j.c = 100;
	this.co_j.x = 100;
	this.co_j.y = 100;
	this.co_j.pt = 100;
	this.co_j.muki = 1;
	this.co_j.jimen_f = false;
	this.j_hashiru_f = false;
	this.j_jump_level = 0;
	this.j_jump_type = 0;
	this.j_a_id = -1;
	this.tr1_c = 0;
	this.tr2_c = 0;
	this.gk.left_c = 0;
	this.gk.right_c = 0;
	this.left_dcc = 0;
	this.right_dcc = 0;
	this.ochiru_y = 9999;
	this.j_fire_f = false;
	this.j_v_c = 0;
	this.j_v_kakudo = 0;
	this.j_jet_c = 0;
	this.j_jet_kf = false;
	this.j_jet_fuel = 0;
	this.j_helm_f = false;
	this.j_drell_f = false;
	this.j_tail_f = false;
	this.j_tail_ac = 0;
	this.j_gr_kazu = 0;
	this.j_mizu_f = false;
	this.j_mizu_ac = 0;
	this.j_mizu_awa_c = 0;
	this.j_jdai_f = false;
	this.hitokoto_c = 0;
	this.hitokoto_num = 1;
	if (this.j_tail_hf) this.j_tail_f = true;
	for (var i = 0; i <= 5; i++) {
		this.j_zan_x[i] = 0;
		this.j_zan_y[i] = 0;
		this.j_zan_pt[i] = 0;
		this.j_zan_pth[i] = 0;
	}

	this.j_zan_p = 0;
	this.j_zan_c = 0;
	this.j_zan_nagasa = 0;
	this.j_zan_f = false;
	this.sl_step = 0;
	this.sl_speed = 0;
	this.sl_wx = 0;
	this.sl_wy = 0;
	var l1;
	if (this.stage == 2) l1 = this.paraInt("scroll_mode_s");
	else if (this.stage == 3) l1 = this.paraInt("scroll_mode_t");
	else if (this.stage == 4) l1 = this.paraInt("scroll_mode_f");
	else l1 = this.paraInt("scroll_mode");
	if (l1 == 2) {
		this.sl_step = 10;
		this.ks_wx = 32;
		this.ks_wy = 960;
		this.sl_speed = 2;
	} else if (l1 == 3) {
		this.sl_step = 10;
		this.ks_wx = 32;
		this.ks_wy = 960;
		this.sl_speed = 4;
	}
	for (var j = 0; j <= 31; j++) {
		this.co_a[j].init();
		for (var k1 = 0; k1 <= 3; k1++) {
			this.vo_x[j][k1] = 0;
			this.vo_y[j][k1] = 0;
		}
	}

	this.a_kazu = -1;
	this.a_hf = false;
	for (var k = 0; k <= 129; k++) this.co_t[k].init();

	this.t_kazu = -1;
	this.co_b.init();
	this.boss_kijyun_y = 0;
	for (var l = 0; l <= 23; l++) this.co_m[l].init();

	this.m_kazu = 0;
	for (var i1 = 0; i1 <= 1; i1++) this.co_jm[i1].init();

	this.jm_kazu = 0;
	for (var j1 = 0; j1 <= 63; j1++) this.co_h[j1].init();

	if (this.time_max > 0) this.time = this.time_max * 1000 + 1000 - 70;
	else this.time = 0;
	this.mapsMakeStageData(100 + this.stage);
	if (this.sl_step == 10 || this.sl_step == 11) {
		this.ks_wx = this.maps.wx;
		if (this.ks_wx <= 128) this.ks_wx = 32;
	}
	this.maps.drawMap(this.maps.wx, this.maps.wy);
};

MainProgram.prototype.mapsMakeStageData = function(i) {
	this.maps.init();
	var as = this.maps.map_string;
	this.maps.wx = 32;
	this.maps.wy = 32;
	this.maps.wx_mini = 32;
	this.maps.wy_mini = 320;
	this.maps.wx_max = 5856;
	this.maps.wy_max = 6048;
	var c1 = 199;
	this.gg.setBackcolor(Color.blue);
	switch (i) {
		default:
			break;

		case 101:
			this.maps.setBank(0);
			this.gg.setBackcolor(this.gamecolor_back);
			this.maps.wx_max = 5280;
			this.maps.wy_max = 960;
			for (var i1 = 0; i1 <= 29; i1++) {
				var s = "." + this.gg.ap.getParameter("map0-" + i1);
				s = s + this.gg.ap.getParameter("map1-" + i1);
				s = s + this.gg.ap.getParameter("map2-" + i1);
				as[i1 + 10] = s;
			}

			break;

		case 102:
			this.maps.setBank(0);
			this.gg.setBackcolor(this.gamecolor_back_s);
			this.maps.wx_max = 5280;
			this.maps.wy_max = 960;
			for (var j1 = 0; j1 <= 29; j1++) {
				var s1 = "." + this.gg.ap.getParameter("map0-" + j1 + "-s");
				s1 = s1 + this.gg.ap.getParameter("map1-" + j1 + "-s");
				s1 = s1 + this.gg.ap.getParameter("map2-" + j1 + "-s");
				as[j1 + 10] = s1;
			}

			break;

		case 103:
			this.maps.setBank(0);
			this.gg.setBackcolor(this.gamecolor_back_t);
			this.maps.wx_max = 5280;
			this.maps.wy_max = 960;
			for (var k1 = 0; k1 <= 29; k1++) {
				var s2 = "." + this.gg.ap.getParameter("map0-" + k1 + "-t");
				s2 = s2 + this.gg.ap.getParameter("map1-" + k1 + "-t");
				s2 = s2 + this.gg.ap.getParameter("map2-" + k1 + "-t");
				as[k1 + 10] = s2;
			}

			break;

		case 104:
			this.maps.setBank(0);
			this.gg.setBackcolor(this.gamecolor_back_f);
			this.maps.wx_max = 5280;
			this.maps.wy_max = 960;
			for (var l1 = 0; l1 <= 29; l1++) {
				var s3 = "." + this.gg.ap.getParameter("map0-" + l1 + "-f");
				s3 = s3 + this.gg.ap.getParameter("map1-" + l1 + "-f");
				s3 = s3 + this.gg.ap.getParameter("map2-" + l1 + "-f");
				as[l1 + 10] = s3;
			}

			break;
	}
	for (var i2 = 0; i2 < this.maps.height; i2++)
		if (as[i2].length < this.maps.width) {
			var l2 = as[i2].length;
			for (var j = l2; j < this.maps.width; j++) as[i2] += ".";
		}

	var flag = false;
	for (var j2 = 0; j2 < this.maps.height; j2++) {
		for (var k = 0; k < this.maps.width; k++) {
			var c = as[j2].charAt(k);
			var word0 = -1;
			if (c != ".") {
				if (c == "1") word0 = 1;
				else if (c == "2") word0 = 2;
				else if (c == "3") word0 = 3;
				else if (c == "4") word0 = 4;
				else if (c == "5") word0 = 5;
				else if (c == "6") word0 = 6;
				else if (c == "7") word0 = 7;
				else if (c == "8") word0 = 8;
				else if (c == "9") word0 = 9;
				else if (c == "a") word0 = 20;
				else if (c == "b") word0 = 21;
				else if (c == "c") word0 = 22;
				else if (c == "d") word0 = 23;
				else if (c == "e") word0 = 24;
				else if (c == "f") word0 = 25;
				else if (c == "g") word0 = 26;
				else if (c == "h") word0 = 27;
				else if (c == "i") word0 = 28;
				else if (c == "j") word0 = 29;
				else if (c == "k") {
					word0 = 40;
					this.hSet(k, j2, 100);
				} else if (c == "l") {
					word0 = 40;
					this.hSet(k, j2, 200);
				} else if (c == "m") {
					word0 = 40;
					this.hSet(k, j2, 300);
				} else if (c == "n") {
					word0 = 40;
					this.hSet(k, j2, 400);
				} else if (c == "o") {
					word0 = 40;
					this.hSet(k, j2, 500);
				} else if (c == "p") {
					word0 = 40;
					this.hSet(k, j2, 600);
				} else if (c == "q") {
					word0 = 40;
					this.hSet(k, j2, 700);
				} else if (c == "r") {
					word0 = 40;
					this.hSet(k, j2, 800);
				} else if (c == "s") {
					word0 = 40;
					this.hSet(k, j2, 900);
				} else if (c == "t") {
					word0 = 40;
					this.hSet(k, j2, 1000);
				} else if (c == "u") {
					this.aSet(k * 32, j2 * 32, 300, k * 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "v") {
					this.aSet(k * 32, j2 * 32, 310, k * 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "w") {
					this.aSet(k * 32, j2 * 32, 320, k * 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "x") {
					this.aSet(k * 32, j2 * 32, 330, k * 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "y") {
					if (this.stage_1up_f[this.stage - 1]) {
						word0 = 40;
						this.hSet(k, j2, 1100);
					} else {
						word0 = 41;
					}
				} else if (c == "z") word0 = 69;
				else if (c == "+") {
					this.aSet(k * 32, j2 * 32, 80, k * 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "-") {
					this.aSet(k * 32, j2 * 32, 81, k * 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "*") {
					this.aSet(k * 32, j2 * 32, 82, k * 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "/") {
					this.aSet(k * 32, j2 * 32, 83, k * 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "A") {
					this.co_j.x = k * 32;
					this.co_j.y = j2 * 32;
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "B") {
					this.tSet(k * 32, j2 * 32, 100, k * 32 - 512 - 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "C") {
					this.tSet(k * 32, j2 * 32, 110, k * 32 - 512 - 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "D") {
					this.tSet(k * 32, j2 * 32, 110, k * 32 - 512 - 32);
					this.tSet(k * 32 + 75, j2 * 32, 110, k * 32 - 512 - 32);
					this.tSet(k * 32 + 150, j2 * 32, 110, k * 32 - 512 - 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "E") {
					this.tSet(k * 32, j2 * 32, 200, k * 32 - 512 - 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "F") {
					this.tSet(k * 32, j2 * 32, 300, k * 32 - 512 - 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "G") {
					this.tSet(k * 32, j2 * 32, 400, k * 32 - 512 - 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "H") {
					this.tSet(k * 32, j2 * 32, 500, k * 32 - 512 - 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "I") {
					this.tSet(k * 32, j2 * 32, 510, k * 32 - 512 - 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "J") {
					this.tSet(k * 32, j2 * 32, 510, k * 32 - 512 - 32 - 32);
					this.tSet(
						k * 32 + 80,
						j2 * 32 - 40,
						510,
						k * 32 - 512 - 32 - 32
					);
					this.tSet(
						k * 32 + 140,
						j2 * 32 + 38,
						510,
						k * 32 - 512 - 32 - 32
					);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "K") {
					if (this.ugokuyuka1_type == 2)
						this.aSet(k * 32, j2 * 32, 500, k * 32);
					else if (this.ugokuyuka1_type == 3)
						this.aSet(k * 32, j2 * 32, 510, k * 32);
					else if (this.ugokuyuka1_type == 4)
						this.aSet(k * 32, j2 * 32, 120, k * 32);
					else if (this.ugokuyuka1_type == 5)
						this.aSet(k * 32, j2 * 32, 121, k * 32);
					else if (this.ugokuyuka1_type == 6)
						this.aSet(k * 32, j2 * 32, 600, k * 32);
					else if (this.ugokuyuka1_type == 7)
						this.aSet(k * 32, j2 * 32, 700, k * 32);
					else this.aSet(k * 32, j2 * 32, 100, k * 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "L") {
					if (this.ugokuyuka2_type == 2)
						this.aSet(k * 32, j2 * 32, 500, k * 32);
					else if (this.ugokuyuka2_type == 3)
						this.aSet(k * 32, j2 * 32, 510, k * 32);
					else if (this.ugokuyuka2_type == 4)
						this.aSet(k * 32, j2 * 32, 120, k * 32);
					else if (this.ugokuyuka2_type == 5)
						this.aSet(k * 32, j2 * 32, 121, k * 32);
					else if (this.ugokuyuka2_type == 6)
						this.aSet(k * 32, j2 * 32, 600, k * 32);
					else if (this.ugokuyuka2_type == 7)
						this.aSet(k * 32, j2 * 32, 700, k * 32);
					else this.aSet(k * 32, j2 * 32 + 9, 110, k * 32 - 16);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "M") {
					if (this.ugokuyuka3_type == 2)
						this.aSet(k * 32, j2 * 32, 500, k * 32);
					else if (this.ugokuyuka3_type == 3)
						this.aSet(k * 32, j2 * 32, 510, k * 32);
					else if (this.ugokuyuka3_type == 4)
						this.aSet(k * 32, j2 * 32, 120, k * 32);
					else if (this.ugokuyuka3_type == 5)
						this.aSet(k * 32, j2 * 32, 121, k * 32);
					else if (this.ugokuyuka3_type == 6)
						this.aSet(k * 32, j2 * 32, 600, k * 32);
					else if (this.ugokuyuka3_type == 7) {
						this.aSet(k * 32, j2 * 32, 700, k * 32);
					} else {
						this.aSet(k * 32, j2 * 32 + 9, 115, k * 32 - 16);
						this.aSet(k * 32, j2 * 32 + 9, 116, k * 32 - 16);
					}
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "N") {
					this.aSet(k * 32 - 32, j2 * 32, 400, k * 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "O") {
					this.tSet(k * 32, j2 * 32, 600, k * 32 - 512 - 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "P") {
					this.tSet(k * 32, j2 * 32, 700, k * 32 - 512 - 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "Q") {
					this.tSet(k * 32, j2 * 32, 800, k * 32 - 512 - 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "R") {
					this.tSet(k * 32, j2 * 32, 900, k * 32 - 512 - 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "S") {
					this.co_b.c = 100;
					this.co_b.c4 = 3;
					this.co_b.x = k * 32;
					this.co_b.y = j2 * 32 - 16;
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
					if (this.co_b.x < 448) this.co_b.x = 448;
					else if (this.co_b.x > 5664) this.co_b.x = 5664;
					if (this.sl_step == 10) this.sl_step = 11;
					else this.sl_step = 1;
					this.sl_wx = this.co_b.x - 384;
					this.sl_wy = 960;
				} else if (c == "T") {
					this.co_b.c = 200;
					this.co_b.c4 = 3;
					this.co_b.x = k * 32;
					this.co_b.y = j2 * 32 - 16;
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
					if (this.co_b.x < 448) this.co_b.x = 448;
					else if (this.co_b.x > 5664) this.co_b.x = 5664;
					if (this.sl_step == 10) this.sl_step = 11;
					else this.sl_step = 1;
					this.sl_wx = this.co_b.x - 384;
					this.sl_wy = 960;
				} else if (c == "U") {
					this.aSet(k * 32 + 16, j2 * 32 + 16, 70, k * 32);
					word0 = 50;
				} else if (c == "V") {
					this.aSet(k * 32 + 16, j2 * 32 + 16, 71, k * 32);
					word0 = 50;
				} else if (c == "W") {
					this.tSet(
						k * 32,
						j2 * 32 - 16,
						1000,
						k * 32 - 512 - 32 - 32
					);
					word0 = 4;
				} else if (c == "X") {
					this.tSet(k * 32, j2 * 32, 1100, k * 32 - 512 - 32);
					word0 = 4;
				} else if (c == "Y") {
					this.aSet(k * 32, j2 * 32, 60, k * 32);
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
				} else if (c == "Z") {
					this.co_b.c = 300;
					this.co_b.c4 = 3;
					this.co_b.x = k * 32;
					this.co_b.y = j2 * 32 - 16;
					this.boss_kijyun_y = this.co_b.y;
					if (this.maps.map_bg[k - 1][j2] == 4) word0 = 4;
					if (this.co_b.x < 448) this.co_b.x = 448;
					else if (this.co_b.x > 5664) this.co_b.x = 5664;
					if (this.sl_step == 10) this.sl_step = 11;
					else this.sl_step = 1;
					this.sl_wx = this.co_b.x - 384;
					this.sl_wy = 960;
				}
				if (word0 >= 0) this.maps.map_bg[k][j2] = word0;
			}
		}
	}

	for (var l = 0; l <= this.maps.width - 1; l++) {
		this.maps.map_bg[l][0] = 21;
		this.maps.map_bg[l][this.maps.height - 1] = 21;
	}

	for (var k2 = 0; k2 <= this.maps.height - 1; k2++) {
		this.maps.map_bg[0][k2] = 21;
		this.maps.map_bg[181][k2] = 21;
		this.maps.map_bg[c1][k2] = 21;
	}

	this.ochiru_y = this.maps.wy_max + 320;
	this.maps.wx = this.co_j.x - 96;
	this.maps.wy = this.co_j.y - 176;
	if (this.maps.wx < this.maps.wx_mini) this.maps.wx = this.maps.wx_mini;
	else if (this.maps.wx > this.maps.wx_max) this.maps.wx = this.maps.wx_max;
	if (this.maps.wy < this.maps.wy_mini) this.maps.wy = this.maps.wy_mini;
	else if (this.maps.wy > this.maps.wy_max) this.maps.wy = this.maps.wy_max;
	this.co_j.wx = this.co_j.x - this.maps.wx;
	this.co_j.wy = this.co_j.y - this.maps.wy;
};

MainProgram.prototype.drawGamescreen = function() {
	this.maps.drawMapScroll(this.g_ac2);
	var i3 = this.maps.wx;
	var j3 = this.maps.wy;
	this.co_j.wx = this.co_j.x - this.maps.wx;
	this.co_j.wy = this.co_j.y - this.maps.wy;
	if (this.a_hf) {
		for (var i = 0; i <= this.a_kazu; i++)
			if (this.co_a[i].gf) {
				var characterobject = this.co_a[i];
				var j5 = characterobject.x - i3;
				var i7 = characterobject.y - j3;
				switch (characterobject.pt) {
					default:
						break;

					case 100:
						this.hg.drawImage(this.hi[190], j5, i7, this.ap);
						this.hg.drawImage(this.hi[191], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[192], j5 + 64, i7, this.ap);
						break;

					case 200:
						this.hg.drawImage(this.hi[76], j5, i7, this.ap);
						this.hg.drawImage(this.hi[77], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[86], j5, i7 + 32, this.ap);
						this.hg.drawImage(
							this.hi[87],
							j5 + 32,
							i7 + 32,
							this.ap
						);
						break;

					case 210:
						this.hg.drawImage(this.hi[78], j5, i7, this.ap);
						this.hg.drawImage(this.hi[79], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[88], j5, i7 + 32, this.ap);
						this.hg.drawImage(
							this.hi[89],
							j5 + 32,
							i7 + 32,
							this.ap
						);
						break;

					case 300:
						this.hg.drawImage(this.hi[60], j5, i7, this.ap);
						this.hg.drawImage(this.hi[61], j5 + 32, i7, this.ap);
						break;

					case 310:
						this.hg.drawImage(this.hi[62], j5, i7, this.ap);
						this.hg.drawImage(this.hi[63], j5 + 32, i7, this.ap);
						break;

					case 320:
						this.hg.drawImage(this.hi[64], j5, i7, this.ap);
						this.hg.drawImage(this.hi[65], j5 + 32, i7, this.ap);
						break;

					case 330:
						this.hg.drawImage(this.hi[66], j5, i7, this.ap);
						this.hg.drawImage(this.hi[67], j5 + 32, i7, this.ap);
						break;

					case 400:
						this.hg.drawImage(this.hi[183], j5, i7, this.ap);
						this.hg.drawImage(this.hi[184], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[185], j5 + 64, i7, this.ap);
						this.hg.drawImage(this.hi[193], j5, i7 + 32, this.ap);
						this.hg.drawImage(
							this.hi[194],
							j5 + 32,
							i7 + 32,
							this.ap
						);
						this.hg.drawImage(
							this.hi[195],
							j5 + 64,
							i7 + 32,
							this.ap
						);
						break;

					case 500:
						this.hg.drawImage(this.hi[180], j5, i7, this.ap);
						this.hg.drawImage(this.hi[181], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[182], j5 + 64, i7, this.ap);
						break;

					case 600:
						this.hg.drawImage(this.hi[188], j5, i7, this.ap);
						this.hg.drawImage(this.hi[189], j5 + 32, i7, this.ap);
						this.hg.drawImage(this.hi[198], j5, i7 + 32, this.ap);
						this.hg.drawImage(
							this.hi[199],
							j5 + 32,
							i7 + 32,
							this.ap
						);
						break;

					case 605:
						this.hg.drawImage(this.hih[1][189], j5, i7, this.ap);
						this.hg.drawImage(
							this.hih[1][188],
							j5 + 32,
							i7,
							this.ap
						);
						this.hg.drawImage(
							this.hih[1][199],
							j5,
							i7 + 32,
							this.ap
						);
						this.hg.drawImage(
							this.hih[1][198],
							j5 + 32,
							i7 + 32,
							this.ap
						);
						break;

					case 700:
						this.hg.drawImage(this.hi[32], j5, i7, this.ap);
						break;

					case 710:
						this.hg.drawImage(this.hi[33], j5, i7, this.ap);
						break;

					case 720:
						this.hg.drawImage(this.hi[34], j5, i7, this.ap);
						break;

					case 800:
						if (characterobject.x >= this.co_j.x)
							this.hg.drawImage(
								this.hi[35 + characterobject.c3],
								j5,
								i7,
								this.ap
							);
						else
							this.hg.drawImage(
								this.hih[1][35 + characterobject.c3],
								j5,
								i7,
								this.ap
							);
						break;

					case 1100:
						var k5 = Math.floor(
							Math.cos(
								((characterobject.c3 + 90) *
									6.2831853071795862) /
									360
							) * 16
						);
						var j7 = Math.floor(
							Math.sin(
								((characterobject.c3 + 90) *
									6.2831853071795862) /
									360
							) * 16
						);
						this.vo_pa_x[0] = this.vo_x[i][0] - i3 + k5;
						this.vo_pa_y[0] = this.vo_y[i][0] - j3 + j7;
						this.vo_pa_x[1] = this.vo_x[i][0] - i3 - k5;
						this.vo_pa_y[1] = this.vo_y[i][0] - j3 - j7;
						this.vo_pa_x[2] = this.vo_x[i][1] - i3 - k5;
						this.vo_pa_y[2] = this.vo_y[i][1] - j3 - j7;
						this.vo_pa_x[3] = this.vo_x[i][1] - i3 + k5;
						this.vo_pa_y[3] = this.vo_y[i][1] - j3 + j7;
						this.gg.os_g.setColor(this.gamecolor_firebar1);
						this.gg.os_g.fillPolygon(this.vo_pa_x, this.vo_pa_y, 4);
						if (this.g_c2 >= 2) {
							this.gg.os_g.setColor(this.gamecolor_firebar2);
							var l5 = Math.floor(
								Math.cos(
									((characterobject.c3 + 90) *
										6.2831853071795862) /
										360
								) * 10
							);
							var k7 = Math.floor(
								Math.sin(
									((characterobject.c3 + 90) *
										6.2831853071795862) /
										360
								) * 10
							);
							this.vo_pa_x[0] = this.vo_x[i][2] - i3 + l5;
							this.vo_pa_y[0] = this.vo_y[i][2] - j3 + k7;
							this.vo_pa_x[1] = this.vo_x[i][2] - i3 - l5;
							this.vo_pa_y[1] = this.vo_y[i][2] - j3 - k7;
							this.vo_pa_x[2] = this.vo_x[i][3] - i3 - l5;
							this.vo_pa_y[2] = this.vo_y[i][3] - j3 - k7;
							this.vo_pa_x[3] = this.vo_x[i][3] - i3 + l5;
							this.vo_pa_y[3] = this.vo_y[i][3] - j3 + k7;
							this.gg.os_g.fillPolygon(
								this.vo_pa_x,
								this.vo_pa_y,
								4
							);
						}
						break;
				}
			}
	}
	if (this.m_kazu > 0) {
		for (var j = 0; j <= 23; j++)
			if (this.co_m[j].c >= 50) {
				var characterobject1 = this.co_m[j];
				if (characterobject1.c == 50) {
					this.hg.drawImage(
						this.hih[characterobject1.pth][characterobject1.pt],
						characterobject1.x - i3,
						characterobject1.y - j3,
						this.ap
					);
					var j4 = this.maps.getBGCode(
						characterobject1.x,
						characterobject1.y
					);
					if (j4 >= 20)
						this.gg.drawPT(
							(characterobject1.x >> 5) * 32 - i3,
							(characterobject1.y >> 5) * 32 - j3,
							j4,
							0
						);
					j4 = this.maps.getBGCode(
						characterobject1.x + 31,
						characterobject1.y
					);
					if (j4 >= 20)
						this.gg.drawPT(
							((characterobject1.x + 31) >> 5) * 32 - i3,
							(characterobject1.y >> 5) * 32 - j3,
							j4,
							0
						);
				} else if (characterobject1.pt == 1000) {
					this.gg.os_g.setColor(this.gamecolor_mizunohadou);
					this.gg.os_g.fillOval(
						characterobject1.x - i3 + 16 - characterobject1.c2,
						characterobject1.y - j3 + 16 - characterobject1.c2,
						characterobject1.c2 * 2,
						characterobject1.c2 * 2
					);
				} else if (characterobject1.pt == 1100) {
					if (this.g_ac == 0)
						this.gg.os_g.setColor(this.gamecolor_grenade1);
					else this.gg.os_g.setColor(this.gamecolor_grenade2);
					this.gg.os_g.fillOval(
						characterobject1.x - i3 + 16 - characterobject1.c2,
						characterobject1.y - j3 + 16 - characterobject1.c2,
						characterobject1.c2 * 2,
						characterobject1.c2 * 2
					);
				} else {
					this.hg.drawImage(
						this.hih[characterobject1.pth][characterobject1.pt],
						characterobject1.x - i3,
						characterobject1.y - j3,
						this.ap
					);
				}
			}
	}
	if (this.jm_kazu > 0) {
		for (var k = 0; k <= 1; k++)
			if (this.co_jm[k].c >= 50) {
				var characterobject2 = this.co_jm[k];
				if (characterobject2.pt < 1000)
					this.hg.drawImage(
						this.hih[characterobject2.pth][characterobject2.pt],
						characterobject2.x - i3,
						characterobject2.y - j3,
						this.ap
					);
				else if (characterobject2.pt == 1200) {
					if (this.g_ac == 0)
						this.gg.os_g.setColor(this.gamecolor_grenade1);
					else this.gg.os_g.setColor(this.gamecolor_grenade2);
					this.gg.os_g.fillRect(
						characterobject2.x - i3,
						characterobject2.y - j3 + 12,
						characterobject2.vx - characterobject2.x + 1,
						8
					);
				} else if (characterobject2.pt == 1205) {
					if (this.g_ac == 0)
						this.gg.os_g.setColor(this.gamecolor_grenade1);
					else this.gg.os_g.setColor(this.gamecolor_grenade2);
					this.gg.os_g.fillRect(
						characterobject2.vx - i3,
						characterobject2.y - j3 + 12,
						characterobject2.x - characterobject2.vx + 1,
						8
					);
				} else {
					if (this.g_ac == 0)
						this.gg.os_g.setColor(this.gamecolor_grenade1);
					else this.gg.os_g.setColor(this.gamecolor_grenade2);
					this.gg.os_g.fillOval(
						characterobject2.x - i3 + 16 - characterobject2.c2,
						characterobject2.y - j3 + 16 - characterobject2.c2,
						characterobject2.c2 * 2,
						characterobject2.c2 * 2
					);
				}
			}
	}
	for (var l = 0; l <= this.t_kazu; l++)
		if (this.co_t[l].c >= 50) {
			var i6 = this.co_t[l].x - i3;
			var l7 = this.co_t[l].y - j3;
			if (i6 >= -64 && l7 <= 576)
				this.hg.drawImage(
					this.hih[this.co_t[l].pth][this.co_t[l].pt],
					i6,
					l7,
					this.ap
				);
		}

	if (this.co_b.c > 50) {
		var j6 = this.co_b.x - i3;
		if (j6 < 528) {
			var i8 = this.co_b.y - j3;
			switch (this.co_b.pt) {
				default:
					break;

				case 1000:
					this.hg.drawImage(
						this.hih[0][186],
						j6 - 16,
						i8 - 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[0][187],
						j6 + 16,
						i8 - 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[0][196],
						j6 - 16,
						i8 + 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[0][197],
						j6 + 16,
						i8 + 16,
						this.ap
					);
					break;

				case 1005:
					this.hg.drawImage(
						this.hih[1][187],
						j6 - 16,
						i8 - 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[1][186],
						j6 + 16,
						i8 - 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[1][197],
						j6 - 16,
						i8 + 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[1][196],
						j6 + 16,
						i8 + 16,
						this.ap
					);
					break;

				case 1010:
					this.hg.drawImage(
						this.hih[0][176],
						j6 - 16,
						i8 + 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[0][177],
						j6 + 16,
						i8 + 16,
						this.ap
					);
					break;

				case 1015:
					this.hg.drawImage(
						this.hih[1][177],
						j6 - 16,
						i8 + 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[1][176],
						j6 + 16,
						i8 + 16,
						this.ap
					);
					break;

				case 1100:
					this.hg.drawImage(
						this.hih[0][188],
						j6 - 16,
						i8 - 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[0][189],
						j6 + 16,
						i8 - 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[0][198],
						j6 - 16,
						i8 + 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[0][199],
						j6 + 16,
						i8 + 16,
						this.ap
					);
					break;

				case 1105:
					this.hg.drawImage(
						this.hih[1][189],
						j6 - 16,
						i8 - 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[1][188],
						j6 + 16,
						i8 - 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[1][199],
						j6 - 16,
						i8 + 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[1][198],
						j6 + 16,
						i8 + 16,
						this.ap
					);
					break;

				case 1110:
					this.hg.drawImage(
						this.hih[0][178],
						j6 - 16,
						i8 + 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[0][179],
						j6 + 16,
						i8 + 16,
						this.ap
					);
					break;

				case 1115:
					this.hg.drawImage(
						this.hih[1][179],
						j6 - 16,
						i8 + 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[1][178],
						j6 + 16,
						i8 + 16,
						this.ap
					);
					break;

				case 1200:
					this.hg.drawImage(
						this.hih[0][238],
						j6 - 16,
						i8 - 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[0][239],
						j6 + 16,
						i8 - 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[0][248],
						j6 - 16,
						i8 + 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[0][249],
						j6 + 16,
						i8 + 16,
						this.ap
					);
					break;

				case 1205:
					this.hg.drawImage(
						this.hih[1][239],
						j6 - 16,
						i8 - 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[1][238],
						j6 + 16,
						i8 - 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[1][249],
						j6 - 16,
						i8 + 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[1][248],
						j6 + 16,
						i8 + 16,
						this.ap
					);
					break;

				case 1210:
					this.hg.drawImage(
						this.hih[0][228],
						j6 - 16,
						i8 + 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[0][229],
						j6 + 16,
						i8 + 16,
						this.ap
					);
					break;

				case 1215:
					this.hg.drawImage(
						this.hih[1][229],
						j6 - 16,
						i8 + 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[1][228],
						j6 + 16,
						i8 + 16,
						this.ap
					);
					break;

				case 1250:
					this.hg.drawImage(
						this.hih[0][238],
						j6 - 16,
						i8 - 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[0][239],
						j6 + 16,
						i8 - 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[0][248],
						j6 - 16,
						i8 + 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[0][249],
						j6 + 16,
						i8 + 16,
						this.ap
					);
					if (this.j_v_c <= 0) {
						this.j_v_kakudo += 2;
						if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
					}
					j6 = this.co_b.x - i3 + 16;
					i8 = this.co_b.y - j3 + 16;
					this.gg.os_g.setColor(Color.white);
					var d6 = 0.017453292519943295;
					for (var i1 = 0; i1 <= 5; i1++) {
						var d = (this.j_v_kakudo + i1 * 60) * d6;
						this.vo_pa_x[i1] = j6 + Math.floor(Math.cos(d) * 50);
						this.vo_pa_y[i1] = i8 + Math.floor(Math.sin(d) * 50);
					}

					this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
					for (var j1 = 0; j1 <= 5; j1++) {
						var d1 = (360 - this.j_v_kakudo + j1 * 60) * d6;
						this.vo_pa_x[j1] = j6 + Math.floor(Math.cos(d1) * 50);
						this.vo_pa_y[j1] = i8 + Math.floor(Math.sin(d1) * 50);
					}

					this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
					break;

				case 1255:
					this.hg.drawImage(
						this.hih[1][239],
						j6 - 16,
						i8 - 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[1][238],
						j6 + 16,
						i8 - 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[1][249],
						j6 - 16,
						i8 + 16,
						this.ap
					);
					this.hg.drawImage(
						this.hih[1][248],
						j6 + 16,
						i8 + 16,
						this.ap
					);
					if (this.j_v_c <= 0) {
						this.j_v_kakudo += 2;
						if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
					}
					j6 = this.co_b.x - i3 + 16;
					i8 = this.co_b.y - j3 + 16;
					this.gg.os_g.setColor(Color.white);
					var d7 = 0.017453292519943295;
					for (var k1 = 0; k1 <= 5; k1++) {
						var d2 = (this.j_v_kakudo + k1 * 60) * d7;
						this.vo_pa_x[k1] = j6 + Math.floor(Math.cos(d2) * 50);
						this.vo_pa_y[k1] = i8 + Math.floor(Math.sin(d2) * 50);
					}

					this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
					for (var l1 = 0; l1 <= 5; l1++) {
						var d3 = (360 - this.j_v_kakudo + l1 * 60) * d7;
						this.vo_pa_x[l1] = j6 + Math.floor(Math.cos(d3) * 50);
						this.vo_pa_y[l1] = i8 + Math.floor(Math.sin(d3) * 50);
					}

					this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
					break;
			}
		}
	}
	if (this.j_jet_c >= 96)
		if (this.g_c1 == 0)
			this.hg.drawImage(
				this.hi[134],
				this.co_j.x - i3,
				this.co_j.y - j3 + 36,
				this.ap
			);
		else
			this.hg.drawImage(
				this.hi[135],
				this.co_j.x - i3,
				this.co_j.y - j3 + 36,
				this.ap
			);
	if (this.j_v_c > 0) {
		this.j_v_c--;
		this.j_v_kakudo += 2;
		if (this.j_v_kakudo > 360) this.j_v_kakudo -= 360;
		if (this.j_v_c > 50 || this.g_ac == 1) {
			var k6 = this.co_j.x - i3 + 16;
			var j8 = this.co_j.y - j3 + 16;
			this.gg.os_g.setColor(Color.white);
			var d8 = 0.017453292519943295;
			for (var i2 = 0; i2 <= 5; i2++) {
				var d4 = (this.j_v_kakudo + i2 * 60) * d8;
				this.vo_pa_x[i2] = k6 + Math.floor(Math.cos(d4) * 38);
				this.vo_pa_y[i2] = j8 + Math.floor(Math.sin(d4) * 38);
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
			for (var j2 = 0; j2 <= 5; j2++) {
				var d5 = (360 - this.j_v_kakudo + j2 * 60) * d8;
				this.vo_pa_x[j2] = k6 + Math.floor(Math.cos(d5) * 38);
				this.vo_pa_y[j2] = j8 + Math.floor(Math.sin(d5) * 38);
			}

			this.gg.os_g.drawPolygon(this.vo_pa_x, this.vo_pa_y, 6);
		}
	}
	if (this.j_zan_f) {
		var k3 = this.j_zan_p + (6 - this.j_zan_nagasa);
		if (k3 > 5) k3 -= 6;
		var l3 = this.j_zan_p + 1;
		if (l3 > 5) l3 -= 6;
		do {
			var l6 = this.j_zan_x[k3] - i3;
			var k8 = this.j_zan_y[k3] - j3;
			var i4 = this.j_zan_pth[k3];
			this.hg.drawImage(this.hih[i4][this.j_zan_pt[k3]], l6, k8, this.ap);
			if (++k3 > 5) k3 = 0;
		} while (k3 != l3);
		this.j_zan_p++;
		if (this.j_zan_p > 5) this.j_zan_p = 0;
		this.j_zan_x[this.j_zan_p] = this.co_j.x;
		this.j_zan_y[this.j_zan_p] = this.co_j.y;
		this.j_zan_pt[this.j_zan_p] = this.co_j.pt;
		this.j_zan_pth[this.j_zan_p] = this.co_j.muki;
		if (this.j_zan_c < 9) {
			this.j_zan_c++;
			if (this.co_j.vy >= 0) this.j_zan_c = 9;
		} else {
			this.j_zan_nagasa--;
			if (this.j_zan_nagasa < 0) this.j_zan_f = false;
		}
	}
	if (this.co_j.pt < 1000)
		this.gg.drawPT(
			this.co_j.wx,
			this.co_j.wy,
			this.co_j.pt,
			this.co_j.muki
		);
	else if (this.co_j.pt == 1000) {
		if (this.co_j.muki == 0) {
			this.gg.drawPT(this.co_j.wx, this.co_j.wy, 118, this.co_j.muki);
			this.gg.drawPT(
				this.co_j.wx - 32,
				this.co_j.wy,
				117,
				this.co_j.muki
			);
		} else {
			this.gg.drawPT(this.co_j.wx, this.co_j.wy, 118, 1);
			this.gg.drawPT(this.co_j.wx + 32, this.co_j.wy, 117, 1);
		}
	} else if (this.co_j.pt == 1100) {
		if (this.co_j.c1 <= 0)
			this.gg.drawPT(this.co_j.wx, this.co_j.wy, 100, this.co_j.muki);
		else if (this.co_j.c1 >= 32)
			this.gg.drawPT(
				this.co_j.wx,
				this.co_j.wy + 32,
				100,
				this.co_j.muki
			);
		else
			this.gg.drawPT(
				this.co_j.wx,
				this.co_j.wy + this.co_j.c1,
				100,
				this.co_j.muki
			);
		this.gg.drawPT(
			this.co_j.wx - 16,
			this.co_j.wy + 32,
			60 + this.co_j.c2 * 2,
			0
		);
		this.gg.drawPT(
			this.co_j.wx + 16,
			this.co_j.wy + 32,
			61 + this.co_j.c2 * 2,
			0
		);
	} else if (this.co_j.pt != 1110);
	if (this.hitokoto_c > 0) {
		this.hitokoto_c--;
		var c = 208;
		var byte0 = 56;
		var c1 = 224;
		var i5 = 0;
		for (var k2 = 0; k2 <= 2; k2++) {
			var k4 = k2 + 1;
			var s = "hitokoto" + this.hitokoto_num + "-" + k4;
			s = this.gg.ap.getParameter(s);
			k4 = parseInt(s);
			if (isNaN(k4)) k4 = -1;
			if (k4 != 0) i5++;
		}

		this.km.drawWindowbox(c, byte0, c1, 30 + i5 * 14);
		this.hg.setFont(new Font("Dialog", 0, 12));
		this.hg.setColor(Color.cyan);
		var s1 = "hitokoto" + this.hitokoto_num + "_name";
		this.hg.drawString(this.gg.ap.getParameter(s1), c + 6, byte0 + 6 + 12);
		this.hg.setColor(Color.white);
		i5 = 0;
		for (var l2 = 0; l2 <= 2; l2++) {
			var l4 = l2 + 1;
			var s2 = "hitokoto" + this.hitokoto_num + "-" + l4;
			s2 = this.gg.ap.getParameter(s2);
			l4 = parseInt(s2);
			if (isNaN(l4)) l4 = -1;
			if (l4 != 0) {
				this.hg.drawString(s2, c + 6, byte0 + 6 + 18 + i5 * 14 + 12);
				i5++;
			}
		}
	}
};

MainProgram.prototype.jM100 = function() {
	var flag = false;
	var flag1 = false;
	this.j_mizu_f = false;
	var i9 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15);
	if (i9 == 4) {
		this.j_mizu_f = true;
		this.j_jet_c = 0;
		this.j_mizu_awa_c++;
		if (this.j_mizu_awa_c == 44 || this.j_mizu_awa_c == 54)
			this.mSet(this.co_j.x, this.co_j.y + 4, 60);
		else if (this.j_mizu_awa_c > 54) this.j_mizu_awa_c = 0;
	} else if (
		(i9 == 8 || i9 == 9) &&
		this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][
			(this.co_j.y + 15) >> 5
		] == 4
	) {
		this.j_mizu_f = true;
		this.j_jet_c = 0;
		this.j_mizu_awa_c++;
		if (this.j_mizu_awa_c == 44 || this.j_mizu_awa_c == 54)
			this.mSet(this.co_j.x, this.co_j.y + 4, 60);
		else if (this.j_mizu_awa_c > 54) this.j_mizu_awa_c = 0;
	}
	if (this.gk.tr1_f) {
		if (this.tr1_c < 6) this.tr1_c++;
	} else {
		this.tr1_c = 0;
	}
	if (this.gk.tr2_f) {
		if (this.tr2_c < 2) this.tr2_c++;
	} else {
		this.tr2_c = 0;
	}
	if (this.gk.left_f) {
		if (this.gk.left_c < 2) this.gk.left_c++;
	} else {
		this.gk.left_c = 0;
	}
	if (this.gk.right_f) {
		if (this.gk.right_c < 2) this.gk.right_c++;
	} else {
		this.gk.right_c = 0;
	}
	if (this.gk.left_c == 1) {
		if (this.left_dcc > 0) this.j_hashiru_f = true;
		else this.j_hashiru_f = false;
		this.left_dcc = 8;
	} else if (this.left_dcc > 0) this.left_dcc--;
	if (this.gk.right_c == 1) {
		if (this.right_dcc > 0) this.j_hashiru_f = true;
		else this.j_hashiru_f = false;
		this.right_dcc = 8;
	} else if (this.right_dcc > 0) this.right_dcc--;
	var j3 = this.co_j.x;
	var k3 = this.co_j.y;
	this.co_j.pt = 100;
	var i = (j3 + 15) >> 5;
	var j1 = (k3 + 31) >> 5;
	var word0 = this.maps.map_bg[i][j1];
	var l1 = (k3 + 32) >> 5;
	var word2 = this.maps.map_bg[i][l1];
	if (word2 >= 20 || this.j_a_id >= 0) {
		this.co_j.jimen_f = true;
		this.j_jump_type = 2;
		if (word2 == 69) flag1 = true;
	} else {
		this.co_j.jimen_f = false;
	}
	if (this.co_j.jimen_f) {
		this.j_zan_f = false;
		this.j_jet_c = 0;
		if (this.gk.left_f) {
			if (flag1) this.co_j.vx -= 4;
			else this.co_j.vx -= 15;
			if (this.j_hashiru_f) {
				if (!this.j_mizu_f) {
					if (this.co_j.vx < -120) this.co_j.vx = -120;
				} else if (this.co_j.vx < -60) this.co_j.vx = -60;
				if (this.co_j.vx > 0 && !flag1) {
					this.co_j.pt = 108;
					this.co_j.ac = 0;
				} else {
					this.co_j.pt = 105 + (this.co_j.ac >> 1);
					this.co_j.ac++;
					if (this.co_j.ac > 3) this.co_j.ac = 0;
				}
			} else {
				if (!this.j_mizu_f) {
					if (this.co_j.vx < -60) this.co_j.vx = -60;
				} else if (this.co_j.vx < -40) this.co_j.vx = -40;
				if (this.co_j.vx > 0 && !flag1) {
					this.co_j.pt = 108;
					this.co_j.ac = 0;
				} else {
					this.co_j.pt = 103 + (this.co_j.ac >> 1);
					this.co_j.ac++;
					if (this.co_j.ac > 3) this.co_j.ac = 0;
				}
			}
			this.co_j.muki = 0;
		} else if (this.gk.right_f) {
			if (flag1) this.co_j.vx += 4;
			else this.co_j.vx += 15;
			if (this.j_hashiru_f) {
				if (!this.j_mizu_f) {
					if (this.co_j.vx > 120) this.co_j.vx = 120;
				} else if (this.co_j.vx > 60) this.co_j.vx = 60;
				if (this.co_j.vx < 0 && !flag1) {
					this.co_j.pt = 108;
					this.co_j.ac = 0;
				} else {
					this.co_j.pt = 105 + (this.co_j.ac >> 1);
					this.co_j.ac++;
					if (this.co_j.ac > 3) this.co_j.ac = 0;
				}
			} else {
				if (!this.j_mizu_f) {
					if (this.co_j.vx > 60) this.co_j.vx = 60;
				} else if (this.co_j.vx > 40) this.co_j.vx = 40;
				if (this.co_j.vx < 0 && !flag1) {
					this.co_j.pt = 108;
					this.co_j.ac = 0;
				} else {
					this.co_j.pt = 103 + (this.co_j.ac >> 1);
					this.co_j.ac++;
					if (this.co_j.ac > 3) this.co_j.ac = 0;
				}
			}
			this.co_j.muki = 1;
		} else if (this.co_j.vx < 0) {
			if (flag1) this.co_j.vx++;
			else this.co_j.vx += 5;
			if (this.co_j.vx > 0) this.co_j.vx = 0;
			if (this.j_hashiru_f || flag1) {
				this.co_j.pt = 107;
				this.co_j.ac = 0;
			} else {
				this.co_j.pt = 103 + (this.co_j.ac >> 1);
				this.co_j.ac++;
				if (this.co_j.ac > 3) this.co_j.ac = 0;
			}
			this.co_j.muki = 0;
		} else if (this.co_j.vx > 0) {
			if (flag1) this.co_j.vx--;
			else this.co_j.vx -= 5;
			if (this.co_j.vx < 0) this.co_j.vx = 0;
			if (this.j_hashiru_f || flag1) {
				this.co_j.pt = 107;
				this.co_j.ac = 0;
			} else {
				this.co_j.pt = 103 + (this.co_j.ac >> 1);
				this.co_j.ac++;
				if (this.co_j.ac > 3) this.co_j.ac = 0;
			}
			this.co_j.muki = 1;
		} else {
			this.co_j.ac = 0;
		}
	} else {
		if (this.gk.left_f) {
			if (!this.j_mizu_f && this.co_j.vx > -60) {
				this.co_j.vx -= 10;
				if (this.co_j.vx < -60) this.co_j.vx = -60;
			}
		} else if (this.gk.right_f && !this.j_mizu_f && this.co_j.vx < 60) {
			this.co_j.vx += 10;
			if (this.co_j.vx > 60) this.co_j.vx = 60;
		}
		if (this.j_mizu_f) {
			if (this.j_mizu_ac > 1) this.co_j.pt = 84;
			else this.co_j.pt = 83;
		} else if (this.j_jump_type == 0) {
			if (this.co_j.vy < 20) this.co_j.pt = 101;
			else this.co_j.pt = 102;
		} else if (this.j_jump_type == 2) {
			if (Math.abs(this.co_j.vx) <= 60) this.co_j.pt = 103;
			else this.co_j.pt = 105;
		} else if (this.j_jump_type == 3) this.co_j.pt = 119;
		else if (this.j_jump_type == 4) this.co_j.pt = 100;
		else this.co_j.pt = 109;
		this.co_j.ac = 2;
	}
	if (this.j_jdai_f) {
		this.co_j.vx = 0;
		this.co_j.pt = 100;
		this.co_j.ac = 0;
	}
	if (this.co_j.vx < 0) {
		this.co_j.x += rounddown(this.co_j.vx / 10);
		if (this.a_hf) {
			for (var i4 = 0; i4 <= this.a_kazu; i4++)
				if (this.co_a[i4].gf) {
					var characterobject = this.co_a[i4];
					if (characterobject.c >= 100 && characterobject.c < 200) {
						if (
							this.co_j.x + 15 >= characterobject.x &&
							this.co_j.x <= characterobject.x + 64 &&
							this.co_j.y + 31 >= characterobject.y &&
							this.co_j.y <= characterobject.y + 13
						) {
							this.co_j.x = characterobject.x + 65;
							this.co_j.vx = 0;
						}
					} else if (characterobject.c == 300) {
						if (
							this.co_j.x + 15 >= characterobject.x &&
							this.co_j.x <= characterobject.x + 48 &&
							this.co_j.y + 31 >= characterobject.y &&
							this.co_j.y <= characterobject.y + 31
						) {
							this.co_j.x = characterobject.x + 49;
							this.co_j.vx = 0;
						}
					} else if (characterobject.c == 400) {
						if (
							this.co_j.x + 15 >= characterobject.x &&
							this.co_j.x <= characterobject.x + 80 &&
							this.co_j.y + 31 >= characterobject.y &&
							this.co_j.y <= characterobject.y + 63
						) {
							this.co_j.x = characterobject.x + 81;
							this.co_j.vx = 0;
						}
					} else if (characterobject.c == 500) {
						if (
							this.co_j.x + 15 >= characterobject.x &&
							this.co_j.x <= characterobject.x + 80 &&
							this.co_j.y + 31 >= characterobject.y &&
							this.co_j.y <= characterobject.y + 13
						) {
							this.co_j.x = characterobject.x + 81;
							this.co_j.vx = 0;
						}
					} else if (characterobject.c == 600) {
						if (
							this.co_j.x + 15 >= characterobject.x &&
							this.co_j.x <= characterobject.x + 48 &&
							this.co_j.y + 31 >= characterobject.y + 16 &&
							this.co_j.y <= characterobject.y + 47
						) {
							this.co_j.x = characterobject.x + 49;
							this.co_j.vx = 0;
						}
					} else if (
						characterobject.c == 700 &&
						this.co_j.x + 15 >= characterobject.x &&
						this.co_j.x <= characterobject.x + 16 &&
						this.co_j.y + 31 >= characterobject.y &&
						this.co_j.y <= characterobject.y + 31
					) {
						this.co_j.x = characterobject.x + 17;
						this.co_j.vx = 0;
					}
				}
		}
		var k = (this.co_j.x + 15) >> 5;
		var word8 = this.maps.map_bg[k][this.co_j.y >> 5];
		var j2 = (this.co_j.y + 31) >> 5;
		var word4 = this.maps.map_bg[k][j2];
		if (word8 >= 20 || word4 >= 20) {
			this.co_j.x = k * 32 + 17;
			this.co_j.vx = 0;
		}
	} else if (this.co_j.vx > 0) {
		this.co_j.x += rounddown(this.co_j.vx / 10);
		if (this.a_hf) {
			for (var j4 = 0; j4 <= this.a_kazu; j4++)
				if (this.co_a[j4].gf) {
					var characterobject1 = this.co_a[j4];
					if (characterobject1.c >= 100 && characterobject1.c < 200) {
						if (
							this.co_j.x + 15 >= characterobject1.x &&
							this.co_j.x <= characterobject1.x + 64 &&
							this.co_j.y + 31 >= characterobject1.y &&
							this.co_j.y <= characterobject1.y + 13
						) {
							this.co_j.x = characterobject1.x - 16;
							this.co_j.vx = 0;
						}
					} else if (characterobject1.c == 300) {
						if (
							this.co_j.x + 15 >= characterobject1.x &&
							this.co_j.x <= characterobject1.x + 48 &&
							this.co_j.y + 31 >= characterobject1.y &&
							this.co_j.y <= characterobject1.y + 31
						) {
							this.co_j.x = characterobject1.x - 16;
							this.co_j.vx = 0;
						}
					} else if (characterobject1.c == 400) {
						if (
							this.co_j.x + 15 >= characterobject1.x &&
							this.co_j.x <= characterobject1.x + 80 &&
							this.co_j.y + 31 >= characterobject1.y &&
							this.co_j.y <= characterobject1.y + 63
						) {
							this.co_j.x = characterobject1.x - 16;
							this.co_j.vx = 0;
						}
					} else if (characterobject1.c == 500) {
						if (
							this.co_j.x + 15 >= characterobject1.x &&
							this.co_j.x <= characterobject1.x + 80 &&
							this.co_j.y + 31 >= characterobject1.y &&
							this.co_j.y <= characterobject1.y + 13
						) {
							this.co_j.x = characterobject1.x - 16;
							this.co_j.vx = 0;
						}
					} else if (characterobject1.c == 600) {
						if (
							this.co_j.x + 15 >= characterobject1.x &&
							this.co_j.x <= characterobject1.x + 48 &&
							this.co_j.y + 31 >= characterobject1.y + 16 &&
							this.co_j.y <= characterobject1.y + 47
						) {
							this.co_j.x = characterobject1.x - 16;
							this.co_j.vx = 0;
						}
					} else if (
						characterobject1.c == 700 &&
						this.co_j.x + 15 >= characterobject1.x &&
						this.co_j.x <= characterobject1.x + 16 &&
						this.co_j.y + 31 >= characterobject1.y &&
						this.co_j.y <= characterobject1.y + 31
					) {
						this.co_j.x = characterobject1.x - 16;
						this.co_j.vx = 0;
					}
				}
		}
		var l = (this.co_j.x + 15) >> 5;
		var word9 = this.maps.map_bg[l][this.co_j.y >> 5];
		var k2 = (this.co_j.y + 31) >> 5;
		var word5 = this.maps.map_bg[l][k2];
		if (word9 >= 20 || word5 >= 20) {
			this.co_j.x = l * 32 - 16;
			this.co_j.vx = 0;
		}
	}
	if (this.co_j.jimen_f) {
		if (this.tr1_c >= 1 && this.tr1_c <= 5) {
			if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y - 1) >= 20) {
				if (
					this.tr1_c == 1 &&
					this.maps.getBGCode(this.co_j.x + 15, this.co_j.y - 1) == 40
				) {
					var i5 = (this.co_j.x + 15) >> 5;
					var k6 = (this.co_j.y - 1) >> 5;
					this.hAttack(i5, k6);
				}
				i9 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y - 1);
				if (
					this.j_helm_f &&
					(i9 == 20 || (i9 == 69 && this.suberuyuka_hkf == 1))
				) {
					this.tr1_c = 6;
					var j5 = (this.co_j.x + 15) >> 5;
					var l6 = (this.co_j.y - 1) >> 5;
					if (
						this.maps.map_bg[(this.co_j.x + 15) >> 5][
							((this.co_j.y - 1) >> 5) + 1
						] == 4
					)
						this.maps.putBGCode(j5, l6, 4);
					else this.maps.putBGCode(j5, l6, 0);
					this.mSet2(j5 * 32, l6 * 32, 80, 12, -24);
					this.mSet2(j5 * 32, l6 * 32, 80, -12, -24);
					this.jZutuki(j5 * 32, l6 * 32 - 32, 0);
				}
			} else if (this.j_mizu_f) {
				this.j_jump_type = 0;
				this.co_j.pt = 83;
				this.co_j.ac = 0;
				this.j_mizu_ac = 0;
				this.j_jet_kf = false;
				if (this.j_jdai_f) {
					this.co_j.y = (this.co_j.y >> 5) * 32;
					this.co_j.vy = -120;
					this.j_jump_level = 0;
				} else if (Math.abs(this.co_j.vx) > 50) {
					this.co_j.vy = -90;
					this.j_jump_level = 0;
				} else {
					this.co_j.vy = -70;
					this.j_jump_level = 0;
				}
			} else {
				this.j_jump_type = 0;
				this.co_j.pt = 101;
				this.co_j.ac = 0;
				if (this.j_fire_f)
					if (this.co_j.muki == 0)
						this.jmSet(this.co_j.x, this.co_j.y, 100);
					else this.jmSet(this.co_j.x, this.co_j.y, 105);
				this.j_jet_kf = false;
				var k8 = Math.abs(this.co_j.vx);
				if (this.j_jdai_f) {
					this.co_j.y = (this.co_j.y >> 5) * 32;
					this.co_j.vy = -410;
					this.j_jump_level = 5;
					if (this.co_a[this.j_a_id].c3 <= 1) this.co_j.vy = -230;
				} else if (k8 == 0) {
					this.co_j.vy = -150;
					this.j_jump_level = 1;
				} else if (k8 < 60) {
					this.co_j.vy = -230;
					this.j_jump_level = 2;
				} else if (k8 == 60) {
					this.co_j.vy = -260;
					this.j_jump_level = 3;
				} else if (k8 < 120) {
					this.co_j.vy = -290;
					this.j_jump_level = 4;
				} else {
					this.co_j.vy = -340;
					this.j_jump_level = 5;
					i9 = this.maps.map_bg[(this.co_j.x + 15) >> 5][
						(this.co_j.y - 1) >> 5
					];
					if (i9 <= 9) {
						for (var l3 = 0; l3 <= 5; l3++) {
							this.j_zan_x[l3] = j3;
							this.j_zan_y[l3] = k3;
							this.j_zan_pt[l3] = 101;
							this.j_zan_pth[l3] = this.co_j.muki;
						}

						this.j_zan_p = 0;
						this.j_zan_c = 0;
						this.j_zan_nagasa = 5;
						this.j_zan_f = true;
					}
				}
			}
		} else {
			this.co_j.vy = 0;
		}
	} else if (!this.j_mizu_f) {
		this.co_j.vy += 25;
		if (this.co_j.vy > 160) this.co_j.vy = 160;
		if (this.tr1_c == 1 && this.j_fire_f)
			if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 100);
			else this.jmSet(this.co_j.x, this.co_j.y, 105);
		if (this.tr1_c == 0) this.j_jet_kf = true;
		if (
			this.j_jet_kf &&
			this.tr1_c > 0 &&
			this.j_jet_fuel > 0 &&
			!this.j_mizu_f
		) {
			this.j_jet_c = 100;
			if (this.j_jump_type == 2) this.j_jump_type = 0;
		} else if (this.j_jet_c > 96) this.j_jet_c--;
		else this.j_jet_c = 0;
		if (this.j_jet_c >= 96) {
			this.j_jet_fuel--;
			if (this.j_jet_fuel < 0) {
				this.j_jet_fuel = 0;
				this.j_jet_c = 0;
			}
			if (this.gk.left_f) this.co_j.muki = 0;
			else if (this.gk.right_f) this.co_j.muki = 1;
			if (this.co_j.vy > -150) {
				this.co_j.vy -= 50;
				if (this.co_j.vy < -150) this.co_j.vy = -150;
			}
		}
	} else {
		if (this.gk.left_f) this.co_j.muki = 0;
		else if (this.gk.right_f) this.co_j.muki = 1;
		if (this.tr1_c == 1) {
			var flag2 = false;
			i9 = this.maps.map_bg[(this.co_j.x + 15) >> 5][
				((this.co_j.y + 15) >> 5) - 1
			];
			if (i9 <= 9 && i9 != 4) flag2 = true;
			if (
				(i9 == 8 || i9 == 9) &&
				this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][
					((this.co_j.y + 15) >> 5) - 1
				] == 4
			)
				flag2 = false;
			if (flag2 && (this.co_j.y + 15) % 32 <= 8) {
				this.j_jump_type = 0;
				this.co_j.pt = 101;
				this.co_j.ac = 0;
				this.co_j.vy = -180;
				this.j_jump_level = 1;
				this.co_j.y = ((this.co_j.y + 15) >> 5) * 32 - 14;
				this.j_jet_kf = false;
				flag = true;
				this.mSet(this.co_j.x, ((this.co_j.y + 15) >> 5) * 32 - 32, 50);
			} else {
				this.j_jump_type = 0;
				this.co_j.ac = 0;
				if (this.j_mizu_ac <= 0) {
					this.j_mizu_ac = 4;
					this.co_j.pt = 84;
				}
				this.co_j.vy = -40;
				this.j_jump_level = 0;
				if (this.co_j.muki == 0) {
					this.co_j.vx -= 30;
					if (this.co_j.vx < -60) this.co_j.vx = -60;
				} else {
					this.co_j.vx += 30;
					if (this.co_j.vx > 60) this.co_j.vx = 60;
				}
			}
		} else {
			if (this.co_j.vx < 0) {
				if (this.co_j.muki == 0) this.co_j.vx++;
				else this.co_j.vx += 2;
				if (this.co_j.vx > 0) this.co_j.vx = 0;
			} else if (this.co_j.vx > 0) {
				if (this.co_j.muki == 1) this.co_j.vx--;
				else this.co_j.vx -= 2;
				if (this.co_j.vx < 0) this.co_j.vx = 0;
			}
			if (this.co_j.vy < 40) {
				this.co_j.vy += 5;
				if (this.co_j.vy > 40) this.co_j.vy = 40;
			} else if (this.co_j.vy > 40) {
				this.co_j.vy -= 20;
				if (this.co_j.vy < 40) this.co_j.vy = 40;
			}
			if (this.j_mizu_ac > 0) {
				this.j_mizu_ac--;
				if (this.j_mizu_ac > 1) this.co_j.pt = 84;
				else this.co_j.pt = 83;
			} else {
				this.co_j.pt = 83;
			}
		}
	}
	if (this.co_j.vy < 0) {
		var i1 = (this.co_j.x + 15) >> 5;
		var i2 = this.co_j.y >> 5;
		var word3 = this.maps.map_bg[i1][i2];
		var l8 = this.co_j.vy;
		if (l8 < -320) l8 = -320;
		this.co_j.y += rounddown(l8 / 10);
		if (this.j_mizu_f && !flag) {
			var i8 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15);
			var flag3 = false;
			if (i8 <= 9 && i8 != 4) flag3 = true;
			if (
				(i8 == 8 || i8 == 9) &&
				this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][
					(this.co_j.y + 15) >> 5
				] == 4
			)
				flag3 = false;
			if (flag3) {
				this.co_j.y = ((this.co_j.y + 15) >> 5) * 32 + 17;
				this.co_j.vy = -10;
			}
		}
		if (this.a_hf) {
			for (var k4 = 0; k4 <= this.a_kazu; k4++)
				if (this.co_a[k4].gf) {
					var characterobject2 = this.co_a[k4];
					if (characterobject2.c >= 100 && characterobject2.c < 200) {
						if (
							this.co_j.x + 15 >= characterobject2.x &&
							this.co_j.x <= characterobject2.x + 64 &&
							this.co_j.y + 31 >= characterobject2.y &&
							this.co_j.y <= characterobject2.y + 13
						) {
							this.co_j.y = characterobject2.y + 14;
							this.co_j.vy = 0;
						}
					} else if (characterobject2.c == 300) {
						if (
							this.co_j.x + 15 >= characterobject2.x &&
							this.co_j.x <= characterobject2.x + 48 &&
							this.co_j.y + 31 >= characterobject2.y &&
							this.co_j.y <= characterobject2.y + 31
						) {
							this.co_j.y = characterobject2.y + 32;
							this.co_j.vy = 0;
						}
					} else if (characterobject2.c == 400) {
						if (
							this.co_j.x + 15 >= characterobject2.x &&
							this.co_j.x <= characterobject2.x + 80 &&
							this.co_j.y + 31 >= characterobject2.y &&
							this.co_j.y <= characterobject2.y + 63
						) {
							this.co_j.y = characterobject2.y + 64;
							this.co_j.vy = 0;
						}
					} else if (characterobject2.c == 500) {
						if (
							this.co_j.x + 15 >= characterobject2.x &&
							this.co_j.x <= characterobject2.x + 80 &&
							this.co_j.y + 31 >= characterobject2.y &&
							this.co_j.y <= characterobject2.y + 13
						) {
							this.co_j.y = characterobject2.y + 14;
							this.co_j.vy = 0;
						}
					} else if (characterobject2.c == 600) {
						if (
							this.co_j.x + 15 >= characterobject2.x &&
							this.co_j.x <= characterobject2.x + 48 &&
							this.co_j.y + 31 >= characterobject2.y + 16 &&
							this.co_j.y <= characterobject2.y + 47
						) {
							this.co_j.y = characterobject2.y + 48;
							this.co_j.vy = 0;
						}
					} else if (
						characterobject2.c == 700 &&
						this.co_j.x + 15 >= characterobject2.x &&
						this.co_j.x <= characterobject2.x + 16 &&
						this.co_j.y + 31 >= characterobject2.y &&
						this.co_j.y <= characterobject2.y + 31
					) {
						this.co_j.y = characterobject2.y + 32;
						this.co_j.vy = 0;
					}
				}
		}
		var i3 = this.co_j.y >> 5;
		var word10 = this.maps.map_bg[(this.co_j.x + 15) >> 5][i3];
		if (word10 >= 20) {
			this.co_j.y = i3 * 32 + 32;
			this.co_j.vy = 0;
			if (word10 == 40) {
				var k5 = (this.co_j.x + 15) >> 5;
				var i7 = (this.co_j.y - 1) >> 5;
				this.hAttack(k5, i7);
			}
			if (
				this.j_helm_f &&
				(word10 == 20 || (word10 == 69 && this.suberuyuka_hkf == 1))
			) {
				var l5 = (this.co_j.x + 15) >> 5;
				var j7 = i3;
				if (this.maps.map_bg[l5][j7 + 1] == 4)
					this.maps.putBGCode(l5, j7, 4);
				else this.maps.putBGCode(l5, j7, 0);
				this.mSet2(l5 * 32, j7 * 32, 80, 12, -24);
				this.mSet2(l5 * 32, j7 * 32, 80, -12, -24);
				this.jZutuki(l5 * 32, j7 * 32 - 32, 0);
			}
		}
		if (i2 > i3) {
			if (this.gk.right_f) {
				var word11 = this.maps.map_bg[(this.co_j.x + 16) >> 5][i2];
				var word15 = this.maps.map_bg[(this.co_j.x + 16) >> 5][i3];
				if (word11 <= 9 && word15 >= 20) {
					this.co_j.y = i3 * 32 + 32;
					this.co_j.vy = 0;
				}
			}
			if (this.gk.left_f) {
				var word12 = this.maps.map_bg[(this.co_j.x + 14) >> 5][i2];
				var word16 = this.maps.map_bg[(this.co_j.x + 14) >> 5][i3];
				if (word12 <= 9 && word16 >= 20) {
					this.co_j.y = i3 * 32 + 32;
					this.co_j.vy = 0;
				}
			}
		}
	} else if (this.co_j.vy > 0) {
		var j = (this.co_j.x + 15) >> 5;
		var k1 = (this.co_j.y + 31) >> 5;
		var word1 = this.maps.map_bg[j][k1];
		this.co_j.y += rounddown(this.co_j.vy / 10);
		if (this.a_hf) {
			for (var l4 = 0; l4 <= this.a_kazu; l4++)
				if (this.co_a[l4].gf) {
					var characterobject3 = this.co_a[l4];
					if (characterobject3.c >= 100 && characterobject3.c < 200) {
						if (
							this.co_j.x + 15 >= characterobject3.x &&
							this.co_j.x <= characterobject3.x + 64 &&
							this.co_j.y + 31 >= characterobject3.y &&
							this.co_j.y <= characterobject3.y + 13
						) {
							this.co_j.y = characterobject3.y - 32;
							this.co_j.vy = 0;
						}
					} else if (characterobject3.c == 300) {
						if (
							this.co_j.x + 15 >= characterobject3.x &&
							this.co_j.x <= characterobject3.x + 48 &&
							this.co_j.y + 31 >= characterobject3.y &&
							this.co_j.y <= characterobject3.y + 31
						) {
							this.co_j.y = characterobject3.y - 32;
							this.co_j.vy = 0;
						}
					} else if (characterobject3.c == 400) {
						if (
							this.co_j.x + 15 >= characterobject3.x &&
							this.co_j.x <= characterobject3.x + 80 &&
							this.co_j.y + 31 >= characterobject3.y &&
							this.co_j.y <= characterobject3.y + 63
						) {
							this.co_j.y = characterobject3.y - 32;
							this.co_j.vy = 0;
						}
					} else if (characterobject3.c == 500) {
						if (
							this.co_j.x + 15 >= characterobject3.x &&
							this.co_j.x <= characterobject3.x + 80 &&
							this.co_j.y + 31 >= characterobject3.y &&
							this.co_j.y <= characterobject3.y + 13
						) {
							this.co_j.y = characterobject3.y - 32;
							this.co_j.vy = 0;
						}
					} else if (characterobject3.c == 600) {
						if (
							this.co_j.x + 15 >= characterobject3.x &&
							this.co_j.x <= characterobject3.x + 48 &&
							this.co_j.y + 31 >= characterobject3.y + 16 &&
							this.co_j.y <= characterobject3.y + 47
						) {
							this.co_j.y = characterobject3.y + 16 - 32;
							this.co_j.vy = 0;
						}
					} else if (
						characterobject3.c == 700 &&
						this.co_j.x + 15 >= characterobject3.x &&
						this.co_j.x <= characterobject3.x + 16 &&
						this.co_j.y + 31 >= characterobject3.y &&
						this.co_j.y <= characterobject3.y + 31
					) {
						this.co_j.y = characterobject3.y - 32;
						this.co_j.vy = 0;
					}
				}
		}
		var l2 = (this.co_j.y + 31) >> 5;
		var word6 = this.maps.map_bg[j][l2];
		if (word6 >= 20) {
			this.co_j.y = l2 * 32 - 32;
			this.co_j.vy = 0;
			l2 = (this.co_j.y + 31) >> 5;
			var word7 = this.maps.map_bg[j][l2];
		}
		if (k1 < l2) {
			if (this.gk.right_f) {
				var word13 = this.maps.map_bg[(this.co_j.x + 16) >> 5][k1];
				var word17 = this.maps.map_bg[(this.co_j.x + 16) >> 5][l2];
				if (word13 <= 9 && word17 >= 20) {
					this.co_j.y = l2 * 32 - 32;
					this.co_j.vy = 0;
					this.co_j.pt = 103;
					this.co_j.ac = 1;
					this.co_j.x++;
				}
			}
			if (this.gk.left_f) {
				var word14 = this.maps.map_bg[(this.co_j.x + 14) >> 5][k1];
				var word18 = this.maps.map_bg[(this.co_j.x + 14) >> 5][l2];
				if (word14 <= 9 && word18 >= 20) {
					this.co_j.y = l2 * 32 - 32;
					this.co_j.vy = 0;
					this.co_j.pt = 103;
					this.co_j.ac = 1;
					this.co_j.x--;
				}
			}
		}
		if (!this.j_mizu_f) {
			var j8 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15);
			if (j8 == 4) {
				this.mSet(this.co_j.x, ((this.co_j.y + 15) >> 5) * 32 - 32, 50);
				this.j_mizu_awa_c = 38;
				if (this.co_j.vx < -60) this.co_j.vx = -60;
				else if (this.co_j.vx > 60) this.co_j.vx = 60;
			} else if (
				(j8 == 8 || j8 == 9) &&
				this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][
					(this.co_j.y + 15) >> 5
				] == 4
			) {
				this.mSet(this.co_j.x, ((this.co_j.y + 15) >> 5) * 32 - 32, 50);
				this.j_mizu_awa_c = 38;
				if (this.co_j.vx < -60) this.co_j.vx = -60;
				else if (this.co_j.vx > 60) this.co_j.vx = 60;
			}
		}
	}
	if (this.tr2_c == 1) {
		if (this.j_gr_kazu > 0) {
			if (this.grenade_type == 3 || this.grenade_type == 4) {
				if (this.co_j.muki == 0)
					this.jmSet(this.co_j.x, this.co_j.y, 60);
				else this.jmSet(this.co_j.x, this.co_j.y, 65);
			} else if (this.co_j.muki == 0)
				this.jmSet(this.co_j.x, this.co_j.y, 200);
			else this.jmSet(this.co_j.x, this.co_j.y, 205);
		} else if (this.j_fire_f && (!this.j_mizu_f || this.j_fire_mkf))
			if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 100);
			else this.jmSet(this.co_j.x, this.co_j.y, 105);
		i9 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32);
		if (
			this.j_drell_f &&
			(i9 == 20 || (i9 == 69 && this.suberuyuka_hkf == 1))
		) {
			var i6 = (this.co_j.x + 15) >> 5;
			var k7 = (this.co_j.y + 32) >> 5;
			if (
				this.maps.map_bg[(this.co_j.x + 15) >> 5][
					((this.co_j.y + 32) >> 5) - 1
				] == 4
			)
				this.maps.putBGCode(i6, k7, 4);
			else this.maps.putBGCode(i6, k7, 0);
			this.mSet2(i6 * 32, k7 * 32, 80, 12, -24);
			this.mSet2(i6 * 32, k7 * 32, 80, -12, -24);
			this.jZutuki(i6 * 32, k7 * 32 - 32, 0);
			this.co_j.x = i6 * 32;
			this.co_j.vx = 0;
			this.co_j.vy = 0;
			this.j_jump_type = 3;
			this.co_j.c = 120;
			this.co_j.c1 = 0;
			this.co_j.pt = 119;
		} else if (
			this.j_tail_f &&
			(this.j_tail_ac <= 0 || this.j_tail_ac >= 8)
		) {
			this.j_tail_ac = 1;
			this.co_j.pt = 116;
			this.j_zan_f = false;
		}
	}
	if (this.j_tail_ac >= 1) {
		this.j_zan_f = false;
		this.j_tail_ac++;
		if (this.j_tail_ac <= 4) {
			this.co_j.pt = 116;
			if (this.j_tail_type == 1 || this.j_tail_type == 3)
				if (this.co_j.muki == 0)
					this.jZutuki(this.co_j.x - 32, this.co_j.y, 1);
				else this.jZutuki(this.co_j.x + 32, this.co_j.y, 1);
		} else if (this.j_tail_ac <= 5) {
			this.co_j.pt = 1000;
			if (this.j_tail_type == 1 || this.j_tail_type == 3)
				if (this.co_j.muki == 0)
					this.jZutuki(this.co_j.x - 32, this.co_j.y, 1);
				else this.jZutuki(this.co_j.x + 32, this.co_j.y, 1);
			if (this.j_tail_type == 2 || this.j_tail_type == 3) {
				var j6;
				if (this.co_j.muki == 1) j6 = (this.co_j.x + 40) >> 5;
				else j6 = (this.co_j.x - 8) >> 5;
				var l7 = (this.co_j.y + 15) >> 5;
				if (
					this.maps.map_bg[j6][l7] == 20 ||
					(this.maps.map_bg[j6][l7] == 69 && this.suberuyuka_hkf == 1)
				) {
					if (this.maps.map_bg[j6 - 1][l7] == 4)
						this.maps.putBGCode(j6, l7, 4);
					else this.maps.putBGCode(j6, l7, 0);
					this.mSet2(j6 * 32, l7 * 32, 80, 12, -24);
					this.mSet2(j6 * 32, l7 * 32, 80, -12, -24);
					this.jZutuki(j6 * 32, l7 * 32 - 32, 0);
				}
			}
		} else if (this.j_tail_ac <= 7) this.co_j.pt = 1000;
		else if (this.j_tail_ac <= 9) {
			this.co_j.pt = 116;
		} else {
			this.co_j.pt = 116;
			this.j_tail_ac = 0;
		}
	}
	i9 = this.maps.map_bg[(this.co_j.x + 15) >> 5][(this.co_j.y + 15) >> 5];
	switch (i9) {
		case 9:
			if (
				this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][
					(this.co_j.y + 15) >> 5
				] == 4
			) {
				this.maps.putBGCode(
					(this.co_j.x + 15) >> 5,
					(this.co_j.y + 15) >> 5,
					4
				);
				this.j_mizu_f = true;
			} else {
				this.maps.putBGCode(
					(this.co_j.x + 15) >> 5,
					(this.co_j.y + 15) >> 5,
					0
				);
			}
			this.addScore(5);
			break;

		case 8:
			if (
				this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][
					(this.co_j.y + 15) >> 5
				] == 4
			) {
				this.maps.putBGCode(
					(this.co_j.x + 15) >> 5,
					(this.co_j.y + 15) >> 5,
					4
				);
				this.j_mizu_f = true;
			} else {
				this.maps.putBGCode(
					(this.co_j.x + 15) >> 5,
					(this.co_j.y + 15) >> 5,
					0
				);
			}
			this.stage_cc = 1;
			if (this.stage_max >= 2 && this.stage >= this.stage_max)
				this.addScore(1000);
			else this.addScore(100);
			break;

		case 5:
			this.co_j.y = ((this.co_j.y + 15) >> 5) * 32;
			this.jShinu(1);
			break;

		case 6:
			this.co_j.y = ((this.co_j.y + 15) >> 5) * 32;
			this.jShinu(1);
			break;
	}
	if (
		this.co_j.y >= this.ochiru_y ||
		(this.j_mizu_f && this.co_j.y >= this.ochiru_y - 16)
	) {
		this.co_j.c = 210;
		this.co_j.c1 = 0;
		this.co_j.y = this.ochiru_y + 64;
		this.j_jet_c = 0;
		this.j_v_c = 0;
	}
	this.co_j.wx = this.co_j.x - this.maps.wx;
	this.co_j.wy = this.co_j.y - this.maps.wy;
	if (this.co_j.wx < 96) this.maps.wx = this.co_j.x - 96;
	else if (this.co_j.wx > 224) this.maps.wx = this.co_j.x - 224;
	if (this.co_j.wy < 78) this.maps.wy = this.co_j.y - 78;
	else if (this.co_j.wy > 176) this.maps.wy = this.co_j.y - 176;
	if (this.maps.wx < this.maps.wx_mini) this.maps.wx = this.maps.wx_mini;
	else if (this.maps.wx > this.maps.wx_max) this.maps.wx = this.maps.wx_max;
	if (this.maps.wy < this.maps.wy_mini) this.maps.wy = this.maps.wy_mini;
	else if (this.maps.wy > this.maps.wy_max) this.maps.wy = this.maps.wy_max;
};

MainProgram.prototype.jMove = function() {
	var flag = false;
	this.j_mizu_f = false;
	var k = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15);
	if (k == 4) {
		this.j_mizu_f = true;
		this.j_jet_c = 0;
		this.j_mizu_awa_c++;
		if (this.j_mizu_awa_c == 44 || this.j_mizu_awa_c == 54)
			this.mSet(this.co_j.x, this.co_j.y + 4, 60);
		else if (this.j_mizu_awa_c > 54) this.j_mizu_awa_c = 0;
	} else if (
		(k == 8 || k == 9) &&
		this.maps.map_bg[((this.co_j.x + 15) >> 5) - 1][
			(this.co_j.y + 15) >> 5
		] == 4
	) {
		this.j_mizu_f = true;
		this.j_jet_c = 0;
		this.j_mizu_awa_c++;
		if (this.j_mizu_awa_c == 44 || this.j_mizu_awa_c == 54)
			this.mSet(this.co_j.x, this.co_j.y + 4, 60);
		else if (this.j_mizu_awa_c > 54) this.j_mizu_awa_c = 0;
	}
	if (this.gk.tr1_f) {
		if (this.tr1_c < 6) this.tr1_c++;
	} else {
		this.tr1_c = 0;
	}
	if (this.gk.tr2_f) {
		if (this.tr2_c < 2) this.tr2_c++;
	} else {
		this.tr2_c = 0;
	}
	if (this.gk.left_f) {
		if (this.gk.left_c < 2) this.gk.left_c++;
	} else {
		this.gk.left_c = 0;
	}
	if (this.gk.right_f) {
		if (this.gk.right_c < 2) this.gk.right_c++;
	} else {
		this.gk.right_c = 0;
	}
	if (this.gk.left_c == 1) {
		if (this.left_dcc > 0) this.j_hashiru_f = true;
		else this.j_hashiru_f = false;
		this.left_dcc = 8;
	} else if (this.left_dcc > 0) this.left_dcc--;
	if (this.gk.right_c == 1) {
		if (this.right_dcc > 0) this.j_hashiru_f = true;
		else this.j_hashiru_f = false;
		this.right_dcc = 8;
	} else if (this.right_dcc > 0) this.right_dcc--;
	if (this.co_j.c == 110) {
		if (this.gk.left_f) {
			this.co_j.vx -= 10;
			if (this.co_j.vx < -60) this.co_j.vx = -60;
		} else if (this.gk.right_f) {
			this.co_j.vx += 10;
			if (this.co_j.vx > 60) this.co_j.vx = 60;
		}
		this.co_j.c1++;
		if (this.co_j.c1 > 2) this.co_j.c = 100;
		this.co_j.pt = 109;
	} else if (this.co_j.c == 120) {
		this.co_j.c1++;
		if (this.co_j.c1 > 6) this.co_j.c = 100;
		this.co_j.pt = 119;
	} else if (this.co_j.c == 200) {
		this.co_j.vy += 25;
		if (this.co_j.vy > 100) this.co_j.vy = 100;
		this.co_j.y += rounddown(this.co_j.vy / 10);
		this.co_j.wx = this.co_j.x - this.maps.wx;
		this.co_j.wy = this.co_j.y - this.maps.wy;
		if (this.co_j.c2 < 100) {
			if (this.co_j.c1 <= 0) {
				this.co_j.pt = 110;
				this.co_j.muki = 0;
			} else if (this.co_j.c1 <= 1) {
				this.co_j.pt = 111;
				this.co_j.muki = 0;
				this.co_j.c2++;
				if (this.co_j.c2 > 4) this.co_j.c2 = 100;
			} else if (this.co_j.c1 <= 2) {
				this.co_j.pt = 112;
				this.co_j.muki = 0;
			} else {
				this.co_j.pt = 113;
				this.co_j.muki = 0;
			}
			this.co_j.c1++;
			if (this.co_j.c1 > 3) this.co_j.c1 = 0;
		} else {
			this.co_j.pt = 112;
			this.co_j.muki = 0;
		}
		if (this.co_j.wy >= 320) {
			this.co_j.c = 210;
			this.co_j.c1 = 0;
			this.co_j.y = this.maps.wy + 320 + 32;
			this.co_j.pt = 0;
		}
	} else if (this.co_j.c == 210) {
		if (this.stage_cc <= 0) {
			this.co_j.c1++;
			if (this.co_j.c1 > 16) {
				this.j_left--;
				if (this.j_left < 0) {
					this.j_left = 0;
					this.ml_mode = 300;
				} else if (this.stage_select == 2) this.ml_mode = 250;
				else this.ml_mode = 90;
			}
		}
	} else if (this.co_j.c == 220) {
		this.co_j.pt = 114;
		this.co_j.c1++;
		if (this.co_j.c1 >= 25) {
			this.co_j.c = 210;
			this.co_j.c1 = 0;
		}
	} else if (this.co_j.c == 230) {
		this.co_j.pt = 115;
		this.co_j.c1++;
		if (this.co_j.c1 >= 25) {
			this.co_j.c = 210;
			this.co_j.c1 = 0;
		}
	} else if (this.co_j.c == 240) {
		if (this.co_j.c2 >= 100) this.co_j.y += 10;
		this.co_j.wx = this.co_j.x - this.maps.wx;
		this.co_j.wy = this.co_j.y - this.maps.wy;
		if (this.co_j.c2 < 100) {
			if (this.co_j.c1 <= 0) {
				this.co_j.pt = 110;
				this.co_j.muki = 0;
			} else if (this.co_j.c1 <= 1) {
				this.co_j.pt = 111;
				this.co_j.muki = 0;
				this.co_j.c2++;
				if (this.co_j.c2 > 4) this.co_j.c2 = 100;
			} else if (this.co_j.c1 <= 2) {
				this.co_j.pt = 112;
				this.co_j.muki = 0;
			} else {
				this.co_j.pt = 113;
				this.co_j.muki = 0;
			}
			this.co_j.c1++;
			if (this.co_j.c1 > 3) this.co_j.c1 = 0;
		} else {
			this.co_j.pt = 112;
			this.co_j.muki = 0;
		}
		if (this.co_j.wy >= 320) {
			this.co_j.c = 210;
			this.co_j.c1 = 0;
			this.co_j.y = this.maps.wy + 320 + 32;
			this.co_j.pt = 0;
		}
	} else if (this.co_j.c == 300) {
		this.co_j.pt = 1100;
		this.co_j.c1++;
		if (this.co_j.c1 >= 32) {
			this.co_j.c = 310;
			this.co_j.c1 = 0;
			this.co_j.pt = 1110;
		}
		this.co_j.wx = this.co_j.x - this.maps.wx;
		this.co_j.wy = this.co_j.y - this.maps.wy;
		if (this.co_j.wx < 96) this.maps.wx = this.co_j.x - 96;
		else if (this.co_j.wx > 224) this.maps.wx = this.co_j.x - 224;
		if (this.co_j.wy < 78) this.maps.wy = this.co_j.y - 78;
		else if (this.co_j.wy > 176) this.maps.wy = this.co_j.y - 176;
		if (this.maps.wx < this.maps.wx_mini) this.maps.wx = this.maps.wx_mini;
		else if (this.maps.wx > this.maps.wx_max)
			this.maps.wx = this.maps.wx_max;
		if (this.maps.wy < this.maps.wy_mini) this.maps.wy = this.maps.wy_mini;
		else if (this.maps.wy > this.maps.wy_max)
			this.maps.wy = this.maps.wy_max;
	} else if (this.co_j.c == 310) {
		this.co_j.pt = 1110;
		if (this.stage_cc <= 0) {
			this.co_j.c1++;
			if (this.dokan_mode == 2) {
				if (this.co_j.c1 >= 10) {
					this.co_j.c = 320;
					this.co_j.c1 = 42;
					var i;
					for (i = 0; i <= this.a_kazu; i++) {
						if (
							this.co_a[i].c != 300 ||
							this.co_a[i].c4 == 1 ||
							this.co_j.c2 != this.co_a[i].c3 ||
							(this.sl_step != 0 &&
								this.sl_step != 1 &&
								this.sl_step != 10 &&
								this.sl_step != 11)
						)
							continue;
						this.co_j.x = this.co_a[i].x + 16;
						this.co_j.y = this.co_a[i].y - 32;
						this.co_a[i].c4 = 1;
						break;
					}

					if (i <= this.a_kazu);
					for (var j = 0; j <= this.a_kazu; j++)
						if (this.co_a[j].c >= 100 || this.co_a[j].c == 60) {
							this.co_a[j].gf = true;
							if (
								this.co_a[j].c == 300 &&
								(this.co_j.x != this.co_a[j].x + 16 ||
									this.co_j.y != this.co_a[j].y - 32)
							)
								this.co_a[j].c4 = 0;
						}

					if (this.sl_step == 10 || this.sl_step == 11) {
						this.maps.wx = this.co_j.x - 192;
						this.ks_wx = this.maps.wx;
					}
					this.co_j.wx = this.co_j.x - this.maps.wx;
					this.co_j.wy = this.co_j.y - this.maps.wy;
					if (this.co_j.wx < 96) this.maps.wx = this.co_j.x - 96;
					else if (this.co_j.wx > 224)
						this.maps.wx = this.co_j.x - 224;
					if (this.co_j.wy < 78) this.maps.wy = this.co_j.y - 78;
					else if (this.co_j.wy > 176)
						this.maps.wy = this.co_j.y - 176;
					if (this.maps.wx < this.maps.wx_mini)
						this.maps.wx = this.maps.wx_mini;
					else if (this.maps.wx > this.maps.wx_max)
						this.maps.wx = this.maps.wx_max;
					if (this.maps.wy < this.maps.wy_mini)
						this.maps.wy = this.maps.wy_mini;
					else if (this.maps.wy > this.maps.wy_max)
						this.maps.wy = this.maps.wy_max;
				}
			} else if (this.co_j.c1 == 10) {
				var s;
				if (this.co_j.c2 == 1) s = this.gg.ap.getParameter("url2");
				else if (this.co_j.c2 == 2) s = this.gg.ap.getParameter("url3");
				else if (this.co_j.c2 == 3) s = this.gg.ap.getParameter("url4");
				else s = this.gg.ap.getParameter("url1");
				location.href = s;
			} else if (this.co_j.c1 > 80) this.ml_mode = 50;
		}
	} else if (this.co_j.c == 320) {
		this.co_j.pt = 1100;
		this.co_j.c1--;
		if (this.co_j.c1 <= 0) {
			this.co_j.c = 100;
			this.co_j.c1 = 0;
			this.co_j.pt = 100;
		}
	}
};

MainProgram.prototype.jShinu = function(i) {
	this.co_j.c1 = 0;
	this.co_j.c2 = 0;
	this.j_zan_f = false;
	this.j_jet_c = 0;
	this.j_v_c = 0;
	if (i == 1) this.co_j.c = 240;
	else if (i == 2) {
		this.co_j.c = 200;
		this.co_j.vy = -280;
	} else if (i == 3) this.co_j.c = 220;
};

MainProgram.prototype.jZutuki = function(i, j, k) {
	for (var l = 0; l <= this.t_kazu; l++)
		if (this.co_t[l].c >= 100) {
			var characterobject = this.co_t[l];
			var flag = false;
			if (k == 1) {
				if (
					Math.abs(i - characterobject.x) < 25 &&
					Math.abs(j - characterobject.y) < 23
				)
					flag = true;
			} else if (
				Math.abs(i - characterobject.x) < 34 &&
				j == characterobject.y
			)
				flag = true;
			if (flag) {
				if (i > characterobject.x) {
					characterobject.pth = 1;
					characterobject.vx = -7;
				} else {
					characterobject.pth = 0;
					characterobject.vx = 7;
				}
				characterobject.c = 52;
				characterobject.vy = -32;
			}
		}
};

/**
 * 敵を追加する
 * @param x {number} X座標(ピクセル座標)
 * @param y {number} Y座標(ピクセル座標)
 * @param teki_type {(string|number)} 敵の種類
 * @param l {number} その敵が出現するスクロール位置
 */
MainProgram.prototype.tSet = function(x, y, teki_type, l) {
	for (let i = 0; i <= 119; i++) {
		if (this.co_t[i].c > 0) continue;
		const characterobject = this.co_t[i];
		characterobject.c = 10;
		characterobject.c1 = l;
		characterobject.c2 = teki_type;
		characterobject.c3 = x;
		characterobject.c4 = y;
		characterobject.x = x;
		characterobject.y = y;
		this.t_kazu++;
		switch (teki_type) {
			case 500:
				characterobject.y = y - 12;
				characterobject.c3 = y - 52;
				characterobject.c4 = y - 12;
				characterobject.vy = -4;
				break;

			case 600:
				characterobject.c3 = 0;
				break;

			case 900:
				if (this.airms_kf) characterobject.c2 = 950;
				break;
		}
		break;
	}
};

MainProgram.prototype.tSetBoss = function(i, j, k, l) {
	this.t_kazu = 129;
	for (var i1 = 120; i1 <= 129; i1++) {
		if (this.co_t[i1].c > 0) continue;
		var characterobject = this.co_t[i1];
		characterobject.c = k;
		characterobject.c1 = 0;
		characterobject.c2 = 0;
		characterobject.c3 = i;
		characterobject.c4 = j;
		characterobject.x = i;
		characterobject.y = j;
		characterobject.vx = l;
		switch (k) {
			case 150:
				characterobject.vx = l;
				characterobject.vy = -28;
				if (characterobject.vx <= 0) characterobject.muki = 0;
				else characterobject.muki = 1;
				break;

			case 450:
				characterobject.vx = l;
				characterobject.vy = -22;
				if (characterobject.vx <= 0) characterobject.muki = 0;
				else characterobject.muki = 1;
				break;

			case 650:
				characterobject.vx = l;
				characterobject.vy = -28;
				if (characterobject.vx <= 0) characterobject.muki = 0;
				else characterobject.muki = 1;
				break;
		}
		break;
	}
};

MainProgram.prototype.tMove = function() {
	var flag = false;
	for (var i = 0; i <= this.t_kazu; i++)
		if (this.co_t[i].c != 0 && this.co_t[i].x >= this.maps.wx - 512) {
			var characterobject = this.co_t[i];
			var j = characterobject.x;
			var k = characterobject.y;
			switch (characterobject.c) {
				case 10:
					if (this.maps.wx >= characterobject.c1) {
						characterobject.c = characterobject.c2;
						characterobject.c1 = 0;
						characterobject.c2 = 0;
					}
					break;

				case 50:
					characterobject.c1++;
					if (characterobject.c1 > 14) {
						characterobject.c = 0;
						this.addScore(10);
					}
					break;

				case 52:
					j += characterobject.vx;
					characterobject.vy += 5;
					if (characterobject.vy > 25) characterobject.vy = 25;
					k += characterobject.vy;
					if (k > this.maps.wy + 320) {
						characterobject.c = 0;
						this.addScore(10);
					}
					break;

				case 100:
					if ((j + 15) >> 5 > (j + 12) >> 5) {
						var word0 = this.maps.map_bg[(j + 15) >> 5][
							(k + 31) >> 5
						];
						if (word0 == 11 || word0 == 14)
							k = ((k + 31) >> 5) * 32 - 32;
						else if (word0 == 10 || word0 == 12)
							k = ((k + 31) >> 5) * 32;
					}
					j -= 3;
					var word34 = this.maps.map_bg[(j + 15) >> 5][(k + 31) >> 5];
					if (word34 >= 10 && word34 <= 15) {
						k = ((k + 31) >> 5) * 32;
						k = this.sakamichiY(j, k);
					} else {
						var word1 = this.maps.map_bg[j >> 5][(k + 32) >> 5];
						if (word1 <= 9) {
							j = (j >> 5) * 32 + 32;
							word1 = this.maps.map_bg[(j + 15) >> 5][
								(k + 31) >> 5
							];
							if (word1 >= 10 && word1 <= 15) j -= 15;
							characterobject.c = 105;
						}
						word1 = this.maps.map_bg[j >> 5][(k + 31) >> 5];
						if (word1 >= 20) {
							j = (j >> 5) * 32 + 32;
							characterobject.c = 105;
						}
						word1 = this.maps.map_bg[(j + 15) >> 5][(k + 32) >> 5];
						if (word1 >= 10 && word1 <= 15) {
							k = ((k + 32) >> 5) * 32;
							k = this.sakamichiY(j, k);
						}
					}
					characterobject.pt = 140 + this.g_ac;
					characterobject.pth = 0;
					break;

				case 105:
					if ((j + 15) >> 5 < (j + 18) >> 5) {
						var word2 = this.maps.map_bg[(j + 15) >> 5][
							(k + 31) >> 5
						];
						if (word2 == 10 || word2 == 13)
							k = ((k + 31) >> 5) * 32 - 32;
						else if (word2 == 11 || word2 == 15)
							k = ((k + 31) >> 5) * 32;
					}
					j += 3;
					var word35 = this.maps.map_bg[(j + 15) >> 5][(k + 31) >> 5];
					if (word35 >= 10 && word35 <= 15) {
						k = ((k + 31) >> 5) * 32;
						k = this.sakamichiY(j, k);
					} else {
						var word3 = this.maps.map_bg[(j + 31) >> 5][
							(k + 32) >> 5
						];
						if (word3 <= 9) {
							j = ((j + 31) >> 5) * 32 - 32;
							word3 = this.maps.map_bg[(j + 15) >> 5][
								(k + 31) >> 5
							];
							if (word3 >= 10 && word3 <= 15) j += 16;
							characterobject.c = 100;
						}
						word3 = this.maps.map_bg[(j + 31) >> 5][(k + 31) >> 5];
						if (word3 >= 20) {
							j = ((j + 31) >> 5) * 32 - 32;
							characterobject.c = 100;
						}
						word3 = this.maps.map_bg[(j + 15) >> 5][(k + 32) >> 5];
						if (word3 >= 10 && word3 <= 15) {
							k = ((k + 32) >> 5) * 32;
							k = this.sakamichiY(j, k);
						}
					}
					characterobject.pt = 140 + this.g_ac;
					characterobject.pth = 1;
					break;

				case 110:
					if ((j + 15) >> 5 > (j + 12) >> 5) {
						var word4 = this.maps.map_bg[(j + 15) >> 5][
							(k + 31) >> 5
						];
						if (word4 == 11 || word4 == 14)
							k = ((k + 31) >> 5) * 32 - 32;
						else if (word4 == 10 || word4 == 12)
							k = ((k + 31) >> 5) * 32;
					}
					j -= 3;
					var word36 = this.maps.map_bg[(j + 15) >> 5][(k + 31) >> 5];
					if (word36 >= 10 && word36 <= 15) {
						k = ((k + 31) >> 5) * 32;
						k = this.sakamichiY(j, k);
					} else {
						var l = (k + 32) >> 5;
						var word25 = this.maps.map_bg[(j + 31) >> 5][l];
						if (word25 <= 9) {
							j = ((j + 31) >> 5) * 32;
							var word5 = this.maps.map_bg[(j + 15) >> 5][
								(k + 31) >> 5
							];
							if (word5 >= 10 && word5 <= 15) j -= 15;
							characterobject.c = 120;
						}
						if (j < 32) {
							if (j <= 3) characterobject.c = 0;
						} else {
							var word6 = this.maps.map_bg[j >> 5][(k + 31) >> 5];
							if (word6 >= 20) {
								j = (j >> 5) * 32 + 32;
								characterobject.c = 115;
								if (
									this.maps.map_bg[(j + 15) >> 5][
										(k + 32) >> 5
									] <= 9
								)
									characterobject.c = 120;
							}
						}
						if (i >= 120 && j < this.maps.wx - 32)
							characterobject.c = 0;
						var word7 = this.maps.map_bg[(j + 15) >> 5][l];
						if (word7 >= 10 && word7 <= 15) {
							k = ((k + 32) >> 5) * 32;
							k = this.sakamichiY(j, k);
						}
					}
					characterobject.pt = 140 + this.g_ac;
					characterobject.pth = 0;
					break;

				case 115:
					if ((j + 15) >> 5 < (j + 18) >> 5) {
						var word8 = this.maps.map_bg[(j + 15) >> 5][
							(k + 31) >> 5
						];
						if (word8 == 10 || word8 == 13)
							k = ((k + 31) >> 5) * 32 - 32;
						else if (word8 == 11 || word8 == 15)
							k = ((k + 31) >> 5) * 32;
					}
					j += 3;
					var word37 = this.maps.map_bg[(j + 15) >> 5][(k + 31) >> 5];
					if (word37 >= 10 && word37 <= 15) {
						k = ((k + 31) >> 5) * 32;
						k = this.sakamichiY(j, k);
					} else {
						var i1 = (k + 32) >> 5;
						var word16 = this.maps.map_bg[j >> 5][i1];
						if (word16 <= 9) {
							j = (j >> 5) * 32;
							var word9 = this.maps.map_bg[(j + 15) >> 5][
								(k + 31) >> 5
							];
							if (word9 >= 10 && word9 <= 15) j += 16;
							characterobject.c = 125;
						}
						var word10 = this.maps.map_bg[(j + 31) >> 5][
							(k + 31) >> 5
						];
						if (word10 >= 20) {
							j = ((j + 31) >> 5) * 32 - 32;
							characterobject.c = 110;
							if (
								this.maps.map_bg[(j + 15) >> 5][
									(k + 32) >> 5
								] <= 9
							)
								characterobject.c = 125;
						}
						if (i >= 120 && j > this.maps.wx + 512)
							characterobject.c = 0;
						word10 = this.maps.map_bg[(j + 15) >> 5][i1];
						if (word10 >= 10 && word10 <= 15) {
							k = ((k + 32) >> 5) * 32;
							k = this.sakamichiY(j, k);
						}
					}
					characterobject.pt = 140 + this.g_ac;
					characterobject.pth = 1;
					break;

				case 120:
					k += 5;
					var word38 = this.maps.map_bg[(j + 15) >> 5][(k + 31) >> 5];
					if (word38 >= 10 && word38 <= 15) {
						var j1 = this.sakamichiY(j, ((k + 31) >> 5) * 32);
						if (j1 <= k) {
							k = j1;
							characterobject.c = 110;
						}
					}
					var k1 = (k + 31) >> 5;
					var word17 = this.maps.map_bg[j >> 5][k1];
					var word26 = this.maps.map_bg[(j + 31) >> 5][k1];
					if (word17 >= 20 || word26 >= 20) {
						k = k1 * 32 - 32;
						characterobject.c = 110;
					}
					if (k >= this.ochiru_y) characterobject.c = 0;
					characterobject.pt = 140;
					characterobject.pth = 0;
					break;

				case 125:
					k += 5;
					var word39 = this.maps.map_bg[(j + 15) >> 5][(k + 31) >> 5];
					if (word39 >= 10 && word39 <= 15) {
						var l1 = this.sakamichiY(j, ((k + 31) >> 5) * 32);
						if (l1 <= k) {
							k = l1;
							characterobject.c = 115;
						}
					}
					var i2 = (k + 31) >> 5;
					var word18 = this.maps.map_bg[j >> 5][i2];
					var word27 = this.maps.map_bg[(j + 31) >> 5][i2];
					if (word18 >= 20 || word27 >= 20) {
						k = i2 * 32 - 32;
						characterobject.c = 115;
					}
					if (k >= this.ochiru_y) characterobject.c = 0;
					characterobject.pt = 140;
					characterobject.pth = 1;
					break;

				case 150:
					if (
						characterobject.vx < 0 &&
						(this.maps.getBGCode(j, k) >= 20 ||
							this.maps.getBGCode(j, k + 31) >= 20)
					) {
						j = (j >> 5) * 32 + 32;
						characterobject.vx = 0;
					}
					if (
						characterobject.vx > 0 &&
						(this.maps.getBGCode(j + 31, k) >= 20 ||
							this.maps.getBGCode(j + 31, k + 31) >= 20)
					) {
						j = ((j + 31) >> 5) * 32 - 32;
						characterobject.vx = 0;
					}
					j += characterobject.vx;
					characterobject.vy += 2;
					if (characterobject.vy > 18) characterobject.vy = 18;
					k += characterobject.vy;
					var j2 = (k + 31) >> 5;
					var word19 = this.maps.map_bg[j >> 5][j2];
					var word28 = this.maps.map_bg[(j + 31) >> 5][j2];
					if (word19 >= 20 || word28 >= 20) {
						k = j2 * 32 - 32;
						if (characterobject.muki == 1) characterobject.c = 115;
						else characterobject.c = 110;
					}
					if (k >= this.ochiru_y) characterobject.c = 0;
					characterobject.pt = 140;
					characterobject.pth = characterobject.muki;
					break;

				case 200:
					if (characterobject.c1 <= 0) {
						if (this.co_j.x >= j - 240 && this.co_j.x <= j + 240) {
							characterobject.c = 210;
							characterobject.vy = -14;
						}
					} else {
						characterobject.c1--;
					}
					characterobject.pt = 143;
					if (j + 8 >= this.co_j.x) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;

				case 210:
					characterobject.vy++;
					if (characterobject.vy > 14) characterobject.vy = 14;
					k += characterobject.vy;
					if (this.maps.getBGCode(j + 15, k + 31) >= 20) {
						k = ((k + 31) >> 5) * 32 - 32;
						characterobject.c = 200;
						characterobject.c1 = 30;
					}
					if (k >= this.ochiru_y) characterobject.c = 0;
					if (
						characterobject.vy == 0 &&
						(Math.abs(this.co_j.x - j) > 32 || k <= this.co_j.y)
					)
						this.mSet(j, k, 100);
					if (characterobject.vy <= -1) characterobject.pt = 144;
					else characterobject.pt = 145;
					if (j + 8 >= this.co_j.x) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;

				case 300:
					if (characterobject.c1 > 0) {
						characterobject.c1++;
						if (
							characterobject.c1 == 2 ||
							characterobject.c1 == 10 ||
							characterobject.c1 == 18 ||
							characterobject.c1 == 26
						) {
							if (j + 8 >= this.co_j.x) this.mSet(j, k, 200);
							else this.mSet(j, k, 205);
						} else if (characterobject.c1 > 86)
							characterobject.c1 = 0;
					} else if (this.co_j.x >= j - 256 && this.co_j.x <= j + 256)
						characterobject.c1 = 1;
					characterobject.pt = 150;
					if (j + 8 >= this.co_j.x) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;

				case 400:
					j -= 4;
					if (this.maps.getBGCode(j, k + 32) <= 9) {
						j = (j >> 5) * 32 + 32;
						characterobject.c = 405;
					}
					if (this.maps.getBGCode(j, k + 31) >= 20) {
						j = (j >> 5) * 32 + 32;
						characterobject.c = 405;
					}
					characterobject.pt = 152 + this.g_ac;
					characterobject.pth = 0;
					break;

				case 405:
					j += 4;
					if (this.maps.getBGCode(j + 31, k + 32) <= 9) {
						j = ((j + 31) >> 5) * 32 - 32;
						characterobject.c = 400;
					}
					if (this.maps.getBGCode(j + 31, k + 31) >= 20) {
						j = ((j + 31) >> 5) * 32 - 32;
						characterobject.c = 400;
					}
					characterobject.pt = 152 + this.g_ac;
					characterobject.pth = 1;
					break;

				case 410:
					j -= 4;
					var word40 = this.maps.map_bg[(j + 15) >> 5][(k + 31) >> 5];
					if (word40 >= 10 && word40 <= 15) {
						k = ((k + 31) >> 5) * 32;
						k = this.sakamichiY(j, k);
					} else {
						var k2 = (k + 32) >> 5;
						var word29 = this.maps.map_bg[(j + 31) >> 5][k2];
						if (word29 <= 9) {
							j = ((j + 31) >> 5) * 32;
							var word11 = this.maps.map_bg[(j + 15) >> 5][
								(k + 31) >> 5
							];
							if (word11 >= 10 && word11 <= 15) j -= 15;
							characterobject.c = 420;
						}
						if (j < 32) {
							if (j <= 4) characterobject.c = 0;
						} else {
							var word12 = this.maps.map_bg[j >> 5][
								(k + 31) >> 5
							];
							if (word12 >= 20) {
								j = (j >> 5) * 32 + 32;
								characterobject.c = 415;
								if (
									this.maps.map_bg[(j + 15) >> 5][
										(k + 32) >> 5
									] <= 9
								)
									characterobject.c = 420;
							}
						}
						if (i >= 120 && j < this.maps.wx - 32)
							characterobject.c = 0;
						var word13 = this.maps.map_bg[(j + 15) >> 5][k2];
						if (word13 >= 10 && word13 <= 15) {
							k = ((k + 32) >> 5) * 32;
							k = this.sakamichiY(j, k);
						}
					}
					characterobject.pt = 152 + this.g_ac;
					characterobject.pth = 0;
					break;

				case 415:
					j += 4;
					var word41 = this.maps.map_bg[(j + 15) >> 5][(k + 31) >> 5];
					if (word41 >= 10 && word41 <= 15) {
						k = ((k + 31) >> 5) * 32;
						k = this.sakamichiY(j, k);
					} else {
						var l2 = (k + 32) >> 5;
						var word20 = this.maps.map_bg[j >> 5][l2];
						if (word20 <= 9) {
							j = (j >> 5) * 32;
							var word14 = this.maps.map_bg[(j + 15) >> 5][
								(k + 31) >> 5
							];
							if (word14 >= 10 && word14 <= 15) j += 16;
							characterobject.c = 425;
						}
						var word15 = this.maps.map_bg[(j + 31) >> 5][
							(k + 31) >> 5
						];
						if (word15 >= 20) {
							j = ((j + 31) >> 5) * 32 - 32;
							characterobject.c = 410;
							if (
								this.maps.map_bg[(j + 15) >> 5][
									(k + 32) >> 5
								] <= 9
							)
								characterobject.c = 425;
						}
						if (i >= 120 && j > this.maps.wx + 512)
							characterobject.c = 0;
						word15 = this.maps.map_bg[(j + 15) >> 5][l2];
						if (word15 >= 10 && word15 <= 15) {
							k = ((k + 32) >> 5) * 32;
							k = this.sakamichiY(j, k);
						}
					}
					characterobject.pt = 152 + this.g_ac;
					characterobject.pth = 1;
					break;

				case 420:
					var i3 = ((k += 5) + 31) >> 5;
					var word21 = this.maps.map_bg[j >> 5][i3];
					var word30 = this.maps.map_bg[(j + 31) >> 5][i3];
					if (word21 >= 20 || word30 >= 20) {
						k = i3 * 32 - 32;
						characterobject.c = 410;
					}
					if (k >= this.ochiru_y) characterobject.c = 0;
					characterobject.pt = 152;
					characterobject.pth = 0;
					break;

				case 425:
					var j3 = ((k += 5) + 31) >> 5;
					var word22 = this.maps.map_bg[j >> 5][j3];
					var word31 = this.maps.map_bg[(j + 31) >> 5][j3];
					if (word22 >= 20 || word31 >= 20) {
						k = j3 * 32 - 32;
						characterobject.c = 415;
					}
					if (k >= this.ochiru_y) characterobject.c = 0;
					characterobject.pt = 152;
					characterobject.pth = 1;
					break;

				case 450:
					if (
						characterobject.vx < 0 &&
						(this.maps.getBGCode(j, k) >= 20 ||
							this.maps.getBGCode(j, k + 31) >= 20)
					) {
						j = (j >> 5) * 32 + 32;
						characterobject.vx = 0;
					}
					if (
						characterobject.vx > 0 &&
						(this.maps.getBGCode(j + 31, k) >= 20 ||
							this.maps.getBGCode(j + 31, k + 31) >= 20)
					) {
						j = ((j + 31) >> 5) * 32 - 32;
						characterobject.vx = 0;
					}
					j += characterobject.vx;
					characterobject.vy += 2;
					if (characterobject.vy > 18) characterobject.vy = 18;
					k += characterobject.vy;
					var k3 = (k + 31) >> 5;
					var word23 = this.maps.map_bg[j >> 5][k3];
					var word32 = this.maps.map_bg[(j + 31) >> 5][k3];
					if (word23 >= 20 || word32 >= 20) {
						k = k3 * 32 - 32;
						if (characterobject.muki == 1) characterobject.c = 415;
						else characterobject.c = 410;
					}
					if (k >= this.ochiru_y) characterobject.c = 0;
					characterobject.pt = 152;
					characterobject.pth = characterobject.muki;
					break;

				case 500:
					if (k <= characterobject.c3) {
						characterobject.vy++;
						if (characterobject.vy > 4) characterobject.vy = 4;
					} else if (k >= characterobject.c4) {
						characterobject.vy--;
						if (characterobject.vy < -4) characterobject.vy = -4;
					}
					k += characterobject.vy;
					characterobject.pt = 147 + this.g_ac;
					if (this.co_j.x <= j + 8) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;

				case 510:
					if ((j -= 3) < 48) {
						if (j <= 3) characterobject.c = 0;
					} else if (this.maps.getBGCode(j - 16, k + 31) >= 20) {
						j = ((j - 16) >> 5) * 32 + 32 + 16;
						characterobject.c = 515;
					}
					characterobject.pt = 147 + this.g_ac;
					characterobject.pth = 0;
					break;

				case 515:
					j += 3;
					if (this.maps.getBGCode(j + 31 + 16, k + 31) >= 20) {
						j = ((j + 31 + 16) >> 5) * 32 - 32 - 16;
						characterobject.c = 510;
					}
					characterobject.pt = 147 + this.g_ac;
					characterobject.pth = 1;
					break;

				case 600:
					if (characterobject.c1 < 25) {
						characterobject.c1++;
						characterobject.vy = -17;
						characterobject.c3 = 0;
						characterobject.pt = 154;
						characterobject.pth = 0;
					} else {
						if (characterobject.c3 == 0) {
							characterobject.vy++;
							characterobject.c3 = 1;
						} else {
							characterobject.vy += 2;
							characterobject.c3 = 0;
						}
						if (characterobject.vy > 17) characterobject.vy = 17;
						k += characterobject.vy;
						if (characterobject.vy < 4) {
							characterobject.pt = 155;
							characterobject.pth = 0;
						} else {
							characterobject.pt = 156;
							characterobject.pth = 0;
						}
						if ((j -= 5) < 32) {
							if (j <= 3) characterobject.c = 0;
						} else {
							if (this.maps.getBGCode(j + 15, k + 6) >= 20) {
								k = ((k + 6) >> 5) * 32 + 32 - 6;
								characterobject.vy = 0;
							}
							if (this.maps.getBGCode(j + 15, k + 31) >= 20) {
								k = ((k + 31) >> 5) * 32 - 32;
								characterobject.c1 = 15;
								characterobject.pt = 154;
								characterobject.pth = 0;
							}
							if (
								this.maps.getBGCode(j, k + 31) >= 20 ||
								this.maps.getBGCode(j, k + 8) >= 20
							) {
								j = (j >> 5) * 32 + 32;
								characterobject.c = 605;
							}
							if (i >= 120 && j < this.maps.wx - 32)
								characterobject.c = 0;
						}
					}
					if (k >= this.ochiru_y) characterobject.c = 0;
					break;

				case 605:
					if (characterobject.c1 < 25) {
						characterobject.c1++;
						characterobject.vy = -17;
						characterobject.c3 = 0;
						characterobject.pt = 154;
						characterobject.pth = 1;
					} else {
						if (characterobject.c3 == 0) {
							characterobject.vy++;
							characterobject.c3 = 1;
						} else {
							characterobject.vy += 2;
							characterobject.c3 = 0;
						}
						if (characterobject.vy > 17) characterobject.vy = 17;
						k += characterobject.vy;
						if (characterobject.vy < 4) {
							characterobject.pt = 155;
							characterobject.pth = 1;
						} else {
							characterobject.pt = 156;
							characterobject.pth = 1;
						}
						j += 5;
						if (this.maps.getBGCode(j + 15, k + 6) >= 20) {
							k = ((k + 6) >> 5) * 32 + 32 - 6;
							characterobject.vy = 0;
						}
						if (this.maps.getBGCode(j + 15, k + 31) >= 20) {
							k = ((k + 31) >> 5) * 32 - 32;
							characterobject.c1 = 15;
							characterobject.pt = 154;
							characterobject.pth = 1;
						}
						if (
							this.maps.getBGCode(j + 31, k + 31) >= 20 ||
							this.maps.getBGCode(j + 31, k + 8) >= 20
						) {
							j = ((j + 31) >> 5) * 32 - 32;
							characterobject.c = 600;
						}
						if (i >= 120 && j > this.maps.wx + 512)
							characterobject.c = 0;
					}
					if (k >= this.ochiru_y) characterobject.c = 0;
					break;

				case 650:
					if (
						characterobject.vx < 0 &&
						(this.maps.getBGCode(j, k) >= 20 ||
							this.maps.getBGCode(j, k + 31) >= 20)
					) {
						j = (j >> 5) * 32 + 32;
						characterobject.vx = 0;
					}
					if (
						characterobject.vx > 0 &&
						(this.maps.getBGCode(j + 31, k) >= 20 ||
							this.maps.getBGCode(j + 31, k + 31) >= 20)
					) {
						j = ((j + 31) >> 5) * 32 - 32;
						characterobject.vx = 0;
					}
					j += characterobject.vx;
					characterobject.vy += 2;
					if (characterobject.vy > 18) characterobject.vy = 18;
					k += characterobject.vy;
					var l3 = (k + 31) >> 5;
					var word24 = this.maps.map_bg[j >> 5][l3];
					var word33 = this.maps.map_bg[(j + 31) >> 5][l3];
					if (word24 >= 20 || word33 >= 20) {
						k = l3 * 32 - 32;
						if (characterobject.muki == 1) characterobject.c = 605;
						else characterobject.c = 600;
						characterobject.c1 = 15;
					}
					if (k >= this.ochiru_y) characterobject.c = 0;
					if (characterobject.vy < 4) characterobject.pt = 155;
					else characterobject.pt = 156;
					characterobject.pth = characterobject.muki;
					break;

				case 700:
					if (!this.yachamo_cf)
						if (characterobject.c1 > 0) {
							characterobject.c1++;
							if (characterobject.c1 == 2) {
								if (j + 8 >= this.co_j.x) this.mSet(j, k, 300);
								else this.mSet(j, k, 305);
							} else if (characterobject.c1 > 40)
								characterobject.c1 = 0;
						} else if (
							this.co_j.x >= j - 256 &&
							this.co_j.x <= j + 192 &&
							Math.abs(this.co_j.x - j) >= 96
						)
							characterobject.c1 = 1;
					characterobject.pt = 158;
					if (j + 8 >= this.co_j.x) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;

				case 800:
					if (characterobject.c1 > 0) {
						characterobject.c1++;
						if (characterobject.c1 == 2) {
							if (j + 8 >= this.co_j.x) this.mSet(j, k, 400);
							else this.mSet(j, k, 405);
						} else if (characterobject.c1 > 20) {
							characterobject.c = 810;
							characterobject.c1 = 0;
						}
					} else if (characterobject.c1 < 0) characterobject.c1++;
					else if (this.co_j.x >= j - 240 && this.co_j.x <= j + 240)
						characterobject.c1 = 1;
					characterobject.pt = 160;
					if (j + 8 >= this.co_j.x) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;

				case 810:
					if (characterobject.c1 <= 0) {
						if ((j += 3) >= characterobject.c3 + 96) {
							j = characterobject.c3 + 96;
							characterobject.c1 = 10;
						}
						if (this.maps.getBGCode(j + 31, k + 32) <= 9) {
							j = ((j + 31) >> 5) * 32 - 32;
							characterobject.c1 = 10;
						}
						characterobject.pt = 161 + this.g_ac;
						characterobject.pth = 1;
					} else if (characterobject.c1 <= 35) {
						characterobject.c1++;
						if (characterobject.c1 == 15)
							if (j + 8 >= this.co_j.x) this.mSet(j, k, 400);
							else this.mSet(j, k, 405);
						characterobject.pt = 160;
						if (j + 8 >= this.co_j.x) characterobject.pth = 0;
						else characterobject.pth = 1;
					} else {
						if ((j -= 3) <= characterobject.c3) {
							j = characterobject.c3;
							characterobject.c = 800;
							characterobject.c1 = -20;
						}
						if (this.maps.getBGCode(j, k + 32) <= 9) {
							j = (j >> 5) * 32 + 32;
							characterobject.c = 800;
							characterobject.c1 = -20;
						}
						characterobject.pt = 161 + this.g_ac;
						characterobject.pth = 0;
					}
					break;

				case 900:
					if ((j -= 4) < 48) {
						if (j <= 4) characterobject.c = 0;
					} else {
						characterobject.c1++;
						if (characterobject.c1 == 1) this.mSet(j, k + 19, 600);
						else if (characterobject.c1 > 26)
							characterobject.c1 = 0;
						if (this.maps.getBGCode(j, k + 31) >= 20) {
							j = (j >> 5) * 32 + 32;
							characterobject.c = 910;
						}
					}
					characterobject.pt = 164;
					characterobject.pth = 0;
					break;

				case 910:
					characterobject.pt = 164;
					characterobject.pth = 0;
					break;

				case 950:
					if ((j -= 4) < 48) {
						if (j <= 4) characterobject.c = 0;
					} else {
						characterobject.c1++;
						if (characterobject.c1 == 1) this.mSet(j, k + 19, 600);
						else if (characterobject.c1 > 26)
							characterobject.c1 = 0;
						if (this.maps.getBGCode(j - 16, k + 31) >= 20) {
							j = ((j - 16) >> 5) * 32 + 32 + 16;
							characterobject.c = 960;
							characterobject.c1 = 16;
						}
					}
					characterobject.pt = 164;
					characterobject.pth = 0;
					break;

				case 960:
					j += 4;
					characterobject.c1++;
					if (characterobject.c1 == 1) this.mSet(j, k + 19, 605);
					else if (characterobject.c1 > 26) characterobject.c1 = 0;
					if (this.maps.getBGCode(j + 31 + 16, k + 31) >= 20) {
						j = ((j + 31 + 16) >> 5) * 32 - 32 - 16;
						characterobject.c = 950;
						characterobject.c1 = 16;
					}
					characterobject.pt = 164;
					characterobject.pth = 1;
					break;

				case 1000:
					if ((j -= 3) <= characterobject.c3 - 256 + 16)
						characterobject.c = 1005;
					if (
						this.maps.getBGCode(j - 16, k) >= 20 ||
						this.maps.getBGCode(j - 16, k + 31) >= 20
					) {
						j = ((j - 16) >> 5) * 32 + 32 + 16;
						characterobject.c = 1005;
					}
					characterobject.pt = 166;
					characterobject.pth = 0;
					break;

				case 1005:
					if ((j += 3) >= characterobject.c3 + 16)
						characterobject.c = 1000;
					if (
						this.maps.getBGCode(j + 31 + 16, k) >= 20 ||
						this.maps.getBGCode(j + 31 + 16, k + 31) >= 20
					) {
						j = ((j + 31 + 16) >> 5) * 32 - 32 - 16;
						characterobject.c = 1000;
					}
					characterobject.pt = 166;
					characterobject.pth = 1;
					break;

				case 1100:
					if (characterobject.c1 > 0) {
						characterobject.c1++;
						if (characterobject.c1 > 77) characterobject.c1 = 0;
					} else if (
						Math.abs(this.co_j.x - j) <= 144 &&
						Math.abs(this.co_j.y - k) <= 144
					) {
						characterobject.c1 = 1;
						this.mSet2(j, k, 700, -3, -3);
						this.mSet2(j, k, 700, 3, -3);
						this.mSet2(j, k, 700, -3, 3);
						this.mSet2(j, k, 700, 3, 3);
						this.mSet2(j, k, 700, -4, 0);
						this.mSet2(j, k, 700, 4, 0);
						this.mSet2(j, k, 700, 0, -4);
						this.mSet2(j, k, 700, 0, 4);
					}
					characterobject.pt = 167;
					if (j + 8 >= this.co_j.x) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;
			}
			if (characterobject.c < 100) {
				characterobject.x = j;
				characterobject.y = k;
			} else {
				var i4 = Math.abs(j - this.co_j.x);
				if (i4 >= 48) {
					characterobject.x = j;
					characterobject.y = k;
				} else {
					if (
						this.co_j.c >= 100 &&
						this.co_j.c < 200 &&
						i4 < 30 &&
						Math.abs(k - this.co_j.y) < 23
					)
						if (this.j_v_c > 0) {
							if (this.co_j.muki == 1) {
								characterobject.pth = 0;
								characterobject.vx = 3;
							} else {
								characterobject.pth = 1;
								characterobject.vx = -3;
							}
							characterobject.c = 52;
							characterobject.vy = -30;
						} else if (
							(characterobject.c >= 400 &&
								characterobject.c < 500) ||
							(characterobject.c >= 1000 &&
								characterobject.c < 1200)
						)
							this.jShinu(2);
						else if (
							(i4 < 27 && this.co_j.vy > 0 && !this.j_mizu_f) ||
							flag
						) {
							if (characterobject.c < 200)
								characterobject.pt = 142;
							else if (characterobject.c < 300)
								characterobject.pt = 146;
							else if (characterobject.c < 400)
								characterobject.pt = 151;
							else if (characterobject.c < 600)
								characterobject.pt = 149;
							else if (characterobject.c < 700)
								characterobject.pt = 157;
							else if (characterobject.c < 800)
								characterobject.pt = 159;
							else if (characterobject.c < 900)
								characterobject.pt = 163;
							else if (characterobject.c < 1000)
								characterobject.pt = 165;
							characterobject.c = 50;
							characterobject.c1 = 0;
							this.co_j.y = k - 12;
							this.co_j.vy = -160;
							this.j_jump_type = 1;
							this.co_j.c = 110;
							this.co_j.c1 = 0;
							this.co_j.pt = 109;
							if (
								characterobject.pt == 149 ||
								characterobject.pt == 165
							) {
								this.co_j.vy = -220;
								characterobject.c1 = -2;
							}
							flag = true;
						} else {
							this.jShinu(2);
						}
					characterobject.x = j;
					characterobject.y = k;
				}
			}
		}
};

MainProgram.prototype.sakamichiY = function(i, j) {
	var k = (i + 15) >> 5;
	var l = (j + 31) >> 5;
	var word0 = this.maps.map_bg[k][l];
	var k2 = j;
	switch (word0) {
		default:
			break;

		case 10:
			var i1 = l * 32 - ((i + 15) % 32);
			if (i1 < j) k2 = i1;
			break;

		case 11:
			var j1 = l * 32 + ((i + 15) % 32) - 31;
			if (j1 < j) k2 = j1;
			break;

		case 12:
			var k1 = l * 32 - ((i + 15) % 32 >> 1);
			if (k1 < j) k2 = k1;
			break;

		case 13:
			var l1 = l * 32 - ((i + 15) % 32 >> 1) - 16;
			if (l1 < j) k2 = l1;
			break;

		case 14:
			var i2 = l * 32 + ((i + 15) % 32 >> 1) - 31;
			if (i2 < j) k2 = i2;
			break;

		case 15:
			var j2 = l * 32 + ((i + 15) % 32 >> 1) - 15;
			if (j2 < j) k2 = j2;
			break;
	}
	return k2;
};

MainProgram.prototype.mSet = function(i, j, k) {
	for (var l = 0; l <= 23; l++) {
		if (this.co_m[l].c > 0) continue;
		var characterobject = this.co_m[l];
		characterobject.c = k;
		characterobject.x = i;
		characterobject.y = j;
		characterobject.c1 = 0;
		this.m_kazu++;
		switch (k) {
			case 90:
				characterobject.c2 = 4;
				characterobject.vx = 0;
				characterobject.vy = 0;
				break;

			case 100:
				var j1 = this.co_j.x - i;
				var k1 = this.co_j.y - j;
				var i1 = Math.floor(Math.sqrt(j1 * j1 + k1 * k1));
				if (i1 < 48) {
					this.m_kazu--;
					characterobject.c = 0;
				} else {
					characterobject.vx = rounddown((14 * j1) / i1);
					characterobject.vy = rounddown((14 * k1) / i1);
					characterobject.x += rounddown(
						(characterobject.vx * 16) / 14
					);
					characterobject.y += rounddown(
						(characterobject.vy * 16) / 14
					);
				}
				if (
					!this.dengeki_mkf &&
					characterobject.c > 0 &&
					this.maps.getBGCode(
						characterobject.x + 15,
						characterobject.y + 15
					) == 4
				) {
					this.m_kazu--;
					characterobject.c = 0;
				}
				break;

			case 200:
				characterobject.vx = -4 - this.ranInt(6);
				characterobject.vy = -22;
				characterobject.x += characterobject.vx;
				characterobject.y += characterobject.vy;
				break;

			case 205:
				characterobject.c = 200;
				characterobject.vx = 4 + this.ranInt(6);
				characterobject.vy = -22;
				characterobject.x += characterobject.vx;
				characterobject.y += characterobject.vy;
				break;

			case 300:
				characterobject.vx = -12;
				characterobject.x += characterobject.vx;
				break;

			case 305:
				characterobject.c = 300;
				characterobject.vx = 12;
				characterobject.x += characterobject.vx;
				break;

			case 400:
				characterobject.vx = -80;
				characterobject.vy = -225;
				break;

			case 405:
				characterobject.c = 400;
				characterobject.vx = 80;
				characterobject.vy = -225;
				break;

			case 500:
				characterobject.vx = -4;
				characterobject.vy = -22;
				break;

			case 600:
				characterobject.vx = -40;
				characterobject.vy = 0;
				break;

			case 605:
				characterobject.c = 600;
				characterobject.vx = 40;
				characterobject.vy = 0;
				break;

			case 2000:
				characterobject.c3 = j;
				characterobject.vy = -210;
				break;

			case 2010:
				characterobject.c = 2000;
				characterobject.c3 = j - 64;
				characterobject.vy = -280;
				break;

			case 2020:
				characterobject.c = 2000;
				characterobject.c3 = j - 32;
				characterobject.vy = -250;
				break;

			case 2100:
				characterobject.c2 = 0;
				break;

			case 2110:
				characterobject.c = 2100;
				characterobject.c2 = 1;
				break;

			case 2120:
				characterobject.c = 2100;
				characterobject.c2 = 2;
				break;

			case 2130:
				characterobject.c = 2100;
				characterobject.c2 = 3;
				break;

			case 2140:
				characterobject.c = 2100;
				characterobject.c2 = 4;
				break;

			case 2150:
				characterobject.c = 2100;
				characterobject.c2 = 5;
				break;

			case 2160:
				characterobject.c = 2100;
				characterobject.c2 = 6;
				break;

			case 2170:
				characterobject.c = 2100;
				characterobject.c2 = 7;
				break;

			case 2180:
				characterobject.c = 2100;
				characterobject.c2 = 8;
				break;
		}
		break;
	}
};

MainProgram.prototype.mSet2 = function(i, j, k, l, i1) {
	for (var j1 = 0; j1 <= 23; j1++) {
		if (this.co_m[j1].c > 0) continue;
		var characterobject = this.co_m[j1];
		characterobject.c = k;
		characterobject.x = i;
		characterobject.y = j;
		characterobject.vx = l;
		characterobject.vy = i1;
		characterobject.c1 = 0;
		this.m_kazu++;
		switch (k) {
			case 500:
				characterobject.x += characterobject.vx;
				break;

			case 700:
				characterobject.c2 = 0;
				break;

			case 710:
				characterobject.c = 700;
				characterobject.c2 = 1;
				break;
		}
		break;
	}
};

MainProgram.prototype.mMove = function() {
	for (var i = 0; i <= 23; i++)
		if (this.co_m[i].c != 0) {
			var characterobject = this.co_m[i];
			switch (characterobject.c) {
				case 50:
					characterobject.c1++;
					if (characterobject.c1 <= 5) characterobject.pt = 80;
					else if (characterobject.c1 <= 10) characterobject.pt = 81;
					else if (characterobject.c1 <= 16) characterobject.pt = 82;
					else characterobject.c = 0;
					characterobject.pth = 0;
					break;

				case 60:
					characterobject.y -= 5;
					var j2 = characterobject.y >> 5;
					var word0 = this.maps.map_bg[(characterobject.x + 11) >> 5][
						j2
					];
					if (word0 <= 3 || word0 >= 20) characterobject.c = 0;
					word0 = this.maps.map_bg[(characterobject.x + 20) >> 5][j2];
					if (word0 <= 3 || word0 >= 20) characterobject.c = 0;
					word0 = this.maps.map_bg[(characterobject.x + 15) >> 5][j2];
					if (
						(word0 == 8 || word0 == 9) &&
						this.maps.map_bg[((characterobject.x + 15) >> 5) - 1][
							j2
						] != 4
					)
						characterobject.c = 0;
					if (
						characterobject.x <= this.maps.wx - 32 ||
						characterobject.x >= this.maps.wx + 512
					)
						characterobject.c = 0;
					if (
						characterobject.y <= this.maps.wy - 32 ||
						characterobject.y >= this.maps.wy + 320
					)
						characterobject.c = 0;
					characterobject.pt = 85;
					characterobject.pth = 0;
					break;

				case 70:
					characterobject.c1++;
					switch (characterobject.c1) {
						case 1:
							characterobject.c2 = 20;
							break;

						case 2:
							characterobject.c2 = 34;
							break;

						case 3:
							characterobject.c2 = 46;
							break;

						case 4:
							characterobject.c2 = 56;
							break;

						case 5:
							characterobject.c2 = 64;
							break;

						case 6:
							characterobject.c2 = 70;
							break;

						case 7:
							characterobject.c2 = 74;
							break;

						case 8:
							characterobject.c2 = 77;
							break;

						case 9:
							characterobject.c2 = 79;
							break;

						case 10:
							characterobject.c2 = 80;
							break;
					}
					if (characterobject.c1 > 10) {
						characterobject.c2 = 10;
						characterobject.c = 0;
					}
					if (this.co_j.c >= 100 && this.co_j.c < 200) {
						var i1 = this.co_j.x - characterobject.x;
						var k2 = this.co_j.y - characterobject.y;
						var k3 = Math.floor(Math.sqrt(i1 * i1 + k2 * k2));
						if (k3 <= characterobject.c2 + 4 && this.j_v_c <= 0)
							this.jShinu(1);
					}
					characterobject.pt = 1100;
					characterobject.pth = 0;
					break;

				case 80:
					if (characterobject.vy >= 5)
						if (characterobject.vx > 2) characterobject.vx--;
						else if (characterobject.vx < -2) characterobject.vx++;
					characterobject.x += characterobject.vx;
					characterobject.vy += 4;
					if (characterobject.vy > 30) characterobject.vy = 30;
					characterobject.y += characterobject.vy;
					if (characterobject.y >= this.maps.wy + 320)
						characterobject.c = 0;
					characterobject.pt = 136;
					if (characterobject.vx < 0) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;

				case 90:
					if (characterobject.c2 < 48) {
						characterobject.c2 += 4;
						if (characterobject.c2 >= 48) {
							characterobject.c2 = 48;
							var j1 = this.co_j.x - characterobject.x;
							var l2 = this.co_j.y - characterobject.y;
							var l3 = Math.floor(Math.sqrt(j1 * j1 + l2 * l2));
							if (
								l3 < 32 ||
								this.co_j.c < 100 ||
								this.co_j.c >= 200
							) {
								if (characterobject.x < this.maps.wx + 256)
									characterobject.vx = 14;
								else characterobject.vx = -14;
								characterobject.vy = 0;
							} else {
								characterobject.vx = rounddown((14 * j1) / l3);
								characterobject.vy = rounddown((14 * l2) / l3);
							}
						}
					} else {
						characterobject.x += characterobject.vx;
						characterobject.y += characterobject.vy;
						if (
							characterobject.x <= this.maps.wx - 32 - 32 ||
							characterobject.x >= this.maps.wx + 512 + 128 + 32
						)
							characterobject.c = 0;
						else if (
							characterobject.y <= this.maps.wy - 32 - 200 - 32 ||
							characterobject.y >= this.maps.wy + 320 + 32
						)
							characterobject.c = 0;
					}
					if (this.co_j.c >= 100 && this.co_j.c < 200) {
						var k1 = this.co_j.x - characterobject.x;
						var i3 = this.co_j.y - characterobject.y;
						var i4 = Math.floor(Math.sqrt(k1 * k1 + i3 * i3));
						if (i4 + 4 <= characterobject.c2)
							if (this.j_v_c > 0) characterobject.c = 0;
							else this.jShinu(1);
					}
					characterobject.pt = 1000;
					break;

				case 100:
					characterobject.x += characterobject.vx;
					characterobject.y += characterobject.vy;
					var l1 = (characterobject.x + 15) >> 5;
					if (
						this.maps.map_bg[l1][(characterobject.y + 12) >> 5] >=
							20 ||
						this.maps.map_bg[l1][(characterobject.y + 18) >> 5] >=
							20
					)
						characterobject.c = 0;
					if (
						!this.dengeki_mkf &&
						this.maps.getBGCode(
							characterobject.x + 15,
							characterobject.y + 15
						) == 4
					)
						characterobject.c = 0;
					if (
						characterobject.x <= this.maps.wx - 32 ||
						characterobject.x >= this.maps.wx + 512 + 128
					)
						characterobject.c = 0;
					else if (
						characterobject.y <= this.maps.wy - 32 - 200 ||
						characterobject.y >= this.maps.wy + 320
					)
						characterobject.c = 0;
					if (this.g_c1 == 0) {
						characterobject.pt = 120;
						characterobject.pth = 0;
					} else {
						characterobject.pt = 121;
						characterobject.pth = 0;
					}
					break;

				case 200:
					characterobject.x += characterobject.vx;
					characterobject.vy += 2;
					if (characterobject.vy > 12) characterobject.vy = 12;
					var j = characterobject.vy;
					if (j < -18) j = -18;
					characterobject.y += j;
					if (characterobject.y >= this.maps.wy + 320)
						characterobject.c = 0;
					switch (this.g_c2) {
						case 0:
							characterobject.pt = 122;
							break;

						case 1:
							characterobject.pt = 123;
							break;

						case 2:
							characterobject.pt = 124;
							break;

						case 3:
							characterobject.pt = 125;
							break;
					}
					characterobject.pth = 0;
					break;

				case 300:
					characterobject.x += characterobject.vx;
					var j3 = (characterobject.y + 15) >> 5;
					if (
						this.maps.map_bg[(characterobject.x + 8) >> 5][j3] >=
							20 ||
						this.maps.map_bg[(characterobject.x + 23) >> 5][j3] >=
							20
					)
						characterobject.c = 0;
					if (
						characterobject.x <= this.maps.wx - 32 ||
						characterobject.x >= this.maps.wx + 512 + 128
					)
						characterobject.c = 0;
					if (this.g_c1 == 0) characterobject.pt = 126;
					else characterobject.pt = 127;
					if (characterobject.vx <= 0) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;

				case 400:
					characterobject.x += rounddown(characterobject.vx / 10);
					characterobject.vy += 25;
					if (characterobject.vy > 180) characterobject.vy = 180;
					characterobject.y += rounddown(characterobject.vy / 10);
					if (characterobject.y >= this.maps.wy + 320)
						characterobject.c = 0;
					var i2 = (characterobject.x + 15) >> 5;
					if (
						this.maps.map_bg[i2][(characterobject.y + 15) >> 5] >=
						20
					)
						characterobject.c = 0;
					if (this.g_c1 == 0) characterobject.pt = 128;
					else characterobject.pt = 129;
					if (characterobject.vx <= 0) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;

				case 500:
					if (characterobject.vy >= 5)
						if (characterobject.vx > 2) characterobject.vx--;
						else if (characterobject.vx < -2) characterobject.vx++;
					characterobject.x += characterobject.vx;
					characterobject.vy += 2;
					if (characterobject.vy > 12) characterobject.vy = 12;
					var k = characterobject.vy;
					if (k < -16) k = -16;
					characterobject.y += k;
					if (characterobject.y >= this.maps.wy + 320)
						characterobject.c = 0;
					characterobject.pt = 139;
					characterobject.pth = 0;
					break;

				case 600:
					if (characterobject.vx > 0) characterobject.vx -= 2;
					else if (characterobject.vx < 0) characterobject.vx += 2;
					characterobject.x += rounddown(characterobject.vx / 10);
					characterobject.vy += 8;
					if (characterobject.vy > 200) characterobject.vy = 200;
					characterobject.y += rounddown(characterobject.vy / 10);
					if (
						this.maps.map_bg[(characterobject.x + 15) >> 5][
							(characterobject.y + 15) >> 5
						] >= 20
					) {
						characterobject.c = 610;
						characterobject.c1 = 0;
						characterobject.y =
							((characterobject.y + 15) >> 5) * 32 - 16;
					}
					if (
						characterobject.x <= this.maps.wx - 32 - 64 ||
						characterobject.x >= this.maps.wx + 512 + 64
					)
						characterobject.c = 0;
					else if (
						characterobject.y <= this.maps.wy - 32 - 200 ||
						characterobject.y >= this.maps.wy + 320
					)
						characterobject.c = 0;
					if (characterobject.vx > 28) {
						characterobject.pt = 171;
						characterobject.pth = 1;
					} else if (characterobject.vx < -28) {
						characterobject.pt = 171;
						characterobject.pth = 0;
					} else {
						characterobject.pt = 170;
						characterobject.pth = 0;
					}
					break;

				case 610:
					characterobject.c1++;
					if (characterobject.c1 <= 3) characterobject.pt = 172;
					else if (characterobject.c1 <= 6) characterobject.pt = 173;
					else if (characterobject.c1 <= 9) {
						characterobject.pt = 174;
					} else {
						characterobject.c = 0;
						characterobject.pt = 198;
					}
					characterobject.pth = 0;
					break;

				case 700:
					characterobject.x += characterobject.vx;
					characterobject.y += characterobject.vy;
					if (
						characterobject.x <= this.maps.wx - 32 ||
						characterobject.x >= this.maps.wx + 512 + 32
					)
						characterobject.c = 0;
					else if (
						characterobject.y <= this.maps.wy - 64 ||
						characterobject.y >= this.maps.wy + 320 + 64
					)
						characterobject.c = 0;
					var l = this.maps.getBGCode(
						characterobject.x + 15,
						characterobject.y + 15
					);
					if (characterobject.c2 == 0 && l >= 20)
						characterobject.c = 0;
					if (characterobject.c2 == 0 && l <= 3)
						characterobject.c = 0;
					characterobject.pt = 168 + this.g_c1;
					characterobject.pth = 0;
					break;

				case 800:
					if (characterobject.vy >= 5)
						if (characterobject.vx > 2) characterobject.vx--;
						else if (characterobject.vx < -2) characterobject.vx++;
					characterobject.x += characterobject.vx;
					characterobject.vy += 4;
					if (characterobject.vy > 28) characterobject.vy = 28;
					characterobject.y += characterobject.vy;
					if (characterobject.y >= this.maps.wy + 320)
						characterobject.c = 0;
					if (
						this.maps.getBGCode(
							characterobject.x + 15,
							characterobject.y + 31
						) >= 20
					) {
						characterobject.c = 70;
						characterobject.y =
							((characterobject.y + 31) >> 5) * 32 - 16;
						characterobject.c1 = 1;
						characterobject.c2 = 20;
					}
					characterobject.pt = 137 + this.g_c1;
					if (characterobject.vx < 0) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;

				case 2000:
					characterobject.vy += 30;
					if (characterobject.vy > 180) characterobject.vy = 180;
					characterobject.y += rounddown(characterobject.vy / 10);
					if (
						characterobject.vy >= 0 &&
						characterobject.y >= characterobject.c3
					) {
						characterobject.y = characterobject.c3;
						characterobject.vy = 0;
					}
					if (
						characterobject.x <= this.maps.wx - 32 ||
						characterobject.x >= this.maps.wx + 512
					)
						characterobject.c = 0;
					characterobject.pt = 90 + this.g_ac2;
					characterobject.pth = 0;
					break;

				case 2100:
					if (
						characterobject.x <= this.maps.wx - 32 ||
						characterobject.x >= this.maps.wx + 512
					)
						characterobject.c = 0;
					characterobject.pt = 42 + characterobject.c2;
					if (characterobject.c2 == 8) characterobject.pt = 59;
					characterobject.pth = 0;
					break;

				case 2200:
					if (characterobject.x < this.maps.wx)
						characterobject.x = this.maps.wx;
					else if (characterobject.x > this.maps.wx + 512 - 32)
						characterobject.x = this.maps.wx + 512 - 32;
					if (characterobject.y < this.maps.wy + 64)
						characterobject.y = this.maps.wy + 64;
					else if (characterobject.y > this.maps.wy + 224)
						characterobject.y = this.maps.wy + 224;
					if (this.stage_max >= 2 && this.stage >= this.stage_max) {
						if (this.g_ac2 == 0) characterobject.pt = 99;
						else characterobject.pt = 98;
					} else if (this.g_ac2 == 0) characterobject.pt = 95;
					else characterobject.pt = 94;
					characterobject.pth = 0;
					break;
			}
			if (characterobject.c == 0) this.m_kazu--;
			else if (this.co_j.c >= 100 && this.co_j.c < 200)
				if (characterobject.c >= 2000) {
					if (
						Math.abs(characterobject.x - this.co_j.x) <= 14 &&
						characterobject.y <= this.co_j.y + 26 &&
						characterobject.y + 15 >= this.co_j.y
					) {
						this.addScore(5);
						if (characterobject.c == 2100) {
							if (characterobject.c2 == 0) this.j_fire_f = true;
							else if (characterobject.c2 == 1) {
								this.j_v_c = 150;
								this.j_v_kakudo = 0;
							} else if (characterobject.c2 == 2) {
								if (this.time_max > 0) this.time += 30000;
							} else if (characterobject.c2 == 3)
								this.j_jet_fuel += 80;
							else if (characterobject.c2 == 4)
								this.j_helm_f = true;
							else if (characterobject.c2 == 5)
								this.j_tail_f = true;
							else if (characterobject.c2 == 6)
								this.j_drell_f = true;
							else if (characterobject.c2 == 7) this.j_gr_kazu++;
							else if (characterobject.c2 == 8) this.j_left++;
						} else if (characterobject.c == 2200) {
							this.stage_cc = 1;
							if (
								this.stage_max >= 2 &&
								this.stage >= this.stage_max
							)
								this.addScore(995);
							else this.addScore(95);
						}
						characterobject.c = 0;
						this.m_kazu--;
					}
				} else if (
					characterobject.c >= 100 &&
					Math.abs(characterobject.x - this.co_j.x) <= 23 &&
					Math.abs(characterobject.y - this.co_j.y) <= 28
				)
					if (this.j_v_c > 0) {
						characterobject.c = 0;
						this.m_kazu--;
					} else {
						this.jShinu(1);
						if (characterobject.c == 800) {
							characterobject.c = 70;
							characterobject.c1 = 1;
							characterobject.c2 = 20;
						}
					}
		}
};

MainProgram.prototype.jmSet = function(i, j, k) {
	for (var l = 0; l <= 1; l++) {
		if (this.co_jm[l].c > 0) continue;
		var characterobject = this.co_jm[l];
		characterobject.c = k;
		characterobject.x = i;
		characterobject.y = j + 8;
		characterobject.c1 = 0;
		this.jm_kazu++;
		switch (k) {
			case 60:
				characterobject.x = i + 16;
				characterobject.y = j;
				characterobject.vx = i + 16;
				characterobject.c4 = 8;
				this.j_gr_kazu--;
				break;

			case 65:
				characterobject.x = i + 16;
				characterobject.y = j;
				characterobject.vx = i + 16;
				characterobject.c4 = 8;
				this.j_gr_kazu--;
				break;

			case 100:
				characterobject.vx = rounddown(this.co_j.vx / 10) - 10;
				characterobject.vy = -28;
				if (Math.abs(characterobject.vx) < 2) characterobject.vx = -2;
				break;

			case 105:
				characterobject.vx = rounddown(this.co_j.vx / 10) + 10;
				characterobject.vy = -28;
				if (Math.abs(characterobject.vx) < 2) characterobject.vx = 2;
				break;

			case 200:
				characterobject.vx = rounddown(this.co_j.vx / 10) - 10;
				characterobject.vy = -32;
				if (Math.abs(characterobject.vx) < 2) characterobject.vx = -2;
				if (this.grenade_type == 5 || this.grenade_type == 6) {
					characterobject.y = j;
					characterobject.vx = -20;
					characterobject.vy = 0;
				}
				this.j_gr_kazu--;
				break;

			case 205:
				characterobject.c = 200;
				characterobject.vx = rounddown(this.co_j.vx / 10) + 10;
				characterobject.vy = -35;
				if (Math.abs(characterobject.vx) < 2) characterobject.vx = 2;
				if (this.grenade_type == 5 || this.grenade_type == 6) {
					characterobject.y = j;
					characterobject.vx = 20;
					characterobject.vy = 0;
				}
				this.j_gr_kazu--;
				break;
		}
		break;
	}
};

MainProgram.prototype.jmMove = function() {
	for (var i = 0; i <= 1; i++)
		if (this.co_jm[i].c != 0) {
			var characterobject = this.co_jm[i];
			switch (characterobject.c) {
				case 50:
					characterobject.c1++;
					switch (characterobject.c1) {
						case 1:
							characterobject.c2 = 20;
							break;

						case 2:
							characterobject.c2 = 34;
							break;

						case 3:
							characterobject.c2 = 46;
							break;

						case 4:
							characterobject.c2 = 56;
							break;

						case 5:
							characterobject.c2 = 64;
							break;

						case 6:
							characterobject.c2 = 70;
							break;

						case 7:
							characterobject.c2 = 74;
							break;

						case 8:
							characterobject.c2 = 77;
							break;

						case 9:
							characterobject.c2 = 79;
							break;

						case 10:
							characterobject.c2 = 80;
							break;
					}
					if (characterobject.c1 > 10) {
						characterobject.c2 = 10;
						characterobject.c = 0;
					}
					for (var j = 0; j <= this.t_kazu; j++)
						if (this.co_t[j].c >= 100) {
							var characterobject1 = this.co_t[j];
							var j1 = characterobject1.x - characterobject.x;
							var l1 = characterobject1.y - characterobject.y;
							var j2 = Math.floor(Math.sqrt(j1 * j1 + l1 * l1));
							if (j2 <= characterobject.c2 + 8) {
								if (characterobject.x > characterobject1.x) {
									characterobject1.pth = 1;
									characterobject1.vx = -3;
								} else {
									characterobject1.pth = 0;
									characterobject1.vx = 3;
								}
								characterobject1.c = 52;
								characterobject1.vy = -25;
							}
						}

					if (
						(this.grenade_type == 1 || this.grenade_type == 5) &&
						this.co_b.c >= 100
					) {
						var k1 = this.co_b.x - characterobject.x;
						var i2 = this.co_b.y - characterobject.y;
						var k2 = Math.floor(Math.sqrt(k1 * k1 + i2 * i2));
						if (k2 <= characterobject.c2 + 20)
							if (this.co_b.c < 200) {
								this.co_b.c = 67;
								this.co_b.vy = -24;
								this.co_b.c1 = 0;
								if (characterobject.x > this.co_b.x) {
									this.co_b.muki = 1;
									this.co_b.pt = 1005;
									this.co_b.vx = -4;
								} else {
									this.co_b.muki = 0;
									this.co_b.pt = 1000;
									this.co_b.vx = 4;
								}
							} else if (this.co_b.c < 300) {
								this.co_b.c = 77;
								this.co_b.vy = -24;
								this.co_b.c1 = 0;
								if (characterobject.x > this.co_b.x) {
									this.co_b.muki = 1;
									this.co_b.pt = 1105;
									this.co_b.vx = -4;
								} else {
									this.co_b.muki = 0;
									this.co_b.pt = 1100;
									this.co_b.vx = 4;
								}
							} else {
								this.co_b.c = 87;
								this.co_b.vy = -24;
								this.co_b.c1 = 0;
								if (characterobject.x > this.co_b.x) {
									this.co_b.muki = 1;
									this.co_b.pt = 1205;
									this.co_b.vx = -4;
								} else {
									this.co_b.muki = 0;
									this.co_b.pt = 1200;
									this.co_b.vx = 4;
								}
							}
					}
					characterobject.pt = 1000;
					characterobject.pth = 0;
					break;

				case 60:
					characterobject.y = this.co_j.y;
					characterobject.x -= 28;
					if (characterobject.x <= this.maps.wx - 32)
						characterobject.x = this.maps.wx - 32;
					if (characterobject.c4 > 0) {
						characterobject.c4--;
						characterobject.vx = this.co_j.x + 16;
					} else {
						characterobject.vx -= 28;
						if (characterobject.vx <= characterobject.x)
							characterobject.c = 0;
					}
					for (var k = 0; k <= this.t_kazu; k++)
						if (this.co_t[k].c >= 100) {
							var characterobject2 = this.co_t[k];
							if (
								characterobject2.x > characterobject.x - 12 &&
								characterobject2.x < characterobject.vx + 12 &&
								Math.abs(
									characterobject2.y - characterobject.y
								) < 24
							) {
								characterobject2.pth = 0;
								characterobject2.vx = -3;
								characterobject2.c = 52;
								characterobject2.vy = -25;
							}
						}

					if (
						this.grenade_type == 3 &&
						this.co_b.c >= 100 &&
						this.co_b.x > characterobject.x - 24 &&
						this.co_b.x < characterobject.vx + 24 &&
						Math.abs(this.co_b.y - characterobject.y) < 36
					)
						if (this.co_b.c < 200) {
							this.co_b.c = 67;
							this.co_b.vy = -24;
							this.co_b.c1 = 0;
							this.co_b.muki = 1;
							this.co_b.pt = 1005;
							this.co_b.vx = -4;
						} else if (this.co_b.c < 300) {
							this.co_b.c = 77;
							this.co_b.vy = -24;
							this.co_b.c1 = 0;
							this.co_b.muki = 1;
							this.co_b.pt = 1105;
							this.co_b.vx = -4;
						} else {
							this.co_b.c = 87;
							this.co_b.vy = -24;
							this.co_b.c1 = 0;
							this.co_b.muki = 1;
							this.co_b.pt = 1205;
							this.co_b.vx = -4;
						}
					if (this.co_j.c < 100 || this.co_j.c >= 200)
						characterobject.c = 0;
					characterobject.pt = 1200;
					break;

				case 65:
					characterobject.y = this.co_j.y;
					characterobject.x += 28;
					if (characterobject.x >= this.maps.wx + 512 + 32)
						characterobject.x = this.maps.wx + 512 + 32;
					if (characterobject.c4 > 0) {
						characterobject.c4--;
						characterobject.vx = this.co_j.x + 16;
					} else {
						characterobject.vx += 28;
						if (characterobject.vx >= characterobject.x)
							characterobject.c = 0;
					}
					for (var l = 0; l <= this.t_kazu; l++)
						if (this.co_t[l].c >= 100) {
							var characterobject3 = this.co_t[l];
							if (
								characterobject3.x > characterobject.vx - 12 &&
								characterobject3.x < characterobject.x + 12 &&
								Math.abs(
									characterobject3.y - characterobject.y
								) < 24
							) {
								characterobject3.pth = 0;
								characterobject3.vx = 3;
								characterobject3.c = 52;
								characterobject3.vy = -25;
							}
						}

					if (
						this.grenade_type == 3 &&
						this.co_b.c >= 100 &&
						this.co_b.x > characterobject.vx - 24 &&
						this.co_b.x < characterobject.x + 24 &&
						Math.abs(this.co_b.y - characterobject.y) < 36
					)
						if (this.co_b.c < 200) {
							this.co_b.c = 67;
							this.co_b.vy = -24;
							this.co_b.c1 = 0;
							this.co_b.muki = 0;
							this.co_b.pt = 1000;
							this.co_b.vx = 4;
						} else if (this.co_b.c < 300) {
							this.co_b.c = 77;
							this.co_b.vy = -24;
							this.co_b.c1 = 0;
							this.co_b.muki = 0;
							this.co_b.pt = 1100;
							this.co_b.vx = 4;
						} else {
							this.co_b.c = 87;
							this.co_b.vy = -24;
							this.co_b.c1 = 0;
							this.co_b.muki = 0;
							this.co_b.pt = 1200;
							this.co_b.vx = 4;
						}
					if (this.co_j.c < 100 || this.co_j.c >= 200)
						characterobject.c = 0;
					characterobject.pt = 1205;
					break;

				case 100:
					characterobject.x += characterobject.vx;
					if (
						this.maps.getBGCode(
							characterobject.x + 7,
							characterobject.y + 15
						) >= 20
					)
						characterobject.c = 0;
					characterobject.vy += 5;
					if (characterobject.vy > 30) characterobject.vy = 30;
					characterobject.y += characterobject.vy;
					if (
						characterobject.vy < 0 &&
						this.maps.getBGCode(
							characterobject.x + 15,
							characterobject.y + 8
						) >= 20
					)
						characterobject.c = 0;
					if (
						this.maps.getBGCode(
							characterobject.x + 15,
							characterobject.y + 23
						) >= 20
					) {
						characterobject.y =
							((characterobject.y + 23) >> 5) * 32 - 24;
						characterobject.vy = -28;
					}
					if (
						!this.j_fire_mkf &&
						this.maps.getBGCode(
							characterobject.x + 15,
							characterobject.y + 15
						) == 4
					)
						characterobject.c = 0;
					if (
						characterobject.x <= this.maps.wx - 24 ||
						characterobject.x >= this.maps.wx + 512 - 8 ||
						characterobject.y <= this.maps.wy - 128 ||
						characterobject.y >= this.maps.wy + 384
					)
						characterobject.c = 0;
					characterobject.pt = 130 + this.g_c2;
					characterobject.pth = 0;
					break;

				case 105:
					characterobject.x += characterobject.vx;
					if (
						this.maps.getBGCode(
							characterobject.x + 23,
							characterobject.y + 15
						) >= 20
					)
						characterobject.c = 0;
					characterobject.vy += 5;
					if (characterobject.vy > 30) characterobject.vy = 30;
					characterobject.y += characterobject.vy;
					if (
						characterobject.vy < 0 &&
						this.maps.getBGCode(
							characterobject.x + 15,
							characterobject.y + 8
						) >= 20
					)
						characterobject.c = 0;
					if (
						this.maps.getBGCode(
							characterobject.x + 15,
							characterobject.y + 23
						) >= 20
					) {
						characterobject.y =
							((characterobject.y + 23) >> 5) * 32 - 24;
						characterobject.vy = -28;
					}
					if (
						!this.j_fire_mkf &&
						this.maps.getBGCode(
							characterobject.x + 15,
							characterobject.y + 15
						) == 4
					)
						characterobject.c = 0;
					if (
						characterobject.x <= this.maps.wx - 24 ||
						characterobject.x >= this.maps.wx + 512 - 8 ||
						characterobject.y <= this.maps.wy - 128 ||
						characterobject.y >= this.maps.wy + 384
					)
						characterobject.c = 0;
					characterobject.pt = 130 + this.g_c2;
					characterobject.pth = 1;
					break;

				case 200:
					characterobject.x += characterobject.vx;
					if (this.grenade_type != 5 && this.grenade_type != 6) {
						characterobject.vy += 5;
						if (characterobject.vy > 30) characterobject.vy = 30;
						characterobject.y += characterobject.vy;
						if (
							characterobject.vy > 0 &&
							this.maps.getBGCode(
								characterobject.x + 15,
								characterobject.y + 31
							) >= 20
						) {
							characterobject.c = 50;
							characterobject.y =
								((characterobject.y + 31) >> 5) * 32 - 16;
							characterobject.c1 = 1;
							characterobject.c2 = 20;
						}
					}
					if (
						this.maps.getBGCode(
							characterobject.x + 15,
							characterobject.y + 15
						) >= 20
					) {
						characterobject.c = 50;
						characterobject.c1 = 1;
						characterobject.c2 = 20;
					}
					if (
						characterobject.x <= this.maps.wx - 64 ||
						characterobject.x >= this.maps.wx + 512 + 64 ||
						characterobject.y <= this.maps.wy - 128 ||
						characterobject.y >= this.maps.wy + 384
					)
						characterobject.c = 0;
					characterobject.pt = 137 + this.g_c1;
					if (characterobject.vx < 0) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;
			}
			if (characterobject.c == 0) this.jm_kazu--;
			else if (characterobject.c >= 100) {
				for (var i1 = 0; i1 <= this.t_kazu; i1++) {
					if (this.co_t[i1].c < 100) continue;
					var characterobject4 = this.co_t[i1];
					if (
						Math.abs(characterobject.x - characterobject4.x) >=
							22 ||
						Math.abs(characterobject.y - characterobject4.y) >= 22
					)
						continue;
					if (characterobject.vx < 0) {
						characterobject4.pth = 1;
						characterobject4.vx = -3;
					} else {
						characterobject4.pth = 0;
						characterobject4.vx = 3;
					}
					characterobject4.c = 52;
					characterobject4.vy = -25;
					if (characterobject.c == 200) {
						characterobject.c = 50;
						characterobject.c1 = 1;
						characterobject.c2 = 20;
					} else {
						characterobject.c = 0;
						this.jm_kazu--;
					}
					break;
				}
			}
		}
};

MainProgram.prototype.aSet = function(i, j, k, l) {
	for (var i1 = 0; i1 <= 31; i1++) {
		if (this.co_a[i1].c > 0) continue;
		var characterobject = this.co_a[i1];
		characterobject.c = k;
		characterobject.c1 = l - 512 - 32;
		characterobject.c2 = l + 128;
		characterobject.x = i;
		characterobject.y = j;
		this.a_kazu++;
		switch (k) {
			case 60:
				characterobject.pt = 200;
				break;

			case 70:
				characterobject.vx = -3;
				characterobject.c3 = 0;
				characterobject.c1 = i - 512 - 150;
				characterobject.c2 = i + 150;
				break;

			case 71:
				characterobject.c = 70;
				characterobject.vx = 3;
				characterobject.c3 = 0;
				characterobject.c1 = i - 512 - 150;
				characterobject.c2 = i + 150;
				break;

			case 80:
				characterobject.pt = 800;
				characterobject.c3 = 1;
				break;

			case 81:
				characterobject.c = 80;
				characterobject.pt = 800;
				characterobject.c3 = 2;
				break;

			case 82:
				characterobject.c = 80;
				characterobject.pt = 800;
				characterobject.c3 = 3;
				break;

			case 83:
				characterobject.c = 80;
				characterobject.pt = 800;
				characterobject.c3 = 4;
				break;

			case 100:
				characterobject.vy = 5;
				characterobject.x = i + 8;
				characterobject.y = j - 212;
				characterobject.c3 = j - 212;
				characterobject.c4 = j + 2;
				characterobject.pt = 100;
				break;

			case 110:
				characterobject.vx = -3;
				characterobject.x = i + 208;
				characterobject.c3 = i;
				characterobject.c4 = i + 208;
				characterobject.pt = 100;
				characterobject.c2 = l + 208 + 128 + 32;
				break;

			case 115:
				characterobject.c = 110;
				characterobject.vx = -3;
				characterobject.x = i + 208;
				characterobject.c3 = i;
				characterobject.c4 = i + 208;
				characterobject.pt = 100;
				characterobject.c2 = l + 208 + 128 + 342 + 32;
				break;

			case 116:
				characterobject.c = 110;
				characterobject.vx = 3;
				characterobject.x = i + 320;
				characterobject.c3 = i + 320;
				characterobject.c4 = i + 208 + 320;
				characterobject.pt = 100;
				characterobject.c2 = l + 208 + 128 + 320 + 32;
				break;

			case 120:
				characterobject.vx = i + 160;
				characterobject.vy = j;
				characterobject.x = i + 8;
				characterobject.y = j;
				characterobject.c3 = 0;
				characterobject.muki = 1;
				characterobject.c1 = characterobject.vx - 512 - 32 - 130;
				characterobject.c2 = characterobject.vx + 128 + 130;
				characterobject.pt = 100;
				break;

			case 121:
				characterobject.c = 120;
				characterobject.vx = i + 160;
				characterobject.vy = j;
				characterobject.x = i + 8;
				characterobject.y = j;
				characterobject.c3 = 0;
				characterobject.muki = 0;
				characterobject.c1 = characterobject.vx - 512 - 32 - 130;
				characterobject.c2 = characterobject.vx + 128 + 130;
				characterobject.pt = 100;
				break;

			case 300:
				characterobject.pt = 300;
				characterobject.c3 = 0;
				characterobject.c4 = 0;
				break;

			case 310:
				characterobject.c = 300;
				characterobject.pt = 310;
				characterobject.c3 = 1;
				characterobject.c4 = 0;
				break;

			case 320:
				characterobject.c = 300;
				characterobject.pt = 320;
				characterobject.c3 = 2;
				characterobject.c4 = 0;
				break;

			case 330:
				characterobject.c = 300;
				characterobject.pt = 330;
				characterobject.c3 = 3;
				characterobject.c4 = 0;
				break;

			case 400:
				characterobject.pt = 400;
				characterobject.c3 = 0;
				characterobject.vy = j;
				break;

			case 500:
				characterobject.vy = 0;
				characterobject.x = i;
				characterobject.y = j;
				characterobject.c3 = 0;
				characterobject.c4 = 0;
				characterobject.pt = 500;
				break;

			case 510:
				characterobject.c = 500;
				characterobject.vy = 0;
				characterobject.x = i;
				characterobject.y = j;
				characterobject.c3 = 0;
				characterobject.c4 = 1;
				characterobject.pt = 500;
				break;

			case 600:
				characterobject.pt = 600;
				characterobject.c3 = 0;
				characterobject.c4 = 0;
				characterobject.vx = 0;
				characterobject.vy = j;
				break;

			case 700:
				characterobject.pt = 700;
				characterobject.c3 = 0;
				break;
		}
		break;
	}
};

MainProgram.prototype.aMove = function() {
	var flag = false;
	var flag1 = false;
	this.j_a_id = -1;
	this.j_jdai_f = false;
	this.a_hf = false;
	for (var i = 0; i <= this.a_kazu; i++) {
		var characterobject = this.co_a[i];
		if (characterobject.c != 0)
			if (
				this.maps.wx <= characterobject.c1 ||
				this.maps.wx >= characterobject.c2
			) {
				characterobject.gf = false;
			} else {
				var k = characterobject.x;
				var l = characterobject.y;
				switch (characterobject.c) {
					case 60:
						if (
							k > this.maps.wx - 80 &&
							k < this.maps.wx + 512 &&
							l > this.maps.wy - 96 &&
							l < this.maps.wy + 320
						) {
							characterobject.gf = true;
							this.a_hf = true;
							if (this.g_c3 <= 3) characterobject.pt = 200;
							else characterobject.pt = 210;
						} else {
							characterobject.gf = false;
						}
						break;

					case 70:
						characterobject.c3 += characterobject.vx;
						if (characterobject.c3 < 0) characterobject.c3 += 360;
						else if (characterobject.c3 >= 360)
							characterobject.c3 -= 360;
						if (
							k > this.maps.wx - 150 &&
							k < this.maps.wx + 512 + 150 &&
							l > this.maps.wy - 150 &&
							l < this.maps.wy + 320 + 150
						) {
							characterobject.gf = true;
							this.a_hf = true;
							characterobject.pt = 1100;
							var d = 0.017453292519943295;
							var l11 =
								k +
								Math.floor(
									Math.cos(characterobject.c3 * d) * 25
								);
							var j12 =
								l +
								Math.floor(
									Math.sin(characterobject.c3 * d) * 25
								);
							this.vo_x[i][0] = l11;
							this.vo_y[i][0] = j12;
							var l12 =
								k +
								Math.floor(
									Math.cos(characterobject.c3 * d) * 140
								);
							var i13 =
								l +
								Math.floor(
									Math.sin(characterobject.c3 * d) * 140
								);
							this.vo_x[i][1] = l12;
							this.vo_y[i][1] = i13;
							this.vo_x[i][2] =
								k +
								Math.floor(
									Math.cos(characterobject.c3 * d) * 31
								);
							this.vo_y[i][2] =
								l +
								Math.floor(
									Math.sin(characterobject.c3 * d) * 31
								);
							this.vo_x[i][3] =
								k +
								Math.floor(
									Math.cos(characterobject.c3 * d) * 134
								);
							this.vo_y[i][3] =
								l +
								Math.floor(
									Math.sin(characterobject.c3 * d) * 134
								);
							if (
								this.co_j.c >= 100 &&
								this.co_j.c < 200 &&
								this.j_v_c <= 0
							)
								if (
									Math.abs(l11 - l12) >= Math.abs(j12 - i13)
								) {
									if (
										this.co_j.x + 15 > l11 &&
										this.co_j.x + 15 < l12
									) {
										var i1 = l12 - l11;
										var j4 = this.co_j.x + 15 - l11;
										var k7 = i13 - j12;
										var l10 =
											rounddown((j4 * k7) / i1) + j12;
										if (
											l10 > this.co_j.y - 12 &&
											l10 < this.co_j.y + 44
										)
											this.jShinu(1);
									} else if (
										this.co_j.x + 15 > l12 &&
										this.co_j.x + 15 < l11
									) {
										var j1 = l11 - l12;
										var k4 = this.co_j.x + 15 - l12;
										var l7 = j12 - i13;
										var i11 =
											rounddown((k4 * l7) / j1) + i13;
										if (
											i11 > this.co_j.y - 12 &&
											i11 < this.co_j.y + 44
										)
											this.jShinu(1);
									}
								} else if (
									this.co_j.y + 15 > j12 &&
									this.co_j.y + 15 < i13
								) {
									var k1 = i13 - j12;
									var l4 = this.co_j.y + 15 - j12;
									var i8 = l12 - l11;
									var j11 = rounddown((l4 * i8) / k1) + l11;
									if (
										j11 > this.co_j.x - 12 &&
										j11 < this.co_j.x + 44
									)
										this.jShinu(1);
								} else if (
									this.co_j.y + 15 > i13 &&
									this.co_j.y + 15 < j12
								) {
									var l1 = j12 - i13;
									var i5 = this.co_j.y + 15 - i13;
									var j8 = l11 - l12;
									var k11 = rounddown((i5 * j8) / l1) + l12;
									if (
										k11 > this.co_j.x - 12 &&
										k11 < this.co_j.x + 44
									)
										this.jShinu(1);
								}
						} else {
							characterobject.gf = false;
						}
						break;

					case 80:
						if (
							k > this.maps.wx - 32 &&
							k < this.maps.wx + 512 &&
							l > this.maps.wy - 32 &&
							l < this.maps.wy + 320
						) {
							characterobject.gf = true;
							this.a_hf = true;
							if (
								this.co_j.x >= k - 80 &&
								this.co_j.x <= k + 64 &&
								Math.abs(l - this.co_j.y) < 32
							) {
								this.hitokoto_c = 10;
								this.hitokoto_num = characterobject.c3;
							}
						} else {
							characterobject.gf = false;
						}
						break;

					case 100:
						if (
							k > this.maps.wx - 80 - 32 &&
							k < this.maps.wx + 512 + 32 &&
							l > this.maps.wy - 16 &&
							l < this.maps.wy + 320 + 32
						) {
							characterobject.gf = true;
							this.a_hf = true;
							if (
								this.co_j.c == 100 &&
								this.co_j.x + 15 >= k &&
								this.co_j.x <= k + 64 &&
								this.co_j.y == l - 32
							)
								this.j_a_id = i;
						} else {
							characterobject.gf = false;
						}
						if (l <= characterobject.c3) {
							characterobject.vy++;
							if (characterobject.vy > 5) characterobject.vy = 5;
						} else if (l >= characterobject.c4) {
							characterobject.vy--;
							if (characterobject.vy < -5)
								characterobject.vy = -5;
						}
						l += characterobject.vy;
						if (this.co_j.c == 100) {
							if (this.j_a_id == i) this.co_j.y = l - 32;
							if (
								characterobject.vy < 0 &&
								this.maps.getBGCode(
									this.co_j.x + 15,
									this.co_j.y
								) >= 20
							) {
								this.co_j.y = (this.co_j.y >> 5) * 32 + 16;
								this.jShinu(3);
							}
							if (
								this.co_j.x + 15 >= k &&
								this.co_j.x <= k + 64 &&
								this.co_j.y + 31 >= l &&
								this.co_j.y <= l + 13
							)
								if (characterobject.vy > 0) {
									this.co_j.y = l + 14;
									if (
										this.maps.getBGCode(
											this.co_j.x + 15,
											this.co_j.y + 31
										) >= 18
									) {
										this.co_j.y =
											((this.co_j.y + 31) >> 5) * 32 - 32;
										this.jShinu(3);
									}
								} else {
									this.co_j.y = l - 32;
									this.j_a_id = i;
								}
						}
						break;

					case 110:
						if (
							k > this.maps.wx - 80 - 32 &&
							k < this.maps.wx + 512 + 32 &&
							l > this.maps.wy - 16 &&
							l < this.maps.wy + 320 + 32
						) {
							characterobject.gf = true;
							this.a_hf = true;
							if (
								this.co_j.c == 100 &&
								this.co_j.x + 15 >= k &&
								this.co_j.x <= k + 64 &&
								this.co_j.y == l - 32
							)
								this.j_a_id = i;
						} else {
							characterobject.gf = false;
						}
						if (k <= characterobject.c3) {
							characterobject.vx++;
							if (characterobject.vx > 3) characterobject.vx = 3;
						} else if (k >= characterobject.c4) {
							characterobject.vx--;
							if (characterobject.vx < -3)
								characterobject.vx = -3;
						}
						k += characterobject.vx;
						if (this.co_j.c == 100) {
							if (this.j_a_id == i) {
								this.co_j.x += characterobject.vx;
								if (characterobject.vx > 0) {
									var i2 = (this.co_j.x + 15) >> 5;
									var j5 = this.co_j.y >> 5;
									var k8 = (this.co_j.y + 31) >> 5;
									if (
										this.maps.map_bg[i2][j5] >= 20 ||
										this.maps.map_bg[i2][k8] >= 20
									)
										this.co_j.x = i2 * 32 - 16;
								} else if (characterobject.vx < 0) {
									var j2 = (this.co_j.x + 15) >> 5;
									var k5 = this.co_j.y >> 5;
									var l8 = (this.co_j.y + 31) >> 5;
									if (
										this.maps.map_bg[j2][k5] >= 20 ||
										this.maps.map_bg[j2][l8] >= 20
									)
										this.co_j.x = j2 * 32 + 32 - 14;
								}
							}
							if (
								this.co_j.x + 15 >= k &&
								this.co_j.x <= k + 64 &&
								this.co_j.y + 31 >= l &&
								this.co_j.y <= l + 13
							)
								if (characterobject.vx > 0) {
									this.co_j.x = k + 65;
									var k2 = (this.co_j.x + 15) >> 5;
									var l5 = this.co_j.y >> 5;
									var i9 = (this.co_j.y + 31) >> 5;
									if (
										this.maps.map_bg[k2][l5] >= 20 ||
										this.maps.map_bg[k2][i9] >= 20
									) {
										this.co_j.c = 230;
										this.co_j.x = k2 * 32 - 32 + 11;
										this.co_j.c1 = 0;
										this.j_zan_f = false;
										this.j_jet_c = 0;
										this.j_v_c = 0;
									}
								} else {
									this.co_j.x = k - 16;
									var l2 = (this.co_j.x + 15) >> 5;
									var i6 = this.co_j.y >> 5;
									var j9 = (this.co_j.y + 31) >> 5;
									if (
										this.maps.map_bg[l2][i6] >= 20 ||
										this.maps.map_bg[l2][i6] >= 20
									) {
										this.co_j.c = 230;
										this.co_j.x = l2 * 32 + 32 - 11;
										this.co_j.c1 = 0;
										this.j_zan_f = false;
										this.j_jet_c = 0;
										this.j_v_c = 0;
									}
								}
						}
						break;

					case 120:
						if (
							k > this.maps.wx - 80 - 32 &&
							k < this.maps.wx + 512 + 32 &&
							l > this.maps.wy - 16 &&
							l < this.maps.wy + 320 + 32
						) {
							characterobject.gf = true;
							this.a_hf = true;
							if (
								this.co_j.c == 100 &&
								this.co_j.x + 15 >= k &&
								this.co_j.x <= k + 64 &&
								this.co_j.y == l - 32
							)
								this.j_a_id = i;
						} else {
							characterobject.gf = false;
						}
						if (characterobject.muki == 1) {
							characterobject.c3 += 2;
							if (characterobject.c3 >= 360)
								characterobject.c3 -= 360;
						} else {
							characterobject.c3 -= 2;
							if (characterobject.c3 < 0)
								characterobject.c3 += 360;
						}
						var d1 = (characterobject.c3 * 3.14) / 180;
						var i12 =
							characterobject.vx +
							Math.floor(Math.cos(d1) * 126) +
							16 -
							40;
						var k12 =
							characterobject.vy +
							Math.floor(Math.sin(d1) * -126) +
							16 -
							7;
						var j13 = i12 - k;
						var k13 = k12 - l;
						l += k13;
						if (this.co_j.c == 100) {
							if (this.j_a_id == i) this.co_j.y += k13;
							if (
								k13 < 0 &&
								this.maps.getBGCode(
									this.co_j.x + 15,
									this.co_j.y
								) >= 20
							) {
								this.co_j.y = (this.co_j.y >> 5) * 32 + 16;
								this.jShinu(3);
							}
							if (
								this.co_j.x + 15 >= k &&
								this.co_j.x <= k + 64 &&
								this.co_j.y + 31 >= l &&
								this.co_j.y <= l + 13
							)
								if (k13 > 0) {
									this.co_j.y = l + 14;
									if (
										this.maps.getBGCode(
											this.co_j.x + 15,
											this.co_j.y + 31
										) >= 18
									) {
										this.co_j.y =
											((this.co_j.y + 31) >> 5) * 32 - 32;
										this.jShinu(3);
									}
								} else {
									this.co_j.y = l - 32;
									this.j_a_id = i;
								}
						}
						k += j13;
						if (this.co_j.c == 100) {
							if (this.j_a_id == i) {
								this.co_j.x += j13;
								if (j13 > 0) {
									var i3 = (this.co_j.x + 15) >> 5;
									var j6 = this.co_j.y >> 5;
									var k9 = (this.co_j.y + 31) >> 5;
									if (
										this.maps.map_bg[i3][j6] >= 20 ||
										this.maps.map_bg[i3][k9] >= 20
									)
										this.co_j.x = i3 * 32 - 16;
								} else if (j13 < 0) {
									var j3 = (this.co_j.x + 15) >> 5;
									var k6 = this.co_j.y >> 5;
									var l9 = (this.co_j.y + 31) >> 5;
									if (
										this.maps.map_bg[j3][k6] >= 20 ||
										this.maps.map_bg[j3][l9] >= 20
									)
										this.co_j.x = j3 * 32 + 32 - 14;
								}
							}
							if (
								this.co_j.x + 15 >= k &&
								this.co_j.x <= k + 64 &&
								this.co_j.y + 31 >= l &&
								this.co_j.y <= l + 13
							)
								if (j13 > 0) {
									this.co_j.x = k + 65;
									var k3 = (this.co_j.x + 15) >> 5;
									var l6 = this.co_j.y >> 5;
									var i10 = (this.co_j.y + 31) >> 5;
									if (
										this.maps.map_bg[k3][l6] >= 20 ||
										this.maps.map_bg[k3][i10] >= 20
									) {
										this.co_j.c = 230;
										this.co_j.x = k3 * 32 - 32 + 11;
										this.co_j.c1 = 0;
										this.j_zan_f = false;
										this.j_jet_c = 0;
										this.j_v_c = 0;
									}
								} else {
									this.co_j.x = k - 16;
									var l3 = (this.co_j.x + 15) >> 5;
									var i7 = this.co_j.y >> 5;
									var j10 = (this.co_j.y + 31) >> 5;
									if (
										this.maps.map_bg[l3][i7] >= 20 ||
										this.maps.map_bg[l3][j10] >= 20
									) {
										this.co_j.c = 230;
										this.co_j.x = l3 * 32 + 32 - 11;
										this.co_j.c1 = 0;
										this.j_zan_f = false;
										this.j_jet_c = 0;
										this.j_v_c = 0;
									}
								}
						}
						break;

					case 300:
						if (
							k > this.maps.wx - 96 &&
							k < this.maps.wx + 512 &&
							l > this.maps.wy - 64 &&
							l < this.maps.wy + 320
						) {
							characterobject.gf = true;
							this.a_hf = true;
							if (
								this.co_j.c == 100 &&
								this.co_j.x + 15 >= k &&
								this.co_j.x <= k + 48 &&
								this.co_j.y == l - 32
							) {
								this.j_a_id = i;
								if (
									this.co_j.x + 15 >= k + 24 &&
									this.co_j.x <= k + 48 - 24 &&
									this.co_j.y == l - 32 &&
									characterobject.c4 != 1 &&
									(this.sl_step == 0 ||
										this.sl_step == 1 ||
										this.sl_step == 10 ||
										this.sl_step == 11 ||
										this.dokan_mode != 2)
								) {
									this.co_j.c1 = -10;
									this.co_j.c2 = characterobject.c3;
									this.j_zan_f = false;
									this.j_jet_c = 0;
									this.j_v_c = 0;
									this.co_j.c = 300;
									this.co_j.x = k + 16;
									this.co_j.y = l - 32;
									this.co_j.vx = 0;
									this.co_j.vy = 0;
									characterobject.c4 = 1;
								}
							}
							if (this.co_j.c == 100 && this.j_a_id != i)
								characterobject.c4 = 0;
						} else {
							characterobject.gf = false;
						}
						break;

					case 400:
						if (
							k > this.maps.wx - 96 &&
							k < this.maps.wx + 512 &&
							l > this.maps.wy - 64 &&
							l < this.maps.wy + 320
						) {
							characterobject.gf = true;
							this.a_hf = true;
							if (
								this.co_j.c == 100 &&
								this.co_j.x + 15 >= k &&
								this.co_j.x <= k + 80 &&
								this.co_j.y == l - 32
							)
								this.j_a_id = i;
						} else {
							characterobject.gf = false;
						}
						if (characterobject.c3 == 0) {
							if (
								k - 64 < this.co_j.x + 15 &&
								k + 96 + 64 > this.co_j.x + 15
							)
								characterobject.c3 = 1;
						} else if (characterobject.c3 < 100) {
							characterobject.c3++;
							if (characterobject.c3 > 8)
								characterobject.c3 = 100;
						} else if (characterobject.c3 == 100) {
							if ((l += 12) >= characterobject.vy + 128) {
								l = characterobject.vy + 128;
								characterobject.c3 = 200;
							}
						} else if (
							characterobject.c3 == 200 &&
							(l -= 3) <= characterobject.vy
						) {
							l = characterobject.vy;
							characterobject.c3 = 0;
							if (
								k <= this.co_j.x + 15 &&
								k + 96 > this.co_j.x + 15
							)
								characterobject.c3 = 100;
						}
						if (this.co_j.c == 100) {
							if (this.j_a_id == i) {
								this.co_j.y = l - 32;
								if (
									characterobject.c3 == 200 &&
									this.maps.getBGCode(
										this.co_j.x + 15,
										this.co_j.y
									) >= 20
								) {
									this.co_j.y = (this.co_j.y >> 5) * 32 + 16;
									this.jShinu(3);
								}
							}
							if (
								this.co_j.x + 15 >= k &&
								this.co_j.x <= k + 80 &&
								this.co_j.y + 31 >= l &&
								this.co_j.y <= l + 63
							)
								if (characterobject.c3 == 100) {
									this.co_j.y = l + 64;
									if (
										this.maps.getBGCode(
											this.co_j.x + 15,
											this.co_j.y + 31
										) >= 18
									) {
										this.co_j.y =
											((this.co_j.y + 31) >> 5) * 32 - 32;
										this.jShinu(3);
									}
								} else if (characterobject.c3 == 200) {
									this.co_j.y = l - 32;
									this.j_a_id = i;
									if (
										this.maps.getBGCode(
											this.co_j.x + 15,
											this.co_j.y
										) >= 20
									) {
										this.co_j.y =
											(this.co_j.y >> 5) * 32 + 16;
										this.jShinu(3);
									}
								}
						}
						break;

					case 500:
						if (
							k > this.maps.wx - 96 - 32 &&
							k < this.maps.wx + 512 + 32 &&
							l > this.maps.wy - 32 &&
							l <= this.maps.wy + 368
						) {
							characterobject.gf = true;
							this.a_hf = true;
							if (
								this.co_j.c == 100 &&
								this.co_j.x + 15 >= k &&
								this.co_j.x <= k + 80 &&
								this.co_j.y == l - 32
							) {
								this.j_a_id = i;
								if (characterobject.c4 == 1) {
									if (characterobject.c3 < 50)
										if (characterobject.c3 <= 0)
											characterobject.c3 = 1;
										else if (characterobject.c3 <= 30) {
											characterobject.c3++;
										} else {
											characterobject.c3 = 55;
											characterobject.vy = 0;
										}
								} else if (characterobject.c3 <= 0) {
									characterobject.c3 = 51;
									characterobject.vy = 0;
								}
							} else if (
								characterobject.c4 == 1 &&
								characterobject.c3 < 50
							)
								characterobject.c3 = 0;
						} else {
							characterobject.gf = false;
						}
						if (characterobject.c3 > 0)
							if (
								characterobject.c3 >= 51 &&
								characterobject.c3 <= 54
							)
								characterobject.c3++;
							else if (
								characterobject.c3 >= 55 &&
								characterobject.c3 < 100
							) {
								if (characterobject.vy < 16)
									characterobject.vy++;
								l += characterobject.vy;
								if (this.maps.getBGCode(k + 32, l + 13) >= 20) {
									l = ((l + 13) >> 5) * 32 - 14;
									characterobject.c3 = 100;
								}
								if (l >= this.ochiru_y + 48) {
									characterobject.c = 0;
									characterobject.gf = false;
								}
							}
						if (this.co_j.c == 100 && this.j_a_id == i)
							this.co_j.y = l - 32;
						break;

					case 600:
						if (
							k > this.maps.wx - 96 &&
							k < this.maps.wx + 512 &&
							l > this.maps.wy - 64 &&
							l < this.maps.wy + 320
						) {
							characterobject.gf = true;
							this.a_hf = true;
							if (
								this.co_j.c == 100 &&
								this.co_j.x + 15 >= k &&
								this.co_j.x <= k + 48 &&
								this.co_j.y == l + 16 - 32
							)
								this.j_a_id = i;
						} else {
							characterobject.gf = false;
						}
						characterobject.pt = 600;
						if (characterobject.c3 <= 0) {
							characterobject.vx = 0;
							if (this.j_a_id == i) {
								characterobject.c3 = 100;
								characterobject.c4 = 0;
								characterobject.vx = 2;
							}
							if (this.co_j.x >= k - 144)
								characterobject.pt = 605;
						} else if (characterobject.c3 == 100) {
							characterobject.c1 = k - 512 - 32;
							characterobject.c2 = k + 128;
							if (this.j_a_id != i) {
								characterobject.c4++;
								if (characterobject.c4 > 50)
									characterobject.c3 = 0;
							} else {
								characterobject.c4 = 0;
							}
							characterobject.pt = 605;
						} else if (characterobject.c3 == 200) {
							characterobject.pt = 605;
							characterobject.vx = 0;
						}
						k += characterobject.vx;
						if (
							this.maps.getBGCode(k + 63 + 16, l) >= 20 ||
							this.maps.getBGCode(k + 63 + 16, l + 32) >= 20
						) {
							k = ((k + 63 + 16) >> 5) * 32 - 64 - 16;
							characterobject.vx = k - characterobject.x;
							characterobject.c3 = 200;
						}
						if (this.co_j.c == 100) {
							if (this.j_a_id == i) {
								this.co_j.x += characterobject.vx;
								if (characterobject.vx > 0) {
									var i4 = (this.co_j.x + 15) >> 5;
									var j7 = this.co_j.y >> 5;
									var k10 = (this.co_j.y + 31) >> 5;
									if (
										this.maps.map_bg[i4][j7] >= 20 ||
										this.maps.map_bg[i4][k10] >= 20
									)
										this.co_j.x = i4 * 32 - 16;
								}
							}
							if (
								this.co_j.x + 15 >= k &&
								this.co_j.x <= k + 48 &&
								this.co_j.y + 31 >= l + 16 &&
								this.co_j.y <= l + 47
							)
								this.co_j.x = k + 49;
						}
						break;

					case 700:
						if (
							k > this.maps.wx - 96 &&
							k < this.maps.wx + 512 &&
							l > this.maps.wy - 64 &&
							l < this.maps.wy + 320
						) {
							characterobject.gf = true;
							this.a_hf = true;
							if (
								this.co_j.c == 100 &&
								this.co_j.x + 15 >= k &&
								this.co_j.x <= k + 16
							)
								if (
									characterobject.c3 >= 1 &&
									characterobject.c3 <= 2 &&
									this.co_j.y == l - 32 + 10
								)
									this.j_a_id = i;
								else if (
									characterobject.c3 >= 3 &&
									characterobject.c3 <= 4 &&
									this.co_j.y == l - 32 + 16
								)
									this.j_a_id = i;
								else if (
									characterobject.c3 >= 5 &&
									characterobject.c3 <= 6 &&
									this.co_j.y == l - 32 + 10
								)
									this.j_a_id = i;
								else if (this.co_j.y == l - 32) this.j_a_id = i;
						} else {
							characterobject.gf = false;
						}
						if (this.j_a_id == i) {
							this.co_j.vx = 0;
							this.co_j.vy = 0;
							this.co_j.x = k;
							this.j_jdai_f = true;
							characterobject.c3++;
							if (characterobject.c3 <= 2) {
								characterobject.pt = 710;
								this.co_j.y = l - 32 + 10;
							} else if (characterobject.c3 <= 4) {
								characterobject.pt = 720;
								this.co_j.y = l - 32 + 16;
							} else if (characterobject.c3 <= 6) {
								characterobject.pt = 710;
								this.co_j.y = l - 32 + 10;
							} else if (characterobject.c3 >= 7) {
								characterobject.pt = 700;
								this.co_j.y = l - 32;
								characterobject.c3 = 0;
								this.j_a_id = -1;
								this.j_jump_type = 4;
								this.co_j.pt = 101;
								this.co_j.ac = 0;
								this.co_j.vy = -255;
								this.j_jump_level = 1;
								if (this.maps.getBGCode(k, l) == 4)
									this.co_j.vy = -75;
							}
						} else {
							characterobject.c3 = 0;
							characterobject.pt = 700;
						}
						break;
				}
				if (this.jm_kazu > 0) {
					for (var j = 0; j <= 1; j++)
						if (this.co_jm[j].c >= 100) {
							var characterobject1 = this.co_jm[j];
							if (characterobject.c < 200) {
								if (
									characterobject1.x + 15 >= k &&
									characterobject1.x <= k + 64 &&
									characterobject1.y + 29 >= l &&
									characterobject1.y + 2 <= l + 13
								)
									if (characterobject1.c == 200) {
										characterobject1.c = 50;
										characterobject1.y = l - 8;
										characterobject1.c1 = 1;
										characterobject1.c2 = 20;
									} else {
										characterobject1.c = 0;
										this.jm_kazu--;
									}
							} else if (characterobject.c == 300) {
								if (
									characterobject1.x + 15 >= k &&
									characterobject1.x <= k + 48 &&
									characterobject1.y + 29 >= l &&
									characterobject1.y + 2 <= l + 31
								)
									if (characterobject1.c == 200) {
										characterobject1.c = 50;
										characterobject1.c1 = 1;
										characterobject1.c2 = 20;
									} else {
										characterobject1.c = 0;
										this.jm_kazu--;
									}
							} else if (characterobject.c == 400) {
								if (
									characterobject1.x + 15 >= k &&
									characterobject1.x <= k + 80 &&
									characterobject1.y + 29 >= l &&
									characterobject1.y + 2 <= l + 63
								)
									if (characterobject1.c == 200) {
										characterobject1.c = 50;
										characterobject1.c1 = 1;
										characterobject1.c2 = 20;
									} else {
										characterobject1.c = 0;
										this.jm_kazu--;
									}
							} else if (
								characterobject.c == 500 &&
								characterobject1.x + 15 >= k &&
								characterobject1.x <= k + 80 &&
								characterobject1.y + 29 >= l &&
								characterobject1.y + 2 <= l + 13
							)
								if (characterobject1.c == 200) {
									characterobject1.c = 50;
									characterobject1.y = l - 8;
									characterobject1.c1 = 1;
									characterobject1.c2 = 20;
								} else {
									characterobject1.c = 0;
									this.jm_kazu--;
								}
						}
				}
				characterobject.x = k;
				characterobject.y = l;
			}
	}
};

MainProgram.prototype.bMove = function() {
	if (this.co_b.x >= this.maps.wx + 1024) return;
	this.co_b.move(this);
	// 主人公とボスの当たり判定
	if (this.co_b.checkCollideWIthPlayer(this.co_j)) {
		if (!this.co_b.isFumuable(this)) this.jShinu(2);
		else if (this.co_b.checkFumu(this)) {
			this.co_b.fumuDamage(this);
		} else {
			this.jShinu(2);
		}
	}
	// 主人公の攻撃とボスの当たり判定
	if (this.jm_kazu > 0 && this.co_b.c >= 100) {
		for (let i = 0; i <= 1; i++) {
			if (this.co_jm[i].c >= 100) continue;
			const characterobject = this.co_jm[i];
			if (
				Math.abs(this.co_b.x - characterobject.x) < 34 &&
				Math.abs(this.co_b.y - characterobject.y) < 30
			) {
				this.co_b.checkDamageWithPlayerAttack(this, characterobject);
			}
		}
	}
};

/**
 * 指定座標(ブロック単位)の位置に、指定したコードの？ブロックを設置します
 * 詳細は {@link https://github.com/Ryo-9399/mc_canvas/wiki/メソッド-MainProgram.prototype.hSet} を参照
 * v28では個数制限は64個
 * @param blockX {number} X座標(ブロック単位)
 * @param blockY {number} Y座標(ブロック単位)
 * @param code {number} 設置するブロックのコード
 * @see {@link https://github.com/Ryo-9399/mc_canvas/wiki/メソッド-MainProgram.prototype.hSet}
 */
MainProgram.prototype.hSet = function(blockX, blockY, code) {
	for (let i = 0; i <= 63; i++) {
		// まだ使われていないものを探して追加する
		if (this.co_h[i].c > 0) continue;
		const characterobject = this.co_h[i];
		characterobject.c = code;
		characterobject.x = blockX;
		characterobject.y = blockY;
		break;
	}
};

MainProgram.prototype.hAttack = function(i, j) {
	for (var k = 0; k <= 63; k++) {
		var characterobject = this.co_h[k];
		if (
			characterobject.c == 0 ||
			characterobject.x != i ||
			characterobject.y != j
		)
			continue;
		switch (characterobject.c) {
			case 100:
				this.mSet(i * 32, j * 32 - 32, 2000);
				break;

			case 200:
				this.mSet(i * 32, j * 32 - 32, 2010);
				this.mSet(i * 32, j * 32 - 32, 2020);
				this.mSet(i * 32, j * 32 - 32, 2000);
				break;

			case 300:
				this.mSet(i * 32, j * 32 - 32, 2100);
				break;

			case 400:
				this.mSet(i * 32, j * 32 - 32, 2110);
				break;

			case 500:
				this.mSet(i * 32, j * 32 - 32, 2120);
				break;

			case 600:
				this.mSet(i * 32, j * 32 - 32, 2130);
				break;

			case 700:
				this.mSet(i * 32, j * 32 - 32, 2140);
				break;

			case 800:
				this.mSet(i * 32, j * 32 - 32, 2150);
				break;

			case 900:
				this.mSet(i * 32, j * 32 - 32, 2160);
				break;

			case 1000:
				this.mSet(i * 32, j * 32 - 32, 2170);
				break;

			case 1100:
				this.mSet(i * 32, j * 32 - 32, 2180);
				this.stage_1up_f[this.stage - 1] = false;
				break;
		}
		this.maps.putBGCode(i, j, 41);
		characterobject.c = 0;
		break;
	}
};

export { MainProgram };
