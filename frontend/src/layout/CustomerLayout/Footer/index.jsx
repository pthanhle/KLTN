import { useTranslation } from 'react-i18next';
import { Image } from 'antd';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Facebook, Instagram, Twitter } from '@thesvg/react';
import { Link } from 'react-router-dom';
import BrandLogo from '@/assets/images/brand/logo.png';

const Footer = () => {
    const { t } = useTranslation('layout');

    return (
        <footer className="bg-white dark:bg-[#0b0f19] border-t border-slate-200 dark:border-white/5 pt-16 pb-8 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-[1280px]">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
                    
                    {/* Brand Section */}
                    <div className="flex flex-col space-y-6">
                        <Link to="/" className="flex items-center gap-3 group w-max hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 flex items-center justify-center">
                                <Image preview={false} src={BrandLogo} alt="TT AUTO Logo" className="!w-full !h-full object-contain [filter:drop-shadow(0_4px_8px_rgba(0,0,0,0.08))] dark:[filter:drop-shadow(0_0_2px_rgba(255,255,255,0.6))_drop-shadow(0_0_12px_rgba(255,255,255,0.15))] transition-all duration-300" rootClassName="flex items-center justify-center w-full h-full" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-extrabold text-xl leading-none tracking-wide text-slate-900 dark:text-white uppercase">TT AUTO</span>
                                <span className="text-[10px] font-bold text-yellow-500 tracking-[0.2em] uppercase mt-1">Premium Garage</span>
                            </div>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium mb-6">
                            {t('customer.footer.aboutText')}
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center hover:bg-[#1877F2]/10 transition-all cursor-pointer group">
                                <Facebook width={16} height={16} fill="#1877F2" className="fill-[#1877F2] opacity-90 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center hover:bg-pink-500/10 transition-all cursor-pointer group">
                                <Instagram width={16} height={16} className="opacity-90 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center hover:bg-[#1DA1F2]/10 transition-all cursor-pointer group">
                                <Twitter width={16} height={16} fill="#1DA1F2" className="fill-[#1DA1F2] opacity-90 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>

                    {/* Discovery Links */}
                    <div className="flex flex-col">
                        <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-wider">{t('customer.footer.discovery.title')}</h4>
                        <ul className="flex flex-col space-y-3 text-sm font-medium">
                            <li><Link to="#" className="!text-slate-500 dark:!text-slate-400 hover:!text-yellow-600 dark:hover:!text-yellow-500 transition-colors">{t('customer.footer.discovery.sedan')}</Link></li>
                            <li><Link to="#" className="!text-slate-500 dark:!text-slate-400 hover:!text-yellow-600 dark:hover:!text-yellow-500 transition-colors">{t('customer.footer.discovery.suv')}</Link></li>
                            <li><Link to="#" className="!text-slate-500 dark:!text-slate-400 hover:!text-yellow-600 dark:hover:!text-yellow-500 transition-colors">{t('customer.footer.discovery.sport')}</Link></li>
                            <li><Link to="#" className="!text-slate-500 dark:!text-slate-400 hover:!text-yellow-600 dark:hover:!text-yellow-500 transition-colors">{t('customer.footer.discovery.testDrive')}</Link></li>
                            <li><Link to="#" className="!text-slate-500 dark:!text-slate-400 hover:!text-yellow-600 dark:hover:!text-yellow-500 transition-colors">{t('customer.footer.discovery.used')}</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="flex flex-col">
                        <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-wider">{t('customer.footer.support.title')}</h4>
                        <ul className="flex flex-col space-y-3 text-sm font-medium">
                            <li><Link to="#" className="!text-slate-500 dark:!text-slate-400 hover:!text-yellow-600 dark:hover:!text-yellow-500 transition-colors">{t('customer.footer.support.booking')}</Link></li>
                            <li><Link to="#" className="!text-slate-500 dark:!text-slate-400 hover:!text-yellow-600 dark:hover:!text-yellow-500 transition-colors">{t('customer.footer.support.serviceCenter')}</Link></li>
                            <li><Link to="#" className="!text-slate-500 dark:!text-slate-400 hover:!text-yellow-600 dark:hover:!text-yellow-500 transition-colors">{t('customer.footer.support.parts')}</Link></li>
                            <li><Link to="#" className="!text-slate-500 dark:!text-slate-400 hover:!text-yellow-600 dark:hover:!text-yellow-500 transition-colors">{t('customer.footer.support.care')}</Link></li>
                            <li><Link to="#" className="!text-slate-500 dark:!text-slate-400 hover:!text-yellow-600 dark:hover:!text-yellow-500 transition-colors">{t('customer.footer.support.warranty')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col">
                        <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-wider">{t('customer.footer.contact.title')}</h4>
                        <ul className="flex flex-col space-y-4 text-sm font-medium">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
                                <span className="!text-slate-500 dark:!text-slate-400">{t('customer.footer.contact.address')}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-yellow-600 dark:text-yellow-500 shrink-0" />
                                <span className="!text-slate-500 dark:!text-slate-400">+84 1900 1234</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-yellow-600 dark:text-yellow-500 shrink-0" />
                                <span className="!text-slate-500 dark:!text-slate-400">contact@ttauto.vn</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Copyright */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-200 dark:border-white/10 gap-4">
                    <p className="text-xs !text-slate-500 dark:!text-slate-500 font-medium">
                        {t('customer.footer.copyright')}
                    </p>
                    <div className="flex items-center gap-6 text-xs font-medium border-0">
                        <Link to="#" className="!text-slate-500 dark:!text-slate-500 hover:!text-slate-900 dark:hover:!text-white transition-colors">{t('customer.footer.legal.terms')}</Link>
                        <Link to="#" className="!text-slate-500 dark:!text-slate-500 hover:!text-slate-900 dark:hover:!text-white transition-colors">{t('customer.footer.legal.privacy')}</Link>
                        <Link to="#" className="!text-slate-500 dark:!text-slate-500 hover:!text-slate-900 dark:hover:!text-white transition-colors">{t('customer.footer.legal.sitemap')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
