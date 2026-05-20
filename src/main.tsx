import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "whatwg-fetch";
import { CookiesProvider } from "react-cookie";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import App from "./App";

const renderApp = () => {
  const isMockEnabled = import.meta.env.VITE_USE_MOCKS === "true";
  const routerBase = isMockEnabled && !window.location.pathname.startsWith("/crm") ? "/" : "/crm/";
  ReactDOM.render(
    <CookiesProvider>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter basename={routerBase}>
          <App />
        </BrowserRouter>
      </I18nextProvider>
    </CookiesProvider>,
    document.querySelector("#root")
  );
};

const enableMocks = async () => {
  if (import.meta.env.VITE_USE_MOCKS !== "true") {
    return;
  }

  const { worker } = await import("./mocks/browser");
  await worker.start({
    onUnhandledRequest: "bypass",
  });
};

enableMocks().then(() => {
  renderApp();
}).catch((err) => {
  renderApp();
});
