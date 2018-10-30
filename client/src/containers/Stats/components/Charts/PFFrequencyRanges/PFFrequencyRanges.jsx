import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import './PFFrequencyRanges.css';

export default class PFFrequencyRanges extends Component {
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

        const labels = Object.keys(scoreBuckets).map(scoreBucket => {
            return `${scoreBucket}'s`;
        });

        this.setState({
            median,
            scoreBuckets,
            labels,
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
                    borderColor: 'rgba(255,255,255,0.75)',
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
                xAxes: [
                    {
                        ticks: {
                            maxRotation: 90,
                        },
                        gridLines: {
                            display: false,
                            offsetGridLines: true
                        },
                        // used to group bars together
                        // barPercentage: 1.0, 
                        // categoryPercentage: 1.0
                    }
                ],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        fontColor: '#fff',
                        labelString: 'Frequency',
                    }
                }]
            }
        }

        return (
            <div className="PFFrequencyRanges">
                <div className="PFFrequencyRanges-title">
                    <h2>Points-For Frequency Ranges</h2>
                    <p>(Median Points-For: {this.state.median.toFixed(2)})</p>
                </div>

                <div className="PFFrequencyRanges-chart-container">
                    <Bar data={data} options={options} />
                </div>
            </div>
        );
    }
}