import axios from "utils/axios";

export const createRating = async (rating: any) => {
    const { data } = await axios.post(`/api/shops/ratings`, rating);

    return data;
};