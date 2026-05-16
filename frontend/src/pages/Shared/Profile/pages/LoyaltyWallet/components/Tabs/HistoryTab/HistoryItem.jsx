import React from 'react';
import { Clock, Plus, Ticket } from 'lucide-react';
import dayjs from 'dayjs';

const HistoryItem = ({ item }) => {
    const isPositive = item.points_change > 0;

    return (
        <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
                {isPositive ? (
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500 p-1.5 rounded-full">
                        <Plus size={14} strokeWidth={3} />
                    </div>
                ) : (
                    <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 p-1.5 rounded-full">
                        <Ticket size={14} strokeWidth={3} />
                    </div>
                )}
            </div>
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 mb-6 border border-slate-100 dark:border-white/5 flex-1 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-slate-900 dark:text-white text-base">
                        {item.description}
                    </span>
                    <span className={`font-black text-lg ${isPositive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                        {isPositive ? '+' : ''}{item.points_change} pts
                    </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium mt-3">
                    <span className="flex items-center gap-1.5">
                        <Clock size={14} /> 
                        {dayjs(item.createdAt).format('HH:mm - DD/MM/YYYY')}
                    </span>
                    <span className="px-2 py-1 bg-slate-200 dark:bg-white/10 rounded-md uppercase tracking-wider text-[10px]">
                        {item.transaction_type}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default HistoryItem;
