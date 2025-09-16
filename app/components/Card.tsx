import { Job } from "@/shared/constants/types";
import Link from "next/link";
import { humanizeKey } from "@/helpers";


export default function Card({ props, query }: { props: Job; query?: { skip?: string; limit?: string; contractType?: string } }) {
    const jobId = props.id;
    const queryString = new URLSearchParams({
        skip: query?.skip ?? "0",
        limit: query?.limit ?? "10",
        contractType: query?.contractType ?? (props.contractType || "FULLTIME"),
    }).toString();
    return (
        <Link href={`/jobs/${jobId}?${queryString}`} className="card card-hover focus-ring block">
            <article className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                <header className="min-w-0">
                    <h3 className="truncate text-lg font-semibold text-gray-900" title={humanizeKey(props.position)}>{humanizeKey(props.position)}</h3>
                </header>
                <dl className="grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
                    <div className="min-w-0 truncate">
                        <dt className="text-gray-500">Experience</dt>
                        <dd className="font-medium">{props.requiresExperience ? props.experienceYears || "Required" : "Not required"}</dd>
                    </div>
                    <div className="min-w-0 truncate">
                        <dt className="text-gray-500">English</dt>
                        <dd className="font-medium">{props.requiresEnglish ? "Required" : "Not required"}</dd>
                    </div>
                    <div className="min-w-0 truncate md:text-right">
                        <dt className="text-gray-500">City</dt>
                        <dd className="font-medium">{humanizeKey(props.city || props.cityValue)}</dd>
                    </div>
                </dl>
            </article>
        </Link>
    );
}


