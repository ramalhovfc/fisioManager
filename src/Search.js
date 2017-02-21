import React from 'react';
import axios from 'axios';
import SearchTabs from './SearchTabs';

const LOOKUPS_NEEDED = {
	'doctor': true,
	'insurance': true,
	'job': true,
	'pathology': true,
	'physiotherapist': true
};

class Search extends React.Component {
	constructor() {
		super();
		this.state = {
			incidents: [],
			users: [],
			lookus: []
		};

		this.onIncidentSearch = this.onIncidentSearch.bind(this);
		this.onUserSearch = this.onUserSearch.bind(this);
	}

	componentWillMount() {
		this.getLookups(LOOKUPS_NEEDED);
	}

	getLookups(lookupsToGet) {
		axios.get(`${this.props.route.lookupsUrl}`, {params: {lookupsToGet}})
			.catch((error) => {
				this.setState({
					userAddError: (error.response && error.response.data) || 'Ocorreu um erro ao obter lookups'
				});
				return Promise.reject();
			})
			.then(res => {
				this.setState({
					lookups: res.data
				});
			});
	}

	onIncidentSearch(incidentSearch) {
		var isEmptySearch = true;
		for (var prop in incidentSearch) {
			if (!incidentSearch.hasOwnProperty(prop)) { continue; }
			if (incidentSearch[prop] !== undefined) {
				isEmptySearch = false;
				break;
			}
		}
		if (isEmptySearch) {
			if (!confirm("Uma pesquisa sem restrições pode ser demorada. Pretende continuar?")) {
				return;
			}
		}

		axios.get(`${this.props.route.incidentSearchUrl}`, {params: {incidentSearch}})
			.then(res => {
				this.setState({
					incidents: res.data
				});
			});
	}

	onUserSearch(userSearch) {
		var isEmptySearch = true;
		for (var prop in userSearch) {
			if (!userSearch.hasOwnProperty(prop)) { continue; }
			if (userSearch[prop] !== undefined) {
				isEmptySearch = false;
				break;
			}
		}
		if (isEmptySearch) {
			if (!confirm("Uma pesquisa sem restrições pode ser demorada. Pretende continuar?")) {
				return;
			}
		}

		axios.get(`${this.props.route.userSearchUrl}`, {params: {userSearch}})
			.then(res => {
				this.setState({
					users: res.data
				});
			});
	}

	render() {
		return (
			<div>
				<h4>Procurar</h4>
				<SearchTabs data={{ lookups: this.state.lookups || [], users: this.state.users, incidents: this.state.incidents}} onUserSearch={ this.onUserSearch } onIncidentSearch={ this.onIncidentSearch } />
			</div>
		);
	}
}

export default Search;