const cheerio = require('cheerio');
const request = require('request-promise');
const { URL } = require('url');

const scoreboard = (league, week) => {
	const options = {
		uri: `http://games.espn.com/ffl/scoreboard?leagueId=${league.leagueId}&seasonId=${league.seasonId}&matchupPeriodId=${week}`,
		transform: function(body) {
			return cheerio.load(body);
		}
	};

	return request(options)
		.then(function($) {
			let $matchups = $('#scoreboardMatchups div table tbody').first();
			let sections = Math.ceil(league.teams.length / 4);								

			for(let i = 0; i < sections; i++) {						
				for(let j = 0; j <= 2; j += 2) {
					let $team1 = $matchups.children().eq(i).find('table.ptsBased.matchup tbody').eq(j).children().eq(0);
					let $team2 = $matchups.children().eq(i).find('table.ptsBased.matchup tbody').eq(j).children().eq(1);

					let team1 = {
						id: Number(new URL(`http://games.espn.com/${$team1.find('div.name a').attr('href')}`).searchParams.get('teamId')),
						week,
						score: Number($team1.find('td.score').text()),
						opponent: {},
						abbrev: ''
					};

					team1.abbrev = $team1.find('span.abbrev').text();
					team1.abbrev = team1.abbrev.slice(1, team1.abbrev.length - 1);					

					let team2 = {
						id: Number(new URL(`http://games.espn.com/${$team2.find('div.name a').attr('href')}`).searchParams.get('teamId')),
						score: Number($team2.find('td.score').text()),
						opponent: {},
						abbrev: ''
					};

					team2.abbrev = $team2.find('span.abbrev').text();
					team2.abbrev = team2.abbrev.slice(1, team2.abbrev.length - 1);	

					team1.opponent.id = team2.id;
					team1.opponent.score = team2.score;

					team2.opponent.id = team1.id;
					team2.opponent.score = team1.score;

					let tmp_team = league.teams.find(team => team.id === team1.id);
					tmp_team.matches.push({ week, score: team1.score, opponent: team1.opponent });
					tmp_team.abbrev = team1.abbrev;

					tmp_team = league.teams.find(team => team.id === team2.id);
					tmp_team.matches.push({ week, score: team2.score, opponent: team2.opponent });
					tmp_team.abbrev = team2.abbrev;

					if( i === sections - 1 && league.teams.length % 4 !== 0) {
						break;
					}
				}				
			}

			return league;			
		});	
};

module.exports = scoreboard;