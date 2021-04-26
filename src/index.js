import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from "./routes";
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from './store';


ReactDOM.render(

  <Provider store={Store}>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

