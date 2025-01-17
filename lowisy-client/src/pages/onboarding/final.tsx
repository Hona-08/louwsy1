import { useState } from 'react';
// @mui
import {
    Box,
    Step,
    Paper,
    Button,
    Stepper,
    StepLabel,
    Typography,
    Container,
    styled,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    OutlinedInput,
} from '@mui/material';
import Page from 'src/components/Page';
import Layout from 'src/layouts';
import { getCountries } from 'src/api/settings';
import { useMutation, useQuery } from '@tanstack/react-query';
import { initialRegister } from 'src/api/auth-shop';
import { useSnackbar } from 'notistack';
import { AddressAutocompleteValue } from "mui-address-autocomplete";

import dynamic from "next/dynamic";
import useLocales from 'src/hooks/useLocales';

const AddressAutocomplete = dynamic(() => import("mui-address-autocomplete"), {
    ssr: false,
});
// ----------------------------------------------------------------------

const steps = ['Welcome To Lowisy', 'Store Name', 'Store Location', 'Add Your Address', 'Verify Email',];

const ContentStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    minHeight: '100vh',
    marginTop: '50px',
    // display: 'flex',
    // justifyContent: 'center',
    // flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

HorizontalLinearStepper.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant="logoOnly">{page}</Layout>;
};


export default function HorizontalLinearStepper() {
    const { translate } = useLocales()


    return (
        <Page title="Setup Webshop">
            <Container>
                <ContentStyle>

                    <Paper sx={{ p: 3, my: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
                        <Box sx={{ m: 4, maxWidth: '600px', mx: 'auto' }}>
                            <Typography variant="h3" paragraph sx={{ textAlign: 'center' }}>
                                {translate('check_your_email')}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}>
                                {translate('confirm_email')}
                            </Typography>
                            <Typography sx={{ color: 'text.primary', textAlign: 'center' }}>
                                {translate('choosing_lowisy')}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', mt: 2 }}>
                                <Typography variant="caption" align="center">
                                    {translate('help_center')}
                                </Typography>
                                <Typography variant="caption" align="center">
                                    {translate('privacy')}
                                </Typography>
                                <Typography variant="caption" align="center">
                                    {translate('terms')}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </ContentStyle>
            </Container>
        </Page>
    );
}
