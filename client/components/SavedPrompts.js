import React from 'react';
import {connect} from 'react-redux';
import {getAllSavedPrompts, getOnePrompt} from '../store/reducers/prompts';
import SinglePromptCard from './SinglePromptCard';
import {withRouter, Link} from 'react-router-dom';
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
    history.push(`/saved-prompts/prompt/${id}`);
  }

  render() {
    return (
      <div className="main-content-wrapper">
        <div>
          <h2>Saved Prompts</h2>
        </div>
        <div className="prompt-list-div">
          {this.props.user.id
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
          {this.props.savedPrompts.length === 0 ? (
            <div>
              <h4>You haven't saved any prompts yet.</h4>
              <Link to="/prompts">
                <button type="button">Get Started</button>
              </Link>
            </div>
          ) : (
            ''
          )}
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
