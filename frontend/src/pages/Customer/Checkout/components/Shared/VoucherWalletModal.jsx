import { Modal, Tag } from 'antd';
import { Ticket, SearchX } from 'lucide-react';
import { useMyVouchersQuery } from '@/services/queries/loyalty.queries';
import { formatVND } from '@/pages/Customer/Cars/utils/formatters';

const VoucherWalletModal = ({ isOpen, onClose, onSelect, currentSubtotal }) => {
    const { data: vouchers, isLoading } = useMyVouchersQuery();

    const validVouchers = vouchers?.filter(v => v.status === 'UNUSED' && new Date(v.expires_at) > new Date()) || [];

    const handleSelect = (voucher) => {
        const info = voucher.promotion || voucher.voucher;
        if (info.min_order_value > currentSubtotal) {
            return;
        }
        onSelect(voucher.code);
        onClose();
    };

    return (
        <Modal
            title={<div className="font-bold text-lg flex items-center gap-2"><Ticket className="text-yellow-500" /> Chọn voucher từ Ví</div>}
            open={isOpen}
            onCancel={onClose}
            footer={null}
            destroyOnClose
            centered
        >
            <div className="max-h-[60vh] overflow-y-auto space-y-3 mt-4 custom-scrollbar pr-2">
                {isLoading ? (
                    <div className="text-center py-8 text-slate-500">Đang tải voucher...</div>
                ) : validVouchers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 opacity-60">
                        <SearchX size={48} className="text-slate-400 mb-3" />
                        <p className="font-semibold text-slate-500">Bạn chưa có voucher nào khả dụng</p>
                    </div>
                ) : (
                    validVouchers.map(v => {
                        const info = v.promotion || v.voucher;
                        const isEligible = currentSubtotal >= info.min_order_value;

                        return (
                            <div
                                key={v._id}
                                onClick={() => isEligible && handleSelect(v)}
                                className={`p-4 rounded-xl border-2 transition-all ${isEligible ? 'border-yellow-200 hover:border-yellow-500 cursor-pointer bg-white dark:bg-slate-800' : 'border-slate-100 opacity-50 bg-slate-50 cursor-not-allowed'}`}
                            >
                                <div className="flex justify-between items-start gap-2">
                                    <div>
                                        <Tag color="gold" className="font-bold mb-1">{v.code}</Tag>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{info.title}</h4>
                                        <p className="text-xs text-slate-500 mt-1">{info.description}</p>

                                        <div className="mt-2 text-[11px] font-semibold text-slate-400">
                                            Đơn tối thiểu: {formatVND(info.min_order_value)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </Modal>
    );
};

export default VoucherWalletModal;
