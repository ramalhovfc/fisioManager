import React from 'react';
import axios from 'axios';
import SearchTabs from './SearchTabs';

class Search extends React.Component {
	onIncidentSearch(incidentSearch) {
		console.log(incidentSearch);
	}

	render() {
		return (
			<div>
				<h4>Procurar</h4>
				<SearchTabs onIncidentSearch={ this.onIncidentSearch } />
			</div>
		);
	}
}

export default Search;