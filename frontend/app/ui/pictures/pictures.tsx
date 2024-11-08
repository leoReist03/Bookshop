'use client';

import PictureList from './pictureList';
import UploadPicture from './pictureUpload';
import DynamicRadioButtons from '../dynamicRadioButtons';
import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Button } from '../button';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { PicturesProps } from "@/app/lib/interfaces";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const radioButtonOptions = [
    { label: "Select an Image", value: "select" },
    { label: "Upload an Image", value: "upload" }
]

export default function Pictures({ onPictureSelect, defaultType }: PicturesProps) {
    const [selectedOption, setSelectedOption] = useState(radioButtonOptions[0].value);
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const handleOptionSelect = (value: string) => {
        setSelectedOption(value);
    }

    const handleImageSelect = (value: string) => {
        onPictureSelect(value);
        closeModal();
    }

    return (
        <>
            <Button type='button' onClick={openModal}>Select a picture</Button>
            <Dialog
                open={isOpen}
                onClose={closeModal}
            >
                <DialogBackdrop className="fixed inset-0 bg-black/60" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className='w-1/2 max-w-1/2 h-3/4 max-h-3/4 mx-auto my-auto'>
                        <div className="w-full text-center bg-panel dark:bg-panel-dark p-3 rounded-lg mb-5 h-min">
                            <div className="text-color dark:text-color-dark flex-nowrap">
                                <div className="relative w-full flex-row">
                                    <h1 className='text-xl font-bold m-2'>Pictures</h1>
                                    <XCircleIcon onClick={closeModal} className='absolute top-0 right-2 w-8 text-color dark:text-color-dark hover:text-color-hover dark:hover:text-hover-color-hover-dark hover:cursor-pointer'/>
                                </div>
                                <div>
                                    <DynamicRadioButtons 
                                        options={radioButtonOptions}
                                        onSelect={handleOptionSelect}
                                        defaultValue={radioButtonOptions[0].value}
                                    />
                                    <div>
                                        {selectedOption === 'select' ? <PictureList handleSelect={handleImageSelect} defaultType={defaultType} /> : <UploadPicture />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                        />
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}