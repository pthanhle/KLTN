import React, { useRef, useState } from 'react';
import { Modal, message, Button } from 'antd';
import SignatureCanvas from 'react-signature-canvas';
import { useTranslation } from 'react-i18next';
import { RefreshCcw, CheckCircle, XCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/trackingDataUtils';

const SignatureModal = ({ isOpen, onClose, onConfirm, calculations }) => {
    const { t } = useTranslation('tracking');
    const sigPad = useRef({});
    const [isEmpty, setIsEmpty] = useState(true);

    const handleClear = () => {
        sigPad.current.clear();
        setIsEmpty(true);
    };

    const handleSignatureEnd = () => {
        setIsEmpty(sigPad.current.isEmpty());
    };

    const handleApproveClick = () => {
        if (sigPad.current.isEmpty()) {
            message.warning(t('warn_signature_desc', 'Bạn cần vẽ chữ ký ảo trên bảng trước khi tiến hành Phê duyệt và Mở hệ thống sửa chữa.'));
            return;
        }

        const signatureDataUrl = sigPad.current.getCanvas().toDataURL('image/png');
        onConfirm(signatureDataUrl);
    };

    return (
        <Modal
            title={
                <div className="flex flex-col gap-1 items-center pb-4 border-b border-slate-200 dark:border-white/10">
                    <CheckCircle className="w-8 h-8 text-emerald-500 dark:text-[#4edea3] mb-2" />
                    <span className="text-lg font-bold text-slate-800 dark:text-white uppercase">
                        {t('modal_title_sign', 'Xác Chốt Chữ Ký Điện Tử')}
                    </span>
                    <span className="text-sm font-medium text-slate-500 dark:text-[#a0a0a0]">
                        {t('modal_subtitle', 'Cam kết sửa chữa & Thanh toán')}
                    </span>
                </div>
            }
            open={isOpen}
            onCancel={onClose}
            centered
            width={600}
            footer={null}
            className="dark-elite-modal"
            closeIcon={<XCircle className="w-6 h-6 text-slate-400 hover:text-red-500" />}
        >
            <div className="space-y-6 pt-4">
                <div className="bg-slate-50 dark:bg-[#1e1e20] p-6 rounded-xl border border-slate-100 dark:border-white/5 text-center">
                    <p className="text-sm font-medium text-slate-600 dark:text-[#a0a0a0] mb-2">
                        {t('text_confirm_price', 'Bạn đang phê duyệt lệnh sửa chữa với Tổng thanh toán:')}
                    </p>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-[#d4af37]">
                        {calculations ? formatCurrency(calculations.grandTotal) : '0 VNĐ'}
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <label className="text-sm font-semibold text-slate-600 dark:text-[#a0a0a0]">
                            {t('label_draw_here', 'Vùng Ký Tên Dành Cho Khách Hàng')}
                        </label>
                        <Button type="text" size="small" onClick={handleClear} icon={<RefreshCcw size={14} className="mr-1"/>} className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-[#a0a0a0] dark:hover:text-white">
                            {t('btn_redraw', 'Ký lại')}
                        </Button>
                    </div>

                    {/* Magic Signature Canvas Integration */}
                    <div className="border border-dashed border-slate-300 dark:border-[#555] bg-white dark:bg-[#141416] rounded-xl overflow-hidden shadow-inner cursor-crosshair">
                        <SignatureCanvas 
                            ref={sigPad}
                            penColor="black"
                            canvasProps={{ className: "w-full h-48 touch-none dark:invert" }}
                            onEnd={handleSignatureEnd}
                        />
                    </div>
                </div>

                <Button 
                    type="primary" 
                    onClick={handleApproveClick}
                    disabled={isEmpty}
                    className="w-full !h-11 rounded-md bg-yellow-500 hover:bg-yellow-400 dark:bg-[linear-gradient(135deg,#eab308,#d4af37)] !text-slate-900 border border-transparent shadow-[0_4px_12px_rgba(234,179,8,0.3)] transition-all font-bold text-sm md:text-base transform active:scale-95 flex items-center justify-center gap-2 mt-4 hover:scale-[1.01] dark:shadow-[0_4px_15px_rgba(212,175,55,0.4)]"
                >
                    {t('btn_sign_and_approve', 'Ký Tên Điện Tử & Khóa Lệnh Sửa')}
                </Button>
                <p className="text-xs text-center text-slate-400 dark:text-[#a0a0a0] italic px-4 md:px-8 mt-2">
                    {t('text_legal', 'Bằng việc ký tên, bạn đồng ý với Các điều khoản Dịch Vụ và Bảng báo giá phụ tùng.')}
                </p>
            </div>
        </Modal>
    );
};

export default SignatureModal;
