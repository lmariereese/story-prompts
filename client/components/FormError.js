import React from 'react';

const FormError = props => {
  return (
    <div>
      <p className="form-error-message">{props.error}</p>
    </div>
  );
};

export default FormError;
