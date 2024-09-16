
export function BookListSkeleton() {
    return (
        <div className={`w-full text-center bg-cyan-light dark:bg-neutral-900 p-2 rounded-lg mb-5 flex flex-wrap animate-pulse`}>
            <div className='w-[200px] bg-white dark:bg-neutral-700 h-[300px] rounded-lg m-2'></div>
            <div className='w-[200px] bg-white dark:bg-neutral-700 h-[300px] rounded-lg m-2'></div>
            <div className='w-[200px] bg-white dark:bg-neutral-700 h-[300px] rounded-lg m-2'></div>
            <div className='w-[200px] bg-white dark:bg-neutral-700 h-[300px] rounded-lg m-2'></div>
            <div className='w-[200px] bg-white dark:bg-neutral-700 h-[300px] rounded-lg m-2'></div>
            <div className='w-[200px] bg-white dark:bg-neutral-700 h-[300px] rounded-lg m-2'></div>
            <div className='w-[200px] bg-white dark:bg-neutral-700 h-[300px] rounded-lg m-2'></div>
            <div className='w-[200px] bg-white dark:bg-neutral-700 h-[300px] rounded-lg m-2'></div>
        </div>
    );
}

export function RecommendationSkeleton() {
    return (
        <div className='w-full text-center bg-icewhite dark:bg-zinc-800 p-3 rounded-lg mb-5 text-cyan-dark animate-pulse'>
            <div className="h-[30px] bg-cyan-light dark:bg-zinc-600 mt-2 justify-center m-4"/>
            <div className="bg-cyan-less dark:bg-zinc-900 rounded-lg p-3 flex gap-x-2">
                <div className="w-[135px] h-[210px] bg-cyan-light dark:bg-zinc-600 rounded-lg"/>
                <div className="grow flex flex-col p-2 gap-y-2">
                    <div className="h-[24px] w-full bg-cyan-light dark:bg-zinc-600"/>
                    <div className="h-[24px] w-full bg-cyan-light dark:bg-zinc-600"/>
                    <div className="h-[24px] w-full bg-cyan-light dark:bg-zinc-600"/>
                    <div className="h-[24px] w-full bg-cyan-light dark:bg-zinc-600"/>
                </div>
            </div>
        </div>
    )
}

export function AuthorListSkeleton() {
    return (
        <>
            <div className='w-full bg-cyan-light dark:bg-zinc-900 p-[16px] animate-pulse mb-2 flex gap-x-4'>
                <div className='w-[100px] h-[145px] bg-cyan-less dark:bg-zinc-600'/>
                <div className='grow pt-5'>
                    <div className='h-[24px] w-full bg-cyan-less dark:bg-zinc-600 mb-4'/>
                    <div className='h-[24px] w-full bg-cyan-less dark:bg-zinc-600'/>
                </div>
            </div>
            <div className='w-full bg-cyan-light dark:bg-zinc-900 p-[16px] animate-pulse mb-2 flex gap-x-4'>
                <div className='w-[100px] h-[145px] bg-cyan-less dark:bg-zinc-600'/>
                <div className='grow pt-5'>
                    <div className='h-[24px] w-full bg-cyan-less dark:bg-zinc-600 mb-4'/>
                    <div className='h-[24px] w-full bg-cyan-less dark:bg-zinc-600'/>
                </div>
            </div>
            <div className='w-full bg-cyan-light dark:bg-zinc-900 p-[16px] animate-pulse mb-2 flex gap-x-4'>
                <div className='w-[100px] h-[145px] bg-cyan-less dark:bg-zinc-600'/>
                <div className='grow pt-5'>
                    <div className='h-[24px] w-full bg-cyan-less dark:bg-zinc-600 mb-4'/>
                    <div className='h-[24px] w-full bg-cyan-less dark:bg-zinc-600'/>
                </div>
            </div>
        </>
    )
}

export function GenreListSkeleton() {
    return (
        <>
            <div className='w-full bg-cyan-light dark:bg-zinc-900 p-[16px] flex flex-wrap animate-pulse mb-2'>
                <div className='h-[36px] flex gap-x-2 w-full'>
                    <div className='grow w-5 bg-cyan-less dark:bg-zinc-800'/>
                    <div className='grow basis-11/12 bg-cyan-less dark:bg-zinc-800'/>
                </div>
            </div>
            <div className='w-full bg-cyan-light dark:bg-zinc-900 p-[16px] flex flex-wrap animate-pulse mb-2'>
                <div className='h-[36px] flex gap-x-2 w-full'>
                    <div className='grow w-5 bg-cyan-less dark:bg-zinc-800'/>
                    <div className='grow basis-11/12 bg-cyan-less dark:bg-zinc-800'/>
                </div>
            </div>
            <div className='w-full bg-cyan-light dark:bg-zinc-900 p-[16px] flex flex-wrap animate-pulse mb-2'>
                <div className='h-[36px] flex gap-x-2 w-full'>
                    <div className='grow w-5 bg-cyan-less dark:bg-zinc-800'/>
                    <div className='grow basis-11/12 bg-cyan-less dark:bg-zinc-800'/>
                </div>
            </div>
        </>
    )
}