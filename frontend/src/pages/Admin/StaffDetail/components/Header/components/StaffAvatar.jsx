import React from 'react';
import { Image } from 'antd';

const StaffAvatar = ({ avatarUrl, fullName, status }) => {
    return (
        <div className="relative shrink-0">
            {avatarUrl ? (
                <Image 
                    src={avatarUrl} 
                    alt={fullName} 
                    className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover shadow-xl"
                    preview={{ maskClassName: "rounded-full" }}
                    rootClassName="border-4 border-white dark:border-[#141416] rounded-full transition-colors"
                />
            ) : (
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-4 border-white dark:border-[#141416] shadow-xl text-3xl font-bold text-slate-400 transition-colors">
                    {fullName.charAt(0)}
                </div>
            )}
            <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white dark:border-[#141416] shadow-md transition-colors ${status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}`}></div>
        </div>
    );
};

export default StaffAvatar;
