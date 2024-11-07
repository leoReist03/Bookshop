import Form from "@/app/ui/books/create-form";
import Pageheader from "@/app/ui/pageheader";
import { fetchAuthors } from "@/app/lib/data/authors";
import { fetchGenres } from "@/app/lib/data/genres";

export default async function Page() {
    const authors = await fetchAuthors('', 0);
    const genres = await fetchGenres('', 0);

    return (
        <main>
            <div className="w-full text-center bg-panel dark:bg-panel-dark p-3 rounded-lg mb-5 text-color dark:text-color-dark ">
                <Pageheader text="Create Book" />
                <Form authors={authors} genres={genres} />
            </div>
        </main>
    )
}