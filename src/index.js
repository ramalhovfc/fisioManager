import React from 'react';
import ReactDOM from 'react-dom';
import UserBrowser from './UserBrowser';

ReactDOM.render(
	<UserBrowser
		userUrl='http://localhost:3001/api/user'
		incidentUrl='http://localhost:3001/api/incident'
		userFindUrl='http://localhost:3001/api/user/find'
		pollInterval={5000} />,
	document.getElementById('root')
);