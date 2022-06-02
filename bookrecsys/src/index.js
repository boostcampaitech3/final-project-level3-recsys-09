import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { createStore } from 'redux'

const initState = {ID:"", login:"login"}

function reducer(state = initState, action){
    if (action.type === 'login'){
        initState.ID = action.payload
        initState.login = "logout"
    }
    else if (action.type === 'logout'){
        initState.ID = "x"
        initState.login = 'login'
    }
    return state
}

let store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
