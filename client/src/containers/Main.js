import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../utils/historyUtil';

import '../styles/Main.css';
import NavBar from './NavBar';
import Home from '../components/Home';
import League from './League';

class Main extends Component {
	render() {
		return (
			<Router history={history}>
				<div className="main-container">
					<NavBar />

					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/league/:leagueId" component={League} />
						<Route render={() => <h2>not found</h2>} />
					</Switch>		
				</div>
			</Router>
		);
	}
};

const mapStateToProps = state => {
	return {
		loading: state.searchLeagueOffice.loading
	};
};

export default connect(mapStateToProps)(Main);

