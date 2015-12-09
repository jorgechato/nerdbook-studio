var mkdirp = require('mkdirp'),
notifier = require('node-notifier'),
colors = require('colors'),
Box = require("cli-box"),
shell = require('shelljs'),
jsonfile = require('jsonfile'),
inquirer = require("inquirer");

var folders = [
  './.tmp',
  './public',
  './lib/styles'
];
var jsonConfig = "./config.json";
var base = {
  "root" : "./",
  "meta" : "./book/metadata/",
  "article" : "./book/metadata/article/",
  "book" : "./book/metadata/book/",
  "template" : "./book/metadata/header.tex"
};

jsonfile.spaces = 4;
var ms = Box({
  w: 65,
  h: 6,
  marks: {
    nw: "╔",
    n:  "═",
    ne: "╗",
    e:  "║",
    se: "╝",
    s:  "═",
    sw: "╚",
    w:  "║"
  }
},{
  text: colors.rainbow('>>>')+colors.blue(' Now you have all you need to start your AWESOME book \n')+
    colors.rainbow('>>>')+colors.blue(' run "gulp" and start the adventure\n\n')+
    colors.yellow("Remember to check http://jorgechato.com for more fun projects"),
  stretch: true,
  autoEOL: true,
  vAlign: "center",
  hAlign: "left"
});

var folderCreated = false;

setTimeout(function(){
  folders.forEach(function(folder){
    mkdirp(folder, function (err) {
      if (err) console.error(err)
        else {
          if (folder == folders[folders.length-1]){
            folderCreated = true;
          }
        }
    });
  });
},50);

setTimeout(function(){
  shell.rm('-rf',base.root+'examples');
},55);

start();

function start(){
  inquirer.prompt([{
    type: "input",
    name: "title",
    message: "What is the name of your book?",
    default: "book"
  },
  {
    type: "list",
    name: "whrite",
    message: "What do you want to write?",
    choices: [
      "Article/work (pdf,word...)",
      "Book (epub)"
    ]
  },
  {
    type: "list",
    name: "lang",
    message: "In Which language do you want to write?",
    choices: [
      "Español",
      "English"
    ]
  }], function( answers ) {
    var lang = answers.lang === "Español" ? "es" : "en";
    var type = answers.whrite === "Article/work (pdf,word...)" ? "article" : "book";

    if(answers.whrite === "Article/work (pdf,word...)"){

      inquirer.prompt({
        type: "list",
        name: "layout",
        message: "Which layout do you want?",
        default: 1,
        choices: [
          "Base (bones layout so you can create your own)",
          "Brain (recommended)",
          "Team (perfect for team works)"
        ]
      }, function( answer ) {
        var layout = answer.layout === "Base (bones layout so you can create your own)" ? "base" : (answer.layout === "Brain (recommended)" ? "brain" : "team");
        //article(layout+"-"+lang);
        createJson(answers.title,lang,type,layout,function(){
          console.log(colors.green(JSON.stringify(jsonfile.readFileSync(jsonConfig), null, 2)));
          checkInfo();
        });
      });
    }else{
      createJson(answers.title,lang,type,"",function(){
        checkInfo();
      });
    }
  });
}

var createJson = function(name,lang,type,layout,callback){
  jsonfile.writeFile(jsonConfig,{
    "Name" : name,
    "Language" : lang,
    "Type" : type,
    "Layout" : layout
  }, function (err) {
    if(!err && typeof callback === "function"){callback();}
  })
}

var checkInfo = function(){
  inquirer.prompt({
    type: "confirm",
    name: "correct",
    message: "Is this information ok?",
  }, function(answer) {
    if(!answer.correct){
      shell.rm(jsonConfig);
      return start();
    }
    return prepareFiles();
  });
}

var prepareFiles = function(){
  var config = jsonfile.readFileSync(jsonConfig);
  if(config.Type === "article"){
    shell.mv(base.article+config.Layout+"-"+config.Language+".tex",base.meta);
    shell.mv(base.meta+config.Layout+"-"+config.Language+".tex",base.template);
  }else{
    shell.mv(base.book+config.Type+"-"+config.Language+".tex",base.meta);
    shell.mv(base.meta+config.Type+"-"+config.Language+".tex",base.template);
  }
  if(config.Type === "book"){
    shell.mv("book.js","gulpfile.js");
    shell.rm("article.js");
  }else{
    shell.mv("article.js","gulpfile.js");
    shell.rm("book.js");
  }
  shell.rm("-rf",[base.article,base.book]);
  return output();
}

var output = function(){
  var allInstalled = true;
  if(folderCreated){
    if(!shell.which('latex')){
      shell.echo(colors.red('You had to install LATEX'));
      allInstalled = false;
    }
    if(!shell.which('pdflatex')){
      shell.echo(colors.red('You had to install pdflatex'));
      allInstalled = false;
    }
    if(!shell.which('htlatex')){
      shell.echo(colors.red('You had to install htlatex'));
      allInstalled = false;
    }
    if(!shell.which('gulp')){
      shell.echo(colors.red('>> You had to install GULP\nRun "npm install -g gulp"'));
      allInstalled = false;
    }
    shell.exit(1);
    if(allInstalled){
      notifier.notify({
        title: 'READY',
        message: 'You have all you need to start your AWESOME book',
        sound: true,
        wait: true
      }, function (err, response) {
      });
      console.log(ms);
      shell.rm('-rf', './init.js');
    }
  }
}
