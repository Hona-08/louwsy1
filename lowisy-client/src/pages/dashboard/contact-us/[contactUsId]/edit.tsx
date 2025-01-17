import { useEffect } from 'react';
import { paramCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getProducts } from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import ProductNewEditForm from '../../../../sections/@dashboard/e-commerce/ProductNewEditForm';
import ContactUsNewEditForm from 'src/sections/@dashboard/contact-us/ContactUsNewEditForm';
import { getSingleContactUs } from 'src/api/contact-us';
import { useQuery } from '@tanstack/react-query';

// ----------------------------------------------------------------------

ContactUsEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function ContactUsEdit() {
  const { themeStretch } = useSettings();
  const { query } = useRouter();

  const { contactUsId } = query;

  const { data: singleContactUs } = useQuery<any>(['get_single_contactUs'], () =>
    getSingleContactUs(contactUsId as string)
  );

  const { name } = query;

  return (
    <Page title="Edit: Contact us">
      <RootStyle>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="contact_us"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              {
                name: 'Contact Us',
                href: PATH_DASHBOARD.menu.contactUs.root,
              },
              { name: 'Contact Form' },
            ]}
          />

          {singleContactUs && <ContactUsNewEditForm isEdit currentContact={singleContactUs[0]} />}
        </Container>
      </RootStyle>
    </Page>
  );
}
