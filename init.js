var mkdirp = require('mkdirp'),
notifier = require('node-notifier'),
colors = require('colors'),
Box = require("cli-box");

var folders = [
  './.tmp/web',
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
    colors.rainbow('>>>')+colors.blue(' run "gulp" and start the adventure\n\n')+colors.yellow("Remember to check http://jorgechato.com for more fun proyects"),
  stretch: true,
  autoEOL: true,
  vAlign: "center",
  hAlign: "left"
});

folders.forEach(function(folder){
  mkdirp(folder, function (err) {
    if (err) console.error(err)
      else {
        if (folder == folders[folders.length-1]){
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
  });
});
