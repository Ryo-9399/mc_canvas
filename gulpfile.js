const gulp = require("gulp");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const uglifyes = require("uglify-es");
const composer = require("gulp-uglify/composer");
const minify = composer(uglifyes, console);
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const typescript = require("gulp-typescript");

const webpackConfig = require("./webpack.config");

gulp.task(
	"fx",
	gulp.series(
		function compile() {
			const tsconfig = require("./Sources/tsconfig.json");
			return gulp
				.src("./Sources/**/*.ts")
				.pipe(typescript(tsconfig.compilerOptions))
				.pipe(gulp.dest("./dist/fx/"));
		},
		function bundle() {
			webpackConfig.entry = "./dist/fx/index.js";
			webpackConfig.output.filename = "CanvasMasao.js";
			return webpackStream(webpackConfig, webpack).pipe(gulp.dest("./Outputs/"));
		}
	)
);

gulp.task("kani2", function() {
	return gulp
		.src(["./Extends/MasaoKani2.js", "Extends/pre.js"])
		.pipe(concat("MasaoKani2.js"))
		.pipe(minify({}))
		.pipe(gulp.dest("./Outputs/"));
});

gulp.task("kani2-manual", function() {
	return gulp
		.src("./Extends/MasaoKani2.js")
		.pipe(rename("MasaoKani2_manual.js"))
		.pipe(minify({}))
		.pipe(gulp.dest("./Outputs/"));
});

gulp.task("kani2-all", gulp.parallel("kani2", "kani2-manual"));

gulp.task("v28", function() {
	webpackConfig.entry = "./Sources_v28/index.js";
	webpackConfig.output.filename = "CanvasMasao_v28.js";
	return webpackStream(webpackConfig, webpack).pipe(gulp.dest("./Outputs/"));
});

gulp.task("all", gulp.parallel("fx", "v28", "kani2-all"));

gulp.task("default", gulp.parallel("fx"));
