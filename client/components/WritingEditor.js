import React from 'react';
import {connect} from 'react-redux';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import {
  saveCurrentContent,
  loadCurrentContent
} from '../store/reducers/content';

class WritingEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.currentContent.id) {
      this.setState({
        editorState: EditorState.createWithContent(
          convertFromRaw(this.props.content.data)
        )
      });
    } else {
      this.setState({editorState: EditorState.createEmpty()});
    }
    // let promptId = this.props.promptId;
    // this.props.loadCurrentContent(promptId);
    // if (this.props.content.id) {
    //   this.setState({
    //     editorState: EditorState.createWithContent(
    //       convertFromRaw(this.props.content.data)
    //     )
    //   });
    // } else {
    //   this.setState({ editorState: EditorState.createEmpty() });
    // }
  }

  // componentDidUpdate(prevProps) {
  //   if (
  //     this.props.content.id !== prevProps.content.id &&
  //     this.props.prompt.id === prevProps.prompt.id
  //   ) {
  //     this.props.loadCurrentContent(this.props.promptId);
  //     this.setState({
  //       editorState: EditorState.createWithContent(
  //         convertFromRaw(this.props.content.data)
  //       )
  //     });
  //   }
  // }

  onChange = editorState => {
    this.setState({editorState});
  };

  handleSubmit = event => {
    event.preventDefault();
    const contentState = convertToRaw(
      this.state.editorState.getCurrentContent()
    );
    this.props.saveCurrentContent(
      contentState,
      this.props.prompt.id,
      this.props.content.id
    );
  };

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  render() {
    if (!this.state.editorState) {
      return <h3 className="loading">Loading...</h3>;
    }
    return (
      <div className="editor-wrapper">
        <div className="editor-controls-wrapper">
          <button type="button" onClick={this.handleSubmit}>
            Save
          </button>
        </div>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          placeholder="Tell a story"
        />
      </div>
    );
  }
}

const mapState = state => ({
  prompt: state.prompts.current,
  currentContent: state.prompts.currentContent
});

const mapDispatch = dispatch => ({
  saveCurrentContent: (content, promptId, contentId) =>
    dispatch(saveCurrentContent(content, promptId, contentId)),
  loadCurrentContent: promptId => dispatch(loadCurrentContent(promptId))
});

export default connect(mapState, mapDispatch)(WritingEditor);
