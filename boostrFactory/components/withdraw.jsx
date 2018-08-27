import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';

import { Router } from '../routes';
import web3 from '../ethereum/web3';
import Boostr from '../ethereum/boostr';
import { CurrencyInput } from '.';

class Withdraw extends Component {
	state = {
		loading: false,
		errorMessage: false,
		withdrawal: '',
		units: 'wei'
	};

	onSubmit = async ev => {
		ev.preventDefault();
		this.setState({ loading: true, errorMessage: '' });
		const boostr = Boostr(this.props.address);
		try {
			const accounts = await web3.eth.getAccounts();
			await boostr.methods.supplierWithdraw(this.state).send({
				from: accounts[0],
				value: web3.utils.toWei(this.state.withdrawal, this.state.units)
			});
			this.setState({ withdrawal: '' });
			Router.replaceRoute(`/boostrs/${this.props.address}`);
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
		this.setState({ loading: false });
	};

	onChange = ev => {
		this.setState({ errorMessage: '' });
		this.setState({ withdrawal: ev.target.value });
	};

	updateUnits = ev => {
		this.setState({ units: ev.target.textContent });
	};

	render() {
		return (
			<div>
				<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Field error={!!this.state.errorMessage}>
						<label>Withdraw from this boostr</label>
						<CurrencyInput
							value={this.state.withdrawal}
							onChange={this.onChange}
							units={this.state.units}
							onSelect={this.updateUnits}
						/>
					</Form.Field>
					<Message
						error
						header="There was a problem processing your withdrawal"
						content={this.state.errorMessage}
					/>
					<Form.Button disabled={this.state.loading} primary>
						Withdraw
					</Form.Button>
				</Form>
			</div>
		);
	}
}

Withdraw.propTypes = {
	address: PropTypes.string.isRequired
};

export default Withdraw;
