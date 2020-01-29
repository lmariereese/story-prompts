import React from 'react';
import {connect} from 'react-redux';
import {getOnePrompt} from '../store/reducers/prompts';
import SinglePromptCard from './SinglePromptCard';
import WritingEditor from './WritingEditor';
import 'draft-js/dist/Draft.css';

class SinglePromptView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getOnePrompt(this.props.match.params.id);
  }

  render() {
    return (
      <div className="main-content-wrapper">
        <h2>Your Story</h2>
        <div>
          {this.props.prompt.id !== undefined ? (
            <div>
              <SinglePromptCard prompts={this.props.prompt} />
              <WritingEditor />
            </div>
          ) : (
            <h3>...loading</h3>
          )}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  prompt: state.prompts.current,
  content: state.content,
  currentContent: state.prompts.currentContent
});

const mapDispatch = dispatch => ({
  getOnePrompt: id => dispatch(getOnePrompt(id))
});

export default connect(mapState, mapDispatch)(SinglePromptView);
