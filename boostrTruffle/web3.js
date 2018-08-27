import Web3 from 'web3';
import config from './config/config';

let web3;

if (typeof window !== 'undefined' && window.web3) {
	web3 = new Web3(window.web3.currentProvider);
} else {
	const provider = new Web3.providers.HttpProvider(config.infura.endpoint);
	web3 = new Web3(provider);
}

export default web3;
