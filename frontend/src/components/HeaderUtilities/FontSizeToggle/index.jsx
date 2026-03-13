import { Type } from 'lucide-react';
import { Popover } from 'antd';
import FontSizeSliderPanel from './components/FontSizeSliderPanel';

const FontSizeToggle = () => {

    return (
        <Popover 
            content={<FontSizeSliderPanel />} 
            placement="bottomRight" 
            trigger="click"
            styles={{ 
                body: {
                    padding: '20px', 
                    borderRadius: '16px',
                }
            }}
            classNames={{ root: "dark:[&_.ant-popover-inner]:bg-[#141416]/95 dark:[&_.ant-popover-inner]:backdrop-blur-xl dark:[&_.ant-popover-inner]:border dark:[&_.ant-popover-inner]:border-white/10 dark:[&_.ant-popover-inner]:shadow-2xl font-sans" }}
        >
            <button 
                className="p-2 hover:bg-white dark:hover:bg-white/10 rounded-full transition-colors group cursor-pointer" 
                title="Thay đổi kích cỡ chữ"
            >
                <Type className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors" />
            </button>
        </Popover>
    );
};

export default FontSizeToggle;
