import React from 'react';
import { getAllSettings, getOneSetting } from '../store/reducers/settings';
import { connect } from 'react-redux';

class PromptGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.generate = this.generate.bind(this);
  }

  componentDidMount() {
    this.props.getAllSettings();
  }

  generate() {
    this.props.getOneSetting();
  }

  render() {
    return (
      <div>
        <p>some text</p>
        <button type="button" onClick={() => this.generate()}>
          Click me
        </button>
        {/* {this.props.current ? this.props.current : ''} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allSettings: state.settings.all,
  current: state.settings.current
});

const mapDispatchToProps = dispatch => ({
  getAllSettings: () => dispatch(getAllSettings()),
  getOneSetting: () => dispatch(getOneSetting())
});

export default connect(mapStateToProps, mapDispatchToProps)(PromptGenerator);
