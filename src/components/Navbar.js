import Link from "next/link";
export default function Navbar(){
    return(
        <nav className="flex items-center justify-between px-4 py-3 border-b">
            <Link href="/" className="text-lg font-semibold">
            Shop
            </Link>

            <div className="flex gap-4 text-sm md:text-base">
                <Link href="/cart">Cart</Link>
                <Link href="/admin">Admin</Link>
            </div>
        </nav>
    );
}