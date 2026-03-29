import { Settings } from 'lucide-react';
import { Image, Skeleton } from 'antd';
import { mockUserProfile } from '../../data/chatbot.mock';
import IconButton from '../common/IconButton';

const UserProfile = ({ isLoading = false, t }) => {
    return (
        <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 ring-1 ring-slate-300 dark:ring-white/10 overflow-hidden flex items-center justify-center shrink-0">
                    {isLoading ? (
                        <Skeleton.Avatar active size={32} />
                    ) : (
                        <Image alt="User profile" className="w-full h-full object-cover" src={mockUserProfile.avatar} preview={false} />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    {isLoading ? (
                        <Skeleton active paragraph={{ rows: 1, width: ['60%'] }} title={false} className="mt-1" />
                    ) : (
                        <>
                            <p className="text-[11px] font-bold text-slate-900 dark:text-white truncate">{mockUserProfile.name}</p>
                            <p className="text-[9px] text-slate-500 dark:text-white/50 uppercase tracking-tighter">
                                {t ? t(mockUserProfile.planKey) : mockUserProfile.planKey} 
                            </p>
                        </>
                    )}
                </div>
                <IconButton icon={Settings} size={18} />
            </div>
        </div>
    );
};
export default UserProfile;
