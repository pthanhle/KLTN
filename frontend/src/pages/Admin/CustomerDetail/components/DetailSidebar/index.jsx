import React from 'react';
import { Skeleton } from 'antd';
import { ContactInfoCard } from './components/ContactInfoCard';
import { PrivateNotesCard } from './components/PrivateNotesCard';

export const DetailSidebar = ({ customer, onUpdate, isLoading, t }) => {
    if (isLoading || !customer) {
        return (
            <aside className="lg:col-span-3 space-y-8">
                <div className="bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/5 rounded-2xl p-8 sticky top-28 shadow-sm animate-pulse">
                    <Skeleton.Input active size="small" className="w-32 mb-8" />
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="space-y-2">
                                <Skeleton.Input active size="small" className="w-20 block" />
                                <Skeleton.Input active size="small" className="w-48 block" />
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        );
    }

    return (
        <aside className="lg:col-span-3 space-y-8">
            <ContactInfoCard customer={customer} t={t} />
            <PrivateNotesCard customer={customer} onSave={onUpdate} t={t} />
        </aside>
    );
};
