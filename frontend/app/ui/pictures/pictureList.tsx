import PictureCard from "./pictureCard";

import React, { useState, useEffect } from 'react';
import { getPictures } from '@/app/lib/pictures';
import DynamicRadioButtons from '../dynamicRadioButtons';
import Search from './search';
import Pagination from './pagination';

const radioButtonOptions = [
    { label: 'All', value: 'books + authors'},
    { label: 'Books', value: 'books'},
    { label: 'Authors', value: 'authors'}
];

const ITEMS_PER_PAGE = 8;

interface CloudinaryResource {
    public_id: string;
    secure_url: string;
}

export default function PictureList() {
    const [selectedOption, setSelectedOption] = useState(radioButtonOptions[0].value);
    const [pictureData, setPictureData] = useState({ total_count: 0, resources: []})
    const [searchParam, setSearchParam] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [nextCursor, setNextCursor] = useState('');

    //Function to handle changes in the radio buttons
    const handleOptionSelect = (value: string) => {
        setSelectedOption(value);
    }

    //Function to handle changes in the search bar
    const handleSearch = (value: string) => {
        setSearchParam(value);
    }

    //Function to handle changes in the pagination
    const handleCurrentPage = (value: number) => {
        setCurrentPage(value);
    }

    //If any of the listed values change, run the fetchPictures function
    useEffect(() => {
        const fetchPictures = async () => {
            const {total_count, resources, next_cursor} = await getPictures(selectedOption, searchParam, currentPage, nextCursor, ITEMS_PER_PAGE);
            setPictureData({ total_count, resources });
            setNextCursor(next_cursor);
        };

        fetchPictures();
    }, [selectedOption, searchParam, currentPage]);
    

    return (
        <div className="bg-cyan-light dark:bg-zinc-900 rounded-lg p-1 flex-nowrap w-full justify-center mx-auto mb-2">
            {/* Container for the Search and Radio-buttons */}
            <div className='flex-nowrap mx-2 my-4 gap-y-2'>
                <Search
                    placeholder='Search image'
                    onSearch={handleSearch}
                />
                <DynamicRadioButtons 
                    options={radioButtonOptions}
                    onSelect={handleOptionSelect}
                    defaultValue={radioButtonOptions[0].value}
                />
            </div>
            {/* The list itself */}
            <div className="mt-2 flex flex-norwap rounded-md dark:bg-zinc-800 mx-auto">
                <div className='h-min pr-2 w-full my-2'>
                    <div className="flex justify-center">
                        {pictureData.resources.map((resource: CloudinaryResource) => {
                            return (
                                <PictureCard resource={resource} key={resource.public_id}/>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* Pagination */}
            <div className='my-3'>
                <Pagination
                    totalPages={Math.ceil(pictureData.total_count / ITEMS_PER_PAGE)}
                    currentPage={currentPage}
                    onPageChange={handleCurrentPage}
                />
            </div>
        </div>
    );
}