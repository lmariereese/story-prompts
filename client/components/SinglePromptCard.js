import React from 'react';
import { addArticle } from './helperFuncs';

const SinglePromptCard = props => {
  const { prompts } = props;
  return (
    <div className="single-prompt-div">
      <p>
        {`${prompts.setting}, ${addArticle(prompts.adjective)} ${
          prompts.character
        }, ${prompts.detail}, ${prompts.action} and ${prompts.climax}.`}
      </p>
    </div>
  );
};

export default SinglePromptCard;
