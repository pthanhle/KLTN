import { User } from 'lucide-react';
import SectionWrapper from '../FormElements/SectionWrapper';
import InputField from '../FormElements/InputField';

const ContactSection = ({ control, errors, t }) => {
    return (
        <SectionWrapper icon={User} title={t('preorder_contact_info', 'Thông tin liên hệ')} hasDecoration={true}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField 
                    wrapperClass="md:col-span-2"
                    label={t('preorder_fullname', 'Họ và tên')} 
                    name="fullName" 
                    control={control} 
                    errors={errors} 
                    required 
                />
                <InputField 
                    label={t('preorder_phone', 'Số điện thoại')} 
                    type="tel"
                    name="phoneNumber" 
                    control={control} 
                    errors={errors} 
                    required 
                />
                <InputField 
                    label={t('preorder_email', 'Email')} 
                    type="email"
                    name="email" 
                    control={control} 
                    errors={errors} 
                />
            </div>
        </SectionWrapper>
    );
};

export default ContactSection;
