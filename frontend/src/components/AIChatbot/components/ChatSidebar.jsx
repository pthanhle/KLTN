import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import { Button } from 'antd';

const ChatSidebar = ({ sessions, currentSessionId, setCurrentSessionId, handleCreateNewSession, handleDeleteSession, t }) => {
    return (
        <div className="hidden md:flex flex-col w-[220px] bg-slate-50 dark:bg-[#0b0f19] border-r border-gray-200 dark:border-gray-800">
            <div className="p-3 border-b border-gray-200 dark:border-gray-800">
                <Button 
                    type="primary"
                    onClick={handleCreateNewSession}
                    icon={<Plus size={16} />}
                    className="flex items-center justify-center gap-2 w-full py-2 !bg-yellow-500 hover:!bg-yellow-400 !text-slate-900 rounded-lg font-bold text-sm transition-colors border-0"
                >
                    {t('chatbot_new_chat', 'Nhắn tin mới')}
                </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase p-2">{t('chatbot_history', 'Lịch sử')}</p>
                {sessions.map(s => (
                    <div 
                        key={s.id}
                        onClick={() => setCurrentSessionId(s.id)}
                        className={`flex items-center justify-between group p-2 rounded-lg cursor-pointer transition-colors ${
                            currentSessionId === s.id 
                            ? 'bg-white dark:bg-[#1e2330] shadow-sm border border-gray-100 dark:border-gray-800' 
                            : 'hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent'
                        }`}
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
                            <MessageSquare size={14} className={currentSessionId === s.id ? 'text-yellow-500' : 'text-slate-400'} />
                            <span className="text-sm text-slate-700 dark:text-slate-300 truncate font-medium">{s.title}</span>
                        </div>
                        <Button 
                            type="text"
                            onClick={(e) => handleDeleteSession(e, s.id)}
                            icon={<Trash2 size={14} />}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity p-0 w-6 h-6 flex items-center justify-center"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatSidebar;
