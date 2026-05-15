import React from 'react';
import { Modal, Form, InputNumber, Input, Radio, Space, Button } from 'antd';
import { Trophy, Gift, ArrowUpCircle, Send } from 'lucide-react';
import { LLOYALTY_TIERS } from '../constants/loyalty';

export const CustomerActionModals = ({
    customer,
    isTierModalOpen,
    setIsTierModalOpen,
    isPointsModalOpen,
    setIsPointsModalOpen,
    tiersList,
    onUpgradeTier,
    onAddPoints,
    isLoading,
    t
}) => {
    const [pointsForm] = Form.useForm();
    const currentTierKey = customer?.loyalty?.tier || 'BRONZE';
    const currentTierConfig = LLOYALTY_TIERS[currentTierKey];

    return (
        <>
            <Modal
                title={
                    <div className="flex items-center gap-2 text-slate-800 dark:text-white uppercase font-black tracking-widest text-sm">
                        <Trophy size={18} className="text-yellow-500" />
                        {t('adminCustomers:modalUpgradeTitle', 'Nâng hạng thành viên')}
                    </div>
                }
                open={isTierModalOpen}
                onCancel={() => setIsTierModalOpen(false)}
                footer={null}
                centered
                destroyOnClose
                className="custom-admin-modal"
                width={480}
            >
                <div className="py-4">
                    <p className="text-slate-500 dark:text-slate-400 text-xs mb-6 font-medium">
                        {t('adminCustomers:modalUpgradeSubtitle', 'Chọn hạng thành viên mới cho khách hàng. Chỉ có thể nâng lên hạng cao hơn.')}
                    </p>
                    <Space direction="vertical" className="w-full" size={10}>
                        {tiersList?.map(tier => {
                            const isCurrentTier = tier.id === currentTierKey;
                            const isLowerTier = LLOYALTY_TIERS[tier.id].minPoints < currentTierConfig.minPoints;
                            const isDisabled = isCurrentTier || isLowerTier || isLoading;

                            const tierStyles = {
                                'BRONZE': { bg: 'from-orange-400 to-amber-600', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-800/30 dark:text-amber-400', border: 'border-amber-400' },
                                'SILVER': { bg: 'from-slate-300 to-slate-500', badge: 'bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300', border: 'border-slate-400' },
                                'GOLD': { bg: 'from-yellow-300 to-yellow-600', badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800/30 dark:text-yellow-400', border: 'border-yellow-400' },
                                'PLATINUM': { bg: 'from-cyan-300 to-blue-600', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-400', border: 'border-cyan-400' },
                                'DIAMOND': { bg: 'from-fuchsia-400 to-purple-600', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-800/30 dark:text-purple-400', border: 'border-purple-400' },
                                'TITANIUM': { bg: 'from-gray-600 to-gray-900', badge: 'bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300', border: 'border-gray-500' },
                            };
                            const style = tierStyles[tier.id] || tierStyles['BRONZE'];

                            return (
                                <button
                                    key={tier.id}
                                    disabled={isDisabled}
                                    onClick={() => !isDisabled && onUpgradeTier(tier.id)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left
                                        ${isCurrentTier
                                            ? `${style.border} bg-slate-50 dark:bg-white/5 opacity-70 cursor-default`
                                            : isLowerTier
                                                ? 'border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/2 opacity-30 grayscale cursor-not-allowed'
                                                : 'border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 hover:shadow-md cursor-pointer bg-white dark:bg-white/3'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${style.bg} shadow-lg flex-shrink-0`}>
                                        <Trophy size={20} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-black text-sm uppercase tracking-widest text-slate-800 dark:text-white">{tier.name}</div>
                                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Hệ số tích điểm: x{tier.multiplier}</div>
                                    </div>
                                    {isCurrentTier && (
                                        <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tight flex-shrink-0 ${style.badge}`}>
                                            Hiện tại
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </Space>
                </div>
            </Modal>

            <Modal
                title={
                    <div className="flex items-center gap-2 text-slate-800 dark:text-white uppercase font-black tracking-widest text-sm">
                        <Gift size={18} className="text-yellow-500" />
                        {t('adminCustomers:modalPointsTitle', 'Tặng điểm Loyalty')}
                    </div>
                }
                open={isPointsModalOpen}
                onCancel={() => setIsPointsModalOpen(false)}
                footer={null}
                centered
                destroyOnClose
                className="custom-admin-modal"
            >
                <Form
                    form={pointsForm}
                    layout="vertical"
                    onFinish={onAddPoints}
                    className="py-4"
                >
                    <Form.Item
                        name="points"
                        label={<span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t('adminCustomers:lblPointsAmount', 'Số điểm tặng')}</span>}
                        rules={[{ required: true, message: 'Vui lòng nhập số điểm' }]}
                    >
                        <InputNumber
                            min={1}
                            placeholder="Ví dụ: 500"
                            className="w-full h-12 flex items-center text-lg font-bold rounded-xl bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10"
                        />
                    </Form.Item>

                    <Form.Item
                        name="reason"
                        label={<span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t('adminCustomers:lblPointsReason', 'Lý do tặng')}</span>}
                        rules={[{ required: true, message: 'Vui lòng nhập lý do' }]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Nhập lý do tặng điểm (ví dụ: Quà tặng sinh nhật, Đền bù dịch vụ chậm...)"
                            className="rounded-xl bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 p-4"
                        />
                    </Form.Item>

                    <div className="flex gap-3 mt-8">
                        <Button
                            onClick={() => setIsPointsModalOpen(false)}
                            className="flex-1 h-12 rounded-xl border-none bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 font-black uppercase tracking-widest text-[10px]"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            className="flex-1 h-12 rounded-xl bg-yellow-500 hover:bg-yellow-600 border-none text-slate-900 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-yellow-500/20"
                            icon={<Send size={14} />}
                        >
                            Xác nhận tặng
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
};
