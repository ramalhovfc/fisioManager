import React from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
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
		let value;
		if (e && e.length) {
			value = e[0].customOption ? e[0].job : e[0];
		} else {
			value = undefined;
		}
		this.props.onUserFieldChange(JOB, value);
	}

	onIncidentDetailsInsuranceChange(e) {
		this.props.onIncidentFieldChange(INSURANCE, e[0].customOption ? e[0].insurance : e[0]);
	}

	onIncidentDetailsInsurancePolicyChange(e) {
		this.props.onIncidentFieldChange(INSURANCEPOLICY, e.target.value);
	}

	onIncidentDetailsPathologyChange(e) {
		this.props.onIncidentFieldChange(PATHOLOGY, e[0].customOption ? e[0].pathology : e[0]);
	}

	onIncidentDetailsPhysiotherapistChange(e) {
		this.props.onIncidentFieldChange(PHYSIOTHERAPIST, e[0].customOption ? e[0].physiotherapist : e[0]);
	}

	onIncidentDetailsDoctorChange(e) {
		this.props.onIncidentFieldChange(DOCTOR, e[0].customOption ? e[0].doctor : e[0]);
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
		let _id = this.props.data.user["_id"] && this.props.data.user["_id"].slice();
		let name = (this.props.data.user.name) ? this.props.data.user.name.trim() : undefined;
		let telephone = (this.props.data.user.telephone) ? this.props.data.user.telephone.trim() : undefined;
		let taxNumber = (this.props.data.user.taxNumber) ? this.props.data.user.taxNumber.trim() : undefined;
		let genre = (this.props.data.user.genre) ? this.props.data.user.genre.trim() : undefined;
		let postalAddress = (this.props.data.user.postalAddress) ? this.props.data.user.postalAddress.trim() : undefined;
		let job;
		if (this.props.data.user.job) {
			job = this.props.data.user.job.job || this.props.data.user.job;
			job = (job) ? job.trim() : undefined;
		}

		// incident props
		let insurance;
		if (this.props.data.user.insurance) {
			insurance = this.props.data.user.insurance.insurance || this.props.data.user.insurance;
			insurance = (insurance) ? insurance.trim() : undefined;
		}

		let insurancePolicy = (this.props.data.user.insurancePolicy) ? this.props.data.user.insurancePolicy.trim() : undefined;
		let pathology;
		if (this.props.data.user.pathology) {
			pathology = this.props.data.user.pathology.pathology || this.props.data.user.pathology;
			pathology = (pathology) ? pathology.trim() : undefined;
		}
		let physiotherapist;
		if (this.props.data.user.physiotherapist) {
			physiotherapist = this.props.data.user.physiotherapist.physiotherapist || this.props.data.user.physiotherapist;
			physiotherapist = (physiotherapist) ? physiotherapist.trim() : undefined;
		}
		let doctor;
		if (this.props.data.user.doctor) {
			doctor = this.props.data.user.doctor.doctor || this.props.data.user.doctor;
			doctor = (doctor) ? doctor.trim() : undefined;
		}
		let startDate = (this.props.data.user.startDate) ? this.props.data.user.startDate.trim() : undefined;
		let endDate = (this.props.data.user.endDate) ? this.props.data.user.endDate.trim() : undefined;
		let numberOfSessions = (this.props.data.user.numberOfSessions !== undefined && this.props.data.user.endDate) ? this.props.data.user.numberOfSessions : undefined;
		let privateNotes = (this.props.data.user.privateNotes) ? this.props.data.user.privateNotes.trim() : undefined;
		let publicNotes = (this.props.data.user.publicNotes) ? this.props.data.user.publicNotes.trim() : undefined;

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
		if (this.props.data && this.props.data.user) {
			console.log('this.props.data.user.job',this.props.data.user.job);
			return (
				<div style={ style.incidentDetailsContainer }>
					<h3>Utente</h3>
					<Form horizontal onSubmit={ this.onFormSubmit }>
						<FormGroup controlId="formHorizontal">
							<Col componentClass={ControlLabel} sm={2}>Nome</Col>
							<Col sm={10}>
								<FormControl onChange={ this.onUserNameChange } type="text" placeholder="Nome"
								             defaultValue={ this.props.data.user.name }/>
							</Col>
						</FormGroup>
						<FormGroup controlId="formHorizontal">
							<Col componentClass={ControlLabel} sm={2}>Telefone</Col>
							<Col sm={10}>
								<FormControl onChange={ this.onUserTelephoneChange } type="number"
								             placeholder="Telefone" defaultValue={ this.props.data.user.telephone }/>
							</Col>
						</FormGroup>
						<FormGroup controlId="formHorizontal">
							<Col componentClass={ControlLabel} sm={2}>Contribuinte</Col>
							<Col sm={10}>
								<FormControl onChange={ this.onUserTaxNumberChange } type="number"
								             placeholder="Contribuinte"
								             defaultValue={ this.props.data.user.taxNumber }/>
							</Col>
						</FormGroup>
						<FormGroup controlId="formControlsSelect">
							<Col componentClass={ControlLabel} sm={2}>Género</Col>
							<Col sm={10}>
								<FormControl componentClass="select" onChange={ this.onUserGenreChange }
								             defaultValue={ this.props.data.user.genre }>
									<option value=""></option>
									<option value="Masculino">Masculino</option>
									<option value="Feminino">Feminino</option>
								</FormControl>
							</Col>
						</FormGroup>
						<FormGroup controlId="formHorizontal">
							<Col componentClass={ControlLabel} sm={2}>Morada</Col>
							<Col sm={10}>
								<FormControl onChange={ this.onUserPostalAddressChange } type="text"
								             placeholder="Morada" defaultValue={ this.props.data.user.postalAddress }/>
							</Col>
						</FormGroup>
						<FormGroup controlId="formHorizontal">
							<Col componentClass={ControlLabel} sm={2}>Profissão</Col>
							<Col sm={10}>
								<Typeahead onChange={ this.onUserJobChange }
								           options={ this.props.data.lookups.job || [] } labelKey={'job'}
								           placeholder="Profissão" allowNew={ true }
								           defaultSelected={[ this.props.data.user.job ]} newSelectionPrefix={'Novo: '}
								           paginationText={'Mostrar mais...'} emptyLabel={'Sem resultados'}/>
							</Col>
						</FormGroup>
						{ this.props.hideIncident ? null : (
							<div>
								<br />
								<h3>Ficha</h3>
								<FormGroup controlId="formHorizontal">
									<Col componentClass={ControlLabel} sm={2}>Seguro</Col>
									<Col sm={10}>
										<Typeahead onChange={ this.onIncidentDetailsInsuranceChange }
										           options={ this.props.data.lookups.insurance || [] }
										           labelKey={'insurance'} placeholder="Seguro" allowNew={ true }
										           defaultValue={ this.props.data.user.insurance }
										           newSelectionPrefix={'Novo: '} paginationText={'Mostrar mais...'}
										           emptyLabel={'Sem resultados'}/>
									</Col>
								</FormGroup>
								<FormGroup controlId="formHorizontal">
									<Col componentClass={ControlLabel} sm={2}>Apólice</Col>
									<Col sm={10}>
										<FormControl onChange={ this.onIncidentDetailsInsurancePolicyChange }
										             type="text" placeholder="Apólice"
										             defaultValue={ this.props.data.user.insurancePolicy }/>
									</Col>
								</FormGroup>
								<FormGroup controlId="formHorizontal">
									<Col componentClass={ControlLabel} sm={2}>Patologia</Col>
									<Col sm={10}>
										<Typeahead onChange={ this.onIncidentDetailsPathologyChange }
										           options={ this.props.data.lookups.pathology || [] }
										           labelKey={'pathology'} placeholder="Patologia" allowNew={ true }
										           defaultValue={ this.props.data.user.pathology }
										           newSelectionPrefix={'Novo: '} paginationText={'Mostrar mais...'}
										           emptyLabel={'Sem resultados'}/>
									</Col>
								</FormGroup>
								<FormGroup controlId="formHorizontal">
									<Col componentClass={ControlLabel} sm={2}>Fisioterapeuta</Col>
									<Col sm={10}>
										<Typeahead onChange={ this.onIncidentDetailsPhysiotherapistChange }
										           options={ this.props.data.lookups.physiotherapist || [] }
										           labelKey={'physiotherapist'} placeholder="Fisioterapeuta"
										           allowNew={ true }
										           defaultValue={ this.props.data.user.physiotherapist }
										           newSelectionPrefix={'Novo: '} paginationText={'Mostrar mais...'}
										           emptyLabel={'Sem resultados'}/>
									</Col>
								</FormGroup>
								<FormGroup controlId="formHorizontal">
									<Col componentClass={ControlLabel} sm={2}>Médico</Col>
									<Col sm={10}>
										<Typeahead onChange={ this.onIncidentDetailsDoctorChange }
										           options={ this.props.data.lookups.doctor || [] } labelKey={'doctor'}
										           placeholder="Médico" allowNew={ true }
										           defaultValue={ this.props.data.user.doctor }
										           newSelectionPrefix={'Novo: '} paginationText={'Mostrar mais...'}
										           emptyLabel={'Sem resultados'}/>
									</Col>
								</FormGroup>
								<FormGroup controlId="formHorizontal">
									<Col componentClass={ControlLabel} sm={2}>Data início</Col>
									<Col sm={10}>
										<FormControl onChange={ this.onIncidentDetailsStartDateChange } type="date"
										             defaultValue={ this.props.data.user.startDate }/>
									</Col>
								</FormGroup>
								<FormGroup controlId="formHorizontal">
									<Col componentClass={ControlLabel} sm={2}>Data fim</Col>
									<Col sm={10}>
										<FormControl onChange={ this.onIncidentDetailsEndDateChange } type="date"
										             defaultValue={ this.props.data.user.endDate }/>
									</Col>
								</FormGroup>
								{(this.props.data.user.endDate)
									? (<FormGroup controlId="formHorizontal">
									<Col componentClass={ControlLabel} sm={2}>Número de sessões</Col>
									<Col sm={10}>
										<FormControl onChange={ this.onIncidentDetailsNumberOfSessionsChange }
										             type="number" placeholder="Número de sessões"
										             defaultValue={ this.props.data.user.numberOfSessions }/>
									</Col>
								</FormGroup>)
									: null }
								<FormGroup controlId="formHorizontal">
									<Col componentClass={ControlLabel} sm={2}>Avaliação</Col>
									<Col sm={10}>
										<FormControl onChange={ this.onIncidentDetailsprivateNotesChange }
										             componentClass="textarea" type="date" placeholder="Avaliação"
										             defaultValue={ this.props.data.user.privateNotes }/>
									</Col>
								</FormGroup>
								<FormGroup controlId="formHorizontal">
									<Col componentClass={ControlLabel} sm={2}>Observações</Col>
									<Col sm={10}>
										<FormControl onChange={ this.onIncidentDetailsPublicNotesChange }
										             componentClass="textarea" type="date" placeholder="Observações"
										             defaultValue={ this.props.data.user.publicNotes }/>
									</Col>
								</FormGroup>
							</div>
						) }
						<button
							type="submit"
							className="btn btn-primary"
							style={ style.userSaveButton }
							disabled={ !this.props.data.user.needsSaving }>
							Guardar
						</button>
					</Form>
				</div>
			);
		} else {
			return (
				<div>
					Loading...
				</div>
			)
		}
	}
}

export default UserAddForm;