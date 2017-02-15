import React from 'react';
import axios from 'axios';
import style from './style';
import Incident from '../model/pojo/incidentPojo';
import IncidentList from './IncidentList';

const LOOKUPS_NEEDED = {
	'doctor': true,
	'insurance': true,
	'pathology': true,
	'physiotherapist': true
};

class UserDetails extends React.Component {
	constructor() {
		super();

		this.state = {
			user: null,
			incidents: null,
			tabActiveKey: 1,
			lookups: []
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

		axios.all([this.getLookups(LOOKUPS_NEEDED), this.getUserDetails(userId, incidentId)])
			.catch((error) => {
				// this.setState({
				// 	userAddError: (error.response && error.response.data) || 'Ocorreu um erro ao obter lookups'
				// });
				return Promise.reject();
			})
			.then(axios.spread((lookups, userDetails) => {
				let tabToOpen = this.state.tabActiveKey;
				if (incidentId && userDetails.data.incidents) {
					for (let i = 0; i < userDetails.data.incidents.length; i++) {
						if (incidentId === userDetails.data.incidents[i]["_id"]) {
							tabToOpen = i + 1;
							break;
						}
					}
				}

				for (let i = 0; i < userDetails.data.incidents.length; i++) {
					if (userDetails.data.incidents[i].startDate) {
						userDetails.data.incidents[i].startDate = userDetails.data.incidents[i].startDate.slice(0, 10);
					}
					if (userDetails.data.incidents[i].endDate) {
						userDetails.data.incidents[i].endDate = userDetails.data.incidents[i].endDate.slice(0, 10);
					}
				}

				this.setState({
					lookups: lookups.data,
					user: userDetails.data.user,
					incidents: userDetails.data.incidents,
					tabActiveKey: tabToOpen
				});
			}));
	}

	getLookups(lookupsToGet) {
		return axios.get(`${this.props.route.lookupsUrl}`, {params: {lookupsToGet}});
	}

	getUserDetails(userId, incidentId) {
		return axios.get(`${this.props.route.userAndIncidentsFindUrl}/${userId}`);
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

				axios.post(`${this.props.route.lookupsUrl}`, incident);
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

					<IncidentList data={{incidents: this.state.incidents, lookups: this.state.lookups }} tabActiveKey={ this.state.tabActiveKey } onSelectTab={ this.onSelectTab } onIncidentSave={ this.onIncidentSave } onIncidentDetailsFieldChange={ this.onIncidentDetailsFieldChange } onAddNewIncidentClick={ this.onAddNewIncidentClick } onDeleteIncidentClick={ this.onDeleteIncidentClick } />
				</div>
			);
		}

		return ( <div>Loading...</div> );
	}
}

export default UserDetails;