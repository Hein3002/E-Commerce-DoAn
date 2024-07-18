import { apiServer } from "../../constant/api";

export const apiPostData = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/addToCart`,data);
    return res?.data;
};   

export const apiGetData = async (data: any): Promise<any> => {
    const res = await apiServer?.get(`/api/getToCart/` + data);
    return res?.data;
};

export const apiUpdateData = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/updateCart`,data);
    return res?.data;
};   

export const apiDeleteData = async (data: any): Promise<any> => {
    const res = await apiServer?.delete(`/api/deleteCart/` + data);
    return res?.data;
};   