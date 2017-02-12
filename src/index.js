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
const userSearchUrl = 'http://localhost:3001/api/user/search';
const userAndIncidentsFindUrl = 'http://localhost:3001/api/user_incidents';
const incidentUrl = 'http://localhost:3001/api/incident';
const incidentSearchUrl = 'http://localhost:3001/api/incident/search';
const openIncidentsUrl = 'http://localhost:3001/api/incident/open';
const lookupsUrl = 'http://localhost:3001/api/lookups';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route component={Main} >
			<Route path="/" component={UserBrowser} userSearchUrl={ userSearchUrl } />
			<Route path="/user/:user_id" component={ UserDetails } userAndIncidentsFindUrl={ userAndIncidentsFindUrl } incidentUrl={ incidentUrl } />
			<Route path="/user/add/:name" component={ UserAdd } userUrl={ userUrl } lookupsUrl={ lookupsUrl } />
			<Route path="/search" component={ Search } userSearchUrl={ userSearchUrl } incidentSearchUrl={ incidentSearchUrl } />
			<Route path="/openIncidents" component={ OpenIncidents } openIncidentsUrl={ openIncidentsUrl } />
			<Route path="/about" component={ About } />
		</Route>
	</Router>,
	document.getElementById('root')
);