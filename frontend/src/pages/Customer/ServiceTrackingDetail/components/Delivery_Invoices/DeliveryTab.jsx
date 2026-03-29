import React from 'react';
import HandoverBrief from './Brief/HandoverBrief';
import InvoiceLedger from './Invoice/InvoiceLedger';
import PaymentTerminal from './Payment/PaymentTerminal';
import HandshakeProtocol from './Protocol/HandshakeProtocol';
import NpsRating from './Feedback/NpsRating';
import { useDeliveryTabLogic } from '../../hooks/useDeliveryTabLogic';
import DeliverySkeleton from './DeliverySkeleton';

const DeliveryTab = () => {
    const { deliveryData, isLoading } = useDeliveryTabLogic();

    if (isLoading || !deliveryData) {
        return (
            <div className="animate-fadeIn">
                <DeliverySkeleton />
            </div>
        );
    }

    return (
        <div className="animate-fadeIn pb-32">
            <div className="grid grid-cols-12 gap-8">
                {/* Left Column (8 cols): Brief & Invoice */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                    <HandoverBrief data={deliveryData.handover_brief} />
                    <InvoiceLedger data={deliveryData.invoice_ledger} />
                    {deliveryData.invoice_ledger?.payment_status === 'PAID' && (
                        <NpsRating data={deliveryData.post_service_actions?.nps_rating} />
                    )}
                </div>

                {/* Right Column (4 cols): Payment & Handshake */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
                    <PaymentTerminal data={deliveryData} />
                    <HandshakeProtocol data={deliveryData.handshake_protocol} />
                </div>
            </div>
        </div>
    );
};

export default DeliveryTab;
