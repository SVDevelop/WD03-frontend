var gulp = require('gulp');

module.exports = function(options) {
	return function(callback) {
		gulp.src(options.src)
			.pipe(gulp.dest(options.dest))
		callback()
	};
};
