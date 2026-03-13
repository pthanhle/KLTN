import { Menu } from 'lucide-react';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import UserActions from './components/UserActions';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#0b0f19] border-b border-gray-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
            <div className="w-full px-4 md:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="flex h-[72px] items-center justify-between">
                    

                    {/* Left: Logo */}
                    <div className="flex-shrink-0 flex items-center h-full mr-4">
                        <Logo />
                    </div>
                        
                    {/* Center: Desktop Navigation */}
                    <div className="hidden lg:flex flex-1 justify-center h-full items-center">
                        <Navigation />
                    </div>

                    {/* Right: User Actions, Meta Links & Authentication */}
                    <div className="hidden md:flex flex-shrink-0 items-center ml-4">
                        <UserActions />
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <button className="text-slate-700 dark:text-slate-300 hover:text-yellow-500 transition-colors p-2">
                            <Menu size={24} />
                        </button>
                    </div>
                    
                </div>
            </div>
        </header>
    );
};

export default Header;
