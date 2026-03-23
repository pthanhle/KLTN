import { CarFront, Minus, X, Menu } from 'lucide-react';
import IconButton from '../common/IconButton';

const Header = ({ onClose, t }) => {
    return (
        <header className="bg-slate-50/90 dark:bg-slate-900/60 backdrop-blur-xl flex justify-between items-center w-full px-4 md:px-5 py-3 z-20 border-b border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-3">
                <IconButton icon={Menu} className="md:hidden" />
                <div className="bg-yellow-500 p-2 rounded-xl text-slate-900 shadow-lg shadow-yellow-500/20 shrink-0">
                    <CarFront size={20} className="stroke-slate-900" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-sm font-black tracking-widest text-slate-900 dark:text-yellow-500 uppercase font-headline">
                        {t('chatbot_title')}
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.1em] font-medium text-slate-500 dark:text-slate-400">
                        {t('chatbot_subtitle')}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <IconButton icon={Minus} onClick={onClose} ariaLabel="Minimize" />
                <IconButton icon={X} onClick={onClose} size={22} ariaLabel="Close" />
            </div>
        </header>
    );
};
export default Header;
