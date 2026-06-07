import { CalendarClock, XCircle } from 'lucide-react';
import StatusBadge from './StatusBadge';

const TicketActions = ({ status, id, handleReschedule, handleCancel, t }) => {
    // Cutout Styles that support Dark mode borders dynamically
    const cutoutStyles = `
        relative bg-slate-50/50 dark:bg-white/[0.02] 
        border-t md:border-t-0 md:border-l border-dashed border-slate-200 dark:border-white/10 
        p-6 md:p-8 flex flex-col items-center justify-center md:w-56 shrink-0 transition-colors duration-300

        before:content-[''] before:absolute before:-top-3 before:-left-3 md:before:top-1/2 md:before:-mt-3 md:before:-left-3 
        before:w-6 before:h-6 before:bg-[#fcfcfc] dark:before:bg-[#0a0a0b] before:rounded-full before:z-10 
        before:border-b before:border-r md:before:border-r md:before:border-t-0 before:border-slate-100 dark:before:border-white/5
        before:rotate-45 md:before:-rotate-45 before:transition-colors before:duration-300
    `;

    const renderButtons = () => {
        if (status === 'Pending' || status === 'Confirmed') {
            return (
                <div className="w-full flex flex-col gap-3">
                    <button 
                        onClick={() => handleReschedule(id)}
                        className="w-full py-3.5 bg-white dark:bg-[#1a1c23] border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 shadow-sm hover:border-yellow-500 dark:hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-500 transition-all duration-300 flex flex-col items-center gap-1.5 group"
                    >
                        <CalendarClock size={20} className="text-slate-400 dark:text-slate-500 group-hover:text-yellow-500 transition-colors" />
                        {t('reschedule_btn', 'Dời Lịch')}
                    </button>
                    
                    <button 
                        onClick={() => handleCancel(id)}
                        className="w-full py-3.5 bg-white dark:bg-[#1a1c23] border border-slate-100 dark:border-white/5 hover:border-red-200 dark:hover:border-red-900/50 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 dark:text-red-400 shadow-sm hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300 flex flex-col items-center gap-1.5 group"
                    >
                        <XCircle size={20} className="text-red-400/60 dark:text-red-500/50 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
                        {t('cancel_btn', 'Hủy Lịch')}
                    </button>
                </div>
            );
        }

        return null;
    };

    return (
        <div className={cutoutStyles}>
            <div className="mb-6 w-full flex justify-center">
                <StatusBadge status={status} t={t} />
            </div>

            {renderButtons()}

            <div className="mt-8 text-center">
                <span className="text-[8px] text-slate-300 dark:text-slate-600 font-bold uppercase tracking-[0.2em] block mb-1">Pass Issued by</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.15em] opacity-80">TT AUTO DIGITAL</span>
            </div>
        </div>
    );
};

export default TicketActions;
