var mkdirp = require('mkdirp');

mkdirp('./.tmp/web', function (err) {
	if (err) console.error(err)
		else{
			mkdirp('./public', function (err) {
				if (err) console.error(err)
					else console.log('\t\t----------\n >>> pow! you have all you need to start your awesome book \n >>> run "gulp" and start the adventure \n\t\t----------\n')
				});
		}
	});