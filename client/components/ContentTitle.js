import React from 'react';
import {useSelector} from 'react-redux';

export const ContentTitle = () => {
  const currentContent = useSelector(state => state.prompts.currentContent);
  console.log(currentContent);
  return (
    <div>
      <h3>
        {currentContent === null || currentContent.title === null
          ? 'Untitled'
          : currentContent.title}
      </h3>
    </div>
  );
};

// export default ContentTitle;
