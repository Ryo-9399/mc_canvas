/*
 * フハハハハ！！　エネミーコントローラー！
 * ライフを1000払い　左 右 A B！
 * @namespace
 */
var EnemyController = {};

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
 * 拡張可能なマップチップコードの一覧
 */
EnemyController.available = {
    // ピカチー（電撃）
    200: EnemyController.Pikachie,
    // ピカチー（みずでっぽう 水平発射）
    201: EnemyController.Pikachie,
    // ピカチー（みずでっぽう 電撃3発）
    202: EnemyController.Pikachie,
    // ピカチー（みずでっぽう プラズマ砲）
    203: EnemyController.Pikachie,
};

