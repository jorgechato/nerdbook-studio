var gulp = require('gulp'),
shell = require('gulp-shell'),
concat = require('gulp-concat'),
notify = require("gulp-notify"),
open = require('gulp-open'),
fullShell = require('shelljs');

var exportTo = './public/book';
var outputDir= '../public';
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
  .pipe(shell('cd .tmp && pdflatex -shell-escape -output-directory='+outputDir+' -output-format=pdf <%= file.relative %> && cd ..'))
  .pipe(shell('mkdir -p public/tmp && mv -t ./public/tmp ./public/*.pdf ./public/*.toc && rm public/*.* && mv ./public/tmp/* ./public && rmdir ./public/tmp'))
  .pipe(notify({
    message : "POW!! your pdf has been created in "+exportTo+'.pdf'}));
});

gulp.task('store',['publish'], function() {
  var folderName = book.Name.toUpperCase()+"-"+new Date().toString().split(' ').splice(1,3).join('-');
  fullShell.mkdir('-p',folderName);
  fullShell.mv('-f', [
    './book',
    './images',
    './public',
    './lib'
  ], folderName);
  fullShell.rm('-rf', [
    'README.md',
    './node_modules',
    'package.json',
    'config.json'
  ]);
  if(fullShell.which('zip')){
    gulp.src(folderName)
    .pipe(shell('zip -r -X '+folderName+'.zip '+folderName));
  }
  fullShell.rm('-rf', './gulpfile.js');
});

gulp.task('publish',['pdf'],function(){
  return gulp.src(exportTo+".*")
  .pipe(notify({
    message : "POW!! your book has been published in public/<%= file.relative %>"}));
});
gulp.task('default',['publish']);
