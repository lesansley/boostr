import web3 from './web3';
import Boostr from './build/Boostr.json';

export default address => {
	return new web3.eth.Contract(JSON.parse(Boostr.interface), address);
};
