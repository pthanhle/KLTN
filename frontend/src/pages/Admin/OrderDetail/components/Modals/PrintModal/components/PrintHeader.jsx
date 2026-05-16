import React from 'react';
import dayjs from 'dayjs';

export const PrintHeader = ({ t }) => {
    return (
        <header className="flex justify-between items-start border-b-2 border-black pb-4">
            <div>
                <h1 className="font-display font-black text-2xl tracking-tighter">{t('print_company_name')}</h1>
                <p className="text-sm">{t('print_company_desc')}</p>
            </div>
            <div className="text-right">
                <h2 className="font-display font-bold text-xl uppercase tracking-widest">{t('print_waybill_title')}</h2>
                <p className="text-sm">{t('print_date')} {dayjs().format('DD/MM/YYYY')}</p>
            </div>
        </header>
    );
};
