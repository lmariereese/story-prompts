import React from 'react';
import { connect } from 'react-redux';
import { getAllSavedPrompts } from '../store/reducers/prompts';
import SinglePromptCard from './SinglePromptCard';

class SavedPrompts extends React.Component {
  componentDidMount() {
    this.props.getAllSavedPrompts();
  }

  render() {
    return (
      <div>
        <div>
          <h2>Your Saved Prompts</h2>
        </div>
        <div>
          {this.props.savedPrompts
            ? this.props.savedPrompts.map(item => {
                return <SinglePromptCard key={item.id} prompts={item} />;
              })
            : 'Login to see saved prompts.'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  savedPrompts: state.prompts,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getAllSavedPrompts: () => dispatch(getAllSavedPrompts())
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedPrompts);
