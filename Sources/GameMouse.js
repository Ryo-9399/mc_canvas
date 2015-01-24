
function GameMouse()
{
	this.button_f = false;
	this.click_x = 0;
	this.click_y = 0;

	this.init = function()
	{
		this.button_f = false;
		this.click_x = 0;
		this.click_y = 0;
	}
}

GameMouse.prototype.mousePressed = function(paramMouseEvent)
{
	var rect = paramMouseEvent.target.getBoundingClientRect();
	this.button_f = true;
	this.click_x = (paramMouseEvent.clientX - rect.left) / rect.width * 512;
	this.click_y = (paramMouseEvent.clientY - rect.top) / rect.height * 320;
}

GameMouse.prototype.mouseReleased = function(paramMouseEvent)
{
	this.button_f = false;
}

function GameMouse_mousePressed(obj, e)
{
	obj.mousePressed(e);
}

function GameMouse_mouseReleased(obj, e)
{
	obj.mouseReleased(e);
}
