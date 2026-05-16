import React from 'react';

export const PrintFooter = ({ t }) => {
    return (
        <footer className="flex justify-between items-end pt-4 pb-2 mt-4 text-sm font-bold">
            <div className="text-center w-1/3">
                <p>{t('print_deliverer')}</p>
                <p className="text-xs font-normal mt-1">{t('print_sign_note')}</p>
                <div className="h-16"></div>
            </div>
            <div className="text-center w-1/3">
                <p>{t('print_receiver_sign')}</p>
                <p className="text-xs font-normal mt-1">{t('print_sign_note')}</p>
                <div className="h-16"></div>
            </div>
        </footer>
    );
};
