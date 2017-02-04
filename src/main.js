import React from 'react';
import {Link} from 'react-router';

class Main extends React.Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-default">
					<div className="container-fluid">
						<div className="navbar-header">
							<a className="navbar-brand" href="/">FISIOESTE</a>
						</div>
						<div id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav">
								<li><Link to="/" activeClassName="active">Procurar</Link></li>
								<li><Link to="/openIncidents" activeClassName="active">Fichas abertas</Link></li>
								<li><Link to="/backup" activeClassName="active">Backup</Link></li>
								<li><Link to="/about" activeClassName="active">Acerca</Link></li>
							</ul>
						</div>
					</div>
				</nav>
				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	};
}

export default Main;