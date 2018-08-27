import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';

import { Router } from '../routes';
import web3 from '../web3';
import Boostr from '../boostr';
import { CurrencyInput } from '.';

class Contribute extends Component {
	state = {
		loading: false,
		errorMessage: false,
		contribution: '',
		units: 'wei'
	};

	onSubmit = async ev => {
		ev.preventDefault();
		this.setState({ loading: true, errorMessage: '' });
		const boostr = Boostr(this.props.address);
		try {
			const accounts = await web3.eth.getAccounts();
			await boostr.methods.contribute().send({
				from: accounts[0],
				value: web3.utils.toWei(this.state.contribution, this.state.units)
			});
			this.setState({ contribution: '' });
			Router.replaceRoute(`/boostrs/${this.props.address}`);
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
		this.setState({ loading: false });
	};

	onChange = ev => {
		this.setState({ errorMessage: '' });
		this.setState({ contribution: ev.target.value });
	};

	updateUnits = ev => {
		this.setState({ units: ev.target.textContent });
	};

	render() {
		return (
			<div>
				<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Field error={!!this.state.errorMessage}>
						<label>Contribute to this boostr</label>
						<CurrencyInput
							value={this.state.contribution}
							onChange={this.onChange}
							units={this.state.units}
							onSelect={this.updateUnits}
						/>
					</Form.Field>
					<Message
						error
						header="There was a problem processing your contribution"
						content={this.state.errorMessage}
					/>
					<Form.Button disabled={this.state.loading} primary>
						Contribute
					</Form.Button>
				</Form>
			</div>
		);
	}
}

Contribute.propTypes = {
	address: PropTypes.string.isRequired
};
export default Contribute;
