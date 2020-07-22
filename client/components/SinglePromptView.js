import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import history from '../history';
import {getOnePrompt} from '../store/reducers/prompts';
import SinglePromptCard from './SinglePromptCard';
import SmallDate from './SmallDate';
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
        <div>
          <Link to="/saved-prompts" className="back-link">
            <p>Back</p>
          </Link>
        </div>
        <h2>Your Story</h2>
        <div>
          {this.props.prompt.id !== undefined ? (
            <div>
              <SinglePromptCard prompts={this.props.prompt} />
              {this.props.currentContent !== null &&
              this.props.currentContent.updatedAt !== undefined ? (
                <SmallDate
                  text="Last save:"
                  timestamp={this.props.currentContent.updatedAt}
                />
              ) : (
                ''
              )}
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

export default withRouter(connect(mapState, mapDispatch)(SinglePromptView));
