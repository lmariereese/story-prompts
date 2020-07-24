import React from 'react';
import {connect} from 'react-redux';
import {
  getAllSavedPrompts,
  getOnePrompt,
  sortBy
} from '../store/reducers/prompts';
import {
  setVisibilityFilter,
  getVisiblePrompts
} from '../store/reducers/visibilityFilter';
import SinglePromptCard from './SinglePromptCard';
import FilterButtons from './FilterButtons';
import {withRouter, Link} from 'react-router-dom';
import history from '../history';

class SavedPrompts extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.more = this.more.bind(this);
    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    this.props.getAllSavedPrompts();
  }

  handleChange(event) {
    this.props.sortBy(event.target.value);
  }

  more(id) {
    history.push(`/saved-prompts/prompt/${id}`);
  }

  filter(f) {
    this.props.setVisibilityFilter(f);
  }

  render() {
    return (
      <div className="main-content-wrapper">
        <div>
          <div className="page-heading-div">
            <h2>Saved Prompts</h2>
            <Link to="/prompts">
              <p>Generate new prompt</p>
            </Link>
          </div>
          <FilterButtons
            filter={this.filter}
            visibilityFilter={this.props.visibilityFilter}
          />
          {/* <div className="filter-div">
            <button
              type="button"
              className={
                this.props.visibilityFilter === 'SHOW_ALL'
                  ? 'active-filter'
                  : ''
              }
              onClick={() => this.filter('SHOW_ALL')}
            >
              All
            </button>
            <button
              type="button"
              className={
                this.props.visibilityFilter === 'SHOW_IN_PROGRESS'
                  ? 'active-filter'
                  : ''
              }
              onClick={() => this.filter('SHOW_IN_PROGRESS')}
            >
              In-Progress
            </button>
          </div> */}
          <div className="sort-by-div">
            <label htmlFor="">SORT BY:</label>
            <select onChange={this.handleChange}>
              <option value="oldest">Oldest first</option>
              <option value="newest">Newest first</option>
            </select>
          </div>
          {/* <hr className="filter-hr" /> */}
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
  savedPrompts: getVisiblePrompts(state.prompts.all, state.visibilityFilter),
  visibilityFilter: state.visibilityFilter,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getAllSavedPrompts: () => dispatch(getAllSavedPrompts()),
  getOnePrompt: id => dispatch(getOnePrompt(id)),
  setVisibilityFilter: f => dispatch(setVisibilityFilter(f)),
  sortBy: order => dispatch(sortBy(order))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SavedPrompts)
);
