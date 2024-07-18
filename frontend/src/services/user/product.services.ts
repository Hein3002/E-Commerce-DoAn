import { apiClient } from "../../constant/api";

export const apiGetLatest = async (data: any): Promise<any> => {
    const res = await apiClient?.get(`/api/latestProduct`);
    return res?.data;
};

export const apiGetAll = async (data: any): Promise<any> => {
    const res = await apiClient?.get(`/api/product/` + data);
    return res?.data;
};

export const apiGetByID = async (data: any): Promise<any> => {
    const res = await apiClient?.get(`/api/detail/` + data);
    return res?.data;
};
export const apiSuggest = async (data: any): Promise<any> => {
    const res = await apiClient?.post(`/api/suggest` , data);
    return res?.data;
};
export const apiProCat = async (data: any): Promise<any> => {
    const res = await apiClient?.post(`/api/proOfCat` , data);
    return res?.data;
};