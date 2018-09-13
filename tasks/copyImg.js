var gulp = require('gulp');
var browserSync = require('browser-sync').create();

module.exports = function(options) {
	return function() {
		return gulp.src(options.src)
			.pipe(gulp.dest(options.dest))
			.pipe(browserSync.stream());
	};
};
