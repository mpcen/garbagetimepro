import React, { Component } from 'react';
import { connect } from 'react-redux';
import PFFrequencyRanges from './components/Charts/PFFrequencyRanges/PFFrequencyRanges';

import './Stats.css';

class Stats extends Component {
    render() {
        return (
            <div className="Stats">
                <PFFrequencyRanges teams={this.props.teams} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        teams: state.league.teams
    }
}

export default connect(mapStateToProps)(Stats);