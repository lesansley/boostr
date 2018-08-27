import React, { Components } from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'semantic-ui-react';

var onApprove = ev => {
	console.log(ev.props.index);
};

const RequestRow = props => {
	const {
		description,
		value,
		recipient,
		approvalCount,
		complete
	} = props.request;
	const { Row, Cell } = Table;
	return (
		<Row disabled={complete}>
			<Cell>{props.id}</Cell>
			<Cell>{description}</Cell>
			<Cell>{value}</Cell>
			<Cell>{recipient}</Cell>
			<Cell>{`${approvalCount}/${props.approversCount}`}</Cell>
			<Cell>
				{complete ? null : (
					<Button
						index={props.id}
						onClick={() => props.onApprove(props.id)}
						color="green"
						disabled={approvalCount / props.approversCount === 1}
						basic
					>
						Approve
					</Button>
				)}
			</Cell>
			<Cell>
				{complete ? null : (
					<Button
						index={props.id}
						onClick={() => props.onFinalise(props.id)}
						color={approvalCount / props.approversCount < 50 ? 'red' : 'green'}
						basic
						disabled={approvalCount / props.approversCount < 0.5 || complete}
					>
						Finalise
					</Button>
				)}
			</Cell>
		</Row>
	);
};

RequestRow.propTypes = {
	address: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	onApprove: PropTypes.func.isRequired,
	onFinalise: PropTypes.func.isRequired,
	approversCount: PropTypes.string.isRequired,
	request: PropTypes.shape({
		description: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		recipient: PropTypes.string.isRequired,
		approvalCount: PropTypes.string.isRequired,
		complete: PropTypes.bool.isRequired
	})
};

export default RequestRow;
