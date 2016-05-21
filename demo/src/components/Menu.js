'use strict';
import React from 'react'
import SAMPLE_DATA from '../../../src/constants/SAMPLE_DATA';

export default class Menu extends React.Component {
    render() {
        const supportedCharts = SAMPLE_DATA.map((chart)=>{return chart['chartTitle'] || chart['chartType']});
        const supportedChartsLinks = supportedCharts.map((chartType, i)=>{
            return (<h2 className="link" key = {i} > <a href={`#/examples/${chartType}`}> {chartType} </a> </h2>)
        })
        return (
            <div>
                <nav className="menu">
                    <h1 className="link">  Supported Charts  </h1>
                    {supportedChartsLinks}
                </nav>
            </div>
        );
    }
}
//<h1 className="link"> <a href="#/examples/home"> Examples </a> </h1>
//<h2 className="link"> <a href="#/examples/BarCharts"> Bar Charts </a> </h2>
//    <h2 className="link" ><a href="#/examples/BubbleCharts">    Bubble Charts </a> </h2>
//    <h2 className="link" ><a href="#/examples/Histograms ">    Histograms </a> </h2>
//    <h2 className="link" ><a href="#/examples/LineCharts">   Line Charts </a> </h2>
//    <h2 className="link" ><a href="#/examples/ScatterCharts">   Scatter Charts </a> </h2>
//    <h2 className="link" ><a href="#/examples/ManyMore">   Many more </a> </h2>
//    <h1 className="link"> <a href="https://github.com/RakanNimer/react-google-charts/"> Source </a> </h1>
//    <h1 className="link"> <a href="https://github.com/RakanNimer/react-google-charts/tree/gh-pages"> Examples Source </a> </h1>