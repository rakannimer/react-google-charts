import React from 'react'
export default class StateEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.inputValue
        }
    }
    handleChange(event) {
        this.setState({inputValue: event.target.value})
    }
    componentWillReceiveProps(nextProps) {
        this.setState({inputValue: nextProps.inputValue})

    }
    onSubmit(event) {
        this.props.onSubmit(this.state.inputValue, this.props.chartIndex)
    }
    render(){
        return (
            <div className={"PropsEditor"}>
                <h2> Props </h2>
                <textarea style={{'width':'500px', 'height':'200px'}} value={this.state.inputValue} onChange={this.handleChange.bind(this)}></textarea>
                <div><button onClick={this.onSubmit.bind(this)}>Update</button></div>
            </div>
        )
    }
}