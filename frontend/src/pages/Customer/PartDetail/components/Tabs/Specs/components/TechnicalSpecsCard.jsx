import React, { useMemo } from 'react';
import { Table } from 'antd';
import { Settings } from 'lucide-react';
import { getSpecsColumns } from '../constants/specsColumns';

export const TechnicalSpecsCard = ({ specs, t }) => {
    const columns = useMemo(() => getSpecsColumns(t), [t]);
    
    if (!specs || specs.length === 0) return null;

    return (
        <div className="bg-white dark:bg-[#151b2d] rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-lg shadow-slate-100/50 dark:shadow-none">
            <div className="px-6 py-5 border-b border-slate-200 dark:border-white/10 flex items-center gap-3 bg-slate-50/50 dark:bg-white/5">
                <div className="p-2 bg-yellow-500/10 rounded-xl text-yellow-600 dark:text-yellow-500">
                    <Settings size={20} strokeWidth={2.5} />
                </div>
                <h3 className="text-[16px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    {t('title_specs', 'Thông Số Kỹ Thuật')}
                </h3>
            </div>
            <div className="overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={specs.map((s, idx) => ({ ...s, key: idx }))}
                    pagination={false}
                    bordered={false}
                    showHeader={false}
                    className="custom-antd-table-borderless"
                    rowClassName="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors"
                />
            </div>
        </div>
    );
};

export default TechnicalSpecsCard;
