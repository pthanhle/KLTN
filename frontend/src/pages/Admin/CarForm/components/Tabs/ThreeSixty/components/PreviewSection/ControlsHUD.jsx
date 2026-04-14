import React from 'react';
import { ZoomIn, Maximize, Video } from 'lucide-react';

const ControlsHUD = () => {
    return (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
            <button type="button" className="w-12 h-12 rounded-full backdrop-blur-xl bg-white/40 dark:bg-black/40 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white hover:bg-yellow-500 hover:text-slate-900 hover:border-transparent transition-all pointer-events-auto">
                <ZoomIn className="w-5 h-5" />
            </button>
            <button type="button" className="w-12 h-12 rounded-full backdrop-blur-xl bg-white/40 dark:bg-black/40 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white hover:bg-yellow-500 hover:text-slate-900 hover:border-transparent transition-all pointer-events-auto">
                <Maximize className="w-5 h-5" />
            </button>
            <button type="button" className="w-12 h-12 rounded-full backdrop-blur-xl bg-white/40 dark:bg-black/40 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white hover:bg-yellow-500 hover:text-slate-900 hover:border-transparent transition-all pointer-events-auto">
                <Video className="w-5 h-5" />
            </button>
        </div>
    );
};

export default ControlsHUD;
