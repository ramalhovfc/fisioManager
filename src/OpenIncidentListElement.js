import React from 'react';
import {Link} from 'react-router';
import style from './style';
// eslint-disable-next-line
import hover from '../node_modules/hover.css/css/hover.css';

class OpenIncidentListElement extends React.Component {
	render() {
		var linkTo = { pathname: '/user/' + this.props.data["_user"]["_id"].toString(), query: { incidentId: this.props.data["_id"] }};
		return (
			<Link to={ linkTo } style={ style.userFoundElementLink }>
				<div className="hvr-fade" style={ style.userFoundElement } >
					<b>Nome:</b> { this.props.data._user.name }
					{(this.props.data.pathology)
						? <span><b> Patologia: </b> { this.props.data.pathology } </span>
						: null}
					{(this.props.data.physiotherapist)
						? <span><b> Fisioterapeuta: </b>{ this.props.data.physiotherapist } </span>
						: null}
					{(this.props.data.startDate)
						? <span style={ style.incidentListElementStartDate }><b> Data início: </b>{ this.props.data.startDate.slice(0, 10) }</span>
						: null }
				</div>
			</Link>
		);
	};
}

export default OpenIncidentListElement;