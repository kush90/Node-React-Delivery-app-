import React from "react";
import ReactDOM from "react-dom";
import {createStore,applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import rootreducer from '../app/reducers/index';
import thunk from 'redux-thunk';

// custom components
import App from './components/app';

const store =  createStore(rootreducer,applyMiddleware(thunk));


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("index"));