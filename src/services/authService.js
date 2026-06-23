import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export const loginUser = async (credentials) => {
    const response = await axios.post(
        `${BASE_URL}/auth/login`,
        credentials
    );

    return response.data;
};