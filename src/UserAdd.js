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
					userAddError: error.response.data
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

	onUserFieldChange(userProperty, value, userId) {
		var user = Object.assign({}, this.state.user);
		user[userProperty] = value;
		this.setState({
			user: user
		});
	}

	render() {
		return (
			<div>
				<h3>Utente</h3>
				<UserAddForm data={ this.state.user } onUserSave={ this.onUserSave } onUserFieldChange={ this.onUserFieldChange } />
				<DangerError data={ this.state.userAddError } />
			</div>
		);
	}
}

export default UserAdd;