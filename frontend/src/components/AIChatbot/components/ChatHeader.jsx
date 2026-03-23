import { X, Bot } from 'lucide-react';
import { Button } from 'antd';

const ChatHeader = ({ onClose, t }) => {
    return (
        <div className="flex items-center justify-between bg-yellow-500 dark:bg-premium-gold px-4 py-3 text-slate-900 border-b border-yellow-600/20">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full">
                    <Bot size={18} className="text-slate-900" />
                </div>
                <div>
                    <h3 className="font-bold text-[15px] leading-tight">{t('chatbot_title', 'CarsShop AI')}</h3>
                    <p className="text-[11px] font-medium opacity-80">{t('chatbot_subtitle', 'Trợ lý tư vấn 24/7')}</p>
                </div>
            </div>
            <Button 
                type="text"
                onClick={onClose} 
                icon={<X size={20} />}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-900/10 text-slate-900 transition-colors p-0 border-0 shadow-none"
            />
        </div>
    );
};

export default ChatHeader;
