import React, { useState, createContext } from 'react';
import io from 'socket.io-client';

export const CalcContext = createContext();

const initialState = [];

function reducer(state, action) {
    const { msg, messages } = action.payload;
    switch(action.type) {
        case 'RECEIVE_MESSAGE':
            // return {
            //     ...state,            // brings the entire previous state
            //     messages
            //     // [messages]: [
            //     //     ...state[messages],
            //     //     {
            //     //         msg         // same as msg: msg
            //     //     }
            //     // ]
            // }
            return ([{msg}, ...state])
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
    
    const [allCalculations, dispatch] = React.useReducer(reducer, initialState);

    if(!socket) {
        socket = io(':3001');
        socket.on('chat message', function(msg){
            console.log({msg});
            dispatch({type: 'RECEIVE_MESSAGE', payload: msg})
        });
    }
    
    
    const addMessage = (message) => {
        const newMessage = {
            id: calcMessages.length,
            msg: message
        }
        // console.log(message)
        setCalcMessages([newMessage.msg, ...calcMessages]);
        calcMessages.map(() => console.log(...calcMessages));
    }

    const generateCalcMessage = () => {
        return(
            <div className="calcMsg">
                {calculationList.map((msg, i) => (
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
        generateCalcMessage()
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
                allCalculations,
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
            {/* {initialState.messages.map((messages, i) => (
                <div key={i}>
                    {messages.msg}
                </div>
            ))} */}
            {allCalculations.map((message, i) => (
                <div key={i}>
                    {message.msg}
                </div>
            ))}
        </CalcContext.Provider>
    );
};

export default CalcProvider;