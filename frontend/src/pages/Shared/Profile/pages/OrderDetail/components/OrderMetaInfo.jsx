import { MapPin, Box, CreditCard, Copy, FileText, FileWarning } from 'lucide-react';
import { Button } from 'antd';

export const OrderMetaInfo = ({ orderDetail, handleCopy, isCancelled, t }) => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6" data-purpose="meta-info-grid">
            <div className="bg-white dark:bg-[#141416] rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{t('order_dtl_address', 'Địa chỉ Nhận hàng')}</h3>
                </div>
                <div className="space-y-1">
                    <p className="text-slate-900 dark:text-slate-200 font-semibold">{orderDetail.delivery.receiver_name}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{orderDetail.delivery.phone}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-line pb-2 border-b border-slate-100 dark:border-white/5">{orderDetail.delivery.address}</p>
                    {orderDetail.delivery.note && (
                        <div className="pt-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('order_dtl_note', 'Ghi chú')}</span>
                            <p className="text-sm text-yellow-600 dark:text-yellow-500 font-medium italic mt-1 bg-yellow-50 dark:bg-yellow-500/10 p-2 rounded-lg">{orderDetail.delivery.note}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white dark:bg-[#141416] rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                        <Box className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{t('order_dtl_shipping', 'Đơn vị Vận chuyển')}</h3>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400 text-sm">{t('order_lbl_provider', 'Đơn vị')}</span>
                        <span className="text-slate-900 dark:text-slate-200 font-semibold text-sm">{orderDetail.shipping.provider}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400 text-sm">{t('order_lbl_tracking', 'Mã vận đơn')}</span>
                        <Button 
                            type="text"
                            onClick={() => handleCopy(orderDetail.shipping.tracking_code)}
                            className="!p-0 !h-auto flex items-center gap-1.5 !text-yellow-500 !font-bold !text-sm hover:underline hover:!bg-transparent focus:!bg-transparent"
                        >
                            {orderDetail.shipping.tracking_code} <Copy className="w-3.5 h-3.5" />
                        </Button>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400 text-sm">{t('order_dtl_est', 'Dự kiến giao')}</span>
                        <span className="text-slate-900 dark:text-slate-200 font-semibold text-sm">{orderDetail.shipping.estimated_delivery}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#141416] rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                        <CreditCard className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{t('order_dtl_payment', 'TT Thanh toán')}</h3>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400 text-sm">{t('order_dtl_method', 'Phương thức')}</span>
                        <span className="text-slate-900 dark:text-slate-200 font-semibold text-sm text-right">{orderDetail.payment.method}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400 text-sm">{t('order_dtl_paystt', 'Trạng thái')}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                            isCancelled ? 'bg-red-100 text-red-700 dark:bg-red-900/30' :
                            orderDetail.payment.status === 'PAID' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30'
                        }`}>
                            {isCancelled ? t('order_stt_cancelled', 'Đã hủy') : orderDetail.payment.status === 'PAID' ? t('order_paid_msg', 'Đã thanh toán') : t('order_unpaid_msg', 'Chưa thanh toán')}
                        </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-white/5">
                        <span className="text-slate-500 dark:text-slate-400 text-sm">{t('order_dtl_trx', 'Mã giao dịch')}</span>
                        <span className="text-slate-900 dark:text-slate-200 font-semibold text-sm">{orderDetail.payment.transaction_id}</span>
                    </div>
                    
                    {/* Hóa đơn VAT & Cancel Reason */}
                    {isCancelled && orderDetail.cancel_reason && (
                        <div className="pt-2">
                            <span className="text-[10px] font-bold text-red-500 uppercase flex items-center gap-1"><FileWarning size={12}/> {t('order_lbl_cancel_reason', 'Lý do hủy')}</span>
                            <p className="text-sm text-red-600 dark:text-red-400 font-medium mt-1">{orderDetail.cancel_reason}</p>
                        </div>
                    )}
                    
                    {!isCancelled && orderDetail.vat_info?.is_requested && (
                        <div className="pt-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><FileText size={12}/> {t('order_lbl_vat_info', 'Thông tin xuất VAT')}</span>
                            <div className="text-xs text-slate-600 dark:text-slate-400 mt-2 space-y-1 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-white/5">
                                <p><span className="font-semibold text-slate-900 dark:text-white">{orderDetail.vat_info.company_name}</span></p>
                                <p>{t('order_lbl_tax_code', 'MST')}: <span className="font-mono">{orderDetail.vat_info.tax_code}</span></p>
                                <p className="truncate">{orderDetail.vat_info.company_address}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default OrderMetaInfo;
