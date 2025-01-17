import axios from 'src/utils/axios';

export const getOrders = async ({ page, limit, searchQuery, sortBy, order, filterStatus }: any) => {
  const { data } = await axios.get(`/api/shops/orders`, {
    params: { pageNumber: page, pageSize: limit, searchQuery, sortBy, order, filterStatus },
  });

  return data.data;
};
export const getOrder = async (id: string) => {
  const { data } = await axios.get(`/api/shops/orders/${id}`);
  return data.data;
};

export const getOrderStatus = async () => {
  const { data } = await axios.get(`/api/shops/orders/status`);
  return data.data;
};

export const createOrder = async (order: any) => {
  const { data } = await axios.post(`/api/shops/orders`, order);
  return data;
};

export const updateOrder = async (id: string, status: string) => {
  const { data } = await axios.patch(`/api/shops/orders/${id}`, { status });
  return data;
};

export const deleteOrder = async (id: string) => {
  const { data } = await axios.delete(`/api/shops/orders/${id}`);
  return data;
};

export const getTotalOrders = async () => {
  const { data } = await axios.get('/api/shops/orders/orders-count/total-orders');
  const ordersCount = data.data[0];
  return ordersCount;
};
export const getPendingOrders = async () => {
  const { data } = await axios.get('/api/shops/orders/orders-count/total-pending-orders');
  const pendingCount = data.data[0];
  return pendingCount;
};

export const getTodayOrders = async () => {
  const { data } = await axios.get('/api/shops/orders/orders-count/total-today-orders');
  return data.data;
};
