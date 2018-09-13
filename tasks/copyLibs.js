var gulp = require('gulp');

module.exports = function (options) {
	return function(callback) {

		gulp.src(options.jquery.src)
			.pipe(gulp.dest(options.jquery.dest));

		gulp.src(options.bootstrap4grid.src)
			.pipe(gulp.dest(options.bootstrap4grid.dest))

		gulp.src(options.normalize.src)
			.pipe(gulp.dest(options.normalize.dest))

		callback()
	};
};
