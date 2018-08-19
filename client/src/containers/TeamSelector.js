import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Dropdown } from 'semantic-ui-react';
import '../styles/TeamSelector.css';

import { updateTeamSelect } from '../actions/leagueContainerActions';

class TeamSelector extends Component {
	constructor(props) {
		super(props);
		this.handleTeamSelect = this.handleTeamSelect.bind(this);
	}

	handleTeamSelect(event, data) {
		this.props.updateTeamSelect(this.props.teams, data.id, data.value);
	}

	renderTeamOptions(teamSelector) {
		// teamSelector and opponent is an integer (1 or 2)
		// selector is a string 'team2Id' or 'team1Id'

		const opponent = teamSelector === 1 ? 2 : 1;
		const selector = `team${opponent}Id`;

		// teams are the available teams to select in the dropdown menu.
		// the opponent of the team should not be in this list
		let teams = this.props.teams.filter(team => team.id !== this.props[selector]);

		return teams.map(team => {
			return {
				text: team.name,
				value: team.id,
				image: {
					avatar: true,
					size: 'tiny',		
					src: team.avatarURL,
					wrapped: true,
					className: 'team-avatar'
				}
			};
		});
	}

	render() {		
		return (
			<Dropdown
				id={`select-team${this.props.teamSelector.toString()}`}
				placeholder={`Select team ${this.props.teamSelector}`}
				className="team-selector"
				onChange={this.handleTeamSelect}
				selection
				value={this.props.value >= 0 ? this.props.value : ''}
				options={this.renderTeamOptions(this.props.teamSelector)}
			/>
		);
	}
};

const mapStateToProps = state => {
	return {
		teams: state.league.teams,
		team1Id: state.league.selectedTeam1Id,
		team2Id: state.league.selectedTeam2Id
	};
};

export default connect(mapStateToProps, { updateTeamSelect })(TeamSelector);