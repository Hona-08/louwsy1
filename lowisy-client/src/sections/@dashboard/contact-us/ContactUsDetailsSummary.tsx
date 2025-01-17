import { sentenceCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import {
  Box,
  Link,
  Stack,
  Button,
  Rating,
  Divider,
  IconButton,
  Typography,
  Card,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../../utils/formatNumber';
// @types
import { Product, CartItem, DbProduct, Category } from '../../../@types/product';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SocialsButton from '../../../components/SocialsButton';
import { ColorSinglePicker } from '../../../components/color-utils';
import { FormProvider, RHFSelect } from '../../../components/hook-form';
import { ContactUs } from 'src/@types/contact-us';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

type FormValuesProps = ContactUs;

type Props = {
  contactUs: ContactUs;
};

export default function ContactUsDetailsSummary({ contactUs, ...other }: Props) {
  const theme = useTheme();

  const { push } = useRouter();

  const { id, name, email, subject, message } = contactUs;
  //console.log(id, name, email, subject, message);

  // const alreadyProduct = cart?.map((item) => item.id).includes(id);

  // const isMaxQuantity =
  //   cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >= 5;

  const defaultValues = {
    name,
    email,
    subject,
    message,
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  return (
    <RootStyle {...other} sx={{ width: '100%' }}>
      <Card
        sx={{
          display: 'flex-column',
          justifyContent: 'center',
          padding: '25px',
          marginLeft: '50px',
        }}
      >
        <Box sx={{ width: 'auto', padding: '10px' }}>
          <Person2RoundedIcon sx={{ fontSize: '100px' }} />
        </Box>
        <Box sx={{ padding: '10px' }}>
          <Typography paragraph sx={{ fontSize: '18px', textAlign: 'left' }}>
            Name: {name}
          </Typography>
        </Box>
        <Box sx={{ padding: '10px' }}>
          <Typography paragraph>Email: {email}</Typography>
        </Box>

        <Box sx={{ padding: '10px' }}>
          <Typography paragraph sx={{ textAlign: 'left' }}>
            Subject: {subject}
          </Typography>
        </Box>
        <Box sx={{ padding: '10px' }}>
          <Typography paragraph sx={{ textAlign: 'left' }}>
            Message: {message}
          </Typography>
        </Box>
      </Card>
    </RootStyle>
  );
}
