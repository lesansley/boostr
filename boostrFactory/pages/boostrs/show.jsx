import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Dimmer, Grid, Loader } from 'semantic-ui-react';

import web3 from '../../ethereum/web3';
import boostr from '../../ethereum/boostr';
import { Contribute, Layout, Withdraw } from '../../components';
import { Link } from '../../routes';

const uiForm = {
	padding: '15px'
};

class BoostrShow extends Component {
	state = {
		loading: true
	};

	static async getInitialProps(props) {
		const boostrInstance = await boostr(props.query.address);
		const summary = await boostrInstance.methods.getSummary().call();
		return {
			address: props.query.address,
			title: summary[0],
			description: summary[1],
			minimumContribution: summary[2],
			balance: summary[3],
			requestsCount: summary[4],
			approversCount: summary[5],
			manager: summary[6]
		};
	}

	componentDidMount() {
		this.setState({ loading: false });
	}

	cardItems() {
		return [
			{
				header: this.props.title,
				description: this.props.description
			},
			{
				header: `${web3.utils.fromWei(this.props.balance, 'Ether')} ether`,
				description: 'How much money the boostr has left to spend',
				meta: 'Boostr balance'
			},
			{
				header: `${this.props.minimumContribution} wei`,
				description: `The minimum contribution required in order to acheive 'Approver' status`,
				meta: 'Approver threshold'
			},
			{
				header: this.props.requestsCount,
				description: 'Number of requests submitted by the boostr creator',
				meta: 'Request count'
			},
			{
				header: this.props.approversCount,
				description: 'Number of Approvers on the Boostr',
				meta: 'Approver count'
			}
		];
	}

	render() {
		const contractAddress = `https://rinkeby.etherscan.io/address/${
			this.props.address
		}`;
		return (
			<React.Fragment>
				<Layout>
					<h1>Boostr details</h1>
					<Grid>
						<Grid.Row>
							<Grid.Column width={12}>
								<b>
									<a href={contractAddress} target="_blank">
										{this.props.address}
									</a>
								</b>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={12}>
								<Card.Group items={this.cardItems()} />
							</Grid.Column>
							<Grid.Column width={4}>
								<Contribute address={this.props.address} />
								<Withdraw style={uiForm} address={this.props.address} />
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Link route={`/boostrs/${this.props.address}/requests`}>
									<Button content="Requests" primary />
								</Link>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Layout>
				<Dimmer active={this.state.loading} inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
			</React.Fragment>
		);
	}
}

BoostrShow.propTypes = {
	address: PropTypes.string.isRequired,
	minimumContribution: PropTypes.string.isRequired,
	balance: PropTypes.string.isRequired,
	requestsCount: PropTypes.string.isRequired,
	approversCount: PropTypes.string.isRequired,
	manager: PropTypes.string.isRequired
};

export default BoostrShow;
