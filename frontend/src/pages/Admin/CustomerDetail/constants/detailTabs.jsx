export const getDetailTabs = (t) => [
    {
        key: 'GARAGE',
        label: <span className="text-xs tracking-[0.15em] font-black uppercase">{t('adminCustomers:tabGarage', 'KHU XE (GARAGE)')}</span>
    },
    {
        key: 'HISTORY',
        label: <span className="text-xs tracking-[0.15em] font-black uppercase">{t('adminCustomers:tabHistory', 'LỊCH SỬ DỊCH VỤ')}</span>
    },
    {
        key: 'BOOKINGS',
        label: <span className="text-xs tracking-[0.15em] font-black uppercase">{t('adminCustomers:tabBookings', 'ĐẶT CHỖ (BOOKINGS)')}</span>
    },
    {
        key: 'LOYALTY',
        label: <span className="text-xs tracking-[0.15em] font-black uppercase">{t('adminCustomers:tabLoyalty', 'TÍCH ĐIỂM (LOYALTY)')}</span>
    },
    {
        key: 'CONTRACTS',
        label: <span className="text-xs tracking-[0.15em] font-black uppercase">{t('adminCustomers:tabContracts', 'HỢP ĐỒNG (CONTRACTS)')}</span>
    }
];
