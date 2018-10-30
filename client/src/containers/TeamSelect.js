import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import '../styles/TeamSelect.css';
import { updateTeamSelect, compareTeams } from '../actions/leagueContainerActions';
import TeamSelector from './TeamSelector';

class TeamSelect extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleTeamSelections = this.handleTeamSelections.bind(this);
	}

	componentDidMount() {
		if (
			(Number(this.props.match.params.team1Id) === Number(this.props.match.params.team2Id))
			|| isNaN(Number(this.props.match.params.team1Id))
			|| isNaN(Number(this.props.match.params.team2Id))
			|| (Number(this.props.match.params.team1Id) <= 0
			|| Number(this.props.match.params.team2Id) <= 0)
		) {
			this.props.history.replace(`/league/${this.props.match.params.leagueId}/compare`);
		} else if(this.props.leagueId && this.props.match.params.team1Id && this.props.match.params.team2Id) {
			this.handleTeamSelections(
				this.props.leagueId,
				this.props.completedWeeks,
				this.props.teams,
				this.props.match.params.team1Id,
				this.props.match.params.team2Id
			);
		}
	}

	componentWillReceiveProps(nextProps) {
		if(
			(this.props.teams.some(team => team.id === Number(nextProps.match.params.team1Id)) && this.props.teams.some(team => team.id === Number(nextProps.match.params.team2Id)))
			&& (nextProps.match.params.team1Id && nextProps.match.params.team2Id)
			&& (Number(nextProps.match.params.team1Id) !== nextProps.team1.id || Number(nextProps.match.params.team2Id) !== nextProps.team2.id)
		) {
			this.handleTeamSelections(
				this.props.leagueId, 
				this.props.teams, 
				nextProps.match.params.team1Id, 
				nextProps.match.params.team2Id
			);
		}
	}

	handleTeamSelections(leagueId, completedWeeks, teams, team1Id, team2Id) {
		this.props.updateTeamSelect(teams, 'select-team1', Number(team1Id));
		this.props.updateTeamSelect(teams, 'select-team2', Number(team2Id));
		this.props.compareTeams(leagueId, completedWeeks, teams, Number(team1Id), Number(team2Id));
	}

	handleClick() {
		if(Number(this.props.match.params.team1Id) !== this.props.selectedTeam1Id || Number(this.props.match.params.team2Id) !== this.props.selectedTeam2Id) {
			this.props.history.push(`/league/${this.props.leagueId}/compare/${this.props.selectedTeam1Id}/${this.props.selectedTeam2Id}`);
			this.props.compareTeams(this.props.leagueId, this.props.completedWeeks, this.props.teams, this.props.selectedTeam1Id, this.props.selectedTeam2Id);
		}
	}

	render() {
		return (
			<div className="team-select-container">

				<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
					<p className="team-select-msg">
						Select two teams to compare schedules
					</p>
					
					<div className="selector-container">
						<TeamSelector teamSelector={1} value={this.props.selectedTeam1Id} />
						<TeamSelector teamSelector={2} value={this.props.selectedTeam2Id} />
					</div>
				</div>

				<Button
					className="btn-compare-teams"
					onClick={this.handleClick}
				>
					Compare
				</Button>

				<p style={{ color: 'red' }}>
					{this.props.error}
				</p>				
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		leagueId: state.league.leagueId,
		completedWeeks: state.league.completedWeeks,
		teams: state.league.teams,
		selectedTeam1Id: state.league.selectedTeam1Id,
		selectedTeam2Id: state.league.selectedTeam2Id,
		team1: state.league.team1,
		team2: state.league.team2,
		error: state.league.error
	};
};

export default connect(mapStateToProps, { compareTeams, updateTeamSelect })(TeamSelect);