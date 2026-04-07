import React from 'react';
import { useTranslation } from 'react-i18next';
import TechnicalSpecsCard from './components/TechnicalSpecsCard';
import FitmentDataCard from './components/FitmentDataCard';
import UniversalFitIndicator from './components/UniversalFitIndicator';

export const SpecsSection = ({ part }) => {
    const { t } = useTranslation('partDetail');

    const specs = part?.specs || [];
    const fitmentData = part?.fitment_data || [];
    const compatibleBrands = part?.compatible_brands || [];
    
    const isUniversal = compatibleBrands.length === 0 && fitmentData.length === 0;

    return (
        <div className="mb-20 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <TechnicalSpecsCard specs={specs} t={t} />
            <FitmentDataCard fitmentData={fitmentData} compatibleBrands={compatibleBrands} t={t} />
            <UniversalFitIndicator isUniversal={isUniversal} t={t} />
        </div>
    );
};

export default SpecsSection;
