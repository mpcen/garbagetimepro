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
		const leagueRouteArr = leagueRoute.split('/');
		const compareRoute = leagueRouteArr.some(route => route === 'compare');
		const powerRankingsRoute = leagueRouteArr.some(route => route === 'rankings');
		const statsRoute = leagueRouteArr.some(route => route === 'stats');

		if(compareRoute) {
			this.setState({ activeRoute: 'compare' });
		} else if(powerRankingsRoute) {
			this.setState({ activeRoute: 'rankings' });
		} else if(statsRoute) {
			this.setState({ activeRoute: 'stats' });
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

					<li className={this.state.activeRoute === 'stats' ? 'leagueRoute-active' : ''}>
						<Link to={`/league/${this.props.leagueId}/stats`}>
							Stats
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