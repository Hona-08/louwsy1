import { Box, Container, Grid } from "@mui/material";
import Navbar from "components/navbar/Navbar";
import Stepper from "components/stepper/Stepper";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import ShopLayout1 from "./ShopLayout1";

/**
 *  Used:
 *  1. cart page
 *  2. checkout page
 *  3. payment page
 */

const CheckoutNavLayout: FC = ({ children }) => {
  const [selectedStep, setSelectedStep] = useState(0);

  const router = useRouter();
  const { pathname } = router;

  const handleStepChange = (step: number) => {
    switch (step) {
      case 0:
        router.push("/cart");
        break;
      case 1:
        router.push("/checkout");
        break;
      case 2:
        router.push("/payment");
        break;
      // case 3:
      //   router.push("/orders");
      //   break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case "/cart":
        setSelectedStep(1);
        break;
      case "/checkout":
        setSelectedStep(2);
        break;
      case "/payment":
        setSelectedStep(3);
        break;
      default:
        break;
    }
  }, [pathname]);

  return (
    <ShopLayout1>
      <Container sx={{ my: 4 }}>
        <Box mb={3} display={{ sm: "block", xs: "none" }}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Stepper
                stepperList={stepperList}
                selectedStep={selectedStep}
                onChange={handleStepChange}
              />
            </Grid>
          </Grid>
        </Box>

        {children}
      </Container>
    </ShopLayout1>
  );
};

const stepperList = [
  { title: "Cart", disabled: false },
  { title: "Details", disabled: false },
  { title: "Payment", disabled: false },
  // { title: "Review", disabled: true },
];

export default CheckoutNavLayout;
