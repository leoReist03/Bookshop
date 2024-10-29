import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function Button ({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={clsx(
                'flex h-10 items-center disabled:opacity-25 disabled:hover:none rounded-lg bg-cyan dark:bg-teal-400 enabled:hover:bg-cyan-dark enabled:dark:hover:bg-teal-500 px-4 text-icewhite dark:text-zinc-800 text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                className,
            )}
        >
            {children}
        </button>
    );
}