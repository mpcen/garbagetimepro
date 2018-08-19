import React from 'react';

import '../styles/LeagueHeader.css';

const LeagueHeader = props => {
	return (
		<div className="league-header-container">
			<h1>{props.leagueName}</h1>
		</div>
	);
};

export default LeagueHeader;