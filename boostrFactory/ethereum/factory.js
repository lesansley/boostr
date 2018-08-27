import web3 from './web3';
import BoostrFactory from './build/BoostrFactory.json';
import factory from './factory.json';

export default new web3.eth.Contract(
	JSON.parse(BoostrFactory.interface),
	factory.address
);
