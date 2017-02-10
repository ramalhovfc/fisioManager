import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import Main from './main';
import UserBrowser from './UserBrowser';
import UserDetails from './UserDetails';
import Search from './Search';
import OpenIncidents from './OpenIncidents';
import UserAdd from './UserAdd';
import About from './About';

const userUrl = 'http://localhost:3001/api/user';
const userFindUrl = 'http://localhost:3001/api/user/find';
const userAndIncidentsFindUrl = 'http://localhost:3001/api/user_incidents';
const incidentUrl = 'http://localhost:3001/api/incident';
const incidentSearchUrl = 'http://localhost:3001/api/incident/search';
const openIncidentsUrl = 'http://localhost:3001/api/incident/open';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route component={Main} >
			<Route path="/" component={UserBrowser} userFindUrl={ userFindUrl } />
			<Route path="/user/:user_id" component={ UserDetails } userAndIncidentsFindUrl={ userAndIncidentsFindUrl } incidentUrl={ incidentUrl } />
			<Route path="/user/add/:name" component={ UserAdd } userUrl={ userUrl }  />
			<Route path="/search" component={ Search } incidentSearchUrl={ incidentSearchUrl } />
			<Route path="/openIncidents" component={ OpenIncidents } openIncidentsUrl={ openIncidentsUrl } />
			<Route path="/about" component={ About } />
		</Route>
	</Router>,
	document.getElementById('root')
);