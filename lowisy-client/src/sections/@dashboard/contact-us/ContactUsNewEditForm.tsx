// @mui
import { styled } from '@mui/material/styles';
import * as Yup from 'yup';
import { Grid, Container } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
// layouts
import Layout from '../../../layouts';
import useSettings from '../../../hooks/useSettings';
// _mock
import { _mapContact } from '../../../_mock';
// components
import Page from '../../../components/Page';
// sections
import { ContactHero, ContactForm, ContactMap } from '../../../sections/contact';
import ShopFooter from '../../../layouts/shop/ShopFooter';
import ShopHeader from '../../../layouts/shop/ShopHeader';

import { Button, Typography, TextField, Stack } from '@mui/material';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createContactUs, updateContactUs } from 'src/api/contact-us';
import { ContactUs } from 'src/@types/contact-us';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import useLocales from 'src/hooks/useLocales';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

ContactUsNewEditForm.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function ContactUsNewEditForm({ isEdit, currentContact }: any) {
  //   //console.log('current contact', currentContact[0]);
  //console.log('current contact', currentContact);
  const { push } = useRouter();
  const { query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const { contactUsId } = query;

  const { themeStretch } = useSettings();
  //   const defaultValues = {
  //     name: '',
  //     email: '',
  //     subject: '',
  //     message: '',
  //   };

  const NewContactUsSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('email is required'),
    subject: Yup.string().required('subject is required'),
    message: Yup.string().required('message is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentContact?.name || '',
      email: currentContact?.email || '',
      subject: currentContact?.subject || '',
      message: currentContact?.message || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentContact]
  );

  interface IFormInput {
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  const methods = useForm<IFormInput>({
    resolver: yupResolver(NewContactUsSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    watch,

    register,
    formState: { errors },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentContact) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentContact]);

  const { ref: nameRef, ...nameProps } = register('name', {
    required: 'Name is required',
  });
  const { ref: emailRef, ...emailProps } = register('email', {
    required: 'Email is required',
  });
  const { ref: subjectRef, ...subjectProps } = register('subject', {
    required: 'Subject is required',
  });
  const { ref: messageRef, ...messageProps } = register('message', {
    required: 'Message is required',
  });

  const createContactUsMutation = useMutation((data: any) => createContactUs(data), {
    onSuccess(data) {
      enqueueSnackbar(data.message);
      push(PATH_DASHBOARD.menu.contactUs.list);
    },
    onError(err: any) {
      enqueueSnackbar(
        err.message ?? err.response.data.message ?? err.data.message ?? 'Something went wrong'
      );
    },
  });

  const updateContactUsMutation = useMutation(
    (data: any) => updateContactUs(contactUsId as string, data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        push(PATH_DASHBOARD.menu.contactUs.list);
      },
      onError(err: any) {
        enqueueSnackbar(
          err.message ?? err.response.data.message ?? err.data.message ?? 'Something went wrong'
        );
      },
    }
  );
  
  const onSubmit = async (data: ContactUs) => {
    isEdit ? updateContactUsMutation.mutate(data) : createContactUsMutation.mutate(data);

    reset();
  };

  return (
    <>
      <Stack spacing={3} sx={{ mb: '20px' }}>
        <TextField
          inputRef={nameRef}
          {...nameProps}
          label={translate('name')}
          error={!!errors.name}
          helperText={errors?.name?.message}
        />

        <TextField
          label={translate('email')}
          inputRef={emailRef}
          {...emailProps}
          error={!!errors.email}
          helperText={errors?.email?.message}
        />

        <TextField
          label={translate('subject')}
          inputRef={subjectRef}
          {...subjectProps}
          error={!!errors.subject}
          helperText={errors?.subject?.message}
        />
        <TextField
          label={translate('enter_your_message_here')}
          inputRef={messageRef}
          {...messageProps}
          multiline
          rows={4}
          error={!!errors.message}
          helperText={errors?.message?.message}
        />
      </Stack>
      <Button size="large" variant="outlined" onClick={() => reset()}>
        {translate('reset')}
      </Button>
      {isEdit ? (
        <Button
          style={{
            backgroundColor: '#0F75AE',
            marginLeft: '15px',
          }}
          size="large"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          {translate('update')}
        </Button>
      ) : (
        <Button
          style={{
            marginLeft: '15px',
          }}
          size="large"
          color="primary"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          {translate('submit_now')}
        </Button>
      )}
    </>
  );
}
