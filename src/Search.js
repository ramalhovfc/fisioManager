import React from 'react';
import axios from 'axios';
import SearchTabs from './SearchTabs';
import OpenIncidentList from './OpenIncidentList';

class Search extends React.Component {
	constructor() {
		super();
		this.state = {
			incidents: []
		};

		this.onIncidentSearch = this.onIncidentSearch.bind(this);
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

	render() {
		return (
			<div>
				<h4>Procurar</h4>
				<SearchTabs onIncidentSearch={ this.onIncidentSearch } />
				<OpenIncidentList data={ this.state.incidents } />
			</div>
		);
	}
}

export default Search;