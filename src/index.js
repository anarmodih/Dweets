import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import 'react-phone-input-2/lib/style.css';
import 'font-awesome/css/font-awesome.min.css';
import "react-toastify/dist/ReactToastify.css";
import * as serviceWorker from './serviceWorker';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
    <Router >
            <App />
               <ToastContainer 
               autoClose={5000}
                />
    </Router>, document.getElementById('root'));
serviceWorker.unregister();
