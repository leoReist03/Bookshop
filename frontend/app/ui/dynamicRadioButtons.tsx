'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

interface OptionInterface {
    label: string,
    value: string
}

interface DynamicRadioButtonsProps {
    options: OptionInterface[],
    onSelect: (value: string) => void,
    defaultValue?: string,
}

export default function DynamicRadioButtons({ options, onSelect, defaultValue }: DynamicRadioButtonsProps) {
    const [selectedOption, setSelectedOption] = useState<string>(defaultValue || '');

    //If any of the values in [] run code
    useEffect(() => {
        //If a default value is present and the selected option is empty send default values upwards
        if (defaultValue && selectedOption === '') {
            setSelectedOption(defaultValue);
            onSelect(defaultValue);
        }
    }, [defaultValue, selectedOption, onSelect]);

    const handeOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedOption(value);
        onSelect(value);
    };

    return (
        <div className='flex gap-x-2'>
            {options.map((option) => (
                <label htmlFor={option.value} key={option.value} className={clsx(
                    'rounded-full p-2 text-icewhite dark:text-zinc-800 font-semibold md:',
                    {
                        //Styling for active button
                        'bg-cyan-less hover:bg-cyan dark:bg-teal-400': selectedOption === option.value,
                        //Styling for inactive buttons
                        'bg-cyan hover:bg-cyan-dark dark:bg-teal-600 dark:hover:bg-teal-700 cursor-pointer': selectedOption !== option.value
                    }
                )}>
                    <input
                        type='radio'
                        id={option.value}
                        name='dynamicRadio'
                        value={option.value}
                        checked={selectedOption === option.value}
                        onChange={handeOptionChange}
                        className='hidden'
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
}