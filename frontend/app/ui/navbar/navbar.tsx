import NavLinks from '@/app/ui/navbar/nav-links';
import Logo from './logo';
import ThemeSwitch from './themeSwitch';

export default function navbar() {
    return (
        <div className='m-0 overflow-hidden bg-icewhite static top-0 left-0 right-0 shadow-lg mb-10 dark:bg-zinc-800'>
            <div className='text-cyan dark:text-teal-600 m-2 flex'>
                <div className='basis-1/12'>
                    <Logo />
                </div>
                <div className='basis-9/12 flex my-auto'>
                    <NavLinks />
                </div>
                <div className='basis-2/12 my-auto'>
                    <ThemeSwitch />
                </div>
            </div>
        </div>
    );
}