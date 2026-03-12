import BackButton from './components/BackButton';

const AuthLayout = ({ 
    children, 
    title, 
    subtitle, 
    icon, 
    bgImage = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop',
    overlayClass = 'bg-slate-950/80',
    cardClass = 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl max-w-md',
    iconClass = 'bg-blue-600 shadow-blue-500/20 text-white'
}) => {
    return (
        <div className="min-h-screen w-full relative flex items-center justify-center font-sans overflow-hidden py-10">
            {/* Background Layer */}
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className={`absolute inset-0 backdrop-blur-[2px] ${overlayClass}`}></div>
            </div>

            {/* Back to Home Button Micro Component */}
            <BackButton />

            {/* Glassmorphism Card */}
            <div className={`relative z-10 w-full px-6 py-10 sm:mx-0 mx-4 ${cardClass}`}>
                
                {/* Header Section */}
                {title && (
                    <div className="flex flex-col items-center justify-center mb-10 text-white">
                        {icon && (
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg ${iconClass}`}>
                                {icon}
                            </div>
                        )}
                        <h1 className="text-2xl font-bold tracking-wide text-center">
                            {title}
                        </h1>
                        {subtitle && typeof subtitle === 'string' ? (
                            <p className="text-sm text-slate-400 mt-2 text-center px-4 leading-relaxed">
                                {subtitle}
                            </p>
                        ) : (
                            subtitle
                        )}
                    </div>
                )}

                {/* Main Content */}
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
