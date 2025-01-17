import React, { FC, useState } from 'react';
import { Grid, TextField, Button, Card, Typography } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { findMyOrder } from 'utils/api/order';
import toast from 'react-hot-toast';
import { FlexBox } from 'components/flex-box';
import { Paragraph, Span } from 'components/Typography';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';



const OrderTrackingForm = () => {
    const { t } = useTranslation("common");
    const [orderNumber, setOrderNumber] = useState('');
    const [email, setEmail] = useState('');
    const [displayStatus, setDisplayStatus] = useState(false)
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        await mutation.mutate();
    };

    const mutation = useMutation(() => findMyOrder(orderNumber, email), {
        onSuccess(data) {
            setDisplayStatus(true)
            // setOrderNumber('')
            // setEmail('')
        },
        onError(err: any) {
            setDisplayStatus(false)
            toast.error(err.response.data.message);
        },
    });

    return (
        <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        type="text"
                        placeholder="eg:YJoPPovnS"
                        label={t("order-number")}
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        type="email"
                        placeholder="email"
                        label={t("email-address")}
                        InputLabelProps={{
                            shrink: true
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button type="submit" variant="contained" color="primary" style={{ textTransform: 'none' }}>
                        {t("find-my-order")}
                    </Button>
                </Grid>
                {displayStatus && <Card sx={{ p: 6, m: 2, backgroundColor: 'white' }}>
                    <FlexBox alignItems="center" gap={3}>
                        <Paragraph>
                            <Span color="grey.600"><strong>Your Order</strong></Span>
                        </Paragraph>
                        <Paragraph>
                            <Span color="grey.600">Status</Span> <strong> {mutation.data?.data.status}</strong>
                        </Paragraph>
                        <Paragraph>
                            <Span color="grey.600">Delivery time</Span>{" "}
                            <strong>
                                {(mutation.data?.data.pickupTime)}
                            </strong>
                        </Paragraph>
                    </FlexBox>
                </Card>}
            </Grid>
        </form>
    );
};

export default OrderTrackingForm;
