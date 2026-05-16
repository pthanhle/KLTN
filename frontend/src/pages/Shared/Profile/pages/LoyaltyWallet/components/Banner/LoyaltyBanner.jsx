import React from 'react';
import { Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LOYALTY_TIER_COLORS } from '../../constants/loyalty.constants';

const LoyaltyBanner = ({ user }) => {
    const { t } = useTranslation('loyalty');

    const getTierColor = (tier) => {
        return LOYALTY_TIER_COLORS[tier] || LOYALTY_TIER_COLORS['BRONZE'];
    };

    return (
        <div className={`relative overflow-hidden rounded-3xl p-8 mb-10 text-white bg-gradient-to-br ${getTierColor(user?.loyalty?.tier)} shadow-lg`}>
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-black/10 rounded-full blur-xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-1">{t('loyalty_membership')}</p>
                    <h3 className="text-3xl font-black mb-1">{user?.full_name}</h3>
                    <div className="flex items-center gap-2">
                        <Award size={18} className="opacity-90" />
                        <span className="font-bold text-lg tracking-wider">{user?.loyalty?.tier || 'BRONZE'}</span>
                    </div>
                </div>

                <div className="text-left md:text-right bg-black/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                    <p className="text-sm font-medium opacity-80 mb-1">{t('loyalty_current_points')}</p>
                    <p className="text-4xl font-black tracking-tight">
                        {user?.loyalty?.points?.toLocaleString() || 0} <span className="text-xl font-semibold opacity-80">{t('loyalty_pts')}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoyaltyBanner;
