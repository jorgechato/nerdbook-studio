var gulp = require('gulp'),
shell = require('gulp-shell'),
concat = require('gulp-concat'),
notify = require("gulp-notify"),
open = require('gulp-open');

var exportTo = './public/book';
var outputDir= './public';
var metadata = 'title.opf';
var base = '.tmp/';
var book = require('./config.json');
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
    'book/title.opf',
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

gulp.task('epub', ['metadata', 'concat'], function() {
  return gulp.src(exportFrom, {read: false})
  .pipe(shell('cd .tmp && htlatex '+book.Name+'.tex "html,0,notoc*,mathplayer,charset=utf-8" " -cunihtf -utf8" "-cvalidate" " -shell-escape" && ebook-convert '+book.Name+'.html '+book.Name+'.epub --cover ../images/cover.png -m '+metadata+' && mv *.epub ../public && cd ./..'))
  .pipe(notify({
    message : "POW!! your ebook has been created in "+exportTo+'.epub'}));
});

gulp.task('mobi', ['metadata', 'concat'], function() {
  return gulp.src(exportFrom, {read: false})
  .pipe(shell('cd .tmp && htlatex '+book.Name+'.tex "html,0,notoc*,mathplayer,charset=utf-8" " -cunihtf -utf8" "" " -shell-escape" && ebook-convert '+book.Name+'.html '+book.Name+'.mobi --cover ../images/cover.png -m '+metadata+' && mv *.mobi ../public && cd ./..'))
  .pipe(notify({
    message : "POW!! your ebook has been created in "+exportTo+'.mobi'}));
});

gulp.task('publish',['word','epub','mobi'],function(){
  return gulp.src(exportTo+".*")
  .pipe(notify({
    message : "POW!! your book has been published in public/<%= file.relative %>"}));
});
gulp.task('default',['publish']);
