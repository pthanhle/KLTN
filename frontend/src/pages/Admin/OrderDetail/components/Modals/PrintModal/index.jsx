import React from 'react';
import { Modal } from 'antd';
import { Printer, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PrintHeader } from './components/PrintHeader';
import { PrintBarcode } from './components/PrintBarcode';
import { PrintReceiver } from './components/PrintReceiver';
import { PrintItems } from './components/PrintItems';
import { NotesSection } from './components/NotesSection';
import { PrintPayment } from './components/PrintPayment';
import { PrintFooter } from './components/PrintFooter';
import { usePrintModalLogic } from '../../../hooks/usePrintModalLogic';

export const PrintModal = ({ isOpen, onCancel, order }) => {
    const { t } = useTranslation('adminOrderDetail');
    const { handlePrint, handleCancel, printRef } = usePrintModalLogic({ isOpen, onCancel });

    if (!order) return null;

    return (
        <Modal
            open={isOpen}
            onCancel={handleCancel}
            footer={null}
            closeIcon={null}
            closable={false}
            width={800}
            destroyOnClose
            classNames={{ content: '!bg-transparent !shadow-none !p-0' }}
            wrapClassName="backdrop-blur-sm"
        >
            <div className="w-full relative flex justify-center py-8">
                <button
                    onClick={handleCancel}
                    className="no-print fixed top-6 right-6 bg-white dark:bg-[#1a1a1c] text-slate-400 hover:text-slate-600 dark:hover:text-white p-2 rounded-full shadow-lg border border-slate-200 dark:border-white/10 transition-colors z-[60]"
                >
                    <X size={24} />
                </button>

                <button
                    className="no-print fixed bottom-8 right-8 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors z-[60]"
                    onClick={handlePrint}
                >
                    <Printer size={20} />
                    {t('print_btn')}
                </button>

                <div
                    ref={printRef}
                    id="print-section"
                    className="flex flex-col gap-6 bg-white text-black p-[10mm] shadow-2xl mx-auto rounded-none"
                    style={{
                        width: '148mm',
                        minHeight: '210mm',
                        fontFamily: '"Public Sans", sans-serif'
                    }}
                >
                    <PrintHeader t={t} />
                    <PrintBarcode orderCode={order.order_code} />
                    <PrintReceiver delivery={order.delivery} t={t} />
                    <PrintItems items={order.items} t={t} />
                    <NotesSection note={order.delivery?.note} t={t} />
                    <PrintPayment payment={order.payment} financials={order.financials} t={t} />
                    <PrintFooter t={t} />
                </div>
            </div>
        </Modal>
    );
};
