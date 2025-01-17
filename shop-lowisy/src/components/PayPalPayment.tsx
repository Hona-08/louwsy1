
import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-hot-toast";
import axios from "utils/axios";
import { CartItem, useAppContext } from "contexts/AppContext";
function PayPalPayment({ discountId }: any) {
    const { state } = useAppContext();
    const cartList: CartItem[] = state.cart;
    const router = useRouter()
    const createOrder = (data: any) => {
        const orderPrice = getTotalPrice()
        const discountId = localStorage.getItem('discountId')
        // Order is created on the server and the order id is returned
        return axios.post("/api/paypal/create-restaurant-order", {
            orderPrice,
            discountId
        })
            .then((response: any) => response.data.order.id)
    };



    const onApprove = (data: any) => {
        //Order is captured on the server and the response is returned to the browser
        return axios.post(`/api/paypal/capture-order/${data.orderID}`)
            .then((response: any) => {
                if (response.status == 200) {
                    router.push(`/order-confirmation-paypal?order_id=${data.orderID}`)
                }
                else {
                    toast.error('Something went wrong !!')
                }
            });
    };

    const getTotalPrice = () => {
        return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
    };

    useEffect(() => {
        localStorage.setItem('discountId', discountId)

        return (() => {
            localStorage.removeItem('discountId')
        })
    }, [discountId])

    return (
        <>
            <PayPalButtons
                createOrder={(data: any, actions: any) => createOrder(data)}
                onApprove={(data: any, actions: any) => onApprove(data)}
                onError={() => { toast.error('Something went wrong !!') }}
                onCancel={() => { toast.error('Payment Cancelled') }}
            />
        </>
    );
}

export default PayPalPayment;
