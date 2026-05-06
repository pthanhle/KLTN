import React from 'react';
import { usePayrollForm } from './hooks/usePayrollForm';
import { UnsavedWarning } from './components/UnsavedWarning';
import { BaseCompensationSection } from './components/BaseCompensationSection';
import { KpiCommissionSection } from './components/KpiCommissionSection';
import { AdditionalPerksSection } from './components/AdditionalPerksSection';
import { StickyFooter } from './components/StickyFooter';

const PayrollRulesTab = ({ staff }) => {
    const {
        formData,
        isDirty,
        isSaving,
        handleInputChange,
        handleToggleOvertime,
        handleReset,
        handleSubmit
    } = usePayrollForm(staff);

    return (
        <div className="pb-24">
            <UnsavedWarning isDirty={isDirty} onDiscard={handleReset} />
            
            <form className="space-y-10" onSubmit={handleSubmit}>
                <BaseCompensationSection 
                    formData={formData} 
                    handleInputChange={handleInputChange} 
                />
                
                <KpiCommissionSection 
                    formData={formData} 
                    handleInputChange={handleInputChange} 
                />
                
                <AdditionalPerksSection 
                    formData={formData} 
                    handleToggleOvertime={handleToggleOvertime} 
                />
            </form>

            <StickyFooter 
                isDirty={isDirty} 
                isSaving={isSaving} 
                onReset={handleReset} 
                onSubmit={handleSubmit} 
            />
        </div>
    );
};

export default PayrollRulesTab;
