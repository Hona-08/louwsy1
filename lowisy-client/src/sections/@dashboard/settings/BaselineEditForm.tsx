import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useQuery, useMutation } from '@tanstack/react-query';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
  Alert,
  FormControl,
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  IconButton,
  Tooltip,
  styled,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material';
// @types
import { UserManager } from '../../../@types/user';
import dynamic from 'next/dynamic';
import { CustomFile } from '../../../components/upload';
import { FormProvider, RHFEditor, RHFSelect, RHFTextField } from '../../../components/hook-form';
import { getBaseLine, getCategory, getCountries, updateBaseline } from 'src/api/settings';
import { PATH_DASHBOARD } from 'src/routes/paths';
import LoadingScreen from 'src/components/LoadingScreen';
import useLocales from 'src/hooks/useLocales';
import useAuth from 'src/hooks/useAuth';
import { getShopDetailsById } from 'src/api/products';
import { AddressAutocompleteValue } from 'mui-address-autocomplete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const AddressAutocomplete = dynamic(() => import('mui-address-autocomplete'), {
  ssr: false,
});
// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<UserManager, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  isEdit?: boolean;
  currentUser?: UserManager;
};

const getCategoriesNameById: any = (categories = []) => {
  const list: any = {};

  for (const { id, name } of categories) list[id] = name;
  return list;
};

const getCurrenciesNameById: any = (countries = []) => {
  const list: any = {};

  for (const { id, currency } of countries) list[id] = currency;
  return list;
};

export default function BaselineEditForm({ isEdit = true, currentUser }: Props) {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const [isOnline, setIsOnline] = useState<boolean>();
  // const [categoryId, setCategoryId] = useState<string[]>([]);
  const [address, setAddress] = useState({
    streetAddress: '',
    cityName: '',
    postalCode: '',
    houseNumber: '',
  });
  const [countryId, setCountryId] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const { data: baseline, isFetching: fetchingBaseline } = useQuery<any>(
    ['baseline'],
    getBaseLine,
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        // setCategoryId(data?.categoryId ? [data?.categoryId] : []);
        setCountryId(data?.countryId ? [data?.countryId] : []);
        setIsOnline(data?.isOnline);
      },
    }
  );
  //console.log({ baseline });
  const { data: countries, isFetching: fetchingCountries } = useQuery<any>(
    ['countries'],
    getCountries
  );

  const [isCopied, setIsCopied] = useState(false);

  console.log({ isOnline });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  const { data: category, isFetching: fetchingCategory } = useQuery<any>(['category'], getCategory);
  const updateMutate = useMutation((baseline: any) => updateBaseline(baseline), {
    onSuccess(data) {
      enqueueSnackbar(data.message);
      push(PATH_DASHBOARD.settings.baseline);
    },
    onError(err: any) {
      enqueueSnackbar(
        err.response.data.message ?? err.data.message ?? err.message ?? 'Something went wrong',
        { variant: 'error' }
      );
    },
  });

  const getCategoriesName = useMemo(() => getCategoriesNameById(category), [category]);
  const getCurrenciesName = useMemo(() => getCurrenciesNameById(countries), [countries]);

  const handleChangeCategoryId = (event: any) => {
    const {
      target: { value },
    } = event;
    // setCategoryId((prev: string[]) => (prev == value ? [] : [value]));
  };

  const handleChangeCountryId = (event: any) => {
    const {
      target: { value },
    } = event;
    setCountryId((prev: string[]) => (prev == value ? [] : [value]));
  };

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Webshop Name is required'),
    email: Yup.string().required('Email is required').email(),
    phone: Yup.string().required('Phone number is required'),
    taxRegistration: Yup.string().required('UID number is required'),
    // cityName: Yup.string().required('city is required'),
    // streetAddress: Yup.string().required('Street Name is required'),
    // houseNumber: Yup.string().required('House Number is required'),
    // postalCode: Yup.string().required('Postal Code is required')
  });

  const defaultValues = useMemo(
    () => ({
      name: baseline?.name || '',
      email: baseline?.email || '',
      phone: baseline?.phone || '',
      cityName: baseline?.cityName || '',
      postalCode: baseline?.postalCode || '',
      houseNumber: baseline?.houseNumber || '',
      streetAddress: baseline?.streetAddress || '',
      taxRegistration: baseline?.taxRegistration || '',
      description: baseline?.description || '',
      isOnline: baseline?.isOnline || true,
      lat: baseline?.lat,
      lng: baseline?.lng,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [baseline]
  );

  // console.log({ address })

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  const { translate } = useLocales();

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
    setLocationVal({
      loaded: 'true',
      lat: baseline?.lat ?? '',
      lng: baseline?.lng ?? '',
      place_id: 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ',
      description: baseline?.streetAddress ?? '',
      components: {},

      structured_formatting: {
        main_text: '',
        secondary_text: '',
        main_text_matched_substrings: [''],
      },
    });

    setAddress({
      streetAddress: baseline?.streetAddress ?? '',
      houseNumber: baseline?.houseNumber ?? '',
      postalCode: baseline?.postalCode ?? '',
      cityName: baseline?.cityName ?? '',
    });

    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseline]);

  const [locationVal, setLocationVal] = useState<AddressAutocompleteValue | any>({
    loaded: 'true',
    lat: baseline?.lat || '', // Use the retrieved lat value or an empty string if not available
    lng: baseline?.lng || '', // Use the retrieved lng value or an empty string if not available
    place_id: 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ',
    description: '',
    components: {},

    structured_formatting: {
      main_text: '',
      secondary_text: '',
      main_text_matched_substrings: [''],
    },
  });

  const onSubmit = async (data: FormValuesProps) => {
    try {
      // delete data['country']
      const { lat, lng } = locationVal;

      let newData = {
        ...data,
        ...address,
        isOnline,
        lat,
        lng,
      };

      // if (categoryId.length > 0) {
      //   newData = {
      //     ...newData,
      //     categoryId,
      //   };
      // }

      if (countryId.length > 0) {
        newData = {
          ...newData,
          countryId,
        };
      }

      if (
        !(
          address.cityName &&
          address.houseNumber &&
          address.postalCode &&
          address.streetAddress &&
          error.length < 1
        )
      ) {
        setError(
          'Please enter your full address including city, street, postal code & house number'
        );
        // enqueueSnackbar(
        //   'Please enter your full adress',
        //   { variant: 'error' }
        // );
        return;
      }

      // console.log({ newData })

      await updateMutate.mutate(newData);
    } catch (error) {
      error;
    }
  };

  // if (fetchingBaseline || fetchingBaseline || fetchingCountries) {
  //   return <LoadingScreen />;
  // }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {/* <Alert severity="info">

        {translate('webshop_url')}{':'}{' '}
        <strong>
          <a style={{ textDecoration: 'none' }}
            href={`https://uat-restaurant.lowisy.com/restaurants/${baseline?.slug}`}
            rel="noopener"
            target="_blank"
          >
            {' '} https://uat-restaurant.lowisy.com/restaurants/{baseline?.slug}

          </a>
          <Tooltip title={isCopied ? 'Copied!' : 'Copy to Clipboard'} >
            <IconButton onClick={() => copyToClipboard(`https://uat-restaurant.lowisy.com/restaurants/${baseline?.slug}`)} sx={{ mb: -1.0 }}>
              <ContentCopyIcon fontSize='medium' />
            </IconButton>
          </Tooltip>
        </strong>

      </Alert> */}
      <Alert severity="info" style={{ display: 'flex', alignItems: 'center' }}>
        {/* Link */}
        {translate('webshop_url')}
        {':'}{' '}
        <a
          style={{ textDecoration: 'none' }}
          href={`https://uat-restaurant.lowisy.com/restaurants/${baseline?.slug}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          https://uat-restaurant.lowisy.com/restaurants/{baseline?.slug}
        </a>
        {/* Copy Button */}
        <Tooltip title={isCopied ? 'Copied!' : 'Copy to Clipboard'}>
          <IconButton
            onClick={() =>
              copyToClipboard(`https://uat-restaurant.lowisy.com/restaurants/${baseline?.slug}`)
            }
            sx={{ marginLeft: '12px' }}
          >
            <ContentCopyIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Alert>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <div>
          <FormControl component="fieldset" variant="standard" sx={{ ml: '8px' }}>
            <FormLabel component="legend">Mode: On/Off</FormLabel>
          </FormControl>
        </div>
        <div>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={isOnline}
                    onClick={() => setIsOnline(!isOnline)}
                    name="mode"
                    sx={{ bottom: 2, display: 'flex', alignItems: 'center' }}
                  />
                }
                label={isOnline ? 'Online' : 'Offline'}
              />
            </FormGroup>
          </FormControl>
        </div>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                mb: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
              <Typography>Basic information and contact details of your restaurant :</Typography>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  mt: 3,
                  mb: 0,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFTextField name="name" label="Restaurant Name" required />
                {/* <RHFTextField name="phone" label={translate('phone')} required /> */}
              </Box>

              <div>
                <LabelStyle>{translate('Restaurant Description')}</LabelStyle>
                <RHFEditor simple name="description" />
              </div>

              {/* <RHFSelect name="categoryId" label={translate('categories')} placeholder="Categories"
                InputLabelProps={{ shrink: true }}>
                {category?.map(({ name, id }: any) => (
                  <option value={id} key={id}>
                    {name}
                  </option>
                ))}
              </RHFSelect> */}
              {/* <FormControl>
                <InputLabel id="demo-multiple-checkbox-label">{translate('categories')}</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  //multiple
                  fullWidth
                  value={categoryId}
                  onChange={handleChangeCategoryId}
                  input={<OutlinedInput label="Category" />}
                  renderValue={(selected: any[]) =>
                    selected.reduce(
                      (prev: any, current: any) => `${getCategoriesName[current]}${prev}`,
                      ''
                    )
                  }
                  MenuProps={MenuProps}
                >
                  {category?.length === 0 ? ( // Check if there are no categories
                    <MenuItem disabled>{translate('no_categories_available')}</MenuItem>
                  ) : (
                    category?.map(({ id, name }: any) => (
                      <MenuItem key={id} value={id}>
                        <Checkbox checked={categoryId.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl> */}
            </Box>
            {/* <Typography>{translate('address')} :</Typography>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                my: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="streetAddress" label={translate('street_name')} required />{' '}
              <RHFTextField name="houseNumber" label={translate('house_number')} required />
              <RHFTextField name="postalCode" label={translate('postal_code')} required />
              <RHFTextField name="cityName" label={translate('city_name')} required />
            </Box> */}
            {/* <Typography>{translate('contact')} :</Typography> */}
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                mt: 3,
                mb: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="email" label={translate('Email')} disabled required />
              <RHFTextField name="phone" label={translate('phone')} required />
              <FormControl>
                <InputLabel id="demo-multiple-checkbox-label-2" required>
                  {translate('currencies')}
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label-2"
                  id="demo-multiple-checkbox-2"
                  //multiple
                  fullWidth
                  value={countryId}
                  required
                  // color='info'
                  onChange={handleChangeCountryId}
                  input={<OutlinedInput label="Currencies" />}
                  renderValue={(selected: any[]) =>
                    selected.reduce(
                      (prev: any, current: any) => `${getCurrenciesName[current]}${prev}`,
                      ''
                    )
                  }
                  MenuProps={MenuProps}
                >
                  {countries?.map(({ id, currency }: any) => (
                    <MenuItem key={id} value={id}>
                      {/* <Checkbox checked={countryId.indexOf(currency) > -1} /> */}
                      <ListItemText primary={currency} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <RHFTextField
                name="taxRegistration"
                label={translate('tax_registration_uid_number')}
                required
              />
            </Box>
            {
              <>
                {error ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                ) : (
                  ''
                )}
                {/* <Typography>{translate('Address *')} :</Typography> */}
                <InputLabel id="demo-multiple-checkbox-label-2" required>
                  {translate('Address')}
                </InputLabel>
                <AddressAutocomplete
                  placeholder="Search by address"
                  apiKey="AIzaSyCvqBlmgrQH7Nbid5gCMdqrm-Q45fHOM9A"
                  fields={['geometry']}
                  label=""
                  onChange={(_, value: any) => {
                    // console.log(value);
                    setError('');

                    if (!value) return;
                    // console.log({ address: value })
                    setLocationVal({
                      ...value,
                      lat: value?.geometry.location.lat(),
                      lng: value?.geometry.location.lng(),
                    });

                    // console.log(!(value.description && value.components))

                    if (
                      !(
                        value.components.postal_code &&
                        value.components?.locality &&
                        value.components.administrative_area_level_2 &&
                        value.components.street_number
                      )
                    ) {
                      setError(
                        'Please enter your full address including city, street, postal code & house number'
                      );

                      // enqueueSnackbar(
                      //   'Please enter your full address',
                      //   { variant: 'error' }
                      // );
                      return;
                    }
                    // if (!(value.description && value.components)) {
                    setAddress({
                      streetAddress: value.description ?? value.formatted_address,
                      houseNumber: value.components?.street_number[0]?.long_name,
                      postalCode: value.components?.postal_code[0]?.long_name,
                      cityName:
                        value.components?.locality[0]?.long_name +
                        ', ' +
                        value.components.administrative_area_level_2[0].long_name,
                    });
                    // }
                  }}
                  value={locationVal}
                  sx={{
                    height: 50,
                    paddingTop: 0.5,
                    paddingRight: 0,
                    color: 'grey.700',
                    background: '#fff',
                    '& fieldset': { border: '1px solid' },
                  }}
                />
              </>
            }

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
