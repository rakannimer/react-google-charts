'use strict'
import React from 'react'
export default class Usage extends React.Component {
    render() {
        return(
        <div id="home" className = "examples">
            <h2> Installation </h2>
            <pre>
                <code>
                    npm install react-google-charts
                </code>
            </pre>
            <h2> Usage </h2>
            <div>
                <p style= {{marginLeft: '20px'}}>
                Before using please read the <a href="https://github.com/RakanNimer/react-google-charts/blob/master/README.md"> README </a>
                and check out the Charts Playground and <a>the sample props</a> to see all supported chart types and props passed to each
                </p>
            </div>
        </div>
        )
    }
}
