import React from 'react';
import {addArticle} from './helperFuncs';
import moment from 'moment';

const SinglePromptCard = props => {
  const {prompts} = props;
  return (
    <div className="single-prompt-div">
      <div>
        <p className="small-date">
          {moment(prompts.createdAt).format('MMM D YYYY')}
        </p>
        <button
          type="button"
          className={prompts.starred ? 'star-btn starred' : 'star-btn'}
          onClick={() => props.toggleStar(prompts)}
        >
          Starred
        </button>
      </div>
      <p>
        {`${prompts.setting}, ${addArticle(prompts.adjective)} ${
          prompts.character
        }, ${prompts.detail}, ${prompts.action} and ${prompts.climax}.`}
      </p>
      {props.view ? (
        <div>
          <button type="button" onClick={() => props.more(prompts.id)}>
            {prompts.content !== null ? 'Continue' : 'Start'}
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SinglePromptCard;
