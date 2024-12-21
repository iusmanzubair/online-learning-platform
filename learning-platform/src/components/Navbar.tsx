export const Navbar = ()=> {
    return <nav className="flex items-center justify-between my-6">
        <ul className="flex items-center gap-4">
            <a href="/">Home</a>
            <a href="/courses">Courses</a>
        </ul>
        <button className="bg-black text-white px-6 py-1.5 rounded-lg">
            Login
        </button>
    </nav>
}