import { Menu } from 'lucide-react';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import UserActions from './components/UserActions';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#0b0f19] border-b border-gray-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
            <div className="container mx-auto max-w-[1400px]">
                <div className="flex h-[72px] items-center justify-between px-4 lg:px-6 xl:px-8">
                    
                    {/* Left & Center: Logo + Navigation Links */}
                    <div className="flex items-center xl:gap-16 lg:gap-8 gap-4 h-full">
                        <Logo />
                        
                        {/* Center: Desktop Navigation */}
                        <div className="hidden lg:flex h-full items-center">
                            <Navigation />
                        </div>
                    </div>

                    {/* Right: User Actions, Meta Links & Authentication */}
                    <div className="hidden md:flex items-center">
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
