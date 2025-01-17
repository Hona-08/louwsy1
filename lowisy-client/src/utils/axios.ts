import axios from 'axios';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

//const axiosInstance: any = axios.create({ baseURL: 'https://uat-api.lowisy.com' });

const axiosInstance: any = axios.create({ baseURL: 'http://localhost:3001' });

//axiosInstance.defaults.headers.common['Accept-Language'] = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : 'en';

export const setLanguageCode = (languageCode: any) => {
  if (!languageCode) {
    axiosInstance.defaults.headers.common['Accept-Language'] = languageCode;
  } else {
    axiosInstance.defaults.headers.common['Accept-Language'] =
      typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : 'en';
  }
};

axiosInstance.interceptors.response.use(
  (response: any) => response,
  async (error: any) =>
    Promise.reject(
      (error.response && error.response.data && error.response.data.message && error) ||
        'Something went wrong'
    )
);

export default axiosInstance;
