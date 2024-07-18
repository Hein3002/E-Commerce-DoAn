import { apiServer } from "../../constant/api";

export const apiGetAll = async (
    data: any,
): Promise<any> => {
    const res = await apiServer?.get(`/api/user`);
    return res?.data;
};