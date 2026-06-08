import React, { useState } from 'react';
import HandoverBrief from './Brief/HandoverBrief';
import InvoiceLedger from './Invoice/InvoiceLedger';
import PaymentTerminal from './Payment/PaymentTerminal';
import HandshakeProtocol from './Protocol/HandshakeProtocol';
import NpsRating from './Feedback/NpsRating';
import DeliverySkeleton from './DeliverySkeleton';

const DeliveryTab = ({ deliveryData, progressId, onFinalPayment, isFinalPaymentRedirecting }) => {
    const [canPay, setCanPay] = useState(false);

    if (!deliveryData) {
        return <DeliverySkeleton />;
    }

    const isPaid = deliveryData.invoice_ledger?.payment_status === 'PAID';

    return (
        <div className="animate-fadeIn pb-32">
            <div className="grid grid-cols-12 gap-8">
                {/* Left Column (8 cols): Brief & Invoice */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                    <HandoverBrief data={deliveryData.handover_brief} />
                    <InvoiceLedger data={deliveryData.invoice_ledger} />
                    {isPaid && <NpsRating data={null} />}
                </div>

                {/* Right Column (4 cols): Gate pass (paid) or payment action */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
                    <PaymentTerminal isPaid={isPaid} />
                    <HandshakeProtocol
                        data={deliveryData.handshake_protocol}
                        isPaid={isPaid}
                        balanceDue={deliveryData.invoice_ledger?.balance_due || 0}
                        onCanPayChange={setCanPay}
                        canPay={canPay}
                        onFinalPayment={onFinalPayment}
                        isFinalPaymentRedirecting={isFinalPaymentRedirecting}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeliveryTab;
