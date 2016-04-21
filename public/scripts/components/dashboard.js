import React from 'react';
import Nav from './nav.js';
import user from '../models/user.js';

export default React.createClass({
	getInitialState: function() {
		return {
			user: user
		};
	},
	componentDidMount: function() {
		this.state.user.on('change', () => {
			console.log('the user was changed');
			this.setState({user: user});
		});
	},
	render: function() {
		if(this.state.user.get('id')) {
			return (
				<div>
					<Nav />
					<h1>Dashboard</h1>
				</div>
			);
		} else {
			return (
				<div>
					<Nav />
					<h1>Permission Denied</h1>
				</div>
			);
		}
	}
});