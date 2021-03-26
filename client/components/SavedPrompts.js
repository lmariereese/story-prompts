import React from 'react';
import {connect} from 'react-redux';
import {
  getAllSavedPrompts,
  getOnePrompt,
  sortBy,
  toggleStarredPrompt
} from '../store/reducers/prompts';
import {
  setVisibilityFilter,
  getVisiblePrompts
} from '../store/reducers/visibilityFilter';
import {setSortOrder, getSortedPrompts} from '../store/reducers/sortOrder';
import SinglePromptCard from './SinglePromptCard';
import FilterButtons from './FilterButtons';
import {withRouter, Link} from 'react-router-dom';
import history from '../history';

class SavedPrompts extends React.Component {
  constructor(props) {
    super(props);
    this.more = this.more.bind(this);
    this.filter = this.filter.bind(this);
    this.sort = this.sort.bind(this);
    this.toggleStar = this.toggleStar.bind(this);
  }

  componentDidMount() {
    this.props.getAllSavedPrompts();
  }

  more(id) {
    history.push(`/saved-prompts/prompt/${id}`);
  }

  filter(f) {
    this.props.setVisibilityFilter(f);
  }

  sort(e) {
    this.props.setSortOrder(e.target.value);
  }

  toggleStar(prompt) {
    this.props.toggleStarredPrompt(prompt);
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
          <div className="sort-by-div">
            <label htmlFor="">SORT BY:</label>
            <select defaultValue={this.props.sortOrder} onChange={this.sort}>
              <option value="OLDEST">Oldest first</option>
              <option value="NEWEST">Newest first</option>
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
                    toggleStar={this.toggleStar}
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
  savedPrompts: getSortedPrompts(
    getVisiblePrompts(state.prompts.all, state.visibilityFilter),
    state.sortOrder
  ),
  visibilityFilter: state.visibilityFilter,
  sortOrder: state.sortOrder,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getAllSavedPrompts: () => dispatch(getAllSavedPrompts()),
  getOnePrompt: id => dispatch(getOnePrompt(id)),
  setVisibilityFilter: f => dispatch(setVisibilityFilter(f)),
  setSortOrder: order => dispatch(setSortOrder(order)),
  toggleStarredPrompt: prompt => dispatch(toggleStarredPrompt(prompt))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SavedPrompts)
);
