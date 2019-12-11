import React from 'react';
import { getAllElements } from '../store/reducers/storyElements';
import { savePrompt } from '../store/reducers/prompts';
import { connect } from 'react-redux';
import { randomNumber, article } from './helperFuncs';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

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
    this.share = this.share.bind(this);
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
    toast('Your prompt was saved!', {
      position: 'bottom-right',
      autoClose: 2000
    });
  }

  share() {
    console.log('clicked!');
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
      <div className="main-content-wrapper">
        <div className="heading-div">
          <h2>Generate a short story prompt</h2>
        </div>
        <div className="body-content">
          <div className="section-small">
            <div id="small-card">
              <h3>
                Got writer's block?<span />
              </h3>
              <div className="btn-wrapper">
                <button
                  type="button"
                  className="generate-btn"
                  onClick={() => this.generate()}
                >
                  Generate Prompt
                </button>
              </div>
            </div>
          </div>
          <div className="section">
            {this.state.setting ? (
              <div className="prompt-wrapper-div">
                <div className="prompt-div">
                  <p className="prompt">{`${this.state.setting},`}</p>
                  <p>{`${article(this.state.adjective[0])} ${
                    this.state.adjective
                  } ${this.state.character}`}</p>
                  <p>{this.state.detail}</p>
                  <p>{`${this.state.action}`}</p>
                  <p>{`and ${this.state.climax}.`}</p>
                  {/* </div> */}
                  <div className="prompt-btn-div">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => this.savePrompt()}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => this.share()}
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PromptGenerator);
