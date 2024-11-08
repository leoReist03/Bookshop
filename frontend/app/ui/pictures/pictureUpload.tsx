import Image from "next/image";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { Button } from "../button";
import DynamicRadioButtons from "../dynamicRadioButtons";
import React, { useState, useEffect } from 'react';
import { uploadPicture } from "@/app/lib/pictures";
import { readAsDataURL } from "@/app/lib/utils";
import { notify } from "@/app/lib/utils";

const radioButtonOptions = [
    { label: 'Book cover', value: 'book'},
    { label: 'Author image', value: 'author'}
];

export default function UploadPicture() {
    const [selectedType, setSelectedType] = useState(radioButtonOptions[0].value);
    const [selectedImage, setSelectedImage] = useState<File | null>();
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    
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
            notify('Successfully uploaded Picture', 'success');
        }
    }
    useEffect(() => {
        if (selectedImage && selectedType && (Math.round(selectedImage.size / 1024 / 1024 ) < 1)) {
            setIsDisabled(false);
        } else if (isDisabled !== true) {
            setIsDisabled(true);
        }
    }, [selectedImage, selectedType])

    return (
        <div className="bg-panel-two dark:bg-panel-two-dark rounded-lg p-1 flex-nowrap w-full justify-center mx-auto mb-2">
            <div className="m-2 rounded-md p-2">
                <label htmlFor="cover" className="hover:cursor-pointer">
                    <div className="relative mt-2 rounded-md">
                        {selectedImage && 
                        <>
                            <Image
                                src={URL.createObjectURL(selectedImage)}
                                width={200}
                                height={200}
                                style={{
                                    width: 200,
                                    height: 'auto'
                                }}
                                alt="Selected Image"
                                className="mx-auto"
                            />
                        </>
                        }
                        {!selectedImage &&
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <CloudArrowUpIcon className="w-8 h-8 mb-4" />
                            <p className="mb-2 text-sm"><span className="font-semibold">Click to select Picture</span> <br /> or drag and drop</p>
                            <p className="text-xs">PNG or JPG(2:3 ratio)</p>
                        </div>}
                        {selectedImage && (Math.round(selectedImage.size / 1024 / 1024 * 100) / 100) > 1 && <span className="text-color-error ml-auto my-auto">The image cannot be bigger than 1 MB</span>}
                        <input id="cover" name="cover" accept="image/*" type="file" onChange={handleImageChange} hidden />
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
                <Button onClick={handleSubmit} className="ml-auto" disabled={isDisabled}>Upload Picture</Button>
            </div>
        </div>
    );
}