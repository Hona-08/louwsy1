// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography } from '@mui/material';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
// sections
import { NewPasswordForm } from '../../../sections/auth/new-password';
// assets
import { SentIcon } from '../../../assets';
import { ResetPasswordForm } from 'src/sections/auth/reset-password';
import NewResetPasswordForm from 'src/sections/auth/new-password/NewResetPasswordForm';

// ----------------------------------------------------------------------

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

NewPassword.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function NewPassword() {
    return (
        <Page title="New Password">
            <Container>
                <ContentStyle sx={{ textAlign: 'center' }}>
                    <SentIcon sx={{ mb: 5, mx: 'auto', height: 120 }} />

                    <Typography variant="h3" gutterBottom>
                        Please change your password
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Please enter the password in below box to change your login password.
                    </Typography>

                    <Box sx={{ mt: 5, mb: 3 }}>
                        <NewResetPasswordForm />
                    </Box>

                    {/* <Typography variant="body2">
                        Don’t have a code? &nbsp;
                        <Link variant="subtitle2" onClick={() => { }}>
                            Resend code
                        </Link>
                    </Typography> */}
                </ContentStyle>
            </Container>
        </Page>
    );
}

