import React from 'react';
import style from './style';
import OpenIncidentListElement from './OpenIncidentListElement';

class OpenIncidentList extends React.Component {
	render() {
		let incidentNodes = this.props.data.map(incident => {
			return (
				<OpenIncidentListElement key={ incident['_id'] } data={ incident } />
			)
		});

		if (incidentNodes.length) {
			return (
				<div style={ style.commentList }>
					{ incidentNodes }
				</div>
			);
		} else {
			return (
				null
			);
		}
	}
}

export default OpenIncidentList;