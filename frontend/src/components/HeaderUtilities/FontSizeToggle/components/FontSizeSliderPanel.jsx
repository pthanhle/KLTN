import { Slider } from 'antd';
import { useTheme } from '../../../../contexts/ThemeContext';

const FontSizeSliderPanel = () => {
    const { fontSizeMultiplier, setFontSizeMultiplier } = useTheme();

    // Configuration for Slider Marks mapping percentage to pt sizes (base 16)
    const marks = {
        0.75: <span className="text-[11px] text-slate-400 dark:text-slate-500 font-bold select-none cursor-pointer">12</span>,
        0.875: <span className="text-[11px] text-slate-400 dark:text-slate-500 font-bold select-none cursor-pointer">14</span>,
        1: <span className="text-[11px] text-slate-600 dark:text-slate-300 font-bold select-none cursor-pointer">16</span>,
        1.125: <span className="text-[11px] text-slate-400 dark:text-slate-500 font-bold select-none cursor-pointer">18</span>,
        1.25: <span className="text-[11px] text-slate-400 dark:text-slate-500 font-bold select-none cursor-pointer">20</span>,
    };

    return (
        <div 
            className="w-72 bg-white dark:bg-[#141416]/95 border-0 shadow-none"
            onClick={(e) => e.stopPropagation()} // Prevent popover from closing when clicking inside
        >
            <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest select-none">
                    Kích cỡ hiển thị
                </span>
                <span className="text-xs font-black text-orange-600 dark:text-premium-gold bg-orange-100 dark:bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-200 dark:border-premium-gold/20 flex items-center gap-1 select-none pointer-events-none">
                    <span className="text-[10px] text-orange-500/80">pt</span>
                    {Math.round(fontSizeMultiplier * 16)}
                </span>
            </div>
            
            <div className="px-2 pb-2">
                <Slider 
                    min={0.75} 
                    max={1.25} 
                    step={0.125} 
                    marks={marks} 
                    value={fontSizeMultiplier} 
                    onChange={setFontSizeMultiplier} 
                    tooltip={{ formatter: null }}
                    className="mx-0"
                />
            </div>
        </div>
    );
};

export default FontSizeSliderPanel;
