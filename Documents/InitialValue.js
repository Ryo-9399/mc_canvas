var INITIAL_VALUE = {

	"ゲーム全体の設定" : {

		"stage_max" : {
			value : "1",
			type : "integer 1 4",
			discription :
				"ステージ数"
		},

		"stage_kaishi" : {
			value : "1",
			type : "integer 1 4",
			discription :
				"開始ステージ<br>"+
				"<em>（デバッグ用）<\/em>"
		},

		"jibun_left_shoki" : {
			value : "1",
			type : "integer 1",
			discription :
				"残りの人数"
		},

		"score_1up_1" : {
			value : "500",
			type : "integer 0",
			discription :
				"１ｕｐする得点<br>"+
				"２ステージ以上の構成で有効<br>"+
				"0 だと設定なし"
			,
			rowspan : 2
		},
		"score_1up_2" : {
			value : "1000"
		},

		"stage_select" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"ステージの選択<br>"+
				"1  順番にクリアー<br>"+
				"2  地図画面で選ぶ"
		},

		"url1" : {
			value : "http:\/\/www.yahoo.co.jp\/",
			type : "string",
			discription :
				"リンク土管１の移動先"
		},

		"url2" : {
			value : "http:\/\/www.yahoo.co.jp\/",
			type : "string",
			discription :
				"リンク土管２の移動先"
		},

		"url3" : {
			value : "http:\/\/www.yahoo.co.jp\/",
			type : "string",
			discription :
				"リンク土管３の移動先"
		},

		"url4" : {
			value : "http:\/\/www.t3.rim.or.jp\/~naoto\/naoto.html",
			type : "string",
			discription :
				"リンク土管４の移動先"
		},

		"dokan_mode" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"土管モード<br>"+
				"1  リンク土管<br>"+
				"2  ワープ土管"
		},

		"game_speed" : {
			value : "70",
			type : "integer 10 300",
			discription :
				"ゲームの進行スピード<br>"+
				"  １フレームにおける待ち時間を、設定します。<br>"+
				"  数字が大きいほど遅くなり、<br>"+
				"  デフォルトは、 70 です。"
		},

		"variable_sleep_time" : {
			value : "1",
			discription :
				""
		},

		"sleep_time_visible" : {
			value : "0",
			discription :
				""
		},

		"pause_switch" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"ポーズ機能<br>"+
				"1  使わない<br>"+
				"2  使う"
		},

	},



	"ステージの設定" : {

		"time_max" : {
			value : "300",
			type : "integer 0",
			discription :
				"制限時間<br>"+
				"0 を設定すると無制限"
		},

		"scroll_mode" : {
			value : "1",
			type : "integer 1 3",
			discription :
				"スクロールモード（ステージ１）<br>"+
				"1  全方向スクロール<br>"+
				"2  強制スクロール<br>"+
				"3  高速強制スクロール"
		},

		"scroll_mode_s" : {
			value : "1",
			type : "integer 1 3",
			discription :
				"スクロールモード（ステージ２）"
		},

		"scroll_mode_t" : {
			value : "1",
			type : "integer 1 3",
			discription :
				"スクロールモード（ステージ３）"
		},

		"scroll_mode_f" : {
			value : "1",
			type : "integer 1 3",
			discription :
				"スクロールモード（ステージ４）"
		},

		"scroll_area" : {
			value : "1",
			type : "integer 1 5",
			discription :
				"スクロールする範囲<br>"+
				"1  全部<br>"+
				"2  左下  １画面分<br>"+
				"3  左下  横２画面分<br>"+
				"4  左下  縦２画面分<br>"+
				"5  左下  ４画面分"
		},

		"view_move_type" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"表示領域の動き方<br>"+
				"1  右進行用の視界<br>"+
				"2  左進行用の視界"
		},

		"suberuyuka_hkf" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"すべる床<br>"+
				"1  ドリル等で破壊できる<br>"+
				"2  破壊できない"
		},

		"clear_type" : {
			value : "1",
			type : "integer 1 3",
			discription :
				"ステージクリアー条件<br>"+
				"1  星を取る<br>"+
				"2  コインを全部取ると星出現  星を取る<br>"+
				"3  コインを全部取ると、星の位置に脱出ハシゴ出現。画面の上へ出る。背景レイヤーを表示しても、ハシゴ、坂道、下から通れるブロックを表示します。"
		},

	},



	"主人公の設定" : {

		"easy_mode" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"イージーモード<br>"+
				"1  ノーマルモード<br>"+
				"2  敵の端を踏んでも倒せる"
		},

		"j_tail_type" : {
			value : "1",
			type : "integer 1 3",
			discription :
				"しっぽの特徴<br>"+
				"1  敵を倒せる<br>"+
				"2  ブロック１を壊せる<br>"+
				"3  敵を倒せてブロック１を壊せる"
		},

		"j_tail_hf" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"しっぽの標準装備<br>"+
				"1  しない<br>"+
				"2  する"
		},

		"j_fire_mkf" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"ファイヤーボール<br>"+
				"1  水中で消える<br>"+
				"2  水中でも使える"
		},

		"grenade_type" : {
			value : "1",
			type : "integer 1 9",
			discription :
				"グレネード<br>"+
				"1  グレネード    ボスを倒せる<br>"+
				"2  グレネード    ボスには効かない<br>"+
				"3  エネルギー砲  ボスを倒せる<br>"+
				"4  エネルギー砲  ボスには効かない<br>"+
				"5  プラズマ砲    ボスを倒せる<br>"+
				"6  プラズマ砲    ボスには効かない<br>"+
				"7  夢想封印<br>"+
				"8  ファイヤーボールを発射<br>"+
				"9  ブロック１破壊砲"
		},

		"j_tokugi" : {
			value : "1",
			type : "integer 1 19",
			discription :
				"主人公の特技<br>"+
				"1  なし<br>"+
				"2  落ちるのが遅い<br>"+
				"3  空中で下ボタンを押すと急降下<br>"+
				"4  全速体当たりで敵を倒せる<br>"+
				"5  空中の左右加速度が高い<br>"+
				"6  壁キック<br>"+
				"7  ファイヤーボールが水平に飛ぶ<br>"+
				"8  空中でもう１回ジャンプできる<br>"+
				"9  速く走れる<br>"+
				"10 ジャンプできない<br>"+
				"11 スーパージャンプで高く跳べる<br>"+
				"12 ジャンプできない  Z,X キーで穴掘り<br>"+
				"13 ジャンプできない走れない    穴掘り<br>"+
				"14 横スクロールシューティングゲーム用<br>"+
				"15 ４方向移動<br>"+
				"16 壁ジャンプ<br>"+
				"17 ＨＰ３  １ｕｐキノコで回復<br>"+
				"18 ひたすら右へ歩く<br>"+
				"19 ひたすら右へ走る"
		},

		"j_fire_equip" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"ファイヤーボールの標準装備<br>"+
				"1  しない<br>"+
				"2  する"
		},

		"j_fire_type" : {
			value : "1",
			type : "integer 1 4",
			discription :
				"ファイヤーボールの種類（初期値）<br>"+
				"1  跳ねる<br>"+
				"2  水平に飛ぶ<br>"+
				"3  水平に飛ぶ  短射程<br>"+
				"4  ダブル"
		},

		"j_enemy_press" : {
			value : "1",
			type : "integer 1 3",
			discription :
				"雑魚敵を踏めるか<br>"+
				"1  踏める<br>"+
				"2  踏めない<br>"+
				"3  当たり判定なし"
		},

		"j_add_tokugi" : {
			value : "1",
			type : "integer 1 30",
			discription :
				"追加用の主人公特技<br>"+
				"1   なし<br>"+
				"2   ドリル<br>"+
				"3   落ちるのが遅い<br>"+
				"4   下キーを押すと急降下<br>"+
				"5   全速体当たりで敵を倒せる<br>"+
				"6   空中の左右加速度が高い<br>"+
				"7   速く走れる<br>"+
				"8   走れない<br>"+
				"9   空中でもう１回ジャンプできる<br>"+
				"10  壁キック<br>"+
				"11  壁ジャンプ<br>"+
				"12  ジャンプ時にファイヤーボールが出ない<br>"+
				"13  ジャンプの高さを固定  小<br>"+
				"14  ジャンプの高さを固定  小中<br>"+
				"15  ジャンプの高さを固定  中<br>"+
				"16  ジャンプの高さを固定  大<br>"+
				"17  しっぽ 敵を倒せる<br>"+
				"18  しっぽ ブロック１を壊せる<br>"+
				"19  しっぽ 敵を倒せてブロック１を壊せる<br>"+
				"20  ファイヤーボール 跳ねる<br>"+
				"21  ファイヤーボール 水平に飛ぶ<br>"+
				"22  ファイヤーボール ダブル<br>"+
				"23  ファイヤーボール 水平に飛ぶ 短射程<br>"+
				"24  ファイヤーボール ホーミングアミュレット<br>"+
				"25  昇龍拳（効果音はジェット）（↑キーを押しながらＺキー）<br>"+
				"26  サイコクラッシャーアタック（効果音は噴火）（↓キーを押しながらＺキー）<br>"+
				"27  ロケット頭突き（効果音はグレネード）（↓キーを押しながらＺキー）<br>"+
				"28  スカイアッパー（効果音はグレネード）（↑キーを押しながらＺキー）<br>"+
				"29  流星キック（効果音は水の波動）（空中で↓キー）<br>"+
				"30  ヘルメット"
			,
			rowspan : 4
		},
		"j_add_tokugi2" : {
			value : "1"
		},
		"j_add_tokugi3" : {
			value : "1"
		},
		"j_add_tokugi4" : {
			value : "1"
		},

	},



	"敵の設定" : {

		"dengeki_mkf" : {
			value : "1",
			type : "integer 1 5",
			discription :
				"ピカチー<br>"+
				"1  電撃  水中で消える<br>"+
				"2  電撃  水中でも使える<br>"+
				"3  みずでっぽう  水平発射<br>"+
				"4  電撃３発<br>"+
				"5  プラズマ砲"
		},

		"yachamo_kf" : {
			value : "1",
			type : "integer 1 9",
			discription :
				"ヤチャモ<br>"+
				"1  火の粉で攻撃<br>"+
				"2  何もしない<br>"+
				"3  グレネード<br>"+
				"4  はっぱカッター３発<br>"+
				"5  プラズマ砲<br>"+
				"6  火の粉  速射<br>"+
				"7  火の粉  ３連射<br>"+
				"8  破壊光線<br>"+
				"9  破壊光線  右へ発射"
		},

		"airms_kf" : {
			value : "1",
			type : "integer 1 5",
			discription :
				"エアームズ<br>"+
				"1  壁に当たると止まる<br>"+
				"2  壁に当たると向きを変える<br>"+
				"3  その場で爆弾投下<br>"+
				"4  その場でグレネード投下<br>"+
				"5  左右に動いて爆弾投下"
		},

		"mizutaro_attack" : {
			value : "1",
			type : "integer 1 5",
			discription :
				"ミズタロウ<br>"+
				"1  みずでっぽう<br>"+
				"2  はっぱカッター３発<br>"+
				"3  電撃<br>"+
				"4  みずでっぽう  水平発射<br>"+
				"5  ハリケンブラスト"
		},

		"poppie_attack" : {
			value : "1",
			type : "integer 1 5",
			discription :
				"ポッピー直進<br>"+
				"1  直進<br>"+
				"2  火の粉<br>"+
				"3  火の粉  ３連射<br>"+
				"4  バブル光線３発<br>"+
				"5  ハリケンブラスト"
		},

		"mariri_attack" : {
			value : "1",
			type : "integer 1 5",
			discription :
				"マリリ<br>"+
				"1  ジャンプで進む<br>"+
				"2  その場でジャンプ<br>"+
				"3  左右にジャンプ<br>"+
				"4  左右移動<br>"+
				"5  体当たり"
		},

		"chikorin_attack" : {
			value : "1",
			type : "integer 1 9",
			discription :
				"チコリン<br>"+
				"1  はっぱカッター<br>"+
				"2  ヒノララシを８匹投げる<br>"+
				"3  ヒノララシを無限に投げる<br>"+
				"4  マリリを８匹投げる<br>"+
				"5  マリリを無限に投げる<br>"+
				"6  はっぱカッター  地形で消える<br>"+
				"7  はっぱカッター  乱れ射ち<br>"+
				"8  ソーラービーム<br>"+
				"9  ソーラービーム  右へ発射"
		},

		"taiking_attack" : {
			value : "1",
			type : "integer 1 5",
			discription :
				"タイキング<br>"+
				"1  左右移動  水中専用<br>"+
				"2  はねる<br>"+
				"3  縄張りをまもる<br>"+
				"4  左回り<br>"+
				"5  右回り"
		},

		"kuragesso_attack" : {
			value : "1",
			type : "integer 1 5",
			discription :
				"クラゲッソ<br>"+
				"1  バブル光線  水中専用<br>"+
				"2  近づくと落ちる<br>"+
				"3  縄張りを守る<br>"+
				"4  左回り<br>"+
				"5  右回り"
		},

		"boss_type" : {
			value : "1",
			type : "integer 1 5",
			discription :
				"グラーダ<br>"+
				"1  噴火<br>"+
				"2  亀を投げる<br>"+
				"3  ヒノララシを投げる<br>"+
				"4  マリリを投げる<br>"+
				"5  がんせきほう"
		},

		"boss2_type" : {
			value : "1",
			type : "integer 1 8",
			discription :
				"カイオール<br>"+
				"1  水の波動<br>"+
				"2  バブル光線<br>"+
				"3  うずしお<br>"+
				"4  バブル光線連射<br>"+
				"5  ハリケンブラスト<br>"+
				"6  バブル光線回転連射<br>"+
				"7  何もしない<br>"+
				"8  水の波動  直進"
		},

		"boss3_type" : {
			value : "1",
			type : "integer 1 8",
			discription :
				"センクウザ<br>"+
				"1  グレネード<br>"+
				"2  バリアを張って体当たり<br>"+
				"3  バリアを張って高速体当たり<br>"+
				"4  バリアを張ってジャンプ<br>"+
				"5  りゅうせいぐん<br>"+
				"6  回転体当たり<br>"+
				"7  高速回転体当たり<br>"+
				"8  回転ジャンプ"
		},

		"boss_destroy_type" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"ボスの倒し方<br>"+
				"1  ３回踏む<br>"+
				"2  ファイヤーボール，しっぽ"
		},

		"boss_hp_max" : {
			value : "20",
			type : "integer 1",
			discription :
				"ボスのＨＰ<br>"+
				"（設定項目「ボスの倒し方」で 2 を指定した場合のみ有効）"
		},

		"j_tail_ap_boss" : {
			value : "4",
			type : "integer 1",
			discription :
				"しっぽの攻撃力<br>"+
				"（設定項目「ボスの倒し方」で 2 を指定した場合のみ有効）"
		},

		"boss_name" : {
			value : "BOSS",
			type : "string",
			discription :
				"ボスのＨＰゲージに表示する名前"
			,
			rowspan : 3
		},
		"boss2_name" : {
			value : "BOSS"
		},
		"boss3_name" : {
			value : "BOSS"
		},

	},



	"仕掛けパーツ" : {

		"ugokuyuka1_type" : {
			value : "1",
			type : "integer 1 264 1001 1249",
			discription :
				"仕掛けパーツ設定<br>"+
				"1  （そのまま）<br>"+
				"2  乗ると落ちる<br>"+
				"3  ずっと乗っていると落ちる<br>"+
				"4  左回り<br>"+
				"5  右回り<br>"+
				"6  乗れるカイオール<br>"+
				"7  ジャンプ台<br>"+
				"8  上ドッスンスン<br>"+
				"9  左ドッスンスン<br>"+
				"10  右ドッスンスン<br>"+
				"11  跳ねるドッスンスン<br>"+
				"12  上がらないドッスンスン<br>"+
				"13  エレベータードッスンスン  上<br>"+
				"14  エレベータードッスンスン  下<br>"+
				"15  上下ドッスンスン<br>"+
				"16  左右ドッスンスン<br>"+
				"17  ロングレンジドッスンスン<br>"+
				"18  ファイヤーバー２本<br>"+
				"19  ファイヤーバー３本  左回り<br>"+
				"20  ファイヤーバー３本  右回り<br>"+
				"21  隠しブロック<br>"+
				"22  右にブロック１が出る<br>"+
				"23  左にブロック１が出る<br>"+
				"24  上にハシゴが出る<br>"+
				"25  シーソー<br>"+
				"26  シーソー  左が下<br>"+
				"27  シーソー  右が下<br>"+
				"28  ブランコ<br>"+
				"29  ブランコ  ２個連続<br>"+
				"30  スウィングバー  左<br>"+
				"31  スウィングバー  右<br>"+
				"32  スウィングファイヤーバー  左<br>"+
				"33  スウィングファイヤーバー  右<br>"+
				"34  上にブロック１が出る<br>"+
				"35  上にブロック１が２つ出る<br>"+
				"36  右にブロック１が２つ出る<br>"+
				"37  左にブロック１が２つ出る<br>"+
				"38  ジャンプ台が出る<br>"+
				"39  トゲが出る<br>"+
				"40  周囲のトゲをコインに変換<br>"+
				"41  周囲のトゲをブロック１に変換<br>"+
				"42  周囲のブロック１をコインに変換<br>"+
				"43  周囲のブロック４を消去<br>"+
				"44  お店<br>"+
				"45  ヘルメットかドリルをくれる人<br>"+
				"46  グレネードかジェットをくれる人<br>"+
				"47  ファイヤーウォール  上へ伸びる<br>"+
				"48  ファイヤーウォール  下へ伸びる<br>"+
				"49  ファイヤーウォール  左へ伸びる<br>"+
				"50  ファイヤーウォール  右へ伸びる<br>"+
				"51  ファイヤーウォール  壁まで上下<br>"+
				"52  ファイヤーウォール  壁まで左右<br>"+
				"53  壁まで上下移動するドッスンスン<br>"+
				"54  壁まで左右移動するドッスンスン<br>"+
				"55  乗ると左右移動するドッスンスン<br>"+
				"56  火山<br>"+
				"57  逆火山<br>"+
				"58  動くＴ字型<br>"+
				"59  動くＴ字型  ２個連続<br>"+
				"60  ロープ<br>"+
				"61  ロープ  ２本連続<br>"+
				"62  乗れるカイオール  方向キーで移動<br>"+
				"63  ファイヤーウォール  上へ速射<br>"+
				"64  ファイヤーウォール  下へ速射<br>"+
				"65  ファイヤーウォール  左へ速射<br>"+
				"66  ファイヤーウォール  右へ速射<br>"+
				"67  得点で開く扉<br>"+
				"68  コインを全部取ると開く扉<br>"+
				"69  周囲１０パーツ以内のコインを全部取ると開く扉<br>"+
				"70  左１５パーツ以内の雑魚敵を全部倒すと開く扉<br>"+
				"71  人間大砲  右向き<br>"+
				"72  人間大砲  左向き<br>"+
				"73  人間大砲  天井<br>"+
				"74  人間大砲  右の壁<br>"+
				"75  人間大砲  左の壁<br>"+
				"76  高性能ジャンプ台<br>"+
				"77  左へ飛ばすバネ<br>"+
				"78  右へ飛ばすバネ<br>"+
				"79  スポット処理  小<br>"+
				"80  スポット処理  中<br>"+
				"81  スポット処理  大<br>"+
				"82  スポット処理  終了<br>"+
				"83  スポット処理  範囲拡大アイテム<br>"+
				"84  人食いワカメ  上へ拡大縮小<br>"+
				"85  人食いワカメ  下へ拡大縮小<br>"+
				"86  人食いワカメ  中央から拡大縮小<br>"+
				"87  ファイヤーボール  水平に飛ぶ<br>"+
				"88  ファイヤーボール  跳ねる<br>"+
				"89  ファイヤーボール  ダブル<br>"+
				"90  ファイヤーボールセレクトの人<br>"+
				"91  ブロック１破壊砲発射  右<br>"+
				"92  ブロック１破壊砲発射  左<br>"+
				"93  ブロック１破壊砲発射  上<br>"+
				"94  ブロック１破壊砲発射  下<br>"+
				"95  グレネード５発<br>"+
				"96  回転するドッスンスン  左回り<br>"+
				"97  回転するドッスンスン  右回り<br>"+
				"98  回転する巨大ドッスンスン  左回り<br>"+
				"99  回転する巨大ドッスンスン  右回り<br>"+
				"100  画面内で右強制スクロール<br>"+
				"101  画面内で左強制スクロール<br>"+
				"102  画面内で上強制スクロール<br>"+
				"103  画面内で下強制スクロール<br>"+
				"104  画面内で右上強制スクロール<br>"+
				"105  画面内で右下強制スクロール<br>"+
				"106  画面内で左上強制スクロール<br>"+
				"107  画面内で左下強制スクロール<br>"+
				"108  スクロールスピードアップ<br>"+
				"109  スクロールスピードダウン<br>"+
				"110  画面内で全方向スクロール<br>"+
				"111  画面内でスクロール停止<br>"+
				"112  自分が重なると右強制スクロール<br>"+
				"113  自分が重なると上強制スクロール<br>"+
				"114  自分が重なると全方向スクロール<br>"+
				"115  画面内で横固定縦自由スクロール<br>"+
				"116  画面内で右強制縦自由スクロール<br>"+
				"117  画面内で左進行用の視界<br>"+
				"118  画面内で右進行用の視界<br>"+
				"119  曲線による上り坂<br>"+
				"120  曲線による下り坂<br>"+
				"121  曲線による上り坂  線のみ<br>"+
				"122  曲線による下り坂  線のみ<br>"+
				"123  乗れる円<br>"+
				"124  乗れる円  大<br>"+
				"125  乗れる半円<br>"+
				"126  乗れる半円  線のみ<br>"+
				"127  人口太陽  左回り<br>"+
				"128  人口太陽  右回り<br>"+
				"129  人口太陽  棒５本  左回り<br>"+
				"130  人口太陽  棒５本  右回り<br>"+
				"131  ファイヤーリング  左回り<br>"+
				"132  ファイヤーリング  右回り<br>"+
				"133  上下移動する半円  下から<br>"+
				"134  上下移動する半円  上から<br>"+
				"135  乗ると上がる半円<br>"+
				"136  乗ると下がる半円<br>"+
				"137  柱付きの半円<br>"+
				"138  乗ると下がる円<br>"+
				"139  乗ると下がる円  降りると上がる<br>"+
				"140  上下移動する円  上から<br>"+
				"141  上下移動する円  下から<br>"+
				"142  ファイヤーリング２本  左回り<br>"+
				"143  ファイヤーリング２本  右回り<br>"+
				"144  ファイヤーリング２本  高速左回り<br>"+
				"145  ファイヤーリング２本  高速右回り<br>"+
				"146  落ちるだけのドッスンスン<br>"+
				"147  動かないドッスンスン<br>"+
				"148  左右へ押せるドッスンスン<br>"+
				"149  上へ押せるドッスンスン<br>"+
				"150  その場で跳ねるドッスンスン<br>"+
				"151  長いロープ<br>"+
				"152  長いロープ  右から<br>"+
				"153  長いロープ  つかまると動く<br>"+
				"154  長いロープ  つかまると左から動く<br>"+
				"155  左向きのトゲ４つ<br>"+
				"156  右向きのトゲ４つ<br>"+
				"157  左右へ押せるドッスンスンのゴール<br>"+
				"ここへ全部持って行くとクリア<br>"+
				"158  左右へ押せるドッスンスンのゴール<br>"+
				"ロック機能付き<br>"+
				"159  右へ一方通行<br>"+
				"160  左へ一方通行<br>"+
				"161  上へ一方通行<br>"+
				"162  下へ一方通行<br>"+
				"163  右へ一方通行  表示なし<br>"+
				"164  左へ一方通行  表示なし<br>"+
				"165  上へ一方通行  表示なし<br>"+
				"166  下へ一方通行  表示なし<br>"+
				"167  ゆれる棒<br>"+
				"168  ゆれる棒  左から<br>"+
				"169  ゆれる棒  広角<br>"+
				"170  ゆれる棒  広角  左から<br>"+
				"171  跳ねる円<br>"+
				"172  跳ねる円  大<br>"+
				"173  下向きワープ土管１<br>"+
				"174  下向きワープ土管２<br>"+
				"175  下向きワープ土管３<br>"+
				"176  下向きワープ土管４<br>"+
				"177  下向き土管１  上向き１につながる<br>"+
				"178  下向き土管２  上向き２につながる<br>"+
				"179  下向き土管３  上向き３につながる<br>"+
				"180  下向き土管４  上向き４につながる<br>"+
				"181  コンティニュー  残り人数のみ<br>"+
				"182  ？ブロック  コンティニュー<br>"+
				"183  左向き土管１  左右１につながる<br>"+
				"184  左向き土管２  左右２につながる<br>"+
				"185  左向き土管３  左右３につながる<br>"+
				"186  左向き土管４  左右４につながる<br>"+
				"187  右向き土管１  左右１につながる<br>"+
				"188  右向き土管２  左右２につながる<br>"+
				"189  右向き土管３  左右３につながる<br>"+
				"190  右向き土管４  左右４につながる<br>"+
				"191  スイッチ  重なるとＯＮ／ＯＦＦ  周囲１０ブロック以内に影響<br>"+
				"192  スイッチ  ↑キーでＯＮ／ＯＦＦ  周囲１０ブロック以内に影響<br>"+
				"193  スイッチ式の扉  ＯＮで開く<br>"+
				"194  スイッチ式の扉  ＯＮで閉まる<br>"+
				"195  スイッチ式トゲ  ＯＮでブロック４<br>"+
				"196  スイッチ式トゲ  ＯＦＦでブロック４<br>"+
				"197  スイッチ式トゲ  ＯＮで消える<br>"+
				"198  スイッチ式トゲ  ＯＮで出現<br>"+
				"199  スイッチ式ハシゴ  ＯＮで消える<br>"+
				"200  スイッチ式ハシゴ  ＯＮで出現<br>"+
				"201  スイッチ式電撃バリア縦  ＯＮで消える<br>"+
				"202  スイッチ式電撃バリア縦  ＯＮで出現<br>"+
				"203  スイッチ式電撃バリア横  ＯＮで消える<br>"+
				"204  スイッチ式電撃バリア横  ＯＮで出現<br>"+
				"205  スイッチ式動く床  ＯＮで上<br>"+
				"206  スイッチ式動く床  ＯＮで下<br>"+
				"207  スイッチ式動く床  ＯＮで右<br>"+
				"208  スイッチ式動く床  ＯＮで左<br>"+
				"209  スイッチ式長く動く床  ＯＮで上<br>"+
				"210  スイッチ式長く動く床  ＯＮで右<br>"+
				"211  スイッチ  重なるとＯＮ／ＯＦＦ  周囲５ブロック以内に影響<br>"+
				"212  スイッチ  ↑キーでＯＮ／ＯＦＦ  周囲５ブロック以内に影響<br>"+
				"213  ？ブロック  ＯＮの動作  周囲１０ブロック以内に影響<br>"+
				"214  ？ブロック  ＯＦＦの動作  周囲１０ブロック以内に影響<br>"+
				"215  ？ブロック  ＯＮの動作  周囲５ブロック以内に影響<br>"+
				"216  ？ブロック  ＯＦＦの動作  周囲５ブロック以内に影響<br>"+
				"217  連動スイッチ  重なるとＯＮ／ＯＦＦ  マップ全体に影響  同スイッチへ連動<br>"+
				"218  連動スイッチ  ↑キーでＯＮ／ＯＦＦ  マップ全体に影響  同スイッチへ連動<br>"+
				"219  スイッチ式ファイヤーバー  上から左<br>"+
				"220  スイッチ式ファイヤーバー  上から右<br>"+
				"221  スイッチ式ファイヤーバー  左から上<br>"+
				"222  スイッチ式ファイヤーバー  右から上<br>"+
				"223  スイッチ式ファイヤーバー  左から下<br>"+
				"224  スイッチ式ファイヤーバー  右から下<br>"+
				"225  スイッチ式ファイヤーバー  下から左<br>"+
				"226  スイッチ式ファイヤーバー  下から右<br>"+
				"227  スイッチ式ファイヤーバー  右から左回り<br>"+
				"228  スイッチ式ファイヤーバー  左から右回り<br>"+
				"229  スイッチ式ファイヤーバー  右から右回り<br>"+
				"230  スイッチ式ファイヤーバー  左から左回り<br>"+
				"231  スイッチ式ファイヤーバー  上から左回り<br>"+
				"232  スイッチ式ファイヤーバー  上から右回り<br>"+
				"233  スイッチ式ファイヤーバー  下から右回り<br>"+
				"234  スイッチ式ファイヤーバー  下から左回り<br>"+
				"235  スイッチ式ブロック  ＯＮで消える<br>"+
				"236  スイッチ式ブロック  ＯＮで出現<br>"+
				"237  スイッチ式動くＴ字型  ＯＮで左<br>"+
				"238  スイッチ式動くＴ字型  ＯＮで右<br>"+
				"239  スイッチ式速く動くＴ字型  ＯＮで左<br>"+
				"240  スイッチ式速く動くＴ字型  ＯＮで右<br>"+
				"241  スイッチ式動くＴ字型  ＯＮで左から上<br>"+
				"242  スイッチ式動くＴ字型  ＯＮで上から左<br>"+
				"243  スイッチ式動くＴ字型  ＯＮで右から上<br>"+
				"244  スイッチ式動くＴ字型  ＯＮで上から右<br>"+
				"245  ＫＥＹ１<br>"+
				"246  ＫＥＹ２<br>"+
				"247  ＫＥＹ１で開く扉<br>"+
				"248  ＫＥＹ２で開く扉<br>"+
				"249  ＫＥＹ１  落ちる<br>"+
				"250  ＫＥＹ２  落ちる<br>"+
				"251  ＫＥＹ１が３つで開く扉<br>"+
				"252  ＫＥＹ２が３つで開く扉<br>"+
				"253  乗ると壊れるブロック<br>"+
				"254  ＫＥＹ１が３つでＯＮの動作の人  周囲１０ブロック以内に影響<br>"+
				"255  ＫＥＹ２が３つでＯＮの動作の人  周囲１０ブロック以内に影響<br>"+
				"256  スイッチ式ブロック縦  ＯＮで消える<br>"+
				"257  スイッチ式ブロック縦  ＯＮで出現<br>"+
				"258  ファイヤーボール等で破壊  ＯＮの動作  周囲１０ブロック以内に影響<br>"+
				"259  ファイヤーボール等で破壊  ＯＮの動作  周囲５ブロック以内に影響<br>"+
				"260  しっぽで破壊  ＯＮの動作  周囲１０ブロック以内に影響<br>"+
				"261  しっぽで破壊  ＯＮの動作  周囲５ブロック以内に影響<br>"+
				"262  得点でグレネードを売る人<br>"+
				"263  下キーで降りられる上り坂  背景レイヤー表示時は透明<br>"+
				"264  下キーで降りられる下り坂  背景レイヤー表示時は透明<br>"+
				"1001～1249  その番号-1000のマップチップ"
			,
			rowspan : 12
		},

		"ugokuyuka2_type" : {
			value : "1"
		},
		"ugokuyuka3_type" : {
			value : "1"
		},
		"firebar1_type" : {
			value : "1"
		},
		"firebar2_type" : {
			value : "1"
		},
		"dossunsun_type" : {
			value : "1"
		},
		"coin1_type" : {
			value : "1"
		},
		"coin3_type" : {
			value : "1"
		},
		"dokan1_type" : {
			value : "1"
		},
		"dokan2_type" : {
			value : "1"
		},
		"dokan3_type" : {
			value : "1"
		},
		"dokan4_type" : {
			value : "1"
		},

		"door_score" : {
			value : "800",
			type : "integer 10",
			discription :
				"得点で開く扉に必要な得点"
		},

	},



	"一言メッセージ" : {

		"hitokoto1_name" : {
			value : "浩二",
			type : "string",
			discription :
				"一言メッセージ１  名前"
		},

		"hitokoto1-1" : {
			value : "今日は、いい天気だね。",
			type : "string",
			discription :
				"一言メッセージ１  セリフ<br>"+
				"セリフの不要な行は、 \"0\" と指定して下さい。"
			,
			rowspan : 3
		},
		"hitokoto1-2" : {
			value : "0"
		},
		"hitokoto1-3" : {
			value : "0"
		},

		"hitokoto2_name" : {
			value : "お姫様",
			type : "string",
			discription :
				"一言メッセージ２  名前"
		},

		"hitokoto2-1" : {
			value : "ついに、ここまで来ましたね。",
			type : "string",
			discription :
				"一言メッセージ２  セリフ"
			,
			rowspan : 3
		},
		"hitokoto2-2" : {
			value : "0"
		},
		"hitokoto2-3" : {
			value : "0"
		},

		"hitokoto3_name" : {
			value : "ザトシ",
			type : "string",
			discription :
				"一言メッセージ３  名前"
		},

		"hitokoto3-1" : {
			value : "オレは、世界一になる男だ。",
			type : "string",
			discription :
				"一言メッセージ３  セリフ"
			,
			rowspan : 3
		},
		"hitokoto3-2" : {
			value : "0"
		},
		"hitokoto3-3" : {
			value : "0"
		},

		"hitokoto4_name" : {
			value : "クリス",
			type : "string",
			discription :
				"一言メッセージ４  名前"
		},

		"hitokoto4-1" : {
			value : "んちゃ！",
			type : "string",
			discription :
				"一言メッセージ４  セリフ"
			,
			rowspan : 3
		},
		"hitokoto4-2" : {
			value : "0"
		},
		"hitokoto4-3" : {
			value : "0"
		},

	},



	"店・選択" : {

		"shop_name" : {
			value : "店員さん",
			type : "string",
			discription :
				"店の名前"
		},

		"serifu5-1" : {
			value : "いらっしゃいませ。",
			type : "string",
			discription :
				"店のセリフ  購入前<br>"+
				"セリフの不要な行は、 \"0\" と指定して下さい。"
			,
			rowspan : 3
		},
		"serifu5-2" : {
			value : "当店では、ＳＣＯＲＥと、アイテムを、"
		},
		"serifu5-3" : {
			value : "交換いたします。"
		},

		"serifu8-1" : {
			value : "本日の営業は、終了いたしました。",
			type : "string",
			discription :
				"店のセリフ  購入後"
			,
			rowspan : 3
		},
		"serifu8-2" : {
			value : "またのご来店を、"
		},
		"serifu8-3" : {
			value : "こころより、お待ちしております。"
		},

		"shop_serifu1" : {
			value : "どれになさいますか？",
			type : "string",
			discription :
				"店のセリフ  選択させる"
		},

		"shop_serifu2" : {
			value : "で、よろしいですか？",
			type : "string",
			discription :
				"店のセリフ  購入直前<br>"+
				"「（アイテム名）<u>○○○<\/u>」"
		},

		"shop_serifu3" : {
			value : "はい",
			type : "string",
			discription :
				"店のセリフ  選択肢「はい」"
		},

		"shop_serifu4" : {
			value : "いいえ",
			type : "string",
			discription :
				"店のセリフ  選択肢「いいえ」"
		},

		"shop_serifu5" : {
			value : "を、装備した。",
			type : "string",
			discription :
				"店のセリフ  購入直後<br>"+
				"「（アイテム名）<u>○○○<\/u>」"
		},

		"shop_serifu6" : {
			value : "ＳＣＯＲＥが、足りません。",
			type : "string",
			discription :
				"店のセリフ  得点が足りない"
		},

		"shop_item_name1" : {
			value : "グレネード３発",
			type : "string",
			discription :
				"店にあるアイテムの名前<br>"+
				"必ず、この順番で表示されます。<br>"+
				"順番を変更しても、実際の効果は変更されません。<br>"+
				"例：「グレネード３発」の位置に「制限時間増加」と記述しても、「グレネード３発」の効果となります。"
			,
			rowspan : 9
		},
		"shop_item_name2" : {
			value : "ジェット"
		},
		"shop_item_name3" : {
			value : "ドリル"
		},
		"shop_item_name4" : {
			value : "ヘルメット"
		},
		"shop_item_name5" : {
			value : "しっぽ"
		},
		"shop_item_name6" : {
			value : "バリア"
		},
		"shop_item_name7" : {
			value : "ファイヤーボール"
		},
		"shop_item_name8" : {
			value : "１ｕｐ"
		},
		"shop_item_name9" : {
			value : "制限時間増加"
		},

		"shop_item_teika1" : {
			value : "200",
			type : "integer 0",
			discription :
				"店にあるアイテムの値段<br>"+
				"0 を指定するとなくなる"
			,
			rowspan : 9
		},
		"shop_item_teika2" : {
			value : "150"
		},
		"shop_item_teika3" : {
			value : "100"
		},
		"shop_item_teika4" : {
			value : "100"
		},
		"shop_item_teika5" : {
			value : "250"
		},
		"shop_item_teika6" : {
			value : "80"
		},
		"shop_item_teika7" : {
			value : "300"
		},
		"shop_item_teika8" : {
			value : "980"
		},
		"shop_item_teika9" : {
			value : "1"
		},

		"fs_name" : {
			value : "ファイヤーボールセレクトの人",
			type : "string",
			discription :
				"ファイヤーボールセレクトの人  名前"
		},

		"serifu7-1" : {
			value : "好きなファイヤーボールを、３種類から",
			type : "string",
			discription :
				"ファイヤーボールセレクトの人のセリフ  選択前"
			,
			rowspan : 3
		},
		"serifu7-2" : {
			value : "選んで下さい。私はサービスが良いので、"
		},
		"serifu7-3" : {
			value : "何度でも選べますよ。"
		},

		"fs_serifu1" : {
			value : "どのファイヤーボールにしますか？",
			type : "string",
			discription :
				"ファイヤーボールセレクトの人のセリフ  選択させる"
		},

		"fs_item_name1" : {
			value : "バウンド",
			type : "string",
			discription :
				"ファイヤーボールセレクトの人のセリフ  アイテム名"
			,
			rowspan : 3
		},
		"fs_item_name2" : {
			value : "ストレート"
		},
		"fs_item_name3" : {
			value : "ダブル"
		},

		"fs_serifu2" : {
			value : "を装備しました。",
			type : "string",
			discription :
				"ファイヤーボールセレクトの人のセリフ  選択後<br>"+
				"「（アイテム名）<u>○○<\/u>」"
		},

		"serifu_key1_on_name" : {
			value : "お姫様",
			type : "string",
			discription :
				"ＫＥＹ１でＯＮの動作の人  名前"
		},

		"serifu_key1_on-1" : {
			value : "ここから先へ進むには、",
			type : "string",
			discription :
				"ＫＥＹ１でＯＮの動作の人のセリフ  渡す前"
			,
			rowspan : 3
		},
		"serifu_key1_on-2" : {
			value : "３つのＫＥＹ１が必要です。"
		},
		"serifu_key1_on-3" : {
			value : "この世界のどこかに、あるはず。"
		},

		"serifu_key1_on-4" : {
			value : "ＫＥＹ１を３つ、わたしますか？",
			type : "string",
			discription :
				"ＫＥＹ１でＯＮの動作の人のセリフ  選択させる"
		},

		"serifu_key1_on-5" : {
			value : "はい",
			type : "string",
			discription :
				"ＫＥＹ１でＯＮの動作の人のセリフ  選択肢「はい」"
		},

		"serifu_key1_on-6" : {
			value : "いいえ",
			type : "string",
			discription :
				"ＫＥＹ１でＯＮの動作の人のセリフ  選択肢「いいえ」"
		},

		"serifu_key1_on-7" : {
			value : "ＫＥＹ１を３つ、持っていません。",
			type : "string",
			discription :
				"ＫＥＹ１でＯＮの動作の人のセリフ  ＫＥＹ１がない"
		},

		"serifu_key1_on-8" : {
			value : "先へ進む道が、開けました。",
			type : "string",
			discription :
				"ＫＥＹ１でＯＮの動作の人のセリフ  渡した後"
			,
			rowspan : 3
		},
		"serifu_key1_on-9" : {
			value : "勇者殿、"
		},
		"serifu_key1_on-10" : {
			value : "お気を付けて。"
		},

		"key1_on_count" : {
			value : "3",
			type : "integer 1 5",
			discription :
				"ＫＥＹ１でＯＮの動作の人  必要なＫＥＹ１の数"
		},

		"serifu_key2_on_name" : {
			value : "ザトシ",
			type : "string",
			discription :
				"ＫＥＹ２でＯＮの動作の人  名前"
		},

		"serifu_key2_on-1" : {
			value : "３つのＫＥＹ２がないと、",
			type : "string",
			discription :
				"ＫＥＹ２でＯＮの動作の人のセリフ  渡す前"
			,
			rowspan : 3
		},
		"serifu_key2_on-2" : {
			value : "ここから先へは進めないぜ。"
		},
		"serifu_key2_on-3" : {
			value : "どこかで見つ付けてくれ。"
		},

		"serifu_key2_on-4" : {
			value : "ＫＥＹ２を３つ、わたしますか？",
			type : "string",
			discription :
				"ＫＥＹ２でＯＮの動作の人のセリフ  選択させる"
		},

		"serifu_key2_on-5" : {
			value : "はい",
			type : "string",
			discription :
				"ＫＥＹ２でＯＮの動作の人のセリフ  選択肢「はい」"
		},

		"serifu_key2_on-6" : {
			value : "いいえ",
			type : "string",
			discription :
				"ＫＥＹ２でＯＮの動作の人のセリフ  選択肢「いいえ」"
		},

		"serifu_key2_on-7" : {
			value : "ＫＥＹ２を３つ、持っていません。",
			type : "string",
			discription :
				"ＫＥＹ２でＯＮの動作の人のセリフ  ＫＥＹ２がない"
		},

		"serifu_key2_on-8" : {
			value : "３つのＫＥＹ２、受け取ったぜ。",
			type : "string",
			discription :
				"ＫＥＹ２でＯＮの動作の人のセリフ  渡した後"
			,
			rowspan : 3
		},
		"serifu_key2_on-9" : {
			value : "これで、先へ進めるようになったな。"
		},
		"serifu_key2_on-10" : {
			value : "0"
		},

		"key2_on_count" : {
			value : "3",
			type : "integer 1 5",
			discription :
				"ＫＥＹ２でＯＮの動作の人  必要なＫＥＹ２の数"
		},

		"serifu_grenade_shop_name" : {
			value : "クリス",
			type : "string",
			discription :
				"得点でグレネードを売る人  名前"
		},

		"serifu_grenade_shop-1" : {
			value : "グレネード１発を、",
			type : "string",
			discription :
				"得点でグレネードを売る人のセリフ  購入前"
			,
			rowspan : 3
		},
		"serifu_grenade_shop-2" : {
			value : "２０点で売りますよ。"
		},
		"serifu_grenade_shop-3" : {
			value : "0"
		},

		"serifu_grenade_shop-4" : {
			value : "何発にしますか？",
			type : "string",
			discription :
				"得点でグレネードを売る人のセリフ  選択させる"
		},

		"serifu_grenade_shop-5" : {
			value : "得点が、足りません。",
			type : "string",
			discription :
				"得点でグレネードを売る人のセリフ  得点が足りない"
		},

		"serifu_grenade_shop-6" : {
			value : "グレネードを手に入れた。",
			type : "string",
			discription :
				"得点でグレネードを売る人のセリフ  購入直後"
		},

		"grenade_shop_score" : {
			value : "20",
			type : "integer 1",
			discription :
				"得点でグレネードを売る人  １発の値段"
		},

	},



	"文字・色・グラフィック" : {

		"filename_mapchip" : {
			value : "mapchip.gif",
			type : "string",
			discription :
				"マップチップのファイル名"
		},

		"filename_haikei" : {
			value : "haikei.gif",
			type : "string",
			discription :
				"背景画像のファイル名（ステージ１）"
		},

		"filename_haikei2" : {
			value : "haikei.gif",
			type : "string",
			discription :
				"背景画像のファイル名（ステージ２）"
		},

		"filename_haikei3" : {
			value : "haikei.gif",
			type : "string",
			discription :
				"背景画像のファイル名（ステージ３）"
		},

		"filename_haikei4" : {
			value : "haikei.gif",
			type : "string",
			discription :
				"背景画像のファイル名（ステージ４）"
		},

		"filename_title" : {
			value : "title.gif",
			type : "string",
			discription :
				"タイトル画面のファイル名"
		},

		"filename_ending" : {
			value : "ending.gif",
			type : "string",
			discription :
				"エンディング画面のファイル名"
		},

		"filename_gameover" : {
			value : "gameover.gif",
			type : "string",
			discription :
				"ゲームオーバー画面のファイル名"
		},

		"filename_pattern" : {
			value : "pattern.gif",
			type : "string",
			discription :
				"キャラクターパターンのファイル名"
		},

		"filename_chizu" : {
			value : "chizu.gif",
			type : "string",
			discription :
				"地図画面の背景のファイル名"
		},

		"filename_second_haikei" : {
			value : "haikei_second.gif",
			type : "string",
			discription :
				"セカンド画像のファイル名（ステージ１）"
		},

		"filename_second_haikei2" : {
			value : "haikei_second.gif",
			type : "string",
			discription :
				"セカンド画像のファイル名（ステージ２）"
		},

		"filename_second_haikei3" : {
			value : "haikei_second.gif",
			type : "string",
			discription :
				"セカンド画像のファイル名（ステージ３）"
		},

		"filename_second_haikei4" : {
			value : "haikei_second.gif",
			type : "string",
			discription :
				"セカンド画像のファイル名（ステージ４）"
		},

		"score_v" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"得点の表示<br>"+
				"1  表示する<br>"+
				"2  しない"
		},

		"moji_score" : {
			value : "SCORE",
			type : "string",
			discription :
				"SCORE の文字"
		},

		"moji_highscore" : {
			value : "HIGHSCORE",
			type : "string",
			discription :
				"HIGHSCORE の文字"
		},

		"moji_time" : {
			value : "TIME",
			type : "string",
			discription :
				"TIME の文字"
		},

		"moji_jet" : {
			value : "JET",
			type : "string",
			discription :
				"JET の文字"
		},

		"moji_grenade" : {
			value : "GRENADE",
			type : "string",
			discription :
				"GRENADE の文字"
		},

		"moji_left" : {
			value : "LEFT",
			type : "string",
			discription :
				"LEFT の文字"
		},

		"moji_size" : {
			value : "14",
			type : "integer 8 30",
			discription :
				"文字の大きさ"
		},

		"now_loading" : {
			value : "ただいまファイルを読み込み中。しばらくお待ち下さい。",
			type : "string",
			discription :
				"起動中のメッセージ"
		},

		"backcolor_red" : {
			value : "0",
			type : "integer 0 255",
			discription :
				"背景色（ステージ１）<br>"+
				"ゲーム画面の背景色を、光の３原色の成分で設定します。<br>"+
				"上から赤の成分、緑の成分、青の成分"
			,
			rowspan : 3
		},
		"backcolor_green" : {
			value : "255"
		},
		"backcolor_blue" : {
			value : "255"
		},

		"backcolor_red_s" : {
			value : "0",
			type : "integer 0 255",
			discription :
				"背景色（ステージ２）"
			,
			rowspan : 3
		},
		"backcolor_green_s" : {
			value : "0"
		},
		"backcolor_blue_s" : {
			value : "0"
		},

		"backcolor_red_t" : {
			value : "0",
			type : "integer 0 255",
			discription :
				"背景色（ステージ３）"
			,
			rowspan : 3
		},
		"backcolor_green_t" : {
			value : "255"
		},
		"backcolor_blue_t" : {
			value : "255"
		},

		"backcolor_red_f" : {
			value : "192",
			type : "integer 0 255",
			discription :
				"背景色（ステージ４）"
			,
			rowspan : 3
		},
		"backcolor_green_f" : {
			value : "48"
		},
		"backcolor_blue_f" : {
			value : "48"
		},

		"kaishi_red" : {
			value : "0",
			type : "integer 0 255",
			discription :
				"ステージ番号表示画面  背景色"
			,
			rowspan : 3
		},
		"kaishi_green" : {
			value : "0"
		},
		"kaishi_blue" : {
			value : "0"
		},

		"scorecolor_red" : {
			value : "0",
			type : "integer 0 255",
			discription :
				"文字の色"
			,
			rowspan : 3
		},
		"scorecolor_green" : {
			value : "0"
		},
		"scorecolor_blue" : {
			value : "255"
		},

		"grenade_red1" : {
			value : "255",
			type : "integer 0 255",
			discription :
				"グレネードの爆発とエネルギー砲の色１"
			,
			rowspan : 3
		},
		"grenade_green1" : {
			value : "255"
		},
		"grenade_blue1" : {
			value : "255"
		},

		"grenade_red2" : {
			value : "255",
			type : "integer 0 255",
			discription :
				"グレネードの爆発とエネルギー砲の色２"
			,
			rowspan : 3
		},
		"grenade_green2" : {
			value : "255"
		},
		"grenade_blue2" : {
			value : "0"
		},

		"mizunohadou_red" : {
			value : "0",
			type : "integer 0 255",
			discription :
				"水の波動（カイオールの技）の色"
			,
			rowspan : 3
		},
		"mizunohadou_green" : {
			value : "32"
		},
		"mizunohadou_blue" : {
			value : "255"
		},

		"firebar_red1" : {
			value : "255",
			type : "integer 0 255",
			discription :
				"ファイヤーバーの外側の色"
			,
			rowspan : 3
		},
		"firebar_green1" : {
			value : "0"
		},
		"firebar_blue1" : {
			value : "0"
		},

		"firebar_red2" : {
			value : "255",
			type : "integer 0 255",
			discription :
				"ファイヤーバーの内側の色"
			,
			rowspan : 3
		},
		"firebar_green2" : {
			value : "192"
		},
		"firebar_blue2" : {
			value : "0"
		},

		"layer_mode" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"背景レイヤー<br>"+
				"1 表示しない<br>"+
				"2 表示する"
		},

		"gazou_scroll" : {
			value : "2",
			type : "integer 1 11",
			discription :
				"背景画像のスクロール<br>"+
				"1  しない<br>"+
				"2  左右スクロール<br>"+
				"3  左へ強制スクロール<br>"+
				"4  指定速度で強制スクロール<br>"+
				"5  上下スクロール<br>"+
				"6  全方向スクロール（速度はマップの１／２）<br>"+
				"7  全方向スクロール（速度はマップと同じ）<br>"+
				"8  画像サイズ    ５１２×６４０専用<br>"+
				"9  画像サイズ  １０２４×６４０専用<br>"+
				"10  左右スクロール（速度はマップの１／２）<br>"+
				"11  マップの指定座標に設置  画像サイズは任意"
		},

		"gazou_scroll_speed_x" : {
			value : "0",
			type : "integer",
			discription :
				"背景画像強制スクロール速度<br>"+
				"X方向、Y方向の速度をそれぞれ指定<br>"+
				"（設定項目「背景画像のスクロール」で 4 を指定した場合のみ有効）"
			,
			rowspan : 2
		},
		"gazou_scroll_speed_y" : {
			value : "0"
		},

		"gazou_scroll_x" : {
			value : "0",
			type : "integer",
			discription :
				"背景画像の設置位置<br>"+
				"X座標、Y座標をそれぞれ指定<br>"+
				"（設定項目「背景画像のスクロール」で 11 を指定した場合のみ有効）"
			,
			rowspan : 2
		},
		"gazou_scroll_y" : {
			value : "0"
		},

		"mcs_haikei_visible" : {
			value : "0",
			type : "integer 0 1",
			discription :
				"背景画像の表示（背景レイヤーの使用に影響されない) <br>"+
				"0  背景レイヤー使用時に表示<br>"+
				"1  常に表示する"
		},

		"control_parts_visible" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"スクロール制御パーツの表示<br>"+
				"1  表示しない<br>"+
				"2  表示する<br>"+
				"<em>（デバッグ用）<\/em>"
		},

		"second_gazou_visible" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"セカンド画像の使用<br>"+
				"1  使わない<br>"+
				"2  使う"
		},

		"second_gazou_scroll" : {
			value : "1",
			type : "integer 1 8",
			discription :
				"セカンド画像のスクロール<br>"+
				"1  しない<br>"+
				"2  左右スクロール  速度１／４<br>"+
				"3  左右スクロール  速度１／２<br>"+
				"4  指定速度で強制スクロール<br>"+
				"5  左右スクロール  速度３／２<br>"+
				"6  画像サイズ  ５１２×９６０<br>"+
				"7  マップと同じ速度で全方向<br>"+
				"8  マップの指定座標に設置  画像サイズは任意"
		},

		"second_gazou_scroll_speed_x" : {
			value : "0",
			type : "integer",
			discription :
				"セカンド画像強制スクロール速度<br>"+
				"X方向、Y方向の速度をそれぞれ指定<br>"+
				"（設定項目「セカンド画像のスクロール」で 4 を指定した場合のみ有効）"
			,
			rowspan : 2
		},
		"second_gazou_scroll_speed_y" : {
			value : "0"
		},

		"second_gazou_scroll_x" : {
			value : "0",
			type : "integer",
			discription :
				"セカンド画像の設置位置<br>"+
				"X座標、Y座標をそれぞれ指定<br>"+
				"（設定項目「セカンド画像のスクロール」で 8 を指定した場合のみ有効）"
			,
			rowspan : 2
		},
		"second_gazou_scroll_y" : {
			value : "0"
		},

		"second_gazou_priority" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"セカンド画像の表示深度<br>"+
				"1  背景画像の奥<br>"+
				"2  主人公の手前"
		},

		"water_visible" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"水の表示<br>"+
				"1  背景レイヤー使用時は表示しない<br>"+
				"2  常に表示する"
		},

		"water_clear_switch" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"水の半透明表示<br>"+
				"1  しない<br>"+
				"2  する"
		},

		"water_clear_level" : {
			value : "128",
			type : "integer 0 255",
			discription :
				"水の透明度"
		},

	},



	"音利用" : {

		"se_switch" : {
			value : "2",
			type : "integer 1 2",
			discription :
				"効果音機能<br>"+
				"1  使う<br>"+
				"2  使わない"
		},

		"se_filename" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"効果音の指定<br>"+
				"1  ファイル名を記述して指定する<br>"+
				"2  デフォルトのファイル名を使用する"
		},

		"filename_se_start" : {
			value : "item.au",
			type : "string",
			discription :
				"効果音ファイル名 ゲームスタート<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_gameover" : {
			value : "gameover.au",
			type : "string",
			discription :
				"効果音ファイル名 ゲームオーバー<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_clear" : {
			value : "clear.au",
			type : "string",
			discription :
				"効果音ファイル名 星を取る（ステージクリアー）<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_coin" : {
			value : "coin.au",
			type : "string",
			discription :
				"効果音ファイル名 コインを取る<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_get" : {
			value : "get.au",
			type : "string",
			discription :
				"効果音ファイル名 アイテムを取る<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_item" : {
			value : "item.au",
			type : "string",
			discription :
				"効果音ファイル名 ハテナブロックからアイテムが出る<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_jump" : {
			value : "jump.au",
			type : "string",
			discription :
				"効果音ファイル名 ジャンプ<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_sjump" : {
			value : "sjump.au",
			type : "string",
			discription :
				"効果音ファイル名 スーパージャンプ<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_kiki" : {
			value : "kiki.au",
			type : "string",
			discription :
				"効果音ファイル名 滑る<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_fumu" : {
			value : "fumu.au",
			type : "string",
			discription :
				"効果音ファイル名 敵を踏む<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_tobasu" : {
			value : "tobasu.au",
			type : "string",
			discription :
				"効果音ファイル名 ファイヤーボール等で敵を倒す<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_fireball" : {
			value : "shot.au",
			type : "string",
			discription :
				"効果音ファイル名 ファイヤーボール発射<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_jet" : {
			value : "mgan.au",
			type : "string",
			discription :
				"効果音ファイル名 ジェット<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_miss" : {
			value : "dosun.au",
			type : "string",
			discription :
				"効果音ファイル名 自分が死んだ<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_block" : {
			value : "bakuhatu.au",
			type : "string",
			discription :
				"効果音ファイル名 ブロックを破壊<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_mizu" : {
			value : "mizu.au",
			type : "string",
			discription :
				"効果音ファイル名 水しぶき<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_dengeki" : {
			value : "mgan.au",
			type : "string",
			discription :
				"効果音ファイル名 ピカチーの電撃<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_happa" : {
			value : "happa.au",
			type : "string",
			discription :
				"効果音ファイル名 チコリンのはっぱカッター<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_hinoko" : {
			value : "mgan.au",
			type : "string",
			discription :
				"効果音ファイル名 ヤチャモの火の粉<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_mizudeppo" : {
			value : "happa.au",
			type : "string",
			discription :
				"効果音ファイル名 水鉄砲<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_bomb" : {
			value : "shot.au",
			type : "string",
			discription :
				"効果音ファイル名 エアームズの爆弾<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_dosun" : {
			value : "dosun.au",
			type : "string",
			discription :
				"効果音ファイル名 ドッスンスンが落ちる<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_grounder" : {
			value : "mgan.au",
			type : "string",
			discription :
				"効果音ファイル名 グラーダの噴火<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_kaiole" : {
			value : "happa.au",
			type : "string",
			discription :
				"効果音ファイル名 カイオールの水の波動<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_senkuuza" : {
			value : "shot.au",
			type : "string",
			discription :
				"効果音ファイル名 センクウザのグレネード<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_dokan" : {
			value : "get.au",
			type : "string",
			discription :
				"効果音ファイル名 土管に入る<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_se_chizugamen" : {
			value : "get.au",
			type : "string",
			discription :
				"効果音ファイル名 地図画面からステージへ入る<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"fx_bgm_switch" : {
			value : "0",
			type : "integer 0 1",
			discription :
				"ＢＧＭ<br>"+
				"0  使わない<br>"+
				"1  使う"
		},

		"fx_bgm_loop" : {
			value : "0",
			type : "integer 0 1",
			discription :
				"ＢＧＭのループ再生<br>"+
				"0  しない<br>"+
				"1  する"
		},

		"filename_fx_bgm_stage1" : {
			value : "stage1.mid",
			type : "string",
			discription :
				"ＢＧＭファイル名（ステージ１）<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_fx_bgm_stage2" : {
			value : "stage2.mid",
			type : "string",
			discription :
				"ＢＧＭファイル名（ステージ２）<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_fx_bgm_stage3" : {
			value : "stage3.mid",
			type : "string",
			discription :
				"ＢＧＭファイル名（ステージ３）<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_fx_bgm_stage4" : {
			value : "stage4.mid",
			type : "string",
			discription :
				"ＢＧＭファイル名（ステージ４）<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_fx_bgm_boss" : {
			value : "boss.mid",
			type : "string",
			discription :
				"ＢＧＭファイル名（ボス）<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_fx_bgm_title" : {
			value : "title.mid",
			type : "string",
			discription :
				"ＢＧＭファイル名（タイトル画面）<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_fx_bgm_ending" : {
			value : "ending.mid",
			type : "string",
			discription :
				"ＢＧＭファイル名（エンディング）<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"filename_fx_bgm_chizu" : {
			value : "chizu.mid",
			type : "string",
			discription :
				"ＢＧＭファイル名（地図画面）<br>"+
				"<em>（拡張子は無視されます）<\/em>"
		},

		"audio_se_switch_wave" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"Wave形式の音声ファイルを効果音に使うかどうか<br>"+
				"1  使う<br>"+
				"2  使わない（読み込まない）<br>"+
				"<strong>※Canvas版で追加<\/strong>"
		},

		"audio_se_switch_mp3" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"MP3形式の音声ファイルを効果音に使うかどうか<br>"+
				"1  使う<br>"+
				"2  使わない（読み込まない）<br>"+
				"<strong>※Canvas版で追加<\/strong>"
		},

		"audio_se_switch_ogg" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"Ogg形式の音声ファイルを効果音に使うかどうか<br>"+
				"1  使う<br>"+
				"2  使わない（読み込まない）<br>"+
				"<strong>※Canvas版で追加<\/strong>"
		},

		"audio_bgm_switch_wave" : {
			value : "2",
			type : "integer 1 2",
			discription :
				"Wave形式の音声ファイルをBGMに使うかどうか<br>"+
				"1  使う<br>"+
				"2  使わない（読み込まない）<br>"+
				"<strong>※Canvas版で追加<\/strong>"
		},

		"audio_bgm_switch_mp3" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"MP3形式の音声ファイルをBGMに使うかどうか<br>"+
				"1  使う<br>"+
				"2  使わない（読み込まない）<br>"+
				"<strong>※Canvas版で追加<\/strong>"
		},

		"audio_bgm_switch_ogg" : {
			value : "1",
			type : "integer 1 2",
			discription :
				"Ogg形式の音声ファイルをBGMに使うかどうか<br>"+
				"1  使う<br>"+
				"2  使わない（読み込まない）<br>"+
				"<strong>※Canvas版で追加<\/strong>"
		},

	},



	"地図画面用" : {

		/*"chizu-0" : {
			value : "...............",
			discription :
				""
		},

		"chizu-1" : {
			value : ".b33E33333c..C.",
			discription :
				""
		},

		"chizu-2" : {
			value : "....2.....2..2.",
			discription :
				""
		},

		"chizu-3" : {
			value : "....2.....2..2.",
			discription :
				""
		},

		"chizu-4" : {
			value : "....A33a331331.",
			discription :
				""
		},

		"chizu-5" : {
			value : ".i.....2.......",
			discription :
				""
		},

		"chizu-6" : {
			value : ".2.....2.......",
			discription :
				""
		},

		"chizu-7" : {
			value : ".B33D3313f3d...",
			discription :
				""
		},

		"chizu-8" : {
			value : "...............",
			discription :
				""
		},*/

		"mes1_name" : {
			value : "ダケシ",
			type : "string",
			discription :
				"メッセージ１の人  名前<br>"+
				"アスレチックの設定で <u>45<\/u> を指定した場合、この人はヘルメットかドリルをくれる人になります。"
		},

		"serifu1-1" : {
			value : "人の命は、お金では買えないと言われています。",
			type : "string",
			discription :
				"メッセージ１の人  セリフ１<br>"+
				"セリフの不要な行は、 \"0\" と指定して下さい。<br>"+
				"アスレチックの設定で <u>45<\/u> を指定した場合、このセリフはヘルメットかドリルをくれる人の、<u>選択前<\/u>のセリフとなります。"
			,
			rowspan : 3
		},
		"serifu1-2" : {
			value : "しかし、お店へ行けば、ＳＣＯＲＥで買えます。"
		},
		"serifu1-3" : {
			value : "0"
		},

		"serifu2-1" : {
			value : "時は金なりと、言われています。しかし、",
			type : "string",
			discription :
				"メッセージ１の人  セリフ２<br>"+
				"アスレチックの設定で <u>45<\/u> を指定した場合、このセリフはヘルメットかドリルをくれる人の、<u>選択後<\/u>のセリフとなります。"
			,
			rowspan : 3
		},
		"serifu2-2" : {
			value : "お店なら、時間も買えます。"
		},
		"serifu2-3" : {
			value : "店員さんて、グレートですね。"
		},

		"mes2_name" : {
			value : "エリコ",
			type : "string",
			discription :
				"メッセージ２の人  名前<br>"+
				"アスレチックの設定で <u>46<\/u> を指定した場合、この人はグレネードかジェットをくれる人になります。"
		},

		"serifu3-1" : {
			value : "おはようございます。星と数字が付いた扉が、",
			type : "string",
			discription :
				"メッセージ２の人  セリフ１<br>"+
				"アスレチックの設定で <u>46<\/u> を指定した場合、このセリフはグレネードかジェットをくれる人の、<u>選択前<\/u>のセリフとなります。"
			,
			rowspan : 3
		},
		"serifu3-2" : {
			value : "ありますよね。あれは、ですねえ、その数だけ"
		},
		"serifu3-3" : {
			value : "人面星を取ると、開くので、ございます。"
		},

		"serifu4-1" : {
			value : "LAST STAGEというのは、最終面の事ですわ。",
			type : "string",
			discription :
				"メッセージ２の人  セリフ２<br>"+
				"アスレチックの設定で <u>46<\/u> を指定した場合、このセリフはグレネードかジェットをくれる人の、<u>選択後<\/u>のセリフとなります。"
			,
			rowspan : 3
		},
		"serifu4-2" : {
			value : "これをクリアーすると、エンディングに、"
		},
		"serifu4-3" : {
			value : "行けますのよ。がんばって下さいね。"
		},

		"setumei_name" : {
			value : "キドはかせ",
			type : "string",
			discription :
				"説明する人  名前"
		},

		"serifu9-1" : {
			value : "よく来た。わしは、キドはかせ。",
			type : "string",
			discription :
				"説明する人  セリフ１"
			,
			rowspan : 3
		},
		"serifu9-2" : {
			value : "アイテムの研究をしており、みんなから、"
		},
		"serifu9-3" : {
			value : "アイテムはかせと呼ばれて、したわれておるよ。"
		},

		"setumei_menu1" : {
			value : "なんでも、質問してくれたまえよ。",
			type : "string",
			discription :
				"説明する人  メニュー"
		},

		"setumei_menu2" : {
			value : "ファイヤーボール",
			type : "string",
			discription :
				"説明する人  メニューの選択肢"
			,
			rowspan : 3
		},
		"setumei_menu3" : {
			value : "バリア"
		},
		"setumei_menu4" : {
			value : "ジェット"
		},

		"serifu10-1" : {
			value : "黄色いチューリップのアイテムと言えば、",
			type : "string",
			discription :
				"説明する人  １つ目の選択肢を選んだときのセリフ"
			,
			rowspan : 3
		},
		"serifu10-2" : {
			value : "そう、ファイヤーボールじゃな。はなれた"
		},
		"serifu10-3" : {
			value : "敵を攻撃できるという、大変便利なものじゃ。"
		},

		"serifu11-1" : {
			value : "ピンクのキノコのアイテムと言えば、そう、",
			type : "string",
			discription :
				"説明する人  ２つ目の選択肢を選んだときのセリフ"
			,
			rowspan : 3
		},
		"serifu11-2" : {
			value : "バリアじゃな。体当たりで敵を倒せるが、うっかり"
		},
		"serifu11-3" : {
			value : "して、時間切れを忘れぬよう、注意が必要じゃ。"
		},

		"serifu12-1" : {
			value : "ロケットの形のアイテムと言えば、そう、ジェット",
			type : "string",
			discription :
				"説明する人  ３つ目の選択肢を選んだときのセリフ"
			,
			rowspan : 3
		},
		"serifu12-2" : {
			value : "じゃな。空中で、スペースキーを押せば、さらに"
		},
		"serifu12-3" : {
			value : "上昇できる。燃料切れには、気を付けるのじゃぞ。"
		},

	},

};

Object.freeze(INITIAL_VALUE);
