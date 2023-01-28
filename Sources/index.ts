import * as CanvasMasao from "./CanvasMasao";

Object.defineProperty(globalThis, "CanvasMasao", { value: CanvasMasao });
Object.defineProperty(globalThis, "JSMasao", { value: CanvasMasao.Game });
Object.defineProperty(CanvasMasao.Game, "MasaoConstruction", { value: CanvasMasao.MasaoConstruction });
Object.defineProperty(CanvasMasao, "version", { value: process.env.MC_CANVAS_VER });