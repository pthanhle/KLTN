import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { QUICK_ACTIONS } from '../../constants/dashboard.constants';

export const QuickActionsWidget = () => {
    const { t } = useTranslation('adminDashboard');

    return (
        <div className="grid grid-cols-2 gap-4 content-start h-full">
            {QUICK_ACTIONS.map((action) => {
                const IconComponent = action.icon;
                return (
                    <Link
                        key={action.id}
                        to={action.link}
                        className="bg-white dark:bg-[#141416] border border-slate-200/60 dark:border-white/5 p-5 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer no-underline flex flex-col items-center gap-3"
                    >
                        <div className={`${action.iconBg} p-3.5 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent size={22} strokeWidth={2.5} className={action.iconColor} />
                        </div>
                        <span className="font-semibold text-sm text-slate-700 dark:text-slate-200 text-center">
                            {t(action.label)}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
};
