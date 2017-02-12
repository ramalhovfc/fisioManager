import React from 'react';
import axios from 'axios';
import SearchTabs from './SearchTabs';
import IncidentSearchResults from './IncidentSearchResults';
import UserSearchResults from './UserSearchResults';

class Search extends React.Component {
	constructor() {
		super();
		this.state = {
			incidents: [],
			users: []
		};

		this.onIncidentSearch = this.onIncidentSearch.bind(this);
		this.onUserSearch = this.onUserSearch.bind(this);
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
				<SearchTabs onUserSearch={ this.onUserSearch } onIncidentSearch={ this.onIncidentSearch } />
				<IncidentSearchResults data={ this.state.incidents } />
				<UserSearchResults data={ this.state.users } />
			</div>
		);
	}
}

export default Search;