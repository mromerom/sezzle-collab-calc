import React, { useState, createContext } from 'react';

export const CalcContext = createContext();

const CalcProvider = props => {
    const [number, setNumber] = useState('');
    const [calculationList, setCalculationList] = useState([]);

    // takes care of displaying the digit clicked
    const handleSetDisplayValue = num => {
        if ((!number.includes('.') || num !== '.') && number.length < 15) {
            setNumber(`${(number + num).replace(/^0+/, '')}`);
        }
    };

    // resets calculator
    const handleClearValue = ()  => {
        setNumber('');
    };

    // allows deletion of character input, one by one
    const handleBackButton = () => {
        if(number !== '') {
            const deletedNumber = number.slice(0, number.length - 1);
            setNumber(deletedNumber);
        };
    }

    const addCalculation = (calculation) => {
        const newCalculation = {
            id: calculationList.length,
            calculation: calculation
        }

        setCalculationList([newCalculation.calculation, ...calculationList]);
    }

    const calculate = () => {
        const result = number + " = " + eval(number);
        setNumber(String(eval(number)));
        addCalculation(result);
        handleClearValue();
    };

    return (
        <CalcContext.Provider
            value={{
                addCalculation,
                calculate,
                handleBackButton,
                handleClearValue,
                handleSetDisplayValue,
                number,
                setNumber,
            }}
        >
            {props.children}
        <div className="calculation">
            {
                calculationList.map((calculation, i) => (
                    <div value={calculation.calculation} key={i}>
                        {calculation}
                    </div>
                ))
            }
        </div>
        </CalcContext.Provider>
    );
};

export default CalcProvider;