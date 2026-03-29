import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cpu, Disc, Zap, Car } from 'lucide-react';
import ChecklistItem from './ChecklistItem';

const iconMap = {
    Cpu: Cpu,
    Disc: Disc,
    Zap: Zap,
    Car: Car
};

const ChecklistGroup = ({ group }) => {
    const { t } = useTranslation('tracking');
    const IconComponent = iconMap[group.icon] || Cpu;

    return (
        <section className="bg-white dark:bg-[#151b2d] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#23293c] flex items-center justify-center text-yellow-600 dark:text-[#ffd165]">
                        <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">{group.title}</h3>
                </div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-[#d3c5ac] uppercase tracking-widest bg-slate-100 dark:bg-[#191f31] px-3 py-1 rounded-full self-start sm:self-auto">
                    {group.totalCount} {t('label_items', 'Hạng mục')}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-2 md:gap-y-6">
                {group.items.map((item, idx) => (
                    <ChecklistItem key={idx} item={item} />
                ))}
            </div>

            {group.technician_note && (
                <div className="mt-8 p-6 bg-slate-50 dark:bg-[#191f31] rounded-xl border-l-4 border-red-500 dark:border-[#ffb4ab]">
                    <p className="text-[10px] font-bold text-red-600 dark:text-[#ffb4ab] uppercase tracking-widest mb-2">
                        {t('label_technician_note', 'Ghi chú kỹ thuật viên')}
                    </p>
                    <p className="text-sm text-slate-700 dark:text-white leading-relaxed">
                        {group.technician_note}
                    </p>
                </div>
            )}
        </section>
    );
};

export default ChecklistGroup;
