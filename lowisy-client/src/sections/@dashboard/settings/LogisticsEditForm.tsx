import * as Yup from 'yup';
import dayjs from 'dayjs';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
  Alert,
  TextField,
  MenuItem,
  InputAdornment,
} from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { UserManager } from '../../../@types/user';
// _mock
import { countries } from '../../../_mock';
// components

import Label from '../../../components/Label';
import { CustomFile } from '../../../components/upload';
import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getDelivery, getDeliveryName, updateDelivery } from 'src/api/settings';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { description } from 'src/_mock/text';
import useAuth from 'src/hooks/useAuth';
import useLocales from 'src/hooks/useLocales';
import PickersDay from 'src/utils/PickerDay';
import SetTimePicker from 'src/components/TimePicker';
import ToggleDays from 'src/utils/ToggleDays';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';

export const payments = [
  {
    code: 'AMZ',
    label: 'Amazon Pay',
  },
  {
    code: 'KLA',
    label: 'Klarna',
  },
];

// ----------------------------------------------------------------------

interface FormValuesProps {
  Collect: boolean;
  Delivery: boolean;
  MinimumOrder: number;
  OpeningTime: Date;
  ClosingTime: Date;
}

type Props = {
  isEdit?: boolean;
  currentUser?: UserManager;
};

type UpdateDeliveryOption = {
  deliveryOptionsIds: any;
  shopId: string;
  shippingCost?: number;
  minimumOrder: number;
};

const SHIPPING_OPTIONS = {
  PICKUP: {
    key: 'PICKUP',
    value: 'Pickup',
  },
  PICKUP_AND_DELIVERY: {
    key: 'DELIVERY',
    value: 'Pickup and Delivery',
  },
};

export default function LogisticsEditForm({ isEdit = false, currentUser }: Props) {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [deliveryOptions, setdeliveryOptions] = useState<string[]>([]);
  const [days, setDays] = useState<number[]>([1, 3, 5]);
  const [firstStartTime, setFirstStartTime] = useState(dayjs('2022-04-17T7:30'));
  const [firstCloseTime, setFirstCloseTime] = useState(dayjs('2022-04-17T12:30'));
  const [secondStartTime, setSecondStartTime] = useState(dayjs('2022-04-17T16:30'));
  const [secondCloseTime, setSecondCloseTime] = useState(dayjs('2022-04-17T20:30'));

  // console.log({ firstStartTime, firstCloseTime, secondStartTime, secondCloseTime })
  const { translate } = useLocales();

  const { data: deliveryName } = useQuery<any>(['deliveryName'], getDeliveryName);
  const { data: delivery, refetch } = useQuery<any>(['delivery'], getDelivery, {
    refetchOnWindowFocus: false,
    onSuccess(data) {
      setdeliveryOptions(data.deliveryOptions.map(({ name, id }: any) => name));
      //setDays(data.openDays?.map((day: any) => day) ?? []);
    },
  });

  //const [openTime, setOpenTime] = useState<any | null>(null);
  //const [closeTime, setCloseTime] = useState<any | null>(null);

  const dbOpenTIme = delivery?.openingTime?.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const dbClostTIme = delivery?.closingTime?.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const updateMutate = useMutation(
    ({
      deliveryOptionsIds,
      minimumOrder,
      openingTime,
      closingTime,
      operatingSchedule,
      shippingType,
      days,
    }: any) =>
      updateDelivery({
        deliveryOptionsIds,
        minimumOrder,
        //openingTime,
        //closingTime,
        shippingType,
        operatingSchedule,
        days,
      }),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        refetch();
        push(PATH_DASHBOARD.settings.logistics);
      },
      onError(err: any) {
        enqueueSnackbar(
          err.response.data.message ?? err.message ?? err.data.message ?? 'Something went wrong',
          { variant: `error` }
        );
      },
    }
  );

  const NewUserSchema = Yup.object().shape({
    Shipping: Yup.boolean(),
    Collect: Yup.boolean(),
    Delivery: Yup.boolean(),
    ShippingCost: Yup.number(),
    MinimumOrder: Yup.number(),
    shippingType: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      Shipping: deliveryOptions.includes('Shipping'),
      Collect: deliveryOptions.includes('Collect'),
      Delivery: deliveryOptions.includes('Delivery'),

      ShippingCost: delivery?.shippingCost || 0,
      MinimumOrder: delivery?.minimumOrder || 0,
      shippingType: delivery?.shippingType || 'PICKUP',
    }),
    [deliveryOptions, delivery]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [deliveryOptions, delivery]);

  const onSubmit = async (data: any) => {
    try {
      const shippingCost = data.ShippingCost;
      const minimumOrder = data.MinimumOrder;
      const shippingType = data.shippingType;
      // const openingTime = openTime?.toLocaleTimeString([], {
      //   hour: '2-digit',
      //   minute: '2-digit',
      //   second: '2-digit',
      // });
      // const closingTime = closeTime?.toLocaleTimeString([], {
      //   hour: '2-digit',
      //   minute: '2-digit',
      //   second: '2-digit',
      // });

      const deliveryOptionsIds: string[] = [];
      for (const [key, value] of Object.entries(data)) {
        deliveryName.map(({ id, name }: any) => {
          //console.log({ yes: name == key, name, key, id, value });
          if (value && name === key) {
            deliveryOptionsIds.push(id);
          }
        });
      }

      await updateMutate.mutate({
        deliveryOptionsIds,
        minimumOrder,
        shippingCost,
        // openingTime,
        // closingTime,
        shippingType,
        operatingSchedule,
        days,
      });
    } catch (error) {
      error;
    }
  };

  const operatingSchedule = [
    { daysOfWeek: days, startTime: '06:00', closeTime: '12:00', phaseIndex: 1 },
    { daysOfWeek: days, startTime: '16:00', closeTime: '20:00', phaseIndex: 2 },
  ];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            {/* <Box
              sx={{
                display: 'grid',
                columnGap: 1,
                rowGap: 1,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
              {deliveryName?.map(({ name, id }: any) => (
                                <RHFSwitch name={name} label={name} value={id} />
                            ))}

              {deliveryOptions && (
                <>
                  <RHFSwitch name="Collect" label={translate('click_and_collect')} />
                  <RHFSwitch name="Delivery" label={translate('direct_delivery')} />
                </>
              )}
            </Box> */}

            <Box marginTop={3}>
              <RHFSelect
                fullWidth
                name="shippingType"
                label={translate('shipping_type')}
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                required
                //defaultValue={SHIPPING_OPTIONS.PICKUP.key}
              >
                <MenuItem
                  defaultValue={SHIPPING_OPTIONS.PICKUP.key}
                  key={SHIPPING_OPTIONS.PICKUP.key}
                  value={SHIPPING_OPTIONS.PICKUP.key}
                  sx={{
                    mx: 1,
                    my: 0.5,
                    borderRadius: 0.75,
                    typography: 'body2',
                    textTransform: 'capitalize',
                  }}
                >
                  {SHIPPING_OPTIONS.PICKUP.value}
                </MenuItem>
                <MenuItem
                  key={SHIPPING_OPTIONS.PICKUP_AND_DELIVERY.key}
                  value={SHIPPING_OPTIONS.PICKUP_AND_DELIVERY.key}
                  sx={{
                    mx: 1,
                    my: 0.5,
                    borderRadius: 0.75,
                    typography: 'body2',
                    textTransform: 'capitalize',
                  }}
                >
                  {SHIPPING_OPTIONS.PICKUP_AND_DELIVERY.value}
                </MenuItem>
              </RHFSelect>
            </Box>
            <Box marginTop={3}>
              <RHFTextField
                multiline
                name="MinimumOrder"
                label={translate('minimum_order')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
                required
              />
            </Box>

            {/* <PickersDay days={days} setDays={setDays} /> */}

            <Box mt={3} ml={0}>
              <ToggleDays days={days} setDays={setDays} />
            </Box>

            <Typography fontWeight="600" mt={5}>
              {translate('Operating Schedule')}
            </Typography>

            <Stack direction="row" spacing={5}>
              <Grid container spacing={2} columnSpacing={5} marginTop={1} ml={5}>
                <Grid item xs={12}>
                  <Typography fontWeight="600" my={1} ml={10}>
                    {translate('Morning & Lunch')}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ ml: -10 }}>
                  <Typography fontWeight="600" my={2}>
                    {translate('Start Time')}
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DigitalClock
                      ampm={false}
                      value={firstStartTime}
                      onChange={(newValue: any) => {
                        setFirstStartTime(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight="600" my={2}>
                    {translate('Close Time')}
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DigitalClock
                      ampm={false}
                      value={firstCloseTime}
                      onChange={(newValue: any) => {
                        setFirstCloseTime(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid container spacing={2} columnSpacing={5} marginTop={0} ml={5}>
                <Grid item xs={12}>
                  <Typography fontWeight="600" my={1} ml={10}>
                    {translate('Afternoon & Evening')}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ ml: -10 }}>
                  <Typography fontWeight="600" my={2}>
                    {translate('Start Time')}
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DigitalClock
                      ampm={false}
                      value={secondStartTime}
                      onChange={(newValue: any) => {
                        setSecondStartTime(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight="600" my={2}>
                    {translate('Close Time')}
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DigitalClock
                      ampm={false}
                      value={secondCloseTime}
                      onChange={(newValue: any) => {
                        setSecondCloseTime(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={updateMutate.isLoading}>
                {translate('save_changes')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
