import React from 'react';
import style from './style';
import UserFoundElement from './UserFoundElement'
// eslint-disable-next-line
import hover from '../node_modules/hover.css/css/hover.css';

class UserList extends React.Component {
	render() {
		let userNodes = this.props.data.map(user => {
			return (
				<UserFoundElement key={ user['_id'] } data={ user } onClick={ this.props.onUserClick }/>
			)
		});

		if (userNodes.length) {
			return (
				<div>
					<div style={ style.commentList }>
						{ userNodes }
					</div>
					<div className="hvr-grow">
						<input
							type='submit'
							style={ style.commentFormPost }
							value='Adicionar'/>
					</div>
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