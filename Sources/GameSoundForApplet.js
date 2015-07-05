
function GameSoundForApplet(paramTagDataBase, paramApplet)
{
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

	var k = 1;

	for (var j = 0; j < this.s_data.length; j++) {
		this.s_data[j] = null;
	}
	var str = this.tdb.getValue("se_switch");
	var i;
	i = parseInt(str);
	if(isNaN(i))
		i = -1;
	if (i == 2) {
		this.use_f = false;
	}
	str = this.tdb.getValue("se_filename");
	i = parseInt(str);
	if(isNaN(i))
		i = -1;
	if (i == 1) {
		k = 0;
	} else {
		k = 1;
	}
	if (this.use_f) {
		if (k == 0)
		{
			str = this.tdb.getValue("filename_se_start");
			this.s_data[0] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_gameover");
			this.s_data[1] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_clear");
			this.s_data[2] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_jump");
			this.s_data[3] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_sjump");
			this.s_data[4] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_kiki");
			this.s_data[5] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_coin");
			this.s_data[6] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_get");
			this.s_data[7] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_fumu");
			this.s_data[8] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_tobasu");
			this.s_data[9] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_dengeki");
			this.s_data[10] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_happa");
			this.s_data[11] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_dosun");
			this.s_data[12] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_item");
			this.s_data[13] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_hinoko");
			this.s_data[14] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_mizudeppo");
			this.s_data[15] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_block");
			this.s_data[16] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_grounder");
			this.s_data[17] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_kaiole");
			this.s_data[18] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_bomb");
			this.s_data[19] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_mizu");
			this.s_data[20] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_dokan");
			this.s_data[21] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_senkuuza");
			this.s_data[22] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_fireball");
			this.s_data[23] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_miss");
			this.s_data[24] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_chizugamen");
			this.s_data[25] = this.ap.getAudioClip(str);

			str = this.tdb.getValue("filename_se_jet");
			this.s_data[26] = this.ap.getAudioClip(str);
		}
		else
		{
			this.s_data[0] = this.ap.getAudioClip("item.au");
			this.s_data[1] = this.ap.getAudioClip("gameover.au");
			this.s_data[2] = this.ap.getAudioClip("clear.au");
			this.s_data[3] = this.ap.getAudioClip("jump.au");
			this.s_data[4] = this.ap.getAudioClip("sjump.au");
			this.s_data[5] = this.ap.getAudioClip("kiki.au");
			this.s_data[6] = this.ap.getAudioClip("coin.au");
			this.s_data[7] = this.ap.getAudioClip("get.au");
			this.s_data[8] = this.ap.getAudioClip("fumu.au");
			this.s_data[9] = this.ap.getAudioClip("tobasu.au");
			this.s_data[10] = this.ap.getAudioClip("mgan.au");
			this.s_data[11] = this.ap.getAudioClip("happa.au");
			this.s_data[12] = this.ap.getAudioClip("dosun.au");
			this.s_data[13] = this.ap.getAudioClip("item.au");
			this.s_data[14] = this.ap.getAudioClip("mgan.au");
			this.s_data[15] = this.ap.getAudioClip("happa.au");
			this.s_data[16] = this.ap.getAudioClip("bakuhatu.au");
			this.s_data[17] = this.ap.getAudioClip("mgan.au");
			this.s_data[18] = this.ap.getAudioClip("happa.au");
			this.s_data[19] = this.ap.getAudioClip("shot.au");
			this.s_data[20] = this.ap.getAudioClip("mizu.au");
			this.s_data[21] = this.ap.getAudioClip("get.au");
			this.s_data[22] = this.ap.getAudioClip("shot.au");
			this.s_data[23] = this.ap.getAudioClip("shot.au");
			this.s_data[24] = this.ap.getAudioClip("dosun.au");
			this.s_data[25] = this.ap.getAudioClip("get.au");
			this.s_data[26] = this.ap.getAudioClip("mgan.au");
		}
	}
	str = this.tdb.getValue("fx_bgm_switch");
	i = parseInt(str);
	if(isNaN(i))
		i = -1;
	if (i == 1) {
		this.bgm_switch = true;
	} else {
		this.bgm_switch = false;
	}
	str = this.tdb.getValue("fx_bgm_loop");
	i = parseInt(str);
	if(isNaN(i))
		i = -1;
	if (i == 1) {
		this.bgm_loop = true;
	} else {
		this.bgm_loop = false;
	}
	if (this.bgm_switch)
	{
		str = this.tdb.getValue("filename_fx_bgm_stage1");
		this.bgm[0] = this.ap.getAudioClip(str, true);
		this.bgm_filename[0] = str;

		str = this.tdb.getValue("filename_fx_bgm_stage2");
		this.bgm[1] = this.ap.getAudioClip(str, true);
		this.bgm_filename[1] = str;

		str = this.tdb.getValue("filename_fx_bgm_stage3");
		this.bgm[2] = this.ap.getAudioClip(str, true);
		this.bgm_filename[2] = str;

		str = this.tdb.getValue("filename_fx_bgm_stage4");
		this.bgm[3] = this.ap.getAudioClip(str, true);
		this.bgm_filename[3] = str;

		str = this.tdb.getValue("filename_fx_bgm_boss");
		this.bgm[4] = this.ap.getAudioClip(str, true);
		this.bgm_filename[4] = str;

		str = this.tdb.getValue("filename_fx_bgm_title");
		this.bgm[5] = this.ap.getAudioClip(str, true);
		this.bgm_filename[5] = str;

		str = this.tdb.getValue("filename_fx_bgm_ending");
		this.bgm[6] = this.ap.getAudioClip(str, true);
		this.bgm_filename[6] = str;

		str = this.tdb.getValue("filename_fx_bgm_chizu");
		this.bgm[7] = this.ap.getAudioClip(str, true);
		this.bgm_filename[7] = str;
	}
	this.bgm_genzai = -1;
}

GameSoundForApplet.prototype.setSound = function(paramInt,paramString) {
	if(paramInt < 0 || paramInt >= this.s_data.length){
		return;
	}
	this.s_data[paramInt] = this.ap.getAudioClip(paramString);
}

GameSoundForApplet.prototype.resetSound = function() {}

GameSoundForApplet.prototype.play = function(paramInt)
{
	if ((!this.use_f) || (this.mute_f == true) || (this.s_data[paramInt] == null)) {
		return;
	}
	this.s_data[paramInt].play();
}

GameSoundForApplet.prototype.stop = function(paramInt)
{
	if ((!this.use_f) || (this.s_data[paramInt] == null)) {
		return;
	}
	this.s_data[paramInt].stop();
}

GameSoundForApplet.prototype.stopAll = function()
{
	if (!this.use_f) {
		return;
	}
	for (var i = 0; i < this.s_data.length; i++) {
		if (this.s_data[i] != null) {
			this.s_data[i].stop();
		}
	}
}

GameSoundForApplet.prototype.soundOff = function()
{
	this.mute_f = true;

	this.stopBGM();
}

GameSoundForApplet.prototype.soundOn = function()
{
	this.mute_f = false;
	this.rs_b = -1;
}

GameSoundForApplet.prototype.rsInit = function()
{
	this.rs_b = -1;
}

GameSoundForApplet.prototype.rsAddSound = function(paramInt)
{
	this.rs_b = paramInt;
}

GameSoundForApplet.prototype.rsPlay = function()
{
	if ((!this.use_f) || (this.mute_f == true) || (this.rs_b == -1) || (this.s_data[this.rs_b] == null)) {
		return;
	}
	this.s_data[this.rs_b].stop();


	this.s_data[this.rs_b].play();

	this.rs_b = -1;
}

GameSoundForApplet.prototype.playBGM = function(paramInt)
{
	if (this.mute_f == true) {
		return;
	}
	if (this.bgm_genzai == paramInt) {
		return;
	}
	if ((this.bgm_genzai >= 0) && (paramInt >= 0)) {
		if ((this.bgm_filename[this.bgm_genzai] != null) && (this.bgm_filename[paramInt] != null)) {
			if (this.bgm_filename[this.bgm_genzai] == (this.bgm_filename[paramInt]) == true) {
				return;
			}
		}
	}
	if (this.bgm_genzai >= 0) {
		if (this.bgm[this.bgm_genzai] != null) {
			this.bgm[this.bgm_genzai].stop();
		}
	}
	if (this.bgm[paramInt] != null)
	{
		if (!this.bgm_loop) {
			this.bgm[paramInt].play();
		} else {
			this.bgm[paramInt].loop();
		}
		this.bgm_genzai = paramInt;
	}
}

GameSoundForApplet.prototype.stopBGM = function()
{
	if (this.bgm_genzai >= 0) {
		if (this.bgm[this.bgm_genzai] != null) {
			this.bgm[this.bgm_genzai].stop();
		}
	}
	this.bgm_genzai = -1;
}

GameSoundForApplet.prototype.playUserBGMFile = function(paramString)
{
	this.stopBGM();


	this.bgm[19] = this.ap.getAudioClip(paramString, true);
	if (this.bgm[19] != null)
	{
		this.bgm[19].play();

		this.bgm_genzai = 19;


		this.bgm_filename[19] = paramString;

		return true;
	}
	return false;
}

GameSoundForApplet.prototype.playUserBGMFileLoop = function(paramString)
{
	this.stopBGM();


	this.bgm[19] = this.ap.getAudioClip(paramString, true);
	if (this.bgm[19] != null)
	{
		this.bgm[19].loop();

		this.bgm_genzai = 19;


		this.bgm_filename[19] = paramString;

		return true;
	}
	return false;
}
