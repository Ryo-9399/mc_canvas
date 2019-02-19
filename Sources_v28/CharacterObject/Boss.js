import { CharacterObject } from "../CharacterObject";

export const DYING = 40;
export const BOSS1_DAMAGE_LEFT = 60;
export const BOSS1_DAMAGE_RIGHT = 65;
export const BOSS1_DYING_BY_GRENADE = 67;
export const BOSS1_STANDBY = 100;
export const BOSS1_ATTACK_LEFT = 110;
export const BOSS1_ATTACK_RIGHT = 115;
export const BOSS1_MOVING_LEFT = 150;
export const BOSS1_MOVING_RIGHT = 155;
export const BOSS2_DAMAGE_LEFT = 70;
export const BOSS2_DAMAGE_RIGHT = 75;
export const BOSS2_DYING_BY_GRENADE = 77;
export const BOSS2_STANDBY = 200;
export const BOSS2_ATTACK_LEFT = 210;
export const BOSS2_ATTACK_RIGHT = 215;
export const BOSS2_MOVING_LEFT = 250;
export const BOSS2_MOVING_RIGHT = 255;
export const BOSS3_DAMAGE_LEFT = 80;
export const BOSS3_DAMAGE_RIGHT = 85;
export const BOSS3_DYING_BY_GRENADE = 87;
export const BOSS3_STANDBY = 300;
export const BOSS3_ATTACK_LEFT = 310;
export const BOSS3_ATTACK_RIGHT = 315;
export const BOSS3_MOVING_LEFT = 350;
export const BOSS3_MOVING_RIGHT = 355;
export const BOSS3_TACKLE_ATTACK_LEFT = 360;
export const BOSS3_TACKLE_ATTACK_RIGHT = 365;

/**
 * 度数法で表された角度を、[0,360)の範囲に収まるよう正規化する
 * @param {number} degree
 */
const normalizeDegree = degree => ((degree % 360) + 360) % 360;

/**
 * 長さが同じ配列をまとめる
 * [1,2,3],[4,5,6]=>[[1,4],[2,5],[3,6]]
 * @param {Array} a
 * @param {Array} b
 */
const zip = (a, b) => {
	if (a.length !== b.length) throw new Error("The given arrays do not have the same length.");
	return a.map((v, i) => [v, b[i]]);
};

class Boss extends CharacterObject {
	/*
	 * this.c: 状態
	 * this.c1: タイマー用カウンタ
	 * this.c2: 第2カウンタ(一部で使用)
	 * this.c4: HP
	 */

	/**
	 * フレームごとの処理を行う
	 * @param {MainProgram} mp
	 */
	update(mp) {
		if (this.x >= mp.maps.wx + 1024) return;
		this.move(mp);
		this.checkCollision(mp);
	}

	/**
	 * ボスの行動処理
	 * @param {MainProgram} mp
	 */
	move(mp) {
		// ボスが居座るX座標
		const x_standby_left = mp.sl_wx + 96;
		const x_standby_right = mp.sl_wx + 512 - 96 - 32;
		switch (this.c) {
			case DYING:
				// 死亡
				// 消えてからしばらくして人面星が出現する
				if (this.c1 < 20) this.c1++;
				if (this.c1 === 15) {
					// 人面星を配置する
					mp.mSet(mp.maps.wx + 256, mp.maps.wy + 128, 2200);
				}
				this.pt = 0;
				break;

			case BOSS1_DAMAGE_LEFT:
				this.updateDamage(mp, BOSS1_MOVING_LEFT);
				this.pt = 1010;
				break;

			case BOSS1_DAMAGE_RIGHT:
				this.updateDamage(mp, BOSS1_MOVING_RIGHT);
				this.pt = 1015;
				break;

			case BOSS1_DYING_BY_GRENADE:
				this.dyingByGrenade(mp);
				if (this.muki === 1) this.pt = 1005;
				else this.pt = 1000;
				break;

			case BOSS2_DAMAGE_LEFT:
				this.updateDamage(mp, BOSS2_MOVING_LEFT);
				this.pt = 1110;
				break;

			case BOSS2_DAMAGE_RIGHT:
				this.updateDamage(mp, BOSS2_MOVING_RIGHT);
				this.pt = 1115;
				break;

			case BOSS2_DYING_BY_GRENADE:
				this.dyingByGrenade(mp);
				if (this.muki === 1) this.pt = 1105;
				else this.pt = 1100;
				break;

			case BOSS3_DAMAGE_LEFT:
				this.updateDamage(mp, BOSS3_MOVING_LEFT);
				this.pt = 1210;
				break;

			case BOSS3_DAMAGE_RIGHT:
				this.updateDamage(mp, BOSS3_MOVING_RIGHT);
				this.pt = 1215;
				break;

			case BOSS3_DYING_BY_GRENADE:
				this.dyingByGrenade(mp);
				if (this.muki === 1) this.pt = 1205;
				else this.pt = 1200;
				break;

			case BOSS1_STANDBY:
				if (mp.sl_step === 2 || mp.sl_step === 3) {
					this.c = BOSS1_ATTACK_LEFT;
					this.c1 = 0;
				}
				this.pt = 1000;
				break;

			case BOSS1_ATTACK_LEFT:
				this.boss1Attack(mp, 0);
				this.pt = 1000;
				break;

			case BOSS1_ATTACK_RIGHT:
				this.boss1Attack(mp, 1);
				this.pt = 1005;
				break;

			case BOSS1_MOVING_LEFT:
				this.x -= 14;
				if (this.x <= x_standby_left) {
					this.x = x_standby_left;
					this.c = BOSS1_ATTACK_RIGHT;
					this.c1 = 0;
				}
				this.pt = 1000;
				break;

			case BOSS1_MOVING_RIGHT:
				this.x += 14;
				if (this.x >= x_standby_right) {
					this.x = x_standby_right;
					this.c = BOSS1_ATTACK_LEFT;
					this.c1 = 0;
				}
				this.pt = 1005;
				break;

			case BOSS2_STANDBY:
				if (mp.sl_step === 2 || mp.sl_step === 3) {
					this.c = BOSS2_ATTACK_LEFT;
					this.c1 = 0;
				}
				this.pt = 1100;
				break;

			case BOSS2_ATTACK_LEFT:
				this.boss2Attack(mp, 0);
				this.pt = 1100;
				break;

			case BOSS2_ATTACK_RIGHT:
				this.boss2Attack(mp, 1);
				this.pt = 1105;
				break;

			case BOSS2_MOVING_LEFT:
				this.x -= 14;
				if (this.x <= x_standby_left) {
					this.x = x_standby_left;
					this.c = BOSS2_ATTACK_RIGHT;
					this.c1 = 0;
				}
				this.pt = 1100;
				break;

			case BOSS2_MOVING_RIGHT:
				this.x += 14;
				if (this.x >= x_standby_right) {
					this.x = x_standby_right;
					this.c = BOSS2_ATTACK_LEFT;
					this.c1 = 0;
				}
				this.pt = 1105;
				break;

			case BOSS3_STANDBY:
				if (mp.sl_step === 2 || mp.sl_step === 3) {
					if (mp.boss3_type >= 2 && mp.boss3_type <= 4) {
						this.c = BOSS3_TACKLE_ATTACK_LEFT;
						this.vy = -24;
					} else {
						this.c = BOSS3_ATTACK_LEFT;
					}
					this.c1 = 0;
				}
				this.pt = 1200;
				break;

			case BOSS3_ATTACK_LEFT:
				this.boss3Attack(mp, 0);
				this.pt = 1200;
				break;

			case BOSS3_ATTACK_RIGHT:
				this.boss3Attack(mp, 1);
				this.pt = 1205;
				break;

			case BOSS3_MOVING_LEFT:
				this.x -= 14;
				if (this.x <= x_standby_left) {
					this.x = x_standby_left;
					if (mp.boss3_type >= 2 && mp.boss3_type <= 4) {
						this.c = BOSS3_TACKLE_ATTACK_RIGHT;
						this.vy = -24;
					} else {
						this.c = BOSS3_ATTACK_RIGHT;
					}
					this.c1 = 0;
				}
				this.pt = 1200;
				break;

			case BOSS3_MOVING_RIGHT:
				this.x += 14;
				if (this.x >= x_standby_right) {
					this.x = x_standby_right;
					if (mp.boss3_type >= 2 && mp.boss3_type <= 4) {
						this.c = BOSS3_TACKLE_ATTACK_LEFT;
						this.vy = -24;
					} else {
						this.c = BOSS3_ATTACK_LEFT;
					}
					this.c1 = 0;
				}
				this.pt = 1205;
				break;

			case BOSS3_TACKLE_ATTACK_LEFT:
				this.pt = 1200;
				if (this.c1 < 5) {
				} else if (this.c1 < 25) {
					this.pt = 1250;
				} else if (this.c1 === 25) {
					this.pt = 1250;
				} else if (this.c1 === 30) {
					this.pt = 1255;
				}
				this.boss3TackleAttack(mp, 0);
				break;

			case BOSS3_TACKLE_ATTACK_RIGHT:
				this.pt = 1205;
				if (this.c1 < 5) {
				} else if (this.c1 < 25) {
					this.pt = 1255;
				} else if (this.c1 === 25) {
					this.pt = 1255;
				} else if (this.c1 === 30) {
					this.pt = 1250;
				}
				this.boss3TackleAttack(mp, 1);
				break;
		}
	}

	/**
	 * 当たり判定処理
	 * @param {MainProgram} mp
	 */
	checkCollision(mp) {
		// 主人公とボスの当たり判定
		const j = mp.co_j;
		const hit_flag =
			j.c >= 100 &&
			j.c < 200 &&
			this.c >= 100 &&
			Math.abs(this.x - j.x) < 42 &&
			j.y > this.y - 20 &&
			j.y < this.y + 40;

		if (hit_flag) {
			// 主人公とボスが接触している
			const fumu_flag = Math.abs(this.x - j.x) < 34 && j.vy > 0;
			if (fumu_flag && this.isFumuable(mp)) {
				// 主人公がボスにダメージを与える
				this.fumu(mp);

				// 主人公が敵を踏んだ状態にする
				j.y = this.y;
				j.vy = -320;
				mp.j_jump_type = 1;
				j.c = 110;
				j.c1 = -4;
				j.pt = 109;
			} else {
				// 主人公が死亡する
				mp.jShinu(2);
			}
		}
		// 主人公の攻撃とボスの当たり判定
		if (mp.jm_kazu > 0 && this.c >= 100) {
			for (let i = 0; i <= 1; i++) {
				const characterobject = mp.co_jm[i];
				if (characterobject.c < 100) continue;
				if (Math.abs(this.x - characterobject.x) < 34 && Math.abs(this.y - characterobject.y) < 30) {
					if (characterobject.c === 200) {
						// グレネード
						this.hitWithGrenade(mp, characterobject);
					} else {
						// グレネードではないものが当たった場合、消滅させる
						characterobject.c = 0;
						mp.jm_kazu--;
					}
				}
			}
		}
	}

	/**
	 * boss1の攻撃中の動作
	 * @param {MainProgram} mp
	 * @param {number} direction ボスの向き 0:左向き 1:右向き
	 */
	boss1Attack(mp, direction) {
		// 左向きなら1 右向きなら-1
		const mirror = direction === 1 ? -1 : 1;

		this.c1++;
		if (mp.boss_type === 2) {
			// 亀を投げる
			const attack_count = [1, 5, 7, 9, 21, 91, 95, 97, 99, 111, 170, 180];
			const powers = [-2, -4, -6, -8, -2, -2, -4, -6, -8, -2, -4, -2];
			for (const [count, power] of zip(attack_count, powers)) {
				if (this.c1 === count) {
					mp.tSetBoss(this.x, this.y, 150, power * mirror);
					break;
				}
			}
			if (this.c1 > 250) this.c1 = 250;
		} else if (mp.boss_type === 3) {
			// ヒノララシを投げる
			const attack_count = [5, 20, 35, 50, 65, 80, 95, 110];
			for (const count of attack_count) {
				if (this.c1 === count) {
					mp.tSetBoss(this.x, this.y, 450, -3 * mirror);
					break;
				}
			}
			if (this.c1 > 250) this.c1 = 250;
		} else if (mp.boss_type === 4) {
			// マリリを投げる
			const attack_count = [1, 15, 29, 81, 95, 109, 165];
			const powers = [-5, -3, -2, -5, -3, -2, -3];
			for (const [count, power] of zip(attack_count, powers)) {
				if (this.c1 === count) {
					mp.tSetBoss(this.x, this.y, 650, power * mirror);
					break;
				}
			}
			if (this.c1 > 250) this.c1 = 250;
		} else {
			// 噴火
			if (this.c1 === 3) {
				mp.mSet2(this.x, this.y, 500, -4, -18);
				mp.mSet2(this.x, this.y, 500, 4, -18);
			} else if (this.c1 === 14) {
				mp.mSet2(this.x, this.y, 500, -6, -20);
				mp.mSet2(this.x, this.y, 500, 6, -20);
			} else if (this.c1 === 20) {
				mp.mSet2(this.x, this.y, 500, -3, -24);
				mp.mSet2(this.x, this.y, 500, 3, -24);
			} else if (this.c1 >= 28 && this.c1 <= 98) {
				if (this.c1 % 7 === 0) mp.mSet2(this.x, this.y, 500, (-15 + mp.ranInt(20)) * mirror, -30);
			} else if (this.c1 === 130) {
				const dir = mp.ranInt(8) + 3;
				mp.mSet2(this.x, this.y, 500, dir, -30);
				mp.mSet2(this.x, this.y, 500, -dir, -30);
			}
			if (this.c1 >= 150) this.c1 = 98;
		}
	}

	/**
	 * boss2の攻撃中の動作
	 * @param {MainProgram} mp
	 * @param {number} direction ボスの向き 0:左向き 1:右向き
	 */
	boss2Attack(mp, direction) {
		this.c1++;
		if (mp.boss2_type === 2) {
			// バブル光線
			if (this.c1 === 10 || this.c1 === 85 || this.c1 === 215) {
				this.boss2BubbleBeam(mp, 0);
			} else if (this.c1 === 35 || this.c1 === 110 || this.c1 === 295) {
				this.boss2BubbleBeam(mp, 15);
			} else if (this.c1 === 60 || this.c1 === 135 || this.c1 === 375) {
				this.boss2BubbleBeam(mp, 30);
			}
			if (this.c1 > 445) this.c1 = 0;
		} else {
			// 水の波動
			if (this.c1 === 5 || this.c1 === 35 || this.c1 === 65 || this.c1 === 110 || this.c1 === 185) {
				mp.mSet(this.x, this.y, 90);
			}
			if (this.c1 > 185) this.c1 = 110;
		}
	}

	/**
	 * バブル光線
	 * @param {MainProgram} mp
	 * @param {number} degree ずらす角度(度数法)
	 */
	boss2BubbleBeam(mp, degree) {
		for (let i = 0; i < 8; i++) {
			// NOTE: 後方互換性のためMath.PI等ではなく3.14を用いてラジアンに変換する
			const d = (normalizeDegree(i * 45 + degree) * 3.14) / 180;
			const cos = Math.floor(Math.cos(d) * 8);
			const sin = -Math.floor(Math.sin(d) * 8);
			mp.mSet2(this.x, this.y - 8, 710, cos, sin);
		}
	}

	/**
	 * boss3の攻撃中の動作(グレネード)
	 * @param {MainProgram} mp
	 * @param {number} direction ボスの向き 0:左向き 1:右向き
	 */
	boss3Attack(mp, direction) {
		// 左向きなら1 右向きなら-1
		const mirror = direction === 1 ? -1 : 1;

		this.c1++;
		// グレネード
		const attack_count = [1, 15, 29, 65, 80, 105, 147, 520, 530];
		const powers = [-5, -10, -15, -20, -5, -15, -10, 4, -5];
		for (const [count, power] of zip(attack_count, powers)) {
			if (this.c1 === count) {
				mp.mSet2(this.x, this.y, 800, power * mirror, -32);
				break;
			}
		}

		if (this.c1 === 15) {
			// 主人公の位置に応じた行動分岐
			if (direction !== 1 && mp.co_j.x > this.x - 64) this.c1 = 500;
			if (direction === 1 && mp.co_j.x < this.x + 64) this.c1 = 500;
		} else if (this.c1 === 237) this.c1 = 0;
		else if (this.c1 >= 530) this.c1 = 1;
	}

	/**
	 * boss3の体当たり攻撃
	 * @param {MainProgram} mp
	 * @param {number} direction ボスの向き 0:左向き 1:右向き
	 */
	boss3TackleAttack(mp, direction) {
		// 左向きなら1 右向きなら-1
		const mirror = direction === 1 ? -1 : 1;

		// 画面外判定に用いる座標
		const x_border_left = mp.sl_wx + 16;
		const x_border_right = mp.sl_wx + 16 + 512 - 64;
		// ボスが居座るX座標
		const x_standby_left = mp.sl_wx + 96;
		const x_standby_right = mp.sl_wx + 512 - 96 - 32;

		const flag_type_fast = mp.boss3_type === 3;
		const flag_type_jump = mp.boss3_type === 4;

		/**
		 * @param speed {number} ボスのX速度
		 * @param left {number} 左側の境界
		 * @param right {number} 右側の境界
		 * @param fix_position {boolean} 境界外に出た場合にX座標を境界に合わせるかどうか
		 * @param next_c1 {number} 境界外に出た際に移行するc1の値
		 */
		const checkBorder = (speed, left, right, fix_position, next_c1) => {
			if (speed <= 0 && this.x <= left) {
				if (fix_position) this.x = left;
				this.c1 = next_c1;
			} else if (speed >= 0 && this.x >= right) {
				if (fix_position) this.x = right;
				this.c1 = next_c1;
			}
		};

		if (this.c1 < 25) {
			this.c1++;
		} else if (this.c1 === 25 || this.c1 === 30) {
			const flag_on_the_way = this.c1 === 25;
			const next_c1 = flag_on_the_way ? 30 : 40;
			if (flag_type_jump) {
				// ジャンプ
				const speed = (flag_on_the_way ? -3 : 4) * mirror;
				this.x += speed;
				// 落下
				if (this.vy < 24) this.vy = Math.min(this.vy + 2, 24);
				this.y += this.vy;
				if (this.y >= mp.boss_kijyun_y) {
					// 基準となるY座標まで落ちたら再度ジャンプ
					this.y = mp.boss_kijyun_y;
					this.vy = -24;
					// 画面外に出ていたら反転する
					checkBorder(speed, x_border_left, x_border_right, false, next_c1);
				}
			} else {
				// 体当たり
				let speed = 0;
				if (flag_on_the_way) speed = flag_type_fast ? -18 : -12;
				else speed = flag_type_fast ? 18 : 8;
				speed *= mirror;
				this.x += speed;
				// 画面外に出たら反転する
				checkBorder(speed, x_border_left, x_border_right, true, next_c1);
			}
		} else if (this.c1 === 40) {
			// 元の位置に戻る
			const speed = -2 * mirror;
			this.x += speed;
			checkBorder(speed, x_standby_left, x_standby_right, true, -20);
		}
	}

	/**
	 * 踏まれて潰れている最中のボスの処理
	 * @param {MainProgram} mp
	 * @param {number} return_state ダメージから回復後に復帰するボスの状態
	 */
	updateDamage(mp, return_state) {
		this.c1++;
		if (this.c4 <= 0) {
			// 死亡
			if (this.c1 >= 26) {
				this.c = DYING;
				this.c1 = 0;
				mp.addScore(10);
			}
		} else {
			// 体力がまだ残っている
			if (this.c1 >= 11) {
				// ダメージから回復する
				this.c = return_state;
			}
		}
	}

	/**
	 * グレネードで吹き飛んでいる状態の処理
	 * @param {MainProgram} mp
	 */
	dyingByGrenade(mp) {
		// 落下していく
		this.vy += 4;
		if (this.vy > 28) this.vy = 28;
		this.x += this.vx;
		this.y += this.vy;
		if (this.y >= mp.maps.wy + 320 + 16) {
			// 画面下まで落ちた
			this.c = DYING;
			this.c1 = 0;
			mp.addScore(10);
		}
	}

	/**
	 * ボスが踏むことのできる状態かどうか判定します
	 * @param {MainProgram} mp
	 * @returns {boolean}
	 */
	isFumuable(mp) {
		return !(this.pt === 1250 || this.pt === 1255);
	}

	/**
	 * ボスが主人公に踏まれてダメージを受けたときの処理をします
	 * @param {MainProgram} mp
	 */
	fumu(mp) {
		this.c4--;
		this.c1 = 0;
		// HP1のときは右向き
		const direction = this.c4 === 1 ? 1 : 0;
		switch (this.getBossNumber()) {
			case 1:
				this.c = direction ? BOSS1_DAMAGE_RIGHT : BOSS1_DAMAGE_LEFT;
				this.pt = direction ? 1015 : 1010;
				break;
			case 2:
				this.c = direction ? BOSS2_DAMAGE_RIGHT : BOSS2_DAMAGE_LEFT;
				this.pt = direction ? 1115 : 1110;
				break;
			case 3:
				this.c = direction ? BOSS3_DAMAGE_RIGHT : BOSS3_DAMAGE_LEFT;
				this.pt = direction ? 1215 : 1210;
				break;
		}
	}

	/**
	 * グレネードとボスが接触した場合の処理を行います
	 * @param {MainProgram} mp
	 * @param {CharacterObject} characterobject グレネード
	 */
	hitWithGrenade(mp, characterobject) {
		// グレネードでないなら処理しない
		if (characterobject.c !== 200) return;
		if (this.co_b.c < 100) return;
		characterobject.c = 50;
		characterobject.c1 = 1;
		characterobject.c2 = 20;
		if (mp.grenade_type !== 1 && mp.grenade_type !== 5) return;
		// ボスを倒す
		this.killGrenade(mp, characterobject.vx < 0 ? 1 : 0);
	}

	/**
	 * ボスを殺します
	 * (グレネードで弾き飛ばされた場合の処理)
	 * @param {MainProgram} mp
	 * @param {number} direction ボスの向き 0:左向き 1:右向き ※向いている方向とは反対側に飛んでいく
	 */
	killGrenade(mp, direction) {
		this.vy = -24;
		this.c1 = 0;
		this.muki = direction;
		this.vx = this.muki ? -4 : 4;
		switch (this.getBossNumber()) {
			case 1:
				this.c = BOSS1_DYING_BY_GRENADE;
				this.pt = this.muki ? 1005 : 1000;
				break;
			case 2:
				this.c = BOSS2_DYING_BY_GRENADE;
				this.pt = this.muki ? 1105 : 1100;
				break;
			case 3:
				this.c = BOSS3_DYING_BY_GRENADE;
				this.pt = this.muki ? 1205 : 1200;
				break;
		}
	}

	/**
	 * ボスの種類を返します
	 * 現在のボスの状態をもとに判定します
	 * 1: グラーダ
	 * 2: カイオール
	 * 3: センクウザ
	 * -1: 不明
	 */
	getBossNumber() {
		if (this.c >= 60 && this.c < 70) return 1;
		if (this.c >= 100 && this.c < 200) return 1;
		if (this.c >= 70 && this.c < 80) return 2;
		if (this.c >= 200 && this.c < 300) return 2;
		if (this.c >= 80 && this.c < 90) return 3;
		if (this.c >= 300 && this.c < 400) return 3;
		return -1;
	}
}

export { Boss };
