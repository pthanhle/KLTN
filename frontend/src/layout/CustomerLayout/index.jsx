import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingAIChatbot from '@/components/AIChatbot/FloatingAIChatbot';

const CustomerLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
            <Header />
            <main className="flex-1 w-full bg-white dark:bg-[#0a0a0b] transition-colors relative z-0">
                <Outlet />
            </main>
            <Footer />
            <FloatingAIChatbot />
        </div>
    );
};

export default CustomerLayout;
