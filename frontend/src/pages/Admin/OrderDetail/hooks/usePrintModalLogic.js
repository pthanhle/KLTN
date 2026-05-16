import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export const usePrintModalLogic = ({ isOpen, onCancel }) => {
    const printRef = useRef(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: 'Phieu_Giao_Hang',
    });

    return {
        printRef,
        handlePrint,
        handleCancel: onCancel
    };
};
