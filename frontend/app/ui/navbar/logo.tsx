import Image from "next/image"
import Link from "next/link";

export default function Logo() {
    return (
        <Link
            href={"/"}
            className="bg-cyan dark:bg-teal-400 hover:bg-emerald-700 dark:hover:bg-teal-500 flex w-max p-2 rounded-full cursor-pointer ml-2 mr-6 transition-colors"
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

            <div className="text-left font-bold text-icewhite dark:text-zinc-800">
                <p>Howler</p> 
                <p>Books</p>
            </div>
        </Link>
    );
}