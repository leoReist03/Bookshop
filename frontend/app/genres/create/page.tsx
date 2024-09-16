import Form from "@/app/ui/genres/create-form";
import Pageheader from "@/app/ui/pageheader";

export default async function Page() {
    return (
        <main>
            <div className="w-full text-center bg-icewhite dark:bg-zinc-800 text-cyan dark:text-teal-600 p-3 rounded-lg mb-5">
                <Pageheader text="Create Genre"/>
                <Form />
            </div>
        </main>
    )
}