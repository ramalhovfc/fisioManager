import React from 'react';
import style from './style';

class OpenIncidentList extends React.Component {
	render() {
		let incidentNodes = this.props.data.map(incident => {
			return (
				<OpenIncidentListElement key={ incident['_id'] } data={ incident } />
			)
		});

		if (incidentNodes.length) {
			return (
				<div>
					<div style={ style.commentList }>
						{ incidentNodes }
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

export default OpenIncidentList;