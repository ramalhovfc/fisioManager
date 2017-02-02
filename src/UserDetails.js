import React from 'react';
import axios from 'axios';
import style from './style';
import IncidentList from './IncidentList';

class UserDetails extends React.Component {
	constructor() {
		super();

		this.state = {
			user: null,
			incidents: null
		};

		this.onIncidentSave = this.onIncidentSave.bind(this);
		this.onIncidentDetailsFieldChange = this.onIncidentDetailsFieldChange.bind(this);
	}

	componentWillMount() {
		let userId = this.props.params.user_id;
		this.getUserDetails(userId);
	}

	getUserDetails(userId) {
		axios.get(`${this.props.route.userAndIncidentsFindUrl}/${userId}`)
			.then(res => {
				this.setState({
					user: res.data.user,
					incidents: res.data.incidents
				});
			});
	}

	onIncidentSave(incident) {
		axios.put(`${this.props.route.incidentUrl}/${incident["_id"]}`, incident)
			.then(res => {
				var incidents = this.state.user.incidents.slice();
				for (let i = 0; i < incidents.length; i++) {
					if (incidents[i]["_id"] === res.data["_id"]) {
						incidents[i] = res.data;
						this.setState({ incidents: incidents });
						break;
					}
				}
			});
	}

	onIncidentDetailsFieldChange(incidentProperty, value, incidentId) {
		var incidents = this.state.incidents.slice();
		for (let incident of incidents) {
			if (incident["_id"] === incidentId) {
				incident[incidentProperty] = value;
				incident.needsSaving = true;
				this.setState({
					incidents: incidents
				});
				break;
			}
		}
	}

	render() {
		if (this.state.user) {
			return (
				<div style={ style.userDetailsContainer }>
					<h2 style={ style.usernameInUserDetails }>{ this.state.user.name }</h2>
					<dl className="dl-horizontal">
						<dt>Telefone</dt>
						<dd>{ this.state.user.telephone }</dd>
						<dt>Contribuinte</dt>
						<dd>{ this.state.user.taxNumber }</dd>
						<dt>Sexo</dt>
						<dd>{ this.state.user.genre }</dd>
						<dt>Morada</dt>
						<dd>{ this.state.user.postalAddress }</dd>
						<dt>Profissão</dt>
						<dd>{ this.state.user.job }</dd>
					</dl>

					<IncidentList data={ this.state.incidents } onIncidentSave={ this.onIncidentSave } onIncidentDetailsFieldChange={ this.onIncidentDetailsFieldChange } />
				</div>
			);
		}

		return ( <div>Loading...</div> );
	}
}

export default UserDetails;