import api from "@/lib/api";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";
import { ExperienceRequired, WorkplaceType, ContractType } from "@/shared/constants/types";


type SearchParams = { experience?: string; workplaceType?: WorkplaceType; contractType?: ContractType; skip?: string; limit?: string };

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { experience, workplaceType, contractType, skip = "0", limit = "10" } = await searchParams;
  const safeLimit = Math.min(Number(limit) || 10, 10);
  const safeSkip = Math.max(Number(skip) || 0, 0);

  const noExperienceRequired: ExperienceRequired = experience === "not_required" ? "true" : "false";
  const jobsResponse = await api.listAllJobs(
    safeSkip,
    safeLimit,
    contractType,
    workplaceType,
    noExperienceRequired,
  );

  

  const filtered = jobsResponse?.data?.list || [];

  return (
    <>
      <Navbar />
      <main id="main" className="font-mono min-h-screen p-3 sm:p-4 text-black">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-center mt-10 text-purple-700">Find Your <span className="text-[#1DB954]">Dream Job</span></h1>
          <p className="text-sm text-gray-500 text-center">Find the perfect job for you</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4 ">
          <div className="flex-row md:col-span-1 h-full p-3 rounded-md md:sticky md:top-20 md:self-start md:max-h-[calc(100vh-5rem)] md:overflow-auto md:z-40 bg-white border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-[#1DB954] ">Filters</h2>
            <Filters initial={{ experience }} />
            <div className="mt-4 rounded-md border border-gray-200 p-2 text-sm">
              <p className="text-gray-600">Total jobs</p>
              <p className="font-semibold">{jobsResponse?.data?.jobsCount ?? 0}</p>
            </div>
          </div>
          <div className="flex flex-col md:col-span-3 h-full gap-4">
            {filtered.map((job) => (
              <Card props={job} key={job.id} query={{ skip: String(safeSkip), limit: String(safeLimit), contractType: job.contractType }} />
            ))}
            <Pagination />
          </div>
        </div>
      </main>
    </>
  );
}
