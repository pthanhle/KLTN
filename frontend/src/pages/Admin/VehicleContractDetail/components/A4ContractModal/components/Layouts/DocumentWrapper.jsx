import React from 'react';
import { DocumentHeader } from '../DocumentSections/DocumentHeader';
import { PartySeller } from '../DocumentSections/PartySeller';
import { PartyBuyer } from '../DocumentSections/PartyBuyer';
import { VehicleDetails } from '../DocumentSections/VehicleDetails';
import { PricingDetails } from '../DocumentSections/PricingDetails';
import { LegalTerms, Signatures } from '../DocumentSections/LegalTerms';

export const DocumentWrapper = React.forwardRef(({ contract, isEditMode, onChange }, ref) => {
    return (
        <div 
            ref={ref}
            className="bg-white mx-auto my-8 shadow-xl print:shadow-none print:m-0"
            style={{ 
                width: '210mm', 
                minHeight: '297mm', 
                padding: '20mm',
                color: 'black', // Always print in black
            }}
        >
            <div className="font-[Times_New_Roman] text-[14pt]">
                <DocumentHeader contract={contract} isEditMode={isEditMode} onChange={onChange} />
                <PartySeller />
                <PartyBuyer snapshot={contract.customer_snapshot} isEditMode={isEditMode} onChange={onChange} />
                <VehicleDetails snapshot={contract.vehicle_snapshot} isEditMode={isEditMode} onChange={onChange} />
                <PricingDetails snapshot={contract.pricing_snapshot} isEditMode={isEditMode} onChange={onChange} />
                <LegalTerms />
                <Signatures />
            </div>
        </div>
    );
});
