import Image from "next/image"
import Link from "next/link";

export default function Logo() {
    return (
        <Link
            href={"/"}
            className="bg-button dark:bg-button-dark hover:bg-button-hover dark:hover:bg-button-hover-dark flex w-max p-2 rounded-full cursor-pointer ml-2 mr-6 transition-colors"
            >
            <Image 
                src='/howlericon.svg'
                width={50}
                height={50}
                alt="hower icon"
                className="dark:hidden block"
            />

            <Image 
                src='/howlericon-dark.svg'
                width={50}
                height={50}
                alt="hower icon"
                className="hidden dark:block"
            />

            <div className="text-left font-bold text-color-contrast dark:text-color-contrast-dark">
                <p>Howler</p> 
                <p>Books</p>
            </div>
        </Link>
    );
}