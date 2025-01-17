import axios from 'src/utils/axios';

export const getTotalNoOfCategories = async () => {
  const { data } = await axios.get(`api/shops/categories/total-categories`);
  return data.data;
};
export const getCategories = async ({
  page,
  limit,
  searchQuery,
  sortBy,
  order,
  filterStatus,
}: any) => {
  const { data } = await axios.get(`/api/shops/categories`, {
    params: { pageNumber: page, pageSize: limit, searchQuery, sortBy, order, filterStatus },
  });

  return data.data;
};

export const getCategoriesInTreeFormat = async () => {
  const { data } = await axios.get(`/api/shops/categories/format-tree`);
  return data.data;
};

export const getCategory = async (id: string, filterStatus: string) => {
  const { data } = await axios.get(`/api/shops/categories/${id}`, {
    params: { filterStatus },
  });
  return data.data;
};

export const createCategory = async (category: any) => {
  const { data } = await axios.post(`/api/shops/categories`, category);
  return data;
};

export const updateCategory = async (id: string, category: any) => {
  const { data } = await axios.patch(`/api/shops/categories/${id}`, category);
  return data;
};

export const deleteCategory = async (id: string) => {
  const { data } = await axios.delete(`/api/shops/categories/${id}`);
  return data;
};

export const deleteBulkCategories = async (ids: string) => {
  const { data } = await axios.patch(`/api/shops/categories/delete-selected-ids`, { ids });
  return data;
};

export const archiveBulkCategories = async (ids: string) => {
  const { data } = await axios.patch(`/api/shops/categories/archive-selected-ids`, { ids });
  return data;
};

export const importCategoriesData = async (file: any) => {
  const { data } = await axios.post(`/api/shops/categories/upload`, file);
  return data;
};

export const importSubCategoriesData = async (file: any, categoryId: string) => {
  const { data } = await axios.post(`/api/shops/categories/${categoryId}/upload`, file);
  return data;
};

export const exportCategories = async (ids: string) => {
  const { data } = await axios.get(`/api/shops/categories/export-all`, { ids });
  return data;
};
