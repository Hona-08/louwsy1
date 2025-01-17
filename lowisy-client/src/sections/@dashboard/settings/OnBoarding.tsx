import { translateRect } from '@fullcalendar/common';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, Button, Grid, ListItem, Stack } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getPricingPlans } from 'src/api/common';
import { getShopDetailsById } from 'src/api/products';
import { payViaKlarna, payViaKlarnaOnBoarding } from 'src/api/settings';
import useAuth from 'src/hooks/useAuth';
import useLocales from 'src/hooks/useLocales';
import { fDateTime } from 'src/utils/formatTime';
import * as Yup from 'yup';
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';
import CustomizedDialogs from './Dialog';

import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import { SeoIllustration } from 'src/assets';
import { AppWelcome } from '../general/app';
import PayPalPayment from './PayPalPayment';

function InsetList() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'primary.main' }} aria-label="contacts">
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Chelsea Otakan" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default function Onboarding() {
  const { shop } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [htmlSnippet, setHtmlSnippet] = useState('');
  const { translate } = useLocales();

  const updateMutate = useMutation(payViaKlarnaOnBoarding, {
    onSuccess(data: any) {
      //console.log(data);
      setOpen(true);
      setHtmlSnippet(data.html_snippet);
    },
    onError(err: any) {
      enqueueSnackbar(err.response.data.message ?? err.data.message ?? 'Something went wrong', {
        variant: 'error',
      });
    },
  });

  const body = {}

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <AppWelcome
            title={translate('why_onboarding_service') + ' ??' + '\n'}
            description={translate(
              'if_you_buy_our_onboarding_service_you_will_get_full_support_from_our_support_team_to_setup_your_restaurant_in_our_platform'
            )}
            img={
              <SeoIllustration
                sx={{
                  p: 3,
                  width: 360,
                  margin: { xs: 'auto', md: 'inherit' },
                }}
              />
            }
            // action={
            //   <Button
            //     variant="contained"
            //     onClick={() => {
            //       //setOpen(true);
            //       updateMutate.mutate();
            //     }}
            //   >
            //     {translate('buy')}
            //   </Button>
            // }
            action={
              <PayPalPayment redirectUrl='/successful-payment-onboarding-paypal' />
            }
          />
        </Grid>
      </Grid>
      
      {/* <CustomizedDialogs open={open} setOpen={setOpen} htmlSnippet={htmlSnippet} /> */}
    </>
  );
}
