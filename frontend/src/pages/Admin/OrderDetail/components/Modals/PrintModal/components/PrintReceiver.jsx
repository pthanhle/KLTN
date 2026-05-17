import React from 'react';

export const PrintReceiver = ({ delivery, t }) => {
    return (
        <section className="border-2 border-black p-4 flex flex-col gap-2 rounded-lg">
            <div className="flex justify-between items-baseline">
                <div>
                    <span className="font-bold">{t('print_receiver')}</span> <span className="font-medium text-lg">{delivery?.receiver_name}</span>
                </div>
                <div>
                    <span className="font-bold">{t('print_phone')}</span> <span className="font-bold text-lg">{delivery?.phone}</span>
                </div>
            </div>
            <div className="mt-2">
                <span className="font-bold block mb-1">{t('print_address')}</span>
                <p className="font-bold text-xl leading-tight">{delivery?.address}</p>
            </div>
        </section>
    );
};
