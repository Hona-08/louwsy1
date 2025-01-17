import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import router, { useRouter } from 'next/router';
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
  Checkbox,
  Autocomplete,
  TextField,
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
import { getPaymentMethods, getPaymentMethodsOfShop, updatePaymentMethods } from 'src/api/settings';
import axios from 'axios';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import useLocales from 'src/hooks/useLocales';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<UserManager, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  currentUser?: UserManager;
};

export default function PaymentEditForm({ isEdit = false, currentUser }: Props) {
  const { push } = useRouter();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [paymentMethodIds, setPaymentMethodIds] = useState<any[]>([]);
  const { data: paymentmethodOfShop, refetch } = useQuery<any>(
    ['paymentmethodOfShop'],
    getPaymentMethodsOfShop
    //, {
    // onSuccess(data) {
    //   data.paymentName.map(({ id }) => {
    //     return id
    //   })
    // setPaymentMethodIds()
    // }
    //}
  );
  const { data: paymentmethods, isFetching } = useQuery<any>(['paymentmethod'], getPaymentMethods);
  const updateMutate = useMutation(
    (paymentmethod: any) => updatePaymentMethods(paymentMethodIds as string[]),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        setPaymentMethodIds([]);
        refetch();
        push(PATH_DASHBOARD.settings.payments);
      },
      onError(err: any) {
        enqueueSnackbar(
          err.message ?? err.response.data.message ?? err.data.message ?? 'Something went wrong'
        );
      },
    }
  );
  const paymentName = paymentmethodOfShop?.paymentName;
  const NewUserSchema = Yup.object().shape({
    //payments: Yup.string().required('Payment Provider is required'),
  });

  const defaultValues = useMemo(
    () => ({
      payments: paymentmethodOfShop?.payments || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paymentmethodOfShop]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
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

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentmethodOfShop]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      //console.log({ data });
      await updateMutate.mutate(data);
    } catch (error) {
       (error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatarUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const handleChange = (event: any, values: any) => {
    const {
      target: { value },
    } = event;

    setPaymentMethodIds(values.map((value: any) => value.id));
  };

  if (isFetching) {
    return null;
  }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Alert severity="info" sx={{ mb: 3 }}>
        {translate('active_payment_method')}:
        {paymentName?.map((payment: any, index: any) => (
          <strong key={index}>{' ' + payment.name + ', '}</strong>
        ))}
      </Alert>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(2, 2fr)', sm: 'repeat(2, 2fr)' },
              }}
            >
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={paymentmethods}
                disableCloseOnSelect
                onChange={handleChange}
                getOptionLabel={(paymentmethod: any) => paymentmethod.name}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={paymentMethodIds.includes(option.id)}
                    />
                    {option.name}
                  </li>
                )}
                style={{ width: '200%' }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={translate('payment_name')}
                    placeholder={translate('payment_method')}
                  />
                )}
              />
              {/* <RHFSelect name="payments" label="Payment Provider" placeholder="Payment Provider">
                <option value="" />
                {paymentmethod?.paymentName?.map(({ name }: any) => (
                  <option value={name}>
                    <input type={'checkbox'} />
                    {name}
                  </option>
                ))}
              </RHFSelect> */}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {translate('save_changes')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
