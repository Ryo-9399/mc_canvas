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
	"custom-loop"?: ILoop;
}

interface AdvancedMap {
	stages: Stage[];
	customParts?: { [key: string]: CustomParts };
}
interface Stage {
	size: { x: number; y: number };
	layers: Layer[];
}
interface Layer {
	id?: string;
	type: "main" | "mapchip";
	src?: string;
	map: (number | string)[];
}
interface CustomParts {
	extends: number | string;
	properties: { [key: string]: unknown };
}

interface Extension {
	inject(mc: MasaoConstruction, options: Option): void;
}

interface ILoop {
	new (game: Game, forceSetInterval: boolean): LoopInstance;
}

export interface LoopInstance {
	start(interval: number, callback: () => void): void;
	stop(): void;
}
