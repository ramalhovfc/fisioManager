import React from 'react';
import axios from 'axios';

class Backup extends React.Component {
	constructor() {
		super();

		this.state = {
			msg: 'A preparar backup...'
		}
	}
	componentDidMount() {
		axios.get(`${this.props.route.backupUrl}`)
			.then(res => {
				this.setState({
					msg: 'Downloading backup...'
				});
			});
	}

	render() {
		return (
			<h4>{ this.state.msg }</h4>
		);
	}
}

export default Backup;