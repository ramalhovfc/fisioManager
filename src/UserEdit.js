import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';

import UserAddForm from './UserAddForm';
import DangerError from './DangerError';

const LOOKUPS_NEEDED = {
	'job': true
};

class UserEdit extends React.Component {
	constructor() {
		super();
		this.state = {
			user: null,
			error: null,
			lookups: {}
		};

		this.onUserSave = this.onUserSave.bind(this);
		this.onUserDelete = this.onUserDelete.bind(this);
		this.onUserFieldChange = this.onUserFieldChange.bind(this);
	}

	componentWillMount() {
		let userId = this.props.params.user_id;

		axios.all([this.getLookups(LOOKUPS_NEEDED), this.getUserDetails(userId)])
			.catch((error) => {
				this.setState({
					error: error.response + ': ' + error.response.data
				});
				return Promise.reject();
			})
			.then(axios.spread((lookups, userDetails) => {
				this.setState({
					lookups: lookups.data,
					user: userDetails.data,
					error: ''
				});
			}));
	}

	getUserDetails(userId) {
		var userSearch = {
			_id: userId
		};
		return axios.get(`${this.props.route.userSearchUrl}`, {params: {userSearch}});
	}

	getLookups(lookupsToGet) {
		return axios.get(`${this.props.route.lookupsUrl}`, {params: {lookupsToGet}});
	}

	onUserSave(user) {
		axios.put(`${this.props.route.userUrl}/${user["_id"]}`, user)
			.catch((error) => {
				this.setState({
					error: (error.response && error.response.data) || 'Ocorreu um erro'
				});
				return Promise.reject();
			})
			.then(res => {
				this.setState({
					error: null
				});

				axios.post(`${this.props.route.lookupsUrl}`, user);
				browserHistory.push('/user/' + res.data["_id"]);
			});
	}

	onUserFieldChange(userProperty, value) {
		var user = Object.assign({}, this.state.user);
		user[userProperty] = value;
		user.needsSaving = true;
		this.setState({
			user: user
		});
	}

	onUserDelete(userId) {
		axios.delete(`${this.props.route.userUrl}/${userId}`)
			.catch((error) => {
				this.setState({
					error: (error.response && error.response.data) || 'Ocorreu um erro'
				});
				return Promise.reject();
			})
			.then(res => {
				browserHistory.push('/');
			});
	}

	render() {
		return (
			<div>
				<UserAddForm data={{'user': this.state.user, 'lookups': this.state.lookups }} onUserSave={ this.onUserSave } onUserFieldChange={ this.onUserFieldChange } onUserDelete={ this.onUserDelete } hideIncident={ true } canDelete={ true } />
				<DangerError data={ this.state.error } />
			</div>
		);
	}
}

export default UserEdit;