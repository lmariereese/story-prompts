import React from 'react';
import { connect } from 'react-redux';
import { getOnePrompt } from '../store/reducers/prompts';
import SinglePromptCard from './SinglePromptCard';
import WritingEditor from './WritingEditor';

class SinglePromptView extends React.Component {
  componentDidMount() {
    this.props.getOnePrompt(this.props.match.params.id);
  }

  render() {
    return (
      <div className="main-content-wrapper">
        <h2>Your Story</h2>
        <div>
          {this.props.current.id ? (
            <div>
              <SinglePromptCard prompts={this.props.current} />
              <WritingEditor promptId={this.props.match.params.id} />
            </div>
          ) : (
            ''
          )}
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
