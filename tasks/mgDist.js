var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var pngquant = require('imagemin-pngquant');

module.exports = function(options) {
	return function() {
		return gulp.src(options.src)
		.pipe($.imagemin({
			progressive: true,
			// optimizationLevel: 5,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()],
			interlaced: true
		}))
		.pipe(gulp.dest(options.dest));
	};
};
