import Link from 'next/link'

export default function Header() {
    return (
        <>
            <div className="text-center">Notice text</div>
            <header className="app-header sticky top-0 shadow border-b">
                <div>
                    <Link href={'/'}>
                        Admin Dashborad
                    </Link>
                </div>
            </header>
        </>
    )
}