import React from 'react';
import axios from 'axios';
import style from './style';
import Incident from '../model/pojo/incidentPojo';
import IncidentList from './IncidentList';

class UserDetails extends React.Component {
	constructor() {
		super();

		this.state = {
			user: null,
			incidents: null,
			tabActiveKey: 1
		};

		this.onSelectTab = this.onSelectTab.bind(this);
		this.onIncidentSave = this.onIncidentSave.bind(this);
		this.onAddNewIncidentClick = this.onAddNewIncidentClick.bind(this);
		this.onIncidentDetailsFieldChange = this.onIncidentDetailsFieldChange.bind(this);
		this.onDeleteIncidentClick = this.onDeleteIncidentClick.bind(this);
	}

	componentWillMount() {
		let userId = this.props.params.user_id;
		let incidentId = this.props.location.query.incidentId;
		this.getUserDetails(userId, incidentId);
	}

	getUserDetails(userId, incidentId) {
		axios.get(`${this.props.route.userAndIncidentsFindUrl}/${userId}`)
			.then(res => {
				let tabToOpen = this.state.tabActiveKey;
				if (incidentId && res.data.incidents) {
					for (let i = 0; i < res.data.incidents.length; i++) {
						if (incidentId === res.data.incidents[i]["_id"]) {
							tabToOpen = i + 1;
							break;
						}
					}

					for (let i = 0; i < res.data.incidents.length; i++) {
						if (res.data.incidents[i].startDate) {
							res.data.incidents[i].startDate = res.data.incidents[i].startDate.slice(0, 10);
						}
						if (res.data.incidents[i].endDate) {
							res.data.incidents[i].endDate = res.data.incidents[i].endDate.slice(0, 10);
						}
					}
				}

				this.setState({
					user: res.data.user,
					incidents: res.data.incidents,
					tabActiveKey: tabToOpen
				});
			});
	}

	onAddNewIncidentClick() {
		var incident = new Incident();
		incident["_user"] = this.state.user["_id"];

		axios.post(`${this.props.route.incidentUrl}`, incident)
			.then(res => {
				var newIncidents = this.state.incidents.concat(res.data);
				this.setState({
					incidents: newIncidents,
					tabActiveKey: newIncidents.length
				});
			});
	}

	onIncidentSave(incident) {
		axios.put(`${this.props.route.incidentUrl}/${incident["_id"]}`, incident)
			.then(res => {
				var incidents = this.state.incidents.slice();
				for (let i = 0; i < incidents.length; i++) {
					if (incidents[i]["_id"] === res.data["_id"]) {
						incidents[i] = res.data;
						if (incidents[i].startDate) {
							incidents[i].startDate = incidents[i].startDate.slice(0, 10);
						}
						if (incidents[i].endDate) {
							incidents[i].endDate = incidents[i].endDate.slice(0, 10);
						}
						this.setState({ incidents: incidents });
						break;
					}
				}
			});
	}

	onIncidentDetailsFieldChange(incidentProperty, value, incidentId) {
		var incidents = this.state.incidents.slice();
		for (let i = 0; i < incidents.length; i++) {
			if (incidents[i]["_id"] === incidentId) {
				incidents[i][incidentProperty] = value;
				incidents[i].needsSaving = true;
				this.setState({
					incidents: incidents
				});
				break;
			}
		}
	}

	onSelectTab(key) {
		this.setState({
			tabActiveKey: key
		});
	}

	onDeleteIncidentClick(incident) {
		axios.delete(`${this.props.route.incidentUrl}/${incident["_id"]}`)
			.then(res => {
				var incidents = this.state.incidents.slice();
				for (let i = incidents.length - 1; i >= 0; i--) {
					if (incidents[i]["_id"] === incident["_id"]) {
						incidents.splice(i, 1);
						this.setState({
							incidents: incidents,
							tabActiveKey: (this.state.tabActiveKey - 1) || 1
						});
						break;
					}
				}
			});
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

					<IncidentList data={ this.state.incidents } tabActiveKey={ this.state.tabActiveKey } onSelectTab={ this.onSelectTab } onIncidentSave={ this.onIncidentSave } onIncidentDetailsFieldChange={ this.onIncidentDetailsFieldChange } onAddNewIncidentClick={ this.onAddNewIncidentClick } onDeleteIncidentClick={ this.onDeleteIncidentClick } />
				</div>
			);
		}

		return ( <div>Loading...</div> );
	}
}

export default UserDetails;