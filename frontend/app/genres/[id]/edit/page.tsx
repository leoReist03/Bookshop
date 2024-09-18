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
            <div className="w-full text-center bg-icewhite dark:bg-zinc-800 text-cyan dark:text-teal-600 p-3 rounded-lg mb-5">
                <Pageheader text='Edit Genre'/>
                <Form genre={genre} />
            </div>
        </main>
    );
}