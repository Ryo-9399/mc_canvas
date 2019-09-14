function GameSoundForApplet(paramTagDataBase, paramApplet) {
	this.ap = paramApplet;
	this.tdb = paramTagDataBase;
	this.s_data = new Array(32);
	this.use_f = true;
	this.mute_f = false;
	this.rs_b = -1;
	this.bgm_switch = false;
	this.bgm_loop = false;
	this.bgm = new Array(20);
	this.bgm_filename = new Array(20);
	this.bgm_genzai = -1;

	for (var j = 0; j < this.s_data.length; j++) {
		this.s_data[j] = null;
	}
	if (parseInt(this.tdb.getValue("se_switch")) === 2) {
		this.use_f = false;
	}
	if (parseInt(this.tdb.getValue("fx_bgm_switch")) === 1) {
		this.bgm_switch = true;
	} else {
		this.bgm_switch = false;
	}
	if (parseInt(this.tdb.getValue("fx_bgm_loop")) === 1) {
		this.bgm_loop = true;
	} else {
		this.bgm_loop = false;
	}
	this.bgm_genzai = -1;

	this._init();
	this._load();
}

/**
 * _loadに必要なものをinitする
 * @protected
 */
GameSoundForApplet.prototype._init = function() {};

/**
 * se_filename フラグに応じてファイル名の配列を返す
 * @protected
 * @returns {string[]}
 */
GameSoundForApplet.prototype._getSEFilenames = function() {
	var tdb = this.tdb;
	var se_filename = parseInt(tdb.getValue("se_filename"));
	var k;
	if (se_filename === 1) {
		return [
			"item.au",
			"gameover.au",
			"clear.au",
			"jump.au",
			"sjump.au",
			"kiki.au",
			"coin.au",
			"get.au",
			"fumu.au",
			"tobasu.au",
			"mgan.au",
			"happa.au",
			"dosun.au",
			"item.au",
			"mgan.au",
			"happa.au",
			"bakuhatu.au",
			"mgan.au",
			"happa.au",
			"shot.au",
			"mizu.au",
			"get.au",
			"shot.au",
			"shot.au",
			"dosun.au",
			"get.au",
			"mgan.au"
		];
	} else {
		return [
			tdb.getValue("filename_se_start"),
			tdb.getValue("filename_se_gameover"),
			tdb.getValue("filename_se_clear"),
			tdb.getValue("filename_se_jump"),
			tdb.getValue("filename_se_sjump"),
			tdb.getValue("filename_se_kiki"),
			tdb.getValue("filename_se_coin"),
			tdb.getValue("filename_se_get"),
			tdb.getValue("filename_se_fumu"),
			tdb.getValue("filename_se_tobasu"),
			tdb.getValue("filename_se_dengeki"),
			tdb.getValue("filename_se_happa"),
			tdb.getValue("filename_se_dosun"),
			tdb.getValue("filename_se_item"),
			tdb.getValue("filename_se_hinoko"),
			tdb.getValue("filename_se_mizudeppo"),
			tdb.getValue("filename_se_block"),
			tdb.getValue("filename_se_grounder"),
			tdb.getValue("filename_se_kaiole"),
			tdb.getValue("filename_se_bomb"),
			tdb.getValue("filename_se_mizu"),
			tdb.getValue("filename_se_dokan"),
			tdb.getValue("filename_se_senkuuza"),
			tdb.getValue("filename_se_fireball"),
			tdb.getValue("filename_se_miss"),
			tdb.getValue("filename_se_chizugamen"),
			tdb.getValue("filename_se_jet")
		];
	}
};

/**
 * BGMのファイル名の配列を返す
 * @protected
 * @returns {string[]}
 */
GameSoundForApplet.prototype._getBGMFilenames = function() {
	var tdb = this.tdb;
	return [
		tdb.getValue("filename_fx_bgm_stage1"),
		tdb.getValue("filename_fx_bgm_stage2"),
		tdb.getValue("filename_fx_bgm_stage3"),
		tdb.getValue("filename_fx_bgm_stage4"),
		tdb.getValue("filename_fx_bgm_boss"),
		tdb.getValue("filename_fx_bgm_title"),
		tdb.getValue("filename_fx_bgm_ending"),
		tdb.getValue("filename_fx_bgm_chizu")
	];
};

/**
 * 音声ファイルを読み込み
 * @protected
 */
GameSoundForApplet.prototype._load = function() {
	var i;
	if (this.use_f) {
		var se_filenames = this._getSEFilenames();
		for (i = 0; i < se_filenames.length; i++) {
			this.s_data[i] = this.ap.getAudioClip(se_filenames[i]);
		}
	}
	if (this.bgm_switch) {
		var bgm_filenames = this._getBGMFilenames();
		for (i = 0; i < bgm_filenames.length; i++) {
			this.bgm[i] = this.ap.getAudioClip(bgm_filenames[i], true);
			this.bgm_filename[i] = bgm_filenames[i];
		}
	}
};

GameSoundForApplet.prototype.setSound = function(paramInt, paramString) {
	if (paramInt < 0 || paramInt >= this.s_data.length) {
		return;
	}
	this.s_data[paramInt] = this.ap.getAudioClip(paramString);
};

GameSoundForApplet.prototype.resetSound = function() {};

GameSoundForApplet.prototype.play = function(paramInt) {
	if (!this.use_f || this.mute_f || this.s_data[paramInt] == null) {
		return;
	}
	this.s_data[paramInt].play();
};

GameSoundForApplet.prototype.stop = function(paramInt) {
	if (!this.use_f || this.s_data[paramInt] == null) {
		return;
	}
	this.s_data[paramInt].stop();
};

GameSoundForApplet.prototype.stopAll = function() {
	if (!this.use_f) {
		return;
	}
	for (var i = 0; i < this.s_data.length; i++) {
		if (this.s_data[i] != null) {
			this.s_data[i].stop();
		}
	}
};

GameSoundForApplet.prototype.soundOff = function() {
	this.mute_f = true;

	this.stopBGM();
};

GameSoundForApplet.prototype.soundOn = function() {
	this.mute_f = false;
	this.rs_b = -1;
};

GameSoundForApplet.prototype.rsInit = function() {
	this.rs_b = -1;
};

GameSoundForApplet.prototype.rsAddSound = function(paramInt) {
	this.rs_b = paramInt;
};

GameSoundForApplet.prototype.rsPlay = function() {
	if (!this.use_f || this.mute_f || this.rs_b == -1 || this.s_data[this.rs_b] == null) {
		return;
	}
	this.s_data[this.rs_b].stop();

	this.s_data[this.rs_b].play();

	this.rs_b = -1;
};

GameSoundForApplet.prototype.playBGM = function(paramInt) {
	if (this.mute_f) {
		return;
	}
	if (this.bgm_genzai == paramInt) {
		return;
	}
	if (this.bgm_genzai >= 0 && paramInt >= 0) {
		if (this.bgm_filename[this.bgm_genzai] != null && this.bgm_filename[paramInt] != null) {
			if (this.bgm_filename[this.bgm_genzai] == this.bgm_filename[paramInt]) {
				return;
			}
		}
	}
	if (this.bgm_genzai >= 0) {
		if (this.bgm[this.bgm_genzai] != null) {
			this.bgm[this.bgm_genzai].stop();
		}
	}
	if (this.bgm[paramInt] != null) {
		if (!this.bgm_loop) {
			this.bgm[paramInt].play();
		} else {
			this.bgm[paramInt].loop();
		}
		this.bgm_genzai = paramInt;
	}
};

GameSoundForApplet.prototype.stopBGM = function() {
	if (this.bgm_genzai >= 0) {
		if (this.bgm[this.bgm_genzai] != null) {
			this.bgm[this.bgm_genzai].stop();
		}
	}
	this.bgm_genzai = -1;
};

GameSoundForApplet.prototype.playUserBGMFile = function(paramString) {
	this.stopBGM();

	this.bgm[19] = this.ap.getAudioClip(paramString, true);
	if (this.bgm[19] != null) {
		this.bgm[19].play();

		this.bgm_genzai = 19;

		this.bgm_filename[19] = paramString;

		return true;
	}
	return false;
};

GameSoundForApplet.prototype.playUserBGMFileLoop = function(paramString) {
	this.stopBGM();

	this.bgm[19] = this.ap.getAudioClip(paramString, true);
	if (this.bgm[19] != null) {
		this.bgm[19].loop();

		this.bgm_genzai = 19;

		this.bgm_filename[19] = paramString;

		return true;
	}
	return false;
};

/**
 * ユーザーからのインタラクションがあったことを伝える
 */
GameSoundForApplet.prototype.userInteract = function() {};

/**
 * リソースを開放
 */
GameSoundForApplet.prototype.kill = function() {};

/**
 * WebAudioを用いたゲーム音声
 */
function GameSoundWebAudio(paramTagDataBase, paramApplet) {
	GameSoundForApplet.call(this, paramTagDataBase, paramApplet);

	this.noOverlapFlag = paramTagDataBase.options["bc-no-overlap-sound"];
}
// 継承
GameSoundWebAudio.prototype = Object.create(GameSoundForApplet.prototype, {
	constructor: {
		configurable: true,
		value: GameSoundWebAudio
	}
});

GameSoundWebAudio.prototype._init = function() {
	var ac = "undefined" !== typeof AudioContext ? AudioContext : webkitAudioContext;
	this.context = new ac();
	// DynamicComporessorをかませる
	this.dest = this.context.createDynamicsCompressor();
	this.dest.connect(this.context.destination);

	// sourceとなるAudioNodeを格納（止めるため）
	this.sourceNodes = {};
	this.bgmSourceNodes = {};

	// オーディオデータのキャッシュ
	this.audioCache = {};
};
GameSoundWebAudio.prototype._load = function() {
	var ap = this.ap;
	var i;
	if (this.use_f) {
		var se_filenames = this._getSEFilenames();
		for (i = 0; i < se_filenames.length; i++) {
			this._loadAudioBufferInto(ap.getAudioURL(se_filenames[i], false), this.s_data, i);
		}
	}
	if (this.bgm_switch) {
		var bgm_filenames = this._getBGMFilenames();
		for (i = 0; i < bgm_filenames.length; i++) {
			var url = ap.getAudioURL(bgm_filenames[i], true);
			this.bgm_filename[i] = url;
			this._loadAudioBufferInto(url, this.bgm, i);
		}
	}
};
/**
 * 音声ファイルをXHRで読み込みcontextAudioClipに変換
 * @protected
 */
GameSoundWebAudio.prototype._loadAudioBufferInto = function(url, target, index, callback) {
	const { audioCache, context } = this;
	// まずcacheをまさぐる
	if (audioCache[url] != null) {
		if (audioCache[url] instanceof Array) {
			// 現在読み込み中なのでコールバック一覧に追加
			audioCache[url].push(function(result) {
				target[index] = result;
				if ("function" === typeof callback) {
					callback(result);
				}
			});
		} else {
			// 読み込み終わっているのでコールバックをすぐに呼ぶ
			setTimeout(function() {
				target[index] = audioCache[url];
				if ("function" === typeof callback) {
					callback(audioCache[url]);
				}
			}, 0);
		}
		return;
	}
	// まだ読み込みが開始されていない
	audioCache[url] = [];

	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);

	xhr.responseType = "arraybuffer";
	xhr.onload = () => {
		var buf = xhr.response;
		if (buf == null || xhr.status === 0 || xhr.status >= 400) {
			return;
		}
		decodeAudioData(context, buf).then(
			function(result) {
				target[index] = result;
				if ("function" === typeof callback) {
					callback(result);
				}
				// cache
				audioCache[url].forEach(function(func) {
					func(result);
				});
				audioCache[url] = result;
			},
			function(err) {
				console.error(err);
				if ("function" === typeof callback) {
					callback(null);
				}
			}
		);
	};
	xhr.onerror = function(err) {
		console.error(err);
		if ("function" === typeof callback) {
			callback(null);
		}
	};

	xhr.send();

	/**
	 * Call AudioContext#decodeAudioData and returns Promise.
	 * iOS Safari does not support the new Promise-based API,
	 * so it uses callback-based API.
	 */
	function decodeAudioData(context, buf) {
		return new Promise((resolve, reject) => {
			context.decodeAudioData(buf, resolve, reject);
		});
	}
};

GameSoundWebAudio.prototype.setSound = function(paramInt, paramString) {
	if (paramInt < 0 || paramInt >= this.s_data.length) {
		return;
	}
	this._loadAudioBufferInto(paramString, this.s_data, paramInt);
};

GameSoundWebAudio.prototype.play = function(paramInt) {
	if (!this.use_f || this.mute_f || this.s_data[paramInt] == null || this.context.state !== "running") {
		return;
	}
	if (this.noOverlapFlag === true) {
		var currentSource = this.sourceNodes[paramInt];
		if (currentSource != null) {
			var gain = this.context.createGain();
			gain.connect(this.dest);
			gain.gain.value = 1;
			gain.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.1);
			currentSource.disconnect();
			currentSource.connect(gain);
		}
	}
	var source = this.context.createBufferSource();
	source.buffer = this.s_data[paramInt];
	source.connect(this.dest);
	this.sourceNodes[paramInt] = source;
	source.start(0);
};
GameSoundWebAudio.prototype.stop = function(paramInt) {
	if (!this.use_f) {
		return;
	}
	var source = this.sourceNodes[paramInt];
	if (source == null) {
		return;
	}
	source.disconnect();
	this.sourceNodes[paramInt] = void 0;
};
GameSoundWebAudio.prototype.stopAll = function(paramInt) {
	if (!this.use_f) {
		return;
	}
	for (var i = 0; i < this.s_data.length; i++) {
		this.stop(i);
	}
};
GameSoundWebAudio.prototype.rsAddSound = function(paramInt) {
	this.play(paramInt);
};
GameSoundWebAudio.prototype.playBGM = function(paramInt, loopflg) {
	if (this.mute_f || this.context.state !== "running") {
		return;
	}
	if (this.bgm_genzai === paramInt) {
		return;
	}
	if (this.bgm_genzai >= 0 && paramInt >= 0) {
		if (this.bgm_filename[this.bgm_genzai] != null && this.bgm_filename[paramInt] != null) {
			if (this.bgm_filename[this.bgm_genzai] == this.bgm_filename[paramInt]) {
				return;
			}
		}
	}
	if (this.bgm_genzai >= 0) {
		if (this.bgmSourceNodes[this.bgm_genzai] != null) {
			this.bgmSourceNodes[this.bgm_genzai].disconnect();
		}
	}
	if (this.bgm[paramInt] == null) {
		return;
	}
	var source = this.context.createBufferSource();
	source.buffer = this.bgm[paramInt];
	source.connect(this.dest);
	if (loopflg || this.bgm_loop) {
		source.loop = true;
		source.loopStart = 0;
		source.loopEnd = source.buffer.duration;
	}
	source.start(0);

	this.bgmSourceNodes[paramInt] = source;
	this.bgm_genzai = paramInt;
};
GameSoundWebAudio.prototype.stopBGM = function() {
	var source = this.bgmSourceNodes[this.bgm_genzai];
	if (source != null) {
		source.disconnect();
	}
	this.bgmSourceNodes[this.bgm_genzai] = void 0;
	this.bgm_genzai = -1;
};
GameSoundWebAudio.prototype.playUserBGMFile = function(paramString, loopflg) {
	var url = this.ap.getAudioURL(paramString, true);
	this._loadAudioBufferInto(url, this.bgm, 19, function(buf) {
		this.stopBGM();
		if (buf != null) {
			this.bgm_filename[19] = url;

			this.playBGM(19, loopflg);
		}
	});

	return false;
};
GameSoundWebAudio.prototype.playUserBGMFileLoop = function(paramString) {
	this.playUserBGMFile(paramString, true);
};
GameSoundWebAudio.prototype.userInteract = function() {
	const { context } = this;
	// ユーザーの入力に反応してWebAudioを有効化
	if (context.state === "suspended") {
		// Chrome v70以降/iOS： ユーザー入力に反応してresumeすれば再生可
		context.resume().catch(function(err) {
			console.error(err);
		});
	}
};
GameSoundWebAudio.prototype.kill = function() {
	// AudioContextを開放
	this.context.close().catch(function(err) {
		console.error(err);
	});
};

/**
 * Web Audio APIを使えるかどうか判定
 *
 * @static
 */
GameSoundForApplet.factory = function(tdb) {
	if (
		("undefined" !== typeof AudioContext || "undefined" !== typeof webkitAudioContext) &&
		/^https?:$/i.test(location.protocol) &&
		!tdb.options["bc-no-webaudio"]
	) {
		return GameSoundWebAudio;
	} else {
		return GameSoundForApplet;
	}
};

export { GameSoundForApplet, GameSoundWebAudio };
