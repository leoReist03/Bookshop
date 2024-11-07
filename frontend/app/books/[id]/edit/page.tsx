import { fetchBookById } from "@/app/lib/data/books";
import Pageheader from "@/app/ui/pageheader";
import Form from "@/app/ui/books/edit-form";
import { fetchAuthors } from "@/app/lib/data/authors";
import { fetchGenres } from "@/app/lib/data/genres";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const book = await fetchBookById(id);
    const authors = await fetchAuthors('', 0);
    const genres = await fetchGenres('', 0);

    return (
        <main>
            <div className="w-full text-center bg-panel dark:bg-panel-dark text-color dark:text-color-dark p-3 rounded-lg mb-5">
                <Pageheader text='Edit Book' />
                <Form book={book} authors={authors} genres={genres}/>
            </div>
        </main>
    );
}