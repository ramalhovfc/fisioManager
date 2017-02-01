import React from 'react';
import style from './style';
import { Tabs, Tab } from 'react-bootstrap';
import IncidentDetails from './IncidentDetails';

class IncidentList extends React.Component {
	render() {
		let incidentElements = this.props.data.map((incident, index) => {
			return (
				<Tab key={ incident['_id'] } eventKey={ index + 1 } title={ "Ficha " + (index + 1) }>
					<IncidentDetails data={ incident } />
				</Tab>
			)
		});

		let incidentsComponent;
		if (incidentElements.length) {
			incidentsComponent = (
				<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
					{ incidentElements }
				</Tabs>
			);
		} else {
			incidentsComponent = (
				<div style={ style.noIncidentsIncidentList }>
					Não existem fichas
				</div>
			);
		}

		return (
			<div style={ style.incidentListContainer }>
				<h4>Incidentes</h4>
				{ incidentsComponent }
			</div>
		);
	}
}

export default IncidentList;
