'use client';

import React, { useState, useEffect } from 'react';
import { getPictures } from '@/app/lib/data/pictures';
import PictureList from './pictureList';
import DynamicRadioButtons from '../dynamicRadioButtons';
import Search from './search';
import Pagination from './pagination';

const options = [
    { label: 'All', value: 'bookshop'},
    { label: 'Books', value: 'bookshop AND book'},
    { label: 'Authors', value: 'bookshop AND author'}
];

const ITEMS_PER_PAGE = 8;

export default function Pictures() {
    const [selectedOption, setSelectedOption] = useState(options[0].value);
    const [pictureData, setPictureData] = useState({ total_count: 0, resources: []})
    const [searchParam, setSearchParam] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [nextCursor, setNextCursor] = useState('');

    const handleOptionSelect = (value: string) => {
        setSelectedOption(value);
    }

    const handleSearch = (value: string) => {
        setSearchParam(value);
    }

    const handleCurrentPage = (value: number) => {
        setCurrentPage(value);
    }

    //If any of the listed values change run the fetchPictures
    useEffect(() => {
        const fetchPictures = async () => {
            const {total_count, resources, next_cursor} = await getPictures(selectedOption, searchParam, currentPage, nextCursor, ITEMS_PER_PAGE);
            setPictureData({ total_count, resources });
            setNextCursor(next_cursor);
        };

        fetchPictures();
    }, [selectedOption, searchParam, currentPage]);
    

    return (
        <div className="w-full text-center bg-icewhite dark:bg-zinc-800 p-3 rounded-lg mb-5 h-min">
            <div className="text-cyan-dark dark:text-teal-600">
                <div className="w-full">
                    <p className="font-bold">Pictures</p>
                </div>
                <div className='flex-nowrap my-2'>
                    <Search
                        placeholder='Search image'
                        onSearch={handleSearch}
                    />
                    <DynamicRadioButtons 
                        options={options}
                        onSelect={handleOptionSelect}
                        defaultValue={options[0].value}
                    />
                </div>
                <PictureList resources={pictureData.resources} count={pictureData.total_count}/>
                <div className='mt-3'>
                    <Pagination
                        totalPages={Math.ceil(pictureData.total_count / ITEMS_PER_PAGE)}
                        currentPage={currentPage}
                        onPageChange={handleCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
}