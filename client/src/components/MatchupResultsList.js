import React from 'react';
import { Image } from 'semantic-ui-react';

import '../styles/MatchupResultsList.css';

const winOrLoss = result => result === true ? 'win' : 'loss';

const renderWeeks = (weeks, teams, team1, team1Results, team2, team2Results) => {
	let matchups = [];

	for(let i = 0; i < weeks; i++) {
		matchups.push(
			<li
				key={i}
				className="matchup-results-week"
			>
				{ /*TEAM 1 (LEFT SIDE)*/ }
				<div className={`team-result ${winOrLoss(team1Results.matchups[i].score > team1Results.matchups[i].opponentScore)}`}>
					<ul className="matchup-container">
						{ /*TEAM 1 (TOP SIDE)*/ }
						<li>
							{/*<img className="team-avatar" src={team1.avatarURL} alt={`${team1.name}`} />*/}
							<Image className="team-avatar" src={team1.avatarURL} />

							<span className="team-name">{team1.name}</span>
							<span className="team-name abbrev">{team1.abbrev}</span>
							
							<span className="score">
								{team1Results.matchups[i].score}
							</span>
						</li>
						
						{ /*OPPONENT (BOTTOM SIDE)*/ }
						<li>
							{/*<img className="team-avatar" src={teams.find(team => {
								return team.id === team1Results.matchups[i].opponentId
							}).avatarURL} alt="Opponent Avatar" />*/}
							<Image className="team-avatar" src={teams.find(team => {
								return team.id === team1Results.matchups[i].opponentId
							}).avatarURL} />
							
							<span className="team-name">
								{teams.find(team => {
									return team.id === team1Results.matchups[i].opponentId
								}).name}
							</span>
							<span className="team-name abbrev">
								{teams.find(team => {
									return team.id === team1Results.matchups[i].opponentId
								}).abbrev}
							</span>

							<span className="score">
								{team1Results.matchups[i].opponentScore}
							</span>
						</li>
					</ul>
				</div>

				{ /*WEEK*/ }
				<div className="week">
					<h2>{`W${i + 1}`}</h2>
				</div>

				{ /*TEAM 2 (RIGHT SIDE)*/ }
				<div className={`team-result ${winOrLoss(team2Results.matchups[i].score > team2Results.matchups[i].opponentScore)}`}>
					<ul className="matchup-container">
						{ /*TEAM 1 (TOP SIDE)*/ }
						<li>
							{/*<img className="team-avatar" src={team2.avatarURL} alt={`${team2.name}`} />*/}
							<Image className="team-avatar" src={team2.avatarURL} />
							
							<span className="team-name">{team2.name}</span>
							<span className="team-name abbrev">{team2.abbrev}</span>
							
							<span className="score">
								{team2Results.matchups[i].score}
							</span>
						</li>
						
						{ /*TEAM 2 (BOTTOM SIDE)*/ }
						<li>
							{/*<img className="team-avatar" src={teams.find(team => {
								return team.id === team2Results.matchups[i].opponentId
							}).avatarURL} alt="Opponent Avatar" />*/}
							<Image className="team-avatar" src={teams.find(team => {
								return team.id === team2Results.matchups[i].opponentId
							}).avatarURL} />

							<span className="team-name">
								{teams.find(team => {
									return team.id === team2Results.matchups[i].opponentId
								}).name}
							</span>
							<span className="team-name abbrev">
								{teams.find(team => {
									return team.id === team2Results.matchups[i].opponentId
								}).abbrev}
							</span>

							<span className="score">
								{team2Results.matchups[i].opponentScore}
							</span>
						</li>
					</ul>
				</div>
			</li>
		);
	}

	return matchups;
};

const MatchupResultsList = props => {
	return (
		<ul className="matchup-results-list">
			{renderWeeks(props.weeks, props.teams, props.team1, props.team1Results, props.team2, props.team2Results)}
		</ul>
	);
};

export default MatchupResultsList;