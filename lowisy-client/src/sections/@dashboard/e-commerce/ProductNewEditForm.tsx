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
import {
  Card,
  Grid,
  Stack,
  Typography,
  Autocomplete,
  InputAdornment,
  MenuItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  Alert,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { Category, DbProduct, Product } from '../../../@types/product';
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
  RHFCheckbox,
} from '../../../components/hook-form';
import { createProduct } from 'src/redux/slices/product';
import { useDispatch, useSelector } from '../../../redux/store';
import { useMutation } from '@tanstack/react-query';
import { createSingleProduct, updateSingleProduct } from 'src/api/products';
import { group, groups } from 'd3-array';
import useLocales from 'src/hooks/useLocales';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

interface FormValuesProps extends Omit<DbProduct, 'images'> {
  images: (CustomFile | string)[];
}

type Props = {
  isEdit?: boolean;
  currentProduct?: Product;
  categories?: Category;
};

const flatNestedList: any = (nestedList = [], a = false) => {
  let newFlatList: any = [];
  nestedList?.forEach((item: any) => {
    newFlatList.push(item);
    if (item.subCategories && item.subCategories.length > 0) {
      // each level
      const list: any = flatNestedList(item.subCategories, true);
      newFlatList = [...newFlatList, ...list];
    }
  });
  if (a) {
    return newFlatList;
  }

  const list: any = {};

  for (const { id, name } of newFlatList) list[id] = name;
  return list;
};

export default function ProductNewEditForm({ isEdit, currentProduct, categories }: any) {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { query } = useRouter();

  const { productname } = query;
  const [error, setError] = useState<string>('');

  const [category, setCategory] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const getCategoriesNameById = useMemo(() => flatNestedList(categories), [categories]);
  const updateProductMutation = useMutation(
    (data: any) => updateSingleProduct(productname as string, data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        push(PATH_DASHBOARD.menu.products.list);
      },
      onError(err: any) {
        enqueueSnackbar(
          err.message ?? err.response.data.message ?? err.data.message ?? 'Something went wrong'
        );
      },
    }
  );
  const createProductMutation = useMutation((data: any) => createSingleProduct(data), {
    onSuccess(data) {
      enqueueSnackbar(data.message);
      push(PATH_DASHBOARD.menu.products.list);
    },
    onError(err: any) {
      enqueueSnackbar(
        err.response.data.message ?? err.data.message ?? err.message ?? 'Something went wrong',
        { variant: 'error' }
      );
    },
  });

  useEffect(() => {
    setCategory(currentProduct?.categoriesId ? [currentProduct?.categoriesId] : []);
  }, [currentProduct]);

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    shortDescription: Yup.string().required('Short Description is required'),
    longDescription: Yup.string().required('Long Description is required'),
    images: Yup.array().required('Product Image is required'),
    price: Yup.number().moreThan(0, 'Price should not be €0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      longDescription: currentProduct?.longDescription || '',
      shortDescription: currentProduct?.shortDescription || '',
      images: currentProduct?.images || [],
      price: currentProduct?.price || 0,
      isFeatured: Boolean(currentProduct?.isFeatured),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
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
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  //console.log({ category });

  const onSubmit = async (data: any) => {
    try {
      //console.log({ data });

      const {
        name,
        longDescription,
        shortDescription,
        images,
        packagingContent,
        price,
        tax,
        unit,
        isFeatured,
      }: any = data;
      const formData = new FormData();

      if (files.length < 1 && !isEdit) {
        setError('Please upload atleast 1 product image.');
        return;
      }
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }
      for (let i = 0; i < category.length; i++) {
        data.categoriesId = category[i];
        formData.append('categoriesId', category[i]);
      }

      if (category.length == 0) {
        data.categoriesId = null;
      }

      formData.append('name', name);
      formData.append('longDescription', longDescription);
      formData.append('shortDescription', shortDescription);
      formData.append('price', price);
      formData.append('isFeatured', isFeatured);

      isEdit ? updateProductMutation.mutate(data) : createProductMutation.mutate(formData);
      //reset();
    } catch (error) {
      error;
    }
  };

  const handleCategoryChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setCategory((prev: string[]) => (prev == value ? [] : [value]));
  };

  console.log({ category });
  const arrayCategory = (categories: any, count: any) => {
    let menuItems: any = [];
    ////console.log(category.indexOf(id))
    categories?.forEach(
      ({ id, name, subCategories }: { id: string; name: string; subCategories: Category[] }) => {
        const menuItem = (
          <MenuItem key={id} value={id} sx={{ height: 50, ml: count * 3 }}>
            <ListItemIcon sx={{ display: 'inline' }}>
              <Checkbox checked={category.indexOf(id) > -1} sx={{ display: 'inline' }} />
            </ListItemIcon>
            <ListItemText primary={name} sx={{ display: 'inline' }} />
          </MenuItem>
        );
        menuItems.push(menuItem);
        if (subCategories?.length > 0) {
          const items = arrayCategory(subCategories, count + 1);
          menuItems = [...menuItems, ...items];
        }
      }
    );
    return menuItems;
  };

  // useEffect(() => {
  //   if (category?.subCategories.length > 0) {
  //     setCategory(employee.groupIds);
  //     originalGroup = employee.groupIds;
  //   }
  // }, []);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const images = values.images || [];
      //console.log({ acceptedFiles });
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      setError('');
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

  console.log({ files });

  const handleRemoveAll = () => {
    setFiles([]);
    setValue('images', []);
  };

  const handleRemove = (file: File | string) => {
    const filteredItems = values.images && values.images?.filter((_file) => _file !== file);
    const filteredImages = files && files?.filter((_file) => _file !== file);
    setFiles([]);
    setValue('images', filteredItems);
  };

  const { translate } = useLocales();
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label={translate('product_name')} required />
              <RHFTextField
                name="shortDescription"
                label={translate('short_description')}
                required
              />

              <div>
                <LabelStyle>{translate('long_description')}</LabelStyle>
                <RHFEditor simple name="longDescription" />
              </div>
              <div>
                <LabelStyle aria-required>{translate('images')}</LabelStyle>
                <RHFUploadMultiFile
                  showPreview
                  name="images"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                  onUpload={() => setError('')}
                />
              </div>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <RHFTextField
                  name="price"
                  label={translate('price')}
                  required
                  placeholder="0.00"
                  value={getValues('price') === 0 ? '' : getValues('price')}
                  onChange={(event) => setValue('price', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">€</InputAdornment>,
                    type: 'number',
                  }}
                />

                {/* <RHFTextField
                  name="tax"
                  label={translate('tax')}
                  placeholder="0.00"
                  value={getValues('tax') === 0 ? '' : getValues('tax')}
                  onChange={(event) => setValue('tax', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    type: 'number',
                  }}
                /> */}
                <FormControl sx={{ width: '100%' }}>
                  <InputLabel id="mutiple-select-label">{translate('choose_category')}</InputLabel>
                  <Select
                    // multiple
                    labelId="mutiple-select-label"
                    fullWidth
                    renderValue={(selected: any[]) =>
                      selected?.reduce(
                        (prev: any, current: any) => `${getCategoriesNameById[current]}${prev}`,
                        ''
                      )
                    }
                    value={category}
                    name="Choose Category"
                    label={translate('choose_category')}
                    onChange={handleCategoryChange}
                  >
                    {arrayCategory(categories, 0)}
                  </Select>
                </FormControl>
                <RHFCheckbox name="isFeatured" label={translate('featured')} />
              </Stack>

              {/* <RHFSwitch name="taxes" label="Price includes taxes" /> */}
            </Card>

            {error ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {'Please upload atleast 1 image.'}
              </Alert>
            ) : (
              ''
            )}

            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              loading={
                isSubmitting || updateProductMutation.isLoading || createProductMutation.isLoading
              }
            >
              {!isEdit ? translate('create_product') : translate('save_changes')}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
