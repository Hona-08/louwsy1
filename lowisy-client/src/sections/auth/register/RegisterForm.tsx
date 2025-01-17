import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, Box, Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { getCountries } from 'src/api/common';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { AddressAutocompleteValue } from "mui-address-autocomplete";

import dynamic from "next/dynamic";
import { initialRegister } from 'src/api/auth-shop';
import { useRouter } from 'next/router';
import { PATH_AUTH, PATH_ONBOARDING } from 'src/routes/paths';
import useLocales from 'src/hooks/useLocales';

const AddressAutocomplete = dynamic(() => import("mui-address-autocomplete"), {
  ssr: false,
});

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  countryId: string;
  name: string;
  lat: string;
  lng: string;
  afterSubmit?: string;
};


const StoreLatLng = ({ values, setValues, translate }: any) => {
  const [value, setValue] = useState<AddressAutocompleteValue | null>({
    place_id: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
    description: "",
    components: {},
    structured_formatting: {
      main_text: "",
      secondary_text: "",
      main_text_matched_substrings: [],
    },
  });
  return (
    <Box sx={{ m: 4, maxWidth: '600px', mx: 'auto' }}>
      <AddressAutocomplete
        aria-required
        placeholder="type your address"
        apiKey="AIzaSyCvqBlmgrQH7Nbid5gCMdqrm-Q45fHOM9A"
        label={translate('exact_location')}
        fields={['geometry']}
        onChange={(_, value: any) => {
          if (!value) return
          console.log({ address: value })
          setValues({ ...values, lat: value?.geometry.location.lat(), lng: value?.geometry.location.lng() })
          delete value.geometry
          setValue(value)
        }}
        value={value}
        sx={{
          height: 50,
          paddingRight: 0,
          color: "grey.700",
          background: "#fff",
        }}
      />
    </Box>
  );
}

export default function OnboardingForm() {
  const router = useRouter()
  const { translate } = useLocales()
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const { data: countries, isFetching } = useQuery<any>(['get_countries'], getCountries);
  const [values, setValues] = useState<any>({});
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Store name required'),
    countryId: Yup.string(),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    lat: Yup.string(),
    lng: Yup.string(),
  });

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const defaultValues = {
    name: '',
    countryId: '',
    email: '',
    lat: '',
    lng: ''
  };

  const mutation = useMutation((values: any) => initialRegister(values as any), {
    onSuccess(data) {
      enqueueSnackbar(data.message);
      router.push(PATH_ONBOARDING.final)
    },
    onError(err: any) {
      enqueueSnackbar(err.response.data.message ?? err.message);
    },
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      data.countryId = values.countryId;
      data.lat = values.lat;
      data.lng = values.lng;
      await mutation.mutate(data)
    } catch (error) {
       (error);

      reset();

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label={translate('store_name')} required />
        </Stack>

        <RHFTextField name="email" label={translate('email_address')} required />

        {/* <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}

        {/* <FormControl fullWidth required>
          <InputLabel id="location" required>{translate('webshop_location')}</InputLabel>
          {countries && (
            <Select
              labelId="location"
              id="location"
              label="WebShop Location"
              name="countryId"
              onChange={handleChange}
              required
            >
              {countries?.map(({ countryName, id }: any) => (
                <MenuItem value={id} key={id}>
                  {countryName}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl> */}

        <StoreLatLng values={values} setValues={setValues} translate={translate} />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={mutation.isLoading}
          disabled={
            !(
              values.lat
              && values.lng
            )}
        >
          {translate('register')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
