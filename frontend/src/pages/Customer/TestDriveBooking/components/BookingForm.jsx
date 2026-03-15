import { FormProvider } from 'react-hook-form';
import ContactInput from './BookingForm/ContactInput';
import DriveTypeSelector from './BookingForm/DriveTypeSelector';
import LocationSelector from './BookingForm/LocationSelector';
import DateTimeSelector from './BookingForm/DateTimeSelector';
import AdditionalInfo from './BookingForm/AdditionalInfo';
import ActionButtons from './BookingForm/ActionButtons';

const BookingForm = ({ hookState }) => {
    const {
        handleCancel, isLoading, methods, onSubmit, timeSlots, branches, t
    } = hookState;

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit} className="flex-1 p-8 md:p-14 flex flex-col h-full bg-white dark:bg-[#141416]">
                <div className="mb-10 mt-2">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">{t('booking_title', 'Đăng Ký Lái Thử')}</h1>
                    <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400">{t('booking_subtitle', 'Để lại thông tin, đội ngũ TT AUTO sẽ liên hệ xác nhận trong 15 phút.')}</p>
                </div>

                <div className="space-y-8 flex-1">
                    <DriveTypeSelector t={t} />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ContactInput t={t} />
                        <LocationSelector branches={branches} t={t} />
                    </div>

                    <DateTimeSelector timeSlots={timeSlots} t={t} />
                    <AdditionalInfo t={t} />
                </div>

                <ActionButtons handleCancel={handleCancel} isLoading={isLoading} isValid={methods.formState.isValid} t={t} />
            </form>
        </FormProvider>
    );
};

export default BookingForm;
