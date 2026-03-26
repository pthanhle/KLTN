import React from "react";
import BrandLogo from "@/assets/images/brand/logo.png";

const maskStyle = {
    WebkitMaskImage: `url(${BrandLogo})`,
    WebkitMaskSize: 'contain',
    WebkitMaskPosition: 'center',
    WebkitMaskRepeat: 'no-repeat',
    maskImage: `url(${BrandLogo})`,
    maskSize: 'contain',
    maskPosition: 'center',
    maskRepeat: 'no-repeat',
};

const AmbientBackground = () => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/15 dark:bg-yellow-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
);

const SkeletonLogo = () => (
    <div 
        className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20 bg-slate-900 dark:bg-white transition-colors pointer-events-none" 
        style={maskStyle}
    ></div>
);

const LiquidFillLogo = () => (
    <div 
        className="absolute inset-0 w-full h-full animate-logo-fill drop-shadow-[0_0_30px_rgba(234,179,8,0.6)] dark:drop-shadow-[0_0_50px_rgba(234,179,8,0.5)] bg-gradient-to-b from-yellow-400 to-yellow-600 pointer-events-none" 
        style={maskStyle}
    ></div>
);

export function PageLoader() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#fcfcfc] dark:bg-[#0a0a0b] fixed inset-0 z-[99999] transition-colors duration-300">
            <style>{`
                @keyframes fill-up-logo {
                    0% {
                        clip-path: inset(100% 0 0 0);
                        filter: brightness(0.5);
                    }
                    80% {
                        clip-path: inset(0 0 0 0);
                        filter: brightness(1.2);
                    }
                    100% {
                        clip-path: inset(0 0 0 0);
                        filter: brightness(1.2);
                    }
                }
                .animate-logo-fill {
                    animation: fill-up-logo 2.5s ease-in-out infinite;
                }
            `}</style>
            <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px]">
                <AmbientBackground />
                <SkeletonLogo />
                <LiquidFillLogo />
            </div>
        </div>
    );
}
