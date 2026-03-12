import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation('layout');

    return (
        <footer className="border-t border-border py-6 md:py-0">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    {t('customer.footer.copyright')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
