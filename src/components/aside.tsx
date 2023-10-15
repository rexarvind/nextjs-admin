import Link from "next/link";

export default function Aside() {
    return (
        <aside className="w-60 bg-gray-200  sticky top-0">
            <div className="absolute w-full h-full overflow-y-auto">

            <ul>
                <li>
                    <Link href={'/'}>Dashboard</Link>
                </li>
                <li>
                    <Link href={'/products'}>Products</Link>
                </li>
                <li>
                    <Link href={'/categories'}>Categories</Link>
                </li>
            </ul>
            </div>
        </aside>
    )
}