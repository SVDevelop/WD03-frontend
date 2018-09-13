var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
// var browserSync = require('browser-sync').create();

module.exports =  function(options) {
	return function() {
		return gulp.src(options.src)
		.pipe($.svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe($.cheerio({
			run: function($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe($.replace('&gt;', '>'))
		.pipe($.svgsprite({
			mode: {
				symbol: {
					sprite: "sprite.svg"
				}
			}
		}))
		.pipe($.rename(options.rename))
		.pipe(gulp.dest(options.dest));
	};
};
