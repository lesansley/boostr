import web3 from './web3';
import Boostr from './build/contracts/Boostr.json';

export default address => {
	return new web3.eth.Contract(Boostr.abi, address);
};
