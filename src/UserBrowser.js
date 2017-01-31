import React from 'react';
import axios from 'axios';

import UserForm from './UserForm';
import UserList from './UserList';
import UserBrowserError from './UserBrowserError';
import style from './style';

class UserBrowser extends React.Component {
	constructor() {
		super();
		this.state = {
			users: [],
			userBrowseError: null
		};

		this.handleUserSubmit = this.handleUserSubmit.bind(this);
		this.onTooBroadSearch = this.onTooBroadSearch.bind(this);
	}

	render() {
		return (
			<div>
				<img src="fisioeste-logo.jpg" alt="Fisioeste" style={ style.mainLogo } />
				<UserForm onUserSubmit={ this.handleUserSubmit } onTooBroadSearch={ this.onTooBroadSearch } />
				<UserList data={ this.state.users } />
				<UserBrowserError data={ this.state.userBrowseError } />
			</div>
		);
	}

	onTooBroadSearch() {
		this.setState({
			users: [],
			userBrowseError: null
		});
	}

	handleUserSubmit(search) {
		axios.get(`${this.props.route.userFindUrl}/${search.field}/${search.constraint}`)
			.catch((error) => {
				this.setState({
					users: [],
					userBrowseError: error.response.data
				});
				return Promise.reject();
			})
			.then(res => {
				this.setState({
					users: res.data,
					userBrowseError: null
				});
			});
	}
}

export default UserBrowser;