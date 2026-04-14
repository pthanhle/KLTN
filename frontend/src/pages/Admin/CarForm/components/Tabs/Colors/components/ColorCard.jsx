import { Trash2 } from 'lucide-react';
import ColorSwatchPreview from './ColorSwatchPreview';
import ColorInputFields from './ColorInputFields';

const ColorCard = ({ name, restField, removeColor }) => {
    return (
        <div className="relative w-full block bg-white dark:bg-[#1a1a1c] border border-slate-100 dark:border-white/5 rounded-3xl p-8 hover:border-yellow-500/20 dark:hover:border-yellow-500/20 transition-all duration-300 shadow-sm">
            <button
                type="button"
                onClick={() => removeColor(name)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all cursor-pointer border-none bg-transparent z-50"
            >
                <Trash2 size={18} />
            </button>

            <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start pt-4 lg:pt-0">
                <ColorSwatchPreview name={name} />
                <ColorInputFields name={name} restField={restField} />
            </div>
        </div>
    );
};

export default ColorCard;
