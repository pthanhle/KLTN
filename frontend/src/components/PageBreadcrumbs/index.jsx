import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageBreadcrumbs = ({ items }) => {
    return (
        <nav className="flex items-center space-x-1.5 text-sm mb-6" aria-label="Breadcrumb">
            <Link 
                to="/admin/dashboard" 
                className="flex items-center !text-slate-500 hover:!text-yellow-600 dark:!text-slate-400 dark:hover:!text-premium-gold transition-colors"
                title="Home"
            >
                <Home size={16} />
            </Link>
            
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                
                return (
                    <div key={index} className="flex items-center space-x-1.5">
                        <ChevronRight size={14} className="text-slate-400 dark:text-slate-600 mt-0.5" />
                        {isLast || !item.href ? (
                            <span className={`font-semibold ${isLast ? '!text-slate-800 dark:!text-white' : '!text-slate-500 dark:!text-slate-400'}`}>
                                {item.label}
                            </span>
                        ) : (
                            <Link 
                                to={item.href} 
                                className="font-medium !text-slate-500 hover:!text-yellow-600 dark:!text-slate-400 dark:hover:!text-premium-gold transition-colors"
                            >
                                {item.label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default PageBreadcrumbs;
