import React from 'react';
import { ShieldCheck, PenTool } from 'lucide-react';

export const TrustBadges = ({ t }) => {
    return (
        <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 text-xs text-slate-500">
                <ShieldCheck className="w-5 h-5 text-yellow-500" />
                <span>{t('msg_warranty', 'Bảo hành chính hãng')}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
                <PenTool className="w-5 h-5 text-yellow-500" />
                <span>{t('msg_free_install', 'Lắp đặt miễn phí')}</span>
            </div>
        </div>
    );
};

export default TrustBadges;
