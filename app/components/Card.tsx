import { Job } from "@/shared/constants/types";
import Link from "next/link";
import Image from "next/image";
import { humanizeKey } from "@/helpers";


export default function Card({ props, query }: { props: Job; query?: { skip?: string; limit?: string; contractType?: string } }) {
    const jobId = props.id;
    const avatars = ["/avatar_girl.jpg", "/avatar_male.jpg", "/avatar_glasses.jpg"] as const;
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    const queryString = new URLSearchParams({
        skip: query?.skip ?? "0",
        limit: query?.limit ?? "10",
        contractType: query?.contractType ?? (props.contractType || "FULLTIME"),
        avatar: randomAvatar,
    }).toString();
    return (
        <Link href={`/jobs/${jobId}?${queryString}`} className="card focus-ring relative z-0 transition-all hover:bg-[#1DB954]/10 hover:shadow-lg hover:z-20 hover:scale-[1.01] min-h-[220px]">
            <article className="grid grid-cols-[56px_minmax(0,1fr)] items-start gap-4 md:grid-cols-[56px_minmax(0,1fr)] md:gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100">
                    {props.logoUrl ? (
                        <Image src={props.logoUrl} alt={props.partnerName} width={32} height={32} className="h-8 w-8 object-contain" />
                    ) : (
                        <div className="relative">
                            <Image className="w-10 h-10 rounded-full object-cover" src={randomAvatar} alt="Avatar" width={40} height={40} />
                            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400"></span>
                        </div>
                    )}
                </div>
                <div className="min-w-0">
                    <header className="min-w-0 space-y-1 border-b border-gray-100 pb-2">
                        <h3 className="truncate text-xl font-semibold text-black" title={props.jobPositionValue}>{props.jobPositionValue}</h3>
                        <p className="truncate-muted text-[#1DB954]" title={props.partnerName}>{props.partnerName}</p>
                    </header>
                    <div className="mt-3 grid gap-4 md:grid-cols-2">
                        <div>
                            <dt className="text-purple-700 text-sm ">Description</dt>
                            <dd className="text-sm text-gray-700 line-clamp-6">{props.translatedDescription || props.description}</dd>
                        </div>
                        <dl className="grid grid-cols-2 gap-3 text-sm">
                            <div className="min-w-0 truncate">
                                <dt className="text-purple-700">Experience</dt>
                                <dd className="font-medium">{props.requiresExperience ? props.experienceYears || "Required" : "Not required"}</dd>
                            </div>
                            <div className="min-w-0 truncate">
                                <dt className="text-purple-700">City</dt>
                                <dd className="font-medium">{humanizeKey(props.city || props.cityValue)}</dd>
                            </div>
                            <div className="min-w-0 truncate">
                                <dt className="text-purple-700">Country</dt>
                                <dd className="font-medium">{humanizeKey(props.countryValue)}</dd>
                            </div>
                            <div className="min-w-0 truncate">
                                <dt className="text-purple-700">Workplace</dt>
                                <dd className="font-medium">{props.workplaceType}</dd>
                            </div>
                            <div className="min-w-0 truncate">
                                <dt className="text-[#1DB954]">Salary</dt>
                                <dd className="font-medium">{props.salary} {props.currency}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </article>
        </Link>
    );
}


