import React from 'react';
import axios from 'axios';

import UserSearchForm from './UserSearchForm';
import UserList from './UserList';
import DangerError from './DangerError';
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

	componentWillMount() {
		axios.get(`${this.props.route.healthUrl}`)
			.catch((error) => {
				this.setState({
					users: [],
					userBrowseError: 'O servidor não está a ser executado. Prima Ctrl+Alt+F e volte a abrir a página.'
				});
				return Promise.reject();
			})
			.then(res => {
				if (!res.data.connected) {
					this.setState({
						userBrowseError: 'O servidor não consegue ligar à base de dados. Contacte o suporte técnico.'
					});
				} else {
					this.setState({
						userBrowseError: null
					});
				}
			}, () => { /* do nothing */ });
	}

	render() {
		return (
			<div>
				<img src="fisioeste-logo.jpg" alt="Fisioeste" style={ style.mainLogo } />
				<UserSearchForm onUserSubmit={ this.handleUserSubmit } onTooBroadSearch={ this.onTooBroadSearch } />
				<UserList data={ this.state.users } />
				<DangerError data={ this.state.userBrowseError } />
			</div>
		);
	}

	onTooBroadSearch() {
		this.setState({
			users: [],
			userBrowseError: null
		});
	}

	handleUserSubmit(userSearch) {
		axios.get(`${this.props.route.userSearchUrl}`, {params: {userSearch}})
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