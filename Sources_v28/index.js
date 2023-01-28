import { Game } from "./GlobalFunctions";

window.CanvasMasao = {
	Game: Game
};
window.JSMasao = Game;
Object.defineProperty(CanvasMasao, "version", { value: process.env.MC_CANVAS_VER });
