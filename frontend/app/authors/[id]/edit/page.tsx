import Pageheader from "@/app/ui/pageheader";
import Form from "@/app/ui/authors/edit-form";
import { fetchAuthorById } from "@/app/lib/data/authors";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const author = await fetchAuthorById(id);

    if (!author) {
        notFound();
    }

    return (
        <main>
            <div className="w-full text-center bg-icewhite dark:bg-zinc-800 text-cyan dark:text-teal-600 p-3 rounded-lg mb-5">
                <Pageheader text='Edit Author' />
                <Form author={author} />
            </div>
        </main>
    );
}