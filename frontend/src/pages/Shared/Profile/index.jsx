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
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
    // Detect if current route is admin or customer
    const location = useLocation();
    const isCustomerRoute = !location.pathname.startsWith('/admin');
    
    const {
        t,
        isLoading,
        profile,
        isEditing,
        formData,
        methods,
        handleEditToggle,
        handleFormChange,
        handleSave,
        isPasswordModalOpen,
        setIsPasswordModalOpen,
    } = useProfileLogic(isCustomerRoute ? 'customer' : 'admin');

    return (
        <div className="bg-[#fcfcfc] dark:bg-[#0a0a0b] min-h-screen transition-colors duration-300">
            {/* Added container padding depending on role since customer layout has fixed top header */}
            <div className={`container mx-auto px-4 md:px-6 lg:px-10 max-w-[1280px] ${isCustomerRoute ? 'pt-24' : 'pt-8'} pb-12`}>
                
                {isLoading ? (
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-pulse">
                        <div className="w-full lg:w-[320px] xl:w-[340px] flex-shrink-0 bg-white dark:bg-[#141416] rounded-[32px] p-8 h-[500px] border border-slate-100 dark:border-white/5 shadow-sm"></div>
                        <div className="flex-1 bg-white dark:bg-[#141416] rounded-[32px] p-8 h-[600px] border border-slate-100 dark:border-white/5 shadow-sm"></div>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                        {/* Sidebar (Left Column) */}
                        <aside className="w-full lg:w-[320px] xl:w-[340px] flex-shrink-0">
                            <div className="sticky top-28 bg-white dark:bg-[#0b0f19] p-8 md:p-10 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
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
                            ) : (
                                <>
                                    <ProfileForm 
                                        profile={profile} 
                                        isEditing={isEditing} 
                                        methods={methods}
                                        handleSave={handleSave} 
                                        handleEditToggle={handleEditToggle} 
                                        t={t} 
                                    />

                                    {/* Show Employee Info only for Admin/Staff */}
                                    {profile.employeeInfo && (
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
