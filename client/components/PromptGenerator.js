import React from 'react';
import { getAllElements, setCurrent } from '../store/reducers/storyElements';
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
    this.props.setCurrent();

    // const { elements } = this.props;
    // const current = {};
    // for (let key in elements) {
    //   if (elements.hasOwnProperty(key)) {
    //     let singular = key === 'climaxes' ? key.slice(0, -2) : key.slice(0, -1);
    //     let len = elements[key].length;
    //     let random = randomNumber(len);
    //     current[singular] = elements[key][random].text;
    //   }
    // }
    // this.setState({
    //   setting: current.setting,
    //   adjective: current.adjective,
    //   character: current.character,
    //   detail: current.detail,
    //   action: current.action,
    //   climax: current.climax
    // });
  }

  render() {
    return (
      <div className="main-content-wrapper">
        <div className="heading-div">
          <h2>Generate a writing prompt</h2>
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
            {this.props.current.setting.text ? (
              <div className="prompt-wrapper-div">
                <div className="prompt-div">
                  <p className="prompt">{`${this.props.setting.text},`}</p>
                  <p>{`${article(this.props.current.adjective.text[0])} ${
                    this.props.current.adjective.text
                  } ${this.props.current.character.text}`}</p>
                  <p>{this.props.current.detail.text}</p>
                  <p>{`${this.props.current.action.text}`}</p>
                  <p>{`and ${this.props.current.climax.text}.`}</p>
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
  elements: state.elements,
  current: state.elements.current,
  setting: state.elements.current.setting,
  adjective: state.elements.current.adjective,
  character: state.elements.current.character,
  detail: state.elements.current.detail,
  action: state.elements.current.action,
  climax: state.elements.current.climax
});

const mapDispatchToProps = dispatch => ({
  getAllElements: () => dispatch(getAllElements()),
  savePrompt: els => dispatch(savePrompt(els)),
  setCurrent: () => dispatch(setCurrent())
});

export default connect(mapStateToProps, mapDispatchToProps)(PromptGenerator);
