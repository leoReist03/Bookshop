import PictureCard from "./pictureCard";

interface CloudinaryResource {
    public_id: string;
    secure_url: string;
}

export default function PictureList({
    resources,
    count,
}: {
    resources:  CloudinaryResource[],
    count: number,
}) {
    return (
        <div className="flex p-3 bg-cyan-light rounded-lg mt-2 dark:bg-zinc-900 flex flex-norwap">
            <div className='h-min pr-2 w-full my-2'>
                <div className="flex justify-center">
                    {resources.map((resource: CloudinaryResource) => {
                        return (
                            <PictureCard resource={resource} key={resource.public_id}/>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}