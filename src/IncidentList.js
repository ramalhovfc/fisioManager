import React from 'react';
import style from './style';
import { Tabs, Tab } from 'react-bootstrap';
import IncidentDetails from './IncidentDetails';
import {isIncidentClosed} from '../model/utils/incidentUtils';

class IncidentList extends React.Component {
	render() {
		let incidentElements = this.props.data.map((incident, index) => {
			return (
				<Tab key={ incident['_id'] } eventKey={ index + 1 } title={ "Ficha " + (index + 1) }>
					<IncidentDetails data={ incident } onIncidentSave={ this.props.onIncidentSave } onIncidentDetailsFieldChange={ this.props.onIncidentDetailsFieldChange } onDeleteIncidentClick={ this.props.onDeleteIncidentClick } />
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

		var addingDisabled = false;
		for (let i = 0; i < this.props.data.length; i++) {
			if (!isIncidentClosed(this.props.data[i]) || this.props.data[i].needsSaving) {
				addingDisabled = true;
				break;
			}
		}

		return (
			<div style={ style.incidentListContainer }>
				<button	type="button" className="btn btn-primary" style={ style.userAddButton } onClick={ this.props.onAddNewIncidentClick } disabled={ addingDisabled } title={ (addingDisabled) ? "Existem fichas abertas e/ou não guardadas" : "" }>
					Nova ficha
				</button>
				{ incidentsComponent }
			</div>
		);
	}
}

export default IncidentList;
