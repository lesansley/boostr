import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dimmer, Form, Loader, Message } from 'semantic-ui-react';

import { Link, Router } from '../../../routes';
import Boostr from '../../../ethereum/boostr';
import web3 from '../../../ethereum/web3';
import { CurrencyInput, Layout } from '../../../components';

class RequestsNew extends Component {
	state = {
		errorMessage: '',
		units: 'wei',
		value: '',
		recipient: '',
		description: '',
		loading: false
	};

	static async getInitialProps(props) {
		return {
			address: props.query.address
		};
	}

	onSubmit = async ev => {
		ev.preventDefault();
		const { description, recipient } = this.state;
		const value = web3.utils.toWei(this.state.value, this.state.units);
		this.setState({ loading: true });
		try {
			const accounts = await web3.eth.getAccounts();
			const boostr = await Boostr(this.props.address);
			await boostr.methods.createRequest(description, value, recipient).send({
				from: accounts[0],
				gas: '1000000'
			});
			console.log('Done');
			Router.replaceRoute(`/boostrs/${this.props.address}/requests`);
			this.setState({ loading: false });
		} catch (err) {
			this.setState({ errorMessage: err });
			this.setState({ loading: false });
		}
	};

	onChange = ev => {
		this.setState({ errorMessage: '' });
		this.setState({ [ev.target.name]: ev.target.value });
	};

	updateUnits = ev => {
		this.setState({ errorMessage: '' });
		this.setState({ units: ev.target.textContent });
	};

	render() {
		return (
			<React.Fragment>
				<Layout>
					<Link route={`/boostrs/${this.props.address}/requests`}>
						<Button>Back</Button>
					</Link>
					<h1>Create Request</h1>
					<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
						<Form.TextArea
							error={!!this.state.errorMessage}
							label="Description"
							name="description"
							value={this.state.description}
							placeholder="Purpose of the request"
							onChange={this.onChange}
						/>
						<Form.Field error={!!this.state.errorMessage}>
							<label>Amount</label>
							<CurrencyInput
								name="value"
								value={this.state.value}
								onSelect={this.updateUnits}
								units={this.state.units}
								onChange={this.onChange}
							/>
						</Form.Field>
						<Form.Input
							error={!!this.state.errorMessage}
							label="Recipient"
							name="recipient"
							value={this.state.recipient}
							placeholder="# address of recipient of the funds"
							onChange={this.onChange}
						/>
						<Message
							error
							header="There was a problem creating your request"
							content={this.state.errorMessage}
						/>
						<Form.Button content="Create" primary />
					</Form>
				</Layout>
				<Dimmer active={this.state.loading} inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
			</React.Fragment>
		);
	}
}

RequestsNew.propTypes = {
	address: PropTypes.string.isRequired
};

export default RequestsNew;
