var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

module.exports = function(options) {
	return function() {
		return gulp.src(options.src)
		.pipe($.plumber({
			errorHandler: $.notify.onError(function(err){
				return {
					title: 'Pug',
					message: err.message
				}
			})

		}))
		.pipe($.pug())
		.pipe($.htmlBeautify(options.htmlbeautifyOptions))
		.pipe(gulp.dest(options.dest))
		.pipe(browserSync.reload({ stream: true }));
		//.pipe(browserSync.stream());//stream()
	};
};
