import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { forgotPassword } from 'src/api/auth-shop';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
};

export default function ResetPasswordForm() {
  const { push } = useRouter();
  const { translate } = useLocales()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const mutation = useMutation((values: any) => forgotPassword(values as any), {
    onSuccess(data) {
      //console.log({ data })
      enqueueSnackbar('We have sent you an email.');
    },
    onError(err: any) {
      enqueueSnackbar(err.response.data.message ?? err.message);
    }
  })

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await mutation.mutate(data.email)
      // push(PATH_AUTH.newPassword);
    } catch (error) {
       (error);
    }
  };



  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label={translate('email_address')} />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={mutation.isLoading}
        >
          {translate('send_request')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
