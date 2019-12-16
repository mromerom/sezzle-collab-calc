import React from 'react';
import Calculator from './components/Calculator';
import CalcProvider from './components/CalcProvider';


function App() {

    console.log(localStorage, "<== LOCAL STORAGE");
    return(
        <CalcProvider>
            <Calculator />
        </CalcProvider>
    )
}

export default App;