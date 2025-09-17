import apiClient from "./axios";
import { ENDPOINTS } from "@/shared/constants/endpoints";
import type { IResponseJobList, IResponseJobById, ExperienceRequired, WorkplaceType, ContractType } from "@/shared/constants/types";


export async function listAllJobs(skip: number, limit: number, contractType?: ContractType, workplaceType?: WorkplaceType, experienceRequired?: ExperienceRequired) {
    try {
        const safeLimit = Math.min(limit, 10);
        const params: Record<string, unknown> = { skip, limit: safeLimit };
        if (contractType) params.contractType = contractType;
        if (workplaceType) params.workplaceType = workplaceType;
        if (experienceRequired) params.noExperienceRequired = experienceRequired;
        const response = await apiClient.get<IResponseJobList>(ENDPOINTS.LIST_JOBS, { params });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getJobById(id: string) {
    try {
        const response = await apiClient.get<IResponseJobById>(`${ENDPOINTS.LIST_JOB_BY_ID}/${id}`);
        const job = response.data?.data;
        return job;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const api = {
    listAllJobs,
    getJobById,
};

export default api;


