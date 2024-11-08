import { fetchGenres } from "@/app/lib/data/genres";
import { Genre } from '@/app/lib/models';
import { UpdateGenre, DeleteGenre } from "./buttons";

export default async function GenrePage({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const genres = await fetchGenres(query, currentPage);
    var count = 0;
    return (
        <>
            {genres.map((genre: Genre) => {
                count++;
                return (
                    <div key={genre.Name} className="bg-panel-two dark:bg-panel-two-dark p-4 border-solid flex flex-row w-full mb-2 text-lg align-text-middle">
                        <span className="w-10 font-bold">{count}</span>
                        <span className="grow text-left">{genre.Name}</span>
                        <div className="flex pr-4 gap-x-2">
                            <UpdateGenre id={genre.Id} />
                            <DeleteGenre id={genre.Id} />
                        </div>
                    </div>
                );
            })}
        </>
    );
}