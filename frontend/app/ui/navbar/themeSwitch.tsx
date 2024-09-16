import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function ThemeSwitch() {
    return (
        <div className="text-icewhite dark:text-zinc-800">
            <button type="button" className="hs-dark-mode hs-dark-mode-active:hidden block flex items-center gap-2 bg-cyan hover:bg-cyan-dark p-2 rounded-full" data-hs-theme-click-value="dark">
                <SunIcon className="h-5"/>
                Light
            </button>
            <button type="button" className="hs-dark-mode hs-dark-mode-active:inline-flex hidden flex items-center gap-2 bg-teal-600 hover:bg-teal-700 p-2 rounded-full" data-hs-theme-click-value="light">
                <MoonIcon className="h-5"/>
                Dark
            </button>
        </div>
    );
}