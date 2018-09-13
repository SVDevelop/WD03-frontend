// var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

module.exports = function(options) {
	return function() {
		browserSync.init({
			server: options.server
		});
		return function () {
			for (var taskName in options.watchPath){
				$.watch(watchPath[taskName], function(){
					gulp.start(taskName);
				});
			};
		}
	};
};
