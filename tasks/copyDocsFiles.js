var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
module.exports = function(options) {
	return function(callback) {

		for(var i in options.path ) {
			gulp.src(options.path[i]['src'])
			.pipe(gulp.dest(options.path[i]['dest']))
		};

		callback()
	};
};
