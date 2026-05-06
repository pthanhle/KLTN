import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Ban, CheckCircle2 } from 'lucide-react';
import { RoleBadge } from './RoleBadge';
import { StatusIndicator } from './StatusIndicator';
import { EditAction } from '../../../../../components/TableActions';

const AvatarRenderer = ({ url, name }) => {
    return (
        <Avatar 
            src={url} 
            icon={<UserOutlined />}
            className="w-12 h-12 flex items-center justify-center border border-white/10 shrink-0 bg-[#2e3447] text-[#ffd165] dark:bg-surface-container-highest dark:border-white/10"
        >
            {!url && name?.substring(0, 2)?.toUpperCase()}
        </Avatar>
    );
};

export const getColumns = (t, navigate) => [
    {
        title: t('adminStaff:colEmployee', 'Nhân viên'),
        dataIndex: 'fullName',
        key: 'employee',
        width: 300,
        render: (text, record) => (
            <div 
                className="flex items-center gap-5 whitespace-nowrap cursor-pointer group/name"
                onClick={() => navigate(`/admin/staff/${record._id}`)}
            >
                <AvatarRenderer url={record.avatarUrl} name={text} />
                <div className="min-w-0">
                    <div className="font-semibold text-slate-900 dark:text-white text-base truncate group-hover/name:text-yellow-600 dark:group-hover/name:text-yellow-500 transition-colors">
                        {text}
                    </div>
                    <div className="text-slate-500 dark:text-[#d3c5ac] text-xs mt-0.5 truncate">ID: {record.employeeId}</div>
                </div>
            </div>
        )
    },
    {
        title: t('adminStaff:colRole', 'Chức vụ'),
        dataIndex: 'role',
        key: 'role',
        width: 180,
        render: (role) => <RoleBadge role={role} />
    },
    {
        title: t('adminStaff:colDepartment', 'Phòng ban'),
        dataIndex: 'department',
        key: 'department',
        width: 180,
        render: (text) => <span className="text-slate-600 dark:text-[#d3c5ac] whitespace-nowrap font-medium">{text}</span>
    },
    {
        title: t('adminStaff:colStatus', 'Trạng thái'),
        dataIndex: 'status',
        key: 'status',
        width: 150,
        render: (status) => <StatusIndicator status={status} />
    },
    {
        title: t('adminStaff:colSalary', 'Lương cơ bản'),
        dataIndex: 'baseSalary',
        key: 'baseSalary',
        width: 180,
        render: (salary) => (
            <span className="font-mono text-slate-900 dark:text-white text-base whitespace-nowrap">
                ${salary?.toLocaleString()}
                <span className="text-slate-500 dark:text-[#d3c5ac] text-xs">/mo</span>
            </span>
        )
    },
    {
        title: t('adminStaff:colKpi', 'Cấu trúc KPI'),
        dataIndex: 'compensation',
        key: 'kpi',
        width: 200,
        render: (_, record) => {
            const { kpiType, kpiValue } = record;
            if (kpiType === 'FLAT_RATE') {
                return <span className="text-slate-600 dark:text-[#d3c5ac] whitespace-nowrap font-medium">{t('adminStaff:kpi_flat_rate', { rate: `$${kpiValue}` })}</span>;
            }
            if (kpiType === 'COMMISSION') {
                return <span className="text-slate-600 dark:text-[#d3c5ac] whitespace-nowrap font-medium">{t('adminStaff:kpi_commission', { rate: kpiValue })}</span>;
            }
            return <span className="text-slate-600 dark:text-[#d3c5ac] whitespace-nowrap font-medium">{t('adminStaff:kpi_salary_only', 'Salary Only')}</span>;
        }
    },
    {
        title: t('adminStaff:colAction', 'Thao tác'),
        key: 'actions',
        align: 'right',
        width: 120,
        fixed: 'right',
        render: (_, record) => {
            const isActive = record.status !== 'SUSPENDED';
            
            return (
                <div className="flex justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity whitespace-nowrap">
                    <EditAction 
                        onEdit={() => navigate(`/admin/staff/${record._id}`)} 
                        tooltipText={t('common:edit', 'Chỉnh sửa')}
                    />
                    {isActive ? (
                        <button 
                            type="button"
                            onClick={() => console.log('Suspend staff', record._id)}
                            className="group w-10 h-10 flex flex-shrink-0 items-center justify-center rounded-xl bg-rose-50/50 dark:bg-rose-500/10 border border-rose-200/50 dark:border-rose-500/20 text-rose-600 dark:text-rose-500 hover:bg-rose-500 hover:border-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-[#141416] transition-all shadow-sm outline-none"
                            title={t('adminStaff:btn_suspend', 'Đình chỉ')}
                        >
                            <Ban size={16} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                        </button>
                    ) : (
                        <button 
                            type="button"
                            onClick={() => console.log('Activate staff', record._id)}
                            className="group w-10 h-10 flex flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50/50 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-[#141416] transition-all shadow-sm outline-none"
                            title={t('adminStaff:btn_activate', 'Kích hoạt lại')}
                        >
                            <CheckCircle2 size={16} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                        </button>
                    )}
                </div>
            );
        }
    }
];
