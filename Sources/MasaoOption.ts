import { Graphics } from "./ImageBuff";
import { MasaoJSS } from "./MasaoJSS";
import { MasaoConstruction } from "./MasaoConstruction";
import { Game } from "./GlobalFunctions";
import { KnownParameterKey } from "./MasaoParameters";

export type Params = { [K in KnownParameterKey]: string } & {
	[key: string]: string | undefined;
};

export interface Option {
	width?: number;
	height?: number;
	/** ハイスコア更新時に呼び出されるコールバック関数 */
	highscoreCallback?(score: number): void;
	/** 毎フレーム呼び出されるコールバック関数 */
	userJSCallback?(Offscreen_g: Graphics, mode: number, view_x: number, view_y: number, ap: MasaoJSS): void;
	/** 拡張機能 */
	extensions?: Extension[];
	/**
	 * 第3版マップデータ
	 * （内部的には `advanced-map` を優先して使う）
	 * @deprecated
	 */
	"advance-map"?: AdvancedMap;
	/** 第3版マップデータ */
	"advanced-map"?: AdvancedMap;
	/** 敵の数制限の後方互換性を保つ */
	"bc-enemy-number"?: boolean;
	/** ループに必ずsetIntervalを使う */
	"bc-loop-setinterval"?: boolean;
	/** Web Audio APIを使わない音声再生を行う */
	"bc-no-webaudio"?: boolean;
	/** Web Audio APIを使う場合でも同じ効果音を重複して再生しない */
	"bc-no-overlap-sound"?: boolean;
	/** 拡張JSのメソッドの大文字小文字を区別しない */
	"bc-case-insensitive"?: boolean;
	/** 小数切り捨て処理をJava版の挙動にする */
	"bc-use-rounddown"?: boolean;
	/** メインループを行うためのLoopクラスです。（テスト用） */
	"custom-loop"?: ILoop;
}

export interface AdvancedMap {
	stages: Stage[];
	customParts?: { [key: string]: CustomParts };
}
export interface Stage {
	size: { x: number; y: number };
	layers: Layer[];
}
export interface MainLayer {
	id?: string;
	type: "main";
	src?: string;
	map: (number | string)[][];
}
export interface MapchipLayer {
	id?: string;
	type: "mapchip";
	src?: string;
	map: number[][];
}
export type Layer = MainLayer | MapchipLayer;
export interface CustomParts {
	extends: number | string;
	properties: { [key: string]: unknown };
}

export interface Extension {
	inject(mc: MasaoConstruction, options: Option): void;
}

export interface ILoop {
	new (game: Game, forceSetInterval: boolean): LoopInstance;
}

export interface LoopInstance {
	start(interval: number, callback: () => void): void;
	stop(): void;
}
