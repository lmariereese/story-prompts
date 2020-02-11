import React from 'react';
import {getAllElements, setCurrent} from '../store/reducers/storyElements';
import {savePrompt} from '../store/reducers/prompts';
import {connect} from 'react-redux';
import {addArticle} from './helperFuncs';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';

class PromptGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.generate = this.generate.bind(this);
    this.savePrompt = this.savePrompt.bind(this);
    this.share = this.share.bind(this);
  }

  componentDidMount() {
    if (!this.props.elements.setting.length) {
      this.props.getAllElements();
    }
  }

  savePrompt() {
    if (this.props.user.id) {
      const {
        setting,
        adjective,
        character,
        detail,
        action,
        climax
      } = this.props.current;
      this.props.savePrompt({
        setting,
        adjective,
        character,
        detail,
        action,
        climax
      });
      toast('Your prompt was saved!', {
        position: 'bottom-right',
        autoClose: 2000
      });
    } else {
      toast('Log in or sign up to start saving prompts!', {
        position: 'bottom-right',
        autoClose: 2000
      });
    }
  }

  share() {
    console.log('clicked!');
  }

  generate() {
    this.props.setCurrent();
  }

  render() {
    return (
      <div className="main-content-prompt-wrapper">
        {this.props.current.setting.id ? (
          <div className="main-content-wrapper">
            <div className="prompt-heading-div">
              <h2>Start here</h2>
              <p>Or generate another prompt</p>
            </div>
            <div className="prompt-wrapper-div">
              <div className="prompt">
                <p>{`${this.props.current.setting.text},`}</p>
                <p>{`${addArticle(this.props.current.adjective.text)} ${
                  this.props.current.character.text
                }`}</p>
                <p>{this.props.current.detail.text}</p>
                <p>{`${this.props.current.action.text}`}</p>
                <p>{`and ${this.props.current.climax.text}.`}</p>
              </div>
              <div className="prompt-action-btns">
                <div>
                  <button
                    type="button"
                    className="get-prompt-btn"
                    onClick={() => this.generate()}
                  >
                    Get Prompt
                  </button>
                </div>
                <div>
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
                    disabled
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  elements: state.elements,
  current: state.elements.current,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getAllElements: () => dispatch(getAllElements()),
  savePrompt: els => dispatch(savePrompt(els)),
  setCurrent: () => dispatch(setCurrent())
});

export default connect(mapStateToProps, mapDispatchToProps)(PromptGenerator);
