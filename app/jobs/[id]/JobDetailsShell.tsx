"use client";
import type { Job } from "@/shared/constants/types";
import { humanizeKey, stripHtml } from "@/helpers";
import ApplyInlineCard from "@/app/components/ApplyInlineCard";
import { useState } from "react";

export default function JobDetailsShell({ job, avatar }: { job: Job; avatar?: string }) {
  const [open, setOpen] = useState(false);
  const [useTranslated, setUseTranslated] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4 items-stretch">
      <section className="md:col-span-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md font-mono text-black">
          <div className="flex items-start gap-4 border-b border-gray-100 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 overflow-hidden">
              {job.logoUrl ? (
                <img src={job.logoUrl} alt={job.partnerName} className="h-8 w-8 object-contain" />
              ) : avatar ? (
                <img src={avatar} alt="Avatar" className="h-12 w-12 object-cover rounded-md" />
              ) : (
                <span>🏢</span>
              )}
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold " title={job.jobPositionValue || job.position}>{job.jobPositionValue || job.position}</h1>
              <p className="truncate text-sm text-[#1DB954] mt-1" title={job.partnerName}>{job.partnerName}</p>
            </div>
          </div>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 flex flex-col">
              <div className="flex items-center justify-between">
                <dt className="text-purple-700 text-sm">Description</dt>
                <div className="flex items-center gap-2">
                  <button type="button" className={`px-2 py-1 text-xs rounded-md border ${!useTranslated ? "bg-black text-white border-black" : "bg-white text-black border-gray-300"}`} onClick={() => setUseTranslated(false)}>English</button>
                  <button type="button" className={`px-2 py-1 text-xs rounded-md border ${useTranslated ? "bg-black text-white border-black" : "bg-white text-black border-gray-300"}`} onClick={() => setUseTranslated(true)}>Arabic</button>
                </div>
              </div>
              <div className="mt-2 flex-1 overflow-auto">
                <dd className="text-sm text-gray-700 whitespace-pre-line leading-6">{useTranslated ? stripHtml(job.description || "") : stripHtml(job.translatedDescription || "")}</dd>
              </div>
              <div className="my-4 border-t border-gray-200" />
              <dl className="grid grid-cols-2 gap-4 text-sm mt-auto">
                <div className="min-w-0 truncate">
                  <dt className="text-purple-700">Requires Health Card</dt>
                  <dd className="font-medium">{job.requiresHealthCard ? "Yes" : "No"}</dd>
                </div>
                <div className="min-w-0 truncate">
                  <dt className="text-purple-700">Requires Experience</dt>
                  <dd className="font-medium">{job.requiresExperience ? "Yes" : "No"}</dd>
                </div>
              </dl>
            </div>
            <div className="md:hidden col-span-3 border-t border-gray-200" />
            <dl className="grid grid-cols-2 gap-4 text-sm md:border-l md:pl-6">
              <div className="min-w-0 truncate">
                <dt className="text-[#1DB954]">Salary</dt>
                <dd className="font-medium">{job.salary} {job.currency}</dd>
              </div>
              <div className="min-w-0 truncate">
                <dt className="text-purple-700">Salary Frequency</dt>
                <dd className="font-medium">{humanizeKey(job.salaryFrequency)}</dd>
              </div>
              <div className="min-w-0 truncate">
                <dt className="text-purple-700">Contract</dt>
                <dd className="font-medium">{humanizeKey(job.contractType)}</dd>
              </div>
              <div className="min-w-0 truncate">
                <dt className="text-purple-700">Experience</dt>
                <dd className="font-medium">{job.requiresExperience ? job.experienceYears || "Required" : "Not required"}</dd>
              </div>
              <div className="min-w-0 truncate">
                <dt className="text-purple-700">English</dt>
                <dd className="font-medium">{job.requiresEnglish ? "Required" : "Not required"}</dd>
              </div>
              <div className="min-w-0 truncate">
                <dt className="text-purple-700">Gender</dt>
                <dd className="font-medium">{humanizeKey(job.gender) || "-"}</dd>
              </div>
              <div className="min-w-0 truncate">
                <dt className="text-purple-700">City</dt>
                <dd className="font-medium">{humanizeKey(job.city || job.cityValue)}</dd>
              </div>
              <div className="min-w-0 truncate">
                <dt className="text-purple-700">District</dt>
                <dd className="font-medium">{humanizeKey(job.districtValue)}</dd>
              </div>
              <div className="min-w-0 truncate">
                <dt className="text-purple-700">Address</dt>
                <dd className="font-medium">{job.address || "-"}</dd>
              </div>
              <div className="min-w-0 truncate">
                <dt className="text-purple-700">Created</dt>
                <dd className="font-medium">{new Date(job.createdDate).toLocaleDateString()}</dd>
              </div>
              <div className="min-w-0 truncate">
                <dt className="text-purple-700">Status</dt>
                <dd className="font-medium">{humanizeKey(job.jobStatus)}</dd>
              </div>
              <div className="min-w-0 truncate">
                <dt className="text-purple-700">Workplace</dt>
                <dd className="font-medium">{humanizeKey(job.workplaceType)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <aside className="md:col-span-1">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md md:sticky md:top-20 font-mono text-black">
          <h2 className="text-xl font-semibold text-purple-700">Submit Application</h2>
          <p className="text-sm text-gray-600 mt-1">Send your basic info to proceed.</p>
          <div className="mt-4">
            <ApplyInlineCard open={open} onOpenChange={setOpen} />
          </div>
        </div>
      </aside>
    </div>
  );
}


