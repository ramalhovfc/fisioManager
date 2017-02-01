import React from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import style from './style';

class IncidentDetails extends React.Component {
	constructor() {
		super();

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		let _id = this.props.data["_id"].slice();
		let insurance = this.props.data.insurance.trim();
		let insurancePolicy = this.props.data.insurancePolicy.trim();
		let pathology = this.props.data.pathology.trim();
		let physiotherapist = this.props.data.physiotherapist.trim();
		let doctor = this.props.data.doctor.trim();
		let startDate = this.props.data.startDate.trim();
		let endDate = this.props.data.endDate.trim();
		let privateNotes = this.props.data.privateNotes.trim();
		let publicNotes = this.props.data.publicNotes.trim();

		this.props.data.onIncidentSave({
			_id: _id,
			insurance: insurance,
			insurancePolicy: insurancePolicy,
			pathology: pathology,
			physiotherapist: physiotherapist,
			doctor: doctor,
			startDate: startDate,
			endDate: endDate,
			privateNotes: privateNotes,
			publicNotes: publicNotes
		}, this.props.data.incidentIndex);
	}

	render() {
		return (
			<div style={ style.incidentDetailsContainer }>
				<Form horizontal onSubmit={ this.handleSubmit }>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Seguro</Col>
						<Col sm={10}>
							<FormControl onChange={ this.props.onIncidentDetailsFieldChange } type="text" placeholder="Seguro" value={ this.props.data.insurance } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Apolice</Col>
						<Col sm={10}>
							<FormControl onChange={ this.props.onIncidentDetailsFieldChange } type="text" placeholder="Apolice" value={ this.props.data.insurancePolicy } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Patologia</Col>
						<Col sm={10}>
							<FormControl onChange={ this.props.onIncidentDetailsFieldChange } type="text" placeholder="Patologia" value={ this.props.data.pathology } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Fisioterapeuta</Col>
						<Col sm={10}>
							<FormControl onChange={ this.props.onIncidentDetailsFieldChange } type="text" placeholder="Fisioterapeuta" value={ this.props.data.physiotherapist } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Médico</Col>
						<Col sm={10}>
							<FormControl onChange={ this.props.onIncidentDetailsFieldChange } type="text" placeholder="Médico" value={ this.props.data.doctor } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Data início</Col>
						<Col sm={10}>
							<FormControl onChange={ this.props.onIncidentDetailsFieldChange } type="date" placeholder="Data início" value={ this.props.data.startDate } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Data fim</Col>
						<Col sm={10}>
							<FormControl onChange={ this.props.onIncidentDetailsFieldChange } type="date" placeholder="Data fim" value={ this.props.data.endDate } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Notas privadas</Col>
						<Col sm={10}>
							<FormControl onChange={ this.props.onIncidentDetailsFieldChange } componentClass="textarea" type="date" placeholder="Notas privadas" value={ this.props.data.privateNotes } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Observações</Col>
						<Col sm={10}>
							<FormControl onChange={ this.props.onIncidentDetailsFieldChange } componentClass="textarea" type="date" placeholder="Observações" value={ this.props.data.publicNotes } />
						</Col>
					</FormGroup>
					<button
						type="submit"
						className="btn btn-primary"
						style={ style.incidentSaveButton }
						disabled={ !this.props.data.incidentNeedsSaving } >
						Guardar
					</button>
				</Form>
			</div>
		);
	}
}

export default IncidentDetails;
