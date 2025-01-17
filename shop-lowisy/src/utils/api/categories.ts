import axios from "utils/axios";

export const getCategories = async () => {
    const { data } = await axios.get(`/api/shops/categories/all`)
    return data.data;
};

export const getCategoriesInTreeFormat = async () => {
    const { data } = await axios.get(`/api/shops/categories/format-tree`);
    return data.data;
};

