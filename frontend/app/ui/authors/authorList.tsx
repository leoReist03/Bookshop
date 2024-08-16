import { fetchAuthors } from "@/app/lib/data";
import AuthorCard from "./authorCard";
import { Author } from "@/app/lib/models";

export default async function AuthorList({
    query, 
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const authors = await fetchAuthors(query, currentPage);

    return (
        <div className="divide-y-2 divide-white">
            {
                authors.map((author: Author) => {
                return (<AuthorCard key={author.name} author={author} />)
            })}
        </div>
    )
}