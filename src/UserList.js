import React from 'react';
import style from './style';
import UserFoundElement from './UserFoundElement'

class UserList extends React.Component {
	render() {
		let userNodes = this.props.data.map(user => {
			return (
				<UserFoundElement key={ user['_id'] } data={ user } />
			)
		});

		if (userNodes.length) {
			return (
				<div>
					<div style={ style.commentList }>
						{ userNodes }
					</div>
					<button
						type="button"
						className="btn btn-primary"
						style={ style.userAddButton } >
						Adicionar
					</button>
				</div>
			);
		} else {
			return (
				null
			);
		}
	}
}

export default UserList;