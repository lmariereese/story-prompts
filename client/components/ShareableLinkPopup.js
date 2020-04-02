import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {sharePrompt} from '../store/reducers/storyElements';
const url = 'localhost:8080';

class ShareableLinkPopup extends React.Component {
  componentDidMount() {
    // if prompt hasn't already been shared, then save/share it
    if (!this.props.current.urlToken) {
      const {
        setting,
        adjective,
        character,
        detail,
        action,
        climax
      } = this.props.current;
      this.props.sharePrompt({
        setting,
        adjective,
        character,
        detail,
        action,
        climax
      });
    }
  }

  render() {
    return (
      <div>
        {this.props.current.urlToken ? (
          <div>
            <p>{`${url}/prompts/${this.props.current.urlToken}`}</p>
            <img
              src="https://image.flaticon.com/icons/svg/126/126481.svg"
              alt="link icon"
              width="20"
              height="20"
            />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapState = state => ({
  current: state.elements.current
});

const mapDispatch = dispatch => ({
  sharePrompt: els => dispatch(sharePrompt(els))
});

export default withRouter(connect(mapState, mapDispatch)(ShareableLinkPopup));
