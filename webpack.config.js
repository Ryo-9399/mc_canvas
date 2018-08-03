module.exports = {
	mode: "production",
	entry: "./Sources/index.js",
	output: {
		filename: "CanvasMasao.js"
	},
	module: {
		rules: [
			{
				loader: "babel-loader",
				options: {
					presets: [["env", { modules: false }]]
				}
			}
		]
	}
};
