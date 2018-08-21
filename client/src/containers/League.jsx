import React, { Component } from "react";
import { connect } from "react-redux";
import { searchLeagueOffice } from "../actions/searchLeagueOfficeActions";
import { Redirect, Route, Switch } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";

import "../styles/League.css";
import LeagueNavBar from "./LeagueNavBar";
import LeagueHeader from "../components/LeagueHeader";
import TeamSelect from "./TeamSelect";
import MatchupResults from "../components/MatchupResults";
import PowerRankings from "../components/PowerRankings";

class League extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        // called if user lands on this page before anything
        if (!this.props.loading) {
            this.props.searchLeagueOffice(
                this.props.location.pathname,
                this.props.match.params.leagueId
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        window.scrollTo(0, 0);
        // called if the back/fwd buttons on browser were pressed
        if (
            this.props.match.params.leagueId !==
                nextProps.match.params.leagueId &&
            !this.props.loading
        ) {
            this.props.searchLeagueOffice(
                nextProps.location.pathname,
                nextProps.match.params.leagueId
            );
        }
    }

    displayLoader() {
        return (
            <div className="league-container">
                <Dimmer active={true}>
                    <Loader size="big">Fetching League Data...</Loader>
                </Dimmer>
            </div>
        );
    }

    displayLeague() {
        return (
            <div className="league-container">
                <LeagueNavBar
                    leagueId={this.props.leagueId}
                    leagueRoute={this.props.location.pathname}
                />

                <LeagueHeader leagueName={this.props.leagueName} />

                <Switch>
                    <Route
                        exact
                        path={`${this.props.match.path}`}
                        render={props => {
                            return (
                                <div>
                                    <h1>
                                        Buncha sweet stuff coming to this page
                                        soon...
                                    </h1>
                                </div>
                            );
                        }}
                    />

                    <Route
                        exact
                        path={`${this.props.match.path}/rankings`}
                        render={props => {
                            return <PowerRankings {...props} />;
                        }}
                    />

                    <Route
                        exact
                        path={`${this.props.match.path}/compare`}
                        render={props => {
                            return (
                                <div className="league-compare-container">
                                    <TeamSelect {...props} />

                                    <MatchupResults
                                        {...props}
                                        teams={this.props.teams}
                                        team1={this.props.team1}
                                        team2={this.props.team2}
                                        team1Results={this.props.team1Results}
                                        team2Results={this.props.team2Results}
                                    />
                                </div>
                            );
                        }}
                    />

                    <Route
                        path={`${
                            this.props.match.path
                        }/compare/:team1Id/:team2Id`}
                        render={props => {
                            return (
                                <div className="league-compare-container">
                                    <TeamSelect {...props} />

                                    <MatchupResults
                                        {...props}
                                        teams={this.props.teams}
                                        team1={this.props.team1}
                                        team2={this.props.team2}
                                        team1Results={this.props.team1Results}
                                        team2Results={this.props.team2Results}
                                    />
                                </div>
                            );
                        }}
                    />

                    <Redirect to={"/"} />
                </Switch>
            </div>
        );
    }

    renderContainer() {
        if (this.props.loading) {
            return this.displayLoader();
        } else if (!this.props.loading && this.props.error.length > 0) {
            return <Redirect to="/" />;
        } else return this.displayLeague();
    }

    render() {
        return this.renderContainer();
    }
}

const mapStateToProps = state => {
    return {
        loading: state.searchLeagueOffice.loading,
        error: state.searchLeagueOffice.error,
        teams: state.league.teams,
        leagueName: state.league.leagueName,
        leagueId: state.league.leagueId,
        team1: state.league.team1,
        team2: state.league.team2,
        team1Results: state.league.team1Results,
        team2Results: state.league.team2Results
    };
};

export default connect(
    mapStateToProps,
    { searchLeagueOffice }
)(League);
