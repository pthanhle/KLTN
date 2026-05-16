import React, { useState } from 'react';
import { Tabs, Badge } from 'antd';
import { Gift, Ticket, History } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
    useLoyaltyProfileQuery,
    useLoyaltyStoreQuery,
    useMyVouchersQuery,
    useLoyaltyHistoryQuery
} from '../../../../../services/queries/loyalty.queries';
import LoyaltyBanner from './components/Banner/LoyaltyBanner';
import StoreTab from './components/Tabs/StoreTab';
import MyVouchersTab from './components/Tabs/MyVouchersTab';
import HistoryTab from './components/Tabs/HistoryTab';
import { VoucherSkeleton, HistorySkeleton } from './components/Skeletons';
import { VOUCHER_STATUS } from './constants/loyalty.constants';

const { TabPane } = Tabs;

const LoyaltyWallet = () => {
    const { t } = useTranslation('loyalty');
    const [activeTab, setActiveTab] = useState('store');

    const { data: userProfile, isLoading: isProfileLoading } = useLoyaltyProfileQuery();
    const { data: availableVouchers = [], isLoading: isStoreLoading } = useLoyaltyStoreQuery();
    const { data: myVouchers = [], isLoading: isMyVouchersLoading } = useMyVouchersQuery();
    const { data: history = [], isLoading: isHistoryLoading } = useLoyaltyHistoryQuery();

    const user = userProfile;
    const isLoading = isProfileLoading || isStoreLoading || isMyVouchersLoading || isHistoryLoading;
    const unusedVouchersCount = myVouchers.filter(v => v.status === VOUCHER_STATUS.UNUSED).length;

    return (
        <div className="bg-white dark:bg-[#141416] rounded-[32px] p-6 lg:p-10 border border-slate-100 dark:border-white/5 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <Gift className="text-yellow-500" /> {t('loyalty_title')}
            </h2>

            <LoyaltyBanner user={user} />

            <div className="loyalty-container [&_.ant-tabs-nav-wrap]:px-2 [&_.ant-tabs-tab]:py-3 [&_.ant-tabs-tab]:mr-8 [&_.ant-tabs-tab]:text-slate-500 [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:!text-slate-900 dark:[&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:!text-white [&_.ant-tabs-ink-bar]:bg-yellow-500 [&_.ant-tabs-ink-bar]:h-[3px] [&_.ant-tabs-ink-bar]:rounded-t-sm">
                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                    <TabPane
                        tab={<span className="flex items-center gap-2 font-semibold px-2"><Ticket size={16} /> {t('loyalty_tab_store')}</span>}
                        key="store"
                    >
                        {isLoading ? <VoucherSkeleton /> : <StoreTab vouchers={availableVouchers} userPoints={user?.loyalty?.points || 0} />}
                    </TabPane>

                    <TabPane
                        tab={
                            <span className="flex items-center gap-2 font-semibold px-2">
                                <Gift size={16} />
                                {t('loyalty_tab_my_vouchers')}
                                {unusedVouchersCount > 0 && <Badge count={unusedVouchersCount} className="ml-1" />}
                            </span>
                        }
                        key="my_vouchers"
                    >
                        {isLoading ? <VoucherSkeleton /> : <MyVouchersTab myVouchers={myVouchers} />}
                    </TabPane>

                    <TabPane
                        tab={<span className="flex items-center gap-2 font-semibold px-2"><History size={16} /> {t('loyalty_tab_history')}</span>}
                        key="history"
                    >
                        {isLoading ? <HistorySkeleton /> : <HistoryTab history={history} />}
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default LoyaltyWallet;