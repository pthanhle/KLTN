import React from 'react';

const TextBlock = ({ block }) => {
    return (
        <div className="w-full rounded-[2.5rem] p-10 lg:p-16 border mx-auto bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-white/5 shadow-sm">
            <div className="max-w-4xl mx-auto text-center space-y-6">
                {block.title && <h4 className="text-3xl font-bold text-slate-900 dark:text-white">{block.title}</h4>}
                {block.content && <p className="text-lg leading-loose text-justify text-slate-600 dark:text-slate-300">{block.content}</p>}
            </div>
        </div>
    );
};

export default TextBlock;
