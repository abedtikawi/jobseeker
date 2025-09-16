import api from "@/lib/api";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";


type SearchParams = { category?: string; city?: string; experience?: string; english?: string; skip?: string; limit?: string };

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { category, city, experience, english, skip = "0", limit = "10" } = await searchParams;
  const safeLimit = Math.min(Number(limit) || 10, 10);
  const safeSkip = Math.max(Number(skip) || 0, 0);

  const jobsResponse = await api.listAllJobs(safeSkip, safeLimit, "FULLTIME")

  const categoriesSet = new Set<string>();
  const citiesSet = new Set<string>();
  jobsResponse?.data?.list?.forEach(element => {
    if (element.jobPositionValue) categoriesSet.add(element.jobPositionValue);
    if (element.city || element.cityValue) citiesSet.add(element.city || element.cityValue);
  });

  const filtered = jobsResponse?.data?.list.filter((j) => {
    if (category && j.jobPositionValue !== category) return false;
    if (city && (j.city || j.cityValue) !== city) return false;
    if (experience === "required" && !j.requiresExperience) return false;
    if (experience === "not_required" && j.requiresExperience) return false;
    if (english === "required" && !j.requiresEnglish) return false;
    if (english === "not_required" && j.requiresEnglish) return false;
    return true;
  }) || [];

  return (
    <>
      <Navbar />
      <main id="main" className="font-mono min-h-screen p-3 sm:p-4 text-black">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-center mt-10">Find Your <span className="text-[#1DB954]">Dream Job</span></h1>
          <p className="text-sm text-gray-500 text-center">Find the perfect job for you</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4 ">
          <div className="flex-row md:col-span-1 h-full p-3 rounded-md md:sticky md:top-20 md:self-start md:max-h-[calc(100vh-5rem)] md:overflow-auto md:z-40 bg-white border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold ">Filters</h2>
            <Filters
              categories={Array.from(categoriesSet).sort()}
              cities={Array.from(citiesSet).sort()}
              initial={{ category, city, experience, english }}
            />
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
