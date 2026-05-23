import React from 'react';
import { Image } from 'antd';
import { User } from 'lucide-react';

export const StaffListItem = ({ staff, isSelected, isCurrentStaff, onSelect, t }) => {
    const { fullName, employeeId, avatarUrl, workloadCount } = staff;

    const getWorkloadConfig = () => {
        if (workloadCount === 0) {
            return {
                text: `${t('reassign_status_free', 'Rảnh rỗi')} (0 đơn)`,
                colorClass: 'text-emerald-500',
                dotClass: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
            };
        }
        if (workloadCount <= 3) {
            return {
                text: `${t('reassign_status_busy', 'Đang xử lý')} ${workloadCount} đơn`,
                colorClass: 'text-yellow-600 dark:text-yellow-500',
                dotClass: 'bg-yellow-500'
            };
        }
        return {
            text: `${t('reassign_status_overloaded', 'Quá tải')} (${workloadCount} đơn)`,
            colorClass: 'text-red-500',
            dotClass: 'bg-red-500'
        };
    };

    const config = getWorkloadConfig();

    if (isCurrentStaff) {
        return (
            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-white/5 opacity-60 cursor-not-allowed border border-transparent">
                <div className="relative flex items-center justify-center w-5 h-5">
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600"></div>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-slate-200 dark:border-white/10 grayscale">
                    <Image 
                        src={avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`} 
                        alt={fullName}
                        className="w-full h-full object-cover"
                        preview={false}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="font-semibold text-sm text-slate-900 dark:text-white truncate">{fullName}</h3>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500">{employeeId}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <User size={14} className="text-slate-500" />
                        <span className="text-xs text-slate-500 italic">{t('reassign_current_staff', 'Đang phụ trách')}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <label 
            className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all border group ${
                isSelected 
                    ? 'bg-slate-50 dark:bg-[#202022] border-yellow-500/50' 
                    : 'bg-white dark:bg-[#141416] border-transparent hover:bg-slate-50 dark:hover:bg-[#202022] hover:border-slate-200 dark:hover:border-white/10'
            }`}
            onClick={() => onSelect(staff._id)}
        >
            <div className="relative flex items-center justify-center w-5 h-5">
                <div className={`w-5 h-5 rounded-full border-2 transition-colors flex items-center justify-center ${
                    isSelected ? 'border-yellow-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-yellow-500/50'
                }`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>}
                </div>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-slate-200 dark:border-white/10 transition-all ${isSelected ? 'ring-2 ring-yellow-500/20' : ''}`}>
                <Image 
                    src={avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`} 
                    alt={fullName}
                    className="w-full h-full object-cover"
                    preview={false}
                />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white truncate">{fullName}</h3>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500">{employeeId}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`}></div>
                    <span className={`text-xs ${config.colorClass} font-medium`}>{config.text}</span>
                </div>
            </div>
        </label>
    );
};
