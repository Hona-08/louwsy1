// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
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
import ContactUsForm from './ContactUsForm';
import ContactUsNewEditForm from 'src/sections/@dashboard/contact-us/ContactUsNewEditForm';
import useLocales from 'src/hooks/useLocales';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

Contact.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function Contact() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();

  return (
    <Page title="Contact us">
      <RootStyle>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={translate('contact_us')}
            links={[
              { name: translate('dashboard'), href: PATH_DASHBOARD.root },
              {
                name: translate('contact_us'),
                href: PATH_DASHBOARD.menu.contactUs.root,
              },
              { name: translate('contact_form') },
            ]}
          />
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <ContactUsNewEditForm />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}

// import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
// import { styled } from '@mui/material/styles';
// import { Button, Typography, TextField, Stack, Grid, Container } from '@mui/material';
// import { FormProvider, useForm } from 'react-hook-form';
// import Layout from '../../../../layouts';
// import Page from '../../../../components/Page';
// import useSettings from '../../../../hooks/useSettings';
// import { PATH_DASHBOARD } from 'src/routes/paths';
// import FormInputText from './FormInputText';
// interface IFormInput {
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
// }

// const defaultValues = {
//   name: '',
//   email: '',
//   subject: '',
//   message: '',
// };

// const RootStyle = styled('div')(({ theme }) => ({
//   paddingTop: theme.spacing(8),
//   [theme.breakpoints.up('md')]: {
//     paddingTop: theme.spacing(11),
//   },
// }));

// ContactForm.getLayout = function getLayout(page: React.ReactElement) {
//   return <Layout>{page}</Layout>;
// };

// export default function ContactForm() {
//   const { themeStretch } = useSettings();
//   const methods = useForm<IFormInput>({ defaultValues: defaultValues });
//   const { handleSubmit, reset, control, setValue, watch } = methods;
//   const onSubmit = (data: IFormInput) => //console.log(data);

//   return (
//     <Page title="Contact us">
//       <RootStyle>
//         <Container maxWidth={themeStretch ? false : 'lg'}>
//           <HeaderBreadcrumbs
//             heading="Contact Us"
//             links={[
//               { name: 'Dashboard', href: PATH_DASHBOARD.root },
//               {
//                 name: 'Contact Us',
//                 href: PATH_DASHBOARD.menu.contactUs.root,
//               },
//               { name: 'Contact Form' },
//             ]}
//           />
//           <Grid container spacing={10}>
//             <Grid item xs={12} md={6}>
//               <Stack spacing={3} sx={{ mb: '20px' }}>
//                 <FormInputText name="name" control={control} label="Name" />
//                 <FormInputText name="email" control={control} label="Email" />
//                 <FormInputText name="subject" control={control} label="Subject" />
//                 <FormInputText name="message" control={control} label="Message" />
//               </Stack>

//               <Button onClick={handleSubmit(onSubmit)} variant={'contained'}>
//                 {' '}
//                 Submit{' '}
//               </Button>
//               <Button onClick={() => reset()} variant={'outlined'}>
//                 {' '}
//                 Reset{' '}
//               </Button>
//             </Grid>
//           </Grid>
//         </Container>
//       </RootStyle>
//     </Page>
//   );
// }
