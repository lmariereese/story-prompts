import React from 'react';
import {connect} from 'react-redux';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import {toast} from 'react-toastify';
import {saveCurrentContent} from '../store/reducers/prompts';

class WritingEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.editor = React.createRef();
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focus = this.focus.bind(this);
  }

  componentDidMount() {
    if (this.props.currentContent === null) {
      this.setState({editorState: EditorState.createEmpty()});
    } else {
      this.setState({
        editorState: EditorState.createWithContent(
          convertFromRaw(this.props.currentContent.data)
        )
      });
    }
  }

  focus() {
    this.editor.current.focus();
  }

  onChange = editorState => {
    this.setState({editorState});
  };

  handleSubmit = event => {
    event.preventDefault();
    const contentState = convertToRaw(
      this.state.editorState.getCurrentContent()
    );
    if (this.props.currentContent) {
      this.props.saveCurrentContent(
        contentState,
        this.props.prompt.id,
        this.props.currentContent.id
      );
    } else {
      this.props.saveCurrentContent(
        contentState,
        this.props.prompt.id,
        this.props.currentContent
      );
    }
    toast('Your story was saved', {
      position: 'bottom-right',
      autoClose: 2000
    });
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
        <div className="focus-wrapper" onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="Tell a story"
            ref={this.editor}
          />
        </div>
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
    dispatch(saveCurrentContent(content, promptId, contentId))
});

export default connect(mapState, mapDispatch)(WritingEditor);
