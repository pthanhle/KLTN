import React from 'react';
import { Form, Input } from 'antd';
import { GripVertical, Trash2 } from 'lucide-react';

const SpecItemRow = ({ itemKey, itemName, restItemField, removeItem }) => {
    return (
        <div key={itemKey} className="grid grid-cols-12 gap-6 items-center group bg-white dark:bg-[#1a1a1c] p-3 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm hover:border-yellow-500/30 dark:hover:border-yellow-500/30 transition-all">
            <div className="col-span-1 flex justify-center">
                <GripVertical size={20} className="text-slate-300 dark:text-slate-600 cursor-grab active:cursor-grabbing group-hover:text-slate-400" />
            </div>
            <div className="col-span-5">
                <Form.Item
                    {...restItemField}
                    name={[itemName, 'label']}
                    rules={[{ required: true, message: 'Bắt buộc' }]}
                    className="mb-0"
                >
                    <Input
                        className="w-full !h-11 !bg-slate-50 dark:!bg-[#222225] !border-none !rounded-xl px-4 text-sm font-semibold text-slate-600 dark:text-slate-300 focus:!ring-2 focus:!ring-yellow-500/20"
                        placeholder="Chiều dài (mm)"
                    />
                </Form.Item>
            </div>
            <div className="col-span-5">
                <Form.Item
                    {...restItemField}
                    name={[itemName, 'value']}
                    rules={[{ required: true, message: 'Bắt buộc' }]}
                    className="mb-0"
                >
                    <Input
                        className="w-full !h-11 !bg-slate-50 dark:!bg-[#222225] !border-none !rounded-xl px-4 text-sm font-semibold text-slate-900 dark:text-white focus:!ring-2 focus:!ring-yellow-500/20"
                        placeholder="4850"
                    />
                </Form.Item>
            </div>
            <div className="col-span-1 flex justify-end">
                <button
                    type="button"
                    onClick={() => removeItem(itemName)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer border-none bg-transparent"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default SpecItemRow;
