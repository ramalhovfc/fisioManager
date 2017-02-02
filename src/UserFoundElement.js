import React from 'react';
import {Link} from 'react-router';
import style from './style';
// eslint-disable-next-line
import hover from '../node_modules/hover.css/css/hover.css';

class UserFoundElement extends React.Component {
	render() {
		return (
			<Link to={ "/user/" + this.props.data["_id"] } style={ style.userFoundElementLink }>
				<div className="hvr-fade" style={ style.userFoundElement } >
					<b>Nome:</b> { this.props.data.name }
					{(this.props.data.taxNumber)
						? <span> ({ this.props.data.taxNumber })</span>
						: null }
					{(this.props.data.telephone)
						? <span><b> Telefone: </b> { this.props.data.telephone } </span>
						: null}
				</div>
			</Link>
		);
	};
}

export default UserFoundElement;