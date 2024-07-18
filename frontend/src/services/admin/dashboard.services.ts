import { apiServer } from "../../constant/api";

export const apiGetData = async (data: any): Promise<any> => {
    const res = await apiServer?.get(`/api/admin/dashboard`);
    return res?.data;
};