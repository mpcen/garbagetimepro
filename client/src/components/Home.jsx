import React, { Component } from "react";
import { connect } from "react-redux";
import { Dimmer, Loader, Button } from "semantic-ui-react";

import { searchLeagueOffice } from "../actions/searchLeagueOfficeActions";
import LeagueSearchBar from "../containers/LeagueSearchBar";

import "../styles/Home.css";

class Home extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.searchLeagueOffice(null, this.props.text);
    }

    renderContent(loading) {
        if (!loading) {
            return (
                <div className="home-content">
                    <h1> Enter League ID or League Office URL </h1>
                    <div className="home-search-bar-container">
                        <LeagueSearchBar />
                    </div>
                    <Button
                        className="home-search-button"
                        onClick={this.handleClick}
                    >
                        Search{" "}
                    </Button>{" "}
                </div>
            );
        }

        return (
            <Dimmer active={true} className="home-dimmer">
                <Loader size="big"> Fetching League Data... </Loader>{" "}
            </Dimmer>
        );
    }

    render() {
        return (
            <div className="home-container">
                {" "}
                {this.renderContent(this.props.loading)}{" "}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.searchLeagueOffice.loading,
        text: state.searchLeagueOffice.text
    };
};

export default connect(
    mapStateToProps,
    {
        searchLeagueOffice
    }
)(Home);
