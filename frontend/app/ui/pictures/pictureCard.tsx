import Image from "next/image";
import clsx from "clsx";
import { CloudinaryResource, UseSelectionReturnType } from "@/app/lib/utils";


interface PictureCardProps {
    resource: CloudinaryResource;
    selection: UseSelectionReturnType
}

export default function PictureCard({ resource, selection }: PictureCardProps) {
    
    const className = clsx(
        "rounded-md border-2 hover:brightness-90 hover:cursor-pointer",
        {
            'border-cyan-dark dark:border-teal-400': resource.public_id === selection.selectedId,
            'border-cyan-light dark:border-zinc-600': resource.public_id !== selection.selectedId
        }
    )
    return (
        <Image
            width={150}
            height={150}
            alt={resource.public_id}
            src={resource.secure_url}
            className={className}
            onClick={() => selection.handleSelect(resource.public_id)}
        />
    );
}