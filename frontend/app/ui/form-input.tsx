import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    as?: 'input' | 'textarea';
    Icon: React.ComponentType<{ className?: string }>;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    as?: 'input' | 'textarea';
    Icon: React.ComponentType<{ className?: string }>;
}

type FormInputProps = InputProps | TextareaProps

export default function FormInput ({ label, as: Component = 'input', Icon, ...props }: FormInputProps) {
    const labelUppercase = label[0].toUpperCase() + label.slice(1);
    const className = 'py-3 px-4 pl-10 block w-3/4 bg-panel-two dark:bg-panel-two-dark placeholder-color dark:placeholder-color-dark border-gray-200 rounded-lg text-sm focus:border-cyan focus:ring-cyan dark:border-zinc-700 dark:focus:ring-zinc-600'
    
    return (
        <>
            <label htmlFor={label} className="mb-2 block text-base font-medium text-left w-fit">
                {labelUppercase + ':'}
            </label>
            <div className="relative mt-2 rounded-md">
                {Component === 'textarea' ? (
                    <textarea 
                        className={className}
                        id={label}
                        name={label}
                        placeholder={labelUppercase + '...'}
                        {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
                    />
                ): (
                    <input
                        className={className}
                        id={label}
                        name={label}
                        placeholder={labelUppercase + '...'}
                        {...props as React.InputHTMLAttributes<HTMLInputElement>}
                    />
                )}
                {Icon &&
                    <Icon className="pointer-events-none absolute left-3 top-[23px] h-[18px] w-[18px] -translate-y-1/2" />
                }
            </div>
        </>
    );
}