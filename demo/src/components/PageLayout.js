'use strict';
import React from 'react'
import Menu from './Menu'

export default class PageLayout extends React.Component {
    render(){

        return (
            <div>
                <header>
                    <div className={"inner"}>
                        <h1>React-google-charts</h1>
                        <h2>A React Google Charts Wrapper</h2>
                        <a href="https://github.com/RakanNimer/react-google-charts" className={"button"}><small>View project on</small> GitHub</a>
                    </div>
                </header>
                <div id="content-wrapper">
                    <div className={"inner clearfix"}>
                        <section id="main-content">
                            <Menu />
                            <div id ="content" className="examples">
                                {this.props.children}
                            </div>

                        </section>
                    </div>
                    <footer style={{textAlign:'center'}}>
                        <p>
                            This page layout is inpired by the Architect theme by <a href="https://twitter.com/jasonlong">Jason Long</a> found on <a href= " pages.github.com"> Github Pages </a>
                        </p>
                    </footer>
                </div>
            </div>
        )
    }
}
