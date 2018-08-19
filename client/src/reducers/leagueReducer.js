import {
	SEARCH_LEAGUE_OFFICE,
	SEARCH_LEAGUE_OFFICE_SUCCESS,
	UPDATE_TEAM_SELECT,
	UPDATE_TEAM_SELECT_FAIL,
	COMPARE_TEAMS,
	COMPARE_TEAMS_FAIL,
	GENERATE_POWER_RANKINGS
} from '../actions/types';

const INITIAL_STATE = {
	leagueName: '',
	leagueId: null,
	teams: [],
	selectedTeam1Id: -1,
	selectedTeam2Id: -1,
	team1Id: -1,
	team2Id: -1,
	team1: {},
	team2: {},
	team1Results: {},
	team2Results: {},
	error: '',
	completedWeeks: null,
	powerRankings: []
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case SEARCH_LEAGUE_OFFICE: 
			return {
				...state,
				teams: [],
				powerRankings: [],
				error: ''
			}

		case SEARCH_LEAGUE_OFFICE_SUCCESS:
			return {
				...state,				
				team1Id: -1,
				team2Id: -1,
				selectedTeam1Id: -1,
				selectedTeam2Id: -1,
				team1: {},
				team2: {},
				team1Results: {},
				team2Results: {},				
				leagueName: action.payload.leagueData.leagueName,
				leagueId: action.payload.leagueData.leagueId,
				teams: action.payload.leagueData.teams,
				completedWeeks: action.payload.leagueData.completedWeeks,
				powerRankings: []
			};

		case UPDATE_TEAM_SELECT:
			return {
				...state,
				[action.payload.teamSelector]: action.payload.teamId
			};

		case UPDATE_TEAM_SELECT_FAIL:
			return {
				...state,
				error: action.payload.error,

			};

		case COMPARE_TEAMS:
			return {
				...state,
				team1: action.payload.team1,
				team2: action.payload.team2,
				team1Results: action.payload.team1Results,
				team2Results: action.payload.team2Results,
				error: ''
			};

		case COMPARE_TEAMS_FAIL:
			return {
				...state,
				error: action.payload.error,
				team1Id: -1,
				team2Id: -1,
				selectedTeam1Id: -1,
				selectedTeam2Id: -1,
				team1Results: {},
				team2Results: {}
			};

		case GENERATE_POWER_RANKINGS:
			return {
				...state,
				powerRankings: action.payload
			}

		default:
			return state;
	}
};