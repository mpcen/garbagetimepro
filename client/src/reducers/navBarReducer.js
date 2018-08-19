import {
	SEARCH_LEAGUE_OFFICE,
	SEARCH_LEAGUE_OFFICE_SUCCESS,
	SEARCH_LEAGUE_OFFICE_FAIL,
	TOGGLE_SEARCH_BAR
} from '../actions/types';

const INITIAL_STATE = {
	searchBarVisible: false
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case TOGGLE_SEARCH_BAR:
			return {
				...state,
				searchBarVisible: action.payload.isVisible
			}

		case SEARCH_LEAGUE_OFFICE:
			return {
				...state,
				searchBarVisible: false,
			}

		case SEARCH_LEAGUE_OFFICE_SUCCESS:
			return {
				...state,
			}

		case SEARCH_LEAGUE_OFFICE_FAIL:
			return {
				...state,
			}
		
		default:
			return state;
	}
};