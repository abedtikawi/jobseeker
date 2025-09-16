import type { Metadata } from "next";
import api from "@/lib/api";
import type { Job } from "@/shared/constants/types";
import JobDetailsShell from "./JobDetailsShell";
import Navbar from "@/app/components/Navbar";
import { humanizeKey } from "@/helpers";
import Breadcrumbs from "@/app/components/Breadcrumbs";

type Params = { params: Promise<{ id: string }>; searchParams: Promise<{ skip?: string; limit?: string; contractType?: string; avatar?: string }> };

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
    const { avatar } = await searchParams;

    const job = (await api.getJobById(id)) as Job | null;
    if (!job) {
        return (
            <main className="mx-auto max-w-4xl p-4">
                <h1 className="text-xl font-semibold">Job not found</h1>
            </main>
        );
    }
    return (
        <>
            <Navbar />
            <main className="mx-auto max-w-6xl p-5">
                <Breadcrumbs />
                <div className="mt-5">
                    <JobDetailsShell job={job} avatar={avatar} />
                </div>
            </main>
        </>
    );
}


