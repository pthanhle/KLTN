import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

// Hooks & Constants
import { useStaffDetail } from './hooks/useStaffDetail';
import { STAFF_DETAIL_TABS } from './constants/tabs';

// Components
import Header from './components/Header';
import ProfileTab from './components/Tabs/ProfileTab';
import PayrollRulesTab from './components/Tabs/PayrollRulesTab';
import PerformanceTab from './components/Tabs/PerformanceTab';
import AttendanceTab from './components/Tabs/AttendanceTab';
import ComplianceTab from './components/Tabs/ComplianceTab';
import SkeletonDetail from './components/Shared/SkeletonDetail';

const StaffDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const {
        staff,
        isLoading,
        isUpdating,
        isDeactivating,
        formatCurrency,
        getKpiDisplay,
        handleEditProfile,
        handleDeactivateAccount
    } = useStaffDetail(id);

    const [activeTab, setActiveTab] = useState(STAFF_DETAIL_TABS[0].key);

    if (isLoading) {
        return <SkeletonDetail />;
    }

    if (!staff) {
        return (
            <div className="p-10 flex flex-col justify-center items-center h-screen bg-slate-50 dark:bg-[#141416]">
                <h1 className="text-2xl text-slate-800 dark:text-white mb-4">{t('adminStaffDetail:not_found')}</h1>
                <button onClick={() => navigate('/admin/staff')} className="text-blue-500 hover:underline">
                    {t('adminStaffDetail:back_to_list')}
                </button>
            </div>
        );
    }

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'PROFILE':
                return <ProfileTab staff={staff} />;
            case 'PAYROLL':
                return <PayrollRulesTab staff={staff} formatCurrency={formatCurrency} getKpiDisplay={getKpiDisplay} />;
            case 'PERFORMANCE':
                return <PerformanceTab staff={staff} />;
            case 'ATTENDANCE':
                return <AttendanceTab staff={staff} />;
            case 'COMPLIANCE':
                return <ComplianceTab staff={staff} />;
            default:
                return null;
        }
    };

    return (
        <div className="p-6 md:p-8 min-h-screen bg-slate-50 dark:bg-[#141416] transition-colors">
            <div className="mb-8 flex items-center justify-between">
                <button
                    onClick={() => navigate('/admin/staff')}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm"
                >
                    <ArrowLeft size={18} />
                </button>
            </div>

            <Header
                staff={staff}
                onEdit={handleEditProfile}
                onDeactivate={handleDeactivateAccount}
                isUpdating={isUpdating}
                isDeactivating={isDeactivating}
            />

            <div className="flex items-center gap-2 mb-8 border-b border-slate-200 dark:border-white/10">
                {STAFF_DETAIL_TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-6 py-3 font-bold text-sm tracking-widest uppercase transition-all border-b-2 ${activeTab === tab.key
                            ? 'border-yellow-500 text-yellow-500 dark:text-yellow-500'
                            : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
                            }`}
                    >
                        {t(tab.labelKey, tab.defaultLabel)}
                    </button>
                ))}
            </div>

            <div className="animate-fade-in">
                {renderActiveTab()}
            </div>
        </div>
    );
};

export default StaffDetail;
