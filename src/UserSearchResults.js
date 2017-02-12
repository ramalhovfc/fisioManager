import React from 'react';
import style from './style';
import UserFoundElement from './UserFoundElement'

class UserSearchResults extends React.Component {
	render() {
		let userNodes = this.props.data.map(user => {
			return (
				<UserFoundElement key={ user['_id'] } data={ user } />
			)
		});

		if (userNodes.length) {
			return (
				<div style={ style.commentList }>
					{ userNodes }
				</div>
			);
		} else {
			return (
				null
			);
		}
	}
}

export default UserSearchResults;