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

function WelecomeLowisy() {
  return (
    <Box sx={{ m: 4, maxWidth: '600px', mx: 'auto' }}>
      <Typography variant="h3" paragraph sx={{ textAlign: 'center' }}>
        Welcome to the Lowisy Community
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}>
        We will now ask you a few questions, this information forms the basis for your personal
        webshop
      </Typography>
      <Typography sx={{ color: 'text.primary', textAlign: 'center' }}>
        You can edit this information in the webshop settings.
      </Typography>
    </Box>
  );
}

function StoreName({ values, setValues }: any) {
  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <Box sx={{ m: 4, maxWidth: '600px', mx: 'auto' }}>
      <Typography variant="h3" paragraph sx={{ textAlign: 'center' }}>
        Tell us your store name?
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}>
        We will be the name of your webshop?
      </Typography>
      <TextField
        fullWidth
        label="Store Name"
        variant="outlined"
        name="name"
        onChange={handleChange}
        required
      />
    </Box>
  );
}

function SelectLocation({ values, setValues }: any) {
  const { data: countries, isFetching } = useQuery<any>(['get_countries'], getCountries);

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ m: 4, maxWidth: '600px', mx: 'auto' }}>
      <Typography variant="h3" paragraph sx={{ textAlign: 'center' }}>
        Webshop Location
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}>
        This Information will be used in impressum and GDPR compliance.
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="location">WebShop Location</InputLabel>
        {countries && (
          <Select
            labelId="location"
            id="location"
            label="WebShop Location"
            name="countryId"
            onChange={handleChange}
            required
          >
            {countries?.map(({ countryName, id }: any) => (
              <MenuItem value={id} key={id}>
                {countryName}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </Box>
  );
}

function StoreEmail({ values, setValues, handleNext }: any) {
  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const mutation = useMutation((values: any) => initialRegister(values as any));

  // const mutation = useMutation((values: any) => initialRegister(values as any))

  return (
    <Box sx={{ m: 4, maxWidth: '600px', mx: 'auto' }}>
      <Typography variant="h3" paragraph sx={{ textAlign: 'center' }}>
        What is your stores email address?
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}>
        This will be used for business realted emails.
      </Typography>
      <TextField
        fullWidth
        label="Enter email address"
        variant="outlined"
        type="email"
        name="email"
        onChange={handleChange}
        required
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ my: 2 }}
        onClick={handleNext}
        disabled={!values.email}
      >
        Create Lowisy Webshop
      </Button>
      <Typography sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}>
        By proceeding you aree to the Terms and Conditions.
      </Typography>
    </Box>
  );
}

function StoreLatLng({ values, setValues }: any) {
  const [value, setValue] = useState<AddressAutocompleteValue | null>({
    place_id: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
    description: "Paris, France",
    components: {},
    structured_formatting: {
      main_text: "Paris",
      secondary_text: "France",
      main_text_matched_substrings: [],
    },
  });
  return (
    <Box sx={{ m: 4, maxWidth: '600px', mx: 'auto' }}>
      <Typography variant="h3" paragraph sx={{ textAlign: 'center' }}>
        What is your stores exact location?
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}>
        This will be used by customers for easy search & navigation
      </Typography>
      <AddressAutocomplete
        placeholder="Search by address"
        apiKey="AIzaSyCvqBlmgrQH7Nbid5gCMdqrm-Q45fHOM9A"
        label=""
        fields={['geometry']}
        onChange={(_, value: any) => {
          //console.log(value);
          //console.log({...values, lat:  value?.geometry.location.lat(), lng: value?.geometry.location.lng() })
          setValues({ ...values, lat: value?.geometry.location.lat(), lng: value?.geometry.location.lng() })
          delete value.geometry
          setValue(value)
        }}
        value={value}
        sx={{
          height: 50,
          paddingRight: 0,
          color: "grey.700",
          background: "#fff",
          "& fieldset": { border: "none" },
        }}
      />
      <Typography sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}>
        By proceeding you aree to the Terms and Conditions.
      </Typography>
    </Box>
  );
}

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [values, setValues] = useState<any>({});
  const isStepOptional = (step: number) => step === 10;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (activeStep === 4) {
      // try {
      //   await mutation.mutate(values)
      // } catch (err) {
      //   enqueueSnackbar(err.response.data.message ?? err.message);
      // }
      await mutation.mutate(values);
    }
  };

  const PAGE_TO_SHOW: any = {
    0: <WelecomeLowisy />,
    1: <StoreName values={values} setValues={setValues} />,
    2: <SelectLocation values={values} setValues={setValues} />,
    3: <StoreLatLng values={values} setValues={setValues} />,
    4: <StoreEmail values={values} setValues={setValues} handleNext={handleNext} />,
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const mutation = useMutation((values: any) => initialRegister(values as any), {
    onSuccess(data) {
      //console.log({ data });
      enqueueSnackbar(data.message);
    },
    onError(err: any) {
      enqueueSnackbar(err.response.data.message ?? err.message);
    },
  });

  return (
    <Page title="Setup Webshop">
      <Container>
        <ContentStyle>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = <Typography variant="caption">Optional</Typography>;
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Paper sx={{ p: 3, my: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
                <Box sx={{ m: 4, maxWidth: '600px', mx: 'auto' }}>
                  <Typography variant="h3" paragraph sx={{ textAlign: 'center' }}>
                    Check your email
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}>
                    We sent you a confirmation email with activation link. By clicking the link you
                    confirm your email address.
                  </Typography>
                  <Typography sx={{ color: 'text.primary', textAlign: 'center' }}>
                    Thank you for choosing Lowisy.com
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', mt: 2 }}>
                    <Typography variant="caption" align="center">
                      Help Center
                    </Typography>
                    <Typography variant="caption" align="center">
                      Privacy
                    </Typography>
                    <Typography variant="caption" align="center">
                      Terms
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* <Box sx={{ display: 'flex' }}>
                <Box sx={{ flexGrow: 1 }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box> */}
            </>
          ) : (
            <>
              <Paper sx={{ p: 3, my: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
                {PAGE_TO_SHOW[activeStep]}
              </Paper>
              <Box sx={{ display: 'flex' }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!(values.email || activeStep <= 3)}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </ContentStyle>
      </Container>
    </Page>
  );
}
