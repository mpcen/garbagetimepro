import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Sidebar } from 'semantic-ui-react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../utils/historyUtil';

import '../styles/Main.css';
import NavBar from './NavBar';
//import LeagueSearchBar from './LeagueSearchBar';
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

					{/*
					<Sidebar.Pushable className="main-pushable-container">
						<Sidebar
							animation="overlay"
							direction="top"
							visible={this.props.searchBarVisible}
						>
							<LeagueSearchBar />
						</Sidebar>
						
						<Sidebar.Pusher className="main-content">
							<Switch>
								<Route exact path="/" component={Home} />
								<Route path="/league/:leagueId" component={League} />
								<Route render={() => <h2>not found</h2>} />
							</Switch>
						</Sidebar.Pusher>
					</Sidebar.Pushable>		
					*/}			
				</div>
			</Router>
		);
	}
};

const mapStateToProps = state => {
	return {
		//searchBarVisible: state.navBar.searchBarVisible,
		loading: state.searchLeagueOffice.loading
	};
};

export default connect(mapStateToProps)(Main);

