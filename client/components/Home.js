import React from 'react';
import {connect} from 'react-redux';
import history from '../history';
import {getAllElements, setCurrent} from '../store/reducers/storyElements';
import {getAllShared} from '../store/reducers/shared';
import {addArticle} from './helperFuncs';
import moment from 'moment';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.generate = this.generate.bind(this);
  }

  componentDidMount() {
    if (!this.props.elements.setting.length) {
      this.props.getAllElements();
    }
    this.props.getAllShared();
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
        {this.props.shared.length !== 0 ? (
          <div>
            <h2>Recently Shared Story Prompts</h2>
            <div>
              {this.props.shared.map(item => {
                return (
                  <div className="single-prompt-div" key={item.id}>
                    <div>
                      <p className="small-date">
                        {moment(item.createdAt).format('MMM D YYYY')}
                      </p>
                    </div>
                    <p>
                      {`${item.setting}, ${addArticle(item.adjective)} ${
                        item.character
                      }, ${item.detail}, ${item.action} and ${item.climax}.`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>'Loading'</div>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  elements: state.elements,
  current: state.elements.current,
  shared: state.shared.all
});

const mapDispatch = dispatch => ({
  setCurrent: () => dispatch(setCurrent()),
  getAllElements: () => dispatch(getAllElements()),
  getAllShared: () => dispatch(getAllShared())
});

export default connect(mapState, mapDispatch)(Home);
