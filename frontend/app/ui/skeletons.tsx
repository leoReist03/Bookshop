import styles from '@/app/ui/cssModules/shimmer.module.css'

export function TableSkeleton() {
    return (
        <div className={`${styles.shimmer} w-full text-center bg-icewhite p-3 rounded-lg mb-5`}>
            <div className="flex items-center justify-between gap-2 mb-2">
                <div className='rounded-md bg-white text-white py-1 w-2/5'>Search</div>
                <div className='rounded-md bg-cyan text-cyan py-1 w-1/6'>Create</div>
            </div>
            <div className="rounded-t-lg w-full bg-cyan mg-h-fit text-cyan">Table head</div>
            <div className="w-full bg-white text-white">Table Row</div>
            <div className="w-full bg-gray-100 text-gray-100">Table Row</div>
            <div className="w-full bg-white text-white">Table Row</div>
            <div className="w-full bg-gray-100 text-gray-100">Table Row</div>
            <div className="w-full bg-white text-white">Table Row</div>
            <div className='rounded-b-lg bg-cyan text-cyan'>Pagination</div>
        </div>
    );
}

export function RecommendationSkeleton() {
    return (
        <div className={`${styles.shimmer} w-full text-center bg-icewhite p-3 rounded-lg mb-5`}>
            <div className="text-cyan-dark">
                <div className="w-full">
                    <p className="font-bold">Todays Recommended Book</p>
                </div>
                <div className="flex p-3 bg-icewhite-light rounded-lg mt-2">
                    <div className="bg-gray-100 text-gray-100 px-7 py-14 rounded-lg">Cover</div>
                </div>
            </div>
        </div>
    )
}

export function AuthorListSkeleton() {
    return (
        <div></div>
    )
}