import { Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { Archive } from 'lucide-react';
import { CAR_FORM_IMAGES } from '../../../../../constants/carFormConstants';

import StockDisplay from './StockDisplay';
import ShowroomSelector from './ShowroomSelector';
import OutOfStockConfig from './OutOfStockConfig';

const InventoryCard = ({ isLoading }) => {
    const { t } = useTranslation('adminCarForm');

    return (
        <section className="animate-fade-in">
            <div className="bg-white dark:bg-[#141416] rounded-xl p-8 shadow-sm dark:shadow-[0_15px_30px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-500">
                        <Archive size={20} className="fill-emerald-600/20 dark:fill-emerald-500/20" />
                    </div>
                    <h2 className="text-xl font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">{t('inventoryTabTitle', 'QUẢN LÝ KHO')}</h2>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Skeleton.Input active block style={{ height: '76px', borderRadius: '12px' }} />
                        <Skeleton.Input active block style={{ height: '76px', borderRadius: '12px' }} />
                        <Skeleton.Input active block style={{ height: '76px', borderRadius: '12px' }} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <StockDisplay />
                        <OutOfStockConfig />
                        <div className="md:col-span-2 border-t border-slate-200 dark:border-white/10 pt-6">
                            <ShowroomSelector />
                        </div>
                    </div>
                )}
            </div>

        </section>
    );
};

export default InventoryCard;
