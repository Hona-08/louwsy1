import * as Yup from 'yup';
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
  TextareaAutosize,
  TextField,
} from '@mui/material';
// utils

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
import { getPolicies, updatePolicy } from 'src/api/settings';
import useTable from 'src/hooks/useTable';
import useLocales from 'src/hooks/useLocales';

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
  isPredefined: boolean;
  termsOfUse: string;
  privacyPolicy: string;
}

type Props = {
  isEdit?: boolean;
  currentUser?: UserManager;
};

export default function PoliciesEditForm({ isEdit, currentPolicy }: any) {
  const { dense } = useTable({
    defaultOrderBy: 'createdAt',
  });
  const { translate } = useLocales();
  const { query } = useRouter();
  const { policyId } = query;
  const { data: policy, refetch } = useQuery<any>(['policies'], getPolicies);

  //console.log({ policy });
  const updateMutate = useMutation((policy: any) => updatePolicy(policy), {
    onSuccess(data) {
      enqueueSnackbar(data.message);
      refetch();
    },
    onError(err: any) {
      enqueueSnackbar(err.response.data.message ?? err.data.message ?? 'Something went wrong!!');
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    isPredefined: Yup.boolean().required(),
    termsOfUse: Yup.string(),
    privacyPolicy: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      termsOfUse: policy?.termsOfUse || '',
      isPredefined: policy?.isPredefined || '',
      privacyPolicy: policy?.privacyPolicy || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [policy]
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
  }, [policy]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      if (data.isPredefined) {
        data.privacyPolicy = '';
        data.termsOfUse = '';
      }
      updateMutate.mutate(data);
    } catch (error) {
       (error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 1,
                rowGap: 1,
                mb: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
              <RHFSwitch
                name="isPredefined"
                checked={false}
                label={translate('enable_predefined_terms_and_policies')}
              />
            </Box>

            {!values.isPredefined && (
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                }}
              >
                <RHFTextField
                  multiline
                  name="termsOfUse"
                  label={translate('terms_of_use')}
                  placeholder={translate('terms_of_use')}
                />
                <RHFTextField
                  multiline
                  name="privacyPolicy"
                  label={translate('privacy_policy')}
                  placeholder={translate('privacy_policy')}
                />
              </Box>
            )}

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
