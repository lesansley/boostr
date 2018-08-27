import React, { Component } from 'react';
import { Button, Grid, Message } from 'semantic-ui-react';

import { Link } from '../routes';
import { BoostrList, Layout } from '../components';
import factory from '../factory';
import boostr from '../boostr';

const getBoostrsSummary = async addresses => {
	const boostrsSummary = [];
	for (const idx in addresses) {
		try {
			const boostrDetails = await getBoostrDetails(addresses[idx]);
			boostrsSummary.push(boostrDetails);
		} catch (err) {
			console.log('Error inside getBoostrsSummary loop', err);
		}
	}
	return boostrsSummary;
};

async function getBoostrDetails(address) {
	try {
		const boostrInstance = await boostr(address);
		const summary = await boostrInstance.methods.getSummary().call();
		return {
			address: address,
			title: summary[0],
			description: summary[1]
		};
	} catch (err) {
		console.log('Error inside foo function', err);
	}
}

class BoostrIndex extends Component {
	static async getInitialProps() {
		console.log(factory);
		const boostrsAddresses = await factory.methods.getAllBoostrs().call();
		const boostrs = await getBoostrsSummary(boostrsAddresses);
		return { boostrs };
	}

	render() {
		return (
			<Layout props={this.props}>
				<h1>Open Boostrs</h1>
				<Grid>
					<Grid.Column width={12}>
						{this.props.boostrs.length === 0 ? (
							<Message
								header="Oops"
								content="It looks like no-one has created a Boostr yet"
							/>
						) : (
							<BoostrList boostrs={this.props.boostrs} />
						)}
					</Grid.Column>
					<Grid.Column width={4}>
						<Link route="/boostrs/new">
							<Button content="Add boostr" icon="add" floated="right" primary />
						</Link>
					</Grid.Column>
				</Grid>
			</Layout>
		);
	}
}

export default BoostrIndex;
