import Form from "@/app/ui/books/create-form";
import Pageheader from "@/app/ui/pageheader";

export default function Page() {
    return (
        <main>
            <div className="w-full text-center bg-panel dark:bg-panel-dark p-3 rounded-lg mb-5 text-color dark:text-color-dark ">
                <Pageheader text="Create Book" />
                <Form />
            </div>
        </main>
    )
}