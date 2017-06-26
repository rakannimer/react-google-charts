import React from 'react';
import PropTypes from 'prop-types';

export default class StateEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.inputValue,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ inputValue: nextProps.inputValue });
  }
  onSubmit() {
    this.props.onSubmit(this.state.inputValue, this.props.chartIndex);
  }
  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }
  render() {
    return (
      <div className={'PropsEditor'}>
        <h2> Props </h2>
        <textarea style={{ width: '500px', height: '200px' }} value={this.state.inputValue} onChange={this.handleChange} />
        <div>
          <button onClick={this.onSubmit}>
            Update
          </button>
        </div>
      </div>
    );
  }
}

StateEditor.propTypes = {
  inputValue: PropTypes.string,
  chartIndex: PropTypes.number,
  onSubmit: PropTypes.func,
};
