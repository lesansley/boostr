require('./env');
const config = require('./config/config');
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
		development: {
			provider: new HDWalletProvider(config.mnemonic, config.infura.endpoint),
      network_id: 4,
      gas: 4612388
      // host: "localhost",
      // port: 8545,
      // network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: new HDWalletProvider(config.mnemonic, config.infura.endpoint),
      network_id: 4,
      gas: 4612388
    }
  },
  solc: {
		optimizer: {
			enabled: true,
			runs: 200
		}
	}
};
