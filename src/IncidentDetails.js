import React from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import style from './style';

// TODO move theese from here
const INSURANCE = 'insurance';
const INSURANCEPOLICY = 'insurancePolicy';
const PATHOLOGY = 'pathology';
const PHYSIOTHERAPIST = 'physiotherapist';
const DOCTOR = 'doctor';
const STARTDATE = 'startDate';
const ENDDATE = 'endDate';
const NUMBEROFSESSIONS = 'numberOfSessions';
const PRIVATENOTES = 'privateNotes';
const PUBLICNOTES = 'publicNotes';

class IncidentDetails extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.onIncidentDetailsInsuranceChange = this.onIncidentDetailsInsuranceChange.bind(this);
		this.onIncidentDetailsInsurancePolicyChange = this.onIncidentDetailsInsurancePolicyChange.bind(this);
		this.onIncidentDetailsPathologyChange = this.onIncidentDetailsPathologyChange.bind(this);
		this.onIncidentDetailsPhysiotherapistChange = this.onIncidentDetailsPhysiotherapistChange.bind(this);
		this.onIncidentDetailsDoctorChange = this.onIncidentDetailsDoctorChange.bind(this);
		this.onIncidentDetailsStartDateChange = this.onIncidentDetailsStartDateChange.bind(this);
		this.onIncidentDetailsEndDateChange = this.onIncidentDetailsEndDateChange.bind(this);
		this.onIncidentDetailsNumberOfSessionsChange = this.onIncidentDetailsNumberOfSessionsChange.bind(this);
		this.onIncidentDetailsprivateNotesChange = this.onIncidentDetailsprivateNotesChange.bind(this);
		this.onIncidentDetailsPublicNotesChange = this.onIncidentDetailsPublicNotesChange.bind(this);
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
		let numberOfSessions = (this.props.data.numberOfSessions !== undefined && this.props.data.endDate) ? this.props.data.numberOfSessions : undefined;
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
			numberOfSessions: numberOfSessions,
			privateNotes: privateNotes,
			publicNotes: publicNotes
		});
	}

	onIncidentDetailsInsuranceChange(e) {
		this.props.onIncidentDetailsFieldChange(INSURANCE, e.target.value, this.props.data["_id"]);
	}

	onIncidentDetailsInsurancePolicyChange(e) {
		this.props.onIncidentDetailsFieldChange(INSURANCEPOLICY, e.target.value, this.props.data["_id"]);
	}

	onIncidentDetailsPathologyChange(e) {
		this.props.onIncidentDetailsFieldChange(PATHOLOGY, e.target.value, this.props.data["_id"]);
	}

	onIncidentDetailsPhysiotherapistChange(e) {
		this.props.onIncidentDetailsFieldChange(PHYSIOTHERAPIST, e.target.value, this.props.data["_id"]);
	}

	onIncidentDetailsDoctorChange(e) {
		this.props.onIncidentDetailsFieldChange(DOCTOR, e.target.value, this.props.data["_id"]);
	}

	onIncidentDetailsStartDateChange(e) {
		this.props.onIncidentDetailsFieldChange(STARTDATE, e.target.value, this.props.data["_id"]);
	}

	onIncidentDetailsEndDateChange(e) {
		this.props.onIncidentDetailsFieldChange(ENDDATE, e.target.value, this.props.data["_id"]);
	}

	onIncidentDetailsNumberOfSessionsChange(e) {
		this.props.onIncidentDetailsFieldChange(NUMBEROFSESSIONS, e.target.value, this.props.data["_id"]);
	}

	onIncidentDetailsprivateNotesChange(e) {
		this.props.onIncidentDetailsFieldChange(PRIVATENOTES, e.target.value, this.props.data["_id"]);
	}

	onIncidentDetailsPublicNotesChange(e) {
		this.props.onIncidentDetailsFieldChange(PUBLICNOTES, e.target.value, this.props.data["_id"]);
	}


	render() {
		return (
			<div style={ style.incidentDetailsContainer }>
				<Form horizontal onSubmit={ this.handleSubmit }>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Seguro</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsInsuranceChange } type="text" placeholder="Seguro" defaultValue={ this.props.data.insurance } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Apolice</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsInsurancePolicyChange } type="text" placeholder="Apolice" defaultValue={ this.props.data.insurancePolicy } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Patologia</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsPathologyChange } type="text" placeholder="Patologia" defaultValue={ this.props.data.pathology } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Fisioterapeuta</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsPhysiotherapistChange } type="text" placeholder="Fisioterapeuta" defaultValue={ this.props.data.physiotherapist } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Médico</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsDoctorChange } type="text" placeholder="Médico" defaultValue={ this.props.data.doctor } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Data início</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsStartDateChange } type="date" defaultValue={ this.props.data.startDate } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Data fim</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsEndDateChange } type="date" defaultValue={ this.props.data.endDate } />
						</Col>
					</FormGroup>
					{(this.props.data.endDate)
						? (<FormGroup controlId="formHorizontal">
								<Col componentClass={ControlLabel} sm={2}>Número de sessões</Col>
								<Col sm={10}>
									<FormControl onChange={ this.onIncidentDetailsNumberOfSessionsChange } type="number" placeholder="Número de sessões" defaultValue={ this.props.data.numberOfSessions } />
								</Col>
							</FormGroup>)
						: null }
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Notas privadas</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsprivateNotesChange } componentClass="textarea" type="date" placeholder="Notas privadas" defaultValue={ this.props.data.privateNotes } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Observações</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsPublicNotesChange } componentClass="textarea" type="date" placeholder="Observações" defaultValue={ this.props.data.publicNotes } />
						</Col>
					</FormGroup>
					<button
						type="submit"
						className="btn btn-primary"
						style={ style.incidentSaveButton }
						disabled={ !this.props.data.needsSaving } >
						Guardar
					</button>
					<button
						className="btn btn-primary"
						style={ style.incidentSaveButton } >
						Eliminar
					</button>
				</Form>
			</div>
		);
	}
}

export default IncidentDetails;
