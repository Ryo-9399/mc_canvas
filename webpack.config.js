module.exports = {
	mode: "production",
	entry: "./Sources/index.js",
	output: {
		filename: "CanvasMasao.js"
	},
	target: ["web", "es5"],
	module: {
		rules: [
			{
				loader: "babel-loader"
			}
		]
	}
};
