import { apiClient, apiServer } from "../constant/api";

export const apiCsrf = async(): Promise<any> =>  {
    const res = await apiClient?.get(`/sanctum/csrf-cookie`);
    return res;
}

export const apiLogin = async (data: any): Promise<any> => {
    const res = await apiClient?.post(`/api/login`, data);
    return res?.data;
};

export const apiRegister = async (data: any): Promise<any> => {
    const res = await apiClient?.post(`/api/register`, data);
    return res?.data;
};

export const apiLogout = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/logout`);
    return res?.data;
};