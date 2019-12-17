import React, { useState, createContext } from 'react';
import io from 'socket.io-client';

export const CalcContext = createContext();

function reducer(state, action) {
    const { msg } = action.payload;
    switch(action.type) {
        case 'RECEIVE_MESSAGE':
            return (
                [{msg}, ...state]
            )
        default:
            return state;
    }
}

let socket;

const sendChatAction = (value) => {
    socket.emit('chat message', value);
}

const CalcProvider = props => {

    const [number, setNumber] = useState('');
    const [calculationList, setCalculationList] = useState([]);
    
    const [calcMessages, setCalcMessages] = useState([]);

    const addMessage = (message) => {
        const newMessage = {
            id: calcMessages.length,
            msg: message
        }
        console.log(message)
        setCalcMessages([message]);
    }

    const [allChats, dispatch] = React.useReducer(reducer, [...calcMessages]);

    if(!socket) {
        socket = io(':3001');
        socket.on('chat message', function(msg){
            // dispatch({type: 'RECEIVE_MESSAGE', payload: msg})
            addMessage(msg);
            // setCalcMessages([msg, ...calcMessages]);
            // console.log(calcMessages, "<== CALCMESSAGES")
            // return calcMessages;
            return (
                <div value={msg.msg} >
                        {msg}
                    </div>
            )
        });
    }

    const generateCalcMessage = () => {
        return(
            <div className="calcMsg">
                {calcMessages.map((msg, i) => (
                    <div value={msg.msg} key={i}>
                        {msg}
                    </div>
                ))}
            </div>
        );
    }
    


    // takes care of displaying the digit clicked
    const handleSetDisplayValue = num => {
        if ((!number.includes('.') || num !== '.') && number.length < 10) {
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
        const result = formatCalculation(number);
        setNumber(String(eval(number)));
        addCalculation(result);
        addMessage(result);
        handleClearValue();
    };

    const formatCalculation = (x) => {
        return String(x + " = " + eval(x));
    }

    return (
        <CalcContext.Provider
            value={{
                addCalculation,
                addMessage,
                calcMessages,
                calculate,
                calculationList,
                handleBackButton,
                handleClearValue,
                handleSetDisplayValue,
                number,
                sendChatAction,
                setNumber
            }}
        >
            {props.children}
        {generateCalcMessage()}
        </CalcContext.Provider>
    );
};

export default CalcProvider;