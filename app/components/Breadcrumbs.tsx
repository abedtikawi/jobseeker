"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs({ lastLabel }: { lastLabel?: string }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean).filter((seg) => seg !== "jobs");

  const crumbs = segments.map((seg, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    return { label: decodeURIComponent(seg), href };
  });

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="focus-ring hover:underline text-purple-700">Home</Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1">
            <span>/</span>
            {i < crumbs.length - 1 ? (
              <Link href={c.href} className="focus-ring hover:underline ">{c.label}</Link>
            ) : (
              <span aria-current="page" className="text-[#1DB954] font-bold ">{lastLabel ?? c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}


