import { axiosRequest } from "./utils/axios";

import { API_BASE } from "../Constants";
export const login = async (user) => {
    console.log(user)
    const response = await axiosRequest.post(`${API_BASE}/signin/`, user);
    console.log("data is")
    console.log(response)
    return response;
}

export const getUser = async () => {
    console.log("get user")
    const response = await axiosRequest.get(`${API_BASE}/user/`)
    console.log(response, 'get user')
    return response.data
}

