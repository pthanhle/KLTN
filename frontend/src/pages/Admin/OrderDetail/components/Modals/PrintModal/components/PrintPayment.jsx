import React from 'react';
import { formatCurrency } from '../../../../../Orders/utils/formatters';

export const PrintPayment = ({ payment, financials, t }) => {
    const isPaid = payment?.status === 'PAID';

    if (isPaid) {
        return (
            <section className="mt-auto border-2 border-black p-4 text-center rounded-xl bg-gray-50">
                <h3 className="font-bold text-lg uppercase tracking-wider text-gray-600">{t('print_cod_total')}</h3>
                <p className="font-display font-black text-3xl mt-2 text-black">{formatCurrency(0)}</p>
                <p className="text-sm font-bold mt-1">{t('print_paid')}</p>
            </section>
        );
    }

    return (
        <section className="mt-auto border-4 border-black p-4 text-center rounded-xl bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)' }}></div>
            <h3 className="font-bold text-xl uppercase tracking-wider relative z-10">{t('print_cod_total')}</h3>
            <p className="font-display font-black text-4xl mt-2 relative z-10">{formatCurrency(financials?.grand_total)}</p>
            <p className="text-sm font-bold mt-2 relative z-10">{t('print_check_goods')}</p>
        </section>
    );
};