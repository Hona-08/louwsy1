import { m } from 'framer-motion';
// @mui
import { Button, Typography, TextField, Stack, CircularProgress } from '@mui/material';
//
import * as Yup from 'yup';
import { varFade, MotionViewport } from '../../components/animate';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getBaseLine } from 'src/api/settings';
import { useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { createContactUs } from 'src/api/contact-us';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import LoadingScreen from 'src/components/LoadingScreen';
import { preventDefault } from '@fullcalendar/common';
import ProgressCircular from '../overview/mui/progress/ProgressCircular';

// ----------------------------------------------------------------------

interface IFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function FaqsForm({ shop }: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();

  const HelpSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('email is required'),
    subject: Yup.string().required('subject is required'),
    message: Yup.string().required('message is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: shop?.name || '',
      email: shop?.email || '',
      subject: '',
      message: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm<IFormInput>({
    resolver: yupResolver(HelpSchema),
    defaultValues,
  });

  useEffect(() => {}, [shop]);

  const {
    handleSubmit,
    reset,
    control,

    formState: { errors },
  } = methods;

  const createContactUsMutation = useMutation((data: any) => createContactUs(data), {
    onSuccess(data) {
      enqueueSnackbar(data.message);
      reset();
      //push(PATH_DASHBOARD.menu.contactUs.list);
    },
    onError(err: any) {
      enqueueSnackbar(
        err.message ?? err.response.data.message ?? err.data.message ?? 'Something went wrong'
      );
    },
  });

  console.log('Help');

  const onSubmit = async (data: any) => {
    createContactUsMutation.mutate(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack component={MotionViewport} spacing={3}>
        <m.div variants={varFade().inUp}>
          <Typography variant="h4">Haven't found the right help?</Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField
            fullWidth
            label="Name"
            name="name"
            // InputLabelProps={{ shrink: shop?.name ? true : false }}
          />
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField
            fullWidth
            label="Email"
            name="email"
            // InputLabelProps={{ shrink: shop?.email ? true : false }}
          />
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField fullWidth label="Subject" name="subject" />
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField
            fullWidth
            label="Enter your message here."
            multiline
            rows={4}
            name="message"
          />
        </m.div>

        <m.div variants={varFade().inUp}>
          <LoadingButton type="submit" variant="contained" size="large" loading={false}>
            Submit Now
          </LoadingButton>
        </m.div>
      </Stack>
    </FormProvider>
  );
}
