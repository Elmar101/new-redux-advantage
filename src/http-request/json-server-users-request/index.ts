import axios, { AxiosResponse } from "axios";

export interface IJsonServerUser {
    id: string;
    name: string;
    img: string;
};

const url = "http://localhost:8080/users";

// Fetch Users 
export const getJsonServerUserList = (): Promise<AxiosResponse<IJsonServerUser[]>> => {
    return axios.get<IJsonServerUser[]>(url);
};