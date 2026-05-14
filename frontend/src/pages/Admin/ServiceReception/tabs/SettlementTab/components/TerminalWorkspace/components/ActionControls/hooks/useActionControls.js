import { useState } from 'react';
import { PAYMENT_METHODS } from '../../../../../constants/settlementConstants';

export const useActionControls = (isPaid, onConfirmPayment) => {
    const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS.TRANSFER);

    const handleSelectPayment = (method) => {
        if (!isPaid) {
            setSelectedPayment(method);
        }
    };

    const handleConfirm = () => {
        if (!isPaid) {
            onConfirmPayment(selectedPayment);
        }
    };

    return {
        selectedPayment,
        handleSelectPayment,
        handleConfirm
    };
};
