import React from 'react';
import {connect} from 'react-redux';
import {getAllSavedPrompts, getOnePrompt} from '../store/reducers/prompts';
import {
  setVisibilityFilter,
  getVisiblePrompts
} from '../store/reducers/visibilityFilter';
import SinglePromptCard from './SinglePromptCard';
import {withRouter, Link} from 'react-router-dom';
import history from '../history';

class SavedPrompts extends React.Component {
  constructor(props) {
    super(props);
    this.more = this.more.bind(this);
    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    this.props.getAllSavedPrompts();
    // if (!this.props.savedPrompts.length) {
    //   this.props.getAllSavedPrompts();
    // }
    // if (this.props.savedPrompts.length) {
    //   this.props.getVisiblePrompts(this.props.savedPrompts, this.props.visibilityFilter)
    // } else {

    // }
  }

  more(id) {
    history.push(`/saved-prompts/prompt/${id}`);
  }

  filter(f) {
    console.log('filter method!');
    this.props.setVisibilityFilter(f);
  }

  render() {
    return (
      <div className="main-content-wrapper">
        <div>
          <h2>Saved Prompts</h2>
          <div className="filter-div">
            <button type="button" onClick={() => this.filter('SHOW_ALL')}>
              All
            </button>
            <button
              type="button"
              onClick={() => this.filter('SHOW_IN_PROGRESS')}
            >
              In-Progress
            </button>
          </div>
          <hr className="filter-hr" />
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
  // savedPrompts: state.prompts.all,
  savedPrompts: getVisiblePrompts(state.prompts.all, state.visibilityFilter),
  visibilityFilter: state.visibilityFilter,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getAllSavedPrompts: () => dispatch(getAllSavedPrompts()),
  getOnePrompt: id => dispatch(getOnePrompt(id)),
  setVisibilityFilter: f => dispatch(setVisibilityFilter(f))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SavedPrompts)
);
