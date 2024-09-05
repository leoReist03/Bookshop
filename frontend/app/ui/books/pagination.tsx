'use client'

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/app/lib/utils";


export default function Pagiantion({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const allPages = generatePagination(currentPage, totalPages);

    return (
        <>
            <div className="w-1/2 mx-auto h-fit text-cyan rounded-lg flex text-lg bg-cyan rounded-lg">
                <div className="">
                    <PaginationArrow
                        direction="left"
                        href={createPageURL(currentPage - 1)}
                        isDisabled={currentPage <= 1}
                    />
                </div>

                <div className="flex -space-x-px mx-auto">
                    {allPages.map((page, index) => {
                        let position: 'first' | 'last' | 'single' | 'middle' | undefined;

                        if (index === 0) position = 'first';
                        if (index === allPages.length - 1) position = 'last';
                        if (allPages.length === 1) position = 'single';
                        if (page === '...') position = 'middle';

                        return (
                            <PaginationNumber
                            key={page}
                            href={createPageURL(page)}
                            page={page}
                            position={position}
                            isActive={currentPage === page}
                            />
                        );
                    })}
                </div>

                <div className="col-start-3">
                    <PaginationArrow
                    direction="right"
                    href={createPageURL(currentPage + 1)}
                    isDisabled={currentPage >= totalPages}
                    />
                </div>
            </div>
        </>
    )
}

function PaginationNumber({
    page,
    href,
    isActive,
    position,
}: {
    page: number | string;
    href: string;
    position?: 'first' | 'last' | 'middle' | 'single';
    isActive: boolean;
}) {
    const className = clsx(
        'flex w-10 items-center justify-center text-gray-100',
        {
        'z-10 border-blue-600': isActive,
        'hover:bg-gray-100': !isActive && position !== 'middle',
        'text-gray-300': position === 'middle',
        },
    );
  
    return isActive || position === 'middle' ? (
      <div className={className}>{page}</div>
    ) : (
      <Link href={href} className={className}>
        {page}
      </Link>
    );
}

function PaginationArrow({
    href,
    direction,
    isDisabled,
}: {
    href: string;
    direction: 'left' | 'right';
    isDisabled?: boolean;
}) {
    const className = clsx(
        'w-fit m-full',
        {
            'pointer-events-none text-gray-300': isDisabled,
            'hover:bg-gray-100': !isDisabled,
            'ml-3': direction === 'left',
            'mr-3': direction === 'right',
        },
    );

    const icon =
    direction === 'left' ? (
        <ArrowLeftIcon className="w-4 h-8" />
    ) : (
        <ArrowRightIcon className="w-4 h-8" />
    );

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link className={className} href={href}>
        {icon}
        </Link>
    );
}