import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import SearchIncidentForm from './SearchIncidentForm';
import SearchUserForm from './SearchUserForm';
import IncidentSearchResults from './IncidentSearchResults';
import UserSearchResults from './UserSearchResults';

class SearchTabs extends React.Component {
	render() {
		return (
			<div>
				<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
					<Tab eventKey={1} title="Utentes" >
						<SearchUserForm data={{ lookups: this.props.data.lookups }} onUserSearch={ this.props.onUserSearch } />
						<UserSearchResults data={ this.props.data.users } />
					</Tab>
					<Tab eventKey={2} title="Fichas">
						<SearchIncidentForm data={{ lookups: this.props.data.lookups }} onIncidentSearch={ this.props.onIncidentSearch } />
						<IncidentSearchResults data={ this.props.data.incidents } />
					</Tab>
				</Tabs>
			</div>
		);
	}
}

export default SearchTabs;