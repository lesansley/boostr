import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';

import Boostr from '../ethereum/boostr';
import web3 from '../ethereum/web3';
import { Link, Router } from '../routes';

class Header extends Component {
	state = { loading: false };

	supplierClick = async () => {
		const accounts = await web3.eth.getAccounts();
		return accounts[0];
	};

	render() {
		return (
			<Menu>
				<Link route="/">
					<a className="item">Boostr</a>
				</Link>
				<Menu.Menu position="right">
					<Link route="/">
						<Button content="Boostrs" primary />
					</Link>
					<Link route="/boostrs/new">
						<Button icon="add" primary />
					</Link>
				</Menu.Menu>
			</Menu>
		);
	}
}

export default Header;
