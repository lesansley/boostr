const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
const boostrPath = path.resolve(__dirname, 'contracts', 'Boostr.sol');
const source = fs.readFileSync(boostrPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.removeSync(buildPath);

for (let contract in output) {
	fs.outputJsonSync(
		path.resolve(buildPath, `${contract.replace(':', '')}.json`),
		output[contract]
	);
}
