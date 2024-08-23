import { Book } from "@/app/lib/models";
import Image from "next/image";
import Link from "next/link";
import styles from '@/app/ui/cssModules/book-card.module.css';

export default async function BookCard({ book }: { book: Book }) {
    return (
        <Link
            href={`/books/${book.id}/details`}
            className={`${styles.cardContainer} w-fit h-fit m-2 text-white hover:cursor-pointer`}
        >
            <div className={styles.card}>
                <div className={`${styles.frontContent} bg-gradient-to-r from-cyan to-cyan-dark`}>
                    <Image
                        src={`/books/${book.cover}`}
                        width={200}
                        height={75}
                        alt={`cover for ${book.name}`}
                    />
                </div>
                <div className={`${styles.content} p-5`}>
                    <p className="font-bold">{book.name}</p>
                    <p>{book.author}</p>
                    <p>{book.genre}</p>
                </div>
            </div>
        </Link>
    );
}