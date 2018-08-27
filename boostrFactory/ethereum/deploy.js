require('../env');
const path = require('path');
const fs = require('fs-extra');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const config = require('../config/config');
const compiledFactory = require('../ethereum/build/BoostrFactory.json');

const mnemonic = config.mnemonic;
const network = config.infura.endpoint;

const provider = new HDWalletProvider(mnemonic, network);
const web3 = new Web3(provider);

(async () => {
	const accounts = await web3.eth.getAccounts();
	let factory;
	console.log(`Attempting to deploy from account ${accounts[0]}`);
	try {
		factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
			.deploy({
				data: '0x' + compiledFactory.bytecode
			})
			.send({
				gas: 2000000,
				from: accounts[0]
			});
		console.log('Contract deployed to:', factory.options.address);
	} catch (err) {
		return console.log('There was a problem deploying the contract:', err);
	}

	const factoryFile = path.resolve(__dirname, 'factory.json');
	console.log(factoryFile);
	try {
		await fs.outputFile(
			factoryFile,
			JSON.stringify({ address: factory.options.address })
		);
	} catch (err) {
		console.log(
			`There was a problem generating the address file. You can do this manually by creating ${factoryFile} and saving ${
				factory.options.address
			} as the content`
		);
	}
})();
