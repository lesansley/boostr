import React from 'react';

import { BoostrListItem } from '.';

const BoostrList = ({ boostrs }) => {
	return (
		<div className="boostr-list">
			<BoostrListItem boostrs={boostrs} />
		</div>
	);
};

export default BoostrList;
