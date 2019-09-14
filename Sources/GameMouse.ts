/**
 * マウス入力を管理する
 * @constructor
 */
class GameMouse {
	button_f: boolean;
	click_x: number;
	click_y: number;

	constructor() {
		this.button_f = false;
		this.click_x = 0;
		this.click_y = 0;
	}

	/**
	 * 初期化
	 */
	init() {
		this.button_f = false;
		this.click_x = 0;
		this.click_y = 0;
	}

	/**
	 * クリックされたときの処理
	 * @param paramMouseEvent {MouseEvent}
	 */
	mousePressed(paramMouseEvent) {
		var target = paramMouseEvent.target;
		var rect = target.getBoundingClientRect();
		this.button_f = true;
		this.click_x = ((paramMouseEvent.clientX - rect.left) / rect.width) * target.width;
		this.click_y = ((paramMouseEvent.clientY - rect.top) / rect.height) * target.height;
	}

	/**
	 * マウスボタンが離されたときの処理
	 * @param paramMouseEvent {MouseEvent}
	 */
	mouseReleased(paramMouseEvent) {
		this.button_f = false;
	}
}

/**
 * GameMouse.mousePressedの別名
 * TODO: 消せ
 * @param obj {GameMouse}
 * @param e {MouseEvent}
 * @constructor
 */
function GameMouse_mousePressed(obj, e) {
	obj.mousePressed(e);
}

/**
 * GameMouse.mouseReleasedの別名
 * TODO: 消せ
 * @param obj {GameMouse}
 * @param e {MouseEvent}
 * @constructor
 */
function GameMouse_mouseReleased(obj, e) {
	obj.mouseReleased(e);
}

export { GameMouse, GameMouse_mousePressed, GameMouse_mouseReleased };
