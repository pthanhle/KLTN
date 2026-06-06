import { Settings } from 'lucide-react';
import { Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import IconButton from '../common/IconButton';

const ROLE_LABELS = {
    Customer: 'Khách hàng',
    admin: 'Quản trị viên',
    service: 'Cố vấn dịch vụ',
    sale: 'Tư vấn bán hàng',
    inventory: 'Kho vận',
};

const Avatar = ({ src, name }) => {
    if (src) {
        return (
            <img
                src={src}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
            />
        );
    }
    const initials = name
        ? name.trim().split(' ').slice(-1)[0]?.[0]?.toUpperCase() || '?'
        : '?';
    return (
        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
            {initials}
        </span>
    );
};

const UserProfile = ({ t }) => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    return (
        <div className="p-4 bg-slate-50 dark:bg-[#1c1c1e] border-t border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 ring-1 ring-slate-300 dark:ring-white/10 overflow-hidden flex items-center justify-center shrink-0">
                    {isAuthenticated && user ? (
                        <Avatar src={user.avatar} name={user.full_name} />
                    ) : (
                        <span className="text-xs font-bold text-slate-400">?</span>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    {isAuthenticated && user ? (
                        <>
                            <p className="text-[11px] font-bold text-slate-900 dark:text-white truncate">
                                {user.full_name || user.username || user.email}
                            </p>
                            <p className="text-[9px] text-slate-500 dark:text-white/50 uppercase tracking-tighter truncate">
                                {ROLE_LABELS[user.role] || user.role || 'Khách hàng'}
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="text-[11px] font-bold text-slate-900 dark:text-white">Khách</p>
                            <p className="text-[9px] text-slate-500 dark:text-white/50 uppercase tracking-tighter">
                                Chưa đăng nhập
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
