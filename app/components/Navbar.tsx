import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b bg-white">
            <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                <Link href="/" aria-label="Go to Job Seeker homepage" className="inline-flex items-center focus-ring" title="Job Seeker">
                    <Image
                        src="/jslogo.svg"
                        alt="Job Seeker logo"
                        width={36}
                        height={36}
                        className="h-9 w-auto"
                        priority
                    />
                </Link>
            </nav>
        </header>
    );
}


