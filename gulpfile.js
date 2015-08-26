var gulp = require('gulp'),
shell = require('gulp-shell'),
concat = require('gulp-concat'),
rename = require("gulp-rename"),
open = require('gulp-open');

var rawBook = './book/chapters'
var exportTo = './public/book';
var exportFrom = '.tmp/book.full.tex';
var tmpMetadata = '.tmp/title.txt';
var indexHtml = '.tmp/web/index.html';

gulp.task('concat', function() {
	return gulp.src('book/chapters/*.tex')
	.pipe(concat('book.tex'))
	.pipe(rename({
		suffix: '.full'
	}))
	.pipe(gulp.dest('.tmp/'));
});

gulp.task('metadata',function(){
	return gulp.src('book/title.txt')
	.pipe(gulp.dest('.tmp/'));
});

gulp.task('word', ['concat'], function() {
	return gulp.src(exportFrom, {read: false})
	.pipe(shell('pandoc -s -S <%= file.path %> -o '+exportTo+'.docx'));
});

gulp.task('pdf', ['concat'], function() {
	return gulp.src(exportFrom, {read: false})
	.pipe(shell('pandoc -s <%= file.path %> -o '+exportTo+'.pdf'));
});

gulp.task('epub', ['metadata', 'concat'], function() {
	return gulp.src(exportFrom, {read: false})
	.pipe(shell('pandoc -S -o '+exportTo+'.epub '+tmpMetadata+ ' <%= file.path %>'));
});

gulp.task('html', ['concat'], function() {
	return gulp.src(exportFrom, {read: false})
	.pipe(shell('pandoc <%= file.path %> -s -o '+indexHtml));
});

gulp.task('open', function(){
  gulp.src(indexHtml)
  .pipe(open());
});

gulp.task('serve',['metadata','concat','html','open'],function(){
  gulp.watch(rawBook+'/**/*', ['html']);
});

gulp.task('publish',['word','pdf','epub']);
gulp.task('default',['serve']);