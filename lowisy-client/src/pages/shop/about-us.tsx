// @mui
import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';
// layouts
import Layout from '../../layouts';
import ShopFooter from '../../layouts/shop/ShopFooter';
import ShopHeader from '../../layouts/shop/ShopHeader';
// components
import Page from '../../components/Page';
// sections
import {
  AboutHero,
  AboutWhat,
  AboutTeam,
  AboutVision,
  AboutTestimonials,
} from '../../sections/about';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

// About.getLayout = function getLayout(page: React.ReactElement) {
//   return <Layout variant="main">{page}</Layout>;
// };

// ----------------------------------------------------------------------

export default function About() {
  return (
    <Page title="About us">
      <ShopHeader />
      <RootStyle>
        <AboutHero />
        <AboutWhat />
        <AboutVision />
        <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />
        <AboutTeam />
        <AboutTestimonials />
      </RootStyle>
      <ShopFooter />
    </Page>
  );
}
