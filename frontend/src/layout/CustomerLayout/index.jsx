import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const CustomerLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
            <Header />
            <main className="flex-1 w-full bg-white dark:bg-[#0a0a0b] transition-colors">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default CustomerLayout;
