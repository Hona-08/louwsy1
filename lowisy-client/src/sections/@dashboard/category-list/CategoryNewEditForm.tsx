import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography, Autocomplete, InputAdornment } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { Category, Product } from '../../../@types/product';
// components
import { CustomFile } from '../../../components/upload';
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
} from '../../../components/hook-form';
import { createProduct } from 'src/redux/slices/product';
import { useDispatch, useSelector } from '../../../redux/store';
import { useMutation } from '@tanstack/react-query';
import { updateSingleProduct } from 'src/api/products';
import { createCategory, updateCategory } from 'src/api/categories';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

const GENDER_OPTION = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];

const CATEGORY_OPTION = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
  { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] },
];

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<Product, 'images'> {
  taxes: boolean;
  inStock: boolean;
  images: (CustomFile | string)[];
}

type Props = {
  isEdit?: boolean;
  currentCategory?: Category;
};

export default function CategoryNewEditForm({ isEdit, currentCategory }: any) {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { query } = useRouter();

  const { categoryname } = query;

  const [files, setFiles] = useState<any[]>([]);

  const updateCategoryMutation = useMutation(
    (data: any) => updateCategory(categoryname as string, data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        push(PATH_DASHBOARD.menu.categories.list);
      },
      onError(err: any) {
        enqueueSnackbar(
          err.message ?? err.response.data.message ?? err.data.message ?? 'Something went wrong'
        );
      },
    }
  );
  const createCategoryMutation = useMutation((data: any) => createCategory(data), {
    onSuccess(data) {
      enqueueSnackbar(data.message);
      push(PATH_DASHBOARD.menu.categories.list);
    },
    onError(err: any) {
      enqueueSnackbar(
        err.message ?? err.response.data.message ?? err.data.message ?? 'Something went wrong'
      );
    },
  });

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentCategory?.name || '',
      description: currentCategory?.description || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCategory]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentCategory) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCategory]);

  const onSubmit = async (data: any) => {
    try {
      isEdit ? updateCategoryMutation.mutate(data) : createCategoryMutation.mutate(data);
    } catch (error) {
       (error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const images = values.images || [];
      //console.log({ acceptedFiles });
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      setValue('images', [
        ...images,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },

    [setValue, values.images]
  );

  const handleRemoveAll = () => {
    setFiles([]);
    setValue('images', []);
  };

  const handleRemove = (file: File | string) => {
    const filteredItems = values.images && values.images?.filter((_file) => _file !== file);
    const filteredImages = files && files?.filter((_file) => _file !== file);
    setFiles([filteredImages]);
    setValue('images', filteredItems);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label={translate('category_name')} />
              <div>
                <LabelStyle>{translate('description')}</LabelStyle>
                <RHFEditor simple name="description" />
              </div>
              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={
                  isSubmitting ||
                  createCategoryMutation.isLoading ||
                  updateCategoryMutation.isLoading
                }
              >
                {!isEdit ? translate('create_category') : translate('save_changes')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
