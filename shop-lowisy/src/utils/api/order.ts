import axios from "utils/axios";

export const getOrders = async ({ page, limit }: any) => {
    const { data } = await axios.get(`/api/customers/orders`,
        {
            params: { pageNumber: page, pageSize: limit },
        }
    );

    return data.data;
};
export const getOrder = async (id: string) => {
    const { data } = await axios.get(`/api/customers/orders/${id}`);
    return data.data;
};

export const getAddresses = async () => {
    const { data } = await axios.get(`/api/customers/addresses`);
    return data.data;
};

export const createOrder = async (order: any) => {
    const { data } = await axios.post(`/api/shops/orders`, order);
    return data
};

export const saveShippingAddress = async (address: any) => {
    const { data } = await axios.post(`/api/shops/orders/shipping-address`, { address });
    return data
};

export const findMyOrder = async (orderNo: string, email: string) => {
    const { data } = await axios.get(`/api/shops/orders/find-my-order`, { params: { orderNo, email } });
    return data
};

export const updateOrder = async (id: string, order: any) => {
    const { data } = await axios.patch(`/api/shops/orders/${id}`, order);
    return data;
};

export const deleteOrder = async (id: string) => {
    const { data } = await axios.delete(`/api/shops/orders/${id}`);
    return data;
};

export const getKlarnaUi = async (order: any) => {
    const { data } = await axios.post(`/api/customers/orders`, order);
    return data;
};
