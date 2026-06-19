import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AppProvider } from './contexts/AppContext';
import { App as AntdApp } from 'antd';
import { ThemeProvider } from './contexts/ThemeContext';
import AuthInitializer from './components/AuthInitializer';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <ThemeProvider>
                    <AppProvider>
                        <AntdApp>
                            <AuthInitializer />
                            <AppRoutes />
                        </AntdApp>
                    </AppProvider>
                </ThemeProvider>
            </ErrorBoundary>
        </BrowserRouter>
    )
}

export default App
