var gulp = require('gulp'),
shell = require('gulp-shell'),
concat = require('gulp-concat'),
rename = require("gulp-rename"),
notify = require("gulp-notify"),
open = require('gulp-open');

var rawBook = './book/chapters'
var exportTo = './public/book';
var exportFrom = '.tmp/book.full.tex';
var tmpMetadata = '.tmp/title.yaml';
var indexHtml = '.tmp/web/index.html';
var base = '.tmp/';

gulp.task('concat', function() {
  return gulp.src([
    'book/metadata/header.tex',
    'book/chapters/*.tex',
    'book/metadata/footer.tex'])
    .pipe(concat('book.tex'))
    .pipe(rename({
      suffix: '.full'
    }))
    .pipe(gulp.dest('.tmp/'));
});

gulp.task('metadata',function(){
  return gulp.src([
    'book/title.yaml',
    'book/notes/**/*',
    'lib/**/*'])
    .pipe(gulp.dest('.tmp/'));
});

gulp.task('word', ['concat'], function() {
  return gulp.src(exportFrom, {read: false})
  .pipe(shell('pandoc -s -S '+base+'<%= file.relative %> -o '+exportTo+'.docx'))
  .pipe(notify({
    message : "POW!! your word has been created in "+exportTo+'.docx'}));
});

gulp.task('pdf', ['concat'], function() {
  return gulp.src(exportFrom, {read: false})
  .pipe(shell('pandoc -s '+base+'<%= file.relative %> -o '+exportTo+'.pdf'))
  .pipe(notify({
    message : "POW!! your pdf has been created in "+exportTo+'.pdf'}));
});

gulp.task('epub', ['metadata', 'concat'], function() {
  return gulp.src(exportFrom, {read: false})
  .pipe(shell('pandoc -S -o '+base+'<%= file.relative %> '+tmpMetadata+ ' '+base+'<%= file.relative %>'))
  .pipe(notify({
    message : "POW!! your ebook has been created in "+exportTo+'.epub'}));
});

gulp.task('html', ['concat'], function() {
  return gulp.src(exportFrom, {read: false})
  .pipe(shell('pandoc '+base+'<%= file.relative %> -s -o '+indexHtml));
});

gulp.task('open', function(){
  gulp.src(indexHtml)
  .pipe(open());
});

gulp.task('serve',['metadata','concat','html','open'],function(){
  gulp.watch(rawBook+'/**/*', ['html']);
});

gulp.task('publish',['word','pdf','epub'],function(){
  return gulp.src(exportTo+".*")
  .pipe(notify({
    message : "POW!! your book has been published in public/<%= file.relative %>"}));
});
gulp.task('default',['serve']);
