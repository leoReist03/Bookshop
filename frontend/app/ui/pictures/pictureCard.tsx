import Image from "next/image";
import clsx from "clsx";
import { PictureCardProps } from "@/app/lib/interfaces";

export default function PictureCard({ resource, selection }: PictureCardProps) {
    
    const className = clsx(
        "rounded-md border-2 hover:brightness-90 hover:cursor-pointer basis-1/6",
        {
            'border-cyan-dark dark:border-teal-400': resource.secure_url === selection.selectedId,
            'border-cyan-light dark:border-zinc-600': resource.secure_url !== selection.selectedId
        }
    )
    return (
        <Image
            width={150}
            height={150}
            alt={resource.public_id}
            src={resource.secure_url}
            className={className}
            onClick={() => selection.handleSelect(resource.secure_url)}
        />
    );
}