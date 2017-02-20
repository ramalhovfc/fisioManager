import React from 'react';
import {Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import style from './style';

const NAME = 'name';
const TELEPHONE = 'telephone';
const TAXNUMBER = 'taxNumber';
const GENRE = 'genre';
const POSTALADDRESS = 'postalAddress';
const JOB = 'job';

class SearchUserForm extends React.Component {
	constructor() {
		super();
		this.state = {
			userSearch: {},
			searchDisabled: true
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.onUserNameChange = this.onUserNameChange.bind(this);
		this.onUserTelephoneChange = this.onUserTelephoneChange.bind(this);
		this.onUserTaxNumberChange = this.onUserTaxNumberChange.bind(this);
		this.onUserGenreChange = this.onUserGenreChange.bind(this);
		this.onUserPostalAddressChange = this.onUserPostalAddressChange.bind(this);
		this.onUserJobChange = this.onUserJobChange.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		let name = (this.state.userSearch.name) ? this.state.userSearch.name.trim() : undefined;
		let telephone = (this.state.userSearch.telephone) ? this.state.userSearch.telephone.trim() : undefined;
		let taxNumber = (this.state.userSearch.taxNumber) ? this.state.userSearch.taxNumber.trim() : undefined;
		let genre = (this.state.userSearch.genre) ? this.state.userSearch.genre.trim() : undefined;
		let postalAddress = (this.state.userSearch.postalAddress) ? this.state.userSearch.postalAddress.trim() : undefined;
		let job;
		if (this.state.userSearch.job) {
			job = this.state.userSearch.job.job || this.state.userSearch.job;
			job = (job) ? job.trim() : undefined;
		}

		this.props.onUserSearch({
			name: name,
			telephone: telephone,
			taxNumber: taxNumber,
			genre: genre,
			postalAddress: postalAddress,
			job: job
		});
	}

	onUserNameChange(e) {
		this.onUserFieldChange(NAME, e.target.value);
	}

	onUserTelephoneChange(e) {
		this.onUserFieldChange(TELEPHONE, e.target.value);
	}

	onUserTaxNumberChange(e) {
		this.onUserFieldChange(TAXNUMBER, e.target.value);
	}

	onUserGenreChange(e) {
		this.onUserFieldChange(GENRE, e.target.value);
	}

	onUserPostalAddressChange(e) {
		this.onUserFieldChange(POSTALADDRESS, e.target.value);
	}

	onUserJobChange(e) {
		let value;
		if (e && e.length) {
			value = e[0].customOption ? e[0].insurance : e[0];
		} else {
			value = undefined;
		}
		this.onUserFieldChange(JOB, value);
	}

	onUserFieldChange(field, value) {
		let userSearch = Object.assign({}, this.state.userSearch);
		userSearch[field] = value;
		this.setState({
			searchDisabled: false,
			userSearch: userSearch
		});
	}

	render() {
		return (
			<div style={ style.incidentDetailsContainer }>
				<Form horizontal onSubmit={ this.handleSubmit } autoComplete="false">
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Nome</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onUserNameChange } type="text" placeholder="Nome" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Telefone</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onUserTelephoneChange } type="number" placeholder="Telefone" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Contribuinte</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onUserTaxNumberChange } type="number" placeholder="Contribuinte" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formControlsSelect">
						<Col componentClass={ControlLabel} sm={2}>Género</Col>
						<Col sm={10}>
							<FormControl componentClass="select" onChange={ this.onUserGenreChange }>
								<option value=""></option>
								<option value="Masculino">Masculino</option>
								<option value="Feminino">Feminino</option>
							</FormControl>
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Morada</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onUserPostalAddressChange } type="text" placeholder="Morada" />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Profissão</Col>
						<Col sm={10}>
							<Typeahead onChange={ this.onUserJobChange } options={ this.props.data.lookups.job || [] } labelKey={'job'} placeholder="Profissão" allowNew={ true } newSelectionPrefix={''} paginationText={'Mostrar mais...'} emptyLabel={'Sem resultados'} />
						</Col>
					</FormGroup>
					<button
						type="submit"
						className="btn btn-primary"
						style={ style.incidentSaveButton }
						disabled={ this.state.searchDisabled } >
						Pesquisar
					</button>
				</Form>
			</div>
		);
	}
}

export default SearchUserForm;