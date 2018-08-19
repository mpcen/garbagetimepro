import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';

import { generatePowerRankings } from '../actions/leagueContainerActions';
import '../styles/PowerRankings.css';

class PowerRankings extends Component {
	componentDidMount() {
		// debugger;
		if(this.props.teams.length) {
			this.props.generatePowerRankings(this.props.teams);
		}
	}

	componentWillReceiveProps(nextProps) {
		// debugger;
	}

	renderPowerRankings(powerRankings) {
		// debugger;
		if(!powerRankings) {
			return <div />
		} else {
			return (
				<ul className="powerrankings-list">
					<div className="powerrankings-list-header">
						<div></div>
						<div className="powerrankings-list-header-rank">
							<h3>Rank</h3>
						</div>

						<div className="powerrankings-list-header-team">
							<h3>Team</h3>
						</div>

						<div className="powerrankings-list-header-pr-points">
							<h3>PR Points</h3>
						</div>
					</div>
					
					{powerRankings.map((powerRank, index) => {
						const team = this.props.teams.find(team => {
							return powerRank.teamId === team.id;
						});

						return (
							
							<li
							key={team.id}
							className="powerrankings-team-container">
								<div className="powerrankings-team-rank">
									<h1>
										{`${index + 1}`}
									</h1>
								</div>
								
								<div className="powerrankings-team-info">
									<div className="powerrankings-team-avatar-container">
										<Image src={team.avatarURL} size="small" />
									</div>

									<div className="powerrankings-team-name">
										<h2>{team.name}</h2>
									</div>
								</div>

								<div className="powerrankings-team-powerRankPoints">
									<h1>{`${powerRank.powerRankPoints.toFixed(2)}`}</h1>
								</div>
							</li>
						);
					})}
				</ul>
			);
		}
	}

	render() {
		return (
			<div className="powerrankings-container">
				<div className="powerrankings-title">
					<h2>Power Rankings</h2>
					<p>(Through {this.props.completedWeeks} Weeks)</p>
				</div>

				{this.renderPowerRankings(this.props.powerRankings)}
			</div>
		);	
	}
};

const mapStateToProps = state => {
	return {
		teams: state.league.teams,
		completedWeeks: state.league.completedWeeks,
		powerRankings: state.league.powerRankings
	}
}

export default connect(mapStateToProps, { generatePowerRankings })(PowerRankings);