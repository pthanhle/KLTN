import { Paperclip, Send } from 'lucide-react';
import { Input } from 'antd';
import QuickActions from './QuickActions';
import IconButton from '../../common/IconButton';

const InputArea = ({ inputText, setInputText, isLoading, handleSendMessage, t }) => {

    const onActionClick = (text) => {
        setInputText(text);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    return (
        <footer className="pt-2 space-y-3 bg-slate-50/80 dark:bg-[#141416]/80 border-t border-slate-200 dark:border-white/5 pb-4 backdrop-blur-md">
            <QuickActions t={t} onActionClick={onActionClick} />

            <div className="relative flex items-end gap-3 px-4 md:px-6">
                <div className="flex-1 bg-white dark:bg-[#1c1c1e] rounded-2xl ring-1 ring-slate-200 dark:ring-white/10 flex items-center px-4 py-1.5 min-h-[56px] focus-within:ring-yellow-500/50 focus-within:bg-white dark:focus-within:bg-[#232328] transition-all shadow-sm group">
                    <IconButton icon={Paperclip} className="hover:bg-slate-100 dark:hover:bg-white/5 !w-9 !h-9" title="Đính kèm tệp" />

                    <div className="flex-1 flex items-center h-full">
                        <Input.TextArea
                            className="bg-transparent border-none focus:ring-0 text-[15px] w-full chat-scrollbar placeholder:text-slate-400 dark:placeholder:text-slate-500 py-3 outline-none text-slate-800 dark:text-white hover:bg-transparent focus:bg-transparent"
                            placeholder={t('chatbot_input_placeholder')}
                            autoSize={{ minRows: 1, maxRows: 4 }}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                        />
                    </div>
                </div>
                <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isLoading}
                    className="w-14 h-[56px] flex-shrink-0 bg-gradient-to-br from-yellow-400 to-yellow-600 text-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/20 active:scale-95 duration-200 transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed disabled:active:scale-100"
                >
                    <Send size={22} className="ml-1" strokeWidth={2.5} />
                </button>
            </div>

            <p className="text-[10px] text-center text-slate-500 dark:text-slate-400/60 leading-tight px-6 font-medium">
                {t('chatbot_disclaimer')}
            </p>
        </footer>
    );
};
export default InputArea;
