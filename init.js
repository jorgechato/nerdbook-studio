var mkdirp = require('mkdirp'),
notifier = require('node-notifier'),
colors = require('colors'),
Box = require("cli-box"),
shell = require('shelljs');
inquirer = require("inquirer");

var folders = [
  './.tmp/web',
  './.tmp/book',
  './public',
  './lib/styles'
];

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

inquirer.prompt([{
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
    }, function( answers ) {
      return output();
    });
  }else{
    return output();
  }
});

var output = function(){
  var allInstalled = true;
  if(folderCreated){
    if(!shell.which('latex')){
      shell.echo(colors.red('You had to install LATEX'));
      allInstalled = false;
    }
    if(!shell.which('htlatex')){
      shell.echo(colors.red('You had to install htlatex'));
      allInstalled = false;
    }
    if(allInstalled){
      notifier.notify({
        title: 'READY',
        message: 'You have all you need to start your AWESOME book',
        sound: true,
        wait: true
      }, function (err, response) {
      });
      console.log(ms);
    }
  }
}
