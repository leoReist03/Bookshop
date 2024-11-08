import Pageheader from "@/app/ui/pageheader";
import Form from "@/app/ui/genres/edit-form";
import { fetchGenreById } from "@/app/lib/data/genres";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const genre = await fetchGenreById(id);

    if (!genre) {
        notFound();
    }

    return (
        <main>
            <div className="w-full text-center bg-panel dark:bg-panel-dark text-color dark:text-color-dark p-3 rounded-lg mb-5">
                <Pageheader text='Edit Genre'/>
                <Form genre={genre} />
            </div>
        </main>
    );
}