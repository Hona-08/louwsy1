import { Delete, KeyboardArrowDown } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { FlexBetween, FlexBox } from './../../../../components/flex-box';
import { H5, H6, Paragraph, Span } from './../../../../components/Typography';
import React, { useEffect, useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { fDate } from 'src/utils/formatTime';
import { lowisy_s3_url } from 'src/constants/constant';
import { Mutation, useMutation } from '@tanstack/react-query';
import { updateOrder } from 'src/api/order';
import { toast } from 'react-hot-toast';
import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useRouter } from 'next/router';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// list data
const products = [
  {
    price: '$250',
    published: true,
    id: '#6ed34Edf65d',
    category: 'Gadgets',
    name: 'Samsung Galaxy-M1',
    brand: '/assets/images/brands/samsung.png',
    image: '/assets/images/products/samsung.png',
  },
  {
    price: '$10',
    published: true,
    id: '#6ed34Edf65d',
    category: 'Grocery',
    name: 'Tomatto',
    brand: '/assets/images/brands/brokshire.png',
    image: '/assets/images/products/tomato.png',
  },
  {
    price: '$24',
    published: false,
    id: '#6ed34Edf65d',
    category: 'Beauty',
    name: 'Boston Round Cream Pack',
    brand: '/assets/images/brands/levis.png',
    image: '/assets/images/products/beauty-cream.png',
  },
];

type Props = {
  order: any;
  orderStatus: any;
};

export default function OrderDetailsSummary({ order, orderStatus, ...other }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();

  const [status, setStatus] = useState()
  const { id, totalCost, createdAt, inputDetails, shippingAddress, klarnaReferenceId } = order;

  const mutation = useMutation((values: any) => updateOrder(id, values), {
    onSuccess(data) {
      //console.log(data)
      enqueueSnackbar(data.message)
      push(PATH_DASHBOARD.menu.orders.list);
    },
    onError(err) {
      //console.log({ err })
    }
  })

  const checkAlreadyDelivered = orderStatus?.some((item: any) => item.name === 'Delivered' && item.id === order.orderStatusId)



  const handleSubmit = () => {
    mutation.mutate(status)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ p: 3 }}>
          <FlexBox alignItems="center" gap={4}>
            <Paragraph>
              <Span color="grey.600">Order ID:</Span> {id}
            </Paragraph>

            <Paragraph>
              <Span color="grey.600">Placed on:</Span> {fDate(createdAt)}
            </Paragraph>
          </FlexBox>

          <FlexBox gap={3} my={3} flexDirection={{ sm: 'row', xs: 'column' }}>
            {/* <TextField
              fullWidth
              color="info"
              size="medium"
              variant="outlined"
              label="Add Product"
              placeholder="Type product name"
            /> */}

            {!checkAlreadyDelivered && <FormControl fullWidth>
              <InputLabel id="location">Order Status</InputLabel>
              <Select
                labelId="Order Status"
                id="status"
                fullWidth
                label="Order Location"
                name="status"
                onChange={(e: any) => {
                  setStatus(e.target.value)
                }}
                required
              >
                {orderStatus?.filter((item: any) => item.name !== 'Placed')?.map((item: any) => (
                  <MenuItem value={item.id} key={status ?? item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>}
          </FlexBox>

          {inputDetails &&
            inputDetails.map((item: any, index: any) => (
              <Box
                my={2}
                gap={2}
                key={index}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { md: '1fr 1fr', xs: '1fr' },
                }}
              >
                <FlexBox flexShrink={0} gap={1.5} alignItems="center">
                  <Avatar
                    src={lowisy_s3_url + item.imgUrl}
                    sx={{ height: 64, width: 64, borderRadius: '8px' }}
                  />

                  <Box>
                    <H6 mb={1}>{item.name}</H6>

                    <FlexBox alignItems="center" gap={1}>
                      <Paragraph fontSize={14} color="grey.600">
                        {item.price} x
                      </Paragraph>

                      <Box maxWidth={60}>
                        <TextField defaultValue={item.qty} type="number" fullWidth disabled />
                      </Box>
                    </FlexBox>
                  </Box>
                </FlexBox>

                <FlexBetween flexShrink={0}>
                  {/* <Paragraph color="grey.600">Product properties: Black, L</Paragraph> */}

                  <IconButton>
                    {/* <Delete sx={{ color: 'grey.600', fontSize: 22 }} /> */}
                  </IconButton>
                </FlexBetween>
              </Box>
            ))}
        </Card>
      </Grid>

      <Grid item md={6} xs={12}>
        <Card sx={{ px: 3, py: 4 }}>
          <TextField
            rows={5}
            multiline
            fullWidth
            color="info"
            variant="outlined"
            label="Shipping Address"
            defaultValue={`${shippingAddress?.address1} ${shippingAddress?.address2}`}
            sx={{ mb: 4 }}
            disabled
          />

          {/* <TextField
            rows={5}
            multiline
            fullWidth
            color="info"
            variant="outlined"
            label="Customer’s Note"
            defaultValue="Please deliver ASAP."
            disabled
          /> */}
        </Card>
      </Grid>

      <Grid item md={6} xs={12}>
        <Card sx={{ px: 3, py: 4 }}>
          <H5 mt={0} mb={2}>
            Total Summary
          </H5>
          <Divider sx={{ my: 2 }} />

          <FlexBetween mb={2}>
            <H6>Total</H6>
            <H6>€{totalCost}</H6>
          </FlexBetween>

          {
            klarnaReferenceId ? <Paragraph>Paid by Klarna</Paragraph> : <Paragraph>Paid by Cash</Paragraph>
          }

        </Card>
      </Grid>

      {!checkAlreadyDelivered && <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!status}>
          Save Changes
        </Button>
      </Grid>}
    </Grid>
  );
}
