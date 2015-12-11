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

gulp.task('pdf', ['metadata','concat'], function() {
  return gulp.src(exportFrom, {read: false})
  .pipe(shell('pdflatex -shell-escape -output-directory='+outputDir+' -output-format=pdf '+base+'<%= file.relative %>'))
  .pipe(shell('mkdir -p public/tmp && mv ./public/*.pdf ./public/tmp && rm public/*.* && mv ./public/tmp/*.pdf ./public && rmdir ./public/tmp && rm *.pyg'))
  .pipe(notify({
    message : "POW!! your pdf has been created in "+exportTo+'.pdf'}));
});

gulp.task('publish',['word','pdf'],function(){
  return gulp.src(exportTo+".*")
  .pipe(notify({
    message : "POW!! your book has been published in public/<%= file.relative %>"}));
});
gulp.task('default',['publish']);
