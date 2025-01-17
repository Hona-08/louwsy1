import axios from "utils/axios";

export type Register = {
    email: string
    password: string
}

export const register = async ({ email, password }: Register) => {
    const { data } = await axios.post(`/api/customers/auth/register`, { email, password });

    return data
};


export const login = async ({ email, password }: Register) => {
    const { data } = await axios.post(`/api/customers/auth/login`, { email, password });

    return data
};

export const forgotPassword = async (email: string) => {
    const { data } = await axios.post(`/api/customers/auth/forgot-password`, { email });

    return data
};


export const resetPassword = async (password: string, resetToken: string) => {
    const { data } = await axios.put(`/api/customers/auth/reset-password`, { password, resetToken });

    return data
};

export const logout = async () => {
    const { data } = await axios.post(`/api/customers/auth/logout`);

    return data
};

export const getCustomer = async () => {
    const { data } = await axios.get(`/api/customers/details`);

    return data.data;
};

export const updateCustomer = async (customer) => {
    const { data } = await axios.patch(`/api/customers/details`, customer);

    return data;
};