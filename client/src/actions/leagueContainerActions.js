import _ from 'lodash';

import {
	UPDATE_TEAM_SELECT,
	UPDATE_TEAM_SELECT_FAIL,
	COMPARE_TEAMS,
	COMPARE_TEAMS_FAIL,
	GENERATE_POWER_RANKINGS
} from './types';

import {
	getTeamOpponents,
	generateResults
} from '../utils/leagueContainerUtils';

export const updateTeamSelect = (teams, teamSelector, teamId) => {
	if (isNaN(teamId) || teamId <= 0) {
		return {
			type: UPDATE_TEAM_SELECT_FAIL,
			payload: {
				error: 'You must select a valid team'
			}
		};
	}

	let exists = teams.some(team => team.id === teamId);

	if (!exists) {
		return {
			type: UPDATE_TEAM_SELECT_FAIL,
			payload: {
				error: 'You must select a valid team'
			}
		};
	}

	return {
		type: UPDATE_TEAM_SELECT,
		payload: {
			teamSelector: teamSelector === 'select-team1' ? 'selectedTeam1Id' : 'selectedTeam2Id',
			teamId
		}
	};
};

export const compareTeams = (leagueId, completedWeeks, teams, team1Id, team2Id) => {
	if (
		team1Id <= 0
		|| team2Id <= 0
		|| isNaN(team1Id)
		|| isNaN(team2Id)
		|| team1Id === team2Id
		|| (!teams.some(team => team.id === team1Id)
		|| !teams.some(team => team.id === team2Id))
	) {
		return {
			type: COMPARE_TEAMS_FAIL,
			payload: {
				error: 'You must select two valid teams'
			}
		}
	}

	let team1 = _.cloneDeep(teams.find(team => team.id === team1Id));
	let team2 = _.cloneDeep(teams.find(team => team.id === team2Id));

	if (team1 === undefined || team2 === undefined) {
		return {
			type: COMPARE_TEAMS_FAIL,
			payload: {
				error: 'You must select two valid teams'
			}
		}
	}

	if (team1 === undefined || team2 === undefined) {
		return {
			type: COMPARE_TEAMS_FAIL,
			payload: {
				error: 'You must select two valid teams'
			}
		}
	}
	
	let team1Opponents = getTeamOpponents(team1.matches, completedWeeks);
	let team2Opponents = getTeamOpponents(team2.matches, completedWeeks);

	let team1Results = generateResults(team1, team2, team2Opponents);
	let team2Results = generateResults(team2, team1, team1Opponents);

	return {
		type: COMPARE_TEAMS,
		payload: {
			team1,
			team2,
			team1Results,
			team2Results
		}
	};
};

export const generatePROpponentPoints = numberOfTeams => {
	let key = {};
	let winCounter = numberOfTeams / 2;
	let lossCounter = -0.5;
	let tieCounter = winCounter / 2;

	for (let i = 1; i <= numberOfTeams; i++) {
		key[i] = {};
		key[i].win = winCounter;
		key[i].loss = lossCounter;
		key[i].tie = tieCounter;

		winCounter -= 0.5;
		lossCounter -= 0.5;
		tieCounter -= 0.25;
	}

	return key;
}

export const generatePowerRankings = teams => {
	let opponentRankTable = generatePROpponentPoints(teams.length);

	// MANUALLY CALCULATE STREAK
	// let teamStreaks = teams.map(team => {
	// 	const teamId = team.id;
	// 	let streak = 0;

	// 	team.matches.forEach(({ score, opponent }) => {
	// 		let win = score > opponent.score ? 1 : 0;
	// 		let loss = score < opponent.score ? 1 : 0;

	// 		if(win === 1) {
	// 			if(streak > 0) {
	// 				streak++;
	// 			} else {
	// 				streak = 1;
	// 			}
	// 		} else if(loss === 1) {
	// 			if(streak < 0) {
	// 				streak--;
	// 			} else {
	// 				streak = -1
	// 			}
	// 		}
	// 	});

	// 	return { teamId, streak };
	// });

	// initialize empty week array
	let weeklyTeamPointsFor = new Array(teams[0].matches.length).fill().map(index => []);

	// iterate through each teams matches and store PF into weeklyTeamPointsFor arr
	teams.forEach(team => {
		team.matches.forEach(match => {
			weeklyTeamPointsFor[match.week - 1].push({
				teamId: team.id,
				pointsFor: match.score
			});
		});
	});

	// sort each week to determine ranks
	weeklyTeamPointsFor.forEach(week => {
		week.sort((team1, team2) => {
			return team2.pointsFor - team1.pointsFor;
		});
	});

	let powerRankings = teams.map(team => {
		let powerRankPoints = 0;
		let streak = Number(team.streak.substr(1));

		team.matches.forEach(match => {
			let opponentRank = weeklyTeamPointsFor[match.week - 1].findIndex(team => team.teamId === match.opponent.id) + 1;
			let opponentScore = 0;

			if (match.score > match.opponent.score) {
				opponentScore = opponentRankTable[opponentRank].win
			} else if (match.score < match.opponent.score) {
				opponentScore = opponentRankTable[opponentRank].loss
			} else if (match.score === match.opponent.score) {
				opponentScore = opponentRankTable[opponentRank].tie
			}

			powerRankPoints += (match.score / 10) + opponentScore
		});

		powerRankPoints += (5 * team.record.wins) + (-2 * team.record.losses) + (1.5 * team.record.ties) + streak;

		return {
			teamId: team.id,
			powerRankPoints
		};
	});

	powerRankings.sort((team1, team2) => {
		return team2.powerRankPoints - team1.powerRankPoints;
	});

	return {
		type: GENERATE_POWER_RANKINGS,
		payload: powerRankings
	}
}