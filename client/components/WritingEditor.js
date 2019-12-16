import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

class WritingEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    // this.onChange = editorState => this.setState({ editorState });
    // this.setEditor = editor => {
    //   this.editor = editor;
    // };
    // this.focusEditor = () => {
    //   if (this.editor) {
    //     this.editor.focus();
    //   }
    // };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.focusEditor();
  // }

  onChange = editorState => {
    const contentState = editorState.getCurrentContent();
    // console.log('content state', convertToRaw(contentState));
    // console.log('not converted content state', contentState);
    this.setState({ editorState });
  };

  handleSubmit = event => {
    event.preventDefault();
    const contentState = convertToRaw(
      this.state.editorState.getCurrentContent()
    );
    console.log('content state SAVE', contentState);
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
    return (
      <div className="editor-wrapper">
        <div className="editor-controls-wrapper">
          <button type="button" onClick={this._onBoldClick.bind(this)}>
            Bold
          </button>
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

export default WritingEditor;
