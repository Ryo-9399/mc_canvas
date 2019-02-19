function TagDataBase() {
	this.tag_kazu = 0;
	this.params = {};
	this.options = {};
	this.initParameter();
}

TagDataBase.prototype.initParameter = function() {
	this.params = {
		"chizu-0": "...............",
		"chizu-1": ".b33E33333c..C.",
		"chizu-2": "....2.....2..2.",
		"chizu-3": "....2.....2..2.",
		"chizu-4": "....A33a331331.",
		"chizu-5": ".i.....2.......",
		"chizu-6": ".2.....2.......",
		"chizu-7": ".B33D3313f3d...",
		"chizu-8": "...............",
		mes1_name: "ダケシ",
		"serifu1-1": "人の命は、お金では買えないと言われています。",
		"serifu1-2": "しかし、お店へ行けば、ＳＣＯＲＥで買えます。",
		"serifu1-3": "0",
		"serifu2-1": "時は金なりと、言われています。しかし、",
		"serifu2-2": "お店なら、時間も買えます。",
		"serifu2-3": "店員さんて、グレートですね。",
		mes2_name: "エリコ",
		"serifu3-1": "おはようございます。星と数字が付いた扉が、",
		"serifu3-2": "ありますよね。あれは、ですねえ、その数だけ",
		"serifu3-3": "人面星を取ると、開くので、ございます。",
		"serifu4-1": "LAST STAGEというのは、最終面の事ですわ。",
		"serifu4-2": "これをクリアーすると、エンディングに、",
		"serifu4-3": "行けますのよ。がんばって下さいね。",
		shop_name: "店員さん",
		"serifu5-1": "いらっしゃいませ。",
		"serifu5-2": "当店では、ＳＣＯＲＥと、アイテムを、",
		"serifu5-3": "交換いたします。",
		"serifu8-1": "本日の営業は、終了いたしました。",
		"serifu8-2": "またのご来店を、",
		"serifu8-3": "こころより、お待ちしております。",
		shop_serifu1: "どれになさいますか？",
		shop_serifu2: "で、よろしいですか？",
		shop_serifu3: "はい",
		shop_serifu4: "いいえ",
		shop_serifu5: "を、装備した。",
		shop_serifu6: "ＳＣＯＲＥが、足りません。",
		shop_item_name1: "グレネード３発",
		shop_item_name2: "ジェット",
		shop_item_name3: "ドリル",
		shop_item_name4: "ヘルメット",
		shop_item_name5: "しっぽ",
		shop_item_name6: "バリア",
		shop_item_name7: "ファイヤーボール",
		shop_item_name8: "１ｕｐ",
		shop_item_name9: "制限時間増加",
		shop_item_teika1: "200",
		shop_item_teika2: "150",
		shop_item_teika3: "100",
		shop_item_teika4: "100",
		shop_item_teika5: "250",
		shop_item_teika6: "80",
		shop_item_teika7: "300",
		shop_item_teika8: "980",
		shop_item_teika9: "1",
		setumei_name: "キドはかせ",
		"serifu9-1": "よく来た。わしは、キドはかせ。",
		"serifu9-2": "アイテムの研究をしており、みんなから、",
		"serifu9-3": "アイテムはかせと呼ばれて、したわれておるよ。",
		setumei_menu1: "なんでも、質問してくれたまえよ。",
		setumei_menu2: "ファイヤーボール",
		setumei_menu3: "バリア",
		setumei_menu4: "ジェット",
		"serifu10-1": "黄色いチューリップのアイテムと言えば、",
		"serifu10-2": "そう、ファイヤーボールじゃな。はなれた",
		"serifu10-3": "敵を攻撃できるという、大変便利なものじゃ。",
		"serifu11-1": "ピンクのキノコのアイテムと言えば、そう、",
		"serifu11-2": "バリアじゃな。体当たりで敵を倒せるが、うっかり",
		"serifu11-3": "して、時間切れを忘れぬよう、注意が必要じゃ。",
		"serifu12-1": "ロケットの形のアイテムと言えば、そう、ジェット",
		"serifu12-2": "じゃな。空中で、スペースキーを押せば、さらに",
		"serifu12-3": "上昇できる。燃料切れには、気を付けるのじゃぞ。",
		door_score: "800",
		layer_mode: "1",
		filename_mapchip: "mapchip.gif",
		filename_haikei: "haikei.gif",
		filename_haikei2: "haikei.gif",
		filename_haikei3: "haikei.gif",
		filename_haikei4: "haikei.gif",
		gazou_scroll: "2",
		easy_mode: "1",
		now_loading: "ただいまファイルを読み込み中。しばらくお待ち下さい。",
		time_max: "300",
		scroll_mode: "1",
		scroll_mode_s: "1",
		scroll_mode_t: "1",
		scroll_mode_f: "1",
		score_v: "1",
		stage_max: "1",
		stage_kaishi: "1",
		jibun_left_shoki: "1",
		score_1up_1: "500",
		score_1up_2: "1000",
		stage_select: "1",
		j_tail_type: "1",
		j_tail_hf: "1",
		j_fire_mkf: "1",
		grenade_type: "1",
		suberuyuka_hkf: "1",
		dengeki_mkf: "1",
		yachamo_kf: "1",
		airms_kf: "1",
		ugokuyuka1_type: "1",
		ugokuyuka2_type: "1",
		ugokuyuka3_type: "1",
		boss_type: "1",
		boss2_type: "1",
		boss3_type: "1",
		url1: "http://www.yahoo.co.jp/",
		url2: "http://www.yahoo.co.jp/",
		url3: "http://www.yahoo.co.jp/",
		url4: "http://www.t3.rim.or.jp/~naoto/naoto.html",
		dokan_mode: "1",
		j_tokugi: "1",
		hitokoto1_name: "浩二",
		"hitokoto1-1": "今日は、いい天気だね。",
		"hitokoto1-2": "0",
		"hitokoto1-3": "0",
		hitokoto2_name: "お姫様",
		"hitokoto2-1": "ついに、ここまで来ましたね。",
		"hitokoto2-2": "0",
		"hitokoto2-3": "0",
		hitokoto3_name: "ザトシ",
		"hitokoto3-1": "オレは、世界一になる男だ。",
		"hitokoto3-2": "0",
		"hitokoto3-3": "0",
		hitokoto4_name: "クリス",
		"hitokoto4-1": "んちゃ！",
		"hitokoto4-2": "0",
		"hitokoto4-3": "0",
		backcolor_red: "0",
		backcolor_green: "255",
		backcolor_blue: "255",
		backcolor_red_s: "0",
		backcolor_green_s: "0",
		backcolor_blue_s: "0",
		backcolor_red_t: "0",
		backcolor_green_t: "255",
		backcolor_blue_t: "255",
		backcolor_red_f: "192",
		backcolor_green_f: "48",
		backcolor_blue_f: "48",
		kaishi_red: "0",
		kaishi_green: "0",
		kaishi_blue: "0",
		scorecolor_red: "0",
		scorecolor_green: "0",
		scorecolor_blue: "255",
		grenade_red1: "255",
		grenade_green1: "255",
		grenade_blue1: "255",
		grenade_red2: "255",
		grenade_green2: "255",
		grenade_blue2: "0",
		mizunohadou_red: "0",
		mizunohadou_green: "32",
		mizunohadou_blue: "255",
		firebar_red1: "255",
		firebar_green1: "0",
		firebar_blue1: "0",
		firebar_red2: "255",
		firebar_green2: "192",
		firebar_blue2: "0",
		moji_score: "SCORE",
		moji_highscore: "HIGHSCORE",
		moji_time: "TIME",
		moji_jet: "JET",
		moji_grenade: "GRENADE",
		moji_left: "LEFT",
		moji_size: "14",
		filename_title: "title.gif",
		filename_ending: "ending.gif",
		filename_gameover: "gameover.gif",
		filename_pattern: "pattern.gif",
		filename_chizu: "chizu.gif",
		game_speed: "70",
		se_switch: "2",
		se_filename: "1",
		filename_se_start: "item.au",
		filename_se_gameover: "gameover.au",
		filename_se_clear: "clear.au",
		filename_se_coin: "coin.au",
		filename_se_get: "get.au",
		filename_se_item: "item.au",
		filename_se_jump: "jump.au",
		filename_se_sjump: "sjump.au",
		filename_se_kiki: "kiki.au",
		filename_se_fumu: "fumu.au",
		filename_se_tobasu: "tobasu.au",
		filename_se_fireball: "shot.au",
		filename_se_jet: "mgan.au",
		filename_se_miss: "dosun.au",
		filename_se_block: "bakuhatu.au",
		filename_se_mizu: "mizu.au",
		filename_se_dengeki: "mgan.au",
		filename_se_happa: "happa.au",
		filename_se_hinoko: "mgan.au",
		filename_se_mizudeppo: "happa.au",
		filename_se_bomb: "shot.au",
		filename_se_dosun: "dosun.au",
		filename_se_grounder: "mgan.au",
		filename_se_kaiole: "happa.au",
		filename_se_senkuuza: "shot.au",
		filename_se_dokan: "get.au",
		filename_se_chizugamen: "get.au",
		scroll_area: "1",
		clear_type: "1",
		fx_bgm_switch: "0",
		fx_bgm_loop: "0",
		filename_fx_bgm_stage1: "stage1.mid",
		filename_fx_bgm_stage2: "stage2.mid",
		filename_fx_bgm_stage3: "stage3.mid",
		filename_fx_bgm_stage4: "stage4.mid",
		filename_fx_bgm_boss: "boss.mid",
		filename_fx_bgm_title: "title.mid",
		filename_fx_bgm_ending: "ending.mid",
		filename_fx_bgm_chizu: "chizu.mid",
		variable_sleep_time: "1",
		sleep_time_visible: "0",
		firebar1_type: "1",
		firebar2_type: "1",
		dossunsun_type: "1",
		mizutaro_attack: "1",
		poppie_attack: "1",
		mariri_attack: "1",
		chikorin_attack: "1",
		taiking_attack: "1",
		kuragesso_attack: "1",
		gazou_scroll_speed_x: "0",
		gazou_scroll_speed_y: "0",
		mcs_haikei_visible: "0",
		pause_switch: "1",
		control_parts_visible: "1",
		coin1_type: "1",
		coin3_type: "1",
		dokan1_type: "1",
		dokan2_type: "1",
		dokan3_type: "1",
		dokan4_type: "1",
		view_move_type: "1",
		j_fire_equip: "1",
		j_fire_type: "1",
		j_enemy_press: "1",
		boss_destroy_type: "1",
		boss_hp_max: "20",
		j_tail_ap_boss: "4",
		boss_name: "BOSS",
		boss2_name: "BOSS",
		boss3_name: "BOSS",
		fs_name: "ファイヤーボールセレクトの人",
		"serifu7-1": "好きなファイヤーボールを、３種類から",
		"serifu7-2": "選んで下さい。私はサービスが良いので、",
		"serifu7-3": "何度でも選べますよ。",
		fs_serifu1: "どのファイヤーボールにしますか？",
		fs_item_name1: "バウンド",
		fs_item_name2: "ストレート",
		fs_item_name3: "ダブル",
		fs_serifu2: "を装備しました。",
		j_add_tokugi: "1",
		j_add_tokugi2: "1",
		j_add_tokugi3: "1",
		j_add_tokugi4: "1",
		second_gazou_visible: "1",
		filename_second_haikei: "haikei_second.gif",
		filename_second_haikei2: "haikei_second.gif",
		filename_second_haikei3: "haikei_second.gif",
		filename_second_haikei4: "haikei_second.gif",
		second_gazou_scroll: "1",
		second_gazou_scroll_speed_x: "0",
		second_gazou_scroll_speed_y: "0",
		second_gazou_scroll_x: "0",
		second_gazou_scroll_y: "0",
		second_gazou_priority: "1",
		gazou_scroll_x: "0",
		gazou_scroll_y: "0",
		serifu_key1_on_name: "お姫様",
		"serifu_key1_on-1": "ここから先へ進むには、",
		"serifu_key1_on-2": "３つのＫＥＹ１が必要です。",
		"serifu_key1_on-3": "この世界のどこかに、あるはず。",
		"serifu_key1_on-4": "ＫＥＹ１を３つ、わたしますか？",
		"serifu_key1_on-5": "はい",
		"serifu_key1_on-6": "いいえ",
		"serifu_key1_on-7": "ＫＥＹ１を３つ、持っていません。",
		"serifu_key1_on-8": "先へ進む道が、開けました。",
		"serifu_key1_on-9": "勇者殿、",
		"serifu_key1_on-10": "お気を付けて。",
		key1_on_count: "3",
		serifu_key2_on_name: "ザトシ",
		"serifu_key2_on-1": "３つのＫＥＹ２がないと、",
		"serifu_key2_on-2": "ここから先へは進めないぜ。",
		"serifu_key2_on-3": "どこかで見つ付けてくれ。",
		"serifu_key2_on-4": "ＫＥＹ２を３つ、わたしますか？",
		"serifu_key2_on-5": "はい",
		"serifu_key2_on-6": "いいえ",
		"serifu_key2_on-7": "ＫＥＹ２を３つ、持っていません。",
		"serifu_key2_on-8": "３つのＫＥＹ２、受け取ったぜ。",
		"serifu_key2_on-9": "これで、先へ進めるようになったな。",
		"serifu_key2_on-10": "0",
		key2_on_count: "3",
		water_visible: "1",
		water_clear_switch: "1",
		water_clear_level: "128",
		serifu_grenade_shop_name: "クリス",
		"serifu_grenade_shop-1": "グレネード１発を、",
		"serifu_grenade_shop-2": "２０点で売りますよ。",
		"serifu_grenade_shop-3": "0",
		"serifu_grenade_shop-4": "何発にしますか？",
		"serifu_grenade_shop-5": "得点が、足りません。",
		"serifu_grenade_shop-6": "グレネードを手に入れた。",
		grenade_shop_score: "20",

		audio_se_switch_wave: "1",
		audio_se_switch_mp3: "1",
		audio_se_switch_ogg: "1",
		audio_bgm_switch_wave: "2",
		audio_bgm_switch_mp3: "1",
		audio_bgm_switch_ogg: "1"
	};

	var str2 = "";
	var str3 = "";
	for (var i = 0; i <= 59; i++) {
		str2 = str2 + ".";
		str3 = str3 + "..";
	}
	var j;
	var str1;
	for (var k = 0; k <= 2; k++) {
		for (j = 0; j <= 29; j++) {
			str1 = "map" + k + "-" + j;
			this.params[str1] = ".";
		}
	}
	for (k = 0; k <= 2; k++) {
		for (j = 0; j <= 29; j++) {
			str1 = "map" + k + "-" + j + "-s";
			this.params[str1] = ".";
		}
	}
	for (k = 0; k <= 2; k++) {
		for (j = 0; j <= 29; j++) {
			str1 = "map" + k + "-" + j + "-t";
			this.params[str1] = ".";
		}
	}
	for (k = 0; k <= 2; k++) {
		for (j = 0; j <= 29; j++) {
			str1 = "map" + k + "-" + j + "-f";
			this.params[str1] = ".";
		}
	}
	for (k = 0; k <= 2; k++) {
		for (j = 0; j <= 29; j++) {
			str1 = "layer" + k + "-" + j;
			this.params[str1] = str3;
		}
	}
	for (k = 0; k <= 2; k++) {
		for (j = 0; j <= 29; j++) {
			str1 = "layer" + k + "-" + j + "-s";
			this.params[str1] = str3;
		}
	}
	for (k = 0; k <= 2; k++) {
		for (j = 0; j <= 29; j++) {
			str1 = "layer" + k + "-" + j + "-t";
			this.params[str1] = str3;
		}
	}
	for (k = 0; k <= 2; k++) {
		for (j = 0; j <= 29; j++) {
			str1 = "layer" + k + "-" + j + "-f";
			this.params[str1] = str3;
		}
	}

	this.tag_kazu = this.params.length;
};

TagDataBase.prototype.getValue = function(paramString) {
	var s = this.params[paramString];
	if ("undefined" !== typeof s) {
		return s;
	}
	console.warn("Error : No param " + paramString);
	return null;
};

TagDataBase.prototype.getValueInt = function(paramString) {
	var s = this.params[paramString];
	if ("undefined" !== typeof s) {
		var j;
		j = parseInt(s);
		if (isNaN(j)) j = -1;
		return j;
	}
	console.warn("Error : No param " + paramString);
	return -1;
};

TagDataBase.prototype.setValue = function(paramString1, paramString2) {
	this.params[paramString1] = paramString2;
	return true;
};

TagDataBase.prototype.setValueFromHTML = function(paramApplet) {
	for (var name in this.params) {
		var str = paramApplet.getParameter(name);
		if (str != null) {
			this.params[name] = str;
		}
	}
	return true;
};

TagDataBase.prototype.setValueStage1 = function() {
	this.params["map0-0"] = "............................................................";
	this.params["map0-1"] = "............................................................";
	this.params["map0-2"] = "............................................................";
	this.params["map0-3"] = "............................................................";
	this.params["map0-4"] = "............................................................";
	this.params["map0-5"] = "............................................................";
	this.params["map0-6"] = "............................................................";
	this.params["map0-7"] = "............................................................";
	this.params["map0-8"] = "............................................................";
	this.params["map0-9"] = "............................................................";
	this.params["map0-10"] = "............................................................";
	this.params["map0-11"] = "............................................................";
	this.params["map0-12"] = "............................................999.............";
	this.params["map0-13"] = "............................................999.............";
	this.params["map0-14"] = "............................................................";
	this.params["map0-15"] = "............................................aaa.............";
	this.params["map0-16"] = "............................................................";
	this.params["map0-17"] = "............................................................";
	this.params["map0-18"] = "...............................99...........................";
	this.params["map0-19"] = "............................................................";
	this.params["map0-20"] = "............................................................";
	this.params["map0-21"] = "............................................................";
	this.params["map0-22"] = "...12...............12.....9.9...aaa.....aa.aaaaaaaa...12...";
	this.params["map0-23"] = ".............B............aaaaa..............9.aaaaa........";
	this.params["map0-24"] = ".........aaaaa..........................B...aaaaaaaa........";
	this.params["map0-25"] = "....9.9.............................aaaaa...9.9aa999........";
	this.params["map0-26"] = "....aaa...............B.............9.9.9...aaaaaaaa........";
	this.params["map0-27"] = "...........aaaaaa..aaaaaa....................9.aaaaa........";
	this.params["map0-28"] = ".A........aaaaaaa..aaaaaa............D......aaaaaaaa........";
	this.params["map0-29"] = "bbbbbbbbbbbbbbbbb..bbbbbb.bbbbbbbbbbbbbbbbbbbbbbbbbb5bbbbbb.";

	this.params["map1-0"] = "............................................................";
	this.params["map1-1"] = "............................................................";
	this.params["map1-2"] = "............................................................";
	this.params["map1-3"] = "............................................................";
	this.params["map1-4"] = "............................................................";
	this.params["map1-5"] = "............................................................";
	this.params["map1-6"] = "............................................................";
	this.params["map1-7"] = "............................................................";
	this.params["map1-8"] = "............................................................";
	this.params["map1-9"] = "............................................................";
	this.params["map1-10"] = "............................................................";
	this.params["map1-11"] = "............................................................";
	this.params["map1-12"] = "............................................................";
	this.params["map1-13"] = "............................................................";
	this.params["map1-14"] = "............................................................";
	this.params["map1-15"] = "............................................................";
	this.params["map1-16"] = "............................................................";
	this.params["map1-17"] = "............................................................";
	this.params["map1-18"] = "............................................................";
	this.params["map1-19"] = "............................................................";
	this.params["map1-20"] = "............................................................";
	this.params["map1-21"] = "............................................................";
	this.params["map1-22"] = "...12....12.....12.....12....12....12.......................";
	this.params["map1-23"] = "............................................................";
	this.params["map1-24"] = "............................................................";
	this.params["map1-25"] = "...................O........................................";
	this.params["map1-26"] = ".................aaaa...................feef................";
	this.params["map1-27"] = ".............aaaaaaaaaaa................e..e..............E.";
	this.params["map1-28"] = "..........O..aaaaaaaaaaa.O.....O........feefeef..feeeefeeeef";
	this.params["map1-29"] = "..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.......e..e..e..e....e....e";

	this.params["map2-0"] = "............................................................";
	this.params["map2-1"] = "............................................................";
	this.params["map2-2"] = "............................................................";
	this.params["map2-3"] = "............................................................";
	this.params["map2-4"] = "............................................................";
	this.params["map2-5"] = "............................................................";
	this.params["map2-6"] = "............................................................";
	this.params["map2-7"] = "............................................................";
	this.params["map2-8"] = "............................................................";
	this.params["map2-9"] = "............................................................";
	this.params["map2-10"] = "............................................................";
	this.params["map2-11"] = "............................................................";
	this.params["map2-12"] = "............................................................";
	this.params["map2-13"] = "............................................................";
	this.params["map2-14"] = "............................................................";
	this.params["map2-15"] = "............................................................";
	this.params["map2-16"] = "............................................................";
	this.params["map2-17"] = "............................................................";
	this.params["map2-18"] = "............................................................";
	this.params["map2-19"] = "............................................................";
	this.params["map2-20"] = "............................................................";
	this.params["map2-21"] = "........................................................8...";
	this.params["map2-22"] = "..................99........12.....12....12....12.......a...";
	this.params["map2-23"] = "..................dd...................................aaa..";
	this.params["map2-24"] = "..e.ef...................9.9.9.9......................aaaaa.";
	this.params["map2-25"] = "..e..e.............................................F.aaaaaaa";
	this.params["map2-26"] = "..e..e.......E..............................aaaaaaaaaaaaaaaa";
	this.params["map2-27"] = "..e..e.feeefeeef..99...................F....aaaaaaaaaaaaaaaa";
	this.params["map2-28"] = "..feef.e...e...e..dd...aaaaaaaaaaaaaaaaaaa..aaaaaaaaaaaaaaaa";
	this.params["map2-29"] = "..e..e.e...e...e.......aaaaaaaaaaaaaaaaaaa..aaaaaaaaaaaaaaaa";
};

TagDataBase.prototype.setValueFromHTMLText = function(paramString) {
	var str1 = "";
	var arrayOfString1 = new Array(1000);
	var arrayOfString2 = new Array(1000);
	var i = 0;
	for (var m = 0; m <= 999; m++) {
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
	for (;;) {
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
	if (flag301) str1 = String(str1.substring(0, j + 1));
	var n = 0;
	i = 0;
	for (;;) {
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

		j = str1.indexOf('"');
		if (j >= 0 && j <= 7) {
			str1 = String(str1.substring(j + 1, str1.length));

			j = str1.indexOf('"');
			if (j < 0) {
				break;
			}
			arrayOfString1[n] = String(str1.substring(0, j));
		} else {
			j = str1.indexOf(" ");
			if (j < 0) {
				break;
			}
			if (j == 0) {
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

		j = str1.indexOf('"');
		if (j >= 0 && j <= 7) {
			str1 = String(str1.substring(j + 1, str1.length));

			j = str1.indexOf('"');
			if (j < 0) {
				break;
			}
			arrayOfString2[n] = String(str1.substring(0, j));
		} else {
			j = str1.indexOf(" ");
			if (j < 0) {
				break;
			}
			if (j == 0) {
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
};

export { TagDataBase };
