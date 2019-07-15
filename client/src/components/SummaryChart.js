import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class SummaryChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chartData: {
                labels: ['Total Sales', 'Number of Items'],
                datasets: [
                    {
                        label: 'Sales Summary',
                        backgroundColor: ['rgba(255, 96, 41, 0.3)', 'rgba(255, 96, 41, 0.3)'],
                        borderColor: 'rgba(255, 96, 41, .2)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(10, 91, 153, .5)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]
            }
        }
    }
    render() {
        return (
            <div className="summary-chart">
                <Bar data={this.state.chartData} 
                    options={{
                        title: {
                            display: true,
                            text: 'Sales for the Day',
                            fontSize:25
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
                CHART COMPONENT
            </div>
        );
    }
}

export default SummaryChart;
