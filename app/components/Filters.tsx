"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiltersProps } from "@/shared/constants/types";
import { humanizeKey } from "@/helpers";



export default function Filters({ categories, cities, initial }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string | undefined) {
    const params = new URLSearchParams(searchParams?.toString());
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  function resetFilters() {
    const params = new URLSearchParams(searchParams?.toString());
    ["category", "city", "experience", "english"].forEach((k) => params.delete(k));
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label htmlFor="category" className="text-sm text-gray-700 w-28">Category</label>
        <select
          id="category"
          name="category"
          aria-label="Filter by category"
          className="form-select flex-1"
          value={initial.category ?? ""}
          onChange={(e) => updateParam("category", e.target.value || undefined)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="city" className="text-sm text-gray-700 w-28">City</label>
        <select
          id="city"
          name="city"
          aria-label="Filter by city"
          className="form-select flex-1"
          value={initial.city ? "humanizeKey(initial.city) ": ""}
          onChange={(e) => updateParam("city", e.target.value || undefined)}
        >
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>{humanizeKey(c)}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="experience" className="text-sm text-gray-700 w-28">Experience</label>
        <select
          id="experience"
          name="experience"
          aria-label="Experience required"
          className="form-select flex-1"
          value={initial.experience ?? ""}
          onChange={(e) => updateParam("experience", e.target.value || undefined)}
        >
          <option value="">Any</option>
          <option value="required">Required</option>
          <option value="not_required">Not required</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="english" className="text-sm text-gray-700 w-28">English</label>
        <select
          id="english"
          name="english"
          aria-label="English required"
          className="form-select flex-1"
          value={initial.english ?? ""}
          onChange={(e) => updateParam("english", e.target.value || undefined)}
        >
          <option value="">Any</option>
          <option value="required">Required</option>
          <option value="not_required">Not required</option>
        </select>
      </div>

      <div>
        <button type="button" onClick={resetFilters} className="btn-primary focus-ring w-full">Reset</button>
      </div>
    </div>
  );
}


