import React from 'react';
import { getAllElements } from '../store/reducers/storyElements';
import { savePrompt } from '../store/reducers/prompts';
import { connect } from 'react-redux';
import { randomNumber, article } from './helperFuncs';

class PromptGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: '',
      adjective: '',
      character: '',
      detail: '',
      action: '',
      climax: ''
    };
    this.generate = this.generate.bind(this);
    this.savePrompt = this.savePrompt.bind(this);
  }

  componentDidMount() {
    this.props.getAllElements();
  }

  savePrompt() {
    const elements = {
      setting: this.state.setting,
      adjective: this.state.adjective,
      character: this.state.character,
      detail: this.state.detail,
      action: this.state.action,
      climax: this.state.climax
    };
    this.props.savePrompt(elements);
  }

  generate() {
    const { elements } = this.props;
    const current = {};
    for (let key in elements) {
      if (elements.hasOwnProperty(key)) {
        let singular = key === 'climaxes' ? key.slice(0, -2) : key.slice(0, -1);
        let len = elements[key].length;
        let random = randomNumber(len);
        current[singular] = elements[key][random].text;
      }
    }
    this.setState({
      setting: current.setting,
      adjective: current.adjective,
      character: current.character,
      detail: current.detail,
      action: current.action,
      climax: current.climax
    });
  }

  render() {
    return (
      <div className="main-content-prompt-div">
        <div className="btn-wrapper">
          <button
            type="button"
            className="generate-btn"
            onClick={() => this.generate()}
          >
            Generate Prompt
          </button>
        </div>
        <div className="prompt-wrapper-div">
          {this.state.setting ? (
            <div className="prompt-div">
              <p className="prompt">{`${this.state.setting},`}</p>
              <p>{`${article(this.state.adjective[0])} ${
                this.state.adjective
              } ${this.state.character}`}</p>
              <p>{this.state.detail}</p>
              <p>{`${this.state.action}`}</p>
              <p>{`and ${this.state.climax}.`}</p>
            </div>
          ) : (
            ''
          )}
        </div>
        {this.state.setting ? (
          <div className="btn-wrapper">
            <button type="button" onClick={() => this.savePrompt()}>
              Save
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  elements: state.elements
});

const mapDispatchToProps = dispatch => ({
  getAllElements: () => dispatch(getAllElements()),
  savePrompt: els => dispatch(savePrompt(els))
});

// const mapStateToProps = state => ({
//   allSettings: state.settings.all,
//   current: state.settings.current
// });

// const mapDispatchToProps = (dispatch, getState) => ({
//   getAllSettings: () => dispatch(getAllSettings()),
//   getOneSetting: () => dispatch(getOneSetting())
// });

export default connect(mapStateToProps, mapDispatchToProps)(PromptGenerator);
