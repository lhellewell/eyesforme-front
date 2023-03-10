import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

export const CLIENT_ID: string = "41057098010-78mhsj3br4r5ki9lpii0ed0ef9bch0kr.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>;
  </React.StrictMode>,
)
