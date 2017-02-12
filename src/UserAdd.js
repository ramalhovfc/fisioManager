import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';

import User from '../model/pojo/userPojo';
import UserAddForm from './UserAddForm';
import DangerError from './DangerError';

const LOOKUPS_NEEDED = {
	'doctor': true,
	'incident': true,
	'insurance': true,
	'job': true,
	'pathology': true,
	'physiotherapist': true
};

class UserAdd extends React.Component {
	constructor() {
		super();
		this.state = {
			user: null,
			userAddError: null,
			lookups: []
		};

		this.onUserSave = this.onUserSave.bind(this);
		this.onUserFieldChange = this.onUserFieldChange.bind(this);
		this.onIncidentFieldChange = this.onIncidentFieldChange.bind(this);
	}

	componentWillMount() {
		var user = new User();
		user.name = this.props.params.name;
		user.needsSaving = true;
		this.setState({
			user: user
		});
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

	onUserSave(user) {
		axios.post(`${this.props.route.userUrl}`, user)
			.catch((error) => {
				this.setState({
					userAddError: (error.response && error.response.data) || 'Ocorreu um erro'
				});
				return Promise.reject();
			})
			.then(res => {
				this.setState({
					userAddError: null
				});

				axios.post(`${this.props.route.lookupsUrl}`, user);
				browserHistory.push('/user/' + res.data["_id"]);
			});
	}

	onUserFieldChange(userProperty, value) {
		var user = Object.assign({}, this.state.user);
		user[userProperty] = value;
		this.setState({
			user: user
		});
	}

	onIncidentFieldChange(incidentProperty, value) {
		this.onUserFieldChange(incidentProperty, value);
	}

	render() {
		return (
			<div>
				<UserAddForm data={{'user': this.state.user, 'lookups': this.state.lookups }} onUserSave={ this.onUserSave } onUserFieldChange={ this.onUserFieldChange } onIncidentFieldChange={ this.onIncidentFieldChange } />
				<DangerError data={ this.state.userAddError } />
			</div>
		);
	}
}

export default UserAdd;