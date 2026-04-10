import { FormProvider } from 'react-hook-form';

import ContactInput from './BookingForm/ContactInput';
import DriveTypeSelector from './BookingForm/DriveTypeSelector';
import LocationSelector from './BookingForm/LocationSelector';
import DateTimeSelector from './BookingForm/DateTimeSelector';
import AdditionalInfo from './BookingForm/AdditionalInfo';
import ActionButtons from './BookingForm/ActionButtons';
import RescheduleReasonInput from './BookingForm/RescheduleReasonInput';
import WaitlistNotification from './BookingForm/WaitlistNotification';

const BookingForm = ({ hookState }) => {
    const {
        handleCancel, isLoading, isReschedule, methods, onSubmit, timeSlots, branches, t, car, locationData
    } = hookState;

    return (
        <FormProvider {...methods}>
            <form 
                onSubmit={onSubmit} 
                className="flex-1 p-8 md:p-14 flex flex-col h-full bg-white dark:bg-[#141416] w-full max-w-full overflow-hidden"
            >
                <div className="mb-6 mt-2 shrink-0">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">
                        {isReschedule ? t('booking_title_reschedule', 'Dời Lịch Lái Thử') : t('booking_title', 'Đăng Ký Lái Thử')}
                    </h1>
                    <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400">
                        {isReschedule 
                            ? t('booking_subtitle_reschedule', 'Vui lòng chọn khung giờ mới và điền lý do dời lịch.') 
                            : t('booking_subtitle', 'Để lại thông tin, đội ngũ TT AUTO sẽ liên hệ xác nhận trong 15 phút.')}
                    </p>
                </div>

                {car && !car.isDemoAvailable && (
                    <WaitlistNotification t={t} />
                )}

                <div className="space-y-8 flex-1 overflow-y-auto pr-4 -mr-4 custom-scrollbar">
                    {car?.isDemoAvailable ? (
                        <>
                            <DriveTypeSelector t={t} isDemoAvailable={true} />
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <ContactInput t={t} />
                            </div>
                            
                            <LocationSelector branches={branches} t={t} locationData={locationData} />

                            <DateTimeSelector timeSlots={timeSlots} t={t} />
                            <RescheduleReasonInput t={t} isReschedule={isReschedule} />
                            <AdditionalInfo t={t} />
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <ContactInput t={t} />
                            </div>
                            
                            <LocationSelector branches={branches} t={t} locationData={locationData} />
                            
                            <AdditionalInfo t={t} />
                        </>
                    )}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 shrink-0">
                    <ActionButtons handleCancel={handleCancel} isLoading={isLoading} isValid={methods.formState.isValid} t={t} isDemoAvailable={car?.isDemoAvailable ?? true} />
                </div>
            </form>
        </FormProvider>
    );
};

export default BookingForm;
