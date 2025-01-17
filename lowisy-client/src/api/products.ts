import axios from 'src/utils/axios';

export const getTotalNumberOfProducts = async () => {
  const { data } = await axios.get(`/api/shops/products/total-products`);
  //console.log('api data', data.data);
  return data;
};

export const getShopProducts = async ({
  page,
  limit,
  searchQuery,
  sortBy,
  order,
  filterStatus,
}: any) => {
  const { data } = await axios.get(`/api/shops/products`, {
    params: { pageNumber: page, pageSize: limit, searchQuery, sortBy, order, filterStatus },
  });

  return data.data;
};
export const getSingleProduct = async (id: string) => {
  const { data } = await axios.get(`/api/shops/products/${id}`);
  return data.data;
};

export const createSingleProduct = async (product: any) => {
  const { data } = await axios.post(`/api/shops/products`, product);
  return data;
};

export const updateSingleProduct = async (id: string, product: any) => {
  const { data } = await axios.patch(`/api/shops/products/${id}`, product);
  return data;
};

export const importProductsData = async (file: any) => {
  const { data } = await axios.post(`/api/shops/products/upload`, file);
  return data;
};

export const deleteSingleProduct = async (id: string) => {
  const { data } = await axios.delete(`/api/shops/products/${id}`);
  return data;
};
export const getShopProductsByShopId = async (id: string) => {
  const { data } = await axios.get(`/api/shop/${id}/products`);

  return data.data;
};

export const deleteBulkProducts = async (ids: string) => {
  const { data } = await axios.patch(`/api/shops/products/delete-selected-ids`, { ids });
  return data;
};

export const archiveBulkProducts = async (ids: string) => {
  const { data } = await axios.patch(`/api/shops/products/archive-selected-ids`, { ids });
  return data;
};

// export const getShopProductByShopId = async (id: string) => {
//   const { data } = await axios.get(`/api/shop/${id}/products`);

//   return data.data;
// };

export const getShopDetailsById = async (id: string) => {
  const { data } = await axios.get(`/api/shops/${id}`);
  //console.log('data', data);
  return data;
};

export const getShopProductByProductName = async (id: string, productName: string) => {
  //console.log(`CALLING /api/shop/${id}/product/${productName}`);
  const { data } = await axios.get(`/api/shop/${id}/product/${productName}`);
  //console.log('data.data[0]', data.data[0]);

  return data.data[0];
};
