const BoostrFactory = artifacts.require('./BoostrFactory.sol');

module.exports = async function(deployer) {
	await deployer.deploy(BoostrFactory);
};
