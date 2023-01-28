const webpack = require('webpack');
const child_process = require("child_process");

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
	},
	plugins: [
		new webpack.EnvironmentPlugin({
			MC_CANVAS_VER: child_process.execSync(`git describe --tags --abbrev=0`, {encoding: 'utf8'}).trim()
		})
	]
};