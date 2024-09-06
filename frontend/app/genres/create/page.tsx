import Form from "@/app/ui/genres/create-form";
import Pageheader from "@/app/ui/pageheader";

export default async function Page() {
    return (
        <main>
            <div className="w-full text-center bg-icewhite p-3 rounded-lg mb-5">
                <Pageheader text="Create Genre"/>
                <Form />
            </div>
        </main>
    )
}