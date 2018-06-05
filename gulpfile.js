const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const webpackConfig = require('./webpack.config');

gulp.task('fx', function () {
    webpackConfig.entry = './Sources/index.js';
    webpackConfig.output.filename = 'CanvasMasao.js';
    return webpackStream(webpackConfig, webpack)
        .pipe(gulp.dest('./Outputs/'));
});

gulp.task('v28', function () {
    webpackConfig.entry = './Sources_v28/index.js';
    webpackConfig.output.filename = 'CanvasMasao_v28.js';
    return webpackStream(webpackConfig, webpack)
        .pipe(gulp.dest('./Outputs/'));
});

gulp.task('all', ['fx', 'v28']);

gulp.task('default', ['fx']);
