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
                if(j44 !== 18 && j44 !== 19)
                    j44 = 0;
                if(j44 === 0 && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9 || j44 > 0 && mp.getSakamichiY(l20 + 15, i21 + 31) > i21)
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
        return function(characterobject) {
            if (enemyCode === 150) {
                // 投げられたマリリ
                characterobject.vy = -28; 
				if(characterobject.vx <= 0)
					characterobject.muki = 0;
				else
					characterobject.muki = 1;
            }
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
            } else if (characterobject.c === 150) {
                // 投げられて飛んでいる亀
                if(mp.ana_kazu > 0)
                {
                    var j1 = 0;
                    do
                    {
                        if(j1 > 11)
                            break;
                        if(mp.ana_c[j1] > 0 && mp.ana_y[j1] * 32 == i21 + 32 && Math.abs(mp.ana_x[j1] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[j1] * 32;
                            break;
                        }
                        j1++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                if(characterobject.vx < 0 && (mp.maps.getBGCode(l20, i21) >= 15 || mp.maps.getBGCode(l20, i21 + 31) >= 15))
                {
                    l20 = rightShiftIgnoreSign(l20, 5) * 32 + 32;
                    characterobject.vx = 0;
                }
                if(characterobject.vx > 0 && (mp.maps.getBGCode(l20 + 31, i21) >= 15 || mp.maps.getBGCode(l20 + 31, i21 + 31) >= 15))
                {
                    l20 = rightShiftIgnoreSign(l20 + 31, 5) * 32 - 32;
                    characterobject.vx = 0;
                }
                l20 += characterobject.vx;
                characterobject.vy += 2;
                if(characterobject.vy > 18)
                    characterobject.vy = 18;
                i21 += characterobject.vy;
                var j23 = rightShiftIgnoreSign(i21 + 31, 5);
                var word0 = mp.maps.map_bg[rightShiftIgnoreSign(l20, 5)][j23];
                var word3 = mp.maps.map_bg[rightShiftIgnoreSign(l20 + 31, 5)][j23];
                if(word0 >= 15 || word3 >= 15)
                {
                    // 着地
                    i21 = j23 * 32 - 32;
                    if(characterobject.muki == 1)
                        characterobject.c = 115;
                    else
                        characterobject.c = 110;
                }
                if(i21 >= mp.ochiru_y)
                    characterobject.c = 0;
                characterobject.pt = 140;
                characterobject.pth = characterobject.muki;
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
                        if(mp.ana_c[j2] > 0 && mp.ana_y[j2] * 32 == i21 + 32 && Math.abs(mp.ana_x[j2] * 32 - l20) < 32)
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
 * チコリン（はっぱカッター 乱れ射ち）
 */
EnemyController.ChikorinMidareuchi = {
    properties: {
    },
    initFactory: function(enemyCode, properties) {
        return function(co) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            if (characterobject.c === 320) {
                var l20 = characterobject.x;
                var i21 = characterobject.y;

                if(mp.ana_kazu > 0)
                {
                    var l2 = 0;
                    do
                    {
                        if(l2 > 11)
                            break;
                        if(mp.ana_c[l2] > 0 && mp.ana_y[l2] * 32 == i21 + 32 && Math.abs(mp.ana_x[l2] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[l2] * 32;
                            break;
                        }
                        l2++;
                    } while(true);
                    if(characterobject.c == 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                if(characterobject.c1 <= 0)
                {
                    if(l20 >= mp.maps.wx - 16 && l20 <= (mp.maps.wx + 512) - 32 && i21 >= mp.maps.wy && i21 <= (mp.maps.wy + 320) - 32 && mp.co_j.x >= l20 - 288 && mp.co_j.x <= l20 + 192 && Math.abs(mp.co_j.x - l20) >= 88 && mp.co_j.y <= i21 + 128) {
                        // 発射方向を決定
                        if(mp.co_j.x <= l20 + 8)
                            characterobject.c1 = 100;
                        else
                            characterobject.c1 = 200;
                    }
                } else
                if(characterobject.c1 >= 100 && characterobject.c1 < 200)
                {
                    // 左向きに発射中
                    characterobject.c1++;
                    if(characterobject.c1 == 101)
                    {
                        var d2 = 4.7100000381469727;
                        mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d2) * 10), Math.floor(Math.sin(d2) * 10));
                        mp.gs.rsAddSound(11);
                    } else
                    if(characterobject.c1 == 105)
                    {
                        var d3 = 3.9249999523162842;
                        mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d3) * 10), Math.floor(Math.sin(d3) * 10));
                    } else
                    if(characterobject.c1 == 109)
                    {
                        var d4 = 3.1400001049041748;
                        mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d4) * 10), Math.floor(Math.sin(d4) * 10));
                    } else
                    if(characterobject.c1 == 113)
                    {
                        var d5 = 3.6633334159851074;
                        mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d5) * 10), Math.floor(Math.sin(d5) * 10));
                    } else
                    if(characterobject.c1 >= 121)
                    {
                        var d6 = 4.1866669654846191;
                        mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d6) * 10), Math.floor(Math.sin(d6) * 10));
                        characterobject.c1 = 300;
                    }
                } else
                if(characterobject.c1 >= 200 && characterobject.c1 < 300)
                {
                    // 右向きに発射中
                    characterobject.c1++;
                    if(characterobject.c1 == 201)
                    {
                        var d7 = 4.7100000381469727;
                        mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d7) * 10), Math.floor(Math.sin(d7) * 10));
                        mp.gs.rsAddSound(11);
                    } else
                    if(characterobject.c1 == 205)
                    {
                        var d8 = 5.4950003623962402;
                        mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d8) * 10), Math.floor(Math.sin(d8) * 10));
                    } else
                    if(characterobject.c1 == 209)
                    {
                        var d9 = 0.0;
                        mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d9) * 10), Math.floor(Math.sin(d9) * 10));
                    } else
                    if(characterobject.c1 == 213)
                    {
                        var d10 = 5.7566671371459961;
                        mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d10) * 10), Math.floor(Math.sin(d10) * 10));
                    } else
                    if(characterobject.c1 >= 221)
                    {
                        var d11 = 5.2333335876464844;
                        mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d11) * 10), Math.floor(Math.sin(d11) * 10));
                        characterobject.c1 = 300;
                    }
                } else
                {
                    characterobject.c1++;
                    if(characterobject.c1 > 350)
                        characterobject.c1 = 0;
                }
                characterobject.pt = 150;
                // 主人公の方を向く
                if(mp.co_j.x <= l20 + 8)
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
 * チコリン（ソーラービーム）
 */
EnemyController.ChikorinSolarBeam = {
    properties: {
        // ビームを撃ってから次に撃つまでの間隔
        interval: 120,
    },
    initFactory: function(enemyCode, properties) {
        return function(co) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;
            if (characterobject.c === 330) {
                // 左へ発射
                if(mp.ana_kazu > 0)
                {
                    var i3 = 0;
                    do
                    {
                        if(i3 > 11)
                            break;
                        if(mp.ana_c[i3] > 0 && mp.ana_y[i3] * 32 == i21 + 32 && Math.abs(mp.ana_x[i3] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[i3] * 32;
                            break;
                        }
                        i3++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                if(characterobject.c1 <= 0)
                {
                    if(l20 >= mp.maps.wx - 16 && l20 <= (mp.maps.wx + 512) - 32 && i21 >= mp.maps.wy && i21 <= (mp.maps.wy + 320) - 32 && mp.co_j.x >= l20 - 352 && mp.co_j.x <= l20 - 72 && Math.abs(mp.co_j.y - i21) < 32)
                    {
                        mp.mSet2(l20, i21, 75, i, 0);
                        mp.gs.rsAddSound(11);
                        characterobject.c1 = 300;
                    }
                } else
                {
                    characterobject.c1++;
                    if(characterobject.c1 > 300 + properties.interval)
                        characterobject.c1 = 0;
                }
                characterobject.pt = 150;
                characterobject.pth = 0;
                return true;
            } else if (characterobject.c === 335) {
                // 右へ発射
                if(mp.ana_kazu > 0)
                {
                    var j3 = 0;
                    do
                    {
                        if(j3 > 11)
                            break;
                        if(mp.ana_c[j3] > 0 && mp.ana_y[j3] * 32 == i21 + 32 && Math.abs(mp.ana_x[j3] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[j3] * 32;
                            break;
                        }
                        j3++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                if(characterobject.c1 <= 0)
                {
                    if(l20 >= mp.maps.wx - 16 - 144 && l20 <= (mp.maps.wx + 512) - 32 && i21 >= mp.maps.wy && i21 <= (mp.maps.wy + 320) - 32 && mp.co_j.x <= l20 + 352 && mp.co_j.x >= l20 + 72 && Math.abs(mp.co_j.y - i21) < 32)
                    {
                        mp.mSet2(l20, i21, 85, i, 0);
                        mp.gs.rsAddSound(11);
                        characterobject.c1 = 300;
                    }
                } else
                {
                    characterobject.c1++;
                    if(characterobject.c1 > 300 + properties.interval)
                        characterobject.c1 = 0;
                }
                characterobject.pt = 150;
                characterobject.pth = 1;
                return true;
            }
            return false;
        };
    },
};

/**
 * ヒノララシ
 */
EnemyController.Hinorarashi = {
    properties: {
        // 歩くスピード
        walk_speed: 4,
    },
    initFactory: function(enemyCode, properties) {
        return function(co) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;
            if (characterobject.c === 400) {
                // 歩く（左向き）
                if(mp.ana_kazu > 0)
                {
                    var k3 = 0;
                    do
                    {
                        if(k3 > 11)
                            break;
                        if(mp.ana_c[k3] > 0 && mp.ana_y[k3] * 32 == i21 + 32 && Math.abs(mp.ana_x[k3] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[k3] * 32;
                            break;
                        }
                        k3++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                if(mp.j_tokugi === 14)
                {
                    characterobject.c2++;
                    if(characterobject.c2 > 24)
                    {
                        characterobject.c2 = 0;
                        if(mp.co_j.y < i21 + 8)
                            mp.mSet(l20, i21, 150);
                    }
                }
                var j45 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                if(j45 !== 18 && j45 !== 19)
                    j45 = 0;
                if(j45 === 0 && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9 || j45 > 0 && mp.getSakamichiY(l20 + 15, i21 + 31) > i21)
                {
                    // 落下処理
                    i21 += 5;
                    if(mp.maps.getBGCode(l20 + 15, i21 + 32) >= 20) {
                        // 床に着地
                        i21 = rightShiftIgnoreSign(i21 + 32, 5) * 32 - 32;
                    }
                    if((mp.maps.getBGCode(l20 + 15, i21 + 31) === 18 || mp.maps.getBGCode(l20 + 15, i21 + 31) === 19) && mp.getSakamichiY(l20 + 15, i21 + 31) < i21) {
                        // 坂に着地
                        i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                    }
                    characterobject.pt = 152;
                    characterobject.pth = 0;
                    if(mp.yuka_id_max >= 0)
                    {
                        var l3 = 0;
                        do
                        {
                            if(l3 > mp.yuka_id_max)
                                break;
                            var yo = mp.yo[l3];
                            if(yo.con >= 300 && yo.con < 350)
                            {
                                var k24 = mp.getSCOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                                if(k24 >= 0 && k24 <= i21 && k24 + 31 >= i21)
                                {
                                    i21 = k24;
                                    characterobject.c = 404;
                                    characterobject.c2 = l3;
                                    characterobject.vx = -1;
                                    break;
                                }
                            } else
                            if(yo.con >= 350 && yo.con < 400)
                            {
                                var l24 = mp.getSHCOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                                if(l24 >= 0 && l24 - 192 <= i21 && l24 + 31 + 192 >= i21)
                                {
                                    i21 = l24;
                                    characterobject.c = 404;
                                    characterobject.c2 = l3;
                                    characterobject.vx = -1;
                                    break;
                                }
                            } else
                            if(yo.con >= 400 && yo.con < 450)
                            {
                                var i25 = mp.getSWUpOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                                if(i25 >= 0 && i25 <= i21 && i25 + 31 >= i21)
                                {
                                    i21 = i25;
                                    characterobject.c = 404;
                                    characterobject.c2 = l3;
                                    characterobject.vx = -1;
                                    break;
                                }
                            } else
                            if(yo.con >= 450 && yo.con < 500)
                            {
                                var j25 = mp.getSWDownOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                                if(j25 >= 0 && j25 <= i21 && j25 + 31 >= i21)
                                {
                                    i21 = j25;
                                    characterobject.c = 404;
                                    characterobject.c2 = l3;
                                    characterobject.vx = -1;
                                    break;
                                }
                            }
                            l3++;
                        } while(true);
                    }
                } else
                {
                    if(rightShiftIgnoreSign(l20 + 15, 5) > rightShiftIgnoreSign((l20 + 15) - properties.walk_speed, 5))
                    {
                        // 坂道を降りた時に地面にちょうど乗るようにy座標を調整
                        if(j45 === 18) {
                            i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32;
                        }
                        else if(j45 === 19) {
                            i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                        }
                        if(mp.maps.getBGCode((l20 + 15) - properties.walk_speed, i21 + 32) === 18) {
                            // 下り坂が連続していたときに降り続けるための処理？
                            i21++;
                        }
                    }
                    l20 -= properties.walk_speed;
                    var j38 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                    if(j38 === 18 || j38 === 19) {
                        // 坂道にさしかかったのでy座標を調整
                        i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                    }
                    j38 = mp.maps.getBGCode(l20, i21);
                    if(j38 >= 20 || j38 === 15 || j38 === 18)
                    {
                        // 壁に当たったので向きを変える
                        l20 = rightShiftIgnoreSign(l20, 5) * 32 + 32;
                        characterobject.c = 405;
                    }
                    // 足場が無いときに折り返す処理
                    if(j45 === 18)
                    {
                        if(rightShiftIgnoreSign(l20 + 15, 5) < rightShiftIgnoreSign(l20 + 15 + properties.walk_speed, 5) && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9)
                        {
                            l20 = (rightShiftIgnoreSign(l20, 5) * 32 + 32) - 15;
                            characterobject.c = 405;
                        }
                    } else
                    if(j45 === 19)
                    {
                        if(rightShiftIgnoreSign(l20 + 15, 5) < rightShiftIgnoreSign(l20 + 15 + properties.walk_speed, 5) && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9 && mp.maps.getBGCode(l20 + 15, i21 + 31) <= 9)
                        {
                            l20 = (rightShiftIgnoreSign(l20, 5) * 32 + 32) - 15;
                            i21++;
                            characterobject.c = 405;
                        }
                    } else
                    if(mp.maps.getBGCode(l20, i21 + 32) <= 9 && mp.maps.getBGCode(l20, i21 + 31) <= 9)
                    {
                        l20 = rightShiftIgnoreSign(l20, 5) * 32 + 32;
                        characterobject.c = 405;
                    }
                    characterobject.pt = 152 + mp.g_ac;
                    characterobject.pth = 0;
                }
                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if (characterobject.c === 404) {
                // 床に乗っている状態？
                characterobject.pt = 152 + mp.g_ac;
                characterobject.pth = 0;
                var yo = mp.yo[characterobject.c2];
                if(yo.con >= 300 && yo.con < 350)
                {
                    var i29 = rounddown((mp.yo[characterobject.c2].x2 * 80) / 100);
                    if(characterobject.vx < 0)
                    {
                        if((l20 -= properties.walk_speed) <= yo.x - i29 - 15)
                        {
                            l20 = yo.x - i29 - 15;
                            characterobject.vx = 1;
                        }
                    } else
                    {
                        characterobject.pth = 1;
                        if((l20 += properties.walk_speed) >= (yo.x + i29) - 15)
                        {
                            l20 = (yo.x + i29) - 15;
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
            } else if (characterobject.c === 405) {
                // 歩いている（右向き）
                if(mp.ana_kazu > 0)
                {
                    var i4 = 0;
                    do
                    {
                        if(i4 > 11)
                            break;
                        if(mp.ana_c[i4] > 0 && mp.ana_y[i4] * 32 == i21 + 32 && Math.abs(mp.ana_x[i4] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[i4] * 32;
                            break;
                        }
                        i4++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                if(mp.j_tokugi === 14)
                {
                    characterobject.c2++;
                    if(characterobject.c2 > 24)
                    {
                        characterobject.c2 = 0;
                        if(mp.co_j.y < i21 + 8)
                            mp.mSet(l20, i21, 150);
                    }
                }
                var k45 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                if(k45 !== 18 && k45 !== 19)
                    k45 = 0;
                if(rightShiftIgnoreSign(l20 + 15, 5) < rightShiftIgnoreSign(l20 + 15 + properties.walk_speed, 5))
                {
                    // 坂を降りたときのy座標の調整
                    if(k45 === 19)
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32;
                    else
                    if(k45 === 18)
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                    if(mp.maps.getBGCode(l20 + 15 + properties.walk_speed, i21 + 32) === 19)
                        i21++;
                }
                l20 += properties.walk_speed;
                var k38 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                if(k38 === 18 || k38 == 19)
                    i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                k38 = mp.maps.getBGCode(l20 + 31, i21);
                if(k38 >= 20 || k38 === 15 || k38 === 19)
                {
                    l20 = rightShiftIgnoreSign(l20 + 31, 5) * 32 - 32;
                    characterobject.c = 400;
                }
                if(k45 === 19)
                {
                    if(rightShiftIgnoreSign(l20 + 15, 5) > rightShiftIgnoreSign((l20 + 15) - properties.walk_speed, 5) && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9)
                    {
                        l20 = rightShiftIgnoreSign(l20 + 15, 5) * 32 - 16;
                        characterobject.c = 400;
                    }
                } else
                if(k45 === 18)
                {
                    if(rightShiftIgnoreSign(l20 + 15, 5) > rightShiftIgnoreSign((l20 + 15) - properties.walk_speed, 5) && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9 && mp.maps.getBGCode(l20 + 15, i21 + 31) <= 9)
                    {
                        l20 = rightShiftIgnoreSign(l20 + 15, 5) * 32 - 16;
                        i21++;
                        characterobject.c = 400;
                    }
                } else
                if(mp.maps.getBGCode(l20 + 31, i21 + 32) <= 9 && mp.maps.getBGCode(l20 + 31, i21 + 31) <= 9)
                {
                    l20 = rightShiftIgnoreSign(l20 + 31, 5) * 32 - 32;
                    characterobject.c = 400;
                }
                characterobject.pt = 152 + mp.g_ac;
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
 * ヒノララシ（落ちる）
 * ボス等に投げられたときに使用
 */
EnemyController.HinorarashiFall = {
    properties: {
        // 歩くスピード
        walk_speed: 4,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
            characterobject.vy = -22;
            if (characterobject.vx <= 0) {
                characterobject.muki = 0;
            } else {
                characterobject.muki = 1;
            }
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp, i) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;
            if (characterobject.c === 410) {
                // 歩く（左向き）
                if(mp.ana_kazu > 0)
                {
                    var j4 = 0;
                    do
                    {
                        if(j4 > 11)
                            break;
                        if(mp.ana_c[j4] > 0 && mp.ana_y[j4] * 32 === i21 + 32 && Math.abs(mp.ana_x[j4] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[j4] * 32;
                            break;
                        }
                        j4++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                var l45 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                if(l45 !== 18 && l45 !== 19)
                    l45 = 0;
                if(rightShiftIgnoreSign(l20 + 15, 5) > rightShiftIgnoreSign((l20 + 15) - properties.walk_speed, 5))
                {
                    if(l45 === 18)
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32;
                    else
                    if(l45 === 19)
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                    if(mp.maps.getBGCode((l20 + 15) - properties.walk_speed, i21 + 32) === 18)
                        i21++;
                }
                l20 -= properties.walk_speed;
                var l38 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                if(l38 === 18 || l38 === 19)
                    i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                if(l20 < 32)
                {
                    if(l20 <= 3)
                        characterobject.c = 0;
                } else
                {
                    var i39 = mp.maps.getBGCode(l20, i21);
                    if(i39 >= 20 || i39 === 15 || i39 === 18)
                    {
                        l20 = rightShiftIgnoreSign(l20, 5) * 32 + 32;
                        characterobject.c = 415;
                    }
                }
                if(i >= 120 && l20 < mp.maps.wx - 32)
                    characterobject.c = 0;
                if(l45 === 18)
                {
                    if(rightShiftIgnoreSign(l20 + 15, 5) < rightShiftIgnoreSign(l20 + 15 + properties.walk_speed, 5) && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9)
                        i21 = rightShiftIgnoreSign(i21 + 15, 5) * 32;
                } else
                if(l45 === 19)
                {
                    if(rightShiftIgnoreSign(l20 + 15, 5) < rightShiftIgnoreSign(l20 + 15 + properties.walk_speed, 5) && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9 && mp.maps.getBGCode(l20 + 15, i21 + 31) <= 9);
                } else
                if(mp.maps.getBGCode(l20 + 31, i21 + 32) <= 9 && mp.maps.getBGCode(l20 + 15, i21 + 31) !== 18 && mp.maps.getBGCode(l20 + 15, i21 + 31) !== 19 && mp.maps.getBGCode(l20 + 31, i21 + 31) !== 18)
                {
                    l20 = rightShiftIgnoreSign(l20 + 31, 5) * 32;
                    characterobject.c = 420;
                }
                characterobject.pt = 152 + mp.g_ac;
                characterobject.pth = 0;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if (characterobject.c === 415) {
                // 右に歩く
                if(mp.ana_kazu > 0)
                {
                    var k4 = 0;
                    do
                    {
                        if(k4 > 11)
                            break;
                        if(mp.ana_c[k4] > 0 && mp.ana_y[k4] * 32 === i21 + 32 && Math.abs(mp.ana_x[k4] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[k4] * 32;
                            break;
                        }
                        k4++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                var i46 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                if(i46 !== 18 && i46 !== 19)
                    i46 = 0;
                if(rightShiftIgnoreSign(l20 + 15, 5) < rightShiftIgnoreSign(l20 + 15 + properties.walk_speed, 5))
                {
                    if(i46 === 19)
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32;
                    else
                    if(i46 === 18)
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                    if(mp.maps.getBGCode(l20 + 15 + 4, i21 + 32) == 19)
                        i21++;
                }
                l20 += properties.walk_speed;
                var j39 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                if(j39 === 18 || j39 === 19)
                    i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                j39 = mp.maps.getBGCode(l20 + 31, i21);
                if(j39 >= 20 || j39 === 15 || j39 === 19)
                {
                    l20 = rightShiftIgnoreSign(l20 + 31, 5) * 32 - 32;
                    characterobject.c = 410;
                }
                if(i >= 120 && l20 > mp.maps.wx + 512)
                    characterobject.c = 0;
                if(i46 === 19)
                {
                    if(rightShiftIgnoreSign(l20 + 15, 5) > rightShiftIgnoreSign((l20 + 15) - properties.walk_speed, 5) && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9)
                        i21 = rightShiftIgnoreSign(i21 + 15, 5) * 32;
                } else
                if(i46 === 18)
                {
                    if(rightShiftIgnoreSign(l20 + 15, 5) > rightShiftIgnoreSign((l20 + 15) - properties.walk_speed, 5) && mp.maps.getBGCode(l20 + 15, i21 + 32) <= 9 && mp.maps.getBGCode(l20 + 15, i21 + 31) <= 9);
                } else
                if(mp.maps.getBGCode(l20, i21 + 32) <= 9 && mp.maps.getBGCode(l20 + 15, i21 + 31) !== 18 && mp.maps.getBGCode(l20 + 15, i21 + 31) !== 19 && mp.maps.getBGCode(l20, i21 + 31) !== 19)
                {
                    l20 = rightShiftIgnoreSign(l20, 5) * 32;
                    characterobject.c = 425;
                }
                characterobject.pt = 152 + mp.g_ac;
                characterobject.pth = 1;
                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if (characterobject.c === 420) {
                // 落下中（左向き）
                if(mp.ana_kazu > 0)
                {
                    var l4 = 0;
                    do
                    {
                        if(l4 > 11)
                            break;
                        if(mp.ana_c[l4] > 0 && mp.ana_y[l4] * 32 === i21 + 32 && Math.abs(mp.ana_x[l4] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[l4] * 32;
                            break;
                        }
                        l4++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                i21 += 5;
                if(mp.maps.getBGCode(l20 + 15, i21 + 32) >= 20)
                {
                    i21 = rightShiftIgnoreSign(i21 + 32, 5) * 32 - 32;
                    characterobject.c = 410;
                }
                if((mp.maps.getBGCode(l20 + 15, i21 + 31) === 18 || mp.maps.getBGCode(l20 + 15, i21 + 31) === 19) && mp.getSakamichiY(l20 + 15, i21 + 31) < i21)
                {
                    i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                    characterobject.c = 410;
                }
                if(i21 >= mp.ochiru_y)
                    characterobject.c = 0;
                characterobject.pt = 152;
                characterobject.pth = 0;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if (characterobject.c === 425) {
                // 落下中（右向き）
                if(mp.ana_kazu > 0)
                {
                    var i5 = 0;
                    do
                    {
                        if(i5 > 11)
                            break;
                        if(mp.ana_c[i5] > 0 && mp.ana_y[i5] * 32 === i21 + 32 && Math.abs(mp.ana_x[i5] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[i5] * 32;
                            break;
                        }
                        i5++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                i21 += 5;
                if(mp.maps.getBGCode(l20 + 15, i21 + 32) >= 20)
                {
                    i21 = rightShiftIgnoreSign(i21 + 32, 5) * 32 - 32;
                    characterobject.c = 415;
                }
                if((mp.maps.getBGCode(l20 + 15, i21 + 31) === 18 || mp.maps.getBGCode(l20 + 15, i21 + 31) === 19) && mp.getSakamichiY(l20 + 15, i21 + 31) < i21)
                {
                    i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                    characterobject.c = 415;
                }
                if(i21 >= mp.ochiru_y)
                    characterobject.c = 0;
                characterobject.pt = 152;
                characterobject.pth = 1;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if (characterobject.c === 450) {
                // 投げられて飛んでいる
                if(mp.ana_kazu > 0)
                {
                    var j5 = 0;
                    do
                    {
                        if(j5 > 11)
                            break;
                        if(mp.ana_c[j5] > 0 && mp.ana_y[j5] * 32 === i21 + 32 && Math.abs(mp.ana_x[j5] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[j5] * 32;
                            break;
                        }
                        j5++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                if(characterobject.vx < 0 && (mp.maps.getBGCode(l20, i21) >= 15 || mp.maps.getBGCode(l20, i21 + 31) >= 15))
                {
                    // 左の壁にぶつかる
                    l20 = rightShiftIgnoreSign(l20, 5) * 32 + 32;
                    characterobject.vx = 0;
                }
                if(characterobject.vx > 0 && (mp.maps.getBGCode(l20 + 31, i21) >= 15 || mp.maps.getBGCode(l20 + 31, i21 + 31) >= 15))
                {
                    // 右の壁にぶつかる
                    l20 = rightShiftIgnoreSign(l20 + 31, 5) * 32 - 32;
                    characterobject.vx = 0;
                }
                l20 += characterobject.vx;
                characterobject.vy += 2;
                if(characterobject.vy > 18)
                    characterobject.vy = 18;
                i21 += characterobject.vy;
                var k25 = rightShiftIgnoreSign(i21 + 31, 5);
                var word1 = mp.maps.map_bg[rightShiftIgnoreSign(l20, 5)][k25];
                var word4 = mp.maps.map_bg[rightShiftIgnoreSign(l20 + 31, 5)][k25];
                if(word1 >= 10 || word4 >= 10)
                {
                    // 着地
                    i21 = k25 * 32 - 32;
                    if(characterobject.muki === 1)
                        characterobject.c = 415;
                    else
                        characterobject.c = 410;
                }
                if(i21 >= mp.ochiru_y)
                    characterobject.c = 0;
                characterobject.pt = 152;
                characterobject.pth = characterobject.muki;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            }
            return false;
        };
    },
};

/**
 * ポッピー（上下移動）
 */
EnemyController.PoppieUpDown = {
    properties: {
        // 普段の飛行速度
        speed: 4,
        // 折り返し時の加速度
        accel: 1,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
            // 初期y座標
            var j = characterobject.y;

            // パラメータを初期化
            characterobject.y = j - 12;
            characterobject.c3 = j - 52;
            characterobject.c4 = j - 12;
            characterobject.vy = -4;
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            if (characterobject.c === 500) {
                var l20 = characterobject.x;
                var i21 = characterobject.y;

                if(i21 <= characterobject.c3)
                {
                    characterobject.vy += properties.accel;
                    if(characterobject.vy > properties.speed)
                        characterobject.vy = properties.speed;
                } else
                if(i21 >= characterobject.c4)
                {
                    characterobject.vy -= properties.accel;
                    if(characterobject.vy < -properties.speed)
                        characterobject.vy = -properties.speed;
                }
                i21 += characterobject.vy;
                characterobject.pt = 147 + mp.g_ac;
                if(mp.co_j.x <= l20 + 8 || mp.j_tokugi === 14)
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
 * ポッピー（左右移動）
 */
EnemyController.PoppieLeftRight = {
    properties: {
        // 左右移動の速度
        speed: 3,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;
            if (characterobject.c === 510) {
                // 左向き
                if((l20 -= properties.speed) < 48)
                {
                    // ステージから出て行ったので消滅
                    if(l20 <= 3)
                        characterobject.c = 0;
                } else
                if(mp.maps.getBGCode(l20 - 16, i21 + 31) >= 15)
                {
                    // 壁に当たったので跳ね返る
                    l20 = rightShiftIgnoreSign(l20 - 16, 5) * 32 + 32 + 16;
                    characterobject.c = 515;
                }
                characterobject.pt = 147 + mp.g_ac;
                characterobject.pth = 0;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if (characterobject.c === 515) {
                // 右向き
                l20 += properties.speed;
                if(mp.maps.getBGCode(l20 + 31 + 16, i21 + 31) >= 15)
                {
                    // 壁に当たったので跳ね返る
                    l20 = rightShiftIgnoreSign(l20 + 31 + 16, 5) * 32 - 32 - 16;
                    characterobject.c = 510;
                }
                characterobject.pt = 147 + mp.g_ac;
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
 * ポッピー（火の粉）
 */
EnemyController.PoppieFire = {
    properties: {
        // 発射の間隔
        interval: 40,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;
            if (characterobject.c === 520) {
                if(characterobject.c1 <= 0)
                {
                    if(l20 >= mp.maps.wx && l20 <= (mp.maps.wx + 512) - 32 && i21 >= mp.maps.wy && i21 <= (mp.maps.wy + 320) - 32 && mp.co_j.x >= l20 - 288 && mp.co_j.x <= l20 + 192 && Math.abs(mp.co_j.x - l20) >= 64 && Math.abs(mp.co_j.y - i21) <= 128) {
                        // 射程に入ったら行動開始
                        characterobject.c1 = 1;
                    }
                } else
                if(characterobject.c1 === 1)
                {
                    if(l20 + 8 >= mp.co_j.x)
                    {
                        mp.mSet(l20, i21, 300);
                        mp.gs.rsAddSound(14);
                    } else
                    {
                        mp.mSet(l20, i21, 305);
                        mp.gs.rsAddSound(14);
                    }
                    characterobject.c1 = 2;
                } else
                {
                    characterobject.c1++;
                    if(characterobject.c1 > properties.interval)
                        characterobject.c1 = 0;
                }
                characterobject.pt = 147 + mp.g_ac;
                if(mp.co_j.x <= l20 + 8 || mp.j_tokugi === 14)
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
 * ポッピー（火の粉 3連射）
 */
EnemyController.PoppieFire3 = {
    properties: {
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
            var j = characterobject.y;
            characterobject.c3 = j;
            characterobject.c4 = 0;
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;
            if (characterobject.c === 530) {
                if(characterobject.c4 <= 0)
                {
                    // 上昇中
                    if((i21 -= 2) <= characterobject.c3 - 64)
                    {
                        i21 = characterobject.c3 - 64;
                        characterobject.c4 = 10;
                        // 発射可能だったら発射態勢へ
                        if(l20 >= mp.maps.wx && l20 <= (mp.maps.wx + 512) - 32 && i21 >= mp.maps.wy && i21 <= (mp.maps.wy + 320) - 32 && mp.co_j.x >= l20 - 320 && mp.co_j.x <= l20 + 256 && Math.abs(mp.co_j.x - l20) >= 64 && Math.abs(mp.co_j.y - i21) <= 160)
                            characterobject.c4 = 20;
                    }
                } else
                if(characterobject.c4 === 10)
                {
                    // 下降中
                    if((i21 += 2) >= characterobject.c3)
                    {
                        i21 = characterobject.c3;
                        characterobject.c4 = 0;
                    }
                } else
                if(characterobject.c4 === 20)
                {
                    // 火の粉発射
                    if(Math.abs(mp.co_j.x - l20) > 32 || i21 <= mp.co_j.y)
                    {
                        if(i21 === characterobject.c3 - 64)
                            if(l20 + 8 >= mp.co_j.x)
                            {
                                mp.mSet(l20, i21, 300);
                                mp.gs.rsAddSound(14);
                            } else
                            {
                                mp.mSet(l20, i21, 305);
                                mp.gs.rsAddSound(14);
                            }
                        if(i21 === characterobject.c3 - 32)
                            if(l20 + 8 >= mp.co_j.x)
                                mp.mSet(l20, i21, 300);
                            else
                                mp.mSet(l20, i21, 305);
                    }
                    if((i21 += 2) >= characterobject.c3)
                    {
                        i21 = characterobject.c3;
                        characterobject.c4 = 0;
                        if(Math.abs(mp.co_j.x - l20) > 32 || i21 <= mp.co_j.y)
                            if(l20 + 8 >= mp.co_j.x)
                                mp.mSet(l20, i21, 300);
                            else
                                mp.mSet(l20, i21, 305);
                    }
                }
                characterobject.pt = 147 + mp.g_ac;
                if(mp.co_j.x <= l20 + 8 || mp.j_tokugi === 14)
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
 * ポッピー（バブル光線3発）
 */
EnemyController.PoppieBubble3 = {
    properties: {
        // 発射の間隔
        interval: 40,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;
            if (characterobject.c === 540) {
                if(characterobject.c1 <= 0)
                {
                    if(l20 >= mp.maps.wx && l20 <= (mp.maps.wx + 512) - 32 && i21 >= mp.maps.wy && i21 <= (mp.maps.wy + 320) - 32 && mp.co_j.x >= l20 - 288 && mp.co_j.x <= l20 + 192 && Math.abs(mp.co_j.x - l20) >= 64 && Math.abs(mp.co_j.y - i21) <= 128)
                        characterobject.c1 = 1;
                } else
                if(characterobject.c1 === 1)
                {
                    if(l20 + 8 >= mp.co_j.x)
                    {
                        var d12 = 3.1400001049041748;
                        mp.mSet2(l20, i21, 730, Math.floor(Math.cos(d12) * 9), Math.floor(Math.sin(d12) * 9));
                        d12 = 3.6633334159851074;
                        mp.mSet2(l20, i21, 730, Math.floor(Math.cos(d12) * 9), Math.floor(Math.sin(d12) * 9));
                        d12 = 2.6166667938232422;
                        mp.mSet2(l20, i21, 730, Math.floor(Math.cos(d12) * 9), Math.floor(Math.sin(d12) * 9));
                        mp.gs.rsAddSound(18);
                    } else
                    {
                        var d13 = 0.0;
                        mp.mSet2(l20, i21, 730, Math.floor(Math.cos(d13) * 9), Math.floor(Math.sin(d13) * 9));
                        d13 = 5.7566671371459961;
                        mp.mSet2(l20, i21, 730, Math.floor(Math.cos(d13) * 9), Math.floor(Math.sin(d13) * 9));
                        d13 = 0.52333337068557739;
                        mp.mSet2(l20, i21, 730, Math.floor(Math.cos(d13) * 9), Math.floor(Math.sin(d13) * 9));
                        mp.gs.rsAddSound(18);
                    }
                    characterobject.c1 = 2;
                } else
                {
                    characterobject.c1++;
                    if(characterobject.c1 > properties.interval)
                        characterobject.c1 = 0;
                }
                characterobject.pt = 147 + mp.g_ac;
                if(mp.co_j.x <= l20 + 8 || mp.j_tokugi === 14)
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
 * ポッピー（ハリケンブラスト）
 */
EnemyController.PoppieHurricaneBlast = {
    properties: {
        // 発射の間隔
        interval: 80,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;
            if (characterobject.c === 550) {
                if(characterobject.c1 <= 0)
                {
                    if(l20 >= mp.maps.wx && l20 <= (mp.maps.wx + 512) - 32 && i21 >= mp.maps.wy && i21 <= (mp.maps.wy + 320) - 32 && mp.co_j.x >= l20 - 228 && mp.co_j.x <= l20 + 192 && Math.abs(mp.co_j.x - l20) >= 64 && Math.abs(mp.co_j.y - i21) <= 128)
                        characterobject.c1 = 1;
                } else
                if(characterobject.c1 === 1)
                {
                    for(var k5 = 0; k5 <= 300; k5 += 90)
                    {
                        mp.mSet2(l20, i21, 950, k5, 0);
                        mp.mSet2(l20, i21, 960, 300 - k5, 0);
                        mp.gs.rsAddSound(18);
                    }

                    characterobject.c1 = 2;
                } else
                {
                    characterobject.c1++;
                    if(characterobject.c1 > properties.interval)
                        characterobject.c1 = 0;
                }
                characterobject.pt = 147 + mp.g_ac;
                if(mp.co_j.x <= l20 + 8 || mp.j_tokugi === 14)
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
 * マリリ
 */
EnemyController.Mariri = {
    properties: {
        // ジャンプの初速
        // null = 初期値
        jump_vy: null,
        // 横方向の移動速度
        speed: 5,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
            if (enemyCode === 650) {
                // 投げられたマリリ
				characterobject.vy = -28;
				if(characterobject.vx <= 0)
					characterobject.muki = 0;
				else
					characterobject.muki = 1;
            } else {
                // 敵コードを600に統一
                characterobject.c2 = 600;
                characterobject.c3 = 0;
                // 600 - 602
                characterobject.c4 = enemyCode - 600;
            }
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp, i) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;
            if (characterobject.c === 600) {
                if(i < 120 && characterobject.c4 === 2 && characterobject.c1 === 20)
                    // 左右にジャンプするマリリが方向転換
                {
                    characterobject.c = 605;
                    characterobject.c1++;
                }
                if(characterobject.c1 < 25)
                {
                    if(mp.ana_kazu > 0)
                    {
                        var l5 = 0;
                        do
                        {
                            if(l5 > 11)
                                break;
                            if(mp.ana_c[l5] > 0 && mp.ana_y[l5] * 32 == i21 + 32 && Math.abs(mp.ana_x[l5] * 32 - l20) < 32)
                            {
                                characterobject.c = 1300;
                                l20 = mp.ana_x[l5] * 32;
                                break;
                            }
                            l5++;
                        } while(true);
                        if(characterobject.c === 1300) {
                            characterobject.x = l20;
                            return true;
                        }
                    }
                    characterobject.c1++;
                    characterobject.vy = properties.jump_vy != null ? properties.jump_vy : -17;
                    characterobject.c3 = 0;
                    if(i < 120 && characterobject.c4 === 1 && properties.jump_vy == null) {
                        // その場でジャンプのマリリはジャンプ力が違う
                        characterobject.vy = -22;
                    }
                    var l25 = mp.maps.getBGCode(l20 + 15, i21 + 32);
                    if(l25 === 18 || l25 === 19) {
                        i21 = mp.getSakamichiY(l20 + 15, i21 + 32);
                    }
                    characterobject.pt = 154;
                    characterobject.pth = 0;
                    if(i < 120 && characterobject.c4 === 1) {
                        // その場でジャンプするマリリは主人公の方を向く
                        if(mp.co_j.x <= l20 + 8 || mp.j_tokugi === 14)
                            characterobject.pth = 0;
                        else
                            characterobject.pth = 1;
                    }
                } else
                {
                    if(mp.ana_kazu > 0 && characterobject.vy > 0)
                    {
                        var i6 = 0;
                        do
                        {
                            if(i6 > 11)
                                break;
                            if(mp.ana_c[i6] > 0 && mp.ana_y[i6] * 32 <= i21 + 32 && mp.ana_y[i6] * 32 >= i21 + 16 && Math.abs(mp.ana_x[i6] * 32 - l20) < 32)
                            {
                                characterobject.c = 1300;
                                l20 = mp.ana_x[i6] * 32;
                                i21 = mp.ana_y[i6] * 32 - 32;
                                break;
                            }
                            i6++;
                        } while(true);
                        if(characterobject.c === 1300) {
                            characterobject.x = l20;
                            characterobject.y = i21;
                            return true;
                        }
                    }
                    if(characterobject.c3 === 0)
                    {
                        characterobject.vy++;
                        characterobject.c3 = 1;
                    } else
                    {
                        characterobject.vy += 2;
                        characterobject.c3 = 0;
                    }
                    if(characterobject.vy > 17)
                        characterobject.vy = 17;
                    if(i >= 120 || characterobject.c4 !== 1) {
                        // その場でジャンプのマリリは進まない
                        l20 -= properties.speed;
                    }
                    var k32 = i21;
                    i21 += characterobject.vy;
                    if(characterobject.vy < 4)
                    {
                        characterobject.pt = 155;
                        characterobject.pth = 0;
                    } else
                    {
                        characterobject.pt = 156;
                        characterobject.pth = 0;
                    }
                    if(l20 < 32)
                    {
                        // ステージ外に出たら消える
                        if(l20 <= 3)
                            characterobject.c = 0;
                    } else
                    {
                        if(characterobject.vy < 0 && mp.maps.getBGCode(l20 + 15, i21 + 6) >= 18)
                        {
                            // 天井に頭をぶつけた
                            i21 = (rightShiftIgnoreSign(i21 + 6, 5) * 32 + 32) - 6;
                            characterobject.vy = 0;
                        }
                        var k39 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                        if(k39 >= 20 || k39 === 10 || k39 === 15)
                        {
                            // 地面に着地
                            i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                            characterobject.c1 = 15;
                            characterobject.pt = 154;
                            characterobject.pth = 0;
                        }
                        if(k39 === 18 || k39 === 19)
                        {
                            // 坂に着地
                            if(i21 >= mp.getSakamichiY(l20 + 15, i21 + 31))
                            {
                                i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                                characterobject.c1 = 15;
                                characterobject.pt = 154;
                                characterobject.pth = 0;
                            }
                        } else
                        if(rightShiftIgnoreSign(i21 + 31, 5) > rightShiftIgnoreSign(k32 + 31, 5))
                        {
                            // 坂道をすり抜けないための処理？
                            var l39 = mp.maps.getBGCode(l20 + 15, k32 + 31);
                            if(l39 === 18 || l39 === 19)
                            {
                                i21 = rightShiftIgnoreSign(k32 + 31, 5) * 32;
                                i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                                characterobject.c1 = 15;
                                characterobject.pt = 154;
                                characterobject.pth = 0;
                            }
                        }
                        if(mp.yuka_id_max >= 0)
                        {
                            for(var j6 = 0; j6 <= mp.yuka_id_max; j6++)
                            {
                                var yo = mp.yo[j6];
                                if(yo.con >= 300 && yo.con < 350)
                                {
                                    var i26 = mp.getSCOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                                    if(i26 >= 0 && i26 <= i21 && i26 + 31 >= i21)
                                    {
                                        i21 = i26;
                                        characterobject.c1 = 15;
                                        characterobject.pt = 154;
                                        characterobject.pth = 0;
                                    }
                                    continue;
                                }
                                if(yo.con >= 350 && yo.con < 400)
                                {
                                    var j26 = mp.getSHCOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                                    if(j26 >= 0 && j26 <= i21 && j26 + 31 >= i21)
                                    {
                                        i21 = j26;
                                        characterobject.c1 = 15;
                                        characterobject.pt = 154;
                                        characterobject.pth = 0;
                                    }
                                    continue;
                                }
                                if(yo.con >= 400 && yo.con < 450)
                                {
                                    var k26 = mp.getSWUpOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                                    if(k26 >= 0 && k26 <= i21 && k26 + 31 >= i21)
                                    {
                                        i21 = k26;
                                        characterobject.c1 = 15;
                                        characterobject.pt = 154;
                                        characterobject.pth = 0;
                                    }
                                    continue;
                                }
                                if(yo.con < 450 || yo.con >= 500)
                                    continue;
                                var l26 = mp.getSWDownOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                                if(l26 >= 0 && l26 <= i21 && l26 + 31 >= i21)
                                {
                                    i21 = l26;
                                    characterobject.c1 = 15;
                                    characterobject.pt = 154;
                                    characterobject.pth = 0;
                                }
                            }
                        }
                        if(mp.maps.getBGCode(l20 + 15, i21 + 31) != 18 && mp.maps.getBGCode(l20 + 15, i21 + 31) != 19 && (mp.maps.getBGCode(l20, i21 + 31) >= 20 || mp.maps.getBGCode(l20, i21 + 8) >= 20))
                        {
                            // 壁にあたって反転
                            l20 = rightShiftIgnoreSign(l20, 5) * 32 + 32;
                            characterobject.c = 605;
                        }
                        if(i >= 120 && l20 < mp.maps.wx - 32)
                            characterobject.c = 0;
                    }
                    if(i < 120 && characterobject.c4 === 1) {
                        // その場でジャンプするマリリは主人公の方を向く
                        if(mp.co_j.x <= l20 + 8 || mp.j_tokugi == 14)
                            characterobject.pth = 0;
                        else
                            characterobject.pth = 1;
                    }
                }
                if(i21 >= mp.ochiru_y)
                    characterobject.c = 0;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if (characterobject.c === 605) {
                if(i < 120 && characterobject.c4 === 2 && characterobject.c1 === 20)
                {
                    characterobject.c = 600;
                    characterobject.c1++;
                }
                if(characterobject.c1 < 25)
                {
                    if(mp.ana_kazu > 0)
                    {
                        var k6 = 0;
                        do
                        {
                            if(k6 > 11)
                                break;
                            if(mp.ana_c[k6] > 0 && mp.ana_y[k6] * 32 == i21 + 32 && Math.abs(mp.ana_x[k6] * 32 - l20) < 32)
                            {
                                characterobject.c = 1300;
                                l20 = mp.ana_x[k6] * 32;
                                break;
                            }
                            k6++;
                        } while(true);
                        if(characterobject.c === 1300) {
                            characterobject.x = l20;
                            return true;
                        }
                    }
                    characterobject.c1++;
                    characterobject.vy = properties.jump_vy != null ? properties.jump_vy : -17;
                    characterobject.c3 = 0;
                    characterobject.pt = 154;
                    characterobject.pth = 1;
                } else
                {
                    if(mp.ana_kazu > 0 && characterobject.vy > 0)
                    {
                        var l6 = 0;
                        do
                        {
                            if(l6 > 11)
                                break;
                            if(mp.ana_c[l6] > 0 && mp.ana_y[l6] * 32 <= i21 + 32 && mp.ana_y[l6] * 32 >= i21 + 16 && Math.abs(mp.ana_x[l6] * 32 - l20) < 32)
                            {
                                characterobject.c = 1300;
                                l20 = mp.ana_x[l6] * 32;
                                i21 = mp.ana_y[l6] * 32 - 32;
                                break;
                            }
                            l6++;
                        } while(true);
                        if(characterobject.c === 1300) {
                            characterobject.x = l20;
                            characterobject.y = i21;
                            return true;
                        }
                    }
                    if(characterobject.c3 === 0)
                    {
                        characterobject.vy++;
                        characterobject.c3 = 1;
                    } else
                    {
                        characterobject.vy += 2;
                        characterobject.c3 = 0;
                    }
                    if(characterobject.vy > 17)
                        characterobject.vy = 17;
                    l20 += properties.speed;
                    var l32 = i21;
                    i21 += characterobject.vy;
                    if(characterobject.vy < 4)
                    {
                        characterobject.pt = 155;
                        characterobject.pth = 1;
                    } else
                    {
                        characterobject.pt = 156;
                        characterobject.pth = 1;
                    }
                    if(characterobject.vy < 0 && mp.maps.getBGCode(l20 + 15, i21 + 6) >= 18)
                    {
                        i21 = (rightShiftIgnoreSign(i21 + 6, 5) * 32 + 32) - 6;
                        characterobject.vy = 0;
                    }
                    var i40 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                    if(i40 >= 20 || i40 === 10 || i40 === 15)
                    {
                        // 床に着地
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                        characterobject.c1 = 15;
                        characterobject.pt = 154;
                        characterobject.pth = 1;
                    }
                    if(i40 === 18 || i40 === 19)
                    {
                        if(i21 >= mp.getSakamichiY(l20 + 15, i21 + 31))
                        {
                            // 坂に着地
                            i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                            characterobject.c1 = 15;
                            characterobject.pt = 154;
                            characterobject.pth = 1;
                        }
                    } else
                    if(rightShiftIgnoreSign(i21 + 31, 5) > rightShiftIgnoreSign(l32 + 31, 5))
                    {
                        var j40 = mp.maps.getBGCode(l20 + 15, l32 + 31);
                        if(j40 === 18 || j40 === 19)
                        {
                            i21 = rightShiftIgnoreSign(l32 + 31, 5) * 32;
                            i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                            characterobject.c1 = 15;
                            characterobject.pt = 154;
                            characterobject.pth = 1;
                        }
                    }
                    if(mp.yuka_id_max >= 0)
                    {
                        for(var i7 = 0; i7 <= mp.yuka_id_max; i7++)
                        {
                            var yo = mp.yo[i7];
                            if(yo.con >= 300 && yo.con < 350)
                            {
                                var i27 = mp.getSCOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                                if(i27 >= 0 && i27 <= i21 && i27 + 31 >= i21)
                                {
                                    i21 = i27;
                                    characterobject.c1 = 15;
                                    characterobject.pt = 154;
                                    characterobject.pth = 1;
                                }
                                continue;
                            }
                            if(yo.con >= 350 && yo.con < 400)
                            {
                                var j27 = mp.getSHCOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                                if(j27 >= 0 && j27 <= i21 && j27 + 31 >= i21)
                                {
                                    i21 = j27;
                                    characterobject.c1 = 15;
                                    characterobject.pt = 154;
                                    characterobject.pth = 1;
                                }
                                continue;
                            }
                            if(yo.con >= 400 && yo.con < 450)
                            {
                                var k27 = mp.getSWUpOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                                if(k27 >= 0 && k27 <= i21 && k27 + 31 >= i21)
                                {
                                    i21 = k27;
                                    characterobject.c1 = 15;
                                    characterobject.pt = 154;
                                    characterobject.pth = 1;
                                }
                                continue;
                            }
                            if(yo.con < 450 || yo.con >= 500)
                                continue;
                            var l27 = mp.getSWDownOY(yo.x, yo.y, yo.x2, yo.y2, l20 + 15);
                            if(l27 >= 0 && l27 <= i21 && l27 + 31 >= i21)
                            {
                                i21 = l27;
                                characterobject.c1 = 15;
                                characterobject.pt = 154;
                                characterobject.pth = 1;
                            }
                        }
                    }
                    if(mp.maps.getBGCode(l20 + 15, i21 + 31) != 18 && mp.maps.getBGCode(l20 + 15, i21 + 31) != 19 && (mp.maps.getBGCode(l20 + 31, i21 + 31) >= 20 || mp.maps.getBGCode(l20 + 31, i21 + 8) >= 20))
                    {
                        // 壁にあたって反転
                        l20 = rightShiftIgnoreSign(l20 + 31, 5) * 32 - 32;
                        characterobject.c = 600;
                    }
                    if(i >= 120 && l20 > mp.maps.wx + 512)
                        characterobject.c = 0;
                }
                if(i21 >= mp.ochiru_y)
                    characterobject.c = 0;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if (characterobject.c === 650) {
                if(characterobject.vx < 0 && (mp.maps.getBGCode(l20, i21) >= 15 || mp.maps.getBGCode(l20, i21 + 31) >= 15))
                {
                    // 壁にあたって停止
                    l20 = rightShiftIgnoreSign(l20, 5) * 32 + 32;
                    characterobject.vx = 0;
                }
                if(characterobject.vx > 0 && (mp.maps.getBGCode(l20 + 31, i21) >= 15 || mp.maps.getBGCode(l20 + 31, i21 + 31) >= 15))
                {
                    // 壁にあたって停止
                    l20 = rightShiftIgnoreSign(l20 + 31, 5) * 32 - 32;
                    characterobject.vx = 0;
                }
                l20 += characterobject.vx;
                characterobject.vy += 2;
                if(characterobject.vy > 18)
                    characterobject.vy = 18;
                i21 += characterobject.vy;
                var i28 = rightShiftIgnoreSign(i21 + 31, 5);
                var word2 = mp.maps.map_bg[rightShiftIgnoreSign(l20, 5)][i28];
                var word5 = mp.maps.map_bg[rightShiftIgnoreSign(l20 + 31, 5)][i28];
                if(word2 >= 10 || word5 >= 10)
                {
                    // 着地したら通常のマリリに変化
                    i21 = i28 * 32 - 32;
                    if(characterobject.muki === 1)
                        characterobject.c = 605;
                    else
                        characterobject.c = 600;
                    characterobject.c1 = 15;
                }
                if(i21 >= mp.ochiru_y)
                    characterobject.c = 0;
                if(characterobject.vy < 4)
                    characterobject.pt = 155;
                else
                    characterobject.pt = 156;
                characterobject.pth = characterobject.muki;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            }
            return false;
        };
    },
};

/**
 * マリリ（左右移動）
 */
EnemyController.MaririLeftRight = {
    properties: {
        // 移動のスピード
        speed: 8,
        // 移動の距離
        distance: 128,
        // 移動間の間隔
        interval: 20,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
            characterobject.c3 = characterobject.x;
            characterobject.c4 = properties.interval >> 1;
        };
    },
    controllerFactory: function(properties) {
        // 待機フレームの半分
        var wait_half = properties.interval >> 1;
        // 右待機中フレーム
        var right_wait = properties.interval;
        // 左待機中フレーム
        var left_wait = properties.interval * 2 + 10;
        return function(characterobject, mp) {
            if (characterobject.c === 660) {
                if(characterobject.c4 < right_wait)
                {
                    // 待機中
                    characterobject.c4++;
                    characterobject.pt = 154;
                    characterobject.pth = 0;
                    if(characterobject.c4 < wait_half)
                        characterobject.pth = 1;
                } else
                if(characterobject.c4 === right_wait)
                {
                    // 左へ移動中
                    if((l20 -= properties.speed) <= characterobject.c3 - properties.distance)
                    {
                        l20 = characterobject.c3 - properties.distance;
                        characterobject.c4 += 10;
                    }
                    characterobject.pt = 155 + mp.g_ac;
                    characterobject.pth = 0;
                } else
                if(characterobject.c4 < left_wait)
                {
                    // 左で待機中
                    characterobject.c4++;
                    characterobject.pt = 154;
                    characterobject.pth = 1;
                    if(characterobject.c4 < left_wait - wait_half)
                        characterobject.pth = 0;
                } else
                if(characterobject.c4 === left_wait)
                {
                    if((l20 += properties.speed) >= characterobject.c3)
                    {
                        l20 = characterobject.c3;
                        characterobject.c4 = 0;
                    }
                    characterobject.pt = 155 + mp.g_ac;
                    characterobject.pth = 1;
                }

                characterobject.x = l20;
                return true;
            }
            return false;
        };
    },
};

/**
 * マリリ（体当たり）
 */
EnemyController.MaririTackle = {
    properties: {
        // 体当たりのスピード
        attack_speed: 10,
        // 定位置に戻るときのスピード
        return_speed: 4,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
            characterobject.c3 = characterobject.x;
            characterobject.c4 = 0;
        };
    },
    controllerFactory: function(properties) {
        // TODO
        // 待機フレームの半分
        var wait_half = properties.interval >> 1;
        // 右待機中フレーム
        var right_wait = properties.interval;
        // 左待機中フレーム
        var left_wait = properties.interval * 2 + 10;
        return function(characterobject, mp) {
            if (characterobject.c === 670) {
                if(characterobject.c4 < 10)
                {
                    // 待機中
                    characterobject.c4++;
                    characterobject.pt = 154;
                    if(l20 + 8 >= mp.co_j.x)
                        characterobject.pth = 0;
                    else
                        characterobject.pth = 1;
                } else
                if(characterobject.c4 === 10)
                {
                    // 体当たり準備OK
                    if(l20 - 128 - 16 <= mp.co_j.x && l20 - 48 >= mp.co_j.x && Math.abs(i21 - mp.co_j.y) <= 10)
                        characterobject.c4 = 100;
                    if(l20 + 128 + 16 >= mp.co_j.x && l20 + 48 <= mp.co_j.x && Math.abs(i21 - mp.co_j.y) <= 10)
                        characterobject.c4 = 200;
                    characterobject.pt = 154;
                    if(l20 + 8 >= mp.co_j.x)
                        characterobject.pth = 0;
                    else
                        characterobject.pth = 1;
                } else
                if(characterobject.c4 === 100)
                {
                    // 左に体当たり中
                    if((l20 -= properties.attack_speed) <= characterobject.c3 - 160)
                    {
                        l20 = characterobject.c3 - 160;
                        characterobject.c4 = 150;
                    }
                    characterobject.pt = 155 + mp.g_ac;
                    characterobject.pth = 0;
                } else
                if(characterobject.c4 === 150)
                {
                    // 左に体当たりから戻る
                    if((l20 += properties.return_speed) >= characterobject.c3)
                    {
                        l20 = characterobject.c3;
                        characterobject.c4 = 0;
                    }
                    characterobject.pt = 155 + mp.g_ac;
                    characterobject.pth = 1;
                } else
                if(characterobject.c4 === 200)
                {
                    // 右に体当たり
                    if((l20 += properties.attack_speed) >= characterobject.c3 + 160)
                    {
                        l20 = characterobject.c3 + 160;
                        characterobject.c4 = 250;
                    }
                    characterobject.pt = 155 + mp.g_ac;
                    characterobject.pth = 1;
                } else
                if(characterobject.c4 === 250)
                {
                    // 右に体当たりから戻る
                    if((l20 -= properties.return_speed) <= characterobject.c3)
                    {
                        l20 = characterobject.c3;
                        characterobject.c4 = 0;
                    }
                    characterobject.pt = 155 + mp.g_ac;
                    characterobject.pth = 0;
                }

                characterobject.x = l20;
                return true;
            }
            return false;
        };
    },
};

/**
 * ヤチャモ
 */
EnemyController.Yachamo = {
    properties: {
        // 攻撃の間隔
        // null = 初期値
        interval: null,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
            // 敵コードを700に統一
            characterobject.c2 = 700;
            // 攻撃方法を覚えておく
            characterobject.c3 = enemyCode - 700;
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            if (characterobject.c === 700) {
                var l20 = characterobject.x;
                var i21 = characterobject.y;
                if(mp.ana_kazu > 0)
                {
                    var j7 = 0;
                    do
                    {
                        if(j7 > 11)
                            break;
                        if(mp.ana_c[j7] > 0 && mp.ana_y[j7] * 32 == i21 + 32 && Math.abs(mp.ana_x[j7] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[j7] * 32;
                            break;
                        }
                        j7++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                if(characterobject.c3 !== 1)
                    if(characterobject.c1 > 0)
                    {
                        // 攻撃状態
                        characterobject.c1++;
                        if(characterobject.c1 === 2)
                        {
                            if(characterobject.c3 === 2)
                            {
                                // グレネード
                                if(Math.abs(mp.co_j.x - l20) > 32 || i21 <= mp.co_j.y)
                                    if(l20 + 8 >= mp.co_j.x)
                                    {
                                        mp.mSet2(l20, i21, 800, -10, -32);
                                        mp.gs.rsAddSound(22);
                                    } else
                                    {
                                        mp.mSet2(l20, i21, 800, 10, -32);
                                        mp.gs.rsAddSound(22);
                                    }
                            } else
                            if(characterobject.c3 === 3)
                            {
                                // はっぱカッター3発
                                if(Math.abs(mp.co_j.x - l20) > 32 || i21 <= mp.co_j.y)
                                    if(l20 + 8 >= mp.co_j.x)
                                    {
                                        var d14 = 3.1400001049041748;
                                        mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d14) * 9), Math.floor(Math.sin(d14) * 9));
                                        d14 = 3.6633334159851074;
                                        mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d14) * 9), Math.floor(Math.sin(d14) * 9));
                                        d14 = 4.1866669654846191;
                                        mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d14) * 9), Math.floor(Math.sin(d14) * 9));
                                        mp.gs.rsAddSound(11);
                                    } else
                                    {
                                        var d15 = 0.0;
                                        mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d15) * 9), Math.floor(Math.sin(d15) * 9));
                                        d15 = 5.7566671371459961;
                                        mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d15) * 9), Math.floor(Math.sin(d15) * 9));
                                        d15 = 5.2333335876464844;
                                        mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d15) * 9), Math.floor(Math.sin(d15) * 9));
                                        mp.gs.rsAddSound(11);
                                    }
                            } else
                            if(characterobject.c3 === 4)
                            {
                                // プラズマ砲
                                if(Math.abs(mp.co_j.x - l20) > 32 || i21 <= mp.co_j.y)
                                    if(l20 + 8 >= mp.co_j.x)
                                    {
                                        mp.mSet2(l20, i21, 810, -12, 0);
                                        mp.gs.rsAddSound(22);
                                    } else
                                    {
                                        mp.mSet2(l20, i21, 810, 12, 0);
                                        mp.gs.rsAddSound(22);
                                    }
                            } else
                            if(l20 + 8 >= mp.co_j.x)
                            {
                                // 火の粉（左）
                                mp.mSet(l20, i21, 300);
                                if(Math.abs(i21 - mp.co_j.y) <= 288)
                                    mp.gs.rsAddSound(14);
                            } else
                            {
                                // 火の粉（右）
                                mp.mSet(l20, i21, 305);
                                if(Math.abs(i21 - mp.co_j.y) <= 288)
                                    mp.gs.rsAddSound(14);
                            }
                        } else
                        {
                            // 火の粉とプラズマ砲のデフォルトインターバル値は40
                            // グレネードとはっぱカッター3連は52
                            var interval =
                                properties.interval == null ?
                                (characterobject.c3 !== 2 && characterobject.c3 !== 3 ? 40 : 52) :
                                properties.interval;
                            if(characterobject.c1 > interval)
                                characterobject.c1 = 0;
                        }
                    } else
                    if(l20 >= mp.maps.wx && l20 <= (mp.maps.wx + 512) - 32 && mp.co_j.x >= l20 - 256 && mp.co_j.x <= l20 + 192 && Math.abs(mp.co_j.x - l20) >= 96)
                    {
                        // 射程圏内に入ったら動く
                        characterobject.c1 = 1;
                    }
                characterobject.pt = 158;
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
 * ヤチャモ（速射）
 */
EnemyController.YachamoFast = {
    properties: {
        // 攻撃の間隔
        interval: 35,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
            // 敵コードを710に統一
            characterobject.c2 = 710;
            // 攻撃方法を覚えておく
            characterobject.c3 = enemyCode - 710;
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            if (characterobject.c === 710) {
                var l20 = characterobject.x;
                var i21 = characterobject.y;

                if(mp.ana_kazu > 0)
                {
                    var k7 = 0;
                    do
                    {
                        if(k7 > 11)
                            break;
                        if(mp.ana_c[k7] > 0 && mp.ana_y[k7] * 32 == i21 + 32 && Math.abs(mp.ana_x[k7] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[k7] * 32;
                            break;
                        }
                        k7++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                if(characterobject.c1 <= 0)
                {
                    // 射程に入ったら行動開始
                    if(l20 >= mp.maps.wx && l20 <= (mp.maps.wx + 512) - 32 && i21 >= mp.maps.wy && i21 <= (mp.maps.wy + 320) - 32 && mp.co_j.x >= l20 - 320 && mp.co_j.x <= l20 + 192 && Math.abs(mp.co_j.x - l20) >= 64 && Math.abs(mp.co_j.y - i21) <= 128)
                        if(characterobject.c3 === 0)
                            characterobject.c1 = 1;
                        else
                            characterobject.c1 = 100;
                } else
                if(characterobject.c1 === 1)
                {
                    // 速射
                    if(l20 + 8 >= mp.co_j.x)
                    {
                        mp.mSet(l20, i21, 300);
                        mp.gs.rsAddSound(14);
                    } else
                    {
                        mp.mSet(l20, i21, 305);
                        mp.gs.rsAddSound(14);
                    }
                    characterobject.c1 = 300;
                } else
                if(characterobject.c1 >= 100 && characterobject.c1 < 200)
                {
                    // 3連射
                    characterobject.c1++;
                    if(characterobject.c1 === 101)
                        mp.gs.rsAddSound(14);
                    if(Math.abs(mp.co_j.x - l20) >= 48 && (characterobject.c1 == 101 || characterobject.c1 == 109 || characterobject.c1 == 117))
                        if(l20 + 8 >= mp.co_j.x)
                            mp.mSet(l20, i21, 300);
                        else
                            mp.mSet(l20, i21, 305);
                    if(characterobject.c1 >= 125)
                        characterobject.c1 = 300;
                } else
                {
                    // 300〜：待機中
                    characterobject.c1++;
                    if(characterobject.c1 > 300 + properties.interval)
                        characterobject.c1 = 0;
                }
                characterobject.pt = 158;
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
 * ヤチャモ（破壊光線）
 */
EnemyController.YachamoHyperBeam = {
    properties: {
        // 攻撃の間隔
        interval: 80,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;

            if (characterobject.c === 720) {
                // 左向き

                if(mp.ana_kazu > 0)
                {
                    var l7 = 0;
                    do
                    {
                        if(l7 > 11)
                            break;
                        if(mp.ana_c[l7] > 0 && mp.ana_y[l7] * 32 == i21 + 32 && Math.abs(mp.ana_x[l7] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[l7] * 32;
                            break;
                        }
                        l7++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                if(characterobject.c1 <= 0)
                {
                    if(l20 >= mp.maps.wx - 16 && l20 <= (mp.maps.wx + 512) - 32 && i21 >= mp.maps.wy && i21 <= (mp.maps.wy + 320) - 32 && mp.co_j.x >= l20 - 352 && mp.co_j.x <= l20 - 72 && Math.abs(mp.co_j.y - i21) < 64)
                    {
                        mp.mSet2(l20, i21, 77, i, 0);
                        mp.gs.rsAddSound(14);
                        characterobject.c1 = 300;
                    }
                } else
                {
                    characterobject.c1++;
                    if(characterobject.c1 > 300 + properties.interval)
                        characterobject.c1 = 0;
                }
                characterobject.pt = 158;
                characterobject.pth = 0;

                return true;
            } else if (characterobject.c === 725) {
                // 右向き
                if(mp.ana_kazu > 0)
                {
                    var i8 = 0;
                    do
                    {
                        if(i8 > 11)
                            break;
                        if(mp.ana_c[i8] > 0 && mp.ana_y[i8] * 32 == i21 + 32 && Math.abs(mp.ana_x[i8] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[i8] * 32;
                            break;
                        }
                        i8++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                if(characterobject.c1 <= 0)
                {
                    if(l20 >= mp.maps.wx - 16 - 144 && l20 <= (mp.maps.wx + 512) - 32 && i21 >= mp.maps.wy && i21 <= (mp.maps.wy + 320) - 32 && mp.co_j.x <= l20 + 352 && mp.co_j.x >= l20 + 72 && Math.abs(mp.co_j.y - i21) < 32)
                    {
                        mp.mSet2(l20, i21, 87, i, 0);
                        mp.gs.rsAddSound(14);
                        characterobject.c1 = 300;
                    }
                } else
                {
                    characterobject.c1++;
                    if(characterobject.c1 > 300 + properties.interval)
                        characterobject.c1 = 0;
                }
                characterobject.pt = 158;
                characterobject.pth = 1;
                return true;
            }
            return false;
        };
    },
};

/**
 * ミズタロウ
 */
EnemyController.Mizutaro = {
    properties: {
        // 歩く速度
        walk_speed: 3,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
            // 敵コードを800に統一
            characterobject.c2 = 800;
            characterobject.c4 = enemyCode - 800;
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;

            if (characterobject.c === 800) {
                // 左で立ち止まっている状態
                if(mp.ana_kazu > 0)
                {
                    var j8 = 0;
                    do
                    {
                        if(j8 > 11)
                            break;
                        if(mp.ana_c[j8] > 0 && mp.ana_y[j8] * 32 == i21 + 32 && Math.abs(mp.ana_x[j8] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[j8] * 32;
                            break;
                        }
                        j8++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                if(characterobject.c1 > 0)
                {
                    characterobject.c1++;
                    if(characterobject.c1 === 2)
                    {
                        if(characterobject.c4 === 1)
                        {
                            // はっぱカッター3発
                            if(l20 + 8 >= mp.co_j.x)
                            {
                                var d16 = 3.1400001049041748;
                                mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d16) * 9), Math.floor(Math.sin(d16) * 9));
                                d16 = 3.6633334159851074;
                                mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d16) * 9), Math.floor(Math.sin(d16) * 9));
                                d16 = 4.1866669654846191;
                                mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d16) * 9), Math.floor(Math.sin(d16) * 9));
                                mp.gs.rsAddSound(11);
                            } else
                            {
                                var d17 = 0.0;
                                mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d17) * 9), Math.floor(Math.sin(d17) * 9));
                                d17 = 5.7566671371459961;
                                mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d17) * 9), Math.floor(Math.sin(d17) * 9));
                                d17 = 5.2333335876464844;
                                mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d17) * 9), Math.floor(Math.sin(d17) * 9));
                                mp.gs.rsAddSound(11);
                            }
                        } else
                        if(characterobject.c4 === 2)
                        {
                            // 電撃
                            mp.mSet(l20, i21, 100);
                            mp.gs.rsAddSound(10);
                            characterobject.c1 = 12;
                        } else
                        if(characterobject.c4 === 3)
                        {
                            // みずでっぽう 水平発射
                            if(l20 + 8 >= mp.co_j.x)
                            {
                                mp.mSet2(l20 - 16, i21, 732, -10, 0);
                                if(Math.abs(i21 - mp.co_j.y) <= 288)
                                    mp.gs.rsAddSound(15);
                            } else
                            {
                                mp.mSet2(l20 + 16, i21, 732, 10, 0);
                                if(Math.abs(i21 - mp.co_j.y) <= 288)
                                    mp.gs.rsAddSound(15);
                            }
                            characterobject.c1 = 12;
                        } else
                        if(characterobject.c4 === 4)
                        {
                            // ハリケンブラスト
                            for(var k8 = 0; k8 <= 300; k8 += 90)
                            {
                                mp.mSet2(l20, i21, 950, k8, 0);
                                mp.mSet2(l20, i21, 960, 300 - k8, 0);
                                mp.gs.rsAddSound(18);
                            }

                        } else
                        {
                            // みずでっぽう
                            if(l20 + 8 >= mp.co_j.x)
                            {
                                mp.mSet(l20, i21, 400);
                                if(Math.abs(i21 - mp.co_j.y) <= 288)
                                    mp.gs.rsAddSound(15);
                            } else
                            {
                                mp.mSet(l20, i21, 405);
                                if(Math.abs(i21 - mp.co_j.y) <= 288)
                                    mp.gs.rsAddSound(15);
                            }
                        }
                    } else
                    if(characterobject.c1 > 20)
                    {
                        characterobject.c = 810;
                        characterobject.c1 = 0;
                    }
                } else
                if(characterobject.c1 < 0)
                    characterobject.c1++;
                else
                {
                    // 射程に入ったら攻撃態勢へ
                    if(mp.co_j.x >= l20 - 240 && mp.co_j.x <= l20 + 240)
                        characterobject.c1 = 1;
                }
                characterobject.pt = 160;
                if(l20 + 8 >= mp.co_j.x)
                    characterobject.pth = 0;
                else
                    characterobject.pth = 1;
                return true;
            } else if (characterobject.c === 810) {
                if(mp.ana_kazu > 0)
                {
                    var l8 = 0;
                    do
                    {
                        if(l8 > 11)
                            break;
                        if(mp.ana_c[l8] > 0 && mp.ana_y[l8] * 32 == i21 + 32 && Math.abs(mp.ana_x[l8] * 32 - l20) < 32)
                        {
                            characterobject.c = 1300;
                            l20 = mp.ana_x[l8] * 32;
                            break;
                        }
                        l8++;
                    } while(true);
                    if(characterobject.c === 1300) {
                        characterobject.x = l20;
                        return true;
                    }
                }
                if(characterobject.c1 <= 0)
                {
                    // 右へ移動中
                    if((l20 += properties.walk_speed) >= characterobject.c3 + 96)
                    {
                        l20 = characterobject.c3 + 96;
                        characterobject.c1 = 10;
                    }
                    if(mp.maps.getBGCode(l20 + 31, i21 + 32) <= 9)
                    {
                        // 床がなかったら停止
                        l20 = rightShiftIgnoreSign(l20 + 31, 5) * 32 - 32;
                        characterobject.c1 = 10;
                    }
                    characterobject.pt = 161 + mp.g_ac;
                    characterobject.pth = 1;
                } else
                if(characterobject.c4 !== 4 && characterobject.c1 <= 35 || characterobject.c1 <= 50)
                {
                    // 右で待機・攻撃
                    characterobject.c1++;
                    if(characterobject.c1 === 15)
                        if(characterobject.c4 === 1)
                        {
                            // はっぱカッター3発
                            if(l20 + 8 >= mp.co_j.x)
                            {
                                var d18 = 3.1400001049041748;
                                mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d18) * 9), Math.floor(Math.sin(d18) * 9));
                                d18 = 3.6633334159851074;
                                mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d18) * 9), Math.floor(Math.sin(d18) * 9));
                                d18 = 4.1866669654846191;
                                mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d18) * 9), Math.floor(Math.sin(d18) * 9));
                                mp.gs.rsAddSound(11);
                            } else
                            {
                                var d19 = 0.0;
                                mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d19) * 9), Math.floor(Math.sin(d19) * 9));
                                d19 = 5.7566671371459961;
                                mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d19) * 9), Math.floor(Math.sin(d19) * 9));
                                d19 = 5.2333335876464844;
                                mp.mSet2(l20, i21, 731, Math.floor(Math.cos(d19) * 9), Math.floor(Math.sin(d19) * 9));
                                mp.gs.rsAddSound(11);
                            }
                        } else
                        if(characterobject.c4 === 2)
                        {
                            // 電撃
                            mp.mSet(l20, i21, 100);
                            mp.gs.rsAddSound(10);
                        } else
                        if(characterobject.c4 === 3)
                        {
                            // みずでっぽう 水平発射
                            if(l20 + 8 >= mp.co_j.x)
                            {
                                mp.mSet2(l20 - 16, i21, 732, -10, 0);
                                if(Math.abs(i21 - mp.co_j.y) <= 288)
                                    mp.gs.rsAddSound(15);
                            } else
                            {
                                mp.mSet2(l20 + 16, i21, 732, 10, 0);
                                if(Math.abs(i21 - mp.co_j.y) <= 288)
                                    mp.gs.rsAddSound(15);
                            }
                        } else
                        if(characterobject.c4 === 4)
                        {
                            // ハリケンブラスト 
                            for(var i9 = 0; i9 <= 300; i9 += 90)
                            {
                                mp.mSet2(l20, i21, 950, i9, 0);
                                mp.mSet2(l20, i21, 960, 300 - i9, 0);
                                mp.gs.rsAddSound(18);
                            }

                        } else
                        if(l20 + 8 >= mp.co_j.x)
                        {
                            mp.mSet(l20, i21, 400);
                            mp.gs.rsAddSound(15);
                        } else
                        {
                            mp.mSet(l20, i21, 405);
                            mp.gs.rsAddSound(15);
                        }
                    characterobject.pt = 160;
                    if(l20 + 8 >= mp.co_j.x)
                        characterobject.pth = 0;
                    else
                        characterobject.pth = 1;
                } else
                {
                    // 左へ移動中
                    if((l20 -= properties.walk_speed) <= characterobject.c3)
                    {
                        l20 = characterobject.c3;
                        characterobject.c = 800;
                        characterobject.c1 = -20;
                    }
                    if(mp.maps.getBGCode(l20, i21 + 32) <= 9)
                    {
                        // 床がなかったら停止
                        l20 = rightShiftIgnoreSign(l20, 5) * 32 + 32;
                        characterobject.c = 800;
                        characterobject.c1 = -20;
                    }
                    characterobject.pt = 161 + mp.g_ac;
                    characterobject.pth = 0;
                }
                characterobject.x = l20;
                return true;
            }
            return false;
        };
    },
};

/**
 * エアームズ（壁に当たると止まる）
 */
EnemyController.AirmsStop = {
    properties: {
        // 飛行速度
        speed: 4,
        // 攻撃の間隔
        interval: 26,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            if (characterobject.c === 900) {
                // 飛行中
                var l20 = characterobject.x;
                var i21 = characterobject.y;

                if((l20 -= properties.speed) < 48)
                {
                    // ステージから出て消える
                    if(l20 <= 4)
                        characterobject.c = 0;
                } else
                {
                    characterobject.c1++;
                    if(characterobject.c1 === 1)
                        mp.mSet(l20, i21 + 19, 600);
                    else
                    if(characterobject.c1 > properties.interval)
                        characterobject.c1 = 0;
                    if(mp.maps.getBGCode(l20, i21 + 31) >= 15)
                    {
                        // 壁に当たったら止まる
                        l20 = rightShiftIgnoreSign(l20, 5) * 32 + 32;
                        characterobject.c = 910;
                    }
                }
                characterobject.pt = 164;
                characterobject.pth = 0;

                characterobject.x = l20;
                return true;
            } else if (characterobject.c === 910) {
                // 停止状態
                characterobject.pt = 164;
                characterobject.pth = 0;
                return true;
            }
            return false;
        };
    },
};

/**
 * エアームズ（その場で投下）
 */
EnemyController.AirmsStay = {
    properties: {
        // 攻撃の間隔
        interval: 30,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
            // 敵コードは920に統一
            characterobject.c2 = 920;
            characterobject.c3 = enemyCode - 920;
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            if (characterobject.c === 920) {
                var l20 = characterobject.x;
                var i21 = characterobject.y;

                if(characterobject.c1 <= 0)
                {
                    // 射程に入ったら投下開始
                    if(l20 >= mp.maps.wx && l20 <= (mp.maps.wx + 512) - 32 && i21 <= (mp.maps.wy + 320) - 32 && mp.co_j.x >= l20 - 256 && mp.co_j.x <= l20 + 256 && mp.co_j.y >= i21 + 16)
                        characterobject.c1 = 1;
                } else
                if(characterobject.c1 === 1)
                {
                    if(characterobject.c3 === 1) {
                        // グレネード投下
                        mp.mSet2(l20, i21, 800, 0, 0);
                    } else {
                        // 爆弾投下
                        mp.mSet(l20, i21 + 19, 606);
                    }
                    characterobject.c1 = 2;
                } else
                {
                    characterobject.c1++;
                    if(characterobject.c1 > properties.interval)
                        characterobject.c1 = 0;
                }
                characterobject.pt = 164;
                if(mp.co_j.x <= l20 + 8 || mp.j_tokugi === 14)
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
 * エアームズ（左右に動いて爆弾投下）
 */
EnemyController.AirmsLeftRight = {
    properties: {
        // 飛行速度
        speed: 4,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
            characterobject.c3 = characterobject.x;
            characterobject.c4 = 20;
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            if (characterobject.c === 930) {
                var l20 = characterobject.x;
                var i21 = characterobject.y;

                if(characterobject.c4 < 20)
                {
                    // 右で待機中
                    characterobject.c4++;
                    characterobject.pt = 164;
                    characterobject.pth = 0;
                    if(characterobject.c4 < 10)
                        characterobject.pth = 1;
                } else
                if(characterobject.c4 === 20)
                {
                    // 左へ移動中
                    l20 -= properties.speed;
                    // 所定の位置で爆弾投下
                    if((l20 === characterobject.c3 - 4 || l20 == characterobject.c3 - 4 - 64 || l20 == characterobject.c3 - 4 - 128) && l20 >= mp.maps.wx && l20 <= (mp.maps.wx + 512) - 32 && i21 <= (mp.maps.wy + 320) - 32 && mp.co_j.y >= i21 + 16)
                        mp.mSet(l20 + 2, i21, 600);
                    if(l20 <= characterobject.c3 - 160)
                    {
                        // 反転
                        l20 = characterobject.c3 - 160;
                        characterobject.c4 = 30;
                    }
                    characterobject.pt = 164;
                    characterobject.pth = 0;
                } else
                if(characterobject.c4 < 50)
                {
                    // 左で待機中
                    characterobject.c4++;
                    characterobject.pt = 164;
                    characterobject.pth = 1;
                    if(characterobject.c4 < 40)
                        characterobject.pth = 0;
                } else
                if(characterobject.c4 === 50)
                {
                    // 右へ移動中
                    l20 += properties.speed;
                    if((l20 === (characterobject.c3 + 4) - 32 || l20 === (characterobject.c3 + 4) - 96) && l20 >= mp.maps.wx && l20 <= (mp.maps.wx + 512) - 32 && i21 <= (mp.maps.wy + 320) - 32 && mp.co_j.y >= i21 + 16)
                        mp.mSet(l20 - 2, i21, 605);
                    if(l20 >= characterobject.c3)
                    {
                        // 反転
                        l20 = characterobject.c3;
                        characterobject.c4 = 0;
                    }
                    characterobject.pt = 164;
                    characterobject.pth = 1;
                }

                characterobject.x = l20;
                return true;
            }
            return false;
        };
    },
};

/**
 * エアームズ（壁に当たると向きを変える）
 */
EnemyController.AirmsReturn = {
    properties: {
        // 飛行速度
        speed: 4,
        // 攻撃の間隔
        interval: 26,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;
            if (characterobject.c === 950) {
                // 左向き

                if((l20 -= properties.speed) < 48)
                {
                    // ステージから出たら消える
                    if(l20 <= properties.speed)
                        characterobject.c = 0;
                } else
                {
                    characterobject.c1++;
                    // 爆弾を投下
                    if(characterobject.c1 === 1)
                        mp.mSet(l20, i21 + 19, 600);
                    else
                    if(characterobject.c1 > properties.interval)
                        characterobject.c1 = 0;
                    if(mp.maps.getBGCode(l20 - 16, i21 + 31) >= 15)
                    {
                        // 壁が当たったので反転
                        l20 = rightShiftIgnoreSign(l20 - 16, 5) * 32 + 32 + 16;
                        characterobject.c = 960;
                        characterobject.c1 = properties.interval - 10;
                    }
                }
                characterobject.pt = 164;
                characterobject.pth = 0;

                characterobject.x = l20;
                return true;
            } else if (characterobject.c === 960) {
                // 右向き
                l20 += properties.speed;
                characterobject.c1++;
                if(characterobject.c1 === 1)
                    mp.mSet(l20, i21 + 19, 605);
                else
                if(characterobject.c1 > properties.interval)
                    characterobject.c1 = 0;
                if(mp.maps.getBGCode(l20 + 31 + 16, i21 + 31) >= 15)
                {
                    // 壁に当たったので反転
                    l20 = rightShiftIgnoreSign(l20 + 31 + 16, 5) * 32 - 32 - 16;
                    characterobject.c = 950;
                    characterobject.c1 = properties.interval - 10;
                }
                characterobject.pt = 164;
                characterobject.pth = 1;

                characterobject.x = l20;
                return true;
            }
            return false;
        };
    },
};

/**
 * タイキング（左右移動　水中専用）
 */
EnemyController.Taiking = {
    properties: {
        // 移動速度
        speed: 3,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;

            if (characterobject.c === 1000) {
                // 左向き
                if((l20 -= properties.speed) <= (characterobject.c3 - 256) + 16)
                    characterobject.c = 1005;
                if(mp.maps.getBGCode(l20 - 16, i21) >= 15 || mp.maps.getBGCode(l20 - 16, i21 + 31) >= 15)
                {
                    // 壁にあたって反転
                    l20 = rightShiftIgnoreSign(l20 - 16, 5) * 32 + 32 + 16;
                    characterobject.c = 1005;
                }
                characterobject.pt = 166;
                characterobject.pth = 0;

                characterobject.x = l20;
                return true;
            } else if (characterobject.c === 1005) {
                // 右向き
                if((l20 += properties.speed) >= characterobject.c3 + 16)
                    characterobject.c = 1000;
                if(mp.maps.getBGCode(l20 + 31 + 16, i21) >= 15 || mp.maps.getBGCode(l20 + 31 + 16, i21 + 31) >= 15)
                {
                    l20 = rightShiftIgnoreSign(l20 + 31 + 16, 5) * 32 - 32 - 16;
                    characterobject.c = 1000;
                }
                characterobject.pt = 166;
                characterobject.pth = 1;

                characterobject.x = l20;
                return true;
            }
            return false;
        };
    },
};

/**
 * タイキング（はねる）
 */
EnemyController.TaikingJump = {
    properties: {
        // ジャンプの初速
        jump_vy: -26,
        // 着地後の待機時間
        interval: 10,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;

            if (characterobject.c === 1050) {
                characterobject.pt = 166;
                if(mp.co_j.x <= l20 + 8 || mp.j_tokugi === 14)
                    characterobject.pth = 0;
                else
                    characterobject.pth = 1;
                if(characterobject.c1 <= 0)
                {
                    // 待機中
                    var j28 = mp.maps.getBGCode(l20 + 15, i21 + 32);
                    if(j28 === 18 || j28 === 19)
                        i21 = mp.getSakamichiY(l20 + 15, i21 + 32);
                    if(mp.co_j.x >= l20 - 136 && mp.co_j.x <= l20 + 136)
                    {
                        // 近づいてきたら跳ねる
                        characterobject.vy = properties.jump_vy;
                        characterobject.c1 = 100;
                    }
                } else
                if(characterobject.c1 === 100)
                {
                    // ジャンプ中
                    characterobject.vy += 2;
                    if(characterobject.vy > 18)
                        characterobject.vy = 18;
                    if(characterobject.vy < -22)
                        i21 -= 22;
                    else
                        i21 += characterobject.vy;
                    if(characterobject.vy < 0 && mp.maps.getBGCode(l20 + 15, i21) >= 18)
                    {
                        // 天井にぶつかる
                        i21 = rightShiftIgnoreSign(i21, 5) * 32 + 32;
                        characterobject.vy = 0;
                    }
                    var k40 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                    if(k40 >= 20 || k40 === 10 || k40 === 15)
                    {
                        // 着地
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                        characterobject.c1 = 200;
                    }
                    if(k40 === 18 || k40 === 19)
                    {
                        // 坂に着地
                        if(i21 >= mp.getSakamichiY(l20 + 15, i21 + 31))
                        {
                            i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                            characterobject.c1 = 200;
                        }
                    } else
                    if(rightShiftIgnoreSign(i21 + 31, 5) > rightShiftIgnoreSign(characterobject.y + 31, 5))
                    {
                        // 坂をすり抜ける場合に対処
                        var l40 = mp.maps.getBGCode(l20 + 15, characterobject.y + 31);
                        if(l40 === 18 || l40 === 19)
                        {
                            i21 = rightShiftIgnoreSign(characterobject.y + 31, 5) * 32;
                            i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                            characterobject.c1 = 200;
                        }
                    }
                } else
                if(characterobject.c1 >= 200)
                {
                    // 着地後待機時間
                    characterobject.c1++;
                    if(characterobject.c1 > 200 + properties.interval)
                        characterobject.c1 = 0;
                }
                if(i21 >= mp.ochiru_y)
                    characterobject.c = 0;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            }
            return false;
        };
    },
};

/**
 * タイキング（縄張りをまもる）
 */
EnemyController.TaikingTerritory = {
    properties: {
        // 横方向移動速度
        speed_x: 3,
        // 縦方向移動速度
        speed_y: 2,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;

            if (characterobject.c === 1060) {
                characterobject.pt = 166;
                characterobject.pth = 0;
                if(characterobject.c1 <= 0)
                {
                    if(l20 < mp.co_j.x)
                        characterobject.pth = 1;
                    if(mp.co_j.c >= 100 && mp.co_j.c < 200 && (characterobject.c3 - 160) + 16 <= mp.co_j.x && (characterobject.c3 + 128) - 16 >= mp.co_j.x && (characterobject.c4 - 128) + 16 <= mp.co_j.y && (characterobject.c4 + 128) - 16 >= mp.co_j.y)
                    {
                        // 縄張りに入ったら動く
                        characterobject.c1 = 100;
                        if(l20 > mp.co_j.x)
                        {
                            if(mp.maps.getBGCode(l20 - 1, i21 + 15) >= 18)
                                characterobject.c1 = 0;
                        } else
                        if(l20 < mp.co_j.x && mp.maps.getBGCode(l20 + 32, i21 + 15) >= 18)
                            characterobject.c1 = 0;
                        if(i21 > mp.co_j.y)
                        {
                            if(mp.maps.getBGCode(l20 + 15, i21 - 1) >= 18)
                                characterobject.c1 = 0;
                        } else
                        if(i21 < mp.co_j.y && mp.maps.getBGCode(l20 + 15, i21 + 32) >= 18)
                            characterobject.c1 = 0;
                    }
                } else
                if(characterobject.c1 === 100)
                {
                    // 主人公を追跡中
                    if(l20 > mp.co_j.x)
                    {
                        if(mp.maps.getBGCode(l20 - 1, i21 + 15) >= 18)
                            characterobject.c1 = 200;
                    } else
                    if(l20 < mp.co_j.x && mp.maps.getBGCode(l20 + 32, i21 + 15) >= 18)
                        characterobject.c1 = 200;
                    if(i21 > mp.co_j.y)
                    {
                        if(mp.maps.getBGCode(l20 + 15, i21 - 1) >= 18)
                            characterobject.c1 = 200;
                    } else
                    if(i21 < mp.co_j.y && mp.maps.getBGCode(l20 + 15, i21 + 32) >= 18)
                        characterobject.c1 = 200;
                    if(characterobject.c1 === 200)
                    {
                        if(l20 < characterobject.c3)
                            characterobject.pth = 1;
                        if(l20 == characterobject.c3 && l20 < mp.co_j.x)
                            characterobject.pth = 1;
                    } else
                    {
                        if(l20 < mp.co_j.x)
                            characterobject.pth = 1;
                        if(Math.abs(l20 - mp.co_j.x) <= properties.speed_x)
                            l20 = mp.co_j.x;
                        else
                        if(l20 < mp.co_j.x)
                            l20 += properties.speed_x;
                        else
                        if(l20 > mp.co_j.x)
                            l20 -= properties.speed_x;
                        if(Math.abs(i21 - mp.co_j.y) <= properties.speed_y)
                            i21 = mp.co_j.y;
                        else
                        if(i21 < mp.co_j.y)
                            i21 += properties.speed_y;
                        else
                        if(i21 > mp.co_j.y)
                            i21 -= properties.speed_y;
                        if(characterobject.c3 - 160 > mp.co_j.x || characterobject.c3 + 128 < mp.co_j.x || characterobject.c4 - 128 > mp.co_j.y || characterobject.c4 + 128 < mp.co_j.y)
                            characterobject.c1 = 200;
                        if(mp.co_j.c < 100 || mp.co_j.c >= 200)
                            characterobject.c1 = 200;
                    }
                } else
                if(characterobject.c1 === 200)
                {
                    // 主人公を追跡中
                    if(l20 < characterobject.c3)
                        characterobject.pth = 1;
                    if(l20 == characterobject.c3 && l20 < mp.co_j.x)
                        characterobject.pth = 1;
                    if(Math.abs(l20 - characterobject.c3) <= properties.speed_x)
                        l20 = characterobject.c3;
                    else
                    if(l20 < characterobject.c3)
                        l20 += properties.speed_x;
                    else
                    if(l20 > characterobject.c3)
                        l20 -= properties.speed_x;
                    if(Math.abs(i21 - characterobject.c4) <= properties.speed_y)
                        i21 = characterobject.c4;
                    else
                    if(i21 < characterobject.c4)
                        i21 += properties.speed_y;
                    else
                    if(i21 > characterobject.c4)
                        i21 -= properties.speed_y;
                    if(l20 == characterobject.c3 && i21 == characterobject.c4)
                        characterobject.c1 = 0;
                }

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            }
            return false;
        };
    },
};

/**
 * タイキング（左回り）
 */
EnemyController.TaikingLeft = {
    properties: {
        // 角速度（degree）
        speed: 5,
        // 回転半径
        radius: 64,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
            characterobject.c3 = characterobject.x - 64;
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            if (characterobject.c === 1070) {
                characterobject.c1 -= properties.speed;
                if(characterobject.c1 < 0)
                    characterobject.c1 += 360;
                var l20 = characterobject.c3 + Math.floor(Math.cos((characterobject.c1 * 3.14) / 180) * properties.radius);
                var i21 = characterobject.c4 + Math.floor(Math.sin((characterobject.c1 * 3.14) / 180) * properties.radius);
                characterobject.pt = 166;
                if(characterobject.c1 < 180)
                    characterobject.pth = 1;
                else
                    characterobject.pth = 0;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            }
            return false;
        };
    },
};

/**
 * タイキング（右回り）
 * TODO: これ左回りとほとんどコード同じでは？
 */
EnemyController.TaikingRight = {
    properties: {
        // 角速度（degree）
        speed: 5,
        // 回転半径
        radius: 64,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
            characterobject.c3 = characterobject.x - 64;
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            if (characterobject.c === 1080) {
                characterobject.c1 += properties.speed;
                if(characterobject.c1 >= 360)
                    characterobject.c1 -= 360;
                var l20 = characterobject.c3 + Math.floor(Math.cos((characterobject.c1 * 3.14) / 180) * properties.radius);
                var i21 = characterobject.c4 + Math.floor(Math.sin((characterobject.c1 * 3.14) / 180) * properties.radius);
                characterobject.pt = 166;
                if(characterobject.c1 < 180)
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
 * クラゲッソ（バブル光線 水中専用）
 */
EnemyController.Kuragesso = {
    properties: {
        // 攻撃の間隔
        interval: 77,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            if (characterobject.c === 1100) {
                var l20 = characterobject.x;
                var i21 = characterobject.y;

                if(characterobject.c1 > 0)
                {
                    characterobject.c1++;
                    if(characterobject.c1 > properties.interval)
                        characterobject.c1 = 0;
                } else
                if(Math.abs(mp.co_j.x - l20) <= 144 && Math.abs(mp.co_j.y - i21) <= 144)
                {
                    // 射程範囲内なら攻撃
                    characterobject.c1 = 1;
                    mp.mSet2(l20, i21, 700, -3, -3);
                    mp.mSet2(l20, i21, 700, 3, -3);
                    mp.mSet2(l20, i21, 700, -3, 3);
                    mp.mSet2(l20, i21, 700, 3, 3);
                    mp.mSet2(l20, i21, 700, -4, 0);
                    mp.mSet2(l20, i21, 700, 4, 0);
                    mp.mSet2(l20, i21, 700, 0, -4);
                    mp.mSet2(l20, i21, 700, 0, 4);
                }
                characterobject.pt = 167;
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
 * クラゲッソ（バブル光線 水中専用）
 */
EnemyController.Kuragesso = {
    properties: {
        // 攻撃の間隔
        interval: 77,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            if (characterobject.c === 1100) {
                var l20 = characterobject.x;
                var i21 = characterobject.y;

                if(characterobject.c1 > 0)
                {
                    characterobject.c1++;
                    if(characterobject.c1 > properties.interval)
                        characterobject.c1 = 0;
                } else
                if(Math.abs(mp.co_j.x - l20) <= 144 && Math.abs(mp.co_j.y - i21) <= 144)
                {
                    // 射程範囲内なら攻撃
                    characterobject.c1 = 1;
                    mp.mSet2(l20, i21, 700, -3, -3);
                    mp.mSet2(l20, i21, 700, 3, -3);
                    mp.mSet2(l20, i21, 700, -3, 3);
                    mp.mSet2(l20, i21, 700, 3, 3);
                    mp.mSet2(l20, i21, 700, -4, 0);
                    mp.mSet2(l20, i21, 700, 4, 0);
                    mp.mSet2(l20, i21, 700, 0, -4);
                    mp.mSet2(l20, i21, 700, 0, 4);
                }
                characterobject.pt = 167;
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
 * クラゲッソ（近づくと落ちる）
 */
EnemyController.KuragessoFall = {
    properties: {
        // 落下の初速
        init_vy: 2,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            if (characterobject.c === 1150) {
                var l20 = characterobject.x;
                var i21 = characterobject.y;

                characterobject.pt = 167;
                if(mp.co_j.x <= l20 + 8 || mp.j_tokugi === 14)
                    characterobject.pth = 0;
                else
                    characterobject.pth = 1;
                if(characterobject.c1 <= 0)
                {
                    var k28 = mp.maps.getBGCode(l20 + 15, i21 + 32);
                    if(k28 === 18 || k28 === 19)
                        i21 = mp.getSakamichiY(l20 + 15, i21 + 32);
                    if(mp.co_j.x >= l20 - 128 && mp.co_j.x <= l20 + 128 && i21 + 32 <= mp.co_j.y)
                    {
                        // 近づくと落下開始
                        characterobject.vy = properties.init_vy;
                        characterobject.c1 = 100;
                    }
                } else
                if(characterobject.c1 === 100)
                {
                    // 落下中
                    characterobject.vy++;
                    if(characterobject.vy > 16)
                        characterobject.vy = 16;
                    if(characterobject.vy < -22)
                        i21 -= 22;
                    else
                        i21 += characterobject.vy;
                    if(characterobject.vy < 0 && mp.maps.getBGCode(l20 + 15, i21) >= 18)
                    {
                        // 天井にぶつかる
                        i21 = rightShiftIgnoreSign(i21, 5) * 32 + 32;
                        characterobject.vy = 0;
                    }
                    var i41 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                    if(i41 >= 20 || i41 === 10 || i41 === 15)
                    {
                        // 床に着地
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                        characterobject.c1 = 200;
                    }
                    if(i41 === 18 || i41 === 19)
                    {
                        // 坂に着地
                        if(i21 >= mp.getSakamichiY(l20 + 15, i21 + 31))
                        {
                            i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                            characterobject.c1 = 200;
                        }
                    } else
                    if(rightShiftIgnoreSign(i21 + 31, 5) > rightShiftIgnoreSign(characterobject.y + 31, 5))
                    {
                        var j41 = mp.maps.getBGCode(l20 + 15, characterobject.y + 31);
                        if(j41 === 18 || j41 === 19)
                        {
                            // 床をすり抜けた場合に対処
                            i21 = rightShiftIgnoreSign(characterobject.y + 31, 5) * 32;
                            i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                            characterobject.c1 = 200;
                        }
                    }
                } else
                if(characterobject.c1 >= 200)
                {
                    // 着地後待機
                    characterobject.c1++;
                    if(characterobject.c1 > 210)
                        characterobject.c1 = 0;
                }
                if(i21 >= mp.ochiru_y)
                    characterobject.c = 0;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            }
            return false;
        };
    },
};

/**
 * クラゲッソ（縄張りをまもる）
 * TODO これタイキングと同じでは？
 */
EnemyController.KuragessoTerritory = {
    properties: {
        // 横方向移動速度
        speed_x: 3,
        // 縦方向移動速度
        speed_y: 2,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            if (characterobject.c === 1160) {
                var l20 = characterobject.x;
                var i21 = characterobject.y;

                characterobject.pt = 167;
                characterobject.pth = 0;
                if(characterobject.c1 <= 0)
                {
                    if(l20 < mp.co_j.x)
                        characterobject.pth = 1;
                    if(mp.co_j.c >= 100 && mp.co_j.c < 200 && (characterobject.c3 - 160) + 16 <= mp.co_j.x && (characterobject.c3 + 128) - 16 >= mp.co_j.x && (characterobject.c4 - 128) + 16 <= mp.co_j.y && (characterobject.c4 + 128) - 16 >= mp.co_j.y)
                    {
                        characterobject.c1 = 100;
                        if(l20 > mp.co_j.x)
                        {
                            if(mp.maps.getBGCode(l20 - 1, i21 + 15) >= 18)
                                characterobject.c1 = 0;
                        } else
                        if(l20 < mp.co_j.x && mp.maps.getBGCode(l20 + 32, i21 + 15) >= 18)
                            characterobject.c1 = 0;
                        if(i21 > mp.co_j.y)
                        {
                            if(mp.maps.getBGCode(l20 + 15, i21 - 1) >= 18)
                                characterobject.c1 = 0;
                        } else
                        if(i21 < mp.co_j.y && mp.maps.getBGCode(l20 + 15, i21 + 32) >= 18)
                            characterobject.c1 = 0;
                    }
                } else
                if(characterobject.c1 === 100)
                {
                    if(l20 > mp.co_j.x)
                    {
                        if(mp.maps.getBGCode(l20 - 1, i21 + 15) >= 18)
                            characterobject.c1 = 200;
                    } else
                    if(l20 < mp.co_j.x && mp.maps.getBGCode(l20 + 32, i21 + 15) >= 18)
                        characterobject.c1 = 200;
                    if(i21 > mp.co_j.y)
                    {
                        if(mp.maps.getBGCode(l20 + 15, i21 - 1) >= 18)
                            characterobject.c1 = 200;
                    } else
                    if(i21 < mp.co_j.y && mp.maps.getBGCode(l20 + 15, i21 + 32) >= 18)
                        characterobject.c1 = 200;
                    if(characterobject.c1 == 200)
                    {
                        if(l20 < characterobject.c3)
                            characterobject.pth = 1;
                        if(l20 == characterobject.c3 && l20 < mp.co_j.x)
                            characterobject.pth = 1;
                    } else
                    {
                        if(l20 < mp.co_j.x)
                            characterobject.pth = 1;
                        if(Math.abs(l20 - mp.co_j.x) <= properties.speed_x)
                            l20 = mp.co_j.x;
                        else
                        if(l20 < mp.co_j.x)
                            l20 += properties.speed_x;
                        else
                        if(l20 > mp.co_j.x)
                            l20 -= properties.speed_x;
                        if(Math.abs(i21 - mp.co_j.y) <= properties.speed_y)
                            i21 = mp.co_j.y;
                        else
                        if(i21 < mp.co_j.y)
                            i21 += properties.speed_y;
                        else
                        if(i21 > mp.co_j.y)
                            i21 -= properties.speed_y;
                        if(characterobject.c3 - 160 > mp.co_j.x || characterobject.c3 + 128 < mp.co_j.x || characterobject.c4 - 128 > mp.co_j.y || characterobject.c4 + 128 < mp.co_j.y)
                            characterobject.c1 = 200;
                        if(mp.co_j.c < 100 || mp.co_j.c >= 200)
                            characterobject.c1 = 200;
                    }
                } else
                if(characterobject.c1 === 200)
                {
                    if(l20 < characterobject.c3)
                        characterobject.pth = 1;
                    if(l20 == characterobject.c3 && l20 < mp.co_j.x)
                        characterobject.pth = 1;
                    if(Math.abs(l20 - characterobject.c3) <= properties.speed_x)
                        l20 = characterobject.c3;
                    else
                    if(l20 < characterobject.c3)
                        l20 += properties.speed_x;
                    else
                    if(l20 > characterobject.c3)
                        l20 -= properties.speed_x;
                    if(Math.abs(i21 - characterobject.c4) <= properties.speed_y)
                        i21 = characterobject.c4;
                    else
                    if(i21 < characterobject.c4)
                        i21 += properties.speed_y;
                    else
                    if(i21 > characterobject.c4)
                        i21 -= properties.speed_y;
                    if(l20 == characterobject.c3 && i21 == characterobject.c4)
                        characterobject.c1 = 0;
                }

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            }
            return false;
        };
    },
};

/**
 * クラゲッソ（左回り）
 * TODO これタイキングと同じでは？
 */
EnemyController.KuragessoLeft = {
    properties: {
        // 角速度（degree）
        speed: 5,
        // 回転半径
        radius: 64,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
            characterobject.c3 = characterobject.x - 64;
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            if (characterobject.c === 1170) {
                characterobject.c1 -= properties.speed;
                if(characterobject.c1 < 0)
                    characterobject.c1 += 360;
                var l20 = characterobject.c3 + Math.floor(Math.cos((characterobject.c1 * 3.14) / 180) * properties.radius);
                var i21 = characterobject.c4 + Math.floor(Math.sin((characterobject.c1 * 3.14) / 180) * properties.radius);
                characterobject.pt = 167;
                if(characterobject.c1 < 180)
                    characterobject.pth = 1;
                else
                    characterobject.pth = 0;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            }
            return false;
        };
    },
};

/**
 * クラゲッソ（右回り）
 * TODO これタイキングと同じでは？
 */
EnemyController.KuragessoRight = {
    properties: {
        // 角速度（degree）
        speed: 5,
        // 回転半径
        radius: 64,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
            characterobject.c3 = characterobject.x - 64;
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp) {
            if (characterobject.c === 1180) {
                characterobject.c1 += properties.speed;
                if(characterobject.c1 >= 360)
                    characterobject.c1 -= 360;
                var l20 = characterobject.c3 + Math.floor(Math.cos((characterobject.c1 * 3.14) / 180) * properties.radius);
                var i21 = characterobject.c4 + Math.floor(Math.sin((characterobject.c1 * 3.14) / 180) * properties.radius);
                characterobject.pt = 167;
                if(characterobject.c1 < 180)
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
 * 追跡亀
 */
EnemyController.TurtleChaser = {
    properties: {
        // 歩行速度
        walk_speed: 4,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject) {
            // 画面外にいても動く
            characterobject.c = 1220;
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp, i) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;
            if (characterobject.c === 1200) {
                // 左へ歩く
                l20 -= properties.walk_speed;
                characterobject.muki = 0;
                characterobject.direction = 0;
                if(rightShiftIgnoreSign(l20 + 15, 5) < rightShiftIgnoreSign(l20 + 15 + properties.walk_speed, 5))
                {
                    // 坂にさしかかった場合の処理
                    var k41 = mp.maps.getBGCode(l20 + 4 + 15, i21 + 31);
                    if(k41 === 19)
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                    else
                    if(k41 === 18)
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32;
                    k41 = mp.maps.getBGCode(l20 + 15, i21 + 32);
                    if(k41 === 18)
                        i21 = mp.getSakamichiY(l20 + 15, i21 + 32);
                }
                var l41 = mp.maps.getBGCode(l20, i21 + 8);
                if(l41 >= 20 || l41 === 18)
                {
                    // 壁に当たったときの処理
                    l20 = rightShiftIgnoreSign(l20, 5) * 32 + 32;
                    if(Math.abs(i21 - mp.co_j.y) >= 32 || l20 <= mp.co_j.x)
                    {
                        var i42 = mp.maps.getBGCode(l20 + 32, i21 + 15);
                        if(i42 <= 10 || i42 === 15)
                        {
                            // 右に向きを変える
                            characterobject.c = 1210;
                            characterobject.muki = 1;
                            characterobject.direction = 1;
                            characterobject.pt = 140 + mp.g_ac;
                            var i17 = 0;
                            do
                            {
                                if(i17 > mp.t_kazu)
                                    break;
                                if(mp.co_t[i17].c > 1200 && mp.co_t[i17].c <= 1210 && mp.co_t[i17].x === l20 + 32 && Math.abs(mp.co_t[i17].y - i21) < 32)
                                {
                                    characterobject.c = 1200;
                                    break;
                                }
                                i17++;
                            } while(true);

                            characterobject.x = l20;
                            characterobject.y = i21;
                            return true;
                        }
                    }
                }
                if(Math.abs(i21 - mp.co_j.y) < 32 && l20 < mp.co_j.x)
                {
                    // 主人公が右にいるので反転
                    characterobject.c = 1210;
                    characterobject.pt = 140 + mp.g_ac;
                } else
                {
                    var flag1 = false;
                    for(var j17 = 0; j17 <= mp.t_kazu; j17++)
                    {
                        if((mp.co_t[j17].c < 1200 || mp.co_t[j17].c >= 1300) && mp.co_t[j17].c !=! 60 || j17 === i || Math.abs(mp.co_t[j17].x - l20) >= 32 || Math.abs(mp.co_t[j17].y - i21) >= 32)
                            continue;
                        if(mp.co_t[j17].c === 1210)
                        {
                            var k33 = Math.abs(rightShiftIgnoreSign(i21 + 15, 5) - rightShiftIgnoreSign(mp.co_j.y + 15, 5));
                            if(k33 <= 1 || k33 >= 5)
                            {
                                if(l20 > mp.co_j.x)
                                    characterobject.c = 1200;
                                else
                                    characterobject.c = 1210;
                            } else
                            if(l20 < mp.co_j.x)
                                characterobject.c = 1200;
                            else
                                characterobject.c = 1210;
                            var i30 = rightShiftIgnoreSign(characterobject.x + 15, 5);
                            k33 = rightShiftIgnoreSign(characterobject.y + 15, 5);
                            if(k33 < rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                            {
                                var k9 = 1;
                                do
                                {
                                    if(k9 > 31 || i30 + k9 >= mp.mapWidth || mp.maps.map_bg[i30 + k9][k33] >= 19)
                                        break;
                                    if(mp.maps.map_bg[i30 + k9][k33 + 1] <= 10 || mp.maps.map_bg[i30 + k9][k33 + 1] === 15)
                                    {
                                        characterobject.c = 1210;
                                        break;
                                    }
                                    k9++;
                                } while(true);
                            } else
                            if(k33 > rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                            {
                                var l9 = 1;
                                do
                                {
                                    if(l9 > 31 || i30 + l9 >= mp.mapWidth || mp.maps.map_bg[i30 + l9][k33] >= 19)
                                        break;
                                    if(mp.maps.map_bg[i30 + l9][k33] === 10)
                                    {
                                        characterobject.c = 1210;
                                        break;
                                    }
                                    l9++;
                                } while(true);
                            }
                            i30 = rightShiftIgnoreSign(characterobject.x + 15, 5);
                            k33 = rightShiftIgnoreSign(characterobject.y + 15, 5);
                            if(k33 < rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                            {
                                var i10 = 1;
                                do
                                {
                                    if(i10 > 31 || i30 - i10 <= 0 || mp.maps.map_bg[i30 - i10][k33] >= 20 || mp.maps.map_bg[i30 - i10][k33] === 18)
                                        break;
                                    if(mp.maps.map_bg[i30 - i10][k33 + 1] <= 10 || mp.maps.map_bg[i30 - i10][k33 + 1] === 15)
                                    {
                                        characterobject.c = 1200;
                                        break;
                                    }
                                    i10++;
                                } while(true);
                            } else
                            if(k33 > rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                            {
                                var j10 = 1;
                                do
                                {
                                    if(j10 > 31 || i30 - j10 <= 0 || mp.maps.map_bg[i30 - j10][k33] >= 20 || mp.maps.map_bg[i30 - j10][k33] === 18)
                                        break;
                                    if(mp.maps.map_bg[i30 - j10][k33] === 10)
                                    {
                                        characterobject.c = 1200;
                                        break;
                                    }
                                    j10++;
                                } while(true);
                            }
                            if(j17 < i && rightShiftIgnoreSign(characterobject.x, 5) * 32 !== characterobject.x)
                                characterobject.c = 1210;
                            if(characterobject.c === 1200 && rightShiftIgnoreSign(characterobject.x, 5) * 32 !== characterobject.x)
                                if(k33 > rightShiftIgnoreSign(mp.co_j.y + 15, 5) && mp.maps.getBGCode(characterobject.x + 15, characterobject.y + 15) === 10)
                                {
                                    characterobject.c = 1210;
                                    for(var k10 = 0; k10 <= mp.t_kazu; k10++)
                                        if(mp.co_t[k10].c === 1200 && Math.abs(mp.co_t[k10].y - characterobject.y) <= 16 && characterobject.x <= mp.co_t[k10].x)
                                        {
                                            var j20 = 0;
                                            do
                                            {
                                                if(j20 > mp.t_kazu)
                                                    break;
                                                if(mp.co_t[j20].c >= 1200 && mp.co_t[j20].c < 1300 && Math.abs(mp.co_t[j20].y - mp.co_t[k10].y) <= 16 && mp.co_t[j20].x >= mp.co_t[k10].x - 32 && mp.co_t[j20].x < mp.co_t[k10].x && k10 != j20)
                                                {
                                                    mp.co_t[k10].c = 1210;
                                                    break;
                                                }
                                                j20++;
                                            } while(true);
                                        }

                                } else
                                if(k33 < rightShiftIgnoreSign(mp.co_j.y + 15, 5) && mp.maps.getBGCode(characterobject.x + 15, characterobject.y + 32 + 15) === 10)
                                {
                                    characterobject.c = 1210;
    label0:
                                    for(var l10 = 0; l10 <= mp.t_kazu; l10++)
                                    {
                                        if(mp.co_t[l10].c !== 1200 || Math.abs(mp.co_t[l10].y - characterobject.y) > 16 || characterobject.x > mp.co_t[l10].x)
                                            continue;
                                        var k20 = 0;
                                        do
                                        {
                                            if(k20 > mp.t_kazu)
                                                continue label0;
                                            if(mp.co_t[k20].c >= 1200 && mp.co_t[k20].c < 1300 && Math.abs(mp.co_t[k20].y - mp.co_t[l10].y) <= 16 && mp.co_t[k20].x >= mp.co_t[l10].x - 32 && mp.co_t[k20].x < mp.co_t[l10].x && l10 !== k20)
                                            {
                                                mp.co_t[l10].c = 1210;
                                                continue label0;
                                            }
                                            k20++;
                                        } while(true);
                                    }

                                }
                            if(rightShiftIgnoreSign(characterobject.x, 5) * 32 == characterobject.x)
                                if(k33 > rightShiftIgnoreSign(mp.co_j.y + 15, 5) && mp.maps.getBGCode(characterobject.x + 15, characterobject.y + 15) === 10)
                                    characterobject.c = 1230;
                                else
                                if(k33 < rightShiftIgnoreSign(mp.co_j.y + 15, 5) && (mp.maps.getBGCode(characterobject.x + 15, characterobject.y + 32) <= 10 || mp.maps.getBGCode(characterobject.x + 15, characterobject.y + 32) <= 15))
                                    characterobject.c = 1220;
                            l20 = characterobject.x;
                            flag1 = true;
                            break;
                        }
                        if(mp.co_t[j17].x < characterobject.x)
                        {
                            l20 = characterobject.x;
                            flag1 = true;
                            break;
                        }
                        if(mp.co_t[j17].x !== characterobject.x || j17 >= i)
                            continue;
                        l20 = characterobject.x;
                        flag1 = true;
                        break;
                    }

                    if(flag1)
                    {
                        characterobject.pt = 140 + mp.g_ac;
                        characterobject.pth = characterobject.muki;
                    } else
                    {
                        if(rightShiftIgnoreSign(l20, 5) * 32 === l20)
                        {
                            var j30 = rightShiftIgnoreSign(l20 + 15, 5);
                            var l33 = rightShiftIgnoreSign(i21 + 15, 5);
                            if(mp.maps.map_bg[j30][l33 + 1] <= 9 && mp.maps.map_bg[j30][l33] !== 10 || (mp.maps.map_bg[j30][l33 + 1] <= 10 || mp.maps.map_bg[j30][l33 + 1] === 15) && l33 < rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                            {
                                var flag2 = false;
                                for(var i11 = 0; i11 <= 11; i11++)
                                {
                                    if(mp.ana_c[i11] <= 0 || mp.ana_x[i11] * 32 !== l20 || i21 + 32 !== mp.ana_y[i11] * 32)
                                        continue;
                                    var k17 = 0;
                                    do
                                    {
                                        if(k17 > mp.t_kazu)
                                            break;
                                        if((mp.co_t[k17].c >= 1200 && mp.co_t[k17].c < 1300 || mp.co_t[k17].c === 60) && k17 !== i && l20 === mp.co_t[k17].x && i21 <= mp.co_t[k17].y && i21 + 32 >= mp.co_t[k17].y)
                                        {
                                            flag2 = true;
                                            break;
                                        }
                                        k17++;
                                    } while(true);
                                    if(flag2)
                                        break;
                                }

                                var l17 = 0;
                                do
                                {
                                    if(l17 > mp.t_kazu)
                                        break;
                                    if(mp.co_t[l17].c >= 1200 && mp.co_t[l17].c <= 1210 && l17 !== i && rightShiftIgnoreSign(mp.co_t[l17].x, 5) * 32 === mp.co_t[l17].x && l20 === mp.co_t[l17].x && i21 <= mp.co_t[l17].y && i21 + 32 >= mp.co_t[l17].y && mp.maps.getBGCode(mp.co_t[l17].x + 15, mp.co_t[l17].y + 32) >= 20)
                                    {
                                        flag2 = true;
                                        break;
                                    }
                                    l17++;
                                } while(true);
                                if(!flag2)
                                {
                                    characterobject.c = 1220;
                                    characterobject.c1 = 0;
                                }
                            } else
                            if(mp.maps.map_bg[j30][l33] === 10 && l33 > rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                                characterobject.c = 1230;
                            else
                            if((mp.maps.map_bg[j30 - 1][l33] >= 20 || mp.maps.map_bg[j30 - 1][l33] >= 18) && (Math.abs(i21 - mp.co_j.y) >= 32 || l20 <= mp.co_j.x))
                            {
                                characterobject.c = 1210;
                                var j42 = mp.maps.getBGCode(l20 + 32, i21 + 15);
                                if(j42 >= 19)
                                    characterobject.c = 1200;
                            }
                        }
                        var k42 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                        if(k42 === 18 || k42 === 19)
                            i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                        characterobject.pt = 140 + mp.g_ac;
                        characterobject.pth = characterobject.muki;
                    }
                }

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if (characterobject.c === 1210) {
                // 右に歩く
                l20 += properties.walk_speed;
                characterobject.muki = 1;
                characterobject.direction = 1;
                if(rightShiftIgnoreSign(l20 + 15, 5) > rightShiftIgnoreSign((l20 + 15) - properties.walk_speed, 5))
                {
                    // 坂にさしかかった
                    var l42 = mp.maps.getBGCode((l20 - 4) + 15, i21 + 31);
                    if(l42 === 18)
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                    else
                    if(l42 === 19)
                        i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32;
                    l42 = mp.maps.getBGCode(l20 + 15, i21 + 32);
                    if(l42 === 19)
                        i21 = mp.getSakamichiY(l20 + 15, i21 + 32);
                }
                if(mp.maps.getBGCode(l20 + 31, i21 + 8) >= 19)
                {
                    l20 = rightShiftIgnoreSign(l20 + 31, 5) * 32 - 32;
                    if(Math.abs(i21 - mp.co_j.y) >= 32 || l20 >= mp.co_j.x)
                    {
                        var i43 = mp.maps.getBGCode(l20 - 1, i21 + 15);
                        if(i43 <= 10 || i43 === 15)
                        {
                            characterobject.c = 1200;
                            characterobject.pt = 140 + mp.g_ac;
                            characterobject.pth = characterobject.muki;
                            var i18 = 0;
                            do
                            {
                                if(i18 > mp.t_kazu)
                                    break;
                                if(mp.co_t[i18].c > 1200 && mp.co_t[i18].c <= 1210 && mp.co_t[i18].x === l20 - 32 && Math.abs(mp.co_t[i18].y - i21) < 32)
                                {
                                    characterobject.c = 1210;
                                    break;
                                }
                                i18++;
                            } while(true);

                            characterobject.x = l20;
                            characterobject.y = i21;
                            return true;
                        }
                    }
                }
                if(Math.abs(i21 - mp.co_j.y) < 32 && l20 > mp.co_j.x)
                {
                    characterobject.c = 1200;
                    characterobject.pt = 140 + mp.g_ac;
                    characterobject.pth = characterobject.muki;
                } else
                {
                    var flag3 = false;
                    for(var j18 = 0; j18 <= mp.t_kazu; j18++)
                    {
                        if((mp.co_t[j18].c < 1200 || mp.co_t[j18].c >= 1300) && mp.co_t[j18].c !== 60 || j18 === i || Math.abs(mp.co_t[j18].x - l20) >= 32 || Math.abs(mp.co_t[j18].y - i21) >= 32)
                            continue;
                        if(mp.co_t[j18].c === 1200)
                        {
                            var i34 = Math.abs(rightShiftIgnoreSign(i21 + 15, 5) - rightShiftIgnoreSign(mp.co_j.y + 15, 5));
                            if(i34 <= 1 || i34 >= 5)
                            {
                                if(l20 > mp.co_j.x)
                                    characterobject.c = 1200;
                                else
                                    characterobject.c = 1210;
                            } else
                            if(l20 < mp.co_j.x)
                                characterobject.c = 1200;
                            else
                                characterobject.c = 1210;
                            var k30 = rightShiftIgnoreSign(characterobject.x + 15, 5);
                            i34 = rightShiftIgnoreSign(characterobject.y + 15, 5);
                            if(i34 < rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                            {
                                var j11 = 1;
                                do
                                {
                                    if(j11 > 31 || k30 + j11 >= mp.mapWidth || mp.maps.map_bg[k30 + j11][i34] >= 19)
                                        break;
                                    if(mp.maps.map_bg[k30 + j11][i34 + 1] <= 10 || mp.maps.map_bg[k30 + j11][i34 + 1] === 15)
                                    {
                                        characterobject.c = 1210;
                                        break;
                                    }
                                    j11++;
                                } while(true);
                            } else
                            if(i34 > rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                            {
                                var k11 = 1;
                                do
                                {
                                    if(k11 > 31 || k30 + k11 >= mp.mapWidth || mp.maps.map_bg[k30 + k11][i34] >= 19)
                                        break;
                                    if(mp.maps.map_bg[k30 + k11][i34] === 10)
                                    {
                                        characterobject.c = 1210;
                                        break;
                                    }
                                    k11++;
                                } while(true);
                            }
                            k30 = rightShiftIgnoreSign(characterobject.x + 15, 5);
                            i34 = rightShiftIgnoreSign(characterobject.y + 15, 5);
                            if(i34 < rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                            {
                                var l11 = 1;
                                do
                                {
                                    if(l11 > 31 || k30 - l11 <= 0 || mp.maps.map_bg[k30 - l11][i34] >= 20 || mp.maps.map_bg[k30 - l11][i34] === 18)
                                        break;
                                    if(mp.maps.map_bg[k30 - l11][i34 + 1] <= 10 || mp.maps.map_bg[k30 - l11][i34 + 1] === 15)
                                    {
                                        characterobject.c = 1200;
                                        break;
                                    }
                                    l11++;
                                } while(true);
                            } else
                            if(i34 > rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                            {
                                var i12 = 1;
                                do
                                {
                                    if(i12 > 31 || k30 - i12 <= 0 || mp.maps.map_bg[k30 - i12][i34] >= 20 || mp.maps.map_bg[k30 - i12][i34] === 18)
                                        break;
                                    if(mp.maps.map_bg[k30 - i12][i34] === 10)
                                    {
                                        characterobject.c = 1200;
                                        break;
                                    }
                                    i12++;
                                } while(true);
                            }
                            if(j18 < i && rightShiftIgnoreSign(characterobject.x, 5) * 32 !== characterobject.x)
                                characterobject.c = 1200;
                            l20 = characterobject.x;
                            flag3 = true;
                            break;
                        }
                        if(mp.co_t[j18].x > characterobject.x)
                        {
                            l20 = characterobject.x;
                            flag3 = true;
                            break;
                        }
                        if(mp.co_t[j18].x != characterobject.x || j18 >= i)
                            continue;
                        l20 = characterobject.x;
                        flag3 = true;
                        break;
                    }

                    if(flag3)
                    {
                        characterobject.pt = 140 + mp.g_ac;
                        characterobject.pth = characterobject.muki;
                    } else
                    {
                        if(rightShiftIgnoreSign(l20, 5) * 32 === l20)
                        {
                            var l30 = rightShiftIgnoreSign(l20 + 15, 5);
                            var j34 = rightShiftIgnoreSign(i21 + 15, 5);
                            if(mp.maps.map_bg[l30][j34 + 1] <= 9 && mp.maps.map_bg[l30][j34] !== 10 || (mp.maps.map_bg[l30][j34 + 1] <= 10 || mp.maps.map_bg[l30][j34 + 1] === 15) && j34 < rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                            {
                                var flag4 = false;
                                for(var j12 = 0; j12 <= 11; j12++)
                                {
                                    if(mp.ana_c[j12] <= 0 || mp.ana_x[j12] * 32 !== l20 || i21 + 32 !== mp.ana_y[j12] * 32)
                                        continue;
                                    var k18 = 0;
                                    do
                                    {
                                        if(k18 > mp.t_kazu)
                                            break;
                                        if((mp.co_t[k18].c >= 1200 && mp.co_t[k18].c < 1300 || mp.co_t[k18].c === 60) && k18 !== i && l20 === mp.co_t[k18].x && i21 <= mp.co_t[k18].y && i21 + 32 >= mp.co_t[k18].y)
                                        {
                                            flag4 = true;
                                            break;
                                        }
                                        k18++;
                                    } while(true);
                                    if(flag4)
                                        break;
                                }

                                var l18 = 0;
                                do
                                {
                                    if(l18 > mp.t_kazu)
                                        break;
                                    if(mp.co_t[l18].c >= 1200 && mp.co_t[l18].c <= 1210 && l18 !== i && rightShiftIgnoreSign(mp.co_t[l18].x, 5) * 32 === mp.co_t[l18].x && l20 === mp.co_t[l18].x && i21 <= mp.co_t[l18].y && i21 + 32 >= mp.co_t[l18].y && mp.maps.getBGCode(mp.co_t[l18].x + 15, mp.co_t[l18].y + 32) >= 20)
                                    {
                                        flag4 = true;
                                        break;
                                    }
                                    l18++;
                                } while(true);
                                if(!flag4)
                                {
                                    characterobject.c = 1220;
                                    characterobject.c1 = 0;
                                }
                            } else
                            if(mp.maps.map_bg[l30][j34] === 10 && j34 > rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                                characterobject.c = 1230;
                            else
                            if(mp.maps.map_bg[l30 + 1][j34] >= 19 && (Math.abs(i21 - mp.co_j.y) >= 32 || l20 >= mp.co_j.x))
                            {
                                characterobject.c = 1200;
                                var j43 = mp.maps.getBGCode(l20 - 1, i21 + 15);
                                if(j43 >= 20 || j43 === 18)
                                    characterobject.c = 1210;
                            }
                        }
                        var k43 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                        if(k43 === 18 || k43 === 19)
                            i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                        characterobject.pt = 140 + mp.g_ac;
                        characterobject.pth = characterobject.muki;
                    }
                }

                characterobject.x = l20;
                characterobject.y = i21;
            } else if (characterobject.c === 1220) {
                if(mp.maps.getBGCode(l20 + 15, i21 + 31) === 10)
                {
                    if(l20 < mp.co_j.x)
                        characterobject.muki = 1;
                    else
                    if(l20 > mp.co_j.x)
                        characterobject.muki = 0;
                    characterobject.direction = 3;
                }
                if(i21 - 20 >= mp.co_j.y && mp.maps.getBGCode(l20 + 15, i21 + 31) === 10 && (mp.maps.getBGCode(l20 + 15, (i21 + 31) - 32) <= 10 || mp.maps.getBGCode(l20 + 15, (i21 + 31) - 32) === 15))
                {
                    // 下方向の主人公を追いかける？
                    characterobject.c = 1230;
                    characterobject.pt = 140 + mp.g_ac;
                    characterobject.pth = characterobject.muki;
                    if(rightShiftIgnoreSign(i21, 5) * 32 !== i21)
                    {
                        var i19 = 0;
                        do
                        {
                            if(i19 > mp.t_kazu)
                                break;
                            if(mp.co_t[i19].c >= 1220 && i19 !== i && Math.abs(mp.co_t[i19].x - l20) < 32 && Math.abs(i21 - 4 - mp.co_t[i19].y) < 32)
                            {
                                // 近くに別の追跡敵がいるのでやめる？
                                characterobject.c = 1220;
                                break;
                            }
                            i19++;
                        } while(true);
                    }
                    if(characterobject.c === 1230) {
                        return true;
                    }
                }
                // 落下
                i21 += 4;
                var flag6 = false;
    label1:
                for(var j19 = 0; j19 <= mp.t_kazu; j19++)
                {
                    var t = mp.co_t[j19];
                    if((t.c < 1200 || t.c >= 1300) && t.c !== 60 || j19 === i || Math.abs(t.x - l20) >= 32 || Math.abs(t.y - i21) >= 32)
                        continue;
                    if(t.y > characterobject.y)
                    {
                        flag6 = true;
                        i21 = t.y - 32;
                        var flag9 = false;
                        if(t.c === 1200 && mp.maps.getBGCode(t.x - 1, t.y + 15) >= 20)
                            flag9 = true;
                        if(t.c === 1210 && mp.maps.getBGCode(t.x + 32, t.y + 15) >= 20)
                            flag9 = true;
                        if(t.c === 1200 && mp.maps.getBGCode(t.x + 32, t.y + 15) >= 20 && mp.maps.getBGCode(t.x + 15, t.y + 32) >= 20)
                            flag9 = true;
                        if(t.c === 1210 && mp.maps.getBGCode(t.x - 1, t.y + 15) >= 20 && mp.maps.getBGCode(t.x + 15, t.y + 32) >= 20)
                            flag9 = true;
                        if(!flag9)
                            break;
                        var k34 = Math.abs(rightShiftIgnoreSign(i21 + 15, 5) - rightShiftIgnoreSign(mp.co_j.y + 15, 5));
                        if(k34 <= 1 || k34 >= 5)
                        {
                            if(l20 > mp.co_j.x)
                                characterobject.c = 1200;
                            else
                                characterobject.c = 1210;
                        } else
                        if(l20 < mp.co_j.x)
                            characterobject.c = 1200;
                        else
                            characterobject.c = 1210;
                        var i31 = rightShiftIgnoreSign(characterobject.x + 15, 5);
                        k34 = rightShiftIgnoreSign(characterobject.y + 15, 5);
                        if(k34 < rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                        {
                            var k12 = 1;
                            do
                            {
                                if(k12 > 31 || i31 + k12 >= mp.mapWidth || mp.maps.map_bg[i31 + k12][k34] >= 19)
                                    break;
                                if(mp.maps.map_bg[i31 + k12][k34 + 1] <= 10 || mp.maps.map_bg[i31 + k12][k34 + 1] === 15)
                                {
                                    characterobject.c = 1210;
                                    break;
                                }
                                k12++;
                            } while(true);
                        } else
                        if(k34 > rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                        {
                            var l12 = 1;
                            do
                            {
                                if(l12 > 31 || i31 + l12 >= mp.mapWidth || mp.maps.map_bg[i31 + l12][k34] >= 19)
                                    break;
                                if(mp.maps.map_bg[i31 + l12][k34] === 10)
                                {
                                    characterobject.c = 1210;
                                    break;
                                }
                                l12++;
                            } while(true);
                        }
                        i31 = rightShiftIgnoreSign(characterobject.x + 15, 5);
                        k34 = rightShiftIgnoreSign(characterobject.y + 15, 5);
                        if(k34 < rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                        {
                            var i13 = 1;
                            do
                            {
                                if(i13 > 31 || i31 - i13 <= 0 || mp.maps.map_bg[i31 - i13][k34] >= 20 || mp.maps.map_bg[i31 - i13][k34] === 18)
                                    break label1;
                                if(mp.maps.map_bg[i31 - i13][k34 + 1] <= 10 || mp.maps.map_bg[i31 - i13][k34 + 1] == 15)
                                {
                                    characterobject.c = 1200;
                                    break label1;
                                }
                                i13++;
                            } while(true);
                        }
                        if(k34 <= rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                            break;
                        var j13 = 1;
                        do
                        {
                            if(j13 > 31 || i31 - j13 <= 0 || mp.maps.map_bg[i31 - j13][k34] >= 20 || mp.maps.map_bg[i31 - j13][k34] === 18)
                                break label1;
                            if(mp.maps.map_bg[i31 - j13][k34] === 10)
                            {
                                characterobject.c = 1200;
                                break label1;
                            }
                            j13++;
                        } while(true);
                    }
                    if(mp.co_t[j19].y != characterobject.y || j19 >= i)
                        continue;
                    i21 = characterobject.y;
                    flag6 = true;
                    break;
                }

                if(flag6)
                {
                    characterobject.pt = 140 + mp.g_ac;
                    characterobject.pth = characterobject.muki;

                    characterobject.x = l20;
                    characterobject.y = i21;
                    return true;
                }
                if(mp.maps.getBGCode(l20, i21 + 31) >= 20)
                    i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                var l43 = mp.maps.getBGCode(l20 + 15, i21 + 31);
                if((l43 === 18 || l43 === 19) && i21 >= mp.getSakamichiY(l20 + 15, i21 + 31))
                {
                    i21 = mp.getSakamichiY(l20 + 15, i21 + 31);
                    var l34 = Math.abs(rightShiftIgnoreSign(i21 + 15, 5) - rightShiftIgnoreSign(mp.co_j.y + 15, 5));
                    if(l34 <= 1 || l34 >= 5)
                    {
                        if(l20 > mp.co_j.x)
                        {
                            characterobject.muki = 0;
                            characterobject.c = 1200;
                        } else
                        {
                            characterobject.muki = 1;
                            characterobject.c = 1210;
                        }
                    } else
                    if(l20 < mp.co_j.x)
                    {
                        characterobject.muki = 0;
                        characterobject.c = 1200;
                    } else
                    {
                        characterobject.muki = 1;
                        characterobject.c = 1210;
                    }
                    characterobject.pt = 140 + mp.g_ac;
                    characterobject.pth = characterobject.muki;

                    characterobject.x = l20;
                    characterobject.y = i21;
                    return true;
                }
                if(rightShiftIgnoreSign(i21, 5) * 32 === i21)
                {
                    if(mp.maps.getBGCode(l20 + 15, i21 + 15) === 10 && i21 > mp.co_j.y)
                    {
                        characterobject.c = 1230;
                        characterobject.pt = 140 + mp.g_ac;
                        characterobject.pth = characterobject.muki;
                        var k19 = 0;
                        do
                        {
                            if(k19 > mp.t_kazu)
                                break;
                            if(mp.co_t[k19].c === 1220 && k19 !== i && Math.abs(mp.co_t[k19].x - l20) < 32 && Math.abs(i21 - 4 - mp.co_t[k19].y) < 32)
                            {
                                i21 = characterobject.y;
                                characterobject.c = 1220;
                                break;
                            }
                            k19++;
                        } while(true);

                        characterobject.x = l20;
                        characterobject.y = i21;
                        return true;
                    }
                    var i44 = mp.maps.getBGCode(l20, i21 + 32);
                    if(i44 >= 20)
                    {
                        i21 = rightShiftIgnoreSign(i21 + 32, 5) * 32 - 32;
                        var i35 = Math.abs(rightShiftIgnoreSign(i21 + 15, 5) - rightShiftIgnoreSign(mp.co_j.y + 15, 5));
                        if(i35 <= 1 || i35 >= 5)
                        {
                            if(l20 > mp.co_j.x)
                            {
                                characterobject.muki = 0;
                                characterobject.c = 1200;
                            } else
                            {
                                characterobject.muki = 1;
                                characterobject.c = 1210;
                            }
                        } else
                        if(l20 < mp.co_j.x)
                        {
                            characterobject.muki = 0;
                            characterobject.c = 1200;
                        } else
                        {
                            characterobject.muki = 1;
                            characterobject.c = 1210;
                        }
                        var j31 = rightShiftIgnoreSign(characterobject.x + 15, 5);
                        i35 = rightShiftIgnoreSign(characterobject.y + 15, 5);
                        if(i35 < rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                        {
                            var k13 = 1;
                            do
                            {
                                if(k13 > 31 || j31 + k13 >= mp.mapWidth || mp.maps.map_bg[j31 + k13][i35] >= 19)
                                    break;
                                if(mp.maps.map_bg[j31 + k13][i35 + 1] <= 10 || mp.maps.map_bg[j31 + k13][i35 + 1] === 15)
                                {
                                    characterobject.c = 1210;
                                    characterobject.muki = 1;
                                    break;
                                }
                                k13++;
                            } while(true);
                        } else
                        if(i35 > rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                        {
                            var l13 = 1;
                            do
                            {
                                if(l13 > 31 || j31 + l13 >= mp.mapWidth || mp.maps.map_bg[j31 + l13][i35] >= 19)
                                    break;
                                if(mp.maps.map_bg[j31 + l13][i35] === 10)
                                {
                                    characterobject.c = 1210;
                                    characterobject.muki = 1;
                                    break;
                                }
                                l13++;
                            } while(true);
                        }
                        j31 = rightShiftIgnoreSign(characterobject.x + 15, 5);
                        i35 = rightShiftIgnoreSign(characterobject.y + 15, 5);
                        if(i35 < rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                        {
                            var i14 = 1;
                            do
                            {
                                if(i14 > 31 || j31 - i14 <= 0 || mp.maps.map_bg[j31 - i14][i35] >= 20 || mp.maps.map_bg[j31 - i14][i35] === 18)
                                    break;
                                if(mp.maps.map_bg[j31 - i14][i35 + 1] <= 10 || mp.maps.map_bg[j31 - i14][i35 + 1] === 15)
                                {
                                    characterobject.c = 1200;
                                    characterobject.muki = 0;
                                    break;
                                }
                                i14++;
                            } while(true);
                        } else
                        if(i35 > rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                        {
                            var j14 = 1;
                            do
                            {
                                if(j14 > 31 || j31 - j14 <= 0 || mp.maps.map_bg[j31 - j14][i35] >= 20 || mp.maps.map_bg[j31 - j14][i35] === 18)
                                    break;
                                if(mp.maps.map_bg[j31 - j14][i35] === 10)
                                {
                                    characterobject.c = 1200;
                                    characterobject.muki = 0;
                                    break;
                                }
                                j14++;
                            } while(true);
                        }
                    } else
                    if((i44 === 15 || i44 === 10 || mp.maps.getBGCode(l20 + 15, i21 + 15) === 10) && rightShiftIgnoreSign(i21 + 15, 5) >= rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                    {
                        i21 = rightShiftIgnoreSign(i21 + 32, 5) * 32 - 32;
                        var j35 = Math.abs(rightShiftIgnoreSign(i21 + 15, 5) - rightShiftIgnoreSign(mp.co_j.y + 15, 5));
                        if(j35 <= 1 || j35 >= 5)
                        {
                            if(l20 > mp.co_j.x)
                            {
                                characterobject.muki = 0;
                                characterobject.c = 1200;
                            } else
                            {
                                characterobject.muki = 1;
                                characterobject.c = 1210;
                            }
                        } else
                        if(l20 < mp.co_j.x)
                        {
                            characterobject.muki = 0;
                            characterobject.c = 1200;
                        } else
                        {
                            characterobject.muki = 1;
                            characterobject.c = 1210;
                        }
                        var k31 = rightShiftIgnoreSign(characterobject.x + 15, 5);
                        j35 = rightShiftIgnoreSign(characterobject.y + 15, 5);
                        if(j35 < rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                        {
                            var k14 = 1;
                            do
                            {
                                if(k14 > 31 || k31 + k14 >= mp.mapWidth || mp.maps.map_bg[k31 + k14][j35] >= 19)
                                    break;
                                if(mp.maps.map_bg[k31 + k14][j35 + 1] <= 10 || mp.maps.map_bg[k31 + k14][j35 + 1] === 15)
                                {
                                    characterobject.c = 1210;
                                    characterobject.muki = 1;
                                    break;
                                }
                                k14++;
                            } while(true);
                        } else
                        if(j35 > rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                        {
                            var l14 = 1;
                            do
                            {
                                if(l14 > 31 || k31 + l14 >= mp.mapWidth || mp.maps.map_bg[k31 + l14][j35] >= 19)
                                    break;
                                if(mp.maps.map_bg[k31 + l14][j35] === 10)
                                {
                                    characterobject.c = 1210;
                                    characterobject.muki = 1;
                                    break;
                                }
                                l14++;
                            } while(true);
                        }
                        k31 = rightShiftIgnoreSign(characterobject.x + 15, 5);
                        j35 = rightShiftIgnoreSign(characterobject.y + 15, 5);
                        if(j35 < rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                        {
                            var i15 = 1;
                            do
                            {
                                if(i15 > 31 || k31 - i15 <= 0 || mp.maps.map_bg[k31 - i15][j35] >= 20 || mp.maps.map_bg[k31 - i15][j35] === 18)
                                    break;
                                if(mp.maps.map_bg[k31 - i15][j35 + 1] <= 10 || mp.maps.map_bg[k31 - i15][j35 + 1] === 15)
                                {
                                    characterobject.c = 1200;
                                    characterobject.muki = 0;
                                    break;
                                }
                                i15++;
                            } while(true);
                        } else
                        if(j35 > rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                        {
                            var j15 = 1;
                            do
                            {
                                if(j15 > 31 || k31 - j15 <= 0 || mp.maps.map_bg[k31 - j15][j35] >= 20 || mp.maps.map_bg[k31 - j15][j35] === 18)
                                    break;
                                if(mp.maps.map_bg[k31 - j15][j35] === 10)
                                {
                                    characterobject.c = 1200;
                                    characterobject.muki = 0;
                                    break;
                                }
                                j15++;
                            } while(true);
                        }
                    } else
                    if(i44 <= 9)
                    {
                        var flag7 = false;
                        for(var k15 = 0; k15 <= 11; k15++)
                        {
                            if(mp.ana_c[k15] <= 0 || mp.ana_x[k15] * 32 !== l20 || i21 + 32 !== mp.ana_y[k15] * 32)
                                continue;
                            var l19 = 0;
                            do
                            {
                                if(l19 > mp.t_kazu)
                                    break;
                                if((mp.co_t[l19].c >= 1200 && mp.co_t[l19].c < 1300 || mp.co_t[l19].c == 60) && l19 !== i && l20 === mp.co_t[l19].x && i21 <= mp.co_t[l19].y && i21 + 32 >= mp.co_t[l19].y)
                                {
                                    flag7 = true;
                                    break;
                                }
                                l19++;
                            } while(true);
                            if(flag7)
                                break;
                        }

                        if(flag7)
                        {
                            var k35 = Math.abs(rightShiftIgnoreSign(i21 + 15, 5) - rightShiftIgnoreSign(mp.co_j.y + 15, 5));
                            if(k35 <= 1 || k35 >= 5)
                            {
                                if(l20 > mp.co_j.x)
                                    characterobject.c = 1200;
                                else
                                    characterobject.c = 1210;
                            } else
                            if(l20 < mp.co_j.x)
                                characterobject.c = 1200;
                            else
                                characterobject.c = 1210;
                        }
                    }
                    if(characterobject.c === 1210 && (mp.maps.getBGCode(characterobject.x + 32, characterobject.y + 15) >= 20 || mp.maps.getBGCode(characterobject.x + 32, characterobject.y + 15) === 18))
                    {
                        characterobject.c = 1200;
                        characterobject.muki = 0;
                        if(Math.abs(i21 - mp.co_j.y) < 32 && l20 < mp.co_j.x)
                        {
                            characterobject.c = 1210;
                            characterobject.muki = 1;
                        }
                    } else
                    if(characterobject.c === 1200 && mp.maps.getBGCode(characterobject.x - 1, characterobject.y + 15) >= 19)
                    {
                        characterobject.c = 1210;
                        characterobject.muki = 1;
                        if(Math.abs(i21 - mp.co_j.y) < 32 && l20 > mp.co_j.x)
                        {
                            characterobject.c = 1200;
                            characterobject.muki = 0;
                        }
                    }
                    if(rightShiftIgnoreSign(i21, 5) * 32 === i21)
                    {
                        for(var l15 = 0; l15 <= 11; l15++)
                            if(mp.ana_c[l15] > 0 && mp.ana_x[l15] * 32 === l20 && mp.ana_y[l15] * 32 == i21)
                            {
                                characterobject.c = 1250;
                                characterobject.c1 = 0;
                            }

                    }
                }
                if((characterobject.c === 1200 || characterobject.c == 1210) && Math.abs(l20 - mp.co_j.x) <= 32 && Math.abs(i21 - mp.co_j.y) <= 32 && !mp.co_j.jimen_f && !mp.j_hashigo_f)
                    characterobject.c = 1220;
                if(Math.abs(mp.co_j.x - characterobject.x) <= 24 && mp.co_j.y + 32 === characterobject.y && mp.co_j.c !== 130 && (rightShiftIgnoreSign(mp.co_j.y, 5) * 32 !== mp.co_j.y || mp.maps.getBGCode(mp.co_j.x + 15, mp.co_j.y + 32) !== 15) && !mp.j_hashigo_f)
                {
                    mp.co_j.y = i21 - 32;
                    if(mp.maps.getBGCode(mp.co_j.x + 15, mp.co_j.y + 31) >= 20)
                        mp.co_j.y = rightShiftIgnoreSign(mp.co_j.y + 31, 5) * 32 - 32;
                }
                if(i21 >= mp.maps.wy_max + 320)
                {
                    characterobject.c = 60;
                    characterobject.c1 = 0;
                }
                characterobject.pt = 140 + mp.g_ac;
                characterobject.pth = characterobject.muki;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if (characterobject.c === 1230) {
                // 上方向へ移動
                characterobject.direction = 2;
                if(l20 < mp.co_j.x)
                    characterobject.muki = 1;
                else
                if(l20 > mp.co_j.x)
                    characterobject.muki = 0;
                if(i21 + 20 <= mp.co_j.y)
                {
                    characterobject.c = 1220;
                    characterobject.pt = 140 + mp.g_ac;
                    characterobject.pth = characterobject.muki;
                } else
                {
                    i21 -= 4;
                    var flag8 = false;
                    for(var i20 = 0; i20 <= mp.t_kazu; i20++)
                    {
                        if((mp.co_t[i20].c < 1200 || mp.co_t[i20].c >= 1300) && mp.co_t[i20].c !== 60 || i20 === i || Math.abs(mp.co_t[i20].x - l20) >= 32 || Math.abs(mp.co_t[i20].y - i21) >= 32)
                            continue;
                        if(mp.co_t[i20].c === 1220)
                        {
                            characterobject.c = 1220;
                            i21 = characterobject.y;
                            flag8 = true;
                            break;
                        }
                        if(mp.co_t[i20].y < characterobject.y)
                        {
                            i21 = characterobject.y;
                            flag8 = true;
                            break;
                        }
                        if(mp.co_t[i20].y !== characterobject.y || i20 >= i)
                            continue;
                        i21 = characterobject.y;
                        flag8 = true;
                        break;
                    }

                    if(flag8)
                    {
                        characterobject.pt = 140 + mp.g_ac;
                        characterobject.pth = characterobject.muki;
                    } else
                    {
                        if(mp.maps.getBGCode(l20, i21) >= 18)
                            i21 = rightShiftIgnoreSign(i21, 5) * 32 + 32;
                        if(rightShiftIgnoreSign(i21, 5) * 32 === i21)
                            if(mp.maps.getBGCode(l20 + 15, i21 + 15) !== 10 || mp.maps.getBGCode(l20 + 15, i21 - 1) >= 20)
                            {
                                var l35 = Math.abs(rightShiftIgnoreSign(i21 + 15, 5) - rightShiftIgnoreSign(mp.co_j.y + 15, 5));
                                if(l35 <= 1 || l35 >= 5)
                                {
                                    if(l20 > mp.co_j.x)
                                        characterobject.c = 1200;
                                    else
                                        characterobject.c = 1210;
                                } else
                                if(l20 < mp.co_j.x)
                                    characterobject.c = 1200;
                                else
                                    characterobject.c = 1210;
                                var l31 = rightShiftIgnoreSign(characterobject.x + 15, 5);
                                l35 = rightShiftIgnoreSign(characterobject.y + 15, 5);
                                if(l35 < rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                                {
                                    var i16 = 1;
                                    do
                                    {
                                        if(i16 > 31 || l31 + i16 >= mp.mapWidth || mp.maps.map_bg[l31 + i16][l35] >= 19)
                                            break;
                                        if(mp.maps.map_bg[l31 + i16][l35 + 1] <= 10 || mp.maps.map_bg[l31 + i16][l35 + 1] === 15)
                                        {
                                            characterobject.c = 1210;
                                            break;
                                        }
                                        i16++;
                                    } while(true);
                                } else
                                if(l35 > rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                                {
                                    var j16 = 1;
                                    do
                                    {
                                        if(j16 > 31 || l31 + j16 >= mp.mapWidth || mp.maps.map_bg[l31 + j16][l35] >= 19)
                                            break;
                                        if(mp.maps.map_bg[l31 + j16][l35] === 10)
                                        {
                                            characterobject.c = 1210;
                                            break;
                                        }
                                        j16++;
                                    } while(true);
                                }
                                l31 = rightShiftIgnoreSign(characterobject.x + 15, 5);
                                l35 = rightShiftIgnoreSign(characterobject.y + 15, 5);
                                if(l35 < rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                                {
                                    var k16 = 1;
                                    do
                                    {
                                        if(k16 > 31 || l31 - k16 <= 0 || mp.maps.map_bg[l31 - k16][l35] >= 20 || mp.maps.map_bg[l31 - k16][l35] === 18)
                                            break;
                                        if(mp.maps.map_bg[l31 - k16][l35 + 1] <= 10 || mp.maps.map_bg[l31 - k16][l35 + 1] === 15)
                                        {
                                            characterobject.c = 1200;
                                            break;
                                        }
                                        k16++;
                                    } while(true);
                                } else
                                if(l35 > rightShiftIgnoreSign(mp.co_j.y + 15, 5))
                                {
                                    var l16 = 1;
                                    do
                                    {
                                        if(l16 > 31 || l31 - l16 <= 0 || mp.maps.map_bg[l31 - l16][l35] >= 20 || mp.maps.map_bg[l31 - l16][l35] === 18)
                                            break;
                                        if(mp.maps.map_bg[l31 - l16][l35] === 10)
                                        {
                                            characterobject.c = 1200;
                                            break;
                                        }
                                        l16++;
                                    } while(true);
                                }
                            } else
                            if(Math.abs(i21 - mp.co_j.y) < 32)
                            {
                                if(l20 > mp.co_j.x)
                                {
                                    characterobject.muki = 0;
                                    characterobject.c = 1200;
                                } else
                                {
                                    characterobject.muki = 1;
                                    characterobject.c = 1210;
                                }
                            }
                        if((characterobject.c === 1200 || characterobject.c === 1210) && Math.abs(l20 - mp.co_j.x) <= 32 && Math.abs(i21 - mp.co_j.y) <= 32 && !mp.co_j.jimen_f && !mp.j_hashigo_f)
                            characterobject.c = 1230;
                        characterobject.pt = 140 + mp.g_ac;
                        characterobject.pth = characterobject.muki;
                    }
                }

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if (characterobject.c === 1250) {
                if(characterobject.c1 <= 75)
                {
                    characterobject.c1++;
                    characterobject.pt = 140;
                    characterobject.pth = characterobject.muki;
                } else
                {
                    characterobject.c = 1260;
                    characterobject.pt = 140 + mp.g_ac;
                    characterobject.pth = characterobject.muki;
                }
                return true;
            } else if (characterobject.c === 1260) {
                if(rightShiftIgnoreSign(i21 -= 4, 5) * 32 === i21)
                {
                    if(characterobject.muki === 0)
                        characterobject.c = 1200;
                    else
                        characterobject.c = 1210;
                    var j36 = Math.abs(rightShiftIgnoreSign(i21 + 15, 5) - rightShiftIgnoreSign(mp.co_j.y + 15, 5));
                    if(j36 <= 1 || j36 >= 5)
                    {
                        if(l20 > mp.co_j.x)
                        {
                            characterobject.muki = 0;
                            characterobject.c = 1200;
                        } else
                        {
                            characterobject.muki = 1;
                            characterobject.c = 1210;
                        }
                    } else
                    if(l20 < mp.co_j.x)
                    {
                        characterobject.muki = 0;
                        characterobject.c = 1200;
                    } else
                    {
                        characterobject.muki = 1;
                        characterobject.c = 1210;
                    }
                    if(mp.maps.getBGCode(l20 + 15, i21 + 15) >= 20)
                    {
                        characterobject.c = 60;
                        characterobject.c1 = 0;
                        mp.gs.rsAddSound(19);
                    }
                }
                characterobject.pt = 140 + mp.g_ac;
                characterobject.pth = characterobject.muki;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            }
            return false;
        };
    },
};

/**
 * 重力無視の追跡ピカチー等
 */
EnemyController.PikachieChaser = {
    properties: {
        // 移動速度
        speed: 4,
    },
    initFactory: function(enemyCode, properties) {
        return function(characterobject, mp) {
            characterobject.c = 1430;
            // パターン画像が1匹ごとに変わる（3種類まで）
            characterobject.c2 = mp.tpika_p;
            mp.tpika_p++;
            if (mp.tpika_p > 2) {
                mp.tpika_p = 2;
            }
        };
    },
    controllerFactory: function(properties) {
        return function(characterobject, mp, i) {
            var l20 = characterobject.x;
            var i21 = characterobject.y;

            if (characterobject.c === 1400) {
                l20 -= properties.speed;
                characterobject.muki = 0;
                if(mp.maps.getBGCode(l20, i21 + 15) >= 20)
                    l20 = rightShiftIgnoreSign(l20, 5) * 32 + 32;
                if(l20 % 32 === 0)
                    if(characterobject.c2 === 0)
                    {
                        if(l20 - 32 >= mp.co_j.x && mp.maps.getBGCode(l20 - 1, i21 + 15) < 20)
                            characterobject.c = 1400;
                        else
                        if(i21 - 32 >= mp.co_j.y && mp.maps.getBGCode(l20 + 15, i21 - 1) < 20)
                            characterobject.c = 1420;
                        else
                        if(i21 + 32 <= mp.co_j.y && mp.maps.getBGCode(l20 + 15, i21 + 32) < 20)
                            characterobject.c = 1430;
                        else
                        if(mp.maps.getBGCode(l20 - 1, i21 + 15) < 20)
                            characterobject.c = 1400;
                        else
                        if(mp.maps.getBGCode(l20 + 15, i21 - 1) < 20)
                            characterobject.c = 1420;
                        else
                            characterobject.c = 1430;
                    } else
                    if(characterobject.c2 === 1)
                    {
                        if(i21 - 32 >= mp.co_j.y && mp.maps.getBGCode(l20 + 15, i21 - 1) < 20)
                            characterobject.c = 1420;
                        else
                        if(i21 + 32 <= mp.co_j.y && mp.maps.getBGCode(l20 + 15, i21 + 32) < 20)
                            characterobject.c = 1430;
                        else
                        if(mp.maps.getBGCode(l20 - 1, i21 + 15) < 20)
                            characterobject.c = 1400;
                        else
                            characterobject.c = 1410;
                    } else
                    if(characterobject.c2 === 2)
                        if(mp.maps.getBGCode(l20 + 15, i21 - 1) < 20 && mp.ranInt(2) === 0)
                            characterobject.c = 1420;
                        else
                        if(mp.maps.getBGCode(l20 + 15, i21 + 32) < 20 && mp.ranInt(2) === 0)
                            characterobject.c = 1430;
                        else
                        if(mp.maps.getBGCode(l20 - 1, i21 + 15) < 20)
                            characterobject.c = 1400;
                        else
                            characterobject.c = 1410;
                characterobject.pt = 143 + mp.g_ac;
                characterobject.pth = characterobject.muki;
                if(characterobject.c2 === 1)
                    characterobject.pt = 152 + mp.g_ac;
                else
                if(characterobject.c2 === 2)
                    characterobject.pt = 155 + mp.g_ac;
                characterobject.direction = 0;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if (characterobject.c === 1410) {
                // 右へ移動
                l20 += properties.speed;
                characterobject.muki = 1;
                if(mp.maps.getBGCode(l20 + 31, i21 + 15) >= 20)
                    l20 = rightShiftIgnoreSign(l20 + 31, 5) * 32 - 32;
                if(l20 % 32 === 0)
                    if(characterobject.c2 === 0)
                    {
                        if(l20 + 32 <= mp.co_j.x && mp.maps.getBGCode(l20 + 32, i21 + 15) < 20)
                            characterobject.c = 1410;
                        else
                        if(i21 - 32 >= mp.co_j.y && mp.maps.getBGCode(l20 + 15, i21 - 1) < 20)
                            characterobject.c = 1420;
                        else
                        if(i21 + 32 <= mp.co_j.y && mp.maps.getBGCode(l20 + 15, i21 + 32) < 20)
                            characterobject.c = 1430;
                        else
                        if(mp.maps.getBGCode(l20 + 32, i21 + 15) < 20)
                            characterobject.c = 1410;
                        else
                        if(mp.maps.getBGCode(l20 + 15, i21 - 1) < 20)
                            characterobject.c = 1420;
                        else
                            characterobject.c = 1430;
                    } else
                    if(characterobject.c2 === 1)
                    {
                        if(i21 - 32 >= mp.co_j.y && mp.maps.getBGCode(l20 + 15, i21 - 1) < 20)
                            characterobject.c = 1420;
                        else
                        if(i21 + 32 <= mp.co_j.y && mp.maps.getBGCode(l20 + 15, i21 + 32) < 20)
                            characterobject.c = 1430;
                        else
                        if(mp.maps.getBGCode(l20 + 32, i21 + 15) < 20)
                            characterobject.c = 1410;
                        else
                            characterobject.c = 1400;
                    } else
                    if(characterobject.c2 === 2)
                        if(mp.maps.getBGCode(l20 + 15, i21 - 1) < 20 && mp.ranInt(2) === 0)
                            characterobject.c = 1420;
                        else
                        if(mp.maps.getBGCode(l20 + 15, i21 + 32) < 20 && mp.ranInt(2) === 0)
                            characterobject.c = 1430;
                        else
                        if(mp.maps.getBGCode(l20 + 32, i21 + 15) < 20)
                            characterobject.c = 1410;
                        else
                            characterobject.c = 1400;
                characterobject.pt = 143 + mp.g_ac;
                characterobject.pth = characterobject.muki;
                if(characterobject.c2 === 1)
                    characterobject.pt = 152 + mp.g_ac;
                else
                if(characterobject.c2 === 2)
                    characterobject.pt = 155 + mp.g_ac;
                characterobject.direction = 1;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if (characterobject.c === 1420) {
                // 上へ移動
                i21 -= properties.speed;
                if(mp.maps.getBGCode(l20 + 15, i21) >= 20)
                    i21 = rightShiftIgnoreSign(i21, 5) * 32 + 32;
                if(i21 % 32 === 0)
                    if(characterobject.c2 === 0)
                    {
                        if(l20 - 32 >= mp.co_j.x && mp.maps.getBGCode(l20 - 1, i21 + 15) < 20)
                            characterobject.c = 1400;
                        else
                        if(l20 + 32 <= mp.co_j.x && mp.maps.getBGCode(l20 + 32, i21 + 15) < 20)
                            characterobject.c = 1410;
                        else
                        if(mp.maps.getBGCode(l20 + 15, i21 - 1) < 20)
                            characterobject.c = 1420;
                        else
                            characterobject.c = 1430;
                    } else
                    if(characterobject.c2 === 1)
                    {
                        if(i21 - 32 >= mp.co_j.y && mp.maps.getBGCode(l20 + 15, i21 - 1) < 20)
                            characterobject.c = 1420;
                        else
                        if(l20 - 32 >= mp.co_j.x && mp.maps.getBGCode(l20 - 1, i21 + 15) < 20)
                            characterobject.c = 1400;
                        else
                        if(l20 + 32 <= mp.co_j.x && mp.maps.getBGCode(l20 + 32, i21 + 15) < 20)
                            characterobject.c = 1410;
                        else
                        if(mp.maps.getBGCode(l20 + 15, i21 - 1) < 20)
                            characterobject.c = 1420;
                        else
                        if(mp.maps.getBGCode(l20 - 1, i21 + 15) < 20)
                            characterobject.c = 1400;
                        else
                            characterobject.c = 1410;
                    } else
                    if(characterobject.c2 === 2)
                        if(mp.maps.getBGCode(l20 - 1, i21 + 15) < 20 && mp.ranInt(2) === 0)
                            characterobject.c = 1400;
                        else
                        if(mp.maps.getBGCode(l20 + 32, i21 + 15) < 20 && mp.ranInt(2) === 0)
                            characterobject.c = 1410;
                        else
                        if(mp.maps.getBGCode(l20 + 15, i21 - 1) < 20)
                            characterobject.c = 1420;
                        else
                            characterobject.c = 1430;
                characterobject.pt = 143 + mp.g_ac;
                characterobject.pth = characterobject.muki;
                if(characterobject.c2 === 1)
                    characterobject.pt = 152 + mp.g_ac;
                else
                if(characterobject.c2 === 2)
                    characterobject.pt = 155 + mp.g_ac;
                characterobject.direction = 2;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            } else if (characterobject.c === 1430) {
                // 下へ移動
                i21 += properties.speed;
                if(mp.maps.getBGCode(l20 + 15, i21 + 31) >= 20)
                    i21 = rightShiftIgnoreSign(i21 + 31, 5) * 32 - 32;
                if(i21 % 32 === 0)
                    if(characterobject.c2 === 0)
                    {
                        if(l20 - 32 >= mp.co_j.x && mp.maps.getBGCode(l20 - 1, i21 + 15) < 20)
                            characterobject.c = 1400;
                        else
                        if(l20 + 32 <= mp.co_j.x && mp.maps.getBGCode(l20 + 32, i21 + 15) < 20)
                            characterobject.c = 1410;
                        else
                        if(mp.maps.getBGCode(l20 + 15, i21 + 32) < 20)
                            characterobject.c = 1430;
                        else
                            characterobject.c = 1420;
                    } else
                    if(characterobject.c2 === 1)
                    {
                        if(i21 + 32 <= mp.co_j.y && mp.maps.getBGCode(l20 + 15, i21 + 32) < 20)
                            characterobject.c = 1430;
                        else
                        if(l20 - 32 >= mp.co_j.x && mp.maps.getBGCode(l20 - 1, i21 + 15) < 20)
                            characterobject.c = 1400;
                        else
                        if(l20 + 32 <= mp.co_j.x && mp.maps.getBGCode(l20 + 32, i21 + 15) < 20)
                            characterobject.c = 1410;
                        else
                        if(mp.maps.getBGCode(l20 + 15, i21 + 32) < 20)
                            characterobject.c = 1430;
                        else
                        if(mp.maps.getBGCode(l20 - 1, i21 + 15) < 20)
                            characterobject.c = 1400;
                        else
                            characterobject.c = 1410;
                    } else
                    if(characterobject.c2 === 2)
                        if(mp.maps.getBGCode(l20 - 1, i21 + 15) < 20 && mp.ranInt(2) === 0)
                            characterobject.c = 1400;
                        else
                        if(mp.maps.getBGCode(l20 + 32, i21 + 15) < 20 && mp.ranInt(2) === 0)
                            characterobject.c = 1410;
                        else
                        if(mp.maps.getBGCode(l20 + 15, i21 + 32) < 20)
                            characterobject.c = 1430;
                        else
                            characterobject.c = 1420;
                characterobject.pt = 143 + mp.g_ac;
                characterobject.pth = characterobject.muki;
                if(characterobject.c2 === 1)
                    characterobject.pt = 152 + mp.g_ac;
                else
                if(characterobject.c2 === 2)
                    characterobject.pt = 155 + mp.g_ac;
                characterobject.direction = 3;

                characterobject.x = l20;
                characterobject.y = i21;
                return true;
            }
            return false;
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
    // 亀（ボスに投げられた亀）
    150: EnemyController.TurtleFall,
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
    // チコリン（はっぱカッター 乱れ打ち）
    320: EnemyController.ChikorinMidareuchi,
    // チコリン（ソーラービーム）
    330: EnemyController.ChikorinSolarBeam,
    // チコリン（ソーラービーム　右へ発射）
    335: EnemyController.ChikorinSolarBeam,
    // ヒノララシ
    400: EnemyController.Hinorarashi,
    // ヒノララシ（落ちる）
    450: EnemyController.HinorarashiFall,
    // ポッピー（上下移動）
    500: EnemyController.PoppieUpDown,
    // ポッピー（左右移動）
    510: EnemyController.PoppieLeftRight,
    // ポッピー（火の粉）
    520: EnemyController.PoppieFire,
    // ポッピー（火の粉 3連射）
    530: EnemyController.PoppieFire3,
    // ポッピー（バブル光線3発）
    540: EnemyController.PoppieBubble3,
    // ポッピー（バブル光線3発）
    550: EnemyController.PoppieHurricaneBlast,
    // マリリ（ジャンプで進む）
    600: EnemyController.Mariri,
    // マリリ（その場でジャンプ）
    601: EnemyController.Mariri,
    // マリリ（左右にジャンプ）
    602: EnemyController.Mariri,
    // マリリ（敵キャラクターに投げられたやつ）
    650: EnemyController.Mariri,
    // マリリ（左右に移動）
    660: EnemyController.MaririLeftRight,
    // マリリ（体当たり）
    670: EnemyController.MaririTackle,
    // ヤチャモ（火の粉で攻撃）
    700: EnemyController.Yachamo,
    // ヤチャモ（何もしない）
    701: EnemyController.Yachamo,
    // ヤチャモ（グレネード）
    702: EnemyController.Yachamo,
    // ヤチャモ（はっぱカッター3発）
    703: EnemyController.Yachamo,
    // ヤチャモ（プラズマ砲）
    704: EnemyController.Yachamo,
    // ヤチャモ（火の粉 速射）
    710: EnemyController.YachamoFast,
    // ヤチャモ（火の粉 3連射）
    711: EnemyController.YachamoFast,
    // ヤチャモ（破壊光線）
    720: EnemyController.YachamoHyperBeam,
    // ヤチャモ（破壊光線 右へ発射）
    725: EnemyController.YachamoHyperBeam,
    // ミズタロウ（水鉄砲）
    800: EnemyController.Mizutaro,
    // ミズタロウ（はっぱカッター3発）
    801: EnemyController.Mizutaro,
    // ミズタロウ（電撃）
    802: EnemyController.Mizutaro,
    // ミズタロウ（みずでっぽう 水平発射）
    803: EnemyController.Mizutaro,
    // ミズタロウ（ハリケンブラスト）
    804: EnemyController.Mizutaro,
    // エアームズ（壁に当たると止まる）
    900: EnemyController.AirmsStop,
    // エアームズ（その場で爆弾投下）
    920: EnemyController.AirmsStay,
    // エアームズ（その場でグレネード投下）
    921: EnemyController.AirmsStay,
    // エアームズ（左右に動いて爆弾投下）
    930: EnemyController.AirmsStay,
    // エアームズ（壁に当たると向きを変える）
    950: EnemyController.AirmsReturn,
    // タイキング（左右移動　水中専用）
    1000: EnemyController.Taiking,
    // タイキング（はねる）
    1050: EnemyController.TaikingJump,
    // タイキング（縄張りをまもる）
    1060: EnemyController.TaikingTerritory,
    // タイキング（左回り）
    1070: EnemyController.TaikingLeft,
    // タイキング（右回り）
    1080: EnemyController.TaikingRight,
    // クラゲッソ（バブル光線 水中専用）
    1100: EnemyController.Kuragesso,
    // クラゲッソ（近づくと落ちる）
    1150: EnemyController.KuragessoFall,
    // クラゲッソ（縄張りをまもる）
    1160: EnemyController.KuragessoTerritory,
    // クラゲッソ（左回り）
    1170: EnemyController.KuragessoLeft,
    // クラゲッソ（右回り）
    1180: EnemyController.KuragessoRight,
    // 追跡亀
    1200: EnemyController.TurtleChaser,
    // 重力無視の追跡ピカチー等
    1400: EnemyController.PikachieChaser,
};

