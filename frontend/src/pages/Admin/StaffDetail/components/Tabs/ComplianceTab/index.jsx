import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldAlert } from 'lucide-react';
import { useComplianceData } from './hooks/useComplianceData';
import IdentityCard from './components/Cards/IdentityCard';
import BankInfoCard from './components/Cards/BankInfoCard';
import EmergencyContactCard from './components/Cards/EmergencyContactCard';
import { Skeleton } from 'antd';

const ComplianceTab = ({ staff }) => {
    const { t } = useTranslation();
    const { data, isLoading, logUnmaskAction, updateLocalData } = useComplianceData(staff?._id);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-6 animate-pulse">
                <Skeleton active paragraph={{ rows: 6 }} className="bg-white dark:bg-[#1c1c1e] p-6 rounded-xl" />
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <Skeleton active paragraph={{ rows: 4 }} className="xl:col-span-2 bg-white dark:bg-[#1c1c1e] p-6 rounded-xl" />
                    <Skeleton active paragraph={{ rows: 4 }} className="xl:col-span-1 bg-white dark:bg-[#1c1c1e] p-6 rounded-xl" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase mb-1">
                        {t('adminStaffCompliance:title', 'Pháp lý & Hành chính')}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        {t('adminStaffCompliance:subtitle', 'Quản lý thông tin định danh và thanh toán bảo mật')}
                    </p>
                </div>
            </div>

            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3">
                <ShieldAlert className="text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" size={20} />
                <div>
                    <h4 className="text-sm font-bold text-yellow-800 dark:text-yellow-500 uppercase tracking-widest mb-1">
                        {t('adminStaffCompliance:alert_security', 'Dữ liệu PII Nhạy cảm')}
                    </h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-600/80">
                        {t('adminStaffCompliance:alert_security_desc', 'Mọi thao tác xem dữ liệu (Unmask) đều được hệ thống lưu vết (Audit Log) nhằm mục đích bảo mật.')}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                    <IdentityCard
                        staffId={staff?._id}
                        data={data?.identity}
                        t={t}
                        onUnmask={logUnmaskAction}
                        onUpdateSuccess={updateLocalData}
                    />
                </div>

                <div className="flex flex-col gap-6 xl:col-span-1">
                    <BankInfoCard
                        staffId={staff?._id}
                        data={data?.financial}
                        t={t}
                        onUnmask={logUnmaskAction}
                        onUpdateSuccess={updateLocalData}
                    />
                    <EmergencyContactCard
                        staffId={staff?._id}
                        data={data?.emergency}
                        t={t}
                        onUpdateSuccess={updateLocalData}
                    />
                </div>
            </div>
        </div>
    );
};

export default ComplianceTab;
