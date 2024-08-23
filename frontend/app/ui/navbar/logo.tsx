import Image from "next/image"
import Link from "next/link";

export default function Logo() {
    return (
        <Link
            href={"/"}
            className="bg-cyan hover:bg-cyan-dark flex w-max p-2 rounded-full cursor-pointer ml-2 mr-6 transition-colors"
            >
            <Image 
                src='/howlericon.svg'
                width={50}
                height={50}
                alt="hower icon"
                className="fill-white"
            />
            <div className="text-left font-bold text-icewhite">
                <p>Howler</p> 
                <p>Books</p>
            </div>
        </Link>
    );
}