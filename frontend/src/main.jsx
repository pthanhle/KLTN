import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'

import App from './App.jsx'
import { store } from './store/store'
import { queryClient } from './config/queryClient'
import './index.css'
import './i18n/i18n'
import './config/chartConfig'

import { GoogleOAuthProvider } from '@react-oauth/google';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={googleClientId}>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <HelmetProvider>
                        <App />
                    </HelmetProvider>
                </QueryClientProvider>
            </Provider>
        </GoogleOAuthProvider>
    </React.StrictMode>
)
