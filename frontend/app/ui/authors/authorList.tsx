import { fetchAuthors } from "@/app/lib/data/authors";
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
        <div className="divide-icewhite dark:divide-zinc-800">
            {
                authors.map((author: Author) => {
                return (<AuthorCard key={author.Name} author={author} />)
            })}
        </div>
    )
}