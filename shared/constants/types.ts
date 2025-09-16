export type ContractType = "FULLTIME" | "PARTTIME";
export type FiltersProps = {
    categories: string[];
    cities: string[];
    initial: {
        category?: string;
        city?: string;
        experience?: string;
        english?: string;
    };
};
export interface IResponseJobList {
    status: string;
    data: {
        list: Job[];
        pagesCount: string;
        jobsCount: string;
    };
}
export interface IResponseJobById {
    status: string;
    data: Job;
}

export type Job = {
    id: string;
    partnerName: string;
    partnerTranslatedName: string;
    partnerNameOriginalLanguage: string;
    partnerSlug: string;
    logoUrl: string;
    coverImageUrl: string;
    position: string;
    jobPositionValue: string;
    jobPositionSeoValue: string;
    jobPositionSlug: string;
    salary: number;
    maxSalary: number;
    salaryNote: string;
    currency: string;
    salaryFrequency: string;
    description: string;
    translatedDescription: string;
    originalDescriptionLanguage: string;
    contractType: ContractType;
    requiresHealthCard: boolean;
    requiresExperience: boolean;
    experienceYears: string;
    requiresGosi: boolean;
    requiresEnglish: boolean;
    saudisOnly: boolean;
    gender: string;
    isEnvironmentForFemalesOnly: boolean;
    address: string;
    city: string;
    cityValue: string;
    country: string;
    countryValue: string;
    districtValue: string;
    showDistrict: boolean;
    categoriesV2: string[];
    createdDate: number;
    isFirstApplicant: boolean;
    isNew: boolean;
    jobStatus: string;
    workplaceType: string;
    source: string;
    shouldCloseAt: number;
    postalCode: string;
};


