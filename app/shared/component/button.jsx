import React from 'react';

const Button = ({ label, handleClick }) => (
  <button onClick={handleClick} type="button">
    {label}
  </button>
);

export default Button;
