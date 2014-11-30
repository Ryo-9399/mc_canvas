
function TagDataBase()
{
	this.name = new Array(2000);
	this.value = new Array(2000);
	this.tag_kazu = 0;

	this.initParameter();
}

TagDataBase.prototype.initParameter = function()
{
	this.tag_kazu = 0;
	for (var i = 0; i <= 1999; i++)
	{
		this.name[i] = null;
		this.value[i] = null;
	}
	var str2 = "";
	var str3 = "";
	for (i = 0; i <= 59; i++)
	{
		str2 = str2 + ".";
		str3 = str3 + "..";
	}
	var m = 0;
	var j;
	var str1;
	for (var k = 0; k <= 2; k++) {
		for (j = 0; j <= 29; j++)
		{
			str1 = "map" + k + "-" + j;
			this.name[m] = String(str1);

			this.value[m] = String(".");
			m++;
		}
	}
	for (k = 0; k <= 2; k++) {
		for (j = 0; j <= 29; j++)
		{
			str1 = "map" + k + "-" + j + "-s";
			this.name[m] = String(str1);

			this.value[m] = String(".");
			m++;
		}
	}
	for (k = 0; k <= 2; k++) {
		for (j = 0; j <= 29; j++)
		{
			str1 = "map" + k + "-" + j + "-t";
			this.name[m] = String(str1);

			this.value[m] = String(".");
			m++;
		}
	}
	for (k = 0; k <= 2; k++) {
		for (j = 0; j <= 29; j++)
		{
			str1 = "map" + k + "-" + j + "-f";
			this.name[m] = String(str1);

			this.value[m] = String(".");
			m++;
		}
	}
	for (k = 0; k <= 2; k++) {
		for (j = 0; j <= 29; j++)
		{
			str1 = "layer" + k + "-" + j;
			this.name[m] = String(str1);
			this.value[m] = String(str3);
			m++;
		}
	}
	for (k = 0; k <= 2; k++) {
		for (j = 0; j <= 29; j++)
		{
			str1 = "layer" + k + "-" + j + "-s";
			this.name[m] = String(str1);
			this.value[m] = String(str3);
			m++;
		}
	}
	for (k = 0; k <= 2; k++) {
		for (j = 0; j <= 29; j++)
		{
			str1 = "layer" + k + "-" + j + "-t";
			this.name[m] = String(str1);
			this.value[m] = String(str3);
			m++;
		}
	}
	for (k = 0; k <= 2; k++) {
		for (j = 0; j <= 29; j++)
		{
			str1 = "layer" + k + "-" + j + "-f";
			this.name[m] = String(str1);
			this.value[m] = String(str3);
			m++;
		}
	}

	this.name[m] = "chizu-0";this.value[(m++)] = "...............";
	this.name[m] = "chizu-1";this.value[(m++)] = ".b33E33333c..C.";
	this.name[m] = "chizu-2";this.value[(m++)] = "....2.....2..2.";
	this.name[m] = "chizu-3";this.value[(m++)] = "....2.....2..2.";
	this.name[m] = "chizu-4";this.value[(m++)] = "....A33a331331.";
	this.name[m] = "chizu-5";this.value[(m++)] = ".i.....2.......";
	this.name[m] = "chizu-6";this.value[(m++)] = ".2.....2.......";
	this.name[m] = "chizu-7";this.value[(m++)] = ".B33D3313f3d...";
	this.name[m] = "chizu-8";this.value[(m++)] = "...............";
	this.name[m] = "mes1_name";this.value[(m++)] = "ダケシ";
	this.name[m] = "serifu1-1";this.value[(m++)] = "人の命は、お金では買えないと言われています。";
	this.name[m] = "serifu1-2";this.value[(m++)] = "しかし、お店へ行けば、ＳＣＯＲＥで買えます。";
	this.name[m] = "serifu1-3";this.value[(m++)] = "0";
	this.name[m] = "serifu2-1";this.value[(m++)] = "時は金なりと、言われています。しかし、";
	this.name[m] = "serifu2-2";this.value[(m++)] = "お店なら、時間も買えます。";
	this.name[m] = "serifu2-3";this.value[(m++)] = "店員さんて、グレートですね。";
	this.name[m] = "mes2_name";this.value[(m++)] = "エリコ";
	this.name[m] = "serifu3-1";this.value[(m++)] = "おはようございます。星と数字が付いた扉が、";
	this.name[m] = "serifu3-2";this.value[(m++)] = "ありますよね。あれは、ですねえ、その数だけ";
	this.name[m] = "serifu3-3";this.value[(m++)] = "人面星を取ると、開くので、ございます。";
	this.name[m] = "serifu4-1";this.value[(m++)] = "LAST STAGEというのは、最終面の事ですわ。";
	this.name[m] = "serifu4-2";this.value[(m++)] = "これをクリアーすると、エンディングに、";
	this.name[m] = "serifu4-3";this.value[(m++)] = "行けますのよ。がんばって下さいね。";
	this.name[m] = "shop_name";this.value[(m++)] = "店員さん";
	this.name[m] = "serifu5-1";this.value[(m++)] = "いらっしゃいませ。";
	this.name[m] = "serifu5-2";this.value[(m++)] = "当店では、ＳＣＯＲＥと、アイテムを、";
	this.name[m] = "serifu5-3";this.value[(m++)] = "交換いたします。";
	this.name[m] = "serifu8-1";this.value[(m++)] = "本日の営業は、終了いたしました。";
	this.name[m] = "serifu8-2";this.value[(m++)] = "またのご来店を、";
	this.name[m] = "serifu8-3";this.value[(m++)] = "こころより、お待ちしております。";
	this.name[m] = "shop_serifu1";this.value[(m++)] = "どれになさいますか？";
	this.name[m] = "shop_serifu2";this.value[(m++)] = "で、よろしいですか？";
	this.name[m] = "shop_serifu3";this.value[(m++)] = "はい";
	this.name[m] = "shop_serifu4";this.value[(m++)] = "いいえ";
	this.name[m] = "shop_serifu5";this.value[(m++)] = "を、装備した。";
	this.name[m] = "shop_serifu6";this.value[(m++)] = "ＳＣＯＲＥが、足りません。";
	this.name[m] = "shop_item_name1";this.value[(m++)] = "グレネード３発";
	this.name[m] = "shop_item_name2";this.value[(m++)] = "ジェット";
	this.name[m] = "shop_item_name3";this.value[(m++)] = "ドリル";
	this.name[m] = "shop_item_name4";this.value[(m++)] = "ヘルメット";
	this.name[m] = "shop_item_name5";this.value[(m++)] = "しっぽ";
	this.name[m] = "shop_item_name6";this.value[(m++)] = "バリア";
	this.name[m] = "shop_item_name7";this.value[(m++)] = "ファイヤーボール";
	this.name[m] = "shop_item_name8";this.value[(m++)] = "１ｕｐ";
	this.name[m] = "shop_item_name9";this.value[(m++)] = "制限時間増加";
	this.name[m] = "shop_item_teika1";this.value[(m++)] = "200";
	this.name[m] = "shop_item_teika2";this.value[(m++)] = "150";
	this.name[m] = "shop_item_teika3";this.value[(m++)] = "100";
	this.name[m] = "shop_item_teika4";this.value[(m++)] = "100";
	this.name[m] = "shop_item_teika5";this.value[(m++)] = "250";
	this.name[m] = "shop_item_teika6";this.value[(m++)] = "80";
	this.name[m] = "shop_item_teika7";this.value[(m++)] = "300";
	this.name[m] = "shop_item_teika8";this.value[(m++)] = "980";
	this.name[m] = "shop_item_teika9";this.value[(m++)] = "1";
	this.name[m] = "setumei_name";this.value[(m++)] = "キドはかせ";
	this.name[m] = "serifu9-1";this.value[(m++)] = "よく来た。わしは、キドはかせ。";
	this.name[m] = "serifu9-2";this.value[(m++)] = "アイテムの研究をしており、みんなから、";
	this.name[m] = "serifu9-3";this.value[(m++)] = "アイテムはかせと呼ばれて、したわれておるよ。";
	this.name[m] = "setumei_menu1";this.value[(m++)] = "なんでも、質問してくれたまえよ。";
	this.name[m] = "setumei_menu2";this.value[(m++)] = "ファイヤーボール";
	this.name[m] = "setumei_menu3";this.value[(m++)] = "バリア";
	this.name[m] = "setumei_menu4";this.value[(m++)] = "ジェット";
	this.name[m] = "serifu10-1";this.value[(m++)] = "黄色いチューリップのアイテムと言えば、";
	this.name[m] = "serifu10-2";this.value[(m++)] = "そう、ファイヤーボールじゃな。はなれた";
	this.name[m] = "serifu10-3";this.value[(m++)] = "敵を攻撃できるという、大変便利なものじゃ。";
	this.name[m] = "serifu11-1";this.value[(m++)] = "ピンクのキノコのアイテムと言えば、そう、";
	this.name[m] = "serifu11-2";this.value[(m++)] = "バリアじゃな。体当たりで敵を倒せるが、うっかり";
	this.name[m] = "serifu11-3";this.value[(m++)] = "して、時間切れを忘れぬよう、注意が必要じゃ。";
	this.name[m] = "serifu12-1";this.value[(m++)] = "ロケットの形のアイテムと言えば、そう、ジェット";
	this.name[m] = "serifu12-2";this.value[(m++)] = "じゃな。空中で、スペースキーを押せば、さらに";
	this.name[m] = "serifu12-3";this.value[(m++)] = "上昇できる。燃料切れには、気を付けるのじゃぞ。";
	this.name[m] = "door_score";this.value[(m++)] = "800";
	this.name[m] = "layer_mode";this.value[(m++)] = "1";
	this.name[m] = "filename_mapchip";this.value[(m++)] = "mapchip.gif";
	this.name[m] = "filename_haikei";this.value[(m++)] = "haikei.gif";
	this.name[m] = "filename_haikei2";this.value[(m++)] = "haikei.gif";
	this.name[m] = "filename_haikei3";this.value[(m++)] = "haikei.gif";
	this.name[m] = "filename_haikei4";this.value[(m++)] = "haikei.gif";
	this.name[m] = "gazou_scroll";this.value[(m++)] = "2";
	this.name[m] = "easy_mode";this.value[(m++)] = "1";
	this.name[m] = "now_loading";this.value[(m++)] = "ただいまファイルを読み込み中。しばらくお待ち下さい。";
	this.name[m] = "time_max";this.value[(m++)] = "300";
	this.name[m] = "scroll_mode";this.value[(m++)] = "1";
	this.name[m] = "scroll_mode_s";this.value[(m++)] = "1";
	this.name[m] = "scroll_mode_t";this.value[(m++)] = "1";
	this.name[m] = "scroll_mode_f";this.value[(m++)] = "1";
	this.name[m] = "score_v";this.value[(m++)] = "1";
	this.name[m] = "stage_max";this.value[(m++)] = "1";
	this.name[m] = "stage_kaishi";this.value[(m++)] = "1";
	this.name[m] = "jibun_left_shoki";this.value[(m++)] = "1";
	this.name[m] = "score_1up_1";this.value[(m++)] = "500";
	this.name[m] = "score_1up_2";this.value[(m++)] = "1000";
	this.name[m] = "stage_select";this.value[(m++)] = "1";
	this.name[m] = "j_tail_type";this.value[(m++)] = "1";
	this.name[m] = "j_tail_hf";this.value[(m++)] = "1";
	this.name[m] = "j_fire_mkf";this.value[(m++)] = "1";
	this.name[m] = "grenade_type";this.value[(m++)] = "1";
	this.name[m] = "suberuyuka_hkf";this.value[(m++)] = "1";
	this.name[m] = "dengeki_mkf";this.value[(m++)] = "1";
	this.name[m] = "yachamo_kf";this.value[(m++)] = "1";
	this.name[m] = "airms_kf";this.value[(m++)] = "1";
	this.name[m] = "ugokuyuka1_type";this.value[(m++)] = "1";
	this.name[m] = "ugokuyuka2_type";this.value[(m++)] = "1";
	this.name[m] = "ugokuyuka3_type";this.value[(m++)] = "1";
	this.name[m] = "boss_type";this.value[(m++)] = "1";
	this.name[m] = "boss2_type";this.value[(m++)] = "1";
	this.name[m] = "boss3_type";this.value[(m++)] = "1";
	this.name[m] = "url1";this.value[(m++)] = "http://www.yahoo.co.jp/";
	this.name[m] = "url2";this.value[(m++)] = "http://www.yahoo.co.jp/";
	this.name[m] = "url3";this.value[(m++)] = "http://www.yahoo.co.jp/";
	this.name[m] = "url4";this.value[(m++)] = "http://www.t3.rim.or.jp/~naoto/naoto.html";
	this.name[m] = "dokan_mode";this.value[(m++)] = "1";
	this.name[m] = "j_tokugi";this.value[(m++)] = "1";
	this.name[m] = "hitokoto1_name";this.value[(m++)] = "浩二";
	this.name[m] = "hitokoto1-1";this.value[(m++)] = "今日は、いい天気だね。";
	this.name[m] = "hitokoto1-2";this.value[(m++)] = "0";
	this.name[m] = "hitokoto1-3";this.value[(m++)] = "0";
	this.name[m] = "hitokoto2_name";this.value[(m++)] = "お姫様";
	this.name[m] = "hitokoto2-1";this.value[(m++)] = "ついに、ここまで来ましたね。";
	this.name[m] = "hitokoto2-2";this.value[(m++)] = "0";
	this.name[m] = "hitokoto2-3";this.value[(m++)] = "0";
	this.name[m] = "hitokoto3_name";this.value[(m++)] = "ザトシ";
	this.name[m] = "hitokoto3-1";this.value[(m++)] = "オレは、世界一になる男だ。";
	this.name[m] = "hitokoto3-2";this.value[(m++)] = "0";
	this.name[m] = "hitokoto3-3";this.value[(m++)] = "0";
	this.name[m] = "hitokoto4_name";this.value[(m++)] = "クリス";
	this.name[m] = "hitokoto4-1";this.value[(m++)] = "んちゃ！";
	this.name[m] = "hitokoto4-2";this.value[(m++)] = "0";
	this.name[m] = "hitokoto4-3";this.value[(m++)] = "0";
	this.name[m] = "backcolor_red";this.value[(m++)] = "0";
	this.name[m] = "backcolor_green";this.value[(m++)] = "255";
	this.name[m] = "backcolor_blue";this.value[(m++)] = "255";
	this.name[m] = "backcolor_red_s";this.value[(m++)] = "0";
	this.name[m] = "backcolor_green_s";this.value[(m++)] = "0";
	this.name[m] = "backcolor_blue_s";this.value[(m++)] = "0";
	this.name[m] = "backcolor_red_t";this.value[(m++)] = "0";
	this.name[m] = "backcolor_green_t";this.value[(m++)] = "255";
	this.name[m] = "backcolor_blue_t";this.value[(m++)] = "255";
	this.name[m] = "backcolor_red_f";this.value[(m++)] = "192";
	this.name[m] = "backcolor_green_f";this.value[(m++)] = "48";
	this.name[m] = "backcolor_blue_f";this.value[(m++)] = "48";
	this.name[m] = "kaishi_red";this.value[(m++)] = "0";
	this.name[m] = "kaishi_green";this.value[(m++)] = "0";
	this.name[m] = "kaishi_blue";this.value[(m++)] = "0";
	this.name[m] = "scorecolor_red";this.value[(m++)] = "0";
	this.name[m] = "scorecolor_green";this.value[(m++)] = "0";
	this.name[m] = "scorecolor_blue";this.value[(m++)] = "255";
	this.name[m] = "grenade_red1";this.value[(m++)] = "255";
	this.name[m] = "grenade_green1";this.value[(m++)] = "255";
	this.name[m] = "grenade_blue1";this.value[(m++)] = "255";
	this.name[m] = "grenade_red2";this.value[(m++)] = "255";
	this.name[m] = "grenade_green2";this.value[(m++)] = "255";
	this.name[m] = "grenade_blue2";this.value[(m++)] = "0";
	this.name[m] = "mizunohadou_red";this.value[(m++)] = "0";
	this.name[m] = "mizunohadou_green";this.value[(m++)] = "32";
	this.name[m] = "mizunohadou_blue";this.value[(m++)] = "255";
	this.name[m] = "firebar_red1";this.value[(m++)] = "255";
	this.name[m] = "firebar_green1";this.value[(m++)] = "0";
	this.name[m] = "firebar_blue1";this.value[(m++)] = "0";
	this.name[m] = "firebar_red2";this.value[(m++)] = "255";
	this.name[m] = "firebar_green2";this.value[(m++)] = "192";
	this.name[m] = "firebar_blue2";this.value[(m++)] = "0";
	this.name[m] = "moji_score";this.value[(m++)] = "SCORE";
	this.name[m] = "moji_highscore";this.value[(m++)] = "HIGHSCORE";
	this.name[m] = "moji_time";this.value[(m++)] = "TIME";
	this.name[m] = "moji_jet";this.value[(m++)] = "JET";
	this.name[m] = "moji_grenade";this.value[(m++)] = "GRENADE";
	this.name[m] = "moji_left";this.value[(m++)] = "LEFT";
	this.name[m] = "moji_size";this.value[(m++)] = "14";
	this.name[m] = "filename_title";this.value[(m++)] = "title.gif";
	this.name[m] = "filename_ending";this.value[(m++)] = "ending.gif";
	this.name[m] = "filename_gameover";this.value[(m++)] = "gameover.gif";
	this.name[m] = "filename_pattern";this.value[(m++)] = "pattern.gif";
	this.name[m] = "filename_chizu";this.value[(m++)] = "chizu.gif";
	this.name[m] = "game_speed";this.value[(m++)] = "70";
	this.name[m] = "se_switch";this.value[(m++)] = "2";
	this.name[m] = "se_filename";this.value[(m++)] = "1";
	this.name[m] = "filename_se_start";this.value[(m++)] = "item.au";
	this.name[m] = "filename_se_gameover";this.value[(m++)] = "gameover.au";
	this.name[m] = "filename_se_clear";this.value[(m++)] = "clear.au";
	this.name[m] = "filename_se_coin";this.value[(m++)] = "coin.au";
	this.name[m] = "filename_se_get";this.value[(m++)] = "get.au";
	this.name[m] = "filename_se_item";this.value[(m++)] = "item.au";
	this.name[m] = "filename_se_jump";this.value[(m++)] = "jump.au";
	this.name[m] = "filename_se_sjump";this.value[(m++)] = "sjump.au";
	this.name[m] = "filename_se_kiki";this.value[(m++)] = "kiki.au";
	this.name[m] = "filename_se_fumu";this.value[(m++)] = "fumu.au";
	this.name[m] = "filename_se_tobasu";this.value[(m++)] = "tobasu.au";
	this.name[m] = "filename_se_fireball";this.value[(m++)] = "shot.au";
	this.name[m] = "filename_se_jet";this.value[(m++)] = "mgan.au";
	this.name[m] = "filename_se_miss";this.value[(m++)] = "dosun.au";
	this.name[m] = "filename_se_block";this.value[(m++)] = "bakuhatu.au";
	this.name[m] = "filename_se_mizu";this.value[(m++)] = "mizu.au";
	this.name[m] = "filename_se_dengeki";this.value[(m++)] = "mgan.au";
	this.name[m] = "filename_se_happa";this.value[(m++)] = "happa.au";
	this.name[m] = "filename_se_hinoko";this.value[(m++)] = "mgan.au";
	this.name[m] = "filename_se_mizudeppo";this.value[(m++)] = "happa.au";
	this.name[m] = "filename_se_bomb";this.value[(m++)] = "shot.au";
	this.name[m] = "filename_se_dosun";this.value[(m++)] = "dosun.au";
	this.name[m] = "filename_se_grounder";this.value[(m++)] = "mgan.au";
	this.name[m] = "filename_se_kaiole";this.value[(m++)] = "happa.au";
	this.name[m] = "filename_se_senkuuza";this.value[(m++)] = "shot.au";
	this.name[m] = "filename_se_dokan";this.value[(m++)] = "get.au";
	this.name[m] = "filename_se_chizugamen";this.value[(m++)] = "get.au";
	this.name[m] = "scroll_area";this.value[(m++)] = "1";
	this.name[m] = "clear_type";this.value[(m++)] = "1";
	this.name[m] = "fx_bgm_switch";this.value[(m++)] = "0";
	this.name[m] = "fx_bgm_loop";this.value[(m++)] = "0";
	this.name[m] = "filename_fx_bgm_stage1";this.value[(m++)] = "stage1.mid";
	this.name[m] = "filename_fx_bgm_stage2";this.value[(m++)] = "stage2.mid";
	this.name[m] = "filename_fx_bgm_stage3";this.value[(m++)] = "stage3.mid";
	this.name[m] = "filename_fx_bgm_stage4";this.value[(m++)] = "stage4.mid";
	this.name[m] = "filename_fx_bgm_boss";this.value[(m++)] = "boss.mid";
	this.name[m] = "filename_fx_bgm_title";this.value[(m++)] = "title.mid";
	this.name[m] = "filename_fx_bgm_ending";this.value[(m++)] = "ending.mid";
	this.name[m] = "filename_fx_bgm_chizu";this.value[(m++)] = "chizu.mid";
	this.name[m] = "variable_sleep_time";this.value[(m++)] = "1";
	this.name[m] = "sleep_time_visible";this.value[(m++)] = "0";
	this.name[m] = "firebar1_type";this.value[(m++)] = "1";
	this.name[m] = "firebar2_type";this.value[(m++)] = "1";
	this.name[m] = "dossunsun_type";this.value[(m++)] = "1";
	this.name[m] = "mizutaro_attack";this.value[(m++)] = "1";
	this.name[m] = "poppie_attack";this.value[(m++)] = "1";
	this.name[m] = "mariri_attack";this.value[(m++)] = "1";
	this.name[m] = "chikorin_attack";this.value[(m++)] = "1";
	this.name[m] = "taiking_attack";this.value[(m++)] = "1";
	this.name[m] = "kuragesso_attack";this.value[(m++)] = "1";
	this.name[m] = "gazou_scroll_speed_x";this.value[(m++)] = "0";
	this.name[m] = "gazou_scroll_speed_y";this.value[(m++)] = "0";
	this.name[m] = "mcs_haikei_visible";this.value[(m++)] = "0";
	this.name[m] = "pause_switch";this.value[(m++)] = "1";
	this.name[m] = "control_parts_visible";this.value[(m++)] = "1";
	this.name[m] = "coin1_type";this.value[(m++)] = "1";
	this.name[m] = "coin3_type";this.value[(m++)] = "1";
	this.name[m] = "dokan1_type";this.value[(m++)] = "1";
	this.name[m] = "dokan2_type";this.value[(m++)] = "1";
	this.name[m] = "dokan3_type";this.value[(m++)] = "1";
	this.name[m] = "dokan4_type";this.value[(m++)] = "1";
	this.name[m] = "view_move_type";this.value[(m++)] = "1";
	this.name[m] = "j_fire_equip";this.value[(m++)] = "1";
	this.name[m] = "j_fire_type";this.value[(m++)] = "1";
	this.name[m] = "j_enemy_press";this.value[(m++)] = "1";
	this.name[m] = "boss_destroy_type";this.value[(m++)] = "1";
	this.name[m] = "boss_hp_max";this.value[(m++)] = "20";
	this.name[m] = "j_tail_ap_boss";this.value[(m++)] = "4";
	this.name[m] = "boss_name";this.value[(m++)] = "BOSS";
	this.name[m] = "boss2_name";this.value[(m++)] = "BOSS";
	this.name[m] = "boss3_name";this.value[(m++)] = "BOSS";
	this.name[m] = "fs_name";this.value[(m++)] = "ファイヤーボールセレクトの人";
	this.name[m] = "serifu7-1";this.value[(m++)] = "好きなファイヤーボールを、３種類から";
	this.name[m] = "serifu7-2";this.value[(m++)] = "選んで下さい。私はサービスが良いので、";
	this.name[m] = "serifu7-3";this.value[(m++)] = "何度でも選べますよ。";
	this.name[m] = "fs_serifu1";this.value[(m++)] = "どのファイヤーボールにしますか？";
	this.name[m] = "fs_item_name1";this.value[(m++)] = "バウンド";
	this.name[m] = "fs_item_name2";this.value[(m++)] = "ストレート";
	this.name[m] = "fs_item_name3";this.value[(m++)] = "ダブル";
	this.name[m] = "fs_serifu2";this.value[(m++)] = "を装備しました。";
	this.name[m] = "j_add_tokugi";this.value[(m++)] = "1";
	this.name[m] = "j_add_tokugi2";this.value[(m++)] = "1";
	this.name[m] = "j_add_tokugi3";this.value[(m++)] = "1";
	this.name[m] = "j_add_tokugi4";this.value[(m++)] = "1";
	this.name[m] = "second_gazou_visible";this.value[(m++)] = "1";
	this.name[m] = "filename_second_haikei";this.value[(m++)] = "haikei_second.gif";
	this.name[m] = "filename_second_haikei2";this.value[(m++)] = "haikei_second.gif";
	this.name[m] = "filename_second_haikei3";this.value[(m++)] = "haikei_second.gif";
	this.name[m] = "filename_second_haikei4";this.value[(m++)] = "haikei_second.gif";
	this.name[m] = "second_gazou_scroll";this.value[(m++)] = "1";
	this.name[m] = "second_gazou_scroll_speed_x";this.value[(m++)] = "0";
	this.name[m] = "second_gazou_scroll_speed_y";this.value[(m++)] = "0";
	this.name[m] = "second_gazou_scroll_x";this.value[(m++)] = "0";
	this.name[m] = "second_gazou_scroll_y";this.value[(m++)] = "0";
	this.name[m] = "second_gazou_priority";this.value[(m++)] = "1";
	this.name[m] = "gazou_scroll_x";this.value[(m++)] = "0";
	this.name[m] = "gazou_scroll_y";this.value[(m++)] = "0";
	this.name[m] = "serifu_key1_on_name";this.value[(m++)] = "お姫様";
	this.name[m] = "serifu_key1_on-1";this.value[(m++)] = "ここから先へ進むには、";
	this.name[m] = "serifu_key1_on-2";this.value[(m++)] = "３つのＫＥＹ１が必要です。";
	this.name[m] = "serifu_key1_on-3";this.value[(m++)] = "この世界のどこかに、あるはず。";
	this.name[m] = "serifu_key1_on-4";this.value[(m++)] = "ＫＥＹ１を３つ、わたしますか？";
	this.name[m] = "serifu_key1_on-5";this.value[(m++)] = "はい";
	this.name[m] = "serifu_key1_on-6";this.value[(m++)] = "いいえ";
	this.name[m] = "serifu_key1_on-7";this.value[(m++)] = "ＫＥＹ１を３つ、持っていません。";
	this.name[m] = "serifu_key1_on-8";this.value[(m++)] = "先へ進む道が、開けました。";
	this.name[m] = "serifu_key1_on-9";this.value[(m++)] = "勇者殿、";
	this.name[m] = "serifu_key1_on-10";this.value[(m++)] = "お気を付けて。";
	this.name[m] = "key1_on_count";this.value[(m++)] = "3";
	this.name[m] = "serifu_key2_on_name";this.value[(m++)] = "ザトシ";
	this.name[m] = "serifu_key2_on-1";this.value[(m++)] = "３つのＫＥＹ２がないと、";
	this.name[m] = "serifu_key2_on-2";this.value[(m++)] = "ここから先へは進めないぜ。";
	this.name[m] = "serifu_key2_on-3";this.value[(m++)] = "どこかで見つ付けてくれ。";
	this.name[m] = "serifu_key2_on-4";this.value[(m++)] = "ＫＥＹ２を３つ、わたしますか？";
	this.name[m] = "serifu_key2_on-5";this.value[(m++)] = "はい";
	this.name[m] = "serifu_key2_on-6";this.value[(m++)] = "いいえ";
	this.name[m] = "serifu_key2_on-7";this.value[(m++)] = "ＫＥＹ２を３つ、持っていません。";
	this.name[m] = "serifu_key2_on-8";this.value[(m++)] = "３つのＫＥＹ２、受け取ったぜ。";
	this.name[m] = "serifu_key2_on-9";this.value[(m++)] = "これで、先へ進めるようになったな。";
	this.name[m] = "serifu_key2_on-10";this.value[(m++)] = "0";
	this.name[m] = "key2_on_count";this.value[(m++)] = "3";
	this.name[m] = "water_visible";this.value[(m++)] = "1";
	this.name[m] = "water_clear_switch";this.value[(m++)] = "1";
	this.name[m] = "water_clear_level";this.value[(m++)] = "128";
	this.name[m] = "serifu_grenade_shop_name";this.value[(m++)] = "クリス";
	this.name[m] = "serifu_grenade_shop-1";this.value[(m++)] = "グレネード１発を、";
	this.name[m] = "serifu_grenade_shop-2";this.value[(m++)] = "２０点で売りますよ。";
	this.name[m] = "serifu_grenade_shop-3";this.value[(m++)] = "0";
	this.name[m] = "serifu_grenade_shop-4";this.value[(m++)] = "何発にしますか？";
	this.name[m] = "serifu_grenade_shop-5";this.value[(m++)] = "得点が、足りません。";
	this.name[m] = "serifu_grenade_shop-6";this.value[(m++)] = "グレネードを手に入れた。";
	this.name[m] = "grenade_shop_score";this.value[(m++)] = "20";

	this.name[m] = "audio_se_switch_wave";this.value[(m++)] = "1";
	this.name[m] = "audio_se_switch_mp3";this.value[(m++)] = "1";
	this.name[m] = "audio_se_switch_ogg";this.value[(m++)] = "1";
	this.name[m] = "audio_bgm_switch_wave";this.value[(m++)] = "2";
	this.name[m] = "audio_bgm_switch_mp3";this.value[(m++)] = "1";
	this.name[m] = "audio_bgm_switch_ogg";this.value[(m++)] = "1";







	this.tag_kazu = m;
}

TagDataBase.prototype.getValue = function(paramString)
{
	for (var i = 0; i < this.tag_kazu; i++) {
		if (this.name[i] == paramString)
		{
			var str = String(this.value[i]);
			return str;
		}
	}
	alert("Error : No param " + paramString);
	return null;
}

TagDataBase.prototype.getValueInt = function(paramString)
{
	for (var i = 0; i < this.tag_kazu; i++) {
		if (this.name[i] == paramString)
		{
			var j;
			j = parseInt(this.value[i]);
			if(isNaN(j))
				j = -1;
			return j;
		}
	}
	alert("Error : No param " + paramString);

	return -1;
}

TagDataBase.prototype.setValue = function(paramString1, paramString2)
{
	for (var i = 0; i < this.tag_kazu; i++) {
		if (this.name[i] == paramString1)
		{
			this.value[i] = String(paramString2);

			return true;
		}
	}
	alert("Error : No param " + paramString1);

	return false;
}

TagDataBase.prototype.setValueFromHTML = function(paramApplet)
{
	for (var i = 0; i < this.tag_kazu; i++)
	{
		var str = paramApplet.getParameter(this.name[i]);
		if (str != null) {
			this.value[i] = String(str);
		}
	}
	return true;
}

TagDataBase.prototype.setValueStage1 = function()
{
	var i = 0;



	this.name[i] = "map0-0";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-1";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-2";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-3";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-4";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-5";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-6";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-7";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-8";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-9";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-10";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-11";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-12";this.value[(i++)] = "............................................999.............";
	this.name[i] = "map0-13";this.value[(i++)] = "............................................999.............";
	this.name[i] = "map0-14";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-15";this.value[(i++)] = "............................................aaa.............";
	this.name[i] = "map0-16";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-17";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-18";this.value[(i++)] = "...............................99...........................";
	this.name[i] = "map0-19";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-20";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-21";this.value[(i++)] = "............................................................";
	this.name[i] = "map0-22";this.value[(i++)] = "...12...............12.....9.9...aaa.....aa.aaaaaaaa...12...";
	this.name[i] = "map0-23";this.value[(i++)] = ".............B............aaaaa..............9.aaaaa........";
	this.name[i] = "map0-24";this.value[(i++)] = ".........aaaaa..........................B...aaaaaaaa........";
	this.name[i] = "map0-25";this.value[(i++)] = "....9.9.............................aaaaa...9.9aa999........";
	this.name[i] = "map0-26";this.value[(i++)] = "....aaa...............B.............9.9.9...aaaaaaaa........";
	this.name[i] = "map0-27";this.value[(i++)] = "...........aaaaaa..aaaaaa....................9.aaaaa........";
	this.name[i] = "map0-28";this.value[(i++)] = ".A........aaaaaaa..aaaaaa............D......aaaaaaaa........";
	this.name[i] = "map0-29";this.value[(i++)] = "bbbbbbbbbbbbbbbbb..bbbbbb.bbbbbbbbbbbbbbbbbbbbbbbbbb5bbbbbb.";

	this.name[i] = "map1-0";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-1";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-2";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-3";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-4";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-5";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-6";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-7";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-8";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-9";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-10";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-11";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-12";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-13";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-14";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-15";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-16";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-17";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-18";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-19";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-20";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-21";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-22";this.value[(i++)] = "...12....12.....12.....12....12....12.......................";
	this.name[i] = "map1-23";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-24";this.value[(i++)] = "............................................................";
	this.name[i] = "map1-25";this.value[(i++)] = "...................O........................................";
	this.name[i] = "map1-26";this.value[(i++)] = ".................aaaa...................feef................";
	this.name[i] = "map1-27";this.value[(i++)] = ".............aaaaaaaaaaa................e..e..............E.";
	this.name[i] = "map1-28";this.value[(i++)] = "..........O..aaaaaaaaaaa.O.....O........feefeef..feeeefeeeef";
	this.name[i] = "map1-29";this.value[(i++)] = "..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.......e..e..e..e....e....e";

	this.name[i] = "map2-0";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-1";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-2";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-3";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-4";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-5";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-6";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-7";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-8";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-9";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-10";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-11";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-12";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-13";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-14";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-15";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-16";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-17";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-18";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-19";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-20";this.value[(i++)] = "............................................................";
	this.name[i] = "map2-21";this.value[(i++)] = "........................................................8...";
	this.name[i] = "map2-22";this.value[(i++)] = "..................99........12.....12....12....12.......a...";
	this.name[i] = "map2-23";this.value[(i++)] = "..................dd...................................aaa..";
	this.name[i] = "map2-24";this.value[(i++)] = "..e.ef...................9.9.9.9......................aaaaa.";
	this.name[i] = "map2-25";this.value[(i++)] = "..e..e.............................................F.aaaaaaa";
	this.name[i] = "map2-26";this.value[(i++)] = "..e..e.......E..............................aaaaaaaaaaaaaaaa";
	this.name[i] = "map2-27";this.value[(i++)] = "..e..e.feeefeeef..99...................F....aaaaaaaaaaaaaaaa";
	this.name[i] = "map2-28";this.value[(i++)] = "..feef.e...e...e..dd...aaaaaaaaaaaaaaaaaaa..aaaaaaaaaaaaaaaa";
	this.name[i] = "map2-29";this.value[(i++)] = "..e..e.e...e...e.......aaaaaaaaaaaaaaaaaaa..aaaaaaaaaaaaaaaa";
}

/*public boolean setValueFromHTMLFile(File paramFile)
使わない
{
	String[] arrayOfString1 = new String[5000];
	int i = 0;
	String str1 = "";
	String[] arrayOfString2 = new String[1000];
	String[] arrayOfString3 = new String[1000];
	int j = 0;




	int i2 = 0;
	int i3 = 0;



	File localFile = paramFile;
	if (!localFile.exists()) {
		return false;
	}
	initParameter();
	for (int n = 0; n <= 4999; n++) {
		arrayOfString1[n] = null;
	}
	for (n = 0; n <= 999; n++)
	{
		arrayOfString2[n] = null;
		arrayOfString3[n] = null;
	}
	String str2;
	try
	{
		FileInputStream localFileInputStream = new FileInputStream(localFile);
		InputStreamReader localInputStreamReader = new InputStreamReader(localFileInputStream, "UTF-8");
		BufferedReader localBufferedReader = new BufferedReader(localInputStreamReader);

		i1 = 0;
		while (((str2 = localBufferedReader.readLine()) != null) && 
			(i1 <= 4998))
		{
			arrayOfString1[i1] = new String(str2);
			i1++;
		}
		i = i1;


		localBufferedReader.close();
		localInputStreamReader.close();
		localFileInputStream.close();
	}
	catch (IOException localIOException)
	{
		return false;
	}
	str1 = "";
	for (n = 0; n < i; n++) {
		str1 = new String(str1 + arrayOfString1[n]);
	}
	int k;
	for (;;)
	{
		k = str1.indexOf("<!--");
		if (k < 0) {
			break label388;
		}
		str2 = new String(str1.substring(k + 4, str1.length()));

		int m = str2.indexOf("-->");
		if (m < 0) {
			break;
		}
		str1 = new String(str1.substring(0, k + 1) + str2.substring(m + 3, str2.length()));
	}
	str1 = new String(str1.substring(0, k + 1));
	label388:
	int i1 = 0;
	j = 0;
	for (;;)
	{
		k = str1.indexOf("param");
		if (k < 0) {
			k = str1.indexOf("PARAM");
		}
		if (k < 0) {
			break;
		}
		str1 = new String(str1.substring(k + 5, str1.length()));


		k = str1.indexOf("name");
		if (k < 0) {
			k = str1.indexOf("NAME");
		}
		if (k < 0) {
			break;
		}
		k = str1.indexOf("=");
		if (k < 0) {
			break;
		}
		str1 = new String(str1.substring(k + 1, str1.length()));


		k = str1.indexOf("\"");
		if ((k >= 0) && (k <= 7))
		{
			str1 = new String(str1.substring(k + 1, str1.length()));


			k = str1.indexOf("\"");
			if (k < 0) {
				break;
			}
			arrayOfString2[i1] = new String(str1.substring(0, k));
		}
		else
		{
			k = str1.indexOf(" ");
			if (k < 0) {
				break;
			}
			if (k == 0)
			{
				str1 = new String(str1.substring(1, str1.length()));


				k = str1.indexOf(" ");
				if (k < 0) {
					break;
				}
			}
			arrayOfString2[i1] = new String(str1.substring(0, k));
		}
		k = str1.indexOf("value");
		if (k < 0) {
			k = str1.indexOf("VALUE");
		}
		if (k < 0) {
			break;
		}
		k = str1.indexOf("=");
		if (k < 0) {
			break;
		}
		str1 = new String(str1.substring(k + 1, str1.length()));


		k = str1.indexOf("\"");
		if ((k >= 0) && (k <= 7))
		{
			str1 = new String(str1.substring(k + 1, str1.length()));


			k = str1.indexOf("\"");
			if (k < 0) {
				break;
			}
			arrayOfString3[i1] = new String(str1.substring(0, k));
		}
		else
		{
			k = str1.indexOf(" ");
			if (k < 0) {
				break;
			}
			if (k == 0)
			{
				str1 = str1.substring(1, str1.length());


				k = str1.indexOf(" ");
				if (k < 0) {
					break;
				}
			}
			arrayOfString3[i1] = new String(str1.substring(0, k));
		}
		i1++;
		j++;
	}
	for (n = 0; n < j; n++) {
		setValue(arrayOfString2[n], arrayOfString3[n]);
	}
	return true;
}

public boolean setValueFromFMF(File paramFile)
{
	short[][] arrayOfShort1 = new short['\u00B4'][30];
	short[][] arrayOfShort2 = new short['\u00B4'][30];
	String str2 = null;
	String str3 = null;

	String str4 = ".abcdefghij56123987YzmnopqrstklyKLMNuvwxUV+-* /[]ABCDHIJEFOGPQSTZ4WXR<>..........";



	File localFile = paramFile;
	if (!localFile.exists()) {
		return false;
	}
	int m;
	for (int n = 0; n <= 29; n++) {
		for (m = 0; m <= 179; m++)
		{
			arrayOfShort1[m][n] = 0;
			arrayOfShort2[m][n] = 0;
		}
	}
	int[] arrayOfInt = new int[10820];
	for (int j = 0; j <= 10819; j++) {
		arrayOfInt[j] = 0;
	}
	int i;
	try
	{
		FileInputStream localFileInputStream = new FileInputStream(localFile);
		DataInputStream localDataInputStream = new DataInputStream(localFileInputStream);


		k = 0;
		for (j = 0; j <= 19; j++)
		{
			arrayOfInt[k] = localDataInputStream.readUnsignedByte();
			k++;
		}
		if (arrayOfInt[18] >= 2) {
			for (j = 1; j <= 5400; j++)
			{
				i = localDataInputStream.readUnsignedByte();
				if ((i >= 0) && (i <= 255))
				{
					arrayOfInt[k] = i;
					k++;
				}
			}
		}
		for (j = 1; j <= 5400; j++)
		{
			i = localDataInputStream.readUnsignedByte();
			if (i >= 80) {
				i = 0;
			}
			if ((i >= 0) && (i <= 79))
			{
				arrayOfInt[k] = i;
				k++;
			}
		}
		localDataInputStream.close();
		localFileInputStream.close();
	}
	catch (IOException localIOException)
	{
		return false;
	}
	initParameter();


	int k = 20;
	if (arrayOfInt[18] >= 2)
	{
		setValue("layer_mode", "2");
		for (n = 0; n < 30; n++) {
			for (m = 0; m < 180; m++)
			{
				i = arrayOfInt[k];
				k++;
				arrayOfShort2[m][n] = ((short)i);
			}
		}
	}
	for (n = 0; n < 30; n++) {
		for (m = 0; m < 180; m++)
		{
			i = arrayOfInt[k];
			k++;
			arrayOfShort1[m][n] = ((short)i);
		}
	}
	int i1;
	for (n = 0; n <= 29; n++)
	{
		str2 = "map0-" + n;
		str3 = "";
		for (m = 0; m <= 59; m++)
		{
			i1 = arrayOfShort1[m][n];
			if ((i1 < 0) || (i1 > 79)) {
				i1 = 0;
			}
			str3 = str3 + str4.substring(i1, i1 + 1);
		}
		setValue(str2, str3);
	}
	for (n = 0; n <= 29; n++)
	{
		str2 = "map1-" + n;
		str3 = "";
		for (m = 0; m <= 59; m++)
		{
			i1 = arrayOfShort1[(m + 60)][n];
			if ((i1 < 0) || (i1 > 79)) {
				i1 = 0;
			}
			str3 = str3 + str4.substring(i1, i1 + 1);
		}
		setValue(str2, str3);
	}
	for (n = 0; n <= 29; n++)
	{
		str2 = "map2-" + n;
		str3 = "";
		for (m = 0; m <= 59; m++)
		{
			i1 = arrayOfShort1[(m + 120)][n];
			if ((i1 < 0) || (i1 > 79)) {
				i1 = 0;
			}
			str3 = str3 + str4.substring(i1, i1 + 1);
		}
		setValue(str2, str3);
	}
	String str1;
	for (n = 0; n <= 29; n++)
	{
		str2 = "layer0-" + n;
		str3 = "";
		for (m = 0; m <= 59; m++)
		{
			i1 = arrayOfShort2[m][n];
			if ((i1 < 0) || (i1 >= 255)) {
				i1 = 0;
			}
			if (i1 == 0)
			{
				str1 = "..";
			}
			else
			{
				str1 = Integer.toHexString(i1);
				if (str1.length() <= 1) {
					str1 = "0" + str1;
				}
			}
			str3 = str3 + str1;
		}
		setValue(str2, str3);
	}
	for (n = 0; n <= 29; n++)
	{
		str2 = "layer1-" + n;
		str3 = "";
		for (m = 0; m <= 59; m++)
		{
			i1 = arrayOfShort2[(m + 60)][n];
			if ((i1 < 0) || (i1 >= 255)) {
				i1 = 0;
			}
			if (i1 == 0)
			{
				str1 = "..";
			}
			else
			{
				str1 = Integer.toHexString(i1);
				if (str1.length() <= 1) {
					str1 = "0" + str1;
				}
			}
			str3 = str3 + str1;
		}
		setValue(str2, str3);
	}
	for (n = 0; n <= 29; n++)
	{
		str2 = "layer2-" + n;
		str3 = "";
		for (m = 0; m <= 59; m++)
		{
			i1 = arrayOfShort2[(m + 120)][n];
			if ((i1 < 0) || (i1 >= 255)) {
				i1 = 0;
			}
			if (i1 == 0)
			{
				str1 = "..";
			}
			else
			{
				str1 = Integer.toHexString(i1);
				if (str1.length() <= 1) {
					str1 = "0" + str1;
				}
			}
			str3 = str3 + str1;
		}
		setValue(str2, str3);
	}
	return true;
}*/

TagDataBase.prototype.setValueFromHTMLText = function(paramString)
{
	var str1 = "";
	var arrayOfString1 = new Array(1000);
	var arrayOfString2 = new Array(1000);
	var i = 0;
	for (var m = 0; m <= 999; m++)
	{
		arrayOfString1[m] = null;
		arrayOfString2[m] = null;
	}
	this.initParameter();


	str1 = String(paramString);





	var j = str1.indexOf("<body ");
	if (j < 0) {
		j = str1.indexOf("<BODY ");
	}
	if (j >= 0) {
		str1 = str1.substring(j, str1.length);
	}
	j = str1.indexOf("<applet ");
	if (j < 0) {
		j = str1.indexOf("<APPLET ");
	}
	if (j >= 0) {
		str1 = str1.substring(j, str1.length);
	}
	j = str1.lastIndexOf("</applet>");
	if (j < 0) {
		j = str1.lastIndexOf("</APPLET>");
	}
	if (j >= 0) {
		str1 = str1.substring(0, j + 1 + 8);
	}
	var flag301 = true;
	for (;;)
	{
		j = str1.indexOf("<!--");
		if (j < 0) {
			flag301 = false;
			break;
		}
		var str2 = String(str1.substring(j + 4, str1.length));

		var k = str2.indexOf("-->");
		if (k < 0) {
			break;
		}
		str1 = String(str1.substring(0, j + 1) + str2.substring(k + 3, str2.length));
	}
	if(flag301) str1 = String(str1.substring(0, j + 1));
	var n = 0;
	i = 0;
	for (;;)
	{
		j = str1.indexOf("param");
		if (j < 0) {
			j = str1.indexOf("PARAM");
		}
		if (j < 0) {
			break;
		}
		str1 = String(str1.substring(j + 5, str1.length));


		j = str1.indexOf("name");
		if (j < 0) {
			j = str1.indexOf("NAME");
		}
		if (j < 0) {
			break;
		}
		j = str1.indexOf("=");
		if (j < 0) {
			break;
		}
		str1 = String(str1.substring(j + 1, str1.length));


		j = str1.indexOf("\"");
		if ((j >= 0) && (j <= 7))
		{
			str1 = String(str1.substring(j + 1, str1.length));


			j = str1.indexOf("\"");
			if (j < 0) {
				break;
			}
			arrayOfString1[n] = String(str1.substring(0, j));
		}
		else
		{
			j = str1.indexOf(" ");
			if (j < 0) {
				break;
			}
			if (j == 0)
			{
				str1 = String(str1.substring(1, str1.length));


				j = str1.indexOf(" ");
				if (j < 0) {
					break;
				}
			}
			arrayOfString1[n] = String(str1.substring(0, j));
		}
		j = str1.indexOf("value");
		if (j < 0) {
			j = str1.indexOf("VALUE");
		}
		if (j < 0) {
			break;
		}
		j = str1.indexOf("=");
		if (j < 0) {
			break;
		}
		str1 = String(str1.substring(j + 1, str1.length));


		j = str1.indexOf("\"");
		if ((j >= 0) && (j <= 7))
		{
			str1 = String(str1.substring(j + 1, str1.length));


			j = str1.indexOf("\"");
			if (j < 0) {
				break;
			}
			arrayOfString2[n] = String(str1.substring(0, j));
		}
		else
		{
			j = str1.indexOf(" ");
			if (j < 0) {
				break;
			}
			if (j == 0)
			{
				str1 = str1.substring(1, str1.length);


				j = str1.indexOf(" ");
				if (j < 0) {
					break;
				}
			}
			arrayOfString2[n] = String(str1.substring(0, j));
		}
		n++;
		i++;
	}
	for (m = 0; m < i; m++) {
		setValue(arrayOfString1[m], arrayOfString2[m]);
	}
	return true;
}

/*this.loadTextString = function(paramString1, paramString2, paramApplet)
{
	var str = "";


	String[] arrayOfString = loadText(paramString1, paramString2, paramApplet);
	if (arrayOfString == null) {
		return null;
	}
	if (arrayOfString.length <= 0) {
		return null;
	}
	for (int i = 0; i < arrayOfString.length; i++) {
		str = str + arrayOfString[i] + "\n";
	}
	return str;
}*/

/*public String[] loadText(String paramString1, String paramString2, Applet paramApplet)
{
	String[] arrayOfString1 = null;

	String[] arrayOfString2 = new String[10000];

	int j = 0;
	String str = null;




	int k = 0;
	for (int i = 0; i <= 9999; i++) {
		arrayOfString2[i] = null;
	}
	try
	{
		InputStream localInputStream = new URL(paramApplet.getCodeBase(), paramString1).openStream();


		InputStreamReader localInputStreamReader = new InputStreamReader(localInputStream, paramString2);
		BufferedReader localBufferedReader = new BufferedReader(localInputStreamReader);

		j = 0;
		while (((str = localBufferedReader.readLine()) != null) && 
			(j <= 9998))
		{
			arrayOfString2[j] = str;
			j++;
		}
		k = j;


		localBufferedReader.close();
		localInputStreamReader.close();
		localInputStream.close();
	}
	catch (IOException localIOException)
	{
		return null;
	}
	arrayOfString1 = new String[k];
	for (i = 0; i < arrayOfString1.length; i++) {
		arrayOfString1[i] = arrayOfString2[i];
	}
	return arrayOfString1;
}*/
