/*
 * フハハハハ！！　エネミーコントローラー！
 * ライフを1000払い　左 右 A B！
 * @namespace
 */
var EnemyController = {};

/**
 * 亀
 */
EnemyController.Turtle = {
    properties: {
        // 歩くスピード
        walk_speed: 3,
    },
    initFactory: function(enemyCode, properties) {
        return function(co) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;
            if(characterobject.c === 100) {
                // 歩いている亀（左向き）
                if(mp.ana_kazu > 0)
                {
                    var j21 = mp.anaCheckNormal(l20, i21);
                    if(j21 >= 0)
                    {
                        characterobject.c = 1300;
                        characterobject.x = mp.ana_x[j21] * 32;
                        return true;
                    }
                }
                var j44 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                if(j44 != 18 && j44 != 19)
                    j44 = 0;
                if(j44 == 0 && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9 || j44 > 0 && mp.getSakamichiY(l20 + 15, i21 + 31) > i21)
                {
                    i21 += 5;
                    if(mp.maps.getBGCode(l20 + 15, i21 + 32) >= 20)
                        i21 = rightShiftIgnoreSign(i21 + 32, 5) * 32 - 32;
                    if((mp.maps.getBGCode(l20 + 15, i21 + 31) == 18 || mp.maps.getBGCode(l20 + 15, i21 + 31) == 19) && mp.getSakamichiY(l20 + 15, i21 + 31) < i21)
                        i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                    characterobject.pt = 140;
                    characterobject.pth = 0;
                    if(mp.yuka_id_max >= 0)
                    {
                        var k = 0;
                        do
                        {
                            if(k > mp.yuka_id_max)
                                break;
                            var yo = mp.yo[k];
                            if(yo.con >= 300 && yo.con < 350)
                            {
                                var k21 = mp.getSCOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                                if(k21 >= 0 && k21 <= i21 && k21 + 31 >= i21)
                                {
                                    i21 = k21;
                                    characterobject.c = 104;
                                    characterobject.c2 = k;
                                    characterobject.vx = -1;
                                    break;
                                }
                            } else
                            if(yo.con >= 350 && yo.con < 400)
                            {
                                var l21 = mp.getSHCOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                                if(l21 >= 0 && l21 - 192 <= i21 && l21 + 31 + 192 >= i21)
                                {
                                    i21 = l21;
                                    characterobject.c = 104;
                                    characterobject.c2 = k;
                                    characterobject.vx = -1;
                                    break;
                                }
                            } else
                            if(yo.con >= 400 && yo.con < 450)
                            {
                                var i22 = mp.getSWUpOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                                if(i22 >= 0 && i22 <= i21 && i22 + 31 >= i21)
                                {
                                    i21 = i22;
                                    characterobject.c = 104;
                                    characterobject.c2 = k;
                                    characterobject.vx = -1;
                                    break;
                                }
                            } else
                            if(yo.con >= 450 && yo.con < 500)
                            {
                                var j22 = mp.getSWDownOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                                if(j22 >= 0 && j22 <= i21 && j22 + 31 >= i21)
                                {
                                    i21 = j22;
                                    characterobject.c = 104;
                                    characterobject.c2 = k;
                                    characterobject.vx = -1;
                                    break;
                                }
                            }
                            k++;
                        } while(true);
                    }
                } else
                {
                    if(rightShiftIgnoreSign(l20 + 15, 5) > rightShiftIgnoreSign((l20 + 15) - 3, 5))
                    {
                        if(j44 == 18)
                            i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32;
                        else
                        if(j44 == 19)
                            i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                        if(mp.maps.getBGCode((l20 + 15) - 3, i21 + 32) == 18)
                            i21++;
                    }
                    l20 -= properties.walk_speed;
                    var i37 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                    if(i37 == 18 || i37 == 19)
                        i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                    i37 = mp.maps.getBGCode(l20, i21);
                    if(i37 >= 20 || i37 == 15 || i37 == 18)
                    {
                        l20 = rightShiftIgnoreSign(l20, 5) * 32 + 32;
                        characterobject.c = 105;
                    }
                    if(j44 == 18)
                    {
                        if(rightShiftIgnoreSign(l20 + 15, 5) < rightShiftIgnoreSign(l20 + 15 + 3, 5) && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9)
                        {
                            l20 = (rightShiftIgnoreSign(l20, 5) * 32 + 32) - 15;
                            characterobject.c = 105;
                        }
                    } else
                    if(j44 == 19)
                    {
                        if(rightShiftIgnoreSign(l20 + 15, 5) < rightShiftIgnoreSign(l20 + 15 + 3, 5) && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9 && mp.maps.getBGCode(l20 + 15, i21 + 31) <= 9)
                        {
                            l20 = (rightShiftIgnoreSign(l20, 5) * 32 + 32) - 15;
                            i21++;
                            characterobject.c = 105;
                        }
                    } else
                    if(mp.maps.getBGCode(l20, i21 + 32) <= 9 && mp.maps.getBGCode(l20, i21 + 31) <= 9)
                    {
                        l20 = rightShiftIgnoreSign(l20, 5) * 32 + 32;
                        characterobject.c = 105;
                    }
                    characterobject.pt = 140 + mp.g_ac;
                    characterobject.pth = 0;
                }
                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if(characterobject.c === 104) {
                // 坂に乗っている亀
                // c2: 坂のID
                characterobject.pt = 140 + mp.g_ac;
                characterobject.pth = 0;

                var yo = mp.yo[characterobject.c2];
                if(yo.con >= 300 && yo.con < 350)
                {
                    var l28 = rounddown((yo.x2 * 80) / 100);
                    if(characterobject.vx < 0)
                    {
                        if((l20 -= properties.walk_speed) <= yo.x - l28 - 15)

                        {
                            l20 = yo.x - l28 - 15;
                            characterobject.vx = 1;
                        }
                    } else
                    {
                        characterobject.pth = 1;
                        if((l20 += properties.walk_speed) >= (yo.x + l28) - 15)
                        {
                            l20 = (yo.x + l28) - 15;
                            characterobject.vx = -1;
                        }
                    }
                    i21 = mp.getSCOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                } else
                if(yo.con >= 350 && yo.con < 400)
                {
                    if(characterobject.vx < 0)
                    {
                        if((l20 -= properties.walk_speed) <= (yo.x - 15) + 8)
                        {
                            l20 = (yo.x - 15) + 8;
                            characterobject.vx = 1;
                        }
                    } else
                    {
                        characterobject.pth = 1;
                        if((l20 += properties.walk_speed) >= (yo.x + 239) - 15 - 8)
                        {
                            l20 = (yo.x + 239) - 15 - 8;
                            characterobject.vx = -1;
                        }
                    }
                    i21 = mp.getSHCOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                } else
                if(yo.con >= 400 && yo.con < 450)
                {
                    if(characterobject.vx < 0)
                    {
                        if((l20 -= properties.walk_speed) <= (yo.x + 8) - 15)
                        {
                            l20 = (yo.x + 8) - 15;
                            characterobject.vx = 1;
                        }
                    } else
                    {
                        characterobject.pth = 1;
                        if((l20 += properties.walk_speed) >= (yo.x + 256) - 8 - 15)
                        {
                            l20 = (yo.x + 256) - 8 - 15;
                            characterobject.vx = -1;
                        }
                    }
                    i21 = mp.getSWUpOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                } else
                if(yo.con >= 450 && yo.con < 500)
                {
                    if(characterobject.vx < 0)
                    {
                        if((l20 -= properties.walk_speed) <= (yo.x + 8) - 15)
                        {
                            l20 = (yo.x + 8) - 15;
                            characterobject.vx = 1;
                        }
                    } else
                    {
                        characterobject.pth = 1;
                        if((l20 += properties.walk_speed) >= (yo.x + 256) - 8 - 15)
                        {
                            l20 = (yo.x + 256) - 8 - 15;
                            characterobject.vx = -1;
                        }
                    }
                    i21 = mp.getSWDownOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                }
                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if(characterobject.c === 105) {
                // 歩いている亀（右向き）
                if(mp.ana_kazu > 0)
                {
                    var k22 = mp.anaCheckNormal(l20, i21);
                    if(k22 >= 0)
                    {
                        characterobject.c = 1300;
                        characterobject.x = mp.ana_x[k22] * 32;
                        return true;
                    }
                }
                var k44 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                if(k44 != 18 && k44 != 19)
                    k44 = 0;
                if(rightShiftIgnoreSign(l20 + 15, 5) < rightShiftIgnoreSign(l20 + 15 + 3, 5))
                {
                    if(k44 == 19)
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32;
                    else
                    if(k44 == 18)
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                    if(mp.maps.getBGCode(l20 + 15 + 3, i21 + 32) == 19)
                        i21++;
                }
                l20 += properties.walk_speed;
                var j37 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                if(j37 == 18 || j37 == 19)
                    i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                j37 = mp.maps.getBGCode(l20 + 31, i21);
                if(j37 >= 20 || j37 == 15 || j37 == 19)
                {
                    l20 = rightShiftIgnoreSign(l20 + 31, 5) * 32 - 32;
                    characterobject.c = 100;
                }
                if(k44 == 19)
                {
                    if(rightShiftIgnoreSign(l20 + 15, 5) > rightShiftIgnoreSign((l20 + 15) - 3, 5) && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9)
                    {
                        l20 = rightShiftIgnoreSign(l20 + 15, 5) * 32 - 16;
                        characterobject.c = 100;
                    }
                } else
                if(k44 == 18)
                {
                    if(rightShiftIgnoreSign(l20 + 15, 5) > rightShiftIgnoreSign((l20 + 15) - 3, 5) && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9 && mp.maps.getBGCode(l20 + 15, i21 + 31) <= 9)
                    {
                        l20 = rightShiftIgnoreSign(l20 + 15, 5) * 32 - 16;
                        i21++;
                        characterobject.c = 100;
                    }
                } else
                if(mp.maps.getBGCode(l20 + 31, i21 + 32) <= 9 && mp.maps.getBGCode(l20 + 31, i21 + 31) <= 9)
                {
                    l20 = rightShiftIgnoreSign(l20 + 31, 5) * 32 - 32;
                    characterobject.c = 100;
                }
                characterobject.pt = 140 + mp.g_ac;
                characterobject.pth = 1;
                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            }
            return false;
        };
    },
};

/**
 * 落ちる亀
 */
EnemyController.TurtleFall = {
    properties: {
        // 歩くスピード
        walk_speed: 3,
        // 落ちるスピード
        fall_speed: 5,
    },
    initFactory: function(enemyCode, properties) {
        return function(co) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp, i) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;

            if (characterobject.c === 110) {
                // 落ちる亀（左向き）
                if(mp.ana_kazu > 0)
                {
                    var l22 = mp.anaCheckNormal(l20, i21);
                    if(l22 >= 0)
                    {
                        characterobject.c = 1300;
                        characterobject.x = mp.ana_x[l22] * 32;
                        return true;
                    }
                }
                var l44 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                if(l44 != 18 && l44 != 19)
                    l44 = 0;
                if(rightShiftIgnoreSign(l20 + 15, 5) > rightShiftIgnoreSign((l20 + 15) - 3, 5))
                {
                    if(l44 == 18)
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32;
                    else
                    if(l44 == 19)
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                    if(mp.maps.getBGCode((l20 + 15) - 3, i21 + 32) == 18)
                        i21++;
                }
                l20 -= properties.walk_speed;
                var k37 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                if(k37 == 18 || k37 == 19)
                    i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                if(l20 < 32)
                {
                    if(l20 <= 3)
                        characterobject.c = 0;
                } else
                {
                    var l37 = mp.maps.getBGCode(l20, i21);
                    if(l37 >= 20 || l37 == 15 || l37 == 18)
                    {
                        l20 = rightShiftIgnoreSign(l20, 5) * 32 + 32;
                        characterobject.c = 115;
                    }
                }
                if(i >= 120 && l20 < mp.maps.wx - 32)
                    characterobject.c = 0;
                if(l44 == 18)
                {
                    if(rightShiftIgnoreSign(l20 + 15, 5) < rightShiftIgnoreSign(l20 + 15 + 3, 5) && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9)
                        i21 = rightShiftIgnoreSign(i21 + 15, 5) * 32;
                } else
                if(l44 == 19)
                {
                    if(rightShiftIgnoreSign(l20 + 15, 5) < rightShiftIgnoreSign(l20 + 15 + 3, 5) && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9 && mp.maps.getBGCode(l20 + 15, i21 + 31) <= 9);
                } else
                if(mp.maps.getBGCode(l20 + 31, i21 + 32) <= 9 && mp.maps.getBGCode(l20 + 15, i21 + 31) != 18 && mp.maps.getBGCode(l20 + 15, i21 + 31) != 19 && mp.maps.getBGCode(l20 + 31, i21 + 31) != 18)
                {
                    l20 = rightShiftIgnoreSign(l20 + 31, 5) * 32;
                    characterobject.c = 120;
                }
                characterobject.pt = 140 + mp.g_ac;
                characterobject.pth = 0;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if(characterobject.c === 115) {
                // 落ちる亀（右向き）
                if(mp.ana_kazu > 0)
                {
                    var i23 = mp.anaCheckNormal(l20, i21);
                    if(i23 >= 0)
                    {
                        characterobject.c = 1300;
                        characterobject.x = mp.ana_x[i23] * 32;
                        return true;
                    }
                }
                var i45 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                if(i45 != 18 && i45 != 19)
                    i45 = 0;
                if(rightShiftIgnoreSign(l20 + 15, 5) < rightShiftIgnoreSign(l20 + 15 + 3, 5))
                {
                    if(i45 == 19)
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32;
                    else
                    if(i45 == 18)
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                    if(mp.maps.getBGCode(l20 + 15 + 3, i21 + 32) == 19)
                        i21++;
                }
                l20 += properties.walk_speed;
                var i38 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                if(i38 == 18 || i38 == 19)
                    i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                i38 = mp.maps.getBGCode(l20 + 31, i21);
                if(i38 >= 20 || i38 == 15 || i38 == 19)
                {
                    l20 = rightShiftIgnoreSign(l20 + 31, 5) * 32 - 32;
                    characterobject.c = 110;
                }
                if(i >= 120 && l20 > mp.maps.wx + 512)
                    characterobject.c = 0;
                if(i45 == 19)
                {
                    if(rightShiftIgnoreSign(l20 + 15, 5) > rightShiftIgnoreSign((l20 + 15) - 3, 5) && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9)
                        i21 = rightShiftIgnoreSign(i21 + 15, 5) * 32;
                } else
                if(i45 == 18)
                {
                    if(rightShiftIgnoreSign(l20 + 15, 5) > rightShiftIgnoreSign((l20 + 15) - 3, 5) && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9 && mp.maps.getBGCode(l20 + 15, i21 + 31) <= 9);
                } else
                if(mp.maps.getBGCode(l20, i21 + 32) <= 9 && mp.maps.getBGCode(l20 + 15, i21 + 31) != 18 && mp.maps.getBGCode(l20 + 15, i21 + 31) != 19 && mp.maps.getBGCode(l20, i21 + 31) != 19)
                {
                    l20 = rightShiftIgnoreSign(l20, 5) * 32;
                    characterobject.c = 125;
                }
                characterobject.pt = 140 + mp.g_ac;
                characterobject.pth = 1;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if(characterobject.c === 120) {
                // 落ちる亀（左・落下中）
                if(mp.ana_kazu > 0)
                {
                    var l = 0;
                    do
                    {
                        if(l > 11)
                            break;
                        if(mp.ana_c[l] > 0 && mp.ana_y[l] * 32 == i21 + 32 && Math.abs(mp.ana_x[l] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[l] * 32;
                            break;
                        }
                        l++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                i21 += properties.fall_speed;
                if(mp.maps.getBGCode(l20 + 15, i21 + 32) >= 20)
                {
                    i21 = rightShiftIgnoreSign(i21 + 32, 5) * 32 - 32;
                    characterobject.c = 110;
                }
                if((mp.maps.getBGCode(l20 + 15, i21 + 31) == 18 || mp.maps.getBGCode(l20 + 15, i21 + 31) == 19) && mp.getSakamichiY(l20 + 15, i21 + 31) < i21)
                {
                    i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                    characterobject.c = 110;
                }
                if(i21 >= mp.ochiru_y)
                    characterobject.c = 0;
                characterobject.pt = 140;
                characterobject.pth = 0;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if(characterobject.c === 125) {
                // 落ちる亀（右・落下中）
                if(mp.ana_kazu > 0)
                {
                    var i1 = 0;
                    do
                    {
                        if(i1 > 11)
                            break;
                        if(mp.ana_c[i1] > 0 && mp.ana_y[i1] * 32 == i21 + 32 && Math.abs(mp.ana_x[i1] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[i1] * 32;
                            break;
                        }
                        i1++;
                    } while(true);
                    if(characterobject.c == 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                i21 += properties.fall_speed;
                if(mp.maps.getBGCode(l20 + 15, i21 + 32) >= 20)
                {
                    i21 = rightShiftIgnoreSign(i21 + 32, 5) * 32 - 32;
                    characterobject.c = 115;
                }
                if((mp.maps.getBGCode(l20 + 15, i21 + 31) == 18 || mp.maps.getBGCode(l20 + 15, i21 + 31) == 19) && mp.getSakamichiY(l20 + 15, i21 + 31) < i21)
                {
                    i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                    characterobject.c = 115;
                }
                if(i21 >= mp.ochiru_y)
                    characterobject.c = 0;
                characterobject.pt = 140;
                characterobject.pth = 1;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            }
            return false;
        };
    },
};

/**
 * ピカチー
 */
EnemyController.Pikachie = {
    // 変更可能なパラメータ
    properties: {
        // ジャンプの初速
        jump_vy: -14,
        // 索敵範囲
        search_range: 240,
        // 攻撃から次の攻撃までのインターバルフレーム数
        interval: 30,
    },
    // 初期化関数を作る関数
    initFactory: function(enemyCode, properties) {
        return function(co) {
            // ピカチーの敵コード: 200〜203
            // コードによって攻撃の種類が異なる

            // 敵コードは200に統一
            co.c2 = 200;
            // 攻撃の種類をc3に入れておく
            co.c3 = enemyCode - 200;
        };
    },
    // コントローラ関数を作る関数
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            // ピカチーの挙動
            var l20 = characterobject.x;
            var i21 = characterobject.y;

            if (characterobject.c === 200) {
                // 立っているとき
                if(mp.ana_kazu > 0)
                {
                    var k1 = 0;
                    do
                    {
                        if(k1 > 11)
                            break;
                        if(mp.ana_c[k1] > 0 && mp.ana_y[k1] * 32 === characterobject.y + 32 && Math.abs(mp.ana_x[k1] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            characterobject.controller = undefined;
                            l20 = mp.ana_x[k1] * 32;
                            break;
                        }
                        k1++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        return;
                    }
                }
                if(characterobject.c1 <= 0)
                {
                    // 主人公が近づいたらジャンプに移行
                    if(mp.co_j.x >= l20 - properties.search_range && mp.co_j.x <= l20 + properties.search_range)
                    {
                        characterobject.c = 210;
                        characterobject.vy = properties.jump_vy;
                    }
                } else
                {
                    characterobject.c1--;
                }
                // パターン画像を固定
                characterobject.pt = 143;
                // 主人公の方を向く
                if(l20 + 8 >= mp.co_j.x)
                    characterobject.pth = 0;
                else
                    characterobject.pth = 1;
                return true;
            }
            else if(characterobject.c === 210) {
                // ジャンプ中
                if(mp.ana_kazu > 0 && characterobject.vy > 0)
                {
                    var l1 = 0;
                    do
                    {
                        if(l1 > 11)
                            break;
                        if(mp.ana_c[l1] > 0 && mp.ana_y[l1] * 32 <= i21 + 32 && mp.ana_y[l1] * 32 >= i21 + 16 && Math.abs(mp.ana_x[l1] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            characterobject.controller = undefined;
                            l20 = mp.ana_x[l1] * 32;
                            i21 = mp.ana_y[l1] * 32 - 32;
                            break;
                        }
                        l1++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        return;
                    }
                }
                // 重力を受ける
                characterobject.vy++;
                if(characterobject.vy > 14)
                    characterobject.vy = 14;
                // y座標を移動
                i21 += characterobject.vy;
                // ブロックに着地する処理
                if(mp.maps.getBGCode(l20 + 15, i21 + 31) >= 10)
                {
                    i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                    characterobject.c = 200;
                    characterobject.c1 = properties.interval;
                }
                // 床オブジェクトに着地する処理
                if(mp.yuka_id_max >= 0)
                {
                    for(var i2 = 0; i2 <= mp.yuka_id_max; i2++)
                    {
                        var yo = mp.yo[i2];
                        if(yo.con >= 300 && yo.con < 350)
                        {
                            var k23 = mp.getSCOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                            if(k23 >= 0 && k23 <= i21 && k23 + 31 >= i21)
                            {
                                i21 = k23;
                                characterobject.c = 200;
                                characterobject.c1 = properties.interval;
                            }
                            continue;
                        }
                        if(yo.con >= 350 && yo.con < 400)
                        {
                            var l23 = mp.getSHCOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                            if(l23 >= 0 && l23 <= i21 && l23 + 31 >= i21)
                            {
                                i21 = l23;
                                characterobject.c = 200;
                                characterobject.c1 = properties.interval;
                            }
                            continue;
                        }
                        if(yo.con >= 400 && yo.con < 450)
                        {
                            var i24 = mp.getSWUpOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                            if(i24 >= 0 && i24 <= i21 && i24 + 31 >= i21)
                            {
                                i21 = i24;
                                characterobject.c = 200;
                                characterobject.c1 = properties.interval;
                            }
                            continue;
                        }
                        if(yo.con < 450 || yo.con >= 500)
                            continue;
                        var j24 = mp.getSWDownOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                        if(j24 >= 0 && j24 <= i21 && j24 + 31 >= i21)
                        {
                            i21 = j24;
                            characterobject.c = 200;
                            characterobject.c1 = properties.interval;
                        }
                    }

                }
                // マップ外に落ちたときの処理
                if(i21 >= mp.ochiru_y) {
                    characterobject.c = 0;
                    characterobject.controller = undefined;
                }
                // 攻撃を放つ処理
                if(characterobject.vy === 0 && (Math.abs(mp.co_j.x - l20) > 32 || i21 <= mp.co_j.y) && i21 >= mp.maps.wy - 128 && i21 <= mp.maps.wy + 320 + 128)
                    if(characterobject.c3 === 1)
                    {
                        // 水平水鉄砲
                        if(l20 + 8 >= mp.co_j.x)
                        {
                            mp.mSet2(l20 - 16, rightShiftIgnoreSign(i21, 5) * 32, 732, -10, 0);
                            mp.gs.rsAddSound(15);
                        } else
                        {
                            mp.mSet2(l20 + 16, rightShiftIgnoreSign(i21, 5) * 32, 732, 10, 0);
                            mp.gs.rsAddSound(15);
                        }
                    } else
                    if(characterobject.c3 === 2)
                    {
                        // 電撃3発
                        if(l20 + 8 >= mp.co_j.x)
                        {
                            var d = 3.1400001049041748;
                            mp.mSet2(l20, rightShiftIgnoreSign(i21, 5) * 32, 733, Math.floor(Math.cos(d) * 9), Math.floor(Math.sin(d) * 9));
                            d = 3.6633334159851074;
                            mp.mSet2(l20, rightShiftIgnoreSign(i21, 5) * 32, 733, Math.floor(Math.cos(d) * 9), Math.floor(Math.sin(d) * 9));
                            d = 2.6166667938232422;
                            mp.mSet2(l20, rightShiftIgnoreSign(i21, 5) * 32, 733, Math.floor(Math.cos(d) * 9), Math.floor(Math.sin(d) * 9));
                            mp.gs.rsAddSound(10);
                        } else
                        {
                            var d1 = 0.0;
                            mp.mSet2(l20, rightShiftIgnoreSign(i21, 5) * 32, 733, Math.floor(Math.cos(d1) * 9), Math.floor(Math.sin(d1) * 9));
                            d1 = 5.7566671371459961;
                            mp.mSet2(l20, rightShiftIgnoreSign(i21, 5) * 32, 733, Math.floor(Math.cos(d1) * 9), Math.floor(Math.sin(d1) * 9));
                            d1 = 0.52333337068557739;
                            mp.mSet2(l20, rightShiftIgnoreSign(i21, 5) * 32, 733, Math.floor(Math.cos(d1) * 9), Math.floor(Math.sin(d1) * 9));
                            mp.gs.rsAddSound(10);
                        }
                    } else
                    if(characterobject.c3 === 3)
                    {
                        // プラズマ砲
                        if(l20 + 8 >= mp.co_j.x)
                        {
                            mp.mSet2(l20, rightShiftIgnoreSign(i21, 5) * 32, 810, -12, 0);
                            mp.gs.rsAddSound(22);
                        } else
                        {
                            mp.mSet2(l20, rightShiftIgnoreSign(i21, 5) * 32, 810, 12, 0);
                            mp.gs.rsAddSound(22);
                        }
                    } else
                    {
                        // 電撃
                        mp.mSet(l20, i21, 100);
                        mp.gs.rsAddSound(10);
                    }
                // 上昇と下降でパターン画像を切り替え
                if(characterobject.vy <= -1)
                    characterobject.pt = 144;
                else
                    characterobject.pt = 145;
                // 主人公の方を向く
                if(l20 + 8 >= mp.co_j.x)
                    characterobject.pth = 0;
                else
                    characterobject.pth = 1;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            }
            return false;
        };
    },
};

/**
 * チコリン（はっぱカッター）
 */
EnemyController.Chikorin = {
    properties: {
        // 行動1周の時間
        period: 86,
        // 葉っぱを飛ばすタイミングと音を出すタイミング
        attack_timing: {
            2: 2,
            10: 1,
            18: 1,
            26: 1,
        },
    },
    initFactory: function(enemyCode, properties) {
        return function(co) {
            // 敵コードは300に統一
            co.c2 = 300;
            // 攻撃の種類をc3に入れておく
            if (enemyCode === 301) {
                co.c3 = 1;
            }
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;

            if (characterobject.c === 300) {
                if(mp.ana_kazu > 0)
                {
                    var j2 = 0;
                    do
                    {
                        if(j2 > 11)
                            break;
                        if(mp.ana_c[j2] > 0 && mp.ana_y[j2] * 32 == i21 + 32 && Math.abs(this.ana_x[j2] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[j2] * 32;
                            break;
                        }
                        j2++;
                    } while(true);
                    if(characterobject.c == 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                if(characterobject.c1 > 0)
                {
                    // 行動中
                    characterobject.c1++;
                    var attack_value = properties.attack_timing[characterobject.c1];
                    if(attack_value)
                    {
                        // このフレームが攻撃フレームだったら
                        if(l20 + 8 >= mp.co_j.x)
                        {
                            if(characterobject.c3 === 1)
                                mp.mSet(l20, i21, 201);
                            else
                                mp.mSet(l20, i21, 200);
                        } else
                        if(characterobject.c3 === 1)
                            mp.mSet(l20, i21, 206);
                        else
                            mp.mSet(l20, i21, 205);
                        if(attack_value === 2 && Math.abs(i21 - mp.co_j.y) <= 288) {
                            // 効果音発生
                            mp.gs.rsAddSound(11);
                        }
                    } else
                    if(characterobject.c1 > properties.period) {
                        // 
                        characterobject.c1 = 0;
                    }
                } else
                if(mp.co_j.x >= l20 - 256 && mp.co_j.x <= l20 + 256) {
                    // 待機中に主人公が近づいたら行動中モードに移行
                    characterobject.c1 = 1;
                }
                characterobject.pt = 150;
                // 主人公の方を向く
                if(l20 + 8 >= mp.co_j.x)
                    characterobject.pth = 0;
                else
                    characterobject.pth = 1;

                return true;
            }
            return false;
        };
    },
};

/**
 * チコリン（ヒノララシ/マリリを投げる）
 */
EnemyController.ChikorinThrower = {
    properties: {
        // 投げる間隔
        interval: 40,
    },
    initFactory: function(enemyCode, properties) {
        return function(co) {
            co.c2 = 310;
            switch (enemyCode) {
                case 310:
                    // チコリン（ヒノララシを8匹投げる）
                    co.c3 = 8;
                    co.c4 = 0;
                    break;
                case 311:
                    // チコリン（ヒノララシを無限に投げる）
                    co.c3 = 999;
                    co.c4 = 0;
                    break;
                case 312:
                    // チコリン（マリリを8匹投げる）
                    co.c3 = 8;
                    co.c4 = 1;
                    break;
                case 313:
                    // チコリン（マリリを無限に投げる）
                    co.c3 = 999;
                    co.c4 = 1;
                    break;
            }
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;
            if (characterobject.c === 310) {
                if(mp.ana_kazu > 0)
                {
                    var k2 = 0;
                    do
                    {
                        if(k2 > 11)
                            break;
                        if(mp.ana_c[k2] > 0 && mp.ana_y[k2] * 32 == i21 + 32 && Math.abs(mp.ana_x[k2] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[k2] * 32;
                            break;
                        }
                        k2++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                if(characterobject.c1 <= 0)
                {
                    if(l20 >= mp.maps.wx && l20 <= (mp.maps.wx + 512) - 32 && i21 >= mp.maps.wy && i21 <= (mp.maps.wy + 320) - 32)
                    {
                        // 射程に入ったら行動開始
                        characterobject.c1 = 100;
                        mp.gs.rsAddSound(17);
                    }
                } else
                if(characterobject.c1 >= 100 && characterobject.c1 < 200)
                {
                    characterobject.c1++;
                    if(characterobject.c1 === 101)
                    {
                        // c4が1ならマリリ、0ならヒノララシを投げる
                        if(characterobject.c4 === 1)
                            mp.tSetBoss(l20, i21, 650, -3);
                        else
                            mp.tSetBoss(l20, i21, 450, -3);
                        if(characterobject.c3 < 999)
                            characterobject.c3--;
                        // 残弾が無くなったら停止状態へ移行
                        if(characterobject.c3 <= 0)
                            characterobject.c1 = 500;
                    } else
                    if(characterobject.c1 >= 100 + properties.interval)
                        characterobject.c1 = 100;
                    // 通り過ぎたら停止
                    if(l20 < mp.maps.wx)
                        characterobject.c1 = 500;
                }
                characterobject.pt = 150;
                characterobject.pth = 0;
            }
        };
    },
};


/**
 * 拡張可能なマップチップコードの一覧
 */
EnemyController.available = {
    // 亀（向きを変える）
    100: EnemyController.Turtle,
    // 亀（落ちる）
    110: EnemyController.TurtleFall,
    // ピカチー（電撃）
    200: EnemyController.Pikachie,
    // ピカチー（みずでっぽう 水平発射）
    201: EnemyController.Pikachie,
    // ピカチー（みずでっぽう 電撃3発）
    202: EnemyController.Pikachie,
    // ピカチー（みずでっぽう プラズマ砲）
    203: EnemyController.Pikachie,
    // チコリン（はっぱカッター）
    300: EnemyController.Chikorin,
    // チコリン（はっぱカッター　地形で消える）
    301: EnemyController.Chikorin,
    // チコリン（ヒノララシを8匹投げる）
    310: EnemyController.ChikorinThrower,
    // チコリン（ヒノララシを無限に投げる）
    311: EnemyController.ChikorinThrower,
    // チコリン（マリリを8匹投げる）
    312: EnemyController.ChikorinThrower,
    // チコリン（マリリを無限に投げる）
    313: EnemyController.ChikorinThrower,
};

