import router from 'next/router';
import axios from 'src/utils/axios';

export const getBaseLine = async () => {
  const { data } = await axios.get('/api/shops/settings/baseline');
  return data.data;
};

export const updateBaseline = async (baseline: any) => {
  const { data } = await axios.patch('/api/shops/settings/baseline', baseline);
  return data;
};

export const getCountries = async () => {
  const { data } = await axios.get('/api/common/countries');
  return data.data;
};

export const getCategory = async () => {
  const { data } = await axios.get('/api/shops/categories/all');
  return data.data;
};

export const getBranding = async () => {
  const { data } = await axios.get('/api/shops/settings/branding');
  return data.data;
};

export const updateBranding = async (branding: any) => {
  const { data } = await axios.patch('/api/shops/settings/branding', branding);
  return data;
};

export const getPaymentMethodsOfShop = async () => {
  const { data } = await axios.get('/api/shops/payment-method');
  return data.data;
};

export const getPaymentMethods = async () => {
  const { data } = await axios.get('/api/shops/payment-method/payments');
  return data.data;
};

export const updatePaymentMethods = async (paymentMethodIds: string[]) => {
  const { data } = await axios.patch(`/api/shops/payment-method`, { paymentMethodIds });
  return data;
};

export const updatePolicy = async (policy: any) => {
  // const paymentId = router.query.paymentId;
  const { data } = await axios.patch(`/api/shop/policy/policy`, policy);
  return data;
};
// export const updateSingleProduct = async (id: string, product: any) => {
//     await axios.patch(`/api/shops/products/${id}`, product)
// }

export const getPolicies = async () => {
  const { data } = await axios.get('/api/shop/policy');
  return data.data;
};

export const getDelivery = async () => {
  const { data } = await axios.get('/api/shops/logistics');
  return data.data;
};
type UpdateDeliveryOption = {
  deliveryOptionsIds: any;
  shippingCost?: number | null;
  minimumOrder: number;
  operatingSchedule?:any;
  //openingTime: string;
  //closingTime: string;
  shippingType: string;
  days: string[]
};
export const updateDelivery = async ({
  deliveryOptionsIds,
  minimumOrder,
  shippingCost,
  operatingSchedule,
  //openingTime,
  //closingTime,
  shippingType,
  days
}: UpdateDeliveryOption) => {
  //console.log('Inside updateDelivery api');
  //console.log(deliveryOptionsIds);
  //console.log(shippingCost);
  //console.log(minimumOrder);
  //console.log(openingTime);
  //console.log(closingTime);

  const { data } = await axios.patch(`/api/shops/logistics`, {
    deliveryOptionsIds,
    minimumOrder,
    shippingCost,
    //openingTime,
    //closingTime,
    shippingType,
    operatingSchedule,
    days
  });
  return data;
};

export const getDeliveryName = async () => {
  const { data } = await axios.get('/api/delivery/delivery-name');
  return data.data;
};

export const payViaKlarna = async (payload: { planId: string, code: string }) => {
  const { data } = await axios.post('/api/shops/buy-plan', payload);
  return data;
};

export const payViaKlarnaOnBoarding = async () => {
  const { data } = await axios.post('/api/shops/onboarding-ui');
  return data;
};

export const payViaKlarnaOnBoardingEntry = async () => {
  const { data } = await axios.post('/api/shops/onboarding');
  return data;
};

export const payViaPaypalOnBoardingEntry = async () => {
  const { data } = await axios.post('/api/paypal/onboarding-shop');
  return data;
};

export const fetchKlarnaOrder = async (orderId: string) => {
  const { data } = await axios.post(`/api/shops/buy-plan/${orderId}`,);
  return data;
}

export const fetchPaypalOrder = async (orderId: string) => {
  const { data } = await axios.post(`/api/paypal/buy-shop-plan-success/${orderId}`);
  return data;
}

