import { Drawer, Form, Input, Select, Button } from 'antd';
import { X } from 'lucide-react';

export const CustomerEditorDrawer = ({ isOpen, onClose, customer, tiersList, t }) => {
    if (!customer) return null;

    return (
        <Drawer
            push={false}
            size="default"
            placement="right"
            onClose={onClose}
            open={isOpen}
            closable={false}
            className="custom-admin-drawer"
            classNames={{
                body: 'p-0',
                header: 'hidden'
            }}
        >
            <div className="h-full flex flex-col bg-white/90 dark:bg-[#0c1324]/90 backdrop-blur-2xl">
                <div className="p-8 pb-4">
                    <h2 className="text-yellow-600 dark:text-premium-gold font-black text-2xl uppercase tracking-tighter">
                        {t('adminCustomers:editTitle', 'CUSTOMER EDITOR')}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">
                        {t('adminCustomers:editSubtitle', 'Update detail records')}
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto px-8 py-4 custom-scrollbar">
                    <Form layout="vertical" initialValues={{
                        full_name: customer.full_name,
                        tier: customer.tier,
                        phone: customer.phone,
                        email: customer.email
                    }}>
                        <Form.Item label={<span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{t('adminCustomers:labelFullName', 'Full Name')}</span>} name="full_name">
                            <Input className="w-full bg-slate-50 dark:bg-[#141416] border-none focus:ring-1 focus:ring-yellow-500 text-slate-800 dark:text-slate-200 p-3 rounded-lg font-bold" />
                        </Form.Item>

                        <Form.Item label={<span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{t('adminCustomers:labelPhone', 'Phone Number')}</span>} name="phone">
                            <Input className="w-full bg-slate-50 dark:bg-[#141416] border-none focus:ring-1 focus:ring-yellow-500 text-slate-800 dark:text-slate-200 p-3 rounded-lg font-bold" />
                        </Form.Item>

                        <Form.Item label={<span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{t('adminCustomers:labelEmail', 'Email Address')}</span>} name="email">
                            <Input className="w-full bg-slate-50 dark:bg-[#141416] border-none focus:ring-1 focus:ring-yellow-500 text-slate-800 dark:text-slate-200 p-3 rounded-lg font-bold" />
                        </Form.Item>

                        <Form.Item label={<span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{t('adminCustomers:labelTier', 'VIP Tier Ranking')}</span>} name="tier">
                            <Select 
                                className="w-full h-12" 
                                bordered={false} 
                                classNames={{ popup: 'dark:bg-[#141416]' }}
                                options={tiersList?.map(tier => ({
                                    value: tier.id,
                                    label: <span className="font-bold">{tier.name}</span>
                                })) || []}
                            />
                        </Form.Item>
                    </Form>
                </div>

                <div className="p-8 pt-4 border-t border-slate-100 dark:border-white/10 flex gap-4 bg-white dark:bg-[#0c1324] sticky bottom-0">
                    <Button 
                        type="primary" 
                        size="large" 
                        className="flex-1 rounded-full bg-yellow-500 hover:bg-yellow-600 dark:bg-premium-gold dark:hover:bg-yellow-500 text-slate-900 font-black tracking-widest uppercase text-[11px] border-none h-[56px]"
                    >
                        {t('adminCustomers:btnSave', 'SAVE CHANGES')}
                    </Button>
                    <Button 
                        type="text" 
                        onClick={onClose} 
                        className="w-[56px] h-[56px] rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#141416] dark:hover:bg-white/5 flex items-center justify-center text-slate-500 border-none"
                    >
                        <X size={20} />
                    </Button>
                </div>
            </div>
            
            <style>{`
                .ant-select-selector {
                    background-color: transparent !important;
                    padding: 0 !important;
                    height: 100% !important;
                    display: flex !important;
                    align-items: center !important;
                }
                .ant-select {
                    background-color: var(--tw-bg-opacity, 1) rgba(20, 20, 22, 1);
                    border-radius: 0.5rem;
                    padding: 0 12px;
                }
                :global(.light) .ant-select {
                    background-color: #f8fafc;
                }
            `}</style>
        </Drawer>
    );
};
