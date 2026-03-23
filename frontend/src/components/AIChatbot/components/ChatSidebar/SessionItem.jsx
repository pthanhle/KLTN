import { Trash2 } from 'lucide-react';

const SessionItem = ({ session, currentSessionId, onClick, onDelete }) => {
    const isActive = session.id === currentSessionId;
    
    return (
        <div 
            onClick={() => onClick(session.id)}
            className={`group relative flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors border ${
                isActive 
                ? 'bg-yellow-500/10 border-yellow-500/30' 
                : 'border-transparent hover:bg-slate-200 dark:hover:bg-white/5 hover:border-slate-300 dark:hover:border-white/5'
            }`}
        >
            <div className="flex flex-col gap-0.5 overflow-hidden">
                <span className={`text-xs font-semibold truncate w-40 ${isActive ? 'text-yellow-600 dark:text-yellow-500 font-bold' : 'text-slate-700 dark:text-white/90'}`}>
                    {session.title}
                </span>
                <span className={`text-[10px] ${isActive ? 'text-yellow-600/60 dark:text-yellow-500/60' : 'text-slate-400 dark:text-white/50'}`}>
                    {new Date(session.id).toLocaleDateString('vi-VN')}
                </span>
            </div>
            <button 
                onClick={(e) => onDelete(e, session.id)}
                className={`p-1.5 hover:bg-red-500/20 hover:text-red-500 rounded-md transition-all ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} text-slate-400`}
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
};
export default SessionItem;
