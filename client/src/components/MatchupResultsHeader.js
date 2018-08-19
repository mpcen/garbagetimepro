import React from 'react';
import { Image } from 'semantic-ui-react';

import '../styles/MatchupResultsHeader.css';

const MatchupResultsHeader = props => {
	return (
		<div className="matchup-results-header">
			<div className="team-header">
				<div className="team-avatar-container">
					{/*<img src={props.team1.avatarURL} alt={`${props.team1.name}`} />*/}
					<Image src={props.team1.avatarURL} size="small" />
				</div>

				<div className="team-info-container">
					<h2>{props.team1.name}</h2>

					<div>
					<p className="team-header-record">
						Actual Record: {`${props.team1.record.wins}-${props.team1.record.losses}-${props.team1.record.ties}`}
					</p>					
					<p className="team-header-record">
						Garbage Time Record: <br className="gtr-break" />{`${props.team1Results.wins}-${props.team1Results.losses}-${props.team1Results.ties}`}
					</p>
					</div>
				</div>
			</div>

			<div className="team-header">
				<div className="team-avatar-container">
					{/*<img src={props.team2.avatarURL} alt={`${props.team2.name}`} />*/}
					<Image src={props.team2.avatarURL} size="small" />
				</div>

				<div className="team-info-container">
					<h2>{props.team2.name}</h2>
					
					<div>
					<p className="team-header-record">
						Actual Record: {`${props.team2.record.wins}-${props.team2.record.losses}-${props.team2.record.ties}`}
					</p>
					
					<p className="team-header-record">
						Garbage Time Record: <br className="gtr-break" />{`${props.team2Results.wins}-${props.team2Results.losses}-${props.team2Results.ties}`}
					</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MatchupResultsHeader;