import React from 'react';
import {connect} from 'react-redux';
import history from '../history';
import {getAllElements, setCurrent} from '../store/reducers/storyElements';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.generate = this.generate.bind(this);
  }

  componentDidMount() {
    if (!this.props.elements.setting.length) {
      this.props.getAllElements();
    }
  }

  generate() {
    this.props.setCurrent();
    history.push('/prompts');
  }

  render() {
    return (
      <div className="main-content-prompt-wrapper">
        <div className="cta-div">
          <h1>Writer's block?</h1>
          <h3>Generate a short story prompt now</h3>
          <div className="cta-btn-wrapper">
            <button
              type="button"
              className="generate-btn"
              onClick={() => this.generate()}
            >
              Get Prompt
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  elements: state.elements,
  current: state.elements.current
});

const mapDispatch = dispatch => ({
  setCurrent: () => dispatch(setCurrent()),
  getAllElements: () => dispatch(getAllElements())
});

export default connect(mapState, mapDispatch)(Home);
