// ADD APP CONFIG SETTINGS HERE
const config = {
	env: process.env.NODE_ENV,
	port: process.env.PORT,
	mnemonic: process.env.MNEMONIC,
	infura: {
		endpoint: process.env.INFURA_RINKEBY_ENDPOINT
	}
};

module.exports = config;
