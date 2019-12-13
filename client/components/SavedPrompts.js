import React from 'react';
import { connect } from 'react-redux';
import { getAllSavedPrompts, getOnePrompt } from '../store/reducers/prompts';
import SinglePromptCard from './SinglePromptCard';
import { withRouter } from 'react-router-dom';
import history from '../history';

class SavedPrompts extends React.Component {
  constructor(props) {
    super(props);
    this.more = this.more.bind(this);
  }
  componentDidMount() {
    this.props.getAllSavedPrompts();
  }

  more(id) {
    this.props.getOnePrompt(id);
    history.push('/saved-prompts/prompt');
  }

  render() {
    return (
      <div className="main-content-wrapper">
        <div>
          <h2>Your Saved Prompts</h2>
        </div>
        <div className="prompt-list-div">
          {this.props.savedPrompts
            ? this.props.savedPrompts.map(item => {
                return (
                  <SinglePromptCard
                    key={item.id}
                    prompts={item}
                    view="list"
                    more={this.more}
                  />
                );
              })
            : 'Login to see saved prompts.'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  savedPrompts: state.prompts.all,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getAllSavedPrompts: () => dispatch(getAllSavedPrompts()),
  getOnePrompt: id => dispatch(getOnePrompt(id))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SavedPrompts)
);
