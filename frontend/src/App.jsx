import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AppProvider } from './contexts/AppContext';
import { App as AntdApp } from 'antd';
import { ThemeProvider } from './contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import AuthInitializer from './components/AuthInitializer';

function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <ThemeProvider>
                    <AppProvider>
                        <AntdApp>
                            <AuthInitializer />
                            <AppRoutes />
                        </AntdApp>
                    </AppProvider>
                </ThemeProvider>
            </BrowserRouter>
        </HelmetProvider>
    )
}

export default App
