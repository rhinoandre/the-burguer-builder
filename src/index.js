import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const app = (
    <div>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </div>
)

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
