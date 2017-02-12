import React from 'react';
import {browserHistory} from 'react-router';
import style from './style';

const MIN_QUERY_LENGTH = 3;

class UserSearchForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onEnter = this.onEnter.bind(this);
		this.onAddUserButtonClick = this.onAddUserButtonClick.bind(this);
	}

	onInputChange(e) {
		let name = e.target.value.trim();
		this.setState({ name: name });
		if (!name || name.length < MIN_QUERY_LENGTH) {
			this.props.onTooBroadSearch();
			return;
		}
		this.props.onUserSubmit({ 'name': name });
	}

	onEnter(e) {
		e.preventDefault();
	}

	onAddUserButtonClick(e) {
		e.preventDefault();
		browserHistory.push('/user/add/' + this.state.name);
	}

	render() {
		return (
			<form style={ style.commentForm } onSubmit={ this.onEnter } >
				<input
					type="text"
					placeholder="Introduzir nome (mínimo 3 caracteres)"
					style={ style.commentFormText}
					value={ this.state.text }
					onChange={ this.onInputChange } />
				{ (this.state.name.length >= MIN_QUERY_LENGTH)
					? (<button
						type="button"
						className="btn btn-primary"
						style={ style.userAddButton }
						onClick={ this.onAddUserButtonClick }>
						Adicionar
					</button>)
					: null
				}
			</form>
		)
	}
}

export default UserSearchForm;