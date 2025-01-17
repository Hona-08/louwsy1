import { capitalCase } from 'change-case';
import React from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH, PATH_ONBOARDING, PATH_SHOP } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { LoginForm } from '../../sections/auth/login';
import useLocales from 'src/hooks/useLocales';
import OnboardingForm from 'src/sections/auth/register/RegisterForm';



// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(7, 5, 0, 7),
    },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Onboarding() {
    const { translate } = useLocales()
    const smUp = useResponsive('up', 'sm');

    const mdUp = useResponsive('up', 'md');

    return (
        <Page title="Setup">
            <RootStyle>
                <HeaderStyle>
                    <Logo />
                    {smUp && (
                        <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                            {translate('already_have_an_account')} {''}
                            <NextLink href={PATH_AUTH.login} passHref>
                                <Link variant="subtitle2">{translate('login')}</Link>
                            </NextLink>
                        </Typography>
                    )}
                </HeaderStyle>

                {mdUp && (
                    <SectionStyle>
                        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            {translate('hi_welcome_back')}
                        </Typography>
                        <Image
                            visibleByDefault
                            disabledEffect
                            src="/assets/illustrations/illustration_login.png"
                            alt="login"
                        />
                    </SectionStyle>
                )}

                <Container maxWidth="sm">
                    <ContentStyle>
                        <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h4" gutterBottom>
                                    {translate('signup_to_your_webshop')}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>{translate('enter_details')}</Typography>
                            </Box>

                        </Stack>

                        <OnboardingForm />

                        {!smUp && (
                            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                                {translate('already_have_an_account')}{' '}
                                <NextLink href={PATH_AUTH.login} passHref>
                                    <Link variant="subtitle2">{translate('login')}</Link>
                                </NextLink>
                            </Typography>
                        )}
                    </ContentStyle>
                </Container>
            </RootStyle>
        </Page>
    );
}
