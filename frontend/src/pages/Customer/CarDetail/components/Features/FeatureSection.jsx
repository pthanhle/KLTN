import { motion } from 'framer-motion';
import { Image } from 'antd';

const FeatureSection = ({ title, features = [], id = "features", align = "left", subtitle }) => {
    // align left = text left, image right
    // align right = text right, image left
    
    return (
        <section id={id} className="py-24 bg-slate-50 dark:bg-[#0a0a0b] overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-[1440px]">
                <div className={`flex flex-col ${align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}>
                    
                    {/* Text Column */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start gap-6">
                        {subtitle && <p className="text-[12px] font-bold text-slate-400 dark:text-slate-500 tracking-[0.2em] uppercase">{subtitle}</p>}
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl lg:text-5xl font-[900] text-slate-900 dark:text-white uppercase leading-[1.1] tracking-tight"
                        >
                            {title}
                        </motion.h2>
                        
                        <div className="flex flex-col gap-10 mt-8">
                            {features.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: align === 'left' ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="border-l-2 border-yellow-500 pl-6"
                                >
                                    <h3 className="text-[18px] font-bold text-slate-900 dark:text-slate-200 mb-3">{item.title}</h3>
                                    <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Image Column */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[48px] overflow-hidden bg-white dark:bg-[#141416] p-4 lg:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] dark:shadow-none border border-slate-100 dark:border-white/5">
                            <Image 
                                src={features[0]?.image || "https://images.unsplash.com/photo-1603584173870-7f80db7d69d8"} 
                                alt={title} 
                                rootClassName="w-full h-full"
                                className="!w-full !h-full object-cover rounded-[32px]"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
