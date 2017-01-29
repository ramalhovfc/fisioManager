import React from 'react';
import style from './style';
// eslint-disable-next-line
import hover from '../node_modules/hover.css/css/hover.css';

class UserFoundElement extends React.Component {
	constructor() {
		super();
		this.onClick = this.onClick.bind(this);
	}

	render() {
		return (
			<div className="hvr-fade" style={ style.comment } onClick={ this.onClick }>
				<b>Nome:</b> { this.props.data.name } ({ this.props.data.taxNumber })
			</div>
		);
	};

	onClick() {
		this.props.onClick(this.props.data["_id"]);
	}
}

export default UserFoundElement;