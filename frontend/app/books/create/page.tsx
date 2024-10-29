import Form from "@/app/ui/books/create-form";
import Pageheader from "@/app/ui/pageheader";

export default function Page() {
    return (
        <main>
            <div className="w-full text-center bg-icewhite dark:bg-zinc-800 p-3 rounded-lg mb-5 text-cyan-dark dark:text-teal-400 ">
                <Pageheader text="Create Book" />
                <Form />
            </div>
        </main>
    )
}