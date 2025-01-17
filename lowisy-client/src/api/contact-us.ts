import { ContactUs } from 'src/@types/contact-us';
import axios from 'src/utils/axios';

export const createContactUs = async (contactUsDetails: ContactUs) => {
  //console.log('Contact Us details', contactUsDetails);
  const { data } = await axios.post(`/api/shops/contact-us`, contactUsDetails);
  return data;
};

export const getAllContactUs = async ({ page, limit, searchQuery, sortBy, order }: any) => {
  const { data } = await axios.get(`api/shops/contact-us`, {
    params: { pageNumber: page, pageSize: limit, searchQuery, sortBy, order },
  });
  //console.log('GET ALL CONTACT US', data);
  return data.data;
};

export const getSingleContactUs = async (id: string) => {
  const { data } = await axios.get(`api/shops/contact-us/${id}`);

  return data.data;
};

export const updateContactUs = async (id: string, contactUs: any) => {
  //console.log('Update triggered');
  //console.log('id', id);
  //console.log('contactUs', contactUs);
  const { data } = await axios.patch(`api/shops/contact-us/${id}`, contactUs);
  return data;
};
export const deleteContactUs = async (contactUsId: string) => {
  await axios.delete(`api/shops/contact-us/${contactUsId}`);
};
