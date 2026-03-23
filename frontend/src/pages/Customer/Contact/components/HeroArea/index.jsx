import { Image } from 'antd';

const ContactHero = ({ t }) => {
    return (
        <section className="relative h-[650px] md:h-[716px] w-full overflow-hidden flex items-end pb-32 md:pb-48 px-8 mt-[-90px]">
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRklS6dfnYK0bcuAMnyPSYoYMyOvEUNAvQZKvoyn4m9q2x-L8br-IL0oF89ZdfZIbVtzixcswRDGHRxWGkNQeaK5fmkzeO1Tg1NwkbhXcbHbRqotbzBG2pA3jpds8P4ogcrPKGYawxw93VJ9xdm3tAzIAnZnCb1ddNH436-oflqgTzLuKaJnzhdv5grwQLQVxfEQ5btOFhDZF8gfA7vBjNuG-aR82ivl-qS8xDlA1ycsN6PqSnF2z9GcWci9OKqd8t9TGJSZYHhi0"
                    alt="Luxury dark sports car parked in a modern minimalist garage"
                    preview={false}
                    className="w-full h-full object-cover grayscale-[20%] brightness-[0.4] scale-105 select-none"
                    wrapperClassName="w-full h-full absolute inset-0 block"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    wrapperStyle={{ width: '100%', height: '100%', display: 'block' }}
                    placeholder={<div className="w-full h-full bg-slate-900 animate-pulse" />}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0c1324]/20 to-[#f8fafc] dark:from-[#060608]/40 dark:to-[#0c1324] pointer-events-none"></div>
            </div>
            <div className="relative z-10 max-w-screen-2xl mx-auto w-full text-center">
                <p className="text-sm tracking-[0.2em] font-bold text-yellow-500 mb-4 uppercase animate-in fade-in slide-in-from-bottom-4 duration-700 select-none">
                    {t('hero_subtitle')}
                </p>
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-none max-w-4xl mx-auto text-slate-900 dark:text-white animate-in zoom-in-95 fade-in duration-1000 delay-150 whitespace-pre-line drop-shadow-xl select-none">
                    {t('hero_title')}
                </h1>
            </div>
        </section>
    );
};

export default ContactHero;
