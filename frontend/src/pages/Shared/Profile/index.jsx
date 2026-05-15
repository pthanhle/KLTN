import { useProfileLogic } from './hooks/useProfileLogic';
import ProfileSidebar from './components/ProfileSidebar';
import ProfileForm from './components/ProfileForm';
import EmployeeInfo from './components/EmployeeInfo';
import ChangePasswordModal from './components/ChangePasswordModal';
import OrderHistory from './pages/OrderHistory/index.jsx';
import OrderDetail from './pages/OrderDetail/index.jsx';
import ServiceHistory from './pages/ServiceHistory/index.jsx';
import ServiceQuotation from './pages/ServiceQuotation/index.jsx';
import TestDriveHistory from './pages/TestDriveHistory/index.jsx';
import ProfileNotifications from './pages/Notifications/index.jsx';
import LoyaltyWallet from './pages/LoyaltyWallet/index.jsx';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
    const location = useLocation();
    const isCustomerRoute = !location.pathname.startsWith('/admin');

    const {
        t,
        isLoading,
        profile,
        isEditing,
        methods,
        provinces, districts, wards,
        handleEditToggle,
        handleSave,
        isPasswordModalOpen,
        setIsPasswordModalOpen,
    } = useProfileLogic(isCustomerRoute ? 'customer' : 'admin');

    return (
        <div className="bg-[#fcfcfc] dark:bg-[#0a0a0b] min-h-screen transition-colors duration-300">
            <div className={`container mx-auto px-4 md:px-6 lg:px-10 max-w-[1280px] ${isCustomerRoute ? 'pt-24' : 'pt-8'} pb-12`}>

                {isLoading || !profile ? (
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-pulse">
                        <div className="w-full lg:w-[320px] xl:w-[340px] flex-shrink-0 bg-white dark:bg-[#141416] rounded-[32px] p-8 h-[500px] border border-slate-100 dark:border-white/5 shadow-sm"></div>
                        <div className="flex-1 bg-white dark:bg-[#141416] rounded-[32px] p-8 h-[600px] border border-slate-100 dark:border-white/5 shadow-sm"></div>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                        <aside className="w-full lg:w-[320px] xl:w-[340px] flex-shrink-0">
                            <div className="sticky top-28 bg-white dark:bg-[#141416] p-8 md:p-10 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                                <ProfileSidebar
                                    profile={profile}
                                    t={t}
                                    setIsPasswordModalOpen={setIsPasswordModalOpen}
                                />
                            </div>
                        </aside>

                        <main className="flex-1 min-w-0 w-full">
                            {location.pathname === '/profile/orders' ? (
                                <OrderHistory />
                            ) : location.pathname.startsWith('/profile/orders/') ? (
                                <OrderDetail />
                            ) : location.pathname.startsWith('/profile/services/') ? (
                                <ServiceQuotation />
                            ) : location.pathname === '/profile/services' ? (
                                <ServiceHistory />
                            ) : location.pathname === '/profile/test-drives' ? (
                                <TestDriveHistory />
                            ) : location.pathname === '/profile/notifications' ? (
                                <ProfileNotifications />
                            ) : location.pathname === '/profile/loyalty' ? (
                                <LoyaltyWallet />
                            ) : (
                                <>
                                    <ProfileForm
                                        profile={profile}
                                        isEditing={isEditing}
                                        methods={methods}
                                        provinces={provinces}
                                        districts={districts}
                                        wards={wards}
                                        handleSave={handleSave}
                                        handleEditToggle={handleEditToggle}
                                        t={t}
                                    />

                                    {profile?.employeeInfo && (
                                        <EmployeeInfo employeeInfo={profile.employeeInfo} t={t} />
                                    )}
                                </>
                            )}
                        </main>
                    </div>
                )}

                <ChangePasswordModal
                    isOpen={isPasswordModalOpen}
                    onClose={() => setIsPasswordModalOpen(false)}
                    t={t}
                />
            </div>
        </div>
    );
};

export default ProfilePage;
