import React from 'react';
import axios from 'axios';
import style from './style';

class IncidentPrint extends React.Component {
	constructor() {
		super();

		this.state = {
			incident: null
		};
	}

	componentWillMount() {
		var incidentSearch = {
			_id: this.props.params.incident_id
		};

		axios.get(`${this.props.route.incidentSearchUrl}`, {params: {incidentSearch: incidentSearch}})
			.catch((error) => {
				// this.setState({
				// 	userAddError: (error.response && error.response.data) || 'Ocorreu um erro ao obter lookups'
				// });
				return Promise.reject();
			})
			.then((incidentDetails) => {
				var incident = incidentDetails.data;
				if (incident.startDate) {
					incident.startDate = incident.startDate.slice(0, 10);
				}
				if (incident.endDate) {
					incident.endDate = incident.endDate.slice(0, 10);
				}

				this.setState({
					incident: incident
				});
			});
	}

	componentDidUpdate() {
		if (this.state.incident && this.state.incident['_user']) {
			setTimeout(window.print, 1000);
		}
	}

	render() {
		if (this.state.incident && this.state.incident['_user']) {
			return (
				<div>
					<img src="fisioeste-logo.jpg" alt="Fisioeste" style={ style.printLogo } />
					<div style={ style.userDetailsContainer }>
						<h2 style={ style.usernameInUserDetails }>{ this.state.incident['_user'].name }</h2>
						<dl className="dl-horizontal">
							<dt>Telefone</dt>
							<dd>{ this.state.incident['_user'].telephone }</dd>
							<dt>Contribuinte</dt>
							<dd>{ this.state.incident['_user'].taxNumber }</dd>
							<dt>Sexo</dt>
							<dd>{ this.state.incident['_user'].genre }</dd>
							<dt>Morada</dt>
							<dd>{ this.state.incident['_user'].postalAddress }</dd>
							<dt>Profissão</dt>
							<dd>{ this.state.incident['_user'].job }</dd>
							<br/>
							<dt>Seguro</dt>
							<dd>{ this.state.incident.insurance }</dd>
							<dt>Apólice</dt>
							<dd>{ this.state.incident.insurancePolicy }</dd>
							<dt>Fisioterapeuta</dt>
							<dd>{ this.state.incident.physiotherapist }</dd>
							<dt>Médico</dt>
							<dd>{ this.state.incident.doctor }</dd>
							<dt>Número sessões</dt>
							<dd>{ this.state.incident.numberOfSessions }</dd>
							<dt>Data início</dt>
							<dd>{ this.state.incident.startDate }</dd>
							<dt>Data fim</dt>
							<dd>{ this.state.incident.endDate }</dd>
							<dt>Observações</dt>
							<dd>{ this.state.incident.publicNotes }</dd>
						</dl>
					</div>
				</div>
			);
		}

		return ( <div>Loading...</div> );
	}
}

export default IncidentPrint;