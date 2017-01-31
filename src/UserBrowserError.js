import React from 'react';
import style from './style';
class UserBrowserError extends React.Component {
	render() {
		if (this.props.data) {
			return (
				<p className="bg-danger" style={style.userBrowserError}>{this.props.data}</p>
			);
		} else {
			return null;
		}
	}
}

export default UserBrowserError;

