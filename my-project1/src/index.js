import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Routers } from "react-router-dom";
import theme from "./app/theme"
import { ThemeProvider } from "@material-ui/core";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme ={theme}>
      <Routers>
        <Provider store={store}>
          <CookiesProvider>
            <App/>
            <ToastContainer />
         </CookiesProvider>
        </Provider>
      </Routers>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
