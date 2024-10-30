import Image from "next/image";

const recommendedBook = {
    name: "Lightbringer",
    author: "Pierce Brown",
    release: "2023",
    description: "Lightbringer is the sixth book of the Red Rising Saga by New York times Bestselling author Pierce Brown",
    cover: "/lightbringer-cover.jpg"
    };

export default function RecommendationOfTheDay() {
    return (
        <div className="w-full text-center bg-panel dark:bg-panel-dark p-3 rounded-lg mb-5 h-min">
            <div className="text-color dark:text-color-dark">
                <div className="w-full">
                    <p className="font-bold">Todays Recommended Book</p>
                </div>
                <div className="flex p-3 bg-panel-two rounded-lg mt-2 dark:bg-panel-two-dark">
                    <div className={`h-min pr-2`}>
                        <Image 
                            src={recommendedBook.cover}
                            alt="Lightbringer cover art"
                            width={150}
                            height={300}
                            className={`font-bold rounded-lg`}
                        />
                    </div>
                    <div className="text-left">
                        <p><span className='font-bold'>Title: </span>{recommendedBook.name}</p>
                        <p><span className='font-bold'>Author: </span>{recommendedBook.author}</p>
                        <p><span className='font-bold'>Release: </span>{recommendedBook.release}</p>
                        <p><span className='font-bold'>Description: </span>{recommendedBook.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}