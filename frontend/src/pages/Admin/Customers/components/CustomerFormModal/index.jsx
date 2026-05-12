import { Modal, Form, Skeleton, message } from 'antd';
import { X, Loader2 } from 'lucide-react';
import { PersonalInfoSection } from './components/FormSections/PersonalInfoSection';
import { CategorizationSection } from './components/FormSections/CategorizationSection';
import { getCustomerFormSchemas } from './schemas/customerSchemas';
import { useCustomerFormLoader } from './hooks/useCustomerFormLoader';
import { useCustomerFormSubmit } from './hooks/useCustomerFormSubmit';

export const CustomerFormModal = ({ isOpen, onClose, customer, t, onSuccess }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { form, isEditMode, isLoading, tiersList } = useCustomerFormLoader(customer, isOpen);
    const { isSubmitting, handleSave } = useCustomerFormSubmit(onClose, messageApi, onSuccess);

    const schemas = getCustomerFormSchemas(t);

    const onSubmitWrapper = (values) => {
        handleSave(values, isEditMode, customer?._id || customer?.id);
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            closable={false}
            centered
            width={1000}
            destroyOnHidden
            classNames={{
                wrapper: 'fixed inset-0 z-50 flex items-center justify-center pointer-events-none custom-modal-wrapper',
                mask: 'backdrop-blur-sm bg-slate-900/40 dark:bg-[#1c1c1e]/60 pointer-events-auto',
                content: '!bg-transparent !shadow-none !p-0 overflow-hidden pointer-events-auto h-auto max-h-[90vh] ring-1 ring-slate-900/5 dark:ring-white/10 mx-auto transition-colors !rounded-2xl md:!rounded-[2rem] w-[95vw] !max-w-[1000px] flex flex-col',
                body: 'flex-1 h-full w-full'
            }}
            styles={{
                content: { padding: 0, backgroundColor: 'transparent', boxShadow: 'none' }
            }}
        >
            {contextHolder}
            <div className="bg-white dark:bg-[#1c1c1e] h-full flex flex-col relative w-full overflow-hidden transition-colors">

                <div className="px-8 md:px-10 py-6 md:py-8 border-b border-slate-200 dark:border-white/10 shrink-0 transition-colors z-20 shadow-sm relative bg-white dark:bg-[#1c1c1e]">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2 uppercase">
                                {isEditMode ? t('adminCustomers:editTitle', 'THÊM MỚI / CHỈNH SỬA KHÁCH HÀNG') : t('adminCustomers:createTitle', 'THÊM MỚI KHÁCH HÀNG')}
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-xs md:text-sm">
                                {isEditMode ? t('adminCustomers:editSubtitle', 'Cập nhật hồ sơ 360 độ') : t('adminCustomers:createSubtitle', 'Tạo dữ liệu khách hàng theo quy trình chuẩn')}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-500 dark:text-red-400 rounded-full transition-all active:scale-95 outline-none"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 md:px-10 py-4 custom-scrollbar relative z-10 w-full transition-colors">
                    {isLoading && (
                        <div className="flex flex-col pt-2 w-full">
                            <Skeleton active avatar={{ size: 96, shape: 'circle' }} paragraph={{ rows: 4 }} className="py-8 border-b border-slate-100 dark:border-white/5" />
                            <Skeleton active paragraph={{ rows: 3 }} className="py-8 border-b border-slate-100 dark:border-white/5" />
                        </div>
                    )}
                    
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onSubmitWrapper}
                        className={`flex flex-col animate-fade-in pb-4 ${isLoading ? 'hidden' : 'block'}`}
                    >
                        <PersonalInfoSection t={t} schemas={schemas} />
                        <CategorizationSection t={t} tiersList={tiersList} schemas={schemas} />
                    </Form>
                </div>

                <div className="px-8 md:px-10 py-5 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#141416] flex justify-end gap-3 items-center shadow-[0_-10px_30px_rgba(0,0,0,0.03)] shrink-0 transition-colors z-20">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 md:px-8 py-3 md:py-3.5 rounded-xl text-red-600 dark:text-red-400 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 font-bold text-[10px] md:text-xs tracking-widest uppercase transition-all outline-none active:scale-95"
                    >
                        {t('adminCustomers:btnCancel', 'Hủy')}
                    </button>
                    <button
                        type="button"
                        onClick={() => form.submit()}
                        disabled={isSubmitting || isLoading}
                        className="flex items-center gap-3 px-8 md:px-10 py-3 md:py-3.5 bg-yellow-500 hover:bg-yellow-600 outline-none text-slate-900 font-black text-[10px] md:text-xs tracking-widest uppercase rounded-xl shadow-xl shadow-yellow-500/20 active:scale-95 disabled:opacity-70 disabled:active:scale-100 transition-all cursor-pointer"
                    >
                        {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                        {isEditMode ? t('adminCustomers:btnSave', 'LƯU HỒ SƠ') : t('adminCustomers:btnCreate', 'TẠO MỚI')}
                    </button>
                </div>
            </div>

            <style>{`
                .custom-modal-wrapper {
                    padding: 0 !important;
                }
                .ant-modal {
                    position: relative;
                    max-width: 100vw;
                    margin: 0;
                    top: 0;
                    padding-bottom: 0;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .ant-modal-content {
                    display: flex !important;
                    flex-direction: column !important;
                    width: 100% !important;
                    height: auto !important;
                    max-height: 90vh !important;
                    background: transparent !important;
                    box-shadow: none !important;
                    padding: 0 !important;
                }
                .ant-modal-wrap {
                    pointer-events: none; /* Khác phục Overlay Click Mask đè Body */
                }

                .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                
                .custom-radio-tier .ant-radio-group {
                    display: grid !important;
                    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                    gap: 12px !important;
                    width: 100% !important;
                }
                @media (min-width: 768px) {
                    .custom-radio-tier .ant-radio-group {
                        grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
                    }
                }
                .custom-radio-tier .ant-radio-button-wrapper {
                    background: transparent;
                    border: 2px solid transparent;
                    color: inherit;
                    min-height: 56px;
                    border-radius: 0.75rem;
                    transition: all 0.3s;
                    margin: 0 !important;
                    padding: 0 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .custom-radio-tier .ant-radio-button-wrapper > span:not(.ant-radio-button) {
                    width: 100%;
                }
                .custom-radio-tier .ant-radio-button-wrapper::before {
                    display: none !important;
                }
                :global(.light) .custom-radio-tier .ant-radio-button-wrapper {
                    background: rgba(248, 250, 252, 1);
                }
                :global(.dark) .custom-radio-tier .ant-radio-button-wrapper {
                    background: rgba(255, 255, 255, 0.05); 
                }
                .custom-radio-tier .ant-radio-button-wrapper:hover {
                    border-color: rgba(226, 232, 240, 1);
                }
                :global(.dark) .custom-radio-tier .ant-radio-button-wrapper:hover {
                    border-color: rgba(255, 255, 255, 0.2);
                }
                .custom-radio-tier .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
                    background: rgba(234, 179, 8, 0.05) !important;
                    border-color: #eab308 !important;
                    color: #a16207 !important;
                }
                :global(.dark) .custom-radio-tier .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
                    color: #eab308 !important;
                }
                .custom-radio-tier .ant-radio-button-wrapper::before {
                    display: none !important;
                }
                .ant-select-selector {
                    border: none !important;
                    box-shadow: none !important;
                    padding: 0 !important;
                    background: transparent !important;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(156, 163, 175, 0.5);
                    border-radius: 9999px;
                }
            `}</style>
        </Modal>
    );
};
