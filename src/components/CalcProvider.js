import React, { useState, createContext } from 'react';
import io from 'socket.io-client';

export const CalcContext = createContext();


const sendChatAction = (value) => {
    socket.emit('calc message', value);
    console.log(value);
}

let socket;

const CalcProvider = props => {

    const [number, setNumber] = useState('');
    const [calculationList, setCalculationList] = useState([]);

    if(!socket) {
        socket = io(':3001');
    }


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

    // adds latest calculation to collection of calculations
    const addCalculation = (calculation) => {
        const newCalculation = {
            id: calculationList.length,
            calculation: calculation
        }
        setCalculationList([newCalculation.calculation, ...calculationList]);
    }

    // creates calculation string, calculates total
    const calculate = () => {
        const result = number + " = " + eval(number);
        setNumber(String(eval(number)));
        addCalculation(result);
        sendChatAction(calculationList[0]);
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
                sendChatAction,
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