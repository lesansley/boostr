import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

import { Link } from '../routes';

const Header = () => {
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
};

export default Header;
