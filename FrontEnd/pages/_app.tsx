/* eslint-disable react/jsx-props-no-spreading */

// CSR for Header
// import dynamic from 'next/dynamic';
// const Header = dynamic(import('../components/Header'), {ssr: false});

import App from "next/app";
import Head from "next/head";
import React from "react";
import PropTypes from "prop-types";
import {Provider} from "react-redux";
import ConfigStore from "../lib/redux/configStore";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Header from "../components/Header/Header";
import theme from "../lib/styles/theme";
import {Notifier} from "../components/Notifier";
import Router from 'next/router';
import NProgress from "nprogress";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

let store = ConfigStore();
const propTypes = {
  Component: PropTypes.elementType.isRequired,
};
class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <CssBaseline />
          <Header {...pageProps} />
          <Component {...pageProps} />
          <Notifier />
        </ThemeProvider>
      </Provider>
    );
  }
}
MyApp.propTypes = propTypes;
export default MyApp;
