import React from 'react';
import { Table } from 'antd';
import { useTranslation } from 'react-i18next';

export const SpecsTable = ({ specs }) => {
    const { t } = useTranslation('parts');

    const columns = [
        {
            title: t('lbl_attribute', 'Thuộc tính'),
            dataIndex: 'label',
            key: 'label',
            rowScope: 'row',
            className: 'font-bold text-slate-900 dark:text-white w-1/3',
        },
        {
            title: t('lbl_detail_value', 'Giá trị chi tiết'),
            dataIndex: 'value',
            key: 'value',
            className: 'text-slate-600 dark:text-slate-400',
        },
    ];

    const dataSource = React.useMemo(() => {
        return specs.map((s, idx) => ({ ...s, key: idx }));
    }, [specs]);

    return (
        <div className="mb-20 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="overflow-x-auto custom-scrollbar">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    bordered={false}
                    className="custom-antd-table-specs"
                    rowClassName="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                />
            </div>
        </div>
    );
};

export default SpecsTable;
