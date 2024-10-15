import Image from "next/image";

interface CloudinaryResource {
    public_id: string;
    secure_url: string;
}

export default function PictureCard({
    resource,
}: {
    resource: CloudinaryResource,
}) {
    return (
            <Image
                width={150}
                height={150}
                alt={resource.public_id}
                src={resource.secure_url}
                className="rounded-md border-2 border-cyan-light dark:border-zinc-600 hover:brightness-90 hover:cursor-pointer"
            />
    );
}