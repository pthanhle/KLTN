import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx'
import { store } from './store/store'
import { queryClient } from './config/queryClient'
import './index.css'
import './i18n/i18n'
import './config/chartConfig'

import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="939950020568-7su5pq39r781kgglsbm8lr7gm55l52gm.apps.googleusercontent.com">
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </Provider>
        </GoogleOAuthProvider>
    </React.StrictMode>
)
