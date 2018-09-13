var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
// var browserSync = require('browser-sync').create();
// var del = require('del');
var runSequence = require('run-sequence');
// var pngquant = require('imagemin-pngquant');

function lazyRequireTask(taskName, path, options) {
	options = options || {};
	options.taskName = taskName;
	gulp.task(taskName, function(callback) {
		let task = require(path).call(this, options);

		return task(callback);
	});
}
lazyRequireTask('server', './tasks/server', {
	server: { baseDir: './build/'},
	watchPath: {
				"pug": './src/pug/**/*.*',
				"styles": './src/less/**/*.less',
				"copy:js": './src/js/**/*.js',
				"copy:libs:local": './src/libs/**/*.*',
				"copy:img": [
					'./src/img/**/*.*',
					'!./src/img/svg-for-sprites/**/*.svg'
				],
				"svg": './src/img/svg/*.svg'
			}
});
lazyRequireTask('server:docs', './tasks/serverDocs', {
	server: { baseDir: './docs/'}
});

lazyRequireTask('styles', './tasks/styles', {
	src: './src/less/main.less',
	dest: './build/css'
});

lazyRequireTask('pug', './tasks/pug', {
	src: './src/pug/pages/**/*.pug',
	dest: './build',
	htmlbeautifyOptions: {
		"indent_size": 1,
		"indent_char": "	",
		"eol": "\n",
		"indent_level": 0,
		"indent_with_tabs": true,
		"preserve_newlines": false,
		"max_preserve_newlines": 10,
		"jslint_happy": false,
		"space_after_anon_function": false,
		"brace_style": "collapse",
		"keep_array_indentation": false,
		"keep_function_indentation": false,
		"space_before_conditional": true,
		"break_chained_methods": false,
		"eval_code": false,
		"unescape_strings": false,
		"wrap_line_length": 0,
		"wrap_attributes": "auto",
		"wrap_attributes_indent_size": 4,
		"end_with_newline": false
	}
});

lazyRequireTask('svg', './tasks/svg', {
	src: './src/img/svg-for-sprites/*.svg',
	dest: './build/img',
	rename: 'sprite.svg'
});

lazyRequireTask('copy:libs', './tasks/copyLibs', {
	jquery: {
		src: 'node_modules/jquery/dist/**/*.*',
		dest: './build/libs/jquery'
	},
	bootstrap4grid: {
		src: 'node_modules/bootstrap-4-grid/css/**/*.*',
		dest: './build/libs/bootstrap-4-grid'
	},
	normalize: {
		src: 'node_modules/normalize.css/normalize.css',
		dest: './build/libs/normalize-css/'
	}
});

lazyRequireTask('copy:libs-local', './tasks/copyLibsLocal', {
	src: './src/libs/**/*.*',
	dest: './build/libs/'
});

lazyRequireTask('copy:img', './tasks/copyImg', {
	src: [
		'./src/img/**/*.*',
		'!./src/img/svg-for-sprites/**/*.svg'
	],
	dest: './build/img'
});

lazyRequireTask('copy:js', './tasks/copyJs', {
	src: './src/js/**/*.*',
	dest: './build/js'
});
lazyRequireTask('clean:build', './tasks/cleanBuild', {
	del: './build'
});

lazyRequireTask('copy:build:files', './tasks/copyBuildFiles', {
	path: [
			{src: './src/php/**/*.*', dest: './build/php/'},
			{src: './src/files/**/*.*',	dest: './build/files/'},
			{src: './src/fonts/**/*.*',	dest: './build/fonts/'}
		]
});

gulp.task('default', function(callback){
	runSequence(
		'clean:build',
		['styles', 'pug', 'svg', 'copy:libs', 'copy:libs-local', 'copy:img', 'copy:js'],
		'server',
		callback
	)
});

/* ------------------------------------
  DOCS TASKS
------------------------------------ */
lazyRequireTask('clean:docs', './tasks/cleanDocs', {
	del:'./docs'
});

lazyRequireTask('mg:dist', './tasks/mgDist', {
	src: './build/img/**/*.*',
	dest: './docs/img'
});

lazyRequireTask('copy:docs:files', './tasks/copyDocsFiles', {
	path: [
			{src: './src/php/**/*.*', dest: './dist/php/'},
			{src: './src/files/**/*.*',	dest: './dist/files/'},
			{src: './src/fonts/**/*.*',	dest: './docs/fonts/'}
		]
});

lazyRequireTask('html:docs', './tasks/htmlDocs', {
	src: './build/**/*.html',
	dest: './docs/'
});

gulp.task('docs', function(callback){
	runSequence(
		'clean:build',
		['styles', 'pug', 'svg', 'copy:libs', 'copy:libs-local', 'copy:img', 'copy:js'],
		'clean:docs',
		['img:dist', 'copy:docs:files', 'html:docs' ],
		'server:docs',
		callback
	)
});
