import React from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import style from './style';

class IncidentDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			needsSaving: false
		};

		this.onIncidentDetailsFieldChange = this.onIncidentDetailsFieldChange.bind(this);
	}

	onIncidentDetailsFieldChange(e) {
		this.setState({
			needsSaving: true
		});
		console.log('changed to', e.target.value);
	}

	render() {
		return (
			<div style={ style.incidentDetailsContainer }>
				<Form horizontal>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Seguro</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsFieldChange } type="text" placeholder="Seguro" defaultValue={ this.props.data.insurance } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Apolice</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsFieldChange } type="text" placeholder="Apolice" defaultValue={ this.props.data.insurancePolicy } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Patologia</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsFieldChange } type="text" placeholder="Patologia" defaultValue={ this.props.data.pathology } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Fisioterapeuta</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsFieldChange } type="text" placeholder="Fisioterapeuta" defaultValue={ this.props.data.physiotherapist } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Médico</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsFieldChange } type="text" placeholder="Médico" defaultValue={ this.props.data.doctor } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Data início</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsFieldChange } type="date" placeholder="Data início" defaultValue={ this.props.data.startDate } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Data fim</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsFieldChange } type="date" placeholder="Data fim" defaultValue={ this.props.data.endDate } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Notas privadas</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsFieldChange } componentClass="textarea" type="date" placeholder="Notas privadas" defaultValue={ this.props.data.privateNotes } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Observações</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsFieldChange } componentClass="textarea" type="date" placeholder="Observações" defaultValue={ this.props.data.publicNotes } />
						</Col>
					</FormGroup>
				</Form>
			</div>
		);
	}
}

export default IncidentDetails;
