
export function BookListSkeleton() {
    return (
        <div className={`w-full text-center bg-panel-two dark:bg-panel-two-dark p-2 rounded-lg mb-5 flex flex-wrap animate-pulse`}>
            <div className='w-[200px] bg-content dark:bg-content-dark h-[300px] rounded-lg m-2'></div>
            <div className='w-[200px] bg-content dark:bg-content-dark h-[300px] rounded-lg m-2'></div>
            <div className='w-[200px] bg-content dark:bg-content-dark h-[300px] rounded-lg m-2'></div>
            <div className='w-[200px] bg-content dark:bg-content-dark h-[300px] rounded-lg m-2'></div>
            <div className='w-[200px] bg-content dark:bg-content-dark h-[300px] rounded-lg m-2'></div>
            <div className='w-[200px] bg-content dark:bg-content-dark h-[300px] rounded-lg m-2'></div>
            <div className='w-[200px] bg-content dark:bg-content-dark h-[300px] rounded-lg m-2'></div>
            <div className='w-[200px] bg-content dark:bg-content-dark h-[300px] rounded-lg m-2'></div>
        </div>
    );
}

export function RecommendationSkeleton() {
    return (
        <div className='w-full text-center bg-panel dark:bg-panel-dark p-3 rounded-lg mb-5 animate-pulse'>
            <div className="h-[30px] bg-content dark:bg-content-dark mt-2 justify-center m-4"/>
            <div className="bg-panel-two dark:bg-panel-two-dark rounded-lg p-3 flex gap-x-2">
                <div className="w-[135px] h-[210px] bg-content dark:bg-content-dark rounded-lg"/>
                <div className="grow flex flex-col p-2 gap-y-2">
                    <div className="h-[24px] w-full bg-content dark:bg-content-dark"/>
                    <div className="h-[24px] w-full bg-content dark:bg-content-dark"/>
                    <div className="h-[24px] w-full bg-content dark:bg-content-dark"/>
                    <div className="h-[24px] w-full bg-content dark:bg-content-dark"/>
                </div>
            </div>
        </div>
    )
}

export function AuthorListSkeleton() {
    return (
        <>
            <div className='w-full bg-panel-two dark:bg-panel-two-dark p-[16px] animate-pulse mb-2 flex gap-x-4'>
                <div className='w-[100px] h-[145px] bg-content dark:bg-content-dark'/>
                <div className='grow pt-5'>
                    <div className='h-[24px] w-full bg-content dark:bg-content-dark mb-4'/>
                    <div className='h-[24px] w-full bg-content dark:bg-content-dark'/>
                </div>
            </div>
            <div className='w-full bg-panel-two dark:bg-panel-two-dark p-[16px] animate-pulse mb-2 flex gap-x-4'>
                <div className='w-[100px] h-[145px] bg-content dark:bg-content-dark'/>
                <div className='grow pt-5'>
                    <div className='h-[24px] w-full bg-content dark:bg-content-dark mb-4'/>
                    <div className='h-[24px] w-full bg-content dark:bg-content-dark'/>
                </div>
            </div>
            <div className='w-full bg-panel-two dark:bg-panel-two-dark p-[16px] animate-pulse mb-2 flex gap-x-4'>
                <div className='w-[100px] h-[145px] bg-content dark:bg-content-dark'/>
                <div className='grow pt-5'>
                    <div className='h-[24px] w-full bg-content dark:bg-content-dark mb-4'/>
                    <div className='h-[24px] w-full bg-content dark:bg-content-dark'/>
                </div>
            </div>
        </>
    )
}

export function GenreListSkeleton() {
    return (
        <>
            <div className='w-full bg-panel-two dark:bg-panel-two-dark p-[16px] flex flex-wrap animate-pulse mb-2'>
                <div className='h-[36px] flex gap-x-2 w-full'>
                    <div className='grow w-5 bg-content dark:bg-content-dark'/>
                    <div className='grow basis-11/12 bg-content dark:bg-content-dark'/>
                </div>
            </div>
            <div className='w-full bg-panel-two dark:bg-panel-two-dark p-[16px] flex flex-wrap animate-pulse mb-2'>
                <div className='h-[36px] flex gap-x-2 w-full'>
                    <div className='grow w-5 bg-content dark:bg-content-dark'/>
                    <div className='grow basis-11/12 bg-content dark:bg-content-dark'/>
                </div>
            </div>
            <div className='w-full bg-panel-two dark:bg-panel-two-dark p-[16px] flex flex-wrap animate-pulse mb-2'>
                <div className='h-[36px] flex gap-x-2 w-full'>
                    <div className='grow w-5 bg-content dark:bg-content-dark'/>
                    <div className='grow basis-11/12 bg-content dark:bg-content-dark'/>
                </div>
            </div>
        </>
    )
}