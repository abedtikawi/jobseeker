"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiltersProps } from "@/shared/constants/types";



export default function Filters({ initial }: FiltersProps) {
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
    ["experience", "workplaceType", "contractType"].forEach((k) => params.delete(k));
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="space-y-3">
      

      <div className="flex items-center gap-2">
        <label htmlFor="experience" className="text-sm text-purple-700 w-28">Experience</label>
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
        <label htmlFor="workplaceType" className="text-sm text-purple-700 w-28">Workplace</label>
        <select
          id="workplaceType"
          name="workplaceType"
          aria-label="Workplace type"
          className="form-select flex-1"
          value={searchParams.get("workplaceType") ?? ""}
          onChange={(e) => updateParam("workplaceType", e.target.value || undefined)}
        >
          <option value="">Any</option>
          <option value="ON_SITE">On-site</option>
          <option value="REMOTE">Remote</option>
          <option value="FIELD">Field</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="contractType" className="text-sm text-purple-700 w-28">Contract</label>
        <select
          id="contractType"
          name="contractType"
          aria-label="Contract type"
          className="form-select flex-1"
          value={searchParams.get("contractType") ?? ""}
          onChange={(e) => updateParam("contractType", e.target.value || undefined)}
        >
          <option value="">Any</option>
          <option value="FULLTIME">Full-time</option>
          <option value="PARTTIME">Part-time</option>
        </select>
      </div>

      <div>
        <button type="button" onClick={resetFilters} className="btn-primary focus-ring w-full text-[#1DB954]">Reset</button>
      </div>
    </div>
  );
}


