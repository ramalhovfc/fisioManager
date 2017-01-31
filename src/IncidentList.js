import React from 'react';
import style from './style';
import { Tabs, Tab } from 'react-bootstrap';
import IncidentDetails from './IncidentDetails';

class IncidentList extends React.Component {
	render() {
		let incidentList;
		if (false) {
			incidentList = (
				<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
					<Tab eventKey={1} title="Ficha 1">
						<IncidentDetails/>
					</Tab>
					<Tab eventKey={2} title="Ficha 2">
						<IncidentDetails/>
					</Tab>
				</Tabs>
			);
		} else {
			incidentList = (
				<div style={ style.noIncidentsIncidentList }>
					Não existem fichas
				</div>
			);
		}


		return (
			<div style={ style.incidentListContainer }>
				<h4>Incidentes</h4>
				{ incidentList }
			</div>
		);
	}
}

export default IncidentList;
