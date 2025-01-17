import axios from "src/utils/axios"

export const getCountries = async () => {
    const { data } = await axios.get(`/api/common/countries`)
    return data.data;
}


export const getPricingPlans = async () => {
    const { data } = await axios.get(`/api/admin/pricing-plan`)
    return data.data;
}
