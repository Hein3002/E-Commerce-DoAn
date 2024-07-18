import { apiServer } from "../../constant/api";

export const apiGetAll = async (data: any): Promise<any> => {
    const res = await apiServer?.get(`/api/admin/category`);
    return res?.data;
};

export const apiGetByID = async (data: any): Promise<any> => {
    const res = await apiServer?.get(`/api/admin/category/` + data + `/edit`);
    return res?.data;
};

export const apiCreate = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/admin/category/`, data);
    return res?.data;
};

export const apiUpdate = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/admin/category/` + id, data);
    return res?.data;
};

export const apiDelete = async (id: any): Promise<any> => {
    const res = await apiServer?.delete(`/api/admin/category/` + id);
    return res?.data;
};