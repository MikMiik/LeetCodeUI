import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxProvider } from "react-redux";

import App from "./App.jsx";
import "./styles/globals.css";
import "./utils/fontAwesome.js";
import store, { persistor } from "./store/store.js";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import UserProvider from "./components/UserProvider/UserProvider.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <BrowserRouter>
            <UserProvider />
            <ScrollToTop>
              <App />
            </ScrollToTop>
          </BrowserRouter>
        </ErrorBoundary>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
);
