import axios from "utils/axios";


export const getRestaurants = async ({ sortBy, searchQuery }: any) => {
    const { data } = await axios.get(`/api/shops`, { params: { sortBy, searchQuery } });

    return data.data;
};

export const getRestaurantsByLatLng = async ({ sortBy, searchQuery, lat, lng, radiusInKm, filterValues }: any) => {
    const { data } = await axios.get(`/api/shops/lat-lng`, { params: { sortBy, searchQuery, lat, lng, radiusInKm, filterValues } });

    return data.data;
};

export const getRestaurant = async (id: string) => {
    const { data } = await axios.get(`/api/shops/${id}`);

    return data.data;
};

export const getVoucherCode = async (discountCode: string, restaurantId: string, email: string) => {
    const { data } = await axios.get(`/api/customers/discount/${discountCode}`, { params: { restaurantId, email } });

    return data.data;
};

export const getRestaurantBySlug = async (id: string) => {
    const { data } = await axios.get(`/api/shops/${id}/details`);

    return data.data;
};