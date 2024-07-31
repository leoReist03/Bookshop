import NavLinks from '@/app/ui/navbar/nav-links';
import Logo from './logo';

export default function navbar() {
    return (
        <div className='m-0 overflow-hidden bg-icewhite static top-0 left-0 right-0 shadow-lg mb-10'>
            <div className='text-cyan m-2 flex'>
                <Logo />
                <div className='h-10 flex my-auto'>
                    <NavLinks />
                </div>
            </div>
        </div>
    );
}