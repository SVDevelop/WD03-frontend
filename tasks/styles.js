var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var browserSync = require('browser-sync').create();


module.exports = function(options) {
	return function() {
		return gulp.src(options.src)
			.pipe($.plumber({
				errorHandler: $.notify.onError(function(err){
					return {
						title: 'Styles',
						message: err.message
					}
				})
			}))
			.pipe($.sourcemaps.init())
			.pipe($.less())
			.pipe($.autoprefixer({
				browsers: ['last 6 versions'],
				cascade: false
			}))
			.pipe($.sourcemaps.write())
			.pipe(gulp.dest(options.dest))
			.pipe(browserSync.stream({once: true}));//stream());
		};
};
