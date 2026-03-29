import React from 'react';
import OverviewHealthHud from './OverviewHealthHud';
import OverviewCustomerVoice from './OverviewCustomerVoice';
import OverviewVisualWalkaround from './OverviewVisualWalkaround';
import OverviewChecklist from './OverviewChecklist';
import OverviewHandover from './OverviewHandover';

const OverviewTab = ({ overviewData }) => {
    if (!overviewData) return null;

    return (
        <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
                
                {/* LEFT COLUMN: Health & Customer Voice */}
                <div className="xl:col-span-3 space-y-8">
                    <OverviewHealthHud healthData={overviewData.health_hud} />
                    <OverviewCustomerVoice note={overviewData.customer_note} />
                </div>

                {/* CENTER COLUMN: Visual Walkaround (Most Important) */}
                <div className="xl:col-span-5">
                    <OverviewVisualWalkaround 
                        imageUrl={overviewData.vehicle_image} 
                        hotspots={overviewData.hotspots} 
                    />
                </div>

                {/* RIGHT COLUMN: Checklist & Handover */}
                <div className="xl:col-span-4 space-y-8">
                    <OverviewChecklist checklist={overviewData.checklist} />
                    <OverviewHandover signatures={overviewData.signatures} />
                </div>
                
            </div>
        </div>
    );
};

export default OverviewTab;
