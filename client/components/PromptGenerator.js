import React from 'react';
import { getAllElements } from '../store/reducers/storyElements';
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
  }

  componentDidMount() {
    this.props.getAllElements();
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
            <p>{`${this.state.setting}, a ${this.state.adjective} ${
              this.state.character
            } ${this.state.detail} ${this.state.action} and ${
              this.state.climax
            }.`}</p>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  elements: state.elements
});

const mapDispatchToProps = dispatch => ({
  getAllElements: () => dispatch(getAllElements())
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
