import { Check, Wrench, ClipboardCheck, AlertTriangle } from 'lucide-react';
import { Image } from 'antd';
import { formatTimeHHMM } from '../../../utils/trackingDataUtils';
import ApprovalRequestCard from './ApprovalRequestCard';

const RoadmapStep = ({ step }) => {
    const isDone = step.status === 'done';
    const isActive = step.status === 'active';
    const isPending = step.status === 'pending';
    const isWarning = step.status === 'warning';

    const getIconClasses = () => {
        if (isWarning) return "bg-red-500/20 text-red-500 ring-4 ring-red-500/30";
        if (isDone) return "bg-emerald-500 dark:bg-[#4edea3] text-white dark:text-[#0a0a0b] shadow-lg shadow-emerald-500/20";
        if (isActive) return "bg-yellow-500 dark:bg-[#d4af37] text-white dark:text-[#0a0a0b] shadow-lg shadow-yellow-500/30 animate-pulse";
        return "bg-slate-200 dark:bg-[#23293c] text-slate-400 dark:text-[#a0a0a0]";
    };

    const getIcon = () => {
        if (isWarning) return <AlertTriangle size={20} strokeWidth={2.5} />;
        if (isDone) return <Check size={20} strokeWidth={3} />;
        if (isActive) return <Wrench size={20} strokeWidth={2.5} />;
        return <ClipboardCheck size={20} strokeWidth={2} />;
    };

    return (
        <div className={`relative flex items-start gap-8 ${isPending ? 'opacity-50' : ''}`}>
            {/* Circle Node */}
            <div className={`z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getIconClasses()}`}>
                {getIcon()}
            </div>

            {/* Content Area */}
            <div className="flex-1 pb-4">
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isActive ? 'mb-4' : 'mb-2'}`}>
                    <div>
                        <h4 className={`text-lg font-bold ${isActive ? 'text-yellow-600 dark:text-[#d4af37]' : isWarning ? 'text-red-500' : 'text-slate-800 dark:text-white'}`}>
                            {step.title}
                        </h4>
                        {(step.started_at || step.completed_at) && (
                            <span className="text-xs font-semibold text-slate-500 dark:text-[#a0a0a0]">
                                {isDone ? `Hoàn thành: ${formatTimeHHMM(step.completed_at)}` : `Bắt đầu: ${formatTimeHHMM(step.started_at)}`}
                            </span>
                        )}
                    </div>

                    {/* Active Mechanic Card */}
                    {isActive && step.mechanic && (
                        <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#1e1e20] px-4 py-2 rounded-full border border-slate-100 dark:border-white/5">
                            <div className="w-8 h-8 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center">
                                <Image src={step.mechanic.avatar} alt="Mechanic" preview={false} rootClassName="w-full h-full" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#a0a0a0]">
                                    {step.mechanic.role}
                                </span>
                                <span className="text-xs font-bold text-slate-800 dark:text-white">
                                    {step.mechanic.name}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.description}
                </p>

                {/* Live Evidence Snapshot Grid */}
                {isActive && step.evidence_images && (
                    <div className="mt-6 space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">Hình ảnh tại trạm</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {step.evidence_images.map((img, idx) => (
                                <div key={img.id} className={`aspect-video rounded-lg overflow-hidden relative group border border-slate-200 dark:border-white/5 ${idx === 2 ? 'hidden sm:block' : ''}`}>
                                    <Image src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 aspect-video" preview={{ src: img.url }} rootClassName="w-full h-full" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Edge Case: Mid-Service Approval Card */}
                {isWarning && step.approval_request && (
                    <ApprovalRequestCard request={step.approval_request} />
                )}
            </div>
        </div>
    );
};

export default RoadmapStep;
