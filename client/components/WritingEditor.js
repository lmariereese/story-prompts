import React from 'react';
import {connect} from 'react-redux';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import debounce from 'lodash/debounce';
// import {toast} from 'react-toastify';
import Toolbar from './Toolbar';
import ContentTitle from './ContentTitle';
import {saveCurrentContent} from '../store/reducers/prompts';

class WritingEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.editor = React.createRef();
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.focus = this.focus.bind(this);
    this.inlineStyleToggle = this.inlineStyleToggle.bind(this);
    this.blockStyleToggle = this.blockStyleToggle.bind(this);
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

  saveContent = debounce(content => {
    let id = this.props.currentContent
      ? this.props.currentContent.id
      : this.props.currentContent;
    this.props.saveCurrentContent(content, this.props.prompt.id, id);
  }, 2000);

  onChange = editorState => {
    const contentState = convertToRaw(
      this.state.editorState.getCurrentContent()
    );
    this.saveContent(contentState);
    this.setState({editorState});
  };

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  focus() {
    this.editor.current.focus();
  }

  inlineStyleToggle = (event, style) => {
    event.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
  };

  blockStyleToggle = (event, block) => {
    event.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, block));
  };

  render() {
    if (!this.state.editorState) {
      return <h3 className="loading">Loading...</h3>;
    }
    return (
      <div className="editor-wrapper">
        <div className="editor-controls-wrapper">
          <Toolbar
            inlineStyleToggle={this.inlineStyleToggle}
            blockStyleToggle={this.blockStyleToggle}
            editorState={this.state.editorState}
          />
          <div>
            {/* <button type="button" onClick={this.handleSubmit}>
              Save
            </button> */}
          </div>
        </div>
        <div className="focus-wrapper">
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
