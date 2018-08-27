const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const compiledFactory = require('../ethereum/build/BoostrFactory.json');
const compiledBoostr = require('../ethereum/build/Boostr.json');

const web3 = new Web3(ganache.provider());

const minimumApproverContribution = 100;

process.on('warning', warning => {
	console.warn(warning.name); // Print the warning name
	console.warn(warning.message); // Print the warning message
	console.warn(warning.stack); // Print the stack trace
});

let accounts, factory, boostrAddress, boostr;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();
	factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({
			data: compiledFactory.bytecode
		})
		.send({
			from: accounts[0],
			gas: '1700000'
		});

	await factory.methods
		.createBoostr(
			'A new Boostr',
			'Does amazing things, you should definitley give me money',
			`${minimumApproverContribution}`
		)
		.send({
			from: accounts[0],
			gas: '1000000'
		});

	[boostrAddress] = await factory.methods.getAllBoostrs().call();
	boostr = await new web3.eth.Contract(
		JSON.parse(compiledBoostr.interface),
		boostrAddress
	);
});

describe('Boostrs', () => {
	it('deploys a factory and a boostr', async () => {
		assert.ok(factory.options.address);
		assert.ok(boostr.options.address);
	});

	it('marks caller as boostr manager', async () => {
		const manager = await boostr.methods.getManager().call();
		assert.equal(manager, accounts[0]);
	});

	it('allows people to contribute money to become supporters', async () => {
		await boostr.methods.contribute().send({
			from: accounts[1],
			value: '10'
		});
		const isSupporter = await boostr.methods.getSupporter(accounts[1]).call();
		assert(isSupporter);
	});

	it('has a minimum contribution for supporters to become approvers', async () => {
		let isApprover1 = await boostr.methods.getApprover(accounts[1]).call();
		let isApprover2 = await boostr.methods.getApprover(accounts[2]).call();
		assert(!isApprover1);
		assert(!isApprover2);

		await boostr.methods.contribute().send({
			from: accounts[1],
			value: `${minimumApproverContribution}`
		});

		await boostr.methods.contribute().send({
			from: accounts[2],
			value: `${minimumApproverContribution + 1}`
		});

		isApprover1 = await boostr.methods.getApprover(accounts[1]).call();
		isApprover2 = await boostr.methods.getApprover(accounts[2]).call();
		assert(!isApprover1);
		assert(isApprover2);
	});

	it('only allows managers to create spending requests', async () => {
		const description = 'Buy some stuff';
		const value = '100';
		const recipient = accounts[1];
		try {
			await boostr.methods.createRequest(description, value, recipient).send({
				from: accounts[1],
				gas: '1000000'
			});
		} catch (err) {
			return assert(err);
		}
		assert(false);
	});

	it('allows managers to create spending requests', async () => {
		const description = 'Buy some stuff';
		const value = '100';
		const recipient = accounts[1];
		await boostr.methods.createRequest(description, value, recipient).send({
			from: accounts[0],
			gas: '1000000'
		});
		const request = await boostr.methods.requests(0).call();
		assert.equal(description, request.description);
		assert.equal(value, request.value);
		assert.equal(recipient, request.recipient);
	});
});
