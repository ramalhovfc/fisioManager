import React from 'react';
import style from './style';
import { Tabs, Tab } from 'react-bootstrap';
import IncidentDetails from './IncidentDetails';

class IncidentList extends React.Component {
	render() {
		let incidentElements = this.props.data.map((incident, index) => {
			return (
				<Tab key={ incident['_id'] } eventKey={ index + 1 } title={ "Ficha " + (index + 1) }>
					<IncidentDetails data={ incident } onIncidentSave={ this.props.onIncidentSave } onIncidentDetailsFieldChange={ this.props.onIncidentDetailsFieldChange } />
				</Tab>
			)
		});

		let incidentsComponent;
		if (incidentElements.length) {
			incidentsComponent = (
				<Tabs id="incident-tabs" activeKey={ this.props.tabActiveKey } onSelect={ this.props.onSelectTab }>
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
				<button	type="button" className="btn btn-primary" style={ style.userAddButton } onClick={ this.props.onAddNewIncidentClick }>
					Nova ficha
				</button>
				{ incidentsComponent }
			</div>
		);
	}
}

export default IncidentList;
