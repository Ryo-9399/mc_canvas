import { CharacterObject } from "../CharacterObject";

export const DYING = 40;
export const BOSS1_DAMAGE_LEFT = 60;
export const BOSS1_DAMAGE_RIGHT = 65;
export const BOSS1_STANDBY = 100;
export const BOSS1_ATTACK_LEFT = 110;
export const BOSS1_ATTACK_RIGHT = 115;
export const BOSS1_MOVING_LEFT = 150;
export const BOSS1_MOVING_RIGHT = 155;

class Boss extends CharacterObject {
	/*
	 * this.c: 状態
	 * this.c1: タイマー用カウンタ
	 * this.c2, c3: 未使用(？)
	 * this.c4: HP
	 */
	move(mp) {
		switch (this.c) {
			case DYING:
				// 死亡
				// 消えてからしばらくして人面星が出現する
				if (this.c1 < 20) this.c1++;
				// 人面星を配置する
				if (this.c1 === 15)
					mp.mSet(mp.maps.wx + 256, mp.maps.wy + 128, 2200);
				this.pt = 0;
				break;

			case BOSS1_DAMAGE_LEFT:
				// 踏まれた
				this.c1++;
				if (this.c4 <= 0) {
					// 死亡
					if (this.c1 >= 26) {
						this.c = DYING;
						this.c1 = 0;
						mp.addScore(10);
					}
				} else if (this.c1 >= 11) this.c = BOSS1_MOVING_LEFT;
				this.pt = 1010;
				break;

			case BOSS1_DAMAGE_RIGHT:
				// 右を向いている時に踏まれて死ぬことはない
				this.c1++;
				if (this.c1 >= 11) this.c = BOSS1_MOVING_RIGHT;
				this.pt = 1015;
				break;

			case 67:
				this.vy += 4;
				if (this.vy > 28) this.vy = 28;
				this.x += this.vx;
				this.y += this.vy;
				if (this.y >= mp.maps.wy + 320 + 16) {
					this.c = 40;
					this.c1 = 0;
					mp.addScore(10);
				}
				if (this.muki == 1) this.pt = 1005;
				else this.pt = 1000;
				break;

			case 70:
				this.c1++;
				if (this.c4 <= 0) {
					if (this.c1 >= 26) {
						this.c = 40;
						this.c1 = 0;
						mp.addScore(10);
					}
				} else if (this.c1 >= 11) this.c = 250;
				this.pt = 1110;
				break;

			case 75:
				this.c1++;
				if (this.c1 >= 11) this.c = 255;
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

			case 80:
				this.c1++;
				if (this.c4 <= 0) {
					if (this.c1 >= 26) {
						this.c = 40;
						this.c1 = 0;
						mp.addScore(10);
					}
				} else if (this.c1 >= 11) this.c = 350;
				this.pt = 1210;
				break;

			case 85:
				this.c1++;
				if (this.c1 >= 11) this.c = 355;
				this.pt = 1215;
				break;

			case 87:
				this.vy += 4;
				if (this.vy > 28) this.vy = 28;
				this.x += this.vx;
				this.y += this.vy;
				if (this.y >= mp.maps.wy + 320 + 16) {
					this.c = 40;
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
				if (this.x <= mp.sl_wx + 96) {
					this.x = mp.sl_wx + 96;
					this.c = BOSS1_ATTACK_RIGHT;
					this.c1 = 0;
				}
				this.pt = 1000;
				break;

			case BOSS1_MOVING_RIGHT:
				this.x += 14;
				if (this.x >= mp.sl_wx + 512 - 96 - 32) {
					this.x = mp.sl_wx + 512 - 96 - 32;
					this.c = BOSS1_ATTACK_LEFT;
					this.c1 = 0;
				}
				this.pt = 1005;
				break;

			case 200:
				if (mp.sl_step == 2 || mp.sl_step == 3) {
					this.c = 210;
					this.c1 = 0;
				}
				this.pt = 1100;
				break;

			case 210:
				this.boss2Attack(mp, 0);
				this.pt = 1100;
				break;

			case 215:
				this.boss2Attack(mp, 1);
				this.pt = 1105;
				break;

			case 250:
				this.x -= 14;
				if (this.x <= mp.sl_wx + 96) {
					this.x = mp.sl_wx + 96;
					this.c = 215;
					this.c1 = 0;
				}
				this.pt = 1100;
				break;

			case 255:
				this.x += 14;
				if (this.x >= mp.sl_wx + 512 - 96 - 32) {
					this.x = mp.sl_wx + 512 - 96 - 32;
					this.c = 210;
					this.c1 = 0;
				}
				this.pt = 1105;
				break;

			case 300:
				if (mp.sl_step == 2 || mp.sl_step == 3) {
					if (mp.boss3_type >= 2 && mp.boss3_type <= 4) {
						this.c = 360;
						this.vy = -24;
					} else {
						this.c = 310;
					}
					this.c1 = 0;
				}
				this.pt = 1200;
				break;

			case 310:
				this.c1++;
				if (this.c1 == 1) mp.mSet2(this.x, this.y, 800, -5, -32);
				else if (this.c1 == 15) {
					mp.mSet2(this.x, this.y, 800, -10, -32);
					if (mp.co_j.x > this.x - 64) this.c1 = 500;
				} else if (this.c1 == 29)
					mp.mSet2(this.x, this.y, 800, -15, -32);
				else if (this.c1 == 65)
					mp.mSet2(this.x - 2, this.y, 800, -20, -32);
				else if (this.c1 == 80) mp.mSet2(this.x, this.y, 800, -5, -32);
				else if (this.c1 == 105)
					mp.mSet2(this.x, this.y, 800, -15, -32);
				else if (this.c1 == 147)
					mp.mSet2(this.x, this.y, 800, -10, -32);
				else if (this.c1 == 237) this.c1 = 0;
				else if (this.c1 == 520) mp.mSet2(this.x, this.y, 800, 4, -32);
				else if (this.c1 == 530) {
					mp.mSet2(this.x, this.y, 800, -5, -32);
					this.c1 = 1;
				} else if (this.c1 > 530) this.c1 = 1;
				this.pt = 1200;
				break;

			case 315:
				this.c1++;
				if (this.c1 == 1) mp.mSet2(this.x, this.y, 800, 5, -32);
				else if (this.c1 == 15) {
					mp.mSet2(this.x, this.y, 800, 10, -32);
					if (mp.co_j.x < this.x + 64) this.c1 = 500;
				} else if (this.c1 == 29)
					mp.mSet2(this.x, this.y, 800, 15, -32);
				else if (this.c1 == 65)
					mp.mSet2(this.x + 2, this.y, 800, 20, -32);
				else if (this.c1 == 80) mp.mSet2(this.x, this.y, 800, 5, -32);
				else if (this.c1 == 105) mp.mSet2(this.x, this.y, 800, 15, -32);
				else if (this.c1 == 147) mp.mSet2(this.x, this.y, 800, 10, -32);
				else if (this.c1 == 237) this.c1 = 0;
				else if (this.c1 == 520) mp.mSet2(this.x, this.y, 800, -4, -32);
				else if (this.c1 == 530) {
					mp.mSet2(this.x, this.y, 800, 5, -32);
					this.c1 = 1;
				} else if (this.c1 > 530) this.c1 = 1;
				this.pt = 1205;
				break;

			case 350:
				this.x -= 14;
				if (this.x <= mp.sl_wx + 96) {
					this.x = mp.sl_wx + 96;
					if (mp.boss3_type >= 2 && mp.boss3_type <= 4) {
						this.c = 365;
						this.vy = -24;
					} else {
						this.c = 315;
					}
					this.c1 = 0;
				}
				this.pt = 1200;
				break;

			case 355:
				this.x += 14;
				if (this.x >= mp.sl_wx + 512 - 96 - 32) {
					this.x = mp.sl_wx + 512 - 96 - 32;
					if (mp.boss3_type >= 2 && mp.boss3_type <= 4) {
						this.c = 360;
						this.vy = -24;
					} else {
						this.c = 310;
					}
					this.c1 = 0;
				}
				this.pt = 1205;
				break;

			case 360:
				this.pt = 1200;
				if (this.c1 < 5) this.c1++;
				else if (this.c1 < 25) {
					this.c1++;
					this.pt = 1250;
				} else if (this.c1 == 25) {
					if (mp.boss3_type == 3) {
						this.x -= 18;
						if (this.x <= mp.sl_wx + 16) {
							this.x = mp.sl_wx + 16;
							this.c1 = 30;
						}
					} else if (mp.boss3_type == 4) {
						this.x -= 3;
						this.vy += 2;
						if (this.vy > 24) this.vy = 24;
						this.y += this.vy;
						if (this.y >= mp.boss_kijyun_y) {
							this.y = mp.boss_kijyun_y;
							this.vy = -24;
							if (this.x <= mp.sl_wx + 16) this.c1 = 30;
						}
					} else {
						this.x -= 12;
						if (this.x <= mp.sl_wx + 16) {
							this.x = mp.sl_wx + 16;
							this.c1 = 30;
						}
					}
					this.pt = 1250;
				} else if (this.c1 == 30) {
					if (mp.boss3_type == 3) {
						this.x += 18;
						if (this.x >= mp.sl_wx + 512 - 48) {
							this.x = mp.sl_wx + 512 - 48;
							this.c1 = 40;
						}
					} else if (mp.boss3_type == 4) {
						this.x += 4;
						this.vy += 2;
						if (this.vy > 24) this.vy = 24;
						this.y += this.vy;
						if (this.y >= mp.boss_kijyun_y) {
							this.y = mp.boss_kijyun_y;
							this.vy = -24;
							if (this.x >= mp.sl_wx + 512 - 48) this.c1 = 40;
						}
					} else {
						this.x += 8;
						if (this.x >= mp.sl_wx + 512 - 48) {
							this.x = mp.sl_wx + 512 - 48;
							this.c1 = 40;
						}
					}
					this.pt = 1255;
				} else if (this.c1 == 40) {
					this.x -= 2;
					if (this.x <= mp.sl_wx + 512 - 96 - 32) {
						this.x = mp.sl_wx + 512 - 96 - 32;
						this.c1 = -20;
					}
				}
				break;

			case 365:
				this.pt = 1205;
				if (this.c1 < 5) this.c1++;
				else if (this.c1 < 25) {
					this.c1++;
					this.pt = 1255;
				} else if (this.c1 == 25) {
					if (mp.boss3_type == 3) {
						this.x += 18;
						if (this.x >= mp.sl_wx + 512 - 48) {
							this.x = mp.sl_wx + 512 - 48;
							this.c1 = 30;
						}
					} else if (mp.boss3_type == 4) {
						this.x += 3;
						this.vy += 2;
						if (this.vy > 24) this.vy = 24;
						this.y += this.vy;
						if (this.y >= mp.boss_kijyun_y) {
							this.y = mp.boss_kijyun_y;
							this.vy = -24;
							if (this.x >= mp.sl_wx + 512 - 48) this.c1 = 30;
						}
					} else {
						this.x += 12;
						if (this.x >= mp.sl_wx + 512 - 48) {
							this.x = mp.sl_wx + 512 - 48;
							this.c1 = 30;
						}
					}
					this.pt = 1255;
				} else if (this.c1 == 30) {
					if (mp.boss3_type == 3) {
						this.x -= 18;
						if (this.x <= mp.sl_wx + 16) {
							this.x = mp.sl_wx + 16;
							this.c1 = 40;
						}
					} else if (mp.boss3_type == 4) {
						this.x -= 4;
						this.vy += 2;
						if (this.vy > 24) this.vy = 24;
						this.y += this.vy;
						if (this.y >= mp.boss_kijyun_y) {
							this.y = mp.boss_kijyun_y;
							this.vy = -24;
							if (this.x <= mp.sl_wx + 16) this.c1 = 40;
						}
					} else {
						this.x -= 8;
						if (this.x <= mp.sl_wx + 16) {
							this.x = mp.sl_wx + 16;
							this.c1 = 40;
						}
					}
					this.pt = 1250;
				} else if (this.c1 == 40) {
					this.x += 2;
					if (this.x >= mp.sl_wx + 96) {
						this.x = mp.sl_wx + 96;
						this.c1 = -20;
					}
				}
				break;
		}
	}

	/**
	 * boss1の攻撃中の動作
	 * @param {MainProgram} mp
	 * @param {number} direction default:0 ボスの向き 1なら左向き
	 */
	boss1Attack(mp, direction = 0) {
		// 左向きなら1 右向きなら-1
		const mirror = direction === 1 ? -1 : 1;
		// 長さが同じ配列をまとめる
		const zip = (a, b) => a.map((v, i) => [v, b[i]]);

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
			const attack_power = [
				-2,
				-4,
				-6,
				-8,
				-2,
				-2,
				-4,
				-6,
				-8,
				-2,
				-4,
				-2
			];
			for (const [count, power] of zip(attack_count, attack_power)) {
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
			const attack_power = [-5, -3, -2, -5, -3, -2, -3];
			for (const [count, power] of zip(attack_count, attack_power)) {
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
	 * @param {number} direction default:0 ボスの向き 1なら左向き
	 */
	boss2Attack(mp, direction = 0) {
		// 左向きなら1 右向きなら-1
		// NOTE: このボスでは使わない
		const mirror = direction === 1 ? -1 : 1;
		// 長さが同じ配列をまとめる
		const zip = (a, b) => a.map((v, i) => [v, b[i]]);

		this.c1++;
		if (mp.boss2_type == 2) {
			// バブル光線
			if (this.c1 == 10 || this.c1 == 85 || this.c1 == 215) {
				this.boss2BubbleBeam(mp, 0);
			} else if (this.c1 == 35 || this.c1 == 110 || this.c1 == 295) {
				this.boss2BubbleBeam(mp, 15);
			} else if (this.c1 == 60 || this.c1 == 135 || this.c1 == 375) {
				this.boss2BubbleBeam(mp, 30);
			}
			if (this.c1 > 445) this.c1 = 0;
		} else {
			// 水の波動
			if (
				this.c1 == 5 ||
				this.c1 == 35 ||
				this.c1 == 65 ||
				this.c1 == 110 ||
				this.c1 == 185
			) {
				mp.mSet(this.x, this.y, 90);
			}
			if (this.c1 > 185) this.c1 = 110;
		}
	}

	/**
	 * バブル光線
	 * @param {MainProgram} mp
	 * @param {number} direction ずらす角度(度数法)
	 */
	boss2BubbleBeam(mp, direction) {
		for (let i = 0; i < 8; i++) {
			// NOTE: 後方互換性のためMath.PI等ではなく3.14を用いてラジアンに変換する
			const d = ((i * 45 + direction) * 3.14) / 180;
			const cos = Math.floor(Math.cos(d) * 8);
			const sin = -Math.floor(Math.sin(d) * 8);
			mp.mSet2(this.x, this.y - 8, 710, cos, sin);
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
			this.c = 70;
			this.pt = 1110;
		} else {
			this.c = 80;
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
