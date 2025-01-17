import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, OutlinedInput, InputAdornment, FormHelperText, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { finalRegister } from 'src/api/auth-shop';
import { useMutation, useQuery } from '@tanstack/react-query';
import useLocales from 'src/hooks/useLocales';
import { values } from 'lodash';
import { watch } from 'fs';

// ----------------------------------------------------------------------

type FormValuesProps = {
  password: string;
  confirmPassword: string;
};

const validatePassword = (value: string) => {
  const strongRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!strongRegex.test(value)) {
    return 'Password must be at least 8 characters long and contain at least one letter, one digit, and one special character.';
  }
  return undefined;
};

export default function SetupPasswordForm() {
  const { push } = useRouter();
  const { translate } = useLocales()
  const { enqueueSnackbar } = useSnackbar();

  const { query } = useRouter();

  const { token } = query;

  const mutation: any = useMutation((password: any) => finalRegister(token as string, password), {
    onSuccess() {
      push(PATH_DASHBOARD.root);
      enqueueSnackbar('password setup success!');
    },
    onError(err) {
      //console.log({err})
    }
  })

  const [showPassword, setShowPassword] = useState(false);

  const VerifyCodeSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])(?=.*[A-Z])[A-Za-z\d@$!%*#?&]{8,}$/,
        `Password must be at least 8 characters long,
         one uppercase letter,
        one digit, 
        one special character`
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const { watch } = methods;

  const values = watch();



  const onSubmit = async (data: FormValuesProps) => {
    try {
      mutation.mutate(data.password)
      //push(PATH_DASHBOARD.root);
    } catch (error) {
       (error);
    }
  };



  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <>
          {mutation?.error && (
            <Alert severity="error">
              {mutation.error.response.data.message}
            </Alert>
          )}
        </>
        <RHFTextField
          name="password"
          label={translate('password')}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}

        />

        {/* <div>
          <label>Password Strength:</label>
          <div>
            <label>
              <input
                type="radio"
                name="passwordStrength"
                value="length"
                checked={values.password.length >= 8}
                disabled
              />{' '}
              At least 8 characters
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="passwordStrength"
                value="special"
                checked={/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(values.password)}
                disabled
              />{' '}
              At least 1 special character
            </label>
          </div>
        </div> */}

        <RHFTextField
          name="confirmPassword"
          label={translate('confirm_password')}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={mutation.isLoading}
          sx={{ mt: 3 }}
        >
          {translate('set_password')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
