import Form from "@/app/ui/authors/create-form";
import Pageheader from "@/app/ui/pageheader";

export default async function Page() {
    return (
        <main>
            <div className="w-full text-center bg-panel dark:bg-panel-dark text-color dark:text-color-dark p-3 rounded-lg mb-5">
                <Pageheader text="Create Author"/>
                <Form />
            </div>
        </main>
    );
}