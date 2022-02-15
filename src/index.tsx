import React , { Suspense }from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import setupAxiosInterceptors from './config/axios-interceptor';
import initStore from './config/store';
import {Provider} from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { ToastContainer, toast } from 'react-toastify';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import AppComponent from './app';

// Mock data
// import "./mocks";

import 'bootstrap/dist/css/bootstrap.min.css';
import "assets/scss/material-dashboard-pro-react.scss?v=1.9.0";
import 'react-toastify/dist/ReactToastify.css';
import 'assets/css/nauvus.css';

setupAxiosInterceptors(() => console.log('error'));
const store = initStore();

const THEME = createMuiTheme({
  typography: {
   "fontFamily": `"Lato", sans-serif`,
  }
});

const render = Component =>
  ReactDOM.hydrate(
    <>
        <ToastContainer
          position={toast.POSITION.TOP_RIGHT}
          className="toastify-container"
          toastClassName="toastify-toast"
        />
        <Suspense fallback={null}>
          <AppContainer>
            <ThemeProvider theme={THEME}>
              <Provider store={store}>
                <div>
                  <Component />
                </div>
              </Provider>
            </ThemeProvider>
          </AppContainer>
        </Suspense>
    </>
    ,
    document.getElementById("root")
  );

render(AppComponent);