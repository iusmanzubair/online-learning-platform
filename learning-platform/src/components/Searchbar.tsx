import { Search } from 'lucide-react';

export const Searchbar = ()=> {
    return <div className="w-[30rem] my-5">
        <form>
            <div className="w-full flex items-center border border-black">
            <input type="text" placeholder="Search course" className="border-none outline-none w-full py-2 px-4" />
            <button className="bg-black text-white px-4 py-2"><Search /></button>
            </div>
        </form>
    </div>
}