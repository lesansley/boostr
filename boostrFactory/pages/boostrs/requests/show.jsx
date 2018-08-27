import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dimmer, Grid, Loader, Table } from 'semantic-ui-react';

import Boostr from '../../../ethereum/boostr';
import web3 from '../../../ethereum/web3';
import { Layout, RequestRow } from '../../../components';
import { Link, Router } from '../../../routes';

class RequestsShow extends Component {
	state = { loading: false };

	static async getInitialProps(props) {
		const { address } = props.query;
		const boostr = await Boostr(address);
		const approversCount = await boostr.methods.approversCount().call();
		const requestCount = await boostr.methods.getRequestsCount().call();
		const requests = await Promise.all(
			Array(parseInt(requestCount))
				.fill()
				.map((element, index) => {
					return boostr.methods.requests(index).call();
				})
		);

		return {
			boostr,
			address,
			approversCount,
			requestCount,
			requests
		};
	}

	renderTable() {
		const { Header, Row, HeaderCell, Body } = Table;
		return (
			<div>
				<Table celled structured>
					<Header>
						<Row>
							<HeaderCell>ID</HeaderCell>
							<HeaderCell>Description</HeaderCell>
							<HeaderCell>Amount (wei)</HeaderCell>
							<HeaderCell>Recipient</HeaderCell>
							<HeaderCell>Approval Count</HeaderCell>
							<HeaderCell>Approve</HeaderCell>
							<HeaderCell>Finalise</HeaderCell>
						</Row>
					</Header>
					<Body>{this.renderRow()}</Body>
				</Table>
				<p>{`${this.props.requestCount} results found`}</p>
			</div>
		);
	}

	renderRow() {
		return this.props.requests.map((request, index) => {
			return (
				<RequestRow
					id={index}
					key={index}
					request={request}
					address={this.props.address}
					approversCount={this.props.approversCount}
					onApprove={this.onApprove}
					onFinalise={this.onFinalise}
				/>
			);
		});
	}

	onApprove = async idx => {
		const boostr = await Boostr(this.props.address);
		const accounts = await web3.eth.getAccounts();
		this.setState({ loading: true });
		try {
			await boostr.methods.approveRequest(idx).send({
				from: accounts[0]
			});
			Router.replaceRoute(`/boostrs/${this.props.address}/requests`);
		} catch (err) {
			console.log(err);
			this.setState({ loading: false });
		}
	};

	onFinalise = async idx => {
		const boostr = await Boostr(this.props.address);
		const accounts = await web3.eth.getAccounts();
		this.setState({ loading: true });
		try {
			await boostr.methods.finalizeRequest(idx).send({
				from: accounts[0]
			});
			Router.replaceRoute(`/boostrs/${this.props.address}/requests`);
		} catch (err) {
			this.setState({ loading: false });
			console.log(err);
		}
	};

	render() {
		let content = <div>No requests have been created for this boostr</div>;
		if (this.props.requestCount !== '0') {
			content = this.renderTable();
		}
		return (
			<React.Fragment>
				<Layout>
					<Grid>
						<Grid.Row>
							<Grid.Column width={12}>
								<h1>Requests</h1>
							</Grid.Column>
							<Grid.Column width={4}>
								<Link route={`/boostrs/${this.props.address}/requests/new`}>
									<Button content="New request" floated="right" primary />
								</Link>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>{content}</Grid.Row>
					</Grid>
				</Layout>
				<Dimmer active={this.state.loading} inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
			</React.Fragment>
		);
	}
}

RequestsShow.propTypes = {
	address: PropTypes.string.isRequired,
	requestCount: PropTypes.string.isRequired,
	requests: PropTypes.array.isRequired
};

export default RequestsShow;
