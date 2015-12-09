var gulp = require('gulp'),
shell = require('gulp-shell'),
concat = require('gulp-concat'),
notify = require("gulp-notify"),
open = require('gulp-open');

var rawBook = './book/chapters'
var exportTo = './public/book';
var outputDir= './public';
var tmpMetadata = '.tmp/title.yaml';
var indexHtml = '.tmp/web/index.html';
var base = '.tmp/';
var book = './config.json';
var exportFrom = '.tmp/'+book.Name+'.tex';

gulp.task('concat', function() {
  return gulp.src([
    'book/metadata/header.tex',
    'book/chapters/*.tex',
    'book/metadata/footer.tex'])
    .pipe(concat(book.Name+'.tex'))
    .pipe(gulp.dest('.tmp/'));
});

gulp.task('metadata',function(){
  return gulp.src([
    'book/title.yaml',
    'book/notes/**/*',
    'book/metadata/templates/*',
    'lib/**/*'])
    .pipe(gulp.dest('.tmp/'));
});

gulp.task('word', ['metadata','concat'], function() {
  return gulp.src(exportFrom, {read: false})
  .pipe(shell('pandoc -s -S '+base+'<%= file.relative %> -o '+exportTo+'.docx'))
  .pipe(notify({
    message : "POW!! your word has been created in "+exportTo+'.docx'}));
});

gulp.task('ebook', ['metadata', 'concat'], function() {
  return gulp.src(exportFrom, {read: false})
  //.pipe(shell('pandoc -S -o '+base+'<%= file.relative %>.epub '+tmpMetadata+ ' '+base+'<%= file.relative %>'))
  .pipe(shell('cd .tmp && htlatex '+book.Name+'.tex "html,mathplayer,charset=utf-8" " -cunihtf -utf8" "" " -shell-escape" && ebook-convert '+book.Name+'.html '+book.Name+'.epub && ebook-convert '+book.Name+'.html '+book.Name+'.mobi && mv *.epub ../public && mv *.mobi ../public && cd ./..'))
  .pipe(notify({
    message : "POW!! your ebook has been created in "+exportTo+'.epub'}));
});

gulp.task('publish',['word','epub'],function(){
  return gulp.src(exportTo+".*")
  .pipe(notify({
    message : "POW!! your book has been published in public/<%= file.relative %>"}));
});
gulp.task('default',['publish']);
