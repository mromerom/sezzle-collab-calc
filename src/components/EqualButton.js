import React, { useContext } from 'react';
import { CalcContext } from './CalcProvider';

const EqualButton = () => {
  const { calculate } = useContext(CalcContext);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <button className="white-button" type="submit" onSubmit={handleSubmit} onClick={() => calculate()}>
      =
    </button>
  );
};

export default EqualButton;
