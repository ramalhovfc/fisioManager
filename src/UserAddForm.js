import React from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import style from './style';

// TODO move theese to model
const NAME = 'name';
const TELEPHONE = 'telephone';
const TAXNUMBER = 'taxNumber';
const GENRE = 'genre';
const POSTALADDRESS = 'postalAddress';
const JOB = 'job';

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

class UserAddForm extends React.Component {
	constructor() {
		super();

		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onUserNameChange = this.onUserNameChange.bind(this);
		this.onUserTelephoneChange = this.onUserTelephoneChange.bind(this);
		this.onUserTaxNumberChange = this.onUserTaxNumberChange.bind(this);
		this.onUserGenreChange = this.onUserGenreChange.bind(this);
		this.onUserPostalAddressChange = this.onUserPostalAddressChange.bind(this);
		this.onUserJobChange = this.onUserJobChange.bind(this);
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

	onUserNameChange(e) {
		this.props.onUserFieldChange(NAME, e.target.value);
	}

	onUserTelephoneChange(e) {
		this.props.onUserFieldChange(TELEPHONE, e.target.value);
	}

	onUserTaxNumberChange(e) {
		this.props.onUserFieldChange(TAXNUMBER, e.target.value);
	}

	onUserGenreChange(e) {
		this.props.onUserFieldChange(GENRE, e.target.value);
	}

	onUserPostalAddressChange(e) {
		this.props.onUserFieldChange(POSTALADDRESS, e.target.value);
	}

	onUserJobChange(e) {
		this.props.onUserFieldChange(JOB, e.target.value);
	}

	onIncidentDetailsInsuranceChange(e) {
		this.props.onIncidentFieldChange(INSURANCE, e.target.value);
	}

	onIncidentDetailsInsurancePolicyChange(e) {
		this.props.onIncidentFieldChange(INSURANCEPOLICY, e.target.value);
	}

	onIncidentDetailsPathologyChange(e) {
		this.props.onIncidentFieldChange(PATHOLOGY, e.target.value);
	}

	onIncidentDetailsPhysiotherapistChange(e) {
		this.props.onIncidentFieldChange(PHYSIOTHERAPIST, e.target.value);
	}

	onIncidentDetailsDoctorChange(e) {
		this.props.onIncidentFieldChange(DOCTOR, e.target.value);
	}

	onIncidentDetailsStartDateChange(e) {
		this.props.onIncidentFieldChange(STARTDATE, e.target.value);
	}

	onIncidentDetailsEndDateChange(e) {
		this.props.onIncidentFieldChange(ENDDATE, e.target.value);
	}

	onIncidentDetailsNumberOfSessionsChange(e) {
		this.props.onIncidentFieldChange(NUMBEROFSESSIONS, e.target.value);
	}

	onIncidentDetailsprivateNotesChange(e) {
		this.props.onIncidentFieldChange(PRIVATENOTES, e.target.value);
	}

	onIncidentDetailsPublicNotesChange(e) {
		this.props.onIncidentFieldChange(PUBLICNOTES, e.target.value);
	}

	onFormSubmit(e) {
		e.preventDefault();

		// user props
		let _id = this.props.data["_id"] && this.props.data["_id"].slice();
		let name = (this.props.data.name) ? this.props.data.name.trim() : undefined;
		let telephone = (this.props.data.telephone) ? this.props.data.telephone.trim() : undefined;
		let taxNumber = (this.props.data.taxNumber) ? this.props.data.taxNumber.trim() : undefined;
		let genre = (this.props.data.genre) ? this.props.data.genre.trim() : undefined;
		let postalAddress = (this.props.data.postalAddress) ? this.props.data.postalAddress.trim() : undefined;
		let job = (this.props.data.job) ? this.props.data.job.trim() : undefined;

		// incident props
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

		this.props.onUserSave({
			_id: _id,
			name: name,
			telephone: telephone,
			taxNumber: taxNumber,
			genre: genre,
			postalAddress: postalAddress,
			job: job,
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

	render() {
		return (
			<div style={ style.incidentDetailsContainer }>
				<h3>Utente</h3>
				<Form horizontal onSubmit={ this.onFormSubmit }>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Nome</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onUserNameChange } type="text" placeholder="Nome" defaultValue={ this.props.data.name } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Telefone</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onUserTelephoneChange } type="number" placeholder="Telefone" defaultValue={ this.props.data.telephone } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal" >
						<Col componentClass={ControlLabel} sm={2}>Contribuinte</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onUserTaxNumberChange } type="number" placeholder="Contribuinte" defaultValue={ this.props.data.taxNumber } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formControlsSelect">
						<Col componentClass={ControlLabel} sm={2}>Género</Col>
						<Col sm={10}>
							<FormControl componentClass="select" onChange={ this.onUserGenreChange } defaultValue={ this.props.data.genre }>
								<option value=""></option>
								<option value="Masculino">Masculino</option>
								<option value="Feminino">Feminino</option>
							</FormControl>
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Morada</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onUserPostalAddressChange } type="text" placeholder="Morada" defaultValue={ this.props.data.postalAddress } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Profissão</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onUserJobChange } type="text" placeholder="Profissão" defaultValue={ this.props.data.job } />
						</Col>
					</FormGroup>
					<br />
					<h3>Ficha</h3>


					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Seguro</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsInsuranceChange } type="text" placeholder="Seguro" defaultValue={ this.props.data.insurance } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Apólice</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsInsurancePolicyChange } type="text" placeholder="Apólice" defaultValue={ this.props.data.insurancePolicy } />
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
						style={ style.userSaveButton }
						disabled={ !this.props.data.needsSaving } >
						Guardar
					</button>
				</Form>
			</div>
		);
	}
}

export default UserAddForm;