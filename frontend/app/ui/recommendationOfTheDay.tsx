import Image from "next/image";
import styles from '@/app/ui/cssModules/recommendation.module.css'

const recommendedBook = {
    name: "Lightbringer",
    author: "Pierce Brown",
    release: "2023",
    description: "Lightbringer is the sixth book of the Red Rising Saga by New York times Bestselling author Pierce Brown",
    cover: "/lightbringer-cover.jpg"
    };

export default function RecommendationOfTheDay() {
    return (
        <div className="w-full text-center bg-icewhite p-3 rounded-lg mb-5 h-min">
            <div className="text-cyan-dark">
                <div className="w-full">
                    <p className="font-bold">Todays Recommended Book</p>
                </div>
                <div className="flex p-3 bg-icewhite-light rounded-lg mt-2">
                    <div className={`h-min pr-2`}>
                        <Image 
                            src={recommendedBook.cover}
                            alt="Lightbringer cover art"
                            width={150}
                            height={300}
                            className={`${styles.cover} rounded-lg`}
                        />
                    </div>
                    <div className="text-left">
                        <p><span className={styles.header}>Title: </span>{recommendedBook.name}</p>
                        <p><span className={styles.header}>Author: </span>{recommendedBook.author}</p>
                        <p><span className={styles.header}>Release: </span>{recommendedBook.release}</p>
                        <p><span className={styles.header}>Description: </span>{recommendedBook.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}