import React from 'react';
import {connect} from 'react-redux';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import {getOnePrompt} from '../store/reducers/prompts';
import {
  saveCurrentContent,
  loadCurrentContent
} from '../store/reducers/content';
import SinglePromptCard from './SinglePromptCard';
import WritingEditor from './WritingEditor';
import 'draft-js/dist/Draft.css';
import {displayOnePrompt} from '../store/reducers/prompts';

class SinglePromptView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleKeyCommand = this.handleKeyCommand.bind(this);
    // this.createEditor = this.createEditor.bind(this);
  }

  componentDidMount() {
    // this.props.displayOnePrompt(this.props.match.params.id);
    // this.props.loadCurrentContent(this.props.match.params.id);
    this.props.getOnePrompt(this.props.match.params.id);
    // this.createEditor();
  }

  // createEditor() {
  //   console.log(
  //     'inside createEditor prompt id: ',
  //     this.props.prompt.id,
  //     'content promptId: ',
  //     this.props.content.promptId
  //   );

  //   const promptId = this.props.match.params.id;
  //   if (promptId === this.props.content.promptId) {
  //     this.setState({
  //       editorState: EditorState.createWithContent(
  //         convertFromRaw(this.props.content.data)
  //       )
  //     });
  //   } else {
  //     this.setState({editorState: EditorState.createEmpty()});
  //   }
  // }

  // onChange = editorState => {
  //   this.setState({editorState});
  // };

  // handleSubmit(event) {
  //   event.preventDefault();
  //   const contentState = convertToRaw(
  //     this.state.editorState.getCurrentContent()
  //   );
  //   this.props.saveCurrentContent(
  //     contentState,
  //     this.props.prompt.id,
  //     this.props.content.id
  //   );
  // }

  // handleKeyCommand(command, editorState) {
  //   const newState = RichUtils.handleKeyCommand(editorState, command);
  //   if (newState) {
  //     this.onChange(newState);
  //     return 'handled';
  //   }
  //   return 'not-handled';
  // }

  render() {
    // console.log(
    //   'in render: ',
    //   this.state,
    //   'this.props.prompt: ',
    //   this.props.prompt,
    //   'this.props.content: ',
    //   this.props.content
    // );
    return (
      <div className="main-content-wrapper">
        <h2>Your Story</h2>
        <div>
          {this.props.prompt.id !== undefined ? (
            <div>
              <SinglePromptCard prompts={this.props.prompt} />
              <WritingEditor
                content={this.props.currentContent}
                // editorState={this.state.editorState}
                // onChange={this.onChange}
                // handleSubmit={this.handleSubmit}
                // handleKeyCommand={this.handleSubmit}
              />
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
