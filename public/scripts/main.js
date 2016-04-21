console.log('js working');
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import Home from './components/home.js';
import Login from './components/login.js';
import Register from './components/register.js';
import Dashboard from './components/dashboard.js';

const router = (
	<Router history={hashHistory}>
		<Route path='/' component={Home}/>
		<Route path='/login' component={Login}/>
		<Route path='/register' component={Register}/>
		<Route path='/dashboard' component={Dashboard}/>
	</Router>
	);

ReactDOM.render(router, document.querySelector('main'));