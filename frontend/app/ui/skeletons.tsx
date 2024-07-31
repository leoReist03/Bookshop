// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function TableSkeleton() {
    return (
        <div className="w-full text-center bg-icewhite p-3 rounded-lg mb-5">
            <div className="rounded-t-lg w-full bg-cyan mg-h-fit text-cyan">Table head</div>
            <div className="w-full bg-white text-white">Table Row</div>
            <div className="w-full bg-gray-100 text-gray-100">Table Row</div>
            <div className="w-full bg-white text-white">Table Row</div>
            <div className="w-full bg-gray-100 text-gray-100">Table Row</div>
            <div className="rounded-b-lg w-full bg-white text-white">Table Row</div>
        </div>
    );
}