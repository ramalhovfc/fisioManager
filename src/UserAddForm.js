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
	}

	onUserNameChange(e) {
		this.props.onUserFieldChange(NAME, e.target.value, this.props.data["_id"]);
	}

	onUserTelephoneChange(e) {
		this.props.onUserFieldChange(TELEPHONE, e.target.value, this.props.data["_id"]);
	}

	onUserTaxNumberChange(e) {
		this.props.onUserFieldChange(TAXNUMBER, e.target.value, this.props.data["_id"]);
	}

	onUserGenreChange(e) {
		this.props.onUserFieldChange(GENRE, e.target.value, this.props.data["_id"]);
	}

	onUserPostalAddressChange(e) {
		this.props.onUserFieldChange(POSTALADDRESS, e.target.value, this.props.data["_id"]);
	}

	onUserJobChange(e) {
		this.props.onUserFieldChange(JOB, e.target.value, this.props.data["_id"]);
	}

	onFormSubmit(e) {
		e.preventDefault();
		let _id = this.props.data["_id"] && this.props.data["_id"].slice();
		let name = (this.props.data.name) ? this.props.data.name.trim() : undefined;
		let telephone = (this.props.data.telephone) ? this.props.data.telephone.trim() : undefined;
		let taxNumber = (this.props.data.taxNumber) ? this.props.data.taxNumber.trim() : undefined;
		let genre = (this.props.data.genre) ? this.props.data.genre.trim() : undefined;
		let postalAddress = (this.props.data.postalAddress) ? this.props.data.postalAddress.trim() : undefined;
		let job = (this.props.data.job) ? this.props.data.job.trim() : undefined;

		this.props.onUserSave({
			_id: _id,
			name: name,
			telephone: telephone,
			taxNumber: taxNumber,
			genre: genre,
			postalAddress: postalAddress,
			job: job
		});
	}

	render() {
		return (
			<div style={ style.incidentDetailsContainer }>
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
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Contribuinte</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onUserTaxNumberChange } type="number" placeholder="Contribuinte" defaultValue={ this.props.data.taxNumber } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontal">
						<Col componentClass={ControlLabel} sm={2}>Género</Col>
						<Col sm={10}>
							<FormControl onChange={ this.onUserGenreChange } type="text" placeholder="Género" defaultValue={ this.props.data.genre } />
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