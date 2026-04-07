import React from 'react';

export const getSpecsColumns = (t) => [
    {
        title: t('lbl_attribute', 'Thuộc tính'),
        dataIndex: 'label',
        key: 'label',
        rowScope: 'row',
        className: 'font-bold text-slate-900 dark:text-white w-2/5 md:w-1/3 bg-slate-50/50 dark:bg-[#111624] px-6',
    },
    {
        title: t('lbl_detail_value', 'Giá trị chi tiết'),
        dataIndex: 'value',
        key: 'value',
        className: 'text-slate-600 dark:text-slate-300 font-medium px-6',
    },
];

export const getFitmentColumns = (t) => [
    {
        title: t('lbl_car_brand', 'Hãng Xe'),
        dataIndex: 'brand',
        key: 'brand',
        className: 'font-bold text-slate-900 dark:text-white',
        render: (text) => text || <span className="text-slate-400 italic">Universal</span>
    },
    {
        title: t('lbl_car_model', 'Mẫu Xe (Model)'),
        dataIndex: 'model',
        key: 'model',
        className: 'text-slate-700 dark:text-slate-300 font-medium',
    },
    {
        title: t('lbl_car_year', 'Đời Xe (Year)'),
        dataIndex: 'yearRange',
        key: 'yearRange',
        className: 'text-slate-600 dark:text-slate-400',
    },
];
