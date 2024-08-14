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
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'm-2 inline flex w-fit items-center justify-center gap-2 p-3 text-sm font-medium hover:text-cyan-dark md:flex-none md:justify-start md:p-2 md:px-3 inline-block uppercase',
                            {
                                'text-m  underline underline-offset-4 decoration-2 font-bold': pathname === link.href,
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