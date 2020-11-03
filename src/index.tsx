import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// import {
//   Provider,
//   subscriptionExchange,
//   createClient,
//   defaultExchanges,
// } from "urql";
// import { SubscriptionClient } from "subscriptions-transport-ws";

// // chakra ui
// import {
//   CSSReset,
//   ThemeProvider,
//   theme,
//   ColorModeProvider,
// } from "@chakra-ui/core";

// const subscriptionClient = new SubscriptionClient(
//   "ws://25fe7a9f964b.ngrok.io/graphql",
//   {
//     reconnect: true,
//   }
// );

// const client = createClient({
//   url: "https://25fe7a9f964b.ngrok.io/graphql",
//   exchanges: [
//     ...defaultExchanges,
//     subscriptionExchange({
//       forwardSubscription: (operation) => subscriptionClient.request(operation),
//     }),
//   ],
// });

ReactDOM.render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <Provider value={client}> */}
          <App />
        {/* </Provider>
        <CSSReset />
      </ColorModeProvider>
    </ThemeProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
