'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { name: "Home", href: "/"},
    { name: "Books", href: "/books" },
    { name: "Authors", href: "/authors" },
    { name: "Genres", href: "/genres" },
];

export default function navLinks() {
    var pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                var active;
                if (pathname !== '/') {
                    pathname = pathname.slice(pathname.indexOf('/') + 1);
                    pathname = pathname.slice(0, pathname.indexOf('/'));

                    link.href.includes(pathname) ? active = true : active = false;
                } else {
                    link.href == '/' ? active = true : active = false;
                }
                
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'm-2 inline flex w-fit items-center justify-center gap-2 p-3 text-sm font-medium hover:text-cyan-dark dark:hover:text-teal-700 md:flex-none md:justify-start md:p-2 md:px-3 inline-block uppercase',
                            {
                                'text-m  underline underline-offset-4 decoration-2 font-bold': active,
                            },
                        )}
                    >
                        <p className='hidden md:block'>{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}