import { fetchBookById } from "@/app/lib/data/books";
import Pageheader from "@/app/ui/pageheader";
import { notFound } from "next/navigation";
import Form from "@/app/ui/books/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const book = await fetchBookById(id);

    if(!book) {
        notFound();
    }

    return (
        <main>
            <div className="w-full text-center bg-icewhite p-3 rounded-lg mb-5">
                <Pageheader text='Edit Book' />
                <Form book={book} />
            </div>
        </main>
    );
}