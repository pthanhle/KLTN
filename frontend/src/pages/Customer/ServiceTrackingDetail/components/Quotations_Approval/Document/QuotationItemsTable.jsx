import React from 'react';
import { Table } from 'antd';
import { formatCurrency } from '../../../utils/trackingDataUtils';

const QuotationItemsTable = ({ parts, labors, t }) => {
    // Premium OLED Tone: Thead = #1e1e20, Tbody = #141416
    const tableStyles = "[&_.ant-table]:!bg-transparent [&_.ant-table-thead>tr>th]:!bg-slate-100 dark:[&_.ant-table-thead>tr>th]:!bg-[#1e1e20] [&_.ant-table-thead>tr>th]:!text-slate-600 dark:[&_.ant-table-thead>tr>th]:!text-[#a0a0a0] [&_.ant-table-thead>tr>th]:!font-semibold [&_.ant-table-cell]:!border-b [&_.ant-table-cell]:!border-slate-100 dark:[&_.ant-table-cell]:!border-white/5 hover:[&_.ant-table-tbody>tr>td]:!bg-slate-50 dark:hover:[&_.ant-table-tbody>tr>td]:!bg-[#1e1e20]/80 [&_.ant-table-tbody>tr>td]:!bg-white dark:[&_.ant-table-tbody>tr>td]:!bg-[#141416] [&_.ant-table-tbody>tr>td_span]:dark:!text-white";

    const partsColumns = [
        {
            title: t('quote_col_stt', 'STT'),
            key: 'stt',
            align: 'center',
            width: 60,
            render: (_, __, index) => <span className="font-medium text-slate-500 dark:text-[#a0a0a0]">{String(index + 1).padStart(2, '0')}</span>,
        },
        {
            title: t('quote_col_code', 'Mã Phụ Tùng'),
            dataIndex: 'id',
            key: 'id',
            width: 120,
            render: (text) => <span className="font-semibold text-slate-800 dark:text-white uppercase">{text}</span>,
        },
        {
            title: t('quote_col_name', 'Tên Sản Phẩm'),
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className="font-medium text-slate-800 dark:text-white">{text}</span>,
        },
        {
            title: t('quote_col_qty', 'SL'),
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            width: 80,
            render: (text) => <span className="font-medium text-slate-800 dark:text-white">{text}</span>,
        },
        {
            title: t('quote_col_price', 'Đơn Giá'),
            dataIndex: 'unit_price',
            key: 'unit_price',
            align: 'right',
            width: 120,
            render: (val) => <span className="font-medium text-slate-800 dark:text-white">{formatCurrency(val)}</span>,
        },
        {
            title: t('quote_col_total', 'Thành Tiền'),
            key: 'total',
            align: 'right',
            width: 140,
            render: (_, record) => (
                <span className="font-semibold text-slate-800 dark:text-white">
                    {formatCurrency(record.quantity * record.unit_price)}
                </span>
            ),
        },
    ];

    const laborColumns = [
        {
            title: t('quote_col_stt', 'STT'),
            key: 'stt',
            align: 'center',
            width: 60,
            render: (_, __, index) => <span className="font-medium text-slate-500 dark:text-[#a0a0a0]">{String(index + 1).padStart(2, '0')}</span>,
        },
        {
            title: t('quote_col_task', 'Nội dung công việc'),
            dataIndex: 'description',
            key: 'description',
            render: (text) => <span className="font-medium text-slate-800 dark:text-white">{text}</span>,
        },
        {
            title: t('quote_col_hours', 'Giờ Công'),
            dataIndex: 'hours',
            key: 'hours',
            align: 'center',
            width: 100,
            render: (text) => <span className="font-medium text-slate-800 dark:text-white">{text}</span>,
        },
        {
            title: t('quote_col_rate', 'Đơn Giá / Giờ'),
            dataIndex: 'rate',
            key: 'rate',
            align: 'right',
            width: 150,
            render: (val) => <span className="font-medium text-slate-800 dark:text-white">{formatCurrency(val)}</span>,
        },
        {
            title: t('quote_col_total', 'Thành Tiền'),
            key: 'total',
            align: 'right',
            width: 160,
            render: (_, record) => (
                <span className="font-semibold text-slate-800 dark:text-white">
                    {formatCurrency(record.hours * record.rate)}
                </span>
            ),
        },
    ];

    return (
        <>
            <section className="mb-10 w-full overflow-x-auto" data-purpose="spare-parts-list">
                <h3 className="text-sm font-bold flex items-center gap-2 mb-4 border-l-4 border-yellow-500 dark:border-[#d4af37] pl-3 text-slate-800 dark:text-[#d4af37] uppercase">
                    {t('quote_table_parts', 'I. PHỤ TÙNG & VẬT TƯ')}
                </h3>
                <div className="min-w-[600px] rounded-md border border-slate-200 dark:border-white/10 overflow-hidden">
                    <Table 
                        dataSource={parts}
                        columns={partsColumns}
                        rowKey="id"
                        pagination={false}
                        className={tableStyles}
                    />
                </div>
            </section>
            
            <section className="mb-10 w-full overflow-x-auto" data-purpose="labor-services-list">
                <h3 className="text-sm font-bold flex items-center gap-2 mb-4 border-l-4 border-yellow-500 dark:border-[#d4af37] pl-3 text-slate-800 dark:text-[#d4af37] uppercase">
                    {t('quote_table_labor', 'II. TIỀN CÔNG DỊCH VỤ')}
                </h3>
                <div className="min-w-[600px] rounded-md border border-slate-200 dark:border-white/10 overflow-hidden">
                    <Table 
                        dataSource={labors}
                        columns={laborColumns}
                        rowKey="id"
                        pagination={false}
                        className={tableStyles}
                    />
                </div>
            </section>
        </>
    );
};

export default QuotationItemsTable;
