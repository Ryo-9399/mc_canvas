import { use, expect } from "chai";
import { matchSnapshot } from "chai-karma-snapshot";
import randomString from "../helpers/random-string";
import { LoopNoop } from "../helpers/loop";
import { sleep } from "../helpers/sleep";

// Instruct chai to use matchSnapshot plugin.
use(matchSnapshot);

/*
 * 正男ファイルのフォーマット
 * params: paramの一覧のオブジェクト
 * advanced-map: 第3版マップデータ（あれば）
 * _snapshot-frames: スナップショットを取るフレーム番号の一覧
 * _ran_seed: 乱数のseed値
 */

for (const key in window.__json__) {
	if (!/\.masao\.json$/.test(key)) {
		// 正男以外は除く
		continue;
	}
	describe(key, () => {
		it("スナップショットテスト", async () => {
			const stage = window.__json__[key];
			// 正男を設置する場所を容易
			const div = document.createElement("div");
			// IDをつける
			div.id = randomString();
			document.body.appendChild(div);
			// 正男を設置
			const game = new CanvasMasao.Game(stage.params, div.id, {
				"advanced-map": stage["advanced-map"],
				"custom-loop": LoopNoop
			});
			// XXX 時間間隔を無効化
			game.__st = -100;
			// 乱数のseed値を固定
			game.__mc.userInit = function () {
				this.mp.ran_seed = isFinite(stage._ran_seed) ? Number(stage._ran_seed) : 0x12345;
			};
			// 最初のループで初期化
			game.__loop();
			// リソースの読み込み完了まで待つ
			while (game.__mc.th_jm >= 6) {
				await sleep(20);
				game.__loop();
			}
			// 読み込み完了したので開始直前まで進める
			while (game.__mc.mp.ml_mode !== 60) {
				game.__loop();
			}
			// ゲーム開始（これが0フレーム目）
			game.__mc.startGame();
			let currentFrame = 0;
			for (const targetFrame of stage["_snapshot-frames"]) {
				while (currentFrame <= targetFrame) {
					game.__loop();
					currentFrame++;
				}
				// console.log('frame', targetFrame);
				await sleep(0);
				// スナップショットを取る
				expect(game.__mc.getSnapshot()).to.matchSnapshot();
			}

			// 終了
			game.kill();
			document.body.removeChild(div);
		});
	});
}
