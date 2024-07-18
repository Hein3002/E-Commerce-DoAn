import { apiClient } from "../../constant/api";

export const apiGetAll = async (data: any): Promise<any> => {
    const res = await apiClient?.get(`/api/brand`);
    return res?.data;
};