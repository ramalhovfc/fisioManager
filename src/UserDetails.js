import React from 'react';

import style from './style';

class UserDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			user: null
		}
	}

	render() {
		return (
			'User details'
		);
	}
}

export default UserDetails;