import PictureCard from "./pictureCard";
import React, { useState, useEffect } from 'react';
import { getPictures, deletePicture } from '@/app/lib/pictures';
import DynamicRadioButtons from '../dynamicRadioButtons';
import Search from './search';
import Pagination from './pagination';
import { CloudinaryResource, PictureListProps } from "@/app/lib/interfaces";
import { Button } from "../button";
import { Bounce, toast } from "react-toastify";
import UseSelection from "@/app/lib/useSelection";

const radioButtonOptions = [
    { label: 'All', value: 'books + authors'},
    { label: 'Books', value: 'books'},
    { label: 'Authors', value: 'authors'}
];

const ITEMS_PER_PAGE = 8;

export default function PictureList({ handleSelect, defaultType } : PictureListProps) {
    const defaultSelection = defaultType !== null ? defaultType === 'books' ? radioButtonOptions[1].value : radioButtonOptions[2].value : radioButtonOptions[0].value

    const [selectedOption, setSelectedOption] = useState(defaultSelection);
    const [pictureData, setPictureData] = useState({ total_count: 0, resources: []})
    const [searchParam, setSearchParam] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [nextCursor, setNextCursor] = useState('');
    const selection = UseSelection();

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

    const deleteSelected =() => {
        if (selection.selectedId) {
            deletePicture(selection.selectedId);
            notify('Successfully deleted picture');
        }
    }

    const returnSelected = () => {
        if (selection.selectedId) {
            handleSelect(selection.selectedId);
        }
    }

    function notify(text: string) {
        toast.success(text, {transition: Bounce});
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
        <div className="bg-panel-two dark:bg-panel-two-dark rounded-lg p-1 flex-nowrap w-full justify-center mx-auto mb-2">
            {/* Container for the Search and Radio-buttons */}
            <div className='flex-nowrap mx-2 my-4 gap-y-2'>
                <Search
                    placeholder='Search image'
                    onSearch={handleSearch}
                />
                <DynamicRadioButtons 
                    options={radioButtonOptions}
                    onSelect={handleOptionSelect}
                    defaultValue={defaultSelection}
                />
            </div>
            {/* The list itself */}
            <div className="mt-2 flex flex-norwap rounded-md bg-panel dark:bg-panel-dark mx-auto">
                <div className='pr-2 w-full my-2'>
                    <div className="flex flex-row flex-wrap justify-center">
                        {pictureData.resources.map((resource: CloudinaryResource) => {
                            return (
                                <PictureCard resource={resource} key={resource.public_id} selection={selection}/>
                            );
                        })}
                    </div>
                    <div className="flex gap-x-2 justify-end m-2">
                        <Button onClick={deleteSelected} disabled={selection.selectedId === null}>Delete</Button>
                        <Button onClick={returnSelected} disabled={selection.selectedId === null}>Select</Button>
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