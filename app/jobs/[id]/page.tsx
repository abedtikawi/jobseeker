import type { Metadata } from "next";
import api from "@/lib/api";
import type { Job } from "@/shared/constants/types";
import ApplyModal from "@/app/components/ApplyModal";
import { humanizeKey } from "@/helpers";

type Params = { params: Promise<{ id: string }>; searchParams: Promise<{ skip?: string; limit?: string; contractType?: string }> };

export async function generateMetadata({ params, searchParams }: Params): Promise<Metadata> {
    const { id } = await params;

    const job = (await api.getJobById(id)) as Job | null;
    if (!job) {
        return { title: "Job not found | Job Seeker" };
    }
    return {
        title: `${job.position} at ${job.partnerName} | Job Seeker`,
        description: `View details for ${job.position} in ${job.city || job.cityValue}. Requirements, experience, salary, and more.`,
    };
}

export default async function JobDetailsPage({ params, searchParams }: Params) {
    const { id } = await params;

    const job = (await api.getJobById(id)) as Job | null;
    if (!job) {
        return (
            <main className="mx-auto max-w-4xl p-4">
                <h1 className="text-xl font-semibold">Job not found</h1>
            </main>
        );
    }
    return (
        <main className="mx-auto max-w-4xl p-4">
            <h1 className="text-2xl font-bold text-gray-900">{job.position}</h1>
            <p className="text-gray-600">{job.partnerName}</p>
            <section className="table-section overflow-x-auto">
                <table className="table-base min-w-full">
                    <tbody className="divide-y divide-gray-100 text-gray-600">
                        <tr>
                            <th className="w-1/3 bg-gray-50 p-3 text-left text-sm font-medium ">Experience Required</th>
                            <td className="p-3 text-sm">{job.requiresExperience ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <th className="bg-gray-50 p-3 text-left text-sm font-medium ">Experience Years</th>
                            <td className="p-3 text-sm">{job.experienceYears || "-"}</td>
                        </tr>
                        <tr>
                            <th className="bg-gray-50 p-3 text-left text-sm font-medium ">English Required</th>
                            <td className="p-3 text-sm">{job.requiresEnglish ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                            <th className="bg-gray-50 p-3 text-left text-sm font-medium ">City</th>
                            <td className="p-3 text-sm">{humanizeKey(job.city || job.cityValue)}</td>
                        </tr>
                        <tr>
                            <th className="bg-gray-50 p-3 text-left text-sm font-medium ">Contract Type</th>
                            <td className="p-3 text-sm">{job.contractType}</td>
                        </tr>
                        <tr>
                            <th className="bg-gray-50 p-3 text-left text-sm font-medium ">Salary</th>
                            <td className="p-3 text-sm">{job.salary} {job.currency} / {job.salaryFrequency}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <div className="mt-6">
                <ApplyModal />
            </div>
        </main>
    );
}


