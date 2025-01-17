import axios from "src/utils/axios"

// export const getShopProducts = async ({ page, limit, searchQuery, sortBy, order }: any) => {
//     const { data } = await axios.get(`/api/shops/products`, { params: { pageNumber: page, pageSize: limit, searchQuery, sortBy, order } })

//     return data.data;
// }

export const initialRegister = async ({ name, countryId, email, lat, lng }: { name: string, countryId: string, email: string, lat: number, lng: number }) => {
    const { data } = await axios.post(`/api/shops/auth/initial-register`, { name, countryId, email, lat, lng })
    return data;
}

export const finalRegister = async (token: string, password: string) => {
    await axios.post(`/api/shops/auth/final-register`, { token, password })
}

export const forgotPassword = async (email: string) => {
    const { data } = await axios.post(`/api/shops/auth/forgot-password`, { email })
    return data;
}

export const restPassword = async (resetToken:string, password:string) => {
    const { data } = await axios.put(`/api/shops/auth/reset-password`, { resetToken, password })
    return data;
}


// export const updateSingleProduct = async (id: string, product: any) => {
//     await axios.patch(`/api/shops/products/${id}`, product)
// }

// export const deleteSingleProduct = async (id: string) => {
//     await axios.delete(`/api/shops/products/${id}`)
// }
