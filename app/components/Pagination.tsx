"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const skip = Number(searchParams.get("skip") ?? "0");
  const limit = Number(searchParams.get("limit") ?? "10");

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams?.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  }

  const canPrev = skip > 0;
  const canNext = true;

  return (
    <div className="mt-6 flex items-center justify-between gap-3">
      <div className="text-sm text-gray-600">Showing {skip + 1} - {skip + limit}</div>
      <div className="flex gap-2">
        <button
          type="button"
          className="btn-primary focus-ring disabled:opacity-50 disabled:pointer-events-none"
          onClick={() => setParam("skip", String(Math.max(skip - limit, 0)))}
          disabled={!canPrev}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn-primary focus-ring text-[#1DB954]"
          onClick={() => setParam("skip", String(skip + limit))}
        >
          Next
        </button>
      </div>
    </div>
  );
}


