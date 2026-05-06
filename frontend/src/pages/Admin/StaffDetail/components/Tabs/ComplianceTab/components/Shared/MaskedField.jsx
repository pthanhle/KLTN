import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const MaskedField = ({ value, type = 'text', onUnmask, className = '' }) => {
    const [isMasked, setIsMasked] = useState(true);

    if (!value) return <span className="text-slate-400 italic">Not provided</span>;

    const toggleMask = () => {
        const newState = !isMasked;
        setIsMasked(newState);
        if (!newState && onUnmask) {
            onUnmask();
        }
    };

    const getMaskedValue = () => {
        if (!isMasked) return value;

        const strVal = String(value);
        if (strVal.length <= 4) return '****';

        if (type === 'cccd' || type === 'bank') {
            return `${strVal.substring(0, 3)} ${'*'.repeat(strVal.length - 6)} ${strVal.substring(strVal.length - 3)}`;
        }

        if (type === 'phone') {
            return `${strVal.substring(0, 4)} ${'*'.repeat(strVal.length - 7)} ${strVal.substring(strVal.length - 3)}`;
        }

        return '••••••••';
    };

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <span className={`font-mono text-sm tracking-wider ${isMasked ? 'text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-white font-bold'}`}>
                {getMaskedValue()}
            </span>
            <button
                onClick={toggleMask}
                className="text-slate-400 hover:text-yellow-500 transition-colors p-1 rounded-md hover:bg-yellow-500/10 focus:outline-none"
                title={isMasked ? "Reveal" : "Hide"}
            >
                {isMasked ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
        </div>
    );
};

export default MaskedField;
