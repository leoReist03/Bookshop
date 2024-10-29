import Image from "next/image";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { Button } from "../button";
import DynamicRadioButtons from "../dynamicRadioButtons";
import React, { useState } from 'react';
import { uploadPicture } from "@/app/lib/pictures";
import { readAsDataURL } from "@/app/lib/utils";
import { Bounce, toast } from 'react-toastify';

const radioButtonOptions = [
    { label: 'Book cover', value: 'book'},
    { label: 'Author image', value: 'author'}
];

export default function UploadPicture() {
    const [selectedType, setSelectedType] = useState(radioButtonOptions[0].value);
    const [selectedImage, setSelectedImage] = useState<File | null>();
    
    //Function to handle changes in the radio buttons
    const handleOptionSelect = (value: string) => {
        setSelectedType(value);
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedImage(event.target.files[0]);
        }
    }

    const handleSubmit = async () => {
        if (selectedImage) {
            const fileName = selectedImage.name.split('.')[0];
            readAsDataURL(selectedImage).then(result => uploadPicture(String(result), fileName, selectedType));
            setSelectedImage(null);
            notify();
        }
    }
    
    const notify = () => toast.success('Successfully uploaded Picture', {
        transition: Bounce,
    });

    return (
        <div className="bg-cyan-light dark:bg-zinc-900 rounded-lg p-1 flex-nowrap w-full justify-center mx-auto mb-2">
            <div className="m-2 bg-cyan-light dark:bg-zinc-900 hover:bg-cyan-less rounded-md p-2 hover:cursor-pointer">
                <label htmlFor="cover">
                    <p className="mb-2 block text-base font-medium text-left w-fit">
                    </p>
                    <div className="relative mt-2 rounded-md">
                        {selectedImage && 
                        <Image
                            src={URL.createObjectURL(selectedImage)}
                            width={250}
                            height={150}
                            alt="Selected Image"
                            className="mx-auto"
                        />}
                        {!selectedImage &&
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <CloudArrowUpIcon className="w-8 h-8 mb-4" />
                            <p className="mb-2 text-sm"><span className="font-semibold">Click to select Picture</span> <br /> or drag and drop</p>
                            <p className="text-xs">PNG or JPG(2:3 ratio)</p>
                        </div>}
                        <input id="cover" name="cover" accept="image/*" type="file" onChange={handleImageChange} className="hidden" />
                    </div>
                </label>

                <div className="text-left">
                    <div className="mb-1">
                        <label>
                            Picture type
                        </label>
                    </div>
                    <DynamicRadioButtons
                        options={radioButtonOptions}
                        onSelect={handleOptionSelect}
                        defaultValue={radioButtonOptions[0].value}
                    />
                </div>
                {selectedImage && selectedType ? <Button onClick={handleSubmit} className="ml-auto">Upload Picture</Button> : <div></div>}
            </div>
        </div>
    );
}