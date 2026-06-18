export const getDetailTabs = (t) => [
    {
        key: 'GARAGE',
        label: <span className="text-xs tracking-[0.15em] font-black uppercase">{t('Khu xe')}</span>
    },
    {
        key: 'HISTORY',
        label: <span className="text-xs tracking-[0.15em] font-black uppercase">{t('Lịch sử dịch vụ')}</span>
    },
    {
        key: 'BOOKINGS',
        label: <span className="text-xs tracking-[0.15em] font-black uppercase">{t('Lịch hẹn')}</span>
    },
    {
        key: 'LOYALTY',
        label: <span className="text-xs tracking-[0.15em] font-black uppercase">{t('Tích điểm')}</span>
    },
    {
        key: 'CONTRACTS',
        label: <span className="text-xs tracking-[0.15em] font-black uppercase">{t('Hợp đồng')}</span>
    }
];
