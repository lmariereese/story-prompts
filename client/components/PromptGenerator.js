import React from 'react';
import { getAllSettings } from '../store/reducers/settings';
import { connect } from 'react-redux';

class PromptGenerator extends React.Component {
  componentDidMount() {
    this.props.getAllSettings();
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = state => ({
  allSettings: state.settings.all
});

const mapDispatchToProps = dispatch => ({
  getAllSettings: () => dispatch(getAllSettings())
});

export default connect(mapStateToProps, mapDispatchToProps)(PromptGenerator);
