'use strict';

var fs = require('fs');
var archiver = require('archiver');

class BackupUtils {
	constructor(inputFolder, outputFile) {
		this.inputFolder = inputFolder;
		this.outputFile = outputFile;
	}

	doBackup() {
		winston.info('Starting backup');
		winston.info('Input:', this.inputFolder);
		winston.info('Output:', this.outputFile);

		if (fs.existsSync(this.outputFile)) {
			winston.info('Deleteing older temp file');
			fs.unlinkSync(this.outputFile);
		}

		var output = fs.createWriteStream(this.outputFile);
		var archive = archiver('zip');

		output.on('close', function () {
			winston.info(archive.pointer() + ' total bytes written');
		});

		archive.on('error', function(err){
			throw err;
		});

		archive.pipe(output);
		archive.bulk([
			{ expand: true, cwd: 'source', src: ['**'], dest: 'source'}
		]);
		archive.finalize();
	}
}

module.exports = BackupUtils;

