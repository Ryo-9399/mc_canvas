
function GameKey()
{
	this.key_code = 0;
	this.up_f = false;
	this.down_f = false;
	this.left_f = false;
	this.right_f = false;
	this.tr1_f = false;
	this.tr2_f = false;
	this.tr3_f = false;
	this.start_f = false;
	this.x_f = false;
	this.z_f = false;
	this.space_f = false;
	this.left_c = 0;
	this.right_c = 0;
	this.up_c = 0;
	this.down_c = 0;
	this.tr1_c = 0;
	this.codekey_f = new Array(256);
	this.left_right_lock = false;
}

GameKey.prototype.init = function()
{
	this.key_code = 0;
	this.up_f = false;
	this.down_f = false;
	this.left_f = false;
	this.right_f = false;
	this.tr1_f = false;
	this.tr2_f = false;
	this.tr3_f = false;
	this.start_f = false;
	this.x_f = false;
	this.z_f = false;
	this.space_f = false;
	this.left_c = 0;
	this.right_c = 0;

	this.up_c = 0;
	this.down_c = 0;
	this.tr1_c = 0;

	this.left_right_lock = false;
	for (var i = 0; i <= 255; i++) {
		this.codekey_f[i] = false;
	}
}

GameKey.prototype.keyPressed = function(paramKeyEvent)
{
	this.key_code = paramKeyEvent.keyCode;
	this.key_char = paramKeyEvent.keyCode;
	if ((this.key_code >= 0) && (this.key_code <= 255)) {
		this.codekey_f[this.key_code] = true;
	}
	switch (this.key_code)
	{
	case 38: 
		paramKeyEvent.preventDefault();
		this.up_f = true;
		break;
	case 40: 
		paramKeyEvent.preventDefault();
		this.down_f = true;

		this.tr2_f = true;

		break;
	case 37: 
		paramKeyEvent.preventDefault();
		if (!this.left_right_lock) {
			this.left_f = true;
		}
		break;
	case 39: 
		paramKeyEvent.preventDefault();
		if (!this.left_right_lock) {
			this.right_f = true;
		}
		break;
	case 104: 
		paramKeyEvent.preventDefault();
		this.up_f = true;
		break;
	case 98: 
		paramKeyEvent.preventDefault();
		this.down_f = true;

		this.tr2_f = true;

		break;
	case 100: 
		paramKeyEvent.preventDefault();
		if (!this.left_right_lock) {
			this.left_f = true;
		}
		break;
	case 102: 
		paramKeyEvent.preventDefault();
		if (!this.left_right_lock) {
			this.right_f = true;
		}
		break;
	case 90: 
		paramKeyEvent.preventDefault();
		this.tr1_f = true;
		this.z_f = true;


		break;
	case 88: 
		paramKeyEvent.preventDefault();
		this.tr2_f = true;
		this.x_f = true;
		break;
	case 67: 
		paramKeyEvent.preventDefault();
		this.tr3_f = true;
		break;
	case 32: 
		paramKeyEvent.preventDefault();
		this.tr1_f = true;
		this.space_f = true;

		this.tr1_c = 0;
		break;
	case 83: 
		paramKeyEvent.preventDefault();
		this.start_f = true;
	}
}

GameKey.prototype.keyReleased = function(paramKeyEvent)
{
	var i = paramKeyEvent.keyCode;
	if ((i >= 0) && (i <= 255)) {
		this.codekey_f[i] = false;
	}
	switch (i)
	{
	case 38: 
		this.up_f = false;
		break;
	case 40: 
		this.down_f = false;

		this.tr2_f = false;

		break;
	case 37: 
		if (!this.left_right_lock)
		{
			this.left_f = false;

			this.left_c = 0;
		}
		break;
	case 39: 
		if (!this.left_right_lock)
		{
			this.right_f = false;

			this.right_c = 0;
		}
		break;
	case 104: 
		this.up_f = false;
		break;
	case 98: 
		this.down_f = false;

		this.tr2_f = false;

		break;
	case 100: 
		if (!this.left_right_lock)
		{
			this.left_f = false;

			this.left_c = 0;
		}
		break;
	case 102: 
		if (!this.left_right_lock)
		{
			this.right_f = false;

			this.right_c = 0;
		}
		break;
	case 90: 
		this.tr1_f = false;
		this.z_f = false;

		this.tr1_c = 0;
		break;
	case 88: 
		this.tr2_f = false;
		this.x_f = false;
		break;
	case 67: 
		this.tr3_f = false;
		break;
	case 32: 
		this.tr1_f = false;
		this.space_f = false;

		this.tr1_c = 0;
		break;
	case 83: 
		this.start_f = false;
	}
}

GameKey.prototype.getKeyCode = function()
{
	return this.key_code;
}

/*GameKey.prototype.getKeyChar = function()
{
	return this.key_char;
}*/

function GameKey_keyPressed(obj, e)
{
	obj.keyPressed(e);
}

function GameKey_keyReleased(obj, e)
{
	obj.keyReleased(e);
}
