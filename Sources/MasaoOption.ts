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
	highscoreCallback?(score: number): void;
	userJSCallback?(Offscreen_g: Graphics, mode: number, view_x: number, view_y: number, ap: MasaoJSS): void;
	extensions?: Extension[];
	"advance-map"?: AdvancedMap;
	"advanced-map"?: AdvancedMap;
	"bc-enemy-number"?: boolean;
	"bc-loop-setinterval"?: boolean;
	"bc-no-webaudio"?: boolean;
	"bc-no-overlap-sound"?: boolean;
	"bc-case-insensitive"?: boolean;
	"bc-use-rounddown"?: boolean;
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