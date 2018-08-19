const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const axios = require('axios');
// const async = require('async');
// const cheerio = require('cheerio');
// const request = require('request-promise');

const keys = require('./config/keys');
require('./models/League');
mongoose.connect(keys.mongoURI);
const app = express();
const port = process.env.PORT || 5000;

// const leagueOffice = require('./modules/leagueOffice');
// const scoreboard = require('./modules/scoreboard');

app.use(morgan(':method: :url :status :date :remote-addr'));

app.get('/api/league/:leagueId/:seasonId', (req, res) => {
	const startTime = Date.now();
	const reqLeagueId = req.params.leagueId;
	const reqLeagueYear = req.params.seasonId;

	function getStreak(streakType, streakLength) {
		let str = '';

		if (streakType === 1) str += 'W';
		else if (streakType === 2) str += 'L';
		else str += 'T';

		str += streakLength;

		return str;
	}

	function getTeamURL(leagueId, teamId, seasonId) {
		const baseURL = 'http://games.espn.com/ffl/clubhouse?';
		return `${baseURL}leagueId=${leagueId}&teamId=${teamId}&seasonId=${seasonId}`;
	}

	function getCompletedWeeks({
		overallWins,
		overallLosses,
		overallTies
	}) {
		return overallWins + overallLosses + overallTies
	}

	function getMatchesForTeam(teamId, scheduleItems, regularSeasonGames) {
		const matches = [];

		for (let i = 0; i < scheduleItems.length; i++) {
			if (i === regularSeasonGames) break;
			const {
				matchups,
				matchupPeriodId
			} = scheduleItems[i];

			const opponent = {
				id: null,
				score: null
			};
			const match = {
				week: matchupPeriodId,
				score: null,
				opponent
			};

			if (teamId === matchups[0].awayTeamId) {
				match.score = matchups[0].awayTeamScores[0];
				opponent.id = matchups[0].homeTeamId;
				opponent.score = matchups[0].homeTeamScores[0];
			} else {
				match.score = matchups[0].homeTeamScores[0];
				opponent.id = matchups[0].awayTeamId;
				opponent.score = matchups[0].awayTeamScores[0];
			}

			matches.push(match);
		};

		return matches;
	}

	function getAvatarURL(logoUrl) {
		if (!logoUrl) {
			return 'http://g.espncdn.com/lm-static/ffl18/images/default.svg';
		}

		return logoUrl;
	}

	axios.get(`http://games.espn.com/ffl/api/v2/leagueSettings?leagueId=${reqLeagueId}&seasonId=${reqLeagueYear}`)
		.then(response => {
			const leagueSettings = response.data.leaguesettings;
			const league = {
				leagueName: leagueSettings.name,
				leagueId: reqLeagueId,
				seasonId: reqLeagueYear,
				completedWeeks: getCompletedWeeks(leagueSettings.teams['1'].record),
				finalMatchupPeriodId: leagueSettings.finalMatchupPeriodId,
				regularSeasonMatchupPeriodCount: leagueSettings.regularSeasonMatchupPeriodCount,
				// leagueMembers: leagueSettings.leagueMembers,
				teams: []
			};

			let teams = leagueSettings.teams;

			for (let t in teams) {
				const $team = teams[t];
				const team = {
					id: $team.teamId,
					name: `${$team.teamLocation} ${$team.teamNickname}`,
					abbrev: $team.teamAbbrev,
					url: getTeamURL(league.leagueId, $team.teamId, league.seasonId),
					avatarURL: getAvatarURL($team.logoUrl),
					record: {
						wins: $team.record.overallWins,
						losses: $team.record.overallLosses,
						ties: $team.record.overallTies
					},
					streak: getStreak($team.record.streakType, $team.record.streakLength),
					matches: getMatchesForTeam($team.teamId, $team.scheduleItems, league.regularSeasonMatchupPeriodCount)
				};

				league.teams.push(team);
			}

			const League = mongoose.model('leagues');
			League.findOne({
					'leagueId': league.leagueId
				})
				.then(dbLeague => {
					if (!dbLeague) {
						console.log('saving new league', league.leagueId);

						new League({
							leagueId: league.leagueId,
							count: 1
						}).save();
					} else {
						console.log('already saved league', league.leagueId);
						dbLeague.count++;
						dbLeague.save();
					}
				})
				.catch(err => {
					console.log('MONGOOSE ERR:', err);
				});

			console.log('Process completed in:', Date.now() - startTime, 'ms');

			res.send(league);
		})
		.catch(err => {
			console.log('ERROR', err);
			res.sendStatus(500).send(err);
		});
});

if (process.env.NODE_ENV === 'production') {
	// Express serves up production assets like main.js, etc
	app.use(express.static('client/build'));

	// Express serves up index.html file
	// if it doesnt recognize route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(port, () => {
	console.log('-------------------------------');
	console.log(`API started on port ${port}`);
	console.log('-------------------------------');
});