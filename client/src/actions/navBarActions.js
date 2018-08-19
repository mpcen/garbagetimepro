import { TOGGLE_SEARCH_BAR } from './types';

export const toggleSearchBar = visible => {
	return {
		type: TOGGLE_SEARCH_BAR,
		payload: {
			isVisible: !visible
		}
	}
};