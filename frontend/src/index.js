import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css'
import  { persistor, store } from './redux/store';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {GoogleOAuthProvider} from '@react-oauth/google'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
    
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_KEY}>
    <App />
    </GoogleOAuthProvider>
 
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

