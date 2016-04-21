import React from 'react';
import {Link} from 'react-router';
import user from '../models/user.js';
import $ from 'jquery';
import {hashHistory} from 'react-router';

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
		console.log('navigation render');
		if(this.state.user.get('id')) {
			return (
				<div>
					<Link to='/'>Home</Link>
					<Link to='/dashboard'>Dashboard</Link>
					<Link to='/' onClick={this.logout}>Logout</Link>
				</div>
			);
		} else {
			return (
				<div>
					<Link to='/'>Home</Link>
					<Link to='/login'>Login</Link>
					<Link to='/register'>Register</Link>
				</div>
			);
		}
	},
	logout: function(e) {
		e.preventDefault();
		console.log('logout');
		hashHistory.push('/');
		this.state.user.clear();
		$.ajax({
			type: 'POST',
			url: '/auth/logout'
		});
	}
});