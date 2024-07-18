import { apiServer } from "../../constant/api";

export const apiGetAll = async (data: any): Promise<any> => {
    const res = await apiServer?.get(`/api/admin/sallebill`);
    return res?.data;
};

export const apiUpdate = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/admin/sallebill`, data);
    return res?.data;
};

export const apiGetByID = async (data: any): Promise<any> => {
    const res = await apiServer?.get(`/api/admin/sallebill/` + data + '/edit');
    return res?.data;
};

export const apiUpdateByID = async (id: any, data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/admin/sallebill/` + id , data);
    return res?.data;
};