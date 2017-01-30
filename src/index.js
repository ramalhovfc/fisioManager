import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import UserBrowser from './UserBrowser';
import UserDetails from './UserDetails';

// const userUrl='http://localhost:3001/api/user';
// const incidentUrl='http://localhost:3001/api/incident';
// const userFindUrl='http://localhost:3001/api/user/find';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={UserBrowser} userFindUrl="http://localhost:3001/api/user/find"/>
		<Route path="/user" component={UserDetails} />
	</Router>,
	document.getElementById('root')
);