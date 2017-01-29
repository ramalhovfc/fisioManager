import React from 'react';
import style from './style';

class UserForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { name: '' };
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(e) {
		let name = e.target.value.trim();
		this.setState({ name: name });
		if (!name || name.length < 3) {
			this.props.onTooBroadSearch();
			return;
		}
		this.props.onUserSubmit({ field: 'name', constraint: name });
	}

	render() {
		return (
			<form style={ style.commentForm } onSubmit={ this.onInputChange } >
				<input
					type='text'
					placeholder='Inserir pelo menos 3 caracteres...'
					style={ style.commentFormText}
					value={ this.state.text }
					onChange={ this.onInputChange } />
			</form>
		)
	}
}

export default UserForm;