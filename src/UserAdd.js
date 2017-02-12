import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';

import User from '../model/pojo/userPojo';
import UserAddForm from './UserAddForm';
import DangerError from './DangerError';

class UserAdd extends React.Component {
	constructor() {
		super();
		this.state = {
			user: null,
			userAddError: null
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
		})
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
				<UserAddForm data={ this.state.user } onUserSave={ this.onUserSave } onUserFieldChange={ this.onUserFieldChange } onIncidentFieldChange={ this.onIncidentFieldChange } />
				<DangerError data={ this.state.userAddError } />
			</div>
		);
	}
}

export default UserAdd;