export const sortMatches = matches => {
	return matches.sort((matchA, matchB) => {
		return matchA.week - matchB.week;
	});
};

export const getTeamOpponents = matches => {
	return matches.map(match => {
		return match.opponent;
	});
};

export const generateResults = (team1, team2, team2Opponents) => {
	let results = {
		wins: 0,
		losses: 0,
		ties: 0,
		matchups: []
	};

	team2Opponents.forEach((opponent, index) => {
		if(opponent.id === team1.id) {
			opponent.id = team2.id;
			opponent.score = team2.matches[index].score;
		}

		let matchup = {
			week: index + 1,
			score: team1.matches[index].score,
			opponentId: opponent.id,
			opponentScore: opponent.score
		};

		results.matchups.push(matchup);

		if(matchup.score > matchup.opponentScore)
			results.wins++;
		else if(matchup.score < matchup.opponentScore)
			results.losses++;
		else
			results.ties++;
	});

	return results;
};