import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import QueueBoard from './components/QueueBoard';
import TerminalWorkspace from './components/TerminalWorkspace';
import { PrintableInvoice } from './components/PrintableInvoice';
import { useSettlementLogic } from './hooks/useSettlementLogic';

const SettlementTab = () => {
    const {
        searchQuery,
        setSearchQuery,
        queueVehicles,
        selectedBookingCode,
        handleSelectVehicle,
        activeTerminalData,
        isLoadingTerminal,
        isProcessingPayment,
        isClosingRO,
        handleConfirmPayment,
        handlePrintInvoice,
        handleCloseRO
    } = useSettlementLogic();

    const componentRef = useRef(null);

    const handlePrintInvoiceReal = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `Hoa_Don_Thanh_Toan_${selectedBookingCode}`,
        pageStyle: `
            @media print {
                @page { margin: 0; }
                body { margin: 1cm; background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
        `
    });

    return (
        <div className="h-full flex p-6 gap-6 overflow-hidden bg-slate-100 dark:bg-transparent print:bg-white print:p-0">
            <div className="flex-1 flex gap-6 w-full h-full print:hidden">
                {!selectedBookingCode ? (
                    <QueueBoard
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        queueVehicles={queueVehicles}
                        onSelectVehicle={handleSelectVehicle}
                    />
                ) : (
                    <TerminalWorkspace
                        selectedBookingCode={selectedBookingCode}
                        activeTerminalData={activeTerminalData}
                        isLoadingTerminal={isLoadingTerminal}
                        isProcessingPayment={isProcessingPayment}
                        isClosingRO={isClosingRO}
                        onConfirmPayment={handleConfirmPayment}
                        onPrintInvoice={handlePrintInvoiceReal}
                        onCloseRO={handleCloseRO}
                        onBack={() => handleSelectVehicle(null)}
                    />
                )}
            </div>

            <div style={{ display: 'none' }}>
                <div ref={componentRef}>
                    <PrintableInvoice
                        activeTerminalData={activeTerminalData}
                    />
                </div>
            </div>
        </div>
    );
};

export default SettlementTab;
