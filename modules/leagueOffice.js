const cheerio = require('cheerio');
const request = require('request-promise');
const { URL } = require('url');

const leagueOffice = league => {
	const options = {
		uri: `http://games.espn.com/ffl/leagueoffice?leagueId=${league.leagueId}&seasonId=${league.seasonId}`,
		transform: function(body) {
			return cheerio.load(body);
		}
	};

	return request(options)
		.then(function($) {
			league.leagueName = $('div#lo-league-header .league-team-names h1').text();			

			let $teams = $('.lo-sidebar-box table tbody');

			$teams = $teams.children().filter(function(i, elem) {
				return $(this).children().length >= 3;
			});

			$teams.each(function(i, elem) {
				let team = {
					id: null,
					name: $(this).children().eq(1).text(),
					abbrev: '',
					url: `http://games.espn.com${$(this).children().eq(1).children().first().attr('href')}`,
					avatarURL: '',
					record: {},
					streak: $(this).children().eq(3).text(),
					matches: []
				};

				team.id = parseInt(new URL(team.url).searchParams.get('teamId'));

				let record = $(this).children().eq(2).text().split('-');

				team.record = {
					wins: parseInt(record[0]),
					losses: parseInt(record[1]),
					ties: record.length === 3 ? parseInt(record[2]) : 0
				};

				league.teams.push(team);				
			});

			league.completedWeeks = 
				league.teams[0].record.wins + 
				league.teams[0].record.losses +
				league.teams[0].record.ties;

			return league;			
		})
		.catch(function(err) {
			return Promise.reject({ error: 'You have either entered an invalid league ID or your league is set to private.' });
		});
};

module.exports = leagueOffice;