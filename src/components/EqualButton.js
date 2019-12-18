import React, { useContext } from 'react';
import { CalcContext } from './CalcProvider';

const EqualButton = () => {
  const { allCalculations, calculate, number, sendChatAction } = useContext(CalcContext);

  return (
    <button
      className="white-button"
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        calculate();
        sendChatAction({msg: String(number + " = " + eval(number))});
      }}
    >
      =
    </button>
  );
};

export default EqualButton;
