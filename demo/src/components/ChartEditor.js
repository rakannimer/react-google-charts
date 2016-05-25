'use strict';
import React from 'react'
import Chart from '../../../src/components/Chart'
import PropsEditor from '../../../src/components/PropsEditor'

export default class ChartEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: props.chart
        }

    }
    handleFormSubmit(newChartProps) {
        this.setState({chart: JSON.parse(newChartProps)});
    }
    render() {
        return <div>
            <Chart chartType = {this.state.chart.chartType} width={this.state.chart.width} height={this.state.chart.height} rows = {this.state.chart.rows} columns =  {this.state.chart.columns} data ={this.state.chart.data} options = {this.state.chart.options} legend_toggle = {this.state.chart.legend_toggle} chartEvents = {this.state.chart.chartEvents} chartPackages={['corechart','table','timeline','treemap', 'wordtree','gantt']}  />
            <PropsEditor inputValue = {JSON.stringify(this.state.chart)} onSubmit= {this.handleFormSubmit.bind(this)}/>
        </div>
    }
}
