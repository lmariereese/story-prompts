import React from 'react';
import { connect } from 'react-redux';
import { getOnePrompt } from '../store/reducers/prompts';
import SinglePromptCard from './SinglePromptCard';
import WritingEditor from './WritingEditor';

class SinglePromptView extends React.Component {
  // componentDidMount () {
  //   this.props.getOnePrompt(this.props.id)
  // }

  render() {
    return (
      <div className="main-content-wrapper">
        <div>
          {this.props.current.id ? (
            <SinglePromptCard prompts={this.props.current} />
          ) : (
            ''
          )}
          <WritingEditor />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  current: state.prompts.current
});

const mapDispatch = dispatch => ({
  getOnePrompt: id => dispatch(getOnePrompt(id))
});

export default connect(mapState, mapDispatch)(SinglePromptView);
