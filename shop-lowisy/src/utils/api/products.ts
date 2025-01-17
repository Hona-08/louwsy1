import axios from "utils/axios";

export const getFeaturedProducts = async () => {
  const { data } = await axios.get(`/api/shops/products/featured`);

  return data.data;
};

export const getNewProducts = async () => {
  const { data } = await axios.get(`/api/shops/products/featured?latest=true`);

  return data.data;
};

export const getSearchProducts = async (productName: string | string[], sortedBy?: string) => {
  const { data } = await axios.get(
    `/api/shops/products/search?productName=${productName}`, { params: { sortedBy } }
  );

  return data.data;
};

export type GetShopProducts = {
  shopId: string | string[]
  sortBy: string
  searchQuery: string
  filterValues: any
}

export const getShopProducts = async ({ shopId, sortBy, searchQuery, filterValues }: GetShopProducts) => {
  const { data } = await axios.get(
    `/api/shops/${shopId}/products`, { params: { sortBy, searchQuery, filterValues } }
  );

  return data.data;
};

export const getProduct = async (id: string) => {
  const { data } = await axios.get(`/api/shops/products/${id}`);

  return data.data;
};
