import React from 'react';
import {addArticle} from './helperFuncs';

// this is ugo and also not working, refactor
const PromptDisplay = props => {
  const setting = props.current.setting.text
    ? props.current.setting.text
    : props.current.setting;
  const adjective = props.current.adjective.text
    ? props.current.adjective.text
    : props.current.adjective;
  const character = props.current.character.text
    ? props.current.character.text
    : props.current.character;
  const detail = props.current.detail.text
    ? props.current.detail.text
    : props.current.detail;
  const action = props.current.action.text
    ? props.current.action.text
    : props.current.adjective;
  const climax = props.current.climax.text
    ? props.current.climax.text
    : props.current.climax;
  return (
    <div className="prompt">
      <p>{`${setting},`}</p>
      <p>{`${addArticle(adjective)} ${character}`}</p>
      <p>{detail}</p>
      <p>{`${action}`}</p>
      <p>{`and ${climax}.`}</p>
    </div>
  );
};

export default PromptDisplay;
