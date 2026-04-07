import React, { useMemo } from 'react';
import { Table } from 'antd';
import { Car, ShieldCheck } from 'lucide-react';
import { getFitmentColumns } from '../constants/specsColumns';

export const FitmentDataCard = ({ fitmentData, compatibleBrands, t }) => {
    const fitmentColumns = useMemo(() => getFitmentColumns(t), [t]);

    if (!compatibleBrands?.length && !fitmentData?.length) return null;

    return (
        <div className="bg-white dark:bg-[#151b2d] rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-lg shadow-slate-100/50 dark:shadow-none">
            <div className="px-6 py-5 border-b border-slate-200 dark:border-white/10 flex items-center gap-3 bg-slate-50/50 dark:bg-white/5">
                <div className="p-2 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-500">
                    <Car size={20} strokeWidth={2.5} />
                </div>
                <h3 className="text-[16px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    {t('title_fitment', 'Độ Tương Thích (Fitment)')}
                </h3>
            </div>
            
            <div className="p-6 md:p-8 space-y-10">
                {compatibleBrands?.length > 0 && (
                    <div className="flex flex-col gap-5">
                        <h4 className="text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck size={16} /> {t('lbl_supported_brands', 'Nhãn Hiệu Hỗ Trợ')}
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {compatibleBrands.map((brand, idx) => (
                                <div key={idx} className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-white/10 shadow-sm">
                                    {brand}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {fitmentData?.length > 0 && (
                    <div className="flex flex-col gap-5">
                        <h4 className="text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Car size={16} /> {t('lbl_applicable_models', 'Phiên Bản & Đời Xe Áp Dụng')}
                        </h4>
                        <div className="border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
                            <Table
                                columns={fitmentColumns}
                                dataSource={fitmentData.map((f, idx) => ({ ...f, key: idx }))}
                                pagination={false}
                                bordered={false}
                                className="custom-antd-table-clean"
                                rowClassName="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FitmentDataCard;
