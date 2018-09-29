import axios from 'axios';

import history from '../utils/historyUtil';

import {
	UPDATE_LEAGUE_OFFICE_URL,
	SEARCH_LEAGUE_OFFICE,
	SEARCH_LEAGUE_OFFICE_SUCCESS,
	SEARCH_LEAGUE_OFFICE_FAIL
} from './types';

import {
	sortMatches
} from '../utils/leagueContainerUtils';

export const updateSearchLeagueText = text => {
	return {
		type: UPDATE_LEAGUE_OFFICE_URL,
		payload: {
			text
		}
	};
};

export const searchLeagueOffice = (route, text) => {
	let leagueURL = null,
		leagueId = null;

	try {
		leagueURL = new URL(text);
		leagueId = leagueURL.searchParams.get('leagueId');

		if ((leagueURL && leagueURL.hostname !== 'games.espn.com') ||
			(leagueURL && leagueURL.hostname === 'games.espn.com' && !leagueId)) {
			throw new Error('force')
		}
	} catch (e) {
		if (!text || !Number(text) || e === 'force') {
			return {
				type: SEARCH_LEAGUE_OFFICE_FAIL,
				payload: {
					error: 'Invalid League ID or League Office URL'
				}
			};
		}

		leagueId = text;
	}

	return dispatch => {
		dispatch({
			type: SEARCH_LEAGUE_OFFICE
		});

		axios.get(`/api/league/${leagueId}/2018`)
			.then(res => {
				//if there's a new league coming in, push a new route onto history stack
				if (!route) {
					history.push(`/league/${leagueId}/compare`);
				}

				res.data.teams.forEach(team => {
					sortMatches(team.matches);
				});

				dispatch({
					type: SEARCH_LEAGUE_OFFICE_SUCCESS,
					payload: {
						leagueData: res.data
					}
				});
			})
			.catch(err => {
				dispatch({
					type: SEARCH_LEAGUE_OFFICE_FAIL,
					payload: {
						error: 'Either your league is private or the ID of the league or team you entered is invalid.'
					}
				})
			});
	}
};