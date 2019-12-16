import React, { useContext } from 'react';
import { CalcContext } from './CalcProvider';

const EqualButton = () => {
  const { calculate, number, sendChatAction } = useContext(CalcContext);

  const handleSubmit = e => {
    e.preventDefault();
    calculate();
    console.log(e.target.value);
    console.log("test");
    sendChatAction(number + " = " + String(eval(number)));
  }

  return (
    <button className="white-button" type="submit" onClick={(e) => handleSubmit(e)}>
      =
    </button>
  );
};

export default EqualButton;
