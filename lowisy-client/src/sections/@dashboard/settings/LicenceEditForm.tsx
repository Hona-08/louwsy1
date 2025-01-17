import { translateRect } from '@fullcalendar/common';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, ListItem, Stack } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getPricingPlans } from 'src/api/common';
import { getShopDetailsById } from 'src/api/products';
import { payViaKlarna } from 'src/api/settings';
import useAuth from 'src/hooks/useAuth';
import useLocales from 'src/hooks/useLocales';
import { fDateTime } from 'src/utils/formatTime';
import * as Yup from 'yup';
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';
import CustomizedDialogs from './Dialog';
import { PayPalButtons } from '@paypal/react-paypal-js';
import PayPalPayment from './PayPalPayment';

export default function LicenceEditForm() {
  const { shop } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [plan_id, setPlanId] = useState<string>();
  const [htmlSnippet, setHtmlSnippet] = useState('');
  const { translate } = useLocales();
  const { data: shopDetails, isLoading: detailsLoading } = useQuery<any>(['get_shop_details'], () =>
    getShopDetailsById(shop.id as string)
  );

  const { data: plans, isLoading } = useQuery<any>(['get_plans'], () => getPricingPlans(), {});
  const updateMutate = useMutation((data: any) => payViaKlarna(data), {
    onSuccess(data: any) {
      // console.log(data);
      setOpen(true);
      setHtmlSnippet(data.html_snippet);
    },
    onError(err: any) {
      enqueueSnackbar(err.response.data.message ?? err.data.message ?? 'Something went wrong', {
        variant: 'error',
      });
    },
  });

  const planSchema = Yup.object().shape({
    planId: Yup.string().required('Please select one of the plans'),
    code: Yup.string(),
  });

  const methods = useForm<any>({
    resolver: yupResolver(planSchema),
    defaultValues: { planId: plans?.[0]?.id },
  });



  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();



  const onSubmit = async (data: any) => {
    try {
      await updateMutate.mutate(data);
    } catch (error) {
       (error);
    }
  };


  return (
    <>
      {shopDetails?.data && (
        <Alert severity="info" sx={{ mb: 3 }}>
          {translate('expires_on')}:{' '}
          <strong style={{ marginLeft: '.5rem' }}>
            {fDateTime(shopDetails.data?.expirationDate)}
          </strong>
        </Alert>
      )}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFSelect name="planId" label={translate('plan')} InputLabelProps={{ shrink: true }} required>
          <option key="disabled" disabled selected>
            {translate('select_plan')}
          </option>
          {plans?.map(({ id, timePeriodInMonths, cost }: any) => (
            <option value={id} key={id}>
              {`${timePeriodInMonths}` +
                ` ` +
                translate('months') +
                ` ` +
                `(` +
                translate('cost') +
                ` ` +
                `€${cost})`}
            </option>
          ))}
        </RHFSelect>
        <RHFTextField name="code" label={translate('discount_code')} sx={{ mt: 3 }} />
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          {/* <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {translate('purchase_plan')}
          </LoadingButton> */}

        </Stack>

        <PayPalPayment plan_id={values.planId} discount_id={values.code} redirectUrl='/successful-payment-paypal' />

      </FormProvider>
      <CustomizedDialogs open={open} setOpen={setOpen} htmlSnippet={htmlSnippet} />
    </>
  );
}
