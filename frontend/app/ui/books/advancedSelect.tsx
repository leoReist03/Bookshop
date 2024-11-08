import { Author, Genre } from "@/app/lib/models";

export default function AdvancedSelect({
    group,
    label,
    groupName,
} : {
    group: Author[] | Genre[],
    label: string,
    groupName: 'Author' | 'Genre'
}) {
    const config = {
        "hasSearch": true,
        "searchPlaceholder": "Search...",
        "placeholder": groupName === 'Author' ? 'Select an Author' : 'Select a Genre',
        "searchClasses": "block w-full text-sm border-gray-200 rounded-lg focus:border-cyan focus:ring-cyan before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-cyan-less dark:placeholder-cyan-less py-2 px-3",
        "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
        "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span class=\"me-2\" data-icon></span><span class=\"\" data-title></span></button>",
        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600",
        "dropdownClasses": "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
        "optionClasses": "py-2 px-4 w-full text-sm cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
        "optionTemplate": "<div><div class=\"flex items-center\"><div class=\"\" data-title></div></div></div>",
        "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
    };
    return (
        <>
            <label htmlFor={label} className="mb-2 block text-base font-medium text-left w-fit outline-2">
                {groupName + ':'}
            </label>
            <div className="w-3/4">
                <select 
                    id={label}
                    name={label}
                    className="hidden"
                    data-hs-select={JSON.stringify(config)}
                    >
                    <option value="">Choose a {groupName}</option>
                    {group.map((obj: {Id: string, Name: string}) => {
                        return (
                            <option value={obj.Id} key={obj.Name}>
                                    {obj.Name}
                            </option>
                        );
                    })}
                </select>
            </div>
        </>
    );
}