import React from 'react';
import { getAllElements } from '../store/reducers/storyElements';
import { savePrompt } from '../store/reducers/prompts';
import { connect } from 'react-redux';
import { randomNumber } from './helperFuncs';

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
    this.article = this.article.bind(this);
    this.savePrompt = this.savePrompt.bind(this);
  }

  componentDidMount() {
    this.props.getAllElements();
  }

  article(char) {
    const vowels = 'aeiou';
    if (vowels.indexOf(char) !== -1) {
      return 'an';
    }
    return 'a';
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
      <div>
        <p>some text</p>
        <button type="button" onClick={() => this.generate()}>
          Click me
        </button>
        <div>
          {this.state.setting ? (
            <p>{`${this.state.setting}, ${this.article(
              this.state.adjective[0]
            )} ${this.state.adjective} ${this.state.character} ${
              this.state.detail
            } ${this.state.action} and ${this.state.climax}.`}</p>
          ) : (
            ''
          )}
        </div>
        {this.state.setting ? (
          <button type="button" onClick={() => this.savePrompt()}>
            Save
          </button>
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