import React from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const VehicleUnitHeader = ({ onAddNew }) => {
    const { t } = useTranslation('adminCars');

    return (
        <div className="flex justify-between items-center bg-white dark:bg-[#141416] p-6 rounded-2xl border border-slate-200 dark:border-white/5">
            <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{t('Kho Xe (Vehicle Units)')}</h2>
                <p className="text-sm text-slate-500">{t('Quản lý danh sách các số VIN vật lý đang có trong kho cho dòng xe này.')}</p>
            </div>
            <button 
                type="button" 
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-900 dark:bg-gradient-to-r dark:from-[#eab308] dark:to-[#ffd165] text-white dark:text-slate-900 text-[13px] font-black tracking-wide shadow-xl shadow-slate-900/10 dark:shadow-yellow-500/10 active:scale-95 transition-all cursor-pointer border-none"
                onClick={onAddNew}
            >
                <Plus size={16} />
                {t('Thêm Xe Vật Lý')}
            </button>
        </div>
    );
};

export default VehicleUnitHeader;
