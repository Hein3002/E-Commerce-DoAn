import { apiServer } from "../../constant/api";

export const apiPostData = async (data: any): Promise<any> => {
    const res = await apiServer?.post(`/api/order`, data);
    return res?.data;
};

export const apiGetData = async (data: any): Promise<any> => {
    const res = await apiServer?.get(`/api/orderDeatil/` + data);
    return res?.data;
};