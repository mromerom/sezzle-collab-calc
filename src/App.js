import React from 'react';
import Calculator from './components/Calculator';
import CalcProvider from './components/CalcProvider';


const express = require ('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);

app.use(express.static())


function App() {

    console.log(localStorage, "<== LOCAL STORAGE");
    return(
        <CalcProvider>
            <meta charset="utf-8"/>
            <Calculator />
        </CalcProvider>
    )
}

export default App;