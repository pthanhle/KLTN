import { MessageSquarePlus } from 'lucide-react';
import SessionItem from './SessionItem';
import UserProfile from './UserProfile';

const ChatSidebar = ({ sessions, currentSessionId, setCurrentSessionId, handleCreateNewSession, handleDeleteSession, t }) => {
    return (
        <aside className="hidden md:flex flex-col w-56 lg:w-60 bg-white/95 dark:bg-[#0c1324]/80 backdrop-blur-2xl rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.1),0_15px_30px_rgba(0,0,0,0.2)]">
            <div className="p-4 border-b border-slate-200 dark:border-white/5">
                <button 
                    onClick={handleCreateNewSession}
                    className="w-full py-3 px-4 bg-yellow-500 text-slate-900 rounded-xl flex items-center justify-center gap-2 font-bold text-sm tracking-wide shadow-lg shadow-yellow-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                    <MessageSquarePlus size={18} />
                    {t('chatbot_new_chat')}
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto chat-scrollbar p-3 space-y-1">
                <div className="px-3 py-2 text-[10px] font-black tracking-[0.2em] text-slate-400 dark:text-white/40 uppercase">
                    {t('chatbot_recent')}
                </div>
                {sessions.map(session => (
                    <SessionItem 
                        key={session.id}
                        session={session}
                        currentSessionId={currentSessionId}
                        onClick={setCurrentSessionId}
                        onDelete={handleDeleteSession}
                    />
                ))}
            </div>
            
            <UserProfile t={t} isLoading={false} />
        </aside>
    );
};
export default ChatSidebar;
