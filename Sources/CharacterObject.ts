import { ImageBuff } from "./ImageBuff";
import { EnemyControllerFactory } from "./EnemyController";
import { InversionKind } from "./GameGraphicsForApplet";

/**
 * 神クラス
 * @constructor
 */
class CharacterObject {
	c: number;
	x: number;
	y: number;
	vx: number;
	vy: number;
	wx: number;
	wy: number;
	c1: number;
	c2: number;
	c3: number;
	c4: number;
	c5: number;
	pt: number;
	pth: number;
	img: ImageBuff | null;
	zs_x: number;
	zs_y: number;
	ac: number;
	level: number;
	jimen_f: boolean;
	muki: InversionKind;
	direction: number;
	score: number;
	ss: number;
	gf: boolean;
	controller: ReturnType<EnemyControllerFactory<unknown>["controllerFactory"]> | undefined;

	constructor() {
		this.c = 0;
		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.wx = 0;
		this.wy = 0;
		this.c1 = 0;
		this.c2 = 0;
		this.c3 = 0;
		this.c4 = 0;
		this.c5 = 0;
		this.pt = 0;
		this.pth = 0;
		this.img = null;
		this.zs_x = 0;
		this.zs_y = 0;
		this.ac = 0;
		this.level = 0;
		this.jimen_f = false;
		this.muki = 0;
		this.direction = 0;
		this.score = 0;
		this.ss = 0;
		this.gf = false;
		/**
		 * このオブジェクトの動作を制御する関数
		 * @private
		 */
		this.controller = undefined;
	}

	/**
	 * キャラクターオブジェクトを初期化する
	 */
	init() {
		this.c = 0;
		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.wx = 0;
		this.wy = 0;
		this.c1 = 0;
		this.c2 = 0;
		this.c3 = 0;
		this.c4 = 0;
		this.c5 = 0;
		this.pt = 0;
		this.pth = 0;
		this.img = null;
		this.zs_x = 0;
		this.zs_y = 0;
		this.ac = 0;
		this.level = 0;
		this.jimen_f = false;
		this.muki = 0;
		this.direction = 0;
		this.score = 0;
		this.ss = 0;
		this.gf = false;
		this.controller = undefined;
	}

	/**
	 * 未使用
	 */
	setPattern(paramString: string) {}
}

export { CharacterObject };