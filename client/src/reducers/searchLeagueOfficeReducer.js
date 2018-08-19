import {
	UPDATE_LEAGUE_OFFICE_URL,
	SEARCH_LEAGUE_OFFICE,
	SEARCH_LEAGUE_OFFICE_SUCCESS,
	SEARCH_LEAGUE_OFFICE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	text: '',
	loading: false,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case UPDATE_LEAGUE_OFFICE_URL:
			return {
				...state,
				text: action.payload.text
			};

		case SEARCH_LEAGUE_OFFICE:
			return {
				...state,
				loading: true,
				error: ''
			};

		case SEARCH_LEAGUE_OFFICE_SUCCESS:
			return {
				...state,
				loading: false,
				error: ''
			};

		case SEARCH_LEAGUE_OFFICE_FAIL:
			return {
				...state,
				text: '',
				loading: false,
				error: action.payload.error
			};

		default:
			return state;
	}
}