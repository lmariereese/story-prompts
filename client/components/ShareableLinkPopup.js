import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {sharePrompt} from '../store/reducers/storyElements';
// import copyLinkIcon from '../../public/copyLinkIcon.png';

class ShareableLinkPopup extends React.Component {
  componentDidMount() {
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

  render() {
    console.log('current in popup', this.props.current);
    console.log('location in popup', this.props.location);
    return (
      <div>
        <p>this is the popup!</p>
        {this.props.current.urlToken ? (
          <p>{`${this.props.location.pathname}/${
            this.props.current.urlToken
          }`}</p>
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
