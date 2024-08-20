import Pageheader from "@/app/ui/pageheader";
import Form from "@/app/ui/authors/edit-form";
import { fetchAuthorById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string }}) {
    const id = params.id;
    const author = await fetchAuthorById(id);

    if (!author) {
        notFound();
    }

    return (
        <main>
            <div className="w-full text-center bg-icewhite p-3 rounded-lg mb-5">
                <Pageheader text='Edit Author' />
                <Form author={author} />
            </div>
        </main>
    );
}