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
			<div className="hvr-fade" style={ style.comment } >
				<b>Nome:</b> { this.props.data.name } ({ this.props.data.taxNumber })
			</div>
		);
	};

}

export default UserFoundElement;