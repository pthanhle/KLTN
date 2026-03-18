import { Image } from 'antd';

const ServiceGallery = ({ attachments, t }) => {
    if (!attachments || (attachments.before.length === 0 && attachments.after.length === 0)) return null;

    return (
        <div className="mb-10">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white border-l-4 border-yellow-500 pl-3 mb-4">
                {t('service_lbl_images', 'Hình ảnh hiện trạng')}
            </h4>
            <div className="flex flex-wrap gap-4">
                {/* Before Images */}
                {attachments.before.map((url, i) => (
                    <div key={`before-${i}`} className="relative group">
                        <Image 
                            src={url} 
                            width={80} 
                            height={80} 
                            className="object-cover rounded-xl"
                            rootClassName="border border-slate-200 dark:border-white/10 overflow-hidden"
                        />
                        <span className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase pointer-events-none">
                            {t('service_img_before', 'Trước')}
                        </span>
                    </div>
                ))}
                {/* After Images */}
                {attachments.after.map((url, i) => (
                    <div key={`after-${i}`} className="relative group">
                        <Image 
                            src={url} 
                            width={80} 
                            height={80} 
                            className="object-cover rounded-xl"
                            rootClassName="border border-slate-200 dark:border-white/10 overflow-hidden"
                        />
                        <span className="absolute bottom-1 left-1 bg-green-500/80 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase pointer-events-none">
                            {t('service_img_after', 'Sau')}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceGallery;
