import React from 'react';

const FilterButtons = props => {
  return (
    <div className="filter-div">
      <button
        type="button"
        className={props.visibilityFilter === 'SHOW_ALL' ? 'active-filter' : ''}
        onClick={() => props.filter('SHOW_ALL')}
      >
        All
      </button>
      <button
        type="button"
        className={
          props.visibilityFilter === 'SHOW_IN_PROGRESS' ? 'active-filter' : ''
        }
        onClick={() => props.filter('SHOW_IN_PROGRESS')}
      >
        In-Progress
      </button>
      <button
        type="button"
        className={
          props.visibilityFilter === 'SHOW_STARRED' ? 'active-filter' : ''
        }
        onClick={() => props.filter('SHOW_STARRED')}
      >
        Starred
      </button>
    </div>
  );
};

export default FilterButtons;
