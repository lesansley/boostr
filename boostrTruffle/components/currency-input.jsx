import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Input } from 'semantic-ui-react';

const getUnits = () => {
	return [
		{ key: 'wei', text: 'wei', value: 'wei' },
		{ key: 'ether', text: 'ether', value: 'ether' }
	];
};

const CurrencyInput = props => {
	return (
		<Input
			label={
				<Dropdown
					defaultValue={props.units}
					onChange={props.onSelect}
					options={getUnits()}
				/>
			}
			name={props.name || 'currencyInput'}
			labelPosition="right"
			placeholder="e.g. 100"
			value={props.value}
			onChange={props.onChange}
		/>
	);
};

CurrencyInput.propTypes = {
	units: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	name: PropTypes.string
};

export default CurrencyInput;
