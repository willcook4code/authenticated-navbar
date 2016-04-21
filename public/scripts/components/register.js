import React from 'react';
import $ from 'jquery';
import {hashHistory} from 'react-router';
import user from '../models/user';
import Nav from './nav.js';

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
				<h1>Register</h1>
				<form onSubmit={this.register}>
					<input type="text" placeholder="first name" ref='firstName'/>
					<div className='error'>{this.state.errors.firstName ? this.state.errors.firstName.message : null}</div>
					<input type="text" placeholder="last name" ref='lastName'/>
					<input type="text" placeholder="email" ref='email'/>
					<div className='error'>{this.state.errors.email ? this.state.errors.email.message : null}</div>
					<input type="password" placeholder="password" ref='password'/>
					<div className='error'>{this.state.errors.password ? this.state.errors.password.message : null}</div>
					<button type='submit'>Register</button>
				</form>
			</div>
		);
	},
	register: function(e) {
		e.preventDefault();
		$.ajax({
			url: '/auth/register',
			type: 'POST',
			data: {
				firstName: this.refs.firstName.value,
				lastName: this.refs.lastName.value,
				email: this.refs.email.value,
				password: this.refs.password.value
			},
			headers: {
				Accept: 'application/json'
			},
			success: (registeredArg) => {
				console.log('success');
				console.log(registeredArg);
				this.state.user.set(registeredArg);
				hashHistory.push('/');
			},
			error: (errorArg) => {
				console.log('error');
				console.log(errorArg);
				this.state.user.set({errors: errorArg.responseJSON});
			}
		});
	}
});