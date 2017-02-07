import React from 'react';
import User from '../model/pojo/userPojo';
// import style from './style';

class UserAdd extends React.Component {
	constructor() {
		super();
		this.state = {
			user: null
		}
	}

	componentWillMount() {
		var user = new User();
		user.name = this.props.params.name;
		this.setState({
			user: user
		})
	}

	render() {
		return (
			<div>
				hello { this.state.user.name }
			</div>
		);
	}
}

export default UserAdd;