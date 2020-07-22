import React from 'react';
import moment from 'moment';

const SmallDate = props => {
  const formattedTime = moment(props.timestamp).format('MMM D YYYY, h:mma');
  return (
    <div className="date-wrapper">
      <p className="small-date">{`${props.text} ${formattedTime}`}</p>
    </div>
  );
};

export default SmallDate;
