import React from 'react';
import {addArticle} from './helperFuncs';

// this is ugo and also not working, refactor
const PromptDisplay = props => {
  const {setting, adjective, character, detail, action, climax} = props.current;
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
