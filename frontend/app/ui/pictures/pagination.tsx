import clsx from "clsx";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { generatePagination } from "@/app/lib/utils";
import React, { useEffect, useState } from "react";

interface PaginationProps {
    currentPage: number,
    totalPages: number,
    onPageChange: (value: number) => void,
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const [current_page, setCurrentPage] = useState(currentPage);
    const allPages = generatePagination(currentPage, totalPages);

    //Send the current page value upwards on change
    useEffect(() => {
        onPageChange(current_page);
    }, [current_page])

    const handlePageChange = (value: string) => {
        if (!value.startsWith('+') && !value.startsWith('-')) {
            setCurrentPage(Number(value))
        } else {
            setCurrentPage(current_page + Number(value));
        }
    }

    return (
        <>
            <div className="w-1/2 mx-auto h-fit rounded-lg flex text-lg bg-button dark:bg-button-dark rounded-lg">
                <div className="basis-2/12 flex">
                    <PaginationArrow
                        direction="left"
                        isDisabled={currentPage <= 1}
                        handlePageChange={handlePageChange}
                    />
                </div>

                <div className="flex -space-x-px mx-auto basis-8/12 justify-center">
                    {allPages.map((page, index) => {
                        let position: 'first' | 'last' | 'single' | 'middle' | undefined;

                        if (index === 0) position = 'first';
                        if (index === allPages.length - 1) position = 'last';
                        if (allPages.length === 1) position = 'single';
                        if (page === '...') position = 'middle';

                        return (
                            <PaginationNumber
                            key={page}
                            page={page}
                            position={position}
                            isActive={currentPage === page}
                            handlePageChange={handlePageChange}
                            />
                        );
                    })}
                </div>

                <div className="col-start-3 basis-2/12 flex justify-center">
                    <PaginationArrow
                        direction="right"
                        isDisabled={currentPage >= totalPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    )
}

function PaginationNumber({
    page,
    isActive,
    position,
    handlePageChange
    }: {
    page: string | number;
    position?: 'first' | 'last' | 'middle' | 'single';
    isActive: boolean;
    handlePageChange: (value: string) => void;
    }) {

    //Send the new page value upwards
    function setPage() {
        handlePageChange(String(page))
    }

    //Prepare Styling for component
    const className = clsx(
        'flex w-10 items-center justify-center text-color-contrast dark:text-color-contrast-dark',
        {
        'z-10 border-blue-600': isActive,
        'hover:bg-button-hover dark:hover:bg-button-hover-dark': !isActive && position !== 'middle',
        'text-color': position === 'middle',
        },
    );

    //Return the component after checking if it is active or in the middle
    return isActive || position === 'middle' ? (
        <div className={className}>{page}</div>
    ) : (
        <div className={className} onClick={setPage}>{page}</div>
    );
}

function PaginationArrow({
    direction,
    isDisabled,
    handlePageChange,
    }: {
    direction: 'left' | 'right';
    isDisabled?: boolean;
    handlePageChange: (value: string) => void;
    }) {

    //Send the new page value upwards
    function setPage() {
        handlePageChange(direction === 'left' ? '-1' : '+1')
    }

    //Prepare styling for the component
    const className = clsx(
        'w-full h-full dark:text-color-contrast-dark flex justify-center p-1',
        {
            'pointer-events-none text-gray-300 dark:text-zinc-600': isDisabled,
            'hover:bg-gray-100 dark:hover:bg-teal-500': !isDisabled,
            'rounded-l-lg': direction === 'left',
            'rounded-r-lg': direction === 'right',
        },
    );

    //Choose icon for the component
    const icon =
    direction === 'left' ? (
        <ArrowLeftIcon className="w-6" />
    ) : (
        <ArrowRightIcon className="w-6" />
    );

    //Return the component after checking if it is active
    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <div className={className} onClick={setPage}>{icon}</div>
    );
}