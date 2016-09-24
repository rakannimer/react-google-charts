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
                    <h1 className="link"><a href="#/"> Usage </a></h1>
                    <h1 className="link"><a href="#/examples/ScatterChart">  Charts Playground </a></h1>
                    {supportedChartsLinks}
                    <h1 className="link"><a href="https://www.github.com/RakanNimer/react-google-charts"> Source </a></h1>
                </nav>
            </div>
        );
    }
};
