import { Minus, Plus } from 'lucide-react';
import { Button } from 'antd';

const QuantityInput = ({ value, onChange, label }) => {
    return (
        <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                {label}
            </label>
            <div className="flex items-center h-[52px] bg-slate-50 dark:bg-[#0a0a0b] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-inner">
                <Button 
                    type="text" 
                    onClick={() => onChange(-1)} 
                    className="w-12 h-full rounded-none flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-500 hover:text-slate-900 dark:hover:text-white border-0"
                    icon={<Minus size={16} />}
                />
                <input 
                    type="number" 
                    value={value} 
                    readOnly 
                    className="w-full h-full bg-transparent text-center font-black border-none focus:ring-0 text-slate-900 dark:text-white"
                />
                <Button 
                    type="text" 
                    onClick={() => onChange(1)} 
                    className="w-12 h-full rounded-none flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-500 hover:text-slate-900 dark:hover:text-white border-0"
                    icon={<Plus size={16} />}
                />
            </div>
        </div>
    );
};

export default QuantityInput;
