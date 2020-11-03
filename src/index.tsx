import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import {
  Provider,
  subscriptionExchange,
  createClient,
  defaultExchanges,
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";

// chakra ui
import {
  CSSReset,
  ThemeProvider,
  theme,
  ColorModeProvider,
} from "@chakra-ui/core";

const { REACT_SERVER_URL, REACT_APP_SERVER_SUBSCRIPTIONS } = process.env;
const url = REACT_SERVER_URL?.toString() || "localhost:5000/graphql"
const subscriptionsUrl = REACT_APP_SERVER_SUBSCRIPTIONS?.toString() || "ws://localhost:5000/graphql"
const subscriptionClient = new SubscriptionClient(
  subscriptionsUrl,
  {
    reconnect: true,
  }
);
const client = createClient({
  url: url ,
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => subscriptionClient.request(operation),
    }),
  ],
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ColorModeProvider> 
        <Provider value={client}>
          <App />
        </Provider>
        <CSSReset />
      </ColorModeProvider>
    </ThemeProvider> 
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
