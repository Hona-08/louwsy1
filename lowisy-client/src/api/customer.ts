import axios from 'src/utils/axios';

export const getShopCustomers = async ({ page, limit, searchQuery, sortBy, order }: any) => {
    const { data } = await axios.get(`/api/shops/customers`, {
        params: { pageNumber: page, pageSize: limit, searchQuery, sortBy, order },
    });

    return data.data;
};

export const getCustomerOrders = async ({ page, limit, searchQuery, sortBy, order, customerId }: any) => {
    const { data } = await axios.get(`/api/shops/customers/${customerId}/orders`, {
        params: { pageNumber: page, pageSize: limit, searchQuery, sortBy, order },
    });

    return data.data;
};

export const getCustomer = async (id: string) => {
    const { data } = await axios.get(`/api/shops/customers/${id}`);
    return data.data;
};