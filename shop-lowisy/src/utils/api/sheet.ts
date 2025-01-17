import axios from "utils/axios";


export const saveContactUs = async (reqData) => {
    const { data } = await axios.post(`/api/common/contact-us`, reqData);

    return data;
};

export const contactRestaurant = async (reqData) => {
    const { data } = await axios.post(`/api/common/contact-us`, reqData);

    return data;
};

export const saveRecommendedRestaurant = async (reqData) => {
    const { data } = await axios.post(`/api/common/recommend-restaurant`, reqData);

    return data;
};