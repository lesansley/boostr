import React from 'react';
import { Card } from 'semantic-ui-react';

import { Link } from '../routes';

const BoostrListItem = ({ boostrs }) => {
	const items = boostrs.map(boostr => {
		return {
			header: boostr.title,
			meta: (
				<Link route={`https://rinkeby.etherscan.io/address/${boostr.address}`}>
					<a>{boostr.address}</a>
				</Link>
			),
			description: boostr.description,
			extra: (
				<Link route={`/boostrs/${boostr.address}`}>
					<a>View boostr</a>
				</Link>
			),
			fluid: true
		};
	});

	return <Card.Group items={items} />;
};

export default BoostrListItem;
