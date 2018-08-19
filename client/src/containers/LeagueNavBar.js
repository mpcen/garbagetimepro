import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/LeagueNavBar.css';

class LeagueNavBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			leagueId: this.props.leagueId,
			activeRoute: null,
		};
	}

	componentDidMount() {
		this.parseRoute(this.props.leagueRoute);
	}

	componentWillReceiveProps(nextProps) {
		this.parseRoute(nextProps.leagueRoute);
	}

	parseRoute(leagueRoute) {
		let leagueRouteArr = leagueRoute.split('/');
		let compareRoute = leagueRouteArr.some(route => route === 'compare');
		let powerRankingsRoute = leagueRouteArr.some(route => route === 'rankings');

		if(compareRoute) {
			this.setState({
				activeRoute: 'compare'
			})
		} else if(powerRankingsRoute) {
			this.setState({
				activeRoute: 'rankings'
			})
		} else {
			this.setState({
				activeRoute: 'leagueHome'
			})
		}
	}

	render() {
		return (
			<div className="league-navigation-container">
				<ul className="league-navigation-list">
					{/*<li className={this.state.activeRoute === 'leagueHome' ? 'leagueRoute-active' : ''}>
						<Link to={`/league/${this.props.leagueId}`}>
							League Home
						</Link>
					</li>*/}
					
					<li className={this.state.activeRoute === 'compare' ? 'leagueRoute-active' : ''}>
						<Link to={`/league/${this.props.leagueId}/compare`}>
							Compare Teams
						</Link>
					</li>

					<li className={this.state.activeRoute === 'rankings' ? 'leagueRoute-active' : ''}>
						<Link to={`/league/${this.props.leagueId}/rankings`}>
							Power Rankings
						</Link>
					</li>
				</ul>
			</div>
		);
	}
};

export default LeagueNavBar;