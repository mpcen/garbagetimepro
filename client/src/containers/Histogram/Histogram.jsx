import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import './Histogram.css';

class Histogram extends Component {
    constructor(props) {
        super(props);

        this.state = {
            median: 0,
            scoreBuckets: {},
            labels: [],
            data: []
        };
    }

    componentDidMount() {
        let scores = [];
        const scoreBuckets = {};

        this.props.teams.forEach(team => {
            team.matches.forEach(({ score }) => {
                scores.push(score);
            });
        });

        scores = scores.sort((a, b) => {
            if(a < b) return -1;
            if(a > b) return 1;
            return 0;
        });

        const median = (scores[scores.length / 2] + scores[scores.length / 2 - 2]) / 2;

        const low = Math.floor(scores[0] / 10);
        const high = Math.ceil(scores[scores.length - 1] / 10);

        for(let i = low; i <= high; i++) {
            scoreBuckets[i * 10] = 0;
        }

        scores.forEach(score => {
            let bucketedScore = Math.floor(score / 10) * 10;
            scoreBuckets[bucketedScore]++;
        });

        const data = [];

        for(let range in scoreBuckets) {
            data.push(scoreBuckets[range]);
        }

        this.setState({
            median,
            scoreBuckets,
            labels: Object.keys(scoreBuckets),
            data
        });
    }

    render() {
        const data = {
            labels: this.state.labels,
            datasets: [
                {
                    label: 'Points-For Range',
                    backgroundColor: 'rgba(33,133,208,0.5)',
                    borderColor: 'rgba(255,255,255,.75)',
                    borderWidth: 1,
                    data: this.state.data
                }
            ]
        };

        const options = {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 0,
                    fontColor: '#fff'
                }
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        fontColor: '#fff',
                        labelString: 'Frequency'
                    }
                }]
            }
        }

        return (
            <div className="Histogram">
                <div className="Histogram-title">
                    <h2>Points-For Histogram</h2>
                    <p>(Median: {this.state.median})</p>
                </div>

                <Bar className="Histogram-barchart" data={data} options={options} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        teams: state.league.teams
    }
}

export default connect(mapStateToProps)(Histogram);