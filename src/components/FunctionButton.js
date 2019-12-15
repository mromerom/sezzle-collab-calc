import React, { useContext } from 'react';
import { CalcContext } from './CalcProvider';

const FunctionButton = ({ buttonValue }) => {
  // const { handleSetCalcFunction } = useContext(CalcContext);
  const { handleSetDisplayValue } = useContext(CalcContext);
  return (
    // <button className="function-button" type="button" onClick={() => handleSetCalcFunction(buttonValue)}>
    <button className="function-button" type="button" onClick={() => handleSetDisplayValue(buttonValue)}>
      {buttonValue}
    </button>
  );
};

export default FunctionButton;
