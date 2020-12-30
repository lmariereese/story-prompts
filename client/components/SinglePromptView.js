import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import history from '../history';
import {getOnePrompt, toggleStarredPrompt} from '../store/reducers/prompts';
import SinglePromptCard from './SinglePromptCard';
import SmallDate from './SmallDate';
import {ContentTitle} from './ContentTitle';
import WritingEditor from './WritingEditor';
import 'draft-js/dist/Draft.css';

class SinglePromptView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleStar = this.toggleStar.bind(this);
  }

  componentDidMount() {
    this.props.getOnePrompt(this.props.match.params.id);
  }

  toggleStar(prompt) {
    this.props.toggleStarredPrompt(prompt);
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
              <SinglePromptCard
                prompts={this.props.prompt}
                toggleStar={this.toggleStar}
              />
              <ContentTitle />
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
  getOnePrompt: id => dispatch(getOnePrompt(id)),
  toggleStarredPrompt: prompt => dispatch(toggleStarredPrompt(prompt))
});

export default withRouter(connect(mapState, mapDispatch)(SinglePromptView));
