'use client';

import PictureList from './pictureList';
import UploadPicture from './pictureUpload';
import DynamicRadioButtons from '../dynamicRadioButtons';
import React, { useState } from 'react';

const radioButtonOptions = [
    { label: "Select an Image", value: "select" },
    { label: "Upload an Image", value: "upload" }
]

export default function Pictures() {
    const [selectedOption, setSelectedOption] = useState(radioButtonOptions[0].value);

    const handleOptionSelect = (value: string) => {
        setSelectedOption(value);
    }

    return (
        <div className="w-full text-center bg-icewhite dark:bg-zinc-800 p-3 rounded-lg mb-5 h-min">
            <div className="text-cyan-dark dark:text-teal-400 flex-nowrap">
                <div className="w-full">
                    <p className="font-bold">Pictures</p>
                </div>
                <div>
                    <DynamicRadioButtons 
                        options={radioButtonOptions}
                        onSelect={handleOptionSelect}
                        defaultValue={radioButtonOptions[0].value}
                    />
                    <div>
                        {selectedOption === 'select' ? <PictureList /> : <UploadPicture />}
                    </div>
                </div>
            </div>
        </div>
    );
}