import { Navbar } from "./Navbar"

export const MaxWidthWrapper = ({children}: {children: React.ReactNode})=> {
    return <main className="max-w-screen-xl mx-auto">
        <Navbar />
        {children}
    </main>
}