
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSnackbar } from 'notistack';
import axios from "src/utils/axios"
import { toast } from "react-hot-toast";
import { Stack } from "immutable";

type Props = {
    plan_id?: string
    discount_id?: string
    redirectUrl?: string
};

function PayPalPayment({ plan_id, discount_id, redirectUrl }: Props) {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter()

    const createOrder = (data: any) => {
        const plan_id = localStorage.getItem('planId')
        const discount_id = localStorage.getItem('discountId')
        // Order is created on the server and the order id is returned
        return axios.post("/api/paypal/create-order", {
            product: {
                name: '1 Month Plan',
                description: "Buy 1 Month license subscription",
                quantity: 1,
                plan_id,
                discount_id
            },
        })
            .then((response: any) => response.data.order.id)
            .catch((err: any) => {
                // console.log({ err })
                enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong !!', { variant: 'error' })
            });


    };
    const onApprove = (data: any) => 
        
        //Order is captured on the server and the response is returned to the browser
         axios.post(`/api/paypal/capture-order/${data.orderID}`)
            .then((response: any) => {
                // console.log({ status: response.status, response })
                if (response.status == 200) {
                    router.push(`${redirectUrl}?order_id=${data.orderID}`)
                }
                else {
                    toast.error('Something went wrong !!')
                }
            })
            .catch((err: any) => {
                // console.log({ err })
                enqueueSnackbar(err?.response?.data?.message ?? 'Something went wrong !!', { variant: 'error' })
            })
    ;

    useEffect(() => {
        localStorage.setItem('planId', plan_id as string)
        localStorage.setItem('discountId', discount_id as string)

        return (() => {
            localStorage.removeItem('planId')
            localStorage.removeItem('discountId')
        })
    }, [plan_id, discount_id])

    return (
        <>
            <PayPalButtons
                createOrder={(data: any, actions: any) => createOrder(data)}
                onApprove={(data: any, actions: any) => onApprove(data)}
                //onError={() => { enqueueSnackbar('Something went wrongggggggg !!', { variant: 'error' }); }}
                onCancel={() => { enqueueSnackbar('Payment Cancelled', { variant: 'info' }); }}
                disabled={plan_id == undefined && !router.asPath.includes('/onboarding')}
            />
        </>
    );
}

export default PayPalPayment;
