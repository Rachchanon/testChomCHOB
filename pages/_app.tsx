import React from "react";
import { AppProps } from "next/app";

import { StyledThemeProvider } from "@definitions/styled-components";
import { Provider } from "react-redux";
import store from "@redux/store";

import "antd/dist/antd.css";

import '../styles/globals.scss'
import '../styles/flex.scss'
import '../styles/hack.scss'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <StyledThemeProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </StyledThemeProvider>
  );
}

export default MyApp;
