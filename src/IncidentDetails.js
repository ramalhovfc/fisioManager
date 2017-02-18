import React from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
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
		this.onDeleteIncidentClick = this.onDeleteIncidentClick.bind(this);
		this.onPrintIncidentClick = this.onPrintIncidentClick.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		let _id = this.props.data.incident["_id"].slice();
		let insurance;
		if (this.props.data.incident.insurance) {
			insurance = this.props.data.incident.insurance.insurance || this.props.data.incident.insurance;
			insurance = (insurance) ? insurance.trim() : undefined;
		}
		let insurancePolicy = (this.props.data.incident.insurancePolicy) ? this.props.data.incident.insurancePolicy.trim() : undefined;
		let pathology;
		if (this.props.data.incident.pathology) {
			pathology = this.props.data.incident.pathology.pathology || this.props.data.incident.pathology;
			pathology = (pathology) ? pathology.trim() : undefined;
		}
		let physiotherapist;
		if (this.props.data.incident.physiotherapist) {
			physiotherapist = this.props.data.incident.physiotherapist.physiotherapist || this.props.data.incident.physiotherapist;
			physiotherapist = (physiotherapist) ? physiotherapist.trim() : undefined;
		}
		let doctor;
		if (this.props.data.incident.doctor) {
			doctor = this.props.data.incident.doctor.doctor || this.props.data.incident.doctor;
			doctor = (doctor) ? doctor.trim() : undefined;
		}
		let startDate = (this.props.data.incident.startDate) ? this.props.data.incident.startDate.trim() : undefined;
		let endDate = (this.props.data.incident.endDate) ? this.props.data.incident.endDate.trim() : undefined;
		let numberOfSessions = (this.props.data.incident.numberOfSessions !== undefined && this.props.data.incident.endDate) ? this.props.data.incident.numberOfSessions : undefined;
		let privateNotes = (this.props.data.incident.privateNotes) ? this.props.data.incident.privateNotes.trim() : undefined;
		let publicNotes = (this.props.data.incident.publicNotes) ? this.props.data.incident.publicNotes.trim() : undefined;

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
		let value;
		if (e && e.length) {
			value = e[0].customOption ? e[0].insurance : e[0];
		} else {
			value = undefined;
		}
		this.props.onIncidentDetailsFieldChange(INSURANCE, value, this.props.data.incident["_id"]);
	}

	onIncidentDetailsInsurancePolicyChange(e) {
		this.props.onIncidentDetailsFieldChange(INSURANCEPOLICY, e.target.value, this.props.data.incident["_id"]);
	}

	onIncidentDetailsPathologyChange(e) {
		let value;
		if (e && e.length) {
			value = e[0].customOption ? e[0].pathology : e[0];
		} else {
			value = undefined;
		}
		this.props.onIncidentDetailsFieldChange(PATHOLOGY, value, this.props.data.incident["_id"]);
	}

	onIncidentDetailsPhysiotherapistChange(e) {
		let value;
		if (e && e.length) {
			value = e[0].customOption ? e[0].physiotherapist : e[0];
		} else {
			value = undefined;
		}
		this.props.onIncidentDetailsFieldChange(PHYSIOTHERAPIST, value, this.props.data.incident["_id"]);
	}

	onIncidentDetailsDoctorChange(e) {
		let value;
		if (e && e.length) {
			value = e[0].customOption ? e[0].doctor : e[0];
		} else {
			value = undefined;
		}
		this.props.onIncidentDetailsFieldChange(DOCTOR, value, this.props.data.incident["_id"]);
	}

	onIncidentDetailsStartDateChange(e) {
		this.props.onIncidentDetailsFieldChange(STARTDATE, e.target.value, this.props.data.incident["_id"]);
	}

	onIncidentDetailsEndDateChange(e) {
		this.props.onIncidentDetailsFieldChange(ENDDATE, e.target.value, this.props.data.incident["_id"]);
	}

	onIncidentDetailsNumberOfSessionsChange(e) {
		this.props.onIncidentDetailsFieldChange(NUMBEROFSESSIONS, e.target.value, this.props.data.incident["_id"]);
	}

	onIncidentDetailsprivateNotesChange(e) {
		this.props.onIncidentDetailsFieldChange(PRIVATENOTES, e.target.value, this.props.data.incident["_id"]);
	}

	onIncidentDetailsPublicNotesChange(e) {
		this.props.onIncidentDetailsFieldChange(PUBLICNOTES, e.target.value, this.props.data.incident["_id"]);
	}

	onDeleteIncidentClick(e) {
		var r = confirm("Tem a certeza que pretende eliminar?");
		if (r === true) {
			e.preventDefault();
			this.props.onDeleteIncidentClick(this.props.data.incident);
		}
	}

	onPrintIncidentClick(e) {
		e.preventDefault();
		if (!this.props.data.incident["_id"]) {
			alert("A ficha não está gravada");
		} else {
			this.props.onPrintIncidentClick(this.props.data.incident["_id"]);
		}
	}

	render() {
		return (
			<div style={ style.incidentDetailsContainer }>
				<Form horizontal onSubmit={ this.handleSubmit }>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Seguro</Col>
						<Col sm={10}>
							<Typeahead onChange={ this.onIncidentDetailsInsuranceChange } options={ this.props.data.lookups.insurance || [] } labelKey={'insurance'} placeholder="Seguro" allowNew={ true } defaultSelected={[ this.props.data.incident.insurance ]} newSelectionPrefix={'Novo: '} paginationText={'Mostrar mais...'} emptyLabel={'Sem resultados'} />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Apólice</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsInsurancePolicyChange } type="text" placeholder="Apólice" defaultValue={ this.props.data.incident.insurancePolicy } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Patologia</Col>
						<Col sm={10}>
							<Typeahead onChange={ this.onIncidentDetailsPathologyChange } options={ this.props.data.lookups.pathology || [] } labelKey={'pathology'} placeholder="Patologia" allowNew={ true } defaultSelected={[ this.props.data.incident.pathology ]} newSelectionPrefix={'Novo: '} paginationText={'Mostrar mais...'} emptyLabel={'Sem resultados'} />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Fisioterapeuta</Col>
						<Col sm={10}>
							<Typeahead onChange={ this.onIncidentDetailsPhysiotherapistChange } options={ this.props.data.lookups.physiotherapist || [] } labelKey={'physiotherapist'} placeholder="Fisioterapeuta" allowNew={ true } defaultSelected={[ this.props.data.incident.physiotherapist ]} newSelectionPrefix={'Novo: '} paginationText={'Mostrar mais...'} emptyLabel={'Sem resultados'} />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Médico</Col>
						<Col sm={10}>
							<Typeahead onChange={ this.onIncidentDetailsDoctorChange } options={ this.props.data.lookups.doctor || [] } labelKey={'doctor'} placeholder="Médico" allowNew={ true } defaultSelected={[ this.props.data.incident.doctor ]} newSelectionPrefix={'Novo: '} paginationText={'Mostrar mais...'} emptyLabel={'Sem resultados'} />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Data início</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsStartDateChange } type="date" defaultValue={ this.props.data.incident.startDate } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Data fim</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsEndDateChange } type="date" defaultValue={ this.props.data.incident.endDate } />
						</Col>
					</FormGroup>
					{(this.props.data.incident.endDate)
						? (<FormGroup controlId="formHorizontal">
								<Col componentClass={ControlLabel} sm={2}>Número de sessões</Col>
								<Col sm={10}>
									<FormControl onChange={ this.onIncidentDetailsNumberOfSessionsChange } type="number" placeholder="Número de sessões" defaultValue={ this.props.data.incident.numberOfSessions } />
								</Col>
							</FormGroup>)
						: null }
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Avaliação</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsprivateNotesChange } componentClass="textarea" type="date" placeholder="Avaliação" defaultValue={ this.props.data.incident.privateNotes } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Observações</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsPublicNotesChange } componentClass="textarea" type="date" placeholder="Observações" defaultValue={ this.props.data.incident.publicNotes } />
						</Col>
					</FormGroup>
					<button
						type="submit"
						className="btn btn-primary"
						style={ style.incidentSaveButton }
						disabled={ !this.props.data.incident.needsSaving } >
						Guardar
					</button>
					<button
						className="btn btn-primary"
						style={ style.incidentSaveButton }
						onClick={ this.onDeleteIncidentClick }>
						Eliminar
					</button>
					<button
						className="btn btn-primary"
						title={ (this.props.data.incident.needsSaving || !this.props.data.incident.endDate) ? "A ficha não está gravada ou não está fechada." : "" }
						style={ style.incidentSaveButton }
						onClick={ this.onPrintIncidentClick }
						disabled={ this.props.data.incident.needsSaving || !this.props.data.incident.endDate }>
						Imprimir
					</button>
				</Form>
			</div>
		);
	}
}

export default IncidentDetails;
