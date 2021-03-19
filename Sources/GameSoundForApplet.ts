import { MasaoConstruction } from "./MasaoConstruction";
import { TagDataBase } from "./TagDataBase";
import { AudioClip } from "./GlobalFunctions";

declare const webkitAudioContext: typeof AudioContext;

abstract class GameSoundBase<SoundInstance> {
	ap: MasaoConstruction;
	tdb: TagDataBase;
	s_data: (SoundInstance | null)[];
	use_f: boolean;
	mute_f: boolean;
	rs_b: number;
	bgm_switch: boolean;
	bgm_loop: boolean;
	bgm: SoundInstance[];
	bgm_filename: (string | null)[];
	bgm_genzai: number;

	constructor(paramTagDataBase: TagDataBase, paramApplet: MasaoConstruction) {
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
	 * se_filename フラグに応じてファイル名の配列を返す
	 * @protected
	 * @returns {string[]}
	 */
	_getSEFilenames() {
		var tdb = this.tdb;
		var se_filename = parseInt(tdb.getValue("se_filename"));
		var k;
		if (se_filename === 2) {
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
				"mgan.au",
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
				tdb.getValue("filename_se_jet"),
			];
		}
	}

	/**
	 * BGMのファイル名の配列を返す
	 * @protected
	 * @returns {string[]}
	 */
	_getBGMFilenames() {
		var tdb = this.tdb;
		return [
			tdb.getValue("filename_fx_bgm_stage1"),
			tdb.getValue("filename_fx_bgm_stage2"),
			tdb.getValue("filename_fx_bgm_stage3"),
			tdb.getValue("filename_fx_bgm_stage4"),
			tdb.getValue("filename_fx_bgm_boss"),
			tdb.getValue("filename_fx_bgm_title"),
			tdb.getValue("filename_fx_bgm_ending"),
			tdb.getValue("filename_fx_bgm_chizu"),
		];
	}

	resetSound() {}

	soundOff() {
		this.mute_f = true;

		this.stopBGM();
	}

	soundOn() {
		this.mute_f = false;
		this.rs_b = -1;
	}

	rsInit() {
		this.rs_b = -1;
	}

	protected abstract _init(): void;
	protected abstract _load(): void;

	abstract setSound(paramInt: number, paramString: string): void;
	abstract play(paramInt: number): void;
	abstract stop(paramInt: number): void;
	abstract stopAll(paramInt: number): void;
	abstract rsAddSound(paramInt: number): void;
	abstract rsPlay(): void;
	abstract playBGM(paramInt: number, loopflg?: boolean): void;
	abstract stopBGM(): void;
	abstract playUserBGMFile(paramString: string, loopflg?: boolean): boolean;
	abstract playUserBGMFileLoop(paramString: string): boolean;
	abstract userInteract(): void;
	abstract kill(): void;
}

class GameSoundForApplet extends GameSoundBase<AudioClip> {
	constructor(paramTagDataBase: TagDataBase, paramApplet: MasaoConstruction) {
		super(paramTagDataBase, paramApplet);
	}

	/**
	 * _loadに必要なものをinitする
	 * @protected
	 */
	protected _init() {}

	/**
	 * 音声ファイルを読み込み
	 * @protected
	 */
	_load() {
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
	}

	setSound(paramInt: number, paramString: string) {
		if (paramInt < 0 || paramInt >= this.s_data.length) {
			return;
		}
		this.s_data[paramInt] = this.ap.getAudioClip(paramString);
	}

	play(paramInt: number) {
		if (!this.use_f || this.mute_f || this.s_data[paramInt] == null) {
			return;
		}
		const s = this.s_data[paramInt];
		if (s) s.play();
	}

	stop(paramInt: number) {
		if (!this.use_f || this.s_data[paramInt] == null) {
			return;
		}
		const s = this.s_data[paramInt];
		if (s) s.stop();
	}

	stopAll(paramInt: number) {
		if (!this.use_f) {
			return;
		}
		for (var i = 0; i < this.s_data.length; i++) {
			const s = this.s_data[i];
			if (s != null) {
				s.stop();
			}
		}
	}

	rsAddSound(paramInt: number) {
		this.rs_b = paramInt;
	}

	rsPlay() {
		if (!this.use_f || this.mute_f || this.rs_b == -1 || this.s_data[this.rs_b] == null) {
			return;
		}
		const s = this.s_data[this.rs_b];
		if (s) {
			s.stop();
			s.play();
		}

		this.rs_b = -1;
	}

	playBGM(paramInt: number, loopflg?: boolean) {
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
	}

	stopBGM() {
		if (this.bgm_genzai >= 0) {
			if (this.bgm[this.bgm_genzai] != null) {
				this.bgm[this.bgm_genzai].stop();
			}
		}
		this.bgm_genzai = -1;
	}

	playUserBGMFile(paramString: string, loopflg?: boolean) {
		this.stopBGM();

		this.bgm[19] = this.ap.getAudioClip(paramString, true);
		if (this.bgm[19] != null) {
			this.bgm[19].play();

			this.bgm_genzai = 19;

			this.bgm_filename[19] = paramString;

			return true;
		}
		return false;
	}

	playUserBGMFileLoop(paramString: string) {
		this.stopBGM();

		this.bgm[19] = this.ap.getAudioClip(paramString, true);
		if (this.bgm[19] != null) {
			this.bgm[19].loop();

			this.bgm_genzai = 19;

			this.bgm_filename[19] = paramString;

			return true;
		}
		return false;
	}

	/**
	 * ユーザーからのインタラクションがあったことを伝える
	 */
	userInteract() {}

	/**
	 * リソースを開放
	 */
	kill() {}

	/**
	 * Web Audio APIを使えるかどうか判定
	 *
	 * @static
	 */
	static factory(tdb: TagDataBase) {
		if (
			("undefined" !== typeof AudioContext || "undefined" !== typeof webkitAudioContext) &&
			/^https?:$/i.test(location.protocol) &&
			!tdb.options["bc-no-webaudio"]
		) {
			return GameSoundWebAudio;
		} else {
			return GameSoundForApplet;
		}
	}
}

/**
 * WebAudioを用いたゲーム音声
 */
class GameSoundWebAudio extends GameSoundBase<AudioBuffer> {
	noOverlapFlag: boolean | undefined;
	context!: AudioContext;
	dest!: AudioNode;
	sourceNodes!: { [key: number]: AudioNode | undefined };
	bgmSourceNodes!: { [key: number]: AudioNode | undefined };
	audioCache!: { [key: string]: ((result: AudioBuffer) => void)[] | AudioBuffer | undefined };

	constructor(paramTagDataBase: TagDataBase, paramApplet: MasaoConstruction) {
		super(paramTagDataBase, paramApplet);

		this.noOverlapFlag = paramTagDataBase.options["bc-no-overlap-sound"];
	}

	_init() {
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
	}
	_load() {
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
	}
	/**
	 * 音声ファイルをXHRで読み込みcontextAudioClipに変換
	 * @protected
	 */
	_loadAudioBufferInto(
		url: string,
		target: (AudioBuffer | AudioClip | null)[],
		index: number,
		callback?: (result: AudioBuffer | null) => void
	) {
		const { audioCache, context } = this;
		// まずcacheをまさぐる
		const cache = audioCache[url];
		if (cache != null) {
			if (cache instanceof Array) {
				// 現在読み込み中なのでコールバック一覧に追加
				cache.push(function (result) {
					target[index] = result;
					if ("function" === typeof callback) {
						callback(result);
					}
				});
			} else {
				// 読み込み終わっているのでコールバックをすぐに呼ぶ
				setTimeout(function () {
					target[index] = cache;
					if ("function" === typeof callback) {
						callback(cache);
					}
				}, 0);
			}
			return;
		}
		// まだ読み込みが開始されていない
		const newCache: ((result: AudioBuffer) => void)[] = (audioCache[url] = []);

		var xhr = new XMLHttpRequest();
		xhr.open("GET", url);

		xhr.responseType = "arraybuffer";
		xhr.onload = () => {
			var buf = xhr.response as ArrayBuffer | null;
			if (buf == null || xhr.status === 0 || xhr.status >= 400) {
				return;
			}
			decodeAudioData(context, buf).then(
				function (result) {
					target[index] = result;
					if ("function" === typeof callback) {
						callback(result);
					}
					// cache
					newCache.forEach(function (func) {
						func(result);
					});
					audioCache[url] = result;
				},
				function (err) {
					console.error(err);
					if ("function" === typeof callback) {
						callback(null);
					}
				}
			);
		};
		xhr.onerror = function (err) {
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
		function decodeAudioData(context: AudioContext, buf: ArrayBuffer) {
			return new Promise<AudioBuffer>((resolve, reject) => {
				context.decodeAudioData(buf, resolve, reject);
			});
		}
	}

	setSound(paramInt: number, paramString: string) {
		if (paramInt < 0 || paramInt >= this.s_data.length) {
			return;
		}
		this._loadAudioBufferInto(paramString, this.s_data, paramInt);
	}

	play(paramInt: number) {
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
	}
	stop(paramInt: number) {
		if (!this.use_f) {
			return;
		}
		var source = this.sourceNodes[paramInt];
		if (source == null) {
			return;
		}
		source.disconnect();
		this.sourceNodes[paramInt] = void 0;
	}
	stopAll(paramInt: number) {
		if (!this.use_f) {
			return;
		}
		for (var i = 0; i < this.s_data.length; i++) {
			this.stop(i);
		}
	}
	rsAddSound(paramInt: number) {
		this.play(paramInt);
	}
	rsPlay() {}
	playBGM(paramInt: number, loopflg: boolean) {
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
			const bgmSourceNode = this.bgmSourceNodes[this.bgm_genzai];
			if (bgmSourceNode != null) {
				bgmSourceNode.disconnect();
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
			source.loopEnd = source.buffer!.duration;
		}
		source.start(0);

		this.bgmSourceNodes[paramInt] = source;
		this.bgm_genzai = paramInt;
	}
	stopBGM() {
		var source = this.bgmSourceNodes[this.bgm_genzai];
		if (source != null) {
			source.disconnect();
		}
		this.bgmSourceNodes[this.bgm_genzai] = void 0;
		this.bgm_genzai = -1;
	}
	playUserBGMFile(paramString: string, loopflg: boolean) {
		var url = this.ap.getAudioURL(paramString, true);
		this._loadAudioBufferInto(url, this.bgm, 19, (buf) => {
			this.stopBGM();
			if (buf != null) {
				this.bgm_filename[19] = url;

				this.playBGM(19, loopflg);
			}
		});

		return false;
	}
	playUserBGMFileLoop(paramString: string) {
		return this.playUserBGMFile(paramString, true);
	}
	userInteract() {
		const { context } = this;
		// ユーザーの入力に反応してWebAudioを有効化
		if (context.state === "suspended") {
			// Chrome v70以降/iOS： ユーザー入力に反応してresumeすれば再生可
			context.resume().catch(function (err) {
				console.error(err);
			});
		}
	}
	kill() {
		// AudioContextを開放
		this.context.close().catch(function (err) {
			console.error(err);
		});
	}
}

export { GameSoundBase, GameSoundForApplet, GameSoundWebAudio };
