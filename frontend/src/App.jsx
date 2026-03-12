import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AppProvider } from './contexts/AppContext';
import { App as AntdApp } from 'antd'; // Tương đương Toast/Message context của Ant Design
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <AppProvider>
                    <AntdApp>
                        <AppRoutes />
                    </AntdApp>
                </AppProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
