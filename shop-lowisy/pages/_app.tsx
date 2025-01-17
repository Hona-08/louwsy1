import RTL from "components/RTL";
import { AppProvider } from "contexts/AppContext";
import SettingsProvider from "contexts/SettingContext";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { Fragment, ReactElement, ReactNode, useEffect, useState } from "react";
import "simplebar/dist/simplebar.min.css";
import MuiTheme from "theme/MuiTheme";
import { appWithTranslation } from "next-i18next";
import OpenGraphTags from "utils/OpenGraphTags";
import { QueryClient, QueryClientProvider } from "react-query";
import "../src/fake-db";
import { AuthProvider } from "contexts/JWTContext";
import router from "next/router";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { setPriority } from "os";
import "../src/utils/privacy.css";
import Paths from "routes/path";
import { LanguageProvider } from "contexts/LanguageContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

type MyAppProps = AppProps & {
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
};

//Binding events.
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());
// small change
nProgress.configure({ showSpinner: false });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //other query settings
      refetchOnWindowFocus: false,
    },
  },
});

const App = ({ Component, pageProps }: MyAppProps) => {
  const AnyComponent = Component as any;
  const getLayout = AnyComponent.getLayout ?? ((page) => page);

  const initialOptions = {
    clientId: "Adz6vrIYz4jQyt9roSZjB3mEPHFIYcozv7vDPDMBRQ_aITPUH5Z-tl4wKQONGsr12NowEeFTRvOIEom1",
    currency: "EUR",
    intent: "capture",
  }

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <title>Lowisy | Restaurant</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/images/icons/16x16.png"
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <OpenGraphTags />
      </Head>
      <QueryClientProvider client={queryClient}>
        <PayPalScriptProvider options={initialOptions}>
          <AuthProvider>
            <Toaster position="top-right" />
            <SettingsProvider>
              {/* <LanguageProvider> */}
              <AppProvider>
                <MuiTheme>
                  <RTL>{getLayout(<AnyComponent {...pageProps} />)}</RTL>
                </MuiTheme>
              </AppProvider>
              {/* </LanguageProvider> */}
            </SettingsProvider>
          </AuthProvider>
        </PayPalScriptProvider>
      </QueryClientProvider>
    </Fragment>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default appWithTranslation(App);
