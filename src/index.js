import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import Main from './main';
import UserBrowser from './UserBrowser';
import UserDetails from './UserDetails';
import OpenIncidents from './OpenIncidents';
import Backup from './Backup';
import About from './About';

// const userUrl = 'http://localhost:3001/api/user';
const userFindUrl = 'http://localhost:3001/api/user/find';
const userAndIncidentsFindUrl = 'http://localhost:3001/api/user_incidents';
const incidentUrl = 'http://localhost:3001/api/incident';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route component={Main} >
			<Route path="/" component={UserBrowser} userFindUrl={ userFindUrl } />
			<Route path="/user/:user_id" component={ UserDetails } userAndIncidentsFindUrl={ userAndIncidentsFindUrl } incidentUrl={ incidentUrl } />
			<Route path="/openIncidents" component={ OpenIncidents } />
			<Route path="/backup" component={ Backup } />
			<Route path="/about" component={ About } />
		</Route>
	</Router>,
	document.getElementById('root')
);