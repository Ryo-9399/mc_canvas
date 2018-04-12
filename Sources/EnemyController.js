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
                    if(l20 + 128 + 16 >= mp.co_j.x && l20 + 48 <= mp.co_j.x && Math.abs(i21 - this.co_j.y) <= 10)
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
};

