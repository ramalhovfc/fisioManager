import React from 'react';
import axios from 'axios';
import style from './style';

class UserDetails extends React.Component {
	constructor() {
		super();

		this.state = {
			user: null
		};
	}

	componentWillMount() {
		let userId = this.props.params.user_id;
		this.getUserDetails(userId);
	}

	getUserDetails(userId) {
		axios.get(`${this.props.route.userUrl}/${userId}`)
			.then(res => {
				this.setState({ user: res.data });
			})
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
				</div>
			);
		}

		return ( <div>Loading...</div> );
	}
}

export default UserDetails;