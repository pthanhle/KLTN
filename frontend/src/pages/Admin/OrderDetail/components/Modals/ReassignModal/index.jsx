import React from 'react';
import { Modal, Skeleton } from 'antd';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useReassignLogic } from './hooks/useReassignLogic';
import { StaffListItem } from './StaffListItem';

export const ReassignModal = ({ isOpen, onCancel, onSubmit, currentStaffId }) => {
    const { t } = useTranslation('adminOrderDetail');
    const {
        searchQuery,
        setSearchQuery,
        selectedStaffId,
        setSelectedStaffId,
        filteredStaffList,
        loading
    } = useReassignLogic(isOpen, currentStaffId);

    const handleSubmit = () => {
        if (selectedStaffId) {
            onSubmit(selectedStaffId);
        }
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onCancel}
            title={null}
            footer={null}
            closable={false}
            width={520}
            destroyOnClose
            styles={{
                content: { padding: 0, overflow: 'hidden', borderRadius: '1rem' },
                body: { padding: 0 }
            }}
        >
            <div className="w-full flex flex-col relative overflow-hidden">
                <div className="p-6 pb-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-start">
                    <div>
                        <h2 className="font-bold text-xl text-slate-900 dark:text-white tracking-tight mb-1">
                            {t('reassign_modal_title', 'Chuyển giao công việc')}
                        </h2>
                        <p className="text-sm text-slate-500">
                            {t('reassign_modal_subtitle', 'Chọn nhân sự để tiếp nhận đơn hàng')}
                        </p>
                    </div>
                </div>

                <div className="p-6 flex-1 flex flex-col gap-4 overflow-hidden">
                    <div className="relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-yellow-500 transition-colors" />
                        <input
                            className="w-full bg-slate-50 dark:bg-[#202022] border-none rounded-full py-3 pl-12 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-1 focus:ring-yellow-500 transition-all outline-none"
                            placeholder={t('reassign_search_placeholder', 'Tìm kiếm tên nhân viên, mã NV...')}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mt-2 space-y-2 max-h-[350px]">
                        {loading ? (
                            <div className="space-y-3 mt-4">
                                <Skeleton active avatar paragraph={{ rows: 1 }} />
                                <Skeleton active avatar paragraph={{ rows: 1 }} />
                                <Skeleton active avatar paragraph={{ rows: 1 }} />
                            </div>
                        ) : filteredStaffList.length === 0 ? (
                            <div className="text-center py-8 text-slate-500">
                                {t('reassign_empty_state', 'Không tìm thấy nhân viên nào')}
                            </div>
                        ) : (
                            filteredStaffList.map(staff => (
                                <StaffListItem
                                    key={staff._id}
                                    staff={staff}
                                    isSelected={selectedStaffId === staff._id}
                                    isCurrentStaff={currentStaffId === staff._id}
                                    onSelect={setSelectedStaffId}
                                    t={t}
                                />
                            ))
                        )}
                    </div>
                </div>
                <div className="p-6 pt-4 border-t border-slate-100 dark:border-white/5 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors text-xs font-bold uppercase tracking-wider"
                    >
                        {t('reassign_cancel_btn', 'Hủy')}
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedStaffId || selectedStaffId === currentStaffId}
                        className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-sm ${selectedStaffId && selectedStaffId !== currentStaffId
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-yellow-500/20'
                            : 'bg-slate-200 dark:bg-white/10 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                            }`}
                    >
                        {t('reassign_confirm_btn', 'Xác nhận chuyển giao')}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
