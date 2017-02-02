import React from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import style from './style';

class IncidentDetails extends React.Component {
	constructor() {
		super();

		this.handleSubmit = this.handleSubmit.bind(this);
		this.onIncidentDetailsFieldChange = this.onIncidentDetailsFieldChange.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		let _id = this.props.data["_id"].slice();
		let insurance = (this.props.data.insurance) ? this.props.data.insurance.trim() : undefined;
		let insurancePolicy = (this.props.data.insurancePolicy) ? this.props.data.insurancePolicy.trim() : undefined;
		let pathology = (this.props.data.pathology) ? this.props.data.pathology.trim() : undefined;
		let physiotherapist = (this.props.data.physiotherapist) ? this.props.data.physiotherapist.trim() : undefined;
		let doctor = (this.props.data.doctor) ? this.props.data.doctor.trim() : undefined;
		let startDate = (this.props.data.startDate) ? this.props.data.startDate.trim() : undefined;
		let endDate = (this.props.data.endDate) ? this.props.data.endDate.trim() : undefined;
		let privateNotes = (this.props.data.privateNotes) ? this.props.data.privateNotes.trim() : undefined;
		let publicNotes = (this.props.data.publicNotes) ? this.props.data.publicNotes.trim() : undefined;

		this.props.onIncidentSave({
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
		});
	}

	onIncidentDetailsFieldChange() {
		if (!this.props.data.needsSaving) {
			this.props.onIncidentDetailsFieldChange(this.props.data["_id"]);
		}
	}

	render() {
		return (
			<div style={ style.incidentDetailsContainer }>
				<Form horizontal onSubmit={ this.handleSubmit }>
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
					<button
						type="submit"
						className="btn btn-primary"
						style={ style.incidentSaveButton }
						disabled={ !this.props.data.needsSaving } >
						Guardar
					</button>
				</Form>
			</div>
		);
	}
}

export default IncidentDetails;
