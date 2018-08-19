import { combineReducers } from 'redux';

import searchLeagueOfficeReducer from './searchLeagueOfficeReducer';
//import navBarReducer from './navBarReducer';
import leagueReducer from './leagueReducer';

export default combineReducers({
	searchLeagueOffice: searchLeagueOfficeReducer,
	//navBar: navBarReducer,
	league: leagueReducer
});