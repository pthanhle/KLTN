import { useState, useMemo } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import { message, Modal } from 'antd';
import { AlertTriangle } from 'lucide-react';
import React from 'react';

export const useCategoriesTable = (categories, setCategories, t) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 300);
    const [messageApi, contextHolder] = message.useMessage();

    const filteredCategories = useMemo(() => {
        if (!debouncedSearch.trim()) return categories;
        const lowerSearch = debouncedSearch.toLowerCase();
        return categories.filter(category => 
            category.name.toLowerCase().includes(lowerSearch) ||
            category.id.toLowerCase().includes(lowerSearch)
        );
    }, [categories, debouncedSearch]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleDeleteCategory = (record) => {
        if (record.count > 0) {
            messageApi.error(t('adminCategories:errDeleteLock', { count: record.count, defaultValue: `KHÔNG THỂ XÓA: Danh mục này đang chứa ${record.count} xe!` }));
            return;
        }

        Modal.confirm({
            title: <span className="font-black text-slate-800 dark:text-white text-xl">XÓA DANH MỤC?</span>,
            icon: <AlertTriangle className="text-red-500" size={32} strokeWidth={2.5} />,
            content: (
                <div className="mt-2 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Bạn sắp xóa vĩnh viễn hệ phân loại <strong className="text-slate-900 dark:text-white">{record.name}</strong> (Mã: {record.id}).
                    <p className="mt-2 text-red-500 font-bold opacity-80">Hành động này không thể hoàn tác!</p>
                </div>
            ),
            okText: 'XÓA VĨNH VIỄN',
            okType: 'danger',
            cancelText: 'HỦY BỎ',
            width: 480,
            centered: true,
            className: "dark:[&_.ant-modal-content]:!bg-[#151b2d] dark:[&_.ant-modal-content]:shadow-2xl dark:[&_.ant-modal-content]:!border dark:[&_.ant-modal-content]:!border-red-500/10 [&_.ant-btn]:!h-11 [&_.ant-btn]:!rounded-full [&_.ant-btn]:!font-black [&_.ant-btn]:!text-xs [&_.ant-btn]:!tracking-widest",
            onConfirm: () => {
                setCategories(prev => prev.filter(c => c.id !== record.id));
                messageApi.success(t('common:deleteSuccess', 'Đã xóa thành công'));
            }
        });
    };

    return {
        filteredCategories,
        searchTerm,
        handleSearch,
        handleDeleteCategory,
        messageApi,
        contextHolder
    };
};
