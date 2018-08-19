const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const axios = require('axios');

const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);
const app = express();
const port = process.env.PORT || 5000;
const {
	getStreak,
	getTeamURL,
	getCompletedWeeks,
	getMatchesForTeam,
	getAvatarURL
} = require('./util/utils');

require('./models/League');

app.use(morgan(':method: :url :status :date :remote-addr'));

app.get('/api/league/:leagueId/:seasonId', (req, res) => {
	const startTime = Date.now();
	const reqLeagueId = req.params.leagueId;
	const reqLeagueYear = req.params.seasonId;

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