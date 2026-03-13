import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AppProvider } from './contexts/AppContext';
import { App as AntdApp } from 'antd'; // Tương đương Toast/Message context của Ant Design
import { ThemeProvider } from './contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';

function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <ThemeProvider>
                    <AppProvider>
                        <AntdApp>
                            <AppRoutes />
                        </AntdApp>
                    </AppProvider>
                </ThemeProvider>
            </BrowserRouter>
        </HelmetProvider>
    )
}

export default App
