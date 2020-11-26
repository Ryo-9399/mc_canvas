import { CharacterObject } from "../CharacterObject";
import { MainProgram } from "../MainProgram";
import { rounddown } from "../GlobalFunctions";

// ボスの状態
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

// ボスの描画パターン
export const PATTERN_BOSS1_LEFT = 1000;
export const PATTERN_BOSS1_RIGHT = 1005;
export const PATTERN_BOSS1_DAMAGE_LEFT = 1010;
export const PATTERN_BOSS1_DAMAGE_RIGHT = 1015;
export const PATTERN_BOSS2_LEFT = 1100;
export const PATTERN_BOSS2_ROTATE_LEFT = 1101;
export const PATTERN_BOSS2_RIGHT = 1105;
export const PATTERN_BOSS2_ROTATE_RIGHT = 1106;
export const PATTERN_BOSS2_DAMAGE_LEFT = 1110;
export const PATTERN_BOSS2_DAMAGE_RIGHT = 1115;
export const PATTERN_BOSS3_LEFT = 1200;
export const PATTERN_BOSS3_RIGHT = 1205;
export const PATTERN_BOSS3_DAMAGE_LEFT = 1210;
export const PATTERN_BOSS3_DAMAGE_RIGHT = 1215;
export const PATTERN_BOSS3_BARRIER_LEFT = 1250;
export const PATTERN_BOSS3_ROTATE_LEFT = 1251;
export const PATTERN_BOSS3_BARRIER_RIGHT = 1255;
export const PATTERN_BOSS3_ROTATE_RIGHT = 1256;

/**
 * 度数法で表された角度を、[0,360)の範囲に収まるよう正規化する
 * @param {number} degree
 */
const normalizeDegree = (degree: number) => ((degree % 360) + 360) % 360;

/**
 * 長さが同じ配列をまとめる
 * [1,2,3],[4,5,6]=>[[1,4],[2,5],[3,6]]
 * @param {Array} a
 * @param {Array} b
 */
const zip = <T>(a: T[], b: T[]): [T, T][] => {
	if (a.length !== b.length) throw new Error("The given arrays do not have the same length.");
	return a.map((v, i) => [v, b[i]]);
};

type Direction = 0 | 1;

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
	update(mp: MainProgram) {
		if (this.x >= mp.maps.wx + 1024) return;
		mp.boss_attack_mode = false;
		this.move(mp);
		this.checkCollision(mp);
	}

	/**
	 * ボスの行動処理
	 * @param {MainProgram} mp
	 */
	move(mp: MainProgram) {
		// ボスが居座るX座標
		const x_standby_left = mp.sl_wx + 96;
		const x_standby_right = mp.sl_wx + 512 - 96 - 32;
		switch (this.c) {
			case DYING:
				// 死亡
				// 消えてからしばらくして人面星が出現する
				if (this.c1 < 20) this.c1++;
				if (this.c1 === 15) {
					if (mp.j_tokugi === 14 || mp.j_tokugi === 15) {
						// シューティングモード、四方向移動モードの場合は直接クリアさせる
						mp.setStageClear();
					} else {
						// 人面星を配置する
						mp.mSet(mp.maps.wx + 256, mp.maps.wy + 128, 2200);
						mp.gs.rsAddSound(13);
					}
				}
				this.pt = 0;
				break;

			case BOSS1_DAMAGE_LEFT:
				this.updateDamage(mp, BOSS1_MOVING_LEFT);
				this.pt = PATTERN_BOSS1_DAMAGE_LEFT;
				break;

			case BOSS1_DAMAGE_RIGHT:
				this.updateDamage(mp, BOSS1_MOVING_RIGHT);
				this.pt = PATTERN_BOSS1_DAMAGE_RIGHT;
				break;

			case BOSS1_DYING_BY_GRENADE:
				this.dyingByGrenade(mp);
				if (this.muki === 1) this.pt = PATTERN_BOSS1_RIGHT;
				else this.pt = PATTERN_BOSS1_LEFT;
				break;

			case BOSS2_DAMAGE_LEFT:
				this.updateDamage(mp, BOSS2_MOVING_LEFT);
				this.pt = PATTERN_BOSS2_DAMAGE_LEFT;
				break;

			case BOSS2_DAMAGE_RIGHT:
				this.updateDamage(mp, BOSS2_MOVING_RIGHT);
				this.pt = PATTERN_BOSS2_DAMAGE_RIGHT;
				break;

			case BOSS2_DYING_BY_GRENADE:
				this.dyingByGrenade(mp);
				if (this.muki === 1) this.pt = PATTERN_BOSS2_RIGHT;
				else this.pt = PATTERN_BOSS2_LEFT;
				break;

			case BOSS3_DAMAGE_LEFT:
				this.updateDamage(mp, BOSS3_MOVING_LEFT);
				this.pt = PATTERN_BOSS3_DAMAGE_LEFT;
				break;

			case BOSS3_DAMAGE_RIGHT:
				this.updateDamage(mp, BOSS3_MOVING_RIGHT);
				this.pt = PATTERN_BOSS3_DAMAGE_RIGHT;
				break;

			case BOSS3_DYING_BY_GRENADE:
				this.dyingByGrenade(mp);
				if (this.muki === 1) this.pt = PATTERN_BOSS3_RIGHT;
				else this.pt = PATTERN_BOSS3_LEFT;
				break;

			case BOSS1_STANDBY:
				if (mp.sl_step === 2 || mp.sl_step === 3) {
					if (mp.boss_destroy_type === 2) {
						// 画面外から登場する
						this.x -= 8;
						if (this.x <= mp.sl_wx + 512 - 128) {
							this.x = mp.sl_wx + 512 - 128;

							this.showBossHPGauge(mp);
							this.c = BOSS1_ATTACK_LEFT;
							this.c1 = 0;
						}
					} else {
						this.c = BOSS1_ATTACK_LEFT;
						this.c1 = 0;
					}
				}
				this.pt = PATTERN_BOSS1_LEFT;
				break;

			case BOSS1_ATTACK_LEFT:
				this.boss1Attack(mp, 0);
				this.pt = PATTERN_BOSS1_LEFT;
				break;

			case BOSS1_ATTACK_RIGHT:
				this.boss1Attack(mp, 1);
				this.pt = PATTERN_BOSS1_RIGHT;
				break;

			case BOSS1_MOVING_LEFT:
				this.x -= 14;
				if (this.x <= x_standby_left) {
					this.x = x_standby_left;
					this.c = BOSS1_ATTACK_RIGHT;
					this.c1 = 0;
				}
				this.pt = PATTERN_BOSS1_LEFT;
				break;

			case BOSS1_MOVING_RIGHT:
				this.x += 14;
				if (this.x >= x_standby_right) {
					this.x = x_standby_right;
					this.c = BOSS1_ATTACK_LEFT;
					this.c1 = 0;
				}
				this.pt = PATTERN_BOSS1_RIGHT;
				break;

			case BOSS2_STANDBY:
				if (mp.sl_step === 2 || mp.sl_step === 3) {
					if (mp.boss_destroy_type === 2) {
						// 画面外から登場する
						this.x -= 8;
						if (this.x <= mp.sl_wx + 512 - 128) {
							this.x = mp.sl_wx + 512 - 128;
							this.showBossHPGauge(mp);
							this.c = BOSS2_ATTACK_LEFT;
							this.c1 = 0;
						}
					} else {
						this.c = BOSS2_ATTACK_LEFT;
						this.c1 = 0;
					}
				}
				this.pt = PATTERN_BOSS2_LEFT;
				break;

			case BOSS2_ATTACK_LEFT:
				this.boss2Attack(mp, 0);
				this.pt = PATTERN_BOSS2_LEFT;
				if (mp.boss2_type === 6) this.pt = PATTERN_BOSS2_ROTATE_LEFT;
				break;

			case BOSS2_ATTACK_RIGHT:
				this.boss2Attack(mp, 1);
				this.pt = PATTERN_BOSS2_RIGHT;
				if (mp.boss2_type === 6) this.pt = PATTERN_BOSS2_ROTATE_RIGHT;
				break;

			case BOSS2_MOVING_LEFT:
				this.x -= 14;
				if (this.x <= x_standby_left) {
					this.x = x_standby_left;
					this.c = BOSS2_ATTACK_RIGHT;
					this.c1 = 0;
				}
				this.pt = PATTERN_BOSS2_LEFT;
				break;

			case BOSS2_MOVING_RIGHT:
				this.x += 14;
				if (this.x >= x_standby_right) {
					this.x = x_standby_right;
					this.c = BOSS2_ATTACK_LEFT;
					this.c1 = 0;
				}
				this.pt = PATTERN_BOSS2_RIGHT;
				break;

			case BOSS3_STANDBY:
				if (mp.sl_step === 2 || mp.sl_step === 3) {
					if (mp.boss_destroy_type === 2) {
						// 画面外から登場する
						this.x -= 8;
						if (this.x <= mp.sl_wx + 512 - 128) {
							this.x = mp.sl_wx + 512 - 128;
							this.showBossHPGauge(mp);
							if ((mp.boss3_type >= 2 && mp.boss3_type <= 4) || (mp.boss3_type >= 6 && mp.boss3_type <= 8)) {
								this.c = BOSS3_TACKLE_ATTACK_LEFT;
								this.vy = -24;
							} else {
								this.c = BOSS3_ATTACK_LEFT;
							}
							this.c1 = 0;
							this.c2 = 0;
						}
					} else {
						if ((mp.boss3_type >= 2 && mp.boss3_type <= 4) || (mp.boss3_type >= 6 && mp.boss3_type <= 8)) {
							this.c = BOSS3_TACKLE_ATTACK_LEFT;
							this.vy = -24;
						} else {
							this.c = BOSS3_ATTACK_LEFT;
						}
						this.c1 = 0;
						this.c2 = 0;
					}
				}
				this.pt = PATTERN_BOSS3_LEFT;
				break;

			case BOSS3_ATTACK_LEFT:
				this.boss3Attack(mp, 0);
				this.pt = PATTERN_BOSS3_LEFT;
				break;

			case BOSS3_ATTACK_RIGHT:
				this.boss3Attack(mp, 1);
				this.pt = PATTERN_BOSS3_RIGHT;
				break;

			case BOSS3_MOVING_LEFT:
				this.x -= 14;
				if (this.x <= x_standby_left) {
					this.x = x_standby_left;
					if ((mp.boss3_type >= 2 && mp.boss3_type <= 4) || (mp.boss3_type >= 6 && mp.boss3_type <= 8)) {
						this.c = BOSS3_TACKLE_ATTACK_RIGHT;
						this.vy = -24;
					} else {
						this.c = BOSS3_ATTACK_RIGHT;
					}
					this.c1 = 0;
				}
				this.pt = PATTERN_BOSS3_LEFT;
				break;

			case BOSS3_MOVING_RIGHT:
				this.x += 14;
				if (this.x >= x_standby_right) {
					this.x = x_standby_right;
					if ((mp.boss3_type >= 2 && mp.boss3_type <= 4) || (mp.boss3_type >= 6 && mp.boss3_type <= 8)) {
						this.c = BOSS3_TACKLE_ATTACK_LEFT;
						this.vy = -24;
					} else {
						this.c = BOSS3_ATTACK_LEFT;
					}
					this.c1 = 0;
				}
				this.pt = PATTERN_BOSS3_RIGHT;
				break;

			case BOSS3_TACKLE_ATTACK_LEFT: {
				this.pt = PATTERN_BOSS3_LEFT;
				const flag_type_rotate = mp.boss3_type >= 6 && mp.boss3_type <= 8;
				if (this.c1 >= 5 && this.c1 <= 25) {
					this.pt = flag_type_rotate ? PATTERN_BOSS3_ROTATE_LEFT : PATTERN_BOSS3_BARRIER_LEFT;
				} else if (this.c1 === 30) {
					this.pt = flag_type_rotate ? PATTERN_BOSS3_ROTATE_RIGHT : PATTERN_BOSS3_BARRIER_RIGHT;
				}
				this.boss3TackleAttack(mp, 0);
				break;
			}
			case BOSS3_TACKLE_ATTACK_RIGHT: {
				this.pt = PATTERN_BOSS3_RIGHT;
				const flag_type_rotate = mp.boss3_type >= 6 && mp.boss3_type <= 8;
				if (this.c1 >= 5 && this.c1 <= 25) {
					this.pt = flag_type_rotate ? PATTERN_BOSS3_ROTATE_RIGHT : PATTERN_BOSS3_BARRIER_RIGHT;
				} else if (this.c1 === 30) {
					this.pt = flag_type_rotate ? PATTERN_BOSS3_ROTATE_LEFT : PATTERN_BOSS3_BARRIER_LEFT;
				}
				this.boss3TackleAttack(mp, 1);
				break;
			}
		}
	}

	/**
	 * 当たり判定処理
	 * @param {MainProgram} mp
	 */
	checkCollision(mp: MainProgram) {
		// 主人公とボスの当たり判定
		const j = mp.co_j;
		const hit_flag =
			j.c >= 100 && j.c < 200 && this.c >= 100 && Math.abs(this.x - j.x) < 42 && j.y > this.y - 20 && j.y < this.y + 40;

		if (hit_flag) {
			// 主人公とボスが接触している
			const fumu_flag = (Math.abs(this.x - j.x) < 34 || mp.easy_mode === 2) && j.vy > 0;
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
			for (let i = 0; i <= 8; i++) {
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
						this.hitWithFireball(mp);
					}
				}
			}
		}
		// 主人公の攻撃としっぽの当たり判定
		const tail_left = j.muki === 1 ? j.x + 16 : j.x - 32;
		const tail_right = j.muki === 1 ? j.x + 63 : j.x + 16;
		const tail_flag = tail_left <= this.x + 47 && tail_right >= this.x - 16 && Math.abs(j.y - this.y) < 48;
		// しっぽとボスが接触している
		if (tail_flag) {
			this.hitWithTail(mp);
		}
	}

	/**
	 * boss1の攻撃中の動作
	 * @param {MainProgram} mp
	 * @param {number} direction ボスの向き 0:左向き 1:右向き
	 */
	boss1Attack(mp: MainProgram, direction: Direction) {
		// 左向きなら1 右向きなら-1
		const mirror = direction === 1 ? -1 : 1;

		mp.boss_attack_mode = true;
		this.c1++;
		if (mp.boss_type === 2) {
			// 亀を投げる
			const attack_count = [1, 5, 7, 9, 21, 91, 95, 97, 99, 111, 170, 180];
			const powers = [-2, -4, -6, -8, -2, -2, -4, -6, -8, -2, -4, -2];
			if (this.c1 === 1) mp.gs.rsAddSound(17);
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
			if (this.c1 === 5) mp.gs.rsAddSound(17);
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
			if (this.c1 === 1) mp.gs.rsAddSound(17);
			for (const [count, power] of zip(attack_count, powers)) {
				if (this.c1 === count) {
					mp.tSetBoss(this.x, this.y, 650, power * mirror);
					break;
				}
			}
			if (this.c1 > 250) this.c1 = 250;
		} else if (mp.boss_type === 5) {
			// がんせきほう
			const attack_count = [1, 8, 16, 24, 32, 40, 48, 64, 72, 80, 88, 96, 104, 112];
			const degrees = [100, 80, 60, 40, 20, 0, 10, 30, 50, 70, 60, 40, 20, 0];
			if (this.c1 === 1) mp.gs.rsAddSound(17);
			for (const [count, degree] of zip(attack_count, degrees)) {
				if (this.c1 === count) {
					// 左向きの場合は角度に180度足す
					const dd = direction !== 1 ? 180 : 0;
					const rad = (normalizeDegree(degree * mirror + dd) * 3.14) / 180;
					const x = rounddown(Math.cos(rad) * 12, true, mp);
					const y = rounddown(Math.sin(rad) * 10, true, mp);
					mp.mSet2(this.x, this.y + 16, 740, x, y);
					break;
				}
			}
			if (this.c1 >= 200) this.c1 = 0;
		} else {
			// 噴火
			if (this.c1 === 3) mp.gs.rsAddSound(17);
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
	boss2Attack(mp: MainProgram, direction: Direction) {
		mp.boss_attack_mode = true;
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
		} else if (mp.boss2_type === 3) {
			// うずしお
			const whirlpool = (d: number) => {
				for (let i = 0; i < 360; i += 90) {
					const attack = direction === 1 ? 980 : 970;
					mp.mSet2(this.x, this.y, attack, i + d, 0);
				}
				mp.gs.rsAddSound(18);
			};
			if (this.c1 === 5 || this.c1 === 125) {
				whirlpool(0);
			} else if (this.c1 === 45) {
				whirlpool(30);
			} else if (this.c1 === 85) {
				whirlpool(60);
			}
			if (this.c1 > 250) this.c1 = 0;
		} else if (mp.boss2_type === 4) {
			// バブル光線連射
			if (this.c1 === 1) {
				mp.gs.rsAddSound(18);
			}
			const attack_count = [1, 8, 16, 24, 32, 56, 72, 80, 88, 96];
			const degrees = [100, 80, 60, 40, 15, 0, 15, 40, 60, 80];
			for (const [count, degree] of zip(attack_count, degrees)) {
				if (this.c1 !== count) continue;
				// 左向きの場合は角度に180度足す
				const dd = direction !== 1 ? 180 : 0;
				// 0から359の間の角度になるようにする
				const degree_normalized = normalizeDegree(degree + dd);
				// 角度にマイナス1をかける
				const degree_inversed = normalizeDegree(degree_normalized * -1);
				// 反転したものとあわせて二発発射する
				const rads = [];
				rads.push((degree_normalized * 3.14) / 180);
				// 反転しても角度が同じ場合は一発しか出さない
				if (degree_normalized !== degree_inversed) rads.push((degree_inversed * 3.14) / 180);
				for (const rad of rads) {
					const cos = rounddown(Math.cos(rad) * 12, true, mp);
					const sin = rounddown(Math.sin(rad) * 10, true, mp);
					mp.mSet2(this.x, this.y, 710, cos, sin);
				}
				break;
			}
			if (this.c1 >= 200) this.c1 = 0;
		} else if (mp.boss2_type === 5) {
			// ハリケンブラスト
			const hurricaneBlast = (d: number) => {
				for (let i = 0; i < 360; i += 60) {
					mp.mSet2(this.x, this.y, 901, i + d, 0);
					mp.mSet2(this.x, this.y, 911, 300 - (i + d), 0);
				}
				mp.gs.rsAddSound(18);
			};
			if (this.c1 === 5) {
				hurricaneBlast(10);
			} else if (this.c1 === 45) {
				hurricaneBlast(30);
			} else if (this.c1 === 85) {
				hurricaneBlast(50);
			}
			if (this.c1 > 270) this.c1 = 0;
		} else if (mp.boss2_type === 6) {
			// バブル光線回転連射
			this.boss2Attack6(mp, direction);
		} else if (mp.boss2_type === 7) {
			// 何もしない
			this.c1 = 0;
		} else if (mp.boss2_type === 8) {
			// 水の波動  直進
			if (this.c1 === 5 || this.c1 === 45 || this.c1 === 85) {
				const attack = direction === 1 ? 96 : 95;
				mp.mSet(this.x, this.y, attack);
				mp.gs.rsAddSound(18);
			}
			if (this.c1 > 165) this.c1 = 4;
		} else {
			// 水の波動
			if (this.c1 === 5 || this.c1 === 35 || this.c1 === 65 || this.c1 === 110 || this.c1 === 185) {
				mp.mSet(this.x, this.y, 90);
				mp.gs.rsAddSound(18);
			}
			if (this.c1 > 185) this.c1 = 110;
		}
	}

	/**
	 * バブル光線
	 * @param {MainProgram} mp
	 * @param {number} degree ずらす角度(度数法)
	 */
	boss2BubbleBeam(mp: MainProgram, degree: number) {
		for (let i = 0; i < 8; i++) {
			// NOTE: 後方互換性のためMath.PI等ではなく3.14を用いてラジアンに変換する
			const d = (normalizeDegree(i * 45 + degree) * 3.14) / 180;
			const cos = rounddown(Math.cos(d) * 8, true, mp);
			const sin = -rounddown(Math.sin(d) * 8, true, mp);
			mp.mSet2(this.x, this.y - 8, 710, cos, sin);
			mp.gs.rsAddSound(18);
		}
	}

	/**
	 * バブル光線回転連射
	 * @param {MainProgram} mp
	 * @param {number} direction ボスの向き 0:左向き 1:右向き
	 */
	boss2Attack6(mp: MainProgram, direction: Direction) {
		// 左向きなら1 右向きなら-1
		const mirror = direction === 1 ? -1 : 1;
		this.c1--;

		// 回転する
		if (this.c1 <= 100) this.c2 += 10 * mirror;
		else if (this.c1 <= 200) this.c2 -= 5 * mirror;
		else if (this.c1 <= 300) this.c2 += 2 * mirror;
		else this.c2 -= 2 * mirror;

		if (this.c1 <= 0) {
			mp.gs.rsAddSound(18);
		}

		// 攻撃
		let rad = null;
		if (this.c1 <= 0) {
			rad = direction !== 1 ? 3.14 : 0;
		} else {
			let attack_counts = [];
			let degrees = [];
			if (this.c1 <= 100) {
				attack_counts = [40, 70, 90];
				degrees = [40, 70, 100];
			} else if (this.c1 <= 200) {
				degrees = attack_counts = [80, 60, 30, 0, -40, -70, -100];
			} else if (this.c1 <= 300) {
				degrees = attack_counts = [-60, -30, 0, 30, 60, 90];
			} else {
				degrees = attack_counts = [60, 30, 0, -30, -60, -90];
			}
			for (const [count, degree] of zip(attack_counts, degrees)) {
				// 左向きの場合は角度に180度足す
				const dd = direction !== 1 ? 180 : 0;
				if (this.c2 === count * mirror) {
					rad = (normalizeDegree(degree * mirror + dd) * 3.14) / 180;
					break;
				}
			}
		}
		if (rad !== null) {
			const cos = rounddown(Math.cos(rad) * 12, true, mp);
			const sin = rounddown(Math.sin(rad) * 8, true, mp);
			mp.mSet2(this.x, this.y, 711, cos, sin);
		}

		// 回転する方向を変える
		if (this.c1 <= 0) {
			this.c2 = 0;
			this.c1 = 100;
		} else if (this.c1 <= 100) {
			if (this.c2 * mirror >= 90) {
				this.c2 = 90 * mirror;
				this.c1 = 200;
			}
		} else if (this.c1 <= 200) {
			if (this.c2 * mirror <= -100) {
				this.c2 = -100 * mirror;
				this.c1 = 300;
			}
		} else if (this.c1 <= 300) {
			if (this.c2 * mirror >= 90) {
				this.c2 = 90 * mirror;
				this.c1 = 400;
			}
		} else {
			if (this.c2 * mirror <= -90) {
				this.c2 = -90 * mirror;
				this.c1 = 300;
			}
		}
	}

	/**
	 * boss3の攻撃中の動作(りゅうせいぐん・グレネード)
	 * @param {MainProgram} mp
	 * @param {number} direction ボスの向き 0:左向き 1:右向き
	 */
	boss3Attack(mp: MainProgram, direction: Direction) {
		// 左向きなら1 右向きなら-1
		const mirror = direction === 1 ? -1 : 1;

		mp.boss_attack_mode = true;
		this.c1++;
		if (mp.boss3_type === 5) {
			// りゅうせいぐん
			if (this.c1 === 1) mp.gs.rsAddSound(22);
			if (
				this.c1 === 1 ||
				this.c1 === 20 ||
				this.c1 === 40 ||
				this.c1 === 60 ||
				this.c1 === 80 ||
				this.c1 === 100 ||
				this.c1 === 120 ||
				this.c1 === 140
			) {
				const dx = direction === 1 ? 0 : 512 - 32;
				if (this.c1 <= 45) mp.mSet2(mp.maps.wx + dx - 8 * mp.ranInt(10) * mirror, mp.maps.wy - 32, 740, -4 * mirror, 9);
				mp.mSet2(mp.maps.wx + dx - 8 * (mp.ranInt(35) + 14) * mirror, mp.maps.wy - 32, 740, -4 * mirror, 9);
			} else if (
				this.c1 === 15 ||
				this.c1 === 35 ||
				this.c1 === 55 ||
				this.c1 === 75 ||
				this.c1 === 95 ||
				this.c1 === 115 ||
				this.c1 === 135 ||
				this.c1 === 155
			) {
				const dx = direction === 1 ? 0 : 512 - 32;
				if (this.c1 <= 55)
					mp.mSet2(mp.maps.wx + dx - 8 * mp.ranInt(10) * mirror, mp.maps.wy - 32, 740, -4 * mirror, 11);
				mp.mSet2(mp.maps.wx + dx - 8 * (mp.ranInt(35) + 14) * mirror, mp.maps.wy - 32, 740, -4 * mirror, 11);
			}
			if (this.c1 >= 250) this.c1 = 55;
		} else {
			// グレネード
			const attack_count = [1, 15, 29, 65, 80, 105, 147, 520, 530];
			const powers = [-5, -10, -15, -20, -5, -15, -10, 4, -5];
			for (const [count, power] of zip(attack_count, powers)) {
				if (this.c1 === count) {
					mp.mSet2(this.x, this.y, 800, power * mirror, -32);
					mp.gs.rsAddSound(22);
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
	}

	/**
	 * boss3の体当たり攻撃
	 * @param {MainProgram} mp
	 * @param {number} direction ボスの向き 0:左向き 1:右向き
	 */
	boss3TackleAttack(mp: MainProgram, direction: Direction) {
		// 左向きなら1 右向きなら-1
		const mirror = direction === 1 ? -1 : 1;

		// 画面外判定に用いる座標
		const x_border_left = mp.sl_wx + 16;
		const x_border_right = mp.sl_wx + 16 + 512 - 64;
		// ボスが居座るX座標
		const x_standby_left = mp.sl_wx + 96;
		const x_standby_right = mp.sl_wx + 512 - 96 - 32;

		const flag_type_fast = mp.boss3_type === 3 || mp.boss3_type === 7;
		const flag_type_jump = mp.boss3_type === 4 || mp.boss3_type === 8;
		const flag_type_rotate = mp.boss3_type >= 6 && mp.boss3_type <= 8;

		/**
		 * @param speed {number} ボスのX速度
		 * @param left {number} 左側の境界
		 * @param right {number} 右側の境界
		 * @param fix_position {boolean} 境界外に出た場合にX座標を境界に合わせるかどうか
		 * @param next_c1 {number} 境界外に出た際に移行するc1の値
		 */
		const checkBorder = (speed: number, left: number, right: number, fix_position: boolean, next_c1: number) => {
			if (speed <= 0 && this.x <= left) {
				if (fix_position) this.x = left;
				this.c1 = next_c1;
			} else if (speed >= 0 && this.x >= right) {
				if (fix_position) this.x = right;
				this.c1 = next_c1;
			}
		};

		// NOTE: ここのdirection!==1の判定はおそらく元のコードのバグ
		// TODO: リファクタリング中なので挙動維持のため残すが、おそらくdirection !== 1の判定は消して問題ない
		if ((this.c1 >= 5 && this.c1 < 25) || (direction !== 1 && this.c1 === 25) || this.c1 === 30)
			mp.boss_attack_mode = true;

		// 回転
		if (this.c1 < 5 && direction !== 1) this.c2 = 0;
		if (flag_type_rotate) {
			let degree = 0;
			if ((this.c1 >= 5 && this.c1 < 25) || this.c1 === 25) degree = -15;
			else if (this.c1 === 30) degree = 15;
			// boss3_type === 7: 高速回転
			if (mp.boss3_type === 7) degree *= 2;
			if (degree !== 0) this.c2 = normalizeDegree(this.c2 + degree * mirror);
		}

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
			checkBorder(speed, x_standby_right, x_standby_left, true, -20);
		}
	}

	/**
	 * 踏まれて潰れている最中のボスの処理
	 * @param {MainProgram} mp
	 * @param {number} return_state ダメージから回復後に復帰するボスの状態
	 */
	updateDamage(mp: MainProgram, return_state: number) {
		this.c1++;
		if (this.c4 <= 0) {
			// 死亡
			if (this.c1 >= 26) {
				this.c = DYING;
				this.c1 = 0;
				// シューティングモード、四方向移動モードの場合は100点加算
				if (mp.j_tokugi === 14 || mp.j_tokugi === 15) mp.addScore(100);
				else mp.addScore(10);
				// HPゲージを閉じる
				if (mp.boss_destroy_type === 2) mp.hideGauge();
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
	dyingByGrenade(mp: MainProgram) {
		// 落下していく
		this.vy += 4;
		if (this.vy > 28) this.vy = 28;
		this.x += this.vx;
		this.y += this.vy;
		if (mp.boss_destroy_type === 2) {
			mp.boss_hp = 0;
			this.showBossHPGauge(mp);
		}
		if (this.y >= mp.maps.wy + 320 + 16) {
			// 画面下まで落ちた
			this.c = DYING;
			this.c1 = 0;
			if (mp.j_tokugi === 14 || mp.j_tokugi === 15) {
				// シューティングモード、四方向移動モードの場合は100点加算
				mp.addScore(100);
			} else mp.addScore(10);
			// HPゲージを閉じる
			if (mp.boss_destroy_type === 2) mp.hideGauge();
		}
	}

	/**
	 * ボスが踏むことのできる状態かどうか判定します
	 * @param {MainProgram} mp
	 * @returns {boolean}
	 */
	isFumuable(mp: MainProgram) {
		if (mp.j_tokugi === 10 || (mp.j_tokugi >= 12 && mp.j_tokugi <= 15)) return false;
		if (mp.boss_destroy_type === 2) return false;
		return !(
			this.pt === PATTERN_BOSS3_BARRIER_LEFT ||
			this.pt === PATTERN_BOSS3_BARRIER_RIGHT ||
			this.pt === PATTERN_BOSS3_ROTATE_LEFT ||
			this.pt === PATTERN_BOSS3_ROTATE_RIGHT
		);
	}

	/**
	 * ボスが主人公に踏まれてダメージを受けたときの処理をします
	 * @param {MainProgram} mp
	 */
	fumu(mp: MainProgram) {
		this.c4--;
		this.c1 = 0;
		// HP1のときは右向き
		const direction = this.c4 === 1 ? 1 : 0;
		switch (this.getBossNumber()) {
			case 1:
				this.c = direction ? BOSS1_DAMAGE_RIGHT : BOSS1_DAMAGE_LEFT;
				this.pt = direction ? PATTERN_BOSS1_DAMAGE_RIGHT : PATTERN_BOSS1_DAMAGE_LEFT;
				break;
			case 2:
				this.c = direction ? BOSS2_DAMAGE_RIGHT : BOSS2_DAMAGE_LEFT;
				this.pt = direction ? PATTERN_BOSS2_DAMAGE_RIGHT : PATTERN_BOSS2_DAMAGE_LEFT;
				break;
			case 3:
				this.c = direction ? BOSS3_DAMAGE_RIGHT : BOSS3_DAMAGE_LEFT;
				this.pt = direction ? PATTERN_BOSS3_DAMAGE_RIGHT : PATTERN_BOSS3_DAMAGE_LEFT;
				break;
		}
		mp.gs.rsAddSound(8);
	}

	/**
	 * グレネードとボスが接触した場合の処理を行います
	 * @param {MainProgram} mp
	 * @param {CharacterObject} characterobject グレネード
	 */
	hitWithGrenade(mp: MainProgram, characterobject: CharacterObject) {
		// グレネードでないなら処理しない
		if (characterobject.c !== 200) return;
		if (this.c < 100) return;
		characterobject.c = 50;
		characterobject.c1 = 1;
		characterobject.c2 = 20;
		if (mp.grenade_type !== 1 && mp.grenade_type !== 5) return;
		// ボスを倒す
		// シューティングモードの場合
		if (mp.j_tokugi === 14 || mp.j_tokugi === 15) {
			this.killNormalAttack(mp);
		} else {
			this.killGrenade(mp, characterobject.vx < 0 ? 1 : 0);
		}
	}

	/**
	 * ファイヤーボールとボスが接触した場合の処理を行います
	 * @param {MainProgram} mp
	 */
	hitWithFireball(mp: MainProgram) {
		// ボスがバリアを張っている場合はダメージを与えられない
		if (this.pt === PATTERN_BOSS3_BARRIER_LEFT || this.pt === PATTERN_BOSS3_BARRIER_RIGHT) return;
		// HPを1減らす
		this.setHP(mp, mp.boss_hp - 1);
	}

	/**
	 * しっぽとボスが接触した場合の処理を行います
	 * @param {MainProgram} mp
	 */
	hitWithTail(mp: MainProgram) {
		// しっぽでボスにダメージを与えられない場合は処理しない
		if (mp.boss_destroy_type !== 2) return;
		if (this.pt === PATTERN_BOSS3_BARRIER_LEFT || this.pt === PATTERN_BOSS3_BARRIER_RIGHT) return;
		if (mp.j_tail_ap_boss < 1 || mp.j_tail_ac !== 5) return;

		// ボスにダメージを与える
		const result = this.setHP(mp, mp.boss_hp - mp.j_tail_ap_boss);
		// ダメージを与えることに成功した場合は音を鳴らす
		if (result) mp.gs.rsAddSound(9);
	}

	/**
	 * ボスを殺します
	 * (ファイヤーボール・しっぽの攻撃で倒された場合の処理)
	 * @param {MainProgram} mp
	 */
	killNormalAttack(mp: MainProgram) {
		// ファイヤーボール・しっぽの攻撃で倒される場合、ボスは常に左向き
		this.c4 = 0;
		this.c1 = 0;
		this.y -= 16;
		switch (this.getBossNumber()) {
			case 1:
				this.c = BOSS1_DAMAGE_LEFT;
				this.pt = PATTERN_BOSS1_DAMAGE_LEFT;
				break;
			case 2:
				this.c = BOSS2_DAMAGE_LEFT;
				this.pt = PATTERN_BOSS2_DAMAGE_LEFT;
				break;
			case 3:
				this.c = BOSS3_DAMAGE_LEFT;
				this.pt = PATTERN_BOSS3_DAMAGE_LEFT;
				break;
		}
		mp.gs.rsAddSound(8);
	}

	/**
	 * ボスを殺します
	 * (グレネードで弾き飛ばされた場合の処理)
	 * @param {MainProgram} mp
	 * @param {number} direction ボスの向き 0:左向き 1:右向き ※向いている方向とは反対側に飛んでいく
	 */
	killGrenade(mp: MainProgram, direction: Direction) {
		this.vy = -24;
		this.c1 = 0;
		this.muki = direction;
		this.vx = this.muki ? -4 : 4;
		switch (this.getBossNumber()) {
			case 1:
				this.c = BOSS1_DYING_BY_GRENADE;
				this.pt = this.muki ? PATTERN_BOSS1_RIGHT : PATTERN_BOSS1_LEFT;
				break;
			case 2:
				this.c = BOSS2_DYING_BY_GRENADE;
				this.pt = this.muki ? PATTERN_BOSS2_RIGHT : PATTERN_BOSS2_LEFT;
				break;
			case 3:
				this.c = BOSS3_DYING_BY_GRENADE;
				this.pt = this.muki ? PATTERN_BOSS3_RIGHT : PATTERN_BOSS3_LEFT;
				break;
		}
		mp.gs.rsAddSound(9);
	}

	/**
	 * ボスのHPを設定します
	 * @param {MainProgram} mp
	 * @param {number} hp 新しいHP
	 * @returns {boolean} 設定に成功したかどうか
	 * @see {@link MasaoJSS#setBossHP}
	 */
	setHP(mp: MainProgram, hp: number) {
		if (this.c < 100) return false;

		if (mp.boss_destroy_type === 2) {
			// ファイヤーボールとしっぽで倒すボスの場合、登場中はHPの設定ができない
			// ただし戻り値はtrueとなる
			// TODO: もともとあったバグかと思われるので修正してよいかも
			if (this.c === BOSS1_STANDBY || this.c === BOSS2_STANDBY || this.c === BOSS3_STANDBY) return true;
		} else {
			// 主人公がジャンプできないような特技を持たない場合はHPの設定ができない
			if (!(mp.j_tokugi === 10 || (mp.j_tokugi >= 12 && mp.j_tokugi <= 15))) return false;
		}

		// ボスのHPを設定する
		mp.boss_hp = hp;
		if (mp.boss_hp <= 0) {
			// 死亡
			mp.boss_hp = 0;
			this.killNormalAttack(mp);
		}

		if (mp.boss_destroy_type === 2) {
			// ボスのHPゲージの値を更新する
			this.showBossHPGauge(mp);
		}
		return true;
	}

	/**
	 * ボスの種類を返します
	 * 現在のボスの状態をもとに判定します
	 * 1: グラーダ
	 * 2: カイオール
	 * 3: センクウザ
	 * -1: 不明
	 * @returns {number}
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

	/**
	 * ボスのHPゲージを表示します
	 * ただしボスのHPはmp.boss_hpとmp.boss_hp_maxの値が参照されます
	 * @param {MainProgram} mp
	 */
	showBossHPGauge(mp: MainProgram) {
		const boss_number = this.getBossNumber();
		let param_name = "boss_name";
		if (boss_number === 2) param_name = "boss2_name";
		else if (boss_number === 3) param_name = "boss3_name";

		const boss_name = mp.tdb.getValue(param_name);
		const gauge_value = Math.floor((mp.boss_hp * 200) / mp.boss_hp_max);
		mp.showGauge(gauge_value, `${boss_name}  ${mp.boss_hp}/${mp.boss_hp_max}`);
	}

	/**
	 * this.ptの値をもとにボスの向きを取得します
	 * @returns {number} ボスの向き 0:左向き 1:右向き
	 */
	getBossDirectionFromPattern() {
		switch (this.pt) {
			case PATTERN_BOSS1_RIGHT:
			case PATTERN_BOSS1_DAMAGE_RIGHT:
			case PATTERN_BOSS2_RIGHT:
			case PATTERN_BOSS2_ROTATE_RIGHT:
			case PATTERN_BOSS2_DAMAGE_RIGHT:
			case PATTERN_BOSS3_RIGHT:
			case PATTERN_BOSS3_DAMAGE_RIGHT:
			case PATTERN_BOSS3_BARRIER_RIGHT:
			case PATTERN_BOSS3_ROTATE_RIGHT:
				return 1;
			default:
				return 0;
		}
	}
}

export { Boss };
