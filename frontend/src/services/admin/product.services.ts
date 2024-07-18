import { apiServer } from "../../constant/api";

export const apiGetAll = async (data: any): Promise<any> => {
    const res = await apiServer?.get(`/api/admin/product`);
    return res?.data;
};

export const apiGetByID = async (id: any): Promise<any> => {
    const res = await apiServer?.get(`/api/admin/product/` + id + `/edit`);
    return res?.data;
};

export const apiCreate = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/admin/product/`, data);
    return res?.data;
};

export const apiUpdate = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/admin/product/` + id, data);
    return res?.data;
};

export const apiDelete = async (id: any): Promise<any> => {
    const res = await apiServer?.delete(`/api/admin/product/` + id);
    return res?.data;
};