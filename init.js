var mkdirp = require('mkdirp');
var folders = [
'./.tmp/web',
'./public',
'./lib/styles'
];

folders.forEach(function(folder){
	mkdirp(folder, function (err) {
		if (err) console.error(err)
			else {
				if (folder == folders[folders.length-1]) console.log('\t\t----------\n >>> pow! you have all you need to start your awesome book \n >>> run "gulp" and start the adventure \n\t\t----------\n')
			}
		});
});