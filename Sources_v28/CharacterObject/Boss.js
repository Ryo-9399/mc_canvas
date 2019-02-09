import { CharacterObject } from "../CharacterObject";

export const DYING = 40;
export const BOSS1_DAMAGE_LEFT = 60;
export const BOSS1_DAMAGE_RIGHT = 65;
export const BOSS1_STANDBY = 100;
export const BOSS1_ATTACK_LEFT = 110;
export const BOSS1_ATTACK_RIGHT = 115;
export const BOSS1_MOVING_LEFT = 150;
export const BOSS1_MOVING_RIGHT = 155;
export const BOSS2_DAMAGE_LEFT = 70;
export const BOSS2_DAMAGE_RIGHT = 75;
export const BOSS2_STANDBY = 200;
export const BOSS2_ATTACK_LEFT = 210;
export const BOSS2_ATTACK_RIGHT = 215;
export const BOSS2_MOVING_LEFT = 250;
export const BOSS2_MOVING_RIGHT = 255;
export const BOSS3_DAMAGE_LEFT = 80;
export const BOSS3_DAMAGE_RIGHT = 85;
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
	if (a.length !== b.length)
		throw new Error("The given arrays do not have the same length.");
	return a.map((v, i) => [v, b[i]]);
};

class Boss extends CharacterObject {
	/*
	 * this.c: 状態
	 * this.c1: タイマー用カウンタ
	 * this.c2: 第2カウンタ(一部で使用)
	 * this.c4: HP
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

			case 67:
				this.vy += 4;
				if (this.vy > 28) this.vy = 28;
				this.x += this.vx;
				this.y += this.vy;
				if (this.y >= mp.maps.wy + 320 + 16) {
					this.c = DYING;
					this.c1 = 0;
					mp.addScore(10);
				}
				if (this.muki == 1) this.pt = 1005;
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

			case 77:
				this.vy += 4;
				if (this.vy > 28) this.vy = 28;
				this.x += this.vx;
				this.y += this.vy;
				if (this.y >= mp.maps.wy + 320 + 16) {
					this.c = 40;
					this.c1 = 0;
					mp.addScore(10);
				}
				if (this.muki == 1) this.pt = 1105;
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

			case 87:
				this.vy += 4;
				if (this.vy > 28) this.vy = 28;
				this.x += this.vx;
				this.y += this.vy;
				if (this.y >= mp.maps.wy + 320 + 16) {
					this.c = DYING;
					this.c1 = 0;
					mp.addScore(10);
				}
				if (this.muki == 1) this.pt = 1205;
				else this.pt = 1200;
				break;

			case BOSS1_STANDBY:
				if (mp.sl_step == 2 || mp.sl_step == 3) {
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
				if (mp.sl_step == 2 || mp.sl_step == 3) {
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
				if (mp.sl_step == 2 || mp.sl_step == 3) {
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
				if (this.c1 <= 25) {
					this.pt = 1250;
				} else if (this.c1 === 30) {
					this.pt = 1255;
				} else {
					this.pt = 1200;
				}
				this.boss3TackleAttack(mp, 0);
				break;

			case BOSS3_TACKLE_ATTACK_RIGHT:
				if (this.c1 <= 25) {
					this.pt = 1255;
				} else if (this.c1 === 30) {
					this.pt = 1250;
				} else {
					this.pt = 1205;
				}
				this.boss3TackleAttack(mp, 1);
				break;
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
			const attack_count = [
				1,
				5,
				7,
				9,
				21,
				91,
				95,
				97,
				99,
				111,
				170,
				180
			];
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
				if (this.c1 % 7 === 0)
					mp.mSet2(
						this.x,
						this.y,
						500,
						(-15 + mp.ranInt(20)) * mirror,
						-30
					);
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
			if (
				this.c1 === 5 ||
				this.c1 === 35 ||
				this.c1 === 65 ||
				this.c1 === 110 ||
				this.c1 === 185
			) {
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

		if (this.c1 < 25) this.c1++;

		// 画面外判定に用いる座標
		const x_border_left = mp.sl_wx + 16;
		const x_border_right = mp.sl_wx + 16 + 512 - 64;
		// ボスが居座るX座標
		const x_standby_left = mp.sl_wx + 96;
		const x_standby_right = mp.sl_wx + 512 - 96 - 32;

		if (this.c1 === 25) {
			// 体当たり 行き
			if (mp.boss3_type === 4) {
				// ジャンプ移動
				this.x -= 3 * mirror;
				this.vy += 2;
				if (this.vy > 24) this.vy = 24;
				this.y += this.vy;
				if (this.y >= mp.boss_kijyun_y) {
					this.y = mp.boss_kijyun_y;
					this.vy = -24;
					// 画面外に出たら反転する
					if (
						(direction !== 1 && this.x <= x_border_left) ||
						(direction === 1 && this.x >= x_border_right)
					)
						this.c1 = 30;
				}
			} else {
				if (mp.boss3_type === 3) this.x -= 18 * mirror;
				else this.x -= 12 * mirror;
				// 画面外に出たら反転する
				if (direction !== 1 && this.x <= x_border_left) {
					this.x = x_border_left;
					this.c1 = 30;
				} else if (direction === 1 && this.x >= x_border_right) {
					this.x = x_border_right;
					this.c1 = 30;
				}
			}
		} else if (this.c1 === 30) {
			// 体当たり 帰り
			if (mp.boss3_type === 4) {
				// ジャンプ移動
				this.x += 4 * mirror;
				this.vy += 2;
				if (this.vy > 24) this.vy = 24;
				this.y += this.vy;
				if (this.y >= mp.boss_kijyun_y) {
					this.y = mp.boss_kijyun_y;
					this.vy = -24;
					// 画面外に出たら反転する
					if (
						(direction !== 1 && this.x >= x_border_right) ||
						(direction === 1 && this.x <= x_border_left)
					)
						this.c1 = 40;
				}
			} else {
				if (mp.boss3_type === 3) this.x += 18 * mirror;
				else this.x += 8 * mirror;
				if (direction !== 1 && this.x >= x_border_right) {
					this.x = x_border_right;
					this.c1 = 40;
				}
				if (direction === 1 && this.x <= x_border_left) {
					this.x = x_border_left;
					this.c1 = 40;
				}
			}
		} else if (this.c1 === 40) {
			// 元の位置に戻る
			this.x -= 2 * mirror;
			if (direction !== 1 && this.x <= x_standby_right) {
				this.x = x_standby_right;
				this.c1 = -20;
			}
			if (direction === 1 && this.x >= x_standby_left) {
				this.x = x_standby_left;
				this.c1 = -20;
			}
		}
	}

	/**
	 * 踏まれて潰れている最中のボスの処理
	 * @param {MainProgram} mp
	 * @param {number} direction ボスの向き 0:左向き 1:右向き
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
	 * 主人公とボスが接触しているかどうか判定します
	 * @param {CharacterObject} j 主人公
	 * @returns {boolean}
	 */
	checkHit(j) {
		return (
			j.c >= 100 &&
			j.c < 200 &&
			this.c >= 100 &&
			Math.abs(this.x - j.x) < 42 &&
			j.y > this.y - 20 &&
			j.y < this.y + 40
		);
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
	 * 主人公がボスを踏んでいるか判定します
	 * @param {MainProgram} mp
	 */
	checkFumu(mp) {
		const j = mp.co_j;
		return Math.abs(this.x - j.x) < 34 && j.vy > 0;
	}

	/**
	 * ボスが主人公に踏まれてダメージを受けたときの処理をします
	 * @param {MainProgram} mp
	 */
	fumuDamage(mp) {
		const j = mp.co_j;
		this.c4--;
		if (this.c < 200) {
			this.c = BOSS1_DAMAGE_LEFT;
			this.pt = 1010;
		} else if (this.c < 300) {
			this.c = BOSS2_DAMAGE_LEFT;
			this.pt = 1110;
		} else {
			this.c = BOSS3_DAMAGE_LEFT;
			this.pt = 1210;
		}
		if (this.c4 === 1) {
			// 右向き
			// TODO: やっぱり定数を直接代入する
			this.c += 5;
			this.pt += 5;
		}
		this.c1 = 0;

		// 主人公が敵を踏んだ状態にする
		j.y = this.y;
		j.vy = -320;
		mp.j_jump_type = 1;
		j.c = 110;
		j.c1 = -4;
		j.pt = 109;
	}
}

export { Boss };
