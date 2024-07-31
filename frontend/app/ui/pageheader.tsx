import PageDivider from "./pagedivider";

export default function PageHeader({
    value
}: {
    value: string
}

) {
    return (
        <div className="w-full text-center mb-5">
            <p className="font-bold text-cyan mb-2">{value}</p>

            <PageDivider />
        </div>
    );
}