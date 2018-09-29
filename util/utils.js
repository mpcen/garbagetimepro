module.exports = {
    getStreak(streakType, streakLength) {
        let str = '';

        if (streakType === 1) str += 'W';
        else if (streakType === 2) str += 'L';
        else str += 'T';

        str += streakLength;

        return str;
    },
    getTeamURL(leagueId, teamId, seasonId) {
        const baseURL = 'http://games.espn.com/ffl/clubhouse?';
        return `${baseURL}leagueId=${leagueId}&teamId=${teamId}&seasonId=${seasonId}`;
    },
    getCompletedWeeks({
        overallWins,
        overallLosses,
        overallTies
    }) {
        return overallWins + overallLosses + overallTies
    },
    getMatchesForTeam(teamId, scheduleItems, completedWeeks) {
        const matches = [];

        for (let i = 0; i < completedWeeks; i++) {
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
    },
    getAvatarURL(logoUrl) {
        if (!logoUrl) {
            return 'http://g.espncdn.com/lm-static/ffl18/images/default.svg';
        }

        return logoUrl;
    }
};