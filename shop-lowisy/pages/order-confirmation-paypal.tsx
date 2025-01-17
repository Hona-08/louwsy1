import { Container, styled } from "@mui/material";
import BazaarButton from "components/BazaarButton";
import BazaarCard from "components/BazaarCard";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ShopLayout2 from "components/layouts/ShopLayout2";
import LazyImage from "components/LazyImage";
import Navbar from "components/navbar/Navbar";
import SEO from "components/SEO";
import { H1, Paragraph } from "components/Typography";
import { useAppContext, CartItem } from "contexts/AppContext";
import useAuth from "hooks/useAuth";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { createOrder } from "utils/api/order";

// custom styled components
const Wrapper = styled(BazaarCard)(() => ({
  margin: "auto",
  padding: "3rem",
  maxWidth: "630px",
  textAlign: "center",
}));

const StyledButton = styled(BazaarButton)(() => ({
  marginTop: "2rem",
  padding: "11px 24px",
}));

const OrderConfirmation: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation("common");
  const { state } = useAppContext();
  const cartList: CartItem[] = state.cart;
  const [isCompleted, setIsCompleted] = useState(false);
  const [isError, setIsError] = useState(false);

  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  };

  const createMutation = useMutation((data: any) => createOrder(data), {
    onSuccess(data) {
      setIsCompleted(true)
      toast.success("Order Placed Successfully");
    },
    onError(err: any) {
      setIsCompleted(false)
      setIsError(true)
      toast.error(err.response?.data?.message ?? "Something went wrong");
    },
  });

  const submitOrder = async () => {
    if (!router.query.order_id) return;
    const data = {
      totalCost: getTotalPrice(),
      paymentMethod: "paypal",
      cartList,
      address: JSON.parse(localStorage.getItem('address')),
      paypalOrderId: router.query.order_id,
    };
    await createMutation.mutate(data);
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    submitOrder();
  }, [router.query.order_id]);

  return (
    <ShopLayout2 showNavbar={false} showTopbar={false}>
      <Container sx={{ mt: 10, mb: 15 }}>
        <Wrapper>
          <LazyImage
            src="/assets/images/illustrations/party-popper.svg"
            width={116}
            height={116}
          />
          {isCompleted ? <> <H1 lineHeight={1.1} mt="1.5rem">
            {t("Your-order-is-completed")}
          </H1>   <Paragraph color="grey.800" mt="0.3rem">
              {t("You-will-be-receiving-confirmation-email-with-order-details")}
            </Paragraph></> : isError ? <H1 lineHeight={1.1} mt="1.5rem">
              Something went wrong.
            </H1> : <> <H1 lineHeight={1.1} mt="1.5rem">
              Your order is processing.
            </H1>  <Paragraph color="grey.800" mt="0.3rem">
              {t("You-will-be-receiving-confirmation-email-with-order-details")}
            </Paragraph> </>}


          {isAuthenticated ?
            <Link href="/orders" passHref>
              <StyledButton
                color="primary"
                disableElevation
                variant="contained"
                className="button-link"
              >
                {t("go-to-order")}
              </StyledButton>
            </Link> :
            <Link href="/restaurants" passHref>
              <StyledButton
                color="primary"
                disableElevation
                variant="contained"
                className="button-link"
                sx={{ mr: 2 }}
              >
                {t("Browse-products")}
              </StyledButton>
            </Link>}

          <Link href="/" passHref>
            <StyledButton
              color="secondary"
              disableElevation
              variant="contained"
              className="button-link"
              sx={{ ml: 2 }}
            >
              {t("Go-home")}
            </StyledButton>
          </Link>
        </Wrapper>
      </Container>
    </ShopLayout2>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["footer", "common"])),
  },
});

export default OrderConfirmation;
