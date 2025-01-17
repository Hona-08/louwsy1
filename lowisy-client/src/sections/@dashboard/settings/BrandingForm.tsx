import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { UploadIllustration } from '../../../assets';

import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
  Alert,
  styled,
} from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { UserManager } from '../../../@types/user';
// _mock
import { countries } from '../../../_mock';
// components

import { CustomFile } from '../../../components/upload';
import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFUploadMultiFile,
  RHFUploadSingleFile,
} from '../../../components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getBranding, updateBaseline, updateBranding } from 'src/api/settings';
import useLocales from 'src/hooks/useLocales';
export const links = [
  {
    code: 'FB',
    label: 'FaceBook',
  },
  {
    code: 'INSTA',
    label: 'Instagram',
  },
];
// ----------------------------------------------------------------------

interface FormValuesProps {
  url: string;
  facebookUrl: string;
  instagramUrl: string;
  logo: any;
  coverImage: any;
}

type Props = {
  isEdit?: boolean;
  currentUser?: UserManager;
};
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export const currencies = [
  {
    code: 'EUR',
    label: 'EURO',
  },
  {
    code: 'CHF',
    label: 'Swiss France',
  },
];

export default function BrandingForm({ isEdit = false, currentUser }: Props) {
  const { push } = useRouter();
  const { translate } = useLocales();
  const [filesLogo, setFilesLogo] = useState<any>();
  const [filesCoverImage, setFilesCoverImage] = useState<any>();
  const { enqueueSnackbar } = useSnackbar();
  const { data: branding, refetch } = useQuery<any>(['branding'], getBranding);
  const updateMutate = useMutation((branding: any) => updateBranding(branding), {
    onSuccess(data) {
      enqueueSnackbar(data.message);
      setFilesCoverImage({});
      setFilesLogo({});
      refetch();
    },
    onError(err: any) {
      enqueueSnackbar(err.response.data.message ?? err.data.message ?? 'something went wrong');
    },
  });

  const NewUserSchema = Yup.object().shape({
    url: Yup.string(),
    facebookUrl: Yup.string(),
    instagramUrl: Yup.string(),
    //logo: Yup.object(),
    //coverImage: Yup.object()
  });

  const defaultValues = useMemo(
    () => ({
      url: branding?.url || '',
      facebookUrl: branding?.facebookUrl || '',
      instagramUrl: branding?.instagramUrl || '',
      logo: '',
      coverImage: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [branding]
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
  }, [branding]);

  // const onSubmit = async (data: FormValuesProps) => {
  //     try {
  //         await updateMutate.mutate(data)
  //         enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
  //     } catch (error) {
  //          (error);
  //     }
  // };

  const onSubmit = async (data: any) => {
    try {
      //console.log({ data });


      const {
        url,
        facebookUrl,
        instagramUrl
      }: any = data
      const formData = new FormData();
      formData.append('coverImage', filesCoverImage);
      formData.append('logo', filesLogo);
      formData.append('url', url)
      formData.append('facebookUrl', facebookUrl)
      formData.append('instagramUrl', instagramUrl)
      //console.log({ formData })
      // f.append('data', data);
      await updateMutate.mutate(formData);
      // setFilesCoverImage({})
      // setFilesLogo({})
      // push(PATH_DASHBOARD.menu.products.list);
    } catch (error) {
       (error);
    }
  };

  const handleDropLogo = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      //console.log({ file });
      if (file) {
        setValue(
          'logo',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        setFilesLogo(file);
      }
    },
    [setValue, filesLogo]
  );

  const handleDropCoverImage = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'coverImage',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        setFilesCoverImage(file);
      }
    },
    [setValue, filesCoverImage]
  );
  const lowisy_s3_url = 'https://lowisy-dev.s3.eu-central-1.amazonaws.com/';
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <LabelStyle>{translate('cover_picture')}</LabelStyle>
          <div>
            {/* <RHFUploadSingleFile
                            showPreview
                            name="coverImage"
                            maxSize={3145728}
                            onDrop={handleDropCoverImage}
                            onRemove={handleDropCoverImage}
                            onRemoveAll={handleRemoveAllCOverImage}
                            onUpload={() => console.log('ON UPLOAD')}
                        /> */}
            <RHFUploadSingleFile
              name="coverImage"
              maxSize={3145728}
              onDrop={handleDropCoverImage}
            />
          </div>
          {/* {branding?.coverImage && <img src={lowisy_s3_url + branding.coverImage} width={200} height={200} />} */}
        </Grid>
        <Grid item xs={12} md={6}>
          <LabelStyle>{translate('logo')}</LabelStyle>
          <div>
            {/* <RHFUploadSingleFile
                            showPreview
                            name="logo"
                            maxSize={3145728}
                            onDrop={handleDropLogo}
                            onRemove={handleRemoveLogo}
                            onRemoveAll={handleRemoveAllLogo}
                            onUpload={() => console.log('ON UPLOAD')}
                        /> */}
            <RHFUploadSingleFile name="logo" maxSize={3145728} onDrop={handleDropLogo} />
          </div>
          {/* {branding?.logo && <img src={lowisy_s3_url + branding.logo} width={200} height={200} />} */}
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, mt: 3 }}>
            <Box sx={{ mb: 3 }}>
              <RHFTextField name="url" label="Website Url" placeholder="Website Url" />
            </Box>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="facebookUrl" label="Facebook" placeholder="FaceBook" />
              <RHFTextField name="instagramUrl" label="Instagram" placeholder="Instagram" />
            </Box>

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
