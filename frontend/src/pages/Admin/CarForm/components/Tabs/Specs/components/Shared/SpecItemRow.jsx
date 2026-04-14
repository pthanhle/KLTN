import React from 'react';
import { Form, Input } from 'antd';
import { GripVertical, Trash2 } from 'lucide-react';

const SpecItemRow = ({ itemKey, itemName, restItemField, removeItem }) => {
    return (
        <div key={itemKey} className="grid grid-cols-[40px_1fr_1fr_40px] gap-4 items-start px-4 py-3 border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
            <div className="flex items-center justify-center h-10">
                <GripVertical size={16} className="text-slate-300 dark:text-slate-600 cursor-grab active:cursor-grabbing hover:text-slate-500" />
            </div>
            <div>
                <Form.Item
                    {...restItemField}
                    name={[itemName, 'label']}
                    rules={[{ required: true, message: 'Bắt buộc' }]}
                    className="mb-0"
                    required={false}
                >
                    <Input
                        className="w-full !h-10 !bg-white dark:!bg-[#1a1a1c] !border-slate-200 dark:!border-white/10 !rounded-lg px-3 text-sm font-semibold text-slate-700 dark:text-slate-300 focus:!ring-2 focus:!ring-yellow-500/20"
                        placeholder="VD: Chiều dài (mm)"
                    />
                </Form.Item>
            </div>
            <div>
                <Form.Item
                    {...restItemField}
                    name={[itemName, 'value']}
                    rules={[{ required: true, message: 'Bắt buộc' }]}
                    className="mb-0"
                    required={false}
                >
                    <Input
                        className="w-full !h-10 !bg-white dark:!bg-[#1a1a1c] !border-slate-200 dark:!border-white/10 !rounded-lg px-3 text-sm font-semibold text-slate-900 dark:text-white focus:!ring-2 focus:!ring-yellow-500/20"
                        placeholder="VD: 4850"
                    />
                </Form.Item>
            </div>
            <div className="flex items-center justify-center h-10">
                <button
                    type="button"
                    onClick={() => removeItem(itemName)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer border-none bg-transparent"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default SpecItemRow;
