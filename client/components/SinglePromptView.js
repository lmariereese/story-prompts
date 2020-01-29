import React from 'react';
import {connect} from 'react-redux';
import {getOnePrompt} from '../store/reducers/prompts';
import {
  saveCurrentContent,
  loadCurrentContent
} from '../store/reducers/content';
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
              <WritingEditor content={this.props.currentContent} />
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
  displayOnePrompt: id => dispatch(displayOnePrompt(id)),
  getOnePrompt: id => dispatch(getOnePrompt(id)),
  saveCurrentContent: (content, promptId, contentId) =>
    dispatch(saveCurrentContent(content, promptId, contentId)),
  loadCurrentContent: promptId => dispatch(loadCurrentContent(promptId))
});

export default connect(mapState, mapDispatch)(SinglePromptView);
