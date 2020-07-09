import React from 'react';
import {addArticle} from './helperFuncs';

const SinglePromptCard = props => {
  const {prompts} = props;
  return (
    <div className="single-prompt-div">
      <p>{prompts.createdAt}</p>
      <p>
        {`${prompts.setting}, ${addArticle(prompts.adjective)} ${
          prompts.character
        }, ${prompts.detail}, ${prompts.action} and ${prompts.climax}.`}
      </p>
      {props.view ? (
        <div>
          <button type="button" onClick={() => props.more(prompts.id)}>
            More
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SinglePromptCard;
