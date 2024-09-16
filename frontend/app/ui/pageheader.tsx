export default function Pageheader({ text }: { text: string }) {
    return (
        <div className='mt-5 text-left'>
            <p className='font-bold text-2xl'>{text}</p>
        </div>
    );

}