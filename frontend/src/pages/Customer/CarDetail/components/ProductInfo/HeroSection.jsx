import { motion } from 'framer-motion';
import { Image } from 'antd';

const HeroSection = ({ car, t }) => {
    return (
        <div className="relative w-full h-[80vh] min-h-[600px] xl:h-screen flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Background Image / Render */}
            <motion.div 
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <Image 
                    src={car.image} 
                    alt={car.name} 
                    preview={false}
                    rootClassName="w-full h-full absolute inset-0"
                    className="!w-full !h-full object-cover object-center"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </motion.div>

            {/* Typography */}
            <div className="relative z-10 text-center flex flex-col items-center mt-32 px-4">
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-[14px] font-bold text-yellow-500 tracking-[0.3em] uppercase mb-4"
                >
                    TT AUTO EXCLUSIVE
                </motion.p>
                <motion.h1 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-[900] text-white tracking-tighter uppercase leading-[0.9]"
                >
                    {car.name}
                </motion.h1>
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="text-[18px] md:text-[22px] font-medium text-slate-300 mt-6 tracking-wide"
                >
                    {car.tagline}
                </motion.p>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] font-bold text-white uppercase tracking-widest opacity-60">Khám Phá</span>
                <motion.div 
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-[1px] h-10 bg-white/50"
                ></motion.div>
            </motion.div>
        </div>
    );
};

export default HeroSection;
