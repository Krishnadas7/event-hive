import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { GoogleOAuthProvider } from '@react-oauth/google';

 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.CLIENT_ID as string}>
       <App />
    </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)
