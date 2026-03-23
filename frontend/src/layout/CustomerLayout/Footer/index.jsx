import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, CarFront } from 'lucide-react';
import { Facebook, Instagram, Twitter } from '@thesvg/react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { t } = useTranslation('layout');

    return (
        <footer className="bg-slate-50 dark:bg-[#060608] pt-20 pb-10 border-t border-slate-200 dark:border-white/5 transition-colors duration-300 w-full font-sans">
            <div className="container mx-auto px-6 lg:px-10">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    
                    {/* Brand Info */}
                    <div className="flex flex-col pr-4">
                        <Link to="/" className="flex items-center gap-2 mb-6 w-max group">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-lg bg-yellow-500 shadow-yellow-500/20 transition-all duration-300 group-hover:scale-105">
                                <CarFront className="text-slate-900 w-6 h-6 stroke-[2.5]" />
                            </div>
                            <div className="flex flex-col ml-1">
                                <span className="text-xl font-black tracking-tighter uppercase italic leading-none text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">TT AUTO</span>
                                <span className="text-[9px] tracking-[0.2em] text-yellow-600 dark:text-yellow-500 lg:text-yellow-500/80 font-bold uppercase mt-1 leading-none">Premium Services</span>
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
