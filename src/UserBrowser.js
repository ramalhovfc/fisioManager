import React from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import UserList from './UserList';

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
				<UserForm onUserSubmit={ this.handleUserSubmit } onTooBroadSearch={ this.onTooBroadSearch } />
				<UserList data={ this.state.users } onUserClick={ this.handleUserClick }/>
			</div>
		);
	}

	onTooBroadSearch() {
		this.setState({ users: [] });
	}

	handleUserClick(e,f) {
		console.log('clicked',arguments)
	}

	handleUserSubmit(search) {
		axios.get(`${this.props.userFindUrl}/${search.field}/${search.constraint}`)
			.then(res => {
				this.setState({ users: res.data });
			})
	}
}

export default UserBrowser;