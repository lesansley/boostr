import web3 from './web3';
import BoostrFactory from './build/contracts/BoostrFactory.json';

export default new web3.eth.Contract(
	BoostrFactory.abi,
	BoostrFactory.networks['4'].address
);
