import React, { Component } from 'react';
import { Button, Dimmer, Form, Loader, Message } from 'semantic-ui-react';
import { Router } from '../../routes';

import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { CurrencyInput, Layout } from '../../components';

class newBoostr extends Component {
	state = {
		title: '',
		description: '',
		minimumContribution: '',
		errorMessage: '',
		loading: false,
		units: 'wei'
	};

	onSubmit = async ev => {
		ev.preventDefault();
		const { title, description, units } = this.state;
		const minimumContribution = web3.utils.toWei(
			this.state.minimumContribution,
			units
		);
		this.setState({ loading: true, errorMessage: '' });
		try {
			const accounts = await web3.eth.getAccounts();
			await factory.methods
				.createBoostr(title, description, minimumContribution)
				.send({
					from: accounts[0]
				});
			Router.pushRoute('/');
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
		this.setState({ loading: false });
	};

	onChange = ev => {
		this.setState({
			[ev.target.name]: ev.target.value,
			errorMessage: ''
		});
	};

	updateUnits = ev => {
		this.setState({ units: ev.target.textContent });
	};

	render() {
		return (
			<React.Fragment>
				<Layout>
					<h1>Create a boostr</h1>
					<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
						<Form.Input
							fluid
							label="Boostr title"
							name="title"
							placeholder="e.g. Anti-gravity device"
							onChange={this.onChange}
							value={this.state.title}
						/>
						<Form.TextArea
							label="Boostr description"
							placeholder="Provide a description of your Boostr project"
							name="description"
							onChange={this.onChange}
							value={this.state.description}
						/>
						<Form.Field>
							<label>
								{`Minimum contribution required in order for a patron to achieve 'Approver' status`}
							</label>
							<CurrencyInput
								name="minimumContribution"
								value={this.state.minimumContribution}
								onChange={this.onChange}
								units={this.state.units}
								onSelect={this.updateUnits}
							/>
						</Form.Field>
						<Message
							error
							header="There was a problem creating your boostr"
							content={this.state.errorMessage}
						/>
						<Button type="submit" disabled={!!this.state.errorMessage} primary>
							Create
						</Button>
					</Form>
				</Layout>
				<Dimmer active={this.state.loading} inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
			</React.Fragment>
		);
	}
}

export default newBoostr;
