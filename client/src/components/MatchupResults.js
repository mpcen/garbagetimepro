import React from 'react';

import '../styles/MatchupResults.css';
import MatchupResultsHeader from './MatchupResultsHeader';
import MatchupResultsList from './MatchupResultsList';

const renderResults = (teams, team1, team1Results, team2, team2Results) => {
	if(!Object.keys(team1Results).length && !Object.keys(team2Results).length) {
		return (
			<div/>
			
		);
	} else {
		return (
			<div className="matchup-results-container">
				<MatchupResultsHeader
					team1={team1}
					team2={team2}
					team1Results={team1Results} 
					team2Results={team2Results}
				/>

				<MatchupResultsList
					weeks={team1Results.matchups.length}
					teams={teams}
					team1={team1}
					team2={team2}
					team1Results={team1Results}
					team2Results={team2Results}
				/>
			</div>
		);
	}
};

const MatchupResults = props => {
	return renderResults(props.teams, props.team1, props.team1Results, props.team2, props.team2Results);
};

export default MatchupResults;