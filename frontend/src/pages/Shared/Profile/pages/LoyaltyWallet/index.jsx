import React, { useState, useEffect } from 'react';
import { Tabs, Spin, message, Card, Badge, Button, Timeline, Tag } from 'antd';
import { Gift, Award, Clock, History, Ticket, Plus } from 'lucide-react';
import loyaltyApi from '../../../../../services/api/loyalty.api';
import { profileApi } from '../../../../../services/api/profile.api';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

const { TabPane } = Tabs;

const LoyaltyWallet = () => {
    const { data: userProfile } = useQuery({
        queryKey: ['userProfile'],
        queryFn: () => profileApi.getProfile(),
        staleTime: 60000
    });
    const user = userProfile;

    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState([]);
    const [availableVouchers, setAvailableVouchers] = useState([]);
    const [myVouchers, setMyVouchers] = useState([]);
    const [activeTab, setActiveTab] = useState('store');
    const [redeeming, setRedeeming] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [historyRes, storeRes, myVouchersRes] = await Promise.all([
                loyaltyApi.getHistory(),
                loyaltyApi.getAvailableVouchers(),
                loyaltyApi.getMyVouchers()
            ]);
            setHistory(historyRes.data || []);
            setAvailableVouchers(storeRes.data || []);
            setMyVouchers(myVouchersRes.data || []);
        } catch (error) {
            console.error('Error fetching loyalty data:', error);
            message.error('Không thể tải dữ liệu Tích điểm');
        } finally {
            setLoading(false);
        }
    };

    const handleRedeem = async (voucherId, pointsRequired) => {
        if ((user?.loyalty?.points || 0) < pointsRequired) {
            return message.warning('Bạn không đủ điểm để đổi Voucher này!');
        }

        setRedeeming(true);
        try {
            await loyaltyApi.redeemVoucher(voucherId);
            message.success('Đổi Voucher thành công!');
            fetchData();
            setActiveTab('my_vouchers');
        } catch (error) {
            message.error(error.response?.data?.message || 'Có lỗi xảy ra khi đổi Voucher');
        } finally {
            setRedeeming(false);
        }
    };

    const getTierColor = (tier) => {
        const tiers = {
            'BRONZE': 'from-orange-400 to-amber-600 shadow-orange-500/30',
            'SILVER': 'from-slate-300 to-slate-500 shadow-slate-400/30 text-slate-800',
            'GOLD': 'from-yellow-300 to-yellow-600 shadow-yellow-500/30',
            'PLATINUM': 'from-cyan-300 to-blue-600 shadow-cyan-500/30',
            'DIAMOND': 'from-fuchsia-400 to-purple-600 shadow-purple-500/30',
            'TITANIUM': 'from-gray-700 to-black shadow-gray-900/40'
        };
        return tiers[tier] || tiers['BRONZE'];
    };

    return (
        <div className="bg-white dark:bg-[#141416] rounded-[32px] p-6 lg:p-10 border border-slate-100 dark:border-white/5 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <Gift className="text-yellow-500" /> Tích điểm & Ưu đãi
            </h2>

            <div className={`relative overflow-hidden rounded-3xl p-8 mb-10 text-white bg-gradient-to-br ${getTierColor(user?.loyalty?.tier)} shadow-lg`}>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-black/10 rounded-full blur-xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-1">TT Auto Membership</p>
                        <h3 className="text-3xl font-black mb-1">{user?.full_name}</h3>
                        <div className="flex items-center gap-2">
                            <Award size={18} className="opacity-90" />
                            <span className="font-bold text-lg tracking-wider">{user?.loyalty?.tier || 'BRONZE'}</span>
                        </div>
                    </div>

                    <div className="text-left md:text-right bg-black/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                        <p className="text-sm font-medium opacity-80 mb-1">Điểm hiện tại</p>
                        <p className="text-4xl font-black tracking-tight">{user?.loyalty?.points?.toLocaleString() || 0} <span className="text-xl font-semibold opacity-80">pts</span></p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin size="large" />
                </div>
            ) : (
                <Tabs activeKey={activeTab} onChange={setActiveTab} className="loyalty-tabs">
                    <TabPane
                        tab={<span className="flex items-center gap-2 font-semibold px-2"><Ticket size={16} /> Cửa hàng Voucher</span>}
                        key="store"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {availableVouchers.map(voucher => (
                                <Card
                                    key={voucher._id}
                                    className="border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-md transition-shadow dark:bg-[#1c1c1f]"
                                    bodyStyle={{ padding: 0 }}
                                >
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="bg-slate-50 dark:bg-white/5 p-6 flex flex-col justify-center items-center border-b sm:border-b-0 sm:border-r border-dashed border-slate-300 dark:border-white/20 min-w-[140px]">
                                            <span className="text-3xl font-black text-yellow-600 dark:text-yellow-500">
                                                {voucher.discount_type === 'PERCENT' ? `${voucher.discount_value}%` :
                                                    voucher.discount_type === 'FIXED' ? `${(voucher.discount_value / 1000)}k` : 'FREE'}
                                            </span>
                                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">{voucher.discount_type}</span>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{voucher.title}</h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{voucher.description}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-500 font-bold bg-yellow-50 dark:bg-yellow-500/10 px-3 py-1.5 rounded-lg">
                                                    <Award size={16} />
                                                    <span>{voucher.points_required} pts</span>
                                                </div>
                                                <Button
                                                    type="primary"
                                                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold h-10 px-6 border-0"
                                                    onClick={() => handleRedeem(voucher._id, voucher.points_required)}
                                                    loading={redeeming}
                                                >
                                                    Đổi ngay
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            {availableVouchers.length === 0 && (
                                <div className="col-span-full text-center py-12 text-slate-500">
                                    Hiện tại chưa có Voucher nào để đổi.
                                </div>
                            )}
                        </div>
                    </TabPane>

                    <TabPane
                        tab={<span className="flex items-center gap-2 font-semibold px-2"><Gift size={16} /> Voucher của tôi <Badge count={myVouchers.filter(v => v.status === 'UNUSED').length} className="ml-1" /></span>}
                        key="my_vouchers"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {myVouchers.map(cv => (
                                <Card
                                    key={cv._id}
                                    className={`border rounded-2xl overflow-hidden transition-all dark:bg-[#1c1c1f] ${cv.status === 'UNUSED' ? 'border-yellow-500 shadow-sm' : 'border-slate-200 dark:border-white/10 opacity-70'}`}
                                    bodyStyle={{ padding: 0 }}
                                >
                                    <div className="p-6 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="font-bold text-lg text-slate-900 dark:text-white pr-4">{cv.voucher.title}</h4>
                                            <Tag color={cv.status === 'UNUSED' ? 'success' : cv.status === 'USED' ? 'default' : 'error'} className="m-0 font-bold border-0">
                                                {cv.status === 'UNUSED' ? 'CÒN HẠN' : cv.status === 'USED' ? 'ĐÃ DÙNG' : 'HẾT HẠN'}
                                            </Tag>
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1">{cv.voucher.description}</p>
                                        <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-dashed border-slate-300 dark:border-white/20 flex justify-between items-center">
                                            <span className="font-mono font-bold tracking-widest text-lg text-slate-700 dark:text-slate-300">{cv.code}</span>
                                        </div>
                                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                            <Clock size={14} />
                                            <span>HSD: {dayjs(cv.expires_at).format('DD/MM/YYYY HH:mm')}</span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            {myVouchers.length === 0 && (
                                <div className="col-span-full text-center py-12 text-slate-500">
                                    Bạn chưa có Voucher nào. Hãy dùng điểm để đổi nhé!
                                </div>
                            )}
                        </div>
                    </TabPane>

                    <TabPane
                        tab={<span className="flex items-center gap-2 font-semibold px-2"><History size={16} /> Lịch sử điểm</span>}
                        key="history"
                    >
                        <div className="mt-8 px-4 max-w-3xl mx-auto">
                            {history.length > 0 ? (
                                <Timeline
                                    items={history.map(item => ({
                                        color: item.points_change > 0 ? 'green' : 'red',
                                        dot: item.points_change > 0 ?
                                            <div className="bg-green-100 text-green-600 p-1.5 rounded-full"><Plus size={14} strokeWidth={3} /></div> :
                                            <div className="bg-red-100 text-red-600 p-1.5 rounded-full"><Ticket size={14} strokeWidth={3} /></div>,
                                        children: (
                                            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 mb-6 border border-slate-100 dark:border-white/5">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-semibold text-slate-900 dark:text-white text-base">
                                                        {item.description}
                                                    </span>
                                                    <span className={`font-black text-lg ${item.points_change > 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                                                        {item.points_change > 0 ? '+' : ''}{item.points_change} pts
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium mt-3">
                                                    <span className="flex items-center gap-1.5"><Clock size={14} /> {dayjs(item.createdAt).format('HH:mm - DD/MM/YYYY')}</span>
                                                    <span className="px-2 py-1 bg-slate-200 dark:bg-white/10 rounded-md uppercase tracking-wider text-[10px]">{item.transaction_type}</span>
                                                </div>
                                            </div>
                                        )
                                    }))}
                                />
                            ) : (
                                <div className="text-center py-12 text-slate-500">
                                    Chưa có lịch sử giao dịch điểm nào.
                                </div>
                            )}
                        </div>
                    </TabPane>
                </Tabs>
            )}

            {/* Custom Styles for Tabs */}
            <style jsx>{`
                .loyalty-tabs .ant-tabs-nav-wrap {
                    padding: 0 8px;
                }
                .loyalty-tabs .ant-tabs-tab {
                    padding: 12px 0;
                    margin: 0 32px 0 0;
                    color: #64748b;
                }
                .loyalty-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #0f172a;
                }
                .dark .loyalty-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #f8fafc;
                }
                .loyalty-tabs .ant-tabs-ink-bar {
                    background: #eab308;
                    height: 3px;
                    border-radius: 3px 3px 0 0;
                }
            `}</style>
        </div>
    );
};

export default LoyaltyWallet;
