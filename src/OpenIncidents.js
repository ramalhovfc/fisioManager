import React from 'react';
import axios from 'axios';
import OpenIncidentList from './OpenIncidentList';

class OpenIncidents extends React.Component {
	constructor() {
		super();

		this.state = {
			incidents: null
		}
	}
	componentWillMount() {
		axios.get(`${this.props.route.openIncidentsUrl}`)
			.then(res => {
				res.data.sort(function(a, b) {
					return new Date(a.startDate) - new Date(b.startDate);
				});
				this.setState({
					incidents: res.data
				});
			});
	}

	render() {
		if (!this.state.incidents) {
			return ( <div>Loading...</div> );
		} else if (this.state.incidents.length === 0)  {
			return ( <div><h4> Não existem fichas abertas </h4></div> );
		}

		return (
			<div>
				<h4>Fichas abertas</h4>
				<OpenIncidentList data={ this.state.incidents } />
			</div>
		);
	}
}

export default OpenIncidents;