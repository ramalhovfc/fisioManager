import React from 'react';
import axios from 'axios';

import UserForm from './UserForm';
import UserList from './UserList';
import style from './style';

class UserBrowser extends React.Component {
	constructor() {
		super();
		this.state = {users: []};

		this.handleUserSubmit = this.handleUserSubmit.bind(this);
		this.onTooBroadSearch = this.onTooBroadSearch.bind(this);
		this.handleUserClick = this.handleUserClick.bind(this);
	}

	render() {
		return (
			<div>
				<img src="fisioeste-logo.jpg" alt="Fisioeste" style={ style.mainLogo } />
				<UserForm onUserSubmit={ this.handleUserSubmit } onTooBroadSearch={ this.onTooBroadSearch } />
				<UserList data={ this.state.users } />
			</div>
		);
	}

	onTooBroadSearch() {
		this.setState({ users: [] });
	}

	handleUserSubmit(search) {
		axios.get(`${this.props.route.userFindUrl}/${search.field}/${search.constraint}`)
			.then(res => {
				this.setState({ users: res.data });
			})
	}
}

export default UserBrowser;