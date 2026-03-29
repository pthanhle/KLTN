import React from 'react';
import { Star } from 'lucide-react';

const NpsRatingStar = ({ label, value, onChange }) => {
    return (
        <div className="flex items-center justify-between">
            <span className="text-slate-700 dark:text-gray-300 text-sm font-medium">{label}</span>
            <div className="flex gap-1 group">
                {[1, 2, 3, 4, 5].map((idx) => (
                    <Star 
                        key={idx} 
                        className={`w-5 h-5 cursor-pointer transition-transform hover:scale-110 ${idx <= value ? 'fill-yellow-500 text-yellow-500' : 'text-slate-200 dark:text-gray-600'}`} 
                        onClick={() => onChange(idx)} 
                        strokeWidth={1.5}
                    />
                ))}
            </div>
        </div>
    );
};

export default NpsRatingStar;
