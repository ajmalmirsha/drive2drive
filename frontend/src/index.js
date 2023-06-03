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
    
    <GoogleOAuthProvider clientId='758834080651-p52h1mnkh399i6btqo6j0ltbt35kk16k.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
 
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

