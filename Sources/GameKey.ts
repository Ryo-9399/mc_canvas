/**
 * キー入力を管理する
 */
class GameKey {
	key_code = 0;
	up_f = false;
	down_f = false;
	left_f = false;
	right_f = false;
	tr1_f = false;
	tr2_f = false;
	tr3_f = false;
	start_f = false;
	x_f = false;
	z_f = false;
	space_f = false;
	left_c = 0;
	right_c = 0;
	up_c = 0;
	down_c = 0;
	tr1_c = 0;
	codekey_f = new Array(256);
	left_right_lock = false;
	key_char = 0;

	/**
	 * 初期化
	 */
	init() {
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

	/**
	 * キー入力を受けた時の処理
	 * @param paramKeyEvent 入力されたキーに関するイベント
	 */
	keyPressed(paramKeyEvent: Pick<KeyboardEvent, "keyCode" | "preventDefault">) {
		this.key_code = paramKeyEvent.keyCode;
		this.key_char = paramKeyEvent.keyCode; // GameKey.key_charはタイトル画面からバージョン画面を表示するときにしか使っていない
		if (this.key_code >= 0 && this.key_code <= 255) {
			this.codekey_f[this.key_code] = true;
		}
		switch (this.key_code) {
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

	/**
	 * キーが離されたときの処理
	 * @param paramKeyEvent キーに関するイベント
	 */
	keyReleased(paramKeyEvent: Pick<KeyboardEvent, "keyCode" | "preventDefault">) {
		var i = paramKeyEvent.keyCode;
		if (i >= 0 && i <= 255) {
			this.codekey_f[i] = false;
		}
		switch (i) {
			case 38:
				this.up_f = false;
				break;
			case 40:
				this.down_f = false;

				this.tr2_f = false;

				break;
			case 37:
				if (!this.left_right_lock) {
					this.left_f = false;

					this.left_c = 0;
				}
				break;
			case 39:
				if (!this.left_right_lock) {
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
				if (!this.left_right_lock) {
					this.left_f = false;

					this.left_c = 0;
				}
				break;
			case 102:
				if (!this.left_right_lock) {
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

	/**
	 * 最後に押されたキーのキーコードを取得
	 * @returns キーコード
	 */
	getKeyCode() {
		return this.key_code;
	}
}

/*GameKey.prototype.getKeyChar = function()
{
	return this.key_char;
}*/

/**
 * GameKey.keyPressedの別名
 * TODO: 消せ
 * @param obj {GameKey}
 * @param e {KeyboardEvent}
 * @constructor
 */
function GameKey_keyPressed(obj: GameKey, e: KeyboardEvent) {
	obj.keyPressed(e);
}

/**
 * GameKey.keyReleasedの別名
 * TODO: 消せ
 * @param obj {GameKey}
 * @param e {KeyboardEvent}
 * @constructor
 */
function GameKey_keyReleased(obj: GameKey, e: KeyboardEvent) {
	obj.keyReleased(e);
}

export { GameKey, GameKey_keyPressed, GameKey_keyReleased };
