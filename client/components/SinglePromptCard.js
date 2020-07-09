import React from 'react';
import {addArticle} from './helperFuncs';
import moment from 'moment';

const SinglePromptCard = props => {
  const {prompts} = props;
  return (
    <div className="single-prompt-div">
      <p className="small-date">
        {moment(prompts.createdAt).format('MMM D YYYY')}
      </p>
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
