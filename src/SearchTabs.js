import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import SearchIncidentForm from './SearchIncidentForm';
import SearchUserForm from './SearchUserForm';

class SearchTabs extends React.Component {
	render() {
		return (
			<div>
				<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
					<Tab eventKey={1} title="Fichas">
						<SearchIncidentForm onIncidentSearch={ this.props.onIncidentSearch } />
					</Tab>
					<Tab eventKey={2} title="Utentes" disabled>
						<SearchUserForm />
					</Tab>
				</Tabs>
			</div>
		);
	}
}

export default SearchTabs;