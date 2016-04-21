import React from 'react';
import Nav from './nav.js';
import $ from 'jquery';
import {hashHistory} from 'react-router';
import user from '../models/user';


export default React.createClass({
	getInitialState: function() {
		return {
			errors: {},
			user: user
		};
	},
	render: function() {
		return (
			<div>
				<Nav />
				<h1>Login</h1>
				<form onSubmit={this.login}>
					<input type="text" placeholder="email" ref='email'/>
					<div className='error'>{this.state.errors.email ? this.state.errors.email.message : null}</div>
					<input type="password" placeholder="password" ref='password'/>
					<div className='error'>{this.state.errors.password ? this.state.errors.password.message : null}</div>
					<button type='submit'>Login</button>
				</form>
			</div>
		);
	},
	login: function(e) {
		e.preventDefault();
		$.ajax({
			url: '/auth/login',
			type: 'POST',
			data: {
				email: this.refs.email.value,
				password: this.refs.password.value
			},
			headers: {
				Accept: 'application/json'
			},
			success: (loggedArg) => {
				console.log('success');
				console.log(loggedArg);
				this.state.user.set(loggedArg);
				hashHistory.push('/dashboard');
			},
			error: (errorArg) => {
				console.log('error');
				console.log(errorArg);
				this.state.user.set({errors: errorArg.responseJSON});
			}
		});
	}
});