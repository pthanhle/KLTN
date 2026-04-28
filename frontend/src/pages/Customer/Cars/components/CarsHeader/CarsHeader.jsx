import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CarsHeader = ({ title, brandNameParam, t }) => {
    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-[1440px] pt-24 pb-12">
            <div className="flex items-center gap-2 text-[13px] font-bold text-slate-900 dark:text-white mb-6">
                <Link to="/" className="!text-slate-900 dark:!text-white hover:!text-yellow-500 transition-colors">
                    {t('layout:customer.header.home', 'Trang chủ')}
                </Link>
                <ChevronRight size={14} className="text-slate-400" />
                {!brandNameParam ? (
                    <span className="text-yellow-500 font-bold">{t('layout:customer.header.products', 'Sản phẩm')}</span>
                ) : (
                    <Link to="/cars" className="!text-slate-900 dark:!text-white hover:!text-yellow-500 transition-colors">
                        {t('layout:customer.header.products', 'Sản phẩm')}
                    </Link>
                )}
                {brandNameParam && (
                    <>
                        <ChevronRight size={14} className="text-slate-400" />
                        <span className="text-yellow-500 font-bold capitalize">{brandNameParam.replace('-', ' ')}</span>
                    </>
                )}
            </div>

            <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-[900] tracking-tight text-slate-900 dark:text-white capitalize mb-4">
                    {title}
                </h1>
                <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                    {t('cars.description', 'Khám phá bộ sưu tập xe đẳng cấp.')}
                </p>
            </div>
        </div>
    );
};

export default CarsHeader;
