/**
 * 要素のID用にランダムな文字列を生成します。
 * @returns String ランダムな文字列
 */
export default function randomID() {
	return (
		"a" +
		Math.random()
			.toString(36)
			.slice(2)
	);
}
