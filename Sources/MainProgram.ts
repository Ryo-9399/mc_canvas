import { CharacterObject } from "./CharacterObject";
import { Boss } from "./CharacterObject/Boss";
import { createNDimensionArray, rightShiftIgnoreSign, rounddown, concatString } from "./GlobalFunctions";
import { IdouGamen } from "./IdouGamen";
import { Color, Font, ImageBuff, Graphics } from "./ImageBuff";
import { KeyboardMenu } from "./KeyboardMenu";
import { MapSystem } from "./MapSystem";
import { YukaObject } from "./YukaObject";
import { EnemyController, EnemyControllerFactory } from "./EnemyController";

import { drawGamescreen } from "./drawGamescreen";
import {
	drawGamescreenMy,
	drawGamescreenEnemy,
	drawGamescreenWindow,
	drawGamescreenUgokuyuka,
} from "./drawGamescreenJSS";
import { InversionKind, GameGraphicsForApplet } from "./GameGraphicsForApplet";
import { Option, MainLayer, MapchipLayer } from "./MasaoOption";
import { GameMouse } from "./GameMouse";
import { GameKey } from "./GameKey";
import { GameSoundForApplet } from "./GameSoundForApplet";
import { TagDataBase } from "./TagDataBase";
import { MasaoConstruction } from "./MasaoConstruction";

type NativePartsKey = keyof typeof EnemyController.available;
type Parts = {
	properties: EnemyControllerFactory<unknown>["properties"];
	native: EnemyControllerFactory<unknown>;
	nativeCode: number;
};

/**
 * ゲーム本体
 * @param gamegraphics {GameGraphicsForApplet}
 * @param gamemouse {GameMouse}
 * @param gamekey {GameKey}
 * @param gamesound {GameSoundForApplet}
 * @param tagdatabase {TagDataBase}
 * @constructor
 */
class MainProgram {
	mapWidth: number;
	mapHeight: number;
	customParts: { [key: string]: Parts } | null;
	ran: unknown;
	ran_seed: number;
	gamecolor_back: Color;
	gamecolor_back_s: Color;
	gamecolor_back_t: Color;
	gamecolor_back_f: Color;
	gamecolor_score: Color;
	gamecolor_grenade1: Color;
	gamecolor_grenade2: Color;
	gamecolor_firebar1: Color;
	gamecolor_firebar2: Color;
	gamecolor_mizunohadou: Color;
	gamecolor_kaishi: Color;
	ana_kazu: number;
	ochiru_y: number;
	j_hashiru_f: boolean;
	j_jump_level: number;
	j_jump_type: number;
	j_zan_f: boolean;
	j_zan_cf: boolean;
	j_zan_p: number;
	j_zan_nagasa: number;
	j_zan_c: number;
	j_a_id: number;
	j_mizu_f: boolean;
	j_mizu_ac: number;
	j_mizu_awa_c: number;
	j_left: number;
	j_left_shoki: number;
	j_jdai_f: boolean;
	boss_hp: number;
	showm_c: number;
	showi_c: number;
	showi_x: number;
	showi_y: number;
	time: number;
	time_max: number;
	m_kazu: number;
	jm_kazu: number;
	a_hf: boolean;
	j_fire_f: boolean;
	j_v_c: number;
	j_v_kakudo: number;
	j_jet_c: number;
	j_jet_kf: boolean;
	j_jet_fuel: number;
	j_helm_f: boolean;
	j_drell_f: boolean;
	j_tail_f: boolean;
	j_tail_ac: number;
	j_gr_kazu: number;
	sl_step: number;
	sl_wx: number;
	sl_wy: number;
	sl_speed: number;
	ks_wx: number;
	ks_wy: number;
	moji_score: string;
	moji_highscore: string;
	moji_time: string;
	moji_jet: string;
	moji_grenade: string;
	moji_left: string;
	moji_size: number;
	j_tail_hf: boolean;
	j_tail_type: number;
	default_j_tail_type: number;
	grenade_type: number;
	suberuyuka_hkf: number;
	j_fire_mkf: boolean;
	dengeki_mkf: number;
	yachamo_attack: number;
	poppie_attack: number;
	mizutaro_attack: number;
	mariri_attack: number;
	chikorin_attack: number;
	airms_kf: number;
	taiking_attack: number;
	kuragesso_attack: number;
	ugokuyuka1_type: number;
	ugokuyuka2_type: number;
	ugokuyuka3_type: number;
	firebar1_type: number;
	firebar2_type: number;
	dossunsun_type: number;
	coin1_type: number;
	coin3_type: number;
	dokan1_type: number;
	dokan2_type: number;
	dokan3_type: number;
	dokan4_type: number;
	boss_type: number;
	boss2_type: number;
	boss3_type: number;
	dokan_mode: number;
	mes1_name: string;
	mes2_name: string;
	shop_name: string;
	setumei_name: string;
	hitokoto_num: number;
	boss_kijyun_y: number;
	scroll_area: number;
	clear_type: number;
	coin_kazu: number;
	tpika_p: number;
	setmyw_w: number;
	setmyw_pt: number;
	setmyw_muki: InversionKind;
	souko_count1: number;
	souko_count2: number;
	souko_count3: number;
	heh: Option["highscoreCallback"] | null;
	system_draw_mode: number;
	ml_mode: number;
	ml_mode_c: number;
	score: number;
	highscore: number;
	score_1up_1: number;
	score_1up_2: number;
	score_1up_1_para: number;
	score_1up_2_para: number;
	score_v: boolean;
	stage: number;
	stage_cc: number;
	stage_max: number;
	stage_kaishi: number;
	g_c1: number;
	g_c2: number;
	g_c3: number;
	g_ac: number;
	g_ac2: number;
	tr1_c: number;
	tr2_c: number;
	left_dcc: number;
	right_dcc: number;
	xkey_c: number;
	map_data_option: boolean[][];
	co_t: CharacterObject[];
	co_m: CharacterObject[];
	co_a: CharacterObject[];
	co_h: CharacterObject[];
	co_jm: CharacterObject[];
	co_mu: CharacterObject[];
	yo: YukaObject[];
	vo_x: number[][];
	vo_y: number[][];
	ana_c: number[];
	ana_x: number[];
	ana_y: number[];
	j_zan_x: number[];
	j_zan_y: number[];
	j_zan_pt: number[];
	j_zan_pth: InversionKind[];
	j_zan_img: (ImageBuff | null)[];
	j_zan_zs_x: number[];
	j_zan_zs_y: number[];
	j_shitakara_mushi_y: number;
	j_hashigo_f: boolean;
	j_hashigo_mushi_x: number;
	j_djump_kf: boolean;
	j_speed: number;
	j_fire_range: number;
	j_rope_id: number;
	j_rope_r: number;
	j_rope_cf: boolean;
	j_cannon_c: number;
	j_cannon_type: number;
	saka_mushi_y: number;
	dkey_count: number[];
	dkey_back_color: Color;
	j_hp_v: boolean;
	j_hp: number;
	j_hp_max: number;
	j_hp_moji: string;
	j_muteki_c: number;
	j_4_muki: number;
	showm_data: (string | null)[];
	showi_img: ImageBuff | null;
	setmapc_f: boolean;
	setbacki_f: boolean;
	setbacki_img: ImageBuff | null;
	js_pen_color: Color;
	showr_c: number;
	showr_x: number;
	showr_y: number;
	showr_width: number;
	showr_height: number;
	showo_c: number;
	showo_x: number;
	showo_y: number;
	showo_width: number;
	showo_height: number;
	js_mes: number;
	gauge_v: boolean;
	gauge_value: number;
	gauge_text: string;
	vo_pa_x: number[];
	vo_pa_y: number[];
	stage_1up_f: boolean[];
	j_fire_type: number;
	default_j_fire_type: number;
	j_enemy_press: number;
	boss_destroy_type: number;
	boss_hp_max: number;
	j_tail_ap_boss: number;
	j_tokugi: number;
	mu_ato_x: number[];
	mu_ato_y: number[];
	mu_ato_p: number;
	j_double_f: boolean;
	pause_switch: number;
	control_parts_visible: number;
	view_move_type: number;
	shop_item_name: string[];
	shop_item_teika: number[];
	door_score: number;
	water_visible: number;
	hitokoto_c: number;
	gazou_scroll: number;
	gazou_scroll_speed_x: number;
	gazou_scroll_speed_y: number;
	gazou_scroll_x: number;
	gazou_scroll_y: number;
	mcs_haikei_visible: number;
	easy_mode: number;
	title_lock_f: boolean;
	start_game_f: boolean;
	mode_wait_ending: number;
	mode_wait_gameover: number;
	mode_wait_stagestart: number;
	attacktail_yf: boolean;
	mhouse_c: number;
	mhouse_x: number;
	mhouse_y: number;
	yuka_ride_id: number;
	dso_cf: boolean;
	spot_c: number;
	spot_r: number;
	spot_r_mokuhyou: number;
	draw_lock_f: boolean;
	nkscroll_con: number;
	nkscroll_view_x: number;
	nkscroll_view_y: number;
	nkscroll_my_view_x: number;
	nkscroll_my_view_y: number;
	nkscroll_speed_x: number;
	nkscroll_vx: number;
	nkscroll_vy: number;
	nkscroll_zsc: boolean;
	boss_attack_mode: boolean;
	cpoint_con: number;
	cpoint_stage: number;
	cpoint_x: number;
	cpoint_y: number;
	jst_slow_down: number;
	jst_key_down: number;
	jst_fast_run_attack: number;
	jst_fly_left_right: number;
	jst_fire_xkey_only: number;
	jst_kabe_kick: number;
	jst_double_jump: number;
	jst_fast_run: number;
	jst_high_sjump: number;
	jst_jump_level_fix: number;
	jst_auto_right: number;
	jst_syouryuuken: number;
	jst_pc_attack: number;
	up_key_c: number;
	down_key_c: number;
	j_add_tokugi: number;
	j_add_tokugi2: number;
	j_add_tokugi3: number;
	j_add_tokugi4: number;
	second_gazou_visible: boolean;
	second_gazou_img: ImageBuff | null;
	second_gazou_stage_img: (ImageBuff | null)[];
	second_gazou_scroll: number;
	second_gazou_scroll_speed_x: number;
	second_gazou_scroll_speed_y: number;
	second_gazou_scroll_x: number;
	second_gazou_scroll_y: number;
	second_gazou_priority: number;
	stage_haikei: number;
	gg: GameGraphicsForApplet;
	gm: GameMouse;
	gk: GameKey;
	gs: GameSoundForApplet;
	tdb: TagDataBase;
	spot_img: ImageBuff;
	spot_g: Graphics;
	maps: MapSystem;
	km: KeyboardMenu;
	co_j: CharacterObject;
	co_b: Boss;
	stage_select: number;
	ig: IdouGamen;
	hi: ImageBuff[];
	hih: ImageBuff[][];
	hg: Graphics;
	ap: MasaoConstruction;

	constructor(
		gamegraphics: GameGraphicsForApplet,
		gamemouse: GameMouse,
		gamekey: GameKey,
		gamesound: GameSoundForApplet,
		tagdatabase: TagDataBase
	) {
		// マップの幅と高さ（ブロック単位）。将来はここを変数にする。
		this.mapWidth = 180;
		this.mapHeight = 30;
		// カスタムパーツの定義
		this.customParts = null;

		this.ran = undefined;
		this.ran_seed = undefined!;
		this.gamecolor_back = undefined!;
		this.gamecolor_back_s = undefined!;
		this.gamecolor_back_t = undefined!;
		this.gamecolor_back_f = undefined!;
		this.gamecolor_score = undefined!;
		this.gamecolor_grenade1 = undefined!;
		this.gamecolor_grenade2 = undefined!;
		this.gamecolor_firebar1 = undefined!;
		this.gamecolor_firebar2 = undefined!;
		this.gamecolor_mizunohadou = undefined!;
		this.gamecolor_kaishi = undefined!;
		this.ana_kazu = undefined!;
		this.ochiru_y = undefined!;
		this.j_hashiru_f = undefined!;
		this.j_jump_level = undefined!;
		this.j_jump_type = undefined!;
		this.j_zan_f = undefined!;
		this.j_zan_cf = undefined!;
		this.j_zan_p = undefined!;
		this.j_zan_nagasa = undefined!;
		this.j_zan_c = undefined!;
		this.j_a_id = undefined!;
		this.j_mizu_f = undefined!;
		this.j_mizu_ac = undefined!;
		this.j_mizu_awa_c = undefined!;
		this.j_left = undefined!;
		this.j_left_shoki = undefined!;
		this.j_jdai_f = undefined!;
		this.boss_hp = undefined!;
		this.showm_c = undefined!;
		this.showi_c = undefined!;
		this.showi_x = undefined!;
		this.showi_y = undefined!;
		this.time = undefined!;
		this.time_max = undefined!;
		this.m_kazu = undefined!;
		this.jm_kazu = undefined!;
		this.a_hf = undefined!;
		this.j_fire_f = undefined!;
		this.j_v_c = undefined!;
		this.j_v_kakudo = undefined!;
		this.j_jet_c = undefined!;
		this.j_jet_kf = undefined!;
		this.j_jet_fuel = undefined!;
		this.j_helm_f = undefined!;
		this.j_drell_f = undefined!;
		this.j_tail_f = undefined!;
		this.j_tail_ac = undefined!;
		this.j_gr_kazu = undefined!;
		this.sl_step = undefined!;
		this.sl_wx = undefined!;
		this.sl_wy = undefined!;
		this.sl_speed = undefined!;
		this.ks_wx = undefined!;
		this.ks_wy = undefined!;
		this.moji_score = undefined!;
		this.moji_highscore = undefined!;
		this.moji_time = undefined!;
		this.moji_jet = undefined!;
		this.moji_grenade = undefined!;
		this.moji_left = undefined!;
		this.moji_size = undefined!;
		this.j_tail_hf = undefined!;
		this.j_tail_type = undefined!;
		this.default_j_tail_type = undefined!;
		this.grenade_type = undefined!;
		this.suberuyuka_hkf = undefined!;
		this.j_fire_mkf = undefined!;
		this.dengeki_mkf = undefined!;
		this.yachamo_attack = undefined!;
		this.poppie_attack = undefined!;
		this.mizutaro_attack = undefined!;
		this.mariri_attack = undefined!;
		this.chikorin_attack = undefined!;
		this.airms_kf = undefined!;
		this.taiking_attack = undefined!;
		this.kuragesso_attack = undefined!;
		this.ugokuyuka1_type = undefined!;
		this.ugokuyuka2_type = undefined!;
		this.ugokuyuka3_type = undefined!;
		this.firebar1_type = undefined!;
		this.firebar2_type = undefined!;
		this.dossunsun_type = undefined!;
		this.coin1_type = undefined!;
		this.coin3_type = undefined!;
		this.dokan1_type = undefined!;
		this.dokan2_type = undefined!;
		this.dokan3_type = undefined!;
		this.dokan4_type = undefined!;
		this.boss_type = undefined!;
		this.boss2_type = undefined!;
		this.boss3_type = undefined!;
		this.dokan_mode = undefined!;
		this.mes1_name = undefined!;
		this.mes2_name = undefined!;
		this.shop_name = undefined!;
		this.setumei_name = undefined!;
		this.hitokoto_num = undefined!;
		this.boss_kijyun_y = undefined!;
		this.scroll_area = undefined!;
		this.clear_type = undefined!;
		this.coin_kazu = undefined!;
		this.tpika_p = undefined!;
		this.setmyw_w = undefined!;
		this.setmyw_pt = undefined!;
		this.setmyw_muki = undefined!;
		this.souko_count1 = undefined!;
		this.souko_count2 = undefined!;
		this.souko_count3 = undefined!;
		this.heh = null;
		this.system_draw_mode = 1;
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
		this.xkey_c = 0;
		this.map_data_option = createNDimensionArray(this.mapWidth + 20, this.mapHeight + 70);
		this.co_t = [];
		this.co_m = new Array(80);
		this.co_a = [];
		this.co_h = new Array(80);
		this.co_jm = new Array(9);
		this.co_mu = new Array(2);
		this.yo = [];
		this.vo_x = [];
		this.vo_y = [];
		this.ana_c = new Array(12);
		this.ana_x = new Array(12);
		this.ana_y = new Array(12);
		this.j_zan_x = new Array(6);
		this.j_zan_y = new Array(6);
		this.j_zan_pt = new Array(6);
		this.j_zan_pth = new Array(6);
		this.j_zan_img = new Array(6);
		this.j_zan_zs_x = new Array(6);
		this.j_zan_zs_y = new Array(6);
		this.j_shitakara_mushi_y = -1;
		this.j_hashigo_f = false;
		this.j_hashigo_mushi_x = -1;
		this.j_djump_kf = true;
		this.j_speed = 80;
		this.j_fire_range = 9999;
		this.j_rope_id = 0;
		this.j_rope_r = 32;
		this.j_rope_cf = false;
		this.j_cannon_c = 0;
		this.j_cannon_type = 0;
		this.saka_mushi_y = -1;
		this.dkey_count = new Array(2);
		this.dkey_back_color = new Color(0, 0, 0, 96);
		this.j_hp_v = false;
		this.j_hp = 1;
		this.j_hp_max = 1;
		this.j_hp_moji = "HP";
		this.j_muteki_c = 0;
		this.j_4_muki = 0;
		this.showm_data = new Array(4);
		this.showi_img = null;
		this.setmapc_f = false;
		this.setbacki_f = false;
		this.setbacki_img = null;
		this.js_pen_color = new Color(255, 255, 255);
		this.showr_c = 0;
		this.showr_x = 0;
		this.showr_y = 0;
		this.showr_width = 32;
		this.showr_height = 32;
		this.showo_c = 0;
		this.showo_x = 0;
		this.showo_y = 0;
		this.showo_width = 32;
		this.showo_height = 32;
		this.js_mes = 0;
		this.gauge_v = false;
		this.gauge_value = 0;
		this.gauge_text = "";
		this.vo_pa_x = new Array(6);
		this.vo_pa_y = new Array(6);
		this.stage_1up_f = new Array(3);
		this.j_fire_type = 1;
		this.default_j_fire_type = 1;
		this.j_enemy_press = 1;
		this.boss_destroy_type = 1;
		this.boss_hp_max = 20;
		this.j_tail_ap_boss = 4;
		this.j_tokugi = 1;
		this.mu_ato_x = new Array(32);
		this.mu_ato_y = new Array(32);
		this.mu_ato_p = 0;
		this.j_double_f = false;
		this.pause_switch = 1;
		this.control_parts_visible = 1;
		this.view_move_type = 1;
		this.shop_item_name = new Array(16);
		this.shop_item_teika = new Array(16);
		this.door_score = 10;
		this.water_visible = 1;
		this.hitokoto_c = -1;
		this.gazou_scroll = 1;
		this.gazou_scroll_speed_x = 1;
		this.gazou_scroll_speed_y = 1;
		this.gazou_scroll_x = 0;
		this.gazou_scroll_y = 0;
		this.mcs_haikei_visible = 0;
		this.easy_mode = 1;
		this.title_lock_f = false;
		this.start_game_f = false;
		this.mode_wait_ending = 120;
		this.mode_wait_gameover = 45;
		this.mode_wait_stagestart = 35;
		this.attacktail_yf = true;
		this.mhouse_c = 0;
		this.mhouse_x = 0;
		this.mhouse_y = 0;
		this.yuka_ride_id = -1;
		this.dso_cf = false;
		this.spot_c = 0;
		this.spot_r = 128;
		this.spot_r_mokuhyou = 128;
		this.draw_lock_f = false;
		this.nkscroll_con = 0;
		this.nkscroll_view_x = 0;
		this.nkscroll_view_y = 0;
		this.nkscroll_my_view_x = 0;
		this.nkscroll_my_view_y = 0;
		this.nkscroll_speed_x = 2;
		this.nkscroll_vx = 0;
		this.nkscroll_vy = 0;
		this.nkscroll_zsc = false;
		this.boss_attack_mode = false;
		this.cpoint_con = 0;
		this.cpoint_stage = 0;
		this.cpoint_x = 32;
		this.cpoint_y = 320;
		this.jst_slow_down = 0;
		this.jst_key_down = 0;
		this.jst_fast_run_attack = 0;
		this.jst_fly_left_right = 0;
		this.jst_fire_xkey_only = 0;
		this.jst_kabe_kick = 0;
		this.jst_double_jump = 0;
		this.jst_fast_run = 0;
		this.jst_high_sjump = 0;
		this.jst_jump_level_fix = 0;
		this.jst_auto_right = 0;
		this.jst_syouryuuken = 0;
		this.jst_pc_attack = 0;
		this.up_key_c = 0;
		this.down_key_c = 0;
		this.j_add_tokugi = 0;
		this.j_add_tokugi2 = 0;
		this.j_add_tokugi3 = 0;
		this.j_add_tokugi4 = 0;
		this.second_gazou_visible = false;
		this.second_gazou_img = null;
		this.second_gazou_stage_img = new Array(4);
		this.second_gazou_scroll = 1;
		this.second_gazou_scroll_speed_x = 1;
		this.second_gazou_scroll_speed_y = 1;
		this.second_gazou_scroll_x = 0;
		this.second_gazou_scroll_y = 0;
		this.second_gazou_priority = 1;
		this.stage_haikei = 1;
		this.gg = gamegraphics;
		this.gm = gamemouse;
		this.gk = gamekey;
		this.gs = gamesound;
		this.tdb = tagdatabase;
		this.spot_img = new ImageBuff(this.gg.di.width, this.gg.di.height);
		this.spot_g = this.spot_img.createGraphics()!;
		this.maps = new MapSystem(this.mapWidth + 20, this.mapHeight + 70, this.gg, this);
		this.km = new KeyboardMenu(this.gg, this.gk, "\u307E\u3055\u304A"); // 主人公の名前「まさお」
		this.co_j = new CharacterObject();

		for (let j = 0; j <= 79; j++) this.co_m[j] = new CharacterObject();

		for (let l = 0; l <= 79; l++) this.co_h[l] = new CharacterObject();

		for (let i1 = 0; i1 <= 8; i1++) this.co_jm[i1] = new CharacterObject();

		this.co_b = new Boss();
		for (let j1 = 0; j1 <= 1; j1++) this.co_mu[j1] = new CharacterObject();

		const l1 = this.tdb.getValueInt("stage_select");
		if (l1 == 2) {
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

	/**
	 * 敵の最大インデックス(敵の総数-1)を取得
	 * @returns {number}
	 */
	get t_kazu() {
		if (this.co_t) {
			return this.co_t.length - 1;
		} else {
			return -1;
		}
	}

	/**
	 * 仕掛けの最大インデックス(仕掛けの総数-1)を取得
	 * @returns {number}
	 */
	get a_kazu() {
		if (this.co_a) {
			return this.co_a.length - 1;
		} else {
			return -1;
		}
	}

	/**
	 * 床オブジェクトの最大インデックス(床オブジェクトの総数-1)を取得
	 * @returns {number}
	 */
	get yuka_id_max() {
		if (this.yo) {
			return this.yo.length - 1;
		} else {
			return -1;
		}
	}

	/**
	 * ハイスコアイベントのコールバックを登録します
	 * 複数回呼び出すと以前のイベントは置き換えられます
	 * @param highscoreeventhandler {Function} ハイスコア更新時に呼び出されるコールバック関数 第一引数にハイスコアの得点が渡される
	 * @returns {boolean} 常にtrue
	 */
	addHighscoreEvent(highscoreeventhandler: this["heh"]) {
		this.heh = highscoreeventhandler;
		return true;
	}

	/**
	 * ハイスコアイベントのコールバックが登録されていれば、最高得点を引数としてハイスコアイベントを発火させます
	 */
	sendHighscore() {
		if (Object.prototype.toString.call(this.heh) == "[object Function]") {
			let i = this.highscore;
			if (i < this.score) i = this.score;
			this.heh!(i);
		}
	}

	/**
	 * ゲームを開始させます
	 */
	start() {
		this.ml_mode = 50;
	}

	/**
	 * 主人公の特技を追加します
	 * @param i {number} 特技の種類(1から30まで)
	 * @returns {boolean} 成功した場合(該当する特技が存在した場合)にtrueを返す
	 * @see {@link MasaoJSS#addMyTokugi}
	 */
	addMyTokugi(i: number) {
		let flag = false;
		switch (i) {
			case 1:
			case 30: // ヘルメット
				this.j_helm_f = true;
				flag = true;
				break;

			case 2: // ドリル
				this.j_drell_f = true;
				flag = true;
				break;

			case 3: // 落ちるのが遅い
				this.jst_slow_down = 1;
				flag = true;
				break;

			case 4: // 下キーを押すと急降下
				this.jst_key_down = 1;
				flag = true;
				break;

			case 5: // 全速体当たりで敵を倒せる
				this.jst_fast_run_attack = 1;
				flag = true;
				break;

			case 6: // 空中の左右加速度が高い
				this.jst_fly_left_right = 1;
				flag = true;
				break;

			case 7: // 速く走れる
				this.jst_fast_run = 1;
				flag = true;
				break;

			case 8: // 走れない
				this.jst_fast_run = 2;
				flag = true;
				break;

			case 9: // 空中でもう１回ジャンプできる
				this.jst_double_jump = 1;
				flag = true;
				break;

			case 10: // 壁キック
				this.jst_kabe_kick = 1;
				flag = true;
				break;

			case 11: // 壁ジャンプ
				this.jst_kabe_kick = 2;
				flag = true;
				break;

			case 12: // ジャンプ時にファイヤーボールが出ない
				this.jst_fire_xkey_only = 1;
				flag = true;
				break;

			case 13: // ジャンプの高さを固定 小
				this.jst_jump_level_fix = 1;
				flag = true;
				break;

			case 14: // ジャンプの高さを固定 小中
				this.jst_jump_level_fix = 2;
				flag = true;
				break;

			case 15: // ジャンプの高さを固定 中
				this.jst_jump_level_fix = 3;
				flag = true;
				break;

			case 16: // ジャンプの高さを固定 大
				this.jst_jump_level_fix = 4;
				flag = true;
				break;

			case 17: // しっぽ 敵を倒せる
				this.j_tail_type = 1;
				this.j_tail_f = true;
				flag = true;
				break;

			case 18: // しっぽ ブロック１を壊せる
				this.j_tail_type = 2;
				this.j_tail_f = true;
				flag = true;
				break;

			case 19: // しっぽ 敵を倒せてブロック１を壊せる
				this.j_tail_type = 3;
				this.j_tail_f = true;
				flag = true;
				break;

			case 20: // ファイヤーボール 跳ねる
				this.j_fire_type = 1;
				this.j_fire_f = true;
				flag = true;
				break;

			case 21: // ファイヤーボール 水平に飛ぶ
				this.j_fire_type = 2;
				this.j_fire_range = 9999;
				this.j_fire_f = true;
				flag = true;
				break;

			case 22: // ファイヤーボール ダブル
				this.j_fire_type = 4;
				this.j_fire_range = 10;
				this.j_fire_f = true;
				flag = true;
				break;

			case 23: // ファイヤーボール 水平に飛ぶ 短射程
				this.j_fire_type = 3;
				this.j_fire_range = 10;
				this.j_fire_f = true;
				flag = true;
				break;

			case 24: // ファイヤーボール ホーミングアミュレット
				this.j_fire_type = 5;
				this.j_fire_f = true;
				flag = true;
				break;

			case 25: // 昇龍拳
				this.jst_syouryuuken = 1;
				flag = true;
				break;

			case 26: // サイコクラッシャーアタック
				this.jst_pc_attack = 1;
				flag = true;
				break;

			case 27: // ロケット頭突き
				this.jst_pc_attack = 2;
				flag = true;
				break;

			case 28: // スカイアッパー
				this.jst_syouryuuken = 2;
				flag = true;
				break;

			case 29: // 流星キック
				this.jst_key_down = 2;
				flag = true;
				break;
		}
		return flag;
	}

	/**
	 * 主人公の特技を取り除きます
	 * @param i {number} 特技の種類(1から30まで)
	 * @returns {boolean} 成功した場合(該当する特技が存在した場合)にtrueを返す
	 * @see {@link MasaoJSS#removeMyTokugi}
	 */
	removeMyTokugi(i: number) {
		let flag = false;
		switch (i) {
			case 1:
			case 30:
				this.j_helm_f = false;
				flag = true;
				break;

			case 2:
				this.j_drell_f = false;
				flag = true;
				break;

			case 3:
				this.jst_slow_down = 0;
				flag = true;
				break;

			case 4:
			case 29:
				this.jst_key_down = 0;
				flag = true;
				break;

			case 5:
				this.jst_fast_run_attack = 0;
				flag = true;
				break;

			case 6:
				this.jst_fly_left_right = 0;
				flag = true;
				break;

			case 7:
			case 8:
				this.jst_fast_run = 0;
				flag = true;
				break;

			case 9:
				this.jst_double_jump = 0;
				flag = true;
				break;

			case 10:
			case 11:
				this.jst_kabe_kick = 0;
				flag = true;
				break;

			case 12:
				this.jst_fire_xkey_only = 0;
				flag = true;
				break;

			case 13:
			case 14:
			case 15:
			case 16:
				this.jst_jump_level_fix = 0;
				flag = true;
				break;

			case 17:
				this.j_tail_type = 1;
				this.j_tail_f = false;
				flag = true;
				break;

			case 18:
				this.j_tail_type = 2;
				this.j_tail_f = false;
				flag = true;
				break;

			case 19:
				this.j_tail_type = 3;
				this.j_tail_f = false;
				flag = true;
				break;

			case 20:
				this.j_fire_type = 1;
				this.j_fire_f = false;
				flag = true;
				break;

			case 21:
				this.j_fire_type = 2;
				this.j_fire_range = 9999;
				this.j_fire_f = false;
				flag = true;
				break;

			case 22:
				this.j_fire_type = 4;
				this.j_fire_range = 10;
				this.j_fire_f = false;
				flag = true;
				break;

			case 23:
				this.j_fire_type = 3;
				this.j_fire_range = 10;
				this.j_fire_f = false;
				flag = true;
				break;

			case 24:
				this.j_fire_type = 5;
				this.j_fire_f = false;
				flag = true;
				break;

			case 25:
			case 28:
				this.jst_syouryuuken = 0;
				flag = true;
				break;

			case 26:
			case 27:
				this.jst_pc_attack = 0;
				flag = true;
				break;
		}
		return flag;
	}

	/**
	 * 8フレーム周期のゲームカウンターを一つ進めます(？)
	 * TODO: 加筆求む
	 */
	moveGameCounter() {
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
	}

	/**
	 * 一言メッセージを設定します
	 * @param {number} time 表示時間（フレーム数）
	 * @param {string} name 名前
	 * @param {string} line1 メッセージ（1行目）
	 * @param {string} line2 メッセージ（2行目）
	 * @param {string} line3 メッセージ（3行目）
	 * @see {@link MasaoJSS#showMessage}
	 */
	showmSet(s: string | number, s1: string | null, s2: string | null, s3: string | null, s4: string | null) {
		if (this.ml_mode != 100) return false;
		this.showm_c = parseInt(s as string);
		if (isNaN(this.showm_c)) this.showm_c = 0;
		if (this.showm_c <= 0) {
			return false;
		} else {
			this.showm_data[0] = s1;
			this.showm_data[1] = s2;
			this.showm_data[2] = s3;
			this.showm_data[3] = s4;
			return true;
		}
	}

	/**
	 * 謎(showmSetで設定された一言メッセージを実際に表示させる？)
	 * TODO: 加筆求む
	 */
	showmMove() {
		if (this.showm_c > 0) {
			this.hitokoto_c = this.showm_c;
			this.showm_c = 0;
			this.hitokoto_num = 5;
		}
	}

	/**
	 * マップ上に表示する画像を設定します
	 * 座標はマップ上ではなくスクリーン上の位置で指定し、
	 * 同時に設定できる画像は1つのみです
	 * @param {number} time 表示時間（フレーム数）
	 * @param {number} x X座標
	 * @param {number} y Y座標
	 * @param {ImageBuff} buf 表示する画像
	 * @returns {boolean} 設定に成功するとtrueを返す
	 * @see {@link MasaoJSS#showImage}
	 */
	showiSet(s: string | number, s1: string | number, s2: string | number, s3: string) {
		if (this.ml_mode != 100) return false;
		this.showi_c = parseInt(s as string);
		this.showi_x = parseInt(s1 as string);
		this.showi_y = parseInt(s2 as string);
		if (isNaN(this.showi_c) || isNaN(this.showi_x) || isNaN(this.showi_y)) this.showi_c = 0;
		if (this.showi_c <= 0) {
			return false;
		} else {
			this.showi_img = this.gg.loadImage(s3);
			return true;
		}
	}

	/**
	 * 背景画像を設定します
	 * @param {string} filename 画像のファイル名
	 * @returns {boolean}
	 * @see {@link MasaoJSS#setBackImage}
	 */
	setbacki(s: string) {
		if (this.ml_mode != 100) return false;
		if (this.gg.layer_mode != 2 && this.mcs_haikei_visible != 1) {
			return false;
		} else {
			this.setbacki_f = true;
			this.setbacki_img = this.gg.loadImage(s);
			return true;
		}
	}

	/**
	 * 主人公を一定時間停止させます。
	 * 停止している間の主人公の画像（パターンコード）と向きを指定できます。
	 *
	 * @param {number} time 停止する時間（フレーム数）
	 * @param {number} pattern 停止している間のパターンコード
	 * @param {number} direction 向き（0なら左、1なら右）
	 * @returns {boolean} 主人公を停止状態にできたかどうか
	 * @see {@link MasaoJSS#setMyWait}
	 */
	setMyWait(s: string | number, s1: string | number, s2: string | number) {
		let i = -1;
		let j = 100;
		let k = 1;
		if (this.ml_mode != 100) return false;

		i = parseInt(s as string);
		j = parseInt(s1 as string);
		k = parseInt(s2 as string);
		if (isNaN(i) || isNaN(j) || isNaN(k)) i = -1;
		if (i < 0) return false;
		if (this.co_j.c >= 200) return false;
		if (j < 0 || j > 249) j = 0;
		if (k < 0 || k > 1) k = 0;
		this.setmyw_w = i;
		this.setmyw_pt = j;
		this.setmyw_muki = k as InversionKind;
		if (this.system_draw_mode >= 2) {
			this.co_j.muki = k as InversionKind;
			this.co_j.pt = j;
			this.co_j.pth = k;
		}
		return true;
	}

	/**
	 * ボスのHPを取得します。
	 *
	 * @returns {number} ボスのHP
	 * @see {@link MasaoJSS#getBossHP}
	 */
	getBossHP() {
		if (this.ml_mode < 100 || this.ml_mode >= 200) return 0;
		if (this.boss_destroy_type == 2) return this.boss_hp;
		else return this.co_b.c4;
	}

	/**
	 * ボスのHPを設定します。
	 *
	 * @param {number} hp 新しいHP
	 * @returns {boolean} 設定に成功したかどうか
	 * @see {@link MasaoJSS#setBossHP}
	 */
	setBossHP(hp: number) {
		if (this.ml_mode < 100 || this.ml_mode >= 200) return false;
		return this.co_b.setHP(this, hp);
	}

	/**
	 * ボスの向きを取得します。
	 * 0が左向きで1が右向きです。
	 *
	 * @return {number} ボスの向き
	 * @see {@link MasaoJSS#getBossDirection}
	 */
	getBossDirection() {
		if (this.ml_mode < 100 || this.ml_mode >= 200) return 0;
		return this.co_b.getBossDirectionFromPattern();
	}

	/**
	 * ボスが攻撃中かどうかを取得します。
	 * 攻撃中の場合1、そうでない場合は0となります。
	 *
	 * @returns {number}
	 * @see {@link MasaoJSS#isBossAttackMode}
	 */
	isBossAttackMode() {
		if (this.ml_mode < 100 || this.ml_mode >= 200) return 0;
		return !this.boss_attack_mode ? 0 : 1;
	}

	/**
	 * ボスのX座標を設定します。
	 *
	 * @returns {boolean} 設定に成功したかどうか
	 * @see {@link MasaoJSS#setBossXReal}
	 */
	setBossXReal(i: number) {
		if (this.ml_mode < 100 || this.ml_mode >= 200) return false;
		if (this.co_b.c < 100) {
			return false;
		} else {
			this.co_b.x = i;
			return true;
		}
	}

	/**
	 * ボスのY座標を設定します。
	 *
	 * @returns {boolean} 設定に成功したかどうか
	 * @see {@link MasaoJSS#setBossYReal}
	 */
	setBossYReal(i: number) {
		if (this.ml_mode < 100 || this.ml_mode >= 200) return false;
		if (this.co_b.c < 100) {
			return false;
		} else {
			this.co_b.y = i;
			return true;
		}
	}

	/**
	 * ステージクリアします。
	 * @see {@link MasaoJSS#setStageClear}
	 */
	setStageClear() {
		if (this.ml_mode != 100) return false;
		if (this.stage_cc == 0) {
			this.stage_cc = 1;
			this.gs.rsAddSound(2);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * ゲームで使用されている画像を変更します。画像は数値で指定します。
	 *
	 * * 0: タイトル画像
	 * * 1: エンディング画像
	 * * 2: ゲームクリア画像
	 * * 3: 地図画面
	 * * 4: ステージ１の背景画像
	 * * 5: ステージ２の背景画像
	 * * 6: ステージ３の背景画像
	 * * 7: ステージ４の背景画像
	 * * 8: パターン画像
	 * * 9: 背景マップチップ画像
	 *
	 * @param {number} type 画像の種類
	 * @param {string} filename ファイル名
	 * @see {@link MasaoJSS#setSystemImage}
	 */
	setSystemImage(s: string | number, s1: string) {
		let i;

		i = parseInt(s as string);
		if (isNaN(i)) i = -1;
		if (i < 0 || i > 9) return false;
		if (i == 8) this.gg.setPatternImage(s1);
		else if (i == 9) {
			this.gg.setMapchipImage(s1);
		} else {
			if (this.gg.layer_mode != 2 && this.mcs_haikei_visible != 1 && i > 3) return false;
			this.gg.li[i] = this.gg.loadImage(s1)!;
			if (i == 3 && this.ml_mode == 200) this.ig.drawOs2();
		}
		return true;
	}

	/**
	 * スクロール可能な範囲をブロック単位で設定します。
	 * 引数は全て画面の左上の位置で指定します。
	 * マップの左上が(0, 0)です。
	 *
	 * @param {number} x1 範囲左上の座標
	 * @param {number} y1 範囲左上の座標
	 * @param {number} x2 範囲右下の座標
	 * @param {number} y2 範囲右下の座標
	 * @see {@link MasaoJSS#setScrollArea}
	 */
	setScrollArea(s: string, s1: string, s2: string, s3: string) {
		let i = 0;
		let j = 0;
		let k = this.mapWidth - rounddown(this.gg.di.width / 32);
		let l = this.mapHeight - rounddown(this.gg.di.height / 32);
		if (this.ml_mode != 100 && this.ml_mode != 91 && this.ml_mode != 96) return false;

		i = parseInt(s);
		j = parseInt(s1);
		k = parseInt(s2);
		l = parseInt(s3);
		if (isNaN(i) || isNaN(j) || isNaN(k) || isNaN(l)) i = -1;
		if (i < 0 || i > this.mapWidth - rounddown(this.gg.di.width / 32)) return false;
		if (k < 0 || k > this.mapWidth - rounddown(this.gg.di.width / 32)) return false;
		if (j < 0 || j > this.mapHeight - rounddown(this.gg.di.height / 32)) return false;
		if (l < 0 || l > this.mapHeight - rounddown(this.gg.di.height / 32)) return false;
		if (i > k) {
			const i1 = i;
			i = k;
			k = i1;
		}
		if (j > l) {
			const j1 = j;
			j = l;
			l = j1;
		}
		this.maps.wx_mini = (i + 1) * 32;
		this.maps.wx_max = (k + 1) * 32;
		this.maps.wy_mini = (j + 10) * 32;
		this.maps.wy_max = (l + 10) * 32;
		return true;
	}

	/**
	 * スクロール可能な領域をピクセル単位で設定します。
	 * 引数は全て画面の左上の位置で指定します。
	 * マップの左上が(32, 320)です。
	 *
	 * @param {number} x1 範囲左上の座標
	 * @param {number} y1 範囲左上の座標
	 * @param {number} x2 範囲右下の座標
	 * @param {number} y2 範囲右下の座標
	 * @see {@link MasaoJSS#setScrollAreaReal}
	 */
	setScrollAreaReal(s: string, s1: string, s2: string, s3: string) {
		let i = 0;
		let j = 0;
		let k = this.mapWidth - rounddown(this.gg.di.width / 32);
		let l = this.mapHeight - rounddown(this.gg.di.height / 32);
		if (this.ml_mode != 100 && this.ml_mode != 91 && this.ml_mode != 96) return false;

		i = parseInt(s);
		j = parseInt(s1);
		k = parseInt(s2);
		l = parseInt(s3);
		if (isNaN(i) || isNaN(j) || isNaN(k) || isNaN(l)) i = -1;
		if (i < 32 || i > (this.mapWidth - 15) * 32) return false;
		if (k < 32 || k > (this.mapWidth - 15) * 32) return false;
		if (j < 320 || j > this.mapHeight * 32) return false;
		if (l < 320 || l > this.mapHeight * 32) return false;
		if (i > k) {
			const i1 = i;
			i = k;
			k = i1;
		}
		if (j > l) {
			const j1 = j;
			j = l;
			l = j1;
		}
		this.maps.wx_mini = i;
		this.maps.wx_max = k;
		this.maps.wy_mini = j;
		this.maps.wy_max = l;
		return true;
	}

	/**
	 * ゲームの各タイミングにおける時間を設定します。タイミングは数値で指定します。
	 * * 0: エンディング画像の表示時間
	 * * 1: ゲームオーバー画像の表示時間
	 * * 2: ステージ開始時のステージ番号表示時間
	 *
	 * @param {number} type タイミング
	 * @param {number} time 時間（フレーム）
	 * @see {@link MasaoJSS#setModeWait}
	 */
	setModeWait(s: string | number, s1: string | number) {
		let i = 0;
		let j = 100;

		i = parseInt(s as string);
		j = parseInt(s1 as string);
		if (isNaN(i) || isNaN(j)) i = -1;
		if (i < 0 || i > 2) return false;
		if (j < 0) return false;
		if (i == 0) this.mode_wait_ending = j;
		else if (i == 1) this.mode_wait_gameover = j;
		else if (i == 2) this.mode_wait_stagestart = j;
		return true;
	}

	/**
	 * {@link MainProgram#showrSet}及び{@link MainProgram#showoSet}で表示される図形の色を指定します。各値は0から255までの整数で指定します。
	 *
	 * @param {number} r R成分
	 * @param {number} g G成分
	 * @param {number} b B成分
	 * @param {number} [alpha=255] 不透明度
	 *
	 * @see {@link MasaoJSS#setPenColor}
	 * @see {@link MainProgram#showrSet}
	 * @see {@link MainProgram#showoSet}
	 */
	setPenColor(s: string | number, s1: string | number, s2: string | number, s3: string | number) {
		let i = 255;
		let j = 255;
		let k = 255;
		let l = 255;

		i = parseInt(s as string);
		j = parseInt(s1 as string);
		k = parseInt(s2 as string);
		l = parseInt(s3 as string);
		if (isNaN(i) || isNaN(j) || isNaN(k) || isNaN(l)) i = -1;
		if (i < 0) {
			return false;
		} else {
			this.js_pen_color = new Color(i, j, k, l);
			return true;
		}
	}

	/**
	 * 一定時間表示する矩形を設定します。表示座標はマップ上の座標ではなくスクリーン上の座標で指定します。
	 * 同時に設定できる矩形は1つのみです。
	 *
	 * @param {number} time 表示時間（フレーム数）
	 * @param {number} x 矩形の左端のX座標
	 * @param {number} y 矩形の上端のY座標
	 * @param {number} width 矩形の幅
	 * @param {number} height 矩形の高さ
	 * @see {@link MasaoJSS#showRect}
	 */
	showrSet(s: string | number, s1: string | number, s2: string | number, s3: string | number, s4: string | number) {
		if (this.ml_mode != 100) return false;

		this.showr_c = parseInt(s as string);
		this.showr_x = parseInt(s1 as string);
		this.showr_y = parseInt(s2 as string);
		this.showr_width = parseInt(s3 as string);
		this.showr_height = parseInt(s4 as string);
		if (
			isNaN(this.showr_c) ||
			isNaN(this.showr_x) ||
			isNaN(this.showr_y) ||
			isNaN(this.showr_width) ||
			isNaN(this.showr_height)
		)
			this.showr_c = 0;
		return this.showr_c > 0;
	}

	/**
	 * 一定時間表示する楕円を設定します。表示座標はマップ上の座標ではなくスクリーン上の座標で指定します。
	 * 同時に設定できる楕円は1つのみです。
	 *
	 * @param {number} time 表示時間（フレーム数）
	 * @param {number} x 楕円の左端のX座標
	 * @param {number} y 楕円の上端のY座標
	 * @param {number} width 楕円の幅
	 * @param {number} height 楕円の高さ
	 * @see {@link MasaoJSS#showOval}
	 */
	showoSet(s: string | number, s1: string | number, s2: string | number, s3: string | number, s4: string | number) {
		if (this.ml_mode != 100) return false;

		this.showo_c = parseInt(s as string);
		this.showo_x = parseInt(s1 as string);
		this.showo_y = parseInt(s2 as string);
		this.showo_width = parseInt(s3 as string);
		this.showo_height = parseInt(s4 as string);
		if (
			isNaN(this.showo_c) ||
			isNaN(this.showo_x) ||
			isNaN(this.showo_y) ||
			isNaN(this.showo_width) ||
			isNaN(this.showo_height)
		)
			this.showo_c = 0;
		return this.showr_c > 0;
	}

	/**
	 * JavaScript用メッセージを取得します。
	 * メッセージはゲーム開始時1になります。
	 *
	 * @returns {number} メッセージ
	 * @see {@link MasaoJSS#getJSMes}
	 */
	getJSMes() {
		return this.js_mes;
	}

	/**
	 * ゲージを表示します。
	 * showGaugeで表示できるゲージは1つだけで、ボスのHPゲージと共有です。
	 * ゲージの値は最小が0、最大が200です。
	 *
	 * @param {number} value ゲージの値
	 * @param {string} name ゲージに表示される文字列
	 * @see {@link MasaoJSS#showGauge}
	 */
	showGauge(s: string | number, s1: string) {
		let i = 0;
		if (this.ml_mode != 100) return false;

		i = parseInt(s as string);
		if (isNaN(i)) i = 0;
		if (i < 0) i = 0;
		if (i > 200) i = 200;
		this.gauge_v = true;
		this.gauge_value = i;
		this.gauge_text = s1;
		return true;
	}

	/**
	 * ゲージを非表示にします。
	 * @returns {boolean}
	 * @see {@link MasaoJSS#hideGauge}
	 */
	hideGauge() {
		if (this.ml_mode != 100) {
			return false;
		} else {
			this.gauge_v = false;
			return true;
		}
	}

	/**
	 * JavaScript用メッセージを設定します。
	 * @param s
	 * @returns {boolean}
	 * @see {@link MasaoJSS#setJSMes}
	 */
	setJSMes(s: string | number) {
		this.js_mes = parseInt(s as string);
		if (isNaN(this.js_mes)) this.js_mes = 0;
		return true;
	}

	/**
	 * 指定した位置に敵を設置します。
	 * 位置はブロック単位で指定します。
	 *
	 * @param {number} x X座標
	 * @param {number} y Y座標
	 * @param {number} type 敵の種類
	 * @see {@link MasaoJSS#setEnemy}
	 */
	sete(s: string | number, s1: string | number, s2: string | number) {
		let i = 0;
		let j = 0;
		let k = 0;
		let flag = false;
		if (this.ml_mode != 100) return false;

		i = parseInt(s as string);
		j = parseInt(s1 as string);
		k = parseInt(s2 as string);
		if (isNaN(i) || isNaN(j) || isNaN(k)) k = 0;
		if (k <= 0) return false;
		if (i < 0 || i >= this.mapWidth || j < 0 || j >= this.mapHeight) return false;
		i = (i + 1) * 32;
		j = (j + 10) * 32;
		switch (k) {
			default:
				break;

			case 1: // 亀 足元に空白があると落ちる
				this.tSet(i, j, 100, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 2: // 亀 足元に空白があると向きを変える
				this.tSet(i, j, 110, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 3: // 亀 ３匹連続
				this.tSet(i, j, 110, i - this.gg.di.width - 32);
				this.tSet(i + 75, j, 110, i - this.gg.di.width - 32);
				this.tSet(i + 150, j, 110, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 4: // ピカチー
				this.tSet(i, j, 200, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 5: // チコリン
				this.tSet(i, j, 300, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 6: // ヒノララシ
				this.tSet(i, j, 400, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 7: // ポッピー 上下移動
				this.tSet(i, j, 500, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 8: // ポッピー 直進
				this.tSet(i, j, 510, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 9: // ポッピー ３羽連続
				this.tSet(i, j, 510, i - this.gg.di.width - 32 - 32);
				this.tSet(i + 80, j - 40, 510, i - this.gg.di.width - 32 - 32);
				this.tSet(i + 140, j + 38, 510, i - this.gg.di.width - 32 - 32);
				flag = true;
				break;

			case 10: // マリリ
				this.tSet(i, j, 600, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 11: // ヤチャモ
				this.tSet(i, j, 700, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 12: // ミズタロウ
				this.tSet(i, j, 800, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 13: // エアームズ
				this.tSet(i, j, 900, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 14: // 水なしタイキング
				this.tSet(i, j - 16, 1000, i - this.gg.di.width - 32 - 32);
				flag = true;
				break;

			case 15: // 水なしクラゲッソ
				this.tSet(i, j, 1100, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 16: // 電撃
				this.mSet(i, j, 100);
				this.gs.rsAddSound(10);
				flag = true;
				break;

			case 17: // 葉っぱカッターが左に１枚
				this.mSet(i, j, 200);
				this.gs.rsAddSound(11);
				flag = true;
				break;

			case 18: // 葉っぱカッターが右に１枚
				this.mSet(i, j, 205);
				this.gs.rsAddSound(11);
				flag = true;
				break;

			case 19: // 火の粉左
				this.mSet(i, j, 300);
				this.gs.rsAddSound(14);
				flag = true;
				break;

			case 20: // 火の粉右
				this.mSet(i, j, 305);
				this.gs.rsAddSound(14);
				flag = true;
				break;

			case 21: // 水鉄砲左
				this.mSet(i, j, 400);
				this.gs.rsAddSound(15);
				flag = true;
				break;

			case 22: // 水鉄砲右
				this.mSet(i, j, 405);
				this.gs.rsAddSound(15);
				flag = true;
				break;

			case 23: // エアームズ爆弾左
				this.mSet(i, j + 19, 600);
				flag = true;
				break;

			case 24: // エアームズ爆弾右
				this.mSet(i, j + 19, 605);
				flag = true;
				break;

			case 25: // エアームズ爆弾直下降
				this.mSet(i, j + 19, 606);
				flag = true;
				break;

			case 26: // 水の波動
				this.mSet(i, j, 90);
				this.gs.rsAddSound(18);
				flag = true;
				break;

			case 27: // 左にグレネード 短射程
				this.mSet2(i, j, 800, -5, -32);
				this.gs.rsAddSound(22);
				flag = true;
				break;

			case 28: // 左にグレネード 中射程
				this.mSet2(i, j, 800, -10, -32);
				this.gs.rsAddSound(22);
				flag = true;
				break;

			case 29: // 左にグレネード 長射程
				this.mSet2(i, j, 800, -15, -32);
				this.gs.rsAddSound(22);
				flag = true;
				break;

			case 30: // 噴火（威力小）
				this.mSet2(i, j, 500, 8 - this.ranInt(17), -25);
				flag = true;
				break;

			case 31: // 噴火（威力大）
				this.mSet2(i, j, 500, 12 - this.ranInt(25), -30);
				flag = true;
				break;

			case 32: // カイオール版バブル光線（１発目）
				for (let l = 0; l <= 7; l++) {
					var d = (l * 45 * 3.14) / 180;
					var l1 = rounddown(Math.cos(d) * 8, true, this);
					var k2 = rounddown(Math.sin(d) * 8, true, this) * -1;
					this.mSet2(i, j, 710, l1, k2);
					this.gs.rsAddSound(18);
				}

				flag = true;
				break;

			case 33: // 左にバブル光線３発
				var d1 = 3.1400001049041748;
				var i2 = rounddown(Math.cos(d1) * 12, true, this);
				var l2 = rounddown(Math.sin(d1) * 12, true, this) * -1;
				this.mSet2(i, j, 710, i2, l2);
				d1 = 2.7038888931274414;
				i2 = rounddown(Math.cos(d1) * 12, true, this);
				l2 = rounddown(Math.sin(d1) * 12, true, this) * -1;
				this.mSet2(i, j, 710, i2, l2);
				d1 = 3.5761110782623291;
				i2 = rounddown(Math.cos(d1) * 12, true, this);
				l2 = rounddown(Math.sin(d1) * 12, true, this) * -1;
				this.mSet2(i, j, 710, i2, l2);
				this.gs.rsAddSound(18);
				flag = true;
				break;

			case 34: // 左にバブル光線４発
				var d2 = 3.3144445419311523;
				var j2 = rounddown(Math.cos(d2) * 12, true, this);
				var i3 = rounddown(Math.sin(d2) * 12, true, this) * -1;
				this.mSet2(i, j, 710, j2, i3);
				d2 = 2.9655554294586182;
				j2 = rounddown(Math.cos(d2) * 12, true, this);
				i3 = rounddown(Math.sin(d2) * 12, true, this) * -1;
				this.mSet2(i, j, 710, j2, i3);
				d2 = 3.6633334159851074;
				j2 = rounddown(Math.cos(d2) * 12, true, this);
				i3 = rounddown(Math.sin(d2) * 12, true, this) * -1;
				this.mSet2(i, j, 710, j2, i3);
				d2 = 2.6166667938232422;
				j2 = rounddown(Math.cos(d2) * 12, true, this);
				i3 = rounddown(Math.sin(d2) * 12, true, this) * -1;
				this.mSet2(i, j, 710, j2, i3);
				this.gs.rsAddSound(18);
				flag = true;
				break;

			case 35: // 左回りファイアーバー
				this.aSet(i + 16, j + 16, 70, i);
				flag = true;
				break;

			case 36: // 右回りファイアーバー
				this.aSet(i + 16, j + 16, 71, i);
				flag = true;
				break;

			case 37: // ファイヤーバー３本 左回り
				this.aSet(i + 16, j + 16, 72, i);
				this.aSet(i + 16, j + 16, 74, i);
				this.aSet(i + 16, j + 16, 76, i);
				flag = true;
				break;

			case 38: // ファイヤーバー３本 右回り
				this.aSet(i + 16, j + 16, 73, i);
				this.aSet(i + 16, j + 16, 75, i);
				this.aSet(i + 16, j + 16, 77, i);
				flag = true;
				break;

			case 39: // 上下に動く床
				this.aSet(i, j, 101, i);
				flag = true;
				break;

			case 40: // 左右に動く床
				this.aSet(i, j + 9, 111, i);
				flag = true;
				break;

			case 41: // チコリン（はっぱカッター 乱れ射ち）
				this.tSet(i, j, 320, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 42: // チコリン（左にソーラービーム）
				this.tSet(i, j, 330, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 43: // マリリ（左右移動）
				this.tSet(i, j, 660, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 44: // マリリ（体当たり）
				this.tSet(i, j, 670, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 45: // ヤチャモ（火の粉三連射）
				this.tSet(i, j, 710, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 46: // ヤチャモ（左に破壊光線）
				this.tSet(i, j, 720, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 47: // エアームズ（左右に動いて爆弾投下）
				this.tSet(i, j, 930, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 48: // エアームズ（その場て爆弾投下）
				this.tSet(i, j, 920, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 49: // タイキング（はねる）
				this.tSet(i, j, 1050, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 50: // タイキング（縄張りを守る）
				this.tSet(i, j, 1060, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 51: // タイキング（左回り）
				this.tSet(i, j, 1070, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 52: // タイキング（右回り）
				this.tSet(i, j, 1080, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 53: // クラゲッソ（近づくと落ちる）
				this.tSet(i, j, 1150, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 54: // クラゲッソ（縄張りを守る）
				this.tSet(i, j, 1160, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 55: // クラゲッソ（左回り）
				this.tSet(i, j, 1170, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 56: // クラゲッソ（右回り）
				this.tSet(i, j, 1180, i - this.gg.di.width - 32);
				flag = true;
				break;

			case 57: // グラーダの投げる亀
				this.tSetBoss(i, j, 150, -4);
				break;

			case 58: // グラーダの投げるヒノララシ
				this.tSetBoss(i, j, 450, -3);
				break;

			case 59: // グラーダの投げるマリリ
				this.tSetBoss(i, j, 650, -3);
				break;

			case 60: // ハリケンブラスト
				for (var i1 = 0; i1 <= 300; i1 += 90) {
					this.mSet2(i, j, 950, i1, 0);
					this.mSet2(i, j, 960, 300 - i1, 0);
				}

				this.gs.rsAddSound(18);
				flag = true;
				break;

			case 61: // 左にはっぱカッター 乱れ射ち
				var d3 = 3.1400001049041748;
				this.mSet2(i, j, 731, rounddown(Math.cos(d3) * 9, true, this), rounddown(Math.sin(d3) * 9, true, this));
				d3 = 3.6633334159851074;
				this.mSet2(i, j, 731, rounddown(Math.cos(d3) * 9, true, this), rounddown(Math.sin(d3) * 9, true, this));
				d3 = 4.1866669654846191;
				this.mSet2(i, j, 731, rounddown(Math.cos(d3) * 9, true, this), rounddown(Math.sin(d3) * 9, true, this));
				this.gs.rsAddSound(11);
				flag = true;
				break;

			case 62: // 右にはっぱカッター 乱れ射ち
				var d4 = 0.0;
				this.mSet2(i, j, 731, rounddown(Math.cos(d4) * 9, true, this), rounddown(Math.sin(d4) * 9, true, this));
				d4 = 5.7566671371459961;
				this.mSet2(i, j, 731, rounddown(Math.cos(d4) * 9, true, this), rounddown(Math.sin(d4) * 9, true, this));
				d4 = 5.2333335876464844;
				this.mSet2(i, j, 731, rounddown(Math.cos(d4) * 9, true, this), rounddown(Math.sin(d4) * 9, true, this));
				this.gs.rsAddSound(11);
				flag = true;
				break;

			case 63: // 左にみずでっぽう 水平発射
				this.mSet2(i - 16, j, 732, -10, 0);
				this.gs.rsAddSound(15);
				flag = true;
				break;

			case 64: // 右にみずでっぽう 水平発射
				this.mSet2(i - 16, j, 732, 10, 0);
				this.gs.rsAddSound(15);
				flag = true;
				break;

			case 65: // 左にソーラービーム
				this.mSet2(i, j, 75, -1, 0);
				this.gs.rsAddSound(11);
				flag = true;
				break;

			case 66: // 左にプラズマ砲
				this.mSet2(i, j, 810, -12, 0);
				this.gs.rsAddSound(22);
				flag = true;
				break;

			case 67: // 右にプラズマ砲
				this.mSet2(i, j, 810, 12, 0);
				this.gs.rsAddSound(22);
				flag = true;
				break;

			case 68: // 左に破壊光線
				this.mSet2(i, j, 77, -1, 0);
				this.gs.rsAddSound(14);
				flag = true;
				break;

			case 69: // 左に電撃３発
				var d5 = 3.1400001049041748;
				this.mSet2(i, j, 733, rounddown(Math.cos(d5) * 9, true, this), rounddown(Math.sin(d5) * 9, true, this));
				d5 = 3.6633334159851074;
				this.mSet2(i, j, 733, rounddown(Math.cos(d5) * 9, true, this), rounddown(Math.sin(d5) * 9, true, this));
				d5 = 2.6166667938232422;
				this.mSet2(i, j, 733, rounddown(Math.cos(d5) * 9, true, this), rounddown(Math.sin(d5) * 9, true, this));
				this.gs.rsAddSound(10);
				flag = true;
				break;

			case 70: // 右に電撃３発
				var d6 = 0.0;
				this.mSet2(i, j, 733, rounddown(Math.cos(d6) * 9, true, this), rounddown(Math.sin(d6) * 9, true, this));
				d6 = 5.7566671371459961;
				this.mSet2(i, j, 733, rounddown(Math.cos(d6) * 9, true, this), rounddown(Math.sin(d6) * 9, true, this));
				d6 = 0.52333337068557739;
				this.mSet2(i, j, 733, rounddown(Math.cos(d6) * 9, true, this), rounddown(Math.sin(d6) * 9, true, this));
				this.gs.rsAddSound(10);
				flag = true;
				break;

			case 71: // 左にうずしお
				for (var j1 = 0; j1 <= 270; j1 += 90) this.mSet2(i, j, 970, j1, 0);

				this.gs.rsAddSound(18);
				flag = true;
				break;

			case 72: // 右にうずしお
				for (var k1 = 0; k1 <= 270; k1 += 90) this.mSet2(i, j, 980, k1, 0);

				this.gs.rsAddSound(18);
				flag = true;
				break;

			case 73: // 左に流星群（中距離）
				this.mSet2(i, j, 740, -4, 9);
				flag = true;
				break;

			case 74: // 左に流星群（短距離）
				this.mSet2(i, j, 740, -4, 11);
				flag = true;
				break;

			case 75: // 右に流星群（中距離）
				this.mSet2(i, j, 740, 4, 9);
				flag = true;
				break;

			case 76: // 右に流星群（短距離）
				this.mSet2(i, j, 740, 4, 11);
				flag = true;
				break;

			case 77: // 右にグレネード 短射程
				this.mSet2(i, j, 800, 5, -32);
				this.gs.rsAddSound(22);
				flag = true;
				break;

			case 78: // 右にグレネード 中射程
				this.mSet2(i, j, 800, 10, -32);
				this.gs.rsAddSound(22);
				flag = true;
				break;

			case 79: // 右にグレネード 長射程
				this.mSet2(i, j, 800, 15, -32);
				this.gs.rsAddSound(22);
				flag = true;
				break;

			case 80: // ブロック１の破片
				this.mSet2(i, j, 80, 12, -24);
				this.mSet2(i, j, 80, -12, -24);
				this.gs.rsAddSound(16);
				flag = true;
				break;

			case 81: // 落下グレネード
				this.mSet2(i, j, 800, 0, 0);
				this.gs.rsAddSound(22);
				flag = true;
				break;

			case 82: // グレネードの爆風のみ
				this.mSet2(i, j, 801, 0, 0);
				this.gs.rsAddSound(22);
				flag = true;
				break;

			case 83: // 右にソーラービーム
				this.mSet2(i, j, 85, -1, 0);
				this.gs.rsAddSound(11);
				flag = true;
				break;

			case 84: // 右に破壊光線
				this.mSet2(i, j, 87, -1, 0);
				this.gs.rsAddSound(14);
				flag = true;
				break;
		}
		return flag;
	}

	/**
	 * スクロールロックを設定します。スクロール座標が指定したX座標に到達したら、そこで画面が固定されます。
	 *
	 * @param {number} x X座標
	 * @see {@link MasaoJSS#setScrollLock}
	 */
	setScrollLock(s: string | number) {
		let i = 32;
		if (this.ml_mode != 100 && this.ml_mode != 91 && this.ml_mode != 96) return false;

		i = parseInt(s as string);
		if (isNaN(i)) i = 32;
		if (i < 32) i = 32;
		if (this.sl_step == 10 || this.sl_step == 11) this.sl_step = 11;
		else this.sl_step = 1;
		this.sl_wx = i;
		this.sl_wy = (this.mapHeight - rounddown((this.gg.di.height - this.maps.wy_mini) / 32)) * 32;
		return true;
	}

	/**
	 * ファイヤーボールとグレネードに対する当たり判定を指定範囲に発生させます。
	 * 指定範囲に入っていたファイヤーボールは消滅し、その数が返り値として返ります。
	 * また、グレネードの当たり判定に入っていた場合、1つにつき返り値が10増加します。
	 *
	 * @param {number} x 範囲の左端のX座標
	 * @param {number} y 範囲の上端のY座標
	 * @param {number} width 範囲のX方向大きさ
	 * @param {number} height 範囲のY方向大きさ
	 * @returns {number}
	 * @see {@link MasaoJSS#attackFire}
	 */
	attackFire(s: string | number, s1: string | number, s2: string | number, s3: string | number) {
		let i = 0;
		let j = 0;
		let k = 32;
		let l = 32;
		let i1 = 0;
		if (this.ml_mode != 100) return -1;

		i = parseInt(s as string);
		j = parseInt(s1 as string);
		k = parseInt(s2 as string);
		l = parseInt(s3 as string);
		if (isNaN(i) || isNaN(j) || isNaN(k) || isNaN(l)) i = -1;
		if (i < 0) return -1;
		if (this.jm_kazu > 0) {
			for (let j1 = 0; j1 <= 8; j1++) {
				if (this.co_jm[j1].c < 100) continue;
				const characterobject = this.co_jm[j1];
				if (characterobject.x < i || characterobject.x >= i + k || characterobject.y < j || characterobject.y >= j + l)
					continue;
				if (characterobject.c == 200) {
					characterobject.c = 50;
					characterobject.c1 = 1;
					characterobject.c2 = 20;
					this.gs.rsAddSound(9);
					i1 += 10;
				} else {
					characterobject.c = 0;
					this.jm_kazu--;
					i1++;
				}
			}
		}
		return i1;
	}

	/**
	 * 指定した矩形範囲にしっぽの攻撃判定を発生させます。
	 * 範囲にしっぽが当たった場合は1を、当たっていない場合は0を、それ以外の場合は-1を返します。
	 *
	 * @param {number} x 範囲左端のX座標
	 * @param {number} y 範囲上端のY座標
	 * @param {number} width 範囲の横幅
	 * @param {number} height 範囲の高さ
	 * @returns {number}
	 * @see {@link MasaoJSS#attackTail}
	 */
	attackTail(s: string | number, s1: string | number, s2: string | number, s3: string | number) {
		let i = 0;
		let j = 0;
		let k = 32;
		let l = 32;
		let i1 = 0;
		if (this.ml_mode != 100) return -1;

		i = parseInt(s as string);
		j = parseInt(s1 as string);
		k = parseInt(s2 as string);
		l = parseInt(s3 as string);
		if (isNaN(i) || isNaN(j) || isNaN(k) || isNaN(l)) i = -1;
		if (i < 0) return -1;
		if (this.j_tail_ac >= 3 && this.j_tail_ac <= 7 && this.attacktail_yf) {
			i1 = 0;
			if (this.j_tokugi == 15 && (this.j_4_muki == 2 || this.j_4_muki == 3)) {
				if (this.co_j.x < i + k - 4 && this.co_j.x + 32 > i + 4)
					if (this.j_4_muki == 2) {
						if (this.co_j.y - 32 <= j + l && this.co_j.y + 4 >= j) i1 = 1;
					} else if (this.co_j.y + 32 + 32 >= j && this.co_j.y + 28 <= j + l) i1 = 1;
			} else if (this.co_j.y < j + l - 4 && this.co_j.y + 32 > j + 4)
				if (this.co_j.muki == 0) {
					if (this.co_j.x - 32 <= i + k && this.co_j.x + 4 >= i) i1 = 1;
				} else if (this.co_j.x + 32 + 32 >= i && this.co_j.x + 28 <= i + k) i1 = 1;
			if (i1 == 1) {
				this.attacktail_yf = false;
				this.gs.rsAddSound(9);
			}
		}
		return i1;
	}

	/**
	 * 指定した矩形範囲にいる敵を倒します。
	 *
	 * @param {number} x 範囲左端のX座標
	 * @param {number} y 範囲上端のY座標
	 * @param {number} width 範囲のX方向大きさ
	 * @param {number} height 範囲のY方向大きさ
	 * @returns {number} 倒した敵の数 エラー時は-1
	 * @see {@link MasaoJSS#destroyEnemy}
	 */
	destroyEnemy(s: string | number, s1: string | number, s2: string | number, s3: string | number) {
		let i = 0;
		let j = 0;
		let k = 0;
		let l = 32;
		let i1 = 0;
		if (this.ml_mode != 100) return -1;

		i = parseInt(s as string);
		j = parseInt(s1 as string);
		k = parseInt(s2 as string);
		l = parseInt(s3 as string);
		if (isNaN(i) || isNaN(j) || isNaN(k) || isNaN(l)) i = -1;
		if (i < 0) return -1;
		for (let j1 = 0; j1 <= this.t_kazu; j1++) {
			if (this.co_t[j1].c < 100) continue;
			const characterobject = this.co_t[j1];
			if (
				i >= characterobject.x + 32 ||
				i + k <= characterobject.x ||
				j >= characterobject.y + 32 ||
				j + l <= characterobject.y
			)
				continue;
			if (characterobject.x < this.co_j.x) {
				characterobject.pth = 1;
				characterobject.vx = -3;
			} else {
				characterobject.pth = 0;
				characterobject.vx = 3;
			}
			if (characterobject.c >= 1200 && characterobject.c < 1300) {
				characterobject.c = 54;
				characterobject.vy = -25;
			} else if (characterobject.c >= 1400 && characterobject.c < 1500) {
				characterobject.c = 57;
				characterobject.c1 = 0;
			} else if (characterobject.c >= 1400 && characterobject.c < 1500) {
				characterobject.c = 57;
				characterobject.c1 = 0;
			} else if (characterobject.c == 1190) {
				characterobject.c = 55;
				characterobject.c1 = 0;
				const k1 = rightShiftIgnoreSign(characterobject.x, 5);
				const l1 = rightShiftIgnoreSign(characterobject.y, 5);
				if (characterobject.c5 == 1) this.onASwitch(k1 - 5, l1 - 5, k1 + 5, l1 + 5);
				else this.onASwitch(k1 - 10, l1 - 10, k1 + 10, l1 + 10);
			} else {
				characterobject.c = 52;
				characterobject.vy = -25;
				if (this.j_tokugi == 14 || this.j_tokugi == 15) {
					characterobject.c = 55;
					characterobject.c1 = 0;
				}
			}
			i1++;
			this.gs.rsAddSound(9);
		}

		return i1;
	}

	/**
	 * マップチップを1つ変更します。
	 *
	 * @param {number} x X座標
	 * @param {number} y Y座標
	 * @param {number} chip マップチップ番号
	 * @returns {boolean} 変更に成功したかどうか
	 * @see {@link MasaoJSS#setMapchip}
	 */
	setmapc(s: string | number, s1: string | number, s2: string | number) {
		let i = 0;
		let j = 0;
		var k = 0;
		if (this.ml_mode != 100) return false;

		i = parseInt(s as string);
		j = parseInt(s1 as string);
		k = parseInt(s2 as string);
		if (isNaN(i) || isNaN(j) || isNaN(k)) k = -1;
		if (k < 0 || k > 249) return false;
		if (i < 0 || i >= this.mapWidth || j < 0 || j >= this.mapHeight) {
			return false;
		} else {
			i++;
			j += 10;
			this.maps.map_bg[i][j] = k;
			if (this.map_data_option[i][j]) this.map_data_option[i][j] = false; //map_data_optionをリセット
			this.setmapc_f = true;
			return true;
		}
	}

	/**
	 * マップチップを取得します。
	 *
	 * @param {number} x X座標
	 * @param {number} y Y座標
	 * @returns {number} マップチップ番号 失敗した場合は-1
	 * @see {@link MasaoJSS#getMapchip}
	 */
	getmapc(s: string | number, s1: string | number) {
		let i = 0;
		let j = 0;
		let k = 0;
		if (this.ml_mode != 100) return -1;

		i = parseInt(s as string);
		j = parseInt(s1 as string);
		if (isNaN(i) || isNaN(j)) k = -1;
		if (k < 0) return -1;
		if (i < 0 || i >= this.mapWidth || j < 0 || j >= this.mapHeight) {
			return -1;
		} else {
			i++;
			j += 10;
			const word0 = this.maps.map_bg[i][j];
			return word0;
		}
	}

	/**
	 * 背景レイヤーのマップチップを1つ変更します。
	 *
	 * @param {number} x X座標
	 * @param {number} y Y座標
	 * @param {number} chip マップチップ番号
	 * @returns {boolean} 変更に成功したかどうか
	 * @see {@link MasaoJSS#setMapchip2}
	 */
	setmapc2(s: string | number, s1: string | number, s2: string | number) {
		let i = 0;
		let j = 0;
		let k = 0;
		if (this.ml_mode != 100) return false;
		if (this.gg.layer_mode != 2) return false;

		i = parseInt(s as string);
		j = parseInt(s1 as string);
		k = parseInt(s2 as string);
		if (isNaN(i) || isNaN(j) || isNaN(k)) k = -1;
		if (k < 0 || k > 255) return false;
		if (i < 0 || i >= this.mapWidth || j < 0 || j >= this.mapHeight) {
			return false;
		} else {
			i++;
			j += 10;
			this.maps.map_bg_layer[i][j] = k;
			return true;
		}
	}

	/**
	 * 背景レイヤーのマップチップを取得します。
	 *
	 * @param {number} x X座標
	 * @param {number} y Y座標
	 * @returns {number} マップチップ番号 失敗した場合は-1
	 * @see {@link MasaoJSS#getMapchip2}
	 */
	getmapc2(s: string | number, s1: string | number) {
		let i = 0;
		let j = 0;
		let k = 0;
		if (this.ml_mode != 100) return -1;
		if (this.gg.layer_mode != 2) return -1;

		i = parseInt(s as string);
		j = parseInt(s1 as string);
		if (isNaN(i) || isNaN(j)) k = -1;
		if (k < 0) return -1;
		if (i < 0 || i >= this.mapWidth || j < 0 || j >= this.mapHeight) {
			return -1;
		} else {
			i++;
			j += 10;
			const word0 = this.maps.map_bg_layer[i][j];
			return word0;
		}
	}

	/**
	 * 主人公のHP表示をONにします。
	 *
	 * @param {string|null} name HPの名前 nullにすると名前なし
	 * @returns {boolean} 常にtrue
	 * @see {@link MasaoJSS#showMyHP}
	 */
	showMyHP(s: string | null) {
		this.j_hp_v = true;
		this.j_hp_moji = s ?? "";
		return true;
	}

	/**
	 * 主人公の最大HPを設定します。
	 *
	 * @param {number} maxhp 最大HP
	 * @returns {boolean} 設定に成功したかどうか
	 * @see {@link MasaoJSS#setMyMaxHP}
	 */
	setMyMaxHP(s: string | number) {
		let i = -1;

		i = parseInt(s as string);
		if (isNaN(i)) i = -1;
		if (i < 0) return false;
		this.j_hp_max = i;
		if (
			(this.ml_mode == 100 || this.ml_mode == 90 || this.ml_mode == 91 || this.ml_mode == 96) &&
			this.co_j.c >= 100 &&
			this.co_j.c < 200
		)
			this.j_hp = this.j_hp_max;
		return true;
	}

	/**
	 * 主人公の現在のHPを設定します。
	 *
	 * @param {number} hp 0以上のHP
	 * @returns {boolean} 設定に成功したかどうか
	 * @see {@link MasaoJSS#setMyHP}
	 */
	setMyHP(s: string | number) {
		if (
			(this.ml_mode == 100 || this.ml_mode == 90 || this.ml_mode == 91 || this.ml_mode == 96) &&
			this.co_j.c >= 100 &&
			this.co_j.c < 200
		) {
			let i;
			i = parseInt(s as string);
			if (isNaN(i)) i = -1;
			if (i < 0) {
				return false;
			} else {
				this.j_hp = i;
				return true;
			}
		} else {
			return false;
		}
	}

	/**
	 * 主人公の現在のHPを取得します。
	 *
	 * @returns {number} 現在のHP
	 * @see {@link MasaoJSS#getMyHP}
	 */
	getMyHP() {
		let i = 0;
		if (this.ml_mode == 100 && this.co_j.c >= 100 && this.co_j.c < 200) i = this.j_hp;
		else i = 0;
		return i;
	}

	/**
	 * 主人公にダメージを与えます。
	 * このメソッドを使うと、HPが減るのに加えて無敵時間が設定されます。
	 *
	 * 無敵時間中にこのメソッドを使うとHPは変化しませんが、返り値としてtrueが返ります。
	 * 引数に負の値を与えると回復します。
	 *
	 * @param {number} damage ダメージ値
	 * @returns {boolean} ダメージを与えることに成功したかどうか
	 * @see {@link MasaoJSS#setMyHPDamage}
	 */
	setMyHPDamage(s: string | number) {
		if (this.ml_mode == 100 && this.co_j.c >= 100 && this.co_j.c < 200) {
			let j;
			j = parseInt(s as string);
			if (isNaN(j)) j = 0xfffe7961;
			if (j == 0xfffe7961) return false;
			if (this.j_muteki_c > 0) return true;
			this.j_hp -= j;
			if (this.j_hp <= 0) {
				this.j_hp = 0;
			} else {
				this.setMyMuteki();
				this.gs.rsAddSound(24);
			}
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 主人公に無敵時間を発生させます
	 * 無敵の持続する時間は主人公のHPが減少したときと同じで、持続時間を設定することはできません
	 */
	setMyMuteki() {
		this.j_muteki_c = 17;
	}

	/**
	 * 乱数生成のseedを初期化する
	 */
	ranInit() {
		//seedを初期化
		this.ran_seed = (Math.random() * 0x100000000) | 0;
	}

	/**
	 * 0以上i未満の乱整数を返します
	 * @param i {number}
	 * @returns {number} 0以上i未満のランダムな整数値
	 */
	ranInt(i: number) {
		//xor-shift 乱数(a=9, b=11, c=19)
		let ran_seed = this.ran_seed;
		ran_seed = (ran_seed ^ (ran_seed << 9)) >>> 0;
		ran_seed = (ran_seed ^ (ran_seed >>> 11)) >>> 0;
		this.ran_seed = ran_seed = (ran_seed ^ (ran_seed << 19)) >>> 0;
		// * 2.3283064365386963e-10 は /0x100000000の意味
		return (ran_seed * 2.3283064365386963e-10 * i) | 0;
	}

	/**
	 * 画面上部のスコア・残り時間・HP・残機を描画します
	 */
	drawScore() {
		// 変更前のフォントを保持
		const beforeFont = this.hg._font;

		this.hg.setColor(this.gamecolor_score);
		this.hg.setFont(new Font(this.gg.font_score, 1, this.moji_size));

		// 描画座標
		const display_x = 40;
		const display_y = this.moji_size + 14;

		// スコアを表示する場合は表示領域の関係上スペースを省略する
		const spacer = this.score_v ? "" : " ";
		let str = "";
		if (this.score_v) {
			// 得点を表示する
			str += `${this.moji_score} ${this.score}    ${this.moji_highscore} ${this.highscore}`;
		}
		if (this.j_left_shoki > 0 || this.j_left > 0) {
			// 残機を表示
			str += `${this.moji_left}${spacer}${this.j_left}${spacer}${spacer}${spacer}${spacer}`;
		}
		if (this.time_max > 0) {
			// 制限時間を表示
			const time_sec = Math.floor(this.time / 1000);
			str += `${this.moji_time}${spacer}${time_sec}`;
		}
		this.hg.drawString(str, display_x, display_y);

		// 2行目Y座標
		const display_y2 = display_y * 2 - 6;
		// HP表示
		if (this.j_hp_v && this.ml_mode === 100) {
			const str_hp = `${this.j_hp_moji} ${this.j_hp}`;
			this.hg.drawString(str_hp, display_x, display_y2);
		}
		// フォントを元に戻す
		this.hg.setFont(beforeFont);
	}

	/**
	 * 画面下部のグレネードの数・ジェットの残量・鍵を描画します
	 */
	drawItem() {
		// 変更前のフォントを保持
		const beforeFont = this.hg._font;

		// グレネードの数・ジェットの残量の描画座標
		const display_x = 40;
		let display_y = this.gg.di.height - 33;

		//鍵を表示
		if (this.dkey_count[0] + this.dkey_count[1] >= 1) {
			// 鍵の描画座標
			let key_x = 8;
			const key_y = this.gg.di.height - 40;

			/**
			 * @param n {number} 鍵の種類
			 */
			const drawKey = (n: number) => {
				if (this.dkey_count[n - 1] > 0) {
					[...Array(this.dkey_count[n - 1])].map(() => {
						this.hg.setColor(this.dkey_back_color);
						this.hg.fillRect(key_x - 2, key_y - 2, 36, 36);
						this.hg.drawImage(this.gg.spt_option_img[n + 2], key_x, key_y, this.ap);
						key_x += 36;
						display_y = this.gg.di.height - 65;
					});
				}
			};

			drawKey(1); // KEY1
			drawKey(2); // KEY2
		}

		if (this.j_jet_fuel > 0 || this.j_gr_kazu > 0) {
			let str = "";
			this.hg.setColor(this.gamecolor_score);

			this.hg.setFont(new Font(this.gg.font_score, 1, this.moji_size));

			if (this.j_jet_fuel > 0) str += `${this.moji_jet} ${this.j_jet_fuel}`; //ジェットの燃料を表示
			if (this.j_gr_kazu > 0) {
				if (this.j_jet_fuel > 0) str += "    ";
				//グレネードを表示
				str += this.moji_grenade;
				if (this.j_gr_kazu !== 1) str += ` ${this.j_gr_kazu}`;
			}
			this.hg.drawString(str, display_x, display_y + this.moji_size);
			// フォントを元に戻す
			this.hg.setFont(beforeFont);
		}
	}

	/**
	 * 画面上部にスコア・残機のみを描画します
	 * 地図画面でのスコア表示に使われる
	 */
	drawScore2() {
		// 変更前のフォントを保持
		const beforeFont = this.hg._font;

		this.hg.setColor(this.gamecolor_score);
		this.hg.setFont(new Font(this.gg.font_score, 1, this.moji_size));

		// 描画座標
		const display_x = 40;
		const display_y = this.moji_size + 14;

		let str = "";
		if (this.score_v) {
			// 得点を表示する
			str = `${this.moji_score} ${this.score}    ${this.moji_highscore} ${this.highscore}`;
		}
		if (this.j_left_shoki > 0 || this.j_left > 0) {
			// 残機を表示
			str += `${this.moji_left}${this.j_left}`;
		}
		this.hg.drawString(str, display_x, display_y);
		// フォントを元に戻す
		this.hg.setFont(beforeFont);
	}

	/**
	 * スコアを加算します。
	 * 負の値を渡すとスコアが減ります。
	 *
	 * @param {number} score 加算するスコア
	 *
	 * @see {@link MasaoJSS#addScore}
	 */
	addScore(score: number) {
		this.score += score;
		if (this.score_1up_1 > 0 && this.score >= this.score_1up_1) {
			this.j_left++;
			this.score_1up_1 = 0;
		}
		if (this.score_1up_2 > 0 && this.score >= this.score_1up_2) {
			this.j_left++;
			this.score_1up_2 = 0;
		}
	}

	/**
	 * マップ全体に配置されたコインの総数を取得します
	 * scroll_areaタグの設定によりスクロール可能な範囲が制限されている場合、その範囲の中のコインの総数を数えます
	 * @returns {number} マップに本来存在するコインの総数
	 */
	getCoinTotal() {
		let c = this.mapWidth;
		let k = 0;
		if (this.scroll_area == 2 || this.scroll_area == 4) c = rounddown(this.gg.di.width / 32);
		else if (this.scroll_area == 3 || this.scroll_area == 5) c = rounddown((this.gg.di.width * 2) / 32);
		for (let j = 10; j <= this.mapHeight + 9; j++) {
			for (let i = 1; i <= c; i++) if (this.maps.map_bg[i][j] == 9) k++;
		}

		this.coin_kazu = k;
		return k;
	}

	/**
	 * 指定した矩形範囲の中に配置されたコインの数を取得します
	 * 座標はブロック単位で指定します
	 * @param x1 始点のX座標
	 * @param y1 始点のY座標
	 * @param x2 終点のX座標
	 * @param y2 終点のY座標
	 * @returns {number}
	 */
	getCoinCount(i: number, j: number, k: number, l: number) {
		if (this.ml_mode == 100 || this.ml_mode == 90 || this.ml_mode == 91 || this.ml_mode == 96) {
			let j1 = i + 1;
			let k1 = j + 10;
			let l1 = k + 1;
			let i2 = l + 10;
			if (j1 < 1) j1 = 1;
			if (j1 > this.mapWidth) j1 = this.mapWidth;
			if (l1 < 1) l1 = 1;
			if (l1 > this.mapWidth) l1 = this.mapWidth;
			if (k1 < 10) k1 = 10;
			if (k1 > this.mapHeight + 9) k1 = this.mapHeight + 9;
			if (i2 < 10) i2 = 10;
			if (i2 > this.mapHeight + 9) i2 = this.mapHeight + 9;
			if (j1 > l1) {
				const j2 = j1;
				j1 = l1;
				l1 = j2;
			}
			if (k1 > i2) {
				const k2 = k1;
				k1 = i2;
				i2 = k2;
			}
			let i1 = 0;
			for (let i3 = k1; i3 <= i2; i3++) {
				for (let l2 = j1; l2 <= l1; l2++) if (this.maps.map_bg[l2][i3] == 9) i1++;
			}

			return i1;
		} else {
			return -1;
		}
	}

	/**
	 * ゲームクリア用はしごを表示させます
	 */
	showHashigo() {
		let c = this.mapWidth;
		if (this.scroll_area == 2 || this.scroll_area == 4) c = rounddown(this.gg.di.width / 32);
		else if (this.scroll_area == 3 || this.scroll_area == 5) c = rounddown((this.gg.di.width * 2) / 32);
		for (let j = 10; j <= this.mapHeight + 9; j++) {
			for (let i = 1; i <= c; i++) if (this.maps.map_bg[i][j] == 8) this.maps.map_bg[i][j] = 10;
		}

		this.setmapc_f = true;
	}

	/**
	 * 主に地図画面表示で使うセリフを追加する
	 * @param {number} index 追加する場所(？) TODO: 要調査
	 * @param {number} person_id セリフを言う人の番号
	 * @param {number} max_row 1からmax_row行目までを表示する
	 */
	addSerifu(index: number, person_id: string | number, max_row: number) {
		for (let i = 1; i <= max_row; i++) {
			const message = this.tdb.getValue(`serifu${person_id}-${i}`);
			// NOTE: issue #34
			if (parseInt(message || "", 10) != 0) this.km.addItem(index, message || "");
		}
	}

	/**
	 * FX以降に追加されたセリフを追加する
	 * @param {number} index 追加する場所(？) TODO: 要調査
	 * @param {number} person_param セリフを言う人のパラメータの名前
	 * @param {number} start_row 表示開始する行
	 * @param {number} end_row 表示終了する行
	 */
	addSerifu2(i: number, s: string, j: number, k?: number) {
		let l, k1, k2;
		if (k == undefined) {
			k1 = 1;
			k2 = j;
		} else {
			k1 = j;
			k2 = k;
		}
		for (l = k1; l <= k2; l++) {
			const s1 = this.tdb.getValue(`${s}${l}`);
			let i1;
			i1 = parseInt(s1 as string);
			if (isNaN(i1)) i1 = -1;
			// NOTE: issue #34
			if (i1 != 0) this.km.addItem(i, s1 || "");
		}
	}

	/**
	 * ゲーム中の毎フレームの中核処理を行います
	 */
	mL100() {
		// 当たり判定のある仕掛けに挟まれた時 true を返す
		const isAthletic = () => {
			let flag = false;
			for (let i = 0; i <= this.a_kazu; i++) {
				if (!this.co_a[i].gf) continue;
				const characterobject = this.co_a[i];
				if (characterobject.c >= 100 && characterobject.c < 200) {
					// 動く床
					if (
						this.co_j.x + 15 >= characterobject.x &&
						this.co_j.x <= characterobject.x + 64 &&
						this.co_j.y + 31 >= characterobject.y &&
						this.co_j.y <= characterobject.y + 13
					)
						flag = true;
					continue;
				}
				if (characterobject.c == 300) {
					// 土管
					if (
						characterobject.c3 < 200 &&
						this.co_j.x + 15 >= characterobject.x &&
						this.co_j.x <= characterobject.x + 48 &&
						this.co_j.y + 31 >= characterobject.y &&
						this.co_j.y <= characterobject.y + 31
					)
						flag = true;
					continue;
				}
				if (characterobject.c >= 400 && characterobject.c < 500) {
					// ドッスンスン
					if (
						this.co_j.x + 15 >= characterobject.x &&
						this.co_j.x <= characterobject.x + 80 &&
						this.co_j.y + 31 >= characterobject.y &&
						this.co_j.y <= characterobject.y + 63
					)
						flag = true;
					continue;
				}
				if (characterobject.c == 500) {
					// 乗ると落ちる床
					if (
						this.co_j.x + 15 >= characterobject.x &&
						this.co_j.x <= characterobject.x + 80 &&
						this.co_j.y + 31 >= characterobject.y &&
						this.co_j.y <= characterobject.y + 13
					)
						flag = true;
					continue;
				}
				if (characterobject.c == 600) {
					// 乗れるカイオール
					if (
						this.co_j.x + 15 >= characterobject.x &&
						this.co_j.x <= characterobject.x + 48 &&
						this.co_j.y + 31 >= characterobject.y + 16 &&
						this.co_j.y <= characterobject.y + 47
					)
						flag = true;
					continue;
				}
				if (
					characterobject.c == 700 &&
					this.j_tokugi != 10 &&
					this.j_tokugi != 12 &&
					this.j_tokugi != 13 &&
					this.co_j.x + 15 >= characterobject.x &&
					this.co_j.x <= characterobject.x + 16 &&
					this.co_j.y + 31 >= characterobject.y &&
					this.co_j.y <= characterobject.y + 31
				) {
					// ジャンプ台
					flag = true;
				}
			}
			return flag;
		};

		this.showmMove();

		// setMyWeitで硬直中
		if (this.setmyw_w >= 0 && this.co_j.c >= 100 && this.co_j.c < 200) {
			if (this.setmyw_w == 0) this.co_j.c = 100;
			else {
				this.co_j.c = 150;
				this.co_j.c1 = this.setmyw_w;
				this.co_j.vx = 0;
				this.co_j.vy = 0;
			}
			this.j_zan_f = false;
			this.j_jet_c = 0;
			this.j_jump_type = 0;
			this.setmyw_w = -1;
		}

		if (this.j_tokugi == 14) this.jm_kazu = 9999;
		this.moveGameCounter();
		this.km.move();
		this.aMove();
		this.nkscroll_zsc = false;
		if (this.yuka_id_max >= 0) this.moveYuka();
		if (this.co_j.c == 100) {
			if (this.j_tokugi == 14 || this.j_tokugi == 15) this.jM100stg();
			else this.jM100();
		} else {
			this.jMove();
		}
		if (this.j_tail_ac == 2) this.attacktail_yf = true;
		if (this.ana_kazu > 0) this.anaMove();
		if (this.sl_step > 0)
			if (this.sl_step == 10 || this.sl_step == 11) {
				// scroll_mode の強制スクロール または （ボス戦で）スクロールロック
				this.ks_wx += this.sl_speed;
				if (this.ks_wx > this.maps.wx_max) this.ks_wx = this.maps.wx_max;
				this.maps.wx = this.ks_wx;
				this.maps.wy = this.ks_wy;
				if (this.j_tokugi == 14) {
					// シューティングモードの時
					this.co_j.x += this.sl_speed;
					var i = this.sl_speed;
					if (
						this.maps.getBGCode(this.co_j.x + 31, this.co_j.y) >= 20 ||
						this.maps.getBGCode(this.co_j.x + 31, this.co_j.y + 31) >= 20
					) {
						i = rightShiftIgnoreSign(this.co_j.x + 31, 5) * 32 - 32 - (this.co_j.x - this.sl_speed);
						this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 31, 5) * 32 - 32;
					}
					this.co_j.wx = this.co_j.x - this.maps.wx;
					for (let j1 = 0; j1 <= 31; j1++) this.mu_ato_x[j1] += i;

					i = this.mu_ato_p - 7;
					if (i < 0) i += 32;
					this.co_mu[0].x = this.mu_ato_x[i];
					this.co_mu[0].y = this.mu_ato_y[i];
					i = this.mu_ato_p - 14;
					if (i < 0) i += 32;
					this.co_mu[1].x = this.mu_ato_x[i];
					this.co_mu[1].y = this.mu_ato_y[i];
				}
				if (this.co_j.c != 300 && this.co_j.c != 310)
					if (this.j_tokugi == 14) {
						// 土管に入っていない時
						// シューティングモードの時
						if (this.co_j.x < this.ks_wx) {
							this.co_j.x = this.ks_wx;
							if (this.co_j.vx < 0) this.co_j.vx = 0;
							if (
								(this.maps.getBGCode(this.co_j.x + 31, this.co_j.y) >= 20 ||
									this.maps.getBGCode(this.co_j.x + 31, this.co_j.y + 31) >= 20) &&
								this.co_j.c >= 100 &&
								this.co_j.c < 200
							)
								this.jShinu(1);
						} else if (this.co_j.x > this.ks_wx + this.gg.di.width - 32) {
							this.co_j.x = this.ks_wx + this.gg.di.width - 32;
							this.co_j.vx = 0;
							if (this.co_j.vx > 0) this.co_j.vx = 0;
							this.co_j.wx = this.co_j.x - this.maps.wx;
						}
						if (this.co_j.c >= 100 && this.co_j.c < 200)
							if (this.co_j.y < this.maps.wy) {
								this.co_j.y = this.maps.wy;
								this.co_j.vy = 0;
								this.co_j.wy = this.co_j.y - this.maps.wy;
							} else if (this.co_j.y > this.maps.wy + this.gg.di.height - 32) {
								this.co_j.y = this.maps.wy + this.gg.di.height - 32;
								this.co_j.vy = 0;
								this.co_j.wy = this.co_j.y - this.maps.wy;
							}
					} else if (this.co_j.x < this.ks_wx - 16) {
						// 画面の左端にいる
						this.co_j.x = this.ks_wx - 16;
						if (this.co_j.vx < 0) this.co_j.vx = 0;
						var i3 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y);
						var k5 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31);
						if (
							((i3 >= 18 && i3 != 19) || (k5 >= 18 && k5 != 19) || this.j_hashigo_f) &&
							this.co_j.c >= 100 &&
							this.co_j.c < 200
						) {
							this.co_j.c = 210;
							this.co_j.y = this.maps.wy - 64;
							this.co_j.c1 = 0;
							this.j_jet_c = 0;
							this.j_v_c = 0;
							this.j_zan_f = false;
							this.j_muteki_c = 0;
							this.j_hp = 0;
							this.km.initAll();
							this.km.mode = 10;
						}
						if (this.a_hf) {
							if (isAthletic() && this.co_j.c >= 100 && this.co_j.c < 200) {
								this.co_j.c = 210;
								this.co_j.y = this.maps.wy - 64;
								this.co_j.c1 = 0;
								this.j_jet_c = 0;
								this.j_v_c = 0;
								this.j_zan_f = false;
								this.j_muteki_c = 0;
								this.j_hp = 0;
								this.km.initAll();
								this.km.mode = 10;
							}
						}
						if (
							this.yuka_ride_id >= 0 &&
							this.yo[this.yuka_ride_id].con >= 200 &&
							this.yo[this.yuka_ride_id].con < 300 &&
							this.co_j.c >= 100 &&
							this.co_j.c < 200
						) {
							this.co_j.c = 210;
							this.co_j.y = this.maps.wy - 64;
							this.co_j.c1 = 0;
							this.j_jet_c = 0;
							this.j_v_c = 0;
							this.j_zan_f = false;
							this.j_muteki_c = 0;
							this.j_hp = 0;
							this.km.initAll();
							this.km.mode = 10;
						}
					} else if (this.co_j.x > this.ks_wx + this.gg.di.width - 16) {
						// 画面の右端にいる
						this.co_j.x = this.ks_wx + this.gg.di.width - 16;
						this.co_j.vx = 0;
						if (this.co_j.vx > 0) this.co_j.vx = 0;
					}
				if (this.sl_step == 11 && this.maps.wx >= this.sl_wx) {
					this.maps.wx = this.sl_wx;
					this.sl_wy = this.ks_wy;
					this.sl_step = 3;
					this.gs.playBGM(4);
				}
			} else if (this.sl_step == 1) {
				if (this.nkscroll_con == 100) {
					if (this.nkscroll_view_x >= this.sl_wx) {
						this.maps.wx = this.sl_wx;
						this.sl_step = 2;
						this.gs.playBGM(4);
					}
				} else if (this.maps.wx >= this.sl_wx) {
					this.maps.wx = this.sl_wx;
					this.sl_step = 2;
					this.gs.playBGM(4);
				}
			} else if (this.sl_step == 2) {
				this.maps.wx = this.sl_wx;
				if (this.co_j.x < this.sl_wx - 16) {
					this.co_j.x = this.sl_wx - 16;
					this.co_j.vx = 0;
				} else if (this.co_j.x > this.sl_wx + this.gg.di.width - 16) {
					this.co_j.x = this.sl_wx + this.gg.di.width - 16;
					this.co_j.vx = 0;
				}
				if (this.maps.wy >= this.sl_wy) {
					this.maps.wy = this.sl_wy;
					this.sl_step = 3;
				}
			} else {
				this.maps.wx = this.sl_wx;
				this.maps.wy = this.sl_wy;
				if (this.j_tokugi >= 14 && this.j_tokugi <= 15) {
					if (this.co_j.c >= 100 && this.co_j.c < 200)
						if (this.co_j.y < this.maps.wy) {
							this.co_j.y = this.maps.wy;
							this.co_j.vy = 0;
							this.co_j.wy = this.co_j.y - this.maps.wy;
						} else if (this.co_j.y > this.maps.wy + this.gg.di.height - 32) {
							this.co_j.y = this.maps.wy + this.gg.di.height - 32;
							this.co_j.vy = 0;
							this.co_j.wy = this.co_j.y - this.maps.wy;
						}
					if (this.co_j.x < this.sl_wx) {
						this.co_j.x = this.sl_wx;
						this.co_j.vx = 0;
					} else if (this.co_j.x > this.sl_wx + this.gg.di.width - 32) {
						this.co_j.x = this.sl_wx + this.gg.di.width - 32;
						this.co_j.vx = 0;
					}
				} else if (this.co_j.x < this.sl_wx - 16) {
					this.co_j.x = this.sl_wx - 16;
					this.co_j.vx = 0;
				} else if (this.co_j.x > this.sl_wx + this.gg.di.width - 16) {
					this.co_j.x = this.sl_wx + this.gg.di.width - 16;
					this.co_j.vx = 0;
				}
			}
		if (this.nkscroll_con == 100 && (this.sl_step == 0 || this.sl_step == 1)) {
			// 仕掛けの強制スクロール または （ボス戦で）スクロールロック
			if (this.nkscroll_vx > 0) {
				// スクロール方向　→
				this.nkscroll_view_x += this.nkscroll_speed_x;
				if (this.nkscroll_view_x >= this.maps.wx_max) {
					this.nkscroll_view_x = this.maps.wx_max;
					this.nkscroll_vx = 0;
				}
				if (this.j_tokugi == 14 && this.co_j.c != 300 && this.co_j.c != 310) {
					var j = this.co_j.x;
					this.co_j.x += this.nkscroll_speed_x;
					if (
						this.maps.getBGCode(this.co_j.x + 31, this.co_j.y) >= 20 ||
						this.maps.getBGCode(this.co_j.x + 31, this.co_j.y + 31) >= 20
					)
						this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 31, 5) * 32 - 32;
					if (this.co_j.c >= 100 && this.co_j.c < 200) {
						if (this.co_j.x > this.nkscroll_view_x + this.gg.di.width - 32)
							this.co_j.x = this.nkscroll_view_x + this.gg.di.width - 32;
						if (this.co_j.x < this.nkscroll_view_x) this.co_j.x = this.nkscroll_view_x;
						if (this.co_j.y > this.nkscroll_view_y + this.gg.di.height - 32)
							this.co_j.y = this.nkscroll_view_y + this.gg.di.height - 32;
						if (this.co_j.y < this.nkscroll_view_y) this.co_j.y = this.nkscroll_view_y;
					}
					var j3 = this.maps.getBGCode(this.co_j.x + 31, this.co_j.y);
					var l5 = this.maps.getBGCode(this.co_j.x + 31, this.co_j.y + 31);
					if ((j3 >= 18 || l5 >= 18) && this.co_j.c >= 100 && this.co_j.c < 200) this.jShinu(5);
					this.co_j.wx = this.co_j.x - this.maps.wx;
					for (let k1 = 0; k1 <= 31; k1++) this.mu_ato_x[k1] += this.co_j.x - j;

					j = this.mu_ato_p - 7;
					if (j < 0) j += 32;
					this.co_mu[0].x = this.mu_ato_x[j];
					this.co_mu[0].y = this.mu_ato_y[j];
					j = this.mu_ato_p - 14;
					if (j < 0) j += 32;
					this.co_mu[1].x = this.mu_ato_x[j];
					this.co_mu[1].y = this.mu_ato_y[j];
				}
				if (this.co_j.c != 300 && this.co_j.c != 310)
					if (this.co_j.x < this.nkscroll_view_x - 15) {
						this.co_j.x = this.nkscroll_view_x - 15;
						if (this.co_j.vx < 0) this.co_j.vx = 0;
						var k3 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y);
						var i6 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31);
						if (
							((k3 >= 18 && k3 != 19) || (i6 >= 18 && i6 != 19) || this.j_hashigo_f) &&
							this.co_j.c >= 100 &&
							this.co_j.c < 200
						)
							this.jShinu(5);
						if (this.a_hf) {
							if (isAthletic() && this.co_j.c >= 100 && this.co_j.c < 200) this.jShinu(5);
						}
						if (
							this.yuka_ride_id >= 0 &&
							this.yo[this.yuka_ride_id].con >= 200 &&
							this.yo[this.yuka_ride_id].con < 300 &&
							this.co_j.c >= 100 &&
							this.co_j.c < 200
						)
							this.jShinu(5);
						if (this.isYukaCross()) this.jShinu(5);
					} else if (this.co_j.x > this.nkscroll_view_x + this.gg.di.width - 16) {
						this.co_j.x = this.nkscroll_view_x + this.gg.di.width - 16;
						if (this.co_j.vx > 0) this.co_j.vx = 0;
					}
			} else if (this.nkscroll_vx < 0) {
				// スクロール方向　←
				this.nkscroll_view_x -= this.nkscroll_speed_x;
				if (this.nkscroll_view_x <= this.maps.wx_mini) {
					this.nkscroll_view_x = this.maps.wx_mini;
					this.nkscroll_vx = 0;
				}
				if (this.j_tokugi == 14 && this.co_j.c != 300 && this.co_j.c != 310) {
					var k = this.co_j.x;
					this.co_j.x -= this.nkscroll_speed_x;
					if (
						this.maps.getBGCode(this.co_j.x, this.co_j.y) >= 20 ||
						this.maps.getBGCode(this.co_j.x, this.co_j.y + 31) >= 20
					)
						this.co_j.x = rightShiftIgnoreSign(this.co_j.x, 5) * 32 + 32;
					if (this.co_j.c >= 100 && this.co_j.c < 200) {
						if (this.co_j.x > this.nkscroll_view_x + this.gg.di.width - 32)
							this.co_j.x = this.nkscroll_view_x + this.gg.di.width - 32;
						if (this.co_j.x < this.nkscroll_view_x) this.co_j.x = this.nkscroll_view_x;
						if (this.co_j.y > this.nkscroll_view_y + this.gg.di.height - 32)
							this.co_j.y = this.nkscroll_view_y + this.gg.di.height - 32;
						if (this.co_j.y > this.nkscroll_view_y + this.gg.di.height - 32)
							this.co_j.y = this.nkscroll_view_y + this.gg.di.height - 32;
					}
					var l3 = this.maps.getBGCode(this.co_j.x, this.co_j.y);
					var j6 = this.maps.getBGCode(this.co_j.x, this.co_j.y + 31);
					if ((l3 >= 18 || j6 >= 18) && this.co_j.c >= 100 && this.co_j.c < 200) this.jShinu(5);
					this.co_j.wx = this.co_j.x - this.maps.wx;
					for (let l1 = 0; l1 <= 31; l1++) this.mu_ato_x[l1] += this.co_j.x - k;

					k = this.mu_ato_p - 7;
					if (k < 0) k += 32;
					this.co_mu[0].x = this.mu_ato_x[k];
					this.co_mu[0].y = this.mu_ato_y[k];
					k = this.mu_ato_p - 14;
					if (k < 0) k += 32;
					this.co_mu[1].x = this.mu_ato_x[k];
					this.co_mu[1].y = this.mu_ato_y[k];
				}
				if (this.co_j.c != 300 && this.co_j.c != 310)
					if (this.co_j.x > this.nkscroll_view_x + this.gg.di.width - 16) {
						this.co_j.x = this.nkscroll_view_x + this.gg.di.width - 16;
						if (this.co_j.vx > 0) this.co_j.vx = 0;
						if (this.co_j.c >= 100 && this.co_j.c < 200) {
							if (this.co_j.y > this.nkscroll_view_y + this.gg.di.height - 32)
								this.co_j.y = this.nkscroll_view_y + this.gg.di.height - 32;
							if (this.co_j.y < this.nkscroll_view_y) this.co_j.y = this.nkscroll_view_y;
						}
						var i4 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y);
						var k6 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31);
						if ((i4 >= 19 || k6 >= 19 || this.j_hashigo_f) && this.co_j.c >= 100 && this.co_j.c < 200) this.jShinu(5);
						if (this.a_hf) {
							if (isAthletic() && this.co_j.c >= 100 && this.co_j.c < 200) this.jShinu(5);
						}
						if (
							this.yuka_ride_id >= 0 &&
							this.yo[this.yuka_ride_id].con >= 200 &&
							this.yo[this.yuka_ride_id].con < 300 &&
							this.co_j.c >= 100 &&
							this.co_j.c < 200
						)
							this.jShinu(5);
						if (this.isYukaCross()) this.jShinu(5);
					} else if (this.co_j.x < this.nkscroll_view_x - 15) {
						this.co_j.x = this.nkscroll_view_x - 15;
						if (this.co_j.vx < 0) this.co_j.vx = 0;
					}
			} else if (this.co_j.x > this.nkscroll_view_x + this.gg.di.width - 16) {
				// 画面右端で止まる
				this.co_j.x = this.nkscroll_view_x + this.gg.di.width - 16;
				if (this.co_j.vx > 0) this.co_j.vx = 0;
			} else if (this.co_j.x < this.nkscroll_view_x - 15) {
				// 画面左端で止まる
				this.co_j.x = this.nkscroll_view_x - 15;
				if (this.co_j.vx < 0) this.co_j.vx = 0;
			}
			if (this.nkscroll_vy > 0) {
				// スクロール方向　↓
				this.nkscroll_view_y += this.nkscroll_speed_x;
				if (this.nkscroll_view_y >= this.maps.wy_max) {
					this.nkscroll_view_y = this.maps.wy_max;
					this.nkscroll_vy = 0;
				}
				if (this.j_tokugi == 14 && this.co_j.c != 300 && this.co_j.c != 310) {
					var l = this.co_j.y;
					this.co_j.y += this.nkscroll_speed_x;
					if (
						this.maps.getBGCode(this.co_j.x, this.co_j.y + 31) >= 20 ||
						this.maps.getBGCode(this.co_j.x + 31, this.co_j.y + 31) >= 20
					)
						this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
					if (this.co_j.c >= 100 && this.co_j.c < 200) {
						if (this.co_j.x > this.nkscroll_view_x + this.gg.di.width - 32)
							this.co_j.x = this.nkscroll_view_x + this.gg.di.width - 32;
						if (this.co_j.x < this.nkscroll_view_x) this.co_j.x = this.nkscroll_view_x;
						if (this.co_j.y > this.nkscroll_view_y + this.gg.di.height - 32)
							this.co_j.y = this.nkscroll_view_y + this.gg.di.height - 32;
						if (this.co_j.y < this.nkscroll_view_y) this.co_j.y = this.nkscroll_view_y;
					}
					this.co_j.wy = this.co_j.y - this.maps.wy;
					for (let i2 = 0; i2 <= 31; i2++) this.mu_ato_y[i2] += this.co_j.y - l;

					l = this.mu_ato_p - 7;
					if (l < 0) l += 32;
					this.co_mu[0].x = this.mu_ato_x[l];
					this.co_mu[0].y = this.mu_ato_y[l];
					l = this.mu_ato_p - 14;
					if (l < 0) l += 32;
					this.co_mu[1].x = this.mu_ato_x[l];
					this.co_mu[1].y = this.mu_ato_y[l];
				}
				if (this.co_j.c != 300 && this.co_j.c != 310 && this.co_j.y < this.nkscroll_view_y - 16) {
					this.co_j.y = this.nkscroll_view_y - 16;
					if (this.co_j.vy < 0) this.co_j.vy = 0;
					var j4 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y);
					var l6 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31);
					if ((j4 >= 18 || l6 >= 18) && this.co_j.c >= 100 && this.co_j.c < 200) this.jShinu(5);
					if (this.a_hf) {
						if (isAthletic() && this.co_j.c >= 100 && this.co_j.c < 200) this.jShinu(5);
					}
					if (
						this.yuka_ride_id >= 0 &&
						this.yo[this.yuka_ride_id].con >= 200 &&
						this.yo[this.yuka_ride_id].con < 300 &&
						this.co_j.c >= 100 &&
						this.co_j.c < 200
					)
						this.jShinu(5);
					if (this.isYukaCross()) this.jShinu(5);
				}
			} else if (this.nkscroll_vy < 0) {
				// スクロール方向　↑
				this.nkscroll_view_y -= this.nkscroll_speed_x;
				if (this.nkscroll_view_y <= this.maps.wy_mini) {
					this.nkscroll_view_y = this.maps.wy_mini;
					this.nkscroll_vy = 0;
				}
				if (this.j_tokugi == 14 && this.co_j.c != 300 && this.co_j.c != 310) {
					var i1 = this.co_j.y;
					this.co_j.y -= this.nkscroll_speed_x;
					if (
						this.maps.getBGCode(this.co_j.x, this.co_j.y) >= 20 ||
						this.maps.getBGCode(this.co_j.x + 31, this.co_j.y) >= 20
					)
						this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 5) * 32 + 32;
					if (this.co_j.c >= 100 && this.co_j.c < 200) {
						if (this.co_j.x > this.nkscroll_view_x + this.gg.di.width - 32)
							this.co_j.x = this.nkscroll_view_x + this.gg.di.width - 32;
						if (this.co_j.x < this.nkscroll_view_x) this.co_j.x = this.nkscroll_view_x;
						if (this.co_j.y > this.nkscroll_view_y + this.gg.di.height - 32)
							this.co_j.y = this.nkscroll_view_y + this.gg.di.height - 32;
						if (this.co_j.y < this.nkscroll_view_y) this.co_j.y = this.nkscroll_view_y;
					}
					this.co_j.wy = this.co_j.y - this.maps.wy;
					for (let j2 = 0; j2 <= 31; j2++) this.mu_ato_y[j2] += this.co_j.y - i1;

					i1 = this.mu_ato_p - 7;
					if (i1 < 0) i1 += 32;
					this.co_mu[0].x = this.mu_ato_x[i1];
					this.co_mu[0].y = this.mu_ato_y[i1];
					i1 = this.mu_ato_p - 14;
					if (i1 < 0) i1 += 32;
					this.co_mu[1].x = this.mu_ato_x[i1];
					this.co_mu[1].y = this.mu_ato_y[i1];
					var k4 = this.maps.getBGCode(this.co_j.x, this.co_j.y);
					var i7 = this.maps.getBGCode(this.co_j.x + 31, this.co_j.y);
					if ((k4 >= 18 || i7 >= 18) && this.co_j.c >= 100 && this.co_j.c < 200) this.jShinu(5);
				}
			}
			this.maps.wx = this.nkscroll_view_x;
			this.maps.wy = this.nkscroll_view_y;
			if (this.co_j.c >= 100 && this.co_j.c < 200 && this.co_j.y < this.maps.wy - 16) {
				this.co_j.y = this.maps.wy - 16;
				if (this.co_j.vy < 0) this.co_j.vy = 0;
				var l4 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y);
				var j7 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31);
				if (l4 >= 18 || j7 >= 18) this.jShinu(5);
			}
			if (this.j_tokugi == 14 && this.co_j.c != 300 && this.co_j.c != 310 && this.co_j.c >= 100 && this.co_j.c < 200) {
				if (this.co_j.x > this.nkscroll_view_x + this.gg.di.width - 32)
					this.co_j.x = this.nkscroll_view_x + this.gg.di.width - 32;
				if (this.co_j.x < this.nkscroll_view_x) this.co_j.x = this.nkscroll_view_x;
				if (this.co_j.y > this.nkscroll_view_y + this.gg.di.height - 32)
					this.co_j.y = this.nkscroll_view_y + this.gg.di.height - 32;
				if (this.co_j.y < this.nkscroll_view_y) this.co_j.y = this.nkscroll_view_y;
			}
			if (this.co_j.c >= 100 && this.co_j.c < 200 && this.co_j.y >= this.maps.wy + this.gg.di.height) this.jShinu(5);
		} else if (this.nkscroll_con == 200) {
			// 画面内で全方向スクロール または 視界変更
			let flag = false;
			if (this.nkscroll_my_view_x > this.maps.my_wx_max) {
				this.nkscroll_my_view_x -= 8;
				if (this.nkscroll_my_view_x <= this.maps.my_wx_max) {
					this.nkscroll_my_view_x = this.maps.my_wx_max;
					flag = true;
				}
				this.nkscroll_view_x = this.co_j.x - this.nkscroll_my_view_x;
				if (this.nkscroll_view_x >= this.maps.wx_max) {
					this.nkscroll_view_x = this.maps.wx_max;
					flag = true;
				}
			} else if (this.nkscroll_my_view_x < this.maps.my_wx_mini) {
				this.nkscroll_my_view_x += 8;
				if (this.nkscroll_my_view_x >= this.maps.my_wx_mini) {
					this.nkscroll_my_view_x = this.maps.my_wx_mini;
					flag = true;
				}
				this.nkscroll_view_x = this.co_j.x - this.nkscroll_my_view_x;
				if (this.nkscroll_view_x <= this.maps.wx_mini) {
					this.nkscroll_view_x = this.maps.wx_mini;
					flag = true;
				}
			} else {
				flag = true;
				this.nkscroll_view_x = this.co_j.x - this.nkscroll_my_view_x;
			}
			let flag1 = false;
			if (this.nkscroll_my_view_y > this.maps.my_wy_max) {
				this.nkscroll_my_view_y -= 4;
				if (this.nkscroll_my_view_y <= this.maps.my_wy_max) {
					this.nkscroll_my_view_y = this.maps.my_wy_max;
					flag1 = true;
				}
				this.nkscroll_view_y = this.co_j.y - this.nkscroll_my_view_y;
				if (this.nkscroll_view_y >= this.maps.wy_max) {
					this.nkscroll_view_y = this.maps.wy_max;
					flag1 = true;
				}
			} else if (this.nkscroll_my_view_y < this.maps.my_wy_mini) {
				this.nkscroll_my_view_y += 4;
				if (this.nkscroll_my_view_y >= this.maps.my_wy_mini) {
					this.nkscroll_my_view_y = this.maps.my_wy_mini;
					flag1 = true;
				}
				this.nkscroll_view_y = this.co_j.y - this.nkscroll_my_view_y;
				if (this.nkscroll_view_y <= this.maps.wy_mini) {
					this.nkscroll_view_y = this.maps.wy_mini;
					flag1 = true;
				}
			} else {
				flag1 = true;
				this.nkscroll_view_y = this.co_j.y - this.nkscroll_my_view_y;
			}
			if (flag && flag1) this.nkscroll_con = 0;
			this.maps.wx = this.nkscroll_view_x;
			this.maps.wy = this.nkscroll_view_y;
			if (this.maps.wx < this.maps.wx_mini) this.maps.wx = this.maps.wx_mini;
			else if (this.maps.wx > this.maps.wx_max) this.maps.wx = this.maps.wx_max;
			if (this.maps.wy < this.maps.wy_mini) this.maps.wy = this.maps.wy_mini;
			else if (this.maps.wy > this.maps.wy_max) this.maps.wy = this.maps.wy_max;
			this.nkscroll_my_view_x = this.co_j.x - this.maps.wx;
			this.nkscroll_my_view_y = this.co_j.y - this.maps.wy;
			this.nkscroll_view_x = this.co_j.x - this.nkscroll_my_view_x;
			this.nkscroll_view_y = this.co_j.y - this.nkscroll_my_view_y;
		} else if (this.nkscroll_con == 300) {
			// 画面内で横固定縦自由スクロール
			if (this.co_j.x > this.nkscroll_view_x + this.gg.di.width - 16) {
				this.co_j.x = this.nkscroll_view_x + this.gg.di.width - 16;
				if (this.co_j.vx > 0) this.co_j.vx = 0;
			} else if (this.co_j.x < this.nkscroll_view_x - 15) {
				this.co_j.x = this.nkscroll_view_x - 15;
				if (this.co_j.vx < 0) this.co_j.vx = 0;
			}
			this.maps.wx = this.nkscroll_view_x;
		} else if (this.nkscroll_con == 400) {
			// 画面内で右強制縦自由スクロール
			if (this.nkscroll_vx > 0) {
				this.nkscroll_view_x += this.nkscroll_speed_x;
				if (this.nkscroll_view_x >= this.maps.wx_max) {
					this.nkscroll_view_x = this.maps.wx_max;
					this.nkscroll_vx = 0;
				}
				if (this.co_j.c != 300 && this.co_j.c != 310)
					if (this.co_j.x < this.nkscroll_view_x - 15) {
						this.co_j.x = this.nkscroll_view_x - 15;
						if (this.co_j.vx < 0) this.co_j.vx = 0;
						var i5 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y);
						var k7 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31);
						if (
							((i5 >= 18 && i5 != 19) || (k7 >= 18 && k7 != 19) || this.j_hashigo_f) &&
							this.co_j.c >= 100 &&
							this.co_j.c < 200
						)
							this.jShinu(5);
						if (this.a_hf) {
							if (isAthletic() && this.co_j.c >= 100 && this.co_j.c < 200) this.jShinu(5);
						}
						if (
							this.yuka_ride_id >= 0 &&
							this.yo[this.yuka_ride_id].con >= 200 &&
							this.yo[this.yuka_ride_id].con < 300 &&
							this.co_j.c >= 100 &&
							this.co_j.c < 200
						)
							this.jShinu(5);
						if (this.isYukaCross()) this.jShinu(5);
					} else if (this.co_j.x > this.nkscroll_view_x + this.gg.di.width - 16) {
						this.co_j.x = this.nkscroll_view_x + this.gg.di.width - 16;
						if (this.co_j.vx > 0) this.co_j.vx = 0;
					}
			} else if (this.co_j.x > this.nkscroll_view_x + this.gg.di.width - 16) {
				this.co_j.x = this.nkscroll_view_x + this.gg.di.width - 16;
				if (this.co_j.vx > 0) this.co_j.vx = 0;
			} else if (this.co_j.x < this.nkscroll_view_x - 15) {
				this.co_j.x = this.nkscroll_view_x - 15;
				if (this.co_j.vx < 0) this.co_j.vx = 0;
			}
			this.maps.wx = this.nkscroll_view_x;
			if (this.co_j.c >= 100 && this.co_j.c < 200 && this.co_j.y < this.maps.wy - 16) {
				this.co_j.y = this.maps.wy - 16;
				if (this.co_j.vy < 0) this.co_j.vy = 0;
				var j5 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y);
				var l7 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31);
				if (j5 >= 18 || l7 >= 18) this.jShinu(5);
			}
			if (this.co_j.c >= 100 && this.co_j.c < 200 && this.co_j.y >= this.maps.wy + this.gg.di.height) this.jShinu(5);
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
			if (this.stage_cc > 28) {
				if (this.time_max > 0) this.addScore(Math.floor(this.time / 1000));
				if (this.stage_select == 2) {
					if (this.stage >= 4) {
						this.ml_mode = 400;
					} else {
						this.ml_mode = 260;
					}
				} else if (this.stage >= this.stage_max) {
					this.ml_mode = 400;
				} else {
					this.stage++;
					this.ml_mode = 90;
				}
			}
		}
		if (this.system_draw_mode != 4) {
			this.draw_lock_f = true;
			this.drawGamescreen();
			this.draw_lock_f = false;
		}
		this.dso_cf = false;
		if (this.system_draw_mode != 4) this.drawScore();
		this.gs.rsPlay();
		if (this.system_draw_mode != 4) this.drawItem();
		if (this.gk.key_code == 84) {
			// タイトルに戻る
			this.gk.key_code = 0;
			this.ml_mode = 50;
			this.gg.drawListImage(0, 0, 0);
			if (this.score > 0 || this.highscore > 0) this.drawScore();
		}
		if (this.pause_switch == 2 && this.gk.key_code == 80) {
			// ポーズする
			this.gk.key_code = 0;
			this.ml_mode = 110;
			this.ml_mode_c = 0;
		}
		if (this.ml_mode != 100)
			if (this.ml_mode == 300) {
				// 地図画面
				this.gg.setBackcolor(Color.black);
				this.gg.fill();
				this.gg.drawListImage(0, 0, 2);
				this.drawScore();
			} else if (this.ml_mode == 400) {
				// エンディング
				this.gg.drawListImage(0, 0, 1);
				this.drawScore();
			} else if (this.ml_mode == 250 || this.ml_mode == 260) {
				this.hg.setColor(Color.black);
				this.hg.fillRect(0, 0, this.gg.di.width, this.gg.di.height);
				this.drawScore();
			}
	}

	/**
	 * 毎フレームの処理のうち、ゲーム中以外の状態のときの処理を行います
	 */
	mainLoop() {
		this.gk.left_right_lock = false;

		const drawStageStart = () => {
			// 複数ステージ時にステージ開始画面を描画
			this.hg.setColor(this.gamecolor_kaishi);
			this.hg.fillRect(0, 0, this.gg.di.width, this.gg.di.height);

			let kx = rounddown(this.gg.di.width / 2) - 32 * 2;
			const ky = rounddown(this.gg.di.height / 2) - 16;

			if (this.stage >= this.stage_max) {
				// ラストステージ
				for (let i = 0; i < 6; i++) this.gg.drawPT(kx - 32 + 32 * i, ky, 52 + i, 0);
			} else {
				// ステージ1〜3
				for (let i = 0; i < 3; i++) this.gg.drawPT(kx + 32 * i, ky, 70 + i, 0);
				if (this.stage >= this.stage_max) this.gg.drawPT(kx + 32 * 3, ky, 75, 0);
				if (this.stage == 3) this.gg.drawPT(kx + 32 * 3, ky, 75, 0);
				else if (this.stage == 2) this.gg.drawPT(kx + 32 * 3, ky, 74, 0);
				else this.gg.drawPT(kx + 32 * 3, ky, 73, 0);
			}
			this.drawScore();
		};

		const drawBlack = () => {
			// 地図画面からステージ開始時に画面を真っ暗にする
			this.hg.setColor(Color.black);
			this.hg.fillRect(0, 0, this.gg.di.width, this.gg.di.height);
		};

		const drawTitle = () => {
			// タイトル画面を表示。スコアやハイスコアが存在する時、スコアも表示する
			this.gg.drawListImage(0, 0, 0); // タイトル画像を表示
			if (this.score > 0 || this.highscore > 0) this.drawScore();
		};

		const drawGameOver = () => {
			// ゲームオーバー画面を表示
			this.gg.setBackcolor(Color.black);
			this.gg.fill();
			this.gg.drawListImage(0, 0, 2); // ゲームオーバー画像を表示
			this.drawScore();
		};

		const returningTitle = () => {
			// Tキーを押すとタイトルに戻る
			if (this.gk.key_code == 84) {
				this.gk.key_code = 0;
				this.ml_mode = 50;
			}
		};

		const playStageBGM = () => {
			// 各ステージごとにBGMを流す
			if (this.stage >= 1 && this.stage <= 4) this.gs.playBGM(this.stage - 1);
		};

		switch (this.ml_mode) {
			default:
				break;

			case 50: // タイトル画面
				this.draw_lock_f = false;
				if (this.start_game_f) {
					this.gs.play(0);
					this.start_game_f = false;
					if (this.stage_select == 2) {
						this.init2();
						this.ig.worldInit();
						drawBlack();
						this.ml_mode = 200;
						this.gs.playBGM(7);
						break;
					}
					this.init2();
					this.init3();
					drawTitle();
					if (this.j_left <= 0 && this.stage_max <= 1) this.ml_mode = 100;
					else this.ml_mode = 90;
					playStageBGM();
					break;
				}
				this.gs.playBGM(5);
				drawTitle();
				this.stage = 1;
				if (!this.gm.button_f && !this.gk.tr1_f && !this.gk.tr2_f) {
					this.ml_mode = 60;
					this.g_c1 = 0;
					this.sendHighscore();
				}
				break;

			case 60:
				drawTitle();
				if (this.g_c1 == 0) {
					if (this.gk.key_char == "v".toUpperCase().charCodeAt(0)) this.g_c1 = 1;
				} else if (this.g_c1 == 1) {
					if (this.gk.key_char == "e".toUpperCase().charCodeAt(0)) this.g_c1 = 2;
					else if (this.gk.key_char != "v".toUpperCase().charCodeAt(0)) this.g_c1 = 0;
				} else if (this.g_c1 == 2)
					if (this.gk.key_char == "r".toUpperCase().charCodeAt(0)) this.ml_mode = 1000;
					else if (this.gk.key_char != "e".toUpperCase().charCodeAt(0)) this.g_c1 = 0;
				if (
					(this.title_lock_f && !this.start_game_f) ||
					((!this.gm.button_f || this.gm.click_x >= this.gg.di.width || this.gm.click_y >= this.gg.di.height) &&
						!this.gk.tr1_f &&
						!this.gk.tr2_f &&
						!this.start_game_f)
				)
					break;
				this.gs.play(0);
				this.start_game_f = false;
				if (this.stage_select == 2) {
					this.init2();
					this.ig.worldInit();
					drawBlack();
					this.ml_mode = 200;
					this.gs.playBGM(7);
					break;
				}
				this.init2();
				this.ml_mode = 100;
				this.init3();
				drawTitle();
				if (this.j_left <= 0 && this.stage_max <= 1) this.ml_mode = 100;
				else this.ml_mode = 90;
				playStageBGM();
				break;

			case 80: // ステージ開始
				this.init2();
				this.ml_mode = 100;
				this.init3();
				drawTitle();
				if (this.j_left <= 0) this.ml_mode = 100;
				else this.ml_mode = 90;
				playStageBGM();
				break;

			case 90:
				this.dso_cf = true;
				this.init3();
				if (this.mode_wait_stagestart == 0) this.ml_mode = 100;
				drawStageStart();
				this.ml_mode = 91;
				this.ml_mode_c = 0;
				playStageBGM();
				break;

			case 91:
				this.ml_mode_c++;
				if (this.ml_mode_c > this.mode_wait_stagestart) this.ml_mode = 100;
				drawStageStart(); // 2.8では呼び出されていなかったのでもしかしたら不要？
				returningTitle();
				break;

			case 95: // 地図画面時 ショップで購入したアイテムを反映
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
				drawBlack();
				this.drawScore();
				this.ml_mode = 96;
				this.ml_mode_c = 0;
				playStageBGM();
				break;

			case 96:
				this.ml_mode_c++;
				if (this.ml_mode_c > 8) this.ml_mode = 100;
				drawBlack();
				this.drawScore();
				returningTitle();
				break;

			case 110: // ポーズ中
				if (this.ml_mode_c < 8) this.ml_mode_c++;
				if (this.ml_mode_c == 1) {
					this.hg.setColor(new Color(0, 0, 0, 160));
					this.hg.fillRect(0, 0, this.gg.di.width, this.gg.di.height);
					this.drawItem();
					this.drawScore();
					this.hg.setColor(Color.white);
					this.hg.setFont(new Font(Font.DIALOG, 1, 32));
					this.hg.drawString("PAUSE", rounddown(this.gg.di.width / 2) - 56, rounddown(this.gg.di.height / 2) - 16);
				}
				if (this.gk.key_code == 80 && this.ml_mode_c >= 8) {
					this.gk.key_code = 0;
					this.ml_mode = 100;
					this.gk.init();
				}
				returningTitle();
				break;

			case 200: // 地図画面
				this.ig.drawMap();
				this.ig.mainProgram();
				this.time = 0;
				this.drawScore2();
				if (this.ig.mp_mode == 110)
					if (this.ig.dokan_khID >= 1) this.ml_mode = 230;
					else this.ml_mode = 95;
				returningTitle();
				break;

			case 230:
				drawBlack();
				this.drawScore2();
				this.ml_mode = 231;
				this.ml_mode_c = 0;
				this.gs.stopBGM();
				break;

			case 231:
				drawBlack();
				this.drawScore2();
				this.ml_mode_c++;
				if (this.ml_mode_c == 5) {
					let s1;
					if (this.ig.dokan_khID == 2) s1 = this.tdb.getValue("url2");
					else if (this.ig.dokan_khID == 3) s1 = this.tdb.getValue("url3");
					else if (this.ig.dokan_khID == 4) s1 = this.tdb.getValue("url4");
					else s1 = this.tdb.getValue("url1");

					location.href = s1;
				} else if (this.ml_mode_c > 80) this.ml_mode = 50;
				returningTitle();
				break;

			case 250:
				this.addScore(0);
				this.ig.worldInit2();
				this.ml_mode = 251;
				this.ml_mode_c = 0;
				drawBlack();
				this.drawScore();
				this.gs.playBGM(7);
				break;

			case 251:
				this.ml_mode_c++;
				if (this.ml_mode_c > 8) this.ml_mode = 200;
				drawBlack();
				this.drawScore();
				returningTitle();
				break;

			case 260:
				this.addScore(0);
				this.ig.worldInit3();
				this.ml_mode = 261;
				this.ml_mode_c = 0;
				drawBlack();
				this.drawScore();
				this.gs.playBGM(7);
				break;

			case 261:
				this.ml_mode_c++;
				if (this.ml_mode_c > 8) this.ml_mode = 200;
				drawBlack();
				this.drawScore();
				returningTitle();
				break;

			case 300: // ゲームオーバー
				if (this.mode_wait_gameover == 0) {
					this.gk.key_code = 0;
					this.ml_mode = 50;
				} else {
					drawGameOver();
					this.ml_mode = 310;
					this.ml_mode_c = 0;
					this.gs.play(1);
					this.gs.stopBGM();
					this.sendHighscore();
				}
				break;

			case 310:
				drawGameOver();
				this.ml_mode_c++;
				if (this.ml_mode_c > this.mode_wait_gameover) {
					this.ml_mode = 50;
					this.gk.key_code = 0;
					drawTitle();
				}
				if (this.gk.key_code != 84) break;
				this.gk.key_code = 0;
				this.ml_mode = 50;
				drawTitle();
				break;

			case 400: // エンディング
				if (this.mode_wait_ending == 0) {
					this.gk.key_code = 0;
					this.ml_mode = 50;
					break;
				}
				this.gg.drawListImage(0, 0, 1);
				this.drawScore();
				this.gs.playBGM(6);
				this.sendHighscore();
				this.ml_mode = 410;
				this.ml_mode_c = 0;
				break;

			case 410:
				//↓エンディング画像が昔は重ねて表示していたせいでαチャンネル付きPNGではおかしな表示になっていた…
				//this.gg.drawListImage(0, 0, 1);
				this.ml_mode_c++;
				if (this.ml_mode_c > this.mode_wait_ending) {
					this.ml_mode = 50;
					drawTitle();
					this.gk.key_code = 0;
				}
				if (this.gk.key_code != 84) break;
				this.gk.key_code = 0;
				this.ml_mode = 50;
				drawTitle();
				break;

			case 500:
				this.gg.setBackcolor(Color.black);
				this.gg.fill();
				drawTitle();
				this.ml_mode = 50;
				break;

			case 1000:
				this.gg.setBackcolor(Color.black);
				this.gg.fill();
				this.ml_mode = 1010;
				this.ml_mode_c = 0;
				break;

			case 1010:
				this.gg.setBackcolor(Color.black);
				this.gg.fill();
				this.hg.setFont(new Font(Font.DIALOG, 0, 46));
				this.hg.setColor(Color.white);
				this.hg.setFont(new Font(Font.DIALOG, 0, 20));
				this.hg.drawString("Title    MASAO CONSTRUCTION FX", 50, 50);
				this.hg.drawString("Version    Update 16 Build 62", 50, 80);
				this.hg.drawString("Language   Java2 SDK 1.6.0 Update 16", 50, 110);
				this.hg.drawString("OS      Windows Vista", 50, 140);
				this.hg.drawString("Browser    InternetExplorer 8.0", 50, 170);
				this.hg.drawString("Programing   Fukuda Naoto", 50, 200);
				this.hg.drawString("Date     2011/5", 50, 230);
				this.ml_mode_c++;
				if (this.ml_mode_c > 40) this.ml_mode = 50;
				break;
		}
	}

	/**
	 * ゲームの状態を初期化します
	 * TODO: {@link MainProgram#init2}, {@link MainProgram#init3}との違いは？
	 */
	init1() {
		/**
		 * 色パラメータを設定します。
		 *
		 * @param {number} r
		 * @param {number} g
		 * @param {number} b
		 * @param {string} param
		 */
		const setColorParam = (r: string, g: string, b: string, param: `gamecolor_${string}` & keyof MainProgram) => {
			const color = [r, g, b];
			const numColor = color.map((c) => {
				let n = this.tdb.getValueInt(c);
				if (n < 0) n = 0;
				else if (n > 255) n = 255;
				return n;
			});
			this[param] = new Color(numColor[0], numColor[1], numColor[2]);
		};
		this.mode_wait_ending = 120;
		this.mode_wait_gameover = 45;
		this.mode_wait_stagestart = 35;
		this.j_hp_v = false;
		this.j_hp = 1;
		this.j_hp_max = 1;
		this.j_hp_moji = "HP";
		this.j_fire_range = 9999;
		this.time_max = this.tdb.getValueInt("time_max");
		var k = this.tdb.getValueInt("score_v");
		if (k == 2) this.score_v = false;
		else this.score_v = true;
		(["", "_s", "_t", "_f"] as const).forEach((stage) => {
			setColorParam(
				`backcolor_red${stage}`,
				`backcolor_green${stage}`,
				`backcolor_blue${stage}`,
				concatString("gamecolor_back", stage)
			);
		});
		(["kaishi", "mizunohadou"] as const).forEach((name) => {
			setColorParam(`${name}_red`, `${name}_green`, `${name}_blue`, concatString("gamecolor_", name));
		});
		setColorParam("scorecolor_red", "scorecolor_green", "scorecolor_blue", "gamecolor_score");
		(["grenade", "firebar"] as const).forEach((name) => {
			([1, 2] as const).forEach((i) => {
				setColorParam(`${name}_red${i}`, `${name}_green${i}`, `${name}_blue${i}`, concatString("gamecolor_", name, i));
			});
		});
		(["score", "highscore", "jet", "grenade"] as const).forEach((name) => {
			this[concatString("moji_", name)] = this.tdb.getValue(concatString("moji_", name));
		});
		this.moji_time = `    ${this.tdb.getValue("moji_time")} `;
		this.moji_left = `    ${this.tdb.getValue("moji_left")} `;
		this.moji_size = this.tdb.getValueInt("moji_size");
		if (this.moji_size < 10) this.moji_size = 10;
		else if (this.moji_size > 30) this.moji_size = 30;
		this.j_left_shoki = this.tdb.getValueInt("jibun_left_shoki");
		if (this.j_left_shoki < 1) this.j_left_shoki = 1;
		this.j_left_shoki--;
		this.stage_max = this.tdb.getValueInt("stage_max");
		if (this.stage_max < 1) this.stage_max = 1;
		else if (this.stage_max > 4) this.stage_max = 4;
		if (this.stage_select == 2) this.stage_max = 4;
		this.stage_kaishi = this.tdb.getValueInt("stage_kaishi");
		if (this.stage_kaishi < 1) this.stage_kaishi = 1;
		if (this.stage_kaishi > this.stage_max) this.stage_kaishi = this.stage_max;
		([1, 2] as const).forEach((j1) => {
			const key = concatString("score_1up_", j1, "_para");
			this[key] = this.tdb.getValueInt(concatString("score_1up_", j1));
			if (this[key] < 0) this[key] = 0;
			if (this.stage_max <= 1 && this.j_left_shoki <= 0) this[key] = 0;
		});
		this.default_j_tail_type = this.tdb.getValueInt("j_tail_type");
		if (this.default_j_tail_type < 1 || this.default_j_tail_type > 3) this.default_j_tail_type = 1;
		this.j_tail_type = this.default_j_tail_type;
		this.default_j_fire_type = this.tdb.getValueInt("j_fire_type");
		if (this.default_j_fire_type < 1 || this.default_j_fire_type > 4) this.default_j_fire_type = 1;
		this.j_fire_type = this.default_j_fire_type;
		var i = this.tdb.getValueInt("j_tail_hf");
		if (i == 2) this.j_tail_hf = true;
		else this.j_tail_hf = false;
		this.grenade_type = this.tdb.getValueInt("grenade_type");
		if (this.grenade_type < 1 || this.grenade_type > 9) this.grenade_type = 1;
		this.boss_destroy_type = this.tdb.getValueInt("boss_destroy_type");
		if (this.boss_destroy_type != 2) this.boss_destroy_type = 1;
		this.j_tail_ap_boss = this.tdb.getValueInt("j_tail_ap_boss");
		if (this.j_tail_ap_boss < 0) this.j_tail_ap_boss = 4;
		this.suberuyuka_hkf = this.tdb.getValueInt("suberuyuka_hkf");
		if (this.suberuyuka_hkf == 2) this.suberuyuka_hkf = 2;
		else this.suberuyuka_hkf = 1;
		i = this.tdb.getValueInt("j_fire_mkf");
		if (i == 2) this.j_fire_mkf = true;
		else this.j_fire_mkf = false;
		i = this.tdb.getValueInt("j_tokugi");
		if (i >= 1 && i <= 19) this.j_tokugi = i;
		else this.j_tokugi = 1;
		(["", "2", "3", "4"] as const).forEach((n) => {
			const key = concatString("j_add_tokugi", n);
			const tokugi = this.tdb.getValueInt(key);
			if (tokugi >= 1) this[key] = tokugi;
			else this[key] = 0;
		});
		i = this.tdb.getValueInt("dengeki_mkf");
		if (i >= 1 && i <= 5) this.dengeki_mkf = i;
		else this.dengeki_mkf = 1;
		i = this.tdb.getValueInt("yachamo_kf");
		if (i >= 1 && i <= 9) this.yachamo_attack = i;
		else this.yachamo_attack = 1;
		i = this.tdb.getValueInt("mizutaro_attack");
		if (i >= 1 && i <= 5) this.mizutaro_attack = i;
		else this.mizutaro_attack = 1;
		i = this.tdb.getValueInt("poppie_attack");
		if (i >= 1 && i <= 5) this.poppie_attack = i;
		else this.poppie_attack = 1;
		i = this.tdb.getValueInt("mariri_attack");
		if (i >= 1 && i <= 5) this.mariri_attack = i;
		else this.mariri_attack = 1;
		i = this.tdb.getValueInt("chikorin_attack");
		if (i >= 1 && i <= 9) this.chikorin_attack = i;
		else this.chikorin_attack = 1;
		i = this.tdb.getValueInt("airms_kf");
		if (i >= 1 && i <= 5) this.airms_kf = i;
		else this.airms_kf = 1;
		i = this.tdb.getValueInt("taiking_attack");
		if (i >= 1 && i <= 5) this.taiking_attack = i;
		else this.taiking_attack = 1;
		i = this.tdb.getValueInt("kuragesso_attack");
		if (i >= 1 && i <= 5) this.kuragesso_attack = i;
		else this.kuragesso_attack = 1;
		([
			"ugokuyuka1",
			"ugokuyuka2",
			"ugokuyuka3",
			"firebar1",
			"firebar2",
			"dossunsun",
			"coin1",
			"coin3",
			"dokan1",
			"dokan2",
			"dokan3",
			"dokan4",
		] as const).forEach((param) => {
			const paramname = concatString(param, "_type");
			this[paramname] = this.tdb.getValueInt(paramname);
			if (this[paramname] < 1 || this[paramname] > 1249) this[paramname] = 1;
		});
		this.pause_switch = this.tdb.getValueInt("pause_switch");
		if (this.pause_switch != 2) this.pause_switch = 1;
		this.control_parts_visible = this.tdb.getValueInt("control_parts_visible");
		if (this.control_parts_visible != 2) this.control_parts_visible = 1;
		this.boss_type = this.tdb.getValueInt("boss_type");
		if (this.boss_type < 1 || this.boss_type > 5) this.boss_type = 1;
		this.boss2_type = this.tdb.getValueInt("boss2_type");
		if (this.boss2_type < 1 || this.boss2_type > 8) this.boss2_type = 1;
		this.boss3_type = this.tdb.getValueInt("boss3_type");
		if (this.boss3_type < 1 || this.boss3_type > 8) this.boss3_type = 1;
		this.gazou_scroll = this.tdb.getValueInt("gazou_scroll");
		if (this.gazou_scroll < 2 || this.gazou_scroll > 11) this.gazou_scroll = 1;
		([
			"gazou_scroll_speed_x",
			"gazou_scroll_speed_y",
			"second_gazou_scroll_speed_x",
			"second_gazou_scroll_speed_y",
		] as const).forEach((param) => {
			this[param] = this.tdb.getValueInt(param);
			if (this[param] < -32) this[param] = -32;
			else if (this[param] > 32) this[param] = 32;
		});
		this.gazou_scroll_x = this.tdb.getValueInt("gazou_scroll_x");
		if (this.gazou_scroll_x < 0) this.gazou_scroll_x = 0;
		this.gazou_scroll_y = this.tdb.getValueInt("gazou_scroll_y");
		if (this.gazou_scroll_y < 0) this.gazou_scroll_y = 0;
		this.mcs_haikei_visible = this.tdb.getValueInt("mcs_haikei_visible");
		if (this.mcs_haikei_visible != 1) this.mcs_haikei_visible = 0;
		this.easy_mode = this.tdb.getValueInt("easy_mode");
		if (this.easy_mode != 2) this.easy_mode = 1;
		this.dokan_mode = this.tdb.getValueInt("dokan_mode");
		if (this.dokan_mode < 1 || this.dokan_mode > 2) this.dokan_mode = 1;
		if (this.gg.mode == 1) this.dokan_mode = 2;
		this.mes1_name = this.tdb.getValue("mes1_name");
		this.mes2_name = this.tdb.getValue("mes2_name");
		this.shop_name = this.tdb.getValue("shop_name");
		this.setumei_name = this.tdb.getValue("setumei_name");
		this.door_score = this.tdb.getValueInt("door_score");
		if (this.door_score < 10) this.door_score = 10;
		([1, 2, 3, 4, 5, 6, 7, 8, 9] as const).forEach((j1) => {
			this.shop_item_name[j1 - 1] = this.tdb.getValue(concatString("shop_item_name", j1));

			let teika = this.tdb.getValueInt(concatString("shop_item_name", j1));
			if (teika < 0) teika = 0;
			this.shop_item_teika[j1 - 1] = teika;
		});

		this.scroll_area = this.tdb.getValueInt("scroll_area");
		if (this.scroll_area < 1 || this.scroll_area > 5) this.scroll_area = 1;
		this.clear_type = this.tdb.getValueInt("clear_type");
		if (this.clear_type < 1 || this.clear_type > 3) this.clear_type = 1;
		this.second_gazou_img = null;
		for (let k1 = 0; k1 <= 3; k1++) this.second_gazou_stage_img[k1] = null;

		this.second_gazou_visible = false;
		if (
			(this.gg.layer_mode == 2 || this.tdb.getValueInt("mcs_haikei_visible") == 1) &&
			this.tdb.getValueInt("second_gazou_visible") == 2
		) {
			this.second_gazou_visible = true;
			this.second_gazou_stage_img[0] = this.gg.loadImage(this.tdb.getValue("filename_second_haikei"));
			if (this.stage_select == 2 || this.stage_max >= 2) {
				([2, 3, 4] as const).forEach((k1) => {
					this.second_gazou_stage_img[k1 - 1] = this.gg.loadImage(
						this.tdb.getValue(concatString("filename_second_haikei", k1))
					);
				});
			}
		}
		this.second_gazou_scroll = this.tdb.getValueInt("second_gazou_scroll");
		if (this.second_gazou_scroll < 1 || this.second_gazou_scroll > 8) this.second_gazou_scroll = 1;
		this.second_gazou_scroll_x = this.tdb.getValueInt("second_gazou_scroll_x");
		this.second_gazou_scroll_y = this.tdb.getValueInt("second_gazou_scroll_y");
		this.second_gazou_priority = this.tdb.getValueInt("second_gazou_priority");
		if (this.second_gazou_priority < 1 || this.second_gazou_priority > 2) this.second_gazou_priority = 1;
		this.water_visible = this.tdb.getValueInt("water_visible");
		if (this.water_visible != 2) this.water_visible = 1;
	}

	/**
	 * 複数ステージや残機のある場合の初期化処理を行います（？）
	 * TODO: {@link MainProgram#init1}, {@link MainProgram#init3}との違いは？
	 */
	init2() {
		if (this.score > this.highscore) this.highscore = this.score;
		this.j_left = this.j_left_shoki;
		this.score_1up_1 = this.score_1up_1_para;
		this.score_1up_2 = this.score_1up_2_para;
		for (let i = 0; i <= 2; i++) this.stage_1up_f[i] = true;

		this.cpoint_con = 0;
		this.cpoint_stage = 0;
		this.cpoint_x = 32;
		this.cpoint_y = 320;
		this.gk.key_code = 0;
		this.score = 0;
		this.stage = this.stage_kaishi;
		if (this.time_max > 0) this.time = this.time_max * 1000 + 1000 - 70;
		else this.time = 0;
		this.gs.rsInit();
	}

	/**
	 * ステージ開始時の初期化処理を行います(？）
	 * TODO: {@link MainProgram#init1}, {@link MainProgram#init2}との違いは？
	 */
	init3() {
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
		this.j_shitakara_mushi_y = -1;
		this.j_hashigo_f = false;
		this.j_hashigo_mushi_x = -1;
		this.j_a_id = -1;
		this.tr1_c = 6;
		this.gk.tr1_c = 6;
		this.tr2_c = 0;
		this.gk.left_c = 0;
		this.gk.right_c = 0;
		this.left_dcc = 0;
		this.right_dcc = 0;
		this.xkey_c = 0;
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
		this.j_rope_id = 0;
		this.j_rope_r = 32;
		this.j_rope_cf = false;
		this.j_cannon_c = 0;
		this.j_cannon_type = 0;
		this.saka_mushi_y = -1;
		this.maps.gazou_x = 0;
		this.maps.gazou_y = 0;
		this.maps.second_gazou_x = 0;
		this.maps.second_gazou_y = 0;
		this.stage_haikei = this.stage;
		this.second_gazou_img = this.second_gazou_stage_img[this.stage - 1];
		this.j_djump_kf = true;
		this.coin_kazu = 100;
		this.dkey_count[0] = 0;
		this.dkey_count[1] = 0;
		this.j_mizu_f = false;
		this.j_mizu_ac = 0;
		this.j_mizu_awa_c = 0;
		this.j_jdai_f = false;
		this.j_double_f = false;
		this.j_hp = this.j_hp_max;
		this.j_muteki_c = 0;
		this.j_4_muki = 1;
		this.j_speed = 80;
		// ボスの最大HPを初期化
		this.boss_hp_max = this.tdb.getValueInt("boss_hp_max");
		if (this.boss_hp_max < 1) this.boss_hp_max = 1;
		this.boss_hp = this.boss_hp_max;
		this.tpika_p = 0;
		this.hitokoto_c = -1;
		this.hitokoto_num = 1;
		if (this.j_tail_hf) this.j_tail_f = true;
		if (this.tdb.getValueInt("j_fire_equip") == 2) this.j_fire_f = true;
		this.j_fire_type = this.default_j_fire_type;
		if (this.j_tokugi == 14) this.j_fire_f = true;
		this.j_fire_range = 9999;
		if (this.j_tokugi == 15) this.j_fire_range = 9;
		if (this.j_fire_type == 3 || this.j_fire_type == 4) this.j_fire_range = 10;
		if (this.j_tokugi == 17) {
			this.setMyMaxHP("3");
			this.showMyHP("HP");
		}
		this.j_enemy_press = this.tdb.getValueInt("j_enemy_press");
		if (this.j_enemy_press < 1 || this.j_enemy_press > 3) this.j_enemy_press = 1;
		this.view_move_type = this.tdb.getValueInt("view_move_type");
		if (this.view_move_type != 2) this.view_move_type = 1;
		if (this.view_move_type == 2) this.co_j.muki = 0; // 右進行用の視界の時自分の向きを右向きにする
		this.jst_slow_down = 0;
		this.jst_key_down = 0;
		this.jst_fast_run_attack = 0;
		this.jst_fly_left_right = 0;
		this.jst_fire_xkey_only = 0;
		this.jst_kabe_kick = 0;
		this.jst_double_jump = 0;
		this.jst_fast_run = 0;
		this.jst_high_sjump = 0;
		this.jst_jump_level_fix = 0;
		this.jst_auto_right = 0;
		this.gk.left_right_lock = false;
		this.jst_syouryuuken = 0;
		this.jst_pc_attack = 0;
		this.up_key_c = 0;
		this.down_key_c = 0;
		switch (this.j_tokugi) {
			case 2: // 落ちるのが遅い
				this.jst_slow_down = 1;
				break;

			case 3: // 空中で下ボタンを押すと急降下
				this.jst_key_down = 1;
				break;

			case 4: // 全速体当たりで敵を倒せる
				this.jst_fast_run_attack = 1;
				break;

			case 5: // 空中の左右加速度が高い
				this.jst_fly_left_right = 1;
				break;

			case 6: // 壁キック
				this.jst_kabe_kick = 1;
				break;

			case 7: // ファイヤーボールが水平に飛ぶ
				this.j_fire_type = 2;
				this.j_fire_range = 9999;
				this.jst_fire_xkey_only = 1;
				break;

			case 8: // 空中でもう１回ジャンプできる
				this.jst_double_jump = 1;
				break;

			case 9: // 速く走れる
				this.jst_fast_run = 1;
				break;

			case 11: // スーパージャンプで高く飛べる
				this.jst_high_sjump = 1;
				break;

			case 13: // ジャンプできない　走れない　Z,Xキーで穴掘り
				this.jst_fast_run = 2;
				break;

			case 16: // 壁ジャンプ
				this.jst_kabe_kick = 2;
				break;

			case 18: // ひたすら右へ歩く
				this.jst_auto_right = 1;
				this.gk.left_right_lock = true;
				break;

			case 19: // ひたすら右へ走る
				this.jst_auto_right = 2;
				this.gk.left_right_lock = true;
				break;
		}
		this.j_tail_type = this.default_j_tail_type;
		(["", "2", "3", "4"] as const).forEach((n) => {
			const key = concatString("j_add_tokugi", n);
			if (this[key] >= 2) this.addMyTokugi(this[key]);
		});
		for (let i = 0; i <= 5; i++) {
			this.j_zan_x[i] = 0;
			this.j_zan_y[i] = 0;
			this.j_zan_pt[i] = 0;
			this.j_zan_pth[i] = 0;
			this.j_zan_img[i] = null;
			this.j_zan_zs_x[i] = 0;
			this.j_zan_zs_y[i] = 0;
		}

		this.j_zan_p = 0;
		this.j_zan_c = 0;
		this.j_zan_nagasa = 0;
		this.j_zan_f = false;
		this.j_zan_cf = false;
		this.spot_c = 0;
		this.spot_r = 160;
		this.spot_r_mokuhyou = 160;
		this.km.initAll();
		this.km.mode = 100;
		for (let j = 0; j <= 1; j++) this.co_mu[j].init();

		for (let k = 0; k <= 31; k++) {
			this.mu_ato_x[k] = this.co_j.x;
			this.mu_ato_y[k] = this.co_j.y;
		}

		this.mu_ato_p = 0;
		this.mhouse_c = 0;
		this.mhouse_x = 0;
		this.mhouse_y = 0;
		this.souko_count1 = 0;
		this.souko_count2 = 0;
		this.souko_count3 = 0;
		this.yuka_ride_id = -1;
		this.yo = [];

		this.sl_step = 0;
		this.sl_speed = 0;
		this.sl_wx = 0;
		this.sl_wy = 0;
		this.showm_c = 0;
		for (let i1 = 0; i1 <= 3; i1++) this.showm_data[i1] = null;

		this.showi_c = 0;
		this.showi_x = 0;
		this.showi_y = 0;
		this.showi_img = null;
		this.showr_c = 0;
		this.showo_c = 0;
		this.setmapc_f = false;
		this.setbacki_f = false;
		this.setmyw_w = -1;
		this.setmyw_pt = 100;
		this.setmyw_muki = 1;
		this.attacktail_yf = true;
		this.gauge_v = false;
		let k5;
		if (this.stage == 2) k5 = this.tdb.getValueInt("scroll_mode_s");
		else if (this.stage == 3) k5 = this.tdb.getValueInt("scroll_mode_t");
		else if (this.stage == 4) k5 = this.tdb.getValueInt("scroll_mode_f");
		else k5 = this.tdb.getValueInt("scroll_mode");
		if (k5 == 2) {
			// 強制スクロール
			this.sl_step = 10;
			this.ks_wx = 32;
			this.ks_wy = (this.mapHeight - rounddown((this.gg.di.height - 320) / 32)) * 32;
			this.sl_speed = 2;
		} else if (k5 == 3) {
			// 高速強制スクロール
			this.sl_step = 10;
			this.ks_wx = 32;
			this.ks_wy = (this.mapHeight - rounddown((this.gg.di.height - 320) / 32)) * 32;
			this.sl_speed = 4;
		}
		this.nkscroll_con = 0;
		this.nkscroll_view_x = 0;
		this.nkscroll_view_y = 0;
		this.nkscroll_speed_x = 2;
		this.nkscroll_vx = 0;
		this.nkscroll_vy = 0;
		this.nkscroll_zsc = false;

		this.co_a = [new CharacterObject()]; // 例外落ち回避用要素
		this.vo_x = [[0, 0, 0, 0]];
		this.vo_y = [[0, 0, 0, 0]];
		this.a_hf = false;

		this.co_t = [];

		this.co_b.init();
		this.boss_kijyun_y = 0;
		this.boss_attack_mode = false;
		for (let l1 = 0; l1 <= 79; l1++) this.co_m[l1].init();

		this.m_kazu = 0;
		for (let i2 = 0; i2 <= 8; i2++) this.co_jm[i2].init();

		this.jm_kazu = 0;
		for (let j2 = 0; j2 <= 79; j2++) this.co_h[j2].init();

		if (this.time_max > 0) this.time = this.time_max * 1000 + 1000 - 70;
		else this.time = 0;
		this.ana_kazu = 0;
		for (let k2 = 0; k2 <= 11; k2++) this.ana_c[k2] = 0;

		this.mapsMakeStageData(100 + this.stage);

		// コンティニューアイテムを取った時
		if (this.cpoint_con == 100) {
			// 現在のステージがコンティニューアイテムを取ったステージと同じ
			if (this.stage == this.cpoint_stage) {
				// 自分の位置を変更
				this.co_j.x = this.cpoint_x;
				this.co_j.y = this.cpoint_y;

				// 取ったコンティニューアイテムや？ブロックを削除
				for (let l2 = 0; l2 <= this.a_kazu; l2++)
					if (this.co_a[l2].c == 3400 && this.co_a[l2].x == this.cpoint_x && this.co_a[l2].y == this.cpoint_y)
						this.co_a[l2].c = 0;

				this.hDelete(rightShiftIgnoreSign(this.co_j.x, 5), rightShiftIgnoreSign(this.co_j.y, 5) + 1, 4100);

				// 視点を変更する
				this.maps.wx = this.co_j.x - (this.view_move_type === 2 ? this.maps.my_wx_max : this.maps.my_wx_mini);
				this.maps.wy = this.co_j.y - this.maps.my_wy_max;
			} else {
				this.cpoint_con = 0;
			}
		}
		if (this.sl_step == 10 || this.sl_step == 11) {
			this.ks_wx = this.maps.wx;
			if (this.ks_wx <= 128) this.ks_wx = 32;
		}
		if (this.scroll_area == 2) {
			this.maps.wx_max = 32;
			this.maps.wy_mini = (this.mapHeight - rounddown((this.gg.di.height - this.maps.wy_mini) / 32)) * 32;
			for (let i3 = 0; i3 <= this.maps.height - 1; i3++)
				this.maps.map_bg[rounddown(this.gg.di.width / 32) + 1][i3] = 21;
		} else if (this.scroll_area == 3) {
			this.maps.wx_max = this.gg.di.width + 32;
			this.maps.wy_mini = (this.mapHeight - rounddown((this.gg.di.height - this.maps.wy_mini) / 32)) * 32;
			for (let k3 = 0; k3 <= this.maps.height - 1; k3++)
				this.maps.map_bg[rounddown((this.gg.di.width * 2) / 32) + 1][k3] = 21;
		} else if (this.scroll_area == 4) {
			this.maps.wx_max = 32;
			this.maps.wy_mini = (this.mapHeight - 10) * 32;
			for (let i4 = 0; i4 <= this.maps.height - 1; i4++)
				this.maps.map_bg[rounddown(this.gg.di.width / 32) + 1][i4] = 21;
		} else if (this.scroll_area == 5) {
			this.maps.wx_max = this.gg.di.width + 32;
			this.maps.wy_mini = (this.mapHeight - 10) * 32;
			for (let k4 = 0; k4 <= this.maps.height - 1; k4++)
				this.maps.map_bg[rounddown((this.gg.di.width * 2) / 32) + 1][k4] = 21;
		}
		if (this.j_tokugi == 15) {
			if (this.scroll_area >= 2 && this.scroll_area <= 5)
				for (let l4 = 1; l4 < this.maps.width; l4++) this.maps.map_bg[l4][19] = 21;
			else for (let i5 = 1; i5 < this.maps.width; i5++) this.maps.map_bg[i5][40] = 21;
		}
		if (this.gg.layer_mode == 2 || this.mcs_haikei_visible == 1)
			this.maps.drawMapLayer(this.maps.wx, this.maps.wy, this.g_ac2, this.gazou_scroll, 1);
		else this.maps.drawMap(this.maps.wx, this.maps.wy);
		this.gs.rsInit();
		if (this.clear_type == 2 || this.clear_type == 3) {
			const l5 = this.coin_kazu;
			this.getCoinTotal();
			if (l5 > 0 && this.coin_kazu == 0) {
				this.gs.rsAddSound(7);
				if (this.clear_type == 3) this.showHashigo();
			}
		}
		label0: for (let j6 = 10; j6 <= this.mapHeight + 9; j6++) {
			// 重力無視の追跡ピカチー等の復活地点を設定
			let i6 = 1;
			do {
				if (i6 > this.mapWidth) continue label0;
				if (this.maps.map_bg[i6][j6] == 28) {
					this.mhouse_c = 100;
					this.mhouse_x = i6;
					this.mhouse_y = j6;
					continue label0;
				}
				i6++;
			} while (true);
		}

		this.js_mes = 1;
	}

	/**
	 * ステージデータを読みとり、マップを生成します
	 * @param i ステージ番号 i-100がステージ番号(1スタート)となる
	 */
	mapsMakeStageData(
		i: number // 新形式マップの処理
	) {
		var i3;
		var as;
		var as1;
		var c2;
		var s8;
		var s9;
		s8 = "0123456789abcdef";
		s9 = "0123456789ABCDEF";

		var advance_map = this.tdb.options["advanced-map"];
		var stage = null;
		var mainLayer: MainLayer | undefined = undefined;
		var mapchipLayer: MapchipLayer | undefined = undefined;
		var customParts = null;

		if (advance_map) {
			// 現在のステージのサイズを取得
			stage = advance_map.stages[i - 101];
			this.mapWidth = stage.size.x;
			this.mapHeight = stage.size.y;
			// レイヤー定義の中からメインレイヤーと背景レイヤーを抽出
			for (const layer of stage.layers) {
				if (layer.type === "main") {
					mainLayer = layer;
				} else if (layer.type === "mapchip") {
					mapchipLayer = layer;
				}
			}
			// カスタムチップの定義を解析
			if (advance_map.customParts != null) {
				this.customParts = this.readCustomParts(advance_map.customParts);
			}
		} else {
			this.mapWidth = 180;
			this.mapHeight = 30;
		}

		this.maps = new MapSystem(this.mapWidth + 20, this.mapHeight + 70, this.gg, this);
		this.maps.init();
		this.map_data_option = createNDimensionArray(this.mapWidth + 20, this.mapHeight + 70);
		for (var l1 = 0; l1 < this.mapHeight + 70; l1++) {
			for (var k = 0; k < this.mapWidth + 20; k++) this.map_data_option[k][l1] = false;
		}

		as = this.maps.map_string;
		as1 = this.maps.map_string_layer;
		this.maps.wx = 32;
		this.maps.wy = 32;
		this.maps.wx_mini = 32;
		this.maps.wy_mini = 320;
		this.maps.wx_max = (this.mapWidth - rounddown((this.gg.di.width - this.maps.wx_mini) / 32)) * 32;
		this.maps.wy_max = (this.mapHeight - rounddown((this.gg.di.height - this.maps.wy_mini) / 32)) * 32;

		if (this.gg.system_screen_size === 1) {
			if ((this.scroll_area >= 2 && this.scroll_area <= 5) || this.j_tokugi == 14 || this.j_tokugi == 15) {
				this.maps.my_wx_mini = 212;
				this.maps.my_wx_max = this.gg.di.width - this.maps.my_wx_mini - 32;
				this.maps.my_wy_mini = 148;
			} else {
				this.maps.my_wx_mini = 132;
				this.maps.my_wx_max = 252;
				if (this.view_move_type === 2) {
					const tmp = this.maps.my_wx_mini;
					this.maps.my_wx_mini = this.maps.my_wx_max + 32;
					this.maps.my_wx_max = this.gg.di.width - tmp - 32;
				}
				this.maps.my_wy_mini = 116;
			}
			this.maps.my_wy_max = 300; // 480 - 148 - 32
		} else if (this.gg.system_screen_size === 2) {
			if ((this.scroll_area >= 2 && this.scroll_area <= 5) || this.j_tokugi == 14 || this.j_tokugi == 15) {
				this.maps.my_wx_mini = 176;
				this.maps.my_wx_max = this.gg.di.width - this.maps.my_wx_mini - 32;
				this.maps.my_wy_mini = 112;
			} else {
				this.maps.my_wx_mini = 96;
				this.maps.my_wx_max = 224;
				if (this.view_move_type === 2) {
					const tmp = this.maps.my_wx_mini; // 96
					this.maps.my_wx_mini = this.maps.my_wx_max + 32; // 256
					this.maps.my_wx_max = this.gg.di.width - tmp - 32; // 384
				}
				this.maps.my_wy_mini = 78;
			}
			this.maps.my_wy_max = 176; // 320 - 112 - 32
		}
		c2 = this.mapWidth + 19;
		this.gg.setBackcolor(Color.blue);

		if (!advance_map) {
			switch (i) {
				default:
					break;

				case 101:
					for (let i2 = 0; i2 < this.mapHeight; i2++) {
						let s = `.${this.tdb.getValue(`map0-${i2}`)}`;
						s += this.tdb.getValue(`map1-${i2}`);
						s += this.tdb.getValue(`map2-${i2}`);
						as[i2 + 10] = s;
						if (this.gg.layer_mode == 2) {
							let s1 = `00${this.tdb.getValue(`layer0-${i2}`)}`;
							s1 += this.tdb.getValue(`layer1-${i2}`);
							s1 += this.tdb.getValue(`layer2-${i2}`);
							as1[i2 + 10] = s1;
						}
					}
					break;

				case 102:
					for (let i2 = 0; i2 < this.mapHeight; i2++) {
						let s = `.${this.tdb.getValue(`map0-${i2}-s`)}`;
						s += this.tdb.getValue(`map1-${i2}-s`);
						s += this.tdb.getValue(`map2-${i2}-s`);
						as[i2 + 10] = s;
						if (this.gg.layer_mode == 2) {
							let s1 = `00${this.tdb.getValue(`layer0-${i2}-s`)}`;
							s1 += this.tdb.getValue(`layer1-${i2}-s`);
							s1 += this.tdb.getValue(`layer2-${i2}-s`);
							as1[i2 + 10] = s1;
						}
					}
					break;

				case 103:
					for (let i2 = 0; i2 < this.mapHeight; i2++) {
						let s = `.${this.tdb.getValue(`map0-${i2}-t`)}`;
						s += this.tdb.getValue(`map1-${i2}-t`);
						s += this.tdb.getValue(`map2-${i2}-t`);
						as[i2 + 10] = s;
						if (this.gg.layer_mode == 2) {
							let s1 = `00${this.tdb.getValue(`layer0-${i2}-t`)}`;
							s1 += this.tdb.getValue(`layer1-${i2}-t`);
							s1 += this.tdb.getValue(`layer2-${i2}-t`);
							as1[i2 + 10] = s1;
						}
					}
					break;

				case 104:
					for (let i2 = 0; i2 < this.mapHeight; i2++) {
						let s = `.${this.tdb.getValue(`map0-${i2}-f`)}`;
						s += this.tdb.getValue(`map1-${i2}-f`);
						s += this.tdb.getValue(`map2-${i2}-f`);
						as[i2 + 10] = s;
						if (this.gg.layer_mode == 2) {
							let s1 = `00${this.tdb.getValue(`layer0-${i2}-f`)}`;
							s1 += this.tdb.getValue(`layer1-${i2}-f`);
							s1 += this.tdb.getValue(`layer2-${i2}-f`);
							as1[i2 + 10] = s1;
						}
					}
					break;
			}
		}
		this.maps.setBank(0);
		if (i == 101) this.gg.setBackcolor(this.gamecolor_back);
		else if (i == 102) this.gg.setBackcolor(this.gamecolor_back_s);
		else if (i == 103) this.gg.setBackcolor(this.gamecolor_back_t);
		else if (i == 104) this.gg.setBackcolor(this.gamecolor_back_f);
		var tmp1866_1864;
		var tmp1866_1862;
		var tmp1937_1935;
		var tmp1937_1933;
		for (i3 = 0; i3 < this.maps.height; i3++) {
			if (as[i3].length < this.maps.width) {
				var n = as[i3].length;
				for (k = n; k < this.maps.width; k++) {
					tmp1866_1864 = i3;
					tmp1866_1862 = as;
					tmp1866_1862[tmp1866_1864] = tmp1866_1862[tmp1866_1864] + ".";
				}
				if (this.gg.layer_mode == 2) {
					n = as1[i3].length;
					for (k = n; k < this.maps.width * 2; k++) {
						tmp1937_1935 = i3;
						tmp1937_1933 = as1;
						tmp1937_1933[tmp1937_1935] = tmp1937_1933[tmp1937_1935] + "0";
					}
				}
			}
		}
		if (this.gg.layer_mode == 2) {
			for (var j3 = 0; j3 < this.maps.height; j3++) {
				for (var i1 = 0; i1 < this.maps.width; i1++) {
					var word0 = 0;
					if (mapchipLayer) {
						word0 = mapchipLayer.map[j3 - 10] ? mapchipLayer.map[j3 - 10][i1 - 1] : 0;
					} else {
						var c = as1[j3].charAt(i1 * 2);
						if (c == ".") continue;
						var j = 0;
						do {
							if (j > 15) break;
							if (c == s8.charAt(j)) {
								word0 = Math.floor(j * 16);
								break;
							}
							if (c == s9.charAt(j)) {
								word0 = Math.floor(j * 16);
								break;
							}
							j++;
						} while (true);
						c = as1[j3].charAt(i1 * 2 + 1);
						j = 0;
						do {
							if (j > 15) break;
							if (c == s8.charAt(j)) {
								word0 += j;
								break;
							}
							if (c == s9.charAt(j)) {
								word0 += j;
								break;
							}
							j++;
						} while (true);
					}
					this.maps.map_bg_layer[i1][j3] = word0;
				}
			}
		}
		for (var k3 = 0; k3 < this.maps.height; k3++) {
			for (var j1 = 0; j1 < this.maps.width; j1++) {
				var c1 = 0;
				if (mainLayer) {
					try {
						c1 = mainLayer.map[k3 - 10][j1 - 1] as number; // TODO: 文字列によるカスタムパーツへの対応
						if (!c1) {
							c1 = 0;
						}
					} catch (ex) {}
				} else {
					c1 = as[k3].charCodeAt(j1);
				}
				var word1 = this.setChipValue(j1, k3, c1);
				if (word1 >= 0) this.maps.map_bg[j1][k3] = word1;
			}
		}

		for (var k1 = 0; k1 <= this.maps.width - 1; k1++) {
			this.maps.map_bg[k1][0] = 21;
			this.maps.map_bg[k1][this.maps.height - 1] = 21;
		}

		for (var l3 = 0; l3 <= this.maps.height - 1; l3++) {
			this.maps.map_bg[0][l3] = 21;
			this.maps.map_bg[this.mapWidth + 1][l3] = 21;
			this.maps.map_bg[c2][l3] = 21;
		}

		this.ochiru_y = this.maps.wy_max + this.gg.di.height;
		this.maps.wx = this.co_j.x - (this.view_move_type === 2 ? this.maps.my_wx_max : this.maps.my_wx_mini);
		this.maps.wy = this.co_j.y - this.maps.my_wy_max;
		if (this.maps.wx < this.maps.wx_mini) this.maps.wx = this.maps.wx_mini;
		else if (this.maps.wx > this.maps.wx_max) this.maps.wx = this.maps.wx_max;
		if (this.maps.wy < this.maps.wy_mini) this.maps.wy = this.maps.wy_mini;
		else if (this.maps.wy > this.maps.wy_max) this.maps.wy = this.maps.wy_max;
		this.co_j.wx = this.co_j.x - this.maps.wx;
		this.co_j.wy = this.co_j.y - this.maps.wy;
		return;
	}

	/**
	 * 第3版マップデータのカスタムチップ定義を解析
	 * @private
	 */
	readCustomParts(customParts: Required<Required<Option>["advanced-map"]>["customParts"]) {
		// 依存される側が上に来ている場合に速いアルゴリズム
		var result = {} as {
			[key: string]: Parts;
		};
		var pending = Object.keys(customParts);
		var pending2;
		while (pending.length > 0) {
			var flag = false;
			pending2 = [];
			for (var i = 0; i < pending.length; i++) {
				var key = pending[i];
				var obj = customParts[key];
				if ("number" === typeof obj.extends) {
					// ネイティブパーツを拡張している
					var native =
						5000 <= obj.extends && obj.extends < 10000
							? // 敵コードの場合
							  EnemyController.available[(obj.extends - 5000) as NativePartsKey]
							: null;
					if (!native) {
						// 拡張不可能
						console.warn("パーツコード" + obj.extends + "は拡張できません");
						continue;
					}
					// 拡張可能なネイティブパーツ
					result[key] = {
						properties: Object.assign({}, native.properties, obj.properties),
						native: native,
						nativeCode: obj.extends,
					};
				} else if (obj.extends in result) {
					// 継承可能なのでコピー
					result[key] = {
						properties: Object.assign({}, result[obj.extends].properties, obj.properties),
						native: result[obj.extends].native,
						nativeCode: result[obj.extends].nativeCode,
					};
				} else {
					// 継承元がまだ見つからない
					pending2.push(key);
					continue;
				}
				// 新しい定義が追加できた
				flag = true;
			}
			// 次のループへ
			pending = pending2;
			if (!flag) {
				// 何も更新されていない
				break;
			}
		}
		if (pending.length > 0) {
			// 解決されなかった関係がある
			pending.forEach(function (key) {
				console.warn("カスタムパーツコード" + key + "を解決できませんでした");
			});
		}
		return result;
	}

	/**
	 * マップ上に仕掛けを配置します 詳細は {@link https://github.com/Ryo-9399/mc_canvas/wiki/メソッド-MainProgram.prototype.setAthleticOnMap} 参照
	 * @param type {number} 配置する仕掛けの種類
	 * @param blockX {number} 配置先のブロックX座標
	 * @param blockY {number} 配置先のブロックY座標
	 * @returns {number}
	 * @see {@link https://github.com/Ryo-9399/mc_canvas/wiki/メソッド-MainProgram.prototype.setAthleticOnMap}
	 */
	setAthleticOnMap(i: number, j: number, k: number) {
		let word0 = -1;
		if (this.maps.map_bg[j - 1][k] == 4) word0 = 4;
		if (i == 2) this.aSet(j * 32, k * 32, 500, j * 32);
		else if (i == 3) this.aSet(j * 32, k * 32, 510, j * 32);
		else if (i == 4) this.aSet(j * 32, k * 32, 120, j * 32);
		else if (i == 5) this.aSet(j * 32, k * 32, 121, j * 32);
		else if (i == 6) this.aSet(j * 32, k * 32, 600, j * 32);
		else if (i == 7) this.aSet(j * 32, k * 32, 700, j * 32);
		else if (i == 8) this.aSet(j * 32 - 32, k * 32, 410, j * 32);
		else if (i == 9) this.aSet(j * 32 - 32, k * 32, 420, j * 32);
		else if (i == 10) this.aSet(j * 32 - 32, k * 32, 430, j * 32);
		else if (i == 11) this.aSet(j * 32 - 32, k * 32, 440, j * 32);
		else if (i == 12) this.aSet(j * 32 - 32, k * 32, 450, j * 32);
		else if (i == 13) this.aSet(j * 32 - 32, k * 32, 460, j * 32);
		else if (i == 14) this.aSet(j * 32 - 32, k * 32, 470, j * 32);
		else if (i == 15) this.aSet(j * 32 - 32, k * 32, 480, j * 32);
		else if (i == 16) this.aSet(j * 32 - 32, k * 32, 481, j * 32);
		else if (i == 17) this.aSet(j * 32 - 32, k * 32, 482, j * 32);
		else if (i == 18) {
			this.aSet(j * 32 + 16, k * 32 + 16, 72, j * 32);
			this.aSet(j * 32 + 16, k * 32 + 16, 73, j * 32);
			word0 = 50;
		} else if (i == 19) {
			this.aSet(j * 32 + 16, k * 32 + 16, 72, j * 32);
			this.aSet(j * 32 + 16, k * 32 + 16, 74, j * 32);
			this.aSet(j * 32 + 16, k * 32 + 16, 76, j * 32);
			word0 = 50;
		} else if (i == 20) {
			this.aSet(j * 32 + 16, k * 32 + 16, 73, j * 32);
			this.aSet(j * 32 + 16, k * 32 + 16, 75, j * 32);
			this.aSet(j * 32 + 16, k * 32 + 16, 77, j * 32);
			word0 = 50;
		} else if (i == 21) this.aSet(j * 32, k * 32, 85, j * 32);
		else if (i == 22) {
			word0 = 40;
			this.hSet(j, k, 2000);
		} else if (i == 23) {
			word0 = 40;
			this.hSet(j, k, 2100);
		} else if (i == 24) {
			word0 = 40;
			this.hSet(j, k, 2200);
		} else if (i == 25) this.aSet(j * 32, k * 32, 90, j * 32);
		else if (i == 26) this.aSet(j * 32, k * 32, 91, j * 32);
		else if (i == 27) this.aSet(j * 32, k * 32, 92, j * 32);
		else if (i == 28) {
			this.aSet(j * 32, k * 32, 93, j * 32);
			word0 = 50;
		} else if (i == 29) {
			this.aSet(j * 32, k * 32, 93, j * 32);
			this.aSet(j * 32, k * 32, 94, j * 32);
			word0 = 50;
		} else if (i == 30) {
			this.aSet(j * 32, k * 32, 95, j * 32);
			word0 = 50;
		} else if (i == 31) {
			this.aSet(j * 32, k * 32, 96, j * 32);
			word0 = 50;
		} else if (i == 32) {
			this.aSet(j * 32 + 16, k * 32 + 16, 78, j * 32);
			word0 = 50;
		} else if (i == 33) {
			this.aSet(j * 32 + 16, k * 32 + 16, 79, j * 32);
			word0 = 50;
		} else if (i == 34) {
			word0 = 40;
			this.hSet(j, k, 2300);
		} else if (i == 35) {
			word0 = 40;
			this.hSet(j, k, 2400);
		} else if (i == 36) {
			word0 = 40;
			this.hSet(j, k, 2500);
		} else if (i == 37) {
			word0 = 40;
			this.hSet(j, k, 2600);
		} else if (i == 38) {
			word0 = 40;
			this.hSet(j, k, 2700);
		} else if (i == 39) {
			word0 = 40;
			this.hSet(j, k, 2800);
		} else if (i == 40) {
			word0 = 40;
			this.hSet(j, k, 2900);
		} else if (i == 41) {
			word0 = 40;
			this.hSet(j, k, 3000);
		} else if (i == 42) {
			word0 = 40;
			this.hSet(j, k, 3100);
		} else if (i == 43) {
			word0 = 40;
			this.hSet(j, k, 3200);
		} else if (i == 44) this.aSet(j * 32, k * 32, 86, j * 32);
		else if (i == 45) this.aSet(j * 32, k * 32, 87, j * 32);
		else if (i == 46) this.aSet(j * 32, k * 32, 88, j * 32);
		else if (i == 47) this.aSet(j * 32, k * 32 + 32, 1000, j * 32);
		else if (i == 48) this.aSet(j * 32, k * 32, 1001, j * 32);
		else if (i == 49) this.aSet(j * 32 + 32, k * 32, 1002, j * 32);
		else if (i == 50) this.aSet(j * 32, k * 32, 1003, j * 32);
		else if (i == 51) this.aSet(j * 32, k * 32, 1010, j * 32);
		else if (i == 52) this.aSet(j * 32, k * 32, 1020, j * 32);
		else if (i == 53) this.aSet(j * 32 - 32, k * 32, 485, j * 32);
		else if (i == 54) this.aSet(j * 32 - 32, k * 32, 486, j * 32);
		else if (i == 55) this.aSet(j * 32 - 32, k * 32, 487, j * 32);
		else if (i == 56) {
			this.aSet(j * 32, k * 32, 1100, j * 32);
			word0 = 26;
		} else if (i == 57) {
			this.aSet(j * 32, k * 32, 1150, j * 32);
			word0 = 26;
		} else if (i == 58) this.aSet(j * 32, k * 32 + 32, 1200, j * 32);
		else if (i == 59) {
			this.aSet(j * 32, k * 32 + 32, 1200, j * 32);
			this.aSet(j * 32, k * 32 + 32, 1201, j * 32);
		} else if (i == 60) {
			this.aSet(j * 32, k * 32, 1300, j * 32);
			word0 = 50;
		} else if (i == 61) {
			this.aSet(j * 32, k * 32, 1300, j * 32);
			this.aSet(j * 32, k * 32, 1301, j * 32);
			word0 = 50;
		} else if (i == 62) this.aSet(j * 32, k * 32, 610, j * 32);
		else if (i == 63) this.aSet(j * 32, k * 32 + 32, 1005, j * 32);
		else if (i == 64) this.aSet(j * 32, k * 32, 1006, j * 32);
		else if (i == 65) this.aSet(j * 32 + 32, k * 32, 1007, j * 32);
		else if (i == 66) this.aSet(j * 32, k * 32, 1008, j * 32);
		else if (i == 67) {
			word0 = 212;
			this.aSet(j * 32, k * 32, 1400, j * 32);
		} else if (i == 68) {
			word0 = 213;
			this.aSet(j * 32, k * 32, 1401, j * 32);
		} else if (i == 69) {
			word0 = 214;
			this.aSet(j * 32, k * 32, 1402, j * 32);
		} else if (i == 70) {
			word0 = 215;
			this.aSet(j * 32, k * 32, 1403, j * 32);
		} else if (i == 71) this.aSet(j * 32, k * 32, 1500, j * 32);
		else if (i == 72) this.aSet(j * 32, k * 32, 1501, j * 32);
		else if (i == 73) this.aSet(j * 32, k * 32, 1502, j * 32);
		else if (i == 74) this.aSet(j * 32, k * 32, 1503, j * 32);
		else if (i == 75) this.aSet(j * 32, k * 32, 1504, j * 32);
		else if (i == 76) this.aSet(j * 32, k * 32, 701, j * 32);
		else if (i == 77) this.aSet(j * 32, k * 32, 750, j * 32);
		else if (i == 78) this.aSet(j * 32, k * 32, 751, j * 32);
		else if (i == 79) this.aSet(j * 32, k * 32, 1600, j * 32);
		else if (i == 80) this.aSet(j * 32, k * 32, 1601, j * 32);
		else if (i == 81) this.aSet(j * 32, k * 32, 1602, j * 32);
		else if (i == 82) this.aSet(j * 32, k * 32, 1603, j * 32);
		else if (i == 83) this.mSet(j * 32, k * 32, 2185);
		else if (i == 84) this.aSet(j * 32, k * 32, 1700, j * 32);
		else if (i == 85) this.aSet(j * 32, k * 32, 1701, j * 32);
		else if (i == 86) this.aSet(j * 32, k * 32, 1702, j * 32);
		else if (i == 87) {
			word0 = 40;
			this.hSet(j, k, 3300);
		} else if (i == 88) {
			word0 = 40;
			this.hSet(j, k, 3400);
		} else if (i == 89) {
			word0 = 40;
			this.hSet(j, k, 3500);
		} else if (i == 90) this.aSet(j * 32, k * 32, 89, j * 32);
		else if (i == 91) {
			word0 = 40;
			this.hSet(j, k, 3600);
		} else if (i == 92) {
			word0 = 40;
			this.hSet(j, k, 3700);
		} else if (i == 93) {
			word0 = 40;
			this.hSet(j, k, 3800);
		} else if (i == 94) {
			word0 = 40;
			this.hSet(j, k, 3900);
		} else if (i == 95) {
			word0 = 40;
			this.hSet(j, k, 4000);
		} else if (i == 96) this.aSet(j * 32, k * 32, 1800, j * 32);
		else if (i == 97) this.aSet(j * 32, k * 32, 1801, j * 32);
		else if (i == 98) this.aSet(j * 32, k * 32, 1850, j * 32);
		else if (i == 99) this.aSet(j * 32, k * 32, 1851, j * 32);
		else if (i == 100) {
			this.aSet(j * 32, k * 32, 1900, j * 32);
			var word1 = this.maps.map_bg[j - 1][k];
			if (word1 >= 20 && word1 <= 29) word0 = word1;
		} else if (i == 101) {
			this.aSet(j * 32, k * 32, 1901, j * 32);
			var word2 = this.maps.map_bg[j - 1][k];
			if (word2 >= 20 && word2 <= 29) word0 = word2;
		} else if (i == 102) {
			this.aSet(j * 32, k * 32, 1902, j * 32);
			var word3 = this.maps.map_bg[j - 1][k];
			if (word3 >= 20 && word3 <= 29) word0 = word3;
		} else if (i == 103) {
			this.aSet(j * 32, k * 32, 1903, j * 32);
			var word4 = this.maps.map_bg[j - 1][k];
			if (word4 >= 20 && word4 <= 29) word0 = word4;
		} else if (i == 104) {
			this.aSet(j * 32, k * 32, 1904, j * 32);
			var word5 = this.maps.map_bg[j - 1][k];
			if (word5 >= 20 && word5 <= 29) word0 = word5;
		} else if (i == 105) {
			this.aSet(j * 32, k * 32, 1905, j * 32);
			var word6 = this.maps.map_bg[j - 1][k];
			if (word6 >= 20 && word6 <= 29) word0 = word6;
		} else if (i == 106) {
			this.aSet(j * 32, k * 32, 1906, j * 32);
			var word7 = this.maps.map_bg[j - 1][k];
			if (word7 >= 20 && word7 <= 29) word0 = word7;
		} else if (i == 107) {
			this.aSet(j * 32, k * 32, 1907, j * 32);
			var word8 = this.maps.map_bg[j - 1][k];
			if (word8 >= 20 && word8 <= 29) word0 = word8;
		} else if (i == 108) {
			this.aSet(j * 32, k * 32, 1908, j * 32);
			var word9 = this.maps.map_bg[j - 1][k];
			if (word9 >= 20 && word9 <= 29) word0 = word9;
		} else if (i == 109) {
			this.aSet(j * 32, k * 32, 1909, j * 32);
			var word10 = this.maps.map_bg[j - 1][k];
			if (word10 >= 20 && word10 <= 29) word0 = word10;
		} else if (i == 110) {
			this.aSet(j * 32, k * 32, 1910, j * 32);
			var word11 = this.maps.map_bg[j - 1][k];
			if (word11 >= 20 && word11 <= 29) word0 = word11;
		} else if (i == 111) {
			this.aSet(j * 32, k * 32, 1911, j * 32);
			var word12 = this.maps.map_bg[j - 1][k];
			if (word12 >= 20 && word12 <= 29) word0 = word12;
		} else if (i == 112) this.aSet(j * 32, k * 32, 1912, j * 32);
		else if (i == 113) this.aSet(j * 32, k * 32, 1913, j * 32);
		else if (i == 114) this.aSet(j * 32, k * 32, 1914, j * 32);
		else if (i == 115) {
			this.aSet(j * 32, k * 32, 1915, j * 32);
			var word13 = this.maps.map_bg[j - 1][k];
			if (word13 >= 20 && word13 <= 29) word0 = word13;
		} else if (i == 116) {
			this.aSet(j * 32, k * 32, 1916, j * 32);
			var word14 = this.maps.map_bg[j - 1][k];
			if (word14 >= 20 && word14 <= 29) word0 = word14;
		} else if (i == 117) {
			this.aSet(j * 32, k * 32, 1917, j * 32);
			var word15 = this.maps.map_bg[j - 1][k];
			if (word15 >= 20 && word15 <= 29) word0 = word15;
		} else if (i == 118) {
			this.aSet(j * 32, k * 32, 1918, j * 32);
			var word16 = this.maps.map_bg[j - 1][k];
			if (word16 >= 20 && word16 <= 29) word0 = word16;
		} else if (i == 119) this.aSet(j * 32, k * 32, 2000, j * 32);
		else if (i == 120) this.aSet(j * 32, k * 32, 2001, j * 32);
		else if (i == 121) this.aSet(j * 32, k * 32, 2002, j * 32);
		else if (i == 122) this.aSet(j * 32, k * 32, 2003, j * 32);
		else if (i == 123) this.aSet(j * 32, k * 32, 2010, j * 32);
		else if (i == 124) this.aSet(j * 32, k * 32, 2011, j * 32);
		else if (i == 125) this.aSet(j * 32, k * 32, 2020, j * 32);
		else if (i == 126) this.aSet(j * 32, k * 32, 2021, j * 32);
		else if (i == 127) {
			this.aSet(j * 32, k * 32 + 8, 72, j * 32);
			this.aSet(j * 32, k * 32 + 8, 74, j * 32);
			this.aSet(j * 32, k * 32 + 8, 76, j * 32);
			this.aSet(j * 32, k * 32, 2100, j * 32);
		} else if (i == 128) {
			this.aSet(j * 32, k * 32 + 8, 73, j * 32);
			this.aSet(j * 32, k * 32 + 8, 75, j * 32);
			this.aSet(j * 32, k * 32 + 8, 77, j * 32);
			this.aSet(j * 32, k * 32, 2100, j * 32);
		} else if (i == 129) {
			this.aSet(j * 32, k * 32 + 8, 2110, j * 32);
			this.aSet(j * 32, k * 32 + 8, 2111, j * 32);
			this.aSet(j * 32, k * 32 + 8, 2112, j * 32);
			this.aSet(j * 32, k * 32 + 8, 2113, j * 32);
			this.aSet(j * 32, k * 32 + 8, 2114, j * 32);
			this.aSet(j * 32, k * 32, 2100, j * 32);
		} else if (i == 130) {
			this.aSet(j * 32, k * 32 + 8, 2120, j * 32);
			this.aSet(j * 32, k * 32 + 8, 2121, j * 32);
			this.aSet(j * 32, k * 32 + 8, 2122, j * 32);
			this.aSet(j * 32, k * 32 + 8, 2123, j * 32);
			this.aSet(j * 32, k * 32 + 8, 2124, j * 32);
			this.aSet(j * 32, k * 32, 2100, j * 32);
		} else if (i == 131) {
			this.aSet(j * 32 + 160, k * 32 + 160, 2200, j * 32);
			this.aSet(j * 32 + 160, k * 32 + 160, 2201, j * 32);
			this.aSet(j * 32 + 160, k * 32 + 160, 2202, j * 32);
		} else if (i == 132) {
			this.aSet(j * 32 + 160, k * 32 + 160, 2210, j * 32);
			this.aSet(j * 32 + 160, k * 32 + 160, 2211, j * 32);
			this.aSet(j * 32 + 160, k * 32 + 160, 2212, j * 32);
		} else if (i == 133) this.aSet(j * 32, k * 32, 2300, j * 32);
		else if (i == 134) this.aSet(j * 32, k * 32, 2301, j * 32);
		else if (i == 135) this.aSet(j * 32, k * 32, 2400, j * 32);
		else if (i == 136) this.aSet(j * 32, k * 32, 2500, j * 32);
		else if (i == 137) this.aSet(j * 32, k * 32, 2510, j * 32);
		else if (i == 138) this.aSet(j * 32, k * 32, 2600, j * 32);
		else if (i == 139) this.aSet(j * 32, k * 32, 2610, j * 32);
		else if (i == 140) this.aSet(j * 32, k * 32, 2700, j * 32);
		else if (i == 141) this.aSet(j * 32, k * 32, 2701, j * 32);
		else if (i == 142) {
			this.aSet(j * 32 + 160, k * 32 + 160, 2250, j * 32);
			this.aSet(j * 32 + 160, k * 32 + 160, 2251, j * 32);
		} else if (i == 143) {
			this.aSet(j * 32 + 160, k * 32 + 160, 2260, j * 32);
			this.aSet(j * 32 + 160, k * 32 + 160, 2261, j * 32);
		} else if (i == 144) {
			this.aSet(j * 32 + 160, k * 32 + 160, 2252, j * 32);
			this.aSet(j * 32 + 160, k * 32 + 160, 2253, j * 32);
		} else if (i == 145) {
			this.aSet(j * 32 + 160, k * 32 + 160, 2262, j * 32);
			this.aSet(j * 32 + 160, k * 32 + 160, 2263, j * 32);
		} else if (i == 146) this.aSet(j * 32 - 32, k * 32, 489, j * 32);
		else if (i == 147) this.aSet(j * 32 - 32, k * 32, 488, j * 32);
		else if (i == 148) this.aSet(j * 32 - 32, k * 32, 490, j * 32);
		else if (i == 149) this.aSet(j * 32 - 32, k * 32, 491, j * 32);
		else if (i == 150) this.aSet(j * 32 - 32, k * 32, 492, j * 32);
		else if (i == 151) {
			this.aSet(j * 32, k * 32, 2800, j * 32);
			word0 = 50;
		} else if (i == 152) {
			this.aSet(j * 32, k * 32, 2801, j * 32);
			word0 = 50;
		} else if (i == 153) {
			this.aSet(j * 32, k * 32, 2802, j * 32);
			word0 = 50;
		} else if (i == 154) {
			this.aSet(j * 32, k * 32, 2803, j * 32);
			word0 = 50;
		} else if (i == 155) this.aSet(j * 32, k * 32, 2900, j * 32);
		else if (i == 156) this.aSet(j * 32, k * 32, 2950, j * 32);
		else if (i == 157) this.aSet(j * 32 - 32, k * 32, 3000, j * 32 - 32);
		else if (i == 158) this.aSet(j * 32 - 32, k * 32, 3010, j * 32 - 32);
		else if (i == 159) this.aSet(j * 32, k * 32, 3100, j * 32);
		else if (i == 160) this.aSet(j * 32, k * 32, 3110, j * 32);
		else if (i == 161) this.aSet(j * 32, k * 32, 3120, j * 32);
		else if (i == 162) this.aSet(j * 32, k * 32, 3130, j * 32);
		else if (i == 163) this.aSet(j * 32, k * 32, 3101, j * 32);
		else if (i == 164) this.aSet(j * 32, k * 32, 3111, j * 32);
		else if (i == 165) this.aSet(j * 32, k * 32, 3121, j * 32);
		else if (i == 166) this.aSet(j * 32, k * 32, 3131, j * 32);
		else if (i == 167) {
			this.aSet(j * 32, k * 32, 3200, j * 32);
			word0 = 50;
		} else if (i == 168) {
			this.aSet(j * 32, k * 32, 3201, j * 32);
			word0 = 50;
		} else if (i == 169) {
			this.aSet(j * 32, k * 32, 3202, j * 32);
			word0 = 50;
		} else if (i == 170) {
			this.aSet(j * 32, k * 32, 3203, j * 32);
			word0 = 50;
		} else if (i == 171) this.aSet(j * 32, k * 32, 3300, j * 32);
		else if (i == 172) this.aSet(j * 32, k * 32, 3301, j * 32);
		else if (i == 173) this.aSet(j * 32, k * 32, 350, j * 32);
		else if (i == 174) this.aSet(j * 32, k * 32, 351, j * 32);
		else if (i == 175) this.aSet(j * 32, k * 32, 352, j * 32);
		else if (i == 176) this.aSet(j * 32, k * 32, 353, j * 32);
		else if (i == 177) this.aSet(j * 32, k * 32, 360, j * 32);
		else if (i == 178) this.aSet(j * 32, k * 32, 361, j * 32);
		else if (i == 179) this.aSet(j * 32, k * 32, 362, j * 32);
		else if (i == 180) this.aSet(j * 32, k * 32, 363, j * 32);
		else if (i == 181) this.aSet(j * 32, k * 32, 3400, j * 32);
		else if (i == 182) {
			word0 = 40;
			this.hSet(j, k, 4100);
		} else if (i == 183) this.aSet(j * 32, k * 32, 370, j * 32);
		else if (i == 184) this.aSet(j * 32, k * 32, 371, j * 32);
		else if (i == 185) this.aSet(j * 32, k * 32, 372, j * 32);
		else if (i == 186) this.aSet(j * 32, k * 32, 373, j * 32);
		else if (i == 187) this.aSet(j * 32, k * 32, 380, j * 32);
		else if (i == 188) this.aSet(j * 32, k * 32, 381, j * 32);
		else if (i == 189) this.aSet(j * 32, k * 32, 382, j * 32);
		else if (i == 190) this.aSet(j * 32, k * 32, 383, j * 32);
		else if (i == 191) this.aSet(j * 32, k * 32, 3500, j * 32);
		else if (i == 192) this.aSet(j * 32, k * 32, 3600, j * 32);
		else if (i == 193) this.aSet(j * 32, k * 32, 3700, j * 32);
		else if (i == 194) this.aSet(j * 32, k * 32, 3710, j * 32);
		else if (i == 195) this.aSet(j * 32, k * 32, 3800, j * 32);
		else if (i == 196) this.aSet(j * 32, k * 32, 3810, j * 32);
		else if (i == 197) this.aSet(j * 32, k * 32, 3900, j * 32);
		else if (i == 198) this.aSet(j * 32, k * 32, 3910, j * 32);
		else if (i == 199) this.aSet(j * 32, k * 32, 4000, j * 32);
		else if (i == 200) this.aSet(j * 32, k * 32, 4010, j * 32);
		else if (i == 201) this.aSet(j * 32, k * 32, 4100, j * 32);
		else if (i == 202) this.aSet(j * 32, k * 32, 4110, j * 32);
		else if (i == 203) this.aSet(j * 32, k * 32, 4200, j * 32);
		else if (i == 204) this.aSet(j * 32, k * 32, 4210, j * 32);
		else if (i == 205) this.aSet(j * 32, k * 32, 150, j * 32);
		else if (i == 206) this.aSet(j * 32, k * 32, 151, j * 32);
		else if (i == 207) this.aSet(j * 32, k * 32, 160, j * 32);
		else if (i == 208) this.aSet(j * 32, k * 32, 161, j * 32);
		else if (i == 209) this.aSet(j * 32, k * 32, 152, j * 32);
		else if (i == 210) this.aSet(j * 32, k * 32, 162, j * 32);
		else if (i == 211) this.aSet(j * 32, k * 32, 3501, j * 32);
		else if (i == 212) this.aSet(j * 32, k * 32, 3601, j * 32);
		else if (i == 213) {
			word0 = 40;
			this.hSet(j, k, 4200);
		} else if (i == 214) {
			word0 = 40;
			this.hSet(j, k, 4300);
		} else if (i == 215) {
			word0 = 40;
			this.hSet(j, k, 4400);
		} else if (i == 216) {
			word0 = 40;
			this.hSet(j, k, 4500);
		} else if (i == 217) this.aSet(j * 32, k * 32, 3502, j * 32);
		else if (i == 218) this.aSet(j * 32, k * 32, 3602, j * 32);
		else if (i == 219) {
			this.aSet(j * 32 + 16, k * 32 + 16, 4300, j * 32);
			word0 = 50;
		} else if (i == 220) {
			this.aSet(j * 32 + 16, k * 32 + 16, 4301, j * 32);
			word0 = 50;
		} else if (i == 221) {
			this.aSet(j * 32 + 16, k * 32 + 16, 4302, j * 32);
			word0 = 50;
		} else if (i == 222) {
			this.aSet(j * 32 + 16, k * 32 + 16, 4303, j * 32);
			word0 = 50;
		} else if (i == 223) {
			this.aSet(j * 32 + 16, k * 32 + 16, 4304, j * 32);
			word0 = 50;
		} else if (i == 224) {
			this.aSet(j * 32 + 16, k * 32 + 16, 4305, j * 32);
			word0 = 50;
		} else if (i == 225) {
			this.aSet(j * 32 + 16, k * 32 + 16, 4306, j * 32);
			word0 = 50;
		} else if (i == 226) {
			this.aSet(j * 32 + 16, k * 32 + 16, 4307, j * 32);
			word0 = 50;
		} else if (i == 227) {
			this.aSet(j * 32 + 16, k * 32 + 16, 4310, j * 32);
			word0 = 50;
		} else if (i == 228) {
			this.aSet(j * 32 + 16, k * 32 + 16, 4311, j * 32);
			word0 = 50;
		} else if (i == 229) {
			this.aSet(j * 32 + 16, k * 32 + 16, 4312, j * 32);
			word0 = 50;
		} else if (i == 230) {
			this.aSet(j * 32 + 16, k * 32 + 16, 4313, j * 32);
			word0 = 50;
		} else if (i == 231) {
			this.aSet(j * 32 + 16, k * 32 + 16, 4314, j * 32);
			word0 = 50;
		} else if (i == 232) {
			this.aSet(j * 32 + 16, k * 32 + 16, 4315, j * 32);
			word0 = 50;
		} else if (i == 233) {
			this.aSet(j * 32 + 16, k * 32 + 16, 4316, j * 32);
			word0 = 50;
		} else if (i == 234) {
			this.aSet(j * 32 + 16, k * 32 + 16, 4317, j * 32);
			word0 = 50;
		} else if (i == 235) this.aSet(j * 32, k * 32, 4400, j * 32);
		else if (i == 236) this.aSet(j * 32, k * 32, 4410, j * 32);
		else if (i == 237) this.aSet(j * 32, k * 32 + 32, 4500, j * 32);
		else if (i == 238) this.aSet(j * 32, k * 32 + 32, 4501, j * 32);
		else if (i == 239) this.aSet(j * 32, k * 32 + 32, 4502, j * 32);
		else if (i == 240) this.aSet(j * 32, k * 32 + 32, 4503, j * 32);
		else if (i == 241) this.aSet(j * 32, k * 32 + 32, 4510, j * 32);
		else if (i == 242) this.aSet(j * 32, k * 32 + 32, 4511, j * 32);
		else if (i == 243) this.aSet(j * 32, k * 32 + 32, 4512, j * 32);
		else if (i == 244) this.aSet(j * 32, k * 32 + 32, 4513, j * 32);
		else if (i == 245) this.aSet(j * 32, k * 32, 4600, j * 32);
		else if (i == 246) this.aSet(j * 32, k * 32, 4610, j * 32);
		else if (i == 247) {
			this.aSet(j * 32, k * 32, 4700, j * 32);
			word0 = 213;
		} else if (i == 248) {
			this.aSet(j * 32, k * 32, 4701, j * 32);
			word0 = 214;
		} else if (i == 249) this.aSet(j * 32, k * 32, 4800, j * 32);
		else if (i == 250) this.aSet(j * 32, k * 32, 4801, j * 32);
		else if (i == 251) {
			this.aSet(j * 32, k * 32, 4702, j * 32);
			word0 = 215;
		} else if (i == 252) {
			this.aSet(j * 32, k * 32, 4703, j * 32);
			word0 = 212;
		} else if (i == 253) {
			this.aSet(j * 32, k * 32, 5000, j * 32);
			word0 = 28;
		} else if (i == 254) this.aSet(j * 32, k * 32, 4900, j * 32);
		else if (i == 255) this.aSet(j * 32, k * 32, 4910, j * 32);
		else if (i == 256) this.aSet(j * 32, k * 32, 5200, j * 32);
		else if (i == 257) this.aSet(j * 32, k * 32, 5210, j * 32);
		else if (i == 258) this.tSet(j * 32, k * 32, 1190, j * 32 - this.gg.di.width - 32 - 32);
		else if (i == 259) this.tSet(j * 32, k * 32, 1191, j * 32 - this.gg.di.width - 32 - 32);
		else if (i == 260) {
			this.aSet(j * 32, k * 32, 5100, j * 32);
			word0 = 31;
		} else if (i == 261) {
			this.aSet(j * 32, k * 32, 5101, j * 32);
			word0 = 31;
		} else if (i == 262) this.aSet(j * 32, k * 32, 5300, j * 32);
		else if (i == 263) {
			word0 = 18;
			this.map_data_option[j][k] = true;
		} else if (i == 264) {
			word0 = 19;
			this.map_data_option[j][k] = true;
		} else if (i >= 1001 && i <= 1249) word0 = Math.floor(i - 1000);
		else word0 = -99;
		return word0;
	}

	/**
	 * ゲーム画面を描画します
	 */
	drawGamescreen() {
		drawGamescreen.apply(this);
	}

	/**
	 * 主人公を描画します
	 * {@link MasaoJSS#drawSystemObject}以外では使われていない？
	 * @see {@link MasaoJSS#drawSystemObject}
	 */
	drawGamescreenMy() {
		drawGamescreenMy.apply(this);
	}

	/**
	 * 敵を描画します
	 * {@link MasaoJSS#drawSystemObject}以外では使われていない？
	 * @see {@link MasaoJSS#drawSystemObject}
	 */
	drawGamescreenEnemy() {
		drawGamescreenEnemy.apply(this);
	}

	/**
	 * HPゲージ、一言メッセージ、{@link MasaoJSS#showOval|showOval}, {@link MasaoJSS#showRect|showRect}, {@link MasaoJSS#showImage|showImage}で指定した描画物を描画します
	 * {@link MasaoJSS#drawSystemObject}以外では使われていない？
	 * @see {@link MasaoJSS#drawSystemObject}
	 */
	drawGamescreenWindow() {
		drawGamescreenWindow.apply(this);
	}

	/**
	 * 仕掛けを描画します
	 * {@link MasaoJSS#drawSystemObject}以外では使われていない？
	 * @see {@link MasaoJSS#drawSystemObject}
	 */
	drawGamescreenUgokuyuka() {
		drawGamescreenUgokuyuka.apply(this);
	}

	/**
	 * 水中にいるときの泡を表示します
	 *
	 * * 0: jM100で読み込むとき
	 * * 1: jM100stgで読み込むとき
	 * * 2: jMoveで読み込むとき
	 *
	 * @param {number} BGCode 自分の中心のマップコード
	 * @param {number} mode
	 */
	AwaMove(BGCode: number, mode: number) {
		if (
			BGCode == 4 ||
			((BGCode == 8 || BGCode == 9) &&
				this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][rightShiftIgnoreSign(this.co_j.y + 15, 5)] ==
					4) ||
			(mode !== 2 &&
				BGCode >= 15 &&
				BGCode <= 19 &&
				this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][rightShiftIgnoreSign(this.co_j.y + 15, 5) - 1] == 4)
		) {
			this.j_mizu_f = true;
			if (mode === 0) this.j_djump_kf = true; // 大ジャンプのフラグ削除
			if (mode !== 1) this.j_jet_c = 0; // ジェットの減少を停止
			this.j_mizu_awa_c++;
			if (this.j_mizu_awa_c == 44 || this.j_mizu_awa_c == 54) this.mSet(this.co_j.x, this.co_j.y + 4, 60);
			else if (this.j_mizu_awa_c > 54) this.j_mizu_awa_c = 0;
		}
	}

	/**
	 * 毎フレームの主人公の処理のうち、CharactorObject.cの値が100のときの処理を行います
	 */
	jM100() {
		var flag1 = false;
		var flag2 = false;
		var flag19 = false;
		var flag21 = false;
		this.j_mizu_f = false;
		var l29 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15);
		this.AwaMove(l29, 0);
		if (this.jst_auto_right > 0)
			if (this.jst_auto_right == 1) {
				//特技 ひたすら右に歩く の状態
				this.gk.right_f = true;
				this.gk.left_f = false;
				this.j_hashiru_f = false;
			} else if (this.jst_auto_right == 2) {
				//特技 ひたすら右に走る の状態
				this.gk.right_f = true;
				this.gk.left_f = false;
				this.j_hashiru_f = true;
			}
		if (this.gk.tr1_f) {
			if (this.tr1_c < 6) this.tr1_c++;
		} else {
			this.tr1_c = 0;
		}
		if (this.gk.tr1_f) {
			if (this.gk.tr1_c < 6) this.gk.tr1_c++;
		} else {
			this.gk.tr1_c = 0;
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
			if (this.left_dcc > 0 && this.jst_fast_run != 2) this.j_hashiru_f = true;
			else this.j_hashiru_f = false;
			this.left_dcc = 8;
		} else if (this.left_dcc > 0) this.left_dcc--;
		if (this.gk.right_c == 1) {
			if (this.right_dcc > 0 && this.jst_fast_run != 2) this.j_hashiru_f = true;
			else this.j_hashiru_f = false;
			this.right_dcc = 8;
		} else if (this.right_dcc > 0) this.right_dcc--;
		if (this.gk.up_f) {
			this.up_key_c++;
			if (this.up_key_c > 2) this.up_key_c = 2;
		} else {
			this.up_key_c = 0;
		}
		if (this.gk.down_f) {
			this.down_key_c++;
			if (this.down_key_c > 2) this.down_key_c = 2;
		} else {
			this.down_key_c = 0;
		}
		var j5 = this.co_j.x;
		var k5 = this.co_j.y;
		this.co_j.pt = 100;
		var i = rightShiftIgnoreSign(j5 + 15, 5);
		var j2 = rightShiftIgnoreSign(k5 + 31, 5);
		var word0 = this.maps.map_bg[i][j2];
		var flag = this.map_data_option[i][j2];
		var l2 = rightShiftIgnoreSign(k5 + 32, 5);
		var word2 = this.maps.map_bg[i][l2];
		if (this.j_shitakara_mushi_y > 0 && this.j_shitakara_mushi_y != l2) this.j_shitakara_mushi_y = -1;
		flag19 = false;
		if (word2 == 15 && rightShiftIgnoreSign(k5, 5) * 32 == k5 && this.co_j.vy >= 0) {
			flag19 = true;
			if (this.j_shitakara_mushi_y > 0 && this.j_shitakara_mushi_y == l2) flag19 = false;
		}
		if (
			(word2 >= 20 || word2 == 10 || this.j_a_id >= 0 || flag19) &&
			this.j_hashigo_mushi_x != rightShiftIgnoreSign(this.co_j.x + 15, 5)
		) {
			this.co_j.jimen_f = true;
			this.j_jump_type = 2;
			if (word2 == 69) flag2 = true;
		} else {
			this.co_j.jimen_f = false;
		}
		if (this.yuka_ride_id >= 0) {
			this.co_j.jimen_f = true;
			this.j_jump_type = 2;
		}
		if (word0 == 18 || word0 == 19) {
			var j21 = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
			if (this.map_data_option[i][j2]) {
				if ((this.saka_mushi_y <= 0 || this.saka_mushi_y != j2) && j21 == this.co_j.y && this.co_j.vy >= 0) {
					this.co_j.jimen_f = true;
					this.j_jump_type = 2;
				}
			} else if (j21 <= this.co_j.y) {
				this.co_j.y = j21;
				if (this.co_j.vy >= 0) {
					this.co_j.jimen_f = true;
					this.j_jump_type = 2;
				}
			}
		}
		if (word0 == 10 && rightShiftIgnoreSign(this.co_j.y, 5) * 32 == this.co_j.y) {
			this.co_j.jimen_f = true;
			if (
				this.j_tokugi <= 11 &&
				rightShiftIgnoreSign(this.co_j.x + 15, 5) != this.j_hashigo_mushi_x &&
				this.maps.getBGCode(this.co_j.x + 15 - 32, this.co_j.y + 31) != 10 &&
				this.maps.getBGCode(this.co_j.x + 15 + 32, this.co_j.y + 31) != 10 &&
				this.maps.getBGCode(this.co_j.x + 15 - 32, this.co_j.y + 32) <= 9 &&
				this.maps.getBGCode(this.co_j.x + 15 + 32, this.co_j.y + 32) <= 9
			) {
				var flag5 = false;
				if (rightShiftIgnoreSign(this.co_j.x, 5) * 32 != this.co_j.x) {
					var j10 = 0;
					do {
						if (j10 > this.a_kazu) break;
						if (
							this.co_a[j10].c == 410 &&
							this.co_a[j10].x <= rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 15 &&
							this.co_a[j10].x + 95 >= rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 15 &&
							this.co_j.y + 31 >= this.co_a[j10].y &&
							this.co_j.y <= this.co_a[j10].y + 63
						) {
							flag5 = true;
							break;
						}
						j10++;
					} while (true);
				}
				if (!flag5) {
					this.j_hashigo_f = true;
					this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32;
				}
			}
		}
		if (this.j_hashigo_mushi_x != rightShiftIgnoreSign(this.co_j.x + 15, 5) || this.co_j.vx == 0)
			this.j_hashigo_mushi_x = -1;
		if (this.saka_mushi_y >= 0)
			if (this.co_j.y + 31 > this.saka_mushi_y * 32 + 32 + 23 || this.co_j.y + 31 < this.saka_mushi_y * 32)
				this.saka_mushi_y = -1;
			else if (this.co_j.jimen_f || this.j_hashigo_f) this.saka_mushi_y = -1;
		if (
			this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15) == 10 ||
			this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) == 10
		) {
			if (this.j_hashigo_mushi_x != rightShiftIgnoreSign(this.co_j.x + 15, 5)) this.j_jump_type = 2;
			if (this.gk.up_f) {
				var flag6 = false;
				if (rightShiftIgnoreSign(this.co_j.x, 5) * 32 != this.co_j.x) {
					var k10 = 0;
					do {
						if (k10 > this.a_kazu) break;
						if (
							this.co_a[k10].c == 410 &&
							this.co_a[k10].x <= rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 15 &&
							this.co_a[k10].x + 95 >= rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 15 &&
							this.co_j.y + 31 >= this.co_a[k10].y &&
							this.co_j.y <= this.co_a[k10].y + 63
						) {
							flag6 = true;
							break;
						}
						k10++;
					} while (true);
				}
				if (!flag6) {
					this.j_hashigo_f = true;
					this.co_j.jimen_f = false;
					this.j_jet_c = 0;
					this.co_j.direction = 2;
				}
			}
			if (
				this.gk.down_f &&
				this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32) < 20 &&
				this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32) != 15
			) {
				var flag7 = false;
				if (rightShiftIgnoreSign(this.co_j.x, 5) * 32 != this.co_j.x) {
					var l10 = 0;
					do {
						if (l10 > this.a_kazu) break;
						if (
							this.co_a[l10].c == 410 &&
							this.co_a[l10].x <= rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 15 &&
							this.co_a[l10].x + 95 >= rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 15 &&
							this.co_j.y + 31 >= this.co_a[l10].y &&
							this.co_j.y <= this.co_a[l10].y + 63
						) {
							flag7 = true;
							break;
						}
						l10++;
					} while (true);
				}
				if (!flag7) {
					this.j_hashigo_f = true;
					this.co_j.jimen_f = false;
					this.j_jet_c = 0;
					this.co_j.direction = 3;
				}
			}
			if (
				!this.co_j.jimen_f &&
				this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) == 10 &&
				this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32) < 20 &&
				this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32) != 15
			) {
				this.co_j.jimen_f = false;
				this.j_jet_c = 0;
			}
		} else {
			this.j_hashigo_f = false;
			this.co_j.direction = 0;
		}
		if (this.j_hashigo_f) {
			if (this.gk.left_f) {
				var j16 = rightShiftIgnoreSign(this.co_j.y + 15, 5);
				var word20 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][j16];
				var word30 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][j16 + 1];
				if ((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && (word20 <= 10 || word20 == 15)) {
					this.j_hashigo_f = false;
					this.co_j.jimen_f = true;
					this.co_j.y = j16 * 32;
					this.j_shitakara_mushi_y = -1;
					this.co_j.direction = 0;
				} else if (word20 == 10) {
					this.j_hashigo_f = false;
					this.co_j.jimen_f = true;
					this.co_j.y = j16 * 32;
					this.j_shitakara_mushi_y = -1;
					this.co_j.direction = 0;
				} else if ((word20 <= 10 || word20 == 15) && (word30 >= 20 || word30 == 15 || word30 == 10)) {
					var word21 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j16 + 1];
					if (word21 == 10 || word21 == 15 || word21 >= 20) {
						this.j_hashigo_f = false;
						this.co_j.jimen_f = true;
						this.co_j.y = j16 * 32;
						this.j_shitakara_mushi_y = -1;
						this.co_j.direction = 0;
					}
				}
			}
			if (this.gk.right_f) {
				var k16 = rightShiftIgnoreSign(this.co_j.y + 15, 5);
				var word22 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) + 1][k16];
				var word31 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) + 1][k16 + 1];
				if ((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && (word22 <= 10 || word22 == 15)) {
					this.j_hashigo_f = false;
					this.co_j.jimen_f = true;
					this.co_j.y = k16 * 32;
					this.j_shitakara_mushi_y = -1;
					this.co_j.direction = 0;
				}
				if (word22 == 10) {
					this.j_hashigo_f = false;
					this.co_j.jimen_f = true;
					this.co_j.y = k16 * 32;
					this.j_shitakara_mushi_y = -1;
					this.co_j.direction = 0;
				} else if ((word22 <= 10 || word22 == 15) && (word31 >= 20 || word31 == 15 || word31 == 10)) {
					var word23 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][k16 + 1];
					if (word23 == 10 || word23 == 15 || word23 >= 20) {
						this.j_hashigo_f = false;
						this.co_j.jimen_f = true;
						this.co_j.y = k16 * 32;
						this.j_shitakara_mushi_y = -1;
						this.co_j.direction = 0;
					}
				}
			}
		}
		if (this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) {
			// ジャンプできない
			if (this.ana_kazu > 0) {
				var l5 = 0;
				do {
					if (l5 > this.t_kazu) break;
					if (
						(this.co_t[l5].c == 1250 || this.co_t[l5].c == 1310) &&
						this.co_j.x + 15 >= this.co_t[l5].x &&
						this.co_j.x + 15 <= this.co_t[l5].x + 31 &&
						this.co_j.y == this.co_t[l5].y - 32
					) {
						this.co_j.jimen_f = true;
						break;
					}
					l5++;
				} while (true);
			}
			var i6 = 0;
			do {
				if (i6 > this.t_kazu) break;
				if (
					this.co_t[i6].c >= 1200 &&
					this.co_t[i6].c <= 1220 &&
					Math.abs(this.co_j.x - this.co_t[i6].x) <= 24 &&
					this.co_j.y == this.co_t[i6].y - 32
				) {
					this.co_j.y = this.co_t[i6].y - 32;
					this.co_j.jimen_f = true;
					break;
				}
				i6++;
			} while (true);
		}
		if (this.j_hashigo_f) this.co_j.jimen_f = false;
		if (this.j_cannon_c > 0) {
			this.j_cannon_c--;
			if (this.co_j.jimen_f || this.j_hashigo_f || this.j_cannon_c == 0)
				if (this.jst_pc_attack >= 1 && this.j_cannon_c > 0 && (this.j_cannon_type == 3 || this.j_cannon_type == 4)) {
					if (this.j_hashigo_f) {
						this.j_cannon_c = 0;
						if (this.co_j.vx < -120) this.co_j.vx = -120;
						if (this.co_j.vx > 120) this.co_j.vx = 120;
					}
				} else {
					this.j_cannon_c = 0;
					if (this.co_j.vx < -120) this.co_j.vx = -120;
					if (this.co_j.vx > 120) this.co_j.vx = 120;
					if (this.j_cannon_type == 3 || this.j_cannon_type == 4) {
						this.co_j.vx = 0;
						this.co_j.vy = 20;
						this.j_jump_type = 0;
					}
				}
		}
		if (this.j_hashigo_f) {
			// ハシゴにつかまっている
			this.j_djump_kf = true;
			if (this.gk.left_f) this.co_j.muki = 0;
			else if (this.gk.right_f) this.co_j.muki = 1;
			if (this.gk.up_f && !this.gk.left_f && !this.gk.right_f) {
				this.co_j.vy = -80;
				this.co_j.ac++;
				if (this.co_j.ac > 3) this.co_j.ac = 0;
			} else if (this.gk.down_f && !this.gk.left_f && !this.gk.right_f) {
				this.co_j.vy = 80;
				this.co_j.ac++;
				if (this.co_j.ac > 3) this.co_j.ac = 0;
			} else {
				this.co_j.vy = 0;
				this.co_j.ac = 0;
			}
			this.co_j.vx = 0;
		} else if (
			this.gk.down_f &&
			this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32) == 10 &&
			!this.gk.left_f &&
			!this.gk.right_f
		) {
			var flag8 = false;
			var i11 = 0;
			do {
				if (i11 > this.a_kazu) break;
				if (
					this.co_a[i11].c == 410 &&
					this.co_a[i11].x <= rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 15 &&
					this.co_a[i11].x + 95 >= rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 15 &&
					this.co_j.y + 31 >= this.co_a[i11].y &&
					this.co_j.y <= this.co_a[i11].y + 63
				) {
					flag8 = true;
					break;
				}
				i11++;
			} while (true);
			if (!flag8) {
				this.j_djump_kf = true;
				this.co_j.vy = 80;
				this.co_j.vx = 0;
				this.co_j.jimen_f = false;
				this.j_hashigo_f = true;
			}
		} else if (this.co_j.jimen_f) {
			// 地面に接している
			this.j_djump_kf = true;
			this.j_zan_f = false;
			this.j_jet_c = 0;
			if (this.gk.left_f && (this.j_cannon_c <= 0 || (this.j_cannon_type != 3 && this.j_cannon_type != 4))) {
				// ←を押している
				if (flag2) {
					this.co_j.vx -= 4;
					if (this.gk.left_c == 1 && this.co_j.vx > 30) this.gs.rsAddSound(5);
				} else {
					this.co_j.vx -= 15;
					if (this.gk.left_c == 1 && this.co_j.vx > 60) this.gs.rsAddSound(5);
				}
				if (this.j_hashiru_f) {
					// 走っている
					if (!this.j_mizu_f) {
						if (this.jst_fast_run == 1) {
							if (this.co_j.vx < -180) this.co_j.vx = -180;
						} else if (this.co_j.vx < -120) this.co_j.vx = -120;
					} else if (this.co_j.vx < -60) this.co_j.vx = -60;
					if (this.co_j.vx > 0 && !flag2) {
						this.co_j.pt = 108;
						this.co_j.ac = 0;
					} else {
						this.co_j.pt = 105 + rightShiftIgnoreSign(this.co_j.ac, 1);
						this.co_j.ac++;
						if (this.co_j.ac > 3) this.co_j.ac = 0;
					}
				} else {
					if (!this.j_mizu_f) {
						if (this.co_j.vx < -60) this.co_j.vx = -60;
					} else if (this.co_j.vx < -40) this.co_j.vx = -40;
					if (this.co_j.vx > 0 && !flag2) {
						this.co_j.pt = 108;
						this.co_j.ac = 0;
					} else {
						this.co_j.pt = 103 + rightShiftIgnoreSign(this.co_j.ac, 1);
						this.co_j.ac++;
						if (this.co_j.ac > 3) this.co_j.ac = 0;
					}
				}
				this.co_j.muki = 0;
			} else if (this.gk.right_f && (this.j_cannon_c <= 0 || (this.j_cannon_type != 3 && this.j_cannon_type != 4))) {
				// →を押している
				if (flag2) {
					this.co_j.vx += 4;
					if (this.gk.right_c == 1 && this.co_j.vx < -30) this.gs.rsAddSound(5);
				} else {
					this.co_j.vx += 15;
					if (this.gk.right_c == 1 && this.co_j.vx < -60) this.gs.rsAddSound(5);
				}
				if (this.j_hashiru_f) {
					// 走っている
					if (!this.j_mizu_f) {
						if (this.jst_fast_run == 1) {
							if (this.co_j.vx > 180) this.co_j.vx = 180;
						} else if (this.co_j.vx > 120) this.co_j.vx = 120;
					} else if (this.co_j.vx > 60) this.co_j.vx = 60;
					if (this.co_j.vx < 0 && !flag2) {
						this.co_j.pt = 108;
						this.co_j.ac = 0;
					} else {
						this.co_j.pt = 105 + rightShiftIgnoreSign(this.co_j.ac, 1);
						this.co_j.ac++;
						if (this.co_j.ac > 3) this.co_j.ac = 0;
					}
				} else {
					if (!this.j_mizu_f) {
						if (this.co_j.vx > 60) this.co_j.vx = 60;
					} else if (this.co_j.vx > 40) this.co_j.vx = 40;
					if (this.co_j.vx < 0 && !flag2) {
						this.co_j.pt = 108;
						this.co_j.ac = 0;
					} else {
						this.co_j.pt = 103 + rightShiftIgnoreSign(this.co_j.ac, 1);
						this.co_j.ac++;
						if (this.co_j.ac > 3) this.co_j.ac = 0;
					}
				}
				this.co_j.muki = 1;
			} else if (this.co_j.vx < 0) {
				if (this.j_cannon_c <= 0 || (this.j_cannon_type != 3 && this.j_cannon_type != 4))
					if (flag2) this.co_j.vx++;
					else this.co_j.vx += 5;
				if (this.co_j.vx > 0) this.co_j.vx = 0;
				if (this.j_hashiru_f || flag2) {
					this.co_j.pt = 107;
					this.co_j.ac = 0;
				} else {
					this.co_j.pt = 103 + rightShiftIgnoreSign(this.co_j.ac, 1);
					this.co_j.ac++;
					if (this.co_j.ac > 3) this.co_j.ac = 0;
				}
				this.co_j.muki = 0;
			} else if (this.co_j.vx > 0) {
				if (this.j_cannon_c <= 0 || (this.j_cannon_type != 3 && this.j_cannon_type != 4))
					if (flag2) this.co_j.vx--;
					else this.co_j.vx -= 5;
				if (this.co_j.vx < 0) this.co_j.vx = 0;
				if (this.j_hashiru_f || flag2) {
					this.co_j.pt = 107;
					this.co_j.ac = 0;
				} else {
					this.co_j.pt = 103 + rightShiftIgnoreSign(this.co_j.ac, 1);
					this.co_j.ac++;
					if (this.co_j.ac > 3) this.co_j.ac = 0;
				}
				this.co_j.muki = 1;
			} else {
				this.co_j.ac = 0;
			}
		} else {
			// 空中にいる
			if ((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && !this.j_mizu_f) {
				if (this.co_j.vy < 0) {
					if (this.co_j.vx < 0) this.co_j.vx = -30;
					if (this.co_j.vx > 0) this.co_j.vx = 30;
				} else {
					if (this.co_j.vx < 0) this.co_j.vx = -60;
					if (this.co_j.vx > 0) this.co_j.vx = 60;
				}
				if (this.co_j.vy < 0) {
					if (Math.abs(rightShiftIgnoreSign(this.co_j.x, 5) * 32 - this.co_j.x) < 3) {
						this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32;
						this.co_j.vx = 0;
					}
				} else if (Math.abs(rightShiftIgnoreSign(this.co_j.x, 5) * 32 - this.co_j.x) < 6) {
					this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32;
					this.co_j.vx = 0;
				}
				if (this.co_j.vy > 90) this.co_j.vy = 90;
			} else if (this.gk.left_f) {
				if (this.j_cannon_c <= 0 && !this.j_mizu_f)
					if (this.jst_fly_left_right == 1) {
						this.co_j.vx -= 15;
						if (this.co_j.vx < -120) this.co_j.vx = -120;
					} else if (this.co_j.vx > -60) {
						this.co_j.vx -= 10;
						if (this.co_j.vx < -60) this.co_j.vx = -60;
					}
			} else if (this.gk.right_f && this.j_cannon_c <= 0 && !this.j_mizu_f)
				if (this.jst_fly_left_right == 1) {
					this.co_j.vx += 15;
					if (this.co_j.vx > 120) this.co_j.vx = 120;
				} else if (this.co_j.vx < 60) {
					this.co_j.vx += 10;
					if (this.co_j.vx > 60) this.co_j.vx = 60;
				}
			if ((this.jst_kabe_kick == 1 || this.jst_kabe_kick == 2) && this.gk.tr1_c == 1 && !this.j_mizu_f) {
				var l19 = this.maps.getBGCode(this.co_j.x + 14, this.co_j.y);
				var k20 = this.maps.getBGCode(this.co_j.x + 14, this.co_j.y + 31);
				if (l19 >= 20 || l19 == 18 || k20 >= 20 || k20 == 18) {
					if (this.jst_kabe_kick == 2) {
						this.co_j.vx = 60;
						this.co_j.vy = -260;
						this.co_j.muki = 1;
						this.j_jump_level = 3;
						this.j_jump_type = 0;
						this.gs.rsAddSound(3);
					} else {
						this.co_j.vx = 60;
						if (!this.j_mizu_f) this.co_j.vx = 120;
						this.j_jump_type = 5;
						this.co_j.muki = 0;
						if (this.co_j.vy > 0) this.co_j.vy = -25;
						else this.co_j.vy -= 50;
					}
					flag21 = true;
					this.j_djump_kf = true;
				}
				l19 = this.maps.getBGCode(this.co_j.x + 16, this.co_j.y);
				k20 = this.maps.getBGCode(this.co_j.x + 16, this.co_j.y + 31);
				if (l19 >= 19 || k20 >= 19) {
					if (this.jst_kabe_kick == 2) {
						this.co_j.vx = -60;
						this.co_j.vy = -260;
						this.co_j.muki = 0;
						this.j_jump_level = 3;
						this.j_jump_type = 0;
						this.gs.rsAddSound(3);
					} else {
						this.co_j.vx = -60;
						if (!this.j_mizu_f) this.co_j.vx = -120;
						this.j_jump_type = 5;
						this.co_j.muki = 1;
						if (this.co_j.vy > 0) this.co_j.vy = -25;
						else this.co_j.vy -= 50;
					}
					flag21 = true;
					this.j_djump_kf = true;
				}
			}
			if (this.j_mizu_f) {
				// 水中にいる
				if (this.j_mizu_ac > 1) this.co_j.pt = 84;
				else this.co_j.pt = 83;
			} else if (this.j_jump_type == 0) {
				if (this.j_cannon_c > 0 && this.j_cannon_type == 2) this.co_j.pt = 1300;
				else if (this.j_cannon_c > 0 && this.j_cannon_type == 5) this.co_j.pt = 210;
				else if (this.j_cannon_c > 0 && Math.abs(this.co_j.vy) < 50) this.co_j.pt = 83;
				else if (this.co_j.vy < 20) this.co_j.pt = 101;
				else this.co_j.pt = 102;
			} else if (this.j_jump_type == 2) {
				if (Math.abs(this.co_j.vx) <= 60) this.co_j.pt = 103;
				else this.co_j.pt = 105;
			} else if (this.j_jump_type == 3) this.co_j.pt = 119;
			else if (this.j_jump_type == 4) this.co_j.pt = 100;
			else if (this.j_jump_type == 5) this.co_j.pt = 107;
			else if (this.j_jump_type == 6) this.co_j.pt = 109;
			else if (this.j_jump_type == 7) {
				this.co_j.pt = 1500;
				this.j_zan_f = false;
			} else {
				this.co_j.pt = 109;
			}
			this.co_j.ac = 2;
		}
		if (this.j_cannon_c > 0)
			if (this.j_cannon_type == 3) {
				// サイコクラッシャーアタック
				this.co_j.pt = 1400;
				if (this.j_cannon_c <= 5) {
					this.co_j.pt = 102;
					this.co_j.vx = 0;
					if (this.co_j.jimen_f) this.co_j.pt = 100;
				}
			} else if (this.j_cannon_type == 4) {
				// ロケット頭突き
				this.co_j.pt = 84;
				if (this.j_cannon_c <= 5) {
					this.co_j.pt = 102;
					this.co_j.vx = 0;
					if (this.co_j.jimen_f) this.co_j.pt = 100;
				}
			}
		if (this.j_jdai_f) {
			this.co_j.vx = 0;
			this.co_j.pt = 100;
			this.co_j.ac = 0;
			if ((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && this.co_j.y % 32 == 0)
				if (this.gk.left_f) {
					this.co_j.vx = -30;
					this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 - 6;
				} else if (this.gk.right_f) {
					this.co_j.vx = 30;
					this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 6;
				}
		}
		if (this.j_hashigo_f) this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32;
		else if (this.co_j.vx < 0) {
			this.co_j.x += rounddown(this.co_j.vx / 10);
			if (this.yuka_ride_id >= 0)
				if (this.yo[this.yuka_ride_id].con >= 200 && this.yo[this.yuka_ride_id].con < 300) {
					var k21 = this.getSLOY(
						this.yo[this.yuka_ride_id].x,
						this.yo[this.yuka_ride_id].y,
						this.yo[this.yuka_ride_id].x2,
						this.yo[this.yuka_ride_id].y2
					);
					if (k21 >= 0) {
						this.co_j.y = k21;
						if (
							this.yo[this.yuka_ride_id].y > this.yo[this.yuka_ride_id].y2 &&
							this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20
						)
							this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
					} else {
						this.co_j.y = this.yo[this.yuka_ride_id].y - 32;
						var l7;
						for (l7 = 0; l7 <= this.yuka_id_max; l7++) {
							if (
								this.yo[l7].con < 200 ||
								this.yo[l7].con >= 300 ||
								this.yo[l7].x2 != this.yo[this.yuka_ride_id].x ||
								this.yo[l7].y2 != this.yo[this.yuka_ride_id].y
							)
								continue;
							var l21 = this.getSLOY(this.yo[l7].x, this.yo[l7].y, this.yo[l7].x2, this.yo[l7].y2);
							if (l21 < 0) continue;
							this.co_j.y = l21;
							break;
						}

						if (l7 > this.yuka_id_max)
							if (this.yo[this.yuka_ride_id].y <= this.yo[this.yuka_ride_id].y2) this.co_j.vy = 0;
							else this.co_j.vy = 75;
					}
				} else if (this.yo[this.yuka_ride_id].con >= 300 && this.yo[this.yuka_ride_id].con < 350) {
					var i22 = this.getSCOY(
						this.yo[this.yuka_ride_id].x,
						this.yo[this.yuka_ride_id].y,
						this.yo[this.yuka_ride_id].x2,
						this.yo[this.yuka_ride_id].y2
					);
					if (i22 >= 0) {
						this.co_j.y = i22;
						if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
							this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
					} else {
						var j22 = rounddown((this.yo[this.yuka_ride_id].x2 * 90) / 100);
						this.co_j.y =
							this.yo[this.yuka_ride_id].y -
							Math.floor(Math.sqrt(this.yo[this.yuka_ride_id].x2 * this.yo[this.yuka_ride_id].x2 - j22 * j22)) -
							32;
					}
				} else if (this.yo[this.yuka_ride_id].con >= 350 && this.yo[this.yuka_ride_id].con < 400) {
					var k22 = this.getSHCOY(
						this.yo[this.yuka_ride_id].x,
						this.yo[this.yuka_ride_id].y,
						this.yo[this.yuka_ride_id].x2,
						this.yo[this.yuka_ride_id].y2
					);
					if (k22 >= 0) {
						this.co_j.y = k22;
						if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
							this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
					} else {
						this.co_j.y = this.yo[this.yuka_ride_id].y + 32;
					}
				} else if (this.yo[this.yuka_ride_id].con >= 400 && this.yo[this.yuka_ride_id].con < 450) {
					var l22 = this.getSWUpOY(
						this.yo[this.yuka_ride_id].x,
						this.yo[this.yuka_ride_id].y,
						this.yo[this.yuka_ride_id].x2,
						this.yo[this.yuka_ride_id].y2
					);
					if (l22 >= 0) {
						this.co_j.y = l22;
						if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
							this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
					} else {
						this.co_j.y = this.yo[this.yuka_ride_id].y + 128 - 32;
						var i8 = 0;
						do {
							if (i8 > this.yuka_id_max) break;
							if (
								this.yo[i8].con >= 400 &&
								this.yo[i8].con < 450 &&
								this.yo[i8].x == this.yo[this.yuka_ride_id].x - 256 &&
								this.yo[i8].y == this.yo[this.yuka_ride_id].y + 128
							) {
								var i23 = this.getSWUpOY(this.yo[i8].x, this.yo[i8].y, this.yo[i8].x2, this.yo[i8].y2);
								if (i23 >= 0) {
									this.co_j.y = i23;
									break;
								}
							}
							i8++;
						} while (true);
					}
				} else if (this.yo[this.yuka_ride_id].con >= 450 && this.yo[this.yuka_ride_id].con < 500) {
					var j23 = this.getSWDownOY(
						this.yo[this.yuka_ride_id].x,
						this.yo[this.yuka_ride_id].y,
						this.yo[this.yuka_ride_id].x2,
						this.yo[this.yuka_ride_id].y2
					);
					if (j23 >= 0) {
						this.co_j.y = j23;
						if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
							this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
					} else {
						this.co_j.y = this.yo[this.yuka_ride_id].y - 32;
						for (var j8 = 0; j8 <= this.yuka_id_max; j8++) {
							if (
								this.yo[j8].con < 400 ||
								this.yo[j8].con >= 450 ||
								this.yo[j8].x != this.yo[this.yuka_ride_id].x - 256 ||
								this.yo[j8].y != this.yo[this.yuka_ride_id].y
							)
								continue;
							var k23 = this.getSWUpOY(this.yo[j8].x, this.yo[j8].y, this.yo[j8].x2, this.yo[j8].y2);
							if (k23 < 0) continue;
							this.co_j.y = k23;
							break;
						}
					}
				}
			if (this.co_j.jimen_f)
				if (word0 == 19) {
					if (i > rightShiftIgnoreSign(this.co_j.x + 15, 5)) {
						this.co_j.y = (j2 - 1) * 32;
						if (this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2 - 1] == 19)
							this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
						else if (this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2] == 18)
							this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 32);
						else if (
							this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2] < 19 &&
							this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2] != 15
						) {
							this.co_j.vy = this.co_j.vx;
							if ((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && this.co_j.vy < -40)
								this.co_j.vy = -40;
							if (this.co_j.vy >= 0) this.co_j.y -= rounddown(-this.co_j.vy / -10);
						}
					} else {
						this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
					}
				} else if (word0 == 18) {
					if (i > rightShiftIgnoreSign(this.co_j.x + 15, 5)) {
						this.co_j.y = j2 * 32;
						if (this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2] == 19)
							this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
						else if (this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2 + 1] == 18)
							this.co_j.y = this.getSakamichiY(this.co_j.x + 15, (j2 + 1) * 32);
						else if (this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2 + 1] < 18) {
							this.co_j.vy = this.co_j.vx * -1;
							this.co_j.y += rounddown(this.co_j.vx / -10);
						}
					} else {
						this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
					}
				} else if ((word2 >= 20 || word2 == 10 || word2 == 15) && i > rightShiftIgnoreSign(this.co_j.x + 15, 5)) {
					this.co_j.y = j2 * 32;
					if (this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2 + 1] == 18)
						this.co_j.y = this.getSakamichiY(this.co_j.x + 15, (j2 + 1) * 32);
				}
			if (this.co_j.jimen_f) {
				var k = rightShiftIgnoreSign(this.co_j.x + 15, 5);
				var word12 = this.maps.map_bg[k][rightShiftIgnoreSign(this.co_j.y, 5)];
				var j3 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
				var word4 = this.maps.map_bg[k][j3];
				if (
					((word12 == 18 && !this.map_data_option[k][rightShiftIgnoreSign(this.co_j.y, 5)]) ||
						(word4 == 18 && !this.map_data_option[k][j3])) &&
					i > k &&
					this.co_j.y > this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31)
				) {
					this.co_j.x = k * 32 + 17;
					this.co_j.vx = 0;
				}
			} else {
				var l = rightShiftIgnoreSign(this.co_j.x + 15, 5);
				var word13 = this.maps.map_bg[l][rightShiftIgnoreSign(this.co_j.y, 5)];
				var k3 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
				var word5 = this.maps.map_bg[l][k3];
				if (
					word0 == 19 &&
					flag &&
					i > l &&
					(this.saka_mushi_y < 0 || (k3 != this.saka_mushi_y && k3 != this.saka_mushi_y + 1))
				) {
					this.co_j.y = j2 * 32 - 32;
					if (this.maps.map_bg[l][k3] == 19) this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
				}
				if (
					((word13 == 18 && !this.map_data_option[l][rightShiftIgnoreSign(this.co_j.y, 5)]) ||
						(word5 == 18 && !this.map_data_option[l][k3])) &&
					i > l
				) {
					this.co_j.x = l * 32 + 17;
					this.co_j.vx = 0;
				}
				if (word13 == 19 && !this.map_data_option[l][rightShiftIgnoreSign(this.co_j.y, 5)] && i > l) {
					this.co_j.x = l * 32 + 17;
					this.co_j.vx = 0;
				}
			}
			if (this.a_hf) {
				for (var k8 = 0; k8 <= this.a_kazu; k8++) {
					if (!this.co_a[k8].gf) continue;
					var characterobject = this.co_a[k8];
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
						continue;
					}
					if (characterobject.c == 300) {
						if (
							characterobject.c3 < 200 &&
							this.co_j.x + 15 >= characterobject.x &&
							this.co_j.x <= characterobject.x + 48 &&
							this.co_j.y + 31 >= characterobject.y &&
							this.co_j.y <= characterobject.y + 31
						) {
							this.co_j.x = characterobject.x + 49;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (characterobject.c >= 400 && characterobject.c < 500) {
						if (
							this.co_j.x + 15 < characterobject.x ||
							this.co_j.x > characterobject.x + 80 ||
							this.co_j.y + 31 < characterobject.y ||
							this.co_j.y > characterobject.y + 63
						)
							continue;
						if (
							characterobject.c4 == 16 &&
							characterobject.c == 410 &&
							this.souko_count3 != 1 &&
							characterobject.vx != 1
						) {
							if (
								this.maps.getBGCode(characterobject.x, characterobject.y + 64) < 18 &&
								this.maps.getBGCode(characterobject.x + 31, characterobject.y + 64) < 18 &&
								this.maps.getBGCode(characterobject.x + 63, characterobject.y + 64) < 18 &&
								this.maps.getBGCode(characterobject.x + 95, characterobject.y + 64) < 18
							) {
								var flag9 = false;
								var j29 = -1;
								var j11 = 0;
								do {
									if (j11 > this.a_kazu) break;
									if (
										this.co_a[j11].c == 410 &&
										this.co_a[j11].c4 == 16 &&
										j11 != k8 &&
										this.co_a[j11].x + 95 >= characterobject.x &&
										this.co_a[j11].x <= characterobject.x + 95 &&
										characterobject.y + 64 >= this.co_a[j11].y &&
										characterobject.y + 16 <= this.co_a[j11].y
									) {
										flag9 = true;
										characterobject.y = this.co_a[j11].y - 64;
										j29 = j11;
										break;
									}
									j11++;
								} while (true);
								if (flag9) {
									var l23 = characterobject.x;
									var i28 = characterobject.x;
									characterobject.x = this.co_j.x + 15 - 96;
									if (characterobject.x < l23 - 4) {
										characterobject.x = l23 - 4;
										if (this.co_j.vx < -40) this.co_j.vx = -40;
									}
									if (
										this.maps.getBGCode(characterobject.x, characterobject.y) >= 18 ||
										this.maps.getBGCode(characterobject.x, characterobject.y + 31) >= 18 ||
										this.maps.getBGCode(characterobject.x, characterobject.y + 63) >= 18
									) {
										characterobject.x = rightShiftIgnoreSign(characterobject.x, 5) * 32 + 32;
										this.co_j.vx = 0;
									}
									for (var k11 = 0; k11 <= this.a_kazu; k11++) {
										if (
											this.co_a[k11].c != 3000 ||
											this.co_a[k11].y != characterobject.y ||
											i28 <= this.co_a[k11].x ||
											characterobject.x > this.co_a[k11].x
										)
											continue;
										characterobject.x = this.co_a[k11].x;
										this.co_j.vx = 0;
										if (this.co_a[k11].c3 == 1) characterobject.vx = 1;
									}

									var flag10 = false;
									var l11 = 0;
									do {
										if (l11 > this.a_kazu) break;
										if (
											this.co_a[l11].c == 410 &&
											this.co_a[l11].c4 == 16 &&
											l11 != k8 &&
											this.co_a[l11].x + 95 >= characterobject.x &&
											this.co_a[l11].x <= characterobject.x + 95 &&
											characterobject.y + 64 >= this.co_a[l11].y &&
											characterobject.y + 16 <= this.co_a[l11].y
										) {
											flag10 = true;
											characterobject.y = this.co_a[l11].y - 64;
											break;
										}
										l11++;
									} while (true);
									if (
										!flag10 &&
										this.maps.getBGCode(characterobject.x, characterobject.y + 64) < 18 &&
										this.maps.getBGCode(characterobject.x + 31, characterobject.y + 64) < 18 &&
										this.maps.getBGCode(characterobject.x + 63, characterobject.y + 64) < 18 &&
										this.maps.getBGCode(characterobject.x + 95, characterobject.y + 64) < 18
									) {
										if (j29 >= 0) characterobject.x = this.co_a[j29].x - 96;
										else characterobject.x = rightShiftIgnoreSign(characterobject.x + 31, 5) * 32;
										this.co_j.vx = 0;
									}
									if (
										j29 >= 0 &&
										this.co_a[j29].x - 96 >= characterobject.x &&
										this.maps.getBGCode(this.co_a[j29].x - 96, characterobject.y + 64) < 18 &&
										this.maps.getBGCode(this.co_a[j29].x - 96 + 31, characterobject.y + 64) < 18 &&
										this.maps.getBGCode(this.co_a[j29].x - 96 + 63, characterobject.y + 64) < 18 &&
										this.maps.getBGCode(this.co_a[j29].x - 96 + 95, characterobject.y + 64) < 18
									)
										characterobject.x = this.co_a[j29].x - 96;
									this.co_j.x = characterobject.x + 81;
								} else {
									this.co_j.x = characterobject.x + 81;
									this.co_j.vx = 0;
								}
								continue;
							}
							var i24 = characterobject.x;
							var j28 = characterobject.x;
							characterobject.x = this.co_j.x + 15 - 96;
							if (characterobject.x < i24 - 4) {
								characterobject.x = i24 - 4;
								if (this.co_j.vx < -40) this.co_j.vx = -40;
							}
							if (
								this.maps.getBGCode(characterobject.x, characterobject.y) >= 18 ||
								this.maps.getBGCode(characterobject.x, characterobject.y + 31) >= 18 ||
								this.maps.getBGCode(characterobject.x, characterobject.y + 63) >= 18
							) {
								characterobject.x = rightShiftIgnoreSign(characterobject.x, 5) * 32 + 32;
								this.co_j.vx = 0;
							}
							for (var i12 = 0; i12 <= this.a_kazu; i12++)
								if (
									this.co_a[i12].c == 410 &&
									this.co_a[i12].c4 == 16 &&
									i12 != k8 &&
									this.co_a[i12].x + 95 >= characterobject.x &&
									this.co_a[i12].x <= characterobject.x + 95 &&
									characterobject.y + 63 >= this.co_a[i12].y &&
									characterobject.y <= this.co_a[i12].y + 63
								)
									characterobject.x = this.co_a[i12].x + 96;

							if (
								this.maps.getBGCode(characterobject.x, characterobject.y + 64) < 18 &&
								this.maps.getBGCode(characterobject.x + 31, characterobject.y + 64) < 18 &&
								this.maps.getBGCode(characterobject.x + 63, characterobject.y + 64) < 18 &&
								this.maps.getBGCode(characterobject.x + 95, characterobject.y + 64) < 18
							)
								characterobject.x = rightShiftIgnoreSign(characterobject.x + 31, 5) * 32;
							if (
								rightShiftIgnoreSign(characterobject.x + 31, 5) < rightShiftIgnoreSign(j28 + 31, 5) &&
								this.maps.getBGCode(rightShiftIgnoreSign(characterobject.x + 31, 5) * 32, characterobject.y + 64) <
									18 &&
								this.maps.getBGCode(rightShiftIgnoreSign(characterobject.x + 31, 5) * 32 + 31, characterobject.y + 64) <
									18 &&
								this.maps.getBGCode(rightShiftIgnoreSign(characterobject.x + 31, 5) * 32 + 63, characterobject.y + 64) <
									18 &&
								this.maps.getBGCode(rightShiftIgnoreSign(characterobject.x + 31, 5) * 32 + 95, characterobject.y + 64) <
									18
							)
								characterobject.x = rightShiftIgnoreSign(characterobject.x + 31, 5) * 32;
							for (var j12 = 0; j12 <= this.a_kazu; j12++) {
								if (
									this.co_a[j12].c != 3000 ||
									this.co_a[j12].y != characterobject.y ||
									j28 <= this.co_a[j12].x ||
									characterobject.x > this.co_a[j12].x
								)
									continue;
								characterobject.x = this.co_a[j12].x;
								this.co_j.vx = 0;
								if (this.co_a[j12].c3 == 1) characterobject.vx = 1;
							}

							this.co_j.x = characterobject.x + 81;
						} else {
							this.co_j.x = characterobject.x + 81;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (characterobject.c == 500) {
						if (
							this.co_j.x + 15 >= characterobject.x &&
							this.co_j.x <= characterobject.x + 80 &&
							this.co_j.y + 31 >= characterobject.y &&
							this.co_j.y <= characterobject.y + 13
						) {
							this.co_j.x = characterobject.x + 81;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (characterobject.c >= 600 && characterobject.c < 700) {
						if (
							this.co_j.x + 15 >= characterobject.x &&
							this.co_j.x <= characterobject.x + 48 &&
							this.co_j.y + 31 >= characterobject.y + 16 &&
							this.co_j.y <= characterobject.y + 47
						) {
							this.co_j.x = characterobject.x + 49;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (characterobject.c == 700) {
						if (
							this.j_tokugi != 10 &&
							this.j_tokugi != 12 &&
							this.j_tokugi != 13 &&
							this.co_j.x + 15 >= characterobject.x &&
							this.co_j.x <= characterobject.x + 16 &&
							this.co_j.y + 31 >= characterobject.y &&
							this.co_j.y <= characterobject.y + 31
						) {
							this.co_j.x = characterobject.x + 17;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (
						characterobject.c == 3100 &&
						this.co_j.x + 15 >= characterobject.x &&
						this.co_j.x + 15 <= characterobject.x + 31 &&
						this.co_j.y + 31 >= characterobject.y &&
						this.co_j.y <= characterobject.y + 127 &&
						j5 + 15 >= characterobject.x + 32
					) {
						this.co_j.x = characterobject.x + 32 - 15;
						this.co_j.vx = 0;
					}
				}
			}
			if (this.yuka_id_max >= 0) this.atariYuka(0);
			var i1 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
			var word14 = this.maps.map_bg[i1][rightShiftIgnoreSign(this.co_j.y, 5)];
			var l3 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
			var word6 = this.maps.map_bg[i1][l3];
			if (word14 >= 20 || word6 >= 20) {
				this.co_j.x = i1 * 32 + 17;
				this.co_j.vx = 0;
			}
			if (this.co_j.vx >= 0) this.j_cannon_c = 0;
		} else if (this.co_j.vx > 0) {
			this.co_j.x += rounddown(this.co_j.vx / 10);
			if (this.yuka_ride_id >= 0)
				if (this.yo[this.yuka_ride_id].con >= 200 && this.yo[this.yuka_ride_id].con < 300) {
					var j24 = this.getSLOY(
						this.yo[this.yuka_ride_id].x,
						this.yo[this.yuka_ride_id].y,
						this.yo[this.yuka_ride_id].x2,
						this.yo[this.yuka_ride_id].y2
					);
					if (j24 >= 0) {
						this.co_j.y = j24;
						if (
							this.yo[this.yuka_ride_id].y < this.yo[this.yuka_ride_id].y2 &&
							this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20
						)
							this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
					} else {
						this.co_j.y = this.yo[this.yuka_ride_id].y2 - 32;
						var l8;
						for (l8 = 0; l8 <= this.yuka_id_max; l8++) {
							if (
								this.yo[l8].con < 200 ||
								this.yo[l8].con >= 300 ||
								this.yo[l8].x != this.yo[this.yuka_ride_id].x2 ||
								this.yo[l8].y != this.yo[this.yuka_ride_id].y2
							)
								continue;
							var k24 = this.getSLOY(this.yo[l8].x, this.yo[l8].y, this.yo[l8].x2, this.yo[l8].y2);
							if (k24 < 0) continue;
							this.co_j.y = k24;
							break;
						}

						if (l8 > this.yuka_id_max)
							if (this.yo[this.yuka_ride_id].y >= this.yo[this.yuka_ride_id].y2) this.co_j.vy = 0;
							else this.co_j.vy = 75;
					}
				} else if (this.yo[this.yuka_ride_id].con >= 300 && this.yo[this.yuka_ride_id].con < 350) {
					var l24 = this.getSCOY(
						this.yo[this.yuka_ride_id].x,
						this.yo[this.yuka_ride_id].y,
						this.yo[this.yuka_ride_id].x2,
						this.yo[this.yuka_ride_id].y2
					);
					if (l24 >= 0) {
						this.co_j.y = l24;
						if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
							this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
					} else {
						var i25 = rounddown((this.yo[this.yuka_ride_id].x2 * 90) / 100);
						this.co_j.y =
							this.yo[this.yuka_ride_id].y -
							Math.floor(Math.sqrt(this.yo[this.yuka_ride_id].x2 * this.yo[this.yuka_ride_id].x2 - i25 * i25)) -
							32;
					}
				} else if (this.yo[this.yuka_ride_id].con >= 350 && this.yo[this.yuka_ride_id].con < 400) {
					var j25 = this.getSHCOY(
						this.yo[this.yuka_ride_id].x,
						this.yo[this.yuka_ride_id].y,
						this.yo[this.yuka_ride_id].x2,
						this.yo[this.yuka_ride_id].y2
					);
					if (j25 >= 0) {
						this.co_j.y = j25;
						if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
							this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
					} else {
						this.co_j.y = this.yo[this.yuka_ride_id].y + 32;
					}
				} else if (this.yo[this.yuka_ride_id].con >= 400 && this.yo[this.yuka_ride_id].con < 450) {
					var k25 = this.getSWUpOY(
						this.yo[this.yuka_ride_id].x,
						this.yo[this.yuka_ride_id].y,
						this.yo[this.yuka_ride_id].x2,
						this.yo[this.yuka_ride_id].y2
					);
					if (k25 >= 0) {
						this.co_j.y = k25;
						if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
							this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
					} else {
						this.co_j.y = this.yo[this.yuka_ride_id].y - 32;
						var i9 = 0;
						do {
							if (i9 > this.yuka_id_max) break;
							if (
								this.yo[i9].con >= 450 &&
								this.yo[i9].con < 500 &&
								this.yo[i9].x == this.yo[this.yuka_ride_id].x + 256 &&
								this.yo[i9].y == this.yo[this.yuka_ride_id].y
							) {
								var l25 = this.getSWDownOY(this.yo[i9].x, this.yo[i9].y, this.yo[i9].x2, this.yo[i9].y2);
								if (l25 >= 0) {
									this.co_j.y = l25;
									break;
								}
							}
							i9++;
						} while (true);
					}
				} else if (this.yo[this.yuka_ride_id].con >= 450 && this.yo[this.yuka_ride_id].con < 500) {
					var i26 = this.getSWDownOY(
						this.yo[this.yuka_ride_id].x,
						this.yo[this.yuka_ride_id].y,
						this.yo[this.yuka_ride_id].x2,
						this.yo[this.yuka_ride_id].y2
					);
					if (i26 >= 0) {
						this.co_j.y = i26;
						if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20)
							this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
					} else {
						this.co_j.y = this.yo[this.yuka_ride_id].y + 128 - 32;
						for (var j9 = 0; j9 <= this.yuka_id_max; j9++) {
							if (
								this.yo[j9].con < 450 ||
								this.yo[j9].con >= 500 ||
								this.yo[j9].x != this.yo[this.yuka_ride_id].x + 256 ||
								this.yo[j9].y != this.yo[this.yuka_ride_id].y + 128
							)
								continue;
							var j26 = this.getSWDownOY(this.yo[j9].x, this.yo[j9].y, this.yo[j9].x2, this.yo[j9].y2);
							if (j26 < 0) continue;
							this.co_j.y = j26;
							break;
						}
					}
				}
			if (this.co_j.jimen_f)
				if (word0 == 18) {
					if (i < rightShiftIgnoreSign(this.co_j.x + 15, 5)) {
						this.co_j.y = (j2 - 1) * 32;
						if (this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2 - 1] == 18)
							this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
						else if (this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2] == 19)
							this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 32);
						else if (
							this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2] < 18 &&
							this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2] != 15
						) {
							this.co_j.vy = this.co_j.vx * -1;
							if ((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && this.co_j.vy < -40)
								this.co_j.vy = -40;
							this.co_j.y += rounddown(this.co_j.vy / -10);
						}
					} else {
						this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
					}
				} else if (word0 == 19) {
					if (i < rightShiftIgnoreSign(this.co_j.x + 15, 5)) {
						this.co_j.y = j2 * 32;
						if (this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2] == 18)
							this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
						else if (this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2 + 1] == 19)
							this.co_j.y = this.getSakamichiY(this.co_j.x + 15, (j2 + 1) * 32);
						else if (this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2 + 1] < 18) {
							this.co_j.vy = this.co_j.vx;
							this.co_j.y += rounddown(this.co_j.vx / 10);
						}
					} else {
						this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
					}
				} else if ((word2 >= 20 || word2 == 10 || word2 == 15) && i < rightShiftIgnoreSign(this.co_j.x + 15, 5)) {
					this.co_j.y = j2 * 32;
					if (this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2 + 1] == 19)
						this.co_j.y = this.getSakamichiY(this.co_j.x + 15, (j2 + 1) * 32);
				}
			if (this.co_j.jimen_f) {
				var j1 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
				var word15 = this.maps.map_bg[j1][rightShiftIgnoreSign(this.co_j.y, 5)];
				var i4 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
				var word7 = this.maps.map_bg[j1][i4];
				if (
					((word15 == 19 && !this.map_data_option[j1][rightShiftIgnoreSign(this.co_j.y, 5)]) ||
						(word7 == 19 && !this.map_data_option[j1][i4])) &&
					i < j1 &&
					this.co_j.y > this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31)
				) {
					this.co_j.x = j1 * 32 - 16;
					this.co_j.vx = 0;
				}
			} else {
				var k1 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
				var word16 = this.maps.map_bg[k1][rightShiftIgnoreSign(this.co_j.y, 5)];
				var j4 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
				var word8 = this.maps.map_bg[k1][j4];
				if (
					word0 == 18 &&
					flag &&
					i < k1 &&
					(this.saka_mushi_y < 0 || (j4 != this.saka_mushi_y && j4 != this.saka_mushi_y + 1))
				) {
					this.co_j.y = j2 * 32 - 32;
					if (this.maps.map_bg[k1][j4] == 18) this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
				}
				if (
					((word16 == 19 && !this.map_data_option[k1][rightShiftIgnoreSign(this.co_j.y, 5)]) ||
						(word8 == 19 && !this.map_data_option[k1][j4])) &&
					i < k1
				) {
					this.co_j.x = k1 * 32 - 16;
					this.co_j.vx = 0;
				}
				if (word16 == 18 && !this.map_data_option[k1][rightShiftIgnoreSign(this.co_j.y, 5)] && i < k1) {
					this.co_j.x = k1 * 32 - 16;
					this.co_j.vx = 0;
				}
			}
			if (this.a_hf) {
				for (var k9 = 0; k9 <= this.a_kazu; k9++) {
					if (!this.co_a[k9].gf) continue;
					var characterobject1 = this.co_a[k9];
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
						continue;
					}
					if (characterobject1.c == 300) {
						if (
							characterobject1.c3 < 200 &&
							this.co_j.x + 15 >= characterobject1.x &&
							this.co_j.x <= characterobject1.x + 48 &&
							this.co_j.y + 31 >= characterobject1.y &&
							this.co_j.y <= characterobject1.y + 31
						) {
							this.co_j.x = characterobject1.x - 16;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (characterobject1.c >= 400 && characterobject1.c < 500) {
						if (
							this.co_j.x + 15 < characterobject1.x ||
							this.co_j.x > characterobject1.x + 80 ||
							this.co_j.y + 31 < characterobject1.y ||
							this.co_j.y > characterobject1.y + 63
						)
							continue;
						if (
							characterobject1.c4 == 16 &&
							characterobject1.c == 410 &&
							this.souko_count3 != 1 &&
							characterobject1.vx != 1
						) {
							if (
								this.maps.getBGCode(characterobject1.x, characterobject1.y + 64) < 18 &&
								this.maps.getBGCode(characterobject1.x + 31, characterobject1.y + 64) < 18 &&
								this.maps.getBGCode(characterobject1.x + 63, characterobject1.y + 64) < 18 &&
								this.maps.getBGCode(characterobject1.x + 95, characterobject1.y + 64) < 18
							) {
								var flag11 = false;
								var k29 = -1;
								var k12 = 0;
								do {
									if (k12 > this.a_kazu) break;
									if (
										this.co_a[k12].c == 410 &&
										this.co_a[k12].c4 == 16 &&
										k12 != k9 &&
										this.co_a[k12].x + 95 >= characterobject1.x &&
										this.co_a[k12].x <= characterobject1.x + 95 &&
										characterobject1.y + 64 >= this.co_a[k12].y &&
										characterobject1.y + 16 <= this.co_a[k12].y
									) {
										flag11 = true;
										characterobject1.y = this.co_a[k12].y - 64;
										k29 = k12;
										break;
									}
									k12++;
								} while (true);
								if (flag11) {
									var k26 = characterobject1.x;
									var k28 = characterobject1.x;
									characterobject1.x = this.co_j.x + 16;
									if (characterobject1.x > k26 + 4) {
										characterobject1.x = k26 + 4;
										if (this.co_j.vx > 40) this.co_j.vx = 40;
									}
									if (
										this.maps.getBGCode(characterobject1.x + 95, characterobject1.y) >= 18 ||
										this.maps.getBGCode(characterobject1.x + 95, characterobject1.y + 31) >= 18 ||
										this.maps.getBGCode(characterobject1.x + 95, characterobject1.y + 63) >= 18
									) {
										characterobject1.x = rightShiftIgnoreSign(characterobject1.x + 95, 5) * 32 - 96;
										this.co_j.vx = 0;
									}
									for (var l12 = 0; l12 <= this.a_kazu; l12++) {
										if (
											this.co_a[l12].c != 3000 ||
											this.co_a[l12].y != characterobject1.y ||
											k28 >= this.co_a[l12].x ||
											characterobject1.x < this.co_a[l12].x
										)
											continue;
										characterobject1.x = this.co_a[l12].x;
										this.co_j.vx = 0;
										if (this.co_a[l12].c3 == 1) characterobject1.vx = 1;
									}

									var flag12 = false;
									var i13 = 0;
									do {
										if (i13 > this.a_kazu) break;
										if (
											this.co_a[i13].c == 410 &&
											this.co_a[i13].c4 == 16 &&
											i13 != k9 &&
											this.co_a[i13].x + 95 >= characterobject1.x &&
											this.co_a[i13].x <= characterobject1.x + 95 &&
											characterobject1.y + 64 >= this.co_a[i13].y &&
											characterobject1.y + 16 <= this.co_a[i13].y
										) {
											flag12 = true;
											characterobject1.y = this.co_a[i13].y - 64;
											break;
										}
										i13++;
									} while (true);
									if (
										!flag12 &&
										this.maps.getBGCode(characterobject1.x, characterobject1.y + 64) < 18 &&
										this.maps.getBGCode(characterobject1.x + 31, characterobject1.y + 64) < 18 &&
										this.maps.getBGCode(characterobject1.x + 63, characterobject1.y + 64) < 18 &&
										this.maps.getBGCode(characterobject1.x + 95, characterobject1.y + 64) < 18
									) {
										if (k29 >= 0) characterobject1.x = this.co_a[k29].x + 96;
										else characterobject1.x = rightShiftIgnoreSign(characterobject1.x, 5) * 32;
										this.co_j.vx = 0;
									}
									if (
										k29 >= 0 &&
										this.co_a[k29].x + 96 <= characterobject1.x &&
										this.maps.getBGCode(this.co_a[k29].x + 96, characterobject1.y + 64) < 18 &&
										this.maps.getBGCode(this.co_a[k29].x + 96 + 31, characterobject1.y + 64) < 18 &&
										this.maps.getBGCode(this.co_a[k29].x + 96 + 63, characterobject1.y + 64) < 18 &&
										this.maps.getBGCode(this.co_a[k29].x + 96 + 95, characterobject1.y + 64) < 18
									)
										characterobject1.x = this.co_a[k29].x + 96;
									this.co_j.x = characterobject1.x - 16;
								} else {
									this.co_j.x = characterobject1.x - 16;
									this.co_j.vx = 0;
								}
								continue;
							}
							var l26 = characterobject1.x;
							var l28 = characterobject1.x;
							characterobject1.x = this.co_j.x + 16;
							if (characterobject1.x > l26 + 4) {
								characterobject1.x = l26 + 4;
								if (this.co_j.vx > 40) this.co_j.vx = 40;
							}
							if (
								this.maps.getBGCode(characterobject1.x + 95, characterobject1.y) >= 18 ||
								this.maps.getBGCode(characterobject1.x + 95, characterobject1.y + 31) >= 18 ||
								this.maps.getBGCode(characterobject1.x + 95, characterobject1.y + 63) >= 18
							) {
								characterobject1.x = rightShiftIgnoreSign(characterobject1.x + 95, 5) * 32 - 96;
								this.co_j.vx = 0;
							}
							for (var j13 = 0; j13 <= this.a_kazu; j13++)
								if (
									this.co_a[j13].c == 410 &&
									this.co_a[j13].c4 == 16 &&
									j13 != k9 &&
									this.co_a[j13].x + 95 >= characterobject1.x &&
									this.co_a[j13].x <= characterobject1.x + 95 &&
									characterobject1.y + 63 >= this.co_a[j13].y &&
									characterobject1.y <= this.co_a[j13].y + 63
								)
									characterobject1.x = this.co_a[j13].x - 96;

							if (
								this.maps.getBGCode(characterobject1.x, characterobject1.y + 64) < 18 &&
								this.maps.getBGCode(characterobject1.x + 31, characterobject1.y + 64) < 18 &&
								this.maps.getBGCode(characterobject1.x + 63, characterobject1.y + 64) < 18 &&
								this.maps.getBGCode(characterobject1.x + 95, characterobject1.y + 64) < 18
							)
								characterobject1.x = rightShiftIgnoreSign(characterobject1.x, 5) * 32;
							if (
								rightShiftIgnoreSign(characterobject1.x, 5) > rightShiftIgnoreSign(l28, 5) &&
								this.maps.getBGCode(rightShiftIgnoreSign(characterobject1.x, 5) * 32, characterobject1.y + 64) < 18 &&
								this.maps.getBGCode(rightShiftIgnoreSign(characterobject1.x, 5) * 32 + 31, characterobject1.y + 64) <
									18 &&
								this.maps.getBGCode(rightShiftIgnoreSign(characterobject1.x, 5) * 32 + 63, characterobject1.y + 64) <
									18 &&
								this.maps.getBGCode(rightShiftIgnoreSign(characterobject1.x, 5) * 32 + 95, characterobject1.y + 64) < 18
							)
								characterobject1.x = rightShiftIgnoreSign(characterobject1.x, 5) * 32;
							for (var k13 = 0; k13 <= this.a_kazu; k13++) {
								if (
									this.co_a[k13].c != 3000 ||
									this.co_a[k13].y != characterobject1.y ||
									l28 >= this.co_a[k13].x ||
									characterobject1.x < this.co_a[k13].x
								)
									continue;
								characterobject1.x = this.co_a[k13].x;
								this.co_j.vx = 0;
								if (this.co_a[k13].c3 == 1) characterobject1.vx = 1;
							}

							this.co_j.x = characterobject1.x - 16;
						} else {
							this.co_j.x = characterobject1.x - 16;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (characterobject1.c == 500) {
						if (
							this.co_j.x + 15 >= characterobject1.x &&
							this.co_j.x <= characterobject1.x + 80 &&
							this.co_j.y + 31 >= characterobject1.y &&
							this.co_j.y <= characterobject1.y + 13
						) {
							this.co_j.x = characterobject1.x - 16;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (characterobject1.c >= 600 && characterobject1.c < 700) {
						if (
							this.co_j.x + 15 >= characterobject1.x &&
							this.co_j.x <= characterobject1.x + 48 &&
							this.co_j.y + 31 >= characterobject1.y + 16 &&
							this.co_j.y <= characterobject1.y + 47
						) {
							this.co_j.x = characterobject1.x - 16;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (characterobject1.c == 700) {
						if (
							this.j_tokugi != 10 &&
							this.j_tokugi != 12 &&
							this.j_tokugi != 13 &&
							this.co_j.x + 15 >= characterobject1.x &&
							this.co_j.x <= characterobject1.x + 16 &&
							this.co_j.y + 31 >= characterobject1.y &&
							this.co_j.y <= characterobject1.y + 31
						) {
							this.co_j.x = characterobject1.x - 16;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (
						characterobject1.c == 3110 &&
						this.co_j.x + 15 >= characterobject1.x &&
						this.co_j.x + 15 <= characterobject1.x + 31 &&
						this.co_j.y + 31 >= characterobject1.y &&
						this.co_j.y <= characterobject1.y + 127 &&
						j5 + 15 < characterobject1.x
					) {
						this.co_j.x = characterobject1.x - 16;
						this.co_j.vx = 0;
					}
				}
			}
			if (this.yuka_id_max >= 0) this.atariYuka(1);
			var l1 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
			var word17 = this.maps.map_bg[l1][rightShiftIgnoreSign(this.co_j.y, 5)];
			var k4 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
			var word9 = this.maps.map_bg[l1][k4];
			if (word17 >= 20 || word9 >= 20) {
				this.co_j.x = l1 * 32 - 16;
				this.co_j.vx = 0;
			}
			if (this.co_j.vx <= 0) this.j_cannon_c = 0;
		}
		if (!this.j_mizu_f && this.checkWater(this.co_j.x + 15, this.co_j.y + 15)) {
			this.j_mizu_f = true;
			this.j_mizu_awa_c = 38;
		} else if (this.j_mizu_f && !this.checkWater(this.co_j.x + 15, this.co_j.y + 15)) {
			this.j_jump_type = 2;
			this.co_j.pt = 101;
			this.co_j.ac = 0;
			this.co_j.vy = 0;
			this.j_jump_level = 1;
		}
		if (this.co_j.jimen_f) {
			// 地面に足がついている
			if (this.gk.tr1_c >= 1 && this.gk.tr1_c <= 5) {
				if (
					this.jst_pc_attack == 1 &&
					this.gk.tr1_c == 1 &&
					this.gk.down_f &&
					this.j_cannon_c <= 0 &&
					((this.co_j.muki == 0 && this.maps.getBGCode(this.co_j.x + 14, this.co_j.y + 31) < 20) ||
						(this.co_j.muki == 1 && this.maps.getBGCode(this.co_j.x + 16, this.co_j.y + 31) < 20))
				) {
					this.j_zan_f = false;
					this.j_jet_c = 0;
					if (this.co_j.muki == 0) this.co_j.vx = -140;
					else this.co_j.vx = 140;
					this.co_j.vy = 0;
					this.j_jump_type = 0;
					this.co_j.ac = 0;
					this.j_jump_level = 5;
					this.j_djump_kf = true;
					this.co_j.pt = 1400;
					this.j_cannon_c = 18;
					this.j_cannon_type = 3;
					this.gs.rsAddSound(17);
				} else if (
					this.jst_pc_attack == 2 &&
					this.gk.tr1_c == 1 &&
					this.gk.down_f &&
					this.j_cannon_c <= 0 &&
					((this.co_j.muki == 0 && this.maps.getBGCode(this.co_j.x + 14, this.co_j.y + 31) < 20) ||
						(this.co_j.muki == 1 && this.maps.getBGCode(this.co_j.x + 16, this.co_j.y + 31) < 20))
				) {
					this.j_zan_f = false;
					this.j_jet_c = 0;
					if (this.co_j.muki == 0) this.co_j.vx = -140;
					else this.co_j.vx = 140;
					this.co_j.vy = 0;
					this.j_jump_type = 0;
					this.co_j.ac = 0;
					this.j_jump_level = 5;
					this.j_djump_kf = true;
					this.co_j.pt = 84;
					this.j_cannon_c = 18;
					this.j_cannon_type = 4;
					this.gs.rsAddSound(23);
				} else if (
					this.maps.getBGCode(this.co_j.x + 15, this.co_j.y - 1) >= 20 ||
					(this.maps.getBGCode(this.co_j.x + 15, this.co_j.y - 1) == 18 &&
						!this.map_data_option[rightShiftIgnoreSign(this.co_j.x + 15, 5)][rightShiftIgnoreSign(this.co_j.y - 1, 5)])
				) {
					if (
						((this.j_tokugi != 10 && this.j_tokugi != 12 && this.j_tokugi != 13) || !this.gk.z_f) &&
						this.gk.tr1_c == 1 &&
						this.maps.getBGCode(this.co_j.x + 15, this.co_j.y - 1) == 40
					) {
						var l14 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
						var l16 = rightShiftIgnoreSign(this.co_j.y - 1, 5);
						this.hAttack(l14, l16);
					}
					l29 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y - 1);
					if (
						((this.j_tokugi != 12 && this.j_tokugi != 13) || !this.gk.z_f) &&
						this.j_helm_f &&
						(l29 == 20 || (l29 == 69 && this.suberuyuka_hkf == 1))
					) {
						this.gk.tr1_c = 6;
						var i15 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
						var i17 = rightShiftIgnoreSign(this.co_j.y - 1, 5);
						if (
							this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][
								rightShiftIgnoreSign(this.co_j.y - 1, 5) + 1
							] == 4
						)
							this.maps.putBGCode(i15, i17, 4);
						else this.maps.putBGCode(i15, i17, 0);
						if (this.j_tokugi == 12 || this.j_tokugi == 13) {
							this.anaSet2(i15, i17);
						} else {
							this.mSet2(i15 * 32, i17 * 32, 80, 12, -24);
							this.mSet2(i15 * 32, i17 * 32, 80, -12, -24);
						}
						this.gs.rsAddSound(16);
						this.jZutuki(i15 * 32, i17 * 32 - 32, 0);
					}
				} else {
					if (this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) {
						if (this.gk.tr1_c == 1 && this.j_fire_f)
							if (this.gk.z_f) this.jmSet(this.co_j.x, this.co_j.y, 100);
							else if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 100);
							else this.jmSet(this.co_j.x, this.co_j.y, 105);
						if (
							this.gk.tr1_c > 0 &&
							this.j_jet_fuel > 0 &&
							!this.j_mizu_f &&
							!this.gk.z_f &&
							!this.gk.x_f &&
							this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) != 10
						) {
							this.j_jet_c = 100;
							this.j_jet_kf = true;
							this.co_j.vy = -90;
							this.j_jump_level = 1;
							this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32;
							this.co_j.vx = 0;
							if (this.j_jump_type == 2) this.j_jump_type = 0;
							if (this.gk.tr1_c == 1) this.gs.rsAddSound(26);
						}
					}
					if (
						((this.j_tokugi != 10 && this.j_tokugi != 12 && this.j_tokugi != 13) || this.j_mizu_f) &&
						this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) != 10
					)
						if (this.j_mizu_f) {
							this.j_jump_type = 0;
							this.co_j.pt = 83;
							this.co_j.ac = 0;
							this.j_mizu_ac = 0;
							this.j_jet_kf = false;
							if (this.j_jdai_f) {
								this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 5) * 32;
								this.co_j.vy = -120;
								this.j_jump_level = 0;
								this.gs.rsAddSound(3);
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
							if (this.jst_fire_xkey_only != 1 && this.j_fire_f)
								if (this.j_fire_type == 4) {
									if (this.co_jm[0].c == 0) {
										this.co_jm[0].c = 106;
										this.co_jm[0].x = this.co_j.x;
										this.co_jm[0].y = this.co_j.y;
										this.co_jm[0].vx = 20;
										this.co_jm[0].vy = 0;
										this.co_jm[0].c1 = 0;
										this.co_jm[0].c2 = 0;
										if (this.co_j.muki == 0) {
											this.co_jm[0].c = 101;
											this.co_jm[0].vx = -20;
										}
										this.jm_kazu++;
										this.gs.rsAddSound(23);
									}
									if (this.co_jm[1].c == 0) {
										this.co_jm[1].c = 106;
										this.co_jm[1].x = this.co_j.x;
										this.co_jm[1].y = this.co_j.y;
										this.co_jm[1].vx = 14;
										this.co_jm[1].vy = -14;
										this.co_jm[1].c1 = 0;
										this.co_jm[1].c2 = 0;
										if (this.co_j.muki == 0) {
											this.co_jm[1].c = 101;
											this.co_jm[1].vx = -14;
										}
										this.jm_kazu++;
										this.gs.rsAddSound(23);
									}
								} else if (this.j_fire_type == 5) {
									if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 110);
									else this.jmSet(this.co_j.x, this.co_j.y, 115);
								} else if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 100);
								else this.jmSet(this.co_j.x, this.co_j.y, 105);
							this.j_jet_kf = false;
							var i27 = Math.abs(this.co_j.vx);
							if (this.j_jdai_f) {
								this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 5) * 32;
								this.co_j.vy = -410;
								this.j_jump_level = 5;
								if (this.co_a[this.j_a_id].c3 <= 1) {
									this.co_j.vy = -230;
									this.gs.rsAddSound(3);
								} else {
									this.gs.rsAddSound(4);
									if (this.co_a[this.j_a_id].c4 == 1) {
										this.co_j.vy = -460;
										l29 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][
											rightShiftIgnoreSign(this.co_j.y - 1, 5)
										];
										if (l29 <= 9) {
											for (var j6 = 0; j6 <= 5; j6++) {
												this.j_zan_x[j6] = j5;
												this.j_zan_y[j6] = this.co_a[this.j_a_id].y - 32;
												this.j_zan_pt[j6] = 101;
												this.j_zan_pth[j6] = this.co_j.muki;
											}

											this.j_zan_p = 0;
											this.j_zan_c = 0;
											this.j_zan_nagasa = 5;
											this.j_zan_f = true;
											this.j_zan_cf = true;
										}
									}
								}
							} else if (this.jst_pc_attack == 1 && this.j_cannon_c > 0 && this.j_cannon_type == 3) {
								// サイコクラッシャーアタック使用時
								this.co_j.pt = 1400;
								if (this.j_cannon_c <= 5) {
									this.co_j.pt = 102;
									this.co_j.vx = 0;
									if (this.co_j.jimen_f) this.co_j.pt = 100;
								}
							} else if (this.jst_pc_attack == 2 && this.j_cannon_c > 0 && this.j_cannon_type == 4) {
								// ロケット頭突き使用時
								this.co_j.pt = 84;
								if (this.j_cannon_c <= 5) {
									this.co_j.pt = 102;
									this.co_j.vx = 0;
									if (this.co_j.jimen_f) this.co_j.pt = 100;
								}
							} else if (this.jst_syouryuuken == 1 && this.gk.tr1_c == 1 && this.gk.up_f) {
								// 昇龍拳使用時
								this.j_zan_f = false;
								this.j_jet_c = 0;
								this.co_j.vx = 0;
								this.co_j.vy = -140;
								this.j_jump_type = 0;
								this.co_j.ac = 0;
								this.j_jump_level = 5;
								this.j_djump_kf = true;
								this.co_j.pt = 1300;
								this.j_cannon_c = 9;
								this.j_cannon_type = 2;
								this.gs.rsAddSound(26);
							} else if (this.jst_syouryuuken == 2 && this.gk.tr1_c == 1 && this.gk.up_f) {
								// スカイアッパー使用時
								this.j_zan_f = false;
								this.j_jet_c = 0;
								this.co_j.vx = 0;
								this.co_j.vy = -140;
								this.j_jump_type = 0;
								this.co_j.ac = 0;
								this.j_jump_level = 5;
								this.j_djump_kf = true;
								this.co_j.pt = 210;
								this.j_cannon_c = 9;
								this.j_cannon_type = 5;
								this.gs.rsAddSound(23);
							} else if (this.jst_jump_level_fix == 1) {
								this.co_j.vy = -150;
								this.j_jump_level = 1;
								this.gs.rsAddSound(3);
							} else if (this.jst_jump_level_fix == 2) {
								this.co_j.vy = -190;
								this.j_jump_level = 1;
								this.gs.rsAddSound(3);
							} else if (this.jst_jump_level_fix == 3) {
								this.co_j.vy = -230;
								this.j_jump_level = 1;
								this.gs.rsAddSound(3);
							} else if (this.jst_jump_level_fix == 4) {
								this.co_j.vy = -260;
								this.j_jump_level = 1;
								this.gs.rsAddSound(3);
							} else if (i27 == 0) {
								this.co_j.vy = -150;
								this.j_jump_level = 1;
								this.gs.rsAddSound(3);
							} else if (i27 < 60) {
								this.co_j.vy = -230;
								this.j_jump_level = 2;
								this.gs.rsAddSound(3);
							} else if (i27 == 60) {
								this.co_j.vy = -260;
								this.j_jump_level = 3;
								this.gs.rsAddSound(3);
							} else if (i27 < 120) {
								this.co_j.vy = -290;
								this.j_jump_level = 4;
								this.gs.rsAddSound(3);
							} else {
								// スーパージャンプ中
								this.co_j.vy = -340;
								this.j_jump_level = 5;
								if (this.jst_high_sjump == 1) this.co_j.vy = -390;
								l29 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][
									rightShiftIgnoreSign(this.co_j.y - 1, 5)
								];
								const isThrough = this.maps.mp.map_data_option[rightShiftIgnoreSign(this.co_j.x + 15, 5)][
									rightShiftIgnoreSign(this.co_j.y - 1, 5)
								];
								if (l29 <= 9 || l29 === 15 || (l29 === 18 && isThrough) || (l29 === 19 && isThrough)) {
									for (var k6 = 0; k6 <= 5; k6++) {
										this.j_zan_x[k6] = j5;
										this.j_zan_y[k6] = k5;
										this.j_zan_pt[k6] = 101;
										this.j_zan_pth[k6] = this.co_j.muki;
									}

									this.j_zan_p = 0;
									this.j_zan_c = 0;
									this.j_zan_nagasa = 5;
									this.j_zan_f = true;
									this.j_zan_cf = true;
									this.gs.rsAddSound(4);
								}
							}
						}
				}
			} else if (
				(word0 != 18 && word0 != 19) ||
				this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][rightShiftIgnoreSign(this.co_j.y + 31, 5)] >= 18
			)
				this.co_j.vy = 0;
		} else {
			if (
				(this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) &&
				!this.j_hashigo_f &&
				!this.j_mizu_f &&
				Math.abs(rightShiftIgnoreSign(this.co_j.x, 5) * 32 - this.co_j.x) < 6
			)
				this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32;
			if (!this.j_mizu_f) {
				if (this.j_hashigo_f) {
					if (
						this.j_tokugi != 10 &&
						this.j_tokugi != 12 &&
						this.j_tokugi != 13 &&
						this.gk.tr1_c == 1 &&
						!this.gk.up_f &&
						!this.gk.down_f
					)
						if (
							this.co_j.muki == 0 &&
							this.maps.getBGCode(this.co_j.x - 1, this.co_j.y + 31) < 18 &&
							this.maps.getBGCode(this.co_j.x - 1, this.co_j.y) < 18 &&
							this.maps.getBGCode(this.co_j.x - 1, this.co_j.y + 31) != 10 &&
							this.maps.getBGCode(this.co_j.x - 1, this.co_j.y) != 10
						) {
							this.co_j.vy = 0;
							this.j_jump_level = 1;
							this.j_jump_type = 0;
							this.co_j.pt = 103;
							this.co_j.ac = 0;
							this.gs.rsAddSound(3);
							this.co_j.vx = -100;
							if (this.maps.getBGCode(this.co_j.x - 1, this.co_j.y - 32) < 20) {
								this.co_j.vy = -150;
								this.co_j.x -= 6;
							}
							this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 15, 5) * 32;
							this.j_hashigo_mushi_x = rightShiftIgnoreSign(this.co_j.x + 15, 5);
							this.j_hashigo_f = false;
						} else if (
							this.co_j.muki == 1 &&
							this.maps.getBGCode(this.co_j.x + 32, this.co_j.y + 31) < 18 &&
							this.maps.getBGCode(this.co_j.x + 32, this.co_j.y) < 18 &&
							this.maps.getBGCode(this.co_j.x + 32, this.co_j.y + 31) != 10 &&
							this.maps.getBGCode(this.co_j.x + 32, this.co_j.y) != 10
						) {
							this.co_j.vy = 0;
							this.j_jump_level = 1;
							this.j_jump_type = 0;
							this.co_j.pt = 103;
							this.co_j.ac = 0;
							this.gs.rsAddSound(3);
							this.co_j.vx = 100;
							if (this.maps.getBGCode(this.co_j.x + 32, this.co_j.y - 32) < 20) {
								this.co_j.vy = -150;
								this.co_j.x += 6;
							}
							this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 15, 5) * 32;
							this.j_hashigo_mushi_x = rightShiftIgnoreSign(this.co_j.x + 15, 5);
							this.j_hashigo_f = false;
						}
				} else {
					if (this.j_cannon_c <= 0) this.co_j.vy += 25;
					if (this.co_j.vy > 160) this.co_j.vy = 160;
					if (
						this.jst_slow_down == 1 &&
						this.j_cannon_c <= 0 &&
						this.j_jump_type != 6 &&
						this.j_jump_type != 7 &&
						this.co_j.vy > 0
					) {
						// 落ちるのが遅い
						this.co_j.vy -= 10;
						if (this.co_j.vy > 70) this.co_j.vy = 70;
					}
					if (this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) {
						// ジャンプできない時 ゆっくりと落ちる
						if (this.co_j.vy >= 0) this.co_j.vy += 5;
						if (this.co_j.vy > 90) this.co_j.vy = 90;
					}
					if (this.jst_key_down == 1 && this.down_key_c == 1) {
						// 下キーを押すと急降下で急降下中
						if (this.j_jump_type != 6)
							if (this.j_jump_type == 1) {
								if (this.co_j.vy < 100) {
									this.co_j.vx = 0;
									this.j_jump_type = 6;
									this.co_j.vy = 100;
								} else {
									this.j_jump_type = 6;
								}
							} else {
								this.co_j.vx = 0;
								this.j_jump_type = 6;
								if (this.co_j.vy < 100) this.co_j.vy = 100;
							}
					} else if (this.jst_key_down == 2 && this.down_key_c == 1 && this.j_jump_type != 7) {
						// 流星キック使用時
						this.co_j.vx = 0;
						this.j_jump_type = 7;
						if (this.co_j.vy < 100) this.co_j.vy = 100;
						this.gs.rsAddSound(18);
					}
					if (this.jst_double_jump == 1 && this.j_djump_kf && this.gk.tr1_c == 1 && !flag21) {
						// 空中でもう１回ジャンプ
						this.j_djump_kf = false;
						var j27 = Math.abs(this.co_j.vx);
						if (j27 < 60) {
							this.co_j.vy = -230;
							this.j_jump_level = 2;
							this.j_jump_type = 0;
							this.gs.rsAddSound(3);
						} else {
							this.co_j.vy = -260;
							this.j_jump_level = 3;
							this.j_jump_type = 0;
							this.gs.rsAddSound(3);
						}
					}
					if (this.j_jump_type == 5 && this.co_j.vy > 0) {
						this.co_j.vy -= 5;
						if (this.co_j.vy > 140) this.co_j.vy = 140;
					}
				}
				if (this.jst_fire_xkey_only != 1 && this.gk.tr1_c == 1 && this.j_fire_f)
					if (this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) {
						if (this.gk.z_f) this.jmSet(this.co_j.x, this.co_j.y, 100);
						else if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 100);
						else this.jmSet(this.co_j.x, this.co_j.y, 105);
					} else if (this.j_fire_type == 4) {
						if (this.co_jm[0].c == 0) {
							this.co_jm[0].c = 106;
							this.co_jm[0].x = this.co_j.x;
							this.co_jm[0].y = this.co_j.y;
							this.co_jm[0].vx = 20;
							this.co_jm[0].vy = 0;
							this.co_jm[0].c1 = 0;
							this.co_jm[0].c2 = 0;
							if (this.co_j.muki == 0) {
								this.co_jm[0].c = 101;
								this.co_jm[0].vx = -20;
							}
							this.jm_kazu++;
							this.gs.rsAddSound(23);
						}
						if (this.co_jm[1].c == 0) {
							this.co_jm[1].c = 106;
							this.co_jm[1].x = this.co_j.x;
							this.co_jm[1].y = this.co_j.y;
							this.co_jm[1].vx = 14;
							this.co_jm[1].vy = -14;
							this.co_jm[1].c1 = 0;
							this.co_jm[1].c2 = 0;
							if (this.co_j.muki == 0) {
								this.co_jm[1].c = 101;
								this.co_jm[1].vx = -14;
							}
							this.jm_kazu++;
							this.gs.rsAddSound(23);
						}
					} else if (this.j_fire_type == 5) {
						if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 110);
						else this.jmSet(this.co_j.x, this.co_j.y, 115);
					} else if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 100);
					else this.jmSet(this.co_j.x, this.co_j.y, 105);
				if (this.gk.tr1_c == 0) this.j_jet_kf = true;
				if (this.j_hashigo_f) this.j_jet_kf = false;
				if ((this.j_tokugi != 10 && this.j_tokugi != 12 && this.j_tokugi != 13) || (!this.gk.z_f && !this.gk.x_f))
					if (this.j_jet_kf && this.gk.tr1_c > 0 && this.j_jet_fuel > 0 && !this.j_mizu_f) {
						this.j_jet_c = 100;
						if (this.j_jump_type == 2) this.j_jump_type = 0;
						if (this.gk.tr1_c == 1) this.gs.rsAddSound(26);
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
						if ((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && this.co_j.vy < -90)
							this.co_j.vy = -90;
					}
				}
			} else {
				if (this.gk.left_f) this.co_j.muki = 0;
				else if (this.gk.right_f) this.co_j.muki = 1;
				if (this.gk.tr1_c == 1) {
					var flag17 = false;
					l29 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][
						rightShiftIgnoreSign(this.co_j.y + 15, 5) - 1
					];
					if (l29 <= 9 && l29 != 4) flag17 = true;
					if (
						(l29 == 8 || l29 == 9) &&
						this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][
							rightShiftIgnoreSign(this.co_j.y + 15, 5) - 1
						] == 4
					)
						flag17 = false;
					if (flag17 && (this.co_j.y + 15) % 32 <= 8) {
						this.j_jump_type = 0;
						this.co_j.pt = 101;
						this.co_j.ac = 0;
						this.co_j.vy = -180;
						this.j_jump_level = 1;
						this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 15, 5) * 32 - 14;
						this.j_jet_kf = false;
						flag1 = true;
						if (this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13)
							if (
								(this.co_j.x + 15) % 32 <= 6 &&
								(this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][
									rightShiftIgnoreSign(this.co_j.y + 15, 5)
								] >= 20 ||
									this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][
										rightShiftIgnoreSign(this.co_j.y + 15, 5)
									] == 18)
							) {
								this.co_j.vx = -30;
								this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 - 15;
							} else if (
								(this.co_j.x + 15) % 32 >= 25 &&
								this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) + 1][
									rightShiftIgnoreSign(this.co_j.y + 15, 5)
								] >= 19
							) {
								this.co_j.vx = 30;
								this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 16;
							} else {
								this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32;
							}
						this.mSet(this.co_j.x, rightShiftIgnoreSign(this.co_j.y + 15, 5) * 32 - 32, 50);
						this.gs.rsAddSound(20);
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
		}
		if (this.co_j.vy < 0) {
			var i3 = rightShiftIgnoreSign(this.co_j.y, 5);
			var k27 = this.co_j.vy;
			if (k27 < -320) k27 = -320;
			this.co_j.y += rounddown(k27 / 10);
			if (this.j_hashigo_f && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) <= 9) {
				this.j_hashigo_f = false;
				this.co_j.vy = 0;
			}
			if (this.j_mizu_f && !flag1) {
				var i20 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15);
				var flag18 = false;
				if (i20 <= 9 && i20 != 4) flag18 = true;
				if (
					(i20 == 8 || i20 == 9) &&
					this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][rightShiftIgnoreSign(this.co_j.y + 15, 5)] ==
						4
				)
					flag18 = false;
				if (flag18) {
					this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 15, 5) * 32 + 17;
					this.co_j.vy = -10;
				}
			}
			if (
				rightShiftIgnoreSign(this.co_j.x + 15, 5) != this.j_hashigo_mushi_x &&
				(this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15) == 10 ||
					this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) == 10)
			) {
				var flag13 = false;
				var l13 = 0;
				do {
					if (l13 > this.a_kazu) break;
					if (
						this.co_a[l13].c == 410 &&
						this.co_a[l13].x <= rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 15 &&
						this.co_a[l13].x + 95 >= rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 15 &&
						rightShiftIgnoreSign(this.co_j.y, 3) * 8 + 31 >= this.co_a[l13].y &&
						rightShiftIgnoreSign(this.co_j.y, 3) * 8 <= this.co_a[l13].y + 63
					) {
						flag13 = true;
						break;
					}
					l13++;
				} while (true);
				if (!flag13) {
					this.j_hashigo_f = true;
					this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 3) * 8;
				}
			}
			if (this.a_hf) {
				for (var l9 = 0; l9 <= this.a_kazu; l9++) {
					if (!this.co_a[l9].gf) continue;
					var characterobject2 = this.co_a[l9];
					if (characterobject2.c == 85) {
						if (
							this.co_j.x + 15 >= characterobject2.x &&
							this.co_j.x + 15 <= characterobject2.x + 31 &&
							this.co_j.y >= characterobject2.y &&
							this.co_j.y <= characterobject2.y + 31
						) {
							this.co_j.y = characterobject2.y + 32;
							this.co_j.vy = 0;
							characterobject2.c = 0;
							this.maps.putBGCode(
								rightShiftIgnoreSign(characterobject2.x, 5),
								rightShiftIgnoreSign(characterobject2.y, 5),
								23
							);
							this.gs.rsAddSound(13);
						}
						continue;
					}
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
						continue;
					}
					if (characterobject2.c == 300) {
						if (
							characterobject2.c3 < 200 &&
							this.co_j.x + 15 >= characterobject2.x &&
							this.co_j.x <= characterobject2.x + 48 &&
							this.co_j.y + 31 >= characterobject2.y &&
							this.co_j.y <= characterobject2.y + 31
						) {
							this.co_j.y = characterobject2.y + 32;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (characterobject2.c >= 400 && characterobject2.c < 500) {
						if (
							this.co_j.x + 15 < characterobject2.x ||
							this.co_j.x > characterobject2.x + 80 ||
							this.co_j.y + 31 < characterobject2.y ||
							this.co_j.y > characterobject2.y + 63
						)
							continue;
						if (characterobject2.c4 == 17 && characterobject2.c == 410) {
							this.co_j.y = characterobject2.y + 64;
							this.co_j.vy = 0;
							if (
								characterobject2.y != characterobject2.vy ||
								(this.maps.getBGCode(characterobject2.x, characterobject2.y - 1) >= 18 &&
									this.maps.getBGCode(characterobject2.x + 31, characterobject2.y - 1) >= 18 &&
									this.maps.getBGCode(characterobject2.x + 63, characterobject2.y - 1) >= 18 &&
									this.maps.getBGCode(characterobject2.x + 95, characterobject2.y - 1) >= 18)
							)
								continue;
							characterobject2.vy = rightShiftIgnoreSign(characterobject2.vy - 32, 5) * 32;
							if (characterobject2.vy < 320) characterobject2.vy = 320;
							else this.gs.rsAddSound(12);
						} else {
							this.co_j.y = characterobject2.y + 64;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (characterobject2.c == 500) {
						if (
							this.co_j.x + 15 >= characterobject2.x &&
							this.co_j.x <= characterobject2.x + 80 &&
							this.co_j.y + 31 >= characterobject2.y &&
							this.co_j.y <= characterobject2.y + 13
						) {
							this.co_j.y = characterobject2.y + 14;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (characterobject2.c >= 600 && characterobject2.c < 700) {
						if (
							this.co_j.x + 15 >= characterobject2.x &&
							this.co_j.x <= characterobject2.x + 48 &&
							this.co_j.y + 31 >= characterobject2.y + 16 &&
							this.co_j.y <= characterobject2.y + 47
						) {
							this.co_j.y = characterobject2.y + 48;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (characterobject2.c == 700) {
						if (
							this.co_j.x + 15 >= characterobject2.x &&
							this.co_j.x <= characterobject2.x + 16 &&
							this.co_j.y + 31 >= characterobject2.y &&
							this.co_j.y <= characterobject2.y + 31
						) {
							this.co_j.y = characterobject2.y + 32;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (
						characterobject2.c == 3130 &&
						this.co_j.x + 15 >= characterobject2.x &&
						this.co_j.x + 15 <= characterobject2.x + 127 &&
						this.co_j.y + 31 >= characterobject2.y &&
						this.co_j.y <= characterobject2.y + 31 &&
						k5 > characterobject2.y + 31
					) {
						this.co_j.y = characterobject2.y + 32;
						this.co_j.vy = 0;
					}
				}
			}
			if (this.yuka_id_max >= 0) this.atariYuka(2);
			var i5 = rightShiftIgnoreSign(this.co_j.y, 5);
			var word18 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][i5];
			if (word18 >= 20) {
				this.co_j.y = i5 * 32 + 32;
				this.co_j.vy = 0;
				if (word18 == 40) {
					var j15 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
					var j17 = rightShiftIgnoreSign(this.co_j.y - 1, 5);
					this.hAttack(j15, j17);
				}
				if (this.j_helm_f && (word18 == 20 || (word18 == 69 && this.suberuyuka_hkf == 1))) {
					var k15 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
					var k17 = i5;
					if (this.maps.map_bg[k15][k17 + 1] == 4) this.maps.putBGCode(k15, k17, 4);
					else this.maps.putBGCode(k15, k17, 0);
					if (this.j_tokugi == 12 || this.j_tokugi == 13) {
						this.anaSet2(k15, k17);
					} else {
						this.mSet2(k15 * 32, k17 * 32, 80, 12, -24);
						this.mSet2(k15 * 32, k17 * 32, 80, -12, -24);
					}
					this.gs.rsAddSound(16);
					this.jZutuki(k15 * 32, k17 * 32 - 32, 0);
				}
			}
			i5 = rightShiftIgnoreSign(this.co_j.y, 5);
			word18 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][i5];
			if (
				i3 > i5 &&
				(word18 == 18 || word18 == 19) &&
				!this.map_data_option[rightShiftIgnoreSign(this.co_j.x + 15, 5)][i5]
			) {
				this.co_j.y = i5 * 32 + 32;
				this.co_j.vy = 0;
				i5 = rightShiftIgnoreSign(this.co_j.y, 5);
			}
			if (i3 > i5) {
				if (this.gk.right_f) {
					var word24 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 16, 5)][i3];
					var word32 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 16, 5)][i5];
					if (word24 <= 17 && word32 >= 20) {
						this.co_j.y = i5 * 32 + 32;
						this.co_j.vy = 0;
					}
				}
				if (this.gk.left_f) {
					var word25 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 14, 5)][i3];
					var word33 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 14, 5)][i5];
					if (word25 <= 17 && word33 >= 20) {
						this.co_j.y = i5 * 32 + 32;
						this.co_j.vy = 0;
					}
				}
			}
			if (this.j_cannon_c > 0 && this.co_j.vy >= 0) {
				this.j_cannon_c = 0;
				if (this.co_j.vx < -120) this.co_j.vx = -120;
				if (this.co_j.vx > 120) this.co_j.vx = 120;
			}
		} else if (this.co_j.vy > 0) {
			var j = rightShiftIgnoreSign(this.co_j.x + 15, 5);
			var k2 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
			this.co_j.y += rounddown(this.co_j.vy / 10);
			if (
				rightShiftIgnoreSign(this.co_j.x + 15, 5) != this.j_hashigo_mushi_x &&
				this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15) == 10
			) {
				var flag14 = false;
				var i14 = 0;
				do {
					if (i14 > this.a_kazu) break;
					if (
						this.co_a[i14].c == 410 &&
						this.co_a[i14].x <= rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 15 &&
						this.co_a[i14].x + 95 >= rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 15 &&
						rightShiftIgnoreSign(this.co_j.y, 3) * 8 + 31 >= this.co_a[i14].y &&
						rightShiftIgnoreSign(this.co_j.y, 3) * 8 <= this.co_a[i14].y + 63
					) {
						flag14 = true;
						break;
					}
					i14++;
				} while (true);
				if (!flag14) {
					this.j_hashigo_f = true;
					this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 3) * 8;
				}
			}
			if (this.a_hf) {
				for (var i10 = 0; i10 <= this.a_kazu; i10++) {
					if (!this.co_a[i10].gf) continue;
					var characterobject3 = this.co_a[i10];
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
						continue;
					}
					if (characterobject3.c == 300) {
						if (
							characterobject3.c3 < 200 &&
							this.co_j.x + 15 >= characterobject3.x &&
							this.co_j.x <= characterobject3.x + 48 &&
							this.co_j.y + 31 >= characterobject3.y &&
							this.co_j.y <= characterobject3.y + 31
						) {
							this.co_j.y = characterobject3.y - 32;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (characterobject3.c >= 400 && characterobject3.c < 500) {
						if (
							this.co_j.x + 15 >= characterobject3.x &&
							this.co_j.x <= characterobject3.x + 80 &&
							this.co_j.y + 31 >= characterobject3.y &&
							this.co_j.y <= characterobject3.y + 63
						) {
							this.co_j.y = characterobject3.y - 32;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (characterobject3.c == 500) {
						if (
							this.co_j.x + 15 >= characterobject3.x &&
							this.co_j.x <= characterobject3.x + 80 &&
							this.co_j.y + 31 >= characterobject3.y &&
							this.co_j.y <= characterobject3.y + 13
						) {
							this.co_j.y = characterobject3.y - 32;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (characterobject3.c >= 600 && characterobject3.c < 700) {
						if (
							this.co_j.x + 15 >= characterobject3.x &&
							this.co_j.x <= characterobject3.x + 48 &&
							this.co_j.y + 31 >= characterobject3.y + 16 &&
							this.co_j.y <= characterobject3.y + 47
						) {
							this.co_j.y = characterobject3.y + 16 - 32;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (characterobject3.c == 700) {
						if (
							this.co_j.x + 15 >= characterobject3.x &&
							this.co_j.x <= characterobject3.x + 16 &&
							this.co_j.y + 31 >= characterobject3.y &&
							this.co_j.y <= characterobject3.y + 31
						) {
							this.co_j.y = characterobject3.y - 32;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (
						characterobject3.c == 3120 &&
						this.co_j.x + 15 >= characterobject3.x &&
						this.co_j.x + 15 <= characterobject3.x + 127 &&
						this.co_j.y + 31 >= characterobject3.y &&
						this.co_j.y <= characterobject3.y &&
						k5 <= characterobject3.y - 32
					) {
						this.co_j.y = characterobject3.y - 32;
						this.co_j.vy = 0;
					}
				}
			}
			if (this.yuka_id_max >= 0) this.atariYuka(3);
			if (this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) {
				if (this.ana_kazu > 0) {
					for (var l6 = 0; l6 <= this.t_kazu; l6++)
						if (
							(this.co_t[l6].c == 1250 || this.co_t[l6].c == 1310) &&
							this.co_j.x + 15 >= this.co_t[l6].x &&
							this.co_j.x + 15 <= this.co_t[l6].x + 31 &&
							this.co_j.y + 31 >= this.co_t[l6].y &&
							this.co_j.y <= this.co_t[l6].y + 31
						)
							this.co_j.y = this.co_t[l6].y - 32;
				}
				var i7 = 0;
				do {
					if (i7 > this.t_kazu) break;
					if (
						this.co_t[i7].c >= 1200 &&
						this.co_t[i7].c <= 1220 &&
						Math.abs(this.co_j.x - this.co_t[i7].x) <= 24 &&
						this.co_j.y + 32 > this.co_t[i7].y &&
						this.co_j.y + 32 - 12 < this.co_t[i7].y
					) {
						this.co_j.y = this.co_t[i7].y - 32;
						break;
					}
					i7++;
				} while (true);
			}
			var l4 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
			var word10 = this.maps.map_bg[j][l4];
			if (k2 < l4) {
				var word34 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][k2];
				if (word34 == 18 || word34 == 19)
					if (this.map_data_option[rightShiftIgnoreSign(this.co_j.x + 15, 5)][k2]) {
						if (this.saka_mushi_y < 0 || (k2 != this.saka_mushi_y && k2 != this.saka_mushi_y + 1)) {
							this.co_j.vy = 0;
							this.co_j.y = k2 * 32;
							if (
								this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][
									rightShiftIgnoreSign(this.co_j.y + 31, 5)
								] == 18 ||
								this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][
									rightShiftIgnoreSign(this.co_j.y + 31, 5)
								] == 19
							)
								this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
						}
					} else {
						this.co_j.y = k2 * 32;
						this.co_j.vy = 0;
					}
			}
			l29 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][rightShiftIgnoreSign(this.co_j.y + 31, 5)];
			if (l29 == 18 || l29 == 19)
				if (
					this.map_data_option[rightShiftIgnoreSign(this.co_j.x + 15, 5)][rightShiftIgnoreSign(this.co_j.y + 31, 5)]
				) {
					if (this.saka_mushi_y < 0 || rightShiftIgnoreSign(this.co_j.y + 31, 5) != this.saka_mushi_y) {
						var l17 = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
						if (l17 < this.co_j.y && l17 >= k5) this.co_j.y = l17;
					}
				} else {
					var i18 = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
					if (i18 < this.co_j.y) this.co_j.y = i18;
				}
			l4 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
			word10 = this.maps.map_bg[j][l4];
			var flag20;
			if (word10 == 15 && k2 < l4) {
				flag20 = true;
				this.j_jump_type = 2;
				if (this.j_shitakara_mushi_y > 0 && this.j_shitakara_mushi_y == l4) flag20 = false;
			} else {
				flag20 = false;
			}
			if (word10 == 10 && !this.j_hashigo_f) flag20 = true;
			if (word10 >= 20 || flag20) {
				this.co_j.y = l4 * 32 - 32;
				this.co_j.vy = 0;
				l4 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
			}
			if (this.j_hashigo_f) {
				var word41 = this.maps.map_bg[j][rightShiftIgnoreSign(this.co_j.y + 32, 5)];
				if (word41 >= 20) {
					this.j_hashigo_f = false;
					this.j_shitakara_mushi_y = -1;
					this.co_j.direction = 0;
				}
			}
			if (k2 < l4 && !this.j_hashigo_f) {
				if (this.gk.right_f || this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) {
					var word26 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 16, 5)][k2];
					var word35 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 16, 5)][l4];
					if (word35 == 10) word35 = 20;
					if (word26 <= 17 && word35 >= 20) {
						this.co_j.y = l4 * 32 - 32;
						this.co_j.vy = 0;
						this.co_j.pt = 103;
						this.co_j.ac = 1;
						this.co_j.x++;
						if (word35 == 18 || word35 == 19) this.co_j.y = this.getSakamichiY(this.co_j.x, this.co_j.y + 32);
					}
				}
				if (this.gk.left_f || this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) {
					var word27 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 14, 5)][k2];
					var word36 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 14, 5)][l4];
					if (word36 == 10) word36 = 20;
					if (word27 <= 17 && word36 >= 20) {
						this.co_j.y = l4 * 32 - 32;
						this.co_j.vy = 0;
						this.co_j.pt = 103;
						this.co_j.ac = 1;
						this.co_j.x--;
						if (word36 == 18 || word36 == 19) this.co_j.y = this.getSakamichiY(this.co_j.x, this.co_j.y + 32);
					}
				}
			}
			if (!this.j_mizu_f) {
				var j20 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15);
				if (j20 == 4) {
					this.j_mizu_awa_c = 38;
					if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15 - 32) != 10) {
						this.mSet(this.co_j.x, rightShiftIgnoreSign(this.co_j.y + 15, 5) * 32 - 32, 50);
						this.gs.rsAddSound(20);
					}
					if (this.co_j.vx < -60) this.co_j.vx = -60;
					else if (this.co_j.vx > 60) this.co_j.vx = 60;
				} else if (
					(j20 == 8 || j20 == 9) &&
					this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][rightShiftIgnoreSign(this.co_j.y + 15, 5)] ==
						4
				) {
					this.mSet(this.co_j.x, rightShiftIgnoreSign(this.co_j.y + 15, 5) * 32 - 32, 50);
					this.j_mizu_awa_c = 38;
					if (this.co_j.vx < -60) this.co_j.vx = -60;
					else if (this.co_j.vx > 60) this.co_j.vx = 60;
				}
			}
			if (this.j_cannon_c > 0 && this.co_j.vy <= 0) {
				this.j_cannon_c = 0;
				if (this.co_j.vx < -120) this.co_j.vx = -120;
				if (this.co_j.vx > 120) this.co_j.vx = 120;
			}
		}
		if (this.gk.down_f) {
			var i29 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31);
			if (
				(i29 == 18 || i29 == 19) &&
				this.map_data_option[rightShiftIgnoreSign(this.co_j.x + 15, 5)][rightShiftIgnoreSign(this.co_j.y + 31, 5)]
			) {
				this.saka_mushi_y = rightShiftIgnoreSign(this.co_j.y + 31, 5);
				if (this.co_j.vy < 25) this.co_j.vy = 25;
			}
			if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32) == 15) {
				this.j_shitakara_mushi_y = rightShiftIgnoreSign(this.co_j.y + 32, 5);
				this.j_jump_type = 2;
				this.co_j.ac = 0;
				this.saka_mushi_y = rightShiftIgnoreSign(this.co_j.y + 31, 5);
				if (this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) {
					this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32;
					this.co_j.vx = 0;
				}
				if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15) == 10) {
					var flag15 = false;
					var j14 = 0;
					do {
						if (j14 > this.a_kazu) break;
						if (
							this.co_a[j14].c == 410 &&
							this.co_a[j14].x <= rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 15 &&
							this.co_a[j14].x + 95 >= rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 15 &&
							this.co_j.y + 31 >= this.co_a[j14].y &&
							this.co_j.y <= this.co_a[j14].y + 63
						) {
							flag15 = true;
							break;
						}
						j14++;
					} while (true);
					if (!flag15) this.j_hashigo_f = true;
				}
			}
		}
		if (this.j_hashigo_f) this.co_j.pt = 210 + rightShiftIgnoreSign(this.co_j.ac, 1);
		if ((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && this.gk.tr1_c == 1 && !this.gk.z_f) {
			if (this.j_tail_f && (this.j_tail_ac <= 0 || this.j_tail_ac >= 8)) {
				this.j_tail_ac = 1;
				this.co_j.pt = 116;
				this.j_zan_f = false;
			}
			if (this.j_gr_kazu > 0)
				if (this.grenade_type == 8) {
					// ファイヤーボールを発射
					if (this.j_fire_f) this.j_gr_kazu = 1;
					if (this.co_jm[0].c == 0 || this.co_jm[1].c == 0) {
						this.j_gr_kazu--;
						if (this.j_fire_type == 4) {
							// ファイヤーボール ダブル
							if (this.co_jm[0].c == 0) {
								this.co_jm[0].c = 106;
								this.co_jm[0].x = this.co_j.x;
								this.co_jm[0].y = this.co_j.y;
								this.co_jm[0].vx = 20;
								this.co_jm[0].vy = 0;
								this.co_jm[0].c1 = 0;
								this.co_jm[0].c2 = 0;
								if (this.co_j.muki == 0) {
									this.co_jm[0].c = 101;
									this.co_jm[0].vx = -20;
								}
								this.jm_kazu++;
								this.gs.rsAddSound(23);
							}
							if (this.co_jm[1].c == 0) {
								this.co_jm[1].c = 106;
								this.co_jm[1].x = this.co_j.x;
								this.co_jm[1].y = this.co_j.y;
								this.co_jm[1].vx = 14;
								this.co_jm[1].vy = -14;
								this.co_jm[1].c1 = 0;
								this.co_jm[1].c2 = 0;
								if (this.co_j.muki == 0) {
									this.co_jm[1].c = 101;
									this.co_jm[1].vx = -14;
								}
								this.jm_kazu++;
								this.gs.rsAddSound(23);
							}
						} else if (this.j_fire_type == 5) {
							// ファイヤーボール ホーミングアミュレット
							if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 110);
							else this.jmSet(this.co_j.x, this.co_j.y, 115);
						} else {
							// ファイヤーボール その他
							if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 100);
							else this.jmSet(this.co_j.x, this.co_j.y, 105);
						}
					}
				} else if (this.grenade_type == 7) {
					// 夢想封印
					this.jmSet2(this.co_j.x, this.co_j.y, 50, 2);
				} else if (this.grenade_type == 3 || this.grenade_type == 4) {
					// エネルギー砲
					if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 60);
					else this.jmSet(this.co_j.x, this.co_j.y, 65);
				} else if (this.grenade_type == 9) {
					// ブロック１破壊砲
					if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 1207);
					else this.jmSet(this.co_j.x, this.co_j.y, 1206);
				} else {
					// グレネード
					if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 200);
					else this.jmSet(this.co_j.x, this.co_j.y, 205);
				}
		}
		if (this.grenade_type == 8 && this.j_fire_f) this.j_gr_kazu = 0;
		if (this.tr2_c == 1) {
			if (!this.j_hashigo_f || this.gk.x_f)
				if (this.j_gr_kazu > 0) {
					if (this.j_tokugi != 10 && this.j_tokugi != 12 && this.j_tokugi != 13)
						if (this.grenade_type == 8) {
							if (this.j_fire_f) this.j_gr_kazu = 1;
							if (this.co_jm[0].c == 0 || this.co_jm[1].c == 0) {
								this.j_gr_kazu--;
								if (this.j_fire_type == 4) {
									if (this.co_jm[0].c == 0) {
										this.co_jm[0].c = 106;
										this.co_jm[0].x = this.co_j.x;
										this.co_jm[0].y = this.co_j.y;
										this.co_jm[0].vx = 20;
										this.co_jm[0].vy = 0;
										this.co_jm[0].c1 = 0;
										this.co_jm[0].c2 = 0;
										if (this.co_j.muki == 0) {
											this.co_jm[0].c = 101;
											this.co_jm[0].vx = -20;
										}
										this.jm_kazu++;
										this.gs.rsAddSound(23);
									}
									if (this.co_jm[1].c == 0) {
										this.co_jm[1].c = 106;
										this.co_jm[1].x = this.co_j.x;
										this.co_jm[1].y = this.co_j.y;
										this.co_jm[1].vx = 14;
										this.co_jm[1].vy = -14;
										this.co_jm[1].c1 = 0;
										this.co_jm[1].c2 = 0;
										if (this.co_j.muki == 0) {
											this.co_jm[1].c = 101;
											this.co_jm[1].vx = -14;
										}
										this.jm_kazu++;
										this.gs.rsAddSound(23);
									}
								} else if (this.j_fire_type == 5) {
									if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 110);
									else this.jmSet(this.co_j.x, this.co_j.y, 115);
								} else if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 100);
								else this.jmSet(this.co_j.x, this.co_j.y, 105);
							}
						} else if (this.grenade_type == 7) this.jmSet2(this.co_j.x, this.co_j.y, 50, 2);
						else if (this.grenade_type == 9) {
							if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 1207);
							else this.jmSet(this.co_j.x, this.co_j.y, 1206);
						} else if (this.grenade_type == 3 || this.grenade_type == 4) {
							if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 60);
							else this.jmSet(this.co_j.x, this.co_j.y, 65);
						} else if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 200);
						else this.jmSet(this.co_j.x, this.co_j.y, 205);
				} else if (this.j_fire_f && (!this.j_mizu_f || this.j_fire_mkf))
					if (this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) {
						if (!this.gk.down_f) this.jmSet(this.co_j.x, this.co_j.y, 105);
					} else if (this.j_fire_type == 4) {
						if (this.co_jm[0].c == 0) {
							this.co_jm[0].c = 106;
							this.co_jm[0].x = this.co_j.x;
							this.co_jm[0].y = this.co_j.y;
							this.co_jm[0].vx = 20;
							this.co_jm[0].vy = 0;
							this.co_jm[0].c1 = 0;
							this.co_jm[0].c2 = 0;
							if (this.co_j.muki == 0) {
								this.co_jm[0].c = 101;
								this.co_jm[0].vx = -20;
							}
							this.jm_kazu++;
							this.gs.rsAddSound(23);
						}
						if (this.co_jm[1].c == 0) {
							this.co_jm[1].c = 106;
							this.co_jm[1].x = this.co_j.x;
							this.co_jm[1].y = this.co_j.y;
							this.co_jm[1].vx = 14;
							this.co_jm[1].vy = -14;
							this.co_jm[1].c1 = 0;
							this.co_jm[1].c2 = 0;
							if (this.co_j.muki == 0) {
								this.co_jm[1].c = 101;
								this.co_jm[1].vx = -14;
							}
							this.jm_kazu++;
							this.gs.rsAddSound(23);
						}
					} else if (this.co_j.muki == 0) this.jmSet(this.co_j.x, this.co_j.y, 100);
					else this.jmSet(this.co_j.x, this.co_j.y, 105);
			l29 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32);
			if ((this.j_tokugi != 12 && this.j_tokugi != 13) || !this.gk.x_f)
				if (this.j_drell_f && (l29 == 20 || (l29 == 69 && this.suberuyuka_hkf == 1))) {
					var flag16 = false;
					var k14 = 0;
					do {
						if (k14 > this.a_kazu) break;
						if (
							this.co_a[k14].c == 410 &&
							this.co_a[k14].x <= rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 15 &&
							this.co_a[k14].x + 95 >= rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 15 &&
							this.co_j.y + 31 >= this.co_a[k14].y &&
							this.co_j.y <= this.co_a[k14].y + 63
						) {
							flag16 = true;
							break;
						}
						k14++;
					} while (true);
					if (!flag16) {
						var l15 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
						var j18 = rightShiftIgnoreSign(this.co_j.y + 32, 5);
						if (
							this.maps.map_bg[l15][j18 - 1] == 4 ||
							this.maps.map_bg[l15 - 1][j18] == 4 ||
							this.maps.map_bg[l15 + 1][j18] == 4
						)
							this.maps.putBGCode(l15, j18, 4);
						else this.maps.putBGCode(l15, j18, 0);
						if (this.j_tokugi == 12 || this.j_tokugi == 13) {
							this.anaSet(l15, j18);
						} else {
							this.mSet2(l15 * 32, j18 * 32, 80, 12, -24);
							this.mSet2(l15 * 32, j18 * 32, 80, -12, -24);
						}
						this.gs.rsAddSound(16);
						this.jZutuki(l15 * 32, j18 * 32 - 32, 0);
						this.co_j.x = l15 * 32;
						this.co_j.vx = 0;
						this.co_j.vy = 0;
						this.j_jump_type = 3;
						this.co_j.c = 120;
						this.co_j.c1 = 0;
						this.co_j.pt = 119;
					}
				} else if (
					this.j_tail_f &&
					(this.j_tail_ac <= 0 || this.j_tail_ac >= 8) &&
					(!this.j_hashigo_f || this.gk.x_f) &&
					((this.j_tokugi != 10 && this.j_tokugi != 12 && this.j_tokugi != 13) || this.gk.down_f)
				) {
					this.j_tail_ac = 1;
					this.co_j.pt = 116;
					this.j_zan_f = false;
				}
		}
		if (this.j_tail_ac >= 1) {
			// しっぽ
			this.j_zan_f = false;
			this.j_tail_ac++;
			if (this.j_tail_ac <= 4) {
				this.co_j.pt = 116;
				if (this.j_tail_type == 1 || this.j_tail_type == 3)
					if (this.co_j.muki == 0) this.jZutuki(this.co_j.x - 32, this.co_j.y, 1);
					else this.jZutuki(this.co_j.x + 32, this.co_j.y, 1);
			} else if (this.j_tail_ac <= 5) {
				this.co_j.pt = 1000;
				if (this.j_tail_type == 1 || this.j_tail_type == 3)
					if (this.co_j.muki == 0) this.jZutuki(this.co_j.x - 32, this.co_j.y, 1);
					else this.jZutuki(this.co_j.x + 32, this.co_j.y, 1);
				if (this.j_tail_type == 2 || this.j_tail_type == 3) {
					var i16;
					if (this.co_j.muki == 1) i16 = rightShiftIgnoreSign(this.co_j.x + 40, 5);
					else i16 = rightShiftIgnoreSign(this.co_j.x - 8, 5);
					var k18 = rightShiftIgnoreSign(this.co_j.y + 15, 5);
					if (this.maps.map_bg[i16][k18] == 20 || (this.maps.map_bg[i16][k18] == 69 && this.suberuyuka_hkf == 1)) {
						if (this.maps.map_bg[i16 - 1][k18] == 4) this.maps.putBGCode(i16, k18, 4);
						else this.maps.putBGCode(i16, k18, 0);
						this.mSet2(i16 * 32, k18 * 32, 80, 12, -24);
						this.mSet2(i16 * 32, k18 * 32, 80, -12, -24);
						this.gs.rsAddSound(16);
						this.jZutuki(i16 * 32, k18 * 32 - 32, 0);
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
		if ((this.j_tokugi == 12 || this.j_tokugi == 13) && (this.co_j.jimen_f || this.j_hashigo_f))
			if (this.gk.x_f) {
				var l18 = rightShiftIgnoreSign(this.co_j.x + 15, 5) + 1;
				var j19 = rightShiftIgnoreSign(this.co_j.y + 32 + 15, 5);
				var word28 = this.maps.map_bg[l18][j19];
				var word37 = this.maps.map_bg[l18][j19 - 1];
				if (
					(word28 == 20 || word28 == 40) &&
					word37 <= 9 &&
					(this.maps.map_bg[l18 - 1][j19 - 1] <= 10 ||
						this.maps.map_bg[l18 - 1][j19 - 1] == 15 ||
						this.maps.map_bg[l18 - 1][j19 - 1] == 18 ||
						this.maps.map_bg[l18 - 1][j19 - 1] == 19)
				) {
					var flag3 = false;
					var word39 = this.maps.map_bg[l18 - 1][j19];
					if (
						word39 >= 20 ||
						word39 == 15 ||
						word39 == 10 ||
						this.maps.map_bg[l18 - 1][j19 - 1] == 10 ||
						this.maps.map_bg[l18 - 1][j19 - 1] == 18 ||
						this.maps.map_bg[l18 - 1][j19 - 1] == 19
					)
						flag3 = true;
					if (!flag3) {
						var j7 = 0;
						do {
							if (j7 > this.t_kazu) break;
							if (
								((this.co_t[j7].c >= 1200 && this.co_t[j7].c < 1300) || this.co_t[j7].c == 1310) &&
								Math.abs(this.co_j.x - this.co_t[j7].x) < 32 &&
								j19 * 32 <= this.co_t[j7].y &&
								j19 * 32 + 12 >= this.co_t[j7].y
							) {
								flag3 = true;
								break;
							}
							j7++;
						} while (true);
					}
					if (
						!flag3 &&
						this.j_a_id >= 0 &&
						((this.co_a[this.j_a_id].c >= 100 && this.co_a[this.j_a_id].c <= 120) ||
							(this.co_a[this.j_a_id].c >= 400 && this.co_a[this.j_a_id].c <= 600))
					)
						flag3 = true;
					if (flag3) {
						if (word28 == 40) {
							this.hAttack(l18, j19);
							if (this.j_a_id >= 0) {
								if (
									this.co_a[this.j_a_id].c == 100 ||
									this.co_a[this.j_a_id].c == 400 ||
									this.co_a[this.j_a_id].c == 500
								)
									this.co_j.x = l18 * 32 - 32;
							} else {
								this.co_j.x = l18 * 32 - 32;
								this.co_j.y = j19 * 32 - 32;
							}
							this.co_j.vx = 0;
							this.co_j.c = 130;
							this.co_j.c1 = 0;
							this.co_j.muki = 1;
							if (!this.j_hashigo_f) this.co_j.pt = 100;
						} else {
							if (word37 == 4 || this.maps.map_bg[l18 - 1][j19] == 4 || this.maps.map_bg[l18 + 1][j19] == 4)
								this.maps.putBGCode(l18, j19, 4);
							else this.maps.putBGCode(l18, j19, 0);
							this.anaSet(l18, j19);
							if (this.j_a_id >= 0) {
								if (
									this.co_a[this.j_a_id].c == 100 ||
									this.co_a[this.j_a_id].c == 400 ||
									this.co_a[this.j_a_id].c == 500
								)
									this.co_j.x = l18 * 32 - 32;
							} else {
								this.co_j.x = l18 * 32 - 32;
								this.co_j.y = j19 * 32 - 32;
							}
							this.co_j.vx = 0;
							this.co_j.c = 130;
							this.co_j.c1 = 0;
							this.co_j.muki = 1;
							if (!this.j_hashigo_f) this.co_j.pt = 100;
							this.gs.rsAddSound(16);
						}
						var l20 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31);
						if (l20 == 18 || l20 == 19) this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
					}
				}
			} else if (this.gk.z_f) {
				var i19 = rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1;
				var k19 = rightShiftIgnoreSign(this.co_j.y + 32 + 15, 5);
				var word29 = this.maps.map_bg[i19][k19];
				var word38 = this.maps.map_bg[i19][k19 - 1];
				if (
					(word29 == 20 || word29 == 40) &&
					word38 <= 9 &&
					(this.maps.map_bg[i19 + 1][k19 - 1] <= 10 ||
						this.maps.map_bg[i19 + 1][k19 - 1] == 15 ||
						this.maps.map_bg[i19 + 1][k19 - 1] <= 18 ||
						this.maps.map_bg[i19 + 1][k19 - 1] == 19)
				) {
					var flag4 = false;
					var word40 = this.maps.map_bg[i19 + 1][k19];
					if (
						word40 >= 20 ||
						word40 == 15 ||
						word40 == 10 ||
						this.maps.map_bg[i19 + 1][k19 - 1] == 10 ||
						this.maps.map_bg[i19 + 1][k19 - 1] == 18 ||
						this.maps.map_bg[i19 + 1][k19 - 1] == 19
					)
						flag4 = true;
					if (!flag4) {
						var k7 = 0;
						do {
							if (k7 > this.t_kazu) break;
							if (
								((this.co_t[k7].c >= 1200 && this.co_t[k7].c < 1300) || this.co_t[k7].c == 1310) &&
								Math.abs(this.co_j.x - this.co_t[k7].x) < 32 &&
								k19 * 32 <= this.co_t[k7].y &&
								k19 * 32 + 12 >= this.co_t[k7].y
							) {
								flag4 = true;
								break;
							}
							k7++;
						} while (true);
					}
					if (
						!flag4 &&
						this.j_a_id >= 0 &&
						((this.co_a[this.j_a_id].c >= 100 && this.co_a[this.j_a_id].c <= 120) ||
							(this.co_a[this.j_a_id].c >= 400 && this.co_a[this.j_a_id].c <= 600))
					)
						flag4 = true;
					if (flag4) {
						if (word29 == 40) {
							this.hAttack(i19, k19);
							if (this.j_a_id >= 0) {
								if (
									this.co_a[this.j_a_id].c == 100 ||
									this.co_a[this.j_a_id].c == 400 ||
									this.co_a[this.j_a_id].c == 500
								)
									this.co_j.x = i19 * 32 + 32;
							} else {
								this.co_j.x = i19 * 32 + 32;
								this.co_j.y = k19 * 32 - 32;
							}
							this.co_j.vx = 0;
							this.co_j.c = 130;
							this.co_j.c1 = 0;
							this.co_j.muki = 0;
							if (!this.j_hashigo_f) this.co_j.pt = 100;
						} else {
							if (word38 == 4 || this.maps.map_bg[i19 - 1][k19] == 4 || this.maps.map_bg[i19 + 1][k19] == 4)
								this.maps.putBGCode(i19, k19, 4);
							else this.maps.putBGCode(i19, k19, 0);
							this.anaSet(i19, k19);
							if (this.j_a_id >= 0) {
								if (
									this.co_a[this.j_a_id].c == 100 ||
									this.co_a[this.j_a_id].c == 400 ||
									this.co_a[this.j_a_id].c == 500
								)
									this.co_j.x = i19 * 32 + 32;
							} else {
								this.co_j.x = i19 * 32 + 32;
								this.co_j.y = k19 * 32 - 32;
							}
							this.co_j.vx = 0;
							this.co_j.c = 130;
							this.co_j.c1 = 0;
							this.co_j.muki = 0;
							if (!this.j_hashigo_f) this.co_j.pt = 100;
							this.gs.rsAddSound(16);
						}
						var i21 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31);
						if (i21 == 18 || i21 == 19) this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
					}
				}
			}
		l29 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][rightShiftIgnoreSign(this.co_j.y + 15, 5)];
		switch (l29) {
			case 9: // コインゲット
				if (
					this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][rightShiftIgnoreSign(this.co_j.y + 15, 5)] ==
					4
				) {
					this.maps.putBGCode(rightShiftIgnoreSign(this.co_j.x + 15, 5), rightShiftIgnoreSign(this.co_j.y + 15, 5), 4);
					this.j_mizu_f = true;
				} else {
					this.maps.putBGCode(rightShiftIgnoreSign(this.co_j.x + 15, 5), rightShiftIgnoreSign(this.co_j.y + 15, 5), 0);
				}
				this.addScore(5);
				this.gs.rsAddSound(6);
				if (this.clear_type == 2 || this.clear_type == 3) {
					var l27 = this.coin_kazu;
					this.getCoinTotal();
					if (l27 > 0 && this.coin_kazu == 0) {
						this.gs.rsAddSound(7);
						if (this.clear_type == 3) this.showHashigo();
					}
				}
				break;

			case 8: // 人面星ゲット
				if ((this.clear_type != 2 && this.clear_type != 3) || this.coin_kazu <= 0) {
					if (
						this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][
							rightShiftIgnoreSign(this.co_j.y + 15, 5)
						] == 4
					) {
						this.maps.putBGCode(
							rightShiftIgnoreSign(this.co_j.x + 15, 5),
							rightShiftIgnoreSign(this.co_j.y + 15, 5),
							4
						);
						this.j_mizu_f = true;
					} else {
						this.maps.putBGCode(
							rightShiftIgnoreSign(this.co_j.x + 15, 5),
							rightShiftIgnoreSign(this.co_j.y + 15, 5),
							0
						);
					}
					this.gs.rsAddSound(2);
					this.stage_cc = 1;
					if (this.stage_max >= 2 && this.stage >= this.stage_max) this.addScore(1000);
					else this.addScore(100);
				}
				break;

			case 5: // 上向きのトゲに当たる
			case 6: // 下向きのトゲに当たる
				this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 15, 5) * 32;
				this.jShinu(1);
				break;
		}
		if (this.clear_type == 3 && this.coin_kazu <= 0 && this.co_j.y <= this.maps.wy_mini - 32 && this.stage_cc <= 0) {
			this.stage_cc = 1;
			this.co_j.c = 130;
			this.co_j.c1 = -9999;
			this.addScore(100);
			this.gs.rsAddSound(2);
		}
		if (this.co_j.y >= this.ochiru_y || (this.j_mizu_f && this.co_j.y >= this.ochiru_y - 16)) {
			this.co_j.c = 210;
			this.co_j.c1 = 0;
			this.co_j.y = this.ochiru_y + 64;
			this.j_jet_c = 0;
			this.j_v_c = 0;
		}
		this.moveViewPosition();
	}

	/**
	 * 毎フレームの主人公の処理のうち、CharactorObject.cの値が100のときの処理を行います
	 * 主人公がシューティングモードまたは４方向移動の特技を持っている場合の処理です
	 */
	jM100stg() {
		var flag2 = false;
		this.j_zan_cf = false;
		this.j_mizu_f = false;
		var i7 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15);
		this.AwaMove(i7, 1);
		if (this.gk.tr1_f) {
			if (this.tr1_c < 14) this.tr1_c++;
			if (this.j_tokugi == 14 && this.tr1_c >= 14) this.tr1_c = 1;
		} else {
			this.tr1_c = 0;
		}
		if (this.gk.tr1_f) {
			if (this.gk.tr1_c < 14) this.gk.tr1_c++;
			if (this.j_tokugi == 14 && this.tr1_c >= 14) this.tr1_c = 1;
		} else {
			this.gk.tr1_c = 0;
		}
		if (this.gk.tr2_f) {
			if (this.tr2_c < 2) this.tr2_c++;
		} else {
			this.tr2_c = 0;
		}
		if (this.gk.x_f) {
			if (this.xkey_c < 2) this.xkey_c++;
		} else {
			this.xkey_c = 0;
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
		this.co_j.pt = 100;
		if (this.j_tokugi == 14) {
			if (this.gk.right_f) this.co_j.vx = this.j_speed;
			else if (this.gk.left_f) this.co_j.vx = this.j_speed * -1;
			else this.co_j.vx = 0;
			if (this.gk.up_f) this.co_j.vy = this.j_speed * -1;
			else if (this.gk.down_f) this.co_j.vy = this.j_speed;
			else this.co_j.vy = 0;
			this.co_j.muki = 1;
			if (this.g_c2 <= 1) this.co_j.pt = 83;
			else this.co_j.pt = 84;
		} else {
			if (this.gk.right_f) {
				this.co_j.vx = this.j_speed;
				this.co_j.vy = 0;
				this.co_j.muki = 1;
				this.j_4_muki = 1;
				if (
					this.co_j.x % 32 == 0 &&
					(this.maps.getBGCode(this.co_j.x + 32, this.co_j.y) >= 20 ||
						this.maps.getBGCode(this.co_j.x + 32, this.co_j.y + 31) >= 20)
				)
					if (this.maps.getBGCode(this.co_j.x + 32, this.co_j.y) < 20) {
						this.co_j.vx = 0;
						this.co_j.vy = this.j_speed * -1;
						this.j_4_muki = 2;
						if (rightShiftIgnoreSign(this.co_j.y, 5) * 32 > this.co_j.y + rounddown(this.co_j.vy / 10))
							this.co_j.vy = (this.co_j.y - rightShiftIgnoreSign(this.co_j.y, 5) * 32) * 10;
					} else if (this.maps.getBGCode(this.co_j.x + 32, this.co_j.y + 31) < 20) {
						this.co_j.vx = 0;
						this.co_j.vy = this.j_speed;
						this.j_4_muki = 3;
						if (rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 < this.co_j.y + rounddown(this.co_j.vy / 10))
							this.co_j.vy = (rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - this.co_j.y) * 10;
					}
			} else if (this.gk.left_f) {
				this.co_j.vx = this.j_speed * -1;
				this.co_j.vy = 0;
				this.co_j.muki = 0;
				this.j_4_muki = 0;
				if (
					this.co_j.x % 32 == 0 &&
					(this.maps.getBGCode(this.co_j.x - 1, this.co_j.y) >= 20 ||
						this.maps.getBGCode(this.co_j.x - 1, this.co_j.y + 31) >= 20)
				)
					if (this.maps.getBGCode(this.co_j.x - 1, this.co_j.y) < 20) {
						this.co_j.vx = 0;
						this.co_j.vy = this.j_speed * -1;
						this.j_4_muki = 2;
						if (rightShiftIgnoreSign(this.co_j.y, 5) * 32 > this.co_j.y + rounddown(this.co_j.vy / 10))
							this.co_j.vy = (this.co_j.y - rightShiftIgnoreSign(this.co_j.y, 5) * 32) * 10;
					} else if (this.maps.getBGCode(this.co_j.x - 1, this.co_j.y + 31) < 20) {
						this.co_j.vx = 0;
						this.co_j.vy = this.j_speed;
						this.j_4_muki = 3;
						if (rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 < this.co_j.y + rounddown(this.co_j.vy / 10))
							this.co_j.vy = (rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - this.co_j.y) * 10;
					}
			} else if (this.gk.up_f) {
				this.co_j.vx = 0;
				this.co_j.vy = this.j_speed * -1;
				this.j_4_muki = 2;
				if (
					this.co_j.y % 32 == 0 &&
					(this.maps.getBGCode(this.co_j.x, this.co_j.y - 1) >= 20 ||
						this.maps.getBGCode(this.co_j.x + 31, this.co_j.y - 1) >= 20)
				)
					if (this.maps.getBGCode(this.co_j.x, this.co_j.y - 1) < 20) {
						this.co_j.vx = this.j_speed * -1;
						this.co_j.vy = 0;
						this.co_j.muki = 0;
						this.j_4_muki = 0;
						if (rightShiftIgnoreSign(this.co_j.x, 5) * 32 > this.co_j.x + rounddown(this.co_j.vx / 10))
							this.co_j.vx = (this.co_j.x - rightShiftIgnoreSign(this.co_j.x, 5) * 32) * 10;
					} else if (this.maps.getBGCode(this.co_j.x + 31, this.co_j.y - 1) < 20) {
						this.co_j.vx = this.j_speed;
						this.co_j.vy = 0;
						this.co_j.muki = 1;
						this.j_4_muki = 1;
						if (rightShiftIgnoreSign(this.co_j.x + 31, 5) * 32 < this.co_j.x + rounddown(this.co_j.vx / 10))
							this.co_j.vx = (rightShiftIgnoreSign(this.co_j.x + 31, 5) * 32 - this.co_j.x) * 10;
					}
			} else if (this.gk.down_f) {
				this.co_j.vx = 0;
				this.co_j.vy = this.j_speed;
				this.j_4_muki = 3;
				if (
					this.co_j.y % 32 == 0 &&
					(this.maps.getBGCode(this.co_j.x, this.co_j.y + 32) >= 20 ||
						this.maps.getBGCode(this.co_j.x + 31, this.co_j.y + 32) >= 20)
				)
					if (this.maps.getBGCode(this.co_j.x, this.co_j.y + 32) < 20) {
						this.co_j.vx = this.j_speed * -1;
						this.co_j.vy = 0;
						this.co_j.muki = 0;
						this.j_4_muki = 0;
						if (rightShiftIgnoreSign(this.co_j.x, 5) * 32 > this.co_j.x + rounddown(this.co_j.vx / 10))
							this.co_j.vx = (this.co_j.x - rightShiftIgnoreSign(this.co_j.x, 5) * 32) * 10;
					} else if (this.maps.getBGCode(this.co_j.x + 31, this.co_j.y + 32) < 20) {
						this.co_j.vx = this.j_speed;
						this.co_j.vy = 0;
						this.co_j.muki = 1;
						this.j_4_muki = 1;
						if (rightShiftIgnoreSign(this.co_j.x + 31, 5) * 32 < this.co_j.x + rounddown(this.co_j.vx / 10))
							this.co_j.vx = (rightShiftIgnoreSign(this.co_j.x + 31, 5) * 32 - this.co_j.x) * 10;
					}
			} else {
				this.co_j.vx = 0;
				this.co_j.vy = 0;
			}
			if (this.co_j.vx != 0 || this.co_j.vy != 0) {
				this.co_j.ac++;
				if (this.co_j.ac > 3) this.co_j.ac = 0;
			} else {
				this.co_j.ac = 0;
			}
			if (this.co_j.vx != 0) this.co_j.pt = 103 + rightShiftIgnoreSign(this.co_j.ac, 1);
			else if (this.j_4_muki == 2) this.co_j.pt = 204 + rightShiftIgnoreSign(this.co_j.ac, 1);
			else if (this.j_4_muki == 3) this.co_j.pt = 202 + rightShiftIgnoreSign(this.co_j.ac, 1);
			else this.co_j.pt = 100;
		}
		if (this.co_j.vx < 0) {
			this.co_j.x += rounddown(this.co_j.vx / 10);
			if (this.a_hf) {
				for (var i3 = 0; i3 <= this.a_kazu; i3++) {
					if (!this.co_a[i3].gf) continue;
					var characterobject = this.co_a[i3];
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
						continue;
					}
					if (characterobject.c == 300) {
						if (
							this.co_j.x + 15 >= characterobject.x &&
							this.co_j.x <= characterobject.x + 48 &&
							this.co_j.y + 31 >= characterobject.y &&
							this.co_j.y <= characterobject.y + 31
						) {
							this.co_j.x = characterobject.x + 49;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (characterobject.c >= 400 && characterobject.c < 500) {
						if (
							this.co_j.x + 15 >= characterobject.x &&
							this.co_j.x <= characterobject.x + 80 &&
							this.co_j.y + 31 >= characterobject.y &&
							this.co_j.y <= characterobject.y + 63
						) {
							this.co_j.x = characterobject.x + 81;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (characterobject.c == 500) {
						if (
							this.co_j.x + 15 >= characterobject.x &&
							this.co_j.x <= characterobject.x + 80 &&
							this.co_j.y + 31 >= characterobject.y &&
							this.co_j.y <= characterobject.y + 13
						) {
							this.co_j.x = characterobject.x + 81;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (characterobject.c >= 600 && characterobject.c < 700) {
						if (
							this.co_j.x + 15 >= characterobject.x &&
							this.co_j.x <= characterobject.x + 48 &&
							this.co_j.y + 31 >= characterobject.y + 16 &&
							this.co_j.y <= characterobject.y + 47
						) {
							this.co_j.x = characterobject.x + 49;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (
						characterobject.c == 700 &&
						this.j_tokugi != 10 &&
						this.j_tokugi != 12 &&
						this.j_tokugi != 13 &&
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
			if (this.yuka_id_max >= 0) this.atariYuka(0);
			var j = rightShiftIgnoreSign(this.co_j.x, 5);
			var word6 = this.maps.map_bg[j][rightShiftIgnoreSign(this.co_j.y, 5)];
			var k1 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
			var word2 = this.maps.map_bg[j][k1];
			if (word6 >= 20 || word2 >= 20) {
				this.co_j.x = j * 32 + 32;
				this.co_j.vx = 0;
			}
		} else if (this.co_j.vx > 0) {
			this.co_j.x += rounddown(this.co_j.vx / 10);
			if (this.a_hf) {
				for (var j3 = 0; j3 <= this.a_kazu; j3++) {
					if (!this.co_a[j3].gf) continue;
					var characterobject1 = this.co_a[j3];
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
						continue;
					}
					if (characterobject1.c == 300) {
						if (
							this.co_j.x + 15 >= characterobject1.x &&
							this.co_j.x <= characterobject1.x + 48 &&
							this.co_j.y + 31 >= characterobject1.y &&
							this.co_j.y <= characterobject1.y + 31
						) {
							this.co_j.x = characterobject1.x - 16;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (characterobject1.c >= 400 && characterobject1.c < 500) {
						if (
							this.co_j.x + 15 >= characterobject1.x &&
							this.co_j.x <= characterobject1.x + 80 &&
							this.co_j.y + 31 >= characterobject1.y &&
							this.co_j.y <= characterobject1.y + 63
						) {
							this.co_j.x = characterobject1.x - 16;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (characterobject1.c == 500) {
						if (
							this.co_j.x + 15 >= characterobject1.x &&
							this.co_j.x <= characterobject1.x + 80 &&
							this.co_j.y + 31 >= characterobject1.y &&
							this.co_j.y <= characterobject1.y + 13
						) {
							this.co_j.x = characterobject1.x - 16;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (characterobject1.c >= 600 && characterobject1.c < 700) {
						if (
							this.co_j.x + 15 >= characterobject1.x &&
							this.co_j.x <= characterobject1.x + 48 &&
							this.co_j.y + 31 >= characterobject1.y + 16 &&
							this.co_j.y <= characterobject1.y + 47
						) {
							this.co_j.x = characterobject1.x - 16;
							this.co_j.vx = 0;
						}
						continue;
					}
					if (
						characterobject1.c == 700 &&
						this.j_tokugi != 10 &&
						this.j_tokugi != 12 &&
						this.j_tokugi != 13 &&
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
			if (this.yuka_id_max >= 0) this.atariYuka(1);
			var k = rightShiftIgnoreSign(this.co_j.x + 31, 5);
			var word7 = this.maps.map_bg[k][rightShiftIgnoreSign(this.co_j.y, 5)];
			var l1 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
			var word3 = this.maps.map_bg[k][l1];
			if (word7 >= 20 || word3 >= 20) {
				this.co_j.x = k * 32 - 16;
				this.co_j.x = k * 32 - 32;
				this.co_j.vx = 0;
			}
		}
		if (this.co_j.vy < 0) {
			var k6 = this.co_j.vy;
			if (k6 < -320) k6 = -320;
			this.co_j.y += rounddown(k6 / 10);
			if (this.a_hf) {
				for (var k3 = 0; k3 <= this.a_kazu; k3++) {
					if (!this.co_a[k3].gf) continue;
					var characterobject2 = this.co_a[k3];
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
						continue;
					}
					if (characterobject2.c == 300) {
						if (
							this.co_j.x + 15 >= characterobject2.x &&
							this.co_j.x <= characterobject2.x + 48 &&
							this.co_j.y + 31 >= characterobject2.y &&
							this.co_j.y <= characterobject2.y + 31
						) {
							this.co_j.y = characterobject2.y + 32;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (characterobject2.c >= 400 && characterobject2.c < 500) {
						if (
							this.co_j.x + 15 >= characterobject2.x &&
							this.co_j.x <= characterobject2.x + 80 &&
							this.co_j.y + 31 >= characterobject2.y &&
							this.co_j.y <= characterobject2.y + 63
						) {
							this.co_j.y = characterobject2.y + 64;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (characterobject2.c == 500) {
						if (
							this.co_j.x + 15 >= characterobject2.x &&
							this.co_j.x <= characterobject2.x + 80 &&
							this.co_j.y + 31 >= characterobject2.y &&
							this.co_j.y <= characterobject2.y + 13
						) {
							this.co_j.y = characterobject2.y + 14;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (characterobject2.c >= 600 && characterobject2.c < 700) {
						if (
							this.co_j.x + 15 >= characterobject2.x &&
							this.co_j.x <= characterobject2.x + 48 &&
							this.co_j.y + 31 >= characterobject2.y + 16 &&
							this.co_j.y <= characterobject2.y + 47
						) {
							this.co_j.y = characterobject2.y + 48;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (
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
			if (this.yuka_id_max >= 0) this.atariYuka(2);
			var j2 = rightShiftIgnoreSign(this.co_j.y, 5);
			var word8 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][j2];
			var word9 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x, 5)][j2];
			var word11 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 31, 5)][j2];
			if (word9 >= 20 || word11 >= 20) {
				this.co_j.y = j2 * 32 + 32;
				this.co_j.vy = 0;
				if (word8 == 40) {
					var i4 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
					var i5 = rightShiftIgnoreSign(this.co_j.y - 1, 5);
					this.hAttack(i4, i5);
				}
				if (this.j_helm_f && (word8 == 20 || (word8 == 69 && this.suberuyuka_hkf == 1))) {
					var j4 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
					var j5 = j2;
					if (this.maps.map_bg[j4][j5 + 1] == 4) this.maps.putBGCode(j4, j5, 4);
					else this.maps.putBGCode(j4, j5, 0);
					this.mSet2(j4 * 32, j5 * 32, 80, 12, -24);
					this.mSet2(j4 * 32, j5 * 32, 80, -12, -24);
					this.gs.rsAddSound(16);
					this.jZutuki(j4 * 32, j5 * 32 - 32, 0);
				}
			}
			if (this.co_j.y < this.maps.wy_mini) this.co_j.y = this.maps.wy_mini;
		} else if (this.co_j.vy > 0) {
			this.co_j.y += rounddown(this.co_j.vy / 10);
			if (this.a_hf) {
				for (var l3 = 0; l3 <= this.a_kazu; l3++) {
					if (!this.co_a[l3].gf) continue;
					var characterobject3 = this.co_a[l3];
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
						continue;
					}
					if (characterobject3.c == 300) {
						if (
							this.co_j.x + 15 >= characterobject3.x &&
							this.co_j.x <= characterobject3.x + 48 &&
							this.co_j.y + 31 >= characterobject3.y &&
							this.co_j.y <= characterobject3.y + 31
						) {
							this.co_j.y = characterobject3.y - 32;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (characterobject3.c >= 400 && characterobject3.c < 500) {
						if (
							this.co_j.x + 15 >= characterobject3.x &&
							this.co_j.x <= characterobject3.x + 80 &&
							this.co_j.y + 31 >= characterobject3.y &&
							this.co_j.y <= characterobject3.y + 63
						) {
							this.co_j.y = characterobject3.y - 32;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (characterobject3.c == 500) {
						if (
							this.co_j.x + 15 >= characterobject3.x &&
							this.co_j.x <= characterobject3.x + 80 &&
							this.co_j.y + 31 >= characterobject3.y &&
							this.co_j.y <= characterobject3.y + 13
						) {
							this.co_j.y = characterobject3.y - 32;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (characterobject3.c >= 600 && characterobject3.c < 700) {
						if (
							this.co_j.x + 15 >= characterobject3.x &&
							this.co_j.x <= characterobject3.x + 48 &&
							this.co_j.y + 31 >= characterobject3.y + 16 &&
							this.co_j.y <= characterobject3.y + 47
						) {
							this.co_j.y = characterobject3.y + 16 - 32;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (
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
			if (this.yuka_id_max >= 0) this.atariYuka(3);
			var i2 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
			var word10 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x, 5)][i2];
			var word12 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 31, 5)][i2];
			if (word10 >= 20 || word12 >= 20 || flag2) {
				this.co_j.y = i2 * 32 - 32;
				this.co_j.vy = 0;
				i2 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
			}
			if (this.co_j.y > this.maps.wy_max + this.gg.di.height - 32)
				this.co_j.y = this.maps.wy_max + this.gg.di.height - 32;
			if (!this.j_mizu_f) {
				var i6 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15);
				if (i6 == 4) {
					this.mSet(this.co_j.x, rightShiftIgnoreSign(this.co_j.y + 15, 5) * 32 - 32, 50);
					this.j_mizu_awa_c = 38;
					this.gs.rsAddSound(20);
					if (this.co_j.vx < -60) this.co_j.vx = -60;
					else if (this.co_j.vx > 60) this.co_j.vx = 60;
				} else if (
					(i6 == 8 || i6 == 9) &&
					this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][rightShiftIgnoreSign(this.co_j.y + 15, 5)] ==
						4
				) {
					this.mSet(this.co_j.x, rightShiftIgnoreSign(this.co_j.y + 15, 5) * 32 - 32, 50);
					this.j_mizu_awa_c = 38;
					if (this.co_j.vx < -60) this.co_j.vx = -60;
					else if (this.co_j.vx > 60) this.co_j.vx = 60;
				}
			}
		}
		if (this.gk.down_f && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32) == 15) {
			this.j_shitakara_mushi_y = rightShiftIgnoreSign(this.co_j.y + 32, 5);
			this.j_jump_type = 2;
			this.co_j.ac = 0;
		}
		if (this.tr1_c == 1) {
			if (this.j_fire_f && (!this.j_mizu_f || this.j_fire_mkf))
				if (this.co_j.muki == 0) {
					this.jmSet(this.co_j.x, this.co_j.y, 100);
				} else {
					this.jmSet(this.co_j.x, this.co_j.y, 105);
					if (this.j_tokugi == 14) {
						if (this.j_double_f)
							if (this.grenade_type == 7) {
								if (this.co_jm[7].c == 0) {
									this.co_jm[7].c = 110;
									this.co_jm[7].x = this.co_j.x;
									this.co_jm[7].y = this.co_j.y;
									this.co_jm[7].vx = 10;
									this.co_jm[7].vy = -10;
									this.gs.rsAddSound(23);
								}
							} else if (this.co_jm[7].c == 0) {
								this.co_jm[7].c = 106;
								this.co_jm[7].x = this.co_j.x;
								this.co_jm[7].y = this.co_j.y;
								this.co_jm[7].vx = 12;
								this.co_jm[7].vy = -9;
								this.gs.rsAddSound(23);
							} else if (this.co_jm[8].c == 0) {
								this.co_jm[8].c = 106;
								this.co_jm[8].x = this.co_j.x;
								this.co_jm[8].y = this.co_j.y;
								this.co_jm[8].vx = 12;
								this.co_jm[8].vy = -9;
								this.gs.rsAddSound(23);
							}
						if (this.co_mu[0].c == 100)
							if (this.co_jm[3].c == 0) {
								this.co_jm[3].c = 106;
								this.co_jm[3].x = this.co_mu[0].x;
								this.co_jm[3].y = this.co_mu[0].y;
								this.co_jm[3].vx = 16;
								this.co_jm[3].vy = 0;
								this.co_jm[3].c2 = 106;
								this.gs.rsAddSound(23);
							} else if (this.co_jm[4].c == 0) {
								this.co_jm[4].c = 106;
								this.co_jm[4].x = this.co_mu[0].x;
								this.co_jm[4].y = this.co_mu[0].y;
								this.co_jm[4].vx = 16;
								this.co_jm[4].vy = 0;
								this.co_jm[4].c2 = 106;
								this.gs.rsAddSound(23);
							}
						if (this.co_mu[1].c == 100)
							if (this.co_jm[5].c == 0) {
								this.co_jm[5].c = 106;
								this.co_jm[5].x = this.co_mu[1].x;
								this.co_jm[5].y = this.co_mu[1].y;
								this.co_jm[5].vx = 16;
								this.co_jm[5].vy = 0;
								this.co_jm[5].c2 = 106;
								this.gs.rsAddSound(23);
							} else if (this.co_jm[6].c == 0) {
								this.co_jm[6].c = 106;
								this.co_jm[6].x = this.co_mu[1].x;
								this.co_jm[6].y = this.co_mu[1].y;
								this.co_jm[6].vx = 16;
								this.co_jm[6].vy = 0;
								this.co_jm[6].c2 = 106;
								this.gs.rsAddSound(23);
							}
					}
				}
			if (this.j_tail_f && (this.j_tail_ac <= 0 || this.j_tail_ac >= 8)) {
				this.j_tail_ac = 1;
				this.co_j.pt = 116;
				this.j_zan_f = false;
			}
		}
		if (this.xkey_c == 1) {
			if (this.j_gr_kazu > 0)
				if (this.grenade_type == 7) this.jmSet2(this.co_j.x, this.co_j.y, 50, 2);
				else if (this.grenade_type == 3 || this.grenade_type == 4) {
					if (this.co_j.muki == 0) this.jmSet2(this.co_j.x, this.co_j.y, 60, 2);
					else this.jmSet2(this.co_j.x, this.co_j.y, 65, 2);
				} else if (this.co_j.muki == 0) this.jmSet2(this.co_j.x, this.co_j.y, 200, 2);
				else this.jmSet2(this.co_j.x, this.co_j.y, 205, 2);
			i7 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32);
			if (this.j_drell_f && (i7 == 20 || (i7 == 69 && this.suberuyuka_hkf == 1))) {
				var k4 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
				var k5 = rightShiftIgnoreSign(this.co_j.y + 32, 5);
				if (this.maps.map_bg[k4][k5 - 1] == 4 || this.maps.map_bg[k4 - 1][k5] == 4 || this.maps.map_bg[k4 + 1][k5] == 4)
					this.maps.putBGCode(k4, k5, 4);
				else this.maps.putBGCode(k4, k5, 0);
				if (this.j_tokugi == 12 || this.j_tokugi == 13) {
					this.anaSet(k4, k5);
				} else {
					this.mSet2(k4 * 32, k5 * 32, 80, 12, -24);
					this.mSet2(k4 * 32, k5 * 32, 80, -12, -24);
				}
				this.gs.rsAddSound(16);
				this.jZutuki(k4 * 32, k5 * 32 - 32, 0);
				this.co_j.x = k4 * 32;
				this.co_j.vx = 0;
				this.co_j.vy = 0;
				this.j_jump_type = 3;
				this.co_j.c = 120;
				this.co_j.c1 = 0;
				this.co_j.pt = 119;
			}
		}
		if (this.j_tail_ac >= 1) {
			this.j_zan_f = false;
			this.j_tail_ac++;
			if (this.j_tail_ac <= 4) {
				this.co_j.pt = 116;
				if (this.j_tokugi == 15 && this.j_4_muki == 2) {
					this.co_j.pt = 83;
					this.co_j.muki = 0;
				} else if (this.j_tokugi == 15 && this.j_4_muki == 3) {
					this.co_j.pt = 84;
					this.co_j.muki = 0;
				}
				if (this.j_tail_type == 1 || this.j_tail_type == 3)
					if (this.j_tokugi == 15 && this.j_4_muki == 2) this.jZutuki(this.co_j.x, this.co_j.y - 32, 1);
					else if (this.j_tokugi == 15 && this.j_4_muki == 3) this.jZutuki(this.co_j.x, this.co_j.y + 32, 1);
					else if (this.co_j.muki == 0) this.jZutuki(this.co_j.x - 32, this.co_j.y, 1);
					else this.jZutuki(this.co_j.x + 32, this.co_j.y, 1);
			} else if (this.j_tail_ac <= 5) {
				this.co_j.pt = 1000;
				if (this.j_tail_type == 1 || this.j_tail_type == 3)
					if (this.j_tokugi == 15 && this.j_4_muki == 2) this.jZutuki(this.co_j.x, this.co_j.y - 32, 1);
					else if (this.j_tokugi == 15 && this.j_4_muki == 3) this.jZutuki(this.co_j.x, this.co_j.y + 32, 1);
					else if (this.co_j.muki == 0) this.jZutuki(this.co_j.x - 32, this.co_j.y, 1);
					else this.jZutuki(this.co_j.x + 32, this.co_j.y, 1);
				if (this.j_tail_type == 2 || this.j_tail_type == 3) {
					var l4;
					if (this.co_j.muki == 1) l4 = rightShiftIgnoreSign(this.co_j.x + 40, 5);
					else l4 = rightShiftIgnoreSign(this.co_j.x - 8, 5);
					var l5 = rightShiftIgnoreSign(this.co_j.y + 15, 5);
					if (this.j_tokugi == 15 && this.j_4_muki == 2) {
						l4 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
						l5 = rightShiftIgnoreSign(this.co_j.y - 16, 5);
					} else if (this.j_tokugi == 15 && this.j_4_muki == 3) {
						l4 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
						l5 = rightShiftIgnoreSign(this.co_j.y + 44, 5);
					}
					if (this.maps.map_bg[l4][l5] == 20 || (this.maps.map_bg[l4][l5] == 69 && this.suberuyuka_hkf == 1)) {
						if (this.maps.map_bg[l4 - 1][l5] == 4) this.maps.putBGCode(l4, l5, 4);
						else this.maps.putBGCode(l4, l5, 0);
						this.mSet2(l4 * 32, l5 * 32, 80, 12, -24);
						this.mSet2(l4 * 32, l5 * 32, 80, -12, -24);
						this.gs.rsAddSound(16);
						this.jZutuki(l4 * 32, l5 * 32 - 32, 0);
					}
				}
			} else if (this.j_tail_ac <= 7) this.co_j.pt = 1000;
			else if (this.j_tail_ac <= 9) {
				this.co_j.pt = 116;
				if (this.j_tokugi == 15 && this.j_4_muki == 2) {
					this.co_j.pt = 83;
					this.co_j.muki = 0;
				} else if (this.j_tokugi == 15 && this.j_4_muki == 3) {
					this.co_j.pt = 84;
					this.co_j.muki = 0;
				}
			} else {
				this.co_j.pt = 116;
				this.j_tail_ac = 0;
				if (this.j_tokugi == 15 && this.j_4_muki == 2) {
					this.co_j.pt = 83;
					this.co_j.muki = 0;
				} else if (this.j_tokugi == 15 && this.j_4_muki == 3) {
					this.co_j.pt = 84;
					this.co_j.muki = 0;
				}
			}
		}
		i7 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][rightShiftIgnoreSign(this.co_j.y + 15, 5)];
		switch (i7) {
			case 9:
				if (
					this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][rightShiftIgnoreSign(this.co_j.y + 15, 5)] ==
					4
				) {
					this.maps.putBGCode(rightShiftIgnoreSign(this.co_j.x + 15, 5), rightShiftIgnoreSign(this.co_j.y + 15, 5), 4);
					this.j_mizu_f = true;
				} else {
					this.maps.putBGCode(rightShiftIgnoreSign(this.co_j.x + 15, 5), rightShiftIgnoreSign(this.co_j.y + 15, 5), 0);
				}
				this.addScore(5);
				this.gs.rsAddSound(6);
				if (this.clear_type == 2 || this.clear_type == 3) {
					var l6 = this.coin_kazu;
					this.getCoinTotal();
					if (l6 > 0 && this.coin_kazu == 0) {
						this.gs.rsAddSound(7);
						if (this.clear_type == 3) this.showHashigo();
					}
				}
				break;

			case 8:
				if ((this.clear_type != 2 && this.clear_type != 3) || this.coin_kazu <= 0) {
					if (
						this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][
							rightShiftIgnoreSign(this.co_j.y + 15, 5)
						] == 4
					) {
						this.maps.putBGCode(
							rightShiftIgnoreSign(this.co_j.x + 15, 5),
							rightShiftIgnoreSign(this.co_j.y + 15, 5),
							4
						);
						this.j_mizu_f = true;
					} else {
						this.maps.putBGCode(
							rightShiftIgnoreSign(this.co_j.x + 15, 5),
							rightShiftIgnoreSign(this.co_j.y + 15, 5),
							0
						);
					}
					this.gs.rsAddSound(2);
					this.stage_cc = 1;
					if (this.stage_max >= 2 && this.stage >= this.stage_max) this.addScore(1000);
					else this.addScore(100);
				}
				break;

			case 5:
			case 6:
				this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 15, 5) * 32;
				this.jShinu(1);
				break;
		}
		if (this.clear_type == 3 && this.coin_kazu <= 0 && this.co_j.y <= this.maps.wy_mini - 32 && this.stage_cc <= 0) {
			this.stage_cc = 1;
			this.co_j.c = 130;
			this.co_j.c1 = -9999;
			this.addScore(100);
			this.gs.rsAddSound(2);
		}
		if (this.co_j.y >= this.ochiru_y || (this.j_mizu_f && this.co_j.y >= this.ochiru_y - 16)) {
			this.co_j.c = 210;
			this.co_j.c1 = 0;
			this.co_j.y = this.ochiru_y + 64;
			this.j_jet_c = 0;
			this.j_v_c = 0;
		}
		this.co_j.wx = this.co_j.x - this.maps.wx;
		this.co_j.wy = this.co_j.y - this.maps.wy;
		if (this.co_j.wx < this.maps.my_wx_mini) this.maps.wx = this.co_j.x - this.maps.my_wx_mini;
		else if (this.co_j.wx > this.maps.my_wx_max) this.maps.wx = this.co_j.x - this.maps.my_wx_max;
		if (this.co_j.wy < this.maps.my_wy_mini) this.maps.wy = this.co_j.y - this.maps.my_wy_mini;
		else if (this.co_j.wy > this.maps.my_wy_max) this.maps.wy = this.co_j.y - this.maps.my_wy_max;
		if (this.maps.wx < this.maps.wx_mini) this.maps.wx = this.maps.wx_mini;
		else if (this.maps.wx > this.maps.wx_max) this.maps.wx = this.maps.wx_max;
		if (this.maps.wy < this.maps.wy_mini) this.maps.wy = this.maps.wy_mini;
		else if (this.maps.wy > this.maps.wy_max) this.maps.wy = this.maps.wy_max;
		if (this.j_tokugi == 14 && (this.gk.up_f || this.gk.down_f || this.gk.left_f || this.gk.right_f)) {
			this.mu_ato_p++;
			if (this.mu_ato_p > 31) this.mu_ato_p = 0;
			this.mu_ato_x[this.mu_ato_p] = this.co_j.x;
			this.mu_ato_y[this.mu_ato_p] = this.co_j.y;
			var j6 = this.mu_ato_p - 7;
			if (j6 < 0) j6 += 32;
			this.co_mu[0].x = this.mu_ato_x[j6];
			this.co_mu[0].y = this.mu_ato_y[j6];
			j6 = this.mu_ato_p - 14;
			if (j6 < 0) j6 += 32;
			this.co_mu[1].x = this.mu_ato_x[j6];
			this.co_mu[1].y = this.mu_ato_y[j6];
		}
	}

	/**
	 * 毎フレームの主人公の処理を行います
	 */
	jMove() {
		this.j_mizu_f = false;
		var j7 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15);
		this.AwaMove(j7, 2);
		if (this.jst_auto_right > 0)
			if (this.jst_auto_right == 1) {
				this.gk.right_f = true;
				this.gk.left_f = false;
				this.j_hashiru_f = false;
			} else if (this.jst_auto_right == 2) {
				this.gk.right_f = true;
				this.gk.left_f = false;
				this.j_hashiru_f = true;
			}
		if (this.gk.tr1_f) {
			if (this.tr1_c < 6) this.tr1_c++;
		} else {
			this.tr1_c = 0;
		}
		if (this.gk.tr1_f) {
			if (this.gk.tr1_c < 6) this.gk.tr1_c++;
		} else {
			this.gk.tr1_c = 0;
		}
		if (this.gk.tr2_f) {
			if (this.tr2_c < 2) this.tr2_c++;
		} else {
			this.tr2_c = 0;
		}
		if (this.gk.x_f) {
			if (this.xkey_c < 2) this.xkey_c++;
		} else {
			this.xkey_c = 0;
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
		if (this.gk.up_f) {
			this.up_key_c++;
			if (this.up_key_c > 2) this.up_key_c = 2;
		} else {
			this.up_key_c = 0;
		}
		if (this.gk.down_f) {
			this.down_key_c++;
			if (this.down_key_c > 2) this.down_key_c = 2;
		} else {
			this.down_key_c = 0;
		}
		if (this.co_j.c == 110) {
			// 敵を踏む
			if (this.gk.left_f) {
				this.co_j.vx -= 10;
				if (this.co_j.vx < -60) this.co_j.vx = -60;
			} else if (this.gk.right_f) {
				this.co_j.vx += 10;
				if (this.co_j.vx > 60) this.co_j.vx = 60;
			}
			this.co_j.c1++;
			if (this.co_j.c1 > 2) {
				this.co_j.c = 100;
				var i = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31);
				if (i >= 20) this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32 - 1;
				i = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31);
				if (i == 18 || i == 19) this.co_j.y -= 16;
			}
			this.co_j.wx = this.co_j.x - this.maps.wx;
			this.co_j.wy = this.co_j.y - this.maps.wy;
			this.co_j.pt = 109;
			this.moveViewPosition();
		} else if (this.co_j.c == 120) {
			// アイテムのドリルで穴を掘っている
			this.co_j.c1++;
			if (this.co_j.c1 > 6) this.co_j.c = 100;
			this.co_j.pt = 119;
			this.moveViewPosition();
		} else if (this.co_j.c == 130) {
			// ロードランナー時に特技として穴を掘っている
			this.co_j.c1++;
			if (this.co_j.c1 > 9) this.co_j.c = 100;
			this.moveViewPosition();
		} else if (this.co_j.c == 140) {
			// 	ロープまたはゆれる棒につかまっている
			if (this.gk.right_f) this.co_j.muki = 1;
			else if (this.gk.left_f) this.co_j.muki = 0;
			if (this.co_a[this.j_rope_id].c == 3200) {
				if (this.gk.up_f) {
					this.j_rope_r += 6;
					if (this.j_rope_r > 220) this.j_rope_r = 220;
					this.co_j.ac++;
					if (this.co_j.ac > 3) this.co_j.ac = 0;
				} else if (this.gk.down_f) {
					this.j_rope_r -= 6;
					if (this.j_rope_r < 48) this.j_rope_r = 48;
					this.co_j.ac++;
					if (this.co_j.ac > 3) this.co_j.ac = 0;
				} else {
					this.co_j.ac = 0;
				}
			} else if (this.gk.up_f) {
				this.j_rope_r -= 6;
				if (this.j_rope_r < 48) this.j_rope_r = 48;
				this.co_j.ac++;
				if (this.co_j.ac > 3) this.co_j.ac = 0;
			} else if (this.gk.down_f) {
				this.j_rope_r += 6;
				if (this.co_a[this.j_rope_id].c == 2800) {
					if (this.j_rope_r > 220) this.j_rope_r = 220;
				} else if (this.j_rope_r > 176) this.j_rope_r = 176;
				this.co_j.ac++;
				if (this.co_j.ac > 3) this.co_j.ac = 0;
			} else {
				this.co_j.ac = 0;
			}
			this.co_j.x =
				this.co_a[this.j_rope_id].x +
				rounddown(Math.cos((this.co_a[this.j_rope_id].vy * 3.1415926535897931) / 180) * this.j_rope_r, true, this) -
				16;
			this.co_j.y =
				this.co_a[this.j_rope_id].y +
				rounddown(Math.sin((this.co_a[this.j_rope_id].vy * 3.1415926535897931) / 180) * this.j_rope_r, true, this) -
				16;
			this.co_j.vx = 0;
			this.co_j.vy = 0;
			if (this.tr1_c == 1) {
				this.co_j.c = 100;
				if (this.co_a[this.j_rope_id].c == 2800 || this.co_a[this.j_rope_id].c == 3200) this.co_j.vy = -230;
				else this.co_j.vy = -200;
				this.j_jump_level = 1;
				this.j_jump_type = 0;
				this.co_j.pt = 103;
				this.co_j.ac = 0;
				this.j_djump_kf = true;
				this.gs.rsAddSound(3);
				if (this.co_a[this.j_rope_id].c == 2800 || this.co_a[this.j_rope_id].c == 3200) {
					if (this.co_j.muki == 0) this.co_j.vx = -80;
					else this.co_j.vx = 80;
				} else if (this.co_j.muki == 0) this.co_j.vx = -100;
				else this.co_j.vx = 100;
				if (this.co_a[this.j_rope_id].c == 3200) {
					var i1 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].y, 5) * 32 - 32 - 2;
					if (this.co_j.y > i1) this.co_j.y = i1;
				} else {
					var j1 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].y, 5) * 32 + 32;
					if (this.co_j.y < j1) this.co_j.y = j1;
				}
				this.j_rope_cf = true;
			}
			var word0 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][
				rightShiftIgnoreSign(this.co_j.y + 15, 5)
			];
			switch (word0) {
				case 9:
					if (
						this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][
							rightShiftIgnoreSign(this.co_j.y + 15, 5)
						] == 4
					) {
						this.maps.putBGCode(
							rightShiftIgnoreSign(this.co_j.x + 15, 5),
							rightShiftIgnoreSign(this.co_j.y + 15, 5),
							4
						);
						this.j_mizu_f = true;
					} else {
						this.maps.putBGCode(
							rightShiftIgnoreSign(this.co_j.x + 15, 5),
							rightShiftIgnoreSign(this.co_j.y + 15, 5),
							0
						);
					}
					this.addScore(5);
					this.gs.rsAddSound(6);
					if (this.clear_type == 2 || this.clear_type == 3) {
						var k1 = this.coin_kazu;
						this.getCoinTotal();
						if (k1 > 0 && this.coin_kazu == 0) {
							this.gs.rsAddSound(7);
							if (this.clear_type == 3) this.showHashigo();
						}
					}
					break;

				case 8:
					if ((this.clear_type != 2 && this.clear_type != 3) || this.coin_kazu <= 0) {
						if (
							this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][
								rightShiftIgnoreSign(this.co_j.y + 15, 5)
							] == 4
						) {
							this.maps.putBGCode(
								rightShiftIgnoreSign(this.co_j.x + 15, 5),
								rightShiftIgnoreSign(this.co_j.y + 15, 5),
								4
							);
							this.j_mizu_f = true;
						} else {
							this.maps.putBGCode(
								rightShiftIgnoreSign(this.co_j.x + 15, 5),
								rightShiftIgnoreSign(this.co_j.y + 15, 5),
								0
							);
						}
						this.gs.rsAddSound(2);
						this.stage_cc = 1;
						if (this.stage_max >= 2 && this.stage >= this.stage_max) this.addScore(1000);
						else this.addScore(100);
					}
					break;

				case 5:
				case 6:
					this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32;
					this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 15, 5) * 32;
					this.jShinu(1);
					break;
			}
			if (this.co_j.ac == 1 || this.co_j.ac == 2) this.co_j.pt = 1201;
			else this.co_j.pt = 1200;
			this.moveViewPosition();
		} else if (this.co_j.c == 145) {
			// 乗れるカイオール（方向キーで移動）に乗っている
			if (this.gk.right_f) {
				this.co_j.muki = 1;
				this.co_a[this.j_rope_id].x += 4;
				var l2 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].y - 32, 5);
				var l3 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].y - 1, 5);
				var l4 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].y + 31, 5);
				var l5 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].y + 63, 5);
				var l6 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].x + 63, 5);
				if (
					this.maps.map_bg[l6][l2] >= 18 ||
					this.maps.map_bg[l6][l3] >= 18 ||
					this.maps.map_bg[l6][l4] >= 18 ||
					this.maps.map_bg[l6][l5] >= 18
				)
					this.co_a[this.j_rope_id].x = l6 * 32 - 64;
			} else if (this.gk.left_f) {
				this.co_j.muki = 0;
				this.co_a[this.j_rope_id].x -= 4;
				var i3 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].y - 32, 5);
				var i4 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].y - 1, 5);
				var i5 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].y + 31, 5);
				var i6 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].y + 63, 5);
				var i7 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].x, 5);
				if (
					this.maps.map_bg[i7][i3] >= 18 ||
					this.maps.map_bg[i7][i4] >= 18 ||
					this.maps.map_bg[i7][i5] >= 18 ||
					this.maps.map_bg[i7][i6] >= 18
				)
					this.co_a[this.j_rope_id].x = i7 * 32 + 32;
			}
			if (this.co_j.muki == 1) this.co_a[this.j_rope_id].pt = 605;
			else this.co_a[this.j_rope_id].pt = 600;
			if (this.gk.up_f) {
				this.co_a[this.j_rope_id].y -= 4;
				if (this.co_a[this.j_rope_id].y < 352) this.co_a[this.j_rope_id].y = 352;
				var j3 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].x, 5);
				var j4 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].x + 31, 5);
				var j5 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].x + 63, 5);
				var j6 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].y - 32, 5);
				if (this.maps.map_bg[j3][j6] >= 18 || this.maps.map_bg[j4][j6] >= 18 || this.maps.map_bg[j5][j6] >= 18)
					this.co_a[this.j_rope_id].y = j6 * 32 + 64;
			} else if (this.gk.down_f) {
				this.co_a[this.j_rope_id].y += 4;
				if (this.co_a[this.j_rope_id].y > this.ochiru_y - 32) this.co_a[this.j_rope_id].y = this.ochiru_y - 32;
				var k3 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].x, 5);
				var k4 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].x + 31, 5);
				var k5 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].x + 63, 5);
				var k6 = rightShiftIgnoreSign(this.co_a[this.j_rope_id].y + 63, 5);
				if (this.maps.map_bg[k3][k6] >= 18 || this.maps.map_bg[k4][k6] >= 18 || this.maps.map_bg[k5][k6] >= 18)
					this.co_a[this.j_rope_id].y = k6 * 32 - 64;
			}
			this.co_j.x = this.co_a[this.j_rope_id].x + 16;
			this.co_j.y = this.co_a[this.j_rope_id].y - 16;
			this.co_j.pt = 100;
			if (this.tr1_c == 1) {
				this.co_j.c = 100;
				this.co_j.vy = -200;
				this.j_jump_level = 1;
				this.j_jump_type = 0;
				this.co_j.pt = 103;
				this.co_j.ac = 0;
				this.j_djump_kf = true;
				this.co_j.y--;
				this.gs.rsAddSound(3);
				if (this.co_j.muki == 0) this.co_j.vx = -60;
				else this.co_j.vx = 60;
				this.j_rope_cf = true;
			}
			var word1 = this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][
				rightShiftIgnoreSign(this.co_j.y + 15, 5)
			];
			switch (word1) {
				case 7:
				default:
					break;

				case 9:
					if (
						this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][
							rightShiftIgnoreSign(this.co_j.y + 15, 5)
						] == 4
					) {
						this.maps.putBGCode(
							rightShiftIgnoreSign(this.co_j.x + 15, 5),
							rightShiftIgnoreSign(this.co_j.y + 15, 5),
							4
						);
						this.j_mizu_f = true;
					} else {
						this.maps.putBGCode(
							rightShiftIgnoreSign(this.co_j.x + 15, 5),
							rightShiftIgnoreSign(this.co_j.y + 15, 5),
							0
						);
					}
					this.addScore(5);
					this.gs.rsAddSound(6);
					if (this.clear_type != 2 && this.clear_type != 3) break;
					var l1 = this.coin_kazu;
					this.getCoinTotal();
					if (l1 <= 0 || this.coin_kazu != 0) break;
					this.gs.rsAddSound(7);
					if (this.clear_type == 3) this.showHashigo();
					break;

				case 8:
					if ((this.clear_type == 2 || this.clear_type == 3) && this.coin_kazu > 0) break;
					if (
						this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5) - 1][
							rightShiftIgnoreSign(this.co_j.y + 15, 5)
						] == 4
					) {
						this.maps.putBGCode(
							rightShiftIgnoreSign(this.co_j.x + 15, 5),
							rightShiftIgnoreSign(this.co_j.y + 15, 5),
							4
						);
						this.j_mizu_f = true;
					} else {
						this.maps.putBGCode(
							rightShiftIgnoreSign(this.co_j.x + 15, 5),
							rightShiftIgnoreSign(this.co_j.y + 15, 5),
							0
						);
					}
					this.gs.rsAddSound(2);
					this.stage_cc = 1;
					if (this.stage_max >= 2 && this.stage >= this.stage_max) this.addScore(1000);
					else this.addScore(100);
					break;

				case 5:
				case 6:
					this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32;
					this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 15, 5) * 32;
					this.jShinu(1);
					break;
			}
			this.moveViewPosition();
		} else if (this.co_j.c == 150) {
			// setMyWaitで硬直している お店など利用中
			this.co_j.pt = this.setmyw_pt;
			this.co_j.muki = this.setmyw_muki;
			this.co_j.c1--;
			if (this.co_j.c1 <= 0) this.co_j.c = 100;
			this.moveViewPosition();
		} else if (this.co_j.c == 200) {
			// 敵に接触した
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
			if (this.co_j.wy >= this.gg.di.height) {
				this.co_j.c = 210;
				this.co_j.c1 = 0;
				this.co_j.y = this.maps.wy + this.gg.di.height + 32;
				this.co_j.pt = 0;
			}
		} else if (this.co_j.c == 210) {
			// 死亡し、ゲームオーバー画面が出る前
			if (this.spot_c == 100) this.spot_c = 200;
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
		} else if (this.co_j.c == 220 || this.co_j.c == 230) {
			if (this.co_j.c == 220) this.co_j.pt = 114;
			// 上から潰れて死亡
			else if (this.co_j.c == 230) this.co_j.pt = 115; // 横から潰れて死亡
			this.co_j.c1++;
			if (this.co_j.c1 >= 25) {
				this.co_j.c = 210;
				this.co_j.c1 = 0;
			}
		} else if (this.co_j.c == 240) {
			// 針などに触れて死亡
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
			if (this.co_j.wy >= this.gg.di.height) {
				this.co_j.c = 210;
				this.co_j.c1 = 0;
				this.co_j.y = this.maps.wy + this.gg.di.height + 32;
				this.co_j.pt = 0;
			}
		} else if (this.co_j.c == 250) {
			// ドットイート等で敵に接触した
			this.co_j.c1++;
			if (this.co_j.c1 <= 5) {
				this.co_j.pt = 110;
				this.co_j.muki = 0;
			} else if (this.co_j.c1 <= 10) {
				this.co_j.pt = 111;
				this.co_j.muki = 0;
			} else if (this.co_j.c1 <= 15) {
				this.co_j.pt = 112;
				this.co_j.muki = 0;
			} else if (this.co_j.c1 <= 20) {
				this.co_j.pt = 113;
				this.co_j.muki = 0;
			} else {
				this.co_j.muki = 0;
				this.co_j.c = 210;
				this.co_j.c1 = 0;
				this.co_j.y = this.maps.wy + this.gg.di.height + 32;
				this.co_j.pt = 0;
			}
			this.co_j.wx = this.co_j.x - this.maps.wx;
			this.co_j.wy = this.co_j.y - this.maps.wy;
		} else if (this.co_j.c == 300) {
			// 土管に入る
			this.co_j.pt = 1100;
			this.co_j.c1++;
			if (this.co_j.c1 >= 32) {
				this.co_j.c = 310;
				this.co_j.c1 = 0;
				this.j_jump_type = 0;
				this.j_djump_kf = true;
				this.co_j.pt = 1110;
			}
			if (this.co_j.c1 == 1) this.gs.rsAddSound(21);
			this.moveViewPosition();
		} else if (this.co_j.c == 310) {
			// 土管移動中
			this.co_j.pt = 1110;
			if (this.stage_cc <= 0) {
				this.co_j.c1++;
				if (this.dokan_mode == 2 || this.co_j.c2 >= 100) {
					// ワープ土管
					if (this.co_j.c1 >= 10) {
						this.co_j.c = 320;
						this.co_j.c1 = 42;
						var k = 0;
						do {
							if (k > this.a_kazu) break;
							if (
								(this.sl_step == 0 || this.sl_step == 1 || this.sl_step == 10 || this.sl_step == 11) &&
								(this.co_j.c2 < 100 || this.co_j.c2 >= 200 || this.co_j.c5 != 1
									? this.co_j.c2 < 200 || this.co_j.c2 >= 300
										? this.co_j.c2 < 300 || this.co_j.c2 >= 400
											? this.co_j.c2 >= 100
												? this.co_a[k].c == 300 &&
												  this.co_a[k].c4 != 1 &&
												  this.co_j.c2 == this.co_a[k].c3 &&
												  this.co_a[k].c5 != 1
												: this.co_a[k].c == 300 &&
												  this.co_a[k].c4 != 1 &&
												  (this.co_a[k].c3 < 100 || this.co_a[k].c3 >= 200
														? this.co_j.c2 == this.co_a[k].c3
														: this.co_j.c2 == this.co_a[k].c3 - 100 && this.co_a[k].c5 != 0)
											: this.co_a[k].c == 300 &&
											  this.co_a[k].c4 != 1 &&
											  (this.co_j.c2 == this.co_a[k].c3 || this.co_j.c2 - 100 == this.co_a[k].c3)
										: this.co_a[k].c == 300 &&
										  this.co_a[k].c4 != 1 &&
										  (this.co_j.c2 == this.co_a[k].c3 || this.co_j.c2 + 100 == this.co_a[k].c3)
									: this.co_a[k].c == 300 && this.co_a[k].c4 != 1 && this.co_j.c2 == this.co_a[k].c3 + 100)
							) {
								this.co_j.x = this.co_a[k].x + 16;
								this.co_j.y = this.co_a[k].y - 32;
								if (this.co_a[k].c3 >= 100 && this.co_a[k].c3 < 200) {
									this.co_j.y = this.co_a[k].y + 32;
									this.co_j.vy = 20;
								} else if (this.co_a[k].c3 >= 200 && this.co_a[k].c3 < 300) {
									this.co_j.x = this.co_a[k].x - 32;
									this.co_j.y = this.co_a[k].y + 16;
									this.co_j.muki = 0;
									this.co_j.vy = 20;
								} else if (this.co_a[k].c3 >= 300 && this.co_a[k].c3 < 400) {
									this.co_j.x = this.co_a[k].x + 32;
									this.co_j.y = this.co_a[k].y + 16;
									this.co_j.muki = 1;
									this.co_j.vy = 20;
								}
								this.co_j.c2 = this.co_a[k].c3;
								this.co_a[k].c4 = 1;
								this.nkscroll_con = 0;
								this.nkscroll_zsc = true;
								break;
							}
							k++;
						} while (true);
						if (k > this.a_kazu)
							if (this.co_j.c2 >= 200 && this.co_j.c2 < 300) {
								this.co_j.muki = 0;
								this.co_j.vy = 20;
							} else if (this.co_j.c2 >= 300 && this.co_j.c2 < 400) {
								this.co_j.muki = 1;
								this.co_j.vy = 20;
							}
						for (var l = 0; l <= this.a_kazu; l++) {
							if (this.co_a[l].c < 100 && this.co_a[l].c != 60) continue;
							this.co_a[l].gf = true;
							if (this.co_a[l].c != 300) continue;
							if (this.co_a[l].c3 >= 100 && this.co_a[l].c3 < 200) {
								if (this.co_j.x != this.co_a[l].x + 16 || this.co_j.y != this.co_a[l].y + 32) this.co_a[l].c4 = 0;
								continue;
							}
							if (this.co_a[l].c3 >= 200 && this.co_a[l].c3 < 300) {
								if (this.co_j.x != this.co_a[l].x - 32 || this.co_j.y != this.co_a[l].y + 16) this.co_a[l].c4 = 0;
								continue;
							}
							if (this.co_a[l].c3 >= 300 && this.co_a[l].c3 < 400) {
								if (this.co_j.x != this.co_a[l].x + 32 || this.co_j.y != this.co_a[l].y + 16) this.co_a[l].c4 = 0;
								continue;
							}
							if (this.co_j.x != this.co_a[l].x + 16 || this.co_j.y != this.co_a[l].y - 32) this.co_a[l].c4 = 0;
						}

						if (this.sl_step == 10 || this.sl_step == 11) {
							// 強制スクロール中
							//this.maps.wx = (this.maps.wx_mini < this.co_j.x - 192) ? this.co_j.x - 192 : this.maps.wx_mini;
							this.maps.wx = this.co_j.x - 192;
							this.ks_wx = this.maps.wx;
						}
						this.moveViewPosition();
					}
				} else if (this.co_j.c1 == 10) {
					// リンク土管
					location.href = this.tdb.getValue(concatString("url", (this.co_j.c2 + 1) as 1 | 2 | 3 | 4));
				} else if (this.co_j.c1 > 80) this.ml_mode = 50;
			}
		} else if (this.co_j.c == 320) {
			// 土管から出る
			this.co_j.pt = 1100;
			this.co_j.c1--;
			if (this.co_j.c1 <= 0) {
				this.co_j.c = 100;
				this.co_j.c1 = 0;
				this.co_j.pt = 100;
			}
		} else if (this.co_j.c == 400) {
			// 人間大砲に入る＆照準合わせ中
			if (this.co_j.c1 > 48) {
				this.co_j.c1--;
				this.co_j.pt = 100;
				if (this.co_j.c1 <= 48) this.co_j.pt = 0;
			} else {
				this.co_j.pt = 0;
			}
			if (this.co_a[this.j_rope_id].c3 == 0 || this.co_a[this.j_rope_id].c3 == 4) {
				var i2 = this.co_a[this.j_rope_id].c4;
				if (i2 == 345 || i2 == 330 || i2 == 315 || i2 == 300 || i2 == 285) this.co_a[this.j_rope_id].vx = 0;
				if (this.gk.up_f) this.co_a[this.j_rope_id].vx = -3;
				else if (this.gk.down_f) this.co_a[this.j_rope_id].vx = 3;
				if (this.co_a[this.j_rope_id].vx < 0) {
					if (this.co_a[this.j_rope_id].c4 == 270) this.co_a[this.j_rope_id].vx = 0;
				} else if (this.co_a[this.j_rope_id].vx > 0 && this.co_a[this.j_rope_id].c4 == 0)
					this.co_a[this.j_rope_id].vx = 0;
				this.co_a[this.j_rope_id].c4 += this.co_a[this.j_rope_id].vx;
				if (this.co_a[this.j_rope_id].c4 < 0) this.co_a[this.j_rope_id].c4 += 360;
				if (this.co_a[this.j_rope_id].c4 >= 360) this.co_a[this.j_rope_id].c4 -= 360;
				this.co_j.muki = 1;
			} else if (this.co_a[this.j_rope_id].c3 == 1 || this.co_a[this.j_rope_id].c3 == 3) {
				var j2 = this.co_a[this.j_rope_id].c4;
				if (j2 == 195 || j2 == 210 || j2 == 225 || j2 == 240 || j2 == 255) this.co_a[this.j_rope_id].vx = 0;
				if (this.gk.up_f) this.co_a[this.j_rope_id].vx = 3;
				else if (this.gk.down_f) this.co_a[this.j_rope_id].vx = -3;
				if (this.co_a[this.j_rope_id].vx < 0) {
					if (this.co_a[this.j_rope_id].c4 == 180) this.co_a[this.j_rope_id].vx = 0;
				} else if (this.co_a[this.j_rope_id].vx > 0 && this.co_a[this.j_rope_id].c4 == 270)
					this.co_a[this.j_rope_id].vx = 0;
				this.co_a[this.j_rope_id].c4 += this.co_a[this.j_rope_id].vx;
				this.co_j.muki = 0;
			} else if (this.co_a[this.j_rope_id].c3 == 2) {
				var k2 = this.co_a[this.j_rope_id].c4;
				if (k2 == 15 || k2 == 30 || k2 == 45 || k2 == 60 || k2 == 75) this.co_a[this.j_rope_id].vx = 0;
				if (this.gk.up_f) this.co_a[this.j_rope_id].vx = -3;
				else if (this.gk.down_f) this.co_a[this.j_rope_id].vx = 3;
				if (this.co_a[this.j_rope_id].vx < 0) {
					if (this.co_a[this.j_rope_id].c4 == 0) this.co_a[this.j_rope_id].vx = 0;
				} else if (this.co_a[this.j_rope_id].vx > 0 && this.co_a[this.j_rope_id].c4 == 90)
					this.co_a[this.j_rope_id].vx = 0;
				this.co_a[this.j_rope_id].c4 += this.co_a[this.j_rope_id].vx;
				this.co_j.muki = 1;
			}
			if (this.co_j.c1 > 48) {
				// 人間大砲に入っている途中
				this.co_j.x =
					this.co_a[this.j_rope_id].x +
					16 +
					rounddown(Math.cos((this.co_a[this.j_rope_id].c4 * 3.1415926535897931) / 180) * this.co_j.c1, true, this) -
					16;
				this.co_j.y =
					this.co_a[this.j_rope_id].y +
					16 +
					rounddown(Math.sin((this.co_a[this.j_rope_id].c4 * 3.1415926535897931) / 180) * this.co_j.c1, true, this) -
					16;
			} else {
				this.co_j.x = this.co_a[this.j_rope_id].x;
				this.co_j.y = this.co_a[this.j_rope_id].y;
			}
			this.j_cannon_c = 1;
			if (this.tr1_c >= 1 && this.tr1_c <= 5 && this.co_a[this.j_rope_id].c4 % 15 == 0 && this.co_j.c1 <= 48) {
				// 人間大砲に完全に入った
				this.co_j.x =
					this.co_a[this.j_rope_id].x +
					16 +
					rounddown(Math.cos((this.co_a[this.j_rope_id].c4 * 3.1415926535897931) / 180) * this.co_j.c1, true, this) -
					16;
				this.co_j.y =
					this.co_a[this.j_rope_id].y +
					16 +
					rounddown(Math.sin((this.co_a[this.j_rope_id].c4 * 3.1415926535897931) / 180) * this.co_j.c1, true, this) -
					16;
				this.j_jump_type = 0;
				this.co_j.ac = 0;
				this.co_j.c = 100;
				this.co_j.vx = rounddown(Math.cos((this.co_a[this.j_rope_id].c4 * 3.1415926535897931) / 180) * 160, true, this);
				this.co_j.vy = rounddown(Math.sin((this.co_a[this.j_rope_id].c4 * 3.1415926535897931) / 180) * 160, true, this);
				this.j_jump_level = 5;
				this.j_djump_kf = true;
				this.co_j.pt = 101;
				if (this.co_j.vy > 0) this.co_j.pt = 102;
				if (Math.abs(this.co_j.vy) < 50) this.co_j.pt = 83;
				for (var j = 0; j <= 5; j++) {
					this.j_zan_x[j] = this.co_j.x;
					this.j_zan_y[j] = this.co_j.y;
					this.j_zan_pt[j] = 0;
					this.j_zan_pth[j] = this.co_j.muki;
				}

				this.j_zan_p = 0;
				this.j_zan_c = 0;
				this.j_zan_nagasa = 5;
				this.j_zan_f = true;
				this.j_zan_cf = true;
				this.j_rope_cf = true;
				this.j_cannon_c = 22;
				this.j_cannon_type = 0;
				this.gs.rsAddSound(19);
			}
			if (this.co_j.c1 <= 48 && this.co_j.c != 100) {
				// 人間大砲から発射中
				this.co_j.wx = this.co_j.x - this.maps.wx;
				this.co_j.wy = this.co_j.y - this.maps.wy;
				if (
					this.co_j.c1 <= 48 &&
					this.co_j.c != 100 &&
					(this.scroll_area < 2 || this.scroll_area > 5) &&
					this.j_tokugi != 14 &&
					this.j_tokugi != 15
				) {
					if (
						this.co_a[this.j_rope_id].c3 == 0 ||
						this.co_a[this.j_rope_id].c3 == 2 ||
						this.co_a[this.j_rope_id].c3 == 4
					) {
						if (this.co_j.wx > this.maps.my_wx_mini) {
							this.co_j.wx -= 6;
							if (this.co_j.wx < this.maps.my_wx_mini) this.co_j.wx = this.maps.my_wx_mini;
							this.maps.wx = this.co_j.x - this.co_j.wx;
						} else if (this.co_j.wx < this.maps.my_wx_mini) {
							this.co_j.wx += 6;
							if (this.co_j.wx > this.maps.my_wx_mini) this.co_j.wx = this.maps.my_wx_mini;
							this.maps.wx = this.co_j.x - this.co_j.wx;
						}
					} else if (this.co_j.wx < this.maps.my_wx_max) {
						this.co_j.wx += 6;
						if (this.co_j.wx > this.maps.my_wx_max) this.co_j.wx = this.maps.my_wx_max;
						this.maps.wx = this.co_j.x - this.co_j.wx;
					} else if (this.co_j.wx > this.maps.my_wx_max) {
						this.co_j.wx -= 6;
						if (this.co_j.wx < this.maps.my_wx_max) this.co_j.wx = this.maps.my_wx_max;
						this.maps.wx = this.co_j.x - this.co_j.wx;
					}
					if (this.co_a[this.j_rope_id].c3 == 2) {
						if (this.co_j.wy > this.maps.my_wy_mini) {
							this.co_j.wy -= 6;
							if (this.co_j.wy < this.maps.my_wy_mini) this.co_j.wy = this.maps.my_wy_mini;
							this.maps.wy = this.co_j.y - this.co_j.wy;
						} else if (this.co_j.wy < this.maps.my_wy_mini) {
							this.co_j.wy += 6;
							if (this.co_j.wy > this.maps.my_wy_mini) this.co_j.wy = this.maps.my_wy_mini;
							this.maps.wy = this.co_j.y - this.co_j.wy;
						}
					} else if (this.co_j.wy < this.maps.my_wy_max) {
						this.co_j.wy += 6;
						if (this.co_j.wy > this.maps.my_wy_max) this.co_j.wy = this.maps.my_wy_max;
						this.maps.wy = this.co_j.y - this.co_j.wy;
					} else if (this.co_j.wy > this.maps.my_wy_max) {
						this.co_j.wy -= 6;
						if (this.co_j.wy < this.maps.my_wy_max) this.co_j.wy = this.maps.my_wy_max;
						this.maps.wy = this.co_j.y - this.co_j.wy;
					}
				}
			} else {
				this.moveViewPosition();
			}
			if (this.maps.wx < this.maps.wx_mini) this.maps.wx = this.maps.wx_mini;
			else if (this.maps.wx > this.maps.wx_max) this.maps.wx = this.maps.wx_max;
			if (this.maps.wy < this.maps.wy_mini) this.maps.wy = this.maps.wy_mini;
			else if (this.maps.wy > this.maps.wy_max) this.maps.wy = this.maps.wy_max;
		}
	}

	/**
	 * 主人公の位置に合わせて画面をスクロールさせ、表示するマップ位置を変更します
	 */
	moveViewPosition() {
		this.co_j.wx = this.co_j.x - this.maps.wx;
		this.co_j.wy = this.co_j.y - this.maps.wy;

		if (this.co_j.wx < this.maps.my_wx_mini) this.maps.wx = this.co_j.x - this.maps.my_wx_mini;
		else if (this.co_j.wx > this.maps.my_wx_max) this.maps.wx = this.co_j.x - this.maps.my_wx_max;
		if (this.co_j.wy < this.maps.my_wy_mini) this.maps.wy = this.co_j.y - this.maps.my_wy_mini;
		else if (this.co_j.wy > this.maps.my_wy_max) this.maps.wy = this.co_j.y - this.maps.my_wy_max;

		if (this.maps.wx < this.maps.wx_mini) this.maps.wx = this.maps.wx_mini;
		else if (this.maps.wx > this.maps.wx_max) this.maps.wx = this.maps.wx_max;
		if (this.maps.wy < this.maps.wy_mini) this.maps.wy = this.maps.wy_mini;
		else if (this.maps.wy > this.maps.wy_max) this.maps.wy = this.maps.wy_max;
	}

	/**
	 * 主人公を殺します。
	 *
	 * * 1: その場で回転しながら死亡
	 * * 2: 飛び上がって回転しながら死亡
	 * * 3: 縦に潰れて死亡
	 * * 4: 横に潰れて死亡
	 * * 5: 強制スクロールで画面外に出て死亡
	 * @param {number} [type=1] 死因
	 * @see {@link MasaoJSS#setMyMiss}
	 */
	jShinu(i: number) {
		this.co_j.c1 = 0;
		this.co_j.c2 = 0;
		this.j_zan_f = false;
		this.j_jet_c = 0;
		this.j_v_c = 0;
		this.j_muteki_c = 0;
		this.j_hp = 0;
		this.co_mu[0].c = 0;
		this.co_mu[1].c = 0;
		this.j_cannon_c = 1;
		this.setmyw_w = -1;
		this.km.initAll();
		this.km.mode = 10;
		if (i == 1) this.co_j.c = 240;
		else if (i == 2) {
			this.co_j.c = 200;
			this.co_j.vy = -280;
		} else if (i == 3) this.co_j.c = 220;
		else if (i == 4) this.co_j.c = 230;
		else if (i == 5) {
			this.co_j.c = 210;
			this.co_j.y = this.ochiru_y + 64;
			this.co_j.c1 = -8;
		}
		if (this.j_tokugi == 14 || this.j_tokugi == 15) this.co_j.c = 250;
		this.gs.rsAddSound(24);
		this.sendHighscore();
	}

	/**
	 * 主人公が敵を踏んだエフェクトを発生させます。引数でジャンプの高さを還ることができます。
	 * * 1: 亀などの敵を踏んだときの高さ
	 * * 2: ポッピー・エアームズを踏んだときの高さ
	 * * 3: ボスを踏んだときの高さ
	 *
	 * @param {number} [type=1] 高さ
	 * @see {@link MasaoJSS#setMyPress}
	 * @returns {boolean} 成功したかどうか
	 */
	jFumu(i: number) {
		if (this.co_j.c < 100 || this.co_j.c >= 200) return false;
		this.gs.rsAddSound(8);
		this.co_j.y = this.co_j.y - 10;
		this.co_j.vy = -160;
		this.j_jump_type = 1;
		this.co_j.c = 110;
		this.co_j.c1 = 0;
		this.co_j.pt = 109;
		if (i == 2) this.co_j.vy = -220;
		else if (i == 3) this.co_j.vy = -320;
		return true;
	}

	/**
	 * マップ上の座標をピクセル単位で指定し、そのタイルに坂道ブロックが存在した場合、与えたX座標におけるその坂道ブロックの床面のY座標を得ます
	 * @param x {number} マップX座標(ピクセル単位)
	 * @param y {number} マップY座標(ピクセル単位)
	 * @returns {number} 坂道の床面のY座標(ピクセル単位) 坂道ブロックがない場合、(なぜか)y-31が返る
	 */
	getSakamichiY(i: number, j: number) {
		var k = 0;
		var l = i - rightShiftIgnoreSign(i, 5) * 32;
		var word0 = this.maps.map_bg[rightShiftIgnoreSign(i, 5)][rightShiftIgnoreSign(j, 5)];
		if (word0 == 18) {
			var i1 = 31 - l;
			k = rightShiftIgnoreSign(j, 5) * 32 + i1 - 31;
		} else if (word0 == 19) {
			var j1 = l;
			k = rightShiftIgnoreSign(j, 5) * 32 + j1 - 31;
		} else {
			k = j - 31;
		}
		return k;
	}

	/**
	 * TODO: 加筆求む
	 * @param x {number}
	 * @param y {number}
	 * @param type {number}
	 */
	jZutuki(i: number, j: number, k: number) {
		for (var l = 0; l <= this.t_kazu; l++) {
			if (this.co_t[l].c < 100) continue;
			var characterobject = this.co_t[l];
			var flag = false;
			if (k == 1) {
				if (this.j_tokugi == 15 && (this.j_4_muki == 2 || this.j_4_muki == 3)) {
					if (Math.abs(i - characterobject.x) < 25 && Math.abs(j - characterobject.y) < 23) flag = true;
				} else if (Math.abs(i - characterobject.x) < 25 && Math.abs(j - characterobject.y) < 23) flag = true;
			} else if (k == 2) {
				if (Math.abs(i - characterobject.x) < 54 && j == characterobject.y) flag = true;
			} else if (Math.abs(i - characterobject.x) < 34 && j == characterobject.y) flag = true;
			if (!flag) continue;
			if (i > characterobject.x) {
				characterobject.pth = 1;
				characterobject.vx = -7;
			} else {
				characterobject.pth = 0;
				characterobject.vx = 7;
			}
			if (characterobject.c >= 1200 && characterobject.c < 1300) {
				characterobject.c = 54;
				characterobject.vy = -25;
			} else if (characterobject.c >= 1400 && characterobject.c < 1500) {
				characterobject.c = 57;
				characterobject.c1 = 0;
			} else if (characterobject.c == 1190) {
				characterobject.c = 55;
				characterobject.c1 = 0;
				var i1 = rightShiftIgnoreSign(characterobject.x, 5);
				var j1 = rightShiftIgnoreSign(characterobject.y, 5);
				if (characterobject.c5 == 1) this.onASwitch(i1 - 5, j1 - 5, i1 + 5, j1 + 5);
				else this.onASwitch(i1 - 10, j1 - 10, i1 + 10, j1 + 10);
			} else {
				characterobject.c = 52;
				characterobject.vy = -30;
				if (this.j_tokugi == 14 || this.j_tokugi == 15) {
					characterobject.c = 55;
					characterobject.c1 = 0;
				}
			}
			if (k == 1) this.gs.rsAddSound(9);
		}
	}

	/**
	 * 指定したマップ上のピクセル座標の位置に水があるかどうかを調べる
	 * @param x {number} X座標(ピクセル座標)
	 * @param y {number} Y座標(ピクセル座標)
	 * @returns {boolean} 指定した座標が水かどうか
	 */
	checkWater(i: number, j: number) {
		var k = this.maps.getBGCode(i, j);
		if (k == 4) return true;
		if (k == 8 || k == 9) {
			if (this.maps.getBGCode(i - 32, j) == 4) return true;
		} else if (k >= 15 && k <= 19 && this.maps.getBGCode(i, j - 32) == 4) return true;
		return false;
	}

	/**
	 * 敵を追加する
	 * @param x {number} X座標(ピクセル座標)
	 * @param y {number} Y座標(ピクセル座標)
	 * @param teki_type {(string|number)} 敵の種類
	 * @param l {number} その敵が出現するスクロール位置
	 */
	tSet(x: number, y: number, teki_type: number, l: number) {
		// 敵の個数に関する後方互換性オプションがONのときは敵の数に上限設定
		const t_limit = this.tdb.options["bc-enemy-number"] ? 219 : Infinity;

		let i = 0;
		do {
			if (i > t_limit) break;
			if (i > this.t_kazu) this.co_t.push(new CharacterObject());
			if (this.co_t[i].c <= 0) {
				// 未使用の敵オブジェクトがあったのでこれを利用

				this.co_t[i].init();
				const characterobject = this.co_t[i];
				characterobject.c = 10;
				characterobject.c1 = l;
				characterobject.c2 = teki_type;
				characterobject.c3 = x;
				characterobject.c4 = y;
				characterobject.x = x;
				characterobject.y = y;
				// パーツの定義を探す
				const partsDefinition = this.getEnemyDefinition(teki_type);
				if (partsDefinition != null) {
					// オブジェクトの初期化
					characterobject.c2 = partsDefinition.nativeCode - 5000;
					partsDefinition.native.initFactory(characterobject.c2, partsDefinition.properties)(characterobject, this);
					// コントローラーを設定
					characterobject.controller = partsDefinition.native.controllerFactory(partsDefinition.properties);
					break;
				}
				// EnemyController未対応の敵コードの処理
				switch (teki_type) {
					case 1190:
						characterobject.c3 = x - 64;
						characterobject.c5 = 0;
						break;

					case 1191:
						characterobject.c2 = 1190;
						characterobject.c3 = x - 64;
						characterobject.c5 = 1;
						break;
				}
				break;
			}
			i++;
		} while (true);
	}

	/**
	 * ボスなどによって投げられる敵を設置する
	 * @param x {number} X座標(ピクセル座標)
	 * @param y {number} Y座標(ピクセル座標)
	 * @param k {number} 敵コード
	 * @param l {number} 初速（X軸方向）
	 */
	tSetBoss(i: number, j: number, k: number, l: number) {
		var t_limit, i1;
		// 敵の個数に関する後方互換性オプション
		if (this.tdb.options["bc-enemy-number"]) {
			t_limit = 229;
			i1 = 220;
		} else {
			t_limit = Infinity;
			i1 = 0;
		}
		do {
			if (i1 > t_limit) break;
			while (i1 > this.t_kazu) this.co_t.push(new CharacterObject());
			if (this.co_t[i1].c <= 0) {
				var characterobject = this.co_t[i1];
				characterobject.init();
				characterobject.c = k;
				characterobject.c1 = 0;
				characterobject.c2 = 0;
				characterobject.c3 = i;
				characterobject.c4 = j;
				characterobject.x = i;
				characterobject.y = j;
				characterobject.vx = l;

				var partsDefinition = this.getEnemyDefinition(k);
				if (partsDefinition != null) {
					characterobject.c = partsDefinition.nativeCode - 5000;
					partsDefinition.native.initFactory(characterobject.c, partsDefinition.properties)(characterobject, this);
					// コントローラーを設定
					characterobject.controller = partsDefinition.native.controllerFactory(partsDefinition.properties);
				}
				break;
			}
			i1++;
		} while (true);
	}

	/**
	 * 指定された敵コードの定義オブジェクトを返します。
	 * @param code {(string|number)} 敵コード
	 * @returns {PartsDefinition} 定義オブジェクト
	 * @private
	 */
	getEnemyDefinition(code: string | number): Parts | null {
		var customParts = this.customParts;
		// カスタムパーツを探す
		if (customParts && customParts[code]) {
			return customParts[code];
		}
		// ネイティブな敵を探す
		if (code in EnemyController.available) {
			var obj = EnemyController.available[code as keyof typeof EnemyController.available];
			return {
				properties: obj.properties,
				native: obj,
				nativeCode: (code as number) + 5000,
			};
		}
		return null;
	}

	/**
	 * 敵のフレーム毎の処理を行います
	 */
	tMove() {
		var flag = false;
		for (var i = 0; i <= this.t_kazu; i++) {
			if (this.co_t[i].c == 0 || (this.co_t[i].x < this.maps.wx - this.gg.di.width && this.co_t[i].c < 1200)) continue;
			var characterobject = this.co_t[i];
			if (characterobject.controller != null) {
				// この敵の挙動を制御する関数がある
				characterobject.controller(characterobject, this, i);
			}
			var l20 = characterobject.x;
			var i21 = characterobject.y;
			switch (characterobject.c) {
				case 1310:
				default:
					break;

				case 10:
					/*
					 * 10: まだ出現していない敵
					 * c1: 出現するためのX座標?
					 * c2: 本来の敵コード
					 */
					if (this.maps.wx >= characterobject.c1) {
						characterobject.c = characterobject.c2;
						characterobject.c1 = 0;
						characterobject.c2 = 0;
					}
					break;

				case 50:
					// 敵死亡
					characterobject.c1++;
					if (
						characterobject.c2 >= 0 &&
						this.yo[characterobject.c2].con >= 350 &&
						this.yo[characterobject.c2].con < 400
					)
						i21 = this.getSHCOY(
							this.yo[characterobject.c2].x,
							this.yo[characterobject.c2].y,
							this.yo[characterobject.c2].x2,
							this.yo[characterobject.c2].y2,
							l20 + 15
						);
					if (characterobject.c1 > 14) {
						characterobject.c = 0;
						this.addScore(10);
					}
					break;

				case 52:
					// アイテム攻撃による敵死亡
					l20 += characterobject.vx;
					characterobject.vy += 5;
					if (characterobject.vy > 25) characterobject.vy = 25;
					i21 += characterobject.vy;
					if (i21 > this.maps.wy + this.gg.di.height) {
						characterobject.c = 0;
						this.addScore(10);
					}
					break;

				case 54:
					// 追跡亀をアイテムで倒す
					l20 += characterobject.vx;
					characterobject.vy += 5;
					if (characterobject.vy > 25) characterobject.vy = 25;
					i21 += characterobject.vy;
					if (i21 > this.maps.wy + this.gg.di.height) {
						characterobject.c = 60;
						characterobject.c1 = 0;
					}
					break;

				case 55:
					// シューティングまたは４方向移動の時敵をアイテムで倒す
					characterobject.c1++;
					if (characterobject.c1 == 1) this.addScore(10);
					characterobject.pth = 0;
					if (characterobject.c1 <= 3) characterobject.pt = 172;
					else if (characterobject.c1 <= 6) characterobject.pt = 173;
					else if (characterobject.c1 <= 9) {
						characterobject.pt = 174;
					} else {
						characterobject.pt = 174;
						characterobject.c = 0;
					}
					break;

				case 57:
					// 重力無視の追跡ピカチー等をアイテムで倒す
					characterobject.c1++;
					characterobject.pth = 0;
					if (characterobject.c1 <= 3) characterobject.pt = 172;
					else if (characterobject.c1 <= 6) characterobject.pt = 173;
					else if (characterobject.c1 <= 9) {
						characterobject.pt = 174;
					} else {
						characterobject.pt = 174;
						characterobject.c = 65;
						characterobject.c1 = 0;
					}
					break;

				case 60:
					// アイテムで倒した追跡亀の復活待機中
					if (characterobject.c1 == 1) {
						i21 = this.maps.wy_mini - 32;
						var j = 0;
						do {
							if (j > 15) break;
							if (this.scroll_area == 2 || this.scroll_area == 4)
								l20 = 32 + this.ranInt(rounddown(this.gg.di.width / 32)) * 32;
							else if (this.scroll_area == 3 || this.scroll_area == 5) {
								l20 = 32 + this.ranInt(rounddown((this.gg.di.width * 2) / 32)) * 32;
							} else {
								l20 = (rightShiftIgnoreSign(this.co_j.x, 5) + this.ranInt(17) - 8) * 32;
								if (l20 < 32) l20 = 32;
								else if (l20 > this.mapWidth * 32) l20 = this.mapWidth * 32;
							}
							var l36 = this.maps.getBGCode(l20 + 15, i21 + 32 + 15);
							if (l36 <= 10 || l36 == 15) {
								characterobject.muki = this.ranInt(2) as InversionKind;
								characterobject.c1 = 2;
								break;
							}
							j++;
						} while (true);
						characterobject.pt = 0;
					} else if (characterobject.c1 < 50) {
						characterobject.c1++;
						characterobject.pt = 0;
					} else if (characterobject.c1 >= 50) {
						if (++i21 >= this.maps.wy_mini) characterobject.c = 1220;
						characterobject.pt = 140;
						characterobject.pth = characterobject.muki;
					}
					break;

				case 65:
					// アイテムで倒した重力無視の追跡ピカチー等の復活待機中
					characterobject.c1++;
					if (characterobject.c1 < 50) {
						i21 = this.maps.wy_mini - 32;
						characterobject.pt = 0;
					} else if (characterobject.c1 >= 50)
						if (this.mhouse_c == 100) {
							characterobject.c = 1430;
							l20 = this.mhouse_x * 32;
							i21 = this.mhouse_y * 32;
							characterobject.pt = 0;
							characterobject.pth = 0;
						} else {
							characterobject.c = 0;
						}
					break;

				case 200:
					/*
            if(this.ana_kazu > 0)
            {
                var k1 = 0;
                do
                {
                    if(k1 > 11)
                        break;
                    if(this.ana_c[k1] > 0 && this.ana_y[k1] * 32 == i21 + 32 && Math.abs(this.ana_x[k1] * 32 - l20) < 32)
                    {
                        characterobject.c = 1300;
                        l20 = this.ana_x[k1] * 32;
                        break;
                    }
                    k1++;
                } while(true);
                if(characterobject.c == 1300)
                    break;
            }
            if(characterobject.c1 <= 0)
            {
                if(this.co_j.x >= l20 - 240 && this.co_j.x <= l20 + 240)
                {
                    characterobject.c = 210;
                    characterobject.vy = -14;
                }
            } else
            {
                characterobject.c1--;
            }
            characterobject.pt = 143;
            if(l20 + 8 >= this.co_j.x)
                characterobject.pth = 0;
            else
                characterobject.pth = 1;
               */
					break;

				case 210:
					break;

				case 850:
					// ミズタロウ（シューティング）
					characterobject.pt = 160;
					characterobject.pth = 0;
					if (characterobject.c1 <= 0) {
						if ((l20 -= 4) - this.maps.wx <= 400) {
							l20 = this.maps.wx + 384 + 16;
							characterobject.c1 = 2;
						}
						characterobject.pt = 161 + this.g_ac;
						characterobject.pth = 0;
					} else if (characterobject.c1 <= 20) {
						characterobject.c1++;
						if (characterobject.c1 == 8) {
							var d20 = 3.1400001049041748;
							var k29 = rounddown(Math.cos(d20) * 12, true, this);
							var i33 = rounddown(Math.sin(d20) * 12, true, this) * -1;
							this.mSet2(l20, i21, 730, k29, i33);
							d20 = 2.7038888931274414;
							k29 = rounddown(Math.cos(d20) * 12, true, this);
							i33 = rounddown(Math.sin(d20) * 12, true, this) * -1;
							this.mSet2(l20, i21, 730, k29, i33);
							d20 = 2.2677779197692871;
							k29 = rounddown(Math.cos(d20) * 12, true, this);
							i33 = rounddown(Math.sin(d20) * 12, true, this) * -1;
							this.mSet2(l20, i21, 730, k29, i33);
							d20 = 3.5761110782623291;
							k29 = rounddown(Math.cos(d20) * 12, true, this);
							i33 = rounddown(Math.sin(d20) * 12, true, this) * -1;
							this.mSet2(l20, i21, 730, k29, i33);
							d20 = 4.0122222900390625;
							k29 = rounddown(Math.cos(d20) * 12, true, this);
							i33 = rounddown(Math.sin(d20) * 12, true, this) * -1;
							this.mSet2(l20, i21, 730, k29, i33);
							this.gs.rsAddSound(18);
						}
					} else {
						if ((l20 += 6) - this.maps.wx >= this.gg.di.width) characterobject.c = 0;
						characterobject.pt = 161 + this.g_ac;
						characterobject.pth = 1;
					}
					break;

				case 1002:
					// タイキング（シューティング）
					if ((l20 -= 3) <= this.maps.wx - 32) characterobject.c = 0;
					if (l20 >= this.maps.wx + 64 + 24 && l20 <= this.maps.wx + this.gg.di.width - 64) {
						characterobject.c1++;
						if (characterobject.c1 > 30) characterobject.c1 = 0;
						if (characterobject.c1 == 1) this.mSet(l20, i21, 150);
					}
					characterobject.pt = 166;
					characterobject.pth = 0;
					break;

				case 1003:
					// タイキング（４方向移動）
					if (l20 >= this.maps.wx + 64 + 24 && l20 <= this.maps.wx + this.gg.di.width - 64) {
						characterobject.c1++;
						if (characterobject.c1 > 30) characterobject.c1 = 0;
						if (characterobject.c1 == 1) this.mSet(l20, i21, 150);
					}
					characterobject.pt = 166;
					characterobject.pth = 0;
					break;

				case 1102:
					// クラゲッソ（シューティング）
					if (l20 <= this.maps.wx - 32) characterobject.c = 0;
					if (l20 >= this.maps.wx + 112 && l20 <= this.maps.wx + this.gg.di.width - 64) {
						characterobject.c1++;
						if (characterobject.c1 > 50) characterobject.c1 = 0;
						if (
							characterobject.c1 == 1 &&
							(this.maps.getBGCode(l20 + 15, i21 + 32) < 20 || this.co_j.y <= i21 + 8) &&
							(this.maps.getBGCode(l20 + 15, i21 - 1) < 20 || this.co_j.y >= i21 - 8)
						)
							this.mSet(l20, i21, 150);
					}
					characterobject.pt = 167;
					characterobject.pth = 0;
					break;

				case 1103:
					// クラゲッソ（４方向移動）
					if (l20 <= this.maps.wx - 32) characterobject.c = 0;
					if (l20 >= this.maps.wx + 112 && l20 <= this.maps.wx + this.gg.di.width - 64) {
						characterobject.c1++;
						if (characterobject.c1 > 50) characterobject.c1 = 0;
						if (characterobject.c1 == 1) {
							for (var j9 = 0; j9 <= 315; j9 += 45) {
								var d21 = (j9 * 3.14) / 180;
								var l29 = rounddown(Math.cos(d21) * 12, true, this);
								var j33 = rounddown(Math.sin(d21) * 12, true, this) * -1;
								this.mSet2(l20, i21, 730, l29, j33);
							}
						}
					}
					characterobject.pt = 167;
					characterobject.pth = 0;
					break;

				case 1190:
					characterobject.pt = 167;
					characterobject.pth = 0;
					break;

				case 1300:
					// ロードランナーで穴に落下中
					if ((i21 += 4) % 32 == 0) characterobject.c = 1310;
					break;
			}
			if (characterobject.c < 100) {
				characterobject.x = l20;
				characterobject.y = i21;
				continue;
			}
			var j29 = Math.abs(l20 - this.co_j.x);
			if (j29 >= 48) {
				characterobject.x = l20;
				characterobject.y = i21;
				continue;
			}
			if (
				this.co_j.c >= 100 &&
				this.co_j.c < 200 &&
				j29 < 30 &&
				(Math.abs(i21 - this.co_j.y) < 23 ||
					((this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) && Math.abs(i21 - this.co_j.y) < 28))
			)
				if (
					this.j_v_c > 0 ||
					(this.jst_fast_run_attack == 1 && Math.abs(this.co_j.vx) >= 100) ||
					(this.j_cannon_c > 0 && this.j_cannon_type == 0) ||
					(this.j_cannon_c > 0 && this.j_cannon_c < 9 && this.j_cannon_type == 2) ||
					(this.j_cannon_c > 5 && this.j_cannon_type == 3) ||
					(this.j_cannon_c > 5 && this.j_cannon_type == 4 && rounddown(characterobject.c / 100) != 4) ||
					(this.j_cannon_c > 0 &&
						this.j_cannon_c < 9 &&
						this.j_cannon_type == 5 &&
						rounddown(characterobject.c / 100) != 4) ||
					this.j_jump_type == 7
				) {
					if (this.co_j.muki == 1) {
						characterobject.pth = 0;
						characterobject.vx = 3;
					} else {
						characterobject.pth = 1;
						characterobject.vx = -3;
					}
					if (characterobject.c >= 1200 && characterobject.c < 1300) {
						characterobject.c = 54;
						characterobject.vy = -25;
					} else if (characterobject.c >= 1400 && characterobject.c < 1500) {
						characterobject.c = 57;
						characterobject.c1 = 0;
					} else if (characterobject.c == 1190) {
						characterobject.c = 55;
						characterobject.c1 = 0;
						var j32 = rightShiftIgnoreSign(characterobject.x, 5);
						var k36 = rightShiftIgnoreSign(characterobject.y, 5);
						if (characterobject.c5 == 1) this.onASwitch(j32 - 5, k36 - 5, j32 + 5, k36 + 5);
						else this.onASwitch(j32 - 10, k36 - 10, j32 + 10, k36 + 10);
					} else {
						characterobject.c = 52;
						characterobject.vy = -30;
						if (this.j_tokugi == 14 || this.j_tokugi == 15) {
							characterobject.c = 55;
							characterobject.c1 = 0;
						}
					}
					this.gs.rsAddSound(9);
				} else if (this.j_enemy_press != 3 || rounddown(characterobject.c / 100) == 4)
					if (
						(characterobject.c >= 400 && characterobject.c < 500) ||
						(characterobject.c >= 1000 && characterobject.c < 1200) ||
						this.j_tokugi == 10 ||
						(this.j_tokugi >= 12 && this.j_tokugi <= 15) ||
						this.j_enemy_press == 2
					) {
						if (this.j_muteki_c <= 0) {
							this.setMyHPDamage("1");
							if (this.getMyHP() <= 0) this.jShinu(2);
						}
					} else if (((j29 < 27 || this.easy_mode == 2) && this.co_j.vy > 0 && !this.j_mizu_f) || flag) {
						characterobject.pt = 142;
						if (characterobject.c < 200) characterobject.pt = 142;
						else if (characterobject.c < 300) characterobject.pt = 146;
						else if (characterobject.c < 400) characterobject.pt = 151;
						else if (characterobject.c < 600) characterobject.pt = 149;
						else if (characterobject.c < 700) characterobject.pt = 157;
						else if (characterobject.c < 800) characterobject.pt = 159;
						else if (characterobject.c < 900) characterobject.pt = 163;
						else if (characterobject.c < 1000) characterobject.pt = 165;
						if (characterobject.c != 104) characterobject.c2 = -1;
						characterobject.c = 50;
						characterobject.c1 = 0;
						this.gs.rsAddSound(8);
						this.co_j.y = i21 - 12;
						this.co_j.vy = -160;
						this.j_jump_type = 1;
						this.co_j.c = 110;
						this.co_j.c1 = 0;
						this.co_j.pt = 109;
						if (characterobject.pt == 149 || characterobject.pt == 165) {
							this.co_j.vy = -220;
							characterobject.c1 = -2;
						}
						if (characterobject.c2 >= 0) this.co_j.vy = -180;
						flag = true;
					} else if (this.j_muteki_c <= 0) {
						this.setMyHPDamage("1");
						if (this.getMyHP() <= 0) this.jShinu(2);
					}
			characterobject.x = l20;
			characterobject.y = i21;
		}
	}

	/**
	 * 指定した座標に主人公の掘った穴が存在するか調べ、存在する場合はその配列インデックスを返します
	 * @param x {number} X座標(ピクセル座標)
	 * @param y {number} y座標(ピクセル座標)
	 * @returns {number} 穴のid 穴が指定した座標に存在しない場合は-1
	 */
	anaCheckNormal(i: number, j: number) {
		var l = -1;
		var k = 0;
		do {
			if (k > 11) break;
			if (
				this.ana_c[k] > 0 &&
				Math.abs(this.ana_x[k] * 32 - i) < 32 &&
				j + 32 >= this.ana_y[k] * 32 &&
				j + 16 <= this.ana_y[k] * 32
			) {
				l = k;
				break;
			}
			k++;
		} while (true);
		return l;
	}

	/**
	 * 特定のブロックの床面のY座標を得る(？)
	 * TODO: 要調査
	 * @param x {number} X座標(ピクセル座標)
	 * @param y {number} y座標(ピクセル座標)
	 * @returns {*}
	 * @see {@link getSakamichiY}
	 */
	sakamichiY(i: number, j: number) {
		var k = rightShiftIgnoreSign(i + 15, 5);
		var l = rightShiftIgnoreSign(j + 31, 5);
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
				var k1 = l * 32 - rightShiftIgnoreSign((i + 15) % 32, 1);
				if (k1 < j) k2 = k1;
				break;

			case 13:
				var l1 = l * 32 - rightShiftIgnoreSign((i + 15) % 32, 1) - 16;
				if (l1 < j) k2 = l1;
				break;

			case 14:
				var i2 = l * 32 + rightShiftIgnoreSign((i + 15) % 32, 1) - 31;
				if (i2 < j) k2 = i2;
				break;

			case 15:
				var j2 = l * 32 + rightShiftIgnoreSign((i + 15) % 32, 1) - 15;
				if (j2 < j) k2 = j2;
				break;
		}
		return k2;
	}

	/**
	 * 敵の攻撃やアイテムを発生させる
	 * @param x {number} X座標(ピクセル座標)
	 * @param y {number} y座標(ピクセル座標)
	 * @param type {number} 種類
	 */
	mSet(i: number, j: number, k: number) {
		var l = 0;
		do {
			if (l > 79) break;
			if (this.co_m[l].c <= 0) {
				var characterobject = this.co_m[l];
				characterobject.c = k;
				characterobject.x = i;
				characterobject.y = j;
				characterobject.c1 = 0;
				this.m_kazu++;
				switch (k) {
					case 90: // 水の波動
						characterobject.c2 = 4;
						characterobject.vx = 0;
						characterobject.vy = 0;
						break;

					case 95:
						characterobject.c2 = 4;
						characterobject.vx = -14;
						characterobject.vy = 0;
						break;

					case 96:
						characterobject.c = 95;
						characterobject.c2 = 4;
						characterobject.vx = 14;
						characterobject.vy = 0;
						break;

					case 100: // 電撃
						var k1 = this.co_j.x - i;
						var i2 = this.co_j.y - j;
						var i1 = Math.floor(Math.sqrt(k1 * k1 + i2 * i2));
						if (i1 < 48) {
							this.m_kazu--;
							characterobject.c = 0;
						} else {
							characterobject.vx = rounddown((14 * k1) / i1);
							characterobject.vy = rounddown((14 * i2) / i1);
							characterobject.x += rounddown((characterobject.vx * 16) / 14);
							characterobject.y += rounddown((characterobject.vy * 16) / 14);
						}
						if (
							this.dengeki_mkf != 2 &&
							characterobject.c > 0 &&
							this.maps.getBGCode(characterobject.x + 15, characterobject.y + 15) == 4
						) {
							this.m_kazu--;
							characterobject.c = 0;
						}
						break;

					case 150: // ヒノララシ シューティング時の電撃攻撃
						var l1 = this.co_j.x - i;
						var j2 = this.co_j.y - j;
						var j1 = Math.floor(Math.sqrt(l1 * l1 + j2 * j2));
						if (j1 < 32) {
							this.m_kazu--;
							characterobject.c = 0;
						} else {
							characterobject.vx = (10 * l1) / j1;
							characterobject.vy = (10 * j2) / j1;
							characterobject.x += rounddown((characterobject.vx * 16) / 14);
							characterobject.y += rounddown((characterobject.vy * 16) / 14);
							if (this.sl_step == 11) characterobject.vx += this.sl_speed;
						}
						if (
							this.dengeki_mkf != 2 &&
							characterobject.c > 0 &&
							this.maps.getBGCode(characterobject.x + 15, characterobject.y + 15) == 4
						) {
							this.m_kazu--;
							characterobject.c = 0;
						}
						break;

					case 200: // 葉っぱカッターが左に１枚
						characterobject.c2 = 0;
						characterobject.vx = -4 - this.ranInt(6);
						characterobject.vy = -22;
						characterobject.x += characterobject.vx;
						characterobject.y += characterobject.vy;
						break;

					case 201:
						characterobject.c = 200;
						characterobject.c2 = 1;
						characterobject.vx = -4 - this.ranInt(6);
						characterobject.vy = -22;
						characterobject.x += characterobject.vx;
						characterobject.y += characterobject.vy;
						break;

					case 205: // 葉っぱカッターが右に１枚
						characterobject.c = 200;
						characterobject.c2 = 0;
						characterobject.vx = 4 + this.ranInt(6);
						characterobject.vy = -22;
						characterobject.x += characterobject.vx;
						characterobject.y += characterobject.vy;
						break;

					case 206:
						characterobject.c = 200;
						characterobject.c2 = 1;
						characterobject.vx = 4 + this.ranInt(6);
						characterobject.vy = -22;
						characterobject.x += characterobject.vx;
						characterobject.y += characterobject.vy;
						break;

					case 300: // 火の粉左
						characterobject.vx = -12;
						characterobject.x += characterobject.vx;
						break;

					case 305: // 火の粉右
						characterobject.c = 300;
						characterobject.vx = 12;
						characterobject.x += characterobject.vx;
						break;

					case 400: // 水鉄砲左
						characterobject.vx = -80;
						characterobject.vy = -225;
						break;

					case 405: // 水鉄砲右
						characterobject.c = 400;
						characterobject.vx = 80;
						characterobject.vy = -225;
						break;

					case 500:
						characterobject.vx = -4;
						characterobject.vy = -22;
						break;

					case 600: // エアームズ爆弾左
						characterobject.vx = -40;
						characterobject.vy = 0;
						break;

					case 605: // エアームズ爆弾右
						characterobject.c = 600;
						characterobject.vx = 40;
						characterobject.vy = 0;
						break;

					case 606: // エアームズ爆弾直下降
						characterobject.c = 600;
						characterobject.vx = 0;
						characterobject.vy = 0;
						break;

					case 2000: // ？ブロックから出てくるコイン
						characterobject.c3 = j;
						characterobject.vy = -210;
						break;

					case 2010: // ？ブロックから出てくるコイン 2枚目
						characterobject.c = 2000;
						characterobject.c3 = j - 64;
						characterobject.vy = -280;
						break;

					case 2020: // ？ブロックから出てくるコイン 3枚目
						characterobject.c = 2000;
						characterobject.c3 = j - 32;
						characterobject.vy = -250;
						break;

					case 2100: // アイテム（ファイヤーボール）
						characterobject.c2 = 0;
						break;

					case 2110: // アイテム（バリア）
						characterobject.c = 2100;
						characterobject.c2 = 1;
						break;

					case 2120: // アイテム（タイム）
						characterobject.c = 2100;
						characterobject.c2 = 2;
						break;

					case 2130: // アイテム（ジェット）
						characterobject.c = 2100;
						characterobject.c2 = 3;
						break;

					case 2140: // アイテム（ヘルメット）
						characterobject.c = 2100;
						characterobject.c2 = 4;
						break;

					case 2150: // アイテム（しっぽ）
						characterobject.c = 2100;
						characterobject.c2 = 5;
						break;

					case 2160: // アイテム（ドリル）
						characterobject.c = 2100;
						characterobject.c2 = 6;
						break;

					case 2170: // アイテム（グレネード）
						characterobject.c = 2100;
						characterobject.c2 = 7;
						break;

					case 2171: // アイテム（グレネード5発）
						characterobject.c = 2100;
						characterobject.c2 = 15;
						break;

					case 2172: // アイテム（コンティニュー）
						characterobject.c = 2100;
						characterobject.c2 = 16;
						break;

					case 2180: // アイテム（1UP）
						characterobject.c = 2100;
						characterobject.c2 = 8;
						break;

					case 2181: // シューティングモード パワーアップアイテム1（？ブロック（コイン））
						characterobject.c = 2100;
						characterobject.c2 = 9;
						break;

					case 2182: // シューティングモード パワーアップアイテム2（？ブロック（コイン3枚））
						characterobject.c = 2100;
						characterobject.c2 = 10;
						break;

					case 2185: // スポット処理 範囲拡大アイテム
						characterobject.c = 2100;
						characterobject.c2 = 11;
						break;

					case 2186: // アイテム（ファイヤーボール 水平に飛ぶ）
						characterobject.c = 2100;
						characterobject.c2 = 12;
						break;

					case 2187: // アイテム（ファイヤーボール 跳ねる）
						characterobject.c = 2100;
						characterobject.c2 = 13;
						break;

					case 2188: // アイテム（ファイヤーボール ダブル）
						characterobject.c = 2100;
						characterobject.c2 = 14;
						break;
				}
				break;
			}
			l++;
		} while (true);
	}

	/**
	 * ゲーム中に画面内に出現するコインやアイテムを追加する
	 * @param x {number} X座標(ピクセル座標)
	 * @param y {number} y座標(ピクセル座標)
	 * @param type {number} 種類
	 * @param vx {number} X速度(ピクセル単位)
	 * @param vy {number} Y速度(ピクセル単位)
	 */
	mSet2(i: number, j: number, k: number, l: number, i1: number) {
		var j1 = 0;
		do {
			if (j1 > 79) break;
			if (this.co_m[j1].c <= 0) {
				var characterobject = this.co_m[j1];
				characterobject.c = k;
				characterobject.x = i;
				characterobject.y = j;
				characterobject.vx = l;
				characterobject.vy = i1;
				characterobject.c1 = 0;
				this.m_kazu++;
				switch (k) {
					case 75:
						// ソーラービーム 左へ発射
						characterobject.c2 = l;
						characterobject.vy = 96;
						break;

					case 77:
						// 破壊光線 左へ発射
						characterobject.c2 = l;
						characterobject.vy = 96;
						break;

					case 85:
						// ソーラービーム 右へ発射
						characterobject.c2 = l;
						characterobject.vy = 96;
						break;

					case 87:
						// 破壊光線 右へ発射
						characterobject.c2 = l;
						characterobject.vy = 96;
						break;

					case 500:
						// 噴火
						characterobject.x += characterobject.vx;
						break;

					case 550:
						characterobject.x += characterobject.vx;
						break;

					case 700:
						// クラゲッソ バブル光線
						characterobject.c2 = 0;
						break;

					case 710:
						// カイオール バブル光線
						characterobject.c = 700;
						characterobject.c2 = 1;
						break;

					case 711:
						// カイオール バブル光線回転連射
						characterobject.c = 700;
						characterobject.c2 = 1;
						characterobject.x = i + l * 3;
						characterobject.y = j + i1 * 3;
						break;

					case 720:
						characterobject.c = 700;
						characterobject.c2 = 2;
						break;

					case 730:
						// バブル光線3発
						characterobject.c = 700;
						characterobject.c2 = 3;
						break;

					case 731:
						// はっぱカッター3発
						characterobject.c = 700;
						characterobject.c2 = 4;
						break;

					case 732:
						// 水平水鉄砲
						characterobject.c = 700;
						characterobject.c2 = 5;
						break;

					case 733:
						// 電撃3発
						characterobject.c = 700;
						characterobject.c2 = 6;
						break;

					case 740:
						// がんせきほう または りゅうせいぐん
						characterobject.x = characterobject.x + characterobject.vx * 2;
						characterobject.y = characterobject.y + characterobject.vy * 2;
						break;

					case 801:
						characterobject.c = 70;
						characterobject.c1 = 1;
						characterobject.c2 = 20;
						break;

					case 810:
						// プラズマ砲
						characterobject.c = 800;
						characterobject.vy = 9999;
						break;

					case 900:
						// バブル光線
						characterobject.vx = i;
						characterobject.vy = j;
						characterobject.c1 = 0;
						characterobject.c2 = l;
						break;

					case 901:
						// ボスのハリケンブラスト1
						characterobject.c = 900;
						characterobject.vx = i;
						characterobject.vy = j;
						characterobject.c1 = 0;
						characterobject.c2 = l;
						characterobject.c3 = 1;
						break;

					case 910:
						characterobject.vx = i;
						characterobject.vy = j;
						characterobject.c1 = 0;
						characterobject.c2 = l;
						break;

					case 911:
						// ボスのハリケンブラスト2
						characterobject.c = 910;
						characterobject.vx = i;
						characterobject.vy = j;
						characterobject.c1 = 0;
						characterobject.c2 = l;
						characterobject.c3 = 1;
						break;

					case 950:
						// ハリケンブラスト1
						characterobject.vx = i;
						characterobject.vy = j;
						characterobject.c1 = 0;
						characterobject.c2 = l;
						break;

					case 960:
						// ハリケンブラスト2
						characterobject.vx = i;
						characterobject.vy = j;
						characterobject.c1 = 0;
						characterobject.c2 = l;
						break;

					case 970:
						// 左にうずしお
						characterobject.vx = i;
						characterobject.vy = j;
						characterobject.c1 = 10;
						characterobject.c2 = l;
						break;

					case 980:
						// 右にうずしお
						characterobject.vx = i;
						characterobject.vy = j;
						characterobject.c1 = 10;
						characterobject.c2 = l;
						break;
				}
				break;
			}
			j1++;
		} while (true);
	}

	/**
	 * 敵の攻撃、？ブロックなどから出現したコイン・アイテムの更新処理
	 */
	mMove() {
		for (var i = 0; i <= 79; i++) {
			if (this.co_m[i].c == 0) continue;
			var characterobject = this.co_m[i];
			switch (characterobject.c) {
				case 50: // 水しぶき
					characterobject.c1++;
					if (characterobject.c1 <= 5) characterobject.pt = 80;
					else if (characterobject.c1 <= 10) characterobject.pt = 81;
					else if (characterobject.c1 <= 16) characterobject.pt = 82;
					else characterobject.c = 0;
					characterobject.pth = 0;
					break;

				case 60: // 自分が水中で出す泡
					characterobject.y -= 5;
					var j4 = rightShiftIgnoreSign(characterobject.y, 5);
					var word0 = this.maps.map_bg[rightShiftIgnoreSign(characterobject.x + 11, 5)][j4];
					if (word0 <= 3 || word0 >= 20 || word0 == 10) characterobject.c = 0;
					word0 = this.maps.map_bg[rightShiftIgnoreSign(characterobject.x + 20, 5)][j4];
					if (word0 <= 3 || word0 >= 20 || word0 == 10) characterobject.c = 0;
					word0 = this.maps.map_bg[rightShiftIgnoreSign(characterobject.x + 15, 5)][j4];
					if (
						(word0 == 8 || word0 == 9) &&
						this.maps.map_bg[rightShiftIgnoreSign(characterobject.x + 15, 5) - 1][j4] != 4
					)
						characterobject.c = 0;
					if (word0 == 15 && this.maps.map_bg[rightShiftIgnoreSign(characterobject.x + 15, 5)][j4 - 1] != 4)
						characterobject.c = 0;
					if (characterobject.x <= this.maps.wx - 32 || characterobject.x >= this.maps.wx + this.gg.di.width)
						characterobject.c = 0;
					if (characterobject.y <= this.maps.wy - 32 || characterobject.y >= this.maps.wy + this.gg.di.height)
						characterobject.c = 0;
					characterobject.pt = 85;
					characterobject.pth = 0;
					break;

				case 65: // 爆発
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
						var k2 = this.co_j.x - characterobject.x;
						var k4 = this.co_j.y - characterobject.y;
						var k7 = Math.floor(Math.sqrt(k2 * k2 + k4 * k4));
						if (k7 <= characterobject.c2 + 4 && this.j_v_c <= 0) this.jShinu(1);
					}
					characterobject.pt = 1100;
					characterobject.pth = 0;
					break;

				case 75: // ソーラービーム 左へ発射　第一段階
					characterobject.pt = 1200;
					characterobject.pth = 0;
					characterobject.vy -= 6;
					if (characterobject.vy <= 14) {
						characterobject.c = 76;
						characterobject.x = characterobject.x - 16;
						characterobject.vx = characterobject.x + 24;
						characterobject.c3 = 32;
						characterobject.pt = 1210;
						characterobject.pth = 0;
					}
					if (characterobject.c2 >= 0 && this.co_t[characterobject.c2].c < 100) characterobject.c = 0;
					break;

				case 76: // ソーラービーム 左へ発射　第二段階
					characterobject.x -= 18;
					if (characterobject.x < this.maps.wx - 32) characterobject.x = this.maps.wx - 32;
					if (
						this.maps.map_bg[rightShiftIgnoreSign(characterobject.x, 5)][
							rightShiftIgnoreSign(characterobject.y + 15, 5)
						] >= 20
					)
						characterobject.x = rightShiftIgnoreSign(characterobject.x, 5) * 32 + 32;
					if (characterobject.c3 > 0) {
						characterobject.c3--;
						if (
							characterobject.c2 >= 0 &&
							this.co_t[characterobject.c2].c < 100 &&
							characterobject.x + 18 < characterobject.vx
						)
							characterobject.c3 = 0;
					} else {
						characterobject.vx -= 18;
						if (characterobject.vx <= characterobject.x + 16) characterobject.c = 0;
					}
					if (
						this.co_j.c >= 100 &&
						this.co_j.c < 200 &&
						characterobject.x <= this.co_j.x + 31 - 8 &&
						characterobject.vx - 20 >= this.co_j.x + 8 &&
						Math.abs(characterobject.y - this.co_j.y) <= 22 &&
						this.j_v_c <= 0
					)
						this.jShinu(1);
					characterobject.pt = 1210;
					characterobject.pth = 0;
					break;

				case 77: // 破壊光線 左へ発射
					characterobject.pt = 1220;
					characterobject.pth = 0;
					characterobject.vy -= 6;
					if (characterobject.vy <= 14) {
						characterobject.c = 78;
						characterobject.x = characterobject.x - 16;
						characterobject.vx = characterobject.x + 24;
						characterobject.c3 = 32;
						characterobject.pt = 1230;
						characterobject.pth = 0;
					}
					if (characterobject.c2 >= 0 && this.co_t[characterobject.c2].c < 100) characterobject.c = 0;
					break;

				case 78:
					characterobject.x -= 18;
					if (characterobject.x < this.maps.wx - 32) characterobject.x = this.maps.wx - 32;
					if (
						this.maps.map_bg[rightShiftIgnoreSign(characterobject.x, 5)][
							rightShiftIgnoreSign(characterobject.y + 15, 5)
						] >= 20
					)
						characterobject.x = rightShiftIgnoreSign(characterobject.x, 5) * 32 + 32;
					if (characterobject.c3 > 0) {
						characterobject.c3--;
						if (
							characterobject.c2 >= 0 &&
							this.co_t[characterobject.c2].c < 100 &&
							characterobject.x + 18 < characterobject.vx
						)
							characterobject.c3 = 0;
					} else {
						characterobject.vx -= 18;
						if (characterobject.vx <= characterobject.x + 16) characterobject.c = 0;
					}
					if (
						this.co_j.c >= 100 &&
						this.co_j.c < 200 &&
						characterobject.x <= this.co_j.x + 31 - 8 &&
						characterobject.vx - 20 >= this.co_j.x + 8 &&
						Math.abs(characterobject.y - this.co_j.y) <= 26 &&
						this.j_v_c <= 0
					)
						this.jShinu(1);
					characterobject.pt = 1230;
					characterobject.pth = 0;
					break;

				case 80: // ブロックの破片
					if (characterobject.vy >= 5)
						if (characterobject.vx > 2) characterobject.vx--;
						else if (characterobject.vx < -2) characterobject.vx++;
					characterobject.x += characterobject.vx;
					characterobject.vy += 4;
					if (characterobject.vy > 30) characterobject.vy = 30;
					characterobject.y += characterobject.vy;
					if (characterobject.y >= this.maps.wy + this.gg.di.height) characterobject.c = 0;
					characterobject.pt = 136;
					if (characterobject.vx < 0) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;

				case 85: // ソーラービーム 右へ発射　第一段階
					characterobject.pt = 1200;
					characterobject.pth = 0;
					characterobject.vy -= 6;
					if (characterobject.vy <= 14) {
						characterobject.c = 86;
						characterobject.x = characterobject.x + 32 + 16;
						characterobject.vx = characterobject.x - 24;
						characterobject.c3 = 32;
						characterobject.pt = 1215;
						characterobject.pth = 0;
					}
					if (characterobject.c2 >= 0 && this.co_t[characterobject.c2].c < 100) characterobject.c = 0;
					break;

				case 86: // ソーラービーム 右へ発射　第二段階
					characterobject.x += 18;
					if (characterobject.x > this.maps.wx + this.gg.di.width + 16)
						characterobject.x = this.maps.wx + this.gg.di.width + 16;
					if (
						this.maps.map_bg[rightShiftIgnoreSign(characterobject.x, 5)][
							rightShiftIgnoreSign(characterobject.y + 15, 5)
						] >= 20
					)
						characterobject.x = rightShiftIgnoreSign(characterobject.x, 5) * 32 - 1;
					if (characterobject.c3 > 0) {
						characterobject.c3--;
						if (
							characterobject.c2 >= 0 &&
							this.co_t[characterobject.c2].c < 100 &&
							characterobject.x + 18 < characterobject.vx
						)
							characterobject.c3 = 0;
					} else {
						characterobject.vx += 18;
						if (characterobject.vx >= characterobject.x - 16) characterobject.c = 0;
					}
					if (
						this.co_j.c >= 100 &&
						this.co_j.c < 200 &&
						characterobject.x >= this.co_j.x + 8 &&
						characterobject.vx + 20 <= this.co_j.x + 24 &&
						Math.abs(characterobject.y - this.co_j.y) <= 22 &&
						this.j_v_c <= 0
					)
						this.jShinu(1);
					characterobject.pt = 1215;
					characterobject.pth = 0;
					break;

				case 87: // 破壊光線 右へ発射
					characterobject.pt = 1220;
					characterobject.pth = 0;
					characterobject.vy -= 6;
					if (characterobject.vy <= 14) {
						characterobject.c = 88;
						characterobject.x = characterobject.x + 32 + 16;
						characterobject.vx = characterobject.x - 24;
						characterobject.c3 = 32;
						characterobject.pt = 1235;
						characterobject.pth = 0;
					}
					if (characterobject.c2 >= 0 && this.co_t[characterobject.c2].c < 100) characterobject.c = 0;
					break;

				case 88:
					characterobject.x += 18;
					if (characterobject.x > this.maps.wx + this.gg.di.width + 16)
						characterobject.x = this.maps.wx + this.gg.di.width + 16;
					if (
						this.maps.map_bg[rightShiftIgnoreSign(characterobject.x, 5)][
							rightShiftIgnoreSign(characterobject.y + 15, 5)
						] >= 20
					)
						characterobject.x = rightShiftIgnoreSign(characterobject.x, 5) * 32 - 1;
					if (characterobject.c3 > 0) {
						characterobject.c3--;
						if (
							characterobject.c2 >= 0 &&
							this.co_t[characterobject.c2].c < 100 &&
							characterobject.x + 18 < characterobject.vx
						)
							characterobject.c3 = 0;
					} else {
						characterobject.vx += 18;
						if (characterobject.vx >= characterobject.x - 16) characterobject.c = 0;
					}
					if (
						this.co_j.c >= 100 &&
						this.co_j.c < 200 &&
						characterobject.x >= this.co_j.x + 8 &&
						characterobject.vx + 20 <= this.co_j.x + 24 &&
						Math.abs(characterobject.y - this.co_j.y) <= 26 &&
						this.j_v_c <= 0
					)
						this.jShinu(1);
					characterobject.pt = 1235;
					characterobject.pth = 0;
					break;

				case 90: // 水の波動
					if (characterobject.c2 < 48) {
						characterobject.c2 += 4;
						if (characterobject.c2 >= 48) {
							characterobject.c2 = 48;
							var l2 = this.co_j.x - characterobject.x;
							var l4 = this.co_j.y - characterobject.y;
							var l7 = Math.floor(Math.sqrt(l2 * l2 + l4 * l4));
							if (l7 < 32 || this.co_j.c < 100 || this.co_j.c >= 200) {
								if (characterobject.x < this.maps.wx + 256) characterobject.vx = 14;
								else characterobject.vx = -14;
								characterobject.vy = 0;
							} else {
								characterobject.vx = rounddown((14 * l2) / l7);
								characterobject.vy = rounddown((14 * l4) / l7);
							}
						}
					} else {
						characterobject.x += characterobject.vx;
						characterobject.y += characterobject.vy;
						if (
							characterobject.x <= this.maps.wx - 32 - 32 ||
							characterobject.x >= this.maps.wx + this.gg.di.width + 128 + 32
						)
							characterobject.c = 0;
						else if (
							characterobject.y <= this.maps.wy - 32 - 200 - 32 ||
							characterobject.y >= this.maps.wy + this.gg.di.height + 32
						)
							characterobject.c = 0;
					}
					if (this.co_j.c >= 100 && this.co_j.c < 200) {
						var i3 = this.co_j.x - characterobject.x;
						var i5 = this.co_j.y - characterobject.y;
						var i8 = Math.floor(Math.sqrt(i3 * i3 + i5 * i5));
						if (i8 + 4 <= characterobject.c2)
							if (this.j_v_c > 0) characterobject.c = 0;
							else this.jShinu(1);
					}
					characterobject.pt = 1000;
					break;

				case 95: // 水の波動 直進
					if (characterobject.c2 < 64) {
						characterobject.c2 += 4;
						if (characterobject.c2 >= 64) characterobject.c2 = 64;
					} else {
						characterobject.x += characterobject.vx;
						characterobject.y += characterobject.vy;
						if (
							characterobject.x <= this.maps.wx - 32 - 64 ||
							characterobject.x >= this.maps.wx + this.gg.di.width + 128 + 64
						)
							characterobject.c = 0;
						else if (
							characterobject.y <= this.maps.wy - 32 - 200 - 64 ||
							characterobject.y >= this.maps.wy + this.gg.di.height + 64
						)
							characterobject.c = 0;
					}
					if (this.co_j.c >= 100 && this.co_j.c < 200) {
						var j3 = this.co_j.x - characterobject.x;
						var j5 = this.co_j.y - characterobject.y;
						var j8 = Math.floor(Math.sqrt(j3 * j3 + j5 * j5));
						if (j8 + 4 <= characterobject.c2)
							if (this.j_v_c > 0) characterobject.c = 0;
							else this.jShinu(1);
					}
					characterobject.pt = 1010;
					break;

				case 100: // 電撃
					characterobject.x += characterobject.vx;
					characterobject.y += characterobject.vy;
					var k3 = rightShiftIgnoreSign(characterobject.x + 15, 5);
					if (
						this.maps.map_bg[k3][rightShiftIgnoreSign(characterobject.y + 12, 5)] >= 20 ||
						this.maps.map_bg[k3][rightShiftIgnoreSign(characterobject.y + 18, 5)] >= 20
					)
						characterobject.c = 0;
					if (this.dengeki_mkf != 2 && this.maps.getBGCode(characterobject.x + 15, characterobject.y + 15) == 4)
						characterobject.c = 0;
					if (characterobject.x <= this.maps.wx - 32 || characterobject.x >= this.maps.wx + this.gg.di.width + 128)
						characterobject.c = 0;
					else if (
						characterobject.y <= this.maps.wy - 32 - 200 ||
						characterobject.y >= this.maps.wy + this.gg.di.height
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

				case 150: // ヒノララシ シューティング時の電撃攻撃
					characterobject.x += characterobject.vx;
					characterobject.y += characterobject.vy;
					if (
						this.maps.map_bg[rightShiftIgnoreSign(characterobject.x + 15, 5)][
							rightShiftIgnoreSign(characterobject.y + 15, 5)
						] >= 20
					)
						characterobject.c = 0;
					if (this.dengeki_mkf != 2 && this.maps.getBGCode(characterobject.x + 15, characterobject.y + 15) == 4)
						characterobject.c = 0;
					if (characterobject.x <= this.maps.wx - 32 || characterobject.x >= this.maps.wx + this.gg.di.width + 128)
						characterobject.c = 0;
					else if (
						characterobject.y <= this.maps.wy - 32 - 200 ||
						characterobject.y >= this.maps.wy + this.gg.di.height
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

				case 200: // はっぱカッター
					characterobject.x += characterobject.vx;
					characterobject.vy += 2;
					if (characterobject.vy > 12) characterobject.vy = 12;
					var j = characterobject.vy;
					if (j < -18) j = -18;
					characterobject.y += j;
					if (characterobject.y >= this.maps.wy + this.gg.di.height) characterobject.c = 0;
					if (characterobject.c2 == 1) {
						var l3 = rightShiftIgnoreSign(characterobject.x + 15, 5);
						if (
							this.maps.map_bg[l3][rightShiftIgnoreSign(characterobject.y + 12, 5)] >= 20 ||
							this.maps.map_bg[l3][rightShiftIgnoreSign(characterobject.y + 20, 5)] >= 20
						)
							characterobject.c = 0;
					}
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

				case 300: // 火の粉
					characterobject.x += characterobject.vx;
					var k5 = rightShiftIgnoreSign(characterobject.y + 15, 5);
					if (
						this.maps.map_bg[rightShiftIgnoreSign(characterobject.x + 8, 5)][k5] >= 20 ||
						this.maps.map_bg[rightShiftIgnoreSign(characterobject.x + 23, 5)][k5] >= 20
					)
						characterobject.c = 0;
					if (characterobject.x <= this.maps.wx - 32 || characterobject.x >= this.maps.wx + this.gg.di.width + 128)
						characterobject.c = 0;
					if (this.g_c1 == 0) characterobject.pt = 126;
					else characterobject.pt = 127;
					if (characterobject.vx <= 0) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;

				case 400: //みずでっぽう
					characterobject.x += rounddown(characterobject.vx / 10);
					characterobject.vy += 25;
					if (characterobject.vy > 180) characterobject.vy = 180;
					characterobject.y += rounddown(characterobject.vy / 10);
					if (characterobject.y >= this.maps.wy + this.gg.di.height) characterobject.c = 0;
					var i4 = rightShiftIgnoreSign(characterobject.x + 15, 5);
					if (this.maps.map_bg[i4][rightShiftIgnoreSign(characterobject.y + 15, 5)] >= 20) characterobject.c = 0;
					if (this.g_c1 == 0) characterobject.pt = 128;
					else characterobject.pt = 129;
					if (characterobject.vx <= 0) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;

				case 500: // 火山の噴火
					if (characterobject.vy >= 5)
						if (characterobject.vx > 2) characterobject.vx--;
						else if (characterobject.vx < -2) characterobject.vx++;
					characterobject.x += characterobject.vx;
					characterobject.vy += 2;
					if (characterobject.vy > 12) characterobject.vy = 12;
					var k = characterobject.vy;
					if (k < -16) k = -16;
					characterobject.y += k;
					if (characterobject.y >= this.maps.wy + this.gg.di.height) characterobject.c = 0;
					characterobject.pt = 139;
					characterobject.pth = 0;
					break;

				case 550: // 逆火山の噴火
					if (characterobject.vy >= 5)
						if (characterobject.vx > 2) characterobject.vx--;
						else if (characterobject.vx < -2) characterobject.vx++;
					characterobject.x += characterobject.vx;
					characterobject.vy -= 2;
					if (characterobject.vy < -12) characterobject.vy = -12;
					var l = characterobject.vy;
					if (l < -16) l = -16;
					characterobject.y += l;
					if (characterobject.y <= this.maps.wy - 32) characterobject.c = 0;
					characterobject.pt = 139;
					characterobject.pth = 0;
					break;

				case 600: // 爆撃
					if (characterobject.vx > 0) characterobject.vx -= 2;
					else if (characterobject.vx < 0) characterobject.vx += 2;
					characterobject.x += rounddown(characterobject.vx / 10);
					characterobject.vy += 8;
					if (characterobject.vy > 200) characterobject.vy = 200;
					characterobject.y += rounddown(characterobject.vy / 10);
					if (
						this.maps.map_bg[rightShiftIgnoreSign(characterobject.x + 15, 5)][
							rightShiftIgnoreSign(characterobject.y + 15, 5)
						] >= 20
					) {
						characterobject.c = 610;
						characterobject.c1 = 0;
						characterobject.y = rightShiftIgnoreSign(characterobject.y + 15, 5) * 32 - 16;
						this.gs.rsAddSound(19);
					}
					if (characterobject.x <= this.maps.wx - 32 - 64 || characterobject.x >= this.maps.wx + this.gg.di.width + 64)
						characterobject.c = 0;
					else if (
						characterobject.y <= this.maps.wy - 32 - 200 ||
						characterobject.y >= this.maps.wy + this.gg.di.height
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

				case 700: // クラゲッソ バブル光線
					characterobject.x += characterobject.vx;
					characterobject.y += characterobject.vy;
					if (characterobject.x <= this.maps.wx - 32 || characterobject.x >= this.maps.wx + this.gg.di.width + 32)
						characterobject.c = 0;
					else if (characterobject.y <= this.maps.wy - 64 || characterobject.y >= this.maps.wy + this.gg.di.height + 64)
						characterobject.c = 0;
					var i1 = this.maps.getBGCode(characterobject.x + 15, characterobject.y + 15);
					if (characterobject.c2 == 0 && i1 >= 20) characterobject.c = 0;
					if (characterobject.c2 == 0 && i1 <= 3) characterobject.c = 0;
					if (
						(characterobject.c2 == 3 ||
							characterobject.c2 == 4 ||
							characterobject.c2 == 5 ||
							characterobject.c2 == 6) &&
						i1 >= 20
					)
						characterobject.c = 0;
					characterobject.pt = 168 + this.g_c1;
					characterobject.pth = 0;
					if (characterobject.c2 == 2) characterobject.pt = 134;
					else if (characterobject.c2 == 4) {
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
						if (characterobject.vx <= 0) characterobject.pth = 0;
						else characterobject.pth = 1;
					} else if (characterobject.c2 == 5) {
						if (this.g_c1 == 0) characterobject.pt = 128;
						else characterobject.pt = 129;
						if (characterobject.vx <= 0) characterobject.pth = 0;
						else characterobject.pth = 1;
					} else if (characterobject.c2 == 6) {
						if (this.g_c1 == 0) characterobject.pt = 120;
						else characterobject.pt = 121;
						if (characterobject.vx <= 0) characterobject.pth = 0;
						else characterobject.pth = 1;
					}
					break;

				case 740: // りゅうせいぐん
					characterobject.x += characterobject.vx;
					characterobject.y += characterobject.vy;
					if (characterobject.x <= this.maps.wx - 32 || characterobject.x >= this.maps.wx + this.gg.di.width + 32)
						characterobject.c = 0;
					else if (characterobject.y <= this.maps.wy - 64 || characterobject.y >= this.maps.wy + this.gg.di.height + 64)
						characterobject.c = 0;
					characterobject.pt = 139;
					characterobject.pth = 0;
					break;

				case 800: // グレネード
					if (characterobject.vy == 9999) {
						characterobject.x += characterobject.vx;
						if (characterobject.x <= this.maps.wx - 16 || characterobject.x >= this.maps.wx + this.gg.di.width - 16)
							characterobject.c = 0;
						if (
							this.maps.getBGCode(characterobject.x, characterobject.y + 15) >= 20 ||
							this.maps.getBGCode(characterobject.x + 31, characterobject.y + 15) >= 20
						) {
							characterobject.c = 70;
							characterobject.c1 = 1;
							characterobject.c2 = 20;
						}
					} else {
						if (characterobject.vy >= 5)
							if (characterobject.vx > 2) characterobject.vx--;
							else if (characterobject.vx < -2) characterobject.vx++;
						characterobject.x += characterobject.vx;
						characterobject.vy += 4;
						if (characterobject.vy > 28) characterobject.vy = 28;
						characterobject.y += characterobject.vy;
						if (characterobject.y >= this.maps.wy + this.gg.di.height) characterobject.c = 0;
						if (this.maps.getBGCode(characterobject.x + 15, characterobject.y + 31) >= 20) {
							characterobject.c = 70;
							characterobject.y = rightShiftIgnoreSign(characterobject.y + 31, 5) * 32 - 16;
							characterobject.c1 = 1;
							characterobject.c2 = 20;
						}
					}
					characterobject.pt = 137 + this.g_c1;
					if (characterobject.vx < 0) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;

				case 900: // バブル光線
					characterobject.c1 += 4;
					if (characterobject.c1 < 128) characterobject.c2 += 3;
					else if (characterobject.c1 < 192) characterobject.c2 += 3;
					else if (characterobject.c1 < 256) characterobject.c2 += 2;
					else if (characterobject.c1 < 288) characterobject.c2 += 2;
					else if (characterobject.c1 < 384) characterobject.c2++;
					else if (characterobject.c1 < 448) characterobject.c2++;
					else characterobject.c2++;
					if (characterobject.c2 >= 360) characterobject.c2 -= 360;
					if (characterobject.c1 > 576) characterobject.c = 0;
					characterobject.x =
						characterobject.vx +
						rounddown(Math.cos((characterobject.c2 * 3.14) / 180) * characterobject.c1, true, this);
					characterobject.y =
						characterobject.vy +
						rounddown(Math.sin((characterobject.c2 * 3.14) / 180) * -1 * characterobject.c1, true, this);
					if (characterobject.c3 == 1) {
						characterobject.pt = 168 + this.g_c1;
						characterobject.pth = 0;
					} else {
						characterobject.pt = 134;
						characterobject.pth = 0;
					}
					break;

				case 910:
					characterobject.c1 += 4;
					if (characterobject.c1 < 128) characterobject.c2 -= 3;
					else if (characterobject.c1 < 192) characterobject.c2 -= 3;
					else if (characterobject.c1 < 256) characterobject.c2 -= 2;
					else if (characterobject.c1 < 288) characterobject.c2 -= 2;
					else if (characterobject.c1 < 384) characterobject.c2--;
					else if (characterobject.c1 < 416) characterobject.c2--;
					else characterobject.c2--;
					if (characterobject.c2 < 0) characterobject.c2 += 360;
					if (characterobject.c1 > 576) characterobject.c = 0;
					characterobject.x =
						characterobject.vx +
						rounddown(Math.cos((characterobject.c2 * 3.14) / 180) * characterobject.c1, true, this);
					characterobject.y =
						characterobject.vy +
						rounddown(Math.sin((characterobject.c2 * 3.14) / 180) * -1 * characterobject.c1, true, this);
					if (characterobject.c3 == 1) {
						characterobject.pt = 168 + this.g_c1;
						characterobject.pth = 0;
					} else {
						characterobject.pt = 134;
						characterobject.pth = 0;
					}
					break;

				case 950: // ハリケンブラスト1
					characterobject.c1 += 4;
					if (characterobject.c1 < 128) characterobject.c2 += 3;
					else if (characterobject.c1 < 192) characterobject.c2 += 3;
					else if (characterobject.c1 < 256) characterobject.c2 += 2;
					else if (characterobject.c1 < 288) characterobject.c2 += 2;
					else if (characterobject.c1 < 384) characterobject.c2++;
					else if (characterobject.c1 < 448) characterobject.c2++;
					else characterobject.c2++;
					if (characterobject.c2 >= 360) characterobject.c2 -= 360;
					if (characterobject.c1 > 204) characterobject.c = 0;
					characterobject.x =
						characterobject.vx +
						rounddown(Math.cos((characterobject.c2 * 3.14) / 180) * characterobject.c1, true, this);
					characterobject.y =
						characterobject.vy +
						rounddown(Math.sin((characterobject.c2 * 3.14) / 180) * -1 * characterobject.c1, true, this);
					characterobject.pt = 168 + this.g_c1;
					characterobject.pth = 0;
					break;

				case 960: // ハリケンブラスト2
					characterobject.c1 += 4;
					if (characterobject.c1 < 128) characterobject.c2 -= 3;
					else if (characterobject.c1 < 192) characterobject.c2 -= 3;
					else if (characterobject.c1 < 256) characterobject.c2 -= 2;
					else if (characterobject.c1 < 288) characterobject.c2 -= 2;
					else if (characterobject.c1 < 384) characterobject.c2--;
					else if (characterobject.c1 < 416) characterobject.c2--;
					else characterobject.c2--;
					if (characterobject.c2 < 0) characterobject.c2 += 360;
					if (characterobject.c1 > 204) characterobject.c = 0;
					characterobject.x =
						characterobject.vx +
						rounddown(Math.cos((characterobject.c2 * 3.14) / 180) * characterobject.c1, true, this);
					characterobject.y =
						characterobject.vy +
						rounddown(Math.sin((characterobject.c2 * 3.14) / 180) * -1 * characterobject.c1, true, this);
					characterobject.pt = 168 + this.g_c1;
					characterobject.pth = 0;
					break;

				case 970:
					characterobject.c1 += 4;
					if (characterobject.c1 < 128) characterobject.c2 += 5;
					else if (characterobject.c1 < 192) characterobject.c2 += 5;
					else if (characterobject.c1 < 256) characterobject.c2 += 5;
					else if (characterobject.c1 < 288) characterobject.c2 += 4;
					else if (characterobject.c1 < 384) characterobject.c2 += 3;
					else if (characterobject.c1 < 448) characterobject.c2 += 2;
					else characterobject.c2 += 2;
					if (characterobject.c2 >= 360) characterobject.c2 -= 360;
					if (characterobject.c1 > 80) {
						characterobject.c1 = 80;
						characterobject.vx -= 6;
					}
					if (characterobject.vx < this.maps.wx - 100) characterobject.c = 0;
					characterobject.x =
						characterobject.vx +
						rounddown(Math.cos((characterobject.c2 * 3.14) / 180) * characterobject.c1, true, this);
					characterobject.y =
						characterobject.vy +
						rounddown(Math.sin((characterobject.c2 * 3.14) / 180) * -1 * characterobject.c1, true, this);
					characterobject.pt = 168 + this.g_c1;
					characterobject.pth = 0;
					break;

				case 980:
					characterobject.c1 += 4;
					if (characterobject.c1 < 128) characterobject.c2 -= 5;
					else if (characterobject.c1 < 192) characterobject.c2 -= 5;
					else if (characterobject.c1 < 256) characterobject.c2 -= 5;
					else if (characterobject.c1 < 288) characterobject.c2 -= 4;
					else if (characterobject.c1 < 384) characterobject.c2 -= 3;
					else if (characterobject.c1 < 448) characterobject.c2 -= 2;
					else characterobject.c2 -= 2;
					if (characterobject.c2 < 0) characterobject.c2 += 360;
					if (characterobject.c1 > 80) {
						characterobject.c1 = 80;
						characterobject.vx += 6;
					}
					if (characterobject.vx > this.maps.wx + this.gg.di.width + 100) characterobject.c = 0;
					characterobject.x =
						characterobject.vx +
						rounddown(Math.cos((characterobject.c2 * 3.14) / 180) * characterobject.c1, true, this);
					characterobject.y =
						characterobject.vy +
						rounddown(Math.sin((characterobject.c2 * 3.14) / 180) * -1 * characterobject.c1, true, this);
					characterobject.pt = 168 + this.g_c1;
					characterobject.pth = 0;
					break;

				case 2000: // ？ブロックから出たコイン
					characterobject.vy += 30;
					if (characterobject.vy > 180) characterobject.vy = 180;
					characterobject.y += rounddown(characterobject.vy / 10);
					if (characterobject.vy >= 0 && characterobject.y >= characterobject.c3) {
						characterobject.y = characterobject.c3;
						characterobject.vy = 0;
					}
					if (
						(this.scroll_area < 2 || this.scroll_area > 5) &&
						this.j_tokugi != 14 &&
						this.j_tokugi != 15 &&
						(characterobject.x <= this.maps.wx - 32 || characterobject.x >= this.maps.wx + this.gg.di.width)
					)
						characterobject.c = 0;
					characterobject.pt = 90 + this.g_ac2;
					characterobject.pth = 0;
					break;

				case 2100: // アイテム
					if (
						(this.scroll_area < 2 || this.scroll_area > 5) &&
						this.j_tokugi != 14 &&
						this.j_tokugi != 15 &&
						characterobject.c2 != 11 &&
						(characterobject.x <= this.maps.wx - 32 || characterobject.x >= this.maps.wx + this.gg.di.width)
					)
						characterobject.c = 0;
					characterobject.pt = 42 + characterobject.c2;
					if (characterobject.c2 == 8) characterobject.pt = 59;
					else if (characterobject.c2 == 9) characterobject.pt = 109;
					else if (characterobject.c2 == 10) characterobject.pt = 107;
					else if (characterobject.c2 == 11) characterobject.pt = 97;
					else if (characterobject.c2 == 12) characterobject.pt = 42;
					else if (characterobject.c2 == 13) characterobject.pt = 42;
					else if (characterobject.c2 == 14) characterobject.pt = 42;
					else if (characterobject.c2 == 15) characterobject.pt = 49;
					else if (characterobject.c2 == 16) characterobject.pt = 1300;
					characterobject.pth = 0;
					break;

				case 2200: // ボス撃破後の人面星
					if (characterobject.x < this.maps.wx) characterobject.x = this.maps.wx;
					else if (characterobject.x > this.maps.wx + this.gg.di.width - 32)
						characterobject.x = this.maps.wx + this.gg.di.width - 32;
					if (characterobject.y < this.maps.wy + 64) characterobject.y = this.maps.wy + 64;
					else if (characterobject.y > this.maps.wy + this.gg.di.height - 96)
						characterobject.y = this.maps.wy + this.gg.di.height - 96;
					if (this.stage_max >= 2 && this.stage >= this.stage_max) {
						// 複数ステージ制ではラストステージでミレニアム人面星に
						if (this.g_ac2 == 0) characterobject.pt = 99;
						else characterobject.pt = 98;
					} else if (this.g_ac2 == 0) characterobject.pt = 95;
					else characterobject.pt = 94;
					characterobject.pth = 0;
					break;
			}
			if (
				(characterobject.c == 100 ||
					characterobject.c == 300 ||
					characterobject.c == 400 ||
					characterobject.c == 600 ||
					(characterobject.c == 700 &&
						(characterobject.c2 == 3 ||
							characterobject.c2 == 4 ||
							characterobject.c2 == 5 ||
							characterobject.c2 == 6)) ||
					characterobject.c == 800) &&
				this.yuka_id_max >= 0
			) {
				for (var l6 = 0; l6 <= this.yuka_id_max; l6++) {
					if (this.yo[l6].con >= 300 && this.yo[l6].con < 350) {
						var j1 = this.getSCOY(this.yo[l6].x, this.yo[l6].y, this.yo[l6].x2, this.yo[l6].y2, characterobject.x + 15);
						if (j1 < 0 || j1 + 8 > characterobject.y || j1 + 39 < characterobject.y) continue;
						if (characterobject.c == 600) {
							characterobject.y = j1 + 16;
							characterobject.c = 610;
							characterobject.c1 = 0;
							this.gs.rsAddSound(19);
							continue;
						}
						if (characterobject.c == 800) {
							characterobject.c = 70;
							characterobject.y = j1 + 16;
							characterobject.c1 = 1;
							characterobject.c2 = 20;
						} else {
							characterobject.c = 0;
						}
						continue;
					}
					if (this.yo[l6].con >= 350 && this.yo[l6].con < 400) {
						var k1 = this.getSHCOY(
							this.yo[l6].x,
							this.yo[l6].y,
							this.yo[l6].x2,
							this.yo[l6].y2,
							characterobject.x + 15
						);
						if (k1 < 0 || k1 + 8 > characterobject.y || k1 + 39 < characterobject.y) continue;
						if (characterobject.c == 600) {
							characterobject.y = k1 + 16;
							characterobject.c = 610;
							characterobject.c1 = 0;
							this.gs.rsAddSound(19);
							continue;
						}
						if (characterobject.c == 800) {
							characterobject.c = 70;
							characterobject.y = k1 + 16;
							characterobject.c1 = 1;
							characterobject.c2 = 20;
						} else {
							characterobject.c = 0;
						}
						continue;
					}
					if (this.yo[l6].con >= 400 && this.yo[l6].con < 450) {
						var l1 = this.getSWUpOY(
							this.yo[l6].x,
							this.yo[l6].y,
							this.yo[l6].x2,
							this.yo[l6].y2,
							characterobject.x + 15
						);
						if (l1 < 0 || l1 + 8 > characterobject.y || l1 + 39 < characterobject.y) continue;
						if (characterobject.c == 600) {
							characterobject.y = l1 + 16;
							characterobject.c = 610;
							characterobject.c1 = 0;
							this.gs.rsAddSound(19);
							continue;
						}
						if (characterobject.c == 800) {
							characterobject.c = 70;
							characterobject.y = l1 + 16;
							characterobject.c1 = 1;
							characterobject.c2 = 20;
						} else {
							characterobject.c = 0;
						}
						continue;
					}
					if (this.yo[l6].con < 450 || this.yo[l6].con >= 500) continue;
					var i2 = this.getSWDownOY(
						this.yo[l6].x,
						this.yo[l6].y,
						this.yo[l6].x2,
						this.yo[l6].y2,
						characterobject.x + 15
					);
					if (i2 < 0 || i2 + 8 > characterobject.y || i2 + 39 < characterobject.y) continue;
					if (characterobject.c == 600) {
						characterobject.y = i2 + 16;
						characterobject.c = 610;
						characterobject.c1 = 0;
						this.gs.rsAddSound(19);
						continue;
					}
					if (characterobject.c == 800) {
						characterobject.c = 70;
						characterobject.y = i2 + 16;
						characterobject.c1 = 1;
						characterobject.c2 = 20;
					} else {
						characterobject.c = 0;
					}
				}
			}
			if (characterobject.c == 0) {
				this.m_kazu--;
				continue;
			}
			if (this.co_j.c < 100 || this.co_j.c >= 200) continue;
			if (characterobject.c >= 2000) {
				if (
					Math.abs(characterobject.x - this.co_j.x) > 14 ||
					characterobject.y > this.co_j.y + 26 ||
					characterobject.y + 15 < this.co_j.y
				)
					continue;
				this.addScore(5);
				if (characterobject.c == 2000) this.gs.rsAddSound(6);
				else if (characterobject.c == 2100) {
					this.gs.rsAddSound(7);
					if (characterobject.c2 == 0) {
						// ファイヤーボール
						this.j_fire_f = true;
						this.j_fire_type = this.default_j_fire_type;
						if (this.j_tokugi == 7) this.j_fire_type = 2;
						if (this.j_fire_type == 3 || this.j_fire_type == 4) this.j_fire_range = 10;
						else if (this.j_fire_type == 2) this.j_fire_range = 9999;
					} else if (characterobject.c2 == 1) {
						// バリア
						this.j_v_c = 150;
						this.j_v_kakudo = 0;
					} else if (characterobject.c2 == 2) {
						// タイム
						if (this.time_max > 0) this.time += 30000;
					} else if (characterobject.c2 == 3) {
						// ジェット
						this.j_jet_fuel += 80;
					} else if (characterobject.c2 == 4) {
						// ヘルメット
						this.j_helm_f = true;
					} else if (characterobject.c2 == 5) {
						// しっぽ
						this.j_tail_f = true;
					} else if (characterobject.c2 == 6) {
						// ドリル
						this.j_drell_f = true;
					} else if (characterobject.c2 == 7) {
						// グレネード
						this.j_gr_kazu++;
					} else if (characterobject.c2 == 8) {
						// 1UP
						if (this.j_tokugi == 17) {
							var j2 = this.getMyHP();
							if (j2 < 10) this.setMyHP(String(j2 + 1));
						} else {
							this.j_left++;
						}
					} else if (characterobject.c2 == 9) {
						// シューティングモード パワーアップアイテム1
						this.j_double_f = true;
					} else if (characterobject.c2 == 10) {
						// シューティングモード パワーアップアイテム2
						if (this.co_mu[0].c == 0) {
							this.co_mu[0].c = 100;
							if (this.co_b.c == 100 || this.co_b.c == 200 || this.co_b.c == 300) this.boss_hp = this.boss_hp_max += 10;
							for (var i7 = 0; i7 <= 7; i7++) {
								var l5 = this.mu_ato_p - i7;
								if (l5 < 0) l5 += 32;
								this.mu_ato_x[l5] = this.co_j.x;
								this.mu_ato_y[l5] = this.co_j.y;
							}

							var i6 = this.mu_ato_p - 7;
							if (i6 < 0) i6 += 32;
							this.co_mu[0].x = this.mu_ato_x[i6];
							this.co_mu[0].y = this.mu_ato_y[i6];
						} else if (this.co_mu[1].c == 0) {
							this.co_mu[1].c = 100;
							if (this.co_b.c == 100 || this.co_b.c == 200 || this.co_b.c == 300) this.boss_hp = this.boss_hp_max += 10;
							for (var j7 = 8; j7 <= 14; j7++) {
								var j6 = this.mu_ato_p - j7;
								if (j6 < 0) j6 += 32;
								this.mu_ato_x[j6] = this.co_mu[0].x;
								this.mu_ato_y[j6] = this.co_mu[0].y;
							}

							var k6 = this.mu_ato_p - 14;
							if (k6 < 0) k6 += 32;
							this.co_mu[1].x = this.mu_ato_x[k6];
							this.co_mu[1].y = this.mu_ato_y[k6];
						}
					} else if (characterobject.c2 == 11) {
						// スポット処理 範囲拡大アイテム
						if (this.spot_c == 100) {
							this.spot_r += 48;
							if (this.spot_r > 400) this.spot_c = 0;
						}
					} else if (characterobject.c2 == 12) {
						// ファイヤーボール 水平に飛ぶ
						this.j_fire_f = true;
						this.j_fire_type = 2;
						this.j_fire_range = 9999;
					} else if (characterobject.c2 == 13) {
						// ファイヤーボール 跳ねる
						this.j_fire_f = true;
						this.j_fire_type = 1;
					} else if (characterobject.c2 == 14) {
						// ファイヤーボール ダブル
						this.j_fire_f = true;
						this.j_fire_type = 4;
						this.j_fire_range = 10;
					} else if (characterobject.c2 == 15) {
						// グレネード5発
						this.j_gr_kazu += 5;
					} else if (characterobject.c2 == 16) {
						// コンティニュー
						this.cpoint_con = 100;
						this.cpoint_stage = this.stage;
						this.cpoint_x = characterobject.x;
						this.cpoint_y = characterobject.y;
					}
				} else if (characterobject.c == 2200) {
					// ボスを倒した後の人面星
					this.stage_cc = 1;
					if (this.stage_max >= 2 && this.stage >= this.stage_max) this.addScore(995);
					else this.addScore(95);
					this.gs.rsAddSound(2);
				}
				characterobject.c = 0;
				this.m_kazu--;
				continue;
			}
			if (characterobject.c < 100) continue;
			var flag = false;
			if (this.j_tokugi == 14 || this.j_tokugi == 15) {
				if (Math.abs(characterobject.x - this.co_j.x) <= 22 && Math.abs(characterobject.y - this.co_j.y) <= 22)
					flag = true;
			} else if (Math.abs(characterobject.x - this.co_j.x) <= 23 && Math.abs(characterobject.y - this.co_j.y) <= 28)
				flag = true;
			if (!flag) continue;
			if (
				this.j_v_c > 0 ||
				(this.j_cannon_c > 0 && this.j_cannon_type == 2) ||
				(this.j_cannon_c > 5 && this.j_cannon_type == 3) ||
				this.j_jump_type == 7
			) {
				characterobject.c = 0;
				this.m_kazu--;
				continue;
			}
			if (this.j_muteki_c <= 0) {
				this.setMyHPDamage("1");
				if (this.getMyHP() <= 0) this.jShinu(1);
			}
			if (characterobject.c == 800) {
				characterobject.c = 70;
				characterobject.c1 = 1;
				characterobject.c2 = 20;
			}
		}
	}

	/**
	 * グレネード、ファイアボールといった主人公の攻撃を発生させる
	 * このメソッドで追加する攻撃は同時に2個しか存在できない
	 * @param x {number} X座標(ピクセル座標)
	 * @param y {number} y座標(ピクセル座標)
	 * @param type {number} 種類
	 */
	jmSet(i: number, j: number, k: number) {
		var l = 0;
		do {
			if (l > 1) break;
			if (this.co_jm[l].c <= 0) {
				var characterobject = this.co_jm[l];
				characterobject.c = k;
				characterobject.x = i;
				characterobject.y = j + 8;
				characterobject.c1 = 0;
				characterobject.c2 = 0;
				this.jm_kazu++;
				switch (k) {
					case 60: // エネルギー砲 左に発射
					case 65: // エネルギー砲 右に発射
						characterobject.x = i + 16;
						characterobject.y = j;
						characterobject.vx = i + 16;
						characterobject.c4 = 8;
						this.j_gr_kazu--;
						this.gs.rsAddSound(23);
						break;

					case 100: // ファイヤーボール 左に発射
						characterobject.vx = rounddown(this.co_j.vx / 10) - 10;
						characterobject.vy = -28;
						if (Math.abs(characterobject.vx) < 2) characterobject.vx = -2;
						if (this.j_tokugi == 14) {
							// シューティングモード
							characterobject.c = 101;
							characterobject.y = j;
							characterobject.vx = -16;
							characterobject.vy = 0;
						} else if (this.j_tokugi == 15) {
							// 4方向移動
							characterobject.c = 101;
							characterobject.y = j;
							characterobject.vx = -16;
							characterobject.vy = 0;
							if (this.j_4_muki == 2) {
								// 上向き
								characterobject.vx = 0;
								characterobject.vy = -16;
							} else if (this.j_4_muki == 3) {
								// 下向き
								characterobject.vx = 0;
								characterobject.vy = 16;
							}
						} else if (this.j_fire_type == 3) {
							// 水平に飛ぶ 短射程
							characterobject.c = 101;
							characterobject.y = j;
							characterobject.vx = -20;
							characterobject.vy = 0;
						} else if (this.j_fire_type == 2) {
							// 水平に飛ぶ
							characterobject.c = 101;
							characterobject.y = j;
							characterobject.vx = rounddown(this.co_j.vx / 10) - 12;
							characterobject.vy = 0;
							if (Math.abs(characterobject.vx) < 6) characterobject.vx = -6;
						}
						this.gs.rsAddSound(23);
						break;

					case 105: // ファイヤーボール 右に発射
						characterobject.vx = rounddown(this.co_j.vx / 10) + 10;
						characterobject.vy = -28;
						if (Math.abs(characterobject.vx) < 2) characterobject.vx = 2;
						if (this.j_tokugi == 14) {
							characterobject.c = 106;
							characterobject.y = j;
							characterobject.vx = 16;
							characterobject.vy = 0;
						} else if (this.j_tokugi == 15) {
							characterobject.c = 106;
							characterobject.y = j;
							characterobject.vx = 16;
							characterobject.vy = 0;
							if (this.j_4_muki == 2) {
								characterobject.vx = 0;
								characterobject.vy = -16;
							} else if (this.j_4_muki == 3) {
								characterobject.vx = 0;
								characterobject.vy = 16;
							}
						} else if (this.j_fire_type == 3) {
							characterobject.c = 106;
							characterobject.y = j;
							characterobject.vx = 20;
							characterobject.vy = 0;
						} else if (this.j_fire_type == 2) {
							characterobject.c = 106;
							characterobject.y = j;
							characterobject.vx = rounddown(this.co_j.vx / 10) + 12;
							characterobject.vy = 0;
							if (Math.abs(characterobject.vx) < 6) characterobject.vx = 6;
						}
						this.gs.rsAddSound(23);
						break;

					case 110: // ファイヤーボール ホーミングアミュレット 左に発射
						characterobject.x = i;
						characterobject.y = j;
						characterobject.vx = -10;
						characterobject.vy = -10;
						this.gs.rsAddSound(23);
						break;

					case 115: // ファイヤーボール ホーミングアミュレット 右に発射
						characterobject.c = 110;
						characterobject.x = i;
						characterobject.y = j;
						characterobject.vx = 10;
						characterobject.vy = -10;
						this.gs.rsAddSound(23);
						break;

					case 200: // グレネード 左に発射
						characterobject.vx = rounddown(this.co_j.vx / 10) - 10;
						characterobject.vy = -35;
						if (Math.abs(characterobject.vx) < 2) characterobject.vx = -2;
						if (this.grenade_type == 5 || this.grenade_type == 6) {
							// エネルギー砲
							characterobject.y = j;
							characterobject.vx = -20;
							characterobject.vy = 0;
						}
						this.j_gr_kazu--;
						this.gs.rsAddSound(23);
						break;

					case 205: // グレネード 右に発射
						characterobject.c = 200;
						if (this.j_tokugi == 14) {
							characterobject.vx = 10;
							characterobject.vy = 0;
						} else {
							characterobject.vx = rounddown(this.co_j.vx / 10) + 10;
							characterobject.vy = -35;
							if (Math.abs(characterobject.vx) < 2) characterobject.vx = 2;
						}
						if (this.grenade_type == 5 || this.grenade_type == 6) {
							// エネルギー砲
							characterobject.y = j;
							characterobject.vx = 20;
							characterobject.vy = 0;
						}
						this.j_gr_kazu--;
						this.gs.rsAddSound(23);
						break;

					case 1206: // ブロック１破壊砲 右に発射
						characterobject.c = 200;
						characterobject.c4 = 2;
						characterobject.x = i + 16 - 10;
						characterobject.y = j;
						characterobject.vx = 20;
						characterobject.vy = 0;
						this.j_gr_kazu--;
						this.gs.rsAddSound(23);
						break;

					case 1207: // ブロック１破壊砲 左に発射
						characterobject.c = 200;
						characterobject.c4 = 2;
						characterobject.x = i + 16 + 10;
						characterobject.y = j;
						characterobject.vx = -20;
						characterobject.vy = 0;
						this.j_gr_kazu--;
						this.gs.rsAddSound(23);
						break;
				}
				break;
			}
			l++;
		} while (true);
	}

	/**
	 * シューティングモード、四方向移動モード時の攻撃を追加発生させる
	 * @param x {number} X座標(ピクセル座標)
	 * @param y {number} y座標(ピクセル座標)
	 * @param type {number} 種類
	 * @param i {number} 攻撃を配置するco_jmのインデックス(同インデックスを指定すると前に発生させた攻撃が消滅するまで次を出せない
	 */
	jmSet2(i: number, j: number, k: number, l: number) {
		var i1 = l;
		if (this.co_jm[i1].c > 0) return;
		var characterobject = this.co_jm[i1];
		characterobject.c = k;
		characterobject.x = i;
		characterobject.y = j + 8;
		characterobject.c1 = 0;
		characterobject.c2 = 0;
		characterobject.c4 = 0;
		this.jm_kazu++;
		switch (k) {
			default:
				break;

			case 50: // 夢想封印
				characterobject.x = i;
				characterobject.y = j;
				characterobject.c = 50;
				characterobject.c1 = 1;
				characterobject.c2 = 20;
				this.j_gr_kazu--;
				this.gs.rsAddSound(23);
				break;

			case 60:
				characterobject.x = i + 16;
				characterobject.y = j;
				characterobject.vx = i + 16;
				characterobject.c4 = 8;
				this.j_gr_kazu--;
				this.gs.rsAddSound(23);
				break;

			case 65:
				characterobject.x = i + 16;
				characterobject.y = j;
				characterobject.vx = i + 16;
				characterobject.c4 = 8;
				this.j_gr_kazu--;
				this.gs.rsAddSound(23);
				break;

			case 100:
				characterobject.vx = rounddown(this.co_j.vx / 10) - 10;
				characterobject.vy = -28;
				if (Math.abs(characterobject.vx) < 2) characterobject.vx = -2;
				if (this.j_tokugi == 14) {
					characterobject.c = 101;
					characterobject.y = j;
					characterobject.vx = -16;
					characterobject.vy = 0;
				} else if (this.j_tokugi == 15) {
					characterobject.c = 101;
					characterobject.y = j;
					characterobject.vx = -16;
					characterobject.vy = 0;
					if (this.j_4_muki == 2) {
						characterobject.vx = 0;
						characterobject.vy = -16;
					} else if (this.j_4_muki == 3) {
						characterobject.vx = 0;
						characterobject.vy = 16;
					}
				}
				this.gs.rsAddSound(23);
				break;

			case 105:
				characterobject.vx = rounddown(this.co_j.vx / 10) + 10;
				characterobject.vy = -28;
				if (Math.abs(characterobject.vx) < 2) characterobject.vx = 2;
				if (this.j_tokugi == 14) {
					characterobject.c = 106;
					characterobject.y = j;
					characterobject.vx = 16;
					characterobject.vy = 0;
				} else if (this.j_tokugi == 15) {
					characterobject.c = 106;
					characterobject.y = j;
					characterobject.vx = 16;
					characterobject.vy = 0;
					if (this.j_4_muki == 2) {
						characterobject.vx = 0;
						characterobject.vy = -16;
					} else if (this.j_4_muki == 3) {
						characterobject.vx = 0;
						characterobject.vy = 16;
					}
				}
				this.gs.rsAddSound(23);
				break;

			case 200:
				characterobject.vx = rounddown(this.co_j.vx / 10) - 10;
				characterobject.vy = -35;
				if (Math.abs(characterobject.vx) < 2) characterobject.vx = -2;
				if (this.grenade_type == 5 || this.grenade_type == 6 || this.j_tokugi == 15) {
					characterobject.y = j;
					characterobject.vx = -20;
					characterobject.vy = 0;
					if (this.j_tokugi == 15)
						if (this.j_4_muki == 2) {
							characterobject.vx = 0;
							characterobject.vy = -20;
						} else if (this.j_4_muki == 3) {
							characterobject.vx = 0;
							characterobject.vy = 20;
						}
				}
				this.j_gr_kazu--;
				this.gs.rsAddSound(23);
				break;

			case 205:
				characterobject.c = 200;
				if (this.j_tokugi == 14) {
					characterobject.vx = 10;
					characterobject.vy = 0;
				} else {
					characterobject.vx = rounddown(this.co_j.vx / 10) + 10;
					characterobject.vy = -35;
					if (Math.abs(characterobject.vx) < 2) characterobject.vx = 2;
				}
				if (this.grenade_type == 5 || this.grenade_type == 6 || this.j_tokugi == 15) {
					characterobject.y = j;
					characterobject.vx = 20;
					characterobject.vy = 0;
					if (this.j_tokugi == 15)
						if (this.j_4_muki == 2) {
							characterobject.vx = 0;
							characterobject.vy = -20;
						} else if (this.j_4_muki == 3) {
							characterobject.vx = 0;
							characterobject.vy = 20;
						}
				}
				this.j_gr_kazu--;
				this.gs.rsAddSound(23);
				break;

			case 206: // 右にブロック１破壊砲発射
				characterobject.c = 200;
				characterobject.c4 = 2;
				characterobject.x = i + 16;
				characterobject.y = j;
				characterobject.vx = 16;
				characterobject.vy = 0;
				this.gs.rsAddSound(23);
				break;

			case 207: // 左にブロック１破壊砲発射
				characterobject.c = 200;
				characterobject.c4 = 2;
				characterobject.x = i - 16;
				characterobject.y = j;
				characterobject.vx = -16;
				characterobject.vy = 0;
				this.gs.rsAddSound(23);
				break;

			case 208: // 上にブロック１破壊砲発射
				characterobject.c = 200;
				characterobject.c4 = 2;
				characterobject.y = j - 16;
				characterobject.vx = 0;
				characterobject.vy = -16;
				this.gs.rsAddSound(23);
				break;

			case 209: // 下にブロック１破壊砲発射
				characterobject.c = 200;
				characterobject.c4 = 2;
				characterobject.y = j + 24;
				characterobject.vx = 0;
				characterobject.vy = 18;
				this.gs.rsAddSound(23);
				break;
		}
	}

	/**
	 * 主人公の攻撃の更新処理
	 */
	jmMove() {
		for (var i = 0; i <= 8; i++) {
			if (this.co_jm[i].c == 0) continue;
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
					if (characterobject.c4 == 2 && characterobject.c1 == 10) {
						var i9 = rightShiftIgnoreSign(characterobject.x + 15, 5);
						var k12 = rightShiftIgnoreSign(characterobject.y + 15, 5);
						characterobject.x = i9 * 32;
						characterobject.y = k12 * 32;
						for (var i16 = -1; i16 <= 1; i16++) {
							for (var k15 = -1; k15 <= 1; k15++)
								if (
									i9 + k15 >= 1 &&
									i9 + k15 <= this.mapWidth &&
									k12 + i16 >= 10 &&
									k12 + i16 <= this.mapHeight + 9 &&
									this.maps.map_bg[i9 + k15][k12 + i16] == 20
								)
									this.maps.putBGCode(i9 + k15, k12 + i16, 0);
						}
					}
					if (this.grenade_type == 7) {
						characterobject.c2 += 16;
						if (this.sl_step == 10 || this.sl_step == 11) characterobject.x += this.sl_speed;
						for (var j = 0; j <= 79; j++) {
							if (this.co_m[j].c < 100 || this.co_m[j].c > 2000) continue;
							var characterobject1 = this.co_m[j];
							var j9 = characterobject1.x - characterobject.x;
							var l12 = characterobject1.y - characterobject.y;
							var k16 = Math.floor(Math.sqrt(j9 * j9 + l12 * l12));
							if (k16 <= characterobject.c2 + 8) {
								characterobject1.c = 0;
								this.m_kazu--;
							}
						}
					}
					for (var k = 0; k <= this.t_kazu; k++) {
						if (this.co_t[k].c < 100) continue;
						var characterobject2 = this.co_t[k];
						var k9 = characterobject2.x - characterobject.x;
						var i13 = characterobject2.y - characterobject.y;
						var l16 = Math.floor(Math.sqrt(k9 * k9 + i13 * i13));
						if (l16 > characterobject.c2 + 8) continue;
						if (characterobject.x > characterobject2.x) {
							characterobject2.pth = 1;
							characterobject2.vx = -3;
						} else {
							characterobject2.pth = 0;
							characterobject2.vx = 3;
						}
						if (characterobject2.c >= 1200 && characterobject2.c < 1300) {
							characterobject2.c = 54;
							characterobject2.vy = -25;
						} else if (characterobject2.c >= 1400 && characterobject2.c < 1500) {
							characterobject2.c = 57;
							characterobject2.c1 = 0;
						} else if (characterobject2.c == 1190) {
							characterobject2.c = 55;
							characterobject2.c1 = 0;
							var l9 = rightShiftIgnoreSign(characterobject2.x, 5);
							var j13 = rightShiftIgnoreSign(characterobject2.y, 5);
							if (characterobject2.c5 == 1) this.onASwitch(l9 - 5, j13 - 5, l9 + 5, j13 + 5);
							else this.onASwitch(l9 - 10, j13 - 10, l9 + 10, j13 + 10);
						} else {
							characterobject2.c = 52;
							characterobject2.vy = -25;
							if (this.j_tokugi == 14 || this.j_tokugi == 15) {
								characterobject2.c = 55;
								characterobject2.c1 = 0;
							}
						}
						this.gs.rsAddSound(9);
					}

					if ((this.grenade_type == 1 || this.grenade_type == 5) && this.co_b.c >= 100) {
						var i10 = this.co_b.x - characterobject.x;
						var k13 = this.co_b.y - characterobject.y;
						var i17 = Math.floor(Math.sqrt(i10 * i10 + k13 * k13));
						if (i17 <= characterobject.c2 + 20) {
							// グレネードの爆風でボスを倒す
							if (this.j_tokugi == 14 || this.j_tokugi == 15) {
								// シューティングモード
								this.co_b.killNormalAttack(this);
							} else {
								this.co_b.killGrenade(this, characterobject.x > this.co_b.x ? 1 : 0);
							}
						}
					}
					characterobject.pt = 1000;
					characterobject.pth = 0;
					break;

				case 60: // エネルギー砲 左に発射
					characterobject.y = this.co_j.y;
					characterobject.x -= 28;
					if (characterobject.x <= this.maps.wx - 32) characterobject.x = this.maps.wx - 32;
					if (characterobject.c4 > 0) {
						characterobject.c4--;
						characterobject.vx = this.co_j.x + 16;
					} else {
						characterobject.vx -= 28;
						if (characterobject.vx <= characterobject.x) characterobject.c = 0;
					}
					for (var l = 0; l <= this.t_kazu; l++) {
						if (this.co_t[l].c < 100) continue;
						var characterobject3 = this.co_t[l];
						if (
							characterobject3.x <= characterobject.x - 12 ||
							characterobject3.x >= characterobject.vx + 12 ||
							Math.abs(characterobject3.y - characterobject.y) >= 24
						)
							continue;
						characterobject3.pth = 0;
						characterobject3.vx = -3;
						if (characterobject3.c >= 1200 && characterobject3.c < 1300) {
							characterobject3.c = 54;
							characterobject3.vy = -25;
						} else if (characterobject3.c >= 1400 && characterobject3.c < 1500) {
							characterobject3.c = 57;
							characterobject3.c1 = 0;
						} else if (characterobject3.c == 1190) {
							characterobject3.c = 55;
							characterobject3.c1 = 0;
							var j10 = rightShiftIgnoreSign(characterobject3.x, 5);
							var l13 = rightShiftIgnoreSign(characterobject3.y, 5);
							if (characterobject3.c5 == 1) this.onASwitch(j10 - 5, l13 - 5, j10 + 5, l13 + 5);
							else this.onASwitch(j10 - 10, l13 - 10, j10 + 10, l13 + 10);
						} else {
							characterobject3.c = 52;
							characterobject3.vy = -25;
							if (this.j_tokugi == 14 || this.j_tokugi == 15) {
								characterobject3.c = 55;
								characterobject3.c1 = 0;
							}
						}
						this.gs.rsAddSound(9);
					}

					if (
						this.grenade_type == 3 &&
						this.co_b.c >= 100 &&
						this.co_b.x > characterobject.x - 24 &&
						this.co_b.x < characterobject.vx + 24 &&
						Math.abs(this.co_b.y - characterobject.y) < 36
					) {
						// 左向きエネルギー砲でボスを倒す
						if (this.j_tokugi == 14 || this.j_tokugi == 15) {
							// シューティングモード
							this.co_b.killNormalAttack(this);
						} else {
							this.co_b.killGrenade(this, 1);
						}
					}
					if (this.co_j.c < 100 || this.co_j.c >= 200) characterobject.c = 0;
					characterobject.pt = 1200;
					break;

				case 65: // エネルギー砲 右に発射
					characterobject.y = this.co_j.y;
					characterobject.x += 28;
					if (characterobject.x >= this.maps.wx + this.gg.di.width + 32)
						characterobject.x = this.maps.wx + this.gg.di.width + 32;
					if (characterobject.c4 > 0) {
						characterobject.c4--;
						characterobject.vx = this.co_j.x + 16;
					} else {
						characterobject.vx += 28;
						if (characterobject.vx >= characterobject.x) characterobject.c = 0;
					}
					for (var i1 = 0; i1 <= this.t_kazu; i1++) {
						if (this.co_t[i1].c < 100) continue;
						var characterobject4 = this.co_t[i1];
						if (
							characterobject4.x <= characterobject.vx - 12 ||
							characterobject4.x >= characterobject.x + 12 ||
							Math.abs(characterobject4.y - characterobject.y) >= 24
						)
							continue;
						characterobject4.pth = 0;
						characterobject4.vx = 3;
						if (characterobject4.c >= 1200 && characterobject4.c < 1300) {
							characterobject4.c = 54;
							characterobject4.vy = -25;
						} else if (characterobject4.c >= 1400 && characterobject4.c < 1500) {
							characterobject4.c = 57;
							characterobject4.c1 = 0;
						} else if (characterobject4.c == 1190) {
							characterobject4.c = 55;
							characterobject4.c1 = 0;
							var k10 = rightShiftIgnoreSign(characterobject4.x, 5);
							var i14 = rightShiftIgnoreSign(characterobject4.y, 5);
							if (characterobject4.c5 == 1) this.onASwitch(k10 - 5, i14 - 5, k10 + 5, i14 + 5);
							else this.onASwitch(k10 - 10, i14 - 10, k10 + 10, i14 + 10);
						} else {
							characterobject4.c = 52;
							characterobject4.vy = -25;
							if (this.j_tokugi == 14 || this.j_tokugi == 15) {
								characterobject4.c = 55;
								characterobject4.c1 = 0;
							}
						}
						this.gs.rsAddSound(9);
					}

					if (
						this.grenade_type == 3 &&
						this.co_b.c >= 100 &&
						this.co_b.x > characterobject.vx - 24 &&
						this.co_b.x < characterobject.x + 24 &&
						Math.abs(this.co_b.y - characterobject.y) < 36
					) {
						// 右向きエネルギー砲でボスを倒す
						if (this.j_tokugi == 14 || this.j_tokugi == 15) {
							// シューティングモード
							this.co_b.killNormalAttack(this);
						} else {
							this.co_b.killGrenade(this, 0);
						}
					}
					if (this.co_j.c < 100 || this.co_j.c >= 200) characterobject.c = 0;
					characterobject.pt = 1205;
					break;

				case 100: // ファイヤーボール 跳ねる 左に発射
					var l10 = characterobject.x;
					characterobject.x += characterobject.vx;
					if (
						rightShiftIgnoreSign(l10 + 7, 5) > rightShiftIgnoreSign(characterobject.x + 7, 5) &&
						this.maps.getBGCode(l10 + 7, characterobject.y + 15) == 19 &&
						this.maps.getBGCode(characterobject.x + 7, characterobject.y + 15) >= 20
					)
						characterobject.y = rightShiftIgnoreSign(characterobject.y + 15, 5) * 32 - 24;
					if (this.maps.getBGCode(characterobject.x + 7, characterobject.y + 15) >= 20) characterobject.c = 0;
					characterobject.vy += 5;
					if (characterobject.vy > 25) characterobject.vy = 25;
					var j14 = characterobject.y;
					characterobject.y += characterobject.vy;
					if (characterobject.vy < 0 && this.maps.getBGCode(characterobject.x + 15, characterobject.y + 8) >= 20)
						characterobject.c = 0;
					var i3 = this.maps.getBGCode(characterobject.x + 15, characterobject.y + 23);
					if (i3 >= 20 || i3 == 15 || i3 == 10) {
						characterobject.y = rightShiftIgnoreSign(characterobject.y + 23, 5) * 32 - 24;
						characterobject.vy = -28;
					} else if (rightShiftIgnoreSign(j14 + 23, 5) < rightShiftIgnoreSign(characterobject.y + 23, 5)) {
						i3 = this.maps.getBGCode(characterobject.x + 15, j14 + 23);
						if (i3 == 18 || i3 == 19) {
							characterobject.y = rightShiftIgnoreSign(characterobject.y + 23, 5) * 32 - 24;
							characterobject.vy = -28;
						}
					}
					i3 = this.maps.getBGCode(characterobject.x + 15, characterobject.y + 23);
					if (
						(i3 == 18 || i3 == 19) &&
						this.getSakamichiY(characterobject.x + 15, characterobject.y + 23) + 8 < characterobject.y
					) {
						characterobject.y = this.getSakamichiY(characterobject.x + 15, characterobject.y + 23) + 8;
						characterobject.vy = -28;
					}
					if (this.yuka_id_max >= 0 && characterobject.vy > 0) {
						for (var j1 = 0; j1 <= this.yuka_id_max; j1++) {
							if (this.yo[j1].con >= 300 && this.yo[j1].con < 350) {
								var j3 = this.getSCOY(
									this.yo[j1].x,
									this.yo[j1].y,
									this.yo[j1].x2,
									this.yo[j1].y2,
									characterobject.x + 15
								);
								if (j3 >= 0 && j3 + 8 <= characterobject.y && j3 + 47 >= characterobject.y) {
									characterobject.y = j3 + 8;
									characterobject.vy = -28;
								}
								continue;
							}
							if (this.yo[j1].con >= 350 && this.yo[j1].con < 400) {
								var k3 = this.getSHCOY(
									this.yo[j1].x,
									this.yo[j1].y,
									this.yo[j1].x2,
									this.yo[j1].y2,
									characterobject.x + 15
								);
								if (k3 >= 0 && k3 + 8 <= characterobject.y && k3 + 47 >= characterobject.y) {
									characterobject.y = k3 + 8;
									characterobject.vy = -28;
								}
								continue;
							}
							if (this.yo[j1].con >= 400 && this.yo[j1].con < 450) {
								var l3 = this.getSWUpOY(
									this.yo[j1].x,
									this.yo[j1].y,
									this.yo[j1].x2,
									this.yo[j1].y2,
									characterobject.x + 15
								);
								if (l3 >= 0 && l3 + 8 <= characterobject.y && l3 + 47 >= characterobject.y) {
									characterobject.y = l3 + 8;
									characterobject.vy = -28;
								}
								continue;
							}
							if (this.yo[j1].con < 450 || this.yo[j1].con >= 500) continue;
							var i4 = this.getSWDownOY(
								this.yo[j1].x,
								this.yo[j1].y,
								this.yo[j1].x2,
								this.yo[j1].y2,
								characterobject.x + 15
							);
							if (i4 >= 0 && i4 + 8 <= characterobject.y && i4 + 47 >= characterobject.y) {
								characterobject.y = i4 + 8;
								characterobject.vy = -28;
							}
						}
					}
					if (!this.j_fire_mkf && this.maps.getBGCode(characterobject.x + 15, characterobject.y + 15) == 4)
						characterobject.c = 0;
					if (
						characterobject.x <= this.maps.wx - 24 ||
						characterobject.x >= this.maps.wx + this.gg.di.width - 8 ||
						characterobject.y <= this.maps.wy - 128 ||
						characterobject.y >= this.maps.wy + this.gg.di.height + 64
					)
						characterobject.c = 0;
					characterobject.pt = 130 + this.g_c2;
					characterobject.pth = 0;
					break;

				case 101: // ファイヤーボール 左に水平に飛ぶ
					characterobject.x += characterobject.vx;
					characterobject.y += characterobject.vy;
					if (
						this.maps.getBGCode(characterobject.x + 7, characterobject.y + 15) >= 20 ||
						this.maps.getBGCode(characterobject.x + 7, characterobject.y + 15) == 18
					)
						characterobject.c = 0;
					if (this.yuka_id_max >= 0) {
						for (var k1 = 0; k1 <= this.yuka_id_max; k1++) {
							if (this.yo[k1].con >= 300 && this.yo[k1].con < 350) {
								var j4 = this.getSCOY(
									this.yo[k1].x,
									this.yo[k1].y,
									this.yo[k1].x2,
									this.yo[k1].y2,
									characterobject.x + 15
								);
								if (j4 >= 0 && j4 + 8 <= characterobject.y && j4 + 47 >= characterobject.y) characterobject.c = 0;
								continue;
							}
							if (this.yo[k1].con >= 350 && this.yo[k1].con < 400) {
								var k4 = this.getSHCOY(
									this.yo[k1].x,
									this.yo[k1].y,
									this.yo[k1].x2,
									this.yo[k1].y2,
									characterobject.x + 15
								);
								if (k4 >= 0 && k4 + 8 <= characterobject.y && k4 + 47 >= characterobject.y) characterobject.c = 0;
								continue;
							}
							if (this.yo[k1].con >= 400 && this.yo[k1].con < 450) {
								var l4 = this.getSWUpOY(
									this.yo[k1].x,
									this.yo[k1].y,
									this.yo[k1].x2,
									this.yo[k1].y2,
									characterobject.x + 15
								);
								if (l4 >= 0 && l4 + 8 <= characterobject.y && l4 + 47 >= characterobject.y) characterobject.c = 0;
								continue;
							}
							if (this.yo[k1].con < 450 || this.yo[k1].con >= 500) continue;
							var i5 = this.getSWDownOY(
								this.yo[k1].x,
								this.yo[k1].y,
								this.yo[k1].x2,
								this.yo[k1].y2,
								characterobject.x + 15
							);
							if (i5 >= 0 && i5 + 8 <= characterobject.y && i5 + 47 >= characterobject.y) characterobject.c = 0;
						}
					}
					characterobject.c2++;
					if (characterobject.c2 > this.j_fire_range) characterobject.c = 0;
					if (!this.j_fire_mkf && this.maps.getBGCode(characterobject.x + 15, characterobject.y + 15) == 4)
						characterobject.c = 0;
					if (
						characterobject.x <= this.maps.wx - 24 ||
						characterobject.x >= this.maps.wx + this.gg.di.width - 8 ||
						characterobject.y <= this.maps.wy - 24 ||
						characterobject.y >= this.maps.wy + this.gg.di.height - 8
					)
						characterobject.c = 0;
					characterobject.pt = 130 + this.g_c2;
					characterobject.pth = 0;
					break;

				case 105: // ファイヤーボール 跳ねる 右に発射
					var j11 = characterobject.x;
					characterobject.x += characterobject.vx;
					if (
						rightShiftIgnoreSign(j11 + 23, 5) < rightShiftIgnoreSign(characterobject.x + 23, 5) &&
						this.maps.getBGCode(j11 + 23, characterobject.y + 15) == 18 &&
						this.maps.getBGCode(characterobject.x + 23, characterobject.y + 15) >= 20
					)
						characterobject.y = rightShiftIgnoreSign(characterobject.y + 15, 5) * 32 - 24;
					if (this.maps.getBGCode(characterobject.x + 23, characterobject.y + 15) >= 20) characterobject.c = 0;
					characterobject.vy += 5;
					if (characterobject.vy > 25) characterobject.vy = 25;
					var k14 = characterobject.y;
					characterobject.y += characterobject.vy;
					if (characterobject.vy < 0 && this.maps.getBGCode(characterobject.x + 15, characterobject.y + 8) >= 20)
						characterobject.c = 0;
					var j5 = this.maps.getBGCode(characterobject.x + 15, characterobject.y + 23);
					if (j5 >= 20 || j5 == 15 || j5 == 10) {
						characterobject.y = rightShiftIgnoreSign(characterobject.y + 23, 5) * 32 - 24;
						characterobject.vy = -28;
					} else if (rightShiftIgnoreSign(k14 + 23, 5) < rightShiftIgnoreSign(characterobject.y + 23, 5)) {
						j5 = this.maps.getBGCode(characterobject.x + 15, k14 + 23);
						if (j5 == 18 || j5 == 19) {
							characterobject.y = rightShiftIgnoreSign(characterobject.y + 23, 5) * 32 - 24;
							characterobject.vy = -28;
						}
					}
					j5 = this.maps.getBGCode(characterobject.x + 15, characterobject.y + 23);
					if (
						(j5 == 18 || j5 == 19) &&
						this.getSakamichiY(characterobject.x + 15, characterobject.y + 23) + 8 < characterobject.y
					) {
						characterobject.y = this.getSakamichiY(characterobject.x + 15, characterobject.y + 23) + 8;
						characterobject.vy = -28;
					}
					if (this.yuka_id_max >= 0 && characterobject.vy > 0) {
						for (var l1 = 0; l1 <= this.yuka_id_max; l1++) {
							if (this.yo[l1].con >= 300 && this.yo[l1].con < 350) {
								var k5 = this.getSCOY(
									this.yo[l1].x,
									this.yo[l1].y,
									this.yo[l1].x2,
									this.yo[l1].y2,
									characterobject.x + 15
								);
								if (k5 >= 0 && k5 + 8 <= characterobject.y && k5 + 47 >= characterobject.y) {
									characterobject.y = k5 + 8;
									characterobject.vy = -28;
								}
								continue;
							}
							if (this.yo[l1].con >= 350 && this.yo[l1].con < 400) {
								var l5 = this.getSHCOY(
									this.yo[l1].x,
									this.yo[l1].y,
									this.yo[l1].x2,
									this.yo[l1].y2,
									characterobject.x + 15
								);
								if (l5 >= 0 && l5 + 8 <= characterobject.y && l5 + 47 >= characterobject.y) {
									characterobject.y = l5 + 8;
									characterobject.vy = -28;
								}
								continue;
							}
							if (this.yo[l1].con >= 400 && this.yo[l1].con < 450) {
								var i6 = this.getSWUpOY(
									this.yo[l1].x,
									this.yo[l1].y,
									this.yo[l1].x2,
									this.yo[l1].y2,
									characterobject.x + 15
								);
								if (i6 >= 0 && i6 + 8 <= characterobject.y && i6 + 47 >= characterobject.y) {
									characterobject.y = i6 + 8;
									characterobject.vy = -28;
								}
								continue;
							}
							if (this.yo[l1].con < 450 || this.yo[l1].con >= 500) continue;
							var j6 = this.getSWDownOY(
								this.yo[l1].x,
								this.yo[l1].y,
								this.yo[l1].x2,
								this.yo[l1].y2,
								characterobject.x + 15
							);
							if (j6 >= 0 && j6 + 8 <= characterobject.y && j6 + 47 >= characterobject.y) {
								characterobject.y = j6 + 8;
								characterobject.vy = -28;
							}
						}
					}
					if (!this.j_fire_mkf && this.maps.getBGCode(characterobject.x + 15, characterobject.y + 15) == 4)
						characterobject.c = 0;
					if (
						characterobject.x <= this.maps.wx - 24 ||
						characterobject.x >= this.maps.wx + this.gg.di.width - 8 ||
						characterobject.y <= this.maps.wy - 128 ||
						characterobject.y >= this.maps.wy + this.gg.di.height + 64
					)
						characterobject.c = 0;
					characterobject.pt = 130 + this.g_c2;
					characterobject.pth = 1;
					break;

				case 106: // ファイヤーボール 右に水平に飛ぶ
					characterobject.x += characterobject.vx;
					characterobject.y += characterobject.vy;
					if (this.maps.getBGCode(characterobject.x + 23, characterobject.y + 15) >= 19) characterobject.c = 0;
					if (this.yuka_id_max >= 0) {
						for (var i2 = 0; i2 <= this.yuka_id_max; i2++) {
							if (this.yo[i2].con >= 300 && this.yo[i2].con < 350) {
								var k6 = this.getSCOY(
									this.yo[i2].x,
									this.yo[i2].y,
									this.yo[i2].x2,
									this.yo[i2].y2,
									characterobject.x + 15
								);
								if (k6 >= 0 && k6 + 8 <= characterobject.y && k6 + 47 >= characterobject.y) characterobject.c = 0;
								continue;
							}
							if (this.yo[i2].con >= 350 && this.yo[i2].con < 400) {
								var l6 = this.getSHCOY(
									this.yo[i2].x,
									this.yo[i2].y,
									this.yo[i2].x2,
									this.yo[i2].y2,
									characterobject.x + 15
								);
								if (l6 >= 0 && l6 + 8 <= characterobject.y && l6 + 47 >= characterobject.y) characterobject.c = 0;
								continue;
							}
							if (this.yo[i2].con >= 400 && this.yo[i2].con < 450) {
								var i7 = this.getSWUpOY(
									this.yo[i2].x,
									this.yo[i2].y,
									this.yo[i2].x2,
									this.yo[i2].y2,
									characterobject.x + 15
								);
								if (i7 >= 0 && i7 + 8 <= characterobject.y && i7 + 47 >= characterobject.y) characterobject.c = 0;
								continue;
							}
							if (this.yo[i2].con < 450 || this.yo[i2].con >= 500) continue;
							var j7 = this.getSWDownOY(
								this.yo[i2].x,
								this.yo[i2].y,
								this.yo[i2].x2,
								this.yo[i2].y2,
								characterobject.x + 15
							);
							if (j7 >= 0 && j7 + 8 <= characterobject.y && j7 + 47 >= characterobject.y) characterobject.c = 0;
						}
					}
					characterobject.c2++;
					if (characterobject.c2 > this.j_fire_range) characterobject.c = 0;
					if (!this.j_fire_mkf && this.maps.getBGCode(characterobject.x + 15, characterobject.y + 15) == 4)
						characterobject.c = 0;
					if (
						characterobject.x <= this.maps.wx - 24 ||
						characterobject.x >= this.maps.wx + this.gg.di.width - 8 ||
						characterobject.y <= this.maps.wy - 24 ||
						characterobject.y >= this.maps.wy + this.gg.di.height - 8
					)
						characterobject.c = 0;
					characterobject.pt = 130 + this.g_c2;
					characterobject.pth = 1;
					if (i == 7 || i == 8) characterobject.pt = 128 + this.g_c1;
					break;

				case 110: // ファイヤーボール ホーミングアミュレット
					var j15 = -1;
					var l11 = 9999;
					for (var j2 = 0; j2 <= this.t_kazu; j2++) {
						if (
							this.co_t[j2].c < 100 ||
							this.co_t[j2].x < this.maps.wx - 15 ||
							this.co_t[j2].x > this.maps.wx + this.gg.di.width + 15 ||
							this.co_t[j2].y < this.maps.wy - 15 ||
							this.co_t[j2].y > this.maps.wy + this.gg.di.height + 15
						)
							continue;
						var k7 = Math.abs(this.co_t[j2].x - characterobject.x) + Math.abs(this.co_t[j2].y - characterobject.y);
						if (k7 < l11) {
							j15 = j2;
							l11 = k7;
						}
					}

					if (j15 >= 0) {
						if (this.co_t[j15].x < characterobject.x - 8) {
							characterobject.vx -= 3;
							if (characterobject.vx < -10) characterobject.vx = -10;
						} else if (this.co_t[j15].x > characterobject.x + 8) {
							characterobject.vx += 3;
							if (characterobject.vx > 10) characterobject.vx = 10;
						} else if (Math.abs(characterobject.vx) <= 3) characterobject.vx = 0;
						else if (characterobject.vx > 0) characterobject.vx -= 3;
						else if (characterobject.vx < 0) characterobject.vx += 3;
						if (this.co_t[j15].y < characterobject.y - 8) {
							characterobject.vy -= 3;
							if (characterobject.vy < -10) characterobject.vy = -10;
						} else if (this.co_t[j15].y > characterobject.y + 8) {
							characterobject.vy += 3;
							if (characterobject.vy > 10) characterobject.vy = 10;
						} else if (Math.abs(characterobject.vy) <= 3) characterobject.vy = 0;
						else if (characterobject.vy > 0) characterobject.vy -= 3;
						else if (characterobject.vy < 0) characterobject.vy += 3;
					} else if (this.j_tokugi == 14) {
						characterobject.vx += 3;
						if (characterobject.vx > 10) characterobject.vx = 10;
						characterobject.vy -= 3;
						if (characterobject.vy < -10) characterobject.vy = -10;
					} else {
						if (this.co_j.muki == 0) {
							characterobject.vx -= 3;
							if (characterobject.vx < -10) characterobject.vx = -10;
						} else {
							characterobject.vx += 3;
							if (characterobject.vx > 10) characterobject.vx = 10;
						}
						characterobject.vy -= 3;
						if (characterobject.vy < -10) characterobject.vy = -10;
					}
					characterobject.x += characterobject.vx;
					characterobject.y += characterobject.vy;
					if (this.maps.getBGCode(characterobject.x + 23, characterobject.y + 15) >= 19) characterobject.c = 0;
					if (!this.j_fire_mkf && this.maps.getBGCode(characterobject.x + 15, characterobject.y + 15) == 4)
						characterobject.c = 0;
					if (
						characterobject.x <= this.maps.wx - 24 ||
						characterobject.x >= this.maps.wx + this.gg.di.width - 8 ||
						characterobject.y <= this.maps.wy - 24 ||
						characterobject.y >= this.maps.wy + this.gg.di.height - 8
					)
						characterobject.c = 0;
					characterobject.pt = 130 + this.g_c2;
					characterobject.pth = 1;
					if (i == 7 || i == 8) characterobject.pt = 128 + this.g_c1;
					break;

				case 200: // グレネード
					characterobject.x += characterobject.vx;
					if (characterobject.c4 == 2) characterobject.y += characterobject.vy;
					else if ((this.grenade_type != 5 && this.grenade_type != 6) || this.j_tokugi == 15) {
						if (this.j_tokugi != 15)
							if (this.j_tokugi == 14) {
								characterobject.vy += 2;
								if (characterobject.vy > 30) characterobject.vy = 30;
							} else {
								characterobject.vy += 5;
								if (characterobject.vy > 30) characterobject.vy = 30;
							}
						characterobject.y += characterobject.vy;
						if (characterobject.vy > 0 && this.maps.getBGCode(characterobject.x + 15, characterobject.y + 31) >= 18) {
							characterobject.c = 50;
							characterobject.y = rightShiftIgnoreSign(characterobject.y + 31, 5) * 32 - 16;
							characterobject.c1 = 1;
							characterobject.c2 = 20;
						}
					}
					var l7 = this.maps.getBGCode(characterobject.x + 15, characterobject.y + 15);
					if (l7 >= 18 || (l7 == 15 && characterobject.vy >= 0)) {
						characterobject.c = 50;
						characterobject.c1 = 1;
						characterobject.c2 = 20;
						if (characterobject.c4 == 2) {
							var i12 = rightShiftIgnoreSign(characterobject.x + 15, 5);
							var l14 = rightShiftIgnoreSign(characterobject.y + 15, 5);
							characterobject.x = i12 * 32;
							characterobject.y = l14 * 32;
							for (var j16 = -1; j16 <= 1; j16++) {
								for (var l15 = -1; l15 <= 1; l15++)
									if (
										i12 + l15 >= 1 &&
										i12 + l15 <= this.mapWidth &&
										l14 + j16 >= 10 &&
										l14 + j16 <= this.mapHeight + 9 &&
										this.maps.map_bg[i12 + l15][l14 + j16] == 20
									)
										this.gs.rsAddSound(16);
							}
						}
					}
					if (this.yuka_id_max >= 0 && characterobject.vy > 0) {
						for (var k2 = 0; k2 <= this.yuka_id_max; k2++) {
							if (this.yo[k2].con >= 300 && this.yo[k2].con < 350) {
								var i8 = this.getSCOY(
									this.yo[k2].x,
									this.yo[k2].y,
									this.yo[k2].x2,
									this.yo[k2].y2,
									characterobject.x + 15
								);
								if (i8 >= 0 && i8 + 8 <= characterobject.y && i8 + 47 >= characterobject.y) {
									characterobject.y = i8 + 16;
									characterobject.c = 50;
									characterobject.c1 = 1;
									characterobject.c2 = 20;
								}
								continue;
							}
							if (this.yo[k2].con >= 350 && this.yo[k2].con < 400) {
								var j8 = this.getSHCOY(
									this.yo[k2].x,
									this.yo[k2].y,
									this.yo[k2].x2,
									this.yo[k2].y2,
									characterobject.x + 15
								);
								if (j8 >= 0 && j8 + 8 <= characterobject.y && j8 + 47 >= characterobject.y) {
									characterobject.y = j8 + 16;
									characterobject.c = 50;
									characterobject.c1 = 1;
									characterobject.c2 = 20;
								}
								continue;
							}
							if (this.yo[k2].con >= 400 && this.yo[k2].con < 450) {
								var k8 = this.getSWUpOY(
									this.yo[k2].x,
									this.yo[k2].y,
									this.yo[k2].x2,
									this.yo[k2].y2,
									characterobject.x + 15
								);
								if (k8 >= 0 && k8 + 8 <= characterobject.y && k8 + 47 >= characterobject.y) {
									characterobject.y = k8 + 16;
									characterobject.c = 50;
									characterobject.c1 = 1;
									characterobject.c2 = 20;
								}
								continue;
							}
							if (this.yo[k2].con < 450 || this.yo[k2].con >= 500) continue;
							var l8 = this.getSWDownOY(
								this.yo[k2].x,
								this.yo[k2].y,
								this.yo[k2].x2,
								this.yo[k2].y2,
								characterobject.x + 15
							);
							if (l8 >= 0 && l8 + 8 <= characterobject.y && l8 + 47 >= characterobject.y) {
								characterobject.y = l8 + 16;
								characterobject.c = 50;
								characterobject.c1 = 1;
								characterobject.c2 = 20;
							}
						}
					}
					if (characterobject.c4 == 2) {
						if (
							characterobject.x <= this.maps.wx - 64 ||
							characterobject.x >= this.maps.wx + this.gg.di.width + 32 ||
							characterobject.y <= this.maps.wy - 64 ||
							characterobject.y >= this.maps.wy + this.gg.di.height + 32
						)
							characterobject.c = 0;
					} else if (
						characterobject.x <= this.maps.wx - 64 ||
						characterobject.x >= this.maps.wx + this.gg.di.width + 64 ||
						characterobject.y <= this.maps.wy - 128 ||
						characterobject.y >= this.maps.wy + this.gg.di.height + 64
					)
						characterobject.c = 0;
					characterobject.pt = 137 + this.g_c1;
					if (characterobject.vx < 0) characterobject.pth = 0;
					else characterobject.pth = 1;
					break;
			}
			if (characterobject.c == 0) {
				this.jm_kazu--;
				continue;
			}
			if (characterobject.c < 100) continue;
			for (var l2 = 0; l2 <= this.t_kazu; l2++) {
				if (this.co_t[l2].c < 100) continue;
				var characterobject5 = this.co_t[l2];
				if (
					Math.abs(characterobject.x - characterobject5.x) >= 22 ||
					Math.abs(characterobject.y - characterobject5.y) >= 22
				)
					continue;
				if (characterobject.vx < 0) {
					characterobject5.pth = 1;
					characterobject5.vx = -3;
				} else {
					characterobject5.pth = 0;
					characterobject5.vx = 3;
				}
				if (characterobject5.c >= 1200 && characterobject5.c < 1300) {
					characterobject5.c = 54;
					characterobject5.vy = -25;
				} else if (characterobject5.c >= 1400 && characterobject5.c < 1500) {
					characterobject5.c = 57;
					characterobject5.c1 = 0;
				} else if (characterobject5.c >= 1400 && characterobject5.c < 1500) {
					characterobject5.c = 57;
					characterobject5.c1 = 0;
				} else if (characterobject5.c == 1190) {
					characterobject5.c = 55;
					characterobject5.c1 = 0;
					var j12 = rightShiftIgnoreSign(characterobject5.x, 5);
					var i15 = rightShiftIgnoreSign(characterobject5.y, 5);
					if (characterobject5.c5 == 1) this.onASwitch(j12 - 5, i15 - 5, j12 + 5, i15 + 5);
					else this.onASwitch(j12 - 10, i15 - 10, j12 + 10, i15 + 10);
				} else {
					characterobject5.c = 52;
					characterobject5.vy = -25;
					if (this.j_tokugi == 14 || this.j_tokugi == 15) {
						characterobject5.c = 55;
						characterobject5.c1 = 0;
					}
				}
				this.gs.rsAddSound(9);
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

	/**
	 * 穴掘りモード時の主人公が掘った穴を追加
	 * @param x {number} X座標(マップ座標)
	 * @param y {number} Y座標(マップ座標)
	 */
	anaSet(i: number, j: number) {
		var k = 0;
		do {
			if (k > 11) break;
			if (this.ana_c[k] == 0) {
				this.ana_c[k] = 136;
				this.ana_x[k] = i;
				this.ana_y[k] = j;
				this.ana_kazu++;
				break;
			}
			k++;
		} while (true);
	}

	/**
	 * 穴掘りモード時の主人公が掘った穴を追加 その2(？)
	 * TODO: 要調査
	 * @param x {number} X座標(マップ座標)
	 * @param y {number} Y座標(マップ座標)
	 */
	anaSet2(i: number, j: number) {
		var k = 0;
		do {
			if (k > 11) break;
			if (this.ana_c[k] == 0) {
				this.ana_c[k] = 236;
				this.ana_x[k] = i;
				this.ana_y[k] = j;
				this.ana_kazu++;
				break;
			}
			k++;
		} while (true);
	}

	/**
	 * 主人公の掘った穴の更新処理
	 */
	anaMove() {
		for (var i = 0; i <= 11; i++) {
			if (this.ana_c[i] <= 0) continue;
			this.ana_c[i]--;
			if (this.ana_c[i] == 200) this.ana_c[i] = 100;
			if (this.ana_c[i] > 0) continue;
			this.maps.putBGCode(this.ana_x[i], this.ana_y[i], 20);
			this.ana_kazu--;
			if (
				this.co_j.c >= 100 &&
				this.co_j.c < 200 &&
				this.co_j.x + 15 >= this.ana_x[i] * 32 &&
				this.co_j.x + 15 <= this.ana_x[i] * 32 + 31 &&
				this.co_j.y > this.ana_y[i] * 32 - 32 &&
				this.co_j.y < this.ana_y[i] * 32 + 32
			)
				this.jShinu(1);
			for (var j = 0; j <= this.t_kazu; j++) {
				if (
					this.co_t[j].c < 60 ||
					this.co_t[j].x <= this.ana_x[i] * 32 - 32 ||
					this.co_t[j].x >= this.ana_x[i] * 32 + 32 ||
					this.co_t[j].y <= this.ana_y[i] * 32 - 32 ||
					this.co_t[j].y >= this.ana_y[i] * 32 + 32
				)
					continue;
				if ((this.co_t[j].c >= 1200 && this.co_t[j].c < 1300) || this.co_t[j].c == 60) {
					this.co_t[j].c = 60;
					this.co_t[j].c1 = 0;
				} else {
					this.co_t[j].c = 0;
					this.addScore(10);
				}
				this.gs.rsAddSound(19);
			}
		}
	}

	/**
	 * 指定座標(ピクセル単位)の位置に、指定したコードの仕掛けを設置します
	 * 詳細は {@link https://github.com/Ryo-9399/mc_canvas/wiki/メソッド-MainProgram.prototype.aSet} を参照
	 * @param pixelX {number} X座標(ピクセル単位)
	 * @param pixelY {number} Y座標(ピクセル単位)
	 * @param code {number} 設置する仕掛けのコード
	 * @param argValue {number} 仕掛けに使用する引数
	 * @see {@link https://github.com/Ryo-9399/mc_canvas/wiki/メソッド-MainProgram.prototype.aSet}
	 */
	aSet(i: number, j: number, k: number, l: number) {
		var i1 = 0;
		do {
			if (i1 > this.a_kazu) {
				this.co_a.push(new CharacterObject());
				this.vo_x.push([0, 0, 0, 0]);
				this.vo_y.push([0, 0, 0, 0]);
			}
			if (this.co_a[i1].c <= 0) {
				var characterobject = this.co_a[i1];
				characterobject.c = k;
				characterobject.c1 = l - this.gg.di.width - 32;
				characterobject.c2 = l + 128;
				characterobject.x = i;
				characterobject.y = j;
				switch (k) {
					case 60: // 水草
						characterobject.pt = 200;
						break;

					case 70: // ファイヤーバー（左回り）
						characterobject.vx = -3;
						characterobject.c3 = 0;
						characterobject.c1 = i - this.gg.di.width - 150;
						characterobject.c2 = i + 150;
						break;

					case 71: // ファイヤーバー（右回り）
						characterobject.c = 70;
						characterobject.vx = 3;
						characterobject.c3 = 0;
						characterobject.c1 = i - this.gg.di.width - 150;
						characterobject.c2 = i + 150;
						break;

					case 72: // ファイヤーバー２本またはファイヤーバー３本 左回り １本目
						characterobject.c = 70;
						characterobject.vx = -2;
						characterobject.c3 = 0;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 73: // ファイヤーバー２本 ２本目　またはファイヤーバー３本 右回り　１本目
						characterobject.c = 70;
						characterobject.vx = 2;
						characterobject.c3 = 0;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 74: // ファイヤーバー３本 左回り ２本目
						characterobject.c = 70;
						characterobject.vx = -2;
						characterobject.c3 = 120;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 75: // ファイヤーバー３本 右回り ２本目
						characterobject.c = 70;
						characterobject.vx = 2;
						characterobject.c3 = 120;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 76: // ファイヤーバー３本 左回り ３本目
						characterobject.c = 70;
						characterobject.vx = -2;
						characterobject.c3 = 240;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 77: // ファイヤーバー３本 右回り ３本目
						characterobject.c = 70;
						characterobject.vx = 2;
						characterobject.c3 = 240;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 78: // スウィングファイヤーバー 左
						characterobject.c = 70;
						characterobject.vx = 2;
						characterobject.c3 = 160;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						characterobject.c4 = 2;
						break;

					case 79: // スウィングファイヤーバー 右
						characterobject.c = 70;
						characterobject.vx = -2;
						characterobject.c3 = 380;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						characterobject.c4 = 3;
						break;

					case 80: // 一言メッセージ1
						characterobject.pt = 800;
						characterobject.c3 = 1;
						break;

					case 81: // 一言メッセージ2
						characterobject.c = 80;
						characterobject.pt = 800;
						characterobject.c3 = 2;
						break;

					case 82: // 一言メッセージ3
						characterobject.c = 80;
						characterobject.pt = 800;
						characterobject.c3 = 3;
						break;

					case 83: // 一言メッセージ4
						characterobject.c = 80;
						characterobject.pt = 800;
						characterobject.c3 = 4;
						break;

					case 85: // 隠しブロック
						characterobject.c = 85;
						characterobject.pt = 850;
						break;

					case 86: // お店
						characterobject.c = 86;
						characterobject.pt = 860;
						break;

					case 87: // ヘルメットかドリルをくれる人
						characterobject.c = 87;
						characterobject.pt = 860;
						break;

					case 88: // グレネードかジェットをくれる人
						characterobject.c = 88;
						characterobject.pt = 860;
						break;

					case 89: // ファイヤーボールセレクトの人
						characterobject.c = 89;
						characterobject.pt = 860;
						break;

					case 90: // シーソー
						characterobject.x = i + 16;
						characterobject.y = j;
						characterobject.pt = 1200;
						characterobject.vy = 0;
						characterobject.c = 90;
						characterobject.c1 = l - this.gg.di.width - 32 - 256;
						characterobject.c2 = l + 128 + 256;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 91: // シーソー 左が下
						characterobject.x = i + 16;
						characterobject.y = j;
						characterobject.pt = 1200;
						characterobject.vy = -56;
						characterobject.c = 90;
						characterobject.c1 = l - this.gg.di.width - 32 - 256;
						characterobject.c2 = l + 128 + 256;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 92: // シーソー 右が下
						characterobject.x = i + 16;
						characterobject.y = j;
						characterobject.pt = 1200;
						characterobject.vy = 56;
						characterobject.c = 90;
						characterobject.c1 = l - this.gg.di.width - 32 - 256;
						characterobject.c2 = l + 128 + 256;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 93: // ブランコ　ブランコ ２個連続 １個目
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 1300;
						characterobject.vy = 90;
						characterobject.vx = 30;
						characterobject.c = 93;
						characterobject.c1 = l - this.gg.di.width - 32 - 256;
						characterobject.c2 = l + 128 + 256 + 384;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 94: // ブランコ ２個連続 ２個目
						characterobject.x = i + 16 + 384;
						characterobject.y = j + 16;
						characterobject.pt = 1300;
						characterobject.vy = 90;
						characterobject.vx = -30;
						characterobject.c = 93;
						characterobject.c1 = l - this.gg.di.width - 32 - 256;
						characterobject.c2 = l + 128 + 256 + 384;
						characterobject.c3 = 0;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 95: // スウィングバー 左
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 1400;
						characterobject.c3 = 1;
						characterobject.vy = 180;
						characterobject.vx = -26;
						characterobject.c = 95;
						characterobject.c1 = l - this.gg.di.width - 32 - 256;
						characterobject.c2 = l + 128 + 256;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 96: // スウィングバー 右
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 1400;
						characterobject.c3 = 2;
						characterobject.vy = 360;
						characterobject.vx = 26;
						characterobject.c = 95;
						characterobject.c1 = l - this.gg.di.width - 32 - 256;
						characterobject.c2 = l + 128 + 256;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 100: // 動く床（上下移動）
						characterobject.vy = 5;
						characterobject.x = i + 8;
						characterobject.y = j - 212;
						characterobject.c3 = j - 212;
						characterobject.c4 = j + 2;
						characterobject.pt = 100;
						break;

					case 101:
						characterobject.c = 100;
						characterobject.vy = 5;
						characterobject.x = i + 8;
						characterobject.y = j - 212;
						characterobject.c3 = j - 212;
						characterobject.c4 = j + 2;
						characterobject.pt = 100;
						characterobject.c1 = 0;
						characterobject.c2 = 6400;
						break;

					case 110: // 動く床（左右移動）
						characterobject.vx = -3;
						characterobject.x = i + 208;
						characterobject.c3 = i;
						characterobject.c4 = i + 208;
						characterobject.pt = 100;
						characterobject.c2 = l + 208 + 128 + 32;
						if (this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) {
							characterobject.c3 = i + 4;
							characterobject.c4 = i + 208 - 6;
						}
						break;

					case 111:
						characterobject.c = 110;
						characterobject.vx = -3;
						characterobject.x = i + 208;
						characterobject.c3 = i;
						characterobject.c4 = i + 208;
						characterobject.pt = 100;
						characterobject.c1 = 0;
						characterobject.c2 = 6400;
						if (this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) {
							characterobject.c3 = i + 4;
							characterobject.c4 = i + 208 - 6;
						}
						break;

					case 115: // 動く床（左右移動×2）左側
						characterobject.c = 110;
						characterobject.vx = -3;
						characterobject.x = i + 208;
						characterobject.c3 = i;
						characterobject.c4 = i + 208;
						characterobject.pt = 100;
						characterobject.c2 = l + 208 + 128 + 342 + 32;
						if (this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) {
							characterobject.c3 = i + 4;
							characterobject.c4 = i + 208 - 6;
						}
						break;

					case 116: // 動く床（左右移動×2）右側
						characterobject.c = 110;
						characterobject.vx = 3;
						characterobject.x = i + 320;
						characterobject.c3 = i + 320;
						characterobject.c4 = i + 208 + 320;
						characterobject.pt = 100;
						characterobject.c2 = l + 208 + 128 + 320 + 32;
						if (this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) {
							characterobject.c3 = i + 320 + 6;
							characterobject.c4 = i + 208 + 320 - 4;
						}
						break;

					case 120: // 動く床 左回り
						characterobject.vx = i + 160;
						characterobject.vy = j;
						characterobject.x = i + 8;
						characterobject.y = j;
						characterobject.c3 = 0;
						characterobject.muki = 1;
						characterobject.c1 = characterobject.vx - this.gg.di.width - 32 - 130;
						characterobject.c2 = characterobject.vx + 128 + 130;
						characterobject.pt = 100;
						break;

					case 121: // 動く床 右回り
						characterobject.c = 120;
						characterobject.vx = i + 160;
						characterobject.vy = j;
						characterobject.x = i + 8;
						characterobject.y = j;
						characterobject.c3 = 0;
						characterobject.muki = 0;
						characterobject.c1 = characterobject.vx - this.gg.di.width - 32 - 130;
						characterobject.c2 = characterobject.vx + 128 + 130;
						characterobject.pt = 100;
						break;

					case 150: // スイッチ式動く床 ＯＮで上
						characterobject.vx = i;
						characterobject.vy = j;
						characterobject.x = characterobject.vx + 8;
						characterobject.y = characterobject.vy + 8;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.pt = 100;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 151: // スイッチ式動く床 ＯＮで下
						characterobject.c = 150;
						characterobject.vx = i;
						characterobject.vy = j;
						characterobject.x = characterobject.vx + 8;
						characterobject.y = characterobject.vy + 8;
						characterobject.c3 = 0;
						characterobject.c4 = 1;
						characterobject.pt = 100;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 152: // スイッチ式長く動く床 ＯＮで上
						characterobject.c = 150;
						characterobject.vx = i;
						characterobject.vy = j;
						characterobject.x = characterobject.vx + 8;
						characterobject.y = characterobject.vy + 8;
						characterobject.c3 = 0;
						characterobject.c4 = 2;
						characterobject.pt = 100;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 160: // スイッチ式動く床 ＯＮで右
						characterobject.vx = i;
						characterobject.vy = j;
						characterobject.x = characterobject.vx + 8;
						characterobject.y = characterobject.vy + 8;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.pt = 100;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 161: // スイッチ式動く床 ＯＮで左
						characterobject.c = 160;
						characterobject.vx = i;
						characterobject.vy = j;
						characterobject.x = characterobject.vx + 8;
						characterobject.y = characterobject.vy + 8;
						characterobject.c3 = 0;
						characterobject.c4 = 1;
						characterobject.pt = 100;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 162: // スイッチ式長く動く床 ＯＮで右
						characterobject.c = 160;
						characterobject.vx = i;
						characterobject.vy = j;
						characterobject.x = characterobject.vx + 8;
						characterobject.y = characterobject.vy + 8;
						characterobject.c3 = 0;
						characterobject.c4 = 2;
						characterobject.pt = 100;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 300: // リンク土管1
						characterobject.pt = 300;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						break;

					case 310: // リンク土管2
						characterobject.c = 300;
						characterobject.pt = 310;
						characterobject.c3 = 1;
						characterobject.c4 = 0;
						break;

					case 320: // リンク土管3
						characterobject.c = 300;
						characterobject.pt = 320;
						characterobject.c3 = 2;
						characterobject.c4 = 0;
						break;

					case 330: // リンク土管4
						characterobject.c = 300;
						characterobject.pt = 330;
						characterobject.c3 = 3;
						characterobject.c4 = 0;
						break;

					case 350: // 下向きワープ土管１
						characterobject.c = 300;
						characterobject.pt = 300;
						characterobject.c3 = 100;
						characterobject.c4 = 0;
						characterobject.c5 = 0;
						break;

					case 351: // 下向きワープ土管２
						characterobject.c = 300;
						characterobject.pt = 310;
						characterobject.c3 = 101;
						characterobject.c4 = 0;
						characterobject.c5 = 0;
						break;

					case 352: // 下向きワープ土管３
						characterobject.c = 300;
						characterobject.pt = 320;
						characterobject.c3 = 102;
						characterobject.c4 = 0;
						characterobject.c5 = 0;
						break;

					case 353: // 下向きワープ土管４
						characterobject.c = 300;
						characterobject.pt = 330;
						characterobject.c3 = 103;
						characterobject.c4 = 0;
						characterobject.c5 = 0;
						break;

					case 360: // 下向き土管１ 上向き１につながる
						characterobject.c = 300;
						characterobject.pt = 300;
						characterobject.c3 = 100;
						characterobject.c4 = 0;
						characterobject.c5 = 1;
						break;

					case 361: // 下向き土管２ 上向き２につながる
						characterobject.c = 300;
						characterobject.pt = 310;
						characterobject.c3 = 101;
						characterobject.c4 = 0;
						characterobject.c5 = 1;
						break;

					case 362: // 下向き土管３ 上向き３につながる
						characterobject.c = 300;
						characterobject.pt = 320;
						characterobject.c3 = 102;
						characterobject.c4 = 0;
						characterobject.c5 = 1;
						break;

					case 363: // 下向き土管４ 上向き４につながる
						characterobject.c = 300;
						characterobject.pt = 330;
						characterobject.c3 = 103;
						characterobject.c4 = 0;
						characterobject.c5 = 1;
						break;

					case 370: // 左向き土管１ 左右１につながる
						characterobject.c = 300;
						characterobject.pt = 300;
						characterobject.c3 = 200;
						characterobject.c4 = 0;
						break;

					case 371: // 左向き土管２ 左右２につながる
						characterobject.c = 300;
						characterobject.pt = 310;
						characterobject.c3 = 201;
						characterobject.c4 = 0;
						break;

					case 372: // 左向き土管３ 左右３につながる
						characterobject.c = 300;
						characterobject.pt = 320;
						characterobject.c3 = 202;
						characterobject.c4 = 0;
						break;

					case 373: // 左向き土管４ 左右４につながる
						characterobject.c = 300;
						characterobject.pt = 330;
						characterobject.c3 = 203;
						characterobject.c4 = 0;
						break;

					case 380: // 右向き土管１ 左右１につながる
						characterobject.c = 300;
						characterobject.pt = 300;
						characterobject.c3 = 300;
						characterobject.c4 = 0;
						break;

					case 381: // 右向き土管２ 左右２につながる
						characterobject.c = 300;
						characterobject.pt = 310;
						characterobject.c3 = 301;
						characterobject.c4 = 0;
						break;

					case 382: // 右向き土管３ 左右３につながる
						characterobject.c = 300;
						characterobject.pt = 320;
						characterobject.c3 = 302;
						characterobject.c4 = 0;
						break;

					case 383: // 右向き土管４ 左右４につながる
						characterobject.c = 300;
						characterobject.pt = 330;
						characterobject.c3 = 303;
						characterobject.c4 = 0;
						break;

					case 400: // ドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.vy = j;
						break;

					case 410: // 上ドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 1;
						characterobject.vy = j;
						break;

					case 420: // 左ドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 2;
						characterobject.vx = i;
						characterobject.c = 410;
						characterobject.c1 = l - this.gg.di.width - 32 - 256;
						characterobject.c2 = l + 128;
						break;

					case 430: // 右ドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 3;
						characterobject.vx = i;
						characterobject.c = 410;
						characterobject.c1 = l - this.gg.di.width - 32;
						characterobject.c2 = l + 128 + 256;
						break;

					case 440: // 跳ねるドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 4;
						characterobject.vx = -3;
						characterobject.vy = 0;
						characterobject.c = 410;
						break;

					case 450: // 上がらないドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 5;
						characterobject.c = 410;
						break;

					case 460: // エレベータードッスンスン 上
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 6;
						characterobject.vy = j;
						characterobject.c = 410;
						break;

					case 470: // エレベータードッスンスン 下
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 7;
						characterobject.vy = j;
						characterobject.c = 410;
						break;

					case 480: // 上下ドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 8;
						characterobject.vy = j;
						characterobject.c = 410;
						break;

					case 481: // 左右ドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 9;
						characterobject.vx = i;
						characterobject.c = 410;
						characterobject.c1 = l - this.gg.di.width - 32 - 256;
						characterobject.c2 = l + 128 + 256;
						break;

					case 482: // ロングレンジドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 10;
						characterobject.vy = j;
						characterobject.c = 410;
						break;

					case 485: // 壁まで上下移動するドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 11;
						characterobject.vy = j;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c = 410;
						break;

					case 486: // 壁まで左右移動するドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 12;
						characterobject.vx = i;
						characterobject.c = 410;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 487: // 乗ると左右移動するドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 13;
						characterobject.vx = i;
						characterobject.c = 410;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 488: // 動かないドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 14;
						characterobject.vy = j;
						characterobject.c = 410;
						break;

					case 489: // 落ちるだけのドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 15;
						characterobject.vy = j;
						characterobject.c = 410;
						break;

					case 490: // 左右へ押せるドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 16;
						characterobject.vy = j;
						characterobject.vx = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c = 410;
						break;

					case 491: // 上へ押せるドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 17;
						characterobject.vy = j;
						characterobject.c = 410;
						break;

					case 492: // その場で跳ねるドッスンスン
						characterobject.pt = 400;
						characterobject.c3 = 0;
						characterobject.c4 = 18;
						characterobject.vx = 0;
						characterobject.vy = 0;
						characterobject.c = 410;
						break;

					case 500: // 乗ると落ちる
						characterobject.vy = 0;
						characterobject.x = i;
						characterobject.y = j;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.pt = 500;
						break;

					case 510: // ずっと乗っていると落ちる
						characterobject.c = 500;
						characterobject.vy = 0;
						characterobject.x = i;
						characterobject.y = j;
						characterobject.c3 = 0;
						characterobject.c4 = 1;
						characterobject.pt = 500;
						break;

					case 600: // 乗れるカイオール
						characterobject.pt = 600;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.vx = 0;
						characterobject.vy = j;
						break;

					case 610: // 乗れるカイオール 方向キーで移動
						characterobject.pt = 600;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.vx = 0;
						characterobject.vy = j;
						break;

					case 700: // ジャンプ台
						characterobject.pt = 700;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						break;

					case 701: // 高性能ジャンプ台
						characterobject.c = 700;
						characterobject.pt = 700;
						characterobject.c3 = 0;
						characterobject.c4 = 1;
						break;

					case 750: // 左へ飛ばすバネ
						characterobject.c = 700;
						characterobject.pt = 750;
						characterobject.c3 = 0;
						characterobject.c4 = 2;
						break;

					case 751: // 右へ飛ばすバネ
						characterobject.c = 700;
						characterobject.pt = 751;
						characterobject.c3 = 0;
						characterobject.c4 = 3;
						break;

					case 1000: // ファイヤーウォール 上へ伸びる
						characterobject.vx = 18;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.c1 = i - this.gg.di.width - 150;
						characterobject.c2 = i + 150;
						break;

					case 1001: // ファイヤーウォール 下へ伸びる
						characterobject.c = 1000;
						characterobject.vx = 18;
						characterobject.c3 = 1;
						characterobject.c4 = 0;
						characterobject.c1 = i - this.gg.di.width - 150;
						characterobject.c2 = i + 150;
						break;

					case 1002: // ファイヤーウォール 左へ伸びる
						characterobject.c = 1000;
						characterobject.vx = 18;
						characterobject.c3 = 2;
						characterobject.c4 = 0;
						characterobject.c1 = i - this.gg.di.width - 224;
						characterobject.c2 = i + 224;
						break;

					case 1003: // ファイヤーウォール 右へ伸びる
						characterobject.c = 1000;
						characterobject.vx = 18;
						characterobject.c3 = 3;
						characterobject.c4 = 0;
						characterobject.c1 = i - this.gg.di.width - 224;
						characterobject.c2 = i + 224;
						break;

					case 1005: // ファイヤーウォール 上へ速射
						characterobject.c = 1000;
						characterobject.vx = 18;
						characterobject.c3 = 10;
						characterobject.c4 = 0;
						characterobject.c1 = i - this.gg.di.width - 150;
						characterobject.c2 = i + 150;
						break;

					case 1006: // ファイヤーウォール 下へ速射
						characterobject.c = 1000;
						characterobject.vx = 18;
						characterobject.c3 = 11;
						characterobject.c4 = 0;
						characterobject.c1 = i - this.gg.di.width - 150;
						characterobject.c2 = i + 150;
						break;

					case 1007: // ファイヤーウォール 左へ速射
						characterobject.c = 1000;
						characterobject.vx = 18;
						characterobject.c3 = 12;
						characterobject.c4 = 0;
						characterobject.c1 = i - this.gg.di.width - 224;
						characterobject.c2 = i + 224;
						break;

					case 1008: // ファイヤーウォール 右へ速射
						characterobject.c = 1000;
						characterobject.vx = 18;
						characterobject.c3 = 13;
						characterobject.c4 = 0;
						characterobject.c1 = i - this.gg.di.width - 224;
						characterobject.c2 = i + 224;
						break;

					case 1010: // ファイヤーウォール 壁まで上下
						characterobject.vx = 0;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.c1 = i - this.gg.di.width - 150;
						characterobject.c2 = i + 150;
						break;

					case 1020: // ファイヤーウォール 壁まで左右
						characterobject.vx = 0;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 1100: // 火山
						characterobject.vx = 0;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.c1 = i - this.gg.di.width - 150;
						characterobject.c2 = i + 150;
						break;

					case 1150: // 逆火山
						characterobject.vx = 0;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.c1 = i - this.gg.di.width - 150;
						characterobject.c2 = i + 150;
						break;

					case 1200: // 動くＴ字型　動くＴ字型 ２個連続 １個目
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 1900;
						characterobject.vy = 270;
						characterobject.vx = -30;
						characterobject.c = 1200;
						characterobject.c1 = l - this.gg.di.width - 32 - 256;
						characterobject.c2 = l + 128 + 256 + 416;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 1201: // 動くＴ字型 ２個連続 ２個目
						characterobject.x = i + 16 + 416;
						characterobject.y = j + 16;
						characterobject.pt = 1900;
						characterobject.vy = 270;
						characterobject.vx = 30;
						characterobject.c = 1200;
						characterobject.c1 = l - this.gg.di.width - 32 - 256;
						characterobject.c2 = l + 128 + 256 + 416;
						characterobject.c3 = 0;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 1300: // ロープ　ロープ ２本連続 １本目
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 2000;
						characterobject.vy = 90;
						characterobject.vx = 30;
						characterobject.c = 1300;
						characterobject.c1 = l - this.gg.di.width - 32 - 256;
						characterobject.c2 = l + 128 + 256 + 416;
						break;

					case 1301: // ロープ ２本連続 ２本目
						characterobject.x = i + 16 + 320;
						characterobject.y = j + 16;
						characterobject.pt = 2000;
						characterobject.vy = 90;
						characterobject.vx = -30;
						characterobject.c = 1300;
						characterobject.c1 = l - this.gg.di.width - 32 - 256;
						characterobject.c2 = l + 128 + 256 + 416;
						break;

					case 1400: // 得点で開く扉
						characterobject.pt = 2100;
						characterobject.c3 = 0;
						characterobject.c4 = 1;
						break;

					case 1401: // コインを全部取ると開く扉
						characterobject.c = 1400;
						characterobject.pt = 2110;
						characterobject.c3 = 0;
						characterobject.c4 = 2;
						break;

					case 1402: // 周囲１０パーツ以内のコインを全部取ると開く扉
						characterobject.c = 1400;
						characterobject.pt = 2120;
						characterobject.c3 = 0;
						characterobject.c4 = 3;
						break;

					case 1403: // 左１５パーツ以内の雑魚敵を全部倒すと開く扉
						characterobject.c = 1400;
						characterobject.pt = 2130;
						characterobject.c3 = 0;
						characterobject.c4 = 4;
						break;

					case 1500: // 人間大砲 右向き
						characterobject.pt = 2200;
						characterobject.y = j - 12;
						characterobject.c3 = 0;
						characterobject.c4 = 330;
						characterobject.vx = 0;
						characterobject.vy = j;
						characterobject.c1 = i - this.gg.di.width - 224;
						characterobject.c2 = i + 224;
						break;

					case 1501: // 人間大砲 左向き
						characterobject.c = 1500;
						characterobject.pt = 2200;
						characterobject.y = j - 12;
						characterobject.c3 = 1;
						characterobject.c4 = 225;
						characterobject.vx = 0;
						characterobject.vy = j;
						characterobject.c1 = i - this.gg.di.width - 224;
						characterobject.c2 = i + 224;
						break;

					case 1502: // 人間大砲 天井
						characterobject.c = 1500;
						characterobject.pt = 2200;
						characterobject.c3 = 2;
						characterobject.c4 = 30;
						characterobject.vx = 0;
						characterobject.vy = j;
						characterobject.c1 = i - this.gg.di.width - 224;
						characterobject.c2 = i + 224;
						break;

					case 1503: // 人間大砲 右の壁
						characterobject.c = 1500;
						characterobject.pt = 2200;
						characterobject.c3 = 3;
						characterobject.c4 = 270;
						characterobject.vx = 0;
						characterobject.vy = j;
						characterobject.c1 = i - this.gg.di.width - 224;
						characterobject.c2 = i + 224;
						break;

					case 1504: // 人間大砲 左の壁
						characterobject.c = 1500;
						characterobject.pt = 2200;
						characterobject.c3 = 4;
						characterobject.c4 = 300;
						characterobject.vx = 0;
						characterobject.vy = j;
						characterobject.c1 = i - this.gg.di.width - 224;
						characterobject.c2 = i + 224;
						break;

					case 1600: // スポット処理 小
						characterobject.pt = 2300;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						break;

					case 1601: // スポット処理 中
						characterobject.c = 1600;
						characterobject.pt = 2300;
						characterobject.c3 = 0;
						characterobject.c4 = 1;
						break;

					case 1602: // スポット処理 大
						characterobject.c = 1600;
						characterobject.pt = 2300;
						characterobject.c3 = 0;
						characterobject.c4 = 2;
						break;

					case 1603: // スポット処理 終了
						characterobject.c = 1600;
						characterobject.pt = 2300;
						characterobject.c3 = 0;
						characterobject.c4 = 3;
						break;

					case 1700: // 人食いワカメ 上へ拡大縮小
						characterobject.pt = 2400;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.vy = 100;
						characterobject.c1 = i - this.gg.di.width - 192;
						characterobject.c2 = i + 192;
						break;

					case 1701: // 人食いワカメ 下へ拡大縮小
						characterobject.c = 1700;
						characterobject.pt = 2400;
						characterobject.c3 = 1;
						characterobject.c4 = 0;
						characterobject.vy = 100;
						characterobject.c1 = i - this.gg.di.width - 192;
						characterobject.c2 = i + 192;
						break;

					case 1702: // 人食いワカメ 中央から拡大縮小
						characterobject.c = 1700;
						characterobject.pt = 2400;
						characterobject.c3 = 2;
						characterobject.c4 = 0;
						characterobject.vy = 100;
						characterobject.c1 = i - this.gg.di.width - 192;
						characterobject.c2 = i + 192;
						break;

					case 1800: // 回転するドッスンスン 左回り
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 2500;
						characterobject.vy = 0;
						characterobject.vx = -3;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c3 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c3), "0", "0", "0", "0");
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "0", "0", "0", "0");
						characterobject.c5 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c5), "0", "0", "0", "0");
						characterobject.pth = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.pth), "0", "0", "0", "0");
						break;

					case 1801: // 回転するドッスンスン 右回り
						characterobject.c = 1800;
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 2500;
						characterobject.vy = 0;
						characterobject.vx = 3;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c3 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c3), "0", "0", "0", "0");
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "0", "0", "0", "0");
						characterobject.c5 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c5), "0", "0", "0", "0");
						characterobject.pth = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.pth), "0", "0", "0", "0");
						break;

					case 1850: // 回転する巨大ドッスンスン 左回り
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 2600;
						characterobject.vy = 0;
						characterobject.vx = -2;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c3 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c3), "0", "0", "0", "0");
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "0", "0", "0", "0");
						characterobject.c5 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c5), "0", "0", "0", "0");
						characterobject.pth = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.pth), "0", "0", "0", "0");
						break;

					case 1851: // 回転する巨大ドッスンスン 右回り
						characterobject.c = 1850;
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 2600;
						characterobject.vy = 0;
						characterobject.vx = 2;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c3 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c3), "0", "0", "0", "0");
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "0", "0", "0", "0");
						characterobject.c5 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c5), "0", "0", "0", "0");
						characterobject.pth = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.pth), "0", "0", "0", "0");
						break;

					case 1900: // 画面内で右強制スクロール
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 1901: // 画面内で左強制スクロール
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 1;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 1902: // 画面内で上強制スクロール
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 2;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 1903: // 画面内で下強制スクロール
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 3;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 1904: // 画面内で右上強制スクロール
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 4;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 1905: // 画面内で右下強制スクロール
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 5;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 1906: // 画面内で左上強制スクロール
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 6;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 1907: // 画面内で左下強制スクロール
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 7;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 1908: // スクロールスピードアップ
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 8;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 1909: // スクロールスピードダウン
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 9;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 1910: // 画面内で全方向スクロール
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 10;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 1911: // 画面内でスクロール停止
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 11;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 1912: // 自分が重なると右強制スクロール
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 12;
						characterobject.c4 = 0;
						characterobject.c1 = i - this.gg.di.width - 150;
						characterobject.c2 = i + 150;
						break;

					case 1913: // 自分が重なると上強制スクロール
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 13;
						characterobject.c4 = 0;
						characterobject.c1 = i - this.gg.di.width - 150;
						characterobject.c2 = i + 150;
						break;

					case 1914: // 自分が重なると全方向スクロール
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 14;
						characterobject.c4 = 0;
						characterobject.c1 = i - this.gg.di.width - 150;
						characterobject.c2 = i + 150;
						break;

					case 1915: // 画面内で横固定縦自由スクロール
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 15;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 1916: // 画面内で右強制縦自由スクロール
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 16;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 1917: // 画面内で左進行用の視界
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 17;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 1918: // 画面内で右進行用の視界
						characterobject.c = 1900;
						characterobject.pt = 2300;
						characterobject.c3 = 18;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2000: // 曲線による上り坂
						characterobject.c = 2000;
						characterobject.pt = 2700;
						characterobject.x = i;
						characterobject.y = j;
						characterobject.c1 = l - this.gg.di.width - 32;
						characterobject.c2 = l + 256;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"0",
							"0",
							"wave_up"
						);
						this.setYukaColor(characterobject.c4, this.gamecolor_firebar2);
						break;

					case 2001: // 曲線による下り坂
						characterobject.c = 2000;
						characterobject.pt = 2700;
						characterobject.x = i;
						characterobject.y = j;
						characterobject.c1 = l - this.gg.di.width - 32;
						characterobject.c2 = l + 256;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"0",
							"0",
							"wave_down"
						);
						this.setYukaColor(characterobject.c4, this.gamecolor_firebar2);
						break;

					case 2002: // 曲線による上り坂 線のみ
						characterobject.c = 2000;
						characterobject.pt = 2700;
						characterobject.x = i;
						characterobject.y = j;
						characterobject.c1 = l - this.gg.di.width - 32;
						characterobject.c2 = l + 256;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"0",
							"0",
							"wave_up_line"
						);
						this.setYukaColor(characterobject.c4, this.gamecolor_firebar2);
						break;

					case 2003: // 曲線による下り坂 線のみ
						characterobject.c = 2000;
						characterobject.pt = 2700;
						characterobject.x = i;
						characterobject.y = j;
						characterobject.c1 = l - this.gg.di.width - 32;
						characterobject.c2 = l + 256;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"0",
							"0",
							"wave_down_line"
						);
						this.setYukaColor(characterobject.c4, this.gamecolor_firebar2);
						break;

					case 2010: // 乗れる円
						characterobject.c = 2000;
						characterobject.pt = 2700;
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.c1 = l - this.gg.di.width - 32;
						characterobject.c2 = l + 256;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"96",
							"0",
							"circle"
						);
						this.setYukaColor(characterobject.c4, this.gamecolor_firebar2);
						break;

					case 2011: // 乗れる円 大
						characterobject.c = 2000;
						characterobject.pt = 2700;
						characterobject.x = i;
						characterobject.y = j + 16;
						characterobject.c1 = l - this.gg.di.width - 32;
						characterobject.c2 = l + 256;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"144",
							"0",
							"circle"
						);
						this.setYukaColor(characterobject.c4, this.gamecolor_firebar2);
						break;

					case 2020: // 乗れる半円
						characterobject.c = 2000;
						characterobject.pt = 2700;
						characterobject.x = i;
						characterobject.y = j;
						characterobject.c1 = l - this.gg.di.width - 32;
						characterobject.c2 = l + 256;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"0",
							"0",
							"half_circle"
						);
						this.setYukaColor(characterobject.c4, this.gamecolor_firebar2);
						break;

					case 2021: // 乗れる半円 線のみ
						characterobject.c = 2000;
						characterobject.pt = 2700;
						characterobject.x = i;
						characterobject.y = j;
						characterobject.c1 = l - this.gg.di.width - 32;
						characterobject.c2 = l + 256;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"0",
							"0",
							"half_circle_line"
						);
						this.setYukaColor(characterobject.c4, this.gamecolor_firebar2);
						break;

					case 2100: // 人口太陽 中心
						characterobject.c = 2100;
						characterobject.pt = 2800;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 2110: // 人口太陽 棒５本 左回り 棒１本目
						characterobject.c = 70;
						characterobject.vx = -2;
						characterobject.c3 = 0;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 2111: // 人口太陽 棒５本 左回り 棒２本目
						characterobject.c = 70;
						characterobject.vx = -2;
						characterobject.c3 = 72;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 2112: // 人口太陽 棒５本 左回り 棒３本目
						characterobject.c = 70;
						characterobject.vx = -2;
						characterobject.c3 = 144;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 2113: // 人口太陽 棒５本 左回り 棒４本目
						characterobject.c = 70;
						characterobject.vx = -2;
						characterobject.c3 = 216;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 2114: // 人口太陽 棒５本 左回り 棒５本目
						characterobject.c = 70;
						characterobject.vx = -2;
						characterobject.c3 = 288;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 2120: // 人口太陽 棒５本 右回り 棒１本目
						characterobject.c = 70;
						characterobject.vx = 2;
						characterobject.c3 = 0;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 2121: // 人口太陽 棒５本 右回り 棒２本目
						characterobject.c = 70;
						characterobject.vx = 2;
						characterobject.c3 = 72;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 2122: // 人口太陽 棒５本 右回り 棒３本目
						characterobject.c = 70;
						characterobject.vx = 2;
						characterobject.c3 = 144;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 2123: // 人口太陽 棒５本 右回り 棒４本目
						characterobject.c = 70;
						characterobject.vx = 2;
						characterobject.c3 = 216;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 2124: // 人口太陽 棒５本 右回り 棒５本目
						characterobject.c = 70;
						characterobject.vx = 2;
						characterobject.c3 = 288;
						characterobject.c1 = i - this.gg.di.width - 190;
						characterobject.c2 = i + 190;
						break;

					case 2200: // ファイヤーリング 左回り パーツ１
						characterobject.c = 2200;
						characterobject.vx = -2;
						characterobject.c3 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2201: // ファイヤーリング 左回り パーツ２
						characterobject.c = 2200;
						characterobject.vx = -2;
						characterobject.c3 = 120;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2202: // ファイヤーリング 左回り パーツ３
						characterobject.c = 2200;
						characterobject.vx = -2;
						characterobject.c3 = 240;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2210: // ファイヤーリング 右回り パーツ１
						characterobject.c = 2200;
						characterobject.vx = 2;
						characterobject.c3 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2211: // ファイヤーリング 右回り パーツ２
						characterobject.c = 2200;
						characterobject.vx = 2;
						characterobject.c3 = 120;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2212: // ファイヤーリング 右回り パーツ３
						characterobject.c = 2200;
						characterobject.vx = 2;
						characterobject.c3 = 240;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2250: // ファイヤーリング２本 左回り １本目
						characterobject.c = 2250;
						characterobject.vx = -2;
						characterobject.c3 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2251: // ファイヤーリング２本 左回り ２本目
						characterobject.c = 2250;
						characterobject.vx = -2;
						characterobject.c3 = 180;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2252: // ファイヤーリング２本 高速左回り １本目
						characterobject.c = 2250;
						characterobject.vx = -4;
						characterobject.c3 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2253: // ファイヤーリング２本 高速左回り ２本目
						characterobject.c = 2250;
						characterobject.vx = -4;
						characterobject.c3 = 180;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2260: // ファイヤーリング２本 右回り １本目
						characterobject.c = 2250;
						characterobject.vx = 2;
						characterobject.c3 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2261: // ファイヤーリング２本 右回り ２本目
						characterobject.c = 2250;
						characterobject.vx = 2;
						characterobject.c3 = 180;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2262: // ファイヤーリング２本 高速右回り １本目
						characterobject.c = 2250;
						characterobject.vx = 4;
						characterobject.c3 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2263: // ファイヤーリング２本 高速右回り ２本目
						characterobject.c = 2250;
						characterobject.vx = 4;
						characterobject.c3 = 180;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2300: // 上下移動する半円 下から
						characterobject.c = 2300;
						characterobject.pt = 3000;
						characterobject.x = i;
						characterobject.y = j;
						characterobject.c3 = characterobject.y;
						characterobject.vy = -4;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"0",
							"0",
							"half_circle"
						);
						this.setYukaColor(characterobject.c4, this.gamecolor_firebar2);
						break;

					case 2301: // 上下移動する半円 上から
						characterobject.c = 2300;
						characterobject.pt = 3000;
						characterobject.x = i;
						characterobject.y = j - 160;
						characterobject.c3 = j;
						characterobject.vy = 4;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"0",
							"0",
							"half_circle"
						);
						this.setYukaColor(characterobject.c4, this.gamecolor_firebar2);
						break;

					case 2400: // 乗ると上がる半円
						characterobject.c = 2400;
						characterobject.pt = 3000;
						characterobject.x = i;
						characterobject.y = j;
						characterobject.c3 = j;
						characterobject.vy = 4;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"0",
							"0",
							"half_circle"
						);
						this.setYukaColor(characterobject.c4, this.gamecolor_firebar2);
						break;

					case 2500: // 乗ると下がる半円
						characterobject.c = 2500;
						characterobject.pt = 3000;
						characterobject.x = i;
						characterobject.y = j - 160;
						characterobject.c3 = j;
						characterobject.vy = 4;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"0",
							"0",
							"half_circle"
						);
						this.setYukaColor(characterobject.c4, this.gamecolor_firebar2);
						break;

					case 2510: // 柱付きの半円
						characterobject.c = 2500;
						characterobject.pt = 3000;
						characterobject.x = i;
						characterobject.y = j;
						characterobject.c3 = j;
						characterobject.vy = 4;
						characterobject.c5 = 1000;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"0",
							"0",
							"half_circle"
						);
						this.setYukaColor(characterobject.c4, this.gamecolor_firebar2);
						break;

					case 2600: // 乗ると下がる円
						characterobject.c = 2600;
						characterobject.pt = 2700;
						characterobject.x = i;
						characterobject.y = j + 16;
						characterobject.c3 = j + 16;
						characterobject.vy = 4;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"80",
							"0",
							"circle"
						);
						this.setYukaColor(
							characterobject.c4,
							new Color(
								this.gamecolor_mizunohadou.getRed(),
								this.gamecolor_mizunohadou.getGreen(),
								this.gamecolor_mizunohadou.getBlue(),
								176
							)
						);
						break;

					case 2610: // 乗ると下がる円 降りると上がる
						characterobject.c = 2610;
						characterobject.pt = 2700;
						characterobject.x = i;
						characterobject.y = j + 16;
						characterobject.c3 = j + 16;
						characterobject.vy = 4;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"80",
							"0",
							"circle"
						);
						this.setYukaColor(
							characterobject.c4,
							new Color(
								this.gamecolor_mizunohadou.getRed(),
								this.gamecolor_mizunohadou.getGreen(),
								this.gamecolor_mizunohadou.getBlue(),
								176
							)
						);
						break;

					case 2700: // 上下移動する円 上から
						characterobject.c = 2700;
						characterobject.pt = 2700;
						characterobject.x = i;
						characterobject.y = j + 16 + 24;
						characterobject.c3 = j + 16 + 24;
						characterobject.vy = 40;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"112",
							"0",
							"circle"
						);
						this.setYukaColor(
							characterobject.c4,
							new Color(
								this.gamecolor_mizunohadou.getRed(),
								this.gamecolor_mizunohadou.getGreen(),
								this.gamecolor_mizunohadou.getBlue(),
								176
							)
						);
						break;

					case 2701: // 上下移動する円 下から
						characterobject.c = 2700;
						characterobject.pt = 2700;
						characterobject.x = i;
						characterobject.y = j + 16 + 24 + 106;
						characterobject.c3 = j + 16 + 24;
						characterobject.vy = -40;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"112",
							"0",
							"circle"
						);
						this.setYukaColor(
							characterobject.c4,
							new Color(
								this.gamecolor_mizunohadou.getRed(),
								this.gamecolor_mizunohadou.getGreen(),
								this.gamecolor_mizunohadou.getBlue(),
								176
							)
						);
						break;

					case 2800: // 長いロープ
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 3100;
						characterobject.vy = 90;
						characterobject.vx = 22;
						characterobject.c3 = 0;
						characterobject.c = 2800;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2801: // 長いロープ 右から
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 3100;
						characterobject.vy = 90;
						characterobject.vx = -22;
						characterobject.c3 = 0;
						characterobject.c = 2800;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2802: // 長いロープ つかまると動く
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 3100;
						characterobject.vy = 90;
						characterobject.vx = 22;
						characterobject.c3 = 1;
						characterobject.c = 2800;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2803: // 長いロープ つかまると左から動く
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 3100;
						characterobject.vy = 168;
						characterobject.vx = 0;
						characterobject.c3 = 1;
						characterobject.c = 2800;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 2900: // 左向きのトゲ４つ
						characterobject.pt = 3200;
						break;

					case 2950: // 右向きのトゲ４つ
						characterobject.pt = 3250;
						break;

					case 3000: // 左右へ押せるドッスンスンのゴール
						characterobject.pt = 3300;
						characterobject.c3 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 3010: // 左右へ押せるドッスンスンのゴール ロック機能付き
						characterobject.c = 3000;
						characterobject.pt = 3300;
						characterobject.c3 = 1;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 3100: // 右へ一方通行
						characterobject.pt = 3500;
						characterobject.c3 = 0;
						characterobject.c1 = i - this.gg.di.width - 160;
						characterobject.c2 = i + 160;
						break;

					case 3101: // 右へ一方通行 表示なし
						characterobject.c = 3100;
						characterobject.pt = 3500;
						characterobject.c3 = 1;
						characterobject.c1 = i - this.gg.di.width - 160;
						characterobject.c2 = i + 160;
						break;

					case 3110: // 左へ一方通行
						characterobject.pt = 3510;
						characterobject.c3 = 0;
						characterobject.c1 = i - this.gg.di.width - 160;
						characterobject.c2 = i + 160;
						break;

					case 3111: // 左へ一方通行 表示なし
						characterobject.c = 3110;
						characterobject.pt = 3510;
						characterobject.c3 = 1;
						characterobject.c1 = i - this.gg.di.width - 160;
						characterobject.c2 = i + 160;
						break;

					case 3120: // 上へ一方通行
						characterobject.pt = 3520;
						characterobject.c3 = 0;
						characterobject.c1 = i - this.gg.di.width - 160;
						characterobject.c2 = i + 160;
						break;

					case 3121: // 上へ一方通行 表示なし
						characterobject.c = 3120;
						characterobject.pt = 3520;
						characterobject.c3 = 1;
						characterobject.c1 = i - this.gg.di.width - 160;
						characterobject.c2 = i + 160;
						break;

					case 3130: // 下へ一方通行
						characterobject.pt = 3530;
						characterobject.c3 = 0;
						characterobject.c1 = i - this.gg.di.width - 160;
						characterobject.c2 = i + 160;
						break;

					case 3131: // 下へ一方通行 表示なし
						characterobject.c = 3130;
						characterobject.pt = 3530;
						characterobject.c3 = 1;
						characterobject.c1 = i - this.gg.di.width - 160;
						characterobject.c2 = i + 160;
						break;

					case 3200: // ゆれる棒
						characterobject.c = 3200;
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 3100;
						characterobject.vy = 270;
						characterobject.vx = 22;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 3201: // ゆれる棒 左から
						characterobject.c = 3200;
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 3100;
						characterobject.vy = 270;
						characterobject.vx = -22;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 3202: // ゆれる棒 広角
						characterobject.c = 3200;
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 3100;
						characterobject.vy = 270;
						characterobject.vx = 22;
						characterobject.c3 = 0;
						characterobject.c4 = 1;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 3203: // ゆれる棒 広角 左から
						characterobject.c = 3200;
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.pt = 3100;
						characterobject.vy = 270;
						characterobject.vx = -22;
						characterobject.c3 = 0;
						characterobject.c4 = 1;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 3300: // 跳ねる円
						characterobject.c = 3300;
						characterobject.pt = 2700;
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.c3 = j + 16;
						characterobject.vy = 0;
						characterobject.c5 = 96;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"96",
							"0",
							"circle"
						);
						this.setYukaColor(characterobject.c4, this.gamecolor_firebar2);
						break;

					case 3301: // 跳ねる円 大
						characterobject.c = 3300;
						characterobject.pt = 2700;
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.c3 = j + 16;
						characterobject.vy = 0;
						characterobject.c5 = 128;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(
							String(characterobject.x),
							String(characterobject.y),
							"128",
							"0",
							"circle"
						);
						this.setYukaColor(characterobject.c4, this.gamecolor_firebar2);
						break;

					case 3400: // コンティニュー 残り人数のみ
						characterobject.pt = 3600;
						break;

					case 3500: // スイッチ 重なるとＯＮ／ＯＦＦ 周囲１０ブロック以内に影響
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.pt = 3700;
						break;

					case 3501: // スイッチ 重なるとＯＮ／ＯＦＦ 周囲５ブロック以内に影響
						characterobject.c = 3500;
						characterobject.c3 = 0;
						characterobject.c4 = 1;
						characterobject.pt = 3700;
						break;

					case 3502: // 連動スイッチ 重なるとＯＮ／ＯＦＦ マップ全体に影響 同スイッチへ連動
						characterobject.c = 3500;
						characterobject.c3 = 0;
						characterobject.c4 = 2;
						characterobject.pt = 3700;
						break;

					case 3600: // スイッチ ↑キーでＯＮ／ＯＦＦ 周囲１０ブロック以内に影響
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.pt = 3700;
						break;

					case 3601: // スイッチ ↑キーでＯＮ／ＯＦＦ 周囲５ブロック以内に影響
						characterobject.c = 3600;
						characterobject.c3 = 0;
						characterobject.c4 = 1;
						characterobject.pt = 3700;
						break;

					case 3602: // 連動スイッチ ↑キーでＯＮ／ＯＦＦ マップ全体に影響 同スイッチへ連動
						characterobject.c = 3600;
						characterobject.c3 = 0;
						characterobject.c4 = 2;
						characterobject.pt = 3700;
						break;

					case 3700: // スイッチ式の扉 ＯＮで開く
						characterobject.c3 = 0;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 3710: // スイッチ式の扉 ＯＮで閉まる
						characterobject.c3 = 100;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 3800: // スイッチ式トゲ ＯＮでブロック４
						characterobject.c3 = 0;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 3810: // スイッチ式トゲ ＯＦＦでブロック４
						characterobject.c3 = 0;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 3900: // スイッチ式トゲ ＯＮで消える
						characterobject.c3 = 0;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 3910: // スイッチ式トゲ ＯＮで出現
						characterobject.c3 = 0;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4000: // スイッチ式ハシゴ ＯＮで消える
						characterobject.c3 = 0;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4010: // スイッチ式ハシゴ ＯＮで出現
						characterobject.c3 = 0;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4100: // スイッチ式電撃バリア縦 ＯＮで消える
						characterobject.c3 = 0;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4110: // スイッチ式電撃バリア縦 ＯＮで出現
						characterobject.c3 = 0;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4200: // スイッチ式電撃バリア横 ＯＮで消える
						characterobject.c3 = 0;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4210: // スイッチ式電撃バリア横 ＯＮで出現
						characterobject.c3 = 0;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4300: // スイッチ式ファイヤーバー 上から左
						characterobject.vx = -3;
						characterobject.c3 = 270;
						characterobject.c4 = 0;
						characterobject.c5 = 0;
						characterobject.vy = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4301: // スイッチ式ファイヤーバー 上から右
						characterobject.c = 4300;
						characterobject.vx = -3;
						characterobject.c3 = 270;
						characterobject.c4 = 1;
						characterobject.c5 = 0;
						characterobject.vy = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4302: // スイッチ式ファイヤーバー 左から上
						characterobject.c = 4300;
						characterobject.vx = -3;
						characterobject.c3 = 180;
						characterobject.c4 = 2;
						characterobject.c5 = 0;
						characterobject.vy = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4303: // スイッチ式ファイヤーバー 右から上
						characterobject.c = 4300;
						characterobject.vx = -3;
						characterobject.c3 = 360;
						characterobject.c4 = 3;
						characterobject.c5 = 0;
						characterobject.vy = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4304: // スイッチ式ファイヤーバー 左から下
						characterobject.c = 4300;
						characterobject.vx = -3;
						characterobject.c3 = 180;
						characterobject.c4 = 4;
						characterobject.c5 = 0;
						characterobject.vy = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4305: // スイッチ式ファイヤーバー 右から下
						characterobject.c = 4300;
						characterobject.vx = -3;
						characterobject.c3 = 0;
						characterobject.c4 = 5;
						characterobject.c5 = 0;
						characterobject.vy = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4306: // スイッチ式ファイヤーバー 下から左
						characterobject.c = 4300;
						characterobject.vx = -3;
						characterobject.c3 = 90;
						characterobject.c4 = 6;
						characterobject.c5 = 0;
						characterobject.vy = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4307: // スイッチ式ファイヤーバー 下から右
						characterobject.c = 4300;
						characterobject.vx = -3;
						characterobject.c3 = 90;
						characterobject.c4 = 7;
						characterobject.c5 = 0;
						characterobject.vy = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4310: // スイッチ式ファイヤーバー 右から左回り
						characterobject.c = 4300;
						characterobject.vx = -2;
						characterobject.c3 = 360;
						characterobject.c4 = 10;
						characterobject.c5 = 0;
						characterobject.vy = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4311: // スイッチ式ファイヤーバー 左から右回り
						characterobject.c = 4300;
						characterobject.vx = -2;
						characterobject.c3 = 180;
						characterobject.c4 = 11;
						characterobject.c5 = 0;
						characterobject.vy = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4312: // スイッチ式ファイヤーバー 右から右回り
						characterobject.c = 4300;
						characterobject.vx = -2;
						characterobject.c3 = 0;
						characterobject.c4 = 12;
						characterobject.c5 = 0;
						characterobject.vy = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4313: // スイッチ式ファイヤーバー 左から左回り
						characterobject.c = 4300;
						characterobject.vx = -2;
						characterobject.c3 = 180;
						characterobject.c4 = 13;
						characterobject.c5 = 0;
						characterobject.vy = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4314: // スイッチ式ファイヤーバー 上から左回り
						characterobject.c = 4300;
						characterobject.vx = -2;
						characterobject.c3 = 270;
						characterobject.c4 = 14;
						characterobject.c5 = 0;
						characterobject.vy = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4315: // スイッチ式ファイヤーバー 上から右回り
						characterobject.c = 4300;
						characterobject.vx = -2;
						characterobject.c3 = 270;
						characterobject.c4 = 15;
						characterobject.c5 = 0;
						characterobject.vy = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4316: // スイッチ式ファイヤーバー 下から右回り
						characterobject.c = 4300;
						characterobject.vx = -2;
						characterobject.c3 = 90;
						characterobject.c4 = 16;
						characterobject.c5 = 0;
						characterobject.vy = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4317: // スイッチ式ファイヤーバー 下から左回り
						characterobject.c = 4300;
						characterobject.vx = -2;
						characterobject.c3 = 90;
						characterobject.c4 = 17;
						characterobject.c5 = 0;
						characterobject.vy = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4400: // スイッチ式ブロック ＯＮで消える
						characterobject.c3 = 0;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4410: // スイッチ式ブロック ＯＮで出現
						characterobject.c3 = 0;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4500: // スイッチ式動くＴ字型 ＯＮで左
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.c3 = 0;
						characterobject.pt = 4000;
						characterobject.c5 = 0;
						characterobject.vx = 0;
						characterobject.vy = 322;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 4501: // スイッチ式動くＴ字型 ＯＮで右
						characterobject.c = 4500;
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.c3 = 0;
						characterobject.pt = 4000;
						characterobject.c5 = 0;
						characterobject.vx = 1;
						characterobject.vy = 218;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 4502: // スイッチ式速く動くＴ字型 ＯＮで左
						characterobject.c = 4500;
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.c3 = 0;
						characterobject.pt = 4000;
						characterobject.c5 = 0;
						characterobject.vx = 2;
						characterobject.vy = 322;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 4503: // スイッチ式速く動くＴ字型 ＯＮで右
						characterobject.c = 4500;
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.c3 = 0;
						characterobject.pt = 4000;
						characterobject.c5 = 0;
						characterobject.vx = 3;
						characterobject.vy = 218;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 4510: // スイッチ式動くＴ字型 ＯＮで左から上
						characterobject.c = 4500;
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.c3 = 0;
						characterobject.pt = 4000;
						characterobject.c5 = 0;
						characterobject.vx = 10;
						characterobject.vy = 218;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 4511: // スイッチ式動くＴ字型 ＯＮで上から左
						characterobject.c = 4500;
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.c3 = 0;
						characterobject.pt = 4000;
						characterobject.c5 = 0;
						characterobject.vx = 11;
						characterobject.vy = 270;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 4512: // スイッチ式動くＴ字型 ＯＮで右から上
						characterobject.c = 4500;
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.c3 = 0;
						characterobject.pt = 4000;
						characterobject.c5 = 0;
						characterobject.vx = 12;
						characterobject.vy = 322;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 4513: // スイッチ式動くＴ字型 ＯＮで上から右
						characterobject.c = 4500;
						characterobject.x = i + 16;
						characterobject.y = j + 16;
						characterobject.c3 = 0;
						characterobject.pt = 4000;
						characterobject.c5 = 0;
						characterobject.vx = 13;
						characterobject.vy = 270;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						characterobject.c4 = this.newYuka(String(1), String(1), String(2), String(2), "line");
						this.setYukaColor(String(characterobject.c4), "255", "255", "255", "255");
						break;

					case 4600: // ＫＥＹ１
						characterobject.pt = 4100;
						break;

					case 4610: // ＫＥＹ２
						characterobject.pt = 4110;
						break;

					case 4700: // ＫＥＹ１で開く扉
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.pt = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4701: // ＫＥＹ２で開く扉
						characterobject.c = 4700;
						characterobject.c3 = 0;
						characterobject.c4 = 1;
						characterobject.pt = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4702: // ＫＥＹ１が３つで開く扉
						characterobject.c = 4700;
						characterobject.c3 = 0;
						characterobject.c4 = 2;
						characterobject.pt = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4703: // ＫＥＹ２が３つで開く扉
						characterobject.c = 4700;
						characterobject.c3 = 0;
						characterobject.c4 = 3;
						characterobject.pt = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4800: // ＫＥＹ１ 落ちる
						characterobject.pt = 4100;
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4801: // ＫＥＹ２ 落ちる
						characterobject.c = 4800;
						characterobject.pt = 4110;
						characterobject.c3 = 0;
						characterobject.c4 = 1;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 4900: // ＫＥＹ１が３つでＯＮの動作の人 周囲１０ブロック以内に影響
						characterobject.c = 4900;
						characterobject.pt = 4200;
						break;

					case 4910: // ＫＥＹ２が３つでＯＮの動作の人 周囲１０ブロック以内に影響
						characterobject.c = 4910;
						characterobject.pt = 4210;
						break;

					case 5000: // 乗ると壊れるブロック
						characterobject.c3 = 0;
						characterobject.pt = 0;
						characterobject.c1 = l - this.gg.di.width - 32 - this.gg.di.width;
						characterobject.c2 = l + 128 + this.gg.di.width;
						break;

					case 5100: // しっぽで破壊 ＯＮの動作 周囲１０ブロック以内に影響
						characterobject.c3 = 0;
						characterobject.c4 = 0;
						characterobject.pt = 4300;
						break;

					case 5101: // しっぽで破壊 ＯＮの動作 周囲５ブロック以内に影響
						characterobject.c = 5100;
						characterobject.c3 = 0;
						characterobject.c4 = 1;
						characterobject.pt = 4300;
						break;

					case 5200: // スイッチ式ブロック縦 ＯＮで消える
						characterobject.c3 = 0;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 5210: // スイッチ式ブロック縦 ＯＮで出現
						characterobject.c3 = 0;
						characterobject.c5 = 0;
						characterobject.c1 = 0;
						characterobject.c2 = (this.mapWidth + 1) * 32;
						break;

					case 5300: // 得点でグレネードを売る人
						characterobject.pt = 4220;
						break;
				}
				break;
			}
			i1++;
		} while (true);
	}

	/**
	 * 仕掛けの更新処理
	 */
	aMove() {
		this.j_a_id = -1;
		this.j_jdai_f = false;
		this.a_hf = false;
		this.souko_count1 = 0;
		this.souko_count2 = 0;
		for (var i = 0; i <= this.a_kazu; i++) {
			var characterobject = this.co_a[i];
			if (characterobject.c == 0) continue;
			if (
				(this.scroll_area < 2 || this.scroll_area > 5) &&
				(this.maps.wx <= characterobject.c1 || this.maps.wx >= characterobject.c2)
			) {
				characterobject.gf = false;
				continue;
			}
			var k3 = characterobject.x;
			var l3 = characterobject.y;
			switch (characterobject.c) {
				default:
					break;

				case 60: // 水草
					if (
						k3 > this.maps.wx - 80 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 96 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (this.g_c3 <= 3) characterobject.pt = 200;
						else characterobject.pt = 210;
					} else {
						characterobject.gf = false;
					}
					break;

				case 70: // ファイヤーバー 1本
					if (characterobject.c4 == 2) {
						characterobject.c3 += characterobject.vx;
						if (characterobject.c3 <= 110) {
							characterobject.c3 = 110;
							characterobject.vx = 2;
						} else if (characterobject.c3 >= 250) {
							characterobject.c3 = 250;
							characterobject.vx = -2;
						}
					} else if (characterobject.c4 == 3) {
						characterobject.c3 += characterobject.vx;
						if (characterobject.c3 <= 290) {
							characterobject.c3 = 290;
							characterobject.vx = 2;
						} else if (characterobject.c3 >= 430) {
							characterobject.c3 = 430;
							characterobject.vx = -2;
						}
					} else {
						characterobject.c3 += characterobject.vx;
						if (characterobject.c3 < 0) characterobject.c3 += 360;
						else if (characterobject.c3 >= 360) characterobject.c3 -= 360;
					}
					if (
						k3 > this.maps.wx - 150 &&
						k3 < this.maps.wx + this.gg.di.width + 150 &&
						l3 > this.maps.wy - 150 &&
						l3 < this.maps.wy + this.gg.di.height + 150
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 1100;
						var i85;
						var j87;
						var k89;
						var j92;
						if (Math.abs(characterobject.vx) == 2) {
							var d = 0.017453292519943295;
							i85 = k3 + rounddown(Math.cos(characterobject.c3 * d) * 25, true, this);
							j87 = l3 + rounddown(Math.sin(characterobject.c3 * d) * 25, true, this);
							this.vo_x[i][0] = i85;
							this.vo_y[i][0] = j87;
							k89 = k3 + rounddown(Math.cos(characterobject.c3 * d) * 172, true, this);
							j92 = l3 + rounddown(Math.sin(characterobject.c3 * d) * 172, true, this);
							this.vo_x[i][1] = k89;
							this.vo_y[i][1] = j92;
							this.vo_x[i][2] = k3 + Math.cos(characterobject.c3 * d) * 31;
							this.vo_y[i][2] = l3 + Math.sin(characterobject.c3 * d) * 31;
							this.vo_x[i][3] = k3 + Math.cos(characterobject.c3 * d) * 166;
							this.vo_y[i][3] = l3 + Math.sin(characterobject.c3 * d) * 166;
						} else {
							var d1 = 0.017453292519943295;
							i85 = k3 + rounddown(Math.cos(characterobject.c3 * d1) * 25, true, this);
							j87 = l3 + rounddown(Math.sin(characterobject.c3 * d1) * 25, true, this);
							this.vo_x[i][0] = i85;
							this.vo_y[i][0] = j87;
							k89 = k3 + rounddown(Math.cos(characterobject.c3 * d1) * 140, true, this);
							j92 = l3 + rounddown(Math.sin(characterobject.c3 * d1) * 140, true, this);
							this.vo_x[i][1] = k89;
							this.vo_y[i][1] = j92;
							this.vo_x[i][2] = k3 + Math.cos(characterobject.c3 * d1) * 31;
							this.vo_y[i][2] = l3 + Math.sin(characterobject.c3 * d1) * 31;
							this.vo_x[i][3] = k3 + Math.cos(characterobject.c3 * d1) * 134;
							this.vo_y[i][3] = l3 + Math.sin(characterobject.c3 * d1) * 134;
						}
						if (this.co_j.c >= 100 && this.co_j.c < 200 && this.j_v_c <= 0)
							if (Math.abs(i85 - k89) >= Math.abs(j87 - j92)) {
								if (this.co_j.x + 15 > i85 && this.co_j.x + 15 < k89) {
									var l5 = k89 - i85;
									var k22 = this.co_j.x + 15 - i85;
									var i46 = j92 - j87;
									var i62 = rounddown((k22 * i46) / l5) + j87;
									if (i62 > this.co_j.y - 12 && i62 < this.co_j.y + 44) this.jShinu(1);
								} else if (this.co_j.x + 15 > k89 && this.co_j.x + 15 < i85) {
									var i6 = i85 - k89;
									var l22 = this.co_j.x + 15 - k89;
									var j46 = j87 - j92;
									var j62 = rounddown((l22 * j46) / i6) + j92;
									if (j62 > this.co_j.y - 12 && j62 < this.co_j.y + 44) this.jShinu(1);
								}
							} else if (this.co_j.y + 15 > j87 && this.co_j.y + 15 < j92) {
								var j6 = j92 - j87;
								var i23 = this.co_j.y + 15 - j87;
								var k46 = k89 - i85;
								var k62 = rounddown((i23 * k46) / j6) + i85;
								if (k62 > this.co_j.x - 12 && k62 < this.co_j.x + 44) this.jShinu(1);
							} else if (this.co_j.y + 15 > j92 && this.co_j.y + 15 < j87) {
								var k6 = j87 - j92;
								var j23 = this.co_j.y + 15 - j92;
								var l46 = i85 - k89;
								var l62 = rounddown((j23 * l46) / k6) + k89;
								if (l62 > this.co_j.x - 12 && l62 < this.co_j.x + 44) this.jShinu(1);
							}
					} else {
						characterobject.gf = false;
					}
					break;

				case 80: // 一言メッセージ
					if (
						k3 > this.maps.wx - 32 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 32 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (this.co_j.x >= k3 - 80 && this.co_j.x <= k3 + 64 && Math.abs(l3 - this.co_j.y) < 32) {
							this.hitokoto_c = 10;
							this.hitokoto_num = characterobject.c3;
						}
					} else {
						characterobject.gf = false;
					}
					break;

				case 85: // 隠しブロック
					if (
						k3 > this.maps.wx - 32 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 32 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
					} else {
						characterobject.gf = false;
					}
					break;

				case 86: // お店
					if (
						k3 > this.maps.wx - 32 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 32 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (this.km.mode == 50) {
							if (this.co_j.x < k3 - 80 - 8 || this.co_j.x > k3 + 64 + 8) this.km.mode = 100;
						} else if (this.km.mode == 100) {
							if (
								this.co_j.x >= k3 - 80 &&
								this.co_j.x <= k3 + 64 &&
								Math.abs(l3 - this.co_j.y) < 8 &&
								!this.gk.tr1_f
							) {
								this.km.init1(3);
								this.km.setMessage(3, this.shop_name);
								this.addSerifu(3, 5, 3);
								this.km.activeSerifu(
									3,
									rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40,
									rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16,
									224,
									Color.cyan
								);
								this.km.move();
								this.km.mode = 400;
							}
						} else if (this.km.mode == 400) {
							if (this.km.cancel_c == 1) {
								this.km.off(3);
								this.km.mode = 50;
							} else if (this.co_j.x < k3 - 80 - 8 || this.co_j.x > k3 + 64 + 8 || Math.abs(l3 - this.co_j.y) > 16) {
								this.km.off(3);
								this.km.mode = 50;
							} else if (this.km.kettei_c == 1) {
								this.co_j.c = 150;
								if (this.co_j.x <= k3 || this.maps.getBGCode(k3 + 48, l3) >= 18) {
									if (this.maps.getBGCode(k3 - 16, l3) >= 18) {
										this.co_j.x = k3 - 15;
										this.co_j.muki = 1;
									} else {
										this.co_j.x = k3 - 48;
										this.co_j.muki = 1;
									}
								} else {
									this.co_j.x = k3 + 48;
									this.co_j.muki = 0;
								}
								this.co_j.y = l3;
								this.co_j.vx = 0;
								this.co_j.vy = 0;
								this.co_j.pt = 100;
								this.setmyw_pt = this.co_j.pt;
								this.setmyw_muki = this.co_j.muki;
								this.co_j.c1 = 10;
								this.km.list_kazu = 0;
								this.km.init1(6);
								this.km.setMessage(6, this.tdb.getValue("shop_serifu1"));
								for (i = 0; i <= 8; i++)
									if (this.shop_item_teika[i] > 0) {
										this.km.addItem2(6, this.shop_item_name[i], this.shop_item_teika[i]);
										this.km.list_IDlist[this.km.list_kazu] = i;
										this.km.list_kazu++;
									}

								if (this.km.list_kazu >= 1) {
									this.km.activeKaimono(
										6,
										rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 + 140,
										rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 20,
										184
									);
									this.km.mode = 410;
								} else {
									this.km.init1(6);
									this.km.init1(8);
									this.km.setMessage(8, "Error");
									this.km.addItem(8, "Please set any item on shop menu.");
									this.km.activeSerifu(
										8,
										rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 + 82,
										rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 60,
										216,
										Color.red
									);
									this.km.mode = 440;
								}
							}
						} else if (this.km.mode == 410) {
							this.co_j.c1 = 10;
							if (this.km.cancel_c == 1) {
								this.km.off(6);
								this.km.mode = 100;
							} else if (this.km.kettei_c == 1) {
								this.km.list_s = this.km.list_IDlist[this.km.selectedIndex[6]];
								this.km.init1(7);
								this.km.setMessage(7, `${this.shop_item_name[this.km.list_s]}${this.tdb.getValue("shop_serifu2")}`);
								this.km.addItem(7, this.tdb.getValue("shop_serifu3"));
								this.km.addItem(7, this.tdb.getValue("shop_serifu4"));
								this.km.activeSerifutuki(
									7,
									rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 - 152,
									rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 46,
									236,
									this.shop_name
								);
								this.km.mode = 420;
							}
						} else if (this.km.mode == 420) {
							this.co_j.c1 = 10;
							if (this.km.cancel_c == 1) {
								this.km.offActivewindow(7, 6);
								this.km.mode = 410;
							} else if (this.km.kettei_c == 1)
								if (this.km.selectedIndex[7] == 0) {
									if (this.score >= this.shop_item_teika[this.km.list_s]) {
										this.km.init1(8);
										this.km.addItem(8, `${this.shop_item_name[this.km.list_s]}${this.tdb.getValue("shop_serifu5")}`);
										this.km.activeIchigyou(
											8,
											rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 - 152,
											rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 130,
											236
										);
										this.score -= this.shop_item_teika[this.km.list_s];
										this.ig.shop_kattaitem = this.km.list_s;
										switch (this.ig.shop_kattaitem) {
											// 買ったアイテム

											default:
												break;

											case 0:
												// グレネード３発
												this.j_gr_kazu += 3;
												this.gs.rsAddSound(7);
												break;

											case 1:
												// ジェット
												this.j_jet_fuel += 80;
												this.gs.rsAddSound(7);
												break;

											case 2:
												// ドリル
												this.j_drell_f = true;
												this.gs.rsAddSound(7);
												break;

											case 3:
												// ヘルメット
												this.j_helm_f = true;
												this.gs.rsAddSound(7);
												break;

											case 4:
												// しっぽ
												this.j_tail_f = true;
												this.gs.rsAddSound(7);
												break;

											case 5:
												// バリア
												this.j_v_c = 150;
												this.j_v_kakudo = 0;
												this.gs.rsAddSound(7);
												break;

											case 6:
												// ファイヤーボール
												this.j_fire_f = true;
												this.j_fire_type = this.default_j_fire_type;
												if (this.j_fire_type == 3 || this.j_fire_type == 4) this.j_fire_range = 10;
												this.gs.rsAddSound(7);
												break;

											case 7:
												// １ｕｐ
												if (this.j_tokugi == 17) this.setMyHP(String(this.getMyHP() + 1));
												else this.j_left++;
												this.gs.rsAddSound(7);
												break;

											case 8:
												// 制限時間増加
												if (this.time_max > 0) this.time += 30000;
												this.gs.rsAddSound(7);
												break;
										}
										this.km.mode = 430;
									} else {
										this.km.init1(8);
										this.km.addItem(8, this.tdb.getValue("shop_serifu6"));
										this.km.activeIchigyou(
											8,
											rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 - 152,
											rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 132,
											236
										);
										this.km.mode = 430;
										this.co_j.c1 = 10;
									}
								} else {
									this.km.off(4);
									this.km.off(6);
									this.km.off(7);
									this.km.mode = 100;
								}
						} else if (this.km.mode == 430) {
							if (this.co_j.x < k3 - 80 - 8 || this.co_j.x > k3 + 64 + 8) {
								this.km.off(3);
								this.km.off(6);
								this.km.off(7);
								this.km.off(8);
								this.km.mode = 100;
							} else if (this.km.cancel_c == 1) {
								this.km.off(7);
								this.km.offActivewindow(8, 6);
								this.co_j.c = 150;
								if (this.co_j.x <= k3 || this.maps.getBGCode(k3 + 48, l3) >= 18) {
									if (this.maps.getBGCode(k3 - 16, l3) >= 18) {
										this.co_j.x = k3 - 15;
										this.co_j.muki = 1;
									} else {
										this.co_j.x = k3 - 48;
										this.co_j.muki = 1;
									}
								} else {
									this.co_j.x = k3 + 48;
									this.co_j.muki = 0;
								}
								this.co_j.y = l3;
								this.co_j.vx = 0;
								this.co_j.vy = 0;
								this.co_j.pt = 100;
								this.setmyw_pt = this.co_j.pt;
								this.setmyw_muki = this.co_j.muki;
								this.co_j.c1 = 10;
								this.km.mode = 410;
							} else if (this.km.kettei_c == 1) {
								this.km.off(3);
								this.km.off(6);
								this.km.off(7);
								this.km.off(8);
								this.km.mode = 50;
							}
						} else if (
							this.km.mode == 440 &&
							(this.co_j.x < k3 - 80 - 8 || this.co_j.x > k3 + 64 + 8 || this.km.cancel_c == 1 || this.km.kettei_c == 1)
						) {
							this.km.off(3);
							this.km.off(6);
							this.km.off(7);
							this.km.off(8);
							this.km.mode = 50;
						}
					} else {
						characterobject.gf = false;
					}
					break;

				case 87: // ヘルメットかドリルをくれる人
					if (
						k3 > this.maps.wx - 32 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 32 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (this.km.mode == 50) {
							if (this.co_j.x < k3 - 80 - 8 || this.co_j.x > k3 + 64 + 8) this.km.mode = 100;
						} else if (this.km.mode == 100) {
							if (
								this.co_j.x >= k3 - 80 &&
								this.co_j.x <= k3 + 64 &&
								Math.abs(l3 - this.co_j.y) < 8 &&
								!this.gk.tr1_f
							) {
								if (characterobject.c3 == 0) {
									this.km.init1(3);
									this.km.setMessage(3, this.mes1_name);
									this.addSerifu(3, 1, 3);
									this.km.activeSerifu(
										3,
										rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40,
										rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16,
										272,
										Color.cyan
									);
									this.km.mode = 200;
								} else {
									this.km.init1(3);
									this.km.setMessage(3, this.mes1_name);
									this.addSerifu(3, 2, 3);
									this.km.activeSerifu(
										3,
										rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40,
										rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16,
										272,
										Color.cyan
									);
									this.km.mode = 250;
								}
								this.km.move();
							}
						} else if (this.km.mode == 200) {
							if (this.km.cancel_c == 1) {
								this.km.off(3);
								this.km.mode = 50;
							} else if (this.co_j.x < k3 - 80 - 8 || this.co_j.x > k3 + 64 + 8 || Math.abs(l3 - this.co_j.y) > 16) {
								this.km.off(3);
								this.km.mode = 50;
							} else if (this.km.kettei_c == 1) {
								this.co_j.c = 150;
								if (this.co_j.x <= k3 || this.maps.getBGCode(k3 + 48, l3) >= 18) {
									if (this.maps.getBGCode(k3 - 16, l3) >= 18) {
										this.co_j.x = k3 - 15;
										this.co_j.muki = 1;
									} else {
										this.co_j.x = k3 - 48;
										this.co_j.muki = 1;
									}
								} else {
									this.co_j.x = k3 + 48;
									this.co_j.muki = 0;
								}
								this.co_j.y = l3;
								this.co_j.vx = 0;
								this.co_j.vy = 0;
								this.co_j.pt = 100;
								this.setmyw_pt = this.co_j.pt;
								this.setmyw_muki = this.co_j.muki;
								this.co_j.c1 = 10;
								this.km.init1(7);
								this.km.setMessage(7, this.tdb.getValue("shop_serifu1"));
								this.km.addItem(7, this.shop_item_name[3]);
								this.km.addItem(7, this.shop_item_name[2]);
								this.km.activeSerifutuki(
									7,
									rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 - 96,
									rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 46,
									160,
									this.mes1_name
								);
								this.km.mode = 220;
							}
						} else if (this.km.mode == 220) {
							this.co_j.c1 = 10;
							if (this.km.cancel_c == 1) {
								this.km.offActivewindow(7, 3);
								this.km.mode = 200;
							} else if (this.km.kettei_c == 1) {
								if (this.km.selectedIndex[7] == 0) {
									this.km.init1(8);
									this.km.addItem(8, `${this.shop_item_name[3]}${this.tdb.getValue("shop_serifu5")}`);
									this.km.activeIchigyou(
										8,
										rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 + 76,
										rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 96,
										236
									);
									this.j_helm_f = true;
									this.gs.rsAddSound(7);
									this.km.mode = 230;
								} else {
									this.km.init1(8);
									this.km.addItem(8, `${this.shop_item_name[2]}${this.tdb.getValue("shop_serifu5")}`);
									this.km.activeIchigyou(
										8,
										rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 + 76,
										rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 96,
										236
									);
									this.j_drell_f = true;
									this.gs.rsAddSound(7);
									this.km.mode = 230;
								}
								characterobject.c3 = 1;
							}
						} else if (this.km.mode == 230) {
							if (this.co_j.x < k3 - 80 - 8 || this.co_j.x > k3 + 64 + 8 || this.km.kettei_c == 1) {
								this.km.off(3);
								this.km.off(7);
								this.km.off(8);
								this.km.mode = 50;
							} else if (this.km.cancel_c == 1) {
								this.km.off(3);
								this.km.off(7);
								this.km.off(8);
								this.km.init1(3);
								this.km.setMessage(3, this.mes1_name);
								this.addSerifu(3, 2, 3);
								this.km.activeSerifu(
									3,
									rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40,
									rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16,
									272,
									Color.cyan
								);
								this.km.mode = 250;
							}
						} else if (
							this.km.mode == 250 &&
							(this.co_j.x < k3 - 80 - 8 || this.co_j.x > k3 + 64 + 8 || this.km.cancel_c == 1 || this.km.kettei_c == 1)
						) {
							this.km.off(3);
							this.km.mode = 50;
						}
					} else {
						characterobject.gf = false;
					}
					break;

				case 88: // グレネードかジェットをくれる人
					if (
						k3 > this.maps.wx - 32 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 32 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (this.km.mode == 50) {
							if (this.co_j.x < k3 - 80 - 8 || this.co_j.x > k3 + 64 + 8) this.km.mode = 100;
						} else if (this.km.mode == 100) {
							if (
								this.co_j.x >= k3 - 80 &&
								this.co_j.x <= k3 + 64 &&
								Math.abs(l3 - this.co_j.y) < 8 &&
								!this.gk.tr1_f
							) {
								if (characterobject.c3 == 0) {
									this.km.init1(3);
									this.km.setMessage(3, this.mes2_name);
									this.addSerifu(3, 3, 3);
									this.km.activeSerifu(
										3,
										rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40,
										rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16,
										272,
										Color.cyan
									);
									this.km.mode = 300;
								} else {
									this.km.init1(3);
									this.km.setMessage(3, this.mes2_name);
									this.addSerifu(3, 4, 3);
									this.km.activeSerifu(
										3,
										rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40,
										rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16,
										272,
										Color.cyan
									);
									this.km.mode = 350;
								}
								this.km.move();
							}
						} else if (this.km.mode == 300) {
							if (this.km.cancel_c == 1) {
								this.km.off(3);
								this.km.mode = 50;
							} else if (this.co_j.x < k3 - 80 - 8 || this.co_j.x > k3 + 64 + 8 || Math.abs(l3 - this.co_j.y) > 16) {
								this.km.off(3);
								this.km.mode = 50;
							} else if (this.km.kettei_c == 1) {
								this.co_j.c = 150;
								if (this.co_j.x <= k3 || this.maps.getBGCode(k3 + 48, l3) >= 18) {
									if (this.maps.getBGCode(k3 - 16, l3) >= 18) {
										this.co_j.x = k3 - 15;
										this.co_j.muki = 1;
									} else {
										this.co_j.x = k3 - 48;
										this.co_j.muki = 1;
									}
								} else {
									this.co_j.x = k3 + 48;
									this.co_j.muki = 0;
								}
								this.co_j.y = l3;
								this.co_j.vx = 0;
								this.co_j.vy = 0;
								this.co_j.pt = 100;
								this.setmyw_pt = this.co_j.pt;
								this.setmyw_muki = this.co_j.muki;
								this.co_j.c1 = 10;
								this.km.init1(7);
								this.km.setMessage(7, this.tdb.getValue("shop_serifu1"));
								this.km.addItem(7, this.shop_item_name[0]);
								this.km.addItem(7, this.shop_item_name[1]);
								this.km.activeSerifutuki(
									7,
									rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 - 96,
									rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 46,
									160,
									this.mes2_name
								);
								this.km.mode = 320;
							}
						} else if (this.km.mode == 320) {
							this.co_j.c1 = 10;
							if (this.km.cancel_c == 1) {
								this.km.offActivewindow(7, 3);
								this.km.mode = 300;
							} else if (this.km.kettei_c == 1) {
								if (this.km.selectedIndex[7] == 0) {
									this.km.init1(8);
									this.km.addItem(8, `${this.shop_item_name[0]}${this.tdb.getValue("shop_serifu5")}`);
									this.km.activeIchigyou(
										8,
										rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 + 76,
										rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 96,
										236
									);
									this.j_gr_kazu += 3;
									this.gs.rsAddSound(7);
									this.km.mode = 330;
								} else {
									this.km.init1(8);
									this.km.addItem(8, `${this.shop_item_name[1]}${this.tdb.getValue("shop_serifu5")}`);
									this.km.activeIchigyou(
										8,
										rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 + 76,
										rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 96,
										236
									);
									this.j_jet_fuel += 80;
									this.gs.rsAddSound(7);
									this.km.mode = 330;
								}
								characterobject.c3 = 1;
							}
						} else if (this.km.mode == 330) {
							if (this.co_j.x < k3 - 80 - 8 || this.co_j.x > k3 + 64 + 8 || this.km.kettei_c == 1) {
								this.km.off(3);
								this.km.off(7);
								this.km.off(8);
								this.km.mode = 50;
							} else if (this.km.cancel_c == 1) {
								this.km.off(3);
								this.km.off(7);
								this.km.off(8);
								this.km.init1(3);
								this.km.setMessage(3, this.mes2_name);
								this.addSerifu(3, 4, 3);
								this.km.activeSerifu(
									3,
									rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40,
									rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16,
									272,
									Color.cyan
								);
								this.km.mode = 350;
							}
						} else if (
							this.km.mode == 350 &&
							(this.co_j.x < k3 - 80 - 8 || this.co_j.x > k3 + 64 + 8 || this.km.cancel_c == 1 || this.km.kettei_c == 1)
						) {
							this.km.off(3);
							this.km.mode = 50;
						}
					} else {
						characterobject.gf = false;
					}
					break;

				case 89: // ファイヤーボールセレクトの人
					if (
						k3 > this.maps.wx - 32 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 32 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (this.km.mode == 50) {
							if (this.co_j.x < k3 - 80 - 8 || this.co_j.x > k3 + 64 + 8) this.km.mode = 100;
						} else if (this.km.mode == 100) {
							if (
								this.co_j.x >= k3 - 80 &&
								this.co_j.x <= k3 + 64 &&
								Math.abs(l3 - this.co_j.y) < 8 &&
								!this.gk.tr1_f
							) {
								this.km.init1(3);
								this.km.setMessage(3, this.tdb.getValue("fs_name"));
								this.addSerifu(3, 7, 3);
								this.km.activeSerifu(
									3,
									rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40,
									rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16,
									272,
									Color.cyan
								);
								this.km.mode = 200;
								this.km.move();
							}
						} else if (this.km.mode == 200) {
							if (this.km.cancel_c == 1) {
								this.km.off(3);
								this.km.mode = 50;
							} else if (this.co_j.x < k3 - 80 - 8 || this.co_j.x > k3 + 64 + 8 || Math.abs(l3 - this.co_j.y) > 16) {
								this.km.off(3);
								this.km.mode = 50;
							} else if (this.km.kettei_c == 1) {
								this.co_j.c = 150;
								if (this.co_j.x <= k3 || this.maps.getBGCode(k3 + 48, l3) >= 18) {
									if (this.maps.getBGCode(k3 - 16, l3) >= 18) {
										this.co_j.x = k3 - 15;
										this.co_j.muki = 1;
									} else {
										this.co_j.x = k3 - 48;
										this.co_j.muki = 1;
									}
								} else {
									this.co_j.x = k3 + 48;
									this.co_j.muki = 0;
								}
								this.co_j.y = l3;
								this.co_j.vx = 0;
								this.co_j.vy = 0;
								this.co_j.pt = 100;
								this.setmyw_pt = this.co_j.pt;
								this.setmyw_muki = this.co_j.muki;
								this.co_j.c1 = 10;
								this.km.init1(7);
								this.km.setMessage(7, this.tdb.getValue("fs_serifu1"));
								this.km.addItem(7, this.tdb.getValue("fs_item_name1"));
								this.km.addItem(7, this.tdb.getValue("fs_item_name2"));
								this.km.addItem(7, this.tdb.getValue("fs_item_name3"));
								this.km.activeSerifutuki(
									7,
									rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 - 128,
									rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 46,
									240,
									this.tdb.getValue("fs_name")
								);
								this.km.mode = 220;
							}
						} else if (this.km.mode == 220) {
							this.co_j.c1 = 10;
							if (this.km.cancel_c == 1) {
								this.km.offActivewindow(7, 3);
								this.km.mode = 200;
							} else if (this.km.kettei_c == 1) {
								this.km.init1(8);
								this.km.addItem(
									8,
									`${this.tdb.getValue(`fs_item_name${this.km.selectedIndex[7] + 1}`)}${this.tdb.getValue(
										"fs_serifu2"
									)}`
								);
								this.km.activeIchigyou(
									8,
									rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 + 36,
									rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 116,
									236
								);
								this.j_fire_f = true;
								if (this.km.selectedIndex[7] == 0) {
									this.j_fire_type = 1;
								} else if (this.km.selectedIndex[7] == 1) {
									this.j_fire_type = 2;
									this.j_fire_range = 9999;
								} else {
									this.j_fire_type = 4;
									this.j_fire_range = 10;
								}
								this.gs.rsAddSound(7);
								this.km.mode = 230;
							}
						} else if (this.km.mode == 230) {
							if (
								this.co_j.x < k3 - 80 - 8 ||
								this.co_j.x > k3 + 64 + 8 ||
								this.km.kettei_c == 1 ||
								this.km.cancel_c == 1
							) {
								this.km.off(3);
								this.km.off(7);
								this.km.off(8);
								this.km.mode = 50;
							}
						} else if (
							this.km.mode == 250 &&
							(this.co_j.x < k3 - 80 - 8 || this.co_j.x > k3 + 64 + 8 || this.km.cancel_c == 1 || this.km.kettei_c == 1)
						) {
							this.km.off(3);
							this.km.mode = 50;
						}
					} else {
						characterobject.gf = false;
					}
					break;

				case 90: // シーソー
					if (
						k3 > this.maps.wx - 180 &&
						k3 < this.maps.wx + this.gg.di.width + 180 &&
						l3 > this.maps.wy - 180 &&
						l3 < this.maps.wy + this.gg.di.height + 180
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 1200;
						var i4 = this.isRideYuka(String(characterobject.c4));
						if (i4 == 1)
							if (Math.abs(this.co_j.x + 15 - k3) < 16) {
								if (characterobject.vy > 0) characterobject.vy--;
								else if (characterobject.vy < 0) characterobject.vy++;
							} else if (this.co_j.x + 15 < k3) {
								characterobject.vy--;
								if (this.co_j.x + 15 < k3 - 80) characterobject.vy--;
								if (characterobject.vy < -56) characterobject.vy = -56;
							} else {
								characterobject.vy++;
								if (this.co_j.x + 15 > k3 + 80) characterobject.vy++;
								if (characterobject.vy > 56) characterobject.vy = 56;
							}
						var j85 =
							k3 + rounddown(Math.cos(((characterobject.vy + 180) * 3.1415926535897931) / 180) * 160, true, this);
						var k87 =
							l3 + rounddown(Math.sin(((characterobject.vy + 180) * 3.1415926535897931) / 180) * 160, true, this);
						var l89 = k3 + rounddown(Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 160, true, this);
						var k92 = l3 + rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 160, true, this);
						j85 += rounddown(Math.cos(((characterobject.vy + 270) * 3.1415926535897931) / 180) * 12, true, this);
						k87 += rounddown(Math.sin(((characterobject.vy + 270) * 3.1415926535897931) / 180) * 12, true, this);
						l89 += rounddown(Math.cos(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 12, true, this);
						k92 += rounddown(Math.sin(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 12, true, this);
						this.setYukaPosition(String(characterobject.c4), String(j85), String(k87), String(l89), String(k92));
					} else {
						characterobject.gf = false;
					}
					break;

				case 93: // ブランコ
					if (
						k3 > this.maps.wx - 180 &&
						k3 < this.maps.wx + this.gg.di.width + 180 &&
						l3 > this.maps.wy - 180 &&
						l3 < this.maps.wy + this.gg.di.height + 180
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 1300;
						if (characterobject.c3 == 0) {
							characterobject.c3 = 1;
							this.maps.putBGCode(rightShiftIgnoreSign(k3, 5), rightShiftIgnoreSign(l3, 5), 50);
						}
					} else {
						characterobject.gf = false;
					}
					if (characterobject.vy > 110) {
						characterobject.vx -= 2;
						if (characterobject.vx < -40) characterobject.vx = -40;
					} else if (characterobject.vy < 70) {
						characterobject.vx += 2;
						if (characterobject.vx > 40) characterobject.vx = 40;
					}
					if (characterobject.vx > 0) characterobject.vy += rounddown((characterobject.vx + 5) / 10);
					else characterobject.vy += rounddown((characterobject.vx - 5) / 10);
					var k85 = k3 + rounddown(Math.cos(((characterobject.vy + 20) * 3.1415926535897931) / 180) * 192, true, this);
					var l87 = l3 + rounddown(Math.sin(((characterobject.vy + 20) * 3.1415926535897931) / 180) * 192, true, this);
					var i90 = k3 + rounddown(Math.cos(((characterobject.vy - 20) * 3.1415926535897931) / 180) * 192, true, this);
					var l92 = l3 + rounddown(Math.sin(((characterobject.vy - 20) * 3.1415926535897931) / 180) * 192, true, this);
					this.setYukaPosition(String(characterobject.c4), String(k85), String(l87), String(i90), String(l92));
					break;

				case 95: // スウィングバー
					if (
						k3 > this.maps.wx - 180 &&
						k3 < this.maps.wx + this.gg.di.width + 180 &&
						l3 > this.maps.wy - 180 &&
						l3 < this.maps.wy + this.gg.di.height + 180
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 1400;
						if (characterobject.c3 == 0) {
							characterobject.c3 = 1;
							this.maps.putBGCode(rightShiftIgnoreSign(k3, 5), rightShiftIgnoreSign(l3, 5), 50);
						}
					} else {
						characterobject.gf = false;
					}
					if (characterobject.c3 == 1) {
						if (characterobject.vy > 200) {
							characterobject.vx -= 2;
							if (characterobject.vx < -28) characterobject.vx = -28;
						} else if (characterobject.vy < 160) {
							characterobject.vx += 2;
							if (characterobject.vx > 28) characterobject.vx = 28;
						}
					} else if (characterobject.c3 == 2)
						if (characterobject.vy > 380) {
							characterobject.vx -= 2;
							if (characterobject.vx < -28) characterobject.vx = -28;
						} else if (characterobject.vy < 340) {
							characterobject.vx += 2;
							if (characterobject.vx > 28) characterobject.vx = 28;
						}
					if (characterobject.vx > 0) characterobject.vy += rounddown((characterobject.vx + 5) / 10);
					else characterobject.vy += rounddown((characterobject.vx - 5) / 10);
					if (characterobject.c3 == 1) {
						var l85 =
							k3 +
							rounddown(Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 192, true, this) +
							rounddown(Math.cos(((characterobject.vy + 90) * 3.1415926535897931) / 180) * 12, true, this);
						var i88 =
							l3 +
							rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 192, true, this) +
							rounddown(Math.sin(((characterobject.vy + 90) * 3.1415926535897931) / 180) * 12, true, this);
						var j90 =
							k3 +
							rounddown(Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 60, true, this) +
							rounddown(Math.cos(((characterobject.vy + 90) * 3.1415926535897931) / 180) * 12, true, this);
						var i93 =
							l3 +
							rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 60, true, this) +
							rounddown(Math.sin(((characterobject.vy + 90) * 3.1415926535897931) / 180) * 12, true, this);
						this.setYukaPosition(String(characterobject.c4), String(l85), String(i88), String(j90), String(i93));
					} else if (characterobject.c3 == 2) {
						var i86 =
							k3 +
							rounddown(Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 60, true, this) +
							rounddown(Math.cos(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 12, true, this);
						var j88 =
							l3 +
							rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 60, true, this) +
							rounddown(Math.sin(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 12, true, this);
						var k90 =
							k3 +
							rounddown(Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 192, true, this) +
							rounddown(Math.cos(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 12, true, this);
						var j93 =
							l3 +
							rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 192, true, this) +
							rounddown(Math.sin(((characterobject.vy - 90) * 3.1415926535897931) / 180) * 12, true, this);
						this.setYukaPosition(String(characterobject.c4), String(i86), String(j88), String(k90), String(j93));
					}
					break;

				case 100: // 動く床（上下移動）
					if (
						k3 > this.maps.wx - 80 - 32 &&
						k3 < this.maps.wx + this.gg.di.width + 32 &&
						l3 > this.maps.wy - 16 &&
						l3 < this.maps.wy + this.gg.di.height + 32
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (
							(this.co_j.c == 100 || this.co_j.c == 130) &&
							this.co_j.x + 15 >= k3 &&
							this.co_j.x <= k3 + 64 &&
							this.co_j.y == l3 - 32
						)
							this.j_a_id = i;
					} else {
						characterobject.gf = false;
					}
					if (l3 <= characterobject.c3) {
						characterobject.vy++;
						if (characterobject.vy > 5) characterobject.vy = 5;
					} else if (l3 >= characterobject.c4) {
						characterobject.vy--;
						if (characterobject.vy < -5) characterobject.vy = -5;
					}
					l3 += characterobject.vy;
					if (this.co_j.c == 100 || this.co_j.c == 130) {
						if (this.j_a_id == i) this.co_j.y = l3 - 32;
						if (characterobject.vy < 0 && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y) >= 20) {
							this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 5) * 32 + 16;
							this.jShinu(3);
						}
						if (this.co_j.x + 15 >= k3 && this.co_j.x <= k3 + 64 && this.co_j.y + 31 >= l3 && this.co_j.y <= l3 + 13)
							if (characterobject.vy > 0) {
								this.co_j.y = l3 + 14;
								if (
									this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15) == 10 ||
									this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) == 10
								)
									this.j_hashigo_f = true;
								if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 18) {
									this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
									this.jShinu(3);
								}
							} else {
								this.co_j.y = l3 - 32;
								this.j_a_id = i;
							}
					}
					break;

				case 110: // 動く床（左右移動）
					if (
						k3 > this.maps.wx - 80 - 32 &&
						k3 < this.maps.wx + this.gg.di.width + 32 &&
						l3 > this.maps.wy - 16 &&
						l3 < this.maps.wy + this.gg.di.height + 32
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (
							(this.co_j.c == 100 || this.co_j.c == 130) &&
							this.co_j.x + 15 >= k3 &&
							this.co_j.x <= k3 + 64 &&
							this.co_j.y == l3 - 32
						)
							this.j_a_id = i;
					} else {
						characterobject.gf = false;
					}
					if (k3 <= characterobject.c3) {
						characterobject.vx++;
						if (characterobject.vx > 3) characterobject.vx = 3;
					} else if (k3 >= characterobject.c4) {
						characterobject.vx--;
						if (characterobject.vx < -3) characterobject.vx = -3;
					}
					k3 += characterobject.vx;
					if (this.co_j.c == 100 || this.co_j.c == 130) {
						if (this.j_a_id == i) {
							this.co_j.x += characterobject.vx;
							if (characterobject.vx > 0) {
								var l6 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
								var k23 = rightShiftIgnoreSign(this.co_j.y, 5);
								var i47 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
								if (this.maps.map_bg[l6][k23] >= 20 || this.maps.map_bg[l6][i47] >= 20) this.co_j.x = l6 * 32 - 16;
							} else if (characterobject.vx < 0) {
								var i7 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
								var l23 = rightShiftIgnoreSign(this.co_j.y, 5);
								var j47 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
								if (this.maps.map_bg[i7][l23] >= 20 || this.maps.map_bg[i7][j47] >= 20) this.co_j.x = i7 * 32 + 32 - 14;
							}
						}
						if (this.co_j.x + 15 >= k3 && this.co_j.x <= k3 + 64 && this.co_j.y + 31 >= l3 && this.co_j.y <= l3 + 13)
							if (characterobject.vx > 0) {
								this.co_j.x = k3 + 65;
								var j7 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
								var i24 = rightShiftIgnoreSign(this.co_j.y, 5);
								var k47 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
								if (this.maps.map_bg[j7][i24] >= 20 || this.maps.map_bg[j7][k47] >= 20) {
									this.co_j.c = 230;
									this.co_j.x = j7 * 32 - 32 + 11;
									this.co_j.c1 = 0;
									this.j_zan_f = false;
									this.j_jet_c = 0;
									this.j_v_c = 0;
								}
							} else {
								this.co_j.x = k3 - 16;
								var k7 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
								var j24 = rightShiftIgnoreSign(this.co_j.y, 5);
								var l47 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
								if (this.maps.map_bg[k7][j24] >= 20 || this.maps.map_bg[k7][l47] >= 20) {
									this.co_j.c = 230;
									this.co_j.x = k7 * 32 + 32 - 11;
									this.co_j.c1 = 0;
									this.j_zan_f = false;
									this.j_jet_c = 0;
									this.j_v_c = 0;
								}
							}
					}
					break;

				case 120: // 回転する動く床
					if (
						k3 > this.maps.wx - 80 - 32 &&
						k3 < this.maps.wx + this.gg.di.width + 32 &&
						l3 > this.maps.wy - 16 &&
						l3 < this.maps.wy + this.gg.di.height + 32
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (
							(this.co_j.c == 100 || this.co_j.c == 130) &&
							this.co_j.x + 15 >= k3 &&
							this.co_j.x <= k3 + 64 &&
							this.co_j.y == l3 - 32
						)
							this.j_a_id = i;
					} else {
						characterobject.gf = false;
					}
					if (characterobject.muki == 1) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 360) characterobject.c3 -= 360;
					} else {
						characterobject.c3 -= 2;
						if (characterobject.c3 < 0) characterobject.c3 += 360;
					}
					var d2 = (characterobject.c3 * 3.14) / 180;
					var j86 = characterobject.vx + rounddown(Math.cos(d2) * 126, true, this) + 16 - 40;
					var k88 = characterobject.vy + rounddown(Math.sin(d2) * -126, true, this) + 16 - 7;
					var i95 = j86 - k3;
					var j95 = k88 - l3;
					l3 += j95;
					if (this.co_j.c == 100 || this.co_j.c == 130) {
						if (this.j_a_id == i) this.co_j.y += j95;
						if (j95 < 0 && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y) >= 20) {
							this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 5) * 32 + 16;
							this.jShinu(3);
						}
						if (this.co_j.x + 15 >= k3 && this.co_j.x <= k3 + 64 && this.co_j.y + 31 >= l3 && this.co_j.y <= l3 + 13)
							if (j95 > 0) {
								this.co_j.y = l3 + 14;
								if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 18) {
									this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
									this.jShinu(3);
								}
							} else {
								this.co_j.y = l3 - 32;
								this.j_a_id = i;
							}
					}
					k3 += i95;
					if (this.co_j.c == 100 || this.co_j.c == 130) {
						if (this.j_a_id == i) {
							this.co_j.x += i95;
							if (i95 > 0) {
								var l7 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
								var k24 = rightShiftIgnoreSign(this.co_j.y, 5);
								var i48 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
								if (this.maps.map_bg[l7][k24] >= 20 || this.maps.map_bg[l7][i48] >= 20) this.co_j.x = l7 * 32 - 16;
							} else if (i95 < 0) {
								var i8 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
								var l24 = rightShiftIgnoreSign(this.co_j.y, 5);
								var j48 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
								if (this.maps.map_bg[i8][l24] >= 20 || this.maps.map_bg[i8][j48] >= 20) this.co_j.x = i8 * 32 + 32 - 14;
							}
						}
						if (this.co_j.x + 15 >= k3 && this.co_j.x <= k3 + 64 && this.co_j.y + 31 >= l3 && this.co_j.y <= l3 + 13)
							if (i95 > 0) {
								this.co_j.x = k3 + 65;
								var j8 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
								var i25 = rightShiftIgnoreSign(this.co_j.y, 5);
								var k48 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
								if (this.maps.map_bg[j8][i25] >= 20 || this.maps.map_bg[j8][k48] >= 20) {
									this.co_j.c = 230;
									this.co_j.x = j8 * 32 - 32 + 11;
									this.co_j.c1 = 0;
									this.j_zan_f = false;
									this.j_jet_c = 0;
									this.j_v_c = 0;
								}
							} else {
								this.co_j.x = k3 - 16;
								var k8 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
								var j25 = rightShiftIgnoreSign(this.co_j.y, 5);
								var l48 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
								if (this.maps.map_bg[k8][j25] >= 20 || this.maps.map_bg[k8][l48] >= 20) {
									this.co_j.c = 230;
									this.co_j.x = k8 * 32 + 32 - 11;
									this.co_j.c1 = 0;
									this.j_zan_f = false;
									this.j_jet_c = 0;
									this.j_v_c = 0;
								}
							}
					}
					break;

				case 150: // スイッチ式動く床 ＯＮで上か下
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 160: // スイッチ式動く床 ＯＮで右か左
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 300: // 土管
					if (characterobject.c3 >= 200) {
						this.maps.map_bg[rightShiftIgnoreSign(k3, 5)][rightShiftIgnoreSign(l3, 5)] = 31;
						this.maps.map_bg[rightShiftIgnoreSign(k3, 5)][rightShiftIgnoreSign(l3, 5) + 1] = 31;
					} else if (this.j_tokugi == 10 || this.j_tokugi == 12 || this.j_tokugi == 13) {
						this.maps.map_bg[rightShiftIgnoreSign(k3, 5)][rightShiftIgnoreSign(l3, 5)] = 31;
						this.maps.map_bg[rightShiftIgnoreSign(k3, 5) + 1][rightShiftIgnoreSign(l3, 5)] = 31;
					}
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 96 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (
							characterobject.c3 < 200 &&
							this.co_j.c == 100 &&
							this.co_j.x + 15 >= k3 &&
							this.co_j.x <= k3 + 48 &&
							this.co_j.y == l3 - 32
						)
							this.j_a_id = i;
						if (characterobject.c3 >= 100 && characterobject.c3 < 200) {
							if (
								this.co_j.x + 15 >= k3 + 16 &&
								this.co_j.x + 15 <= k3 + 63 - 16 &&
								this.co_j.y >= l3 + 32 &&
								this.co_j.y < l3 + 32 + 16 &&
								characterobject.c4 != 1 &&
								(this.sl_step == 0 ||
									this.sl_step == 1 ||
									this.sl_step == 10 ||
									this.sl_step == 11 ||
									this.dokan_mode != 2)
							) {
								this.co_j.c1 = -10;
								this.co_j.c2 = characterobject.c3;
								this.co_j.c5 = characterobject.c5;
								this.j_zan_f = false;
								this.j_jet_c = 0;
								this.j_v_c = 0;
								this.co_j.c = 300;
								this.co_j.x = k3 + 16;
								this.co_j.y = l3 + 32;
								this.co_j.vx = 0;
								this.co_j.vy = 0;
								characterobject.c4 = 1;
							}
							if (
								this.co_j.c == 100 &&
								(this.co_j.x + 15 < k3 + 16 - 4 ||
									this.co_j.x + 15 > k3 + 63 - 16 + 4 ||
									this.co_j.y < l3 + 32 - 4 ||
									this.co_j.y >= l3 + 32 + 16 + 4)
							)
								characterobject.c4 = 0;
						} else if (characterobject.c3 >= 200 && characterobject.c3 < 300) {
							if (
								this.co_j.x >= k3 - 32 &&
								this.co_j.x + 15 <= k3 + 31 &&
								this.co_j.y > l3 + 16 - 14 &&
								this.co_j.y < l3 + 16 + 14 &&
								characterobject.c4 != 1 &&
								(this.sl_step == 0 ||
									this.sl_step == 1 ||
									this.sl_step == 10 ||
									this.sl_step == 11 ||
									this.dokan_mode != 2)
							) {
								this.co_j.c1 = -10;
								this.co_j.c2 = characterobject.c3;
								this.co_j.c5 = characterobject.c5;
								this.j_zan_f = false;
								this.j_jet_c = 0;
								this.j_v_c = 0;
								this.co_j.c = 300;
								this.co_j.x = k3 - 32;
								this.co_j.y = l3 + 16;
								this.co_j.muki = 1;
								this.co_j.vx = 0;
								this.co_j.vy = 0;
								characterobject.c4 = 1;
							}
							if (
								this.co_j.c == 100 &&
								(this.co_j.x < k3 - 32 - 4 ||
									this.co_j.x + 15 > k3 + 31 + 4 ||
									this.co_j.y <= l3 + 16 - 14 - 1 ||
									this.co_j.y >= l3 + 16 + 14 + 1)
							)
								characterobject.c4 = 0;
						} else if (characterobject.c3 >= 300 && characterobject.c3 < 400) {
							if (
								this.co_j.x <= k3 + 32 &&
								this.co_j.x + 15 >= k3 &&
								this.co_j.y > l3 + 16 - 14 &&
								this.co_j.y < l3 + 16 + 14 &&
								characterobject.c4 != 1 &&
								(this.sl_step == 0 ||
									this.sl_step == 1 ||
									this.sl_step == 10 ||
									this.sl_step == 11 ||
									this.dokan_mode != 2)
							) {
								this.co_j.c1 = -10;
								this.co_j.c2 = characterobject.c3;
								this.co_j.c5 = characterobject.c5;
								this.j_zan_f = false;
								this.j_jet_c = 0;
								this.j_v_c = 0;
								this.co_j.c = 300;
								this.co_j.x = k3 + 32;
								this.co_j.y = l3 + 16;
								this.co_j.muki = 0;
								this.co_j.vx = 0;
								this.co_j.vy = 0;
								characterobject.c4 = 1;
							}
							if (
								this.co_j.c == 100 &&
								(this.co_j.x > k3 + 32 + 4 ||
									this.co_j.x + 15 < k3 - 4 ||
									this.co_j.y <= l3 + 16 - 14 - 1 ||
									this.co_j.y >= l3 + 16 + 14 + 1)
							)
								characterobject.c4 = 0;
						} else {
							if (this.co_j.c == 100 && this.co_j.x + 15 >= k3 && this.co_j.x <= k3 + 48 && this.co_j.y == l3 - 32) {
								this.j_a_id = i;
								if (
									this.co_j.x + 15 >= k3 + 24 &&
									this.co_j.x <= k3 + 48 - 24 &&
									this.co_j.y == l3 - 32 &&
									characterobject.c4 != 1 &&
									(this.sl_step == 0 ||
										this.sl_step == 1 ||
										this.sl_step == 10 ||
										this.sl_step == 11 ||
										this.dokan_mode != 2)
								) {
									this.co_j.c1 = -10;
									this.co_j.c2 = characterobject.c3;
									this.co_j.c5 = characterobject.c5;
									this.j_zan_f = false;
									this.j_jet_c = 0;
									this.j_v_c = 0;
									this.co_j.c = 300;
									this.co_j.x = k3 + 16;
									this.co_j.y = l3 - 32;
									this.co_j.vx = 0;
									this.co_j.vy = 0;
									characterobject.c4 = 1;
								}
							}
							if (this.co_j.c == 100 && this.j_a_id != i) characterobject.c4 = 0;
						}
					} else {
						characterobject.gf = false;
					}
					break;

				case 400: // ドッスンスン
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 64 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (
							(this.co_j.c == 100 || this.co_j.c == 130) &&
							this.co_j.x + 15 >= k3 &&
							this.co_j.x <= k3 + 80 &&
							this.co_j.y == l3 - 32
						)
							this.j_a_id = i;
					} else {
						characterobject.gf = false;
					}
					var byte0 = 0;
					if (characterobject.c3 == 0) {
						if (k3 - 64 < this.co_j.x + 15 && k3 + 96 + 64 > this.co_j.x + 15) characterobject.c3 = 1;
					} else if (characterobject.c3 < 100) {
						characterobject.c3++;
						if (characterobject.c3 > 8) characterobject.c3 = 100;
					} else if (characterobject.c3 == 100) {
						l3 += 12;
						byte0 = 1;
						if (l3 >= characterobject.vy + 128) {
							l3 = characterobject.vy + 128;
							if (this.a_hf) this.gs.rsAddSound(12);
							characterobject.c3 = 200;
						}
					} else if (characterobject.c3 == 200) {
						l3 -= 3;
						byte0 = -1;
						if (l3 <= characterobject.vy) {
							l3 = characterobject.vy;
							characterobject.c3 = 0;
							if (k3 <= this.co_j.x + 15 && k3 + 96 > this.co_j.x + 15) characterobject.c3 = 100;
						}
					}
					if (this.co_j.c == 100 || this.co_j.c == 120 || this.co_j.c == 130 || this.co_j.c == 150) {
						if (this.j_a_id == i) {
							this.co_j.y = l3 - 32;
							if (characterobject.c3 == 200 && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y) >= 20) {
								this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 5) * 32 + 16;
								this.jShinu(3);
							}
						}
						if (this.co_j.x + 15 >= k3 && this.co_j.x <= k3 + 80 && this.co_j.y + 31 >= l3 && this.co_j.y <= l3 + 63) {
							if (byte0 > 0) {
								this.co_j.y = l3 + 64;
								if (
									this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15) == 10 ||
									this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) == 10
								) {
									this.j_hashigo_f = true;
									var j4 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32);
									if (j4 >= 20 || j4 == 15) this.j_hashigo_f = false;
								}
								if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 18) {
									this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
									this.jShinu(3);
								}
							}
							if (byte0 < 0) {
								this.co_j.y = l3 - 32;
								this.j_a_id = i;
								if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y) >= 20) {
									this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 5) * 32 + 16;
									this.jShinu(3);
								}
							}
						}
					}
					break;

				case 410: // FX Update 14以降追加されたドッスンスン
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 64 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (
							(this.co_j.c == 100 || this.co_j.c == 130) &&
							this.co_j.x + 15 >= k3 &&
							this.co_j.x <= k3 + 80 &&
							this.co_j.y == l3 - 32
						)
							this.j_a_id = i;
					} else {
						characterobject.gf = false;
					}
					var byte8 = 0;
					if (characterobject.c4 <= 1) {
						// 上ドッスンスン
						if (characterobject.c3 == 0) {
							if (k3 - 48 < this.co_j.x + 15 && k3 + 96 + 48 > this.co_j.x + 15) {
								var l8 = rightShiftIgnoreSign(k3, 5);
								var k25 = rightShiftIgnoreSign(k3 + 31, 5);
								var i49 = rightShiftIgnoreSign(k3 + 63, 5);
								var i63 = rightShiftIgnoreSign(k3 + 95, 5);
								var j39 = rightShiftIgnoreSign(l3 - 1, 5);
								if (
									this.maps.map_bg[l8][j39] < 18 &&
									this.maps.map_bg[k25][j39] < 18 &&
									this.maps.map_bg[i49][j39] < 18 &&
									this.maps.map_bg[i63][j39] < 18
								)
									characterobject.c3 = 1;
							}
						} else if (characterobject.c3 < 100) {
							characterobject.c3++;
							if (characterobject.c3 > 10) characterobject.c3 = 100;
						} else if (characterobject.c3 == 100) {
							l3 -= 12;
							byte8 = -1;
							if (l3 <= characterobject.vy - 128) {
								l3 = characterobject.vy - 128;
								if (this.a_hf) this.gs.rsAddSound(12);
								characterobject.c3 = 200;
							}
							var i9 = rightShiftIgnoreSign(k3, 5);
							var l25 = rightShiftIgnoreSign(k3 + 31, 5);
							var j49 = rightShiftIgnoreSign(k3 + 63, 5);
							var j63 = rightShiftIgnoreSign(k3 + 95, 5);
							var k39 = rightShiftIgnoreSign(l3 - 1, 5);
							if (
								this.maps.map_bg[i9][k39] >= 18 ||
								this.maps.map_bg[l25][k39] >= 18 ||
								this.maps.map_bg[j49][k39] >= 18 ||
								this.maps.map_bg[j63][k39] >= 18
							) {
								l3 = k39 * 32 + 32;
								characterobject.c3 = 200;
								if (this.a_hf) this.gs.rsAddSound(12);
							}
						} else if (characterobject.c3 == 200) {
							l3 += 3;
							byte8 = 1;
							if (l3 >= characterobject.vy) {
								l3 = characterobject.vy;
								characterobject.c3 = 0;
								if (k3 <= this.co_j.x + 15 && k3 + 96 > this.co_j.x + 15) characterobject.c3 = 100;
							}
						}
					} else if (characterobject.c4 == 2) {
						// 左ドッスンスン
						if (characterobject.c3 == 0) {
							if (
								characterobject.vx - 160 - 40 <= this.co_j.x + 15 &&
								characterobject.vx > this.co_j.x + 15 &&
								l3 - 32 < this.co_j.y &&
								l3 + 64 > this.co_j.y
							) {
								var j9 = rightShiftIgnoreSign(k3 - 1, 5);
								var i26 = rightShiftIgnoreSign(l3, 5);
								var k49 = rightShiftIgnoreSign(l3 + 31, 5);
								var k63 = rightShiftIgnoreSign(l3 + 63, 5);
								if (this.maps.map_bg[j9][i26] < 18 && this.maps.map_bg[j9][k49] < 18 && this.maps.map_bg[j9][k63] < 18)
									characterobject.c3 = 1;
							}
						} else if (characterobject.c3 < 100) {
							characterobject.c3++;
							if (characterobject.c3 > 10) characterobject.c3 = 100;
						} else if (characterobject.c3 == 100) {
							k3 -= 12;
							if (k3 <= characterobject.vx - 160) {
								k3 = characterobject.vx - 160;
								if (this.a_hf) this.gs.rsAddSound(12);
								characterobject.c3 = 200;
							}
							var k9 = rightShiftIgnoreSign(k3 - 1, 5);
							var j26 = rightShiftIgnoreSign(l3, 5);
							var l49 = rightShiftIgnoreSign(l3 + 31, 5);
							var l63 = rightShiftIgnoreSign(l3 + 63, 5);
							if (
								this.maps.map_bg[k9][j26] >= 18 ||
								this.maps.map_bg[k9][l49] >= 18 ||
								this.maps.map_bg[k9][l63] >= 18
							) {
								k3 = k9 * 32 + 32;
								characterobject.c3 = 200;
								if (this.a_hf) this.gs.rsAddSound(12);
							}
						} else if (characterobject.c3 == 200) {
							k3 += 3;
							if (k3 >= characterobject.vx) {
								k3 = characterobject.vx;
								characterobject.c3 = 0;
								if (
									characterobject.vx - 160 - 40 <= this.co_j.x + 15 &&
									characterobject.vx > this.co_j.x + 15 &&
									l3 - 32 < this.co_j.y &&
									l3 + 64 > this.co_j.y
								)
									characterobject.c3 = 100;
							}
						}
					} else if (characterobject.c4 == 3) {
						// 右ドッスンスン
						if (characterobject.c3 == 0) {
							if (
								characterobject.vx + 96 + 160 + 40 > this.co_j.x + 15 &&
								characterobject.vx + 96 <= this.co_j.x + 15 &&
								l3 - 32 < this.co_j.y &&
								l3 + 64 > this.co_j.y
							) {
								var l9 = rightShiftIgnoreSign(k3 + 96, 5);
								var k26 = rightShiftIgnoreSign(l3, 5);
								var i50 = rightShiftIgnoreSign(l3 + 31, 5);
								var i64 = rightShiftIgnoreSign(l3 + 63, 5);
								if (this.maps.map_bg[l9][k26] < 18 && this.maps.map_bg[l9][i50] < 18 && this.maps.map_bg[l9][i64] < 18)
									characterobject.c3 = 1;
							}
						} else if (characterobject.c3 < 100) {
							characterobject.c3++;
							if (characterobject.c3 > 10) characterobject.c3 = 100;
						} else if (characterobject.c3 == 100) {
							k3 += 12;
							if (k3 >= characterobject.vx + 160) {
								k3 = characterobject.vx + 160;
								if (this.a_hf) this.gs.rsAddSound(12);
								characterobject.c3 = 200;
							}
							var i10 = rightShiftIgnoreSign(k3 + 96, 5);
							var l26 = rightShiftIgnoreSign(l3, 5);
							var j50 = rightShiftIgnoreSign(l3 + 31, 5);
							var j64 = rightShiftIgnoreSign(l3 + 63, 5);
							if (
								this.maps.map_bg[i10][l26] >= 18 ||
								this.maps.map_bg[i10][j50] >= 18 ||
								this.maps.map_bg[i10][j64] >= 18
							) {
								k3 = i10 * 32 - 96;
								characterobject.c3 = 200;
								if (this.a_hf) this.gs.rsAddSound(12);
							}
						} else if (characterobject.c3 == 200) {
							k3 -= 3;
							if (k3 <= characterobject.vx) {
								k3 = characterobject.vx;
								characterobject.c3 = 0;
								if (
									characterobject.vx + 96 + 160 + 40 > this.co_j.x + 15 &&
									characterobject.vx + 96 <= this.co_j.x + 15 &&
									l3 - 32 < this.co_j.y &&
									l3 + 64 > this.co_j.y
								)
									characterobject.c3 = 100;
							}
						}
					} else if (characterobject.c4 == 4) {
						// 跳ねるドッスンスン
						characterobject.c1 = k3 - this.gg.di.width - 32 - 128;
						characterobject.c2 = k3 + 128 + 128;
						k3 += characterobject.vx;
						if (characterobject.vx < 0) {
							var j10 = rightShiftIgnoreSign(k3, 5);
							var i27 = rightShiftIgnoreSign(l3, 5);
							var k50 = rightShiftIgnoreSign(l3 + 31, 5);
							var k64 = rightShiftIgnoreSign(l3 + 63, 5);
							if (
								this.maps.map_bg[j10][i27] >= 18 ||
								this.maps.map_bg[j10][k50] >= 18 ||
								this.maps.map_bg[j10][k64] >= 18
							) {
								k3 = j10 * 32 + 32;
								characterobject.vx = 3;
							}
						} else if (characterobject.vx > 0) {
							var k10 = rightShiftIgnoreSign(k3 + 95, 5);
							var j27 = rightShiftIgnoreSign(l3, 5);
							var l50 = rightShiftIgnoreSign(l3 + 31, 5);
							var l64 = rightShiftIgnoreSign(l3 + 63, 5);
							if (
								this.maps.map_bg[k10][j27] >= 18 ||
								this.maps.map_bg[k10][l50] >= 18 ||
								this.maps.map_bg[k10][l64] >= 18
							) {
								k3 = k10 * 32 - 96;
								characterobject.vx = -3;
							}
						}
					} else if (characterobject.c4 == 5) {
						// 上がらないドッスンスン
						if (characterobject.c3 == 0) {
							if (
								k3 - 48 < this.co_j.x + 15 &&
								k3 + 96 + 48 > this.co_j.x + 15 &&
								this.co_j.y >= l3 + 64 &&
								this.co_j.y <= l3 + 64 + 96
							) {
								var l10 = rightShiftIgnoreSign(k3, 5);
								var k27 = rightShiftIgnoreSign(k3 + 31, 5);
								var i51 = rightShiftIgnoreSign(k3 + 63, 5);
								var i65 = rightShiftIgnoreSign(k3 + 95, 5);
								var l39 = rightShiftIgnoreSign(l3 + 64, 5);
								if (
									this.maps.map_bg[l10][l39] < 18 &&
									this.maps.map_bg[k27][l39] < 18 &&
									this.maps.map_bg[i51][l39] < 18 &&
									this.maps.map_bg[i65][l39] < 18
								)
									characterobject.c3 = 1;
							}
						} else if (characterobject.c3 < 100) {
							characterobject.c3++;
							if (characterobject.c3 > 4) characterobject.c3 = 100;
						} else if (characterobject.c3 == 100) {
							l3 += 8;
							byte8 = 1;
							var i11 = rightShiftIgnoreSign(k3, 5);
							var l27 = rightShiftIgnoreSign(k3 + 31, 5);
							var j51 = rightShiftIgnoreSign(k3 + 63, 5);
							var j65 = rightShiftIgnoreSign(k3 + 95, 5);
							var i40 = rightShiftIgnoreSign(l3 + 63, 5);
							if (
								this.maps.map_bg[i11][i40] >= 18 ||
								this.maps.map_bg[l27][i40] >= 18 ||
								this.maps.map_bg[j51][i40] >= 18 ||
								this.maps.map_bg[j65][i40] >= 18
							) {
								l3 = i40 * 32 - 64;
								characterobject.c3 = 200;
							}
							if (l3 >= this.ochiru_y) {
								characterobject.c = 0;
								break;
							}
						} else if (characterobject.c3 == 200) {
						}
					} else if (characterobject.c4 == 6) {
						// 	エレベータードッスンスン 上
						if (characterobject.c3 == 0) {
							if (this.j_a_id == i) {
								var j11 = rightShiftIgnoreSign(k3, 5);
								var i28 = rightShiftIgnoreSign(k3 + 31, 5);
								var k51 = rightShiftIgnoreSign(k3 + 63, 5);
								var k65 = rightShiftIgnoreSign(k3 + 95, 5);
								var j40 = rightShiftIgnoreSign(l3 - 1, 5);
								if (
									this.maps.map_bg[j11][j40] < 18 &&
									this.maps.map_bg[i28][j40] < 18 &&
									this.maps.map_bg[k51][j40] < 18 &&
									this.maps.map_bg[k65][j40] < 18
								)
									characterobject.c3 = 100;
							}
						} else if (characterobject.c3 == 100) {
							l3 -= 4;
							byte8 = -1;
							var k11 = rightShiftIgnoreSign(k3, 5);
							var j28 = rightShiftIgnoreSign(k3 + 31, 5);
							var l51 = rightShiftIgnoreSign(k3 + 63, 5);
							var l65 = rightShiftIgnoreSign(k3 + 95, 5);
							var k40 = rightShiftIgnoreSign(l3 - 32, 5);
							if (
								this.maps.map_bg[k11][k40] >= 18 ||
								this.maps.map_bg[j28][k40] >= 18 ||
								this.maps.map_bg[l51][k40] >= 18 ||
								this.maps.map_bg[l65][k40] >= 18
							) {
								l3 = k40 * 32 + 64;
								characterobject.c3 = 200;
							}
							if (l3 <= 352) {
								l3 = 352;
								characterobject.c3 = 200;
							}
						} else if (characterobject.c3 == 200) {
							if (this.j_a_id != i) characterobject.c3 = 201;
						} else if (characterobject.c3 < 300) {
							characterobject.c3++;
							if (characterobject.c3 > 212) characterobject.c3 = 300;
						} else if (characterobject.c3 == 300) {
							l3 += 4;
							byte8 = 1;
							if (l3 >= characterobject.vy) {
								l3 = characterobject.vy;
								characterobject.c3 = 0;
							}
						}
					} else if (characterobject.c4 == 7) {
						// エレベータードッスンスン 下
						if (characterobject.c3 == 0) {
							if (this.j_a_id == i) {
								var l11 = rightShiftIgnoreSign(k3, 5);
								var k28 = rightShiftIgnoreSign(k3 + 31, 5);
								var i52 = rightShiftIgnoreSign(k3 + 63, 5);
								var i66 = rightShiftIgnoreSign(k3 + 95, 5);
								var l40 = rightShiftIgnoreSign(l3 + 64, 5);
								if (
									this.maps.map_bg[l11][l40] < 18 &&
									this.maps.map_bg[k28][l40] < 18 &&
									this.maps.map_bg[i52][l40] < 18 &&
									this.maps.map_bg[i66][l40] < 18
								)
									characterobject.c3 = 100;
							}
						} else if (characterobject.c3 == 100) {
							l3 += 4;
							byte8 = 1;
							var i12 = rightShiftIgnoreSign(k3, 5);
							var l28 = rightShiftIgnoreSign(k3 + 31, 5);
							var j52 = rightShiftIgnoreSign(k3 + 63, 5);
							var j66 = rightShiftIgnoreSign(k3 + 95, 5);
							var i41 = rightShiftIgnoreSign(l3 + 64, 5);
							if (
								this.maps.map_bg[i12][i41] >= 18 ||
								this.maps.map_bg[l28][i41] >= 18 ||
								this.maps.map_bg[j52][i41] >= 18 ||
								this.maps.map_bg[j66][i41] >= 18
							) {
								l3 = i41 * 32 - 64;
								characterobject.c3 = 200;
							}
							if (l3 >= this.ochiru_y - 32) {
								l3 = this.ochiru_y - 32;
								characterobject.c3 = 200;
							}
						} else if (characterobject.c3 == 200) {
							if (this.j_a_id != i) characterobject.c3 = 201;
						} else if (characterobject.c3 < 300) {
							characterobject.c3++;
							if (characterobject.c3 > 212) characterobject.c3 = 300;
						} else if (characterobject.c3 == 300) {
							l3 -= 4;
							byte8 = -1;
							if (l3 <= characterobject.vy) {
								l3 = characterobject.vy;
								characterobject.c3 = 0;
							}
						}
					} else if (characterobject.c4 == 8) {
						// 上下ドッスンスン
						if (characterobject.c3 == 0) {
							if (k3 - 48 < this.co_j.x + 15 && k3 + 96 + 48 > this.co_j.x + 15 && l3 - 16 >= this.co_j.y) {
								var j12 = rightShiftIgnoreSign(k3, 5);
								var i29 = rightShiftIgnoreSign(k3 + 31, 5);
								var k52 = rightShiftIgnoreSign(k3 + 63, 5);
								var k66 = rightShiftIgnoreSign(k3 + 95, 5);
								var j41 = rightShiftIgnoreSign(l3 - 1, 5);
								if (
									this.maps.map_bg[j12][j41] < 18 &&
									this.maps.map_bg[i29][j41] < 18 &&
									this.maps.map_bg[k52][j41] < 18 &&
									this.maps.map_bg[k66][j41] < 18
								)
									characterobject.c3 = 1;
							}
							if (k3 - 48 < this.co_j.x + 15 && k3 + 96 + 48 > this.co_j.x + 15 && l3 + 48 <= this.co_j.y) {
								var k12 = rightShiftIgnoreSign(k3, 5);
								var j29 = rightShiftIgnoreSign(k3 + 31, 5);
								var l52 = rightShiftIgnoreSign(k3 + 63, 5);
								var l66 = rightShiftIgnoreSign(k3 + 95, 5);
								var k41 = rightShiftIgnoreSign(l3 + 64, 5);
								if (
									this.maps.map_bg[k12][k41] < 18 &&
									this.maps.map_bg[j29][k41] < 18 &&
									this.maps.map_bg[l52][k41] < 18 &&
									this.maps.map_bg[l66][k41] < 18
								)
									characterobject.c3 = 1001;
							}
						} else if (characterobject.c3 < 100) {
							characterobject.c3++;
							if (characterobject.c3 > 10) characterobject.c3 = 100;
						} else if (characterobject.c3 == 100) {
							l3 -= 12;
							byte8 = -1;
							if (l3 <= characterobject.vy - 128) {
								l3 = characterobject.vy - 128;
								if (this.a_hf) this.gs.rsAddSound(12);
								characterobject.c3 = 200;
							}
							var l12 = rightShiftIgnoreSign(k3, 5);
							var k29 = rightShiftIgnoreSign(k3 + 31, 5);
							var i53 = rightShiftIgnoreSign(k3 + 63, 5);
							var i67 = rightShiftIgnoreSign(k3 + 95, 5);
							var l41 = rightShiftIgnoreSign(l3 - 1, 5);
							if (
								this.maps.map_bg[l12][l41] >= 18 ||
								this.maps.map_bg[k29][l41] >= 18 ||
								this.maps.map_bg[i53][l41] >= 18 ||
								this.maps.map_bg[i67][l41] >= 18
							) {
								l3 = l41 * 32 + 32;
								characterobject.c3 = 200;
								if (this.a_hf) this.gs.rsAddSound(12);
							}
						} else if (characterobject.c3 == 200) {
							l3 += 3;
							byte8 = 1;
							if (l3 >= characterobject.vy) {
								l3 = characterobject.vy;
								characterobject.c3 = 0;
								if (k3 - 48 < this.co_j.x + 15 && k3 + 96 + 48 > this.co_j.x + 15 && l3 - 16 >= this.co_j.y)
									characterobject.c3 = 100;
							}
						} else if (characterobject.c3 < 1100) {
							characterobject.c3++;
							if (characterobject.c3 > 1010) characterobject.c3 = 1100;
						} else if (characterobject.c3 == 1100) {
							l3 += 12;
							byte8 = 1;
							if (l3 >= characterobject.vy + 128) {
								l3 = characterobject.vy + 128;
								if (this.a_hf) this.gs.rsAddSound(12);
								characterobject.c3 = 1200;
							}
							var i13 = rightShiftIgnoreSign(k3, 5);
							var l29 = rightShiftIgnoreSign(k3 + 31, 5);
							var j53 = rightShiftIgnoreSign(k3 + 63, 5);
							var j67 = rightShiftIgnoreSign(k3 + 95, 5);
							var i42 = rightShiftIgnoreSign(l3 + 64, 5);
							if (
								this.maps.map_bg[i13][i42] >= 18 ||
								this.maps.map_bg[l29][i42] >= 18 ||
								this.maps.map_bg[j53][i42] >= 18 ||
								this.maps.map_bg[j67][i42] >= 18
							) {
								l3 = i42 * 32 - 64;
								characterobject.c3 = 1200;
								if (this.a_hf) this.gs.rsAddSound(12);
							}
						} else if (characterobject.c3 == 1200) {
							l3 -= 3;
							byte8 = -1;
							if (l3 <= characterobject.vy) {
								l3 = characterobject.vy;
								characterobject.c3 = 0;
								if (k3 - 48 < this.co_j.x + 15 && k3 + 96 + 48 > this.co_j.x + 15 && l3 + 48 <= this.co_j.y)
									characterobject.c3 = 1100;
							}
						}
					} else if (characterobject.c4 == 9) {
						// 左右ドッスンスン
						if (characterobject.c3 == 0) {
							if (
								characterobject.vx - 160 - 40 <= this.co_j.x + 15 &&
								characterobject.vx > this.co_j.x + 15 &&
								l3 - 32 < this.co_j.y &&
								l3 + 64 > this.co_j.y
							) {
								var j13 = rightShiftIgnoreSign(k3 - 1, 5);
								var i30 = rightShiftIgnoreSign(l3, 5);
								var k53 = rightShiftIgnoreSign(l3 + 31, 5);
								var k67 = rightShiftIgnoreSign(l3 + 63, 5);
								if (
									this.maps.map_bg[j13][i30] < 18 &&
									this.maps.map_bg[j13][k53] < 18 &&
									this.maps.map_bg[j13][k67] < 18
								)
									characterobject.c3 = 1;
							}
							if (
								characterobject.vx + 96 + 160 + 40 > this.co_j.x + 15 &&
								characterobject.vx + 96 <= this.co_j.x + 15 &&
								l3 - 32 < this.co_j.y &&
								l3 + 64 > this.co_j.y
							) {
								var k13 = rightShiftIgnoreSign(k3 + 96, 5);
								var j30 = rightShiftIgnoreSign(l3, 5);
								var l53 = rightShiftIgnoreSign(l3 + 31, 5);
								var l67 = rightShiftIgnoreSign(l3 + 63, 5);
								if (
									this.maps.map_bg[k13][j30] < 18 &&
									this.maps.map_bg[k13][l53] < 18 &&
									this.maps.map_bg[k13][l67] < 18
								)
									characterobject.c3 = 1001;
							}
						} else if (characterobject.c3 < 100) {
							characterobject.c3++;
							if (characterobject.c3 > 10) characterobject.c3 = 100;
						} else if (characterobject.c3 == 100) {
							k3 -= 12;
							if (k3 <= characterobject.vx - 160) {
								k3 = characterobject.vx - 160;
								if (this.a_hf) this.gs.rsAddSound(12);
								characterobject.c3 = 200;
							}
							var l13 = rightShiftIgnoreSign(k3 - 1, 5);
							var k30 = rightShiftIgnoreSign(l3, 5);
							var i54 = rightShiftIgnoreSign(l3 + 31, 5);
							var i68 = rightShiftIgnoreSign(l3 + 63, 5);
							if (
								this.maps.map_bg[l13][k30] >= 18 ||
								this.maps.map_bg[l13][i54] >= 18 ||
								this.maps.map_bg[l13][i68] >= 18
							) {
								k3 = l13 * 32 + 32;
								characterobject.c3 = 200;
								if (this.a_hf) this.gs.rsAddSound(12);
							}
						} else if (characterobject.c3 == 200) {
							k3 += 3;
							if (k3 >= characterobject.vx) {
								k3 = characterobject.vx;
								characterobject.c3 = 0;
								if (
									characterobject.vx - 160 - 40 <= this.co_j.x + 15 &&
									characterobject.vx > this.co_j.x + 15 &&
									l3 - 32 < this.co_j.y &&
									l3 + 64 > this.co_j.y
								)
									characterobject.c3 = 100;
							}
						} else if (characterobject.c3 < 1100) {
							characterobject.c3++;
							if (characterobject.c3 > 10) characterobject.c3 = 1100;
						} else if (characterobject.c3 == 1100) {
							k3 += 12;
							if (k3 >= characterobject.vx + 160) {
								k3 = characterobject.vx + 160;
								if (this.a_hf) this.gs.rsAddSound(12);
								characterobject.c3 = 1200;
							}
							var i14 = rightShiftIgnoreSign(k3 + 96, 5);
							var l30 = rightShiftIgnoreSign(l3, 5);
							var j54 = rightShiftIgnoreSign(l3 + 31, 5);
							var j68 = rightShiftIgnoreSign(l3 + 63, 5);
							if (
								this.maps.map_bg[i14][l30] >= 18 ||
								this.maps.map_bg[i14][j54] >= 18 ||
								this.maps.map_bg[i14][j68] >= 18
							) {
								k3 = i14 * 32 - 96;
								characterobject.c3 = 1200;
								if (this.a_hf) this.gs.rsAddSound(12);
							}
						} else if (characterobject.c3 == 1200) {
							k3 -= 3;
							if (k3 <= characterobject.vx) {
								k3 = characterobject.vx;
								characterobject.c3 = 0;
								if (
									characterobject.vx + 96 + 160 + 40 > this.co_j.x + 15 &&
									characterobject.vx + 96 <= this.co_j.x + 15 &&
									l3 - 32 < this.co_j.y &&
									l3 + 64 > this.co_j.y
								)
									characterobject.c3 = 1100;
							}
						}
					} else if (characterobject.c4 == 10) {
						// ロングレンジドッスンスン
						if (characterobject.c3 == 0) {
							if (k3 - 48 < this.co_j.x + 15 && k3 + 96 + 48 > this.co_j.x + 15 && l3 + 48 <= this.co_j.y) {
								var j14 = rightShiftIgnoreSign(k3, 5);
								var i31 = rightShiftIgnoreSign(k3 + 31, 5);
								var k54 = rightShiftIgnoreSign(k3 + 63, 5);
								var k68 = rightShiftIgnoreSign(k3 + 95, 5);
								var j42 = rightShiftIgnoreSign(l3 + 64, 5);
								if (
									this.maps.map_bg[j14][j42] < 18 &&
									this.maps.map_bg[i31][j42] < 18 &&
									this.maps.map_bg[k54][j42] < 18 &&
									this.maps.map_bg[k68][j42] < 18
								)
									characterobject.c3 = 1;
							}
						} else if (characterobject.c3 < 100) {
							characterobject.c3++;
							if (characterobject.c3 > 10) characterobject.c3 = 100;
						} else if (characterobject.c3 == 100) {
							l3 += 12;
							byte8 = 1;
							var k14 = rightShiftIgnoreSign(k3, 5);
							var j31 = rightShiftIgnoreSign(k3 + 31, 5);
							var l54 = rightShiftIgnoreSign(k3 + 63, 5);
							var l68 = rightShiftIgnoreSign(k3 + 95, 5);
							var k42 = rightShiftIgnoreSign(l3 + 64, 5);
							if (
								this.maps.map_bg[k14][k42] >= 18 ||
								this.maps.map_bg[j31][k42] >= 18 ||
								this.maps.map_bg[l54][k42] >= 18 ||
								this.maps.map_bg[l68][k42] >= 18
							) {
								l3 = k42 * 32 - 64;
								characterobject.c3 = 200;
								if (this.a_hf) this.gs.rsAddSound(12);
							}
							if (l3 >= this.ochiru_y - 32) {
								l3 = this.ochiru_y - 32;
								characterobject.c3 = 200;
								if (this.a_hf) this.gs.rsAddSound(12);
							}
						} else if (characterobject.c3 == 200) {
							l3 -= 3;
							byte8 = -1;
							if (l3 <= characterobject.vy) {
								l3 = characterobject.vy;
								characterobject.c3 = 0;
								if (k3 <= this.co_j.x + 15 && k3 + 96 > this.co_j.x + 15 && l3 + 48 <= this.co_j.y)
									characterobject.c3 = 100;
							}
						}
					} else if (characterobject.c4 == 11) {
						// 壁まで上下移動するドッスンスン
						if (characterobject.c3 == 0) {
							l3 -= 4;
							byte8 = -1;
							var l14 = rightShiftIgnoreSign(k3, 5);
							var k31 = rightShiftIgnoreSign(k3 + 31, 5);
							var i55 = rightShiftIgnoreSign(k3 + 63, 5);
							var i69 = rightShiftIgnoreSign(k3 + 95, 5);
							var l42 = rightShiftIgnoreSign(l3, 5);
							if (
								this.maps.map_bg[l14][l42] >= 18 ||
								this.maps.map_bg[k31][l42] >= 18 ||
								this.maps.map_bg[i55][l42] >= 18 ||
								this.maps.map_bg[i69][l42] >= 18
							) {
								l3 = l42 * 32 + 32;
								characterobject.c3 = 1;
							}
							if (l3 <= 320) {
								l3 = 320;
								characterobject.c3 = 1;
							}
						} else {
							l3 += 4;
							byte8 = 1;
							var i15 = rightShiftIgnoreSign(k3, 5);
							var l31 = rightShiftIgnoreSign(k3 + 31, 5);
							var j55 = rightShiftIgnoreSign(k3 + 63, 5);
							var j69 = rightShiftIgnoreSign(k3 + 95, 5);
							var i43 = rightShiftIgnoreSign(l3 + 64, 5);
							if (
								this.maps.map_bg[i15][i43] >= 18 ||
								this.maps.map_bg[l31][i43] >= 18 ||
								this.maps.map_bg[j55][i43] >= 18 ||
								this.maps.map_bg[j69][i43] >= 18
							) {
								l3 = i43 * 32 - 64;
								characterobject.c3 = 0;
							}
							if (l3 >= this.ochiru_y - 32) {
								l3 = this.ochiru_y - 32;
								characterobject.c3 = 0;
							}
						}
					} else if (characterobject.c4 == 12) {
						// 壁まで左右移動するドッスンスン
						var j15 = rightShiftIgnoreSign(k3 + 47, 5);
						var i32 = rightShiftIgnoreSign(l3 + 63, 5);
						if (this.maps.map_bg[j15][i32] == 19) {
							if (characterobject.c3 == 0) {
								if (rightShiftIgnoreSign(k3 + 47, 5) != rightShiftIgnoreSign(k3 + 47 - 4, 5))
									l3 = rightShiftIgnoreSign(l3 + 63, 5) * 32 - 64;
								k3 -= 4;
								j15 = rightShiftIgnoreSign(k3 + 47, 5);
								i32 = rightShiftIgnoreSign(l3 + 63, 5);
								if (this.maps.map_bg[j15][i32] == 19 || this.maps.map_bg[j15][i32] == 18)
									l3 = this.getSakamichiY(k3 + 47, l3 + 63) - 32;
							} else {
								if (rightShiftIgnoreSign(k3 + 47, 5) != rightShiftIgnoreSign(k3 + 47 + 4, 5))
									l3 = rightShiftIgnoreSign(l3 + 63, 5) * 32 - 32;
								k3 += 4;
								j15 = rightShiftIgnoreSign(k3 + 47, 5);
								i32 = rightShiftIgnoreSign(l3 + 63, 5);
								if (this.maps.map_bg[j15][i32] == 19 || this.maps.map_bg[j15][i32] == 18)
									l3 = this.getSakamichiY(k3 + 47, l3 + 63) - 32;
								j15 = rightShiftIgnoreSign(k3 + 47, 5);
								i32 = rightShiftIgnoreSign(l3 + 64, 5);
								if (this.maps.map_bg[j15][i32] == 19) l3 = this.getSakamichiY(k3 + 47, l3 + 64) - 32;
							}
						} else if (this.maps.map_bg[j15][i32] == 18) {
							if (characterobject.c3 != 0) {
								if (rightShiftIgnoreSign(k3 + 47, 5) != rightShiftIgnoreSign(k3 + 47 + 4, 5))
									l3 = rightShiftIgnoreSign(l3 + 63, 5) * 32 - 64;
								k3 += 4;
								var k15 = rightShiftIgnoreSign(k3 + 47, 5);
								var j32 = rightShiftIgnoreSign(l3 + 63, 5);
								if (this.maps.map_bg[k15][j32] == 19 || this.maps.map_bg[k15][j32] == 18)
									l3 = this.getSakamichiY(k3 + 47, l3 + 63) - 32;
							} else {
								if (rightShiftIgnoreSign(k3 + 47, 5) != rightShiftIgnoreSign(k3 + 47 - 4, 5))
									l3 = rightShiftIgnoreSign(l3 + 63, 5) * 32 - 32;
								k3 -= 4;
								var l15 = rightShiftIgnoreSign(k3 + 47, 5);
								var k32 = rightShiftIgnoreSign(l3 + 63, 5);
								if (this.maps.map_bg[l15][k32] == 19 || this.maps.map_bg[l15][k32] == 18)
									l3 = this.getSakamichiY(k3 + 47, l3 + 63) - 32;
								l15 = rightShiftIgnoreSign(k3 + 47, 5);
								k32 = rightShiftIgnoreSign(l3 + 64, 5);
								if (this.maps.map_bg[l15][k32] == 18) l3 = this.getSakamichiY(k3 + 47, l3 + 64) - 32;
							}
						} else if (characterobject.c3 == 0) {
							k3 -= 4;
							var i16 = rightShiftIgnoreSign(k3 + 47, 5);
							var l32 = rightShiftIgnoreSign(l3 + 64, 5);
							if (this.maps.map_bg[i16][l32] == 18) l3 = this.getSakamichiY(k3 + 47, l3 + 64) - 32;
							i16 = rightShiftIgnoreSign(k3 - 1, 5);
							l32 = rightShiftIgnoreSign(l3, 5);
							var k55 = rightShiftIgnoreSign(l3 + 31, 5);
							var k69 = rightShiftIgnoreSign(l3 + 63, 5);
							if (
								this.maps.map_bg[rightShiftIgnoreSign(k3 + 16, 5)][k69] == 19 ||
								this.maps.map_bg[rightShiftIgnoreSign(k3 + 32, 5)][k69] == 19
							) {
								if (this.maps.map_bg[i16][l32] >= 20) {
									k3 = i16 * 32 + 32;
									characterobject.c3 = 1;
								}
							} else if (
								this.maps.map_bg[i16][l32] >= 20 ||
								this.maps.map_bg[i16][k55] >= 20 ||
								this.maps.map_bg[i16][k69] >= 20
							) {
								k3 = i16 * 32 + 32;
								characterobject.c3 = 1;
							}
						} else {
							k3 += 4;
							var j16 = rightShiftIgnoreSign(k3 + 47, 5);
							var i33 = rightShiftIgnoreSign(l3 + 64, 5);
							if (this.maps.map_bg[j16][i33] == 19) l3 = this.getSakamichiY(k3 + 47, l3 + 64) - 32;
							j16 = rightShiftIgnoreSign(k3 + 96, 5);
							i33 = rightShiftIgnoreSign(l3, 5);
							var l55 = rightShiftIgnoreSign(l3 + 31, 5);
							var l69 = rightShiftIgnoreSign(l3 + 63, 5);
							if (
								this.maps.map_bg[rightShiftIgnoreSign(k3 + 96 - 16, 5)][l69] == 18 ||
								this.maps.map_bg[rightShiftIgnoreSign(k3 + 96 - 32, 5)][l69] == 18
							) {
								if (this.maps.map_bg[j16][i33] >= 20) {
									k3 = j16 * 32 - 96;
									characterobject.c3 = 0;
								}
							} else if (
								this.maps.map_bg[j16][i33] >= 20 ||
								this.maps.map_bg[j16][l55] >= 20 ||
								this.maps.map_bg[j16][l69] >= 20
							) {
								k3 = j16 * 32 - 96;
								characterobject.c3 = 0;
							}
						}
						characterobject.vy = l3;
						l3 = characterobject.y;
					} else if (characterobject.c4 == 13) {
						// 乗ると左右移動するドッスンスン
						if (characterobject.c3 == 0 && this.j_a_id == i) {
							characterobject.c4 = 12;
							characterobject.c3 = 1;
							characterobject.vy = l3;
						}
					} else if (characterobject.c4 == 14) {
						// 動かないドッスンスン
						var k16 = rightShiftIgnoreSign(k3, 5);
						var j33 = rightShiftIgnoreSign(k3 + 31, 5);
						var i56 = rightShiftIgnoreSign(k3 + 63, 5);
						var i70 = rightShiftIgnoreSign(k3 + 95, 5);
						var j43 = rightShiftIgnoreSign(l3 + 64, 5);
						if (
							this.maps.map_bg[k16][j43] >= 18 ||
							this.maps.map_bg[j33][j43] >= 18 ||
							this.maps.map_bg[i56][j43] >= 18 ||
							this.maps.map_bg[i70][j43] >= 18
						) {
							l3 = j43 * 32 - 64;
							var j = 0;
							do {
								if (j > 29) break;
								var k43 = rightShiftIgnoreSign(l3 + 63, 5);
								if (
									this.maps.map_bg[k16][k43] < 18 &&
									this.maps.map_bg[j33][k43] < 18 &&
									this.maps.map_bg[i56][k43] < 18 &&
									this.maps.map_bg[i70][k43] < 18
								)
									break;
								l3 = k43 * 32 - 64;
								byte8 = -1;
								j++;
							} while (true);
						} else {
							l3 += 4;
							byte8 = 1;
							var l16 = rightShiftIgnoreSign(k3, 5);
							var k33 = rightShiftIgnoreSign(k3 + 31, 5);
							var j56 = rightShiftIgnoreSign(k3 + 63, 5);
							var j70 = rightShiftIgnoreSign(k3 + 95, 5);
							var l43 = rightShiftIgnoreSign(l3 + 64, 5);
							if (
								this.maps.map_bg[l16][l43] >= 18 ||
								this.maps.map_bg[k33][l43] >= 18 ||
								this.maps.map_bg[j56][l43] >= 18 ||
								this.maps.map_bg[j70][l43] >= 18
							) {
								l3 = l43 * 32 - 64;
								characterobject.c3 = 0;
							}
							if (l3 >= this.ochiru_y) {
								l3 = this.ochiru_y;
								characterobject.c = 0;
							}
						}
					} else if (characterobject.c4 == 15) {
						// 落ちるだけのドッスンスン
						if (this.co_j.x >= k3 && this.co_j.x <= k3 + 64 && this.co_j.y >= l3 + 64) characterobject.c4 = 14;
					} else if (characterobject.c4 == 16) {
						// 左右へ押せるドッスンスン
						if (this.souko_count3 == 1) characterobject.pt = 3400;
						else characterobject.pt = 400;
						var i17 = rightShiftIgnoreSign(k3, 5);
						var l33 = rightShiftIgnoreSign(k3 + 31, 5);
						var k56 = rightShiftIgnoreSign(k3 + 63, 5);
						var k70 = rightShiftIgnoreSign(k3 + 95, 5);
						var i44 = rightShiftIgnoreSign(l3 + 64, 5);
						if (characterobject.vx != 1)
							if (
								this.maps.map_bg[i17][i44] >= 18 ||
								this.maps.map_bg[l33][i44] >= 18 ||
								this.maps.map_bg[k56][i44] >= 18 ||
								this.maps.map_bg[k70][i44] >= 18
							) {
								l3 = i44 * 32 - 64;
								var k = 0;
								do {
									if (k > 29) break;
									var j44 = rightShiftIgnoreSign(l3 + 63, 5);
									if (
										this.maps.map_bg[i17][j44] < 18 &&
										this.maps.map_bg[l33][j44] < 18 &&
										this.maps.map_bg[k56][j44] < 18 &&
										this.maps.map_bg[k70][j44] < 18
									)
										break;
									l3 = j44 * 32 - 64;
									byte8 = -1;
									k++;
								} while (true);
							} else {
								var flag13 = false;
								var l = 0;
								do {
									if (l > this.a_kazu) break;
									if (
										this.co_a[l].c == 410 &&
										this.co_a[l].c4 == 16 &&
										l != i &&
										this.co_a[l].x + 95 >= k3 &&
										this.co_a[l].x <= k3 + 95 &&
										l3 + 64 >= this.co_a[l].y &&
										l3 + 16 <= this.co_a[l].y
									) {
										flag13 = true;
										l3 = this.co_a[l].y - 64;
										break;
									}
									l++;
								} while (true);
								if (!flag13) {
									l3 += 4;
									byte8 = 1;
									var j17 = rightShiftIgnoreSign(k3, 5);
									var i34 = rightShiftIgnoreSign(k3 + 31, 5);
									var l56 = rightShiftIgnoreSign(k3 + 63, 5);
									var l70 = rightShiftIgnoreSign(k3 + 95, 5);
									var k44 = rightShiftIgnoreSign(l3 + 64, 5);
									if (
										this.maps.map_bg[j17][k44] >= 18 ||
										this.maps.map_bg[i34][k44] >= 18 ||
										this.maps.map_bg[l56][k44] >= 18 ||
										this.maps.map_bg[l70][k44] >= 18
									) {
										l3 = k44 * 32 - 64;
										characterobject.c3 = 0;
									}
									if (l3 >= this.ochiru_y) {
										l3 = this.ochiru_y;
										characterobject.c = 0;
									}
								}
							}
					} else if (characterobject.c4 == 17) {
						// 上へ押せるドッスンスン
						if (l3 > characterobject.vy && (l3 -= 8) <= characterobject.vy) l3 = characterobject.vy;
					} else if (characterobject.c4 == 18) {
						// その場で跳ねるドッスンスン
						characterobject.vy += 5;
						if (characterobject.vy > 100) characterobject.vy = 100;
						l3 += rounddown(characterobject.vy / 10);
						if (characterobject.vy > -10 && characterobject.vy >= 10) {
							var k17 = rightShiftIgnoreSign(k3, 5);
							var j34 = rightShiftIgnoreSign(k3 + 31, 5);
							var i57 = rightShiftIgnoreSign(k3 + 63, 5);
							var i71 = rightShiftIgnoreSign(k3 + 95, 5);
							var l44 = rightShiftIgnoreSign(l3 + 63, 5);
							if (
								this.maps.map_bg[k17][l44] >= 20 ||
								this.maps.map_bg[j34][l44] >= 20 ||
								this.maps.map_bg[i57][l44] >= 20 ||
								this.maps.map_bg[i71][l44] >= 20
							) {
								l3 = l44 * 32 - 64;
								characterobject.vy = -100;
							}
							if (l3 >= this.ochiru_y) {
								characterobject.c = 0;
								break;
							}
						}
						if (l3 > characterobject.y) byte8 = 1;
						else if (l3 < characterobject.y) byte8 = -1;
					}
					if (this.co_j.c == 100 || this.co_j.c == 120 || this.co_j.c == 130 || this.co_j.c == 150) {
						if (this.j_a_id == i) {
							this.co_j.x += k3 - characterobject.x;
							if (k3 - characterobject.x > 0) {
								var l17 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
								var k34 = rightShiftIgnoreSign(this.co_j.y, 5);
								var j57 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
								if (this.maps.map_bg[l17][k34] >= 20 || this.maps.map_bg[l17][j57] >= 20) this.co_j.x = l17 * 32 - 16;
							} else if (k3 - characterobject.x < 0) {
								var i18 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
								var l34 = rightShiftIgnoreSign(this.co_j.y, 5);
								var k57 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
								if (this.maps.map_bg[i18][l34] >= 20 || this.maps.map_bg[i18][k57] >= 20)
									this.co_j.x = i18 * 32 + 32 - 14;
							}
						}
						if (this.co_j.x + 15 >= k3 && this.co_j.x <= k3 + 80 && this.co_j.y + 31 >= l3 && this.co_j.y <= l3 + 63) {
							if (k3 - characterobject.x > 0)
								if (
									this.j_hashigo_f ||
									(this.gk.down_f && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32) == 10)
								) {
									this.co_j.c = 230;
									this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 + 11;
									this.co_j.c1 = 0;
									this.j_zan_f = false;
									this.j_jet_c = 0;
									this.j_v_c = 0;
									this.gs.rsAddSound(24);
								} else {
									if (
										characterobject.c4 == 12 &&
										this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][
											rightShiftIgnoreSign(this.co_j.y + 31, 5)
										] == 18 &&
										rightShiftIgnoreSign(this.co_j.x + 15, 5) != rightShiftIgnoreSign(k3 + 81 + 15, 5)
									)
										this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
									this.co_j.x = k3 + 81;
									var j18 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
									var i35 = rightShiftIgnoreSign(this.co_j.y, 5);
									var l57 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
									if (this.maps.map_bg[j18][i35] >= 20 || this.maps.map_bg[j18][l57] >= 20) {
										this.co_j.c = 230;
										this.co_j.x = j18 * 32 - 32 + 11;
										this.co_j.c1 = 0;
										this.j_zan_f = false;
										this.j_jet_c = 0;
										this.j_v_c = 0;
										this.gs.rsAddSound(24);
									}
								}
							if (k3 - characterobject.x < 0)
								if (
									this.j_hashigo_f ||
									(this.gk.down_f && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32) == 10)
								) {
									this.co_j.c = 230;
									this.co_j.x = rightShiftIgnoreSign(this.co_j.x + 15, 5) * 32 - 11;
									this.co_j.c1 = 0;
									this.j_zan_f = false;
									this.j_jet_c = 0;
									this.j_v_c = 0;
									this.gs.rsAddSound(24);
								} else {
									if (
										characterobject.c4 == 12 &&
										this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][
											rightShiftIgnoreSign(this.co_j.y + 31, 5)
										] == 19 &&
										rightShiftIgnoreSign(this.co_j.x + 15, 5) != rightShiftIgnoreSign(k3 - 16 + 15, 5)
									)
										this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
									this.co_j.x = k3 - 16;
									var k18 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
									var j35 = rightShiftIgnoreSign(this.co_j.y, 5);
									var i58 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
									if (this.maps.map_bg[k18][j35] >= 20 || this.maps.map_bg[k18][i58] >= 20) {
										this.co_j.c = 230;
										this.co_j.x = k18 * 32 + 32 - 11;
										this.co_j.c1 = 0;
										this.j_zan_f = false;
										this.j_jet_c = 0;
										this.j_v_c = 0;
										this.gs.rsAddSound(24);
									}
								}
						}
					}
					if (characterobject.c4 == 4) {
						characterobject.vy += 5;
						if (characterobject.vy > 100) characterobject.vy = 100;
						l3 += rounddown(characterobject.vy / 10);
						if (characterobject.vy <= -10) {
							var l18 = rightShiftIgnoreSign(k3, 5);
							var k35 = rightShiftIgnoreSign(k3 + 31, 5);
							var j58 = rightShiftIgnoreSign(k3 + 63, 5);
							var j71 = rightShiftIgnoreSign(k3 + 95, 5);
							var i45 = rightShiftIgnoreSign(l3, 5);
							if (
								this.maps.map_bg[l18][i45] >= 18 ||
								this.maps.map_bg[k35][i45] >= 18 ||
								this.maps.map_bg[j58][i45] >= 18 ||
								this.maps.map_bg[j71][i45] >= 18
							) {
								l3 = i45 * 32 + 32;
								characterobject.vy = 0;
							}
						} else if (characterobject.vy >= 10) {
							var i19 = rightShiftIgnoreSign(k3, 5);
							var l35 = rightShiftIgnoreSign(k3 + 31, 5);
							var k58 = rightShiftIgnoreSign(k3 + 63, 5);
							var k71 = rightShiftIgnoreSign(k3 + 95, 5);
							var j45 = rightShiftIgnoreSign(l3 + 63, 5);
							if (
								this.maps.map_bg[i19][j45] >= 20 ||
								this.maps.map_bg[l35][j45] >= 20 ||
								this.maps.map_bg[k58][j45] >= 20 ||
								this.maps.map_bg[k71][j45] >= 20
							) {
								l3 = j45 * 32 - 64;
								characterobject.vy = -100;
							}
							if (l3 >= this.ochiru_y) {
								characterobject.c = 0;
								break;
							}
						}
						if (l3 > characterobject.y) byte8 = 1;
						else if (l3 < characterobject.y) byte8 = -1;
					} else if (characterobject.c4 == 12) {
						l3 = characterobject.vy;
						if (l3 > characterobject.y) byte8 = 1;
						else if (l3 < characterobject.y) byte8 = -1;
					}
					if (this.co_j.c == 100 || this.co_j.c == 120 || this.co_j.c == 130 || this.co_j.c == 150) {
						if (
							(byte8 <= 0 || !this.j_hashigo_f) &&
							(byte8 <= 0 || !this.co_j.jimen_f || this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32) != 10) &&
							this.j_a_id == i
						) {
							this.co_j.y = l3 - 32;
							if (byte8 < 0 && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y) >= 20) {
								this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 5) * 32 + 16;
								this.jShinu(3);
							}
						}
						if (this.co_j.x + 15 >= k3 && this.co_j.x <= k3 + 80 && this.co_j.y + 31 >= l3 && this.co_j.y <= l3 + 63) {
							if (byte8 > 0) {
								this.co_j.y = l3 + 64;
								if (
									this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15) == 10 ||
									this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) == 10
								) {
									this.j_hashigo_f = true;
									var k4 = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32);
									if (k4 >= 20 || k4 == 15) this.j_hashigo_f = false;
								}
								if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 18) {
									this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
									this.jShinu(3);
									if (
										characterobject.c4 == 12 &&
										(this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][
											rightShiftIgnoreSign(this.co_j.y + 32, 5)
										] == 18 ||
											this.maps.map_bg[rightShiftIgnoreSign(this.co_j.x + 15, 5)][
												rightShiftIgnoreSign(this.co_j.y + 32, 5)
											] == 19)
									)
										this.co_j.y = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 32);
								}
							}
							if (byte8 < 0) {
								this.co_j.y = l3 - 32;
								this.j_a_id = i;
								if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y) >= 20) {
									this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 5) * 32 + 16;
									this.jShinu(3);
								}
							}
						}
					}
					break;

				case 500: // 乗ると落ちる床
					if (
						k3 > this.maps.wx - 96 - 32 &&
						k3 < this.maps.wx + this.gg.di.width + 32 &&
						l3 > this.maps.wy - 32 &&
						l3 <= this.maps.wy + this.gg.di.height + 48
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (
							(this.co_j.c == 100 || this.co_j.c == 130) &&
							this.co_j.x + 15 >= k3 &&
							this.co_j.x <= k3 + 80 &&
							this.co_j.y == l3 - 32
						) {
							this.j_a_id = i;
							if (characterobject.c4 == 1) {
								if (characterobject.c3 < 50)
									if (characterobject.c3 <= 0) characterobject.c3 = 1;
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
						} else if (characterobject.c4 == 1 && characterobject.c3 < 50) characterobject.c3 = 0;
					} else {
						characterobject.gf = false;
					}
					if (characterobject.c3 > 0)
						if (characterobject.c3 >= 51 && characterobject.c3 <= 54) characterobject.c3++;
						else if (characterobject.c3 >= 55 && characterobject.c3 < 100) {
							if (characterobject.vy < 16) characterobject.vy++;
							l3 += characterobject.vy;
							if (this.maps.getBGCode(k3 + 32, l3 + 13) >= 20) {
								l3 = rightShiftIgnoreSign(l3 + 13, 5) * 32 - 14;
								characterobject.c3 = 100;
							}
							if (l3 >= this.ochiru_y + 48) {
								characterobject.c = 0;
								characterobject.gf = false;
							}
						}
					if ((this.co_j.c == 100 || this.co_j.c == 130) && this.j_a_id == i) this.co_j.y = l3 - 32;
					break;

				case 600: // 乗れるカイオール
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 64 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (
							(this.co_j.c == 100 || this.co_j.c == 130) &&
							this.co_j.x + 15 >= k3 &&
							this.co_j.x <= k3 + 48 &&
							this.co_j.y == l3 + 16 - 32
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
						if (this.co_j.x >= k3 - 144) characterobject.pt = 605;
					} else if (characterobject.c3 == 100) {
						characterobject.c1 = k3 - this.gg.di.width - 32;
						characterobject.c2 = k3 + 128;
						if (this.j_a_id != i) {
							characterobject.c4++;
							if (characterobject.c4 > 50) characterobject.c3 = 0;
						} else {
							characterobject.c4 = 0;
						}
						characterobject.pt = 605;
					} else if (characterobject.c3 == 200) {
						characterobject.pt = 605;
						characterobject.vx = 0;
					}
					k3 += characterobject.vx;
					if (this.maps.getBGCode(k3 + 63 + 16, l3) >= 20 || this.maps.getBGCode(k3 + 63 + 16, l3 + 32) >= 20) {
						k3 = rightShiftIgnoreSign(k3 + 63 + 16, 5) * 32 - 64 - 16;
						characterobject.vx = k3 - characterobject.x;
						characterobject.c3 = 200;
					}
					if (this.co_j.c == 100 || this.co_j.c == 130) {
						if (this.j_a_id == i) {
							this.co_j.x += characterobject.vx;
							if (characterobject.vx > 0) {
								var j19 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
								var i36 = rightShiftIgnoreSign(this.co_j.y, 5);
								var l58 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
								if (this.maps.map_bg[j19][i36] >= 20 || this.maps.map_bg[j19][l58] >= 20) this.co_j.x = j19 * 32 - 16;
							}
						}
						if (
							this.co_j.x + 15 >= k3 &&
							this.co_j.x <= k3 + 48 &&
							this.co_j.y + 31 >= l3 + 16 &&
							this.co_j.y <= l3 + 47
						)
							this.co_j.x = k3 + 49;
					}
					break;

				case 610: // 乗れるカイオール 方向キーで移動
					characterobject.c1 = k3 - this.gg.di.width - 32;
					characterobject.c2 = k3 + 128;
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 64 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (
							(this.co_j.c == 100 || this.co_j.c == 130) &&
							this.co_j.x + 15 >= k3 &&
							this.co_j.x <= k3 + 48 &&
							this.co_j.y == l3 + 16 - 32
						)
							this.j_a_id = i;
					} else {
						characterobject.gf = false;
					}
					if (characterobject.c3 <= 0) {
						characterobject.pt = 600;
						if (this.co_j.x >= k3 - 144) characterobject.pt = 605;
					} else if (characterobject.c3 == 100) {
					}
					if (this.co_j.c < 100 || this.co_j.c >= 200) characterobject.c3 = 100;
					else if (this.j_rope_cf && this.j_rope_id == i) {
						if (
							this.co_j.x <= k3 + 16 - 14 ||
							this.co_j.x >= k3 + 16 + 14 ||
							this.co_j.y > l3 - 32 + 16 ||
							this.co_j.y <= l3 - 64
						) {
							this.j_rope_cf = false;
							characterobject.c3 = 100;
						}
					} else if (this.co_j.c == 145 && this.j_rope_id == i) characterobject.c3 = 200;
					else if (
						this.co_j.c == 100 &&
						this.j_a_id == i &&
						this.co_j.x >= k3 + 16 - 10 &&
						this.co_j.x <= k3 + 16 + 10
					) {
						characterobject.c3 = 200;
						this.co_j.c = 145;
						this.co_j.ac = 0;
						this.j_rope_id = i;
						this.j_rope_cf = false;
						this.j_zan_f = false;
						this.j_jet_c = 0;
						this.gs.rsAddSound(7);
					}
					break;

				case 700: // ジャンプ台
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 64 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (this.co_j.c == 100 && this.co_j.x + 15 >= k3 && this.co_j.x <= k3 + 16)
							if (characterobject.c4 == 2) {
								if (this.co_j.y == l3 - 32) this.j_a_id = i;
							} else if (characterobject.c3 >= 1 && characterobject.c3 <= 2 && this.co_j.y == l3 - 32 + 10)
								this.j_a_id = i;
							else if (characterobject.c3 >= 3 && characterobject.c3 <= 4 && this.co_j.y == l3 - 32 + 16)
								this.j_a_id = i;
							else if (characterobject.c3 >= 5 && characterobject.c3 <= 6 && this.co_j.y == l3 - 32 + 10)
								this.j_a_id = i;
							else if (this.co_j.y == l3 - 32) this.j_a_id = i;
					} else {
						characterobject.gf = false;
					}
					if (characterobject.c4 == 2) {
						// 左へ飛ばすバネ
						characterobject.pt = 750;
						if (characterobject.c3 > 0) characterobject.c3--;
						if (this.co_j.x >= k3 - 32 && this.co_j.x < k3 && Math.abs(this.co_j.y - l3) <= 16) {
							characterobject.c3 = 5;
							this.co_j.x = k3 - 32;
							this.co_j.y = l3;
							this.co_j.muki = 0;
							this.j_jump_type = 0;
							this.co_j.ac = 0;
							this.co_j.c = 100;
							this.co_j.vx = -160;
							this.co_j.vy = 0;
							this.j_jump_level = 5;
							this.j_djump_kf = true;
							this.co_j.pt = 83;
							for (var i1 = 0; i1 <= 5; i1++) {
								this.j_zan_x[i1] = this.co_j.x;
								this.j_zan_y[i1] = this.co_j.y;
								this.j_zan_pt[i1] = 83;
								this.j_zan_pth[i1] = this.co_j.muki;
							}

							this.j_zan_p = 0;
							this.j_zan_c = 0;
							this.j_zan_nagasa = 5;
							this.j_zan_f = true;
							this.j_zan_cf = true;
							this.j_rope_cf = true;
							this.j_rope_id = i;
							this.j_cannon_c = 22;
							this.j_cannon_type = 1;
							this.gs.rsAddSound(4);
						}
					} else if (characterobject.c4 == 3) {
						// 右へ飛ばすバネ
						characterobject.pt = 751;
						if (characterobject.c3 > 0) characterobject.c3--;
						if (this.co_j.x <= k3 + 32 && this.co_j.x > k3 && Math.abs(this.co_j.y - l3) <= 16) {
							characterobject.c3 = 5;
							this.co_j.x = k3 + 32;
							this.co_j.y = l3;
							this.co_j.muki = 1;
							this.j_jump_type = 0;
							this.co_j.ac = 0;
							this.co_j.c = 100;
							this.co_j.vx = 160;
							this.co_j.vy = 0;
							this.j_jump_level = 5;
							this.j_djump_kf = true;
							this.co_j.pt = 83;
							for (var j1 = 0; j1 <= 5; j1++) {
								this.j_zan_x[j1] = this.co_j.x;
								this.j_zan_y[j1] = this.co_j.y;
								this.j_zan_pt[j1] = 83;
								this.j_zan_pth[j1] = this.co_j.muki;
							}

							this.j_zan_p = 0;
							this.j_zan_c = 0;
							this.j_zan_nagasa = 5;
							this.j_zan_f = true;
							this.j_zan_cf = true;
							this.j_rope_cf = true;
							this.j_rope_id = i;
							this.j_cannon_c = 22;
							this.j_cannon_type = 1;
							this.gs.rsAddSound(4);
						}
					} else if (this.j_a_id == i) {
						this.co_j.vx = 0;
						this.co_j.vy = 0;
						this.co_j.x = k3;
						this.j_jdai_f = true;
						characterobject.c3++;
						if (characterobject.c3 <= 2) {
							characterobject.pt = 710;
							this.co_j.y = l3 - 32 + 10;
						} else if (characterobject.c3 <= 4) {
							characterobject.pt = 720;
							this.co_j.y = l3 - 32 + 16;
						} else if (characterobject.c3 <= 6) {
							characterobject.pt = 710;
							this.co_j.y = l3 - 32 + 10;
						} else if (characterobject.c3 >= 7) {
							characterobject.pt = 700;
							this.co_j.y = l3 - 32;
							characterobject.c3 = 0;
							this.j_a_id = -1;
							this.j_jump_type = 4;
							this.co_j.pt = 101;
							this.co_j.ac = 0;
							this.co_j.vy = -255;
							this.j_jump_level = 1;
							if (this.maps.getBGCode(k3, l3) == 4) this.co_j.vy = -75;
						}
					} else {
						characterobject.c3 = 0;
						characterobject.pt = 700;
					}
					break;

				case 1000: // ファイヤーウォール
					if (characterobject.vx < 32) {
						characterobject.vx++;
						if (
							characterobject.vx > 28 &&
							(k3 < this.maps.wx ||
								k3 > this.maps.wx + this.gg.di.width - 32 ||
								l3 < this.maps.wy - 32 ||
								l3 > this.maps.wy + this.gg.di.height + 32)
						)
							characterobject.vx = 28;
					} else if (characterobject.vx == 32) {
						characterobject.c4 += 16;
						if (characterobject.c3 >= 10) characterobject.c4 += 8;
						if (characterobject.c4 >= 192) {
							characterobject.c4 = 192;
							characterobject.vx = 100;
						}
						if (characterobject.c3 == 1 || characterobject.c3 == 11) {
							var k19 = rightShiftIgnoreSign(k3, 5);
							var j36 = rightShiftIgnoreSign(k3 + 32, 5);
							var i59 = rightShiftIgnoreSign(l3 + characterobject.c4 + 1, 5);
							if (this.maps.map_bg[k19][i59] >= 20 || this.maps.map_bg[j36][i59] >= 20) {
								characterobject.vx = 100;
								characterobject.c4 = i59 * 32 - l3;
							}
						} else if (characterobject.c3 == 2 || characterobject.c3 == 12) {
							var l19 = rightShiftIgnoreSign(l3, 5);
							var k36 = rightShiftIgnoreSign(l3 + 32, 5);
							var j59 = rightShiftIgnoreSign(k3 - characterobject.c4 - 1, 5);
							if (this.maps.map_bg[j59][l19] >= 20 || this.maps.map_bg[j59][k36] >= 20) {
								characterobject.vx = 100;
								characterobject.c4 = k3 - (j59 * 32 + 32);
							}
						} else if (characterobject.c3 == 3 || characterobject.c3 == 13) {
							var i20 = rightShiftIgnoreSign(l3, 5);
							var l36 = rightShiftIgnoreSign(l3 + 32, 5);
							var k59 = rightShiftIgnoreSign(k3 + characterobject.c4 + 1, 5);
							if (this.maps.map_bg[k59][i20] >= 20 || this.maps.map_bg[k59][l36] >= 20) {
								characterobject.vx = 100;
								characterobject.c4 = k59 * 32 - k3;
							}
						} else {
							var j20 = rightShiftIgnoreSign(k3, 5);
							var i37 = rightShiftIgnoreSign(k3 + 32, 5);
							var l59 = rightShiftIgnoreSign(l3 - characterobject.c4 - 1, 5);
							if (this.maps.map_bg[j20][l59] >= 18 || this.maps.map_bg[i37][l59] >= 18) {
								characterobject.vx = 100;
								characterobject.c4 = l3 - (l59 * 32 + 32);
							}
						}
					} else if (characterobject.c3 >= 10 && characterobject.vx < 108) characterobject.vx++;
					else if (characterobject.vx < 126) {
						characterobject.vx++;
					} else {
						characterobject.c4 -= 16;
						if (characterobject.c3 >= 10) characterobject.c4 -= 4;
						if (characterobject.c4 <= 0) {
							characterobject.c4 = 0;
							characterobject.vx = 0;
							if (characterobject.c3 >= 10) characterobject.vx = 28;
						}
					}
					if (
						k3 > this.maps.wx - 224 &&
						k3 < this.maps.wx + this.gg.di.width + 224 &&
						l3 > this.maps.wy - 224 &&
						l3 < this.maps.wy + this.gg.di.height + 224
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 1500;
						if (characterobject.c4 > 0 && this.co_j.c >= 100 && this.co_j.c < 200 && this.j_v_c <= 0)
							if (characterobject.c3 == 1 || characterobject.c3 == 11) {
								if (
									k3 <= this.co_j.x + 15 &&
									k3 + 64 > this.co_j.x + 15 &&
									l3 <= this.co_j.y + 31 &&
									l3 + characterobject.c4 >= this.co_j.y
								)
									this.jShinu(1);
							} else if (characterobject.c3 == 2 || characterobject.c3 == 12) {
								if (
									k3 - characterobject.c4 <= this.co_j.x + 15 &&
									k3 > this.co_j.x + 15 &&
									l3 <= this.co_j.y + 31 - 6 &&
									l3 + 64 > this.co_j.y + 6
								)
									this.jShinu(1);
							} else if (characterobject.c3 == 3 || characterobject.c3 == 13) {
								if (
									k3 <= this.co_j.x + 15 &&
									k3 + characterobject.c4 >= this.co_j.x + 15 &&
									l3 <= this.co_j.y + 31 - 6 &&
									l3 + 64 > this.co_j.y + 6
								)
									this.jShinu(1);
							} else if (
								k3 <= this.co_j.x + 15 &&
								k3 + 64 > this.co_j.x + 15 &&
								l3 - characterobject.c4 <= this.co_j.y + 31 &&
								l3 > this.co_j.y
							)
								this.jShinu(1);
					} else {
						characterobject.gf = false;
					}
					break;

				case 1010: // ファイヤーウォール 壁まで上下
					if (characterobject.c3 == 0) {
						l3 -= 8;
						var k20 = rightShiftIgnoreSign(k3, 5);
						var j37 = rightShiftIgnoreSign(k3 + 31, 5);
						var i60 = rightShiftIgnoreSign(k3 + 63, 5);
						var k45 = rightShiftIgnoreSign(l3, 5);
						if (
							this.maps.map_bg[k20][k45] >= 18 ||
							this.maps.map_bg[j37][k45] >= 18 ||
							this.maps.map_bg[i60][k45] >= 18
						) {
							l3 = k45 * 32 + 32;
							characterobject.c3 = 1;
						}
						if (l3 <= 320) {
							l3 = 320;
							characterobject.c3 = 1;
						}
					} else {
						l3 += 8;
						var l20 = rightShiftIgnoreSign(k3, 5);
						var k37 = rightShiftIgnoreSign(k3 + 31, 5);
						var j60 = rightShiftIgnoreSign(k3 + 63, 5);
						var l45 = rightShiftIgnoreSign(l3 + 96, 5);
						if (
							this.maps.map_bg[l20][l45] >= 18 ||
							this.maps.map_bg[k37][l45] >= 18 ||
							this.maps.map_bg[j60][l45] >= 18
						) {
							l3 = l45 * 32 - 96;
							characterobject.c3 = 0;
						}
						if (l3 >= this.ochiru_y - 96) {
							l3 = this.ochiru_y - 96;
							characterobject.c3 = 0;
						}
					}
					if (
						k3 > this.maps.wx - 150 &&
						k3 < this.maps.wx + this.gg.di.width + 150 &&
						l3 > this.maps.wy - 150 &&
						l3 < this.maps.wy + this.gg.di.height + 150
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 1600;
						if (
							this.co_j.c >= 100 &&
							this.co_j.c < 200 &&
							this.j_v_c <= 0 &&
							k3 <= this.co_j.x + 15 &&
							k3 + 63 >= this.co_j.x + 15 &&
							l3 <= this.co_j.y + 31 &&
							l3 + 95 >= this.co_j.y
						)
							this.jShinu(1);
					} else {
						characterobject.gf = false;
					}
					break;

				case 1020: // ファイヤーウォール 壁まで左右
					if (characterobject.c3 == 0) {
						var i21 = rightShiftIgnoreSign((k3 -= 8) - 1, 5);
						var l37 = rightShiftIgnoreSign(l3, 5);
						var k60 = rightShiftIgnoreSign(l3 + 31, 5);
						var l71 = rightShiftIgnoreSign(l3 + 63, 5);
						if (
							this.maps.map_bg[i21][l37] >= 18 ||
							this.maps.map_bg[i21][k60] >= 18 ||
							this.maps.map_bg[i21][l71] >= 18
						) {
							k3 = i21 * 32 + 32;
							characterobject.c3 = 1;
						}
					} else {
						var j21 = rightShiftIgnoreSign((k3 += 8) + 96, 5);
						var i38 = rightShiftIgnoreSign(l3, 5);
						var l60 = rightShiftIgnoreSign(l3 + 31, 5);
						var i72 = rightShiftIgnoreSign(l3 + 63, 5);
						if (
							this.maps.map_bg[j21][i38] >= 18 ||
							this.maps.map_bg[j21][l60] >= 18 ||
							this.maps.map_bg[j21][i72] >= 18
						) {
							k3 = j21 * 32 - 96;
							characterobject.c3 = 0;
						}
					}
					if (
						k3 > this.maps.wx - 150 &&
						k3 < this.maps.wx + this.gg.di.width + 150 &&
						l3 > this.maps.wy - 150 &&
						l3 < this.maps.wy + this.gg.di.height + 150
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 1700;
						if (
							this.co_j.c >= 100 &&
							this.co_j.c < 200 &&
							this.j_v_c <= 0 &&
							k3 <= this.co_j.x + 15 &&
							k3 + 95 >= this.co_j.x + 15 &&
							l3 <= this.co_j.y + 31 &&
							l3 + 63 >= this.co_j.y
						)
							this.jShinu(1);
					} else {
						characterobject.gf = false;
					}
					break;

				case 1100: // 火山
					if (characterobject.vx <= 0) {
						if (k3 >= this.maps.wx && k3 <= this.maps.wx + this.gg.di.width - 32)
							if (this.sl_step == 10 || this.sl_step == 11) {
								characterobject.vx = 19;
								this.gs.rsAddSound(17);
							} else if (k3 - 224 <= this.co_j.x && k3 + 224 >= this.co_j.x) {
								characterobject.vx = 19;
								this.gs.rsAddSound(17);
							}
					} else if (characterobject.vx < 52) {
						characterobject.vx++;
						if (characterobject.vx % 4 == 0) this.mSet2(k3, l3 - 16, 500, -10 + this.ranInt(20), -30);
					} else if (characterobject.vx < 63) {
						characterobject.vx++;
						if (characterobject.vx % 7 == 0) this.mSet2(k3, l3 - 16, 500, -10 + this.ranInt(20), -30);
					} else if (characterobject.vx < 140) characterobject.vx++;
					else characterobject.vx = 0;
					if (
						k3 > this.maps.wx - 224 &&
						k3 < this.maps.wx + this.gg.di.width + 224 &&
						l3 > this.maps.wy - 224 &&
						l3 < this.maps.wy + this.gg.di.height + 224
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 1800;
					} else {
						characterobject.gf = false;
					}
					break;

				case 1150: // 逆火山
					if (characterobject.vx <= 0) {
						if (k3 >= this.maps.wx && k3 <= this.maps.wx + this.gg.di.width - 32)
							if (this.sl_step == 10 || this.sl_step == 11) {
								characterobject.vx = 19;
								this.gs.rsAddSound(17);
							} else if (k3 - 224 <= this.co_j.x && k3 + 224 >= this.co_j.x) {
								characterobject.vx = 31;
								this.gs.rsAddSound(17);
							}
					} else if (characterobject.vx < 52) {
						characterobject.vx++;
						if (characterobject.vx % 4 == 0) this.mSet2(k3, l3 + 8, 550, -12 + this.ranInt(27), 28);
					} else if (characterobject.vx < 63) {
						characterobject.vx++;
						if (characterobject.vx % 7 == 0) this.mSet2(k3, l3 + 8, 550, -12 + this.ranInt(27), 28);
					} else if (characterobject.vx < 140) characterobject.vx++;
					else characterobject.vx = 0;
					if (
						k3 > this.maps.wx - 224 &&
						k3 < this.maps.wx + this.gg.di.width + 224 &&
						l3 > this.maps.wy - 224 &&
						l3 < this.maps.wy + this.gg.di.height + 224
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 1800;
					} else {
						characterobject.gf = false;
					}
					break;

				case 1200: // 動くＴ字型
					if (
						k3 > this.maps.wx - 180 &&
						k3 < this.maps.wx + this.gg.di.width + 180 &&
						l3 > this.maps.wy - 180 &&
						l3 < this.maps.wy + this.gg.di.height + 180
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 1900;
					} else {
						characterobject.gf = false;
					}
					if (characterobject.vy > 292) {
						characterobject.vx -= 2;
						if (characterobject.vx < -30) characterobject.vx = -30;
					} else if (characterobject.vy < 248) {
						characterobject.vx += 2;
						if (characterobject.vx > 30) characterobject.vx = 30;
					}
					if (characterobject.vx > 0) characterobject.vy += rounddown((characterobject.vx + 5) / 10);
					else characterobject.vy += rounddown((characterobject.vx - 5) / 10);
					var k86 = k3 + rounddown(Math.cos(((characterobject.vy + 20) * 3.1415926535897931) / 180) * 192, true, this);
					var l88 = l3 + rounddown(Math.sin(((characterobject.vy + 20) * 3.1415926535897931) / 180) * 192, true, this);
					var l90 = k3 + rounddown(Math.cos(((characterobject.vy - 20) * 3.1415926535897931) / 180) * 192, true, this);
					var k93 = l3 + rounddown(Math.sin(((characterobject.vy - 20) * 3.1415926535897931) / 180) * 192, true, this);
					k86 += rounddown(Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12, true, this);
					l88 += rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12, true, this);
					l90 += rounddown(Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12, true, this);
					k93 += rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12, true, this);
					this.setYukaPosition(String(characterobject.c4), String(l90), String(k93), String(k86), String(l88));
					break;

				case 1300: // ロープ
					if (
						k3 > this.maps.wx - 180 &&
						k3 < this.maps.wx + this.gg.di.width + 180 &&
						l3 > this.maps.wy - 180 &&
						l3 < this.maps.wy + this.gg.di.height + 180
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 2000;
						if (characterobject.c3 == 0) {
							characterobject.c3 = 1;
							this.maps.putBGCode(rightShiftIgnoreSign(k3, 5), rightShiftIgnoreSign(l3, 5), 50);
						}
					} else {
						characterobject.gf = false;
					}
					if (this.co_j.c >= 100 && this.co_j.c < 200)
						if (this.j_rope_cf && this.j_rope_id == i) {
							var j79 = l3 + rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 32, true, this);
							var l93 = l3 + rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 184, true, this);
							if (this.co_j.y + 16 < j79 - 48 || this.co_j.y + 16 > l93 + 24) this.j_rope_cf = false;
							var j73 = k3 + rounddown(Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 32, true, this);
							if (this.co_j.x + 16 < j73 - 32 - 76 || this.co_j.x + 16 > j73 + 32 + 76) this.j_rope_cf = false;
						} else if ((this.co_j.c != 140 || this.j_rope_id != i) && this.co_j.c == 100) {
							var k79 = l3 + rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 32, true, this);
							var i94 = l3 + rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 184, true, this);
							if (this.co_j.y + 16 >= k79 && this.co_j.y + 16 <= i94) {
								var k73 = k3 + rounddown(Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 32, true, this);
								var j91 = k3 + rounddown(Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 184, true, this);
								var l4 = this.co_j.y + 16 - k79;
								l4 = k73 + rounddown(((j91 - k73) * l4) / 152);
								if (this.co_j.x + 16 > l4 - 32 && this.co_j.x + 16 < l4 + 32) {
									this.co_j.c = 140;
									this.co_j.ac = 0;
									this.j_rope_id = i;
									this.j_rope_cf = false;
									this.j_rope_r = Math.floor(
										Math.sqrt(
											(this.co_j.x + 16 - k3) * (this.co_j.x + 16 - k3) +
												(this.co_j.y + 16 - l3) * (this.co_j.y + 16 - l3)
										)
									);
									if (this.j_rope_r < 48) this.j_rope_r = 48;
									else if (this.j_rope_r > 176) this.j_rope_r = 176;
									this.j_zan_f = false;
									this.j_jet_c = 0;
								}
							}
						}
					if (characterobject.vy > 116) {
						characterobject.vx -= 2;
						if (characterobject.vx < -30) characterobject.vx = -30;
					} else if (characterobject.vy < 64) {
						characterobject.vx += 2;
						if (characterobject.vx > 30) characterobject.vx = 30;
					}
					if (characterobject.vx > 0) characterobject.vy += rounddown((characterobject.vx + 5) / 10);
					else characterobject.vy += rounddown((characterobject.vx - 5) / 10);
					break;

				case 1400: // 条件で開く扉
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 64 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
					} else {
						characterobject.gf = false;
					}
					if (characterobject.c4 == 2) characterobject.pt = 2110;
					else if (characterobject.c4 == 3) characterobject.pt = 2120;
					else if (characterobject.c4 == 4) characterobject.pt = 2130;
					else characterobject.pt = 2100;
					if (characterobject.c3 <= 0) {
						if (
							k3 >= this.maps.wx &&
							k3 <= this.maps.wx + this.gg.di.width - 32 &&
							l3 >= this.maps.wy &&
							l3 <= this.maps.wy + this.gg.di.height - 32
						)
							if (characterobject.c4 == 2) {
								if (this.getCoinTotal() <= 0) characterobject.c3 = 100;
							} else if (characterobject.c4 == 3) {
								var i5 = 0;
								var k91 = rightShiftIgnoreSign(k3, 5);
								var j94 = rightShiftIgnoreSign(l3, 5);
								var l79 = -10;
								do {
									if (l79 > 10) break;
									var l73 = -10;
									do {
										if (l73 > 10) break;
										if (
											k91 + l73 >= 1 &&
											k91 + l73 <= this.mapWidth &&
											j94 + l79 >= 10 &&
											j94 + l79 <= this.mapHeight + 9 &&
											this.maps.map_bg[k91 + l73][j94 + l79] == 9
										) {
											i5++;
											break;
										}
										l73++;
									} while (true);
									if (i5 > 0) break;
									l79++;
								} while (true);
								if (i5 <= 0) characterobject.c3 = 100;
							} else if (characterobject.c4 == 4) {
								var j5 = 0;
								var k1 = 0;
								do {
									if (k1 > this.t_kazu) break;
									if (
										(this.co_t[k1].c >= 100 || this.co_t[k1].c == 10) &&
										this.co_t[k1].x <= k3 &&
										this.co_t[k1].x >= k3 - 480
									) {
										j5++;
										break;
									}
									k1++;
								} while (true);
								if (j5 <= 0) characterobject.c3 = 100;
							} else if (this.score >= this.door_score) characterobject.c3 = 100;
					} else if (characterobject.c3 >= 100) {
						characterobject.c3++;
						if (characterobject.c3 <= 101) {
							characterobject.pt = 0;
							this.maps.putBGCode(rightShiftIgnoreSign(k3, 5), rightShiftIgnoreSign(l3, 5), 0);
						} else if (characterobject.c3 == 102) characterobject.pt = 0;
						else if (characterobject.c3 >= 105 && characterobject.c3 <= 106) characterobject.pt = 0;
						else if (characterobject.c3 == 109) {
							characterobject.pt = 0;
							this.gs.rsAddSound(7);
						} else if (characterobject.c3 == 110) characterobject.pt = 0;
						else if (characterobject.c3 >= 113) {
							characterobject.pt = 0;
							characterobject.c = 0;
						}
					}
					break;

				case 1500: // 人間大砲
					if (
						k3 > this.maps.wx - 180 &&
						k3 < this.maps.wx + this.gg.di.width + 180 &&
						l3 > this.maps.wy - 180 &&
						l3 < this.maps.wy + this.gg.di.height + 180
					) {
						characterobject.gf = true;
						this.a_hf = true;
					} else {
						characterobject.gf = false;
					}
					characterobject.pt = 2200;
					if (this.j_rope_cf && this.j_rope_id == i) {
						var i74 = k3 + 16 + rounddown(Math.cos((characterobject.c4 * 3.1415926535897931) / 180) * 60, true, this);
						var i80 = l3 + 16 + rounddown(Math.sin((characterobject.c4 * 3.1415926535897931) / 180) * 60, true, this);
						if (Math.abs(this.co_j.x + 16 - i74) >= 40 || Math.abs(this.co_j.y + 16 - i80) >= 36)
							this.j_rope_cf = false;
					} else if ((this.co_j.c < 400 || this.co_j.c >= 500 || this.j_rope_id != i) && this.co_j.c == 100) {
						var j74 = k3 + 16 + rounddown(Math.cos((characterobject.c4 * 3.1415926535897931) / 180) * 80, true, this);
						var j80 = l3 + 16 + rounddown(Math.sin((characterobject.c4 * 3.1415926535897931) / 180) * 80, true, this);
						if (Math.abs(this.co_j.x + 16 - j74) < 20 && Math.abs(this.co_j.y + 16 - j80) < 16) {
							this.co_j.c = 400;
							this.co_j.ac = 0;
							this.co_j.c1 = 80;
							this.j_rope_id = i;
							this.j_rope_cf = false;
							this.j_zan_f = false;
							this.j_jet_c = 0;
							this.j_tail_ac = 0;
							this.gs.rsAddSound(7);
						}
					}
					break;

				case 1600: // スポット処理
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 64 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
					} else {
						characterobject.gf = false;
					}
					characterobject.pt = 2300;
					if (
						characterobject.c3 <= 0 &&
						k3 >= this.maps.wx &&
						k3 <= this.maps.wx + this.gg.di.width - 32 &&
						l3 >= this.maps.wy &&
						l3 <= this.maps.wy + this.gg.di.height - 32
					) {
						this.spot_c = 100;
						characterobject.c = 0;
						if (characterobject.c4 == 0) {
							this.spot_r = 160;
							this.spot_r_mokuhyou = 160;
						} else if (characterobject.c4 == 1) {
							this.spot_r = 256;
							this.spot_r_mokuhyou = 256;
						} else if (characterobject.c4 == 2) {
							this.spot_r = 352;
							this.spot_r_mokuhyou = 352;
						} else {
							this.spot_c = 0;
						}
					}
					break;

				case 1700: // 人食いワカメ
					if (
						k3 > this.maps.wx - 192 &&
						k3 < this.maps.wx + this.gg.di.width + 192 &&
						l3 > this.maps.wy - 192 &&
						l3 < this.maps.wy + this.gg.di.height + 192
					) {
						characterobject.gf = true;
						this.a_hf = true;
					} else {
						characterobject.gf = false;
					}
					if (characterobject.c4 <= 0) {
						if (
							k3 + 63 >= this.maps.wx + 16 &&
							k3 <= this.maps.wx + this.gg.di.width - 16 &&
							l3 + 63 >= this.maps.wy + 16 &&
							l3 <= this.maps.wy + this.gg.di.height - 16
						)
							characterobject.c4 = 100;
					} else if (characterobject.c4 == 100) {
						characterobject.vy += 5;
						if (characterobject.vy >= 300) {
							characterobject.vy = 300;
							characterobject.c4 = 300;
						}
					} else if (characterobject.c4 >= 300 && characterobject.c4 < 400) {
						characterobject.c4++;
						if (characterobject.c4 >= 312) characterobject.c4 = 400;
					} else if (characterobject.c4 == 400) {
						characterobject.vy -= 5;
						if (characterobject.vy <= 100) {
							characterobject.vy = 100;
							characterobject.c4 = 500;
						}
					} else if (characterobject.c4 >= 500 && characterobject.c4 < 600) {
						characterobject.c4++;
						if (characterobject.c4 >= this.gg.di.width) characterobject.c4 = 0;
					}
					if (this.co_j.c >= 100 && this.co_j.c < 200 && this.j_v_c <= 0) {
						var k74 = rounddown((characterobject.vy * 64) / 100) - 64;
						if (
							k3 - rightShiftIgnoreSign(k74, 1) <= this.co_j.x + 15 &&
							k3 + 64 + rightShiftIgnoreSign(k74, 1) >= this.co_j.x + 15
						)
							if (characterobject.c3 == 0) {
								if (l3 - k74 <= this.co_j.y + 31 && l3 + 63 >= this.co_j.y) this.jShinu(1);
							} else if (characterobject.c3 == 1) {
								if (l3 + 63 + k74 >= this.co_j.y && l3 <= this.co_j.y + 31) this.jShinu(1);
							} else if (
								characterobject.c3 == 2 &&
								l3 + 63 + rightShiftIgnoreSign(k74, 1) >= this.co_j.y &&
								l3 - rightShiftIgnoreSign(k74, 1) <= this.co_j.y + 31
							)
								this.jShinu(1);
					}
					characterobject.pt = 2400;
					break;

				case 1800: // 回転するドッスンスン
					if (
						k3 > this.maps.wx - 180 &&
						k3 < this.maps.wx + this.gg.di.width + 180 &&
						l3 > this.maps.wy - 180 &&
						l3 < this.maps.wy + this.gg.di.height + 180
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 2500;
					} else {
						characterobject.gf = false;
					}
					characterobject.vy += characterobject.vx;
					if (characterobject.vy >= 360) characterobject.vy -= 360;
					if (characterobject.vy < 0) characterobject.vy += 360;
					if (characterobject.gf) {
						var l86 =
							k3 + rounddown(Math.cos(((characterobject.vy + 180 + 34) * 3.1415926535897931) / 180) * 87, true, this);
						var i89 =
							l3 + rounddown(Math.sin(((characterobject.vy + 180 + 34) * 3.1415926535897931) / 180) * 87, true, this);
						var l91 =
							k3 + rounddown(Math.cos(((characterobject.vy + 360 - 34) * 3.1415926535897931) / 180) * 87, true, this);
						var k94 =
							l3 + rounddown(Math.sin(((characterobject.vy + 360 - 34) * 3.1415926535897931) / 180) * 87, true, this);
						this.setYukaPosition(String(characterobject.c3), String(l86), String(i89), String(l91), String(k94));
						l86 = k3 + rounddown(Math.cos(((characterobject.vy + 34) * 3.1415926535897931) / 180) * 87, true, this);
						i89 = l3 + rounddown(Math.sin(((characterobject.vy + 34) * 3.1415926535897931) / 180) * 87, true, this);
						this.setYukaPosition(String(characterobject.c4), String(l91), String(k94), String(l86), String(i89));
						l91 =
							k3 + rounddown(Math.cos(((characterobject.vy + 180 - 34) * 3.1415926535897931) / 180) * 87, true, this);
						k94 =
							l3 + rounddown(Math.sin(((characterobject.vy + 180 - 34) * 3.1415926535897931) / 180) * 87, true, this);
						this.setYukaPosition(String(characterobject.c5), String(l86), String(i89), String(l91), String(k94));
						l86 =
							k3 + rounddown(Math.cos(((characterobject.vy + 180 + 34) * 3.1415926535897931) / 180) * 87, true, this);
						i89 =
							l3 + rounddown(Math.sin(((characterobject.vy + 180 + 34) * 3.1415926535897931) / 180) * 87, true, this);
						this.setYukaPosition(String(characterobject.pth), String(l91), String(k94), String(l86), String(i89));
					}
					break;

				case 1850: // 回転する巨大ドッスンスン
					if (
						k3 > this.maps.wx - 180 &&
						k3 < this.maps.wx + this.gg.di.width + 180 &&
						l3 > this.maps.wy - 180 &&
						l3 < this.maps.wy + this.gg.di.height + 180
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 2600;
					} else {
						characterobject.gf = false;
					}
					characterobject.vy += characterobject.vx;
					if (characterobject.vy >= 360) characterobject.vy -= 360;
					if (characterobject.vy < 0) characterobject.vy += 360;
					if (characterobject.gf) {
						var i87 =
							k3 + rounddown(Math.cos(((characterobject.vy + 180 + 34) * 3.1415926535897931) / 180) * 144, true, this);
						var j89 =
							l3 + rounddown(Math.sin(((characterobject.vy + 180 + 34) * 3.1415926535897931) / 180) * 144, true, this);
						var i92 =
							k3 + rounddown(Math.cos(((characterobject.vy + 360 - 34) * 3.1415926535897931) / 180) * 144, true, this);
						var l94 =
							l3 + rounddown(Math.sin(((characterobject.vy + 360 - 34) * 3.1415926535897931) / 180) * 144, true, this);
						this.setYukaPosition(String(characterobject.c3), String(i87), String(j89), String(i92), String(l94));
						i87 = k3 + rounddown(Math.cos(((characterobject.vy + 34) * 3.1415926535897931) / 180) * 144, true, this);
						j89 = l3 + rounddown(Math.sin(((characterobject.vy + 34) * 3.1415926535897931) / 180) * 144, true, this);
						this.setYukaPosition(String(characterobject.c4), String(i92), String(l94), String(i87), String(j89));
						i92 =
							k3 + rounddown(Math.cos(((characterobject.vy + 180 - 34) * 3.1415926535897931) / 180) * 144, true, this);
						l94 =
							l3 + rounddown(Math.sin(((characterobject.vy + 180 - 34) * 3.1415926535897931) / 180) * 144, true, this);
						this.setYukaPosition(String(characterobject.c5), String(i87), String(j89), String(i92), String(l94));
						i87 =
							k3 + rounddown(Math.cos(((characterobject.vy + 180 + 34) * 3.1415926535897931) / 180) * 144, true, this);
						j89 =
							l3 + rounddown(Math.sin(((characterobject.vy + 180 + 34) * 3.1415926535897931) / 180) * 144, true, this);
						this.setYukaPosition(String(characterobject.pth), String(i92), String(l94), String(i87), String(j89));
					}
					break;

				case 1900: // 画面内で強制スクロール系
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 64 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
					} else {
						characterobject.gf = false;
					}
					characterobject.pt = 2300;
					if (characterobject.c4 == 1) {
						if (
							(characterobject.c3 <= 11 || (characterobject.c3 >= 15 && characterobject.c3 <= 18)) &&
							(k3 <= this.maps.wx - 32 ||
								k3 >= this.maps.wx + this.gg.di.width ||
								l3 <= this.maps.wy - 32 ||
								l3 >= this.maps.wy + this.gg.di.height)
						)
							characterobject.c4 = 0;
					} else if (characterobject.c3 == 0 || characterobject.c3 == 1) {
						// 画面内で横方向強制スクロール
						if (
							k3 >= this.maps.wx &&
							k3 <= this.maps.wx + this.gg.di.width - 32 &&
							l3 >= this.maps.wy &&
							l3 <= this.maps.wy + this.gg.di.height - 32
						) {
							this.nkscroll_con = 100;
							if (this.nkscroll_zsc) {
								this.nkscroll_view_x = this.maps.wx;
								this.nkscroll_view_y = this.maps.wy;
							} else {
								this.nkscroll_view_x = rightShiftIgnoreSign(this.maps.wx, 1) * 2;
								this.nkscroll_view_y = rightShiftIgnoreSign(this.maps.wy + 15, 5) * 32;
								if (this.nkscroll_view_y < this.maps.wy_mini) this.nkscroll_view_y = this.maps.wy_mini;
								if (this.nkscroll_view_y > this.maps.wy_max) this.nkscroll_view_y = this.maps.wy_max;
							}
							if (characterobject.c3 == 0) {
								// 画面内で右強制スクロール
								this.nkscroll_vx = 1;
							} else if (characterobject.c3 == 1) {
								// 画面内で左強制スクロール
								this.nkscroll_vx = -1;
							}
							this.nkscroll_vy = 0;
							characterobject.c4 = 1;
						}
					} else if (characterobject.c3 == 2 || characterobject.c3 == 3) {
						// 画面内で縦方向強制スクロール
						if (
							k3 >= this.maps.wx &&
							k3 <= this.maps.wx + this.gg.di.width - 32 &&
							l3 >= this.maps.wy &&
							l3 <= this.maps.wy + this.gg.di.height - 32
						) {
							this.nkscroll_con = 100;
							this.nkscroll_view_x = rightShiftIgnoreSign(this.maps.wx + 15, 5) * 32;
							if (this.nkscroll_view_x < this.maps.wx_mini) this.nkscroll_view_x = this.maps.wx_mini;
							if (this.nkscroll_view_x > this.maps.wx_max) this.nkscroll_view_x = this.maps.wx_max;
							this.nkscroll_view_y = rightShiftIgnoreSign(this.maps.wy, 1) * 2;
							this.nkscroll_vx = 0;
							if (characterobject.c3 == 2) {
								// 画面内で上強制スクロール
								this.nkscroll_vy = -1;
							} else if (characterobject.c3 == 3) {
								// 画面内で下強制スクロール
								this.nkscroll_vy = 1;
							}
							characterobject.c4 = 1;
						}
					} else if (characterobject.c3 >= 4 && characterobject.c3 <= 7) {
						// 画面内で斜め方向強制スクロール
						if (
							k3 >= this.maps.wx &&
							k3 <= this.maps.wx + this.gg.di.width - 32 &&
							l3 >= this.maps.wy &&
							l3 <= this.maps.wy + this.gg.di.height - 32
						) {
							this.nkscroll_con = 100;
							this.nkscroll_view_x = rightShiftIgnoreSign(this.maps.wx + 15, 5) * 32;
							this.nkscroll_view_y = rightShiftIgnoreSign(this.maps.wy + 15, 5) * 32;
							if (this.nkscroll_view_x < this.maps.wx_mini) this.nkscroll_view_x = this.maps.wx_mini;
							if (this.nkscroll_view_x > this.maps.wx_max) this.nkscroll_view_x = this.maps.wx_max;
							if (this.nkscroll_view_y < this.maps.wy_mini) this.nkscroll_view_y = this.maps.wy_mini;
							if (this.nkscroll_view_y > this.maps.wy_max) this.nkscroll_view_y = this.maps.wy_max;
							if (characterobject.c3 == 4) {
								// 画面内で右上強制スクロール
								this.nkscroll_vx = 1;
								this.nkscroll_vy = -1;
							} else if (characterobject.c3 == 5) {
								// 画面内で右下強制スクロール
								this.nkscroll_vx = 1;
								this.nkscroll_vy = 1;
							} else if (characterobject.c3 == 6) {
								// 	画面内で左上強制スクロール
								this.nkscroll_vx = -1;
								this.nkscroll_vy = -1;
							} else if (characterobject.c3 == 7) {
								// 画面内で左下強制スクロール
								this.nkscroll_vx = -1;
								this.nkscroll_vy = 1;
							}
							characterobject.c4 = 1;
						}
					} else if (characterobject.c3 == 8 || characterobject.c3 == 9) {
						// スクロールスピードを変化
						if (
							k3 >= this.maps.wx &&
							k3 <= this.maps.wx + this.gg.di.width - 32 &&
							l3 >= this.maps.wy &&
							l3 <= this.maps.wy + this.gg.di.height - 32
						) {
							if (characterobject.c3 == 8) {
								// スクロールスピードアップ
								this.nkscroll_speed_x++;
								if (this.nkscroll_speed_x > 8) this.nkscroll_speed_x = 8;
							} else if (characterobject.c3 == 9) {
								// スクロールスピードダウン
								this.nkscroll_speed_x--;
								if (this.nkscroll_speed_x < 1) this.nkscroll_speed_x = 1;
							}
							characterobject.c4 = 1;
						}
					} else if (characterobject.c3 == 10) {
						// 画面内で全方向スクロール
						if (
							k3 >= this.maps.wx &&
							k3 <= this.maps.wx + this.gg.di.width - 32 &&
							l3 >= this.maps.wy &&
							l3 <= this.maps.wy + this.gg.di.height - 32
						) {
							this.nkscroll_con = 200;
							this.nkscroll_view_x = this.maps.wx;
							this.nkscroll_view_y = this.maps.wy;
							this.nkscroll_my_view_x = this.co_j.x - this.nkscroll_view_x;
							this.nkscroll_my_view_y = this.co_j.y - this.nkscroll_view_y;
							this.nkscroll_vx = 1;
							this.nkscroll_vy = 0;
							characterobject.c4 = 1;
						}
					} else if (characterobject.c3 == 11) {
						// 画面内でスクロール停止
						if (
							k3 >= this.maps.wx &&
							k3 <= this.maps.wx + this.gg.di.width - 32 &&
							l3 >= this.maps.wy &&
							l3 <= this.maps.wy + this.gg.di.height - 32
						) {
							this.nkscroll_con = 100;
							if (this.nkscroll_zsc) {
								this.nkscroll_view_x = this.maps.wx;
								this.nkscroll_view_y = this.maps.wy;
							} else {
								this.nkscroll_view_x = rightShiftIgnoreSign(this.maps.wx + 15, 5) * 32;
								this.nkscroll_view_y = rightShiftIgnoreSign(this.maps.wy + 15, 5) * 32;
								if (this.nkscroll_view_x < this.maps.wx_mini) this.nkscroll_view_x = this.maps.wx_mini;
								if (this.nkscroll_view_x > this.maps.wx_max) this.nkscroll_view_x = this.maps.wx_max;
								if (this.nkscroll_view_y < this.maps.wy_mini) this.nkscroll_view_y = this.maps.wy_mini;
								if (this.nkscroll_view_y > this.maps.wy_max) this.nkscroll_view_y = this.maps.wy_max;
							}
							this.nkscroll_vx = 0;
							this.nkscroll_vy = 0;
							characterobject.c4 = 1;
						}
					} else if (characterobject.c3 == 12 || characterobject.c3 == 13) {
						// 自分が重なると強制スクロール
						if (
							k3 <= this.co_j.x + 15 &&
							k3 + 31 >= this.co_j.x + 15 &&
							l3 <= this.co_j.y + 31 &&
							l3 + 31 >= this.co_j.y
						) {
							this.nkscroll_con = 100;
							if (characterobject.c3 == 12) {
								// 自分が重なると右強制スクロール
								this.nkscroll_view_x = rightShiftIgnoreSign(this.maps.wx, 1) * 2;
								this.nkscroll_view_y = this.maps.wy;
								this.nkscroll_vx = 1;
								this.nkscroll_vy = 0;
							} else if (characterobject.c3 == 13) {
								// 自分が重なると上強制スクロール
								this.nkscroll_view_y = rightShiftIgnoreSign(this.maps.wy, 1) * 2;
								this.nkscroll_view_x = rightShiftIgnoreSign(this.maps.wx + 15, 5) * 32;
								if (this.nkscroll_view_x < this.maps.wx_mini) this.nkscroll_view_x = this.maps.wx_mini;
								if (this.nkscroll_view_x > this.maps.wx_max) this.nkscroll_view_x = this.maps.wx_max;
								this.nkscroll_vx = 0;
								this.nkscroll_vy = -1;
							}
							characterobject.c4 = 1;
						}
					} else if (characterobject.c3 == 14) {
						// 自分が重なると全方向スクロール
						if (
							k3 <= this.co_j.x + 15 &&
							k3 + 31 >= this.co_j.x + 15 &&
							l3 <= this.co_j.y + 31 &&
							l3 + 31 >= this.co_j.y
						) {
							this.nkscroll_con = 200;
							this.nkscroll_view_x = this.maps.wx;
							this.nkscroll_view_y = this.maps.wy;
							this.nkscroll_my_view_x = this.co_j.x - this.nkscroll_view_x;
							this.nkscroll_my_view_y = this.co_j.y - this.nkscroll_view_y;
							this.nkscroll_vx = 1;
							this.nkscroll_vy = 0;
							characterobject.c4 = 1;
						}
					} else if (characterobject.c3 == 15) {
						// 画面内で横固定縦自由スクロール
						if (
							k3 >= this.maps.wx &&
							k3 <= this.maps.wx + this.gg.di.width - 32 &&
							l3 >= this.maps.wy &&
							l3 <= this.maps.wy + this.gg.di.height - 32
						) {
							this.nkscroll_con = 300;
							if (this.nkscroll_zsc) {
								this.nkscroll_view_x = this.maps.wx;
								this.nkscroll_view_y = this.maps.wy;
							} else {
								this.nkscroll_view_y = this.maps.wy;
								this.nkscroll_view_x = rightShiftIgnoreSign(this.maps.wx + 15, 5) * 32;
								if (this.nkscroll_view_x < this.maps.wx_mini) this.nkscroll_view_x = this.maps.wx_mini;
								if (this.nkscroll_view_x > this.maps.wx_max) this.nkscroll_view_x = this.maps.wx_max;
							}
							this.nkscroll_vx = 0;
							this.nkscroll_vy = 0;
							characterobject.c4 = 1;
						}
					} else if (characterobject.c3 == 16) {
						// 画面内で右強制縦自由スクロール
						if (
							k3 >= this.maps.wx &&
							k3 <= this.maps.wx + this.gg.di.width - 32 &&
							l3 >= this.maps.wy &&
							l3 <= this.maps.wy + this.gg.di.height - 32
						) {
							this.nkscroll_con = 400;
							this.nkscroll_view_x = rightShiftIgnoreSign(this.maps.wx, 1) * 2;
							this.nkscroll_view_y = this.maps.wy;
							this.nkscroll_vx = 1;
							this.nkscroll_vy = 0;
							characterobject.c4 = 1;
						}
					} else if (characterobject.c3 == 17) {
						// 画面内で左進行用の視界
						if (
							k3 >= this.maps.wx &&
							k3 <= this.maps.wx + this.gg.di.width - 32 &&
							l3 >= this.maps.wy &&
							l3 <= this.maps.wy + this.gg.di.height - 32
						) {
							if (this.view_move_type != 2) {
								this.view_move_type = 2;
								this.nkscroll_con = 200;
								this.nkscroll_view_x = this.maps.wx;
								this.nkscroll_view_y = this.maps.wy;
								this.nkscroll_my_view_x = this.co_j.x - this.nkscroll_view_x;
								this.nkscroll_my_view_y = this.co_j.y - this.nkscroll_view_y;
								this.nkscroll_vx = 1;
								this.nkscroll_vy = 0;

								const tmp = this.maps.my_wx_mini;
								this.maps.my_wx_mini = this.maps.my_wx_max + 32;
								this.maps.my_wx_max = this.gg.di.width - tmp - 32;
							}
							characterobject.c4 = 1;
						}
					} else if (
						// 画面内で右進行用の視界
						characterobject.c3 == 18 &&
						k3 >= this.maps.wx &&
						k3 <= this.maps.wx + this.gg.di.width - 32 &&
						l3 >= this.maps.wy &&
						l3 <= this.maps.wy + this.gg.di.height - 32
					) {
						if (this.view_move_type != 1) {
							this.view_move_type = 1;
							this.nkscroll_con = 200;
							this.nkscroll_view_x = this.maps.wx;
							this.nkscroll_view_y = this.maps.wy;
							this.nkscroll_my_view_x = this.co_j.x - this.nkscroll_view_x;
							this.nkscroll_my_view_y = this.co_j.y - this.nkscroll_view_y;
							this.nkscroll_vx = 1;
							this.nkscroll_vy = 0;

							const tmp = this.maps.my_wx_mini;
							this.maps.my_wx_mini = this.gg.di.width - this.maps.my_wx_max - 32;
							this.maps.my_wx_max = tmp - 32;
						}
						characterobject.c4 = 1;
					}
					break;

				case 2000: // 曲線による坂や乗れる円等
					if (k3 + 256 > this.maps.wx && k3 < this.maps.wx + this.gg.di.width) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 2700;
					} else {
						characterobject.gf = false;
					}
					break;

				case 2100: // 人口太陽
					if (k3 + 256 > this.maps.wx && k3 - 256 < this.maps.wx + this.gg.di.width) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 2800;
					} else {
						characterobject.gf = false;
					}
					if (characterobject.gf && this.co_j.c >= 100 && this.co_j.c < 200 && this.j_v_c <= 0) {
						var l74 = k3 - (this.co_j.x + 16);
						var k80 = l3 - (this.co_j.y + 16);
						if (Math.sqrt(l74 * l74 + k80 * k80) < 64) this.jShinu(1);
					}
					break;

				case 2200: // ファイヤーリング
					characterobject.c3 += characterobject.vx;
					if (characterobject.c3 < 0) characterobject.c3 += 360;
					else if (characterobject.c3 >= 360) characterobject.c3 -= 360;
					if (
						k3 > this.maps.wx - 200 &&
						k3 < this.maps.wx + this.gg.di.width + 200 &&
						l3 > this.maps.wy - 200 &&
						l3 < this.maps.wy + this.gg.di.height + 200
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 2900;
						if (this.co_j.c >= 100 && this.co_j.c < 200) {
							var i75 = k3 - (this.co_j.x + 16);
							var l80 = l3 - (this.co_j.y + 16);
							var k21 = Math.floor(Math.sqrt(i75 * i75 + l80 * l80));
							if (k21 <= 162 && k21 >= 110) {
								var l21 = Math.floor(
									(Math.atan2(this.co_j.y + 16 - l3, this.co_j.x + 16 - k3) * 180) / 3.1400001049041748
								);
								if (l21 < 0) l21 += 360;
								if (
									(characterobject.c3 >= l21 && characterobject.c3 - 50 <= l21) ||
									(characterobject.c3 >= l21 - 360 && characterobject.c3 - 50 <= l21 - 360)
								)
									this.jShinu(1);
							}
						}
					} else {
						characterobject.gf = false;
					}
					break;

				case 2250: // ファイヤーリング２本
					characterobject.c3 += characterobject.vx;
					if (characterobject.c3 < 0) characterobject.c3 += 360;
					else if (characterobject.c3 >= 360) characterobject.c3 -= 360;
					if (
						k3 > this.maps.wx - 200 &&
						k3 < this.maps.wx + this.gg.di.width + 200 &&
						l3 > this.maps.wy - 200 &&
						l3 < this.maps.wy + this.gg.di.height + 200
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 2950;
						if (this.co_j.c >= 100 && this.co_j.c < 200) {
							var j75 = k3 - (this.co_j.x + 16);
							var i81 = l3 - (this.co_j.y + 16);
							var i22 = Math.floor(Math.sqrt(j75 * j75 + i81 * i81));
							if (i22 <= 162 && i22 >= 110) {
								var j22 = Math.floor(
									(Math.atan2(this.co_j.y + 16 - l3, this.co_j.x + 16 - k3) * 180) / 3.1400001049041748
								);
								if (j22 < 0) j22 += 360;
								if (
									(characterobject.c3 >= j22 && characterobject.c3 - 120 <= j22) ||
									(characterobject.c3 >= j22 - 360 && characterobject.c3 - 120 <= j22 - 360)
								)
									this.jShinu(1);
							}
						}
					} else {
						characterobject.gf = false;
					}
					break;

				case 2300: // 上下移動する半円
					if (characterobject.vy < 0) {
						l3 += characterobject.vy;
						if (l3 <= characterobject.c3 - 160) {
							l3 = characterobject.c3 - 160;
							characterobject.vy = 4;
						}
					} else {
						l3 += characterobject.vy;
						if (l3 >= characterobject.c3) {
							l3 = characterobject.c3;
							characterobject.vy = -4;
						}
					}
					if (k3 + 256 > this.maps.wx && k3 < this.maps.wx + this.gg.di.width + 256) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 3000;
						this.setYukaPosition(String(characterobject.c4), String(k3), String(l3));
					} else {
						characterobject.gf = false;
					}
					break;

				case 2400: // 乗ると上がる半円
					if (characterobject.c5 <= 0) {
						if (this.isRideYuka(String(characterobject.c4)) == 1) characterobject.c5 = 100;
					} else if (characterobject.c5 == 100) {
						if ((l3 -= 4) <= characterobject.c3 - 160) {
							l3 = characterobject.c3 - 160;
							characterobject.c5 = 200;
						}
					} else if (characterobject.c5 == 200) {
						if (this.isRideYuka(String(characterobject.c4)) != 1) characterobject.c5 = 300;
					} else if ((l3 += 4) >= characterobject.c3) {
						l3 = characterobject.c3;
						characterobject.c5 = 0;
					}
					if (k3 + 256 > this.maps.wx && k3 < this.maps.wx + this.gg.di.width + 256) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 3000;
						this.setYukaPosition(String(characterobject.c4), String(k3), String(l3));
					} else {
						characterobject.gf = false;
					}
					break;

				case 2500: // 乗ると下がる半円
					if (characterobject.c5 != 1000)
						if (characterobject.c5 <= 0) {
							if (this.isRideYuka(String(characterobject.c4)) == 1) characterobject.c5 = 100;
						} else if (characterobject.c5 == 100) {
							if ((l3 += 4) >= characterobject.c3) {
								l3 = characterobject.c3;
								characterobject.c5 = 200;
							}
						} else if (characterobject.c5 == 200) {
							if (this.isRideYuka(String(characterobject.c4)) != 1) characterobject.c5 = 300;
						} else if ((l3 -= 4) <= characterobject.c3 - 160) {
							l3 = characterobject.c3 - 160;
							characterobject.c5 = 0;
						}
					if (k3 + 256 > this.maps.wx && k3 < this.maps.wx + this.gg.di.width + 256) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 3000;
						this.setYukaPosition(String(characterobject.c4), String(k3), String(l3));
					} else {
						characterobject.gf = false;
					}
					break;

				case 2600: // 乗ると下がる円
					if (this.isRideYuka(String(characterobject.c4)) == 1 && (l3 += 2) >= this.ochiru_y + 80)
						l3 = this.ochiru_y + 80 + 64;
					if (k3 + 256 > this.maps.wx && k3 < this.maps.wx + this.gg.di.width + 256) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 2700;
						this.setYukaPosition(String(characterobject.c4), String(k3), String(l3));
					} else {
						characterobject.gf = false;
					}
					break;

				case 2610: // 乗ると下がる円 降りると上がる
					if (this.isRideYuka(String(characterobject.c4)) == 1) {
						if ((l3 += 3) >= this.ochiru_y + 80) l3 = this.ochiru_y + 80 + 64;
					} else if ((l3 -= 3) <= characterobject.c3) l3 = characterobject.c3;
					if (k3 + 256 > this.maps.wx && k3 < this.maps.wx + this.gg.di.width + 256) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 2700;
						this.setYukaPosition(String(characterobject.c4), String(k3), String(l3));
					} else {
						characterobject.gf = false;
					}
					break;

				case 2700: // 上下移動する円
					if (l3 <= characterobject.c3) {
						characterobject.vy += 4;
						if (characterobject.vy > 44) characterobject.vy = 44;
					} else if (l3 >= characterobject.c3 + 106) {
						characterobject.vy -= 4;
						if (characterobject.vy < -44) characterobject.vy = -44;
					}
					l3 += rounddown(characterobject.vy / 10);
					if (k3 + 256 > this.maps.wx && k3 < this.maps.wx + this.gg.di.width + 256) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 2700;
						this.setYukaPosition(String(characterobject.c4), String(k3), String(l3));
					} else {
						characterobject.gf = false;
					}
					break;

				case 2800: // 長いロープ
					if (
						k3 > this.maps.wx - 256 &&
						k3 < this.maps.wx + this.gg.di.width + 256 &&
						l3 > this.maps.wy - 256 &&
						l3 < this.maps.wy + this.gg.di.height + 256
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 3100;
					} else {
						characterobject.gf = false;
					}
					if (this.co_j.c >= 100 && this.co_j.c < 200)
						if (this.j_rope_cf && this.j_rope_id == i) {
							var j38 = k3 - (this.co_j.x + 16);
							var i61 = l3 - (this.co_j.y + 16);
							var j72 = Math.floor(Math.sqrt(j38 * j38 + i61 * i61));
							if (j72 >= 12 && j72 <= 244) {
								var k75 = k3 + rounddown(Math.cos((characterobject.vy * 3.1415926535897931) / 180) * j72, true, this);
								var j81 = l3 + rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * j72, true, this);
								if (Math.abs(this.co_j.x + 16 - k75) >= 24 || Math.abs(this.co_j.y + 16 - j81) >= 24)
									this.j_rope_cf = false;
							} else {
								this.j_rope_cf = false;
							}
						} else if ((this.co_j.c != 140 || this.j_rope_id != i) && this.co_j.c == 100 && !this.co_j.jimen_f) {
							var k38 = k3 - (this.co_j.x + 16);
							var j61 = l3 - (this.co_j.y + 16);
							var k72 = Math.floor(Math.sqrt(k38 * k38 + j61 * j61));
							if (k72 >= 12 && k72 <= 220) {
								var l75 = k3 + rounddown(Math.cos((characterobject.vy * 3.1415926535897931) / 180) * k72, true, this);
								var k81 = l3 + rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * k72, true, this);
								if (Math.abs(this.co_j.x + 16 - l75) < 20 && Math.abs(this.co_j.y + 16 - k81) < 20) {
									this.co_j.c = 140;
									this.co_j.ac = 0;
									this.j_rope_id = i;
									this.j_rope_cf = false;
									this.j_rope_r = Math.floor(
										Math.sqrt(
											(this.co_j.x + 16 - k3) * (this.co_j.x + 16 - k3) +
												(this.co_j.y + 16 - l3) * (this.co_j.y + 16 - l3)
										)
									);
									if (this.j_rope_r < 48) this.j_rope_r = 48;
									else if (this.j_rope_r > 220) this.j_rope_r = 220;
									if (characterobject.c3 == 1) {
										characterobject.c3 = 0;
										if (characterobject.vy == 90)
											if (this.co_j.muki == 0) characterobject.vx = 22;
											else characterobject.vx = -22;
									}
									this.j_zan_f = false;
									this.j_jet_c = 0;
								}
							}
						}
					if (characterobject.c3 != 1) {
						if (characterobject.vy > 156) {
							characterobject.vx -= 2;
							if (characterobject.vx < -22) characterobject.vx = -22;
						} else if (characterobject.vy < 24) {
							characterobject.vx += 2;
							if (characterobject.vx > 22) characterobject.vx = 22;
						}
						if (characterobject.vx > 0) characterobject.vy += rounddown((characterobject.vx + 5) / 10);
						else characterobject.vy += rounddown((characterobject.vx - 5) / 10);
					}
					break;

				case 2900: // 左向きのトゲ４つ
					if (
						k3 > this.maps.wx - 32 - 32 &&
						k3 < this.maps.wx + this.gg.di.width + 32 &&
						l3 > this.maps.wy - 160 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 3200;
						if (
							this.co_j.c >= 100 &&
							this.co_j.c < 200 &&
							this.j_v_c <= 0 &&
							this.co_j.x + 15 >= k3 - 4 &&
							this.co_j.x + 15 <= k3 + 31 &&
							this.co_j.y + 15 >= l3 &&
							this.co_j.y + 15 <= l3 + 127
						) {
							this.co_j.x = k3;
							if (this.co_j.y < l3) this.co_j.y = l3;
							if (this.co_j.y > l3 + 95) this.co_j.y = l3 + 95;
							this.jShinu(1);
						}
					} else {
						characterobject.gf = false;
					}
					break;

				case 2950: // 右向きのトゲ４つ
					if (
						k3 > this.maps.wx - 32 - 32 &&
						k3 < this.maps.wx + this.gg.di.width + 32 &&
						l3 > this.maps.wy - 160 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 3250;
						if (
							this.co_j.c >= 100 &&
							this.co_j.c < 200 &&
							this.j_v_c <= 0 &&
							this.co_j.x + 15 >= k3 &&
							this.co_j.x + 15 <= k3 + 31 + 4 &&
							this.co_j.y + 15 >= l3 &&
							this.co_j.y + 15 <= l3 + 127
						) {
							this.co_j.x = k3;
							if (this.co_j.y < l3) this.co_j.y = l3;
							if (this.co_j.y > l3 + 95) this.co_j.y = l3 + 95;
							this.jShinu(1);
						}
					} else {
						characterobject.gf = false;
					}
					break;

				case 3000: // 左右へ押せるドッスンスンのゴール
					if (
						k3 > this.maps.wx - 96 - 32 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 64 - 32 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 3300;
					} else {
						characterobject.gf = false;
					}
					this.souko_count1++;
					var l1 = 0;
					do {
						if (l1 > this.a_kazu) break;
						if (this.co_a[l1].c == 410 && this.co_a[l1].c4 == 16 && this.co_a[l1].x == k3 && this.co_a[l1].y == l3) {
							this.souko_count2++;
							if (characterobject.c3 == 1) this.co_a[l1].vx = 1;
							break;
						}
						l1++;
					} while (true);
					break;

				case 3100: // 右へ一方通行
					if (
						k3 > this.maps.wx - 160 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 160 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 3500;
					} else {
						characterobject.gf = false;
					}
					break;

				case 3110: // 左へ一方通行
					if (
						k3 > this.maps.wx - 160 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 160 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 3510;
					} else {
						characterobject.gf = false;
					}
					break;

				case 3120: // 上へ一方通行
					if (
						k3 > this.maps.wx - 160 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 160 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 3520;
						if (
							(this.co_j.c == 100 || this.co_j.c == 130) &&
							this.co_j.x + 15 >= k3 &&
							this.co_j.x + 15 <= k3 + 127 &&
							this.co_j.y == l3 - 32 &&
							this.co_j.vy >= 0
						)
							this.j_a_id = i;
					} else {
						characterobject.gf = false;
					}
					break;

				case 3130: // 下へ一方通行
					if (
						k3 > this.maps.wx - 160 &&
						k3 < this.maps.wx + this.gg.di.width &&
						l3 > this.maps.wy - 160 &&
						l3 < this.maps.wy + this.gg.di.height
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 3530;
					} else {
						characterobject.gf = false;
					}
					break;

				case 3200: // ゆれる棒
					if (
						k3 > this.maps.wx - 256 &&
						k3 < this.maps.wx + this.gg.di.width + 256 &&
						l3 > this.maps.wy - 256 &&
						l3 < this.maps.wy + this.gg.di.height + 256
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 3100;
					} else {
						characterobject.gf = false;
					}
					if (this.co_j.c >= 100 && this.co_j.c < 200)
						if (this.j_rope_cf && this.j_rope_id == i) {
							var l38 = k3 - (this.co_j.x + 16);
							var k61 = l3 - (this.co_j.y + 16);
							var l72 = Math.floor(Math.sqrt(l38 * l38 + k61 * k61));
							if (l72 >= 12 && l72 <= 244) {
								var i76 = k3 + rounddown(Math.cos((characterobject.vy * 3.1415926535897931) / 180) * l72, true, this);
								var l81 = l3 + rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * l72, true, this);
								if (Math.abs(this.co_j.x + 16 - i76) >= 24 || Math.abs(this.co_j.y + 16 - l81) >= 24)
									this.j_rope_cf = false;
							} else {
								this.j_rope_cf = false;
							}
						} else if ((this.co_j.c != 140 || this.j_rope_id != i) && this.co_j.c == 100 && !this.co_j.jimen_f) {
							var i39 = k3 - (this.co_j.x + 16);
							var l61 = l3 - (this.co_j.y + 16);
							var i73 = Math.floor(Math.sqrt(i39 * i39 + l61 * l61));
							if (i73 >= 12 && i73 <= 220) {
								var j76 = k3 + rounddown(Math.cos((characterobject.vy * 3.1415926535897931) / 180) * i73, true, this);
								var i82 = l3 + rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * i73, true, this);
								if (Math.abs(this.co_j.x + 16 - j76) < 20 && Math.abs(this.co_j.y + 16 - i82) < 20) {
									this.co_j.c = 140;
									this.co_j.ac = 0;
									this.j_rope_id = i;
									this.j_rope_cf = false;
									this.j_rope_r = Math.floor(
										Math.sqrt(
											(this.co_j.x + 16 - k3) * (this.co_j.x + 16 - k3) +
												(this.co_j.y + 16 - l3) * (this.co_j.y + 16 - l3)
										)
									);
									if (this.j_rope_r < 48) this.j_rope_r = 48;
									else if (this.j_rope_r > 220) this.j_rope_r = 220;
									if (characterobject.c3 == 1) {
										characterobject.c3 = 0;
										if (characterobject.vy == 90)
											if (this.co_j.muki == 0) characterobject.vx = 22;
											else characterobject.vx = -22;
									}
									this.j_zan_f = false;
									this.j_jet_c = 0;
								}
							}
						}
					if (characterobject.c3 != 1) {
						if (characterobject.c4 == 1) {
							if (characterobject.vy > 330) {
								characterobject.vx -= 2;
								if (characterobject.vx < -22) characterobject.vx = -22;
							} else if (characterobject.vy < 210) {
								characterobject.vx += 2;
								if (characterobject.vx > 22) characterobject.vx = 22;
							}
						} else if (characterobject.vy > 300) {
							characterobject.vx -= 2;
							if (characterobject.vx < -22) characterobject.vx = -22;
						} else if (characterobject.vy < 240) {
							characterobject.vx += 2;
							if (characterobject.vx > 22) characterobject.vx = 22;
						}
						if (characterobject.vx > 0) characterobject.vy += rounddown((characterobject.vx + 5) / 10);
						else characterobject.vy += rounddown((characterobject.vx - 5) / 10);
					}
					break;

				case 3300: // 跳ねる円
					characterobject.vy += 4;
					if (characterobject.vy > 64) characterobject.vy = 64;
					if (characterobject.vy < -60) l3 -= 6;
					else l3 += rounddown(characterobject.vy / 10);
					if (this.maps.getBGCode(k3, l3 + characterobject.c5 + 1) >= 20) {
						l3 = rightShiftIgnoreSign(l3 + characterobject.c5 + 1, 5) * 32 - characterobject.c5 - 1;
						characterobject.vy = -92;
					}
					if (l3 - characterobject.c5 >= this.ochiru_y) l3 = this.ochiru_y + characterobject.c5 + 64;
					if (k3 + 256 > this.maps.wx && k3 < this.maps.wx + this.gg.di.width + 256) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 2700;
						this.setYukaPosition(String(characterobject.c4), String(k3), String(l3));
					} else {
						characterobject.gf = false;
					}
					break;

				case 3400: // コンティニュー 残り人数のみ
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width + 64 &&
						l3 > this.maps.wy - 96 &&
						l3 < this.maps.wy + this.gg.di.height + 64
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 3600;
						if (
							this.co_j.c >= 100 &&
							this.co_j.c < 200 &&
							this.co_j.x + 15 >= k3 &&
							this.co_j.x + 15 <= k3 + 31 &&
							this.co_j.y + 31 >= l3 + 4 &&
							this.co_j.y <= l3 + 31 - 4
						) {
							this.cpoint_con = 100;
							this.cpoint_stage = this.stage;
							this.cpoint_x = k3;
							this.cpoint_y = l3;
							characterobject.c = 0;
							this.addScore(5);
							this.gs.rsAddSound(7);
							characterobject.gf = false;
						}
					} else {
						characterobject.gf = false;
					}
					break;

				case 3500: // スイッチ 重なるとＯＮ／ＯＦＦ 周囲１０ブロック以内に影響
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width + 64 &&
						l3 > this.maps.wy - 96 &&
						l3 < this.maps.wy + this.gg.di.height + 64
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 3700;
						if (characterobject.c3 == 0) {
							if (
								this.co_j.c >= 100 &&
								this.co_j.c < 200 &&
								this.co_j.x >= k3 - 32 &&
								this.co_j.x <= k3 + 32 &&
								this.co_j.y >= l3 - 14 &&
								this.co_j.y <= l3 + 14
							) {
								characterobject.c3 = 1;
								characterobject.pt = 3710;
								this.gs.rsAddSound(23);
								var k76 = rightShiftIgnoreSign(k3, 5);
								var j82 = rightShiftIgnoreSign(l3, 5);
								if (characterobject.c4 == 1) this.onASwitch(k76 - 5, j82 - 5, k76 + 5, j82 + 5);
								else if (characterobject.c4 == 2) this.onASwitch(1, 10, this.mapWidth, this.mapHeight + 10, 2);
								else this.onASwitch(k76 - 10, j82 - 10, k76 + 10, j82 + 10);
							}
						} else if (characterobject.c3 == 1) {
							if (
								this.co_j.c >= 100 &&
								this.co_j.c < 200 &&
								(this.co_j.x <= k3 - 32 - 8 ||
									this.co_j.x >= k3 + 32 + 8 ||
									this.co_j.y <= l3 - 14 - 8 ||
									this.co_j.y >= l3 + 14 + 8)
							)
								characterobject.c3 = 100;
							characterobject.pt = 3710;
						} else if (characterobject.c3 == 100) {
							characterobject.pt = 3710;
							if (
								this.co_j.c >= 100 &&
								this.co_j.c < 200 &&
								this.co_j.x >= k3 - 32 &&
								this.co_j.x <= k3 + 32 &&
								this.co_j.y >= l3 - 14 &&
								this.co_j.y <= l3 + 14
							) {
								characterobject.c3 = 101;
								characterobject.pt = 3700;
								this.gs.rsAddSound(23);
								var l76 = rightShiftIgnoreSign(k3, 5);
								var k82 = rightShiftIgnoreSign(l3, 5);
								if (characterobject.c4 == 1) this.offASwitch(l76 - 5, k82 - 5, l76 + 5, k82 + 5);
								else if (characterobject.c4 == 2) this.offASwitch(1, 10, this.mapWidth, this.mapHeight + 10, 2);
								else this.offASwitch(l76 - 10, k82 - 10, l76 + 10, k82 + 10);
							}
						} else if (
							characterobject.c3 == 101 &&
							this.co_j.c >= 100 &&
							this.co_j.c < 200 &&
							(this.co_j.x <= k3 - 32 - 8 ||
								this.co_j.x >= k3 + 32 + 8 ||
								this.co_j.y <= l3 - 14 - 8 ||
								this.co_j.y >= l3 + 14 + 8)
						)
							characterobject.c3 = 0;
					} else {
						characterobject.gf = false;
					}
					break;

				case 3600: // スイッチ ↑キーでＯＮ／ＯＦＦ 周囲１０ブロック以内に影響
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width + 64 &&
						l3 > this.maps.wy - 96 &&
						l3 < this.maps.wy + this.gg.di.height + 64
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 3700;
						if (characterobject.c3 == 0) {
							if (
								this.co_j.c >= 100 &&
								this.co_j.c < 200 &&
								this.co_j.x >= k3 - 32 - 8 &&
								this.co_j.x <= k3 + 32 + 8 &&
								this.co_j.y >= l3 - 12 - 8 &&
								this.co_j.y <= l3 + 12 + 8 &&
								this.up_key_c == 1
							) {
								characterobject.c3 = 100;
								characterobject.pt = 3710;
								this.gs.rsAddSound(23);
								var i77 = rightShiftIgnoreSign(k3, 5);
								var l82 = rightShiftIgnoreSign(l3, 5);
								if (characterobject.c4 == 1) this.onASwitch(i77 - 5, l82 - 5, i77 + 5, l82 + 5);
								else if (characterobject.c4 == 2) this.onASwitch(1, 10, this.mapWidth, this.mapHeight + 10, 2);
								else this.onASwitch(i77 - 10, l82 - 10, i77 + 10, l82 + 10);
							}
						} else {
							characterobject.pt = 3710;
							if (
								this.co_j.c >= 100 &&
								this.co_j.c < 200 &&
								this.co_j.x >= k3 - 32 - 8 &&
								this.co_j.x <= k3 + 32 + 8 &&
								this.co_j.y >= l3 - 12 - 8 &&
								this.co_j.y <= l3 + 12 + 8 &&
								this.up_key_c == 1
							) {
								characterobject.c3 = 0;
								characterobject.pt = 3700;
								this.gs.rsAddSound(23);
								var j77 = rightShiftIgnoreSign(k3, 5);
								var i83 = rightShiftIgnoreSign(l3, 5);
								if (characterobject.c4 == 1) this.offASwitch(j77 - 5, i83 - 5, j77 + 5, i83 + 5);
								else if (characterobject.c4 == 2) this.offASwitch(1, 10, this.mapWidth, this.mapHeight + 10, 2);
								else this.offASwitch(j77 - 10, i83 - 10, j77 + 10, i83 + 10);
							}
						}
					} else {
						characterobject.gf = false;
					}
					break;

				case 3700: // スイッチ式の扉 ＯＮで開く
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 3710: // スイッチ式の扉 ＯＮで閉まる
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 3800: // スイッチ式トゲ ＯＮでブロック４
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 3810: // スイッチ式トゲ ＯＦＦでブロック４
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 3900: // スイッチ式トゲ ＯＮで消える
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 3910: // スイッチ式トゲ ＯＮで出現
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 4000: // スイッチ式ハシゴ ＯＮで消える
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 4010: // スイッチ式ハシゴ ＯＮで出現
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 4100: // スイッチ式電撃バリア縦 ＯＮで消える
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 4110: // スイッチ式電撃バリア縦 ＯＮで出現
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 4200: // スイッチ式電撃バリア横 ＯＮで消える
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 4210: // スイッチ式電撃バリア横 ＯＮで出現
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 4300: // スイッチ式ファイヤーバー
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 4400: // スイッチ式ブロック ＯＮで消える
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 4410: // スイッチ式ブロック ＯＮで出現
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 4500: // スイッチ式動くＴ字型
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 4600: // ＫＥＹ１
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width + 64 &&
						l3 > this.maps.wy - 96 &&
						l3 < this.maps.wy + this.gg.di.height + 64
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 4100;
						if (
							this.co_j.c >= 100 &&
							this.co_j.c < 200 &&
							this.dkey_count[0] + this.dkey_count[1] < 5 &&
							this.co_j.x + 15 >= k3 - 4 &&
							this.co_j.x + 15 <= k3 + 31 + 4 &&
							this.co_j.y + 31 >= l3 + 4 &&
							this.co_j.y <= l3 + 31 - 4
						) {
							this.dkey_count[0]++;
							characterobject.c = 0;
							this.addScore(5);
							this.gs.rsAddSound(7);
							characterobject.gf = false;
						}
					} else {
						characterobject.gf = false;
					}
					break;

				case 4610: // ＫＥＹ２
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width + 64 &&
						l3 > this.maps.wy - 96 &&
						l3 < this.maps.wy + this.gg.di.height + 64
					) {
						characterobject.gf = true;
						this.a_hf = true;
						characterobject.pt = 4110;
						if (
							this.co_j.c >= 100 &&
							this.co_j.c < 200 &&
							this.dkey_count[0] + this.dkey_count[1] < 5 &&
							this.co_j.x + 15 >= k3 - 4 &&
							this.co_j.x + 15 <= k3 + 31 + 4 &&
							this.co_j.y + 31 >= l3 + 4 &&
							this.co_j.y <= l3 + 31 - 4
						) {
							this.dkey_count[1]++;
							characterobject.c = 0;
							this.addScore(5);
							this.gs.rsAddSound(7);
							characterobject.gf = false;
						}
					} else {
						characterobject.gf = false;
					}
					break;

				case 4700: // 鍵で開く扉
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width + 64 &&
						l3 > this.maps.wy - 96 &&
						l3 < this.maps.wy + this.gg.di.height + 64
					) {
						characterobject.gf = true;
						this.a_hf = true;
					} else {
						characterobject.gf = false;
					}
					if (characterobject.c3 == 0) {
						if (
							characterobject.gf &&
							this.co_j.c >= 100 &&
							this.co_j.c < 200 &&
							this.co_j.x >= k3 - 32 &&
							this.co_j.x <= k3 + 32 &&
							this.co_j.y >= l3 - 32 &&
							this.co_j.y <= l3 + 32
						)
							if (characterobject.c4 == 0) {
								if (this.dkey_count[0] >= 1) {
									this.dkey_count[0]--;
									characterobject.c3 = 100;
									this.maps.putBGCode(rightShiftIgnoreSign(k3, 5), rightShiftIgnoreSign(l3, 5), 31);
									this.gs.rsAddSound(13);
								}
							} else if (characterobject.c4 == 1) {
								if (this.dkey_count[1] >= 1) {
									this.dkey_count[1]--;
									characterobject.c3 = 100;
									this.maps.putBGCode(rightShiftIgnoreSign(k3, 5), rightShiftIgnoreSign(l3, 5), 31);
									this.gs.rsAddSound(13);
								}
							} else if (characterobject.c4 == 2) {
								if (this.dkey_count[0] >= 3) {
									this.dkey_count[0] -= 3;
									characterobject.c3 = 100;
									this.maps.putBGCode(rightShiftIgnoreSign(k3, 5), rightShiftIgnoreSign(l3, 5), 31);
									this.gs.rsAddSound(13);
								}
							} else if (characterobject.c4 == 3 && this.dkey_count[1] >= 3) {
								this.dkey_count[1] -= 3;
								characterobject.c3 = 100;
								this.maps.putBGCode(rightShiftIgnoreSign(k3, 5), rightShiftIgnoreSign(l3, 5), 31);
								this.gs.rsAddSound(13);
							}
					} else if (characterobject.c3 >= 100) {
						characterobject.c3++;
						if (characterobject.c3 == 102 || characterobject.c3 == 106) {
							if (characterobject.c4 == 0)
								this.maps.putBGCode(rightShiftIgnoreSign(k3, 5), rightShiftIgnoreSign(l3, 5), 213);
							else if (characterobject.c4 == 1)
								this.maps.putBGCode(rightShiftIgnoreSign(k3, 5), rightShiftIgnoreSign(l3, 5), 214);
							else if (characterobject.c4 == 2)
								this.maps.putBGCode(rightShiftIgnoreSign(k3, 5), rightShiftIgnoreSign(l3, 5), 215);
							else if (characterobject.c4 == 3)
								this.maps.putBGCode(rightShiftIgnoreSign(k3, 5), rightShiftIgnoreSign(l3, 5), 212);
						} else if (characterobject.c3 == 104)
							this.maps.putBGCode(rightShiftIgnoreSign(k3, 5), rightShiftIgnoreSign(l3, 5), 31);
						else if (characterobject.c3 >= 108) {
							this.maps.putBGCode(rightShiftIgnoreSign(k3, 5), rightShiftIgnoreSign(l3, 5), 0);
							characterobject.c = 0;
						}
					}
					break;

				case 4800: // 落ちる鍵
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width + 64 &&
						l3 > this.maps.wy - 96 &&
						l3 < this.maps.wy + this.gg.di.height + 64
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (characterobject.c4 == 1) characterobject.pt = 4110;
						else characterobject.pt = 4100;
						if (
							this.co_j.c >= 100 &&
							this.co_j.c < 200 &&
							this.dkey_count[0] + this.dkey_count[1] < 5 &&
							this.co_j.x + 15 >= k3 - 4 &&
							this.co_j.x + 15 <= k3 + 31 + 4 &&
							this.co_j.y + 31 >= l3 + 4 &&
							this.co_j.y <= l3 + 31 - 4
						) {
							if (characterobject.c4 == 1) this.dkey_count[1]++;
							else this.dkey_count[0]++;
							characterobject.c = 0;
							this.addScore(5);
							this.gs.rsAddSound(7);
							characterobject.gf = false;
						}
					} else {
						characterobject.gf = false;
					}
					if (characterobject.c3 == 0) characterobject.c3 = 1;
					else if (((l3 += 4) + 31) % 32 <= 4 && this.maps.getBGCode(k3 + 15, l3 + 31) >= 20)
						l3 = rightShiftIgnoreSign(l3 + 31, 5) * 32 - 32;
					else if (l3 >= this.ochiru_y) {
						characterobject.c = 0;
						characterobject.gf = false;
					}
					break;

				case 4900: // ＫＥＹ１が３つでＯＮの動作の人 周囲１０ブロック以内に影響
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 4910: // ＫＥＹ２が３つでＯＮの動作の人 周囲１０ブロック以内に影響
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 5000: // 乗ると壊れるブロック
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;

				case 5100: // しっぽで破壊 ＯＮの動作
					if (
						k3 > this.maps.wx - 96 &&
						k3 < this.maps.wx + this.gg.di.width + 64 &&
						l3 > this.maps.wy - 96 &&
						l3 < this.maps.wy + this.gg.di.height + 64
					) {
						characterobject.gf = true;
						this.a_hf = true;
						if (characterobject.c3 == 0) {
							characterobject.pt = 4300;
							var k5 = this.attackTail(String(k3), String(l3), "32", "32");
							if (k5 >= 1) {
								characterobject.c3 = 100;
								this.addScore(10);
								characterobject.pt = 0;
								this.mSet(k3, l3, 65);
								characterobject.gf = false;
								var k77 = rightShiftIgnoreSign(k3, 5);
								var j83 = rightShiftIgnoreSign(l3, 5);
								if (characterobject.c4 == 1) this.onASwitch(k77 - 5, j83 - 5, k77 + 5, j83 + 5);
								else this.onASwitch(k77 - 10, j83 - 10, k77 + 10, j83 + 10);
							}
						} else {
							characterobject.c3++;
							if (characterobject.c3 > 108) {
								characterobject.c = 0;
								characterobject.gf = false;
								var l77 = rightShiftIgnoreSign(k3, 5);
								var k83 = rightShiftIgnoreSign(l3, 5);
								if (this.maps.map_bg[l77][k83 - 1] == 4) this.maps.putBGCode(l77, k83, 4);
								else this.maps.putBGCode(l77, k83, 0);
							}
						}
					} else {
						characterobject.gf = false;
					}
					break;

				case 5200: // スイッチ式ブロック縦 ＯＮで消える
					characterobject.gf = false;
					this.a_hf = true;
					characterobject.pt = 0;
					if (characterobject.c3 == 0) {
						var i78 = rightShiftIgnoreSign(k3, 5);
						var l83 = rightShiftIgnoreSign(l3, 5);
						for (
							var i2 = 0;
							i2 <= 3 && (this.maps.map_bg[i78][l83 + i2] == 0 || this.maps.map_bg[i78][l83 + i2] == 4);
							i2++
						)
							this.maps.putBGCode(i78, l83 + i2, 23);

						characterobject.c3 = 100;
					}
					if (characterobject.c3 == 100) {
						if (characterobject.c5 == 1) {
							var j78 = rightShiftIgnoreSign(k3, 5);
							var i84 = rightShiftIgnoreSign(l3, 5);
							for (var j2 = 0; j2 <= 3 && this.maps.map_bg[j78][i84 + j2] == 23; j2++)
								this.maps.putBGCode(j78, i84 + j2, 0);

							characterobject.c3 = 200;
						}
					} else if (characterobject.c5 == 0) {
						var k78 = rightShiftIgnoreSign(k3, 5);
						var j84 = rightShiftIgnoreSign(l3, 5);
						for (
							var k2 = 0;
							k2 <= 3 && (this.maps.map_bg[k78][j84 + k2] == 0 || this.maps.map_bg[k78][j84 + k2] == 4);
							k2++
						)
							this.maps.putBGCode(k78, j84 + k2, 23);

						characterobject.c3 = 100;
					}
					break;

				case 5210: // スイッチ式ブロック縦 ＯＮで出現
					characterobject.gf = false;
					this.a_hf = true;
					characterobject.pt = 0;
					if (characterobject.c3 == 100) {
						if (characterobject.c5 == 1) {
							var l78 = rightShiftIgnoreSign(k3, 5);
							var k84 = rightShiftIgnoreSign(l3, 5);
							for (
								var l2 = 0;
								l2 <= 3 && (this.maps.map_bg[l78][k84 + l2] == 0 || this.maps.map_bg[l78][k84 + l2] == 4);
								l2++
							)
								this.maps.putBGCode(l78, k84 + l2, 23);

							characterobject.c3 = 200;
						}
					} else if (characterobject.c5 == 0) {
						var i79 = rightShiftIgnoreSign(k3, 5);
						var l84 = rightShiftIgnoreSign(l3, 5);
						for (var i3 = 0; i3 <= 3 && this.maps.map_bg[i79][l84 + i3] == 23; i3++)
							this.maps.putBGCode(i79, l84 + i3, 0);

						characterobject.c3 = 100;
					}
					break;

				case 5300: // 得点でグレネードを売る人
					this.aMoveOption(i);
					k3 = characterobject.x;
					l3 = characterobject.y;
					break;
			}
			if (this.jm_kazu > 0) {
				for (var j3 = 0; j3 <= 8; j3++) {
					if (this.co_jm[j3].c < 100) continue;
					var characterobject1 = this.co_jm[j3];
					if (characterobject.c < 100) continue;
					if (characterobject.c < 200) {
						if (
							characterobject1.x + 15 < k3 ||
							characterobject1.x > k3 + 64 ||
							characterobject1.y + 19 < l3 ||
							characterobject1.y + 4 > l3 + 23
						)
							continue;
						if (characterobject1.c == 200) {
							characterobject1.c = 50;
							characterobject1.y = l3 - 8;
							characterobject1.c1 = 1;
							characterobject1.c2 = 20;
						} else {
							characterobject1.c = 0;
							this.jm_kazu--;
						}
						continue;
					}
					if (characterobject.c == 300) {
						if (
							characterobject1.x + 15 < k3 ||
							characterobject1.x > k3 + 48 ||
							characterobject1.y + 29 < l3 ||
							characterobject1.y + 2 > l3 + 31
						)
							continue;
						if (characterobject1.c == 200) {
							characterobject1.c = 50;
							characterobject1.c1 = 1;
							characterobject1.c2 = 20;
						} else {
							characterobject1.c = 0;
							this.jm_kazu--;
						}
						continue;
					}
					if (characterobject.c == 400 || characterobject.c == 410) {
						if (
							characterobject1.x + 15 < k3 ||
							characterobject1.x > k3 + 80 ||
							characterobject1.y + 19 < l3 ||
							characterobject1.y + 4 > l3 + 63
						)
							continue;
						if (characterobject1.c == 200) {
							characterobject1.c = 50;
							characterobject1.c1 = 1;
							characterobject1.c2 = 20;
						} else {
							characterobject1.c = 0;
							this.jm_kazu--;
						}
						continue;
					}
					if (characterobject.c == 500) {
						if (
							characterobject1.x + 15 < k3 ||
							characterobject1.x > k3 + 80 ||
							characterobject1.y + 29 < l3 ||
							characterobject1.y + 2 > l3 + 13
						)
							continue;
						if (characterobject1.c == 200) {
							characterobject1.c = 50;
							characterobject1.y = l3 - 8;
							characterobject1.c1 = 1;
							characterobject1.c2 = 20;
						} else {
							characterobject1.c = 0;
							this.jm_kazu--;
						}
						continue;
					}
					if (characterobject.c == 1800) {
						if (
							Math.sqrt((characterobject1.x + 16 - k3) * (characterobject1.x + 16 - k3)) > 56 ||
							Math.sqrt((characterobject1.y + 16 - l3) * (characterobject1.y + 16 - l3)) > 56
						)
							continue;
						if (characterobject1.c == 200) {
							characterobject1.c = 50;
							characterobject1.c1 = 1;
							characterobject1.c2 = 20;
						} else {
							characterobject1.c = 0;
							this.jm_kazu--;
						}
						continue;
					}
					if (
						characterobject.c != 1850 ||
						Math.sqrt((characterobject1.x + 16 - k3) * (characterobject1.x + 16 - k3)) > 96 ||
						Math.sqrt((characterobject1.y + 16 - l3) * (characterobject1.y + 16 - l3)) > 96
					)
						continue;
					if (characterobject1.c == 200) {
						characterobject1.c = 50;
						characterobject1.c1 = 1;
						characterobject1.c2 = 20;
					} else {
						characterobject1.c = 0;
						this.jm_kazu--;
					}
				}
			}
			characterobject.x = k3;
			characterobject.y = l3;
		}

		if (this.souko_count1 >= 1 && this.souko_count2 >= this.souko_count1 && this.stage_cc < 1) {
			this.stage_cc = 1;
			this.souko_count3 = 1;
			if (this.stage_max >= 2 && this.stage >= this.stage_max) this.addScore(1000);
			else this.addScore(100);
			this.gs.rsAddSound(2);
		}
	}

	/**
	 * 仕掛けの更新処理のうち一部の仕掛けの処理を行う {@link MainProgram#aMove}から呼び出される
	 * @param i {number} 更新する仕掛けのco_a内のインデックス
	 * @see {@link MainProgram#aMove}
	 */
	aMoveOption(i: number) {
		var characterobject = this.co_a[i];
		var j = characterobject.x;
		var k = characterobject.y;
		switch (characterobject.c) {
			default:
				break;

			case 150: // スイッチ式動く床 ＯＮで上か下
				if (
					j > this.maps.wx - 80 - 32 &&
					j < this.maps.wx + this.gg.di.width + 32 &&
					k > this.maps.wy - 32 &&
					k < this.maps.wy + this.gg.di.height + 32
				) {
					characterobject.gf = true;
					this.a_hf = true;
					if (
						(this.co_j.c >= 100 || this.co_j.c < 200) &&
						this.co_j.x + 15 >= j &&
						this.co_j.x + 15 <= j + 79 &&
						this.co_j.y == k - 32
					)
						this.j_a_id = i;
				} else {
					characterobject.gf = false;
				}
				if (characterobject.c4 == 1) {
					if (characterobject.c3 == 0) {
						if (characterobject.c5 == 1) characterobject.c3 = 100;
					} else if (characterobject.c3 == 100) {
						if ((k += 4) >= characterobject.vy + 128 + 8) {
							k = characterobject.vy + 128 + 8;
							characterobject.c3 = 200;
						}
					} else if (characterobject.c3 == 200) {
						if (characterobject.c5 == 0) characterobject.c3 = 300;
					} else if (characterobject.c3 == 300 && (k -= 4) <= characterobject.vy + 8) {
						k = characterobject.vy + 8;
						characterobject.c3 = 0;
					}
				} else if (characterobject.c4 == 2) {
					if (characterobject.c3 == 0) {
						if (characterobject.c5 == 1) characterobject.c3 = 100;
					} else if (characterobject.c3 == 100) {
						if ((k -= 2) <= characterobject.vy - 192 + 8) {
							k = characterobject.vy - 192 + 8;
							characterobject.c3 = 200;
						}
					} else if (characterobject.c3 == 200) {
						if (characterobject.c5 == 0) characterobject.c3 = 300;
					} else if (characterobject.c3 == 300 && (k += 2) >= characterobject.vy + 8) {
						k = characterobject.vy + 8;
						characterobject.c3 = 0;
					}
				} else if (characterobject.c3 == 0) {
					if (characterobject.c5 == 1) characterobject.c3 = 100;
				} else if (characterobject.c3 == 100) {
					if ((k -= 4) <= characterobject.vy - 128 + 8) {
						k = characterobject.vy - 128 + 8;
						characterobject.c3 = 200;
					}
				} else if (characterobject.c3 == 200) {
					if (characterobject.c5 == 0) characterobject.c3 = 300;
				} else if (characterobject.c3 == 300 && (k += 4) >= characterobject.vy + 8) {
					k = characterobject.vy + 8;
					characterobject.c3 = 0;
				}
				if (this.co_j.c >= 100 && this.co_j.c < 200) {
					if (this.j_a_id == i) this.co_j.y = k - 32;
					if (k < characterobject.y && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y) >= 18) {
						this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 5) * 32 + 16;
						this.jShinu(3);
					}
					if (this.co_j.x + 15 >= j && this.co_j.x <= j + 64 && this.co_j.y + 31 >= k && this.co_j.y <= k + 13)
						if (k > characterobject.y) {
							this.co_j.y = k + 14;
							if (
								this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15) == 10 ||
								this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) == 10
							)
								this.j_hashigo_f = true;
							if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 18) {
								this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
								this.jShinu(3);
							}
						} else {
							this.co_j.y = k - 32;
							this.j_a_id = i;
						}
				}
				break;

			case 160: // スイッチ式動く床 ＯＮで右か左
				if (
					j > this.maps.wx - 80 - 32 &&
					j < this.maps.wx + this.gg.di.width + 32 &&
					k > this.maps.wy - 32 &&
					k < this.maps.wy + this.gg.di.height + 32
				) {
					characterobject.gf = true;
					this.a_hf = true;
					if (
						(this.co_j.c >= 100 || this.co_j.c < 200) &&
						this.co_j.x + 15 >= j &&
						this.co_j.x + 15 <= j + 79 &&
						this.co_j.y == k - 32
					)
						this.j_a_id = i;
				} else {
					characterobject.gf = false;
				}
				if (characterobject.c4 == 0) {
					if (characterobject.c3 == 0) {
						if (characterobject.c5 == 1) characterobject.c3 = 100;
					} else if (characterobject.c3 == 100) {
						if ((j += 4) >= characterobject.vx + 128 + 8) {
							j = characterobject.vx + 128 + 8;
							characterobject.c3 = 200;
						}
					} else if (characterobject.c3 == 200) {
						if (characterobject.c5 == 0) characterobject.c3 = 300;
					} else if (characterobject.c3 == 300 && (j -= 4) <= characterobject.vx + 8) {
						j = characterobject.vx + 8;
						characterobject.c3 = 0;
					}
				} else if (characterobject.c4 == 2) {
					if (characterobject.c3 == 0) {
						if (characterobject.c5 == 1) characterobject.c3 = 100;
					} else if (characterobject.c3 == 100) {
						if ((j += 2) >= characterobject.vx + 192 + 8) {
							j = characterobject.vx + 192 + 8;
							characterobject.c3 = 200;
						}
					} else if (characterobject.c3 == 200) {
						if (characterobject.c5 == 0) characterobject.c3 = 300;
					} else if (characterobject.c3 == 300 && (j -= 2) <= characterobject.vx + 8) {
						j = characterobject.vx + 8;
						characterobject.c3 = 0;
					}
				} else if (characterobject.c3 == 0) {
					if (characterobject.c5 == 1) characterobject.c3 = 100;
				} else if (characterobject.c3 == 100) {
					if ((j -= 4) <= characterobject.vx - 128 + 8) {
						j = characterobject.vx - 128 + 8;
						characterobject.c3 = 200;
					}
				} else if (characterobject.c3 == 200) {
					if (characterobject.c5 == 0) characterobject.c3 = 300;
				} else if (characterobject.c3 == 300 && (j += 4) >= characterobject.vx + 8) {
					j = characterobject.vx + 8;
					characterobject.c3 = 0;
				}
				if (this.co_j.c < 100 || this.co_j.c >= 200) break;
				if (this.j_a_id == i) {
					this.co_j.x += j - characterobject.x;
					if (j > characterobject.x) {
						var l = rightShiftIgnoreSign(this.co_j.x + 15, 5);
						var k3 = rightShiftIgnoreSign(this.co_j.y, 5);
						var l5 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
						if (this.maps.map_bg[l][k3] >= 18 || this.maps.map_bg[l][l5] >= 18) this.co_j.x = l * 32 - 16;
					} else if (j < characterobject.x) {
						var i1 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
						var l3 = rightShiftIgnoreSign(this.co_j.y, 5);
						var i6 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
						if (this.maps.map_bg[i1][l3] >= 18 || this.maps.map_bg[i1][i6] >= 18) this.co_j.x = i1 * 32 + 32 - 14;
					}
				}
				if (this.co_j.x + 15 < j || this.co_j.x > j + 64 || this.co_j.y + 31 < k || this.co_j.y > k + 13) break;
				if (j > characterobject.x) {
					this.co_j.x = j + 65;
					var j1 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
					var i4 = rightShiftIgnoreSign(this.co_j.y, 5);
					var j6 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
					if (this.maps.map_bg[j1][i4] >= 20 || this.maps.map_bg[j1][j6] >= 20) {
						this.co_j.x = j1 * 32 - 32 + 11;
						this.jShinu(4);
					}
					break;
				}
				this.co_j.x = j - 16;
				var k1 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
				var j4 = rightShiftIgnoreSign(this.co_j.y, 5);
				var k6 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
				if (this.maps.map_bg[k1][j4] >= 20 || this.maps.map_bg[k1][k6] >= 20) {
					this.co_j.x = k1 * 32 + 32 - 11;
					this.jShinu(4);
				}
				break;

			case 3700: // スイッチ式の扉 ＯＮで開く
				characterobject.gf = false;
				this.a_hf = true;
				characterobject.pt = 0;
				if (characterobject.c3 == 0) {
					this.maps.putBGCode(rightShiftIgnoreSign(j, 5), rightShiftIgnoreSign(k, 5), 213);
					characterobject.c3 = 100;
				}
				if (characterobject.c3 == 100) {
					if (characterobject.c5 == 1) {
						this.maps.putBGCode(rightShiftIgnoreSign(j, 5), rightShiftIgnoreSign(k, 5), 0);
						characterobject.c3 = 200;
					}
					break;
				}
				if (characterobject.c5 == 0) {
					this.maps.putBGCode(rightShiftIgnoreSign(j, 5), rightShiftIgnoreSign(k, 5), 213);
					characterobject.c3 = 100;
				}
				break;

			case 3710: // スイッチ式の扉 ＯＮで閉まる
				characterobject.gf = false;
				this.a_hf = true;
				characterobject.pt = 0;
				if (characterobject.c3 == 100) {
					if (characterobject.c5 == 1) {
						this.maps.putBGCode(rightShiftIgnoreSign(j, 5), rightShiftIgnoreSign(k, 5), 214);
						characterobject.c3 = 200;
					}
					break;
				}
				if (characterobject.c5 == 0) {
					this.maps.putBGCode(rightShiftIgnoreSign(j, 5), rightShiftIgnoreSign(k, 5), 0);
					characterobject.c3 = 100;
				}
				break;

			case 3800: // スイッチ式トゲ ＯＮでブロック４
				characterobject.gf = false;
				this.a_hf = true;
				characterobject.pt = 0;
				if (characterobject.c3 == 0) {
					var l7 = rightShiftIgnoreSign(j, 5);
					var l13 = rightShiftIgnoreSign(k, 5);
					for (
						var l19 = 0;
						l19 <= 3 &&
						l7 + l19 <= this.mapWidth &&
						(this.maps.map_bg[l7 + l19][l13] == 0 || this.maps.map_bg[l7 + l19][l13] == 4);
						l19++
					)
						this.maps.putBGCode(l7 + l19, l13, 5);

					characterobject.c3 = 100;
				}
				if (characterobject.c3 == 100) {
					if (characterobject.c5 != 1) break;
					var i8 = rightShiftIgnoreSign(j, 5);
					var i14 = rightShiftIgnoreSign(k, 5);
					for (
						var i20 = 0;
						i20 <= 3 &&
						i8 + i20 <= this.mapWidth &&
						(this.maps.map_bg[i8 + i20][i14] == 0 ||
							this.maps.map_bg[i8 + i20][i14] == 4 ||
							this.maps.map_bg[i8 + i20][i14] == 5);
						i20++
					)
						this.maps.putBGCode(i8 + i20, i14, 23);

					characterobject.c3 = 200;
					break;
				}
				if (characterobject.c5 != 0) break;
				var j8 = rightShiftIgnoreSign(j, 5);
				var j14 = rightShiftIgnoreSign(k, 5);
				for (
					var j20 = 0;
					j20 <= 3 &&
					j8 + j20 <= this.mapWidth &&
					(this.maps.map_bg[j8 + j20][j14] == 0 ||
						this.maps.map_bg[j8 + j20][j14] == 4 ||
						this.maps.map_bg[j8 + j20][j14] == 23);
					j20++
				)
					this.maps.putBGCode(j8 + j20, j14, 5);

				characterobject.c3 = 100;
				break;

			case 3810: // スイッチ式トゲ ＯＦＦでブロック４
				characterobject.gf = false;
				this.a_hf = true;
				characterobject.pt = 0;
				if (characterobject.c3 == 0) {
					var k8 = rightShiftIgnoreSign(j, 5);
					var k14 = rightShiftIgnoreSign(k, 5);
					for (
						var k20 = 0;
						k20 <= 3 &&
						k8 + k20 <= this.mapWidth &&
						(this.maps.map_bg[k8 + k20][k14] == 0 || this.maps.map_bg[k8 + k20][k14] == 4);
						k20++
					)
						this.maps.putBGCode(k8 + k20, k14, 23);

					characterobject.c3 = 100;
				}
				if (characterobject.c3 == 100) {
					if (characterobject.c5 != 1) break;
					var l8 = rightShiftIgnoreSign(j, 5);
					var l14 = rightShiftIgnoreSign(k, 5);
					for (
						var l20 = 0;
						l20 <= 3 &&
						l8 + l20 <= this.mapWidth &&
						(this.maps.map_bg[l8 + l20][l14] == 0 ||
							this.maps.map_bg[l8 + l20][l14] == 4 ||
							this.maps.map_bg[l8 + l20][l14] == 23);
						l20++
					)
						this.maps.putBGCode(l8 + l20, l14, 5);

					characterobject.c3 = 200;
					break;
				}
				if (characterobject.c5 != 0) break;
				var i9 = rightShiftIgnoreSign(j, 5);
				var i15 = rightShiftIgnoreSign(k, 5);
				for (
					var i21 = 0;
					i21 <= 3 &&
					i9 + i21 <= this.mapWidth &&
					(this.maps.map_bg[i9 + i21][i15] == 0 ||
						this.maps.map_bg[i9 + i21][i15] == 4 ||
						this.maps.map_bg[i9 + i21][i15] == 5);
					i21++
				)
					this.maps.putBGCode(i9 + i21, i15, 23);

				characterobject.c3 = 100;
				break;

			case 3900: // スイッチ式トゲ ＯＮで消える
				characterobject.gf = false;
				this.a_hf = true;
				characterobject.pt = 0;
				if (characterobject.c3 == 0) {
					var j9 = rightShiftIgnoreSign(j, 5);
					var j15 = rightShiftIgnoreSign(k, 5);
					for (
						var j21 = 0;
						j21 <= 3 &&
						j9 + j21 <= this.mapWidth &&
						(this.maps.map_bg[j9 + j21][j15] == 0 || this.maps.map_bg[j9 + j21][j15] == 4);
						j21++
					)
						this.maps.putBGCode(j9 + j21, j15, 6);

					characterobject.c3 = 100;
				}
				if (characterobject.c3 == 100) {
					if (characterobject.c5 != 1) break;
					var k9 = rightShiftIgnoreSign(j, 5);
					var k15 = rightShiftIgnoreSign(k, 5);
					for (var k21 = 0; k21 <= 3 && k9 + k21 <= this.mapWidth && this.maps.map_bg[k9 + k21][k15] == 6; k21++)
						this.maps.putBGCode(k9 + k21, k15, 0);

					characterobject.c3 = 200;
					break;
				}
				if (characterobject.c5 != 0) break;
				var l9 = rightShiftIgnoreSign(j, 5);
				var l15 = rightShiftIgnoreSign(k, 5);
				for (
					var l21 = 0;
					l21 <= 3 &&
					l9 + l21 <= this.mapWidth &&
					(this.maps.map_bg[l9 + l21][l15] == 0 || this.maps.map_bg[l9 + l21][l15] == 4);
					l21++
				)
					this.maps.putBGCode(l9 + l21, l15, 6);

				characterobject.c3 = 100;
				break;

			case 3910: // スイッチ式トゲ ＯＮで出現
				characterobject.gf = false;
				this.a_hf = true;
				characterobject.pt = 0;
				if (characterobject.c3 == 100) {
					if (characterobject.c5 != 1) break;
					var i10 = rightShiftIgnoreSign(j, 5);
					var i16 = rightShiftIgnoreSign(k, 5);
					for (
						var i22 = 0;
						i22 <= 3 &&
						i10 + i22 <= this.mapWidth &&
						(this.maps.map_bg[i10 + i22][i16] == 0 || this.maps.map_bg[i10 + i22][i16] == 4);
						i22++
					)
						this.maps.putBGCode(i10 + i22, i16, 6);

					characterobject.c3 = 200;
					break;
				}
				if (characterobject.c5 != 0) break;
				var j10 = rightShiftIgnoreSign(j, 5);
				var j16 = rightShiftIgnoreSign(k, 5);
				for (var j22 = 0; j22 <= 3 && j10 + j22 <= this.mapWidth && this.maps.map_bg[j10 + j22][j16] == 6; j22++)
					this.maps.putBGCode(j10 + j22, j16, 0);

				characterobject.c3 = 100;
				break;

			case 4000: // スイッチ式ハシゴ ＯＮで消える
				characterobject.gf = false;
				this.a_hf = true;
				characterobject.pt = 0;
				if (characterobject.c3 == 0) {
					var k10 = rightShiftIgnoreSign(j, 5);
					var k16 = rightShiftIgnoreSign(k, 5);
					for (
						var k22 = 0;
						k22 <= 9 &&
						k16 + k22 <= this.mapHeight + 9 &&
						(this.maps.map_bg[k10][k16 + k22] == 0 || this.maps.map_bg[k10][k16 + k22] == 4);
						k22++
					) {
						this.maps.putBGCode(k10, k16 + k22, 10);
						this.map_data_option[k10][k16 + k22] = true;
					}

					characterobject.c3 = 100;
				}
				if (characterobject.c3 == 100) {
					if (characterobject.c5 != 1) break;
					var l10 = rightShiftIgnoreSign(j, 5);
					var l16 = rightShiftIgnoreSign(k, 5);
					for (
						var l22 = 0;
						l22 <= 9 && l16 + l22 <= this.mapHeight + 9 && this.maps.map_bg[l10][l16 + l22] == 10;
						l22++
					) {
						this.maps.putBGCode(l10, l16 + l22, 0);
						this.map_data_option[l10][l16 + l22] = false;
					}

					characterobject.c3 = 200;
					break;
				}
				if (characterobject.c5 != 0) break;
				var i11 = rightShiftIgnoreSign(j, 5);
				var i17 = rightShiftIgnoreSign(k, 5);
				for (
					var i23 = 0;
					i23 <= 9 &&
					i17 + i23 <= this.mapHeight + 9 &&
					(this.maps.map_bg[i11][i17 + i23] == 0 || this.maps.map_bg[i11][i17 + i23] == 4);
					i23++
				) {
					this.maps.putBGCode(i11, i17 + i23, 10);
					this.map_data_option[i11][i17 + i23] = true;
				}

				characterobject.c3 = 100;
				break;

			case 4010: // スイッチ式ハシゴ ＯＮで出現
				characterobject.gf = false;
				this.a_hf = true;
				characterobject.pt = 0;
				if (characterobject.c3 == 100) {
					if (characterobject.c5 != 1) break;
					var j11 = rightShiftIgnoreSign(j, 5);
					var j17 = rightShiftIgnoreSign(k, 5);
					for (
						var j23 = 0;
						j23 <= 9 &&
						j17 + j23 <= this.mapHeight + 9 &&
						(this.maps.map_bg[j11][j17 + j23] == 0 || this.maps.map_bg[j11][j17 + j23] == 4);
						j23++
					) {
						this.maps.putBGCode(j11, j17 + j23, 10);
						this.map_data_option[j11][j17 + j23] = true;
					}

					characterobject.c3 = 200;
					break;
				}
				if (characterobject.c5 != 0) break;
				var k11 = rightShiftIgnoreSign(j, 5);
				var k17 = rightShiftIgnoreSign(k, 5);
				for (
					var k23 = 0;
					k23 <= 9 && k17 + k23 <= this.mapHeight + 9 && this.maps.map_bg[k11][k17 + k23] == 10;
					k23++
				) {
					this.maps.putBGCode(k11, k17 + k23, 0);
					this.map_data_option[k11][k17 + k23] = false;
				}

				characterobject.c3 = 100;
				break;

			case 4100: // スイッチ式電撃バリア縦 ＯＮで消える
				if (
					j > this.maps.wx - 64 &&
					j < this.maps.wx + this.gg.di.width + 32 &&
					k > this.maps.wy - 128 &&
					k < this.maps.wy + this.gg.di.height + 32 + 128
				) {
					characterobject.gf = true;
					this.a_hf = true;
				} else {
					characterobject.gf = false;
				}
				if (characterobject.c3 == 0) characterobject.c3 = 100;
				if (characterobject.c3 == 100) {
					characterobject.pt = 3800;
					if (
						this.co_j.c >= 100 &&
						this.co_j.c < 200 &&
						this.co_j.x + 15 >= j &&
						this.co_j.x + 15 <= j + 31 &&
						this.co_j.y + 31 >= k &&
						this.co_j.y <= k + 127 &&
						this.j_muteki_c <= 0
					) {
						this.setMyHPDamage("1");
						if (this.getMyHP() <= 0) this.jShinu(1);
					}
					if (characterobject.c5 == 1) {
						characterobject.pt = 0;
						characterobject.c3 = 200;
					}
					break;
				}
				characterobject.pt = 0;
				if (characterobject.c5 == 0) {
					characterobject.pt = 3800;
					characterobject.c3 = 100;
				}
				break;

			case 4110: // スイッチ式電撃バリア縦 ＯＮで出現
				if (
					j > this.maps.wx - 64 &&
					j < this.maps.wx + this.gg.di.width + 32 &&
					k > this.maps.wy - 128 &&
					k < this.maps.wy + this.gg.di.height + 32 + 128
				) {
					characterobject.gf = true;
					this.a_hf = true;
				} else {
					characterobject.gf = false;
				}
				if (characterobject.c3 == 0) characterobject.c3 = 100;
				if (characterobject.c3 == 100) {
					characterobject.pt = 0;
					if (characterobject.c5 == 1) {
						characterobject.pt = 3800;
						characterobject.c3 = 200;
					}
					break;
				}
				characterobject.pt = 3800;
				if (
					this.co_j.c >= 100 &&
					this.co_j.c < 200 &&
					this.co_j.x + 15 >= j &&
					this.co_j.x + 15 <= j + 31 &&
					this.co_j.y + 31 >= k &&
					this.co_j.y <= k + 127 &&
					this.j_muteki_c <= 0
				) {
					this.setMyHPDamage("1");
					if (this.getMyHP() <= 0) this.jShinu(1);
				}
				if (characterobject.c5 == 0) {
					characterobject.pt = 0;
					characterobject.c3 = 100;
				}
				break;

			case 4200: // スイッチ式電撃バリア横 ＯＮで消える
				if (
					j > this.maps.wx - 128 &&
					j < this.maps.wx + this.gg.di.width + 32 &&
					k > this.maps.wy - 64 &&
					k < this.maps.wy + this.gg.di.height + 32 + 128
				) {
					characterobject.gf = true;
					this.a_hf = true;
				} else {
					characterobject.gf = false;
				}
				if (characterobject.c3 == 0) characterobject.c3 = 100;
				if (characterobject.c3 == 100) {
					characterobject.pt = 3900;
					if (
						this.co_j.c >= 100 &&
						this.co_j.c < 200 &&
						this.co_j.x + 15 >= j &&
						this.co_j.x + 15 <= j + 127 &&
						this.co_j.y + 31 >= k &&
						this.co_j.y <= k + 31 &&
						this.j_muteki_c <= 0
					) {
						this.setMyHPDamage("1");
						if (this.getMyHP() <= 0) this.jShinu(1);
					}
					if (characterobject.c5 == 1) {
						characterobject.pt = 0;
						characterobject.c3 = 200;
					}
					break;
				}
				characterobject.pt = 0;
				if (characterobject.c5 == 0) {
					characterobject.pt = 3900;
					characterobject.c3 = 100;
				}
				break;

			case 4210: // スイッチ式電撃バリア横 ＯＮで出現
				if (
					j > this.maps.wx - 128 &&
					j < this.maps.wx + this.gg.di.width + 32 &&
					k > this.maps.wy - 64 &&
					k < this.maps.wy + this.gg.di.height + 32 + 128
				) {
					characterobject.gf = true;
					this.a_hf = true;
				} else {
					characterobject.gf = false;
				}
				if (characterobject.c3 == 0) characterobject.c3 = 100;
				if (characterobject.c3 == 100) {
					characterobject.pt = 0;
					if (characterobject.c5 == 1) {
						characterobject.pt = 3900;
						characterobject.c3 = 200;
					}
					break;
				}
				characterobject.pt = 3900;
				if (
					this.co_j.c >= 100 &&
					this.co_j.c < 200 &&
					this.co_j.x + 15 >= j &&
					this.co_j.x + 15 <= j + 127 &&
					this.co_j.y + 31 >= k &&
					this.co_j.y <= k + 31 &&
					this.j_muteki_c <= 0
				) {
					this.setMyHPDamage("1");
					if (this.getMyHP() <= 0) this.jShinu(1);
				}
				if (characterobject.c5 == 0) {
					characterobject.pt = 0;
					characterobject.c3 = 100;
				}
				break;

			case 4300: // スイッチ式ファイヤーバー
				if (characterobject.vy == 0) {
					if (characterobject.c5 == 1) characterobject.vy = 1;
				} else if (characterobject.vy == 1) {
					if (characterobject.c4 == 0) {
						characterobject.c3 -= 2;
						if (characterobject.c3 <= 180) {
							characterobject.c3 = 180;
							characterobject.vy = 100;
						}
					} else if (characterobject.c4 == 1) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 360) {
							characterobject.c3 = 360;
							characterobject.vy = 100;
						}
					} else if (characterobject.c4 == 2) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 270) {
							characterobject.c3 = 270;
							characterobject.vy = 100;
						}
					} else if (characterobject.c4 == 3) {
						characterobject.c3 -= 2;
						if (characterobject.c3 <= 270) {
							characterobject.c3 = 270;
							characterobject.vy = 100;
						}
					} else if (characterobject.c4 == 4) {
						characterobject.c3 -= 2;
						if (characterobject.c3 <= 90) {
							characterobject.c3 = 90;
							characterobject.vy = 100;
						}
					} else if (characterobject.c4 == 5) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 90) {
							characterobject.c3 = 90;
							characterobject.vy = 100;
						}
					} else if (characterobject.c4 == 6) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 180) {
							characterobject.c3 = 180;
							characterobject.vy = 100;
						}
					} else if (characterobject.c4 == 7) {
						characterobject.c3 -= 2;
						if (characterobject.c3 <= 0) {
							characterobject.c3 = 0;
							characterobject.vy = 100;
						}
					} else if (characterobject.c4 == 10) {
						characterobject.c3 -= 2;
						if (characterobject.c3 <= 180) {
							characterobject.c3 = 180;
							characterobject.vy = 100;
						}
					} else if (characterobject.c4 == 11) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 360) {
							characterobject.c3 = 360;
							characterobject.vy = 100;
						}
					} else if (characterobject.c4 == 12) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 180) {
							characterobject.c3 = 180;
							characterobject.vy = 100;
						}
					} else if (characterobject.c4 == 13) {
						characterobject.c3 -= 2;
						if (characterobject.c3 <= 0) {
							characterobject.c3 = 0;
							characterobject.vy = 100;
						}
					} else if (characterobject.c4 == 14) {
						characterobject.c3 -= 2;
						if (characterobject.c3 <= 90) {
							characterobject.c3 = 90;
							characterobject.vy = 100;
						}
					} else if (characterobject.c4 == 15) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 360) characterobject.c3 -= 360;
						if (characterobject.c3 == 90) characterobject.vy = 100;
					} else if (characterobject.c4 == 16) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 270) {
							characterobject.c3 = 270;
							characterobject.vy = 100;
						}
					} else if (characterobject.c4 == 17) {
						characterobject.c3 -= 2;
						if (characterobject.c3 < 0) characterobject.c3 += 360;
						if (characterobject.c3 == 270) characterobject.vy = 100;
					}
				} else if (characterobject.vy == 100) {
					if (characterobject.c5 == 0) characterobject.vy = 101;
				} else if (characterobject.vy == 101)
					if (characterobject.c4 == 0) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 270) {
							characterobject.c3 = 270;
							characterobject.vy = 0;
						}
					} else if (characterobject.c4 == 1) {
						characterobject.c3 -= 2;
						if (characterobject.c3 <= 270) {
							characterobject.c3 = 270;
							characterobject.vy = 0;
						}
					} else if (characterobject.c4 == 2) {
						characterobject.c3 -= 2;
						if (characterobject.c3 <= 180) {
							characterobject.c3 = 180;
							characterobject.vy = 0;
						}
					} else if (characterobject.c4 == 3) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 360) {
							characterobject.c3 = 360;
							characterobject.vy = 0;
						}
					} else if (characterobject.c4 == 4) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 180) {
							characterobject.c3 = 180;
							characterobject.vy = 0;
						}
					} else if (characterobject.c4 == 5) {
						characterobject.c3 -= 2;
						if (characterobject.c3 <= 0) {
							characterobject.c3 = 0;
							characterobject.vy = 0;
						}
					} else if (characterobject.c4 == 6) {
						characterobject.c3 -= 2;
						if (characterobject.c3 <= 90) {
							characterobject.c3 = 90;
							characterobject.vy = 0;
						}
					} else if (characterobject.c4 == 7) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 90) {
							characterobject.c3 = 90;
							characterobject.vy = 0;
						}
					} else if (characterobject.c4 == 10) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 360) {
							characterobject.c3 = 360;
							characterobject.vy = 0;
						}
					} else if (characterobject.c4 == 11) {
						characterobject.c3 -= 2;
						if (characterobject.c3 <= 180) {
							characterobject.c3 = 180;
							characterobject.vy = 0;
						}
					} else if (characterobject.c4 == 12) {
						characterobject.c3 -= 2;
						if (characterobject.c3 <= 0) {
							characterobject.c3 = 0;
							characterobject.vy = 0;
						}
					} else if (characterobject.c4 == 13) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 180) {
							characterobject.c3 = 180;
							characterobject.vy = 0;
						}
					} else if (characterobject.c4 == 14) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 270) {
							characterobject.c3 = 270;
							characterobject.vy = 0;
						}
					} else if (characterobject.c4 == 15) {
						characterobject.c3 -= 2;
						if (characterobject.c3 < 0) characterobject.c3 += 360;
						if (characterobject.c3 == 270) characterobject.vy = 0;
					} else if (characterobject.c4 == 16) {
						characterobject.c3 -= 2;
						if (characterobject.c3 <= 90) {
							characterobject.c3 = 90;
							characterobject.vy = 0;
						}
					} else if (characterobject.c4 == 17) {
						characterobject.c3 += 2;
						if (characterobject.c3 >= 360) characterobject.c3 -= 360;
						if (characterobject.c3 == 90) characterobject.vy = 0;
					}
				if (
					j > this.maps.wx - 150 &&
					j < this.maps.wx + this.gg.di.width + 150 &&
					k > this.maps.wy - 150 &&
					k < this.maps.wy + this.gg.di.height + 150
				) {
					characterobject.gf = true;
					this.a_hf = true;
					characterobject.pt = 1100;
					var i25;
					var k25;
					var i26;
					var k26;
					if (Math.abs(characterobject.vx) == 2) {
						var d = 0.017453292519943295;
						i25 = j + rounddown(Math.cos(characterobject.c3 * d) * 25, true, this);
						k25 = k + rounddown(Math.sin(characterobject.c3 * d) * 25, true, this);
						this.vo_x[i][0] = i25;
						this.vo_y[i][0] = k25;
						i26 = j + rounddown(Math.cos(characterobject.c3 * d) * 172, true, this);
						k26 = k + rounddown(Math.sin(characterobject.c3 * d) * 172, true, this);
						this.vo_x[i][1] = i26;
						this.vo_y[i][1] = k26;
						this.vo_x[i][2] = j + Math.cos(characterobject.c3 * d) * 31;
						this.vo_y[i][2] = k + Math.sin(characterobject.c3 * d) * 31;
						this.vo_x[i][3] = j + Math.cos(characterobject.c3 * d) * 166;
						this.vo_y[i][3] = k + Math.sin(characterobject.c3 * d) * 166;
					} else {
						var d1 = 0.017453292519943295;
						i25 = j + rounddown(Math.cos(characterobject.c3 * d1) * 25, true, this);
						k25 = k + rounddown(Math.sin(characterobject.c3 * d1) * 25, true, this);
						this.vo_x[i][0] = i25;
						this.vo_y[i][0] = k25;
						i26 = j + rounddown(Math.cos(characterobject.c3 * d1) * 140, true, this);
						k26 = k + rounddown(Math.sin(characterobject.c3 * d1) * 140, true, this);
						this.vo_x[i][1] = i26;
						this.vo_y[i][1] = k26;
						this.vo_x[i][2] = j + Math.cos(characterobject.c3 * d1) * 31;
						this.vo_y[i][2] = k + Math.sin(characterobject.c3 * d1) * 31;
						this.vo_x[i][3] = j + Math.cos(characterobject.c3 * d1) * 134;
						this.vo_y[i][3] = k + Math.sin(characterobject.c3 * d1) * 134;
					}
					if (this.co_j.c < 100 || this.co_j.c >= 200 || this.j_v_c > 0) break;
					if (Math.abs(i25 - i26) >= Math.abs(k25 - k26)) {
						if (this.co_j.x + 15 > i25 && this.co_j.x + 15 < i26) {
							var l1 = i26 - i25;
							var k4 = this.co_j.x + 15 - i25;
							var l6 = k26 - k25;
							var i27 = rounddown((k4 * l6) / l1) + k25;
							if (i27 > this.co_j.y - 12 && i27 < this.co_j.y + 44) this.jShinu(1);
							break;
						}
						if (this.co_j.x + 15 <= i26 || this.co_j.x + 15 >= i25) break;
						var i2 = i25 - i26;
						var l4 = this.co_j.x + 15 - i26;
						var i7 = k25 - k26;
						var j27 = rounddown((l4 * i7) / i2) + k26;
						if (j27 > this.co_j.y - 12 && j27 < this.co_j.y + 44) this.jShinu(1);
						break;
					}
					if (this.co_j.y + 15 > k25 && this.co_j.y + 15 < k26) {
						var j2 = k26 - k25;
						var i5 = this.co_j.y + 15 - k25;
						var j7 = i26 - i25;
						var k27 = rounddown((i5 * j7) / j2) + i25;
						if (k27 > this.co_j.x - 12 && k27 < this.co_j.x + 44) this.jShinu(1);
						break;
					}
					if (this.co_j.y + 15 <= k26 || this.co_j.y + 15 >= k25) break;
					var k2 = k25 - k26;
					var j5 = this.co_j.y + 15 - k26;
					var k7 = i25 - i26;
					var l27 = rounddown((j5 * k7) / k2) + i26;
					if (l27 > this.co_j.x - 12 && l27 < this.co_j.x + 44) this.jShinu(1);
				} else {
					characterobject.gf = false;
				}
				break;

			case 4400: // スイッチ式ブロック ＯＮで消える
				characterobject.gf = false;
				this.a_hf = true;
				characterobject.pt = 0;
				if (characterobject.c3 == 0) {
					var l11 = rightShiftIgnoreSign(j, 5);
					var l17 = rightShiftIgnoreSign(k, 5);
					for (
						var l23 = 0;
						l23 <= 3 &&
						l11 + l23 <= this.mapWidth &&
						(this.maps.map_bg[l11 + l23][l17] == 0 || this.maps.map_bg[l11 + l23][l17] == 4);
						l23++
					)
						this.maps.putBGCode(l11 + l23, l17, 23);

					characterobject.c3 = 100;
				}
				if (characterobject.c3 == 100) {
					if (characterobject.c5 != 1) break;
					var i12 = rightShiftIgnoreSign(j, 5);
					var i18 = rightShiftIgnoreSign(k, 5);
					for (var i24 = 0; i24 <= 3 && i12 + i24 <= this.mapWidth && this.maps.map_bg[i12 + i24][i18] == 23; i24++)
						this.maps.putBGCode(i12 + i24, i18, 0);

					characterobject.c3 = 200;
					break;
				}
				if (characterobject.c5 != 0) break;
				var j12 = rightShiftIgnoreSign(j, 5);
				var j18 = rightShiftIgnoreSign(k, 5);
				for (
					var j24 = 0;
					j24 <= 3 &&
					j12 + j24 <= this.mapWidth &&
					(this.maps.map_bg[j12 + j24][j18] == 0 || this.maps.map_bg[j12 + j24][j18] == 4);
					j24++
				)
					this.maps.putBGCode(j12 + j24, j18, 23);

				characterobject.c3 = 100;
				break;

			case 4410: // スイッチ式ブロック ＯＮで出現
				characterobject.gf = false;
				this.a_hf = true;
				characterobject.pt = 0;
				if (characterobject.c3 == 100) {
					if (characterobject.c5 != 1) break;
					var k12 = rightShiftIgnoreSign(j, 5);
					var k18 = rightShiftIgnoreSign(k, 5);
					for (
						var k24 = 0;
						k24 <= 3 &&
						k12 + k24 <= this.mapWidth &&
						(this.maps.map_bg[k12 + k24][k18] == 0 || this.maps.map_bg[k12 + k24][k18] == 4);
						k24++
					)
						this.maps.putBGCode(k12 + k24, k18, 23);

					characterobject.c3 = 200;
					break;
				}
				if (characterobject.c5 != 0) break;
				var l12 = rightShiftIgnoreSign(j, 5);
				var l18 = rightShiftIgnoreSign(k, 5);
				for (var l24 = 0; l24 <= 3 && l12 + l24 <= this.mapWidth && this.maps.map_bg[l12 + l24][l18] == 23; l24++)
					this.maps.putBGCode(l12 + l24, l18, 0);

				characterobject.c3 = 100;
				break;

			case 4500: // スイッチ式動くＴ字型
				if (
					j > this.maps.wx - 230 &&
					j < this.maps.wx + this.gg.di.width + 230 &&
					k > this.maps.wy - 230 &&
					k < this.maps.wy + this.gg.di.height + 230
				) {
					characterobject.gf = true;
					this.a_hf = true;
					characterobject.pt = 4000;
				} else {
					characterobject.gf = false;
				}
				if (characterobject.vx == 0 || characterobject.vx == 2) {
					if (characterobject.c3 == 0) {
						if (characterobject.c5 == 1) characterobject.c3 = 100;
					} else if (characterobject.c3 == 100) {
						characterobject.vy--;
						if (characterobject.vx == 2) characterobject.vy--;
						if (characterobject.vy <= 218) {
							characterobject.vy = 218;
							characterobject.c3 = 200;
						}
					} else if (characterobject.c3 == 200) {
						if (characterobject.c5 == 0) characterobject.c3 = 300;
					} else if (characterobject.c3 == 300) {
						characterobject.vy++;
						if (characterobject.vx == 2) characterobject.vy++;
						if (characterobject.vy >= 322) {
							characterobject.vy = 322;
							characterobject.c3 = 0;
						}
					}
				} else if (characterobject.vx == 1 || characterobject.vx == 3) {
					if (characterobject.c3 == 0) {
						if (characterobject.c5 == 1) characterobject.c3 = 100;
					} else if (characterobject.c3 == 100) {
						characterobject.vy++;
						if (characterobject.vx == 3) characterobject.vy++;
						if (characterobject.vy >= 322) {
							characterobject.vy = 322;
							characterobject.c3 = 200;
						}
					} else if (characterobject.c3 == 200) {
						if (characterobject.c5 == 0) characterobject.c3 = 300;
					} else if (characterobject.c3 == 300) {
						characterobject.vy--;
						if (characterobject.vx == 3) characterobject.vy--;
						if (characterobject.vy <= 218) {
							characterobject.vy = 218;
							characterobject.c3 = 0;
						}
					}
				} else if (characterobject.vx == 10) {
					if (characterobject.c3 == 0) {
						if (characterobject.c5 == 1) characterobject.c3 = 100;
					} else if (characterobject.c3 == 100) {
						characterobject.vy++;
						if (characterobject.vy >= 270) {
							characterobject.vy = 270;
							characterobject.c3 = 200;
						}
					} else if (characterobject.c3 == 200) {
						if (characterobject.c5 == 0) characterobject.c3 = 300;
					} else if (characterobject.c3 == 300) {
						characterobject.vy--;
						if (characterobject.vy <= 218) {
							characterobject.vy = 218;
							characterobject.c3 = 0;
						}
					}
				} else if (characterobject.vx == 11) {
					if (characterobject.c3 == 0) {
						if (characterobject.c5 == 1) characterobject.c3 = 100;
					} else if (characterobject.c3 == 100) {
						characterobject.vy--;
						if (characterobject.vy <= 218) {
							characterobject.vy = 218;
							characterobject.c3 = 200;
						}
					} else if (characterobject.c3 == 200) {
						if (characterobject.c5 == 0) characterobject.c3 = 300;
					} else if (characterobject.c3 == 300) {
						characterobject.vy++;
						if (characterobject.vy >= 270) {
							characterobject.vy = 270;
							characterobject.c3 = 0;
						}
					}
				} else if (characterobject.vx == 12) {
					if (characterobject.c3 == 0) {
						if (characterobject.c5 == 1) characterobject.c3 = 100;
					} else if (characterobject.c3 == 100) {
						characterobject.vy--;
						if (characterobject.vy <= 270) {
							characterobject.vy = 270;
							characterobject.c3 = 200;
						}
					} else if (characterobject.c3 == 200) {
						if (characterobject.c5 == 0) characterobject.c3 = 300;
					} else if (characterobject.c3 == 300) {
						characterobject.vy++;
						if (characterobject.vy >= 322) {
							characterobject.vy = 322;
							characterobject.c3 = 0;
						}
					}
				} else if (characterobject.vx == 13)
					if (characterobject.c3 == 0) {
						if (characterobject.c5 == 1) characterobject.c3 = 100;
					} else if (characterobject.c3 == 100) {
						characterobject.vy++;
						if (characterobject.vy >= 322) {
							characterobject.vy = 322;
							characterobject.c3 = 200;
						}
					} else if (characterobject.c3 == 200) {
						if (characterobject.c5 == 0) characterobject.c3 = 300;
					} else if (characterobject.c3 == 300) {
						characterobject.vy--;
						if (characterobject.vy <= 270) {
							characterobject.vy = 270;
							characterobject.c3 = 0;
						}
					}
				var j25 = j + rounddown(Math.cos(((characterobject.vy + 17) * 3.1415926535897931) / 180) * 224, true, this);
				var l25 = k + rounddown(Math.sin(((characterobject.vy + 17) * 3.1415926535897931) / 180) * 224, true, this);
				var j26 = j + rounddown(Math.cos(((characterobject.vy - 17) * 3.1415926535897931) / 180) * 224, true, this);
				var l26 = k + rounddown(Math.sin(((characterobject.vy - 17) * 3.1415926535897931) / 180) * 224, true, this);
				j25 += rounddown(Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12, true, this);
				l25 += rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12, true, this);
				j26 += rounddown(Math.cos((characterobject.vy * 3.1415926535897931) / 180) * 12, true, this);
				l26 += rounddown(Math.sin((characterobject.vy * 3.1415926535897931) / 180) * 12, true, this);
				this.setYukaPosition(String(characterobject.c4), String(j26), String(l26), String(j25), String(l25));
				break;

			case 4900: // ＫＥＹ１が３つでＯＮの動作の人 周囲１０ブロック以内に影響
				if (
					j > this.maps.wx - 32 &&
					j < this.maps.wx + this.gg.di.width &&
					k > this.maps.wy - 32 &&
					k < this.maps.wy + this.gg.di.height
				) {
					characterobject.gf = true;
					this.a_hf = true;
					if (this.km.mode == 50) {
						if (this.co_j.x < j - 80 - 8 || this.co_j.x > j + 64 + 8) this.km.mode = 100;
						break;
					}
					if (this.km.mode == 100) {
						if (this.co_j.x < j - 80 || this.co_j.x > j + 64 || Math.abs(k - this.co_j.y) >= 8 || this.gk.tr1_f) break;
						if (characterobject.c3 == 0) {
							this.km.init1(3);
							this.km.setMessage(3, this.tdb.getValue("serifu_key1_on_name"));
							this.addSerifu2(3, "serifu_key1_on-", 3);
							this.km.activeSerifu(
								3,
								rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40,
								rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16,
								272,
								Color.cyan
							);
							this.km.mode = 200;
						} else {
							this.km.init1(3);
							this.km.setMessage(3, this.tdb.getValue("serifu_key1_on_name"));
							this.addSerifu2(3, "serifu_key1_on-", 8, 10);
							this.km.activeSerifu(
								3,
								rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40,
								rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16,
								252,
								Color.cyan
							);
							this.km.mode = 250;
						}
						this.km.move();
						break;
					}
					if (this.km.mode == 200) {
						if (this.km.cancel_c == 1) {
							this.km.off(3);
							this.km.mode = 50;
							break;
						}
						if (this.co_j.x < j - 80 - 8 || this.co_j.x > j + 64 + 8 || Math.abs(k - this.co_j.y) > 16) {
							this.km.off(3);
							this.km.mode = 50;
							break;
						}
						if (this.km.kettei_c != 1) break;
						this.co_j.c = 150;
						if (this.co_j.x <= j || this.maps.getBGCode(j + 48, k) >= 18) {
							if (this.maps.getBGCode(j - 16, k) >= 18) {
								this.co_j.x = j - 15;
								this.co_j.muki = 1;
							} else {
								this.co_j.x = j - 48;
								this.co_j.muki = 1;
							}
						} else {
							this.co_j.x = j + 48;
							this.co_j.muki = 0;
						}
						this.co_j.y = k;
						this.co_j.vx = 0;
						this.co_j.vy = 0;
						this.co_j.pt = 100;
						this.setmyw_pt = this.co_j.pt;
						this.setmyw_muki = this.co_j.muki;
						this.co_j.c1 = 10;
						this.km.init1(7);
						this.km.setMessage(7, this.tdb.getValue("serifu_key1_on-4"));
						this.km.addItem(7, this.tdb.getValue("serifu_key1_on-5"));
						this.km.addItem(7, this.tdb.getValue("serifu_key1_on-6"));
						this.km.active(
							7,
							rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 + 100,
							rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 46,
							228
						);
						this.km.mode = 220;
						break;
					}
					if (this.km.mode == 220) {
						this.co_j.c1 = 10;
						if (this.km.cancel_c == 1) {
							this.km.offActivewindow(7, 3);
							this.km.mode = 200;
							break;
						}
						if (this.km.kettei_c != 1) break;
						if (this.km.selectedIndex[7] == 0) {
							var l2 = this.tdb.getValueInt("key1_on_count");
							if (l2 < 1) l2 = 1;
							else if (l2 > 5) l2 = 5;
							if (this.dkey_count[0] >= l2) {
								this.km.init1(8);
								this.km.setMessage(8, this.tdb.getValue("serifu_key1_on_name"));
								this.addSerifu2(8, "serifu_key1_on-", 8, 10);
								this.km.activeSerifu(
									8,
									rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 - 160,
									rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 46,
									252,
									Color.cyan
								);
								this.dkey_count[0] -= l2;
								this.gs.rsAddSound(13);
								var i13 = rightShiftIgnoreSign(j, 5);
								var i19 = rightShiftIgnoreSign(k, 5);
								this.onASwitch(i13 - 10, i19 - 10, i13 + 10, i19 + 10);
								this.km.mode = 230;
								characterobject.c3 = 1;
							} else {
								this.km.init1(8);
								this.km.addItem(8, this.tdb.getValue("serifu_key1_on-7"));
								this.km.activeIchigyou(
									8,
									rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 - 128,
									rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 96,
									216
								);
								this.km.mode = 230;
							}
						} else {
							this.km.off(3);
							this.km.off(7);
							this.km.off(8);
							this.km.mode = 50;
						}
						break;
					}
					if (this.km.mode == 230) {
						if (
							this.co_j.x < j - 80 - 8 ||
							this.co_j.x > j + 64 + 8 ||
							this.km.kettei_c == 1 ||
							this.km.cancel_c == 1
						) {
							this.km.off(3);
							this.km.off(7);
							this.km.off(8);
							this.km.mode = 50;
						}
						break;
					}
					if (
						this.km.mode == 250 &&
						(this.co_j.x < j - 80 - 8 || this.co_j.x > j + 64 + 8 || this.km.cancel_c == 1 || this.km.kettei_c == 1)
					) {
						this.km.off(3);
						this.km.mode = 50;
					}
				} else {
					characterobject.gf = false;
				}
				break;

			case 4910: // ＫＥＹ２が３つでＯＮの動作の人 周囲１０ブロック以内に影響
				if (
					j > this.maps.wx - 32 &&
					j < this.maps.wx + this.gg.di.width &&
					k > this.maps.wy - 32 &&
					k < this.maps.wy + this.gg.di.height
				) {
					characterobject.gf = true;
					this.a_hf = true;
					if (this.km.mode == 50) {
						if (this.co_j.x < j - 80 - 8 || this.co_j.x > j + 64 + 8) this.km.mode = 100;
						break;
					}
					if (this.km.mode == 100) {
						if (this.co_j.x < j - 80 || this.co_j.x > j + 64 || Math.abs(k - this.co_j.y) >= 8 || this.gk.tr1_f) break;
						if (characterobject.c3 == 0) {
							this.km.init1(3);
							this.km.setMessage(3, this.tdb.getValue("serifu_key2_on_name"));
							this.addSerifu2(3, "serifu_key2_on-", 3);
							this.km.activeSerifu(
								3,
								rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40,
								rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16,
								272,
								Color.cyan
							);
							this.km.mode = 200;
						} else {
							this.km.init1(3);
							this.km.setMessage(3, this.tdb.getValue("serifu_key2_on_name"));
							this.addSerifu2(3, "serifu_key2_on-", 8, 10);
							this.km.activeSerifu(
								3,
								rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40,
								rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16,
								252,
								Color.cyan
							);
							this.km.mode = 250;
						}
						this.km.move();
						break;
					}
					if (this.km.mode == 200) {
						if (this.km.cancel_c == 1) {
							this.km.off(3);
							this.km.mode = 50;
							break;
						}
						if (this.co_j.x < j - 80 - 8 || this.co_j.x > j + 64 + 8 || Math.abs(k - this.co_j.y) > 16) {
							this.km.off(3);
							this.km.mode = 50;
							break;
						}
						if (this.km.kettei_c != 1) break;
						this.co_j.c = 150;
						if (this.co_j.x <= j || this.maps.getBGCode(j + 48, k) >= 18) {
							if (this.maps.getBGCode(j - 16, k) >= 18) {
								this.co_j.x = j - 15;
								this.co_j.muki = 1;
							} else {
								this.co_j.x = j - 48;
								this.co_j.muki = 1;
							}
						} else {
							this.co_j.x = j + 48;
							this.co_j.muki = 0;
						}
						this.co_j.y = k;
						this.co_j.vx = 0;
						this.co_j.vy = 0;
						this.co_j.pt = 100;
						this.setmyw_pt = this.co_j.pt;
						this.setmyw_muki = this.co_j.muki;
						this.co_j.c1 = 10;
						this.km.init1(7);
						this.km.setMessage(7, this.tdb.getValue("serifu_key2_on-4"));
						this.km.addItem(7, this.tdb.getValue("serifu_key2_on-5"));
						this.km.addItem(7, this.tdb.getValue("serifu_key2_on-6"));
						this.km.active(
							7,
							rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 + 100,
							rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 46,
							228
						);
						this.km.mode = 220;
						break;
					}
					if (this.km.mode == 220) {
						this.co_j.c1 = 10;
						if (this.km.cancel_c == 1) {
							this.km.offActivewindow(7, 3);
							this.km.mode = 200;
							break;
						}
						if (this.km.kettei_c != 1) break;
						if (this.km.selectedIndex[7] == 0) {
							var i3 = this.tdb.getValueInt("key2_on_count");
							if (i3 < 1) i3 = 1;
							else if (i3 > 5) i3 = 5;
							if (this.dkey_count[1] >= i3) {
								this.km.init1(8);
								this.km.setMessage(8, this.tdb.getValue("serifu_key2_on_name"));
								this.addSerifu2(8, "serifu_key2_on-", 8, 10);
								this.km.activeSerifu(
									8,
									rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 - 160,
									rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 46,
									252,
									Color.cyan
								);
								this.dkey_count[1] -= i3;
								this.gs.rsAddSound(13);
								var j13 = rightShiftIgnoreSign(j, 5);
								var j19 = rightShiftIgnoreSign(k, 5);
								this.onASwitch(j13 - 10, j19 - 10, j13 + 10, j19 + 10);
								this.km.mode = 230;
								characterobject.c3 = 1;
							} else {
								this.km.init1(8);
								this.km.addItem(8, this.tdb.getValue("serifu_key2_on-7"));
								this.km.activeIchigyou(
									8,
									rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 - 128,
									rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 96,
									216
								);
								this.km.mode = 230;
							}
						} else {
							this.km.off(3);
							this.km.off(7);
							this.km.off(8);
							this.km.mode = 50;
						}
						break;
					}
					if (this.km.mode == 230) {
						if (
							this.co_j.x < j - 80 - 8 ||
							this.co_j.x > j + 64 + 8 ||
							this.km.kettei_c == 1 ||
							this.km.cancel_c == 1
						) {
							this.km.off(3);
							this.km.off(7);
							this.km.off(8);
							this.km.mode = 50;
						}
						break;
					}
					if (
						this.km.mode == 250 &&
						(this.co_j.x < j - 80 - 8 || this.co_j.x > j + 64 + 8 || this.km.cancel_c == 1 || this.km.kettei_c == 1)
					) {
						this.km.off(3);
						this.km.mode = 50;
					}
				} else {
					characterobject.gf = false;
				}
				break;

			case 5000: // 乗ると壊れるブロック
				if (
					j > this.maps.wx - 96 &&
					j < this.maps.wx + this.gg.di.width + 64 &&
					k > this.maps.wy - 96 &&
					k < this.maps.wy + this.gg.di.height + 64
				) {
					characterobject.gf = true;
					this.a_hf = true;
				} else {
					characterobject.gf = false;
				}
				if (characterobject.c3 == 0) {
					if (
						characterobject.gf &&
						this.co_j.c >= 100 &&
						this.co_j.c < 200 &&
						this.co_j.x + 15 >= j &&
						this.co_j.x + 15 <= j + 31 &&
						this.co_j.y == k - 32
					)
						characterobject.c3 = 100;
					break;
				}
				if (characterobject.c3 < 100) break;
				characterobject.c3++;
				if (characterobject.c3 < 108) break;
				var k13 = rightShiftIgnoreSign(j, 5);
				var k19 = rightShiftIgnoreSign(k, 5);
				if (this.maps.map_bg[k13][k19 - 1] == 4) this.maps.putBGCode(k13, k19, 4);
				else this.maps.putBGCode(k13, k19, 0);
				this.mSet2(k13 * 32, k19 * 32, 80, 12, -24);
				this.mSet2(k13 * 32, k19 * 32, 80, -12, -24);
				this.gs.rsAddSound(16);
				this.jZutuki(k13 * 32, k19 * 32 - 32, 2);
				characterobject.c = 0;
				break;

			case 5300: // 得点でグレネードを売る人
				if (
					j > this.maps.wx - 32 &&
					j < this.maps.wx + this.gg.di.width &&
					k > this.maps.wy - 32 &&
					k < this.maps.wy + this.gg.di.height
				) {
					characterobject.gf = true;
					this.a_hf = true;
					if (this.km.mode == 50) {
						if (this.co_j.x < j - 80 - 8 || this.co_j.x > j + 64 + 8) this.km.mode = 100;
						break;
					}
					if (this.km.mode == 100) {
						if (this.co_j.x >= j - 80 && this.co_j.x <= j + 64 && Math.abs(k - this.co_j.y) < 8 && !this.gk.tr1_f) {
							this.km.init1(3);
							this.km.setMessage(3, this.tdb.getValue("serifu_grenade_shop_name"));
							this.addSerifu2(3, "serifu_grenade_shop-", 3);
							this.km.activeSerifu(
								3,
								rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40,
								rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16,
								272,
								Color.cyan
							);
							this.km.mode = 200;
							this.km.move();
						}
						break;
					}
					if (this.km.mode == 200) {
						if (this.km.cancel_c == 1) {
							this.km.off(3);
							this.km.mode = 50;
							break;
						}
						if (this.co_j.x < j - 80 - 8 || this.co_j.x > j + 64 + 8 || Math.abs(k - this.co_j.y) > 16) {
							this.km.off(3);
							this.km.mode = 50;
							break;
						}
						if (this.km.kettei_c != 1) break;
						this.co_j.c = 150;
						if (this.co_j.x <= j || this.maps.getBGCode(j + 48, k) >= 18) {
							if (this.maps.getBGCode(j - 16, k) >= 18) {
								this.co_j.x = j - 15;
								this.co_j.muki = 1;
							} else {
								this.co_j.x = j - 48;
								this.co_j.muki = 1;
							}
						} else {
							this.co_j.x = j + 48;
							this.co_j.muki = 0;
						}
						this.co_j.y = k;
						this.co_j.vx = 0;
						this.co_j.vy = 0;
						this.co_j.pt = 100;
						this.setmyw_pt = this.co_j.pt;
						this.setmyw_muki = this.co_j.muki;
						this.co_j.c1 = 10;
						this.km.init1(7);
						this.km.setMessage(7, this.tdb.getValue("serifu_grenade_shop-4"));
						this.km.addItem(7, "\uFF11");
						this.km.addItem(7, "\uFF12");
						this.km.addItem(7, "\uFF13");
						this.km.addItem(7, "\uFF14");
						this.km.addItem(7, "\uFF15");
						this.km.addItem(7, "\uFF16");
						this.km.addItem(7, "\uFF17");
						this.km.addItem(7, "\uFF18");
						this.km.addItem(7, "\uFF19");
						this.km.addItem(7, "\uFF11\uFF10");
						this.km.active(
							7,
							rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 - 116,
							rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 32,
							144
						);
						this.km.mode = 220;
						break;
					}
					if (this.km.mode == 220) {
						this.co_j.c1 = 10;
						if (this.km.cancel_c == 1) {
							this.km.offActivewindow(7, 3);
							this.km.mode = 200;
							break;
						}
						if (this.km.kettei_c != 1) break;
						var k5 = this.km.selectedIndex[7] + 1;
						var j3 = this.tdb.getValueInt("grenade_shop_score");
						if (j3 < 1) j3 = 1;
						j3 *= k5;
						if (this.score >= j3) {
							this.score -= j3;
							this.j_gr_kazu += k5;
							this.gs.rsAddSound(7);
							this.km.init1(8);
							this.km.addItem(8, this.tdb.getValue("serifu_grenade_shop-6"));
							this.km.activeIchigyou(
								8,
								rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 + 48,
								rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 80,
								224
							);
							this.km.mode = 230;
						} else {
							this.km.init1(8);
							this.km.addItem(8, this.tdb.getValue("serifu_grenade_shop-5"));
							this.km.activeIchigyou(
								8,
								rounddown(this.gg.di.width * 0.625 - 224 / 2) - 40 + 48,
								rounddown(this.gg.di.height * 0.2875 - (30 + 3 * 14) / 2) - 16 + 80,
								224
							);
							this.km.mode = 240;
						}
						break;
					}
					if (this.km.mode == 230) {
						if (
							this.co_j.x < j - 80 - 8 ||
							this.co_j.x > j + 64 + 8 ||
							this.km.kettei_c == 1 ||
							this.km.cancel_c == 1
						) {
							this.km.off(3);
							this.km.off(7);
							this.km.off(8);
							this.km.mode = 50;
						}
						break;
					}
					if (this.km.mode == 240) {
						this.co_j.c1 = 10;
						if (this.co_j.x < j - 80 - 8 || this.co_j.x > j + 64 + 8 || this.km.kettei_c == 1) {
							this.km.off(3);
							this.km.off(7);
							this.km.off(8);
							this.co_j.c1 = 6;
							this.km.mode = 50;
							break;
						}
						if (this.km.cancel_c == 1) {
							this.km.offActivewindow(8, 7);
							this.km.mode = 220;
						}
						break;
					}
					if (
						this.km.mode == 250 &&
						(this.co_j.x < j - 80 - 8 || this.co_j.x > j + 64 + 8 || this.km.cancel_c == 1 || this.km.kettei_c == 1)
					) {
						this.km.off(3);
						this.km.mode = 50;
					}
				} else {
					characterobject.gf = false;
				}
				break;
		}
		characterobject.x = j;
		characterobject.y = k;
	}

	/**
	 * 範囲内に存在するスイッチ式の仕掛けをON状態にする
	 * @param x1 {number} 始点X座標 (ブロック座標)
	 * @param y1 {number} 始点Y座標 (プロック座標)
	 * @param x2 {number} 終点X座標 (プロック座標)
	 * @param y2 {number} 終点Y座標 (プロック座標)
	 * @param [type=1] {number} ON/OFFスイッチ専用の追加引数 2を指定すると追加の処理を行う
	 */
	onASwitch(i: number, j: number, k: number, l: number, i1?: number) {
		if (arguments.length == 4) i1 = 1;
		for (var j1 = 0; j1 <= this.a_kazu; j1++) {
			var k2 = this.co_a[j1].c;
			if (
				k2 == 3700 ||
				k2 == 3710 ||
				k2 == 3800 ||
				k2 == 3810 ||
				k2 == 3900 ||
				k2 == 3910 ||
				k2 == 4000 ||
				k2 == 4010 ||
				k2 == 4100 ||
				k2 == 4110 ||
				k2 == 4200 ||
				k2 == 4210 ||
				k2 == 4300 ||
				k2 == 4400 ||
				k2 == 4410 ||
				k2 == 4500 ||
				k2 == 5200 ||
				k2 == 5210
			) {
				var k1 = rightShiftIgnoreSign(this.co_a[j1].x, 5);
				var i2 = rightShiftIgnoreSign(this.co_a[j1].y, 5);
				if (k1 >= i && k1 <= k && i2 >= j && i2 <= l) this.co_a[j1].c5 = 1;
				continue;
			}
			if (k2 == 150 || k2 == 160) {
				var l1 = rightShiftIgnoreSign(this.co_a[j1].vx, 5);
				var j2 = rightShiftIgnoreSign(this.co_a[j1].vy, 5);
				if (l1 >= i && l1 <= k && j2 >= j && j2 <= l) this.co_a[j1].c5 = 1;
				continue;
			}
			if (i1 != 2 || (k2 != 3500 && k2 != 3600) || this.co_a[j1].c4 != 2) continue;
			// k2 == 3600 スイッチ ↑キーでON/OFF
			this.co_a[j1].c3 = 100;
			// k2 == 3500 スイッチ 重なるとON/OFF
			if (k2 == 3500) this.co_a[j1].c3 = 1;
		}
	}

	/**
	 * 範囲内に存在するスイッチ式の仕掛けをOFF状態にする
	 * @param x1 {number} 始点X座標 (ブロック座標)
	 * @param y1 {number} 始点Y座標 (プロック座標)
	 * @param x2 {number} 終点X座標 (プロック座標)
	 * @param y2 {number} 終点Y座標 (プロック座標)
	 * @param [type=1] {number} ON/OFFスイッチ専用の追加引数 2を指定すると追加の処理を行う
	 */
	offASwitch(i: number, j: number, k: number, l: number, i1?: number) {
		if (arguments.length == 4) i1 = 1;
		for (var j1 = 0; j1 <= this.a_kazu; j1++) {
			var k2 = this.co_a[j1].c;
			if (
				k2 == 3700 ||
				k2 == 3710 ||
				k2 == 3800 ||
				k2 == 3810 ||
				k2 == 3900 ||
				k2 == 3910 ||
				k2 == 4000 ||
				k2 == 4010 ||
				k2 == 4100 ||
				k2 == 4110 ||
				k2 == 4200 ||
				k2 == 4210 ||
				k2 == 4300 ||
				k2 == 4400 ||
				k2 == 4410 ||
				k2 == 4500 ||
				k2 == 5200 ||
				k2 == 5210
			) {
				var k1 = rightShiftIgnoreSign(this.co_a[j1].x, 5);
				var i2 = rightShiftIgnoreSign(this.co_a[j1].y, 5);
				if (k1 >= i && k1 <= k && i2 >= j && i2 <= l) this.co_a[j1].c5 = 0;
				continue;
			}
			if (k2 == 150 || k2 == 160) {
				var l1 = rightShiftIgnoreSign(this.co_a[j1].vx, 5);
				var j2 = rightShiftIgnoreSign(this.co_a[j1].vy, 5);
				if (l1 >= i && l1 <= k && j2 >= j && j2 <= l) this.co_a[j1].c5 = 0;
				continue;
			}
			if (i1 != 2 || (k2 != 3500 && k2 != 3600) || this.co_a[j1].c4 != 2) continue;
			this.co_a[j1].c3 = 0;
			if (k2 == 3500) this.co_a[j1].c3 = 101;
		}
	}

	/**
	 * ボスの更新処理
	 */
	bMove() {
		this.co_b.update(this);
	}

	/**
	 * 指定座標(ブロック単位)の位置に、指定したコードの？ブロックを設置します
	 * 詳細は {@link https://github.com/Ryo-9399/mc_canvas/wiki/メソッド-MainProgram.prototype.hSet} を参照
	 * FXでは個数制限は80個
	 * @param blockX {number} X座標(ブロック単位)
	 * @param blockY {number} Y座標(ブロック単位)
	 * @param code {number} 設置するブロックのコード
	 * @see {@link https://github.com/Ryo-9399/mc_canvas/wiki/メソッド-MainProgram.prototype.hSet}
	 */
	hSet(blockX: number, blockY: number, code: number) {
		for (let i = 0; i <= 79; i++) {
			// まだ使われていないものを探して追加する
			if (this.co_h[i].c > 0) continue;
			const characterobject = this.co_h[i];
			characterobject.c = code;
			characterobject.x = blockX;
			characterobject.y = blockY;
			break;
		}
	}

	/**
	 * ？ブロックを叩かれた後の状態にして無効化する 一度取った後の1UPブロックに使用
	 * @param x {number} X座標(ブロック単位)
	 * @param y {number} Y座標(ブロック単位)
	 * @param c 無効化対象のブロックのコード これとCaracterObject.cの値が一致していれば無効化される
	 */
	hDelete(i: number, j: number, k: number) {
		for (var l = 0; l <= 79; l++)
			if (this.co_h[l].c == k && this.co_h[l].x == i && this.co_h[l].y == j) {
				this.co_h[l].c = 0;
				this.maps.putBGCode(i, j, 41);
			}
	}

	/**
	 * ？ブロックを叩いたときの処理
	 * @param x {number} X座標(ブロック単位)
	 * @param y {number} Y座標(ブロック単位)
	 */
	hAttack(i: number, j: number) {
		var k = 0;
		do {
			if (k > 79) break;
			var characterobject = this.co_h[k];
			if (characterobject.c != 0 && characterobject.x == i && characterobject.y == j) {
				switch (characterobject.c) {
					default:
						break;

					case 100: // コインが1枚出る
						this.mSet(i * 32, j * 32 - 32, 2000);
						this.gs.rsAddSound(6);
						break;

					case 200: // コインが3枚出る
						this.mSet(i * 32, j * 32 - 32, 2010);
						this.mSet(i * 32, j * 32 - 32, 2020);
						this.mSet(i * 32, j * 32 - 32, 2000);
						this.gs.rsAddSound(6);
						break;

					case 300: // アイテム（ファイヤーボール）が出る
						this.mSet(i * 32, j * 32 - 32, 2100);
						this.gs.rsAddSound(13);
						break;

					case 400: // アイテム（バリア）が出る
						this.mSet(i * 32, j * 32 - 32, 2110);
						this.gs.rsAddSound(13);
						break;

					case 500: // アイテム（タイム）が出る
						this.mSet(i * 32, j * 32 - 32, 2120);
						this.gs.rsAddSound(13);
						break;

					case 600: // アイテム（ジェット）が出る
						this.mSet(i * 32, j * 32 - 32, 2130);
						this.gs.rsAddSound(13);
						break;

					case 700: // アイテム（ヘルメット）が出る
						this.mSet(i * 32, j * 32 - 32, 2140);
						this.gs.rsAddSound(13);
						break;

					case 800: // アイテム（しっぽ）が出る
						this.mSet(i * 32, j * 32 - 32, 2150);
						this.gs.rsAddSound(13);
						break;

					case 900: // アイテム（ドリル）が出る
						this.mSet(i * 32, j * 32 - 32, 2160);
						this.gs.rsAddSound(13);
						break;

					case 1000: // アイテム（グレネード）が出る
						this.mSet(i * 32, j * 32 - 32, 2170);
						this.gs.rsAddSound(13);
						break;

					case 1100: // アイテム（1UP）が出る
						this.mSet(i * 32, j * 32 - 32, 2180);
						this.stage_1up_f[this.stage - 1] = false;
						this.gs.rsAddSound(13);
						break;

					case 2000: // 右にブロック１が10個出る
						var l = 1;
						do {
							if (l > 10) break;
							var k4 = i + l;
							if (k4 > this.mapWidth || (this.maps.map_bg[k4][j] != 0 && this.maps.map_bg[k4][j] != 4)) break;
							this.maps.putBGCode(k4, j, 20);
							l++;
						} while (true);
						this.gs.rsAddSound(13);
						break;

					case 2100: // 左にブロック１が10個出る
						var i1 = -1;
						do {
							if (i1 < -10) break;
							var l4 = i + i1;
							if (l4 < 1 || (this.maps.map_bg[l4][j] != 0 && this.maps.map_bg[l4][j] != 4)) break;
							this.maps.putBGCode(l4, j, 20);
							i1--;
						} while (true);
						this.gs.rsAddSound(13);
						break;

					case 2200: // 上にハシゴが10個出る
						for (var l2 = -1; l2 >= -10; l2--) {
							var i5 = j + l2;
							if (i5 < 10 || (this.maps.map_bg[i][i5] != 0 && this.maps.map_bg[i][i5] != 4)) break;
							this.maps.putBGCode(i, i5, 10);
							if (this.gg.layer_mode == 2 && this.clear_type != 3) this.map_data_option[i][i5] = true;
						}

						this.gs.rsAddSound(13);
						break;

					case 2300: // 上にブロック１が10個出る
						var i3 = -1;
						do {
							if (i3 < -10) break;
							var j5 = j + i3;
							if (j5 < 10 || (this.maps.map_bg[i][j5] != 0 && this.maps.map_bg[i][j5] != 4)) break;
							this.maps.putBGCode(i, j5, 20);
							i3--;
						} while (true);
						this.gs.rsAddSound(13);
						break;

					case 2400: // 上にブロック１が2個出る
						var j3 = -1;
						do {
							if (j3 < -2) break;
							var k5 = j + j3;
							if (k5 < 10 || (this.maps.map_bg[i][k5] != 0 && this.maps.map_bg[i][k5] != 4)) break;
							this.maps.putBGCode(i, k5, 20);
							j3--;
						} while (true);
						this.gs.rsAddSound(13);
						break;

					case 2500: // 右にブロック１が2個出る
						var j1 = 1;
						do {
							if (j1 > 2) break;
							var l5 = i + j1;
							if (l5 > this.mapWidth || (this.maps.map_bg[l5][j] != 0 && this.maps.map_bg[l5][j] != 4)) break;
							this.maps.putBGCode(l5, j, 20);
							j1++;
						} while (true);
						this.gs.rsAddSound(13);
						break;

					case 2600: // 左にブロック１が2個出る
						var k1 = -1;
						do {
							if (k1 < -2) break;
							var i6 = i + k1;
							if (i6 < 1 || (this.maps.map_bg[i6][j] != 0 && this.maps.map_bg[i6][j] != 4)) break;
							this.maps.putBGCode(i6, j, 20);
							k1--;
						} while (true);
						this.gs.rsAddSound(13);
						break;

					case 2700: // ジャンプ台が出る
						this.aSet(i * 32, j * 32 - 32, 700, i * 32);
						this.gs.rsAddSound(13);
						break;

					case 2800: // トゲが出る
						this.maps.putBGCode(i, j - 1, 5);
						this.gs.rsAddSound(13);
						break;

					case 2900: // 周囲10マスのトゲをコインに変換
						for (var k3 = -10; k3 <= 10; k3++) {
							for (var l1 = -10; l1 <= 10; l1++)
								if (
									i + l1 >= 1 &&
									i + l1 <= this.mapWidth &&
									j + k3 >= 10 &&
									j + k3 <= this.mapHeight + 9 &&
									this.maps.map_bg[i + l1][j + k3] == 5
								)
									this.maps.putBGCode(i + l1, j + k3, 9);
						}

						this.gs.rsAddSound(6);
						break;

					case 3000: // 周囲10マスのトゲをブロック１に変換
						for (var l3 = -10; l3 <= 10; l3++) {
							for (var i2 = -10; i2 <= 10; i2++)
								if (
									i + i2 >= 1 &&
									i + i2 <= this.mapWidth &&
									j + l3 >= 10 &&
									j + l3 <= this.mapHeight + 9 &&
									this.maps.map_bg[i + i2][j + l3] == 5
								)
									this.maps.putBGCode(i + i2, j + l3, 20);
						}

						this.gs.rsAddSound(13);
						break;

					case 3100: // 周囲10マスのブロック１をコインに変換
						for (var i4 = -10; i4 <= 10; i4++) {
							for (var j2 = -10; j2 <= 10; j2++)
								if (
									i + j2 >= 1 &&
									i + j2 <= this.mapWidth &&
									j + i4 >= 10 &&
									j + i4 <= this.mapHeight + 9 &&
									this.maps.map_bg[i + j2][j + i4] == 20
								)
									this.maps.putBGCode(i + j2, j + i4, 9);
						}

						this.gs.rsAddSound(6);
						break;

					case 3200: // 周囲10マスのブロック４を消去
						for (var j4 = -10; j4 <= 10; j4++) {
							for (var k2 = -10; k2 <= 10; k2++)
								if (
									i + k2 >= 1 &&
									i + k2 <= this.mapWidth &&
									j + j4 >= 10 &&
									j + j4 <= this.mapHeight + 9 &&
									this.maps.map_bg[i + k2][j + j4] == 23
								)
									this.maps.putBGCode(i + k2, j + j4, 0);
						}

						this.gs.rsAddSound(7);
						break;

					case 3300: // アイテム（水平に飛ぶファイヤーボール）が出る
						this.mSet(i * 32, j * 32 - 32, 2186);
						this.gs.rsAddSound(13);
						break;

					case 3400: // アイテム（跳ねるファイヤーボール）が出る
						this.mSet(i * 32, j * 32 - 32, 2187);
						this.gs.rsAddSound(13);
						break;

					case 3500: // アイテム（ダブルファイヤーボール）が出る
						this.mSet(i * 32, j * 32 - 32, 2188);
						this.gs.rsAddSound(13);
						break;

					case 3600: // 右にブロック１破壊砲発射
						if (this.co_jm[6].c == 0) {
							this.jmSet2(i * 32, j * 32, 206, 6);
							break;
						}
						if (this.co_jm[7].c == 0) {
							this.jmSet2(i * 32, j * 32, 206, 7);
							break;
						}
						if (this.co_jm[8].c == 0) this.jmSet2(i * 32, j * 32, 206, 8);
						break;

					case 3700: // 左にブロック１破壊砲発射
						if (this.co_jm[6].c == 0) {
							this.jmSet2(i * 32, j * 32, 207, 6);
							break;
						}
						if (this.co_jm[7].c == 0) {
							this.jmSet2(i * 32, j * 32, 207, 7);
							break;
						}
						if (this.co_jm[8].c == 0) this.jmSet2(i * 32, j * 32, 207, 8);
						break;

					case 3800: // 上にブロック１破壊砲発射
						if (this.co_jm[6].c == 0) {
							this.jmSet2(i * 32, j * 32, 208, 6);
							break;
						}
						if (this.co_jm[7].c == 0) {
							this.jmSet2(i * 32, j * 32, 208, 7);
							break;
						}
						if (this.co_jm[8].c == 0) this.jmSet2(i * 32, j * 32, 208, 8);
						break;

					case 3900: // 下にブロック１破壊砲発射
						if (this.co_jm[6].c == 0) {
							this.jmSet2(i * 32, j * 32, 209, 6);
							break;
						}
						if (this.co_jm[7].c == 0) {
							this.jmSet2(i * 32, j * 32, 209, 7);
							break;
						}
						if (this.co_jm[8].c == 0) this.jmSet2(i * 32, j * 32, 209, 8);
						break;

					case 4000: // アイテム（グレネード5発）が出る
						this.mSet(i * 32, j * 32 - 32, 2171);
						this.gs.rsAddSound(13);
						break;

					case 4100: // アイテム（コンティニュー）が出る
						this.mSet(i * 32, j * 32 - 32, 2172);
						this.gs.rsAddSound(13);
						break;

					case 4200: // 周囲10マスにスイッチONの影響を与える
						this.onASwitch(i - 10, j - 10, i + 10, j + 10);
						this.gs.rsAddSound(13);
						break;

					case 4300: // 周囲10マスにスイッチOFFの影響を与える
						this.offASwitch(i - 10, j - 10, i + 10, j + 10);
						this.gs.rsAddSound(13);
						break;

					case 4400: // 周囲5マスにスイッチONの影響を与える
						this.onASwitch(i - 5, j - 5, i + 5, j + 5);
						this.gs.rsAddSound(13);
						break;

					case 4500: // 周囲5マスにスイッチOFFの影響を与える
						this.offASwitch(i - 5, j - 5, i + 5, j + 5);
						this.gs.rsAddSound(13);
						break;
				}
				this.maps.putBGCode(i, j, 41);
				characterobject.c = 0;
				break;
			}
			k++;
		} while (true);
	}

	/**
	 * 新しく床を生成し、床IDを返します。
	 * 床の位置、大きさ、形及び画像を指定できます。
	 *
	 * 床の形は次のように指定します。
	 *
	 * * `"line"`: 線分
	 * * `"triangle"`: 直角三角形
	 * * `"mount"`: 台形
	 * * `"circle"`: 円
	 * * `"half_circle"`: 上半分の半円
	 * * `"half_circle_line"`: 上半分の半円（線のみ）
	 * * `"wave_up"`: 右上がりの曲線
	 * * `"wave_up_line"`: 右上がりの曲線（線のみ）
	 * * `"wave_down"`: 右下がりの曲線
	 * * `"wave_down_line"`: 右下がりの曲線（線のみ）
	 * * `"rect"`: 矩形
	 * * `"pattern"`: 矩形（画像は{@link MasaoJSS#setYukaPattern|setYukaPattern}で設定）
	 * * その他: 矩形（ファイル名を指定）
	 *
	 * 引数`x2`, `y2`の意味は`type`の値によって変わります。
	 * `type`が`line`, `triangle`, `mount`の場合は線分の右下の座標です。
	 * `rect`, `pattern`および画像の場合は矩形の大きさです。
	 * `circie`の場合は`x2`が円の半径となり、`y2`は無視されます。
	 * その他の床は大きさが固定となり、`x2`も`y2`も無視されます。
	 *
	 * @param {number} x 床のX座標
	 * @param {number} y 床のY座標
	 * @param {number} x2 X方向大きさまたは右下の座標
	 * @param {number} y2 Y方向大きさまたは右下の座標
	 * @param {string} type 床の形
	 *
	 * @returns {number} 床ID 失敗した場合は-1
	 * @see {@link MasaoJSS#newYuka}
	 */
	newYuka(s: string | number, s1: string | number, s2: string | number, s3: string | number, s4: string) {
		var j = 32;
		var k = 320;
		var l = 96;
		var i1 = 64;
		if (this.ml_mode != 100 && this.ml_mode != 90 && this.ml_mode != 91 && this.ml_mode != 95) return -1;

		j = parseInt(s as string);
		k = parseInt(s1 as string);
		l = parseInt(s2 as string);
		i1 = parseInt(s3 as string);
		if (isNaN(j) || isNaN(k) || isNaN(l) || isNaN(i1)) j = -9999;
		if (j == -9999) return -1;
		var i = 0;
		do {
			if (i > this.yuka_id_max) this.yo.push(new YukaObject());
			if (this.yo[i].con == 0) {
				if (s4 == "line") {
					this.yo[i].init();
					this.yo[i].con = 200;
					this.yo[i].x = j;
					this.yo[i].y = k;
					this.yo[i].x2 = l;
					this.yo[i].y2 = i1;
					this.yo[i].color = Color.yellow;
				} else if (s4 == "triangle") {
					this.yo[i].init();
					this.yo[i].con = 210;
					this.yo[i].x = j;
					this.yo[i].y = k;
					this.yo[i].x2 = l;
					this.yo[i].y2 = i1;
					this.yo[i].color = Color.yellow;
				} else if (s4 == "mount") {
					this.yo[i].init();
					this.yo[i].con = 220;
					this.yo[i].x = j;
					this.yo[i].y = k;
					this.yo[i].x2 = l;
					this.yo[i].y2 = i1;
					this.yo[i].color = Color.yellow;
				} else if (s4 == "circle") {
					this.yo[i].init();
					this.yo[i].con = 300;
					this.yo[i].x = j;
					this.yo[i].y = k;
					this.yo[i].x2 = l;
					this.yo[i].y2 = i1;
					this.yo[i].color = Color.yellow;
				} else if (s4 == "half_circle") {
					this.yo[i].init();
					this.yo[i].con = 350;
					this.yo[i].x = j;
					this.yo[i].y = k;
					this.yo[i].x2 = l;
					this.yo[i].y2 = i1;
					this.yo[i].color = Color.yellow;
				} else if (s4 == "half_circle_line") {
					this.yo[i].init();
					this.yo[i].con = 360;
					this.yo[i].x = j;
					this.yo[i].y = k;
					this.yo[i].x2 = l;
					this.yo[i].y2 = i1;
					this.yo[i].color = Color.yellow;
				} else if (s4 == "wave_up") {
					this.yo[i].init();
					this.yo[i].con = 400;
					this.yo[i].x = j;
					this.yo[i].y = k;
					this.yo[i].x2 = l;
					this.yo[i].y2 = i1;
					this.yo[i].color = Color.yellow;
				} else if (s4 == "wave_up_line") {
					this.yo[i].init();
					this.yo[i].con = 410;
					this.yo[i].x = j;
					this.yo[i].y = k;
					this.yo[i].x2 = l;
					this.yo[i].y2 = i1;
					this.yo[i].color = Color.yellow;
				} else if (s4 == "wave_down") {
					this.yo[i].init();
					this.yo[i].con = 450;
					this.yo[i].x = j;
					this.yo[i].y = k;
					this.yo[i].x2 = l;
					this.yo[i].y2 = i1;
					this.yo[i].color = Color.yellow;
				} else if (s4 == "wave_down_line") {
					this.yo[i].init();
					this.yo[i].con = 460;
					this.yo[i].x = j;
					this.yo[i].y = k;
					this.yo[i].x2 = l;
					this.yo[i].y2 = i1;
					this.yo[i].color = Color.yellow;
				} else if (s4 == "pattern") {
					this.yo[i].init();
					this.yo[i].con = 120;
					this.yo[i].x = j;
					this.yo[i].y = k;
					this.yo[i].width = l;
					this.yo[i].height = i1;
					this.yo[i].pt = 0;
					this.yo[i].pth = 0;
				} else if (s4 == "rect") {
					this.yo[i].init();
					this.yo[i].con = 110;
					this.yo[i].x = j;
					this.yo[i].y = k;
					this.yo[i].width = l;
					this.yo[i].height = i1;
					this.yo[i].color = Color.yellow;
				} else {
					this.yo[i].init();
					this.yo[i].con = 100;
					this.yo[i].x = j;
					this.yo[i].y = k;
					this.yo[i].width = l;
					this.yo[i].height = i1;
					this.yo[i].img = this.gg.loadImage(s4);
				}
				break;
			}
			i++;
		} while (true);
		return i;
	}

	/**
	 * {@link MainProgram#newYuka}で作った床の位置を変更します。
	 * 引数が3つの場合位置のみ、5つの場合は床の大きさも変更します。
	 *
	 * @param {number} id 床ID
	 * @param {number} x X座標
	 * @param {number} y Y座標
	 * @param {number} [x2] X方向大きさまたは右下の座標
	 * @param {number} [y2] Y方向大きさまたは右下の座標
	 * @returns {boolean} 成功したかどうか
	 * @see {@link MasaoJSS#setYukaPosition}
	 */
	setYukaPosition(id: string | number, x: string | number, y: string | number): boolean;
	setYukaPosition(
		id: string | number,
		x: string | number,
		y: string | number,
		x2: string | number,
		y2: string | number
	): boolean;
	setYukaPosition(
		s: string | number,
		s1: string | number,
		s2: string | number,
		s3?: string | number,
		s4?: string | number
	) {
		if (s3 === undefined || s4 === undefined) {
			var i = 0;
			var j = 32;
			var k = 320;
			if (this.ml_mode != 100 && this.ml_mode != 91 && this.ml_mode != 96) return false;

			i = parseInt(s as string);
			j = parseInt(s1 as string);
			k = parseInt(s2 as string);
			if (isNaN(i) || isNaN(j) || isNaN(k)) i = -1;
			if (i < 0) return false;
			if (i > this.yuka_id_max) return false;
			var flag = false;
			if (this.yo[i].con >= 100 || this.yo[i].con < 200) flag = true;
			else if (this.yo[i].con >= 300 || this.yo[i].con < 500) flag = true;
			if (!flag) {
				return false;
			} else {
				this.yo[i].x_buff = j;
				this.yo[i].y_buff = k;
				this.yo[i].buff_f = true;
				return true;
			}
		} else {
			var i = 0;
			var j = 32;
			var k = 320;
			var l = 32;
			var i1 = 320;
			if (this.ml_mode != 100 && this.ml_mode != 91 && this.ml_mode != 96) return false;

			i = parseInt(s as string);
			j = parseInt(s1 as string);
			k = parseInt(s2 as string);
			l = parseInt(s3 as string);
			i1 = parseInt(s4 as string);
			if (isNaN(i) || isNaN(j) || isNaN(k) || isNaN(l) || isNaN(i1)) i = -1;
			if (i < 0) return false;
			if (i > this.yuka_id_max) return false;
			if (this.yo[i].con < 200 || this.yo[i].con >= 300) {
				return false;
			} else {
				this.yo[i].x_buff = j;
				this.yo[i].y_buff = k;
				this.yo[i].x2_buff = l;
				this.yo[i].y2_buff = i1;
				this.yo[i].buff_f = true;
				return true;
			}
		}
	}

	/**
	 * {@link MainProgram#newYuka}で作った床の当たり判定を変更します。
	 * `type`に2を与えると当たり判定がなくなり、その他の値だと当たり判定ありになります。
	 *
	 * @param {number} id 床ID
	 * @param {number} type type値
	 * @returns {boolean} 成功したかどうか
	 * @see {@link MasaoJSS#setYukaType}
	 */
	setYukaType(s: string | number, s1: string | number) {
		var i = 0;
		var j = 1;
		if (this.ml_mode != 100 && this.ml_mode != 91 && this.ml_mode != 96) return false;

		i = parseInt(s as string);
		j = parseInt(s1 as string);
		if (isNaN(i) || isNaN(j)) j = -1;
		if (i < 0) return false;
		if (i > this.yuka_id_max) return false;
		if (this.yo[i].con == 0) return false;
		if (j >= 1 || j <= 2) {
			this.yo[i].type = j;
			return true;
		} else {
			return false;
		}
	}

	/**
	 * {@link MainProgram#newYuka}で作った床を消去します。
	 *
	 * @param {number} id 床ID
	 * @returns {boolean} 成功したかどうか
	 * @see {@link MasaoJSS#disposeYuka}
	 */
	disposeYuka(s: string | number) {
		var i = 0;
		var byte0 = 1;
		if (this.ml_mode != 100 && this.ml_mode != 91 && this.ml_mode != 96) return false;

		i = parseInt(s as string);
		if (isNaN(i)) byte0 = -1;
		if (i < 0) return false;
		if (i > this.yuka_id_max) return false;
		if (this.yo[i].con == 0) {
			return false;
		} else {
			this.yo[i].con = 0;
			return true;
		}
	}

	/**
	 * {@link MainProgram#newYuka}で作った床の色を設定します。
	 * 色の各成分は0から255の整数で与えます。
	 *
	 * @param {number} id 床ID
	 * @param {number} r R値
	 * @param {number} g G値
	 * @param {number} b B値
	 * @param {number} alpha 不透明度
	 * @returns {boolean} 成功したかどうか
	 * @see {@link MasaoJSS#setYukaColor}
	 */
	setYukaColor(
		id: string | number,
		r: string | number,
		g: string | number,
		b: string | number,
		alpha: string | number
	): boolean;
	setYukaColor(index: number, color: Color): boolean;
	setYukaColor(
		a1: string | number,
		a2: string | number | Color,
		a3?: string | number,
		a4?: string | number,
		a5?: string | number
	): boolean {
		if (arguments.length == 5) {
			var i = 0;
			var j = 255;
			var k = 255;
			var l = 255;
			var i1 = 255;
			if (this.ml_mode != 100 && this.ml_mode != 90 && this.ml_mode != 91 && this.ml_mode != 96) return false;

			i = parseInt(a1 as string);
			j = parseInt(a2 as string);
			k = parseInt(a3 as string);
			l = parseInt(a4 as string);
			i1 = parseInt(a5 as string);
			if (isNaN(i) || isNaN(j) || isNaN(k) || isNaN(l) || isNaN(i1)) i = -1;
			if (i < 0) return false;
			if (i > this.yuka_id_max) return false;
			if ((this.yo[i].con < 200 || this.yo[i].con >= 500) && this.yo[i].con != 110) {
				return false;
			} else {
				this.yo[i].color = new Color(j, k, l, i1);
				return true;
			}
		} else {
			if (this.ml_mode != 100 && this.ml_mode != 90 && this.ml_mode != 91 && this.ml_mode != 96) return false;
			if (a1 < 0) return false;
			if (a1 > this.yuka_id_max) return false;
			if ((this.yo[a1 as number].con < 200 || this.yo[a1 as number].con >= 500) && this.yo[a1 as number].con != 110) {
				return false;
			} else {
				this.yo[a1 as number].color = a2 as Color;
				return true;
			}
		}
	}

	/**
	 * {@link MainProgram#newYuka}で作った床のパターン画像を設定します。
	 * `type`が`"pattern"`の床に対して有効です。
	 *
	 * @param {number} id 床ID
	 * @param {number} pattern パターンコード
	 * @param {number} direction 向き（0ならそのまま、1なら左右逆
	 * @returns {boolean} 成功したかどうか
	 * @see {@link MasaoJSS#setYukaPattern}
	 */
	setYukaPattern(s: string, s1: string, s2: string) {
		var i = 0;
		var j = 0;
		var k = 0;
		if (this.ml_mode != 100 && this.ml_mode != 91 && this.ml_mode != 96) return false;

		i = parseInt(s);
		j = parseInt(s1);
		k = parseInt(s2);
		if (isNaN(i) || isNaN(j) || isNaN(k)) i = -1;
		if (i < 0) return false;
		if (i > this.yuka_id_max) return false;
		if (this.yo[i].con < 100 || this.yo[i].con >= 200) return false;
		if (j < 0 || j > 249) return false;
		if (k < 0 || k > 1) {
			return false;
		} else {
			this.yo[i].con = 120;
			this.yo[i].pt = j;
			this.yo[i].pth = k as InversionKind;
			return true;
		}
	}

	/**
	 * {@link MainProgram#newYuka}で作った床の画像を変更します。
	 * `type`が`rect`, `pattern`及びその他で作成した床を対象にできます。
	 *
	 * @param {number} id 床ID
	 * @param {String|ImageBuff} image ファイル名または画像オブジェクト
	 * @returns {boolean} 成功したかどうか
	 * @see {@link MasaoJSS#setYukaImage}
	 */
	setYukaImage(s: string, a2: string | ImageBuff | null) {
		var i = 0;
		if (this.ml_mode != 100 && this.ml_mode != 91 && this.ml_mode != 96) return false;

		i = parseInt(s);
		if (isNaN(i)) i = -1;
		if (i < 0) return false;
		if (i > this.yuka_id_max) return false;
		if (this.yo[i].con < 100 || this.yo[i].con >= 200) {
			return false;
		} else {
			this.yo[i].con = 100;
			if (typeof a2 == "string") this.yo[i].img = this.gg.loadImage(a2);
			else this.yo[i].img = a2;
			return true;
		}
	}

	/**
	 * 主人公がある床に乗っているかどうかを判定します。
	 * 乗っていれば1、乗っていなければ0、それ以外の場合には-1が返ります。
	 *
	 * @param {number} id 床ID
	 *
	 * @returns {number}
	 * @see {@link MasaoJSS#isRideYuka}
	 */
	isRideYuka(s: string | number) {
		var i = 0;
		if (this.ml_mode != 100 && this.ml_mode != 91 && this.ml_mode != 96) return -1;
		if (this.co_j.c < 100 || this.co_j.c >= 200) return -1;

		i = parseInt(s as string);
		if (isNaN(i)) i = -1;
		if (i < 0) return -1;
		if (i > this.yuka_id_max) return -1;
		if (this.j_tokugi == 14 || this.j_tokugi == 15) return -1;
		if (this.yo[i].con == 0) return -1;
		if (this.yo[i].type == 2) return 0;
		if (this.yo[i].con >= 100 && this.yo[i].con < 200)
			return this.co_j.vy < 0 ||
				this.co_j.y + 32 != this.yo[i].y ||
				this.co_j.x + 15 < this.yo[i].x ||
				this.co_j.x + 15 >= this.yo[i].x + this.yo[i].width
				? 0
				: 1;
		if (this.yo[i].con >= 200 && this.yo[i].con < 300)
			return this.getSLOY(this.yo[i].x, this.yo[i].y, this.yo[i].x2, this.yo[i].y2) != this.co_j.y ? 0 : 1;
		if (this.yo[i].con >= 300 && this.yo[i].con < 350) {
			var j = this.getSCOY(this.yo[i].x, this.yo[i].y, this.yo[i].x2, this.yo[i].y2);
			return j != this.co_j.y ? 0 : 1;
		}
		if (this.yo[i].con >= 350 && this.yo[i].con < 400) {
			var k = this.getSHCOY(this.yo[i].x, this.yo[i].y, this.yo[i].x2, this.yo[i].y2);
			return k != this.co_j.y ? 0 : 1;
		}
		if (this.yo[i].con >= 400 && this.yo[i].con < 450) {
			var l = this.getSWUpOY(this.yo[i].x, this.yo[i].y, this.yo[i].x2, this.yo[i].y2);
			return l != this.co_j.y ? 0 : 1;
		}
		if (this.yo[i].con >= 450 && this.yo[i].con < 500) {
			var i1 = this.getSWDownOY(this.yo[i].x, this.yo[i].y, this.yo[i].x2, this.yo[i].y2);
			return i1 != this.co_j.y ? 0 : 1;
		} else {
			return -1;
		}
	}

	/**
	 * 主人公が地面に立っているかを判定します。
	 * 立っているなら1、いないなら0、それ以外の場合は-1を返します。
	 * 地面ではなく床に乗っている場合は0になります。
	 *
	 * @returns {number} 地面に立っているか
	 * @see {@link MasaoJSS#isRideGround}
	 */
	isRideGround() {
		if (this.ml_mode != 100 && this.ml_mode != 91 && this.ml_mode != 96) return -1;
		if (this.co_j.c < 100 || this.co_j.c >= 200) return -1;
		if (this.j_tokugi == 14 || this.j_tokugi == 15) return -1;
		var i = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 32);
		if (i >= 20 || i == 10) return 1;
		if (this.co_j.y % 32 == 0 && i == 15 && this.co_j.vy >= 0) return 1;
		i = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 15);
		if (i == 10) return 1;
		var j = this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31);
		if ((j == 18 || j == 19) && this.co_j.vy >= 0) {
			var k = this.getSakamichiY(this.co_j.x + 15, this.co_j.y + 31);
			if (k <= this.co_j.y) return 1;
		}
		return 0;
	}

	/**
	 * 床オブジェクトの更新処理
	 */
	moveYuka() {
		if (this.yuka_id_max < 0) return;
		this.yuka_ride_id = -1;
		for (var i = 0; i <= this.yuka_id_max; i++) {
			var yukaobject = this.yo[i];
			if (yukaobject.con == 0) continue;
			if (yukaobject.con >= 100 && yukaobject.con < 200) {
				if (yukaobject.type == 2 || this.co_j.c < 100 || this.co_j.c >= 200) {
					if (yukaobject.buff_f) {
						yukaobject.buff_f = false;
						yukaobject.x = yukaobject.x_buff;
						yukaobject.y = yukaobject.y_buff;
					}
					continue;
				}
				if (
					this.co_j.vy >= 0 &&
					this.j_tokugi != 14 &&
					this.j_tokugi != 15 &&
					this.co_j.x + 15 >= yukaobject.x &&
					this.co_j.x + 15 < yukaobject.x + yukaobject.width &&
					this.co_j.y + 32 == yukaobject.y
				)
					this.yuka_ride_id = i;
				if (!yukaobject.buff_f) continue;
				yukaobject.buff_f = false;
				if (yukaobject.x > yukaobject.x_buff) {
					if (this.yuka_ride_id == i) {
						var k = yukaobject.x_buff - yukaobject.x;
						yukaobject.x = yukaobject.x_buff;
						this.co_j.x = this.co_j.x + k;
						var i3 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
						var k5 = rightShiftIgnoreSign(this.co_j.y, 5);
						var i8 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
						if (this.maps.map_bg[i3][k5] >= 20 || this.maps.map_bg[i3][i8] >= 20) this.co_j.x = i3 * 32 + 32 - 14;
					} else {
						yukaobject.x = yukaobject.x_buff;
						if (this.j_tokugi == 14 || this.j_tokugi == 15) {
							if (
								this.co_j.x + 31 >= yukaobject.x &&
								this.co_j.x < yukaobject.x + yukaobject.width &&
								this.co_j.y + 31 >= yukaobject.y &&
								this.co_j.y < yukaobject.y + yukaobject.height
							) {
								this.co_j.x = yukaobject.x - 32;
								if (this.co_j.vx > 0) this.co_j.vx = 0;
								var j3 = rightShiftIgnoreSign(this.co_j.x, 5);
								var l5 = rightShiftIgnoreSign(this.co_j.y, 5);
								var j8 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
								if (this.maps.map_bg[j3][l5] >= 20 || this.maps.map_bg[j3][j8] >= 20) this.jShinu(4);
							}
						} else if (
							this.co_j.x + 15 >= yukaobject.x &&
							this.co_j.x + 15 < yukaobject.x + yukaobject.width &&
							this.co_j.y + 31 >= yukaobject.y &&
							this.co_j.y < yukaobject.y + yukaobject.height
						) {
							this.co_j.x = yukaobject.x - 16;
							if (this.co_j.vx > 0) this.co_j.vx = 0;
							var k3 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
							var i6 = rightShiftIgnoreSign(this.co_j.y, 5);
							var k8 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
							if (this.maps.map_bg[k3][i6] >= 20 || this.maps.map_bg[k3][k8] >= 20) {
								this.co_j.x = k3 * 32 + 15;
								this.jShinu(4);
							}
						}
					}
				} else if (yukaobject.x < yukaobject.x_buff)
					if (this.yuka_ride_id == i) {
						var l = yukaobject.x_buff - yukaobject.x;
						yukaobject.x = yukaobject.x_buff;
						this.co_j.x = this.co_j.x + l;
						var l3 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
						var j6 = rightShiftIgnoreSign(this.co_j.y, 5);
						var l8 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
						if (this.maps.map_bg[l3][j6] >= 20 || this.maps.map_bg[l3][l8] >= 20) this.co_j.x = l3 * 32 - 16;
					} else {
						yukaobject.x = yukaobject.x_buff;
						if (this.j_tokugi == 14 || this.j_tokugi == 15) {
							if (
								this.co_j.x + 31 >= yukaobject.x &&
								this.co_j.x < yukaobject.x + yukaobject.width &&
								this.co_j.y + 31 >= yukaobject.y &&
								this.co_j.y < yukaobject.y + yukaobject.height
							) {
								this.co_j.x = yukaobject.x + yukaobject.width;
								if (this.co_j.vx < 0) this.co_j.vx = 0;
								var i4 = rightShiftIgnoreSign(this.co_j.x + 31, 5);
								var k6 = rightShiftIgnoreSign(this.co_j.y, 5);
								var i9 = rightShiftIgnoreSign(this.co_j.y + 31, 5);
								if (this.maps.map_bg[i4][k6] >= 20 || this.maps.map_bg[i4][i9] >= 20) this.jShinu(4);
							}
						} else if (
							this.co_j.x + 15 >= yukaobject.x &&
							this.co_j.x + 15 < yukaobject.x + yukaobject.width &&
							this.co_j.y + 31 >= yukaobject.y &&
							this.co_j.y < yukaobject.y + yukaobject.height
						) {
							this.co_j.x = yukaobject.x + yukaobject.width - 15;
							if (this.co_j.vx < 0) this.co_j.vx = 0;
							var j4 = rightShiftIgnoreSign(this.co_j.x + 15, 5);
							var l6 = rightShiftIgnoreSign(this.co_j.y, 5);
							if (this.maps.map_bg[j4][l6] >= 20 || this.maps.map_bg[j4][l6] >= 20) {
								this.co_j.x = j4 * 32 - 32 + 15;
								this.jShinu(4);
							}
						}
					}
				if (yukaobject.y > yukaobject.y_buff) {
					if (this.yuka_ride_id == i) {
						yukaobject.y = yukaobject.y_buff;
						this.co_j.y = yukaobject.y - 32;
						if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y) >= 18) {
							this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 5) * 32 + 16;
							this.jShinu(3);
						}
						continue;
					}
					yukaobject.y = yukaobject.y_buff;
					if (this.j_tokugi == 14 || this.j_tokugi == 15) {
						if (
							this.co_j.x + 31 < yukaobject.x ||
							this.co_j.x >= yukaobject.x + yukaobject.width ||
							this.co_j.y + 31 < yukaobject.y ||
							this.co_j.y >= yukaobject.y + yukaobject.height
						)
							continue;
						this.co_j.y = yukaobject.y - 32;
						this.co_j.vy = 0;
						if (
							this.maps.getBGCode(this.co_j.x, this.co_j.y) >= 20 ||
							this.maps.getBGCode(this.co_j.x + 31, this.co_j.y) >= 20
						)
							this.jShinu(3);
						continue;
					}
					if (
						this.co_j.x + 15 < yukaobject.x ||
						this.co_j.x + 15 >= yukaobject.x + yukaobject.width ||
						this.co_j.y + 31 < yukaobject.y ||
						this.co_j.y >= yukaobject.y + yukaobject.height
					)
						continue;
					this.co_j.y = yukaobject.y - 32;
					this.co_j.vy = 0;
					this.yuka_ride_id = i;
					if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y) >= 18) {
						this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 5) * 32 + 16;
						this.jShinu(3);
					}
					continue;
				}
				if (yukaobject.y >= yukaobject.y_buff) continue;
				if (this.yuka_ride_id == i) {
					yukaobject.y = yukaobject.y_buff;
					this.co_j.y = yukaobject.y - 32;
					continue;
				}
				var k9 = yukaobject.y_buff - yukaobject.y;
				yukaobject.y = yukaobject.y_buff;
				if (this.j_tokugi == 14 || this.j_tokugi == 15) {
					if (
						this.co_j.x + 31 < yukaobject.x ||
						this.co_j.x >= yukaobject.x + yukaobject.width ||
						this.co_j.y + 31 < yukaobject.y ||
						this.co_j.y >= yukaobject.y + yukaobject.height
					)
						continue;
					this.co_j.y = yukaobject.y + yukaobject.height;
					this.co_j.vy = 0;
					if (
						this.maps.getBGCode(this.co_j.x, this.co_j.y + 31) >= 20 ||
						this.maps.getBGCode(this.co_j.x + 31, this.co_j.y + 31) >= 20
					)
						this.jShinu(3);
					continue;
				}
				if (
					this.co_j.x + 15 < yukaobject.x ||
					this.co_j.x + 15 >= yukaobject.x + yukaobject.width ||
					this.co_j.y + 31 < yukaobject.y ||
					this.co_j.y >= yukaobject.y + yukaobject.height
				)
					continue;
				this.co_j.y = yukaobject.y + yukaobject.height;
				this.co_j.vy = 0;
				this.co_j.vy = k9 * 10;
				if (this.co_j.vy > 160) this.co_j.vy = 160;
				if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20) {
					this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
					this.jShinu(3);
				}
				continue;
			}
			if (yukaobject.con >= 200 && yukaobject.con < 300) {
				if (yukaobject.type == 2 || this.co_j.c < 100 || this.co_j.c >= 200) {
					if (yukaobject.buff_f) {
						yukaobject.buff_f = false;
						yukaobject.x = yukaobject.x_buff;
						yukaobject.y = yukaobject.y_buff;
						yukaobject.x2 = yukaobject.x2_buff;
						yukaobject.y2 = yukaobject.y2_buff;
					}
					continue;
				}
				if (this.co_j.vy >= 0) {
					var i1 = this.getSLOY(yukaobject.x, yukaobject.y, yukaobject.x2, yukaobject.y2);
					if (i1 == this.co_j.y) this.yuka_ride_id = i;
				}
				if (!yukaobject.buff_f) continue;
				yukaobject.buff_f = false;
				if (this.yuka_ride_id == i) {
					var j11 = Math.floor(
						(Math.atan2(
							Math.abs(yukaobject.y2_buff - yukaobject.y_buff),
							Math.abs(yukaobject.x2_buff - yukaobject.x_buff)
						) *
							180) /
							3.1400001049041748
					);
					if (j11 > 70 || yukaobject.x_buff >= yukaobject.x2_buff) {
						yukaobject.x = yukaobject.x_buff;
						yukaobject.y = yukaobject.y_buff;
						yukaobject.x2 = yukaobject.x2_buff;
						yukaobject.y2 = yukaobject.y2_buff;
						this.yuka_ride_id = -1;
						this.co_j.vy = 0;
						continue;
					}
					var l9 = yukaobject.x2 - yukaobject.x;
					var i10 = this.co_j.x + 15 - yukaobject.x;
					var j10 = yukaobject.x2_buff - yukaobject.x_buff;
					var k10 = rounddown((j10 * i10) / l9);
					var l10 = yukaobject.y2_buff - yukaobject.y_buff;
					var i11 = rounddown((l10 * i10) / l9);
					this.co_j.x = yukaobject.x_buff + k10 - 15;
					this.co_j.y = yukaobject.y_buff + i11 - 32;
					this.co_j.vy = 0;
					yukaobject.x = yukaobject.x_buff;
					yukaobject.y = yukaobject.y_buff;
					yukaobject.x2 = yukaobject.x2_buff;
					yukaobject.y2 = yukaobject.y2_buff;
					var j1 = this.getSLOY(yukaobject.x, yukaobject.y, yukaobject.x2, yukaobject.y2);
					if (j1 >= 0) this.co_j.y = j1;
					if (this.co_j.x < 17) this.co_j.x = 17;
					if (this.co_j.x + 15 >= (this.mapWidth + 1) * 32) this.co_j.x = this.mapWidth * 32 + 16;
				} else {
					yukaobject.x = yukaobject.x_buff;
					yukaobject.y = yukaobject.y_buff;
					yukaobject.x2 = yukaobject.x2_buff;
					yukaobject.y2 = yukaobject.y2_buff;
				}
				continue;
			}
			if (yukaobject.con >= 300 && yukaobject.con < 350) {
				if (yukaobject.type == 2 || this.co_j.c < 100 || this.co_j.c >= 200) {
					if (yukaobject.buff_f) {
						yukaobject.buff_f = false;
						yukaobject.x = yukaobject.x_buff;
						yukaobject.y = yukaobject.y_buff;
					}
					continue;
				}
				if (this.co_j.vy >= 0) {
					var k1 = this.getSCOY(yukaobject.x, yukaobject.y, yukaobject.x2, yukaobject.y2);
					if (k1 == this.co_j.y) this.yuka_ride_id = i;
				}
				if (!yukaobject.buff_f) continue;
				yukaobject.buff_f = false;
				if (this.yuka_ride_id == i) {
					var k4 = yukaobject.x_buff - yukaobject.x;
					var i7 = yukaobject.y_buff - yukaobject.y;
					yukaobject.x = yukaobject.x_buff;
					yukaobject.y = yukaobject.y_buff;
					this.co_j.x = this.co_j.x + k4;
					this.co_j.y = this.co_j.y + i7;
					if (i7 < 0 && this.maps.getBGCode(this.co_j.x + 15, this.co_j.y) >= 18) {
						this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 5) * 32 + 32 - 16;
						this.jShinu(3);
					}
					continue;
				}
				if (yukaobject.y < yukaobject.y_buff && yukaobject.y < this.co_j.y) {
					yukaobject.x = yukaobject.x_buff;
					yukaobject.y = yukaobject.y_buff;
					var l1 = this.getSCOYCeiling(yukaobject.x, yukaobject.y, yukaobject.x2, yukaobject.y2);
					if (l1 < 0 || this.co_j.y > l1 || this.co_j.y < l1 - 31) continue;
					this.co_j.y = l1;
					if (this.co_j.vy < 0) this.co_j.vy = 0;
					if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20) {
						this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
						this.jShinu(3);
					}
				} else {
					yukaobject.x = yukaobject.x_buff;
					yukaobject.y = yukaobject.y_buff;
				}
				continue;
			}
			if (yukaobject.con >= 350 && yukaobject.con < 400) {
				if (yukaobject.type == 2 || this.co_j.c < 100 || this.co_j.c >= 200) {
					if (yukaobject.buff_f) {
						yukaobject.buff_f = false;
						yukaobject.x = yukaobject.x_buff;
						yukaobject.y = yukaobject.y_buff;
					}
					continue;
				}
				if (this.co_j.vy >= 0) {
					var i2 = this.getSHCOY(yukaobject.x, yukaobject.y, yukaobject.x2, yukaobject.y2);
					if (i2 == this.co_j.y) this.yuka_ride_id = i;
				}
				if (!yukaobject.buff_f) continue;
				yukaobject.buff_f = false;
				if (this.yuka_ride_id == i) {
					var l4 = yukaobject.x_buff - yukaobject.x;
					var j7 = yukaobject.y_buff - yukaobject.y;
					yukaobject.x = yukaobject.x_buff;
					yukaobject.y = yukaobject.y_buff;
					this.co_j.x = this.co_j.x + l4;
					this.co_j.y = this.co_j.y + j7;
				} else {
					yukaobject.x = yukaobject.x_buff;
					yukaobject.y = yukaobject.y_buff;
				}
				continue;
			}
			if (yukaobject.con >= 400 && yukaobject.con < 450) {
				if (yukaobject.type == 2 || this.co_j.c < 100 || this.co_j.c >= 200) {
					if (yukaobject.buff_f) {
						yukaobject.buff_f = false;
						yukaobject.x = yukaobject.x_buff;
						yukaobject.y = yukaobject.y_buff;
					}
					continue;
				}
				if (this.co_j.vy >= 0) {
					var j2 = this.getSWUpOY(yukaobject.x, yukaobject.y, yukaobject.x2, yukaobject.y2);
					if (j2 == this.co_j.y) this.yuka_ride_id = i;
				}
				if (!yukaobject.buff_f) continue;
				yukaobject.buff_f = false;
				if (this.yuka_ride_id == i) {
					var i5 = yukaobject.x_buff - yukaobject.x;
					var k7 = yukaobject.y_buff - yukaobject.y;
					yukaobject.x = yukaobject.x_buff;
					yukaobject.y = yukaobject.y_buff;
					this.co_j.x = this.co_j.x + i5;
					this.co_j.y = this.co_j.y + k7;
				} else {
					yukaobject.x = yukaobject.x_buff;
					yukaobject.y = yukaobject.y_buff;
				}
				continue;
			}
			if (yukaobject.con < 450 || yukaobject.con >= 500) continue;
			if (yukaobject.type == 2 || this.co_j.c < 100 || this.co_j.c >= 200) {
				if (yukaobject.buff_f) {
					yukaobject.buff_f = false;
					yukaobject.x = yukaobject.x_buff;
					yukaobject.y = yukaobject.y_buff;
				}
				continue;
			}
			if (this.co_j.vy >= 0) {
				var k2 = this.getSWDownOY(yukaobject.x, yukaobject.y, yukaobject.x2, yukaobject.y2);
				if (k2 == this.co_j.y) this.yuka_ride_id = i;
			}
			if (!yukaobject.buff_f) continue;
			yukaobject.buff_f = false;
			if (this.yuka_ride_id == i) {
				var j5 = yukaobject.x_buff - yukaobject.x;
				var l7 = yukaobject.y_buff - yukaobject.y;
				yukaobject.x = yukaobject.x_buff;
				yukaobject.y = yukaobject.y_buff;
				this.co_j.x = this.co_j.x + j5;
				this.co_j.y = this.co_j.y + l7;
			} else {
				yukaobject.x = yukaobject.x_buff;
				yukaobject.y = yukaobject.y_buff;
			}
		}

		if (this.yuka_ride_id == -1) {
			for (var j = 0; j <= this.yuka_id_max; j++) {
				var yukaobject1 = this.yo[j];
				if (yukaobject1.con < 200 || yukaobject1.con >= 300 || yukaobject1.type == 2 || this.co_j.vy < 0) continue;
				var l2 = this.getSLOY(yukaobject1.x, yukaobject1.y, yukaobject1.x2, yukaobject1.y2);
				if (l2 != this.co_j.y) continue;
				this.yuka_ride_id = j;
				break;
			}
		}
	}

	/**
	 * 床オブジェクトの描画処理
	 */
	drawYuka() {
		var j20 = 0;
		var k20 = 0;
		var l20 = 0;
		var i21 = 0;
		var ai = new Array(13);
		var ai1 = new Array(13);
		if (this.yuka_id_max < 0) return;
		label0: for (var i = 0; i <= this.yuka_id_max; i++) {
			var yukaobject = this.yo[i];
			if (yukaobject.con == 0) continue;
			if (yukaobject.con == 100) {
				yukaobject.view_x = this.yo[i].x - this.maps.wx;
				yukaobject.view_y = this.yo[i].y - this.maps.wy;
				if (
					yukaobject.view_x + yukaobject.width <= 0 ||
					yukaobject.view_x >= this.gg.di.width ||
					yukaobject.view_y + yukaobject.height <= 0 ||
					yukaobject.view_y >= this.gg.di.height
				) {
					yukaobject.draw_f = false;
					continue;
				}
				yukaobject.draw_f = true;
				if (yukaobject.img != null) this.hg.drawImage(yukaobject.img, yukaobject.view_x, yukaobject.view_y, this.ap);
				continue;
			}
			if (yukaobject.con == 110) {
				yukaobject.view_x = this.yo[i].x - this.maps.wx;
				yukaobject.view_y = this.yo[i].y - this.maps.wy;
				if (
					yukaobject.view_x + yukaobject.width <= 0 ||
					yukaobject.view_x >= this.gg.di.width ||
					yukaobject.view_y + yukaobject.height <= 0 ||
					yukaobject.view_y >= this.gg.di.height
				) {
					yukaobject.draw_f = false;
				} else {
					yukaobject.draw_f = true;
					this.hg.setColor(yukaobject.color);
					this.hg.fillRect(yukaobject.view_x, yukaobject.view_y, yukaobject.width, yukaobject.height);
				}
				continue;
			}
			if (yukaobject.con == 120) {
				yukaobject.view_x = this.yo[i].x - this.maps.wx;
				yukaobject.view_y = this.yo[i].y - this.maps.wy;
				if (
					yukaobject.view_x + yukaobject.width <= 0 ||
					yukaobject.view_x >= this.gg.di.width ||
					yukaobject.view_y + yukaobject.height <= 0 ||
					yukaobject.view_y >= this.gg.di.height
				) {
					yukaobject.draw_f = false;
					continue;
				}
				yukaobject.draw_f = true;
				var i3 = yukaobject.pt;
				if (i3 > 0) this.gg.drawPattern(yukaobject.view_x, yukaobject.view_y, i3, yukaobject.pth);
				continue;
			}
			if (yukaobject.con == 200) {
				yukaobject.view_x = this.yo[i].x - this.maps.wx;
				yukaobject.view_y = this.yo[i].y - this.maps.wy;
				var j3 = yukaobject.view_x;
				var j8 = this.yo[i].x2 - this.maps.wx;
				if ((j3 < 0 && j8 < 0) || (j3 >= this.gg.di.width && j8 >= this.gg.di.width)) {
					yukaobject.draw_f = false;
				} else {
					yukaobject.draw_f = true;
					this.hg.setColor(yukaobject.color);
					//this.hg.drawLine(j3, l5, j8, l10);
				}
				continue;
			}
			if (yukaobject.con == 210) {
				yukaobject.view_x = this.yo[i].x - this.maps.wx;
				yukaobject.view_y = this.yo[i].y - this.maps.wy;
				var k3 = yukaobject.view_x;
				var i6 = yukaobject.view_y;
				var k8 = this.yo[i].x2 - this.maps.wx;
				var i11 = this.yo[i].y2 - this.maps.wy;
				if ((k3 < 0 && k8 < 0) || (k3 >= this.gg.di.width && k8 >= this.gg.di.width)) {
					yukaobject.draw_f = false;
					continue;
				}
				yukaobject.draw_f = true;
				if (k3 <= k8) {
					var j13;
					var k15;
					if (i6 >= i11) {
						j13 = k8;
						k15 = i6;
					} else {
						j13 = k3;
						k15 = i11;
					}
					ai[0] = k3;
					ai1[0] = i6;
					ai[1] = k8;
					ai1[1] = i11;
					ai[2] = j13;
					ai1[2] = k15;
				} else {
					var k13;
					var l15;
					if (i11 >= i6) {
						k13 = k8;
						l15 = i6;
					} else {
						k13 = k3;
						l15 = i11;
					}
					ai[0] = k3;
					ai1[0] = i6;
					ai[1] = k8;
					ai1[1] = i11;
					ai[2] = k13;
					ai1[2] = l15;
				}
				this.hg.setColor(yukaobject.color);
				this.hg.fillPolygon(ai, ai1, 3);
				continue;
			}
			if (yukaobject.con == 220) {
				yukaobject.view_x = this.yo[i].x - this.maps.wx;
				yukaobject.view_y = this.yo[i].y - this.maps.wy;
				var l3 = yukaobject.view_x;
				var j6 = yukaobject.view_y;
				var l8 = this.yo[i].x2 - this.maps.wx;
				var j11 = this.yo[i].y2 - this.maps.wy;
				if ((l3 < 0 && l8 < 0) || (l3 >= this.gg.di.width && l8 >= this.gg.di.width)) {
					yukaobject.draw_f = false;
					continue;
				}
				yukaobject.draw_f = true;
				if (l3 <= l8) {
					var l13;
					var i16;
					if (j6 >= j11) {
						l13 = l8;
						i16 = j6;
					} else {
						l13 = l3;
						i16 = j11;
					}
					ai[0] = l3;
					ai1[0] = j6;
					ai[1] = l8;
					ai1[1] = j11;
					ai[2] = l13;
					ai1[2] = i16;
				} else {
					var i14;
					var j16;
					if (j11 >= j6) {
						i14 = l8;
						j16 = j6;
					} else {
						i14 = l3;
						j16 = j11;
					}
					ai[0] = l3;
					ai1[0] = j6;
					ai[1] = l8;
					ai1[1] = j11;
					ai[2] = i14;
					ai1[2] = j16;
				}
				this.hg.setColor(yukaobject.color);
				this.hg.fillPolygon(ai, ai1, 3);
				if (l3 <= l8) {
					if (j6 >= j11) {
						if (j6 < this.gg.di.height) this.hg.fillRect(l3, j6, l8 - l3, this.gg.di.height - j6);
						continue;
					}
					if (j11 < this.gg.di.height) this.hg.fillRect(l3, j11, l8 - l3, this.gg.di.height - j11);
					continue;
				}
				if (j11 >= j6) {
					if (j6 > 0) this.hg.fillRect(l8, 0, l3 - l8, j6);
					continue;
				}
				if (j11 > 0) this.hg.fillRect(l8, 0, l3 - l8, j11);
				continue;
			}
			if (yukaobject.con == 300) {
				yukaobject.view_x = this.yo[i].x - this.maps.wx;
				yukaobject.view_y = this.yo[i].y - this.maps.wy;
				var i4 = yukaobject.view_x - yukaobject.x2;
				var k6 = yukaobject.view_y - yukaobject.x2;
				var i9 = yukaobject.view_x + yukaobject.x2;
				var k11 = yukaobject.view_y + yukaobject.x2;
				if (i9 < 0 || i4 >= this.gg.di.width || k11 < 0 || k6 >= this.gg.di.height) {
					yukaobject.draw_f = false;
				} else {
					yukaobject.draw_f = true;
					this.hg.setColor(yukaobject.color);
					this.hg.fillOval(i4, k6, i9 - i4, k11 - k6);
				}
				continue;
			}
			if (yukaobject.con == 350) {
				yukaobject.view_x = this.yo[i].x - this.maps.wx;
				yukaobject.view_y = this.yo[i].y - this.maps.wy;
				var j4 = yukaobject.view_x;
				var l6 = yukaobject.view_y;
				var j9 = yukaobject.view_x + 240;
				if (j9 < 0 || j4 > this.gg.di.width || l6 > this.gg.di.height) {
					yukaobject.draw_f = false;
					continue;
				}
				yukaobject.draw_f = true;
				this.hg.setColor(yukaobject.color);
				var j21 = 0;
				ai[j21] = j4;
				ai1[j21] = l6 + 64;
				j21++;
				for (var j = 140; j >= 90; j -= 5) {
					ai[j21] = rounddown(j4 + 120 + Math.cos((j * 3.1415926535897931) / 180) * 144, true, this);
					ai1[j21] = rounddown(l6 + 144 - Math.sin((j * 3.1415926535897931) / 180) * 144, true, this);
					j21++;
				}

				ai[j21] = j4 + 120;
				ai1[j21] = l6 + 64;
				j21++;
				this.hg.fillPolygon(ai, ai1, j21);
				j21 = 0;
				for (var k = 90; k >= 40; k -= 5) {
					ai[j21] = rounddown(j4 + 120 + Math.cos((k * 3.1415926535897931) / 180) * 144, true, this);
					ai1[j21] = rounddown(l6 + 144 - Math.sin((k * 3.1415926535897931) / 180) * 144, true, this);
					j21++;
				}

				ai[j21] = j4 + 240;
				ai1[j21] = l6 + 64;
				j21++;
				ai[j21] = j4 + 120;
				ai1[j21] = l6 + 64;
				j21++;
				this.hg.fillPolygon(ai, ai1, j21);
				continue;
			}
			if (yukaobject.con == 360) {
				yukaobject.view_x = this.yo[i].x - this.maps.wx;
				yukaobject.view_y = this.yo[i].y - this.maps.wy;
				var k4 = yukaobject.view_x;
				var i7 = yukaobject.view_y;
				var k9 = yukaobject.view_x + 240;
				if (k9 < 0 || k4 > this.gg.di.width || i7 > this.gg.di.height) {
					yukaobject.draw_f = false;
					continue;
				}
				yukaobject.draw_f = true;
				this.hg.setColor(yukaobject.color);
				var l = 140;
				do {
					if (l < 45) continue label0;
					var j14 = rounddown(k4 + 120 + Math.cos((l * 3.1415926535897931) / 180) * 144, true, this);
					var k16 = rounddown(i7 + 144 - Math.sin((l * 3.1415926535897931) / 180) * 144, true, this);
					var l17 = rounddown(k4 + 120 + Math.cos(((l - 5) * 3.1415926535897931) / 180) * 144, true, this);
					var i19 = rounddown(i7 + 144 - Math.sin(((l - 5) * 3.1415926535897931) / 180) * 144, true, this);
					this.hg.drawLine(j14, k16, l17, i19);
					if (l == 140) this.hg.drawLine(k4, i7 + 63, j14, k16);
					else if (l == 45) this.hg.drawLine(k4 + 239, i7 + 63, l17, i19);
					l -= 5;
				} while (true);
			}
			if (yukaobject.con == 400) {
				yukaobject.view_x = this.yo[i].x - this.maps.wx;
				yukaobject.view_y = this.yo[i].y - this.maps.wy;
				var l4 = yukaobject.view_x;
				var j7 = yukaobject.view_y;
				var l9 = yukaobject.view_x + 256;
				var j12 = yukaobject.view_y + 128;
				if (l9 < 0 || l4 > this.gg.di.width || j7 > this.gg.di.height) {
					yukaobject.draw_f = false;
					continue;
				}
				yukaobject.draw_f = true;
				this.hg.setColor(yukaobject.color);
				var k21 = 0;
				for (var i1 = 0; i1 <= 50; i1 += 5) {
					ai[k21] = rounddown(l4 + Math.sin((i1 * 3.1415926535897931) / 180) * 160, true, this);
					ai1[k21] = rounddown(j7 - 32 + Math.cos((i1 * 3.1415926535897931) / 180) * 160, true, this);
					if (i1 == 50) {
						j20 = ai[k21];
						k20 = ai1[k21];
					}
					k21++;
				}

				ai[k21] = j20;
				ai1[k21] = j7 + 128;
				this.hg.fillPolygon(ai, ai1, 12);
				k21 = 0;
				for (var j1 = 0; j1 <= 50; j1 += 5) {
					ai[k21] = rounddown(l4 + 256 - Math.sin((j1 * 3.1415926535897931) / 180) * 160, true, this);
					ai1[k21] = rounddown(j7 + 160 - Math.cos((j1 * 3.1415926535897931) / 180) * 160, true, this);
					if (j1 == 50) {
						l20 = ai[k21];
						i21 = ai1[k21];
					}
					k21++;
				}

				ai[k21] = l20;
				ai1[k21] = j7 + 128;
				k21++;
				ai[k21] = l4 + 256;
				ai1[k21] = j7 + 128;
				this.hg.fillPolygon(ai, ai1, 13);
				ai[0] = j20;
				ai1[0] = k20;
				ai[1] = l20;
				ai1[1] = i21;
				ai[2] = l20;
				ai1[2] = j7 + 128;
				ai[3] = j20;
				ai1[3] = j7 + 128;
				this.hg.fillPolygon(ai, ai1, 4);
				if (j12 < this.gg.di.height) this.hg.fillRect(l4, j7 + 128, 256, this.gg.di.height - (j7 + 128));
				continue;
			}
			if (yukaobject.con == 410) {
				yukaobject.view_x = this.yo[i].x - this.maps.wx;
				yukaobject.view_y = this.yo[i].y - this.maps.wy;
				var i5 = yukaobject.view_x;
				var k7 = yukaobject.view_y;
				var i10 = yukaobject.view_x + 256;
				var k12 = yukaobject.view_y + 128;
				if (i10 < 0 || i5 > this.gg.di.width || k7 > this.gg.di.height || k12 < 0) {
					yukaobject.draw_f = false;
					continue;
				}
				yukaobject.draw_f = true;
				this.hg.setColor(yukaobject.color);
				for (var k1 = 0; k1 <= 45; k1 += 5) {
					var k14 = rounddown(i5 + Math.sin((k1 * 3.1415926535897931) / 180) * 160, true, this);
					var l16 = rounddown(k7 - 32 + Math.cos((k1 * 3.1415926535897931) / 180) * 160, true, this);
					var i18 = rounddown(i5 + Math.sin(((k1 + 5) * 3.1415926535897931) / 180) * 160, true, this);
					var j19 = rounddown(k7 - 32 + Math.cos(((k1 + 5) * 3.1415926535897931) / 180) * 160, true, this);
					this.hg.drawLine(k14, l16, i18, j19);
					if (k1 == 45) {
						j20 = i18;
						k20 = j19;
					}
				}

				for (var l1 = 0; l1 <= 45; l1 += 5) {
					var l14 = rounddown(i5 + 256 - Math.sin((l1 * 3.1415926535897931) / 180) * 160, true, this);
					var i17 = rounddown(k7 + 160 - Math.cos((l1 * 3.1415926535897931) / 180) * 160, true, this);
					var j18 = rounddown(i5 + 256 - Math.sin(((l1 + 5) * 3.1415926535897931) / 180) * 160, true, this);
					var k19 = rounddown(k7 + 160 - Math.cos(((l1 + 5) * 3.1415926535897931) / 180) * 160, true, this);
					this.hg.drawLine(l14, i17, j18, k19);
					if (l1 == 45) {
						l20 = j18;
						i21 = k19;
					}
				}

				this.hg.drawLine(j20, k20, l20, i21);
				continue;
			}
			if (yukaobject.con == 450) {
				yukaobject.view_x = this.yo[i].x - this.maps.wx;
				yukaobject.view_y = this.yo[i].y - this.maps.wy;
				var j5 = yukaobject.view_x;
				var l7 = yukaobject.view_y;
				var j10 = yukaobject.view_x + 256;
				var l12 = yukaobject.view_y + 128;
				if (j10 < 0 || j5 > this.gg.di.width || l7 > this.gg.di.height) {
					yukaobject.draw_f = false;
					continue;
				}
				yukaobject.draw_f = true;
				this.hg.setColor(yukaobject.color);
				var l21 = 0;
				for (var i2 = 0; i2 <= 50; i2 += 5) {
					ai[l21] = rounddown(j10 - Math.sin((i2 * 3.1415926535897931) / 180) * 160, true, this);
					ai1[l21] = rounddown(l7 - 32 + Math.cos((i2 * 3.1415926535897931) / 180) * 160, true, this);
					if (i2 == 50) {
						j20 = ai[l21];
						k20 = ai1[l21];
					}
					l21++;
				}

				ai[l21] = j20;
				ai1[l21] = l7 + 128;
				this.hg.fillPolygon(ai, ai1, 12);
				l21 = 0;
				for (var j2 = 0; j2 <= 50; j2 += 5) {
					ai[l21] = rounddown(j5 + Math.sin((j2 * 3.1415926535897931) / 180) * 160, true, this);
					ai1[l21] = rounddown(l7 + 160 - Math.cos((j2 * 3.1415926535897931) / 180) * 160, true, this);
					if (j2 == 50) {
						l20 = ai[l21];
						i21 = ai1[l21];
					}
					l21++;
				}

				ai[l21] = l20;
				ai1[l21] = l7 + 128;
				l21++;
				ai[l21] = j5;
				ai1[l21] = l7 + 128;
				this.hg.fillPolygon(ai, ai1, 13);
				ai[0] = j20;
				ai1[0] = k20;
				ai[1] = l20;
				ai1[1] = i21;
				ai[2] = l20;
				ai1[2] = l7 + 128;
				ai[3] = j20;
				ai1[3] = l7 + 128;
				this.hg.fillPolygon(ai, ai1, 4);
				if (l12 < this.gg.di.height) this.hg.fillRect(j5, l7 + 128, 256, this.gg.di.height - (l7 + 128));
				continue;
			}
			if (yukaobject.con != 460) continue;
			yukaobject.view_x = this.yo[i].x - this.maps.wx;
			yukaobject.view_y = this.yo[i].y - this.maps.wy;
			var k5 = yukaobject.view_x;
			var i8 = yukaobject.view_y;
			var k10 = yukaobject.view_x + 256;
			var i13 = yukaobject.view_y + 128;
			if (k10 < 0 || k5 > this.gg.di.width || i8 > this.gg.di.height || i13 < 0) {
				yukaobject.draw_f = false;
				continue;
			}
			yukaobject.draw_f = true;
			this.hg.setColor(yukaobject.color);
			for (var k2 = 0; k2 <= 45; k2 += 5) {
				var i15 = rounddown(k10 - Math.sin((k2 * 3.1415926535897931) / 180) * 160, true, this);
				var j17 = rounddown(i8 - 32 + Math.cos((k2 * 3.1415926535897931) / 180) * 160, true, this);
				var k18 = rounddown(k10 - Math.sin(((k2 + 5) * 3.1415926535897931) / 180) * 160, true, this);
				var l19 = rounddown(i8 - 32 + Math.cos(((k2 + 5) * 3.1415926535897931) / 180) * 160, true, this);
				this.hg.drawLine(i15, j17, k18, l19);
				if (k2 == 45) {
					j20 = k18;
					k20 = l19;
				}
			}

			for (var l2 = 0; l2 <= 45; l2 += 5) {
				var j15 = rounddown(k5 + Math.sin((l2 * 3.1415926535897931) / 180) * 160, true, this);
				var k17 = rounddown(i8 + 160 - Math.cos((l2 * 3.1415926535897931) / 180) * 160, true, this);
				var l18 = rounddown(k5 + Math.sin(((l2 + 5) * 3.1415926535897931) / 180) * 160, true, this);
				var i20 = rounddown(i8 + 160 - Math.cos(((l2 + 5) * 3.1415926535897931) / 180) * 160, true, this);
				this.hg.drawLine(j15, k17, l18, i20);
				if (l2 == 45) {
					l20 = l18;
					i21 = i20;
				}
			}

			this.hg.drawLine(j20, k20, l20, i21);
		}
	}

	/**
	 * 主人公と床オブジェクトとの当たり判定処理
	 * @param direction {number} 判定を行う向き 0,1,2,3のいずれか
	 */
	atariYuka(i: number) {
		if (this.yuka_id_max < 0) return;
		if (i == 0) {
			for (var j = 0; j <= this.yuka_id_max; j++) {
				var yukaobject = this.yo[j];
				if (yukaobject.con != 0 && yukaobject.type != 2)
					if (yukaobject.con >= 100 && yukaobject.con < 200) {
						if (this.j_tokugi == 14 || this.j_tokugi == 15) {
							if (
								this.co_j.x + 31 >= yukaobject.x &&
								this.co_j.x < yukaobject.x + yukaobject.width &&
								this.co_j.y + 31 >= yukaobject.y &&
								this.co_j.y < yukaobject.y + yukaobject.height
							) {
								this.co_j.x = yukaobject.x + yukaobject.width;
								this.co_j.vx = 0;
							}
						} else if (
							this.co_j.x + 15 >= yukaobject.x &&
							this.co_j.x + 15 < yukaobject.x + yukaobject.width &&
							this.co_j.y + 31 >= yukaobject.y &&
							this.co_j.y < yukaobject.y + yukaobject.height
						) {
							this.co_j.x = yukaobject.x + yukaobject.width - 15;
							this.co_j.vx = 0;
						}
					} else if (yukaobject.con >= 200 && yukaobject.con < 300) {
						if (this.co_j.vy >= 0) {
							var j1 = this.getSLOY(yukaobject.x, yukaobject.y, yukaobject.x2, yukaobject.y2);
							if (j1 >= 0 && this.co_j.y >= j1 && this.co_j.y <= j1 + 31) {
								this.co_j.y = j1;
								this.co_j.vy = 0;
							}
						}
					} else if (yukaobject.con >= 300 && yukaobject.con < 350) {
						var k1 = this.getSCOAlign(yukaobject.x, yukaobject.y, yukaobject.x2, yukaobject.y2);
						if (yukaobject.y - k1 < this.co_j.y + 31 && yukaobject.y + k1 > this.co_j.y) {
							k1 = rounddown((yukaobject.x2 * 90) / 100);
							if (yukaobject.x <= this.co_j.x + 15 && yukaobject.x + k1 >= this.co_j.x + 15) {
								this.co_j.x = yukaobject.x + k1 - 14;
								if (this.co_j.vx < 0) this.co_j.vx = 0;
							}
						}
						k1 = this.getSCOY(yukaobject.x, yukaobject.y, yukaobject.x2, yukaobject.y2);
						if (k1 >= 0 && this.co_j.y >= k1 && this.co_j.y <= k1 + 47) {
							this.co_j.y = k1;
							this.co_j.vy = 0;
							if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y) >= 18 && this.co_j.c < 200) {
								this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 5) * 32 + 32 - 16;
								this.co_j.pt = 114;
								this.jShinu(3);
							}
						}
						if (this.co_j.vy < 0) {
							var l1 = this.getSCOYCeiling(yukaobject.x, yukaobject.y, yukaobject.x2, yukaobject.y2);
							if (l1 >= 0 && this.co_j.y <= l1 && this.co_j.y >= l1 - 47) {
								this.co_j.y = l1;
								if (this.co_j.vy < 0) this.co_j.vy = 0;
							}
						}
					} else if (yukaobject.con >= 350 && yukaobject.con < 400) {
						if (this.co_j.vy >= 0) {
							var i2 = this.getSHCOY(yukaobject.x, yukaobject.y, yukaobject.x2, yukaobject.y2);
							if (i2 >= 0 && this.co_j.y >= i2 && this.co_j.y <= i2 + 31) {
								this.co_j.y = i2;
								this.co_j.vy = 0;
							}
						}
					} else if (yukaobject.con == 400 || yukaobject.con == 410) {
						if (this.co_j.vy >= 0) {
							var j2 = this.getSWUpOY(yukaobject.x, yukaobject.y, yukaobject.x2, yukaobject.y2);
							if (j2 >= 0 && this.co_j.y >= j2 && this.co_j.y <= j2 + 31) {
								this.co_j.y = j2;
								this.co_j.vy = 0;
							}
						}
					} else if ((yukaobject.con == 450 || yukaobject.con == 460) && this.co_j.vy >= 0) {
						var k2 = this.getSWDownOY(yukaobject.x, yukaobject.y, yukaobject.x2, yukaobject.y2);
						if (k2 >= 0 && this.co_j.y >= k2 && this.co_j.y <= k2 + 31) {
							this.co_j.y = k2;
							this.co_j.vy = 0;
						}
					}
			}
		} else if (i == 1) {
			for (var k = 0; k <= this.yuka_id_max; k++) {
				var yukaobject1 = this.yo[k];
				if (yukaobject1.con != 0 && yukaobject1.type != 2)
					if (yukaobject1.con >= 100 && yukaobject1.con < 200) {
						if (this.j_tokugi == 14 || this.j_tokugi == 15) {
							if (
								this.co_j.x + 31 >= yukaobject1.x &&
								this.co_j.x < yukaobject1.x + yukaobject1.width &&
								this.co_j.y + 31 >= yukaobject1.y &&
								this.co_j.y < yukaobject1.y + yukaobject1.height
							) {
								this.co_j.x = yukaobject1.x - 32;
								this.co_j.vx = 0;
							}
						} else if (
							this.co_j.x + 15 >= yukaobject1.x &&
							this.co_j.x + 15 < yukaobject1.x + yukaobject1.width &&
							this.co_j.y + 31 >= yukaobject1.y &&
							this.co_j.y < yukaobject1.y + yukaobject1.height
						) {
							this.co_j.x = yukaobject1.x - 16;
							this.co_j.vx = 0;
						}
					} else if (yukaobject1.con >= 200 && yukaobject1.con < 300) {
						if (this.co_j.vy >= 0) {
							var l2 = this.getSLOY(yukaobject1.x, yukaobject1.y, yukaobject1.x2, yukaobject1.y2);
							if (l2 >= 0 && this.co_j.y >= l2 && this.co_j.y <= l2 + 31) {
								this.co_j.y = l2;
								this.co_j.vy = 0;
							}
						}
					} else if (yukaobject1.con >= 300 && yukaobject1.con < 350) {
						var i3 = this.getSCOAlign(yukaobject1.x, yukaobject1.y, yukaobject1.x2, yukaobject1.y2);
						if (yukaobject1.y - i3 < this.co_j.y + 31 && yukaobject1.y + i3 > this.co_j.y) {
							i3 = rounddown((yukaobject1.x2 * 90) / 100);
							if (yukaobject1.x - i3 <= this.co_j.x + 15 && yukaobject1.x >= this.co_j.x + 15) {
								this.co_j.x = yukaobject1.x - i3 - 16;
								if (this.co_j.vx > 0) this.co_j.vx = 0;
							}
						}
						i3 = this.getSCOY(yukaobject1.x, yukaobject1.y, yukaobject1.x2, yukaobject1.y2);
						if (i3 >= 0 && this.co_j.y >= i3 && this.co_j.y <= i3 + 47) {
							this.co_j.y = i3;
							this.co_j.vy = 0;
							if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y) >= 18 && this.co_j.c < 200) {
								this.co_j.y = rightShiftIgnoreSign(this.co_j.y, 5) * 32 + 32 - 16;
								this.co_j.pt = 114;
								this.jShinu(3);
							}
						}
						if (this.co_j.vy < 0) {
							var j3 = this.getSCOYCeiling(yukaobject1.x, yukaobject1.y, yukaobject1.x2, yukaobject1.y2);
							if (j3 >= 0 && this.co_j.y <= j3 && this.co_j.y >= j3 - 47) {
								this.co_j.y = j3;
								if (this.co_j.vy < 0) this.co_j.vy = 0;
							}
						}
					} else if (yukaobject1.con >= 350 && yukaobject1.con < 400) {
						if (this.co_j.vy >= 0) {
							var k3 = this.getSHCOY(yukaobject1.x, yukaobject1.y, yukaobject1.x2, yukaobject1.y2);
							if (k3 >= 0 && this.co_j.y >= k3 && this.co_j.y <= k3 + 31) {
								this.co_j.y = k3;
								this.co_j.vy = 0;
							}
						}
					} else if (yukaobject1.con == 400 || yukaobject1.con == 410) {
						if (this.co_j.vy >= 0) {
							var l3 = this.getSWUpOY(yukaobject1.x, yukaobject1.y, yukaobject1.x2, yukaobject1.y2);
							if (l3 >= 0 && this.co_j.y >= l3 && this.co_j.y <= l3 + 31) {
								this.co_j.y = l3;
								this.co_j.vy = 0;
							}
						}
					} else if ((yukaobject1.con == 450 || yukaobject1.con == 460) && this.co_j.vy >= 0) {
						var i4 = this.getSWDownOY(yukaobject1.x, yukaobject1.y, yukaobject1.x2, yukaobject1.y2);
						if (i4 >= 0 && this.co_j.y >= i4 && this.co_j.y <= i4 + 31) {
							this.co_j.y = i4;
							this.co_j.vy = 0;
						}
					}
			}
		} else if (i == 2) {
			for (var l = 0; l <= this.yuka_id_max; l++) {
				var yukaobject2 = this.yo[l];
				if (yukaobject2.con != 0 && yukaobject2.type != 2)
					if (yukaobject2.con >= 100 && yukaobject2.con < 200) {
						if (this.j_tokugi == 14 || this.j_tokugi == 15) {
							if (
								this.co_j.x + 31 >= yukaobject2.x &&
								this.co_j.x < yukaobject2.x + yukaobject2.width &&
								this.co_j.y + 31 >= yukaobject2.y &&
								this.co_j.y < yukaobject2.y + yukaobject2.height
							) {
								this.co_j.y = yukaobject2.y + yukaobject2.height;
								this.co_j.vy = 0;
							}
						} else if (
							this.co_j.x + 15 >= yukaobject2.x &&
							this.co_j.x + 15 < yukaobject2.x + yukaobject2.width &&
							this.co_j.y + 31 >= yukaobject2.y &&
							this.co_j.y < yukaobject2.y + yukaobject2.height
						) {
							this.co_j.y = yukaobject2.y + yukaobject2.height;
							this.co_j.vy = 0;
						}
					} else if (yukaobject2.con >= 300 && yukaobject2.con < 350) {
						var j4 = this.getSCOYCeiling(yukaobject2.x, yukaobject2.y, yukaobject2.x2, yukaobject2.y2);
						if (j4 >= 0 && this.co_j.y <= j4 && this.co_j.y >= j4 - 63 && this.co_j.y >= yukaobject2.y - 8) {
							this.co_j.y = j4;
							if (this.co_j.vy < 0) this.co_j.vy = 0;
							if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20 && this.co_j.c < 200) {
								this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
								this.jShinu(3);
							}
						}
					}
			}
		} else if (i == 3) {
			for (var i1 = 0; i1 <= this.yuka_id_max; i1++) {
				var yukaobject3 = this.yo[i1];
				if (yukaobject3.con == 0 || yukaobject3.type == 2) continue;
				if (yukaobject3.con >= 100 && yukaobject3.con < 200) {
					if (this.j_tokugi == 14 || this.j_tokugi == 15) {
						if (
							this.co_j.x + 31 >= yukaobject3.x &&
							this.co_j.x < yukaobject3.x + yukaobject3.width &&
							this.co_j.y + 31 >= yukaobject3.y &&
							this.co_j.y < yukaobject3.y + yukaobject3.height
						) {
							this.co_j.y = yukaobject3.y - 32;
							this.co_j.vy = 0;
						}
						continue;
					}
					if (
						this.co_j.x + 15 >= yukaobject3.x &&
						this.co_j.x + 15 < yukaobject3.x + yukaobject3.width &&
						this.co_j.y + 31 >= yukaobject3.y &&
						this.co_j.y < yukaobject3.y + yukaobject3.height
					) {
						this.co_j.y = yukaobject3.y - 32;
						this.co_j.vy = 0;
					}
					continue;
				}
				if (yukaobject3.con >= 200 && yukaobject3.con < 300) {
					var k4 = this.getSLOY(yukaobject3.x, yukaobject3.y, yukaobject3.x2, yukaobject3.y2);
					if (k4 >= 0 && this.co_j.y >= k4 && this.co_j.y <= k4 + 31) {
						this.co_j.y = k4;
						this.co_j.vy = 0;
					}
					continue;
				}
				if (yukaobject3.con >= 300 && yukaobject3.con < 350) {
					var l4 = this.getSCOY(yukaobject3.x, yukaobject3.y, yukaobject3.x2, yukaobject3.y2);
					if (l4 >= 0 && this.co_j.y >= l4 && this.co_j.y <= l4 + 31) {
						this.co_j.y = l4;
						this.co_j.vy = 0;
						if (this.co_j.vx == 0) this.co_j.pt = 100;
					}
					if (this.co_j.y <= yukaobject3.y) continue;
					l4 = this.getSCOYCeiling(yukaobject3.x, yukaobject3.y, yukaobject3.x2, yukaobject3.y2);
					if (l4 < 0 || this.co_j.y > l4 || this.co_j.y < l4 - 31) continue;
					this.co_j.y = l4;
					if (this.co_j.vy < 0) this.co_j.vy = 0;
					if (this.maps.getBGCode(this.co_j.x + 15, this.co_j.y + 31) >= 20) {
						this.co_j.y = rightShiftIgnoreSign(this.co_j.y + 31, 5) * 32 - 32;
						this.jShinu(3);
					}
					continue;
				}
				if (yukaobject3.con >= 350 && yukaobject3.con < 400) {
					var i5 = this.getSHCOY(yukaobject3.x, yukaobject3.y, yukaobject3.x2, yukaobject3.y2);
					if (i5 < 0 || this.co_j.y < i5 || this.co_j.y > i5 + 31) continue;
					this.co_j.y = i5;
					this.co_j.vy = 0;
					if (this.co_j.vx == 0) this.co_j.pt = 100;
					continue;
				}
				if (yukaobject3.con == 400 || yukaobject3.con == 410) {
					var j5 = this.getSWUpOY(yukaobject3.x, yukaobject3.y, yukaobject3.x2, yukaobject3.y2);
					if (j5 < 0 || this.co_j.y < j5 || this.co_j.y > j5 + 31) continue;
					this.co_j.y = j5;
					this.co_j.vy = 0;
					if (this.co_j.vx == 0) this.co_j.pt = 100;
					continue;
				}
				if (yukaobject3.con != 450 && yukaobject3.con != 460) continue;
				var k5 = this.getSWDownOY(yukaobject3.x, yukaobject3.y, yukaobject3.x2, yukaobject3.y2);
				if (k5 < 0 || this.co_j.y < k5 || this.co_j.y > k5 + 31) continue;
				this.co_j.y = k5;
				this.co_j.vy = 0;
				if (this.co_j.vx == 0) this.co_j.pt = 100;
			}
		}
	}

	/**
	 * 床と主人公が重なった状態かどうかを判定する
	 * @returns {boolean} 主人公に重なっている床オブジェクトが存在するならtrue
	 */
	isYukaCross() {
		var flag = false;
		if (this.yuka_id_max < 0) return false;
		if (this.co_j.c < 100 || this.co_j.c >= 200) return false;
		for (var i = 0; i <= this.yuka_id_max; i++) {
			var yukaobject = this.yo[i];
			if (yukaobject.con == 0 || yukaobject.type == 2 || yukaobject.con < 100 || yukaobject.con >= 200) continue;
			if (this.j_tokugi == 14 || this.j_tokugi == 15) {
				if (
					this.co_j.x + 31 < yukaobject.x ||
					this.co_j.x >= yukaobject.x + yukaobject.width ||
					this.co_j.y + 31 < yukaobject.y ||
					this.co_j.y >= yukaobject.y + yukaobject.height
				)
					continue;
				flag = true;
				break;
			}
			if (
				this.co_j.x + 15 < yukaobject.x ||
				this.co_j.x + 15 >= yukaobject.x + yukaobject.width ||
				this.co_j.y + 31 < yukaobject.y ||
				this.co_j.y >= yukaobject.y + yukaobject.height
			)
				continue;
			flag = true;
			break;
		}

		return flag;
	}

	getSLOY(i: number, j: number, k: number, l: number) {
		if (i >= k) return -1;
		var i1 = this.co_j.x + 15;
		if (i1 < i || i1 > k) return -1;
		var j1 = k - i;
		var k1 = l - j;
		var j2 = Math.floor((Math.atan2(Math.abs(k1), Math.abs(j1)) * 180) / 3.1400001049041748);
		if (j2 > 70) {
			return -1;
		} else {
			var l1 = i1 - i;
			var i2 = rounddown((k1 * l1) / j1);
			i2 = j + i2 - 32;
			return i2;
		}
	}

	getSCOYCeiling(i: number, j: number, k: number, l: number) {
		var i1 = this.co_j.x + 15;
		var k1 = rounddown((k * 90) / 100);
		if (i1 < i - k1 || i1 > i + k1) {
			return -1;
		} else {
			var j1 = j + Math.floor(Math.sqrt(k * k - (i1 - i) * (i1 - i)));
			return j1;
		}
	}

	getSCOAlign(i: number, j: number, k: number, l: number) {
		var j1 = rounddown((k * 90) / 100);
		var i1 = Math.floor(Math.sqrt(k * k - j1 * j1));
		return i1;
	}

	getSCOY(i: number, j: number, k: number, l: number, i1?: number) {
		var j1;
		var l1 = rounddown((k * 90) / 100);
		if (i1 === undefined) j1 = this.co_j.x + 15;
		else j1 = i1;
		if (j1 < i - l1 || j1 > i + l1) {
			return -1;
		} else {
			var k1 = j - Math.floor(Math.sqrt(k * k - (j1 - i) * (j1 - i))) - 32;
			return k1;
		}
	}

	getSHCOY(i: number, j: number, k: number, l: number, i1?: number) {
		var j1;
		if (i1 === undefined) j1 = this.co_j.x + 15;
		else j1 = i1;
		if (j1 < i || j1 > i + 239) {
			return -1;
		} else {
			var k1 = j + 144 - Math.floor(Math.sqrt(20736 - Math.abs(i + 120 - j1) * Math.abs(i + 120 - j1))) - 32;
			return k1;
		}
	}

	getSWUpOY(i: number, j: number, k: number, l: number, i1?: number) {
		var j1;
		if (i1 === undefined) j1 = this.co_j.x + 15;
		else j1 = i1;
		if (j1 < i || j1 > i + 255) return -1;
		var k2;
		if (j1 - i <= 127) {
			var k1 = j1 - i;
			var i2 = Math.floor(Math.sqrt(25600 - k1 * k1));
			k2 = j - 32 + i2 - 32;
		} else {
			var l1 = i + 255 - j1;
			var j2 = Math.floor(Math.sqrt(25600 - l1 * l1));
			k2 = j + 128 + 32 - j2 - 32;
		}
		return k2;
	}

	getSWDownOY(i: number, j: number, k: number, l: number, i1?: number) {
		var j1;
		if (i1 === undefined) j1 = this.co_j.x + 15;
		else j1 = i1;
		if (j1 < i || j1 > i + 255) return -1;
		var k2;
		if (j1 - i <= 127) {
			var k1 = i - j1;
			var i2 = Math.floor(Math.sqrt(25600 - k1 * k1));
			k2 = j + 128 + 32 - i2 - 32;
		} else {
			var l1 = i + 255 - j1;
			var j2 = Math.floor(Math.sqrt(25600 - l1 * l1));
			k2 = j - 32 + j2 - 32;
		}
		return k2;
	}

	/**
	 * マップのパーツコードを受け取り、`maps.map_bg`に格納されるべき値を返すと同時にパーツの追加に必要な処理を行う
	 * @param x {number} X座標(ブロック単位)
	 * @param y {number} Y座標(ブロック単位)
	 * @param id パーツコード
	 * @returns {number} `maps.map_bg`に格納されるべき値
	 */
	setChipValue(x: number, y: number, id: number) {
		var word1 = -1;
		switch (id) {
			case 46:
			case 0:
				// '.'
				break;
			case 49:
				// '1'
				word1 = 1;
				break;
			case 50:
				// '2'
				word1 = 2;
				break;
			case 51:
				// '3'
				word1 = 3;
				break;
			case 52:
				// '4'
				word1 = 4;
				break;
			case 53:
				// '5'
				word1 = 5;
				break;
			case 54:
				// '6'
				word1 = 6;
				break;
			case 55:
				// '7'
				word1 = 7;
				break;
			case 56:
				// '8'
				word1 = 8;
				break;
			case 57:
				// '9'
				word1 = 9;
				break;
			case 97:
				// 'a'
				word1 = 20;
				break;
			case 98:
				// 'b'
				word1 = 21;
				break;
			case 99:
				// 'c'
				word1 = 22;
				break;
			case 100:
				// 'd'
				word1 = 23;
				break;
			case 101:
				// 'e'
				word1 = 24;
				break;
			case 102:
				// 'f'
				word1 = 25;
				break;
			case 103:
				// 'g'
				word1 = 26;
				break;
			case 104:
				// 'h'
				word1 = 27;
				break;
			case 105:
				// 'i'
				word1 = 28;
				break;
			case 91:
				// '['
				word1 = 15;
				break;
			case 93:
				// ']'
				word1 = 10;
				break;
			case 60:
				// '<'
				word1 = 18;
				break;
			case 62:
				// '>'
				word1 = 19;
				break;
			case 106:
				// 'j'
				word1 = 29;
				break;
			case 107:
				// 'k' ？ブロック（コイン）
				if (this.coin1_type >= 2) {
					word1 = this.setAthleticOnMap(this.coin1_type, x, y);
					if (word1 == -99) {
						word1 = 40;
						this.hSet(x, y, 100);
					}
				} else if (this.j_tokugi == 14) this.mSet(x * 32, y * 32, 2181);
				else if (this.j_tokugi == 15) {
					this.mSet(x * 32, y * 32, 2000);
				} else {
					word1 = 40;
					this.hSet(x, y, 100);
				}
				break;
			case 108:
				// 'l' ？ブロック（コイン3枚）
				if (this.coin3_type >= 2) {
					word1 = this.setAthleticOnMap(this.coin3_type, x, y);
					if (word1 == -99) {
						word1 = 40;
						this.hSet(x, y, 200);
					}
				} else if (this.j_tokugi == 14) this.mSet(x * 32, y * 32, 2182);
				else if (this.j_tokugi == 15) {
					this.mSet(x * 32, y * 32, 2010);
					this.mSet(x * 32, y * 32, 2020);
					this.mSet(x * 32, y * 32, 2000);
				} else {
					word1 = 40;
					this.hSet(x, y, 200);
				}
				break;
			case 109:
				// 'm' ？ブロック（ファイヤーボール）
				if (this.j_tokugi == 14 || this.j_tokugi == 15) {
					this.mSet(x * 32, y * 32, 2100);
				} else {
					word1 = 40;
					this.hSet(x, y, 300);
				}
				break;
			case 110:
				// 'n' ？ブロック（バリア）
				if (this.j_tokugi == 14 || this.j_tokugi == 15) {
					this.mSet(x * 32, y * 32, 2110);
				} else {
					word1 = 40;
					this.hSet(x, y, 400);
				}
				break;
			case 111:
				// 'o' ？ブロック（タイム）
				if (this.j_tokugi == 14 || this.j_tokugi == 15) {
					this.mSet(x * 32, y * 32, 2120);
				} else {
					word1 = 40;
					this.hSet(x, y, 500);
				}
				break;
			case 112:
				// 'p' ？ブロック（ジェット）
				if (this.j_tokugi == 14 || this.j_tokugi == 15) {
					this.mSet(x * 32, y * 32, 2130);
				} else {
					word1 = 40;
					this.hSet(x, y, 600);
				}
				break;
			case 113:
				// 'q' ？ブロック（ヘルメット）
				if (this.j_tokugi == 14 || this.j_tokugi == 15) {
					this.mSet(x * 32, y * 32, 2140);
				} else {
					word1 = 40;
					this.hSet(x, y, 700);
				}
				break;
			case 114:
				// 'r' ？ブロック（しっぽ）
				if (this.j_tokugi == 14 || this.j_tokugi == 15) {
					this.mSet(x * 32, y * 32, 2150);
				} else {
					word1 = 40;
					this.hSet(x, y, 800);
				}
				break;
			case 115:
				// 's' ？ブロック（ドリル）
				if (this.j_tokugi == 14 || this.j_tokugi == 15) {
					this.mSet(x * 32, y * 32, 2160);
				} else {
					word1 = 40;
					this.hSet(x, y, 900);
				}
				break;
			case 116:
				// 't' ？ブロック（グレネード）
				if (this.j_tokugi == 14 || this.j_tokugi == 15) {
					this.mSet(x * 32, y * 32, 2170);
				} else {
					word1 = 40;
					this.hSet(x, y, 1000);
				}
				break;
			case 117:
				// 'u' リンク土管1
				if (this.dokan1_type >= 2) {
					word1 = this.setAthleticOnMap(this.dokan1_type, x, y);
					if (word1 == -99) {
						this.aSet(x * 32, y * 32, 300, x * 32);
						if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
					}
				} else {
					this.aSet(x * 32, y * 32, 300, x * 32);
					if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				}
				break;
			case 118:
				// 'v' リンク土管2
				if (this.dokan2_type >= 2) {
					word1 = this.setAthleticOnMap(this.dokan2_type, x, y);
					if (word1 == -99) {
						this.aSet(x * 32, y * 32, 310, x * 32);
						if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
					}
				} else {
					this.aSet(x * 32, y * 32, 310, x * 32);
					if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				}
				break;
			case 119:
				// 'w' リンク土管3
				if (this.dokan3_type >= 2) {
					word1 = this.setAthleticOnMap(this.dokan3_type, x, y);
					if (word1 == -99) {
						this.aSet(x * 32, y * 32, 320, x * 32);
						if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
					}
				} else {
					this.aSet(x * 32, y * 32, 320, x * 32);
					if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				}
				break;
			case 120:
				// 'x' リンク土管4
				if (this.dokan4_type >= 2) {
					word1 = this.setAthleticOnMap(this.dokan4_type, x, y);
					if (word1 == -99) {
						this.aSet(x * 32, y * 32, 330, x * 32);
						if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
					}
				} else {
					this.aSet(x * 32, y * 32, 330, x * 32);
					if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				}
				break;
			case 121:
				// 'y' ？ブロック（1UP茸）
				if (this.stage_1up_f[this.stage - 1] || this.j_tokugi == 17) {
					if (this.j_tokugi == 14 || this.j_tokugi == 15) {
						this.mSet(x * 32, y * 32, 2180);
					} else {
						word1 = 40;
						this.hSet(x, y, 1100);
					}
				} else {
					word1 = 41;
				}
				break;
			case 122:
				// 'z' すべる床
				word1 = 69;
				break;
			case 43:
				// '+' 一言メッセージ1
				this.aSet(x * 32, y * 32, 80, x * 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 45:
				// '-' 一言メッセージ2
				this.aSet(x * 32, y * 32, 81, x * 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 42:
				// '*' 一言メッセージ3
				this.aSet(x * 32, y * 32, 82, x * 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 47:
				// '/' 一言メッセージ4
				this.aSet(x * 32, y * 32, 83, x * 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 65:
				// 'A' 主人公
				this.co_j.x = x * 32;
				this.co_j.y = y * 32;
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 66:
				// 'B' 亀（足元に空白があると向きを変える）
				this.tSet(x * 32, y * 32, 100, x * 32 - this.gg.di.width - 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 67:
				// 'C' 亀（足元に空白があると落ちる）
				this.tSet(x * 32, y * 32, 110, x * 32 - this.gg.di.width - 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 68:
				// 'D' 亀（足元に空白があると落ちる 3匹連続）
				this.tSet(x * 32, y * 32, 110, x * 32 - this.gg.di.width - 32);
				this.tSet(x * 32 + 75, y * 32, 110, x * 32 - this.gg.di.width - 32);
				this.tSet(x * 32 + 150, y * 32, 110, x * 32 - this.gg.di.width - 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 69:
				// 'E' ピカチー
				if (this.dengeki_mkf == 3) this.tSet(x * 32, y * 32, 201, x * 32 - this.gg.di.width - 32);
				else if (this.dengeki_mkf == 4) this.tSet(x * 32, y * 32, 202, x * 32 - this.gg.di.width - 32);
				else if (this.dengeki_mkf == 5) this.tSet(x * 32, y * 32, 203, x * 32 - this.gg.di.width - 32);
				else this.tSet(x * 32, y * 32, 200, x * 32 - this.gg.di.width - 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 70:
				// 'F' チコリン
				if (this.chikorin_attack >= 2 && this.chikorin_attack <= 5)
					this.tSet(x * 32, y * 32, 308 + this.chikorin_attack, x * 32 - this.gg.di.width - 32);
				else if (this.chikorin_attack == 6) this.tSet(x * 32, y * 32, 301, x * 32 - this.gg.di.width - 32);
				else if (this.chikorin_attack == 7) this.tSet(x * 32, y * 32, 320, x * 32 - this.gg.di.width - 32);
				else if (this.chikorin_attack == 8) this.tSet(x * 32, y * 32, 330, x * 32 - this.gg.di.width - 32);
				else if (this.chikorin_attack == 9) this.tSet(x * 32, y * 32, 335, x * 32 - this.gg.di.width - 32);
				else this.tSet(x * 32, y * 32, 300, x * 32 - this.gg.di.width - 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 71:
				// 'G' ヒノララシ
				this.tSet(x * 32, y * 32, 400, x * 32 - this.gg.di.width - 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 72:
				// 'H' ポッピー（上下移動）
				this.tSet(x * 32, y * 32, 500, x * 32 - this.gg.di.width - 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 73:
				// 'I' ポッピー（直進）
				if (this.poppie_attack == 2) this.tSet(x * 32, y * 32, 520, x * 32 - this.gg.di.width - 32);
				else if (this.poppie_attack == 3) this.tSet(x * 32, y * 32, 530, x * 32 - this.gg.di.width - 32);
				else if (this.poppie_attack == 4) this.tSet(x * 32, y * 32, 540, x * 32 - this.gg.di.width - 32);
				else if (this.poppie_attack == 5) this.tSet(x * 32, y * 32, 550, x * 32 - this.gg.di.width - 32);
				else this.tSet(x * 32, y * 32, 510, x * 32 - this.gg.di.width - 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 74:
				// 'J' ポッピー（直進　3羽連続）
				this.tSet(x * 32, y * 32, 510, x * 32 - this.gg.di.width - 32 - 32);
				this.tSet(x * 32 + 80, y * 32 - 40, 510, x * 32 - this.gg.di.width - 32 - 32);
				this.tSet(x * 32 + 140, y * 32 + 38, 510, x * 32 - this.gg.di.width - 32 - 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 75:
				// 'K' 動く床（上下移動）
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				if (this.ugokuyuka1_type >= 2) {
					word1 = this.setAthleticOnMap(this.ugokuyuka1_type, x, y);
					if (word1 == -99) this.aSet(x * 32, y * 32, 100, x * 32);
				} else {
					this.aSet(x * 32, y * 32, 100, x * 32);
				}
				break;
			case 76:
				// 'L' 動く床（左右移動）
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				if (this.ugokuyuka2_type >= 2) {
					word1 = this.setAthleticOnMap(this.ugokuyuka2_type, x, y);
					if (word1 == -99) this.aSet(x * 32, y * 32 + 9, 110, x * 32 - 16);
				} else {
					this.aSet(x * 32, y * 32 + 9, 110, x * 32 - 16);
				}
				break;
			case 77:
				// 'M' 動く床（左右移動×2）
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				if (this.ugokuyuka3_type >= 2) {
					word1 = this.setAthleticOnMap(this.ugokuyuka3_type, x, y);
					if (word1 == -99) {
						this.aSet(x * 32, y * 32 + 9, 115, x * 32 - 16);
						this.aSet(x * 32, y * 32 + 9, 116, x * 32 - 16);
					}
				} else {
					this.aSet(x * 32, y * 32 + 9, 115, x * 32 - 16);
					this.aSet(x * 32, y * 32 + 9, 116, x * 32 - 16);
				}
				break;
			case 78:
				// 'N' ドッスンスン
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				if (this.dossunsun_type >= 2) {
					word1 = this.setAthleticOnMap(this.dossunsun_type, x, y);
					if (word1 == -99) this.aSet(x * 32 - 32, y * 32, 400, x * 32);
				} else {
					this.aSet(x * 32 - 32, y * 32, 400, x * 32);
				}
				break;
			case 79:
				// 'O' マリリ
				if (this.mariri_attack == 2) this.tSet(x * 32, y * 32, 601, x * 32 - this.gg.di.width - 32);
				else if (this.mariri_attack == 3) this.tSet(x * 32, y * 32, 602, x * 32 - this.gg.di.width - 32);
				else if (this.mariri_attack == 4) this.tSet(x * 32, y * 32, 660, x * 32 - this.gg.di.width - 32);
				else if (this.mariri_attack == 5) this.tSet(x * 32, y * 32, 670, x * 32 - this.gg.di.width - 32);
				else this.tSet(x * 32, y * 32, 600, x * 32 - this.gg.di.width - 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 80:
				// 'P' ヤチャモ
				if (this.yachamo_attack >= 1 && this.yachamo_attack <= 5)
					this.tSet(x * 32, y * 32, 699 + this.yachamo_attack, x * 32 - this.gg.di.width - 32);
				else if (this.yachamo_attack == 6) this.tSet(x * 32, y * 32, 710, x * 32 - this.gg.di.width - 32);
				else if (this.yachamo_attack == 7) this.tSet(x * 32, y * 32, 711, x * 32 - this.gg.di.width - 32);
				else if (this.yachamo_attack == 8) this.tSet(x * 32, y * 32, 720, x * 32 - this.gg.di.width - 32);
				else if (this.yachamo_attack == 9) this.tSet(x * 32, y * 32, 725, x * 32 - this.gg.di.width - 32);
				else this.tSet(x * 32, y * 32, 700, x * 32 - this.gg.di.width - 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 81:
				// 'Q' ミズタロウ
				if (this.j_tokugi == 14) this.tSet(x * 32, y * 32, 850, x * 32 - this.gg.di.width - 32);
				else if (this.mizutaro_attack >= 1 && this.mizutaro_attack <= 5)
					this.tSet(x * 32, y * 32, 799 + this.mizutaro_attack, x * 32 - this.gg.di.width - 32);
				else this.tSet(x * 32, y * 32, 800, x * 32 - this.gg.di.width - 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 82:
				// 'R' エアームズ
				if (this.airms_kf == 2) this.tSet(x * 32, y * 32, 950, x * 32 - this.gg.di.width - 32);
				else if (this.airms_kf == 3) this.tSet(x * 32, y * 32, 920, x * 32 - this.gg.di.width - 32);
				else if (this.airms_kf == 4) this.tSet(x * 32, y * 32, 921, x * 32 - this.gg.di.width - 32);
				else if (this.airms_kf == 5) this.tSet(x * 32, y * 32, 930, x * 32 - this.gg.di.width - 32);
				else this.tSet(x * 32, y * 32, 900, x * 32 - this.gg.di.width - 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 83:
				// 'S' グラーダ
				this.co_b.c = 100;
				this.co_b.c4 = 3;
				this.co_b.x = x * 32;
				this.co_b.y = y * 32 - 16;
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				if (this.co_b.x < this.gg.di.width - 64) this.co_b.x = this.gg.di.width - 64;
				else if (this.co_b.x > (this.mapWidth - 3) * 32) this.co_b.x = (this.mapWidth - 3) * 32;
				if (this.sl_step == 10) this.sl_step = 11;
				else this.sl_step = 1;
				this.sl_wx = this.co_b.x - (this.gg.di.width - 128);
				this.sl_wy = (this.mapHeight - rounddown((this.gg.di.height - this.maps.wy_mini) / 32)) * 32;
				if (this.boss_destroy_type == 2) this.co_b.x += 160;
				break;
			case 84:
				// 'T' カイオール
				this.co_b.c = 200;
				this.co_b.c4 = 3;
				this.co_b.x = x * 32;
				this.co_b.y = y * 32 - 16;
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				if (this.co_b.x < this.gg.di.width - 64) this.co_b.x = this.gg.di.width - 64;
				else if (this.co_b.x > (this.mapWidth - 3) * 32) this.co_b.x = (this.mapWidth - 3) * 32;
				if (this.sl_step == 10) this.sl_step = 11;
				else this.sl_step = 1;
				this.sl_wx = this.co_b.x - (this.gg.di.width - 128);
				this.sl_wy = (this.mapHeight - rounddown((this.gg.di.height - this.maps.wy_mini) / 32)) * 32;
				if (this.boss_destroy_type == 2) this.co_b.x += 160;
				break;
			case 85:
				// 'U' ファイヤーバー（左回り）
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				if (this.firebar1_type >= 2) {
					word1 = this.setAthleticOnMap(this.firebar1_type, x, y);
					if (word1 == -99) {
						this.aSet(x * 32 + 16, y * 32 + 16, 70, x * 32);
						word1 = 50;
					}
				} else {
					this.aSet(x * 32 + 16, y * 32 + 16, 70, x * 32);
					word1 = 50;
				}
				break;
			case 86:
				// 'V' ファイヤーバー（右回り）
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				if (this.firebar2_type >= 2) {
					word1 = this.setAthleticOnMap(this.firebar2_type, x, y);
					if (word1 == -99) {
						this.aSet(x * 32 + 16, y * 32 + 16, 71, x * 32);
						word1 = 50;
					}
				} else {
					this.aSet(x * 32 + 16, y * 32 + 16, 71, x * 32);
					word1 = 50;
				}
				break;
			case 87:
				// 'W' タイキング
				if (this.taiking_attack == 2) this.tSet(x * 32, y * 32, 1050, x * 32 - this.gg.di.width - 32);
				else if (this.taiking_attack == 3) this.tSet(x * 32, y * 32, 1060, x * 32 - this.gg.di.width - 32);
				else if (this.taiking_attack == 4) this.tSet(x * 32, y * 32, 1070, x * 32 - this.gg.di.width - 32);
				else if (this.taiking_attack == 5) this.tSet(x * 32, y * 32, 1080, x * 32 - this.gg.di.width - 32 - 32);
				else if (this.j_tokugi == 14) this.tSet(x * 32, y * 32, 1002, x * 32 - this.gg.di.width - 32 - 32);
				else if (this.j_tokugi == 15) this.tSet(x * 32, y * 32, 1003, x * 32 - this.gg.di.width - 32);
				else {
					this.tSet(x * 32, y * 32 - 16, 1000, x * 32 - this.gg.di.width - 32 - 32);
					word1 = 4;
				}
				if (this.maps.map_bg[x - 1][y] == 4 || this.maps.map_bg[x][y - 1] == 4) word1 = 4;
				break;
			case 88:
				// 'X' クラゲッソ
				if (this.kuragesso_attack == 2) this.tSet(x * 32, y * 32, 1150, x * 32 - this.gg.di.width - 32);
				else if (this.kuragesso_attack == 3) this.tSet(x * 32, y * 32, 1160, x * 32 - this.gg.di.width - 32);
				else if (this.kuragesso_attack == 4) this.tSet(x * 32, y * 32, 1170, x * 32 - this.gg.di.width - 32);
				else if (this.kuragesso_attack == 5) this.tSet(x * 32, y * 32, 1180, x * 32 - this.gg.di.width - 32 - 32);
				else if (this.j_tokugi == 14) this.tSet(x * 32, y * 32, 1102, x * 32 - this.gg.di.width - 32);
				else if (this.j_tokugi == 15) this.tSet(x * 32, y * 32, 1103, x * 32 - this.gg.di.width - 32);
				else {
					this.tSet(x * 32, y * 32, 1100, x * 32 - this.gg.di.width - 32);
					word1 = 4;
				}
				if (this.maps.map_bg[x - 1][y] == 4 || this.maps.map_bg[x][y - 1] == 4) word1 = 4;
				break;
			case 89:
				// 'Y' 水草
				this.aSet(x * 32, y * 32, 60, x * 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 90:
				// 'Z' センクウザ
				this.co_b.c = 300;
				this.co_b.c4 = 3;
				this.co_b.x = x * 32;
				this.co_b.y = y * 32 - 16;
				this.boss_kijyun_y = this.co_b.y;
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				if (this.co_b.x < this.gg.di.width - 64) this.co_b.x = this.gg.di.width - 64;
				else if (this.co_b.x > (this.mapWidth - 3) * 32) this.co_b.x = (this.mapWidth - 3) * 32;
				if (this.sl_step == 10) this.sl_step = 11;
				else this.sl_step = 1;
				this.sl_wx = this.co_b.x - (this.gg.di.width - 128);
				this.sl_wy = (this.mapHeight - rounddown((this.gg.di.height - this.maps.wy_mini) / 32)) * 32;
				if (this.boss_destroy_type == 2) this.co_b.x += 160;
				break;
			case 123:
				// '{' 亀（追尾）
				this.tSet(x * 32, y * 32, 1200, x * 32 - this.gg.di.width - 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;
			case 125:
				// '}' 重力無視の追跡ピカチー等
				this.tSet(x * 32, y * 32, 1400, x * 32 - this.gg.di.width - 32);
				if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				break;

			default:
				if ("string" === typeof id) {
					// カスタムパーツだ
					if (this.customParts && this.customParts[id]) {
						// カスタムパーツの場合は拡張元のIDで判定
						var nativeCode = this.customParts[id].nativeCode;
						if (nativeCode >= 5000 && nativeCode < 10000) {
							this.tSet(x * 32, y * 32, id, x * 32 - this.gg.di.width - 32);
							if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
						}
					}
					break;
				}
				if (id >= 1000 && id < 5000) {
					// 1000 〜 4999 はアスレチックコードとして扱う
					word1 = this.setAthleticOnMap(id - 1000, x, y);
				} else if (id >= 5000 && id < 10000) {
					// 5000 〜 9999 は敵コードとして扱う
					this.tSet(x * 32, y * 32, id - 5000, x * 32 - this.gg.di.width - 32);
					if (this.maps.map_bg[x - 1][y] == 4) word1 = 4;
				}
				break;
		}
		return word1;
	}

	/**
	 * 現在のゲーム状態を表すスナップショットオブジェクトを作成して返します。
	 */
	getSnapshot() {
		// 出力すべきプロパティの一覧
		var props = [
			"ran_seed",
			"ana_kazu",
			"ochiru_y",
			"j_hashiru_f",
			"j_jump_level",
			"j_jump_type",
			"j_zan_f",
			"j_zan_cf",
			"j_zan_p",
			"j_zan_nagasa",
			"j_zan_c",
			"j_a_id",
			"j_mizu_f",
			"j_mizu_ac",
			"j_mizu_awa_c",
			"j_left",
			"j_jdai_f",
			"boss_hp",
			"showm_c",
			"showi_c",
			"showi_x",
			"showi_y",
			"time",
			"m_kazu",
			"jm_kazu",
			"a_hf",
			"j_fire_f",
			"j_v_c",
			"j_v_kakudo",
			"j_jet_c",
			"j_jet_kf",
			"j_jet_fuel",
			"j_helm_f",
			"j_drell_f",
			"j_tail_f",
			"j_tail_ac",
			"j_gr_kazu",
			"sl_step",
			"sl_wx",
			"sl_wy",
			"sl_speed",
			"ks_wx",
			"ks_wy",
			"j_tail_hf",
			"j_tail_type",
			"yachamo_attack",
			"poppie_attack",
			"hitokoto_num",
			"boss_kijyun_y",
			"coin_kazu",
			"tpika_p",
			"setmyw_w",
			"setmyw_pt",
			"setmyw_muki",
			"souko_count1",
			"souko_count2",
			"souko_count3",
			"heh",
			"system_draw_mode",
			"ml_mode",
			"ml_mode_c",
			"score",
			"highscore",
			"score_1up_1",
			"score_1up_2",
			"stage",
			"stage_cc",
			"g_c1",
			"g_c2",
			"g_c3",
			"g_ac",
			"g_ac2",
			"tr1_c",
			"tr2_c",
			"left_dcc",
			"right_dcc",
			"xkey_c",
			"vo_x",
			"vo_y",
			"ana_c",
			"ana_x",
			"ana_y",
			"j_zan_x",
			"j_zan_y",
			"j_zan_pt",
			"j_zan_pth",
			"j_zan_img",
			"j_zan_zs_x",
			"j_zan_zs_y",
			"j_shitakara_mushi_y",
			"j_hashigo_f",
			"j_hashigo_mushi_x",
			"j_djump_kf",
			"j_speed",
			"j_fire_range",
			"j_rope_id",
			"j_rope_r",
			"j_rope_cf",
			"j_cannon_c",
			"j_cannon_type",
			"saka_mushi_y",
			"dkey_count",
			"j_hp_v",
			"j_hp",
			"j_hp_max",
			"j_muteki_c",
			"j_4_muki",
			"showm_data",
			"showi_img",
			"setmapc_f",
			"setbacki_f",
			"setbacki_img",
			"showr_c",
			"showr_x",
			"showr_y",
			"showr_width",
			"showr_height",
			"showo_c",
			"showo_x",
			"showo_y",
			"showo_width",
			"showo_height",
			"js_mes",
			"gauge_v",
			"gauge_value",
			"gauge_text",
			"vo_pa_x",
			"vo_pa_y",
			"stage_1up_f",
			"j_fire_type",
			"mu_ato_x",
			"mu_ato_y",
			"mu_ato_p",
			"j_double_f",
			"view_move_type",
			"hitokoto_c",
			"title_lock_f",
			"start_game_f",
			"mode_wait_ending",
			"mode_wait_gameover",
			"mode_wait_stagestart",
			"attacktail_yf",
			"mhouse_c",
			"mhouse_x",
			"mhouse_y",
			"yuka_ride_id",
			"dso_cf",
			"spot_c",
			"spot_r",
			"spot_r_mokuhyou",
			"draw_lock_f",
			"nkscroll_con",
			"nkscroll_view_x",
			"nkscroll_view_y",
			"nkscroll_my_view_x",
			"nkscroll_my_view_y",
			"nkscroll_speed_x",
			"nkscroll_vx",
			"nkscroll_vy",
			"nkscroll_zsc",
			"boss_attack_mode",
			"cpoint_con",
			"cpoint_stage",
			"cpoint_x",
			"cpoint_y",
			"jst_slow_down",
			"jst_key_down",
			"jst_fast_run_attack",
			"jst_fly_left_right",
			"jst_fire_xkey_only",
			"jst_kabe_kick",
			"jst_double_jump",
			"jst_fast_run",
			"jst_high_sjump",
			"jst_jump_level_fix",
			"jst_auto_right",
			"jst_syouryuuken",
			"jst_pc_attack",
			"up_key_c",
			"down_key_c",
		] as const;
		var result = {} as { [K in typeof props[number]]: MainProgram[K] } & {
			map_data_option: ReturnType<typeof compressSparseBooleanArray2>;
			co_j: ReturnType<typeof serializeCharacterObject>;
			co_t: ReturnType<typeof compressCharacterObjectArray>;
			co_m: ReturnType<typeof compressCharacterObjectArray>;
			co_a: ReturnType<typeof compressCharacterObjectArray>;
			co_jm: ReturnType<typeof compressCharacterObjectArray>;
			co_mu: ReturnType<typeof compressCharacterObjectArray>;
			yo: ReturnType<typeof serializeYukaObject>[];
		};
		props.forEach((key) => {
			(result as any)[key] = this[key];
		});
		// map_data_optionは巨大なので圧縮する
		result.map_data_option = compressSparseBooleanArray2(this.map_data_option);
		result.co_j = serializeCharacterObject(this.co_j);
		// CharacterObjectの配列も小さくする
		var coProps = ["co_t", "co_m", "co_a", "co_jm", "co_mu"] as const;
		coProps.forEach((key) => {
			(result as any)[key] = compressCharacterObjectArray(this[key]);
		});
		// YukaObjectの配列も小さくする
		result.yo = this.yo.map(serializeYukaObject);
		return result;

		// boolean値2次元配列をtrueのインデックスの列に変換
		function compressSparseBooleanArray2(arr: boolean[][]) {
			var width = arr.length;
			var height = (arr[0] && arr[0].length) || 0;
			var result_arr = [];
			for (var x = 0; x < width; x++) {
				for (var y = 0; y < height; y++) {
					if (arr[x][y]) {
						result_arr.push({
							x: x,
							y: y,
						});
					}
				}
			}
			return {
				width: width,
				height: height,
				arr: result_arr,
			};
		}

		// CharacterObjectの配列を変換
		function compressCharacterObjectArray<K extends typeof coProps[number]>(arr: MainProgram[K]) {
			return arr.map(function (obj: CharacterObject) {
				if (obj.c <= 0) {
					// Cが0なのは使われていないオブジェクト
					return 0;
				} else {
					return serializeCharacterObject(obj);
				}
			});
		}

		// CharacterObjectをシリアライズ
		function serializeCharacterObject(obj: CharacterObject) {
			// スナップショットにコンストラクタ名が現れるのを防ぐためにJSON文字列化する
			return JSON.stringify(obj);
		}

		// YukaObjectをシリアライズ
		function serializeYukaObject(obj: YukaObject) {
			return JSON.stringify(obj);
		}
	}
}

export { MainProgram };
