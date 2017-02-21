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
const STARTDATEBEGIN = 'startDateBegin';
const STARTDATEEND = 'startDateEnd';
const ENDDATEBEGIN = 'endDateBegin';
const ENDDATEEND = 'endDateEnd';
const NUMBEROFSESSIONS = 'numberOfSessions';

class SearchIncidentForm extends React.Component {
	constructor() {
		super();
		this.state = {
			incidentSearch: {}
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.onIncidentDetailsInsuranceChange = this.onIncidentDetailsInsuranceChange.bind(this);
		this.onIncidentDetailsInsurancePolicyChange = this.onIncidentDetailsInsurancePolicyChange.bind(this);
		this.onIncidentDetailsPathologyChange = this.onIncidentDetailsPathologyChange.bind(this);
		this.onIncidentDetailsPhysiotherapistChange = this.onIncidentDetailsPhysiotherapistChange.bind(this);
		this.onIncidentDetailsDoctorChange = this.onIncidentDetailsDoctorChange.bind(this);
		this.onIncidentDetailsStartDateBeginChange = this.onIncidentDetailsStartDateBeginChange.bind(this);
		this.onIncidentDetailsStartDateEndChange = this.onIncidentDetailsStartDateEndChange.bind(this);
		this.onIncidentDetailsEndDateBeginChange = this.onIncidentDetailsEndDateBeginChange.bind(this);
		this.onIncidentDetailsEndDateEndChange = this.onIncidentDetailsEndDateEndChange.bind(this);
		this.onIncidentDetailsNumberOfSessionsChange = this.onIncidentDetailsNumberOfSessionsChange.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		let insurance;
		if (this.state.incidentSearch.insurance) {
			insurance = this.state.incidentSearch.insurance.insurance || this.state.incidentSearch.insurance;
			insurance = (insurance) ? insurance.trim() : undefined;
		}
		let insurancePolicy = (this.state.incidentSearch.insurancePolicy) ? this.state.incidentSearch.insurancePolicy.trim() : undefined;
		let pathology;
		if (this.state.incidentSearch.pathology) {
			pathology = this.state.incidentSearch.pathology.pathology || this.state.incidentSearch.pathology;
			pathology = (pathology) ? pathology.trim() : undefined;
		}
		let physiotherapist;
		if (this.state.incidentSearch.physiotherapist) {
			physiotherapist = this.state.incidentSearch.physiotherapist.physiotherapist || this.state.incidentSearch.physiotherapist;
			physiotherapist = (physiotherapist) ? physiotherapist.trim() : undefined;
		}
		let doctor;
		if (this.state.incidentSearch.doctor) {
			doctor = this.state.incidentSearch.doctor.doctor || this.state.incidentSearch.doctor;
			doctor = (doctor) ? doctor.trim() : undefined;
		}
		let startDateBegin = (this.state.incidentSearch.startDateBegin) ? this.state.incidentSearch.startDateBegin.trim() : undefined;
		let startDateEnd = (this.state.incidentSearch.startDateEnd) ? this.state.incidentSearch.startDateEnd.trim() : undefined;
		let endDateBegin = (this.state.incidentSearch.endDateBegin) ? this.state.incidentSearch.endDateBegin.trim() : undefined;
		let endDateEnd = (this.state.incidentSearch.endDateEnd) ? this.state.incidentSearch.endDateEnd.trim() : undefined;
		let numberOfSessions = (this.state.incidentSearch.numberOfSessions) ? this.state.incidentSearch.numberOfSessions : undefined;

		this.props.onIncidentSearch({
			insurance: insurance,
			insurancePolicy: insurancePolicy,
			pathology: pathology,
			physiotherapist: physiotherapist,
			doctor: doctor,
			startDateBegin: startDateBegin,
			startDateEnd: startDateEnd,
			endDateBegin: endDateBegin,
			endDateEnd: endDateEnd,
			numberOfSessions: numberOfSessions
		});
	}

	onIncidentDetailsInsuranceChange(e) {
		let value;
		if (e && e.length) {
			value = e[0].customOption ? e[0].insurance : e[0];
		} else {
			value = undefined;
		}
		this.onIncidentDetailsFieldChange(INSURANCE, value);
	}

	onIncidentDetailsInsurancePolicyChange(e) {
		this.onIncidentDetailsFieldChange(INSURANCEPOLICY, e.target.value);
	}

	onIncidentDetailsPathologyChange(e) {
		let value;
		if (e && e.length) {
			value = e[0].customOption ? e[0].pathology : e[0];
		} else {
			value = undefined;
		}
		this.onIncidentDetailsFieldChange(PATHOLOGY, value);
	}

	onIncidentDetailsPhysiotherapistChange(e) {
		let value;
		if (e && e.length) {
			value = e[0].customOption ? e[0].physiotherapist : e[0];
		} else {
			value = undefined;
		}
		this.onIncidentDetailsFieldChange(PHYSIOTHERAPIST, value);
	}

	onIncidentDetailsDoctorChange(e) {
		let value;
		if (e && e.length) {
			value = e[0].customOption ? e[0].doctor : e[0];
		} else {
			value = undefined;
		}
		this.onIncidentDetailsFieldChange(DOCTOR, value);
	}

	onIncidentDetailsStartDateBeginChange(e) {
		this.onIncidentDetailsFieldChange(STARTDATEBEGIN, e.target.value);
	}

	onIncidentDetailsStartDateEndChange(e) {
		this.onIncidentDetailsFieldChange(STARTDATEEND, e.target.value);
	}

	onIncidentDetailsEndDateBeginChange(e) {
		this.onIncidentDetailsFieldChange(ENDDATEBEGIN, e.target.value);
	}

	onIncidentDetailsEndDateEndChange(e) {
		this.onIncidentDetailsFieldChange(ENDDATEEND, e.target.value);
	}

	onIncidentDetailsNumberOfSessionsChange(e) {
		this.onIncidentDetailsFieldChange(NUMBEROFSESSIONS, e.target.value);
	}

	onIncidentDetailsFieldChange(field, value) {
		let incidentSearch = Object.assign({}, this.state.incidentSearch);
		incidentSearch[field] = value;
		this.setState({
			incidentSearch: incidentSearch
		});
	}

	render() {
		return (
			<div style={ style.incidentDetailsContainer }>
				<Form horizontal onSubmit={ this.handleSubmit } >
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Seguro</Col>
						<Col sm={10}>
							<Typeahead onChange={ this.onIncidentDetailsInsuranceChange } options={ this.props.data.lookups.insurance || [] } labelKey={'insurance'} placeholder="Seguro" paginationText={'Mostrar mais...'} emptyLabel={'Sem resultados'} allowNew={ true } newSelectionPrefix={''} />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Apólice</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsInsurancePolicyChange } type="text" placeholder="Apólice" autoComplete="false" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Patologia</Col>
						<Col sm={10}>
							<Typeahead onChange={ this.onIncidentDetailsPathologyChange } options={ this.props.data.lookups.pathology || [] } labelKey={'pathology'} placeholder="Patologia" paginationText={'Mostrar mais...'} emptyLabel={'Sem resultados'} allowNew={ true } newSelectionPrefix={''} />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Fisioterapeuta</Col>
						<Col sm={10}>
							<Typeahead onChange={ this.onIncidentDetailsPhysiotherapistChange } options={ this.props.data.lookups.physiotherapist || [] } labelKey={'physiotherapist'} placeholder="Fisioterapeuta" paginationText={'Mostrar mais...'} emptyLabel={'Sem resultados'} allowNew={ true } newSelectionPrefix={''} />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Médico</Col>
						<Col sm={10}>
							<Typeahead onChange={ this.onIncidentDetailsDoctorChange } options={ this.props.data.lookups.doctor || [] } labelKey={'doctor'} placeholder="Médico" paginationText={'Mostrar mais...'} emptyLabel={'Sem resultados'} allowNew={ true } newSelectionPrefix={''} />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal" >
						<Col componentClass={ControlLabel} xs={2}>
							Data início
						</Col>
						<Col componentClass={ControlLabel} sm={1}>De</Col>
						<Col sm={4}>
							<FormControl onChange={ this.onIncidentDetailsStartDateBeginChange } type="date" />
						</Col>
						<Col componentClass={ControlLabel} sm={1}>Até</Col>
						<Col sm={4}>
							<FormControl onChange={ this.onIncidentDetailsStartDateEndChange } type="date" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal" >
						<Col componentClass={ControlLabel} xs={2}>
							Data fim
						</Col>
						<Col componentClass={ControlLabel} sm={1}>De</Col>
						<Col sm={4}>
							<FormControl onChange={ this.onIncidentDetailsEndDateBeginChange } type="date" />
						</Col>
						<Col componentClass={ControlLabel} sm={1}>Até</Col>
						<Col sm={4}>
							<FormControl onChange={ this.onIncidentDetailsEndDateEndChange } type="date" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Número de sessões</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onIncidentDetailsNumberOfSessionsChange } type="number" placeholder="Número de sessões" autoComplete="false" />
						</Col>
					</FormGroup>
					<button
						type="submit"
						className="btn btn-primary"
						style={ style.incidentSaveButton } >
						Pesquisar
					</button>
				</Form>
			</div>
		);
	}
}

export default SearchIncidentForm;