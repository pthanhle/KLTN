import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { usePartDetailLogic } from './hooks/usePartDetailLogic';
import PartGallery from './components/Gallery/PartGallery';
import PartInfoActions from './components/ProductInfo/PartInfoActions';
import PartTabsSection from './components/Tabs/PartTabsSection';

const PartDetail = () => {
    const { id } = useParams();
    const logic = usePartDetailLogic(id);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn text-slate-900 dark:text-slate-100">
            {logic.part && (
                <Helmet>
                    <title>{logic.part.seo_title || `${logic.part.name} - TT AUTO`}</title>
                    <meta name="description" content={logic.part.seo_description || logic.part.short_description || `Chi tiết phụ tùng ${logic.part.name} chính hãng tại TT AUTO`} />
                </Helmet>
            )}
            <nav aria-label="Breadcrumb" className="flex text-[13px] font-bold mb-8">
                <ol className="flex items-center space-x-2">
                    <li><Link to="/" className="!text-slate-900 dark:!text-white hover:!text-yellow-500 transition-colors">{logic.t('nav_home', 'Trang chủ')}</Link></li>
                    <li className="text-slate-400 font-normal"><ChevronRight className="w-4 h-4" /></li>
                    <li><Link to="/parts" className="!text-slate-900 dark:!text-white hover:!text-yellow-500 transition-colors">{logic.t('nav_parts', 'Linh kiện')}</Link></li>
                    <li className="text-slate-400 font-normal"><ChevronRight className="w-4 h-4" /></li>
                    <li className="text-yellow-500 font-bold">{logic.part?.name || <Skeleton className="w-24 h-4 inline-block align-middle ml-2" />}</li>
                </ol>
            </nav>

            {logic.isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 animate-pulse">
                    {/* Gallery Skeleton */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        <Skeleton className="w-full h-[300px] md:h-[450px] lg:h-[500px] rounded-[32px]" />
                        <div className="flex gap-4 overflow-hidden">
                            {[1, 2, 3, 4].map(idx => (
                                <Skeleton key={idx} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex-shrink-0" />
                            ))}
                        </div>
                    </div>
                    {/* Info Skeleton */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <Skeleton className="w-24 h-6 rounded-full" />
                        <Skeleton className="w-full h-12" />
                        <Skeleton className="w-3/4 h-12" />
                        <div className="flex items-center gap-4 mt-2">
                            <Skeleton className="w-32 h-6" />
                            <Skeleton className="w-24 h-6" />
                        </div>
                        <Skeleton className="w-full h-24 mt-4" />
                        <Skeleton className="w-full h-16 mt-6 rounded-2xl" />
                        <Skeleton className="w-full h-16 rounded-2xl" />
                    </div>
                </div>
            ) : !logic.part ? (
                <div className="min-h-[50vh] flex flex-col items-center justify-center text-slate-900 dark:text-white gap-4">
                     <p className="text-xl font-bold">{logic.t('part_not_found', 'Không tìm thấy linh kiện.')}</p>
                     <Link to="/parts" className="text-yellow-500 hover:text-yellow-600 font-bold hover:underline underline-offset-4 decoration-2">
                         {logic.t('back_to_parts', 'Quay lại danh sách')}
                     </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                    <PartGallery images={logic.part.images} variantImageUrl={logic.variantImageUrl} t={logic.t} />
                    <PartInfoActions {...logic} />
                </div>
            )}

            {!logic.isLoading && logic.part && <PartTabsSection {...logic} />}
        </main>
    );
};

export default PartDetail;
