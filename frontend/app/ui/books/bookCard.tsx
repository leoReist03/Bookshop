import { Book } from "@/app/lib/models";
import Image from "next/image";
import Link from "next/link";
import styles from '@/app/ui/cssModules/book-card.module.css';

export default async function BookCard({ book }: { book: Book }) {
    return (
        <Link
            href={`/books/${book.Id}/details`}
            className={`${styles.cardContainer} w-fit h-fit m-2 text-color-contrast dark:text-color-contrast-dark hover:cursor-pointer`}
        >
            <div className={styles.card}>
                <div className={styles.frontContent}>
                    <Image
                        src={book.Cover}
                        width={200}
                        height={200}
                        style={{
                            width: 180,
                            height: 'auto'
                        }}
                        alt={`cover for ${book.Name}`}
                    />
                </div>
                <div className={`${styles.content} p-5`}>
                    <p className="font-bold">{book.Name}</p>
                    <p>{book.Author}</p>
                    <p>{book.Genre}</p>
                </div>
            </div>
        </Link>
    );
}